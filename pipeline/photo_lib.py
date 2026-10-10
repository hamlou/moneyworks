import html
import json
import re
import time
import urllib.parse
import urllib.request

UA = "MoneyworksEdu/1.0 (educational YouTube explainer; github.com/hamlou) python-urllib"
API = "https://commons.wikimedia.org/w/api.php"
OK_LICENSE = re.compile(r"^(pd|public domain|cc0|cc[- ]by([- ]sa)?[- ]?[0-9.]*|cc[- ]pd|no restrictions|attribution|pdm)", re.I)
BAD_LICENSE = re.compile(r"(-nc|-nd|non.?commercial|no.?deriv|fair use|copyrighted$)", re.I)


def get(url, tries=5, binary=False):
    err = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
            return data if binary else data.decode("utf-8")
        except Exception as e:  # network is flaky; 429 needs a real wait
            err = e
            time.sleep(3 + i * 5)
    raise SystemExit(f"download failed: {url} ({err})")


def strip(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()


def _rec(p, ii):
    md = ii.get("extmetadata", {})
    v = lambda k: strip(md.get(k, {}).get("value", ""))
    return {
        "title": p["title"], "url": ii["url"], "thumb": ii.get("thumburl", ii["url"]), "w": ii["width"], "h": ii["height"], "mime": ii.get("mime", ""),
        "license": v("LicenseShortName") or v("License"), "credit": (v("Artist") or v("Credit") or "Wikimedia Commons")[:90],
        "page": ii.get("descriptionurl", ""), "desc": v("ImageDescription")[:120],
    }


def info(titles, width=1600):
    """Commons metadata for File: titles -> {title: {url, thumb, w, h, license, credit, page}}"""
    out = {}
    for i in range(0, len(titles), 20):
        q = urllib.parse.urlencode({
            "action": "query", "format": "json", "prop": "imageinfo", "titles": "|".join(titles[i:i + 20]),
            "iiprop": "url|size|extmetadata|mime", "iiurlwidth": width,
        })
        data = json.loads(get(f"{API}?{q}"))
        norm = {n["to"]: n["from"] for n in data.get("query", {}).get("normalized", [])}
        for p in data.get("query", {}).get("pages", {}).values():
            ii = (p.get("imageinfo") or [None])[0]
            if not ii:
                continue
            rec = _rec(p, ii)
            out[p["title"]] = rec
            if p["title"] in norm:
                out[norm[p["title"]]] = rec
    return out


def license_ok(lic):
    return bool(lic) and bool(OK_LICENSE.search(lic.strip())) and not BAD_LICENSE.search(lic)


def search(query, n=12):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "generator": "search", "gsrsearch": f"{query} filetype:bitmap", "gsrnamespace": 6, "gsrlimit": n,
        "prop": "imageinfo", "iiprop": "url|size|extmetadata|mime", "iiurlwidth": 640,
    })
    data = json.loads(get(f"{API}?{q}"))
    pages = sorted(data.get("query", {}).get("pages", {}).values(), key=lambda x: x.get("index", 0))
    return [_rec(p, p["imageinfo"][0]) for p in pages if p.get("imageinfo")]
