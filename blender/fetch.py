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


def episode_ids(ep):
    """autopilot: every Poly Haven id named in pipeline/auto/<ep>.json shots (sky, ground, room, props, hero)"""
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "pipeline", "auto", f"{ep}.json")
    if not os.path.exists(p):
        return set(), set(), set()
    m, h, t = set(), set(), set()
    for sh in json.load(open(p, encoding="utf8")).get("shots", {}).values():
        m |= set(sh.get("props", [])) | ({sh["hero"]} if sh.get("hero") else set())
        h |= {sh["sky"]} if sh.get("sky") else set()
        t |= {sh[k] for k in ("ground", "room") if sh.get(k)}
    return m, h, t


def main():
    out, mids = sys.argv[1], sys.argv[2:]
    ep = None
    if "--ep" in mids:
        i = mids.index("--ep")
        ep, mids = mids[i + 1], mids[:i] + mids[i + 2:]
    em, eh, et = episode_ids(ep) if ep else (set(), set(), set())
    mids = list(dict.fromkeys(mids + sorted(em)))
    for m in mids:
        try:
            model(out, m)
            print("model", m)
        except Exception as e:
            print("skip model", m, e)
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
    # real photographed skies per mood (29 Oct: replaces the procedural sky) — the most downloaded HDRI of each category
    man["moods"] = {}
    for mood, cat in (("golden", "sunrise-sunset"), ("day", "skies"), ("night", "night"), ("city", "urban"), ("studio", "studio")):
        try:
            hs = js(f"{API}/assets?t=hdris&c={cat}")
            if mood == "city":  # most-downloaded "urban" is a courtyard interior → prefer real streets
                hs = {k: v for k, v in hs.items() if "outdoor" in v.get("categories", []) and "indoor" not in v.get("categories", [])} or hs
                best = next((k for k in ["potsdamer_platz", "urban_street_01", "urban_street_04", "urban_street_03", "shanghai_bund", "rooftop_night"] if k in hs), None) or max(hs, key=lambda k: hs[k].get("download_count", 0))
            else:
                best = max(hs, key=lambda k: hs[k].get("download_count", 0))
            u = js(f"{API}/files/{best}")["hdri"]["2k"]["hdr"]["url"]
            path = os.path.join(out, "hdri", f"{mood}.hdr")
            save(u, path)
            man["moods"][mood] = os.path.relpath(path, out)
            man["ids"]["hdri_" + mood] = best
        except Exception as e:
            print("skip hdri", mood, e)
    # ground/wall materials for outdoor worlds
    for key_, prefs, cats in (("asphalt", ["asphalt_02", "asphalt_track", "asphalt_pit_lane"], "asphalt"), ("concrete", ["concrete_floor_02", "concrete_pavement", "concrete_wall_008"], "concrete"),
                              ("brick", ["red_brick_03", "red_bricks_04", "brick_wall_001"], "brick"), ("grass", ["aerial_grass_rock", "grass_path_2", "forrest_ground_01"], "grass")):
        try:
            tid = pick({k for k, v in tex.items() if cats in " ".join(v.get("categories", [])) or cats in k}, prefs, [cats])
            man[key_] = texture(out, tid)
            man["ids"][key_] = tid
        except Exception as e:
            print("skip tex", key_, e)
    man["extra"] = {"hdri": {}, "tex": {}}
    for hid in sorted(eh):
        try:
            u = js(f"{API}/files/{hid}")["hdri"]["2k"]["hdr"]["url"]
            path = os.path.join(out, "hdri", f"{hid}.hdr")
            save(u, path)
            man["extra"]["hdri"][hid] = os.path.relpath(path, out)
        except Exception as e:
            print("skip sky", hid, e)
    for tid in sorted(et):
        try:
            man["extra"]["tex"][tid] = texture(out, tid)
        except Exception as e:
            print("skip tex", tid, e)
    json.dump(man, open(os.path.join(out, "manifest.json"), "w"), indent=1)
    print(json.dumps(man["ids"]))


if __name__ == "__main__":
    main()
