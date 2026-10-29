# baseline: our current Chatterbox settings (cfg 0.25, exag 0.5)
import torch
from chatterbox.tts import ChatterboxTTS
from common import LINES, plain, save
m = ChatterboxTTS.from_pretrained(device="cpu")
clips = []
for i, l in enumerate(LINES):
    torch.manual_seed(7 + i)
    clips.append(m.generate(plain(l["t"]), exaggeration=0.5, cfg_weight=0.25).squeeze(0).numpy())
save("chatterbox_current", clips, m.sr)
