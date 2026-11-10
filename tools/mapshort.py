"""Map Shorts (1080x1920, src/v6/MapShort.tsx): spec pipeline/maps/<id>.json → frame plan src/v6/maps/<id>.plan.json.
Usage:
  py tools/mapshort.py script <id>                 write pipeline/episodes/<id>.json (beat ids b01.. for voice.yml / tts)
  py tools/mapshort.py build <id> [--fake-voice]   voice timing (voice_gaps --maxgap 0.3) → plan + src/v6/mapEps.ts
  py tools/mapshort.py sync <id>                   table: every fx / camera move vs the on-screen second of its word
  --fake-voice  no real voice yet: spreads the words evenly (~3.2 words/s) into pipeline/voice/<id>.json + a silent .flac
                (refuses to overwrite a real voice json)
Spec beats: {say, map:{focus, highlight, style}, fx:[{type, from, to, on}], text, dave}  — fx "on" = word in `say` it lands on."""
import json, math, os, re, shutil, subprocess, sys
from pathlib import Path

R = Path(__file__).resolve().parent.parent
os.chdir(R)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
try:
    import imageio_ffmpeg
    FF = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FF = shutil.which("ffmpeg") or "ffmpeg"
FPS = 30
_spec = Path(f"pipeline/maps/{sys.argv[2]}.json") if len(sys.argv) > 2 else None
TEMPO = float(os.environ.get("MAP_TEMPO") or (json.loads(_spec.read_text(encoding="utf8")).get("tempo", 1.0) if _spec and _spec.exists() else 1.0))  # voice sped up by TEMPO → on-screen seconds = timing seconds / TEMPO
SPF = FPS / TEMPO
FX = {"oil", "grain", "food", "money", "ship", "chip", "factory", "medicine", "plane", "fire", "arrow", "crack", "fade_country"}
STYLES = {"gone", "loss", "win", "neutral"}
POSES = {"talk", "point", "shrug", "worried"}  # owner 9 Nov: think/shock/cheer/laugh put hands into the head/body → banned
BANNED_POSES = {"think": "talk"}  # owner 9 Nov: 'think' (hand over face) = "wrong hand position" → mapped to talk
FX_LEAD = 3  # fx pop peaks ~5 frames after `at` → start 3 frames before the word so it reads ON the word
CAM_LEAD = 0.45  # camera move (0.6 s) starts 0.45 s before the country name → lands as the name is said
# words that name a focus country in the voice (camera anchor); spec can override with map.on
NAMES = {"USA": ["usa", "america", "american", "us"], "MEX": ["mexico"], "CAN": ["canada"], "BRA": ["brazil"], "SAU": ["saudi"],
         "RUS": ["russia"], "CHN": ["china"], "DEU": ["europe", "germany", "euro"], "FRA": ["france"], "ITA": ["italy"], "ESP": ["spain"],
         "WORLD": ["world", "earth", "everywhere", "countries", "country"]}
# SFX per fx type (public/sfx/ea1/*.wav, all ours) — list of (frame offset, file, volume)
FX_SFX = {
    "oil": [(0, "ea1/k_slam", 0.45), (6, "ea1/vote_tick", 0.35), (14, "ea1/vote_tick", 0.3), (22, "ea1/vote_tick", 0.3)],
    "grain": [(0, "ea1/reply_pop", 0.45), (3, "ea1/reply_pop", 0.35), (6, "ea1/reply_pop", 0.35), (10, "ea1/chair_whoosh", 0.35)],
    "food": [(0, "ea1/reply_pop", 0.45), (3, "ea1/reply_pop", 0.35), (6, "ea1/reply_pop", 0.35), (10, "ea1/chair_whoosh", 0.35)],
    "money": [(0, "ea1/cash_rain", 0.5)],
    "ship": [(0, "ea1/chair_whoosh", 0.45), (4, "ea1/k_spin", 0.3)],
    "chip": [(0, "ea1/notif", 0.45), (4, "ea1/reply_pop", 0.35), (8, "ea1/reply_pop", 0.3)],
    "factory": [(0, "ea1/k_stop", 0.45), (6, "ea1/steps", 0.3)],
    "medicine": [(0, "ea1/reply_pop", 0.45), (3, "ea1/reply_pop", 0.35), (6, "ea1/reply_pop", 0.35)],
    "plane": [(0, "ea1/chair_whoosh", 0.5)],
    "fire": [(0, "ea1/k_flash", 0.45), (2, "ea1/k_boom", 0.35)],
    "arrow": [(0, "ea1/k_point", 0.5)],
    "crack": [(0, "ea1/name_glitch", 0.45), (1, "ea1/k_slam", 0.5)],
    "fade_country": [(0, "ea1/deflate", 0.5)],
}
STYLE_SFX = {"gone": ("ea1/fail", 0.5), "win": ("ea1/check1", 0.45), "loss": ("ea1/claim_buzz", 0.4), "neutral": None}
MUSIC = {"gone": "darkest_child", "loss": "investigations", "win": "life_of_riley", "neutral": "thinking_music"}
MUSIC_V = 0.15  # SHORTS.md [MUST] §2: music 15–20 % of the voice


