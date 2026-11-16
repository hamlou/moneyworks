"""CINEMATIC DOCUMENTARY autopilot (LONG.md [DOC]): ONE spec file → a finished video. No 3D, no Blender, no hand-written code.
  py tools/doc.py check <id>            every ✗ must be fixed until "SPEC OK"
  py tools/doc.py images <id>           lists the stills still missing + the exact prompt for each (owner makes them in Gemini)
  py tools/doc.py voice <id>            writes pipeline/episodes/<id>.json (push it → voice.yml voices it on GitHub)
  py tools/doc.py build <id> [--fake]   voice timing → src/v6/doc/<id>.plan.json + src/v6/docEps.ts (composition Doc-<id>); --fake = no voice yet
  py tools/doc.py thumb <id>            public/<id>/thumb.jpg (owner's picture from thumb.prompt) + the words in code → 3 versions + phone test
  py tools/doc.py stills <id> [frames]  renders preview frames to videos/<id>/preview/ (light, runs on the owner's PC)
  py tools/doc.py render <id> [parts]   writes pipeline/split/RUN (push it → v6split.yml renders on GitHub)
Spec = pipeline/doc/<id>.json (format + rules: LONG.md [DOC])."""
import json, os, re, subprocess, sys
from pathlib import Path

R = Path(__file__).resolve().parent.parent
os.chdir(R)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
FPS, LEAD = 30, 5  # things start 5 frames BEFORE their word: a late picture reads as "does not match"
# kind → {event: max text length}; MAXN = how many of the main event one scene holds
KINDS = {"flash": {"word": 16}, "image": {"label": 28, "big": 18, "deny": 20}, "drain": {"stamp": 10}, "title": {"title": 34, "stamp": 30}, "card": {"stat": 0, "bar": 0, "stamp": 22}, "receipt": {"row": 0, "circle": 0}, "list": {"row": 34},
         "stats": {"stat": 0}, "tiles": {"tile": 24}, "quote": {"quote": 140}, "headline": {"head": 90}, "clock": {"time": 12, "sub": 44}}
MAXN = {"flash": ("word", 6), "drain": ("stamp", 1), "title": ("title", 1), "image": ("label", 4), "card": ("stat+bar", 3), "receipt": ("row", 8), "list": ("row", 5), "stats": ("stat", 3), "tiles": ("tile", 6), "quote": ("quote", 2), "headline": ("head", 2), "clock": ("time", 3)}
MOVES = "push pull left right".split()
POSN = "tl tr bl br l r".split()
PICTO = "person laptop key door lock mask tunnel gun".split()
MOODS = {"tense": "km/investigations.mp3", "dark": "km/darkest_child.mp3", "mystery": "km/unanswered_questions.mp3", "drive": "km/hitman.mp3",
         "react": "km/volatile_reaction.mp3", "sad": "km/hiding_your_reality.mp3", "think": "km/thinking_music.mp3", "none": None}
MUSIC_V, SFX_V = 0.06, 0.2
# SOUND DESIGN (owner 15 Nov: "rich in sound effects"). Every visual event = a LAYER of sounds from the library
# (public/sfx/lib = real CC0 recordings, public/sfx/doc = made by us; list: py pipeline/sfx_doc.py list).
# (category, volume, lead): lead=True → the sound ENDS on the event (risers build up into it).
SOUND = {
    "word": [("hit", 1.0, False), ("whoosh", 0.6, False)], "scene_flash": [("sub_drop", 0.6, False)], "scene_open": [("hit", 1.0, False), ("braam", 0.7, False)],
    "label": [("blip", 0.7, False)], "sub": [("blip", 0.6, False)], "tile": [("blip", 0.8, False), ("shimmer", 0.35, False)],
    "big": [("riser", 0.6, True), ("hit", 1.0, False), ("sub_drop", 0.7, False)],
    "stat": [("count", 0.7, False), ("shimmer", 0.4, False)], "bar": [("whoosh", 0.7, False), ("tick", 0.5, False)],
    "stamp": [("stamp", 1.0, False), ("hit", 0.55, False)], "circle": [("circle", 0.9, False)],
    "row": [("type", 0.55, False)], "deny": [("stamp", 1.0, False), ("sub_drop", 0.8, False)],
    "title": [("riser_long", 0.7, True), ("braam", 1.0, False), ("hit", 0.8, False)],
    "quote": [("reverse", 0.5, True), ("whoosh", 0.5, False)], "head": [("paper", 0.9, False), ("shutter", 0.5, False)],
    "time": [("tick", 0.9, False), ("hit", 0.5, False)],
    "scene_image": [("whoosh", 0.8, False), ("sub_drop", 0.4, False)], "scene_receipt": [("paper", 0.9, False), ("whoosh", 0.5, False)],
    "scene_drain": [("heartbeat", 0.9, False), ("count", 0.6, False), ("whoosh", 0.6, False)], "scene_title": [("vault", 0.8, False)],
    "scene_card": [("paper", 0.9, False), ("whoosh", 0.45, False)], "scene_list": [("paper", 0.8, False)], "scene_headline": [("shutter", 0.8, False), ("paper", 0.6, False)],
    "scene_quote": [("tape_stop", 0.5, False)], "scene_tiles": [("whoosh", 0.6, False), ("blip", 0.5, False)], "scene_stats": [("glitch", 0.45, False), ("whoosh", 0.6, False)],
    "scene_clock": [("tick", 0.8, False), ("static", 0.3, False)],
}
BED = {"image": 0.22, "drain": 0.3, "title": 0.3, "quote": 0.18, "clock": 0.2}  # a low tension drone under these shots
MIN_CUES_PER_MIN = 45


