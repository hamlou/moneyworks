import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {C, FONT} from './theme';
import {ease, keyed, pop} from './anim';
import {Timings} from './timing';

export const W = 1920;
export const H = 1080;

export const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    {children}
  </svg>
);

export type CamKey = [number, number, number, number];
export const Cam: React.FC<{f: number; keys: CamKey[]; sx?: number; sy?: number; children: React.ReactNode}> = ({f, keys, sx = 0, sy = 0, children}) => {
  const z = keyed(f, keys.map((k) => [k[0], k[1]] as [number, number]));
  const cx = keyed(f, keys.map((k) => [k[0], k[2]] as [number, number]));
  const cy = keyed(f, keys.map((k) => [k[0], k[3]] as [number, number]));
  return (
    <AbsoluteFill style={{transformOrigin: '0 0', transform: `translate(${W / 2 + sx}px,${H / 2 + sy}px) scale(${z}) translate(${-cx}px,${-cy}px)`}}>
      {children}
    </AbsoluteFill>
  );
};

export const Scene: React.FC<{f: number; from: number; to: number; children: React.ReactNode}> = ({f, from, to, children}) => {
  if (f < from || f >= to + 10) return null;
  const o = ease(f, from, from + 7);
  const s = 1.035 - 0.035 * o;
  return <AbsoluteFill style={{opacity: o, transform: `scale(${s})`}}>{children}</AbsoluteFill>;
};

export const Street: React.FC<{f: number}> = ({f}) => (
  <Svg>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#CFE8EF" />
        <stop offset="1" stopColor="#F1F8F4" />
      </linearGradient>
    </defs>
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill="url(#sky)" />
    {[0, 1, 2].map((i) => {
      const x = ((i * 700 + f * 0.6) % 2600) - 300;
      return (
        <g key={i} transform={`translate(${x},${140 + i * 60})`} opacity={0.9}>
          <ellipse cx={0} cy={0} rx={90} ry={34} fill="#fff" />
          <ellipse cx={60} cy={-16} rx={70} ry={40} fill="#fff" />
          <ellipse cx={-60} cy={-6} rx={56} ry={28} fill="#fff" />
        </g>
      );
    })}
    {[
      [-200, 300, 380], [120, 220, 300], [360, 260, 420], [650, 200, 260], [900, 240, 360], [1180, 180, 300], [1420, 260, 440], [1720, 220, 320], [1980, 260, 380],
    ].map(([x, w, h], i) => (
      <g key={i}>
        <rect x={x} y={820 - h} width={w} height={h} fill={i % 2 ? '#D4E4E8' : '#C8DCE1'} />
        {Array.from({length: Math.floor(h / 70)}).map((_, r) =>
          Array.from({length: Math.floor(w / 70)}).map((_, c) => (
            <rect key={`${r}-${c}`} x={x + 24 + c * 70} y={820 - h + 26 + r * 70} width={28} height={36} rx={4} fill="#E6F0F2" />
          )),
        )}
      </g>
    ))}
    <rect x={-400} y={820} width={W + 800} height={560} fill={C.ground} />
    <rect x={-400} y={820} width={W + 800} height={10} fill="#E2D2B2" />
  </Svg>
);

export const Interior: React.FC = () => (
  <Svg>
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill={C.wall} />
    <rect x={-400} y={560} width={W + 800} height={260} fill={C.wallDark} />
    <rect x={-400} y={556} width={W + 800} height={12} fill="#C3D0D6" />
    <rect x={-400} y={820} width={W + 800} height={560} fill={C.floor} />
    <rect x={-400} y={820} width={W + 800} height={10} fill="#C7B592" />
    <g transform="translate(1540,170)">
      <rect x={-150} y={0} width={300} height={260} rx={10} fill="#F4FBFF" stroke={C.ink} strokeWidth={6} />
      <line x1={0} y1={0} x2={0} y2={260} stroke={C.ink} strokeWidth={6} />
      <line x1={-150} y1={130} x2={150} y2={130} stroke={C.ink} strokeWidth={6} />
      <path d="M -110 40 L -60 40 M 30 60 L 90 60" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
    </g>
    <g transform="translate(330,190)">
      <rect x={-110} y={0} width={220} height={170} rx={6} fill="#fff" stroke={C.ink} strokeWidth={6} />
      <rect x={-92} y={18} width={184} height={134} fill={C.greenLight} />
      <text x={0} y={92} fontFamily={FONT} fontSize={90} fontWeight={700} fill={C.green} textAnchor="middle" dominantBaseline="middle">$</text>
    </g>
  </Svg>
);

