#!/bin/bash
set -euo pipefail
EP=${1:?usage: build.sh ep001}
cd "$(dirname "$0")/.."
PY=.venv/bin/python
mkdir -p public/$EP out
echo "[1/3] voice"
$PY pipeline/tts.py pipeline/episodes/$EP.json public/$EP
echo "[2/3] sfx"
[ -f public/sfx/whoosh.wav ] || $PY pipeline/sfx_build.py
mkdir -p public/music
[ -f public/music/bgm.mp3 ] || cp assets/src/fluffing_a_duck.mp3 public/music/bgm.mp3
echo "[3/3] render"
npx remotion render src/index.ts Episode out/$EP.mp4 --props="{\"ep\":\"$EP\",\"timings\":null}" --concurrency=6 --log=warn
ls -la out/$EP.mp4
