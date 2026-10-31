# ea1 — owner requests checklist (31 Oct 2026). Check EVERY line before delivering. ✓ = in code, ⏳ = waiting on render

## Cold open (before the approved video)
- ✓ 4 real clips, each person says only his name: Fox (Baier) → NBC (Meet the Press) → CBS reporter → Trump ("Mohammed Abdul") — `public/ea1/names/n1-n4.mp4`, `src/v6/Ea1Cold.tsx`
- ✓ then the papers/books scene: real headlines with his name + his 2 real books (shot N; fix: books upright + in frame, indoor background)

## Hook fixes (the approved 1-min video, otherwise unchanged)
- ✓ 0:08 "what if Abdul El-Sayed…": his photo exactly where Dave's hand points (`Ea1.tsx` S branch)
- ✓ right after "…president of the United States?": 3 rally/speech clips × 1 s (r1 MLive, r2 WWMT, r3 AP) showing how much people love him, then the video continues
- ✓ 0:33 "day one" scene was unreadable → real 3D government: Capitol at sunrise (shot G) + giant insurance card that falls on "unnecessary" (mascot removed)
- ✓ 0:52 freeze → shot lengths read from `ea1_lens.json` (no hard-coded len24)
- ✓ Dave's black outlines thinner (Blender 4.6→2.6 px, cut-out CSS 5→2 px) — S, M, C, E, K re-rendered

## Full video
- ✓ ~10 min (voice 594.7 s + cold open + rally clips ≈ 10.1 min)
- ✓ NEW creative 3D scenes in the spirit of the loved ones (lamp zoom, chair spin) — never duplicates: G Y Q P R B T V A D W
- ✓ stacked loop method: main payoff (who fights hardest) only at the end, ≥ 2 loops open always, teaser at every chapter end — `tools/loopcheck.py` = LOOPS OK
- ✓ every fact sourced/verified, sensitive wording (Bridge $205M "on pace", FEC $59.3M vs $23M, AOC $1M WLOS, AP rally quotes verbatim)
- ✓ music per scene (KM CC-BY, all credited), dense SFX, description with sources + clip credits
- ✓ renders: GitHub only (+ denoiser, fast 1600×900 mode, max 16 parallel)

## To finish (in order)
1. ✓ main render 41193929766 + W re-render (walls side by side, 1st W hid walls 2-3) done → download shots + cut_*.png into `public/ea1/` (crf 23)
2. ✓ check frames (one grid): G, M card falls logo-up, N books, W walls show text, thin outlines
3. ✓ push → `gh workflow run v6demo.yml -f comp=Ea1Full`
4. ✓ QA: hook strip (cold open → photo → rally clips) + one contact sheet + loudness
5. ✓ `videos/ea1/ea1_full.mp4` + send copy to the owner

## v3 (owner verdict 31 Oct evening) — keep ONLY 0:00–1:10, and DELETE every insurance moment in it (owner hates it); rebuild everything after
- ✓ all 4 name clips cut right on the last sound of the name (Fox 3.40 s, NBC 1.25, CBS 2.78, Trump 5.66 = mouth almost closed, "Abdul" fully heard)
- □ after the 3 rally clips → cut straight to the next scene (no return to the chair shot)
- ✓ cold-open papers/books → headline highlight fast-cut montage (owner's example: marker wipe on the name, slow push-in, 0.3–0.8 s cuts, sound per cut) — `Montage` in Ea1Cold.tsx, preview sent
- □ full reverse-engineering of the reference channel (scenes, animation, pacing), not only hooks
- □ script: problem-after-problem loop chain until the final payoff
- □ visuals: few text cards; short word-synced scenes; human-feeling animation (not robotic)
- □ no freezes anywhere
- ✓ insurance scene (h4 'day one… Medicare for All', h5 'redundant and unnecessary', p5 'Awkward') removed from the first 1:10 — voice re-made without them
- ✓ jokes right after the rally clips: j1 "…the dog leaves", j2 "…the suit asked for a refund" (voice running)
- ✓ whole Gaza part removed (owner 31 Oct: drop the whole line) — script, voice beats, source S15
- □ Ea1.tsx hook timeline: drop h4/h5/p5 scenes, add j1/j2 scene (Dave reacts over the rally crowd), end the kept part at p6
