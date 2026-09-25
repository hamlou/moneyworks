#!/bin/bash
set -euo pipefail
EP=${1:?usage: assemble.sh ep01}
mkdir -p final work
: > work/list.txt
for d in $(ls -d parts/part-* | sort); do echo "file '$PWD/$d/part.mp4'" >> work/list.txt; done
cat work/list.txt
ffmpeg -hide_banner -v error -y -f concat -safe 0 -i work/list.txt -c copy work/video.mp4
ffmpeg -hide_banner -v error -y -i work/video.mp4 -i aud/audio.wav -map 0:v -map 1:a -c:v copy -c:a pcm_s16le -shortest work/muxed.mov
M=$(ffmpeg -hide_banner -i work/muxed.mov -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | grep "\"$1\"" | sed -E 's/.*: "([^"]+)".*/\1/'; }
ffmpeg -hide_banner -v error -y -i work/muxed.mov -map_metadata -1 -c:v copy -c:a aac -b:a 192k -ar 48000 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true" \
  -movflags +faststart "final/${EP}.mp4"
cp aud/thumb_*.png final/ 2>/dev/null || true
mkdir -p out
python pipeline/describe.py "$EP" > /dev/null
cp "out/${EP}_youtube.txt" final/
ffprobe -v error -show_entries format=duration:format_tags -of compact "final/${EP}.mp4"
ffmpeg -hide_banner -i "final/${EP}.mp4" -af ebur128 -f null - 2>&1 | grep -A3 Summary | grep ' I:'
ls -la final
