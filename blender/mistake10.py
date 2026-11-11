"""mistake10 — PHOTOREAL CINEMATIC (format test, owner 11 Nov: $0, no AI): "What if your bank sent you $10 million by mistake?"
Real photo-scanned Poly Haven props (CC0), real HDRI light, macro depth of field, slow dolly. No people (story of a real private person:
never shown or named). Numbers live on the phone / laptop screens as emissive 3D text. Played at 12 fps like the other Blender Shorts.
blender -b -P blender/mistake10.py -- --assets A --tex T --out O --frames "A:1-12" --samples 24 --res 900x1600
Shots A..K = beats b01..b11. Frames per shot = blender/mistake10_lens.json (from the voice), default 36."""
import sys, os, math, json, random
import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import K, R, setup, flat, pbr, plane, box, text3d, cam, finish, import_model, bbox, world_hdri, nodes_mat  # noqa: E402

args = setup(sys.argv[sys.argv.index("--") + 1:])
SHOT, rng = args.get("--frames", "A:1-4").split(":")
a, b = (rng.split("-") + [rng])[:2]
FR = range(int(a), int(b) + 1)
lp = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mistake10_lens.json")
N = int((json.load(open(lp)) if os.path.exists(lp) else {}).get(SHOT, 36))
sc = K.sc
sc.cycles.samples = int(args.get("--samples", "24"))
COL = bpy.data.collections.new("set")
sc.collection.children.link(COL)
EX = K.MAN.get("extra", {})


def tex_or(tid, rgb, scale=0.5, tint=None):
    t = EX.get("tex", {}).get(tid) or K.MAN.get(tid)
    return pbr(tid, t, scale, tint) if t else flat(tid, rgb, 0.6)


def emit(name, rgb, s):
    m, n, l, p = nodes_mat(name)
    p.inputs["Base Color"].default_value = (*rgb, 1)
    p.inputs["Emission Color"].default_value = (*rgb, 1)
    p.inputs["Emission Strength"].default_value = s
    return m


def glass(name, rgb=(0.8, 0.9, 1.0), rough=0.02):
    m, n, l, p = nodes_mat(name)
    p.inputs["Base Color"].default_value = (*rgb, 1)
    p.inputs["Transmission Weight"].default_value = 1.0
    p.inputs["Roughness"].default_value = rough
    return m


def model(mid, loc, rz=0.0, size=None):
    try:
        r = import_model(mid, loc, rz, COL)
    except Exception as e:
        print("skip model", mid, e)
        return None
    if size:
        lo, hi = bbox(r)
        s = size / max(1e-6, max(hi.x - lo.x, hi.y - lo.y, hi.z - lo.z))
        r.scale = (s, s, s)
    return r


# ---------------------------------------------------------------- phone (procedural: black glass slab + app screen)
PHONE = bpy.data.objects.new("phone", None)
COL.objects.link(PHONE)
body = box("pbody", (0, 0, 0.0045), (0.075, 0.155, 0.009), flat("pglass", (0.01, 0.01, 0.012), 0.08, 1.0), COL)
bev = body.modifiers.new("bev", "BEVEL")
bev.width, bev.segments = 0.006, 6
body.parent = PHONE
SCR = emit("screen", (0.95, 0.96, 1.0), 0.55)
scr = plane("pscreen", (0, 0, 0.0092), (0.068, 0.146), (0, 0, 0), SCR, COL)
scr.parent = PHONE
hdr = plane("phead", (0, 0.055, 0.0094), (0.068, 0.036), (0, 0, 0), emit("hdrc", (0.05, 0.35, 0.9), 0.7), COL)
hdr.parent = PHONE
T_INK = emit("ink", (0.02, 0.02, 0.05), 0.0)
T_WHITE = emit("twhite", (1, 1, 1), 0.9)
T_GREEN = emit("tgreen", (0.03, 0.6, 0.25), 0.25)
T_RED = emit("tred", (0.85, 0.08, 0.06), 0.25)
APP = text3d("Available balance", (0, 0.058, 0.0096), (0, 0, 0), 0.0065, T_WHITE, COL, extrude=0.0002)
APP.parent = PHONE
BAL = text3d("$10,474,143.00", (0, 0.012, 0.0096), (0, 0, 0), 0.0084, T_INK, COL, extrude=0.0002)
BAL.parent = PHONE
SUB = text3d("Refund received", (0, -0.006, 0.0096), (0, 0, 0), 0.0055, T_GREEN, COL, extrude=0.0002)
SUB.parent = PHONE
for _o in (APP, BAL, SUB):
    _o.data.bevel_depth = 0.0
