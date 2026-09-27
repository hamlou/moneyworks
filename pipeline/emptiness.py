"""Score how 'empty' rendered frames look.

usage: python pipeline/emptiness.py <dir with PNGs> [threshold]
Prints one line per frame: score (share of 'busy' pixels in the content area) and FLAG if below threshold.
Busy pixel = strong local contrast (lines, shapes, text). Captions band (bottom 18%) and progress bar (top 5%) are ignored.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image


def score(p: Path) -> float:
    im = Image.open(p).convert('L').resize((480, 270))
    a = np.asarray(im, dtype=np.int16)
    a = a[int(270 * 0.05):int(270 * 0.82), :]
    gx = np.abs(np.diff(a, axis=1))[:-1, :]
    gy = np.abs(np.diff(a, axis=0))[:, :-1]
    busy = (np.maximum(gx, gy) > 38)
    # dilate a little so thick shapes count, not only their outline
    b = busy.copy()
    for dy, dx in [(1, 0), (-1, 0), (0, 1), (0, -1), (2, 0), (0, 2), (-2, 0), (0, -2)]:
        b |= np.roll(np.roll(busy, dy, 0), dx, 1)
    return float(b.mean())


if __name__ == '__main__':
    d = Path(sys.argv[1])
    th = float(sys.argv[2]) if len(sys.argv) > 2 else 0.06
    bad = 0
    for p in sorted(d.glob('*.png')):
        s = score(p)
        flag = s < th
        bad += flag
        print(f'{s:.3f} {"FLAG" if flag else "ok  "} {p.name}')
    print(f'{bad} flagged')
