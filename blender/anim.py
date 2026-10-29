"""animtest — real ANIMATION the reference's way (STYLE_3D.md §13): every frame rendered, characters move, cameras move,
Cycles motion blur. Three shots modelled on his opening (concept character in a rich world → self-drawing graph ride →
silhouette light reveal). 24 fps.
blender -b -P blender/anim.py -- --assets A --tex T --out O --frames "A:1-20" [--samples 12] [--res 1920x1080]
  A  money   60 f  a BANK giant (concept character: muscle body + $ logo head) flexes in a yard of cash bales in front of a
                   mansion at golden hour, camera pushes in; Dave tiny in front looks up; at 38 the giant punches at the camera
  B  graph   84 f  lined paper: a growth line draws itself while Dave drives a toy car up it; camera tracks, then pushes in
  C  alley   96 f  night alley: Dave walks in as a silhouette, a spotlight sweeps across and reveals him, he snaps to camera
  D  army    72 f  golden-hour field (real HDRI sky): an army of 32 identical white stickmen marches toward camera in sync,
                   Dave in his red hoodie walks in front of them looking back, low tracking camera
  E  street  72 f  REAL MOCAP (CMU 02_03 jog): Dave jogs down a city street (urban HDRI, asphalt) past white bystanders
                   who walk with CMU 02_01; tracking camera at hip height
"""
import sys, os, math
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import K, R, setup, Dave, flat, pbr, image_mat, box, plane, cam, blend, ease, back_out, finish, dof, world_hdri, ground, crowd, Mocap, mocap_pose, POSES  # noqa: E402
import bpy  # noqa: E402

args = setup(sys.argv[sys.argv.index("--") + 1:])
sc = K.sc
sc.render.use_motion_blur = True
sc.render.motion_blur_shutter = 0.5
sc.cycles.samples = int(args.get("--samples", "12"))
spec = args.get("--frames", "A:1-60")
SHOT, rng = spec.split(":")
FRAMES = []
for part in rng.split(","):
    a, _, b = part.partition("-")
    FRAMES += list(range(int(a), int(b or a) + 1))
LEN = {"A": 60, "B": 84, "C": 96, "D": 72, "E": 72}[SHOT]

POSES["flex"] = dict(el=(-0.3, 0.0, 0.4), hl=(-0.24, -0.04, 0.64), er=(0.3, 0.0, 0.4), hr=(0.24, -0.04, 0.64), head=(-6, 0, 0))
POSES["windup"] = dict(el=(-0.3, 0.0, 0.4), hl=(-0.24, -0.04, 0.64), er=(0.26, 0.18, 0.3), hr=(0.2, 0.3, 0.42), head=(4, 0, -10), lean=-6)
POSES["punch"] = dict(el=(-0.3, 0.0, 0.4), hl=(-0.24, -0.04, 0.64), er=(0.14, -0.4, 0.42), hr=(0.12, -0.95, 0.44), head=(6, 0, 0), lean=14)
POSES["look_up"] = dict(el=(-0.16, -0.04, 0.2), hl=(-0.2, -0.12, 0.34), er=(0.16, -0.04, 0.2), hr=(0.2, -0.12, 0.34), head=(-28, 0, 10))
POSES["drive"] = dict(el=(-0.12, -0.18, 0.2), hl=(-0.08, -0.3, 0.24), er=(0.12, -0.18, 0.2), hr=(0.08, -0.3, 0.24), head=(-6, 0, 0), lean=6)
POSES["wave_cam"] = dict(el=(-0.12, -0.18, 0.2), hl=(-0.08, -0.3, 0.24), er=(0.24, -0.08, 0.4), hr=(0.3, -0.12, 0.66), head=(-6, 0, -40))


def sky(strength=1.0, elev=8.0, rot=200.0):
    w = bpy.data.worlds.new("sky")
    sc.world = w
    w.use_nodes = True
    n = w.node_tree.nodes
    st = n.new("ShaderNodeTexSky")
    st.sky_type = "NISHITA"
    st.sun_elevation, st.sun_rotation = R(elev), R(rot)
    w.node_tree.links.new(st.outputs["Color"], n["Background"].inputs["Color"])
    n["Background"].inputs["Strength"].default_value = strength


