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
    if hook and hook[-1]["end"] > 32 and int(num) < 61:
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

# Build-quality checks (lessons from the ep51-59 rebuilds, PLAYBOOK sec 10) - enforced from ep51 on
if num.isdigit() and int(num) >= 51:
    sfx = {p.stem for p in (ROOT / "public" / "sfx").glob("*")}
    for m in re.finditer(r"\bq\([^;\n]*,\s*'([a-z_0-9]+)'\s*(?:,\s*[0-9.]+\s*)?\);", tsx):
        if sfx and m.group(1) not in sfx:
            problems.append(f"unknown SFX '{m.group(1)}' (render will fail; valid names are the files in public/sfx)")
    if "<ChapterCard" not in tsx:
        problems.append("<ChapterCard f={f} t={t} /> missing from the final return (chapter cards never show)")
    if re.search(r"scene\([^\n]*\n(?:[^\n]*\n){0,4}?[^\n]*<SubReminder", tsx):
        problems.append("SubReminder is inside a scene(): it must be an overlay in the final return")
    if "subCues(" in tsx and not re.search(r"subCues\([^)]*\)\s*\.forEach", tsx):
        problems.append("subCues(SUB) is not pushed into cues: use subCues(SUB).forEach((c) => cues.push(c))")
    for m in re.finditer(r"<XMark[^>]*\bs=\{([0-9.]+)", tsx):
        if float(m.group(1)) > 0.8:
            problems.append(f"XMark s={m.group(1)}: XMark is 520 px wide at s=1, use s around 0.3-0.5")

