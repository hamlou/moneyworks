"""Rank competitor videos by how far each beat its OWN channel's median (topic research, PLAYBOOK sec 0.9).

    py pipeline/outliers.py collected.json [--min 2.0]

collected.json = [{"channel": "...", "title": "...", "views": 412000, "url": "..."}, ...]
Collect with: py pipeline/collect.py @Chan1 @Chan2 > collected.json  (>= 4 videos per channel).
Raw views rank channel size; the multiple ranks the IDEA. Adapted from Jakeschincariol/youtube-agent-skill (MIT).
"""
import json
import re
import statistics
import sys
from pathlib import Path

FORMULAS = json.loads((Path(__file__).parent / "hooks.json").read_text(encoding="utf-8"))["hooks"]


def formula(title):
    hits = sorted(((sum(1 for p in f["match"] if re.search(p, title, re.I)), f["name"]) for f in FORMULAS), reverse=True)
    return hits[0][1] if hits and hits[0][0] else "Unclassified"


a = sys.argv[1:]
lo = float(a[a.index("--min") + 1]) if "--min" in a else 2.0
files = [x for x in a if x.endswith(".json")]
if not files:
    print(__doc__)
    sys.exit(1)
rows = json.load(open(files[0], encoding="utf-8"))
by = {}
for r in rows:
    by.setdefault(r.get("channel", "?"), []).append(r)
out, thin = [], []
for ch, vids in by.items():
    if len(vids) < 4:
        thin.append(f"{ch} ({len(vids)})")
        continue
    med = statistics.median(float(v.get("views") or 0) for v in vids)
    for v in vids:
        m = float(v.get("views") or 0) / med if med else 0
        if m >= lo:
            out.append((m, int(v.get("views") or 0), int(med), ch, v.get("title", ""), v.get("url", "")))
out.sort(reverse=True)
sys.stdout.reconfigure(encoding="utf-8")
top = int(a[a.index("--top") + 1]) if "--top" in a else 30
print(f"{len(rows)} videos, {len(by)} channels, outliers >= {lo}x own median\n")
counts = {}
for m, views, med, ch, title, url in out[:top]:
    f = formula(title)
    counts[f] = counts.get(f, 0) + 1
    print(f"{m:6.1f}x  {views:>10,} vs {med:>9,}  {ch[:20]:<20}  {title[:80]}  [{f}]")
if counts:
    print("\ntitle formulas among the outliers (a judgement about the words, not why it worked):")
    for f, c in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {c:2d}x  {f}")
if not out:
    print("nothing cleared the threshold")
if thin:
    print("\nskipped (< 4 videos):", ", ".join(thin))
