"""prices46 — TILT-SHIFT MINIATURE time-lapse (format test F6, owner 10 Nov): "What if prices doubled every single day?"
A painted-wood toy town (Budapest 1946) shot macro with very shallow depth of field, played back at 12 fps like a
real tilt-shift time-lapse. No Dave. Numbers live physically in the set (price board, banknotes).
blender -b -P blender/prices46.py -- --assets A --tex T --out O --frames "A:1-28" --samples 16 --res 900x1600
Shots A..K = beats b01..b11. Frame count per shot = blender/prices46_lens.json (from the voice), default 48."""
import sys, os, math, json, random
import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import K, R, setup, flat, box, plane, text3d, cam, finish, nodes_mat  # noqa: E402

args = setup(sys.argv[sys.argv.index("--") + 1:])
SHOT, rng = args.get("--frames", "A:1-4").split(":")
a, b = (rng.split("-") + [rng])[:2]
FR = range(int(a), int(b) + 1)
LENS = {}
lp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prices46_lens.json")
if os.path.exists(lp):
    LENS = json.load(open(lp))
N = int(LENS.get(SHOT, 48))
sc = K.sc
sc.cycles.samples = int(args.get("--samples", "16"))
COL = bpy.data.collections.new("town")
sc.collection.children.link(COL)
rnd = random.Random(46)

# ---------------------------------------------------------------- materials (painted wood / toy plastic)
def paint(name, rgb, rough=0.42, coat=0.35):
    return flat(name, rgb, rough, coat)


PASTEL = [(0.86, 0.62, 0.45), (0.93, 0.83, 0.55), (0.62, 0.78, 0.74), (0.88, 0.55, 0.52), (0.72, 0.68, 0.86), (0.95, 0.9, 0.8), (0.58, 0.72, 0.52)]
M_ROOF = paint("roof", (0.55, 0.18, 0.12))
M_WIN = flat("win", (1.0, 0.78, 0.42), 0.3, 0.0, emit=0.0)
M_DARK = paint("dark", (0.12, 0.11, 0.1))
M_CREAM = paint("cream", (0.96, 0.92, 0.82))
M_RED = paint("red", (0.82, 0.12, 0.1))
M_GOLD = flat("gold", (1.0, 0.72, 0.22), 0.22, 0.6)
M_BREAD = paint("bread", (0.72, 0.42, 0.16), 0.6, 0.1)
M_SIGN = flat("signtxt", (1.0, 0.95, 0.8), 0.4, 0.0, emit=1.6)
M_WOOD = paint("wood", (0.45, 0.28, 0.15), 0.6, 0.1)


def cobbles():
    m, n, l, p = nodes_mat("cobble")
    tc, vo, ramp, bump = n.new("ShaderNodeTexCoord"), n.new("ShaderNodeTexVoronoi"), n.new("ShaderNodeValToRGB"), n.new("ShaderNodeBump")
    vo.feature = "DISTANCE_TO_EDGE"
    vo.inputs["Scale"].default_value = 70
    l.new(tc.outputs["Object"], vo.inputs["Vector"])
    ramp.color_ramp.elements[0].position, ramp.color_ramp.elements[1].position = 0.0, 0.08
    ramp.color_ramp.elements[0].color, ramp.color_ramp.elements[1].color = (0.18, 0.16, 0.14, 1), (0.5, 0.46, 0.4, 1)
    l.new(vo.outputs["Distance"], ramp.inputs["Fac"])
    l.new(ramp.outputs["Color"], p.inputs["Base Color"])
    bump.inputs["Strength"].default_value = 0.6
    l.new(vo.outputs["Distance"], bump.inputs["Height"])
    l.new(bump.outputs["Normal"], p.inputs["Normal"])
    p.inputs["Roughness"].default_value = 0.8
    return m


