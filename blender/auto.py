"""AUTOPILOT 3D shots — every shot of an autopilot episode is one TEMPLATE from this file + a few parameters from
pipeline/auto/<ep>.json ("shots": {"H": {"tpl": "rain", ...}}). Nobody writes Blender code per episode.
Run (CI does this): blender -b -P blender/<ep>.py -- --assets A --tex T --out O --frames "H:1-30"
blender/<ep>.py is a 2-line stub written by tools/auto.py that sets AUTO_EP and execs this file.
Templates (params in AUTOPILOT.md §4): rain office_walk chair_spin lamp desk_paper sign_topple receipt street seats ring
grid walls flyaway room towers building_walk headlines + SCENE (built from the script: Poly Haven sky/ground/props,
camera move, Dave action — every episode looks different). K = transparent Dave cut-outs (7 poses)."""
import sys, os, math, json, random
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lib import K, R, setup, Dave, flat, pbr, image_mat, box, plane, cam, blend, ease, back_out, finish, dof, world_hdri, POSES, import_model, dup, bbox, tree  # noqa: E402
import bpy  # noqa: E402

EP = os.environ.get("AUTO_EP") or globals().get("AUTO_EP")
SPEC = json.load(open(os.path.join(HERE, "..", "pipeline", "auto", f"{EP}.json"), encoding="utf8"))
args = setup(sys.argv[sys.argv.index("--") + 1:])
sc = K.sc
sc.render.use_motion_blur, sc.render.motion_blur_shutter = True, 0.5
sc.cycles.samples = int(args.get("--samples", "16"))
SHOT, rng = args.get("--frames", "H:1-12").split(":")
FRAMES = []
if SHOT != "K":
    for part in rng.split(","):
        a, _, b = part.partition("-")
        FRAMES += list(range(int(a), int(b or a) + 1))
LENS = json.load(open(os.path.join(HERE, f"{EP}_lens.json")))
LEN = int(LENS.get(SHOT, 120))
P = SPEC.get("shots", {}).get(SHOT, {}) if SHOT != "K" else {}
TPL = P.get("tpl", "")
# 9:16 Shorts (blender.yml mode vert = 900x1600): same sets, never wider — a longer lens keeps Dave + the hero big in the
# centre column (Blender fits the 36 mm sensor to the long side, so portrait at the same lens = Dave ~0.56x as tall)
PORT = K.W < K.H
LF = 1.45 if PORT else 1.0


def tex(name):  # textures written by tools/auto.py: blender/tex/<ep>_<shot>_<name>.png
    return f"{EP}_{SHOT}_{name}.png"


POSES["sign"] = dict(el=(-0.16, -0.2, 0.2), hl=(-0.12, -0.5, 0.12), er=(0.18, -0.22, 0.18), hr=(0.06, -0.55, 0.1), head=(26, 0, 0), lean=20)
POSES["look_up"] = dict(el=(-0.16, -0.04, 0.2), hl=(-0.2, -0.12, 0.34), er=(0.16, -0.04, 0.2), hr=(0.2, -0.12, 0.34), head=(-30, 0, 10))
POSES["think"] = dict(el=(0.2, -0.1, 0.2), hl=(0.06, -0.2, 0.52), er=(0.12, 0, 0.16), head=(-8, 0, 12))
POSES["present"] = dict(el=(0.22, -0.08, 0.28), hl=(0.42, -0.22, 0.3), er=(0.12, 0, 0.16), head=(-4, 0, 16))


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
        c.data.lens = lens * LF
        c.data.keyframe_insert("lens", frame=f)
    c.keyframe_insert("location", frame=f)
    c.keyframe_insert("rotation_euler", frame=f)


def kf(o, f, *what):
    for w in what:
        o.keyframe_insert(w, frame=f)


def face_box(name, loc, size, side_rgb, img, face="-y"):
    o = box(name, loc, size, flat(name + "_side", side_rgb, 0.5))
    if face == "-y":
        p = plane(name + "_face", (0, 0, 0), (size[0] * 0.98, size[2] * 0.98), (R(90), 0, 0), image_mat(name + "_img", img, rough=0.6))
        p.location = (0, -size[1] / 2 - 0.004, 0)
    else:
        p = plane(name + "_face", (0, 0, 0), (size[0] * 0.98, size[1] * 0.98), (0, 0, 0), image_mat(name + "_img", img, rough=0.6))
        p.location = (0, 0, size[2] / 2 + 0.004)
    p.parent = o
    p.scale = (p.scale[0] / o.scale[0], p.scale[1] / o.scale[2 if face == "-y" else 1], 1)
    p.location = (p.location[0] / o.scale[0], p.location[1] / o.scale[1], p.location[2] / o.scale[2])
    return o


def walk_to(f, f0, f1, a, b, turn):
    k = min(1, max(0, (f - f0) / max(1, f1 - f0)))
    d.place((a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, 0.72 + (d.legs_walk(k * (f1 - f0) / 13 * math.pi) if 0 < k < 1 else 0)), turn)
    if not 0 < k < 1:
        d.legs_set("stand")
    return k


def pops(n, f0, f1, f):
    return int(n * min(1, max(0, (f - f0) / max(1, f1 - f0))))


def office(dusk=False, flags=False):
    world_hdri("golden" if dusk else "day", 0.25 if dusk else 0.6, 30)
    wall = flat("office_wall", (0.86, 0.82, 0.7), 0.7)
    plane("floor", (0, 0, 0), (14, 12), (0, 0, 0), pbr("office_floor", K.MAN["floor"], 1.2, tint=(0.75, 0.6, 0.45)))
    bpy.ops.mesh.primitive_cylinder_add(radius=2.6, depth=0.01, location=(0, -0.4, 0.006), vertices=64)
    bpy.context.object.scale = (1.3, 1, 1)
    bpy.context.object.data.materials.append(flat("rug", (0.1, 0.16, 0.36), 0.95))
    box("back_wall", (0, 3.2, 1.8), (12, 0.2, 3.6), wall)
    for x in (-5.5, 5.5):
        box("side_wall", (x, -1, 1.8), (0.2, 9, 3.6), wall)
    winm = flat("window_glow", (1.0, 0.92, 0.78), 0.2, emit=2.5 if not dusk else 0.9)
    trim = flat("trim_white", (0.95, 0.94, 0.9), 0.5)
    for x in (-2.2, 2.2):
        box("window", (x, 3.09, 1.75), (1.3, 0.02, 2.4), winm)
        box("win_frame", (x, 3.07, 1.75), (1.45, 0.04, 2.55), trim)
    if flags:
        flag, pole = image_mat("us_flag", "us_flag.png", rough=0.8), flat("pole", (0.75, 0.6, 0.2), 0.3)
        for x in (-0.9, 0.9):
            bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=2.6, location=(x, 2.75, 1.3))
            bpy.context.object.data.materials.append(pole)
            plane("flag", (x + (0.42 if x < 0 else -0.42), 2.74, 2.0), (0.8, 0.5), (R(90), 0, 0), flag)
    else:  # a framed picture of a money chart on the wall instead of flags
        face_box("wall_chart", (0, 3.08, 2.1), (1.2, 0.04, 0.8), (0.2, 0.15, 0.1), "receipt_total.png")
    deskm = flat("desk_wood", (0.32, 0.17, 0.08), 0.35)
    box("desk", (0, 1.4, 0.4), (2.4, 1.0, 0.8), deskm)
    box("desk_top", (0, 1.4, 0.81), (2.5, 1.1, 0.04), deskm)
    leather = flat("leather", (0.08, 0.06, 0.05), 0.4, 0.2)
    box("chair_seat", (0, 2.15, 0.55), (0.8, 0.7, 0.14), leather)
    box("chair_back", (0, 2.5, 1.25), (0.85, 0.16, 1.5), leather)
    return deskm


