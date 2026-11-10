# SHORTS.md — EVERYTHING for vertical Shorts (9:16)

> Owner, 10 Nov 2026: one .md for Shorts + one for long, accumulated WITHOUT missing anything. Every old file is below VERBATIM
> as a tagged part (only its headings moved one level down and file names changed to the new part tags).
> Read a part with grep/line ranges (low tokens). A reference like `[MUST] §2` = section §2 inside that part of this file.
> Old bare `PLAYBOOK §x` (no suffix) = LONG.md [PLAYBOOK] §x, except inside SHORTS.md [PLAYBOOK] where bare `§x` = that part.
> Shared parts ([3D], [POSTMORTEM], [LICENSES]) exist in BOTH files with the same text: when you edit one, edit the other too.

> Order to work: [MUST] fully → [FORMATS] (pick the untested format, new idea, competition check) → the rest by grep when a step needs it.
> Long-form rules are in LONG.md — never mix them (owner, 11 Oct 2026).

## Parts (priority order: on a conflict the HIGHER part wins)
| tag | was | what |
|---|---|---|
| [MUST] | SHORTS_MUST.md | Hard owner rules for every Short (highest priority) |
| [FORMATS] | FORMAT_TESTS.md | Format variety test: scoreboard, notes per Short, queue |
| [VIRAL] | VIRAL_SHORTS.md | No-swipe research + hook science + sources |
| [PLAYBOOK] | PLAYBOOK_SHORTS.md | Shorts playbook (older base rules; MUST/3D win on conflict) |
| [3D] | STYLE_3D.md | v6/v7 3D style standard (shared with LONG.md, same text) |
| [POSTMORTEM] | POSTMORTEM.md | Every public video: why it failed, what to keep (shared) |
| [LICENSES] | LICENSES.md | Monetization-safe assets (shared) |
| [FARM] | FARM.md | CANCELLED Higgsfield farm — kept for Abdul diagnosis + hook knowledge |

---

## [MUST] — was SHORTS_MUST.md

## SHORTS.md [MUST] — OBLIGATORY. READ ALL OF IT BEFORE TOUCHING ANY SHORT. NO EXCEPTIONS.

> Owner, 8 Nov 2026: "THE USER SHOULDN'T SWIPE THE SHORT. ANY BORING MOMENT, BAD CUT OR ANNOYING MOMENT MUST BE CUT."
> Agents in the past ignored the .md files. This file is not advice. Every line is a hard requirement.
> If a rule blocks you, STOP and ask the owner. Never "skip it this once".
> Evidence: SHORTS.md [POSTMORTEM] (our 23 videos, what failed + what to keep) and SHORTS.md [VIRAL] (research + sources).

> Ops: before rendering, read `pipeline/ops/LOG.md` + open `autopilot` GitHub issues (supervisor, AUTOPILOT.md §7).

### 0. Before writing — you MUST
1. READ `analytics/LOG.md` and process any new screenshots in `analytics/inbox/` (rules: `analytics/README.md`).
2. READ `SHORTS.md [POSTMORTEM]` §Patterns and the "GOOD POINTS TO KEEP" of the best Short (S4 Abdul, 1,891 views = our best video ever).
3. The hook MUST start with **"What if…"** (owner 8 Nov: this is the format that worked; facts-first is "boring").
4. Topic MUST ride a name/event people already care about THIS WEEK + a money/"your life" angle. Never a textbook explainer.
5. READ `SHORTS.md [FORMATS]`: next Short = an UNTESTED format from its queue (owner 10 Nov: test every type until one wins). Fill its notes after 48 h.

