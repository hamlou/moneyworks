"""SUPERVISOR — self-healing for the GitHub render pipeline (AUTOPILOT.md §7). Runs every 20 min from supervisor.yml.
  py tools/supervisor.py --dry      real gh data, prints every decision, changes NOTHING (no dispatch/cancel/issue/commit)
  py tools/supervisor.py --classify <run id>   which rule a failed run's log matches (debug)
  --hours N   look back N hours (default 6)
  py tools/supervisor.py            act (meant for GitHub; publish steps only run on the runner — owner PC is weak)
Does what a human did before: rerun flaky runs, re-dispatch after git conflicts, rebuild a missing composition,
cancel strays/duplicates/stuck-in-queue runs, flag slow runs, resume a parent episode after its child recovered,
publish the 720p <id>_send.mp4 watch copy, and open ONE "autopilot" issue (with a Gemini diagnosis) per unknown failure.
State: pipeline/ops/state.json (actions per run id + attempt) → cron repeats never double-act. Log: pipeline/ops/LOG.md."""
import json, os, re, shutil, statistics, subprocess, sys, time
from datetime import datetime, timezone
from pathlib import Path

R = Path(__file__).resolve().parent.parent
os.chdir(R)
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass
REPO = "hamlou/moneyworks"
BRANCH = "shorts-playbook-rules"
os.environ.setdefault("GH_REPO", REPO)
GH = os.path.expandvars(r"%LOCALAPPDATA%\ghcli\bin\gh.exe") if os.name == "nt" else "gh"
if not os.path.exists(GH):
    GH = shutil.which("gh") or "gh"
CI = os.environ.get("GITHUB_ACTIONS", "").lower() == "true"
DRY = "--dry" in sys.argv or os.environ.get("DRY", "").lower() == "true"
WINDOW_H, QUEUE_MIN, SLOW_X, MAX_RERUN = 6, 90, 2.5, 2
if "--hours" in sys.argv:
    WINDOW_H = float(sys.argv[sys.argv.index("--hours") + 1])
OPS = Path("pipeline/ops")
STATE_F, LOG_F = OPS / "state.json", OPS / "LOG.md"
PIPE = ("episode", "voice", "blender", "v6demo", "daveclips", "publish")  # workflows the supervisor heals
NOW = datetime.now(timezone.utc)
STAMP = NOW.strftime("%Y-%m-%d %H:%M")
DECISIONS = []

# ─────────────────────────── rule table (first match wins; checked on the failed-step log) ───────────────────────────
RULES = [
    ("missing_comp", re.compile(r"Could not find composition with ID (Auto|Map)-([a-z0-9_]+)")),
    ("remotion_timeout", re.compile(r"Timeout \(\d+ ?ms\) exceeded rendering|exceeded rendering the component", re.I)),
    ("git_conflict", re.compile(r"could not apply|non-fast-forward|Pulling is not possible|unresolved conflict|git push failed \d+ times"
                                r"|\[rejected\]|failed to push some refs|CONFLICT \(", re.I)),
    ("network", re.compile(r"HTTP (?:Error )?5\d\d|\b50[234] (?:Bad Gateway|Service Unavailable|Gateway Time-?out)|Server Error|timed out"
                           r"|IncompleteRead|Connection reset|ECONNRESET|ETIMEDOUT|TLS handshake|RemoteDisconnected|Could not resolve host"
                           r"|Temporary failure in name resolution|unable to access 'https://|Failed to download artifact|Unable to download artifact"
                           r"|socket hang up|EAI_AGAIN|curl: \(\d+\)", re.I)),
    ("child_failed", re.compile(r"(voice|blender|v6demo)\.yml run (\d+) FAILED")),
    ("waiter_timeout", re.compile(r"(\w+)\.yml run (\d+) still running after timeout")),
]
NOISE = re.compile(r"git config|submodule foreach|extraheader|Cleaning up orphan|Node\.js 20 is deprecated|Post job cleanup|includeIf\.gitdir")


