# Brief for parallel episode builders (Series 6+7: ep51–ep75, Retention & CTR v3)

You build ONE complete episode of the YouTube channel "Dave Explains Money": script, choreography, props, thumbnails and SEO, matching the approved LOOK exactly and the new v3 STORY rules exactly. The owner said: "I don't want any mistakes."

## OWNER-APPROVED TOPICS ep61–75 (approved 1 Oct 2026 — do NOT ask again, do NOT change)
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

## Read first (mandatory, in this order)
1. `PLAYBOOK.md` — **§0 (Retention & CTR v3) and §1c (title rule) first**, then the whole file. §0 overrides older rules where they conflict.
2. Code templates (LOOK, cast, props, SFX, code patterns only — NOT script structure): `src/episodes/Ep50.tsx` (most mature), `Ep49.tsx`, `Ep29.tsx`. Copy their patterns: `G2`, `scene()`, `A()`, `w()`, `q()`, `P()`, `bump()`, `lt()`, chapter whoosh loop, SubReminder + subCues, end SubButton/Bell.
3. Props: `src/props.tsx` … `src/props8.tsx` and later `src/propsNN.tsx` files (grep `export const` to find what exists before drawing a new prop).
4. Thumbnail kit: `src/v2/kit.tsx` and examples `src/v2/t49.tsx`, `src/v2/t50.tsx` (tech only — v3 concepts in PLAYBOOK §0.6 replace their "floating head left / object right" layout).
5. The episodes listed as "overlap" for your topic (below / in your task): do NOT repeat their facts, analogies or angle. A callback ("remember our Starbucks video?") is fine.

## WARNING about the old ep51–60 drafts
The old `pipeline/episodes/ep51–60.json` drafts contain claims that could NOT be verified and look invented (e.g. in ep60: "NY fined DraftKings $75,000 in Dec 2024 for limiting", "$3.2B promo spend", "38% of men 21–34", "helpline calls up 35%"). Treat every number/fact in those drafts as UNVERIFIED: keep it only if you find the primary source yourself; otherwise drop it.

## Thumbnails: the LEAD makes them (Oct 2026)
Do NOT write src/v2/tNN.tsx and do not run thumbs.yml. In your final report give 3 thumbnail concepts (different §0.6 types) + `thumb_question`. Put `thumb_question` in seo_epNN.json and leave `thumb` as "A".

## Holding objects (owner bug, Oct 2026)
NEVER use `handItem`. Use `hold={{item: <Prop s={0.35} />, side: 'r'}}` with pose `present`, `talk` or `point_r` (or `point_l` + `side: 'l'`). validate.py blocks `handItem`.

## Background keep-out zones
`<Interior />` has a $ picture at x 220–440, y 190–360 and a window at x 1390–1690, y 170–430. Never put labels/props there (ep60 had labels on the $ picture in 8 scenes). The Damage Meter sits top-right; keep that corner free too.

## QA honesty
A QA report is only OK if it contains the line `epNN: 0 flagged beats out of N` AND full.jpg shows real frames. `QA CRASHED`, a missing flagged-beats line, or a tiny/blank full.jpg = runtime error in your code: fix it. If you cannot view full.jpg, SAY SO in your report — never claim a check passed that you didn't see.

## Lead review
The cloud QA now also uploads `full.jpg` (one frame of every beat). Look at it yourself before reporting: overlapping props, text cut off at the frame edge, characters covering numbers, mirrored text, tiny unreadable text, two scenes that look identical — fix them. The lead reviews full.jpg before any render.

## Save progress early
Sessions can be cut off. Commit + push your JSON as soon as the script is written, and push again after each milestone (tsx compiles, QA pass, thumbs, SEO), so a restarted builder can continue from git.

