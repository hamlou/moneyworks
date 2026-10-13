# MONEYWORKS PLAYBOOK — SHORTS (9:16 vertical, under 3 min)

**This file is ONLY for vertical Shorts (`shortNN`, 1080×1920).** Long-form episodes have their own file: `PLAYBOOK_LONG.md`. Never apply a long-form rule to a Short (10 min length, 9 chapters, chapter cards, a photo every 10–15 s, a meme every 30 s, pause-and-guess, "What Dave Learned" recap, 3 thumbnails) or a Shorts rule to a long video (owner, 11 Oct 2026: "don't mix between them").

Shared with long-form, and read there when needed (same channel, same world): cast and their looks (`PLAYBOOK_LONG.md` §2), voice Andrew, research standard and sources (§4), SFX names (§7), prop toolkit (§9), photo kit and licence rules (§0.10 C: `src/photo.tsx`, `pipeline/photo_find.py`, `pipeline/photos.py`, free licences only, real people in factual context only).

## 1. What a Short is

- A **standalone, fully-resolved story** — never a cliffhanger that only makes sense if you click away — but its job is still to drive views to one specific linked long-form `epNN` (see §6, 13 Oct 2026): resolve the loop completely, then end by pointing at the long video. 1080×1920, about 50–95 s, one loop only (one problem → one twist → one fix).
- Files: brief `pipeline/shorts/shortNN.md`, script `pipeline/episodes/epNN-short.json`, animation `src/shorts/ShortNN.tsx`, photos `pipeline/photos/epNN.json`. Reference build: `short57` (brief + `src/shorts/Short57.tsx`).
- Keep from the long episode only the two hardest numbers and the one emotional contrast. Cut everything else.

## 2. Story and hook

Open on a complete, emotionally sharp thought with no intro. The first frame must already be moving and make sense with sound off; the first 0.1 s matters. Use a contradiction, money shock, or consequence—not a greeting or channel bumper. By 3 s the viewer must understand the problem; by 6 s introduce a fresh escalation. Hook promises a specific payoff, and the ending delivers it. Keep the story self-contained; do not say "watch the full video" or rely on prior context. Every 1–2 s in the first 6 s, then every 1–3 s throughout, make a meaningful visual change (new angle, prop, pose, photo, reaction, kinetic text, or meme beat), synced to VO/SFX. Never use a generic slideshow or repeat a scene to fill time.

**Script sound (owner, 11 Oct 2026, same as long-form):** zero commas in the spoken text. Write flowing sentences joined with and / but / so / because ("the bonus is free and also the house is free"), never comma-chopped fragments ("bonus, free, house, free"). No dashes or semicolons as a cheat.

## 3. Retention + mixed-media rules (owner, 10 Oct 2026)

- **Cast stays present:** in at least 80% of scenes, Dave, Bob, Danny, or another channel character must be visible in the same composition as the real photo—foreground, corner reaction, pointing, holding it, or interacting with its edge. The photo and character should feel like one scene, not alternating unrelated slides. The one exception is frame 0 of the hook: follow the real-photo-first rule (§2), then bring Dave into the next shot.
- **No mismatched images:** map every photo ID to the exact VO beat in the manifest/scene comments. Car repair photo only when discussing the car/tire; signed paperwork only when discussing the written agreement; never use money stock for an unrelated line. If no fitting photo exists, use the animated cast and props instead.
- **Strict no-duplicates:** run a source-level check before render: every `photo('id'` / `src="epNN/id.jpg"` may appear at most once in the video timeline. Do not recycle photos for the hook, mid-video, or CTA. Use separate unique assets, not alternate crops, for separate appearances.
- **Hook 0.0–0.1 s:** frame 0 must contain a moving real image (slam/push-in), an oversized contradiction/stakes caption, and an impact SFX; no fade-in, blank frame, logo, or throat-clearing. Use 4+ distinct visual changes in the first 6 s. The first photo must relate directly to the first spoken sentence.
- **Meme beats:** add 2–4 original, context-specific meme/reaction moments where the story earns them (e.g. Dave facepalming at "next Friday bro"). Prefer original channel characters and custom meme layouts over unrelated recycled internet images. Memes are punchlines, not filler; don't put a meme over a serious factual claim.
- **Every image moves and interacts:** animate entry, gentle camera movement/wobble, and a character pointing/reacting/stamping/holding the photo. Add captions and SFX on the reveal. No static stock-photo cards.
- **CTAs:** one small mid-video subscribe reminder immediately after a reveal, and one end CTA. Keep each brief and do not cover the main story/photo.
- **Pre-render audit:** confirm (1) hook still works muted in first frame, (2) all photos match VO, (3) no photo ID/URL repeats, (4) character+photo coexist in ≥80% of photo scenes, (5) visual changes every 1–3 s, (6) meme jokes fit the line, and (7) voiceover and animation beats remain aligned.


## 4. Cadence for Shorts (do not use the long-form numbers)

- Photos: as many as the runtime supports, target 10–14 unique photos, each used once.
- Memes: 2–4 per Short, only where the story earns them, in a recognizable trending meme FORMAT recreated with our drawn cast and/or a free-licence photo. Never download copyrighted meme images or film/TV stills.
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
- **Hook inside the first ~1 s**, tighter than "by 3 s understand the problem": frame 0 is the single highest-contrast real photo already mid-motion, paired with the sharpest line in the whole script. No scene-setting, no throat-clearing word like "so," no breath before the shock.
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
