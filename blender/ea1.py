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


def capitol(ox=0.0, oy=0.0, s=1.0):
    """a generic domed capitol (primitives only, no seal): wings, portico columns, drum + colonnade, dome, lantern"""
    mar = flat("marble", (0.9, 0.88, 0.83), 0.45)

    def cyl(loc, r, h, n=24):
        bpy.ops.mesh.primitive_cylinder_add(vertices=n, radius=r * s, depth=h * s, location=(ox + loc[0] * s, oy + loc[1] * s, loc[2] * s))
        bpy.context.object.data.materials.append(mar)
        bpy.ops.object.shade_smooth()
        return bpy.context.object

    for x, w, h in ((0, 5.0, 3.2), (-5.2, 5.4, 2.6), (5.2, 5.4, 2.6)):
        box("cap_block", (ox + x * s, oy, h / 2 * s), (w * s, 3.0 * s, h * s), mar)
        box("cap_cornice", (ox + x * s, oy, (h + 0.12) * s), ((w + 0.2) * s, 3.2 * s, 0.24 * s), mar)
        for k in range(int(w / 0.7)):  # window rows
            for z in (0.9, 2.0):
                if z < h - 0.4:
                    box("cap_win", (ox + (x - w / 2 + 0.45 + k * 0.7) * s, oy - 1.51 * s, z * s), (0.32 * s, 0.02 * s, 0.6 * s), flat("cap_glass", (0.12, 0.13, 0.16), 0.2, emit=0.0))
    for k in range(8):  # portico
        cyl((-1.75 + k * 0.5, -1.9, 1.5), 0.13, 3.0, 16)
    box("cap_pediment", (ox, oy - 1.9 * s, 3.25 * s), (4.3 * s, 0.6 * s, 0.5 * s), mar)
    for k in range(5):  # steps
        box("cap_step", (ox, oy - (2.3 + k * 0.3) * s, (0.5 - k * 0.1) * s), (4.6 * s, 0.32 * s, 0.2 * s), mar)
    cyl((0, 0, 3.8), 1.35, 1.2, 40)
    for k in range(18):
        a = k / 18 * 2 * math.pi
        cyl((1.5 * math.cos(a), 1.5 * math.sin(a), 3.9), 0.07, 1.4, 10)
    cyl((0, 0, 4.65), 1.6, 0.18, 40)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1.3 * s, location=(ox, oy, 4.75 * s))
    dome = bpy.context.object
    dome.scale.z = 1.25
    dome.data.materials.append(mar)
    bpy.ops.object.shade_smooth()
    cyl((0, 0, 6.5), 0.22, 0.7, 16)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.16 * s, location=(ox, oy, 6.95 * s))
    bpy.context.object.data.materials.append(mar)
    pole = cyl((3.2, -3.4, 2.5), 0.03, 5.0, 8)
    flag = plane("cap_flag", (ox + 3.65 * s, oy - 3.4 * s, 4.6 * s), (0.9 * s, 0.5 * s), (R(90), 0, 0), image_mat("usflag", "us_flag.png", rough=0.8))
    return dome, flag


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
    card = face_box("ins_card", (0, 0, 0), (1.5, 0.08, 2.3), (0.9, 0.9, 0.92), "logo_insurance.png")  # giant insurance card
    hinge = bpy.data.objects.new("hinge", None)
    sc.collection.objects.link(hinge)
    card.parent, card.location = hinge, (0, 0, 1.15)
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
        hinge.location = (2.6, 0.6, 0.0)  # the card wobbles, then on "unnecessary" topples flat (fall = t², small bounce)
        t = (f - DROOP) / 14
        tip = R(3) * math.sin(f / 9) if f < DROOP else -(R(90) * min(1, t * t) - (R(6) * math.sin((t - 1) * 9) * math.exp(-(t - 1) * 4) if t > 1 else 0))  # falls backwards, logo up
        hinge.rotation_euler = (tip, 0, R(-30))
        hinge.keyframe_insert("location", frame=f)
        hinge.keyframe_insert("rotation_euler", frame=f)
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
    world_hdri("studio", 0.35, 40)
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
    books = [face_box(f"book{i}", (0, 0, 0), (0.36, 0.5, 0.06), ((0.77, 0.17, 0.15), (0.11, 0.27, 0.5))[i], f"book_ae{i}.png", "+z") for i in range(2)]
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
        for i, (b, x, y, t0) in enumerate(zip(books, (-0.68, 0.74), (0.0, 0.28), (58, 66))):
            tb = min(1, max(0, (f - t0) / 7))
            b.location = (x, y, 0.07 + i * 0.002 + 2.2 * (1 - tb * tb))
            b.rotation_euler = (0, 0, math.pi + (-0.3, 0.25)[i] + (1 - tb) * 1.2)
            b.keyframe_insert("location", frame=f)
            b.keyframe_insert("rotation_euler", frame=f)
        k = ease(min(1, f / LEN))
        key_cam(cam0, f, (0.5 - 0.5 * k, -3.0 + 2.25 * k, 0.8 + 1.15 * k), (0.0, 0.3 - 0.25 * k, 0.5 - 0.5 * k), 20 + 15 * k)
    sc.camera.data.dof.use_dof = True
    sc.camera.data.dof.focus_object, sc.camera.data.dof.aperture_fstop = hero, 4.0

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


