# LICENSES.md — what we may put in a MONETIZED video (owner, 29 Oct 2026: "make sure we won't get any trouble in the monetization later")

Rule: **every sound, voice, model, texture, motion and font in a video must be on the ✅ list below.** Anything else is banned until its licence is checked and added here. Read with `STYLE_3D.md` §0.

## ✅ Allowed (commercial use OK)
| What | Where in the repo | Licence | What we must do |
|---|---|---|---|
| Music "Fluffing a Duck" — Kevin MacLeod | `public/music/bgm.mp3` | CC-BY 4.0 | **Credit in every description** (already added by `pipeline/describe.py` / `seo.py`): `Music: "Fluffing a Duck" Kevin MacLeod (incompetech.com) — Licensed under Creative Commons: By Attribution 4.0 — http://creativecommons.org/licenses/by/4.0/`. If a false Content ID claim appears, dispute it citing CC-BY. |
| Base SFX `public/sfx/*.wav` (boing, boom, cash, whoosh, …) | built by `pipeline/sfx_build.py` from Kenney audio packs (`impactPunch_*`, `confirmation_*`, `bookFlip*`, `card-*` …) | CC0 (Kenney.nl) | nothing (credit optional) |
| Synthesised SFX (`count_roll`, `swish`, `chalk`, `pageflip`, `pop_hi`, `snap_white`, `thump_low`, `slide`, `riser_up`) | `pipeline/sfx_synth.py` | made by us | nothing |
| Voice — Chatterbox (Resemble AI) built-in voice | `voice.yml`, `pipeline/tts_cb.py` | MIT | never use a reference clip of a real person (§ Voice rules below) |
| Voice candidates — Chatterbox-Turbo (MIT), Dia 1.6B (Apache 2.0), Kokoro (Apache 2.0) | `pipeline/voicebake2/` | MIT / Apache 2.0 | same voice rules |
| 3D models, HDRI skies, textures — Poly Haven | `blender/fetch.py` | CC0 | nothing |
| Motion capture — CMU Graphics Lab (BVH by B. Hahne) | `blender/fetch_mocap.py` | free for any use incl. commercial | courtesy line in the description: `Motion data: mocap.cs.cmu.edu (CMU Graphics Lab)` |
| Fonts Anton, Fredoka | `public/fonts/` | SIL Open Font License | nothing |
| Blender, Remotion, ffmpeg | tools | GPL / Remotion free licence for individuals & companies ≤ 3 people / LGPL | renders are ours |
| Photos | `pipeline/photo_find.py`, `photos.py` | only free licences already enforced there (credit + licence lines in the description) | keep the existing credit lines |

## ⛔ Banned in monetized videos (until proven otherwise)
- `public/sfx/pack/*` — the 11 sounds imported from the owner's Google Drive: **source licence unknown**. Not used by any v7 video. Owner must say where they came from (site + licence) before we use them again.
- Any music other than the line above (no trending songs, no game/film soundtracks, nothing "found on YouTube").
- Clips, frames, sounds or UI of the reference creator or any other creator/film/game/TV (the reference uses Pixar/LEGO clips under fair use — we never do).
- Higgsfield (or any AI generator) output made on a **free/trial plan** — free plans usually do not grant commercial rights; only use it after checking the plan's terms and noting them here.
- ElevenLabs free tier (non-commercial).

## Voice rules (no trouble with likeness or AI policies)
1. Only the engines' own built-in synthetic voices. **Never clone a real person** (no reference clip of a creator, celebrity, politician or anyone without written consent).
2. **Real people (e.g. a politician) are never given a synthetic voice and never "quoted" with words they did not say.** Dave (our cartoon) talks ABOUT them; their real quotes are shown as text with the source.
3. Cartoon 3D animation does not need YouTube's "altered or synthetic content" label; tick it anyway if a video ever shows realistic-looking people or events that did not happen.
4. YouTube monetization: AI narration is allowed when the video is original and adds value (our scripts + our animation). Never upload mass-produced or repetitive near-duplicates.

## Description footer (add to every upload)
```
Music: "Fluffing a Duck" Kevin MacLeod (incompetech.com) — CC BY 4.0 — http://creativecommons.org/licenses/by/4.0/
3D assets: Poly Haven (CC0). Sound effects: Kenney (CC0) + original. Motion data: mocap.cs.cmu.edu (CMU Graphics Lab).
Narration: synthetic voice (Chatterbox, MIT licence). Education only, not financial advice.
```
