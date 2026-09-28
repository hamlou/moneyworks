import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const SwipeCard: React.FC<P & {name?: string; sub?: string; tilt?: number}> = ({name = 'JAMIE, 29', sub = '2 mi away', tilt = 0, ...p}) => (
  <G {...p} r={(p.r ?? 0) + tilt}>
    <rect x={-160} y={-260} width={320} height={30} rx={0} fill="none" />
    <rect x={-170} y={-260} width={340} height={480} rx={26} fill="#fff" {...O} />
    <rect x={-170} y={-260} width={340} height={340} rx={26} fill="#E6DCC8" />
    <circle cx={0} cy={-140} r={80} fill="#D8CDB8" stroke={C.ink} strokeWidth={5} />
    <path d="M -40 -110 Q 0 -70 40 -110" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    <Text y={104} size={34}>{name}</Text>
    <Text y={148} size={24} color="#5B6470">{sub}</Text>
  </G>
);

export const DatingPhone: React.FC<P & {children?: React.ReactNode}> = ({children, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-400} width={440} height={800} rx={56} fill="#2E3440" {...O} />
    <rect x={-190} y={-364} width={380} height={728} rx={24} fill="#FBF6EC" />
    <rect x={-190} y={-364} width={380} height={70} rx={24} fill={C.red} />
    <rect x={-190} y={-320} width={380} height={26} fill={C.red} />
    <Text y={-330} size={30} color="#fff" ls={2}>DAVE'S APP</Text>
    {children}
    <rect x={-40} y={318} width={80} height={10} rx={5} fill="#7B8794" />
  </G>
);

export const XHeartBtns: React.FC<P & {hit?: 'x' | 'heart' | null}> = ({hit, ...p}) => (
  <G {...p}>
    <circle cx={-90} cy={0} r={54} fill={hit === 'x' ? '#FFE3EA' : '#fff'} stroke={C.red} strokeWidth={6} />
    <path d="M -114 -24 L -66 24 M -66 -24 L -114 24" stroke={C.red} strokeWidth={10} strokeLinecap="round" />
    <circle cx={90} cy={0} r={54} fill={hit === 'heart' ? '#DFF5E6' : '#fff'} stroke={C.green} strokeWidth={6} />
    <path d="M 90 26 Q 50 -4 64 -28 Q 78 -46 90 -30 Q 102 -46 116 -28 Q 130 -4 90 26 Z" fill={C.green} />
  </G>
);

export const AppIcon: React.FC<P & {name: string; color: string}> = ({name, color, ...p}) => (
  <G {...p}>
    <rect x={-56} y={-56} width={112} height={112} rx={28} fill={color} {...O} strokeWidth={5} />
    <Text y={6} size={30} color="#fff">{name[0]}</Text>
    <Text y={90} size={26}>{name}</Text>
  </G>
);

export const UmbrellaOwner: React.FC<P & {label?: string}> = ({label = 'MATCH GROUP', ...p}) => (
  <G {...p}>
    <path d="M -300 0 Q 0 -230 300 0 Q 220 -40 150 0 Q 75 -50 0 0 Q -75 -50 -150 0 Q -220 -40 -300 0 Z" fill={C.navy} {...O} />
    <line x1={0} y1={0} x2={0} y2={140} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <Text y={-70} size={32} color="#fff" ls={2}>{label}</Text>
  </G>
);

export const SlotMachine: React.FC<P & {spin?: number; win?: boolean}> = ({spin = 0, win = false, ...p}) => {
  const syms = ['♥', '✕', '★', '♥', '✕'];
  const idx = Math.floor(spin) % syms.length;
  return (
    <G {...p}>
      <rect x={-160} y={-200} width={320} height={340} rx={20} fill="#C0392B" {...O} />
      <rect x={-130} y={-160} width={260} height={140} rx={10} fill="#fff" {...O} strokeWidth={5} />
      {[-80, 0, 80].map((x, i) => (
        <Text key={i} x={x} y={-90} size={64} color={win ? C.green : C.ink}>{win ? '♥' : syms[(idx + i) % syms.length]}</Text>
      ))}
      <rect x={-40} y={20} width={80} height={70} rx={14} fill={C.yellow} {...O} strokeWidth={5} />
      <Text y={62} size={30}>PULL</Text>
      <rect x={130} y={-140} width={26} height={140} rx={12} fill="#9AA5B1" {...O} strokeWidth={5} />
    </G>
  );
};

export const PaywallLock: React.FC<P & {label: string; locked?: boolean}> = ({label, locked = true, ...p}) => (
  <G {...p}>
    <rect x={-140} y={-50} width={280} height={140} rx={16} fill="#fff" {...O} />
    <Text y={-4} size={28}>{label}</Text>
    <g transform="translate(90,-84)">
      <rect x={-22} y={-6} width={44} height={38} rx={8} fill={locked ? C.yellow : C.greenLight} stroke={C.ink} strokeWidth={4} />
      <path d="M -14 -6 L -14 -22 Q -14 -40 0 -40 Q 14 -40 14 -22 L 14 -6" fill="none" stroke={C.ink} strokeWidth={5} />
    </g>
  </G>
);

export const DateTable: React.FC<P> = (p) => (
  <G {...p}>
    <ellipse cx={0} cy={40} rx={220} ry={70} fill="#fff" {...O} />
    <rect x={-16} y={40} width={32} height={140} fill="#C9A673" {...O} strokeWidth={5} />
    <circle cx={-70} cy={0} r={28} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <rect x={-84} y={-10} width={28} height={60} rx={8} fill={C.red} stroke={C.ink} strokeWidth={4} />
    <circle cx={70} cy={0} r={28} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <rect x={56} y={-10} width={28} height={60} rx={8} fill={C.blue} stroke={C.ink} strokeWidth={4} />
    <rect x={-30} y={16} width={60} height={26} rx={4} fill="#fff" stroke={C.ink} strokeWidth={3} />
  </G>
);

export const Confetti: React.FC<P & {t: number}> = ({t, ...p}) => {
  if (t <= 0) return null;
  const cols = [C.red, C.blue, C.yellow, C.green, '#9B5DE5'];
  return (
    <G {...p}>
      {Array.from({length: 16}).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const d = t * 220;
        return <rect key={i} x={Math.cos(a) * d - 8} y={Math.sin(a) * d - 8 + t * 60} width={16} height={16} fill={cols[i % cols.length]} stroke={C.ink} strokeWidth={2} opacity={1 - t} transform={`rotate(${t * 300 + i * 20})`} />;
      })}
    </G>
  );
};