def walk_to(f, f0, f1, a, b, turn):  # Dave walks a→b between frames f0..f1, then stands
    k = min(1, max(0, (f - f0) / max(1, f1 - f0)))
    d.place((a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, 0.72 + (d.legs_walk(k * (f1 - f0) / 13 * math.pi) if 0 < k < 1 else 0)), turn)
    if not 0 < k < 1:
        d.legs_set("stand")
    return k


def pops(n, f0, f1, f):  # how many of n items have popped in by frame f (spread f0..f1)
    return int(n * min(1, max(0, (f - f0) / max(1, f1 - f0))))


if SHOT == "G":  # "on day one": a domed capitol at sunrise, tiny Dave walks up the plaza, camera cranes up to the dome
    world_hdri("golden", 1.0, 200)
    plane("plaza", (0, -8, 0), (60, 40), (0, 0, 0), pbr("plaza", K.MAN.get("concrete") or K.MAN["floor"], 4.0))
    light("sun", "SUN", (0, 0, 10), (R(68), 0, R(150)), energy=3.2, color=(1.0, 0.82, 0.62), angle=R(1.5))
    dome, flag = capitol()
    for f in range(1, LEN + 1):
        walk_to(f, 1, LEN, (0.3, -15.0), (0.2, -11.5), R(180))
        d.pose("idle")
        d.live(f, "determined")
        d.life(f)
        d.key(f)
        flag.rotation_euler = (R(90), R(4) * math.sin(f / 5), R(6) * math.sin(f / 7))
        flag.keyframe_insert("rotation_euler", frame=f)
        k = ease(f / LEN)
        key_cam(cam0, f, (1.2 - 1.2 * k, -17.5 - 3 * k, 0.45 + 4.5 * k), (0.2, -9 + 6 * k, 1.4 + 2.2 * k), 18 + 4 * k)

if SHOT == "Y":  # day one at the desk: the Medicare for All folder slides in, Dave opens it, camera tilts from paper to face
    office()
    light("sun", "SUN", (0, 0, 10), (R(55), 0, R(140)), energy=2.4, color=(1.0, 0.9, 0.78), angle=R(3))
    lamp = light("lamp", "SPOT", (-0.8, 0.6, 2.4), None, energy=500, spot_size=R(50), spot_blend=0.6, color=(1.0, 0.86, 0.66))
    folder = face_box("folder", (0, 0, 0), (0.5, 0.36, 0.03), (0.85, 0.75, 0.5), "m4a_paper.png", "+z")
    for f in range(1, LEN + 1):
        k = back_out(min(1, f / 30))
        folder.location = (1.6 - 1.6 * k, 1.25, 0.85)
        folder.rotation_euler = (0, 0, R(25) * (1 - k) + R(4))
        folder.keyframe_insert("location", frame=f)
        folder.keyframe_insert("rotation_euler", frame=f)
        aim(lamp, (0, 1.3, 0.85))
        d.place((0.0, 1.85, 0.72), R(0))
        d.legs_set("stand")
        d.pose(blend("idle", "read", ease((f - 26) / 10)))
        d.live(f, "think" if f < 60 else "determined", talking=f > 30)
        d.life(f, 0.5)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (0.5 - 0.3 * t, 0.2 - 2.4 * t, 1.6 - 0.25 * t), (0.0, 1.3 + 0.5 * t, 0.86 + 0.55 * t), 35 - 7 * t)

