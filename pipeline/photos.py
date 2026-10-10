"""Download the real photos of an episode (PLAYBOOK sec 0.10).

  py pipeline/photos.py epNN [--force]          (local: download + resize + contact sheet; tiny files)
  python pipeline/photos.py epNN --cutout       (cloud only, photos.yml: background removal with rembg)

Reads pipeline/photos/epNN.json:
  {"photos": [
     {"id": "jcpenney", "file": "File:JCPenney store.jpg"},      Wikimedia Commons: credit + licence are filled in automatically
     {"id": "tag", "url": "https://images.unsplash.com/...", "credit": "Jane Doe / Unsplash", "license": "Unsplash License", "page": "https://unsplash.com/photos/..."},
     {"id": "ceo", "file": "File:Some CEO.jpg", "cutout": true}  background removed in the cloud -> ceo.png (use look="cutout")
  ]}
Writes public/photos/epNN/<id>.jpg (max 1600 px), fills credit/license/page back into the manifest and saves a contact
sheet to ../qa_dl/photos_epNN.jpg - LOOK at it. Only free licences pass (PD, CC0, CC BY, CC BY-SA, Unsplash/Pexels/Pixabay, US Gov)."""
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
from photo_lib import get, info, license_ok

ROOT = Path(__file__).resolve().parent.parent
ep = sys.argv[1]
force = "--force" in sys.argv
cloud = "--cutout" in sys.argv
man_path = ROOT / "pipeline" / "photos" / f"{ep}.json"
man = json.loads(man_path.read_text(encoding="utf-8"))
out = ROOT / "public" / "photos" / ep
out.mkdir(parents=True, exist_ok=True)
FREE = ("unsplash", "pexels", "pixabay", "u.s. government", "us government")
problems = []
seen = set()
for p in man["photos"]:
    pid = p["id"]
    if pid in seen or not pid.replace("_", "").isalnum() or pid != pid.lower():
        problems.append(f"{pid}: ids must be unique, lowercase letters/digits/underscore")
    seen.add(pid)

if cloud:
    from rembg import new_session, remove
    sess = new_session("u2net")
    for p in man["photos"]:
        src = out / f"{p['id']}.jpg"
        dst = out / f"{p['id']}.png"
        if p.get("cutout") and src.exists() and (force or not dst.exists()):
            im = remove(Image.open(src), session=sess, post_process_mask=True)
            box = im.getbbox()
            if box:
                im = im.crop(box)
            im.thumbnail((1200, 1200))
            im.save(dst, optimize=True)
            print(f"  cutout {dst.name} {im.size}")
else:
    files = [p["file"] for p in man["photos"] if p.get("file")]
    meta = info(files) if files else {}
    for p in man["photos"]:
        pid = p["id"]
        if p.get("file"):
            m = meta.get(p["file"])
            if not m:
                problems.append(f"{pid}: Commons file not found: {p['file']}")
                continue
            p.setdefault("credit", m["credit"])
            p["license"] = m["license"]
            p["page"] = m["page"]
            src = m["thumb"] if m["w"] > 1600 else m["url"]
        else:
            src = p.get("url", "")
            if not (src and p.get("credit") and p.get("license") and p.get("page")):
                problems.append(f"{pid}: non-Commons photos need url, credit, license and page (where it comes from)")
                continue
        lic = p.get("license", "")
        if not (license_ok(lic) or any(s in lic.lower() for s in FREE)):
            problems.append(f"{pid}: licence '{lic}' is not free for commercial use - pick another photo")
            continue
        dst = out / f"{pid}.jpg"
        if (dst.exists() or (out / f"{pid}.png").exists()) and not force:
            continue
        im = Image.open(io.BytesIO(get(src, binary=True)))
        if im.mode == "P":
            im = im.convert("RGBA")
        if im.mode in ("RGBA", "LA"):
            im = im.convert("RGBA")
            if im.getextrema()[3][0] < 250 and p.get("cutout"):  # already transparent -> ready-made cutout
                im.thumbnail((1200, 1200))
                im.save(out / f"{pid}.png", optimize=True)
                print(f"  {pid}.png (already transparent) {im.size}")
                continue
            bg = Image.new("RGB", im.size, "#fff")
            bg.paste(im, mask=im.split()[3])
            im = bg
        im = im.convert("RGB")
        im.thumbnail((1600, 1600))
        im.save(dst, quality=84, optimize=True, progressive=True)
        print(f"  {pid}.jpg {im.size} {dst.stat().st_size // 1024} KB | {p.get('license')} | {p.get('credit')}".encode("ascii", "replace").decode())
    man_path.write_text(json.dumps(man, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")

pics = sorted(out.glob("*.*"))
if pics:
    cols, tw, th = 5, 384, 300
    rows = (len(pics) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * tw, rows * th), "#B14AED")
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(pics):
        im = Image.open(f).convert("RGBA")
        im.thumbnail((tw - 10, th - 40))
        x, y = (i % cols) * tw, (i // cols) * th
        sheet.paste(im, (x + (tw - im.width) // 2, y + 4), im)
        d.rectangle([x, y + th - 30, x + tw, y + th], fill="#111")
        d.text((x + 8, y + th - 24), f.name, fill="#fff")
    sp = Path("sheet.jpg") if cloud else ROOT.parent / "qa_dl" / f"photos_{ep}.jpg"
    sp.parent.mkdir(exist_ok=True)
    sheet.save(sp, quality=82)
    print("sheet:", sp)
if problems:
    print("PROBLEMS:")
    for x in problems:
        print(" -", x)
    sys.exit(1)
print(f"{ep}: {len(pics)} photo files OK")
