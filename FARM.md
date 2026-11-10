# FARM.md — 3-day Higgsfield Shorts farm (Nov 2026, temporary mode)
> **CANCELLED 10 Nov 2026 (owner): farm not run, back to the usual pipeline. Kept only for §1 (S4 Abdul diagnosis) + §2 (hook knowledge).**

> Temporary: only while the Higgsfield promo runs. Afterward, go back to the normal pipeline (SHORTS_MUST.md, STYLE_3D §0).
> Goal: LEARN which format × style × topic wins. Every Short = a different combo. Log everything in `farm/RESULTS.md`.
> Rules still in force: SHORTS_MUST §1 script rules (hook rules, no meta talk, loop, no CTA, deliver the promise), VIRAL_SHORTS §1–3.
> Rules suspended for the farm: Dave/red hoodie, Blender 3D, money-only niche, "What if" opener on every Short.

## 0. Blocker check (do first every session)
`higgsfield account status` must show the promo/unlimited plan. On 10 Nov the CLI was logged into a free account with 3.2 credits
(Seedance 2.5 30 s = 210 credits, Veo 3.1 8 s = 32, Kling 4.0 15 s = 48.75). If it isn't unlimited, the owner runs `! higgsfield auth login`
with the promo account. Never spend real credits on the farm without asking the owner.

## 1. Why S4 Abdul (best edit, 1.9k views) did not go viral
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

## 2. New knowledge (not already in VIRAL_SHORTS.md)
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

## 3. The one-take recipe (every farm Short)
- 15–20 s (max 30). Multi-shot prompt with time stamps: `Shot 1 (0-2s): … Shot 2 (2-5s): …`. New shot every 2–3 s.
- **0–2 s**: the impossible image already in motion + the first spoken line is the curiosity gap. No setup, no greeting.
- **Middle**: escalation, with each shot worse or funnier than the last ("but / so" logic).
- **Last shot**: punchline or twist, then cut on a frame that visually matches shot 1 (loop). No CTA, no fade.
- Dialogue goes in quotes inside the prompt (native lip sync). Say who speaks, their accent and their tone. Keep lines under 10 words.
- Always add: `vertical 9:16, no subtitles, no text on screen, no watermark` (models misspell text).
- Realistic humans → tick "altered or synthetic content" on upload. NEVER real politicians, celebrities, brands or IP characters.
  Politics = the issue and its effect on wallets, shown with fictional or clay characters.

## 4. Model routing (cost in credits when not unlimited)
| need | model | notes |
|---|---|---|
| default one-take 15–30 s, native audio | `seedance_2_5` | `--duration 15..30 --aspect_ratio 9:16 --resolution 720p` |
| realistic vlog / interview with dialogue | `veo3_1` | 8 s max, so use it for 8 s micro-Shorts or chain 2–3 |
| stylised (anime, clay, Pixar) 10–15 s | `kling4_0` | `--duration 10..15` |
| genre push (horror / comedy / noir) | `seedance_2_0` | `--genre comedy` etc. |
| cheap tests | `grok_video_v15_lite`, `wan2_6` | 5–7.5 credits |

## 5. Test matrix — vary ONE axis per wave
Formats (F): POV impossible vlog · ASMR satisfying · street interview · talking pet/object drama · cinematic what-if · history POV ·
couple/relationship skit · CCTV/bodycam found footage · miniature world · time-lapse transformation · anime drama · claymation explainer.
Topics (T): money · relationships · funny/absurd · trending/news · history · animals · school/life truths.
Styles (S): photoreal handheld · cinematic · Pixar 3D · anime · claymation · CCTV/lo-fi · macro.
- Wave 1 = 12 Shorts, each a different F (topics/styles spread). Queue: `farm/queue.json`.
- Wave 2 = the top 3 F from wave 1 × 4 new topics (incl. this week's trends: search YouTube/Google Trends once per wave).
- Wave 3 = the winning F+T × 4 styles. Then take the winner back to the main pipeline.

## 6. Run (token-lean)
- `py tools/farm.py` generates every `pending` item in `farm/queue.json` one at a time (trial concurrency = 1). It saves
  `videos/farm/<id>.mp4` plus `<id>.txt` (title/description/tags) and marks the item `done`. Run it in the background.
- `py tools/farm.py --only f03` runs one item. `--dry` prints the commands without spending.
- Claude's job per wave: write ~12 queue entries (~150 words each), start the runner, write the next wave while it runs.
  Don't watch the videos frame by frame. Check 1 still per Short if something looks broken.

## 7. Posting + judging
- Post on a SEPARATE test channel if possible (mixed topics confuse the main channel; S4/ea1 lesson). 3–6 per day, spaced ≥ 2 h.
- At 48 h log in `farm/RESULTS.md`: views, viewed vs swiped %, avg % viewed, shares, subs. Winner = ≥ 70 % viewed AND above-median shares.
- Kill rule: < 50 % viewed after 500 impressions = that F×T is dead, don't repeat it.

Sources: [hook engineering](https://dev.to/bulkdl/hook-engineering-the-science-of-the-first-3-seconds-in-short-form-video-2026-2jp9) ·
[AI formats 2026](https://www.subsub.io/blog/how-ai-generated-youtube-shorts-will-change-creators-in-2026) ·
[Veo 3 viral case study](https://theaiuntangled.substack.com/p/veo3-viral-video-how-to) ·
[Veo 3 formats](https://focalml.com/blog/veo-3-ai-interviews-deepfake-influencer-formats-vlogging-movie-characters/)
