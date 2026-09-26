import React from 'react';
import {AbsoluteFill} from 'remotion';
import {loadFont as loadAnton} from '@remotion/google-fonts/Anton';
import {C} from '../theme';
import {Stick, Expr} from '../Stick';

export const HEAD = loadAnton('normal', {weights: ['400'], subsets: ['latin']}).fontFamily;
export const W = 1280;
export const H = 720;

export const Defs: React.FC = () => (
  <defs>
    <filter id="pop" x="-30%" y="-30%" width="160%" height="160%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="9" result="d" />
      <feFlood floodColor="#fff" />
      <feComposite in2="d" operator="in" result="o" />
      <feDropShadow in="o" dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity="0.55" result="os" />
      <feMerge>
        <feMergeNode in="os" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000" floodOpacity="0.5" />
    </filter>
    <filter id="blur40" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="40" />
    </filter>
  </defs>
);

export const Stage: React.FC<{a: string; b: string; cx?: number; cy?: number; rays?: boolean; children: React.ReactNode}> = ({a, b, cx = 640, cy = 360, rays = true, children}) => (
  <AbsoluteFill style={{background: b}}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <Defs />
      <radialGradient id="bg" cx={cx} cy={cy} r={900} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </radialGradient>
      <rect width={W} height={H} fill="url(#bg)" />
      {rays &&
        Array.from({length: 20}).map((_, i) => {
          const a0 = (i / 20) * Math.PI * 2;
          const a1 = a0 + Math.PI / 20;
          return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a0) * 1600} ${cy + Math.sin(a0) * 1600} L ${cx + Math.cos(a1) * 1600} ${cy + Math.sin(a1) * 1600} Z`} fill="#fff" opacity={0.06} />;
        })}
      <radialGradient id="vig" cx={640} cy={360} r={820} gradientUnits="userSpaceOnUse">
        <stop offset="0.55" stopColor="#000" stopOpacity={0} />
        <stop offset="1" stopColor="#000" stopOpacity={0.55} />
      </radialGradient>
      {children}
      <rect width={W} height={H} fill="url(#vig)" pointerEvents="none" />
    </svg>
  </AbsoluteFill>
);

export const Glow: React.FC<{x: number; y: number; r: number; color: string; o?: number}> = ({x, y, r, color, o = 0.8}) => (
  <circle cx={x} cy={y} r={r} fill={color} opacity={o} filter="url(#blur40)" />
);

type Acc = React.ComponentProps<typeof Stick>['acc'];

export const Face: React.FC<{cx: number; cy: number; s?: number; expr: Expr; pose?: string; acc?: Acc; seed?: number; look?: number; flip?: boolean; lines?: boolean; sweat?: boolean}> = ({cx, cy, s = 6, expr, pose = 'idle', acc = ['hair'], seed = 50, look = 0, flip, lines, sweat}) => (
  <g>
    {lines &&
      Array.from({length: 7}).map((_, i) => {
        const a = (-150 + i * 20) * (Math.PI / 180);
        const r0 = 44 * s;
        const r1 = 58 * s;
        return <path key={i} d={`M ${cx + Math.cos(a) * r0} ${cy + Math.sin(a) * r0} L ${cx + Math.cos(a) * r1} ${cy + Math.sin(a) * r1}`} stroke="#fff" strokeWidth={s * 3.2} strokeLinecap="round" />;
      })}
    <g filter="url(#pop)">
      <Stick f={20} x={cx} y={cy + 291 * s} s={s} keys={[{at: 0, pose, expr, look}]} acc={acc} seed={seed} flip={flip} />
    </g>
    {sweat && (
      <path d="M 0 0 Q 9 13 0 21 Q -9 13 0 0 Z" transform={`translate(${cx + (flip ? -1 : 1) * 30 * s},${cy - 16 * s}) scale(${s * 0.9})`} fill="#8ECDF2" stroke={C.ink} strokeWidth={3} />
    )}
  </g>
);

export const Hero: React.FC<{x?: number; y?: number; s?: number; r?: number; pop?: boolean; children: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, pop = true, children}) => (
  <g filter={pop ? 'url(#pop)' : 'url(#shadow)'}>
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>{children}</g>
  </g>
);

export type Word = {t: string; c?: string; box?: string};

const tw = (t: string) =>
  [...t].reduce((a, ch) => a + ("I1'.,!:|".includes(ch) ? 0.25 : '?'.includes(ch) ? 0.42 : 'MW'.includes(ch) ? 0.66 : ch === ' ' ? 0.22 : ch === '×' ? 0.5 : 0.47), 0);

export const HalfBill: React.FC<{side: -1 | 1}> = ({side}) => (
  <g>
    <clipPath id={`hb${side}`}>
      <path d={side < 0 ? 'M -400 -200 L 6 -200 L -10 -110 L 12 -30 L -8 50 L 10 200 L -400 200 Z' : 'M 400 -200 L 6 -200 L -10 -110 L 12 -30 L -8 50 L 10 200 L 400 200 Z'} />
    </clipPath>
    <g clipPath={`url(#hb${side})`}>
      <rect x={-300} y={-130} width={600} height={260} rx={14} fill="#9EDDB0" stroke={C.ink} strokeWidth={9} />
      <rect x={-262} y={-96} width={524} height={192} rx={8} fill="none" stroke="#2DB77A" strokeWidth={8} />
      <circle cx={0} cy={0} r={70} fill="#E8F7EC" stroke="#2DB77A" strokeWidth={8} />
      <text x={0} y={6} fontFamily={HEAD} fontSize={100} fill="#1E8F5B" textAnchor="middle" dominantBaseline="middle">$</text>
      {[[-215, -60], [215, 60]].map(([cx, cy]) => (
        <text key={cx} x={cx} y={cy} fontFamily={HEAD} fontSize={64} fill="#1E8F5B" textAnchor="middle" dominantBaseline="middle">100</text>
      ))}
    </g>
  </g>
);

export const Tower: React.FC<{x: number; base: number; h: number; w?: number; color: string; label: string; value: string}> = ({x, base, h, w = 220, color, label, value}) => (
  <g filter="url(#pop)">
    <rect x={x - w / 2} y={base - h} width={w} height={h} rx={14} fill={color} stroke={C.ink} strokeWidth={9} />
    {Array.from({length: Math.floor(h / 46)}).map((_, i) => (
      <line key={i} x1={x - w / 2 + 14} x2={x + w / 2 - 14} y1={base - 23 - i * 46} y2={base - 23 - i * 46} stroke="rgba(0,0,0,0.18)" strokeWidth={6} strokeLinecap="round" />
    ))}
    <text x={x} y={base - h - 50} fontFamily={HEAD} fontSize={70} fill="#fff" stroke={C.ink} strokeWidth={9} paintOrder="stroke" textAnchor="middle" dominantBaseline="middle">{value}</text>
    <text x={x} y={base + 44} fontFamily={HEAD} fontSize={48} fill="#fff" stroke={C.ink} strokeWidth={8} paintOrder="stroke" textAnchor="middle" dominantBaseline="middle">{label}</text>
  </g>
);

export const Headline: React.FC<{x: number; y: number; size: number; lines: Word[][]; anchor?: 'start' | 'middle' | 'end'; r?: number; gap?: number}> = ({x, y, size, lines, anchor = 'start', r = 0, gap = 1.02}) => {
  return (
    <g transform={`rotate(${r},${x},${y})`}>
      {lines.map((ws, li) => {
        const widths = ws.map((w) => tw(w.t) * size + (w.box ? size * 0.3 : 0));
        const sp = size * 0.26;
        const total = widths.reduce((a, b) => a + b, 0) + sp * (ws.length - 1);
        let cx = anchor === 'start' ? x : anchor === 'middle' ? x - total / 2 : x - total;
        cx = Math.max(40, Math.min(cx, W - 40 - total));
        const ly = y + li * size * gap;
        return ws.map((w, i) => {
          const wx = cx;
          cx += widths[i] + sp;
          const tx = wx + widths[i] / 2;
          return (
            <g key={`${li}-${i}`}>
              {w.box && <rect x={wx} y={ly - size * 0.58} width={widths[i]} height={size * 1.12} rx={size * 0.14} fill={w.box} stroke={C.ink} strokeWidth={size * 0.07} filter="url(#shadow)" />}
              {!w.box && (
                <text x={tx + size * 0.05} y={ly + size * 0.07} fontFamily={HEAD} fontSize={size} fill={C.ink} textAnchor="middle" dominantBaseline="middle" stroke={C.ink} strokeWidth={size * 0.2} strokeLinejoin="round">
                  {w.t}
                </text>
              )}
              <text x={tx} y={ly} fontFamily={HEAD} fontSize={size} fill={w.c ?? '#fff'} textAnchor="middle" dominantBaseline="middle" stroke={w.box ? 'none' : C.ink} strokeWidth={size * 0.13} paintOrder="stroke" strokeLinejoin="round">
                {w.t}
              </text>
            </g>
          );
        });
      })}
    </g>
  );
};

export const ArrowCue: React.FC<{x1: number; y1: number; x2: number; y2: number; bend?: number; color?: string; w?: number}> = ({x1, y1, x2, y2, bend = 0.25, color = '#FF2D2D', w = 22}) => {
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
  const my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const ang = Math.atan2(y2 - my, x2 - mx);
  const h = w * 2.2;
  const p1 = [x2 - Math.cos(ang - 0.5) * h, y2 - Math.sin(ang - 0.5) * h];
  const p2 = [x2 - Math.cos(ang + 0.5) * h, y2 - Math.sin(ang + 0.5) * h];
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2} M ${p1[0]} ${p1[1]} L ${x2} ${y2} L ${p2[0]} ${p2[1]}`;
  return (
    <g filter="url(#shadow)">
      <path d={d} fill="none" stroke={C.ink} strokeWidth={w + 12} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

export const Ring: React.FC<{x: number; y: number; rx: number; ry: number; r?: number; color?: string}> = ({x, y, rx, ry, r = -8, color = '#FF2D2D'}) => (
  <g transform={`translate(${x},${y}) rotate(${r})`} filter="url(#shadow)">
    <path d={`M ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx * 0.2} ${ry * 0.98} `} fill="none" stroke={C.ink} strokeWidth={30} strokeLinecap="round" />
    <path d={`M ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx * 0.2} ${ry * 0.98} `} fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" />
  </g>
);

export const Pie: React.FC<{x: number; y: number; r?: number; slices: {v: number; c: string; label?: string}[]; pop?: number}> = ({x, y, r = 200, slices, pop = -1}) => {
  let a0 = -Math.PI / 2;
  return (
    <g transform={`translate(${x},${y})`}>
      {slices.map((s, i) => {
        const a1 = a0 + s.v * Math.PI * 2;
        const m = (a0 + a1) / 2;
        const off = i === pop ? 36 : 0;
        const ox = Math.cos(m) * off;
        const oy = Math.sin(m) * off;
        const d = `M ${ox} ${oy} L ${ox + Math.cos(a0) * r} ${oy + Math.sin(a0) * r} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${ox + Math.cos(a1) * r} ${oy + Math.sin(a1) * r} Z`;
        const lx = ox + Math.cos(m) * r * 0.58;
        const ly = oy + Math.sin(m) * r * 0.58;
        a0 = a1;
        return (
          <g key={i} filter={i === pop ? 'url(#pop)' : undefined}>
            <path d={d} fill={s.c} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
            {s.label && (
              <text x={lx} y={ly} fontFamily={HEAD} fontSize={r * 0.42} fill="#fff" stroke={C.ink} strokeWidth={r * 0.05} paintOrder="stroke" textAnchor="middle" dominantBaseline="middle">
                {s.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const Rock: React.FC = () => (
  <g>
    <path d="M -170 60 Q -190 -30 -110 -80 Q -40 -130 50 -110 Q 150 -90 180 -10 Q 200 60 130 80 Q 0 100 -170 60 Z" fill="#9AA0A8" stroke={C.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -90 -40 Q -60 -60 -20 -58 M 60 -60 Q 100 -50 120 -20" fill="none" stroke="#C5CAD0" strokeWidth={10} strokeLinecap="round" />
  </g>
);

export const UpArrow: React.FC<{x: number; y: number; s?: number; color?: string; down?: boolean}> = ({x, y, s = 1, color = '#2BD67B', down}) => {
  const d = 'M -300 120 L -120 -20 L -20 60 L 220 -160';
  return (
    <g transform={`translate(${x},${y}) scale(${s},${down ? -s : s})`} filter="url(#shadow)">
      <path d={d} fill="none" stroke={C.ink} strokeWidth={62} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 120 -190 L 260 -200 L 250 -60 Z" fill={C.ink} stroke={C.ink} strokeWidth={24} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 120 -190 L 260 -200 L 250 -60 Z" fill={color} />
    </g>
  );
};

export const XBig:React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`} filter="url(#shadow)">
    {['M -90 -90 L 90 90', 'M 90 -90 L -90 90'].map((d) => (
      <g key={d}>
        <path d={d} stroke={C.ink} strokeWidth={50} strokeLinecap="round" />
        <path d={d} stroke="#FF2D2D" strokeWidth={34} strokeLinecap="round" />
      </g>
    ))}
  </g>
);
