import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const Pot: React.FC<P & {level?: number; label?: string; coins?: number}> = ({level = 0.5, label, coins = 0, ...p}) => {
  const lv = Math.max(0, Math.min(1, level));
  const top = 60 - lv * 150;
  return (
    <G {...p}>
      <ellipse cx={0} cy={110} rx={230} ry={20} fill="rgba(35,35,43,0.12)" />
      {[-150, 150].map((x) => <path key={x} d={`M ${x} 70 L ${x * 1.2} 115`} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />)}
      <clipPath id="pot18">
        <path d="M -200 -100 Q -210 90 0 100 Q 210 90 200 -100 Z" />
      </clipPath>
      <path d="M -200 -100 Q -210 90 0 100 Q 210 90 200 -100 Z" fill="#3B3F4A" {...O} />
      {lv > 0 && (
        <g clipPath="url(#pot18)">
          <rect x={-220} y={top} width={440} height={220} fill={C.gold} />
          <path d={`M -220 ${top} q 55 -18 110 0 t 110 0 t 110 0 t 110 0`} fill={C.gold} stroke={C.ink} strokeWidth={4} />
        </g>
      )}
      <path d="M -200 -100 Q -210 90 0 100 Q 210 90 200 -100" fill="none" {...O} strokeWidth={7} />
      <rect x={-225} y={-118} width={450} height={30} rx={15} fill="#5B6070" {...O} />
      {[-240, 240].map((x) => <circle key={x} cx={x} cy={-60} r={22} fill="none" stroke={C.ink} strokeWidth={10} />)}
      {Array.from({length: coins}).map((_, i) => (
        <g key={i} transform={`translate(${-140 + (i % 6) * 56},${-130 - Math.floor(i / 6) * 30})`}>
          <ellipse rx={26} ry={12} fill={C.gold} stroke={C.ink} strokeWidth={4} />
        </g>
      ))}
      {label && <Text y={20} size={40} color="#fff">{label}</Text>}
    </G>
  );
};

export const Flames: React.FC<P & {f: number}> = ({f, ...p}) => {
  const k = (i: number) => 1 + 0.12 * Math.sin(f / 3 + i * 1.7);
  return (
    <G {...p}>
      {[-70, 0, 70].map((x, i) => (
        <g key={x} transform={`translate(${x},0) scale(${i === 1 ? 1.25 : 0.9},${(i === 1 ? 1.25 : 0.9) * k(i)})`}>
          <path d="M 0 -150 Q 70 -60 55 0 Q 45 40 0 40 Q -45 40 -55 0 Q -70 -60 0 -150 Z" fill="#FF8A3D" {...O} strokeWidth={5} />
          <path d="M 0 -80 Q 35 -30 28 5 Q 22 25 0 25 Q -22 25 -28 5 Q -35 -30 0 -80 Z" fill={C.yellow} />
        </g>
      ))}
    </G>
  );
};

export const Hut: React.FC<P & {color?: string; burnt?: boolean}> = ({color = '#F4D6B8', burnt, ...p}) => (
  <G {...p}>
    <rect x={-60} y={-80} width={120} height={80} fill={burnt ? '#6B6159' : color} {...O} strokeWidth={5} />
    <path d="M -76 -76 L 0 -140 L 76 -76 Z" fill={burnt ? '#3B3F4A' : C.red} {...O} strokeWidth={5} />
    <rect x={-16} y={-44} width={32} height={44} fill={burnt ? '#2E3440' : '#8C5A33'} stroke={C.ink} strokeWidth={4} />
  </G>
);

export const Ship: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <g transform={`rotate(${Math.sin(f / 14) * 3})`}>
      <line x1={0} y1={-10} x2={0} y2={-300} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
      <path d="M 10 -290 Q 150 -200 10 -110 Z" fill="#FFFDF5" {...O} />
      <path d="M -10 -270 Q -130 -190 -10 -100 Z" fill="#FFFDF5" {...O} />
      <path d="M 0 -300 L 60 -318 L 0 -336 Z" fill={C.red} {...O} strokeWidth={4} />
      <path d="M -230 -20 L 230 -20 L 180 70 L -190 70 Z" fill="#8C5A33" {...O} />
      {[-120, -40, 40, 120].map((x) => <circle key={x} cx={x} cy={22} r={12} fill="#FFFDF5" stroke={C.ink} strokeWidth={4} />)}
    </g>
    <path d="M -320 80 q 40 -20 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="#5AB6E0" strokeWidth={10} strokeLinecap="round" />
  </G>
);

export const Slip: React.FC<P & {names?: number; title?: string}> = ({names = 0, title = 'SHIP: "MARY" · LONDON → LISBON', ...p}) => {
  const sigs = ['J. Smith', 'T. Brown', 'W. Clark', 'R. Hale'];
  return (
    <G {...p}>
      <rect x={-300} y={-220} width={600} height={440} rx={8} fill="#F3E6C4" {...O} />
      <text x={0} y={-160} fontFamily={HAND} fontSize={38} fill={C.ink} textAnchor="middle" dominantBaseline="middle">{title}</text>
      <text x={0} y={-110} fontFamily={HAND} fontSize={34} fill="#5B6470" textAnchor="middle" dominantBaseline="middle">cargo worth £5,000</text>
      <line x1={-260} y1={-70} x2={260} y2={-70} stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" />
      {sigs.slice(0, names).map((n, i) => (
        <g key={n}>
          <text x={-240} y={-20 + i * 55} fontFamily={HAND} fontSize={40} fill={C.navy} dominantBaseline="middle">{n}</text>
          <text x={240} y={-20 + i * 55} fontFamily={HAND} fontSize={36} fill={C.red} textAnchor="end" dominantBaseline="middle">£{[1500, 1500, 1000, 1000][i]}</text>
        </g>
      ))}
    </G>
  );
};

