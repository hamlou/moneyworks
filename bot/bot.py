import io
import json
import os
import shutil
import subprocess
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
import uuid
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
CFG = json.loads((HERE / "config.json").read_text())
TG = f"https://api.telegram.org/bot{CFG['telegram_token']}"
GH = "https://api.github.com"
REPO = CFG.get("repo", "hamlou/moneyworks")
STATE_F = HERE / "state.json"
WORK = HERE / "work"
WORK.mkdir(exist_ok=True)
state = json.loads(STATE_F.read_text()) if STATE_F.exists() else {"owner": None, "jobs": {}, "offset": 0}


def save():
    STATE_F.write_text(json.dumps(state, indent=1))


def http(url, data=None, headers=None, method=None, timeout=60, auth=False):
    req = urllib.request.Request(url, data=data, method=method)
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    if auth:
        req.add_unredirected_header("Authorization", f"Bearer {CFG['github_token']}")
        req.add_header("Accept", "application/vnd.github+json")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def gh(path, body=None, method=None):
    data = json.dumps(body).encode() if body is not None else None
    raw = http(GH + path, data, {"Content-Type": "application/json"} if data else {}, method, auth=True)
    return json.loads(raw) if raw else {}


def tg(method, **params):
    data = urllib.parse.urlencode({k: (json.dumps(v) if isinstance(v, (dict, list)) else v) for k, v in params.items()}).encode()
    return json.loads(http(f"{TG}/{method}", data, timeout=70))


def tg_file(method, chat_id, field, path, caption=None, extra=None):
    boundary = uuid.uuid4().hex
    buf = io.BytesIO()

    def part(name, value, filename=None, ctype="text/plain"):
        buf.write(f"--{boundary}\r\n".encode())
        disp = f'form-data; name="{name}"' + (f'; filename="{filename}"' if filename else "")
        buf.write(f"Content-Disposition: {disp}\r\nContent-Type: {ctype}\r\n\r\n".encode())
        buf.write(value if isinstance(value, bytes) else str(value).encode())
        buf.write(b"\r\n")

    part("chat_id", chat_id)
    if caption:
        part("caption", caption[:1000])
    for k, v in (extra or {}).items():
        part(k, v)
    part(field, Path(path).read_bytes(), Path(path).name, "application/octet-stream")
    buf.write(f"--{boundary}--\r\n".encode())
    return http(f"{TG}/{method}", buf.getvalue(), {"Content-Type": f"multipart/form-data; boundary={boundary}"}, timeout=600)


def say(text, **kw):
    for i in range(0, len(text), 3900):
        tg("sendMessage", chat_id=state["owner"], text=text[i:i + 3900], **kw)


def dispatch(workflow, inputs):
    gh(f"/repos/{REPO}/actions/workflows/{workflow}/dispatches", {"ref": "main", "inputs": inputs}, "POST")


def find_run(workflow, title):
    runs = gh(f"/repos/{REPO}/actions/workflows/{workflow}/runs?per_page=30").get("workflow_runs", [])
    for r in runs:
        if r.get("display_title") == title:
            return r
    return None


def artifact_zip(run_id, name, dest):
    arts = gh(f"/repos/{REPO}/actions/runs/{run_id}/artifacts").get("artifacts", [])
    art = next((a for a in arts if a["name"] == name), None)
    if not art:
        return None
    raw = http(f"{GH}/repos/{REPO}/actions/artifacts/{art['id']}/zip", auth=True, timeout=900)
    dest.mkdir(parents=True, exist_ok=True)
    zipfile.ZipFile(io.BytesIO(raw)).extractall(dest)
    return dest


HELP = (
    "Moneyworks studio\n\n"
    "/new <video concept> - plan a new episode (titles + outline)\n"
    "/status - show running jobs\n\n"
    "Example: /new How insurance companies make money"
)


def on_message(msg):
    chat = msg["chat"]["id"]
    text = (msg.get("text") or "").strip()
    if state["owner"] is None and text.startswith("/start") and CFG.get("setup_code", "") in text:
        state["owner"] = chat
        save()
        say("You are now the owner of this bot.\n\n" + HELP)
        return
    if chat != state["owner"]:
        return
    if text.startswith("/new"):
        topic = text[4:].strip()
        if len(topic) < 5:
            say("Send: /new <your video concept>")
            return
        req = uuid.uuid4().hex[:8]
        state["jobs"][req] = {"stage": "plan", "topic": topic, "t": time.time()}
        save()
        dispatch("plan.yml", {"topic": topic, "req": req})
        say(f"Researching and planning \"{topic}\"...\nI'll send 3 titles + the outline in ~5-10 minutes.")
    elif text.startswith("/use"):
        parts = text.split(maxsplit=2)
        if len(parts) < 3 or parts[1] not in state["jobs"]:
            say("Usage: /use <job id> <your own title>")
            return
        start_produce(parts[1], parts[2])
    elif text.startswith("/status"):
        active = {k: v for k, v in state["jobs"].items() if v["stage"] not in ("done", "failed")}
        say("\n".join(f"{k}: {v['stage']} - {v['topic']}" for k, v in active.items()) or "No running jobs.")
    else:
        say(HELP)