def sound_library():
    import wave
    sys.path.insert(0, str(R / "pipeline"))
    import sfx_doc
    inv = sfx_doc.inventory()
    need = {c for layers in SOUND.values() for c, *_ in layers} | {"drone"}
    miss = [c for c in sorted(need) if not inv.get(c)]
    if miss:
        sys.exit(f"✗ sound library has nothing for {miss} — run: py pipeline/sfx_doc.py")
    dur = {}
    for fs in inv.values():
        for f in fs:
            try:
                with wave.open(str(R / "public" / f)) as w:
                    dur[f] = w.getnframes() / w.getframerate()
            except Exception:
                dur[f] = 1.0
    return inv, dur


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower().replace("'", "").replace("’", ""))


def load(eid):
    p = Path(f"pipeline/doc/{eid}.json")
    if not p.exists():
        sys.exit(f"✗ no spec {p}")
    return json.loads(p.read_text(encoding="utf8"))


def lines_of(sp):
    n = 0
    for si, sc in enumerate(sp["scenes"]):
        for li, ln in enumerate(sc.get("lines", [])):
            n += 1
            yield si, li, f"b{n:03d}", sc, ln


def images(sp):
    out = []
    for i, sc in enumerate(sp["scenes"]):
        for key in ("img", "side"):
            f = sc.get(key)
            if f and f != "globe" and not any(o[0] == f for o in out):
                p = Path(f"public/{sp['id']}/{f}")
                out.append((f, sc.get("prompt", ""), i + 1, p.exists() and not Path(str(p) + ".placeholder").exists()))
    return out

# HOOK SYSTEM (owner 16 Nov: "the hook is not energetic enough… feels like the middle of the video… every video a specific hook").
# Five proven openings, read word-for-word from winning videos. A video uses ONE; never the type of the last 2 videos.
HOOKS = {
    "trailer": "the whole story in 3 punches, then 'the wildest part' (Crayon Capital, 4.2M: \"He lied about $1 stock, made millions, and only served 22 months. Then Hollywood…\"). Scene 1 = flash.",
    "you": "put the viewer inside it (how really?, 1.2M: \"Imagine you just robbed a bank… you can't spend it\"). Line 1 starts with Imagine / Picture / You / Your. Scene 1 = image.",
    "moment": "cold open at the exact minute (Gloam, 2.5M). Scene 1 = image or receipt with a hud (time · place); a drain in scenes 2-4.",
    "promise": "claims that sound backwards + 'by the end of this video you will understand why…' (Little Bit Better, 4.3M). Scene 1 = image, card or stats.",
    "stat": "one shocking number + a comparison that makes it absurd + 'here is the darkest part' (how really?, 624k). Scene 1 = card, stats or image with the number; a bar comparison in the first 5 scenes.",
}
ESCALATORS = ["wildest part", "strangest part", "worst part", "darkest part", "craziest part", "scariest part", "but here is", "and here is", "here is the part", "it gets worse", "it gets stranger"]


def title_index(scenes):
    return next((i for i, sc in enumerate(scenes) if sc.get("kind") == "title"), None)


def recent_hooks(eid):
    out = []
    for q in sorted(Path("pipeline/doc").glob("*.json"), key=lambda q: q.stat().st_mtime, reverse=True):
        try:
            d = json.loads(q.read_text(encoding="utf8"))
        except Exception:
            continue
        if isinstance(d, dict) and d.get("id") != eid and not d.get("test") and d.get("hook", {}).get("type"):
            out.append(d["hook"]["type"])
    return out[:2]


