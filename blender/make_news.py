"""ea1 cold open: newspaper pages + book covers for shot N. Headlines are REAL headlines (verbatim, see ea1_full_script.md
sources N1-N8); outlet names are set in plain type (no logos). Run: py blender/make_news.py"""
import os, random
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "tex")
F = "C:/Windows/Fonts/"
W, H = 1024, 1400
INK, PAPER, HL = (24, 22, 20), (236, 230, 214), (255, 226, 60)
NEWS = [
    ("BRIDGE MICHIGAN", "Abdul El-Sayed, other Democrats are outraising Republicans across key federal races in Michigan"),
    ("ASSOCIATED PRESS", "Trump escalates rhetoric against El-Sayed as he tries to undermine Democrat in Michigan Senate race"),
    ("CBS NEWS", "El-Sayed responds to ugly personal attacks amid heated Michigan Senate race"),
    ("WASHINGTON EXAMINER", "Jesse Watters says 'I actually like' Abdul el Sayed after interviewing him"),
    ("ABC NEWS", "El-Sayed says he is committed to safety for all after projected win in MI primary"),
    ("CBS NEWS", "Extended interview: Michigan Senate candidate Dr. Abdul El-Sayed"),
    ("POLITICAL WIRE", "Senate Democrats Meet with Abdul El-Sayed"),
    ("NBC NEWS", "Abdul El-Sayed says Democrats must win midterms by 'massive numbers'"),
]
BOOKS = [("HEALING\nPOLITICS", "A Doctor's Journey into the Heart\nof Our Political Epidemic", "ABDUL EL-SAYED", (196, 44, 38)),
         ("MEDICARE\nFOR ALL", "A Citizen's Guide", "ABDUL EL-SAYED\nMICAH JOHNSON", (28, 70, 130))]


def font(name, size):
    return ImageFont.truetype(F + name, size)


def wrap(d, text, f, width):
    lines, cur = [], ""
    for w in text.split():
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) > width and cur:
            lines.append(cur)
            cur = w
        else:
            cur = t
    return lines + [cur]


def paper(i, outlet, head):
    r = random.Random(i)
    im = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(im)
    mf = font("georgiab.ttf", 74 if len(outlet) < 14 else 58)
    d.text((W / 2, 70), outlet, font=mf, fill=INK, anchor="mm")
    d.line((40, 128, W - 40, 128), fill=INK, width=5)
    d.line((40, 138, W - 40, 138), fill=INK, width=2)
    hf = font("timesbd.ttf", 86)
    y = 180
    for ln in wrap(d, head, hf, W - 100):
        x = 50
        for w in ln.split():  # yellow marker behind every word of his name
            tw = d.textlength(w + " ", font=hf)
            if any(k in w.lower() for k in ("abdul", "sayed", "el-sayed")) or (w.lower() == "el" and "sayed" in head.lower()):
                d.rectangle((x - 6, y + 8, x + d.textlength(w, font=hf) + 6, y + 92), fill=HL)
            x += tw
        x = 50
        d.text((x, y), ln, font=hf, fill=INK)
        y += 96
    y += 30
    d.rectangle((50, y, W * 0.58, y + 330), fill=(160, 156, 146))
    for col, x0, x1 in ((0, W * 0.62, W - 50), (1, 50, W * 0.58)):
        yy = y if col == 0 else y + 360
        while yy < H - 50:
            d.line((x0, yy, x1 - r.uniform(0, 60) * (r.random() < 0.15), yy), fill=(120, 116, 108), width=9)
            yy += 24
    im.save(os.path.join(OUT, f"news_{i}.png"))


def book(i, title, sub, author, rgb):
    im = Image.new("RGB", (700, 1000), rgb)
    d = ImageDraw.Draw(im)
    d.multiline_text((350, 330), title, font=font("georgiab.ttf", 120), fill=(250, 246, 236), anchor="mm", align="center", spacing=10)
    d.multiline_text((350, 560), sub, font=font("georgia.ttf", 36), fill=(250, 240, 220), anchor="mm", align="center")
    d.multiline_text((350, 850), author, font=font("georgiab.ttf", 50), fill=HL, anchor="mm", align="center")
    im.save(os.path.join(OUT, f"book_ae{i}.png"))


for i, (o, h) in enumerate(NEWS):
    paper(i, o, h)
for i, b in enumerate(BOOKS):
    book(i, *b)
print("ok", len(NEWS), "papers", len(BOOKS), "books")
