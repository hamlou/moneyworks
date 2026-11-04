# AUTOPILOT: make a full video by writing ONE JSON file

Any AI (Gemini CLI, Qwen Code, ChatGPT) or a person can make an ea1-quality video. **You never write code.** You write
`pipeline/auto/<id>.json`. The templates, timing, sound, music and render are all automatic.

## 1. Commands (run in the `moneyworks` folder)
```
py tools/auto.py check <id>    # fix every ✗ until "SPEC OK"
py tools/auto.py all <id>      # voice → plan → 3D shots → final video in videos/<id>/  (1-3 h, all free on GitHub)
```
If a step fails, read the ✗ line. It tells you exactly what to change in the JSON. Fix it and run the same command again.
Other commands: `voice`, `build`, `qa`, `shots`, `render` (the steps of `all`, one by one).

## 2. Writing rules (`check` enforces most of them)
- Dave talks to "you" in natural connected sentences. No commas. No digits ("thirty three million"). No chains of tiny fragments.
- HOOK (3-6 lines, ~12 s): line 1 = the most spectacular TRUE result with a number (a moving 3D shot at frame 0 + a count),
  line 2 = the twist, line 3 = the QUESTION (= the title, ends with "?", `"open": ["L1"]`), last line = the promise to "you".
- 3-9 chapters. Every 20-40 s a mini-loop: claim → result with a number → 1-3 word punch line (`"punch": true`).
- LOOPS: L1 closes only in the last chapter. Open ≥ 1 more loop in the hook. Every chapter opens a teaser loop that stays open.
  ≥ 2 loops must span 2+ chapters. Close every loop. Use `"open": ["L2"]` and `"close": ["L2"]` on lines.
- One running gag repeated 4-6 times (`"gag": true`). One "have a guess". One fake-out near the end. The last chapter asks a
  comment question. `"signoff"` = Dave's fixed last line.
- Facts: every factual line has `"src": "S3"`, and every Sx is in `sources`. Quotes in `macro` must be VERBATIM.
- Visuals: something new at least every 3 s. ≥ 50 % 3D. Never 3 cards (macro/home/photo) in a row. Each visual shows the
  exact words being said, plus a gag.
- Topics: deep systemic money truths for everyone (see memory/topic list). No politics names in titles. No memes, no thumbnails.

## 3. The file
```json
{
  "id": "au1", "title": "Why Hard Work Stopped Making You Rich", "outfit": "hoodie",
  "signoff": "I am Dave and I am still broke but now I know why.",
  "sources": [{"id": "S1", "short": "BLS, 2025", "url": "https://...", "fact": "what it proves"}],
  "shots": {
    "H": {"tpl": "rain", "item": "cash"},
    "S": {"tpl": "chair_spin"},
    "T": {"tpl": "towers", "a": 60, "b": 12}
  },
  "hook": {"mood": "tense", "lines": [
    {"say": "...", "src": "S1", "show": [
      {"v": "shot", "shot": "H"},
      {"v": "count", "to": 33000000, "prefix": "$", "color": "green"},
      {"on": "stop", "v": "text", "text": "TO STOP 1 MAN", "color": "red"}]},
    {"say": "... ?", "open": ["L1", "L2"], "show": [{"v": "shot", "shot": "S"}]}
  ]},
  "chapters": [
    {"title": "DAY 1", "mood": "comic", "set": ["T", 2], "lines": [
      {"say": "...", "src": "S1", "show": [{"v": "shot", "shot": "T"}, {"on": "sixty", "v": "text", "text": "60 HOURS"}]},
      {"say": "Nothing.", "punch": true, "gag": true, "show": [{"v": "pose", "pose": "neutral_shrug"}]}
    ]}
  ]
}
```
- `say` = the spoken line (≤ 40 words). `show` = what is on screen, in order. `on` = the spoken word where it appears
  (the first event of a line has no `on` and starts with the line). `n` = which repeat of that word (0 = first).
