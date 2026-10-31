"""Loop-method gate for LONG-FORM scripts (owner 31 Oct 2026: "we need more than one loop… every time a new thing should
appear and the payoff only in the end"). Run BEFORE voicing: py tools/loopcheck.py <ep>  (exit 1 = fix the script)

Tags in pipeline/episodes/<ep>_full_script.md (screen notes, never voiced):
  ⟨open:ID what⟩  opens a loop      ⟨close:ID⟩  pays it off
  L1 = the MAIN promise made in the hook (declare on the "Loops:" line at the top).
Rules (stacked loops, not one loop per chapter):
  1. L1 opens in the hook and closes ONLY in the last chapter (the final payoff).
  2. Every chapter except the last ends with a loop still open that was opened in that chapter (a teaser).
  3. At every chapter start ≥ 2 loops are open (the main one + at least one more).
  4. At least 2 loops besides L1 span ≥ 2 chapters (long arcs, not only next-chapter teasers).
  5. Every opened loop is closed; nothing is closed that was never opened.
"""
import re, sys

ep = sys.argv[1]
s = open(f"pipeline/episodes/{ep}_full_script.md", encoding="utf8").read()
s = s[: s.index("## Sources")] if "## Sources" in s else s
parts = re.split(r"\n## Chapter ", s)
head, chapters = parts[0], parts[1:]
tag = re.compile(r"⟨(open|close):(\w+)")
err, open_at, spans = [], {}, {}
for kind, lid in tag.findall(head):
    if kind == "open":
        open_at[lid] = 0
if "L1" not in open_at:
    err.append("L1 (the hook's main promise) is not declared on the Loops: line")
events = []  # (chapter, kind, id)
for ci, ch in enumerate(chapters, 1):
    for kind, lid in tag.findall(ch):
        events.append((ci, kind, lid))
n = len(chapters)
live = dict(open_at)
for ci in range(1, n + 1):
    if len(live) < 2:
        err.append(f"chapter {ci} starts with {len(live)} open loop(s) (need ≥ 2)")
    ev = [(k, i) for c, k, i in events if c == ci]
    opened_here = set()
    for k, i in ev:
        if k == "open":
            live[i] = ci
            opened_here.add(i)
        else:
            if i not in live:
                err.append(f"chapter {ci}: closes {i} which is not open")
                continue
            spans[i] = ci - live.pop(i)
            if i == "L1" and ci != n:
                err.append(f"L1 (main payoff) closes in chapter {ci}, must be the last chapter ({n})")
    if ci < n and not (opened_here & set(live)):
        err.append(f"chapter {ci} ends without a teaser loop still open")
    if ci < n and not live:
        err.append(f"after chapter {ci} nothing is pending")
if live:
    err.append(f"never closed: {sorted(live)}")
long_arcs = [i for i, sp in spans.items() if i != "L1" and sp >= 2]
if len(long_arcs) < 2:
    err.append(f"only {len(long_arcs)} long loop(s) besides L1 span ≥ 2 chapters (need ≥ 2): {long_arcs}")
print(f"{ep}: {n} chapters, loops {sorted(spans)} | long arcs {long_arcs}")
for e in err:
    print("  ✗", e)
print("LOOPS OK" if not err else f"{len(err)} problem(s)")
sys.exit(1 if err else 0)
