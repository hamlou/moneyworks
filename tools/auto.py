"""AUTOPILOT — one spec file → one finished video. The writer (any AI, even a weak one) only writes
pipeline/auto/<id>.json (format: AUTOPILOT.md). Everything else is this script + fixed templates:

  py tools/auto.py check  <id>   gates on the spec (style, hook, loops, anchors, shots) — fix until "SPEC OK"
  py tools/auto.py voice  <id>   writes the voice script, pushes, waits for the Chatterbox voice (~5-15 min)
  py tools/auto.py build  <id>   voice timing → frame plan + shot lengths + textures + Blender stub + Remotion comp
  py tools/auto.py shots  <id>   pushes, waits for the Blender render, saves its run id (shots stay on GitHub) (--resume = take last finished run)
  py tools/auto.py render <id>   pushes, renders the final video on GitHub, downloads it to videos/<id>/ + QA images
  py tools/auto.py all    <id>   all of the above in order (stops at the first failing gate)
  py tools/auto.py qa     <id>   post-voice gates only (uses the real word timing)
"""
import json, math, os, re, shutil, subprocess, sys, time, zipfile
from pathlib import Path

R = Path(__file__).resolve().parent.parent
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
os.chdir(R)
GH = os.path.expandvars(r"%LOCALAPPDATA%\ghcli\bin\gh.exe") if os.name == "nt" else "gh"
if not os.path.exists(GH):
    GH = shutil.which("gh") or "gh"
try:
    import imageio_ffmpeg
    FF = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FF = shutil.which("ffmpeg") or "ffmpeg"
FPS, STRETCH, GAP_S = 30, 1 / 0.9, 2.0
GAP = int(GAP_S * FPS)

# ───────────────────────────── vocabulary (the ONLY words the spec may use) ─────────────────────────────
POSES = ["shock_panic", "smug_point_you", "determined_present", "think_think", "neutral_shrug", "grin_cheer", "determined_point_l", "sleep_slump"]
OUTFITS = ["hoodie", "suit", "doctor", "professor", "muscle"]
TPL = {  # template → (required params, optional params, motion-heavy for frame 0?)
    "rain": ([], ["item", "label", "dave", "react", "n", "outfit"], True),
    "office_walk": ([], ["flags", "outfit"], True),
    "chair_spin": ([], ["flags", "outfit"], True),
    "lamp": ([], ["flags", "outfit"], False),
    "desk_paper": (["paper"], ["face", "flags", "outfit"], False),
    "sign_topple": (["paper", "giant"], ["flags", "outfit"], False),
    "receipt": (["total"], ["flags", "outfit"], True),
    "street": (["sign"], ["n", "k", "outfit"], False),
    "seats": ([], ["n", "lit", "color", "outfit"], False),
    "ring": (["headlines"], ["outfit"], True),
    "grid": ([], ["n", "k", "outfit"], False),
    "walls": (["walls"], ["dest", "sign", "outfit"], True),
    "flyaway": (["paper"], ["dest", "sign", "react", "face", "outfit"], True),
    "room": (["paper"], ["screen", "outfit"], False),
    "towers": ([], ["a", "b", "outfit"], True),
    "building_walk": ([], ["dest", "sign", "outfit"], False),
    "headlines": (["headlines"], [], True),
    # NEW 5 Nov: set built from the script with free Poly Haven ids (pipeline/ASSETS.md) — every episode looks different
    "scene": (["sky"], ["ground", "room", "props", "hero", "hero_fx", "hero_size", "n", "move", "dave", "pose", "face", "sky_rot", "sky_power", "sun", "sign", "outfit"], True),
}
OLD_SETS = [t for t in TPL if t != "scene"]  # ea1's fixed sets: max 2 per episode (owner 5 Nov: au1 looked like the Abdul video)
CAT = json.loads(Path("pipeline/catalog.json").read_text(encoding="utf8")) if Path("pipeline/catalog.json").exists() else {}
BPOSES = ["idle", "hold", "look", "panic", "fists", "point_l", "point_you", "shrug", "count", "cheer", "sleep", "read", "slump"]
FACES = ["neutral", "shock", "think", "spiral", "panic", "grin", "determined", "smug", "sleep", "dead"]
MOVES, DACT, HFX = ["push", "orbit", "crane", "dolly", "low", "top"], ["stand", "walk_in", "none"], ["drop", "pop", "spin", "slide", "pile"]
BG = {"shot": ["shot"], "still": ["shot", "t"], "pose": ["pose"], "macro": ["lines"], "home": [], "photo": ["file"], "clip": ["query"]}
OV = {"text": ["text"], "count": ["to"], "burst": ["word"], "stamp": ["text"], "bars": ["rows"], "checks": ["rows"], "sfx": ["sound"]}
COLORS = {"white": "#F4F4F2", "yellow": "#FFD400", "red": "#FF3B3B", "green": "#5BE33B", "blue": "#5aa0ff"}
# CREATIVE IDENTITY (owner 7 Nov: "not all the productions look the same"). Every spec picks look.style + look.format +
# look.hook_form; check blocks repeating the last episodes. style = colour grade + font + palette (yellow/red/green/blue remapped)
STYLES = {
    "comic":       {"grade": "saturate(1.25) contrast(1.1)", "font": "Bangers", "pal": {"yellow": "#FFD400", "red": "#FF3B3B", "green": "#5BE33B", "blue": "#5aa0ff"}},
    "noir":        {"grade": "saturate(0.45) contrast(1.25) brightness(0.92)", "font": "BebasNeue", "pal": {"yellow": "#F4F4F2", "red": "#E01E1E", "green": "#BFBFBF", "blue": "#9aa4b5"}},
    "neon":        {"grade": "saturate(1.5) contrast(1.15) hue-rotate(-12deg)", "font": "Bungee", "pal": {"yellow": "#00F0FF", "red": "#FF2BD6", "green": "#7CFF4F", "blue": "#8A5CFF"}},
    "documentary": {"grade": "sepia(0.2) saturate(0.85) contrast(1.05)", "font": "Oswald", "pal": {"yellow": "#F2B33D", "red": "#C8442C", "green": "#8DB36B", "blue": "#6E8FAF"}},
    "cold":        {"grade": "saturate(0.8) hue-rotate(12deg) brightness(0.97) contrast(1.08)", "font": "ArchivoBlack", "pal": {"yellow": "#BFE9FF", "red": "#FF5A5A", "green": "#6BFFC9", "blue": "#4FA3FF"}},
    "retro":       {"grade": "sepia(0.38) saturate(1.25) contrast(1.12)", "font": "RubikMonoOne", "pal": {"yellow": "#FFC857", "red": "#E9724C", "green": "#A8C256", "blue": "#3E7CB1"}},
    "marker":      {"grade": "saturate(1.1) brightness(1.03)", "font": "PermanentMarker", "pal": {"yellow": "#FFE066", "red": "#FF6B6B", "green": "#51CF66", "blue": "#4DABF7"}},
    "punch":       {"grade": "saturate(1.15) contrast(1.2)", "font": "Anton", "pal": {"yellow": "#FFD400", "red": "#FF3B3B", "green": "#5BE33B", "blue": "#5aa0ff"}},
}
FORMATS = {  # the story engine of the episode (AUTOPILOT.md §creative explains each)
    "experiment": "Dave tests it on himself with a goal a deadline and a scoreboard",
    "story": "one person (you or Dave) lives it from morning to night",
    "countdown": "ranked list counting down to the worst one",
    "myth_bust": "the thing everyone believes then the proof it is wrong",
    "trial": "a courtroom where a company or habit is on trial and you are the judge",
    "heist": "how they take your money told like a heist plan step by step",
    "game_show": "you are the contestant and every round costs you money",
    "investigation": "follow the money from your wallet to who ends up with it",
    "time_travel": "the same money in the past now and the future",
    "simulation": "two versions of you make different choices and we watch both",
}
HOOK_FORMS = ["question", "shocking_number", "cold_open", "challenge", "mistake", "prediction", "confession"]
MOODS = {
    "tense": ["hitman", "investigations", "scheming_weasel_faster"],
    "comic": ["comic_plodding", "monkeys_spinning_monkeys", "pixel_peeker_polka_faster", "life_of_riley"],
    "sad": ["darkest_child", "hiding_your_reality"],
    "think": ["thinking_music", "unanswered_questions", "sneaky_snitch"],
    "hype": ["volatile_reaction", "crypto"],
}
SFX = sorted({p.stem for p in Path("public/sfx/ea1").glob("*.wav")})
SFX_ROOT = ["swish_fast", "snap_white", "slide", "tick", "count_roll", "ding", "trombone", "thud", "whoosh", "pop", "stamp", "drumroll", "cash", "coin"]


