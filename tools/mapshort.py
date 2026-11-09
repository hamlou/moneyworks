"""Map Shorts (1080x1920, src/v6/MapShort.tsx): spec pipeline/maps/<id>.json → frame plan src/v6/maps/<id>.plan.json.
Usage:
  py tools/mapshort.py script <id>                 write pipeline/episodes/<id>.json (beat ids b01.. for voice.yml / tts)
  py tools/mapshort.py build <id> [--fake-voice]   voice timing (voice_gaps --maxgap 0.3) → plan + src/v6/mapEps.ts
  --fake-voice  no real voice yet: spreads the words evenly (~3.2 words/s) into pipeline/voice/<id>.json + a silent .flac
                (refuses to overwrite a real voice json)
Spec beats: {say, map:{focus, highlight, style}, fx:[{type, from, to, on}], text, dave}  — fx "on" = word in `say` it lands on."""
import json, os, re, shutil, subprocess, sys
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
FX = {"oil", "grain", "food", "money", "ship", "chip", "factory", "medicine", "plane", "fire", "arrow", "crack", "fade_country"}
STYLES = {"gone", "loss", "win", "neutral"}
POSES = {"talk", "shock", "point", "laugh", "shrug", "cheer", "think", "worried"}
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
MUSIC_V = 0.15  # SHORTS_MUST §2: music 15–20 % of the voice


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
    if not tj.exists() or tj.stat().st_mtime < vj.stat().st_mtime:
        Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
        subprocess.run([sys.executable, "tools/voice_gaps.py", eid, "0", "--tempo", "1.0", "--maxgap", "0.3"], check=True, env={**os.environ, "PYTHONIOENCODING": "utf-8"})
    return json.loads(tj.read_text(encoding="utf8"))


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def word_frame(vb, on, fallback):
    if not on:
        return fallback
    toks = [norm(x) for x in str(on).split() if norm(x)]
    ws = vb.get("words", [])
    for j in range(len(ws)):
        if toks and all(j + k < len(ws) and norm(ws[j + k].get("text") or ws[j + k].get("word", "")).startswith(toks[k]) for k in range(len(toks))):
            return round(ws[j]["start"] * FPS)
    print(f"  ! fx word {on!r} not found in beat {vb['id']} — anchored 6 frames after the beat start")
    return fallback


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
    frames = max(1, round(V["total"] * FPS))
    starts = [0] + [round(vb["start"] * FPS) for vb in vbs[1:]]
    beats, sfx = [], []
    for i, (b, vb) in enumerate(zip(s["beats"], vbs)):
        fr, to = starts[i], starts[i + 1] if i + 1 < len(starts) else frames
        m = b["map"]
        fxs = []
        for x in b.get("fx", []):
            at = min(max(fr, word_frame(vb, x.get("on"), fr + 6)), to - 1)
            fxs.append({"type": x["type"], "from": x.get("from") or m["focus"], "to": x.get("to"), "at": at, "end": to})
            sfx += [{"at": at + o, "src": f, "v": v} for o, f, v in FX_SFX[x["type"]] if at + o < frames]
        beats.append({"from": fr, "to": to, "say": b["say"], "text": b.get("text", ""), "focus": m["focus"].upper(),
                      "highlight": [h.upper() for h in m["highlight"]], "style": m["style"], "dave": b.get("dave", "talk"), "fx": fxs})
        if b.get("text"):
            sfx.append({"at": fr, "src": "ea1/k_stop", "v": 0.45})
        if i and beats[-1]["focus"] != beats[-2]["focus"]:
            sfx.append({"at": fr, "src": "ea1/photo_slide", "v": 0.4})
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
        w, g = Path(f"public/{eid}/dave_{p}.webm"), Path(f"public/{eid}/dave_{p}.png")
        if w.exists():
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
        print(f"  ! {secs:.1f} s — SHORTS_MUST §1 wants 25–40 s")


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2 or a[0] not in ("build", "script"):
        die(__doc__)
    if a[0] == "script":
        script(a[1])
    else:
        build(a[1], fake="--fake-voice" in a)
