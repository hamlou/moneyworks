"""CINEMATIC DOCUMENTARY autopilot (LONG.md [DOC]): ONE spec file → a finished video. No 3D, no Blender, no hand-written code.
  py tools/doc.py check <id>            every ✗ must be fixed until "SPEC OK"
  py tools/doc.py images <id>           lists the stills still missing + the exact prompt for each (owner makes them in Gemini)
  py tools/doc.py voice <id>            writes pipeline/episodes/<id>.json (push it → voice.yml voices it on GitHub)
  py tools/doc.py build <id> [--fake]   voice timing → src/v6/doc/<id>.plan.json + src/v6/docEps.ts (composition Doc-<id>); --fake = no voice yet
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
FPS, LEAD = 30, 3
# kind → {event: max text length}; MAXN = how many of the main event one scene holds
KINDS = {"image": {"label": 28, "big": 18}, "card": {"stat": 0, "bar": 0, "stamp": 22}, "receipt": {"row": 0, "circle": 0}, "list": {"row": 34},
         "stats": {"stat": 0}, "tiles": {"tile": 24}, "quote": {"quote": 140}, "headline": {"head": 90}, "clock": {"time": 12, "sub": 44}}
MAXN = {"image": ("label", 4), "card": ("stat+bar", 3), "receipt": ("row", 8), "list": ("row", 5), "stats": ("stat", 3), "tiles": ("tile", 6), "quote": ("quote", 2), "headline": ("head", 2), "clock": ("time", 3)}
MOVES = "push pull left right".split()
POSN = "tl tr bl br l r".split()
MOODS = {"tense": "km/investigations.mp3", "dark": "km/darkest_child.mp3", "mystery": "km/unanswered_questions.mp3", "drive": "km/hitman.mp3",
         "react": "km/volatile_reaction.mp3", "sad": "km/hiding_your_reality.mp3", "think": "km/thinking_music.mp3", "none": None}
MUSIC_V, SFX_V = 0.06, 0.2
SFX = {"label": ["click.wav"], "big": ["thump_low.wav"], "stat": ["count_roll_short.wav"], "bar": ["slide.wav"], "stamp": ["stamp.wav"], "row": ["tick.wav"], "circle": ["draw.wav"],
       "tile": ["click.wav"], "quote": ["swish.wav"], "head": ["paper.wav"], "time": ["tick.wav"], "sub": ["click.wav"],
       "scene_image": ["whoosh_s.wav", "thump_low.wav"], "scene_card": ["pageflip.wav", "paper.wav"], "scene_other": ["swish.wav"]}


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


def check(sp, quiet=False, need_images=False):
    E, W = [], []
    eid, title = sp.get("id", "?"), sp.get("title", "")
    full = not sp.get("test")  # "test": true = short look test, skips the full-video gates
    if not title or len(title) > 60:
        E.append(f"title: needs 1-60 characters (now {len(title)})")
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
        if kind == "image":
            if not sc.get("img"):
                E.append(f"{tag}: image scene needs \"img\" (file in public/{eid}/) and \"prompt\" (how to make it)")
            if not sc.get("prompt"):
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
            if kind != "image" and not show:
                E.append(f"{lt}: nothing new on screen — every line adds at least one thing")
            if len(ws) > 18 and len(show) < 2 and kind != "image":
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
    # hook = the first 3 scenes
    if scenes:
        if scenes[0].get("kind") not in ("image", "receipt") or not scenes[0].get("hud"):
            E.append("hook: scene 1 must be an image or receipt with a \"hud\" (exact time + place) — open inside the moment")
        h = [e for sc in scenes[:3] for ln in sc.get("lines", []) for e in ln.get("show", [])]
        if not any(re.search(r"\d", str(e.get("t", "")) + str(e.get("val", "")) + str(e.get("n", ""))) for e in h):
            E.append("hook: no number on screen in the first 3 scenes — show the stake (the amount) at once")
        first = [ln.get("say", "") for sc in scenes[:2] for ln in sc.get("lines", [])]
        if first and len(first[0].split()) > 18:
            E.append("hook: first line over 18 words")
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
    beats = []
    for si, li, bid, sc, ln in lines_of(sp):
        last = li == len(sc["lines"]) - 1
        b = {"id": bid, "src": ln.get("src", ""), "text": ln["say"], "pause": ln.get("pause", 0.5 if last else 0.25)}
        if ln.get("exag"):
            b["exag"] = ln["exag"]
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
    if not tj.exists() or tj.stat().st_mtime < vj.stat().st_mtime or not Path(f"public/{eid}/voice.flac").exists():
        Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
        subprocess.run([sys.executable, "tools/voice_gaps.py", eid, "0", "--tempo", str(T)], check=True, env={**os.environ, "PYTHONIOENCODING": "utf-8"})
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

    def snd(kind, at, k=1.0):
        opts = SFX[kind]
        i = counters.get(kind, 0)
        counters[kind] = i + 1
        sfx.append({"at": max(0, at), "src": "sfx/" + opts[i % len(opts)], "v": round(SFX_V * k, 3)})

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
                snd(e["v"], at, 0.6 if e["v"] == "row" else 1.0)
        ev.sort(key=lambda e: e["at"])
        keep = {k: sc[k] for k in ("img", "move", "hud", "tag", "head", "source", "by", "pub", "date", "n", "side", "bg") if k in sc}
        scenes.append({"from": start, "to": 0, "kind": sc["kind"], **keep, "ev": ev, "_mood": sc.get("mood"), "_vis": vis})
        if si:
            snd("scene_image" if sc["kind"] in ("image", "receipt") else "scene_card" if sc["kind"] in ("card", "list", "headline") else "scene_other", start, 0.8)
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
    # quality gate: something new at least every 5 s (a moving still counts for its first 5 s only)
    slow = []
    for i, s in enumerate(scenes):
        pts = sorted(set([s["from"]] + s.pop("_vis") + [s["to"]]))
        for a, b in zip(pts, pts[1:]):
            if (b - a) / FPS > 5.0 and b != total:
                slow.append(f"scene {i + 1} ({s['kind']}): {(b - a) / FPS:.1f} s with nothing new (from {a / FPS:.1f} s) — add an event there or cut to a new scene")
    for s in slow:
        print("  ✗", s)
    plan = {"id": eid, "title": sp["title"], "frames": total, "voice": vfile, "scenes": scenes, "sfx": sorted(sfx, key=lambda c: c["at"]), "music": music}
    Path("src/v6/doc").mkdir(exist_ok=True)
    Path(f"src/v6/doc/{eid}.plan.json").write_text(json.dumps(plan, ensure_ascii=False), encoding="utf8")
    ids = sorted(p.name[:-10] for p in Path("src/v6/doc").glob("*.plan.json"))
    Path("src/v6/docEps.ts").write_text("// generated by tools/doc.py — cinematic documentary long-form (composition Doc-<id>)\n" +
                                        "".join(f"import d_{i} from './doc/{i}.plan.json';\n" for i in ids) +
                                        f"export const DOC_PLANS = [{', '.join('d_' + i for i in ids)}];\n", encoding="utf8")
    nvis = sum(len(s["ev"]) for s in scenes) + len(scenes)
    print(f"{eid}: {total} frames = {total / FPS / 60:.1f} min | {len(scenes)} shots = one cut every {total / FPS / len(scenes):.1f} s | something new every {total / FPS / nvis:.1f} s | "
          f"{len(sfx)} sfx | voice {'FAKE' if fake else vfile}")
    m = re.search(r"(\d+) Minutes", sp["title"])
    if m and not fake and not int(m.group(1)) - 1.0 <= total / FPS / 60 <= int(m.group(1)) + 0.34:
        sys.exit(f"✗ title says {m.group(1)} minutes but the video is {total / FPS / 60:.1f} min — the title must be true")
    if slow and not fake:
        sys.exit(f"✗ {len(slow)} slow spots — fix the spec and build again")
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
    Path("pipeline/split/RUN").write_text(f"Doc-{sp['id']} {parts} doc\n", encoding="utf8")
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
    elif cmd == "stills":
        stills(sp, sys.argv[3] if len(sys.argv) > 3 else "")
    elif cmd == "render":
        render(sp, sys.argv[3] if len(sys.argv) > 3 else "16")
    else:
        sys.exit(__doc__)
