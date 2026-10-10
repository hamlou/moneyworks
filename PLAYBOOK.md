# MONEYWORKS PLAYBOOK — how every video is made

This is the bible for the channel. Series 1 (ep01–ep10) was approved by the owner as **"exactly the style I was looking for for years"**. Every new episode must match it. Read this fully before writing anything.

> **§0.10 (Human hook + mixed media v4, 10 Oct 2026) is the newest rule set: it overrides §0.3 (the freeze/rewind hook is retired) and sets 10 min+, real photos and the spoken style.**
>
> **Since ep61, §0 (Retention & CTR v3) OVERRIDES any older rule below that conflicts with it.** The look, cast, voice, research standard, SFX, props and pipeline stay exactly the same. What changes: how the script is *told* (one connected story, not a list of facts), how the hook is *animated*, and how thumbnails are *designed*.

---

## 0. RETENTION & CTR v3 (owner, Oct 2026) — READ THIS FIRST

### 0.1 Why we changed (diagnosis of ep01–ep60)

The owner's data: **viewers don't finish the videos, they get bored**, and **thumbnails don't make people click**. Reading the 60 scripts and thumbnails, the causes are clear:

| Problem in ep01–60 | Why viewers leave | v3 fix |
|---|---|---|
| Hook ends with **"Today: X, Y, and Z."** | It's a table of contents. The viewer now knows the answer's shape, so there's no mystery left to stay for. | Hook ends on an **unanswered question + a withheld payoff** (§0.3). Never list the agenda. |
| Chapters are **topic buckets** ("The Average Bill", "Gray Divorce", "Who Profits?"). Each opens with "Let's start with…", "Next…", "Here are three more, quickly." | It's an encyclopedia. Nothing connects chapter 3 to chapter 4, so leaving costs nothing. | One **story spine**: every chapter is the next step of *Dave's* problem, joined by **BUT / SO / THEREFORE** (§0.2). |
| Facts are dropped because they are true, not because the story needs them. | Facts without stakes = boredom. | **Fact test:** each fact is a *clue*, an *obstacle* or a *weapon* for Dave. If it doesn't change what Dave does next → cut it. |
| 9 black "CHAPTER 7" cards. | Each card tells the viewer "this is a break, and there are 2 more sections". It's the perfect moment to leave. | Chapter titles become **questions / cliffhanger phrases** (§0.4). The card arrives *after* a cliffhanger line, never after a closed topic. |
| "Now You Know" + **"So let's recap."** at ~88 %. | Everyone knows a recap = the end. They leave and the video is scored as "not finished". | Recap ≤ 15 s, told as **"what Dave learned"**, AFTER the final payoff, and the big payoff is held until the last ~60 s (§0.2 Act 3). |
| Thumbnails: **same template every time** (floating Dave head left, object right, rays, 2 words top right). | Viewers' brains learn the template and scroll past ("seen it"). Small objects/tiny text are unreadable on a phone. Nothing is *happening*, so there's no question to click for. | 5 thumbnail **concepts** that each tell a tiny story, a different layout every time, giant readable subject (§0.6). |

### 0.2 The story spine (MANDATORY for every episode)

Every video is **one story about Dave** with a goal, rising trouble, a villain reveal, a low point and a win. The money facts are the *plot*, not a lecture. Fill this table in the JSON's `"spine"` field before writing any beat:

```json
"spine": {
  "goal": "Dave wants ... (concrete, with a number)",
  "stakes": "If he fails he loses $X / can't ...",
  "central_question": "The ONE mystery the whole video answers (e.g. 'Where did Bob's $4,000 actually go?')",
  "loop_big": "Payoff promised in the hook, paid at ~90 % (e.g. 'the one sentence that got Dave $600 back')",
  "loop_mid": "Opened ~30 %, paid ~60 % (e.g. a 'pause and guess' number)",
  "villain": "Who profits (revealed at ~50 %, not before)",
  "low_point": "~75 %: the moment it looks hopeless for Dave",
  "win": "How Dave fights back (the practical chapter) + his final number"
}
```

**Act structure (≈ 9 min, ~1,300 words, 8–9 chapters):**

| Time | Part | What happens | Retention device |
|---|---|---|---|
| 0:00–0:30 | **Hook** (`o1…o6`) | Flash-forward to Dave's worst moment → "how did he get here?" → stakes number → central question → withheld payoff. | Big open loop. Must match the thumbnail in the first 3 s. |
| 0:30–3:00 | **Act 1** (ch 1–3) | Dave tries the obvious thing. It fails. He finds clue #1, then clue #2. | Each chapter ends on a "but…" line. **Pause-and-guess** at ~2:30 (answer at ~4:30). |
| ~3:00 | **Re-hook 30 %** | "And that's when Dave noticed something on page two." | Opens the next mystery before closing the last one. |
| 3:00–6:00 | **Act 2** (ch 4–6) | Dave digs. **Villain reveal at ~50 %** (who profits, official numbers). Stakes rise. Myth-bust = Dave's own wrong belief ("Dave thought… Nope."). | `SubReminder` right after the villain reveal. **Damage Meter** keeps climbing. |
| ~6:30 | **Low point 75 %** | It looks hopeless / worse than we thought. | Re-hook: "But there's one thing the [villain] really doesn't want you to know." |
| 6:30–8:30 | **Act 3** (ch 7–8) | Dave fights back = the practical fix ("education, not advice"), shown as Dave DOING each step, each with a result number. | Damage Meter flips to **SAVED $X**. |
| ~8:30 | **Big payoff** | Close `loop_big` (the thing promised at 0:20). Best line of the video lives here. | — |
| last ≤ 25 s | **Outro** | "What Dave learned" in 3 one-line points (≤ 15 s) → next episode teased **as Dave's next problem** (a cliffhanger, not a topic) → subscribe joke. | End screen over the teaser. |

