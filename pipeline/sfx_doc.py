"""DOCUMENTARY SOUND LIBRARY (owner 15 Nov 2026: "a full library of cool trendy sound effects… rich in sound effects").
  py pipeline/sfx_doc.py         → public/sfx/doc/<category>_<n>.wav  (100 % made by us → safe to monetise)
  py pipeline/sfx_doc.py list    → what is in the library (ours + the owner's packs)
Categories = what tools/doc.py asks for. Several variants each, so no sound repeats back to back.
OWNER PACKS: drop real recordings into public/sfx/lib/<category>/ (any .wav/.mp3) + a LICENSE.txt saying where they came
from and that commercial use is allowed. doc.py then prefers them over the synthesised ones in that category."""
import os, sys
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfx_synth as S
from sfx_synth import SR, T, env, lowpass, noise, tone, mixat, save

OUT = os.path.join(S.ROOT, "public", "sfx", "doc")
LIB = os.path.join(S.ROOT, "public", "sfx", "lib")
rng = np.random.default_rng(11)


def hp(x, k):
    return x - lowpass(x, k)


def tail(x, d=0.35, mix=0.35):
    """cheap room tail: a few decaying echoes → sounds 'cinematic' instead of dry"""
    out = np.concatenate([x, np.zeros(int(d * SR))])
    for i, dl in enumerate((0.031, 0.047, 0.073, 0.109, 0.151, 0.211)):
        s = int(dl * SR)
        y = lowpass(x, 6 + i * 6)[:len(x)] * mix * (0.72 ** i)
        out[s:s + len(y)] += y[:len(out) - s]
    return out


def sub(f0, f1, d, dec):
    t = T(d)
    f = f1 + (f0 - f1) * np.exp(-t * 9)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / dec)


def hit(w=1.0, bright=0.5):  # trailer hit: sub boom + noise crack + tail
    d = 1.6
    x = sub(140 * w, 38, d, 0.45) * 1.0
    crack = noise(0.12) * env(int(0.12 * SR), 0.001, 0.03)
    mixat(x, hp(crack, 40) * bright, 0)
    mixat(x, lowpass(noise(0.5), 60) * env(int(0.5 * SR), 0.002, 0.16) * 0.7, 0)
    return tail(np.tanh(x * 1.8), 0.5, 0.4)


def braam(f=55, d=2.2):  # the 'Inception' brass stab
    t = T(d)
    x = np.zeros(len(t))
    for k, a in ((1, 1), (2, .7), (3, .55), (4, .35), (5, .28), (6, .16), (8, .1)):
        x += a * np.sign(np.sin(2 * np.pi * f * k * t * (1 + 0.003 * np.sin(2 * np.pi * 5 * t)))) * 0.5
    x = lowpass(x, 14) * np.minimum(1, t / 0.05) * np.exp(-t / (d * 0.45))
    mixat(x, sub(90, 36, 1.2, 0.5) * 0.9, 0)
    return tail(np.tanh(x * 1.4), 0.6, 0.45)


def riser(d=1.5, kind=0):
    t = T(d)
    u = t / d
    n = hp(noise(d), 30 + int(200 * (1 - u.mean())))
    x = n * u ** 2.2 * 0.5
    f = (180 + kind * 60) * 2 ** (u * (2.0 + kind * 0.5))
    x += np.sin(2 * np.pi * np.cumsum(f) / SR) * u ** 1.6 * 0.35
    x *= 1 + 0.5 * np.sin(2 * np.pi * (4 + 14 * u) * t)  # accelerating tremolo
    x[-int(0.012 * SR):] *= np.linspace(1, 0, int(0.012 * SR))
    return x


def reverse(d=1.2):  # reverse cymbal/swell that sucks into a cut
    x = hp(noise(d), 12) * np.exp(-T(d) / (d * 0.3))
    x = tail(x, 0.2, 0.5)[::-1]
    return x[-int(d * SR):]


def whoosh(d=0.35, lo=300, hi=5000, air=0.3):
    x = S.r_whoosh(d, lo, hi)
    return x + hp(noise(d), 8) * np.sin(np.pi * T(d) / d) ** 3 * air * 0.3


