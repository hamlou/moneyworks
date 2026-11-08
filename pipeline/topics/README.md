# Topics + lessons (automatic, weekly)

## 1. Topic finder — `tools/topics.py` → `pipeline/topics/<date>.md`
- Searches YouTube with yt-dlp (no API key) for money-explainer queries (`QUERIES` in the script), keeps ~100 long videos.
- For each channel reads its last 15 uploads → median views. **Multiple = video views / channel median** (ranks the idea, not channel size). Channels with median < 1k or < 4 videos are ignored (noise).
- Top 20 outliers go to Gemini (`ask()` from `tools/write.py`), which proposes **5 fresh topics** inspired by their angles: universal, a 12-year-old gets it, title = question or withheld result, hook + payoff. Proposals only — owner approves before any script.
- Runs: `.github/workflows/topics.yml` every Monday 07:17 UTC (or Actions → topics → Run). Commits the md and uploads it to release `ref` as `topics-latest.md`.
- Local: `py tools/topics.py --n 40` (light, metadata only).

## 2. Lessons loop — `tools/lessons.py` → `LESSONS.md`
- Reads our last 10 uploads via YouTube Data API v3 + Analytics API v2: views, CTR, average view %, retention curve.
- Finds the 3 biggest retention drops, maps each second to the spoken line (`pipeline/auto/<id>.json` matched by title or a `"youtube_id"` field, + `src/v6/<id>_timing.json`).
- Gemini writes 3–6 concrete lessons; new ones (not duplicates) are appended under today's date.
- Runs: `.github/workflows/lessons.yml` every Sunday 06:43 UTC. Skips cleanly until the 3 secrets below exist.
- Local: `py tools/lessons.py --dry` (needs the 3 `YT_*` env vars).

## Owner one-time setup (about 10 minutes)
1. https://console.cloud.google.com → create project `moneyworks`.
2. APIs & Services → Library → enable **YouTube Analytics API** and **YouTube Data API v3**.
3. APIs & Services → OAuth consent screen → External, add your own Google account as a **test user** (scopes are added by the script).
   Then click **Publish app** (→ "In production"; no review needed for your own use) — otherwise the refresh token expires after 7 days.
4. Credentials → Create credentials → OAuth client ID → Application type **Desktop app** → copy the client ID + secret.
5. On the PC: `py tools/yt_auth.py` → paste ID + secret → browser opens → sign in with the account that **owns the channel** → allow ("unverified app" warning → Advanced → continue).
6. The script prints 3 `gh secret set ...` commands (`YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`) — run them. Never put these values in a file: the repo is public.
7. Test: `gh workflow run lessons.yml -R hamlou/moneyworks`.

`GEMINI_API_KEYS` must also exist as a repo secret (already used by the writer). Scheduled runs only fire from the default branch (`main`), so both workflow files must be merged there.
