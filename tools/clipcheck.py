"""Offline check: does any pose (and every in-between of every pose pair) put a limb inside Dave's body?
Usage: py tools/clipcheck.py [--fixed]   (reads POSES/OUTFITS from blender/lib.py + shot scripts, no Blender needed)"""
import ast, itertools, math, re, sys
from pathlib import Path

B = Path(__file__).resolve().parent.parent / "blender"
sys.path.insert(0, str(B))
import declip  # noqa: E402

src = (B / "lib.py").read_text(encoding="utf8")


def block(name):
    i = src.index(name + " = {")
    j, depth = i + len(name) + 3, 0
    for k in range(j, len(src)):
        depth += {"{": 1, "}": -1}.get(src[k], 0)
        if depth == 0:
            return src[j:k + 1]


env = {"dict": dict, "True": True, "None": None}
POSES = eval(block("POSES"), env)
OUTFITS = eval(block("OUTFITS"), env)
for f in ("ea1.py", "anim.py", "test1.py"):
    p = B / f
    if p.exists():
        for m in re.finditer(r'^POSES\["(\w+)"\] = (dict\(.*\))$', p.read_text(encoding="utf8"), re.M):
            POSES[m.group(1)] = eval(m.group(2), env)

NECK, HIP = (0, 0, 0.44), (0, 0, 0)
SH = {"l": (-0.05, 0, 0.38), "r": (0.05, 0, 0.38)}
HP = {"l": (-0.06, 0, 0), "r": (0.06, 0, 0)}
PROF_T = {True: [1.12, 1.16, 1.12, 1.04, 0.96, 0.86, 0.7], False: [1.0, 1.0, 1.0, 1.0, 0.98, 0.92, 0.8]}
PROF_A = [0.85, 0.95, 1.0, 1.05, 1.08, 1.0, 1.14, 0.98, 1.1]
PROF_L = [1.1, 1.05, 1.0, 0.98, 1.02, 1.06, 0.98, 1.12, 1.0]


def bend(a, b, c, n=9):
    k = tuple(2 * b[i] - (a[i] + c[i]) / 2 for i in range(3))
    return [tuple((1 - t) ** 2 * a[i] + 2 * (1 - t) * t * k[i] + t * t * c[i] for i in range(3)) for t in [j / (n - 1) for j in range(n)]]


def rotx(v, deg):
    a = math.radians(deg)
    return (v[0], v[1] * math.cos(a) - v[2] * math.sin(a), v[1] * math.sin(a) + v[2] * math.cos(a))


def blend(A, Bp, t):
    I = POSES["idle"]
    out = {k: tuple(x + (y - x) * t for x, y in zip(A.get(k) or I.get(k, (0, 0, 0)), Bp.get(k) or I.get(k, (0, 0, 0)))) for k in ("el", "hl", "er", "hr", "head")}
    out["lean"] = A.get("lean", 0) + (Bp.get("lean", 0) - A.get("lean", 0)) * t
    return out


def build(P, outfit):
    o = OUTFITS[outfit]
    up = lambda v: rotx(v, P.get("lean", 0))
    torso = [up(tuple(HIP[i] + (NECK[i] - HIP[i]) * k / 6 for i in range(3))) for k in range(7)]
    clothed = o["torso"][0] is not None
    tr = [o["torso"][1] * (PROF_T[bool(o.get("hood"))][k] if clothed else 1) for k in range(7)]
    ar = [o["arms"][1] * (PROF_A[k] if o["arms"][0] else 1) for k in range(9)]
    lr = [o["legs"][1] * (PROF_L[k] if o["legs"][0] else 1) for k in range(9)]
    arms = {}
    for s in "lr":
        e = P.get("e" + s) or POSES["idle"]["e" + s]
        h = P.get("h" + s) or POSES["idle"]["h" + s]
        arms[s] = bend(up(SH[s]), up(e), up(h))
    legs = {}
    for s in "lr":
        sx = -1 if s == "l" else 1
        hp = HP[s]
        legs[s] = bend(hp, (hp[0] + sx * 0.03, hp[1] - 0.02, hp[2] - 0.36), (sx * 0.1, 0, -0.7))
    head = up((NECK[0], NECK[1], NECK[2] + 0.2))
    return arms, ar, torso, tr, head, 0.21, legs, lr


def run(fixed):
    names = sorted(POSES)
    bad = []
    for outfit in ("hoodie", "suit", "doctor", "professor", "muscle", "none"):
        for a, b in itertools.product(names, names):
            if a > b:
                continue
            for t in (0.0, 0.25, 0.5, 0.75, 1.0) if a != b else (0.0,):
                arms, ar, torso, tr, head, hr, legs, lr = build(blend(POSES[a], POSES[b], t), outfit)
                if fixed:
                    arms = declip.solve(arms, ar, torso, tr, head, hr, legs, lr)
                d, w = declip.depth(arms, ar, torso, tr, head, hr, legs, lr)
                if d > 0.012:
                    bad.append((round(d, 3), outfit, a if a == b else f"{a}->{b}@{t}", w))
    bad.sort(reverse=True)
    print(f"{'AFTER declip' if fixed else 'BEFORE'}: {len(bad)} clipping cases")
    for x in bad[:15]:
        print("  ", x)
    return len(bad)


if __name__ == "__main__":
    run(False)
    sys.exit(1 if run(True) else 0)
