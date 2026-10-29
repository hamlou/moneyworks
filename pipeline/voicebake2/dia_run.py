# Dia 1.6B (Apache 2.0, nari-labs): very expressive, non-verbal cues like (laughs). One speaker [S1], fixed seed so the
# voice stays the same person across lines; two seeds = two candidate voices.
import sys, torch, numpy as np
from common import LINES, plain, save
from dia.model import Dia
m = Dia.from_pretrained("nari-labs/Dia-1.6B-0626", compute_dtype="float32", device="cpu")
seed = int(sys.argv[1]) if len(sys.argv) > 1 else 3
clips = []
for i, l in enumerate(LINES):
    torch.manual_seed(seed)
    np.random.seed(seed)
    t = "[S1] " + plain(l["t"]) + (" (laughs)" if i == 1 else "")
    out = m.generate(t, use_torch_compile=False, verbose=False, cfg_scale=3.0, temperature=1.6, top_p=0.9)
    clips.append(np.asarray(out, dtype=np.float32))
save(f"dia_seed{seed}", clips, 44100)
