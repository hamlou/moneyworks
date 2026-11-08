"""Procedural money props (ours, no licence needed) for the autopilot `scene` template: ids "p:<name>" or
"p:<name>=<text>" (list in pipeline/PROPS.md). Each make_<name>(loc, rz, scale, text) returns an EMPTY root whose
children are bevelled MESH parts (+ 3D text): real size in metres, origin at the bottom centre, front = -Y (camera).
Built only from primitives + modifiers (bevel / solidify / wireframe) + from_pydata prisms — Blender 4.2 safe.
SHOW[name] = default display scale when the scene has no hero_size (tiny things like coins become cartoon-giant)."""
import math
import random
import bpy
import bmesh
from mathutils import Matrix
from lib import K, R, flat, text3d, bbox

# ---------------------------------------------------------------- materials (cached by name)
PAL = {  # key: (rgb, rough, metal, coat, emit)
    "bill": ((0.45, 0.68, 0.42), 0.75, 0, 0, 0), "bill_dk": ((0.16, 0.4, 0.2), 0.7, 0, 0, 0),
    "bill_lt": ((0.8, 0.9, 0.72), 0.8, 0, 0, 0), "edge": ((0.84, 0.9, 0.78), 0.85, 0, 0, 0),
    "band": ((0.96, 0.84, 0.5), 0.6, 0, 0, 0), "gold": ((1.0, 0.7, 0.18), 0.28, 1, 0, 0),
    "gold_dk": ((0.8, 0.5, 0.1), 0.38, 1, 0, 0), "steel": ((0.6, 0.62, 0.66), 0.32, 1, 0, 0),
    "steel_dk": ((0.24, 0.26, 0.3), 0.38, 0.6, 0, 0), "chrome": ((0.86, 0.87, 0.9), 0.14, 1, 0, 0),
    "dark": ((0.05, 0.05, 0.06), 0.45, 0, 0.3, 0), "black": ((0.015, 0.015, 0.02), 0.4, 0, 0, 0),
    "white": ((0.93, 0.93, 0.92), 0.5, 0, 0.2, 0), "paper": ((0.97, 0.96, 0.92), 0.85, 0, 0, 0),
    "ink": ((0.06, 0.06, 0.08), 0.6, 0, 0, 0), "red": ((0.86, 0.1, 0.08), 0.42, 0, 0.3, 0),
    "green": ((0.12, 0.7, 0.3), 0.42, 0, 0.3, 0), "blue": ((0.12, 0.32, 0.85), 0.35, 0, 0.5, 0),
    "pink": ((1.0, 0.55, 0.66), 0.35, 0, 0.6, 0), "nostril": ((0.6, 0.2, 0.3), 0.5, 0, 0, 0),
    "leather": ((0.33, 0.18, 0.09), 0.6, 0, 0.1, 0), "leather_lt": ((0.45, 0.26, 0.13), 0.6, 0, 0.1, 0),
    "wood": ((0.55, 0.36, 0.2), 0.7, 0, 0, 0), "stone": ((0.9, 0.88, 0.82), 0.7, 0, 0, 0),
    "stone_dk": ((0.7, 0.68, 0.63), 0.75, 0, 0, 0), "roof": ((0.62, 0.2, 0.14), 0.7, 0, 0, 0),
    "wall": ((0.95, 0.88, 0.72), 0.75, 0, 0, 0), "brick": ((0.55, 0.25, 0.18), 0.8, 0, 0, 0),
    "yellow": ((1.0, 0.8, 0.2), 0.5, 0, 0.2, 0), "orange": ((1.0, 0.5, 0.1), 0.45, 0, 0.2, 0),
    "tan": ((0.83, 0.68, 0.45), 0.85, 0, 0, 0), "rope": ((0.55, 0.38, 0.2), 0.9, 0, 0, 0),
    "grey": ((0.45, 0.47, 0.5), 0.5, 0, 0, 0), "grey_lt": ((0.78, 0.8, 0.82), 0.45, 0, 0.2, 0),
    "calc": ((0.2, 0.21, 0.24), 0.5, 0, 0.2, 0), "win": ((1.0, 0.8, 0.45), 0.3, 0, 0, 1.5),
    "scr": ((0.04, 0.06, 0.12), 0.3, 0, 0, 0.4), "scr_blue": ((0.2, 0.5, 0.95), 0.3, 0, 0, 1.0),
    "lcd": ((0.62, 0.75, 0.55), 0.5, 0, 0, 0.3), "ui_blue": ((0.15, 0.4, 0.95), 0.4, 0, 0, 1.2),
    "ui_row": ((0.12, 0.15, 0.24), 0.4, 0, 0, 0.5), "t_red": ((0.95, 0.15, 0.1), 0.4, 0, 0, 3.0),
    "t_green": ((0.15, 0.95, 0.35), 0.4, 0, 0, 3.0), "t_white": ((0.95, 0.95, 0.95), 0.4, 0, 0, 2.0),
    "t_grey": ((0.6, 0.65, 0.75), 0.4, 0, 0, 1.2),
}


def C(key):
    n = "pr_" + key
    m = bpy.data.materials.get(n)
    if m:
        return m
    rgb, rough, metal, coat, emit = PAL[key]
    m = flat(n, rgb, rough, coat, emit)
    m.node_tree.nodes["Principled BSDF"].inputs["Metallic"].default_value = metal
    return m


