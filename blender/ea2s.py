AUTO_EP = "ea2s"  # autopilot stub (tools/auto.py) — the shots are templates in blender/auto.py
import os
exec(compile(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "auto.py"), encoding="utf8").read(), "auto.py", "exec"))
