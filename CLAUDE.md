# Moneyworks — stickman money explainer channel

Before doing ANY work on a new episode, read `PLAYBOOK.md` completely and follow it exactly. The owner approved Series 1 (ep01–ep10) as the exact style they want forever — match it (characters, script structure, research standard, pacing, sounds, thumbnails, subscribe reminders, 8–15 min length).

**From ep61: PLAYBOOK §0 (Retention & CTR v3) overrides older rules** — same look/voice/cast, but scripts are one connected Dave story (no "Today: X, Y, Z", no "So let's recap"), hooks follow the flash-forward spec, thumbnails use the 5 concepts + phone/grid tests. `validate.py` enforces it.

**From 10 Oct 2026: PLAYBOOK §0.10 (Human hook + mixed media v4) is the newest rule set** — viewers were leaving in the first 6 s. Hook = concept + stakes + how the video ends, spoken to "you", a different `hook_form` every video; spoken (non-robotic) sentences with per-beat voice rate; real photos mixed with the drawings (`src/photo.tsx`, `pipeline/photos.py`); 10 min minimum. `validate.py` enforces it for ep61+.

"Make video 11" means: research → `pipeline/episodes/ep11.json` → `src/episodes/Ep11.tsx` → `src/thumbs/ep11.tsx` → register in `src/Episode.tsx` + `src/Root.tsx` → push → wait for `check` → `gh workflow run render.yml -R hamlou/moneyworks -f ep=ep11 -f chunks=10` → download to `Desktop\100\videos\ep11` → QA.

GitHub CLI: `%LOCALAPPDATA%\ghcli\bin\gh.exe` (logged in as hamlou). Repo: `hamlou/moneyworks` (private). Renders run on GitHub Actions, not the VPS.
