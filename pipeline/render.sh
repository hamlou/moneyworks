#!/bin/bash
EP=${1:?usage: render.sh ep001 name [extra remotion args]}
NAME=${2:-$EP}
shift 2 || true
cd "$(dirname "$0")/.."
mkdir -p out
nohup npx remotion render src/index.ts Episode "out/$NAME.mp4" --props="{\"ep\":\"$EP\",\"timings\":null}" --concurrency=6 "$@" > "out/$NAME.log" 2>&1 &
echo "rendering out/$NAME.mp4"
