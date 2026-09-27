import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

const Wheel: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 34}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={C.ink} />
    <circle cx={x} cy={y} r={r * 0.42} fill="#ddd" />
  </g>
);

export const Suv: React.FC<P & {color?: string; tag?: string}> = ({color = '#2A9D8F', tag, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={56} rx={210} ry={14} fill="rgba(35,35,43,0.12)" />
    <path d="M -190 36 L -190 -30 Q -188 -50 -166 -54 L -130 -60 L -100 -130 Q -94 -142 -76 -142 L 110 -142 Q 128 -142 136 -128 L 164 -60 L 176 -56 Q 194 -50 194 -30 L 194 36 Z" fill={color} {...O} />
    <path d="M -86 -124 L -10 -124 L -10 -68 L -112 -68 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
    <path d="M 6 -124 L 104 -124 L 124 -68 L 6 -68 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
    <rect x={-60} y={-160} width={150} height={14} rx={6} fill="#777" {...O} strokeWidth={4} />
    <circle cx={180} cy={-30} r={9} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
    <Wheel x={-112} y={38} r={38} />
    <Wheel x={118} y={38} r={38} />
    {tag && (
      <g transform="translate(40,-30) rotate(-4)">
        <rect x={-80} y={-26} width={160} height={52} rx={8} fill={C.yellow} {...O} strokeWidth={4} />
        <Text y={2} size={30}>{tag}</Text>
      </g>
    )}
  </G>
);

export const Pickup: React.FC<P & {color?: string; tag?: string}> = ({color = C.red, tag, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={58} rx={250} ry={14} fill="rgba(35,35,43,0.12)" />
    <path d="M -240 40 L -240 -46 L -40 -46 L -40 -140 Q -38 -150 -24 -150 L 90 -150 Q 106 -150 116 -136 L 160 -66 L 214 -58 Q 238 -52 238 -30 L 238 40 Z" fill={color} {...O} />
    <path d="M -20 -130 L 60 -130 L 60 -72 L -20 -72 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
    <path d="M 76 -130 L 100 -130 L 138 -72 L 76 -72 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
    <line x1={-230} y1={-20} x2={-50} y2={-20} stroke={C.ink} strokeWidth={4} opacity={0.4} />
    <circle cx={226} cy={-32} r={9} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
    <Wheel x={-150} y={42} r={42} />
    <Wheel x={150} y={42} r={42} />
    {tag && (
      <g transform="translate(-140,-90) rotate(-5)">
        <rect x={-100} y={-30} width={200} height={60} rx={8} fill={C.yellow} {...O} strokeWidth={4} />
        <Text y={2} size={34}>{tag}</Text>
      </g>
    )}
  </G>
);

export const Microchip: React.FC<P & {label?: string}> = ({label = 'CHIP', ...p}) => (
  <G {...p}>
    {[-60, -20, 20, 60].map((k) => (
      <g key={k}>
        <rect x={k - 8} y={-120} width={16} height={36} fill="#C9CED6" stroke={C.ink} strokeWidth={4} />
        <rect x={k - 8} y={84} width={16} height={36} fill="#C9CED6" stroke={C.ink} strokeWidth={4} />
        <rect x={-120} y={k - 8} width={36} height={16} fill="#C9CED6" stroke={C.ink} strokeWidth={4} />
        <rect x={84} y={k - 8} width={36} height={16} fill="#C9CED6" stroke={C.ink} strokeWidth={4} />
      </g>
    ))}
    <rect x={-92} y={-92} width={184} height={184} rx={14} fill="#2E3440" {...O} />
    <rect x={-56} y={-56} width={112} height={112} rx={8} fill="none" stroke="#6EF0A8" strokeWidth={4} />
    <Text y={2} size={30} color="#6EF0A8">{label}</Text>
  </G>
);

export const SlicedPizza: React.FC<P & {n?: number; hl?: number}> = ({n = 8, hl = -1, ...p}) => (
  <G {...p}>
    <circle r={210} fill="#E9B872" {...O} />
    <circle r={186} fill="#F4C95D" stroke={C.ink} strokeWidth={4} />
    {Array.from({length: n}).map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 186} y2={Math.sin(a) * 186} stroke={C.ink} strokeWidth={n > 12 ? 3 : 4} />;
    })}
    {hl >= 0 && (() => {
      const a0 = (hl / n) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((hl + 1) / n) * Math.PI * 2 - Math.PI / 2;
      return <path d={`M 0 0 L ${Math.cos(a0) * 186} ${Math.sin(a0) * 186} A 186 186 0 0 1 ${Math.cos(a1) * 186} ${Math.sin(a1) * 186} Z`} fill={C.yellow} stroke={C.red} strokeWidth={6} />;
    })()}
    {[[-80, -60], [70, -90], [30, 60], [-60, 90], [110, 40], [-120, 10]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={18} fill="#D1495B" stroke={C.ink} strokeWidth={3} />
    ))}
  </G>
);

