"""Chatterbox voice (owner's pick, 18 Oct 2026: "voice 2 is very human"). Cloud only - voice.yml.

  python pipeline/tts_cb.py epNN --shard I --of N   synthesise every N-th beat -> cb/<id>.wav + cb/<id>.json (word times)
  python pipeline/tts_cb.py epNN --merge            join the beats like tts.py -> pipeline/voice/epNN.flac + epNN.json

Chatterbox is ~10x slower than real time on CPU, so the voice is made ONCE per script and cached in the repo;
tts.py reuses the cache (and only refreshes the visual beat fields) when the episode JSON has "voice": "chatterbox".
Word timings come from faster-whisper on each beat clip, mapped back onto the script words."""
import json
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SR = 48000
LEAD = 0.08
CHAPTER_GAP = 2.2
VISUAL = ("host", "mood", "pose", "bg", "pic", "meme", "slam", "sfx", "card", "zoom")
ep = sys.argv[1]
spec = json.loads((ROOT / "pipeline" / "episodes" / f"{ep}.json").read_text(encoding="utf-8"))
beats = spec["beats"]
cb = ROOT / "cb"
cache = ROOT / "pipeline" / "voice"


def script_hash():
    import hashlib
    key = [(b["id"], b["text"], b.get("pause"), b.get("chapter"), b.get("exag")) + ((b["cfg"],) if "cfg" in b else ()) for b in beats]
    if spec.get("cb"):  # v6 voice settings (STYLE_3D.md §4); absent -> same hash as before, old caches stay valid
        key.append(spec["cb"])
    return hashlib.sha1(json.dumps(key).encode()).hexdigest()[:16]


def pcm(path, sr=SR):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(sr), "-f", "s16le", "-"], check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16)


def trim(x, sr):
    env = np.abs(x.astype(np.float32))
    k = int(0.01 * sr)
    e = np.convolve(env, np.ones(k) / k, mode="same")
    on = np.where(e > 0.02 * 32768)[0]
    if not len(on):
        return x, 0.0
    a = max(0, on[0] - int(0.03 * sr))
    b = min(len(x), on[-1] + int(0.12 * sr))
    return x[a:b], a / sr


def shard(i, n):
    import torch
    import torchaudio as ta
    from chatterbox.tts import ChatterboxTTS
    from faster_whisper import WhisperModel
    m = ChatterboxTTS.from_pretrained(device="cpu")
    wm = WhisperModel("base.en", device="cpu", compute_type="int8")
    cb.mkdir(exist_ok=True)
    for j, b in enumerate(beats):
        if j % n != i:
            continue
        words = b["text"].split()
        best = None
        for attempt in range(3):
            torch.manual_seed(1000 + j * 7 + attempt)
            cbs = spec.get("cb", {})
            ref = cbs.get("ref")  # owner's OWN recorded voice only (STYLE_3D.md §4), never another creator's
            w = m.generate(b["text"], exaggeration=b.get("exag", cbs.get("exag", 0.5)), cfg_weight=b.get("cfg", cbs.get("cfg", 0.5)),
                           **({"audio_prompt_path": str(ROOT / ref)} if ref else {}))
            tmp = cb / f"{b['id']}_raw.wav"
            ta.save(str(tmp), w, m.sr)
            x, _ = trim(pcm(tmp), SR)
            dst = cb / f"{b['id']}.wav"
            with wave.open(str(dst), "wb") as wv:
                wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes(x.tobytes())
            segs, _ = wm.transcribe(str(dst), word_timestamps=True, language="en")
            heard = [ww for s in segs for ww in (s.words or [])]
            dur = len(x) / SR
            # quality guard: Chatterbox sometimes drops or repeats words on long lines - keep the take closest to the script
            score = abs(len(heard) - len(words)) / max(1, len(words)) + (1 if dur > 0.75 * len(words) + 2 else 0)
            if best is None or score < best[0]:
                best = (score, heard, dur, x)
            if score <= 0.12:
                break
        score, heard, dur, x = best
        (cb / f"{b['id']}_raw.wav").unlink(missing_ok=True)
        with wave.open(str(cb / f"{b['id']}.wav"), "wb") as wv:
            wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes(x.tobytes())
        if len(heard) == len(words):
            ts = [(h.start, h.end) for h in heard]
        else:  # spread the script words over the spoken span by length
            a = heard[0].start if heard else 0.0
            e = heard[-1].end if heard else dur
            tot = sum(len(t) + 1 for t in words)
            ts, c = [], a
            for t in words:
                d = (e - a) * (len(t) + 1) / tot
                ts.append((c, c + d * 0.9)); c += d
        (cb / f"{b['id']}.json").write_text(json.dumps([{"text": t, "start": round(s, 3), "end": round(en, 3)} for t, (s, en) in zip(words, ts)]))
        print(f"  {b['id']}: {dur:.1f}s score {score:.2f}", flush=True)


