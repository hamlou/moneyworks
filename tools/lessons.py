"""Learning loop from our own analytics → LESSONS.md (dated, deduped).
  py tools/lessons.py [--n 10] [--dry]
env: YT_CLIENT_ID YT_CLIENT_SECRET YT_REFRESH_TOKEN (get the token once with: py tools/yt_auth.py) + Gemini keys as tools/write.py.
Per upload: views, CTR, averageViewPercentage, retention curve → biggest drops → script line at that second
(pipeline/auto/<id>.json + src/v6/<id>_timing.json; spec matched by title or a "youtube_id" field) → Gemini lessons."""
import argparse, datetime, json, os, re, sys, urllib.parse, urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "LESSONS.md"
DATA = "https://www.googleapis.com/youtube/v3/"
ANA = "https://youtubeanalytics.googleapis.com/v2/reports"


def token():
    body = urllib.parse.urlencode({"client_id": os.environ["YT_CLIENT_ID"], "client_secret": os.environ["YT_CLIENT_SECRET"],
                                   "refresh_token": os.environ["YT_REFRESH_TOKEN"], "grant_type": "refresh_token"}).encode()
    return json.loads(urllib.request.urlopen("https://oauth2.googleapis.com/token", body, timeout=60).read())["access_token"]


def get(url, tok, **q):
    req = urllib.request.Request(url + "?" + urllib.parse.urlencode(q), headers={"Authorization": f"Bearer {tok}"})
    return json.loads(urllib.request.urlopen(req, timeout=60).read())


