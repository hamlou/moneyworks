#!/bin/bash
EP=${1:?usage: stills.sh ep001 frame...}
shift
cd "$(dirname "$0")/.."
mkdir -p out/stills
rm -f out/stills/*.jpg
npx remotion bundle src/index.ts --out-dir=out/bundle --log=error >/dev/null
for F in "$@"; do
  npx remotion still out/bundle Episode "out/stills/$F.jpg" --frame="$F" --props="{\"ep\":\"$EP\",\"timings\":null}" --image-format=jpeg --jpeg-quality=85 --scale=0.6 --log=error
done
ls out/stills
