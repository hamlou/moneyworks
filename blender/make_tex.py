"""Textures for the Blender shots (STYLE_3D.md §12): Dave's ink-line faces, chalkboard, tax form.
Faces copy the reference's stickman: thin hand-drawn black strokes (brows, small eyes, mouth line) on transparent,
drawn at 1024 and mapped onto the front of Dave's head. Run: py blender/make_tex.py"""
import math, os, random
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "tex")
os.makedirs(OUT, exist_ok=True)
S = 1024
INK = (18, 18, 18, 255)


def wob(pts, amp=3, seed=1):
    r = random.Random(seed)
    return [(x + r.uniform(-amp, amp), y + r.uniform(-amp, amp)) for x, y in pts]


def stroke(d, pts, w=24, seed=1):
    pts = wob(pts, 2.2, seed)
    d.line(pts, fill=INK, width=w, joint="curve")
    for p in (pts[0], pts[-1]):
        d.ellipse([p[0] - w / 2, p[1] - w / 2, p[0] + w / 2, p[1] + w / 2], fill=INK)


def arc(cx, cy, rx, ry, a0, a1, n=24):
    return [(cx + rx * math.cos(math.radians(a)), cy + ry * math.sin(math.radians(a))) for a in [a0 + (a1 - a0) * i / n for i in range(n + 1)]]


def eye(d, cx, cy, r=38, look=(0, 0)):
    d.ellipse([cx - r + look[0], cy - r * 1.25 + look[1], cx + r + look[0], cy + r * 1.25 + look[1]], fill=INK)


def big_eye(d, cx, cy, r=72, look=(0, 0), pupil=24):
    d.ellipse([cx - r, cy - r * 1.15, cx + r, cy + r * 1.15], outline=INK, width=18, fill=(255, 255, 255, 255))
    d.ellipse([cx - pupil + look[0], cy - pupil + look[1], cx + pupil + look[0], cy + pupil + look[1]], fill=INK)


def face(name, draw):
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw(ImageDraw.Draw(im))
    im.filter(ImageFilter.GaussianBlur(0.7)).save(os.path.join(OUT, f"face_{name}.png"))


L, R, EY, MY = 400, 624, 470, 640

face("neutral", lambda d: (eye(d, L, EY), eye(d, R, EY), stroke(d, arc(512, MY - 40, 70, 40, 30, 150), seed=3)))
face("shock", lambda d: (big_eye(d, L, EY), big_eye(d, R, EY), stroke(d, [(L - 60, EY - 120), (L + 40, EY - 140)], seed=4), stroke(d, [(R - 40, EY - 140), (R + 60, EY - 120)], seed=5),
                         d.ellipse([472, MY - 10, 552, MY + 90], outline=INK, width=14, fill=(60, 20, 20, 255))))
face("think", lambda d: (big_eye(d, L, EY, 52, (-26, -8), 16), big_eye(d, R, EY, 52, (-26, -8), 16), stroke(d, [(L - 50, EY - 115), (L + 50, EY - 95)], seed=6), stroke(d, [(R - 50, EY - 125), (R + 50, EY - 135)], seed=7),
                         stroke(d, [(470, MY + 20), (520, MY + 10), (560, MY + 25)], seed=8)))


def spiral(d, cx, cy):
    pts = [(cx + (4 + t * 1.6) * math.cos(t * 0.5), cy + (4 + t * 1.6) * math.sin(t * 0.5)) for t in range(0, 34)]
    stroke(d, pts, 10, seed=cx)


face("spiral", lambda d: (spiral(d, L, EY), spiral(d, R, EY), stroke(d, [(440, MY + 30), (475, MY), (512, MY + 30), (549, MY), (585, MY + 30)], 14, seed=9)))
face("panic", lambda d: (big_eye(d, L, EY, 64, (0, 6), 12), big_eye(d, R, EY, 64, (0, 6), 12), stroke(d, [(L - 70, EY - 100), (L + 40, EY - 135)], seed=10), stroke(d, [(R - 40, EY - 135), (R + 70, EY - 100)], seed=11),
                         d.polygon([(430, MY), (594, MY), (560, MY + 110), (464, MY + 110)], outline=INK, fill=(70, 22, 22, 255), width=14)))