def capitol(ox=0.0, oy=0.0, s=1.0):
    mar = flat("marble", (0.9, 0.88, 0.83), 0.45)

    def cyl(loc, r, h, n=24):
        bpy.ops.mesh.primitive_cylinder_add(vertices=n, radius=r * s, depth=h * s, location=(ox + loc[0] * s, oy + loc[1] * s, loc[2] * s))
        bpy.context.object.data.materials.append(mar)
        bpy.ops.object.shade_smooth()
        return bpy.context.object

    glass = flat("cap_glass", (0.12, 0.13, 0.16), 0.2)
    for x, w, h in ((0, 5.0, 3.2), (-5.2, 5.4, 2.6), (5.2, 5.4, 2.6)):
        box("cap_block", (ox + x * s, oy, h / 2 * s), (w * s, 3.0 * s, h * s), mar)
        box("cap_cornice", (ox + x * s, oy, (h + 0.12) * s), ((w + 0.2) * s, 3.2 * s, 0.24 * s), mar)
        for k in range(int(w / 0.7)):
            for z in (0.9, 2.0):
                if z < h - 0.4:
                    box("cap_win", (ox + (x - w / 2 + 0.45 + k * 0.7) * s, oy - 1.51 * s, z * s), (0.32 * s, 0.02 * s, 0.6 * s), glass)
    for k in range(8):
        cyl((-1.75 + k * 0.5, -1.9, 1.5), 0.13, 3.0, 16)
    box("cap_pediment", (ox, oy - 1.9 * s, 3.25 * s), (4.3 * s, 0.6 * s, 0.5 * s), mar)
    for k in range(5):
        box("cap_step", (ox, oy - (2.3 + k * 0.3) * s, (0.5 - k * 0.1) * s), (4.6 * s, 0.32 * s, 0.2 * s), mar)
    cyl((0, 0, 3.8), 1.35, 1.2, 40)
    for k in range(18):
        a = k / 18 * 2 * math.pi
        cyl((1.5 * math.cos(a), 1.5 * math.sin(a), 3.9), 0.07, 1.4, 10)
    cyl((0, 0, 4.65), 1.6, 0.18, 40)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1.3 * s, location=(ox, oy, 4.75 * s))
    bpy.context.object.scale.z = 1.25
    bpy.context.object.data.materials.append(mar)
    bpy.ops.object.shade_smooth()
    cyl((0, 0, 6.5), 0.22, 0.7, 16)
    cyl((3.2, -3.4, 2.5), 0.03, 5.0, 8)
    return plane("cap_flag", (ox + 3.65 * s, oy - 3.4 * s, 4.6 * s), (0.9 * s, 0.5 * s), (R(90), 0, 0), flat("flagc", (0.7, 0.1, 0.1), 0.8))


def tower(ox=0.0, oy=0.0, s=1.0, sign=None):
    """a glass bank / corporate tower (box + window bands + an optional sign texture on the front)"""
    body, band = flat("tw_body", (0.18, 0.22, 0.28), 0.15, coat=0.6), flat("tw_glass", (0.45, 0.6, 0.75), 0.05, emit=0.4)
    box("tw", (ox, oy, 7 * s), (5 * s, 4 * s, 14 * s), body)
    for z in range(1, 14):
        box("tw_band", (ox, oy - 2.01 * s, z * s), (4.6 * s, 0.02 * s, 0.45 * s), band)
    for k in range(5):
        box("tw_step", (ox, oy - (2.3 + k * 0.3) * s, (0.5 - k * 0.1) * s), (5.2 * s, 0.32 * s, 0.2 * s), flat("tw_stone", (0.7, 0.7, 0.72), 0.5))
    if sign:
        plane("tw_sign", (ox, oy - 2.05 * s, 3.2 * s), (3.6 * s, 1.0 * s), (R(90), 0, 0), image_mat("tw_sign", sign, rough=0.4))
    return None


def item_mat():
    it = P.get("item", "cash")
    return image_mat("item", "banknote.png" if it == "cash" else tex("item"), rough=0.7)


cam0 = cam("cam", (0, -6, 1.6), (0, 0, 1.4), 30)
sc.camera = cam0
d = Dave()
d.outfit(P.get("outfit") or SPEC.get("outfit", "hoodie"))
FOCUS_DAVE = True

if TPL == "rain":  # money (or any item) rains from the sky; dave:false = frame-0 prize shot straight into the lens
    world_hdri("golden", 0.9, 120)
    plane("ground", (0, 0, 0), (80, 80), (0, 0, 0), pbr("yard", K.MAN.get("concrete") or K.MAN["floor"], 3.0))
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(200)), energy=2.6, color=(1.0, 0.86, 0.68), angle=R(2))
    m, r, hero = item_mat(), random.Random(11), None
    withd = bool(P.get("dave", False))
    bales = [(box("bale", (0, 0, 0), (0.62, 0.34, 0.26), m), r.uniform(-4, 4), r.uniform(-1.5, 6), r.uniform(-40 if not withd else 0, LEN * 0.8), r.uniform(-3, 3)) for _ in range(int(P.get("n", 100)))]
    if not withd:
        d.show(False)
        hero = box("hero", (0, 0, 0), (0.62, 0.34, 0.26), m)
        FOCUS_DAVE = False
    for f in range(1, LEN + 1):
        for o, x, y, t0, spin in bales:
            t = (f - t0) / 24.0
            z = 9 - 0.5 * 9.81 * max(0, t) ** 2
            if z < 0.13:
                over = (f - t0) - math.sqrt(2 * 8.87 / 9.81) * 24
                z = 0.13 + abs(math.sin(over / 4)) * 0.3 * math.exp(-over / 8)
            o.location = (x, y, z if f >= t0 else 9.5)
            o.rotation_euler = (spin * min(t, 1.2), spin * 0.6 * min(t, 1.2), spin)
            kf(o, f, "location", "rotation_euler")
        k = ease(f / LEN)
        if hero:
            th = (f % 60) / 24.0
            hero.location = (0.15 - 0.2 * th, -1.0, 2.4 - 0.5 * 9.81 * th ** 2 + 0.6)
            hero.rotation_euler = (1.5 * th, 2.2 * th, 0.4)
            kf(hero, f, "location", "rotation_euler")
            key_cam(cam0, f, (0.3, -2.4 + 0.5 * k, 0.22), (0.0, 1.5, 1.6 + 0.3 * k), 16)
        else:
            d.place((0.4, -1.2, 0.72), R(15))
            d.legs_set("stand")
            d.pose(blend("look_up", P.get("react", "panic"), ease((f - 30) / 8)))
            d.live(f, "shock" if f < 30 else "panic", talking=f >= 40)
            d.life(f)
            d.key(f)
            key_cam(cam0, f, (1.4, -5.2 + 0.8 * k, 0.3), (0.2, 0.5, 1.7), 20)
    if hero:
        sc.camera.data.dof.use_dof = True
        sc.camera.data.dof.focus_distance, sc.camera.data.dof.aperture_fstop = 4.0, 2.2

