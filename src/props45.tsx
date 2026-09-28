import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Treadmill: React.FC<P & {f?: number; running?: boolean}> = ({f = 0, running = false, ...p}) => {
  const belt = running ? (f * 6) % 40 : 0;
  return (
    <G {...p}>
      <rect x={-170} y={20} width={340} height={26} rx={10} fill="#B8C2CC" {...O} strokeWidth={5} />
      <rect x={140} y={-140} width={26} height={170} rx={10} fill="#9AA5B1" {...O} strokeWidth={5} />
      <rect x={100} y={-160} width={90} height={40} rx={8} fill="#2E3440" {...O} strokeWidth={5} />
      <rect x={-160} y={-14} width={300} height={34} rx={14} fill="#3B444F" {...O} />
      <clipPath id="beltclip"><rect x={-158} y={-13} width={296} height={32} rx={12} /></clipPath>
      <g clipPath="url(#beltclip)">
        {Array.from({length: 10}).map((_, i) => (
          <rect key={i} x={-200 + i * 40 + belt} y={-13} width={20} height={32} fill="#4B5560" />
        ))}
      </g>
      <circle cx={-90} cy={44} r={20} fill={C.ink} />
      <circle cx={90} cy={44} r={20} fill={C.ink} />
    </G>
  );
};

export const Dumbbell: React.FC<P & {color?: string}> = ({color = '#3B444F', ...p}) => (
  <G {...p}>
    <rect x={-70} y={-14} width={140} height={28} rx={10} fill="#8E99A5" {...O} strokeWidth={5} />
    {[-96, 96].map((x) => (
      <g key={x}>
        <rect x={x - 22} y={-46} width={44} height={92} rx={10} fill={color} {...O} strokeWidth={5} />
        <rect x={x - 14} y={-30} width={28} height={60} rx={8} fill={color} {...O} strokeWidth={4} opacity={0.6} />
      </g>
    ))}
  </G>
);

export const CapacityDots: React.FC<P & {total: number; filled: number; cols?: number}> = ({total, filled, cols = 12, ...p}) => (
  <G {...p}>
    {Array.from({length: total}).map((_, i) => (
      <circle key={i} cx={(i % cols) * 34 - ((cols - 1) * 34) / 2} cy={Math.floor(i / cols) * 34} r={12} fill={i < filled ? C.red : '#E3DCC9'} stroke={C.ink} strokeWidth={3} />
    ))}
  </G>
);

export const Labyrinth: React.FC<P & {t?: number}> = ({t = 1, ...p}) => (
  <G {...p}>
    <rect x={-260} y={-200} width={520} height={400} rx={18} fill="#fff" {...O} />
    <path
      d="M -220 -160 L -220 140 L -140 140 L -140 -80 L -60 -80 L -60 100 L 20 100 L 20 -140 L 100 -140 L 100 60 L 200 60"
      fill="none"
      stroke="#C9CED6"
      strokeWidth={40}
      strokeLinecap="square"
    />
    <path
      d={`M -220 -160 L -220 ${140 - (1 - t) * 300} L -140 ${140 - (1 - t) * 300}`}
      fill="none"
      stroke={C.red}
      strokeWidth={10}
      strokeLinecap="round"
      strokeDasharray="1 1"
      pathLength={1}
      strokeDashoffset={1 - Math.min(1, t * 3)}
      opacity={Math.min(1, t * 3)}
    />
  </G>
);
