# UPGRADE.md — master prompt: upgrade an existing long episode with FEW tokens

**Owner starts a chat (claude.ai, GitHub repo `hamlou/moneyworks` connected) with:**
> Read UPGRADE.md in my repo and follow it. Upgrade ep17.

Claude, this file is everything you need. Follow it exactly.

## 0. Token budget (most important — the owner is on the free plan)
- Read ONLY: this file + `pipeline/episodes/epNN.json` (the episode). Optional: `pipeline/seo_epNN.json` for the title.
- NEVER open `src/`, `PLAYBOOK_*.md`, `AGENT_BRIEF.md`, other episodes, workflows or Python. You don't need them: the code already reads the fields below.
- No research essays, no plan, no questions, no explanation before the output. Think briefly, then write the files.
- Output = exactly **2 code blocks**: (1) the full new `pipeline/episodes/epNN.json`, (2) the full `pipeline/photos/epNN.json`. Then the 6-line "what to click" list from §5. Nothing else.
- If your reply is about to cut off: stop right after a complete beat `},` and write `CONTINUE FROM <next beat id>`. When the owner says "continue", go on in a new code block from that beat. The owner pastes the parts one after another.

## 0b. Fixed choices (owner, 18 Oct 2026)
- **Voice = Chatterbox** (owner: "very human"). Put `"voice": "chatterbox"` at the top level of the JSON. It speaks fast (~230 words/min): write **1,750–2,000 words** for ~9–10 min. A beat may carry `"exag": 0.6` (more emotion, max 0.7) on 3–6 big moments; default 0.5.
- **Dave = the new big-head Dave** (channel avatar). Nothing to do in the JSON: the code already draws him.
- Worked example: `pipeline/episodes/ep17.json` (the first upgrade). Read it ONLY if you are unsure of the format.

## 1. What the upgrade is
Same topic, same story idea and same `youtube`/`sources` blocks. You rewrite the **spoken script** and add **visual fields** to the beats. The old cartoon still plays underneath; the new fields lay real photos, memes, big words and "Dave talks to camera" scenes on top. No code is changed.

Why: viewers left in the first 30 s. Old episodes open with stats and an agenda ("Today: X, Y and Z"), have commas everywhere (robot voice), 9 chapter cards (exit doors), no real photos and no memes, and are under 10 min.