elif TPL == "office_walk":  # Dave walks into the big office, turns, presents the giant chair
    office(flags=P.get("flags", False))
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("fill", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=300, size=5, color=(1.0, 0.96, 0.9))
    for f in range(1, LEN + 1):
        if f <= 52:
            bob = d.legs_walk(f / 52 * 4 * math.pi)
            d.place((-3.6 + 3.4 * ease(f / 52), 0.6, 0.72 + bob), R(-90))
            sw = math.sin(f / 52 * 4 * math.pi) * 0.12
            Q = dict(POSES["idle"])
            Q["hl"], Q["hr"] = (-0.13, -0.02 - sw, -0.06), (0.13, -0.02 + sw, -0.06)
            d.pose(Q)
        else:
            d.place((-0.2, 0.6, 0.72), R(-90) + R(90) * back_out((f - 52) / 6))
            d.legs_set("stand")
            d.pose(blend("idle", "present", back_out((f - 54) / 6)))
            d.life(f)
        d.live(f, "grin", talking=True)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (0.4 - 0.2 * t, -6.2 + 2.0 * t, 1.25), (-0.1, 1.2, 1.15), 28)

elif TPL == "chair_spin":  # owner-loved: Dave back to camera in the big chair spins round and leans in
    office(flags=P.get("flags", False))
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("key", "AREA", (0.8, -1.5, 2.6), (R(40), 0, R(15)), energy=420, size=2.5, color=(1.0, 0.95, 0.88))
    pivot = bpy.data.objects.new("chair_pivot", None)
    sc.collection.objects.link(pivot)
    pivot.location = (0, 2.25, 0)
    for o in list(bpy.data.objects):
        if o.name.startswith("chair_") and o is not pivot:
            o.parent = pivot
            o.location -= Vector((0, 2.25, 0))
    for f in range(1, LEN + 1):
        u = back_out((f - 5) / 9)
        turn = R(180) * (1 - u) if f >= 5 else R(180)
        pivot.rotation_euler = (0, 0, turn)
        kf(pivot, f, "rotation_euler")
        d.place((0.0, 2.15, 0.64), turn)
        d.legs_set("sit", seat=0.6)
        d.pose(blend("fists", "present", ease((f - 16) / 8)))
        d.live(f, "smug" if f > 12 else "neutral", talking=f > 14)
        d.life(f, 0.6)
        d.key(f)
        k = ease(f / LEN)
        key_cam(cam0, f, (0.15, -1.3 + 0.5 * k, 1.6), (0.0, 2.15, 1.18), 42 + 8 * k)

elif TPL == "lamp":  # owner-loved: dusk, the room light dies to one lamp, slow push-in, Dave points at you
    office(dusk=True, flags=P.get("flags", False))
    lamp = light("lamp", "SPOT", (0.6, -0.6, 2.8), None, energy=900, spot_size=R(40), spot_blend=0.5, color=(1.0, 0.85, 0.6))
    room = light("room", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=250, size=5, color=(0.8, 0.85, 1.0))
    for f in range(1, LEN + 1):
        d.place((0.0, 0.5, 0.72), R(0))
        d.legs_set("stand")
        d.pose(blend("think", "point_you", back_out((f - 40) / 6)) if f >= 40 else "think")
        d.live(f, "think" if f < 40 else "determined", talking=True)
        d.life(f)
        d.key(f)
        room.data.energy = 250 * (1 - 0.8 * ease(f / 30))
        room.data.keyframe_insert("energy", frame=f)
        aim(lamp, (0, 0.5, 1.2))
        key_cam(cam0, f, (0.25, -4.2 + 1.3 * ease(f / LEN), 1.3), (0.0, 0.5, 1.35), 32)

elif TPL == "desk_paper":  # a folder with the line's words slides onto the desk, Dave opens it, camera tilts paper→face
    office(flags=P.get("flags", False))
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(140)), energy=2.4, color=(1.0, 0.9, 0.78), angle=R(3))
    lamp = light("lamp", "SPOT", (-0.8, 0.6, 2.4), None, energy=500, spot_size=R(50), spot_blend=0.6, color=(1.0, 0.86, 0.66))
    folder = face_box("folder", (0, 0, 0), (0.5, 0.36, 0.03), (0.85, 0.75, 0.5), tex("paper"), "+z")
    for f in range(1, LEN + 1):
        k = back_out(min(1, f / 30))
        folder.location = (1.6 - 1.6 * k, 1.25, 0.85)
        folder.rotation_euler = (0, 0, R(25) * (1 - k) + R(4))
        kf(folder, f, "location", "rotation_euler")
        aim(lamp, (0, 1.3, 0.85))
        d.place((0.0, 1.85, 0.72), R(0))
        d.legs_set("stand")
        d.pose(blend("idle", "read", ease((f - 26) / 10)))
        d.live(f, "think" if f < 60 else P.get("face", "shock"), talking=f > 30)
        d.life(f, 0.5)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (0.5 - 0.3 * t, 0.2 - 2.4 * t, 1.6 - 0.25 * t), (0.0, 1.3 + 0.5 * t, 0.86 + 0.55 * t), 35 - 7 * t)

elif TPL == "sign_topple":  # Dave signs a paper; a giant card ("giant" text) wobbles, then topples on the cue
    office(flags=P.get("flags", False))
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("fill", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=300, size=5)
    plane("paper", (0.0, 1.25, 0.835), (0.34, 0.44), (0, 0, R(4)), image_mat("paper", tex("paper"), rough=0.85))
    for o in bpy.data.objects:
        if o.name.startswith("chair_"):
            o.location.y += 0.5
    card = face_box("giant", (0, 0, 0), (1.5, 0.08, 2.3), (0.9, 0.9, 0.92), tex("giant"))
    hinge = bpy.data.objects.new("hinge", None)
    sc.collection.objects.link(hinge)
    card.parent, card.location = hinge, (0, 0, 1.15)
    SIGN, DROOP = int(LEN * 0.45), int(LEN * 0.8)
    for f in range(1, LEN + 1):
        d.place((0.0, 1.85, 0.72), R(0))
        d.legs_set("stand")
        wig = math.sin(f * 1.1) * 0.03 if f < SIGN else 0
        Q = dict(POSES["sign"])
        Q["hr"] = (0.08 + wig, -0.4, 0.1 + abs(wig))
        d.pose(blend("idle", Q, ease(f / 8)) if f < SIGN else blend(Q, "present", back_out((f - SIGN) / 6)))
        d.live(f, "determined" if f < SIGN else "smug", talking=f >= SIGN)
        d.life(f, 0.4)
        d.key(f)
        hinge.location = (2.6, 0.6, 0.0)
        t = (f - DROOP) / 14
        tip = R(3) * math.sin(f / 9) if f < DROOP else -(R(90) * min(1, t * t) - (R(6) * math.sin((t - 1) * 9) * math.exp(-(t - 1) * 4) if t > 1 else 0))
        hinge.rotation_euler = (tip, 0, R(-30))
        kf(hinge, f, "location", "rotation_euler")
        a = R(-18) + R(26) * ease(f / LEN)
        key_cam(cam0, f, (5.2 * math.sin(a), -5.0 * math.cos(a) + 0.6, 1.35), (1.0, 1.0, 1.4), 26)