def sfx_path(name):
    return f"ea1/{name}" if name in SFX else name


def norm(s):
    return re.sub(r"[^a-z0-9']", "", s.lower())


def load(eid):
    p = Path(f"pipeline/auto/{eid}.json")
    if not p.exists():
        sys.exit(f"no spec: {p} (copy pipeline/auto/_example.json)")
    return json.loads(p.read_text(encoding="utf8"))


def lines_of(spec):
    """[(line_id, chapter_index (0 = hook), line)] in spoken order"""
    out = [(f"k{i + 1}", 0, ln) for i, ln in enumerate(spec["hook"]["lines"])]
    for ci, ch in enumerate(spec["chapters"], 1):
        out += [(f"c{ci}_{j + 1:02d}", ci, ln) for j, ln in enumerate(ch["lines"])]
    return out


# ───────────────────────────── gate 1: the spec (before voicing) ─────────────────────────────
def check(eid, quiet=False):
    s = load(eid)
    E, W = [], []  # errors (must fix), warnings (should fix)
    for k in ("id", "title", "sources", "shots", "hook", "chapters"):
        if k not in s:
            E.append(f"missing top-level key '{k}'")
    if E:
        return report(eid, E, W)
    if s["id"] != eid:
        E.append(f"id is '{s['id']}' but file is {eid}.json")
    if s.get("outfit", "hoodie") not in OUTFITS:
        E.append(f"outfit must be one of {OUTFITS}")
    src_ids = {x.get("id") for x in s["sources"]}
    for x in s["sources"]:
        if not all(x.get(k) for k in ("id", "short", "url")):
            E.append(f"source {x} needs id + short + url")
        elif len([p for p in re.sub(r"^https?://[^/]+", "", x["url"]).split("/") if p]) < 1 or x["url"].rstrip("/").count("/") < 3:
            E.append(f"source {x['id']}: '{x['url']}' is a homepage — link the exact page/report that shows the number")
    # shots
    for n, sh in s["shots"].items():
        if not re.fullmatch(r"[A-JL-Z]", n):
            E.append(f"shot name '{n}' must be ONE capital letter (not K)")
        t = sh.get("tpl")
        if t not in TPL:
            E.append(f"shot {n}: tpl '{t}' unknown — use one of {sorted(TPL)}")
            continue
        req, opt, _ = TPL[t]
        for r_ in req:
            if r_ not in sh:
                E.append(f"shot {n} ({t}) needs '{r_}'")
        for k in sh:
            if k not in req + opt + ["tpl"]:
                E.append(f"shot {n} ({t}): unknown param '{k}' (allowed: {req + opt})")
        if sh.get("outfit") and sh["outfit"] not in OUTFITS:
            E.append(f"shot {n}: outfit must be one of {OUTFITS}")
        for k in ("headlines", "walls"):
            if k in sh and (not isinstance(sh[k], list) or not 1 <= len(sh[k]) <= (3 if k == "walls" else 8)):
                E.append(f"shot {n}: '{k}' must be a list of 1-{3 if k == 'walls' else 8} short texts")
        for k in ("paper", "giant", "total", "sign", "label"):
            if k in sh and len(str(sh[k])) > 40:
                E.append(f"shot {n}: '{k}' text too long (max 40 chars)")
    # creative identity gate: never the same look / format as the last 2 episodes, never the same hook form twice in a row
    lk = s.get("look", {})
    for k, ok in (("style", STYLES), ("format", FORMATS), ("hook_form", HOOK_FORMS)):
        if lk.get(k) not in ok:
            E.append(f"look.{k} must be one of {list(ok)}")
    prev = sorted((q for q in Path("pipeline/auto").glob("*.json") if q.stem != eid), key=lambda q: q.stat().st_mtime)[-2:]
    for i, q in enumerate(reversed(prev)):
        try:
            pl = json.loads(q.read_text(encoding="utf8")).get("look", {})
        except ValueError:
            continue
        for k in ("style", "format") + (("hook_form",) if i == 0 else ()):
            if pl.get(k) and pl.get(k) == lk.get(k):
                E.append(f"look.{k} '{lk[k]}' was used by {q.stem} — pick another so videos never look alike")
    # variety gate: the look must come from THIS script, not from ea1
    sc_ = {n: sh for n, sh in s["shots"].items() if sh.get("tpl") == "scene"}
    old = [n for n, sh in s["shots"].items() if sh.get("tpl") in OLD_SETS]
    if len(old) > 2:
        E.append(f"shots {old}: max 2 ea1 sets per episode — rebuild the others as tpl 'scene' from the objects in the line")
    if len(sc_) < 6:
        E.append(f"need ≥ 6 'scene' shots (have {len(sc_)}) — each one = a sky + the objects the line talks about")
    for n, sh in sc_.items():
        if CAT:
            if sh.get("sky") not in CAT["hdris"]:
                E.append(f"shot {n}: sky '{sh.get('sky')}' not in pipeline/ASSETS.md skies")
            for k in ("ground", "room"):
                if sh.get(k) and sh[k] not in CAT["textures"]:
                    E.append(f"shot {n}: {k} '{sh[k]}' not in pipeline/ASSETS.md textures")
            for m in sh.get("props", []) + ([sh["hero"]] if sh.get("hero") else []):
                if m not in CAT["models"]:
                    E.append(f"shot {n}: model '{m}' not in pipeline/ASSETS.md models")
        if not sh.get("hero") and not sh.get("props"):
            E.append(f"shot {n}: a scene needs a 'hero' object (the thing the line names) and/or 'props'")
        if len(sh.get("props", [])) > 6:
            E.append(f"shot {n}: max 6 props")
        for k, ok in (("move", MOVES), ("dave", DACT), ("hero_fx", HFX)):
            if sh.get(k) and sh[k] not in ok:
                E.append(f"shot {n}: {k} must be one of {ok}")
        if sh.get("pose") and sh["pose"] not in BPOSES:
            E.append(f"shot {n}: pose must be one of {BPOSES}")
        if sh.get("face") and sh["face"] not in FACES:
            E.append(f"shot {n}: face must be one of {FACES}")
    skies = [sh.get("sky") for sh in sc_.values()]
    if sc_ and len(set(skies)) < min(4, len(skies)):
        E.append(f"scene shots use only {len(set(skies))} different skies — use ≥ 4 places (match each line's place)")
    moves = [sh.get("move", "push") for sh in sc_.values()]
    if sc_ and len(set(moves)) < 3:
        E.append("scene shots: use ≥ 3 different camera moves")
    past = set()
    for q in Path("pipeline/auto").glob("*.json"):
        if q.stem != eid:
            try:
                past |= {sh.get("sky") for sh in json.loads(q.read_text(encoding="utf8")).get("shots", {}).values() if sh.get("tpl") == "scene"}
            except ValueError:
                pass
    rep = [x for x in set(skies) if x in past]
    if len(rep) > len(set(skies)) // 2:
        W.append(f"skies {rep} were used in earlier episodes — pick new places so the channel never looks repeated")
    used = set()
    L = lines_of(s)
    if not 3 <= len(s["hook"]["lines"]) <= 6:
        E.append("hook must have 3-6 lines (prize/result → twist → question → promise)")
    if s["hook"].get("mood", "tense") not in MOODS:
        E.append(f"hook mood must be one of {list(MOODS)}")
    if not 3 <= len(s["chapters"]) <= 9:
        E.append("need 3-9 chapters")
    for ci, ch in enumerate(s["chapters"], 1):
        if not ch.get("title") or len(ch["title"]) > 18:
            E.append(f"chapter {ci}: title missing or > 18 chars")
        if ch.get("mood") not in MOODS:
            E.append(f"chapter {ci}: mood must be one of {list(MOODS)}")
        st = ch.get("set")
        if not (isinstance(st, list) and len(st) == 2 and st[0] in s["shots"]):
            E.append(f"chapter {ci}: set must be [\"<shot letter>\", <second>] of a defined shot")
        else:
            used.add(st[0])
        if len(ch.get("lines", [])) < 3:
            E.append(f"chapter {ci}: needs ≥ 3 lines")
    total_words = 0
    for lid, ci, ln in L:
        say = ln.get("say", "")
        words = say.split()
        total_words += len(words)
        if not say:
            E.append(f"{lid}: empty say")
            continue
        if "," in say:
            E.append(f"{lid}: no commas in spoken lines (rewrite as connected speech): {say[:60]}")
        if re.search(r"\d", say):
            E.append(f"{lid}: write numbers as words (thirty three million), not digits: {say[:60]}")
        if len(words) > 40:
            E.append(f"{lid}: line too long ({len(words)} words, max 40) — split it")
        sents = [x for x in re.split(r"[.!?]+", say) if x.strip()]
        if len(sents) >= 3 and sum(len(x.split()) <= 3 for x in sents) >= 3:
            E.append(f"{lid}: fragment chain (3+ tiny sentences) — write connected human sentences")
        for sid in re.findall(r"S\d+", ln.get("src", "")):
            if sid not in src_ids:
                E.append(f"{lid}: src {sid} not in sources")
        if ln.get("mood") and ln["mood"] not in MOODS:
            E.append(f"{lid}: mood must be one of {list(MOODS)}")
        toks = [norm(w) for w in words]
        last_pos, has_bg = -1, False
        show = ln.get("show", [])
        if not show:
            E.append(f"{lid}: 'show' is empty — every line needs ≥ 1 visual")
        for e in show:
            v = e.get("v")
            if v not in BG and v not in OV:
                E.append(f"{lid}: v '{v}' unknown — use one of {list(BG) + list(OV)}")
                continue
            for r_ in (BG[v] if v in BG else OV[v]):
                if r_ not in e:
                    E.append(f"{lid}: {v} needs '{r_}'")
            on = e.get("on")
            if on:
                hits = [i for i, t in enumerate(toks) if t.startswith(norm(on))]
                n = e.get("n", 0)
                if len(hits) <= n:
                    E.append(f"{lid}: on-word '{on}' (n={n}) is not in the line: {say[:60]}")
                elif hits[n] < last_pos:
                    E.append(f"{lid}: events out of order ('{on}' comes before an earlier event's word)")
                else:
                    last_pos = hits[n]
            elif last_pos > 0:
                E.append(f"{lid}: event without 'on' after an anchored event — give it an on-word")
            else:
                last_pos = max(last_pos, 0)
            if v in BG:
                has_bg = True
            if v in ("shot", "still"):
                if e.get("shot") not in s["shots"]:
                    E.append(f"{lid}: shot '{e.get('shot')}' is not defined in shots")
                used.add(e.get("shot"))
            if v in ("pose", "still", "home") and e.get("pose") and e["pose"] not in POSES:
                E.append(f"{lid}: pose '{e['pose']}' unknown — use one of {POSES}")
            if v == "pose" and e.get("pose") not in POSES:
                E.append(f"{lid}: pose needs pose = one of {POSES}")
            if v == "macro":
                ls = e.get("lines", [])
                if not (isinstance(ls, list) and len(ls) == 3 and ls[1].count("[") == 1 and ls[1].count("]") == 1):
                    E.append(f"{lid}: macro lines = [above, 'text [HIGHLIGHT] text', below] (verbatim quote) ")
                elif len(re.search(r"\[(.*)\]", ls[1]).group(1)) > 45:
                    E.append(f"{lid}: macro highlight > 45 chars — highlight only the key words of the quote")
                if not ln.get("src"):
                    E.append(f"{lid}: a macro quote needs a src")
            if v == "text" and len(e.get("text", "")) > 30:
                E.append(f"{lid}: text overlay > 30 chars: {e['text']}")
            if v == "burst" and len(e.get("word", "")) > 12:
                E.append(f"{lid}: burst word > 12 chars")
            if v in ("text", "count", "stamp") and e.get("color", "white") not in COLORS:
                E.append(f"{lid}: color must be one of {list(COLORS)}")
            if v == "sfx" and e.get("sound") not in SFX + SFX_ROOT:
                E.append(f"{lid}: sound '{e.get('sound')}' unknown — use one of {SFX + SFX_ROOT}")
            if v == "clip":
                E.append(f"{lid}: YouTube clips are OFF (owner 8 Nov: copyright risk) — use a 3D scene instead")
            if v == "clip" and (len(str(e.get("query", ""))) < 6 or len(str(e["query"])) > 80):
                E.append(f"{lid}: clip query must be 6-80 chars (what the footage shows, e.g. 'empty apartment for rent sign')")
            if v == "photo" and not Path(f"public/{eid}/{e.get('file', '')}").exists():
                E.append(f"{lid}: photo file public/{eid}/{e.get('file')} not found")
            if v == "count" and not isinstance(e.get("to"), (int, float)):
                E.append(f"{lid}: count 'to' must be a number")
        if lid == "k1":
            first = show[0] if show else {}
            if first.get("v") != "shot" or first.get("on") or not TPL.get(s["shots"].get(first.get("shot"), {}).get("tpl"), ([], [], False))[2]:
                E.append("k1: the FIRST event must be a moving 3D shot at frame 0 (no 'on'), template with motion: " + ", ".join(t for t, x in TPL.items() if x[2]))
            if not any(e.get("v") in ("count", "text") for e in show):
                E.append("k1: the prize needs a big number (count) or text on screen")
        if ci == 0 and any(e.get("v") in ("checks", "macro") for e in show):
            E.append(f"{lid}: no info cards (checks/macro) in the hook — keep it pure images")
        if ci > 0 and lid.endswith("_01") and not (show and show[0].get("v") in BG and not show[0].get("on")):
            E.append(f"{lid}: the first line of a chapter must start with a background (shot/still/pose/macro/home)")
    hook = s["hook"]["lines"]
    hw = sum(len(ln["say"].split()) for ln in hook)
    if hw > 45:
        E.append(f"hook has {hw} words (max 45 ≈ 15 s): cut words — prize, twist, question, promise in short lines")
    if not any("?" in ln["say"] for ln in hook[1:4]):
        E.append("hook: the QUESTION (= the title) must be line 2, 3 or 4 and end with '?'")
    if "you" not in " ".join(norm(w) for w in hook[-1]["say"].split()).split():
        W.append("hook: the last hook line (promise) should talk to 'you'")
    for n in s["shots"]:
        if n not in used:
            W.append(f"shot {n} defined but never used (it still costs render time) — remove it")
    # estimated rhythm (0.33 s per word): a new image at least every 3 s
    est_gap(s, E, W)
    loops(s, E)
    gags = [ln for _, _, ln in L if ln.get("gag")]
    if len(gags) < 4:
        W.append(f"running gag: mark the 4-6 lines that repeat the gag with \"gag\": true (found {len(gags)})")
    if not any("guess" in ln["say"].lower() for _, _, ln in L):
        W.append("no 'have a guess' moment (one per video)")
    last = s["chapters"][-1]["lines"]
    if not any("comment" in ln["say"].lower() for ln in last):
        E.append("last chapter must ask a comment question (the word 'comment' in a line)")
    if "signoff" not in s:
        W.append("add \"signoff\": Dave's fixed last line (same every video)")
    mins = total_words / 175
    if not quiet:
        print(f"{eid}: {len(L)} lines, {total_words} words ≈ {mins:.1f} min, {len(s['shots'])} shots")
    return report(eid, E, W, quiet)