def die(m):
    sys.exit("mapshort: " + m)


def load_spec(eid):
    p = Path(f"pipeline/maps/{eid}.json")
    if not p.exists():
        die(f"no spec {p}")
    s = json.loads(p.read_text(encoding="utf8"))
    errs = []
    for i, b in enumerate(s.get("beats", [])):
        b.setdefault("id", f"b{i + 1:02d}")
        m = b.setdefault("map", {})
        m.setdefault("focus", "WORLD")
        m.setdefault("highlight", [])
        m.setdefault("style", "neutral")
        if not b.get("say"):
            errs.append(f"beat {i + 1}: no say")
        if m["style"] not in STYLES:
            errs.append(f"beat {i + 1}: style {m['style']!r} not in {sorted(STYLES)}")
        if b.get("dave") in BANNED_POSES:
            print(f"  ! beat {i + 1}: dave {b['dave']!r} is banned (owner 9 Nov) → {BANNED_POSES[b['dave']]!r}")
            b["dave"] = BANNED_POSES[b["dave"]]
        if b.get("dave") and b["dave"] not in POSES:
            errs.append(f"beat {i + 1}: dave {b['dave']!r} not in {sorted(POSES)}")
        for x in b.get("fx", []):
            if x.get("type") not in FX:
                errs.append(f"beat {i + 1}: fx type {x.get('type')!r} unknown")
    if not s.get("beats"):
        errs.append("no beats")
    if errs:
        die("spec errors:\n  " + "\n  ".join(errs))
    return s


def script(eid):
    s = load_spec(eid)
    beats = [{"id": b["id"], "src": "", "text": b["say"], "pause": 0.1} for b in s["beats"]]
    ep = {"id": eid, "title": s.get("title", eid), "style": "v7", "voice": "chatterbox", "cb": {"cfg": 0.25, "exag": 0.5},
          "note": f"MAP SHORT — generated from pipeline/maps/{eid}.json by tools/mapshort.py, do not edit", "sources": s.get("sources", []), "beats": beats}
    Path(f"pipeline/episodes/{eid}.json").write_text(json.dumps(ep, indent=2, ensure_ascii=False), encoding="utf8")
    print(f"wrote pipeline/episodes/{eid}.json ({len(beats)} beats) → voice: gh workflow run voice.yml -f ep={eid}")


