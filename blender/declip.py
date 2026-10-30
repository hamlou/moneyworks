"""No body part inside another (owner 30 Oct 2026: "hand inside a stomach").
Pure python (no bpy) so tools/clipcheck.py can test every pose offline. Points are (x, y, z) in Dave's body frame;
Dave faces -Y, so a limb crossing the body is pushed forward (-Y), never through it."""
import math

MARGIN = 0.008


def _sub(a, b): return (a[0] - b[0], a[1] - b[1], a[2] - b[2])
def _add(a, b): return (a[0] + b[0], a[1] + b[1], a[2] + b[2])
def _mul(a, k): return (a[0] * k, a[1] * k, a[2] * k)
def _dot(a, b): return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
def _len(a): return math.sqrt(_dot(a, a))


def closest(p, a, b):
    """closest point on segment ab to p and its parameter t"""
    ab = _sub(b, a)
    L = _dot(ab, ab)
    t = 0.0 if L < 1e-12 else max(0.0, min(1.0, _dot(_sub(p, a), ab) / L))
    return _add(a, _mul(ab, t)), t


def on_poly(p, pts, rads):
    """closest point on a tube polyline + the tube radius there"""
    best = None
    for i in range(len(pts) - 1):
        q, t = closest(p, pts[i], pts[i + 1])
        d = _len(_sub(p, q))
        if best is None or d < best[0]:
            best = (d, q, rads[i] + (rads[i + 1] - rads[i]) * t)
    return best


def _push(p, q, need, fallback=(0.0, -1.0, 0.0)):
    d = _sub(p, q)
    L = _len(d)
    if L >= need:
        return p, 0.0
    if L < 1e-6:
        d, L = fallback, 1.0
    return _add(q, _mul(d, need / L)), need - L


def solve(arms, arm_r, torso, torso_r, head_c, head_r, legs=None, leg_r=None, hand_r=0.042, iters=14):
    """arms = {'l': [pts], 'r': [pts]} (point 0 = shoulder, last = hand); *_r = radius per point.
    Returns new arms (lists of tuples). Points near the shoulder are allowed inside the torso (that is the joint)."""
    arms = {s: [tuple(p) for p in pts] for s, pts in arms.items()}
    n = len(next(iter(arms.values())))
    for _ in range(iters):
        # smooth first (no kinks), then the constraints below have the last word — keep the tube smooth after pushes (no kinks), shoulder + hand stay where the solver put them
        for pts in arms.values():
            for i in range(1, n - 1):
                mid = _mul(_add(pts[i - 1], pts[i + 1]), 0.5)
                pts[i] = _add(_mul(pts[i], 0.7), _mul(mid, 0.3))
        for s, pts in arms.items():
            side = -1.0 if s == "l" else 1.0
            for i in range(1, n):
                ar = max(arm_r[i], hand_r) if i == n - 1 else arm_r[i]
                ramp = min(1.0, (i - 1) / 3.0)
                p = pts[i]
                d, q, tr = on_poly(p, torso, torso_r)
                fb = (side * 0.3, -1.0, 0.0)
                p, _ = _push(p, q, ramp * (tr + ar) + MARGIN * ramp, fb)
                if i >= 2:
                    p, _ = _push(p, head_c, head_r + ar + MARGIN)
                if legs and i >= 3:
                    for lp in legs.values():
                        d, q, lr = on_poly(p, lp, leg_r)
                        p, _ = _push(p, q, lr + ar + MARGIN, (side, -0.4, 0.0))
                pts[i] = p
        # arm vs arm: the forearm/hand further from its own shoulder moves forward
        ls, rs = arms.get("l"), arms.get("r")
        if ls and rs:
            for i in range(3, n):
                for A, B in ((ls, rs), (rs, ls)):
                    d, q, br = on_poly(A[i], B[2:], arm_r[2:])
                    need = arm_r[i] + br + MARGIN
                    if d < need:  # push apart along the gap (each arm takes half; the other side runs next)
                        A[i], _ = _push(A[i], q, d + (need - d) * 0.6, (0.0, -1.0, 0.0))
    return arms


def depth(arms, arm_r, torso, torso_r, head_c, head_r, legs=None, leg_r=None, hand_r=0.042, sub=4):
    """worst penetration (m) of any arm sample into torso / head / legs / other arm (shoulder region excluded)"""
    worst, where = 0.0, ""
    for s, pts in arms.items():
        n = len(pts)
        for i in range(2, n - 1):
            for k in range(sub):
                t = k / sub
                p = _add(pts[i], _mul(_sub(pts[i + 1], pts[i]), t))
                ar = arm_r[i]
                if i >= 4:
                    d, q, tr = on_poly(p, torso, torso_r)
                    worst, where = max((worst, where), (tr + ar - d, f"{s}{i} torso"))
                d = _len(_sub(p, head_c))
                worst, where = max((worst, where), (head_r + ar - d, f"{s}{i} head"))
                if legs and i >= 4:
                    for lp in legs.values():
                        d, q, lr = on_poly(p, lp, leg_r)
                        worst, where = max((worst, where), (lr + ar - d, f"{s}{i} leg"))
                o = arms["r" if s == "l" else "l"]
                if i >= 4:
                    d, q, br = on_poly(p, o[3:], arm_r[3:])
                    worst, where = max((worst, where), (ar + br - d, f"{s}{i} arm"))
        hand = pts[-1]
        d, q, tr = on_poly(hand, torso, torso_r)
        worst, where = max((worst, where), (tr + hand_r - d, f"{s} hand torso"))
    return worst, where
