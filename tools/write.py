"""Free writer: Gemini API (free tier) researches a topic and writes pipeline/auto/<id>.json, then loops on
`tools/auto.py check` until SPEC OK. No Claude, runs on the owner's PC or on GitHub Actions.
  keys: one per line in %USERPROFILE%.moneyworks_gemini (backups rotate automatically) or set GEMINI_API_KEYS=k1,k2
  py tools/write.py <id> "<topic idea>" [--no-critic] → SPEC OK + fact check + critic loop (then: py tools/auto.py all <id>)
Model: GEMINI_MODEL (default gemini-2.5-flash). Research uses Gemini's built-in Google Search grounding."""
import json, os, re, subprocess, sys, time, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# keys: GEMINI_API_KEYS (comma list) or GEMINI_API_KEY, else ~/.moneyworks_gemini (one key per line, NEVER in the repo: it is public)
_kf = Path.home() / ".moneyworks_gemini"
KEYS = [k.strip() for k in re.split(r"[,\s]+", os.environ.get("GEMINI_API_KEYS") or os.environ.get("GEMINI_API_KEY") or (_kf.read_text() if _kf.exists() else "")) if k.strip()]
KEY = KEYS[0] if KEYS else ""
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
        for m, key in [(m, k) for m in models for k in KEYS]:  # every model × every backup key
            try:
                req = urllib.request.Request(API.format(m), json.dumps(body).encode(), {"Content-Type": "application/json", "x-goog-api-key": key})
                r = json.loads(urllib.request.urlopen(req, timeout=400).read())
                return "".join(p.get("text", "") for p in r["candidates"][0]["content"]["parts"])
            except Exception as e:
                print(f"  {m} key{KEYS.index(key) + 1}: {str(e)[:70]}", flush=True)
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



CRIT = ("hook", "curiosity", "specificity", "story", "humour", "voice", "payoff", "visuals")


def script(spec):
    """id-tagged script + what each line shows, for the critic"""
    out = []
    for ci, c in enumerate([{"title": "HOOK", **spec["hook"]}] + spec["chapters"]):
        out.append(f"## {c['title']}")
        for i, l in enumerate(c["lines"]):
            vis = ", ".join(str(s.get("shot") or s.get("text") or s.get("pose") or s.get("word") or s.get("v")) for s in l.get("show", []))
            out.append(f"{'k%d' % (i + 1) if ci == 0 else 'c%d_%02d' % (ci, i + 1)}: {l['say']}  [shows: {vis}]")
    shots = NL.join(f"{k}: {json.dumps(v)}" for k, v in spec.get("shots", {}).items())
    return f"TITLE: {spec['title']}{NL}{NL.join(out)}{NL}{NL}3D shots:{NL}{shots}"


def critic(spec, facts):
    """harsh retention editor grades the script 1-10 per axis; total = average"""
    q = ("You are a harsh YouTube retention editor for a money explainer channel. Host = Dave (3D cartoon) who talks to 'you'. "
         "Spoken lines have NO commas and NO digits (numbers as words). Grade like a top 1% human writer would be graded. Be strict: 8 = genuinely great." + NL
         + "GOOD line: 'You pay for the gym in January and by March your card is still going but your sneakers are not.'" + NL
         + "BAD line: 'Gym. January. Fifty dollars. Gone.' (fragment chain) or 'Studies show sixty seven percent of members never attend which costs billions.' (stat dump with no image and no you)" + NL
         + "GOOD hook: 'Your gym makes more money from you when you stay home.' BAD hook: 'Today we talk about gym memberships.'" + NL + NL
         + "Score each 1-10 with a one-line reason: hook (stops the scroll in 3 s? concrete prize or number in line 1? question by line 3?), "
           "curiosity (every chapter ends on an open question, loops pull forward), specificity (vivid concrete images vs abstract words), "
           "story (a person or Dave with stakes conflict and a comeback), humour (a running joke that pays off at the end), "
           "voice (natural spoken English to 'you' with no stat dumps and no fragment chains), payoff (the end delivers what the hook promised), "
           "visuals (each 3D scene and card shows what the line SAYS)." + NL
         + "List the 3-8 worst lines with a rewrite that follows the rules (no commas no digits)." + NL
         + 'Reply only JSON: {"scores":{"hook":{"score":7,"why":"..."},...},"worst_lines":[{"id":"c2_03","why":"...","rewrite":"..."}]}' + NL + NL
         + "Research facts:" + NL + facts[:3000] + NL + NL + script(spec))
    for _ in range(3):
        try:
            card = jsonblock(ask([{"role": "user", "parts": [{"text": q}]}], temp=0.2))
            card["scores"] = {k: v if isinstance(v, dict) else {"score": v, "why": ""} for k, v in ((k, card["scores"][k]) for k in CRIT)}
            card["total"] = round(sum(float(v["score"]) for v in card["scores"].values()) / len(CRIT), 2)
            return card
        except Exception as e:
            print(f"  critic reply unreadable ({str(e)[:60]}), retry", flush=True)
    return None