elif TPL == "receipt":  # a receipt unrolls off the desk across the floor up to the lens; last piece = "total" text
    office(flags=P.get("flags", False))
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("fill", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=300, size=5)
    seg, tot = image_mat("rc", "receipt.png", rough=0.9), image_mat("rct", tex("total"), rough=0.9)
    segs = [plane(f"rc{i}", (0, 0.85 - i * 0.42, 0.04 + i * 0.0004), (0.5, 0.42), (0, 0, R(math.sin(i * 0.7) * 3)), seg if i < 17 else tot) for i in range(18)]
    for f in range(1, LEN + 1):
        n = pops(18, 10, LEN * 0.7, f)
        for i, o in enumerate(segs):
            o.scale = (0.25, 0.21 * (1.0 if i < n else 0.001), 1)
            kf(o, f, "scale")
        d.place((0.0, 1.85, 0.72), R(0))
        d.legs_set("stand")
        d.pose(blend("look", "panic", back_out((f - LEN * 0.55) / 8)))
        d.live(f, "shock" if f < LEN * 0.55 else "panic", talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (0.9, -1.0 - 4.0 * t, 0.35 + 0.5 * t), (0.0, 0.8 - 2.8 * (1 - t), 0.4 + 0.8 * t), 22 + 6 * t)

elif TPL == "street":  # a street of n houses; k of them get a sign with the "sign" text (e.g. SOLD, FOR RENT)
    world_hdri("day", 0.9, 60)
    plane("road", (0, 0, 0), (8, 80), (0, 0, 0), flat("asphalt", (0.16, 0.16, 0.17), 0.8))
    plane("lawn", (0, 0, -0.01), (80, 80), (0, 0, 0), flat("grass", (0.25, 0.42, 0.18), 0.9))
    light("sun", "SUN", (0, 0, 10), (R(50), 0, R(120)), energy=3.0, color=(1.0, 0.95, 0.86), angle=R(2))
    r = random.Random(4)
    cols = [(0.86, 0.78, 0.62), (0.7, 0.8, 0.86), (0.9, 0.86, 0.8), (0.82, 0.68, 0.6), (0.76, 0.84, 0.7)]
    n, k = min(int(P.get("n", 50)), 60), int(P.get("k", 1))
    roof = flat("roof", (0.35, 0.18, 0.15), 0.6)
    hm = [flat(f"hw{i}", c, 0.7) for i, c in enumerate(cols)]
    pos = []
    for i in range(n):
        side, row = (-1 if i % 2 else 1), i // 2
        x, y = side * 6.0, -6 + row * 3.2
        box("house", (x, y, 1.0), (2.6, 2.4, 2.0), r.choice(hm))
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=2.0, depth=1.2, location=(x, y, 2.6), rotation=(0, 0, R(45)))
        bpy.context.object.data.materials.append(roof)
        pos.append((x, y))
    pick = sorted(random.Random(8).sample(range(min(n, 16)), min(k, min(n, 16)))) if k < n else list(range(n))
    sm = image_mat("sign", tex("sign"), rough=0.6)
    signs = [plane("sign", (pos[i][0] - math.copysign(1.7, pos[i][0]), pos[i][1] - 1.4, 1.0), (1.0, 0.6), (R(90), 0, 0), sm) for i in pick]
    for f in range(1, LEN + 1):
        walk_to(f, 1, LEN * 0.6, (0, -9.0), (0, -5.5), R(180))
        d.pose("idle" if f < LEN * 0.72 else blend("idle", "point_l", back_out((f - LEN * 0.72) / 6)))
        d.live(f, "think" if f < LEN * 0.72 else "smug", talking=True)
        d.life(f)
        d.key(f)
        for j, s in enumerate(signs):
            q = back_out(min(1, max(0, (f - LEN * (0.5 + 0.25 * j / max(1, len(signs)))) / 8)))
            s.scale = (0.5 * q + 0.0005, 0.3 * q + 0.0005, 1)
            kf(s, f, "scale")
        t = ease(f / LEN)
        key_cam(cam0, f, (1.6, -13.5 + 3.0 * t, 2.6 - 0.9 * t), (0.8 + 3.0 * t, 4 - 4 * t, 1.4), 24)
    FOCUS_DAVE = False

