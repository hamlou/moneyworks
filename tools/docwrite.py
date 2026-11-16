"""AUTOPILOT WRITER for the cinematic documentary format (LONG.md [DOC]). No Claude needed: free Gemini API picks a proven
topic (or takes yours), researches it and writes pipeline/doc/<id>.json, then loops on `tools/doc.py check` until SPEC OK.
  py tools/docwrite.py <id>                      autopilot picks the topic from measured proof (tools/doctopic.py)
  py tools/docwrite.py <id> "<topic or story>"   your topic — still has to pass the demand test
Then (same for every video):  py tools/doc.py images <id> → owner makes the stills + thumb.jpg → py tools/doc.py voice <id> → push →
py tools/doc.py build <id> → py tools/doc.py stills <id> (show the owner) → py tools/doc.py thumb <id> → py tools/doc.py render <id>.
Keys: see tools/write.py (GEMINI_API_KEYS or ~/.moneyworks_gemini). The gates in doc.py are the quality lock: never bypass them."""
import json, os, subprocess, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
ROOT = Path(__file__).resolve().parent.parent
os.chdir(ROOT)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
U = lambda t: {"role": "user", "parts": [{"text": t}]}
M = lambda t: {"role": "model", "parts": [{"text": t}]}


def rules():
    t = (ROOT / "LONG.md").read_text(encoding="utf8")
    a = t.index("## [DOC]")
    return t[a:t.index("\n## [RECIPE]", a)]


def run_check(eid):
    r = subprocess.run([sys.executable, "tools/doc.py", "check", eid], cwd=ROOT, capture_output=True, text=True, encoding="utf-8", env={**os.environ, "PYTHONIOENCODING": "utf-8"})
    return r.returncode == 0, r.stdout + r.stderr


def done_topics():
    out = []
    for p in (ROOT / "pipeline" / "doc").glob("*.json"):
        try:
            d = json.loads(p.read_text(encoding="utf8"))
            if isinstance(d, dict) and d.get("title") and not d.get("test"):
                out.append(d["title"])
        except Exception:
            pass
    return out


