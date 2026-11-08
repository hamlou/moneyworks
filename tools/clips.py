"""Fetch real YouTube footage for "clip" backgrounds (runs on GitHub Actions in v6demo.yml, never on the owner's PC).
py tools/clips.py <id>   reads public/<id>/clips.json → public/<id>/clip_N.mp4 + public/<id>/clips_credits.json
SAFE BY DEFAULT: only videos YouTube marks "Creative Commons (CC BY)" are used (YouTube search filter), max 8 s each,
no audio (Dave talks over it), the creator is credited on screen and in the description. If no CC video is found the
clip is skipped and the renderer falls back to the previous background. Clips from normal (all-rights-reserved)
videos are NOT fetched: "fair use" has no safe number of seconds and Content ID can still claim or demonetize."""
import json, subprocess, sys
from pathlib import Path

CC = "EgIwAQ%3D%3D"  # YouTube search filter = Creative Commons


def main():
    eid = sys.argv[1]
    d = Path(f"public/{eid}")
    want = json.loads((d / "clips.json").read_text(encoding="utf8")) if (d / "clips.json").exists() else []
    credits = []
    for c in want:
        url = f"https://www.youtube.com/results?search_query={c['query'].replace(' ', '+')}&sp={CC}"
        r = subprocess.run(["yt-dlp", "--flat-playlist", "--playlist-end", "8", "-J", url], capture_output=True, text=True)
        try:
            ents = json.loads(r.stdout).get("entries", [])
        except ValueError:
            ents = []
        got = None
        for e in ents:
            vid = e.get("id")
            if not vid or (e.get("duration") or 0) < c["start"] + c["sec"] + 1:
                continue
            info = subprocess.run(["yt-dlp", "-J", f"https://www.youtube.com/watch?v={vid}"], capture_output=True, text=True)
            try:
                meta = json.loads(info.stdout)
            except ValueError:
                continue
            if "creative commons" not in (meta.get("license") or "").lower():
                continue  # double check: never use a non-CC video
            start = c["start"] or min(30.0, max(0.0, (meta.get("duration") or 60) * 0.25))
            out = d / c["file"]
            ok = subprocess.run(["yt-dlp", "-q", "-f", "bv*[height<=1080][ext=mp4]/bv*[height<=1080]", "--download-sections", f"*{start}-{start + c['sec']}",
                                 "--force-keyframes-at-cuts", "-o", str(d / "tmp_clip.%(ext)s"), meta["webpage_url"]]).returncode == 0
            tmp = next(d.glob("tmp_clip.*"), None)
            if ok and tmp:
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-an", "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30",
                                "-c:v", "libx264", "-crf", "20", "-pix_fmt", "yuv420p", str(out)])
                tmp.unlink()
                if out.exists():
                    got = {"file": c["file"], "title": meta.get("title"), "channel": meta.get("channel") or meta.get("uploader"), "url": meta["webpage_url"], "license": "CC BY"}
                    break
        print(("OK  " if got else "SKIP") + f" {c['file']} ← {c['query']}" + (f" ← {got['channel']}" if got else " (no Creative Commons match)"), flush=True)
        if got:
            credits.append(got)
    (d / "clips_credits.json").write_text(json.dumps(credits, indent=1, ensure_ascii=False), encoding="utf8")


if __name__ == "__main__":
    main()