elif TPL == "seats":  # n seats in a half circle (chamber / classroom / stadium); lights fill seat by seat up to "lit"
    world_hdri("studio", 0.4, 0)
    plane("floor", (0, 0, 0), (30, 30), (0, 0, 0), pbr("floor", K.MAN["floor"], 1.0))
    plane("wall", (0, 9, 4), (30, 8), (R(90), 0, 0), flat("chamber_wall", (0.55, 0.42, 0.32), 0.7))
    light("key", "AREA", (0, -2, 7), None, energy=1200, size=8, color=(1.0, 0.92, 0.8))
    col = {"red": (1.0, 0.12, 0.08), "green": (0.2, 1.0, 0.3), "blue": (0.15, 0.45, 1.0), "yellow": (1.0, 0.8, 0.1)}[P.get("color", "blue")]
    desk_m, on_m = flat("sdesk", (0.32, 0.2, 0.12), 0.5), flat("lit", col, 0.3, emit=6.0)
    n = min(int(P.get("n", 100)), 100)
    lit = min(int(P.get("lit", 51)), n)
    per = max(1, math.ceil(n / 4))
    lamps = []
    for i in range(n):
        row, k = i // per, i % per
        a = math.pi * (k + 0.5) / per
        rad = 3.2 + row * 1.1
        x, y = -rad * math.cos(a), 2.0 + rad * math.sin(a)
        box("sdesk", (x, y, 0.4 + row * 0.25), (0.6, 0.4, 0.8), desk_m).rotation_euler = (0, 0, -a + R(90))
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.14, location=(x, y, 0.95 + row * 0.25))
        o = bpy.context.object
        o.data.materials.append(on_m)
        lamps.append(o)
    order = sorted(range(n), key=lambda i: (i % per, i // per))
    box("rostrum", (0, 0.8, 0.6), (1.6, 0.6, 1.2), desk_m)
    for f in range(1, LEN + 1):
        m = pops(lit, 12, LEN * 0.7, f)
        for j, i in enumerate(order):
            s = 1.0 if j < m else 0.001
            lamps[i].scale = (s, s, s)
            kf(lamps[i], f, "scale")
        d.place((0, 0.2, 0.72), R(180))
        d.legs_set("stand")
        d.pose("count" if f < LEN * 0.75 else blend("count", "shrug", back_out((f - LEN * 0.75) / 6)))
        d.live(f, "think" if f < LEN * 0.75 else "neutral", talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (1.2 - 2.4 * t, -2.2 - 0.8 * t, 2.2 + 1.6 * t), (0, 3.4, 0.9), 20)
    FOCUS_DAVE = False

elif TPL == "ring":  # boxing ring in the dark, one spotlight; headline papers ("headlines" texts) fly at Dave
    world_hdri("night", 0.05, 0)
    plane("floor", (0, 0, 0), (40, 40), (0, 0, 0), flat("arena", (0.04, 0.04, 0.05), 0.8))
    box("ring", (0, 0, 0.3), (4.4, 4.4, 0.6), flat("canvas", (0.75, 0.72, 0.66), 0.8))
    rope, post = flat("rope", (0.75, 0.08, 0.08), 0.4), flat("post", (0.2, 0.2, 0.22), 0.3)
    for cx, cy in ((-2.1, -2.1), (2.1, -2.1), (2.1, 2.1), (-2.1, 2.1)):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.06, depth=1.4, location=(cx, cy, 1.3))
        bpy.context.object.data.materials.append(post)
    for z in (1.0, 1.35, 1.7):
        for (x, y, sx, sy) in ((0, -2.1, 4.2, 0.03), (0, 2.1, 4.2, 0.03), (-2.1, 0, 0.03, 4.2), (2.1, 0, 0.03, 4.2)):
            box("rope", (x, y, z), (sx, sy, 0.03), rope)
    light("spot", "SPOT", (0, -0.5, 7), (R(4), 0, 0), energy=4000, spot_size=R(28), spot_blend=0.3, color=(1.0, 0.95, 0.85))
    nh = max(1, len(P.get("headlines", ["x"])))
    mats = [image_mat(f"an{i}", tex(f"news{i}"), rough=0.9) for i in range(nh)]
    r = random.Random(9)
    shots = []
    for k in range(16):
        o = plane(f"throw{k}", (0, 0, -5), (0.61, 0.83), (0, 0, 0), mats[k % nh])
        a = r.uniform(0, 2 * math.pi)
        shots.append((o, 14 + k * (LEN * 0.7 / 16), (8 * math.cos(a), 8 * math.sin(a), r.uniform(2, 4)), r.uniform(-3, 3)))
    for f in range(1, LEN + 1):
        for o, t0, (sx, sy, sz), sp in shots:
            u = (f - t0) / 12
            if u < 0:
                o.location = (sx, sy, -5)
            elif u < 1:
                o.location = (sx * (1 - u), sy * (1 - u), sz + (1.5 - sz) * u)
            else:
                v = min(1, (u - 1) * 1.5)
                o.location = (sx * 0.08 * v, sy * 0.08 * v, 1.5 - 0.88 * v)
            o.rotation_euler = (R(90) * min(1, max(u, 0)) if u < 1 else R(0), sp * min(u, 1), sp * u * 0.3)
            kf(o, f, "location", "rotation_euler")
        hit = any(0 <= (f - t0) / 12 - 1 < 0.25 for _, t0, _, _ in shots)
        d.place((0, 0, 0.6 + 0.72), R(20) * math.sin(f / 30))
        d.legs_set("stand")
        d.pose(blend("fists", "slump", ease((f - LEN * 0.85) / 12)) if f > LEN * 0.85 else "fists")
        d.live(f, "panic" if hit else ("determined" if f < LEN * 0.85 else "sleep"))
        d.life(f)
        d.key(f)
        a = R(-25) + R(50) * ease(f / LEN)
        key_cam(cam0, f, (6.0 * math.sin(a), -6.0 * math.cos(a), 2.2 - 0.6 * ease(f / LEN)), (0, 0, 1.5), 30)

elif TPL == "grid":  # n small buildings in a grid; every one gets a light, k of them red (the bad ones)
    world_hdri("golden", 0.8, 300)
    plane("ground", (0, 0, 0), (80, 80), (0, 0, 0), pbr("ground", K.MAN.get("concrete") or K.MAN["floor"], 4.0))
    light("sun", "SUN", (0, 0, 10), (R(65), 0, R(220)), energy=2.6, color=(1.0, 0.84, 0.66), angle=R(2))
    n = min(int(P.get("n", 94)), 120)
    k = min(int(P.get("k", 19)), n)
    red = set(random.Random(19).sample(range(n), k))
    brick, ok_m, bad_m = flat("brick", (0.6, 0.3, 0.22), 0.8), flat("ok", (0.2, 0.6, 1.0), 0.3, emit=4.0), flat("bad", (1.0, 0.1, 0.05), 0.3, emit=8.0)
    drops = []
    for i in range(n):
        x, y = -9 + (i % 12) * 1.6, 2 + (i // 12) * 1.8
        box("bld", (x, y, 0.4), (1.1, 0.8, 0.8), brick)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.18, location=(x, y, 1.15))
        o = bpy.context.object
        o.data.materials.append(bad_m if i in red else ok_m)
        drops.append(o)
    for f in range(1, LEN + 1):
        m = pops(n, 16, LEN * 0.75, f)
        for i, o in enumerate(drops):
            s = (1.4 if i in red else 1.0) if i < m else 0.001
            o.scale = (s, s, s)
            kf(o, f, "scale")
        d.place((0.4, -1.2, 0.72), R(15))
        d.legs_set("stand")
        d.pose("read" if f < LEN * 0.8 else blend("read", "point_l", back_out((f - LEN * 0.8) / 6)))
        d.live(f, "think" if f < LEN * 0.8 else "determined", talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (1.8 - 1.2 * t, -4.5 - 3.5 * t, 1.3 + 7.0 * t), (0.4 - 1.0 * t, 0.5 + 6.0 * t, 1.3 - 0.8 * t), 26)
    FOCUS_DAVE = False

elif TPL == "walls":  # on the road to a building, 1-3 walls (the "walls" texts) slam up in front of Dave
    world_hdri("golden", 0.9, 160)
    plane("road", (0, 10, 0), (6, 60), (0, 0, 0), flat("asphalt", (0.16, 0.16, 0.17), 0.8))
    plane("lawn", (0, 10, -0.01), (90, 90), (0, 0, 0), flat("grass", (0.28, 0.42, 0.2), 0.9))
    light("sun", "SUN", (0, 0, 10), (R(70), 0, R(170)), energy=3.0, color=(1.0, 0.84, 0.64), angle=R(1.5))
    (tower(0, 34, 1.2, tex("dest")) if P.get("dest", "tower") == "tower" else capitol(0, 34, 1.4))
    cols = ((0.16, 0.24, 0.43), (0.12, 0.39, 0.24), (0.55, 0.16, 0.16))
    nw = min(3, max(1, len(P.get("walls", ["x"]))))
    walls = [face_box(f"wall{i}", (-4.3 + i * 4.3, 4, -2), (4.0, 0.4, 2.0), cols[i], tex(f"wall{i}")) for i in range(nw)]
    for f in range(1, LEN + 1):
        for i, w in enumerate(walls):
            q = back_out(min(1, max(0, (f - (14 + i * LEN * 0.22)) / 8)))
            w.location = (-4.3 * (nw - 1) / 2 + i * 4.3, 4, -1.05 + 2.05 * q)
            kf(w, f, "location")
        walk_to(f, 1, 40, (-7.2, -2.5), (-6.6, 1.2), R(200))
        d.pose("idle" if f < 40 else blend("idle", "look_up", ease((f - 40) / 10)))
        d.live(f, "neutral" if f < 60 else "think")
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (-1.0 + 0.6 * t, -9.0 + 1.5 * t, 1.1 + 0.9 * t), (-1.0 + 0.8 * t, 4 + 6 * t, 1.2 + 0.8 * t), 20)
    FOCUS_DAVE = False