def note_mat(name, file):
    m, n, l, p = nodes_mat(name)
    t = n.new("ShaderNodeTexImage")
    t.image = bpy.data.images.load(os.path.join(K.T, file))
    l.new(t.outputs["Color"], p.inputs["Base Color"])
    p.inputs["Roughness"].default_value = 0.75
    return m


M_NOTE = note_mat("note", "pengo_note.png")
M_NOTE_BIG = note_mat("note_big", "pengo_big.png")

# ---------------------------------------------------------------- sky (procedural, sun drives day/night)
world = bpy.data.worlds.new("sky")
sc.world = world
world.use_nodes = True
wn, wl = world.node_tree.nodes, world.node_tree.links
SKY = wn.new("ShaderNodeTexSky")
SKY.sky_type = "NISHITA"
SKY.sun_disc = False
wl.new(SKY.outputs["Color"], wn["Background"].inputs["Color"])
BG = wn["Background"]
sun = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
sc.collection.objects.link(sun)
sun.data.angle = R(3)
moon = bpy.data.objects.new("moon", bpy.data.lights.new("moon", "SUN"))
sc.collection.objects.link(moon)
moon.data.color = (0.55, 0.65, 1.0)
moon.rotation_euler = (R(40), 0, R(150))


def daytime(t):
    """t in [0,1): 0 = sunrise, 0.5 = sunset. Sets sun, sky, window lights."""
    ang = t * 2 * math.pi
    elev = math.sin(ang) * 55
    SKY.sun_elevation = R(max(-8, elev))
    SKY.sun_rotation = R(120 + t * 140)
    sun.rotation_euler = (R(90 - max(2, elev)), 0, R(120 + t * 140))
    day = max(0.0, min(1.0, (elev + 6) / 20))
    sun.data.energy = 4.2 * day
    sun.data.color = (1.0, 0.72 + 0.2 * day, 0.5 + 0.38 * day)
    BG.inputs["Strength"].default_value = 0.05 + 0.35 * day
    moon.data.energy = 0.35 * (1 - day)
    M_WIN.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 6.0 * (1 - day) + 0.3
    return day


# ---------------------------------------------------------------- the town
plane("square", (0, 0, 0), (6, 6), (0, 0, 0), cobbles(), COL)
plane("pavement", (0, 0.72, 0.004), (6, 0.36), (0, 0, 0), paint("pave", (0.7, 0.66, 0.6), 0.8, 0), COL)


def house(x, y, w, d, h, rgb, rz=0.0, door=True):
    g = bpy.data.objects.new(f"house{x:.2f}", None)
    COL.objects.link(g)
    body = box("b", (0, 0, h / 2), (w, d, h), paint(f"f{x:.2f}", rgb), COL)
    roof = box("r", (0, 0, h + d * 0.18), (w * 1.04, d * 0.72, d * 0.72), M_ROOF, COL)
    roof.rotation_euler = (R(45), 0, 0)
    roof.scale.z *= 0.55
    for o in (body, roof):
        o.parent = g
    rows = max(1, int(h / 0.16))
    cols = max(1, int(w / 0.1))
    for r in range(rows):
        for c in range(cols):
            if door and r == 0 and c == cols // 2:
                dd = box("door", ((c + 0.5) * w / cols - w / 2, -d / 2 - 0.001, 0.045), (0.04, 0.004, 0.09), M_DARK, COL)
                dd.parent = g
                continue
            wnd = box("w", ((c + 0.5) * w / cols - w / 2, -d / 2 - 0.001, 0.07 + r * 0.16), (0.035, 0.004, 0.05), M_WIN, COL)
            wnd.parent = g
    g.location, g.rotation_euler = (x, y, 0), (0, 0, rz)
    return g


xs = [-1.05, -0.68, 0.68, 1.05, 1.42, -1.42]
for i, x in enumerate(xs):
    house(x, 1.05, 0.34, 0.36, 0.48 + (i % 3) * 0.12, PASTEL[i % len(PASTEL)])
