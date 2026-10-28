"""TaxShot in Blender, the reference's own pipeline (STYLE_3D.md §11.1/§12): real CC0 models, lit room, Cycles,
24 fps, motion blur, Freestyle black outline on the character only, ink-line faces swapped per line.
Line: "school spent 12 years teaching me triangles and zero minutes teaching me taxes".
blender -b -P blender/taxshot.py -- --assets A --tex T --out O [--frames 1-120 | 5,40,60] [--samples 32] [--res 1920x1080]

Shot (24 fps, 120 frames):
  A   1–47  wide, low, off-centre: Dave slumped at his desk holding the TAX FORM; face snaps to shock at 10;
            head snaps to the chalkboard at 28 (think)
  B  48–79  hard cut to a close-up (Dave + chalkboard), 1 frame white silhouette with black outline, spiral eyes
  C 80–120  whip back to wide (2 blurred frames), panic: form held up, shaking
"""
import bpy, sys, os, math, json
from mathutils import Vector, Euler

argv = sys.argv[sys.argv.index("--") + 1:]
args = dict(zip(argv[::2], argv[1::2]))
A, T, OUT = args["--assets"], args["--tex"], args["--out"]
FR = args.get("--frames", "1-120")
SAMPLES = int(args.get("--samples", "32"))
W, H = map(int, args.get("--res", "1920x1080").split("x"))
MAN = json.load(open(os.path.join(A, "manifest.json")))

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = "CYCLES"
sc.cycles.device = "CPU"
sc.cycles.samples = SAMPLES
sc.cycles.use_denoising = True
sc.cycles.max_bounces = 6
sc.render.resolution_x, sc.render.resolution_y = W, H
sc.render.fps = 24
sc.frame_start, sc.frame_end = 1, 120
sc.render.use_motion_blur = True
sc.render.motion_blur_shutter = 0.5
sc.view_settings.view_transform = "AgX"
sc.render.image_settings.file_format = "JPEG"
sc.render.image_settings.quality = 92


# ---------------------------------------------------------------- materials
def nodes_mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links, m.node_tree.nodes["Principled BSDF"]


def flat(name, rgb, rough=0.6, coat=0.0):
    m, n, l, p = nodes_mat(name)
    p.inputs["Base Color"].default_value = (*rgb, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Coat Weight"].default_value = coat
    return m


def pbr(name, tex, scale=0.5, tint=None):
    m, n, l, p = nodes_mat(name)
    tc, mp = n.new("ShaderNodeTexCoord"), n.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (scale, scale, scale)
    l.new(tc.outputs["Object"], mp.inputs["Vector"])

    def img(rel, color):
        t = n.new("ShaderNodeTexImage")
        t.image = bpy.data.images.load(os.path.join(A, rel))
        t.image.colorspace_settings.name = "sRGB" if color else "Non-Color"
        t.projection, t.projection_blend = "BOX", 0.25
        l.new(mp.outputs["Vector"], t.inputs["Vector"])
        return t

    d = img(tex["diff"], True)
    if tint:
        mix = n.new("ShaderNodeMix")
        mix.data_type, mix.blend_type = "RGBA", "MULTIPLY"
        mix.inputs["Factor"].default_value = 1
        mix.inputs["B"].default_value = (*tint, 1)
        l.new(d.outputs["Color"], mix.inputs["A"])
        l.new(mix.outputs["Result"], p.inputs["Base Color"])
    else:
        l.new(d.outputs["Color"], p.inputs["Base Color"])
    if "rough" in tex:
        l.new(img(tex["rough"], False).outputs["Color"], p.inputs["Roughness"])
    if "nor" in tex:
        nm = n.new("ShaderNodeNormalMap")
        l.new(img(tex["nor"], False).outputs["Color"], nm.inputs["Color"])
        l.new(nm.outputs["Normal"], p.inputs["Normal"])
    return m


def image_mat(name, path, alpha=False, rough=0.8):
    m, n, l, p = nodes_mat(name)
    t = n.new("ShaderNodeTexImage")
    t.image = bpy.data.images.load(path)
    l.new(t.outputs["Color"], p.inputs["Base Color"])
    p.inputs["Roughness"].default_value = rough
    if alpha:
        l.new(t.outputs["Alpha"], p.inputs["Alpha"])
        m.blend_method = "BLEND"
    return m


# ---------------------------------------------------------------- geometry helpers
def box(name, loc, size, mat):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2)
    o.data.materials.append(mat)
    return o