- `set` = [shot letter, second]: the blurred backdrop behind Dave's poses in that chapter. Also used for the chapter title card.
- `mood` (chapter or line): tense | comic | sad | think | hype. Changing mood switches the music.

### Backgrounds (each replaces the picture)
| v | params | what you see |
|---|---|---|
| shot | shot, from? (s) | 3D shot playing (continues where it was if used again) |
| still | shot, t (s), pose? | one frozen 3D frame with a slow push; with pose = Dave cut-out on it, blurred |
| pose | pose | Dave cut-out on the chapter's blurred set (reactions, jokes) |
| macro | lines [above, "x [HIGHLIGHT] y", below], far? | extreme close-up of a real printed quote |
| home | pose? | dark home base + Dave (put `bars`/`checks` on it) |
| photo | file (in public/<id>/), label? | free-licence photo on a card |

Poses: shock_panic smug_point_you determined_present think_think neutral_shrug grin_cheer determined_point_l sleep_slump

### Overlays (stack on the picture until the next background)
| v | params |
|---|---|
| text | text (≤ 30 chars), color?, size? |
| count | to (number), prefix?, suffix?, dec?, color? |
| burst | word (≤ 12 chars), a comic burst for the punch |
| stamp | text, color?: a big rotated stamp ("IT DID NOT WORK") |
| bars | rows [["label", 48.4, "blue"], ...] |
| checks | title?, rows [["text", "sub"], ...] |
| sfx | sound (names in tools/auto.py SFX): an extra sound |
Colors: white yellow red green blue. Any event can also have `"sfx": "<name>"`.

## 4. 3D shot templates (`shots`: one capital letter → template + params)
| tpl | params | scene |
|---|---|---|
| rain | item ("cash" or a word), label?, dave? (false = into the lens: best frame 0) | stuff rains from the sky |
| office_walk | flags? | Dave walks into a big office, presents the giant chair |
| chair_spin | flags? | ★ Dave spins round in the big chair (owner-loved) |
| lamp | flags? | ★ dusk, one lamp, push-in, Dave points at you (owner-loved, endings) |
| desk_paper | paper (text) | a folder with the text slides in, Dave reads it |
| sign_topple | paper, giant | Dave signs, a giant card with `giant` text topples |
| receipt | total | a receipt unrolls to the lens, last piece = total text |
| street | sign, n?, k? | street of n houses, k get a sign |
| seats | n?, lit?, color? | half-circle of seats lighting up to `lit` |
| ring | headlines [≤ 8 texts] | boxing ring, headlines fly at Dave |
| grid | n?, k? | n small buildings, k light red |
| walls | walls [1-3 texts], dest?, sign? | walls slam up between Dave and a building |
| flyaway | paper, dest?, sign? | a paper flies from Dave's mailbox to a far tower |
| room | paper, screen? | small apartment, bill on the door, laptop glow |
| towers | a, b | two cash towers (a red bales, then b blue) |
| building_walk | dest? (tower/capitol), sign? | tiny Dave walks up to a huge bank tower |
| headlines | headlines [≤ 8] | newspapers rain onto a desk (frame-0 hook) |
Every shot may take `outfit` (hoodie suit doctor professor muscle), which swaps the costume for that role.
Use 6-14 shots per video. Re-use a shot across neighbouring lines (it keeps playing) instead of defining a new one.

## 5. Free AI setup (no Claude needed)
- Gemini CLI: `npm i -g @google/gemini-cli` → `gemini` in this folder (free with a Google account). It reads `GEMINI.md`.
- Qwen Code (backup when Gemini's quota runs out): `npm i -g @qwen-code/qwen-code` → `qwen`.
- Prompt: *"Read AUTOPILOT.md. Research <topic> (max 6 searches). Write pipeline/auto/<id>.json following every rule. Run
  py tools/auto.py check <id> and fix until SPEC OK. Then run py tools/auto.py all <id> and fix any ✗ it prints."*