def dark_world(rgb=(0.006, 0.008, 0.015)):
    w = bpy.data.worlds.new("dark")
    sc.world = w
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs["Color"].default_value = (*rgb, 1)


def light(name, typ, loc, rot=None, **kw):
    o = bpy.data.objects.new(name, bpy.data.lights.new(name, typ))
    sc.collection.objects.link(o)
    o.location = loc
    if rot is not None:
        o.rotation_euler = rot
    for k, v in kw.items():
        setattr(o.data, k, v)
    return o


def aim(o, target):
    o.rotation_euler = (Vector(target) - o.location).to_track_quat("-Z", "Y").to_euler()


def key_cam(c, f, loc, target, lens=None):
    c.location = loc
    aim(c, target)
    if lens:
        c.data.lens = lens
        c.data.keyframe_insert("lens", frame=f)
    c.keyframe_insert("location", frame=f)
    c.keyframe_insert("rotation_euler", frame=f)


def mascot(logo, scale=2.6):
    """concept character: Dave's rig, muscle outfit, a box head with the concept's logo"""
    m = Dave("Mascot")
    m.outfit("muscle")
    m.head.hide_render = True
    m.face(None)
    bpy.ops.mesh.primitive_cube_add(size=0.44)
    h = bpy.context.object
    bpy.ops.object.modifier_add(type="BEVEL")
    h.modifiers["Bevel"].width, h.modifiers["Bevel"].segments = 0.05, 4
    h.data.materials.append(image_mat("logo_" + logo, f"logo_{logo}.png", rough=0.35))
    for c in h.users_collection:
        c.objects.unlink(h)
    m.coll.objects.link(h)
    h.parent = m.head
    m.root.scale = (scale, scale, scale)
    return m


cam0 = cam("cam", (0, -8, 1.5), (0, 0, 1.5), 30)
sc.camera = cam0

# ================================================================== A · money yard
if SHOT == "A":
    sky(0.22, 6, 210)
    light("sun", "SUN", (0, 0, 10), (R(76), 0, R(35)), energy=2.4, color=(1.0, 0.82, 0.6), angle=R(1.5))
    plane("ground", (0, 0, 0), (60, 60), (0, 0, 0), flat("paving", (0.42, 0.4, 0.37), 0.8))
    cash = image_mat("cash", "banknote.png", rough=0.7)
    gold = flat("gold", (0.9, 0.62, 0.15), 0.25)
    gold.node_tree.nodes["Principled BSDF"].inputs["Metallic"].default_value = 1.0
    import random
    r = random.Random(5)
    for i in range(140):  # cash bales and gold bars piled around the giant
        x, y = r.uniform(-7, 7), r.uniform(-1.5, 6)
        if abs(x) < 1.6 and y < 1.5:
            continue
        h = r.randint(1, 4)
        for k in range(h):
            if r.random() < 0.25:
                box("gold", (x, y, 0.05 + k * 0.1), (0.42, 0.18, 0.1), gold).rotation_euler.z = r.uniform(0, 3)
            else:
                box("bale", (x, y, 0.13 + k * 0.26), (0.62, 0.34, 0.26), cash).rotation_euler.z = r.uniform(-0.3, 0.3)
    wall = flat("mansion", (0.55, 0.48, 0.4), 0.6)
    box("mansion", (0, 11, 3.5), (22, 3, 7), wall)
    winm = flat("windows", (1.0, 0.78, 0.45), 0.3, emit=3.0)
    for ix in range(-4, 5):
        for iz in range(2):
            box("win", (ix * 2.3, 9.45, 1.6 + iz * 2.6), (1.0, 0.05, 1.6), winm)
    for ix in range(-5, 6):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.28, depth=7, location=(ix * 2.0, 9.2, 3.5))
        bpy.context.object.data.materials.append(wall)
    g = mascot("bank", 3.3)
    d = Dave()
    d.face("shock", drop=True)
    for f in range(1, LEN + 1):
        # giant: flex loop (biceps pump on a 16-frame beat) → wind-up 30–37 → PUNCH 38–42 → hold
        if f < 30:
            t = 0.5 - 0.5 * math.cos(f / 16 * 2 * math.pi)
            P = blend("flex", "cheer", t * 0.35)
        elif f < 38:
            P = blend("flex", "windup", ease((f - 30) / 7))
        else:
            P = blend("windup", "punch", back_out((f - 38) / 4))
        g.place((0, 1.2, 0.72 * 3.3), R(0))
        g.legs_set("stand")
        g.pose(P)
        g.key(f)
        d.place((1.7, -2.2, 0.72), R(150))
        d.legs_set("stand")
        d.pose(blend("idle", "look_up", ease(f / 10)) if f < 38 else POSES["panic"])
        d.live(f, "shock" if f < 38 else "panic", talking=f >= 44)
        d.drop.hide_render = False
        d.life(f)
        if 41 <= f <= 46:
            d.squash(0.8 * (1 - (f - 41) / 5))
        g.life(f, 0.5)
        d.key(f)
        # camera: slow push-in, low hero angle; after the punch a decaying shake
        t = f / LEN
        shake = (math.sin(f * 2.7) * 0.06 * max(0, 1 - (f - 41) / 10)) if f >= 41 else 0
        key_cam(cam0, f, (0.9 + shake, -7.2 + 2.4 * ease(t), 0.28 + shake * 0.5), (0.3, 1.2, 3.4), 18)

