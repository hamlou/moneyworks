import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ep = sys.argv[1]
spec = json.loads((ROOT / "pipeline" / "episodes" / f"{ep}.json").read_text(encoding="utf-8"))
tm = json.loads((ROOT / "public" / ep / "timings.json").read_text(encoding="utf-8"))
meta = spec.get("youtube", {})


def ts(s):
    s = int(s)
    return f"{s // 60}:{s % 60:02d}"


lines = []
if meta.get("hook"):
    lines += [meta["hook"], ""]
lines += ["⏱ Chapters", "0:00 Intro"] + [f"{ts(c['start'])} {c['title']}" for c in tm.get("chapters", [])]
lines += ["", "📚 Sources"] + [f"• {s}" for s in spec.get("sources", [])]
lines += [
    "",
    "🎵 Music: \"Fluffing a Duck\" Kevin MacLeod (incompetech.com)",
    "Licensed under Creative Commons: By Attribution 4.0 License",
    "http://creativecommons.org/licenses/by/4.0/",
    "",
    "⚠️ This video is for education and entertainment only. It is not financial advice.",
]
if meta.get("tags"):
    lines += ["", " ".join("#" + t.replace(" ", "") for t in meta["tags"][:3])]
out = ROOT / "out" / f"{ep}_youtube.txt"
title = meta.get("title", spec["title"])
body = f"TITLE:\n{title}\n\nDESCRIPTION:\n" + "\n".join(lines) + "\n\nTAGS:\n" + ", ".join(meta.get("tags", [])) + "\n"
out.write_text(body, encoding="utf-8")
print(body)