## The v3 story rules (summary — details in PLAYBOOK §0)
- Title = a people problem (§1c). Use the approved title you were given (you may suggest alts in SEO).
- Fill `"spine"` in the episode JSON FIRST (goal, stakes, central_question, loop_big, loop_mid, villain, low_point, win).
- ONE Dave story joined by BUT / SO / THEREFORE. Every chapter opens with Dave doing something and ends with a cliffhanger line. Chapter titles = curiosity phrases ≤ 5 words. Outro chapter = "What Dave Learned".
- Hook `o1…o6` ≤ 30 s, ≤ 85 words: flash-forward → freeze + rewind → relatable start → stakes number → central question → withheld payoff. Frame 0 in motion; first 3 s = the thumbnail-A scene; freeze/rewind gag (code in §0.3); slam number; villain silhouette.
- Damage Meter HUD (label must contain the word DAMAGE), pause-and-guess at ~30 % paid ~60 s later, re-hook every 60–90 s, villain reveal + SubReminder at ~50 %, low point ~75 %, Dave fights back (education, not advice), big payoff in the last minute, 3-line recap ≤ 15 s, next episode teased as Dave's next problem, subscribe joke.
- Banned phrases: "Today:", "In this video", "Let's start with", "Next,", "Here are three more", "Another reason is", "So let's recap", "That's it", "In conclusion", "Before we wrap up", "Let's talk about".
- Length: ~1,250–1,400 spoken words → 8:10–9:30. Must be ≥ 480 s (aim ≥ 500 s).

## Hard rules (unchanged — breaking one = the episode fails)
- **SFX names MUST exist** (render fails otherwise): pop, pop2, whoosh, whoosh_s, thud, stamp, coin, cash, click, key, key2, ding, chime, boing, buzz, quack, poof, scribble, marker, paper, flip, crinkle, clank, dream, sting, heart, rip, trombone, cricket, sputter, mail, crowd, tick, step, flutter, draw. List every SFX your EpNN.tsx uses and check each before committing.
- **Dave is the main character** (`acc={['hair']} seed={7}`). Cast from PLAYBOOK §2.
- Beginner level, short sentences, a silly concrete analogy per chapter, numbers spelled out as words for TTS ("twenty twenty six", "one point four billion").
- Every number from a current official/primary source (web search, it is October 2026). Sources in JSON `sources` + `<SourceTag>` on screen. Balanced on politics. "Education, not advice" in the practical chapter.
- **NO EMPTY SCENES**: everything that belongs to a scene is on screen within its first ~10 frames; narration only EMPHASISES (highlight, grow, colour, shake, tick, count-up, "?" flipping to the number). Bars start at a visible baseline. 3-part layout (character + main object + label/number) filling the frame.
- No emoji in SVG text. No real logos (text names are fine). Never put the owner's email anywhere.
- `w(beat, word, nth)` only with words really spoken in that beat (lowercased, punctuation stripped).

## NOTHING runs on the owner's PC except editing text + `npx tsc` (disk is full)
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

## Files YOU may create/edit (only these)
- `pipeline/episodes/epNN.json` (with `spine`)
- `src/episodes/EpNN.tsx` exporting `EpNN`
- `src/propsNN.tsx` (new props; never edit other props files)
- `src/v2/tNN.tsx` exporting `V2EpNN`
- `pipeline/seo_epNN.json`: title, alts [2], thumb_text (the <= 3 words on thumbnail A; run `py pipeline/package_lint.py epNN`, must print OK), line1 (≤150 chars), summary, learn [6], tags [11, last = "dave explains money"], hashtags [3], pinned (easy-to-answer question), thumb ("A"/"B"/"C"), thumb_question, next (null)
- `../videos/epNN/v2/*` (downloaded thumbnails, small PNGs only — never download videos)
Do NOT edit: Episode.tsx, Root.tsx, v2/index.tsx, kit.tsx, seo.py, fx.tsx, other props, PLAYBOOK, other episodes, workflows.

## Workflow
research (overlap episodes first) → `spine` → JSON script (v3) → self-check banned phrases + BUT/SO/THEREFORE → push JSON → cloud TTS → duration ≥ 500 s (else extend, repeat) → EpNN.tsx (+ propsNN) → validate OK → tsc clean → push → cloud QA until 0 flagged → tNN.tsx → cloud thumbs until tests pass → seo_epNN.json → push → final report.

## Final report (keep it short)
Files, duration, QA result (0 flagged), validate OK, tsc clean, SFX list checked, the 3 thumbnail concepts + their thumb_question, the §0.7 pre-flight checklist with ✓, and any concerns.
