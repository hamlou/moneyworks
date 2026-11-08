"""Change a video in plain words (free Gemini), e.g.
  py tools/edit.py au2 "make the hook funnier"
  py tools/edit.py au2 "line c2_03: say it costs fifty dollars not forty"
  py tools/edit.py au2 "chapter 3 shot C: put it in a supermarket at night with a shopping cart"
  py tools/edit.py au2 "add a real clip of a protest about rent in chapter 4"
Gemini edits pipeline/auto/<id>.json, `check` must pass, the old version is kept as <id>.json.bak, and it prints what changed
and which steps to re-run (voice only if words changed, 3D only if shots changed)."""
import json, shutil, subprocess, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import write as W  # noqa: E402

ROOT = W.ROOT


def diff(a, b):
    def ids(s):  # same ids as auto.py: k1.. for the hook, c<chapter>_<nn>
        out = {f"k{i + 1}": l["say"] for i, l in enumerate(s["hook"]["lines"])}
        for ci, c in enumerate(s["chapters"], 1):
            out.update({f"c{ci}_{i + 1:02d}": l["say"] for i, l in enumerate(c["lines"])})
        return out
    la, lb = ids(a), ids(b)
    words = [k for k in lb if la.get(k) != lb[k]] + [k for k in la if k not in lb]
    shots = [k for k in set(a["shots"]) | set(b["shots"]) if a["shots"].get(k) != b["shots"].get(k)]
    return words, shots


def main():
    if not W.KEY:
        sys.exit("set GEMINI_API_KEY first")
    eid, ask_ = sys.argv[1], " ".join(sys.argv[2:])
    p = ROOT / "pipeline/auto" / f"{eid}.json"
    old = json.loads(p.read_text(encoding="utf8"))
    guide = (ROOT / "AUTOPILOT.md").read_text(encoding="utf8")
    assets = (ROOT / "pipeline/PROPS.md").read_text(encoding="utf8") + (ROOT / "pipeline/ASSETS.md").read_text(encoding="utf8")
    msgs = [{"role": "user", "parts": [{"text": f"Guide:\n{guide}\n\nAllowed 3D ids:\n{assets}\n\nCurrent spec:\n{json.dumps(old, ensure_ascii=False)}\n\n"
             f"The channel owner wants this change: {ask_}\nChange ONLY what is needed for that (keep line ids of unchanged lines). "
             "Reply with the full JSON only in a ```json block."}]}]
    shutil.copy(p, p.with_suffix(".json.bak"))
    for rnd in range(6):
        txt = W.ask(msgs, temp=0.5)
        try:
            spec = W.jsonblock(txt)
        except Exception as e:
            msgs += [{"role": "model", "parts": [{"text": txt[:3000]}]}, {"role": "user", "parts": [{"text": f"Not valid JSON ({e}). Full JSON only."}]}]
            continue
        p.write_text(json.dumps(spec, ensure_ascii=False, indent=1), encoding="utf8")
        r = subprocess.run([sys.executable, "tools/auto.py", "check", eid], cwd=ROOT, capture_output=True, text=True, encoding="utf8", errors="replace")
        rep = r.stdout + r.stderr
        if "SPEC OK" in rep:
            words, shots = diff(old, spec)
            W.preview(eid, spec)
            print("changed lines:", words or "none", "| changed 3D shots:", shots or "none")
            steps = (["voice"] if words else []) + ["build"] + (["shots"] if shots else []) + ["render"]
            print("now run:", "  then  ".join(f"py tools/auto.py {s} {eid}" for s in steps))
            print(f"undo: copy {p.with_suffix('.json.bak')} back over {p}")
            return
        msgs += [{"role": "model", "parts": [{"text": json.dumps(spec, ensure_ascii=False)}]},
                 {"role": "user", "parts": [{"text": "Checker:\n" + rep[-5000:] + "\nFix every ✗, keep the owner's change. Full JSON only."}]}]
    shutil.copy(p.with_suffix(".json.bak"), p)
    sys.exit("could not make that change pass the checks — spec restored, try saying it differently")


if __name__ == "__main__":
    main()
