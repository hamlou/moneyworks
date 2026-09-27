import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const Bowl: React.FC<P & {label?: string; full?: number}> = ({label, full = 1, ...p}) => (
  <G {...p}>
    {full > 0 && [-60, -20, 20, 60, -40, 0, 40].map((x, i) => <circle key={i} cx={x} cy={i < 4 ? -30 : -60} r={22 * full} fill={C.gold} stroke={C.ink} strokeWidth={4} />)}
    <path d="M -130 -40 L 130 -40 L 100 40 L -100 40 Z" fill={C.red} {...O} />
    {label && <Text y={6} size={30} color="#fff">{label}</Text>}
  </G>
);

export const BillCard: React.FC<P & {label: string; amount: string; date?: string; lit?: number; paid?: number; color?: string}> = ({label, amount, date, lit = 1, paid = 0, color = C.red, ...p}) => (
  <G {...p}>
    <g opacity={0.4 + 0.6 * lit}>
      <rect x={-150} y={-90} width={300} height={180} rx={18} fill="#fff" {...O} />
      <rect x={-150} y={-90} width={300} height={50} rx={18} fill={color} {...O} />
      <rect x={-146} y={-60} width={292} height={18} fill={color} />
      <Text y={-64} size={28} color="#fff" ls={2}>{label}</Text>
      <Text y={10} size={54}>{amount}</Text>
      {date && <Text y={62} size={26} color="#5B6470">{date}</Text>}
    </g>
    {paid > 0 && (
      <g transform={`rotate(-12) scale(${paid})`}>
        <rect x={-110} y={-36} width={220} height={72} rx={10} fill="none" stroke={C.red} strokeWidth={7} />
        <Text y={4} size={40} color={C.red}>PAID</Text>
      </g>
    )}
  </G>
);

export const MonthStrip: React.FC<P & {pay?: number[]; bills?: number[]; lp?: number; lb?: number; w?: number}> = ({pay = [], bills = [], lp = 1, lb = 1, w = 1500, ...p}) => {
  const cw = w / 30;
  return (
    <G {...p}>
      {Array.from({length: 30}).map((_, i) => {
        const d = i + 1;
        const isP = pay.includes(d);
        const isB = bills.includes(d);
        return (
          <g key={i}>
            <rect x={-w / 2 + i * cw + 3} y={-50} width={cw - 6} height={100} rx={8} fill={isB && lb > 0.5 ? '#FDE3EA' : isP && lp > 0.5 ? '#E3F6EC' : '#fff'} stroke={C.ink} strokeWidth={3} />
            <Text x={-w / 2 + i * cw + cw / 2} y={-18} size={20} color="#9C9383">{d}</Text>
            {isP && <circle cx={-w / 2 + i * cw + cw / 2} cy={22} r={14} fill={C.green} stroke={C.ink} strokeWidth={3} opacity={0.3 + 0.7 * lp} />}
            {isB && <rect x={-w / 2 + i * cw + cw / 2 - 12} y={10} width={24} height={24} rx={4} fill={C.red} stroke={C.ink} strokeWidth={3} opacity={0.3 + 0.7 * lb} />}
          </g>
        );
      })}
    </G>
  );
};

export const Crackers: React.FC<P> = (p) => (
  <G {...p}>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${-70 + i * 70},${i === 1 ? -20 : 0}) rotate(${(i - 1) * 12})`}>
        <rect x={-40} y={-40} width={80} height={80} rx={6} fill="#E9C37A" {...O} strokeWidth={4} />
        {[-18, 0, 18].map((a) => [-18, 0, 18].map((b) => <circle key={`${a}${b}`} cx={a} cy={b} r={3} fill={C.woodDark} />))}
      </g>
    ))}
    <rect x={120} y={-110} width={60} height={150} rx={20} fill={C.red} {...O} strokeWidth={5} />
    <rect x={132} y={-140} width={36} height={34} rx={6} fill="#fff" {...O} strokeWidth={4} />
  </G>
);

export const Plug: React.FC<P & {color?: string}> = ({color = C.gold, ...p}) => (
  <G {...p}>
    <path d="M -50 -40 L 50 -40 L 36 40 L -36 40 Z" fill={color} {...O} />
    <rect x={-12} y={-80} width={24} height={44} rx={8} fill={C.woodDark} {...O} strokeWidth={4} />
    <circle cx={0} cy={-90} r={16} fill="none" stroke={C.ink} strokeWidth={5} />
  </G>
);

export const Leak: React.FC<P & {f: number; on?: number}> = ({f, on = 1, ...p}) => (
  <G {...p}>
    {on > 0 && [0, 1, 2].map((i) => {
      const t = (f / 24 + i / 3) % 1;
      return <path key={i} d="M 0 0 Q -12 18 0 26 Q 12 18 0 0 Z" transform={`translate(${t * 30},${t * 180})`} fill={C.green} stroke={C.ink} strokeWidth={3} opacity={(1 - t * 0.4) * on} />;
    })}
  </G>
);