def est_gap(s, E, W):
    for lid, ci, ln in lines_of(s):
        toks = ln["say"].split()
        dur = len(toks) * 0.33 + 0.4
        marks = []
        for e in ln.get("show", []):
            if e.get("v") in BG or e.get("v") in ("text", "count", "burst", "stamp", "bars", "checks"):
                on = e.get("on")
                pos = 0
                if on:
                    hits = [i for i, t in enumerate(toks) if norm(t).startswith(norm(on))]
                    pos = hits[min(e.get("n", 0), len(hits) - 1)] if hits else 0
                marks.append(pos * 0.33)
        marks = sorted(set(marks)) + [dur]
        for a, b in zip(marks, marks[1:]):
            if b - a > 5.0:
                E.append(f"{lid}: ~{b - a:.1f} s without anything new on screen — add an event on a later word (rule: new image every ≤ 3 s; 3-5 s gaps get an automatic camera punch-in)")


def loops(s, E):
    """loop method (owner 31 Oct): L1 opens in the hook, closes only in the last chapter; ≥ 2 open at every chapter start;
    every chapter but the last ends with a loop it opened still open; ≥ 2 long arcs (span ≥ 2 chapters); all closed."""
    live, spans = {}, {}
    for ln in s["hook"]["lines"]:
        for i in ln.get("open", []):
            live[i] = 0
    if "L1" not in live:
        E.append("loops: the hook must open L1 (\"open\": [\"L1\"] on the question line)")
    n = len(s["chapters"])
    for ci, ch in enumerate(s["chapters"], 1):
        if len(live) < 2:
            E.append(f"loops: chapter {ci} starts with {len(live)} open loop(s) (need ≥ 2) — open a 2nd loop earlier")
        here = set()
        for ln in ch["lines"]:
            for i in ln.get("open", []):
                live[i], _ = ci, here.add(i)
            for i in ln.get("close", []):
                if i not in live:
                    E.append(f"loops: chapter {ci} closes {i} which is not open")
                    continue
                spans[i] = ci - live.pop(i)
                if i == "L1" and ci != n:
                    E.append(f"loops: L1 (main payoff) closes in chapter {ci}, must close in the LAST chapter")
        if ci < n and not (here & set(live)):
            E.append(f"loops: chapter {ci} must end with a teaser — open a loop in it that stays open")
    if live:
        E.append(f"loops never closed: {sorted(live)}")
    arcs = [i for i, sp in spans.items() if i != "L1" and sp >= 2]
    if len(arcs) < 2:
        E.append(f"loops: need ≥ 2 long loops besides L1 that span ≥ 2 chapters (have {arcs})")


