"""Synthesised SFX (owner 29 Oct 2026: "rich on sound effects with the perfect moments… each video should generate
its own needed sound effects" — STYLE_3D §0.12). 100 % made by us → no licence trouble (LICENSES.md).

  py pipeline/sfx_synth.py            the shared kit → public/sfx/<name>.wav (never overwrites an existing file)
  py pipeline/sfx_synth.py <id>       the video's own plan pipeline/sfx/<id>.json → public/sfx/<id>/<name>.wav
                                      cue in the TSX as {src: '<id>/<name>', at: <frame of the exact event>}

Plan format: {"sounds": [{"name": "till_open", "recipe": "cash", "params": {"pitch": 1.1}}, …]}
Recipes (params in brackets, all optional): whoosh [dur lo hi] · impact [weight 0..1, metal 0..1] · tick_roll [dur speed_up]
pop [pitch] · swish [dur] · chalk [dur] · page · typing [dur rate] · cash · coin [n] · ding [pitch] · bell [pitch dur]
buzz [dur pitch] · phone [dur] · crowd [dur mood: murmur|cheer|gasp|laugh] · steps [n rate surface: hard|soft]
riser [dur] · drop [dur] · glitch [dur] · heartbeat [n bpm] · rain [dur] · wind [dur] · thud · snap · slide [dur]
boing [pitch] · zip [dur up] · stamp · paper [dur] · clock [n] · alarm [dur] · fire [dur] · water [dur] · glass
school_bell [dur] · train_horn [dur] · snore [n period] · bark [n] · whimper [dur] · pencil [dur] · crickets [dur n]
"""
import json, os, sys, wave
import numpy as np

SR = 48000
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
rng = np.random.default_rng(7)
T = lambda d: np.arange(int(d * SR)) / SR


def env(n, a=0.002, d=0.05):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


def lowpass(x, k):
    k = max(1, int(k))
    return np.convolve(x, np.ones(k) / k, "same")


def noise(d):
    return rng.normal(0, 1, int(d * SR))


def tone(f, d, shape="sin"):
    t = T(d)
    ph = 2 * np.pi * np.cumsum(np.broadcast_to(f, t.shape)) / SR
    return np.sin(ph) if shape == "sin" else np.sign(np.sin(ph)) * 0.6


def pad(x, d):
    out = np.zeros(int(d * SR))
    out[: min(len(x), len(out))] = x[: len(out)]
    return out


def mixat(base, x, t):
    s = max(0, int(t * SR))
    e = min(len(base), s + len(x))
    if s < len(base):
        base[s:e] += x[: e - s]
    return base


# ---------------------------------------------------------------- recipes
def r_whoosh(dur=0.35, lo=400, hi=4000):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x, out, y = noise(dur), np.zeros(n), 0.0
    for i in range(n):
        a = (lo + (hi - lo) * np.sin(np.pi * t[i] / dur)) / SR * 6
        y += min(a, 1) * (x[i] - y)
        out[i] = y
    return out * np.sin(np.pi * t / dur) ** 2


def r_swish(dur=0.35):
    return r_whoosh(dur, 400, 4000)


def r_slide(dur=0.25):
    return r_whoosh(dur, 300, 1800) * 0.7


def r_impact(weight=0.7, metal=0.0):
    d = 0.5 + weight * 0.4
    t = T(d)
    body = np.sin(2 * np.pi * (45 + 120 * (1 - weight) + 90 * np.exp(-t * 25)) * t) * env(len(t), 0.001, 0.08 + 0.12 * weight)
    crack = lowpass(noise(d), 2 + 10 * weight) * env(len(t), 0.0005, 0.02)
    ring = sum(np.sin(2 * np.pi * f * t) for f in (523, 811, 1307)) * env(len(t), 0.001, 0.25) * metal * 0.3
    return body + crack * 0.8 + ring


def r_thud():
    return r_impact(0.9, 0)


def r_tick(f=3200, d=0.012):
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * 0.7 + rng.normal(0, 0.3, n)) * env(n, 0.0005, d)


