import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const RenewalLetter: React.FC<P & {old?: string; now?: string; hl?: number; title?: string}> = ({old = '$1,800', now = '?', hl = 0, title = 'POLICY RENEWAL', ...p}) => (
  <G {...p}>
    <rect x={-230} y={-300} width={460} height={600} rx={16} fill="#fff" {...O} />
    <rect x={-230} y={-300} width={460} height={90} rx={16} fill={C.navy} {...O} />
    <Text y={-250} size={34} color="#fff" ls={2}>{title}</Text>
    {[0, 1, 2].map((i) => <rect key={i} x={-180} y={-180 + i * 40} width={i === 1 ? 260 : 340} height={16} rx={8} fill="#E3E8EE" />)}
    <Text x={-180} y={-20} size={32} anchor="start" color="#5B6470">last year</Text>
    <Text x={180} y={-20} size={40} anchor="end">{old}</Text>
    <rect x={-200} y={30} width={400} height={110} rx={14} fill={hl ? '#FDE3EA' : '#F4F6F8'} stroke={hl ? C.red : '#C9CED6'} strokeWidth={5} />
    <Text x={-180} y={90} size={32} anchor="start" color="#5B6470">this year</Text>
    <Text x={180} y={92} size={54} anchor="end" color={hl ? C.red : C.ink}>{now}</Text>
    {[0, 1].map((i) => <rect key={i} x={-180} y={190 + i * 40} width={i ? 200 : 340} height={16} rx={8} fill="#E3E8EE" />)}
  </G>
);

export const Radar: React.FC<P & {glow?: number; label?: string}> = ({glow = 0, label, ...p}) => (
  <G {...p}>
    <rect x={-90} y={-70} width={180} height={140} rx={24} fill="#2E3440" {...O} />
    <circle r={46} fill="#3B4252" stroke={C.ink} strokeWidth={4} />
    {[16, 30, 44].map((r) => <circle key={r} r={r} fill="none" stroke="#6EF0A8" strokeWidth={4} opacity={0.35 + glow * 0.65} />)}
    <circle r={8} fill="#6EF0A8" />
    {[-60, 60].map((x) => <circle key={x} cx={x} cy={-50} r={6} fill="#9AA5B1" />)}
    {label && <Text y={120} size={34}>{label}</Text>}
  </G>
);

export const Cookie: React.FC<P> = (p) => (
  <G {...p}>
    <circle r={70} fill="#D9A45B" {...O} />
    {[[-30, -20], [20, -30], [10, 20], [-20, 30], [36, 10]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill="#5A3A22" />)}
  </G>
);

export const Windshield: React.FC<P & {crack?: number; cam?: number}> = ({crack = 0, cam = 1, ...p}) => (
  <G {...p}>
    <path d="M -300 120 L -230 -140 Q -220 -170 -190 -170 L 190 -170 Q 220 -170 230 -140 L 300 120 Z" fill="#CFE8F5" {...O} />
    <path d="M -180 -120 L -120 -120 L -200 80" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
    {cam > 0 && (
      <g transform="translate(0,-130)">
        <rect x={-50} y={-26} width={100} height={52} rx={10} fill="#2E3440" stroke={C.ink} strokeWidth={4} />
        <circle r={16} fill="#8FD3F5" stroke={C.ink} strokeWidth={3} />
      </g>
    )}
    {crack > 0 && <path d="M 80 20 L 40 -30 L 70 -60 M 80 20 L 140 -10 L 170 -60 M 80 20 L 100 80 M 80 20 L 20 50" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" opacity={crack} />}
  </G>
);

export const Lobster: React.FC<P> = (p) => (
  <G {...p}>
    <ellipse rx={150} ry={50} fill="#fff" {...O} strokeWidth={5} />
    <ellipse cx={-10} cy={-10} rx={90} ry={34} fill={C.red} {...O} strokeWidth={5} />
    {[-1, 1].map((k) => <circle key={k} cx={70} cy={-10 + k * 34} r={22} fill={C.red} stroke={C.ink} strokeWidth={4} />)}
    <path d="M -100 -10 L -130 -30 L -130 10 Z" fill={C.red} stroke={C.ink} strokeWidth={4} />
    <circle cx={40} cy={-22} r={5} fill={C.ink} />
  </G>
);

export const Salad: React.FC<P> = (p) => (
  <G {...p}>
    <ellipse rx={130} ry={44} fill="#fff" {...O} strokeWidth={5} />
    {[[-50, -14], [-10, -24], [30, -16], [60, -6], [-30, 4]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={34} ry={18} fill={i % 2 ? '#7BC96F' : '#4E9F3D'} stroke={C.ink} strokeWidth={3} />)}
    <circle cx={10} cy={-8} r={10} fill={C.red} />
  </G>
);

export const Hailstone: React.FC<P> = (p) => (
  <G {...p}>
    <circle r={34} fill="#F4FAFD" {...O} strokeWidth={5} />
    <path d="M -12 -14 Q 0 -20 10 -10" fill="none" stroke="#BFD9E6" strokeWidth={5} strokeLinecap="round" />
  </G>
);

export const MapPin: React.FC<P & {color?: string; label?: string}> = ({color = C.red, label, ...p}) => (
  <G {...p}>
    <path d="M 0 0 Q -60 -70 -60 -110 A 60 60 0 1 1 60 -110 Q 60 -70 0 0 Z" fill={color} {...O} strokeWidth={5} />
    <circle cy={-112} r={22} fill="#fff" stroke={C.ink} strokeWidth={4} />
    {label && <Text y={50} size={34}>{label}</Text>}
  </G>
);

export const Gavel37: React.FC<P & {hit?: number}> = ({hit = 0, ...p}) => (
  <G {...p}>
    <rect x={-120} y={60} width={240} height={40} rx={10} fill="#8C5A33" {...O} strokeWidth={5} />
    <g transform={`rotate(${-30 + hit * 30} 60 40)`}>
      <rect x={-20} y={-160} width={40} height={220} rx={10} fill="#B07A4B" {...O} strokeWidth={5} transform="rotate(-50)" />
      <rect x={-90} y={-60} width={180} height={80} rx={16} fill="#8C5A33" {...O} strokeWidth={5} />
    </g>
  </G>
);

export const CoffeeSign: React.FC<P & {a?: string; b?: string; hl?: number}> = ({a = 'NEW CUSTOMERS  $3', b = 'REGULARS  $4', hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-260} y={-130} width={520} height={260} rx={18} fill="#2F3A33" {...O} />
    <Text y={-70} size={34} color="#fff" ls={2}>TODAY'S PRICES</Text>
    <Text y={0} size={38} color="#B5F0C0">{a}</Text>
    <Text y={70} size={38} color={hl ? '#FF8FA3' : '#fff'}>{b}</Text>
  </G>
);
