"""Synthesised SFX for v6 (owner 29 Oct: "the video is very poor of sound effects"). Writes public/sfx/<name>.wav.
count_roll = rapid number-roll ticks that speed up and land (play with every Counter), riser_up, swish, chalk, pageflip,
pop_hi, snap_white (pose-swap flash), thump_low (3D cut accent), slide (card slide-in)."""
import wave, numpy as np, os
SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
r = np.random.default_rng(7)


def save(name, x, gain=0.8):
    x = x / (np.abs(x).max() + 1e-9) * gain
    with wave.open(os.path.join(OUT, name + ".wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def env(n, a=0.002, d=0.05):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)


def tick(f=3200, d=0.012):
    n = int(0.03 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * 0.7 + r.normal(0, 0.3, n)) * env(n, 0.0005, d)


def count_roll(dur=1.4):
    x = np.zeros(int((dur + 0.3) * SR)); t = 0.0; i = 0
    while t < dur:
        gap = 0.075 - 0.05 * (t / dur) ** 0.7
        s = int(t * SR); k = tick(2600 + (i % 3) * 300)
        x[s:s + len(k)] += k[: len(x) - s]; t += gap; i += 1
    s = int(dur * SR); n = int(0.25 * SR); tt = np.arange(n) / SR
    land = np.sin(2 * np.pi * 1320 * tt) * env(n, 0.001, 0.08) + np.sin(2 * np.pi * 1980 * tt) * env(n, 0.001, 0.06) * 0.5
    x[s:s + n] += land * 1.6
    return x


def riser(d=1.0):
    n = int(d * SR); t = np.arange(n) / SR
    f = 200 + 1600 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.5 + r.normal(0, 0.25, n)) * (t / d) ** 1.5


def swish(d=0.35, lo=400, hi=4000):
    n = int(d * SR); t = np.arange(n) / SR
    noise = r.normal(0, 1, n); out = np.zeros(n); y = 0.0
    for i in range(n):
        a = (lo + (hi - lo) * np.sin(np.pi * t[i] / d)) / SR * 6
        y += min(a, 1) * (noise[i] - y); out[i] = y
    return out * np.sin(np.pi * t / d) ** 2


def chalk(d=0.6):
    n = int(d * SR); x = r.normal(0, 1, n)
    x = np.diff(np.concatenate([[0], x])) * (0.5 + 0.5 * np.abs(np.sin(np.arange(n) / SR * 2 * np.pi * 9)))
    return x * env(n, 0.01, d)


def pageflip():
    n = int(0.28 * SR); x = r.normal(0, 1, n)
    return np.convolve(x, np.ones(18) / 18, "same") * env(n, 0.01, 0.07)


def pop_hi():
    n = int(0.12 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (900 + 1800 * np.exp(-t * 40)) * t) * env(n, 0.001, 0.035)


def snap_white():
    n = int(0.09 * SR); return r.normal(0, 1, n) * env(n, 0.0005, 0.012) + np.sin(2 * np.pi * 2400 * np.arange(n) / SR) * env(n, 0.0005, 0.02)


def thump_low():
    n = int(0.4 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (55 + 90 * np.exp(-t * 25)) * t) * env(n, 0.002, 0.14)


save("count_roll", count_roll())
save("count_roll_short", count_roll(0.7))
save("riser_up", riser(), 0.6)
save("swish", swish(), 0.7)
save("swish_fast", swish(0.18), 0.7)
save("chalk", chalk(), 0.5)
save("pageflip", pageflip(), 0.6)
save("pop_hi", pop_hi(), 0.6)
save("snap_white", snap_white(), 0.5)
save("thump_low", thump_low(), 0.9)
save("slide", swish(0.25, 300, 1800), 0.5)
print("ok")