# chalkboard: hand-written triangles + formulas, chalk smudge
def board():
    W, H = 2048, 1024
    im = Image.new("RGB", (W, H), (38, 64, 50))
    d = ImageDraw.Draw(im, "RGBA")
    r = random.Random(4)
    for _ in range(260):
        x, y = r.uniform(0, W), r.uniform(0, H)
        d.ellipse([x - 60, y - 20, x + 60, y + 20], fill=(255, 255, 255, 6))
    ch = (232, 236, 226, 215)
    for i, (x, y, s, rot) in enumerate([(120, 380, 260, 0), (520, 330, 220, 0.12), (930, 400, 290, -0.08), (1400, 350, 240, 0.18), (1760, 420, 200, -0.1), (200, 880, 240, -0.12), (700, 900, 300, 0.05), (1250, 890, 250, 0), (1700, 880, 210, -0.2)]):
        pts = [(0, 0), (s, 0), (s * 0.25, -s * 0.8)]
        c, sn = math.cos(rot), math.sin(rot)
        pts = [(x + px * c - py * sn, y + px * sn + py * c) for px, py in pts]
        for a, b in zip(pts, pts[1:] + pts[:1]):
            d.line(wob([a, ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2), b], 3, i), fill=ch, width=7)
        d.rectangle([pts[0][0] + s * 0.25 * c - 2, pts[0][1] - 24, pts[0][0] + s * 0.25 * c + 22, pts[0][1] - 2], outline=ch, width=5)
    im.save(os.path.join(OUT, "chalkboard.png"))


def taxform():
    im = Image.new("RGB", (768, 1000), (240, 236, 224))
    d = ImageDraw.Draw(im)
    d.rectangle([40, 40, 728, 170], fill=(30, 30, 30))
    try:
        from PIL import ImageFont
        f = ImageFont.truetype("arialbd.ttf", 92)
        d.text((70, 52), "TAX FORM", font=f, fill=(240, 236, 224))
    except OSError:
        d.text((70, 80), "TAX FORM", fill=(240, 236, 224))
    r = random.Random(2)
    for i in range(14):
        y = 230 + i * 50
        d.rectangle([60, y, 60 + r.randint(300, 640), y + 12], fill=(150, 146, 136))
    d.rectangle([470, 880, 720, 960], outline=(190, 40, 40), width=8)
    im.save(os.path.join(OUT, "taxform.png"))


board()
taxform()
print(sorted(os.listdir(OUT)))


# ---- test1 additions (29 Oct): more faces + props from the script lines
face("grin", lambda d: (stroke(d, arc(L, EY + 10, 34, 26, 200, 340), seed=12), stroke(d, arc(R, EY + 10, 34, 26, 200, 340), seed=13),
                        d.chord([420, MY - 60, 604, MY + 90], 0, 180, outline=INK, fill=(70, 22, 22, 255), width=14)))
face("determined", lambda d: (eye(d, L, EY + 8), eye(d, R, EY + 8), stroke(d, [(L - 60, EY - 90), (L + 45, EY - 50)], seed=14), stroke(d, [(R - 45, EY - 50), (R + 60, EY - 90)], seed=15),
                              stroke(d, [(450, MY + 10), (520, MY), (580, MY - 25)], seed=16)))
face("smug", lambda d: (stroke(d, [(L - 40, EY), (L + 40, EY)], seed=17), stroke(d, [(R - 40, EY), (R + 40, EY)], seed=18), eye(d, L + 10, EY + 18, 20), eye(d, R + 10, EY + 18, 20),
                        stroke(d, [(L - 50, EY - 80), (L + 40, EY - 95)], seed=19), stroke(d, [(450, MY + 15), (540, MY + 15), (590, MY - 20)], seed=20)))
