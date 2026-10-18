"""Import the owner's SFX pack (Google Drive folder) into public/sfx/pack/ - cloud only (sfxpack.yml).
Every sound: mono 44.1 kHz, trimmed silence, max 4 s, loudness-normalised to -24 LUFS (the voice sits at ~-16 LUFS,
so a sound at volume 1.0 is still well under the voice). Writes public/sfx/pack/index.txt (name, seconds)."""
import re, subprocess, sys, zipfile
from pathlib import Path
src, dst = Path("raw"), Path("public/sfx/pack")
dst.mkdir(parents=True, exist_ok=True)
for z in list(src.rglob("*.zip")):
    try:
        zipfile.ZipFile(z).extractall(z.with_suffix(""))
    except Exception as e:
        print("bad zip", z, e)
seen, rows = set(), []
for f in sorted(src.rglob("*")):
    if f.suffix.lower() not in (".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aif", ".aiff") or "__MACOSX" in f.parts:
        continue
    name = re.sub(r"[^a-z0-9]+", "_", f.stem.lower()).strip("_")[:40] or "sfx"
    while name in seen:
        name += "_2"
    seen.add(name)
    out = dst / f"{name}.wav"
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(f), "-t", "4", "-ac", "1", "-ar", "44100",
                        "-af", "silenceremove=start_periods=1:start_threshold=-45dB,loudnorm=I=-24:TP=-6:LRA=11,afade=t=out:st=3.8:d=0.2",
                        str(out)], capture_output=True)
    if r.returncode or not out.exists():
        print("skip", f); continue
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(out)], capture_output=True, text=True).stdout or 0)
    rows.append(f"{name}\t{d:.2f}\t{f.relative_to(src)}")
(dst / "index.txt").write_text("\n".join(rows) + "\n", encoding="utf-8")
print(len(rows), "sounds")
