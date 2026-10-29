# ea1 brief — "What if Abdul El-Sayed became president?" (first minute of a 10-min video)

## Safety (owner: sensitive — sources for everything)
- Every line has a source id (`src` in ea1.json → `sources` S1–S7). Quotes are verbatim and attributed (Trump's post, El-Sayed's reply, his campaign's words).
- Opponents' claims are labelled as claims and paired with the fact check (S7). We never call anyone a racist ourselves.
- Real people are never animated, voiced or given words. Trump appears only as his quoted post on a card with the source line; El-Sayed only as the public-domain Senate photo.
- Hypothetical framing is explicit: he is a 2026 Senate candidate; "president" is our what-if.
- **Not sourced → NOT in the script:** "insurance companies hate him" (no source shows insurers campaigning against him); replaced by his campaign's own words that private insurance should become "redundant and unnecessary".

## Three gates
- Relatable: PASS — health insurance, a president, money in politics, being called the wrong name: everybody gets it muted.
- Completion compulsion: PASS — who would fight hardest to stop him (insurers? AIPAC money? Trump?) and what would change for you is only answered in the full video.
- Open loop: PASS — h1 question + h10 question; the answer is the rest of the video.

## Looped arc (this minute = HOOK + start of RISING)
| Phase | Beats | What |
|---|---|---|
| HOOK | h1–h3 | the question, who he is, he is eligible |
| RISING | h4–h5 | day one: Medicare for All, private insurance "redundant and unnecessary" |
| CONFLICT (teased) | h6–h9 | $33 M against him, Trump's posts, the Muslim Brotherhood claim + fact check |
| OPEN LOOP | h10 | what changes for you + who fights hardest (answered in the 10-min video) |

## Hook shot plan (first 10 s, everything moves)
| Time | Visual | Spoken |
|---|---|---|
| 0.0–1.0 | Dave in a suit walks into a generic presidential office (no real seal), camera pushes, he spins in the big chair | "What would happen…" |
| 1.0–3.0 | stethoscope + Egypt flag / pyramid postcard on the desk (from "doctor whose dad came from Egypt") | "…a doctor whose dad came from Egypt…" |
| 3.0–6.0 | whip-zoom to the giant chair, counter rolls "MOST POWERFUL CHAIR" | "…became the president…" |
| 6.0–10 | the real public-domain photo slides in on a world screen + "2026 SENATE CANDIDATE" label | h2 |

## Concept characters / worlds / costumes
- Concept character: the INSURANCE giant (muscle body, shield-logo box head) — reacts to the word "unnecessary" (stamp hits it).
- Money world: a cannon blasting $ bales + counter to $33,000,000 on "thirty three million".
- Quote cards: Trump's post (text only, generic card, source line), El-Sayed's reply card, the fact-check "NO EVIDENCE" stamp (Bridge Michigan).
- Dave costumes: suit (president what-if), doctor coat on "doctor", professor-style glasses NOT used.

## Build status (29 Oct 2026, session paused at usage limit) — NEXT AGENT CONTINUE HERE
- DONE: sourced script `ea1.json` (S1–S7), voice auto-made (`pipeline/voice/ea1.json`, 62 s) and slowed to 0.9× → `public/ea1/voice.flac` (68.9 s, STRETCH = 1/0.9); sound plan `pipeline/sfx/ea1.json` → `public/sfx/ea1/*.wav`; public-domain photo `public/ea1/elsayed_senate.jpg`; Blender shots `blender/ea1.py` (O office, M sign + INSURANCE giant droop at "unnecessary", C cash rain, E dusk office, K suit cut-outs), lengths from the voice in `blender/ea1_lens.json`; a PREVIEW render was started (`blender/RUN` = ea1 preview).
- TODO: 1) check preview stills (artifact `ea1-preview`), fix, then `blender/RUN` = `ea1 full 16 cycles` with 10-frame chunks for O/M/C/E + K; 2) write `src/v6/Ea1.tsx` (copy AnimTest/Test1 patterns): segments by voice beats h1…h10 — O → home base (photo card + "2026 U.S. SENATE CANDIDATE · MICHIGAN", Constitution ✓ card) → M (+ campaign quote card "redundant and unnecessary", UNNECESSARY stamp) → home base "but first he has to win" → C ($33,000,000 counter, "United Democracy Project (AIPAC super PAC) · NBC News Oct 9 2026") → 48.4% vs 47.6% bars (AP) → Trump post card VERBATIM (S6, "Truth Social · Oct 8 2026 · via Mediaite") with "Mohammed" glitch → his reply card → claim card (Rogers, Aug 5) + "NO EVIDENCE — Bridge Michigan, Sep 3 2026" stamp → E with the open question; small source line on every fact card; SFX cues `ea1/<name>`; use remotion `<Freeze>` to hold shots; 3) register in `src/v6/Root.tsx`, render `v6demo.yml -f comp=Ea1`, QA, send to owner.
