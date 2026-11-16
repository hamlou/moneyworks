# Moneyworks — cinematic money documentaries (long-form, 16:9)

**The owner gives a TOPIC (or nothing). You deliver a finished video at the approved quality. Never ask the owner to repeat a rule: every rule is in `LONG.md [DOC]` and is enforced by `tools/doc.py`. If a gate refuses your work, fix the work, never the gate.**

## The only live format (owner-approved 15–16 Nov 2026)
Dark cinematic documentary, model = Gloam "How Binance Lost $6,300,000,000 in One Night" (youtu.be/5eZj1OnC1C4). One spec file → one video:
```
py tools/docwrite.py <id> ["<topic>"]   # AUTOPILOT: proven topic → research → spec (free Gemini), loops on check until SPEC OK
py tools/doc.py check <id>              # topic proof, title, thumbnail, hook type, pace, sources — fix every ✗
py tools/doc.py images <id>             # prompts for the stills; the owner makes them in Gemini Pro (images only) → public/<id>/
py tools/doc.py voice <id>              # → push with tools/apipush.py → voice.yml voices it on GitHub
py tools/doc.py build <id>              # real-voice timing; refuses slow hooks, slow pace, thin sound, missing stills
py tools/doc.py stills <id>             # preview frames → SHOW THE OWNER before a full render
py tools/doc.py thumb <id>              # owner's picture + words in code → 3 versions + phone test
py tools/doc.py render <id>             # → push → v6split.yml renders on GitHub → download → send the mp4 to the owner
```
Read `LONG.md [DOC]` (and only that part) before writing or editing a spec. Working example of a COMPLETE approved video: `pipeline/doc/click.json` (written in `pipeline/doc/click_gen.py`) — copy its structure, never its content. `pipeline/doc/citi.json` is the 45-second test.

## What the owner decided (all enforced in code — listed so you understand the refusals)
- Long-form only. No Shorts. No 2D stickman, no 3D Dave, no character on screen.
- Topic: evergreen, with measured proof (`tools/doctopic.py scan` + `demand`). Never by taste.
- Title + 2 alternatives + thumbnail words/prompt are part of the spec. Thumbnail picture by the owner, words added in code.
- ANIMATION, not text: illustrated actors act out the spoken words (`motion` scenes, engine `src/v6/Motion.tsx`). ≥ 50 % of the WHOLE video, ≥ 3 before the title, never 3 non-motion shots in a row. The energy of the hook runs to the last second.
- Script craft measured on winning videos: short sentences, a turn every ~20 s, things not ideas, promises paid, a sting ending (gates + the how-to list in `LONG.md [DOC]` §3).
- Hook: one of 5 proven types, never the type of the last 2 videos; energetic first sentence, flash trailer, escalator line, list of 3 questions, title card by 50 s.
- Pace: natural voice speed (tempo 1.0), average shot ≤ 7 s, something new every ≤ 4 s, a turn every 45 s. Pictures land on their spoken word.
- Sound: layered automatically from the library (`public/sfx/lib` real CC0 recordings + `public/sfx/doc`), ≥ 45 cues a minute. New sounds only with a verified licence line in `public/sfx/lib/LICENSE.txt`.
- Facts: every figure sourced, quotes verbatim, "allegedly" for anything not proven. Verify the autopilot's facts before rendering.
- Always look at what is working NOW before deciding anything (topics, hooks, thumbnails): measure winning videos, copy their structure, change the content.
- Claude cannot hear or judge taste: after any change to look, hook or sound, render a short test and send it to the owner.

## How to work here
- Weak PC: never render video locally (preview stills are fine). Everything heavy runs on GitHub Actions. Repo `hamlou/moneyworks` (public), branch `shorts-playbook-rules`. GitHub CLI: `%LOCALAPPDATA%\ghcli\bin\gh.exe`.
- `git push` fails on this network: commit files with `py tools/apipush.py "message" <files>`. Network calls time out often: retry.
- Start a render by `py tools/doc.py render <id>` then push `pipeline/split/RUN`. Download with `gh run download <run> -n Doc-<id>`.
- Only two rule files exist: `LONG.md` and `SHORTS.md`. Never create another rule file; add to `LONG.md [DOC]`.
- After upload: 48 h and 7 days → impressions, CTR, average view duration, retention graph → `analytics/LOG.md`. Change a rule only when 3+ videos show the same thing. Judge the format after 10 videos, not after one.

## Retired — history only, never use for a new video
Everything else in `LONG.md` ([RECIPE], [3D], [PLAYBOOK], [UPGRADE], [BRIEF]) and all of `SHORTS.md`; `tools/auto.py`, `tools/write.py` (except its Gemini helpers), `AUTOPILOT.md`, the Blender pipeline, `src/Stick.tsx`, `src/episodes/`, the old "no thumbnails" rule. The previous long CLAUDE.md is in git history.
