# UPGRADE.md — master prompt: upgrade an existing long episode (cheap on tokens)

**Owner starts a chat on claude.ai (repo `hamlou/moneyworks` connected) with:** `Read UPGRADE.md in my repo and follow it. Upgrade ep52.`

## ★ v6 STYLE (owner, 23 Oct 2026) — overrides §2–§4 below where they conflict
Copy the delivery of the owner's reference video "I posted SLEEPING VIDEOS for 30 days" (never copy its words, voice or character):
- **Dave's experiment.** The episode becomes Dave trying the topic himself: goal + deadline + scoreboard said by 0:45 ("I gave myself 30 days and $500 to beat a casino"). Chapters = time steps (`"Day 1"`, `"Week 2"`, `"The Results"`), up to 10. Facts appear only as tools/obstacles Dave hits. Real-world numbers stay real and sourced; never present an invented result as real data.
- **Writing:** long run-on sentences joined with and/so/but/which then a 1–3 word punch ("Ew." "Yuck." "Perfect."). One fake-out ("…is what I would have said if…"). Dave predicts wrong ≥ 3 times and admits it. Every number gets an absurd real comparison ("that's half what a peasant made in the 1700s"). ≥ 2 direct questions to the viewer with a silence after. Plant 2 callbacks and pay them late. One "Dave goes away" break near 70 % (`card` beats + photos, almost no words). End with the final scoreboard + ONE honest lesson + Dave's sign-off line. Still zero commas.
- **Voice (fixes the robot sound):** add `"cb": {"cfg": 0.35, "exag": 0.5}` at top level. Beats = breath groups of 25–60 words (2–4 sentences of one thought); visuals inside a beat use `at` words. `"pause"`: 0.1 when the next beat continues the thought, 0.35 between thoughts, 0.8–1.2 before a punchline/reaction/fake-out reveal, 1.5 before a time skip. `"exag"` 0.45 dry asides, 0.6–0.7 hype lines. Target 180–200 words per minute.
- **Length:** 2,500–3,300 words (≈ 13–18 min). The hook may run to 60 s but sentence one states the concept to "you" and the first 20 s show a jaw-drop real proof with a `pic`/`bg`.
- **Visual with today's fields:** `meme` is retired (use `slam` + `sfx` "boom" as a comic gag every 25–40 s instead). Every scoreboard number = a `slam` on its word. `pic` looks: only `plain` or `news`. Chapter = time-step title. The full v6 look (3D Dave, UI cards, scoreboard TV, no captions) comes with the v6 kit — see `STYLE_3D.md` §7–§8 (you don't need to read it).

## 0. Budget rules (free plan — obey strictly)
- Read ONLY this file + `pipeline/episodes/epNN.json`. Never open `src/`, playbooks, other episodes, workflows or Python. If unsure of the format, skim `pipeline/episodes/ep17.json` (finished example) — first 40 lines only.
- No plan, no questions, no explanations. Output exactly: **block 1** = full new `pipeline/episodes/epNN.json`, **block 2** = full `pipeline/photos/epNN.json`, then the click list (§6). Nothing else.
- If the reply will cut off: stop after a complete beat `},` and write `CONTINUE FROM <beat id>`. On "continue", resume in a new code block from that beat. The owner pastes the parts one after another.

## 1. What you change
Same topic and story idea; keep `id`, `title`, `sources`, `youtube` as they are (you may append sources). Rewrite every beat's `text` and add the visual fields (§4). The old cartoon keeps playing under/beside the new layer. Add at top level: `"voice": "chatterbox"`.

