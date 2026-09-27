"""Empty-scene QA. Renders the start and the end of every beat and flags beats whose screen
starts (near) empty or starts much emptier than it ends (= things pop into blank space).

usage: py pipeline/qa_empty.py epNN [--keep]
Output: list of FLAG lines with beat id, time and scores. Exit code 1 if anything is flagged.
Frames go to ../qa/epNN (deleted unless --keep).
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from emptiness import score  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
ep = sys.argv[1]
keep = '--keep' in sys.argv
tm = json.loads((ROOT / 'public' / ep / 'timings.json').read_text(encoding='utf-8'))
out = ROOT.parent / 'qa' / ep
if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True)

items = []
meta = {}
for b in tm['beats']:
    a = round(b['start'] * 30) + 10
    z = max(a + 1, round(b['end'] * 30) - 3)
    for tag, fr in (('a', a), ('z', z)):
        items.append({'id': 'Episode', 'ep': ep, 'timings': None, 'frame': fr})
        meta[fr] = (b['id'], tag)
lst = out / 'list.json'
lst.write_text(json.dumps(items))
subprocess.run(['node', 'pipeline/stills.mjs', str(out), '@' + str(lst)], cwd=ROOT, check=True, stdout=subprocess.DEVNULL, shell=sys.platform == 'win32')

scores = {}
for p in out.glob('*.png'):
    fr = int(p.stem.split('_')[-1])
    scores[fr] = score(p)
flags = 0
by_beat = {}
for fr, (bid, tag) in meta.items():
    by_beat.setdefault(bid, {})[tag] = (fr, scores.get(fr, 0))
for b in tm['beats']:
    d = by_beat.get(b['id'])
    if not d or 'a' not in d:
        continue
    (fa, sa), (fz, sz) = d['a'], d.get('z', d['a'])
    reason = ''
    if sa < 0.07:
        reason = 'nearly empty at start'
    elif sz > 0 and sa < 0.5 * sz and sz - sa > 0.05:
        reason = f'starts {sa / sz:.0%} as full as it ends'
    if reason:
        flags += 1
        print(f'FLAG {b["id"]:6s} t={fa / 30:6.1f}s start={sa:.3f} end={sz:.3f}  {reason}')
print(f'{ep}: {flags} flagged beats out of {len(tm["beats"])}')
if not keep:
    shutil.rmtree(out, ignore_errors=True)
sys.exit(1 if flags else 0)
