"""Slow the episode voice (atempo 0.9) and open a music-only breath before every chapter (beats c<N>_01).
Writes public/<ep>/voice.flac + src/v6/<ep>_timing.json (beat/word times shifted, in unslowed seconds like the voice json).
Usage: py tools/voice_gaps.py ea1 [gap_seconds_on_screen=4] [--tempo 0.9] [--maxgap S] [--beat <beat_id>]
  --tempo   atempo factor (Shorts: 1.0 = no slow-down)
  --maxgap  SHORTS (SHORTS.md [MUST] §2): every silence between two words longer than S on-screen seconds is cut down to S,
            leading silence is cut to 0.05 s, trailing silence to 0.15 s (clean loop)
  --beat    the ONE planned beat: the silence right before this beat's first word is set to exactly maxgap"""
import json, subprocess, sys
import numpy as np, soundfile as sf
import os, shutil

opt = {sys.argv[i][2:]: sys.argv[i + 1] for i in range(1, len(sys.argv) - 1) if sys.argv[i].startswith("--")}
pos = [a for i, a in enumerate(sys.argv[1:], 1) if not a.startswith("--") and not sys.argv[i - 1].startswith("--")]
ep, gap = pos[0], float(pos[1]) if len(pos) > 1 else 4.0
tempo = float(opt.get("tempo", 0.9))
maxgap = float(opt["maxgap"]) if "maxgap" in opt else None
beat_id = opt.get("beat")
FF = "C:/Users/hp/AppData/Local/Programs/Python/Python313/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
if not os.path.exists(FF):  # GitHub runner (episode.yml): apt ffmpeg
    FF = shutil.which("ffmpeg") or "ffmpeg"
tmp = f"public/{ep}/_slow.wav"
subprocess.run([FF, "-v", "error", "-y", "-i", f"pipeline/voice/{ep}.flac"] + (["-af", f"atempo={tempo}"] if tempo != 1.0 else []) + [tmp], check=True)
a, sr = sf.read(tmp, dtype="float32")
V = json.load(open(f"pipeline/voice/{ep}.json", encoding="utf8"))
cuts = [b["start"] for b in V["beats"] if b["id"].endswith("_01") and b["id"].startswith("c")] if gap > 0 else []
g0 = gap * tempo  # gap in unslowed seconds
out, last, shift = [], 0, 0.0
for c in cuts:
    i = int((c - 0.15) / tempo * sr)
    out += [a[last:i], np.zeros((int(gap * sr),) + a.shape[1:], dtype=a.dtype)]
    last = i
out.append(a[last:])
a = np.concatenate(out)
for b in V["beats"]:
    k = sum(1 for c in cuts if b["start"] >= c - 0.15) * g0
    b["start"] += k
    b["end"] += k
    for w in b.get("words", []):
        w["start"] += k
        w["end"] += k
V["total"] += len(cuts) * g0
V["gaps"] = [c - 0.15 + n * g0 for n, c in enumerate(cuts)]

if maxgap is not None:  # Shorts: cut every silence > maxgap (on-screen seconds), one planned beat = exactly maxgap
    W = [(w, b["id"], j == 0) for b in V["beats"] for j, w in enumerate(b.get("words", []))]
    ops = []  # (slowed-time position, delta seconds): delta < 0 = cut, > 0 = inserted silence
    if W:
        lead = W[0][0]["start"] / tempo
        if lead > 0.05:
            ops.append((0.0, -(lead - 0.05)))
    mono = a if a.ndim == 1 else a.mean(axis=1)
    def quiet_span(t0, t1):  # owner 9 Nov: words got cut → only cut where the audio is REALLY silent
        i0, i1 = int(t0 * sr), int(t1 * sr)
        seg = np.abs(mono[i0:i1])
        if len(seg) == 0:
            return t0, t0
        loud = np.where(seg > 0.02 * (np.abs(mono).max() or 1))[0]
        half = len(seg) // 2
        left, right = loud[loud < half], loud[loud >= half]
        q0 = t0 + (left[-1] + 1) / sr + 0.03 if len(left) else t0   # tail of the previous word still sounding
        q1 = t0 + right[0] / sr - 0.03 if len(right) else t1         # next word already starting
        return q0, max(q0, q1)
    for (w1, _, _), (w2, bid, first) in zip(W, W[1:]):
        # padding: whisper word ends are early → keep 0.12 s after the end, 0.05 s before the next start
        e1, s2 = w1["end"] / tempo + 0.12, w2["start"] / tempo - 0.05
        if s2 - e1 <= 0.02:
            continue
        q0, q1 = quiet_span(e1, s2)
        e1, s2 = max(e1, q0), min(s2, q1)
        g = s2 - e1
        tgt = maxgap if (beat_id and bid == beat_id and first) else min(g, maxgap)
        if g > tgt + 0.01:
            ops.append((e1 + tgt / 2, tgt - g))
    tail_from = (W[-1][0]["end"] / tempo + 0.35) if W else len(a) / sr
    pieces, cur = [], 0
    for p, d in sorted(ops):
        i = int(p * sr)
        if d < 0:
            pieces.append(a[cur:i])
            cur = i + int(-d * sr)
        else:
            pieces += [a[cur:i], np.zeros((int(d * sr),) + a.shape[1:], dtype=a.dtype)]
            cur = i
    pieces.append(a[cur:int(tail_from * sr)])
    a = np.concatenate(pieces)

    def m(t):  # unslowed time → new unslowed time
        ts = t / tempo
        return (ts + sum(d if d > 0 else max(d, -(ts - p)) if ts > p else 0 for p, d in ops)) * tempo

    for b in V["beats"]:
        for w in b.get("words", []):
            w["start"], w["end"] = m(w["start"]), m(w["end"])
        if b.get("words"):
            b["start"], b["end"] = b["words"][0]["start"], b["words"][-1]["end"]
        else:
            b["start"], b["end"] = m(b["start"]), m(b["end"])
    V["total"] = len(a) / sr * tempo
    V["maxgap"] = maxgap

sf.write(f"public/{ep}/voice.flac", a, sr)
json.dump(V, open(f"src/v6/{ep}_timing.json", "w", encoding="utf8"))
os.remove(tmp)
print(len(cuts), "gaps; total on screen", round(V["total"] / tempo, 1), "s" + (f" (silences ≤ {maxgap} s)" if maxgap is not None else ""))