export const Board: React.FC = () => (
  <Svg>
    <defs>
      <pattern id="dots" width="48" height="48" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2.4" fill="#E6DCC8" />
      </pattern>
    </defs>
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill={C.bg} />
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill="url(#dots)" />
  </Svg>
);

export const DreamBg: React.FC = () => (
  <Svg>
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill="#F7EEDC" />
  </Svg>
);

export const DreamFrame: React.FC<{label: string}> = ({label}) => (
  <Svg>
    <path d={`M -10 -10 H ${W + 10} V ${H + 10} H -10 Z M 70 40 H ${W - 70} Q ${W - 40} 40 ${W - 40} 70 V ${H - 70} Q ${W - 40} ${H - 40} ${W - 70} ${H - 40} H 70 Q 40 ${H - 40} 40 ${H - 70} V 70 Q 40 40 70 40 Z`} fill="#E9DDC4" fillRule="evenodd" />
    <rect x={40} y={40} width={W - 80} height={H - 80} rx={30} fill="none" stroke={C.ink} strokeWidth={6} strokeDasharray="26 18" />
    <g transform="translate(90,92)">
      <rect x={0} y={-32} width={label.length * 23 + 64} height={64} rx={32} fill={C.ink} />
      <text x={32} y={2} fontFamily={FONT} fontSize={34} fontWeight={600} fill="#fff" dominantBaseline="middle" letterSpacing={3}>{label}</text>
    </g>
  </Svg>
);

export const Beach: React.FC<{f: number}> = ({f}) => (
  <Svg>
    <defs>
      <linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#BFE6F5" />
        <stop offset="1" stopColor="#EAF7FB" />
      </linearGradient>
    </defs>
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill="url(#bsky)" />
    <rect x={-400} y={560} width={W + 800} height={200} fill="#5BC0DE" />
    <path d={`M -400 ${600 + Math.sin(f / 12) * 6} Q 0 ${580} 480 ${600} T 1440 600 T 2400 600 L 2400 760 L -400 760 Z`} fill="#7FD0E8" />
    <rect x={-400} y={740} width={W + 800} height={640} fill="#F4E1B5" />
    <path d={`M -400 ${745 + Math.sin(f / 9) * 5} Q 480 ${730} 960 745 T 2400 745`} fill="none" stroke="#fff" strokeWidth={10} opacity={0.8} />
  </Svg>
);

export const OldFilm: React.FC<{f: number; o: number}> = ({f, o}) =>
  o <= 0 ? null : (
    <AbsoluteFill style={{opacity: o, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'rgba(120,90,40,0.18)', mixBlendMode: 'multiply'}} />
      <Svg>
        {[0, 1, 2].map((i) => {
          const x = ((f * 37 + i * 613) % W);
          return <line key={i} x1={x} y1={0} x2={x + 6} y2={H} stroke="rgba(60,40,20,0.25)" strokeWidth={2} />;
        })}
        <rect x={0} y={0} width={W} height={H} fill="none" stroke="#1a1410" strokeWidth={60} opacity={0.5} />
      </Svg>
      <AbsoluteFill style={{background: 'rgba(0,0,0,1)', opacity: (f % 7 === 0 ? 0.06 : 0.02)}} />
    </AbsoluteFill>
  );

export const Vignette: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 60%, rgba(40,30,20,0.16) 100%)', pointerEvents: 'none'}} />
);

