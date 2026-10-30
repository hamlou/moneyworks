# STYLE_3D.md — v6 "3D ANIMATOR" STYLE + v7 STANDARD (owner, 23–29 Oct 2026) — NEWEST, overrides every other rule in this repo where they conflict

**Owner's words:** "I definitely liked this video. The script and the 3D animation are incredibly amazing. This is the type of videos I want my channel to be like. My current videos feel too robotic in the editing. I want it to feel like it's edited by a 3D animator. Copy the way he speaks, his script, the way he montages and the 3D animation. Go more than 99 % with this video style and keep 1 % of our old .md files (no commas and the things that don't conflict). Our voice-over is still too far from this video. Make it the SAME (don't clone the voice, that's illegal)."

**Reference video:** "I posted SLEEPING VIDEOS for 30 days to make GENERATIONAL profits" (3D animator channel, 85.9 K subs, 468 K views in 3 days, 19:16) — https://youtu.be/9yXNBbf3TW0. Everything below was measured on that video (frame sheets every 3 s, scene-cut detection, YouTube word-timed captions), not guessed.

**What we copy:** the FORMAT, the WRITING, the PACE, the EDIT GRAMMAR, the 3D LOOK and the DELIVERY STYLE. **What we never copy:** his character design (the hooded cat-ear mask), his voice, his footage, his music, his jokes word for word, his UI screenshots. Our host stays **Dave** and our words stay ours.

**The 1 % we keep from the old playbooks:** zero commas in spoken text (§0.11 A — his sentences already run on with "and / so / but", it fits perfectly) · Dave hosts in the first person to "you" (§0.12) · research standard + sources (§4) · free-licence photos only, each used once (§0.10 C) · real people only in factual context · "education not advice" · `at`-word anchoring of every visual and sound (UPGRADE.md §4) · thumbnails + SEO tooling (§0.6, §5b) · pipeline/build steps (§8). **Everything else that conflicts with this file is retired** (see §9 for the exact list).

---

## ★★ §0. v7 STANDARD (owner, 28–29 Oct 2026) — THE CURRENT RULES FOR EVERY VIDEO (long-form AND Shorts). Read this first; it wins over every other line in every .md file of this repo.

**Why it exists:** the owner approved the 1-minute test `test1` ("Dave goes back to school", `videos/v6_test1/test1_v3.mp4`, built 29 Oct 2026) after four review rounds. Everything the owner corrected in that session is written here as a hard rule. Old rules that conflict are **retired** (list in §0.9). If a rule below is missing for your case, follow the closest older rule that does NOT conflict with this section.

**Template to copy for every new video:** `pipeline/episodes/test1.json` (script) → `blender/test1.py` + `blender/test1.chunks` (3D pose-state stills) → `src/v6/Test1.tsx` (edit on the voice) → composition registered in `src/v6/Root.tsx`. Never rebuild the kit; add new states/props/sets to `blender/` and new components to `src/v6/`.

### 0.1 Script — a human talking, never a book (owner 29 Oct: "it's not a book, it's someone speaking naturally like humans")
1. **Zero commas AND zero fragment chains.** A comma rule cheated with full stops is still a violation. NEVER: "…do my taxes. 12 years. That is…", "Day one. Math class. Finally numbers.", "for the word interest. Four hundred pages. Zero interest." ALWAYS one connected spoken sentence per thought, linked with and / so / but / because / which / and then: "…zero minutes teaching me how to do my taxes. And twelve years is about as long as a dog lives so a whole dog lived and died while I was learning triangles." / "So on day one I walked into my math class. And I was so happy because finally there were numbers…" / "…in four hundred pages there was zero interest which is also exactly how much I had left by page ten."
2. **Chapter labels are visual, not spoken alone.** "Day 1" appears on screen (chalkboard, title, world object); the voice says it inside a sentence ("So on day one I walked into…").
3. Each beat = one breath group of 15–45 words. Every line must make sense to someone who heard ONLY the previous line (no jumps that confuse the viewer).
4. Dave = first person to "you", experiment format (goal + deadline + scoreboard), fake-outs, absurd real comparisons with a sourced fact (e.g. 12 years ≈ a dog's life), callbacks. Real numbers stay real and sourced in `sources`.
5. Validate before voicing: no `,` in any `text`; no sentence under 5 words unless it is a deliberate punchline after a long sentence (max 1 per 30 s); no line that starts with a bare label ("Day one." "Math class.").

### 0.2 Voice
- **Voice is automatic + FAST** (30 Oct 2026: per-line cache `pipeline/voice/beats`, only changed lines are voiced, one line per machine up to 20, installs + models cached; seed an already-voiced episode with `py pipeline/tts_cb.py <id> --seed`) (29 Oct 2026): pushing a changed `pipeline/episodes/<id>.json` starts `voice.yml` by itself (12 free GitHub machines, ~5 min for a 10-min episode), which commits `pipeline/voice/<id>.flac/.json`; it skips scripts whose voice is already up to date. **Engine = current Chatterbox (owner choice, 29 Oct 2026: "chatterbox current is good for now, keep it")** with `"cb": {"cfg": 0.25, "exag": 0.5}`, slowed to ~190 wpm in the edit (atempo). Male voice only (Dave is a man). `"engine": "turbo"` exists but is not the default. Dia (Apache 2.0) is only usable on a GPU (`gpu/modal_jobs.py`, Modal free tier) — on CPU it took 2 h per minute of audio.
- The owner will **NOT** record their own voice. Never ask or suggest it again. Voice = Chatterbox via `voice.yml` with `"cb": {"cfg": 0.25, "exag": 0.5}`; per-beat `exag` 0.45 dry / 0.55–0.6 hype.
- Chatterbox reads long sentences at ~230 wpm → the edit slows the cached voice with ffmpeg `atempo` (test1: 0.82 → ≈190 wpm) into `public/<id>/voice.flac`, and the TSX multiplies every word time by `STRETCH = 1/atempo`. Measure wpm after every voice run (target 180–200) and pick atempo = measured/190.
- Paid alternative only if the owner asks: ElevenLabs v3 library voice (never a clone of a real creator).

### 0.3 Dave — 3D, dressed, costume per scene (owner 29 Oct)
- **Rig:** `blender/lib.py` `Dave` = white ball head with ink-line face decals (`blender/tex/face_*.png`, made by `blender/make_tex.py`), stickman limbs as bevelled curves, Freestyle black outline, 1-frame white-silhouette swap (`dave.flash(True)`).
- **Default outfit = red OVERSIZED hoodie + wide black pants** (`OUTFITS["hoodie"]`): baggy torso profile, sleeves that bunch at the cuff, pants that fold over white sneakers, hood, ribbed hem band, kangaroo pocket, drawstrings, waistband, knit fabric shading (sheen + bump). Clothes must read as CLOTH in every pose including sitting — never as colour painted on thin limbs (owner: "he seems like just a colored painting"). After any rig change render a sitting AND a standing preview and check this.
- **Costume = the role of the scene** (an instant joke, like the reference's hats and beards): teaching → `professor` (brown jacket, round glasses, mortarboard); medical → `doctor` (white coat, head mirror); business/bank/boss → `suit` (dark suit, red tie). Add new outfits to `OUTFITS` for new roles (chef, judge, police, gym, astronaut…). Swap the costume on the exact word that changes the role ("I am **writing** that class myself" → professor).
- Background people / past self / "average person" = plain white stickmen (no clothes) so Dave always stands out.

### 0.4 Visuals — the reference's grammar (STYLE_3D §5, §11, §12)
- **Objects come from the words of the line being spoken** (memory `props-from-script`): triangles chalkboard on "triangle", TAX FORM on "taxes", RENT bill on "rent", the textbook on "textbook". No fixed prop list reused across videos.
- **≥ 50 % of the runtime is real 3D** (Blender + CC0 Poly Haven models via `blender/fetch.py`, Cycles on GitHub Actions `blender.yml`). The rest = home base: charcoal icon backdrop, big rounded wobbling cards (scaled 1.22×), Dave big and **waist-up lower right** (cut-out PNG from the `cut` camera), pointing at the card.
- Render **pose-state stills, not every frame**: each pose/face/camera state = one still; Remotion holds/cuts them on the voice words (burst → hold). A minute ≈ 20–35 stills, 6 parallel machines, ~30 min.
- **Something changes every 1.5–2.5 s** (pose, face, card, counter, punch-in, prop). No hold over ~3 s without a change. Hard cut every 3.5–6 s.
- Transitions measured frame by frame (§12.3): 1-frame white silhouette on pose swaps, 2-frame smear on whips, 6-frame light-leak time skip, 1-frame B&W threshold before a reveal, comic bursts that slam in over 3 frames, counters that roll ~1.5 s and land with a bounce.
- No burned-in captions, no meme cards, no polaroid/tape photos.

### 0.5 Sound — dense (owner 29 Oct: "the video is very poor of sound effects")
- Every visual event gets a sound: card slide → `slide`/`swish`, pop-in → `pop_hi`, pose swap → `snap_white`, 3D hard cut → `thump_low`, **every counter going up → `count_roll` (ticks that speed up and land with a ding)**, chalk → `chalk`, book → `pageflip`, typing → `key`/`key2` every 3 frames, reveals → `boom`/`stamp`, fails → `trombone`, money → `cash`/`ding`, sleep → `dream`, plus `crowd`/`sting`/`boing` as comedy accents. test1 = ~60 cues per minute; aim for that.
- New SFX are synthesised by `pipeline/sfx_synth.py` (never overwrite an existing `public/sfx/*.wav`; give new sounds new names). Owner's 2 Google Drive SFX folders: ids in `.github/workflows/sfxpack.yml`; on 29 Oct the main folder returned "permission denied" → ask the owner to re-share as "Anyone with the link" before relying on it.
- **Music changes with the situation (owner 30 Oct 2026: "clone his style… we always use the duck music")** — NEVER one looped track (`bgm.mp3` "Fluffing a Duck" is retired). Each scene mood gets its own track via `<Music segs>` from `src/v6/kit2.tsx` (example: `src/v6/Ea1.tsx`): curious/what-if → `investigations`, cheeky plan/joke → `sneaky_snitch` / `scheming_weasel_faster` / `monkeys_spinning_monkeys`, money/power tension → `hitman`, attack/conflict → `volatile_reaction`, comic reaction → `comic_plodding` / `pixel_peeker_polka_faster`, suspicion/claim → `crypto` / `hiding_your_reality`, sad/low point → `darkest_child`, open question/ending → `unanswered_questions` / `thinking_music`, upbeat comeback → `life_of_riley`. Switch on the beat where the mood flips (with its thump/whoosh), **cut to dead silence 0.3–0.8 s before every punchline or stamp** and let the hit land in silence, ~0.07 under voice. Library: `public/music/km/*.mp3` (Kevin MacLeod, CC BY 4.0, loudness-normalised, first 75 s); add tracks from incompetech.com only, and credit EVERY track used in the description.

### 0.6 The hook — THE priority (built with the loop method §0.10) (owner 29 Oct: "more than 50 % of clickers leave in the first 5–10 seconds")
- The first 10 s decide the video. Frame 0 already moving and already showing the most surprising thing; the concept + stakes are clear by second 5; a visual change every ≤ 1 s for the first 10 s; a reason to keep watching (open question / withheld result) before second 10.
- **Use his TECHNIQUES, never his scenes** (owner 29 Oct): worlds, concept characters and gags are invented from OUR topic and each spoken line; his videos (and our animtest shots) are a quality/technique benchmark only, never copied.
- Before writing any new hook, study how the reference channel (Nion Anarchy, `qa_dl/chan/an/<id>/` shot data + sheets) opens its videos and write the findings into STYLE_3D §12/§13. Old hook rules that still apply: PLAYBOOK_LONG §0.10 A (concept + stakes + how it ends, never the same hook form twice) and §12.3 (hook = a question).

### 0.7 Shorts use the SAME standard
Shorts (`shortNN`, 9:16) are built with the same kit: 3D Dave in his outfits, natural connected speech, objects from the words, dense SFX, the same transitions. Differences only: 1080×1920 framing (Dave and the card stacked vertically), 50–90 s, one loop, hook in the first 2 s, a visual change every 1–1.5 s. The old Shorts rules "real photos + meme every 2–4 s" are retired (§0.9).

### 0.8 Pipeline (what actually works — 8 GB RAM PC, slow connection)
1. Never render Remotion or Blender on the owner's PC (it crashed the session). Everything renders on GitHub Actions on branch `shorts-playbook-rules`: `voice.yml -f ep=<id>`, `blender.yml` (push trigger; `blender/RUN` = `<shot> <preview|full> <samples> cycles`, `blender/<shot>.chunks` = JSON list of comma-separated state groups), `v6demo.yml -f comp=<Comp>`.
2. Preview first (4 states, half res), look at them, then full. Check every still before the edit.
3. Downloads: `gh run download` often fails on this connection → use `gh api repos/hamlou/moneyworks/actions/artifacts/<id>/zip > a.zip` in a retry loop, in the background.
4. Copy stills into `public/<id>/`, commit, render the composition, then contact-sheet the mp4 at 1–2 fps and check every shot before sending it to the owner.

### 0.10 The LOOP METHOD — mandatory for every video (owner, 29 Oct 2026: "integrate this strategy in our next videos", from the "Isa / Nile Blue — viral in 7 days" case study)
The full case study notes stay in `PLAYBOOK_LONG.md` §12 and `PLAYBOOK_SHORTS.md` §10 — they are now MANDATORY (no longer an optional layer). Summary of what every new long video AND Short must do:

**A. Three gates before any script is written** (write PASS + one-line reason for each at the top of `pipeline/episodes/<id>_brief.md` (copy `pipeline/episodes/_brief_template.md`); one FAIL = change the premise, not the wording):
1. **Universal relatability** — a stranger with zero knowledge gets it with the sound off. Pick the most relatable angle, not the biggest number ("school never taught me taxes" beats "the 1913 Federal Reserve Act").
2. **Completion compulsion** — the story follows the looped arc (B), so the ending is not predictable.
3. **Open loop** — the hook plants a question or withholds the result; only finishing the video closes it.

**B. The looped arc = Dave's experiment** (hook → rising → CONFLICT → COMEBACK → payoff; a plain hook → rising → payoff is predictable and loses viewers):

| Phase | Long-form (10 min+) | Short (50–90 s) | test1 example |
|---|---|---|---|
| HOOK (open loop, written LAST) | 0:00–0:30, ends on the question | 0–2 s | "12 years of triangles and zero minutes of taxes… so I went back to school" → will he find the money class? |
| RISING | Day/Week chapters, Dave's plan, early wins | 2–25 s | day 1 math class, numbers! |
| CONFLICT | ~50 %: the villain / the trap / Dave's plan fails | ~30–60 % | zero interest in 400 pages, Dave wants to drop out |
| COMEBACK | ~75 %: Dave fights back with the real fix (its own chapter) | ~60–85 % | (next chapters) |
| PAYOFF | last ~60 s: the number/line that closes the hook's loop | last 5 s, loops back to frame 0 | (finale) |

Map it before scripting: list the 5 phases with beat ids + timestamps in the brief; group the beats in the JSON in that order; write the hook last.

**C. Hook = a question or a withheld result, never a statement of the answer.**
Weak: "Abdul turned $1,000 into $50,000." Strong: "What happens when you give one man $1,000 and a city that hates him?" The case study's own example: "This YouTuber turned 100 cans of Red Bull into powder" (gives it away) → "What would happen if you compressed 100 cans of Red Bull into one drink?" (opens a loop). Combine with §0.6 (frame 0 moving, concept + stakes by 5 s, visual change ≤ 1 s) and Dave first person.

**D. Mini-loops inside the video** (keeps the middle from sagging, same principle at chapter scale): every chapter opens with a small question or a "but then…" and closes it before the next chapter opens its own; never close the BIG loop before the payoff; chapter titles never reveal answers.

**E. Upload + analytics routine** (log every video in `pipeline/ctr_log.md`):
- Title = what happens in plain words about the viewer; description = the premise in 2–3 sentences + sources; never "made for kids".
- **Shorts:** swipe-through rate (Studio → Engagement "how viewers engaged") **≥ 80 %**; average view duration ≈ 85 %+ of length. Do not judge before 48 h (the case study went 3,000 views on day 1 → 10 M later). Upload the next Short only when the current one's hourly views stay **under ~5,000/hour for 24 h** (uploading during a push can flatline it).
- **Long-form:** CTR ≥ 5–8 %, average view duration ≥ 50 %, first-30 s retention drop ≤ 30 % (owner's diagnosis: 50 %+ were leaving in 5–10 s → the hook is THE priority). Judge at 48 h; check analytics on a schedule, not every few minutes.
- Expect misses: the structure shortens the guessing, it does not remove it. Keep producing while waiting.

**F. Not copied from the case study:** re-uploading other creators' videos ("value-add editing") — our videos are 100 % original 3D animation, so no reuse risk. AI clips (Higgsfield) only as rare hook plates per §12.7, never to replace our 3D shots.

### 0.11 Monetization-safe assets only (owner 29 Oct: "make sure we won't get any trouble in the monetization later")
Every sound, voice, model, texture, motion and font must be on the ✅ list of **`LICENSES.md`**; anything else is banned until checked. Never `public/sfx/pack/*` (unknown licence), never other creators' clips/music, never free-plan AI-generator output, never a cloned or real person's voice, never words put in a real person's mouth. Add the `LICENSES.md` description footer to every upload.

### 0.12 Sound design per video + no memes + real images only when needed (owner, 29 Oct 2026)
**"I want us rich on sound effects with the perfect moments… each video should generate its own needed sound effects."**
1. **Every video gets its own sound plan** written BEFORE the edit: `pipeline/sfx/<id>.json` = the list of sounds this video needs, made from its own script — one entry per visual event (each pose swap, card, counter, prop, camera move, impact, reveal, gag) and per thing that makes noise in the story (a cash register for a till, rain for a rainy street, a crowd for a stadium, a phone buzz for a text…). Each entry = `{"name", "recipe", "params", "cue"}` (cue = the line/word/event it lands on). Worked example: `pipeline/sfx/test1.json` (18 sounds from the "back to school" script: school bell, dog bark + whimper on "dog… died", train horn on "train", alarm on "rent", typing on the search, snore by "page ten", stamp on the F grade).
2. **Generate them:** `py pipeline/sfx_synth.py <id>` renders that plan into `public/sfx/<id>/<name>.wav` (recipes in `sfx_synth.py`: whoosh, impact, tick-roll counter, pop, swish, chalk, page, typing, cash/coin, bell/ding, buzz, crowd murmur, footsteps, riser, drop, glitch, heartbeat, rain…). New recipe needed → add it to `sfx_synth.py` (never download sounds of unknown licence; CC0 Kenney sounds in `public/sfx/` are also allowed). Cue them in the TSX as `{src: '<id>/<name>', at: <frame of the exact word/event>}`.
3. **Perfect moments:** a sound lands on the exact frame of its event (the word in the voice, the frame the card lands, the impact frame), never "around" it; counters play `count_roll` for their whole roll and land with the ding; whooshes start 2–3 frames BEFORE a whip/cut; impacts are ON the contact frame; ambience (room tone, street, rain) runs under whole scenes at low volume; music ducks under big hits. Target ≥ 50 cues per minute, and no 2 s window without a sound except deliberate silence before a punchline.
4. **Memes: OFF.** No meme cards, meme formats or "reaction memes" in any new video (long or Short). The old meme rules in PLAYBOOK_LONG §0.11, PLAYBOOK_SHORTS §3/§4/§9, AGENT_BRIEF v5 and UPGRADE are retired.
5. **Real images only when needed:** no photo quota. Use a real image only when the story needs real proof the 3D world cannot give — a real document, headline, chart, product, place or a real public person in a factual context — with a free licence (`pipeline/photo_find.py`, credit in the description, `LICENSES.md`). Everything else is our own 3D/2D animation.

### 0.13 No thumbnails (owner, 30 Oct 2026)
Don't make thumbnails anymore: no thumbnail concepts, no `src/thumbs`/`src/v2/t*.tsx`, no `thumbs.yml` runs, no thumbnail steps in briefs or reports. Every older thumbnail rule (PLAYBOOK_LONG §0.6, §5, §12.4, Shorts covers) is retired.

### 0.9 Retired by v7 (do not use in any new video)
Meme cards (all formats, incl. generated memes) · polaroid/tape/sticker photos · ANY photo quota: "real photo every 10–15 s" (long) and "photos + meme every 2–4 s" (Shorts) · burned-in captions · the 2D `<Stick>` Dave and the three.js `Dave3D` for new videos (Blender Dave replaces them; the old episodes keep theirs) · asking the owner to record their voice · fixed recurring prop lists · fragment-chain sentences · `validate.py` meme/photo counts for v7 videos.

---


## 1. The measured numbers (the targets)

| Metric | Reference | Our old long videos | v6 target |
|---|---|---|---|
| Length | 19:16 | 9–12 min | **13–18 min** (story decides; never pad) |
| Spoken words | 3,372 | 1,750–2,000 | **2,500–3,300** |
| Speaking rate | **≈ 190 wpm** (170–210 per minute) | Chatterbox ≈ 230 wpm | **180–200 wpm** |
| Silences > 1 s | 63 (≈ one every 18 s), always before a punchline / reaction / time-skip | a fixed 0.3 s after every beat (metronome) | **40–70**, only where a joke or a reveal needs air; ≤ 0.15 s everywhere else |
| Visual change (any new layer, pose, panel, zoom) | every **2.2 s** on average (519 in 19 min) | every 3–6 s | **every 1.5–2.5 s** |
| Hard scene change | every **5.3 s** (218) | 8–15 s | **every 4–6 s** |
| First minute | **42 visual changes** (one every 1.4 s) | 6–12 | **≥ 35** |
| Burned-in subtitle captions | **none** | word captions on every host beat | **none** (only kinetic numbers / labels) |
| Meme-format cards | none | one every 30 s | **retired** → gag interrupts (§5.6) |
| Polaroid / tape / sticker photos | none | everywhere | **retired** → UI cards and full-screen plates (§5.4) |

---

## 2. Format — every episode is DAVE'S EXPERIMENT

The reference is not an explainer. It is **"I tried X for 30 days, here is exactly what happened"**: a goal, a deadline, a plan, a live scoreboard, failures, a lucky break, a twist, the final numbers. Every money lesson is something the host *discovers by doing it*. This is the single biggest reason it feels alive and ours feels like a lecture.

**Every v6 episode = one Dave challenge:**
- Title shape: `I [did the thing] for [N days / with $X] to [ridiculous goal]` / `I tried to [X] like [rich kids / a casino / a bank] for 30 days` / `I gave myself $500 and one rule`. The topic taste of the channel stays (deep systemic money truths: why school never taught money, why rich kids stay rich, why broke = worse decisions…) — it just becomes Dave's experiment.
- **Goal + deadline + scoreboard** stated by **0:45 at the latest**.
- **Time is the spine**: chapters are `Day 1`, `Day 2`, `Day 4–7`, `Week 2`, `Week 3`, `Week 4`, `The Results` — or the same with hours / bets / paychecks. No topic-bucket chapters.
- **The money facts are Dave's tools and obstacles** (the reference: keyword volume, RPM, export size, upload cap, thumbnail A/B test, translations, watch-time trick). Each one appears because Dave hits it, never because "here is a fact".
- **Honesty:** Dave is a cartoon, so his experiment is a story — but every number that describes the real world (odds, rates, prices, salaries, laws) is real and sourced, and his results are built from those real numbers (e.g. 30 days of real roulette odds). Never present an invented result as real-world data.

### 2.1 Story beats the reference hits (copy the rhythm, write our own content)

| Time (of a ~16 min video) | Reference does | Dave does |
|---|---|---|
| 0:00–0:20 | Concept in sentence one ("Sleeping videos do super well because…") + jaw-drop proof (a real 500 M-view video) | Concept in sentence one to "you" + ONE real jaw-drop proof with a real photo/UI card |
| 0:20–0:45 | The money math in 3 steps, each translated (RPM → $783,896 → "an entry-level software developer salary for a decade" → "$750 an hour") | The same 3-step math ladder, each step translated into the viewer's life |
| 0:45–1:05 | "And I want to get on that train. So over the next 30 days I will…" + a joke | Dave announces the challenge + rules + a joke |
| 1:05–2:40 | Research with a tool, a good example vs a terrible example ("Yuck."), the plan on a whiteboard, 4th-wall gag ("Sorry I had to make sure you're not asleep") | Dave researches (real sources shown as clean UI cards), good vs terrible option, the GAME PLAN whiteboard, one 4th-wall gag |
| 2:40–3:20 | Setup (channel rename, logo) — fast, funny, "Now to the fun part." | Setup montage ≤ 40 s, ends on "Now the fun part." |
| 3:20–6:40 | Day 1 is long and hands-on: problem → frustration rant → fake-out ("…is what I would have said if…") → workaround → first result on the TV | Day 1 = the longest chapter. Dave hits the first real obstacle, rants, gets fake-out, works around it, first scoreboard |
| 6:40–9:20 | Days 2–7: a "cunning plan", it fails, absurd comparison ("half of what peasants made in the 1700s"), week report card with grade "C-" | Week 1: one clever plan, it fails, absurd comparison, **Week report card** |
| ~9:20 | Mid-video subscribe ask disguised as a personal aside | Same, one line, with a joke |
| 9:20–12:00 | Week 2: a hunch, a small win, another trick from a famous creator (credit given), the stats start climbing | Week 2: a small win + a trick learned from a real public source (credited) |
| 12:00–13:50 | **The tangent**: he leaves for a festival — music montage, almost no voice (min 13 = 49 words) | **The break**: Dave goes away (vacation / night shift / grandma's) — 20–40 s music montage of photos + 3D shots, ≤ 15 words |
| 13:50–15:00 | "Surely nothing happened while I was gone… Oh my god." → the breakout result, first comment read out | "Surely nothing happened…" → the twist/breakout, a real-looking viewer comment read out |
| 15:00–17:30 | Week 4 goes absurd (chainsaw / Corolla) — the dumbest idea wins | The dumbest idea of the experiment — and it's the one that works (or fails hardest) |
| 17:30–18:40 | Final numbers, top 3 / bottom 3, the honest lesson, "check back every year" | **The Results**: final scoreboard, top 3 / bottom 3, the ONE honest lesson the viewer can use |
| last 20 s | "Life is short so thanks for wasting a bit of it here. Until next time." | Dave's own short sign-off line (same every episode = a catchphrase, written by us) |

---

## 3. Writing — how he talks (copy the SOUND, write our own words)

Measured on the 3,372 words of the reference:

1. **Long run-on sentences glued with "and / so / but / which / because"**, then a 1–3-word punch. ("…I could upload the video post it and enjoy my sweet sweet YouTube money." → pause → "Is what I would have said if…"). This matches our no-comma rule: write the run-on, drop the commas.
2. **Casual and specific, never formal.** Contractions always, "pretty damn big", "Yuck.", "Ew.", "Oh nice.", "Okay so…", "Guys listen.", "Anyways". Censor-bleep mild swears instead of saying them (bleep sfx + black bar).
3. **Self-roast and confident-then-wrong.** He predicts, gets it wrong, admits it ("I just really don't want to admit that I was wrong about the thumbnail"). Dave must be wrong at least 3 times per episode and admit it.
4. **The fake-out.** Describe the happy ending → pause → "…is what I would have said if [disaster]." Once per episode minimum.
5. **Absurd historical/real comparisons for every money number.** "$7.28 a year which is about half of what peasants in the 1700s made." "$784,000 = an entry-level software developer salary for an entire decade." Every number gets one.
6. **Talk to the viewer directly and play with them:** "Which one would you click on?" → 1 s silence → "Do you have a favorite?" / "Take a wild guess what happened." / "For those of you who have been paying attention…" / "Remember my dusty 2003 Toyota Corolla?"
7. **Callbacks** set up early and paid late (the Corolla is mentioned at 2:30 and becomes the hit at 16:07). Plant 2 callbacks per episode.
8. **Rants with a rational punchline:** "Are you really trying to get me to pay 40 euros monthly… That doesn't seem like a rational business decision."
9. **One-word reaction beats** after a pause: "Ew." "Yuck." "Perfect." "What a pain." They are their own beat with `pause` ≥ 0.8 before.
10. **Credit people out loud** ("Got this idea off of [creator] so thank you so much for that") — real, public, factual.
11. **Numbers are the scoreboard, not a lecture.** He says a LOT of numbers, but each one is HIS result or HIS math, said once, shown big, translated. Max one non-scoreboard stat per ~30 s (keeps §0.12).
12. **Banned:** "Today we'll…", "In this video…", "Let's talk about…", recaps, lists of three facts, definitions before examples, "So let's recap", any narrator describing Dave in the third person.

---

## 4. Voice — the SAME delivery, a legal voice

We do **not** clone the reference creator's voice or anyone else's (illegal + against YouTube policy). We copy the **delivery**: young, casual, dry and a bit sarcastic, fast but relaxed, sentences that flow into each other, punchlines after a beat of silence, quieter asides.

**Why ours sounds robotic (diagnosed):**
- `tts_cb.py` synthesises every beat separately → each 1–2 sentence beat restarts its intonation from zero, so the voice "resets" every 5 s.
- `cfg_weight 0.5` → Chatterbox's fast, flat read (≈ 230 wpm).
- The same `pause` after every beat → a metronome. Real speech has almost no gap inside a thought and long gaps before jokes.

**v6 voice rules:**
1. **Beats are breath groups, not sentences:** 25–60 words (2–4 sentences of one thought). Visual changes inside a beat are done with `at` words, which already works. Short beats only for one-word reactions and punchlines.
2. **Pauses (beat `pause`):** `0.08–0.15` when the next beat continues the thought (default), `0.35` between thoughts, `0.8–1.2` before a reaction word / punchline / fake-out reveal / "Do you have a favorite?", `1.5–2.0` before a time skip ("Five hours later.").
3. **Chatterbox settings** (read by `pipeline/tts_cb.py`): episode `"cb": {"cfg": 0.35, "exag": 0.5}`; per beat `"cfg"` / `"exag"` override. `cfg` 0.3–0.4 = slower, more natural rhythm (≈ 180–200 wpm); `exag` 0.45 for dry asides, 0.5 normal, 0.6–0.7 for hype ("Guys listen."), never above 0.7 (it starts shouting).
4. **The voice itself:** Chatterbox's built-in voice by default. To get closer to the reference's young casual tone legally, the owner may record **his own voice** (or a friend who agrees in writing) reading the sample paragraph below in that tone, 15–25 s, quiet room, phone mic is fine → `pipeline/voice_ref/dave.wav` → episode `"cb": {"ref": "pipeline/voice_ref/dave.wav"}`. **Never** a clip of the reference creator, another YouTuber, a celebrity, a film or a game.
   Sample to record: *"Okay so here's the thing. I thought this was going to be easy and I was very very wrong. I spent four hours on this and it made me five cents. Five. Cents. And honestly that's more than I expected so I'm calling it a win."*
5. **Asides** (`"aside": true` on a beat): spoken a little quieter and faster — mix it −4 dB (planned in `assemble.sh`; until then write asides with `exag` 0.4).
6. **Music bed never stops** under the voice (except the deliberate silence before a punchline), so there is no "dead room" between beats.
7. **Check after `voice.yml`:** measure words per minute per chapter (target 180–200) and listen to the first 60 s. If a chapter is > 210 wpm → lower its `cfg` to 0.3; if < 170 → raise to 0.45.

---

## 5. Visual style — "edited by a 3D animator"

### 5.1 The look of Dave in 3D (the reference's trick, our character)
The reference host is a 3D chibi model with a **flat 2D face drawn as a texture** — the expressions are line-art that swaps every line (X-eyes, hearts, angry brows, spiral eyes, tears). That is why it is so expressive and still cheap. **Dave gets the same trick:**
- **3D Dave** = Dave's identity (huge round white head, tiny body, dot eyes) built in Blender: chibi proportions (head ≈ 45 % of height), smooth matte plastic/vinyl material, **toon shading with a dark outline** (Solidify inverted-hull or Freestyle, ~2 px at 1080p), soft rim light. Outfit: Dave's own colours (pick one signature item, e.g. a green hoodie with a $ pocket — not cat ears, not a mask).
- **Face = swappable texture** using our existing 2D Dave expressions (`Expr` set: neutral happy grin sad shock worried smug think tired suspicious angry money scream) + reference-style extras: `x_eyes`, `hearts`, `spiral`, `crying`, `dead`, `stars`, `dollar_eyes`.
- **Pose library (render once, reuse forever)**, transparent PNG, 3/4 view, waist-up AND full-body: point_r, point_l, point_up, present (palm up), shrug, arms_crossed, facepalm, thinking (fist on chin), thumbs_up, peace, wave, celebrate (both arms up), panic, hands_on_face, sitting_laptop, lying_down, pointer_stick (lab coat variant), pirate_hat variant. ≈ 20 poses × 20 faces → `public/dave3d/<pose>/<face>.png`.
- On screen Dave lives in the **lower-right third**, overlapping the panel he talks about, scale 55–75 % of screen height, **a new pose or face every 1.5–3 s** (on `at` words), small idle bob/breath between swaps, pose swaps snap with a 3-frame squash (scale 0.96 → 1.0).
- **Punchline close-up:** for big reactions Dave's head fills half the frame (0:18 "500 MILLION" shot): giant face, comic bold number beside it, red/white comic text.

### 5.2 The "home base" set (≈ 45 % of screen time)
Dark charcoal background `#17181B` with a faint repeating pattern of small money icons (coin, card, chart, piggy bank, receipt) at 6 % opacity, slowly drifting (10 px/s). Dave lower-right; the thing he talks about upper-left/centre on a panel. This replaces the cream `Board` for host talk.

### 5.3 3D environment shots (≈ 20–25 %)
Short (2–6 s) shots of Dave in rendered 3D sets with a real camera move: slow dolly-in, low-angle hero, crane up, orbit 15°. Sets to build once (CC0 assets: Poly Haven HDRIs + models, Kenney CC0 kits, or own Blender models — never ripped game assets):
- **HQ garage** with a rolling **whiteboard "GAME PLAN"** (handwritten plan, ticks, red marker) + an old car — where plans and checklists happen.
- **CRT TV room** (brick wall, retro TV) — the scoreboard lives here.
- **Dave's bedroom / desk at night** (laptop glow) — research, uploads, late nights.
- **Office / bank / casino / store interior** per topic.
- **Finale set**: night rooftop or ship deck under a starry sky — final results, floating UI cards around Dave.
- **Library with floating 3D numbers** — for comparing options ("10" big, "8" and "3" smaller).
- Rendered as 3–6 s clips (1920×1080, 30 fps, webm) or stills + camera move in Remotion.

### 5.4 Real footage, photos and UI cards (the "screen-recording" layer)
- **Real world = real**: stock video/photos of the actual thing (rain on a window, a casino floor, a calendar page "1", a stopwatch macro, a forest). Free licences only (Pexels / Pixabay video + Wikimedia Commons; `pipeline/pexels_find.py`, `photo_find.py`). Used **full-screen** as a plate with Dave composited in, or inside a **rounded dark UI card** (radius 18 px, 1 px border `#2A2C31`, soft shadow) — never polaroid/tape/sticker.
- **UI cards = our recreation of the screen the topic lives on** (bank app, brokerage screen, YouTube search with autocomplete, paycheck stub, price comparison, a "search volume / competition" style panel). Built in React, generic, **no real logos**, numbers from our sources. Card behaviour: slides in 12 px + fades (6 frames), then a **digital push-in to the number** being said (scale 1.0 → 1.6 centred on the number at its `at` word, 10 frames ease-out), mouse cursor that moves and clicks (`click` sfx) when Dave "uses" it.
- **"White-frame flash" photos**: a real photo appears inside a thick white hand-drawn frame for 0.4 s, then a second one overlaps (3:24 in the reference) — for "I looked everywhere" montages.
- Photo/footage cadence: a new real image or clip **every 8–15 s** (keeps §0.11 B, the look changes).

### 5.5 Kinetic number & title cards
- **Big number card** (on home base): small caps label above (`RPM`, `TOTAL MADE`, `WATCH TIME`), the number huge (Anton / "Bebas"-style, 220–300 px), white → **green `#5BE33B`** for money gained, **red `#FF3B3B`** for lost, **yellow `#FFD400`** for neutral, faint glow; tiny grey explanation under it ("(Money per 1,000 views)"). Count-up odometer 12–20 frames, lands with `stamp`. Percent climbs show steps (7% → 27% → 30%).
- **Chapter title card** (replaces the black chapter card): bright blue `#3DB8F5` background with a subtle grain, chapter name in giant **yellow condensed italic** (`MAKING VIDEOS`), small white line under it ("DAY 1 / Let's make the stupid long things"), 1.8–2.5 s, `whoosh` in + a music hit.
- **Week report card**: black, title "Week 1" with a circled number, rows with dotted leaders `Views.............152` / `Subscribers.............3` / `Revenue.............$0.14` typing in one by one (`tick` each), then `Rating........C-` with a letter grade slam (colour by grade).
- **Time-skip card**: black, small white text "5 hours later…" 1.5 s, clock `tick`.
- **Fake list / search bar**: a search bar types the query, autocomplete suggestions pop line by line.

### 5.6 Gag interrupts (replace meme cards — one every 25–40 s)
- **Comic panel**: halftone/pop-art frame, speed lines, giant onomatopoeia ("CLICK!", "WHACK!", "SLAP!", "CHA-CHING!") in red with thick black outline, 10–20 frames, Dave in an extreme pose, camera shake.
- **Extreme macro insert** (0.5–1 s): a giant eyeball, a stopwatch, a ticking calendar — real footage or 3D.
- **Fake-out freeze**: the happy scene freezes → record-scratch → cut to reality.
- **Censor bleep** with a black bar over Dave's mouth.
- **4th-wall moment**: Dave suddenly close to camera ("Sorry I had to make sure you're not asleep").
- **Absurd visual comparison**: the thing literally shown (Dave in a crowd of identical videos, a peasant cart for "1700s wage").

### 5.7 Scoreboard TV (replaces the Damage Meter)
A retro CRT TV in the TV-room set (or as a 2D card on home base). Screen: rounded card with the experiment name + 3 tiles: **eye (blue)** = progress/attempts, **person (red)** = people/subscribers/friends, **$ (green)** = money, each with a small `+N` delta above. Shown at the end of every Day/Week chapter (≥ 6 times per video), numbers roll up with `ding`. Final appearance in the finale set as floating cards.

### 5.8 Camera, cuts and motion
- **Cut on the phrase**: hard cuts at sentence/phrase starts (every 4–6 s); within a shot something new every 1.5–2.5 s (pose, face, card, push-in, number).
- **No slow fades** except into/out of the montage and time skips. Transitions: hard cut (80 %), whip-blur (8 frames) between locations, white flash on reveals, comic panel on gags.
- **Everything moves**: 3D shots always have a camera move; 2D panels have a slow drift (scale 1.0 → 1.04 over the shot); pop-ins overshoot (`spring` damping 12); nothing is ever fully still for > 1.5 s except the deliberate pre-punchline freeze.
- Hook (first 60 s): a visual change every ≤ 1.5 s, at least 3 different set types (photo plate, home base, 3D set).
- Frame 0 is already moving and shows the most impressive thing (the jaw-drop proof), never a title.

### 5.9 Motion grammar — measured frame by frame (30 fps, every frame diffed + 10 fps strips)
This is what makes it feel "smooth" and animator-made. It is NOT constant motion:
- **Burst → hold.** 45 % of all frames are perfectly still; 36 % move. Motion comes in short bursts (4–10 frames) then the image HOLDS 0.3–1.5 s (751 holds of 0.1–0.5 s, 102 of 0.5–1 s, only 8 longer than 3 s). Never a slow continuous drift as the only motion.
- **Pose swaps are instant, not tweened.** The character cuts from one held pose to the next. On the swap frame(s) the character is drawn as a **flat WHITE silhouette for 1–2 frames** (seen at 0:17.7, 0:20.3, 0:21.5, 1:28.6, 1:29.1). Kit: `track()` + `DaveT` do this automatically.
- **Entrances ≤ 6 frames** with ease-out + overshoot (the card at 0:00 goes from 15 % to 100 % size in 6 frames). Kit: `snap()`.
- **Smear frames** on fast moves and character drops: 1–2 frames of directional blur + stretch (0:18.8, 0:21.5, 1:30.3, 4:03.4). Kit: `Smear`.
- **1-frame high-contrast black/white "photocopy" frame** right before a big VFX/reveal (4:17.5). Kit: `Threshold`.
- **Counters roll in ~1.5 s** with vertical motion blur while the card slowly pushes in (0:01.6–0:03.2), then land with a tiny bounce. Kit: `Counter`.
- **Comic bursts** slam in over 3 frames with a decaying shake (0:17.8–0:18.9). Kit: `ComicBurst`.
- **3D shots mostly use a LOCKED camera** and let the character act (fidget loop, sitting, typing); lights can **snap** on instantly as a gag (0:28.2). Camera moves are reserved for reveals (a fast whip + blur to a low-angle close-up at 4:03.4; a slow crane on the finale).
- **Hand-drawn effects boil on top of 3D**: white jagged shock lines redrawn every 3 frames (0:28.2–0:30.2). Kit: `ShockLines`.
- **Full-frame white flash** (1–2 frames) to hard-switch a number card. Kit: `WhiteFlash`.
- Animation runs on ones (full 30 fps), not on twos.

---

## 6. Sound
- **Music bed always on** under the voice (−26 LUFS under speech, ducked), lofi/chill-hop for normal parts; it **changes per chapter**; it stops dead for 0.5–1 s before a punchline and slams back on the reaction. The montage gets an upbeat full-volume track. Free licences only (Kevin MacLeod CC-BY, YouTube Audio Library, Pixabay Music) + credits in the description.
- **SFX density ≈ 1 per 3–4 s, all motivated**: `whoosh` on card/panel moves, `pop` on pose swaps (quiet, −30 LUFS), `click` on cursor clicks, `ding`/`cash` on scoreboard, `stamp` on number landings, comic `boom`/`thud` on gag panels, `scratch` on fake-outs, `tick` on time skips, bleep on censors. Keep the existing `at`-word anchoring and the −24 LUFS normalisation (voice −16).

---

## 7. Beat fields for v6 (JSON) — what to write in `pipeline/episodes/epNN.json`

Existing fields keep working (`host`, `bg`, `pic`, `slam`, `zoom`, `sfx`, `card`, `mood`, `pose`, `at`). New v6 fields (read by the v6 kit `src/v6/` — **see §8 for build status; until it exists, map them as noted**):

| Field | Effect | Fallback until `src/v6/` exists |
|---|---|---|
| `"set": "home" \| "garage" \| "tvroom" \| "bedroom" \| "finale" \| "<topic set>"` | which background/3D set the beat plays in | `host: true` (home) / `bg: <photo id>` |
| `"face": "x_eyes"…` / `"pose3d": "arms_crossed"…` | 3D Dave face/pose, can be a list `[{"p": "shrug", "at": "word"}]` | `mood` / `pose` |
| `"ui": {"t": "search" \| "app" \| "stats" \| "list" \| "receipt", "data": {...}, "push": "word"}` | recreated UI card + push-in on that word | `pic` |
| `"num": {"label": "RPM", "v": 0.98, "fmt": "$", "color": "green", "sub": "(Money per 1,000 views)", "at": "word"}` | big number card | `slam` |
| `"comic": {"t": "WHACK!", "at": "word"}` | gag comic panel | `slam` + `sfx` boom |
| `"score": {"a": 24, "b": 0, "c": 0.05, "at": "word"}` | scoreboard TV update | `card` |
| `"report": {"title": "Week 1", "rows": [["Views", "152"], …], "grade": "C-"}` | week report card | `card` |
| `"skip": "5 hours later…"` | time-skip card | `card: {"t": "5 hours later", "dark": true}` |
| `"plate": {"id": "<photo or clip id>", "at": "word"}` | full-screen real photo/footage with Dave composited | `bg` |
| `"aside": true` | quieter faster line | `exag: 0.4` |
| `"cfg"`, `"exag"` | voice settings (§4) | works now |
| `chapter` | blue/yellow title card (§5.5) | black card |

Density per video (targets): visual change every 1.5–2.5 s · scene change every 4–6 s · real image/clip every 8–15 s (each id once) · gag interrupt every 25–40 s · big number card for every scoreboard number · scoreboard TV ≥ 6 times · week report card per week · 1 montage break · 0 burned captions · 0 meme-format cards.

---

## 8. Build status + roadmap (be honest with the owner)

**Chosen solution (23 Oct 2026): real 3D inside Remotion with three.js (`@remotion/three`), no Blender step.** The reference's white round-head stickman (0:00, 0:27, 0:42) IS a 3D Dave, so Dave is built from primitives in `src/v6/Dave3D.tsx`: toon shading (3-step ramp) + black inverted-hull outline + face drawn on a canvas texture (14 faces) + joint-angle pose library (16 poses). Kit: `src/v6/kit.tsx` (Stage, DaveT pose track with white-flash swaps, HomeBase, UICard push-in, Counter, NumCard, ComicBurst, ChapterCard, ReportCard, WhiteFlash, Threshold, Smear, ShockLines). Sets: `src/v6/sets.tsx` (Bedroom so far). Demo: composition `V6Demo` in the separate entry `src/v6/index.ts`, rendered by Actions → `v6demo` (uses `--gl=swangle`, software WebGL; uploads the mp4 + 10 fps contact sheets). Blender stays optional later for richer sets (render clips, drop them in as video).

Older plan, still the order of work:
1. **v6 script + voice — works TODAY.** Format §2, writing §3, voice §4 (`cb.cfg`, beat `cfg`/`exag`, breath-group beats, real pauses, optional own-voice reference) → `voice.yml` as usual.
2. **v6 2D kit `src/v6/`** (Remotion, no Blender): home-base set, UI cards with push-in + cursor, big number cards, chapter title card, week report card, time-skip card, comic panels, scoreboard TV card, white-frame photo flash, captions off. ← next build step.
3. **3D Dave** (Blender, runs in GitHub Actions `blender -b`): model + toon outline + face texture swap → render the pose×face PNG library to `public/dave3d/` (committed). Until it exists the v6 kit uses the current 2D Dave with a toon-shaded look (gradient shading + thick outline + drop shadow) so it already reads as "3D-ish".
4. **3D sets** (Blender + CC0 assets): garage+whiteboard, TV room, bedroom, finale; render 3–6 s camera-move clips per episode in Actions (`render3d.yml`), cached in the repo like the voice.
5. Old episodes: UPGRADE.md keeps working; it gets the v6 script/voice rules now and the v6 fields once the kit lands.

---

## 9. What is retired by v6 (do not use in new episodes)
- Polaroid / tape / sticker / news-strip photo looks → UI cards, full-screen plates, white-frame flash.
- Meme-format cards every 30 s (Drake, brain, buttons…) → gag interrupts §5.6.
- Burned word-by-word captions on host scenes → none.
- Cream `Board` as the main talking set → dark home base.
- Black "CHAPTER N" cards → blue/yellow title cards.
- Damage Meter HUD → Scoreboard TV.
- Hook ≤ 25 s / ≤ 75 words limit → the hook is the first 45–60 s, but sentence one states the concept and the first 20 s contain the jaw-drop proof; ≥ 35 visual changes in minute one.
- 10–12 min / 1,750–2,000 words / fixed 0.3 s pause → §1 targets.
- "Max 4 chapters" → time-based chapters as the experiment needs (8–13, like the reference).

## 10. v6 pre-flight (paste in the final report, all ✓)
- [ ] Episode is Dave's experiment: goal + deadline + scoreboard stated by 0:45; chapters are time steps.
- [ ] Sentence one = concept to "you"; jaw-drop proof with a real image in the first 20 s; 3-step translated money math.
- [ ] Writing: run-ons + punches, ≥ 1 fake-out, Dave wrong ≥ 3 times, ≥ 2 callbacks, every number translated, ≥ 2 direct questions to the viewer, 1 montage break, sign-off line. Zero commas.
- [ ] Voice: beats 25–60 words, `cb.cfg` set, pauses varied (0.1 / 0.35 / 1.0), measured 180–200 wpm per chapter.
- [ ] Visual: change every ≤ 2.5 s (≥ 35 in minute 1), scene change every 4–6 s, real image every ≤ 15 s, gag every ≤ 40 s, scoreboard ≥ 6×, report card per week, no captions, no memes, no polaroids.
- [ ] Sources + licences as always; no real logos; real people factual only; no invented result presented as real data.

---

## 11. Channel study — all 13 videos (23 Oct 2026, owner: "we're at 25 %, study ALL his videos")

Sources: 12 auto-caption transcripts (the brainrot video has none), per-frame motion data on his 3 biggest hits (1.7 M "Why are there no 3D animators", 1.2 M "BRAINROT Shorts for 30 days", 479 K "SLEEPING videos"), 2.5 s frame sheets of their openings, and his own workflow video "How I Make 3D Animated Videos for YouTube" (720 s).

### 11.1 His real production recipe (from his own words) → our equivalent
| His step | Ours |
|---|---|
| Google Doc script, bullet points expanded, `[notes in brackets]` for gags | episode JSON beats + `[gag]` notes |
| **Records his OWN voice word for word** (AT2020 mic, blanket over his head against echo), Audacity noise reduction, **Adobe Podcast Enhance** (free web tool), cuts stutters in Premiere. Non-native English speaker. | §4b voice paths (owner decides) |
| Pen-and-paper storyboard: scene number + script line + sketch | beat `set` + `shot` notes |
| Audio cut into one snippet per scene, numbered | one beat = one scene |
| **Blender EEVEE, 1920×1080, 24 fps**, anime skybox pack, 32 samples, **shadows + ray tracing + motion blur ON** | `@remotion/three` scene at 24 fps, shadows on, motion-blur pass (§11.4) |
| Character: default human rig, grease-pencil outline, **face drawn per line in draw mode** | `Dave3D` + face textures ✓ |
| **Backgrounds and props = free downloaded 3D models** (Sketchfab, GLB format, textures included). "If someone has done it before you, don't make it yourself." | CC0 libraries we can download without login: Poly Haven (HDRI skies + models), Kenney, Quaternius; Sketchfab CC-BY needs the owner's login |
| **Background people = low-poly model + Mixamo mocap** (crowds, soldiers) | Quaternius CC0 animated characters; Mixamo needs the owner's Adobe login |
| Static shots in After Effects: video samples with **rounded corners** and **every item bobbles (wiggle expression)** "so it feels alive" | `wiggle()` on every UI/photo card (§11.4) |
| Music: one cosy game-soundtrack loop under everything; SFX: **whooshes, body hits, typewriters, number counters** | free lofi loop (licensed) + those 4 SFX families |
| Outro stretched so the end screen has room; 2–3 thumbnails per video for A/B tests | same |

### 11.2 Shot grammar seen in all 3 hits
- **Two shot types only** (his words): *fully animated shots* (character acting inside a 3D world) and *static shots* (character in the corner + props/cards). Ratio in the openings ≈ 60 / 40.
- **A new WORLD every 5–15 s**: empty concrete room → classroom → dark desk room → cinema projector → purple void with giant props → city street with whiteboard → grass field with a crowd. The world itself is the joke ("too shy for a camera" → he hides in a dark room).
- **Information is shown ON world objects**: chalkboard list, projector screen showing the clip, CRT TV scoreboard, tear-off day calendar ("day 0 → day 1"), whiteboard "Point 1/2/3", flags on poles, cards floating in 3D with shadows. Flat full-screen cards only for big numbers and comparisons.
- **Visual metaphors are built literally**: "you could fit all Odyssey viewers in one truck… and this is all of YouTube's" → 50 trucks; "crowd in a niche" → a field of identical white stickmen; money → a wall of banknotes; time → giant clock.
- **Big chapter text lives in the world** (outlined "DAY 1" letters in the room), not on a separate card. The blue/yellow card is the exception, not the rule.
- **Hook = speed-lines world** (green radial streaks) with objects flying at camera: calendar, stopwatch, banknotes — 6 different props in 10 s.
- Burst-and-hold motion confirmed on all three: 36–45 % of frames perfectly still, holds mostly < 0.5 s.

### 11.3 How he writes the jokes (the "spirit")
1. **Personification skits**: platforms/ideas become people with a life ("YouTube in the 1960s = slicked-back hair driving a Mustang to his suburban family… Odyssey = the RV hippie: I'm decentralized bro"). One per video, 15–25 s, with a quick voice change.
2. **Framing device for the whole video**: a boxing match with an announcer ("fighting out of the red corner…"), rounds and a score; a tier list; a 30-day experiment. Pick ONE per episode.
3. **Absurd scale analogies, shown literally**: strawberries → trucks; "more than the population of Poland, Spain or even Canada".
4. **Self-roast as a running texture**: "too ugly or too shy… that's me right now. Please subscribe." / "I'm incredibly bad at thumbnails" / "at least half of those views is just me. You're welcome, I just paid your rent."
5. **He interrupts himself** ("Hey hey hey stop. That's enough.") and **mock-argues with the viewer** ("Before any film school students come crashing out in the comments: yes I know").
6. **Fake-meta twists**: "Or am I just paid to say that?… Well probably. Or is it?"
7. **Literal-misunderstanding gag**: "a folder called audios with a Z… wait not this kind of B" → wrong visual for one beat.
8. **Pop-culture moments** he reacts to ("Cars 3 crash… Oh it's so good. Oh it's so good.") — we use only factual/free footage, so we recreate the moment with our own 3D.
9. **Subscribe asks are jokes, mid-video, placed right after a self-roast.**
10. **Fixed sign-off catchphrase** every video (his: "Life is short so thanks for wasting a bit of it here. Until next time." — never copy it; Dave needs his own, e.g. "Spend smart. Or don't. I'm a stickman not your mom.").
Measured pace across 12 videos: **150–215 wpm, median ≈ 180**; quieter, slower intros (150–165) and fast rants (200–215).

### 11.4 The 75 % gap — what we must build (in this order)
1. **Worlds, not wallpapers**: every beat gets a `set`. Asset loader for GLB models + HDRI skies (CC0 first: Poly Haven, Kenney, Quaternius) committed to `public/3d/`. Shadows on.
2. **World screens**: chalkboard / projector / TV / floating card objects whose surface shows our UI, photo or number (canvas or image texture), so information is IN the world.
3. **Character acting**: animated loops for Dave (walk, type, sit, fall, run, dance) + CC0 mocap crowds/background people.
4. **Camera + motion feel**: 24 fps, motion blur on fast moves, wiggle on every static card, burst-and-hold timing (§5.9).
5. **Voice with a performer** (§4b).
6. Gag library: speed-lines hook world, personification skit kit (props: hats, cars, RV), boxing-match/tier-list framing kits, literal-metaphor builders (trucks, crowds, money walls).

### 4b. Voice — the honest truth (added after the channel study)
His "spirit" is a human actor reading his own jokes. Measured on 120 s windows: his pitch ≈ 155–159 Hz (young), smooth (2.6 semitones/100 ms) and almost continuous (3–8 short breaths per minute, ~0.22 s); our Chatterbox Dave ≈ 128 Hz (older), jittery (3.4), choppy (17–21 pauses per minute, ~0.44 s). Cloning HIS voice is illegal and off the table. Legal ways to get the same spirit, best first:
- **A. Owner records** (exactly his method; he is a non-native speaker too): phone in a quiet room/under a blanket → Adobe Podcast Enhance (free) → our aligner cuts stutters and long gaps automatically. Best spirit, free.
- **B. Hire a young English voice actor** (Fiverr/Voices.com, commercial licence + written consent to AI cloning) → clone THAT actor with ElevenLabs Professional Voice Clone → every episode in his voice with v3 audio tags (`[sarcastic]`, `[laughs]`, `[whispers]`, `[excited]`).
- **C. ElevenLabs v3 library voice + audio tags** (paid, no actor).
- **D. Free Chatterbox tuned** (cfg 0.3, breath-group beats, short pauses, +2–3 semitone pitch): ceiling ≈ 40 % of his spirit.

---

## 12. Deep study v2 — whole channel, every frame (28 Oct 2026, owner: "STYLE_3D is unfinished, analyse until it's enough")

**Data:** all 14 uploads (13 long + 1 short, 6,950 s). Every frame diffed (96×54), every hard cut detected, one still per shot → contact sheets, word-timed auto-captions for 10. Raw data: `qa_dl/chan/an/<id>/` (`shots.json` = start, length, motion, words per shot · `sheet_NN.jpg` = every shot · `diff.npy` = per-frame motion). Per-frame strips of 7 transitions: `qa_dl/chan/micro/`. Tool: `qa_dl/chan_tools/analyze.py <mp4> <outdir> [--sheets]`.

### 12.1 Channel-wide numbers (hard cuts only — card swaps inside home base are extra)
| Video | dur | cuts | median shot | flash cuts ≤ 0.2 s | shots ≥ 10 s | frames perfectly still |
|---|---|---|---|---|---|---|
| SLEEPING 30 days (ref) | 19:16 | 215 | 3.5 s | 18 | 23 | 82 % |
| No 3D animators (1.7 M) | 9:00 | 87 | 4.1 s | 3 | 18 | 63 % |
| BRAINROT 30 days (1.2 M) | 11:00 | 72 | 6.0 s | 1 | 18 | 74 % |
| How much YT pays | 5:32 | 46 | 4.9 s | 1 | 9 | 76 % |
| YouTube killer | 8:00 | 64 | 5.4 s | 2 | 18 | 59 % |
| Guru epidemic | 10:01 | 84 | 3.5 s | 17 | 16 | 58 % |
| others (6) | 4:30–10:16 | 41–81 | 2.1–6.5 s | 1–8 | 7–23 | 62–78 % |
→ **Rule:** a hard scene change every 3.5–6 s (median), 8–11 per minute, the first minute 2× denser (ref: 20 cuts in min 1). About **1 shot in 10 is a long "home base" talk shot (10–38 s)** carried by card/pose/face swaps instead of cuts. 1–18 flash cuts (≤ 6 frames) per video = transitions, not shots.

### 12.2 Shot types — what the screen actually shows (counted on the ref's 215 shots)
1. **Home base (≈ 45 % of time):** dark charcoal backdrop with a faint repeated icon pattern (newer videos) or white crumpled low-poly paper (older videos). Host **waist-up in the lower right**, pointing / shrugging at the content on the left. Content = floating screenshot / thumbnail / video card with rounded corners and a soft shadow, slightly tilted in 3D, wobbling.
2. **Acting shot in a 3D world (≈ 30 %):** lit set from free models (living room + couch, bedroom, forest, garage with whiteboard, library, yacht deck, city street in rain, school classroom with chalkboard, military parade, beach). Locked camera, host acts (sleeps, falls, types, gets hit).
3. **World scoreboard objects (≈ 10 %):** CRT TV on a brick wall showing a dark card "DAY 7 · views · subs · $" in 3 coloured rounded boxes (blue/red/green) → appears **every in-story day**; whiteboard checklist in the garage (plan → ticks); the money video uses the same CRT as a running ledger "ADS / SPONSORS / MERCH / MEMBERSHIPS / TOTAL".
4. **Week report card (5 in ref):** pure black, "Week ①", 4 rows with dotted leaders (Views / Subscribers / Revenue / Rating) and a coloured letter grade (C- → B → A → S). Holds 8–13 s.
5. **Big number / title plates:** 3D outlined white chunky text in the world ("30 DAYS" on a table, "DAY 3"), counters over a sky plate ("1:27:54 Average Watch Time" ticking up one unit per frame), grey concrete plate with white stencil word for chapters ("ADS", "SPONSORS", "MERCH"), typewriter monospace maths on white paper ("VIEWS......48,214 /1,000 · RPM......$15.00").
6. **Screen recordings (≈ 10 %):** real tools (Studio, keyword tool, Premiere, stock sites) full-frame with the host cut-out overlaid lower right.
7. **Experiment-series devices (BRAINROT + SLEEPING both):** CRT TV with the day card + **tear-off wall calendar "day N"** next to it (hard cut to it every in-story day) · our own uploads shown as **vertical 9:16 rounded cards floating in home base** with a view badge beside ("700K views") · the number of the day under the card ("DAY 3").
8. **Process-video chapters (How I Make):** white plate, small spaced "STAGE 1" + huge pixel/blocky title "SCRIPTING" + one icon + a progress bar that grows across the video (3 % → 7 % → 13 %).
9. **Real footage montage (rare, 70 s once):** shaky GoPro clips with fisheye vignette and light-leak flashes — his vacation/sponsor block. Skip for us.

### 12.3 Frame-exact recipes (30 fps content; counted frame by frame in `micro/`)
| Moment | Frames | Recipe |
|---|---|---|
| **Time-skip flash** (0:08.5) | hold 9 → 2 pink-red light leak wipe from left → 3 near-white overexposed → 1 dark gradient wipe reveals new pose → hold | 6 frames total, no fade |
| **Emphasis punch-in** (0:17.7) | hold 26 → **1 frame white silhouette with black outline at the NEW framing** → closer camera + new face (angry) + background also scaled up | number "500" types in one digit per frame (5 → 50 → 500) inside a white comic burst that grows over 3 frames |
| **Whip-zoom to reaction** (1:04.8) | counter ticks +1 per frame → 3 frames heavy directional motion blur → hard cut to close-up wearing pixel sunglasses, money raining | |
| **Hit / smear** (4:04.2) | hold 19 → 1 wind-up blur → 2 full-frame smears → 1 white impact frame → comic "WHACK!" with white radial spikes 3 frames → spikes gone, word stays and shakes | |
| **Realisation zap** (4:17.5) | 1 smear → **3 frames black/white threshold** (photocopy) → 17 frames cyan-inverted lighting + boiling lightning drawn on the character → hard cut to the next set | |
| **Light-leak montage** (12:54) | 1 bloom → 6 white/orange leak frames → leak fades over 6 while handheld clip runs | real-footage only |
| Pose swap | instant; character holds 10–40 frames between swaps | never tweened |

### 12.4 Character acting rules (for Dave — never his cat-hood design)
- Face is a **flat drawn face on a dark/plain head** that changes per line (XD, X O, angry brows, sad, smug). Body pose changes ~every 1–3 s in home base, face more often.
- Background people / past self / "average creator" = **plain white round-head stickmen**, often in crowds (identical copies).
- **Costume gags**: tricorn hat, white beard (Gandalf), pixel sunglasses, party hat — a prop on the host = an instant joke.
- Host is cut out with a **black outline** (grease pencil) so he reads over any plate.

### 12.5 What we must NOT copy (copyright)
He uses Pixar / Spider-Verse / LEGO Movie / Rick & Morty / Gandalf clips and a game-soundtrack song under fair-use commentary. We replace them with our own 3D shots, CC0 models and licensed music. His mascot, voice and jokes stay his.

### 12.6 The Instagram "Higgsfield" reel (owner sent, 86 s, analysed every 0.25 s)
It is **Higgsfield "Katana"**: Claude driven through the Higgsfield MCP writes **motion graphics** (neon kinetic type on a dark grid, glow, particles, wireframe 3D shapes, morphing labels, a 1-frame white flash between titles). It is code-made animation — **the same kind of thing our Remotion kit already renders for free**. So: Katana-style titles = build in Remotion (`src/v6/`), no subscription. Real AI *video* (photoreal or 3D-look clips) is what costs credits.

### 12.7 Best mix (owner approved 28 Oct)
- **Free core (every episode):** Remotion three.js / Blender 3D Dave + CC0 worlds + the §12.3 transition recipes + home base + CRT scoreboard + week report card + Katana-style kinetic titles.
- **Higgsfield (paid credits, optional):** only hook shots that need a "wow" (5 s clips). Free plan = 10 credits ≈ 1 image (Nano Banana 2, 2 cr) + 1 clip (Seedance 2.0 Mini / Grok 1.5 Lite, 5 cr). Always `higgsfield generate cost` first; never spend without the owner's OK.

### 12.8 Build order (replaces §11.4 order)
1. Transition kit exactly as §12.3 (light-leak flash, white-silhouette punch-in, whip-blur, smear+comic burst, threshold+zap, digit-per-frame number type-on).
2. Home base v2: charcoal icon-pattern backdrop + tilted rounded wobbling card + Dave lower-right waist-up.
3. World objects: CRT TV daily scoreboard, week report card, whiteboard checklist, concrete chapter plate, typewriter maths plate.
4. 3D worlds from CC0 GLB (living room, bedroom, garage, classroom, street) + white stickman crowd.
5. Costume prop library for Dave.

### 12.9 Test 1 — Higgsfield vs free kit (28 Oct, same line, `videos/v6_compare/compare.mp4`)
Line: "school spent 12 years teaching me triangles and zero minutes teaching me taxes".
- **Higgsfield** (Nano Banana image 2 cr + Seedance 1.5 i2v 4.8 cr): film-quality light/materials/expression, Dave on-model. BUT 4 s only, continuous floaty motion (no burst→hold, no snaps, no punch-in), camera reframed by itself, free plan blocks Seedance 2 / Grok / Kling video ("job_minimum_basic_plan_required"). 3.2 credits left.
- **Free kit** (`src/v6/Classroom.tsx` TaxShot, CI render): the edit grammar is exact (hold → face snap → 2-frame white-silhouette punch-in → smear → comic burst), unlimited, re-editable per line. v2 added window key light + real shadows, vignette, sweat drop, tighter framing. Still behind on materials, hand acting (paper hides body) and set detail.
- **Verdict / use:** AI clips = rare hero/hook plates only (and stills as backgrounds for static shots); every acting shot = free kit. Next upgrades to close the look gap: CC0 GLB props + HDRI, Dave hands that grip props, AO/bloom post pass, depth of field on close-ups.

---

## 13. Gap analysis vs the reference (29 Oct 2026, "The YouTube Killer You Haven't Heard Of", 6YakH_jGjUs, first 36 s every 1/8 s, vs our test1 v3)

**Measured:** his first 12 s = **72 % of frames moving** (mean motion 4.2); ours = **14 %** (1.3). Over 36 s: his 54 %, ours 10 %. We have MORE cuts (30 vs 7 hard changes) but almost nothing moves inside them — we are a slideshow of good stills, he is an animation. This is gap #1.

What he does in the first 36 s (the hook):
| t | shot | what moves |
|---|---|---|
| 0.0 | the TOPIC as a character: a red bodybuilder with a YouTube-logo head standing in a mansion yard full of money bags + sports cars | idle flex, camera slowly pushes |
| 1.5 | a giant fist punches into frame from the foreground (motion-blurred), the character gets hit | 6-frame action |
| 2.4 | hard cut to white lined paper: a growth graph DRAWS itself while the tiny character drives a toy car up the line | line + car animated every frame for 3 s |
| 5.4 | camera zooms onto the car, character turns its head | push-in |
| 7.1 | volcano hellscape, an ARMY of soldiers marching, each carrying a creator's thumbnail card | marching mocap crowd, flexing giant, 8.5 s continuous |
| 15.6 | whip-zoom with motion blur → close-up of the giant roaring in fire | whip + flames |
| 17.5 | white paper → purple panel wipes in from the left (Twitch), then a green one (Rumble); host lower-right points; thumbnails fly in with motion blur and land in stacks | wipes + flying cards |
| 24.0 | dark graffiti alley, a black SILHOUETTE; light sweeps across and reveals the Odysee character (white body, pink head) | light reveal over 0.75 s |
| 27.0 | logo + red arrow pop next to it, a tweet card slides in | pops |
| 32.5 | full-screen YouTube UI scroll | scroll |
| 35.5 | host leaning out of a box at a ringside | idle |

### What we miss (in order of impact)
1. **Real animation, not held stills.** Acting shots must be rendered as moving frames: characters walk/flex/drive/turn, cameras push and whip, objects fly. Pose-state stills are allowed ONLY for home base and for deliberate holds. Target ≥ 50 % moving frames in the first 12 s.
2. **Concepts become characters.** He personifies the topic (YouTube = muscle giant, Odysee = white figure, creators = an army carrying their cards). We only had Dave + props. Every video needs 1–3 "concept characters" built from the kit (box/logo head on a body, crowds of copies).
3. **A new WORLD every 5–8 s, matched to the sentence** (mansion of money → graph paper → volcano hell → alley at night → UI). We used one classroom for a minute.
4. **Frame 0 = the most spectacular image + motion.** Ours opened on a static wide still for 3.4 s with a small Dave (the exact 5–10 s drop-off the owner measured). His opening shows the subject huge, in a rich world, already moving, with an action at 1.5 s and a new world at 2.4 s.
5. **Camera language:** slow push-ins, whip-zooms with motion blur, foreground objects (the fist), low hero angles, close-ups for emotion. Ours: locked cameras only.
6. **Dramatic lighting per mood:** fire orange, night alley, silhouette → light-sweep reveals. Ours: flat daylight.
7. **Living diagrams:** graphs that draw themselves with a character riding the line, panels that wipe in, cards that fly in with blur and land in stacks.
8. **Scale:** the subject fills 40–80 % of the frame in most shots; our wide shots kept Dave at ~10 %.

### Build plan to close it (before the next video)
- `blender/anim.py`: keyframed animation on the Dave rig and concept-character rigs (walk cycle, flex, point, drive, turn-head, fall), crowd duplicator with offsets, camera moves (push, whip with motion blur, orbit), light-sweep reveals. Render real frames at 24 fps, 1080p, Cycles 12–16 samples + denoise, split over up to 20 parallel GitHub jobs (~40–60 s per frame each).
- `blender/worlds.py`: a library of quick worlds (graph-paper void, money mansion yard, volcano/fire, night alley, city street, studio void with HDRI) — CC0 Poly Haven HDRIs + models.
- Remotion: wipe panels, flying-card stacks with motion blur, self-drawing graph line.
- Hook template: 0.0 s subject huge + moving in a rich world · 1.5 s action hit · 2.5 s new world · ≥ 4 worlds in the first 15 s · ≥ 70 % moving frames in the first 10 s.

### 13.1 Animation kit — built 29 Oct 2026 (use it for every acting shot)
- **`blender/anim.py`** = the template for animated shots: one `--frames "<SHOT>:<from>-<to>"` chunk per GitHub job, every frame rendered (24 fps, Cycles 16 samples + denoise, motion blur on), frames `<SHOT>_<n>.jpg` → the workflow joins them into `<shot>.mp4` (+ vignette + film grain). `blender/anim.chunks` = 12-frame chunks (≈ 20 parallel jobs for 10 s). Preview first: `blender/RUN` = `anim preview 12 cycles` with 2–3 frames per shot.
- **Rig API (`blender/lib.py`)**: `blend(a, b, t)` in-betweens two poses, `ease` / `back_out` (overshoot), `legs_walk(phase)` walk cycle, `squash(t)` squash & stretch on hits/landings, `life(f)` idle micro-motion (never frozen), `key(f)` keyframes the whole rig per frame (so motion blur works). Concept characters = `Dave(...)` + `outfit("muscle")` + a box head with a logo texture (`mascot()` in anim.py).
- **Live face**: `dave.live(f, expr, talking)` → mouth flaps (from the voice with `load_voice(wav)`; a natural fallback pattern without voice), blinks every ~3 s, the ink lines "boil" (3 drawings swapped every 3 frames). Textures `blender/tex/live/<expr>_<c|o|b>_<k>.png` from `make_tex.py`. Expressions: neutral grin shock think determined panic smug spiral dead.
- **Finishing pass**: `finish()` (bloom on lights, slight lens dispersion, warm grade) + `dof(camera, target)` on close-ups; vignette and per-frame grain at assembly.
- Gotchas learned: Principled mix-shader Fac defaults to 0.5 (washed-out white) → set 0; white sheen turns red cloth pink → sheen 0.3 tinted; `read_factory_settings` wipes frame handlers → `_ensure_handler()`; GitHub artifact names can't contain `:`; a compositor ellipse mask left a ghost oval → vignette in ffmpeg instead.

## 14. Hook study — the first 10 s of all 13 long videos (29 Oct 2026, sheet `qa_dl/cmp/hooks_all.jpg`, 2 fps)

| Video (views) | 0–10 s, in order | Type |
|---|---|---|
| Why are there no 3D animators (1.7 M) | dark empty concrete room (mystery), host walks in, creator name cards pop on the wall; the TITLE is the open question | curiosity title + moody world |
| BRAINROT Shorts 30 days (1.2 M) | tear-off calendar flipping ("30 days") on a green speed-lines tunnel, short cards fly past, stopwatch, host flies through the tunnel — never still | time-limit device + constant motion |
| SLEEPING videos 30 days (860 K) | his sleeping-video thumbnail with a VIEWS counter rolling 557 K → 995 K (the RESULT first), stopwatch "CLICK!" comic, giant eyeball close-up, stickman asleep on a couch | result proof + deadline + absurd close-up |
| NICHE Pride Flags (241 K) | white void, host + logo pops, crowd of icons explodes outward, flags | topical + pops |
| YouTube Killer (87 K) | concept character (YouTube muscle giant) in a money mansion, punch, self-drawing graph ride, volcano army | personification + rich worlds |
| How much YouTube pays (86 K) | host on white, "1 YEAR" title, cards flying in, "10 videos / 13 shorts" counters | numbers + cards |
| Guru epidemic (50 K) | real man talking to camera + kinetic text | talking head (weakest look) |
| others 18–61 K | mostly the host on a plain white or grey room talking, slow | static start |

**What separates the hits (≥ 800 K) from the rest:**
1. **Second 0 shows the RESULT or the STAKES as a picture that moves** — a views counter rolling up, a calendar of 30 days flipping — never the host introducing himself on an empty background (that is how the 18–35 K videos open).
2. **A time-limit device in the first 3 s** for experiment videos (calendar, stopwatch, "30 days") = the deadline the loop closes on.
3. **One absurd or spectacular close-up by second 5** (the giant eye, the punch, the speed tunnel).
4. **4–6 different visuals in the first 10 s, with motion inside each.**
5. The spoken line is a question or a promise whose answer is the end of the video (§0.10 C); the title itself can be the open loop ("Why are there no…").

**Hook template (use for every new video, write the brief against it):**
- 0.0–1.0 s: the RESULT / STAKES image, already moving (counter rolling, money pile growing, the concept character in its world).
- 1.0–3.0 s: the time-limit or challenge device (calendar / stopwatch / scoreboard) + the question spoken.
- 3.0–6.0 s: a spectacular or absurd action shot (punch, whip-zoom close-up, crowd, speed tunnel).
- 6.0–10 s: Dave in the first world of the story, the plan in one sentence, and an open loop ("…and by day 30 something happened that I did not see coming").
- Never: a still frame, an empty background, a logo intro, a greeting, or the answer.
- **Worlds**: `world_hdri(mood, strength, rot)` real Poly Haven skies (golden, day, night, city = a real street, studio) + `ground(kind, size, scale)` (asphalt, concrete, brick, grass; scale ≈ 3 for realistic tiling). Rotate the sky so **no brand billboard** is in shot.
- **Crowds**: `crowd(dave, rows, cols, …)` = linked copies of an already-animated character (armies, queues, "everyone else"). Background people use `outfit("none")` (plain white).
- **Real human motion (CMU mocap, free)**: `blender/fetch_mocap.py` downloads BVH by id (02_01 walk, 02_03 jog, 02_04 jump, 02_05 punch, more in the cmubvh READMEs); `Mocap(id)` + `mocap_pose(dave, m, i, base, turn)` retargets it onto Dave every frame. Use for walks/runs/fights/dances and for crowds.
- **Living 2D graphics** (`src/v6/kit2.tsx`): `SelfDrawGraph`, `WipePanel`, `FlyStack`, `Shake`. `src/v6/AnimTest.tsx` shows how animated shot mp4s (public/anim, re-encoded crf 23 ≈ 2–4 MB) are cut with 2D layers and SFX.
- **Voice engine switch**: `"cb": {"engine": "turbo"}` in the episode JSON uses Chatterbox-Turbo instead of Chatterbox (pick after the owner listens to `videos/voice_bakeoff2/`).

## 15. Hook REVERSE-ENGINEERED (30 Oct 2026, owner: "your hook is not attaching at all") — his top 3 at 4 fps + captions, vs ea1
Strips: `qa_dl/chan/hook/strip_*.jpg` (his `_-px6J9nqKg` 1.7 M, `rxN7qVpjryY` 1.2 M, `9yXNBbf3TW0` 860 K, ours `strip_ea1.jpg`), captions `qa_dl/chan/hook/*.vtt`.

### 15.1 What happens second by second
| t | BRAINROT 1.2 M | SLEEPING 860 K | NO 3D ANIMATORS 1.7 M |
|---|---|---|---|
| 0.0 | already mid-motion: green speed tunnel, calendar flies in | his thumbnail card (the video itself) | dark empty concrete room, silence = mystery |
| 0.3–1.8 | calendar days get **crossed out one every 0.25 s** (deadline made visible) | 1.5 s: giant **VIEWS counter rolls 547 K → 963 K** in 1.5 s (the RESULT first) | 1.0 s: ceiling light flicks ON (sound) |
| 2–4.5 | cards with escalating numbers swap every 0.5 s (1 face → 4 faces → 64 cells) | 3.25 s: **macro close-up** stopwatch fills the frame, comic **"CLICK!"** | 2.0 s: figure with glowing eyes in the doorway, crawls in |
| 4.5–7.5 | whoosh into a light tunnel, host **surfs a growth arrow** | 5.25 s: **absurd scale** — eyeball bigger than the host | 5.5 s: opens a treasure chest |
| 7.5–10 | host big in frame, stopwatch | 7.5 s: couch, 8.5 s **white flash** → asleep, Zzz | 7.5 s: first name card flies in **on the spoken name**, one per name every ~1 s |
| 10–12 | **wall of money** = the prize, host turns to camera | 9.75 s: video-player UI, red progress bar racing (fast-forward) | 14 s: the big number ("50 million subs") + absurd comparison (Poland, Spain, Canada) |
| words | challenge + deadline + question by 11 s: "For the entire month of January… only 30 days and can I get the channel monetized?" | counter-intuitive insight by 8 s: "the best viewer is an asleep viewer" | the title IS the open question; the voice starts at 7 s on a list of names |

### 15.2 The rules (measured)
1. **Frame 0 = the most valuable thing in the video** (the result, the prize, the money, the mystery) — never an establishing shot. Ours opened on a wide room with Dave at ~8 % of the frame walking for 5 s; our best image ($33 M cash rain) came at 36 s.
2. **New image every 0.5–1.5 s for the first 12 s.** His: 8–10 distinct visuals in 12 s. Ours: 2 (a wide shot for 5 s, then ONE photo card held 7 s).
3. **Something counts or ticks in the first 3 s** (counter rolling, calendar days crossed, numbers escalating) — progress the eye follows.
4. **Scale shock:** macro close-ups (stopwatch, eyeball) and the subject at 40–80 % of the frame. Never a small figure in a big room during the hook.
5. **Sound design carries it:** light switch clack, "CLICK!" comic word = sound word, whoosh into tunnels, silence then a hit. The hook has the densest SFX of the video.
6. **Words = stakes + proof + question within 8–11 s**, and every noun spoken gets its own image on that word (names → name cards land on each name).
7. **Rhythm:** hold → hit → hold → hit; white 1-frame flash between worlds; never a fade.
8. **No information card in the first 10 s.** Info cards (source photo, bio) come after the viewer is hooked; his first 12 s have zero text blocks except numbers.

### 15.3 Hook template (use for EVERY video, long + Shorts)
| t | slot | content |
|---|---|---|
| 0.0–1.5 | **PRIZE / RESULT** | the most spectacular true image + a rolling number (sourced) |
| 1.5–3.5 | **STAKES** | close-up / scale shock + comic sound word |
| 3.5–6 | **TWIST** | the surprising fact that makes it a story ("…and he still won") |
| 6–9 | **QUESTION** | the title question spoken while a new world slams in |
| 9–12 | **PROMISE** | what we'll see by the end (withheld result), Dave big in frame pointing at "you" |
| 12+ | context/info cards (bio, photo, sources) | only now |

## 16. Whole-style REVERSE-ENGINEERING v2 (30 Oct 2026, owner: "did you reverse engineer his whole style or just the hook?")
Data: his top 4 (`9yXNBbf3TW0` 860 K · `rxN7qVpjryY` 1.2 M · `_-px6J9nqKg` 1.7 M · `6YakH_jGjUs` 87 K), full captions → `qa_dl/chan/re/text_*.txt`; tools `qa_dl/chan_tools/script_re.py`, `tools/re/audio_re.py` (sound), `tools/re/camera_re.py` (camera + colour) — the heavy ones run on CI (`refanalysis.yml`, ids in `tools/re/IDS`, numbers only, no media kept).

### 16.1 Writing — measured
| | Sleeping 860 K | Brainrot 1.2 M | No 3D 1.7 M | YT killer | ea1 (ours) |
|---|---|---|---|---|---|
| words / sentence | 15.6 | **8.9** | 12.6 | 13.8 | ~20 |
| numbers spoken / min | 4.3 | 5.6 | **6.9** | 2.3 | ~6 |
| questions / min | 0.4 | 0.7 | 0.9 | 1.0 | 2 (hook + end) |
| 1–3-word punch lines / min | 0.5 | 1.4 | 1.2 | 1.3 | **0** |
| skit dialogue lines (other characters talk) | **33** | 0 | 0 | 6 | 0 |
| "I" vs "you" / min | 8.1 / 2.8 | 5.0 / 1.6 | 2.8 / 2.6 | 4.0 / 4.5 | Dave → "you" |

Rules:
1. **Mini-loop every 20–40 s:** set up an attempt/claim → expectation → the RESULT with a number → a 1–3-word reaction ("Dayum!", "Kill me.", "It flopped.", "I forgor."). Our scripts deliver facts without the reaction beat → add one punch line every 40–60 s.
2. **Running gag / recurring motif** that pays off 4–6 times ("flatlined at 15,000" ×6, "I'm a tumor" ×5, "Canadians. Where are you?"). Every video picks ONE from its own topic and repeats it on a schedule.
3. **A personified problem** ("my arch nemesis" = the 15 k wall). The obstacle gets a name and a body.
4. **Fake-out before the real number** ("we reached an insane five thou— I'm just kidding. We lost 3 subs.") — at least once per video, near the end.
5. **"Have a guess."** — invite the viewer to predict, then hold 1 beat before the number.
6. **Scoreboard at every chapter turn** (Day 2: 39 subs · week report: subs / views / hours) — the viewer always knows the score.
7. **Short sentences when the stakes rise** (Brainrot, his best performer, averages 8.9 words per sentence).
8. **Skits:** other characters speak in their own voices for 2–6 s (a German waiter, a priest "Yes my child", the tumor). Our TTS can do a second voice — use 1–3 skit lines per minute in long videos.
9. **Ending (last 30–60 s):** a "two theories / lesson" layer (the moral, short), the honest verdict, a reason to come back (a dated follow-up: "every April I post the numbers"), a comment question, then a SIGNATURE sign-off line used in every video. No recap. → Dave needs one fixed sign-off line of his own.
10. **Music-only breaks** between chapters (Sleeping: 26 in 19 min ≈ one every 45 s, 2–4 s each) — a breath with a visual montage, then the next status report.
