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
const N_LEN = 60; // = MONT_LEN (macro name montage, ~0.2 s per cut)
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

// owner 31 Oct (example screenshot in videos/ea1): EXTREME MACRO of printed text — his name highlighted inside a real
// sentence, lines above/below out of focus, paper grain, slight perspective, slow push; hard cut every 0.3–0.8 s with a
// camera-shutter sound. Every sentence is VERBATIM from a source (AP, WLOS, Bridge, NBC, CBS, Wash. Examiner, Mediaite,
// book credit) — never invented text. Line splits only; `[...]` = the highlighted name.
type Macro = {lines: string[]; len: number; font: string; tilt: number};
const MACROS: Macro[] = [
  {lines: ['Trump escalates rhetoric', 'against [El-Sayed] as he tries', 'to undermine Democrat in Michigan'], len: 6, font: 'Georgia', tilt: -2},
  {lines: ['Michigan Senate race.', '[El-Sayed] would be the first Muslim', 'senator if elected.'], len: 5, font: 'Times New Roman', tilt: 1.5},
  {lines: ['Rep. Alexandria Ocasio-Cortez donated', '$1 million to Dr. [Abdul El-Sayed] who', 'is running for U.S. Senate as a Democrat.'], len: 6, font: 'Georgia', tilt: -1},
  {lines: ['on ads in the Democratic primary', 'against [El-Sayed] and in support', 'of his primary opponent'], len: 5, font: 'Times New Roman', tilt: 2},
  {lines: ['GOP groups have spent $59.3 million,', 'compared to $23 million by backers of [El-Sayed]', 'Michigan Senate race'], len: 7, font: 'Georgia', tilt: -1.5},
  {lines: ['Michigan Democrat', '[Abdul El-Sayed] Fumes About His', 'CNN Interviews'], len: 5, font: 'Arial', tilt: 1},
  {lines: ["Jesse Watters says 'I actually like'", '[Abdul el Sayed] after interviewing him', ''], len: 6, font: 'Georgia', tilt: -2.5},
  {lines: ['ugly personal attacks', '[El-Sayed] responds to ugly personal', 'attacks amid heated Michigan Senate race'], len: 5, font: 'Arial', tilt: 1.5},
  {lines: ['', '[Abdul El-Sayed] says Democrats must', "win midterms by ‘massive numbers’"], len: 6, font: 'Times New Roman', tilt: -1},
  {lines: ['HEALING POLITICS', 'by [Abdul El-Sayed]', 'A Doctor’s Journey into the Heart of Our Political Epidemic'], len: 9, font: 'Georgia', tilt: 0},
];
export const MONT_STARTS = MACROS.reduce<number[]>((a, m, i) => [...a, i ? a[i - 1] + MACROS[i - 1].len : 0], []);
const MONT_LEN = MACROS.reduce((a, m) => a + m.len, 0);

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.33 0 0 0 0 0.3 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// a line with the name: left part right-aligned | NAME | right part left-aligned → the name sits exactly mid-frame
const NameLine: React.FC<{text: string; f: number; size: number}> = ({text, f, size}) => {
  const k = 1; // owner: the name is already highlighted from the first frame
  const [a, name, b] = text.split(/\[|\]/);
  const side: React.CSSProperties = {flex: 1, whiteSpace: 'nowrap', overflow: 'hidden'};
  return (
    <div style={{display: 'flex', width: 3400, fontSize: size, lineHeight: 1.3, color: '#1d1b18', textShadow: '0 0 1.4px rgba(20,18,15,.75)'}}>
      <div style={{...side, textAlign: 'right'}}>{a}</div>
      <div style={{whiteSpace: 'nowrap', fontWeight: 700, padding: '0 10px', margin: '0 0.28em', backgroundImage: 'linear-gradient(#f5c400,#f5c400)', backgroundRepeat: 'no-repeat', backgroundSize: `${k * 100}% 80%`, backgroundPosition: '0 62%'}}>{name}</div>
      <div style={{...side, textAlign: 'left'}}>{b}</div>
    </div>
  );
};
const PlainLine: React.FC<{text: string; blur: number; size: number}> = ({text, blur, size}) => (
  <div style={{width: 3400, textAlign: 'center', whiteSpace: 'nowrap', fontSize: size, lineHeight: 1.3, color: '#1d1b18', filter: `blur(${blur}px)`}}>{text}</div>
);
const MacroShot: React.FC<{m: Macro; i: number}> = ({m, i}) => {
  const f = useCurrentFrame();
  const far = (n: number) => MACROS[(i + n) % MACROS.length].lines[1].replace(/\[|\]/g, ''); // other verbatim lines, out of focus
  const S = 178;
  return (
    <AbsoluteFill style={{background: '#e9e4d8', overflow: 'hidden'}}>
      <AbsoluteFill style={{perspective: 1300}}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, "DejaVu Serif", serif', transform: `scale(${1.0 + 0.02 * f})`}}>
          <PlainLine text={far(3)} blur={12} size={S} />
          <PlainLine text={m.lines[0] || far(5)} blur={8} size={S} />
          <NameLine text={m.lines[1]} f={f} size={S} />
          <PlainLine text={m.lines[2] || far(7)} blur={8.5} size={S} />
          <PlainLine text={far(4)} blur={13} size={S} />
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill style={{backgroundImage: GRAIN, mixBlendMode: 'multiply', opacity: 0.5}} />
      <AbsoluteFill style={{boxShadow: 'inset 0 0 260px rgba(60,50,35,.5)'}} />
      {f === 0 ? <AbsoluteFill style={{background: '#fff', opacity: 0.45}} /> : null}
    </AbsoluteFill>
  );
};
export const MONT_FRAMES = MONT_LEN;
export const Montage: React.FC = () => (
  <>
    <Sfx cues={MONT_STARTS.map((a, i) => ({at: a, src: i % 2 ? 'ea1/co_shut2' : 'ea1/co_shut1', v: 0.9}))} />
    {MACROS.map((m, i) => (
      <Sequence key={i} from={MONT_STARTS[i]} durationInFrames={m.len}>
        <MacroShot m={m} i={i} />
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
    {at: N_AT + 10, src: 'ea1/co_riser', v: 0.45},
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