def fake_voice(eid, s):
    vj = Path(f"pipeline/voice/{eid}.json")
    if vj.exists() and not json.loads(vj.read_text(encoding="utf8")).get("fake"):
        die(f"{vj} is a REAL voice — not overwriting it with --fake-voice")
    t, beats = 0.05, []
    for b in s["beats"]:
        ws = []
        for w in b["say"].split():
            d = 0.22 + 0.025 * len(re.sub(r"\W", "", w))
            ws.append({"text": w, "start": round(t, 3), "end": round(t + d, 3)})
            t += d + 0.04
        beats.append({"id": b["id"], "text": b["say"], "start": ws[0]["start"], "end": ws[-1]["end"], "words": ws})
        t += 0.12
    total = round(t + 0.2, 3)
    vj.parent.mkdir(parents=True, exist_ok=True)
    vj.write_text(json.dumps({"fps": FPS, "total": total, "fake": True, "chapters": [], "beats": beats}, indent=1), encoding="utf8")
    subprocess.run([FF, "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(total), "-c:a", "flac", f"pipeline/voice/{eid}.flac"], check=True)
    print(f"fake voice: {total:.1f} s, {sum(len(b['words']) for b in beats)} words")


def timing(eid):
    tj, vj = Path(f"src/v6/{eid}_timing.json"), Path(f"pipeline/voice/{eid}.json")
    if not vj.exists():
        die(f"no voice {vj} — run `py tools/mapshort.py script {eid}` + voice.yml, or build with --fake-voice")
    stale = not tj.exists() or tj.stat().st_mtime < vj.stat().st_mtime
    if not stale and abs(json.loads(tj.read_text(encoding="utf8")).get("tempo", 1.0) - TEMPO) > 1e-6:
        stale = True  # owner 9 Nov: tempo changed but cached timing kept → audio 43 s, video 39.6 s, ending cut + fx out of sync
    if stale:
        Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
        subprocess.run([sys.executable, "tools/voice_gaps.py", eid, "0", "--tempo", str(TEMPO), "--maxgap", "0.3"], check=True, env={**os.environ, "PYTHONIOENCODING": "utf-8"})
    T = json.loads(tj.read_text(encoding="utf8"))
    T["tempo"] = TEMPO
    tj.write_text(json.dumps(T, indent=1), encoding="utf8")
    return T


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def word_at(vb, on):
    """start second (timing file = unslowed seconds) of the word(s) `on` in voice beat vb, or None"""
    toks = [norm(x) for x in str(on or "").split() if norm(x)]
    ws = vb.get("words", [])
    W = [norm(w.get("text") or w.get("word", "")) for w in ws]
    for exact in (True, False):  # exact first: fx "euro" must not land on "Europe"
        for j in range(len(ws)):
            if toks and all(j + k < len(ws) and (W[j + k] == toks[k] if exact else W[j + k].startswith(toks[k])) for k in range(len(toks))):
                return ws[j]["start"]
    return None


def word_frame(vb, on, fallback):
    if not on:
        return fallback
    t = word_at(vb, on)
    if t is None:
        print(f"  ! fx word {on!r} not found in beat {vb['id']} — anchored 6 frames after the beat start")
        return fallback
    return round(t * SPF)


def name_word(vb, m):
    """first spoken word naming the beat's focus (or a highlighted) country — exact match, so 'us' never hits 'used'"""
    if m.get("on"):
        return word_at(vb, m["on"])
    if m["focus"].upper() == "WORLD":
        return None  # zoom-out to the world: move on the beat start, there is no single name to wait for
    keys = [m["focus"].upper()] + [h.upper() for h in m["highlight"]]
    names = {n for k in keys for n in NAMES.get(k, [])}
    for w in vb.get("words", []):
        if norm(w.get("text") or w.get("word", "")) in names:
            return w["start"]
    return None


def probe_secs(path):
    r = subprocess.run([FF, "-i", str(path)], capture_output=True, text=True)
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr)
    return int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]) if m else None


def probe_len(path):
    r = subprocess.run([FF, "-i", str(path)], capture_output=True, text=True)
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr)
    return max(10, round((int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])) * FPS)) if m else 120