if SHOT == "P":  # the price: a receipt unrolls off the desk across the floor right up to the lens, Dave panics
    office()
    light("sun", "SUN", (0, 0, 10), (R(60), 0, R(160)), energy=2.0, color=(1.0, 0.93, 0.82), angle=R(3))
    light("fill", "AREA", (0, -3, 3.2), (R(30), 0, 0), energy=300, size=5)
    seg = image_mat("rc", "receipt.png", rough=0.9)
    segs = [plane(f"rc{i}", (0, 0.85 - i * 0.42, 0.04 + i * 0.0004), (0.5, 0.42), (0, 0, R(math.sin(i * 0.7) * 3)), seg if i < 17 else image_mat("rct", "receipt_total.png", rough=0.9)) for i in range(18)]
    for f in range(1, LEN + 1):
        n = pops(18, 10, LEN * 0.7, f)
        for i, o in enumerate(segs):
            sz = 1.0 if i < n else 0.001
            o.scale = (0.25, 0.21 * sz, 1)
            o.keyframe_insert("scale", frame=f)
        d.place((0.0, 1.85, 0.72), R(0))
        d.legs_set("stand")
        d.pose(blend("look", "panic", back_out((f - LEN * 0.55) / 8)))
        d.live(f, "shock" if f < LEN * 0.55 else "panic", talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (0.9, -1.0 - 4.0 * t, 0.35 + 0.5 * t), (0.0, 0.8 - 2.8 * (1 - t), 0.4 + 0.8 * t), 22 + 6 * t)

if SHOT == "B":  # the street of fifty houses: only ONE gets a SOLD sign (the 2 %)
    world_hdri("day", 0.9, 60)
    plane("road", (0, 0, 0), (8, 80), (0, 0, 0), flat("asphalt", (0.16, 0.16, 0.17), 0.8))
    plane("lawn", (0, 0, -0.01), (80, 80), (0, 0, 0), flat("grass", (0.25, 0.42, 0.18), 0.9))
    light("sun", "SUN", (0, 0, 10), (R(50), 0, R(120)), energy=3.0, color=(1.0, 0.95, 0.86), angle=R(2))
    r = random.Random(4)
    cols = [(0.86, 0.78, 0.62), (0.7, 0.8, 0.86), (0.9, 0.86, 0.8), (0.82, 0.68, 0.6), (0.76, 0.84, 0.7)]
    for i in range(50):
        side, row = (-1 if i % 2 else 1), i // 2
        x, y = side * 6.0, -6 + row * 3.2
        box("house", (x, y, 1.0), (2.6, 2.4, 2.0), flat(f"hw{i}", r.choice(cols), 0.7))
        bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=2.0, depth=1.2, location=(x, y, 2.6), rotation=(0, 0, R(45)))
        bpy.context.object.data.materials.append(flat(f"rf{i}", (0.35, 0.18, 0.15), 0.6))
    hx, hy = 6.0, -6 + 4 * 3.2  # the one house that sells (3rd on the right)
    sign = plane("sold", (hx - 1.7, hy - 1.4, 1.0), (1.0, 0.6), (R(90), 0, 0), image_mat("sold", "sold.png", rough=0.6))
    for f in range(1, LEN + 1):
        walk_to(f, 1, LEN * 0.6, (0, -9.0), (0, -5.5), R(180))
        d.pose("idle" if f < LEN * 0.72 else blend("idle", "point_l", back_out((f - LEN * 0.72) / 6)))
        d.live(f, "think" if f < LEN * 0.72 else "smug", talking=True)
        d.life(f)
        d.key(f)
        k = back_out(min(1, max(0, (f - LEN * 0.68) / 8)))
        sign.scale = (0.5 * k + 0.0005, 0.3 * k + 0.0005, 1)
        sign.keyframe_insert("scale", frame=f)
        t = ease(f / LEN)
        key_cam(cam0, f, (1.6, -13.5 + 3.0 * t, 2.6 - 0.9 * t), (0.8 + 3.0 * t, 4 - 4 * t, 1.4), 24)

