import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const GiftBox: React.FC<P & {color?: string; label?: string}> = ({color = C.red, label, ...p}) => (
  <G {...p}>
    <rect x={-90} y={-70} width={180} height={140} rx={10} fill={color} {...O} />
    <rect x={-90} y={-16} width={180} height={30} fill="#fff" opacity={0.85} />
    <rect x={-16} y={-70} width={32} height={140} fill="#fff" opacity={0.85} />
    <path d="M -34 -70 Q -60 -110 -20 -108 Q 0 -100 0 -70 Q 0 -100 20 -108 Q 60 -110 34 -70 Z" fill={color} {...O} strokeWidth={5} />
    {label && <Text y={100} size={30}>{label}</Text>}
  </G>
);

export const ChristmasTree: React.FC<P & {lit?: number}> = ({lit = 1, ...p}) => (
  <G {...p}>
    <rect x={-24} y={140} width={48} height={40} fill="#8C5A33" {...O} strokeWidth={5} />
    <path d="M 0 -260 L 90 -120 L 50 -120 L 130 -10 L 80 -10 L 150 100 L -150 100 L -80 -10 L -130 -10 L -50 -120 L -90 -120 Z" fill="#3E7A4F" {...O} />
    {[[-70, 40], [60, 10], [-20, -70], [40, -110], [-50, -170], [10, 60]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={12} fill={lit > 0.5 ? [C.yellow, C.red, C.blue, C.gold][i % 4] : '#fff'} stroke={C.ink} strokeWidth={3} />
    ))}
    <path d="M 0 -300 L 13 -270 L 44 -266 L 20 -244 L 27 -212 L 0 -230 L -27 -212 L -20 -244 L -44 -266 L -13 -270 Z" fill={C.gold} {...O} strokeWidth={4} />
  </G>
);

export const Sweater: React.FC<P & {ugly?: number}> = ({ugly = 1, ...p}) => (
  <G {...p}>
    <path d="M -110 -80 L -60 -110 L -20 -80 L 20 -80 L 60 -110 L 110 -80 L 90 -20 L 60 -34 L 60 110 L -60 110 L -60 -34 L -90 -20 Z" fill="#C0533A" {...O} />
    {ugly > 0.5 && (
      <g>
        <path d="M -30 0 L -10 -30 L 10 0 L 30 -30" fill="none" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={-30} cy={50} r={12} fill={C.green} stroke={C.ink} strokeWidth={3} />
        <circle cx={30} cy={50} r={12} fill={C.green} stroke={C.ink} strokeWidth={3} />
      </g>
    )}
  </G>
);

export const WrapRoll: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-30} y={-140} width={60} height={280} rx={30} fill="#DCE9FF" {...O} strokeWidth={5} />
    {[-90, -30, 30, 90].map((y) => <ellipse key={y} cx={0} cy={y} rx={32} ry={14} fill="none" stroke={C.blue} strokeWidth={4} />)}
    <ellipse cx={0} cy={-140} rx={30} ry={14} fill="#fff" stroke={C.ink} strokeWidth={5} />
  </G>
);

export const BNPLDots: React.FC<P & {paid: number; amt?: string}> = ({paid, amt = '$25', ...p}) => (
  <G {...p}>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${(i - 1.5) * 130},0)`}>
        <circle r={54} fill={i < paid ? C.green : '#fff'} stroke={C.ink} strokeWidth={6} />
        <Text y={4} size={30} color={i < paid ? '#fff' : C.ink}>{amt}</Text>
        {i < 3 && <line x1={64} y1={0} x2={66} y2={0} stroke={C.ink} strokeWidth={4} strokeDasharray="6 8" />}
      </g>
    ))}
  </G>
);

export const LayawayTicket: React.FC<P & {paidPct: number}> = ({paidPct, ...p}) => (
  <G {...p}>
    <rect x={-190} y={-140} width={380} height={280} rx={14} fill="#fff" {...O} />
    <Text y={-96} size={30} color="#5B6470">LAYAWAY TICKET</Text>
    <rect x={-150} y={-40} width={300} height={40} rx={10} fill="#F4F0E6" stroke={C.ink} strokeWidth={4} />
    <rect x={-150} y={-40} width={300 * paidPct} height={40} rx={10} fill={C.green} />
    <Text y={40} size={34}>{Math.round(paidPct * 100)}% paid</Text>
    <Text y={90} size={26} color="#5B6470">{paidPct >= 1 ? 'take it home!' : 'pay first, take home after'}</Text>
  </G>
);

export const ToyBox: React.FC<P & {label?: string}> = ({label = 'ACTION HERO', ...p}) => (
  <G {...p}>
    <rect x={-110} y={-70} width={220} height={160} rx={10} fill={C.blue} {...O} />
    <rect x={-110} y={-70} width={220} height={44} fill={C.yellow} {...O} strokeWidth={5} />
    <Text y={-46} size={28} color={C.ink}>{label}</Text>
    <circle cx={0} cy={30} r={38} fill="#F4D6B8" stroke={C.ink} strokeWidth={4} />
    <rect x={-30} y={60} width={60} height={50} fill={C.red} stroke={C.ink} strokeWidth={4} />
  </G>
);

export const Tablet: React.FC<P & {label?: string}> = ({label = 'WISH LIST', ...p}) => (
  <G {...p}>
    <rect x={-160} y={-220} width={320} height={220} rx={20} fill="#2E3440" {...O} />
    <rect x={-136} y={-196} width={272} height={172} rx={8} fill="#fff" />
    <Text y={-150} size={30} color={C.red}>{label}</Text>
    {['robot', 'skateboard', 'game', 'plushie'].map((t, i) => <Text key={t} y={-108 + i * 32} size={22} color="#5B6470">☆ {t}</Text>)}
  </G>
);

export const InterestGauge: React.FC<P & {pct: number}> = ({pct, ...p}) => {
  const a = -90 + Math.min(1, pct / 30) * 180;
  return (
    <G {...p}>
      <path d="M -160 20 A 160 160 0 0 1 160 20 Z" fill="#fff" {...O} />
      <path d="M -140 14 A 140 140 0 0 1 -50 -108" fill="none" stroke={C.green} strokeWidth={22} />
      <path d="M -50 -108 A 140 140 0 0 1 50 -108" fill="none" stroke={C.yellow} strokeWidth={22} />
      <path d="M 50 -108 A 140 140 0 0 1 140 14" fill="none" stroke={C.red} strokeWidth={22} />
      <g transform={`rotate(${a})`}><path d="M -8 0 L 0 -118 L 8 0 Z" fill={C.ink} /></g>
      <circle r={16} fill={C.ink} />
      <Text y={54} size={40}>{pct}%+</Text>
    </G>
  );
};
