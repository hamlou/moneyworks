# FORMAT_TESTS.md — find the format the algorithm loves (OBLIGATORY before every new Short)

> Owner, 10 Nov 2026: "don't cancel the variety of the types of videos… test every type till we find the one the algorithm loves…
> take every note for the next video."
> The Higgsfield FARM is cancelled (money). The VARIETY TEST is NOT. It runs on our usual free pipeline (Remotion + Blender Dave + GitHub Actions).

## Rules
1. Every new Short = a format NOT yet tested (pick from §3 queue), unless a format won (§4) → then repeat the winner with a new topic.
2. Change ONE big axis per test (format). Keep the control: SHORTS_MUST rules ("What if" hook, 25–40 s, no CTA, loop, promise kept).
   A later wave tests the hook axis itself (§3 wave 2).
3. Before writing: read §2 notes of the last 3 Shorts. Carry every KEEP forward, never repeat a FIX.
4. After posting: owner sends Studio screenshots at 48 h → `analytics/inbox/` → fill §1 row + §2 notes + analytics/LOG.md.
5. Winner = ≥ 70 % viewed vs swiped AND views above the best so far. Kill = < 50 % viewed → never that format again.
6. Owner approves the topic before building (owner 10 Nov: "i have to approve the topic first").

## 1. Scoreboard
| # | Short | Format | Topic axis | Len | Posted | Views 48 h | Viewed % | Avg % viewed | Shares | Subs | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1–S3 | betting / co-sign / course | 3D Dave explainer, 90 s | money explainer | 90 s | Oct | 228 / 31 / 122 total | ? | ? | ? | ? | DEAD (too long, facts first) |
| S4 | Abdul El-Sayed president | 3D Dave + photos, "What if" politics name | news name | 51 s | 4 Nov | 1,891 total | 62.8 % | 55 % | ? | +1 | best so far; wrong crowd (65+) |
| ea2s | What If He Runs For President? | 3D Dave scenes | news name | ? | ? | ? | ? | ? | ? | ? | need screenshots |
| usa30 | What If The USA Disappeared For 30 Days? | animated MAP Short | world what-if | ~35 s | ~9 Nov | ~1.3k | ? | ? | ? | ? | need screenshots |
| sal1 | What If Everyone Could See Your Salary? | SCENE story Short (2D Remotion, street + props, word-anchored cues) | social/money "your life", true study | 34.8 s | 10 Nov | — | — | — | — | — | pending 48 h (12 Nov) |

## 2. Notes per Short (KEEP / FIX for next video)
### sal1 (10 Nov) — scene story
- Built with `tools/salshort.py` + `src/v6/SalShort.tsx` (composition `Sal-<id>`). Spec = `pipeline/scenes/<id>.json`. Reusable for any scene Short.
- KEEP: frame 0 = question text + impossible image (salary over every head); question done by 1.9 s; 13 scenes, new image every 2–3 s;
  51 SFX + 25 animations on the exact word; music per scene, cut before punchline; loop last frame = frame 0; real study as proof.
- KEEP: topic passes shareability gate ("send to a friend who is nosy about salaries"); universal (no niche name) → should reach 18–34.
- FIX / watch: no Dave lip-sync close-up (Dave small in corner); some scenes 2.5–3 s (SHORTS_MUST wants 1–2 s new image);
  4 QA rounds needed (tag sizes, overlaps) → start next scene Short with bigger text + safe zones from v4.
- Check at 48 h: drop at 0:05 (Norway map) vs 0:15 (happiness gauges = the "science" part, risk of boring).
### usa30 (~9 Nov) — map Short
- 1.3k views < S4 1.9k. Diagnosis missing → need Studio retention graph + viewed %.
### S4 Abdul — see FARM.md §1 + analytics/LOG.md (stat before question −40 %, meta talk −15 %, dodged promise, 65+ audience).

## 3. Queue (untested formats, our free pipeline) — pick the next one, owner approves the topic
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

## 4. Winner
(none yet)