# ---------------------------------------------------------------- part helpers (coords are LOCAL to `par`)
def _coll():
    return K.sc.collection if K.sc else bpy.context.scene.collection


def _own(o, par, mat, name):
    o.name = name
    if mat:
        o.data.materials.append(mat)
    o.parent = par  # matrix_parent_inverse stays identity → location/rotation are in par's space
    return o


def _bev(o, w, seg=3):
    if w > 0:
        b = o.modifiers.new("bev", "BEVEL")
        b.width, b.segments, b.limit_method, b.angle_limit = w, seg, "ANGLE", R(30)
    return o


def _diag(x, y, z):
    return Matrix.Diagonal((x, y, z, 1.0))


def grp(par, loc=(0, 0, 0), rot=(0, 0, 0), name="grp"):
    g = bpy.data.objects.new(name, None)
    _coll().objects.link(g)
    g.location, g.rotation_euler, g.empty_display_size = loc, rot, 0.05
    g.parent = par
    return g


def cube(par, name, loc, size, mat, bev=0.004, rot=(0, 0, 0), seg=3):
    bpy.ops.mesh.primitive_cube_add(size=1)
    o = bpy.context.object
    o.data.transform(_diag(*size))
    o.location, o.rotation_euler = loc, rot
    _own(o, par, mat, name)
    return _bev(o, min(bev, 0.4 * min(size)), seg)


def cyl(par, name, loc, r, depth, mat, rot=(0, 0, 0), bev=0.0, v=32, r2=None, smooth=True, seg=2):
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=v, radius=r, depth=depth)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r, radius2=r2, depth=depth)
    o = bpy.context.object
    for p in o.data.polygons:  # sides smooth, caps flat (4.1+: flat faces act as sharp borders → clean caps)
        p.use_smooth = smooth and abs(p.normal.z) < 0.999
    o.location, o.rotation_euler = loc, rot
    _own(o, par, mat, name)
    return _bev(o, min(bev, 0.4 * min(r, depth)), seg)


def ball(par, name, loc, rad, mat, rot=(0, 0, 0), seg=32, rings=16):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings, radius=1.0)
    o = bpy.context.object
    o.data.transform(_diag(*rad))
    for p in o.data.polygons:
        p.use_smooth = True
    o.location, o.rotation_euler = loc, rot
    return _own(o, par, mat, name)


def ring(par, name, loc, major, minor, mat, rot=(0, 0, 0), stretch=(1, 1, 1), seg=40, mseg=12):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=seg, minor_segments=mseg)
    o = bpy.context.object
    o.data.transform(_diag(*stretch))
    for p in o.data.polygons:
        p.use_smooth = True
    o.location, o.rotation_euler = loc, rot
    return _own(o, par, mat, name)


def slab(par, name, loc, w, h, t, rad, mat, rot=(0, 0, 0), edge=0.0, seg=5):
    """rounded rectangle w×h in par's XY plane, thickness t along par's Z (centred): plane + vertex bevel + solidify"""
    bpy.ops.mesh.primitive_plane_add(size=1)
    o = bpy.context.object
    o.data.transform(_diag(w, h, 1))
    o.location, o.rotation_euler = loc, rot
    _own(o, par, mat, name)
    if rad > 0:
        b = o.modifiers.new("round", "BEVEL")
        b.affect, b.limit_method, b.width, b.segments = "VERTICES", "NONE", min(rad, 0.49 * min(w, h)), seg
    s = o.modifiers.new("thick", "SOLIDIFY")
    s.thickness, s.offset = t, 0.0
    return _bev(o, min(edge, 0.4 * t), 2)


def wgrid(par, name, loc, w, h, mat, rot=(0, 0, 0), nx=10, ny=6, thick=0.006):
    """wire-mesh panel (shopping cart): grid + wireframe modifier"""
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=nx, y_subdivisions=ny, size=1)
    o = bpy.context.object
    o.data.transform(_diag(w, h, 1))
    o.location, o.rotation_euler = loc, rot
    _own(o, par, mat, name)
    wf = o.modifiers.new("wire", "WIREFRAME")
    wf.thickness = thick
    return o