def r_tick_roll(dur=1.4, speed_up=0.7):
    x = np.zeros(int((dur + 0.3) * SR))
    t, i = 0.0, 0
    while t < dur:
        gap = 0.075 - 0.05 * (t / dur) ** speed_up
        mixat(x, r_tick(2600 + (i % 3) * 300), t)
        t += gap
        i += 1
    tt = T(0.25)
    land = np.sin(2 * np.pi * 1320 * tt) * env(len(tt), 0.001, 0.08) + np.sin(2 * np.pi * 1980 * tt) * env(len(tt), 0.001, 0.06) * 0.5
    return mixat(x, land * 1.6, dur)


def r_pop(pitch=1.0):
    t = T(0.12)
    return np.sin(2 * np.pi * (900 + 1800 * np.exp(-t * 40)) * pitch * t) * env(len(t), 0.001, 0.035)


def r_snap():
    n = int(0.09 * SR)
    return rng.normal(0, 1, n) * env(n, 0.0005, 0.012) + np.sin(2 * np.pi * 2400 * np.arange(n) / SR) * env(n, 0.0005, 0.02)


def r_chalk(dur=0.6):
    n = int(dur * SR)
    x = np.diff(np.concatenate([[0], noise(dur)])) * (0.5 + 0.5 * np.abs(np.sin(np.arange(n) / SR * 2 * np.pi * 9)))
    return x * env(n, 0.01, dur)


def r_page():
    n = int(0.28 * SR)
    return lowpass(noise(0.28), 18) * env(n, 0.01, 0.07)


def r_paper(dur=0.5):
    x = np.zeros(int(dur * SR))
    for k in range(int(dur * 14)):
        mixat(x, lowpass(noise(0.04), 4) * env(int(0.04 * SR), 0.001, 0.01) * rng.uniform(0.3, 1), rng.uniform(0, dur - 0.05))
    return x


def r_typing(dur=1.0, rate=11):
    x = np.zeros(int(dur * SR))
    t = 0.0
    while t < dur - 0.05:
        click = lowpass(noise(0.03), 3) * env(int(0.03 * SR), 0.0003, 0.006) + r_tick(rng.uniform(1800, 2600), 0.004) * 0.4
        mixat(x, click * rng.uniform(0.6, 1), t)
        t += rng.uniform(0.6, 1.4) / rate
    return x


def r_ding(pitch=1.0):
    t = T(0.9)
    return sum(np.sin(2 * np.pi * f * pitch * t) * a for f, a in ((1320, 1), (2640, 0.4), (3960, 0.15))) * env(len(t), 0.001, 0.3)


def r_bell(pitch=1.0, dur=1.5):
    t = T(dur)
    return sum(np.sin(2 * np.pi * f * pitch * t) * a for f, a in ((660, 1), (1663, 0.5), (2795, 0.3), (4180, 0.15))) * env(len(t), 0.001, dur / 3)


def r_coin(n=1):
    x = np.zeros(int((0.12 * n + 0.6) * SR))
    for k in range(n):
        t = T(0.5)
        c = (np.sin(2 * np.pi * 4200 * t) + 0.6 * np.sin(2 * np.pi * 6100 * t) + 0.4 * np.sin(2 * np.pi * 8300 * t)) * env(len(t), 0.0005, 0.12)
        mixat(x, c * rng.uniform(0.6, 1), k * rng.uniform(0.07, 0.14))
    return x


def r_cash():
    x = np.zeros(int(1.0 * SR))
    mixat(x, r_impact(0.3, 0.6) * 0.5, 0)  # drawer
    mixat(x, r_bell(1.6, 0.8) * 0.8, 0.05)
    mixat(x, r_coin(4) * 0.5, 0.25)
    return x


def r_buzz(dur=0.5, pitch=110):
    return tone(pitch, dur, "sq") * env(int(dur * SR), 0.005, dur) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 12 * T(dur))))


def r_phone(dur=1.2):
    t = T(dur)
    on = (np.sin(2 * np.pi * 2.5 * t) > 0).astype(float)
    return lowpass(noise(dur), 2) * 0.2 * on + tone(180, dur, "sq") * on * 0.5


