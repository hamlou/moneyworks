import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
export const ORANGE = '#F7931A';

export const BtcCoin: React.FC<P & {label?: string; spin?: number}> = ({label, spin = 1, ...p}) => (
  <G {...p}>
    <g transform={`scale(${Math.max(0.08, Math.abs(spin))},1)`}>
      <circle r={110} fill={ORANGE} {...O} />
      <circle r={86} fill="none" stroke="#FFD08A" strokeWidth={8} />
      <line x1={-14} y1={-78} x2={-14} y2={78} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
      <line x1={14} y1={-78} x2={14} y2={78} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
      <text x={6} y={8} fontFamily={FONT} fontWeight={700} fontSize={130} fill="#fff" textAnchor="middle" dominantBaseline="middle">B</text>
    </g>
    {label && <Text y={160} size={40}>{label}</Text>}
  </G>
);

export const Notebook: React.FC<P & {lines: string[]; shown?: number; hl?: number; title?: string; w?: number; strike?: number}> = ({lines, shown = 99, hl = -1, title = 'WHO OWNS WHAT', w = 560, strike = -1, ...p}) => {
  const h = Math.max(4, lines.length) * 70 + 140;
  return (
    <G {...p}>
      <rect x={-w / 2 + 10} y={-h / 2 + 12} width={w} height={h} rx={16} fill="rgba(35,35,43,0.12)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill="#FFFDF3" {...O} />
      <line x1={-w / 2 + 70} y1={-h / 2} x2={-w / 2 + 70} y2={h / 2} stroke={C.red} strokeWidth={3} opacity={0.6} />
      {Array.from({length: 7}).map((_, i) => <circle key={i} cx={-w / 2 + 30} cy={-h / 2 + 50 + i * ((h - 100) / 6)} r={10} fill={C.bg} stroke={C.ink} strokeWidth={4} />)}
      <Text x={20} y={-h / 2 + 50} size={32} color="#5B6470" ls={3}>{title}</Text>
      <line x1={-w / 2 + 80} y1={-h / 2 + 85} x2={w / 2 - 20} y2={-h / 2 + 85} stroke={C.ink} strokeWidth={3} />
      {lines.slice(0, shown).map((l, i) => (
        <g key={i}>
          {i === hl && <rect x={-w / 2 + 76} y={-h / 2 + 100 + i * 70} width={w - 96} height={60} rx={8} fill={C.yellow} opacity={0.7} />}
          <text x={-w / 2 + 96} y={-h / 2 + 132 + i * 70} fontFamily={HAND} fontWeight={700} fontSize={46} fill={C.ink} dominantBaseline="middle">{l}</text>
          {i === strike && <line x1={-w / 2 + 90} y1={-h / 2 + 132 + i * 70} x2={w / 2 - 30} y2={-h / 2 + 132 + i * 70} stroke={C.red} strokeWidth={8} strokeLinecap="round" />}
        </g>
      ))}
    </G>
  );
};

export const Rig: React.FC<P & {f: number; on?: boolean; label?: string}> = ({f, on = true, label, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-120} width={300} height={240} rx={16} fill="#3B4452" {...O} />
    {[-70, 70].map((cx) => (
      <g key={cx} transform={`translate(${cx},-10) rotate(${on ? f * 24 : 0})`}>
        <circle r={52} fill="#20262F" stroke={C.ink} strokeWidth={4} />
        {[0, 1, 2, 3].map((k) => <path key={k} d="M 0 0 Q 30 -12 44 -4 Q 30 10 0 0 Z" transform={`rotate(${k * 90})`} fill="#8FA3B8" />)}
        <circle r={10} fill="#C9D6E6" />
      </g>
    ))}
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-100 + i * 50} cy={85} r={8} fill={on && (f + i * 7) % 20 < 10 ? '#6EF0A8' : '#2D3A2F'} />)}
    {label && <Text y={170} size={36}>{label}</Text>}
  </G>
);

export const Key: React.FC<P & {color?: string; label?: string}> = ({color = C.gold, label, ...p}) => (
  <G {...p}>
    <circle cx={-90} cy={0} r={58} fill={color} {...O} />
    <circle cx={-90} cy={0} r={22} fill={C.bg} stroke={C.ink} strokeWidth={5} />
    <path d="M -34 -16 L 140 -16 L 140 16 L 120 16 L 120 50 L 92 50 L 92 16 L 72 16 L 72 40 L 46 40 L 46 16 L -34 16 Z" fill={color} {...O} />
    {label && <Text x={30} y={-60} size={34}>{label}</Text>}
  </G>
);

