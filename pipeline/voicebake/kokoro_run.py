# Kokoro-82M (Apache-2.0): fast natural voices, no tags
from kokoro import KPipeline
from common import LINES, plain, save
import numpy as np
p = KPipeline(lang_code="a")
for v in ["am_puck", "am_fenrir", "am_michael", "am_eric"]:
    clips = []
    for l in LINES:
        clips.append(np.concatenate([a.numpy() if hasattr(a, "numpy") else a for _, _, a in p(plain(l["t"]), voice=v, speed=1.08)]))
    save(f"kokoro_{v}", clips, 24000)
