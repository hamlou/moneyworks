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


def ask(parts, search=False, temp=0.9):
    body = {"contents": parts, "generationConfig": {"temperature": temp, "maxOutputTokens": 32000}}
    if search:
        body["tools"] = [{"google_search": {}}]
    for i in range(6):
        try:
            req = urllib.request.Request(API.format(RMODEL if search else MODEL), json.dumps(body).encode(), {"Content-Type": "application/json", "x-goog-api-key": KEY})
            r = json.loads(urllib.request.urlopen(req, timeout=300).read())
            return "".join(p.get("text", "") for p in r["candidates"][0]["content"]["parts"])
        except Exception as e:  # free tier: 429 / 503 → wait and retry
            print("gemini retry", i, str(e)[:120], flush=True)
            time.sleep(20 * (i + 1))
    sys.exit("Gemini failed 6 times — quota? try later or set GEMINI_MODEL=gemini-2.5-flash-lite")


def past_looks():
    out = []
    for q in sorted((ROOT / "pipeline/auto").glob("*.json"), key=lambda q: q.stat().st_mtime)[-3:]:
        s = json.loads(q.read_text(encoding="utf8"))
        out.append(f"{q.stem}: look={s.get('look')} skies={sorted({v.get('sky') for v in s['shots'].values() if v.get('sky')})} title={s.get('title')}")
    return "\n".join(out)


def jsonblock(t):
    m = re.search(r"```(?:json)?\s*(\{.*\})\s*```", t, re.S) or re.search(r"(\{.*\})", t, re.S)
    return json.loads(m.group(1))


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
            print(rep)
            return
        msgs += [{"role": "model", "parts": [{"text": json.dumps(spec, ensure_ascii=False)}]},
                 {"role": "user", "parts": [{"text": "The checker says:\n" + rep[-6000:] + "\nFix EVERY ✗ and reply with the full corrected JSON only."}]}]
    sys.exit(f"still failing after 8 rounds — open {out}, fix the ✗ lines by hand, run py tools/auto.py check {eid}")


if __name__ == "__main__":
    main()