def build(eid, fake=False):
    s = load_spec(eid)
    if fake:
        fake_voice(eid, s)
    V = timing(eid)
    VB = {b["id"]: b for b in V["beats"]}
    if all(b["id"] in VB for b in s["beats"]):
        vbs = [VB[b["id"]] for b in s["beats"]]
    elif len(V["beats"]) == len(s["beats"]):
        vbs = V["beats"]
    else:
        die(f"voice has {len(V['beats'])} beats, spec {len(s['beats'])} — re-voice (`script {eid}`)")
    frames = max(1, round(V["total"] * SPF))
    au = Path(f"public/{eid}/voice.flac")
    asec = probe_secs(au) if au.exists() else None
    if asec is not None:
        if abs(asec - V["total"] / TEMPO) > 0.15:
            die(f"{au} is {asec:.2f} s but the timing says {V['total'] / TEMPO:.2f} s (total {V['total']:.2f} / tempo {TEMPO}) — "
                f"stale voice or tempo cache: delete src/v6/{eid}_timing.json + {au} and rebuild")
        frames = max(frames, math.ceil((asec + 0.4) * FPS))  # pad: the ending is never cut
    starts = [0] + [round(vb["start"] * SPF) for vb in vbs[1:]]
    beats, sfx = [], []
    for i, (b, vb) in enumerate(zip(s["beats"], vbs)):
        fr, to = starts[i], starts[i + 1] if i + 1 < len(starts) else frames
        m = b["map"]
        fxs = []
        for x in b.get("fx", []):
            wf = min(max(fr, word_frame(vb, x.get("on"), fr + 6)), to - 1)  # frame the word is heard
            at = max(fr, wf - FX_LEAD)  # pop starts just before → visible ON the word
            fxs.append({"type": x["type"], "from": x.get("from") or m["focus"], "to": x.get("to"), "at": at, "end": to, "word": x.get("on"), "wf": wf})
            sfx += [{"at": wf + o, "src": f, "v": v} for o, f, v in FX_SFX[x["type"]] if wf + o < frames]
        # camera move / highlight cross-fade: starts CAM_LEAD before the country name, never before the previous move ended
        nw = name_word(vb, m) if i else None
        cam = fr if nw is None else round(nw * SPF - CAM_LEAD * FPS)
        if i:
            first_fx = min([f["at"] for f in fxs], default=to)
            cam = max(beats[-1]["cam"] + 18, min(cam, to - 18, first_fx - 12))  # arrive (nearly) before the first fx of the beat
        beats.append({"from": fr, "to": to, "cam": cam, "say": b["say"], "text": b.get("text", ""), "focus": m["focus"].upper(),
                      "highlight": [h.upper() for h in m["highlight"]], "style": m["style"], "dave": b.get("dave", "talk"), "fx": fxs})
        if b.get("text"):
            sfx.append({"at": fr, "src": "ea1/k_stop", "v": 0.45})
        if i and beats[-1]["focus"] != beats[-2]["focus"]:
            sfx.append({"at": beats[-1]["cam"], "src": "ea1/photo_slide", "v": 0.4})
        if STYLE_SFX[m["style"]] and (i == 0 or beats[-2]["style"] != m["style"]):
            f_, v_ = STYLE_SFX[m["style"]]
            sfx.append({"at": fr + 3, "src": f_, "v": v_})
    sfx.insert(0, {"at": 0, "src": "ea1/reply_pop", "v": 0.4})
    # music per mood, drops out 9 frames before a 'gone' beat / the last beat (punchline)
    music = []
    for i, b in enumerate(beats):
        trk = MUSIC[b["style"]]
        punch = i + 1 < len(beats) and (beats[i + 1]["style"] == "gone" or i + 1 == len(beats) - 1)
        end = b["to"] - (9 if punch else 0)
        if music and music[-1]["src"] == trk and music[-1]["to"] == b["from"]:
            music[-1]["to"] = end
        else:
            music.append({"src": trk, "from": b["from"], "to": end, "v": MUSIC_V, "off": 210})
    music = [x for x in music if x["to"] - x["from"] > 6]
    dave = {}
    for p in sorted(POSES):
        w, g, d = Path(f"public/{eid}/dave_{p}.webm"), Path(f"public/{eid}/dave_{p}.png"), Path(f"public/{eid}/dave/{p}")
        seq = sorted(d.glob("[0-9][0-9][0-9][0-9].png")) if d.is_dir() else []
        if seq:  # PNG sequence (daveclips.zip frames/<pose>/) — fast to render, preferred over the VP9 webm
            dave[p] = {"src": f"{eid}/dave/{p}", "kind": "seq", "n": len(seq)}
        elif w.exists():
            dave[p] = {"src": f"{eid}/dave_{p}.webm", "kind": "webm", "len": probe_len(w)}
        elif g.exists():
            dave[p] = {"src": f"{eid}/dave_{p}.png", "kind": "png"}
    plan = {"id": eid, "title": s.get("title", eid), "w": 1080, "h": 1920, "frames": frames,
            "voice": f"{eid}/voice.flac" if Path(f"public/{eid}/voice.flac").exists() else None,
            "beats": beats, "music": music, "sfx": sorted(sfx, key=lambda c: c["at"]), "dave": dave}
    Path("src/v6/maps").mkdir(parents=True, exist_ok=True)
    Path(f"src/v6/maps/{eid}.plan.json").write_text(json.dumps(plan, ensure_ascii=False), encoding="utf8")
    ids = sorted(p.name[:-len(".plan.json")] for p in Path("src/v6/maps").glob("*.plan.json"))
    ts = "// generated by tools/mapshort.py — every map Short's frame plan (composition Map-<id>)\n"
    ts += "".join(f"import m_{re.sub(r'[^A-Za-z0-9_]', '_', i)} from './maps/{i}.plan.json';\n" for i in ids)
    ts += "export const MAP_PLANS = [" + ", ".join("m_" + re.sub(r"[^A-Za-z0-9_]", "_", i) for i in ids) + "];\n"
    Path("src/v6/mapEps.ts").write_text(ts, encoding="utf8")
    secs = frames / FPS
    longest = max(b["to"] - b["from"] for b in beats) / FPS
    print(f"plan src/v6/maps/{eid}.plan.json: {secs:.1f} s | {len(beats)} beats (longest {longest:.1f} s) | {sum(len(b['fx']) for b in beats)} fx | "
          f"{len(sfx)} sfx | dave poses {sorted(dave) or 'none'} | render: gh workflow run v6demo.yml -f comp=Map-{eid}")
    if not 25 <= secs <= 40 and not fake:
        print(f"  ! {secs:.1f} s — SHORTS.md [MUST] §1 wants 25–40 s")
    if asec is not None and asec > frames / FPS + 0.05:
        die(f"voice {asec:.2f} s is longer than the plan {frames / FPS:.2f} s — the ending would be cut")
    sync(eid)