## 2. Voice + script (copy the owner's favourite: "Can I Go VIRAL In 7 Days?")
- **Dave is the host**, first person, talking to "you" like a funny friend. It's Dave's OWN adventure with a **goal + deadline + scoreboard** ("I have $500 and one night"). Other people's stories are told by Dave ("So I looked it up and…").
- About the viewer's life, never a documentary. Max **one number per ~30 s**, always translated into the viewer's life. No stat lists.
- **Zero commas** in any `text` (also no dashes/colons/semicolons/"…" instead). Join with and / but / so / because / then. Contractions always. ≤ 20 % fragments.
- Joke moves to use every episode: self-roast ("I'm a very smart person so I named it the Dave Method. I couldn't think of anything else."), say-then-opposite, good news / bad news with the same fact, reaction lines, "Be honest. You've done this.", a 3-second guess, one real story with a real person/place, a short serious beat at ~70 % → "Yeah whatever.", ending answers the title in ONE word ("So can you beat a casino?" → card "No.").
- **Length 1,750–2,000 words** (Chatterbox talks fast: ≈ 9–10 min). `"pause"` 0.3 normal, 0.15 in the hook, 0.5 after a punchline. `"exag": 0.6` on 3–6 big emotional lines (default 0.5, max 0.7).

## 3. Structure
- **Hook `o1`–`o5`** (ids must start with `o`), ≤ 25 s, ≤ 75 words, all `host` or `card`:
  0–5 s Dave + real photo + the personal problem/goal ("This is me last Friday with $500 and one plan which was to win.") → a dark `card` gag ("Spoiler.") → promise the ending ("By the end of this you'll see exactly where my money went and the one trick…") → the dare ("Most people click off before that part which is exactly what [villain] wants.").
- Body = ONE story moving forward with BUT / SO / THEREFORE; every section ends on a cliffhanger. Re-hook every 60–90 s. Low point at ~75 %, then 3–4 things the viewer can DO, then the payoff of the hook promise, one-word answer card, next-episode tease as Dave's new problem, subscribe joke.
- Max **4** `"chapter"` fields, curiosity titles, none in the first 60 s.
- Beat ids: keep an old id when the beat keeps its meaning; new beats get `n1`, `n2`…. **New beats must be `host` or `card`, or carry a `pic`/`meme`.** Deleting beats is fine.

## 4. Beat fields (the code already reads them)
```json
{"id": "c2e", "text": "So every time I play the wheel quietly keeps five cents of every dollar.",
 "host": true, "mood": "angry", "pose": "point_r",
 "pic": {"id": "toll_booth", "look": "news", "label": "the toll", "at": "keeps"},
 "slam": {"t": "5¢ TOLL", "at": "five"},
 "zoom": {"in": "quietly", "out": "dollar"},
 "sfx": [{"s": "stamp", "at": "keeps"}, {"s": "cash", "at": "dollar"}]}
```
| Field | Effect | Values |
|---|---|---|
| `host` | Full screen: big Dave facing camera + word captions; camera re-frames on each sentence start | `true` |
| `bg` | Like host, in front of a real photo | photo id |
| `card` | Full-screen title card (≤ 4 words, = the spoken line) | `"THE PLAN"` or `{"t": "No.", "dark": true}` |
| `mood` | Dave's face | neutral happy grin sad shock worried smug think tired suspicious angry money scream |
| `pose` | Dave's body | talk present point_r point_l point_up shrug hips think facepalm celebrate panic thumbs wave |
| `pic` | Real photo. In host beats: beside Dave. In other beats: the cartoon slides into a left panel, photo on the right — nothing is hidden | `{"id", "look": polaroid\|tape\|news\|sticker\|circle\|plain, "label", "at": "word"}` |
| `meme` | Meme card with our cast (same right panel) | `{"t": drake\|brain\|buttons\|fine\|stonks\|vs, "a", "b", "c", "at": "word"}` |
| `slam` | Giant yellow word(s), ≤ 3 words | `{"t": "ALL IN", "at": "word"}` |
| `zoom` | Comedy punch-in on Dave's face (host beats only) + boom | `{"in": "word", "out": "word"}` |
| `sfx` | Sounds, each on its word | `[{"s": "name", "at": "word"}]` |

**`at` = a word that is literally in that beat's `text`** (exact spelling, `"word#2"` for its 2nd time). Everything lands ON that word — this is mandatory for every `pic`, `meme`, `slam`, `zoom` and `sfx`.

