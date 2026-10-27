# SHORT 61 — What If Abdul El-Sayed Became President?

Format: 9:16 YouTube Short. Target 50–65 seconds. This build follows the newer 3D-animator direction: 3D Dave, no meme cards, no burned-in subtitles, no polaroids, real photo plates and designed UI/callout cards.

## Story loop
Opening question: would America accept a Muslim president before he even gets to change anything?
The Short answers it with the real political attacks, his healthcare/campaign-finance agenda, and the institutional obstacle of Congress. Final line returns to the opening question so the last frame loops into the first.

## Factual guardrails
- Clearly hypothetical. As of October 27 2026 El-Sayed is a Democratic U.S. Senate candidate in Michigan and not a presidential candidate.
- AP reported that Trump called him a "jihadist" and questioned his loyalty. El-Sayed has rejected the accusations; Al Jazeera reported that he called them "deflections and deceptions based on no evidence".
- His campaign platform includes Medicare for All and getting corporate money out of politics.
- Do not state that an insurance company paid for attacks on him. The script only says insurers could have material interests at stake if a single-payer system changed their role.
- A president cannot enact Medicare for All alone. Congress must pass legislation.
- Keep the distinction clear between a reported fact, a campaign position, and the hypothetical.

## Visual language
- Use 3D Dave from src/v6/Dave3D.tsx and the v6 pose/face swap grammar.
- Dark charcoal home-base set, dramatic camera movement, punch-in photo plates, rounded dark UI cards, kinetic title cards and big labels.
- Real photo appears exactly when its subject is spoken: El-Sayed, Oval Office/White House, Trump rally, hospital/healthcare, insurance, Capitol/Congress.
- Six unique photo IDs, each used once. No generic filler and no image reused under a different crop.
- Dave stays visible in the lower-right third. Protect his face and the faces in documentary photos.
- Meaningful visual change every 1.5–2.5 seconds. Pose/face swaps at spoken-word anchors.
- No memes of any kind. No meme formats. No burned-in subtitles or karaoke captions. No polaroid/tape/sticker photo treatments.
- Music bed runs continuously under the voice. Short SFX hits only on key reveals and scene transitions.
- 3D Dave is the channel's own character; do not copy the reference creator's character, voice, footage, music, or jokes.

## Voice
Use the repository's newer Chatterbox voice path, not edge-tts Andrew. Settings are cb.cfg=0.35 and cb.exag=0.5 with per-beat variation. This uses Chatterbox's built-in voice and does not clone the reference creator.

## Photo manifest
pipeline/photos/short61.json uses Commons query entries. The Short workflow resolves and downloads only free-commercial-use assets and writes credits/licences into the manifest. If the El-Sayed photo cannot be found under a free licence, do not substitute an unlicensed editorial image; revise the shot to an original neutral visual while retaining the factual name card.

## Build sequence
1. Run the voice GitHub Actions workflow for short61 to create pipeline/voice/short61.flac and timings.
2. Run the short workflow with id short61 and composition Short61.
3. Inspect the final MP4 and contact sheet. Confirm each photo matches its spoken anchor, Dave's face is never obscured, and no dead/empty stretch remains.
4. Final deliverable is deliverables/short61.mp4. Add a YouTube Related Video only when the matching long-form Abdul El-Sayed episode exists; do not invent a link.

## Sources
- Associated Press, Oct 25 2026: https://apnews.com/article/162330c3d193ecb94538f8dd8083f916
- The Guardian, Oct 27 2026: https://www.theguardian.com/us-news/2026/oct/27/jd-vance-el-sayed-attacks
- Official campaign platform: https://abdulforsenate.com/
