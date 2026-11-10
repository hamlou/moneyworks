import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {localFont} from '../theme';
import {Music} from './kit2';
import {Sfx} from '../fx';
import type {SalPlan, SBeat} from './SalShort';

// CLIP Short (format tests F6 miniature / F3 ink, owner 10 Nov): each beat = one Blender shot mp4
// (public/<id>/shot_<scene>.mp4, 24 fps file) played at half speed → 12 fps stop-motion / time-lapse feel.
// Captions (beat.caps, word-anchored) are styled per look; the ink look gets a paper grain overlay.
const I7 = localFont('Inter7', 'inter-700.woff2', '700');
const HAND = localFont('Caveat', 'caveat.woff2', '400 700');
const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
type Cap = {at: number; t: string};
type CBeat = SBeat & {caps?: Cap[]};
type CPlan = SalPlan & {comp: string; beats: CBeat[]};

const Caption: React.FC<{f: number; cap: Cap; end: number; look: string; first: boolean}> = ({f, cap, end, look, first}) => {
  if (f < cap.at || f >= end) return null;
  const t = f - cap.at;
  const s = first && cap.at === 0 ? 1 : interpolate(t, [0, 4, 7], [1.25, 0.97, 1], CL);
  if (look === 'ink') {
    // hand-lettered in ink, appears stroke-by-stroke (clip from left) like it is being written
    const w = first && cap.at === 0 ? 100 : interpolate(t, [0, 9], [0, 100], CL);
    return (
      <div style={{position: 'absolute', left: 50, right: 50, top: 190, textAlign: 'center', transform: `rotate(-2.5deg) scale(${s})`, clipPath: `inset(0 ${100 - w}% 0 0)`, fontFamily: HAND, fontWeight: 700, fontSize: 132, lineHeight: 0.95, color: '#1B2035'}}>
        {cap.t}
      </div>
    );
  }
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 200, textAlign: 'center', transform: `scale(${s})`, fontFamily: I7, fontSize: 92, lineHeight: 1.05, color: '#fff', letterSpacing: -1, textShadow: '0 6px 24px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.6)'}}>
      {cap.t}
    </div>
  );
};

export const ClipShort: React.FC<{plan: CPlan}> = ({plan}) => {
  const f = useCurrentFrame();
  const look = plan.comp === 'ink' ? 'ink' : 'mini';
  let bi = 0;
  while (bi + 1 < plan.beats.length && f >= plan.beats[bi + 1].from) bi++;
  const b = plan.beats[bi];
  const lf = f - b.from;
  // tiny push-in on every shot; ink cuts get a 2-frame paper flash (page turn feel)
  const push = 1 + Math.min(0.05, lf * 0.0009);
  const caps = plan.beats.flatMap((x, i) => (x.caps ?? []).map((c, j, arr) => ({c, end: j + 1 < arr.length ? arr[j + 1].at : x.to, first: i === 0})));
  return (
    <AbsoluteFill style={{background: look === 'ink' ? '#F5EEDC' : '#000', overflow: 'hidden'}}>
      {plan.beats.map((x) => (
        <Sequence key={x.id} from={x.from} durationInFrames={Math.max(1, x.to - x.from)} layout="none">
          <AbsoluteFill style={{transform: `scale(${push})`}}>
            <OffthreadVideo src={staticFile(`${plan.id}/shot_${x.scene}.mp4`)} playbackRate={0.5} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </AbsoluteFill>
        </Sequence>
      ))}
      {look === 'ink' ? (
        <>
          <Img src={staticFile(`${plan.id}/paper.jpg`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'multiply', opacity: 0.85}} />
          {bi > 0 && lf < 2 ? <AbsoluteFill style={{background: '#F5EEDC', opacity: 0.7 - lf * 0.3}} /> : null}
        </>
      ) : (
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 26%)'}} />
      )}
      {caps.map(({c, end, first}, i) => <Caption key={i} f={f} cap={c} end={end} look={look} first={first} />)}
      {plan.voice ? <Audio src={staticFile(plan.voice)} /> : null}
      <Music segs={plan.music} />
      <Sfx cues={plan.sfx} />
    </AbsoluteFill>
  );
};
