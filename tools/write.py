"""Free writer: Gemini API (free tier) researches a topic and writes pipeline/auto/<id>.json, then loops on
`tools/auto.py check` until SPEC OK. No Claude, runs on the owner's PC or on GitHub Actions.
  set GEMINI_API_KEY=...   (free key: https://aistudio.google.com/apikey)
  py tools/write.py <id> "<topic idea>"            → spec + SPEC OK (then: py tools/auto.py all <id>)
Model: GEMINI_MODEL (default gemini-2.5-flash). Research uses Gemini's built-in Google Search grounding."""
import json, os, re, subprocess, sys, time, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.8-flash")  # writer (tested 7 Nov: works without search on free key)
RMODEL = os.environ.get("GEMINI_RESEARCH_MODEL", "gemini-2.5-flash-lite")  # Google Search grounding works on free tier
API = "https://generativelanguage.googleapis.com/v1beta/models/{}:generateContent"


WRITERS = [MODEL] + [m for m in ("gemini-3.7-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-2.5-flash-lite") if m != MODEL]


def ask(parts, search=False, temp=0.9):
    """free tier is flaky (503 overloaded / 429 quota) → fall through a chain of free models, then wait and retry"""
    body = {"contents": parts, "generationConfig": {"temperature": temp, "maxOutputTokens": 32000}}
    if search:
        body["tools"] = [{"google_search": {}}]
    models = [RMODEL, "gemini-3.1-flash-lite"] if search else WRITERS
    for rnd in range(4):
        for m in models:
            try:
                req = urllib.request.Request(API.format(m), json.dumps(body).encode(), {"Content-Type": "application/json", "x-goog-api-key": KEY})
                r = json.loads(urllib.request.urlopen(req, timeout=400).read())
                return "".join(p.get("text", "") for p in r["candidates"][0]["content"]["parts"])
            except Exception as e:
                print(f"  {m}: {str(e)[:80]}", flush=True)
        time.sleep(30 * (rnd + 1))
    sys.exit("all free Gemini models failed — quota for today used up? try again later")


def past_looks():
    out = []
    for q in sorted((ROOT / "pipeline/auto").glob("*.json"), key=lambda q: q.stat().st_mtime)[-3:]:
        s = json.loads(q.read_text(encoding="utf8"))
        out.append(f"{q.stem}: look={s.get('look')} skies={sorted({v.get('sky') for v in s['shots'].values() if v.get('sky')})} title={s.get('title')}")
    return "\n".join(out)


def jsonblock(t):
    m = re.search(r"```(?:json)?\s*(\{.*\})\s*```", t, re.S) or re.search(r"(\{.*\})", t, re.S)
    return json.loads(m.group(1))


NL = "\n"


def factcheck(spec):
    """every line with a number is checked against Google Search by a second model; returns '' if all confirmed"""
    nums = re.compile(r"\b(percent|million|billion|thousand|hundred|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|times|dollars)\b")
    lines = [l["say"] for c in [spec["hook"]] + spec["chapters"] for l in c["lines"] if nums.search(l["say"])]
    srcs = NL.join(f"{x['id']}: {x['short']} {x['url']}" for x in spec["sources"])
    q = ("Fact-check each claim with Google Search. Sources given:" + NL + srcs + NL + NL + "Claims:" + NL
         + NL.join(f"{i + 1}. {l}" for i, l in enumerate(lines)) + NL + NL
         + "For each claim reply one line: '<n>. OK' if a reliable source confirms it (numbers may be rounded), "
           "or '<n>. WRONG: <the true figure + source URL>' or '<n>. UNVERIFIED'. Nothing else.")
    t = ask([{"role": "user", "parts": [{"text": q}]}], search=True, temp=0.1)
    bad = [ln for ln in t.splitlines() if re.search(r"WRONG|UNVERIFIED", ln)]
    print(f"fact check: {len(lines) - len(bad)}/{len(lines)} confirmed", flush=True)
    return NL.join(bad)