# Human hook + mixed media v4 (PLAYBOOK sec 0.10) - enforced from ep61 on
if num.isdigit() and int(num) >= 61:
    spec = json.loads((ROOT / "pipeline" / "episodes" / f"{ep}.json").read_text(encoding="utf-8"))
    if dur < 605:
        problems.append(f"video too short for v4: {dur:.0f}s (owner wants 10 min+). Add ~{int((615 - dur) * 2.6) + 40} words (a real-world story chapter, not filler).")
    if not (spec.get("tts") or {}).get("hook_rate"):
        problems.append('"tts" block missing: {"rate": "-5%", "hook_rate": "+3%", "lead": 0.08} (sec 0.10)')
    sents = lambda txt: [x for x in re.split(r"(?<=[.?!])\s+", txt.strip()) if x]
    wc = lambda x: len(re.findall(r"[A-Za-z0-9'$%]+", x))
    if hook:
        o1 = hook[0]
        first = sents(o1["text"])[0]
        if hook[-1]["end"] > 27:
            problems.append(f"hook too long: {hook[-1]['end']:.1f}s (max 25s, sec 0.10)")
        if not re.search(r"\b(you|your|you're|you've|you'll)\b", o1["text"].lower()):
            problems.append("o1 must talk to the VIEWER (you/your) and confirm the title - not start on Dave (sec 0.10)")
        if re.search(r"\bdave\b", o1["text"].lower()):
            problems.append("Dave may not appear in o1: the first sentence is about the viewer + a real thing (sec 0.10)")
        jobs = {x.get("job") for x in spec["beats"] if x["id"].startswith("o")}
        for j in ("concept", "stakes", "ending"):
            if j not in jobs:
                problems.append(f'no hook beat has "job": "{j}" (owner rule: the hook introduces the concept, the stakes and how the video ends)')
        if spec["beats"][0].get("job") != "concept":
            problems.append('o1 must be the "concept" beat')
        form = spec.get("hook_form")
        if not form:
            problems.append('"hook_form" missing (sec 0.10 menu)')
        else:
            for k in range(int(num) - 5, int(num) + 6):
                op = ROOT / "pipeline" / "episodes" / f"ep{k:02d}.json"
                if k != int(num) and op.exists() and json.loads(op.read_text(encoding="utf-8")).get("hook_form") == form:
                    problems.append(f"hook_form '{form}' is already used by ep{k:02d}: never the same hook shape within 5 episodes")
        if wc(first) < 9:
            problems.append(f"o1 opens with a {wc(first)}-word fragment ('{first}'): open with ONE flowing spoken sentence of 12-24 words (fragments make the voice sound robotic)")
        if o1["words"][0]["start"] > 0.3:
            problems.append(f"voice starts at {o1['words'][0]['start']:.2f}s: set tts.lead to 0.08 (no silence at 0:00)")
        hs = [x for b in hook for x in sents(b["text"])]
        if sum(1 for x in hs if wc(x) <= 3) > 1:
            problems.append("hook has more than one 1-3 word fragment: write it the way a person talks")
        for b in hook:
            low = b["text"].lower()
            for ph in ("that's dave", "let's rewind", "how did he end up", "how did he get here", "stay to the end"):
                if ph in low:
                    problems.append(f"worn-out hook template '{ph}' in {b['id']} (sec 0.10: every hook is written fresh)")
    alls = [x for b in tm["beats"] for x in sents(b["text"])]
    frag = sum(1 for x in alls if wc(x) <= 3) / max(1, len(alls))
    if frag > 0.2:
        problems.append(f"{frag:.0%} of sentences are 1-3 word fragments (max 20%): staccato text is what makes the voice robotic. Join them into spoken sentences.")
    words_all = " ".join(b["text"] for b in tm["beats"]).lower()
    you = len(re.findall(r"\b(you|your|you're|you've|you'll|yours)\b", words_all)) / max(1, len(words_all.split())) * 100
    if you < 2.2:
        problems.append(f"only {you:.1f} 'you/your' per 100 words (min 2.2): talk TO the viewer, not about Dave only")
    if not any(b.get("rate") for b in spec["beats"]):
        problems.append('no beat has its own "rate": mark at least 8 lines (excited "+6%", slow reveal "-12%") so the delivery is not flat')
    # mixed media
    man_p = ROOT / "pipeline" / "photos" / f"{ep}.json"
    used = sorted(set(re.findall(r"['\"`]" + ep + r"/([a-z0-9_]+)\.(?:jpg|png)['\"`]", tsx)))
    if "from '../photo'" not in tsx:
        problems.append("no real photos: import {Pic, PicBg, Slam} from '../photo' (sec 0.10)")
    if len(used) < 14:
        problems.append(f"only {len(used)} different real photos used (min 14, sec 0.10)")
    if man_p.exists():
        ids = {x["id"]: x for x in json.loads(man_p.read_text(encoding="utf-8"))["photos"]}
        pdir = ROOT / "public" / "photos" / ep
        for m in re.finditer(r"['\"`]" + ep + r"/([a-z0-9_]+)\.(jpg|png)['\"`]", tsx):
            if m.group(1) not in ids:
                problems.append(f"photo '{m.group(1)}' is not in pipeline/photos/{ep}.json (no credit = cannot publish)")
            elif not (pdir / f"{m.group(1)}.{m.group(2)}").exists():
                problems.append(f"photo file public/photos/{ep}/{m.group(1)}.{m.group(2)} does not exist (render will fail)")
            elif not ids[m.group(1)].get("license"):
                problems.append(f"photo '{m.group(1)}' has no licence in the manifest: run py pipeline/photos.py {ep}")
    else:
        problems.append(f"pipeline/photos/{ep}.json missing")
    first_ch = re.search(r"A\('c1", tsx)
    first_pic = re.search(r"<Pic(Bg)?\b", tsx)
    if first_ch and (not first_pic or first_pic.start() > first_ch.start()):
        problems.append("no real photo in the hook: frame 0 must show a REAL picture (sec 0.10)")

print(f"{ep}: duration {dur:.0f}s ({dur / 60:.1f} min), {len(tm['beats'])} beats, {len(tm.get('chapters', []))} chapters")
if problems:
    print("PROBLEMS:")
    for p in dict.fromkeys(problems):
        print(" -", p)
    sys.exit(1)
print("OK")