# ================================================================== B · self-drawing graph ride
if SHOT == "B":
    w = bpy.data.worlds.new("w")
    sc.world = w
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs["Color"].default_value = (0.9, 0.9, 0.88, 1)
    w.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    light("key", "AREA", (2, -6, 6), (R(45), 0, R(15)), energy=900, size=6)
    paper = image_mat("paper", "paper_lined.png", rough=0.9)
    plane("paper", (0, 0.3, 3.0), (34, 16), (R(90), 0, 0), paper)
    plane("floor", (0, 0, 0), (40, 40), (0, 0, 0), flat("desk", (0.92, 0.91, 0.88), 0.9))
    # the growth line: zig-zag up and to the right, drawn by bevel_factor_end
    pts = [(-6, 0.4), (-4.5, 1.1), (-3.6, 0.8), (-2.2, 1.9), (-1.3, 1.5), (0.2, 2.8), (1.0, 2.4), (2.6, 3.7), (3.4, 3.4), (5.5, 5.2)]
    cu = bpy.data.curves.new("line", "CURVE")
    cu.dimensions, cu.bevel_depth, cu.use_fill_caps = "3D", 0.035, True
    sp = cu.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    for i, (x, z) in enumerate(pts):
        sp.points[i].co = (x, 0.2, z, 1)
    line = bpy.data.objects.new("line", cu)
    sc.collection.objects.link(line)
    line.data.materials.append(flat("red_ink", (0.85, 0.05, 0.05), 0.4, emit=0.4))
    seg = [((Vector((x0, 0, z0)), Vector((x1, 0, z1)))) for (x0, z0), (x1, z1) in zip(pts, pts[1:])]
    lens_ = [(q - p_).length for p_, q in seg]
    total = sum(lens_)

    def along(t):
        dist = t * total
        for (p_, q), L in zip(seg, lens_):
            if dist <= L:
                return p_.lerp(q, dist / L), (q - p_).normalized()
            dist -= L
        return seg[-1][1], (seg[-1][1] - seg[-1][0]).normalized()

    # toy car
    carm = flat("car_red", (0.8, 0.06, 0.06), 0.3, 0.6)
    car = bpy.data.objects.new("car", None)
    sc.collection.objects.link(car)
    parts = [box("car_body", (0, 0, 0.16), (0.62, 0.34, 0.18), carm), box("car_top", (-0.06, 0, 0.29), (0.3, 0.3, 0.1), carm)]
    tire = flat("tire", (0.05, 0.05, 0.05), 0.8)
    for x in (-0.22, 0.22):
        for y in (-0.19, 0.19):
            bpy.ops.mesh.primitive_cylinder_add(radius=0.09, depth=0.06, location=(x, y, 0.09), rotation=(R(90), 0, 0))
            parts.append(bpy.context.object)
            parts[-1].data.materials.append(tire)
    for o in parts:
        o.parent = car
    d = Dave()
    for f in range(1, LEN + 1):
        t = min(1.0, f / 70)
        cu.bevel_factor_end = min(1.0, t + 0.04)
        cu.keyframe_insert("bevel_factor_end", frame=f)
        pos, tan = along(t)
        ang = math.atan2(tan.z, tan.x)
        car.location = (pos.x, -0.3, pos.z + 0.02)
        car.rotation_euler = (0, -ang, 0)
        car.keyframe_insert("location", frame=f)
        car.keyframe_insert("rotation_euler", frame=f)
        d.place((pos.x - 0.02, -0.3, pos.z + 0.42), R(-80))
        d.root.rotation_euler = (0, -ang * 0.8, R(-80))
        d.legs_set("sit", 0.42)
        bump = math.sin(f * 1.3) * 0.012
        d.root.location.z += bump
        end = f >= 66
        d.pose(blend("drive", "wave_cam", ease((f - 66) / 5)) if end else "drive")
        d.live(f, "grin" if end else "determined", talking=end)
        d.life(f, 0.6)
        d.key(f)
        # camera tracks the car from the side, then pushes in for the wave
        cx, cz = pos.x + 0.8, pos.z + 0.6
        z = ease((f - 62) / 14)
        key_cam(cam0, f, (cx - 0.3 * z, -3.6 + 1.4 * z, cz + 0.1), (pos.x + 0.25, 0, pos.z + 0.38), 32 + 10 * z)

