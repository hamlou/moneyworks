"""bank70 — INK SKETCHBOOK (format test F3, owner 10 Nov): "What if every bank closed for six months?" (Ireland 1970)
Pen-and-ink look: Freestyle lines with a wobbling noise (re-seeded every frame = hand-drawn "line boil"), flat
watercolour washes (shadeless), cream paper. Played at 12 fps. Paper grain is overlaid in Remotion.
blender -b -P blender/bank70.py -- --assets A --tex T --out O --frames "A:1-20" --samples 8 --res 900x1600
Shots A..L = beats b01..b12. Frames per shot = blender/bank70_lens.json (from the voice), default 40."""
import sys, os, math, json, random
import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import K, R, setup, box, plane, text3d, cam, nodes_mat  # noqa: E402

args = setup(sys.argv[sys.argv.index("--") + 1:])
SHOT, rng = args.get("--frames", "A:1-4").split(":")
a, b = (rng.split("-") + [rng])[:2]
FR = range(int(a), int(b) + 1)
lp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bank70_lens.json")
N = int((json.load(open(lp)) if os.path.exists(lp) else {}).get(SHOT, 40))
sc = K.sc
sc.cycles.samples = int(args.get("--samples", "8"))
sc.cycles.use_denoising = False
sc.view_settings.view_transform = "Standard"
sc.view_settings.look = "None"
COL = bpy.data.collections.new("ink")
sc.collection.children.link(COL)
TXT = bpy.data.collections.new("txt")  # lettering: solid ink, no Freestyle outline (outlines smeared it)
sc.collection.children.link(TXT)
PAPER = (0.96, 0.93, 0.86)

world = bpy.data.worlds.new("paper")
sc.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (*PAPER, 1)
world.node_tree.nodes["Background"].inputs["Strength"].default_value = 1.0


# ---------------------------------------------------------------- washes (shadeless watercolour)
def wash(name, rgb, k=0.55):
    """flat colour pulled towards the paper, with a blotchy noise like a watercolour wash"""
    m, n, l, p = nodes_mat(name)
    for x in list(n):
        if x.type == "BSDF_PRINCIPLED":
            n.remove(x)
    out = n["Material Output"]
    em, noise, mix = n.new("ShaderNodeEmission"), n.new("ShaderNodeTexNoise"), n.new("ShaderNodeMix")
    noise.inputs["Scale"].default_value = 3.0
    noise.inputs["Detail"].default_value = 3.0
    mix.data_type = "RGBA"
    c = tuple(PAPER[i] + (rgb[i] - PAPER[i]) * k for i in range(3))
    c2 = tuple(PAPER[i] + (rgb[i] - PAPER[i]) * k * 0.6 for i in range(3))
    mix.inputs["A"].default_value, mix.inputs["B"].default_value = (*c, 1), (*c2, 1)
    l.new(noise.outputs["Fac"], mix.inputs["Factor"])
    l.new(mix.outputs["Result"], em.inputs["Color"])
    l.new(em.outputs["Emission"], out.inputs["Surface"])
    return m


W_WHITE = wash("white", PAPER, 0)
W_STONE = wash("stone", (0.62, 0.62, 0.66))
W_GREEN = wash("green", (0.2, 0.55, 0.32))
W_RED = wash("red", (0.82, 0.2, 0.16), 0.7)
W_BROWN = wash("brown", (0.45, 0.3, 0.18))
W_GOLD = wash("gold", (0.95, 0.7, 0.2), 0.7)
W_BLUE = wash("blue", (0.25, 0.38, 0.62))
W_INK = wash("ink", (0.08, 0.08, 0.12), 1.0)
W_SKIN = wash("skin", (0.92, 0.72, 0.58))
W_CLOTH = [wash(f"cl{i}", c) for i, c in enumerate([(0.2, 0.3, 0.55), (0.6, 0.2, 0.15), (0.3, 0.45, 0.25), (0.4, 0.35, 0.3), (0.15, 0.15, 0.2)])]


# ---------------------------------------------------------------- ink lines (Freestyle, wobbling)
sc.render.use_freestyle = True
sc.render.line_thickness_mode = "ABSOLUTE"
sc.render.line_thickness = 3.2 * K.W / 1080
fs = bpy.context.view_layer.freestyle_settings
for ls in list(fs.linesets):
    fs.linesets.remove(ls)