## 2. The voice — Dave is the HOST talking to YOU
- **Dave is the speaker.** He talks in the first person, straight to the viewer, like a friend on FaceTime: "Okay listen. You've done this. I've done this." Not a narrator describing "Dave". Stories about other people are told BY Dave ("My buddy Mike…", "There's this guy in Ohio…").
- **About the viewer's life, not a documentary.** Every beat answers "could this happen to ME?". Use the viewer's real moments: the payday Friday, the phone notification, the "just one more", the bill at 2 am.
- **Almost no stats.** Max ONE number every ~30 s and only when it hits the viewer personally ("that's your rent for two months"). Never "X billion dollars per year" lists. A number that doesn't make the viewer feel something → delete it.
- **No commas** in any `text`. Join with and / but / so / because / which means / then. No dashes, colons, semicolons or "…" as a comma replacement. Max 20 % 1–3-word fragments.
- Contractions always (you're, didn't, that's). Read each line as if you were saying it out loud to a friend.
- Ask the viewer things: "Be honest." "Guess before I tell you." "Pick one. A or B." Two such games per video.
- A laugh every ~30 s (Dave's reaction, a silly comparison). One running gag that returns 3 times and pays off at the end.

## 2b. THE STYLE TO COPY (owner's favourite videos, analysed 18 Oct 2026)
**Voice + script = "Can I Go VIRAL In 7 Days?" (Erthlord, 103K views).** Dave tells HIS OWN adventure like a funny friend. Copy these moves:
- **Opens on Dave's personal problem in 3 words**, then the challenge: "I have a problem. I'm broke." → "So for the next ten minutes I'm going to try to beat a casino with five hundred dollars." A clear GOAL + a DEADLINE + a SCOREBOARD the viewer can follow ("only 4,998 to go").
- **Self-roast gags:** "I'm a very creative person so I named it Dave's Fund. I couldn't think of anything else."
- **Say it, then do the opposite:** "I would never do something that dumb right? … I'm doing something that dumb."
- **Good news / bad news** with the same fact: "The good news is I've got forty-nine dollars. The bad news is I've got forty-nine dollars."
- **Tiny reaction lines** to fake chat/comments ("this is so fake") and to the viewer ("What do you mean it's stupid?").
- **Progress check-ins** ("Day two." "One hour later.") with a scoreboard number that matters to the GOAL, never a random stat.
- **A soft serious beat at ~70 %** ("does any of this even matter?") → "Yeah whatever. Back to the casino." Then the ending answers the title question in one word: "Can you beat a casino? No."
- Numbers are only the scoreboard of Dave's own story. Real-world facts enter as "so I looked it up and…" (one line), never as a lecture.

**Hook = "Grox tutorial" (v1) + "This is me two years ago" (v2).** Both beat ours by far:
- 0–5 s: proof the viewer WANTS this: a flood of fake comments/notifications ("make a video about this!!") or "This is me [time] ago" + the sad scoreboard (10 views / $0).
- 5–15 s: one sentence promise + **show the end result** ("at the end of this video I'll [do X] live").
- 15–25 s: the objection killer ("most people think it's impossible… it's actually easy") or the dare ("most people won't watch to the end… if you do you're ahead of 99 %").
- **Edit pace:** a new visual every ~1 s in the hook (v1 has 30 changes in 30 s), every ~4 s in the body (v3: 123 cuts in 9 min). Kinetic words center screen, one key word in red/yellow, a red underline, arrows pointing.

**Sound (v3):** a meme sound on every joke: `boom` (vine boom on a punchline/close-up), `scratch` (record scratch on "wait what"), `drumroll` before a reveal, `trombone` on a fail, `cricket` on silence/awkward, `crowd` on a win, `riser` before a big moment, `ding` on a scoreboard update. Silence + black card is a joke too ("Hopefully.").

## 3. Structure (keep it simple)
- **Hook = beats `o1`…`o5`**, ≤ 25 s, ≤ 75 words, ids MUST start with `o` (they get the fast hook voice). Jobs, in any order:
  1. o1 = ONE flowing sentence to "you" that confirms the title and hits the viewer's own life. No stats in o1.
  2. Stakes: what it costs YOU, one concrete loss.
  3. How the video ends: name or show the result ("by the end of this you'll spot this trick in two seconds"). Never "stay to the end", never "Today we'll cover X Y Z".
  4. Last hook line = an open question the video answers late.
- Body = ONE story that moves forward with BUT / SO / THEREFORE. Every section ends on a "but…" cliffhanger line.
- **Chapter cards:** keep max 4 `"chapter"` fields, and each title is a curiosity phrase ("The trick on the carpet"), not a topic ("Casino Math"). Delete the other `"chapter"` keys.
- Re-hook every 60–90 s ("and that's when I noticed something weird…"). At ~75 % a low point, then the fix as things the viewer can DO.
- End: Dave's 3 quick lessons in ≤ 15 s → tease the next video as a new problem → a subscribe joke.
- **Length: 1,750–2,000 words** (Chatterbox ≈ 9–10 min). Fill with stories and viewer scenes, never repetition.
- Add at the top level: `"tts": {"rate": "-5%", "hook_rate": "+3%", "lead": 0.08}`. Give ≥ 8 beats their own `"rate"` (excited `"+6%"`, slow reveal `"-12%"`). Beat `"pause"` 0.2–0.4 (hook 0.15).

## 4. Beat fields (the visuals) — the code reads these
```json
{"id": "o1", "text": "...", "host": true, "mood": "shock", "pose": "point_r", "pic": "strip", "slam": "YOUR PAYCHECK"}
```
| Field | What it does | Values |
|---|---|---|
| `host` | Full-screen scene: big Dave talking straight to camera + big word-by-word captions. Covers the old cartoon. | `true` |
| `bg` | Like `host` but in front of a real photo background (a real place). | photo id |
| `mood` | Dave's face in host scenes | neutral happy grin sad shock worried smug think tired suspicious angry money scream |
| `pose` | Dave's body in host scenes (optional, auto otherwise) | talk present point_r point_l point_up shrug hips think facepalm celebrate panic thumbs wave |
| `pic` | A real photo pops in (beside Dave in host scenes, top-left/right over the cartoon otherwise). | `"id"` or `{"id": "x", "look": "polaroid\|tape\|news\|sticker\|circle\|plain", "label": "Las Vegas 2024"}` |
| `meme` | A meme card redrawn with our cast (center, 5 s). | `{"t": "drake", "a": "no line", "b": "yes line"}` · `{"t": "brain", "a", "b", "c"}` · `{"t": "buttons", "a", "b"}` · `{"t": "fine", "a"}` · `{"t": "stonks", "a"}` · `{"t": "vs", "a", "b"}` |
| `slam` | Giant yellow kinetic word(s), ≤ 3 words. | `"ALL IN"` |
| `sfx` | A sound at the start of the beat (overrides the default). | `boom` `scratch` `drumroll` `riser` `trombone` `cricket` `crowd` `ding` `cash` `boing` `quack` `sting` `thud` `pop` · owner pack: `pack/01_boom` (big cinematic hit) `pack/03_evolve_boom_brass_d` (dramatic brass) `pack/01_evolve_brassy_swell` (build-up) `pack/02_evolve_brassy_drop_2` (drop) `pack/02_deep` (deep impact) `pack/01_beating` (heartbeat tension) `pack/01_processing` (computer thinking) `pack/02_dial_up` (old internet) `pack/camera_shutter` (photo snap) `pack/001` `pack/002` |
| `zoom` | Comedy punch-in on Dave's face (host beats) + vine boom. Use on punchlines. | `true` |
| `card` | Full-screen title card (white), covers everything; `dark` = black card. Use for "THE PLAN", "Day 2", "Hopefully.", "One hour later". | `"THE PLAN"` or `{"t": "Hopefully.", "dark": true}` |

**Rules for using them:**
- **The whole hook (`o1`–`o5`) is `host` or `bg`**, with a `pic` in o1 and a `slam` on the stakes beat.
- **≥ 40 % of all beats are `host`/`bg`.** Any beat whose new text no longer matches what the old cartoon showed MUST be `host`/`bg` (when unsure: make it host).
- **Beat ids:** keep the old id when the beat keeps its meaning. New beats get new ids `n1`, `n2`… and MUST be `host` or `bg`. Deleting beats is fine.
- **A new `pic` about every 12 s** (≈ every 2nd beat) → 40–55 photos. Each photo id is used ONCE. Never two `pic` beats in a row with the same `look`.
- **A `meme` about every 30 s** (≈ every 5th beat) → 15–20 memes, text ≤ 7 words per line, funny and about the viewer.
- Never a `meme` and a `pic` on the same non-host beat.
- All sounds are normalised to −24 LUFS, under the voice: never stack more than 1 `sfx` per beat.
- **`sfx` on ≥ 1 beat in 3** (every joke gets a sound). `zoom` on 6–10 punchlines. `card` 5–8 times (one short beat each: the card text IS the spoken line, ≤ 4 words).

## 5. Photo manifest `pipeline/photos/epNN.json`
```json
{"photos": [
 {"id": "strip", "q": "Las Vegas Strip night"},
 {"id": "slot", "q": "slot machines casino"}
]}
```
- One entry per photo id used in the episode (`pic` and `bg`). ids: lowercase letters/digits/underscore.
- `q` = 2–4 plain English words naming a REAL thing that exists on Wikimedia Commons: a place, a company's store, a famous person, an object ("credit card", "roulette wheel", "Times Square"). Never abstract ideas ("sadness", "debt problem") — show those with `host` + `mood` instead.
- The cloud picks the first free-licence photo automatically. Real people: public figures only, in a factual context.

**What the owner clicks after you answer (copy this list at the end of your reply, with the episode id filled in):**
1. github.com/hamlou/moneyworks → `pipeline/episodes/epNN.json` → ✏️ → select all → paste block 1 → Commit.
2. `pipeline/photos/` → Add file → Create new file → name `epNN.json` → paste block 2 → Commit.
3. Actions → **photos** → Run workflow → `epNN` → wait for ✅ (if ❌ "no free photo for X": tell Claude, it gives a simpler `q`).
4. Actions → **voice** → Run workflow → `epNN` → wait ✅ (~30–60 min, Chatterbox). Re-run it after ANY change to a beat's `text`; visual-only changes don't need it.
5. Actions → **check** must be ✅ (if ❌ paste its error to Claude).
6. Actions → **render** → Run workflow → `epNN`, chunks `10` → wait ✅ (~20–40 min).
7. Open the render run → download artifact `epNN-video` → watch the first 60 s before uploading.

## 6. Self-check before you output (silently, don't print it)
- [ ] It's Dave's own adventure with a GOAL + scoreboard (§2b); self-roast, say-then-opposite, good news/bad news all used.
- [ ] Dave speaks in first person to "you" the whole time; no beat starts with "Dave …" as a narrator.
- [ ] Zero commas in every `text`; hook ≤ 75 words with no stats in o1 and no agenda.
- [ ] ≤ 1 number per ~30 s; every number translated into the viewer's life.
- [ ] 1,550–1,750 words; ≤ 4 chapter cards with curiosity titles.
- [ ] Hook all host/bg; ≥ 40 % host/bg; every new `n*` beat host/bg.
- [ ] pic every ~2nd beat, each id once and listed in the manifest; meme every ~5th beat.
- [ ] Valid JSON (double quotes, no trailing commas between items… the JSON commas are fine, only the spoken `text` has none).
