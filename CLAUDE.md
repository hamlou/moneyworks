# Moneyworks — stickman money explainer channel

**Two playbooks, never mix them (owner, 11 Oct 2026):** long-form episodes (`epNN`, 16:9, 10 min+) → `PLAYBOOK_LONG.md`. Vertical Shorts (`shortNN`, 9:16) → `PLAYBOOK_SHORTS.md`. `PLAYBOOK.md` is only the index. "PLAYBOOK §x" below means `PLAYBOOK_LONG.md`.

**Newest rules (11 Oct 2026, PLAYBOOK_LONG §0.11):** no commas in the spoken script (flowing sentences: "the bonus is free and also the house is free", never "bonus, free, house, free"); a NEW real photo every 10–15 s; a trend meme (format recreated with our cast, never a downloaded meme image) about every 30 s. `validate.py` enforces it for ep61+. Approved topics ep61–75 are listed in `AGENT_BRIEF.md` — look there before asking.

Before doing ANY work on a new episode, read `PLAYBOOK_LONG.md` completely and follow it exactly. The owner approved Series 1 (ep01–ep10) as the exact style they want forever — match it (characters, script structure, research standard, pacing, sounds, thumbnails, subscribe reminders, 8–15 min length).

**From ep61: PLAYBOOK §0 (Retention & CTR v3) overrides older rules** — same look/voice/cast, but scripts are one connected Dave story (no "Today: X, Y, Z", no "So let's recap"), hooks follow the flash-forward spec, thumbnails use the 5 concepts + phone/grid tests. `validate.py` enforces it.

**From 10 Oct 2026: PLAYBOOK §0.10 (Human hook + mixed media v4) is the newest rule set** — viewers were leaving in the first 6 s. Hook = concept + stakes + how the video ends, spoken to "you", a different `hook_form` every video; spoken (non-robotic) sentences with per-beat voice rate; real photos mixed with the drawings (`src/photo.tsx`, `pipeline/photos.py`); 10 min minimum. `validate.py` enforces it for ep61+.

"Make video 11" means: research → `pipeline/episodes/ep11.json` → `src/episodes/Ep11.tsx` → `src/thumbs/ep11.tsx` → register in `src/Episode.tsx` + `src/Root.tsx` → push → wait for `check` → `gh workflow run render.yml -R hamlou/moneyworks -f ep=ep11 -f chunks=10` → download to `Desktop\100\videos\ep11` → QA.

GitHub CLI: `%LOCALAPPDATA%\ghcli\bin\gh.exe` (logged in as hamlou). Repo: `hamlou/moneyworks` (private). Renders run on GitHub Actions, not the VPS.
