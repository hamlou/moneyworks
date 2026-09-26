# Moneyworks — stickman money explainer channel

Before doing ANY work on a new episode, read `PLAYBOOK.md` completely and follow it exactly. The owner approved Series 1 (ep01–ep10) as the exact style they want forever — match it (characters, script structure, research standard, pacing, sounds, thumbnails, subscribe reminders, 8–15 min length).

"Make video 11" means: research → `pipeline/episodes/ep11.json` → `src/episodes/Ep11.tsx` → `src/thumbs/ep11.tsx` → register in `src/Episode.tsx` + `src/Root.tsx` → push → wait for `check` → `gh workflow run render.yml -R hamlou/moneyworks -f ep=ep11 -f chunks=10` → download to `Desktop\100\videos\ep11` → QA.

GitHub CLI: `%LOCALAPPDATA%\ghcli\bin\gh.exe` (logged in as hamlou). Repo: `hamlou/moneyworks` (private). Renders run on GitHub Actions, not the VPS.
