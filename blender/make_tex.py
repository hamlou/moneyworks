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
