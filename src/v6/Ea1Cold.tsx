import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import {Ea1, EA1_FRAMES, CUT1} from './Ea1';

// ea1 cold open (owner 31 Oct 2026): 4 real clips, each person says only his name (Fox News, NBC Meet the Press,
// CBS Weekend News, Trump's White House remarks via CBS Mornings), then shot N: real headlines + his two books.
// Clips are 1–1.6 s inside commentary (fair use, not public domain) — sources in ea1_description.txt.
const CLIPS = [
  {src: 'n1', len: 38, tag: 'Fox News'},
  {src: 'n2', len: 28, tag: 'NBC News · Meet the Press'},
  {src: 'n3', len: 35, tag: 'CBS News'},
  {src: 'n4', len: 29, tag: 'President Trump · White House remarks (via CBS News)'},
];
const STARTS = CLIPS.reduce<number[]>((a, c, i) => [...a, i ? a[i - 1] + CLIPS[i - 1].len : 0], []);
const N_AT = STARTS[3] + CLIPS[3].len;
const N_LEN = 119; // = MONT_LEN (headline montage, 4 s)
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

// owner 31 Oct: "documentary text highlight" fast-cut montage — page fills the frame, slow push-in, a yellow marker
// wipes across his name (behind the ink), hard cut every 0.3–0.8 s with a marker/whoosh sound. Headlines are verbatim.
type Page = {outlet: string; head: string; len: number; font: string; bg: string; tilt: number};
const PAGES: Page[] = [
  {outlet: 'ASSOCIATED PRESS', head: 'Trump escalates rhetoric against |El-Sayed| as he tries to undermine Democrat in Michigan Senate race', len: 16, font: 'Times New Roman', bg: '#efe9db', tilt: -1.5},
  {outlet: 'BRIDGE MICHIGAN', head: '|Abdul El-Sayed|, other Democrats are outraising Republicans across key federal races in Michigan', len: 12, font: 'Georgia', bg: '#f4f1ea', tilt: 1},
  {outlet: 'CBS NEWS', head: '|El-Sayed| responds to ugly personal attacks amid heated Michigan Senate race', len: 11, font: 'Arial', bg: '#ffffff', tilt: -0.5},
  {outlet: 'WASHINGTON EXAMINER', head: "Jesse Watters says 'I actually like' |Abdul el Sayed| after interviewing him", len: 12, font: 'Georgia', bg: '#f6f6f2', tilt: 2},
  {outlet: 'ABC NEWS', head: '|El-Sayed| says he is committed to safety for all after projected win in MI primary', len: 10, font: 'Arial', bg: '#fbfbfb', tilt: -2},
  {outlet: 'POLITICAL WIRE', head: 'Senate Democrats Meet with |Abdul El-Sayed|', len: 10, font: 'Verdana', bg: '#eef2f6', tilt: 1.5},
  {outlet: 'NBC NEWS', head: '|Abdul El-Sayed| says Democrats must win midterms by ‘massive numbers’', len: 12, font: 'Arial', bg: '#ffffff', tilt: -1},
];
const BOOK_LENS = [16, 20];
export const MONT_STARTS = [...PAGES.map((p) => p.len), ...BOOK_LENS].reduce<number[]>((a, l, i, all) => [...a, i ? a[i - 1] + all[i - 1] : 0], []);
const MONT_LEN = [...PAGES.map((p) => p.len), ...BOOK_LENS].reduce((a, b) => a + b, 0);

