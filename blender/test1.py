"""test1 (1-minute v6 test, pipeline/episodes/test1.json): every pose STATE of every 3D shot as one still, plus
transparent Dave cut-outs for the home-base shots. Remotion (src/v6/Test1.tsx) holds/cuts them on the voice.
blender -b -P blender/test1.py -- --assets A --tex T --out O --frames <state,state,...|all> [--samples 32] [--res 1920x1080]
Props come straight from each line (props-from-script): tax form, chalkboard triangles, "30 DAYS", DAY 1 chalk,
the maths textbook, the desk he falls asleep on."""
import sys, os
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import K, R, setup, Classroom, Dave, lights, cam, render, text3d, POSES  # noqa: E402

args = setup(sys.argv[sys.argv.index("--") + 1:])
room = Classroom()
lights()
dave = Dave()
TURN = R(28)
SEAT = room.seat + 0.03
form = dave.prop("taxform", (0.26, 0.34), "taxform.png")
cover = dave.prop("book", (0.2, 0.26), "book_math.png")
pages = dave.prop("pages", (0.46, 0.3), "book_pages.png")
bill = dave.prop("bill", (0.26, 0.34), "rent_bill.png")
days = text3d("30 DAYS", (-0.6, -1.05, 0), (R(90), 0, R(24)), 0.5, __import__("lib").flat("days_white", (0.97, 0.97, 0.95), 0.3, 0.3, emit=0.35), dave.coll, extrude=0.09)

CAM = {
    "wide": cam("wide", (1.3, -2.6, 0.9), (-0.1, 0.1, 0.85), 24),
    "close": cam("close", (0.8, -1.2, 1.15), (-0.15, 0.25, 1.08), 34),
    "hero": cam("hero", (1.0, -1.95, 0.3), (0.1, -0.3, 0.9), 17),
    "days": cam("days", (1.5, -3.2, 0.95), (-0.05, -0.6, 0.6), 24),
    "board": cam("board", (-0.75, 1.15, 1.45), (-1.3, 3.0, 1.55), 30),
    "desk": cam("desk", (1.05, -1.75, 1.25), (-0.05, -0.3, 0.75), 28),
    "cut": cam("cut", (0, -1.5, 1.25), (0, 0, 1.22), 40),
}
FORM = {"hold": ((0.25, -0.28, 0.4), (72, 0, -14)), "look": ((0.25, -0.28, 0.4), (72, 0, -14)), "panic": ((0.28, -0.26, 0.6), (80, 0, -10))}


def reset():
    dave.outfit_name = "hoodie"
    room.show(True)
    dave.show(True)
    dave.flash(False)
    room.seat_dave(TURN)
    room.board("chalkboard.png")
    days.hide_render = True
    for o in dave.props.values():
        o.hide_render = True


def sit(pose, face, drop=False, shake=(0, 0)):
    dave.place((0, -0.04, SEAT), TURN)
    dave.legs_set("sit", SEAT)
    dave.pose(pose, shake)
    dave.face(face, drop)
    if pose in FORM:
        loc, r = FORM[pose]
        form.hide_render = False
        form.location = Vector(loc) + Vector((shake[0], 0, shake[1]))
        form.rotation_euler = (R(r[0]), R(r[1]), R(r[2]) + shake[0] * 4)


def stand(pose, face, loc=(0.25, -0.55), turn=R(22)):
    dave.place((loc[0], loc[1], 0.72), turn)
    dave.legs_set("stand")
    dave.pose(pose)
    dave.face(face)


def desk_in_front():
    # his desk slides in front of him (local -Y), book on top
    room.desk.location = (0.6 * __import__("math").sin(TURN), -0.04 - 0.6 * __import__("math").cos(TURN), 0)
    top = room.desk_top - SEAT
    return top


def cutout(pose, face):
    room.show(False)
    dave.place((0, 0, 0.72), 0)
    dave.legs_set("stand")
    dave.pose(pose)
    dave.face(face)


STATES = {}


def state(name, camera, transparent=False):
    def deco(fn):
        STATES[name] = (fn, camera, transparent)
        return fn
    return deco


# t1 "twelve years … triangle … taxes" — the TaxShot grammar
@state("t1_hold", "wide")
def _(): sit("hold", "neutral")
@state("t1_shock", "wide")
def _(): sit("hold", "shock", drop=True)
@state("t1_flash", "close")
def _(): sit("look", "spiral"); dave.flash(True)
@state("t1_look", "close")
def _(): sit("look", "spiral", drop=True)
@state("t1_panic", "wide")
def _(): sit("panic", "panic", drop=True)
@state("t1_panic_b", "wide")
def _(): sit("panic", "panic", drop=True, shake=(0.014, 0.01))


