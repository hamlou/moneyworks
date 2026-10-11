import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

// Dave's kayak (running gag). About 560 px long at s=1, centred.
export const Kayak: React.FC<P & {color?: string; tag?: string}> = ({color = C.yellow, tag, ...p}) => (
  <G {...p}>
    <path d="M -280 0 Q -140 -52 0 -52 Q 140 -52 280 0 Q 140 52 0 52 Q -140 52 -280 0 Z" fill={color} {...O} />
    <ellipse cx={0} cy={0} rx={86} ry={30} fill="#2E3440" {...O} />
    <path d="M -230 0 L -120 0 M 120 0 L 230 0" stroke={C.ink} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
    <line x1={-150} y1={-74} x2={150} y2={74} stroke={C.woodDark} strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={-168} cy={-83} rx={34} ry={16} fill={C.red} {...O} transform="rotate(26 -168 -83)" />
    <ellipse cx={168} cy={83} rx={34} ry={16} fill={C.red} {...O} transform="rotate(26 168 83)" />
    {tag ? (
      <g transform="translate(200,-70) rotate(8)">
        <rect x={-74} y={-30} width={148} height={60} rx={10} fill="#fff" {...O} strokeWidth={4} />
        <Text y={2} size={30} color={C.red}>{tag}</Text>
      </g>
    ) : null}
  </G>
);

export const Toaster: React.FC<P & {toast?: number}> = ({toast = 0, ...p}) => (
  <G {...p}>
    <rect x={-52} y={-150 - toast * 40} width={44} height={90} rx={8} fill="#E0A458" {...O} strokeWidth={5} />
    <rect x={8} y={-150 - toast * 40} width={44} height={90} rx={8} fill="#E0A458" {...O} strokeWidth={5} />
    <rect x={-110} y={-90} width={220} height={150} rx={30} fill="#D7DEE5" {...O} />
    <rect x={-70} y={-78} width={140} height={14} rx={7} fill="#2E3440" />
    <rect x={96} y={-40} width={30} height={22} rx={6} fill={C.ink} />
    <circle cx={-60} cy={20} r={14} fill={C.red} {...O} strokeWidth={4} />
    <line x1={-80} y1={60} x2={-80} y2={74} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <line x1={80} y1={60} x2={80} y2={74} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
  </G>
);

// Airport sign-up booth with a banner.
export const Booth: React.FC<P & {top?: string; big?: string}> = ({top = 'FREE FLIGHT!', big = '60,000 PTS', ...p}) => (
  <G {...p}>
    <line x1={-200} y1={-330} x2={-200} y2={0} stroke={C.ink} strokeWidth={10} />
    <line x1={200} y1={-330} x2={200} y2={0} stroke={C.ink} strokeWidth={10} />
    <rect x={-230} y={-420} width={460} height={120} rx={16} fill={C.red} {...O} />
    <Text y={-358} size={56} color="#fff" ls={2}>{top}</Text>
    <rect x={-220} y={-150} width={440} height={150} rx={12} fill={C.navy} {...O} />
    <Text y={-74} size={54} color={C.yellow}>{big}</Text>
  </G>
);

export const Teddy: React.FC<P> = (p) => (
  <G {...p}>
    <circle cx={-66} cy={-150} r={30} fill="#B7814F" {...O} />
    <circle cx={66} cy={-150} r={30} fill="#B7814F" {...O} />
    <ellipse cx={0} cy={40} rx={100} ry={110} fill="#C9935F" {...O} />
    <circle cx={0} cy={-100} r={84} fill="#C9935F" {...O} />
    <ellipse cx={0} cy={50} rx={56} ry={64} fill="#E8C9A0" />
    <ellipse cx={0} cy={-78} rx={34} ry={26} fill="#E8C9A0" />
    <circle cx={-30} cy={-116} r={8} fill={C.ink} />
    <circle cx={30} cy={-116} r={8} fill={C.ink} />
    <ellipse cx={0} cy={-88} rx={12} ry={8} fill={C.ink} />
    <ellipse cx={-106} cy={10} rx={30} ry={50} fill="#C9935F" {...O} transform="rotate(24 -106 10)" />
    <ellipse cx={106} cy={10} rx={30} ry={50} fill="#C9935F" {...O} transform="rotate(-24 106 10)" />
    <ellipse cx={-56} cy={140} rx={40} ry={30} fill="#C9935F" {...O} />
    <ellipse cx={56} cy={140} rx={40} ry={30} fill="#C9935F" {...O} />
  </G>
);

// A simple white card with a shadow, centred.
export const Panel: React.FC<P & {w: number; h: number; fill?: string}> = ({w, h, fill = '#fff', children, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} {...O} />
    {children}
  </G>
);

// Arcade style prize sign.
export const PrizeSign: React.FC<P & {n: string; hot?: boolean}> = ({n, hot, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-70} width={340} height={140} rx={16} fill={hot ? C.red : C.yellow} {...O} />
    <Text y={-28} size={30} color={hot ? '#fff' : C.ink}>TEDDY BEAR</Text>
    <Text y={24} size={50} color={hot ? '#fff' : C.ink}>{n}</Text>
  </G>
);