if SHOT == "V":  # the Senate math: 100 desks in a half circle, lights fill seat by seat and stop far short of the 60 line
    world_hdri("studio", 0.4, 0)
    plane("floor", (0, 0, 0), (30, 30), (0, 0, 0), pbr("floor", K.MAN["floor"], 1.0))
    plane("wall", (0, 9, 4), (30, 8), (R(90), 0, 0), flat("chamber_wall", (0.55, 0.42, 0.32), 0.7))
    light("key", "AREA", (0, -2, 7), None, energy=1200, size=8, color=(1.0, 0.92, 0.8))
    desk_m, on_m = flat("sdesk", (0.32, 0.2, 0.12), 0.5), flat("lit", (0.15, 0.45, 1.0), 0.3, emit=6.0)
    lamps = []
    for i in range(100):
        row, k = i // 25, i % 25
        a = math.pi * (k + 0.5) / 25
        rad = 3.2 + row * 1.1
        x, y = -rad * math.cos(a), 2.0 + rad * math.sin(a)
        box("sdesk", (x, y, 0.4 + row * 0.25), (0.6, 0.4, 0.8), desk_m).rotation_euler = (0, 0, -a + R(90))
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.14, location=(x, y, 0.95 + row * 0.25))
        o = bpy.context.object
        o.data.materials.append(on_m)
        lamps.append(o)
    order = sorted(range(100), key=lambda i: (i % 25, i // 25))  # fill from the left wedge to the right
    box("rostrum", (0, 0.8, 0.6), (1.6, 0.6, 1.2), desk_m)
    for f in range(1, LEN + 1):
        n = pops(51, 12, LEN * 0.7, f)
        for j, i in enumerate(order):
            s = 1.0 if j < n else 0.001
            lamps[i].scale = (s, s, s)
            lamps[i].keyframe_insert("scale", frame=f)
        d.place((0, 0.2, 0.72), R(180))
        d.legs_set("stand")
        d.pose("count" if f < LEN * 0.75 else blend("count", "shrug", back_out((f - LEN * 0.75) / 6)))
        d.live(f, "think" if f < LEN * 0.75 else "neutral", talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (1.2 - 2.4 * t, -2.2 - 0.8 * t, 2.2 + 1.6 * t), (0, 3.4, 0.9), 20)

if SHOT == "A":  # the attacks: a boxing ring in the dark, one spotlight, headlines fly at Dave out of the black
    world_hdri("night", 0.05, 0)
    plane("floor", (0, 0, 0), (40, 40), (0, 0, 0), flat("arena", (0.04, 0.04, 0.05), 0.8))
    box("ring", (0, 0, 0.3), (4.4, 4.4, 0.6), flat("canvas", (0.75, 0.72, 0.66), 0.8))
    rope = flat("rope", (0.75, 0.08, 0.08), 0.4)
    for cx, cy in ((-2.1, -2.1), (2.1, -2.1), (2.1, 2.1), (-2.1, 2.1)):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.06, depth=1.4, location=(cx, cy, 1.3))
        bpy.context.object.data.materials.append(flat("post", (0.2, 0.2, 0.22), 0.3))
    for z in (1.0, 1.35, 1.7):
        for (x, y, sx, sy) in ((0, -2.1, 4.2, 0.03), (0, 2.1, 4.2, 0.03), (-2.1, 0, 0.03, 4.2), (2.1, 0, 0.03, 4.2)):
            box("rope", (x, y, z), (sx, sy, 0.03), rope)
    spot = light("spot", "SPOT", (0, -0.5, 7), (R(4), 0, 0), energy=4000, spot_size=R(28), spot_blend=0.3, color=(1.0, 0.95, 0.85))
    mats = [image_mat(f"an{i}", f"news_{i}.png", rough=0.9) for i in range(8)]
    r = random.Random(9)
    shots = []
    for k in range(16):
        o = plane(f"throw{k}", (0, 0, -5), (0.61, 0.83), (0, 0, 0), mats[k % 8])
        a = r.uniform(0, 2 * math.pi)
        shots.append((o, 14 + k * (LEN * 0.7 / 16), (8 * math.cos(a), 8 * math.sin(a), r.uniform(2, 4)), r.uniform(-3, 3)))
    for f in range(1, LEN + 1):
        for o, t0, (sx, sy, sz), sp in shots:  # fly in on a line, hit at the chest, drop to the canvas
            u = (f - t0) / 12
            if u < 0:
                o.location = (sx, sy, -5)
            elif u < 1:
                o.location = (sx * (1 - u), sy * (1 - u), sz + (1.5 - sz) * u)
            else:
                v = min(1, (u - 1) * 1.5)
                o.location = (sx * 0.08 * v, sy * 0.08 * v, 1.5 - 0.88 * v)
            o.rotation_euler = (R(90) * min(1, max(u, 0)) if u < 1 else R(0), sp * min(u, 1), sp * u * 0.3)
            o.keyframe_insert("location", frame=f)
            o.keyframe_insert("rotation_euler", frame=f)
        hit = any(0 <= (f - t0) / 12 - 1 < 0.25 for _, t0, _, _ in shots)
        d.place((0, 0, 0.6 + 0.72), R(0) + R(20) * math.sin(f / 30))
        d.legs_set("stand")
        d.pose(blend("fists", "slump", ease((f - LEN * 0.85) / 12)) if f > LEN * 0.85 else "fists")
        d.live(f, "panic" if hit else ("determined" if f < LEN * 0.85 else "sleep"))
        d.life(f)
        d.key(f)
        a = R(-25) + R(50) * ease(f / LEN)
        key_cam(cam0, f, (6.0 * math.sin(a), -6.0 * math.cos(a), 2.2 - 0.6 * ease(f / LEN)), (0, 0, 1.5), 30)

if SHOT == "D":  # Detroit: 94 school buildings, every one tested, 19 light up red (lead or copper)
    world_hdri("golden", 0.8, 300)
    plane("ground", (0, 0, 0), (80, 80), (0, 0, 0), pbr("ground", K.MAN.get("concrete") or K.MAN["floor"], 4.0))
    light("sun", "SUN", (0, 0, 10), (R(65), 0, R(220)), energy=2.6, color=(1.0, 0.84, 0.66), angle=R(2))
    d.outfit("doctor")
    r = random.Random(19)
    red = set(r.sample(range(94), 19))
    brick, ok_m, bad_m = flat("brick", (0.6, 0.3, 0.22), 0.8), flat("ok", (0.2, 0.6, 1.0), 0.3, emit=4.0), flat("bad", (1.0, 0.1, 0.05), 0.3, emit=8.0)
    drops = []
    for i in range(94):
        x, y = -9 + (i % 12) * 1.6, 2 + (i // 12) * 1.8
        box("school", (x, y, 0.4), (1.1, 0.8, 0.8), brick)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.18, location=(x, y, 1.15))
        o = bpy.context.object
        o.data.materials.append(bad_m if i in red else ok_m)
        drops.append(o)
    for f in range(1, LEN + 1):
        n = pops(94, 16, LEN * 0.75, f)
        for i, o in enumerate(drops):
            s = (1.4 if i in red else 1.0) if i < n else 0.001
            o.scale = (s, s, s)
            o.keyframe_insert("scale", frame=f)
        d.place((0.4, -1.2, 0.72), R(15))
        d.legs_set("stand")
        d.pose("read" if f < LEN * 0.8 else blend("read", "point_l", back_out((f - LEN * 0.8) / 6)))
        d.live(f, "think" if f < LEN * 0.8 else "determined", talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (1.8 - 1.2 * t, -4.5 - 3.5 * t, 1.3 + 7.0 * t), (0.4 - 1.0 * t, 0.5 + 6.0 * t, 1.3 - 0.8 * t), 26)

if SHOT == "W":  # the three walls: on the road to the capitol, walls rise one by one in front of Dave
    world_hdri("golden", 0.9, 160)
    plane("road", (0, 10, 0), (6, 60), (0, 0, 0), flat("asphalt", (0.16, 0.16, 0.17), 0.8))
    plane("lawn", (0, 10, -0.01), (90, 90), (0, 0, 0), flat("grass", (0.28, 0.42, 0.2), 0.9))
    light("sun", "SUN", (0, 0, 10), (R(70), 0, R(170)), energy=3.0, color=(1.0, 0.84, 0.64), angle=R(1.5))
    capitol(0, 34, 1.4)
    walls = [face_box(f"wall{i}", (-4.3 + i * 4.3, 4, -2), (4.0, 0.4, 2.0), c, f"wall_{n}.png") for i, (n, c) in enumerate((("60", (0.16, 0.24, 0.43)), ("money", (0.12, 0.39, 0.24)), ("half", (0.55, 0.16, 0.16))))]
    for f in range(1, LEN + 1):
        for i, w in enumerate(walls):  # each wall slams up out of the ground, a third of the shot apart
            k = back_out(min(1, max(0, (f - (14 + i * LEN * 0.22)) / 8)))  # side by side across the road, one after another
            w.location = (-4.3 + i * 4.3, 4, -1.05 + 2.05 * k)
            w.keyframe_insert("location", frame=f)
        walk_to(f, 1, 40, (-7.2, -2.5), (-6.6, 1.2), R(200))
        d.pose("idle" if f < 40 else blend("idle", "look_up", ease((f - 40) / 10)))
        d.live(f, "neutral" if f < 60 else "think")
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (-1.0 + 0.6 * t, -9.0 + 1.5 * t, 1.1 + 0.9 * t), (-1.0 + 0.8 * t, 4 + 6 * t, 1.2 + 0.8 * t), 20)