for i, y in enumerate([0.55, 0.1, -0.35]):
    house(-1.55, y, 0.34, 0.4, 0.42 + (i % 2) * 0.14, PASTEL[(i + 3) % len(PASTEL)], R(-90))
    house(1.55, y, 0.34, 0.4, 0.46 + (i % 2) * 0.1, PASTEL[(i + 5) % len(PASTEL)], R(90))
# bakery (centre back)
bak = house(0, 1.05, 0.92, 0.4, 0.62, (0.96, 0.9, 0.78), door=False)
for i in range(11):
    aw = box("awning", (-0.42 + i * 0.084, 0.8, 0.27), (0.084, 0.12, 0.012), M_RED if i % 2 else M_CREAM, COL)
    aw.rotation_euler = (R(-24), 0, 0)
box("bdoor", (0, 0.849, 0.06), (0.1, 0.004, 0.12), M_DARK, COL)
box("shopwin_l", (-0.25, 0.849, 0.09), (0.22, 0.004, 0.12), M_WIN, COL)
box("shopwin_r", (0.25, 0.849, 0.09), (0.22, 0.004, 0.12), M_WIN, COL)
board = box("board", (0, 0.84, 0.43), (0.8, 0.02, 0.2), M_DARK, COL)
SIGN_HDR = text3d("BREAD", (0, 0.826, 0.47), (R(90), 0, 0), 0.06, M_SIGN, COL, extrude=0.004)
PRICE = text3d("1", (0, 0.826, 0.355), (R(90), 0, 0), 0.085, flat("price", (1.0, 0.85, 0.3), 0.4, 0, emit=2.4), COL, extrude=0.004)
banner = box("banner", (0, 0.2, 0.62), (1.6, 0.004, 0.11), M_CREAM, COL)
BAN_T = text3d("BUDAPEST 1946", (0, 0.197, 0.595), (R(90), 0, 0), 0.06, paint("bantxt", (0.2, 0.15, 0.12)), COL, extrude=0.002)
for x in (-0.8, 0.8):
    box("pole", (x, 0.2, 0.33), (0.012, 0.012, 0.66), M_WOOD, COL)

# tiny people
SKIN = [(0.95, 0.78, 0.62), (0.85, 0.65, 0.5), (0.7, 0.5, 0.36)]
CLOTH = [(0.2, 0.25, 0.45), (0.5, 0.15, 0.12), (0.25, 0.35, 0.22), (0.35, 0.3, 0.28), (0.15, 0.15, 0.15), (0.6, 0.5, 0.3)]
PEOPLE = []
for i in range(40):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.011, depth=0.045, location=(0, 0, 0.0225), vertices=12)
    bd = bpy.context.object
    bd.data.materials.append(paint(f"c{i}", CLOTH[i % len(CLOTH)]))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.0095, location=(0, 0, 0.054), segments=12, ring_count=8)
    hd = bpy.context.object
    hd.data.materials.append(paint(f"s{i}", SKIN[i % 3]))
    g = bpy.data.objects.new(f"p{i}", None)
    COL.objects.link(g)
    for o in (bd, hd):
        o.parent = g
        if o.users_collection[0] != COL:
            for c in o.users_collection:
                c.objects.unlink(o)
            COL.objects.link(o)
    if i % 5 == 0:  # broom for sweepers
        bpy.ops.mesh.primitive_cylinder_add(radius=0.002, depth=0.07, location=(0.014, -0.01, 0.03), rotation=(R(-35), 0, 0))
        br = bpy.context.object
        br.data.materials.append(M_WOOD)
        br.parent = g
        br.hide_render = True
        g["broom"] = br.name
    PEOPLE.append(g)