elif TPL == "flyaway":  # a paper ("paper" text) pops out of Dave's mailbox and flies away to a far building
    world_hdri("day", 0.9, 90)
    plane("lawn", (0, 10, 0), (90, 90), (0, 0, 0), flat("grass", (0.28, 0.45, 0.2), 0.9))
    plane("path", (0, -1, 0.005), (1.2, 6), (0, 0, 0), flat("stone", (0.6, 0.58, 0.55), 0.8))
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(130)), energy=3.0, color=(1.0, 0.95, 0.86), angle=R(2))
    box("house", (0, 3.2, 1.5), (5.0, 3.0, 3.0), flat("house_w", (0.88, 0.84, 0.76), 0.7))
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=3.8, depth=1.6, location=(0, 3.2, 3.8), rotation=(0, 0, R(45)))
    bpy.context.object.data.materials.append(flat("roof", (0.4, 0.2, 0.16), 0.6))
    box("door", (0, 1.69, 1.0), (0.9, 0.04, 2.0), flat("door", (0.35, 0.18, 0.1), 0.5))
    box("mb_post", (1.3, -2.2, 0.5), (0.08, 0.08, 1.0), flat("post", (0.3, 0.2, 0.12), 0.7))
    box("mailbox", (1.3, -2.2, 1.1), (0.3, 0.5, 0.3), flat("mb", (0.2, 0.25, 0.3), 0.3, coat=0.5))
    (tower(-6, 60, 1.4, tex("dest")) if P.get("dest", "tower") == "tower" else capitol(-6, 60, 1.6))
    bill = face_box("bill", (0, 0, 0), (0.3, 0.02, 0.2), (0.95, 0.95, 0.92), tex("paper"))
    for f in range(1, LEN + 1):
        u = min(1, max(0, (f - LEN * 0.35) / (LEN * 0.55)))
        bill.location = (1.3 - 7.3 * u, -2.0 + 62 * u * u, 1.3 + 9 * math.sin(u * math.pi) + 2 * u)
        bill.rotation_euler = (R(20) * math.sin(f / 4), R(360) * u, R(30) * math.sin(f / 6))
        kf(bill, f, "location", "rotation_euler")
        d.place((0.6, -2.4, 0.72), R(30))
        d.legs_set("stand")
        d.pose("look" if f < LEN * 0.35 else blend("look_up", P.get("react", "panic"), ease((f - LEN * 0.6) / 10)))
        d.live(f, "think" if f < LEN * 0.35 else ("shock" if f < LEN * 0.6 else P.get("face", "panic")), talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (3.2 - 1.0 * t, -6.0 - 1.5 * t, 1.2 + 1.0 * t), (0.8 - 3 * t, -2.0 + 30 * t * t, 1.3 + 2.5 * t), 30 - 6 * t)

elif TPL == "room":  # a tiny apartment: a bill ("paper" text) taped to the door, a laptop glowing red; Dave walks in, reads, fists
    world_hdri("city", 0.3, 0)
    plane("floor", (0, 0, 0), (8, 8), (0, 0, 0), pbr("floor", K.MAN["floor"], 0.8))
    wall = pbr("wall", K.MAN["wall"], 0.6, tint=(0.75, 0.78, 0.72))
    plane("back", (0, 2.5, 1.5), (8, 3), (R(90), 0, 0), wall)
    plane("side", (-2.5, 0, 1.5), (8, 3), (R(90), 0, R(90)), wall)
    box("door", (1.2, 2.47, 1.0), (0.95, 0.06, 2.05), flat("door", (0.42, 0.3, 0.2), 0.5))
    plane("bill", (1.2, 2.43, 1.35), (0.3, 0.4), (R(90), 0, 0), image_mat("bill", tex("paper"), rough=0.8))
    box("table", (-1.3, 1.2, 0.38), (1.2, 0.8, 0.76), flat("table", (0.3, 0.22, 0.15), 0.5))
    box("lap_base", (-1.3, 1.2, 0.78), (0.5, 0.35, 0.03), flat("lap", (0.15, 0.15, 0.17), 0.3))
    scr = {"red": (1.0, 0.15, 0.1), "green": (0.2, 1.0, 0.35), "blue": (0.3, 0.6, 1.0)}[P.get("screen", "red")]
    box("lap_lid", (-1.3, 1.37, 0.95), (0.5, 0.02, 0.34), flat("screen", scr, 0.2, emit=3.0)).rotation_euler = (R(-15), 0, 0)
    glow = light("glow", "POINT", (-1.3, 1.1, 1.0), None, energy=40, color=scr)
    light("window", "AREA", (2.4, -1, 2.2), (0, R(-60), 0), energy=350, size=2, color=(0.75, 0.82, 1.0))
    for f in range(1, LEN + 1):
        glow.data.energy = 40 + 25 * math.sin(f / 3)
        glow.data.keyframe_insert("energy", frame=f)
        walk_to(f, 1, 40, (-0.2, -1.6), (0.9, 1.4), R(170))
        d.pose("idle" if f < 40 else ("read" if f < LEN * 0.55 else blend("read", "fists", back_out((f - LEN * 0.55) / 6))))
        d.live(f, "neutral" if f < 40 else ("shock" if f < LEN * 0.55 else "determined"), talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (1.8 - 2.6 * t, -2.8 + 0.6 * t, 1.5 + 0.2 * t), (0.6 - 1.6 * t, 1.8 - 0.4 * t, 1.25 - 0.2 * t), 24 + 4 * t)

elif TPL == "towers":  # two towers of cash bales: "a" bales (red, left) grow first, then "b" bales (blue, right)
    world_hdri("night", 0.25, 0)
    plane("floor", (0, 0, 0), (60, 60), (0, 0, 0), flat("stage", (0.06, 0.06, 0.07), 0.3, coat=0.6))
    cash = image_mat("cash", "banknote.png", rough=0.7)
    na, nb = min(int(P.get("a", 59)), 90), min(int(P.get("b", 23)), 90)
    reds = [box("rb", (-1.6, 2, 0.13 + i * 0.27), (0.62, 0.34, 0.26), cash) for i in range(na)]
    blues = [box("bb", (1.6, 2, 0.13 + i * 0.27), (0.62, 0.34, 0.26), cash) for i in range(nb)]
    box("red_base", (-1.6, 2, 0.02), (1.2, 1.0, 0.04), flat("redb", (0.9, 0.1, 0.1), 0.3, emit=3.0))
    box("blue_base", (1.6, 2, 0.02), (1.2, 1.0, 0.04), flat("blueb", (0.1, 0.35, 1.0), 0.3, emit=3.0))
    for nm, x, z, e, c in (("red_l", -1.6, 18, 6000, (1.0, 0.45, 0.4)), ("blue_l", 1.6, 10, 2500, (0.5, 0.65, 1.0))):
        aim(light(nm, "SPOT", (x, -1, z), None, energy=e, spot_size=R(20), color=c), (x, 2, 0))
    for f in range(1, LEN + 1):
        ra, rb = pops(na, 20, LEN * 0.45, f), pops(nb, LEN * 0.6, LEN * 0.8, f)
        for i, o in enumerate(reds):
            o.scale = (0.31, 0.17, 0.13) if i < ra else (0.0001,) * 3
            kf(o, f, "scale")
        for i, o in enumerate(blues):
            o.scale = (0.31, 0.17, 0.13) if i < rb else (0.0001,) * 3
            kf(o, f, "scale")
        d.place((0, 0.6, 0.72), R(0))
        d.legs_set("stand")
        d.pose("look_up" if f < LEN * 0.6 else blend("look_up", "shrug", ease((f - LEN * 0.82) / 8)))
        d.live(f, "shock" if f < LEN * 0.6 else "neutral", talking=True)
        d.life(f)
        d.key(f)
        m = ease(min(1, max(0, (f - LEN * 0.55) / (LEN * 0.12))))
        top = (0.13 + ra * 0.27) * (1 - m) + (0.13 + max(rb, 6) * 0.27) * m
        key_cam(cam0, f, (0.4, -6.5 - 4 * ease(min(1, f / (LEN * 0.45))), 1.0 + 0.5 * top), (0, 2, 0.6 + 0.6 * top), 24)