if SHOT == "Q":  # "the doctor bill goes to Washington instead of to you": the bill leaves Dave's mailbox and flies to the capitol
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
    capitol(-6, 60, 1.6)
    bill = face_box("bill", (0, 0, 0), (0.3, 0.02, 0.2), (0.95, 0.95, 0.92), "rent_bill.png")
    for f in range(1, LEN + 1):
        u = min(1, max(0, (f - LEN * 0.35) / (LEN * 0.55)))  # the bill pops out of the mailbox and arcs away
        bill.location = (1.3 - 7.3 * u, -2.0 + 62 * u * u, 1.3 + 9 * math.sin(u * math.pi) + 2 * u)
        bill.rotation_euler = (R(20) * math.sin(f / 4), R(360) * u, R(30) * math.sin(f / 6))
        bill.keyframe_insert("location", frame=f)
        bill.keyframe_insert("rotation_euler", frame=f)
        d.place((0.6, -2.4, 0.72), R(30))
        d.legs_set("stand")
        d.pose("look" if f < LEN * 0.35 else blend("look_up", "cheer", ease((f - LEN * 0.6) / 10)))
        d.live(f, "think" if f < LEN * 0.35 else ("shock" if f < LEN * 0.6 else "grin"), talking=True)
        d.life(f)
        d.key(f)
        t = ease(f / LEN)
        key_cam(cam0, f, (3.2 - 1.0 * t, -6.0 - 1.5 * t, 1.2 + 1.0 * t), (0.8 - 3 * t, -2.0 + 30 * t * t, 1.3 + 2.5 * t), 30 - 6 * t)

