"""Contact sheet of the flagged beats (start frame | end frame) from a qa_empty report. usage: qa_sheet.py epNN report.txt out.jpg"""
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ep, rep, out = sys.argv[1], sys.argv[2], sys.argv[3]
tm = json.loads((ROOT / 'public' / ep / 'timings.json').read_text(encoding='utf-8'))
beats = {b['id']: b for b in tm['beats']}
ids = re.findall(r'^FLAG (\S+)', Path(rep).read_text(encoding='utf-8'), re.M)
frames = ROOT.parent / 'qa' / ep
rows = []
for bid in ids[:12]:
    b = beats[bid]
    a = round(b['start'] * 30) + 10
    z = max(a + 1, round(b['end'] * 30) - 3)
    pa, pz = frames / f'Episode_{ep}__{a:05d}.png', frames / f'Episode_{ep}__{z:05d}.png'
    if pa.exists() and pz.exists():
        rows.append((bid, Image.open(pa).resize((480, 270)), Image.open(pz).resize((480, 270))))
if not rows:
    Image.new('RGB', (960, 60), 'white').save(out)
    sys.exit()
sheet = Image.new('RGB', (960, 290 * len(rows)), 'white')
d = ImageDraw.Draw(sheet)
for i, (bid, a, z) in enumerate(rows):
    sheet.paste(a, (0, i * 290 + 20))
    sheet.paste(z, (480, i * 290 + 20))
    d.text((6, i * 290 + 4), f'{bid}  start | end', fill='black')
sheet.save(out, quality=80)