def log(kind, msg):
    line = f"- {STAMP} {'[dry] ' if DRY else ''}**{kind}** {msg}"
    DECISIONS.append(line)
    print(line, flush=True)


def gh(*a, capture=True, ok=False, tries=3):
    """read-only gh calls retry (GitHub API 502s are common); returns stdout or None"""
    for i in range(tries):
        r = subprocess.run([GH, *[str(x) for x in a]], capture_output=capture, text=True, encoding="utf-8", errors="replace")
        if r.returncode == 0:
            return r.stdout if capture else ""
        if ok:
            return None
        time.sleep(4 * (i + 1))
    print(f"  gh {' '.join(map(str, a))[:120]} failed: {(r.stderr or '')[:200]}", flush=True)
    return None


def act(desc, *a):
    """a side effect: printed in --dry, executed otherwise"""
    if DRY:
        print(f"    would run: gh {' '.join(map(str, a))}", flush=True)
        return True
    r = subprocess.run([GH, *[str(x) for x in a]], capture_output=True, text=True)
    if r.returncode:
        log("error", f"{desc}: {(r.stderr or r.stdout)[:200]}")
    return r.returncode == 0


def ts(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00")) if s and not s.startswith("0001") else None


def mins(a, b=None):
    return ((b or NOW) - a).total_seconds() / 60


# ─────────────────────────── state ───────────────────────────
def load_state():
    try:
        return json.loads(STATE_F.read_text(encoding="utf8"))
    except Exception:
        return {"runs": {}, "issues": {}, "published": {}, "keys": {}}


S = load_state()
for k in ("runs", "issues", "published", "keys"):
    S.setdefault(k, {})


def done(key):
    return key in S["keys"]


def mark(key):
    S["keys"][key] = STAMP


# ─────────────────────────── run data ───────────────────────────
FIELDS = "databaseId,workflowName,displayTitle,status,conclusion,event,createdAt,startedAt,updatedAt,headBranch,headSha,attempt,url"


def runs_recent():
    out = gh("run", "list", "-L", "150", "--json", FIELDS)
    rs = json.loads(out or "[]")
    for r in rs:
        r["c"], r["s"], r["u"] = ts(r["createdAt"]), ts(r.get("startedAt")) or ts(r["createdAt"]), ts(r["updatedAt"])
        r["key"] = run_key(r)
    live = [r for r in rs if r["status"] != "completed"]
    return [r for r in rs if mins(r["c"]) <= WINDOW_H * 60 or r in live]


def run_key(r):
    """(kind, id, extra) parsed from the display title"""
    w, t = r["workflowName"], r["displayTitle"]
    m = re.match(r"episode (\S+) (\S+)", t) if w == "episode" else None
    if m:
        return ("episode", m.group(1), m.group(2))
    m = re.match(r"v6 demo ((Auto|Map)-(\S+)|\S+)", t) if w == "v6demo" else None
    if m:
        return ("v6demo", m.group(3) or m.group(1), m.group(2) or "")
    m = re.match(r"blender (\S+) (\S+)", t) if w == "blender" else None
    if m:
        return ("blender", m.group(1), m.group(2))
    m = re.match(r"voice (\S+)$", t) if w == "voice" else None
    if m:
        return ("voice", m.group(1), "")
    return (w, "", "")


def failed_log(rid):
    out = gh("run", "view", rid, "--log-failed")
    if out is None:
        return None
    lines = [l for l in out.splitlines() if not NOISE.search(l)]
    return "\n".join(re.sub(r"\x1b\[[0-9;]*m|\^\[\[[0-9;]*m", "", l) for l in lines)


def tail(text, n=60):
    out = []
    for l in text.splitlines()[-n:]:
        p = l.split("\t")
        out.append((p[-1] if len(p) >= 3 else l)[:300])
    return "\n".join(out)


def blender_run_shot(r):
    """push-triggered blender runs are titled 'blender taxshot auto' — the real shot is in blender/RUN at that commit"""
    if r["event"] != "push":
        return r["key"][1]
    out = gh("api", f"repos/{REPO}/contents/blender/RUN?ref={r['headSha']}", "-H", "Accept: application/vnd.github.raw", ok=True)
    return (out or "").split()[0] if out and out.split() else ""


def medians():
    m = {}
    for w in ("episode", "voice", "blender", "v6demo", "daveclips"):
        out = gh("run", "list", "--workflow", f"{w}.yml", "--status", "success", "-L", "40", "--json", "displayTitle,startedAt,updatedAt,workflowName")
        groups = {}
        for r in json.loads(out or "[]"):
            k = run_key(r)
            g = (w, k[2] if w == "episode" else k[2] if w in ("v6demo", "blender") else "")
            d = mins(ts(r["startedAt"]), ts(r["updatedAt"]))
            groups.setdefault(g, []).append(d)
        for g, ds in groups.items():
            m[g] = statistics.median(ds[:10]) if len(ds) >= 3 else None
    return m


def parent_of(r, runs):
    """episode run (same id) that was alive when this child was dispatched (auto.py dispatches + waits on it)"""
    if r["workflowName"] not in ("voice", "blender", "v6demo") or r["event"] != "workflow_dispatch":
        return None
    for p in runs:
        if p["workflowName"] == "episode" and p["key"][1] == r["key"][1] and p["c"] <= r["c"] and (p["status"] != "completed" or p["u"] >= r["c"]):
            return p
    return None


STAGES = {"script": 0, "video": 1, "render": 2}


def superseded(r, runs):
    """a newer run already covers this one (same workflow+id, same or later stage, or the parent's later stage)"""
    k = r["key"]
    for o in runs:
        if o is r or o["c"] <= r["c"] or o.get("conclusion") in ("failure", "cancelled", "startup_failure"):
            continue
        ok = o["key"]
        if not k[1] or ok[1] != k[1]:
            continue
        if k[0] == "episode" and ok[0] == "episode" and STAGES.get(ok[2], 0) >= STAGES.get(k[2], 0):
            return o
        if k[0] == ok[0] != "episode" and ok[2] == k[2]:
            return o
        if k[0] == "v6demo" and ok[0] == "episode" and ok[2] == "render":
            return o
    return None


# ─────────────────────────── actions ───────────────────────────
def dispatch(wf, *fields):
    a = ["workflow", "run", wf, "--ref", BRANCH]
    for f in fields:
        a += ["-f", f]
    return act(f"dispatch {wf}", *a)


def rerun_failed(r, why):
    if r["attempt"] > MAX_RERUN:
        return issue(r, f"{why} — still failing after {MAX_RERUN} retries", why)
    log("rerun", f"{wf_id(r)} run {r['databaseId']} attempt {r['attempt']} → `gh run rerun --failed` ({why})")
    return act("rerun", "run", "rerun", r["databaseId"], "--failed")


def wf_id(r):
    return f"{r['workflowName']} {r['key'][1] or r['displayTitle']}".strip()


def redispatch_same(r, why):
    k = r["key"]
    if k[0] == "episode":
        if k[2] == "script":
            return issue(r, f"{why} — script stage needs its topic, re-dispatch by hand", why)
        log("dispatch", f"episode {k[1]} {k[2]} again ({why})")
        return dispatch("episode.yml", f"id={k[1]}", f"stage={k[2]}")
    if k[0] == "v6demo":
        log("dispatch", f"v6demo {k[2]}-{k[1]} again ({why})")
        return dispatch("v6demo.yml", f"comp={(k[2] + '-' if k[2] else '') + k[1]}")
    if k[0] == "blender" and r["event"] == "workflow_dispatch":
        f = [f"shot={k[1]}", f"mode={k[2]}"] + (["samples=12"] if Path(f"pipeline/auto/{k[1]}.json").exists() else [])
        log("dispatch", f"blender {k[1]} {k[2]} again ({why})")
        return dispatch("blender.yml", *f)
    if k[0] == "voice":
        log("dispatch", f"voice {k[1]} again ({why})")
        return dispatch("voice.yml", f"ep={k[1]}")
    return rerun_failed(r, why)


def commit_file(path, text, msg):
    """small repo write (SHOTS_RUN) — goes out with the end-of-run commit"""
    if DRY:
        print(f"    would write {path} = {text.strip()} ({msg})")
        return
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(text, encoding="utf8")
    PENDING_PATHS.append(path)


PENDING_PATHS = []


def existing_issue(title):
    out = gh("issue", "list", "--label", "autopilot", "--state", "open", "-L", "100", "--json", "title,number", ok=True)
    for i in json.loads(out or "[]"):
        if i["title"] == title:
            return i["number"]
    return None


def gemini(stage, text):
    if DRY:
        return "(dry run: Gemini not asked)"
    try:
        sys.path.insert(0, str(R / "tools"))
        import write
        if not write.KEYS:
            return "(no GEMINI_API_KEYS)"
        q = ("You are the on-call engineer for a GitHub Actions video pipeline (Remotion render v6demo.yml, Blender 3D blender.yml, "
             "Chatterbox voice voice.yml, orchestrator episode.yml driven by tools/auto.py). Stage: " + stage + ".\n"
             "Failed-step log tail:\n```\n" + text[-6000:] + "\n```\nReply in markdown with exactly 3 short sections: "
             "**Cause** (1-2 lines), **Fix** (which file/what to change), **Commands** (exact shell commands to verify/retry).")
        write.MODEL = os.environ.get("GEMINI_MODEL", write.MODEL)
        return write.ask([{"role": "user", "parts": [{"text": q}]}], temp=0.2)
    except SystemExit as e:
        return f"(Gemini failed: {e})"
    except Exception as e:
        return f"(Gemini failed: {e})"


def issue(r, cause, why, body_extra=""):
    short = re.sub(r"\s+", " ", cause)[:70]
    title = f"[autopilot] {r['workflowName']} {r['key'][1] or r['databaseId']} failed: {short}" if why != "slow" else \
        f"[autopilot] {r['workflowName']} {r['key'][1] or r['databaseId']} slow: {short}"
    if title in S["issues"] or existing_issue(title):
        print(f"    issue already open: {title}")
        return True
    lt = body_extra or ""
    diag = gemini(f"{r['workflowName']} / {r['displayTitle']}", lt) if why == "unknown" else ""
    k = r["key"]
    redo = {"episode": f"gh workflow run episode.yml --ref {BRANCH} -f id={k[1]} -f stage={k[2]}",
            "v6demo": f"gh workflow run v6demo.yml --ref {BRANCH} -f comp={(k[2] + '-' if k[2] else '') + k[1]}"}.get(k[0], f"gh run rerun {r['databaseId']} --failed")
    body = (f"Run: {r['url']} (attempt {r['attempt']}, {r['event']}, created {r['createdAt']})\n\n**Supervisor:** {cause}\n\n"
            + (f"### Gemini diagnosis\n{diag}\n\n" if diag else "")
            + f"### Commands\n```\ngh run view {r['databaseId']} --log-failed\n{redo}\n```\n"
            + (f"\n### Log tail\n```\n{lt[-5000:]}\n```\n" if lt else "")
            + "\n_Opened by tools/supervisor.py (AUTOPILOT.md §7). Close it when fixed._")
    log("issue", f"{title} ({r['url']})")
    if DRY:
        return True
    if not S.get("label"):
        subprocess.run([GH, "label", "create", "autopilot", "--color", "D93F0B", "--description", "opened by tools/supervisor.py", "--force"], capture_output=True)
        S["label"] = True
    f = OPS / "_issue.md"
    f.write_text(body, encoding="utf8")
    okk = act("issue", "issue", "create", "--title", title, "--label", "autopilot", "--body-file", str(f))
    f.unlink(missing_ok=True)
    if okk:
        S["issues"][title] = STAMP
    return okk


# ─────────────────────────── passes ───────────────────────────
def handle_failure(r, runs):
    rid, att = str(r["databaseId"]), r["attempt"]
    sk = f"fail:{rid}:{att}"
    if done(sk):
        return
    sup = superseded(r, runs)
    if sup:
        print(f"  {wf_id(r)} {rid} failed — superseded by {sup['workflowName']} {sup['databaseId']} ({sup['status']} {sup['conclusion']})")
        return mark(sk)
    text = failed_log(rid)
    if text is None:
        print(f"  {wf_id(r)} {rid}: log not available yet — next pass")
        return
    kind, m = next(((k, rx.search(text)) for k, rx in RULES if rx.search(text)), (None, None))
    k, par = r["key"], parent_of(r, runs)
    if kind == "missing_comp":
        typ, eid = m.group(1), m.group(2)
        if typ == "Auto":
            redo = next((o for o in runs if o["key"][:3] == ("episode", eid, "render") and o["c"] > r["c"]), None)
            if redo:
                print(f"  {rid}: Auto-{eid} missing, episode render {redo['databaseId']} already newer")
            else:
                log("fix", f"{wf_id(r)} {rid}: composition Auto-{eid} missing → episode {eid} render (its ensure step rebuilds + saves the plan)")
                dispatch("episode.yml", f"id={eid}", "stage=render")
                for o in runs:  # the parent episode run of this v6demo fails too — covered by the same fix
                    if o["key"][:2] == ("episode", eid) and o.get("conclusion") == "failure":
                        mark(f"fail:{o['databaseId']}:{o['attempt']}")
        else:
            log("fix", f"{wf_id(r)} {rid}: composition Map-{eid} missing → v6demo Map-{eid} again (its ensure step runs mapshort.py build + commits)")
            dispatch("v6demo.yml", f"comp=Map-{eid}")
    elif kind == "remotion_timeout":
        if att >= 2:
            issue(r, "Remotion frame timeout twice", "timeout", tail(text))
        else:
            rerun_failed(r, "Remotion frame timeout (1st time) — rerun; 2nd time = issue")
    elif kind == "git_conflict":
        if k[0] == "episode" and k[2] == "video" and (sm := re.search(r"SHOTS OK: Blender run (\d+)", text)):
            log("fix", f"episode {k[1]} video {rid}: git conflict after shots were done → SHOTS_RUN={sm.group(1)} + episode render")
            commit_file(f"public/{k[1]}/SHOTS_RUN", sm.group(1), "shots run")
            dispatch("episode.yml", f"id={k[1]}", "stage=render")
        elif k[0] in ("episode", "v6demo") or (k[0] in ("voice", "blender") and r["event"] == "workflow_dispatch" and not par):
            redispatch_same(r, "git push conflict")
        else:
            rerun_failed(r, "git push conflict")
    elif kind == "network":
        rerun_failed(r, f"network: {m.group(0)[:60]}")
    elif kind == "child_failed":
        print(f"  {wf_id(r)} {rid}: failed because child {m.group(1)}.yml run {m.group(2)} failed — healing the child, then resume")
    elif kind == "waiter_timeout":
        print(f"  {wf_id(r)} {rid}: gave up waiting for {m.group(1)} run {m.group(2)} — resume when it ends")
    else:
        issue(r, (first_error(text) or "unknown error"), "unknown", tail(text))
    mark(sk)
    S["runs"].setdefault(rid, []).append(f"{STAMP} attempt {att}: {kind or 'unknown'}")


def first_error(text):
    for l in reversed(tail(text, 80).splitlines()):
        if re.search(r"error|Error|fatal|Traceback|exit code|FAILED", l) and "Process completed with exit code" not in l:
            return re.sub(r"^\S+Z ", "", l).strip()[:70]
    return ""


def resume_parents(runs):
    """child recovered (rerun succeeded) but its parent episode already died → continue the parent's pipeline"""
    for c in runs:
        if c.get("conclusion") != "success" or c["attempt"] < 2:
            continue
        p = parent_of(c, runs)
        if not p or p.get("conclusion") != "failure" or superseded(p, runs):
            continue
        key = f"resume:{p['databaseId']}:{c['databaseId']}"
        if done(key):
            continue
        eid = p["key"][1]
        if c["workflowName"] == "voice":
            log("resume", f"voice {eid} recovered (run {c['databaseId']}) → episode {eid} {p['key'][2]} again")
            dispatch("episode.yml", f"id={eid}", f"stage={p['key'][2]}")
        elif c["workflowName"] == "blender":
            log("resume", f"blender {eid} recovered (run {c['databaseId']}) → SHOTS_RUN + episode {eid} render")
            commit_file(f"public/{eid}/SHOTS_RUN", str(c["databaseId"]), "shots run")
            dispatch("episode.yml", f"id={eid}", "stage=render")
        else:
            print(f"  v6demo {eid} recovered (run {c['databaseId']}) → completion pass publishes it")
        mark(key)
        mark(f"fail:{p['databaseId']}:{p['attempt']}")


def handle_live(r, runs, med):
    rid, st = str(r["databaseId"]), r["status"]
    k = r["key"]
    if st in ("queued", "pending", "waiting", "requested"):
        if mins(r["c"]) < QUEUE_MIN:
            return
        if any(o is not r and o["workflowName"] == r["workflowName"] and o["key"][1] == k[1] and o["status"] == "in_progress" for o in runs):
            return  # waiting on its concurrency group, not stuck
        key = f"queued:{rid}"
        if done(key):
            return
        log("stuck", f"{wf_id(r)} {rid} queued {mins(r['c']):.0f} min (> {QUEUE_MIN}) → cancel + re-dispatch once")
        act("cancel", "run", "cancel", rid)
        p = parent_of(r, runs)
        if p and p["status"] != "completed":
            act("cancel parent", "run", "cancel", p["databaseId"])
            redispatch_same(p, "child stuck in queue")
            mark(f"queued:{p['databaseId']}")
        elif r["event"] == "workflow_dispatch":
            redispatch_same(r, "stuck in queue")
        else:
            rerun_failed(r, "stuck in queue")
        return mark(key)
    if st == "in_progress":
        g = (r["workflowName"], k[2] if r["workflowName"] in ("episode", "v6demo", "blender") else "")
        m = med.get(g)
        el = mins(r["s"])
        if m and el > SLOW_X * m and el > 20 and not done(f"slow:{rid}"):
            issue(r, f"running {el:.0f} min vs median {m:.0f} min ({SLOW_X}× limit) — not killed", "slow",
                  f"elapsed {el:.0f} min, median of last successful {g} runs {m:.0f} min")
            mark(f"slow:{rid}")


def strays(runs):
    live = [r for r in runs if r["status"] != "completed"]
    # 1) push-triggered blender runs for an autopilot shot nobody is waiting for
    for r in live:
        if r["workflowName"] != "blender" or r["event"] != "push" or done(f"stray:{r['databaseId']}"):
            continue
        shot = blender_run_shot(r)
        if not shot or not Path(f"pipeline/auto/{shot}.json").exists():
            continue  # manual shot (taxshot/test1…) = human work, leave it
        pending = any(o["key"][:2] in (("episode", shot), ("blender", shot)) and o is not r and o["status"] != "completed" for o in runs)
        if not pending:
            log("stray", f"blender push run {r['databaseId']} renders blender/RUN shot '{shot}' — no pending episode/dispatch for it → cancel")
            act("cancel stray", "run", "cancel", r["databaseId"])
            mark(f"stray:{r['databaseId']}")
    # 2) duplicate live runs of the same workflow+id: keep the one a parent waits on, else the newest
    groups = {}
    for r in live:
        if r["key"][1] and r["workflowName"] in ("episode", "v6demo", "blender", "voice") and r["event"] == "workflow_dispatch":
            groups.setdefault((r["workflowName"], r["key"]), []).append(r)
    for g, rs in groups.items():
        if len(rs) < 2 or g[0] == "episode":  # episode: concurrency group already serialises same-id runs
            continue
        rs.sort(key=lambda x: x["c"])
        keep = next((x for x in rs if parent_of(x, runs) and parent_of(x, runs)["status"] != "completed"), rs[-1])
        for x in rs:
            if x is not keep and not done(f"dup:{x['databaseId']}"):
                log("duplicate", f"{wf_id(x)} run {x['databaseId']} duplicates {keep['databaseId']} → cancel older/unwatched one")
                act("cancel dup", "run", "cancel", x["databaseId"])
                mark(f"dup:{x['databaseId']}")


def release_assets():
    out = gh("release", "view", "ref", "--json", "assets")
    return {a["name"]: ts(a["updatedAt"]) for a in json.loads(out or '{"assets":[]}')["assets"]}


def completion(runs):
    assets = release_assets()
    seen = set()
    for r in sorted((x for x in runs if x["workflowName"] == "v6demo" and x.get("conclusion") == "success"), key=lambda x: x["c"], reverse=True):
        typ, eid = r["key"][2], r["key"][1]
        if typ not in ("Auto", "Map") or eid in seen:
            continue
        seen.add(eid)  # newest successful render per id only
        sent = assets.get(f"{eid}_send.mp4")
        if sent and sent >= r["c"]:
            continue
        if typ == "Auto" and any(o["key"][:3] == ("episode", eid, "render") and o["status"] != "completed" for o in runs):
            continue  # the episode render job publishes it itself
        key = f"pub:{r['databaseId']}"
        if done(key) or S["published"].get(eid) == str(r["databaseId"]):
            continue
        log("publish", f"{typ}-{eid} run {r['databaseId']} succeeded, release ref has no newer {eid}_send.mp4 → 720p send copy"
            + (" + shortgate" if typ == "Map" else ""))
        if DRY:
            continue
        if not CI:
            print("    skip: publishing downloads the render — only on GitHub (owner PC is weak)")
            continue
        if publish(r, typ, eid):
            S["published"][eid] = str(r["databaseId"])
            mark(key)


def sh(*a):
    print("$", " ".join(map(str, a))[:160], flush=True)
    return subprocess.run([str(x) for x in a]).returncode == 0


def publish(r, typ, eid):
    comp = f"{typ}-{eid}"
    d = Path(f"/tmp/pub_{eid}")
    shutil.rmtree(d, ignore_errors=True)
    if not sh(GH, "run", "download", r["databaseId"], "-n", comp, "-D", d) and not sh(GH, "run", "download", r["databaseId"], "-n", comp, "-D", d):
        log("error", f"publish {comp}: artifact download failed twice — next pass retries")
        return False
    if not shutil.which("ffmpeg"):
        sh("sudo", "apt-get", "update", "-qq")
        sh("sudo", "apt-get", "install", "-y", "-qq", "ffmpeg")
    src, full, send = d / f"{comp}.mp4", d / f"{eid}.mp4", d / f"{eid}_send.mp4"
    shutil.copy(src, full)
    if not sh("ffmpeg", "-v", "error", "-y", "-i", src, "-vf", "scale='if(gt(iw,ih),1280,720)':-2", "-c:v", "libx264", "-crf", "27", "-preset", "slow",
              "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", send):
        log("error", f"publish {comp}: ffmpeg failed")
        return False
    files = [full, send]
    for q in ("compare.md", "qa_hook.jpg", "qa_sheet.jpg"):
        if (d / q).exists():
            shutil.copy(d / q, d / f"{eid}-{q}")
            files.append(d / f"{eid}-{q}")
    wh = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", src],
                        capture_output=True, text=True).stdout.strip().split(",")
    if typ == "Map" or (len(wh) == 2 and int(wh[1]) > int(wh[0])):
        g = d / f"{eid}-gate.md"
        ok = subprocess.run([sys.executable, "tools/shortgate.py", str(src), str(g)]).returncode == 0
        if g.exists():
            files.append(g)
        log("gate", f"{eid} shortgate {'PASS' if ok else 'FAIL — see ' + eid + '-gate.md on release ref'}")
    for i in range(3):
        if sh(GH, "release", "upload", "ref", *files, "--clobber"):
            log("published", f"{eid}_send.mp4 + {len(files) - 1} files on release ref (from run {r['databaseId']})")
            return True
        time.sleep(15)
    log("error", f"publish {comp}: release upload failed 3× — next pass retries")
    return False


