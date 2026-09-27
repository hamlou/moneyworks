import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Boot: React.FC<P & {cheap?: boolean; leak?: number; f?: number}> = ({cheap, leak = 0, f = 0, ...p}) => (
  <G {...p}>
    <path d="M -60 -200 L 40 -200 L 40 -40 Q 120 -30 140 10 L 140 40 L -70 40 L -70 -200 Z" fill={cheap ? '#B9AFA0' : '#8C5A33'} {...O} />
    <rect x={-80} y={30} width={230} height={cheap ? 18 : 30} rx={8} fill={cheap ? '#D8CFC0' : C.ink} {...O} strokeWidth={5} />
    {!cheap && [-150, -110, -70].map((y) => <line key={y} x1={-40} x2={20} y1={y} y2={y + 10} stroke={C.gold} strokeWidth={6} strokeLinecap="round" />)}
    {cheap && <path d="M -20 -120 l 20 12 l -10 18 l 22 10" fill="none" stroke={C.ink} strokeWidth={4} />}
    {cheap && leak > 0 && [0, 1, 2].map((i) => {
      const k = ((f / 18 + i / 3) % 1);
      return <path key={i} d={`M ${-10 + i * 40} ${60 + k * 70} q 10 16 0 24 q -10 -8 0 -24 Z`} fill={C.blue} stroke={C.ink} strokeWidth={3} opacity={leak * (1 - k)} />;
    })}
  </G>
);

export const TPPack: React.FC<P & {n: number; label?: string; color?: string}> = ({n, label, color = '#DCE9FF', ...p}) => {
  const cols = n > 8 ? 6 : 2;
  const rows = Math.ceil(n / cols);
  const w = cols * 56 + 30;
  const h = rows * 56 + 30;
  return (
    <G {...p}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={18} fill={color} {...O} />
      {Array.from({length: n}).map((_, i) => (
        <g key={i} transform={`translate(${-w / 2 + 43 + (i % cols) * 56},${-h + 43 + Math.floor(i / cols) * 56})`}>
          <circle r={24} fill="#fff" stroke={C.ink} strokeWidth={4} />
          <circle r={8} fill="#E4DCCB" stroke={C.ink} strokeWidth={3} />
        </g>
      ))}
      {label && <Text y={50} size={38}>{label}</Text>}
    </G>
  );
};

export const HamsterWheel: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <line x1={-120} y1={170} x2={0} y2={0} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={120} y1={170} x2={0} y2={0} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <g transform={`rotate(${f * 6})`}>
      <circle r={150} fill="none" stroke={C.ink} strokeWidth={10} />
      {Array.from({length: 12}).map((_, i) => (
        <line key={i} x1={0} y1={0} x2={Math.cos((i * Math.PI) / 6) * 150} y2={Math.sin((i * Math.PI) / 6) * 150} stroke="#9AA5B1" strokeWidth={4} />
      ))}
    </g>
    <circle r={16} fill={C.ink} />
  </G>
);

export const CheckForm: React.FC<P & {title: string; lines: string[]; checked?: number}> = ({title, lines, checked = 0, ...p}) => (
  <G {...p}>
    <rect x={-300} y={-220} width={600} height={440} rx={16} fill="#fff" {...O} />
    <rect x={-300} y={-220} width={600} height={80} rx={16} fill={C.navy} {...O} />
    <Text y={-178} size={34} color="#fff">{title}</Text>
    {lines.map((l, i) => (
      <g key={i}>
        <rect x={-250} y={-100 + i * 110} width={56} height={56} rx={8} fill={i === 0 && checked > 0.5 ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={5} />
        {i === 0 && checked > 0.5 && <path d={`M ${-240} ${-72 + i * 110} l 16 18 l 30 -40`} fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
        <Text x={-170} y={-70 + i * 110} size={30} anchor="start">{l}</Text>
      </g>
    ))}
  </G>
);

export const BookCover: React.FC<P & {title: string; sub?: string}> = ({title, sub, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-230} width={340} height={460} rx={12} fill="#6A4C93" {...O} />
    <rect x={-170} y={-230} width={40} height={460} fill="#4B3470" stroke={C.ink} strokeWidth={6} />
    <rect x={-110} y={-170} width={250} height={150} rx={10} fill={C.gold} {...O} strokeWidth={5} />
    <Text x={15} y={-120} size={40}>{title.split(' ')[0]}</Text>
    <Text x={15} y={-70} size={40}>{title.split(' ').slice(1).join(' ')}</Text>
    <path d="M -40 60 L 80 60 L 80 120 Q 110 125 118 150 L -50 150 L -50 60 Z" fill="#8C5A33" {...O} strokeWidth={5} />
    {sub && <Text x={15} y={200} size={30} color="#fff">{sub}</Text>}
  </G>
);

export const AccountMeter: React.FC<P & {level: number; label?: string}> = ({level, label = 'BALANCE', ...p}) => {
  const zy = 60;
  const y = zy - level * 3;
  return (
    <G {...p}>
      <rect x={-90} y={-300} width={180} height={500} rx={24} fill="#fff" {...O} />
      <rect x={-70} y={Math.min(y, zy)} width={140} height={Math.abs(zy - y)} fill={level >= 0 ? C.green : C.red} />
      <line x1={-110} y1={zy} x2={110} y2={zy} stroke={C.ink} strokeWidth={8} strokeDasharray="18 10" />
      <Text x={-130} y={zy + 4} size={34} anchor="end">$0</Text>
      <Text y={-330} size={32} color="#5B6470">{label}</Text>
    </G>
  );
};

export const Alarm: React.FC<P & {f: number; on?: number}> = ({f, on = 1, ...p}) => (
  <G {...p} r={(p.r ?? 0) + on * Math.sin(f * 1.6) * 8}>
    <path d="M -80 40 Q -80 -90 0 -90 Q 80 -90 80 40 L 100 60 L -100 60 Z" fill={C.red} {...O} />
    <circle cy={80} r={18} fill={C.gold} {...O} strokeWidth={5} />
    {on > 0 && [-1, 1].map((d) => (
      <g key={d} opacity={on}>
        <path d={`M ${d * 120} -60 q ${d * 30} 50 0 100`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
        <path d={`M ${d * 150} -80 q ${d * 44} 70 0 140`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      </g>
    ))}
  </G>
);

export const People: React.FC<P & {n?: number; hot: number; lit?: number}> = ({n = 100, hot, lit = 1, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => {
      const x = (i % 10) * 56 - 252;
      const y = Math.floor(i / 10) * 64 - 290;
      const red = i >= n - hot && lit > 0.5;
      return (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle cy={-14} r={11} fill={red ? C.red : '#C9C0AE'} />
          <path d="M -16 20 Q -16 -2 0 -2 Q 16 -2 16 20 Z" fill={red ? C.red : '#C9C0AE'} />
        </g>
      );
    })}
  </G>
);