def plane(name, loc, size, rot, mat):
    bpy.ops.mesh.primitive_plane_add(location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = (size[0] / 2, size[1] / 2, 1)
    o.data.materials.append(mat)
    return o


def tree(o):
    out = [o]
    for c in o.children:
        out += tree(c)
    return out


def import_model(mid, loc=(0, 0, 0), rz=0.0):
    d = os.path.join(A, "models", mid)
    f = next(x for x in os.listdir(d) if x.endswith(".gltf"))
    bpy.ops.object.select_all(action="DESELECT")
    bpy.ops.import_scene.gltf(filepath=os.path.join(d, f))
    objs = list(bpy.context.selected_objects)
    root = bpy.data.objects.new(mid, None)
    sc.collection.objects.link(root)
    for o in objs:
        if o.parent is None:
            o.parent = root
    root.location, root.rotation_euler = loc, (0, 0, rz)
    return root


def dup(root, loc, rz=0.0):
    bpy.ops.object.select_all(action="DESELECT")
    for o in tree(root):
        o.select_set(True)
    bpy.context.view_layer.objects.active = root
    bpy.ops.object.duplicate(linked=True)
    new = next(o for o in bpy.context.selected_objects if o.parent is None)
    new.location, new.rotation_euler = loc, (0, 0, rz)
    return new


def bbox(root):
    bpy.context.view_layer.update()
    pts = [o.matrix_world @ Vector(c) for o in tree(root) if o.type == "MESH" for c in o.bound_box]
    lo = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    hi = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    return lo, hi


def back_dir(root):
    """xy direction of the tall part of a chair (its backrest), relative to its centre"""
    lo, hi = bbox(root)
    c = (lo + hi) / 2
    top = [o.matrix_world @ v.co for o in tree(root) if o.type == "MESH" for v in o.data.vertices]
    top = [p for p in top if p.z > lo.z + 0.7 * (hi.z - lo.z)]
    m = sum(top, Vector()) / max(1, len(top))
    return math.atan2(m.y - c.y, m.x - c.x)


def seat_z(x, y):
    bpy.context.view_layer.update()
    hit, loc, *_ = sc.ray_cast(bpy.context.evaluated_depsgraph_get(), Vector((x, y, 1.3)), Vector((0, 0, -1)))
    return loc.z if hit else 0.45


def keys_const(idblock):
    ad = idblock.animation_data
    if ad and ad.action:
        for fc in ad.action.fcurves:
            for k in fc.keyframe_points:
                k.interpolation = "CONSTANT"


# ---------------------------------------------------------------- room (classroom, ~8 x 7 m, 3 m high)
floor_m = pbr("floor", MAN["floor"], 0.6)
wall_m = pbr("wall", MAN["wall"], 0.5, tint=(0.82, 0.86, 0.8))
trim_m = flat("trim", (0.32, 0.25, 0.18), 0.5)
white_m = flat("frame_white", (0.85, 0.85, 0.82), 0.4)
board_m = image_mat("chalkboard", os.path.join(T, "chalkboard.png"), rough=0.95)

plane("floor", (0, 0, 0), (9, 9), (0, 0, 0), floor_m)
box("ceiling", (0, 0, 3.05), (9, 9, 0.1), wall_m)
box("wall_back", (0, 3.1, 1.5), (9, 0.15, 3.1), wall_m)
box("wall_right", (4.0, 0, 1.5), (0.15, 9, 3.1), wall_m)
box("wall_front", (0, -5.5, 1.5), (9, 0.15, 3.1), wall_m)
# left wall with a big window opening (y -1.4..1.2, z 0.9..2.4)
X = -4.0
box("wl_a", (X, -3.2, 1.5), (0.15, 3.6, 3.1), wall_m)
box("wl_b", (X, 3.15, 1.5), (0.15, 3.9, 3.1), wall_m)
box("wl_low", (X, -0.1, 0.45), (0.15, 2.6, 0.9), wall_m)
box("wl_high", (X, -0.1, 2.75), (0.15, 2.6, 0.7), wall_m)
for y in (-1.4, -0.1, 1.2):
    box("wf_v", (X, y, 1.65), (0.17, 0.06, 1.5), white_m)
for z in (0.9, 1.65, 2.4):
    box("wf_h", (X, -0.1, z), (0.17, 2.6, 0.06), white_m)
sky = flat("sky", (0.7, 0.8, 0.9))
sky.node_tree.nodes["Principled BSDF"].inputs["Emission Color"].default_value = (0.75, 0.85, 1.0, 1)
sky.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 2.5
plane("sky", (-6.5, 0, 1.6), (6, 4), (0, math.radians(90), 0), sky)
# skirting + chalkboard on the back wall, left of Dave
box("skirt", (0, 3.0, 0.06), (9, 0.04, 0.12), trim_m)
plane("board", (-1.3, 3.015, 1.55), (2.8, 1.25), (math.radians(90), 0, 0), board_m)
box("board_frame_t", (-1.3, 3.0, 2.2), (2.9, 0.05, 0.06), trim_m)
box("board_frame_b", (-1.3, 3.0, 0.9), (2.9, 0.05, 0.06), trim_m)
box("board_frame_l", (-2.72, 3.0, 1.55), (0.06, 0.05, 1.36), trim_m)
box("board_frame_r", (0.12, 3.0, 1.55), (0.06, 0.05, 1.36), trim_m)
box("chalk_tray", (-1.3, 2.95, 0.89), (2.8, 0.1, 0.03), trim_m)

# ---------------------------------------------------------------- furniture (real CC0 models)
chair = import_model("SchoolChair_01")
chair.rotation_euler.z = math.radians(90) - back_dir(chair)  # backrest → +Y (away from camera)
desk = import_model("SchoolDesk_01", (0, -0.62, 0))
dlo, dhi = bbox(desk)
if (dhi.x - dlo.x) < (dhi.y - dlo.y):
    desk.rotation_euler.z = math.radians(90)
for x, y in [(-1.8, 0), (-1.8, 1.5), (0, 1.5), (1.8, 1.5), (-1.8, -1.6)]:
    dup(desk, (x, y - 0.62))
    dup(chair, (x, y), chair.rotation_euler.z)
for mid, loc, rz in [("wall_clock", (1.6, 3.02, 2.35), 0), ("potted_plant_01", (3.4, 2.5, 0), 0.4), ("book_encyclopedia_set_01", (-1.8, 0.9, 0.0), 0.3)]:
    try:
        r = import_model(mid, loc, rz)
        if mid == "wall_clock":
            r.rotation_euler = (math.radians(90), 0, 0)
        if mid == "book_encyclopedia_set_01":
            r.location.z = bbox(desk)[1].z
    except Exception as e:  # optional props: a missing one never breaks the shot
        print("skip", mid, e)

SEAT = seat_z(0, -0.06)

# ---------------------------------------------------------------- Dave (stickman: white tubes + ball head)
dave = bpy.data.collections.new("Dave")
sc.collection.children.link(dave)
body_m, n, l, p = nodes_mat("dave_body")
p.inputs["Base Color"].default_value = (0.93, 0.93, 0.92, 1)
p.inputs["Roughness"].default_value = 0.32
p.inputs["Coat Weight"].default_value = 0.4
em = n.new("ShaderNodeEmission")
em.inputs["Strength"].default_value = 1.6
mixs = n.new("ShaderNodeMixShader")
l.new(p.outputs["BSDF"], mixs.inputs[1])
l.new(em.outputs["Emission"], mixs.inputs[2])
l.new(mixs.outputs["Shader"], n["Material Output"].inputs["Surface"])
FLASH = mixs.inputs["Fac"]

root = bpy.data.objects.new("Dave", None)
dave.objects.link(root)
root.location = (0, -0.04, SEAT + 0.03)


def link(o):
    for c in o.users_collection:
        c.objects.unlink(o)
    dave.objects.link(o)
    o.parent = root
    return o


def tube(name, n=9, r=0.03):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth, cu.bevel_resolution, cu.use_fill_caps = r, 4, True
    sp = cu.splines.new("POLY")
    sp.points.add(n - 1)
    o = bpy.data.objects.new(name, cu)
    o.data.materials.append(body_m)
    return link(o)


def ball(name, r, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=48, ring_count=24)
    o = bpy.context.object
    o.name, o.scale = name, scale
    bpy.ops.object.shade_smooth()
    o.data.materials.append(body_m)
    return link(o)


def bend(a, b, c, n=9):
    """points through a, b (joint), c — quadratic bezier passing through b at t=.5"""
    a, b, c = Vector(a), Vector(b), Vector(c)
    k = 2 * b - (a + c) / 2
    return [(1 - t) ** 2 * a + 2 * (1 - t) * t * k + t * t * c for t in [i / (n - 1) for i in range(n)]]


NECK, HIP = Vector((0, 0, 0.44)), Vector((0, 0, 0))
SH = {"l": Vector((-0.05, 0, 0.38)), "r": Vector((0.05, 0, 0.38))}
HP = {"l": Vector((-0.06, 0, 0)), "r": Vector((0.06, 0, 0))}
torso = tube("torso", 2, 0.034)
arms = {s: tube(f"arm_{s}") for s in "lr"}
legs = {s: tube(f"leg_{s}") for s in "lr"}
hands = {s: ball(f"hand_{s}", 0.042) for s in "lr"}
feet = {s: ball(f"foot_{s}", 0.055, (0.8, 1.5, 0.6)) for s in "lr"}
head = ball("head", 0.21)
head.location = NECK + Vector((0, 0, 0.2))
for i, pt in enumerate([HIP, NECK]):
    torso.data.splines[0].points[i].co = (*pt, 1)

# sitting legs (fixed): knees forward, shins down to the floor
for s in "lr":
    k = HP[s] + Vector((-0.03 if s == "l" else 0.03, -0.32, 0.04))
    ft = Vector((k.x, k.y - 0.05, -SEAT + 0.03))
    for i, pt in enumerate(bend(HP[s], k, ft)):
        legs[s].data.splines[0].points[i].co = (*pt, 1)
    feet[s].location = ft + Vector((0, -0.05, 0.02))

# ink faces: a shrink-wrapped decal per expression, hidden except while active
faces = {}
for nm in ["neutral", "shock", "think", "spiral", "panic"]:
    bpy.ops.mesh.primitive_plane_add(size=0.34, location=(0, -0.24, 0), rotation=(math.radians(90), 0, 0))
    o = bpy.context.object
    o.name = f"face_{nm}"
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.subdivide(number_cuts=24)
    bpy.ops.object.mode_set(mode="OBJECT")
    sw = o.modifiers.new("wrap", "SHRINKWRAP")
    sw.target, sw.offset = head, 0.002
    o.data.materials.append(image_mat(f"face_{nm}", os.path.join(T, f"face_{nm}.png"), alpha=True, rough=0.5))
    for c in o.users_collection:
        c.objects.unlink(o)
    dave.objects.link(o)
    o.parent = head
    faces[nm] = o
# sweat drop
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.03, location=(0.17, -0.12, 0.1))
drop = bpy.context.object
drop.scale = (1, 1, 1.5)
drop.data.materials.append(flat("drop", (0.55, 0.8, 1.0), 0.05, 1.0))
for c in drop.users_collection:
    c.objects.unlink(drop)
