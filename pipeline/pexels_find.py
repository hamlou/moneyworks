"""Find REAL photos on Pexels (free licence, no attribution legally required but we credit anyway).

  export PEXELS_API_KEY=...        (free, sign up at pexels.com/api)
  py pipeline/pexels_find.py "online course checkout screen" [--n 12] [--sheet name]

Prints numbered candidates: id | WxH | photographer | url. --sheet also saves a numbered contact sheet to
../qa_dl/find_<name>.jpg so you can LOOK before choosing (Read it).

Put the chosen photo straight into pipeline/photos/epNN.json (shorts: pipeline/photos/shortNN.json) as:
  {"id": "checkout_screen", "url": "<large url printed below>", "credit": "<photographer> / Pexels", "license": "Pexels License", "page": "<page url printed below>"}
pipeline/photos.py already accepts this shape (its FREE tuple includes "pexels") -- no code changes needed there.

NOTE: this script needs outbound HTTPS to api.pexels.com and images.pexels.com. The agent cloud sandbox's egress
proxy blocks both (same org-wide policy that blocks commons.wikimedia.org and images.unsplash.com) -- confirmed
13 Oct 2026, see PLAYBOOK_SHORTS.md. Run this on the owner's PC (or any session with open network access), same
as photo_find.py.
"""
import io
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://api.pexels.com/v1/search"
UA = "MoneyworksEdu/1.0 (educational YouTube explainer; github.com/hamlou) python-urllib"


def get(url, headers=None, tries=5, binary=False):
    err = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
            return data if binary else data.decode("utf-8")
        except Exception as e:
            err = e
            import time
            time.sleep(3 + i * 5)
    raise SystemExit(f"download failed: {url} ({err})")


def search(query, n=12, key=None):
    key = key or os.environ.get("PEXELS_API_KEY")
    if not key:
        raise SystemExit("set PEXELS_API_KEY first (free key at pexels.com/api)")
    q = urllib.parse.urlencode({"query": query, "per_page": min(n, 80), "orientation": "landscape"})
    data = json.loads(get(f"{API}?{q}", headers={"Authorization": key}))
    out = []
    for p in data.get("photos", []):
        out.append({
            "id": p["id"], "w": p["width"], "h": p["height"],
            "credit": f"{p['photographer']} / Pexels", "page": p["url"],
            "large": p["src"]["large2x"], "thumb": p["src"]["medium"],
        })
    return out


if __name__ == "__main__":
    argv = sys.argv[1:]
    n = 12
    sheet = None
    words = []
    i = 0
    while i < len(argv):
        if argv[i] == "--n":
            n = int(argv[i + 1]); i += 2
        elif argv[i] == "--sheet":
            sheet = argv[i + 1] if i + 1 < len(argv) and not argv[i + 1].startswith("--") else "x"; i += 2
        else:
            words.append(argv[i]); i += 1
    res = search(" ".join(words), n)
    for k, r in enumerate(res):
        print(f"{k + 1:2d}. id={r['id']} {r['w']}x{r['h']} | {r['credit']}\n      large: {r['large']}\n      page:  {r['page']}")
    if not res:
        print("no results. Try simpler English words ('iPhone 15', 'Walmart store', 'price tag').")
    if sheet and res:
        from PIL import Image, ImageDraw
        cols, tw, th = 4, 400, 300
        rows = (len(res) + cols - 1) // cols
        img = Image.new("RGB", (cols * tw, rows * th), "#222")
        d = ImageDraw.Draw(img)
        for k, r in enumerate(res):
            try:
                im = Image.open(io.BytesIO(get(r["thumb"], tries=2, binary=True))).convert("RGB")
            except (SystemExit, Exception):
                continue
            im.thumbnail((tw - 8, th - 8))
            x, y = (k % cols) * tw, (k // cols) * th
            img.paste(im, (x + (tw - im.width) // 2, y + (th - im.height) // 2))
            d.rectangle([x, y, x + 46, y + 34], fill="#FFD166")
            d.text((x + 8, y + 8), str(k + 1), fill="#000")
        out = Path(__file__).resolve().parent.parent.parent / "qa_dl" / f"find_{sheet}.jpg"
        out.parent.mkdir(exist_ok=True)
        img.save(out, quality=80)
        print("sheet:", out)