for i in range(4):  # transaction rows
    r = plane(f"row{i}", (0, -0.028 - i * 0.014, 0.0094), (0.06, 0.010), (0, 0, 0), emit(f"rowc{i}", (0.93, 0.93, 0.95), 1.1), COL)
    r.parent = PHONE
PH_LIGHT = bpy.data.objects.new("phlight", bpy.data.lights.new("phlight", "AREA"))
PH_LIGHT.data.size, PH_LIGHT.data.energy, PH_LIGHT.data.color = 0.08, 2.5, (0.85, 0.9, 1.0)
PH_LIGHT.location = (0, 0, 0.012)
PH_LIGHT.rotation_euler = (math.pi, 0, 0)  # faces up (towards camera / ceiling)
COL.objects.link(PH_LIGHT)
PH_LIGHT.parent = PHONE

# ---------------------------------------------------------------- bedroom corner (night)
ROOM = [plane("floor", (0, 0, 0), (6, 6), (0, 0, 0), tex_or("wood_floor", (0.35, 0.22, 0.14), 0.6), COL),
        plane("wall", (0, 1.2, 1.5), (6, 3), (R(90), 0, 0), pbr("wallp", K.MAN["wall"], 0.6, (0.75, 0.72, 0.68)), COL),
        plane("wall2", (-1.7, 0, 1.5), (6, 3), (R(90), 0, R(90)), pbr("wallp2", K.MAN["wall"], 0.6, (0.7, 0.68, 0.66)), COL)]
NIGHT = model("ClassicNightstand_01", (0, 0.9, 0), R(0), 0.62)
CLOCK = model("alarm_clock_01", (0.16, 0.95, 0.62), R(-20), 0.11)
PILL = model("throw_pillows_01", (-0.75, 0.85, 0.45), R(10), 0.7)
bed = box("bed", (-0.95, 0.4, 0.25), (1.4, 2.0, 0.5), flat("duvet", (0.78, 0.78, 0.8), 0.95), COL)
win_light = bpy.data.objects.new("window", bpy.data.lights.new("window", "AREA"))
win_light.data.shape, win_light.data.size, win_light.data.size_y = "RECTANGLE", 1.2, 1.6
COL.objects.link(win_light)
# ---------------------------------------------------------------- office (the typo)
DESK = model("metal_office_desk", (0, 6, 0), 0, 1.4)
LAP = None
MON = box("monitor", (0, 5.87, 0.98), (0.56, 0.03, 0.34), flat("monb", (0.02, 0.02, 0.02), 0.2, 0.8), COL)
STAND = box("mstand", (0, 5.9, 0.8), (0.06, 0.06, 0.12), flat("monb2", (0.05, 0.05, 0.05), 0.3), COL)
KEYS = box("keyboard", (0, 5.62, 0.765), (0.42, 0.14, 0.02), flat("keyb", (0.08, 0.08, 0.09), 0.5), COL)
LAMP = model("desk_lamp_arm_01", (0.48, 6.15, 0.75), R(200), 0.5)
PADS = model("office_notepads", (-0.42, 5.9, 0.75), R(15), 0.22)
BIND = model("binder_notebook", (-0.25, 6.2, 0.75), R(-30), 0.3)
GAVEL = model("wooden_hammer_01", (0.1, 5.75, 0.8), R(90), 0.3)
LSCR = text3d("PAYMENT · AMOUNT ($)", (0, 0, 0), (0, 0, 0), 0.024, T_INK, COL, extrude=0.0)
LNUM = text3d("10474143.00", (0, 0, 0), (0, 0, 0), 0.05, T_RED, COL, extrude=0.0)
LFORM = plane("lform", (0, 0, 0), (0.52, 0.3), (0, 0, 0), emit("lformc", (0.95, 0.95, 0.97), 0.8), COL)
for o in (LSCR, LNUM, LFORM):
    o.rotation_euler = (R(90), 0, 0)
LFORM.location = (0, 5.853, 0.98)
LSCR.location = (-0.22, 5.851, 1.04)
LNUM.location = (0.0, 5.851, 0.94)
LSCR.data.align_x = "LEFT"
for _o in (LSCR, LNUM, AUDIT if False else LSCR):
    _o.data.bevel_depth = 0.0