export const Backpack: React.FC<P & {label?: string; color?: string}> = ({label, color = '#8E6CCF', ...p}) => (
  <G {...p}>
    <path d="M -50 -130 Q -50 -170 0 -170 Q 50 -170 50 -130" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
    <rect x={-110} y={-140} width={220} height={260} rx={50} fill={color} {...O} />
    <rect x={-80} y={10} width={160} height={90} rx={20} fill="#fff" opacity={0.25} stroke={C.ink} strokeWidth={4} />
    {label && <Text y={-50} size={label.length > 7 ? 32 : 40} color="#fff" stroke={C.ink} sw={5}>{label}</Text>}
  </G>
);

export const TowTruck: React.FC<P & {lift?: number}> = ({lift = 0, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={58} rx={230} ry={14} fill="rgba(35,35,43,0.12)" />
    <path d="M -40 40 L -40 -120 Q -38 -130 -24 -130 L 80 -130 Q 96 -130 104 -116 L 140 -50 L 200 -44 Q 220 -38 220 -20 L 220 40 Z" fill={C.yellow} {...O} />
    <path d="M -20 -112 L 70 -112 L 104 -60 L -20 -60 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
    <rect x={-230} y={-10} width={200} height={50} fill="#9AA5B1" {...O} />
    <g transform={`rotate(${-18 - lift * 10}, -40, -30)`}>
      <line x1={-40} y1={-30} x2={-230} y2={-110} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
    </g>
    <line x1={-228} y1={-104} x2={-240} y2={-20 + (1 - lift) * 20} stroke={C.ink} strokeWidth={5} />
    <rect x={-10} y={-160} width={60} height={24} rx={8} fill={C.red} {...O} strokeWidth={4} />
    <Wheel x={-150} y={42} r={36} />
    <Wheel x={140} y={42} r={36} />
  </G>
);

export const FishingRod: React.FC<P & {f?: number; bait?: React.ReactNode}> = ({f = 0, bait, ...p}) => {
  const bob = Math.sin(f / 10) * 10;
  return (
    <G {...p}>
      <path d="M -40 300 L 260 -200" stroke="#8C5A33" strokeWidth={16} strokeLinecap="round" />
      <circle cx={-10} cy={250} r={24} fill="#C9CED6" {...O} strokeWidth={5} />
      <line x1={260} y1={-200} x2={300} y2={60 + bob} stroke={C.ink} strokeWidth={3} />
      <path d={`M 300 ${60 + bob} q 0 30 -20 30`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <g transform={`translate(300,${150 + bob})`}>{bait}</g>
    </G>
  );
};

export const Dealership: React.FC<P & {f?: number; name?: string}> = ({f = 0, name = 'BIG DEALS AUTO', ...p}) => (
  <G {...p}>
    <rect x={-420} y={-360} width={840} height={360} fill="#F4F0E6" {...O} />
    <rect x={-380} y={-300} width={760} height={230} rx={8} fill="#CFE8F5" {...O} strokeWidth={5} />
    {[-190, 0, 190].map((x) => <line key={x} x1={x} y1={-300} x2={x} y2={-70} stroke={C.ink} strokeWidth={4} />)}
    <rect x={-440} y={-430} width={880} height={80} rx={12} fill={C.navy} {...O} />
    <Text y={-388} size={48} color="#fff" ls={6}>{name}</Text>
    {Array.from({length: 11}).map((_, i) => (
      <path key={i} d={`M ${-420 + i * 80} -350 l 40 ${40 + Math.sin(f / 6 + i) * 4} l 40 ${-40 - Math.sin(f / 6 + i) * 4} Z`} fill={[C.red, C.yellow, C.blue][i % 3]} stroke={C.ink} strokeWidth={3} />
    ))}
  </G>
);

export const Sticker: React.FC<P & {title?: string; value: string; color?: string; sub?: string}> = ({title = 'PRICE', value, color = C.ink, sub, ...p}) => (
  <G {...p}>
    <rect x={-250 + 10} y={-150 + 12} width={500} height={300} rx={20} fill="rgba(35,35,43,0.14)" />
    <rect x={-250} y={-150} width={500} height={300} rx={20} fill="#fff" {...O} />
    <rect x={-250} y={-150} width={500} height={70} rx={20} fill={C.navy} {...O} />
    <Text y={-114} size={32} color="#fff" ls={4}>{title}</Text>
    <Text y={sub ? 0 : 20} size={Math.min(96, 900 / Math.max(4, value.length))} color={color}>{value}</Text>
    {sub && <Text y={90} size={32} color="#5B6470" font={FONT}>{sub}</Text>}
  </G>
);

export const Hand: React.FC<{x: number; y: number; size?: number; color?: string; r?: number; children: React.ReactNode}> = ({x, y, size = 52, color = C.ink, r = 0, children}) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}>
    <text fontFamily={HAND} fontWeight={700} fontSize={size} fill={color} textAnchor="middle" dominantBaseline="middle">{children}</text>
  </g>
);