def sub_drop(d=1.2):
    t = T(d)
    f = 110 * np.exp(-t * 2.4) + 28
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.01) * np.exp(-t / (d * 0.5)) * 1.6)


def tick(f=2400, d=0.02):
    return (tone(f, d) + hp(noise(d), 6) * 0.4) * env(int(d * SR), 0.0005, d / 3)


def typing(d=0.5, rate=16):
    x = np.zeros(int(d * SR))
    for i in range(int(d * rate)):
        k = (hp(noise(0.03), 10) * 0.8 + tone(rng.uniform(1500, 2600), 0.03) * 0.3) * env(int(0.03 * SR), 0.0005, 0.007)
        mixat(x, k * rng.uniform(0.6, 1), i / rate + rng.uniform(0, 0.012))
    return x


def blip(f=1200, up=True):
    t = T(0.09)
    fr = f * (1 + (0.5 if up else -0.3) * t / 0.09)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * env(len(t), 0.002, 0.03)


def stamp(w=1.0):
    x = sub(120 * w, 50, 0.5, 0.12) + lowpass(noise(0.5), 30) * env(int(0.5 * SR), 0.001, 0.05) * 0.9
    mixat(x, hp(noise(0.05), 20) * env(int(0.05 * SR), 0.0005, 0.01) * 0.5, 0)
    return tail(np.tanh(x * 2), 0.18, 0.25)


def paper(d=0.35):
    t = T(d)
    return hp(noise(d), 5) * (np.sin(np.pi * t / d) ** 2) * (0.6 + 0.4 * np.sin(2 * np.pi * rng.uniform(18, 30) * t)) * 0.7


def vault(w=1.0):  # heavy metal clunk + ring
    t = T(1.4)
    x = sub(100 * w, 45, 1.4, 0.2) * 1.2
    for f, a in ((312, .5), (521, .35), (843, .25), (1290, .15)):
        x += np.sin(2 * np.pi * f * w * t) * np.exp(-t / 0.35) * a
    mixat(x, hp(noise(0.04), 12) * env(int(0.04 * SR), 0.0005, 0.008), 0)
    return tail(np.tanh(x), 0.5, 0.4)


def glitch(d=0.3):
    x = np.zeros(int(d * SR))
    for _ in range(int(d * 40)):
        seg = (tone(rng.uniform(300, 5000), 0.012, "sq") + noise(0.012) * 0.6) * rng.uniform(0.3, 1)
        mixat(x, seg, rng.uniform(0, d - 0.02))
    return x


def heartbeat(bpm=72, n=4):
    x = np.zeros(int((n * 60 / bpm + 0.3) * SR))
    for i in range(n):
        for off, a in ((0, 1), (0.16, 0.7)):
            mixat(x, sub(75, 40, 0.3, 0.07) * a, i * 60 / bpm + off)
    return x


def drone(f=49, d=8.0):  # tension bed, loopable-ish
    t = T(d)
    x = sum(np.sin(2 * np.pi * f * k * t * (1 + 0.002 * np.sin(2 * np.pi * 0.21 * (k + 1) * t)) + k) / k for k in (1, 1.5, 2, 3))
    x += lowpass(noise(d), 200) * 6
    x *= 0.7 + 0.3 * np.sin(2 * np.pi * 0.13 * t)
    fade = int(0.8 * SR)
    x[:fade] *= np.linspace(0, 1, fade)
    x[-fade:] *= np.linspace(1, 0, fade)
    return x


def shimmer(f=880):  # soft bell for a reveal / gold tile
    t = T(1.4)
    x = sum(np.sin(2 * np.pi * f * k * t) * np.exp(-t / (0.5 / k)) * a for k, a in ((1, 1), (2.01, .5), (3.02, .3), (4.2, .15)))
    return tail(x * np.minimum(1, t / 0.004), 0.4, 0.4)


def tape_stop(d=0.5):
    t = T(d)
    f = 400 * (1 - t / d) ** 2 + 20
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 - t / d)


def static(d=0.4):
    return hp(noise(d), 4) * (rng.random(int(d * SR)) > 0.4) * np.sin(np.pi * T(d) / d) * 0.6


def count(d=1.2):
    return S.r_tick_roll(d, 0.7)


