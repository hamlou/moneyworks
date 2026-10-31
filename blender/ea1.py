"""ea1 — "What if Abdul El-Sayed became president?" 1-minute hook test: the ANIMATED 3D shots (blender/anim.py kit).
Real people are never modelled; Dave is our host. Every frame rendered, 24 fps, motion blur.
blender -b -P blender/ea1.py -- --assets A --tex T --out O --frames "O:1-12" [--samples 16]
  O office  (h1)    Dave in a suit walks into a generic presidential office (no real seal), stops behind the big desk with a
                    stethoscope + Egypt postcard on it, turns to camera and points at the giant chair; camera pushes in
  M sign    (h4-h5) Dave signs the MEDICARE FOR ALL paper at the desk; the INSURANCE giant at the door flexes, then on
                    "unnecessary" (frame 70) it slumps and its head drops; camera slow orbit
  C cash    (h6)    a yard: cash bales rain from the sky and bounce while Dave (suit) looks up in panic; low hero camera
  H hook    (k1)    frame 0 = the prize: cash bales already falling INTO the lens (low macro camera, wide lens, DOF)
  S spin    (k3)    Dave in the suit, back to camera in the big chair, spins round (back_out) and leans in; tight push
  E end     (h10)   the office at dusk, the light goes down to one lamp, Dave looks into camera and talks; slow push-in
"""
import sys, os, math, json, random
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import K, R, setup, Dave, flat, pbr, image_mat, box, plane, cam, blend, ease, back_out, finish, dof, world_hdri, Mocap, mocap_pose, POSES  # noqa: E402
import bpy  # noqa: E402

args = setup(sys.argv[sys.argv.index("--") + 1:])
sc = K.sc
sc.render.use_motion_blur, sc.render.motion_blur_shutter = True, 0.5
sc.cycles.samples = int(args.get("--samples", "16"))
SHOT, rng = args.get("--frames", "O:1-12").split(":")
FRAMES = []
if SHOT != "K":  # K = transparent Dave-in-a-suit cut-outs for the home-base quote scenes: "K:shock_panic,smug_point_you,…"
    for part in rng.split(","):
        a, _, b = part.partition("-")
        FRAMES += list(range(int(a), int(b or a) + 1))
LENS = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "ea1_lens.json")))
LEN = LENS.get(SHOT, 1)
SIGN, DROOP = LENS.get("M_sign", 60), LENS.get("M_droop", 70)  # frames from the voice: end of "sign…", the word "unnecessary"

POSES["sign"] = dict(el=(-0.16, -0.2, 0.2), hl=(-0.12, -0.5, 0.12), er=(0.18, -0.22, 0.18), hr=(0.06, -0.55, 0.1), head=(26, 0, 0), lean=20)
POSES["droop"] = dict(el=(-0.2, 0.02, 0.02), hl=(-0.22, 0.04, -0.22), er=(0.2, 0.02, 0.02), hr=(0.22, 0.04, -0.22), head=(35, 0, 10), lean=-12)
POSES["flex"] = dict(el=(-0.3, 0.0, 0.4), hl=(-0.24, -0.04, 0.64), er=(0.3, 0.0, 0.4), hr=(0.24, -0.04, 0.64), head=(-6, 0, 0))
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
        c.data.lens = lens
        c.data.keyframe_insert("lens", frame=f)
    c.keyframe_insert("location", frame=f)
    c.keyframe_insert("rotation_euler", frame=f)


def mascot(logo, scale=2.4):
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


