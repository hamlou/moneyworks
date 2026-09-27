import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const TipScreen: React.FC<P & {opts?: string[]; hl?: number; noHl?: number; title?: string; sub?: string}> = ({opts = ['20%', '25%', '30%'], hl = -1, noHl = 0, title = 'ADD A TIP?', sub, ...p}) => (
  <G {...p}>
    <rect x={-250} y={-210} width={500} height={420} rx={32} fill="#2E3440" {...O} />
    <rect x={-226} y={-186} width={452} height={372} rx={18} fill="#F7FAFD" />
    <Text y={-135} size={40}>{title}</Text>
    {sub && <Text y={-92} size={24} color="#7B8794">{sub}</Text>}
    {opts.map((l, i) => {
      const x = (i - (opts.length - 1) / 2) * 145;
      const on = i === hl;
      return (
        <g key={l} transform={`translate(${x},0)`}>
          <rect x={-62} y={-56} width={124} height={112} rx={18} fill={on ? C.red : '#fff'} stroke={C.ink} strokeWidth={5} />
          <Text y={4} size={38} color={on ? '#fff' : C.ink}>{l}</Text>
        </g>
      );
    })}
    <rect x={-60} y={104} width={120} height={46} rx={12} fill={noHl > 0.5 ? C.green : '#fff'} stroke={C.ink} strokeWidth={noHl > 0.5 ? 5 : 3} />
    <Text y={128} size={noHl > 0.5 ? 26 : 20} color={noHl > 0.5 ? '#fff' : '#9AA5B1'}>no tip</Text>
  </G>
);

export const Kiosk: React.FC<P & {label?: string}> = ({label = 'SELF CHECKOUT', children, ...p}) => (
  <G {...p}>
    <rect x={-60} y={-40} width={120} height={360} fill="#9AA5B1" {...O} />
    <rect x={-190} y={200} width={380} height={140} rx={16} fill="#D3DEE3" {...O} />
    <rect x={-150} y={225} width={140} height={40} rx={8} fill={C.red} {...O} strokeWidth={4} />
    <rect x={-180} y={-420} width={360} height={60} rx={14} fill={C.navy} {...O} />
    <Text y={-388} size={30} color="#fff" ls={3}>{label}</Text>
    <G y={-160} s={0.75}>{children}</G>
  </G>
);

export const RailCar: React.FC<P & {label?: string}> = ({label = 'SLEEPING CAR', ...p}) => (
  <G {...p}>
    <rect x={-420} y={-230} width={840} height={230} rx={26} fill="#7A4B2A" {...O} />
    <path d="M -440 -230 Q 0 -300 440 -230 Z" fill="#5A3520" {...O} />
    <rect x={-300} y={-205} width={600} height={40} rx={8} fill={C.gold} {...O} strokeWidth={4} />
    <Text y={-183} size={30} ls={4}>{label}</Text>
    {[-330, -180, -30, 120, 270].map((x) => <rect key={x} x={x} y={-145} width={100} height={80} rx={10} fill="#FFE8B0" {...O} strokeWidth={5} />)}
    {[-300, -200, 200, 300].map((x) => <circle key={x} cx={x} cy={10} r={36} fill={C.ink} stroke="#9AA5B1" strokeWidth={6} />)}
  </G>
);

export const WageSandwich: React.FC<P & {lit?: number[]}> = ({lit = [1, 1, 1], ...p}) => {
  const dim = (i: number) => ((lit[i] ?? 0) > 0.5 ? 1 : 0.35);
  return (
    <G {...p}>
      <g opacity={dim(0)}>
        <path d="M -260 -150 Q -260 -230 0 -230 Q 260 -230 260 -150 L 260 -120 L -260 -120 Z" fill="#E9A23B" {...O} />
        <Text x={0} y={-165} size={34}>BOSS: $2.13</Text>
      </g>
      <g opacity={dim(1)}>
        <rect x={-280} y={-120} width={560} height={200} rx={30} fill="#6BBF59" {...O} />
        <Text y={-20} size={40} color="#fff" stroke={C.ink} sw={5}>YOU: tips</Text>
        <Text y={40} size={34} color="#fff" stroke={C.ink} sw={4}>up to $5.12+</Text>
      </g>
      <g opacity={dim(2)}>
        <path d="M -260 80 L 260 80 Q 260 150 0 150 Q -260 150 -260 80 Z" fill="#E9A23B" {...O} />
      </g>
    </G>
  );
};

export const StaringJar: React.FC<P & {f?: number; label?: string}> = ({f = 0, label = 'TIPS', ...p}) => {
  const look = Math.sin(f / 20) * 8;
  return (
    <G {...p}>
      <path d="M -110 -130 L 110 -130 L 120 130 Q 120 150 100 150 L -100 150 Q -120 150 -120 130 Z" fill="#DCEFF7" {...O} />
      <rect x={-125} y={-160} width={250} height={36} rx={10} fill="#9AA5B1" {...O} strokeWidth={5} />
      {[-45, 45].map((x) => (
        <g key={x}>
          <circle cx={x} cy={-40} r={34} fill="#fff" stroke={C.ink} strokeWidth={5} />
          <circle cx={x + look} cy={-36} r={14} fill={C.ink} />
        </g>
      ))}
      <rect x={-80} y={40} width={160} height={56} rx={10} fill="#fff" {...O} strokeWidth={4} />
      <Text y={70} size={30}>{label}</Text>
    </G>
  );
};

export const Register: React.FC<P & {label?: string}> = ({label = '$0.00', ...p}) => (
  <G {...p}>
    <path d="M -200 0 L 200 0 L 230 150 L -230 150 Z" fill="#B08A5B" {...O} />
    <rect x={-180} y={-160} width={360} height={170} rx={16} fill="#C9A06B" {...O} />
    <rect x={-120} y={-230} width={240} height={80} rx={10} fill="#2E3440" {...O} />
    <Text y={-188} size={40} color="#9EDDB0">{label}</Text>
    {Array.from({length: 12}).map((_, i) => <circle key={i} cx={-120 + (i % 4) * 80} cy={-110 + Math.floor(i / 4) * 45} r={16} fill="#fff" stroke={C.ink} strokeWidth={4} />)}
    <rect x={-190} y={60} width={380} height={50} rx={8} fill="#8C6A3F" {...O} strokeWidth={4} />
  </G>
);