elif TPL == "building_walk":  # tiny Dave walks up the plaza to a big building (tower = bank/company, capitol = government), crane up
    world_hdri("golden", 1.0, 200)
    plane("plaza", (0, -8, 0), (60, 40), (0, 0, 0), pbr("plaza", K.MAN.get("concrete") or K.MAN["floor"], 4.0))
    light("sun", "SUN", (0, 0, 10), (R(68), 0, R(150)), energy=3.2, color=(1.0, 0.82, 0.62), angle=R(1.5))
    (tower(0, 0, 1.0, tex("dest")) if P.get("dest", "tower") == "tower" else capitol())
    for f in range(1, LEN + 1):
        walk_to(f, 1, LEN, (0.3, -15.0), (0.2, -11.5), R(180))
        d.pose("idle")
        d.live(f, "determined")
        d.life(f)
        d.key(f)
        k = ease(f / LEN)
        key_cam(cam0, f, (1.2 - 1.2 * k, -17.5 - 3 * k, 0.45 + 4.5 * k), (0.2, -9 + 6 * k, 1.4 + 2.2 * k), 18 + 4 * k)
    FOCUS_DAVE = False

elif TPL == "headlines":  # newspaper pages ("headlines" texts) rain onto a desk, the first lands last in the middle, camera rises
    world_hdri("studio", 0.35, 40)
    plane("desk", (0, 0, 0), (14, 10), (0, 0, 0), pbr("desk", K.MAN.get("wood") or K.MAN["floor"], 2.0))
    light("sun", "SUN", (0, 0, 10), (R(40), 0, R(160)), energy=3.0, color=(1.0, 0.88, 0.72), angle=R(3))
    light("rim", "AREA", (-2, 2, 3), None, energy=300, size=3, color=(0.7, 0.8, 1.0))
    d.show(False)
    nh = max(1, len(P.get("headlines", ["x"])))
    mats = [image_mat(f"news{i}", tex(f"news{i}"), rough=0.9) for i in range(nh)]
    r = random.Random(5)

    def sheet(m, bend):
        bpy.ops.mesh.primitive_grid_add(x_subdivisions=10, y_subdivisions=3, size=1)
        o = bpy.context.object
        o.scale = (0.61, 0.83, 1)
        o.data.materials.append(m)
        md = o.modifiers.new("curl", "SIMPLE_DEFORM")
        md.deform_method, md.deform_axis, md.angle = "BEND", "Y", R(bend)
        return o

    papers = [(sheet(mats[k % nh], r.uniform(-25, 25)), r.uniform(-2.4, 2.4), r.uniform(-1.6, 1.8), r.uniform(-0.6, 0.6), r.uniform(-30, 46), r.uniform(0.6, 1.4)) for k in range(40)]
    hero = sheet(mats[0], 8)
    for f in range(1, LEN + 1):
        for n, (o, lx, ly, rot, t0, dr) in enumerate(papers):
            t = max(0.0, (f - t0) / 40.0)
            z = max(0.004 + n * 0.0006, 3.2 - 3.2 * ease(min(t, 1)))
            sway = (1 - min(t, 1)) * 0.5
            o.location = (lx + sway * math.sin(f / 6 * dr), ly + sway * math.cos(f / 7 * dr), z)
            o.rotation_euler = (sway * 1.4 * math.sin(f / 5 * dr), sway * math.cos(f / 4), rot + sway * 2)
            kf(o, f, "location", "rotation_euler")
        th = min(1, max(0, (f - 50) / 22))
        hero.location = (0.05, 0.05, 0.035 + 2.6 * (1 - ease(th)))
        hero.rotation_euler = (0.6 * (1 - th) * math.sin(f / 4), 0.3 * (1 - th), 0.08 + 0.8 * (1 - th))
        kf(hero, f, "location", "rotation_euler")
        k = ease(min(1, f / LEN))
        key_cam(cam0, f, (0.5 - 0.5 * k, -3.0 + 2.25 * k, 0.8 + 1.15 * k), (0.0, 0.3 - 0.25 * k, 0.5 - 0.5 * k), 20 + 15 * k)
    sc.camera.data.dof.use_dof = True
    sc.camera.data.dof.focus_object, sc.camera.data.dof.aperture_fstop = hero, 4.0
    FOCUS_DAVE = False

