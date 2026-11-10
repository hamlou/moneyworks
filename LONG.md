# LONG.md — EVERYTHING for long-form episodes (16:9, 10 min+)

> Owner, 10 Nov 2026: one .md for Shorts + one for long, accumulated WITHOUT missing anything. Every old file is below VERBATIM
> as a tagged part (only its headings moved one level down and file names changed to the new part tags).
> Read a part with grep/line ranges (low tokens). A reference like `[MUST] §2` = section §2 inside that part of this file.
> Old bare `PLAYBOOK §x` (no suffix) = LONG.md [PLAYBOOK] §x, except inside SHORTS.md [PLAYBOOK] where bare `§x` = that part.
> Shared parts ([3D], [POSTMORTEM], [LICENSES]) exist in BOTH files with the same text: when you edit one, edit the other too.

> New episode: read [RECIPE] only (owner 30 Oct 2026: low tokens), open other parts with grep when a step needs them.
> [3D] §0 (v7 standard) wins over every older rule. Shorts rules are in SHORTS.md — never mix them (owner, 11 Oct 2026).

## Parts (priority order: on a conflict the HIGHER part wins)
| tag | was | what |
|---|---|---|
| [RECIPE] | EPISODE_RECIPE.md | THE file for a new episode (ea1 style, low tokens) — start here |
| [3D] | STYLE_3D.md | v6/v7 3D style standard — wins over everything below (shared with SHORTS.md) |
| [PLAYBOOK] | PLAYBOOK_LONG.md | Long-form playbook (older base rules; 3D/RECIPE win on conflict) |
| [UPGRADE] | UPGRADE.md | Upgrade an existing long episode (JSON only) |
| [BRIEF] | AGENT_BRIEF.md | Brief for parallel builders + approved topics ep61–75 |
| [INDEX] | PLAYBOOK.md | Old playbook index (how the split was made) |
| [POSTMORTEM] | POSTMORTEM.md | Every public video: why it failed, what to keep (shared) |
| [LICENSES] | LICENSES.md | Monetization-safe assets (shared) |

---

## [RECIPE] — was EPISODE_RECIPE.md

## EPISODE RECIPE — the ONLY file to read for a new episode (owner 30 Oct 2026: same style as ea1, far fewer tokens)
Style = ea1 (reverse-engineered, owner-approved). Do NOT re-read LONG.md [3D] / PLAYBOOK_*.md / lib.py / Ea1.tsx in full —
the rules below are the summary; open a file only with grep or a line range when a step needs it.