def report(eid, E, W, quiet=False):
    for e in E:
        print("  ✗", e)
    for w in W:
        print("  ⚠", w)
    print("SPEC OK" if not E else f"{len(E)} error(s) — fix the spec and run check again")
    return not E


# ───────────────────────────── voice ─────────────────────────────
def write_voice_json(eid):
    s = load(eid)
    beats = []
    for lid, ci, ln in lines_of(s):
        punch = len(ln["say"].split()) <= 9 or ln.get("punch")
        b = {"id": lid, "src": ln.get("src", ""), "text": ln["say"], "pause": 0.6 if punch else 0.35}
        if punch or ci == 0:
            b["exag"] = 0.55
        beats.append(b)
    if s.get("signoff"):
        beats.append({"id": "zz", "src": "", "text": s["signoff"], "pause": 0.6, "exag": 0.55})
    ep = {"id": eid, "title": s["title"], "style": "v7", "voice": "chatterbox", "cb": {"cfg": 0.25, "exag": 0.5},
          "note": "AUTOPILOT episode — generated from pipeline/auto/%s.json by tools/auto.py, do not edit" % eid,
          "sources": [f"{x['id']} {x.get('fact', '')} — {x['short']} {x['url']}" for x in s["sources"]], "beats": beats}
    Path(f"pipeline/episodes/{eid}.json").write_text(json.dumps(ep, indent=2, ensure_ascii=False), encoding="utf8")


def sh(*a, check=True, capture=False):
    print("$", " ".join(str(x) for x in a)[:160], flush=True)
    r = subprocess.run([str(x) for x in a], check=check, capture_output=capture, text=True)
    return r.stdout.strip() if capture else r.returncode


def push(paths, msg):
    sh("git", "add", *paths)
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode == 0:
        print("nothing new to push")
        return sh("git", "rev-parse", "HEAD", capture=True)
    sh("git", "commit", "-q", "-m", msg)
    ok = False
    for _ in range(5):
        if sh("git", "pull", "--rebase", "--autostash", "-q", check=False) == 0 and sh("git", "push", "-q", check=False) == 0:
            ok = True
            break
        time.sleep(8)
    if not ok:
        sys.exit("git push failed 5 times — check your internet / git login, then run the same command again")
    return sh("git", "rev-parse", "HEAD", capture=True)


def wait_run(workflow, sha=None, since=None, timeout=4 * 3600):
    """find the run of <workflow> for commit sha (or the newest started after `since`) and block until it ends"""
    t0 = time.time()
    rid = None
    while not rid and time.time() - t0 < 300:
        r_ = subprocess.run([GH, "run", "list", "--workflow", workflow, "--limit", "10", "--json", "databaseId,headSha,createdAt,event"], capture_output=True, text=True)
        out = r_.stdout if r_.returncode == 0 else "[]"
        for r in json.loads(out or "[]"):
            if (sha and r["headSha"] == sha) or (since and r["createdAt"] >= since):
                rid = r["databaseId"]
                break
        if not rid:
            time.sleep(15)
    if not rid:
        sys.exit(f"no {workflow} run found")
    print(f"waiting for {workflow} run {rid} …", flush=True)
    # own poll loop: weak PC / flaky wifi -> a network error is retried, never treated as a failed run
    while True:
        r_ = subprocess.run([GH, "run", "view", str(rid), "--json", "status,conclusion"], capture_output=True, text=True)
        try:
            st = json.loads(r_.stdout)
        except ValueError:
            st = {}
        if st.get("status") == "completed":
            break
        if time.time() - t0 > timeout:
            sys.exit(f"{workflow} run {rid} still running after timeout — later: --resume")
        time.sleep(60)
    if st.get("conclusion") != "success":
        sys.exit(f"{workflow} run {rid} FAILED — open it: {GH} run view {rid} --log-failed")
    return rid


def last_ok(workflow, title_has=""):
    """resume after the waiter died (weak PC): newest SUCCESSFUL run of workflow, no push, no dispatch"""
    r_ = subprocess.run([GH, "run", "list", "--workflow", workflow, "--limit", "30", "--json", "databaseId,conclusion,displayTitle"], capture_output=True, text=True)
    for r in json.loads(r_.stdout or "[]"):
        if r["conclusion"] == "success" and title_has in r["displayTitle"]:
            return r["databaseId"]
    sys.exit(f"no successful {workflow} run yet — still running? check: {GH} run list --workflow {workflow}")


def utcnow():
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(time.time() - 5))