dave.objects.link(drop)
drop.parent = head

# tax form (not outlined: it is a prop, not the character)
form = plane("taxform", (0, 0, 0), (0.26, 0.34), (0, 0, 0), image_mat("taxform", os.path.join(T, "taxform.png"), rough=0.9))
form.parent = root

# ---------------------------------------------------------------- poses (local to root; Dave faces -Y)
POSES = {
    "hold": dict(el=(-0.15, -0.1, 0.17), hl=(-0.08, -0.3, 0.27), er=(0.15, -0.1, 0.17), hr=(0.08, -0.3, 0.27), form=((0, -0.33, 0.3), (math.radians(62), 0, 0)), head=(0, 0, 0)),
    "look": dict(el=(-0.15, -0.1, 0.17), hl=(-0.09, -0.29, 0.25), er=(0.15, -0.1, 0.17), hr=(0.07, -0.29, 0.25), form=((-0.01, -0.32, 0.28), (math.radians(58), 0, 0)), head=(math.radians(-6), math.radians(8), math.radians(-62))),
    "panic": dict(el=(-0.22, -0.08, 0.36), hl=(-0.09, -0.27, 0.56), er=(0.22, -0.08, 0.36), hr=(0.09, -0.27, 0.56), form=((0, -0.3, 0.6), (math.radians(80), 0, 0)), head=(math.radians(8), 0, 0)),
}