def hook_gates(sp, scenes, E, full):
    if not scenes:
        return
    ht = sp.get("hook", {}).get("type")
    if ht not in HOOKS:
        E.append(f'hook.type: add "hook": {{"type": "..."}} — one of {list(HOOKS)}')
        return
    if full and ht in recent_hooks(sp.get("id")):
        E.append(f"hook.type '{ht}' was used in one of the last 2 videos ({recent_hooks(sp.get('id'))}) — every video opens differently: use one of {[h for h in HOOKS if h not in recent_hooks(sp.get('id'))]}")
    ti = title_index(scenes)
    if ti is None or ti > 11 or ti == 0 or scenes[ti - 1].get("kind") != "list":
        E.append("hook: within the first 12 scenes there must be a 'list' (the 3 questions this video answers) followed directly by the 'title' card")
        return
    pre = scenes[:ti]
    kinds = [sc.get("kind") for sc in pre]
    evs = [e.get("v") for sc in pre for ln in sc.get("lines", []) for e in ln.get("show", [])]
    says = [ln.get("say", "") for sc in pre for ln in sc.get("lines", [])]
    l0, k0 = says[0] if says else "", kinds[0]
    words = sum(len(x.split()) for x in says)
    # energy rules for every type
    if len(l0.split()) > 14:
        E.append(f"hook: first sentence has {len(l0.split())} words — max 14. It must hit like a headline, not start a story")
    if not re.search(r"\b(million|billion|trillion|thousand|you|your)\b", l0, re.I):
        E.append("hook: the first sentence must contain the amount (million/billion…) or speak to 'you'")
    if len([e for ln in scenes[0].get("lines", []) for e in ln.get("show", [])]) < 3:
        E.append("hook: scene 1 needs ≥ 3 things appearing — frame 0 must already move")
    fl = [sc for sc in pre[:5] if sc.get("kind") == "flash"]
    if not fl or sum(1 for ln in fl[0].get("lines", []) for e in ln.get("show", []) if e.get("v") == "word") < 3:
        E.append("hook: one of the first 5 scenes must be a 'flash' with ≥ 3 'word' punches (the 3 most shocking facts of the whole video, 1-3 words each, each on its spoken word) — the trailer inside the hook")
    if not any(x in " ".join(says).lower() for x in ESCALATORS):
        E.append(f"hook: no escalator line before the title — one line must raise it again with one of {ESCALATORS[:6]} …")
    if "deny" not in evs and not ({"headline", "quote"} & set(kinds)):
        E.append("hook: before the title there must be a mystery ('deny' cards: what it was NOT) or real proof (a 'headline' or 'quote')")
    if "tiles" in kinds:
        E.append("hook: no 'tiles' before the title card — explaining starts after it")
    if not 55 <= words <= 135:
        E.append(f"hook: {words} spoken words before the title card — keep it 55-135 (about 20-45 s): long enough to promise, short enough to feel fast")
    if any(len(x.split()) > 22 for x in says):
        E.append("hook: a line before the title has more than 22 words — hook lines are short and punchy")
    h = [e for sc in scenes[:3] for ln in sc.get("lines", []) for e in ln.get("show", [])]
    if not any(re.search(r"\d", str(e.get("t", "")) + str(e.get("val", "")) + str(e.get("n", ""))) for e in h):
        E.append("hook: no number on screen in the first 3 scenes — show the stake at once")
    # the chosen type's own opening
    if ht == "trailer" and k0 != "flash":
        E.append("hook 'trailer': scene 1 must be the 'flash' (the whole story in 3 punches)")
    if ht == "you" and (k0 != "image" or not re.match(r"\s*(imagine|picture|you|your)\b", l0, re.I)):
        E.append("hook 'you': scene 1 = image and line 1 starts with Imagine / Picture / You / Your")
    if ht == "moment" and (k0 not in ("image", "receipt") or not scenes[0].get("hud") or "drain" not in kinds[:4]):
        E.append("hook 'moment': scene 1 = image or receipt with a hud (exact time · place) and a 'drain' in scenes 2-4")
    if ht == "promise" and (k0 not in ("image", "card", "stats") or "by the end of this video" not in " ".join(says).lower()):
        E.append("hook 'promise': scene 1 = image, card or stats, and one line says 'by the end of this video you will understand why…' with 2-3 claims that sound backwards")
    if ht == "stat" and (k0 not in ("card", "stats", "image") or not any(e.get("v") == "bar" for sc in pre[:5] for ln in sc.get("lines", []) for e in ln.get("show", []))):
        E.append("hook 'stat': scene 1 = card, stats or image showing the number, and a 'bar' comparison in the first 5 scenes")


BAN_TITLE = ["you need to watch", "watch this", "you won't believe", "shocking", "must see", "the truth about", "exposed", "mind blowing", "insane", "trump", "biden", "president"]


def package_gates(sp, E):
    """TOPIC + TITLE + THUMBNAIL gates (LONG.md [DOC] §2, §6). The proof must come from tools/doctopic.py, so nobody can invent it."""
    eid, title = sp.get("id", "?"), sp.get("title", "")
    # --- title
    for t in [title] + list(sp.get("alt_titles", [])):
        if len(t) > 60:
            E.append(f"title '{t[:30]}…': {len(t)} characters — max 60")
        if not re.search(r"\d", t):
            E.append(f"title '{t[:40]}': needs a number (the amount, or 'in 9 Minutes') — numbers get the click")
        if any(b in t.lower() for b in BAN_TITLE):
            E.append(f"title '{t[:40]}': uses a banned bait/politics phrase {[b for b in BAN_TITLE if b in t.lower()]}")
        if sum(1 for w in t.split() if len(w) > 3 and w.isupper()) > 1:
            E.append(f"title '{t[:40]}': more than one ALL-CAPS word")
    if len(sp.get("alt_titles", [])) < 2:
        E.append('alt_titles: give 2 more titles (different angle each) — the owner tests 3 in YouTube "Test & compare"')
    if not re.match(r"(how|why|what|every|the)\b", title, re.I):
        E.append("title: start with How / Why / What / Every / The (the forms that won: 'How X Lost $N in One Night', 'How X Actually Works in N Minutes', 'Why $N Vanishes Every Year')")
    # --- topic proof
    tp = sp.get("topic", {})
    try:
        outl = {o["url"]: o for o in json.loads(Path("pipeline/doc/outliers.json").read_text(encoding="utf8"))}
        dem = json.loads(Path("pipeline/doc/demand.json").read_text(encoding="utf8"))
    except Exception:
        outl, dem = {}, {}
        E.append("topic: no proof files — run: py tools/doctopic.py scan   and   py tools/doctopic.py demand \"<how a viewer would search this topic>\"")
    good = [u for u in tp.get("proof", []) if u in outl]
    if outl and len(good) < 1:
        E.append("topic.proof: list ≥ 1 url of a video from pipeline/doc/outliers.json that is the SAME kind of topic (a video that beat its own channel ≥ 4x). No such video = pick another topic")
    d = dem.get(str(tp.get("query", "")).lower().strip())
    if dem and not d:
        E.append("topic.query: run py tools/doctopic.py demand \"<query>\" first and put the same query here")
    elif d and not d.get("pass"):
        E.append(f"topic.query '{tp.get('query')}': demand FAILED ({d['over100k']} videos over 100k, {d['over1m']} over 1M) — people are not looking for this, pick another topic")
    if tp.get("evergreen") is not True:
        E.append('topic.evergreen: must be true — the video must still make sense in 3 years (owner 15 Nov: "a viral topic that is not consumable"). News can be the opening case, never the whole topic')
    # --- thumbnail
    th = sp.get("thumb", {})
    words = str(th.get("words", "")).split()
    if not 1 <= len(words) <= 4 or len(th.get("words", "")) > 22:
        E.append("thumb.words: 1-4 words, max 22 characters (they are added in code by 'doc.py thumb', never by the image model)")
    if words and set(w.lower().strip("$?!.,") for w in words) <= set(w.lower().strip("$?!.,:") for w in title.split()):
        E.append("thumb.words: do not repeat the title — the thumbnail adds a second hook (the amount, the verdict, the question)")
    pr = th.get("prompt", "")
    if len(pr) < 150 or "no text" not in pr.lower() or "16:9" not in pr:
        E.append('thumb.prompt: ≥ 150 characters for the image model, must say "no text" and "16:9": ONE big object, dark background, one light, empty space on one side for the words, no real person')
    if th.get("space") not in ("left", "right"):
        E.append('thumb.space: "left" or "right" = the empty side of the picture where the words go')
    if not th.get("copied_from"):
        E.append("thumb.copied_from: name the winning thumbnail whose LAYOUT this copies (title + channel) — never invent a layout")


