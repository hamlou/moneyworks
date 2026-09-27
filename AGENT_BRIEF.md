# Brief for parallel episode builders (Series 4: ep31–ep40)

You build ONE episode of the YouTube channel "Dave Explains Money", matching the approved style exactly.

## Read first (mandatory)
1. `PLAYBOOK.md` (whole file). Note: real word target is ~1,250–1,350 spoken words, 9 chapters → 8:10–9:30. Tested: 1,230 words ≈ 8:50.
2. Study the most recent episodes as templates: `pipeline/episodes/ep29.json` + `src/episodes/Ep29.tsx`, and `ep28`, `ep30` (also skim ep23/ep17 for the 'who profits' storytelling). Copy their structure (hook `o1..o6`, chapters, recap, next-episode teaser, subscribe beat), SFX usage, `G2`, `scene()`, `A()`, SubReminder + subCues, end SubButton/Bell.
3. Props available: `src/props.tsx` … `src/props8.tsx` (read props8 fully: Jet, MilesCard, Egg, Warehouse, HotDog, Chicken, MemberCard, Pallet, Receipt, Cart, Bottle, AppleTree, Yacht, Tombstone, Paycheck, Scale, ScoreGauge, Star, Notepad, SlicePie, PriceBoard …).
4. Do NOT make thumbnails — the lead makes all thumbnails with an upgraded kit. In your final report, suggest 3 thumbnail concepts (object + emotion + 1–3 words that don't repeat the title).

## Hard rules
- **"THAT'S MY PROBLEM" RULE (PLAYBOOK §1b — owner's #1 topic rule).** The episode is about a pain the viewer feels in their own wallet. Cold open: Dave LIVES the problem (checks his account, sees the bill, taps the tip screen) in the first 5 s so the viewer thinks "that's literally me". Then reveal the hidden reason / who profits, with official numbers. End with a practical fix chapter. Talk to the viewer as "you". Title is about YOU, everyday words, no jargon.
- **Dave is the main character of every video** (`acc={['hair']} seed={7}`). Story follows Dave's problem/question.
- Beginner level, short sentences, funny concrete analogies, numbers spelled out as words for TTS. Callbacks to earlier episodes welcome (duck = money creation, raccoon = fees/interest).
- Every number from a current, official/primary source (web search). Put sources in the JSON `sources` and `<SourceTag>` on screen. Balanced on politics. Say "Education, not advice" in the practical chapter.
- **NO EMPTY SCENES (the owner's #1 complaint).** Rule: *everything that belongs to a scene is ON SCREEN from the scene's first frames* (pop in within the first ~10 frames of the scene, i.e. `pop(f, A('beat') + small)`), and the narration-synced moments only EMPHASISE it: highlight, grow, color change, shake, a check mark, a number counting up, an arrow appearing next to an existing object. Bars start at a visible baseline height (not 0) and grow on the word; list rows are all visible dimmed and light up on the word; values show as "?" and flip to the number on the word. Never leave half the screen blank waiting for a word. Each scene should have a clear 3-part layout (character + main object + label/number), filling the frame.
- **Mandatory check (runs in the CLOUD, never on the owner's PC — his disk is full):** push is done by the lead, so ask the lead via your final report if needed; otherwise run it yourself:
  `GH=/c/Users/hp/AppData/Local/ghcli/bin/gh.exe; git add pipeline/episodes/epNN.json src/episodes/EpNN.tsx src/propsNN.tsx && git -c user.name=Hamza -c user.email=noreply@users.noreply.github.com commit -m "epNN wip" && git push` then `$GH workflow run qa.yml -R hamlou/moneyworks -f ep=epNN`, wait (~10 min; `$GH run list -R hamlou/moneyworks -w qa.yml -L 5`), then `$GH run download <runId> -R hamlou/moneyworks -n epNN-qa -D ../qa_dl/epNN` and read report.txt + sheet.jpg (flagged beats: start frame | end frame). Fix every FLAG and repeat until `0 flagged`. Delete ../qa_dl/epNN afterwards. The network is flaky: retry gh/git commands in a loop. Other builders commit in parallel: commit ONLY your own paths (`git commit <paths>`), retry if `.git/index.lock` exists, and `git pull --rebase` before `git push`.
- NEVER render frames or run qa_empty.py locally (no disk space). Only one-off single stills are allowed if truly needed, and delete them right away.
- Contact email for any website that asks: use none; never put the owner's email anywhere.
- No emoji in SVG text. No real logos.
- Validate: `py pipeline/validate.py epNN` must print OK and duration ≥ 480 s (aim ≥ 500 s). If short, add beats and re-run TTS.
- Typecheck: `npx tsc --noEmit -p .` (node_modules is installed locally) must be clean.

## Files YOU may create (only these — other builders work in parallel)
- `pipeline/episodes/epNN.json`
- `src/episodes/EpNN.tsx` exporting `EpNN`
- `src/propsNN.tsx` for any new props (do NOT edit props1-8)
- `pipeline/seo_epNN.json` with keys: title (40–65 chars, keyword first), alts [2], line1 (≤150 chars), summary, learn [6], tags [11, last = "dave explains money"], hashtags [3], pinned, thumb, next (null)
- `public/epNN/timings.json` (made by the TTS script)
Do NOT edit: Episode.tsx, Root.tsx, v2/index.tsx, seo.py, props*.tsx 1–8, PLAYBOOK, any other episode. Do NOT git commit/push. Do NOT trigger renders. The lead integrates, renders and QAs.

Episodes and thumbnails are auto-registered (any src/episodes/EpNN.tsx exporting `EpNN`), so qa_empty.py and stills work as soon as your file exists.

## TTS (voice timings) — runs on the VPS, safe in parallel
`bash "C:/Users/hp/AppData/Local/Temp/claude/C--Users-hp-Desktop-100/b921bd7e-0ddd-4b48-98e9-abd3fb76d265/scratchpad/tts.sh" epNN`
(uploads the JSON, runs edge-tts on the VPS, downloads `public/epNN/timings.json`, then runs validate.py — validate fails until EpNN.tsx exists; that's fine). Check duration with:
`py -c "import json;t=json.load(open('public/epNN/timings.json'));print(t['total'])"`
The connection is flaky: if it fails, just re-run it.

## Workflow
research → JSON script → TTS → check duration (extend if < 500 s) → EpNN.tsx (use only words that are really in each beat for `w()`) → validate OK → propsNN → tsc clean → qa_empty.py until clean → seo_epNN.json → final report: file list, duration, any concerns.
