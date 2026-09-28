import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// A tiered wedding/party cake with a price tag hanging off it.
export const PriceCake: React.FC<P & {price: string; hi?: boolean}> = ({price, hi = false, ...p}) => (
  <G {...p}>
    <rect x={-190} y={30} width={380} height={110} rx={14} fill="#fff" {...O} />
    <rect x={-140} y={-70} width={280} height={100} rx={14} fill="#fff" {...O} />
    <rect x={-90} y={-150} width={180} height={80} rx={12} fill="#fff" {...O} />
    {[50, -50, -130].map((y, i) => (
      <path key={i} d={`M ${-190 + i * 50} ${y} Q ${-160 + i * 50} ${y - 26} ${-130 + i * 50} ${y} Q ${-100 + i * 50} ${y - 26} ${-70 + i * 50} ${y}`} fill="none" stroke="#F7C6D0" strokeWidth={10} strokeLinecap="round" />
    ))}
    <path d="M -8 -150 L 8 -150 L 8 -190 Q 20 -210 8 -230 Q -4 -212 8 -196" fill="#FF9F1C" stroke={C.ink} strokeWidth={4} />
    <g transform="translate(210,10) rotate(14)">
      <path d="M 0 -30 L 90 -30 L 120 0 L 90 30 L 0 30 Z" fill={hi ? C.red : C.yellow} stroke={C.ink} strokeWidth={5} />
      <circle cx={14} cy={0} r={7} fill="#fff" stroke={C.ink} strokeWidth={3} />
      <Text x={64} y={5} size={34} color={hi ? '#fff' : C.ink}>{price}</Text>
    </g>
  </G>
);

// A simple wedding-venue tent / marquee.
export const Venue: React.FC<P & {label?: string}> = ({label = 'VENUE', ...p}) => (
  <G {...p}>
    <path d="M -220 120 L 0 -180 L 220 120 Z" fill="#fff" {...O} />
    <path d="M -140 120 L 0 -110 L 140 120 Z" fill="#F4EAD8" stroke={C.ink} strokeWidth={4} />
    <path d="M 0 -180 L 0 120" stroke={C.ink} strokeWidth={4} />
    <rect x={-220} y={120} width={440} height={26} fill={C.wood} {...O} strokeWidth={4} />
    <path d="M -6 -180 L -6 -220 L 26 -206 L -6 -192" fill={C.red} stroke={C.ink} strokeWidth={4} />
    {label && <Text y={185} size={34}>{label}</Text>}
  </G>
);

// A row of small chair icons; lit highlights how many are "filled" by extra guests.
export const GuestRow: React.FC<P & {n: number; lit?: number; perRow?: number}> = ({n, lit = 0, perRow = 10, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => {
      const x = (i % perRow) * 62 - ((Math.min(n, perRow) - 1) * 62) / 2;
      const y = Math.floor(i / perRow) * 76;
      const on = i >= n - lit;
      return (
        <g key={i} transform={`translate(${x},${y})`}>
          <rect x={-18} y={-6} width={36} height={34} rx={6} fill={on ? C.red : '#fff'} stroke={C.ink} strokeWidth={4} />
          <rect x={-18} y={-30} width={36} height={26} rx={8} fill={on ? C.red : '#fff'} stroke={C.ink} strokeWidth={4} />
        </g>
      );
    })}
  </G>
);

// Two overlapping wedding rings.
export const RingPair: React.FC<P> = (p) => (
  <G {...p}>
    <circle cx={-40} cy={0} r={70} fill="none" stroke={C.gold} strokeWidth={16} />
    <circle cx={-40} cy={0} r={70} fill="none" stroke={C.ink} strokeWidth={4} />
    <circle cx={40} cy={0} r={70} fill="none" stroke={C.gold} strokeWidth={16} />
    <circle cx={40} cy={0} r={70} fill="none" stroke={C.ink} strokeWidth={4} />
  </G>
);