def office(dusk=False):
    """generic presidential-style office (oval-ish feel without any real seal or insignia)"""
    world_hdri("golden" if dusk else "day", 0.25 if dusk else 0.6, 30)
    wall = flat("office_wall", (0.86, 0.82, 0.7), 0.7)
    wood = pbr("office_floor", K.MAN["floor"], 1.2, tint=(0.75, 0.6, 0.45))
    plane("floor", (0, 0, 0), (14, 12), (0, 0, 0), wood)
    rug = flat("rug", (0.1, 0.16, 0.36), 0.95)
    bpy.ops.mesh.primitive_cylinder_add(radius=2.6, depth=0.01, location=(0, -0.4, 0.006), vertices=64)
    bpy.context.object.scale = (1.3, 1, 1)
    bpy.context.object.data.materials.append(rug)
    box("back_wall", (0, 3.2, 1.8), (12, 0.2, 3.6), wall)
    for x in (-5.5, 5.5):
        box("side_wall", (x, -1, 1.8), (0.2, 9, 3.6), wall)
    # tall windows with light behind
    winm = flat("window_glow", (1.0, 0.92, 0.78), 0.2, emit=2.5 if not dusk else 0.9)
    trim = flat("trim_white", (0.95, 0.94, 0.9), 0.5)
    for x in (-2.2, 2.2):
        box("window", (x, 3.09, 1.75), (1.3, 0.02, 2.4), winm)
        box("win_frame", (x, 3.07, 1.75), (1.45, 0.04, 2.55), trim)
    # flags on poles (generic US flag) — the "president" signifier
    flag = image_mat("us_flag", "us_flag.png", rough=0.8)
    pole = flat("pole", (0.75, 0.6, 0.2), 0.3)
    for x in (-0.9, 0.9):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=2.6, location=(x, 2.75, 1.3))
        bpy.context.object.data.materials.append(pole)
        f = plane("flag", (x + (0.42 if x < 0 else -0.42), 2.74, 2.0), (0.8, 0.5), (math.radians(90), 0, 0), flag)
        bpy.ops.object.select_all(action="DESELECT")
    # the big desk + the giant chair
    deskm = flat("desk_wood", (0.32, 0.17, 0.08), 0.35)
    box("desk", (0, 1.4, 0.4), (2.4, 1.0, 0.8), deskm)
    box("desk_top", (0, 1.4, 0.81), (2.5, 1.1, 0.04), deskm)
    leather = flat("leather", (0.08, 0.06, 0.05), 0.4, 0.2)
    box("chair_seat", (0, 2.15, 0.55), (0.8, 0.7, 0.14), leather)
    box("chair_back", (0, 2.5, 1.25), (0.85, 0.16, 1.5), leather)
    # desk props from h1: stethoscope ("a doctor") + Egypt postcard ("whose dad came from Egypt")
    st = flat("steth", (0.15, 0.15, 0.17), 0.3)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.12, minor_radius=0.012, location=(-0.7, 1.15, 0.84))
    bpy.context.object.data.materials.append(st)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.035, depth=0.02, location=(-0.56, 1.05, 0.84))
    bpy.context.object.data.materials.append(flat("steth_metal", (0.8, 0.8, 0.82), 0.15))
    pc = plane("postcard", (0.72, 1.15, 0.835), (0.42, 0.28), (0, 0, math.radians(-12)), image_mat("egypt", "egypt_postcard.png", rough=0.8))
    return deskm


cam0 = cam("cam", (0, -6, 1.6), (0, 0, 1.4), 30)
sc.camera = cam0
d = Dave()
d.outfit("suit")

if SHOT == "O":
    office()
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("fill", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=300, size=5, color=(1.0, 0.96, 0.9))
    for f in range(1, LEN + 1):
        if f <= 52:  # walks in from the left behind the desk (our walk cycle: clean side silhouette)
            bob = d.legs_walk(f / 52 * 4 * math.pi)
            d.place((-3.6 + 3.4 * ease(f / 52), 0.6, 0.72 + bob), R(-90))
            sw = math.sin(f / 52 * 4 * math.pi) * 0.12
            P = dict(POSES["idle"])
            P["hl"], P["hr"] = (-0.13, -0.02 - sw, -0.06), (0.13, -0.02 + sw, -0.06)
            d.pose(P)
            d.live(f, "grin", talking=True)
        else:  # turns to camera and presents the giant chair
            d.place((-0.2, 0.6, 0.72), R(-90) + R(90) * back_out((f - 52) / 6))
            d.legs_set("stand")
            d.pose(blend("idle", "present", back_out((f - 54) / 6)))
            d.live(f, "grin", talking=True)
            d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (0.4 - 0.2 * t, -6.2 + 2.0 * t, 1.25), (-0.1, 1.2, 1.15), 28)