LS = fs.linesets.new("ink")
LS.select_silhouette, LS.select_border, LS.select_crease, LS.select_contour = True, True, True, True
LS.select_external_contour = True
LS.select_by_collection, LS.collection, LS.collection_negation = True, TXT, "EXCLUSIVE"
ST = LS.linestyle
ST.color = (0.07, 0.08, 0.14)
ST.thickness = 3.4 * K.W / 1080
ST.caps = "ROUND"
NOISE = ST.geometry_modifiers.new(name="wobble", type="PERLIN_NOISE_1D")
NOISE.frequency, NOISE.amplitude, NOISE.octaves = 12, 2.4 * K.W / 1080, 2
ST.geometry_modifiers.new(name="over", type="BACKBONE_STRETCHER").backbone_length = 6 * K.W / 1080
th = ST.thickness_modifiers.new(name="pen", type="ALONG_STROKE")
th.blend, th.value_min, th.value_max = "MULTIPLY", 0.45, 1.25
th.mapping = "CURVE"
far = ST.thickness_modifiers.new(name="far", type="DISTANCE_FROM_CAMERA")
far.range_min, far.range_max, far.value_min, far.value_max, far.blend = 2.0, 16.0, 1.0, 0.35, "MULTIPLY"


def boil(k):
    """hand-drawn line boil: new noise seed every 2 frames (12 fps drawings)"""
    NOISE.seed = 1 + (k // 2) * 7


# ---------------------------------------------------------------- builders
def grp(name):
    g = bpy.data.objects.new(name, None)
    COL.objects.link(g)
    return g


def kid(g, o):
    o.parent = g
    return o


def B(name, loc, size, mat, g=None):
    o = box(name, loc, size, mat, COL)
    return kid(g, o) if g else o


def T(body, loc, size, mat=W_INK, g=None, rot=(R(90), 0, 0), ex=0.02):
    o = text3d(body, loc, rot, size, mat, TXT, extrude=ex)
    return kid(g, o) if g else o


plane("ground", (0, 0, 0), (60, 60), (0, 0, 0), W_WHITE, COL)

# bank facade
BANK = grp("bank")
B("steps", (0, -0.3, 0.1), (4.4, 0.8, 0.2), W_STONE, BANK)
B("body", (0, 0.6, 1.9), (4.0, 1.2, 3.6), W_STONE, BANK)
B("pediment", (0, 0.0, 3.9), (4.3, 0.3, 0.5), W_STONE, BANK)
for i in range(5):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.16, depth=3.2, location=(-1.6 + i * 0.8, -0.2, 1.8), vertices=16)
    c = bpy.context.object
    c.data.materials.append(W_WHITE)
    kid(BANK, c)
DOOR_L = B("doorL", (-0.36, -0.01, 1.05), (0.7, 0.06, 1.9), W_BROWN, BANK)
DOOR_R = B("doorR", (0.36, -0.01, 1.05), (0.7, 0.06, 1.9), W_BROWN, BANK)
T("BANK", (0, -0.16, 3.72), 0.5, W_INK, BANK)
CLOSED = grp("closed")
B("csign", (0, -0.12, 1.25), (1.1, 0.04, 0.42), W_WHITE, CLOSED)
T("CLOSED", (0, -0.15, 1.12), 0.24, W_RED, CLOSED)
bpy.ops.mesh.primitive_torus_add(major_radius=0.12, minor_radius=0.03, location=(0, -0.12, 0.8), rotation=(R(90), 0, 0))
kid(CLOSED, bpy.context.object).data.materials.append(W_GOLD)
CLOSED.parent = BANK
BANK.location = (0, 3, 0)

# pub
PUB = grp("pub")
B("pbody", (0, 0.5, 1.4), (3.2, 1.0, 2.8), W_GREEN, PUB)
B("proof", (0, 0.5, 2.95), (3.4, 1.2, 0.3), W_INK, PUB)
B("pdoor", (0, -0.01, 0.8), (0.8, 0.06, 1.6), W_RED, PUB)
B("pwinL", (-1.0, -0.01, 1.3), (0.8, 0.04, 0.9), W_GOLD, PUB)
B("pwinR", (1.0, -0.01, 1.3), (0.8, 0.04, 0.9), W_GOLD, PUB)
B("pboard", (0, -0.06, 2.3), (2.6, 0.06, 0.5), W_INK, PUB)
PUB_T = T("THE PUB", (0, -0.1, 2.14), 0.34, W_GOLD, PUB)
PUB.location = (0, 3, 0)

