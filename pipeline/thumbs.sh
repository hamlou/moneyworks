#!/bin/bash
EP=${1:?usage: thumbs.sh ep01 A B C}
shift
cd "$(dirname "$0")/.."
mkdir -p out/thumbs
npx remotion bundle src/index.ts --out-dir=out/tbundle --log=error >/dev/null
for V in "$@"; do
  npx remotion still out/tbundle Thumb "out/thumbs/${EP}_$V.png" --props="{\"v\":\"$V\"}" --log=error
  ffmpeg -v error -y -i "out/thumbs/${EP}_$V.png" -q:v 3 "out/thumbs/${EP}_$V.jpg"
done
ls -la out/thumbs
