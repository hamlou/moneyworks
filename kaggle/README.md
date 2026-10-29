# Kaggle free GPU (owner chose it 29 Oct 2026 — the fix for 3-hour CPU voice runs)
- Account: kaggle.com (Google sign-in ok) → **phone-verified** (needed for GPU) → Settings → API → Create New Token →
  save `kaggle.json` at `%USERPROFILE%\.kaggle\kaggle.json`. Never paste the token into chat or the repo.
- Free quota: ~30 GPU-hours/week (T4/P100). Jobs are private notebooks under the owner's account.
- `py kaggle/run.py voice <id>` — voices `pipeline/episodes/<id>.json` on the GPU with the engine in its `"cb": {"engine": …}`
  (`dia` = Dia 1.6B with the fixed synthetic anchor `pipeline/voice_ref/dia_dave.*`, `turbo`, or default Chatterbox),
  then copies `pipeline/voice/<id>.flac/.json` back → commit them like a voice.yml result.
- `py kaggle/run.py cmd "<command>"` — any GPU command in the repo checkout; files under `out/` come back to `kaggle/out/<job>/`.
- The repo is public, so the job clones it with no credentials. Push your changes before launching a job.
