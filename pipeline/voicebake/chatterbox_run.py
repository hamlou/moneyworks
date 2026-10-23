# Chatterbox tuned for the v6 delivery: cfg 0.3 (calmer rhythm), exag 0.6 (more life); also a +2 semitone younger copy
import subprocess, torch
from chatterbox.tts import ChatterboxTTS
from common import LINES, plain, save, OUT
m = ChatterboxTTS.from_pretrained(device="cpu")
for name, cfg, ex in [("chatterbox_tuned", 0.3, 0.6), ("chatterbox_hype", 0.35, 0.75)]:
    clips = []
    for i, l in enumerate(LINES):
        torch.manual_seed(7 + i)
        clips.append(m.generate(plain(l["t"]), exaggeration=ex, cfg_weight=cfg).squeeze(0).numpy())
    save(name, clips, m.sr)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(OUT / f"{name}.wav"), "-af", "rubberband=pitch=1.12:formant=preserved,loudnorm=I=-16:TP=-1.5", "-b:a", "160k", str(OUT / f"{name}_young.mp3")], check=False)