def key_pose(nm, f, shake=(0, 0)):
    P = POSES[nm]
    for s in "lr":
        e, h = Vector(P["e" + s]), Vector(P["h" + s]) + Vector((shake[0], 0, shake[1]))
        for i, pt in enumerate(bend(SH[s], e, h)):
            sp = arms[s].data.splines[0].points[i]
            sp.co = (*pt, 1)
            sp.keyframe_insert("co", frame=f)
        hands[s].location = h
        hands[s].keyframe_insert("location", frame=f)
    loc, rot = P["form"]
    form.location = Vector(loc) + Vector((shake[0], 0, shake[1]))
    form.rotation_euler = (rot[0], rot[1], rot[2] + shake[0] * 4)
    form.keyframe_insert("location", frame=f)
    form.keyframe_insert("rotation_euler", frame=f)
    head.rotation_euler = P["head"]
    head.keyframe_insert("rotation_euler", frame=f)


def key_face(nm, f):
    for k, o in faces.items():
        o.hide_render = k != nm
        o.keyframe_insert("hide_render", frame=f)


# swaps land half a frame early so motion blur never ghosts a cut
key_pose("hold", 1)
key_face("neutral", 1)
key_face("shock", 9.5)
key_pose("look", 27.5)
key_face("think", 27.5)
key_face("none", 47.5)  # white silhouette frame: no face, black outline only
key_face("spiral", 48.5)
for f, val in [(1, 0), (47.5, 1), (48.5, 0)]:
    FLASH.default_value = val
    FLASH.keyframe_insert("default_value", frame=f)
