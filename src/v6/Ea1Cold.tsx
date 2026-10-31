import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import LENS from '../../blender/ea1_lens.json';
import {Ea1, EA1_FRAMES} from './Ea1';

// ea1 cold open (owner 31 Oct 2026): 4 real clips, each person says only his name (Fox News, NBC Meet the Press,
// CBS Weekend News, Trump's White House remarks via CBS Mornings), then shot N: real headlines + his two books.
// Clips are 1–1.6 s inside commentary (fair use, not public domain) — sources in ea1_description.txt.
const CLIPS = [
  {src: 'n1', len: 47, tag: 'Fox News'},
  {src: 'n2', len: 32, tag: 'NBC News · Meet the Press'},
  {src: 'n3', len: 45, tag: 'CBS News'},
  {src: 'n4', len: 48, tag: 'President Trump · White House remarks (via CBS News)'},
];
const STARTS = CLIPS.reduce<number[]>((a, c, i) => [...a, i ? a[i - 1] + CLIPS[i - 1].len : 0], []);
const N_AT = STARTS[3] + CLIPS[3].len;
const N_LEN = Math.round(((LENS as Record<string, number>).N / 24) * 30);
export const COLD = N_AT + N_LEN;

const Tag: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 40, bottom: 34, padding: '6px 14px', background: 'rgba(0,0,0,.55)', color: '#ddd', fontFamily: 'Arial', fontSize: 24, borderRadius: 6}}>{children}</div>
);

const Clip: React.FC<{src: string; len: number; tag: string}> = ({src, len, tag}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${1.02 + 0.06 * (f / len)})`}}>
        <OffthreadVideo src={staticFile(`ea1/names/${src}.mp4`)} style={{width: 1920, height: 1080}} />
      </AbsoluteFill>
      {f < 2 ? <AbsoluteFill style={{background: '#fff', opacity: f ? 0.5 : 1}} /> : null}
      <Tag>{tag}</Tag>
    </AbsoluteFill>
  );
};

const Papers: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile('ea1/shot_N.mp4')} muted style={{width: 1920, height: 1080}} />
      {f < 2 ? <AbsoluteFill style={{background: '#fff', opacity: f ? 0.5 : 1}} /> : null}
      {f >= N_LEN - 2 ? <AbsoluteFill style={{background: '#fff'}} /> : null}
      <Tag>Real headlines: Bridge Michigan · AP · CBS News · ABC News · NBC News · Washington Examiner · Political Wire</Tag>
    </AbsoluteFill>
  );
};

export const EA1_FULL_FRAMES = COLD + EA1_FRAMES;

export const Ea1Full: React.FC = () => {
  const s = (sec: number) => N_AT + Math.round(sec * 30);
  const cues: Cue[] = [
    ...STARTS.slice(1).map((a) => ({at: a, src: 'ea1/co_tv', v: 0.5})),
    {at: N_AT, src: 'ea1/k_flash', v: 0.7},
    {at: N_AT, src: 'ea1/co_paper2', v: 0.8},
    ...[0.4, 0.9, 1.3, 1.7, 2.1].map((t, i) => ({at: s(t), src: i % 2 ? 'ea1/co_paper' : 'ea1/co_paper2', v: 0.55})),
    {at: s(2.0), src: 'ea1/co_riser', v: 0.6},
    {at: s(58 / 24 + 0.25), src: 'ea1/co_book', v: 0.9},
    {at: s(66 / 24 + 0.25), src: 'ea1/co_book', v: 0.9},
    {at: COLD - 2, src: 'ea1/k_flash', v: 0.8},
  ];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {CLIPS.map((c, i) => (
        <Sequence key={c.src} from={STARTS[i]} durationInFrames={c.len}>
          <Clip {...c} />
        </Sequence>
      ))}
      <Sequence from={N_AT} durationInFrames={N_LEN}>
        <Papers />
      </Sequence>
      <Sequence from={COLD}>
        <Ea1 />
      </Sequence>
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
