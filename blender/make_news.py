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


def receipt():  # Ch1 price: one receipt segment (tiles along the floor)
    im = Image.new("RGB", (512, 420), (246, 244, 236))
    d = ImageDraw.Draw(im)
    r = random.Random(3)
    for y in range(20, 400, 34):
        d.text((24, y), r.choice(["DOCTOR VISIT", "HOSPITAL", "PRESCRIPTIONS", "SURGERY", "DENTAL", "VISION", "CHECKUP"]), font=font("consola.ttf", 26), fill=(60, 60, 60))
        d.text((488, y), "$ ...,...,...,...", font=font("consola.ttf", 26), fill=(60, 60, 60), anchor="ra")
    im.save(os.path.join(OUT, "receipt.png"))
    im = Image.new("RGB", (512, 420), (246, 244, 236))
    d = ImageDraw.Draw(im)
    d.text((256, 120), "TOTAL", font=font("consolab.ttf", 70), fill=INK, anchor="mm")
    d.text((256, 250), "$34 TRILLION", font=font("consolab.ttf", 64), fill=(190, 30, 30), anchor="mm")
    d.text((256, 340), "OVER 10 YEARS · Urban Institute", font=font("consola.ttf", 24), fill=(80, 80, 80), anchor="mm")
    im.save(os.path.join(OUT, "receipt_total.png"))


def sold():
    im = Image.new("RGB", (512, 300), (200, 30, 30))
    d = ImageDraw.Draw(im)
    d.rectangle((12, 12, 500, 288), outline=(255, 255, 255), width=10)
    d.text((256, 150), "SOLD", font=font("impact.ttf", 170), fill=(255, 255, 255), anchor="mm")
    im.save(os.path.join(OUT, "sold.png"))


receipt()
sold()


def walls():  # Ch6: the three walls (S12, S14)
    for name, txt, rgb in (("wall_60", "60 VOTES", (40, 60, 110)), ("wall_money", "$205 MILLION+", (30, 100, 60)), ("wall_half", "HALF THE COUNTRY", (140, 40, 40))):
        im = Image.new("RGB", (1024, 512), rgb)
        d = ImageDraw.Draw(im)
        for y in range(0, 512, 64):  # brick rows
            off = 64 if (y // 64) % 2 else 0
            for x in range(-off, 1024, 128):
                d.rectangle((x + 3, y + 3, x + 125, y + 61), outline=tuple(int(c * 0.7) for c in rgb), width=4)
        d.text((512, 256), txt, font=font("impact.ttf", 130), fill=(250, 250, 250), anchor="mm", stroke_width=6, stroke_fill=(20, 20, 20))
        im.save(os.path.join(OUT, f"{name}.png"))


walls()
