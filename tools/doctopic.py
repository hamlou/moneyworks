"""TOPIC PROOF for the documentary format (LONG.md [DOC] §2). A topic is allowed only with measured proof — never a guess.
  py tools/doctopic.py scan               collects the channels in pipeline/doc/channels.txt → pipeline/doc/outliers.json
                                          (videos that beat their OWN channel's median ≥ 4x) and prints the top 40
  py tools/doctopic.py demand "<query>"   searches YouTube for the topic the way a viewer would → PASS/FAIL, saved in pipeline/doc/demand.json
`tools/doc.py check` reads both files: a spec whose proof is not in them is refused. Public listings only, no login."""
import json, os, re, statistics, subprocess, sys
from pathlib import Path

R = Path(__file__).resolve().parent.parent
os.chdir(R)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
OUT, DEM, CH = Path("pipeline/doc/outliers.json"), Path("pipeline/doc/demand.json"), Path("pipeline/doc/channels.txt")
MIN_MEDIAN, MIN_MULT, MIN_SEC = 15000, 4.0, 240
NEED_100K, NEED_1M = 5, 1


def scan():
    chans = [l.split("#")[0].strip() for l in CH.read_text(encoding="utf8").splitlines() if l.split("#")[0].strip()]
    r = subprocess.run([sys.executable, "pipeline/collect.py", *chans, "--n", "40"], capture_output=True, text=True, encoding="utf-8")
    print(r.stderr.strip())
    data = json.loads(r.stdout)
    by = {}
    for e in data:
        by.setdefault(e["channel"], []).append(e)
    out = []
    for ch, v in by.items():
        if len(v) < 4:
            continue
        med = statistics.median(e["views"] for e in v)
        if med < MIN_MEDIAN:
            continue
        for e in v:
            m = e["views"] / med
            if m >= MIN_MULT and (e.get("duration") or 0) >= MIN_SEC:
                out.append({"multiple": round(m, 1), "views": e["views"], "channel": ch, "median": int(med), "minutes": (e.get("duration") or 0) // 60, "title": e["title"], "url": e["url"]})
    out.sort(key=lambda o: -o["multiple"])
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf8")
    for o in out[:40]:
        print(f"{o['multiple']:6.1f}x {o['views']:>10,} {o['minutes']:>3}m  {o['channel'][:18]:18} {o['title'][:80]}")
    print(f"\n{len(out)} outliers → {OUT}")
    return out


def demand(q):
    r = subprocess.run([sys.executable, "-m", "yt_dlp", "--flat-playlist", "--no-warnings", "--match-filter", f"duration>{MIN_SEC}", "--print",
                        "%(view_count)s|%(channel)s|%(title)s", f"ytsearch15:{q}"], capture_output=True)
    rows = []
    for l in r.stdout.decode("utf-8", "ignore").splitlines():
        p = l.split("|", 2)
        if len(p) == 3 and p[0].isdigit():
            rows.append((int(p[0]), p[1], p[2]))
    rows.sort(reverse=True)
    d = {"query": q, "n": len(rows), "over100k": sum(v >= 100000 for v, *_ in rows), "over1m": sum(v >= 1000000 for v, *_ in rows),
         "top": [f"{v:,} {c}: {t}"[:110] for v, c, t in rows[:5]]}
    d["pass"] = d["over100k"] >= NEED_100K and d["over1m"] >= NEED_1M
    d["score"] = d["over100k"] + 3 * d["over1m"]
    allq = json.loads(DEM.read_text(encoding="utf8")) if DEM.exists() else {}
    allq[q.lower().strip()] = d
    DEM.write_text(json.dumps(allq, indent=1, ensure_ascii=False), encoding="utf8")
    return d


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    if sys.argv[1] == "scan":
        scan()
    elif sys.argv[1] == "demand" and len(sys.argv) > 2:
        d = demand(sys.argv[2])
        print("\n".join("  " + t for t in d["top"]))
        print(f"{d['over100k']} of {d['n']} results over 100k, {d['over1m']} over 1M →", "PASS" if d["pass"] else f"FAIL (need ≥ {NEED_100K} over 100k and ≥ {NEED_1M} over 1M: people are not looking for this — pick another topic)")
    else:
        sys.exit(__doc__)
