"""Dia 1.6B on the official Hugging Face Space (nari-labs/Dia-1.6B, free ZeroGPU) instead of CPU (29 Oct 2026: the CPU
runs took ~3 h). Seconds per call. One speaker [S1]; the 2nd half reuses the 1st half's audio as the voice prompt so the
whole hook is the same (synthetic) voice. py dia_space.py [tag] → voicebake/dia_space_<tag>.mp3"""
import json, shutil, subprocess, sys, re
from pathlib import Path
from gradio_client import Client, handle_file

HERE = Path(__file__).parent
LINES = json.loads((HERE / "script.json").read_text(encoding="utf-8"))["lines"]
OUT = HERE / "voicebake"
OUT.mkdir(exist_ok=True)
FF = sys.argv[2] if len(sys.argv) > 2 else "ffmpeg"
tag = sys.argv[1] if len(sys.argv) > 1 else "a"
plain = lambda t: re.sub(r"\s+", " ", t).strip()
c = Client("nari-labs/Dia-1.6B", verbose=False)


def gen(lines, prompt=None, prompt_text=""):
    text = " ".join("[S1] " + plain(l["t"]) for l in lines)
    if prompt:
        text = prompt_text + " " + text
    return c.predict(text, handle_file(prompt) if prompt else None, prompt_text, 3072, 3.0, 1.6, 0.92, 45, 0.94, api_name="/generate_audio")


# voice anchor = the shortest line (prompt must be ≤ 10 s); every other chunk reuses it so it stays one voice
k = min(range(len(LINES)), key=lambda j: len(LINES[j]["t"]))
anchor = str(OUT / f"dia_space_{tag}_anchor.wav")
subprocess.run([FF, "-v", "error", "-y", "-i", gen([LINES[k]]), anchor], check=True)
pt = "[S1] " + plain(LINES[k]["t"])
parts = []
for j, l in enumerate(LINES):
    if j == k:
        parts.append(anchor)
        continue
    w = str(OUT / f"dia_space_{tag}_{j}.wav")
    subprocess.run([FF, "-v", "error", "-y", "-i", gen([l], anchor, pt), w], check=True)
    parts.append(w)
lst = OUT / "list.txt"
lst.write_text("".join(f"file '{Path(x).name}'\n" for x in parts))
subprocess.run([FF, "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-af", "loudnorm=I=-16:TP=-1.5", "-b:a", "160k", str(OUT / f"dia_space_{tag}.mp3")], check=True)
print("ok", OUT / f"dia_space_{tag}.mp3")