if SHOT == "M":
    office()
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("fill", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=300, size=5)
    paper = plane("m4a", (0.0, 1.25, 0.835), (0.34, 0.44), (0, 0, math.radians(4)), image_mat("m4a", "m4a_paper.png", rough=0.85))
    for o in bpy.data.objects:  # the chair moves back so Dave can stand behind the desk
        if o.name.startswith("chair_"):
            o.location.y += 0.5
    g = mascot("insurance", 2.2)
    for f in range(1, LEN + 1):
        d.place((0.0, 1.85, 0.72), R(0))  # behind the desk, facing camera, hands on the paper
        d.legs_set("stand")
        wig = math.sin(f * 1.1) * 0.03 if f < SIGN else 0  # pen scribbles
        P = dict(POSES["sign"])
        P["hr"] = (0.08 + wig, -0.4, 0.1 + abs(wig))
        d.pose(blend("idle", P, ease(f / 8)) if f < SIGN else blend(P, "present", back_out((f - SIGN) / 6)))
        d.live(f, "determined" if f < SIGN else "smug", talking=f >= SIGN)
        d.life(f, 0.4)
        d.key(f)
        g.place((3.4, 0.4, 0.72 * 2.2), R(-40))
        g.legs_set("stand")
        if f < DROOP:
            pump = 0.5 - 0.5 * math.cos(f / 14 * 2 * math.pi)
            g.pose(blend("flex", "cheer", pump * 0.3))
        else:
            g.pose(blend("flex", "droop", back_out((f - DROOP) / 8)))
            if f <= DROOP + 6:
                g.squash(0.8 * (1 - (f - DROOP) / 6))
        g.life(f, 0.5)
        g.key(f)
        a = R(-18) + R(26) * ease(f / LEN)
        key_cam(cam0, f, (5.2 * math.sin(a), -5.0 * math.cos(a) + 0.6, 1.35), (1.0, 1.0, 1.4), 26)

if SHOT == "C":
    world_hdri("golden", 0.9, 120)
    plane("ground", (0, 0, 0), (80, 80), (0, 0, 0), pbr("yard", K.MAN.get("concrete") or K.MAN["floor"], 3.0))
    light("sun", "SUN", (0, 0, 10), (R(62), 0, R(25)), energy=2.4, color=(1.0, 0.86, 0.68), angle=R(2))
    cash = image_mat("cash", "banknote.png", rough=0.7)
    r = random.Random(7)
    bales = []
    for i in range(90):
        o = box("bale", (0, 0, 0), (0.62, 0.34, 0.26), cash)
        bales.append((o, r.uniform(-4, 4), r.uniform(-1.5, 5), r.uniform(0, LEN * 0.8), r.uniform(-3, 3)))
    for f in range(1, LEN + 1):
        for o, x, y, t0, spin in bales:
            t = (f - t0) / 24.0
            z = 9 - 0.5 * 9.81 * max(0, t) ** 2
            if z < 0.13:  # land with a small bounce
                over = (f - t0) - math.sqrt(2 * 8.87 / 9.81) * 24
                z = 0.13 + abs(math.sin(over / 4)) * 0.3 * math.exp(-over / 8)
            o.location = (x, y, z if f >= t0 else 9.5)
            o.rotation_euler = (spin * min(t, 1.2), spin * 0.6 * min(t, 1.2), spin)
            o.keyframe_insert("location", frame=f)
            o.keyframe_insert("rotation_euler", frame=f)
        d.place((0.4, -1.2, 0.72), R(15))
        d.legs_set("stand")
        d.pose(blend("look_up", "panic", ease((f - 30) / 8)))
        d.live(f, "shock" if f < 30 else "panic", talking=f >= 40)
        d.life(f)
        d.key(f)
        key_cam(cam0, f, (1.4, -5.2 + 0.8 * ease(f / LEN), 0.3), (0.2, 0.5, 1.7), 20)

