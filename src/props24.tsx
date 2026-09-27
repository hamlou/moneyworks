import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const KChart: React.FC<P & {up?: number; down?: number; split?: number; upLabel?: string; downLabel?: string; w?: number; h?: number}> = ({up = 1, down = 1, split = 0, upLabel, downLabel, w = 1200, h = 620, ...p}) => {
  const x0 = -w / 2;
  const sx = x0 + w * 0.36;
  const sy = h * 0.1;
  const pre = `M ${x0 + 20} ${-h * 0.12} L ${x0 + w * 0.26} ${-h * 0.14} L ${sx} ${sy}`;
  const ua = `M ${sx} ${sy} L ${w / 2 - 20} ${-h / 2 + 20}`;
  const da = `M ${sx} ${sy} L ${w / 2 - 20} ${h / 2 - 20}`;
  return (
    <G {...p}>
      <rect x={-w / 2 - 30} y={-h / 2 - 30} width={w + 60} height={h + 60} rx={28} fill="#fff" {...O} />
      <line x1={x0} y1={h / 2} x2={w / 2} y2={h / 2} stroke="#C9CED6" strokeWidth={4} />
      <line x1={x0} y1={-h / 2} x2={x0} y2={h / 2} stroke="#C9CED6" strokeWidth={4} />
      <text x={x0 + 20} y={h / 2 - 20} fontFamily={FONT} fontWeight={600} fontSize={28} fill="#9AA5B1">2020</text>
      <path d={pre} fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d={ua} fill="none" stroke={C.green} strokeWidth={14 + 10 * up} strokeLinecap="round" opacity={0.35 + 0.65 * up} />
      <path d={da} fill="none" stroke={C.red} strokeWidth={14 + 10 * down} strokeLinecap="round" opacity={0.35 + 0.65 * down} />
      <circle cx={sx} cy={sy} r={16 + 14 * split} fill={C.yellow} {...O} />
      {upLabel && <Text x={w / 2 - 250} y={-h / 2 + 90 + 0} size={34} color={up > 0.5 ? C.green : '#9AA5B1'} anchor="middle">{upLabel}</Text>}
      {downLabel && <Text x={w / 2 - 250} y={h / 2 - 80} size={34} color={down > 0.5 ? C.red : '#9AA5B1'} anchor="middle">{downLabel}</Text>}
    </G>
  );
};

export const Escalator: React.FC<P & {f: number; dir: 'up' | 'down'; label?: string; len?: number; color?: string}> = ({f, dir, label, len = 760, color, ...p}) => {
  const off = ((f * 3) % 60) * (dir === 'up' ? -1 : 1);
  const c = color ?? (dir === 'up' ? C.green : C.red);
  return (
    <G {...p}>
      <g transform="rotate(-28)">
        <rect x={-len / 2 - 40} y={-10} width={len + 80} height={70} rx={30} fill="#DDE3E9" {...O} />
        <clipPath id={`esc${dir}`}>
          <rect x={-len / 2} y={-10} width={len} height={70} />
        </clipPath>
        <g clipPath={`url(#esc${dir})`}>
          {Array.from({length: Math.ceil(len / 60) + 3}).map((_, i) => {
            const x = -len / 2 - 60 + i * 60 + off;
            return <line key={i} x1={x} y1={-6} x2={x} y2={56} stroke="#9AA5B1" strokeWidth={5} />;
          })}
        </g>
        <line x1={-len / 2 - 20} y1={-90} x2={len / 2 + 20} y2={-90} stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
        <line x1={-len / 2} y1={-90} x2={-len / 2} y2={-10} stroke={C.ink} strokeWidth={6} />
        <line x1={len / 2} y1={-90} x2={len / 2} y2={-10} stroke={C.ink} strokeWidth={6} />
        <path d={dir === 'up' ? `M ${len / 2 - 140} 120 L ${len / 2 - 40} 120 M ${len / 2 - 70} 96 L ${len / 2 - 40} 120 L ${len / 2 - 70} 144` : `M ${-len / 2 + 140} 120 L ${-len / 2 + 40} 120 M ${-len / 2 + 70} 96 L ${-len / 2 + 40} 120 L ${-len / 2 + 70} 144`} fill="none" stroke={c} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        {label && <Text y={125} size={38} color={c}>{label}</Text>}
      </g>
    </G>
  );
};

export const Scoreboard: React.FC<P & {title: string; value: string; sub?: string; w?: number}> = ({title, value, sub, w = 620, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-190} width={w} height={380} rx={24} fill="#1F2A36" {...O} />
    <text x={0} y={-120} fontFamily="monospace" fontWeight={700} fontSize={40} fill="#FFD166" textAnchor="middle" dominantBaseline="middle">{title}</text>
    <text x={0} y={10} fontFamily="monospace" fontWeight={700} fontSize={110} fill="#6EF0A8" textAnchor="middle" dominantBaseline="middle">{value}</text>
    {sub && <text x={0} y={120} fontFamily="monospace" fontWeight={700} fontSize={34} fill="#C9D6E6" textAnchor="middle" dominantBaseline="middle">{sub}</text>}
    <rect x={-40} y={190} width={80} height={120} fill="#5B6470" {...O} />
  </G>
);

export const TV: React.FC<P & {lines: string[]; w?: number; h?: number}> = ({lines, w = 760, h = 460, ...p}) => (
  <G {...p}>
    <line x1={-80} y1={-h / 2 - 90} x2={0} y2={-h / 2} stroke={C.ink} strokeWidth={6} />
    <line x1={80} y1={-h / 2 - 90} x2={0} y2={-h / 2} stroke={C.ink} strokeWidth={6} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} fill="#3A3A46" {...O} />
    <rect x={-w / 2 + 30} y={-h / 2 + 30} width={w - 60} height={h - 60} rx={16} fill={C.navy} />
    <rect x={-w / 2 + 30} y={h / 2 - 110} width={w - 60} height={80} fill={C.red} />
    <Text x={0} y={h / 2 - 70} size={34} color="#fff" ls={3}>BREAKING NEWS</Text>
    {lines.map((l, i) => <Text key={i} y={-h / 2 + 110 + i * 70} size={52} color="#fff">{l}</Text>)}
  </G>
);

export const Tag: React.FC<P & {text: string; color?: string; lit?: number}> = ({text, color = C.green, lit = 1, ...p}) => (
  <G {...p}>
    <rect x={-text.length * 11 - 18} y={-26} width={text.length * 22 + 36} height={52} rx={26} fill={lit > 0.5 ? color : '#D8D0C0'} {...O} strokeWidth={4} />
    <Text y={2} size={30} color="#fff">{text}</Text>
  </G>
);

export const Stool: React.FC<P> = (p) => (
  <G {...p}>
    <ellipse cx={0} cy={-120} rx={50} ry={16} fill={C.woodDark} {...O} strokeWidth={4} />
    <line x1={-30} y1={-110} x2={-40} y2={0} stroke={C.ink} strokeWidth={6} />
    <line x1={30} y1={-110} x2={40} y2={0} stroke={C.ink} strokeWidth={6} />
  </G>
);

export const Towels: React.FC<P> = (p) => (
  <G {...p}>
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(${i * 90 - 45},0)`}>
        <rect x={-40} y={-120} width={80} height={120} rx={10} fill="#fff" {...O} strokeWidth={5} />
        <ellipse cx={0} cy={-120} rx={40} ry={12} fill="#EDE4D2" {...O} strokeWidth={4} />
        <rect x={-40} y={-80} width={80} height={36} fill={C.blue} opacity={0.6} />
      </g>
    ))}
  </G>
);
