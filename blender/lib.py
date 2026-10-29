"""Shared Blender kit for v6 shots (STYLE_3D.md §12): Cycles setup, CC0 Poly Haven models, the classroom world,
stickman Dave (white tubes + ball head, Freestyle outline, ink-face decals) posed by joint targets, cameras.
Shots render STILLS per pose state (the reference's burst→hold timing is done in Remotion), so a minute of video
costs ~20 renders instead of ~1,400 frames."""
import bpy, os, math, json
from mathutils import Vector, Matrix

R = math.radians


class K:
    A = T = OUT = None
    MAN = {}
    sc = None
    W = H = 0


def setup(argv):
    args = dict(zip(argv[::2], argv[1::2]))
    K.A, K.T, K.OUT = args["--assets"], args["--tex"], args["--out"]
    K.MAN = json.load(open(os.path.join(K.A, "manifest.json")))
    K.W, K.H = map(int, args.get("--res", "1920x1080").split("x"))
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = K.sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = int(args.get("--samples", "32"))
    sc.cycles.use_denoising = True
    sc.cycles.max_bounces = 6
    sc.render.resolution_x, sc.render.resolution_y = K.W, K.H
    sc.render.fps = 24
    sc.view_settings.view_transform = "AgX"
    sc.view_settings.look = "AgX - Medium High Contrast"
    os.makedirs(K.OUT, exist_ok=True)
    return args


# ---------------------------------------------------------------- materials
def nodes_mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links, m.node_tree.nodes["Principled BSDF"]


def flat(name, rgb, rough=0.6, coat=0.0, emit=0.0):
    m, n, l, p = nodes_mat(name)
    p.inputs["Base Color"].default_value = (*rgb, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Coat Weight"].default_value = coat
    if emit:
        p.inputs["Emission Color"].default_value = (*rgb, 1)
        p.inputs["Emission Strength"].default_value = emit
    return m


def pbr(name, tex, scale=0.5, tint=None):
    m, n, l, p = nodes_mat(name)
    tc, mp = n.new("ShaderNodeTexCoord"), n.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (scale, scale, scale)
    l.new(tc.outputs["Object"], mp.inputs["Vector"])

    def img(rel, color):
        t = n.new("ShaderNodeTexImage")
        t.image = bpy.data.images.load(os.path.join(K.A, rel))
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


def image_mat(name, file, alpha=False, rough=0.8):
    m, n, l, p = nodes_mat(name)
    t = n.new("ShaderNodeTexImage")
    t.image = bpy.data.images.load(os.path.join(K.T, file))
    l.new(t.outputs["Color"], p.inputs["Base Color"])
    p.inputs["Roughness"].default_value = rough
    if alpha:
        l.new(t.outputs["Alpha"], p.inputs["Alpha"])
    return m


# ---------------------------------------------------------------- geometry
def into(o, coll):
    for c in o.users_collection:
        c.objects.unlink(o)
    coll.objects.link(o)
    return o


def box(name, loc, size, mat, coll=None):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2)
    o.data.materials.append(mat)
    return into(o, coll) if coll else o