face("sleep", lambda d: (stroke(d, arc(L, EY, 36, 18, 20, 160), seed=21), stroke(d, arc(R, EY, 36, 18, 20, 160), seed=22), d.ellipse([490, MY, 534, MY + 50], outline=INK, width=12)))


def xeye(d, cx, cy, r=34, s=1):
    stroke(d, [(cx - r, cy - r), (cx + r, cy + r)], seed=s)
    stroke(d, [(cx - r, cy + r), (cx + r, cy - r)], seed=s + 1)


face("dead", lambda d: (xeye(d, L, EY, s=23), xeye(d, R, EY, s=25), stroke(d, [(450, MY + 20), (500, MY + 5), (560, MY + 25)], seed=27)))


def board_day1():
    W, H = 2048, 1024
    im = Image.new("RGB", (W, H), (38, 64, 50))
    d = ImageDraw.Draw(im, "RGBA")
    r = random.Random(9)
    for _ in range(300):  # old erased chalk
        x, y = r.uniform(0, W), r.uniform(0, H)
        d.ellipse([x - 90, y - 25, x + 90, y + 25], fill=(255, 255, 255, 7))
    from PIL import ImageFont
    try:
        f = ImageFont.truetype("comicbd.ttf", 420)
    except OSError:
        f = ImageFont.load_default()
    for dx, dy in [(0, 0), (3, 2), (-2, 3)]:
        d.text((360 + dx, 220 + dy), "DAY 1", font=f, fill=(236, 238, 228, 120))
    d.line(wob([(380, 760), (900, 790), (1680, 760)], 6, 3), fill=(236, 238, 228, 170), width=14)
    im.save(os.path.join(OUT, "chalk_day1.png"))


def book_cover():
    im = Image.new("RGB", (800, 1000), (176, 40, 38))
    d = ImageDraw.Draw(im)
    from PIL import ImageFont
    try:
        f, g = ImageFont.truetype("arialbd.ttf", 170), ImageFont.truetype("arialbd.ttf", 60)
    except OSError:
        f = g = ImageFont.load_default()
    d.rectangle([0, 0, 800, 1000], outline=(120, 24, 22), width=30)
    d.text((110, 240), "MATH", font=f, fill=(250, 236, 200))
    d.text((150, 460), "GRADE 10", font=g, fill=(250, 236, 200))
    for i, (x, y) in enumerate([(180, 640), (420, 600), (560, 760)]):
        d.polygon([(x, y + 120), (x + 160, y + 120), (x + 40, y)], outline=(250, 236, 200), width=10)
    im.save(os.path.join(OUT, "book_math.png"))
    pg = Image.new("RGB", (1200, 800), (244, 240, 228))
    d = ImageDraw.Draw(pg)
    rr = random.Random(5)
    for side in (0, 600):
        for i in range(16):
            d.rectangle([side + 60, 80 + i * 42, side + 60 + rr.randint(300, 470), 92 + i * 42], fill=(150, 146, 136))
    d.line([(600, 0), (600, 800)], fill=(200, 194, 180), width=8)
    pg.save(os.path.join(OUT, "book_pages.png"))


board_day1()
book_cover()
print(sorted(os.listdir(OUT)))


# ---- test1 pass 2: train problem on the board + rent bill
def chalk_train():
    W, H = 2048, 1024
    im = Image.new("RGB", (W, H), (38, 64, 50))
    d = ImageDraw.Draw(im, "RGBA")
    r = random.Random(11)
    for _ in range(300):
        x, y = r.uniform(0, W), r.uniform(0, H)
        d.ellipse([x - 90, y - 25, x + 90, y + 25], fill=(255, 255, 255, 7))
    from PIL import ImageFont
    try:
        f, g = ImageFont.truetype("comicbd.ttf", 120), ImageFont.truetype("comicbd.ttf", 90)
    except OSError:
        f = g = ImageFont.load_default()
    ch = (236, 238, 228, 225)
    d.text((140, 90), "PROBLEM 7", font=f, fill=ch)
    d.text((140, 280), "A train leaves Chicago", font=g, fill=ch)
    d.text((140, 400), "at 3:00 PM going 60 mph.", font=g, fill=ch)
    d.text((140, 520), "When does it arrive?", font=g, fill=ch)
    x0, y0 = 1350, 760
    for i in range(3):
        d.rectangle([x0 + i * 190, y0, x0 + i * 190 + 160, y0 + 110], outline=ch, width=9)
        for cx in (35, 125):
            d.ellipse([x0 + i * 190 + cx - 26, y0 + 92, x0 + i * 190 + cx + 26, y0 + 144], outline=ch, width=8)
    d.line([(1300, 910), (1980, 910)], fill=ch, width=7)
    im.save(os.path.join(OUT, "chalk_train.png"))


