import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const Slide: React.FC<P & {t?: number}> = ({t = 0, ...p}) => (
  <G {...p}>
    <path d="M -420 -300 L -340 -300 Q 60 -260 300 40 L 360 40 L 360 90 L 280 90 Q 20 -200 -420 -230 Z" fill={C.yellow} {...O} />
    <rect x={-470} y={-320} width={60} height={410} rx={10} fill="#E07A5F" {...O} />
    {[-260, -170, -80].map((y) => <line key={y} x1={-470} y1={y} x2={-410} y2={y} stroke={C.ink} strokeWidth={5} />)}
  </G>
);

export const Register: React.FC<P & {total?: string; hl?: number}> = ({total = '$0', hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-60} width={300} height={160} rx={16} fill="#8C96A3" {...O} />
    <rect x={-110} y={-170} width={220} height={110} rx={12} fill="#2E3440" {...O} />
    <Text y={-110} size={52} color={hl ? '#FF8FA3' : '#6EF0A8'}>{total}</Text>
    {[-70, 0, 70].map((x) => [0, 50].map((y) => <rect key={`${x}${y}`} x={x - 26} y={-30 + y} width={52} height={36} rx={8} fill="#DDE7EC" stroke={C.ink} strokeWidth={3} />))}
  </G>
);

export const Countdown: React.FC<P & {time: string; hl?: number}> = ({time, hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-230} y={-80} width={460} height={160} rx={20} fill={hl ? C.red : '#2E3440'} {...O} />
    <Text y={-40} size={28} color="#fff" ls={3}>ENDS IN</Text>
    <Text y={30} size={72} color="#fff">{time}</Text>
  </G>
);

export const CheckBox: React.FC<P & {on?: number; label?: string; w?: number}> = ({on = 0, label = '', w = 520, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-50} width={w} height={100} rx={16} fill="#fff" {...O} strokeWidth={5} />
    <rect x={-w / 2 + 24} y={-26} width={52} height={52} rx={8} fill={on ? C.blue : '#fff'} stroke={C.ink} strokeWidth={5} />
    {on > 0 && <path d={`M ${-w / 2 + 36} 0 l 12 12 l 22 -26`} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
    <Text x={-w / 2 + 100} y={2} size={34} anchor="start">{label}</Text>
  </G>
);

export const Notif: React.FC<P & {title: string; body: string; hl?: number; w?: number}> = ({title, body, hl = 0, w = 560, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-60} width={w} height={120} rx={26} fill={hl ? '#FFF3C4' : '#F7FAFD'} {...O} strokeWidth={5} />
    <rect x={-w / 2 + 22} y={-36} width={72} height={72} rx={16} fill={C.red} stroke={C.ink} strokeWidth={4} />
    <Text x={-w / 2 + 58} y={4} size={40} color="#fff">$</Text>
    <Text x={-w / 2 + 116} y={-16} size={30} anchor="start">{title}</Text>
    <Text x={-w / 2 + 116} y={26} size={26} anchor="start" color="#5B6470">{body}</Text>
  </G>
);

export const Package: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <rect x={-110} y={-90} width={220} height={180} rx={10} fill="#D9A45B" {...O} />
    <rect x={-24} y={-90} width={48} height={180} fill="#C98F44" stroke={C.ink} strokeWidth={4} />
    {label && <Text y={40} size={30}>{label}</Text>}
  </G>
);

export const WishList: React.FC<P & {items: string[]; crossed?: number}> = ({items, crossed = 0, ...p}) => (
  <G {...p}>
    <rect x={-200} y={-240} width={400} height={480} rx={12} fill="#FFF8DC" {...O} />
    <Text y={-190} size={40}>WAIT LIST</Text>
    {items.map((it, i) => (
      <g key={i}>
        <Text x={-160} y={-110 + i * 80} size={34} anchor="start" color={i < crossed ? '#9AA5B1' : C.ink}>{it}</Text>
        {i < crossed && <line x1={-170} y1={-112 + i * 80} x2={160} y2={-112 + i * 80} stroke={C.red} strokeWidth={6} strokeLinecap="round" />}
      </g>
    ))}
  </G>
);

export const Hundred38: React.FC<P & {v?: string; color?: string}> = ({v = '$100', color = '#B5D99C', ...p}) => (
  <G {...p}>
    <rect x={-150} y={-70} width={300} height={140} rx={12} fill={color} {...O} />
    <circle r={44} fill="#fff" stroke={C.ink} strokeWidth={4} opacity={0.8} />
    <Text y={4} size={40}>{v}</Text>
  </G>
);