def sync(eid):
    """print every fx + camera move vs the on-screen second of its word; die on a mismatch > 2 frames"""
    s, plan = load_spec(eid), json.loads(Path(f"src/v6/maps/{eid}.plan.json").read_text(encoding="utf8"))
    V = json.loads(Path(f"src/v6/{eid}_timing.json").read_text(encoding="utf8"))
    tempo = V.get("tempo", TEMPO)
    VB = {b["id"]: b for b in V["beats"]}
    vbs = [VB[b["id"]] for b in s["beats"]] if all(b["id"] in VB for b in s["beats"]) else V["beats"]
    bad = 0
    print(f"sync {eid}: tempo {tempo} | on-screen s = timing s / tempo | fx 'at' = word frame - {FX_LEAD} (pop peaks on the word)")
    print(f"{'beat':4} {'what':14} {'word':12} {'word s':>7} {'word f':>6} {'plan f':>6} {'Δf':>4}")
    for i, (sb, vb, pb) in enumerate(zip(s["beats"], vbs, plan["beats"])):
        nw = name_word(vb, sb["map"]) if i else None
        if nw is not None and pb.get("cam") is not None:
            want = max(round(nw * FPS / tempo) - round(CAM_LEAD * FPS), 0)
            land = pb["cam"] + 18
            print(f"{i + 1:4} {'camera→' + pb['focus']:14} {'(name)':12} {nw / tempo:7.2f} {round(nw * FPS / tempo):6} {pb['cam']:6} {pb['cam'] - want:+4}  (lands f{land})")
        for x, px in zip(sb.get("fx", []), pb["fx"]):
            t = word_at(vb, x.get("on"))
            if t is None:
                print(f"{i + 1:4} {x['type']:14} {str(x.get('on')):12} {'—':>7} {'—':>6} {px['at']:6}  ! word not found")
                bad += 1
                continue
            wf = round(t * FPS / tempo)
            want = max(pb["from"], min(wf, pb["to"] - 1) - FX_LEAD)
            d = px["at"] - want
            bad += abs(d) > 2
            print(f"{i + 1:4} {x['type']:14} {str(x.get('on')):12} {t / tempo:7.2f} {wf:6} {px['at']:6} {d:+4}{'  ! MISMATCH' if abs(d) > 2 else ''}")
    if bad:
        die(f"{bad} fx off by > 2 frames")


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2 or a[0] not in ("build", "script", "sync"):
        die(__doc__)
    if a[0] == "script":
        script(a[1])
    elif a[0] == "sync":
        sync(a[1])
    else:
        build(a[1], fake="--fake-voice" in a)