type Chunk = {words: {text: string; start: number; end: number}[]; start: number; end: number};
const chunkify = (t: Timings): Chunk[] => {
  const out: Chunk[] = [];
  for (const b of t.beats) {
    let cur: Chunk | null = null;
    const texts = b.text.split(/\s+/);
    const nz = (s: string) => s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    let j = 0;
    b.words.forEach((w) => {
      if (!cur || cur.words.length >= 5 || cur.words.map((x) => x.text).join(' ').length + w.text.length > 26) {
        cur = {words: [], start: w.start, end: w.end};
        out.push(cur);
      }
      cur.words.push(w);
      cur.end = w.end;
      let k = j;
      while (k < texts.length && nz(texts[k]) !== nz(w.text)) k++;
      const raw = k < texts.length ? texts[k] : '';
      if (k < texts.length) j = k + 1;
      if (/[.?!,:]$/.test(raw) && cur.words.length >= 2) cur = null;
    });
  }
  return out;
};

export const Captions: React.FC<{f: number; t: Timings}> = ({f, t}) => {
  const chunks = React.useMemo(() => chunkify(t), [t]);
  const sec = f / 30;
  let idx = -1;
  for (let i = 0; i < chunks.length; i++) if (chunks[i].start - 0.04 <= sec) idx = i;
  if (idx < 0) return null;
  const c = chunks[idx];
  if (sec > c.end + 0.5) return null;
  const s = 0.86 + 0.14 * pop(f, Math.round((c.start - 0.04) * 30), 12, 260);
  let active = -1;
  c.words.forEach((w, i) => {
    if (w.start - 0.02 <= sec) active = i;
  });
  return (
    <Svg>
      <g transform={`translate(${W / 2},${H - 92}) scale(${s})`}>
        <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontFamily={FONT} fontWeight={700} fontSize={64} stroke={C.ink} strokeWidth={16} paintOrder="stroke" strokeLinejoin="round">
          {c.words.map((w, i) => (
            <tspan key={i} fill={i === active ? C.yellow : '#fff'}>
              {w.text + (i < c.words.length - 1 ? ' ' : '')}
            </tspan>
          ))}
        </text>
      </g>
    </Svg>
  );
};

export type SceneItem = {at: number; el: () => React.ReactNode};
export const Scenes: React.FC<{f: number; items: SceneItem[]}> = ({f, items}) => {
  const s = [...items].sort((a, b) => a.at - b.at);
  let i = -1;
  s.forEach((x, k) => {
    if (x.at <= f) i = k;
  });
  if (i < 0) return null;
  const cur = s[i];
  const prev = i > 0 && f < cur.at + 9 ? s[i - 1] : null;
  const o = ease(f, cur.at, cur.at + 8);
  return (
    <>
      {prev && <AbsoluteFill>{prev.el()}</AbsoluteFill>}
      <AbsoluteFill style={{opacity: o, transform: `scale(${1.03 - 0.03 * o})`}}>{cur.el()}</AbsoluteFill>
    </>
  );
};

