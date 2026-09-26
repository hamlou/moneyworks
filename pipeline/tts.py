import asyncio
import json
import subprocess
import sys
import wave
from pathlib import Path

import edge_tts

VOICE = "en-US-AndrewNeural"
RATE = "-10%"
PITCH = "+0Hz"
SR = 48000
LEAD = 0.4
CHAPTER_GAP = 2.2


async def synth(text: str, mp3: Path):
    kw = dict(rate=RATE, pitch=PITCH)
    try:
        c = edge_tts.Communicate(text, VOICE, boundary="WordBoundary", **kw)
    except TypeError:
        c = edge_tts.Communicate(text, VOICE, **kw)
    words = []
    with open(mp3, "wb") as fh:
        async for ch in c.stream():
            if ch["type"] == "audio":
                fh.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                s = ch["offset"] / 1e7
                words.append({"text": ch["text"], "start": s, "end": s + ch["duration"] / 1e7})
    return words


def to_pcm(mp3: Path) -> bytes:
    return subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(mp3), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        check=True, capture_output=True,
    ).stdout


async def main(spec_path: str, out_dir: str):
    spec = json.loads(Path(spec_path).read_text(encoding="utf-8"))
    out = Path(out_dir)
    tmp = out / "tmp"
    tmp.mkdir(parents=True, exist_ok=True)
    pcm = bytearray(b"\x00\x00" * int(LEAD * SR))
    beats = []
    chapters = []
    for b in spec["beats"]:
        if b.get("chapter"):
            chapters.append({"n": len(chapters) + 1, "title": b["chapter"], "start": round(len(pcm) / 2 / SR, 3), "beat": b["id"]})
            pcm += b"\x00\x00" * int(CHAPTER_GAP * SR)
        mp3 = tmp / f"{b['id']}.mp3"
        words = await synth(b["text"], mp3)
        if not words:
            raise SystemExit(f"no word boundaries for {b['id']} - edge-tts too old?")
        data = to_pcm(mp3)
        if b["id"].startswith("o"):
            cut0 = max(0.0, words[0]["start"] - 0.04)
            cut1 = words[-1]["end"] + 0.12
            a = int(cut0 * SR) * 2
            e = min(len(data), int(cut1 * SR) * 2)
            data = data[a:e]
            words = [{"text": x["text"], "start": x["start"] - cut0, "end": x["end"] - cut0} for x in words]
        t0 = len(pcm) / 2 / SR
        dur = len(data) / 2 / SR
        pcm += data
        beats.append({
            "id": b["id"], "text": b["text"],
            "start": t0 + words[0]["start"], "end": t0 + words[-1]["end"],
            "words": [{"text": w["text"], "start": round(t0 + w["start"], 3), "end": round(t0 + w["end"], 3)} for w in words],
        })
        pcm += b"\x00\x00" * int(b.get("pause", 0.4) * SR)
        print(f"  {b['id']}: {dur:.2f}s  {len(words)} words")
    with wave.open(str(out / "voice.wav"), "wb") as wv:
        wv.setnchannels(1)
        wv.setsampwidth(2)
        wv.setframerate(SR)
        wv.writeframes(bytes(pcm))
    total = len(pcm) / 2 / SR
    (out / "timings.json").write_text(json.dumps({"fps": 30, "total": round(total, 3), "chapters": chapters, "beats": beats}, indent=1), encoding="utf-8")
    for p in tmp.iterdir():
        p.unlink()
    tmp.rmdir()
    print(f"voice.wav {total:.1f}s -> {out}")


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1], sys.argv[2]))