def preview(eid, spec):
    """human-readable script for the owner to approve BEFORE anything renders"""
    out = [f"# {spec['title']}", f"look: {spec.get('look')}", ""]
    for ci, c in enumerate([{"title": "HOOK", **spec["hook"]}] + spec["chapters"]):
        out.append(f"## {c['title']}")
        out += [f"- `{'k%d' % (i + 1) if ci == 0 else 'c%d_%02d' % (ci, i + 1)}` {l['say']}" for i, l in enumerate(c["lines"])]
        out.append("")
    out += ["## Sources"] + [f"- {x['id']} {x['short']} — {x['url']}" for x in spec["sources"]]
    p = ROOT / "videos" / eid
    p.mkdir(parents=True, exist_ok=True)
    (p / "script.md").write_text(NL.join(out), encoding="utf8")
    print(f"READ IT: {p / 'script.md'}")
    print(f"  happy?            py tools/auto.py all {eid}")
    print(f"  change something? py tools/edit.py {eid} \"<what to change>\"")



def main():
    if not KEY:
        sys.exit("set GEMINI_API_KEY first (free: https://aistudio.google.com/apikey)")
    eid, topic = sys.argv[1], " ".join(sys.argv[2:])
    guide = (ROOT / "AUTOPILOT.md").read_text(encoding="utf8")
    assets = (ROOT / "pipeline/ASSETS.md").read_text(encoding="utf8")
    example = (ROOT / "pipeline/auto/au1.json").read_text(encoding="utf8")
    # 1) research with live Google Search: true numbers + real source URLs
    facts = ask([{"role": "user", "parts": [{"text":
        f"Research this money video idea for a YouTube explainer: {topic}\n"
        "Find 4-6 surprising TRUE facts with numbers, each from an official or academic source (government, central bank, university, big newspaper). "
        "For each: the fact, the exact number, source name, year, and the source URL. Also give 3 title ideas that a 12-year-old understands "
        "(a question or a withheld result). Plain text."}]}], search=True, temp=0.4)
    print(facts[:1500])
    # 2) write the spec
    sys_prompt = (f"You write ONE JSON file for an automatic video system. Follow this guide exactly:\n\n{guide}\n\n"
                  f"Allowed 3D asset ids:\n{assets}\n\nA complete valid example (different topic, different look — do NOT copy its look, skies or jokes):\n{example}\n\n"
                  f"Last episodes (never repeat their look.style, look.format, or skies):\n{past_looks()}")
    msgs = [{"role": "user", "parts": [{"text": sys_prompt + f"\n\nResearch notes:\n{facts}\n\nWrite the full JSON for id '{eid}'. "
             "Be creative: pick a fresh format and style that fit THIS topic, a hook that makes people stay, a running joke, real objects and places for every scene. "
             "Reply with only the JSON in a ```json block."}]}]
    out = ROOT / "pipeline/auto" / f"{eid}.json"
    for rnd in range(8):
        txt = ask(msgs)
        try:
            spec = jsonblock(txt)
        except Exception as e:
            msgs += [{"role": "model", "parts": [{"text": txt[:4000]}]}, {"role": "user", "parts": [{"text": f"That was not valid JSON ({e}). Reply with only the full JSON."}]}]
            continue
        out.write_text(json.dumps(spec, ensure_ascii=False, indent=1), encoding="utf8")
        r = subprocess.run([sys.executable, "tools/auto.py", "check", eid], cwd=ROOT, capture_output=True, text=True, encoding="utf8", errors="replace")
        rep = r.stdout + r.stderr
        print(f"round {rnd + 1}:", rep.strip().splitlines()[-1] if rep.strip() else "?", flush=True)
        if "SPEC OK" in rep:
            bad = factcheck(spec)
            if not bad:
                print(rep)
                preview(eid, spec)
                return
            rep = "FACT CHECK FAILED (Google Search could not confirm these: replace with confirmed numbers or cut the claim):" + NL + bad
        msgs += [{"role": "model", "parts": [{"text": json.dumps(spec, ensure_ascii=False)}]},
                 {"role": "user", "parts": [{"text": "The checker says:\n" + rep[-6000:] + "\nFix EVERY ✗ and reply with the full corrected JSON only."}]}]
    sys.exit(f"still failing after 8 rounds — open {out}, fix the ✗ lines by hand, run py tools/auto.py check {eid}")


if __name__ == "__main__":
    main()
