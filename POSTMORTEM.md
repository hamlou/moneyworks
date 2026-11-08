# POSTMORTEM — every public video on @DaveExplainsMoney (pulled 8 Nov 2026)

Data source: `yt-dlp --skip-download` metadata + YouTube auto-captions (word timings) + public comments, for all 23 public uploads (4 Shorts, 19 long). Raw data: `C:\Users\hp\AppData\Local\Temp\claude\98b4d7d11e80f5b9\01390d92-eac1-49a1-94c7-50bd8a7323c5\scratchpad\pm\rows.json`.

**Honesty note.** Public data has views/likes/comments only. No impressions, no CTR, no swipe-away %, no retention curve, no traffic sources. Every "why" below that talks about viewers leaving or the feed stopping is **inferred** from hook text, length, pacing, title and engagement ratios. The Studio numbers needed to confirm are listed in the last section.

Channel: 39 subs. Views/day = views ÷ days since upload (older videos are slightly favoured; Shorts get most views in the first 72 h, so for Shorts it is a rough proxy only). wps = spoken words per second from caption timings. Comments = total (own replies) — most comments are the channel replying to itself.

## 1. All videos

### Shorts (vertical)

| # | Date | Title | Len | Views | Likes | Like % | Comments (own) | Views/day | wps |
|---|---|---|---|---|---|---|---|---|---|
| S1 | 10 Oct | Why Betting Apps Give You $1,000 Free (Then Ban You If You Win) | 90 s | 228 | 2 | 0.9 | 0 | 7.9 | 2.07 |
| S2 | 11 Oct | You Co-Signed to Be Nice. Now the Whole Loan Is Yours #animation #investing #reversemortgage #money | 97 s | 31 | 1 | 3.2 | 0 | 1.1 | 2.16 |
| S3 | 14 Oct | If They're So Rich, Why Are They Selling You a Course? | 91 s | 122 | 1 | 0.8 | 0 | 4.9 | 3.43 |
| S4 | 4 Nov | What Happens If Abdul El-Sayed Becomes President? (The Reality Check) | **51 s** | **1,891** | **28** | 1.5 | 7 (4) | **472.8** | **4.14** |

### Long videos (16:9)