def settle(eid, msgs, rounds):
    """ask → JSON → auto.py check → fact check, feeding errors back; returns (spec, report) or (None, last report)"""
    out = ROOT / "pipeline/auto" / f"{eid}.json"
    rep = ""
    for rnd in range(rounds):
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
                return spec, rep
            rep = "FACT CHECK FAILED (Google Search could not confirm these: replace with confirmed numbers or cut the claim):" + NL + bad
        msgs += [{"role": "model", "parts": [{"text": json.dumps(spec, ensure_ascii=False)}]},
                 {"role": "user", "parts": [{"text": "The checker says:\n" + rep[-6000:] + "\nFix EVERY ✗ and reply with the full corrected JSON only."}]}]
    return None, rep


def polish(eid, spec, msgs, facts):
    """critic loop: grade → rewrite only the weak parts → re-check + fact check; max 3 rewrites, keep the best passing version"""
    log, best = [], None
    for rnd in range(4):
        card = critic(spec, facts)
        if not card:
            break
        sc = {k: float(v["score"]) for k, v in card["scores"].items()}
        weak = [k for k, v in sc.items() if v < 8]
        print(f"critic {rnd}: total {card['total']} | " + " ".join(f"{k}={v:g}" for k, v in sc.items()) + (f" | weak: {','.join(weak)}" if weak else " | all ≥ 8"), flush=True)
        log.append({"round": rnd, **card})
        if not best or card["total"] > best[0]:
            best = (card["total"], spec)
        if not weak or rnd == 3:
            break
        msgs += [{"role": "model", "parts": [{"text": json.dumps(spec, ensure_ascii=False)}]},
                 {"role": "user", "parts": [{"text": "A retention editor graded this script (ids: k1.. = hook lines, c1_01 = chapter 1 line 1). Weak scores:" + NL
                  + json.dumps({k: card["scores"][k] for k in weak}, ensure_ascii=False) + NL + "Worst lines:" + NL + json.dumps(card.get("worst_lines", []), ensure_ascii=False) + NL
                  + f"Rewrite ONLY the weak parts ({', '.join(weak)}) to reach 9+: keep the structure, ids, loops, sources and every confirmed fact and number. "
                    "Follow every guide rule (no commas and no digits in say). Reply with the full corrected JSON only."}]}]
        new, _ = settle(eid, msgs, 4)
        if not new:
            print("  rewrite did not pass check + fact check: keeping best version", flush=True)
            break
        spec = new
    p = ROOT / "videos" / eid
    p.mkdir(parents=True, exist_ok=True)
    (p / "critic.json").write_text(json.dumps(log, ensure_ascii=False, indent=1), encoding="utf8")
    if best:
        spec = best[1]
        print(f"critic best: {best[0]} (scorecards: {p / 'critic.json'})")
    (ROOT / "pipeline/auto" / f"{eid}.json").write_text(json.dumps(spec, ensure_ascii=False, indent=1), encoding="utf8")
    return spec


def main():
    if not KEY:
        sys.exit("set GEMINI_API_KEY first (free: https://aistudio.google.com/apikey)")
    args = [a for a in sys.argv[1:] if a != "--no-critic"]
    eid, topic = args[0], " ".join(args[1:])
    guide = (ROOT / "AUTOPILOT.md").read_text(encoding="utf8")
    assets = (ROOT / "pipeline/PROPS.md").read_text(encoding="utf8") + (ROOT / "pipeline/ASSETS.md").read_text(encoding="utf8")
    example = (ROOT / "pipeline/auto/au1.json").read_text(encoding="utf8")
    # 1) research with live Google Search: true numbers + real source URLs
    facts = ask([{"role": "user", "parts": [{"text":
        f"Research this money video idea for a YouTube explainer: {topic}\n"
        "Find 4-6 surprising TRUE facts with numbers, each from an official or academic source (government, central bank, university, big newspaper). "
        "For each: the fact, the exact number, source name, year, and the source URL. Also give 3 title ideas that a 12-year-old understands "
        "(a question or a withheld result). Plain text."}]}], search=True, temp=0.4)
    print(facts[:1500])
    # 2) write the spec → check + fact check loop
    sys_prompt = (f"You write ONE JSON file for an automatic video system. Follow this guide exactly:\n\n{guide}\n\n"
                  f"Allowed 3D asset ids:\n{assets}\n\nA complete valid example (different topic, different look — do NOT copy its look, skies or jokes):\n{example}\n\n"
                  f"Last episodes (never repeat their look.style, look.format, or skies):\n{past_looks()}")
    msgs = [{"role": "user", "parts": [{"text": sys_prompt + f"\n\nResearch notes:\n{facts}\n\nWrite the full JSON for id '{eid}'. "
             "Be creative: pick a fresh format and style that fit THIS topic, a hook that makes people stay, a running joke, real objects and places for every scene. "
             "Reply with only the JSON in a ```json block."}]}]
    spec, rep = settle(eid, msgs, 8)
    if not spec:
        sys.exit(f"still failing after 8 rounds — open pipeline/auto/{eid}.json, fix the ✗ lines by hand, run py tools/auto.py check {eid}")
    print(rep)
    # 3) critic loop (skip with --no-critic)
    if "--no-critic" not in sys.argv:
        spec = polish(eid, spec, msgs, facts)
    preview(eid, spec)


if __name__ == "__main__":
    main()
