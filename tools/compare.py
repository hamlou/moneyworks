"""Objective video comparison (runs on GitHub Actions, never on the owner's PC).
py tools/compare.py report.md new.mp4 ref.mp4 [more.mp4 ...]
Measures per video: cuts (scene changes), pace in the hook, longest stretch with no new image,
frozen stretches (no motion >= 2 s), black frames, loudness (LUFS / true peak).
First video = the one being judged; each metric gets OK / WORSE vs the best reference."""
import json, re, subprocess, sys
from statistics import median


def ff(args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-nostats", *args], capture_output=True, text=True, errors="replace").stderr


def dur(v):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", v], capture_output=True, text=True)
    return float(r.stdout.strip())


def measure(v):
    d = dur(v)
    log = ff(["-i", v, "-an", "-vf", "fps=15,scale=320:-1,select='gt(scene,0.28)',showinfo", "-f", "null", "-"])
    cuts = [float(x) for x in re.findall(r"pts_time:([\d.]+)", log)]
    marks = [0.0, *cuts, d]
    gaps = [b - a for a, b in zip(marks, marks[1:])]
    hook = [c for c in cuts if c < 30]
    hm = [0.0, *hook, min(30.0, d)]
    hgaps = [b - a for a, b in zip(hm, hm[1:])]
    fz = ff(["-i", v, "-an", "-vf", "fps=10,scale=320:-1,freezedetect=n=0.002:d=2", "-f", "null", "-"])
    fdur = [float(x) for x in re.findall(r"freeze_duration: ([\d.]+)", fz)]
    bl = ff(["-i", v, "-an", "-vf", "fps=10,scale=320:-1,blackdetect=d=0.25:pix_th=0.06", "-f", "null", "-"])
    lo = ff(["-i", v, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
    lufs = re.findall(r"I:\s+(-?[\d.]+) LUFS", lo)
    tp = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", lo)
    return {
        "file": v.split("/")[-1],
        "minutes": round(d / 60, 2),
        "cuts_per_min": round(len(cuts) / d * 60, 1),
        "median_shot_s": round(median(gaps), 2) if gaps else d,
        "longest_no_cut_s": round(max(gaps), 1) if gaps else d,
        "stretches_over_6s": sum(g > 6 for g in gaps),
        "hook_cuts_30s": len(hook),
        "hook_longest_s": round(max(hgaps), 1),
        "frozen_count": len(fdur),
        "frozen_total_s": round(sum(fdur), 1),
        "black_flashes": bl.count("black_start"),
        "lufs": float(lufs[-1]) if lufs else None,
        "true_peak": float(tp[-1]) if tp else None,
    }


HIGHER = {"cuts_per_min", "hook_cuts_30s"}
LOWER = {"median_shot_s", "longest_no_cut_s", "stretches_over_6s", "hook_longest_s", "frozen_count", "frozen_total_s"}


def verdict(k, a, refs):
    vals = [r[k] for r in refs if r[k] is not None]
    if a is None or not vals:
        return ""
    if k in HIGHER:
        return "OK" if a >= max(vals) * 0.9 else "WORSE"
    if k in LOWER:
        return "OK" if a <= min(vals) * 1.1 + 0.2 else "WORSE"
    if k == "lufs":
        return "OK" if -16 <= a <= -12 else "FIX (target -14)"
    if k == "true_peak":
        return "OK" if a <= -1 else "FIX (clips)"
    return ""


def main():
    out, *vids = sys.argv[1:]
    rs = [measure(v) for v in vids]
    keys = [k for k in rs[0] if k != "file"]
    lines = ["| metric | " + " | ".join(r["file"] for r in rs) + " | verdict |", "|---" * (len(rs) + 2) + "|"]
    for k in keys:
        lines.append(f"| {k} | " + " | ".join(str(r[k]) for r in rs) + f" | {verdict(k, rs[0][k], rs[1:])} |")
    md = "\n".join(lines)
    open(out, "w", encoding="utf-8").write(md + "\n\n```json\n" + json.dumps(rs, indent=1) + "\n```\n")
    print(md)


if __name__ == "__main__":
    main()
