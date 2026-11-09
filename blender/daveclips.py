"""Looping transparent Dave clips for the map Short (owner 9 Nov 2026, SHORTS_MUST §5: red hoodie always, clean motion).
blender -b -P blender/daveclips.py -- --assets A --tex T --out O --pose talk [--frames 1-48] [--samples 16] [--res 1080x1080] [--engine cycles|eevee]
→ O/<pose>_0001.png … RGBA, transparent film. 48 frames @ 24 fps, period = 48 frames: frame 49 would equal frame 1,
so the clip loops with no duplicated frame. Poses = existing POSES + in-betweens only (clipcheck-tested), feet fixed
on the ground (root never moves), level camera, declip on every frame."""
import sys, os, math

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
N = 48
THINK = dict(el=(0.2, -0.1, 0.2), hl=(0.06, -0.2, 0.52), er=(0.12, 0, 0.16), head=(-8, 0, 12))  # = ea1.py/auto.py "think"


def mix(A, B, t, I):
    out = {k: tuple(x + (y - x) * t for x, y in zip(A.get(k) or I.get(k, (0, 0, 0)), B.get(k) or I.get(k, (0, 0, 0)))) for k in ("el", "hl", "er", "hr", "head")}
    out["lean"] = A.get("lean", 0) + (B.get("lean", 0) - A.get("lean", 0)) * t
    return out


def clips(P):
    """pose -> (keypose A, keypose B, cycles per loop, face, talking, head sway deg). A and B are POSES or in-betweens."""
    I = P["idle"]
    up = mix(P["point_l"], P["cheer"], 0.5, I)  # left arm half way point_l→cheer = pointing up-left at the map
    up = dict(up, er=I["er"], hr=I["hr"], head=(-16, 0, -14))
    return {
        "talk": (P["hold"], mix(P["hold"], P["count"], 0.5, I), 2, "neutral", True, 3),
        "shock": (P["panic"], mix(P["panic"], P["cheer"], 0.2, I), 2, "shock", False, 2),
        "point": (up, mix(up, P["point_l"], 0.3, I), 2, "grin", True, 2),
        "laugh": (P["fists"], mix(P["fists"], P["shrug"], 0.35, I), 4, "grin", True, 4),
        "shrug": (mix(P["idle"], P["shrug"], 0.25, I), P["shrug"], 1, "smug", False, 3),
        "cheer": (mix(P["cheer"], P["fists"], 0.35, I), P["cheer"], 2, "grin", False, 3),
        "think": (THINK, mix(THINK, P["idle"], 0.15, I), 1, "think", True, 4),
        "worried": (mix(I, P["fists"], 0.6, I), mix(I, P["panic"], 0.3, I), 1, "panic", True, 3),
    }


def pose_at(spec, f, I):
    """pose dict for frame f (1-based); w = 0 at f=1 and after every full period → seamless loop"""
    A, B, cyc, _, _, sway = spec
    ph = 2 * math.pi * (f - 1) / N
    w = 0.5 - 0.5 * math.cos(ph * cyc)
    p = mix(A, B, w, I)
    hx, hy, hz = p["head"]
    p["head"] = (hx + 1.5 * math.sin(ph), hy, hz + sway * math.sin(ph + 1.0))
    return p


MOUTH = [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0]  # open/closed per 3-frame step, 16 steps = 48 frames


try:
    import bpy
except ImportError:
    bpy = None

if bpy:
    from lib import K, R, setup, Dave, cam, world_hdri, POSES
    args = setup(sys.argv[sys.argv.index("--") + 1:])
    sc = K.sc
    if args.get("--engine", "cycles") == "eevee":
        sc.render.engine = "BLENDER_EEVEE_NEXT"
        sc.eevee.taa_render_samples = int(args.get("--samples", "16"))
    sc.render.use_motion_blur = False
    POSE = args.get("--pose", "talk")
    SPEC = clips(POSES)[POSE]
    a, _, b = args.get("--frames", f"1-{N}").partition("-")
    FRAMES = range(int(a), int(b or a) + 1)

    world_hdri("studio", 1.0, 0)
    kl = bpy.data.objects.new("key", bpy.data.lights.new("key", "AREA"))
    sc.collection.objects.link(kl)
    kl.location, kl.rotation_euler = (1.5, -3, 3), (R(40), 0, R(20))
    kl.data.energy, kl.data.size = 500, 3
    sc.render.film_transparent = True
    st = sc.render.image_settings
    st.file_format, st.color_mode, st.color_depth = "PNG", "RGBA", "8"
    # level camera at belly height, full body: feet z=0 … head top z≈1.57 (cheer hands 1.47) in a 1.8 m square → ~6 % margin
    sc.camera = cam("clip", (0, -2.05, 0.82), (0, 0, 0.79), 40)

    d = Dave()
    d.outfit("hoodie")
    d.place((0, 0, 0.72), R(-18))  # 3/4 front; root never moves → feet stay planted (no floating)
    _, _, _, face, talking, _ = SPEC
    for f in FRAMES:
        d.legs_set("stand")
        d.pose(pose_at(SPEC, f, POSES["idle"]))  # pose() runs declip → no limb through the body
        d.live(f, face, talking)
        blink = 30 <= ((f - 1) % N) + 1 <= 32 and face not in ("dead", "spiral")
        step = ((f - 1) % N) // 3
        var = "b" if blink else ("o" if talking and MOUTH[step] else "c")
        d.sched[f] = f"{face}_{var}_{step % 3}.png"  # boil index cycles 3 × 16 = 48 → seamless
        sc.frame_set(f)
        sc.render.filepath = os.path.join(K.OUT, f"{POSE}_{f:04d}.png")
        bpy.ops.render.render(write_still=True)
        print("frame", POSE, f, flush=True)
