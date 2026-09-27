import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const TrafficLight: React.FC<P & {lit?: number}> = ({lit = 2, ...p}) => (
  <G {...p}>
    <rect x={-10} y={0} width={20} height={260} fill="#5B6470" {...O} strokeWidth={5} />
    <rect x={-60} y={-300} width={120} height={300} rx={24} fill="#2E3440" {...O} />
    {[C.red, C.yellow, C.green].map((c, i) => (
      <circle key={i} cx={0} cy={-240 + i * 90} r={34} fill={lit === i ? c : '#4A515C'} stroke={C.ink} strokeWidth={4} />
    ))}
  </G>
);

const slideY = (u: number) => Math.exp(-3.2 * u);

export const WaterSlide: React.FC<P & {t?: number; w?: number; h?: number; color?: string; car?: boolean; marks?: {u: number; label: string; lit?: number}[]}> = ({t = 0, w = 1000, h = 520, color = C.blue, car = true, marks = [], ...p}) => {
  const N = 40;
  const pts = Array.from({length: N + 1}, (_, i) => {
    const u = i / N;
    return [-w / 2 + u * w, -h / 2 + (1 - slideY(u)) * h * 0.92] as const;
  });
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const cu = Math.max(0, Math.min(1, t));
  const cx = -w / 2 + cu * w;
  const cy = -h / 2 + (1 - slideY(cu)) * h * 0.92;
  const slope = 3.2 * slideY(cu) * h * 0.92 / w;
  const ang = (Math.atan(slope) * 180) / Math.PI;
  return (
    <G {...p}>
      <path d={`${d} L ${w / 2} ${h / 2 + 30} L ${-w / 2} ${h / 2 + 30} Z`} fill="#E3F1F4" stroke="none" />
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((u) => <line key={u} x1={-w / 2 + u * w} y1={-h / 2 + (1 - slideY(u)) * h * 0.92 + 10} x2={-w / 2 + u * w} y2={h / 2 + 30} stroke="#9AA5B1" strokeWidth={6} />)}
      <path d={d} fill="none" stroke={C.ink} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="10 26" opacity={0.7} />
      {marks.map((m, i) => {
        const mx = -w / 2 + m.u * w;
        const my = -h / 2 + (1 - slideY(m.u)) * h * 0.92;
        return (
          <g key={i} opacity={m.lit ?? 1}>
            <circle cx={mx} cy={my} r={16} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
            <Text x={mx} y={my - 50} size={34}>{m.label}</Text>
          </g>
        );
      })}
      {car && (
        <g transform={`translate(${cx},${cy - 30}) rotate(${ang})`}>
          <path d="M -60 10 L -60 -10 Q -58 -18 -50 -20 L -32 -22 L -18 -42 Q -14 -46 -8 -46 L 26 -46 Q 32 -46 36 -40 L 48 -22 L 56 -20 Q 62 -18 62 -10 L 62 10 Z" fill={C.red} {...O} strokeWidth={4} />
          <circle cx={-34} cy={12} r={12} fill={C.ink} />
          <circle cx={38} cy={12} r={12} fill={C.ink} />
        </g>
      )}
    </G>
  );
};

export const Turtle: React.FC<P & {f?: number; label?: string}> = ({f = 0, label, ...p}) => {
  const k = Math.sin(f / 5) * 6;
  return (
    <G {...p}>
      <ellipse cx={-70 + k} cy={30} rx={22} ry={16} fill="#8CC084" {...O} strokeWidth={4} />
      <ellipse cx={60 - k} cy={30} rx={22} ry={16} fill="#8CC084" {...O} strokeWidth={4} />
      <circle cx={125} cy={-20} r={34} fill="#8CC084" {...O} strokeWidth={5} />
      <circle cx={136} cy={-28} r={6} fill={C.ink} />
      <path d="M -110 20 Q -110 -90 0 -90 Q 110 -90 110 20 Z" fill="#4E8F4A" {...O} />
      <path d="M -60 -50 L 0 -70 L 60 -50 L 50 0 L -50 0 Z" fill="none" stroke="#2F5E2C" strokeWidth={5} />
      {label && <Text y={-30} size={30} color="#fff" stroke={C.ink} sw={4}>{label}</Text>}
    </G>
  );
};