def on_callback(cb):
    if cb["message"]["chat"]["id"] != state["owner"]:
        return
    tg("answerCallbackQuery", callback_query_id=cb["id"])
    kind, req, idx = cb["data"].split(":")
    job = state["jobs"].get(req)
    if kind == "t" and job and job["stage"] == "choose":
        start_produce(req, job["plan"]["titles"][int(idx)])


def start_produce(req, title):
    job = state["jobs"][req]
    job.update(stage="produce", title=title, t=time.time())
    save()
    dispatch("produce.yml", {"topic": job["topic"], "title": title, "plan": json.dumps(job.get("plan", {}))[:60000], "req": req})
    say(f"Approved: \"{title}\"\n\nClaude is now researching, writing, animating and checking the episode. This usually takes 1-2 hours. I'll send you the video when it's ready.")


def tick(req, job):
    stage = job["stage"]
    if stage == "plan":
        run = find_run("plan.yml", f"plan {req}")
        if not run or run["status"] != "completed":
            return
        if run["conclusion"] != "success":
            job["stage"] = "failed"
            say(f"Planning failed: {run['html_url']}")
            return
        d = artifact_zip(run["id"], f"plan-{req}", WORK / req)
        plan = json.loads((d / "plan.json").read_text())
        job.update(stage="choose", plan=plan)
        lines = [f"Plan for \"{job['topic']}\"\n", "HOOK:\n" + plan.get("hook", ""), "\nCHAPTERS:"]
        lines += [f"{i + 1}. {c['title']} - {c.get('idea', '')}" for i, c in enumerate(plan.get("chapters", []))]
        lines += ["\nKEY FACTS:"] + [f"- {k}" for k in plan.get("key_facts", [])]
        say("\n".join(lines))
        kb = {"inline_keyboard": [[{"text": t[:60], "callback_data": f"t:{req}:{i}"}] for i, t in enumerate(plan["titles"])]}
        say(f"Pick a title to start production (or /use {req} <your own title>):", reply_markup=kb)
    elif stage == "produce":
        run = find_run("produce.yml", f"produce {req}")
        if not run or run["status"] != "completed":
            return
        if run["conclusion"] != "success":
            job["stage"] = "failed"
            say(f"Production failed: {run['html_url']}")
            return
        d = artifact_zip(run["id"], f"produce-{req}", WORK / req / "p")
        job.update(stage="render", ep=(d / "produced.txt").read_text().strip(), t=time.time())
        say(f"Episode {job['ep']} is written and checked. Rendering now (~10 min)...")
    elif stage == "render":
        run = find_run("render.yml", f"render {job['ep']}")
        if not run or run["status"] != "completed" or time.mktime(time.strptime(run["created_at"], "%Y-%m-%dT%H:%M:%SZ")) < job["t"] - 7200:
            return
        if run["conclusion"] != "success":
            job["stage"] = "failed"
            say(f"Render failed: {run['html_url']}")
            return
        deliver(req, job, run)


def deliver(req, job, run):
    ep = job["ep"]
    d = artifact_zip(run["id"], f"{ep}-final", WORK / req / "final")
    mp4 = d / f"{ep}.mp4"
    prev = d / f"{ep}_preview.mp4"
    for crf in (30, 34, 38):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(mp4), "-vf", "scale=854:-2", "-c:v", "libx264", "-preset", "veryfast", "-crf", str(crf), "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(prev)], check=True)
        if prev.stat().st_size < 48 * 1024 * 1024:
            break
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mp4)], capture_output=True, text=True).stdout or 0)
    tg_file("sendVideo", state["owner"], "video", prev, f"{ep} preview ({dur / 60:.1f} min) - {job['title']}", {"supports_streaming": "true"})
    for v in "ABC":
        p = d / f"thumb_{v}.png"
        if p.exists():
            tg_file("sendPhoto", state["owner"], "photo", p, f"Thumbnail {v}")
    txt = d / f"{ep}_youtube.txt"
    if txt.exists():
        say(txt.read_text(encoding="utf-8"))
    say(f"Full 1080p video + files (download on GitHub, kept 5 days):\n{run['html_url']}")
    job["stage"] = "done"
    shutil.rmtree(WORK / req, ignore_errors=True)


def main():
    last_tick = 0
    while True:
        try:
            ups = tg("getUpdates", offset=state["offset"], timeout=50).get("result", [])
            for u in ups:
                state["offset"] = u["update_id"] + 1
                if "message" in u:
                    on_message(u["message"])
                elif "callback_query" in u:
                    on_callback(u["callback_query"])
            save()
            if time.time() - last_tick > 30:
                last_tick = time.time()
                for req, job in list(state["jobs"].items()):
                    if job["stage"] in ("plan", "produce", "render"):
                        try:
                            tick(req, job)
                        except Exception:
                            traceback.print_exc()
                save()
        except Exception:
            traceback.print_exc()
            time.sleep(5)


if __name__ == "__main__":
    main()
