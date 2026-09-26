import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const Pond: React.FC<P & {f: number; t0?: number; rings?: number}> = ({f, t0 = 0, rings = 4, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={0} rx={820} ry={250} fill="#9FD6EE" {...O} />
    <ellipse cx={0} cy={-20} rx={760} ry={210} fill="#B9E3F4" />
    {Array.from({length: rings}).map((_, i) => {
      const k = Math.max(0, Math.min(1, (f - t0 - i * 14) / 40));
      if (k <= 0) return null;
      const rx = 90 + i * 170 * k + 60 * k;
      return <ellipse key={i} cx={0} cy={0} rx={Math.min(rx, 90 + i * 170 + 60)} ry={Math.min(rx, 90 + i * 170 + 60) * 0.3} fill="none" stroke="#fff" strokeWidth={8} opacity={0.9 - i * 0.12} />;
    })}
  </G>
);

export const Stone: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <path d="M -50 10 Q -60 -30 -20 -44 Q 30 -56 52 -20 Q 64 20 20 34 Q -30 44 -50 10 Z" fill="#9AA0A8" {...O} />
    {label && <Text y={-80} size={34}>{label}</Text>}
  </G>
);

export const Seesaw: React.FC<P & {tilt?: number; left?: string; right?: string; lc?: string; rc?: string}> = ({tilt = 0, left = '', right = '', lc = C.red, rc = C.green, ...p}) => (
  <G {...p}>
    <path d="M -70 0 L 70 0 L 0 -110 Z" fill="#8C5A33" {...O} />
    <g transform={`translate(0,-110) rotate(${tilt})`}>
      <rect x={-460} y={-14} width={920} height={28} rx={12} fill={C.wood} {...O} strokeWidth={5} />
      {[-380, 380].map((x, i) => (
        <g key={x} transform={`translate(${x},-14) rotate(${-tilt})`}>
          <rect x={-120} y={-80} width={240} height={80} rx={16} fill={i ? rc : lc} {...O} strokeWidth={5} />
          <Text y={-40} size={32} color="#fff">{i ? right : left}</Text>
        </g>
      ))}
    </g>
  </G>
);

export const Train: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <rect x={-360} y={-150} width={260} height={150} rx={10} fill="#5B3A29" {...O} />
    {[-330, -260, -190].map((x) => <rect key={x} x={x} y={-120} width={50} height={50} rx={6} fill="#FFE8A3" stroke={C.ink} strokeWidth={4} />)}
    <rect x={-60} y={-110} width={300} height={110} rx={12} fill={C.navy} {...O} />
    <rect x={120} y={-200} width={120} height={200} rx={10} fill={C.navy} {...O} />
    <rect x={140} y={-180} width={80} height={60} rx={6} fill="#FFE8A3" stroke={C.ink} strokeWidth={4} />
    <rect x={-30} y={-190} width={50} height={80} fill="#2E3440" {...O} strokeWidth={5} />
    {[0, 1, 2].map((i) => {
      const k = ((f / 20 + i / 3) % 1);
      return <circle key={i} cx={-5 - k * 60} cy={-210 - k * 120} r={20 + k * 30} fill="#fff" opacity={0.8 - k * 0.7} stroke={C.ink} strokeWidth={3} />;
    })}
    {[-300, -160, 0, 120, 200].map((x) => (
      <g key={x} transform={`translate(${x},10) rotate(${f * 6})`}>
        <circle r={36} fill="#2E3440" {...O} strokeWidth={5} />
        <line x1={-30} y1={0} x2={30} y2={0} stroke="#9AA0A8" strokeWidth={5} />
      </g>
    ))}
    <line x1={-420} y1={50} x2={300} y2={50} stroke={C.ink} strokeWidth={6} />
  </G>
);

export const Palm: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -10 0 Q -30 -140 10 -280 L 34 -280 Q 0 -140 20 0 Z" fill="#A8744A" {...O} strokeWidth={5} />
    {[-150, -100, -40, 20, 80].map((a, i) => (
      <path key={i} d="M 0 0 Q 70 -40 150 10 Q 70 -10 0 0 Z" transform={`translate(22,-280) rotate(${a + 60})`} fill="#6BBF59" {...O} strokeWidth={5} />
    ))}
  </G>
);

