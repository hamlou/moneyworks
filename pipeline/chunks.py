import json
import math
import sys
from pathlib import Path

ep, n = sys.argv[1], int(sys.argv[2])
t = json.loads((Path(__file__).resolve().parent.parent / "public" / ep / "timings.json").read_text(encoding="utf-8"))
total = math.ceil((t["total"] + 1.6) * 30)
size = math.ceil(total / n)
parts = [{"i": f"{i:02d}", "a": i * size, "b": min(total, (i + 1) * size) - 1} for i in range(n) if i * size < total]
print(json.dumps(parts, separators=(",", ":")))
