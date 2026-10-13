# SHORT — Episode 52: "He Hung Up On One Question"
Source: `pipeline/episodes/ep52.json` ("Why 'Get Rich' Gurus Sell Courses Instead of Doing It")
Format: standalone vertical Short, 1080×1920, real Andrew voiceover, Dave stickman cast.
Target runtime: ~75–85 seconds. Target words: ~190–210 (shorts run ~2.6 wps).
End CTA: per PLAYBOOK_SHORTS.md §6 — points to the full `ep52` long-form video.

Zero commas in every spoken line (PLAYBOOK_SHORTS.md §2 / §6 virality pass). Visual change every 1–2 s in the first 6 s, then every 1–3 s for the whole runtime — no static beat, no idle pose. Kept from the long episode: the two hardest numbers ($9,997 / $125,000,000) and the one emotional contrast (Dave about to pay vs. the guru's "proof" being a rental mansion). Everything else — the Zurixx pause-and-guess, Sam Brannan, MOBE's fine print, the refund maze, Kevin's subplot — is cut; a Short only has room for one loop.

---

## HOOK — 0.0–0.1 s, must already be moving, no fade and no logo

**Frame 0 (0.0 s):** A real "ONLINE COURSE CHECKOUT" screen photo slams in already mid-motion — thumb on the **BUY** button. Giant red stamp **"$9,997"** and **"2:00 AM"** hit together with an impact SFX. No Dave yet (frame-0 photo-only rule).

**VO (0.0–2.5 s), one flowing sentence, zero commas:** "It's two in the morning and Dave is one tap away from paying nine thousand nine hundred ninety seven dollars to a man he met on a webinar."

**Next cut (2.5 s):** Dave crashes into frame next to the photo mid-reach for the buy button, eyes wide, one hand frozen over his phone.

**Escalation beats, one new visual every 1–2 s through 6 s:** mansion photo slams in → "I MADE A MILLION LAST YEAR" speech-bubble stamp over it → a second stamp, oversized: **"$125,000,000"** → Dave's jaw drop reaction pose. By 3 s the viewer has the problem (guru selling a secret for thousands); by 6 s the escalation lands (this made a real program $125M).

---

## SCRIPT

**[~6–16 s] — The free sample that wasn't free**
**VO:** "Ninety minutes earlier it was a free training and by minute ten Dave had seen the mansion the car and a jet ski but still no actual secret." / "Then a timer appeared and nineteen spots turned into one and Dave bought the beginner workshop for one thousand nine hundred ninety seven dollars."
**Visual:** Unique countdown-timer photo, Dave points at it wide-eyed → unique "SOLD OUT 1 SPOT LEFT" screen photo, Dave's hand already tapping. Stamp: **"$1,997 GONE"**.

**[~16–26 s] — Just the beginner level**
**VO:** "On day two the guru said the real system lives in Platinum and Dave realized this was a game where the sword costs money then the armor then the horse and you never reach the castle."
**Visual:** Unique "GOLD / PLATINUM / DIAMOND" pricing-tiers photo, Dave climbing a drawn ladder prop toward it, each rung lighting up red. Meme beat 1: Dave mid-climb with a classic "this is fine" dog-in-burning-room format, recreated with our cast — caption **"STILL THE BEGINNER LEVEL."**

**[~26–36 s] — Who sold the shovels**
**VO:** "So Dave searched the mansion photo and found out it was a rental you can book by the night and he searched the guru's business and found exactly one business the course itself."
**Visual:** Unique vacation-rental-listing photo, Dave facepalming beside it. Stamp **"IT'S A RENTAL."** Cut to unique online-course-dashboard photo, Dave circling it: **"THE ONLY PRODUCT."**

**[~36–46 s] — The machine, not the man**
**VO:** "The F T C says one program called MOBE pulled in more than one hundred twenty five million dollars and in its own words the primary thing MOBE sells is more MOBE memberships."
**Visual:** Unique stacked-invoices/receipts photo, Dave staring at the oversized stamp **"$125,000,000"** landing with an impact SFX. Meme beat 2: Dave as the "math lady" confused-equations format over the price ladder $49 → $4,997 → $29,997, caption **"THE PRODUCT IS MORE PRODUCT."**

**[~46–56 s] — Do the math**
**VO:** "A one thousand nine hundred ninety seven dollar workshop sold to a thousand people is almost two million dollars even if nobody in the room ever makes a cent."
**Visual:** Unique calculator/phone-math photo, Dave tapping it with a prop pen, numbers counting up fast to **"$1,997,000."** Quick reaction pose: Dave's realization face, hand to forehead.

**[~56–66 s] — The refund maze**
**VO:** "Dave asked for his money back and the hundred percent risk free guarantee turned into three replies and zero refunds which felt like pushing a revolving door and ending up exactly where he started."
**Visual:** Unique "support ticket closed" / email-thread photo, Dave shoving a drawn revolving-door prop that just spits him back out. Mid-video subscribe reminder lands right here in the top safe zone, brief, not covering Dave's face or the photo.

**[~66–75 s] — The one question**
**VO:** "So Dave called his coach back and asked one question. What did your typical student earn last year after paying for the program and can you send that in writing." / "Silence. Then I have another call. Click."
**Visual:** Unique phone-call-screen photo, Dave holding it up calm and steady — contrast against his earlier panic pose. Stamp **"CLICK."** with a hang-up SFX. Dave closes the Platinum tab: stamp **"$9,997 SAVED."**

---

## ENDING — long-form CTA (PLAYBOOK_SHORTS.md §6)

**VO (final line):** "That one question is what ends every pitch like this and Dave's full fight to get his money back and report the whole thing is one tap away." 
**Visual:** Dave gives a thumbs-up next to an arrow graphic pointing down/out, text **"FULL STORY ↓."** No fade, cuts clean on the last stamp.
**Platform setup (not on-screen):** set the Short's Related Video field to `ep52`; pin a top comment linking the full ep52 video.

---

## MIXED-MEDIA GUARDRAILS (per PLAYBOOK_SHORTS.md §3–5, §7)
- Target 12–14 unique photo IDs for `pipeline/photos/ep52.json` — none repeated, each matched to its exact VO beat. Suggested search queries for `photo_find.py`: "online course checkout screen", "countdown timer sale screen", "sold out one spot left banner", "vacation rental listing screen", "online course dashboard pricing tiers", "stack of invoices receipts", "calculator phone math", "support ticket closed email", "phone call screen incoming", "mansion exterior luxury", "jet ski on trailer", "credit card limit increase screen".
- Dave visible in the same frame as the photo in ≥80% of photo scenes; frame 0 is the one photo-only exception.
- 2 meme beats (ladder-climb "this is fine," math-lady price ladder) — original channel character in a recognizable trending format, never a downloaded meme image.
- A pose change (gesture/reaction/gesture) roughly every 1–2 s; no idle-bob-only scenes.
- Faces stay clear of every stamp, caption, and CTA.
- Pre-render audit per §3: hook works muted, no photo repeats, character+photo coexist ≥80%, visual change every 1–3 s, memes legible ≥2.5 s, VO/animation aligned.

## SFX cues
`stamp` (checkout/dollar stamps, hang-up) · `cash` (ladder climb, $ counting) · `whoosh` (scene transitions) · `thud` (mansion/rental reveal) · `ding` (realization beat) · `click` (hang-up).