export const Ghost: React.FC<P & {f?: number; label?: string}> = ({f = 0, label, ...p}) => {
  const b = Math.sin(f / 8) * 10;
  return (
    <G {...p}>
      <g transform={`translate(0,${b})`}>
        <path d="M -90 60 L -90 -40 Q -90 -130 0 -130 Q 90 -130 90 -40 L 90 60 Q 70 40 45 60 Q 22 80 0 60 Q -22 40 -45 60 Q -70 80 -90 60 Z" fill="#F4F6FA" {...O} />
        <ellipse cx={-30} cy={-50} rx={12} ry={18} fill={C.ink} />
        <ellipse cx={30} cy={-50} rx={12} ry={18} fill={C.ink} />
        <ellipse cx={0} cy={-5} rx={16} ry={12} fill={C.ink} />
        {label && <Text y={32} size={26} color={C.red}>{label}</Text>}
      </g>
    </G>
  );
};

export const Wrench: React.FC<P & {color?: string}> = ({color = '#9AA5B1', ...p}) => (
  <G {...p}>
    <path d="M -20 -60 L 20 -60 L 20 110 Q 20 130 0 130 Q -20 130 -20 110 Z" fill={color} {...O} />
    <path d="M -55 -110 Q -60 -40 0 -40 Q 60 -40 55 -110 L 25 -110 L 25 -80 L -25 -80 L -25 -110 Z" fill={color} {...O} />
  </G>
);

export const Smell: React.FC<P & {f?: number; color?: string}> = ({f = 0, color = '#7FB7E6', ...p}) => (
  <G {...p}>
    {[-40, 0, 40].map((x, i) => (
      <path key={x} d={`M ${x} 60 q 20 -20 0 -40 q -20 -20 0 -40 q 20 -20 0 -40`} transform={`translate(0,${-((f / 2 + i * 10) % 20)})`} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" />
    ))}
  </G>
);

export const RaceTrack: React.FC<P & {w?: number; carX?: number; loanX?: number; carLabel?: string; loanLabel?: string}> = ({w = 1300, carX = 0, loanX = 0, carLabel = 'CAR VALUE', loanLabel = 'YOUR LOAN', ...p}) => (
  <G {...p}>
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(0,${i * 200})`}>
        <rect x={-w / 2} y={-60} width={w} height={120} rx={20} fill={i ? '#FDE3EA' : '#E3F6EC'} {...O} strokeWidth={5} />
        <line x1={-w / 2 + 20} y1={0} x2={w / 2 - 20} y2={0} stroke="#fff" strokeWidth={6} strokeDasharray="24 20" />
        <Text x={-w / 2 + 120} y={-80} size={30} color="#5B6470">{i ? loanLabel : carLabel}</Text>
      </g>
    ))}
    <line x1={w / 2 - 40} y1={-80} x2={w / 2 - 40} y2={280} stroke={C.ink} strokeWidth={6} strokeDasharray="12 10" />
    <Text x={w / 2 - 40} y={-110} size={28}>$0</Text>
    <g transform={`translate(${-w / 2 + 90 + carX * (w - 220)},0)`}>
      <path d="M -60 20 L -60 -2 Q -58 -10 -50 -12 L -32 -14 L -18 -34 Q -14 -38 -8 -38 L 26 -38 Q 32 -38 36 -32 L 48 -14 L 56 -12 Q 62 -10 62 -2 L 62 20 Z" fill={C.red} {...O} strokeWidth={4} />
      <circle cx={-34} cy={22} r={13} fill={C.ink} />
      <circle cx={38} cy={22} r={13} fill={C.ink} />
    </g>
    <g transform={`translate(${-w / 2 + 90 + loanX * (w - 220)},200)`}>
      <path d="M -50 20 Q -50 -50 0 -50 Q 50 -50 50 20 Z" fill="#4E8F4A" {...O} strokeWidth={5} />
      <circle cx={64} cy={0} r={20} fill="#8CC084" {...O} strokeWidth={4} />
    </g>
  </G>
);