def plane(name, loc, size, rot, mat, coll=None):
    bpy.ops.mesh.primitive_plane_add(location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = (size[0] / 2, size[1] / 2, 1)
    o.data.materials.append(mat)
    return into(o, coll) if coll else o


def tree(o):
    out = [o]
    for c in o.children:
        out += tree(c)
    return out


def import_model(mid, loc=(0, 0, 0), rz=0.0, coll=None):
    d = os.path.join(K.A, "models", mid)
    f = next(x for x in os.listdir(d) if x.endswith(".gltf"))
    bpy.ops.object.select_all(action="DESELECT")
    bpy.ops.import_scene.gltf(filepath=os.path.join(d, f))
    objs = list(bpy.context.selected_objects)
    root = bpy.data.objects.new(mid, None)
    (coll or K.sc.collection).objects.link(root)
    for o in objs:
        if coll:
            into(o, coll)
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
    lo, hi = bbox(root)
    c = (lo + hi) / 2
    top = [o.matrix_world @ v.co for o in tree(root) if o.type == "MESH" for v in o.data.vertices]
    top = [p for p in top if p.z > lo.z + 0.7 * (hi.z - lo.z)]
    m = sum(top, Vector()) / max(1, len(top))
    return math.atan2(m.y - c.y, m.x - c.x)


def ray_z(x, y, z0=1.3):
    bpy.context.view_layer.update()
    hit, loc, *_ = K.sc.ray_cast(bpy.context.evaluated_depsgraph_get(), Vector((x, y, z0)), Vector((0, 0, -1)))
    return loc.z if hit else None


def text3d(body, loc, rot, size, mat, coll, extrude=0.06):
    cu = bpy.data.curves.new(body, "FONT")
    cu.body, cu.size, cu.extrude, cu.bevel_depth = body, size, extrude, 0.008
    cu.align_x, cu.align_y = "CENTER", "BOTTOM"
    o = bpy.data.objects.new(body, cu)
    coll.objects.link(o)
    o.location, o.rotation_euler = loc, rot
    o.data.materials.append(mat)
    return o


# ---------------------------------------------------------------- classroom world (≈ 8 × 9 m, 3 m high)
class Classroom:
    def __init__(self):
        sc = K.sc
        self.coll = c = bpy.data.collections.new("world")
        sc.collection.children.link(c)
        floor_m = pbr("floor", K.MAN["floor"], 0.6)
        wall_m = pbr("wall", K.MAN["wall"], 0.5, tint=(0.82, 0.86, 0.8))
        trim_m = flat("trim", (0.32, 0.25, 0.18), 0.5)
        white_m = flat("frame_white", (0.85, 0.85, 0.82), 0.4)
        self.board_m = image_mat("chalkboard", "chalkboard.png", rough=0.95)
        self.board_img = self.board_m.node_tree.nodes["Image Texture"]
        plane("floor", (0, 0, 0), (9, 9), (0, 0, 0), floor_m, c)
        box("ceiling", (0, 0, 3.05), (9, 9, 0.1), wall_m, c)
        box("wall_back", (0, 3.1, 1.5), (9, 0.15, 3.1), wall_m, c)
        box("wall_right", (4.0, 0, 1.5), (0.15, 9, 3.1), wall_m, c)
        box("wall_front", (0, -5.5, 1.5), (9, 0.15, 3.1), wall_m, c)
        X = -4.0
        box("wl_a", (X, -3.2, 1.5), (0.15, 3.6, 3.1), wall_m, c)
        box("wl_b", (X, 3.15, 1.5), (0.15, 3.9, 3.1), wall_m, c)
        box("wl_low", (X, -0.1, 0.45), (0.15, 2.6, 0.9), wall_m, c)
        box("wl_high", (X, -0.1, 2.75), (0.15, 2.6, 0.7), wall_m, c)
        for y in (-1.4, -0.1, 1.2):
            box("wf_v", (X, y, 1.65), (0.17, 0.06, 1.5), white_m, c)
        for z in (0.9, 1.65, 2.4):
            box("wf_h", (X, -0.1, z), (0.17, 2.6, 0.06), white_m, c)
        plane("sky", (-6.5, 0, 1.6), (26, 10), (0, R(90), 0), flat("sky", (0.75, 0.85, 1.0), emit=2.5), c)
        box("skirt", (0, 3.0, 0.06), (9, 0.04, 0.12), trim_m, c)
        plane("board", (-1.3, 3.015, 1.55), (2.8, 1.25), (R(90), 0, 0), self.board_m, c)
        for nm, loc, size in [("bf_t", (-1.3, 3.0, 2.2), (2.9, 0.05, 0.06)), ("bf_b", (-1.3, 3.0, 0.9), (2.9, 0.05, 0.06)),
                              ("bf_l", (-2.72, 3.0, 1.55), (0.06, 0.05, 1.36)), ("bf_r", (0.12, 3.0, 1.55), (0.06, 0.05, 1.36)), ("tray", (-1.3, 2.95, 0.89), (2.8, 0.1, 0.03))]:
            box(nm, loc, size, trim_m, c)
        self.chair = import_model("SchoolChair_01", coll=c)
        self.chair.rotation_euler.z = R(90) - back_dir(self.chair)  # backrest → +Y (behind Dave)
        self.desk = import_model("SchoolDesk_01", (0, -0.62, 0), coll=c)
        lo, hi = bbox(self.desk)
        if (hi.x - lo.x) < (hi.y - lo.y):
            self.desk.rotation_euler.z = R(90)
        for x, y in [(-1.8, 0), (-1.8, 1.5), (0, 1.5), (1.8, 1.5), (-1.8, -1.6)]:
            dup(self.desk, (x, y - 0.62, 0))
            dup(self.chair, (x, y, 0), self.chair.rotation_euler.z)
        for mid, loc, rz in [("wall_clock", (1.6, 3.02, 2.35), 0), ("potted_plant_01", (3.4, 2.5, 0), 0.4), ("book_encyclopedia_set_01", (-1.8, 0.9, 0.0), 0.3)]:
            try:
                r = import_model(mid, loc, rz, coll=c)
                if mid == "wall_clock":
                    r.rotation_euler = (R(90), 0, 0)
                if mid == "book_encyclopedia_set_01":
                    r.location.z = bbox(self.desk)[1].z
            except Exception as e:
                print("skip", mid, e)
        self.seat = ray_z(0, -0.06) or 0.45
        self.desk_top = bbox(self.desk)[1].z
        self.chair0, self.desk0 = self.chair.rotation_euler.z, self.desk.rotation_euler.z

    def board(self, file):
        self.board_img.image = bpy.data.images.load(os.path.join(K.T, file), check_existing=True)

    def show(self, on=True):
        for o in self.coll.all_objects:
            o.hide_render = not on

    def seat_dave(self, turn):
        """Dave's own chair + desk turned toward the camera by `turn` (desk to his side)."""
        self.chair.rotation_euler.z = self.chair0 + turn
        self.desk.location = (-0.85, -0.35, 0)
        self.desk.rotation_euler.z = self.desk0 + turn


def lights(kind="classroom"):
    sc = K.sc
    world = bpy.data.worlds.new("w")
    sc.world = world
    world.use_nodes = True
    wn = world.node_tree.nodes
    env = wn.new("ShaderNodeTexEnvironment")
    env.image = bpy.data.images.load(os.path.join(K.A, K.MAN["hdri"]))
    world.node_tree.links.new(env.outputs["Color"], wn["Background"].inputs["Color"])
    wn["Background"].inputs["Strength"].default_value = 0.12
    L = {}

    def add(name, typ, **kw):
        o = bpy.data.objects.new(name, bpy.data.lights.new(name, typ))
        sc.collection.objects.link(o)
        for k, v in kw.items():
            setattr(o.data, k, v)
        L[name] = o
        return o

    sun = add("sun", "SUN", energy=5.5, color=(1.0, 0.9, 0.76), angle=R(2))
    sun.rotation_euler = Vector((1, 0.2, -0.36)).to_track_quat("-Z", "Y").to_euler()
    win = add("window", "AREA", shape="RECTANGLE", size=2.6, size_y=1.5, energy=260, color=(0.78, 0.86, 1.0))
    win.location, win.rotation_euler = (-3.85, -0.1, 1.65), (0, R(-90), 0)
    fill = add("ceiling", "AREA", size=4.0, energy=45, color=(1.0, 0.95, 0.88))
    fill.location = (0.3, 0.3, 2.95)
    return L


def cam(name, loc, target, lens):
    c = bpy.data.objects.new(name, bpy.data.cameras.new(name))
    K.sc.collection.objects.link(c)
    c.location = loc
    c.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    c.data.lens = lens
    return c


# ---------------------------------------------------------------- Dave
FACES = ["neutral", "shock", "think", "spiral", "panic", "grin", "determined", "smug", "sleep", "dead"]


def bend(a, b, c, n=9):
    a, b, c = Vector(a), Vector(b), Vector(c)
    k = 2 * b - (a + c) / 2
    return [(1 - t) ** 2 * a + 2 * (1 - t) * t * k + t * t * c for t in [i / (n - 1) for i in range(n)]]


# arm targets in Dave's body frame (faces -Y; +X = screen-right when he faces the camera); head = euler (x, y, z);
# lean = forward bend of the whole upper body (deg)
POSES = {
    "idle": dict(el=(-0.12, 0, 0.16), hl=(-0.13, -0.02, -0.06), er=(0.12, 0, 0.16), hr=(0.13, -0.02, -0.06)),
    "hold": dict(el=(-0.17, -0.06, 0.14), hl=(-0.1, -0.26, 0.04), er=(0.2, -0.06, 0.2), hr=(0.25, -0.24, 0.31), head=(-8, 0, 8)),
    "look": dict(el=(-0.17, -0.06, 0.14), hl=(-0.1, -0.26, 0.04), er=(0.2, -0.06, 0.2), hr=(0.25, -0.24, 0.31), head=(-4, 6, -34)),
    "panic": dict(el=(-0.27, -0.04, 0.38), hl=(-0.2, -0.08, 0.66), er=(0.26, -0.06, 0.32), hr=(0.27, -0.22, 0.52), head=(10, 0, -6)),
    "fists": dict(el=(-0.22, -0.06, 0.12), hl=(-0.14, -0.2, 0.2), er=(0.22, -0.06, 0.12), hr=(0.14, -0.2, 0.2), head=(-10, 0, 0), lean=-4),
    "point_l": dict(el=(-0.24, -0.06, 0.38), hl=(-0.46, -0.1, 0.42), er=(0.12, 0, 0.16), hr=(0.13, -0.02, -0.06), head=(-4, 0, -18)),
    "point_you": dict(er=(0.14, -0.16, 0.3), hr=(0.1, -0.42, 0.36), head=(-6, 0, 0)),
    "shrug": dict(el=(-0.24, -0.02, 0.2), hl=(-0.34, -0.1, 0.36), er=(0.24, -0.02, 0.2), hr=(0.34, -0.1, 0.36), head=(0, 0, 12)),
    "count": dict(er=(0.2, -0.06, 0.22), hr=(0.18, -0.16, 0.5), head=(-6, 0, 6)),
    "cheer": dict(el=(-0.22, 0, 0.5), hl=(-0.3, -0.05, 0.75), er=(0.22, 0, 0.5), hr=(0.3, -0.05, 0.75), head=(-12, 0, 0)),
    "sleep": dict(el=(-0.2, -0.22, 0.02), hl=(0.02, -0.3, 0.02), er=(0.2, -0.22, 0.02), hr=(-0.02, -0.34, 0.04), head=(30, 0, 20), lean=48),
    "read": dict(el=(-0.17, -0.16, 0.16), hl=(-0.1, -0.32, 0.22), er=(0.17, -0.16, 0.16), hr=(0.1, -0.32, 0.22), head=(16, 0, 0), lean=14),
    "slump": dict(el=(-0.16, 0.0, 0.0), hl=(-0.2, 0.02, -0.22), er=(0.16, 0.0, 0.0), hr=(0.2, 0.02, -0.22), head=(30, 0, 24), lean=-22),
}


def flashable(name, rgb, rough=0.6, coat=0.0, fabric=False):
    """material that can turn into the reference's flat white silhouette (mix factor 1 = white emission).
    fabric=True: knit bump + sheen so clothes read as cloth, not paint (owner 29 Oct)"""
    m, n, l, p = nodes_mat(name)
    p.inputs["Base Color"].default_value = (*rgb, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Coat Weight"].default_value = coat
    if fabric:
        p.inputs["Sheen Weight"].default_value = 0.8
        p.inputs["Sheen Roughness"].default_value = 0.6
        nz = n.new("ShaderNodeTexNoise")
        nz.inputs["Scale"].default_value = 900
        nz.inputs["Detail"].default_value = 2
        wv = n.new("ShaderNodeTexWave")
        wv.inputs["Scale"].default_value = 260
        wv.inputs["Distortion"].default_value = 3
        mixc = n.new("ShaderNodeMath")
        mixc.operation = "ADD"
        l.new(nz.outputs["Fac"], mixc.inputs[0])
        l.new(wv.outputs["Fac"], mixc.inputs[1])
        bp = n.new("ShaderNodeBump")
        bp.inputs["Strength"].default_value = 0.12
        bp.inputs["Distance"].default_value = 0.002
        l.new(mixc.outputs["Value"], bp.inputs["Height"])
        l.new(bp.outputs["Normal"], p.inputs["Normal"])
    em = n.new("ShaderNodeEmission")
    em.inputs["Strength"].default_value = 1.6
    mx = n.new("ShaderNodeMixShader")
    l.new(p.outputs["BSDF"], mx.inputs[1])
    l.new(em.outputs["Emission"], mx.inputs[2])
    l.new(mx.outputs["Shader"], n["Material Output"].inputs["Surface"])
    mx.inputs["Fac"].default_value = 0.0  # the mix node defaults to 0.5 = half-white (washed-out bug, 29 Oct)
    return m, mx.inputs["Fac"]


# outfits: (torso colour, torso radius, sleeve colour, sleeve radius, pants colour, pants radius, extras)
# default (owner 29 Oct): red OVERSIZED hoodie + black pants; costume swaps per scene role
OUTFITS = {
    "hoodie": dict(torso=((0.62, 0.04, 0.05), 0.135), arms=((0.62, 0.04, 0.05), 0.072), legs=((0.035, 0.035, 0.04), 0.07), hood=True, hem=True, pocket=True, strings=True, waist=True, shoes=True),
    "professor": dict(torso=((0.33, 0.2, 0.11), 0.1), arms=((0.33, 0.2, 0.11), 0.058), legs=((0.16, 0.16, 0.18), 0.058), glasses=True, cap=True, waist=True, shoes=True),
    "doctor": dict(torso=((0.92, 0.93, 0.95), 0.11), arms=((0.92, 0.93, 0.95), 0.06), legs=((0.12, 0.3, 0.42), 0.058), mirror=True, waist=True, shoes=True),
    "suit": dict(torso=((0.08, 0.09, 0.13), 0.095), arms=((0.08, 0.09, 0.13), 0.055), legs=((0.08, 0.09, 0.13), 0.055), tie=True, waist=True, shoes=True),
    "none": dict(torso=(None, 0.034), arms=(None, 0.03), legs=(None, 0.03)),
    "muscle": dict(torso=((0.72, 0.07, 0.09), 0.17), arms=((0.72, 0.07, 0.09), 0.085), legs=((0.72, 0.07, 0.09), 0.075), shoes=True),
}


class Dave:
    def __init__(self, coll_name="Dave"):
        sc = K.sc
        self.coll = d = bpy.data.collections.new(coll_name)
        sc.collection.children.link(d)
        self.noline = bpy.data.collections.new("no_line")
        sc.collection.children.link(self.noline)
        m, n, l, p = nodes_mat("dave_body")
        p.inputs["Base Color"].default_value = (0.93, 0.93, 0.92, 1)
        p.inputs["Roughness"].default_value = 0.32
        p.inputs["Coat Weight"].default_value = 0.4
        em = n.new("ShaderNodeEmission")
        em.inputs["Strength"].default_value = 1.6
        mx = n.new("ShaderNodeMixShader")
        l.new(p.outputs["BSDF"], mx.inputs[1])
        l.new(em.outputs["Emission"], mx.inputs[2])
        l.new(mx.outputs["Shader"], n["Material Output"].inputs["Surface"])
        mx.inputs["Fac"].default_value = 0.0
        self.body_m, self.flash_in = m, mx.inputs["Fac"]
        self.root = bpy.data.objects.new("Dave", None)
        d.objects.link(self.root)
        self.NECK, self.HIP = Vector((0, 0, 0.44)), Vector((0, 0, 0))
        self.SH = {"l": Vector((-0.05, 0, 0.38)), "r": Vector((0.05, 0, 0.38))}
        self.HP = {"l": Vector((-0.06, 0, 0)), "r": Vector((0.06, 0, 0))}
        self.torso = self.tube("torso", 7, 0.034)
        self.arms = {s: self.tube(f"arm_{s}") for s in "lr"}
        self.legs = {s: self.tube(f"leg_{s}") for s in "lr"}
        self.hands = {s: self.ball(f"hand_{s}", 0.042) for s in "lr"}
        self.feet = {s: self.ball(f"foot_{s}", 0.055, (0.8, 1.5, 0.6)) for s in "lr"}
        self.head = self.ball("head", 0.21)
        self.faces = {}
        for nm in FACES:
            bpy.ops.mesh.primitive_plane_add(size=0.44, location=(0, -0.26, 0.01), rotation=(R(90), 0, 0))
            o = bpy.context.object
            o.name = f"face_{nm}"
            bpy.ops.object.mode_set(mode="EDIT")
            bpy.ops.mesh.subdivide(number_cuts=24)
            bpy.ops.object.mode_set(mode="OBJECT")
            sw = o.modifiers.new("wrap", "SHRINKWRAP")
            sw.target, sw.offset = self.head, 0.002
            o.data.materials.append(image_mat(f"face_{nm}", f"face_{nm}.png", alpha=True, rough=0.5))
            into(o, self.noline).parent = self.head
            self.faces[nm] = o
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.022, location=(-0.1, -0.17, 0.13))
        self.drop = bpy.context.object
        self.drop.scale = (1, 1, 1.5)
        self.drop.data.materials.append(flat("drop", (0.55, 0.8, 1.0), 0.05, 1.0))
        into(self.drop, self.noline).parent = self.head
        self.props = {}
        # clothes: one flashable material per part (recoloured per outfit) + costume extras
        self.cloth = {}
        self.flash_ins = [self.flash_in]
        for part in ("torso", "arms", "legs"):
            m, fac = flashable(f"cloth_{part}", (1, 1, 1), 0.85, fabric=True)
            self.cloth[part] = m
            self.flash_ins.append(fac)
        for o in [self.torso]:
            o.data.materials[0] = self.cloth["torso"]
        for s_ in "lr":
            self.arms[s_].data.materials[0] = self.cloth["arms"]
            self.legs[s_].data.materials[0] = self.cloth["legs"]
        hood_m, fac = flashable("hood", (0.55, 0.03, 0.04), 0.9, fabric=True)
        self.flash_ins.append(fac)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.2, segments=32, ring_count=16)
        self.hood = bpy.context.object
        self.hood.name, self.hood.scale = "hood", (1.12, 0.7, 0.62)
        bpy.ops.object.shade_smooth()
        self.hood.data.materials.append(hood_m)
        into(self.hood, self.coll).parent = self.root
        dark_m, fac = flashable("costume_dark", (0.03, 0.03, 0.03), 0.5)
        self.flash_ins.append(fac)
        self.extras = {}
        # glasses: two rings + bridge on the face (parented to the head)
        g = []
        for x in (-0.075, 0.075):
            bpy.ops.mesh.primitive_torus_add(major_radius=0.05, minor_radius=0.007, location=(x, -0.205, 0.04), rotation=(R(90), 0, 0))
            g.append(bpy.context.object)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.006, depth=0.05, location=(0, -0.21, 0.045), rotation=(0, R(90), 0))
        g.append(bpy.context.object)
        for o in g:
            o.data.materials.append(dark_m)
            into(o, self.noline).parent = self.head
        self.extras["glasses"] = g
        # mortarboard
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.215))
        top = bpy.context.object
        top.scale, top.rotation_euler = (0.34, 0.34, 0.018), (R(-6), 0, R(45))
        bpy.ops.mesh.primitive_cylinder_add(radius=0.12, depth=0.07, location=(0, 0, 0.18))
        cap = [top, bpy.context.object]
        for o in cap:
            o.data.materials.append(dark_m)
            into(o, self.coll).parent = self.head
        self.extras["cap"] = cap
        # tie (suit)
        red_m, fac = flashable("tie", (0.7, 0.05, 0.05), 0.5)
        self.flash_ins.append(fac)
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.075, 0.33))
        tie = bpy.context.object
        tie.scale = (0.035, 0.012, 0.13)
        tie.data.materials.append(red_m)
        into(tie, self.coll).parent = self.root
        self.extras["tie"] = [tie]
        # head mirror (doctor)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.045, depth=0.008, location=(0, -0.18, 0.15), rotation=(R(80), 0, 0))
        mir = bpy.context.object
        mir.data.materials.append(flat("mirror", (0.85, 0.87, 0.9), 0.1))
        into(mir, self.noline).parent = self.head
        self.extras["mirror"] = [mir]
        # hoodie / pants details: ribbed hem band, kangaroo pocket, drawstrings, waistband, sneakers
        rib_m, fac = flashable("rib", (0.5, 0.03, 0.04), 0.95, fabric=True)
        self.flash_ins.append(fac)
        bpy.ops.mesh.primitive_torus_add(major_radius=0.14, minor_radius=0.03)
        hem = bpy.context.object
        bpy.ops.object.shade_smooth()
        hem.data.materials.append(rib_m)
        into(hem, self.coll).parent = self.root
        self.extras["hem"] = [hem]
        bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=0.2, vertices=32)
        pk = bpy.context.object
        pk.scale = (1, 0.55, 0.15)
        pk.data.materials.append(rib_m)
        bpy.ops.object.shade_smooth()
        into(pk, self.coll).parent = self.root
        self.extras["pocket"] = [pk]
        white_m, fac = flashable("string", (0.9, 0.9, 0.88), 0.7)
        self.flash_ins.append(fac)
        st = []
        for x in (-0.035, 0.035):
            bpy.ops.mesh.primitive_cylinder_add(radius=0.008, depth=0.16)
            o = bpy.context.object
            o.data.materials.append(white_m)
            into(o, self.noline).parent = self.root
            st.append(o)
        self.extras["strings"] = st
        belt_m, fac = flashable("waistband", (0.02, 0.02, 0.02), 0.6, fabric=True)
        self.flash_ins.append(fac)
        bpy.ops.mesh.primitive_torus_add(major_radius=0.1, minor_radius=0.03)
        wb = bpy.context.object
        bpy.ops.object.shade_smooth()
        wb.data.materials.append(belt_m)
        into(wb, self.coll).parent = self.root
        self.extras["waist"] = [wb]
        self.shoe_m, fac = flashable("sneaker", (0.95, 0.95, 0.95), 0.45, 0.3)
        self.flash_ins.append(fac)
        self.extras["shoes"] = []
        self.outfit("hoodie")
        self.outline()

    def tube(self, name, n=9, r=0.03, mat=None):
        cu = bpy.data.curves.new(name, "CURVE")
        cu.dimensions = "3D"
        cu.bevel_depth, cu.bevel_resolution, cu.use_fill_caps = r, 4, True
        sp = cu.splines.new("POLY")
        sp.points.add(n - 1)
        o = bpy.data.objects.new(name, cu)
        o.data.materials.append(mat or self.body_m)
        self.coll.objects.link(o)
        o.parent = self.root
        return o

    def ball(self, name, r, scale=(1, 1, 1)):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=48, ring_count=24)
        o = bpy.context.object
        o.name, o.scale = name, scale
        bpy.ops.object.shade_smooth()
        o.data.materials.append(self.body_m)
        into(o, self.coll).parent = self.root
        return o

    def prop(self, name, size, file, outline=False):
        """flat card held/placed relative to Dave (tax form, book…)"""
        o = plane(name, (0, 0, 0), size, (0, 0, 0), image_mat(name, file, rough=0.9), self.coll if outline else self.noline)
        o.parent = self.root
        self.props[name] = o
        return o

    def outline(self):
        sc = K.sc
        sc.render.use_freestyle = True
        sc.render.line_thickness_mode = "ABSOLUTE"
        th = 4.6 * K.H / 1080
        sc.render.line_thickness = th
        fs = bpy.context.view_layer.freestyle_settings
        if not getattr(Dave, "_lined", False):
            for ls in list(fs.linesets):
                fs.linesets.remove(ls)
            Dave._lined = True
        ls = fs.linesets.new(self.coll.name)
        ls.select_by_collection, ls.collection = True, self.coll
        ls.select_silhouette, ls.select_border, ls.select_crease = True, True, False
        ls.linestyle.color = (0.04, 0.04, 0.04)
        ls.linestyle.thickness = th

    def place(self, loc, turn=0.0):
        self.root.location, self.root.rotation_euler = loc, (0, 0, turn)

    def legs_walk(self, phase, stride=0.32, lift=0.07):
        """walk cycle: legs swing opposite, swing leg lifts its foot; returns body bob"""
        for s, ph in (("l", phase), ("r", phase + math.pi)):
            hp = self.HP[s]
            sx = -1 if s == "l" else 1
            fwd = -math.sin(ph) * stride
            up_ = max(0.0, math.cos(ph)) * lift
            ft = Vector((sx * 0.08, fwd, -0.7 + up_))
            k = (hp + ft) / 2 + Vector((0, -0.06 - up_ * 0.6, 0))
            for i, pt in enumerate(bend(hp, k, ft)):
                self.legs[s].data.splines[0].points[i].co = (*pt, 1)
            self.feet[s].location = ft + Vector((0, -0.05, 0.02))
        return abs(math.sin(phase)) * 0.025

    def key(self, f):
        """keyframe everything the rig moves at frame f (per-frame keys → Cycles motion blur works)"""
        for o in [self.root, self.head, self.hood, self.drop] + list(self.hands.values()) + list(self.feet.values()) + [x for v in self.extras.values() for x in v]:
            o.keyframe_insert("location", frame=f)
            o.keyframe_insert("rotation_euler", frame=f)
            o.keyframe_insert("scale", frame=f)
        for o in [self.torso] + list(self.arms.values()) + list(self.legs.values()):
            for pt in o.data.splines[0].points:
                pt.keyframe_insert("co", frame=f)
        for o in list(self.faces.values()) + [self.drop]:
            o.keyframe_insert("hide_render", frame=f)
        for fi in self.flash_ins:
            fi.keyframe_insert("default_value", frame=f)

    def legs_set(self, mode, seat=0.45):
        for s in "lr":
            hp = self.HP[s]
            sx = -1 if s == "l" else 1
            if mode == "sit":
                k = hp + Vector((sx * 0.05, -0.34, 0.1))
                ft = Vector((k.x * 1.2, k.y + 0.06, -seat + 0.04))
            else:  # stand: straight legs, a little apart
                k = hp + Vector((sx * 0.03, -0.02, -0.36))
                ft = Vector((sx * 0.1, 0, -0.7))
            for i, pt in enumerate(bend(hp, k, ft)):
                self.legs[s].data.splines[0].points[i].co = (*pt, 1)
            self.feet[s].location = ft + Vector((0, -0.05, 0.02))

    def pose(self, name, shake=(0, 0)):
        P = POSES[name] if isinstance(name, str) else name
        rot = Matrix.Rotation(R(P.get("lean", 0)), 3, "X")
        up = lambda v: rot @ Vector(v)
        for i, pt in enumerate(self.torso.data.splines[0].points):
            pt.co = (*up(self.HIP.lerp(self.NECK, i / 6)), 1)
        out = OUTFITS[getattr(self, "outfit_name", "hoodie")]
        lean_e = (R(P.get("lean", 0)), 0, 0)
        r = out["torso"][1]
        self.extras["hem"][0].location = up(Vector((0, 0, 0.03)))
        self.extras["hem"][0].rotation_euler = lean_e
        self.extras["hem"][0].scale = (r * 1.12 / 0.14, r * 1.12 / 0.14, 1)
        self.extras["pocket"][0].location = up(Vector((0, -r * 1.02, 0.13)))
        self.extras["pocket"][0].rotation_euler = (R(90 + P.get("lean", 0)), 0, 0)
        for x_, o_ in zip((-0.035, 0.035), self.extras["strings"]):
            o_.location = up(Vector((x_, -r * 0.92, 0.34)))
            o_.rotation_euler = lean_e
        ws = out["legs"][1] * 1.9 / 0.1
        self.extras["waist"][0].location = Vector((0, 0, -0.01))
        self.extras["waist"][0].scale = (ws, ws, 1)
        sh = Vector((shake[0], 0, shake[1]))
        for s in "lr":
            e = P.get("e" + s) or POSES["idle"]["e" + s]
            h = P.get("h" + s) or POSES["idle"]["h" + s]
            pts = bend(up(self.SH[s]), up(e), up(h) + sh)
            for i, pt in enumerate(pts):
                self.arms[s].data.splines[0].points[i].co = (*pt, 1)
            self.hands[s].location = pts[-1]
        self.head.location = up(self.NECK + Vector((0, 0, 0.2)))
        self.hood.location = up(self.NECK + Vector((0, 0.07, 0.13)))
        self.extras["tie"][0].location = up(Vector((0, -0.08, 0.32)))
        hx, hy, hz = P.get("head", (0, 0, 0))
        self.head.rotation_euler = (R(hx + P.get("lean", 0)), R(hy), R(hz))
        return up

    def face(self, name, drop=False):
        for k, o in self.faces.items():
            o.hide_render = k != name
        self.drop.hide_render = not drop

    def outfit(self, name):
        o = OUTFITS[name]
        self.outfit_name = name
        for part, objs in (("torso", [self.torso]), ("arms", list(self.arms.values())), ("legs", list(self.legs.values()))):
            rgb, r = o[part]
            for ob in objs:
                ob.data.bevel_depth = r
                ob.data.materials[0] = self.cloth[part] if rgb else self.body_m
            if rgb:
                self.cloth[part].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*rgb, 1)
        prof = {
            "torso": [1.12, 1.16, 1.12, 1.04, 0.96, 0.86, 0.7] if o.get("hood") else [1.0, 1.0, 1.0, 1.0, 0.98, 0.92, 0.8],
            "arms": [0.85, 0.95, 1.0, 1.05, 1.08, 1.0, 1.14, 0.98, 1.1],  # sleeve bunches near the cuff
            "legs": [1.1, 1.05, 1.0, 0.98, 1.02, 1.06, 0.98, 1.12, 1.0],  # pant folds over the shoe
        }
        for part, objs in (("torso", [self.torso]), ("arms", list(self.arms.values())), ("legs", list(self.legs.values()))):
            for ob in objs:
                for i, pt in enumerate(ob.data.splines[0].points):
                    pt.radius = prof[part][i] if o[part][0] else 1.0
        for f_ in self.feet.values():
            f_.data.materials[0] = self.shoe_m if o.get("shoes") else self.body_m
            f_.scale = (1.05, 1.9, 0.75) if o.get("shoes") else (0.8, 1.5, 0.6)
        self.hood.hide_render = not o.get("hood")
        for k, objs in self.extras.items():
            for ob in objs:
                ob.hide_render = not o.get(k)

    def flash(self, on):
        """the reference's 1-frame white silhouette (black outline stays, no face)"""
        for fi in self.flash_ins:
            fi.default_value = 1.0 if on else 0.0
        if on:
            self.face(None)

    def show(self, on=True):
        for o in list(self.coll.all_objects) + list(self.noline.all_objects):
            o.hide_render = not on
        if on:  # re-hide what the current outfit doesn't wear (props are re-hidden by the shot's reset)
            self.outfit(self.outfit_name)