**The BUT/SO/THEREFORE rule (South Park writers' rule):** read the beats in order; between any two chapters (and between most beats) you must be able to insert **"but"**, **"so"** or **"therefore/which means"**. If the only possible link is **"and then"** or **"also"**, the script is a list → rewrite.

**Every chapter:**
- opens with Dave *doing* something (not "Let's look at…"),
- contains one silly analogy (unchanged rule),
- **ends with a cliffhanger line** that raises the next question, e.g. *"Fifty cents. But the bank wasn't sitting on Dave's money. It was doing something much sneakier with it."*

**Banned phrases** (the validator-in-your-head): "Today: …", "In this video…", "Let's start with…", "Next,", "Here are three more, quickly", "Another reason is", "So let's recap", "That's it", "In conclusion", "Before we wrap up", "Let's talk about". **Use instead:** "But here's the weird part…", "So Dave did the obvious thing…", "Which means…", "And that's exactly what they were counting on.", "Remember that number. It comes back."

**Lists:** never more than 3 items, and each item is *dramatized* (Dave tries it / gets hit by it), never read out like a bullet list.

**Re-hooks:** at least one every 60–90 s. A re-hook = a short line that opens a NEW curiosity before the current one is closed ("Dave found the answer on page two. But it raised a scarier question.").

**Stakes callbacks:** repeat the central number at least 3 times (hook, middle, payoff) so the viewer never forgets what's at stake.

**Pause-and-guess (once, ~25–35 %):** "Quick guess. How much do you think the bank made from Dave's money? Write your number in the comments. The answer is in a minute." Show a `?` card with a ticking clock (`tick`). Pay it ~60 s later with a slam + `stamp`. (Also boosts comments.)

### 0.3 The hook — "next level" spec (beats `o1…o6`, 20–30 s, ≤ 85 words)

Script pattern (**Flash-forward → Rewind → Stakes → Question → Withheld payoff**):

1. **o1 — Flash-forward (0–4 s):** start at Dave's *worst* moment, mid-action. *"Dave's card just got declined. At his own wedding."* No setup, no "Have you ever…".
2. **o2 — Freeze + rewind (4–7 s):** *"Yep. That's Dave. How did a normal guy end up here? Let's rewind three months."*
3. **o3 — Relatable start (7–13 s):** Dave lives the everyday version of the problem the viewer has (the bill, the app, the tip screen). The viewer thinks "that's literally me".
4. **o4 — Stakes number (13–18 s):** the shocking official number, on screen as a giant counter.
5. **o5 — Central question (18–23 s):** *"So where did the money actually go? Because it didn't disappear. Somebody got it."*
6. **o6 — Withheld payoff (23–30 s):** promise something specific WITHOUT revealing it: *"By the end, you'll know who that somebody is, and the one sentence that got Dave six hundred dollars back."* (Never "Today: X, Y and Z.")

Animation rules for the hook (this is what makes it "another level"):
- **Frame 0 is already in motion**: no fade-in, no title, no empty board. Dave + the key object are on screen at frame 0, already moving (Cam push-in from 1.15 → 1.0 or a shake).
- **First 3 s = the thumbnail scene** (same object, same emotion, same color accent). The click promise is kept immediately — this is the #1 reason people stay past 30 s.
- **A new visual every 1.5–3 s** in the hook (cut, zoom, pop, object swap), each with an SFX. No shot longer than 3 s in the first 30 s.
- **Freeze-frame gag (o2):** freeze the o1 scene, desaturate it, white flash + `sting`, label "THAT'S DAVE" with an arrow. Then **rewind**: replay o1 backwards at 4× with `whoosh` + `flip`, and a "3 MONTHS EARLIER" stamp. Implementation: write the o1 scene as a function of a local frame `ff` so it can be frozen/reversed:
  ```tsx
  const o1Scene = (ff: number) => (<AbsoluteFill>…everything uses ff, not f…</AbsoluteFill>);
  scene(0, () => o1Scene(f));
  const FR = A('o2');                                   // freeze point
  scene(FR, () => <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}…label/arrow…</AbsoluteFill>);
  const RW = w('o2', 'rewind');                          // rewind on the word
  scene(RW, () => o1Scene(Math.max(0, FR - (f - RW) * 4)), false);
  ```
- **Slam number (o4):** the stakes number counts up like an odometer (`Math.round(lerp(0, N, ease(f, a, a + 20)))`) then lands with `stamp` + `shake` + Cam punch-in 1.0 → 1.12.
- **Villain silhouette tease (o5):** a dark shadow of the villain (raccoon/banker) slides in at the edge, face hidden by a "?" — revealed only at ~50 %.
- **Damage Meter appears in o4** (top-right HUD, see §0.5) and stays all video.
- Pauses: ≤ 0.3 s in the hook (unchanged auto-trim on `o*` beats).

### 0.4 Chapters, cards and pacing

- **Chapter titles = curiosity phrases or questions**, ≤ 5 words, that the viewer wants answered: "Where The $4,000 Went", "The Page-Two Trap", "Why The Bank Smiled", "Dave Fights Back". Never dry labels ("The Average Bill", "What the Law Says", "Now You Know").
- The chapter card comes **right after a cliffhanger line**, so the card feels like a TV "…to be continued", not an exit.
- Outro chapter title: "What Dave Learned" (not "Now You Know").
- **Pattern interrupt every 45–75 s**: change the format, not just the object — DreamFrame myth-bust, OldFilm flashback, raccoon cameo, pause-and-guess card, split-screen "Dave vs Bank", a phone-screen close-up, a fake "breaking news" strip. Never two Board scenes with a talking Dave in a row for more than ~20 s.
- Something still changes on screen every 3–6 s (unchanged) and every scene is full from its first frames (NO EMPTY SCENES rule unchanged).

### 0.5 Running devices (use in every episode)

- **Damage Meter**: small HUD card top-right (`x≈1700, y≈90`), label "DAVE'S DAMAGE", value = running total of what the problem has cost Dave so far. Each increase: number ticks up + `cash`. In Act 3 it flips to green **"SAVED $X"** with `chime`. It gives viewers a score they want to see finish. Hide it during chapter cards and the SubReminder; keep it clear of captions.
- **Clue board** (optional, for "who profits" topics): a cork board where each chapter pins one clue card; at the villain reveal, red string connects them to the villain's photo.
- **Callbacks** to earlier episodes (duck, raccoon) stay — they reward loyal viewers.

### 0.6 Thumbnails v3 — designed for ≥ 15 % CTR

Target: **CTR ≥ 15 %** on the first 48 h of impressions. (Honest note: channel averages are usually 2–10 %; 15 %+ is top-tier and only happens when concept + title + topic all hit. We get there by testing 3 *really different* concepts per video in YouTube **Test & Compare**, not 3 colour variants of one idea.)

**Research-backed principles** (eye-tracking: viewers lock on the dominant subject in ~0.4 s; ~78 % of views are mobile at ~320 px wide; < 4 words do better; emotion + face lifts CTR; YouTube widens distribution when early CTR is high):
1. **Concept > design.** A thumbnail must create a *question in the viewer's head* in < 1 s. Before drawing, write that question in `seo_epNN.json` → `"thumb_question"`. If you can't write it, the thumbnail is wrong.
2. **Something is about to happen** (visual cliffhanger) or **something is wrong** (contradiction). Static "face + object" with nothing happening is banned.
3. **One dominant subject ≥ 40 % of the frame**, max 3 focus areas total. No small objects, no text smaller than ~70 px (at 1280×720) anywhere — tiny labels inside props become mush on a phone.
4. **≤ 3 words**, never repeating the title; prefer a **number, a contradiction or a consequence** ("$4 → $28", "SIGNED IT.", "DAY 187"). Vague emotion words ("TRAPPED", "STILL PAYING", "CAN'T LEAVE") are banned unless paired with a concrete object that explains them.
5. **Break the template.** The last 60 thumbnails are all "Dave head left / object right / rays / text top-right". Every new thumbnail uses one of the 5 concepts below, and **no two consecutive episodes use the same concept or the same background colour.** Dave appears full-body *acting* (signing, swiping, holding the bill, running) or as a reaction head ≤ 30 % of the frame — not the same floating head every time.
6. **Contrast**: saturated subject on a darker/complementary background, thick white or black sticker outline (kit `Hero`), one red/yellow accent on the key detail (`Ring`/`ArrowCue`).
7. **Bottom-right stays empty** (timestamp). Text top or top-left.

**The 5 thumbnail concepts** (each A/B/C variant = a DIFFERENT concept):

| # | Concept | What's in it | Example (ep49 free trial) |
|---|---|---|---|
| 1 | **Dramatic irony** ("moment before") | Dave happily doing the everyday action; the danger is visible to the viewer but NOT to Dave (raccoon's hand in his wallet, a trapdoor under his chair, fine print growing like a monster). | Dave smiling, tapping "START FREE TRIAL"; behind the phone a raccoon holds a giant calendar marked "DAY 8: -$14.99". Text: "FREE?" |
| 2 | **Shocking contrast** | Same thing twice, two prices/outcomes, split stage, big arrow. | `SplitStage`: tiny "$0" phone (green) → huge "$74.95" receipt (red). Text none or "5 MONTHS". |
| 3 | **Your own screen** | A giant phone notification / bank statement / receipt that the viewer instantly recognises as *their* life, one huge readable line, red circle on it. No real logos. | Huge phone lock screen: notification "Payment of $14.99 successful" ×5 stacked, red ring on the 5th. Small shocked Dave peeking. |
| 4 | **Villain reveal** | The one who profits, big and smug, holding Dave's money; Dave small, shocked, in the background. | Banker/raccoon grinning, fanning five $14.99 bills. Text: "THEY PLANNED IT" |
| 5 | **Absurd metaphor** | One impossible, funny image that *is* the video's analogy (credit card in a mousetrap, a house on a fishing hook, a wallet with a leaking tap). | A credit card as cheese in a giant mousetrap labelled "FREE". |

**Mandatory thumbnail QA (do it every time, report the result):**
1. **Phone test:** downscale to 320×180 and 168×94 (`tools/ffmpeg/ffmpeg.exe -i thumb.png -vf scale=168:-1 t168.png`). You must be able to tell what is happening and read every word.
2. **Grid test:** place the new thumbnail in a 5×2 grid with the 9 previous episode thumbnails (ffmpeg `xstack`, as in the QA notes). It must be the one your eye goes to first. If it looks like its neighbours → redo.
3. **Question test:** say the `thumb_question` out loud. Would a broke 25-year-old want the answer?
4. **Title pair test:** title + thumbnail together = 1 + 1 = 3 (they add different info, never repeat).
5. **Promise test:** the thumbnail scene appears in the first 3 s of the video.

**After upload:** run Test & Compare with A/B/C. After 48 h, note the winning concept and its CTR in `pipeline/ctr_log.md` (episode, concept #, CTR, avg % viewed). Use the log to pick concepts for the next series — data beats taste.

### 0.7 Pre-flight checklist (paste in your final report, all must be ✓)

- [ ] `spine` filled; central question + `loop_big` + `loop_mid` + villain + low point + win.
- [ ] Hook ≤ 30 s, starts with a flash-forward, no "Today:" agenda, ends on a withheld payoff.
- [ ] Hook frame 0 in motion, first 3 s = thumbnail scene, freeze + rewind gag, slam number.
- [ ] BUT/SO/THEREFORE test passes between every chapter; no banned phrases (search the JSON).
- [ ] Every chapter ends with a cliffhanger line; chapter titles are curiosity phrases.
- [ ] Re-hook at ~30 %, villain reveal + SubReminder ~50 %, low point ~75 %, big payoff in last ~60 s.
- [ ] Pause-and-guess opened and paid; Damage Meter climbs and flips to SAVED.
- [ ] Recap ≤ 15 s as "What Dave learned"; next episode teased as Dave's next problem.
- [ ] 3 thumbnails = 3 different concepts; phone/grid/question/title-pair/promise tests passed.
- [ ] All the older rules still hold (sources, word count, ≥ 8:00, valid SFX, no empty scenes, tsc clean, QA 0 flagged).

### 0.8 Worked example — ep29 "Why Your Bank Pays You 0.01%" (old vs v3)

**OLD hook (38 s, ends with an agenda):** "Dave has five thousand dollars… paid him fifty cents… Today: where the rest goes, why banks get away with it, and where savers can earn way more."

**v3 hook (~26 s):**
- o1: "Dave just opened a letter from his bank. Congratulations, it says. You earned fifty cents."
- o2: "Yep. Fifty cents. For a whole year. How? Let's rewind."
- o3: "Five thousand dollars. Dave's whole emergency fund. Sitting in the same bank since he was eighteen."
- o4: "That same year, the bank earned about one hundred ninety five dollars on Dave's money. Without lending it to anyone."
- o5: "So who got the other one hundred ninety four dollars and fifty cents? And how did they do it without Dave noticing?"
- o6: "Stay to the end. Because Dave found a way to take it back. In twenty minutes."

**OLD chapters (topic buckets):** Dave's Fifty Cents → The Bank's Secret Markup → Three Jobs for Dave's Money → The Big Banks' Big Profits → Why Banks Get Away With It → Where Savers Earn More → CDs, Money Funds and T-Bills → Inflation Eats Savings → What Dave Did Next → Now You Know.

**v3 chapters (one story, BUT/SO/THEREFORE):**
1. **"Fifty Cents?!"** — Dave calls the bank to complain. The agent says "that's our standard rate". *BUT* the agent let slip one phrase: "net interest margin". → cliffhanger: "Dave had no idea what that meant. He was about to find out it was costing him two hundred dollars a year."
2. **"The Lemonade Trick"** — *SO* Dave looks it up: buy money cheap, sell it expensive (lemonade analogy, FDIC margin numbers). Pause-and-guess: "How much do you think U.S. banks made from that trick in just three months?" → cliffhanger: "*BUT* loans are risky. Dave's money was doing something with zero risk."
3. **"The Free Money Desk"** — interest on reserves at the Fed (lawnmower analogy). Damage Meter: −$194.50. → "*WHICH MEANS* the bank doesn't even need Dave's money to work hard. So why does it want it so badly?"
4. **"Why The Bank Smiled"** — villain reveal at ~50 %: $197B net interest income in one quarter; pay off the guess. SubReminder. → "*BUT* if it's this bad, why doesn't everyone just leave?"
5. **"Sticky Money"** — Dave tries to leave and feels the 3 traps (inertia, paycheck/bills, marble columns). Myth-bust: "Dave thought a big bank was safer. Nope." → "*SO* he decided to leave. *BUT* he almost made a very expensive mistake."
6. **"The App That Isn't a Bank"** — the low point (~75 %): Dave nearly moves his money to an app that isn't FDIC insured. → "That's when Dave learned the one word to check first."
7. **"Dave Fights Back"** — HYSA, CDs, T-bills, shown as Dave doing it (education, not advice). Damage Meter flips to "SAVED +$200/yr".
8. **"The Melting Ice Cream"** — payoff + twist: even 4 % only just beats inflation; why this still matters. Close `loop_big` ("twenty minutes").
9. **"What Dave Learned"** — 3 one-liners (≤ 15 s) → "Next time: Dave tries to buy his first home. The bank says yes. That's the problem." → subscribe joke.

Same facts, same sources, same length. The difference: every fact is now a step Dave has to take, and every chapter leaves a question open.

---

### 0.9 Feedback loop & growth (Oct 2026 — taken from youtube-agent-skill, adapted)

We compared our pipeline with `Jakeschincariol/youtube-agent-skill` (11 prompt-skills + 6 small scripts for talking-head creators). Our playbook already covers script, hook, thumbnails, SEO and chapters in more depth. What it had and we did NOT: **reading real data back**. `ctr_log.md` was empty after 60 episodes — we were writing rules from taste. Three tools were ported:

| Tool | When | Command |
|---|---|---|
| `pipeline/retention.py` | 48 h and 7 days after EVERY upload | `py pipeline/retention.py epNN retention.csv` (Studio → video → Analytics → Engagement → retention chart → download) |
| `pipeline/package_lint.py` | before thumbnails are drawn | `py pipeline/package_lint.py epNN` — needs `"thumb_text"` (the ≤ 3 words on thumbnail A) in `seo_epNN.json` |
| `pipeline/outliers.py` | before proposing topics to the owner | `py pipeline/outliers.py collected.json` — competitor videos ranked by multiple over their OWN channel median |

**Retention rule — ONE fix per video, not twenty:**
- `retention.py` names the beat id at every cliff and the worst chapter (% lost per minute). Paste its `ctr_log row` into `pipeline/ctr_log.md`.
- Hook leak > 25 % in the first 30 s → the next episode's `o1…o6` is the only thing to change.
- Hook healthy, one chapter bleeding → find what that chapter did (list? no cliffhanger? no pattern interrupt?) and ban it here in the playbook.
- Hook healthy + flat slide + few views → the video is fine, the **packaging** failed: new title/thumbnail via Test & Compare, don't touch the script.
- **No new series is scripted until at least 3 uploaded episodes of the current style have a row in `ctr_log.md`.** Building 15 more videos on unmeasured rules is the slowest path to monetization.

**Packaging rule:** title and thumbnail are ONE unit. Thumbnail words never repeat title words; the pair must contain one number; the viewer's pain must be readable in the first ~40 characters of the title (mobile feed cut). `package_lint.py` checks all of it plus §1c ("You/Your").

**Topic research = the `yt-viral` skill** (`.claude/skills/yt-viral`): `py pipeline/collect.py @Chan1 @Chan2 … > collected.json` then `py pipeline/outliers.py collected.json --min 3`. First run (5 Oct 2026, 274 videos / 16 channels) found: (1) the "stickman + Why You're Always Broke" lane is flooded — 25+ clone channels with medians of 5–600 views use our exact title shapes; (2) the stickman outliers are **beginner definitions and A-vs-B math** ("Stock Market Terms Explained" 98k = 168× its channel, "Index Funds, ETFs, Mutual Funds & Hedge Funds Explained" 18k, "Leasing vs Buying a Car", "401(k) vs Roth IRA"); (3) on big explainer channels the winners are concrete "How X is built / what happens to X" curiosity, not advice. Use this when proposing topics. `outliers.py` is evidence for the proposal, it does not replace §1b (owner approves every topic). A topic that is ≥ 3× its channel median on 2+ channels AND passes "that's MY problem" goes to the top of the proposal.

**Comments (first 2 h after publish):** sort into questions / corrections / praise / bait. Answer questions in < 30 words, thank corrections if right, a few specific replies to praise, never reply to bait. Pin the question most people share (not the nicest comment). Repeated questions = next topics.

**Shorts (1080×1920; standalone story, not a trailer):** open on a complete, emotionally sharp thought with no intro. The first frame must already be moving and make sense with sound off; the first 0.1 s matters. Use a contradiction, money shock, or consequence—not a greeting or channel bumper. By 3 s the viewer must understand the problem; by 6 s introduce a fresh escalation. Hook promises a specific payoff, and the ending delivers it. Keep the story self-contained; do not say "watch the full video" or rely on prior context. Every 1–2 s in the first 6 s, then every 1–3 s throughout, make a meaningful visual change (new angle, prop, pose, photo, reaction, kinetic text, or meme beat), synced to VO/SFX. Never use a generic slideshow or repeat a scene to fill time.

**Not taken, on purpose:** `hookscore.py` (its own author says it barely separates hits from misses, and it rewards "you" in the first 6 words, which fights our flash-forward hook §0.3); `deadair.py`/yt-edit (TTS has no retakes, pauses are auto-trimmed); `chapters.py` (ours come exactly from `timings.json`); `voice.md` (this playbook is the voice).

### 0.10 HUMAN HOOK + MIXED MEDIA v4 (owner, 10 Oct 2026) — OVERRIDES §0.3 and everything above where they conflict

**Owner's data + words:** viewers leave in the **first 6 seconds**; "the hook sounds really robotic and doesn't attach the viewers"; "the videos have value but feel robotic, people must focus so much to understand"; "make the viewer ENJOY staying the whole video, not just throwing information"; "add real pictures — when we talk about Trump, show the real picture of Trump with good animation. Mix drawings and real pictures"; videos **10 minutes minimum**.

**Diagnosis of the ep51–60 hooks (why 6 seconds):**
| What we did | Why they left |
|---|---|
| Title says **"Why YOUR…"**, first words are *"Dave just turned seventy."* | They clicked for THEIR problem and got a stranger's. The click promise is broken in second 1. |
| The same *"Freeze. That's Dave. How did he end up here? Let's rewind."* in every video | 4–7 s with zero information, and anyone who saw two videos recognises a template. |
| Staccato fragments: *"An ad. Up to one thousand dollars. Free."* | The TTS voice drops its pitch and pauses at every full stop. Three fragments = three robot bursts. **This is what "robotic" is.** |
| One voice speed (−10 %) for 10 minutes, 0.4 s of silence at 0:00 | Flat, slow, no energy at the exact moment the viewer decides. |
| Fact after fact, 2–3 numbers per beat | The viewer has to *work*. Work is not fun. |

#### A. The hook (beats `o1…o5`, ≤ 25 s, ≤ 80 words) — the owner's 4 rules

Every hook must do these **three jobs**, and each hook beat carries a `"job"` field in the JSON:

1. **`concept` — introduce the video's concept.** The first sentence (o1) talks to the **viewer** ("you/your"), confirms the title in other words, and shows a **real picture at frame 0**. No Dave in o1. A viewer who hears only o1 knows what this video is about and that it is about *them*.
2. **`stakes` — introduce the stakes.** What this costs the viewer, as ONE concrete number or loss ("about eleven hundred dollars a year", "a raise you never got"). Shown as a slam number.
3. **`ending` — say, imply or SHOW how the video will end.** The viewer must see the finish line: flash the final scene for ~2 s ("this is Dave ten minutes from now, holding…"), or name the result ("…and Dave leaves that store paying four hundred dollars less"), or promise the skill ("in ten minutes no price tag will ever work on you again"). Not vague ("stay to the end"), not a table of contents. The video's last minute must then really deliver exactly that scene/result.
   Optional extra beats: `proof` (a real example/person/company with a real photo) and `question` (the central mystery).
4. **Never the same hook twice — we must look creative.** Each episode picks a `"hook_form"` from the menu below (or invents a new one and adds it here). **A form may not repeat within 5 episodes** (validator checks). The ORDER of the three jobs changes too (stakes-first, ending-first, concept-first…). Wording is written fresh every time — banned templates: "That's Dave", "Let's rewind", "How did he end up here", "Stay to the end".

**Hook form menu**
| `hook_form` | Shape | Example opening |
|---|---|---|
| `test_on_viewer` | Play the trick ON the viewer with a real object, then expose it. | "Look at this price tag for one second… you just read nine dollars, didn't you?" |
| `absurd_true_fact` | A real company/person fact that sounds wrong, then "…and you're the one paying for it". | "This airline makes more money selling points to your credit card than flying planes." |
| `the_pitch` | Narrator plays the smiling salesman pitching the viewer, then turns to camera. | "Congratulations, you've been selected for a brand new phone, for free…" |
| `two_people` | Two real-feeling people, same situation, different outcome; the viewer is the loser. | "Two people do the same job at the same desk, and one of them earns nine thousand dollars more." |
| `be_honest` | Second-person scene of something the viewer did THIS week. | "Last Friday you said 'let's just split it' and paid for someone else's lobster." |
| `ending_first` | Open on the last scene of the video, then "here's how you get there". | |
| `countdown` | A number ticking in real time while we talk ("since this video started…"). | |
| `myth_flip` | Something everyone believes, flipped in one sentence, with real proof. | |
| `the_object` | One real object on screen, its secret history in 10 s. | |

**How it must SOUND (the anti-robot rules):**
- Write **spoken sentences**: o1 is ONE flowing sentence of 12–24 words. Contractions (you're, didn't, that's). Connectors (and, but, so, because, which means). Max **one** 1–3-word fragment in the whole hook; max 20 % fragments in the whole script.
- Read every line out loud as if telling a friend at a bar. If you wouldn't say it that way, rewrite it.
- `"tts": {"rate": "-5%", "hook_rate": "+3%", "lead": 0.08}` in the episode JSON: the hook is spoken faster and the voice starts at 0:00 (no silence). Give at least 8 beats their own `"rate"` (excited `"+6%"`, slow reveal `"-12%"`) and optionally `"pitch"` (`"+3Hz"` for a question/joke, `"-2Hz"` for a serious line). The voice stays Andrew.
- Hook pauses 0.15–0.3 s.

**How it must LOOK (first 6 s):** frame 0 = a real photo already moving (`PicBg` push-in or a `Pic` slam) + a giant `Slam` word; a new visual every 1–2 s with an SFX (≥ 4 changes in the first 6 s); the key words appear as kinetic text so it works even on mute; Dave reacts in a corner — he is the viewer's stand-in, not the subject. The Damage Meter appears on the `stakes` beat. The `ending` beat SHOWS the final scene (reuse the real end scene as a function of a local frame, inside a tilted "10 MINUTES FROM NOW" frame).

#### B. Make them ENJOY the whole video (not "throwing information")

The narrator is a **funny friend who found something out and can't wait to tell you** — not a teacher.
1. **Example before rule.** Always: real story/person/thing → what happened → *then* the one-line rule ("So in plain English: …"). Never definition first.
2. **Number diet.** Max ONE number per beat, max 2–3 stats per chapter, and every stat is followed by a translation into everyday life ("that's a free vacation, every year"). If a number doesn't make Dave do something, cut it.
3. **Talk to the viewer** at least once per chapter: "Be honest…", "You've done this. I've done this.", "Guess before I tell you." (≥ 2.2 you/your per 100 words — validator.)
4. **Play with them**: two interactive moments per video (a 3-second guess with a ticking clock, "pick A or B" then the reveal, "spot the trick").
5. **One real-world story per chapter** with a real name, year and **real photo** (a company, a CEO, an inventor, a study, a newspaper) — stories are what people stay for.
6. **Dave talks.** Dave says short lines in speech bubbles and the narrator voices them ("Dave goes: wait… WHAT?"). He's funny, a bit dumb, lovable.
7. **One running gag** per episode that returns at least 3 times and pays off in the last minute.
8. **A laugh every ~30 s** (silly analogy, Dave's reaction, raccoon, understatement). Humour is specific, never random.
9. **Emotion changes**: curiosity → surprise → anger at the villain → "oh no" low point → relief → victory. Mark the voice (`rate`/`pitch`) to match.
10. **Length: 10:10–12:00** (≈ 1,550–1,750 words at these rates). validate.py fails under 10:05. Fill with *stories*, never with repetition.

Everything in §0.2 (spine, BUT/SO/THEREFORE, cliffhangers, re-hooks, pause-and-guess, villain at ~50 %, low point ~75 %, fight back, payoff, 3-line recap, next-problem teaser) still applies.

#### C. Mixed media — real pictures + drawings

**Rule: what is REAL in the world is shown REAL; what is in Dave's life or in an analogy is DRAWN.** Named company → real photo of its store/product/HQ. Named person (CEO, inventor, president, researcher) → their real photo. Real object (an iPhone, a price tag, a gold watch, a boarding pass) → real photo or cutout. Dave, Bob, the raccoon, the duck, analogies, charts → drawn, as always. The magic is the **mix in one frame**: drawn Dave standing in a real store (`PicBg`), pointing at a real polaroid, a real CEO cutout next to the drawn raccoon.

- **Minimum 14 different real photos per long episode; shorts should use as many as the runtime can support (target 10–14).** ≥ 2 in the hook (one at frame 0), ≥ 1 per story beat/chapter. **Each source photo is a one-time asset: use each photo ID only once per video. No reusing a photo later, even with a different crop, size, look, or label.** Give every image a beat-specific ID and choose it to match the exact spoken line; unrelated generic stock imagery is forbidden. Never use the same photo in the same look twice in a row.
- **Kit: `src/photo.tsx`** (HTML layers in the same 1920×1080 space; siblings of `<Svg>`, order = depth):
  - `<PicBg f={f} src="ep62/store.jpg" from={A('c1a')} dim={0.25} />` — full-screen real world with slow push-in; draw Dave in an `<Svg>` after it. Options `blur`, `gray`, `tint`, `pos`, `zoom`, `pan`.
  - `<Pic f={f} src="ep62/ceo.jpg" x={1300} y={480} w={520} h={640} at={w('c2a','johnson')} look="polaroid" enter="slam" rot={4} label="Ron Johnson, 2012" />` — looks: `polaroid`, `sticker`, `tape`, `news` (red banner label), `circle`, `plain`, `cutout` (transparent PNG with white sticker outline). Enters: `pop`, `slam`, `drop`, `left`, `right`, `none`. Also `kb` (Ken Burns), `wob` (paper wobble), `gray`, `ring`, `out`, `pos="50% 20%"` (keep faces in frame), `s={bump(at)}`. x,y = CENTRE of the picture.
  - `<Slam f={f} at={…} text="$9.99" x={960} y={300} size={220} color={C.yellow} />` — giant kinetic word.
  - Demo of every look: composition `PicDemo` (`src/PicDemo.tsx`).
- **Animate every photo**: it enters with an SFX (`paper`, `flip`, `stamp`, `pop`), keeps a slow Ken Burns/wobble, and something drawn interacts with it (Dave points, a red marker ring, an arrow, a stamp, a price sticker slapped on it). A photo that just sits there is a slideshow — banned.
- **Where photos come from (free licences ONLY, credit is automatic):**
  1. `py pipeline/photo_find.py "Walmart store" --sheet walmart` → Wikimedia Commons results (already filtered to PD / CC0 / CC BY / CC BY-SA) + a numbered contact sheet `../qa_dl/find_walmart.jpg`. **Look at the sheet** and choose. Prefer PD/CC0/CC BY; landscape for backgrounds; faces sharp and neutral.
  2. Add to `pipeline/photos/epNN.json`: `{"id": "walmart", "file": "File:….jpg"}` (add `"cutout": true` for a person/object you want cut out). Unsplash / Pexels / Pixabay / US-government photos are also fine: `{"id", "url", "credit", "license", "page"}`.
  3. `py pipeline/photos.py epNN` → downloads to `public/photos/epNN/` (small JPGs, committed to git), fills credit + licence, writes `../qa_dl/photos_epNN.jpg`. **Look at it.**
  4. Cutouts: commit + push the JPGs, then `gh workflow run photos.yml -f ep=epNN` → the cloud removes backgrounds and commits `<id>.png`; `git pull`, download artifact `epNN-photos` to check the cutouts.
  - NEVER: Google Images, news agencies (Getty/AP/Reuters), stock sites with watermarks, screenshots of films/TV, NC/ND licences. `photos.py` refuses non-free licences; `validate.py` refuses photos missing from the manifest. `seo.py` prints the photo credits in the description automatically.
- **Real people:** public figures only, in a factual context (what they really did/said, with a source). No invented quotes, no speech bubbles putting words in a real person's mouth, no humiliating edits. Jokes are about the *situation*, said by the narrator or Dave. Politicians: balanced as always.
- **Brands:** real photos of stores/products are fine (we're reporting on them). Still no *drawn* logos. Thumbnails stay drawn + (optionally) one real object; a real person's face on a thumbnail needs the owner's OK.

#### D. SHORTS: retention + mixed-media rules (owner update, 10 Oct 2026)

- **Cast stays present:** in at least 80% of scenes, Dave, Bob, Danny, or another channel character must be visible in the same composition as the real photo—foreground, corner reaction, pointing, holding it, or interacting with its edge. The photo and character should feel like one scene, not alternating unrelated slides. The one exception is frame 0 of the hook: follow §0.10's real-photo-first rule, then bring Dave into the next shot.
- **No mismatched images:** map every photo ID to the exact VO beat in the manifest/scene comments. Car repair photo only when discussing the car/tire; signed paperwork only when discussing the written agreement; never use money stock for an unrelated line. If no fitting photo exists, use the animated cast and props instead.
- **Strict no-duplicates:** run a source-level check before render: every `photo('id'` / `src="epNN/id.jpg"` may appear at most once in the video timeline. Do not recycle photos for the hook, mid-video, or CTA. Use separate unique assets, not alternate crops, for separate appearances.
- **Hook 0.0–0.1 s:** frame 0 must contain a moving real image (slam/push-in), an oversized contradiction/stakes caption, and an impact SFX; no fade-in, blank frame, logo, or throat-clearing. Use 4+ distinct visual changes in the first 6 s. The first photo must relate directly to the first spoken sentence.
- **Meme beats:** add 2–4 original, context-specific meme/reaction moments where the story earns them (e.g. Dave facepalming at "next Friday bro"). Prefer original channel characters and custom meme layouts over unrelated recycled internet images. Memes are punchlines, not filler; don't put a meme over a serious factual claim.
- **Every image moves and interacts:** animate entry, gentle camera movement/wobble, and a character pointing/reacting/stamping/holding the photo. Add captions and SFX on the reveal. No static stock-photo cards.
- **CTAs:** one small mid-video subscribe reminder immediately after a reveal, and one end CTA. Keep each brief and do not cover the main story/photo.
- **Pre-render audit:** confirm (1) hook still works muted in first frame, (2) all photos match VO, (3) no photo ID/URL repeats, (4) character+photo coexist in ≥80% of photo scenes, (5) visual changes every 1–3 s, (6) meme jokes fit the line, and (7) voiceover and animation beats remain aligned.

#### E. v4 pre-flight (add to §0.7)
- [ ] `hook_form` chosen, not used in the previous 5 episodes; hook beats tagged `job`: concept + stakes + ending all present; the ending shown in the hook is really the video's last scene.
- [ ] o1 = one spoken sentence to "you", real photo at frame 0, no Dave; hook ≤ 25 s; voice starts at 0:00.
- [ ] `tts` block set; ≥ 8 beats with their own `rate`; fragments ≤ 20 %; you/your ≥ 2.2 per 100 words.
- [ ] One real story + real photo per chapter; ≥ 14 photos, all in the manifest with licence; contact sheet looked at.
- [ ] Number diet respected; 2 interactive moments; running gag ×3; Dave speaks.
- [ ] ≥ 10:05.

---

## 1. The channel

- **Channel name: "Dave Explains Money"** (@DaveExplainsMoney). **Dave is the main character of EVERY video** — the story follows Dave (his problem, his question, his discovery); other characters are supporting.
- **Niche:** Money, Business & Economics Explained (banks, credit, mortgages, companies, taxes, debt, inflation, gold, stocks, fintech).
- **Audience:** English-speaking beginners (US/UK/CA/AU). Assume the viewer knows NOTHING. Explain like to a smart 10-year-old.
- **Format:** 2D stickman explainer, 1920×1080, 30 fps, **8–15 minutes** (target 9–10). Never under 8:00.
- **Voice:** edge-tts `en-US-AndrewNeural`, rate `-10%`, pitch `+0Hz`. Never change it.
- **Tone:** calm, friendly, a little funny. Education, never financial advice (say "This is education, not advice" whenever giving tips).

## 1b. TOPIC RULE — "Ahh, that's MY problem!" (owner, Sept 2026 — most important rule for picking topics)

- The owner REJECTED a list of pure news/macro topics (bond yields, Social Security, tariffs, stagflation) as "trending but not interesting".
- Every topic must hit a **personal pain the viewer already feels in their own wallet**. The viewer must think *"that's literally me"* from the title alone.
- Title is about **YOU / your money**, in everyday words: "Why You're Broke 3 Days After Payday", "You Got a Raise. So Why Aren't You Richer?", "Why a $12 Burger Costs $28 on DoorDash", "Why Everyone Asks You for a Tip Now", "Why Being Poor Is So Expensive".
- Formula: **everyday situation + frustration + hidden reason (who profits)**. Company stories only when framed from the viewer's pain (their bill, their fee, their price).
- Macro/news topics are allowed only when told through the viewer's pain (not "The bond market explained" but "Why your mortgage payment just jumped").
- Cold open: Dave LIVES the problem first (checks his account, sees the bill), viewer recognises themself, THEN we reveal who profits, THEN a practical fix chapter.
- Before building, always propose topics to the owner and wait for approval. **Never start a script, voice, animation or thumbnail before the owner says yes to the topic + title.**

### 1c. TITLE RULE — "Ohh… that's MY problem" (owner, Oct 2026)

The title is a **people problem**, not a subject. Someone scrolling must recognise their own life in it in one second and think *"wait, that's literally me"*. Study the best of ep31–60:

| ✅ People-problem titles (do this) | Why it works |
|---|---|
| Why You're Broke 3 Days After Payday | a moment everyone has lived |
| You Got a Raise. So Why Aren't You Richer? | "you" + a frustration they feel but can't explain |
| Why Your Car Insurance Keeps Going Up (Even With No Accidents) | their bill + an unfairness |
| Why You Can't Save Money (It's Not Your Fault... Mostly) | a personal pain + relief |
| Why Christmas Makes You Broke Until March | a specific season + feeling |
| Why You Keep Forgetting to Cancel Free Trials (On Purpose) | a habit they're embarrassed by + twist |
| Why Gym Memberships Are Designed for You to Quit | their own failure, reframed as a trap |
| Why Everyone Asks You for a Tip Now (Even Self-Checkout) | a daily annoyance |

| ❌ Subject titles (never again) | Rewrite as a people problem |
|---|---|
| How Apple Really Makes Money | Why You Keep Paying Apple Every Month |
| Recession Explained | Why You Feel Broke Even When "The Economy Is Fine" |
| The Federal Reserve Explained | Why Your Credit Card Rate Went Up and You Did Nothing |
| Is AI a Bubble? | — (no wallet pain → reject topic) |

**Title checklist (all required):**
1. Contains **"You" / "Your"** (or a "you" situation like "You Got a Raise").
2. Names a **moment, bill, habit or feeling** from everyday life (payday, the tip screen, the gym card, the free trial, the raise, the group dinner) — not an industry, company or economic term.
3. Has a **frustration or contradiction** ("…So Why Aren't You Richer?", "…Even With No Accidents", "…Then Ban You If You Win").
4. Everyday words a 15-year-old understands. No jargon (no "net interest margin", "stagflation", "APR" in the title).
5. 40–65 characters, the pain in the first ~45 characters (mobile cut-off).
6. Optional parenthetical twist that hints at a hidden villain: "(On Purpose)", "(Who Bought Your Vet)", "(It's Not Your Fault... Mostly)".
7. **The one-second test:** read only the title to someone. If their reaction isn't "ugh, yes, why IS that?", rewrite it.

When proposing topics, give the owner: title + 1-line "that's me" moment + who profits + 2 alt titles.

## 2. Recurring cast (keep them consistent)

| Character | Look (Stick `acc`) | Role |
|---|---|---|
| **Dave** | `['hair']`, seed 7 | The everyman hero. Broke, curious, relatable. Owns a cat (ep03). |
| **The Banker** | `['tophat','monocle','tie']`, seed 31 | Smug, grinning, profits from everything. |
| **Grandma** | `['bun','glasses']`, seed 13 | Saver, pays cash, victim of hidden fees/inflation. |
| **Bob** | `['cap']`, seed 21 | Dave's neighbor. Carries the credit card debt, franchise owner. |
| **Shop owner** | `['ponytail']`, seed 44 | Small business owner. |
| **The Raccoon** | `<Raccoon>` (props3) | Mascot for hidden fees / greedy middlemen. Can wear a Robin Hood hat (`hood`). |
| **The Duck** | `<Duck>` (props) | The "money from nothing" analogy mascot. Quacks. Cameo whenever money creation comes up. |
| Others | Ray Kroc `['fedora','tie']`, Harry `['glasses','tie']`, Buffett `['glasses','tie']` seed 79, brothers `['paperhat']` | One-offs. |

Callbacks to earlier episodes are GOOD ("Remember the raccoon from our credit card video?").

## 3. Script rules (the most important part)

0. **Speed:** build several episodes in parallel with builder agents using `AGENT_BRIEF.md`; the lead integrates, QAs and renders.
1. **Length:** aim for **~1,250–1,400 spoken words, 9 chapters** (1,230 words ≈ 8:50; older note below overestimated) (Andrew at -10% is faster than expected: ~1,500 words gave only 6:40–7:30 in Series 1). ALWAYS run python pipeline/validate.py epNN after tts — it fails under 8:00. If short, add a history chapter or a 'X vs Y' comparison chapter.
2. **Structure (always) — v3, follow the story spine in §0.2:**
   - **Hook (beats `o1…o6`, 20–30 s):** flash-forward → freeze + rewind → relatable start → stakes number → central question → withheld payoff (§0.3). ~~"Today: X, Y, and Z."~~ is banned.
   - **7–8 story chapters** (`"chapter": "Title"` on the first beat, title = curiosity phrase). Each chapter = the next step of Dave's story, one idea, its own silly analogy, ends on a cliffhanger line.
   - **Myth-bust beat** = Dave's own wrong belief ("Dave thought… Nope.").
   - **Practical chapter** = Dave fights back, near the end ("education, not advice").
   - **Big payoff** (closes the hook's promise) in the last ~60 s.
   - **"What Dave Learned"** outro: exactly 3 one-line points, ≤ 15 s (never "So let's recap").
   - **Teaser for the next episode as Dave's next problem** + subscribe line with a joke ("Subscribe, so the raccoon doesn't get you.").
3. **Sentences:** short. One idea per sentence. Simple words. Numbers spelled out for TTS ("twenty twenty five", "one point four billion").
4. **Every concept gets a silly concrete analogy:** duck on paper = money creation; raccoon toll booth = swipe fee; bathtub + spoon = minimum payments; pizza slices = where payment goes; bouncy castle = borrowing cost; Monopoly hotels = McDonald's rent; babysitter paid twice = BNPL; bread in a town = inflation.
5. **Hook pauses must be short** (≤ 0.35 s; last hook beat ≤ 0.6 s). Dead air in the hook is forbidden. `tts.py` auto-trims silence on beats whose id starts with `o`.
6. **Beat pauses:** 0.4–0.6 normal, 0.7–0.9 after a punchline or at chapter end.

## 4. Research rules (company-level accuracy)

- Every number must come from a primary/official source (Fed, BLS, CBO, Treasury, FDIC, company 10-K, BoE, NY Fed, WGC…). Search the web for the **latest** value — never use memory for current numbers.
- Put sources in the episode JSON `sources` and show a `<SourceTag>` on screen when a stat appears.
- Compute derived numbers yourself and cite the math ("$198B ÷ 132M households").
- Balanced on politics ("That's a political question. Now you know the numbers.").

## 5. Titles, thumbnails, descriptions

- **Title:** curiosity gap + specific number/contradiction. Examples: "Banks Don't Lend You Money. They Create It Out of Nothing." / "Why a $300,000 House Costs You $720,000" / "Who Does America Owe $40 Trillion To? (It's Not China)".
- **Thumbnails: concepts and QA come from §0.6 (v3) — the "Face left + Hero right + Headline" formula below is only ONE possible layout, not the default. Tech stays v2:** 3 variants (A/B/C) in `src/v2/`, built with `src/v2/kit.tsx`, composition `ThumbV2`, register in `src/v2/index.tsx`. Formula = max 3 elements: (1) giant close-up `<Face>` (s≈5.2, one side third, strong emotion: shock/scream/angry/money/suspicious/smug, `lines`/`sweat` extras), (2) ONE big `<Hero>` object with white sticker outline, (3) `<Headline>` 1–3 words (Anton), one word yellow or boxed. `<Stage>` = saturated radial gradient + rays + vignette, a different colour per variant. Optional `ArrowCue`/`Ring`/`XBig`. Text top area, nothing important bottom-right (timestamp). Must read at 168 px wide. Text complements the title, never repeats it. Render: `node pipeline/stills.mjs <out> '[{"id":"ThumbV2","ep":"epNN","v":"A"},…]'` → `videos/epNN/v2/thumb_v2_X.png`. Channel assets: `src/v2/channel.tsx` (AvatarV2 A = coin face chosen, Banner 2560×1440 safe zone 1546×423).
- **Description** (auto by `pipeline/describe.py`): hook paragraph (`youtube.hook`), "In this video you'll learn" from chapters, subscribe line, chapters with timestamps, sources, music credit (Kevin MacLeod CC-BY — REQUIRED), not-financial-advice line, 3 hashtags.

### 5b. SEO & CTR rules (researched Sept 2026) — used by `pipeline/seo.py`
- **Title:** hook in the first ~50 chars (mobile cut-off), 40–65 chars total, contains the searchable phrase ("How banks create money", "inflation explained", "how McDonald's makes money"), a specific number or contradiction, optional parenthetical kicker "(It's Not China)". Max one CAPS word, 1–2 power words. No year in evergreen titles.
- **Title ≠ thumbnail words.** Title and thumbnail must say different things (1+1=3). Pick the thumbnail variant that doesn't repeat the title.
- **2 alternate titles** per video for YouTube Test & Compare.
- **Description:** line 1 (≤150 chars) = keyword question + payoff (it's all people see before "Show more"); then a 2–3 sentence story summary with long-tail keywords; "In this video you'll learn" ✅ list; chapters with timestamps (starting 0:00); subscribe CTA + "Watch next"; sources; music credit; not-financial-advice line; exactly 3 hashtags.
- **Tags:** ~11 total: 2–3 exact-match + long-tail phrases + "money explained simply" brand tag. Under 500 chars. No stuffing.
- **Pinned comment:** a question that's easy to answer (YES/NO, a number, a city) to trigger comments.
- **Settings:** Not made for kids · Education · Altered content: No (animated) · End screen: next episode + subscribe.
- For each new episode add an entry to `SEO` in `pipeline/seo.py`, then run `py pipeline/seo.py epNN` → writes `videos/epNN/epNN_UPLOAD.txt`.

## 6. Visual style

- Flat, cream background (`Board`), `Street`, `Interior`, `Beach`, `DreamBg`+`DreamFrame` ("WHAT MOST PEOPLE THINK"), `OldFilm` for history.
- Palette in `src/theme.ts` (`C.*`). Fonts: Fredoka (UI), Caveat (handwriting).
- **Holding things (ep51+, owner bug report Oct 2026):** NEVER use `handItem` (it draws the item at the midpoint of both hands = on Dave's chest/neck, and mirrors text when flipped). Use `hold={{item: <CreditCard s={0.35} />, side: 'r'}}` with pose `present`, `talk` or `point_r` (`point_l` + `side: 'l'`). Stick auto-swaps chest poses (hold, thumbs, think…) for an outstretched arm. Item scale ~0.3–0.4. `validate.py` blocks `handItem` in new episodes.
- Something must change on screen at least every 3–6 s. Pop-ins (`pop()`), camera push (`Cam`), shakes on impacts.
- Word-highlight captions, progress bar with chapter segments, chapter title cards — automatic.
- **Subscribe:** mid-video `<SubReminder>` right after the biggest reveal (+ `subCues`) AND the end `SubButton`/`Bell` scene.

## 7. Sound

- SFX on exact words (`q(w('beatId','word'), 'sfx', vol)`): pop, pop2, whoosh, whoosh_s, thud, stamp, coin, cash, click, key, key2, ding, chime, boing, buzz, quack, poof, scribble, marker, paper, flip, crinkle, clank, dream, sting, heart, rip, trombone, cricket, sputter, mail, crowd, tick, step, flutter, draw.
- Music: "Fluffing a Duck" (loop, low). Master: −14 LUFS (assemble.sh).

## 8. How to build episode N (step by step)

1. **Research** latest facts (web search). Write `pipeline/episodes/epNN.json`: `id`, `title`, `youtube{title,hook,tags}`, `sources[]`, `beats[]` (`id`, `text`, `pause`, optional `chapter`). Beat ids: hook `o1…`, chapters `c1a…c8g` (any unique ids; hook must start with `o`).
2. **Choreograph** `src/episodes/EpNN.tsx` — copy the structure of Ep09/Ep10 (the most mature). Pattern:
   - `const {bs, w, we, t} = useT();` `A(id)` = scene start. `w(beat, word, nth)` = frame when a word is spoken.
   - `scene(at, () => <AbsoluteFill>…</AbsoluteFill>)` for each visual beat group; sub-switch inside with `f < A('next') ? … : …`.
   - `q(frame, 'sfx', vol)` for sounds. Chapter whooshes/chimes via the loop at the top.
   - Mid-video `const SUB = w('cXx','word') + 20; subCues(SUB)…; <SubReminder …/>`.
   - Only use words that are actually in the beat text for `w()` (lowercased, punctuation stripped: "McDonald's" → `mcdonalds`, "I P O" → `i`).
3. **Props:** reuse from `src/props*.tsx` (see §9). Add new props in a new `src/propsN.tsx` if needed, same flat style (`stroke C.ink`, width 5–6, round joins).
4. **Thumbnails:** v2 only — add `V2EpNN` (see section 5) and register in `src/v2/index.tsx`. Old `src/thumbs/` is legacy.
5. **Register** the episode in `src/Episode.tsx` (`EPISODES`).
6. `git push` → `check.yml` typechecks (fix any TS error first).
7. **Render:** `gh workflow run render.yml -R hamlou/moneyworks -f ep=epNN -f chunks=10` (~8–10 min). Download: `gh run download <runId> -R hamlou/moneyworks -n epNN-final -D Desktop/100/videos/epNN`.
8. **QA:** contact sheet every 20 s (`tools/ffmpeg/ffmpeg.exe -i epNN.mp4 -vf "fps=1/20,scale=384:-1,tile=5x6"`), check length ≥ 8:00, hook has no dead air, no empty screens, subscribe reminder visible.

## 9. Component toolkit (quick reference)

- `props.tsx`: G, Text, Bank(label), Bill, Coin, MoneyStack(n,label), Vault, Car, Desk, Monitor(value,title), Keyboard, Paper(text,reveal,id), Pencil, Duck, Puff, Sparkle, Bubble, Thought, XMark, Stamp, Moth, Card(top,big,color), Clock, Calendar(top,year), Sack(coins), DocCard, SourceTag, Arrow.
- `props2.tsx`: OldCar, Phone(title,value), Coupon, Printer, GoldBar, BigButton, Chest, Cushion, Dial(v,label), Shield, Umbrella, Sun, Towel, Envelope, Mailbox, TornNote, Chalkboard, Magnifier, Bar(h,value,label), Screen$, Badge, Row(n,text,lit), Sign, CreditCard, SubButton, Bell, Clapper, MoneyMachine, Frame(w,h,label), Icon(kind).
- `props3.tsx`: Raccoon(mood,grab,hood,holdCoin), TollBooth, Coffee, Shop(name), Terminal, PriceTag, Fridge, Bathtub, Ticket, Plane, Atm, HospitalBill, PieSplit, SourceCard, SplitBar(a,la,lb), Person, Plate, Bush.
- `props4.tsx`: Cat(mood), House(sold), BouncyCastle, Pizza(eaten), Sandwich, Globe, Truck, LineChart(pts,t,lo,hi), WaterHeater, Burger, amort().
- `props5.tsx`: Mixer, Board(Monopoly), Land, IceCreamMachine, Fries, Contract, Corner.
- `props6.tsx`: Flag(jp/cn/uk/us), Bread, Wheelbarrow, ReportCard, Pockets, Conveyor.
- `props7.tsx`: Lemon, Stand, Share, Ticker, Thermo, Boxes, Factory.
- `Stick` poses: idle, wave, point_r, point_l, point_up, shrug, pockets, think, typing, celebrate, shock, hips, facepalm, carry, present, talk, relax, panic, thumbs, hold. Expressions: neutral, happy, grin, sad, shock, worried, smug, think, tired, suspicious. Extras: walk, sweat, pockets, tinfoil, handItem, flip.
- `fx.tsx`: Svg, Cam, Scenes, Street, Interior, Board, Beach, DreamBg, DreamFrame, OldFilm, Vignette, Captions, ChapterCard, Progress, SubReminder, subCues, Sfx.

## 10. Lessons learned (don't repeat)

- Scripts under ~1,500 words end up < 8 min → always add a practical or history chapter.
- Hook dead air: keep pauses short; show visuals the instant the narrator says "look at this".
- Empty screens while waiting for a `pop()` feel dead — always have a title or placeholder visible at scene start.
- Zero-height `Bar` hides itself; labels only appear when the bar grows.
- Don't draw real logos (McDonald's arches, Klarna logo). Text names are fine.
- Avoid emoji in SVG text (renderer may lack the font). ✓ works.
- Captions come from edge-tts word boundaries; write numbers as words.
- SFX names must be in the §7 list — an unknown name (e.g. 'sparkle') makes the cloud render fail (ep45/46).
- **Layout anchors (ep51-59 rebuild, Oct 2026):** `Row` is anchored at its LEFT edge (x = left, default width 980) - a centred list is `x≈300–520`, never `x=860`. `People` draws up and to the left of its origin (single row sits at `y - 290·s`): for one row use `y = wantedY + 290·s`. `XMark` is 520 px wide at `s=1` - use `s≈0.3–0.5`. `Calendar flip={0}` shows the year (`flip={1}` hides it).
- **Footer is fixed:** `<Scenes/> <Vignette/> meter <Progress/> <ChapterCard/> <SubReminder/> <Captions/> <Sfx/>`. `SubReminder` is an overlay in the footer, NEVER inside `scene()` (that blanks the screen for 4 s), and `subCues(SUB).forEach((c) => cues.push(c))`. `validate.py` now checks this, SFX names, ChapterCard and XMark size.
- **Scene anchors must match the words:** if a block reads `w('c4e', …)` its scene is `scene(A('c4e'), …)`. ep52 and ep54 shipped with a whole chapter one beat early.
- **No text walls:** a scene that is only 3–7 lines of narration printed on the board fails the owner's style even if QA passes (ep51). Every scene = character + main object + one number/label.
- **QA report:** `N flagged beats out of M` must be `0`. `QA CRASHED` now only appears when frames really failed to render.
- `seo.py` rewrites `pipeline/episodes/epNN.json` (youtube field) on purpose — commit that change, it is not stray.
- Owner's topic taste (ep41–60 rounds): YES = life moments & money traps (weddings, divorce, co-signing, lending to family, MLMs, gurus, trading/betting apps, free games, gym, free trials, working until 70). NO = product-fee topics (printer ink, popcorn, warranties, resort fees, timeshares), 'feel poor on $100K', kids' sports/parties, nursing homes, dentists, lottery, pig-butchering scams.

## 11. Series 1 episode list (for callbacks)

| # | Title | Mascot moments |
|---|---|---|
| 01 | Banks Don't Lend You Money. They Create It Out of Nothing. | duck on paper, NOPE vault, 3 brakes, SVB bank run |
| 02 | Your Credit Card Makes Money Off You, Even If You Pay On Time | raccoon toll booth, Robin Hood raccoon, bathtub+spoon |
| 03 | Why a $300,000 House Costs You $720,000 | Dave's cat, pizza 7/8 to bank, bouncy castle |
| 04 | McDonald's Isn't Really a Burger Company | Ray Kroc, Monopoly hotels, broken ice cream machine |
| 05 | Where Your Taxes Actually Go | tax pot, budget pizza, government's raccoon, 94% top rate |
| 06 | Who Does America Owe $40 Trillion To? | left/right pocket, debt ceiling, Zimbabwe wheelbarrow |
| 07 | Why Your $100 Is Secretly Shrinking | jacket $100 from 2000, shrinkflation chips, Weimar bread |
| 08 | Why Is Gold So Expensive? | gold cube 22 m, Nixon 1971, Buffett cube |
| 09 | How the Stock Market Actually Works | Dave's lemonade stand, heat wave, Buffett's $1M bet |
| 10 | "Pay in 4, 0% Interest"… How Does Klarna Make Billions? | fancier raccoon booth, babysitter paid twice |
