import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const TaxBucket: React.FC<P & {rate: string; level: number; color?: string; cap?: string; hl?: number; w?: number; h?: number}> = ({rate, level, color = C.blue, cap, hl = 0, w = 220, h = 300, ...p}) => {
  const id = `tb${rate.replace(/[^0-9a-z]/gi, '')}${w}`;
  const path = `M ${-w / 2} ${-h / 2} L ${w / 2} ${-h / 2} L ${w / 2 - 24} ${h / 2} L ${-w / 2 + 24} ${h / 2} Z`;
  return (
    <G {...p}>
      {hl > 0 && <path d={path} transform="scale(1.1)" fill={C.yellow} opacity={0.6 * hl} />}
      <clipPath id={id}><path d={path} /></clipPath>
      <path d={path} fill="#fff" />
      <rect x={-w / 2} y={h / 2 - h * level} width={w} height={h * level} fill={color} opacity={0.8} clipPath={`url(#${id})`} />
      <path d={path} fill="none" {...O} />
      <Text y={-h / 2 - 40} size={50}>{rate}</Text>
      {cap && <Text y={h / 2 + 40} size={28} color="#5B6470">{cap}</Text>}
    </G>
  );
};

export const Closet: React.FC<P & {wide?: number; fill?: number}> = ({wide = 1, fill = 0.5, ...p}) => {
  const w = 300 * wide;
  const n = Math.max(1, Math.round(fill * 10 * wide));
  const cols = [C.red, C.blue, C.gold, C.green, '#8E6CCF'];
  return (
    <G {...p}>
      <rect x={-w / 2} y={-420} width={w} height={420} rx={10} fill="#E9D8BE" {...O} />
      <line x1={-w / 2 + 16} y1={-370} x2={w / 2 - 16} y2={-370} stroke={C.ink} strokeWidth={6} />
      {Array.from({length: n}).map((_, i) => {
        const x = -w / 2 + 30 + (i / Math.max(1, n - 1)) * (w - 60);
        return <path key={i} d={`M ${x} -370 l -22 30 l 0 150 l 44 0 l 0 -150 Z`} fill={cols[i % 5]} stroke={C.ink} strokeWidth={4} />;
      })}
      {fill > 0.9 && Array.from({length: Math.round(4 * wide)}).map((_, i) => <rect key={i} x={-w / 2 + 20 + i * 70} y={-120} width={60} height={100} rx={8} fill={cols[(i + 2) % 5]} stroke={C.ink} strokeWidth={4} />)}
    </G>
  );
};

export const Wheel: React.FC<P & {f: number; spin?: number}> = ({f, spin = 1, ...p}) => {
  const a = (f * 6 * spin) % 360;
  return (
    <G {...p}>
      <line x1={0} y1={0} x2={-120} y2={260} stroke={C.ink} strokeWidth={10} />
      <line x1={0} y1={0} x2={120} y2={260} stroke={C.ink} strokeWidth={10} />
      <g transform={`rotate(${a})`}>
        <circle r={230} fill="none" stroke={C.ink} strokeWidth={14} />
        <circle r={200} fill="none" stroke="#9AA5B1" strokeWidth={6} />
        {Array.from({length: 12}).map((_, i) => {
          const t = (i / 12) * Math.PI * 2;
          return <line key={i} x1={Math.cos(t) * 200} y1={Math.sin(t) * 200} x2={Math.cos(t) * 230} y2={Math.sin(t) * 230} stroke={C.ink} strokeWidth={5} />;
        })}
        <line x1={-200} y1={0} x2={200} y2={0} stroke="#9AA5B1" strokeWidth={5} />
        <line x1={0} y1={-200} x2={0} y2={200} stroke="#9AA5B1" strokeWidth={5} />
      </g>
      <circle r={20} fill={C.ink} />
    </G>
  );
};

export const LoanBar: React.FC<P & {months: number; max?: number; label?: string; color?: string; w?: number}> = ({months, max = 96, label, color = C.blue, w = 1000, ...p}) => {
  const len = (months / max) * w;
  return (
    <G {...p}>
      <rect x={-w / 2} y={-34} width={w} height={68} rx={34} fill="#fff" stroke="#C9CED6" strokeWidth={4} />
      <rect x={-w / 2} y={-34} width={Math.max(68, len)} height={68} rx={34} fill={color} {...O} />
      {Array.from({length: Math.floor(max / 12) + 1}).map((_, i) => <line key={i} x1={-w / 2 + (i * 12 / max) * w} y1={40} x2={-w / 2 + (i * 12 / max) * w} y2={58} stroke={C.ink} strokeWidth={4} />)}
      {label && <Text x={-w / 2 - 20} y={2} size={36} anchor="end">{label}</Text>}
    </G>
  );
};
