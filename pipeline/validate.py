import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ep = sys.argv[1]
num = ep[2:]
tm = json.loads((ROOT / "public" / ep / "timings.json").read_text(encoding="utf-8"))
tsx = (ROOT / "src" / "episodes" / f"Ep{num}.tsx").read_text(encoding="utf-8")
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
beats = {b["id"]: [norm(w["text"]) for w in b["words"]] for b in tm["beats"]}
problems = []

for m in re.finditer(r"\bwe?\(\s*'([^']+)'\s*,\s*'([^']+)'(?:\s*,\s*(\d+))?", tsx):
    bid, word, nth = m.group(1), norm(m.group(2)), int(m.group(3) or 0)
    if bid not in beats:
        problems.append(f"unknown beat id '{bid}' in w()/we()")
    elif beats[bid].count(word) <= nth:
        problems.append(f"word '{m.group(2)}' (nth={nth}) not spoken in beat '{bid}': {' '.join(beats[bid])}")
for m in re.finditer(r"\b(?:bs|A)\(\s*'([^']+)'\s*\)", tsx):
    if m.group(1) not in beats:
        problems.append(f"unknown beat id '{m.group(1)}' in bs()/A()")

dur = tm["total"] + 1.6
if dur < 480:
    problems.append(f"video too short: {dur:.0f}s (< 480s). Add ~{int((480 - dur) * 2.8) + 80} words (a practical or history chapter).")
if dur > 900:
    problems.append(f"video too long: {dur:.0f}s (> 900s)")
if "SubReminder" not in tsx or "subCues(" not in tsx:
    problems.append("mid-video SubReminder missing")
if not re.search(r"SubButton", tsx):
    problems.append("end subscribe scene missing")
hook = [b for b in tm["beats"] if b["id"].startswith("o")]
if not hook:
    problems.append("no hook beats (ids must start with 'o')")

print(f"{ep}: duration {dur:.0f}s ({dur / 60:.1f} min), {len(tm['beats'])} beats, {len(tm.get('chapters', []))} chapters")
if problems:
    print("PROBLEMS:")
    for p in dict.fromkeys(problems):
        print(" -", p)
    sys.exit(1)
print("OK")