if SHOT == "H":
    world_hdri("golden", 0.9, 120)
    plane("ground", (0, 0, 0), (80, 80), (0, 0, 0), pbr("yard", K.MAN.get("concrete") or K.MAN["floor"], 3.0))
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(200)), energy=2.6, color=(1.0, 0.86, 0.68), angle=R(2))
    d.show(False)
    cash = image_mat("cash", "banknote.png", rough=0.7)
    r = random.Random(11)
    bales = [(box("bale", (0, 0, 0), (0.62, 0.34, 0.26), cash), r.uniform(-3, 3), r.uniform(-0.5, 6), r.uniform(-40, LEN * 0.8), r.uniform(-3, 3)) for _ in range(110)]
    hero = box("hero", (0, 0, 0), (0.62, 0.34, 0.26), cash)  # one bale tumbles right past the lens
    for f in range(1, LEN + 1):
        for o, x, y, t0, spin in bales:
            t = (f - t0) / 24.0
            z = 9 - 0.5 * 9.81 * max(0, t) ** 2
            if z < 0.13:
                over = (f - t0) - math.sqrt(2 * 8.87 / 9.81) * 24
                z = 0.13 + abs(math.sin(over / 4)) * 0.3 * math.exp(-over / 8)
            o.location = (x, y, z)
            o.rotation_euler = (spin * min(t, 1.2), spin * 0.6 * min(t, 1.2), spin)
            o.keyframe_insert("location", frame=f)
            o.keyframe_insert("rotation_euler", frame=f)
        th = f / 24.0
        hero.location = (0.15 - 0.2 * th, -1.0, 2.4 - 0.5 * 9.81 * th ** 2 + 0.6)
        hero.rotation_euler = (1.5 * th, 2.2 * th, 0.4)
        hero.keyframe_insert("location", frame=f)
        hero.keyframe_insert("rotation_euler", frame=f)
        k = ease(f / LEN)
        key_cam(cam0, f, (0.3, -2.4 + 0.5 * k, 0.22), (0.0, 1.5, 1.6 + 0.3 * k), 16)
    sc.camera.data.dof.use_dof = True
    sc.camera.data.dof.focus_distance, sc.camera.data.dof.aperture_fstop = 4.0, 2.2