LIBRARY = {
    "hit": [lambda: hit(1.0, 0.5), lambda: hit(0.8, 0.8), lambda: hit(1.2, 0.3), lambda: hit(0.9, 0.6)],
    "braam": [lambda: braam(55), lambda: braam(46, 2.6), lambda: braam(62, 1.8)],
    "riser": [lambda: riser(1.0, 0), lambda: riser(1.0, 1), lambda: riser(1.0, 2)],
    "riser_long": [lambda: riser(2.0, 0), lambda: riser(2.0, 1)],
    "reverse": [lambda: reverse(1.0), lambda: reverse(1.0)],
    "whoosh": [lambda: whoosh(0.3, 300, 5000), lambda: whoosh(0.4, 200, 3500, 0.5), lambda: whoosh(0.25, 600, 7000, 0.2), lambda: whoosh(0.5, 150, 2500, 0.6), lambda: whoosh(0.35, 400, 6000)],
    "sub_drop": [lambda: sub_drop(1.2), lambda: sub_drop(0.9)],
    "tick": [lambda: tick(2400), lambda: tick(3000), lambda: tick(1900), lambda: tick(2700, 0.015)],
    "type": [lambda: typing(0.35, 18), lambda: typing(0.5, 15), lambda: typing(0.3, 20), lambda: typing(0.45, 17)],
    "blip": [lambda: blip(1200), lambda: blip(1500), lambda: blip(900), lambda: blip(1700, False)],
    "stamp": [lambda: stamp(1.0), lambda: stamp(0.85), lambda: stamp(1.15)],
    "paper": [lambda: paper(0.3), lambda: paper(0.4), lambda: paper(0.25), lambda: paper(0.35)],
    "vault": [lambda: vault(1.0), lambda: vault(0.8)],
    "glitch": [lambda: glitch(0.25), lambda: glitch(0.35), lambda: glitch(0.2)],
    "heartbeat": [lambda: heartbeat(72, 4), lambda: heartbeat(96, 6)],
    "drone": [lambda: drone(49), lambda: drone(41), lambda: drone(55)],
    "shimmer": [lambda: shimmer(880), lambda: shimmer(1175), lambda: shimmer(660)],
    "tape_stop": [lambda: tape_stop(0.5)],
    "static": [lambda: static(0.35), lambda: static(0.5)],
    "count": [lambda: count(0.9), lambda: count(1.3), lambda: count(0.7)],
    "circle": [lambda: S.r_chalk(0.4), lambda: S.r_pencil(0.45)],
    "coin": [lambda: S.r_coin(1), lambda: S.r_coin(3), lambda: S.r_cash()],
    "shutter": [lambda: S.r_shutter(1.0), lambda: S.r_shutter(1.15)],
}
GAIN = {"drone": 0.5, "heartbeat": 0.8, "tick": 0.6, "type": 0.6, "paper": 0.6, "blip": 0.55, "static": 0.5, "riser": 0.7, "riser_long": 0.7, "reverse": 0.7}


def inventory():
    inv = {}
    for cat in LIBRARY:
        own = sorted(f for f in os.listdir(os.path.join(LIB, cat)) if f.lower().endswith((".wav", ".mp3"))) if os.path.isdir(os.path.join(LIB, cat)) else []
        syn = sorted(f for f in os.listdir(OUT) if f.startswith(cat + "_") and f[len(cat) + 1:-4].isdigit()) if os.path.isdir(OUT) else []
        inv[cat] = [f"sfx/lib/{cat}/{f}" for f in own] + [f"sfx/doc/{f}" for f in syn]  # real recordings first, ours fill the gaps
    return inv


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "list":
        for c, fs in inventory().items():
            print(f"{c:11} {len(fs):2}  real {sum('/lib/' in f for f in fs)} + made by us {sum('/doc/' in f for f in fs)}")
    else:
        n = 0
        for cat, recs in LIBRARY.items():
            for i, r in enumerate(recs, 1):
                save(os.path.join(OUT, f"{cat}_{i}.wav"), r(), GAIN.get(cat, 0.85))
                n += 1
        for cat in LIBRARY:
            os.makedirs(os.path.join(LIB, cat), exist_ok=True)
        print(f"{n} sounds in {len(LIBRARY)} categories → public/sfx/doc/   (owner packs go in public/sfx/lib/<category>/)")