export const FloatPool: React.FC<P & {f: number; fill?: number; label?: string}> = ({f, fill = 1, label = 'FLOAT', ...p}) => {
  const top = 40 - 150 * fill;
  return (
    <G {...p}>
      <clipPath id="pool18">
        <rect x={-340} y={-110} width={680} height={150} rx={30} />
      </clipPath>
      <rect x={-360} y={-130} width={720} height={190} rx={40} fill="#5BC0DE" {...O} />
      <rect x={-340} y={-110} width={680} height={150} rx={30} fill="#8FD3F5" />
      <g clipPath="url(#pool18)">
        <rect x={-340} y={top} width={680} height={200} fill={C.greenLight} />
        {Array.from({length: 14}).map((_, i) => (
          <rect key={i} x={-320 + (i % 7) * 92} y={top + 12 + Math.floor(i / 7) * 40} width={70} height={30} rx={4} fill={C.green} stroke={C.ink} strokeWidth={3} transform={`rotate(${(i * 23) % 17 - 8},${-285 + (i % 7) * 92},${top + 27})`} />
        ))}
      </g>
      <g transform={`translate(80,${top - 10 + Math.sin(f / 10) * 6}) rotate(${Math.sin(f / 16) * 6})`}>
        <ellipse rx={120} ry={46} fill={C.red} {...O} />
        <ellipse rx={56} ry={18} fill="#8FD3F5" stroke={C.ink} strokeWidth={5} />
        {[-80, 80].map((x) => <path key={x} d={`M ${x - 12} -40 L ${x + 12} -40 L ${x + 12} 40 L ${x - 12} 40 Z`} fill="#fff" opacity={0.9} />)}
        <text x={0} y={-66} fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.ink} textAnchor="middle" dominantBaseline="middle" letterSpacing={4}>{label}</text>
      </g>
    </G>
  );
};

export const Bumper: React.FC<P & {sensors?: number}> = ({sensors = 0, ...p}) => (
  <G {...p}>
    <path d="M -300 -60 L 300 -60 Q 340 -60 340 -20 L 340 30 Q 340 70 300 70 L -300 70 Q -340 70 -340 30 L -340 -20 Q -340 -60 -300 -60 Z" fill={C.blue} {...O} />
    {Array.from({length: Math.round(sensors * 4)}).map((_, i) => (
      <g key={i} transform={`translate(${-210 + i * 140},5)`}>
        <circle r={22} fill="#2E3440" stroke={C.ink} strokeWidth={4} />
        <circle r={8} fill="#6EF0A8" />
      </g>
    ))}
    {sensors > 0.5 && (
      <g transform="translate(0,-110)">
        <rect x={-70} y={-40} width={140} height={80} rx={14} fill="#2E3440" {...O} strokeWidth={5} />
        <circle r={24} fill="#8FD3F5" stroke={C.ink} strokeWidth={4} />
      </g>
    )}
  </G>
);

export const BlueCar: React.FC<P & {f?: number; shake?: number; dent?: boolean}> = ({f = 0, shake = 0, dent, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={50} rx={170} ry={12} fill="rgba(35,35,43,0.12)" />
    <g transform={`translate(${shake ? Math.sin(f * 2.1) * 5 * shake : 0},${shake ? Math.cos(f * 2.7) * 4 * shake : 0})`}>
      <path d="M -150 30 L -150 -14 Q -148 -30 -128 -34 L -90 -40 L -60 -92 Q -52 -102 -36 -102 L 60 -102 Q 76 -102 84 -92 L 112 -40 L 134 -36 Q 152 -32 152 -12 L 152 30 Z" fill="#5B8FD9" {...O} />
      <path d="M -48 -86 L 8 -86 L 8 -48 L -74 -48 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
      <path d="M 22 -86 L 62 -86 L 92 -48 L 22 -48 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
      <circle cx={-110} cy={-6} r={10} fill="#8A5A3B" opacity={0.7} />
      {dent && <path d="M 100 -30 L 120 -10 L 106 6 L 128 22" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
      <circle cx={140} cy={-18} r={8} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
      {[-90, 94].map((x) => (
        <g key={x}>
          <circle cx={x} cy={32} r={30} fill={C.ink} />
          <circle cx={x} cy={32} r={12} fill="#ddd" />
        </g>
      ))}
    </g>
  </G>
);

export const Deductible: React.FC<P & {total: number; ded: number; t?: number}> = ({total, ded, t = 1, ...p}) => {
  const W = 1200;
  const dw = (ded / total) * W * Math.min(1, t * 2);
  const iw = ((total - ded) / total) * W * Math.max(0, t * 2 - 1);
  return (
    <G {...p}>
      <rect x={-W / 2} y={-60} width={W} height={120} rx={20} fill="#fff" {...O} />
      {dw > 1 && <rect x={-W / 2} y={-60} width={dw} height={120} rx={20} fill={C.red} {...O} />}
      {iw > 1 && <rect x={-W / 2 + (ded / total) * W} y={-60} width={iw} height={120} rx={20} fill={C.green} {...O} />}
      {dw > 150 && <Text x={-W / 2 + dw / 2} y={2} size={44} color="#fff">DAVE ${ded}</Text>}
      {iw > 150 && <Text x={-W / 2 + (ded / total) * W + iw / 2} y={2} size={44} color="#fff">INSURER ${total - ded}</Text>}
      <Text y={-110} size={40} color="#5B6470">repair bill: ${total}</Text>
    </G>
  );
};