if SHOT == "N":  # cold open: real headlines with his name rain onto a desk, his two books slam down, camera rises
    world_hdri("golden", 0.7, 40)
    plane("desk", (0, 0, 0), (14, 10), (0, 0, 0), pbr("desk", K.MAN.get("wood") or K.MAN["floor"], 2.0))
    light("sun", "SUN", (0, 0, 10), (R(40), 0, R(160)), energy=3.0, color=(1.0, 0.88, 0.72), angle=R(3))
    light("rim", "AREA", (-2, 2, 3), None, energy=300, size=3, color=(0.7, 0.8, 1.0))
    d.show(False)
    mats = [image_mat(f"news{i}", f"news_{i}.png", rough=0.9) for i in range(8)]
    r = random.Random(5)

    def sheet(m, bend):
        bpy.ops.mesh.primitive_grid_add(x_subdivisions=10, y_subdivisions=3, size=1)
        o = bpy.context.object
        o.scale = (0.61, 0.83, 1)
        o.data.materials.append(m)
        md = o.modifiers.new("curl", "SIMPLE_DEFORM")
        md.deform_method, md.deform_axis, md.angle = "BEND", "Y", R(bend)
        return o

    papers = []  # (obj, land x, land y, land rot, start frame, drift)
    for k in range(46):
        lx, ly = r.uniform(-2.4, 2.4), r.uniform(-1.6, 1.8)
        papers.append((sheet(mats[k % 8], r.uniform(-25, 25)), lx, ly, r.uniform(-0.6, 0.6), r.uniform(-30, 46), r.uniform(0.6, 1.4)))
    hero = sheet(mats[1], 8)  # the AP page lands last in the middle and fills the final frame
    books = [box(f"book{i}", (0, 0, 0), (0.36, 0.5, 0.06), image_mat(f"bk{i}", f"book_ae{i}.png", rough=0.5)) for i in range(2)]
    for f in range(1, LEN + 1):
        for n, (o, lx, ly, rot, t0, dr) in enumerate(papers):
            t = max(0.0, (f - t0) / 40.0)  # paper falls slowly and sways
            z = max(0.004 + n * 0.0006, 3.2 - 3.2 * ease(min(t, 1)))
            sway = (1 - min(t, 1)) * 0.5
            o.location = (lx + sway * math.sin(f / 6 * dr), ly + sway * math.cos(f / 7 * dr), z)
            o.rotation_euler = (sway * 1.4 * math.sin(f / 5 * dr), sway * math.cos(f / 4), rot + sway * 2)
            o.keyframe_insert("location", frame=f)
            o.keyframe_insert("rotation_euler", frame=f)
        th = min(1, max(0, (f - 50) / 22))
        hero.location = (0.05, 0.05, 0.035 + 2.6 * (1 - ease(th)))
        hero.rotation_euler = (0.6 * (1 - th) * math.sin(f / 4), 0.3 * (1 - th), 0.08 + 0.8 * (1 - th))
        hero.keyframe_insert("location", frame=f)
        hero.keyframe_insert("rotation_euler", frame=f)
        for i, (b, x, y, t0) in enumerate(zip(books, (-0.62, 0.66), (-0.42, 0.36), (58, 66))):
            tb = min(1, max(0, (f - t0) / 7))
            b.location = (x, y, 0.07 + i * 0.002 + 2.2 * (1 - tb * tb))
            b.rotation_euler = (0, 0, (-0.35, 0.3)[i] + (1 - tb) * 1.2)
            b.keyframe_insert("location", frame=f)
            b.keyframe_insert("rotation_euler", frame=f)
        k = ease(min(1, f / LEN))
        key_cam(cam0, f, (0.5 - 0.5 * k, -3.0 + 2.25 * k, 0.8 + 1.15 * k), (0.0, 0.3 - 0.25 * k, 0.5 - 0.5 * k), 20 + 15 * k)
    sc.camera.data.dof.use_dof = True
    sc.camera.data.dof.focus_object, sc.camera.data.dof.aperture_fstop = hero, 4.0

if SHOT == "S":
    office()
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
        u = back_out((f - 5) / 9)  # spin from back-to-camera to facing camera
        turn = R(180) * (1 - u) if f >= 5 else R(180)
        pivot.rotation_euler = (0, 0, turn)
        pivot.keyframe_insert("rotation_euler", frame=f)
        d.place((0.0, 2.15, 0.64), turn)
        d.legs_set("sit", seat=0.6)
        d.pose(blend("fists", "present", ease((f - 16) / 8)))
        d.live(f, "smug" if f > 12 else "neutral", talking=f > 14)
        d.life(f, 0.6)
        d.key(f)
        k = ease(f / LEN)
        key_cam(cam0, f, (0.15, -1.3 + 0.5 * k, 1.6), (0.0, 2.15, 1.18), 42 + 8 * k)

if SHOT == "E":
    office(dusk=True)
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

if SHOT == "K":
    world_hdri("studio", 1.0, 0)
    light("key", "AREA", (1.5, -3, 3), (R(40), 0, R(20)), energy=500, size=3)
    ccut = cam("cut", (0, -1.5, 1.25), (0, 0, 1.22), 40)
    sc.camera = ccut
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

finish()
if SHOT not in ("H", "N"):  # H, N focus on the falling cash, not on Dave
    dof(cam0, d.head, 2.8)
sc.render.image_settings.file_format, sc.render.image_settings.quality = "JPEG", 90
sc.frame_start, sc.frame_end = 1, LEN
for f in FRAMES:
    sc.frame_set(f)
    sc.render.filepath = os.path.join(K.OUT, f"{SHOT}_{f:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", SHOT, f, flush=True)
