"""Reverse-engineer the SOUND of a video: speech pacing, music bed level, silences, SFX density, music changes.
py audio_re.py <media> <words.vtt|words.json[:stretch]> <out.json>"""
import json, re, sys
import numpy as np
import librosa

media, wsrc, out = sys.argv[1], sys.argv[2], sys.argv[3]
SR = 8000
y, _ = librosa.load(media, sr=SR, mono=True)
dur = len(y) / SR


def words_vtt(p):
    t = open(p, encoding="utf8").read()
    W = []
    for m in re.finditer(r"(\d+):(\d+):([\d.]+) --> (\d+):(\d+):([\d.]+)[^\n]*\n(.*?)(?:\n\n|\Z)", t, re.S):
        body = m.group(7)
        if "<c>" in body:
            line = body.strip().split("\n")[-1]
            s0 = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
            first = line.split("<")[0].strip()
            if first:
                W.append(s0)
            for tm in re.finditer(r"<(\d+):(\d+):([\d.]+)><c>", line):
                W.append(int(tm.group(1)) * 3600 + int(tm.group(2)) * 60 + float(tm.group(3)))
    if not W:  # plain cues: spread the cue's words evenly
        for m in re.finditer(r"(\d+):(\d+):([\d.]+) --> (\d+):(\d+):([\d.]+)[^\n]*\n(.*?)(?:\n\n|\Z)", t, re.S):
            a = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
            b = int(m.group(4)) * 3600 + int(m.group(5)) * 60 + float(m.group(6))
            n = len(re.sub(r"<[^>]+>|\[.*?\]", "", m.group(7)).split())
            W += [a + (b - a) * i / max(1, n) for i in range(n)]
    return sorted(set(round(w, 2) for w in W))


if wsrc.endswith(".vtt"):
    W = words_vtt(wsrc)
else:
    p, _, k = wsrc.rpartition(":") if wsrc.count(":") > 1 or not wsrc.endswith(".json") else (wsrc, "", "")
    k = float(k or 1)
    V = json.load(open(p, encoding="utf8"))
    W = [w["start"] * k for b in V["beats"] for w in b["words"]]
W = np.array(W)

# speech mask: a word is "speaking" from its start to the next word (max 0.6 s)
hop = 256
fr = lambda t: int(t * SR / hop)
n = 1 + len(y) // hop
speech = np.zeros(n, bool)
for a, b in zip(W, np.append(W[1:], W[-1] + 0.4)):
    speech[fr(a):fr(min(b, a + 0.6))] = True
rms = np.concatenate([librosa.feature.rms(y=y[c:c + 20 * SR], frame_length=1024, hop_length=hop)[0][: len(y[c:c + 20 * SR]) // hop] for c in range(0, len(y), 20 * SR)])[:n]
db = 20 * np.log10(rms + 1e-6)
sp_db = np.median(db[speech[:len(db)]])
gap = ~speech[:len(db)]
gap_db = db[gap]

# gaps (no word for ≥ 0.4 s)
gaps = []
i = 0
while i < len(gap):
    if gap[i]:
        j = i
        while j < len(gap) and gap[j]:
            j += 1
        L = (j - i) * hop / SR
        if L >= 0.4:
            gaps.append((i * hop / SR, L, float(np.median(db[i:j]))))
        i = j
    else:
        i += 1
silent = [g for g in gaps if g[2] < sp_db - 35]

# SFX/percussive onsets: strong transients in the percussive part
# chunked (60 s) so a 20-min video fits in little RAM
CH = 20 * SR
envs, Cs, Ms = [], [], []
hop2 = SR // 2
for c0 in range(0, len(y), CH):
    yc = y[c0:c0 + CH]
    if len(yc) < SR:
        break
    Hs, Ps = librosa.decompose.hpss(librosa.stft(yc, n_fft=512, hop_length=hop))
    envs.append(librosa.onset.onset_strength(S=librosa.amplitude_to_db(np.abs(Ps)), sr=SR, hop_length=hop)[: len(yc) // hop])
    Hc = librosa.istft(Hs, hop_length=hop, length=len(yc))
    Cs.append(librosa.feature.chroma_stft(y=Hc, sr=SR, n_fft=1024, hop_length=hop2)[:, : len(yc) // hop2])
    Ms.append(librosa.feature.mfcc(y=Hc, sr=SR, n_fft=1024, hop_length=hop2, n_mfcc=13)[:, : len(yc) // hop2])
    del Hs, Ps
env = np.concatenate(envs)
ons = librosa.onset.onset_detect(onset_envelope=env, sr=SR, hop_length=hop, units="time", delta=0.25)
ons_gap = [t for t in ons if fr(t) < len(gap) and gap[fr(t)]]

# music changes: novelty on chroma+mfcc of the harmonic part, 1 s frames, 12 s checkerboard
C, M = np.hstack(Cs), np.hstack(Ms)
F = np.vstack([C / (np.linalg.norm(C, axis=0) + 1e-6), (M - M.mean(1, keepdims=True)) / (M.std(1, keepdims=True) + 1e-6) * 0.3])
k = 6
Fn = F / (np.linalg.norm(F, axis=0, keepdims=True) + 1e-6)
g = np.outer(np.sign(np.arange(-k, k) + 0.5), np.sign(np.arange(-k, k) + 0.5)) * np.exp(-((np.arange(-k, k) / k) ** 2))[:, None] * np.exp(-((np.arange(-k, k) / k) ** 2))[None, :]
nov = np.zeros(F.shape[1])
for t in range(k, F.shape[1] - k):
    blk = Fn[:, t - k:t + k]
    S = blk.T @ blk  # local similarity only (no full matrix)
    nov[t] = (S * g).sum()
nov = np.maximum(nov, 0)
thr = np.percentile(nov, 85)
peaks = [t for t in range(1, len(nov) - 1) if nov[t] > thr and nov[t] >= nov[t - 1] and nov[t] >= nov[t + 1]]
pk = []
for t in peaks:
    if not pk or t - pk[-1] > 8:
        pk.append(t)
changes = [round(t * hop2 / SR, 1) for t in pk]

per_min = lambda arr: [int(((np.array(arr) >= m * 60) & (np.array(arr) < (m + 1) * 60)).sum()) for m in range(int(np.ceil(dur / 60)))]
res = dict(
    dur=round(dur, 1),
    words=len(W),
    wpm=round(len(W) / (dur / 60), 1),
    wpm_per_min=per_min(W),
    speech_db=round(float(sp_db), 1),
    gap_bed_db_rel=round(float(np.median(gap_db) - sp_db), 1),
    gaps_per_min=round(len(gaps) / (dur / 60), 1),
    gap_median_s=round(float(np.median([g[1] for g in gaps])) if gaps else 0, 2),
    silences=len(silent),
    silence_times=[round(g[0], 1) for g in silent][:40],
    onsets_per_min=round(len(ons) / (dur / 60), 1),
    onsets_in_gaps_per_min=round(len(ons_gap) / (dur / 60), 1),
    onsets_per_min_series=per_min(ons),
    music_changes=len(changes),
    music_changes_per_min=round(len(changes) / (dur / 60), 2),
    music_change_times=changes,
)
json.dump(res, open(out, "w"), indent=1)
print(json.dumps({k: v for k, v in res.items() if not isinstance(v, list)}))
