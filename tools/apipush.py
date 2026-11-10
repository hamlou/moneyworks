"""Commit local files to hamlou/moneyworks through the GitHub API (git push fails on this PC's network, 10 Nov 2026).
py tools/apipush.py "message" file1 file2 ...   (adds/updates those paths on shorts-playbook-rules; a push event fires)
Afterwards local git is behind/diverged: when the network works, `git fetch && git reset --soft origin/shorts-playbook-rules`."""
import subprocess, json, base64, os, sys, tempfile

GH = os.path.expandvars(r"%LOCALAPPDATA%\ghcli\bin\gh.exe")
REPO, BR = "repos/hamlou/moneyworks", "shorts-playbook-rules"
TAIL = "\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01UUrqY7YU7SdEuKbDQzJgTs"


def api(path, data=None, method=None):
    cmd = [GH, "api", f"{REPO}/{path}"] + (["-X", method] if method else [])
    if data is not None:
        f = tempfile.NamedTemporaryFile("w", delete=False, suffix=".json")
        json.dump(data, f)
        f.close()
        cmd += ["--input", f.name]
    for _ in range(4):
        r = subprocess.run(cmd, capture_output=True, text=True)
        if not r.returncode:
            return json.loads(r.stdout)
        print("retry", path, r.stderr.strip()[:120])
    raise SystemExit(r.stdout + r.stderr)


msg, files = sys.argv[1], sys.argv[2:]
head = api(f"git/ref/heads/{BR}")["object"]["sha"]
tree = []
for p in files:
    raw = open(p, "rb").read()
    b = api("git/blobs", {"content": base64.b64encode(raw).decode(), "encoding": "base64"})
    tree.append({"path": p.replace("\\", "/"), "mode": "100644", "type": "blob", "sha": b["sha"]})
    print("blob", p, len(raw))
t = api("git/trees", {"base_tree": api(f"git/commits/{head}")["tree"]["sha"], "tree": tree})
c = api("git/commits", {"message": msg + TAIL, "tree": t["sha"], "parents": [head]})
api(f"git/refs/heads/{BR}", {"sha": c["sha"]}, "PATCH")
print("remote head", c["sha"][:7])