def rent_bill():
    im = Image.new("RGB", (768, 1000), (246, 240, 232))
    d = ImageDraw.Draw(im)
    from PIL import ImageFont
    try:
        f, g = ImageFont.truetype("arialbd.ttf", 150), ImageFont.truetype("arialbd.ttf", 64)
    except OSError:
        f = g = ImageFont.load_default()
    d.rectangle([0, 0, 768, 230], fill=(200, 36, 36))
    d.text((90, 40), "RENT", font=f, fill=(255, 255, 255))
    d.text((60, 300), "DUE EVERY MONTH", font=g, fill=(30, 30, 30))
    r = random.Random(3)
    for i in range(8):
        d.rectangle([60, 430 + i * 50, 60 + r.randint(300, 620), 442 + i * 50], fill=(160, 154, 146))
    d.rectangle([380, 840, 720, 960], outline=(200, 36, 36), width=10)
    d.text((410, 860), "PAY NOW", font=g, fill=(200, 36, 36))
    im.save(os.path.join(OUT, "rent_bill.png"))


chalk_train()
rent_bill()


# ---- animation kit worlds (29 Oct): lined paper, banknote, concept-character logo heads
def lined_paper():
    W, H = 2048, 1152
    im = Image.new("RGB", (W, H), (246, 245, 240))
    d = ImageDraw.Draw(im)
    for y in range(60, H, 56):
        d.line([(0, y), (W, y)], fill=(190, 205, 225), width=3)
    d.line([(150, 0), (150, H)], fill=(230, 150, 150), width=4)
    r = random.Random(1)
    for _ in range(1500):  # paper grain
        x, y = r.randint(0, W - 1), r.randint(0, H - 1)
        d.point((x, y), fill=(232, 230, 224))
    im.save(os.path.join(OUT, "paper_lined.png"))


def banknote():
    im = Image.new("RGB", (512, 256), (120, 160, 110))
    d = ImageDraw.Draw(im)
    d.rectangle([8, 8, 503, 247], outline=(60, 95, 60), width=10)
    d.ellipse([196, 48, 316, 208], fill=(150, 185, 140), outline=(60, 95, 60), width=6)
    from PIL import ImageFont
    try:
        f = ImageFont.truetype("arialbd.ttf", 70)
    except OSError:
        f = ImageFont.load_default()
    d.text((30, 20), "100", font=f, fill=(60, 95, 60))
    d.text((380, 160), "100", font=f, fill=(60, 95, 60))
    d.text((238, 85), "$", font=f, fill=(60, 95, 60))
    im.save(os.path.join(OUT, "banknote.png"))


def logo_head(name, bg, fg, text):
    im = Image.new("RGB", (512, 512), bg)
    d = ImageDraw.Draw(im)
    from PIL import ImageFont
    try:
        f = ImageFont.truetype("arialbd.ttf", 300 if len(text) < 3 else 150)
    except OSError:
        f = ImageFont.load_default()
    w = d.textlength(text, font=f)
    d.text(((512 - w) / 2, 80 if len(text) < 3 else 170), text, font=f, fill=fg)
    im.save(os.path.join(OUT, f"logo_{name}.png"))


lined_paper()
banknote()
logo_head("bank", (200, 24, 30), (255, 255, 255), "$")
logo_head("bank_word", (30, 60, 140), (255, 255, 255), "BANK")
