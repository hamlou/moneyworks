#!/usr/bin/env python3
"""
Generate a timings.json for a shorts beat file WITHOUT calling any TTS
service (this sandbox cannot reach edge_tts's websocket endpoint through
its network proxy). Produces the same shape pipeline/tts.py writes
(fps, total, chapters, beats[{id,text,start,end,words[{text,start,end}]}])
so the Remotion side (useT / Timings) works unmodified.

Word durations are estimated from character length at a fixed reading
rate, which is good enough to time captions/animation -- but there is
NO voice audio track produced. See short60 README note for how to swap
in real TTS (run this on a machine with normal internet, or in CI).
"""
import json
import sys
from pathlib import Path

WPS_BASE = 3.15           # baseline words/sec (~189 wpm -- brisk short-form pace)
MIN_WORD = 0.14
CHAR_FACTOR = 0.012       # extra seconds per character beyond 3
GAP = 0.045                # tiny gap between words


def word_dur(word: str) -> float:
    w = word.strip(".,!?:;—…")
    base = 1.0 / WPS_BASE
    extra = max(0, len(w) - 3) * CHAR_FACTOR
    return max(MIN_WORD, base + extra)


def main(spec_path: str, out_dir: str):
    spec = json.loads(Path(spec_path).read_text(encoding="utf-8"))
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    t = 0.3
    beats = []
    for b in spec["beats"]:
        words_raw = b["text"].split()
        words = []
        wt = t
        for wd in words_raw:
            d = word_dur(wd)
            words.append({"text": wd, "start": round(wt, 3), "end": round(wt + d, 3)})
            wt += d + GAP
        beats.append({"id": b["id"], "text": b["text"], "start": round(t, 3), "end": round(wt - GAP, 3), "words": words})
        t = wt + b.get("pause", 0.4)
    total = t
    (out / "timings.json").write_text(
        json.dumps({"fps": 30, "total": round(total, 3), "chapters": [], "beats": beats}, indent=1),
        encoding="utf-8",
    )
    print(f"timings.json -> {out}  total={total:.2f}s  beats={len(beats)}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