def prism(par, name, pts, d0, d1, mat, axis="y", bev=0.0):
    """2D profile pts [(u, z)…] extruded along `axis` from d0 to d1 (u = x for axis y, u = y for axis x)"""
    n = len(pts)
    vs = [((u, d, z) if axis == "y" else (d, u, z)) for d in (d0, d1) for (u, z) in pts]
    fs = [list(range(n)), list(range(2 * n - 1, n - 1, -1))] + [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    me = bpy.data.meshes.new(name)
    me.from_pydata(vs, [], fs)
    me.update()
    bm = bmesh.new()
    bm.from_mesh(me)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    _coll().objects.link(o)
    _own(o, par, mat, name)
    return _bev(o, bev, 2)


def txt(par, body, loc, size, mat, rot=(0, 0, 0), ext=None, width=None, align="CENTER"):
    """3D text, centred on loc; rot (R(90),0,0) = upright facing -Y; width = max line width (shrinks size to fit)"""
    body = str(body)
    if width:
        size = min(size, width / (0.62 * max(1, max(len(s) for s in body.split("\n")))))
    o = text3d(body, (0, 0, 0), (0, 0, 0), size, mat, _coll(), size * 0.1 if ext is None else ext)
    o.data.bevel_depth = size * 0.015
    o.data.align_y, o.data.align_x = "CENTER", align
    o.location, o.rotation_euler = loc, rot
    o.parent = par
    return o


FRONT = (R(90), 0, 0)  # upright, facing -Y


def _start(name):
    r = bpy.data.objects.new("p_" + name, None)
    _coll().objects.link(r)
    r.empty_display_size = 0.1
    return r


def _done(r, loc, rz, scale):
    lo, _ = bbox(r)  # mesh children only → drop the set so its lowest point sits at z = 0 (origin at the bottom)
    if abs(lo.z) > 1e-6:
        for ch in r.children:
            ch.location.z -= lo.z
    r.location, r.rotation_euler, r.scale = loc, (0, 0, rz), (scale, scale, scale)
    return r


# ---------------------------------------------------------------- money
def _note(par, z=0.0, corner="100", t=0.0008):
    W, H = 0.156, 0.066
    cube(par, "note", (0, 0, z + t / 2), (W, H, t), C("bill"), 0)
    cube(par, "note_in", (0, 0, z + t + 0.0001), (W - 0.012, H - 0.01, 0.0002), C("bill_lt"), 0)
    c = cyl(par, "portrait", (0, 0, z + t + 0.0003), 0.019, 0.0002, C("bill_dk"))
    c.scale = (0.8, 1, 1)
    zt = z + t + 0.0006
    txt(par, "$", (0, 0, zt), 0.022, C("bill_lt"), ext=0.0002)
    if corner:
        txt(par, corner, (-0.058, 0.02, zt), 0.011, C("bill_dk"), ext=0.0002)
        txt(par, corner, (0.058, -0.02, zt), 0.011, C("bill_dk"), ext=0.0002)


def make_banknote(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("banknote")
    _note(r, 0, text or "100")
    return _done(r, loc, rz, scale)


def _brick(par, loc, rz, label):
    g = grp(par, loc, (0, 0, rz), "brick")
    T = 0.012
    cube(g, "stack", (0, 0, T / 2), (0.155, 0.065, T), C("edge"), 0.0015, 2)
    _note(g, T, None)
    cube(g, "band", (0, 0, (T + 0.003) / 2), (0.038, 0.0675, T + 0.003), C("band"), 0.0008, 2)
    txt(g, label, (0, 0, T + 0.0034), 0.012, C("ink"), ext=0.0003, width=0.034)
    return T + 0.0032


def make_cash_stack(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("cash_stack")
    z = 0.0
    for a in (0.0, 0.07, -0.05):
        z += _brick(r, (0, 0, z), a, text or "$10K")
    return _done(r, loc, rz, scale)


def _coin_flat(par, loc, rz=0.0, tilt=(0, 0)):
    g = grp(par, loc, (tilt[0], tilt[1], rz), "coin")
    cyl(g, "coin", (0, 0, 0), 0.0135, 0.0028, C("gold"), bev=0.0005, v=24)
    cyl(g, "coin_in", (0, 0, 0), 0.0108, 0.0034, C("gold_dk"), v=24)


def make_coin_pile(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("coin_pile")
    rr = random.Random(7)
    for (x, y), n in zip(((0, 0), (0.03, 0.012), (-0.026, 0.018), (0.008, 0.034)), (9, 6, 5, 3)):
        for i in range(n):
            _coin_flat(r, (x + rr.uniform(-0.001, 0.001), y + rr.uniform(-0.001, 0.001), 0.0017 + i * 0.0029), rr.uniform(0, 6))
    for i in range(7):  # spilled coins around the towers, some leaning
        a, d = i / 7 * 2 * math.pi + rr.uniform(-0.3, 0.3), rr.uniform(0.045, 0.07)
        lean = rr.choice((0, 0, 0.35))
        _coin_flat(r, (math.cos(a) * d, math.sin(a) * d, 0.0017 + lean * 0.012), rr.uniform(0, 6), (lean, 0))
    return _done(r, loc, rz, scale)


def make_gold_coin(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """standing on its edge, face to the camera (spins nicely with hero_fx spin)"""
    r = _start("gold_coin")
    g = grp(r, (0, 0, 0.02), FRONT, "face")  # g's +Z = world -Y
    cyl(g, "coin", (0, 0, 0), 0.02, 0.004, C("gold"), bev=0.0008, v=48)
    for s in (1, -1):
        ring(g, "rim", (0, 0, s * 0.002), 0.0186, 0.0011, C("gold"), seg=48, mseg=8)
        txt(g, text or "$", (0, 0, s * 0.0022), 0.02, C("gold_dk"), rot=(0, 0 if s > 0 else R(180), 0), ext=0.0006, width=0.03)
    return _done(r, loc, rz, scale)


def make_gold_bar(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("gold_bar")
    prism(r, "bar", [(-0.04, 0), (0.04, 0), (0.03, 0.045), (-0.03, 0.045)], -0.125, 0.125, C("gold"), "x", 0.003)
    txt(r, text or "999.9", (0, 0, 0.0455), 0.022, C("gold_dk"), ext=0.0008, width=0.16)
    return _done(r, loc, rz, scale)


def make_money_bag(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("money_bag")
    ball(r, "sack", (0, 0, 0.19), (0.17, 0.17, 0.19), C("tan"))
    cyl(r, "neck", (0, 0, 0.39), 0.055, 0.07, C("tan"), r2=0.05)
    ring(r, "tie", (0, 0, 0.395), 0.056, 0.01, C("rope"))
    cyl(r, "top", (0, 0, 0.46), 0.045, 0.08, C("tan"), v=10, r2=0.1, smooth=False)
    txt(r, text or "$", (0, -0.158, 0.19), 0.17, C("bill_dk"), rot=FRONT, ext=0.035, width=0.26)
    return _done(r, loc, rz, scale)


# ---------------------------------------------------------------- cards / devices
def make_credit_card(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """standing, leaning back 10°; chip + number + name on the front, magnetic stripe on the back"""
    r = _start("credit_card")
    W, H, T = 0.0856, 0.054, 0.001
    g = grp(r, (0, 0, 0), (R(80), 0, 0), "card")  # g's +Y = up (leaning back), +Z = front
    slab(g, "card", (0, H / 2, 0), W, H, T, 0.0032, C("blue"))
    slab(g, "chip", (-0.026, H / 2 + 0.003, T / 2 + 0.0002), 0.011, 0.0085, 0.0004, 0.0012, C("gold"))
    txt(g, "4821  0093  7765  1234", (0, H / 2 - 0.011, T / 2 + 0.0004), 0.0045, C("white"), ext=0.0002, width=0.072)
    txt(g, text or "MONEY BANK", (0, H / 2 + 0.019, T / 2 + 0.0004), 0.006, C("white"), ext=0.0002, width=0.06)
    cube(g, "stripe", (0, H / 2 + 0.012, -T / 2 - 0.0002), (W - 0.0004, 0.009, 0.0004), C("black"), 0)
    return _done(r, loc, rz, scale)


def make_phone(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """standing, leaning back 12°, banking app on screen: balance in red (text starts with '-') or green"""
    r = _start("phone")
    W, H, T = 0.072, 0.15, 0.008
    g = grp(r, (0, 0, 0), (R(78), 0, 0), "phone")
    slab(g, "body", (0, H / 2, 0), W, H, T, 0.009, C("dark"), edge=0.0015)
    slab(g, "screen", (0, H / 2, T / 2 + 0.0002), W - 0.005, H - 0.006, 0.0004, 0.007, C("scr"))
    cyl(g, "cam", (0, H - 0.008, T / 2 + 0.0005), 0.0018, 0.0004, C("black"), rot=(0, 0, 0))
    cube(g, "btn", (W / 2 + 0.0006, H * 0.7, 0), (0.0016, 0.02, 0.003), C("dark"), 0.0005)
    z = T / 2 + 0.0006
    slab(g, "hdr", (0, H - 0.02, z), W - 0.014, 0.012, 0.0003, 0.003, C("ui_blue"))
    txt(g, "MY BANK", (0, H - 0.02, z + 0.0004), 0.005, C("t_white"), ext=0.0002, width=0.05)
    txt(g, "BALANCE", (0, H * 0.7, z), 0.005, C("t_grey"), ext=0.0002)
    bal = str(text or "-$1,240")
    txt(g, bal, (0, H * 0.6, z), 0.014, C("t_red" if bal.strip().startswith("-") else "t_green"), ext=0.0003, width=W - 0.012)
    for i, (a, b, neg) in enumerate((("RENT", "-$900", 1), ("FOOD", "-$64", 1), ("PAY", "+$1,200", 0))):
        y = H * 0.42 - i * 0.024
        slab(g, f"row{i}", (0, y, z), W - 0.014, 0.019, 0.0003, 0.003, C("ui_row"))
        txt(g, a, (-W / 2 + 0.011, y, z + 0.0004), 0.0045, C("t_white"), ext=0.0002, align="LEFT")
        txt(g, b, (W / 2 - 0.011, y, z + 0.0004), 0.0045, C("t_red" if neg else "t_green"), ext=0.0002, align="RIGHT")
    slab(g, "home", (0, 0.007, z), 0.024, 0.0015, 0.0003, 0.0007, C("t_white"))
    return _done(r, loc, rz, scale)


def make_calculator(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("calculator")
    g = grp(r, (0, 0, 0), (R(12), 0, 0), "calc")  # far end raised so the screen faces the lens
    cube(g, "body", (0, 0, 0.008), (0.08, 0.15, 0.016), C("calc"), 0.004)
    cube(g, "bezel", (0, 0.045, 0.0165), (0.07, 0.035, 0.002), C("black"), 0.0008)
    cube(g, "lcd", (0, 0.045, 0.0177), (0.064, 0.028, 0.001), C("lcd"), 0)
    txt(g, text or "0.00", (0, 0.045, 0.0186), 0.014, C("ink"), ext=0.0003, width=0.058)
    cube(g, "solar", (0.02, 0.07, 0.0163), (0.03, 0.007, 0.001), C("dark"), 0)
    for row in range(5):
        for col in range(4):
            m = "orange" if col == 3 else ("grey_lt" if row == 4 else "white")
            cube(g, f"key{row}{col}", (-0.027 + col * 0.018, -0.062 + row * 0.019, 0.0175), (0.014, 0.014, 0.004), C(m), 0.0015)
    return _done(r, loc, rz, scale)


def make_atm(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("atm")
    cube(r, "plinth", (0, 0, 0.03), (0.8, 0.65, 0.06), C("dark"), 0.01)
    cube(r, "body", (0, 0, 0.725), (0.75, 0.6, 1.45), C("grey_lt"), 0.02)
    cube(r, "header", (0, 0, 1.575), (0.8, 0.64, 0.25), C("red"), 0.02)
    txt(r, text or "ATM", (0, -0.335, 1.575), 0.16, C("t_white"), rot=FRONT, ext=0.01, width=0.7)
    cube(r, "bezel", (0, -0.3, 1.2), (0.46, 0.04, 0.34), C("dark"), 0.01)
    cube(r, "screen", (0, -0.322, 1.2), (0.4, 0.004, 0.28), C("scr_blue"), 0)
    txt(r, "INSERT CARD", (0, -0.327, 1.2), 0.04, C("t_white"), rot=FRONT, ext=0.002, width=0.34)
    cube(r, "ledge", (0, -0.38, 0.92), (0.7, 0.22, 0.04), C("grey"), 0.01)
    for i in range(12):
        cube(r, f"key{i}", (-0.17 + (i % 3) * 0.05, -0.45 + (i // 3) * 0.042, 0.945), (0.04, 0.034, 0.012), C("white"), 0.004)
    for i, m in enumerate(("red", "yellow", "green")):
        cube(r, f"fn{i}", (0.0, -0.45 + i * 0.042, 0.945), (0.05, 0.034, 0.012), C(m), 0.004)
    cube(r, "cardslot", (0.24, -0.31, 1.0), (0.1, 0.03, 0.025), C("black"), 0.004)
    cube(r, "cardlight", (0.24, -0.326, 1.018), (0.08, 0.004, 0.006), C("t_green"), 0)
    cube(r, "cashslot", (0, -0.31, 0.75), (0.34, 0.03, 0.04), C("black"), 0.006)
    for i, a in enumerate((-0.12, 0.0, 0.14)):
        cube(r, f"bill{i}", (i * 0.01 - 0.01, -0.355, 0.748 + i * 0.002), (0.14, 0.08, 0.0015), C("bill"), 0, rot=(0, 0, a))
    return _done(r, loc, rz, scale)


# ---------------------------------------------------------------- savings / security
def make_piggy_bank(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """side view: snout points to -X, the -Y flank faces the camera (optional text on the flank)"""
    r = _start("piggy_bank")
    pk = C("pink")
    ball(r, "body", (0, 0, 0.105), (0.1, 0.08, 0.075), pk)
    for x in (-0.055, 0.055):
        for y in (-0.04, 0.04):
            cyl(r, "leg", (x, y, 0.03), 0.017, 0.06, pk, bev=0.004)
    cyl(r, "snout", (-0.095, 0, 0.11), 0.028, 0.03, pk, rot=(0, R(90), 0), bev=0.005)
    for y in (-0.01, 0.01):
        cyl(r, "nostril", (-0.1105, y, 0.11), 0.005, 0.004, C("nostril"), rot=(0, R(90), 0))
        ball(r, "eye", (-0.075, y * 3.5, 0.145), (0.009, 0.009, 0.009), C("black"))
    for s in (1, -1):
        cyl(r, "ear", (-0.05, s * 0.042, 0.175), 0.022, 0.035, pk, rot=(R(-20 * s), R(-10), 0), r2=0.0, smooth=False, v=16)
    cube(r, "slot", (0.01, 0, 0.18), (0.035, 0.006, 0.006), C("black"), 0.001)
    ring(r, "tail", (0.103, 0, 0.12), 0.012, 0.003, pk, rot=(0, R(90), 0))
    if text:
        txt(r, text, (0, -0.079, 0.1), 0.022, C("nostril"), rot=FRONT, ext=0.006, width=0.12)
    return _done(r, loc, rz, scale)


def make_wallet(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("wallet")
    cube(r, "body", (0, 0, 0.045), (0.115, 0.022, 0.09), C("leather"), 0.004)
    cube(r, "flap", (0, -0.0105, 0.045), (0.105, 0.003, 0.08), C("leather_lt"), 0.0012)
    cube(r, "bill_a", (-0.004, 0.004, 0.085), (0.1, 0.003, 0.06), C("bill"), 0.0005, rot=(0, R(4), 0))
    cube(r, "bill_b", (0.006, -0.002, 0.08), (0.1, 0.003, 0.06), C("bill_lt"), 0.0005, rot=(0, R(-3), 0))
    cyl(r, "snap", (0, -0.0135, 0.07), 0.006, 0.004, C("chrome"), rot=FRONT, bev=0.001)
    if text:
        txt(r, text, (0, -0.0125, 0.035), 0.012, C("leather"), rot=FRONT, ext=0.0008, width=0.09)
    return _done(r, loc, rz, scale)


def make_safe(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """steel safe with a round vault door + spoked wheel"""
    r = _start("safe")
    for x in (-0.29, 0.29):
        for y in (-0.26, 0.26):
            cube(r, "foot", (x, y, 0.02), (0.08, 0.08, 0.04), C("black"), 0.008)
    cube(r, "body", (0, 0, 0.44), (0.7, 0.65, 0.8), C("steel_dk"), 0.02)
    cube(r, "frame", (0, -0.33, 0.44), (0.6, 0.02, 0.7), C("steel"), 0.01)
    cyl(r, "door", (0, -0.355, 0.44), 0.25, 0.04, C("chrome"), rot=FRONT, bev=0.006, v=64)
    ring(r, "door_rim", (0, -0.355, 0.44), 0.25, 0.012, C("steel"), rot=FRONT, seg=64)
    for i in range(8):
        a = i / 8 * 2 * math.pi
        cyl(r, "bolt", (math.cos(a) * 0.215, -0.378, 0.44 + math.sin(a) * 0.215), 0.012, 0.01, C("steel_dk"), rot=FRONT, bev=0.002)
    cyl(r, "hub", (0, -0.39, 0.44), 0.03, 0.05, C("steel"), rot=FRONT, bev=0.005)
    ring(r, "wheel", (0, -0.405, 0.44), 0.11, 0.009, C("chrome"), rot=FRONT)
    for th in (0, 60, 120):
        cyl(r, "spoke", (0, -0.405, 0.44), 0.007, 0.22, C("chrome"), rot=(0, R(th), 0), v=16)
    cyl(r, "dial", (0.25, -0.35, 0.72), 0.035, 0.025, C("chrome"), rot=FRONT, bev=0.004)
    cube(r, "tick", (0.25, -0.364, 0.745), (0.004, 0.004, 0.012), C("red"), 0)
    for z in (0.28, 0.6):
        cyl(r, "hinge", (-0.3, -0.345, z), 0.02, 0.1, C("steel"), bev=0.004)
    if text:
        txt(r, text, (0, -0.345, 0.74), 0.06, C("gold"), rot=FRONT, ext=0.006, width=0.36)
    return _done(r, loc, rz, scale)


def make_padlock(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("padlock")
    cube(r, "body", (0, 0, 0.025), (0.06, 0.028, 0.05), C("gold"), 0.006)
    ring(r, "shackle", (0, 0, 0.05), 0.019, 0.0045, C("chrome"), rot=FRONT, stretch=(1, 1.6, 1))
    cyl(r, "keyhole", (0, -0.0145, 0.03), 0.005, 0.004, C("black"), rot=FRONT)
    cube(r, "keyslot", (0, -0.0145, 0.023), (0.003, 0.004, 0.009), C("black"), 0)
    if text:
        txt(r, text, (0, -0.0148, 0.042), 0.007, C("gold_dk"), rot=FRONT, ext=0.0006, width=0.05)
    return _done(r, loc, rz, scale)


# ---------------------------------------------------------------- shopping / bills
def make_price_tag(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("price_tag")
    prism(r, "tag", [(-0.05, 0), (0.035, 0), (0.056, 0.025), (0.035, 0.05), (-0.05, 0.05)], -0.0015, 0.0015, C("yellow"), "y", 0.001)
    cyl(r, "hole", (0.036, 0, 0.025), 0.005, 0.0034, C("black"), rot=FRONT)
    ring(r, "string", (0.052, 0, 0.035), 0.02, 0.0011, C("paper"), rot=(0, R(70), R(20)), mseg=8)
    txt(r, text or "$99", (-0.008, -0.0025, 0.025), 0.03, C("ink"), rot=FRONT, ext=0.0008, width=0.075)
    return _done(r, loc, rz, scale)


def make_receipt_long(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """a long receipt lying on the floor running away from the camera, roll at the far end, TOTAL nearest the lens.
    text = "TOTAL $1,020" or "RENT $900|FOOD $300|TOTAL $1,200" (last item = the total line)"""
    r = _start("receipt_long")
    W, L, T = 0.08, 0.5, 0.0006
    cube(r, "strip", (0, L / 2, T / 2), (W, L, T), C("paper"), 0)
    cyl(r, "roll", (0, L + 0.012, 0.02), 0.02, W, C("paper"), rot=(0, R(90), 0))
    cyl(r, "core", (0, L + 0.012, 0.02), 0.006, W + 0.002, C("grey"), rot=(0, R(90), 0))
    parts = [s.strip() for s in str(text).split("|")] if text else ["COFFEE 4.50", "RENT 900.00", "PHONE 65.00", "SUBS 38.99", "FEES 12.00", "TOTAL $1,020.49"]
    items, total = parts[:-1], parts[-1]
    z = T + 0.0002
    txt(r, "RECEIPT", (0, L - 0.035, z), 0.009, C("ink"), ext=0.0001, width=W - 0.02)
    for i, it in enumerate(items[:12]):
        a, _, b = it.rpartition(" ")
        y = L - 0.07 - i * 0.03
        txt(r, a or it, (-W / 2 + 0.006, y, z), 0.0055, C("ink"), ext=0.0001, align="LEFT")
        if a:
            txt(r, b, (W / 2 - 0.006, y, z), 0.0055, C("ink"), ext=0.0001, align="RIGHT")
    cube(r, "rule", (0, 0.075, T + 0.00005), (W - 0.01, 0.0008, 0.0001), C("ink"), 0)
    txt(r, total, (0, 0.045, z), 0.012, C("ink"), ext=0.00015, width=W - 0.008)
    return _done(r, loc, rz, scale)


def make_shopping_cart(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    """side view (length along X, handle at +X)"""
    r = _start("shopping_cart")
    L, Wd, z0, H = 0.85, 0.52, 0.45, 0.45
    ch = C("chrome")
    wgrid(r, "floor", (0, 0, z0), L, Wd, ch, nx=12, ny=7)
    for s in (1, -1):
        wgrid(r, "side", (0, s * Wd / 2, z0 + H / 2), L, H, ch, rot=(R(90), 0, 0), nx=12, ny=6)
        wgrid(r, "end", (s * L / 2, 0, z0 + H / 2), Wd, H, ch, rot=(R(90), 0, R(90)), nx=7, ny=6)
        cyl(r, "rim", (0, s * Wd / 2, z0 + H), 0.008, L, ch, rot=(0, R(90), 0), v=12)
        cyl(r, "rim", (s * L / 2, 0, z0 + H), 0.008, Wd, ch, rot=FRONT, v=12)
        cyl(r, "arm", (L / 2 + 0.06, s * Wd / 2, z0 + H + 0.05), 0.009, 0.156, ch, rot=(0, math.atan2(0.12, 0.1), 0), v=12)
        cyl(r, "rail", (0, s * (Wd / 2 - 0.03), 0.08), 0.01, L, ch, rot=(0, R(90), 0), v=12)
        for sx in (1, -1):
            x, y = sx * (L / 2 - 0.03), s * (Wd / 2 - 0.03)
            cyl(r, "leg", (x, y, (z0 + 0.08) / 2), 0.011, z0 - 0.08, ch, v=12)
            cyl(r, "wheel", (x, y, 0.055), 0.055, 0.035, C("black"), rot=FRONT, bev=0.008)
            cyl(r, "hubcap", (x, y, 0.055), 0.02, 0.04, C("grey"), rot=FRONT)
    cyl(r, "handle", (L / 2 + 0.12, 0, z0 + H + 0.1), 0.012, Wd + 0.04, ch, rot=FRONT, v=16)
    cyl(r, "grip", (L / 2 + 0.12, 0, z0 + H + 0.1), 0.018, Wd - 0.06, C("red"), rot=FRONT, bev=0.004)
    wgrid(r, "tray", (0, 0, 0.16), L - 0.1, Wd - 0.06, ch, nx=10, ny=5, thick=0.005)
    return _done(r, loc, rz, scale)


# ---------------------------------------------------------------- buildings / signs / charts
def make_rent_sign(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("rent_sign")
    cube(r, "post", (0, 0, 0.625), (0.07, 0.07, 1.25), C("wood"), 0.006)
    cube(r, "board", (0, -0.05, 0.98), (0.62, 0.03, 0.46), C("red"), 0.008)
    cube(r, "panel", (0, -0.066, 0.98), (0.56, 0.006, 0.4), C("white"), 0.002)
    body = str(text or "FOR RENT")
    if len(body) > 10 and " " in body and "\n" not in body:  # long → two lines split at the middle space
        sp = [i for i, ch in enumerate(body) if ch == " "]
        k = min(sp, key=lambda i: abs(i - len(body) / 2))
        body = body[:k] + "\n" + body[k + 1:]
    txt(r, body, (0, -0.075, 1.02), 0.13, C("red"), rot=FRONT, ext=0.006, width=0.52)
    txt(r, "CALL 555-0100", (0, -0.072, 0.83), 0.035, C("ink"), rot=FRONT, ext=0.003, width=0.4)
    return _done(r, loc, rz, scale)


def make_house_small(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("house_small")
    cube(r, "base", (0, 0, 0.1), (6.3, 5.3, 0.2), C("stone_dk"), 0.03)
    cube(r, "walls", (0, 0, 1.6), (6, 5, 2.8), C("wall"), 0.03)
    prism(r, "roof", [(-2.9, 3.0), (2.9, 3.0), (0, 4.6)], -3.3, 3.3, C("roof"), "x", 0.04)
    cube(r, "chimney", (1.8, 0.8, 4.0), (0.5, 0.5, 1.4), C("brick"), 0.03)
    cube(r, "door", (0.9, -2.52, 1.25), (1.0, 0.1, 2.1), C("wood"), 0.02)
    ball(r, "knob", (1.25, -2.58, 1.2), (0.05, 0.05, 0.05), C("gold"))
    for x in (-1.6, 2.3):
        cube(r, "frame", (x, -2.52, 1.8), (1.12, 0.06, 1.12), C("white"), 0.01)
        cube(r, "glass", (x, -2.555, 1.8), (1.0, 0.02, 1.0), C("win"), 0)
        cube(r, "bar_v", (x, -2.57, 1.8), (0.06, 0.02, 1.0), C("white"), 0)
        cube(r, "bar_h", (x, -2.57, 1.8), (1.0, 0.02, 0.06), C("white"), 0)
    if text:
        txt(r, text, (0.9, -2.6, 2.6), 0.3, C("ink"), rot=FRONT, ext=0.03, width=1.4)
    return _done(r, loc, rz, scale)


def make_bank_building(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None):
    r = _start("bank_building")
    for i, (w, d) in enumerate(((8.6, 6.2), (8.3, 5.9), (8.0, 5.6))):
        cube(r, "step", (0, 0, 0.075 + i * 0.15), (w, d, 0.15), C("stone_dk"), 0.02)
    cube(r, "core", (0, 0.5, 2.75), (7.2, 4.4, 4.6), C("stone"), 0.03)
    cube(r, "door", (0, -1.72, 1.65), (1.2, 0.1, 2.4), C("wood"), 0.02)
    for x in (-2.0, 2.0):
        cube(r, "window", (x, -1.72, 2.2), (0.9, 0.1, 1.6), C("dark"), 0.02)
    for i in range(6):
        x = -3.25 + i * 1.3
        cube(r, "col_base", (x, -2.3, 0.55), (0.75, 0.75, 0.2), C("stone"), 0.02)
        cyl(r, "column", (x, -2.3, 2.5), 0.28, 3.7, C("stone"), v=24)
        cube(r, "capital", (x, -2.3, 4.475), (0.8, 0.8, 0.25), C("stone"), 0.02)
    cube(r, "entablature", (0, -0.05, 4.95), (8.2, 5.5, 0.7), C("stone"), 0.03)
    txt(r, text or "BANK", (0, -2.83, 4.95), 0.5, C("gold"), rot=FRONT, ext=0.04, width=6.0)
    prism(r, "pediment", [(-4.15, 5.3), (4.15, 5.3), (0, 6.7)], -2.8, 2.7, C("stone"), "y", 0.03)
    cyl(r, "emblem", (0, -2.83, 5.85), 0.42, 0.06, C("gold"), rot=FRONT, bev=0.01)
    txt(r, "$", (0, -2.88, 5.85), 0.55, C("gold_dk"), rot=FRONT, ext=0.02)
    return _done(r, loc, rz, scale)


def make_bar_chart_3d(loc=(0, 0, 0), rz=0.0, scale=1.0, text=None, heights=None):
    """3–6 bars (tallest = 1 m). text "2,4,7" sets heights (+ value labels); any other text = label on the base.
    Last bar green when the trend goes up, red when it goes down."""
    r = _start("bar_chart_3d")
    lab, vals = None, None
    if heights:
        vals = [float(h) for h in heights]
    elif text:
        try:
            vals = [float(s.strip().replace("$", "").replace("%", "")) for s in str(text).split(",") if s.strip()]
            lab = [s.strip() for s in str(text).split(",") if s.strip()]
        except ValueError:
            vals = None
    vals = (vals or [0.35, 0.55, 0.45, 0.8, 1.0])[:8]
    top = max(max(vals), 1e-6)
    hs = [max(0.04, 1.0 * v / top) for v in vals]
    n, bw, gap = len(hs), 0.18, 0.07
    tot = n * bw + (n - 1) * gap
    cube(r, "base", (0, 0, 0.025), (tot + 0.16, 0.36, 0.05), C("grey"), 0.01)
    last = "green" if vals[-1] >= vals[0] else "red"
    for i, h in enumerate(hs):
        x = -tot / 2 + bw / 2 + i * (bw + gap)
        cube(r, f"bar{i}", (x, 0, 0.05 + h / 2), (bw, bw, h), C(last if i == n - 1 else "blue"), 0.012)
        if lab:
            txt(r, lab[i], (x, 0, 0.05 + h + 0.06), 0.07, C("ink"), rot=FRONT, ext=0.008, width=bw + gap)
    if text and not lab:
        txt(r, text, (0, -0.185, 0.025), 0.035, C("white"), rot=FRONT, ext=0.004, width=tot)
    return _done(r, loc, rz, scale)


PROPS = {
    "cash_stack": make_cash_stack, "banknote": make_banknote, "coin_pile": make_coin_pile, "gold_coin": make_gold_coin,
    "gold_bar": make_gold_bar, "money_bag": make_money_bag, "credit_card": make_credit_card, "phone": make_phone,
    "calculator": make_calculator, "atm": make_atm, "piggy_bank": make_piggy_bank, "wallet": make_wallet,
    "safe": make_safe, "padlock": make_padlock, "price_tag": make_price_tag, "receipt_long": make_receipt_long,
    "shopping_cart": make_shopping_cart, "rent_sign": make_rent_sign, "house_small": make_house_small,
    "bank_building": make_bank_building, "bar_chart_3d": make_bar_chart_3d,
}
# default display scale in the scene template when no hero_size is given (real size × SHOW → readable next to Dave)
SHOW = {
    "cash_stack": 4, "banknote": 4, "coin_pile": 4, "gold_coin": 8, "gold_bar": 3, "money_bag": 2, "credit_card": 6,
    "phone": 4, "calculator": 4, "atm": 1, "piggy_bank": 3, "wallet": 4, "safe": 1, "padlock": 8, "price_tag": 6,
    "receipt_long": 2.5, "shopping_cart": 1, "rent_sign": 1, "house_small": 0.3, "bank_building": 0.25, "bar_chart_3d": 1,
}
