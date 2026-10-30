# MONEYWORKS PLAYBOOK — SHORTS (9:16 vertical, under 3 min)

> **★ v7 STANDARD (owner, 29 Oct 2026) — `STYLE_3D.md` §0 is THE rule set for EVERY new video (long-form and Shorts) and wins over everything in this file.** Natural connected speech (no commas AND no fragment chains like "12 years. Day one. Math class."), Blender 3D Dave in a red oversized hoodie + wide black pants with costume swaps per scene role, objects from the words of each line, ≥ 50 % real 3D, something new every 1.5–2.5 s, dense SFX (counter roll ticks etc.), hook = the priority (50 %+ of viewers leave in 5–10 s), built with the mandatory LOOP METHOD (§0.10: 3 gates, looped arc hook→rising→conflict→comeback→payoff, hook as a question, mini-loops per chapter, Shorts swipe-through ≥ 80 %, next Short only when < ~5k views/h for 24 h). Retired: memes, polaroids, photo-every-10–15 s, photos+memes every 2–4 s in Shorts, captions, 2D Dave for new videos, asking the owner to record their voice. Template: `pipeline/episodes/test1.json` + `blender/test1.py` + `src/v6/Test1.tsx`. **NO THUMBNAILS (owner 30 Oct 2026: "don't do thumbnails anymore, disable that") — never design, render or propose thumbnails or run thumbs.yml; old thumbnail rules are retired.** **No memes ever; real images only when needed; every video designs + generates its OWN sound effects timed to its moments (STYLE_3D §0.12).** **Monetization-safe assets only: `LICENSES.md`** (no `public/sfx/pack`, no other creators' clips/music, no cloned voices, credit footer on every upload).

**This file is ONLY for vertical Shorts (`shortNN`, 1080×1920).** Long-form episodes have their own file: `PLAYBOOK_LONG.md`. Never apply a long-form rule to a Short (10 min length, 9 chapters, chapter cards, a photo every 10–15 s, a meme every 30 s, pause-and-guess, "What Dave Learned" recap, 3 thumbnails) or a Shorts rule to a long video (owner, 11 Oct 2026: "don't mix between them").

Shared with long-form, and read there when needed (same channel, same world): cast and their looks (`PLAYBOOK_LONG.md` §2), voice Andrew, research standard and sources (§4), SFX names (§7), prop toolkit (§9), photo kit and licence rules (§0.10 C: `src/photo.tsx`, `pipeline/photo_find.py`, `pipeline/photos.py`, free licences only, real people in factual context only).

## 1. What a Short is

- A **standalone, fully-resolved story** — never a cliffhanger that only makes sense if you click away — but its job is still to drive views to one specific linked long-form `epNN` (see §6, 13 Oct 2026): resolve the loop completely, then end by pointing at the long video. 1080×1920, about 50–95 s, one loop only (one problem → one twist → one fix).
- Files: brief `pipeline/shorts/shortNN.md`, script `pipeline/episodes/shortNN.json`, animation `src/shorts/ShortNN.tsx`, photos `pipeline/photos/shortNN.json`. Reference build: `short52` (§9: brief + `src/shorts/Short52.tsx` + `src/memes52.tsx`).
- Keep from the long episode only the two hardest numbers and the one emotional contrast. Cut everything else.

## 2. Story and hook

Open on a complete, emotionally sharp thought with no intro. The first frame must already be moving and make sense with sound off; the first 0.1 s matters. Use a contradiction, money shock, or consequence—not a greeting or channel bumper. By 3 s the viewer must understand the problem; by 6 s introduce a fresh escalation. Hook promises a specific payoff, and the ending delivers it. Keep the story self-contained; do not say "watch the full video" or rely on prior context. Every 1–2 s in the first 6 s, then every 1–3 s throughout, make a meaningful visual change (new angle, prop, pose, photo, reaction, kinetic text, or meme beat), synced to VO/SFX. Never use a generic slideshow or repeat a scene to fill time.

**Script sound (owner, 11 Oct 2026, same as long-form):** zero commas in the spoken text. Write flowing sentences joined with and / but / so / because ("the bonus is free and also the house is free"), never comma-chopped fragments ("bonus, free, house, free"). No dashes or semicolons as a cheat.

## 3. Retention + mixed-media rules (owner, 10 Oct 2026)

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `STYLE_3D.md` §0.12. The rest of this section applies only to OLD episodes.


- **Cast stays present:** in at least 80% of scenes, Dave, Bob, Danny, or another channel character must be visible in the same composition as the real photo—foreground, corner reaction, pointing, holding it, or interacting with its edge. The photo and character should feel like one scene, not alternating unrelated slides. The one exception is frame 0 of the hook: follow the real-photo-first rule (§2), then bring Dave into the next shot.
- **No mismatched images:** map every photo ID to the exact VO beat in the manifest/scene comments. Car repair photo only when discussing the car/tire; signed paperwork only when discussing the written agreement; never use money stock for an unrelated line. If no fitting photo exists, use the animated cast and props instead.
- **Strict no-duplicates:** run a source-level check before render: every `photo('id'` / `src="epNN/id.jpg"` may appear at most once in the video timeline. Do not recycle photos for the hook, mid-video, or CTA. Use separate unique assets, not alternate crops, for separate appearances.
- **Hook 0.0–0.1 s:** frame 0 must contain a moving real image (slam/push-in), an oversized contradiction/stakes caption, and an impact SFX; no fade-in, blank frame, logo, or throat-clearing. Use 4+ distinct visual changes in the first 6 s. The first photo must relate directly to the first spoken sentence.
- **Meme beats:** add 2–4 original, context-specific meme/reaction moments where the story earns them (e.g. Dave facepalming at "next Friday bro"). Prefer original channel characters and custom meme layouts over unrelated recycled internet images. Memes are punchlines, not filler; don't put a meme over a serious factual claim.
- **Every image moves and interacts:** animate entry, gentle camera movement/wobble, and a character pointing/reacting/stamping/holding the photo. Add captions and SFX on the reveal. No static stock-photo cards.
- **CTAs:** one small mid-video subscribe reminder immediately after a reveal, and one end CTA. Keep each brief and do not cover the main story/photo.
- **Pre-render audit:** confirm (1) hook still works muted in first frame, (2) all photos match VO, (3) no photo ID/URL repeats, (4) character+photo coexist in ≥80% of photo scenes, (5) visual changes every 1–3 s, (6) meme jokes fit the line, and (7) voiceover and animation beats remain aligned.


## 4. Cadence for Shorts (do not use the long-form numbers)

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `STYLE_3D.md` §0.12. The rest of this section applies only to OLD episodes.


- Photos: a new real photo about every 5 s (16–20 unique photos in a 90 s Short, §9), each used once.
- Memes: **one every 2–4 s (20+ in a 90 s Short, never more than ~4 s without one) — see §9, which replaced the old "2–4 per Short"**, each in a recognizable trending meme FORMAT recreated with our drawn cast and/or a free-licence photo. Never download copyrighted meme images or film/TV stills.
- Visual change every 1–2 s in the first 6 s, then every 1–3 s.

## 5. Photo sourcing — default to Pexels, and where it can and can't run (owner, 13 Oct 2026)

Three free-licence sources are approved for real photos: Wikimedia Commons (`pipeline/photo_find.py`), Unsplash (manual `url`/`credit`/`license`/`page` entry, as in `pipeline/photos/ep57.json`), and **Pexels, now the default pick** — `pipeline/pexels_find.py` searches it the same way `photo_find.py` searches Commons (needs a free `PEXELS_API_KEY` from pexels.com/api). `pipeline/photos.py` already downloads and licence-checks all three with no code changes needed — its `FREE` tuple already includes `unsplash`, `pexels`, `pixabay`.

**None of these can be run from the cloud agent sandbox.** Confirmed 13 Oct 2026: the sandbox's egress proxy blocks `commons.wikimedia.org`, `images.unsplash.com`, and `api.pexels.com`/`images.pexels.com` alike with `connect_rejected (organization policy)` — this is an org-wide allowlist (package registries + GitHub only), not something that changes by picking a different provider. `photo_find.py` / `pexels_find.py` / `photos.py` must run somewhere with open network access — the owner's PC (as this file already assumed) or any Claude session whose sandbox isn't locked to that allowlist. A future builder hitting the same 403s should not keep retrying providers — leave the photo manifest as a list of search queries (see any `pipeline/shorts/shortNN.md` for the format) and say so plainly, the way `short52.md`/`short52.json` did.

## 6. End CTA → the linked long-form video (owner, 13 Oct 2026 — overrides §1's "not a trailer, do not say watch the full video")

Every Short in this pipeline exists to drive views to one specific linked long-form `epNN`, not only to stand alone. Keep the Short's own loop fully resolved — a viewer who never clicks still gets a complete problem → twist → fix — but the ending changes from §1:
- **Last 2–4 s:** on-screen arrow/text pointing down/out ("FULL STORY ↓", "the whole fight for the $9,997 — linked below") plus a spoken line that names what's in the long video, not a generic "like and subscribe."
- **Use the platform's native link**, not just on-screen text: set the Short's "Related Video" field (YouTube Studio, Short settings) to the matching `epNN` — it's the only clickable in-Short link. Pin a top comment with the long-form link too.
- **Make the long-form tease a continuation of the story**, e.g. "Dave's full fight to get his $9,997 back — and the question that ended it — is one tap away," so it reads as the next scene, not an ad.

## 7. Make it hit, not coast — virality pass (owner, 13 Oct 2026)

Directional findings from current Shorts-algorithm write-ups (ClipSpeed AI; ScaleLab's 41 tips — treat exact percentages as unverified claims, not guaranteed numbers, and track our own results in `pipeline/ctr_log.md`):
- **Hook inside the first 0.1 s** (owner, 14 Oct 2026: "even from the first 0.1 sec"), tighter than "by 3 s understand the problem": the first frame already has motion, the first spoken word lands on frame 0, and frame 0 is the single highest-contrast real photo already mid-motion, paired with the sharpest line in the whole script. No scene-setting, no throat-clearing word like "so," no breath before the shock.
- **Zero dead zones, strictly:** treat any 2–3 s stretch with no new visual/number/reaction as a leak, not a style choice. The §2–4 "change every 1–3 s" cadence is a hard floor, never something to coast past because a scene "needed room to breathe."
- **One deliberate rewatch hook:** withhold one concrete detail from the opening (the exact dollar figure, or the twist) and resolve it only in the final seconds, so finishing the loop rewards watching again.
- **Captions animate word-by-word** on every line (not just stamp/meme cards) — most viewers are muted.
- **Frame 0 reads like a thumbnail:** one punchy high-contrast claim, never a multi-person wide shot.
- Sources: [YouTube Shorts Algorithm Decoded (ClipSpeed AI)](https://www.clipspeed.ai/blog/youtube-shorts-algorithm-decoded.html), [41 Tips to Make YouTube Shorts Viral (ScaleLab)](https://scalelab.com/en/41-tips-to-make-youtube-shorts-viral)

## 8. Visual QA rules (from the rejected ep56 Short, 10 Oct 2026)

The owner rejected the first ep56 render because the characters looked frozen, scene objects covered their faces, and the promised memes were not visually legible. Never repeat this.

- **Character animation is mandatory:** do not leave a character in one pose for an entire scene. Use visible pose keyframes (gesture, reaction, gesture) about every 1–2 seconds; use walk/bob/talk animation where appropriate. A tiny idle bob alone does not count.
- **Faces are protected space:** never place photos, meme cards, CTA buttons, labels, captions, or badges over a character's head/face. Keep the characters large enough to read on a phone and inspect frames at 9:16 size.
- **Real photo + character + meme means three distinct visible layers:** show one relevant real photo, at least one clearly animated character, and a separate readable joke/meme card in the same scene. A photo caption, label, or generic title is NOT a meme.
- **Meme legibility:** use short, punchy, recognizable joke setups/punchlines with strong contrast and enough on-screen time to read. Do not hide the meme behind a character, CTA, or caption.
- **Use each real photo only once** and align it with the narration. Do not repeat the hook photo in the next scene.
- **Motion cadence:** introduce a meaningful visual change (pose, prop, camera move, photo, meme, or number) every 1–4 seconds. Scene transitions alone do not excuse motionless characters.
- **CTA safe zones:** show subscribe reminders twice, but place them in unused top/bottom safe space and check that neither character face nor meme is obscured.
- **Render QA is visual, not just technical:** inspect a contact sheet and several actual frames from the final MP4, especially the hook, meme scenes, both CTAs, and ending. A successful GitHub Actions run does not mean the short is approved.

## 9. Fire, not cold — real photos + memes every few seconds, zero silence (owner, 13 Oct 2026, newest; wins over §3/§4 where they differ)

> **⛔ RETIRED (owner, 29 Oct 2026):** no memes of any kind (generated meme cards, meme formats, reaction memes) and no photo quotas (no "photo every 10–15 s", no "photos every 2–4 s"). Real images only when the story needs real proof — see `STYLE_3D.md` §0.12. The rest of this section applies only to OLD episodes.


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

## 10. Ideation gates, looped arc, hook-as-question, upload + analytics routine (added 27 Oct 2026 from the "Isa / Nile Blue 7-day channel" case study)

**Precedence (updated 29 Oct 2026, owner: "integrate this strategy in our next videos"):** this section is MANDATORY for every new Short (summary: `STYLE_3D.md` §0.10, the loop method mapped onto Dave's 3D experiment format). It only yields to `STYLE_3D.md` §0; any older wording below that says §2–§9 win, or that asks for photos/memes, is superseded.

**Precedence:** this section ADDS a planning layer and a post-publish routine. Wherever it touches a rule in §2–§9 (frame 0, no commas, photo/meme cadence, CTA to the long video) the owner's rule in §2–§9 wins. Benchmark numbers below come from one creator's experiment, so treat them as targets to test and log in `pipeline/ctr_log.md`, not guarantees.

### 10.1 Three gates before a brief is written (a Short must pass all three)

1. **Universal relatability:** a stranger with zero prior knowledge gets the premise with the sound off. Money situations everyone has lived (rent, bonus, refund, scam call) pass. Jargon-first premises fail. Pick the MOST relatable story, not the one with the biggest numbers.
2. **Completion compulsion:** the story follows the looped arc (10.2) so the ending is not predictable and the viewer stays to the payoff.
3. **Open loop:** the hook plants a question that only finishing the Short can close (10.3). Never hand the answer over in the opening line.

Write the three results at the top of `pipeline/shorts/shortNN.md` (one line each: PASS plus why). Any FAIL means rewrite the premise before animating anything.

### 10.2 The looped arc (how the one loop of §1 is built)

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

### 10.3 Hook = a question, not a statement (works together with §2, §7, §9)

A statement that reports the result gives viewers no reason to stay. Keep §7 frame 0 (moving real photo, oversized caption, impact SFX, first word on frame 0) and make the spoken line plant a question or withhold the result. Zero commas still applies.

- Weak (answers it): "Dave got his full refund after one phone call."
- Strong (open loop): "What would happen if one question made the bank hang up on you."
- Checklist: question form or withheld result, curiosity gap, payoff only at the end, and the second sentence promises the ending (§9 open loop).

### 10.4 Upload checklist

- **Title:** say what happens in plain words and add two relevant emojis (for example a shocked face). Credit an original creator in the title only if footage is reused (our Shorts use free-licence photos and original animation, so credits go in the description per §9).
- **Description:** the same story with slightly more detail than the title, the photo `credit` + `license` lines (§9), and 3–4 hashtags (`#shorts` plus topic tags such as `#money`).
- Set "not made for kids", ignore the other advanced settings, set the "Related Video" field (§6), publish public.

### 10.5 Analytics routine after publishing

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

### 10.6 Pre-render scorecard (add to the §3 audit)

- [ ] Relatable with sound off
- [ ] Looped arc present: conflict beat AND comeback beat
- [ ] Open-loop hook written last, with a question or withheld result
- [ ] Title and description follow 10.4

