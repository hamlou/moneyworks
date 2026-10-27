# Moneyworks — stickman money explainer channel

**NEWEST — overrides everything below (23 Oct 2026): `STYLE_3D.md` (v6 "3D animator" style).** Every long video now copies the owner's reference video (https://youtu.be/9yXNBbf3TW0) ~99 %: each episode = Dave's experiment (goal + deadline + scoreboard, Day/Week chapters), casual run-on writing with fake-outs and absurd comparisons, 180–200 wpm voice with real pauses (`cb.cfg`), 3D-look Dave in the lower right with a pose/face swap every 1.5–3 s, dark home-base set + UI cards + big number cards + 3D sets, no captions, no meme cards, no polaroids. Kept from the old rules: zero commas, Dave first person to "you", sources, free-licence photos, `at`-word anchoring. Read `STYLE_3D.md` first, then the playbook only for what it doesn't cover.

**Newest (18 Oct 2026, PLAYBOOK_LONG §0.12):** Dave is the host talking to "you" in the first person, almost no stats. "Redo / upgrade / ameliorate epNN" = follow `UPGRADE.md` (edit the episode JSON only, overlay layer `src/upgrade.tsx`), never rebuild from scratch. Dave = new big-head avatar Dave (`<Stick big>`), voice = Chatterbox (`voice.yml`), §0.12 C.

**Two playbooks, never mix them (owner, 11 Oct 2026):** long-form episodes (`epNN`, 16:9, 10 min+) → `PLAYBOOK_LONG.md`. Vertical Shorts (`shortNN`, 9:16) → `PLAYBOOK_SHORTS.md`. `PLAYBOOK.md` is only the index. "PLAYBOOK §x" below means `PLAYBOOK_LONG.md`.

**Newest rules (11 Oct 2026, PLAYBOOK_LONG §0.11):** no commas in the spoken script (flowing sentences: "the bonus is free and also the house is free", never "bonus, free, house, free"); a NEW real photo every 10–15 s; a trend meme (format recreated with our cast, never a downloaded meme image) about every 30 s. `validate.py` enforces it for ep61+. Approved topics ep61–75 are listed in `AGENT_BRIEF.md` — look there before asking.

Before doing ANY work on a new episode, read `PLAYBOOK_LONG.md` completely and follow it exactly. The owner approved Series 1 (ep01–ep10) as the exact style they want forever — match it (characters, script structure, research standard, pacing, sounds, thumbnails, subscribe reminders, 8–15 min length).

**From ep61: PLAYBOOK §0 (Retention & CTR v3) overrides older rules** — same look/voice/cast, but scripts are one connected Dave story (no "Today: X, Y, Z", no "So let's recap"), hooks follow the flash-forward spec, thumbnails use the 5 concepts + phone/grid tests. `validate.py` enforces it.

**From 10 Oct 2026: PLAYBOOK §0.10 (Human hook + mixed media v4) is the newest rule set** — viewers were leaving in the first 6 s. Hook = concept + stakes + how the video ends, spoken to "you", a different `hook_form` every video; spoken (non-robotic) sentences with per-beat voice rate; real photos mixed with the drawings (`src/photo.tsx`, `pipeline/photos.py`); 10 min minimum. `validate.py` enforces it for ep61+.

"Make video 11" means: research → `pipeline/episodes/ep11.json` → `src/episodes/Ep11.tsx` → `src/thumbs/ep11.tsx` → register in `src/Episode.tsx` + `src/Root.tsx` → push → wait for `check` → `gh workflow run render.yml -R hamlou/moneyworks -f ep=ep11 -f chunks=10` → download to `Desktop\100\videos\ep11` → QA.

GitHub CLI: `%LOCALAPPDATA%\ghcli\bin\gh.exe` (logged in as hamlou). Repo: `hamlou/moneyworks` (private). Renders run on GitHub Actions, not the VPS.

**Shorts planning layer (27 Oct 2026): `PLAYBOOK_SHORTS.md` §10.** Before writing a Short brief it must pass 3 gates (universal relatability, completion compulsion via the looped arc hook → rising → CONFLICT → COMEBACK → payoff, open-loop hook written last as a question or withheld result). After publishing: judge at 48 h, log swipe-through (target ≥ 80%) and average view duration in `pipeline/ctr_log.md`, upload the next Short only when views/hour has stayed under ~5k for 24 h. Owner rules in §2–§9 win on any conflict.


**Long-form planning layer (27 Oct 2026): `PLAYBOOK_LONG.md` §12.** Before writing an episode brief it must pass 3 gates (universal relatability, completion compulsion via the looped arc hook → rising → VILLAIN REVEAL → LOW POINT → COMEBACK → payoff mapped to the §0.2 story spine, open-loop hook written last as a question or withheld result). After publishing: judge at 48 h, log CTR (target ≥ 5–8 %), average view duration (target ≥ 50 % of length), and retention graph drops in `pipeline/ctr_log.md`. Owner rules in §0–§11 win on any conflict.

