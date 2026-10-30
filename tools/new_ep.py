"""Scaffold a new v7 episode from ea1 (the approved reverse-engineered style) — no code is rewritten by hand.
py tools/new_ep.py <id> "<Title>"
Creates: pipeline/episodes/<id>.json (beats to fill), pipeline/sfx/<id>.json, blender/<id>.py + _lens.json + .chunks,
src/v6/<Id>.tsx (registered in Root.tsx). Then follow EPISODE_RECIPE.md."""
import json, re, shutil, sys
from pathlib import Path

R = Path(__file__).resolve().parent.parent
eid, title = sys.argv[1], sys.argv[2]
Id = eid[0].upper() + eid[1:]
src = json.loads((R / "pipeline/episodes/ea1.json").read_text(encoding="utf-8"))
ep = {"id": eid, "title": title, "style": "v7", "voice": "chatterbox", "cb": src["cb"], "note": "", "sources": [],
      "beats": [{"id": "k1", "src": "", "text": "PRIZE/RESULT line", "pause": 0.2, "exag": 0.55},
                {"id": "k2", "src": "", "text": "TWIST line", "pause": 0.35, "exag": 0.55},
                {"id": "k3", "src": "", "text": "QUESTION line?", "pause": 0.35, "exag": 0.55},
                {"id": "k4", "src": "", "text": "PROMISE line", "pause": 0.45}]}
out = {
    R / f"pipeline/episodes/{eid}_draft.json": json.dumps(ep, indent=2, ensure_ascii=False),  # _draft: no voice run until renamed
    R / f"pipeline/sfx/{eid}.json": json.dumps({"note": f"{eid} sound plan", "sounds": json.loads((R / "pipeline/sfx/ea1.json").read_text(encoding="utf-8"))["sounds"]}, indent=1),
    R / f"blender/{eid}_lens.json": json.dumps({"H": 108, "S": 130}),
    R / f"blender/{eid}.chunks": "[]",
}
for p, t in out.items():
    if p.exists():
        sys.exit(f"exists: {p}")
for p, t in out.items():
    p.write_text(t, encoding="utf-8")
py = (R / "blender/ea1.py").read_text(encoding="utf-8").replace("ea1_lens.json", f"{eid}_lens.json")
(R / f"blender/{eid}.py").write_text(py, encoding="utf-8")
tsx = (R / "src/v6/Ea1.tsx").read_text(encoding="utf-8")
tsx = tsx.replace("ea1/", f"{eid}/").replace("voice/ea1.json", f"voice/{eid}.json").replace("ea1_lens.json", f"{eid}_lens.json")
tsx = re.sub(r"\bEa1\b", Id, tsx).replace("EA1_FRAMES", f"{eid.upper()}_FRAMES")
(R / f"src/v6/{Id}.tsx").write_text(tsx, encoding="utf-8")
(R / f"public/{eid}").mkdir(exist_ok=True)
root = R / "src/v6/Root.tsx"
rt = root.read_text(encoding="utf-8")
if f"'./{Id}'" not in rt:
    rt = rt.replace("import {Ea1, EA1_FRAMES} from './Ea1';", f"import {{Ea1, EA1_FRAMES}} from './Ea1';\nimport {{{Id}, {eid.upper()}_FRAMES}} from './{Id}';")
    rt = rt.replace('<Composition id="Ea1" component={Ea1} width={1920} height={1080} fps={30} durationInFrames={EA1_FRAMES} />',
                    f'<Composition id="Ea1" component={{Ea1}} width={{1920}} height={{1080}} fps={{30}} durationInFrames={{EA1_FRAMES}} />\n    <Composition id="{Id}" component={{{Id}}} width={{1920}} height={{1080}} fps={{30}} durationInFrames={{{eid.upper()}_FRAMES}} />')
    root.write_text(rt, encoding="utf-8")
print(f"scaffolded {eid}: edit pipeline/episodes/{eid}_draft.json → rename to {eid}.json to voice; scenes in src/v6/{Id}.tsx; shots in blender/{eid}.py")