# t3 "I went back." — low hero angle, fists
@state("t3_stand", "hero")
def _(): stand("idle", "neutral")
@state("t3_flash", "hero")
def _(): stand("fists", "determined"); dave.flash(True)
@state("t3_fists", "hero")
def _(): stand("fists", "determined")


# t4 "thirty days" — giant outlined 3D text on the classroom floor, Dave points at it
@state("t4_days", "days")
def _(): days.hide_render = False; stand("point_l", "grin", loc=(0.5, -0.75), turn=R(26))
@state("t4_days_small", "days")
def _():
    days.hide_render = False
    days.scale = (0.6, 0.6, 0.6)
    stand("idle", "neutral", loc=(0.5, -0.75), turn=R(26))
@state("t4_days_big", "days")
def _():
    days.hide_render = False
    days.scale = (1.12, 1.12, 1.12)
    stand("point_l", "grin", loc=(0.5, -0.75), turn=R(26))


# t6 "Day one." — chalk on the board
@state("t6_board", "board")
def _(): room.board("chalk_day1.png"); dave.show(False)


# t7 "Math class. Finally numbers." — cheering at his desk with the maths book
@state("t7_math", "desk")
def _():
    top = desk_in_front()
    sit("cheer", "grin")
    cover.hide_render = False
    cover.location, cover.rotation_euler = (0.02, -0.55, top + 0.005), (0, 0, R(8))


# t9 "zero interest … by page ten" — asleep on the open textbook
@state("t9_sleep", "desk")
def _():
    top = desk_in_front()
    sit("sleep", "sleep")
    pages.hide_render = False
    pages.location, pages.rotation_euler = (0.0, -0.52, top + 0.004), (0, 0, R(-6))


# t10 "I already want to drop out" — slid down the chair
@state("t10_slump", "wide")
def _():
    sit("slump", "dead")
    dave.root.location.z -= 0.08


# t8 "a train that leaves Chicago at three" — problem on the board, then Dave stares at it
@state("t8_board", "board")
def _(): room.board("chalk_train.png"); dave.show(False)
@state("t8_stare", "close")
def _(): room.board("chalk_train.png"); sit("look", "think")


# t8 "...the train that leaves your bank account every month called rent" — RENT bill instead of the tax form
def rent_pose(shake=(0, 0)):
    room.board("chalk_train.png")
    sit("panic", "shock", drop=True, shake=shake)
    form.hide_render = True
    bill.hide_render = False
    loc, r = FORM["panic"]
    bill.location = Vector(loc) + Vector((shake[0], 0, shake[1]))
    bill.rotation_euler = (R(r[0]), R(r[1]), R(r[2]) + shake[0] * 4)
@state("t8_rent", "wide")
def _(): rent_pose()
@state("t8_rent_b", "wide")
def _(): rent_pose((0.014, 0.01))


# t9 "I searched the whole textbook" — hunched over the open book
@state("t9_search", "desk")
def _():
    top = desk_in_front()
    sit("read", "think")
    pages.hide_render = False
    pages.location, pages.rotation_euler = (0.0, -0.52, top + 0.004), (0, 0, R(-6))


# home-base cut-outs (transparent PNG, the reference's "character in the corner")
CUTS = [("point_l", "grin", "hoodie"), ("shrug", "neutral", "hoodie"), ("point_you", "smug", "hoodie"), ("count", "think", "hoodie"), ("cheer", "grin", "hoodie"),
        ("idle", "dead", "hoodie"), ("panic", "shock", "hoodie"), ("point_l", "determined", "hoodie"),
        ("point_you", "smug", "professor"), ("point_l", "grin", "professor")]  # t5 "I am writing that class myself" → professor
for pose, face, out in CUTS:
    def mk(p=pose, f=face, o=out):
        def fn():
            dave.outfit(o)
            cutout(p, f)
        return fn
    STATES[f"cut_{pose}_{face}" + ("" if out == "hoodie" else f"_{out}")] = (mk(), "cut", True)

want = args.get("--frames", "all")
names = list(STATES) if want == "all" else [n for n in want.split(",") if n in STATES]
print("states", names, flush=True)
for nm in names:
    fn, camera, transp = STATES[nm]
    reset()
    days.scale = (1, 1, 1)
    fn()
    if transp:
        K.sc.render.resolution_x, K.sc.render.resolution_y = int(K.H * 0.8), K.H
    else:
        K.sc.render.resolution_x, K.sc.render.resolution_y = K.W, K.H
    render(nm, CAM[camera], transp)
