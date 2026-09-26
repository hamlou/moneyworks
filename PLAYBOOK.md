# MONEYWORKS PLAYBOOK — how every video is made

This is the bible for the channel. Series 1 (ep01–ep10) was approved by the owner as **"exactly the style I was looking for for years"**. Every new episode must match it. Read this fully before writing anything.

---

## 1. The channel

- **Niche:** Money, Business & Economics Explained (banks, credit, mortgages, companies, taxes, debt, inflation, gold, stocks, fintech).
- **Audience:** English-speaking beginners (US/UK/CA/AU). Assume the viewer knows NOTHING. Explain like to a smart 10-year-old.
- **Format:** 2D stickman explainer, 1920×1080, 30 fps, **8–15 minutes** (target 9–10). Never under 8:00.
- **Voice:** edge-tts `en-US-AndrewNeural`, rate `-10%`, pitch `+0Hz`. Never change it.
- **Tone:** calm, friendly, a little funny. Education, never financial advice (say "This is education, not advice" whenever giving tips).

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

1. **Length:** aim for **1,900–2,100 spoken words** (Andrew at -10% is faster than expected: ~1,500 words gave only 6:40–7:30 in Series 1). ALWAYS run python pipeline/validate.py epNN after tts — it fails under 8:00. If short, add a history chapter or a 'X vs Y' comparison chapter.
2. **Structure (always):**
   - **Cold open / hook (beats `o1…o6`, ~35–50 s):** a shocking concrete claim in the first sentence, proof on screen within 5 s, a short "wait, it gets worse" beat, then a promise: "Today: X, Y, and Z."
   - **6–8 chapters** (`"chapter": "Title"` on the first beat). Each chapter = one idea, with its own silly analogy.
   - **Myth-bust beat** somewhere ("Most people think… Nope.").
   - **Practical chapter** near the end ("How people use it wisely", "education, not advice").
   - **"Now You Know" recap:** exactly 3 numbered points.
   - **Teaser for the next episode** + subscribe line with a joke ("Subscribe, so the raccoon doesn't get you.").
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
- **Thumbnails:** 3 variants (A/B/C) for YouTube Test & Compare, in `src/thumbs/epXX.tsx`. Rules: 2–4 huge words (`<Big>`), one expressive giant character face or one bold object, high contrast background (yellow burst / navy / cream), readable on a phone. Avoid frame-0 blinks (use `f={20}`, `seed={50}`).
- **Description** (auto by `pipeline/describe.py`): hook paragraph (`youtube.hook`), "In this video you'll learn" from chapters, subscribe line, chapters with timestamps, sources, music credit (Kevin MacLeod CC-BY — REQUIRED), not-financial-advice line, 3 hashtags.

## 6. Visual style

- Flat, cream background (`Board`), `Street`, `Interior`, `Beach`, `DreamBg`+`DreamFrame` ("WHAT MOST PEOPLE THINK"), `OldFilm` for history.
- Palette in `src/theme.ts` (`C.*`). Fonts: Fredoka (UI), Caveat (handwriting).
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
4. **Thumbnails:** `src/thumbs/epNN.tsx` exporting `EpNNThumb`; register in `src/Root.tsx` (`EP_THUMBS.epNN = …`).
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