def r_crowd(dur=2.0, mood="murmur"):
    x = lowpass(noise(dur), 30) * 0.5
    t = T(dur)
    for k in range(40):  # voices: formant-ish bursts
        f = rng.uniform(140, 320)
        s = rng.uniform(0, dur)
        seg = np.sin(2 * np.pi * f * T(0.3) * (1 + 0.05 * np.sin(T(0.3) * 30))) * env(int(0.3 * SR), 0.05, 0.12)
        mixat(x, seg * 0.15, s)
    if mood == "cheer":
        x = x * 1.8 + lowpass(noise(dur), 6) * np.minimum(1, t * 3) * 0.7
    elif mood == "gasp":
        x = lowpass(noise(dur), 8) * env(len(t), 0.05, 0.4)
    elif mood == "laugh":
        x = x + sum(np.sin(2 * np.pi * rng.uniform(180, 260) * t) * (np.sin(2 * np.pi * rng.uniform(5, 7) * t) > 0.3) * 0.08 for _ in range(6))
    return x * np.minimum(1, t * 6) * np.minimum(1, (dur - t) * 4)


def r_steps(n=8, rate=2.2, surface="hard"):
    x = np.zeros(int((n / rate + 0.3) * SR))
    for k in range(n):
        st = lowpass(noise(0.08), 6 if surface == "hard" else 25) * env(int(0.08 * SR), 0.001, 0.02 if surface == "hard" else 0.04)
        mixat(x, st * rng.uniform(0.7, 1), k / rate + rng.uniform(-0.01, 0.01))
    return x


def r_riser(dur=1.0):
    t = T(dur)
    f = 200 + 1600 * (t / dur) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.5 + rng.normal(0, 0.25, len(t))) * (t / dur) ** 1.5


def r_drop(dur=0.8):
    t = T(dur)
    f = 900 * np.exp(-t * 4) + 60
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, dur / 2)


def r_glitch(dur=0.4):
    x = np.zeros(int(dur * SR))
    for k in range(10):
        seg = (tone(rng.uniform(200, 3000), 0.03, "sq") + noise(0.03) * 0.5) * rng.uniform(0.3, 1)
        mixat(x, seg, rng.uniform(0, dur - 0.04))
    return x


def r_heartbeat(n=3, bpm=90):
    x = np.zeros(int((n * 60 / bpm + 0.4) * SR))
    for k in range(n):
        b = r_impact(0.95, 0) * 0.8
        mixat(x, b, k * 60 / bpm)
        mixat(x, b * 0.6, k * 60 / bpm + 0.18)
    return x


def r_rain(dur=3.0):
    x = lowpass(noise(dur), 3) * 0.25
    for k in range(int(dur * 80)):
        mixat(x, r_tick(rng.uniform(3000, 7000), 0.002) * rng.uniform(0.05, 0.25), rng.uniform(0, dur))
    return x


def r_wind(dur=3.0):
    t = T(dur)
    return lowpass(noise(dur), 60) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.3 * t)) * np.minimum(1, t * 2) * np.minimum(1, (dur - t) * 2)


def r_boing(pitch=1.0):
    t = T(0.6)
    return np.sin(2 * np.pi * np.cumsum(220 * pitch * (1 + 0.5 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 4))) / SR) * env(len(t), 0.002, 0.25)


def r_zip(dur=0.3, up=True):
    t = T(dur)
    f = (300 + 2500 * t / dur) if up else (2800 - 2500 * t / dur)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, dur)


def r_stamp():
    x = r_impact(0.6, 0.1)
    return mixat(x, r_snap() * 0.3, 0)


def r_clock(n=4):
    x = np.zeros(int((n * 0.5 + 0.2) * SR))
    for k in range(n):
        mixat(x, r_tick(2000 if k % 2 else 2600, 0.01), k * 0.5)
    return x


def r_alarm(dur=1.5):
    t = T(dur)
    return np.sin(2 * np.pi * (880 + 220 * (np.sin(2 * np.pi * 4 * t) > 0)) * t) * 0.6 * np.minimum(1, (dur - t) * 5)


def r_fire(dur=3.0):
    x = lowpass(noise(dur), 40) * 0.4
    for k in range(int(dur * 25)):
        mixat(x, r_snap() * rng.uniform(0.05, 0.3), rng.uniform(0, dur))
    return x


def r_water(dur=2.0):
    x = lowpass(noise(dur), 15) * 0.3
    for k in range(int(dur * 12)):
        t = T(0.06)
        mixat(x, np.sin(2 * np.pi * rng.uniform(400, 1200) * (1 + t * 8) * t) * env(len(t), 0.001, 0.02) * 0.4, rng.uniform(0, dur))
    return x