key_pose("panic", 79.5)
key_face("panic", 79.5)
for f in range(82, 121, 2):  # paper shakes every 2 frames (on twos, like a held tremble)
    key_pose("panic", f - 0.5, ((0.012 if (f // 2) % 2 else -0.012), (0.008 if (f // 4) % 2 else -0.004)))
# sweat drop: appears with the shock face, slides down slowly
drop.hide_render = True
drop.keyframe_insert("hide_render", frame=1)
drop.hide_render = False
drop.keyframe_insert("hide_render", frame=9.5)
drop.location = (0.17, -0.12, 0.1)
drop.keyframe_insert("location", frame=10)
drop.location = (0.18, -0.11, -0.02)
drop.keyframe_insert("location", frame=120)

for o in list(arms.values()) + list(hands.values()) + [head, form] + list(faces.values()) + [drop]:
    keys_const(o)
    keys_const(o.data) if o.type == "CURVE" else None
keys_const(body_m.node_tree)
for fc in drop.animation_data.action.fcurves:
    if fc.data_path == "location":
        for k in fc.keyframe_points:
            k.interpolation = "LINEAR"
for fc in form.animation_data.action.fcurves:
    for k in fc.keyframe_points:
        if k.co.x > 81:
            k.interpolation = "LINEAR"

# ---------------------------------------------------------------- outline: Freestyle on Dave only
sc.render.use_freestyle = True
sc.render.line_thickness_mode = "ABSOLUTE"
sc.render.line_thickness = 3.2 * H / 1080
fs = bpy.context.view_layer.freestyle_settings
for ls in list(fs.linesets):
    fs.linesets.remove(ls)
ls = fs.linesets.new("dave")
ls.select_by_collection, ls.collection = True, dave
ls.select_silhouette, ls.select_border, ls.select_crease = True, True, False
ls.linestyle.color = (0.04, 0.04, 0.04)
ls.linestyle.thickness = 3.2 * H / 1080
fs.use_culling = False
ls.select_by_face_marks = False
excl = bpy.data.collections.new("no_line")
sc.collection.children.link(excl)
for o in list(faces.values()) + [drop]:
    excl.objects.link(o)
    dave.objects.unlink(o)

# ---------------------------------------------------------------- lights (grey overcast daylight + soft ceiling fill)
world = bpy.data.worlds.new("w")
sc.world = world
world.use_nodes = True
wn = world.node_tree.nodes
env = wn.new("ShaderNodeTexEnvironment")
env.image = bpy.data.images.load(os.path.join(A, MAN["hdri"]))
world.node_tree.links.new(env.outputs["Color"], wn["Background"].inputs["Color"])
wn["Background"].inputs["Strength"].default_value = 0.35

sun = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
sc.collection.objects.link(sun)
sun.data.energy, sun.data.color, sun.data.angle = 3.2, (1.0, 0.92, 0.8), math.radians(3)
sun.rotation_euler = Vector((1, 0.35, -0.5)).to_track_quat("-Z", "Y").to_euler()
win = bpy.data.objects.new("window", bpy.data.lights.new("window", "AREA"))
sc.collection.objects.link(win)
win.data.shape, win.data.size, win.data.size_y = "RECTANGLE", 2.6, 1.5
win.data.energy, win.data.color = 380, (0.8, 0.87, 1.0)
win.location, win.rotation_euler = (-3.85, -0.1, 1.65), (0, math.radians(-90), 0)
fill = bpy.data.objects.new("ceiling", bpy.data.lights.new("ceiling", "AREA"))
sc.collection.objects.link(fill)
fill.data.size, fill.data.energy, fill.data.color = 4.0, 120, (1.0, 0.95, 0.88)
fill.location = (0.3, 0.3, 2.95)

# ---------------------------------------------------------------- cameras + cuts
def cam(name, loc, target, lens):
    c = bpy.data.objects.new(name, bpy.data.cameras.new(name))
    sc.collection.objects.link(c)
    c.location = loc
    c.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    c.data.lens = lens
    return c


wide = cam("wide", (2.25, -4.3, 1.0), (-0.35, 0.5, 0.95), 26)
close = cam("close", (0.7, -1.55, 1.08), (-0.25, 0.4, 1.02), 38)
wide2 = cam("wide2", (2.25, -4.3, 1.0), (-0.35, 0.5, 0.95), 26)
r_end = wide2.rotation_euler.copy()
wide2.rotation_euler = (r_end.x - 0.03, r_end.y, r_end.z + math.radians(16))
wide2.keyframe_insert("rotation_euler", frame=79.5)
wide2.rotation_euler = r_end
wide2.keyframe_insert("rotation_euler", frame=82)
for fc in wide2.animation_data.action.fcurves:
    for k in fc.keyframe_points:
        k.interpolation = "QUAD"
        k.easing = "EASE_OUT"
for f, c in [(1, wide), (48, close), (80, wide2)]:
    sc.timeline_markers.new(c.name, frame=f).camera = c
sc.camera = wide

# ---------------------------------------------------------------- render
os.makedirs(OUT, exist_ok=True)
frames = []
for part in FR.split(","):
    a, _, b = part.partition("-")
    frames += list(range(int(a), int(b or a) + 1))
for f in frames:
    sc.frame_set(f)
    sc.camera = wide if f < 48 else close if f < 80 else wide2
    sc.render.filepath = os.path.join(OUT, f"f_{f:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", f, flush=True)