export const CHAPTER_FRAMES = 66;
export const ChapterCard: React.FC<{f: number; t: Timings}> = ({f, t}) => {
  const ch = (t.chapters ?? []).find((c) => f >= Math.round(c.start * 30) && f < Math.round(c.start * 30) + CHAPTER_FRAMES);
  if (!ch) return null;
  const s = Math.round(ch.start * 30);
  const inX = ease(f, s, s + 10, -W, 0);
  const outX = ease(f, s + CHAPTER_FRAMES - 10, s + CHAPTER_FRAMES, 0, W);
  const x = f < s + CHAPTER_FRAMES - 10 ? inX : outX;
  const tp = pop(f, s + 8, 12, 200);
  return (
    <AbsoluteFill style={{transform: `translateX(${x}px)`}}>
      <Svg>
        <rect x={-20} y={-20} width={W + 40} height={H + 40} fill={C.ink} />
        {Array.from({length: 14}).map((_, i) => (
          <rect key={i} x={i * 180 - 200 + ((f - s) * 2)} y={-100} width={60} height={H + 200} fill="#2C2C36" transform="skewX(-20)" />
        ))}
        <text x={W - 140} y={H / 2 + 40} textAnchor="end" dominantBaseline="middle" fontFamily={FONT} fontWeight={700} fontSize={560} fill="none" stroke="#3A3A46" strokeWidth={8}>{ch.n}</text>
        <g transform={`translate(160,${H / 2 - 90}) scale(${tp})`}>
          <rect x={0} y={-34} width={290} height={68} rx={34} fill={C.yellow} />
          <text x={145} y={3} textAnchor="middle" dominantBaseline="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.ink} letterSpacing={5}>CHAPTER {ch.n}</text>
        </g>
        <text x={160} y={H / 2 + 40} dominantBaseline="middle" fontFamily={FONT} fontWeight={700} fontSize={Math.min(112, 2900 / ch.title.length)} fill="#fff" opacity={ease(f, s + 10, s + 18)}>{ch.title}</text>
        <rect x={160} y={H / 2 + 120} width={ease(f, s + 14, s + 34, 0, 520)} height={10} rx={5} fill={C.yellow} />
      </Svg>
    </AbsoluteFill>
  );
};

export const Progress: React.FC<{f: number; t: Timings}> = ({f, t}) => {
  const chs = t.chapters ?? [];
  if (!chs.length) return null;
  const start = Math.round(chs[0].start * 30);
  if (f < start) return null;
  const endF = Math.round(t.total * 30);
  const gap = 6;
  const x0 = 40;
  const total = W - 80;
  const spans = chs.map((c, i) => {
    const a = Math.round(c.start * 30);
    const b = i < chs.length - 1 ? Math.round(chs[i + 1].start * 30) : endF;
    return {c, a, b};
  });
  const cur = spans.filter((s) => s.a <= f).pop()!;
  const labelIn = ease(f, cur.a + CHAPTER_FRAMES, cur.a + CHAPTER_FRAMES + 8) * (1 - ease(f, cur.a + CHAPTER_FRAMES + 110, cur.a + CHAPTER_FRAMES + 120));
  let x = x0;
  const o = ease(f, start + CHAPTER_FRAMES, start + CHAPTER_FRAMES + 10);
  return (
    <Svg>
      <g opacity={o}>
        {spans.map((s, i) => {
          const w = ((s.b - s.a) / (endF - start)) * (total - gap * (chs.length - 1));
          const fill = f >= s.b ? 1 : f <= s.a ? 0 : (f - s.a) / (s.b - s.a);
          const el = (
            <g key={i}>
              <rect x={x} y={22} width={w} height={10} rx={5} fill="rgba(35,35,43,0.18)" />
              <rect x={x} y={22} width={w * fill} height={10} rx={5} fill={C.yellow} stroke={C.ink} strokeWidth={fill > 0 ? 2 : 0} />
            </g>
          );
          x += w + gap;
          return el;
        })}
        <g transform={`translate(${x0},${48 + (1 - labelIn) * -20})`} opacity={labelIn}>
          <rect x={0} y={0} width={cur.c.title.length * 21 + 110} height={50} rx={25} fill={C.ink} />
          <text x={22} y={27} dominantBaseline="middle" fontFamily={FONT} fontWeight={700} fontSize={28} fill={C.yellow}>{cur.c.n}</text>
          <text x={56} y={27} dominantBaseline="middle" fontFamily={FONT} fontWeight={600} fontSize={28} fill="#fff">{cur.c.title}</text>
        </g>
      </g>
    </Svg>
  );
};

export type Cue = {at: number; src: string; v?: number};
export const Sfx: React.FC<{cues: Cue[]}> = ({cues}) => (
  <>
    {cues.filter((c) => c.at >= 0).map((c, i) => (
      <Sequence key={i} from={c.at} layout="none">
        <Audio src={staticFile(`sfx/${c.src}.wav`)} volume={c.v ?? 0.7} />
      </Sequence>
    ))}
  </>
);