# ================================================================== C · night alley reveal
if SHOT == "C":
    dark_world()
    wall_m = pbr("alley_wall", K.MAN["wall"], 0.35, tint=(0.25, 0.27, 0.3))
    box("back_wall", (0, 1.6, 2.5), (14, 0.3, 5), wall_m)
    box("side_wall", (-3.6, -1, 2.5), (0.3, 6, 5), wall_m)
    wet = flat("wet_ground", (0.04, 0.045, 0.05), 0.15)
    plane("ground", (0, 0, 0), (30, 30), (0, 0, 0), wet)
    rim = light("rim", "AREA", (2.5, 1.2, 3.2), (R(-60), 0, R(150)), energy=60, size=2, color=(0.4, 0.55, 1.0))
    spot = light("spot", "SPOT", (-4, -3, 4.2), None, energy=0, spot_size=R(32), spot_blend=0.35, color=(1.0, 0.93, 0.82))
    d = Dave()
    for f in range(1, LEN + 1):
        # walk in from the right (0–46), stop, light sweep 48–66, head snap to camera at 76
        wt = min(1.0, f / 46)
        x = 3.2 - 3.0 * wt
        if f <= 46:
            bob = d.legs_walk(f / 46 * 4 * math.pi)
            d.place((x, -0.2, 0.72 + bob), R(-90))
            sw = math.sin(f / 46 * 4 * math.pi) * 0.12
            P = dict(POSES["idle"])
            P["hl"], P["hr"] = (-0.13, -0.02 - sw, -0.06), (0.13, -0.02 + sw, -0.06)
            d.pose(P)
        else:
            d.place((0.2, -0.2, 0.72), R(-90) if f < 76 else R(-90) + R(90) * back_out((f - 76) / 4))
            d.legs_set("stand")
            d.pose("idle" if f < 76 else "panic")
        d.live(f, "neutral" if f < 76 else "shock", talking=f >= 82)
        d.drop.hide_render = f < 76
        d.life(f)
        if 76 <= f <= 80:
            d.squash(-0.6 * (1 - (f - 76) / 4))
        d.key(f)
        st = ease((f - 48) / 18)
        spot.data.energy = 0 if f < 48 else 2600
        spot.location = (-4 + 4.6 * st, -3.2, 4.2)
        aim(spot, (-1.5 + 1.9 * st, -0.2, 1.0))
        spot.data.keyframe_insert("energy", frame=f)
        spot.keyframe_insert("location", frame=f)
        spot.keyframe_insert("rotation_euler", frame=f)
        p = ease((f - 76) / 10) if f >= 76 else 0
        key_cam(cam0, f, (0.6, -5.2 + 1.6 * p, 1.05), (0.4, 0, 1.15), 30 + 8 * p)

