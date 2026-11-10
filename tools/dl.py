"""Chunked, resuming downloader (this PC's connection drops transfers over ~1 MB, 10 Nov 2026).
py tools/dl.py <url> <out> [--chunk 400000]   |   py tools/dl.py --repo <path> [ref]  (raw file from hamlou/moneyworks)
Uses HTTP Range requests; retries each piece."""
import sys, os, time, urllib.request

a = sys.argv[1:]
CH = int(a[a.index("--chunk") + 1]) if "--chunk" in a else 400_000
if a[0] == "--repo":
    path, ref = a[1], (a[2] if len(a) > 2 and not a[2].startswith("--") else "shorts-playbook-rules")
    url, out = f"https://raw.githubusercontent.com/hamlou/moneyworks/{ref}/{path}", path
else:
    url, out = a[0], a[1]


def get(rng=None, tries=8):
    for i in range(tries):
        try:
            rq = urllib.request.Request(url, headers={"User-Agent": "dl", **({"Range": rng} if rng else {})})
            with urllib.request.urlopen(rq, timeout=60) as r:
                return r.headers, r.read()
        except Exception as e:
            print("retry", rng, e, flush=True)
            time.sleep(2 + i * 2)
    raise SystemExit(f"failed {url} {rng}")


h, first = get(f"bytes=0-{CH - 1}")
cr = h.get("Content-Range")
total = int(cr.split("/")[1]) if cr else len(first)
os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
part = out + ".part"
with open(part, "wb") as f:
    f.write(first)
    pos = len(first)
    while pos < total:
        _, d = get(f"bytes={pos}-{min(total, pos + CH) - 1}")
        f.write(d)
        pos += len(d)
os.replace(part, out)
print(out, total)
