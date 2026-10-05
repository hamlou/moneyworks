"""Lint title + thumbnail text as ONE pairing (PLAYBOOK sec 0.9).

    py pipeline/package_lint.py ep61 ep62      # reads pipeline/seo_epNN.json (title, alts, thumb_text)
    py pipeline/package_lint.py --title "..." --thumb "DAY 187"

Adapted from Jakeschincariol/youtube-agent-skill (MIT) + our title rule (sec 1c).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DESKTOP, MOBILE = 60, 40
VAGUE = {"amazing", "incredible", "insane", "crazy", "huge", "massive", "ultimate", "best", "powerful", "secret",
         "revolutionary", "mindblowing", "epic", "perfect", "complete", "everything", "explained", "truth"}
STOP = {"the", "a", "an", "of", "for", "to", "in", "on", "and", "or", "is", "are", "with", "your", "you", "my", "i",
        "this", "that", "it", "how", "what", "why", "so", "then", "if", "now"}
words = lambda t: re.findall(r"[a-z0-9$']+", t.lower())


def check(title, thumb=None):
    t = title.strip()
    bad, info = [], []
    if len(t) > DESKTOP:
        bad.append(f"{len(t)} chars: search cuts near {DESKTOP}")
    if len(t) > MOBILE:
        info.append(f"mobile feed shows \"{t[:MOBILE].rsplit(' ', 1)[0]}...\" - the pain must survive the cut")
    if not re.search(r"\byou(r|'ll|'re)?\b", t, re.I):
        bad.append("no You/Your (sec 1c)")
    caps = [w for w in t.split() if len(w) > 2 and w.isupper() and not w.startswith("$")]
    if len(caps) > 2:
        bad.append(f"{len(caps)} all-caps words (max 2)")
    v = sorted({w for w in words(t) if w in VAGUE})
    if v:
        bad.append(f"vague/subject words: {', '.join(v)}")
    if not re.search(r"\d", t):
        info.append("no number in title (fine if the thumbnail carries it)")
    if thumb:
        tw = words(thumb)
        shared = (set(words(t)) - STOP) & (set(tw) - STOP)
        if shared:
            bad.append(f"thumbnail repeats the title: {', '.join(sorted(shared))}")
        if len(tw) > 3:
            bad.append(f"{len(tw)} words on thumbnail (max 3)")
        if not re.search(r"\d", t + thumb):
            bad.append("no number in title or thumbnail")
    return bad, info


def show(label, title, thumb):
    bad, info = check(title, thumb)
    print(f"{label}: \"{title}\"" + (f"  +  [{thumb}]" if thumb else ""))
    for b in bad:
        print("   x", b)
    for i in info:
        print("   -", i)
    return len(bad)


a = sys.argv[1:]
if "--title" in a:
    n = show("title", a[a.index("--title") + 1], a[a.index("--thumb") + 1] if "--thumb" in a else None)
elif a:
    n = 0
    for ep in a:
        s = json.loads((ROOT / "pipeline" / f"seo_{ep}.json").read_text(encoding="utf-8"))
        thumb = s.get("thumb_text")
        if not thumb:
            print(f"{ep}: no thumb_text in seo json - pairing not checked")
        n += show(ep, s["title"], thumb)
        for alt in s.get("alts", []):
            n += show("  alt", alt, thumb)
else:
    print(__doc__)
    sys.exit(1)
print("OK" if not n else f"{n} problem(s)")
sys.exit(1 if n else 0)
