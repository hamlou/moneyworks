import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Lawnmower: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <line x1={60} y1={-30} x2={190} y2={-200} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={170} y1={-200} x2={220} y2={-190} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
    <path d="M -130 20 L -110 -50 Q -100 -70 -70 -70 L 80 -70 Q 110 -70 118 -40 L 130 20 Z" fill={C.red} {...O} />
    <rect x={-60} y={-110} width={90} height={44} rx={10} fill="#56606B" {...O} strokeWidth={5} />
    {[-90, 90].map((x) => (
      <g key={x} transform={`translate(${x},30) rotate(${f * 6})`}>
        <circle r={32} fill={C.ink} />
        <line x1={-18} y1={0} x2={18} y2={0} stroke="#ddd" strokeWidth={6} />
      </g>
    ))}
  </G>
);

export const IceCream: React.FC<P & {melt?: number}> = ({melt = 0, ...p}) => (
  <G {...p}>
    <path d="M -60 0 L 60 0 L 0 170 Z" fill="#E0A96D" {...O} />
    <path d="M -40 30 L 30 60 M -20 90 L 20 50 M -45 10 L 45 110" stroke="#B07A3E" strokeWidth={4} />
    <g transform={`translate(0,${melt * 30}) scale(1,${1 - melt * 0.45})`}>
      <path d="M -75 0 Q -90 -80 0 -100 Q 90 -80 75 0 Q 40 20 0 6 Q -40 20 -75 0 Z" fill="#F7B7C8" {...O} />
      <circle cx={10} cy={-110} r={16} fill={C.red} {...O} strokeWidth={4} />
    </g>
    {melt > 0 && (
      <g>
        <path d={`M -50 10 Q -56 ${40 + melt * 120} -44 ${50 + melt * 140} Q -34 ${40 + melt * 120} -40 10 Z`} fill="#F7B7C8" stroke={C.ink} strokeWidth={4} />
        <path d={`M 40 10 Q 36 ${30 + melt * 80} 46 ${40 + melt * 100} Q 56 ${30 + melt * 80} 52 10 Z`} fill="#F7B7C8" stroke={C.ink} strokeWidth={4} />
        <ellipse cx={0} cy={220} rx={40 + melt * 80} ry={10 + melt * 10} fill="#F7B7C8" stroke={C.ink} strokeWidth={4} />
      </g>
    )}
  </G>
);

export const TBill: React.FC<P & {label?: string}> = ({label = 'T-BILL', ...p}) => (
  <G {...p}>
    <rect x={-200} y={-120} width={400} height={240} rx={14} fill="#F3EBD3" {...O} />
    <rect x={-176} y={-96} width={352} height={192} rx={8} fill="none" stroke="#B89B5E" strokeWidth={5} strokeDasharray="14 8" />
    <Text y={-52} size={26} color="#8A6A3E" ls={4}>UNITED STATES TREASURY</Text>
    <Text y={4} size={58} color={C.navy}>{label}</Text>
    <circle cx={130} cy={60} r={30} fill={C.gold} {...O} strokeWidth={4} />
    <Text y={60} x={-50} size={26} color="#5B6470">4-52 weeks</Text>
  </G>
);

export const CandyBar: React.FC<P & {price?: string}> = ({price = '$1.50', ...p}) => (
  <G {...p}>
    <rect x={-150} y={-50} width={300} height={100} rx={14} fill="#7A4A2E" {...O} />
    <rect x={-90} y={-50} width={180} height={100} fill={C.red} {...O} />
    <path d="M -150 -50 L -176 -30 L -150 -10 L -176 10 L -150 30 L -176 50 M 150 -50 L 176 -30 L 150 -10 L 176 10 L 150 30 L 176 50" fill="none" stroke={C.ink} strokeWidth={5} />
    <Text y={2} size={40} color="#fff">CHOCO</Text>
    <g transform="translate(120,-90) rotate(10)">
      <rect x={-70} y={-30} width={140} height={60} rx={10} fill={C.yellow} {...O} strokeWidth={4} />
      <Text y={2} size={34}>{price}</Text>
    </g>
  </G>
);

export const Shoe: React.FC<P & {stretch?: number}> = ({stretch = 0, ...p}) => (
  <G {...p}>
    <path d="M -160 0 L -160 -90 Q -150 -120 -110 -110 L -40 -80 Q 60 -60 140 -30 Q 170 -16 160 0 Z" fill={C.blue} {...O} />
    <rect x={-165} y={0} width={335} height={26} rx={10} fill="#fff" {...O} strokeWidth={5} />
    <path d={`M -20 26 Q -30 ${60 + stretch * 60} -40 ${100 + stretch * 90} M 30 26 Q 40 ${60 + stretch * 60} 50 ${100 + stretch * 90}`} fill="none" stroke="#FF8FB8" strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={5} cy={112 + stretch * 90} rx={90} ry={16} fill="#FF8FB8" stroke={C.ink} strokeWidth={4} />
  </G>
);

export const Lock: React.FC<P & {open?: number; color?: string}> = ({open = 0, color = C.gold, ...p}) => (
  <G {...p}>
    <path d={`M -44 -20 L -44 -70 Q -44 -120 0 -120 Q 44 -120 44 -70 L 44 ${-20 - open * 40}`} fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
    <rect x={-70} y={-30} width={140} height={110} rx={16} fill={color} {...O} />
    <circle cx={0} cy={16} r={12} fill={C.ink} />
    <rect x={-5} y={16} width={10} height={32} fill={C.ink} />
  </G>
);

export const Gym: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-150} y={-90} width={300} height={180} rx={18} fill={C.navy} {...O} />
    <Text y={-44} size={32} color="#fff" ls={4}>GYM CONTRACT</Text>
    <rect x={-110} y={0} width={60} height={20} rx={6} fill="#fff" />
    <rect x={50} y={0} width={60} height={20} rx={6} fill="#fff" />
    <rect x={-50} y={5} width={100} height={10} fill="#fff" />
    <Text y={60} size={26} color={C.yellow}>12 months · no exit</Text>
  </G>
);
