import json, re, subprocess, wave
from pathlib import Path
import numpy as np
HERE = Path(__file__).parent
LINES = json.loads((HERE / "script.json").read_text(encoding="utf-8"))["lines"]
OUT = Path("voicebake"); OUT.mkdir(exist_ok=True)
plain = lambda t: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", t)).strip()

def save(name, clips, sr):
    """clips: list of float32 mono arrays (one per line) -> voicebake/<name>.mp3 with the scripted gaps"""
    parts = []
    for x, l in zip(clips, LINES):
        x = np.asarray(x, dtype=np.float32).flatten()
        parts += [x, np.zeros(int(l["gap"] * sr), np.float32)]
    y = np.concatenate(parts); y = y / max(1e-6, np.abs(y).max()) * 0.9
    w = OUT / f"{name}.wav"
    with wave.open(str(w), "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr); f.writeframes((y * 32767).astype(np.int16).tobytes())
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(w), "-af", "loudnorm=I=-16:TP=-1.5", "-b:a", "160k", str(OUT / f"{name}.mp3")], check=True)
    print(name, f"{len(y)/sr:.1f}s", flush=True)