# props
LOAF = bpy.data.objects.new("loaf", None)
COL.objects.link(LOAF)
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.05, location=(0, 0, 0.03))
lo = bpy.context.object
lo.scale = (1.6, 0.8, 0.6)
lo.data.materials.append(M_BREAD)
lo.parent = LOAF
table = box("table", (0, 0, -0.01), (0.34, 0.2, 0.02), M_WOOD, COL)
table.parent = LOAF
COINS = []
for i in range(9):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.022, depth=0.006, location=(0.11, 0.0, 0.003 + i * 0.0065), vertices=32)
    cn = bpy.context.object
    cn.data.materials.append(M_GOLD)
    cn.parent = LOAF
    COINS.append(cn)
LOAF.location = (0, 0.55, 0.0)

BIG = plane("bignote", (0, 0.05, 0.003), (2.3, 1.0), (0, 0, R(-4)), M_NOTE_BIG, COL)
NOTES = []
for i in range(260):
    nt = plane(f"n{i}", (0, 0, 0), (0.07, 0.034), (0, 0, 0), M_NOTE, COL)
    NOTES.append(nt)
FACT = box("factory", (-1.25, -0.9, 0.18), (0.6, 0.4, 0.36), paint("fac", (0.42, 0.36, 0.32)), COL)
FACT_T = text3d("FACTORY", (-1.25, -1.101, 0.25), (R(90), 0, 0), 0.05, M_CREAM, COL, extrude=0.002)
BARROWS = []
for i in range(4):
    g = bpy.data.objects.new(f"barrow{i}", None)
    COL.objects.link(g)
    tub = box("tub", (0, 0, 0.03), (0.07, 0.05, 0.03), M_WOOD, COL)
    tub.parent = g
    bpy.ops.mesh.primitive_cylinder_add(radius=0.012, depth=0.006, location=(0.04, 0, 0.012), rotation=(R(90), 0, 0))
    wh = bpy.context.object
    wh.data.materials.append(M_DARK)
    wh.parent = g
    BARROWS.append(g)
# balance scale
SCALE = bpy.data.objects.new("scale", None)
COL.objects.link(SCALE)
for o in (box("post", (0, 0, 0.2), (0.02, 0.02, 0.4), M_GOLD, COL), box("beam", (0, 0, 0.4), (0.9, 0.015, 0.015), M_GOLD, COL),
          box("panL", (-0.42, 0, 0.25), (0.16, 0.16, 0.008), M_GOLD, COL), box("panR", (0.42, 0, 0.25), (0.16, 0.16, 0.008), M_GOLD, COL)):
    o.parent = SCALE
bpy.ops.mesh.primitive_cylinder_add(radius=0.03, depth=0.008, location=(-0.42, 0, 0.26), vertices=32)
c1 = bpy.context.object
c1.data.materials.append(M_GOLD)
c1.parent = SCALE
SCALE.location = (0, 0.3, 0)

ALL_OPT = [BIG, FACT, FACT_T, SCALE, LOAF] + NOTES + BARROWS


def hide(o, h=True):
    for x in [o] + list(o.children_recursive):
        x.hide_render = h


def set_text(o, s):
    o.data.body = s


def fmt(v):
    return f"{v:,}".replace(",", " ")


# ---------------------------------------------------------------- cameras (tilt-shift: high angle, long lens, razor DOF)
def tilt(loc, target, lens, fstop, focus):
    c = cam("c", loc, target, lens)
    c.data.dof.use_dof = True
    e = bpy.data.objects.new("focus", None)
    COL.objects.link(e)
    e.location = focus
    c.data.dof.focus_object = e
    c.data.dof.aperture_fstop = fstop
    c.data.sensor_width = 36
    return c