# ================================================================== D · marching army (crowd of linked copies)
if SHOT == "D":
    world_hdri("golden", 1.0, 120)
    ground("grass", 80, 3.0)
    light("sun", "SUN", (0, 0, 10), (R(74), 0, R(-140)), energy=2.2, color=(1.0, 0.85, 0.65), angle=R(2))
    soldier = Dave("Soldier")
    soldier.outfit("none")
    soldier.live_obj.hide_render = True
    soldier.face(None)
    d = Dave()
    for f in range(1, LEN + 1):
        ph = f / 24 * 2 * math.pi  # one step pair per second, marching in sync
        bob = soldier.legs_walk(ph, 0.28, 0.06)
        soldier.place((0, 6 - f * 0.035, 0.72 + bob), R(0))
        sw = math.sin(ph) * 0.14
        P = dict(POSES["idle"])
        P["hl"], P["hr"] = (-0.13, -0.02 - sw, -0.06), (0.13, -0.02 + sw, -0.06)
        P["head"] = (0, 0, 0)
        soldier.pose(P)
        soldier.key(f)
        bob = d.legs_walk(ph * 1.1, 0.3, 0.07)
        d.place((0.3, 2.2 - f * 0.038, 0.72 + bob), R(0))
        Q = dict(P)
        Q["head"] = (-6, 0, 150 if 30 < f < 54 else 0)  # glances back at the army, then back to camera
        d.pose(Q)
        d.live(f, "shock" if 30 < f < 54 else "determined", talking=f >= 54)
        d.life(f, 0.5)
        d.key(f)
        key_cam(cam0, f, (1.4, -3.4 - f * 0.036, 0.35), (0.2, 3 - f * 0.036, 1.3), 22)
    crowd(soldier, rows=4, cols=8, dx=0.95, dy=1.2, origin=(0, 0, 0))

# ================================================================== E · real mocap jog on a street
if SHOT == "E":
    world_hdri("city", 1.0, 40)
    ground("asphalt", 80, 3.0)
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(30)), energy=2.0, color=(1.0, 0.94, 0.86), angle=R(2))
    jog, walk = Mocap("02_03", start=1, step=5, frames=80), Mocap("02_01", start=1, step=5, frames=80)
    d = Dave()
    extra = Dave("Bystander")
    extra.outfit("none")
    extra.live_obj.hide_render = True
    extra.face(None)
    for f in range(1, LEN + 1):
        mocap_pose(d, jog, (f - 1) % len(jog), base=(-2.5, 0, 0), turn=R(-90))
        d.live(f, "determined" if f < 46 else "grin", talking=f >= 46)
        d.life(f, 0.3)
        d.key(f)
        mocap_pose(extra, walk, (f - 1) % len(walk), base=(3, 2.5, 0), turn=R(90))
        extra.key(f)
        dx = d.root.location.x
        key_cam(cam0, f, (dx + 0.6, -4.2, 0.9), (dx + 0.9, 0, 0.95), 26)
    crowd(extra, rows=2, cols=4, dx=1.6, dy=1.8, origin=(0, 1.5, 0), jitter=0.4)

finish()
if SHOT in ("B", "C", "D", "E"):
    dof(cam0, d.head, 2.2 if SHOT == "B" else 2.8)
# ------------------------------------------------------------------ render the requested frames
sc.render.image_settings.file_format, sc.render.image_settings.quality = "JPEG", 90
sc.frame_start, sc.frame_end = 1, LEN
for f in FRAMES:
    sc.frame_set(f)
    sc.render.filepath = os.path.join(K.OUT, f"{SHOT}_{f:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", SHOT, f, flush=True)