### 1. Script — MUST / NEVER
- MUST: the first spoken word lands at ≤ 0.2 s. Frame 0 already shows the prize (big text + moving image). No fade, no logo, no black.
- MUST: the "What if…" question is fully said by 3 s, and readable on mute (3–6 word on-screen text).
- MUST: 25–40 s total, ~4 words/second. Every Short we made over 89 s died (≤ 8 views/day).
- MUST: write the LAST line first; it must flow back into the first line (loop). Last frame ≈ first frame.
- MUST: deliver exactly what the hook promises. S4 promised "who would fight hardest" and dodged it — never again.
- MUST: chain beats with "but / so / because", never "and then". 5th-grade words. No commas in spoken lines. Numbers spoken as words.
- NEVER: talk about the video itself — "stick around", "by the end of this", "today we are…", "let's see" [S4 lost 15 % of viewers in 5 s on exactly this, 0:22–0:27].
- MUST: no stat/setup before the question — the "What if" question comes FIRST [S4 lost 40 % between 0:05 and 0:12 waiting for it].
- KEEP: a loud recognisable opening (name/crowd/hit sound) + the question as big text on frame 0 [S4 held > 100 % in the first 4 s].
- TARGET: ≥ 70 % "viewed" (S4 = 62.8 % → feed stopped pushing after ~36 h).
- NEVER: "hey guys", intro, "follow for part 2", "subscribe", "tap it now", outro, CTA at the end. (Every Short with an end-CTA flopped.)
- NEVER: a sentence cut mid-word (S4 ended on "Congress is the…" with "paper" missing).
- MUST: frame 0 = disruptive image AND open question together, decided in 2 s. MUST pass the shareability gate ("would someone send this to a friend?"). [SHORTS.md [VIRAL] §5]
- NEVER: unrelated hashtags in the title (#investing #reversemortgage on a co-sign Short).

### 2. Edit — MUST / NEVER (the swipe killers)
- MUST: new image every 1–2 s. NEVER a static frame > 1.5 s.
- MUST: cut every silence > 0.3 s (one planned beat before the punchline is allowed).
- MUST: a pattern interrupt every 5–7 s (zoom punch, cut to a new set, sound hit, colour flash).
- MUST: music 15–20 % of voice level, drops out before punchlines. Dense SFX on every visual hit.
- MUST: our own sounds/visuals only (SHORTS.md [LICENSES]). S4 opened on real crowd-chant audio — recreate the EFFECT, never reuse the source.
- NEVER: repeat a fact already said, slow zooms on nothing, text that stays after its line ended, a blurry/unreadable card.

### 3. Ship — MUST
- Title = the "What if…?" question, ≤ 60 chars, + #shorts. Education category, 8–15 real tags.
- Run the measure step (PySceneDetect cut rate + silence check) — longest shot ≤ 1.5 s in the first 3 s, ≤ 2.5 s after.
- After 48 h: log views, "viewed vs swiped away" %, avg % viewed in `pipeline/ctr_log.md` and add a WHY/KEEP entry to SHORTS.md [POSTMORTEM].

### 4. The template (fill it, don't improvise)
| t | what |
|---|---|
| 0.0–3.0 s | "What if …?" + the prize on screen (number / famous name) |
| 3–8 s | the twist that makes it real ("Because he just did.") |
| 8–25 s | 3–4 beats, each = one new image + one surprising TRUE fact, each ends with "but/so" |
| 25–35 s | the payoff the hook promised, punch line after a 0.3 s beat |
| last 2 s | a line that flows straight back into the first line (loop) — no CTA |

### 5. Owner feedback on ea2s (9 Nov 2026) — OBLIGATORY
- NEVER cut a word or phrase before it ends. Silence cutting keeps ≥ 0.12 s after every word end and ≥ 0.05 s before every word start
  [ea2s: "most of the words got cut off before they finish"]. Listen-check the last syllable of every line.
- EVERY image MUST show exactly what is being said at that second (word-anchored). If the line names a person, show that person
  (free-licence photo: Wikimedia Commons public domain / CC BY with credit, or official .gov photo). Never a generic scene under a specific claim.
- Dave ALWAYS wears the red hoodie in Shorts. No outfit changes.
- Dave's movement must be clean: no floating, no limbs through the body, no camera angle that makes him look like he flies.
- Dave poses allowed in Shorts: talk, point, shrug, worried ONLY. think/shock/cheer/laugh put a hand into the head or body → BANNED
  [usa30 v2, owner 9 Nov: "wrong hand position… always doing that"].
- FX icons never bigger than the country they sit on (≤ 70 % of its on-screen size) and they hit ON the spoken word (`py tools/mapshort.py sync <id>` = 0 frames off).
- The video must never end before the voice: build stops if audio > video (usa30 v2 lost its last line to a stale timing cache).

---

## [FORMATS] — was FORMAT_TESTS.md

## SHORTS.md [FORMATS] — find the format the algorithm loves (OBLIGATORY before every new Short)

> Owner, 10 Nov 2026: "don't cancel the variety of the types of videos… test every type till we find the one the algorithm loves…
> take every note for the next video."
> The Higgsfield FARM is cancelled (money). The VARIETY TEST is NOT. It runs on our usual free pipeline (Remotion + Blender Dave + GitHub Actions).

### Rules
1. Every new Short = a format NOT yet tested (pick from §3 queue), unless a format won (§4) → then repeat the winner with a new topic.
2. Change ONE big axis per test (format). Keep the control: SHORTS.md [MUST] rules ("What if" hook, 25–40 s, no CTA, loop, promise kept).
   A later wave tests the hook axis itself (§3 wave 2).
3. Before writing: read §2 notes of the last 3 Shorts. Carry every KEEP forward, never repeat a FIX.
4. After posting: owner sends Studio screenshots at 48 h → `analytics/inbox/` → fill §1 row + §2 notes + analytics/LOG.md.
5. Winner = ≥ 70 % viewed vs swiped AND views above the best so far. Kill = < 50 % viewed → never that format again.
6. Owner approves the topic before building (owner 10 Nov: "i have to approve the topic first").
7. EVERY Short = a NEW idea (never a topic we already did) — also after a winner is found (same format, new idea).
8. Competition check before the pitch: search YouTube Shorts for the idea (WebSearch "site:youtube.com/shorts <idea>").
   If a competitor already did the same idea → change the angle or the format until ours is different. Use their TECHNIQUES, never their idea
   (owner: "the idea should never be stolen… unique but very very attaching"). Write in the pitch: "checked: <what exists> → our twist: <why ours is new>".
9. Each test also studies ONE new competitor that wins in that format (what hook, cut speed, length) → notes in §2 under "learned from".

### 1. Scoreboard
| # | Short | Format | Topic axis | Len | Posted | Views 48 h | Viewed % | Avg % viewed | Shares | Subs | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1–S3 | betting / co-sign / course | 3D Dave explainer, 90 s | money explainer | 90 s | Oct | 228 / 31 / 122 total | ? | ? | ? | ? | DEAD (too long, facts first) |
| S4 | Abdul El-Sayed president | 3D Dave + photos, "What if" politics name | news name | 51 s | 4 Nov | 1,891 total | 62.8 % | 55 % | ? | +1 | best so far; wrong crowd (65+) |
| ea2s | What If He Runs For President? | 3D Dave scenes | news name | ? | ? | ? | ? | ? | ? | ? | need screenshots |
| usa30 | What If The USA Disappeared For 30 Days? | animated MAP Short | world what-if | ~35 s | ~9 Nov | ~1.3k | ? | ? | ? | ? | need screenshots |
| sal1 | What If Everyone Could See Your Salary? | SCENE story Short (2D Remotion, street + props, word-anchored cues) | social/money "your life", true study | 34.8 s | 10 Nov | — | — | — | — | — | pending 48 h (12 Nov) |

### 2. Notes per Short (KEEP / FIX for next video)
#### sal1 (10 Nov) — scene story
- Built with `tools/salshort.py` + `src/v6/SalShort.tsx` (composition `Sal-<id>`). Spec = `pipeline/scenes/<id>.json`. Reusable for any scene Short.
- KEEP: frame 0 = question text + impossible image (salary over every head); question done by 1.9 s; 13 scenes, new image every 2–3 s;
  51 SFX + 25 animations on the exact word; music per scene, cut before punchline; loop last frame = frame 0; real study as proof.
- KEEP: topic passes shareability gate ("send to a friend who is nosy about salaries"); universal (no niche name) → should reach 18–34.
- FIX / watch: no Dave lip-sync close-up (Dave small in corner); some scenes 2.5–3 s (SHORTS.md [MUST] wants 1–2 s new image);
  4 QA rounds needed (tag sizes, overlaps) → start next scene Short with bigger text + safe zones from v4.
- Check at 48 h: drop at 0:05 (Norway map) vs 0:15 (happiness gauges = the "science" part, risk of boring).
#### usa30 (~9 Nov) — map Short
- 1.3k views < S4 1.9k. Diagnosis missing → need Studio retention graph + viewed %.
#### S4 Abdul — see SHORTS.md [FARM] §1 + analytics/LOG.md (stat before question −40 %, meta talk −15 %, dodged promise, 65+ audience).

### 3. Queue (untested formats, our free pipeline) — pick the next one, owner approves the topic
Wave 1 (one format each, "What if" hook kept as control):
| id | format | how (our tools) | example angle (money / your life) |
|---|---|---|---|
| F5 | POV text-story ("POV: you…") with chat/phone screens | SalShort phone scenes | POV: your boss accidentally sends the salary sheet to the group chat |
| F6 | Countdown / ranking ("3… 2… 1…") | SalShort cards + counter | what $100 buys in 5 countries, cheapest last |
| F7 | This vs That split screen (same person, two choices) | 2 street halves, 2 Daves | same salary, two lives after 10 years |
| F8 | Time-lapse life (one person ages fast, money counter runs) | SalShort counter + Dave 3D | what if you saved $5 a day from age 18 |
| F9 | Dave 3D close-up talking head + big props (character focus) | Blender Dave (v7) | what if your phone showed what every app costs you a year |
| F10 | History POV ("you are in 1923 Germany…") | maps + scene props | what if your bread cost a wheelbarrow of cash (hyperinflation) |
| F11 | Receipt / bill breakdown that keeps printing | SalShort prop | what if your coffee receipt showed the real cost |
| F12 | Quiz ("guess the price before Dave says it") | cards + timer | guess what this costs in 1980 vs now |
Wave 2: top 2 formats × hook variants ("What if" vs "POV" vs a shocking number on frame 0).
Wave 3: winner × 4 new topics (incl. this week's trend) → becomes the channel's main format.

### 4. Winner
(none yet)

---

## [VIRAL] — was VIRAL_SHORTS.md

## SHORTS.md [VIRAL] — no-swipe playbook for Dave money Shorts

Researched 2026-11-08. Source tiers: **[YT]** = YouTube official / YouTube staff. **[PRO]** = creator/strategist with real data (Galloway, Hoyos, vidIQ). **[VND]** = tool-vendor blog (directional only, numbers self-reported, no peer review). Where only [VND] numbers exist, treat them as starting targets, then verify on our own Studio data.

**Owner-rule conflicts (owner rules in CLAUDE.md / SHORTS.md [3D] §0 WIN until owner decides):** (a) rule 13 burned captions — owner RETIRED captions 29 Oct 2026; research says faceless Shorts benefit, so propose as A/B test only. (b) rule 22 cadence — owner rule = next Short only when views/h <~5k for 24 h; that rule stays, 4-7/week is the ceiling when nothing is spiking. (c) No memes, no thumbnails stay in force.

Key fact first: YouTube publishes **no official benchmark** for "viewed vs swiped away". Community targets: <50% viewed = dead, 60-70% = ok, 70-80% = working, 80%+ = strong. Judge every Short vs our own previous Shorts, same 48 h window. ([creatorlanehq](https://creatorlanehq.com/blog/youtube-shorts-viewed-vs-swiped-away), [YT Shorts analytics help](https://support.google.com/youtube/answer/12942217), [reelrise](https://reelrise.app/guide/viewed-vs-swiped-away-the-only-youtube-shorts-metric-that-matters/))

---

### 1) Hard rules (MUST / NEVER)

1. **MUST put the prize on frame 0.** Viewer decides in ~1 s; first frame = our "thumbnail" in feed. Why: viewed-vs-swiped is the Shorts CTR and is decided before audio lands. [PRO] [Galloway 3.3B views: view rate = pillar #2](https://videogen.io/blog/decoding-the-youtube-shorts-algorithm-a-deep-dive-into-3-3-billion-views)
2. **MUST make the hook work on mute.** Big on-screen text promise + clear visual, readable in <1 s. Why: Hoyos rule — hook <3 s, visually clear, understandable without sound; 70-85% of mobile viewing starts muted. [PRO] [Hoyos interview summary](https://leaderonomics.com/videos/box-of-chocolates/how-to-make-great-youtube-shorts-lessons-from-jenny-hoyos), [VND] [bytecap silent viewing](https://www.bytecap.io/blog/science-of-silent-viewing-short-form-video-retention)
3. **MUST foreshadow the payoff in the first 3 s** ("by the end you'll see why your raise makes you poorer"). Why: Hoyos calls foreshadowing the most underrated hook element — it buys the next 30 s. [PRO] [vidIQ: How Jenny Hoyos makes viral Shorts](https://rosetta.to/u/vidiq/how-jenny-hoyos-actually-makes-viral-shorts)
4. **MUST write the last line first, then the hook, then the middle.** Why: Hoyos workflow (hook + last line + foreshadow before anything else); also the only way to build a clean loop. [PRO] [Hoyos notes](https://knowt.com/note/e40546ff-6565-4b65-acd6-6d3d2717dabe/Meet-the-YouTuber-Who-Solved-Shorts-Jen)
5. **MUST chain beats with "but / so", never "and then".** Why: every beat opens a new conflict → no natural exit point. [PRO] [Hoyos](https://chaindesk.ai/tools/youtube-summarizer/meet-the-you-tuber-who-solved-shorts-jenny-hoyos-interview-As7abwNhG7Y)
6. **MUST script at 5th-grade reading level.** One idea per sentence, no jargon unless defined in the same line. Why: Hoyos standard; money jargon = instant swipe. [PRO] [Hoyos](https://chaindesk.ai/tools/youtube-summarizer/meet-the-you-tuber-who-solved-shorts-jenny-hoyos-interview-As7abwNhG7Y)
7. **MUST target 30-45 s for explainers; cut to 20-30 s when the idea fits.** Length is not favored by the algorithm — satisfaction is. Why: YouTube's Todd Sherman: recommendations are "independent of duration"; Rene Ritchie: "as short as it can be, but no shorter". [YT] [creatorhandbook / YouTube explains Shorts algo](https://www.creatorhandbook.net/youtube-explains-how-the-youtube-shorts-algorithm-works/), [routenote](https://routenote.com/blog/youtube-shorts-algorithm/)
8. **NEVER pad to 60 s+ just because Shorts can be 3 min.** Why: longer only wins if % viewed stays high; Galloway's 50-60 s winners were high-AVD story content, not padded explainers. 3-min limit since 2024-10-15. [YT] [9to5google](https://9to5google.com/2024/10/03/youtube-shorts-3-minutes/), [PRO] [Galloway](https://videogen.io/blog/decoding-the-youtube-shorts-algorithm-a-deep-dive-into-3-3-billion-views)
9. **MUST loop: last spoken line flows grammatically into the first line, last frame ≈ first frame.** Why: since 2025-03-31 every replay counts as a view; loops push "% viewed" >100%; Jake Fellman went 1M→20M after switching to loops. [YT] [view count change](https://9to5google.com/?p=666545), [PRO] [vidIQ looping](https://vidiq.com/blog/post/double-youtube-watch-time-looping-shorts/)
10. **MUST judge on ENGAGED views, not views.** Why: "views" now counts any start/replay; engaged views (watched past first seconds) = old metric, used for YPP. [YT] [Tubefilter](https://www.tubefilter.com/?p=185419), [Entrepreneur](https://www.entrepreneur.com/business-news/youtube-shorts-will-see-more-view-counts-earnings/489190)
11. **MUST change the image every 1-2 s (hard cut, zoom punch, prop pop, camera move); NEVER hold a static frame >1.5 s.** Why: high performers avg 1 cut / 2-4 s; top Shorts rarely hold one shot >3 s; for a cartoon host we need faster since there is no human face to hold attention. [VND] [videogen/Galloway summary](https://videogen.io/blog/decoding-the-youtube-shorts-algorithm-a-deep-dive-into-3-3-billion-views), [zebracat](https://www.zebracat.ai/post/how-viral-youtube-shorts)
12. **MUST add a pattern interrupt every 5-7 s** (scene change, Dave costume swap, SFX hit, music switch, number slam). Why: resets attention before the typical drop-off points. [VND] [videogen](https://videogen.io/blog/decoding-the-youtube-shorts-algorithm-a-deep-dive-into-3-3-billion-views)
13. **MUST burn in word-level animated captions (1-3 words/page, current word highlighted), centered in safe zone (above bottom 20%, below top 15%).** Faceless = no lip-read, so captions ARE the face. Why: 80% of viral-tier short clips carry burned captions, 78.6% animated (OpusClip 12.2M clips); muted-start viewing is the norm. [VND] [clipspeed/Opus data](https://clipspeed.ai/blog/ai-captions-increase-views.html), [blitzcut](https://blitzcutai.com/blog/animated-captions-vs-static-captions)
14. **NEVER show logo, channel intro, "hey guys", "in this video", or "subscribe" in the first 10 s.** Why: every non-promise second before the payoff is a swipe window; Shorts feed has no intro grace period. [PRO] [Hoyos: hook <3 s](https://leaderonomics.com/videos/box-of-chocolates/how-to-make-great-youtube-shorts-lessons-from-jenny-hoyos)
15. **MUST cut every silence >0.3 s in VO (except one deliberate beat before punchline).** Why: AI-voice pauses read as robotic dead air; tool: auto-editor `--margin 0.08s`. [VND] [fluxnote faceless retention](https://fluxnote.io/guides/faceless-shorts-retention-tips-2026)
16. **MUST keep music under VO: ~15-20% of VO loudness (≈ -14 to -18 dB below), music off 0.3-0.5 s before punchlines.** Why: vendor test — music at 15-20% of VO +5-8% retention, >30% hurts 3-5%. Matches our per-scene music rule. [VND] [fluxnote music](https://fluxnote.io/guides/faceless-shorts-music-selection-guide-2026), [dev.to](https://dev.to/getkoro_app/how-to-add-music-to-youtube-shorts-2026-strategy-guide-2i1l)
17. **MUST stay human-made: original script, Dave character, real research, varied scenes; NEVER template-spam near-identical Shorts.** Why: since 2025-07-15 YPP "inauthentic content" (ex-repetitious) demonetizes mass-produced/repetitive AI content; synthetic voice alone is OK if the work is original. [YT-policy] [Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660), [The Week](https://www.theweek.in/news/sci-tech/2025/07/10/youtube-rolls-out-new-rules-to-curb-ai-content-who-is-affected-and-who-is-safe.html)
18. **MUST tick "altered or synthetic content" only when a realistic person/event is faked;** a cartoon Dave does not need it, a realistic fake news clip / real-politician voice does. Why: YouTube disclosure rule; wrong use = label + trust loss, missing it = strike risk. [YT] [The Week](https://www.theweek.in/news/sci-tech/2025/07/10/youtube-rolls-out-new-rules-to-curb-ai-content-who-is-affected-and-who-is-safe.html)
19. **MUST write the Short title as a searchable promise, keyword in first 40 chars** ("Why Your Raise Makes You Poorer"), 0-3 hashtags max. Why: Shorts rank in YouTube + Google search; title = main metadata; hashtags minor. [VND/PRO] [vidIQ Shorts titles](https://vidiq.com/blog/post/youtube-shorts-titles), [seosherpa](https://seosherpa.com/youtube-shorts-seo/)
20. **MUST stay in-niche: one channel = one viewer promise (money that school never taught).** Why: Galloway pillar #1 = niche specificity; off-niche spikes get views but no subs (ea1 lesson). [PRO] [Galloway](https://videogen.io/blog/decoding-the-youtube-shorts-algorithm-a-deep-dive-into-3-3-billion-views), [subscribr](https://subscribr.ai/youtube-strategy/youtube-shorts-content-strategy-ideas)
21. **Ride news ONLY through the wallet angle:** "Election result → what happens to YOUR rent / grocery bill / mortgage rate". Name the event in the title, never the politician in the hook frame; publish within 24 h (ideally <6 h). Why: trend traffic + on-niche promise = subs that stick; politics framing = off-niche flop (ea1: 18 views). [VND] [subscribr trendjacking](https://subscribr.ai/youtube-strategy/youtube-shorts-content-strategy-ideas), [fluxnote news shorts](https://fluxnote.io/guides/youtube-news-shorts-strategy-2026)
22. **MUST post consistently 4-7 Shorts/week while <1k subs, then 3-5/week; never binge-then-vanish.** Why: vidIQ 5.08M-channel study — 12+ uploads/month grew views ~8x faster; consistency > bursts. [PRO] [vidIQ frequency study](https://vidiq.com/blog/post/How-Often-Post-on-Youtube), [AIR](https://air.io/youtube-hacks/how-often-should-you-post-shorts-to-grow-faster)
23. **MUST test one variable at a time** (hook line OR first frame OR length), compare % viewed + engaged views at 48 h vs our own median. NEVER re-upload near-identical copies. Why: no universal benchmark; duplicates trigger inauthentic flags. [VND] [creatorlanehq](https://creatorlanehq.com/blog/youtube-shorts-viewed-vs-swiped-away)
24. **NEVER end with "thanks for watching" / outro card / fade to black.** Why: kills the loop and gives an exit point; the end must hand back into frame 0. [PRO] [vidIQ looping](https://vidiq.com/blog/post/double-youtube-watch-time-looping-shorts/)

---

### 2) Second-by-second blueprint — 30-45 s money Short

Target pace: AI VO ~2.6-3.0 words/s (≈160-180 wpm), total 85-120 words. New image every 1-2 s. SFX on every cut/number.

| Time | Job | Picture | Audio | Text on screen |
|---|---|---|---|---|
| **0.0-1.0 s** | STOP THE THUMB. Prize/conflict visible on frame 0 (no fade-in, no black frame). | Dave mid-action already (not standing still) holding/facing the payoff object: the burning paycheck, the $1,000,000 jar half-empty, the price tag exploding. Camera already moving (push-in). | First word lands at ≤0.2 s. Hit SFX on frame 0. Music already playing (no build-up). | 3-6 word promise, huge, center: "YOUR RAISE MAKES YOU POORER" |
| **1-3 s** | Make it personal + specific + foreshadow. | Cut #2 at ~1.2 s: close-up of number/receipt. Cut #3 at ~2.3 s: Dave reaction. | "You got a 5% raise, but you're actually losing money — and at the end I'll show you the one number that proves it." | Number pops: "+5% raise → -$1,200" |
| **3-10 s** | Open the loop: the "but". Name the villain (inflation, tax bracket, lifestyle creep). Question must be fully asked by 10 s. | 4-6 images. Literal props from the spoken line (rule: props from script). One big camera move (lamp zoom / chair spin). | Music mood set. Counter-tick SFX on rising numbers. | Captions word-by-word; one keyword per line in accent color. |
| **10-25 s** (middle) | 2-3 mini-loops: problem → "so" → twist → "but" → worse problem. Each mini-payoff opens next question. Pattern interrupt every 5-7 s. | Scene/costume change at each loop (Dave = detective, then cashier, etc.). Never >1.5 s static. On-screen math built step by step, not shown all at once. | Music switches at each scene mood. Remove all VO gaps >0.3 s. | Max 1 stat card, 2 s, animated (no text walls). |
| **25-(end-3) s** | Main payoff: the one number / the fix the hook promised. | Biggest visual of the video (reveal shot). | 0.3-0.5 s silence → punchline → hit. | Payoff number huge, 1.5 s. |
| **Last 3 s** | LOOP HANDOFF. Last sentence is unfinished and completes with the first line. | Last frame matches/visually rhymes frame 0 (same prop, same framing) so restart is invisible. | Music does not resolve/fade; same SFX as frame 0. | Example end line: "...and that's exactly why" → loops into "YOUR RAISE MAKES YOU POORER". |

Hook templates that fit Dave (pick one, fill with topic):
- **Wrong belief:** "Saving 10% won't make you rich — here's the math nobody showed you."
- **Personal loss:** "You lose $X every year because of ONE habit."
- **Number shock:** "$4 a day = $87,000. Here's how."
- **Systemic secret:** "Rich kids learn THIS at 12. You never did."
- **News wallet (topical):** "[Event] just happened. Here's what it does to YOUR rent."

---

### 3) Swipe-killer checklist (cut on sight before render)

Audio
- [ ] Any VO silence >0.3 s (except the 1 planned beat before punchline)
- [ ] VO starts later than 0.2 s
- [ ] Breaths, clicks, TTS artifacts, mispronounced numbers ("$1.2k" read wrong)
- [ ] Music louder than ~20% of VO, or music fade-in/fade-out
- [ ] Music that resolves/ends before the loop point
- [ ] Same SFX repeated identically 3+ times in a row

Picture
- [ ] Black frame, fade-in, or title card at frame 0
- [ ] Logo / channel sting / "subscribe" animation anywhere in first 10 s
- [ ] Any static frame >1.5 s (no camera move, no element animating)
- [ ] Dave standing idle / T-pose / limb clipping (run clipcheck)
- [ ] Text card >2 s or >8 words on screen at once
- [ ] Captions outside safe zone (covered by Shorts UI: bottom ~20%, right rail, top ~15%)
- [ ] Props that don't match the line being spoken
- [ ] Off-topic 3D B-roll (pretty but unrelated = robotic)

Script
- [ ] "Hey guys", "welcome back", "in this video", "today we're going to"
- [ ] Context before conflict ("Inflation is defined as...") — conflict first
- [ ] Repeated info (saying the same point twice in different words)
- [ ] Payoff revealed before the end (kills the reason to stay)
- [ ] "And then" chains instead of "but / so"
- [ ] Jargon not explained in the same sentence (APR, CPI, bracket creep)
- [ ] Fragment chains / robotic list reading (owner rule: natural connected speech)
- [ ] Outro: "thanks for watching", "follow for more", fade to black
- [ ] Hook needs sound to make sense (mute test fails)
- [ ] Question not fully asked by 10 s
- [ ] Topic needs a politician's name in the hook (reframe to wallet impact)

Final gate (all must pass): mute test, first-frame-as-thumbnail test, loop test (play 3x back to back — restart invisible?), `tools/loopcheck.py`, clipcheck.

---

### 4) Tools (live GitHub stats pulled 2026-11-08)

GHA = runs free on GitHub-hosted ubuntu runner (CPU only, 4 vCPU/16 GB, 6 h job cap; public repo = unlimited minutes, private = 2,000 min/mo free).

| Tool | Use for us | Repo | Stars | License | Free on GHA? |
|---|---|---|---|---|---|
| auto-editor | Cut silences/dead air from VO or final mp4 (`auto-editor vo.wav --margin 0.08s --edit audio:threshold=0.04`) | https://github.com/WyattBlue/auto-editor | 5.8k | Unlicense | YES (pip, ships ffmpeg) |
| silero-vad | Precise speech/silence timestamps → feed to Remotion to trim gaps >0.3 s | https://github.com/snakers4/silero-vad | 10.6k | MIT | YES (tiny CPU model) |
| faster-whisper | Fast word-level timestamps on CPU (int8) for captions | https://github.com/SYSTRAN/faster-whisper | 26.6k | MIT | YES (`small`/`medium` CPU ok for 45 s) |
| whisperX | Best word alignment (wav2vec2 forced alignment) for karaoke captions | https://github.com/m-bain/whisperX | 25.2k | BSD-2 | YES on CPU (slower; ~1-3 min for 45 s) |
| whisper.cpp | Engine behind `@remotion/install-whisper-cpp`; word timestamps without Python | https://github.com/ggml-org/whisper.cpp | 55.0k | MIT | YES (builds in ~1 min) |
| openai/whisper | Reference ASR (slowest on CPU) | https://github.com/openai/whisper | 112k | MIT | YES but slow; prefer faster-whisper |
| whisper-timestamped | Alt word timestamps + confidence | https://github.com/linto-ai/whisper-timestamped | 2.9k | AGPL-3.0 (copyleft) | YES |
| stable-ts | Stabilized timestamps | https://github.com/jianfch/stable-ts | 2.3k | MIT | YES — but ARCHIVED, avoid for new work |
| Remotion + @remotion/captions | `createTikTokStyleCaptions()` → word-highlight pages; `toCaptions()` from whisper.cpp | https://github.com/remotion-dev/remotion · docs https://www.remotion.dev/docs/captions/create-tiktok-style-captions | 71.7k | Remotion License (free for individuals/≤3-person cos) | YES (already our pipeline) |
| template-tiktok | Reference impl of word captions in Remotion | https://github.com/remotion-dev/template-tiktok | 304 | Remotion License | YES |
| PySceneDetect | Measure cut rate (cuts/s, avg shot length) of top Shorts AND of our own render (assert no shot >1.5 s static) | https://github.com/Breakthrough/PySceneDetect | 5.4k | BSD-3 | YES |
| TransNetV2 | Neural shot-boundary detection (better on animated/zoom cuts) | https://github.com/soCzech/TransNetV2 | 1.1k | MIT | YES CPU (slow-ish), unmaintained since 2023 |
| yt-dlp | Download top competitor Shorts for measuring | https://github.com/yt-dlp/yt-dlp | 206k | Unlicense | PARTLY — YouTube often blocks datacenter IPs ("confirm you're not a bot"); run download locally (light) or pass cookies, measure on GHA |
| youtube-transcript-api | Pull transcripts of top Shorts → words/s, hook lines, no video download | https://github.com/jdepoix/youtube-transcript-api | 8.6k | MIT | PARTLY (same IP blocking risk) |
| ffmpeg-normalize | Loudness-normalize final mix (-14 LUFS) and duck check | https://github.com/slhck/ffmpeg-normalize | 1.5k | MIT (NOASSERTION in API) | YES |
| unsilence | Alt silence cutter (speeds up silence instead of cutting) | https://github.com/lagmoellertim/unsilence | 596 | MIT | YES, stale since 2023 |
| jumpcutter | Original silence cutter (historic) | https://github.com/carykh/jumpcutter | 3.1k | MIT | YES, superseded by auto-editor |
| youtube-agent-skill | Claude skills: 21 hook formulas + hook scorer, retention reader (finds drop points from Studio data), "virality engine" | https://github.com/Jakeschincariol/youtube-agent-skill | 5.1k | MIT | N/A (runs in Claude Code) — mine for hook scoring rubric |
| watchvideo | Claude skill: yt-dlp + ffmpeg + Whisper + vision → hook breakdown of any video | https://github.com/charlesdove977/watchvideo | 27 | MIT | Local / GHA possible |
| AI-Youtube-Shorts-Generator | LLM highlight detection + Whisper + 9:16 crop (long→short) | https://github.com/Anil-matcha/AI-Youtube-Shorts-Generator | 5.8k | MIT | YES CPU (needs LLM API key) |
| ViralCutter | Long→viral clips, auto captions | https://github.com/RafaelGodoyEbert/ViralCutter | 445 | GPL-3.0 | Mostly (GPU preferred) |
| MoneyPrinterTurbo | Full auto faceless Short generator — study only; output = "inauthentic content" risk | https://github.com/harry0703/MoneyPrinterTurbo | 141k | MIT | YES, but don't publish its raw output |
| ShortGPT | Automated Shorts framework (stale) | https://github.com/RayVentura/ShortGPT | 8.1k | MIT | YES, unmaintained since 2025-02 |
| TRIBE v2 (Meta) | Predicts brain response to video/audio/text — experimental "engagement" scorer | https://github.com/facebookresearch/tribev2 | 3.3k | custom (check; research/non-commercial) | NO (needs GPU) |
| Virality predictors (ML) | e.g. https://github.com/123angmish/ai-virality-predictor, https://github.com/juanls1/TikTok-Virality-Predictor | <20 | MIT / none | — | Toy projects; no validated Shorts virality predictor exists in open source. Use our own Studio data instead. |

Recommended pipeline (all on GHA, matches weak-PC rule):
1. TTS VO → `silero-vad` / `auto-editor` trims gaps >0.3 s → `ffmpeg-normalize`.
2. `faster-whisper` (or whisper.cpp via `@remotion/install-whisper-cpp`) → word JSON → `createTikTokStyleCaptions({combineTokensWithinMilliseconds: 400-800})`.
3. Render Remotion → `PySceneDetect` on output: fail build if any shot >1.5 s or cuts/s < 0.5; fail if first VO word >0.2 s.
4. Benchmark: locally `yt-dlp` 20 top money Shorts/month → GHA `PySceneDetect` + `faster-whisper` → table of cuts/s, words/s, hook length; set our targets to their median.

---

### 5) Added 10 Nov 2026 — hook science + S4 audience lesson (not covered above)
- **Decision ≈ 2 s on Shorts.** 3-second retention predicts total performance (r = 0.84 over 120 videos). Judge every hook by its first 2 s on mute. [VND] [dev.to hook engineering](https://dev.to/bulkdl/hook-engineering-the-science-of-the-first-3-seconds-in-short-form-video-2026-2jp9)
- **Stack 2 mechanisms on frame 0:** a visually disruptive image AND a curiosity gap TOGETHER gave +47 % retention vs either alone. A strange image with nothing to wonder about, or a question over a plain image, is half a hook. [VND] same source
- **Reward prediction error:** the bigger the gap between what the viewer expects and what they see, the stronger the pull. Best frame 0 = something impossible or wrong shown as if it's normal (Dave calmly paying rent with a rock), not just "big".
- **Dying in 2026:** voiceover over stock footage, "storytime" intros, generic "you won't believe" hooks (completion −40 % YoY). **Winning:** a CHARACTER in an absurd premise played deadpan (AI Yeti vlogger 16M+ views, fake ads 3M/day). Dave is our character, so give him the absurd premise. [VND] [subsub](https://www.subsub.io/blog/how-ai-generated-youtube-shorts-will-change-creators-in-2026), [case study](https://theaiuntangled.substack.com/p/veo3-viral-video-how-to)
- **Shareability gate (S4 lesson):** S4 audience = 28.8 % aged 65+, 0 % 18–24, 99.6 % new, +1 sub. Politics about a name few people know reached people who watch but don't share, so there was no second push. Before writing, ask: "would someone send this to a friend with 'this is you'?" If not, change the angle.
- **Promise kept = replays:** S4 dodged its promise, so viewers felt the ending was empty and didn't replay. The loop only works if the ending pays off.

---

## [PLAYBOOK] — was PLAYBOOK_SHORTS.md

> **⛔ OBLIGATORY: read `SHORTS.md [MUST]` first. Its rules override this file.**

## MONEYWORKS PLAYBOOK — SHORTS (9:16 vertical, under 3 min)

> **★ v7 STANDARD (owner, 29 Oct 2026) — `SHORTS.md [3D]` §0 is THE rule set for EVERY new video (long-form and Shorts) and wins over everything in this file.** Natural connected speech (no commas AND no fragment chains like "12 years. Day one. Math class."), Blender 3D Dave in a red oversized hoodie + wide black pants with costume swaps per scene role, objects from the words of each line, ≥ 50 % real 3D, something new every 1.5–2.5 s, dense SFX (counter roll ticks etc.), hook = the priority (50 %+ of viewers leave in 5–10 s), built with the mandatory LOOP METHOD (§0.10: 3 gates, looped arc hook→rising→conflict→comeback→payoff, hook as a question, mini-loops per chapter, Shorts swipe-through ≥ 80 %, next Short only when < ~5k views/h for 24 h). Retired: memes, polaroids, photo-every-10–15 s, photos+memes every 2–4 s in Shorts, captions, 2D Dave for new videos, asking the owner to record their voice. Template: `pipeline/episodes/test1.json` + `blender/test1.py` + `src/v6/Test1.tsx`. **NO THUMBNAILS (owner 30 Oct 2026: "don't do thumbnails anymore, disable that") — never design, render or propose thumbnails or run thumbs.yml; old thumbnail rules are retired.** **No memes ever; real images only when needed; every video designs + generates its OWN sound effects timed to its moments (SHORTS.md [3D] §0.12).** **Monetization-safe assets only: `SHORTS.md [LICENSES]`** (no `public/sfx/pack`, no other creators' clips/music, no cloned voices, credit footer on every upload).

**This file is ONLY for vertical Shorts (`shortNN`, 1080×1920).** Long-form episodes have their own file: `LONG.md [PLAYBOOK]`. Never apply a long-form rule to a Short (10 min length, 9 chapters, chapter cards, a photo every 10–15 s, a meme every 30 s, pause-and-guess, "What Dave Learned" recap, 3 thumbnails) or a Shorts rule to a long video (owner, 11 Oct 2026: "don't mix between them").

Shared with long-form, and read there when needed (same channel, same world): cast and their looks (`LONG.md [PLAYBOOK]` §2), voice Andrew, research standard and sources (§4), SFX names (§7), prop toolkit (§9), photo kit and licence rules (§0.10 C: `src/photo.tsx`, `pipeline/photo_find.py`, `pipeline/photos.py`, free licences only, real people in factual context only).

### 1. What a Short is

- A **standalone, fully-resolved story** — never a cliffhanger that only makes sense if you click away — but its job is still to drive views to one specific linked long-form `epNN` (see §6, 13 Oct 2026): resolve the loop completely, then end by pointing at the long video. 1080×1920, about 50–95 s, one loop only (one problem → one twist → one fix).
- Files: brief `pipeline/shorts/shortNN.md`, script `pipeline/episodes/shortNN.json`, animation `src/shorts/ShortNN.tsx`, photos `pipeline/photos/shortNN.json`. Reference build: `short52` (§9: brief + `src/shorts/Short52.tsx` + `src/memes52.tsx`).
- Keep from the long episode only the two hardest numbers and the one emotional contrast. Cut everything else.

### 2. Story and hook

Open on a complete, emotionally sharp thought with no intro. The first frame must already be moving and make sense with sound off; the first 0.1 s matters. Use a contradiction, money shock, or consequence—not a greeting or channel bumper. By 3 s the viewer must understand the problem; by 6 s introduce a fresh escalation. Hook promises a specific payoff, and the ending delivers it. Keep the story self-contained; do not say "watch the full video" or rely on prior context. Every 1–2 s in the first 6 s, then every 1–3 s throughout, make a meaningful visual change (new angle, prop, pose, photo, reaction, kinetic text, or meme beat), synced to VO/SFX. Never use a generic slideshow or repeat a scene to fill time.

**Script sound (owner, 11 Oct 2026, same as long-form):** zero commas in the spoken text. Write flowing sentences joined with and / but / so / because ("the bonus is free and also the house is free"), never comma-chopped fragments ("bonus, free, house, free"). No dashes or semicolons as a cheat.

### 3. Retention + mixed-media rules (owner, 10 Oct 2026)

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `SHORTS.md [3D]` §0.12. The rest of this section applies only to OLD episodes.


- **Cast stays present:** in at least 80% of scenes, Dave, Bob, Danny, or another channel character must be visible in the same composition as the real photo—foreground, corner reaction, pointing, holding it, or interacting with its edge. The photo and character should feel like one scene, not alternating unrelated slides. The one exception is frame 0 of the hook: follow the real-photo-first rule (§2), then bring Dave into the next shot.
- **No mismatched images:** map every photo ID to the exact VO beat in the manifest/scene comments. Car repair photo only when discussing the car/tire; signed paperwork only when discussing the written agreement; never use money stock for an unrelated line. If no fitting photo exists, use the animated cast and props instead.
- **Strict no-duplicates:** run a source-level check before render: every `photo('id'` / `src="epNN/id.jpg"` may appear at most once in the video timeline. Do not recycle photos for the hook, mid-video, or CTA. Use separate unique assets, not alternate crops, for separate appearances.
- **Hook 0.0–0.1 s:** frame 0 must contain a moving real image (slam/push-in), an oversized contradiction/stakes caption, and an impact SFX; no fade-in, blank frame, logo, or throat-clearing. Use 4+ distinct visual changes in the first 6 s. The first photo must relate directly to the first spoken sentence.
- **Meme beats:** add 2–4 original, context-specific meme/reaction moments where the story earns them (e.g. Dave facepalming at "next Friday bro"). Prefer original channel characters and custom meme layouts over unrelated recycled internet images. Memes are punchlines, not filler; don't put a meme over a serious factual claim.
- **Every image moves and interacts:** animate entry, gentle camera movement/wobble, and a character pointing/reacting/stamping/holding the photo. Add captions and SFX on the reveal. No static stock-photo cards.
- **CTAs:** one small mid-video subscribe reminder immediately after a reveal, and one end CTA. Keep each brief and do not cover the main story/photo.
- **Pre-render audit:** confirm (1) hook still works muted in first frame, (2) all photos match VO, (3) no photo ID/URL repeats, (4) character+photo coexist in ≥80% of photo scenes, (5) visual changes every 1–3 s, (6) meme jokes fit the line, and (7) voiceover and animation beats remain aligned.


### 4. Cadence for Shorts (do not use the long-form numbers)

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `SHORTS.md [3D]` §0.12. The rest of this section applies only to OLD episodes.


- Photos: a new real photo about every 5 s (16–20 unique photos in a 90 s Short, §9), each used once.
- Memes: **one every 2–4 s (20+ in a 90 s Short, never more than ~4 s without one) — see §9, which replaced the old "2–4 per Short"**, each in a recognizable trending meme FORMAT recreated with our drawn cast and/or a free-licence photo. Never download copyrighted meme images or film/TV stills.
- Visual change every 1–2 s in the first 6 s, then every 1–3 s.

### 5. Photo sourcing — default to Pexels, and where it can and can't run (owner, 13 Oct 2026)

Three free-licence sources are approved for real photos: Wikimedia Commons (`pipeline/photo_find.py`), Unsplash (manual `url`/`credit`/`license`/`page` entry, as in `pipeline/photos/ep57.json`), and **Pexels, now the default pick** — `pipeline/pexels_find.py` searches it the same way `photo_find.py` searches Commons (needs a free `PEXELS_API_KEY` from pexels.com/api). `pipeline/photos.py` already downloads and licence-checks all three with no code changes needed — its `FREE` tuple already includes `unsplash`, `pexels`, `pixabay`.

**None of these can be run from the cloud agent sandbox.** Confirmed 13 Oct 2026: the sandbox's egress proxy blocks `commons.wikimedia.org`, `images.unsplash.com`, and `api.pexels.com`/`images.pexels.com` alike with `connect_rejected (organization policy)` — this is an org-wide allowlist (package registries + GitHub only), not something that changes by picking a different provider. `photo_find.py` / `pexels_find.py` / `photos.py` must run somewhere with open network access — the owner's PC (as this file already assumed) or any Claude session whose sandbox isn't locked to that allowlist. A future builder hitting the same 403s should not keep retrying providers — leave the photo manifest as a list of search queries (see any `pipeline/shorts/shortNN.md` for the format) and say so plainly, the way `short52.md`/`short52.json` did.

### 6. End CTA → the linked long-form video (owner, 13 Oct 2026 — overrides §1's "not a trailer, do not say watch the full video")

Every Short in this pipeline exists to drive views to one specific linked long-form `epNN`, not only to stand alone. Keep the Short's own loop fully resolved — a viewer who never clicks still gets a complete problem → twist → fix — but the ending changes from §1:
- **Last 2–4 s:** on-screen arrow/text pointing down/out ("FULL STORY ↓", "the whole fight for the $9,997 — linked below") plus a spoken line that names what's in the long video, not a generic "like and subscribe."
- **Use the platform's native link**, not just on-screen text: set the Short's "Related Video" field (YouTube Studio, Short settings) to the matching `epNN` — it's the only clickable in-Short link. Pin a top comment with the long-form link too.
- **Make the long-form tease a continuation of the story**, e.g. "Dave's full fight to get his $9,997 back — and the question that ended it — is one tap away," so it reads as the next scene, not an ad.

### 7. Make it hit, not coast — virality pass (owner, 13 Oct 2026)

Directional findings from current Shorts-algorithm write-ups (ClipSpeed AI; ScaleLab's 41 tips — treat exact percentages as unverified claims, not guaranteed numbers, and track our own results in `pipeline/ctr_log.md`):
- **Hook inside the first 0.1 s** (owner, 14 Oct 2026: "even from the first 0.1 sec"), tighter than "by 3 s understand the problem": the first frame already has motion, the first spoken word lands on frame 0, and frame 0 is the single highest-contrast real photo already mid-motion, paired with the sharpest line in the whole script. No scene-setting, no throat-clearing word like "so," no breath before the shock.
- **Zero dead zones, strictly:** treat any 2–3 s stretch with no new visual/number/reaction as a leak, not a style choice. The §2–4 "change every 1–3 s" cadence is a hard floor, never something to coast past because a scene "needed room to breathe."
- **One deliberate rewatch hook:** withhold one concrete detail from the opening (the exact dollar figure, or the twist) and resolve it only in the final seconds, so finishing the loop rewards watching again.
- **Captions animate word-by-word** on every line (not just stamp/meme cards) — most viewers are muted.
- **Frame 0 reads like a thumbnail:** one punchy high-contrast claim, never a multi-person wide shot.
- Sources: [YouTube Shorts Algorithm Decoded (ClipSpeed AI)](https://www.clipspeed.ai/blog/youtube-shorts-algorithm-decoded.html), [41 Tips to Make YouTube Shorts Viral (ScaleLab)](https://scalelab.com/en/41-tips-to-make-youtube-shorts-viral)

### 8. Visual QA rules (from the rejected ep56 Short, 10 Oct 2026)

The owner rejected the first ep56 render because the characters looked frozen, scene objects covered their faces, and the promised memes were not visually legible. Never repeat this.

- **Character animation is mandatory:** do not leave a character in one pose for an entire scene. Use visible pose keyframes (gesture, reaction, gesture) about every 1–2 seconds; use walk/bob/talk animation where appropriate. A tiny idle bob alone does not count.
- **Faces are protected space:** never place photos, meme cards, CTA buttons, labels, captions, or badges over a character's head/face. Keep the characters large enough to read on a phone and inspect frames at 9:16 size.
- **Real photo + character + meme means three distinct visible layers:** show one relevant real photo, at least one clearly animated character, and a separate readable joke/meme card in the same scene. A photo caption, label, or generic title is NOT a meme.
- **Meme legibility:** use short, punchy, recognizable joke setups/punchlines with strong contrast and enough on-screen time to read. Do not hide the meme behind a character, CTA, or caption.
- **Use each real photo only once** and align it with the narration. Do not repeat the hook photo in the next scene.
- **Motion cadence:** introduce a meaningful visual change (pose, prop, camera move, photo, meme, or number) every 1–4 seconds. Scene transitions alone do not excuse motionless characters.
- **CTA safe zones:** show subscribe reminders twice, but place them in unused top/bottom safe space and check that neither character face nor meme is obscured.
- **Render QA is visual, not just technical:** inspect a contact sheet and several actual frames from the final MP4, especially the hook, meme scenes, both CTAs, and ending. A successful GitHub Actions run does not mean the short is approved.

### 9. Fire, not cold — real photos + memes every few seconds, zero silence (owner, 13 Oct 2026, newest; wins over §3/§4 where they differ)

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `SHORTS.md [3D]` §0.12. The rest of this section applies only to OLD episodes.


The owner rejected the first `short52` render: drawn props only, 2 meme beats, half-second gaps between sentences. His words: "i need real photos and memes", "the memes needs to be every very few seconds", "the photos and the memes should be related what spoken", "without any silent moment or any low animated scene", "the short should be fire and not cold". Reference build: `src/shorts/Short52.tsx` + `src/memes52.tsx` + `pipeline/photos/short52.json`.

- **A Short without real photos is not finished.** Never ship a drawn-only cut and call it done. If the session cannot reach the photo hosts (§5), stop at the brief and say so; do not render.
- **Photo cadence:** a new real photo about every 5 s, each id once, cut in ON the word that names it ("Lamborghini" → the Lamborghini photo lands on that word; "revolving door" → the revolving door). Use `w('oN','word')` anchors, never guessed seconds. If the script names nothing photographable for 5 s, rewrite the line so it does.
- **Meme cadence (owner, 14 Oct 2026: "the memes needs to be every very few seconds"):** a meme every 2–4 s and never more than ~4 s of screen time without one (short52: 22 in 89 s), each on screen ≥ 1.5 s, each one a joke about the sentence being spoken at that moment — never a random reaction. Formats that work (all redrawn with Dave / the guru in `src/memes52.tsx`): my-brain-at-2-AM, source-trust-me-bro, is-this-a-pigeon, panik/kalm/panik, shut-up-and-take-my-money, this-is-fine, always-has-been, Spider-Man pointing, stonks, Drake, surprised-reaction chat, two buttons, program.exe-stopped-responding, success fist, to-be-continued arrow, POV text box, I'm-in-danger, trade offer, nervous sweating, confused math, me-waiting (cobwebs), reverse card. When a meme card covers a kinetic-text slam move the slam to the strip under the card (y ≈ 1010), never delete it. Rotate formats; do not reuse one inside a Short.
- **Layout that keeps all three layers readable:** top 1100 px = the real photo full-width (meme card pops over it), bottom = drawn stage with the cast reacting, captions on the line between. Nothing covers a face.
- **Zero silence:** give every beat an id starting with `o` (`o1…oN`) so `tts.py` trims the silence edge-tts leaves around each sentence, set `"pause": 0.02`, and `"tts": {"rate": "+9%", "lead": 0.0}`. Voice starts on frame 0. A sound effect on every cut, slam and meme; music at 0.10 from frame 0 (no fade-in).
- **Captions:** 3 words at a time, huge, uppercase, spoken word in yellow. Never a whole sentence on screen.
- **Cast never holds a pose longer than ~1.5 s** — give every character 4–6 pose keys per sentence.
- **Open loop:** the hook's second sentence promises the ending ("one question is about to make that man hang up"), the ending pays it, and the last line hands a NEW unanswered question to the long video ("his first two thousand is still gone and how he fights to win it back is in the full video linked right below").
- **Where it runs (verified 14 Oct 2026):** `.github/workflows/short.yml` runs `pipeline/photos.py` on GitHub Actions, and Actions can reach Wikimedia Commons — so `short52` (run 38485195999) rendered real photos with no PC step. Only the search (`photo_find.py` / `pexels_find.py`) needs a machine with open network; the cloud agent sandbox cannot reach any photo host (§5). Finished = Actions run green AND `deliverables/shortNN.mp4` committed. Also a local Claude Code session on the owner's PC has open network — it finds photos itself with `py pipeline/photo_find.py "query" --sheet name` (Wikimedia Commons, no API key), LOOKS at the contact sheets, writes `pipeline/photos/shortNN.json`, runs `py pipeline/photos.py shortNN`. `short.yml` downloads any manifest photo that is not committed. Local voice preview: `py pipeline/tts.py … public/shortNN` needs a full ffmpeg on PATH (`pip install imageio-ffmpeg`; Remotion's bundled ffmpeg cannot decode mp3). QA stills: `node pipeline/stills.mjs <dir> '[{"id":"ShortNN","frame":120,"timings":null}]'` — look at ~50 frames before dispatching the render.
- **Photo credits** (CC BY / BY-SA need attribution): paste the `credit` + `license` lines of the manifest into the Short's description.

### 10. Ideation gates, looped arc, hook-as-question, upload + analytics routine (added 27 Oct 2026 from the "Isa / Nile Blue 7-day channel" case study)

**Precedence (updated 29 Oct 2026, owner: "integrate this strategy in our next videos"):** this section is MANDATORY for every new Short (summary: `SHORTS.md [3D]` §0.10, the loop method mapped onto Dave's 3D experiment format). It only yields to `SHORTS.md [3D]` §0; any older wording below that says §2–§9 win, or that asks for photos/memes, is superseded.

**Precedence:** this section ADDS a planning layer and a post-publish routine. Wherever it touches a rule in §2–§9 (frame 0, no commas, photo/meme cadence, CTA to the long video) the owner's rule in §2–§9 wins. Benchmark numbers below come from one creator's experiment, so treat them as targets to test and log in `pipeline/ctr_log.md`, not guarantees.

#### 10.1 Three gates before a brief is written (a Short must pass all three)

1. **Universal relatability:** a stranger with zero prior knowledge gets the premise with the sound off. Money situations everyone has lived (rent, bonus, refund, scam call) pass. Jargon-first premises fail. Pick the MOST relatable story, not the one with the biggest numbers.
2. **Completion compulsion:** the story follows the looped arc (10.2) so the ending is not predictable and the viewer stays to the payoff.
3. **Open loop:** the hook plants a question that only finishing the Short can close (10.3). Never hand the answer over in the opening line.

Write the three results at the top of `pipeline/shorts/shortNN.md` (one line each: PASS plus why). Any FAIL means rewrite the premise before animating anything.

#### 10.2 The looped arc (how the one loop of §1 is built)

```
HOOK (open-loop question)
  → RISING ACTION   (the problem escalates: §1 problem)
  → CONFLICT        (something goes wrong midway: a miscalculation / failed attempt / bad advice / the twist)
  → COMEBACK        (the retry or the fix: §1 fix)
  → PAYOFF          (the reaction or number that finally closes the loop, then §6 CTA)
```

- Conflict is a real beat with its own scene(s) at roughly the middle of the runtime, not only a twist line. Comeback is a separate beat that visibly resolves it. Together they make the arc less predictable than plain hook → action → payoff.
- In `pipeline/shorts/shortNN.md` list the five phases with their beat ids (`o1…oN`) and approximate timestamps before building. In `src/shorts/ShortNN.tsx` group scenes by phase so the timeline reads left to right as hook, rising, conflict, comeback, payoff.
- Write the script by filling each phase with story, and write the HOOK LAST once the payoff is known.

#### 10.3 Hook = a question, not a statement (works together with §2, §7, §9)

A statement that reports the result gives viewers no reason to stay. Keep §7 frame 0 (moving real photo, oversized caption, impact SFX, first word on frame 0) and make the spoken line plant a question or withhold the result. Zero commas still applies.

- Weak (answers it): "Dave got his full refund after one phone call."
- Strong (open loop): "What would happen if one question made the bank hang up on you."
- Checklist: question form or withheld result, curiosity gap, payoff only at the end, and the second sentence promises the ending (§9 open loop).

#### 10.4 Upload checklist

- **Title:** say what happens in plain words and add two relevant emojis (for example a shocked face). Credit an original creator in the title only if footage is reused (our Shorts use free-licence photos and original animation, so credits go in the description per §9).
- **Description:** the same story with slightly more detail than the title, the photo `credit` + `license` lines (§9), and 3–4 hashtags (`#shorts` plus topic tags such as `#money`).
- Set "not made for kids", ignore the other advanced settings, set the "Related Video" field (§6), publish public.

#### 10.5 Analytics routine after publishing

Log in `pipeline/ctr_log.md` for every Short: views at 24 h and 48 h, swipe-through rate, average view duration as a percent of length, and the peak views per hour.

| Metric (Studio → Analytics → Engagement) | Target to test | Reading |
|---|---|---|
| Swipe-through rate ("how viewers engaged") | ≥ 80% | Below it the first 3 s are leaking. Rising over time means the algorithm keeps pushing |
| Average view duration | ≈ 85% of Short length (52 s of 61 s was called strong) | Low means the conflict or comeback drags |
| Hourly candles (views per hour) | n/a | Shows distribution waves, more telling than the total |

- **Do not judge a Short before 48 h.** A tiny first day (a few thousand views) can still take off on day 2 to 4 because the push comes in waves.
- **Next upload timing:** wait until views per hour stays under about 5,000 for 24 h or longer. Uploading while a Short is still being pushed can flatline it. If the schedule forces an earlier upload accept the trade-off knowingly and note it in the log.
- Keep producing while waiting, and check analytics on a schedule (for example morning and evening), not every few minutes.
- Expect misses: structure (10.1 to 10.3) is how we shorten the number of unstructured guesses before a hit.

#### 10.6 Pre-render scorecard (add to the §3 audit)

- [ ] Relatable with sound off
- [ ] Looped arc present: conflict beat AND comeback beat
- [ ] Open-loop hook written last, with a question or withheld result
- [ ] Title and description follow 10.4

---

## [3D] — was STYLE_3D.md

## SHORTS.md [3D] — v6 "3D ANIMATOR" STYLE + v7 STANDARD (owner, 23–29 Oct 2026) — NEWEST, overrides every other rule in this repo where they conflict

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

#### 0.4 Visuals — the reference's grammar (SHORTS.md [3D] §5, §11, §12)
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
- Before writing any new hook, study how the reference channel (Nion Anarchy, `qa_dl/chan/an/<id>/` shot data + sheets) opens its videos and write the findings into SHORTS.md [3D] §12/§13. Old hook rules that still apply: LONG.md [PLAYBOOK] §0.10 A (concept + stakes + how it ends, never the same hook form twice) and §12.3 (hook = a question).

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
Every sound, voice, model, texture, motion and font must be on the ✅ list of **`SHORTS.md [LICENSES]`**; anything else is banned until checked. Never `public/sfx/pack/*` (unknown licence), never other creators' clips/music, never free-plan AI-generator output, never a cloned or real person's voice, never words put in a real person's mouth. Add the `SHORTS.md [LICENSES]` description footer to every upload.

#### 0.12 Sound design per video + no memes + real images only when needed (owner, 29 Oct 2026)
**"I want us rich on sound effects with the perfect moments… each video should generate its own needed sound effects."**
1. **Every video gets its own sound plan** written BEFORE the edit: `pipeline/sfx/<id>.json` = the list of sounds this video needs, made from its own script — one entry per visual event (each pose swap, card, counter, prop, camera move, impact, reveal, gag) and per thing that makes noise in the story (a cash register for a till, rain for a rainy street, a crowd for a stadium, a phone buzz for a text…). Each entry = `{"name", "recipe", "params", "cue"}` (cue = the line/word/event it lands on). Worked example: `pipeline/sfx/test1.json` (18 sounds from the "back to school" script: school bell, dog bark + whimper on "dog… died", train horn on "train", alarm on "rent", typing on the search, snore by "page ten", stamp on the F grade).
2. **Generate them:** `py pipeline/sfx_synth.py <id>` renders that plan into `public/sfx/<id>/<name>.wav` (recipes in `sfx_synth.py`: whoosh, impact, tick-roll counter, pop, swish, chalk, page, typing, cash/coin, bell/ding, buzz, crowd murmur, footsteps, riser, drop, glitch, heartbeat, rain…). New recipe needed → add it to `sfx_synth.py` (never download sounds of unknown licence; CC0 Kenney sounds in `public/sfx/` are also allowed). Cue them in the TSX as `{src: '<id>/<name>', at: <frame of the exact word/event>}`.
3. **Perfect moments:** a sound lands on the exact frame of its event (the word in the voice, the frame the card lands, the impact frame), never "around" it; counters play `count_roll` for their whole roll and land with the ding; whooshes start 2–3 frames BEFORE a whip/cut; impacts are ON the contact frame; ambience (room tone, street, rain) runs under whole scenes at low volume; music ducks under big hits. Target ≥ 50 cues per minute, and no 2 s window without a sound except deliberate silence before a punchline.
4. **Memes: OFF.** No meme cards, meme formats or "reaction memes" in any new video (long or Short). The old meme rules in LONG.md [PLAYBOOK] §0.11, SHORTS.md [PLAYBOOK] §3/§4/§9, LONG.md [BRIEF] v5 and UPGRADE are retired.
5. **Real images only when needed:** no photo quota. Use a real image only when the story needs real proof the 3D world cannot give — a real document, headline, chart, product, place or a real public person in a factual context — with a free licence (`pipeline/photo_find.py`, credit in the description, `SHORTS.md [LICENSES]`). Everything else is our own 3D/2D animation.

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

### 12. Deep study v2 — whole channel, every frame (28 Oct 2026, owner: "SHORTS.md [3D] is unfinished, analyse until it's enough")

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

## [POSTMORTEM] — was POSTMORTEM.md

## SHORTS.md [POSTMORTEM] — every public video on @DaveExplainsMoney (pulled 8 Nov 2026)

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
- MUST make frame 0 sound different from a TTS narrator: a crowd chant, phone ring, cash-register hit — then Dave. Make it with our own SFX/voices (SHORTS.md [LICENSES] bans other creators' clips; the S4 clip audio is a monetization/claim risk, so copy the effect, not the source).
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

## SHORTS.md [LICENSES] — what we may put in a MONETIZED video (owner, 29 Oct 2026: "make sure we won't get any trouble in the monetization later")

Rule: **every sound, voice, model, texture, motion and font in a video must be on the ✅ list below.** Anything else is banned until its licence is checked and added here. Read with `SHORTS.md [3D]` §0.

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
| Font Caveat (hand lettering, ink look) | `public/fonts/caveat.woff2` | SIL Open Font License | nothing |
| Font Playfair Display (drawn into our own banknote art `blender/tex/pengo_*.png`) | Google Fonts repo | SIL Open Font License | nothing |
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

---

## [FARM] — was FARM.md

## SHORTS.md [FARM] — 3-day Higgsfield Shorts farm (Nov 2026, temporary mode)
> **CANCELLED 10 Nov 2026 (owner): farm not run, back to the usual pipeline. Kept only for §1 (S4 Abdul diagnosis) + §2 (hook knowledge).**

> Temporary: only while the Higgsfield promo runs. Afterward, go back to the normal pipeline (SHORTS.md [MUST], SHORTS.md [3D] §0).
> Goal: LEARN which format × style × topic wins. Every Short = a different combo. Log everything in `farm/RESULTS.md`.
> Rules still in force: SHORTS.md [MUST] §1 script rules (hook rules, no meta talk, loop, no CTA, deliver the promise), SHORTS.md [VIRAL] §1–3.
> Rules suspended for the farm: Dave/red hoodie, Blender 3D, money-only niche, "What if" opener on every Short.

### 0. Blocker check (do first every session)
`higgsfield account status` must show the promo/unlimited plan. On 10 Nov the CLI was logged into a free account with 3.2 credits
(Seedance 2.5 30 s = 210 credits, Veo 3.1 8 s = 32, Kling 4.0 15 s = 48.75). If it isn't unlimited, the owner runs `! higgsfield auth login`
with the promo account. Never spend real credits on the farm without asking the owner.

### 1. Why S4 Abdul (best edit, 1.9k views) did not go viral
Data: `analytics/LOG.md` row S4 + Studio audience page (10 Nov).
1. **Hook frame worked**: > 100 % held in 0–4 s. Keep: loud recognisable opening + big question text.
2. **Lost 40 % at 0:05–0:12**: a $33M stat came before the question. Setup before stakes = swipe.
3. **Lost 15 % at 0:22–0:27**: meta talk ("stick around… today we are making him president").
4. **62.8 % viewed vs swiped**: below the ~70 % line where the feed keeps testing new batches, so it stopped after ~36 h.
5. **Wrong crowd**: 28.8 % aged 65+, 17.4 % 13–17, 0 % 18–24, 99.6 % new viewers, +1 sub. Politics about a name few people know reached
   people who watch but don't share, like or follow. No shares = no second push.
6. **51 s for ~25 s of content**: the dodged payoff ("who would fight hardest" never answered) made the ending feel empty, so no replays.
Lesson: the edit was not the problem. The STORY ORDER (stakes first, no meta talk, pay off the promise) and TOPIC (something people share)
were. Farm topics are chosen for shareability (people tag a friend), not for news value.

### 2. New knowledge (not already in SHORTS.md [VIRAL])
- **Decision time on Shorts ≈ 2 s**, and 3-second retention predicts total performance (r = 0.84 over 120 videos). [dev.to hook engineering]
- **Stack 2 mechanisms on frame 0**: a visually disruptive image AND a curiosity gap together gave +47 % retention vs one alone. A strange
  image with nothing to wonder about, or a question over a normal image, is half a hook. [dev.to hook engineering]
- **Reward prediction error**: the bigger the gap between what the viewer expects and what happens, the stronger the pull. So frame 0 shows
  something IMPOSSIBLE but filmed like it's normal (a caveman with an iPhone vlog, CCTV of a raccoon robbing a vending machine).
- **What's dying (2026)**: voiceover over stock footage, "storytime" intros, generic "you won't believe" hooks (completion −40 % YoY).
- **What's winning**: short scripted AI-native stories with original visuals and a CHARACTER (Yeti vlogger 356k followers, 16M+ views;
  fake ads 3M views in a day; AI interviews; talking animals; alien therapy; cryptid vlogs). Character + absurd premise + deadpan realism.
- **Native audio beats TTS**: models that generate voice, lip sync, SFX and ambience in one pass feel filmed, not "AI explainer".
- **One-take Shorts**: Seedance 2.5 makes up to 30 s of 9:16 multi-shot video with audio in ONE job. That means no local edit, no render,
  and almost no tokens. It's our default farm engine.
- **Shareability test** (S4 lesson): before queueing, ask "would someone send this to a friend with 'this is you'?" If not, change the topic.

### 3. The one-take recipe (every farm Short)
- 15–20 s (max 30). Multi-shot prompt with time stamps: `Shot 1 (0-2s): … Shot 2 (2-5s): …`. New shot every 2–3 s.
- **0–2 s**: the impossible image already in motion + the first spoken line is the curiosity gap. No setup, no greeting.
- **Middle**: escalation, with each shot worse or funnier than the last ("but / so" logic).
- **Last shot**: punchline or twist, then cut on a frame that visually matches shot 1 (loop). No CTA, no fade.
- Dialogue goes in quotes inside the prompt (native lip sync). Say who speaks, their accent and their tone. Keep lines under 10 words.
- Always add: `vertical 9:16, no subtitles, no text on screen, no watermark` (models misspell text).
- Realistic humans → tick "altered or synthetic content" on upload. NEVER real politicians, celebrities, brands or IP characters.
  Politics = the issue and its effect on wallets, shown with fictional or clay characters.

### 4. Model routing (cost in credits when not unlimited)
| need | model | notes |
|---|---|---|
| default one-take 15–30 s, native audio | `seedance_2_5` | `--duration 15..30 --aspect_ratio 9:16 --resolution 720p` |
| realistic vlog / interview with dialogue | `veo3_1` | 8 s max, so use it for 8 s micro-Shorts or chain 2–3 |
| stylised (anime, clay, Pixar) 10–15 s | `kling4_0` | `--duration 10..15` |
| genre push (horror / comedy / noir) | `seedance_2_0` | `--genre comedy` etc. |
| cheap tests | `grok_video_v15_lite`, `wan2_6` | 5–7.5 credits |

### 5. Test matrix — vary ONE axis per wave
Formats (F): POV impossible vlog · ASMR satisfying · street interview · talking pet/object drama · cinematic what-if · history POV ·
couple/relationship skit · CCTV/bodycam found footage · miniature world · time-lapse transformation · anime drama · claymation explainer.
Topics (T): money · relationships · funny/absurd · trending/news · history · animals · school/life truths.
Styles (S): photoreal handheld · cinematic · Pixar 3D · anime · claymation · CCTV/lo-fi · macro.
- Wave 1 = 12 Shorts, each a different F (topics/styles spread). Queue: `farm/queue.json`.
- Wave 2 = the top 3 F from wave 1 × 4 new topics (incl. this week's trends: search YouTube/Google Trends once per wave).
- Wave 3 = the winning F+T × 4 styles. Then take the winner back to the main pipeline.

### 6. Run (token-lean)
- `py tools/farm.py` generates every `pending` item in `farm/queue.json` one at a time (trial concurrency = 1). It saves
  `videos/farm/<id>.mp4` plus `<id>.txt` (title/description/tags) and marks the item `done`. Run it in the background.
- `py tools/farm.py --only f03` runs one item. `--dry` prints the commands without spending.
- Claude's job per wave: write ~12 queue entries (~150 words each), start the runner, write the next wave while it runs.
  Don't watch the videos frame by frame. Check 1 still per Short if something looks broken.

### 7. Posting + judging
- Post on a SEPARATE test channel if possible (mixed topics confuse the main channel; S4/ea1 lesson). 3–6 per day, spaced ≥ 2 h.
- At 48 h log in `farm/RESULTS.md`: views, viewed vs swiped %, avg % viewed, shares, subs. Winner = ≥ 70 % viewed AND above-median shares.
- Kill rule: < 50 % viewed after 500 impressions = that F×T is dead, don't repeat it.

Sources: [hook engineering](https://dev.to/bulkdl/hook-engineering-the-science-of-the-first-3-seconds-in-short-form-video-2026-2jp9) ·
[AI formats 2026](https://www.subsub.io/blog/how-ai-generated-youtube-shorts-will-change-creators-in-2026) ·
[Veo 3 viral case study](https://theaiuntangled.substack.com/p/veo3-viral-video-how-to) ·
[Veo 3 formats](https://focalml.com/blog/veo-3-ai-interviews-deepfake-influencer-formats-vlogging-movie-characters/)