if SHOT == "R":  # the rent: a tiny apartment, the rent bill taped to the door, a laptop glowing red (the rent-setting program)
    world_hdri("city", 0.3, 0)
    plane("floor", (0, 0, 0), (8, 8), (0, 0, 0), pbr("floor", K.MAN["floor"], 0.8))
    wall = pbr("wall", K.MAN["wall"], 0.6, tint=(0.75, 0.78, 0.72))
    plane("back", (0, 2.5, 1.5), (8, 3), (R(90), 0, 0), wall)
    plane("side", (-2.5, 0, 1.5), (8, 3), (R(90), 0, R(90)), wall)
    box("door", (1.2, 2.47, 1.0), (0.95, 0.06, 2.05), flat("door", (0.42, 0.3, 0.2), 0.5))
    bill = plane("rent", (1.2, 2.43, 1.35), (0.3, 0.4), (R(90), 0, 0), image_mat("rent", "rent_bill.png", rough=0.8))
    box("table", (-1.3, 1.2, 0.38), (1.2, 0.8, 0.76), flat("table", (0.3, 0.22, 0.15), 0.5))
    box("lap_base", (-1.3, 1.2, 0.78), (0.5, 0.35, 0.03), flat("lap", (0.15, 0.15, 0.17), 0.3))
    lid = box("lap_lid", (-1.3, 1.37, 0.95), (0.5, 0.02, 0.34), flat("screen", (1.0, 0.15, 0.1), 0.2, emit=3.0))
    lid.rotation_euler = (R(-15), 0, 0)
    glow = light("glow", "POINT", (-1.3, 1.1, 1.0), None, energy=40, color=(1.0, 0.2, 0.1))
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

