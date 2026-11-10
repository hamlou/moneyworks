"""Scene Shorts (src/v6/SalShort.tsx): pipeline/episodes/<id>.json (voice text) + pipeline/scenes/<id>.json (scene/cue spec)
→ src/v6/scenes/<id>.plan.json + src/v6/salEps.ts (composition Sal-<id>).
Usage: py tools/salshort.py build <id> [--fake-voice]   |   py tools/salshort.py sync <id>
Checks (SHORTS_MUST): every cue word found, gaps <= 0.3 s, voice length == plan length, first word <= 0.2 s."""
import json, os, re, subprocess, sys
from pathlib import Path

R = Path(__file__).resolve().parent.parent
os.chdir(R)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
FPS, LEAD, MUSIC_V = 30, 3, 0.15
cmd, eid = sys.argv[1], sys.argv[2]
fake = "--fake-voice" in sys.argv
EP = json.loads(Path(f"pipeline/episodes/{eid}.json").read_text(encoding="utf8"))
SP = json.loads(Path(f"pipeline/scenes/{eid}.json").read_text(encoding="utf8"))
T = float(SP.get("tempo", 1.0))
TJ = Path(f"src/v6/{eid}_timing.json")


def die(m):
    print("ERROR:", m)
    sys.exit(1)


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower().replace("'", ""))


def timing():
    if fake:
        t, beats = 0.05, []
        for b in EP["beats"]:
            ws = []
            for w in b["text"].split():
                ws.append({"text": w, "start": t, "end": t + 0.26})
                t += 0.28
            beats.append({"id": b["id"], "text": b["text"], "start": ws[0]["start"], "end": ws[-1]["end"], "words": ws})
            t += 0.12
        return {"total": t + 0.15, "beats": beats, "tempo": T, "fake": True}
    vj = Path(f"pipeline/voice/{eid}.json")
    if not vj.exists():
        die(f"no voice {vj} — gh workflow run voice.yml -f ep={eid}, then git pull")
    stale = not TJ.exists() or json.loads(TJ.read_text(encoding="utf8")).get("fake") or abs(json.loads(TJ.read_text(encoding="utf8")).get("tempo", 1) - T) > 1e-6 \
        or TJ.stat().st_mtime < vj.stat().st_mtime
    if stale:
        Path(f"public/{eid}").mkdir(parents=True, exist_ok=True)
        a = [sys.executable, "tools/voice_gaps.py", eid, "0", "--tempo", str(T), "--maxgap", "0.3"]
        if SP.get("planned_beat"):
            a += ["--beat", SP["planned_beat"]]
        subprocess.run(a, check=True, env={**os.environ, "PYTHONIOENCODING": "utf-8"})
        d = json.loads(TJ.read_text(encoding="utf8"))
        d["tempo"] = T
        TJ.write_text(json.dumps(d), encoding="utf8")
    return json.loads(TJ.read_text(encoding="utf8"))


def fr(sec):
    return round(sec * FPS / T)


def build():
    V = timing()
    vb, sb = V["beats"], SP["beats"]
    if len(vb) != len(sb) or len(vb) != len(EP["beats"]):
        die(f"beats: voice {len(vb)} / spec {len(sb)} / episode {len(EP['beats'])}")
    total = fr(V["total"]) + 4
    beats, cues, sfx, errs = [], {}, [], []
    for i, (v, s) in enumerate(zip(vb, sb)):
        start = 0 if i == 0 else max(0, fr(v["words"][0]["start"]) - 2)
        beats.append({"id": v["id"], "from": start, "to": 0, "say": v["text"], "text": s.get("text"), "scene": s["scene"], "dave": s.get("dave", "talk"),
                      "fx": [], "highlight": [], "focus": "", "style": "neutral", "music": s.get("music")})
        for off, src, vol in s.get("sfx0", []):
            sfx.append({"at": start + off, "src": src, "v": vol})
        words = [norm(w["text"]) for w in v["words"]]
        for cu in s.get("cues", []):
            want = norm(cu["on"])
            if want not in words:
                errs.append(f"{v['id']}: cue {cu['k']} word {cu['on']!r} not in {words}")
                continue
            at = max(start, fr(v["words"][words.index(want)]["start"]) - LEAD)
            cues[cu["k"]] = at
            for off, src, vol in cu.get("sfx", []):
                sfx.append({"at": at + off, "src": src, "v": vol})
    if errs:
        die("\n  ".join(errs))
    for i, b in enumerate(beats):
        b["to"] = beats[i + 1]["from"] if i + 1 < len(beats) else total
    if fr(vb[0]["words"][0]["start"]) > 6:
        die(f"first word at {vb[0]['words'][0]['start']:.2f} s (> 0.2 s)")
    music, pb = [], SP.get("planned_beat")
    for b in beats:
        m, a, z = b.pop("music"), b["from"], b["to"]
        if b["id"] == pb:
            m = None
        nxt = beats.index(b) + 1 < len(beats) and beats[beats.index(b) + 1]["id"] == pb
        if nxt:
            z -= 9  # music drops out before the punchline (SHORTS_MUST §2)
        if not m:
            continue
        if music and music[-1]["src"] == m and music[-1]["to"] >= a - 1:
            music[-1]["to"] = z
        else:
            music.append({"src": m, "from": a, "to": z, "v": MUSIC_V, "off": 0})
    pk = [k for k in cues if k.startswith("pk_")]
    if pk and music:
        music.append({"src": music[0]["src"], "from": cues[pk[0]] + 12, "to": beats[-1]["from"], "v": MUSIC_V * 0.8, "off": 300})
    voice = f"{eid}/voice.flac" if Path(f"public/{eid}/voice.flac").exists() and not V.get("fake") else None
    dave_src = json.loads(Path("src/v6/maps/usa30.plan.json").read_text(encoding="utf8")).get("dave", {})
    plan = {"id": eid, "w": 1080, "h": 1920, "frames": total, "voice": voice, "beats": beats, "cues": cues, "music": music,
            "sfx": sorted(sfx, key=lambda c: c["at"]), "dave": dave_src}
    Path("src/v6/scenes").mkdir(exist_ok=True)
    Path(f"src/v6/scenes/{eid}.plan.json").write_text(json.dumps(plan, indent=1), encoding="utf8")
    ids = sorted(p.name[:-10] for p in Path("src/v6/scenes").glob("*.plan.json"))
    Path("src/v6/salEps.ts").write_text("// generated by tools/salshort.py — scene Shorts (composition Sal-<id>)\n" +
                                        "".join(f"import s_{i} from './scenes/{i}.plan.json';\n" for i in ids) +
                                        f"export const SAL_PLANS = [{', '.join('s_' + i for i in ids)}];\n", encoding="utf8")
    words = sum(len(b["words"]) for b in vb)
    print(f"{eid}: {total} frames = {total / FPS:.1f} s | {words} words = {words / (total / FPS):.2f} w/s | {len(cues)} cues | {len(sfx)} sfx | "
          f"{len(music)} music segs | voice {'FAKE' if V.get('fake') else voice}")
    for b in beats:
        print(f"  {b['id']} {b['from']:5}-{b['to']:5} ({(b['to'] - b['from']) / FPS:4.1f} s) {b['scene']:12} {b['say']}")


def sync():
    p = json.loads(Path(f"src/v6/scenes/{eid}.plan.json").read_text(encoding="utf8"))
    for k, v in sorted(p["cues"].items(), key=lambda x: x[1]):
        print(f"  {v:5} f  {v / FPS:6.2f} s  {k}")


build() if cmd == "build" else sync()
