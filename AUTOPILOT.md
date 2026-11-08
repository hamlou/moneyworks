# AUTOPILOT: make a full video by writing ONE JSON file

Any AI (Gemini CLI, Qwen Code, ChatGPT) or a person can make an ea1-quality video. **You never write code.** You write
`pipeline/auto/<id>.json`. The templates, timing, sound, music and render are all automatic.

## 1. Commands (run in the `moneyworks` folder)
```
py tools/auto.py check <id>    # fix every ✗ until "SPEC OK"
py tools/auto.py all <id>      # voice → plan → 3D shots → final video in videos/<id>/  (1-3 h, all free on GitHub)
# PC is weak: if a waiting command gets killed, the GitHub job keeps going. Resume with
#   py tools/auto.py shots <id> --resume   then   py tools/auto.py render <id> --resume
# videos/<id>/compare.md = cuts/pace/frozen/loudness vs the ea1 reference (OK / WORSE per line). Fix every WORSE.
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

## 2b. CREATIVE IDENTITY — every video must feel like its own production
Top of the spec: `"look": {"style": "...", "format": "...", "hook_form": "..."}`. `check` refuses the style or format of the last 2 episodes
and the hook_form of the last one.
- style (colour grade + headline font + palette): comic, noir, neon, documentary, cold, retro, marker, punch.
  Match the topic: scams/debt → noir or cold; tech/apps → neon; history/how it started → documentary or retro; daily life → comic or marker.
- format = the STORY ENGINE. Write the whole script inside it:
  experiment (Dave tests it on himself: goal + deadline + scoreboard) · story (one day of one person) · countdown (ranked, worst last) ·
  myth_bust (what everyone believes → proof) · trial (company/habit on trial, "you" are the judge) · heist (how they take your money as a heist plan) ·
  game_show (you are the contestant, each round costs money) · investigation (follow one dollar from your wallet to who gets it) ·
  time_travel (same money in the past / now / future) · simulation (two versions of you choose differently, watch both).
- hook_form: question, shocking_number, cold_open (start mid-scene), challenge (dare the viewer), mistake (the error you are making right now),
  prediction (what happens to your money next), confession (Dave admits something).
- VIRAL basics (no exceptions): the title is a question or a withheld result a 12-year-old understands; the first frame already shows the prize;
  every chapter ends on a new open question; one surprising TRUE number per chapter; one running joke that pays off at the end.

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

- (OFF — owner 8 Nov: copyright risk; check rejects it) `{"v": "clip", "query": "what the footage shows", "start": 0}` = REAL YouTube footage (≤ 8 s, max 6 per video). GitHub only takes videos
  YouTube marks Creative Commons (CC BY), mutes them, credits the creator on screen + in the description. No CC match → the home set shows instead.
  Use it for real-world proof: a protest, a city street, a factory, a news-style establishing shot. Dave keeps talking over it.

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

## 4. 3D shots — USE `scene` (min 6 per video). The old ea1 sets below: max 2 per video.
`scene` builds the set from YOUR line with free CC0 Poly Haven ids from `pipeline/ASSETS.md` (check rejects unknown ids):
`{"tpl": "scene", "sky": "<place id>", "ground": "<texture id>", "room": "<texture id = indoor walls>", "props": ["<model id>", ... max 6],
"hero": "<model id = THE object the line names>", "hero_fx": "drop|pop|spin|slide|pile", "hero_size": 0.5, "n": 20 (pile count),
"sign": "WORDS ON A 3D BOARD (≤ 40 chars)", "move": "push|orbit|crane|dolly|low|top", "dave": "stand|walk_in|none", "pose": "...", "face": "..."}`
- sky = WHERE the line happens (shop, bank hall, night street, bedroom, dawn field). ≥ 4 different skies per video; avoid skies of past episodes.
- hero/props = WHAT the line names. No exact model? Use the closest object + a `sign` with the words.
- ≥ 3 different camera moves. pose: idle hold look panic fists point_l point_you shrug count cheer sleep read slump.
  face: neutral shock think spiral panic grin determined smug sleep dead.

Old ea1 sets (max 2):
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
- EASIEST: free Gemini key from https://aistudio.google.com/apikey → `set GEMINI_API_KEY=<key>` → 
  `py tools/write.py <id> "<topic idea>"` (researches with Google Search, writes the spec, loops on `check` until SPEC OK)
  → `py tools/auto.py all <id>`.
- Gemini CLI: `npm i -g @google/gemini-cli` → `gemini` in this folder (free with a Google account). It reads `GEMINI.md`.
- Qwen Code (backup when Gemini's quota runs out): `npm i -g @qwen-code/qwen-code` → `qwen`.
- Prompt: *"Read AUTOPILOT.md. Research <topic> (max 6 searches). Write pipeline/auto/<id>.json following every rule. Run
  py tools/auto.py check <id> and fix until SPEC OK. Then run py tools/auto.py all <id> and fix any ✗ it prints."*

## 6. Fully on GitHub (owner PC not needed)
`.github/workflows/episode.yml` does everything on GitHub. `gh` = `%LOCALAPPDATA%\ghcli\bin\gh.exe`.
1. Script (Gemini, repo secret `GEMINI_API_KEYS`):
   `gh workflow run episode.yml -R hamlou/moneyworks --ref shorts-playbook-rules -f id=au3 -f topic="..." -f stage=script`
   → commits `pipeline/auto/au3.json` + `videos/au3/script.md`; read it on release **ref** as `au3-script.md`
   (`gh release download ref -R hamlou/moneyworks -p au3-script.md`).
2. Happy? Video:
   `gh workflow run episode.yml -R hamlou/moneyworks --ref shorts-playbook-rules -f id=au3 -f stage=video`
   → check → voice (dispatches voice.yml) → build → qa → shots (dispatches blender.yml) → pushes the build outputs, then
   **starts itself again with `stage=render`** (one job may run max 6 h) → v6demo.yml render → uploads `au3.mp4`,
   `au3_send.mp4` (720p watch copy), `au3-compare.md`, `au3-qa_hook.jpg`, `au3-qa_sheet.jpg`, `au3-description.txt` to release **ref**.
- Only the render failed / was cancelled: `... -f id=au3 -f stage=render` (re-uses the saved Blender run in `public/au3/SHOTS_RUN`,
  else takes the last successful `blender au3` run).
- Follow it: `gh run list -R hamlou/moneyworks --workflow episode.yml` (each stage's step summary shows the script / compare).
- Why dispatches: pushes made inside Actions (GITHUB_TOKEN) never trigger push workflows, so `tools/auto.py` in CI mode
  (`CI=true`) runs `gh workflow run voice.yml|blender.yml|v6demo.yml` itself and waits for the run it started.
