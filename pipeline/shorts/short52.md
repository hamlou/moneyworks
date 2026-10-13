# SHORT — Episode 52: "He Hung Up On One Question" (v2, 13 Oct 2026)
Source: `pipeline/episodes/ep52.json` ("Why 'Get Rich' Gurus Sell Courses Instead of Doing It")
Format: vertical Short, 1080×1920, Andrew voice at +9%, 89 s, 15 sentences, zero commas, zero silence.
Files: script `pipeline/episodes/short52.json` · animation `src/shorts/Short52.tsx` · meme formats `src/memes52.tsx` · photos `pipeline/photos/short52.json` (18 Wikimedia Commons photos, all free licences).
Rules followed: `PLAYBOOK_SHORTS.md` §9 (real photo about every 5 s + a meme every 2–4 s, each tied to the spoken words) and §6 (end CTA → the linked long video).

v1 (drawn props only, 2 memes, 0.3–0.5 s gaps between sentences) was rejected by the owner. Do not go back to it.

## Layout
Top 1100 px = real photo full width (meme card pops over it). Bottom = drawn stage, Dave / guru / coach react with a new pose every ~1.5 s. Captions: 3 words at a time on the line between, spoken word yellow.

## Timeline — what is spoken → photo → meme

| # | Spoken (no commas) | Real photo (on the word) | Meme / kinetic text |
|---|---|---|---|
| o1 | It's two in the morning and Dave is one tap away from paying $9,997 to a man he met on a webinar. | `night_phone` (frame 0) → `card_hand` on "paying" | POV text box · "2:00 AM" · "$9,997" slam · **My brain at 2 AM: BUY THE $9,997 COURSE** |
| o2 | But one question is about to make that man hang up on him. | — (red "?" panel, 2.6 s) | "ONE QUESTION" → "*CLICK*" (open loop, paid off in o12–o13) |
| o3 | Three weeks earlier a guy standing in front of a mansion said I made a million dollars last year and I will show you how for free. | `mansion` | **Source: trust me bro** |
| o4 | The free training showed Dave the mansion and the Lamborghini and a jet ski but never the actual secret. | `lambo` on "Lamborghini" → `jetski` on "jet" | **Is this a pigeon? → IS THIS A BUSINESS PLAN?** |
| o5 | Then a countdown timer appeared and twenty spots became one so Dave panicked and paid $1,997. | `stopwatch` | "20 SPOTS" → "1 SPOT LEFT" · **Panik / Kalm / Panik** · **Shut up and take my $1,997** |
| o6 | On day two the guru said the real system lives in Platinum like a video game where the sword costs money and the armor costs money and you never reach the castle. | `armor` on "sword" → `castle` on "never" | Gold/Platinum/Diamond cards · **This is fine (still the beginner level)** · "NEVER." |
| o7 | So Dave searched the mansion photo and it was a vacation rental you can book by the night. | `rental_villa` | **Wait it's a rental? / Always has been** |
| o8 | Then he searched for the guru's real business and the only business was the course itself. | `night_desk` | **Spider-Man pointing: the course ↔ selling the course** |
| o9 | The F T C says one program like this called MOBE took more than $125,000,000 and the primary thing it sold was more memberships. | `ftc_hq` → `cash_hands` on "took" | "$125,000,000" slam · **Stonks** · mid subscribe reminder |
| o10 | Do the math because one workshop sold to a thousand people is almost two million dollars even if nobody in the room earns a cent. | `calculator` → `seats` on "sold" | "$1,997,000" slam · **Drake: flipping houses ✗ / selling a course about it ✓** |
| o11 | Dave asked for his refund and the risk free guarantee became a revolving door with three replies and zero dollars back. | `revolving_door` on "revolving" | **Surprised chat: "GURU: no"** · "3 REPLIES" → "$0 BACK" (Dave walks in circles) |
| o12 | So he called his coach and asked the one question a guru hates. What did your typical student earn after paying and can you send that in writing. | `handset` | question bubble · **Two buttons: put it in writing / hang up** |
| o13 | The coach went silent and said I have another call and hung up. | `hung_up` on "another" | **coach.exe has stopped responding** · "CLICK." |
| o14 | Dave closed the Platinum tab and kept his $9,997. | `benjamin` | **Success fist: KEPT MY $9,997** |
| o15 | But his first two thousand is still gone and how he fights to win it back is in the full video linked right below so tap it now. | — (video player card of ep52) | "-$1,997 STILL GONE" · **To be continued arrow** · arrows down · subscribe |

22 memes, 18 photos, 89 s, longest stretch without a meme about 3.8 s. Added 14 Oct 2026 to close the gaps (owner: "the memes needs to be every very few seconds"): **I'm in danger** (o2) · **Trade offer** (o6 armor) · **Nervous sweating: when the FTC reads the fine print** (o9) · **Confused math: Dave doing guru math** (o10) · **Dave waiting for his refund** (o11) · **Uno reverse** (o12). Facts match ep52's sources (FTC v. MOBE June 2018: "more than $125 million", "the primary thing MOBE sells is more MOBE memberships"; $1,997 × 1,000 is illustrative math; Dave, the guru and the coach are fictional).

## Upload checklist
- Related Video (YouTube Studio → Short → Related video) = the ep52 long video. Pin a comment with the same link.
- Titles to test: "He asked ONE question and the guru hung up" · "The $9,997 course that was a rental mansion" · "Ask every guru this before you pay".
- Description: add the photo credits (CC BY / BY-SA need attribution) — `credit` + `license` of each entry in `pipeline/photos/short52.json`, source Wikimedia Commons.

## Render
`gh workflow run short.yml -R hamlou/moneyworks -f id=short52 -f composition=Short52` → result lands in `deliverables/short52.mp4` and as artifact `short52-video`.
