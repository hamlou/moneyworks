"""Slow the episode voice (atempo 0.9) and open a music-only breath before every chapter (beats c<N>_01).
Writes public/<ep>/voice.flac + src/v6/<ep>_timing.json (beat/word times shifted, in unslowed seconds like the voice json).
Usage: py tools/voice_gaps.py ea1 [gap_seconds_on_screen=4]"""
import json, subprocess, sys
import numpy as np, soundfile as sf
ep, gap = sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else 4.0
FF = "C:/Users/hp/AppData/Local/Programs/Python/Python313/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
tmp = f"public/{ep}/_slow.wav"
subprocess.run([FF, "-v", "error", "-y", "-i", f"pipeline/voice/{ep}.flac", "-af", "atempo=0.9", tmp], check=True)
a, sr = sf.read(tmp, dtype="float32")
V = json.load(open(f"pipeline/voice/{ep}.json", encoding="utf8"))
cuts = [b["start"] for b in V["beats"] if b["id"].endswith("_01") and b["id"].startswith("c")]
g0 = gap * 0.9  # gap in unslowed seconds
out, last, shift = [], 0, 0.0
for c in cuts:
    i = int((c - 0.15) / 0.9 * sr)
    out += [a[last:i], np.zeros((int(gap * sr),) + a.shape[1:], dtype=a.dtype)]
    last = i
out.append(a[last:])
sf.write(f"public/{ep}/voice.flac", np.concatenate(out), sr)
for b in V["beats"]:
    k = sum(1 for c in cuts if b["start"] >= c - 0.15) * g0
    b["start"] += k
    b["end"] += k
    for w in b.get("words", []):
        w["start"] += k
        w["end"] += k
V["total"] += len(cuts) * g0
V["gaps"] = [c - 0.15 + n * g0 for n, c in enumerate(cuts)]
json.dump(V, open(f"src/v6/{ep}_timing.json", "w", encoding="utf8"))
import os; os.remove(tmp)
print(len(cuts), "gaps; total on screen", round(V["total"] / 0.9, 1), "s")