def merge():
    cache.mkdir(exist_ok=True)
    out = [np.zeros(int(LEAD * SR), dtype=np.int16)]
    n = len(out[0])
    tb, chapters = [], []
    for b in beats:
        if b.get("chapter"):
            chapters.append({"n": len(chapters) + 1, "title": b["chapter"], "start": round(n / SR, 3), "beat": b["id"]})
            g = np.zeros(int(CHAPTER_GAP * SR), dtype=np.int16); out.append(g); n += len(g)
        x = pcm(cb / f"{b['id']}.wav")
        ws = json.loads((cb / f"{b['id']}.json").read_text())
        t0 = n / SR
        out.append(x); n += len(x)
        tb.append({"id": b["id"], "text": b["text"], "start": t0 + ws[0]["start"], "end": t0 + ws[-1]["end"],
                   "words": [{"text": w["text"], "start": round(t0 + w["start"], 3), "end": round(t0 + w["end"], 3)} for w in ws]})
        g = np.zeros(int(b.get("pause", 0.35) * SR), dtype=np.int16); out.append(g); n += len(g)
    total = n / SR
    wav = cb / "voice.wav"
    with wave.open(str(wav), "wb") as wv:
        wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes(np.concatenate(out).tobytes())
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(wav), "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), str(cache / f"{ep}.flac")], check=True)
    (cache / f"{ep}.json").write_text(json.dumps({"fps": 30, "total": round(total, 3), "hash": script_hash(), "chapters": chapters, "beats": tb}, indent=1), encoding="utf-8")
    print(f"{ep}: {total:.1f}s chatterbox voice cached")


def use_cache(out_dir):
    """Called by tts.py: copy the cached voice into public/epNN and refresh the visual fields from the JSON."""
    t = json.loads((cache / f"{ep}.json").read_text(encoding="utf-8")) if (cache / f"{ep}.json").exists() else None
    if not t or t.get("hash") != script_hash():
        sys.exit(f"{ep}: the Chatterbox voice is missing or older than the script -> run the 'voice' workflow first (Actions -> voice -> {ep})")
    by = {b["id"]: b for b in beats}
    for b in t["beats"]:
        b.update({k: by[b["id"]][k] for k in VISUAL if k in by[b["id"]]})
    out = Path(out_dir); out.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(cache / f"{ep}.flac"), "-ac", "1", "-ar", str(SR), str(out / "voice.wav")], check=True)
    (out / "timings.json").write_text(json.dumps(t, indent=1), encoding="utf-8")
    print(f"{ep}: cached Chatterbox voice {t['total']:.1f}s")


if __name__ == "__main__":
    if "--use" in sys.argv:
        use_cache(sys.argv[sys.argv.index("--use") + 1])
    elif "--merge" in sys.argv:
        merge()
    elif "--shard" in sys.argv:
        shard(int(sys.argv[sys.argv.index("--shard") + 1]), int(sys.argv[sys.argv.index("--of") + 1]))