| # | Date | Title | Len | Views | Likes | Like % | Comments (own) | Views/day | wps |
|---|---|---|---|---|---|---|---|---|---|
| L1 | 26 Sep | How Banks Create Money Out of Nothing (And It's Legal) | 8:53 | 43 | 4 | 9.3 | 2 (0) | 1.0 | 2.24 |
| L2 | 26 Sep | How Credit Cards Make Money Even If You Pay in Full | 8:17 | 80 | 4 | 5.0 | 0 | 1.9 | 2.36 |
| L3 | 28 Sep | Why a $300,000 House Costs You $720,000 | 8:28 | 12 | 2 | 16.7 | 0 | 0.3 | 2.25 |
| L4 | 29 Sep | How McDonald's Really Makes Money (It's Not Burgers) | 8:19 | 2 | 1 | 50 | 0 | **0.1** | 2.22 |
| L5 | 30 Sep | Where Your Tax Money Actually Goes (Most People Guess Wrong) | 8:38 | 42 | 2 | 4.8 | 0 | 1.1 | 2.07 |
| L6 | 1 Oct | Who Does America Owe $40 Trillion To? (It's Not China) | 8:18 | 59 | 1 | 1.7 | 2 (1) | 1.6 | 2.22 |
| L7 | 2 Oct | Why Your $100 Buys Half of What It Did (Inflation Explained) | 8:31 | 10 | 2 | 20 | 0 | 0.3 | 2.17 |
| L8 | 3 Oct | Why Is Gold So Expensive? (It's Just a Yellow Rock) | 8:50 | 14 | 2 | 14.3 | 0 | 0.4 | 2.26 |
| L9 | 4 Oct | How the Stock Market Actually Works (Explained With Lemonade) | 8:37 | 168 | 4 | 2.4 | 5 (3) | 4.8 | 2.25 |
| L10 | 5 Oct | The Hidden Cost of "Buy Now, Pay Later" | 8:50 | 63 | 2 | 3.2 | 1 (1) | 1.9 | 2.31 |
| L11 | 8 Oct | Why Betting Apps Give You $1,000 Free (Then Ban You If You Win) | 8:39 | 135 | 3 | 2.2 | 0 | 4.4 | 2.24 |
| L12 | 11 Oct | Why Your Friend's Car Loan Is Now YOUR Debt | 10:10 | 585 | 5 | 0.9 | 1 (1) | 20.9 | 2.37 |
| L13 | 14 Oct | You Won't Be Able to Afford Gas for Your Car After 2027. | 10:10 | **899** | 1 | **0.1** | 5 (3) | **36.0** | 2.22 |
| L14 | 16 Oct | In 5 Years You Won't Own Anything. Here's Proof. | 9:49 | 27 | 2 | 7.4 | 0 | 1.2 | 2.22 |
| L15 | 19 Oct | Your Future Self Is Begging You to Watch This Video | 6:31 | 45 | 2 | 4.4 | 0 | 2.2 | 3.65 |
| L16 | 22 Oct | Your Credit Card Is Charging You More Than You Think | 8:12 | 600 | 2 | 0.3 | 5 (3) | 35.3 | 3.59 |
| L17 | 25 Oct | What If You Stopped Being Loyal to Your Boss? | 8:51 | 175 | 3 | 1.7 | 1 (1) | 12.5 | 3.50 |
| L18 | 28 Oct | You Still Work 9-5 ? You NEED to Watch This. | 7:22 | 4 | 0 | 0 | 0 | 0.4 | 3.29 |
| L19 | 1 Nov | Abdul El-Sayed Becomes US President: What Happens? (ea1) | 6:56 | 27 | 1 | 3.7 | 3 (2) | 3.9 | 2.97 |

**Top 3 (views/day):** S4 Abdul Short 472.8 · L13 Gas 36.0 · L16 Credit-card points 35.3 (L12 car loan 20.9 is 4th).
**Bottom 3:** L4 McDonald's 0.1 (2 views) · L3 $300k house 0.3 · L7 Inflation $100 0.3 (L8 Gold and L18 "9-5" tie at 0.4; L18 is the worst *recent* upload: 4 views in 11 days).
**Shorts vs each other:** S4 is 60× S1, 97× S3, 430× S2 on views/day. Ranking: S4 ≫ S1 > S3 > S2.

**The headline the owner needs:** the Abdul Short did NOT fail. It is the best video the channel has ever made by an order of magnitude — 1,891 views in 4 days, 28 likes (more than all 19 long videos have combined: 45), and the only video with 3 real outside commenters arguing about the topic. It "failed" only against a viral expectation. What it did not do is convert: subs are still 39, because the audience was politics viewers, not money viewers.

## 2. Per video — WHY IT FAILED / GOOD POINTS TO KEEP

### Shorts

**S4 — Abdul El-Sayed Short (best ever)**
- Hook (0–3 s): real crowd/clip audio chanting "Abdul El-Sayed. Dr. Abdul El-Sayed. Abdul El-Sayed. Mohammed Abdul." then "$33 million got spent to stop one man from winning one election, and he still won it by less than one point."
- WHY IT FAILED (to go viral):
  - Off-niche politics with a name few people outside Michigan know: the feed found a politics pocket, not a mass audience. Views came from the name, not from Dave. Zero sub conversion.
  - The question "So, what would happen if Abdul El-Sayed became the president" only lands at 13 s — after a 3-s name chant and a stat. Your own rule says question by 10 s.
  - Muddled payoff: it promises "you will know exactly who would fight the hardest to stop him", then answers "Not one single person. It is the hundreds of millions of dollars and the 60 votes…" — that is not a who, it dodges its own promise.
  - Audio ends mid-sentence at 50.7 of 51 s: "Because a president is a pen, and Congress is the" — "paper" is cut. Either a render cut or an accidental loop (see good points). If a viewer notices it as a cut, it looks broken.
  - Self-replies under every comment ("I Know Right!", "That's VERY true!", "Yeah..That's from where the money came actually.") read as bot-like and add nothing.
- GOOD POINTS TO KEEP:
  - Shortest Short (51 s) and the fastest speech (4.14 wps) → nothing to swipe on.
  - Opening uses **real voices / real footage that are not Dave** — the only Short whose frame 0 sounds different from every other faceless explainer. Pattern interrupt.
  - A real, named, in-the-news person + a shocking real number ($33 million) in the first sentence.
  - A big "what if" premise in the title that a viewer can argue with → real comments ("That would be amazing if he become the president..", "Obscene amount of money spent on trying to block him…").
  - Accidental seamless loop: "…Congress is the" → restarts on "Abdul El-Sayed." No subscribe/outro to swipe on. Likely boosted replays (inferred; check avg % viewed > 100 %).
  - Best metadata of all Shorts: 17 specific tags, description links the long video.

**S1 — Betting apps Short (2nd)**
- Hook: "Dave just won $640. The app's response, banned." — the best written hook on the channel: prize + consequence in 2 s.
- WHY IT FAILED: 90 s is too long for the story; 2.07 wps is slow TTS pace for a Short (half of S4). No question anywhere in the script. Middle is a math lecture ("to unlock even 100 of that, he had to bet it 25 times over… cost him 140 just to unlock") — likely where swipes happen (inferred). Ending = two exit CTAs back to back: "Full stories on the channel. Follow for part two." — kills the loop and promises a part two that does not exist. Title copied from the long video (Short titles should be shorter and more shocking).
- GOOD POINTS TO KEEP: prize-at-frame-0 hook; villain contrast ("Bob, down three grand, gets a text from his VIP host"); one hard stat ("half a percent of customers make 70% of a sports book's money"); responsible-gambling line; good tags.

**S3 — "Selling you a course" Short (3rd)**
- Hook: "It's 2 in the morning and Dave is one tap away from paying $9,997 to a man he met on a webinar." — 20 words before the hook lands; scene-setting first, shock second.
- WHY IT FAILED: run-on "and… and… so…" sentences at 3.43 wps (37 words in the first 10 s) — dense to follow. 91 s. The payoff is withheld: "But his first $2,000 is still gone and how he fights to win it back is in the full video linked right below, so tap it now." The Short is a trailer, not a resolved story → viewer feels cheated, no loop. Fake-guru topic is crowded on Shorts.
- GOOD POINTS TO KEEP: the title is the best question-title on the channel (a contradiction the viewer can't unhear). The "one question the guru hates" device. Visual comic metaphors ("the sword costs money and the armor costs money and you never reach the castle"). Real FTC/MOBE proof.

**S2 — Co-signer Short (worst)**
- Hook: "Dave's phone rings. A debt collector about a car he's never driven." — good mystery, but slow (2.16 wps) and no money number until ~10 s.
- WHY IT FAILED: 97 s, the longest Short. Low-stakes for the Shorts audience (co-signing is a niche adult problem; young Shorts viewers don't co-sign). Title is a statement, not a question, and is stuffed with irrelevant hashtags "#investing #reversemortgage" — wrong topic signal to the algorithm. Ends "Subscribe. It's the only paper we'll ever ask you to sign." — outro = swipe point. Same opening as the long L12 uploaded the same day, so the two competed.
- GOOD POINTS TO KEEP: fully resolved story with a usable rule ("could I pay this whole loan alone?"); nice callback (the paper "had predicted everything"); strong tags; highest Short like rate (3.2 %, but n=1).

### Long videos

**L13 — Gas after 2027 (top long)** — Hook: "Dave just filled up his car, $67 for one tank." FAILED: 1 like on 899 views (0.1 %) + 10:10 length → probably shown widely on a news topic but watched briefly (inferred); title promises a future claim ("after 2027") the video doesn't prove; gas question arrives at 13.5 s. KEEP: timely news hook (2026 record gas, Hormuz), a pain every viewer feels at the pump, real comment debate ("We are being bamboozled").
**L16 — Credit card points (2nd long)** — Hook: "So, it starts at the airport. I'm dragging my suitcase past a little booth and the man shouts, 'Sir, would you like a free flight?'" FAILED: starts with filler "So, it starts…"; 0.3 % like rate (2/600) → weak hold (inferred). KEEP: "Your … is charging you" title (you + loss), first-person story, question by 5 s (fastest on the channel), a real number in the description ($6 billion).
**L12 — Friend's car loan (3rd long)** — Hook: "Dave's phone rings. A debt collector about a car Dave has never driven." FAILED: 10 min for a one-idea topic; 0.9 % like rate. KEEP: "Now YOUR Debt" title (personal threat, caps on one word), rewind structure ("Rewind 6 months").
**L17 — Loyal to your boss** — Hook: "This is me at my 5-year work anniversary… 2%… the new guy… $9,000 more than me." FAILED: tags are generic finance spam ("passive income 2026", "make money online") unrelated to the topic. KEEP: concrete injustice in 10 s, universal job pain, 12.5/day.
**L9 — Stock market with lemonade** — Hook: "Here's something that makes no sense. A company can lose money year after year and still be worth billions." FAILED: "Here's something" throat-clear; textbook topic. KEEP: best of the Sept series; only one with a genuine fan comment ("That dave guy makes everything simple.").
**L11 — Betting apps long** — Hook: "Last year, Americans lost almost $17 billion to betting apps." FAILED: description opens "IMPORTANT : Betting is bad! do not gamble!" (looks amateur; wastes the search snippet); no tags. KEEP: stat-first hook, strong title.
**L19 — Abdul long (ea1)** — Hook: same name chant. FAILED: off-niche politics, unknown name for the long-form browse audience; per owner's own verdict, boring after the hook (text cards, unrelated 3D); title weaker than the Short's. KEEP: the intro (a real viewer: "I liked the intro tho").
**L2 — Credit cards pay in full** — Hook: "Dave has a credit card, and Dave is perfect." FAILED: no tags, explainer title, slow 2.36 wps over 8 min. KEEP: counter-intuitive premise (you pay even if you pay in full).
**L10 — BNPL** — Hook: "Dave wants new sneakers. $200." FAILED: ends "tell us in the comments what we should explain next" (series finale on a 30-sub channel). KEEP: relatable purchase moment.
**L15 — "Future self is begging"** — Hook: "This is me last Friday walking into a Las Vegas casino with $500." FAILED: title says nothing about casinos — pure vague clickbait; description in all caps "GAMBLING IS BAD AND FOR LOSERS". KEEP: first-person stakes + "Spoiler, by the end of this video…" promise.
**L6 — America owes $40T** — Hook: "America owes $40 trillion." FAILED: macro topic, no personal stake. KEEP: myth-bust title "(It's Not China)", number-per-person ("$117,000 for every single person… including babies").
**L1 — Banks create money** — Hook: "$10,000 just appeared out of nothing." FAILED: first upload, no tags, abstract topic. KEEP: magic-trick hook, "This is not a conspiracy" line.
**L5 — Tax money** — Hook: "Dave just got his paycheck. He worked hard for $4,000." FAILED: civics topic, slow. KEEP: "Most People Guess Wrong" challenge.
**L14 — Won't own anything** — Hook: "Dave opened his bank statement and counted 11 subscriptions." FAILED: title ("won't own anything… proof") mismatches a subscriptions video → clickers leave. KEEP: the hook itself is relatable and concrete.
**L8 — Gold** — Hook: "This is a rock. You can't eat it." FAILED: evergreen textbook, 8:50, 5th daily upload in a row. KEEP: the object-first visual hook.
**L7 — Inflation $100** — Hook: "Dave is cleaning his closet and in an old jacket, he finds something amazing." FAILED: "something amazing" = vague tease; topic covered by every finance channel. KEEP: the found-$100 story device.
**L3 — $300k house** — Hook: "Dave just bought a house. He borrowed $300,000." FAILED: young audience doesn't own houses; title number is strong but topic is saturated. KEEP: title number contrast ($300k → $720k).
**L18 — "You Still Work 9-5 ?"** — Hook: "This is me on my 70th birthday at work wearing a name tag…" FAILED: generic bait title ("You NEED to Watch This"), stray space before "?", 20 generic tags; content is about retirement at 70 which the title never says. Worst recent result. KEEP: the 70th-birthday image is a great hook — it just needed the title "I'll Work Until 70. My Dad Retired at 62."
**L4 — McDonald's (worst)** — Hook: "McDonald's sells burgers, billions of them. Everyone knows that." FAILED: opens with what everyone knows; the known "McDonald's is a real-estate company" fact is all over YouTube; no tags. KEEP: the 10× number contrast (1.4 billion vs 14 billion).

## 3. PATTERNS — best vs worst

| Best performers (S4, L13, L16, L12, L17) | Worst performers (L4, L3, L7, L8, L18, S2) |
|---|---|
| Timely/real-world trigger: a named person in the news, record 2026 gas prices | Evergreen textbook topics ("How X works", "Why is X") already covered by big channels |
| Title = personal threat or loss to *you* ("Your Credit Card Is Charging You…", "Now YOUR Debt") or a what-if about a real name | Title = explainer label or vague bait ("You NEED to Watch This", "Your Future Self Is Begging") |
| Hook = concrete scene + number in first sentence ($33 million, $67 tank, $9,000 more) | Hook opens on common knowledge or a vague tease ("Everyone knows that", "something amazing") |
| S4: 51 s, 4.1 wps, no outro, loops | Shorts at 90–97 s, ~2.1 wps, ending in "Subscribe"/"Follow for part two"/"tap it now" |
| Real outside voices/footage at frame 0 (S4) | Same TTS narrator from frame 0 |

Other patterns:
- **Shorts beat long videos per upload.** 4 Shorts → 2,272 views; 19 long → 2,990 views. Median Short 175 views vs median long 45.
- **Like rate falls as views rise** (L13 0.1 %, L16 0.3 %, L12 0.9 %). The few-view videos have 10–50 % like rates = the owner's own circle. High-view long videos are reaching strangers who don't stay (inferred) → long videos are too long/slow for cold viewers.
- **Speech speed:** all Dave-narrated videos before 19 Oct run 2.1–2.4 wps (≈130 wpm, sleepy). First-person videos after 19 Oct run 3.3–3.7 wps and got 2 of the 3 best long results. The fastest Short (4.1 wps) won.
- **Format churn:** Dave-3rd-person → first-person "I" → politics within 5 weeks; Shorts posted only 4 times, with a 3-week gap between S3 and S4. The algorithm can't learn the channel.
- **Metadata:** first 10 long uploads had zero tags; descriptions with all-caps disclaimers; S2 title stuffed with wrong hashtags; L17 with irrelevant "passive income" tags. Not the main cause, but free to fix.
- **Comments:** 17 of 30 comments are the channel replying to itself with "I know right"/"Subscribe so you don't miss". Inflates nothing useful and looks automated.

## 4. RULES FOR THE NEXT SHORT

- MUST be 45–60 s. NEVER exceed 60 s (every Short over 89 s did ≤ 8 views/day; the 51 s one did 473).
- MUST open frame 0 on a real, named, current thing (person, company, app, price) plus one shocking dollar number in the first sentence.
- MUST tie that current hook to the viewer's own money (the Abdul Short got views but 0 subs because it stayed politics). Example: "$33 million to stop one man — here's what his plan would do to YOUR paycheck."
- MUST make frame 0 sound different from a TTS narrator: a crowd chant, phone ring, cash-register hit — then Dave. Make it with our own SFX/voices (LICENSES.md bans other creators' clips; the S4 clip audio is a monetization/claim risk, so copy the effect, not the source).
- MUST put the question on screen and in voice by 6 s (S4 asked at 13 s, S1 never asked).
- MUST speak at ≥ 3.5 words/s; NEVER let a Short sit at the 2.1 wps long-form pace.
- MUST answer the exact promise of the hook with a concrete who/what/number. NEVER answer "who" with "not one single person".
- MUST end on a half-sentence that completes with the first words of the hook (deliberate version of S4's accidental "Congress is the…" loop).
- NEVER end with "Subscribe", "Follow for part two", "Full stories on the channel" or "tap it now". Put the long-video link in Related Video + pinned comment only.
- NEVER withhold the payoff for the long video (S3's "his first $2,000 is still gone… tap it now").
- MUST write a Short-specific title ≤ 60 chars as a what-if or a contradiction question; NEVER reuse the long video's title (S1) and NEVER put hashtags of other topics in it (S2 "#reversemortgage").
- MUST pick topics a 18–30-year-old has this month (betting apps, gas, a viral name, rent, a paycheck), NEVER textbook topics (gold, inflation, mortgage, McDonald's).
- MUST post Shorts on a steady schedule (≥ 3/week) in ONE format for 3 weeks before judging; NEVER switch voice/style after one upload.
- NEVER reply to comments with "I know right!"/"Subscribe so you don't miss"; reply only with a real answer or a question back.
- NEVER upload a Short and its long version on the same day with the same opening (S2 + L12).

## 5. Studio numbers the owner must paste to confirm (inferred causes above)

For **each of the 4 Shorts** (YouTube Studio → video → Analytics → Overview/Engagement):
1. **Viewed vs swiped away %** (Shorts feed) — confirms whether the hook works (target ≥ 70 % viewed).
2. **Average percentage viewed** and **average view duration** — confirms length/pacing and whether S4 looped (> 100 % = replays).
3. **Retention graph** — the second where the line drops hardest (screenshot or the timestamp).
4. **Views by traffic source** (Shorts feed / YouTube search / browse / external / channel pages) — for S4 especially: was it the feed or people searching "Abdul El-Sayed"?
5. **Views over time, first 72 h** (hourly) — shows when the feed stopped testing it.
6. **Subscribers gained** and **"Related video" clicks** (if shown).

For **each long video**, especially L13, L16, L12 and L19:
7. **Impressions** and **impressions click-through rate (CTR)**.
8. **Average view duration**, **average % viewed**, and the **% still watching at 0:30**.
9. **Traffic source split** (browse / suggested / search) — confirms whether the 600–900 views came from browse/suggested strangers who left early.

Paste them as one line per video: `ID | swiped-away % | avg % viewed | avg duration | top traffic source | subs gained`.


## S4 Abdul Short — REAL Studio analytics (owner screenshots, 8 Nov 2026) → analytics/done/S4-abdul-short_2026-11-08
Numbers: 1.1k engaged views · 1k unique viewers · 8.9 h watch time · avg view 0:28 of 0:51 · **viewed 62.8 % / swiped 37.2 %** ·
+1 sub · 99.6 % new viewers · audience 82 % male, **65+ = 28.8 %**, 13–17 = 17.4 %, 35–64 ≈ 43 % · US 45 %, CA 7 %, UK 4.5 % · mobile 79 % ·
views flat after ~day 1.5 (the feed stopped pushing once swipe-rate data came in).
Retention curve (read from the graph, 0 % = bottom, 100 % line): starts **above 100 %** (re-watches) → **0:05–0:12 falls to ~70 %** →
slow to ~56 % at 0:22 → **0:22–0:27 falls to ~41 %** → ~32 % at 0:35 → ~25 % at the end.

WHY IT FAILED (with the second):
- **0:05–0:12 = the biggest loss (~40 points).** After the name chant the viewer hears a stat ("33 million… less than one point") and has to wait
  until 0:12 for the actual question. → The question MUST be said by 3 s.
- **0:22–0:27 = second loss (~15 points).** "Stick around because by the end of this you will know…" + "But today we are making him president" —
  pure filler / promise talk with nothing new. → NEVER talk about the video itself ("stick around", "by the end", "today we are").
- 37 % swiped: 62.8 % viewed is below the ~70–80 % of Shorts the feed keeps pushing → pushing stopped after ~36 h.
- Audience skewed old (65+ is the biggest group) and male → politics viewers, not our money audience → +1 sub only.

GOOD POINTS TO KEEP:
- **The first 4 seconds held > 100 %** (people re-watched the start): a famous name shouted + crowd energy + the "WHAT IF HE BECAME PRESIDENT?"
  text on frame 0 works. Keep a loud, instantly recognisable opening (made with OUR own sounds — never reuse real clip audio).
- "What if <famous person/event>" brought 60× more viewers than our explainer Shorts.
- 0:12–0:22 (the president-day-one story) held almost flat (~70 → 56 %): a concrete scene ("day one he picks up the pen…") keeps people.
- Ending mid-sentence probably made some re-watch (loop) — keep a real loop, but make it a complete, deliberate loop line.