def thumb(sp):
    """3 thumbnail versions = the owner's picture (public/<id>/thumb.jpg, made from thumb.prompt) + the words set in code."""
    from PIL import Image, ImageDraw, ImageFont, ImageEnhance
    eid, th = sp["id"], sp["thumb"]
    src = Path(f"public/{eid}/thumb.jpg")
    if not src.exists():
        sys.exit(f"✗ make the picture first with this prompt, save it as {src}:\n\n{th['prompt']}\n")
    im = Image.open(src).convert("RGB")
    k = max(1280 / im.width, 720 / im.height)
    im = im.resize((round(im.width * k), round(im.height * k)))
    im = im.crop(((im.width - 1280) // 2, (im.height - 720) // 2, (im.width - 1280) // 2 + 1280, (im.height - 720) // 2 + 720))
    im = ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.15)).enhance(1.12)
    fp = next((f for f in ("C:/Windows/Fonts/impact.ttf", "C:/Windows/Fonts/arialbd.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf") if Path(f).exists()), None)
    words = th["words"].upper().split()
    lines = [" ".join(words[:len(words) // 2 + len(words) % 2]), " ".join(words[len(words) // 2 + len(words) % 2:])] if len(words) > 1 else [words[0]]
    lines = [l for l in lines if l]
    out = Path(f"videos/{eid}")
    out.mkdir(parents=True, exist_ok=True)
    made = []
    for name, c1, c2 in (("A", (255, 255, 255), (255, 214, 10)), ("B", (255, 214, 10), (255, 255, 255)), ("C", (255, 255, 255), (255, 59, 48))):
        t = im.copy()
        # darken the empty side so the words read at phone size
        g = Image.new("L", (1280, 1), 0)
        for x in range(1280):
            u = x / 1279 if th["space"] == "right" else 1 - x / 1279
            g.putpixel((x, 0), int(190 * max(0, (u - 0.35) / 0.65) ** 1.2))
        t.paste(Image.new("RGB", (1280, 720), (0, 0, 0)), (0, 0), g.resize((1280, 720)))
        d = ImageDraw.Draw(t)
        size = 250
        while size > 60:
            f = ImageFont.truetype(fp, size) if fp else ImageFont.load_default()
            if max(d.textlength(l, font=f) for l in lines) <= 600 and size * 1.05 * len(lines) <= 560:
                break
            size -= 6
        y = (720 - size * 1.05 * len(lines)) / 2
        for i, l in enumerate(lines):
            w = d.textlength(l, font=f)
            x = 1280 - 50 - w if th["space"] == "right" else 50
            d.text((x, y + i * size * 1.05), l, font=f, fill=c2 if i == len(lines) - 1 and len(lines) > 1 else c1, stroke_width=max(6, size // 16), stroke_fill=(0, 0, 0))
        fn = out / f"thumb_{name}.jpg"
        t.save(fn, quality=92)
        made.append(t)
    # phone test: the 3 versions at the size they have in the feed, next to each other
    sheet = Image.new("RGB", (3 * 330 + 20, 200), (15, 15, 15))
    for i, t in enumerate(made):
        sheet.paste(t.resize((320, 180)), (10 + i * 330, 10))
    sheet.save(out / "thumb_phone.jpg", quality=90)
    print(f"3 versions in {out}/thumb_A|B|C.jpg + thumb_phone.jpg (phone size: if the words are not readable there, shorten thumb.words). Upload all 3 to YouTube Test & compare.")


def check(sp, quiet=False, need_images=False):
    E, W = [], []
    eid, title = sp.get("id", "?"), sp.get("title", "")
    full = not sp.get("test")  # "test": true = short look test, skips the full-video gates
    if not title or len(title) > 60:
        E.append(f"title: needs 1-60 characters (now {len(title)})")
    if full:
        package_gates(sp, E)
    srcs = {s["id"] for s in sp.get("sources", [])}
    scenes = sp.get("scenes", [])
    if full and len(scenes) < 30:
        E.append(f"scenes: {len(scenes)} — a full video needs ≥ 30 scenes (one scene = one shot, 5-20 s)")
    words, kinds = 0, []
    for si, sc in enumerate(scenes):
        tag = f"scene {si + 1}"
        kind = sc.get("kind")
        if kind not in KINDS:
            E.append(f"{tag}: kind '{kind}' unknown — use one of {list(KINDS)}")
            continue
        kinds.append(kind)
        if len(kinds) >= 3 and kinds[-1] == kinds[-2] == kinds[-3]:
            E.append(f"{tag}: 3 '{kind}' scenes in a row — change the shot type")
        if kind == "drain" and not (isinstance(sc.get("amount"), (int, float)) and sc.get("head")):
            E.append(f"{tag}: drain needs amount (the number that runs down to 0) and head (label under the stopwatch)")
        if kind == "image":
            if not sc.get("img"):
                E.append(f"{tag}: image scene needs \"img\" (file in public/{eid}/) and \"prompt\" (how to make it)")
            if not sc.get("prompt") and not any(o.get("img") == sc.get("img") and o.get("prompt") for o in scenes):
                E.append(f"{tag}: image scene needs \"prompt\" — the exact text the owner pastes into Gemini to make this still")
            if sc.get("move", "push") not in MOVES:
                E.append(f"{tag}: move '{sc.get('move')}' unknown — {MOVES}")
        if kind in ("card", "list", "stats", "tiles") and not sc.get("head"):
            E.append(f"{tag}: {kind} needs \"head\" (small label on top, e.g. \"CITIBANK · AUGUST 11 2020\")")
        if kind == "receipt" and not sc.get("head"):
            E.append(f"{tag}: receipt needs \"head\" (title of the document)")
        if kind == "headline" and not (sc.get("pub") and sc.get("date")):
            E.append(f"{tag}: headline needs \"pub\" (real publication) and \"date\"")
        if kind == "quote" and not sc.get("by"):
            E.append(f"{tag}: quote needs \"by\" (who said it · when)")
        if sc.get("mood") and sc["mood"] not in MOODS:
            E.append(f"{tag}: mood '{sc['mood']}' unknown — {list(MOODS)}")
        lns = sc.get("lines", [])
        if not 1 <= len(lns) <= 5:
            E.append(f"{tag}: {len(lns)} lines — a shot has 1-5 lines, then cut")
        sw, cnt, nrows = 0, {}, 0
        for li, ln in enumerate(lns):
            lt = f"{tag} line {li + 1}"
            say = ln.get("say", "")
            ws = say.split()
            words += len(ws)
            sw += len(ws)
            if not ws or len(ws) > 30:
                E.append(f"{lt}: {len(ws)} words — 1 to 30 per line")
            if re.search(r"\d", say):
                E.append(f"{lt}: digits in 'say' — write numbers as words (the voice reads them wrong)")
            if "," in say or ";" in say:
                E.append(f"{lt}: comma in 'say' — write one flowing sentence (voice rule)")
            if ln.get("src") and ln["src"] not in srcs:
                E.append(f"{lt}: src {ln['src']} not in sources")
            if full and re.search(r"\b(million|billion|percent|thousand|hundred)\b", say, re.I) and not ln.get("src"):
                E.append(f"{lt}: a number without \"src\" — every figure needs its source id")
            nw = [norm(w) for w in ws]
            show = [e for e in ln.get("show", []) if e.get("v") != "sfx"]
            if kind not in ("image", "drain") and not show:
                E.append(f"{lt}: nothing new on screen — every line adds at least one thing")
            if len(ws) > 18 and len(show) < 2 and kind not in ("image", "drain"):
                E.append(f"{lt}: {len(ws)} words but 1 visual — lines over 18 words need ≥ 2")
            for ei, e in enumerate(ln.get("show", [])):
                v, et = e.get("v"), f"{lt} event {ei + 1}"
                if v == "sfx":
                    continue
                if v not in KINDS[kind]:
                    E.append(f"{et}: '{v}' does not exist in a {kind} scene — allowed: {list(KINDS[kind])}")
                    continue
                if "on" in e and norm(e["on"]) not in nw:
                    E.append(f"{et}: on '{e['on']}' is not a word of this line")
                cnt[v] = cnt.get(v, 0) + 1
                mx = KINDS[kind][v]
                if mx and not 1 <= len(e.get("t", "")) <= mx:
                    E.append(f"{et}: {v} text must be 1-{mx} characters (now {len(e.get('t', ''))})")
                if v == "stat" and (("n" not in e and not e.get("t")) or not e.get("label")):
                    E.append(f"{et}: stat needs n (number, counts up) or t (text), plus label")
                if v == "bar" and not (e.get("label") and e.get("val") and 0 < e.get("w", 0) <= 1):
                    E.append(f"{et}: bar needs label, val (text) and w (0-1 width)")
                if v == "row" and kind == "receipt":
                    nrows += 1
                    if not (e.get("k") and e.get("val")):
                        E.append(f"{et}: receipt row needs k and val")
                if v == "circle" and not 1 <= e.get("row", 0) <= nrows:
                    E.append(f"{et}: circle row {e.get('row')} — must be an earlier row number (1-{nrows})")
                if v == "deny" and e.get("sub") not in PICTO:
                    E.append(f"{et}: deny needs sub = the pictogram that gets crossed out — one of {PICTO}")
                if v == "label" and e.get("pos", "tl") not in POSN:
                    E.append(f"{et}: pos '{e.get('pos')}' unknown — {POSN}")
        name, mx = MAXN[kind]
        got = sum(cnt.get(k, 0) for k in name.split("+"))
        if got > mx:
            E.append(f"{tag}: {got} {name} but a {kind} scene holds {mx} — cut to a new scene")
        if sw > 60:
            E.append(f"{tag}: {sw} words on one shot (max 60 ≈ 20 s) — cut to a new scene")
    if full and not 900 <= words <= 2600:
        E.append(f"length: {words} words — a video is 900-2600 words (6-15 min)")
    if full and len(set(kinds)) < 6:
        E.append(f"variety: only {len(set(kinds))} shot types — use at least 6 of {list(KINDS)}")
    if full and kinds:
        share = kinds.count("image") / len(kinds)
        if not 0.25 <= share <= 0.55:
            E.append(f"cinematic: {share:.0%} of scenes are image stills — keep it between 25 % and 55 %")
    hook_gates(sp, scenes, E, full)
    miss = [i for i in images(sp) if not i[3]]
    if miss and need_images:
        E.append(f"images: {len(miss)} stills missing — py tools/doc.py images {eid}")
    elif miss:
        W.append(f"{len(miss)} stills missing (py tools/doc.py images {eid}) — placeholders until they exist")
    if not quiet:
        for w in W:
            print("  !", w)
        for e in E:
            print("  ✗", e)
        print(f"{eid}: {len(scenes)} scenes, {words} words ≈ {words / 160:.1f} min —", "SPEC OK" if not E else f"{len(E)} to fix")
    return E


def voice(sp):
    beats, ti = [], title_index(sp["scenes"])
    for si, li, bid, sc, ln in lines_of(sp):
        last = li == len(sc["lines"]) - 1
        hook = ti is not None and si <= ti
        b = {"id": bid, "src": ln.get("src", ""), "text": ln["say"], "pause": ln.get("pause", (0.3 if last else 0.12) if hook else (0.5 if last else 0.25))}
        if ln.get("exag") or hook:
            b["exag"] = ln.get("exag", 0.72)
        beats.append(b)
    ep = {"id": sp["id"], "title": sp["title"], "style": "doc", "voice": "chatterbox", "cb": sp.get("cb", {"cfg": 0.3, "exag": 0.45}), "beats": beats}
    Path(f"pipeline/episodes/{sp['id']}.json").write_text(json.dumps(ep, indent=1, ensure_ascii=False), encoding="utf8")
    print(f"wrote pipeline/episodes/{sp['id']}.json ({len(beats)} lines) — push it, voice.yml voices it, then: git pull && py tools/doc.py build {sp['id']}")


def timing(sp, fake):
    eid, T = sp["id"], float(sp.get("tempo", 1.0))
    if fake:
        t, beats = 0.1, []
        for si, li, bid, sc, ln in lines_of(sp):
            ws = []
            for w in ln["say"].split():
                ws.append({"text": w, "start": t, "end": t + 0.32})
                t += 0.37
            beats.append({"id": bid, "start": ws[0]["start"], "end": ws[-1]["end"], "words": ws})
            t += 0.3 if li < len(sc["lines"]) - 1 else 0.55
        return {"total": t + 0.5, "beats": beats}, 1.0, None
    vj, tj = Path(f"pipeline/voice/{eid}.json"), Path(f"src/v6/{eid}_timing.json")
    if not vj.exists():
        sys.exit(f"✗ no voice yet ({vj}). py tools/doc.py voice {eid} → push → wait for voice.yml → git pull")
    # the audio file and the timing MUST come from the same tempo (15 Nov bug: tempo changed, old audio kept -> pictures 7 s late)
    stale = not tj.exists() or tj.stat().st_mtime < vj.stat().st_mtime or not Path(f"public/{eid}/voice.flac").exists() \
        or abs(json.loads(tj.read_text(encoding="utf8")).get("tempo", -1) - T) > 1e-6
    if stale:
        Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
        subprocess.run([sys.executable, "tools/voice_gaps.py", eid, "0", "--tempo", str(T)], check=True, env={**os.environ, "PYTHONIOENCODING": "utf-8"})
        d = json.loads(tj.read_text(encoding="utf8"))
        d["tempo"] = T
        tj.write_text(json.dumps(d), encoding="utf8")
    return json.loads(tj.read_text(encoding="utf8")), T, f"{eid}/voice.flac"


def placeholder(eid, f, prompt):
    """Dark gradient stand-in so previews render before the owner has made the still."""
    from PIL import Image, ImageDraw
    p = Path(f"public/{eid}/{f}")
    p.parent.mkdir(parents=True, exist_ok=True)
    im = Image.new("RGB", (1920, 1080))
    d = ImageDraw.Draw(im)
    for y in range(1080):
        d.line([(0, y), (1920, y)], fill=(18 + y // 30, 20 + y // 40, 30 + y // 60))
    d.text((120, 500), f"PLACEHOLDER  {f}\n{prompt[:150]}", fill=(150, 150, 160))
    im.save(p, quality=85)
    Path(str(p) + ".placeholder").write_text("replace with the real still", encoding="utf8")


def build(sp, fake):
    if check(sp, quiet=True, need_images=not fake and not sp.get("test")):
        check(sp, need_images=not fake and not sp.get("test"))
        sys.exit(1)
    eid = sp["id"]
    for f, prompt, _n, ok in images(sp):
        if not ok and not Path(f"public/{eid}/{f}").exists():
            placeholder(eid, f, prompt)
    V, T, vfile = timing(sp, fake)
    fr = lambda s: round(s * FPS / T)
    vb = {b["id"]: b for b in V["beats"]}
    total = fr(V["total"]) + 20
    scenes, sfx, music, errs, counters = [], [], [], [], {}

    inv, sdur = sound_library()

    def snd(kind, at, k=1.0):
        for cat, vol, lead in SOUND[kind]:
            opts = inv[cat]
            i = counters.get(cat, 0)
            counters[cat] = i + 1
            f = opts[(i * 5 + len(kind)) % len(opts)]  # walk the whole category, never the same sound twice in a row
            n = round(sdur[f] * FPS)
            sfx.append({"at": max(0, at - n if lead else at), "src": f, "v": round(SFX_V * k * vol, 3), "d": n + 4})

    ti = title_index(sp["scenes"])
    snd("scene_open", 0)  # the video starts ON a hit, never on silence
    by_scene = {}
    for si, li, bid, sc, ln in lines_of(sp):
        by_scene.setdefault(si, []).append((bid, ln))
    for si, sc in enumerate(sp["scenes"]):
        rows = by_scene.get(si, [])
        if any(bid not in vb for bid, _ in rows):
            sys.exit(f"✗ voice is older than the spec (line {rows[0][0]} missing) — py tools/doc.py voice {eid} and re-voice")
        start = 0 if si == 0 else max(0, fr(vb[rows[0][0]]["words"][0]["start"]) - 6)
        ev, vis = [], []
        for bid, ln in rows:
            ws = vb[bid]["words"]
            nw = [norm(w["text"]) for w in ws]
            a0 = max(start, fr(ws[0]["start"]) - LEAD)
            for e in ln.get("show", []):
                at = a0
                if "on" in e:
                    idx = [i for i, x in enumerate(nw) if x == norm(e["on"])]
                    if not idx:
                        errs.append(f"{bid}: word '{e['on']}' not heard in the voice ({' '.join(nw)})")
                        continue
                    at = max(start, fr(ws[idx[min(e.get("n_th", 0), len(idx) - 1)]]["start"]) - LEAD)
                if e["v"] == "sfx":
                    sfx.append({"at": at, "src": "sfx/" + e["sound"] + ".wav", "v": SFX_V})
                    continue
                o = {k: v for k, v in e.items() if k not in ("on", "n_th")}
                o["at"] = at
                if o["v"] == "circle":
                    o["row"] -= 1
                ev.append(o)
                vis.append(at)
                snd("tile" if e["v"] == "row" and sc["kind"] == "list" else e["v"], at)
        ev.sort(key=lambda e: e["at"])
        keep = {k: sc[k] for k in ("img", "move", "hud", "tag", "head", "source", "by", "pub", "date", "n", "side", "bg") if k in sc}
        if sc["kind"] == "drain":
            keep["n"], keep["source"] = sc["amount"], sc.get("prefix", "$")
        scenes.append({"from": start, "to": 0, "kind": sc["kind"], **keep, "ev": ev, "_mood": sc.get("mood") or ("drive" if ti is not None and si <= ti and si == 0 else "tense" if ti is not None and si == ti + 1 else None), "_vis": vis})
        if si:
            snd("scene_" + sc["kind"], start, 0.85)
    if errs:
        sys.exit("✗ " + "\n✗ ".join(errs))
    mood = "tense"
    for i, s in enumerate(scenes):
        s["to"] = scenes[i + 1]["from"] if i + 1 < len(scenes) else total
        mood = s.pop("_mood") or mood
        m = MOODS[mood]
        if m and music and music[-1]["src"] == "music/" + m and music[-1]["to"] == s["from"]:
            music[-1]["to"] = s["to"]
        elif m:
            music.append({"src": "music/" + m, "from": s["from"], "to": s["to"], "v": MUSIC_V})
    for s in scenes:  # tension bed under the cinematic shots
        if s["kind"] in BED:
            f = inv["drone"][counters.get("drone", 0) % len(inv["drone"])]
            counters["drone"] = counters.get("drone", 0) + 1
            sfx.append({"at": s["from"], "src": f, "v": round(SFX_V * BED[s["kind"]], 3), "d": min(s["to"] - s["from"], round(sdur[f] * FPS))})
    # quality gate: something new at least every 4 s
    slow = []
    for i, s in enumerate(scenes):
        pts = sorted(set([s["from"]] + s.pop("_vis") + [s["to"]]))
        for a, b in zip(pts, pts[1:]):
            if (b - a) / FPS > 4.0 and b != total:
                slow.append(f"scene {i + 1} ({s['kind']}): {(b - a) / FPS:.1f} s with nothing new (from {a / FPS:.1f} s) — add an event there or cut to a new scene")
    plan = {"id": eid, "title": sp["title"], "hookEnd": scenes[ti]["to"] if ti is not None else 0, "frames": total, "voice": vfile, "scenes": scenes, "sfx": sorted(sfx, key=lambda c: c["at"]), "music": music}
    Path("src/v6/doc").mkdir(exist_ok=True)
    Path(f"src/v6/doc/{eid}.plan.json").write_text(json.dumps(plan, ensure_ascii=False), encoding="utf8")
    ids = sorted(p.name[:-10] for p in Path("src/v6/doc").glob("*.plan.json"))
    Path("src/v6/docEps.ts").write_text("// generated by tools/doc.py — cinematic documentary long-form (composition Doc-<id>)\n" +
                                        "".join(f"import d_{i} from './doc/{i}.plan.json';\n" for i in ids) +
                                        f"export const DOC_PLANS = [{', '.join('d_' + i for i in ids)}];\n", encoding="utf8")
    nvis = sum(len(s["ev"]) for s in scenes) + len(scenes)
    print(f"{eid}: {total} frames = {total / FPS / 60:.1f} min | {len(scenes)} shots = one cut every {total / FPS / len(scenes):.1f} s | something new every {total / FPS / nvis:.1f} s | "
          f"{len(sfx)} sfx | voice {'FAKE' if fake else vfile}")
    # PACE + HOOK TIMING, measured on the real voice (reference numbers: Gloam = 12 cuts in the first 30 s, title card at 0:43)
    sec = lambda fr_: fr_ / FPS
    first30 = sum(1 for s in scenes if sec(s["from"]) < 30)
    kinds_at = {}
    for s in scenes:
        kinds_at.setdefault(s["kind"], sec(s["from"]))
    if sec(scenes[0]["to"]) > 8:
        slow.append(f"hook: first shot lasts {sec(scenes[0]['to']):.1f} s — cut by 8 s")
    if first30 < 8 and total / FPS > 30:
        slow.append(f"hook: only {first30} shots in the first 30 s — need ≥ 8 (shorter lines, more cuts)")
    ev10 = sum(1 for s in scenes for e in s["ev"] if e["at"] < 10 * FPS)
    if ev10 < 7:
        slow.append(f"hook: only {ev10} things appear in the first 10 s — need ≥ 7")
    for kind, lim in (("flash", 15), ("list", 45), ("title", 50)):
        if kinds_at.get(kind, 0) > lim:
            slow.append(f"hook: '{kind}' starts at {kinds_at[kind]:.0f} s — must start by {lim} s")
    avg = total / FPS / len(scenes)
    if avg > 7:
        slow.append(f"pace: average shot {avg:.1f} s — must be ≤ 7 s (cut long scenes in two)")
    if total / FPS / nvis > 2.5:
        slow.append(f"pace: something new only every {total / FPS / nvis:.1f} s on average — must be ≤ 2.5 s")
    # re-hook: a turn ("But…", "Then…", a question) at least every 45 s keeps the next reason to stay open
    turns, tprev = [], 0.0
    for si, li, bid, sc, ln in lines_of(sp):
        if re.match(r"\s*(but|then|except|until|and then|so|now|here is)\b", ln["say"], re.I) or "?" in ln["say"]:
            t = vb[bid]["words"][0]["start"] / T
            if t - tprev > 45:
                turns.append(f"story: {t - tprev:.0f} s without a turn before {t:.0f} s — add a 'But…' / 'Then…' / question line (a new reason to keep watching)")
            tprev = t
    if total / FPS / T - tprev > 60 and not sp.get("test"):
        turns.append("story: the last minute has no turn")
    slow += turns
    m = re.search(r"(\d+) Minutes", sp["title"])
    if m and not fake and not int(m.group(1)) - 1.0 <= total / FPS / 60 <= int(m.group(1)) + 0.34:
        sys.exit(f"✗ title says {m.group(1)} minutes but the video is {total / FPS / 60:.1f} min — the title must be true")
    cpm = len(sfx) / (total / FPS / 60)
    if cpm < MIN_CUES_PER_MIN:
        slow.append(f"sound: {cpm:.0f} sound cues per minute — need ≥ {MIN_CUES_PER_MIN} (add visual events; every event brings its sounds)")
    print(f"sound: {len(sfx)} cues = {cpm:.0f} per minute from {len({c['src'] for c in sfx})} different sounds")
    for s_ in slow:
        print("  ✗", s_)
    if slow and not fake:
        sys.exit(f"✗ {len(slow)} pace/hook problems — fix the spec and build again")
    print("BUILD OK" + (" (fake voice: timing is a guess)" if fake else f" → py tools/doc.py render {eid}"))
    return plan


def stills(sp, frames):
    eid = sp["id"]
    plan = json.loads(Path(f"src/v6/doc/{eid}.plan.json").read_text(encoding="utf8"))
    if not frames:  # the last frame of every shot = the shot fully built
        frames = ",".join(str(s["to"] - 4) for s in plan["scenes"])
    out = Path(f"videos/{eid}/preview")
    out.mkdir(parents=True, exist_ok=True)
    subprocess.run(["node", "pipeline/docstills.mjs", str(out), f"Doc-{eid}", frames], check=True, shell=os.name == "nt")
    print(f"preview frames in {out}")


def render(sp, parts):
    Path("pipeline/split").mkdir(parents=True, exist_ok=True)
    import time  # the third word makes every request different: an unchanged file starts no GitHub run
    Path("pipeline/split/RUN").write_text(f"Doc-{sp['id']} {parts} {int(time.time())}\n", encoding="utf8")
    print(f"wrote pipeline/split/RUN = Doc-{sp['id']} {parts} — commit + push (tools/apipush.py if git push fails); v6split.yml renders it")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cmd, sp = sys.argv[1], load(sys.argv[2])
    if cmd == "check":
        sys.exit(1 if check(sp) else 0)
    elif cmd == "images":
        for f, prompt, n, ok in images(sp):
            print(("✓ have" if ok else "✗ MAKE") + f"  public/{sp['id']}/{f}  (scene {n})")
            print("      " + prompt)
            print()
    elif cmd == "voice":
        if check(sp):
            sys.exit(1)
        voice(sp)
    elif cmd == "build":
        build(sp, "--fake" in sys.argv)
    elif cmd == "thumb":
        thumb(sp)
    elif cmd == "stills":
        stills(sp, sys.argv[3] if len(sys.argv) > 3 else "")
    elif cmd == "render":
        render(sp, sys.argv[3] if len(sys.argv) > 3 else "16")
    else:
        sys.exit(__doc__)