def r_glass():
    t = T(1.0)
    shards = sum(np.sin(2 * np.pi * rng.uniform(2500, 7000) * t) * env(len(t), 0.0005, rng.uniform(0.05, 0.3)) * rng.uniform(0.1, 0.4) for _ in range(12))
    return shards + lowpass(noise(1.0), 2) * env(len(t), 0.0005, 0.03)


def r_school_bell(dur=1.6):
    t = T(dur)
    ring = r_bell(1.25, dur) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 22 * t)))  # electric bell: struck 22×/s
    return ring * np.minimum(1, (dur - t) * 6)


def r_train_horn(dur=1.4):
    t = T(dur)
    chord = sum(tone(f, dur, "sq") * a for f, a in ((311, 1), (370, 0.8), (466, 0.7)))
    return lowpass(chord, 6) * np.minimum(1, t * 12) * np.minimum(1, (dur - t) * 5)


def r_snore(n=2, period=1.8):
    x = np.zeros(int((n * period + 0.2) * SR))
    for k in range(n):
        d = period * 0.6
        t = T(d)
        rasp = lowpass(noise(d), 4) * (0.5 + 0.5 * np.sin(2 * np.pi * 38 * t)) * np.sin(np.pi * t / d)
        mixat(x, rasp, k * period)
        mixat(x, lowpass(noise(period * 0.3), 30) * 0.3 * np.sin(np.pi * T(period * 0.3) / (period * 0.3)), k * period + d)
    return x


def r_bark(n=1):
    x = np.zeros(int((n * 0.35 + 0.3) * SR))
    for k in range(n):
        t = T(0.18)
        f = 520 * np.exp(-t * 6) + 280
        b_ = (np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.4 * lowpass(noise(0.18), 3)) * env(len(t), 0.003, 0.06)
        mixat(x, b_, k * 0.33)
    return x


def r_whimper(dur=0.9):
    t = T(dur)
    f = 900 - 350 * t / dur + 30 * np.sin(2 * np.pi * 7 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / dur) * 0.6


def r_pencil(dur=0.8):
    n = int(dur * SR)
    return lowpass(np.diff(np.concatenate([[0], noise(dur)])), 2) * (0.4 + 0.6 * (np.sin(np.arange(n) / SR * 2 * np.pi * 5) > 0)) * env(n, 0.01, dur)


def r_crickets(dur=1.6, n=4):
    """awkward silence: a few cricket chirps (pulsed 4.5 kHz trills)"""
    x = np.zeros(int(dur * SR))
    for k in range(n):
        t0 = k * dur / n + rng.uniform(0, 0.08)
        for j in range(3):
            c = tone(4500 + rng.uniform(-150, 150), 0.045) * env(int(0.045 * SR), 0.003, 0.02)
            mixat(x, c, t0 + j * 0.06)
    return x


RECIPES = {k[2:]: v for k, v in globals().items() if k.startswith("r_")}


def save(path, x, gain=0.8):
    x = np.asarray(x, np.float64)
    x = x / (np.abs(x).max() + 1e-9) * gain
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())


# the shared kit (names already cued by Test1 / AnimTest)
KIT = {"count_roll": ("tick_roll", {}), "count_roll_short": ("tick_roll", {"dur": 0.7}), "riser_up": ("riser", {}),
       "swish": ("swish", {}), "swish_fast": ("swish", {"dur": 0.18}), "chalk": ("chalk", {}), "pageflip": ("page", {}),
       "pop_hi": ("pop", {}), "snap_white": ("snap", {}), "thump_low": ("impact", {"weight": 1.0}), "slide": ("slide", {})}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        vid = sys.argv[1]
        plan = json.load(open(os.path.join(ROOT, "pipeline", "sfx", f"{vid}.json"), encoding="utf-8"))
        for s in plan["sounds"]:
            save(os.path.join(ROOT, "public", "sfx", vid, s["name"] + ".wav"), RECIPES[s["recipe"]](**s.get("params", {})), s.get("gain", 0.8))
            print(vid, s["name"], s["recipe"])
    else:
        for name, (rec, prm) in KIT.items():
            path = os.path.join(ROOT, "public", "sfx", name + ".wav")
            if not os.path.exists(path):  # never overwrite an existing kit sound
                save(path, RECIPES[rec](**prm))
                print("kit", name)
