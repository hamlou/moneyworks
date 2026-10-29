"""CMU motion capture (free for any use incl. commercial — CMU Graphics Lab, BVH conversion by B. Hahne / cgspeed),
mirrored at github.com/Shriinivas/cmubvh. python3 blender/fetch_mocap.py <outdir> 02_01 02_03 ...  → <outdir>/mocap/<id>.bvh
Useful ids: 02_01 walk · 02_03 run/jog · 02_04 jump · 02_05 punch · 13_29 jumping jacks · 05_02 dance (see the repo READMEs)."""
import io, os, sys, zipfile, urllib.request

SEQ = [(1, 9), (10, 14), (15, 19), (20, 29), (30, 34), (35, 39), (40, 45), (46, 56), (60, 75), (76, 80), (81, 85), (86, 94), (102, 111), (113, 128), (131, 135), (136, 140), (141, 144)]


def folder(subject):
    for a, b in SEQ:
        if a <= subject <= b:
            return f"Sequence-{a:03d}-{b:03d}"
    raise ValueError(subject)


def main():
    out = os.path.join(sys.argv[1], "mocap")
    os.makedirs(out, exist_ok=True)
    for mid in sys.argv[2:]:
        dst = os.path.join(out, mid + ".bvh")
        if os.path.exists(dst):
            continue
        subj = mid.split("_")[0]
        url = f"https://github.com/Shriinivas/cmubvh/raw/main/{folder(int(subj))}/{subj}/Data/{mid}.zip"
        data = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "moneyworks"}), timeout=120).read()
        z = zipfile.ZipFile(io.BytesIO(data))
        name = next(n for n in z.namelist() if n.lower().endswith(".bvh"))
        open(dst, "wb").write(z.read(name))
        print("mocap", mid, len(data))


if __name__ == "__main__":
    main()
