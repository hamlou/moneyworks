# Chatterbox-Turbo (MIT): newer, faster, paralinguistic tags like [chuckle]
import torch
from common import LINES, plain, save
from chatterbox.tts_turbo import ChatterboxTurboTTS
m = ChatterboxTurboTTS.from_pretrained(device="cpu")
clips = []
for i, l in enumerate(LINES):
    torch.manual_seed(11 + i)
    t = plain(l["t"])
    if i == 1:
        t = t + " [chuckle]"
    try:
        w = m.generate(t)
    except TypeError:
        w = m.generate(text=t)
    clips.append(w.squeeze(0).numpy())
save("chatterbox_turbo", clips, m.sr)