# ─────────────────────────── save ───────────────────────────
def save():
    if DRY:
        return
    OPS.mkdir(parents=True, exist_ok=True)
    old = LOG_F.read_text(encoding="utf8").splitlines() if LOG_F.exists() else ["# Supervisor log (tools/supervisor.py, newest last — AUTOPILOT.md §7)", ""]
    head, body = old[:2], old[2:]
    body += DECISIONS
    LOG_F.write_text("\n".join(head + body[-300:]) + "\n", encoding="utf8")
    keep = sorted(S["keys"].items(), key=lambda kv: kv[1])[-800:]  # bounded state
    S["keys"] = dict(keep)
    S["runs"] = dict(list(S["runs"].items())[-300:])
    S["last"] = STAMP
    STATE_F.write_text(json.dumps(S, indent=1, sort_keys=True), encoding="utf8")
    if not CI:
        return
    sh("git", "config", "user.name", "github-actions[bot]")
    sh("git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com")
    sh("git", "add", str(LOG_F), str(STATE_F), *PENDING_PATHS)
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode == 0:
        return
    sh("git", "commit", "-q", "-m", f"supervisor: {len(DECISIONS)} decision(s) {STAMP} [skip ci]")
    for _ in range(5):
        if sh("git", "pull", "--rebase", "--autostash", "-q") and sh("git", "push", "-q"):
            return
        subprocess.run(["git", "rebase", "--abort"], capture_output=True)
        time.sleep(8)
    print("supervisor: push of LOG/state failed 5× (next pass re-decides; state keys stop double actions only once saved)")


