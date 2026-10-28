"""Download CC0 Poly Haven assets for the Blender shots (no login, CC0 licence).
python3 blender/fetch.py <outdir> <model_id> [model_id ...]
Also picks a wood floor, a plaster wall texture and an indoor HDRI → <outdir>/manifest.json."""
import json, os, sys, urllib.request

UA = {"User-Agent": "moneyworks-blender/1.0"}
API = "https://api.polyhaven.com"


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return r.read()


def js(url):
    return json.loads(get(url))


def save(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "wb").write(get(url))


def model(out, mid, res="1k"):
    g = js(f"{API}/files/{mid}")["gltf"]
    g = g.get(res) or next(iter(g.values()))
    g = g["gltf"]
    base = os.path.join(out, "models", mid)
    save(g["url"], os.path.join(base, os.path.basename(g["url"])))
    for rel, inc in g.get("include", {}).items():
        save(inc["url"], os.path.join(base, rel))


def pick(ids, prefs, contains):
    for p in prefs:
        if p in ids:
            return p
    for i in sorted(ids):
        if all(c in i for c in contains):
            return i
    return sorted(ids)[0]


def texture(out, tid, res="1k"):
    f = js(f"{API}/files/{tid}")
    got = {}
    for key, name in (("Diffuse", "diff"), ("Rough", "rough"), ("nor_gl", "nor")):
        if key in f:
            m = f[key].get(res) or next(iter(f[key].values()))
            u = m["jpg"]["url"] if "jpg" in m else next(iter(m.values()))["url"]
            p = os.path.join(out, "tex", tid, f"{name}{os.path.splitext(u)[1]}")
            save(u, p)
            got[name] = os.path.relpath(p, out)
    return got


def main():
    out, mids = sys.argv[1], sys.argv[2:]
    for m in mids:
        model(out, m)
        print("model", m)
    tex = js(f"{API}/assets?t=textures")
    floor = pick({k for k, v in tex.items() if "floor" in " ".join(v.get("categories", []))},
                 ["wood_floor", "laminate_floor_02", "wood_floor_deck", "herringbone_parquet", "wood_floor_worn"], ["wood"])
    wall = pick(set(tex), ["painted_plaster_wall", "beige_wall_001", "plastered_wall", "white_plaster_02", "plastered_wall_02"], ["plaster"])
    hdris = js(f"{API}/assets?t=hdris&c=indoor")
    hdri = next((h for h in ["school_hall", "classroom", "empty_classroom", "small_empty_room_1", "artist_workshop"] if h in hdris), sorted(hdris)[0])
    h = js(f"{API}/files/{hdri}")["hdri"]["1k"]["hdr"]["url"]
    hp = os.path.join(out, "hdri", f"{hdri}.hdr")
    save(h, hp)
    man = {"floor": texture(out, floor), "wall": texture(out, wall), "hdri": os.path.relpath(hp, out), "ids": {"floor": floor, "wall": wall, "hdri": hdri}}
    json.dump(man, open(os.path.join(out, "manifest.json"), "w"), indent=1)
    print(json.dumps(man["ids"]))


if __name__ == "__main__":
    main()
