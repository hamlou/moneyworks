# Brief for parallel episode builders (Series 2)

You build ONE episode of the YouTube channel "Dave Explains Money", matching the approved style exactly.

## Read first (mandatory)
1. `PLAYBOOK.md` (whole file). Note: real word target is ~1,250–1,350 spoken words, 9 chapters → 8:10–9:30. Tested: 1,230 words ≈ 8:50.
2. Study the most recent episodes as templates: `pipeline/episodes/ep13.json` + `src/episodes/Ep13.tsx`, and `ep12`, `ep14`. Copy their structure (hook `o1..o6`, chapters, recap, next-episode teaser, subscribe beat), SFX usage, `G2`, `scene()`, `A()`, SubReminder + subCues, end SubButton/Bell.
3. Props available: `src/props.tsx` … `src/props8.tsx` (read props8 fully: Jet, MilesCard, Egg, Warehouse, HotDog, Chicken, MemberCard, Pallet, Receipt, Cart, Bottle, AppleTree, Yacht, Tombstone, Paycheck, Scale, ScoreGauge, Star, Notepad, SlicePie, PriceBoard …).
4. Thumbnails: `src/v2/kit.tsx` and examples in `src/v2/s2.tsx` (v2 style: giant emotional Face on one side, ONE big Hero object, 1–3 word Headline, Stage gradient; text must not repeat the title).

## Hard rules
- **Dave is the main character of every video** (`acc={['hair']} seed={7}`). Story follows Dave's problem/question.
- Beginner level, short sentences, funny concrete analogies, numbers spelled out as words for TTS. Callbacks to earlier episodes welcome (duck = money creation, raccoon = fees/interest).
- Every number from a current, official/primary source (web search). Put sources in the JSON `sources` and `<SourceTag>` on screen. Balanced on politics. Say "Education, not advice" in the practical chapter.
- **Never an empty screen**: every scene must show a title/character/placeholder from its first frame; things that pop on a later word must not leave the scene blank before.
- No emoji in SVG text. No real logos.
- Validate: `py pipeline/validate.py epNN` must print OK and duration ≥ 480 s (aim ≥ 500 s). If short, add beats and re-run TTS.
- Typecheck: `npx tsc --noEmit -p .` (node_modules is installed locally) must be clean.

## Files YOU may create (only these — other builders work in parallel)
- `pipeline/episodes/epNN.json`
- `src/episodes/EpNN.tsx` exporting `EpNN`
- `src/propsNN.tsx` for any new props (do NOT edit props1-8)
- `src/v2/tNN.tsx` exporting `V2EpNN` (thumbnails A/B/C)
- `pipeline/seo_epNN.json` with keys: title (40–65 chars, keyword first), alts [2], line1 (≤150 chars), summary, learn [6], tags [11, last = "dave explains money"], hashtags [3], pinned, thumb, next (null)
- `public/epNN/timings.json` (made by the TTS script)
Do NOT edit: Episode.tsx, Root.tsx, v2/index.tsx, seo.py, props*.tsx 1–8, PLAYBOOK, any other episode. Do NOT git commit/push. Do NOT trigger renders. The lead integrates, renders and QAs.

To typecheck your episode before integration, temporarily it is fine that it is not registered; tsc still checks all files under src.

## TTS (voice timings) — runs on the VPS, safe in parallel
`bash "C:/Users/hp/AppData/Local/Temp/claude/C--Users-hp-Desktop-100/b921bd7e-0ddd-4b48-98e9-abd3fb76d265/scratchpad/tts.sh" epNN`
(uploads the JSON, runs edge-tts on the VPS, downloads `public/epNN/timings.json`, then runs validate.py — validate fails until EpNN.tsx exists; that's fine). Check duration with:
`py -c "import json;t=json.load(open('public/epNN/timings.json'));print(t['total'])"`
The connection is flaky: if it fails, just re-run it.

## Workflow
research → JSON script → TTS → check duration (extend if < 500 s) → EpNN.tsx (use only words that are really in each beat for `w()`) → validate OK → propsNN / thumbnails → tsc clean → seo_epNN.json → final report: file list, duration, any concerns.
