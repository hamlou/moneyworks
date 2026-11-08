"""SWIPE-KILLER GATE for Shorts (SHORTS_MUST.md §2). Runs on GitHub after the render (ffmpeg only, no GPU).
py tools/shortgate.py <video.mp4> [report.md]   → exit 1 if any MUST fails, prints every failure with its second.
Checks: frame 0 not black/faded · first speech ≤ 0.3 s · no silence > 0.35 s (except one ≤ 0.6 s beat) ·
no static picture > 1.5 s (> 1.0 s in the first 3 s) · 25-45 s · loudness ≈ -14 LUFS · last frame ≈ first frame (loop)."""
import re, subprocess, sys


def ff(args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-nostats", *args], capture_output=True, text=True, errors="replace").stderr


def main():
    v = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else None
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", v], capture_output=True, text=True).stdout)
    F, W = [], []
    if not 25 <= d <= 45:
        F.append(f"length {d:.1f} s — Shorts must be 25-45 s (every Short > 89 s died)")
    # frame 0
    y0 = re.findall(r"YAVG:([\d.]+)", ff(["-i", v, "-frames:v", "1", "-vf", "signalstats,metadata=print", "-f", "null", "-"]))
    if y0 and float(y0[0]) < 25:
        F.append(f"frame 0 is dark (luma {float(y0[0]):.0f}) — frame 0 must show the prize, no fade/black")
    # silences (voice+music mix: -35 dB)
    sl = ff(["-i", v, "-vn", "-af", "silencedetect=n=-35dB:d=0.3", "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", sl)]
    durs = [float(x) for x in re.findall(r"silence_duration: ([\d.]+)", sl)]
    beats = 0
    for s, du in zip(starts, durs):
        if s < 0.05 and du > 0.3:
            F.append(f"0.0 s: {du:.2f} s of silence before the first word (must speak by 0.3 s)")
        elif s + du >= d - 0.1:
            continue
        elif du > 0.6 or (du > 0.35 and beats >= 1):
            F.append(f"{s:.1f} s: dead air {du:.2f} s — cut it (max 0.3 s, one 0.6 s beat allowed)")
        elif du > 0.35:
            beats += 1
    # static picture
    fz = ff(["-i", v, "-an", "-vf", "fps=10,scale=270:-1,freezedetect=n=0.003:d=1.0", "-f", "null", "-"])
    for s, du in zip(re.findall(r"freeze_start: ([\d.]+)", fz), re.findall(r"freeze_duration: ([\d.]+)", fz)):
        s, du = float(s), float(du)
        if du > 1.5 or (s < 3 and du > 1.0):
            F.append(f"{s:.1f} s: picture frozen {du:.1f} s — new image every 1-2 s (≤ 1.0 s in the first 3 s)")
    # loudness
    lo = re.findall(r"I:\s+(-?[\d.]+) LUFS", ff(["-i", v, "-vn", "-af", "ebur128", "-f", "null", "-"]))
    if lo and not -16.5 <= float(lo[-1]) <= -12:
        W.append(f"loudness {lo[-1]} LUFS (target -14)")
    # loop: compare first and last frame
    ssim = re.findall(r"All:([\d.]+)", ff(["-i", v, "-sseof", "-0.1", "-i", v, "-filter_complex", "[0:v]trim=end_frame=1,setpts=PTS-STARTPTS[a];[1:v]trim=end_frame=1,setpts=PTS-STARTPTS[b];[a][b]ssim", "-f", "null", "-"]))
    if ssim and float(ssim[0]) < 0.45:
        W.append(f"last frame differs from frame 0 (SSIM {float(ssim[0]):.2f}) — loop feels like an ending, not a restart")
    rep = [f"# Short gate: {v.split('/')[-1]} ({d:.1f} s)", ""] + [f"- ✗ {x}" for x in F] + [f"- ⚠ {x}" for x in W] + (["- ✓ all MUST checks pass"] if not F else [])
    print("\n".join(rep))
    if out:
        open(out, "w", encoding="utf-8").write("\n".join(rep) + "\n")
    sys.exit(1 if F else 0)


if __name__ == "__main__":
    main()