def pick_topic(ask, jsonblock, given):
    """Returns (topic text, query, proof urls). The numbers come from doctopic.py, never from the model."""
    import doctopic
    outl = json.loads(doctopic.OUT.read_text(encoding="utf8")) if doctopic.OUT.exists() else doctopic.scan()
    top = "\n".join(f"{o['multiple']}x | {o['views']:,} views | {o['channel']} | {o['title']} | {o['url']}" for o in outl[:45])
    want = f'The owner asked for this topic: "{given}". Give 3 search queries a viewer would type for it and the outlier urls of the same kind.' if given else \
        "Propose 6 DIFFERENT evergreen topics (still true in 3 years) for a dark cinematic money documentary: how a scam / trick / hidden system works, or a famous collapse. Each must be the same KIND of topic as one of the outliers, but not the same video."
    txt = ask([U(f"""These videos beat their own channel's normal views (multiple | views | channel | title | url):
{top}

Already made by us (never repeat): {done_topics() or 'nothing yet'}

{want}
Return ONLY JSON: {{"candidates": [{{"topic": "one sentence", "query": "how a viewer would search it on YouTube", "proof": ["url from the list above", "..."]}}]}}""")], temp=0.7)
    cands = jsonblock(txt)["candidates"]
    urls = {o["url"] for o in outl}
    best = None
    for c in cands[:6]:
        proof = [u for u in c.get("proof", []) if u in urls]
        if not proof:
            print(f"  skip (no real outlier proof): {c.get('topic', '')[:70]}")
            continue
        d = doctopic.demand(c["query"])
        print(f"  {'PASS' if d['pass'] else 'fail'} score {d['score']:>2}  {c['query']}")
        if d["pass"] and (best is None or d["score"] > best[3]):
            best = (given or c["topic"], c["query"], proof, d["score"])
    if not best:
        sys.exit("✗ no candidate passed the demand test — run again, or give another topic: py tools/docwrite.py <id> \"<topic>\"")
    print(f"TOPIC: {best[0]}  (query: {best[1]})")
    return best[:3]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    from write import ask, jsonblock, KEYS
    if not KEYS:
        sys.exit("set GEMINI_API_KEY first (free: https://aistudio.google.com/apikey)")
    eid = sys.argv[1]
    topic, query, proof = pick_topic(ask, jsonblock, sys.argv[2] if len(sys.argv) > 2 else "")
    import doc as docmod
    used = docmod.recent_hooks(eid)
    free = [h for h in docmod.HOOKS if h not in used]
    hook = free[sum(map(ord, eid)) % len(free)]
    print(f"HOOK TYPE: {hook} (last videos used {used or 'none'})")
    out = ROOT / "pipeline" / "doc" / f"{eid}.json"
    example = (ROOT / "pipeline" / "doc" / "citi.json").read_text(encoding="utf8")
    print("research…")
    facts = ask([U(f"""Research with Google Search for a documentary video about: {topic}
Find ONE real, well-documented case to open the video with (exact amount, exact date and time, named company/person) and how the thing works step by step.
Return 25-40 FACTS as a numbered list. Each fact: one sentence + the exact number/date/time/name + the source name + its URL.
Must include: the exact amount, the date and time of the key moment, a step-by-step timeline, every named person and company, at least 3 VERBATIM
quotes (who, when, where published), at least 3 REAL headlines (publication + date, exact wording), what is only ALLEGED vs proven in court,
what happened afterwards to the money and to each person, and one earlier record to compare the amount with.
Never invent. If something is unknown write UNKNOWN.""")], search=True, temp=0.2)
    (ROOT / "pipeline" / "research").mkdir(exist_ok=True)
    (ROOT / "pipeline" / "research" / f"{eid}_facts.md").write_text(facts, encoding="utf8")
    first = U(f"""You write ONE JSON spec for a cinematic documentary video. Follow these rules exactly (a checker enforces them):

{rules()}

WORKING EXAMPLE of the scene format and hook order (a short test; a real video has ≥ 30 scenes and 900-2600 spoken words):
{example}

THE TOPIC: {topic}
VERIFIED FACTS (use only these; every figure needs "src"; quotes and headlines verbatim; say "allegedly" for anything not proven):
{facts}

Write the full spec for id "{eid}" (no "test" field). It MUST contain exactly this proof block, unchanged:
"topic": {json.dumps({"evergreen": True, "query": query, "proof": proof})}
"hook": {{"type": "{hook}"}}  → {docmod.HOOKS[hook]}
and also "title", "alt_titles" (2), "thumb" {{"words", "space", "copied_from", "prompt"}} as in rules §2.
Different stills, pictograms, absurd detail and comparison than the example.
After the title card: explain simply, answer question 1 by ~2 minutes, keep a 'But…/Then…/question' turn at least every 45 s,
answer the biggest question last, end with what happened to everyone + one line about the viewer's own money.
Each image scene needs a "prompt" for an image generator: dark cinematic 3D-render look, ONE object or place, no text, no real person's face, 16:9.
Return ONLY the JSON.""")
    msgs = [first]
    for rnd in range(10):
        txt = ask(msgs, temp=0.8 if rnd == 0 else 0.4)
        try:
            spec = jsonblock(txt)
        except Exception as x:
            msgs = [first, M(txt[:4000]), U(f"That was not valid JSON ({x}). Return ONLY the full corrected JSON.")]
            continue
        spec["id"] = eid
        spec.pop("test", None)
        spec["topic"] = {"evergreen": True, "query": query, "proof": proof}  # measured proof, set by code
        spec["hook"] = {"type": hook}
        out.write_text(json.dumps(spec, indent=1, ensure_ascii=False), encoding="utf8")
        ok, log = run_check(eid)
        print(f"round {rnd + 1}:", log.strip().splitlines()[-1])
        if ok:
            print(f"SPEC OK → pipeline/doc/{eid}.json\nnext: py tools/doc.py images {eid}   (then voice → build → stills → thumb → render)")
            return
        errs = "\n".join(l for l in log.splitlines() if "✗" in l)[:6000]
        msgs = [first, M(json.dumps(spec, ensure_ascii=False)), U(f"The checker refused it. Fix EVERY line below and return ONLY the full corrected JSON:\n{errs}")]
    sys.exit(f"still failing after 10 rounds — open pipeline/doc/{eid}.json and fix the ✗ lines by hand: py tools/doc.py check {eid}")


if __name__ == "__main__":
    main()