export const HardDrive: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <rect x={-120} y={-160} width={240} height={320} rx={16} fill="#B8C2CC" {...O} />
    <circle cx={0} cy={-30} r={80} fill="#DDE3E9" stroke={C.ink} strokeWidth={5} />
    <circle cx={0} cy={-30} r={14} fill={C.ink} />
    <path d="M 80 110 L 20 -10" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    {label && <Text y={120} size={30} color={C.ink}>{label}</Text>}
  </G>
);

export const Coaster: React.FC<P & {t: number; pts: number[]; w?: number; h?: number; cart?: boolean}> = ({t, pts, w = 1400, h = 480, cart = true, ...p}) => {
  const mx = Math.max(...pts);
  const mn = Math.min(...pts);
  const xy = pts.map((v, i) => [-w / 2 + (i / (pts.length - 1)) * w, h / 2 - ((v - mn) / (mx - mn || 1)) * h] as [number, number]);
  let d = `M ${xy[0][0]} ${xy[0][1]}`;
  for (let i = 1; i < xy.length; i++) {
    const [x0, y0] = xy[i - 1];
    const [x1, y1] = xy[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`;
  }
  const seg = Math.min(xy.length - 2, Math.floor(t * (xy.length - 1)));
  const lt = t * (xy.length - 1) - seg;
  const e = (1 - Math.cos(Math.PI * Math.min(1, lt))) / 2;
  const cxp = xy[seg][0] + (xy[seg + 1][0] - xy[seg][0]) * lt;
  const cyp = xy[seg][1] + (xy[seg + 1][1] - xy[seg][1]) * e;
  return (
    <G {...p}>
      {xy.map(([x, y], i) => <line key={i} x1={x} y1={y + 10} x2={x} y2={h / 2 + 60} stroke="#C9B79A" strokeWidth={10} />)}
      <path d={d} fill="none" stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
      <path d={d} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} />
      {cart && (
        <g transform={`translate(${cxp},${cyp - 30})`}>
          <rect x={-40} y={-30} width={80} height={46} rx={10} fill={C.red} {...O} strokeWidth={5} />
          <circle cx={-22} cy={20} r={10} fill={C.ink} />
          <circle cx={22} cy={20} r={10} fill={C.ink} />
        </g>
      )}
    </G>
  );
};

export const Turbine: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <path d="M -12 0 L -6 -300 L 6 -300 L 12 0 Z" fill="#fff" {...O} strokeWidth={5} />
    <g transform={`translate(0,-300) rotate(${f * 3})`}>
      {[0, 120, 240].map((a) => <path key={a} d="M 0 0 L 12 -150 Q 0 -170 -12 -150 Z" transform={`rotate(${a})`} fill="#fff" {...O} strokeWidth={5} />)}
      <circle r={16} fill="#DDE3E9" stroke={C.ink} strokeWidth={5} />
    </g>
  </G>
);

export const Bolt: React.FC<P & {color?: string}> = ({color = C.yellow, ...p}) => (
  <G {...p}>
    <path d="M 20 -120 L -60 20 L -5 20 L -30 120 L 60 -30 L 5 -30 Z" fill={color} {...O} />
  </G>
);

export const Whitepaper: React.FC<P & {lines?: number}> = ({lines = 6, ...p}) => (
  <G {...p}>
    <rect x={-230} y={-300} width={460} height={600} rx={8} fill="#fff" {...O} />
    <Text y={-240} size={30}>Bitcoin: A Peer-to-Peer</Text>
    <Text y={-200} size={30}>Electronic Cash System</Text>
    <Text y={-150} size={24} color="#5B6470">Satoshi Nakamoto</Text>
    {Array.from({length: lines}).map((_, i) => <line key={i} x1={-190} x2={i % 3 === 2 ? 90 : 190} y1={-90 + i * 50} y2={-90 + i * 50} stroke="#C9CED6" strokeWidth={10} strokeLinecap="round" />)}
    <Text y={265} size={24} color="#5B6470">Oct 31, 2008 · 9 pages</Text>
  </G>
);

export const Mystery: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -110 0 L -110 -260 Q -110 -380 0 -390 Q 110 -380 110 -260 L 110 0 Z" fill="#3B4452" {...O} />
    <ellipse cx={0} cy={-270} rx={62} ry={74} fill="#20262F" />
    <Text y={-270} size={90} color="#fff">?</Text>
  </G>
);