def summary(runs):
    live = [r for r in runs if r["status"] != "completed"]
    lines = [f"## Supervisor {STAMP} UTC {'(DRY — nothing changed)' if DRY else ''}", "",
             f"{len(runs)} runs in the last {WINDOW_H} h · {len(live)} live · {sum(r.get('conclusion') == 'failure' for r in runs)} failed", ""]
    lines += ["### Decisions"] + (DECISIONS or ["- nothing to do"]) + ["", "### Live runs"]
    lines += [f"- {r['workflowName']} `{r['displayTitle']}` {r['status']} {mins(r['s']):.0f} min ({r['url']})" for r in live] or ["- none"]
    txt = "\n".join(lines) + "\n"
    print("\n" + txt)
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf8") as f:
            f.write(txt)


def main():
    runs = [r for r in runs_recent() if r["headBranch"] in (BRANCH, "main")]
    pipe = [r for r in runs if r["workflowName"] in PIPE]
    print(f"supervisor {'DRY ' if DRY else ''}{STAMP} UTC — {len(pipe)} pipeline runs in {WINDOW_H} h")
    med = medians()
    print("medians (min): " + ", ".join(f"{a}/{b or '-'} {v:.0f}" for (a, b), v in sorted(med.items()) if v))
    strays(pipe)
    for r in sorted(pipe, key=lambda x: x["c"]):
        if r["status"] == "completed" and r["conclusion"] in ("failure", "startup_failure", "timed_out"):
            handle_failure(r, pipe)
        elif r["status"] != "completed":
            handle_live(r, pipe, med)
    resume_parents(pipe)
    completion(pipe)
    save()
    summary(pipe)


def classify(rid):
    text = failed_log(rid) or ""
    kind, m = next(((k, rx.search(text)) for k, rx in RULES if rx.search(text)), (None, None))
    print(f"run {rid}: rule={kind or 'unknown → Gemini + issue'} match={m.group(0)[:100] if m else first_error(text)!r}")


if __name__ == "__main__":
    if "--classify" in sys.argv:
        for x in sys.argv[sys.argv.index("--classify") + 1:]:
            classify(x)
    else:
        main()