# pub interior: bar counter + barman + cheque + cash
BAR = grp("bar")
B("counter", (0, 0.2, 0.55), (3.2, 0.7, 1.1), W_BROWN, BAR)
B("top", (0, 0.2, 1.12), (3.3, 0.8, 0.06), W_BROWN, BAR)
for i in range(6):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=0.32, location=(-1.2 + i * 0.48, 1.6, 1.7), vertices=12)
    kid(BAR, bpy.context.object).data.materials.append(W_GOLD if i % 2 else W_GREEN)
B("shelf", (0, 1.65, 1.52), (3.2, 0.3, 0.04), W_BROWN, BAR)
CHEQUE = B("cheque", (0.2, -0.05, 1.16), (0.7, 0.32, 0.01), W_WHITE, BAR)
CASH = grp("cash")
for i in range(4):
    B(f"note{i}", (0.0, 0.0, i * 0.012), (0.55, 0.26, 0.01), W_GREEN, CASH)
CASH.parent = BAR
BAR.location = (0, 2, 0)


def person(i, mat=None):
    g = grp(f"man{i}")
    bpy.ops.mesh.primitive_cylinder_add(radius=0.22, depth=1.0, location=(0, 0, 0.5), vertices=14)
    kid(g, bpy.context.object).data.materials.append(mat or W_CLOTH[i % len(W_CLOTH)])
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.2, location=(0, 0, 1.25), segments=14, ring_count=8)
    kid(g, bpy.context.object).data.materials.append(W_SKIN)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.12, location=(0, 0, 1.42), vertices=14)  # flat cap (1970 Ireland)
    kid(g, bpy.context.object).data.materials.append(W_CLOTH[(i + 2) % len(W_CLOTH)])
    return g


MEN = [person(i) for i in range(18)]
PLACARDS = []
for i in range(4):
    g = grp(f"plac{i}")
    B("stick", (0, 0, 0.9), (0.05, 0.05, 1.8), W_BROWN, g)
    B("board", (0, -0.03, 1.9), (0.9, 0.04, 0.55), W_WHITE, g)
    T("ON STRIKE", (0, -0.06, 1.8), 0.16, W_RED, g)
    PLACARDS.append(g)

# scrap-paper cheques (beer mat, napkin, cigarette box, envelope)
SCRAPS = []
for i, (sz, mat, label) in enumerate([((0.6, 0.6, 0.02), W_GOLD, "PAY £5"), ((0.8, 0.8, 0.01), W_WHITE, "PAY £12"), ((0.5, 0.9, 0.18), W_RED, "PAY £3"), ((0.9, 0.5, 0.01), W_BLUE, "PAY £20")]):
    g = grp(f"scrap{i}")
    B("s", (0, 0, sz[2] / 2), sz, mat, g)
    T(label, (0, 0, sz[2] + 0.001), 0.13, W_INK, g, rot=(0, 0, 0), ex=0.004)
    SCRAPS.append(g)
PAPERS = [box(f"p{i}", (0, 0, 0), (0.5, 0.24, 0.01), W_WHITE, COL) for i in range(220)]
for p in PAPERS:
    p.hide_render = True

# row of pubs (11,000) + calendar + vault
ROW = [None] * 9
for i in range(9):
    g = grp(f"rowpub{i}")
    B("b", (0, 0, 1.0), (1.8, 1.0, 2.0), W_GREEN if i % 2 else W_RED, g)
    T("BANK", (0, -0.52, 1.6), 0.28, W_GOLD, g)
    ROW[i] = g
