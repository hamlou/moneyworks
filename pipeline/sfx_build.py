import subprocess
import wave
from pathlib import Path

import numpy as np

SR = 48000
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "src"
OUT = ROOT / "public" / "sfx"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)


def find(name):
    hits = sorted(SRC.rglob(name))
    if not hits:
        raise SystemExit(f"missing asset {name}")
    return hits[0]


def load(name, start=0.0, dur=None):
    a = ["ffmpeg", "-v", "error"]
    if start:
        a += ["-ss", str(start)]
    a += ["-i", str(find(name))]
    if dur:
        a += ["-t", str(dur)]
    a += ["-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(a, check=True, capture_output=True).stdout, dtype=np.float32).copy()


def trim(x, th=0.02):
    i = np.where(np.abs(x) > th * np.max(np.abs(x)))[0]
    return x[max(0, i[0] - 48):] if len(i) else x


def fade(x, fo=0.03, fi=0.002):
    n, m = int(fo * SR), int(fi * SR)
    if len(x) > n + m:
        x[-n:] *= np.linspace(1, 0, n) ** 2
        x[:m] *= np.linspace(0, 1, m)
    return x


def save(name, x, peak=0.89):
    x = fade(np.asarray(x, np.float32))
    x = x / (np.max(np.abs(x)) or 1) * peak
    with wave.open(str(OUT / f"{name}.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
    print(f"  {name}.wav {len(x) / SR:.2f}s")


def mix(*xs):
    o = np.zeros(max(len(x) for x in xs), np.float32)
    for x in xs:
        o[: len(x)] += x
    return o


def delay(x, s):
    return np.concatenate([np.zeros(int(s * SR), np.float32), x])


def env(n, attack, decay):
    t = np.arange(n) / SR
    return np.where(t < attack, (t / attack) ** 2, np.exp(-(t - attack) / decay)).astype(np.float32)


def reverb(x, wet=0.25, tail=0.8):
    y = np.concatenate([x, np.zeros(int(tail * SR), np.float32)])
    out = y.copy()
    for d, g in [(0.029, 0.5), (0.037, 0.45), (0.041, 0.42), (0.053, 0.38)]:
        n = int(d * SR)
        buf = y.copy()
        for k in range(1, 12):
            out[n * k:] += buf[: len(buf) - n * k] * (g ** k) * wet
    return out


def band_sweep(n, f0, f1, shape):
    noise = rng.standard_normal(n).astype(np.float32)
    t = np.linspace(0, 1, n)
    fc = f0 + (f1 - f0) * shape(t)
    a = 1 - np.exp(-2 * np.pi * fc / SR)
    b = 1 - np.exp(-2 * np.pi * fc * 0.3 / SR)
    y1 = y2 = h = 0.0
    o = np.empty(n, np.float32)
    for i in range(n):
        y1 += a[i] * (noise[i] - y1)
        y2 += a[i] * (y1 - y2)
        h += b[i] * (y2 - h)
        o[i] = y2 - h
    return o


def whoosh(d=0.6, f0=250, f1=4200, pk=0.55):
    n = int(d * SR)
    x = band_sweep(n, f0, f1, lambda t: np.sin(np.pi * np.clip(t / (pk * 2), 0, 1)) ** 1.4)
    t = np.linspace(0, 1, n)
    e = np.where(t < pk, (t / pk) ** 2.2, np.exp(-(t - pk) * 7))
    return reverb(x * e, 0.18, 0.4)


def tone(freqs, d, decay, amps=None):
    t = np.arange(int(d * SR)) / SR
    amps = amps or [1] * len(freqs)
    return (sum(a * np.sin(2 * np.pi * f * t) for f, a in zip(freqs, amps)) * np.exp(-t / decay)).astype(np.float32)


def pluck(f, d=1.2):
    return tone([f, 2 * f, 3 * f], d, 0.35, [1, 0.35, 0.12]) * env(int(d * SR), 0.004, 10)


print("building sfx:")
save("pop", trim(load("drop_002.ogg")))
save("pop2", trim(load("drop_003.ogg")), 0.8)
save("thud", trim(load("impactPunch_heavy_000.ogg")))
save("flutter", mix(trim(load("cloth1.ogg")), delay(trim(load("cloth2.ogg")), 0.12)))
save("step", trim(load("footstep_concrete_001.ogg")), 0.7)
save("clank", mix(trim(load("metalLatch.ogg")), delay(trim(load("impactMetal_heavy_001.ogg")), 0.18)))
save("coin", trim(load("handleCoins2.ogg")), 0.8)
save("buzz", trim(load("error_006.ogg")))
save("key", trim(load("switch_002.ogg")), 0.6)
save("key2", trim(load("switch_005.ogg")), 0.6)
save("click", trim(load("switch_007.ogg")))
save("tick", trim(load("tick_001.ogg")))
save("stamp", mix(trim(load("impactPlank_medium_000.ogg")), trim(load("impactPunch_medium_001.ogg")) * 0.6))
save("crinkle", mix(trim(load("cloth3.ogg")), delay(trim(load("cloth4.ogg")), 0.1)))
save("paper", trim(load("card-slide-3.ogg")))
save("flip", trim(load("bookFlip2.ogg")))
save("sting", trim(load("confirmation_004.ogg")))
scr = [trim(load(f"scratch_00{i}.ogg")) for i in (1, 2, 3, 4, 5, 2, 4)]
save("scribble", np.concatenate(scr)[: int(1.4 * SR)], 0.7)
save("marker", np.concatenate(scr[:3])[: int(0.8 * SR)], 0.6)
save("draw", trim(load("scratch_003.ogg")), 0.6)

save("whoosh", whoosh(0.62))
save("whoosh_s", whoosh(0.45, 400, 3000, 0.5), 0.7)

bell = tone([2093, 2093 * 2.76, 2093 * 5.4], 0.9, 0.28, [1, 0.4, 0.15])
save("cash", mix(trim(load("handleCoins.ogg")) * 0.9, delay(reverb(bell, 0.2, 0.5), 0.07)))
save("ding", reverb(mix(tone([2637, 5274], 0.7, 0.18, [1, 0.3]), delay(tone([3951, 7902], 0.7, 0.2, [0.8, 0.2]), 0.06)), 0.3, 0.6), 0.7)

notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.5]
harp = mix(*[delay(pluck(f), i * 0.07) for i, f in enumerate(notes)])
save("dream", mix(reverb(harp, 0.35, 1.0), whoosh(0.9, 200, 2500, 0.6) * 0.25), 0.75)

n = int(0.45 * SR)
t = np.arange(n) / SR
thump = np.sin(2 * np.pi * (90 * t - 60 * t * t)) * np.exp(-t / 0.08)
burst = band_sweep(n, 2500, 300, lambda u: u) * np.exp(-t / 0.12)
save("poof", reverb((thump * 0.8 + burst * 1.6).astype(np.float32), 0.25, 0.5))

n = int(0.7 * SR)
t = np.arange(n) / SR
fr = 170 * (1 + 0.45 * np.exp(-t * 5) * np.sin(2 * np.pi * 11 * t))
ph = 2 * np.pi * np.cumsum(fr) / SR
save("boing", ((np.sin(ph) + 0.3 * np.sin(2 * ph)) * np.exp(-t / 0.22)).astype(np.float32), 0.7)

def lowpass(x, fc):
    a = 1 - np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    s = 0.0
    for i in range(len(x)):
        s += a * (x[i] - s)
        y[i] = s
    return y


def add_at(buf, x, t):
    i = int(t * SR)
    buf[i:i + len(x)] += x[: max(0, len(buf) - i)]


sp = np.zeros(int(1.7 * SR), np.float32)
for k, (t0, amp) in enumerate([(0, 1), (0.16, 0.9), (0.3, 1), (0.52, 0.8), (0.62, 0.7), (0.9, 0.6), (1.05, 0.4)]):
    n = int(0.11 * SR)
    burst = lowpass(rng.standard_normal(n).astype(np.float32), 260) * np.exp(-np.arange(n) / SR / 0.035) * amp
    add_at(sp, burst * 6, t0)
add_at(sp, trim(load("impactMetal_medium_002.ogg")) * 0.6, 1.25)
save("sputter", sp)

cr = np.zeros(int(1.6 * SR), np.float32)
for t0 in (0.05, 0.75):
    for j in range(3):
        n = int(0.045 * SR)
        tt = np.arange(n) / SR
        add_at(cr, (np.sin(2 * np.pi * 4600 * tt) * np.sin(np.pi * tt / 0.045)).astype(np.float32), t0 + j * 0.07)
save("cricket", reverb(cr, 0.2, 0.3), 0.5)

tb = []
for fq, d, vib in [(392, 0.32, 0), (370, 0.32, 0), (349, 0.32, 0), (330, 1.0, 1)]:
    n = int(d * SR)
    tt = np.arange(n) / SR
    fr = fq * (1 + vib * 0.03 * np.sin(2 * np.pi * 6 * tt))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    w = sum((0.8 ** h) * np.sin(h * ph) for h in range(1, 9))
    e = np.minimum(1, tt / 0.03) * np.where(tt > d - 0.06, (d - tt) / 0.06, 1)
    tb.append((lowpass((w * e).astype(np.float32), 1800)))
save("trombone", reverb(np.concatenate(tb), 0.15, 0.4), 0.8)

save("chime", reverb(mix(pluck(523.25), delay(pluck(659.25), 0.09), delay(pluck(783.99), 0.18), delay(pluck(1046.5), 0.27)), 0.3, 0.9), 0.6)

n = int(0.4 * SR)
tt = np.arange(n) / SR
crk = (rng.random(n) < 0.08).astype(np.float32) * rng.standard_normal(n).astype(np.float32)
rip = band_sweep(n, 1800, 5200, lambda u: u) * (0.5 + crk * 3) * np.exp(-tt / 0.2)
save("rip", rip.astype(np.float32))

hb = np.zeros(int(0.9 * SR), np.float32)
for t0 in (0, 0.26):
    n = int(0.3 * SR)
    tt = np.arange(n) / SR
    add_at(hb, (np.sin(2 * np.pi * (58 - 20 * tt) * tt) * np.exp(-tt / 0.07)).astype(np.float32), t0)
save("heart", hb)

save("mail", mix(trim(load("card-slide-1.ogg")), delay(trim(load("card-slide-5.ogg")), 0.08), delay(trim(load("card-place-2.ogg")), 0.2)))
save("crowd", mix(*[delay(trim(load(f"footstep0{i}.ogg")) * 0.8, i * 0.07) for i in range(10)]))

duck = list(SRC.glob("duck*.wav"))
if duck:
    q = trim(load(duck[0].name), 0.08)[: int(0.75 * SR)]
    save("quack", q)
else:
    print("  WARN no duck source; using boing as quack")
    save("quack", ((np.sin(ph * 2.2)) * np.exp(-t / 0.15)).astype(np.float32))
print("done")
