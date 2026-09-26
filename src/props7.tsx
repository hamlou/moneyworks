import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Lemon: React.FC<P> = (p) => (
  <G {...p}>
    <ellipse rx={40} ry={30} fill="#FFE14D" {...O} strokeWidth={5} />
    <path d="M 36 -4 L 50 -8 L 44 4 Z" fill="#FFE14D" stroke={C.ink} strokeWidth={4} />
    <path d="M -14 -14 Q -4 -20 8 -16" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
  </G>
);

export const Stand: React.FC<P & {label?: string; big?: boolean}> = ({label = "DAVE'S LEMONADE", big, ...p}) => {
  const w = big ? 520 : 380;
  return (
    <G {...p}>
      <rect x={-w / 2} y={-200} width={w} height={200} fill="#F6E2C0" {...O} />
      <rect x={-w / 2 - 20} y={-230} width={w + 40} height={40} rx={8} fill="#FFE14D" {...O} />
      <line x1={-w / 2 + 20} y1={-230} x2={-w / 2 + 20} y2={-420} stroke={C.ink} strokeWidth={8} />
      <line x1={w / 2 - 20} y1={-230} x2={w / 2 - 20} y2={-420} stroke={C.ink} strokeWidth={8} />
      <path d={`M ${-w / 2 - 30} -420 L ${w / 2 + 30} -420 L ${w / 2 + 10} -360 L ${-w / 2 - 10} -360 Z`} fill={C.yellow} {...O} />
      {Array.from({length: 6}).map((_, i) => <path key={i} d={`M ${-w / 2 - 10 + i * ((w + 20) / 6)} -360 q ${(w + 20) / 12} 30 ${(w + 20) / 6} 0`} fill={i % 2 ? '#fff' : C.yellow} stroke={C.ink} strokeWidth={4} />)}
      <Text y={-120} size={big ? 40 : 30} color={C.ink}>{label}</Text>
      <g transform={`translate(${-w / 2 + 70},-250)`}>
        <path d="M -24 -60 L 24 -60 L 18 0 L -18 0 Z" fill="#FFF7B0" stroke={C.ink} strokeWidth={4} />
      </g>
      <Lemon x={w / 2 - 80} y={-255} s={0.8} />
      <Lemon x={w / 2 - 130} y={-255} s={0.8} />
    </G>
  );
};

export const Share: React.FC<P & {n?: string; owner?: string; color?: string}> = ({n = '1 SHARE', owner = 'DAVE LEMONADE CO.', color = C.green, ...p}) => (
  <G {...p}>
    <rect x={-160} y={-100} width={320} height={200} rx={10} fill="#FFFDF0" {...O} />
    <rect x={-145} y={-85} width={290} height={170} rx={6} fill="none" stroke={color} strokeWidth={4} strokeDasharray="10 6" />
    <Text y={-45} size={22} color="#5B6470" ls={2}>{owner}</Text>
    <Text y={10} size={42} color={color}>{n}</Text>
    <circle cx={100} cy={55} r={22} fill={C.gold} stroke={C.ink} strokeWidth={3} />
  </G>
);

export const Ticker: React.FC<P & {f: number; price: string; up?: boolean; name?: string}> = ({f, price, up = true, name = 'LMNDE', ...p}) => (
  <G {...p}>
    <rect x={-360} y={-140} width={720} height={280} rx={20} fill="#1F2A36" {...O} />
    <text x={-310} y={-60} fontFamily="monospace" fontWeight={700} fontSize={50} fill="#C9D6E6" dominantBaseline="middle">{name}</text>
    <text x={-310} y={30} fontFamily="monospace" fontWeight={700} fontSize={90} fill={up ? '#6EF0A8' : '#FF6B6B'} dominantBaseline="middle">{price}</text>
    <path d={up ? 'M 230 40 L 270 -20 L 310 40 Z' : 'M 230 -20 L 270 40 L 310 -20 Z'} fill={up ? '#6EF0A8' : '#FF6B6B'} />
    <rect x={-360} y={100} width={720} height={40} fill="#16202A" />
    <text x={((f * 4) % 1400) - 700} y={122} fontFamily="monospace" fontSize={24} fill="#8FA3B8" dominantBaseline="middle">LMNDE ▲ · JUICE ▼ · BANK ▲ · GOLD ▲ · BURGR ▲ · LMNDE ▲ · JUICE ▼</text>
  </G>
);

export const Thermo: React.FC<P & {level: number}> = ({level, ...p}) => (
  <G {...p}>
    <rect x={-26} y={-220} width={52} height={220} rx={26} fill="#fff" {...O} />
    <rect x={-12} y={-200 + 190 * (1 - level)} width={24} height={190 * level} rx={12} fill={C.red} />
    <circle cx={0} cy={20} r={44} fill={C.red} {...O} />
  </G>
);

export const Boxes: React.FC<P> = (p) => (
  <G {...p}>
    {[[-90, 0], [0, 0], [90, 0], [-45, -80], [45, -80], [0, -160]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x},${y})`}>
        <rect x={-40} y={-40} width={80} height={80} fill="#D9A15B" stroke={C.ink} strokeWidth={5} />
        <line x1={-40} y1={-10} x2={40} y2={-10} stroke="#B07A3E" strokeWidth={6} />
        <path d="M -16 14 Q 0 24 16 14" fill="none" stroke={C.ink} strokeWidth={3} />
      </g>
    ))}
  </G>
);

export const Factory: React.FC<P & {label?: string}> = ({label = 'MEGA JUICE', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-260} width={520} height={260} fill="#C9D1DA" {...O} />
    <path d="M -260 -260 L -180 -340 L -180 -260 L -100 -340 L -100 -260 L -20 -340 L -20 -260" fill="#B8C2CC" {...O} />
    <rect x={120} y={-420} width={60} height={160} fill="#9AA5B1" {...O} />
    <rect x={-220} y={-200} width={440} height={60} rx={8} fill={C.red} {...O} strokeWidth={5} />
    <text x={0} y={-168} fontFamily={FONT} fontWeight={700} fontSize={36} fill="#fff" textAnchor="middle" dominantBaseline="middle">{label}</text>
  </G>
);
