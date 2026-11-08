"""Weekly topic finder: yt-dlp search (no API key) of money-explainer queries → outlier = views / channel median
→ Gemini proposes 5 FRESH topics for Dave → pipeline/topics/<date>.md
  py tools/topics.py [--n 100] [--top 20] [--per-channel 15] [--out path.md]
Light: metadata only, no downloads. Keys: same as tools/write.py (GEMINI_API_KEYS or ~/.moneyworks_gemini)."""
import argparse, datetime, re, statistics, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
ROOT = Path(__file__).resolve().parent.parent

QUERIES = [
    "why you are broke", "how banks make money", "money explained", "the real reason prices",
    "why everything is so expensive", "why rich people stay rich", "how money actually works",
    "why you can't save money", "the truth about credit cards", "why saving money doesn't work",
    "how inflation steals your money", "why the middle class is broke", "money mistakes poor people make",
    "how companies trick you into spending", "why hard work doesn't make you rich",
]


def ydl(extra=None):
    import yt_dlp
    o = {"quiet": True, "no_warnings": True, "extract_flat": True, "skip_download": True, "ignoreerrors": True}
    o.update(extra or {})
    return yt_dlp.YoutubeDL(o)


def search(n):
    per = max(5, -(-n * 2 // len(QUERIES)))
    seen, out = set(), []
    with ydl() as y:
        for q in QUERIES:
            if len(out) >= n:
                break
            r = y.extract_info(f"ytsearch{per}:{q}", download=False) or {}
            for e in r.get("entries") or []:
                if not e or e.get("id") in seen or not e.get("view_count") or not e.get("channel_id"):
                    continue
                if (e.get("duration") or 0) < 120:  # skip Shorts / clips: we compare long explainers
                    continue
                seen.add(e["id"])
                out.append({"id": e["id"], "title": e.get("title", ""), "views": int(e["view_count"]), "channel": e.get("channel") or e.get("uploader") or "?",
                            "channel_id": e["channel_id"], "duration": int(e.get("duration") or 0), "query": q})
            print(f"  search '{q}': {len(out)} videos", flush=True)
    return out[:n]


def channel_stats(cid, k):
    with ydl({"playlistend": k}) as y:
        r = y.extract_info(f"https://www.youtube.com/channel/{cid}/videos", download=False) or {}
    v = [int(e["view_count"]) for e in (r.get("entries") or [])[:k] if e and e.get("view_count")]
    return {"median": statistics.median(v) if v else 0, "n": len(v), "subs": r.get("channel_follower_count")}


def fmt(n):
    if n is None:
        return "?"
    n = float(n)
    return f"{n / 1e6:.1f}M" if n >= 1e6 else f"{n / 1e3:.0f}k" if n >= 1e3 else f"{n:.0f}"


def propose(top):
    from write import ask, KEYS
    if not KEYS:
        return "_no Gemini key (GEMINI_API_KEYS) — proposals skipped_"
    lines = "\n".join(f"- {r['mult']:.1f}x | {r['views']} views | {r['channel']} | {r['title']}" for r in top)
    titles = []
    for p in (ROOT / "pipeline/auto").glob("*.json"):
        m = re.search(r'"title"\s*:\s*"([^"]+)"', p.read_text(encoding="utf8", errors="ignore"))
        if m:
            titles.append(m.group(1))
    q = f"""You pick topics for "Dave Explains Money", a faceless 3D-animated YouTube channel. Host Dave (red hoodie) talks
straight to the viewer about deep, systemic money truths: why school never taught money, why hard work stopped making
people rich, why the brain is wired to waste, why rich kids stay rich, why nice people finish broke
(those five are already made: find NEW truths of that depth, not the same ones reworded).

These videos beat their own channel's median views by the multiple shown (outliers in our niche this week):
{lines}

Topics we already made (do NOT repeat): {"; ".join(titles) or "none"}

Propose exactly 5 FRESH topics INSPIRED by the outliers' ANGLES (the tension, the hidden villain, the withheld result) —
never copy a title or a topic. Each must be universal and relatable, understandable by a 12-year-old, about everyday
money (not politics, not a named person, not stock picks). Title = a question or a withheld result, under 60 chars.

Answer as a markdown list, for each:
**N. <Title>**
- Angle borrowed from: <which outlier(s) and what technique>
- Hook (first 10 s, Dave speaking, natural sentences): <2 sentences>
- Why a viewer thinks "that's MY problem": <1 sentence>
- Payoff withheld until the end: <1 sentence>"""
    try:
        return ask([{"role": "user", "parts": [{"text": q}]}], temp=0.9).strip()
    except SystemExit as e:
        return f"_Gemini failed: {e}_"


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--n", type=int, default=100)
    a.add_argument("--top", type=int, default=20)
    a.add_argument("--per-channel", type=int, default=15)
    a.add_argument("--out")
    a = a.parse_args()
    vids = search(a.n)
    stats = {}
    for i, cid in enumerate(dict.fromkeys(v["channel_id"] for v in vids)):
        try:
            stats[cid] = channel_stats(cid, a.per_channel)
        except Exception as e:
            print(f"  channel {cid}: {str(e)[:60]}")
            stats[cid] = {"median": 0, "n": 0, "subs": None}
        print(f"  channel {i + 1}: median {fmt(stats[cid]['median'])} ({stats[cid]['n']} vids)", flush=True)
    rows = []
    for v in vids:
        s = stats[v["channel_id"]]
        if s["n"] < 4 or s["median"] < 1000:  # yt-viral rule: tiny medians are noise
            continue
        rows.append({**v, "median": s["median"], "subs": s["subs"], "mult": v["views"] / s["median"]})
    rows.sort(key=lambda r: -r["mult"])
    top = rows[:a.top]
    today = datetime.date.today().isoformat()
    md = [f"# Topics {today}", "", f"{len(vids)} videos searched, {len(stats)} channels, {len(rows)} usable (channel median >= 1k, >= 4 videos).",
          "Multiple = views / median of channel's last uploads. Ranks the IDEA, not channel size.", "",
          "| # | x | views | ch median | subs | channel | title |", "|---|---|---|---|---|---|---|"]
    for i, r in enumerate(top, 1):
        t = r["title"].replace("|", "/")
        md.append(f"| {i} | {r['mult']:.1f}x | {fmt(r['views'])} | {fmt(r['median'])} | {fmt(r['subs'])} | {r['channel'].replace('|', '/')} | [{t}](https://youtu.be/{r['id']}) |")
    md += ["", "## 5 proposals (owner approves before any script)", "", propose(top) if top else "_no outliers found_", ""]
    out = Path(a.out) if a.out else ROOT / "pipeline/topics" / f"{today}.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(md), encoding="utf8")
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