office_lamp = bpy.data.objects.new("olamp", bpy.data.lights.new("olamp", "SPOT"))
office_lamp.data.energy, office_lamp.data.spot_size, office_lamp.data.color = 60, R(70), (1.0, 0.82, 0.6)
office_lamp.location, office_lamp.rotation_euler = (0.35, 6.0, 1.3), (R(-15), R(15), 0)
COL.objects.link(office_lamp)
AUDIT = text3d("AUDIT", (-0.42, 5.88, 0.80), (0, 0, R(12)), 0.06, flat("stampred", (0.75, 0.05, 0.05), 0.7), COL, extrude=0.0)
AUDIT.data.bevel_depth = 0.0
SOLD = text3d("SOLD", (0, 0, 0), (R(90), 0, 0), 0.5, T_RED, COL, extrude=0.03)

# ---------------------------------------------------------------- villa (golden hour)
VILLA = bpy.data.objects.new("villa", None)
COL.objects.link(VILLA)
WHITE = flat("render", (0.92, 0.9, 0.86), 0.7)
WOOD = tex_or("wood_floor", (0.4, 0.26, 0.15), 0.8)
GL = glass("vglass", (0.7, 0.8, 0.85), 0.03)
WARM = emit("interior", (1.0, 0.72, 0.42), 1.4)
WATER = glass("water", (0.2, 0.65, 0.85), 0.05)
parts = [box("v1", (0, 30, 1.6), (12, 6, 3.2), WHITE, COL), box("v2", (2, 30.5, 4.6), (8, 5, 2.8), WHITE, COL),
         box("roof1", (0, 29.6, 3.25), (12.8, 7, 0.18), WHITE, COL), box("roof2", (2, 30.2, 6.05), (8.8, 6, 0.18), WOOD, COL),
         box("glassA", (-1.5, 26.85, 1.55), (8, 0.05, 2.8), GL, COL), box("glowA", (-1.5, 26.93, 1.55), (7.8, 0.04, 2.6), WARM, COL),
         box("glassB", (2.5, 27.85, 4.6), (7, 0.05, 2.4), GL, COL), box("glowB", (2.5, 27.93, 4.6), (6.8, 0.04, 2.2), WARM, COL),
         box("deck", (0, 23.5, 0.08), (16, 6, 0.16), WOOD, COL), box("pool", (1.0, 22.0, 0.05), (8, 3.2, 0.2), WATER, COL),
         plane("lawn", (0, 18, 0.01), (60, 40), (0, 0, 0), tex_or("aerial_grass_rock", (0.25, 0.45, 0.2), 0.25), COL)]
MULL = flat("mullion", (0.08, 0.08, 0.09), 0.4, 0.3)
for i in range(9):  # window frames make the glass read as glass
    parts.append(box(f"mA{i}", (-5.5 + i * 1.0, 26.8, 1.55), (0.07, 0.08, 2.8), MULL, COL))
for i in range(8):
    parts.append(box(f"mB{i}", (-1.0 + i * 1.0, 27.8, 4.6), (0.07, 0.08, 2.4), MULL, COL))
parts += [box("wing", (-8.5, 31, 2.2), (5, 8, 4.4), WOOD, COL), box("coping", (1.0, 22.0, 0.17), (8.4, 3.6, 0.06), WHITE, COL)]
for p_ in parts:
    p_.parent = VILLA
PLANTS = [model("potted_plant_01", (x, 25.8, 0.16), 0, 1.1) for x in (-6.5, 5.5)]
CHAIRS = model("outdoor_table_chair_set_01", (-4.5, 23.5, 0.16), R(20), 2.2)
post = box("signpost", (-0.5, 17.05, 0.5), (0.08, 0.08, 1.0), WOOD, COL)
sboard = box("signboard", (-0.5, 17.05, 1.15), (1.6, 0.05, 0.7), WHITE, COL)
SIGN = [SOLD, post, sboard]
SOLD.location = (-0.5, 17.0, 0.95)
SOLD.data.size = 0.42
SOLD.data.materials[0] = flat("soldred", (0.8, 0.06, 0.05), 0.6)

ALL = {"bed": ROOM + [o for o in (NIGHT, CLOCK, PILL) if o] + [bed, PHONE, win_light],
       "office": [o for o in (DESK, LAMP, PADS, BIND) if o] + [LSCR, LNUM, LFORM, office_lamp, MON, STAND, KEYS],
       "villa": [VILLA] + [o for o in PLANTS + [CHAIRS] if o], "sign": SIGN, "audit": [AUDIT], "gavel": [GAVEL] if GAVEL else []}


def show(group, on=True):
    for o in ALL[group]:
        for x in [o] + list(o.children_recursive):
            x.hide_render = not on


def balance(v, col=T_INK, sub="Refund received", subcol=T_GREEN):
    BAL.data.body = f"${v:,.2f}"
    BAL.data.materials[0] = col
    SUB.data.body = sub
    SUB.data.materials[0] = subcol


