"""Read a YouTube Studio audience-retention export and name the beats where viewers left.

    py pipeline/retention.py ep53 retention.csv

Studio -> video -> Analytics -> Engagement -> audience retention chart -> download.
Needs public/epNN/timings.json (gh run download <tts run> -n epNN-timings -D public/epNN).
Adapted from Jakeschincariol/youtube-agent-skill (MIT), mapped to our beats/chapters.
"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 3:
    print(__doc__)
    sys.exit(1)
ep, path = sys.argv[1], sys.argv[2]
tm = json.loads((ROOT / "public" / ep / "timings.json").read_text(encoding="utf-8"))
dur = tm["total"] + 1.6

rows = []
with open(path, newline="", encoding="utf-8-sig", errors="replace") as fh:
    for r in csv.reader(fh):
        vals = []
        for c in r:
            try:
                vals.append(float(c.strip().replace("%", "").replace(",", "")))
            except ValueError:
                pass
        if len(vals) >= 2:
            rows.append((vals[0], vals[1]))
if len(rows) < 8:
    sys.exit("could not read at least 8 data points from that csv")
if max(x for x, _ in rows) <= 100.5:
    rows = [(x / 100 * dur, y) for x, y in rows]
if max(y for _, y in rows) <= 1.5:
    rows = [(x, y * 100) for x, y in rows]
rows.sort()


def at(t):
    prev = rows[0]
    for x, y in rows:
        if x >= t:
            if x == prev[0]:
                return y
            return prev[1] + (y - prev[1]) * (t - prev[0]) / (x - prev[0])
        prev = (x, y)
    return rows[-1][1]


def beat_at(t):
    b = max((b for b in tm["beats"] if b["start"] <= t + 0.5), key=lambda b: b["start"], default=tm["beats"][0])
    return b


mmss = lambda t: f"{int(t) // 60}:{int(t) % 60:02d}"
start = rows[0][1]
hook_leak = start - at(30)
verdict = "healthy" if hook_leak < 25 else "leaking" if hook_leak < 40 else "severe"
avg = sum(at(dur * i / 200) for i in range(200)) / 200
print(f"{ep}: {mmss(dur)}  avg viewed {avg:.1f}%  at 30s {at(30):.1f}%  end {rows[-1][1]:.1f}%")
print(f"\nHOOK LEAK  {hook_leak:.1f}% lost in first 30s  [{verdict}]  (fix = o1..o6 script, never the edit)")

drops = []
for (x0, y0), (x1, y1) in zip(rows, rows[1:]):
    if x0 >= 30 and x1 > x0:
        drops.append(((y0 - y1) / (x1 - x0), x0, y0 - y1))
drops.sort(reverse=True)
med = sorted(d[0] for d in drops)[len(drops) // 2] if drops else 0
print("\nCLIFFS  (single moments people left)")
shown = 0
for rate, x, lost in drops[:5]:
    if rate <= max(med * 2.5, 0.02):
        continue
    b = beat_at(x)
    print(f"  -{lost:4.1f}%  at {mmss(x)}  beat {b['id']:<5} \"{b['text'][:90]}\"")
    shown += 1
if not shown:
    print("  none: the loss is a slide (pacing), not moments")

print("\nCHAPTERS  (% lost per minute; the worst one is the rewrite target)")
ch = [{"title": "Hook", "start": 0.0}] + tm.get("chapters", [])
worst = None
for i, c in enumerate(ch):
    end = ch[i + 1]["start"] if i + 1 < len(ch) else dur
    lost = at(c["start"]) - at(end)
    per_min = lost / max(end - c["start"], 1) * 60
    if i and (worst is None or per_min > worst[0]):
        worst = (per_min, c["title"])
    print(f"  {mmss(c['start']):>5}  {at(c['start']):5.1f}% -> {at(end):5.1f}%  {per_min:5.1f}%/min  {c['title']}")
if worst:
    print(f"\nWORST CHAPTER: {worst[1]} ({worst[0]:.1f}%/min)")
print(f"\nctr_log row: | {ep} | | | | | {avg:.0f}% | {at(30):.0f}% | hook leak {hook_leak:.0f}%, worst ch: {worst[1] if worst else '-'} |")
