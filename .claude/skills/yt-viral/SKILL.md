---
name: yt-viral
description: >-
  Find what is actually working in the money/explainer niche on YouTube and rank it by how far
  each video beat its own channel. Use for "what's working", "find viral videos", "topic ideas",
  competitor research, or before proposing any new series of topics to the owner.
---

# yt-viral (Moneyworks edition)

Raw views rank channel size, not ideas. Rank by **multiple over each channel's own median**.
Adapted from Jakeschincariol/youtube-agent-skill (MIT).

```bash
# 1. find channels: search the viewer's pain, not the subject (public listings only, never logged in)
py -m yt_dlp --flat-playlist --print "%(channel)s	%(uploader_id)s	%(view_count)s	%(title)s" "ytsearch25:<pain query>"
# 2. collect >= 4 videos per channel (40 is good)
py pipeline/collect.py @Chan1 @Chan2 ... --n 40 > ../qa_dl/collected.json
# 3. rank
py pipeline/outliers.py ../qa_dl/collected.json --min 3
```

## Rules
- Mix three groups: stickman/animated money channels, bigger explainer channels, our own channel (`@DaveExplainsMoney`).
- A channel with a median under ~100 views is noise: its "50x" is 300 views. Trust multiples only from channels with median >= 1,000, or absolute views >= 10,000.
- The formula tag is a judgement about the TITLE words (pipeline/hooks.json), not why it worked. Say so.
- Never invent a number. Only what the listing shows.

## Hand back
1. Top 5 real outliers (multiple, views, channel).
2. The ONE structural thing they share.
3. Which 3 we could make as a Dave story that pass PLAYBOOK §1b ("that's MY problem") — as a topic PROPOSAL for the owner. Never start a script before the owner approves.
4. What is saturated (titles many dead channels already use) — avoid those exact wordings.