### 1. Locked style (checklist — every episode)
- **Hook 0–12 s** (LONG.md [3D] §15.3): 0 s PRIZE/RESULT (most spectacular true image + rolling number) → ~4 s TWIST → ~7 s QUESTION (= title, new world slams in, white flash) → ~12 s PROMISE (Dave points at you). New image every 0.5–1.5 s, densest SFX, no info cards before 12 s.
- **Writing** (§0.1, §16.1): natural connected sentences, no commas, no fragment chains; short sentences when stakes rise; mini-loop every 20–40 s (claim → result with number → 1–3-word punch line); ONE running gag repeated 4–6×; one "have a guess"; one fake-out near the end; scoreboard card at every chapter turn; music-only breath between chapters; end = lesson + honest verdict + comment question + Dave's sign-off line.
- **LOOP STACK (long-form, owner 31 Oct 2026 — mandatory)**: never one loop per chapter. Main promise L1 opens in the hook and pays off ONLY in the last chapter; ≥ 2 loops open at every moment; every chapter ends on a teaser that opens the next; ≥ 2 long arcs that span 2+ chapters (e.g. a cold-open object paid off late, "keep an eye on X… later"); every loop closes. Tag them ⟨open:ID⟩ ⟨close:ID⟩ in `<id>_full_script.md`; `py tools/loopcheck.py <id>` must print LOOPS OK before voicing.
- **BODY = LONG.md [3D] §17** (owner 31 Oct): still hand-picked poses per beat (cut, don't tween), facts as real artifacts (macro highlight of the real sentence, real 0.5–1.5 s clips, 3D props) — NOT Dave beside a text card; a 'but' turn every 10–20 s, a big new problem every 30–60 s; every visual = the exact words + a gag.
- **Facts**: every line has a source tag [Sx]; sensitive people → only quotes/attributed paraphrase, claims paired with fact checks, no verdict from Dave.
- **Look**: Blender Dave (suit/hoodie per role), ≥ 50 % real 3D, frame-0 motion, shake/flash on hits; home-base cards with Src line.
- **Sound**: per-scene music (`<Music segs>` kit2, KM CC-BY library `public/music/km`, silence before punchlines, credit tracks), ≥ 50 SFX cues/min, own sounds via `pipeline/sfx/<id>.json`.
- **No**: memes, thumbnails, owner's voice, limb clipping (`py tools/clipcheck.py` must pass).

### 2. Steps (copy, don't rewrite)
1. `py tools/new_ep.py <id> "<Title>"` → scaffold from ea1 (json draft, sfx plan, blender shots, TSX registered).
2. Research: max ~6 standard searches + ~3 page reads (web-fetch agents in parallel). Facts → `sources` list in the draft.
3. Write `<id>_full_script.md` (chapters + ⟨open/close⟩ loop tags + [Sx]) → `py tools/loopcheck.py <id>` → `py tools/md2beats.py <id>`; hook beats k1–k4 in `pipeline/episodes/<id>_draft.json` (k1–k4 hook + body). Rename to `<id>.json` + push → voice auto (only new lines voiced; ~3–10 min).
4. While voice runs: edit `blender/<id>.py` shot states (reuse ea1 shots H/S/M/C/E/K, change props/text only), `blender/<id>_lens.json`, `.chunks`, `blender/RUN`; sounds `py pipeline/sfx_synth.py <id>`.
5. Voice done → `git pull`, `ffmpeg -i pipeline/voice/<id>.flac -af atempo=0.9 public/<id>/voice.flac`; set shot lengths from beat times; push blender → full render.
6. Edit `src/v6/<Id>.tsx`: only the anchor words (`at('k1','word')`), card texts, Src lines, cues, music segs.
7. Shots done → copy `shot_*.mp4` (crf 23) + `cut_*.png` to `public/<id>/` → push → `gh workflow run v6demo.yml -f comp=<Id>`.
8. QA: ONE 12-s hook strip at 4 fps + ONE contact sheet at scale 0.5; loudness check by `volumedetect` numbers only.
9. `videos/<id>/` + description (sources + music credits + LONG.md [LICENSES] footer).

### 3. Token rules (how Claude works on episodes)
- Never read whole big files; `grep -n` then `sed -n a,bp`. Never re-read a file just edited.
- Images: max 3 per episode (hook strip, one sheet, one cut-out), scaled ≤ 0.5. No per-shot sheets.
- Waits: one background command that blocks until done (`until … completed`), never polling/status checks in between.
- Research results go straight into the JSON `sources`; no long summaries to the owner.
- Replies to the owner: short status + what's needed from them. No tables of options unless a decision is needed.
- Long work (render, voice) runs in parallel with the next step (memory: work while waiting) — but no extra analysis nobody asked for.
- New reverse-engineering / style studies only when the owner asks.

---

## [3D] — was STYLE_3D.md

## LONG.md [3D] — v6 "3D ANIMATOR" STYLE + v7 STANDARD (owner, 23–29 Oct 2026) — NEWEST, overrides every other rule in this repo where they conflict

**Owner's words:** "I definitely liked this video. The script and the 3D animation are incredibly amazing. This is the type of videos I want my channel to be like. My current videos feel too robotic in the editing. I want it to feel like it's edited by a 3D animator. Copy the way he speaks, his script, the way he montages and the 3D animation. Go more than 99 % with this video style and keep 1 % of our old .md files (no commas and the things that don't conflict). Our voice-over is still too far from this video. Make it the SAME (don't clone the voice, that's illegal)."

**Reference video:** "I posted SLEEPING VIDEOS for 30 days to make GENERATIONAL profits" (3D animator channel, 85.9 K subs, 468 K views in 3 days, 19:16) — https://youtu.be/9yXNBbf3TW0. Everything below was measured on that video (frame sheets every 3 s, scene-cut detection, YouTube word-timed captions), not guessed.

**What we copy:** the FORMAT, the WRITING, the PACE, the EDIT GRAMMAR, the 3D LOOK and the DELIVERY STYLE. **What we never copy:** his character design (the hooded cat-ear mask), his voice, his footage, his music, his jokes word for word, his UI screenshots. Our host stays **Dave** and our words stay ours.

**The 1 % we keep from the old playbooks:** zero commas in spoken text (§0.11 A — his sentences already run on with "and / so / but", it fits perfectly) · Dave hosts in the first person to "you" (§0.12) · research standard + sources (§4) · free-licence photos only, each used once (§0.10 C) · real people only in factual context · "education not advice" · `at`-word anchoring of every visual and sound (LONG.md [UPGRADE] §4) · thumbnails + SEO tooling (§0.6, §5b) · pipeline/build steps (§8). **Everything else that conflicts with this file is retired** (see §9 for the exact list).

---

### ★★ §0. v7 STANDARD (owner, 28–29 Oct 2026) — THE CURRENT RULES FOR EVERY VIDEO (long-form AND Shorts). Read this first; it wins over every other line in every .md file of this repo.

**Why it exists:** the owner approved the 1-minute test `test1` ("Dave goes back to school", `videos/v6_test1/test1_v3.mp4`, built 29 Oct 2026) after four review rounds. Everything the owner corrected in that session is written here as a hard rule. Old rules that conflict are **retired** (list in §0.9). If a rule below is missing for your case, follow the closest older rule that does NOT conflict with this section.

**Template to copy for every new video:** `pipeline/episodes/test1.json` (script) → `blender/test1.py` + `blender/test1.chunks` (3D pose-state stills) → `src/v6/Test1.tsx` (edit on the voice) → composition registered in `src/v6/Root.tsx`. Never rebuild the kit; add new states/props/sets to `blender/` and new components to `src/v6/`.

#### 0.1 Script — a human talking, never a book (owner 29 Oct: "it's not a book, it's someone speaking naturally like humans")
1. **Zero commas AND zero fragment chains.** A comma rule cheated with full stops is still a violation. NEVER: "…do my taxes. 12 years. That is…", "Day one. Math class. Finally numbers.", "for the word interest. Four hundred pages. Zero interest." ALWAYS one connected spoken sentence per thought, linked with and / so / but / because / which / and then: "…zero minutes teaching me how to do my taxes. And twelve years is about as long as a dog lives so a whole dog lived and died while I was learning triangles." / "So on day one I walked into my math class. And I was so happy because finally there were numbers…" / "…in four hundred pages there was zero interest which is also exactly how much I had left by page ten."
2. **Chapter labels are visual, not spoken alone.** "Day 1" appears on screen (chalkboard, title, world object); the voice says it inside a sentence ("So on day one I walked into…").
3. Each beat = one breath group of 15–45 words. Every line must make sense to someone who heard ONLY the previous line (no jumps that confuse the viewer).
4. Dave = first person to "you", experiment format (goal + deadline + scoreboard), fake-outs, absurd real comparisons with a sourced fact (e.g. 12 years ≈ a dog's life), callbacks. Real numbers stay real and sourced in `sources`.
5. Validate before voicing: no `,` in any `text`; no sentence under 5 words unless it is a deliberate punchline after a long sentence (max 1 per 30 s); no line that starts with a bare label ("Day one." "Math class.").

#### 0.2 Voice
- **Voice is automatic + FAST** (30 Oct 2026: per-line cache `pipeline/voice/beats`, only changed lines are voiced, one line per machine up to 20, installs + models cached; seed an already-voiced episode with `py pipeline/tts_cb.py <id> --seed`) (29 Oct 2026): pushing a changed `pipeline/episodes/<id>.json` starts `voice.yml` by itself (12 free GitHub machines, ~5 min for a 10-min episode), which commits `pipeline/voice/<id>.flac/.json`; it skips scripts whose voice is already up to date. **Engine = current Chatterbox (owner choice, 29 Oct 2026: "chatterbox current is good for now, keep it")** with `"cb": {"cfg": 0.25, "exag": 0.5}`, slowed to ~190 wpm in the edit (atempo). Male voice only (Dave is a man). `"engine": "turbo"` exists but is not the default. Dia (Apache 2.0) is only usable on a GPU (`gpu/modal_jobs.py`, Modal free tier) — on CPU it took 2 h per minute of audio.
- The owner will **NOT** record their own voice. Never ask or suggest it again. Voice = Chatterbox via `voice.yml` with `"cb": {"cfg": 0.25, "exag": 0.5}`; per-beat `exag` 0.45 dry / 0.55–0.6 hype.
- Chatterbox reads long sentences at ~230 wpm → the edit slows the cached voice with ffmpeg `atempo` (test1: 0.82 → ≈190 wpm) into `public/<id>/voice.flac`, and the TSX multiplies every word time by `STRETCH = 1/atempo`. Measure wpm after every voice run (target 180–200) and pick atempo = measured/190.
- Paid alternative only if the owner asks: ElevenLabs v3 library voice (never a clone of a real creator).

#### 0.3 Dave — 3D, dressed, costume per scene (owner 29 Oct)
- **Rig:** `blender/lib.py` `Dave` = white ball head with ink-line face decals (`blender/tex/face_*.png`, made by `blender/make_tex.py`), stickman limbs as bevelled curves, Freestyle black outline, 1-frame white-silhouette swap (`dave.flash(True)`).
- **Default outfit = red OVERSIZED hoodie + wide black pants** (`OUTFITS["hoodie"]`): baggy torso profile, sleeves that bunch at the cuff, pants that fold over white sneakers, hood, ribbed hem band, kangaroo pocket, drawstrings, waistband, knit fabric shading (sheen + bump). Clothes must read as CLOTH in every pose including sitting — never as colour painted on thin limbs (owner: "he seems like just a colored painting"). After any rig change render a sitting AND a standing preview and check this.
- **Costume = the role of the scene** (an instant joke, like the reference's hats and beards): teaching → `professor` (brown jacket, round glasses, mortarboard); medical → `doctor` (white coat, head mirror); business/bank/boss → `suit` (dark suit, red tie). Add new outfits to `OUTFITS` for new roles (chef, judge, police, gym, astronaut…). Swap the costume on the exact word that changes the role ("I am **writing** that class myself" → professor).
- Background people / past self / "average person" = plain white stickmen (no clothes) so Dave always stands out.

#### 0.4 Visuals — the reference's grammar (LONG.md [3D] §5, §11, §12)
- **Objects come from the words of the line being spoken** (memory `props-from-script`): triangles chalkboard on "triangle", TAX FORM on "taxes", RENT bill on "rent", the textbook on "textbook". No fixed prop list reused across videos.
- **≥ 50 % of the runtime is real 3D** (Blender + CC0 Poly Haven models via `blender/fetch.py`, Cycles on GitHub Actions `blender.yml`). The rest = home base: charcoal icon backdrop, big rounded wobbling cards (scaled 1.22×), Dave big and **waist-up lower right** (cut-out PNG from the `cut` camera), pointing at the card.
- Render **pose-state stills, not every frame**: each pose/face/camera state = one still; Remotion holds/cuts them on the voice words (burst → hold). A minute ≈ 20–35 stills, 6 parallel machines, ~30 min.
- **Something changes every 1.5–2.5 s** (pose, face, card, counter, punch-in, prop). No hold over ~3 s without a change. Hard cut every 3.5–6 s.
- Transitions measured frame by frame (§12.3): 1-frame white silhouette on pose swaps, 2-frame smear on whips, 6-frame light-leak time skip, 1-frame B&W threshold before a reveal, comic bursts that slam in over 3 frames, counters that roll ~1.5 s and land with a bounce.
- No burned-in captions, no meme cards, no polaroid/tape photos.

#### 0.5 Sound — dense (owner 29 Oct: "the video is very poor of sound effects")
- Every visual event gets a sound: card slide → `slide`/`swish`, pop-in → `pop_hi`, pose swap → `snap_white`, 3D hard cut → `thump_low`, **every counter going up → `count_roll` (ticks that speed up and land with a ding)**, chalk → `chalk`, book → `pageflip`, typing → `key`/`key2` every 3 frames, reveals → `boom`/`stamp`, fails → `trombone`, money → `cash`/`ding`, sleep → `dream`, plus `crowd`/`sting`/`boing` as comedy accents. test1 = ~60 cues per minute; aim for that.
- New SFX are synthesised by `pipeline/sfx_synth.py` (never overwrite an existing `public/sfx/*.wav`; give new sounds new names). Owner's 2 Google Drive SFX folders: ids in `.github/workflows/sfxpack.yml`; on 29 Oct the main folder returned "permission denied" → ask the owner to re-share as "Anyone with the link" before relying on it.
- **Music changes with the situation (owner 30 Oct 2026: "clone his style… we always use the duck music")** — NEVER one looped track (`bgm.mp3` "Fluffing a Duck" is retired). Each scene mood gets its own track via `<Music segs>` from `src/v6/kit2.tsx` (example: `src/v6/Ea1.tsx`): curious/what-if → `investigations`, cheeky plan/joke → `sneaky_snitch` / `scheming_weasel_faster` / `monkeys_spinning_monkeys`, money/power tension → `hitman`, attack/conflict → `volatile_reaction`, comic reaction → `comic_plodding` / `pixel_peeker_polka_faster`, suspicion/claim → `crypto` / `hiding_your_reality`, sad/low point → `darkest_child`, open question/ending → `unanswered_questions` / `thinking_music`, upbeat comeback → `life_of_riley`. Switch on the beat where the mood flips (with its thump/whoosh), **cut to dead silence 0.3–0.8 s before every punchline or stamp** and let the hit land in silence, ~0.07 under voice. Library: `public/music/km/*.mp3` (Kevin MacLeod, CC BY 4.0, loudness-normalised, first 75 s); add tracks from incompetech.com only, and credit EVERY track used in the description.

#### 0.6 The hook — THE priority (built with the loop method §0.10) (owner 29 Oct: "more than 50 % of clickers leave in the first 5–10 seconds")
- The first 10 s decide the video. Frame 0 already moving and already showing the most surprising thing; the concept + stakes are clear by second 5; a visual change every ≤ 1 s for the first 10 s; a reason to keep watching (open question / withheld result) before second 10.
- **Use his TECHNIQUES, never his scenes** (owner 29 Oct): worlds, concept characters and gags are invented from OUR topic and each spoken line; his videos (and our animtest shots) are a quality/technique benchmark only, never copied.
- Before writing any new hook, study how the reference channel (Nion Anarchy, `qa_dl/chan/an/<id>/` shot data + sheets) opens its videos and write the findings into LONG.md [3D] §12/§13. Old hook rules that still apply: LONG.md [PLAYBOOK] §0.10 A (concept + stakes + how it ends, never the same hook form twice) and §12.3 (hook = a question).

#### 0.7 Shorts use the SAME standard
Shorts (`shortNN`, 9:16) are built with the same kit: 3D Dave in his outfits, natural connected speech, objects from the words, dense SFX, the same transitions. Differences only: 1080×1920 framing (Dave and the card stacked vertically), 50–90 s, one loop, hook in the first 2 s, a visual change every 1–1.5 s. The old Shorts rules "real photos + meme every 2–4 s" are retired (§0.9).

#### 0.8 Pipeline (what actually works — 8 GB RAM PC, slow connection)
1. Never render Remotion or Blender on the owner's PC (it crashed the session). Everything renders on GitHub Actions on branch `shorts-playbook-rules`: `voice.yml -f ep=<id>`, `blender.yml` (push trigger; `blender/RUN` = `<shot> <preview|full> <samples> cycles`, `blender/<shot>.chunks` = JSON list of comma-separated state groups), `v6demo.yml -f comp=<Comp>`.
2. Preview first (4 states, half res), look at them, then full. Check every still before the edit.
3. Downloads: `gh run download` often fails on this connection → use `gh api repos/hamlou/moneyworks/actions/artifacts/<id>/zip > a.zip` in a retry loop, in the background.
4. Copy stills into `public/<id>/`, commit, render the composition, then contact-sheet the mp4 at 1–2 fps and check every shot before sending it to the owner.

#### 0.10 The LOOP METHOD — mandatory for every video (owner, 29 Oct 2026: "integrate this strategy in our next videos", from the "Isa / Nile Blue — viral in 7 days" case study)
The full case study notes stay in `LONG.md [PLAYBOOK]` §12 and `SHORTS.md [PLAYBOOK]` §10 — they are now MANDATORY (no longer an optional layer). Summary of what every new long video AND Short must do:

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

#### 0.11 Monetization-safe assets only (owner 29 Oct: "make sure we won't get any trouble in the monetization later")
Every sound, voice, model, texture, motion and font must be on the ✅ list of **`LONG.md [LICENSES]`**; anything else is banned until checked. Never `public/sfx/pack/*` (unknown licence), never other creators' clips/music, never free-plan AI-generator output, never a cloned or real person's voice, never words put in a real person's mouth. Add the `LONG.md [LICENSES]` description footer to every upload.

#### 0.12 Sound design per video + no memes + real images only when needed (owner, 29 Oct 2026)
**"I want us rich on sound effects with the perfect moments… each video should generate its own needed sound effects."**
1. **Every video gets its own sound plan** written BEFORE the edit: `pipeline/sfx/<id>.json` = the list of sounds this video needs, made from its own script — one entry per visual event (each pose swap, card, counter, prop, camera move, impact, reveal, gag) and per thing that makes noise in the story (a cash register for a till, rain for a rainy street, a crowd for a stadium, a phone buzz for a text…). Each entry = `{"name", "recipe", "params", "cue"}` (cue = the line/word/event it lands on). Worked example: `pipeline/sfx/test1.json` (18 sounds from the "back to school" script: school bell, dog bark + whimper on "dog… died", train horn on "train", alarm on "rent", typing on the search, snore by "page ten", stamp on the F grade).
2. **Generate them:** `py pipeline/sfx_synth.py <id>` renders that plan into `public/sfx/<id>/<name>.wav` (recipes in `sfx_synth.py`: whoosh, impact, tick-roll counter, pop, swish, chalk, page, typing, cash/coin, bell/ding, buzz, crowd murmur, footsteps, riser, drop, glitch, heartbeat, rain…). New recipe needed → add it to `sfx_synth.py` (never download sounds of unknown licence; CC0 Kenney sounds in `public/sfx/` are also allowed). Cue them in the TSX as `{src: '<id>/<name>', at: <frame of the exact word/event>}`.
3. **Perfect moments:** a sound lands on the exact frame of its event (the word in the voice, the frame the card lands, the impact frame), never "around" it; counters play `count_roll` for their whole roll and land with the ding; whooshes start 2–3 frames BEFORE a whip/cut; impacts are ON the contact frame; ambience (room tone, street, rain) runs under whole scenes at low volume; music ducks under big hits. Target ≥ 50 cues per minute, and no 2 s window without a sound except deliberate silence before a punchline.
4. **Memes: OFF.** No meme cards, meme formats or "reaction memes" in any new video (long or Short). The old meme rules in LONG.md [PLAYBOOK] §0.11, SHORTS.md [PLAYBOOK] §3/§4/§9, LONG.md [BRIEF] v5 and UPGRADE are retired.
5. **Real images only when needed:** no photo quota. Use a real image only when the story needs real proof the 3D world cannot give — a real document, headline, chart, product, place or a real public person in a factual context — with a free licence (`pipeline/photo_find.py`, credit in the description, `LONG.md [LICENSES]`). Everything else is our own 3D/2D animation.

#### 0.13 No thumbnails (owner, 30 Oct 2026)
Don't make thumbnails anymore: no thumbnail concepts, no `src/thumbs`/`src/v2/t*.tsx`, no `thumbs.yml` runs, no thumbnail steps in briefs or reports. Every older thumbnail rule (LONG.md [PLAYBOOK] §0.6, §5, §12.4, Shorts covers) is retired.

#### 0.9 Retired by v7 (do not use in any new video)
Meme cards (all formats, incl. generated memes) · polaroid/tape/sticker photos · ANY photo quota: "real photo every 10–15 s" (long) and "photos + meme every 2–4 s" (Shorts) · burned-in captions · the 2D `<Stick>` Dave and the three.js `Dave3D` for new videos (Blender Dave replaces them; the old episodes keep theirs) · asking the owner to record their voice · fixed recurring prop lists · fragment-chain sentences · `validate.py` meme/photo counts for v7 videos.

---


### 1. The measured numbers (the targets)

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

### 2. Format — every episode is DAVE'S EXPERIMENT

The reference is not an explainer. It is **"I tried X for 30 days, here is exactly what happened"**: a goal, a deadline, a plan, a live scoreboard, failures, a lucky break, a twist, the final numbers. Every money lesson is something the host *discovers by doing it*. This is the single biggest reason it feels alive and ours feels like a lecture.

**Every v6 episode = one Dave challenge:**
- Title shape: `I [did the thing] for [N days / with $X] to [ridiculous goal]` / `I tried to [X] like [rich kids / a casino / a bank] for 30 days` / `I gave myself $500 and one rule`. The topic taste of the channel stays (deep systemic money truths: why school never taught money, why rich kids stay rich, why broke = worse decisions…) — it just becomes Dave's experiment.
- **Goal + deadline + scoreboard** stated by **0:45 at the latest**.
- **Time is the spine**: chapters are `Day 1`, `Day 2`, `Day 4–7`, `Week 2`, `Week 3`, `Week 4`, `The Results` — or the same with hours / bets / paychecks. No topic-bucket chapters.
- **The money facts are Dave's tools and obstacles** (the reference: keyword volume, RPM, export size, upload cap, thumbnail A/B test, translations, watch-time trick). Each one appears because Dave hits it, never because "here is a fact".
- **Honesty:** Dave is a cartoon, so his experiment is a story — but every number that describes the real world (odds, rates, prices, salaries, laws) is real and sourced, and his results are built from those real numbers (e.g. 30 days of real roulette odds). Never present an invented result as real-world data.

#### 2.1 Story beats the reference hits (copy the rhythm, write our own content)

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

### 3. Writing — how he talks (copy the SOUND, write our own words)

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

### 4. Voice — the SAME delivery, a legal voice

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

### 5. Visual style — "edited by a 3D animator"

#### 5.1 The look of Dave in 3D (the reference's trick, our character)
The reference host is a 3D chibi model with a **flat 2D face drawn as a texture** — the expressions are line-art that swaps every line (X-eyes, hearts, angry brows, spiral eyes, tears). That is why it is so expressive and still cheap. **Dave gets the same trick:**
- **3D Dave** = Dave's identity (huge round white head, tiny body, dot eyes) built in Blender: chibi proportions (head ≈ 45 % of height), smooth matte plastic/vinyl material, **toon shading with a dark outline** (Solidify inverted-hull or Freestyle, ~2 px at 1080p), soft rim light. Outfit: Dave's own colours (pick one signature item, e.g. a green hoodie with a $ pocket — not cat ears, not a mask).
- **Face = swappable texture** using our existing 2D Dave expressions (`Expr` set: neutral happy grin sad shock worried smug think tired suspicious angry money scream) + reference-style extras: `x_eyes`, `hearts`, `spiral`, `crying`, `dead`, `stars`, `dollar_eyes`.
- **Pose library (render once, reuse forever)**, transparent PNG, 3/4 view, waist-up AND full-body: point_r, point_l, point_up, present (palm up), shrug, arms_crossed, facepalm, thinking (fist on chin), thumbs_up, peace, wave, celebrate (both arms up), panic, hands_on_face, sitting_laptop, lying_down, pointer_stick (lab coat variant), pirate_hat variant. ≈ 20 poses × 20 faces → `public/dave3d/<pose>/<face>.png`.
- On screen Dave lives in the **lower-right third**, overlapping the panel he talks about, scale 55–75 % of screen height, **a new pose or face every 1.5–3 s** (on `at` words), small idle bob/breath between swaps, pose swaps snap with a 3-frame squash (scale 0.96 → 1.0).
- **Punchline close-up:** for big reactions Dave's head fills half the frame (0:18 "500 MILLION" shot): giant face, comic bold number beside it, red/white comic text.

#### 5.2 The "home base" set (≈ 45 % of screen time)
Dark charcoal background `#17181B` with a faint repeating pattern of small money icons (coin, card, chart, piggy bank, receipt) at 6 % opacity, slowly drifting (10 px/s). Dave lower-right; the thing he talks about upper-left/centre on a panel. This replaces the cream `Board` for host talk.

#### 5.3 3D environment shots (≈ 20–25 %)
Short (2–6 s) shots of Dave in rendered 3D sets with a real camera move: slow dolly-in, low-angle hero, crane up, orbit 15°. Sets to build once (CC0 assets: Poly Haven HDRIs + models, Kenney CC0 kits, or own Blender models — never ripped game assets):
- **HQ garage** with a rolling **whiteboard "GAME PLAN"** (handwritten plan, ticks, red marker) + an old car — where plans and checklists happen.
- **CRT TV room** (brick wall, retro TV) — the scoreboard lives here.
- **Dave's bedroom / desk at night** (laptop glow) — research, uploads, late nights.
- **Office / bank / casino / store interior** per topic.
- **Finale set**: night rooftop or ship deck under a starry sky — final results, floating UI cards around Dave.
- **Library with floating 3D numbers** — for comparing options ("10" big, "8" and "3" smaller).
- Rendered as 3–6 s clips (1920×1080, 30 fps, webm) or stills + camera move in Remotion.

#### 5.4 Real footage, photos and UI cards (the "screen-recording" layer)
- **Real world = real**: stock video/photos of the actual thing (rain on a window, a casino floor, a calendar page "1", a stopwatch macro, a forest). Free licences only (Pexels / Pixabay video + Wikimedia Commons; `pipeline/pexels_find.py`, `photo_find.py`). Used **full-screen** as a plate with Dave composited in, or inside a **rounded dark UI card** (radius 18 px, 1 px border `#2A2C31`, soft shadow) — never polaroid/tape/sticker.
- **UI cards = our recreation of the screen the topic lives on** (bank app, brokerage screen, YouTube search with autocomplete, paycheck stub, price comparison, a "search volume / competition" style panel). Built in React, generic, **no real logos**, numbers from our sources. Card behaviour: slides in 12 px + fades (6 frames), then a **digital push-in to the number** being said (scale 1.0 → 1.6 centred on the number at its `at` word, 10 frames ease-out), mouse cursor that moves and clicks (`click` sfx) when Dave "uses" it.
- **"White-frame flash" photos**: a real photo appears inside a thick white hand-drawn frame for 0.4 s, then a second one overlaps (3:24 in the reference) — for "I looked everywhere" montages.
- Photo/footage cadence: a new real image or clip **every 8–15 s** (keeps §0.11 B, the look changes).

#### 5.5 Kinetic number & title cards
- **Big number card** (on home base): small caps label above (`RPM`, `TOTAL MADE`, `WATCH TIME`), the number huge (Anton / "Bebas"-style, 220–300 px), white → **green `#5BE33B`** for money gained, **red `#FF3B3B`** for lost, **yellow `#FFD400`** for neutral, faint glow; tiny grey explanation under it ("(Money per 1,000 views)"). Count-up odometer 12–20 frames, lands with `stamp`. Percent climbs show steps (7% → 27% → 30%).
- **Chapter title card** (replaces the black chapter card): bright blue `#3DB8F5` background with a subtle grain, chapter name in giant **yellow condensed italic** (`MAKING VIDEOS`), small white line under it ("DAY 1 / Let's make the stupid long things"), 1.8–2.5 s, `whoosh` in + a music hit.
- **Week report card**: black, title "Week 1" with a circled number, rows with dotted leaders `Views.............152` / `Subscribers.............3` / `Revenue.............$0.14` typing in one by one (`tick` each), then `Rating........C-` with a letter grade slam (colour by grade).
- **Time-skip card**: black, small white text "5 hours later…" 1.5 s, clock `tick`.
- **Fake list / search bar**: a search bar types the query, autocomplete suggestions pop line by line.

#### 5.6 Gag interrupts (replace meme cards — one every 25–40 s)
- **Comic panel**: halftone/pop-art frame, speed lines, giant onomatopoeia ("CLICK!", "WHACK!", "SLAP!", "CHA-CHING!") in red with thick black outline, 10–20 frames, Dave in an extreme pose, camera shake.
- **Extreme macro insert** (0.5–1 s): a giant eyeball, a stopwatch, a ticking calendar — real footage or 3D.
- **Fake-out freeze**: the happy scene freezes → record-scratch → cut to reality.
- **Censor bleep** with a black bar over Dave's mouth.
- **4th-wall moment**: Dave suddenly close to camera ("Sorry I had to make sure you're not asleep").
- **Absurd visual comparison**: the thing literally shown (Dave in a crowd of identical videos, a peasant cart for "1700s wage").

#### 5.7 Scoreboard TV (replaces the Damage Meter)
A retro CRT TV in the TV-room set (or as a 2D card on home base). Screen: rounded card with the experiment name + 3 tiles: **eye (blue)** = progress/attempts, **person (red)** = people/subscribers/friends, **$ (green)** = money, each with a small `+N` delta above. Shown at the end of every Day/Week chapter (≥ 6 times per video), numbers roll up with `ding`. Final appearance in the finale set as floating cards.

#### 5.8 Camera, cuts and motion
- **Cut on the phrase**: hard cuts at sentence/phrase starts (every 4–6 s); within a shot something new every 1.5–2.5 s (pose, face, card, push-in, number).
- **No slow fades** except into/out of the montage and time skips. Transitions: hard cut (80 %), whip-blur (8 frames) between locations, white flash on reveals, comic panel on gags.
- **Everything moves**: 3D shots always have a camera move; 2D panels have a slow drift (scale 1.0 → 1.04 over the shot); pop-ins overshoot (`spring` damping 12); nothing is ever fully still for > 1.5 s except the deliberate pre-punchline freeze.
- Hook (first 60 s): a visual change every ≤ 1.5 s, at least 3 different set types (photo plate, home base, 3D set).
- Frame 0 is already moving and shows the most impressive thing (the jaw-drop proof), never a title.

#### 5.9 Motion grammar — measured frame by frame (30 fps, every frame diffed + 10 fps strips)
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

### 6. Sound
- **Music bed always on** under the voice (−26 LUFS under speech, ducked), lofi/chill-hop for normal parts; it **changes per chapter**; it stops dead for 0.5–1 s before a punchline and slams back on the reaction. The montage gets an upbeat full-volume track. Free licences only (Kevin MacLeod CC-BY, YouTube Audio Library, Pixabay Music) + credits in the description.
- **SFX density ≈ 1 per 3–4 s, all motivated**: `whoosh` on card/panel moves, `pop` on pose swaps (quiet, −30 LUFS), `click` on cursor clicks, `ding`/`cash` on scoreboard, `stamp` on number landings, comic `boom`/`thud` on gag panels, `scratch` on fake-outs, `tick` on time skips, bleep on censors. Keep the existing `at`-word anchoring and the −24 LUFS normalisation (voice −16).

---

### 7. Beat fields for v6 (JSON) — what to write in `pipeline/episodes/epNN.json`

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

### 8. Build status + roadmap (be honest with the owner)

**Chosen solution (23 Oct 2026): real 3D inside Remotion with three.js (`@remotion/three`), no Blender step.** The reference's white round-head stickman (0:00, 0:27, 0:42) IS a 3D Dave, so Dave is built from primitives in `src/v6/Dave3D.tsx`: toon shading (3-step ramp) + black inverted-hull outline + face drawn on a canvas texture (14 faces) + joint-angle pose library (16 poses). Kit: `src/v6/kit.tsx` (Stage, DaveT pose track with white-flash swaps, HomeBase, UICard push-in, Counter, NumCard, ComicBurst, ChapterCard, ReportCard, WhiteFlash, Threshold, Smear, ShockLines). Sets: `src/v6/sets.tsx` (Bedroom so far). Demo: composition `V6Demo` in the separate entry `src/v6/index.ts`, rendered by Actions → `v6demo` (uses `--gl=swangle`, software WebGL; uploads the mp4 + 10 fps contact sheets). Blender stays optional later for richer sets (render clips, drop them in as video).

Older plan, still the order of work:
1. **v6 script + voice — works TODAY.** Format §2, writing §3, voice §4 (`cb.cfg`, beat `cfg`/`exag`, breath-group beats, real pauses, optional own-voice reference) → `voice.yml` as usual.
2. **v6 2D kit `src/v6/`** (Remotion, no Blender): home-base set, UI cards with push-in + cursor, big number cards, chapter title card, week report card, time-skip card, comic panels, scoreboard TV card, white-frame photo flash, captions off. ← next build step.
3. **3D Dave** (Blender, runs in GitHub Actions `blender -b`): model + toon outline + face texture swap → render the pose×face PNG library to `public/dave3d/` (committed). Until it exists the v6 kit uses the current 2D Dave with a toon-shaded look (gradient shading + thick outline + drop shadow) so it already reads as "3D-ish".
4. **3D sets** (Blender + CC0 assets): garage+whiteboard, TV room, bedroom, finale; render 3–6 s camera-move clips per episode in Actions (`render3d.yml`), cached in the repo like the voice.
5. Old episodes: LONG.md [UPGRADE] keeps working; it gets the v6 script/voice rules now and the v6 fields once the kit lands.

---

### 9. What is retired by v6 (do not use in new episodes)
- Polaroid / tape / sticker / news-strip photo looks → UI cards, full-screen plates, white-frame flash.
- Meme-format cards every 30 s (Drake, brain, buttons…) → gag interrupts §5.6.
- Burned word-by-word captions on host scenes → none.
- Cream `Board` as the main talking set → dark home base.
- Black "CHAPTER N" cards → blue/yellow title cards.
- Damage Meter HUD → Scoreboard TV.
- Hook ≤ 25 s / ≤ 75 words limit → the hook is the first 45–60 s, but sentence one states the concept and the first 20 s contain the jaw-drop proof; ≥ 35 visual changes in minute one.
- 10–12 min / 1,750–2,000 words / fixed 0.3 s pause → §1 targets.
- "Max 4 chapters" → time-based chapters as the experiment needs (8–13, like the reference).

### 10. v6 pre-flight (paste in the final report, all ✓)
- [ ] Episode is Dave's experiment: goal + deadline + scoreboard stated by 0:45; chapters are time steps.
- [ ] Sentence one = concept to "you"; jaw-drop proof with a real image in the first 20 s; 3-step translated money math.
- [ ] Writing: run-ons + punches, ≥ 1 fake-out, Dave wrong ≥ 3 times, ≥ 2 callbacks, every number translated, ≥ 2 direct questions to the viewer, 1 montage break, sign-off line. Zero commas.
- [ ] Voice: beats 25–60 words, `cb.cfg` set, pauses varied (0.1 / 0.35 / 1.0), measured 180–200 wpm per chapter.
- [ ] Visual: change every ≤ 2.5 s (≥ 35 in minute 1), scene change every 4–6 s, real image every ≤ 15 s, gag every ≤ 40 s, scoreboard ≥ 6×, report card per week, no captions, no memes, no polaroids.
- [ ] Sources + licences as always; no real logos; real people factual only; no invented result presented as real data.

---

### 11. Channel study — all 13 videos (23 Oct 2026, owner: "we're at 25 %, study ALL his videos")

Sources: 12 auto-caption transcripts (the brainrot video has none), per-frame motion data on his 3 biggest hits (1.7 M "Why are there no 3D animators", 1.2 M "BRAINROT Shorts for 30 days", 479 K "SLEEPING videos"), 2.5 s frame sheets of their openings, and his own workflow video "How I Make 3D Animated Videos for YouTube" (720 s).

#### 11.1 His real production recipe (from his own words) → our equivalent
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

#### 11.2 Shot grammar seen in all 3 hits
- **Two shot types only** (his words): *fully animated shots* (character acting inside a 3D world) and *static shots* (character in the corner + props/cards). Ratio in the openings ≈ 60 / 40.
- **A new WORLD every 5–15 s**: empty concrete room → classroom → dark desk room → cinema projector → purple void with giant props → city street with whiteboard → grass field with a crowd. The world itself is the joke ("too shy for a camera" → he hides in a dark room).
- **Information is shown ON world objects**: chalkboard list, projector screen showing the clip, CRT TV scoreboard, tear-off day calendar ("day 0 → day 1"), whiteboard "Point 1/2/3", flags on poles, cards floating in 3D with shadows. Flat full-screen cards only for big numbers and comparisons.
- **Visual metaphors are built literally**: "you could fit all Odyssey viewers in one truck… and this is all of YouTube's" → 50 trucks; "crowd in a niche" → a field of identical white stickmen; money → a wall of banknotes; time → giant clock.
- **Big chapter text lives in the world** (outlined "DAY 1" letters in the room), not on a separate card. The blue/yellow card is the exception, not the rule.
- **Hook = speed-lines world** (green radial streaks) with objects flying at camera: calendar, stopwatch, banknotes — 6 different props in 10 s.
- Burst-and-hold motion confirmed on all three: 36–45 % of frames perfectly still, holds mostly < 0.5 s.

#### 11.3 How he writes the jokes (the "spirit")
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

#### 11.4 The 75 % gap — what we must build (in this order)
1. **Worlds, not wallpapers**: every beat gets a `set`. Asset loader for GLB models + HDRI skies (CC0 first: Poly Haven, Kenney, Quaternius) committed to `public/3d/`. Shadows on.
2. **World screens**: chalkboard / projector / TV / floating card objects whose surface shows our UI, photo or number (canvas or image texture), so information is IN the world.
3. **Character acting**: animated loops for Dave (walk, type, sit, fall, run, dance) + CC0 mocap crowds/background people.
4. **Camera + motion feel**: 24 fps, motion blur on fast moves, wiggle on every static card, burst-and-hold timing (§5.9).
5. **Voice with a performer** (§4b).
6. Gag library: speed-lines hook world, personification skit kit (props: hats, cars, RV), boxing-match/tier-list framing kits, literal-metaphor builders (trucks, crowds, money walls).

#### 4b. Voice — the honest truth (added after the channel study)
His "spirit" is a human actor reading his own jokes. Measured on 120 s windows: his pitch ≈ 155–159 Hz (young), smooth (2.6 semitones/100 ms) and almost continuous (3–8 short breaths per minute, ~0.22 s); our Chatterbox Dave ≈ 128 Hz (older), jittery (3.4), choppy (17–21 pauses per minute, ~0.44 s). Cloning HIS voice is illegal and off the table. Legal ways to get the same spirit, best first:
- **A. Owner records** (exactly his method; he is a non-native speaker too): phone in a quiet room/under a blanket → Adobe Podcast Enhance (free) → our aligner cuts stutters and long gaps automatically. Best spirit, free.
- **B. Hire a young English voice actor** (Fiverr/Voices.com, commercial licence + written consent to AI cloning) → clone THAT actor with ElevenLabs Professional Voice Clone → every episode in his voice with v3 audio tags (`[sarcastic]`, `[laughs]`, `[whispers]`, `[excited]`).
- **C. ElevenLabs v3 library voice + audio tags** (paid, no actor).
- **D. Free Chatterbox tuned** (cfg 0.3, breath-group beats, short pauses, +2–3 semitone pitch): ceiling ≈ 40 % of his spirit.

---

### 12. Deep study v2 — whole channel, every frame (28 Oct 2026, owner: "LONG.md [3D] is unfinished, analyse until it's enough")

**Data:** all 14 uploads (13 long + 1 short, 6,950 s). Every frame diffed (96×54), every hard cut detected, one still per shot → contact sheets, word-timed auto-captions for 10. Raw data: `qa_dl/chan/an/<id>/` (`shots.json` = start, length, motion, words per shot · `sheet_NN.jpg` = every shot · `diff.npy` = per-frame motion). Per-frame strips of 7 transitions: `qa_dl/chan/micro/`. Tool: `qa_dl/chan_tools/analyze.py <mp4> <outdir> [--sheets]`.

#### 12.1 Channel-wide numbers (hard cuts only — card swaps inside home base are extra)
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

#### 12.2 Shot types — what the screen actually shows (counted on the ref's 215 shots)
1. **Home base (≈ 45 % of time):** dark charcoal backdrop with a faint repeated icon pattern (newer videos) or white crumpled low-poly paper (older videos). Host **waist-up in the lower right**, pointing / shrugging at the content on the left. Content = floating screenshot / thumbnail / video card with rounded corners and a soft shadow, slightly tilted in 3D, wobbling.
2. **Acting shot in a 3D world (≈ 30 %):** lit set from free models (living room + couch, bedroom, forest, garage with whiteboard, library, yacht deck, city street in rain, school classroom with chalkboard, military parade, beach). Locked camera, host acts (sleeps, falls, types, gets hit).
3. **World scoreboard objects (≈ 10 %):** CRT TV on a brick wall showing a dark card "DAY 7 · views · subs · $" in 3 coloured rounded boxes (blue/red/green) → appears **every in-story day**; whiteboard checklist in the garage (plan → ticks); the money video uses the same CRT as a running ledger "ADS / SPONSORS / MERCH / MEMBERSHIPS / TOTAL".
4. **Week report card (5 in ref):** pure black, "Week ①", 4 rows with dotted leaders (Views / Subscribers / Revenue / Rating) and a coloured letter grade (C- → B → A → S). Holds 8–13 s.
5. **Big number / title plates:** 3D outlined white chunky text in the world ("30 DAYS" on a table, "DAY 3"), counters over a sky plate ("1:27:54 Average Watch Time" ticking up one unit per frame), grey concrete plate with white stencil word for chapters ("ADS", "SPONSORS", "MERCH"), typewriter monospace maths on white paper ("VIEWS......48,214 /1,000 · RPM......$15.00").
6. **Screen recordings (≈ 10 %):** real tools (Studio, keyword tool, Premiere, stock sites) full-frame with the host cut-out overlaid lower right.
7. **Experiment-series devices (BRAINROT + SLEEPING both):** CRT TV with the day card + **tear-off wall calendar "day N"** next to it (hard cut to it every in-story day) · our own uploads shown as **vertical 9:16 rounded cards floating in home base** with a view badge beside ("700K views") · the number of the day under the card ("DAY 3").
8. **Process-video chapters (How I Make):** white plate, small spaced "STAGE 1" + huge pixel/blocky title "SCRIPTING" + one icon + a progress bar that grows across the video (3 % → 7 % → 13 %).
9. **Real footage montage (rare, 70 s once):** shaky GoPro clips with fisheye vignette and light-leak flashes — his vacation/sponsor block. Skip for us.

#### 12.3 Frame-exact recipes (30 fps content; counted frame by frame in `micro/`)
| Moment | Frames | Recipe |
|---|---|---|
| **Time-skip flash** (0:08.5) | hold 9 → 2 pink-red light leak wipe from left → 3 near-white overexposed → 1 dark gradient wipe reveals new pose → hold | 6 frames total, no fade |
| **Emphasis punch-in** (0:17.7) | hold 26 → **1 frame white silhouette with black outline at the NEW framing** → closer camera + new face (angry) + background also scaled up | number "500" types in one digit per frame (5 → 50 → 500) inside a white comic burst that grows over 3 frames |
| **Whip-zoom to reaction** (1:04.8) | counter ticks +1 per frame → 3 frames heavy directional motion blur → hard cut to close-up wearing pixel sunglasses, money raining | |
| **Hit / smear** (4:04.2) | hold 19 → 1 wind-up blur → 2 full-frame smears → 1 white impact frame → comic "WHACK!" with white radial spikes 3 frames → spikes gone, word stays and shakes | |
| **Realisation zap** (4:17.5) | 1 smear → **3 frames black/white threshold** (photocopy) → 17 frames cyan-inverted lighting + boiling lightning drawn on the character → hard cut to the next set | |
| **Light-leak montage** (12:54) | 1 bloom → 6 white/orange leak frames → leak fades over 6 while handheld clip runs | real-footage only |
| Pose swap | instant; character holds 10–40 frames between swaps | never tweened |

#### 12.4 Character acting rules (for Dave — never his cat-hood design)
- Face is a **flat drawn face on a dark/plain head** that changes per line (XD, X O, angry brows, sad, smug). Body pose changes ~every 1–3 s in home base, face more often.
- Background people / past self / "average creator" = **plain white round-head stickmen**, often in crowds (identical copies).
- **Costume gags**: tricorn hat, white beard (Gandalf), pixel sunglasses, party hat — a prop on the host = an instant joke.
- Host is cut out with a **black outline** (grease pencil) so he reads over any plate.

#### 12.5 What we must NOT copy (copyright)
He uses Pixar / Spider-Verse / LEGO Movie / Rick & Morty / Gandalf clips and a game-soundtrack song under fair-use commentary. We replace them with our own 3D shots, CC0 models and licensed music. His mascot, voice and jokes stay his.

#### 12.6 The Instagram "Higgsfield" reel (owner sent, 86 s, analysed every 0.25 s)
It is **Higgsfield "Katana"**: Claude driven through the Higgsfield MCP writes **motion graphics** (neon kinetic type on a dark grid, glow, particles, wireframe 3D shapes, morphing labels, a 1-frame white flash between titles). It is code-made animation — **the same kind of thing our Remotion kit already renders for free**. So: Katana-style titles = build in Remotion (`src/v6/`), no subscription. Real AI *video* (photoreal or 3D-look clips) is what costs credits.

#### 12.7 Best mix (owner approved 28 Oct)
- **Free core (every episode):** Remotion three.js / Blender 3D Dave + CC0 worlds + the §12.3 transition recipes + home base + CRT scoreboard + week report card + Katana-style kinetic titles.
- **Higgsfield (paid credits, optional):** only hook shots that need a "wow" (5 s clips). Free plan = 10 credits ≈ 1 image (Nano Banana 2, 2 cr) + 1 clip (Seedance 2.0 Mini / Grok 1.5 Lite, 5 cr). Always `higgsfield generate cost` first; never spend without the owner's OK.

#### 12.8 Build order (replaces §11.4 order)
1. Transition kit exactly as §12.3 (light-leak flash, white-silhouette punch-in, whip-blur, smear+comic burst, threshold+zap, digit-per-frame number type-on).
2. Home base v2: charcoal icon-pattern backdrop + tilted rounded wobbling card + Dave lower-right waist-up.
3. World objects: CRT TV daily scoreboard, week report card, whiteboard checklist, concrete chapter plate, typewriter maths plate.
4. 3D worlds from CC0 GLB (living room, bedroom, garage, classroom, street) + white stickman crowd.
5. Costume prop library for Dave.

#### 12.9 Test 1 — Higgsfield vs free kit (28 Oct, same line, `videos/v6_compare/compare.mp4`)
Line: "school spent 12 years teaching me triangles and zero minutes teaching me taxes".
- **Higgsfield** (Nano Banana image 2 cr + Seedance 1.5 i2v 4.8 cr): film-quality light/materials/expression, Dave on-model. BUT 4 s only, continuous floaty motion (no burst→hold, no snaps, no punch-in), camera reframed by itself, free plan blocks Seedance 2 / Grok / Kling video ("job_minimum_basic_plan_required"). 3.2 credits left.
- **Free kit** (`src/v6/Classroom.tsx` TaxShot, CI render): the edit grammar is exact (hold → face snap → 2-frame white-silhouette punch-in → smear → comic burst), unlimited, re-editable per line. v2 added window key light + real shadows, vignette, sweat drop, tighter framing. Still behind on materials, hand acting (paper hides body) and set detail.
- **Verdict / use:** AI clips = rare hero/hook plates only (and stills as backgrounds for static shots); every acting shot = free kit. Next upgrades to close the look gap: CC0 GLB props + HDRI, Dave hands that grip props, AO/bloom post pass, depth of field on close-ups.

---

### 13. Gap analysis vs the reference (29 Oct 2026, "The YouTube Killer You Haven't Heard Of", 6YakH_jGjUs, first 36 s every 1/8 s, vs our test1 v3)

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

#### What we miss (in order of impact)
1. **Real animation, not held stills.** Acting shots must be rendered as moving frames: characters walk/flex/drive/turn, cameras push and whip, objects fly. Pose-state stills are allowed ONLY for home base and for deliberate holds. Target ≥ 50 % moving frames in the first 12 s.
2. **Concepts become characters.** He personifies the topic (YouTube = muscle giant, Odysee = white figure, creators = an army carrying their cards). We only had Dave + props. Every video needs 1–3 "concept characters" built from the kit (box/logo head on a body, crowds of copies).
3. **A new WORLD every 5–8 s, matched to the sentence** (mansion of money → graph paper → volcano hell → alley at night → UI). We used one classroom for a minute.
4. **Frame 0 = the most spectacular image + motion.** Ours opened on a static wide still for 3.4 s with a small Dave (the exact 5–10 s drop-off the owner measured). His opening shows the subject huge, in a rich world, already moving, with an action at 1.5 s and a new world at 2.4 s.
5. **Camera language:** slow push-ins, whip-zooms with motion blur, foreground objects (the fist), low hero angles, close-ups for emotion. Ours: locked cameras only.
6. **Dramatic lighting per mood:** fire orange, night alley, silhouette → light-sweep reveals. Ours: flat daylight.
7. **Living diagrams:** graphs that draw themselves with a character riding the line, panels that wipe in, cards that fly in with blur and land in stacks.
8. **Scale:** the subject fills 40–80 % of the frame in most shots; our wide shots kept Dave at ~10 %.

#### Build plan to close it (before the next video)
- `blender/anim.py`: keyframed animation on the Dave rig and concept-character rigs (walk cycle, flex, point, drive, turn-head, fall), crowd duplicator with offsets, camera moves (push, whip with motion blur, orbit), light-sweep reveals. Render real frames at 24 fps, 1080p, Cycles 12–16 samples + denoise, split over up to 20 parallel GitHub jobs (~40–60 s per frame each).
- `blender/worlds.py`: a library of quick worlds (graph-paper void, money mansion yard, volcano/fire, night alley, city street, studio void with HDRI) — CC0 Poly Haven HDRIs + models.
- Remotion: wipe panels, flying-card stacks with motion blur, self-drawing graph line.
- Hook template: 0.0 s subject huge + moving in a rich world · 1.5 s action hit · 2.5 s new world · ≥ 4 worlds in the first 15 s · ≥ 70 % moving frames in the first 10 s.

#### 13.1 Animation kit — built 29 Oct 2026 (use it for every acting shot)
- **`blender/anim.py`** = the template for animated shots: one `--frames "<SHOT>:<from>-<to>"` chunk per GitHub job, every frame rendered (24 fps, Cycles 16 samples + denoise, motion blur on), frames `<SHOT>_<n>.jpg` → the workflow joins them into `<shot>.mp4` (+ vignette + film grain). `blender/anim.chunks` = 12-frame chunks (≈ 20 parallel jobs for 10 s). Preview first: `blender/RUN` = `anim preview 12 cycles` with 2–3 frames per shot.
- **Rig API (`blender/lib.py`)**: `blend(a, b, t)` in-betweens two poses, `ease` / `back_out` (overshoot), `legs_walk(phase)` walk cycle, `squash(t)` squash & stretch on hits/landings, `life(f)` idle micro-motion (never frozen), `key(f)` keyframes the whole rig per frame (so motion blur works). Concept characters = `Dave(...)` + `outfit("muscle")` + a box head with a logo texture (`mascot()` in anim.py).
- **Live face**: `dave.live(f, expr, talking)` → mouth flaps (from the voice with `load_voice(wav)`; a natural fallback pattern without voice), blinks every ~3 s, the ink lines "boil" (3 drawings swapped every 3 frames). Textures `blender/tex/live/<expr>_<c|o|b>_<k>.png` from `make_tex.py`. Expressions: neutral grin shock think determined panic smug spiral dead.
- **Finishing pass**: `finish()` (bloom on lights, slight lens dispersion, warm grade) + `dof(camera, target)` on close-ups; vignette and per-frame grain at assembly.
- Gotchas learned: Principled mix-shader Fac defaults to 0.5 (washed-out white) → set 0; white sheen turns red cloth pink → sheen 0.3 tinted; `read_factory_settings` wipes frame handlers → `_ensure_handler()`; GitHub artifact names can't contain `:`; a compositor ellipse mask left a ghost oval → vignette in ffmpeg instead.

### 14. Hook study — the first 10 s of all 13 long videos (29 Oct 2026, sheet `qa_dl/cmp/hooks_all.jpg`, 2 fps)

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

### 15. Hook REVERSE-ENGINEERED (30 Oct 2026, owner: "your hook is not attaching at all") — his top 3 at 4 fps + captions, vs ea1
Strips: `qa_dl/chan/hook/strip_*.jpg` (his `_-px6J9nqKg` 1.7 M, `rxN7qVpjryY` 1.2 M, `9yXNBbf3TW0` 860 K, ours `strip_ea1.jpg`), captions `qa_dl/chan/hook/*.vtt`.

#### 15.1 What happens second by second
| t | BRAINROT 1.2 M | SLEEPING 860 K | NO 3D ANIMATORS 1.7 M |
|---|---|---|---|
| 0.0 | already mid-motion: green speed tunnel, calendar flies in | his thumbnail card (the video itself) | dark empty concrete room, silence = mystery |
| 0.3–1.8 | calendar days get **crossed out one every 0.25 s** (deadline made visible) | 1.5 s: giant **VIEWS counter rolls 547 K → 963 K** in 1.5 s (the RESULT first) | 1.0 s: ceiling light flicks ON (sound) |
| 2–4.5 | cards with escalating numbers swap every 0.5 s (1 face → 4 faces → 64 cells) | 3.25 s: **macro close-up** stopwatch fills the frame, comic **"CLICK!"** | 2.0 s: figure with glowing eyes in the doorway, crawls in |
| 4.5–7.5 | whoosh into a light tunnel, host **surfs a growth arrow** | 5.25 s: **absurd scale** — eyeball bigger than the host | 5.5 s: opens a treasure chest |
| 7.5–10 | host big in frame, stopwatch | 7.5 s: couch, 8.5 s **white flash** → asleep, Zzz | 7.5 s: first name card flies in **on the spoken name**, one per name every ~1 s |
| 10–12 | **wall of money** = the prize, host turns to camera | 9.75 s: video-player UI, red progress bar racing (fast-forward) | 14 s: the big number ("50 million subs") + absurd comparison (Poland, Spain, Canada) |
| words | challenge + deadline + question by 11 s: "For the entire month of January… only 30 days and can I get the channel monetized?" | counter-intuitive insight by 8 s: "the best viewer is an asleep viewer" | the title IS the open question; the voice starts at 7 s on a list of names |

#### 15.2 The rules (measured)
1. **Frame 0 = the most valuable thing in the video** (the result, the prize, the money, the mystery) — never an establishing shot. Ours opened on a wide room with Dave at ~8 % of the frame walking for 5 s; our best image ($33 M cash rain) came at 36 s.
2. **New image every 0.5–1.5 s for the first 12 s.** His: 8–10 distinct visuals in 12 s. Ours: 2 (a wide shot for 5 s, then ONE photo card held 7 s).
3. **Something counts or ticks in the first 3 s** (counter rolling, calendar days crossed, numbers escalating) — progress the eye follows.
4. **Scale shock:** macro close-ups (stopwatch, eyeball) and the subject at 40–80 % of the frame. Never a small figure in a big room during the hook.
5. **Sound design carries it:** light switch clack, "CLICK!" comic word = sound word, whoosh into tunnels, silence then a hit. The hook has the densest SFX of the video.
6. **Words = stakes + proof + question within 8–11 s**, and every noun spoken gets its own image on that word (names → name cards land on each name).
7. **Rhythm:** hold → hit → hold → hit; white 1-frame flash between worlds; never a fade.
8. **No information card in the first 10 s.** Info cards (source photo, bio) come after the viewer is hooked; his first 12 s have zero text blocks except numbers.

#### 15.3 Hook template (use for EVERY video, long + Shorts)
| t | slot | content |
|---|---|---|
| 0.0–1.5 | **PRIZE / RESULT** | the most spectacular true image + a rolling number (sourced) |
| 1.5–3.5 | **STAKES** | close-up / scale shock + comic sound word |
| 3.5–6 | **TWIST** | the surprising fact that makes it a story ("…and he still won") |
| 6–9 | **QUESTION** | the title question spoken while a new world slams in |
| 9–12 | **PROMISE** | what we'll see by the end (withheld result), Dave big in frame pointing at "you" |
| 12+ | context/info cards (bio, photo, sources) | only now |

### 16. Whole-style REVERSE-ENGINEERING v2 (30 Oct 2026, owner: "did you reverse engineer his whole style or just the hook?")
Data: his top 4 (`9yXNBbf3TW0` 860 K · `rxN7qVpjryY` 1.2 M · `_-px6J9nqKg` 1.7 M · `6YakH_jGjUs` 87 K), full captions → `qa_dl/chan/re/text_*.txt`; tools `qa_dl/chan_tools/script_re.py`, `tools/re/audio_re.py` (sound), `tools/re/camera_re.py` (camera + colour) — the heavy ones run on CI (`refanalysis.yml`, ids in `tools/re/IDS`, numbers only, no media kept).

#### 16.1 Writing — measured
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

### §17 BODY reverse-engineered (owner 31 Oct 2026: "the video got boring after the hook… reverse engineer his whole channel")
Measured on 14 of his videos (`qa_dl/chan/an_stats.jsonl`, sheets `qa_dl/chan/an/<id>/sheet_0N.jpg`, transcripts `*.en.vtt`):
1. **Shot length**: median 3.5–6 s, but huge spread (0.1 s flashes … 25 s holds). ~10 cuts/min. Not hyper-cut — every shot simply SHOWS something new.
2. **The character barely animates** (60–80 % of frames are still): he POSES the character in a staged set (diorama) and holds it, then cuts to a new pose/set. "Human made" = many hand-picked poses + props + costumes per gag, not continuous code-driven motion. → For us: Dave = strong still poses per beat (cut, don't tween), one small secondary motion at most (blink, sway, prop drop).
3. **Text-only cards are rare.** Information is shown as REAL ARTIFACTS: screen recordings of real tools/sites, a retro TV scoreboard, a search bar being typed into, a map, documents. → For us: facts = the approved macro highlight of the real sentence (Montage style), real short clips of the real people, artifacts in 3D (a receipt, a TV, a phone), never "Dave beside a card repeating the line".
4. **Real footage is a big share** (his own experiment footage, meme-like crowd clips, real events) mixed hard against the 3D character. → For us: 0.5–1.5 s real clips (news, rallies, debates) as punctuation every ~30–60 s.
5. **Every visual = the exact words**: "4 hours later…" black card, "Gandalf" typed in a search bar when he says Gandalf, beard costume when he jokes about age. Literal, specific, often a joke.
6. **"But" every ~10–15 s in the narration** (median gap between "but/until/turns out/however" lines ≈ 10–20 s): constant small turns; a big problem every 30–60 s; the answer to the opening question only at the end.
7. Gag props/costumes swap per joke (beard, soldiers, red carpet, hammock) — sets change constantly instead of one long set.

---

## [PLAYBOOK] — was PLAYBOOK_LONG.md

## MONEYWORKS PLAYBOOK — LONG-FORM (16:9 episodes, 10 min+)

> **★ v7 STANDARD (owner, 29 Oct 2026) — `LONG.md [3D]` §0 is THE rule set for EVERY new video (long-form and Shorts) and wins over everything in this file.** Natural connected speech (no commas AND no fragment chains like "12 years. Day one. Math class."), Blender 3D Dave in a red oversized hoodie + wide black pants with costume swaps per scene role, objects from the words of each line, ≥ 50 % real 3D, something new every 1.5–2.5 s, dense SFX (counter roll ticks etc.), hook = the priority (50 %+ of viewers leave in 5–10 s), built with the mandatory LOOP METHOD (§0.10: 3 gates, looped arc hook→rising→conflict→comeback→payoff, hook as a question, mini-loops per chapter, Shorts swipe-through ≥ 80 %, next Short only when < ~5k views/h for 24 h). Retired: memes, polaroids, photo-every-10–15 s, photos+memes every 2–4 s in Shorts, captions, 2D Dave for new videos, asking the owner to record their voice. Template: `pipeline/episodes/test1.json` + `blender/test1.py` + `src/v6/Test1.tsx`. **NO THUMBNAILS (owner 30 Oct 2026: "don't do thumbnails anymore, disable that") — never design, render or propose thumbnails or run thumbs.yml; old thumbnail rules are retired.** **No memes ever; real images only when needed; every video designs + generates its OWN sound effects timed to its moments (LONG.md [3D] §0.12).** **Monetization-safe assets only: `LONG.md [LICENSES]`** (no `public/sfx/pack`, no other creators' clips/music, no cloned voices, credit footer on every upload).

**This file is ONLY for long-form episodes (`epNN`, 1920×1080, 10–12 min).** Vertical Shorts have their own file: `SHORTS.md [PLAYBOOK]`. Never apply a Shorts rule to a long video or a long-form rule to a Short (owner, 11 Oct 2026: "you are in long form not in shorts, don't mix between them").

This is the bible for the channel. Series 1 (ep01–ep10) was approved by the owner as **"exactly the style I was looking for for years"**. Every new episode must match it. Read this fully before writing anything.

> **§0.13 = `LONG.md [3D]` (v6 "3D animator" style, owner, 23 Oct 2026) is THE NEWEST rule set and overrides everything in this file where they conflict** — format (Dave's experiment, Day/Week chapters), writing, voice (180–200 wpm, real pauses), edit grammar, 3D look. Its §9 lists exactly which old rules are retired (memes, polaroids, captions, Damage Meter, 25 s hook limit, 10–12 min length). Zero commas, Dave-as-host, research, licences and `at` anchoring stay.
>
> **§0.11 (owner, 11 Oct 2026) is the NEWEST rule set and overrides everything else where they conflict: no commas in the spoken script, a real photo every 10–15 s, a trend meme every ~30 s.**
>
> **§0.12 (Dave = host + UPGRADE mode, 18 Oct 2026) is the newest rule set: Dave talks to the viewer in the first person, almost no stats. "Redo / upgrade / ameliorate epNN" = follow `LONG.md [UPGRADE]`, never rebuild from scratch.**
>
> **§0.10 (Human hook + mixed media v4, 10 Oct 2026) is the newest rule set: it overrides §0.3 (the freeze/rewind hook is retired) and sets 10 min+, real photos and the spoken style.**
>
> **Since ep61, §0 (Retention & CTR v3) OVERRIDES any older rule below that conflicts with it.** The look, cast, voice, research standard, SFX, props and pipeline stay exactly the same. What changes: how the script is *told* (one connected story, not a list of facts), how the hook is *animated*, and how thumbnails are *designed*.

---

### 0. RETENTION & CTR v3 (owner, Oct 2026) — READ THIS FIRST

#### 0.1 Why we changed (diagnosis of ep01–ep60)

The owner's data: **viewers don't finish the videos, they get bored**, and **thumbnails don't make people click**. Reading the 60 scripts and thumbnails, the causes are clear:

| Problem in ep01–60 | Why viewers leave | v3 fix |
|---|---|---|
| Hook ends with **"Today: X, Y, and Z."** | It's a table of contents. The viewer now knows the answer's shape, so there's no mystery left to stay for. | Hook ends on an **unanswered question + a withheld payoff** (§0.3). Never list the agenda. |
| Chapters are **topic buckets** ("The Average Bill", "Gray Divorce", "Who Profits?"). Each opens with "Let's start with…", "Next…", "Here are three more, quickly." | It's an encyclopedia. Nothing connects chapter 3 to chapter 4, so leaving costs nothing. | One **story spine**: every chapter is the next step of *Dave's* problem, joined by **BUT / SO / THEREFORE** (§0.2). |
| Facts are dropped because they are true, not because the story needs them. | Facts without stakes = boredom. | **Fact test:** each fact is a *clue*, an *obstacle* or a *weapon* for Dave. If it doesn't change what Dave does next → cut it. |
| 9 black "CHAPTER 7" cards. | Each card tells the viewer "this is a break, and there are 2 more sections". It's the perfect moment to leave. | Chapter titles become **questions / cliffhanger phrases** (§0.4). The card arrives *after* a cliffhanger line, never after a closed topic. |
| "Now You Know" + **"So let's recap."** at ~88 %. | Everyone knows a recap = the end. They leave and the video is scored as "not finished". | Recap ≤ 15 s, told as **"what Dave learned"**, AFTER the final payoff, and the big payoff is held until the last ~60 s (§0.2 Act 3). |
| Thumbnails: **same template every time** (floating Dave head left, object right, rays, 2 words top right). | Viewers' brains learn the template and scroll past ("seen it"). Small objects/tiny text are unreadable on a phone. Nothing is *happening*, so there's no question to click for. | 5 thumbnail **concepts** that each tell a tiny story, a different layout every time, giant readable subject (§0.6). |

#### 0.2 The story spine (MANDATORY for every episode)

Every video is **one story about Dave** with a goal, rising trouble, a villain reveal, a low point and a win. The money facts are the *plot*, not a lecture. Fill this table in the JSON's `"spine"` field before writing any beat:

```json
"spine": {
  "goal": "Dave wants ... (concrete, with a number)",
  "stakes": "If he fails he loses $X / can't ...",
  "central_question": "The ONE mystery the whole video answers (e.g. 'Where did Bob's $4,000 actually go?')",
  "loop_big": "Payoff promised in the hook, paid at ~90 % (e.g. 'the one sentence that got Dave $600 back')",
  "loop_mid": "Opened ~30 %, paid ~60 % (e.g. a 'pause and guess' number)",
  "villain": "Who profits (revealed at ~50 %, not before)",
  "low_point": "~75 %: the moment it looks hopeless for Dave",
  "win": "How Dave fights back (the practical chapter) + his final number"
}
```

**Act structure (≈ 9 min, ~1,300 words, 8–9 chapters):**

| Time | Part | What happens | Retention device |
|---|---|---|---|
| 0:00–0:30 | **Hook** (`o1…o6`) | Flash-forward to Dave's worst moment → "how did he get here?" → stakes number → central question → withheld payoff. | Big open loop. Must match the thumbnail in the first 3 s. |
| 0:30–3:00 | **Act 1** (ch 1–3) | Dave tries the obvious thing. It fails. He finds clue #1, then clue #2. | Each chapter ends on a "but…" line. **Pause-and-guess** at ~2:30 (answer at ~4:30). |
| ~3:00 | **Re-hook 30 %** | "And that's when Dave noticed something on page two." | Opens the next mystery before closing the last one. |
| 3:00–6:00 | **Act 2** (ch 4–6) | Dave digs. **Villain reveal at ~50 %** (who profits, official numbers). Stakes rise. Myth-bust = Dave's own wrong belief ("Dave thought… Nope."). | `SubReminder` right after the villain reveal. **Damage Meter** keeps climbing. |
| ~6:30 | **Low point 75 %** | It looks hopeless / worse than we thought. | Re-hook: "But there's one thing the [villain] really doesn't want you to know." |
| 6:30–8:30 | **Act 3** (ch 7–8) | Dave fights back = the practical fix ("education, not advice"), shown as Dave DOING each step, each with a result number. | Damage Meter flips to **SAVED $X**. |
| ~8:30 | **Big payoff** | Close `loop_big` (the thing promised at 0:20). Best line of the video lives here. | — |
| last ≤ 25 s | **Outro** | "What Dave learned" in 3 one-line points (≤ 15 s) → next episode teased **as Dave's next problem** (a cliffhanger, not a topic) → subscribe joke. | End screen over the teaser. |

**The BUT/SO/THEREFORE rule (South Park writers' rule):** read the beats in order; between any two chapters (and between most beats) you must be able to insert **"but"**, **"so"** or **"therefore/which means"**. If the only possible link is **"and then"** or **"also"**, the script is a list → rewrite.

**Every chapter:**
- opens with Dave *doing* something (not "Let's look at…"),
- contains one silly analogy (unchanged rule),
- **ends with a cliffhanger line** that raises the next question, e.g. *"Fifty cents. But the bank wasn't sitting on Dave's money. It was doing something much sneakier with it."*

**Banned phrases** (the validator-in-your-head): "Today: …", "In this video…", "Let's start with…", "Next,", "Here are three more, quickly", "Another reason is", "So let's recap", "That's it", "In conclusion", "Before we wrap up", "Let's talk about". **Use instead:** "But here's the weird part…", "So Dave did the obvious thing…", "Which means…", "And that's exactly what they were counting on.", "Remember that number. It comes back."

**Lists:** never more than 3 items, and each item is *dramatized* (Dave tries it / gets hit by it), never read out like a bullet list.

**Re-hooks:** at least one every 60–90 s. A re-hook = a short line that opens a NEW curiosity before the current one is closed ("Dave found the answer on page two. But it raised a scarier question.").

**Stakes callbacks:** repeat the central number at least 3 times (hook, middle, payoff) so the viewer never forgets what's at stake.

**Pause-and-guess (once, ~25–35 %):** "Quick guess. How much do you think the bank made from Dave's money? Write your number in the comments. The answer is in a minute." Show a `?` card with a ticking clock (`tick`). Pay it ~60 s later with a slam + `stamp`. (Also boosts comments.)

#### 0.3 The hook — "next level" spec (beats `o1…o6`, 20–30 s, ≤ 85 words)

Script pattern (**Flash-forward → Rewind → Stakes → Question → Withheld payoff**):

1. **o1 — Flash-forward (0–4 s):** start at Dave's *worst* moment, mid-action. *"Dave's card just got declined. At his own wedding."* No setup, no "Have you ever…".
2. **o2 — Freeze + rewind (4–7 s):** *"Yep. That's Dave. How did a normal guy end up here? Let's rewind three months."*
3. **o3 — Relatable start (7–13 s):** Dave lives the everyday version of the problem the viewer has (the bill, the app, the tip screen). The viewer thinks "that's literally me".
4. **o4 — Stakes number (13–18 s):** the shocking official number, on screen as a giant counter.
5. **o5 — Central question (18–23 s):** *"So where did the money actually go? Because it didn't disappear. Somebody got it."*
6. **o6 — Withheld payoff (23–30 s):** promise something specific WITHOUT revealing it: *"By the end, you'll know who that somebody is, and the one sentence that got Dave six hundred dollars back."* (Never "Today: X, Y and Z.")

Animation rules for the hook (this is what makes it "another level"):
- **Frame 0 is already in motion**: no fade-in, no title, no empty board. Dave + the key object are on screen at frame 0, already moving (Cam push-in from 1.15 → 1.0 or a shake).
- **First 3 s = the thumbnail scene** (same object, same emotion, same color accent). The click promise is kept immediately — this is the #1 reason people stay past 30 s.
- **A new visual every 1.5–3 s** in the hook (cut, zoom, pop, object swap), each with an SFX. No shot longer than 3 s in the first 30 s.
- **Freeze-frame gag (o2):** freeze the o1 scene, desaturate it, white flash + `sting`, label "THAT'S DAVE" with an arrow. Then **rewind**: replay o1 backwards at 4× with `whoosh` + `flip`, and a "3 MONTHS EARLIER" stamp. Implementation: write the o1 scene as a function of a local frame `ff` so it can be frozen/reversed:
  ```tsx
  const o1Scene = (ff: number) => (<AbsoluteFill>…everything uses ff, not f…</AbsoluteFill>);
  scene(0, () => o1Scene(f));
  const FR = A('o2');                                   // freeze point
  scene(FR, () => <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}…label/arrow…</AbsoluteFill>);
  const RW = w('o2', 'rewind');                          // rewind on the word
  scene(RW, () => o1Scene(Math.max(0, FR - (f - RW) * 4)), false);
  ```
- **Slam number (o4):** the stakes number counts up like an odometer (`Math.round(lerp(0, N, ease(f, a, a + 20)))`) then lands with `stamp` + `shake` + Cam punch-in 1.0 → 1.12.
- **Villain silhouette tease (o5):** a dark shadow of the villain (raccoon/banker) slides in at the edge, face hidden by a "?" — revealed only at ~50 %.
- **Damage Meter appears in o4** (top-right HUD, see §0.5) and stays all video.
- Pauses: ≤ 0.3 s in the hook (unchanged auto-trim on `o*` beats).

#### 0.4 Chapters, cards and pacing

- **Chapter titles = curiosity phrases or questions**, ≤ 5 words, that the viewer wants answered: "Where The $4,000 Went", "The Page-Two Trap", "Why The Bank Smiled", "Dave Fights Back". Never dry labels ("The Average Bill", "What the Law Says", "Now You Know").
- The chapter card comes **right after a cliffhanger line**, so the card feels like a TV "…to be continued", not an exit.
- Outro chapter title: "What Dave Learned" (not "Now You Know").
- **Pattern interrupt every 45–75 s**: change the format, not just the object — DreamFrame myth-bust, OldFilm flashback, raccoon cameo, pause-and-guess card, split-screen "Dave vs Bank", a phone-screen close-up, a fake "breaking news" strip. Never two Board scenes with a talking Dave in a row for more than ~20 s.
- Something still changes on screen every 3–6 s (unchanged) and every scene is full from its first frames (NO EMPTY SCENES rule unchanged).

#### 0.5 Running devices (use in every episode)

- **Damage Meter**: small HUD card top-right (`x≈1700, y≈90`), label "DAVE'S DAMAGE", value = running total of what the problem has cost Dave so far. Each increase: number ticks up + `cash`. In Act 3 it flips to green **"SAVED $X"** with `chime`. It gives viewers a score they want to see finish. Hide it during chapter cards and the SubReminder; keep it clear of captions.
- **Clue board** (optional, for "who profits" topics): a cork board where each chapter pins one clue card; at the villain reveal, red string connects them to the villain's photo.
- **Callbacks** to earlier episodes (duck, raccoon) stay — they reward loyal viewers.

#### 0.6 Thumbnails v3 — designed for ≥ 15 % CTR

Target: **CTR ≥ 15 %** on the first 48 h of impressions. (Honest note: channel averages are usually 2–10 %; 15 %+ is top-tier and only happens when concept + title + topic all hit. We get there by testing 3 *really different* concepts per video in YouTube **Test & Compare**, not 3 colour variants of one idea.)

**Research-backed principles** (eye-tracking: viewers lock on the dominant subject in ~0.4 s; ~78 % of views are mobile at ~320 px wide; < 4 words do better; emotion + face lifts CTR; YouTube widens distribution when early CTR is high):
1. **Concept > design.** A thumbnail must create a *question in the viewer's head* in < 1 s. Before drawing, write that question in `seo_epNN.json` → `"thumb_question"`. If you can't write it, the thumbnail is wrong.
2. **Something is about to happen** (visual cliffhanger) or **something is wrong** (contradiction). Static "face + object" with nothing happening is banned.
3. **One dominant subject ≥ 40 % of the frame**, max 3 focus areas total. No small objects, no text smaller than ~70 px (at 1280×720) anywhere — tiny labels inside props become mush on a phone.
4. **≤ 3 words**, never repeating the title; prefer a **number, a contradiction or a consequence** ("$4 → $28", "SIGNED IT.", "DAY 187"). Vague emotion words ("TRAPPED", "STILL PAYING", "CAN'T LEAVE") are banned unless paired with a concrete object that explains them.
5. **Break the template.** The last 60 thumbnails are all "Dave head left / object right / rays / text top-right". Every new thumbnail uses one of the 5 concepts below, and **no two consecutive episodes use the same concept or the same background colour.** Dave appears full-body *acting* (signing, swiping, holding the bill, running) or as a reaction head ≤ 30 % of the frame — not the same floating head every time.
6. **Contrast**: saturated subject on a darker/complementary background, thick white or black sticker outline (kit `Hero`), one red/yellow accent on the key detail (`Ring`/`ArrowCue`).
7. **Bottom-right stays empty** (timestamp). Text top or top-left.

**The 5 thumbnail concepts** (each A/B/C variant = a DIFFERENT concept):

| # | Concept | What's in it | Example (ep49 free trial) |
|---|---|---|---|
| 1 | **Dramatic irony** ("moment before") | Dave happily doing the everyday action; the danger is visible to the viewer but NOT to Dave (raccoon's hand in his wallet, a trapdoor under his chair, fine print growing like a monster). | Dave smiling, tapping "START FREE TRIAL"; behind the phone a raccoon holds a giant calendar marked "DAY 8: -$14.99". Text: "FREE?" |
| 2 | **Shocking contrast** | Same thing twice, two prices/outcomes, split stage, big arrow. | `SplitStage`: tiny "$0" phone (green) → huge "$74.95" receipt (red). Text none or "5 MONTHS". |
| 3 | **Your own screen** | A giant phone notification / bank statement / receipt that the viewer instantly recognises as *their* life, one huge readable line, red circle on it. No real logos. | Huge phone lock screen: notification "Payment of $14.99 successful" ×5 stacked, red ring on the 5th. Small shocked Dave peeking. |
| 4 | **Villain reveal** | The one who profits, big and smug, holding Dave's money; Dave small, shocked, in the background. | Banker/raccoon grinning, fanning five $14.99 bills. Text: "THEY PLANNED IT" |
| 5 | **Absurd metaphor** | One impossible, funny image that *is* the video's analogy (credit card in a mousetrap, a house on a fishing hook, a wallet with a leaking tap). | A credit card as cheese in a giant mousetrap labelled "FREE". |

**Mandatory thumbnail QA (do it every time, report the result):**
1. **Phone test:** downscale to 320×180 and 168×94 (`tools/ffmpeg/ffmpeg.exe -i thumb.png -vf scale=168:-1 t168.png`). You must be able to tell what is happening and read every word.
2. **Grid test:** place the new thumbnail in a 5×2 grid with the 9 previous episode thumbnails (ffmpeg `xstack`, as in the QA notes). It must be the one your eye goes to first. If it looks like its neighbours → redo.
3. **Question test:** say the `thumb_question` out loud. Would a broke 25-year-old want the answer?
4. **Title pair test:** title + thumbnail together = 1 + 1 = 3 (they add different info, never repeat).
5. **Promise test:** the thumbnail scene appears in the first 3 s of the video.

**After upload:** run Test & Compare with A/B/C. After 48 h, note the winning concept and its CTR in `pipeline/ctr_log.md` (episode, concept #, CTR, avg % viewed). Use the log to pick concepts for the next series — data beats taste.

#### 0.7 Pre-flight checklist (paste in your final report, all must be ✓)

- [ ] `spine` filled; central question + `loop_big` + `loop_mid` + villain + low point + win.
- [ ] Hook ≤ 30 s, starts with a flash-forward, no "Today:" agenda, ends on a withheld payoff.
- [ ] Hook frame 0 in motion, first 3 s = thumbnail scene, freeze + rewind gag, slam number.
- [ ] BUT/SO/THEREFORE test passes between every chapter; no banned phrases (search the JSON).
- [ ] Every chapter ends with a cliffhanger line; chapter titles are curiosity phrases.
- [ ] Re-hook at ~30 %, villain reveal + SubReminder ~50 %, low point ~75 %, big payoff in last ~60 s.
- [ ] Pause-and-guess opened and paid; Damage Meter climbs and flips to SAVED.
- [ ] Recap ≤ 15 s as "What Dave learned"; next episode teased as Dave's next problem.
- [ ] 3 thumbnails = 3 different concepts; phone/grid/question/title-pair/promise tests passed.
- [ ] All the older rules still hold (sources, word count, ≥ 8:00, valid SFX, no empty scenes, tsc clean, QA 0 flagged).

#### 0.8 Worked example — ep29 "Why Your Bank Pays You 0.01%" (old vs v3)

**OLD hook (38 s, ends with an agenda):** "Dave has five thousand dollars… paid him fifty cents… Today: where the rest goes, why banks get away with it, and where savers can earn way more."

**v3 hook (~26 s):**
- o1: "Dave just opened a letter from his bank. Congratulations, it says. You earned fifty cents."
- o2: "Yep. Fifty cents. For a whole year. How? Let's rewind."
- o3: "Five thousand dollars. Dave's whole emergency fund. Sitting in the same bank since he was eighteen."
- o4: "That same year, the bank earned about one hundred ninety five dollars on Dave's money. Without lending it to anyone."
- o5: "So who got the other one hundred ninety four dollars and fifty cents? And how did they do it without Dave noticing?"
- o6: "Stay to the end. Because Dave found a way to take it back. In twenty minutes."

**OLD chapters (topic buckets):** Dave's Fifty Cents → The Bank's Secret Markup → Three Jobs for Dave's Money → The Big Banks' Big Profits → Why Banks Get Away With It → Where Savers Earn More → CDs, Money Funds and T-Bills → Inflation Eats Savings → What Dave Did Next → Now You Know.

**v3 chapters (one story, BUT/SO/THEREFORE):**
1. **"Fifty Cents?!"** — Dave calls the bank to complain. The agent says "that's our standard rate". *BUT* the agent let slip one phrase: "net interest margin". → cliffhanger: "Dave had no idea what that meant. He was about to find out it was costing him two hundred dollars a year."
2. **"The Lemonade Trick"** — *SO* Dave looks it up: buy money cheap, sell it expensive (lemonade analogy, FDIC margin numbers). Pause-and-guess: "How much do you think U.S. banks made from that trick in just three months?" → cliffhanger: "*BUT* loans are risky. Dave's money was doing something with zero risk."
3. **"The Free Money Desk"** — interest on reserves at the Fed (lawnmower analogy). Damage Meter: −$194.50. → "*WHICH MEANS* the bank doesn't even need Dave's money to work hard. So why does it want it so badly?"
4. **"Why The Bank Smiled"** — villain reveal at ~50 %: $197B net interest income in one quarter; pay off the guess. SubReminder. → "*BUT* if it's this bad, why doesn't everyone just leave?"
5. **"Sticky Money"** — Dave tries to leave and feels the 3 traps (inertia, paycheck/bills, marble columns). Myth-bust: "Dave thought a big bank was safer. Nope." → "*SO* he decided to leave. *BUT* he almost made a very expensive mistake."
6. **"The App That Isn't a Bank"** — the low point (~75 %): Dave nearly moves his money to an app that isn't FDIC insured. → "That's when Dave learned the one word to check first."
7. **"Dave Fights Back"** — HYSA, CDs, T-bills, shown as Dave doing it (education, not advice). Damage Meter flips to "SAVED +$200/yr".
8. **"The Melting Ice Cream"** — payoff + twist: even 4 % only just beats inflation; why this still matters. Close `loop_big` ("twenty minutes").
9. **"What Dave Learned"** — 3 one-liners (≤ 15 s) → "Next time: Dave tries to buy his first home. The bank says yes. That's the problem." → subscribe joke.

Same facts, same sources, same length. The difference: every fact is now a step Dave has to take, and every chapter leaves a question open.

---

#### 0.9 Feedback loop & growth (Oct 2026 — taken from youtube-agent-skill, adapted)

We compared our pipeline with `Jakeschincariol/youtube-agent-skill` (11 prompt-skills + 6 small scripts for talking-head creators). Our playbook already covers script, hook, thumbnails, SEO and chapters in more depth. What it had and we did NOT: **reading real data back**. `ctr_log.md` was empty after 60 episodes — we were writing rules from taste. Three tools were ported:

| Tool | When | Command |
|---|---|---|
| `pipeline/retention.py` | 48 h and 7 days after EVERY upload | `py pipeline/retention.py epNN retention.csv` (Studio → video → Analytics → Engagement → retention chart → download) |
| `pipeline/package_lint.py` | before thumbnails are drawn | `py pipeline/package_lint.py epNN` — needs `"thumb_text"` (the ≤ 3 words on thumbnail A) in `seo_epNN.json` |
| `pipeline/outliers.py` | before proposing topics to the owner | `py pipeline/outliers.py collected.json` — competitor videos ranked by multiple over their OWN channel median |

**Retention rule — ONE fix per video, not twenty:**
- `retention.py` names the beat id at every cliff and the worst chapter (% lost per minute). Paste its `ctr_log row` into `pipeline/ctr_log.md`.
- Hook leak > 25 % in the first 30 s → the next episode's `o1…o6` is the only thing to change.
- Hook healthy, one chapter bleeding → find what that chapter did (list? no cliffhanger? no pattern interrupt?) and ban it here in the playbook.
- Hook healthy + flat slide + few views → the video is fine, the **packaging** failed: new title/thumbnail via Test & Compare, don't touch the script.
- **No new series is scripted until at least 3 uploaded episodes of the current style have a row in `ctr_log.md`.** Building 15 more videos on unmeasured rules is the slowest path to monetization.

**Packaging rule:** title and thumbnail are ONE unit. Thumbnail words never repeat title words; the pair must contain one number; the viewer's pain must be readable in the first ~40 characters of the title (mobile feed cut). `package_lint.py` checks all of it plus §1c ("You/Your").

**Topic research = the `yt-viral` skill** (`.claude/skills/yt-viral`): `py pipeline/collect.py @Chan1 @Chan2 … > collected.json` then `py pipeline/outliers.py collected.json --min 3`. First run (5 Oct 2026, 274 videos / 16 channels) found: (1) the "stickman + Why You're Always Broke" lane is flooded — 25+ clone channels with medians of 5–600 views use our exact title shapes; (2) the stickman outliers are **beginner definitions and A-vs-B math** ("Stock Market Terms Explained" 98k = 168× its channel, "Index Funds, ETFs, Mutual Funds & Hedge Funds Explained" 18k, "Leasing vs Buying a Car", "401(k) vs Roth IRA"); (3) on big explainer channels the winners are concrete "How X is built / what happens to X" curiosity, not advice. Use this when proposing topics. `outliers.py` is evidence for the proposal, it does not replace §1b (owner approves every topic). A topic that is ≥ 3× its channel median on 2+ channels AND passes "that's MY problem" goes to the top of the proposal.

**Comments (first 2 h after publish):** sort into questions / corrections / praise / bait. Answer questions in < 30 words, thank corrections if right, a few specific replies to praise, never reply to bait. Pin the question most people share (not the nicest comment). Repeated questions = next topics.


**Not taken, on purpose:** `hookscore.py` (its own author says it barely separates hits from misses, and it rewards "you" in the first 6 words, which fights our flash-forward hook §0.3); `deadair.py`/yt-edit (TTS has no retakes, pauses are auto-trimmed); `chapters.py` (ours come exactly from `timings.json`); `voice.md` (this playbook is the voice).

#### 0.10 HUMAN HOOK + MIXED MEDIA v4 (owner, 10 Oct 2026) — OVERRIDES §0.3 and everything above where they conflict

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `LONG.md [3D]` §0.12. The rest of this section applies only to OLD episodes.


**Owner's data + words:** viewers leave in the **first 6 seconds**; "the hook sounds really robotic and doesn't attach the viewers"; "the videos have value but feel robotic, people must focus so much to understand"; "make the viewer ENJOY staying the whole video, not just throwing information"; "add real pictures — when we talk about Trump, show the real picture of Trump with good animation. Mix drawings and real pictures"; videos **10 minutes minimum**.

**Diagnosis of the ep51–60 hooks (why 6 seconds):**
| What we did | Why they left |
|---|---|
| Title says **"Why YOUR…"**, first words are *"Dave just turned seventy."* | They clicked for THEIR problem and got a stranger's. The click promise is broken in second 1. |
| The same *"Freeze. That's Dave. How did he end up here? Let's rewind."* in every video | 4–7 s with zero information, and anyone who saw two videos recognises a template. |
| Staccato fragments: *"An ad. Up to one thousand dollars. Free."* | The TTS voice drops its pitch and pauses at every full stop. Three fragments = three robot bursts. **This is what "robotic" is.** |
| One voice speed (−10 %) for 10 minutes, 0.4 s of silence at 0:00 | Flat, slow, no energy at the exact moment the viewer decides. |
| Fact after fact, 2–3 numbers per beat | The viewer has to *work*. Work is not fun. |

##### A. The hook (beats `o1…o5`, ≤ 25 s, ≤ 80 words) — the owner's 4 rules

Every hook must do these **three jobs**, and each hook beat carries a `"job"` field in the JSON:

1. **`concept` — introduce the video's concept.** The first sentence (o1) talks to the **viewer** ("you/your"), confirms the title in other words, and shows a **real picture at frame 0**. No Dave in o1. A viewer who hears only o1 knows what this video is about and that it is about *them*.
2. **`stakes` — introduce the stakes.** What this costs the viewer, as ONE concrete number or loss ("about eleven hundred dollars a year", "a raise you never got"). Shown as a slam number.
3. **`ending` — say, imply or SHOW how the video will end.** The viewer must see the finish line: flash the final scene for ~2 s ("this is Dave ten minutes from now, holding…"), or name the result ("…and Dave leaves that store paying four hundred dollars less"), or promise the skill ("in ten minutes no price tag will ever work on you again"). Not vague ("stay to the end"), not a table of contents. The video's last minute must then really deliver exactly that scene/result.
   Optional extra beats: `proof` (a real example/person/company with a real photo) and `question` (the central mystery).
4. **Never the same hook twice — we must look creative.** Each episode picks a `"hook_form"` from the menu below (or invents a new one and adds it here). **A form may not repeat within 5 episodes** (validator checks). The ORDER of the three jobs changes too (stakes-first, ending-first, concept-first…). Wording is written fresh every time — banned templates: "That's Dave", "Let's rewind", "How did he end up here", "Stay to the end".

**Hook form menu**
| `hook_form` | Shape | Example opening |
|---|---|---|
| `test_on_viewer` | Play the trick ON the viewer with a real object, then expose it. | "Look at this price tag for one second… you just read nine dollars, didn't you?" |
| `absurd_true_fact` | A real company/person fact that sounds wrong, then "…and you're the one paying for it". | "This airline makes more money selling points to your credit card than flying planes." |
| `the_pitch` | Narrator plays the smiling salesman pitching the viewer, then turns to camera. | "Congratulations, you've been selected for a brand new phone, for free…" |
| `two_people` | Two real-feeling people, same situation, different outcome; the viewer is the loser. | "Two people do the same job at the same desk, and one of them earns nine thousand dollars more." |
| `be_honest` | Second-person scene of something the viewer did THIS week. | "Last Friday you said 'let's just split it' and paid for someone else's lobster." |
| `ending_first` | Open on the last scene of the video, then "here's how you get there". | |
| `countdown` | A number ticking in real time while we talk ("since this video started…"). | |
| `myth_flip` | Something everyone believes, flipped in one sentence, with real proof. | |
| `the_object` | One real object on screen, its secret history in 10 s. | |

**How it must SOUND (the anti-robot rules):**
- Write **spoken sentences**: o1 is ONE flowing sentence of 12–24 words. Contractions (you're, didn't, that's). Connectors (and, but, so, because, which means). Max **one** 1–3-word fragment in the whole hook; max 20 % fragments in the whole script.
- Read every line out loud as if telling a friend at a bar. If you wouldn't say it that way, rewrite it.
- `"tts": {"rate": "-5%", "hook_rate": "+3%", "lead": 0.08}` in the episode JSON: the hook is spoken faster and the voice starts at 0:00 (no silence). Give at least 8 beats their own `"rate"` (excited `"+6%"`, slow reveal `"-12%"`) and optionally `"pitch"` (`"+3Hz"` for a question/joke, `"-2Hz"` for a serious line). The voice stays Andrew.
- Hook pauses 0.15–0.3 s.

**How it must LOOK (first 6 s):** frame 0 = a real photo already moving (`PicBg` push-in or a `Pic` slam) + a giant `Slam` word; a new visual every 1–2 s with an SFX (≥ 4 changes in the first 6 s); the key words appear as kinetic text so it works even on mute; Dave reacts in a corner — he is the viewer's stand-in, not the subject. The Damage Meter appears on the `stakes` beat. The `ending` beat SHOWS the final scene (reuse the real end scene as a function of a local frame, inside a tilted "10 MINUTES FROM NOW" frame).

##### B. Make them ENJOY the whole video (not "throwing information")

The narrator is a **funny friend who found something out and can't wait to tell you** — not a teacher.
1. **Example before rule.** Always: real story/person/thing → what happened → *then* the one-line rule ("So in plain English: …"). Never definition first.
2. **Number diet.** Max ONE number per beat, max 2–3 stats per chapter, and every stat is followed by a translation into everyday life ("that's a free vacation, every year"). If a number doesn't make Dave do something, cut it.
3. **Talk to the viewer** at least once per chapter: "Be honest…", "You've done this. I've done this.", "Guess before I tell you." (≥ 2.2 you/your per 100 words — validator.)
4. **Play with them**: two interactive moments per video (a 3-second guess with a ticking clock, "pick A or B" then the reveal, "spot the trick").
5. **One real-world story per chapter** with a real name, year and **real photo** (a company, a CEO, an inventor, a study, a newspaper) — stories are what people stay for.
6. **Dave talks.** Dave says short lines in speech bubbles and the narrator voices them ("Dave goes: wait… WHAT?"). He's funny, a bit dumb, lovable.
7. **One running gag** per episode that returns at least 3 times and pays off in the last minute.
8. **A laugh every ~30 s** (silly analogy, Dave's reaction, raccoon, understatement). Humour is specific, never random.
9. **Emotion changes**: curiosity → surprise → anger at the villain → "oh no" low point → relief → victory. Mark the voice (`rate`/`pitch`) to match.
10. **Length: 10:10–12:00** (≈ 1,550–1,750 words at these rates). validate.py fails under 10:05. Fill with *stories*, never with repetition.

Everything in §0.2 (spine, BUT/SO/THEREFORE, cliffhangers, re-hooks, pause-and-guess, villain at ~50 %, low point ~75 %, fight back, payoff, 3-line recap, next-problem teaser) still applies.

##### C. Mixed media — real pictures + drawings

**Rule: what is REAL in the world is shown REAL; what is in Dave's life or in an analogy is DRAWN.** Named company → real photo of its store/product/HQ. Named person (CEO, inventor, president, researcher) → their real photo. Real object (an iPhone, a price tag, a gold watch, a boarding pass) → real photo or cutout. Dave, Bob, the raccoon, the duck, analogies, charts → drawn, as always. The magic is the **mix in one frame**: drawn Dave standing in a real store (`PicBg`), pointing at a real polaroid, a real CEO cutout next to the drawn raccoon.

- **A new real photo every 10–15 s for the whole video (see §0.11): about 45–60 different photos per episode. 14 is no longer enough.** ≥ 2 in the hook (one at frame 0), ≥ 1 per story beat/chapter. **Each source photo is a one-time asset: use each photo ID only once per video. No reusing a photo later, even with a different crop, size, look, or label.** Give every image a beat-specific ID and choose it to match the exact spoken line; unrelated generic stock imagery is forbidden. Never use the same photo in the same look twice in a row.
- **Kit: `src/photo.tsx`** (HTML layers in the same 1920×1080 space; siblings of `<Svg>`, order = depth):
  - `<PicBg f={f} src="ep62/store.jpg" from={A('c1a')} dim={0.25} />` — full-screen real world with slow push-in; draw Dave in an `<Svg>` after it. Options `blur`, `gray`, `tint`, `pos`, `zoom`, `pan`.
  - `<Pic f={f} src="ep62/ceo.jpg" x={1300} y={480} w={520} h={640} at={w('c2a','johnson')} look="polaroid" enter="slam" rot={4} label="Ron Johnson, 2012" />` — looks: `polaroid`, `sticker`, `tape`, `news` (red banner label), `circle`, `plain`, `cutout` (transparent PNG with white sticker outline). Enters: `pop`, `slam`, `drop`, `left`, `right`, `none`. Also `kb` (Ken Burns), `wob` (paper wobble), `gray`, `ring`, `out`, `pos="50% 20%"` (keep faces in frame), `s={bump(at)}`. x,y = CENTRE of the picture.
  - `<Slam f={f} at={…} text="$9.99" x={960} y={300} size={220} color={C.yellow} />` — giant kinetic word.
  - Demo of every look: composition `PicDemo` (`src/PicDemo.tsx`).
- **Animate every photo**: it enters with an SFX (`paper`, `flip`, `stamp`, `pop`), keeps a slow Ken Burns/wobble, and something drawn interacts with it (Dave points, a red marker ring, an arrow, a stamp, a price sticker slapped on it). A photo that just sits there is a slideshow — banned.
- **Where photos come from (free licences ONLY, credit is automatic):**
  1. `py pipeline/photo_find.py "Walmart store" --sheet walmart` → Wikimedia Commons results (already filtered to PD / CC0 / CC BY / CC BY-SA) + a numbered contact sheet `../qa_dl/find_walmart.jpg`. **Look at the sheet** and choose. Prefer PD/CC0/CC BY; landscape for backgrounds; faces sharp and neutral.
  2. Add to `pipeline/photos/epNN.json`: `{"id": "walmart", "file": "File:….jpg"}` (add `"cutout": true` for a person/object you want cut out). Unsplash / Pexels / Pixabay / US-government photos are also fine: `{"id", "url", "credit", "license", "page"}`.
  3. `py pipeline/photos.py epNN` → downloads to `public/photos/epNN/` (small JPGs, committed to git), fills credit + licence, writes `../qa_dl/photos_epNN.jpg`. **Look at it.**
  4. Cutouts: commit + push the JPGs, then `gh workflow run photos.yml -f ep=epNN` → the cloud removes backgrounds and commits `<id>.png`; `git pull`, download artifact `epNN-photos` to check the cutouts.
  - NEVER: Google Images, news agencies (Getty/AP/Reuters), stock sites with watermarks, screenshots of films/TV, NC/ND licences. `photos.py` refuses non-free licences; `validate.py` refuses photos missing from the manifest. `seo.py` prints the photo credits in the description automatically.
- **Real people:** public figures only, in a factual context (what they really did/said, with a source). No invented quotes, no speech bubbles putting words in a real person's mouth, no humiliating edits. Jokes are about the *situation*, said by the narrator or Dave. Politicians: balanced as always.
- **Brands:** real photos of stores/products are fine (we're reporting on them). Still no *drawn* logos. Thumbnails stay drawn + (optionally) one real object; a real person's face on a thumbnail needs the owner's OK.

##### E. v4 pre-flight (add to §0.7)
- [ ] `hook_form` chosen, not used in the previous 5 episodes; hook beats tagged `job`: concept + stakes + ending all present; the ending shown in the hook is really the video's last scene.
- [ ] o1 = one spoken sentence to "you", real photo at frame 0, no Dave; hook ≤ 25 s; voice starts at 0:00.
- [ ] `tts` block set; ≥ 8 beats with their own `rate`; fragments ≤ 20 %; you/your ≥ 2.2 per 100 words.
- [ ] One real story + real photo per chapter; photo cadence of §0.11 met, all in the manifest with licence; contact sheet looked at.
- [ ] Number diet respected; 2 interactive moments; running gag ×3; Dave speaks.
- [ ] ≥ 10:05.

#### 0.11 FLOWING SCRIPT + PHOTO & MEME CADENCE v5 (owner, 11 Oct 2026) — NEWEST, overrides everything above where they conflict

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `LONG.md [3D]` §0.12. The rest of this section applies only to OLD episodes.


**Owner's words:** "I don't want commas in the script, like *bonus, free, house, free*. Say it like *the bonus is free and also the house is free*." · "The real images should be every 10 to 15 seconds and the memes every 30 seconds." · "The style of videos now should include real images and trend memes."

##### A. No commas in the spoken script
- **Zero `,` characters in any beat `text`.** A comma makes the voice stop and drop its pitch, which is the robot sound. `validate.py` fails ep61+ on any comma in a beat.
- Join ideas with spoken connectors: **and, and also, but, so, because, which means, while, then, until, even though**. Or end the sentence and start a new full one.
- ❌ "Bonus bets, free tickets, a VIP host." → ✅ "He gets bonus bets and free tickets and he even gets his own VIP host."
- ❌ "Dave signs up, and deposits five hundred dollars." → ✅ "Dave signs up and he deposits five hundred dollars."
- ❌ "Yes, Dave, you're the old dog." → ✅ "Yes Dave you're the old dog."
- No cheating with dashes, semicolons, colons or "…" in place of the comma. No 1–3-word fragments to dodge it (the ≤ 20 % fragment rule still applies).
- Lists of three are spoken: "X and Y and also Z", or three short full sentences, each dramatized.
- Numbers stay spelled out for TTS ("one thousand one hundred" has no comma anyway).
- Read every line aloud as one breath. If you need to stop in the middle, split it into two sentences.

##### B. Real photo every 10–15 seconds
- From 0:00 to the end, **a NEW real photo enters at least every 15 s** (target every 10–15 s) → **about 45–60 different photos** for a 10–11 min episode. Chapter cards are the only allowed gap.
- All §0.10 C rules still apply to every one of them: free licence via `photo_find.py` / `photos.py`, in the manifest, **each photo ID used once**, matched to the exact spoken line (no generic stock filler), enters with an SFX, keeps moving (Ken Burns / wobble), and **a drawn character interacts with it** (points, stamps, holds, reacts). Faces of characters are never covered.
- Vary the look so it never feels like a slideshow: `PicBg` world shots, polaroids, taped photos, news strips, circles, cutouts. Never the same look twice in a row.
- Plan it in the script: add a `"photo"` note per beat (or a comment block at the top of `EpNN.tsx`) listing `beat id → photo id → time`. Report the longest gap between two photos; it must be ≤ 15 s.

##### C. Trend meme every ~30 seconds
- **One meme beat about every 30 s** → **about 20 memes** per episode. Report the longest gap between two memes; it must be ≤ 40 s.
- A meme = a **recognizable trending meme FORMAT** the viewer knows instantly: Drake approve/reject, distracted boyfriend, "this is fine", two buttons, expanding brain, "nobody: / me:", POV captions, "it's free real estate", Spider-Man pointing, woman yelling at cat, stonks / not stonks, "corporate needs you to find the difference", chad vs crying comparison, "me explaining to my mom", plus whatever format is trending when the episode is made (check before writing).
- **We recreate the format, we never download the meme image.** Meme pictures, film/TV stills and celebrity photos are copyrighted → not allowed (§0.10 C licences). Build the layout with our drawn cast (Dave, Bob, raccoon, banker, cat, duck) and/or a free-licence real photo, with the classic caption style (bold white Impact-style text with black outline, top/bottom text or labelled panels).
- Each meme is its own clearly legible card, ≥ 2.5 s on screen, strong contrast, enters with an SFX, lands as the **punchline of the line just spoken**. Never over a serious factual claim (helplines, losses, real people), never over a character's face, never behind the captions or the Damage Meter.
- Don't use the same format more than twice in one episode. A photo caption or a title is NOT a meme.
- A meme that includes a real photo counts for both cadences.

##### D. v5 pre-flight (add to §0.7)
- [ ] 0 commas in beat text; fragments ≤ 20 %; read aloud.
- [ ] Photo count ≈ 45–60, longest photo gap ≤ 15 s, every ID used once, every photo matched to its line.
- [ ] Meme count ≈ 20, longest meme gap ≤ 40 s, ≥ 8 different formats, all legible, none over a serious claim.

---

### 1. The channel

- **Channel name: "Dave Explains Money"** (@DaveExplainsMoney). **Dave is the main character of EVERY video** — the story follows Dave (his problem, his question, his discovery); other characters are supporting.
- **Niche:** Money, Business & Economics Explained (banks, credit, mortgages, companies, taxes, debt, inflation, gold, stocks, fintech).
- **Audience:** English-speaking beginners (US/UK/CA/AU). Assume the viewer knows NOTHING. Explain like to a smart 10-year-old.
- **Format:** 2D stickman explainer, 1920×1080, 30 fps, **8–15 minutes** (target 9–10). Never under 8:00.
- **Voice:** edge-tts `en-US-AndrewNeural`, rate `-10%`, pitch `+0Hz`. Never change it.
- **Tone:** calm, friendly, a little funny. Education, never financial advice (say "This is education, not advice" whenever giving tips).

### 1b. TOPIC RULE — "Ahh, that's MY problem!" (owner, Sept 2026 — most important rule for picking topics)

- The owner REJECTED a list of pure news/macro topics (bond yields, Social Security, tariffs, stagflation) as "trending but not interesting".
- Every topic must hit a **personal pain the viewer already feels in their own wallet**. The viewer must think *"that's literally me"* from the title alone.
- Title is about **YOU / your money**, in everyday words: "Why You're Broke 3 Days After Payday", "You Got a Raise. So Why Aren't You Richer?", "Why a $12 Burger Costs $28 on DoorDash", "Why Everyone Asks You for a Tip Now", "Why Being Poor Is So Expensive".
- Formula: **everyday situation + frustration + hidden reason (who profits)**. Company stories only when framed from the viewer's pain (their bill, their fee, their price).
- Macro/news topics are allowed only when told through the viewer's pain (not "The bond market explained" but "Why your mortgage payment just jumped").
- Cold open: Dave LIVES the problem first (checks his account, sees the bill), viewer recognises themself, THEN we reveal who profits, THEN a practical fix chapter.
- Before building, always propose topics to the owner and wait for approval. **Never start a script, voice, animation or thumbnail before the owner says yes to the topic + title.**

#### 1c. TITLE RULE — "Ohh… that's MY problem" (owner, Oct 2026)

The title is a **people problem**, not a subject. Someone scrolling must recognise their own life in it in one second and think *"wait, that's literally me"*. Study the best of ep31–60:

| ✅ People-problem titles (do this) | Why it works |
|---|---|
| Why You're Broke 3 Days After Payday | a moment everyone has lived |
| You Got a Raise. So Why Aren't You Richer? | "you" + a frustration they feel but can't explain |
| Why Your Car Insurance Keeps Going Up (Even With No Accidents) | their bill + an unfairness |
| Why You Can't Save Money (It's Not Your Fault... Mostly) | a personal pain + relief |
| Why Christmas Makes You Broke Until March | a specific season + feeling |
| Why You Keep Forgetting to Cancel Free Trials (On Purpose) | a habit they're embarrassed by + twist |
| Why Gym Memberships Are Designed for You to Quit | their own failure, reframed as a trap |
| Why Everyone Asks You for a Tip Now (Even Self-Checkout) | a daily annoyance |

| ❌ Subject titles (never again) | Rewrite as a people problem |
|---|---|
| How Apple Really Makes Money | Why You Keep Paying Apple Every Month |
| Recession Explained | Why You Feel Broke Even When "The Economy Is Fine" |
| The Federal Reserve Explained | Why Your Credit Card Rate Went Up and You Did Nothing |
| Is AI a Bubble? | — (no wallet pain → reject topic) |

**Title checklist (all required):**
1. Contains **"You" / "Your"** (or a "you" situation like "You Got a Raise").
2. Names a **moment, bill, habit or feeling** from everyday life (payday, the tip screen, the gym card, the free trial, the raise, the group dinner) — not an industry, company or economic term.
3. Has a **frustration or contradiction** ("…So Why Aren't You Richer?", "…Even With No Accidents", "…Then Ban You If You Win").
4. Everyday words a 15-year-old understands. No jargon (no "net interest margin", "stagflation", "APR" in the title).
5. 40–65 characters, the pain in the first ~45 characters (mobile cut-off).
6. Optional parenthetical twist that hints at a hidden villain: "(On Purpose)", "(Who Bought Your Vet)", "(It's Not Your Fault... Mostly)".
7. **The one-second test:** read only the title to someone. If their reaction isn't "ugh, yes, why IS that?", rewrite it.

When proposing topics, give the owner: title + 1-line "that's me" moment + who profits + 2 alt titles.

### 2. Recurring cast (keep them consistent)

| Character | Look (Stick `acc`) | Role |
|---|---|---|
| **Dave** | `['hair']`, seed 7 | The everyman hero. Broke, curious, relatable. Owns a cat (ep03). |
| **The Banker** | `['tophat','monocle','tie']`, seed 31 | Smug, grinning, profits from everything. |
| **Grandma** | `['bun','glasses']`, seed 13 | Saver, pays cash, victim of hidden fees/inflation. |
| **Bob** | `['cap']`, seed 21 | Dave's neighbor. Carries the credit card debt, franchise owner. |
| **Shop owner** | `['ponytail']`, seed 44 | Small business owner. |
| **The Raccoon** | `<Raccoon>` (props3) | Mascot for hidden fees / greedy middlemen. Can wear a Robin Hood hat (`hood`). |
| **The Duck** | `<Duck>` (props) | The "money from nothing" analogy mascot. Quacks. Cameo whenever money creation comes up. |
| Others | Ray Kroc `['fedora','tie']`, Harry `['glasses','tie']`, Buffett `['glasses','tie']` seed 79, brothers `['paperhat']` | One-offs. |

Callbacks to earlier episodes are GOOD ("Remember the raccoon from our credit card video?").

### 3. Script rules (the most important part)

0. **Speed:** build several episodes in parallel with builder agents using `LONG.md [BRIEF]`; the lead integrates, QAs and renders.
1. **Length:** aim for **~1,250–1,400 spoken words, 9 chapters** (1,230 words ≈ 8:50; older note below overestimated) (Andrew at -10% is faster than expected: ~1,500 words gave only 6:40–7:30 in Series 1). ALWAYS run python pipeline/validate.py epNN after tts — it fails under 8:00. If short, add a history chapter or a 'X vs Y' comparison chapter.
2. **Structure (always) — v3, follow the story spine in §0.2:**
   - **Hook (beats `o1…o6`, 20–30 s):** flash-forward → freeze + rewind → relatable start → stakes number → central question → withheld payoff (§0.3). ~~"Today: X, Y, and Z."~~ is banned.
   - **7–8 story chapters** (`"chapter": "Title"` on the first beat, title = curiosity phrase). Each chapter = the next step of Dave's story, one idea, its own silly analogy, ends on a cliffhanger line.
   - **Myth-bust beat** = Dave's own wrong belief ("Dave thought… Nope.").
   - **Practical chapter** = Dave fights back, near the end ("education, not advice").
   - **Big payoff** (closes the hook's promise) in the last ~60 s.
   - **"What Dave Learned"** outro: exactly 3 one-line points, ≤ 15 s (never "So let's recap").
   - **Teaser for the next episode as Dave's next problem** + subscribe line with a joke ("Subscribe, so the raccoon doesn't get you.").
3. **Sentences:** short. One idea per sentence. Simple words. Numbers spelled out for TTS ("twenty twenty five", "one point four billion").
4. **Every concept gets a silly concrete analogy:** duck on paper = money creation; raccoon toll booth = swipe fee; bathtub + spoon = minimum payments; pizza slices = where payment goes; bouncy castle = borrowing cost; Monopoly hotels = McDonald's rent; babysitter paid twice = BNPL; bread in a town = inflation.
5. **Hook pauses must be short** (≤ 0.35 s; last hook beat ≤ 0.6 s). Dead air in the hook is forbidden. `tts.py` auto-trims silence on beats whose id starts with `o`.
6. **Beat pauses:** 0.4–0.6 normal, 0.7–0.9 after a punchline or at chapter end.

### 4. Research rules (company-level accuracy)

- Every number must come from a primary/official source (Fed, BLS, CBO, Treasury, FDIC, company 10-K, BoE, NY Fed, WGC…). Search the web for the **latest** value — never use memory for current numbers.
- Put sources in the episode JSON `sources` and show a `<SourceTag>` on screen when a stat appears.
- Compute derived numbers yourself and cite the math ("$198B ÷ 132M households").
- Balanced on politics ("That's a political question. Now you know the numbers.").

### 5. Titles, thumbnails, descriptions

- **Title:** curiosity gap + specific number/contradiction. Examples: "Banks Don't Lend You Money. They Create It Out of Nothing." / "Why a $300,000 House Costs You $720,000" / "Who Does America Owe $40 Trillion To? (It's Not China)".
- **Thumbnails: concepts and QA come from §0.6 (v3) — the "Face left + Hero right + Headline" formula below is only ONE possible layout, not the default. Tech stays v2:** 3 variants (A/B/C) in `src/v2/`, built with `src/v2/kit.tsx`, composition `ThumbV2`, register in `src/v2/index.tsx`. Formula = max 3 elements: (1) giant close-up `<Face>` (s≈5.2, one side third, strong emotion: shock/scream/angry/money/suspicious/smug, `lines`/`sweat` extras), (2) ONE big `<Hero>` object with white sticker outline, (3) `<Headline>` 1–3 words (Anton), one word yellow or boxed. `<Stage>` = saturated radial gradient + rays + vignette, a different colour per variant. Optional `ArrowCue`/`Ring`/`XBig`. Text top area, nothing important bottom-right (timestamp). Must read at 168 px wide. Text complements the title, never repeats it. Render: `node pipeline/stills.mjs <out> '[{"id":"ThumbV2","ep":"epNN","v":"A"},…]'` → `videos/epNN/v2/thumb_v2_X.png`. Channel assets: `src/v2/channel.tsx` (AvatarV2 A = coin face chosen, Banner 2560×1440 safe zone 1546×423).
- **Description** (auto by `pipeline/describe.py`): hook paragraph (`youtube.hook`), "In this video you'll learn" from chapters, subscribe line, chapters with timestamps, sources, music credit (Kevin MacLeod CC-BY — REQUIRED), not-financial-advice line, 3 hashtags.

#### 5b. SEO & CTR rules (researched Sept 2026) — used by `pipeline/seo.py`
- **Title:** hook in the first ~50 chars (mobile cut-off), 40–65 chars total, contains the searchable phrase ("How banks create money", "inflation explained", "how McDonald's makes money"), a specific number or contradiction, optional parenthetical kicker "(It's Not China)". Max one CAPS word, 1–2 power words. No year in evergreen titles.
- **Title ≠ thumbnail words.** Title and thumbnail must say different things (1+1=3). Pick the thumbnail variant that doesn't repeat the title.
- **2 alternate titles** per video for YouTube Test & Compare.
- **Description:** line 1 (≤150 chars) = keyword question + payoff (it's all people see before "Show more"); then a 2–3 sentence story summary with long-tail keywords; "In this video you'll learn" ✅ list; chapters with timestamps (starting 0:00); subscribe CTA + "Watch next"; sources; music credit; not-financial-advice line; exactly 3 hashtags.
- **Tags:** ~11 total: 2–3 exact-match + long-tail phrases + "money explained simply" brand tag. Under 500 chars. No stuffing.
- **Pinned comment:** a question that's easy to answer (YES/NO, a number, a city) to trigger comments.
- **Settings:** Not made for kids · Education · Altered content: No (animated) · End screen: next episode + subscribe.
- For each new episode add an entry to `SEO` in `pipeline/seo.py`, then run `py pipeline/seo.py epNN` → writes `videos/epNN/epNN_UPLOAD.txt`.

### 6. Visual style

- Flat, cream background (`Board`), `Street`, `Interior`, `Beach`, `DreamBg`+`DreamFrame` ("WHAT MOST PEOPLE THINK"), `OldFilm` for history.
- Palette in `src/theme.ts` (`C.*`). Fonts: Fredoka (UI), Caveat (handwriting).
- **Holding things (ep51+, owner bug report Oct 2026):** NEVER use `handItem` (it draws the item at the midpoint of both hands = on Dave's chest/neck, and mirrors text when flipped). Use `hold={{item: <CreditCard s={0.35} />, side: 'r'}}` with pose `present`, `talk` or `point_r` (`point_l` + `side: 'l'`). Stick auto-swaps chest poses (hold, thumbs, think…) for an outstretched arm. Item scale ~0.3–0.4. `validate.py` blocks `handItem` in new episodes.
- Something must change on screen at least every 3–6 s. Pop-ins (`pop()`), camera push (`Cam`), shakes on impacts.
- Word-highlight captions, progress bar with chapter segments, chapter title cards — automatic.
- **Subscribe:** mid-video `<SubReminder>` right after the biggest reveal (+ `subCues`) AND the end `SubButton`/`Bell` scene.

### 7. Sound

- SFX on exact words (`q(w('beatId','word'), 'sfx', vol)`): pop, pop2, whoosh, whoosh_s, thud, stamp, coin, cash, click, key, key2, ding, chime, boing, buzz, quack, poof, scribble, marker, paper, flip, crinkle, clank, dream, sting, heart, rip, trombone, cricket, sputter, mail, crowd, tick, step, flutter, draw.
- Music: "Fluffing a Duck" (loop, low). Master: −14 LUFS (assemble.sh).

### 8. How to build episode N (step by step)

1. **Research** latest facts (web search). Write `pipeline/episodes/epNN.json`: `id`, `title`, `youtube{title,hook,tags}`, `sources[]`, `beats[]` (`id`, `text`, `pause`, optional `chapter`). Beat ids: hook `o1…`, chapters `c1a…c8g` (any unique ids; hook must start with `o`).
2. **Choreograph** `src/episodes/EpNN.tsx` — copy the structure of Ep09/Ep10 (the most mature). Pattern:
   - `const {bs, w, we, t} = useT();` `A(id)` = scene start. `w(beat, word, nth)` = frame when a word is spoken.
   - `scene(at, () => <AbsoluteFill>…</AbsoluteFill>)` for each visual beat group; sub-switch inside with `f < A('next') ? … : …`.
   - `q(frame, 'sfx', vol)` for sounds. Chapter whooshes/chimes via the loop at the top.
   - Mid-video `const SUB = w('cXx','word') + 20; subCues(SUB)…; <SubReminder …/>`.
   - Only use words that are actually in the beat text for `w()` (lowercased, punctuation stripped: "McDonald's" → `mcdonalds`, "I P O" → `i`).
3. **Props:** reuse from `src/props*.tsx` (see §9). Add new props in a new `src/propsN.tsx` if needed, same flat style (`stroke C.ink`, width 5–6, round joins).
4. **Thumbnails:** v2 only — add `V2EpNN` (see section 5) and register in `src/v2/index.tsx`. Old `src/thumbs/` is legacy.
5. **Register** the episode in `src/Episode.tsx` (`EPISODES`).
6. `git push` → `check.yml` typechecks (fix any TS error first).
7. **Render:** `gh workflow run render.yml -R hamlou/moneyworks -f ep=epNN -f chunks=10` (~8–10 min). Download: `gh run download <runId> -R hamlou/moneyworks -n epNN-final -D Desktop/100/videos/epNN`.
8. **QA:** contact sheet every 20 s (`tools/ffmpeg/ffmpeg.exe -i epNN.mp4 -vf "fps=1/20,scale=384:-1,tile=5x6"`), check length ≥ 8:00, hook has no dead air, no empty screens, subscribe reminder visible.

### 9. Component toolkit (quick reference)

- `props.tsx`: G, Text, Bank(label), Bill, Coin, MoneyStack(n,label), Vault, Car, Desk, Monitor(value,title), Keyboard, Paper(text,reveal,id), Pencil, Duck, Puff, Sparkle, Bubble, Thought, XMark, Stamp, Moth, Card(top,big,color), Clock, Calendar(top,year), Sack(coins), DocCard, SourceTag, Arrow.
- `props2.tsx`: OldCar, Phone(title,value), Coupon, Printer, GoldBar, BigButton, Chest, Cushion, Dial(v,label), Shield, Umbrella, Sun, Towel, Envelope, Mailbox, TornNote, Chalkboard, Magnifier, Bar(h,value,label), Screen$, Badge, Row(n,text,lit), Sign, CreditCard, SubButton, Bell, Clapper, MoneyMachine, Frame(w,h,label), Icon(kind).
- `props3.tsx`: Raccoon(mood,grab,hood,holdCoin), TollBooth, Coffee, Shop(name), Terminal, PriceTag, Fridge, Bathtub, Ticket, Plane, Atm, HospitalBill, PieSplit, SourceCard, SplitBar(a,la,lb), Person, Plate, Bush.
- `props4.tsx`: Cat(mood), House(sold), BouncyCastle, Pizza(eaten), Sandwich, Globe, Truck, LineChart(pts,t,lo,hi), WaterHeater, Burger, amort().
- `props5.tsx`: Mixer, Board(Monopoly), Land, IceCreamMachine, Fries, Contract, Corner.
- `props6.tsx`: Flag(jp/cn/uk/us), Bread, Wheelbarrow, ReportCard, Pockets, Conveyor.
- `props7.tsx`: Lemon, Stand, Share, Ticker, Thermo, Boxes, Factory.
- `Stick` poses: idle, wave, point_r, point_l, point_up, shrug, pockets, think, typing, celebrate, shock, hips, facepalm, carry, present, talk, relax, panic, thumbs, hold. Expressions: neutral, happy, grin, sad, shock, worried, smug, think, tired, suspicious. Extras: walk, sweat, pockets, tinfoil, handItem, flip.
- `fx.tsx`: Svg, Cam, Scenes, Street, Interior, Board, Beach, DreamBg, DreamFrame, OldFilm, Vignette, Captions, ChapterCard, Progress, SubReminder, subCues, Sfx.

### 10. Lessons learned (don't repeat)

- Scripts under ~1,500 words end up < 8 min → always add a practical or history chapter.
- Hook dead air: keep pauses short; show visuals the instant the narrator says "look at this".
- Empty screens while waiting for a `pop()` feel dead — always have a title or placeholder visible at scene start.
- Zero-height `Bar` hides itself; labels only appear when the bar grows.
- Don't draw real logos (McDonald's arches, Klarna logo). Text names are fine.
- Avoid emoji in SVG text (renderer may lack the font). ✓ works.
- Captions come from edge-tts word boundaries; write numbers as words.
- SFX names must be in the §7 list — an unknown name (e.g. 'sparkle') makes the cloud render fail (ep45/46).
- **Layout anchors (ep51-59 rebuild, Oct 2026):** `Row` is anchored at its LEFT edge (x = left, default width 980) - a centred list is `x≈300–520`, never `x=860`. `People` draws up and to the left of its origin (single row sits at `y - 290·s`): for one row use `y = wantedY + 290·s`. `XMark` is 520 px wide at `s=1` - use `s≈0.3–0.5`. `Calendar flip={0}` shows the year (`flip={1}` hides it).
- **Footer is fixed:** `<Scenes/> <Vignette/> meter <Progress/> <ChapterCard/> <SubReminder/> <Captions/> <Sfx/>`. `SubReminder` is an overlay in the footer, NEVER inside `scene()` (that blanks the screen for 4 s), and `subCues(SUB).forEach((c) => cues.push(c))`. `validate.py` now checks this, SFX names, ChapterCard and XMark size.
- **Scene anchors must match the words:** if a block reads `w('c4e', …)` its scene is `scene(A('c4e'), …)`. ep52 and ep54 shipped with a whole chapter one beat early.
- **No text walls:** a scene that is only 3–7 lines of narration printed on the board fails the owner's style even if QA passes (ep51). Every scene = character + main object + one number/label.
- **QA report:** `N flagged beats out of M` must be `0`. `QA CRASHED` now only appears when frames really failed to render.
- `seo.py` rewrites `pipeline/episodes/epNN.json` (youtube field) on purpose — commit that change, it is not stray.
- Owner's topic taste (ep41–60 rounds): YES = life moments & money traps (weddings, divorce, co-signing, lending to family, MLMs, gurus, trading/betting apps, free games, gym, free trials, working until 70). NO = product-fee topics (printer ink, popcorn, warranties, resort fees, timeshares), 'feel poor on $100K', kids' sports/parties, nursing homes, dentists, lottery, pig-butchering scams.

### 11. Series 1 episode list (for callbacks)

| # | Title | Mascot moments |
|---|---|---|
| 01 | Banks Don't Lend You Money. They Create It Out of Nothing. | duck on paper, NOPE vault, 3 brakes, SVB bank run |
| 02 | Your Credit Card Makes Money Off You, Even If You Pay On Time | raccoon toll booth, Robin Hood raccoon, bathtub+spoon |
| 03 | Why a $300,000 House Costs You $720,000 | Dave's cat, pizza 7/8 to bank, bouncy castle |
| 04 | McDonald's Isn't Really a Burger Company | Ray Kroc, Monopoly hotels, broken ice cream machine |
| 05 | Where Your Taxes Actually Go | tax pot, budget pizza, government's raccoon, 94% top rate |
| 06 | Who Does America Owe $40 Trillion To? | left/right pocket, debt ceiling, Zimbabwe wheelbarrow |
| 07 | Why Your $100 Is Secretly Shrinking | jacket $100 from 2000, shrinkflation chips, Weimar bread |
| 08 | Why Is Gold So Expensive? | gold cube 22 m, Nixon 1971, Buffett cube |
| 09 | How the Stock Market Actually Works | Dave's lemonade stand, heat wave, Buffett's $1M bet |
| 10 | "Pay in 4, 0% Interest"… How Does Klarna Make Billions? | fancier raccoon booth, babysitter paid twice |


#### 0.12 DAVE IS THE HOST + UPGRADE MODE (owner, 18 Oct 2026) — NEWEST, overrides everything above where they conflict

**Owner's words:** "People don't care about stats and numbers. They care if it may happen to them, if it describes their lives. I want the script spoken to the viewer. I want real direct contact between the speaker, which is Dave, and the viewers. I don't want Dave to just look at the stats." · Data: most viewers quit in the first 30–60 s, no video passed 700 views.

**A. Voice (all new AND upgraded episodes)**
- Dave is the speaker: first person, straight to "you", like a friend on FaceTime. Other people's stories are told BY Dave. The old "narrator describes Dave" style is retired (this replaces §0.10 A "No Dave in o1": Dave is on screen talking at frame 0, next to a real photo).
- Every beat answers "could this happen to me?" — the viewer's payday, phone, bills, habits. Not a documentary.
- Max ONE number per ~30 s, always translated into the viewer's life. No stat lists, no "X billion per year" openers.
- Visual: ≥ 40 % of beats are "host" scenes (big Dave facing camera + word-by-word captions, `src/upgrade.tsx`).

**B. Upgrade mode — "redo / upgrade / ameliorate epNN"**
- Never rebuild an old episode from scratch and never rewrite its `EpNN.tsx`. Follow `LONG.md [UPGRADE]`: rewrite the spoken script in `pipeline/episodes/epNN.json` and add the beat fields `host / bg / mood / pose / pic / meme / slam`; `src/upgrade.tsx` lays them over the old cartoon (`tts.py` copies them into `timings.json`). New beats get ids `n1…` and must be `host`/`bg`; deleted beats are fine (`timing.tsx` hides their old scenes).
- Photos: `pipeline/photos/epNN.json` entries may be just `{"id", "q"}` — `photos.py` (photos.yml) picks the first free-licence Commons hit and writes `file` back.
- Order: commit JSON → `photos.yml` → `check` → `render.yml` (chunks 10) → watch the first 60 s.
- `LONG.md [UPGRADE]` is written so free claude.ai (read-only GitHub, small budget) can do it alone: it reads only `LONG.md [UPGRADE]` + the episode JSON. Keep it self-contained; when a rule here changes the voice or the beat fields, update `LONG.md [UPGRADE]` too.

**C. New Dave + Chatterbox voice (owner, 18 Oct 2026) — every video from now on**
- Dave is the channel-avatar Dave: `<Stick big seed={7} … />` (huge round head, dot eyes, no hair; brows only on strong emotions). Never `acc={['hair']}` again. `src/memes52.tsx` `Dave` is already the new one; new episodes import it instead of redefining Dave. Clean avatar cutout: `public/dave_new.png` (thumbnails).
- Voice: `"voice": "chatterbox"` in the episode JSON → run `voice.yml` once per script (12 machines, cached in `pipeline/voice/epNN.flac|json`), then `render.yml`. Chatterbox ≈ 230 words/min → 1,750–2,000 words for 9–10 min. `"exag"` 0.5 default, ≤ 0.7 on big moments. Andrew/edge-tts stays only as fallback.
- Every sound is loudness-normalised to −24 LUFS (voice −16): an `sfx` can never be louder than Dave. Owner's pack: `public/sfx/pack/` (`index.txt`).

**D. Owner feedback on upgraded ep17 (19 Oct 2026) — binding for every video**
- A photo must show exactly what Dave says at that moment: every `pic`/`meme`/`slam`/`zoom`/`sfx` is anchored to a spoken word (`"at"`). Pick the noun first, then the photo.
- Never hide what is being explained: photos/memes on cartoon beats open a right panel and the cartoon shrinks to the left (`splitAt` in `src/upgrade.tsx`, applied in `Episode.tsx`). In new hand-built episodes keep photos in empty space or shrink the scene the same way.
- Zooms start on the punch word and end on the joke's last word; host camera re-frames only at sentence starts/breaths, never on a timer.
- More sound effects (~1 per beat) but each must illustrate its word; failure trombone is quiet (−28 LUFS file, gain 0.3).

### 12. Ideation gates, looped arc, hook-as-question, upload + analytics routine (added 27 Oct 2026 from the "Isa / Nile Blue 7-day channel" case study — adapted for long-form)

**Precedence (updated 29 Oct 2026, owner: "integrate this strategy in our next videos"):** this section is MANDATORY for every new episode, summarised as `LONG.md [3D]` §0.10 (the loop method mapped onto Dave's experiment format). It only yields to `LONG.md [3D]` §0 itself; the photo/meme cadence mentioned below is retired. Benchmark numbers below come from one creator's experiment, so treat them as targets to test and log in `pipeline/ctr_log.md`, not guarantees.

#### 12.1 Three gates before a brief is written (an episode must pass all three)

1. **Universal relatability:** a stranger with zero prior knowledge gets the premise with the sound off. Money situations everyone has lived (rent, bonus, refund, scam call, lending to a friend) pass. Jargon-first premises fail. Pick the MOST relatable story, not the one with the biggest numbers.
2. **Completion compulsion:** the story follows the looped arc (12.2) so the ending is not predictable and the viewer stays to the payoff. For long-form this means the story spine (§0.2) embeds the arc at the episode level: goal → rising → villain reveal → low point → win.
3. **Open loop:** the hook plants a question that only finishing the video can close (12.3). Never hand the answer over in the opening line. The §0.3 hook spec already demands an unanswered question + withheld payoff — this gate ensures the BRIEF enforces it before scripting begins.

Write the three results at the top of `pipeline/episodes/epNN_brief.md` (one line each: PASS plus why). Any FAIL means rewrite the premise before scripting anything.

#### 12.2 The looped arc (how the story spine of §0.2 maps to the arc)

```
HOOK (open-loop question — §0.3 hook spec)
  → RISING ACTION   (Dave's problem escalates: §0.2 goal + stakes + early chapters)
  → VILLAIN REVEAL  (who profits — §0.2 villain, revealed ~50 %)
  → LOW POINT       (it looks hopeless for Dave — §0.2 low_point ~75 %)
  → COMEBACK        (the practical chapter: Dave's fight-back — §0.2 win)
  → PAYOFF          (the final number or line that closes the hook's loop — §0.2 loop_big, paid ~90 %)
```

- **Villain reveal** and **low point** are real beats with their own chapter(s), not only twist lines. **Comeback** is a separate chapter that visibly resolves it. Together they make the arc less predictable than hook → facts → recap.
- In the episode brief list the six phases with their chapter ids and approximate timestamps before scripting. In `pipeline/episodes/epNN.json` group beats by phase so the timeline reads left to right as hook, rising, villain, low point, comeback, payoff.
- Write the script by filling each phase with Dave's story, and write the HOOK LAST once the payoff is known.
- The §0.2 story spine fields map directly: `goal` + `stakes` = RISING ACTION, `central_question` = the HOOK's open loop, `villain` = VILLAIN REVEAL, `low_point` = LOW POINT, `win` = COMEBACK, `loop_big` = PAYOFF.

#### 12.3 Hook = a question, not a statement (works together with §0.3, §0.10 A, §0.12 A)

A statement that reports the result gives viewers no reason to stay. Keep §0.3 (unanswered question + withheld payoff), §0.10 A (concept + stakes + how the video ends), and §0.12 A (Dave first person to "you") — and make the spoken line plant a question or withhold the result. Zero commas still applies.

- Weak (answers it): "Dave got his full $9,997 refund after one phone call."
- Strong (open loop): "What would happen if one question made the bank hang up on Dave and refuse to give back $9,997."
- Checklist: question form or withheld result, curiosity gap, payoff only in the last ~60 s, the hook's second sentence promises the ending (§0.2 loop_big), and the chapter cards never reveal it early (§0.4).

#### 12.4 Upload checklist (long-form)

- **Title:** say what happens in plain words and make it about the viewer (§5 thumbnail/title rules). Credit an original creator in the title only if footage is reused (our episodes use free-licence photos and original animation, so credits go in the description).
- **Description:** the story premise in 2–3 sentences, timestamps for chapters, the photo `credit` + `license` lines, and 3–5 hashtags (topic tags such as `#money` `#personalfinance`).
- **Thumbnails:** follow the §0.6 five concepts. Test on a phone grid before uploading (§0.6 F).
- Set "not made for kids", add end screen (subscribe + best-for-viewer), set cards linking to the next episode if available, publish public.

#### 12.5 Analytics routine after publishing

Log in `pipeline/ctr_log.md` for every episode: views at 24 h and 48 h, CTR (click-through rate from impressions), average view duration as a percent of length, and audience retention graph shape (where the biggest drops are).

| Metric (Studio → Analytics) | Target to test | Reading |
|---|---|---|
| CTR (impressions click-through rate) | ≥ 5–8 % | Below it the thumbnail/title aren't hooking in browse/suggested. Iterate thumbnails (§0.6) |
| Average view duration | ≥ 50 % of video length (5+ min of a 10 min video) | Low means the story spine or pacing has dead zones. Check the retention graph for the exact drop-off beat |
| Retention graph — first 30 s | ≤ 30 % drop | A steeper drop means the hook is leaking. Revisit §0.3 + 12.3 |
| Retention graph — mid-video dips | n/a | Each dip maps to a chapter — if a chapter loses >10 % it's either too slow, too stat-heavy, or the chapter card gave away the answer |
| Hourly candles (views per hour) | n/a | Shows distribution waves, more telling than the total |

- **Do not judge an episode before 48 h.** A slow first day can still take off on day 2 to 7 because YouTube pushes long-form in browse/suggested in waves.
- **Next upload timing:** for long-form the cadence matters less than for Shorts — upload when the next episode is ready. However, note in the log if uploading during an active push visibly flatlined a previous video.
- Keep producing while waiting, and check analytics on a schedule (for example morning and evening), not every few minutes.
- Expect misses: structure (12.1 to 12.3) is how we shorten the number of unstructured guesses before a hit.

#### 12.6 Pre-script scorecard (add to the §0.2 spine and §3 audit)

- [ ] Relatable with sound off (title + thumbnail tell the story alone)
- [ ] Looped arc present: villain reveal beat, low point beat, AND comeback beat as separate chapters
- [ ] Open-loop hook written last, with a question or withheld result
- [ ] Story spine (§0.2) filled with all fields mapping to the arc (12.2)
- [ ] Title, description, and thumbnails follow 12.4

---

## [UPGRADE] — was UPGRADE.md

## LONG.md [UPGRADE] — master prompt: upgrade an existing long episode (cheap on tokens)

> **★ v7 STANDARD (owner, 29 Oct 2026) — `LONG.md [3D]` §0 is THE rule set for EVERY new video (long-form and Shorts) and wins over everything in this file.** Natural connected speech (no commas AND no fragment chains like "12 years. Day one. Math class."), Blender 3D Dave in a red oversized hoodie + wide black pants with costume swaps per scene role, objects from the words of each line, ≥ 50 % real 3D, something new every 1.5–2.5 s, dense SFX (counter roll ticks etc.), hook = the priority (50 %+ of viewers leave in 5–10 s), built with the mandatory LOOP METHOD (§0.10: 3 gates, looped arc hook→rising→conflict→comeback→payoff, hook as a question, mini-loops per chapter, Shorts swipe-through ≥ 80 %, next Short only when < ~5k views/h for 24 h). Retired: memes, polaroids, photo-every-10–15 s, photos+memes every 2–4 s in Shorts, captions, 2D Dave for new videos, asking the owner to record their voice. Template: `pipeline/episodes/test1.json` + `blender/test1.py` + `src/v6/Test1.tsx`. **NO THUMBNAILS (owner 30 Oct 2026: "don't do thumbnails anymore, disable that") — never design, render or propose thumbnails or run thumbs.yml; old thumbnail rules are retired.** **No memes ever; real images only when needed; every video designs + generates its OWN sound effects timed to its moments (LONG.md [3D] §0.12).** **Monetization-safe assets only: `LONG.md [LICENSES]`** (no `public/sfx/pack`, no other creators' clips/music, no cloned voices, credit footer on every upload).


**Owner starts a chat on claude.ai (repo `hamlou/moneyworks` connected) with:** `Read LONG.md [UPGRADE] in my repo and follow it. Upgrade ep52.`

### ★ v6 STYLE (owner, 23 Oct 2026) — overrides §2–§4 below where they conflict
Copy the delivery of the owner's reference video "I posted SLEEPING VIDEOS for 30 days" (never copy its words, voice or character):
- **Dave's experiment.** The episode becomes Dave trying the topic himself: goal + deadline + scoreboard said by 0:45 ("I gave myself 30 days and $500 to beat a casino"). Chapters = time steps (`"Day 1"`, `"Week 2"`, `"The Results"`), up to 10. Facts appear only as tools/obstacles Dave hits. Real-world numbers stay real and sourced; never present an invented result as real data.
- **Writing:** long run-on sentences joined with and/so/but/which then a 1–3 word punch ("Ew." "Yuck." "Perfect."). One fake-out ("…is what I would have said if…"). Dave predicts wrong ≥ 3 times and admits it. Every number gets an absurd real comparison ("that's half what a peasant made in the 1700s"). ≥ 2 direct questions to the viewer with a silence after. Plant 2 callbacks and pay them late. One "Dave goes away" break near 70 % (`card` beats + photos, almost no words). End with the final scoreboard + ONE honest lesson + Dave's sign-off line. Still zero commas.
- **Voice (fixes the robot sound):** add `"cb": {"cfg": 0.35, "exag": 0.5}` at top level. Beats = breath groups of 25–60 words (2–4 sentences of one thought); visuals inside a beat use `at` words. `"pause"`: 0.1 when the next beat continues the thought, 0.35 between thoughts, 0.8–1.2 before a punchline/reaction/fake-out reveal, 1.5 before a time skip. `"exag"` 0.45 dry asides, 0.6–0.7 hype lines. Target 180–200 words per minute.
- **Length:** 2,500–3,300 words (≈ 13–18 min). The hook may run to 60 s but sentence one states the concept to "you" and the first 20 s show a jaw-drop real proof with a `pic`/`bg`.
- **Visual with today's fields:** `meme` is retired (use `slam` + `sfx` "boom" as a comic gag every 25–40 s instead). Every scoreboard number = a `slam` on its word. `pic` looks: only `plain` or `news`. Chapter = time-step title. The full v6 look (3D Dave, UI cards, scoreboard TV, no captions) comes with the v6 kit — see `LONG.md [3D]` §7–§8 (you don't need to read it).

### 0. Budget rules (free plan — obey strictly)
- Read ONLY this file + `pipeline/episodes/epNN.json`. Never open `src/`, playbooks, other episodes, workflows or Python. If unsure of the format, skim `pipeline/episodes/ep17.json` (finished example) — first 40 lines only.
- No plan, no questions, no explanations. Output exactly: **block 1** = full new `pipeline/episodes/epNN.json`, **block 2** = full `pipeline/photos/epNN.json`, then the click list (§6). Nothing else.
- If the reply will cut off: stop after a complete beat `},` and write `CONTINUE FROM <beat id>`. On "continue", resume in a new code block from that beat. The owner pastes the parts one after another.

### 1. What you change
Same topic and story idea; keep `id`, `title`, `sources`, `youtube` as they are (you may append sources). Rewrite every beat's `text` and add the visual fields (§4). The old cartoon keeps playing under/beside the new layer. Add at top level: `"voice": "chatterbox"`.

### 2. Voice + script (copy the owner's favourite: "Can I Go VIRAL In 7 Days?")
- **Dave is the host**, first person, talking to "you" like a funny friend. It's Dave's OWN adventure with a **goal + deadline + scoreboard** ("I have $500 and one night"). Other people's stories are told by Dave ("So I looked it up and…").
- About the viewer's life, never a documentary. Max **one number per ~30 s**, always translated into the viewer's life. No stat lists.
- **Zero commas** in any `text` (also no dashes/colons/semicolons/"…" instead). Join with and / but / so / because / then. Contractions always. ≤ 20 % fragments.
- Joke moves to use every episode: self-roast ("I'm a very smart person so I named it the Dave Method. I couldn't think of anything else."), say-then-opposite, good news / bad news with the same fact, reaction lines, "Be honest. You've done this.", a 3-second guess, one real story with a real person/place, a short serious beat at ~70 % → "Yeah whatever.", ending answers the title in ONE word ("So can you beat a casino?" → card "No.").
- **Length 1,750–2,000 words** (Chatterbox talks fast: ≈ 9–10 min). `"pause"` 0.3 normal, 0.15 in the hook, 0.5 after a punchline. `"exag": 0.6` on 3–6 big emotional lines (default 0.5, max 0.7).

### 3. Structure
- **Hook `o1`–`o5`** (ids must start with `o`), ≤ 25 s, ≤ 75 words, all `host` or `card`:
  0–5 s Dave + real photo + the personal problem/goal ("This is me last Friday with $500 and one plan which was to win.") → a dark `card` gag ("Spoiler.") → promise the ending ("By the end of this you'll see exactly where my money went and the one trick…") → the dare ("Most people click off before that part which is exactly what [villain] wants.").
- Body = ONE story moving forward with BUT / SO / THEREFORE; every section ends on a cliffhanger. Re-hook every 60–90 s. Low point at ~75 %, then 3–4 things the viewer can DO, then the payoff of the hook promise, one-word answer card, next-episode tease as Dave's new problem, subscribe joke.
- Max **4** `"chapter"` fields, curiosity titles, none in the first 60 s.
- Beat ids: keep an old id when the beat keeps its meaning; new beats get `n1`, `n2`…. **New beats must be `host` or `card`, or carry a `pic`/`meme`.** Deleting beats is fine.

### 4. Beat fields (the code already reads them)
```json
{"id": "c2e", "text": "So every time I play the wheel quietly keeps five cents of every dollar.",
 "host": true, "mood": "angry", "pose": "point_r",
 "pic": {"id": "toll_booth", "look": "news", "label": "the toll", "at": "keeps"},
 "slam": {"t": "5¢ TOLL", "at": "five"},
 "zoom": {"in": "quietly", "out": "dollar"},
 "sfx": [{"s": "stamp", "at": "keeps"}, {"s": "cash", "at": "dollar"}]}
```
| Field | Effect | Values |
|---|---|---|
| `host` | Full screen: big Dave facing camera + word captions; camera re-frames on each sentence start | `true` |
| `bg` | Like host, in front of a real photo | photo id |
| `card` | Full-screen title card (≤ 4 words, = the spoken line) | `"THE PLAN"` or `{"t": "No.", "dark": true}` |
| `mood` | Dave's face | neutral happy grin sad shock worried smug think tired suspicious angry money scream |
| `pose` | Dave's body | talk present point_r point_l point_up shrug hips think facepalm celebrate panic thumbs wave |
| `pic` | Real photo. In host beats: beside Dave. In other beats: the cartoon slides into a left panel, photo on the right — nothing is hidden | `{"id", "look": polaroid\|tape\|news\|sticker\|circle\|plain, "label", "at": "word"}` |
| `meme` (⛔ RETIRED 29 Oct 2026 — never add new ones) | Meme card with our cast (same right panel) | `{"t": drake\|brain\|buttons\|fine\|stonks\|vs, "a", "b", "c", "at": "word"}` |
| `slam` | Giant yellow word(s), ≤ 3 words | `{"t": "ALL IN", "at": "word"}` |
| `zoom` | Comedy punch-in on Dave's face (host beats only) + boom | `{"in": "word", "out": "word"}` |
| `sfx` | Sounds, each on its word | `[{"s": "name", "at": "word"}]` |

**`at` = a word that is literally in that beat's `text`** (exact spelling, `"word#2"` for its 2nd time). Everything lands ON that word — this is mandatory for every `pic`, `meme`, `slam`, `zoom` and `sfx`.

**Timing rules (owner's feedback on ep17):**
- **A photo shows exactly the thing being said at its `at` word.** Pick the noun first ("roulette wheel" → `at: "wheel"`), then search a photo of THAT noun. If no concrete noun is spoken in the beat → no photo there.
- **Zoom in on the punch word and out on the last word of the joke** ("not THIS time": `in: "this"`, `out: "time"`). Never a zoom without a joke. 6–10 per video.
- **Sound effects: many, but every one earns its place** — it must illustrate the word it sits on. ≥ 1 per beat on average (≈ 90–120 per video), never two on the same word, never on a calm explanatory word.

| Sound | Put it on… |
|---|---|
| `boom` | a punchline / deadpan reveal |
| `scratch` | "wait…", a sudden stop, a contradiction |
| `drumroll` → `crowd` | before a reveal → the reveal/win |
| `trombone` | a fail (it's quiet on purpose) |
| `cricket` | awkward silence, nobody reacts |
| `ding` | scoreboard update, a good idea, a list item |
| `cash` / `coin` | money gained or spent |
| `stamp` / `thud` | a rule, a fact landing, "No." |
| `pop` / `boing` / `quack` | silly things, cartoon moments |
| `tick` | time, clocks, "guess before I tell you" |
| `whoosh` / `flip` / `paper` | moving to a new place or thing |
| `sting` | danger, a villain reveal |
| `pack/01_beating` | tension, risk | 
| `pack/01_processing` / `pack/02_dial_up` | thinking, computers, "so I looked it up" |
| `pack/01_evolve_brassy_swell` → `pack/02_evolve_brassy_drop_2` | build-up → letdown |
| `pack/03_evolve_boom_brass_d` / `pack/02_deep` / `pack/01_boom` | huge dramatic moment |
| `pack/camera_shutter` | a photo appears that is a "picture" (selfie, snapshot) |
| `riser` | the line before a big moment |

**Density per video:** hook all host/card · ≥ 40 % beats host/bg/card · a `pic` about every 12 s (≈ every 2nd beat, 40–55 photos, each id once) · a `meme` about every 30 s (15–20) · `card` 5–8 · never a `meme` and a `pic` on the same beat.

### 5. Photo manifest `pipeline/photos/epNN.json`
```json
{"photos": [{"id": "toll_booth", "q": "toll booth"}, {"id": "strip", "q": "Las Vegas Strip night"}]}
```
One entry per photo id used. `q` = 2–4 plain English words naming a REAL, concrete thing (place, building, object, famous person, animal) — the same noun as the `at` word. Never abstract ("debt", "sadness") and never a person who is not world-famous (search fails → wrong photo). The cloud takes the first free-licence Wikimedia photo whose name contains those words.

### 6. What the owner clicks (paste this list, with the id filled in)
1. github.com/hamlou/moneyworks → `pipeline/episodes/epNN.json` → ✏️ → select all → paste block 1 → Commit.
2. `pipeline/photos/` → Add file → Create new file `epNN.json` → paste block 2 → Commit.
3. Actions → **photos** → Run → `epNN` → ✅ (❌ "no free photo for X" → ask Claude for a simpler `q`).
4. Actions → **voice** → Run → `epNN` → ✅ (~30–60 min). Re-run after ANY change to a `text`.
5. Actions → **check** ✅ (❌ → paste the error to Claude).
6. Actions → **render** → Run → `epNN`, chunks `10` → ✅ → open the run → download `epNN-video` → watch the first 60 s.

### 7. Silent self-check before output
v6 first: experiment format + Day/Week chapters · `cb` block · breath-group beats 25–60 words · varied pauses · 2,500–3,300 words · no `meme` · fake-out + callbacks + viewer questions + break + sign-off. Then (where not overridden):
Dave first person to "you" the whole time · zero commas · hook ≤ 75 words, no stats, no agenda · 1,750–2,000 words · every pic/meme/slam/zoom/sfx has an `at` word that exists in its beat · every photo shows the spoken noun · sounds ≥ 1 per beat, each meaningful · new `n*` beats are host/card or carry pic/meme · ≤ 4 chapters · valid JSON.

---

## [BRIEF] — was AGENT_BRIEF.md

## Brief for parallel episode builders (ep61+ : v4 = Human hook + mixed media + 10 min)

> **★ v7 STANDARD (owner, 29 Oct 2026) — `LONG.md [3D]` §0 is THE rule set for EVERY new video (long-form and Shorts) and wins over everything in this file.** Natural connected speech (no commas AND no fragment chains like "12 years. Day one. Math class."), Blender 3D Dave in a red oversized hoodie + wide black pants with costume swaps per scene role, objects from the words of each line, ≥ 50 % real 3D, something new every 1.5–2.5 s, dense SFX (counter roll ticks etc.), hook = the priority (50 %+ of viewers leave in 5–10 s), built with the mandatory LOOP METHOD (§0.10: 3 gates, looped arc hook→rising→conflict→comeback→payoff, hook as a question, mini-loops per chapter, Shorts swipe-through ≥ 80 %, next Short only when < ~5k views/h for 24 h). Retired: memes, polaroids, photo-every-10–15 s, photos+memes every 2–4 s in Shorts, captions, 2D Dave for new videos, asking the owner to record their voice. Template: `pipeline/episodes/test1.json` + `blender/test1.py` + `src/v6/Test1.tsx`. **NO THUMBNAILS (owner 30 Oct 2026: "don't do thumbnails anymore, disable that") — never design, render or propose thumbnails or run thumbs.yml; old thumbnail rules are retired.** **No memes ever; real images only when needed; every video designs + generates its OWN sound effects timed to its moments (LONG.md [3D] §0.12).** **Monetization-safe assets only: `LONG.md [LICENSES]`** (no `public/sfx/pack`, no other creators' clips/music, no cloned voices, credit footer on every upload).


### >>> v5 ADDENDUM (11 Oct 2026) — NEWEST, overrides everything below that conflicts <<<

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `LONG.md [3D]` §0.12. The rest of this section applies only to OLD episodes.


You build LONG-FORM episodes. Your playbook is **`LONG.md [PLAYBOOK]`** (every "PLAYBOOK §x" below means that file). `SHORTS.md [PLAYBOOK]` is for vertical Shorts only: do not apply its numbers here. Full spec: `LONG.md [PLAYBOOK]` §0.11.

1. **No commas in the spoken script.** Zero `,` in any beat `text`. Flowing sentences with and / and also / but / so / because / which means, or two full sentences ("the bonus is free and also the house is free", never "bonus, free, house, free"). No dashes/semicolons/colons as a cheat, no 1–3-word fragments.
2. **A NEW real photo every 10–15 s** for the whole video → about 45–60 different photos (the "≥ 14" below is obsolete). Each ID used once, matched to the exact line, animated, a drawn character interacting.
3. **A trend meme about every 30 s** → about 20 per episode. Recognizable trending meme FORMATS recreated with our drawn cast and/or a free-licence photo (never a downloaded meme image or film/TV still), legible ≥ 2.5 s, as the punchline of the line just spoken. Put the component in your own episode file and **name it `Meme`** (the validator counts `<Meme`).
4. Report: photo count, meme count, longest gap between two photos (≤ 15 s) and between two memes (≤ 40 s).
5. Thumbnails: builders DO write `src/v2/tNN.tsx` (`V2EpNN`) and run `thumbs.yml` (the "LEAD makes them" notes below are obsolete).

### >>> v4 ADDENDUM (10 Oct 2026) — READ FIRST, it overrides anything below that conflicts <<<

The owner looked at the analytics: **viewers leave in the first 6 seconds**. His words: "the hook sounds really robotic and doesn't attach the viewers", "the videos are good but feel robotic, people must focus so much to understand", "make the viewer ENJOY staying the WHOLE video, not just throwing information", "add real pictures, mixed with the drawings, with good animation", "10 minute videos at least". And four hook rules, in his words:
1. **Introduce the video concept in the hook.**
2. **Introduce the stakes.**
3. **Say / imply / show how the video will end.**
4. **Don't spam the same hook on every video — we should seem creative.**

**PLAYBOOK §0.10 is the full spec. Read it twice.** Summary of what changed for you:

- **Hook** `o1…o5`, ≤ 25 s, ≤ 80 words. Each hook beat has `"job"`: `concept` (o1, to "you", real photo at frame 0, NO Dave), `stakes`, `ending` (required) + optional `proof`, `question`. Top-level `"hook_form"` = the form assigned to your episode (below). Freeze/rewind gag and "That's Dave / Let's rewind" are RETIRED. The `ending` beat shows ~2 s of the real last scene of your video, and your last minute must deliver exactly that.
- **Sound human:** spoken, flowing sentences with contractions; fragments ≤ 20 % (validator); `"tts": {"rate": "-5%", "hook_rate": "+3%", "lead": 0.08}` at the top level of the JSON; ≥ 8 beats with their own `"rate"` (`"+6%"` excited, `"-12%"` slow reveal), optional `"pitch"` (`"+3Hz"`, `"-2Hz"`).
- **Enjoyable, not a lecture** (§0.10 B): example before rule; number diet (max one number per beat); talk to "you" every chapter; 2 interactive moments; one real story + real photo per chapter; Dave talks in speech bubbles; one running gag ×3; a laugh every ~30 s.
- **Real photos** (§0.10 C): ≥ 14 different real photos, ≥ 2 in the hook, ≥ 1 per chapter, each animated and interacting with the drawn world. Kit = `src/photo.tsx` (`Pic`, `PicBg`, `Slam`, `Halo`), reference = `src/PicDemo.tsx`. Workflow: `py pipeline/photo_find.py "words" --sheet name` → Read `../qa_dl/find_name.jpg` → add to `pipeline/photos/epNN.json` → `py pipeline/photos.py epNN` → Read `../qa_dl/photos_epNN.jpg` → commit `public/photos/epNN/` + the manifest. Cutouts: mark `"cutout": true`, push, `$GH workflow run photos.yml -R $R -f ep=epNN`, wait, `git pull`, then use `src="epNN/<id>.png" look="cutout"`.
  - Drawn characters on top of a `PicBg` MUST be wrapped: `<Halo><Svg>…</Svg></Halo>` (white outline) or they disappear on dark photos.
  - Captions sit at y ≈ 990 and the Damage Meter top-right: keep photos' labels clear of both.
  - Use `pos="50% 20%"` on portraits so the face is not cropped. Look at every photo on the QA sheet.
  - Real people: factual context only, no invented quotes, no words put in their mouth, nothing humiliating (§0.10 C).
  - `photo_find.py` / `photos.py` are small downloads and DO run on the owner's PC. Keep every photo you download under ~500 KB (the script already resizes). Delete `../qa_dl/find_*.jpg` when you finish.
- **Length:** ≥ 10:05 (validator), aim 10:15–11:30 → **about 1,600–1,750 spoken words**, 9–10 chapters. Check `total` after the first cloud TTS and extend with a real STORY chapter if short.
- **Local stills are now allowed for spot checks** (3–6 frames at a time, the PC can do it): `node pipeline/stills.mjs ../qa_dl/epNN '[{"id":"Episode","ep":"epNN","timings":null,"frame":45}]'` (needs `public/epNN/timings.json`; ignore the missing voice.wav). ALWAYS check frames 0, 45, 90, 150 of your hook this way and Read them. Delete the PNGs afterwards. Full QA still runs in the cloud.
- New files you may create: `pipeline/photos/epNN.json`, `public/photos/epNN/*`.
- `validate.py` enforces all of this for ep ≥ 61. It must print OK.

#### Assigned hook forms + direction (write your own final wording with your verified numbers — these drafts only show the SOUND we want)

| Ep | `hook_form` | Draft direction |
|---|---|---|
| 61 job loyalty | `two_people` | o1 concept: "If you've been at the same job for the last three years, there's a decent chance the new hire sitting next to you is getting paid more than you are, for the exact same work." → stakes: what loyalty costs over ten years as ONE number → proof: a real source/photo → ending: "…and ten minutes from now Dave walks back into this office with [the exact result], without quitting." |
| 62 .99 prices | `test_on_viewer` | Frame 0: a REAL price tag fills the screen. o1 concept: "Look at this price for one second… and be honest, your brain just filed that under nine dollars, didn't it, not ten?" → proof: stores have used that one-cent glitch on you for about a hundred and fifty years (verify) → stakes: what it adds up to → ending: "by the last minute of this video, I'll show you the same tag again, and it won't work on you anymore" (and the video really ends with the re-test). |
| 63 "free" phone | `the_pitch` | o1 concept, narrator as the too-friendly salesman, real phone-store photo: "Great news: your phone company wants to hand you a brand new eleven hundred dollar phone, today, for free, and all you have to do is sign right here." → turn: "So let me ask you something. When was the last time your phone company gave you anything for free?" → stakes number → ending: Dave walks out of that same store paying $X less, shown. |
| 64 friends | `be_honest` | o1 concept: a second-person scene from this week — "Last weekend somebody said 'let's just split it evenly', and you smiled, and you paid for a lobster you didn't eat." → concept line: your friends are (lovingly) the most expensive thing in your life → stakes number → ending: "…and you're about to learn the one sentence Dave used to fix it, without losing a single friend" + flash of the last scene. |
| 65 rewards points | `absurd_true_fact` | Frame 0: real airliner photo. o1 concept: "One of the biggest airlines on Earth now earns more money from the points on your credit card than from actually flying you anywhere" (VERIFY exactly which airline/year and phrase it truthfully) → "and you're the one paying for those points" → stakes number → ending shown. |

Overlap episodes to read before writing (don't repeat their facts/analogies; a callback is fine): **61** → ep32 (raise), ep59 (work until 70). **62** → ep36 (store tricks), ep47. **63** → ep26 (Apple), ep10 (BNPL), ep23 (car loans), ep28 (subscriptions). **64** → ep31, ep38, ep24, ep50, ep57. **65** → ep02 (credit cards), ep11 (airlines), ep25 (Starbucks), ep12.

Thumbnails: still made by the LEAD. In your report give 3 concepts + `thumb_question`.

---

### (older brief, still valid where v4 is silent)

You build ONE complete episode of the YouTube channel "Dave Explains Money": script, choreography, props, thumbnails and SEO, matching the approved LOOK exactly and the new v3 STORY rules exactly. The owner said: "I don't want any mistakes."

### OWNER-APPROVED TOPICS ep61–75 (approved 1 Oct 2026 — do NOT ask again, do NOT change)
| # | Title |
|---|---|
| 61 | Why Staying Loyal to Your Job Keeps You Poorer |
| 62 | Why Prices End in .99 (And Why It Still Works on You) — owner LOVES this one |
| 63 | Why Your "Free" Phone Costs $1,100 |
| 64 | Why Your Friends Are Making You Broke |
| 65 | Why Your Rewards Points Are Making You Poorer |
| 66 | Why Free Shipping Makes You Spend More |
| 67 | Why Everyone Online Looks Richer Than You |
| 68 | Why Your Company Hides What Your Coworker Earns |
| 69 | Why Your Phone Gets Slow Right When the New One Comes Out |
| 70 | Why Restaurant Menus Trick You Into Spending More |
| 71 | Why Loyal Customers Pay the Most |
| 72 | Why "Limited Time Offer" Is Almost Never Limited |
| 73 | Why Your Gift Cards End Up Worth Nothing |
| 74 | Why Name Brands Cost Double for the Same Product |
| 75 | Why Your "Money-Saving" Memberships Cost More Than They Save |

### Read first (mandatory, in this order)
1. `LONG.md [INDEX]` — **§0 (Retention & CTR v3) and §1c (title rule) first**, then the whole file. §0 overrides older rules where they conflict.
2. Code templates (LOOK, cast, props, SFX, code patterns only — NOT script structure): `src/episodes/Ep50.tsx` (most mature), `Ep49.tsx`, `Ep29.tsx`. Copy their patterns: `G2`, `scene()`, `A()`, `w()`, `q()`, `P()`, `bump()`, `lt()`, chapter whoosh loop, SubReminder + subCues, end SubButton/Bell.
3. Props: `src/props.tsx` … `src/props8.tsx` and later `src/propsNN.tsx` files (grep `export const` to find what exists before drawing a new prop).
4. Thumbnail kit: `src/v2/kit.tsx` and examples `src/v2/t49.tsx`, `src/v2/t50.tsx` (tech only — v3 concepts in PLAYBOOK §0.6 replace their "floating head left / object right" layout).
5. The episodes listed as "overlap" for your topic (below / in your task): do NOT repeat their facts, analogies or angle. A callback ("remember our Starbucks video?") is fine.

### WARNING about the old ep51–60 drafts
The old `pipeline/episodes/ep51–60.json` drafts contain claims that could NOT be verified and look invented (e.g. in ep60: "NY fined DraftKings $75,000 in Dec 2024 for limiting", "$3.2B promo spend", "38% of men 21–34", "helpline calls up 35%"). Treat every number/fact in those drafts as UNVERIFIED: keep it only if you find the primary source yourself; otherwise drop it.

### Thumbnails: the LEAD makes them (Oct 2026)
Do NOT write src/v2/tNN.tsx and do not run thumbs.yml. In your final report give 3 thumbnail concepts (different §0.6 types) + `thumb_question`. Put `thumb_question` in seo_epNN.json and leave `thumb` as "A".

### Holding objects (owner bug, Oct 2026)
NEVER use `handItem`. Use `hold={{item: <Prop s={0.35} />, side: 'r'}}` with pose `present`, `talk` or `point_r` (or `point_l` + `side: 'l'`). validate.py blocks `handItem`.

### Background keep-out zones
`<Interior />` has a $ picture at x 220–440, y 190–360 and a window at x 1390–1690, y 170–430. Never put labels/props there (ep60 had labels on the $ picture in 8 scenes). The Damage Meter sits top-right; keep that corner free too.

### QA honesty
A QA report is only OK if it contains the line `epNN: 0 flagged beats out of N` AND full.jpg shows real frames. `QA CRASHED`, a missing flagged-beats line, or a tiny/blank full.jpg = runtime error in your code: fix it. If you cannot view full.jpg, SAY SO in your report — never claim a check passed that you didn't see.

### Lead review
The cloud QA now also uploads `full.jpg` (one frame of every beat). Look at it yourself before reporting: overlapping props, text cut off at the frame edge, characters covering numbers, mirrored text, tiny unreadable text, two scenes that look identical — fix them. The lead reviews full.jpg before any render.

### Save progress early
Sessions can be cut off. Commit + push your JSON as soon as the script is written, and push again after each milestone (tsx compiles, QA pass, thumbs, SEO), so a restarted builder can continue from git.

### The v3 story rules (summary — details in PLAYBOOK §0)
- Title = a people problem (§1c). Use the approved title you were given (you may suggest alts in SEO).
- Fill `"spine"` in the episode JSON FIRST (goal, stakes, central_question, loop_big, loop_mid, villain, low_point, win).
- ONE Dave story joined by BUT / SO / THEREFORE. Every chapter opens with Dave doing something and ends with a cliffhanger line. Chapter titles = curiosity phrases ≤ 5 words. Outro chapter = "What Dave Learned".
- Hook: see the v4 addendum above (concept / stakes / ending, assigned hook_form, real photo at frame 0). The old flash-forward + freeze/rewind hook is retired.
- Damage Meter HUD (label must contain the word DAMAGE), pause-and-guess at ~30 % paid ~60 s later, re-hook every 60–90 s, villain reveal + SubReminder at ~50 %, low point ~75 %, Dave fights back (education, not advice), big payoff in the last minute, 3-line recap ≤ 15 s, next episode teased as Dave's next problem, subscribe joke.
- Banned phrases: "Today:", "In this video", "Let's start with", "Next,", "Here are three more", "Another reason is", "So let's recap", "That's it", "In conclusion", "Before we wrap up", "Let's talk about".
- Length (v4): ~1,600–1,750 spoken words → 10:15–11:30. Must be ≥ 605 s.

### Hard rules (unchanged — breaking one = the episode fails)
- **SFX names MUST exist** (render fails otherwise): pop, pop2, whoosh, whoosh_s, thud, stamp, coin, cash, click, key, key2, ding, chime, boing, buzz, quack, poof, scribble, marker, paper, flip, crinkle, clank, dream, sting, heart, rip, trombone, cricket, sputter, mail, crowd, tick, step, flutter, draw. List every SFX your EpNN.tsx uses and check each before committing.
- **Dave is the main character** (`acc={['hair']} seed={7}`). Cast from PLAYBOOK §2.
- Beginner level, short sentences, a silly concrete analogy per chapter, numbers spelled out as words for TTS ("twenty twenty six", "one point four billion").
- Every number from a current official/primary source (web search, it is October 2026). Sources in JSON `sources` + `<SourceTag>` on screen. Balanced on politics. "Education, not advice" in the practical chapter.
- **NO EMPTY SCENES**: everything that belongs to a scene is on screen within its first ~10 frames; narration only EMPHASISES (highlight, grow, colour, shake, tick, count-up, "?" flipping to the number). Bars start at a visible baseline. 3-part layout (character + main object + label/number) filling the frame.
- No emoji in SVG text. No real logos (text names are fine). Never put the owner's email anywhere.
- `w(beat, word, nth)` only with words really spoken in that beat (lowercased, punctuation stripped).

### NOTHING runs on the owner's PC except editing text + `npx tsc` (disk is full)
No local TTS, no local renders, no local stills, no qa_empty.py locally. Everything heavy runs on GitHub Actions:
```
GH=/c/Users/hp/AppData/Local/ghcli/bin/gh.exe ; R=hamlou/moneyworks
```
- **Commit/push your own paths only** (other builders push in parallel):
  `git add <your paths> && git -c user.name=Hamza -c user.email=noreply@users.noreply.github.com commit -m "epNN: <what>" -- <your paths>`
  then `for i in 1 2 3 4 5 6; do git pull --rebase --autostash -q && git push -q && break; sleep $((RANDOM%10+5)); done`.
  If `.git/index.lock` exists, wait a few seconds and retry. Never `git add -A`, never commit other files, never force-push.
- **Voice timings (cloud):** push the JSON, then `$GH workflow run tts.yml -R $R -f ep=epNN`; find the run id with `$GH run list -R $R -w tts.yml -L 10` (match the title "tts epNN"); `$GH run watch <id> -R $R --exit-status` (or poll `$GH run view <id> -R $R`); then `$GH run download <id> -R $R -n epNN-timings -D public/epNN` → `public/epNN/timings.json` + `report.txt` (has `total` seconds). public/ is git-ignored (fine: render/QA regenerate it in the cloud).
- **Validate:** `py pipeline/validate.py epNN` (reads local timings + tsx, tiny) must print OK — includes the v3 checks for ep ≥ 51.
- **Typecheck:** `npx tsc --noEmit -p .` must be clean (the `check` workflow also runs on every push).
- **QA (cloud):** `$GH workflow run qa.yml -R $R -f ep=epNN` → download `-n epNN-qa -D ../qa_dl/epNN` → read report.txt + sheet.jpg. Fix every FLAG, push, repeat until `0 flagged`. Delete `../qa_dl/epNN` afterwards.
- **Thumbnails (cloud):** write `src/v2/tNN.tsx` exporting `V2EpNN` (auto-registered). Push, then `$GH workflow run thumbs.yml -R $R -f ep=epNN -f prev="<4 previous ep ids>"` → download `-n epNN-thumbs -D ../videos/epNN/v2` → look at `thumb_v2_A/B/C.png`, `phone168.png` (phone test) and `grid_A/B/C.png` (grid test). A, B and C must be 3 DIFFERENT concepts from §0.6. Redo until all 5 thumbnail tests in §0.6 pass. Put the winning-guess variant in SEO `thumb`.
- The network is flaky: wrap every gh/git network call in a retry loop.
- Do NOT trigger `render.yml` — the lead renders after reviewing.

### Files YOU may create/edit (only these)
- `pipeline/episodes/epNN.json` (with `spine`)
- `src/episodes/EpNN.tsx` exporting `EpNN`
- `src/propsNN.tsx` (new props; never edit other props files)
- `src/v2/tNN.tsx` exporting `V2EpNN`
- `pipeline/seo_epNN.json`: title, alts [2], thumb_text (the <= 3 words on thumbnail A; run `py pipeline/package_lint.py epNN`, must print OK), line1 (≤150 chars), summary, learn [6], tags [11, last = "dave explains money"], hashtags [3], pinned (easy-to-answer question), thumb ("A"/"B"/"C"), thumb_question, next (null)
- `../videos/epNN/v2/*` (downloaded thumbnails, small PNGs only — never download videos)
Do NOT edit: Episode.tsx, Root.tsx, v2/index.tsx, kit.tsx, seo.py, fx.tsx, other props, PLAYBOOK, other episodes, workflows.

### Workflow
research (overlap episodes first) → `spine` → JSON script (v3) → self-check banned phrases + BUT/SO/THEREFORE → push JSON → cloud TTS → duration ≥ 500 s (else extend, repeat) → EpNN.tsx (+ propsNN) → validate OK → tsc clean → push → cloud QA until 0 flagged → tNN.tsx → cloud thumbs until tests pass → seo_epNN.json → push → final report.

### Final report (keep it short)
Files, duration, QA result (0 flagged), validate OK, tsc clean, SFX list checked, the 3 thumbnail concepts + their thumb_question, the §0.7 pre-flight checklist with ✓, and any concerns.

---

## [INDEX] — was PLAYBOOK.md

## MONEYWORKS PLAYBOOK — index

> **★ v7 STANDARD (owner, 29 Oct 2026) — `LONG.md [3D]` §0 is THE rule set for EVERY new video (long-form and Shorts) and wins over everything in this file.** Natural connected speech (no commas AND no fragment chains like "12 years. Day one. Math class."), Blender 3D Dave in a red oversized hoodie + wide black pants with costume swaps per scene role, objects from the words of each line, ≥ 50 % real 3D, something new every 1.5–2.5 s, dense SFX (counter roll ticks etc.), hook = the priority (50 %+ of viewers leave in 5–10 s), built with the mandatory LOOP METHOD (§0.10: 3 gates, looped arc hook→rising→conflict→comeback→payoff, hook as a question, mini-loops per chapter, Shorts swipe-through ≥ 80 %, next Short only when < ~5k views/h for 24 h). Retired: memes, polaroids, photo-every-10–15 s, photos+memes every 2–4 s in Shorts, captions, 2D Dave for new videos, asking the owner to record their voice. Template: `pipeline/episodes/test1.json` + `blender/test1.py` + `src/v6/Test1.tsx`. **NO THUMBNAILS (owner 30 Oct 2026: "don't do thumbnails anymore, disable that") — never design, render or propose thumbnails or run thumbs.yml; old thumbnail rules are retired.** **No memes ever; real images only when needed; every video designs + generates its OWN sound effects timed to its moments (LONG.md [3D] §0.12).** **Monetization-safe assets only: `LONG.md [LICENSES]`** (no `public/sfx/pack`, no other creators' clips/music, no cloned voices, credit footer on every upload).

The playbook is split in two. Read the one for the format you are building and do not mix their rules.

**NEWEST (23 Oct 2026): long-form style = `LONG.md [3D]` (v6). It overrides `LONG.md [PLAYBOOK]` and `LONG.md [UPGRADE]` wherever they conflict.**

| You are building | Read | Format |
|---|---|---|
| **ANY new video (long or Short)** | **`LONG.md [3D]` §0 (v7) FIRST** | Blender 3D Dave (red hoodie, costumes), natural speech, objects from the words, dense SFX, hook first. Template `test1` |
| A long-form episode (`epNN`) | then `LONG.md [PLAYBOOK]` for what §0 does not cover (research, titles, SEO, thumbnails) | 1920×1080, 10 min+ (the photo/meme cadence rows there are retired) |
| An upgrade of an existing long episode | **`LONG.md [UPGRADE]`** | edit `pipeline/episodes/epNN.json` only (old episodes keep their 2D look) |
| A vertical Short (`shortNN`) | then `SHORTS.md [PLAYBOOK]` for loop/upload/analytics | 1080×1920, 50–90 s, same v7 kit (photos+memes every 2–4 s are retired) |

Every "PLAYBOOK §x" reference in code, validator messages and briefs points to the same section number in `LONG.md [PLAYBOOK]`. The Shorts rules that used to live in §0.9, §0.10 D and the "Episode 56 visual QA correction" are now in `SHORTS.md [PLAYBOOK]`.

[OLD episodes only — memes RETIRED 29 Oct 2026, real images only when needed (LONG.md [3D] §0.12)] Rules for BOTH formats (owner, 11 Oct 2026): no commas in the spoken script (flowing sentences with connectors), real photos mixed with the drawings, trend meme formats recreated with our cast (never downloaded meme images).

**Added 27 Oct 2026 (Shorts, from the Isa / Nile Blue case study):** `SHORTS.md [PLAYBOOK]` §10 = three ideation gates (relatable, completion compulsion, open loop), the looped arc (hook → rising → conflict → comeback → payoff), hook-as-question, upload checklist and the post-publish analytics routine (swipe-through ≥ 80%, judge at 48 h, next upload when views/hour < ~5k for 24 h). The owner rules in §2–§9 win on any conflict.


**Added 27 Oct 2026 (Long-form, from the Isa / Nile Blue case study):** `LONG.md [PLAYBOOK]` §12 = three ideation gates (relatable, completion compulsion, open loop), the looped arc mapped to the §0.2 story spine (hook → rising → villain reveal → low point → comeback → payoff), hook-as-question, upload checklist and the post-publish analytics routine (CTR ≥ 5–8 %, average view duration ≥ 50 %, judge at 48 h). The owner rules in §0–§11 win on any conflict.

---

## [POSTMORTEM] — was POSTMORTEM.md

## LONG.md [POSTMORTEM] — every public video on @DaveExplainsMoney (pulled 8 Nov 2026)

Data source: `yt-dlp --skip-download` metadata + YouTube auto-captions (word timings) + public comments, for all 23 public uploads (4 Shorts, 19 long). Raw data: `C:\Users\hp\AppData\Local\Temp\claude\98b4d7d11e80f5b9\01390d92-eac1-49a1-94c7-50bd8a7323c5\scratchpad\pm\rows.json`.

**Honesty note.** Public data has views/likes/comments only. No impressions, no CTR, no swipe-away %, no retention curve, no traffic sources. Every "why" below that talks about viewers leaving or the feed stopping is **inferred** from hook text, length, pacing, title and engagement ratios. The Studio numbers needed to confirm are listed in the last section.

Channel: 39 subs. Views/day = views ÷ days since upload (older videos are slightly favoured; Shorts get most views in the first 72 h, so for Shorts it is a rough proxy only). wps = spoken words per second from caption timings. Comments = total (own replies) — most comments are the channel replying to itself.

### 1. All videos

#### Shorts (vertical)

| # | Date | Title | Len | Views | Likes | Like % | Comments (own) | Views/day | wps |
|---|---|---|---|---|---|---|---|---|---|
| S1 | 10 Oct | Why Betting Apps Give You $1,000 Free (Then Ban You If You Win) | 90 s | 228 | 2 | 0.9 | 0 | 7.9 | 2.07 |
| S2 | 11 Oct | You Co-Signed to Be Nice. Now the Whole Loan Is Yours #animation #investing #reversemortgage #money | 97 s | 31 | 1 | 3.2 | 0 | 1.1 | 2.16 |
| S3 | 14 Oct | If They're So Rich, Why Are They Selling You a Course? | 91 s | 122 | 1 | 0.8 | 0 | 4.9 | 3.43 |
| S4 | 4 Nov | What Happens If Abdul El-Sayed Becomes President? (The Reality Check) | **51 s** | **1,891** | **28** | 1.5 | 7 (4) | **472.8** | **4.14** |

#### Long videos (16:9)

| # | Date | Title | Len | Views | Likes | Like % | Comments (own) | Views/day | wps |
|---|---|---|---|---|---|---|---|---|---|
| L1 | 26 Sep | How Banks Create Money Out of Nothing (And It's Legal) | 8:53 | 43 | 4 | 9.3 | 2 (0) | 1.0 | 2.24 |
| L2 | 26 Sep | How Credit Cards Make Money Even If You Pay in Full | 8:17 | 80 | 4 | 5.0 | 0 | 1.9 | 2.36 |
| L3 | 28 Sep | Why a $300,000 House Costs You $720,000 | 8:28 | 12 | 2 | 16.7 | 0 | 0.3 | 2.25 |
| L4 | 29 Sep | How McDonald's Really Makes Money (It's Not Burgers) | 8:19 | 2 | 1 | 50 | 0 | **0.1** | 2.22 |
| L5 | 30 Sep | Where Your Tax Money Actually Goes (Most People Guess Wrong) | 8:38 | 42 | 2 | 4.8 | 0 | 1.1 | 2.07 |
| L6 | 1 Oct | Who Does America Owe $40 Trillion To? (It's Not China) | 8:18 | 59 | 1 | 1.7 | 2 (1) | 1.6 | 2.22 |
| L7 | 2 Oct | Why Your $100 Buys Half of What It Did (Inflation Explained) | 8:31 | 10 | 2 | 20 | 0 | 0.3 | 2.17 |
| L8 | 3 Oct | Why Is Gold So Expensive? (It's Just a Yellow Rock) | 8:50 | 14 | 2 | 14.3 | 0 | 0.4 | 2.26 |
| L9 | 4 Oct | How the Stock Market Actually Works (Explained With Lemonade) | 8:37 | 168 | 4 | 2.4 | 5 (3) | 4.8 | 2.25 |
| L10 | 5 Oct | The Hidden Cost of "Buy Now, Pay Later" | 8:50 | 63 | 2 | 3.2 | 1 (1) | 1.9 | 2.31 |
| L11 | 8 Oct | Why Betting Apps Give You $1,000 Free (Then Ban You If You Win) | 8:39 | 135 | 3 | 2.2 | 0 | 4.4 | 2.24 |
| L12 | 11 Oct | Why Your Friend's Car Loan Is Now YOUR Debt | 10:10 | 585 | 5 | 0.9 | 1 (1) | 20.9 | 2.37 |
| L13 | 14 Oct | You Won't Be Able to Afford Gas for Your Car After 2027. | 10:10 | **899** | 1 | **0.1** | 5 (3) | **36.0** | 2.22 |
| L14 | 16 Oct | In 5 Years You Won't Own Anything. Here's Proof. | 9:49 | 27 | 2 | 7.4 | 0 | 1.2 | 2.22 |
| L15 | 19 Oct | Your Future Self Is Begging You to Watch This Video | 6:31 | 45 | 2 | 4.4 | 0 | 2.2 | 3.65 |
| L16 | 22 Oct | Your Credit Card Is Charging You More Than You Think | 8:12 | 600 | 2 | 0.3 | 5 (3) | 35.3 | 3.59 |
| L17 | 25 Oct | What If You Stopped Being Loyal to Your Boss? | 8:51 | 175 | 3 | 1.7 | 1 (1) | 12.5 | 3.50 |
| L18 | 28 Oct | You Still Work 9-5 ? You NEED to Watch This. | 7:22 | 4 | 0 | 0 | 0 | 0.4 | 3.29 |
| L19 | 1 Nov | Abdul El-Sayed Becomes US President: What Happens? (ea1) | 6:56 | 27 | 1 | 3.7 | 3 (2) | 3.9 | 2.97 |

**Top 3 (views/day):** S4 Abdul Short 472.8 · L13 Gas 36.0 · L16 Credit-card points 35.3 (L12 car loan 20.9 is 4th).
**Bottom 3:** L4 McDonald's 0.1 (2 views) · L3 $300k house 0.3 · L7 Inflation $100 0.3 (L8 Gold and L18 "9-5" tie at 0.4; L18 is the worst *recent* upload: 4 views in 11 days).
**Shorts vs each other:** S4 is 60× S1, 97× S3, 430× S2 on views/day. Ranking: S4 ≫ S1 > S3 > S2.

**The headline the owner needs:** the Abdul Short did NOT fail. It is the best video the channel has ever made by an order of magnitude — 1,891 views in 4 days, 28 likes (more than all 19 long videos have combined: 45), and the only video with 3 real outside commenters arguing about the topic. It "failed" only against a viral expectation. What it did not do is convert: subs are still 39, because the audience was politics viewers, not money viewers.

### 2. Per video — WHY IT FAILED / GOOD POINTS TO KEEP

#### Shorts

**S4 — Abdul El-Sayed Short (best ever)**
- Hook (0–3 s): real crowd/clip audio chanting "Abdul El-Sayed. Dr. Abdul El-Sayed. Abdul El-Sayed. Mohammed Abdul." then "$33 million got spent to stop one man from winning one election, and he still won it by less than one point."
- WHY IT FAILED (to go viral):
  - Off-niche politics with a name few people outside Michigan know: the feed found a politics pocket, not a mass audience. Views came from the name, not from Dave. Zero sub conversion.
  - The question "So, what would happen if Abdul El-Sayed became the president" only lands at 13 s — after a 3-s name chant and a stat. Your own rule says question by 10 s.
  - Muddled payoff: it promises "you will know exactly who would fight the hardest to stop him", then answers "Not one single person. It is the hundreds of millions of dollars and the 60 votes…" — that is not a who, it dodges its own promise.
  - Audio ends mid-sentence at 50.7 of 51 s: "Because a president is a pen, and Congress is the" — "paper" is cut. Either a render cut or an accidental loop (see good points). If a viewer notices it as a cut, it looks broken.
  - Self-replies under every comment ("I Know Right!", "That's VERY true!", "Yeah..That's from where the money came actually.") read as bot-like and add nothing.
- GOOD POINTS TO KEEP:
  - Shortest Short (51 s) and the fastest speech (4.14 wps) → nothing to swipe on.
  - Opening uses **real voices / real footage that are not Dave** — the only Short whose frame 0 sounds different from every other faceless explainer. Pattern interrupt.
  - A real, named, in-the-news person + a shocking real number ($33 million) in the first sentence.
  - A big "what if" premise in the title that a viewer can argue with → real comments ("That would be amazing if he become the president..", "Obscene amount of money spent on trying to block him…").
  - Accidental seamless loop: "…Congress is the" → restarts on "Abdul El-Sayed." No subscribe/outro to swipe on. Likely boosted replays (inferred; check avg % viewed > 100 %).
  - Best metadata of all Shorts: 17 specific tags, description links the long video.

**S1 — Betting apps Short (2nd)**
- Hook: "Dave just won $640. The app's response, banned." — the best written hook on the channel: prize + consequence in 2 s.
- WHY IT FAILED: 90 s is too long for the story; 2.07 wps is slow TTS pace for a Short (half of S4). No question anywhere in the script. Middle is a math lecture ("to unlock even 100 of that, he had to bet it 25 times over… cost him 140 just to unlock") — likely where swipes happen (inferred). Ending = two exit CTAs back to back: "Full stories on the channel. Follow for part two." — kills the loop and promises a part two that does not exist. Title copied from the long video (Short titles should be shorter and more shocking).
- GOOD POINTS TO KEEP: prize-at-frame-0 hook; villain contrast ("Bob, down three grand, gets a text from his VIP host"); one hard stat ("half a percent of customers make 70% of a sports book's money"); responsible-gambling line; good tags.

**S3 — "Selling you a course" Short (3rd)**
- Hook: "It's 2 in the morning and Dave is one tap away from paying $9,997 to a man he met on a webinar." — 20 words before the hook lands; scene-setting first, shock second.
- WHY IT FAILED: run-on "and… and… so…" sentences at 3.43 wps (37 words in the first 10 s) — dense to follow. 91 s. The payoff is withheld: "But his first $2,000 is still gone and how he fights to win it back is in the full video linked right below, so tap it now." The Short is a trailer, not a resolved story → viewer feels cheated, no loop. Fake-guru topic is crowded on Shorts.
- GOOD POINTS TO KEEP: the title is the best question-title on the channel (a contradiction the viewer can't unhear). The "one question the guru hates" device. Visual comic metaphors ("the sword costs money and the armor costs money and you never reach the castle"). Real FTC/MOBE proof.

**S2 — Co-signer Short (worst)**
- Hook: "Dave's phone rings. A debt collector about a car he's never driven." — good mystery, but slow (2.16 wps) and no money number until ~10 s.
- WHY IT FAILED: 97 s, the longest Short. Low-stakes for the Shorts audience (co-signing is a niche adult problem; young Shorts viewers don't co-sign). Title is a statement, not a question, and is stuffed with irrelevant hashtags "#investing #reversemortgage" — wrong topic signal to the algorithm. Ends "Subscribe. It's the only paper we'll ever ask you to sign." — outro = swipe point. Same opening as the long L12 uploaded the same day, so the two competed.
- GOOD POINTS TO KEEP: fully resolved story with a usable rule ("could I pay this whole loan alone?"); nice callback (the paper "had predicted everything"); strong tags; highest Short like rate (3.2 %, but n=1).

#### Long videos

**L13 — Gas after 2027 (top long)** — Hook: "Dave just filled up his car, $67 for one tank." FAILED: 1 like on 899 views (0.1 %) + 10:10 length → probably shown widely on a news topic but watched briefly (inferred); title promises a future claim ("after 2027") the video doesn't prove; gas question arrives at 13.5 s. KEEP: timely news hook (2026 record gas, Hormuz), a pain every viewer feels at the pump, real comment debate ("We are being bamboozled").
**L16 — Credit card points (2nd long)** — Hook: "So, it starts at the airport. I'm dragging my suitcase past a little booth and the man shouts, 'Sir, would you like a free flight?'" FAILED: starts with filler "So, it starts…"; 0.3 % like rate (2/600) → weak hold (inferred). KEEP: "Your … is charging you" title (you + loss), first-person story, question by 5 s (fastest on the channel), a real number in the description ($6 billion).
**L12 — Friend's car loan (3rd long)** — Hook: "Dave's phone rings. A debt collector about a car Dave has never driven." FAILED: 10 min for a one-idea topic; 0.9 % like rate. KEEP: "Now YOUR Debt" title (personal threat, caps on one word), rewind structure ("Rewind 6 months").
**L17 — Loyal to your boss** — Hook: "This is me at my 5-year work anniversary… 2%… the new guy… $9,000 more than me." FAILED: tags are generic finance spam ("passive income 2026", "make money online") unrelated to the topic. KEEP: concrete injustice in 10 s, universal job pain, 12.5/day.
**L9 — Stock market with lemonade** — Hook: "Here's something that makes no sense. A company can lose money year after year and still be worth billions." FAILED: "Here's something" throat-clear; textbook topic. KEEP: best of the Sept series; only one with a genuine fan comment ("That dave guy makes everything simple.").
**L11 — Betting apps long** — Hook: "Last year, Americans lost almost $17 billion to betting apps." FAILED: description opens "IMPORTANT : Betting is bad! do not gamble!" (looks amateur; wastes the search snippet); no tags. KEEP: stat-first hook, strong title.
**L19 — Abdul long (ea1)** — Hook: same name chant. FAILED: off-niche politics, unknown name for the long-form browse audience; per owner's own verdict, boring after the hook (text cards, unrelated 3D); title weaker than the Short's. KEEP: the intro (a real viewer: "I liked the intro tho").
**L2 — Credit cards pay in full** — Hook: "Dave has a credit card, and Dave is perfect." FAILED: no tags, explainer title, slow 2.36 wps over 8 min. KEEP: counter-intuitive premise (you pay even if you pay in full).
**L10 — BNPL** — Hook: "Dave wants new sneakers. $200." FAILED: ends "tell us in the comments what we should explain next" (series finale on a 30-sub channel). KEEP: relatable purchase moment.
**L15 — "Future self is begging"** — Hook: "This is me last Friday walking into a Las Vegas casino with $500." FAILED: title says nothing about casinos — pure vague clickbait; description in all caps "GAMBLING IS BAD AND FOR LOSERS". KEEP: first-person stakes + "Spoiler, by the end of this video…" promise.
**L6 — America owes $40T** — Hook: "America owes $40 trillion." FAILED: macro topic, no personal stake. KEEP: myth-bust title "(It's Not China)", number-per-person ("$117,000 for every single person… including babies").
**L1 — Banks create money** — Hook: "$10,000 just appeared out of nothing." FAILED: first upload, no tags, abstract topic. KEEP: magic-trick hook, "This is not a conspiracy" line.
**L5 — Tax money** — Hook: "Dave just got his paycheck. He worked hard for $4,000." FAILED: civics topic, slow. KEEP: "Most People Guess Wrong" challenge.
**L14 — Won't own anything** — Hook: "Dave opened his bank statement and counted 11 subscriptions." FAILED: title ("won't own anything… proof") mismatches a subscriptions video → clickers leave. KEEP: the hook itself is relatable and concrete.
**L8 — Gold** — Hook: "This is a rock. You can't eat it." FAILED: evergreen textbook, 8:50, 5th daily upload in a row. KEEP: the object-first visual hook.
**L7 — Inflation $100** — Hook: "Dave is cleaning his closet and in an old jacket, he finds something amazing." FAILED: "something amazing" = vague tease; topic covered by every finance channel. KEEP: the found-$100 story device.
**L3 — $300k house** — Hook: "Dave just bought a house. He borrowed $300,000." FAILED: young audience doesn't own houses; title number is strong but topic is saturated. KEEP: title number contrast ($300k → $720k).
**L18 — "You Still Work 9-5 ?"** — Hook: "This is me on my 70th birthday at work wearing a name tag…" FAILED: generic bait title ("You NEED to Watch This"), stray space before "?", 20 generic tags; content is about retirement at 70 which the title never says. Worst recent result. KEEP: the 70th-birthday image is a great hook — it just needed the title "I'll Work Until 70. My Dad Retired at 62."
**L4 — McDonald's (worst)** — Hook: "McDonald's sells burgers, billions of them. Everyone knows that." FAILED: opens with what everyone knows; the known "McDonald's is a real-estate company" fact is all over YouTube; no tags. KEEP: the 10× number contrast (1.4 billion vs 14 billion).

### 3. PATTERNS — best vs worst

| Best performers (S4, L13, L16, L12, L17) | Worst performers (L4, L3, L7, L8, L18, S2) |
|---|---|
| Timely/real-world trigger: a named person in the news, record 2026 gas prices | Evergreen textbook topics ("How X works", "Why is X") already covered by big channels |
| Title = personal threat or loss to *you* ("Your Credit Card Is Charging You…", "Now YOUR Debt") or a what-if about a real name | Title = explainer label or vague bait ("You NEED to Watch This", "Your Future Self Is Begging") |
| Hook = concrete scene + number in first sentence ($33 million, $67 tank, $9,000 more) | Hook opens on common knowledge or a vague tease ("Everyone knows that", "something amazing") |
| S4: 51 s, 4.1 wps, no outro, loops | Shorts at 90–97 s, ~2.1 wps, ending in "Subscribe"/"Follow for part two"/"tap it now" |
| Real outside voices/footage at frame 0 (S4) | Same TTS narrator from frame 0 |

Other patterns:
- **Shorts beat long videos per upload.** 4 Shorts → 2,272 views; 19 long → 2,990 views. Median Short 175 views vs median long 45.
- **Like rate falls as views rise** (L13 0.1 %, L16 0.3 %, L12 0.9 %). The few-view videos have 10–50 % like rates = the owner's own circle. High-view long videos are reaching strangers who don't stay (inferred) → long videos are too long/slow for cold viewers.
- **Speech speed:** all Dave-narrated videos before 19 Oct run 2.1–2.4 wps (≈130 wpm, sleepy). First-person videos after 19 Oct run 3.3–3.7 wps and got 2 of the 3 best long results. The fastest Short (4.1 wps) won.
- **Format churn:** Dave-3rd-person → first-person "I" → politics within 5 weeks; Shorts posted only 4 times, with a 3-week gap between S3 and S4. The algorithm can't learn the channel.
- **Metadata:** first 10 long uploads had zero tags; descriptions with all-caps disclaimers; S2 title stuffed with wrong hashtags; L17 with irrelevant "passive income" tags. Not the main cause, but free to fix.
- **Comments:** 17 of 30 comments are the channel replying to itself with "I know right"/"Subscribe so you don't miss". Inflates nothing useful and looks automated.

### 4. RULES FOR THE NEXT SHORT

- MUST be 45–60 s. NEVER exceed 60 s (every Short over 89 s did ≤ 8 views/day; the 51 s one did 473).
- MUST open frame 0 on a real, named, current thing (person, company, app, price) plus one shocking dollar number in the first sentence.
- MUST tie that current hook to the viewer's own money (the Abdul Short got views but 0 subs because it stayed politics). Example: "$33 million to stop one man — here's what his plan would do to YOUR paycheck."
- MUST make frame 0 sound different from a TTS narrator: a crowd chant, phone ring, cash-register hit — then Dave. Make it with our own SFX/voices (LONG.md [LICENSES] bans other creators' clips; the S4 clip audio is a monetization/claim risk, so copy the effect, not the source).
- MUST put the question on screen and in voice by 6 s (S4 asked at 13 s, S1 never asked).
- MUST speak at ≥ 3.5 words/s; NEVER let a Short sit at the 2.1 wps long-form pace.
- MUST answer the exact promise of the hook with a concrete who/what/number. NEVER answer "who" with "not one single person".
- MUST end on a half-sentence that completes with the first words of the hook (deliberate version of S4's accidental "Congress is the…" loop).
- NEVER end with "Subscribe", "Follow for part two", "Full stories on the channel" or "tap it now". Put the long-video link in Related Video + pinned comment only.
- NEVER withhold the payoff for the long video (S3's "his first $2,000 is still gone… tap it now").
- MUST write a Short-specific title ≤ 60 chars as a what-if or a contradiction question; NEVER reuse the long video's title (S1) and NEVER put hashtags of other topics in it (S2 "#reversemortgage").
- MUST pick topics a 18–30-year-old has this month (betting apps, gas, a viral name, rent, a paycheck), NEVER textbook topics (gold, inflation, mortgage, McDonald's).
- MUST post Shorts on a steady schedule (≥ 3/week) in ONE format for 3 weeks before judging; NEVER switch voice/style after one upload.
- NEVER reply to comments with "I know right!"/"Subscribe so you don't miss"; reply only with a real answer or a question back.
- NEVER upload a Short and its long version on the same day with the same opening (S2 + L12).

### 5. Studio numbers the owner must paste to confirm (inferred causes above)

For **each of the 4 Shorts** (YouTube Studio → video → Analytics → Overview/Engagement):
1. **Viewed vs swiped away %** (Shorts feed) — confirms whether the hook works (target ≥ 70 % viewed).
2. **Average percentage viewed** and **average view duration** — confirms length/pacing and whether S4 looped (> 100 % = replays).
3. **Retention graph** — the second where the line drops hardest (screenshot or the timestamp).
4. **Views by traffic source** (Shorts feed / YouTube search / browse / external / channel pages) — for S4 especially: was it the feed or people searching "Abdul El-Sayed"?
5. **Views over time, first 72 h** (hourly) — shows when the feed stopped testing it.
6. **Subscribers gained** and **"Related video" clicks** (if shown).

For **each long video**, especially L13, L16, L12 and L19:
7. **Impressions** and **impressions click-through rate (CTR)**.
8. **Average view duration**, **average % viewed**, and the **% still watching at 0:30**.
9. **Traffic source split** (browse / suggested / search) — confirms whether the 600–900 views came from browse/suggested strangers who left early.

Paste them as one line per video: `ID | swiped-away % | avg % viewed | avg duration | top traffic source | subs gained`.


### S4 Abdul Short — REAL Studio analytics (owner screenshots, 8 Nov 2026) → analytics/done/S4-abdul-short_2026-11-08
Numbers: 1.1k engaged views · 1k unique viewers · 8.9 h watch time · avg view 0:28 of 0:51 · **viewed 62.8 % / swiped 37.2 %** ·
+1 sub · 99.6 % new viewers · audience 82 % male, **65+ = 28.8 %**, 13–17 = 17.4 %, 35–64 ≈ 43 % · US 45 %, CA 7 %, UK 4.5 % · mobile 79 % ·
views flat after ~day 1.5 (the feed stopped pushing once swipe-rate data came in).
Retention curve (read from the graph, 0 % = bottom, 100 % line): starts **above 100 %** (re-watches) → **0:05–0:12 falls to ~70 %** →
slow to ~56 % at 0:22 → **0:22–0:27 falls to ~41 %** → ~32 % at 0:35 → ~25 % at the end.

WHY IT FAILED (with the second):
- **0:05–0:12 = the biggest loss (~40 points).** After the name chant the viewer hears a stat ("33 million… less than one point") and has to wait
  until 0:12 for the actual question. → The question MUST be said by 3 s.
- **0:22–0:27 = second loss (~15 points).** "Stick around because by the end of this you will know…" + "But today we are making him president" —
  pure filler / promise talk with nothing new. → NEVER talk about the video itself ("stick around", "by the end", "today we are").
- 37 % swiped: 62.8 % viewed is below the ~70–80 % of Shorts the feed keeps pushing → pushing stopped after ~36 h.
- Audience skewed old (65+ is the biggest group) and male → politics viewers, not our money audience → +1 sub only.

GOOD POINTS TO KEEP:
- **The first 4 seconds held > 100 %** (people re-watched the start): a famous name shouted + crowd energy + the "WHAT IF HE BECAME PRESIDENT?"
  text on frame 0 works. Keep a loud, instantly recognisable opening (made with OUR own sounds — never reuse real clip audio).
- "What if <famous person/event>" brought 60× more viewers than our explainer Shorts.
- 0:12–0:22 (the president-day-one story) held almost flat (~70 → 56 %): a concrete scene ("day one he picks up the pen…") keeps people.
- Ending mid-sentence probably made some re-watch (loop) — keep a real loop, but make it a complete, deliberate loop line.

---

## [LICENSES] — was LICENSES.md

## LONG.md [LICENSES] — what we may put in a MONETIZED video (owner, 29 Oct 2026: "make sure we won't get any trouble in the monetization later")

Rule: **every sound, voice, model, texture, motion and font in a video must be on the ✅ list below.** Anything else is banned until its licence is checked and added here. Read with `LONG.md [3D]` §0.

### ✅ Allowed (commercial use OK)
| What | Where in the repo | Licence | What we must do |
|---|---|---|---|
| Music "Fluffing a Duck" — Kevin MacLeod | `public/music/bgm.mp3` | CC-BY 4.0 | **Credit in every description** (already added by `pipeline/describe.py` / `seo.py`): `Music: "Fluffing a Duck" Kevin MacLeod (incompetech.com) — Licensed under Creative Commons: By Attribution 4.0 — http://creativecommons.org/licenses/by/4.0/`. If a false Content ID claim appears, dispute it citing CC-BY. |
| Base SFX `public/sfx/*.wav` (boing, boom, cash, whoosh, …) | built by `pipeline/sfx_build.py` from Kenney audio packs (`impactPunch_*`, `confirmation_*`, `bookFlip*`, `card-*` …) | CC0 (Kenney.nl) | nothing (credit optional) |
| Synthesised SFX (`count_roll`, `swish`, `chalk`, `pageflip`, `pop_hi`, `snap_white`, `thump_low`, `slide`, `riser_up`) | `pipeline/sfx_synth.py` | made by us | nothing |
| Voice — Chatterbox (Resemble AI) built-in voice | `voice.yml`, `pipeline/tts_cb.py` | MIT | never use a reference clip of a real person (§ Voice rules below) |
| Voice candidates — Chatterbox-Turbo (MIT), Dia 1.6B (Apache 2.0), Kokoro (Apache 2.0) | `pipeline/voicebake2/` | MIT / Apache 2.0 | same voice rules |
| 3D models, HDRI skies, textures — Poly Haven | `blender/fetch.py` | CC0 | nothing |
| Motion capture — CMU Graphics Lab (BVH by B. Hahne) | `blender/fetch_mocap.py` | free for any use incl. commercial | courtesy line in the description: `Motion data: mocap.cs.cmu.edu (CMU Graphics Lab)` |
| Fonts Anton, Fredoka | `public/fonts/` | SIL Open Font License | nothing |
| Font Inter (300/400/600/700, via @fontsource/inter 5.0.18) | `public/fonts/inter-*.woff2` | SIL Open Font License | nothing |
| Photos from Poly Haven HDRIs (tonemapped JPG crops, e.g. `public/phone96/wall.jpg` = rogland_clear_night) | `public/<id>/` | CC0 | nothing |
| Blender, Remotion, ffmpeg | tools | GPL / Remotion free licence for individuals & companies ≤ 3 people / LGPL | renders are ours |
| Photos | `pipeline/photo_find.py`, `photos.py` | only free licences already enforced there (credit + licence lines in the description) | keep the existing credit lines |

### ⛔ Banned in monetized videos (until proven otherwise)
- `public/sfx/pack/*` — the 11 sounds imported from the owner's Google Drive: **source licence unknown**. Not used by any v7 video. Owner must say where they came from (site + licence) before we use them again.
- Any music other than the line above (no trending songs, no game/film soundtracks, nothing "found on YouTube").
- Clips, frames, sounds or UI of the reference creator or any other creator/film/game/TV (the reference uses Pixar/LEGO clips under fair use — we never do).
- Higgsfield (or any AI generator) output made on a **free/trial plan** — free plans usually do not grant commercial rights; only use it after checking the plan's terms and noting them here.
- ElevenLabs free tier (non-commercial).
- Visible brand logos/ads (e.g. a billboard inside an HDRI sky, a product logo on a model): rotate the sky or swap the model so no brand reads on screen.

### Voice rules (no trouble with likeness or AI policies)
1. Only the engines' own built-in synthetic voices. **Never clone a real person** (no reference clip of a creator, celebrity, politician or anyone without written consent).
2. **Real people (e.g. a politician) are never given a synthetic voice and never "quoted" with words they did not say.** Dave (our cartoon) talks ABOUT them; their real quotes are shown as text with the source.
3. Cartoon 3D animation does not need YouTube's "altered or synthetic content" label; tick it anyway if a video ever shows realistic-looking people or events that did not happen.
4. YouTube monetization: AI narration is allowed when the video is original and adds value (our scripts + our animation). Never upload mass-produced or repetitive near-duplicates.

### Description footer (add to every upload)
```
Music: "Fluffing a Duck" Kevin MacLeod (incompetech.com) — CC BY 4.0 — http://creativecommons.org/licenses/by/4.0/
3D assets: Poly Haven (CC0). Sound effects: Kenney (CC0) + original. Motion data: mocap.cs.cmu.edu (CMU Graphics Lab).
Narration: synthetic voice (Chatterbox, MIT licence). Education only, not financial advice.
```