def secs(iso):
    m = re.match(r"P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso or "")
    d, h, mi, s = (int(x or 0) for x in m.groups()) if m else (0, 0, 0, 0)
    return d * 86400 + h * 3600 + mi * 60 + s


def uploads(tok, n):
    ch = get(DATA + "channels", tok, part="contentDetails", mine="true")["items"][0]
    pl = ch["contentDetails"]["relatedPlaylists"]["uploads"]
    ids = [i["contentDetails"]["videoId"] for i in get(DATA + "playlistItems", tok, part="contentDetails", playlistId=pl, maxResults=n)["items"]]
    vs = get(DATA + "videos", tok, part="snippet,contentDetails,statistics", id=",".join(ids))["items"]
    return [{"id": v["id"], "title": v["snippet"]["title"], "published": v["snippet"]["publishedAt"][:10],
             "dur": secs(v["contentDetails"]["duration"]), "views": int(v["statistics"].get("viewCount", 0))} for v in vs]


def report(tok, vid, start, metrics, dims=None):
    q = dict(ids="channel==MINE", startDate=start, endDate=datetime.date.today().isoformat(), metrics=metrics, filters=f"video=={vid}")
    if dims:
        q["dimensions"] = dims
    r = get(ANA, tok, **q)
    return [h["name"] for h in r.get("columnHeaders", [])], r.get("rows") or []


def metric(tok, vid, start, names):
    for m in names:  # CTR metric name differs by API version → try each
        try:
            _, rows = report(tok, vid, start, m)
            if rows:
                return rows[0][0]
        except Exception:
            pass
    return None


def drops(curve, dur, k=3):
    d = [(curve[i - 1][1] - curve[i][1], curve[i][0]) for i in range(1, len(curve))]
    out = []
    for fall, x in sorted(d, reverse=True):
        if fall <= 0 or any(abs(x - y) < 0.03 for _, y in out):
            continue
        out.append((fall, x))
        if len(out) == k:
            break
    return [{"at_s": round(x * dur, 1), "ratio": x, "fall_pct": round(fall * 100, 1)} for fall, x in out]


def norm(t):
    return re.sub(r"[^a-z0-9 ]", "", t.lower()).strip()


def spec_for(v):
    for p in (ROOT / "pipeline/auto").glob("*.json"):
        try:
            s = json.loads(p.read_text(encoding="utf8"))
        except Exception:
            continue
        if s.get("youtube_id") == v["id"] or (s.get("title") and norm(s["title"]) == norm(v["title"])):
            return p.stem
    return None


def line_at(eid, t):
    f = ROOT / "src/v6" / f"{eid}_timing.json"
    if not f.exists():
        return None
    beats = json.loads(f.read_text(encoding="utf8")).get("beats", [])
    prev = None
    for b in beats:
        if b["start"] <= t <= b["end"] + 0.6:
            return f'{b["id"]} @{b["start"]:.1f}s: "{b["text"]}"'
        if b["start"] > t:
            break
        prev = b
    return f'(pause after) {prev["id"]}: "{prev["text"]}"' if prev else None


def existing():
    return [norm(l[2:]) for l in OUT.read_text(encoding="utf8").splitlines() if l.startswith("- ")] if OUT.exists() else []


def dup(a, olds):
    w = set(norm(a).split())
    return any(len(w & set(o.split())) / max(1, len(w | set(o.split()))) > 0.6 for o in olds)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--n", type=int, default=10)
    ap.add_argument("--dry", action="store_true", help="print data + lessons, don't write LESSONS.md")
    a = ap.parse_args()
    if not all(os.environ.get(k) for k in ("YT_CLIENT_ID", "YT_CLIENT_SECRET", "YT_REFRESH_TOKEN")):
        print("YT_CLIENT_ID / YT_CLIENT_SECRET / YT_REFRESH_TOKEN not set — skipping (run py tools/yt_auth.py once)")
        return
    tok = token()
    rows = []
    for v in uploads(tok, a.n):
        st = v["published"]
        _, base = report(tok, v["id"], st, "views,averageViewPercentage,averageViewDuration")
        v["avp"] = round(base[0][1], 1) if base else None
        v["avd_s"] = base[0][2] if base else None
        v["ctr"] = metric(tok, v["id"], st, ["impressionClickThroughRate", "videoThumbnailImpressionsClickRate"])
        try:
            _, curve = report(tok, v["id"], st, "audienceWatchRatio", "elapsedVideoTimeRatio")
        except Exception as e:
            curve = []
            print(f"  retention {v['id']}: {str(e)[:60]}")
        v["drops"] = drops(curve, v["dur"]) if len(curve) > 5 else []
        eid = spec_for(v)
        v["spec"] = eid
        for d in v["drops"]:
            d["line"] = line_at(eid, d["at_s"]) if eid else None
        if curve:
            v["kept_at_10pct"] = round(next((y for x, y in curve if x >= 0.1), curve[-1][1]) * 100)
        rows.append(v)
        print(f"  {v['id']} {v['views']}v ctr={v['ctr']} avp={v['avp']} spec={eid} drops={[d['at_s'] for d in v['drops']]}", flush=True)
    if not rows:
        return print("no uploads")
    old = existing()
    from write import ask, jsonblock, KEYS
    if not KEYS:
        return print("no Gemini key — data above, no lessons written")
    q = f"""You coach "Dave Explains Money", a faceless 3D-animated money explainer YouTube channel (host Dave talks to the viewer).
Our last uploads with YouTube Analytics (ctr = thumbnail click-through %, avp = average % of video watched, drops = the
biggest falls of the retention curve: at_s = second, fall_pct = share of audience lost there, line = the script line spoken then):
{json.dumps(rows, ensure_ascii=False, indent=1)}

Lessons we already have (do not repeat them): {json.dumps(old[-40:], ensure_ascii=False)}

Write 3 to 6 NEW concrete lessons for the NEXT script/edit. Each = one sentence, actionable (what to do or never do),
grounded in a specific number or line above (cite the video title or line id). No generic advice.
Answer ONLY as JSON: {{"lessons": ["...", "..."]}}"""
    try:
        new = jsonblock(ask([{"role": "user", "parts": [{"text": q}]}], temp=0.4))["lessons"]
    except SystemExit as e:
        return print(f"Gemini failed: {e}")
    new = [l.strip() for l in new if l.strip() and not dup(l, old)]
    if not new:
        return print("no new lessons (all duplicates)")
    block = f"\n## {datetime.date.today().isoformat()} ({len(rows)} uploads)\n" + "".join(f"- {l}\n" for l in new)
    print(block)
    if a.dry:
        return
    if not OUT.exists():
        OUT.write_text("# Lessons from our own analytics\nAppended weekly by tools/lessons.py (.github/workflows/lessons.yml). Read before writing a script.\n", encoding="utf8")
    with OUT.open("a", encoding="utf8") as f:
        f.write(block)
    print(f"appended {len(new)} lessons to {OUT}")


if __name__ == "__main__":
    main()
