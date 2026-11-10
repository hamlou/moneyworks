# analytics/ — drop YouTube Studio screenshots here, the agent learns from them

## Owner: how to add (2 minutes per Short)
1. YouTube Studio → Content → Shorts → click the Short → **Analytics**.
2. Take screenshots of: **Overview** (views, viewed vs swiped away), **Engagement** (retention graph + avg % viewed),
   **Audience** (subs gained), **Reach** (traffic sources).
3. Make a folder `analytics/inbox/<short name>/` (e.g. `analytics/inbox/abdul-short/`) and put the screenshots in it.
   Anything works: phone screenshots, crops, any file name. Add the date you took them in the folder name if you can.
4. Tell the agent: "check analytics".

## Agent: OBLIGATORY when the owner says "check analytics" (or before planning ANY new Short)
1. Open every image in `analytics/inbox/*/`. Read the numbers exactly (no guessing): views, viewed vs swiped away %,
   avg view duration, avg % viewed, retention drop points (second + what is on screen/said there — match with the script
   in pipeline/episodes/ or SHORTS.md/LONG.md [POSTMORTEM] transcript), subs gained, top traffic source.
2. Append one row per Short to `analytics/LOG.md` and write/update its section in `SHORTS.md/LONG.md [POSTMORTEM]`:
   **WHY IT FAILED (with the second it happened)** and **GOOD POINTS TO KEEP** — both are mandatory.
3. If a finding is a new rule (seen in ≥ 2 Shorts, or one huge drop with an obvious cause), add it to `SHORTS.md [MUST]`
   as a MUST/NEVER line with the evidence in brackets.
4. Move the folder from `inbox/` to `done/` so it is never counted twice.
