# Orpheus-3B (Apache-2.0) via llama.cpp GGUF on CPU + SNAC decoder. Emotion tags: <laugh> <chuckle> <sigh> <groan> <gasp>
import sys, torch, numpy as np
from huggingface_hub import hf_hub_download, list_repo_files
from llama_cpp import Llama
from snac import SNAC
from common import LINES, save
voice = sys.argv[1]
REPOS = ["isaiahbjork/orpheus-3b-0.1-ft-Q4_K_M-GGUF", "lex-au/Orpheus-3b-FT-Q8_0.gguf", "unsloth/orpheus-3b-0.1-ft-GGUF"]
path = None
for r in REPOS:
    try:
        fs = [f for f in list_repo_files(r) if f.endswith(".gguf")]
        fs.sort(key=lambda f: (0 if "q4_k_m" in f.lower() else 1 if "q8" in f.lower() else 2))
        if fs:
            path = hf_hub_download(r, fs[0]); print("model", r, fs[0], flush=True); break
    except Exception as e:
        print("skip", r, e, flush=True)
llm = Llama(model_path=path, n_ctx=4096, n_threads=4, verbose=False)
snac = SNAC.from_pretrained("hubertsiuzdak/snac_24khz").eval()

def speak(text):
    ids = [128259] + llm.tokenize(f"{voice}: {text}".encode(), add_bos=True, special=True) + [128009, 128260]
    out = []
    for t in llm.generate(ids, temp=0.6, top_p=0.9, repeat_penalty=1.1):
        if t == 128258 or len(out) > 2400:
            break
        out.append(t)
    if 128257 in out:
        out = out[len(out) - out[::-1].index(128257):]
    codes = [t - 128266 for t in out if t >= 128266]
    codes = codes[: len(codes) // 7 * 7]
    l1, l2, l3 = [], [], []
    for i in range(len(codes) // 7):
        c = codes[7 * i: 7 * i + 7]
        l1.append(c[0]); l2.append(c[1] - 4096); l3 += [c[2] - 2 * 4096, c[3] - 3 * 4096]
        l2.append(c[4] - 4 * 4096); l3 += [c[5] - 5 * 4096, c[6] - 6 * 4096]
    with torch.inference_mode():
        a = snac.decode([torch.tensor(l1).unsqueeze(0), torch.tensor(l2).unsqueeze(0), torch.tensor(l3).unsqueeze(0)])
    return a.squeeze().numpy()

save(f"orpheus_{voice}", [speak(l["t"]) for l in LINES], 24000)