if SHOT == "T":  # the money race: two towers of cash, one bale per million — red (GOP groups, 59) vs blue (his backers, 23)
    world_hdri("night", 0.25, 0)
    plane("floor", (0, 0, 0), (60, 60), (0, 0, 0), flat("stage", (0.06, 0.06, 0.07), 0.3, coat=0.6))
    cash = image_mat("cash", "banknote.png", rough=0.7)
    reds = [box("rb", (-1.6, 2, 0.13 + i * 0.27), (0.62, 0.34, 0.26), cash) for i in range(59)]
    blues = [box("bb", (1.6, 2, 0.13 + i * 0.27), (0.62, 0.34, 0.26), cash) for i in range(23)]
    box("red_base", (-1.6, 2, 0.02), (1.2, 1.0, 0.04), flat("redb", (0.9, 0.1, 0.1), 0.3, emit=3.0))
    box("blue_base", (1.6, 2, 0.02), (1.2, 1.0, 0.04), flat("blueb", (0.1, 0.35, 1.0), 0.3, emit=3.0))
    light("red", "SPOT", (-1.6, -1, 18), None, energy=6000, spot_size=R(18), color=(1.0, 0.45, 0.4))
    light("blue", "SPOT", (1.6, -1, 10), None, energy=2500, spot_size=R(25), color=(0.5, 0.65, 1.0))
    for o in bpy.data.objects:
        if o.name.startswith(("red", "blue")) and o.type == "LIGHT":
            aim(o, (o.location.x, 2, 0))
    for f in range(1, LEN + 1):
        nr, nb = pops(59, 20, LEN * 0.45, f), pops(23, LEN * 0.6, LEN * 0.8, f)  # red first, then blue (the "have a guess" beat)
        for i, o in enumerate(reds):
            o.scale = (0.31, 0.17, 0.13) if i < nr else (0.0001,) * 3
            o.keyframe_insert("scale", frame=f)
        for i, o in enumerate(blues):
            o.scale = (0.31, 0.17, 0.13) if i < nb else (0.0001,) * 3
            o.keyframe_insert("scale", frame=f)
        d.place((0, 0.6, 0.72), R(0))
        d.legs_set("stand")
        d.pose("look_up" if f < LEN * 0.6 else blend("look_up", "shrug", ease((f - LEN * 0.82) / 8)))
        d.live(f, "shock" if f < LEN * 0.6 else "neutral", talking=True)
        d.life(f)
        d.key(f)
        m = ease(min(1, max(0, (f - LEN * 0.55) / (LEN * 0.12))))  # camera glides from the red top down to the blue tower
        top = (0.13 + nr * 0.27) * (1 - m) + (0.13 + max(nb, 6) * 0.27) * m
        t = ease(f / LEN)
        key_cam(cam0, f, (0.4, -6.5 - 4 * ease(min(1, f / (LEN * 0.45))), 1.0 + 0.5 * top), (0, 2, 0.6 + 0.6 * top), 24)

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
if SHOT not in ("H", "N", "G", "B", "D", "W", "V"):  # wide shots and H, N: no shallow focus on the falling cash, not on Dave
    dof(cam0, d.head, 2.8)
sc.render.image_settings.file_format, sc.render.image_settings.quality = "JPEG", 90
sc.frame_start, sc.frame_end = 1, LEN
for f in FRAMES:
    sc.frame_set(f)
    sc.render.filepath = os.path.join(K.OUT, f"{SHOT}_{f:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", SHOT, f, flush=True)