**Timing rules (owner's feedback on ep17):**
- **A photo shows exactly the thing being said at its `at` word.** Pick the noun first ("roulette wheel" → `at: "wheel"`), then search a photo of THAT noun. If no concrete noun is spoken in the beat → no photo there.
- **Zoom in on the punch word and out on the last word of the joke** ("not THIS time": `in: "this"`, `out: "time"`). Never a zoom without a joke. 6–10 per video.
- **Sound effects: many, but every one earns its place** — it must illustrate the word it sits on. ≥ 1 per beat on average (≈ 90–120 per video), never two on the same word, never on a calm explanatory word.

| Sound | Put it on… |
|---|---|
| `boom` | a punchline / deadpan reveal |
| `scratch` | "wait…", a sudden stop, a contradiction |
| `drumroll` → `crowd` | before a reveal → the reveal/win |
| `trombone` | a fail (it's quiet on purpose) |
| `cricket` | awkward silence, nobody reacts |
| `ding` | scoreboard update, a good idea, a list item |
| `cash` / `coin` | money gained or spent |
| `stamp` / `thud` | a rule, a fact landing, "No." |
| `pop` / `boing` / `quack` | silly things, cartoon moments |
| `tick` | time, clocks, "guess before I tell you" |
| `whoosh` / `flip` / `paper` | moving to a new place or thing |
| `sting` | danger, a villain reveal |
| `pack/01_beating` | tension, risk | 
| `pack/01_processing` / `pack/02_dial_up` | thinking, computers, "so I looked it up" |
| `pack/01_evolve_brassy_swell` → `pack/02_evolve_brassy_drop_2` | build-up → letdown |
| `pack/03_evolve_boom_brass_d` / `pack/02_deep` / `pack/01_boom` | huge dramatic moment |
| `pack/camera_shutter` | a photo appears that is a "picture" (selfie, snapshot) |
| `riser` | the line before a big moment |

**Density per video:** hook all host/card · ≥ 40 % beats host/bg/card · a `pic` about every 12 s (≈ every 2nd beat, 40–55 photos, each id once) · a `meme` about every 30 s (15–20) · `card` 5–8 · never a `meme` and a `pic` on the same beat.

## 5. Photo manifest `pipeline/photos/epNN.json`
```json
{"photos": [{"id": "toll_booth", "q": "toll booth"}, {"id": "strip", "q": "Las Vegas Strip night"}]}
```
One entry per photo id used. `q` = 2–4 plain English words naming a REAL, concrete thing (place, building, object, famous person, animal) — the same noun as the `at` word. Never abstract ("debt", "sadness") and never a person who is not world-famous (search fails → wrong photo). The cloud takes the first free-licence Wikimedia photo whose name contains those words.

## 6. What the owner clicks (paste this list, with the id filled in)
1. github.com/hamlou/moneyworks → `pipeline/episodes/epNN.json` → ✏️ → select all → paste block 1 → Commit.
2. `pipeline/photos/` → Add file → Create new file `epNN.json` → paste block 2 → Commit.
3. Actions → **photos** → Run → `epNN` → ✅ (❌ "no free photo for X" → ask Claude for a simpler `q`).
4. Actions → **voice** → Run → `epNN` → ✅ (~30–60 min). Re-run after ANY change to a `text`.
5. Actions → **check** ✅ (❌ → paste the error to Claude).
6. Actions → **render** → Run → `epNN`, chunks `10` → ✅ → open the run → download `epNN-video` → watch the first 60 s.

## 7. Silent self-check before output
v6 first: experiment format + Day/Week chapters · `cb` block · breath-group beats 25–60 words · varied pauses · 2,500–3,300 words · no `meme` · fake-out + callbacks + viewer questions + break + sign-off. Then (where not overridden):
Dave first person to "you" the whole time · zero commas · hook ≤ 75 words, no stats, no agenda · 1,750–2,000 words · every pic/meme/slam/zoom/sfx has an `at` word that exists in its beat · every photo shows the spoken noun · sounds ≥ 1 per beat, each meaningful · new `n*` beats are host/card or carry pic/meme · ≤ 4 chapters · valid JSON.
