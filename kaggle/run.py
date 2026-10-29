"""Run a GPU job on Kaggle (free: 30 GPU-hours / week) from this PC — the fix for 3-hour CPU voices (29 Oct 2026).
Needs the owner's token at %USERPROFILE%\\.kaggle\\kaggle.json (kaggle.com → Settings → API → Create New Token;
phone-verified account for GPU). The job clones the PUBLIC GitHub repo, runs one command on a T4 GPU, and the outputs are
downloaded into this repo.

  py kaggle/run.py voice test1            → Dia/Chatterbox voice of pipeline/episodes/test1.json on GPU
                                            → pipeline/voice/test1.flac + test1.json (+ pipeline/voice_ref/ anchor)
  py kaggle/run.py cmd "<shell command>"  → any command inside the repo checkout; everything under out/ comes back
"""
import json, os, subprocess, sys, time, shutil, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO, BRANCH = "https://github.com/hamlou/moneyworks", "shorts-playbook-rules"
KG = [sys.executable, "-m", "kaggle"]


def user():
    p = os.path.join(os.path.expanduser("~"), ".kaggle", "kaggle.json")
    if not os.path.exists(p):
        sys.exit("missing %USERPROFILE%\\.kaggle\\kaggle.json — owner: kaggle.com → Settings → API → Create New Token")
    return json.load(open(p))["username"]


def script(cmd):
    return f'''import subprocess, os, shutil
def sh(c):
    print("+", c, flush=True); subprocess.run(c, shell=True, check=True)
sh("git clone --depth 1 -b {BRANCH} {REPO} /kaggle/working/repo")
os.chdir("/kaggle/working/repo")
sh("apt-get -qq update >/dev/null && apt-get -qq install -y ffmpeg >/dev/null || true")
sh("pip -q install chatterbox-tts faster-whisper soundfile git+https://github.com/nari-labs/dia.git")
sh({cmd!r})
os.makedirs("/kaggle/working/result", exist_ok=True)
for d in ["out", "pipeline/voice", "pipeline/voice_ref"]:
    if os.path.isdir(d):
        shutil.copytree(d, "/kaggle/working/result/" + d.replace("/", "_"), dirs_exist_ok=True)
shutil.rmtree("/kaggle/working/repo", ignore_errors=True)
'''


def main():
    kind, arg = sys.argv[1], sys.argv[2]
    cmd = f"python pipeline/tts_cb.py {arg} --shard 0 --of 1 && python pipeline/tts_cb.py {arg} --merge" if kind == "voice" else arg
    u = user()
    slug = f"mw-{kind}-{int(time.time())}"
    d = tempfile.mkdtemp()
    open(os.path.join(d, "run.py"), "w").write(script(cmd))
    json.dump({"id": f"{u}/{slug}", "title": slug, "code_file": "run.py", "language": "python", "kernel_type": "script",
               "is_private": True, "enable_gpu": True, "enable_internet": True, "dataset_sources": [], "competition_sources": [],
               "kernel_sources": []}, open(os.path.join(d, "kernel-metadata.json"), "w"))
    subprocess.run(KG + ["kernels", "push", "-p", d], check=True)
    print("running on Kaggle GPU:", f"https://www.kaggle.com/code/{u}/{slug}", flush=True)
    while True:
        time.sleep(30)
        st = subprocess.run(KG + ["kernels", "status", f"{u}/{slug}"], capture_output=True, text=True).stdout
        print(st.strip(), flush=True)
        if any(k in st for k in ("complete", "error", "cancel")):
            break
    out = os.path.join(ROOT, "kaggle", "out", slug)
    os.makedirs(out, exist_ok=True)
    subprocess.run(KG + ["kernels", "output", f"{u}/{slug}", "-p", out], check=False)
    res = os.path.join(out, "result")
    for src, dst in (("pipeline_voice", "pipeline/voice"), ("pipeline_voice_ref", "pipeline/voice_ref")):
        if os.path.isdir(os.path.join(res, src)):
            shutil.copytree(os.path.join(res, src), os.path.join(ROOT, dst), dirs_exist_ok=True)
    print("outputs in", out)


if __name__ == "__main__":
    main()
