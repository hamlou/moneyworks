import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile} from 'remotion';
import {ANTON, K, UI, lin, outQuick, snap} from './kit';

// kit2 (29 Oct 2026, STYLE_3D §13): the reference's "living diagrams" for home base and 2D beats.
// SelfDrawGraph — a line chart that draws itself point by point (with a marker riding the tip)
// WipePanel     — a full-height colour panel that wipes in from a side (his Twitch / Rumble split)
// FlyStack      — cards that fly in from off-screen with motion blur and land in a messy stack
// Shake         — decaying camera shake wrapper for impacts

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const SelfDrawGraph: React.FC<{
  f: number;
  at: number;
  dur?: number;
  points: number[]; // y values 0..1, evenly spaced
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  color?: string;
  paper?: boolean;
  label?: string;
}> = ({f, at, dur = 45, points, x = 160, y = 180, w = 1100, h = 640, color = '#E8242C', paper = true, label}) => {
  if (f < at) return null;
  const t = Easing.inOut(Easing.cubic)(lin(f, at, at + dur));
  const n = points.length - 1;
  const pts = points.map((v, i) => [(i / n) * w, h - v * h] as const);
  const upto = t * n;
  const k = Math.floor(upto);
  const frac = upto - k;
  const drawn = pts.slice(0, k + 1).map((p) => p);
  if (k < n) drawn.push([pts[k][0] + (pts[k + 1][0] - pts[k][0]) * frac, pts[k][1] + (pts[k + 1][1] - pts[k][1]) * frac]);
  const tip = drawn[drawn.length - 1];
  const pop = snap(f, at, 6);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: `scale(${0.9 + 0.1 * pop})`, opacity: pop}}>
      {paper ? (
        <div style={{position: 'absolute', inset: -40, background: '#F6F5F0', borderRadius: 18, boxShadow: '0 24px 60px rgba(0,0,0,0.45)', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 54px, #C9D6E8 54px 57px)'}} />
      ) : null}
      <svg width={w} height={h} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <line x1={0} y1={h} x2={w} y2={h} stroke="#222" strokeWidth={6} />
        <line x1={0} y1={0} x2={0} y2={h} stroke="#222" strokeWidth={6} />
        <polyline points={drawn.map((p) => p.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={tip[0]} cy={tip[1]} r={20 + 4 * Math.sin(f / 3)} fill={color} stroke="#111" strokeWidth={6} />
      </svg>
      {label ? <div style={{position: 'absolute', left: tip[0] + 30, top: tip[1] - 70, fontFamily: ANTON, fontSize: 64, color: '#111'}}>{label}</div> : null}
    </div>
  );
};

export const WipePanel: React.FC<{f: number; at: number; from?: 'left' | 'right'; color: string; width?: number; children?: React.ReactNode}> = ({f, at, from = 'left', color, width = 960, children}) => {
  if (f < at) return null;
  const k = interpolate(f, [at, at + 7], [0, 1], {...clamp, easing: outQuick});
  const left = from === 'left' ? 0 : 1920 - width;
  return (
    <div style={{position: 'absolute', top: 0, left, width, height: 1080, overflow: 'hidden', clipPath: from === 'left' ? `inset(0 ${(1 - k) * 100}% 0 0)` : `inset(0 0 0 ${(1 - k) * 100}%)`, background: color}}>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateX(${(1 - k) * (from === 'left' ? -80 : 80)}px)`}}>{children}</div>
    </div>
  );
};

export const FlyStack: React.FC<{f: number; at: number; cards: React.ReactNode[]; x: number; y: number; w?: number; h?: number; gap?: number; from?: 'below' | 'right' | 'left'}> = ({f, at, cards, x, y, w = 420, h = 240, gap = 6, from = 'below'}) => (
  <>
    {cards.map((c, i) => {
      const a = at + i * gap;
      if (f < a) return null;
      const k = interpolate(f, [a, a + 8], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
      const speed = 1 - lin(f, a, a + 6);
      const sx = from === 'right' ? 1400 : from === 'left' ? -1400 : 0;
      const sy = from === 'below' ? 900 : 0;
      const rot = ((i * 37) % 13) - 6;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x + i * 26,
            top: y - i * 22,
            width: w,
            height: h,
            transform: `translate(${(1 - k) * sx}px, ${(1 - k) * sy}px) rotate(${rot * k + (1 - k) * 25}deg)`,
            filter: speed > 0.05 ? `blur(${speed * 10}px)` : undefined,
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
            background: K.card,
          }}
        >
          {c}
        </div>
      );
    })}
  </>
);

export const Shake: React.FC<{f: number; at: number; amp?: number; len?: number; children: React.ReactNode}> = ({f, at, amp = 22, len = 10, children}) => {
  const k = f >= at && f < at + len ? 1 - (f - at) / len : 0;
  return <AbsoluteFill style={{transform: `translate(${Math.sin(f * 2.9) * amp * k}px, ${Math.cos(f * 3.7) * amp * 0.7 * k}px)`}}>{children}</AbsoluteFill>;
};

// demo card content helper: a fake video thumbnail with a title
export const ThumbCard: React.FC<{hue: number; title: string}> = ({hue, title}) => (
  <div style={{width: '100%', height: '100%', background: `linear-gradient(160deg, hsl(${hue},70%,45%), hsl(${(hue + 40) % 360},70%,25%))`, position: 'relative'}}>
    <div style={{position: 'absolute', left: 18, bottom: 14, right: 18, fontFamily: UI, fontWeight: 700, fontSize: 30, color: '#fff', textShadow: '0 3px 8px rgba(0,0,0,0.6)'}}>{title}</div>
  </div>
);

// music changes with the situation (STYLE_3D §0.5): one track per scene mood, hard stops before punchlines, CC-BY Kevin MacLeod
export type MSeg = {src: string; from: number; to: number; v?: number; off?: number};
export const Music: React.FC<{segs: MSeg[]}> = ({segs}) => (
  <>
    {segs.map(({src, from, to, v = 0.07, off = 0}, i) => {
      const len = Math.max(1, to - from);
      return (
        <Sequence key={i} from={from} durationInFrames={len} layout="none">
          <Audio src={staticFile(`music/km/${src}.mp3`)} startFrom={off} volume={(f) => v * Math.min(1, f / 8, (len - f) / 6)} />
        </Sequence>
      );
    })}
  </>
);

