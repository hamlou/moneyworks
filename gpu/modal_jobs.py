"""Free cloud GPU via Modal (owner 29 Oct 2026: Kaggle refused the phone verification). Starter plan = $30 of compute
FREE every month, no card (≈ 40–50 T4 GPU-hours). One-time login: `py -m modal setup` (opens the browser, owner signs in
with GitHub/Google; token stored in %USERPROFILE%\\.modal.toml — never in the repo or chat).

  py -m modal run gpu/modal_jobs.py::voice --ep test1
      → voices pipeline/episodes/test1.json on a T4 with its "cb.engine" (dia / turbo / chatterbox)
      → writes pipeline/voice/test1.flac + test1.json (+ pipeline/voice_ref/dia_dave.* the first time) — commit them
  py -m modal run gpu/modal_jobs.py::cmd --run "nvidia-smi"        any command in a fresh repo checkout (GPU)

The repo is public, so the container clones it with no credentials: push your changes BEFORE running a job.
"""
import io, os, tarfile
import modal

REPO, BRANCH = "https://github.com/hamlou/moneyworks", "shorts-playbook-rules"
image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("git", "ffmpeg", "espeak-ng")
    .pip_install("torch", "torchaudio", "numpy", "soundfile", "faster-whisper", "chatterbox-tts")
    .pip_install("git+https://github.com/nari-labs/dia.git")
)
app = modal.App("moneyworks-gpu", image=image)


def _checkout():
    import subprocess
    subprocess.run(["git", "clone", "--depth", "1", "-b", BRANCH, REPO, "/repo"], check=True)
    os.chdir("/repo")


def _tar(paths):
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as t:
        for p in paths:
            if os.path.exists(p):
                t.add(p)
    return buf.getvalue()


@app.function(gpu="T4", timeout=3600)
def _voice(ep: str) -> bytes:
    import subprocess
    _checkout()
    subprocess.run(["python", "pipeline/tts_cb.py", ep, "--shard", "0", "--of", "1"], check=True)
    subprocess.run(["python", "pipeline/tts_cb.py", ep, "--merge"], check=True)
    return _tar([f"pipeline/voice/{ep}.flac", f"pipeline/voice/{ep}.json", "pipeline/voice_ref"])


@app.function(gpu="T4", timeout=3600)
def _cmd(run: str) -> bytes:
    import subprocess
    _checkout()
    subprocess.run(run, shell=True, check=True)
    return _tar(["out"])


def _unpack(data, dest):
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as t:
        t.extractall(dest)


@app.local_entrypoint()
def voice(ep: str):
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    _unpack(_voice.remote(ep), root)
    print("voice written to pipeline/voice/", ep)


@app.local_entrypoint()
def cmd(run: str):
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    _unpack(_cmd.remote(run), os.path.join(root, "gpu", "out"))
    print("outputs in gpu/out/")
