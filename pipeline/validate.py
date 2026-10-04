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

# Retention v3 (PLAYBOOK sec 0) — enforced from ep51 on (ep51-60 were rebuilt in v3)
if num.isdigit() and int(num) >= 51:
    spec = json.loads((ROOT / "pipeline" / "episodes" / f"{ep}.json").read_text(encoding="utf-8"))
    spine = spec.get("spine") or {}
    for k in ("goal", "stakes", "central_question", "loop_big", "loop_mid", "villain", "low_point", "win"):
        if not spine.get(k):
            problems.append(f"spine.{k} missing (PLAYBOOK sec 0.2)")
    if hook and hook[-1]["end"] > 32:
        problems.append(f"hook too long: {hook[-1]['end']:.1f}s (max 30s, PLAYBOOK sec 0.3)")
    banned = ["today:", "in this video", "let's start with", "here are three more", "another reason is", "so let's recap", "that's it", "in conclusion", "before we wrap up", "let's talk about"]
    for b in tm["beats"]:
        low = b["text"].lower()
        for p in banned:
            if p in low:
                problems.append(f"banned phrase '{p}' in beat '{b['id']}' (PLAYBOOK sec 0.2)")
        if re.match(r"next,", low):
            problems.append(f"banned opener 'Next,' in beat '{b['id']}' (PLAYBOOK sec 0.2)")
    for c in tm.get("chapters", []):
        if c["title"].strip().lower() == "now you know":
            problems.append("outro chapter must be 'What Dave Learned', not 'Now You Know' (PLAYBOOK sec 0.4)")
    if (int(num) >= 61 or int(num) in (51, 52, 54, 55, 59)) and "handItem=" in tsx:
        problems.append("handItem draws items on Dave's chest/neck: use hold={{item: <X/>, side: 'r'}} with pose present/talk/point_r (PLAYBOOK sec 6)")
    if "DAMAGE" not in tsx.upper():
        problems.append("Damage Meter missing (PLAYBOOK sec 0.5)")

print(f"{ep}: duration {dur:.0f}s ({dur / 60:.1f} min), {len(tm['beats'])} beats, {len(tm.get('chapters', []))} chapters")
if problems:
    print("PROBLEMS:")
    for p in dict.fromkeys(problems):
        print(" -", p)
    sys.exit(1)
print("OK")