CAL = grp("cal")
B("cal", (0, 0, 1.2), (1.4, 0.05, 1.6), W_WHITE, CAL)
CAL_T = T("JUNE", (0, -0.04, 1.45), 0.26, W_RED, CAL)
CAL_N = T("1970", (0, -0.04, 0.85), 0.36, W_INK, CAL)
BIGT = T("£5 000 000 000", (0, -0.3, 0.5), 0.42, W_INK)
VAULT = grp("vault")
B("vwall", (0, 0.6, 1.6), (4.0, 0.2, 3.2), W_STONE, VAULT)
bpy.ops.mesh.primitive_cylinder_add(radius=1.1, depth=0.25, location=(0, 0.25, 1.5), rotation=(R(90), 0, 0), vertices=40)
VDOOR = kid(VAULT, bpy.context.object)
VDOOR.data.materials.append(W_STONE)
B("inside", (0, 0.47, 1.5), (1.9, 0.04, 1.9), W_INK, VAULT)
TRUST = T("TRUST", (0, 0.42, 1.32), 0.46, W_GOLD, VAULT)

TILL = grp("till")
B("tbase", (0, 0, -0.05), (1.4, 0.9, 0.1), W_BROWN, TILL)
for i in range(5):
    B(f"tdiv{i}", (-0.56 + i * 0.28, 0.12, 0.03), (0.02, 0.6, 0.16), W_BROWN, TILL)
B("tback", (0, 0.42, 0.03), (1.4, 0.02, 0.16), W_BROWN, TILL)
B("tfront", (0, -0.18, 0.03), (1.4, 0.02, 0.16), W_BROWN, TILL)
B("tnotes", (0, -0.32, 0.02), (1.4, 0.26, 0.14), W_BROWN, TILL)
T("NO CASH", (0, -0.452, 0.0), 0.11, W_RED, TILL)
OPT = [BANK, PUB, BAR, CAL, VAULT, BIGT, TILL] + MEN + PLACARDS + SCRAPS + ROW


def hide_all():
    for o in OPT:
        for x in [o] + list(o.children_recursive):
            x.hide_render = True
    for p in PAPERS:
        p.hide_render = True


def show(o, on=True):
    for x in [o] + list(o.children_recursive):
        x.hide_render = not on


def crowd(n, cx, cy, spread, k, walk=0.0, face=0.0):
    for i, m in enumerate(MEN):
        if i >= n:
            continue
        show(m)
        r = random.Random(i)
        m.location = (cx + r.uniform(-spread, spread) + walk * (k % 40) * 0.05 * (1 if i % 2 else -0.4), cy + r.uniform(-0.6, 0.6), 0)
        m.rotation_euler = (0, 0, face + r.uniform(-0.4, 0.4))


def ease(t):
    return t * t * (3 - 2 * t)