def voice(eid):
    if not check(eid, quiet=True):
        sys.exit("spec has errors")
    write_voice_json(eid)
    sha = push([f"pipeline/episodes/{eid}.json", f"pipeline/auto/{eid}.json"], f"{eid}: autopilot script")
    if Path(f"pipeline/voice/{eid}.json").exists() and sh("py" if os.name == "nt" else "python3", "pipeline/tts_cb.py", eid, "--check", check=False) == 0:
        print("voice already up to date")
        return
    wait_run("voice.yml", sha=sha)
    sh("git", "pull", "--rebase", "--autostash", "-q")
    if not Path(f"pipeline/voice/{eid}.flac").exists():
        sys.exit("voice file missing after the run")
    print("VOICE OK")


# ───────────────────────────── build: the frame plan ─────────────────────────────
def timing(eid):
    if not Path(f"src/v6/{eid}_timing.json").exists() or os.path.getmtime(f"src/v6/{eid}_timing.json") < os.path.getmtime(f"pipeline/voice/{eid}.json"):
        Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
        sh(sys.executable, "tools/voice_gaps.py", eid, str(GAP_S))
    return json.loads(Path(f"src/v6/{eid}_timing.json").read_text(encoding="utf8"))


def fr(t):
    return round(t * STRETCH * FPS)


