"""Collect public video listings for outliers.py (no login, no downloads, listings only).

    py pipeline/collect.py @Channel1 @Channel2 ... [--n 40] > collected.json
"""
import json
import subprocess
import sys

a = sys.argv[1:]
n = a[a.index("--n") + 1] if "--n" in a else "40"
out = []
for ch in [x for x in a if x.startswith("@") or x.startswith("http")]:
    url = ch if ch.startswith("http") else f"https://www.youtube.com/{ch}/videos"
    r = subprocess.run([sys.executable, "-m", "yt_dlp", "--flat-playlist", "-J", "--playlist-end", n, url],
                       capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        print(f"{ch}: failed: {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else '?'}", file=sys.stderr)
        continue
    d = json.loads(r.stdout)
    vids = [e for e in d.get("entries", []) if e and e.get("view_count") is not None]
    print(f"{ch}: {len(vids)} videos", file=sys.stderr)
    for e in vids:
        out.append({"channel": d.get("channel") or ch, "title": e.get("title", ""), "views": e["view_count"],
                    "duration": e.get("duration"), "url": e.get("url", "")})
sys.stdout.reconfigure(encoding="utf-8")
print(json.dumps(out, ensure_ascii=False, indent=1))