def place_people(k, mode, t):
    for i, p in enumerate(PEOPLE):
        p.hide_render = False
        br = p.get("broom")
        if br:
            bpy.data.objects[br].hide_render = mode != "sweep"
        r = random.Random(i * 97 + k * (0 if mode == "queue" else 1))
        if mode == "wander":
            p.location = (r.uniform(-1.2, 1.2), r.uniform(-0.9, 0.55), 0)
        elif mode == "queue":  # line from the bakery door, shuffles a little each frame (time-lapse)
            j = (i + k // 3) % 40
            p.location = (0.03 * math.sin(j * 1.7) + 0.002 * r.random(), 0.75 - j * 0.045, 0)
        elif mode == "run":  # factory → bakery, staggered
            u = max(0.0, min(1.0, t * 1.6 - i / 60))
            p.location = (-1.0 + u * 1.0 + 0.04 * math.sin(i), -0.75 + u * 1.4 - (i % 6) * 0.03, 0)
        elif mode == "sweep":
            if i % 5:
                p.hide_render = True
            else:
                p.location = (-0.9 + (i // 5) * 0.25, -0.4 + 0.05 * math.sin(i), 0)
                p.location.x += t * 0.25
        elif mode == "on_note":
            p.location = (r.uniform(-1.0, 1.0) + 0.02 * k * (1 if i % 2 else -1) * 0.1, r.uniform(-0.4, 0.4), 0.004)
        elif mode == "none":
            p.hide_render = True
        p.rotation_euler = (0, 0, r.uniform(0, 6.28))


def notes_pile(n, cx, cy, rad, h):
    """first n loose notes stacked into a cone at (cx, cy)"""
    for i, nt in enumerate(NOTES):
        if i >= n:
            nt.hide_render = True
            continue
        r = random.Random(i)
        q = i / max(1, n)
        rr = rad * (1 - q) * math.sqrt(r.random())
        a = r.uniform(0, 6.28)
        nt.hide_render = False
        nt.location = (cx + rr * math.cos(a), cy + rr * math.sin(a), 0.004 + q * h)
        nt.rotation_euler = (r.uniform(-0.3, 0.3), r.uniform(-0.3, 0.3), r.uniform(0, 6.28))


def shot(s, k):
    t = k / max(1, N - 1)
    for o in ALL_OPT:
        hide(o)
    BIG.hide_render = True
    set_text(BAN_T, "BUDAPEST 1946")
    if s in "AK":  # hook + loop: wide square, price doubles each "day" (1 day = 6 frames)
        d = k // 6 if s == "A" else 0
        daytime((k % 6) / 6 * 0.9 + 0.05 if s == "A" else 0.25)
        set_text(PRICE, fmt(2 ** d))
        place_people(k, "wander", t)
        return tilt((0.25, -2.1, 1.55), (0, 0.55, 0.2), 70, 1.2, (0, 0.84, 0.4))
    if s == "B":  # establishing: banner BUDAPEST 1946, dusk, slow push
        daytime(0.42)
        set_text(PRICE, "1")
        place_people(k, "wander", t)
        return tilt((0.9 - t * 0.3, -2.6 + t * 0.4, 2.0 - t * 0.2), (0, 0.3, 0.3), 60, 1.4, (0, 0.2, 0.6))
    if s == "C":  # price board triples each day (5 frames a day)
        d = k // 5
        daytime((k % 5) / 5)
        set_text(PRICE, fmt(3 ** d))
        place_people(k, "queue", t)
        return tilt((0.12, -0.35, 0.55), (0, 0.84, 0.4), 85, 0.9, (0, 0.84, 0.4))
    if s == "D":  # one loaf: 1 coin this morning, 3 coins tomorrow
        hide(LOAF, False)
        ncoin = 1 if t < 0.5 else 3
        for i, cn in enumerate(COINS):
            cn.hide_render = i >= ncoin
        daytime(0.12 if t < 0.5 else 0.15)
        place_people(k, "none", t)
        return tilt((0.25, 0.05, 0.25), (0.03, 0.55, 0.02), 90, 0.7, (0.06, 0.55, 0.03))
    if s == "E":  # payday: workers run from the factory to the bakery queue
        hide(FACT, False)
        FACT_T.hide_render = False
        daytime(0.2)
        set_text(PRICE, fmt(3 ** 9))
        place_people(k, "run", t)
        return tilt((-0.2, -2.3, 1.75), (-0.4, 0.0, 0.1), 60, 1.3, (-0.5, -0.2, 0.05))
    if s == "F":  # the banknote with twenty zeros lies across the square
        BIG.hide_render = False
        daytime(0.25)
        place_people(k, "on_note", t)
        return tilt((0.1, -1.2 - t * 0.2, 2.2), (0, 0.05, 0), 55, 1.6, (0, 0.05, 0))
    if s == "G":  # still not enough: barrows + a growing mountain of notes
        for i, g in enumerate(BARROWS):
            hide(g, False)
            g.location = (-0.6 + i * 0.4, -0.35, 0)
        notes_pile(int(30 + t * 220), 0, 0.2, 0.45, 0.22 + t * 0.18)
        daytime(0.3)
        place_people(k, "wander", t)
        return tilt((0.3, -1.9, 1.3), (0, 0.2, 0.15), 70, 1.1, (0, 0.2, 0.15))
    if s == "H":  # thrown away: notes rain from the windows
        daytime(0.35)
        for i, nt in enumerate(NOTES):
            r = random.Random(i)
            x0, y0, z0 = r.uniform(-1.3, 1.3), r.uniform(-0.2, 0.9), r.uniform(0.4, 1.4)
            z = z0 - (t + r.random()) % 1 * 1.4
            nt.hide_render = False
            nt.location = (x0 + 0.08 * math.sin(z * 9 + i), y0, max(0.004, z))
            nt.rotation_euler = (z * 3 + i, z * 2, i)
        place_people(k, "wander", t)
        return tilt((0.2, -2.0, 1.2), (0, 0.4, 0.35), 65, 1.2, (0, 0.6, 0.35))
    if s == "I":  # 1 new coin = a 4 with 29 zeros of old notes (balanced scale)
        hide(SCALE, False)
        notes_pile(240, 0.42, 0.3, 0.09, 0.32)
        for nt in NOTES[:240]:
            nt.location.z += 0.25
        daytime(0.25)
        place_people(k, "none", t)
        return tilt((0.05 + t * 0.06, -1.25, 0.6), (0, 0.3, 0.35), 70, 1.1, (-0.42, 0.3, 0.27))
    if s == "J":  # street cleaners sweep the worthless notes like leaves
        daytime(0.55 + t * 0.06)
        for i, nt in enumerate(NOTES):
            r = random.Random(i)
            x, y = r.uniform(-1.1, 1.1), r.uniform(-0.7, 0.4)
            pile = (-0.9 + (i % 4) * 0.25 + t * 0.25 + 0.05, -0.4)
            u = max(0.0, min(1.0, t * 1.4 - r.random() * 0.4)) if x < pile[0] + 0.05 else 0
            nt.hide_render = False
            nt.location = (x + (pile[0] + 0.03 - x) * u, y + (pile[1] - y) * u, 0.004 + u * 0.01 * r.random())
            nt.rotation_euler = (0, 0, r.uniform(0, 6.28))
        place_people(k, "sweep", t)
        return tilt((-0.3 + t * 0.2, -1.6, 0.8), (-0.2, -0.3, 0.02), 75, 0.9, (-0.5 + t * 0.25, -0.4, 0.02))
    raise SystemExit(f"unknown shot {s}")


finish(bloom=True)
for k in FR:
    if k > N:
        break
    c = shot(SHOT, k - 1)
    sc.camera = c
    st = sc.render.image_settings
    st.file_format, st.color_mode, st.quality = "JPEG", "RGB", 92
    sc.render.film_transparent = False
    sc.render.filepath = os.path.join(K.OUT, f"{SHOT}_{k:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", SHOT, k, flush=True)
    bpy.data.objects.remove(c)