def plan(eid):
    s, V = load(eid), timing(eid)
    B = {b["id"]: b for b in V["beats"]}

    def at(lid, word=None, n=0):
        b = B[lid]
        if not word:
            return fr(b["start"])
        hits = [w for w in b["words"] if norm(w["text"]).startswith(norm(word))]
        return fr(hits[n]["start"] if len(hits) > n else b["start"])

    total = fr(V["total"]) + FPS
    src = {x["id"]: x["short"] for x in s["sources"]}
    ev = []  # (frame, order, kind, event, line_id, chapter)
    order = 0
    for ci, ch in enumerate(s["chapters"], 1):
        ev.append((at(f"c{ci}_01") - GAP, order, "bg", {"v": "chapter", "title": ch["title"], "shot": ch["set"][0], "t": ch["set"][1]}, f"c{ci}_01", ci))
        order += 1
    for lid, ci, ln in lines_of(s):
        for e in ln.get("show", []):
            a = at(lid, e.get("on"), e.get("n", 0)) + int(e.get("dt", 0))
            ev.append((0 if lid == "k1" and not e.get("on") else a, order, "bg" if e["v"] in BG else "ov", e, lid, ci))
            order += 1
    if s.get("signoff") and "zz" in B:
        ev.append((at("zz"), order, "bg", {"v": "pose", "pose": "grin_cheer"}, "zz", len(s["chapters"])))
    ev.sort(key=lambda x: (x[0], x[1]))
    bgs, ovs, cues = [], [], []
    first_use, played = {}, {}
    chap_set = [None] + [c["set"] for c in s["chapters"]]
    roll = ["ea1/k_flash", "ea1/reply_pop", "ea1/photo_slide"]
    bgi = [i for i, x in enumerate(ev) if x[2] == "bg"]
    slot = 0
    for idx, (a, _, kind, e, lid, ci) in enumerate(ev):
        v = e["v"]
        if kind == "bg":
            nxt = next((ev[j][0] for j in bgi if j > idx), total)
            b = {"from": a, "to": max(a + 1, nxt), "k": v}
            if v in ("shot", "still", "chapter"):
                n = e["shot"]
                if v == "shot":
                    first_use.setdefault(n, a)
                    b["off"] = float(e["from"]) if "from" in e else round(played.get(n, 0) / FPS, 2)
                    played[n] = round(b["off"] * FPS) + (b["to"] - b["from"])
                else:
                    b["t"] = float(e["t"])
                b["n"] = n
            if v in ("still", "home", "pose"):
                b["pose"] = e.get("pose")
            if v == "pose":
                b["set"] = chap_set[ci] if ci else [next(iter(s["shots"])), 1.0]
            if v == "chapter":
                b["title"] = e["title"]
            if v == "macro":
                b["lines"], b["far"] = e["lines"], e.get("far", ["", ""])
            if v == "photo":
                b["file"], b["label"] = e["file"], e.get("label", "")
            if v == "clip":  # real YouTube footage, fetched on GitHub by tools/clips.py (Creative Commons only by default)
                ncl = sum(1 for g in bgs if g["k"] == "clip")
                b["file"], b["query"], b["start"] = f"clip_{ncl}.mp4", e["query"], float(e.get("start", 0))
                b["to"] = min(b["to"], a + FPS * 8)  # hard cap 8 s per clip
            b["flash"] = ci == 0 or v in ("macro", "chapter", "photo", "home")
            bgs.append(b)
            slot = 0
            cues.append({"at": a, "src": roll[len(bgs) % 3], "v": 0.4})
            if v == "macro":
                cues.append({"at": a, "src": f"ea1/co_flash{len(bgs) % 3 + 1}", "v": 0.6})
            if v == "chapter":
                cues.append({"at": a, "src": "ea1/k_boom", "v": 0.55})
            if v in ("pose", "still") and (e.get("pose") or "").startswith("shock"):
                cues.append({"at": a + 2, "src": "ea1/k_boom", "v": 0.5})
            if v in ("pose", "still") and e.get("pose") == "neutral_shrug":
                cues.append({"at": a + 4, "src": "ea1/crickets", "v": 0.5})
            if v in ("pose", "still") and e.get("pose") == "sleep_slump":
                cues.append({"at": a + 2, "src": "ea1/fail", "v": 0.5})
        else:
            end = next((ev[j][0] for j in bgi if j > idx), total)
            o = {"from": a, "to": end, "k": v}
            col = COLORS.get(e.get("color", "yellow" if v == "count" else "white"))
            if v == "text":
                big = ci == 0  # hook (owner 5 Nov: hook text too small) → ~1.7x, centred-left, one line per slot
                o.update(text=e["text"], color=col, size=int(e.get("size", (200 if len(e["text"]) < 16 else 150) if big else (120 if len(e["text"]) < 16 else 92))), x=90, y=(70 + slot * 230) if big else 90 + slot * 150)
                slot += 1
                cues.append({"at": a, "src": "ea1/k_slam" if len(ovs) % 2 else "ea1/k_stop", "v": 0.5})
            elif v == "count":
                o.update(to=e["to"], prefix=e.get("prefix", ""), suffix=e.get("suffix", ""), dec=int(e.get("dec", 0)), color=col,
                         size=int(e.get("size", 150 if ci == 0 else 130)), x=110 if ci else 0, y=90 + slot * 150 if ci else 120, center=ci == 0, dur=int(e.get("dur", 36)))
                slot += 1
                cues += [{"at": a, "src": "ea1/roll33", "v": 0.55}] + [{"at": a + k, "src": "tick", "v": 0.25} for k in range(4, o["dur"], 6)]
            elif v == "burst":
                o.update(word=e["word"])
                cues.append({"at": a, "src": "ea1/k_boom", "v": 0.6})
            elif v == "stamp":
                o.update(text=e["text"], color=COLORS.get(e.get("color", "red")))
                cues.append({"at": a, "src": "ea1/stamp_un", "v": 0.55})
            elif v == "bars":
                o.update(rows=[{"label": r_[0], "pct": r_[1], "color": COLORS.get(r_[2] if len(r_) > 2 else "blue", "#2f6fd6")} for r_ in e["rows"]], max=max(r_[1] for r_ in e["rows"]) * 1.25)
                cues += [{"at": a + 3 * i, "src": "ea1/vote_tick", "v": 0.5} for i in range(len(e["rows"]))]
            elif v == "checks":
                o.update(title=e.get("title", ""), rows=[{"text": r_[0], "sub": r_[1] if len(r_) > 1 else "", "at": a + 14 + 22 * i} for i, r_ in enumerate(e["rows"])])
                cues += [{"at": a + 14 + 22 * i, "src": f"ea1/check{i % 2 + 1}", "v": 0.45} for i in range(len(e["rows"]))]
            elif v == "sfx":
                cues.append({"at": a, "src": sfx_path(e["sound"]), "v": float(e.get("vol", 0.55))})
                continue
            if ci == 0 or v in ("burst", "stamp"):
                ovs.append({"from": a, "to": a + 10, "k": "shake", "amp": 12})
            ovs.append(o)
        if e.get("sfx"):
            cues.append({"at": a + 2, "src": sfx_path(e["sfx"]), "v": 0.55})
    # one Src line per line that has a source (the viewer always sees where a claim comes from)
    for lid, ci, ln in lines_of(s):
        ids = re.findall(r"S\d+", ln.get("src", ""))
        if ids:
            a = at(lid)
            b_ = fr(B[lid]["end"]) + 6
            ovs.append({"from": a + 3, "to": b_, "k": "src", "text": " · ".join(src[i] for i in ids)})
    # 3D-shot template sounds (on the shot's first use)
    TS = {"rain": [(0, "ea1/cash_rain", 0.7)], "chair_spin": [(5 / 24, "ea1/k_spin", 0.7)], "office_walk": [(0, "ea1/door", 0.5), (0.2, "ea1/steps", 0.5)],
          "headlines": [(0, "ea1/co_paper", 0.6), (2.1, "ea1/co_book", 0.5)], "receipt": [(0.4, "ea1/co_paper2", 0.5), (0.4, "ea1/scribble", 0.4)],
          "ring": [(0.6, "ea1/k_boom", 0.4)], "walls": [(0.6, "ea1/k_slam", 0.6)], "towers": [(0.8, "ea1/cash_rain", 0.4)],
          "flyaway": [(0, "whoosh", 0.4)], "sign_topple": [(0, "ea1/scribble", 0.4)], "lamp": [(0, "ea1/heart", 0.35)],
          "scene": [(0.45, "ea1/k_slam", 0.45)]}
    for n, a in first_use.items():
        for dt, snd, vol in TS.get(s["shots"][n]["tpl"], []):
            cues.append({"at": a + round(dt * FPS), "src": snd, "v": vol})
    hook_end = at("c1_01") - GAP
    cues += [{"at": max(0, at(f"k{len(s['hook']['lines'])}") - 2), "src": "ea1/k_point", "v": 0.5},
             {"at": max(0, at(f"k{len(s['hook']['lines'])}") + 4), "src": "ea1/k_riser", "v": 0.4}]
    last = lines_of(s)[-1][0]
    cues.append({"at": at(last), "src": "ea1/end_riser", "v": 0.5})
    # music: one track per mood, switches when the mood changes, a hard stop before punch lines
    music, used = [], {m: 0 for m in MOODS}
    segs = []  # (from, mood)
    segs.append((0, s["hook"].get("mood", "tense")))
    stops = []
    for ci, ch in enumerate(s["chapters"], 1):
        segs.append((at(f"c{ci}_01") - GAP, ch["mood"]))
        for j, ln in enumerate(ch["lines"]):
            if ln.get("mood") and ln["mood"] != segs[-1][1]:
                segs.append((at(f"c{ci}_{j + 1:02d}"), ln["mood"]))
            if ln.get("punch"):
                stops.append((at(f"c{ci}_{j + 1:02d}") - 4, at(f"c{ci}_{j + 1:02d}") + 20))
    segs.append((total, None))
    for (a, mood), (b, _) in zip(segs, segs[1:]):
        lst = MOODS[mood]
        track = lst[used[mood] % len(lst)]
        used[mood] += 1
        cuts = [(x, y) for x, y in stops if a < x < b]
        p = a
        for x, y in cuts + [(b, b)]:
            if x - p > 10:
                music.append({"src": track, "from": p, "to": x - (4 if x < b else 0), "v": 0.08 if mood == "tense" else 0.07, "off": (p - a) + FPS * 7 * used[mood]})
            p = y
    # autofill: any stretch > 2.8 s without a new image gets hard camera punch-ins (cut, don't tween) every ~1.6 s
    marks = sorted({b["from"] for b in bgs} | {o["from"] for o in ovs if o["k"] in ("text", "count", "burst", "stamp", "bars", "checks")} | {total})
    np_ = 0
    for a, b in zip(marks, marks[1:]):
        lim, step = (45, 33) if a < hook_end else (84, 48)  # hook: new image every ≤ 1.5 s (target 0.5-1.5 s)
        if b - a > lim:
            k = int((b - a) // step)
            for j in range(1, k + 1):
                x = a + round((b - a) * j / (k + 1))
                kind = next((g["k"] for g in reversed(bgs) if g["from"] <= x), "shot")
                card = kind in ("macro", "home", "photo")
                ovs.append({"from": x, "to": b if j == k else a + round((b - a) * (j + 1) / (k + 1)), "k": "punch", "z": (1.05 if j % 2 else 1.09) if card else (1.16 if j % 2 else 1.3),
                            "ox": 50 if card else [70, 30, 55][np_ % 3], "oy": 50 if card else [40, 55, 35][np_ % 3]})
                cues.append({"at": x, "src": "swish_fast", "v": 0.3})
                np_ += 1
    cues = sorted([c for c in cues if 0 <= c["at"] < total], key=lambda c: c["at"])
    clips = [b for b in bgs if b["k"] == "clip"]
    if len(clips) > 6:
        sys.exit("max 6 clips per video")
    Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
    Path(f"public/{eid}/clips.json").write_text(json.dumps([{"file": b["file"], "query": b["query"], "start": b["start"], "sec": round((b["to"] - b["from"]) / FPS + 0.5, 1)} for b in clips], indent=1), encoding="utf8")
    lens = {}
    for b in bgs:
        if b["k"] == "shot":
            lens[b["n"]] = max(lens.get(b["n"], 0), math.ceil((b["off"] + (b["to"] - b["from"]) / FPS) * 24) + 6)
        if b["k"] in ("still", "chapter"):
            lens[b["n"]] = max(lens.get(b["n"], 0), math.ceil(b["t"] * 24) + 8)
    for b in bgs:
        if b["k"] == "pose":
            n, t = b["set"]
            lens[n] = max(lens.get(n, 0), math.ceil(t * 24) + 8)
    for n in s["shots"]:
        lens[n] = min(max(lens.get(n, 48), 48), 960)
    for b in bgs:
        if b["k"] == "shot":
            b["len24"] = lens[b["n"]]
    st = STYLES.get(s.get("look", {}).get("style", "punch"), STYLES["punch"])
    for o in ovs:  # remap the 4 accent colours to the episode's palette
        for k in ("color",):
            for name, hx in COLORS.items():
                if o.get(k) == hx and name in st["pal"]:
                    o[k] = st["pal"][name]
        for r_ in o.get("rows", []) if isinstance(o.get("rows"), list) else []:
            for name, hx in COLORS.items():
                if isinstance(r_, dict) and r_.get("color") == hx and name in st["pal"]:
                    r_["color"] = st["pal"][name]
    P = {"id": eid, "title": s["title"], "frames": total, "hookEnd": hook_end, "bgs": bgs, "ovs": ovs, "music": music, "sfx": cues, "lens": lens,
         "look": {"grade": st["grade"], "font": st["font"]}}
    Path("src/v6/auto").mkdir(exist_ok=True)
    Path(f"src/v6/auto/{eid}.plan.json").write_text(json.dumps(P), encoding="utf8")
    return P


def textures(eid):
    from PIL import Image, ImageDraw, ImageFont
    s = load(eid)
    F = "C:/Windows/Fonts/impact.ttf" if os.path.exists("C:/Windows/Fonts/impact.ttf") else None
    SERIF = "C:/Windows/Fonts/georgiab.ttf" if os.path.exists("C:/Windows/Fonts/georgiab.ttf") else None

    def font(path, size):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            return ImageFont.load_default()

    def fit(d, text, box_w, box_h, path, start=240):
        sz = start
        while sz > 14:
            f = font(path, sz)
            lines = wrap(d, text, f, box_w)
            h = sum(d.textbbox((0, 0), ln, font=f)[3] for ln in lines) * 1.15
            if h <= box_h and all(d.textlength(ln, font=f) <= box_w for ln in lines):
                return f, lines
            sz -= 6
        return font(path, 14), [text]

    def wrap(d, text, f, w):
        out, cur = [], ""
        for word in text.split():
            t = (cur + " " + word).strip()
            if d.textlength(t, font=f) <= w or not cur:
                cur = t
            else:
                out.append(cur)
                cur = word
        return out + ([cur] if cur else [])

    def draw_center(d, text, box, path, color):
        x0, y0, x1, y1 = box
        f, lines = fit(d, text, x1 - x0, y1 - y0, path)
        hs = [d.textbbox((0, 0), ln, font=f)[3] * 1.15 for ln in lines]
        y = y0 + ((y1 - y0) - sum(hs)) / 2
        for ln, h in zip(lines, hs):
            d.text((x0 + ((x1 - x0) - d.textlength(ln, font=f)) / 2, y), ln, font=f, fill=color)
            y += h

    def paper(text, w, h):
        im = Image.new("RGB", (w, h), (243, 239, 228))
        d = ImageDraw.Draw(im)
        d.rectangle([0, 0, w, int(h * 0.08)], fill=(29, 43, 79))
        draw_center(d, text.upper(), (int(w * 0.08), int(h * 0.12), int(w * 0.92), int(h * 0.5)), F, (25, 25, 30))
        for k in range(8):
            y = int(h * (0.56 + k * 0.05))
            d.rectangle([int(w * 0.1), y, int(w * (0.9 - 0.25 * (k % 3 == 2))), y + max(3, h // 120)], fill=(150, 150, 150))
        d.rectangle([int(w * 0.6), int(h * 0.92), int(w * 0.9), int(h * 0.925)], fill=(30, 30, 30))
        return im

    def board(text, w, h, bg, fg=(255, 255, 255), border=None):
        im = Image.new("RGB", (w, h), bg)
        d = ImageDraw.Draw(im)
        if border:
            d.rectangle([8, 8, w - 9, h - 9], outline=border, width=max(6, h // 40))
        draw_center(d, text.upper(), (int(w * 0.07), int(h * 0.1), int(w * 0.93), int(h * 0.9)), F, fg)
        return im

    def news(text, i):
        w, h = 1024, 1400
        im = Image.new("RGB", (w, h), (236, 232, 222))
        d = ImageDraw.Draw(im)
        d.text((60, 40), ["THE DAILY LEDGER", "MONEY TIMES", "THE EVENING POST", "MARKET HERALD"][i % 4], font=font(SERIF, 80), fill=(20, 20, 20))
        d.rectangle([60, 150, w - 60, 156], fill=(20, 20, 20))
        draw_center(d, text, (60, 190, w - 60, 700), F, (15, 15, 15))
        for k in range(14):
            for c in range(3):
                y = 760 + k * 42
                d.rectangle([60 + c * 310, y, 60 + c * 310 + 270 - (40 if k % 4 == 3 else 0), y + 14], fill=(160, 158, 150))
        return im

    def receipt_total(text):
        im = Image.open("blender/tex/receipt.png").convert("RGB").resize((512, 420))
        d = ImageDraw.Draw(im)
        d.rectangle([20, 140, 492, 300], fill=(250, 250, 248))
        draw_center(d, text.upper(), (30, 150, 482, 290), F, (200, 20, 20))
        return im

    out = []
    for n, sh_ in s["shots"].items():
        t, pre = sh_["tpl"], f"blender/tex/{eid}_{n}_"
        ims = {}
        if t == "rain" and sh_.get("item", "cash") != "cash":
            ims["item"] = board(sh_.get("label", sh_["item"]), 620, 340, (230, 225, 210), (30, 30, 30), (30, 30, 30))
        if t in ("desk_paper",):
            ims["paper"] = paper(sh_["paper"], 1000, 720)
        if t == "sign_topple":
            ims["paper"], ims["giant"] = paper(sh_["paper"], 680, 880), board(sh_["giant"], 600, 920, (235, 235, 240), (180, 20, 20), (180, 20, 20))
        if t == "flyaway":
            ims["paper"] = paper(sh_["paper"], 900, 600)
        if t == "room":
            ims["paper"] = paper(sh_["paper"], 600, 800)
        if t == "receipt":
            ims["total"] = receipt_total(sh_["total"])
        if t == "street":
            ims["sign"] = board(sh_["sign"], 1000, 600, (200, 25, 25))
        if t == "scene" and sh_.get("sign"):
            ims["sign"] = board(sh_["sign"], 1000, 620, (245, 245, 240), (25, 25, 25), (200, 25, 25))
        if t in ("ring", "headlines"):
            for i, h in enumerate(sh_["headlines"]):
                ims[f"news{i}"] = news(h, i)
        if t == "walls":
            for i, w in enumerate(sh_["walls"]):
                ims[f"wall{i}"] = board(w, 1200, 600, ((40, 60, 110), (30, 100, 60), (140, 40, 40))[i])
        if t in ("walls", "flyaway", "building_walk"):
            ims["dest"] = board(sh_.get("sign", "BANK"), 1440, 400, (20, 24, 30), (255, 212, 0))
        for k, im in ims.items():
            im.save(pre + k + ".png")
            out.append(pre + k + ".png")
    return out


def build(eid):
    if not Path(f"pipeline/voice/{eid}.json").exists():
        sys.exit("no voice yet — run: py tools/auto.py voice " + eid)
    P = plan(eid)
    lens = P["lens"]
    Path(f"blender/{eid}_lens.json").write_text(json.dumps(lens), encoding="utf8")
    chunks = []
    for n, L in sorted(lens.items()):
        chunks += [f"{n}:{a}-{min(L, a + 29)}" for a in range(1, L + 1, 30)]
    chunks.append("K:" + ",".join(POSES))
    if len(chunks) > 256:
        sys.exit(f"{len(chunks)} render chunks > 256 (GitHub matrix limit) — use fewer/shorter shots")
    Path(f"blender/{eid}.chunks").write_text(json.dumps(chunks), encoding="utf8")
    Path(f"blender/{eid}.py").write_text(f'AUTO_EP = "{eid}"  # autopilot stub (tools/auto.py) — the shots are templates in blender/auto.py\nimport os\nexec(compile(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "auto.py"), encoding="utf8").read(), "auto.py", "exec"))\n', encoding="utf8")
    textures(eid)
    ids = sorted(p.stem.replace(".plan", "") for p in Path("src/v6/auto").glob("*.plan.json"))
    ts = "// generated by tools/auto.py — every autopilot episode's frame plan\n"
    ts += "".join(f"import p_{i} from './auto/{i}.plan.json';\n" for i in ids)
    ts += "export const AUTO_PLANS = [" + ", ".join(f"p_{i}" for i in ids) + "];\n"
    Path("src/v6/autoEps.ts").write_text(ts, encoding="utf8")
    secs = P["frames"] / FPS
    f3d = sum(b["to"] - b["from"] for b in P["bgs"] if b["k"] in ("shot", "still", "pose", "chapter")) / P["frames"]
    print(f"plan: {secs / 60:.1f} min | {len(P['bgs'])} images | {len(P['sfx']) / (secs / 60):.0f} sfx/min | 3D {f3d:.0%} | {sum(lens.values())} shot frames in {len(chunks)} chunks")
    qa(eid, P)


def qa(eid, P=None):
    """gate 2 (real timing): rhythm, 3D share, sfx density, hook speed"""
    P = P or json.loads(Path(f"src/v6/auto/{eid}.plan.json").read_text(encoding="utf8"))
    E, W = [], []
    secs = P["frames"] / FPS
    marks = sorted({b["from"] for b in P["bgs"]} | {o["from"] for o in P["ovs"] if o["k"] in ("text", "count", "burst", "stamp", "bars", "checks", "punch")})
    for a, b in zip(marks, marks[1:] + [P["frames"]]):
        if (b - a) / FPS > 4.0:
            E.append(f"{(b - a) / FPS:.1f} s with nothing new at {a / FPS:.1f}s ({fmt(a)}) — add an event there")
    hook = [m for m in marks if m < P["hookEnd"]]
    if hook and max(b - a for a, b in zip(hook, hook[1:] + [P["hookEnd"]])) / FPS > 2.0:
        W.append("hook: a gap > 2 s without a new image (target 0.5-1.5 s)")
    f3d = sum(b["to"] - b["from"] for b in P["bgs"] if b["k"] in ("shot", "still", "pose", "chapter")) / P["frames"]
    if f3d < 0.5:
        E.append(f"only {f3d:.0%} of the video is 3D (need ≥ 50 %) — use more shot/still/pose")
    dens = len(P["sfx"]) / (secs / 60)
    if dens < 40:
        W.append(f"{dens:.0f} sfx cues/min (target ≥ 50) — add sfx events")
    run = 0
    for b in P["bgs"]:
        run = run + 1 if b["k"] in ("macro", "home", "photo") else 0
        if run >= 3:
            E.append(f"3 cards in a row at {fmt(b['from'])} (macro/home/photo) — put 3D between them (ea1 verdict: too many cards)")
            run = 0
    if P["hookEnd"] / FPS > 25:
        W.append(f"hook lasts {P['hookEnd'] / FPS:.0f} s (target 10-15 s)")
    for e in E:
        print("  ✗", e)
    for w in W:
        print("  ⚠", w)
    print("QA OK" if not E else f"{len(E)} QA error(s) — fix the spec, then: py tools/auto.py build {eid}")
    return not E


def fmt(f):
    s_ = f / FPS
    return f"{int(s_ // 60)}:{s_ % 60:04.1f}"


# ───────────────────────────── shots + final render ─────────────────────────────
def shots(eid, resume=False):
    if resume:
        return fetch_shots(eid, last_ok("blender.yml"))
    Path("blender/RUN").write_text(f"{eid} fast 12 cycles\n", encoding="utf8")
    paths = [f"blender/{eid}.py", f"blender/{eid}_lens.json", f"blender/{eid}.chunks", "blender/RUN", "blender/auto.py"] + [str(p) for p in Path("blender/tex").glob(f"{eid}_*.png")]
    sha = push(paths, f"{eid}: autopilot 3D shots")
    fetch_shots(eid, wait_run("blender.yml", sha=sha, timeout=6 * 3600))


def fetch_shots(eid, rid):
    """weak PC: shots stay on GitHub. Only the run id is saved; v6demo.yml pulls the <id>-fast artifact itself."""
    dst = Path(f"public/{eid}")
    dst.mkdir(parents=True, exist_ok=True)
    (dst / "SHOTS_RUN").write_text(str(rid), encoding="utf8")
    print(f"SHOTS OK: Blender run {rid} (artifact {eid}-fast stays on GitHub, render pulls it)")


def render(eid, resume=False):
    comp = "Auto-" + eid
    if resume:
        return fetch_final(eid, last_ok("v6demo.yml", comp))
    paths = [f"public/{eid}", f"src/v6/auto/{eid}.plan.json", f"src/v6/{eid}_timing.json", "src/v6/autoEps.ts", "src/v6/Auto.tsx", "src/v6/Root.tsx"]
    push(paths, f"{eid}: autopilot final render inputs")
    since = utcnow()
    sh(GH, "workflow", "run", "v6demo.yml", "-f", f"comp={comp}", "--ref", sh("git", "branch", "--show-current", capture=True))
    time.sleep(10)
    fetch_final(eid, wait_run("v6demo.yml", since=since))


def fetch_final(eid, rid):
    comp = "Auto-" + eid
    out = Path(f"videos/{eid}")
    out.mkdir(parents=True, exist_ok=True)
    tmp = Path(f"out/final_{eid}")
    shutil.rmtree(tmp, ignore_errors=True)
    sh(GH, "run", "download", rid, "-n", comp, "-D", tmp)
    shutil.copy(tmp / f"{comp}.mp4", out / f"{eid}.mp4")
    mp4 = out / f"{eid}.mp4"
    for q in ("qa_hook.jpg", "qa_sheet.jpg", "compare.md", "clips_credits.json"):
        if (tmp / q).exists():
            shutil.copy(tmp / q, out / q)
    if (out / "compare.md").exists():
        print((out / "compare.md").read_text(encoding="utf8").split("```")[0])
    write_description(eid, out)
    print(f"DONE → {mp4}  (QA images: {out / 'qa_hook.jpg'}, {out / 'qa_sheet.jpg'})")


def write_description(eid, out):
    s = load(eid)
    music = sorted({m["src"] for m in json.loads(Path(f"src/v6/auto/{eid}.plan.json").read_text(encoding="utf8"))["music"]})
    names = {"hitman": "Hitman", "investigations": "Investigations", "scheming_weasel_faster": "Scheming Weasel (faster)", "comic_plodding": "Comic Plodding",
             "monkeys_spinning_monkeys": "Monkeys Spinning Monkeys", "pixel_peeker_polka_faster": "Pixel Peeker Polka (faster)", "life_of_riley": "Life of Riley",
             "darkest_child": "Darkest Child", "hiding_your_reality": "Hiding Your Reality", "thinking_music": "Thinking Music",
             "unanswered_questions": "Unanswered Questions", "sneaky_snitch": "Sneaky Snitch", "volatile_reaction": "Volatile Reaction", "crypto": "Crypto"}
    t = s.get("description", s["title"]) + "\n\nSources:\n" + "\n".join(f"{x['id']} {x['short']} — {x['url']}" for x in s["sources"])
    t += "\n\nMusic (Creative Commons: By Attribution 4.0):\n" + "\n".join(f'"{names.get(m, m)}" Kevin MacLeod (incompetech.com)' for m in music)
    cc = out / "clips_credits.json"
    if cc.exists() and json.loads(cc.read_text(encoding="utf8")):
        t += "\n\nFootage (Creative Commons Attribution, via YouTube):\n" + "\n".join(f'"{c["title"]}" by {c["channel"]} — {c["url"]}' for c in json.loads(cc.read_text(encoding="utf8")))
    t += "\nhttp://creativecommons.org/licenses/by/4.0/\n\nAnimation, voice and sound effects made for this channel."
    (out / "description.txt").write_text(t, encoding="utf8")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cmd, eid = sys.argv[1], sys.argv[2]
    if cmd == "check":
        sys.exit(0 if check(eid) else 1)
    if cmd == "voice":
        voice(eid)
    elif cmd == "build":
        build(eid)
    elif cmd == "qa":
        sys.exit(0 if qa(eid) else 1)
    elif cmd == "shots":
        shots(eid, "--resume" in sys.argv)
    elif cmd == "render":
        render(eid, "--resume" in sys.argv)
    elif cmd == "all":
        if not check(eid):
            sys.exit(1)
        voice(eid)
        build(eid)
        if not qa(eid):
            sys.exit(1)
        shots(eid, "--resume" in sys.argv)
        render(eid, "--resume" in sys.argv)
    else:
        sys.exit(__doc__)
