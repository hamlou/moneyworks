"""Find REAL photos on Wikimedia Commons (free licences only).

  py pipeline/photo_find.py "JCPenney store exterior" [--n 12] [--sheet name]

Prints File: titles + licence + size. --sheet also saves a numbered contact sheet to ../qa_dl/find_<name>.jpg so you
can LOOK before choosing (Read it). Put the chosen title in pipeline/photos/epNN.json as {"id": "...", "file": "File:..."}."""
import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from photo_lib import get, license_ok, search

argv = sys.argv[1:]
n = 12
sheet = None
words = []
i = 0
while i < len(argv):
    if argv[i] == "--n":
        n = int(argv[i + 1])
        i += 2
    elif argv[i] == "--sheet":
        sheet = argv[i + 1] if i + 1 < len(argv) and not argv[i + 1].startswith("--") else "x"
        i += 2
    else:
        words.append(argv[i])
        i += 1
res = [r for r in search(" ".join(words), n) if license_ok(r["license"]) and min(r["w"], r["h"]) >= 500]
for k, r in enumerate(res):
    print(f"{k + 1:2d}. {r['title']}\n      {r['w']}x{r['h']} | {r['license']} | {r['credit'][:50]} | {r['desc']}".encode("ascii", "replace").decode())
if not res:
    print("no free-licence results >= 500 px. Try simpler English words ('iPhone 15', 'Walmart store', 'price tag').")
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