def lens_cam(loc, target, lens, fstop, focus):
    c = cam("c", loc, target, lens)
    c.data.dof.use_dof = True
    e = bpy.data.objects.new("f", None)
    COL.objects.link(e)
    e.location = focus
    c.data.dof.focus_object = e
    c.data.dof.aperture_fstop = fstop
    return c


PHONE.location = (0.0, 0.85, 0.6235)  # on the nightstand top (scaled to 0.62 m)
PHONE.rotation_euler = (0, 0, R(-12))
PH_TOP = PHONE.location.copy()


def night(t, moon=1.0):
    world_hdri("night", 0.05)
    win_light.location, win_light.rotation_euler = (1.4, 0.2, 1.6), (R(90), 0, R(60))
    win_light.data.energy, win_light.data.color = 40 * moon, (0.55, 0.65, 1.0)


def shot(s, k):
    t = k / max(1, N - 1)
    for g in ALL:
        show(g, False)
    if s in "ACEJK":  # phone on the nightstand at night
        show("bed")
        night(t)
        if s in "AK":
            balance(10474143.00)
        elif s == "C":
            balance(100.00, sub="Refund pending", subcol=T_INK)
        elif s == "E":
            balance(100 + (10474143.00 - 100) * min(1, (t * 1.4) ** 2))
        else:  # J: it drains back to zero
            balance(max(0.0, 10474143.00 * (1 - min(1, t * 1.6))), T_RED if t > 0.3 else T_INK, "Funds reversed", T_RED)
            SCR.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 0.55 - 0.35 * t
        far = 0.42 - 0.12 * t if s != "K" else 0.30 + 0.12 * t  # K pulls back out to A's first frame (loop)
        return lens_cam((PH_TOP.x + 0.05, PH_TOP.y - far, PH_TOP.z + far * 0.85), PH_TOP + Vector((0, 0.01, 0)), 70, 1.4, PH_TOP)
    if s == "B":  # a real bedroom at night, wide
        show("bed")
        night(t)
        balance(100.00, sub="Refund pending", subcol=T_INK)
        return lens_cam((1.0 - t * 0.3, -1.6, 1.3), (-0.3, 0.8, 0.5), 30, 2.8, (0, 0.85, 0.6))
    if s == "D":  # the office: account number typed into the AMOUNT box
        show("office")
        world_hdri("night", 0.08)
        LNUM.data.body = "10474143.00"[: max(1, int(len("10474143.00") * min(1, t * 1.8)))]
        return lens_cam((0.1 - t * 0.05, 4.35 + t * 0.15, 1.1), (0.0, 5.86, 0.97), 45, 2.8, (0.0, 5.85, 0.95))
    if s == "F":  # seven months: window light sweeps day → night again and again (time-lapse)
        show("bed")
        balance(10474143.00)
        day = 0.5 + 0.5 * math.sin(t * 2 * math.pi * 7)
        world_hdri("day" if day > 0.5 else "night", 0.05 + 0.6 * day)
        win_light.location, win_light.rotation_euler = (1.4, 0.2, 1.6), (R(90), 0, R(60 + 40 * math.sin(t * 44)))
        win_light.data.energy, win_light.data.color = 40 + 400 * day, (1.0, 0.9 * day + 0.6 * (1 - day), 0.75 * day + 1.0 * (1 - day))
        return lens_cam((0.7, -0.4, 1.0), (0, 0.9, 0.62), 40, 2.0, (0, 0.88, 0.62))
    if s in "GI":  # the villa at golden hour; I = SOLD sign + gavel close-up handled below
        show("villa")
        world_hdri("golden", 1.0, rot=40)
        if s == "I":
            show("sign")
        return lens_cam((-3 + t * 2.0, 12.0 + t * 1.0, 6.5), (0.5, 24.5, 1.2), 24, 8.0, (1, 23, 1))
    if s == "H":  # audit: red AUDIT stamp lands on the papers
        show("office")
        show("audit", t > 0.25)
        world_hdri("night", 0.25)
        office_lamp.data.energy = 120
        AUDIT.scale = [max(1.0, 1.6 - (t - 0.25) * 6)] * 3
        return lens_cam((-0.42, 5.7, 1.25), (-0.42, 5.9, 0.76), 40, 2.8, (-0.42, 5.88, 0.78))
    raise SystemExit(f"unknown shot {s}")


finish(bloom=True)
_c = shot(SHOT, 0)  # warm-up
bpy.data.objects.remove(_c)
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