export const Ship: React.FC<P & {f?: number; label?: string}> = ({f = 0, label = 'ECONOMY', ...p}) => (
  <G {...p}>
    <g transform={`translate(0,${Math.sin(f / 14) * 5})`}>
      <path d="M -420 -40 L 420 -40 L 340 80 L -360 80 Z" fill={C.navy} {...O} />
      <rect x={-300} y={-150} width={500} height={110} rx={8} fill="#fff" {...O} />
      <rect x={-200} y={-240} width={260} height={90} rx={8} fill="#fff" {...O} />
      {[-270, -190, -110, -30, 50, 130].map((x) => <circle key={x} cx={x + 20} cy={-95} r={16} fill="#8FD3F5" stroke={C.ink} strokeWidth={3} />)}
      <rect x={100} y={-300} width={60} height={150} fill={C.red} {...O} strokeWidth={5} />
      <text x={0} y={30} fontFamily={FONT} fontWeight={700} fontSize={48} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={6}>{label}</text>
    </g>
    <path d="M -520 100 q 40 -20 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="#5AB6E0" strokeWidth={10} strokeLinecap="round" />
  </G>
);

export const Bicycle: React.FC<P> = (p) => (
  <G {...p}>
    {[-90, 90].map((x) => <circle key={x} cx={x} cy={0} r={60} fill="none" stroke={C.ink} strokeWidth={8} />)}
    <path d="M -90 0 L -20 -80 L 70 -80 L 90 0 M -20 -80 L 0 0 L 70 -80 M -30 -100 L 0 -100 M 70 -80 L 60 -120 L 90 -120" fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
  </G>
);

export const SlotMachine: React.FC<P & {f?: number; spin?: number; symbols?: string[]}> = ({f = 0, spin = 0, symbols = ['7', '7', '7'], ...p}) => {
  const alt = ['$', '7', 'X', '?', '$'];
  return (
    <G {...p}>
      <rect x={-230} y={-330} width={460} height={560} rx={40} fill={C.red} {...O} />
      <rect x={-200} y={-300} width={400} height={80} rx={16} fill={C.gold} {...O} strokeWidth={5} />
      <Text y={-258} size={46}>JACKPOT</Text>
      <rect x={-190} y={-180} width={380} height={170} rx={16} fill="#fff" {...O} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          {i > 0 && <line x1={-190 + i * 127} y1={-180} x2={-190 + i * 127} y2={-10} stroke={C.ink} strokeWidth={5} />}
          <Text x={-127 + i * 127} y={-92} size={100} color={C.red}>{spin > 0 ? alt[(Math.floor(f / 3) + i * 2) % alt.length] : symbols[i]}</Text>
        </g>
      ))}
      <rect x={-150} y={40} width={300} height={60} rx={12} fill="#2E3440" {...O} strokeWidth={5} />
      {Array.from({length: 8}).map((_, i) => <circle key={i} cx={-200 + i * 57} cy={-320} r={12} fill={(Math.floor(f / 6) + i) % 2 ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={3} />)}
      <line x1={230} y1={-120} x2={290} y2={-230} stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
      <circle cx={295} cy={-240} r={30} fill={C.ink} />
    </G>
  );
};

export const Tapes: React.FC<P & {label?: string}> = ({label = 'WHITE HOUSE TAPES', ...p}) => (
  <G {...p}>
    <rect x={-220} y={-130} width={440} height={260} rx={20} fill="#2E3440" {...O} />
    {[-110, 110].map((x) => (
      <g key={x}>
        <circle cx={x} cy={-10} r={70} fill="#C9B79A" {...O} strokeWidth={5} />
        <circle cx={x} cy={-10} r={18} fill="#2E3440" />
      </g>
    ))}
    <rect x={-180} y={80} width={360} height={36} rx={8} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <text x={0} y={104} fontFamily={FONT} fontWeight={700} fontSize={24} fill={C.ink} textAnchor="middle">{label}</text>
  </G>
);
