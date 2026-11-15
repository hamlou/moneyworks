"""AUTOPILOT WRITER for the cinematic documentary format (LONG.md [DOC]). No Claude needed: free Gemini API researches the
story and writes pipeline/doc/<id>.json, then loops on `tools/doc.py check` until SPEC OK.
  py tools/docwrite.py <id> "<the story, e.g. Alta Banka owner allegedly took $427M cash from his own vault, Nov 2026>"
Then (same for every video):  py tools/doc.py images <id> → owner makes the stills → py tools/doc.py voice <id> → push →
py tools/doc.py build <id> → py tools/doc.py stills <id> (show the owner) → py tools/doc.py render <id>.
Keys: see tools/write.py (GEMINI_API_KEYS or ~/.moneyworks_gemini). The gates in doc.py are the quality lock: never bypass them."""
import json, re, subprocess, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
ROOT = Path(__file__).resolve().parent.parent
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass


def rules():
    t = (ROOT / "LONG.md").read_text(encoding="utf8")
    a = t.index("## [DOC]")
    return t[a:t.index("\n## [RECIPE]", a)]


def run_check(eid):
    r = subprocess.run([sys.executable, "tools/doc.py", "check", eid], cwd=ROOT, capture_output=True, text=True, encoding="utf-8", env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    return r.returncode == 0, r.stdout + r.stderr


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    from write import ask, jsonblock, KEYS
    U = lambda t: {"role": "user", "parts": [{"text": t}]}
    M = lambda t: {"role": "model", "parts": [{"text": t}]}
    if not KEYS:
        sys.exit("set GEMINI_API_KEY first (free: https://aistudio.google.com/apikey)")
    eid, topic = sys.argv[1], sys.argv[2]
    out = ROOT / "pipeline" / "doc" / f"{eid}.json"
    example = (ROOT / "pipeline" / "doc" / "citi.json").read_text(encoding="utf8")
    print("research…")
    facts = ask([U(f"""Research this true money story with Google Search: {topic}
Return 25-40 FACTS as a numbered list. Each fact: one sentence + the exact number/date/time/name + the source name + its URL.
Must include: the exact amount, the exact date and time of the key moment, who did what step by step (a timeline), every named person and
company, at least 3 VERBATIM quotes (who said it, when, where published), at least 3 REAL headlines (publication + date, exact wording),
what is only ALLEGED vs proven in court, what happened to the money and to each person afterwards, and one earlier record to compare the amount with.
Never invent. If something is unknown write UNKNOWN.""")], search=True, temp=0.2)
    (ROOT / "pipeline" / "research").mkdir(exist_ok=True)
    (ROOT / "pipeline" / "research" / f"{eid}_facts.md").write_text(facts, encoding="utf8")
    msgs = [U(f"""You write ONE JSON spec for a cinematic documentary video. Follow these rules exactly (a checker enforces them):

{rules()}

WORKING EXAMPLE (a short test; a real video has ≥ 30 scenes and 900-2600 spoken words, same hook order):
{example}

THE STORY: {topic}
VERIFIED FACTS (use only these; every figure needs "src"; quotes and headlines verbatim; say "allegedly" for anything not proven):
{facts}

Write the full spec for id "{eid}" (no "test" field). Different stills, pictograms, absurd detail and comparison than the example.
After the title card: explain simply, answer question 1 by ~2 minutes, keep a 'But…/Then…/question' turn at least every 45 s,
answer the biggest question last, end with what happened to everyone + one line about the viewer's own money.
Each image scene needs a "prompt" for an image generator: dark cinematic 3D-render look, ONE object or place, no text, no real person's face, 16:9.
Return ONLY the JSON.""")]
    for rnd in range(10):
        txt = ask(msgs, temp=0.8 if rnd == 0 else 0.4)
        try:
            spec = jsonblock(txt)
        except Exception as x:
            msgs = msgs[:1] + [M(txt[:4000]), U(f"That was not valid JSON ({x}). Return ONLY the full corrected JSON.")]
            continue
        spec["id"] = eid
        spec.pop("test", None)
        out.write_text(json.dumps(spec, indent=1, ensure_ascii=False), encoding="utf8")
        ok, log = run_check(eid)
        print(f"round {rnd + 1}:", log.strip().splitlines()[-1])
        if ok:
            print(f"SPEC OK → pipeline/doc/{eid}.json\nnext: py tools/doc.py images {eid}   (then voice → build → stills → render)")
            return
        errs = "\n".join(l for l in log.splitlines() if "✗" in l)[:6000]
        msgs = msgs[:1] + [M(json.dumps(spec, ensure_ascii=False)), U(f"The checker refused it. Fix EVERY line below and return ONLY the full corrected JSON:\n{errs}")]
    sys.exit(f"still failing after 10 rounds — open pipeline/doc/{eid}.json and fix the ✗ lines by hand: py tools/doc.py check {eid}")


if __name__ == "__main__":
    main()
