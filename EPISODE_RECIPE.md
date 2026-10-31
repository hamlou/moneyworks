# EPISODE RECIPE — the ONLY file to read for a new episode (owner 30 Oct 2026: same style as ea1, far fewer tokens)
Style = ea1 (reverse-engineered, owner-approved). Do NOT re-read STYLE_3D.md / PLAYBOOK_*.md / lib.py / Ea1.tsx in full —
the rules below are the summary; open a file only with grep or a line range when a step needs it.

## 1. Locked style (checklist — every episode)
- **Hook 0–12 s** (STYLE_3D §15.3): 0 s PRIZE/RESULT (most spectacular true image + rolling number) → ~4 s TWIST → ~7 s QUESTION (= title, new world slams in, white flash) → ~12 s PROMISE (Dave points at you). New image every 0.5–1.5 s, densest SFX, no info cards before 12 s.
- **Writing** (§0.1, §16.1): natural connected sentences, no commas, no fragment chains; short sentences when stakes rise; mini-loop every 20–40 s (claim → result with number → 1–3-word punch line); ONE running gag repeated 4–6×; one "have a guess"; one fake-out near the end; scoreboard card at every chapter turn; music-only breath between chapters; end = lesson + honest verdict + comment question + Dave's sign-off line.
- **LOOP STACK (long-form, owner 31 Oct 2026 — mandatory)**: never one loop per chapter. Main promise L1 opens in the hook and pays off ONLY in the last chapter; ≥ 2 loops open at every moment; every chapter ends on a teaser that opens the next; ≥ 2 long arcs that span 2+ chapters (e.g. a cold-open object paid off late, "keep an eye on X… later"); every loop closes. Tag them ⟨open:ID⟩ ⟨close:ID⟩ in `<id>_full_script.md`; `py tools/loopcheck.py <id>` must print LOOPS OK before voicing.
- **Facts**: every line has a source tag [Sx]; sensitive people → only quotes/attributed paraphrase, claims paired with fact checks, no verdict from Dave.
- **Look**: Blender Dave (suit/hoodie per role), ≥ 50 % real 3D, frame-0 motion, shake/flash on hits; home-base cards with Src line.
- **Sound**: per-scene music (`<Music segs>` kit2, KM CC-BY library `public/music/km`, silence before punchlines, credit tracks), ≥ 50 SFX cues/min, own sounds via `pipeline/sfx/<id>.json`.
- **No**: memes, thumbnails, owner's voice, limb clipping (`py tools/clipcheck.py` must pass).

## 2. Steps (copy, don't rewrite)
1. `py tools/new_ep.py <id> "<Title>"` → scaffold from ea1 (json draft, sfx plan, blender shots, TSX registered).
2. Research: max ~6 standard searches + ~3 page reads (web-fetch agents in parallel). Facts → `sources` list in the draft.
3. Write `<id>_full_script.md` (chapters + ⟨open/close⟩ loop tags + [Sx]) → `py tools/loopcheck.py <id>` → `py tools/md2beats.py <id>`; hook beats k1–k4 in `pipeline/episodes/<id>_draft.json` (k1–k4 hook + body). Rename to `<id>.json` + push → voice auto (only new lines voiced; ~3–10 min).
4. While voice runs: edit `blender/<id>.py` shot states (reuse ea1 shots H/S/M/C/E/K, change props/text only), `blender/<id>_lens.json`, `.chunks`, `blender/RUN`; sounds `py pipeline/sfx_synth.py <id>`.
5. Voice done → `git pull`, `ffmpeg -i pipeline/voice/<id>.flac -af atempo=0.9 public/<id>/voice.flac`; set shot lengths from beat times; push blender → full render.
6. Edit `src/v6/<Id>.tsx`: only the anchor words (`at('k1','word')`), card texts, Src lines, cues, music segs.
7. Shots done → copy `shot_*.mp4` (crf 23) + `cut_*.png` to `public/<id>/` → push → `gh workflow run v6demo.yml -f comp=<Id>`.
8. QA: ONE 12-s hook strip at 4 fps + ONE contact sheet at scale 0.5; loudness check by `volumedetect` numbers only.
9. `videos/<id>/` + description (sources + music credits + LICENSES footer).

## 3. Token rules (how Claude works on episodes)
- Never read whole big files; `grep -n` then `sed -n a,bp`. Never re-read a file just edited.
- Images: max 3 per episode (hook strip, one sheet, one cut-out), scaled ≤ 0.5. No per-shot sheets.
- Waits: one background command that blocks until done (`until … completed`), never polling/status checks in between.
- Research results go straight into the JSON `sources`; no long summaries to the owner.
- Replies to the owner: short status + what's needed from them. No tables of options unless a decision is needed.
- Long work (render, voice) runs in parallel with the next step (memory: work while waiting) — but no extra analysis nobody asked for.
- New reverse-engineering / style studies only when the owner asks.
