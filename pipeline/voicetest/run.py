"""Voice A/B test: same lines with Andrew (edge-tts, current) and Chatterbox at 2 settings. Cloud only (voicetest.yml)."""
import asyncio, subprocess, sys
from pathlib import Path
import edge_tts
lines = [l for l in Path(__file__).with_name("lines.txt").read_text(encoding="utf-8").splitlines() if l.strip()]
out = Path("voicetest"); out.mkdir(exist_ok=True)
def join(parts, dst):
    lst = out / "list.txt"
    lst.write_text("".join(f"file '{p.resolve().as_posix()}'\n" for p in parts))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-af", "apad=pad_dur=0", "-ar", "24000", "-ac", "1", str(dst)], check=True)
async def andrew():
    parts = []
    for i, t in enumerate(lines):
        mp3 = out / f"a{i}.mp3"; wav = out / f"a{i}.wav"
        await edge_tts.Communicate(t, "en-US-AndrewMultilingualNeural", rate="+3%").save(str(mp3))
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(mp3), "-af", "apad=pad_dur=0.35", "-ar", "24000", "-ac", "1", str(wav)], check=True)
        parts.append(wav)
    join(parts, out / "1_andrew_now.wav")
asyncio.run(andrew())
import torchaudio as ta
from chatterbox.tts import ChatterboxTTS
m = ChatterboxTTS.from_pretrained(device="cpu")
ref = out / "a0.wav"  # optional: clone Andrew's timbre so the channel voice stays recognisable
for name, kw in [("2_chatterbox_default", dict(exaggeration=0.5, cfg_weight=0.5)),
                 ("3_chatterbox_funny", dict(exaggeration=0.85, cfg_weight=0.3)),
                 ("4_chatterbox_funny_andrew_timbre", dict(exaggeration=0.85, cfg_weight=0.3, audio_prompt_path=str(out / "andrew_ref.wav")))]:
    if "audio_prompt_path" in kw:
        join([out / f"a{i}.wav" for i in range(len(lines))], out / "andrew_ref.wav")
    parts = []
    for i, t in enumerate(lines):
        w = m.generate(t, **kw)
        p = out / f"{name}_{i}.wav"; ta.save(str(p), w, m.sr)
        q = out / f"{name}_{i}p.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(p), "-af", "apad=pad_dur=0.35", "-ar", "24000", "-ac", "1", str(q)], check=True)
        parts.append(q)
        print(name, i, flush=True)
    join(parts, out / f"{name}.wav")
for p in out.glob("*.wav"):
    if p.name[0].isdigit():
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(p), "-b:a", "128k", str(p.with_suffix(".mp3"))], check=True)
