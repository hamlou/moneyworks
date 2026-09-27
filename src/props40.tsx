import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const Pill: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <circle r={70} fill="#fff" {...O} />
    <line x1={-50} y1={0} x2={50} y2={0} stroke="#C9CED6" strokeWidth={8} strokeLinecap="round" />
    {label && <Text y={120} size={36}>{label}</Text>}
  </G>
);

export const PillBottle: React.FC<P & {label?: string; price?: string}> = ({label = 'ASPIRIN', price, ...p}) => (
  <G {...p}>
    <rect x={-80} y={-200} width={160} height={50} rx={10} fill="#fff" {...O} />
    <rect x={-100} y={-150} width={200} height={260} rx={24} fill="#F2A65A" {...O} />
    <rect x={-80} y={-100} width={160} height={120} rx={10} fill="#fff" {...O} strokeWidth={4} />
    <Text y={-58} size={28}>{label}</Text>
    <Text y={-20} size={22} color="#5B6470">100 tablets</Text>
    {price && <Text y={70} size={40} color="#fff" stroke={C.ink} sw={4}>{price}</Text>}
  </G>
);

export const Hospital: React.FC<P & {name?: string; color?: string}> = ({name = 'HOSPITAL', color = '#F4F6FA', ...p}) => (
  <G {...p}>
    <rect x={-300} y={-420} width={600} height={420} fill={color} {...O} />
    <rect x={-340} y={-450} width={680} height={50} rx={10} fill="#DDE3EA" {...O} />
    <rect x={-40} y={-560} width={80} height={110} fill="#fff" {...O} />
    <rect x={-12} y={-545} width={24} height={80} fill={C.red} />
    <rect x={-35} y={-517} width={70} height={24} fill={C.red} />
    {[-200, -70, 70, 200].map((x) => [-360, -250].map((y) => <rect key={`${x}${y}`} x={x - 40} y={y} width={80} height={70} rx={6} fill="#CFE8F5" stroke={C.ink} strokeWidth={4} />))}
    <rect x={-70} y={-130} width={140} height={130} fill="#9AA5B1" {...O} strokeWidth={5} />
    <Text y={-170} size={40} ls={4}>{name}</Text>
  </G>
);

export const HotelDoor: React.FC<P & {price?: string; lit?: number}> = ({price = '$599 / night', lit = 1, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-300} width={340} height={600} rx={10} fill="#A8744A" {...O} />
    <rect x={-130} y={-260} width={260} height={220} rx={8} fill="none" stroke="#7A4B2A" strokeWidth={6} />
    <circle cx={120} cy={40} r={16} fill={C.gold} stroke={C.ink} strokeWidth={4} />
    <g opacity={lit}>
      <rect x={-120} y={-10} width={200} height={130} rx={8} fill="#fff" {...O} strokeWidth={4} />
      <Text x={-20} y={30} size={20} color="#5B6470">MAX RATE</Text>
      <Text x={-20} y={76} size={32} color={C.red}>{price}</Text>
    </g>
  </G>
);

export const TShirt: React.FC<P & {color?: string; tag?: string}> = ({color = C.blue, tag, ...p}) => (
  <G {...p}>
    <path d="M -60 -120 L -150 -80 L -190 0 L -120 20 L -110 -20 L -110 140 L 110 140 L 110 -20 L 120 20 L 190 0 L 150 -80 L 60 -120 Q 0 -80 -60 -120 Z" fill={color} {...O} />
    {tag && (
      <g transform="translate(60,40) rotate(8)">
        <rect x={-70} y={-30} width={140} height={60} rx={8} fill={C.yellow} {...O} strokeWidth={4} />
        <Text y={2} size={30}>{tag}</Text>
      </g>
    )}
  </G>
);

export const Gate: React.FC<P & {open?: number; label?: string}> = ({open = 0, label, ...p}) => (
  <G {...p}>
    <rect x={-240} y={-320} width={40} height={320} fill="#5B6470" {...O} />
    <rect x={200} y={-320} width={40} height={320} fill="#5B6470" {...O} />
    <g transform={`translate(-200,0) scale(${1 - open * 0.85},1)`}>
      <rect x={0} y={-280} width={400} height={260} fill="none" stroke={C.ink} strokeWidth={8} />
      {Array.from({length: 7}).map((_, i) => <line key={i} x1={i * 57 + 28} y1={-280} x2={i * 57 + 28} y2={-20} stroke={C.ink} strokeWidth={8} />)}
      <rect x={150} y={-190} width={100} height={80} rx={10} fill={C.gold} {...O} strokeWidth={4} />
    </g>
    {label && <Text y={-360} size={40}>{label}</Text>}
  </G>
);

export const Ambulance: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={58} rx={250} ry={14} fill="rgba(35,35,43,0.12)" />
    <path d="M -240 40 L -240 -170 L 100 -170 L 100 -110 L 180 -110 L 240 -40 L 240 40 Z" fill="#fff" {...O} />
    <path d="M 118 -95 L 175 -95 L 215 -45 L 118 -45 Z" fill="#CFE8F5" {...O} strokeWidth={4} />
    <rect x={-240} y={-40} width={480} height={24} fill={C.red} />
    <rect x={-100} y={-150} width={40} height={100} fill={C.red} />
    <rect x={-130} y={-120} width={100} height={40} fill={C.red} />
    <rect x={-40} y={-200} width={60} height={30} rx={8} fill={Math.floor(f / 8) % 2 ? C.red : C.blue} {...O} strokeWidth={4} />
    {[-150, 150].map((x) => <g key={x}><circle cx={x} cy={42} r={38} fill={C.ink} /><circle cx={x} cy={42} r={16} fill="#ddd" /></g>)}
  </G>
);

export const MarketStall: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-300} y={-40} width={600} height={140} fill="#C98F5E" {...O} />
    {[-260, 260].map((x) => <rect key={x} x={x - 12} y={-360} width={24} height={330} fill="#A8744A" {...O} strokeWidth={4} />)}
    {Array.from({length: 6}).map((_, i) => (
      <path key={i} d={`M ${-320 + i * 107} -360 L ${-213 + i * 107} -360 L ${-213 + i * 107} -300 Q ${-266 + i * 107} -260 ${-320 + i * 107} -300 Z`} fill={i % 2 ? '#fff' : C.red} {...O} strokeWidth={4} />
    ))}
  </G>
);