def render(name, camera, transparent=False):
    sc = K.sc
    sc.camera = camera
    sc.render.film_transparent = transparent
    st = sc.render.image_settings
    st.file_format, st.color_mode = ("PNG", "RGBA") if transparent else ("JPEG", "RGB")
    if not transparent:
        st.quality = 92
    sc.render.filepath = os.path.join(K.OUT, name + (".png" if transparent else ".jpg"))
    bpy.ops.render.render(write_still=True)
    print("frame", name, flush=True)


def blend(a, b, t):
    """pose dict between poses a and b (names or dicts), t 0..1 — eased in-betweens for real animation"""
    A = POSES[a] if isinstance(a, str) else a
    B = POSES[b] if isinstance(b, str) else b
    I = POSES["idle"]
    out = {}
    for k in ("el", "hl", "er", "hr", "head"):
        va, vb = A.get(k) or I.get(k, (0, 0, 0)), B.get(k) or I.get(k, (0, 0, 0))
        out[k] = tuple(x + (y - x) * t for x, y in zip(va, vb))
    out["lean"] = A.get("lean", 0) + (B.get("lean", 0) - A.get("lean", 0)) * t
    return out


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def back_out(t, k=1.7):
    """ease-out with overshoot (the reference's snappy entrances)"""
    t = max(0.0, min(1.0, t)) - 1
    return t * t * ((k + 1) * t + k) + 1
