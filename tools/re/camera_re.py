"""Reverse-engineer CAMERA + COLOUR per shot: locked / push-in / pull-out / pan / shake, zoom speed, brightness, saturation, warmth.
py camera_re.py <mp4> <shots.json or -> <out.json>   (shots '-' = detect cuts here)"""
import json, subprocess, sys
import numpy as np
import cv2

FF = r"C:\Users\hp\Desktop\100\tools\ffmpeg\ffmpeg.exe"
src, shots_p, out = sys.argv[1:4]
FPS, W, H = 5, 256, 144
p = subprocess.Popen([FF, "-v", "error", "-i", src, "-vf", f"fps={FPS},scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
gray, col = [], []
while True:
    b = p.stdout.read(W * H * 3)
    if len(b) < W * H * 3:
        break
    f = np.frombuffer(b, np.uint8).reshape(H, W, 3)
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    ff = f.astype(np.float32)
    col.append((float(ff.mean()), float(ff.std()), float(hsv[..., 1].mean()) / 255, float((ff[..., 2] - ff[..., 0]).mean())))
    gray.append(cv2.cvtColor(f, cv2.COLOR_BGR2GRAY))
n = len(gray)
if shots_p != "-":
    cuts = [s["t"] for s in json.load(open(shots_p))["shots"]]
else:
    d = [0] + [float(np.mean(cv2.absdiff(gray[i], gray[i - 1]))) for i in range(1, n)]
    cuts = [0.0] + [i / FPS for i in range(1, n) if d[i] > 28]
cuts = sorted(set(cuts)) + [n / FPS]

res_shots = []
for a, b in zip(cuts[:-1], cuts[1:]):
    i0, i1 = int(a * FPS) + 1, int(b * FPS) - 1
    if i1 - i0 < 3:
        continue
    zs, tx, ty, jit = [], [], [], []
    for i in range(i0 + 1, i1 + 1):
        p0 = cv2.goodFeaturesToTrack(gray[i - 1], 120, 0.01, 8)
        if p0 is None or len(p0) < 12:
            continue
        p1, st, _ = cv2.calcOpticalFlowPyrLK(gray[i - 1], gray[i], p0, None)
        ok = st.ravel() == 1
        if ok.sum() < 10:
            continue
        M, inl = cv2.estimateAffinePartial2D(p0[ok], p1[ok], method=cv2.RANSAC, ransacReprojThreshold=1.5)
        if M is None or inl.sum() < 8:
            continue
        s = float(np.hypot(M[0, 0], M[1, 0]))
        zs.append(s); tx.append(float(M[0, 2] - (1 - s) * W / 2)); ty.append(float(M[1, 2] - (1 - s) * H / 2))
    if len(zs) < 2:
        kind, zoom, pan = "unknown", 1.0, 0.0
    else:
        zoom = float(np.prod(zs))
        pan = float(np.hypot(np.sum(tx), np.sum(ty))) / W
        jitter = float(np.std(np.diff(tx)) + np.std(np.diff(ty)))
        per_s = (zoom - 1) / max(0.1, (b - a))
        if jitter > 1.2 and pan < 0.15:
            kind = "shake"
        elif zoom > 1.025:
            kind = "push_in"
        elif zoom < 0.975:
            kind = "pull_out"
        elif pan > 0.08:
            kind = "pan"
        else:
            kind = "locked"
    c = np.array(col[i0:i1 + 1])
    res_shots.append(dict(t=round(a, 2), len=round(b - a, 2), cam=kind, zoom=round(zoom, 3), pan=round(pan, 3),
                          lum=round(float(c[:, 0].mean()), 1), contrast=round(float(c[:, 1].mean()), 1),
                          sat=round(float(c[:, 2].mean()), 3), warm=round(float(c[:, 3].mean()), 1)))
tot = sum(s["len"] for s in res_shots) or 1
kinds = {}
for s in res_shots:
    kinds[s["cam"]] = kinds.get(s["cam"], 0) + s["len"]
summary = dict(
    shots=len(res_shots),
    cam_time_pct={k: round(100 * v / tot, 1) for k, v in sorted(kinds.items(), key=lambda x: -x[1])},
    cam_shot_count={k: sum(1 for s in res_shots if s["cam"] == k) for k in kinds},
    push_speed_median=round(float(np.median([(s["zoom"] - 1) / s["len"] for s in res_shots if s["cam"] == "push_in"] or [0])), 4),
    lum=round(float(np.average([s["lum"] for s in res_shots], weights=[s["len"] for s in res_shots])), 1),
    contrast=round(float(np.average([s["contrast"] for s in res_shots], weights=[s["len"] for s in res_shots])), 1),
    sat=round(float(np.average([s["sat"] for s in res_shots], weights=[s["len"] for s in res_shots])), 3),
    warm=round(float(np.average([s["warm"] for s in res_shots], weights=[s["len"] for s in res_shots])), 1),
)
json.dump(dict(summary=summary, shots=res_shots), open(out, "w"), indent=1)
print(json.dumps(summary))