const Mark: React.FC<{f: number; children: React.ReactNode}> = ({f, children}) => {
  const k = Math.min(1, Math.max(0, (f - 2) / 6));
  return <span style={{backgroundImage: 'linear-gradient(#ffe03a,#ffe03a)', backgroundRepeat: 'no-repeat', backgroundSize: `${k * 100}% 78%`, backgroundPosition: '0 70%', padding: '0 6px', borderRadius: 4}}>{children}</span>;
};
const NewsPage: React.FC<{p: Page}> = ({p}) => {
  const f = useCurrentFrame();
  const parts = p.head.split('|');
  return (
    <AbsoluteFill style={{background: '#111'}}>
      <AbsoluteFill style={{transformOrigin: '18% 22%', transform: `scale(${1.04 + 0.009 * f}) rotate(${p.tilt}deg)`}}>
        <div style={{position: 'absolute', left: 120, top: 40, width: 1680, height: 1300, background: p.bg, boxShadow: '0 0 60px rgba(0,0,0,.5)', padding: '50px 90px', fontFamily: p.font, color: '#151515'}}>
          <div style={{fontSize: 46, fontWeight: 700, letterSpacing: 3, borderBottom: '4px solid #151515', paddingBottom: 14}}>{p.outlet}</div>
          <div style={{fontSize: 92, fontWeight: 700, lineHeight: 1.14, marginTop: 50}}>
            {parts.map((t, i) => (i % 2 ? <Mark key={i} f={f}>{t}</Mark> : <span key={i}>{t}</span>))}
          </div>
          {[0, 1, 2, 3, 4, 5].map((r) => <div key={r} style={{height: 18, background: '#bdb8ad', marginTop: 34, width: `${90 - (r % 3) * 12}%`}} />)}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const BookPage: React.FC<{i: number}> = ({i}) => {
  const f = useCurrentFrame();
  const k = Math.min(1, Math.max(0, (f - 3) / 7));
  return (
    <AbsoluteFill style={{background: '#1a1714', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'relative', height: 1000, transformOrigin: '50% 85%', transform: `scale(${1.05 + 0.02 * f}) rotate(${i ? 2 : -2}deg)`}}>
        <Img src={staticFile(`ea1/book_ae${i}.png`)} style={{height: 1000, display: 'block', boxShadow: '0 30px 80px rgba(0,0,0,.7)'}} />
        <div style={{position: 'absolute', left: '8%', top: i ? '79%' : '81%', height: i ? '12%' : '8%', width: `${84 * k}%`, background: '#ffe03a', mixBlendMode: 'hard-light', opacity: 0.85, borderRadius: 6}} />
      </div>
    </AbsoluteFill>
  );
};
export const MONT_FRAMES = MONT_LEN;
export const Montage: React.FC = () => (
  <>
    {PAGES.map((p, i) => (
      <Sequence key={i} from={MONT_STARTS[i]} durationInFrames={p.len}>
        <NewsPage p={p} />
      </Sequence>
    ))}
    {BOOK_LENS.map((l, i) => (
      <Sequence key={'b' + i} from={MONT_STARTS[PAGES.length + i]} durationInFrames={l}>
        <BookPage i={i} />
      </Sequence>
    ))}
  </>
);

// 3 × 1 s of real rallies right after "…president of the United States?" (owner: show how much people love him)
const RALLY = [
  {src: 'r1', tag: 'MLive'},
  {src: 'r2', tag: 'WWMT · Grand Rapids rally'},
  {src: 'r3', tag: 'AP · Detroit rally'},
];
const R_LEN = 30 * RALLY.length;
export const EA1_FULL_FRAMES = COLD + EA1_FRAMES + R_LEN;

export const Ea1Full: React.FC = () => {
  const s = (sec: number) => N_AT + Math.round(sec * 30);
  const cues: Cue[] = [
    ...STARTS.slice(1).map((a) => ({at: a, src: 'ea1/co_tv', v: 0.5})),
    {at: N_AT, src: 'ea1/k_flash', v: 0.7},
    ...MONT_STARTS.map((a, i) => ({at: N_AT + a, src: i % 2 ? 'ea1/co_paper' : 'ea1/co_paper2', v: 0.6})),
    ...MONT_STARTS.map((a) => ({at: N_AT + a + 2, src: 'ea1/scribble', v: 0.35})),
    {at: N_AT + MONT_STARTS[7], src: 'ea1/co_book', v: 0.9},
    {at: N_AT + MONT_STARTS[8], src: 'ea1/co_book', v: 0.9},
    {at: N_AT + 40, src: 'ea1/co_riser', v: 0.6},
    {at: COLD - 2, src: 'ea1/k_flash', v: 0.8},
    ...RALLY.map((_, i) => ({at: COLD + CUT1 + i * 30, src: 'ea1/k_flash', v: 0.6})),
  ];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {CLIPS.map((c, i) => (
        <Sequence key={c.src} from={STARTS[i]} durationInFrames={c.len}>
          <Clip {...c} />
        </Sequence>
      ))}
      <Sequence from={N_AT} durationInFrames={N_LEN}>
        <Montage />
      </Sequence>
      <Sequence from={COLD} durationInFrames={CUT1}>
        <Ea1 />
      </Sequence>
      {RALLY.map((c, i) => (
        <Sequence key={c.src} from={COLD + CUT1 + i * 30} durationInFrames={30}>
          <Clip src={c.src} len={30} tag={c.tag} />
        </Sequence>
      ))}
      <Sequence from={COLD + CUT1 + R_LEN}>
        <Sequence from={-CUT1}>
          <Ea1 />
        </Sequence>
      </Sequence>
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