def shot(s, k):
    t = k / max(1, N - 1)
    hide_all()
    boil(k)
    if s in "AL":  # bank, doors slam, CLOSED sign drops (A); loop L = held closed
        show(BANK)
        u = ease(min(1, t * 3)) if s == "A" else 1
        DOOR_L.location.x, DOOR_R.location.x = -0.36 - 0.6 * (1 - u), 0.36 + 0.6 * (1 - u)
        show(CLOSED, u > 0.6 or s == "L")
        CLOSED.location.z = 0.6 * (1 - min(1, max(0, (t - 0.25) * 4))) if s == "A" else 0
        return cam("c", (1.4, -4.6, 1.1), (0, 3, 2.1), 30)
    if s == "B":  # Ireland 1970: the newspaper headline on the bank steps
        show(BANK)
        show(CLOSED)
        crowd(6, 0, 0.2, 2.4, k, walk=1)
        return cam("c", (-1.8 + t * 0.8, -3.8, 2.2), (0, 2, 1.5), 30)
    if s == "C":  # strikers with ON STRIKE placards in front of the locked doors
        show(BANK)
        show(CLOSED)
        for i, p in enumerate(PLACARDS):
            show(p)
            p.location = (-1.8 + i * 1.2, 1.4 + 0.1 * math.sin(k * 0.6 + i), 0.15 * abs(math.sin(k * 0.5 + i)))
        crowd(4, 0, 1.6, 2.0, k)
        return cam("c", (1.1, -2.2, 1.5), (0, 1.8, 1.4), 30)
    if s == "D":  # not one coin: an empty till drawer
        show(TILL)
        return cam("c", (0.05, -0.55 + t * 0.1, 1.55), (0, 0.05, 0.0), 32)
    if s == "E":  # nobody panicked: they went to the pub
        show(PUB)
        crowd(10, 0, -2.0 + t * 2.6, 2.2, k, face=R(180))
        return cam("c", (1.2, -4.4, 1.4), (0, 3, 1.6), 30)
    if s == "F":  # eleven thousand pubs became banks: a street of them
        for i, g in enumerate(ROW):
            show(g, t > i / 12)
            g.location = (-3.0 if i % 2 else 3.0, i * 2.6, 0)
            g.rotation_euler = (0, 0, R(-90) if i % 2 else R(90))
        return cam("c", (0, -2.0 + t * 1.5, 1.6), (0, 10, 1.0), 30)
    if s == "G":  # cheque on the bar → the barman slides cash back
        show(BAR)
        barman = MEN[0]
        show(barman)
        barman.location = (0, 2.9, 0)
        u = ease(min(1, max(0, (t - 0.35) * 2.5)))
        CASH.location = (-0.3, 0.6 - u * 0.75, 1.17)
        return cam("c", (0.5, -0.3, 1.8), (0, 2.2, 1.35), 34)
    if s == "H":  # cheques on any scrap of paper: beer mat, napkin, cigarette box, envelope
        for i, g in enumerate(SCRAPS):
            show(g, t > i * 0.18)
            g.location = (-0.75 + (i % 2) * 1.5, 0.8 - (i // 2) * 1.2, 0)
            g.rotation_euler = (0, 0, R(-10 + i * 9))
        return cam("c", (0, -0.4, 3.2), (0, 0.2, 0), 32)
    if s == "I":  # passed hand to hand for six months (calendar pages)
        show(CAL)
        months = ["MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV"]
        CAL_T.data.body = months[min(6, int(t * 7))]
        CAL.location = (2.2, 1.0, 0)
        for i in range(8):
            m = MEN[i]
            show(m)
            m.location = (-3.0 + i * 0.75, 0, 0)
            m.rotation_euler = (0, 0, R(90))
        hop = int(t * 16) % 8
        p = PAPERS[0]
        p.hide_render = False
        p.location = (-3.0 + hop * 0.75 + 0.35, -0.1, 1.0 + 0.15 * math.sin(t * 50))
        return cam("c", (0, -5.2, 1.3), (0, 0.5, 1.0), 26)
    if s == "J":  # banks reopen: an avalanche of £5 billion of cheques
        show(BANK)
        show(BIGT, t > 0.45)
        BIGT.location = (0, -1.5, 3.8)
        DOOR_L.location.x, DOOR_R.location.x = -0.36 - 0.6 * ease(min(1, t * 3)), 0.36 + 0.6 * ease(min(1, t * 3))
        for i, p in enumerate(PAPERS):
            r = random.Random(i)
            u = max(0.0, min(1.0, t * 1.5 - r.random() * 0.5))
            if u <= 0:
                continue
            p.hide_render = False
            d = u * r.uniform(2.0, 6.0)
            p.location = (r.uniform(-0.6, 0.6) + d * r.uniform(-0.5, 0.5), 3.0 - d, 0.2 + 1.6 * (1 - u) * r.random() + r.random() * 0.4)
            p.rotation_euler = (r.uniform(-0.5, 0.5), r.uniform(-0.5, 0.5), r.uniform(0, 6.28))
        return cam("c", (1.8, -6.0, 1.6), (0, 2, 2.0), 30)
    if s == "K":  # punch: the vault opens — only TRUST inside
        show(VAULT)
        u = ease(min(1, max(0, (t - 0.15) * 2)))
        VDOOR.location.x = -u * 2.4
        TRUST.hide_render = u < 0.6
        return cam("c", (0, -3.2 + t * 0.6, 1.5), (0, 0.4, 1.5), 34)
    raise SystemExit(f"unknown shot {s}")


for k in FR:
    if k > N:
        break
    c = shot(SHOT, k - 1)
    sc.camera = c
    st = sc.render.image_settings
    st.file_format, st.color_mode, st.quality = "JPEG", "RGB", 92
    sc.render.filepath = os.path.join(K.OUT, f"{SHOT}_{k:04d}.jpg")
    bpy.ops.render.render(write_still=True)
    print("frame", SHOT, k, flush=True)
    bpy.data.objects.remove(c)
