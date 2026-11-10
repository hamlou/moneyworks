# SHORTS_MUST.md — OBLIGATORY. READ ALL OF IT BEFORE TOUCHING ANY SHORT. NO EXCEPTIONS.

> Owner, 8 Nov 2026: "THE USER SHOULDN'T SWIPE THE SHORT. ANY BORING MOMENT, BAD CUT OR ANNOYING MOMENT MUST BE CUT."
> Agents in the past ignored the .md files. This file is not advice. Every line is a hard requirement.
> If a rule blocks you, STOP and ask the owner. Never "skip it this once".
> Evidence: POSTMORTEM.md (our 23 videos, what failed + what to keep) and VIRAL_SHORTS.md (research + sources).

> Ops: before rendering, read `pipeline/ops/LOG.md` + open `autopilot` GitHub issues (supervisor, AUTOPILOT.md §7).

## 0. Before writing — you MUST
1. READ `analytics/LOG.md` and process any new screenshots in `analytics/inbox/` (rules: `analytics/README.md`).
2. READ `POSTMORTEM.md` §Patterns and the "GOOD POINTS TO KEEP" of the best Short (S4 Abdul, 1,891 views = our best video ever).
3. The hook MUST start with **"What if…"** (owner 8 Nov: this is the format that worked; facts-first is "boring").
4. Topic MUST ride a name/event people already care about THIS WEEK + a money/"your life" angle. Never a textbook explainer.
5. READ `FORMAT_TESTS.md`: next Short = an UNTESTED format from its queue (owner 10 Nov: test every type until one wins). Fill its notes after 48 h.

## 1. Script — MUST / NEVER
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
- MUST: frame 0 = disruptive image AND open question together, decided in 2 s. MUST pass the shareability gate ("would someone send this to a friend?"). [VIRAL_SHORTS §5]
- NEVER: unrelated hashtags in the title (#investing #reversemortgage on a co-sign Short).

## 2. Edit — MUST / NEVER (the swipe killers)
- MUST: new image every 1–2 s. NEVER a static frame > 1.5 s.
- MUST: cut every silence > 0.3 s (one planned beat before the punchline is allowed).
- MUST: a pattern interrupt every 5–7 s (zoom punch, cut to a new set, sound hit, colour flash).
- MUST: music 15–20 % of voice level, drops out before punchlines. Dense SFX on every visual hit.
- MUST: our own sounds/visuals only (LICENSES.md). S4 opened on real crowd-chant audio — recreate the EFFECT, never reuse the source.
- NEVER: repeat a fact already said, slow zooms on nothing, text that stays after its line ended, a blurry/unreadable card.

## 3. Ship — MUST
- Title = the "What if…?" question, ≤ 60 chars, + #shorts. Education category, 8–15 real tags.
- Run the measure step (PySceneDetect cut rate + silence check) — longest shot ≤ 1.5 s in the first 3 s, ≤ 2.5 s after.
- After 48 h: log views, "viewed vs swiped away" %, avg % viewed in `pipeline/ctr_log.md` and add a WHY/KEEP entry to POSTMORTEM.md.

## 4. The template (fill it, don't improvise)
| t | what |
|---|---|
| 0.0–3.0 s | "What if …?" + the prize on screen (number / famous name) |
| 3–8 s | the twist that makes it real ("Because he just did.") |
| 8–25 s | 3–4 beats, each = one new image + one surprising TRUE fact, each ends with "but/so" |
| 25–35 s | the payoff the hook promised, punch line after a 0.3 s beat |
| last 2 s | a line that flows straight back into the first line (loop) — no CTA |

## 5. Owner feedback on ea2s (9 Nov 2026) — OBLIGATORY
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
