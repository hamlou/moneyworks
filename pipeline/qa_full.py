"""Contact sheet of EVERY beat (frame near the end of each beat = fully built scene), for the lead's visual review.
usage: qa_full.py epNN out.jpg  (needs ../qa/epNN frames from qa_empty.py --keep)"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ep, out = sys.argv[1], sys.argv[2]
tm = json.loads((ROOT / 'public' / ep / 'timings.json').read_text(encoding='utf-8'))
frames = ROOT.parent / 'qa' / ep
W, H, COLS = 384, 216, 6
tiles = []
for b in tm['beats']:
    a = round(b['start'] * 30) + 10
    z = max(a + 1, round(b['end'] * 30) - 3)
    p = frames / f'Episode_{ep}__{z:05d}.png'
    if p.exists():
        tiles.append((b['id'], Image.open(p).convert('RGB').resize((W, H))))
rows = (len(tiles) + COLS - 1) // COLS or 1
sheet = Image.new('RGB', (W * COLS, (H + 18) * rows), 'white')
d = ImageDraw.Draw(sheet)
for i, (bid, im) in enumerate(tiles):
    x, y = (i % COLS) * W, (i // COLS) * (H + 18)
    d.text((x + 4, y + 2), bid, fill='black')
    sheet.paste(im, (x, y + 18))
sheet.save(out, quality=82)