elif TPL == "scene":  # NEW (5 Nov): the set comes from the SCRIPT, not from ea1. sky/ground/room/props/hero = Poly Haven CC0 ids
    X = K.MAN.get("extra", {})
    sky = P["sky"]
    if sky in X.get("hdri", {}):
        K.MAN.setdefault("moods", {})[sky] = X["hdri"][sky]
        world_hdri(sky, float(P.get("sky_power", 1.0)), float(P.get("sky_rot", 0)))
    else:
        print("WARN sky not fetched", sky)
        world_hdri("day", 1.0, 0)
    gt = X.get("tex", {}).get(P.get("ground", ""))
    plane("ground", (0, 0, 0), (60, 60), (0, 0, 0), pbr("g", gt, 0.5) if gt else pbr("g", K.MAN.get("concrete") or K.MAN["floor"], 0.5))
    if P.get("room"):
        wt = X.get("tex", {}).get(P["room"])
        wm = pbr("w", wt, 0.5) if wt else flat("w", (0.8, 0.78, 0.74))
        box("back", (0, 4.2, 1.8), (9, 0.15, 3.6), wm)
        box("left", (-4.5, 0.6, 1.8), (0.15, 7.4, 3.6), wm)
        box("right", (4.5, 0.6, 1.8), (0.15, 7.4, 3.6), wm)
        light("ceil", "AREA", (0, 0.5, 3.4), None, energy=420, size=4, color=(1.0, 0.95, 0.88))
    rr = random.Random(sum(map(ord, EP + SHOT)))

    from props import PROPS, SHOW  # "p:<name>" / "p:<name>=<text>" = our procedural money props (pipeline/PROPS.md)

    def put(mid, loc, rz=0.0, h=None):
        try:
            if mid.startswith("p:"):
                nm, _, txt_ = mid[2:].partition("=")
                o = PROPS[nm](loc, rz, 1.0, txt_ or None)
                if not h:
                    s_ = float(SHOW.get(nm, 1.0))
                    o.scale = (s_, s_, s_)
            else:
                o = import_model(mid, loc, rz)
        except Exception as e:
            print("WARN model", mid, e)
            return None
        if h:
            lo, hi = bbox(o)
            k = h / max(0.05, hi.z - lo.z)
            o.scale = (k, k, k)
        lo, _ = bbox(o)
        o.location.z -= lo.z
        return o

    # props: real objects named in the line, in an arc behind/beside Dave (never between Dave and the lens)
    props = P.get("props", [])
    for i, mid in enumerate(props):
        a = math.pi * (0.15 + 0.7 * (i + 0.5) / max(1, len(props)))
        r_ = 2.0 + rr.uniform(0, 1.2)
        o = put(mid, (math.cos(a) * r_ * (0.5 if PORT else 1.4), 1.4 + math.sin(a) * r_ + (0.6 if PORT else 0), 0), rr.uniform(-0.6, 0.6))
        if o:
            lo, hi = bbox(o)
            if hi.z - lo.z > 1.6:
                k_ = 1.6 / (hi.z - lo.z)
                o.scale = tuple(c * k_ for c in o.scale)  # relative: "p:" props may already carry a SHOW scale
                lo, _ = bbox(o)
                o.location.z -= lo.z
    if P.get("sign"):  # the line's words on a real 3D board on a post (price, name, number)
        sx, sy = (-0.62, 1.9) if PORT else (-1.5, 1.6)
        box("post", (sx, sy, 0.55), (0.08, 0.08, 1.1), flat("post", (0.15, 0.15, 0.16)))
        sg = face_box("sign", (sx, sy, 1.45), (1.05, 0.06, 0.65) if PORT else (1.3, 0.06, 0.8), (0.9, 0.9, 0.9), tex("sign"), "-y")
        sg.rotation_euler = (0, 0, R(8 if PORT else 12))
    # hero object: the ONE thing the line is about, with its own motion
    hero, fx, heroes = P.get("hero"), P.get("hero_fx", "drop"), []
    if hero:
        big = float(P.get("hero_size") or 0) >= 1.2  # portrait: a building-size hero stands BEHIND Dave, small ones in front of him
        h0 = put(hero, ((0.35, 2.6, 0) if big else (0.42, -0.85, 0)) if PORT else (0.9, -0.4, 0), 0.3, float(P["hero_size"]) if P.get("hero_size") else None)
        if h0:
            heroes = [h0] + ([dup(h0, (0, 0, 0)) for _ in range(int(P.get("n", 24)) - 1)] if fx == "pile" else [])
    base = [(o.location.copy(), o.rotation_euler.copy(), o.scale.copy(), rr.uniform(-1.2, 1.2), rr.uniform(-1.6, 1.6), rr.uniform(0.2, 2.6), rr.uniform(0, LEN * 0.6)) for o in heroes]
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(rr.uniform(120, 240))), energy=float(P.get("sun", 1.6)), color=(1.0, 0.93, 0.84), angle=R(3))
    act, move = P.get("dave", "stand"), P.get("move", "push")
    if act == "none":
        d.show(False)
        FOCUS_DAVE = False
    end_pose, face = P.get("pose", "point_you"), P.get("face", "determined")
    for f in range(1, LEN + 1):
        t = f / LEN
        for o, (loc, rot, sc0, dx, dy, dz, t0) in zip(heroes, base):
            if fx == "drop":
                k = back_out(min(1, f / 14))
                o.location = (loc.x, loc.y, loc.z + 4.0 * (1 - k))
                o.rotation_euler = (rot.x, rot.y, rot.z + 0.6 * (1 - k))
            elif fx == "pop":
                k = back_out(min(1, f / 10))
                o.scale = tuple(max(0.001, c * k) for c in sc0)
                o.location = loc
            elif fx == "spin":
                o.rotation_euler = (rot.x, rot.y, rot.z + 2 * math.pi * ease(t))
            elif fx == "slide":
                k = back_out(min(1, f / 16))
                o.location = (loc.x + (1.6 if PORT else 3.5) * (1 - k), loc.y, loc.z)
            elif fx == "pile":
                tt = max(0.0, (f - t0) / 24.0)
                z = max(0.0, 7.0 - 0.5 * 9.81 * tt * tt) if f >= t0 else 9.0
                o.location = (loc.x + dx * (0.5 if PORT else 1.0), loc.y + dy * 0.8 + 1.0, loc.z + z * 1.0 + (dz * 0.08 if z == 0 else 0))
                o.rotation_euler = (rot.x + dz * min(tt, 1), rot.y + dx * min(tt, 1), rot.z + dy)
            kf(o, f, "location", "rotation_euler", "scale")
        if act != "none":
            if act == "walk_in" and f <= 40:
                bob = d.legs_walk(f / 40 * 4 * math.pi)
                d.place((-2.6 + 2.6 * ease(f / 40), 0.4, 0.72 + bob), R(-90 + 90 * ease(max(0, (f - 30) / 10))))
                d.pose("idle")
            else:
                d.place((0.0, 0.4, 0.72), 0)
                d.legs_set("stand")
                d.pose(blend("idle" if act == "walk_in" else "look", end_pose, back_out((f - (44 if act == "walk_in" else 16)) / 7)))
            d.live(f, "shock" if f < 16 else face, talking=f > 20)
            d.life(f)
            d.key(f)
        k = ease(t)
        tgt = (0.2, 0.4, 1.15)  # framing (8 Nov peek: Dave was tiny) → Dave fills ~45 % of frame height
        if move == "orbit":
            a = R(-70 + 50 * k)
            key_cam(cam0, f, (math.cos(a) * 3.6, 0.4 + math.sin(a) * 3.6, 1.35), tgt, 32)
        elif move == "crane":
            key_cam(cam0, f, (0.5, -3.4 - 1.2 * k, 0.6 + 2.6 * k), (0.2, 0.5, 1.0 + 0.3 * k), 28)
        elif move == "dolly":
            key_cam(cam0, f, (-1.8 + 3.6 * k, -3.6, 1.3), tgt, 32)
        elif move == "low":
            key_cam(cam0, f, (0.5, -2.6 + 0.5 * k, 0.45), (0.2, 0.4, 1.35), 22)
        elif move == "top":
            key_cam(cam0, f, (0.2, -1.2 - 1.0 * k, 5.0 - 1.5 * k), (0.2, 0.6, 0.5), 28)
        else:  # push
            key_cam(cam0, f, (0.35, -4.4 + 1.6 * k, 1.3), tgt, 34)

elif SHOT == "K":  # transparent Dave cut-outs: "K:shock_panic,smug_point_you,…" (face_pose)
    world_hdri("studio", 1.0, 0)
    light("key", "AREA", (1.5, -3, 3), (R(40), 0, R(20)), energy=500, size=3)
    sc.camera = cam("cut", (0, -1.5, 1.25), (0, 0, 1.22), 40)
    sc.render.film_transparent = True
    sc.render.image_settings.file_format, sc.render.image_settings.color_mode = "PNG", "RGBA"
    sc.render.resolution_x, sc.render.resolution_y = int(K.H * 0.8), K.H
    for item in rng.split(","):
        face, pose = item.split("_", 1)
        d.place((0, 0, 0.72), 0)
        d.legs_set("stand")
        d.pose(pose)
        d.face(face)
        sc.render.filepath = os.path.join(K.OUT, f"cut_{item}.png")
        bpy.ops.render.render(write_still=True)
        print("frame", item, flush=True)
    raise SystemExit
else:
    raise SystemExit(f"auto.py: shot {SHOT} has unknown template '{TPL}'")

finish()
if FOCUS_DAVE and TPL not in ("rain", "headlines"):
    dof(cam0, d.head, 2.8)
sc.render.image_settings.file_format, sc.render.image_settings.quality = "JPEG", 90
sc.frame_start, sc.frame_end = 1, LEN
for f in FRAMES:
    sc.frame_set(f)
    sc.render.filepath = os.path.join(K.OUT, f"{SHOT}_{f:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", SHOT, f, flush=True)
