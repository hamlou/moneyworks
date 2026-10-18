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
- **Length: 1,550–1,750 words** (≈ 10–12 min). Fill with stories and viewer scenes, never repetition.
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

**Rules for using them:**
- **The whole hook (`o1`–`o5`) is `host` or `bg`**, with a `pic` in o1 and a `slam` on the stakes beat.
- **≥ 40 % of all beats are `host`/`bg`.** Any beat whose new text no longer matches what the old cartoon showed MUST be `host`/`bg` (when unsure: make it host).
- **Beat ids:** keep the old id when the beat keeps its meaning. New beats get new ids `n1`, `n2`… and MUST be `host` or `bg`. Deleting beats is fine.
- **A new `pic` about every 12 s** (≈ every 2nd beat) → 40–55 photos. Each photo id is used ONCE. Never two `pic` beats in a row with the same `look`.
- **A `meme` about every 30 s** (≈ every 5th beat) → 15–20 memes, text ≤ 7 words per line, funny and about the viewer.
- Never a `meme` and a `pic` on the same non-host beat.

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
4. Actions → **check** must be ✅ (if ❌ paste its error to Claude).
5. Actions → **render** → Run workflow → `epNN`, chunks `10` → wait ✅ (~20–40 min).
6. Open the render run → download artifact `epNN-video` → watch the first 60 s before uploading.

## 6. Self-check before you output (silently, don't print it)
- [ ] Dave speaks in first person to "you" the whole time; no beat starts with "Dave …" as a narrator.
- [ ] Zero commas in every `text`; hook ≤ 75 words with no stats in o1 and no agenda.
- [ ] ≤ 1 number per ~30 s; every number translated into the viewer's life.
- [ ] 1,550–1,750 words; ≤ 4 chapter cards with curiosity titles.
- [ ] Hook all host/bg; ≥ 40 % host/bg; every new `n*` beat host/bg.
- [ ] pic every ~2nd beat, each id once and listed in the manifest; meme every ~5th beat.
- [ ] Valid JSON (double quotes, no trailing commas between items… the JSON commas are fine, only the spoken `text` has none).
