import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
export const OIL = '#2E3440';
export const SEA = '#8FD3F5';
export const SAND = '#E9D3A1';

export const Barrel: React.FC<P & {label?: string; color?: string; price?: string}> = ({label = 'OIL', color = '#2F6690', price, ...p}) => (
  <G {...p}>
    <ellipse cx={8} cy={186} rx={130} ry={16} fill="rgba(35,35,43,0.12)" />
    <path d="M -120 -170 Q -135 0 -120 170 L 120 170 Q 135 0 120 -170 Z" fill={color} {...O} />
    <ellipse cx={0} cy={-170} rx={120} ry={26} fill="#4F86B0" {...O} />
    <circle cx={50} cy={-172} r={12} fill={OIL} stroke={C.ink} strokeWidth={4} />
    {[-80, 80].map((y) => <path key={y} d={`M -128 ${y} Q 0 ${y + 24} 128 ${y}`} fill="none" stroke={C.ink} strokeWidth={6} />)}
    <path d="M -90 -120 Q -100 0 -90 120" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.25} />
    <text x={0} y={6} fontFamily={FONT} fontWeight={700} fontSize={56} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={4}>{label}</text>
    {price && (
      <g transform="translate(150,-150) rotate(12)">
        <path d="M -20 -40 L 130 -40 L 130 40 L -20 40 L -60 0 Z" fill={C.yellow} {...O} strokeWidth={5} />
        <circle cx={-30} cy={0} r={8} fill="#fff" stroke={C.ink} strokeWidth={3} />
        <Text x={55} y={2} size={38}>{price}</Text>
      </g>
    )}
  </G>
);

export const GasPump: React.FC<P & {price?: string; total?: string; gal?: string; color?: string; hl?: number}> = ({price = '$4.48', total, gal, color = C.red, hl = 0, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={6} rx={180} ry={16} fill="rgba(35,35,43,0.12)" />
    <rect x={-140} y={-520} width={280} height={520} rx={26} fill={color} {...O} />
    <rect x={-160} y={-20} width={320} height={30} rx={10} fill="#5B6470" {...O} strokeWidth={5} />
    <rect x={-110} y={-480} width={220} height={total ? 220 : 130} rx={14} fill="#1F2A36" {...O} strokeWidth={5} />
    {hl > 0 && <rect x={-104} y={-474} width={208} height={64} rx={10} fill={C.yellow} opacity={0.35 * hl} />}
    <text x={0} y={-442} fontFamily="monospace" fontWeight={700} fontSize={46} fill="#FFD166" textAnchor="middle" dominantBaseline="middle">{price}</text>
    {total && <text x={0} y={-370} fontFamily="monospace" fontWeight={700} fontSize={30} fill="#9FB3C8" textAnchor="middle" dominantBaseline="middle">{gal ?? ''}</text>}
    {total && <text x={0} y={-310} fontFamily="monospace" fontWeight={700} fontSize={46} fill="#6EF0A8" textAnchor="middle" dominantBaseline="middle">{total}</text>}
    <rect x={-90} y={-200} width={180} height={120} rx={12} fill="#fff" {...O} strokeWidth={5} />
    <path d="M -30 -170 L 30 -170 L 30 -110 L -30 -110 Z M 30 -160 L 50 -150 L 50 -115" fill="none" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 140 -380 Q 230 -380 230 -250 L 230 -140" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
    <path d="M 210 -150 L 260 -150 L 262 -100 L 210 -100 Z" fill="#5B6470" {...O} strokeWidth={5} />
  </G>
);

const land = (n: number) => (n ? '#D9C38F' : SAND);
export const StraitMap: React.FC<P & {f?: number; ships?: number; lanes?: number; measure?: number; label?: string; labels?: boolean; danger?: number}> = ({f = 0, ships = 1, lanes = 0, measure = 0, label = '21 miles', labels = true, danger = 0, ...p}) => {
  const n = 14;
  return (
    <G {...p}>
      <rect x={-560} y={-330} width={1120} height={660} rx={30} fill={SEA} {...O} />
      <path d="M -554 -324 L 554 -324 L 554 -150 Q 380 -170 260 -120 Q 120 -80 60 -70 Q 10 -64 -40 -90 Q -160 -150 -330 -120 Q -450 -100 -554 -130 Z" fill={land(0)} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -554 324 L -554 150 Q -470 120 -380 40 Q -300 -10 -230 20 Q -140 40 -80 10 Q -40 -10 -20 30 Q 0 70 30 110 Q 90 170 200 210 Q 380 250 554 230 L 554 324 Z" fill={land(1)} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      {lanes > 0 && (
        <g opacity={lanes}>
          <path d="M -300 -40 Q -60 -40 10 -32 Q 200 -10 460 60" fill="none" stroke={C.yellow} strokeWidth={16} strokeLinecap="round" opacity={0.9} />
          <path d="M -300 10 Q -60 20 40 30 Q 200 60 460 120" fill="none" stroke={C.yellow} strokeWidth={16} strokeLinecap="round" opacity={0.9} />
        </g>
      )}
      {Array.from({length: n}).map((_, i) => {
        if (i / n >= ships) return null;
        const lane = i % 2;
        const u = ((f * 0.004 + i / n) % 1);
        const t = lane ? u : 1 - u;
        const x = -520 + t * 1000;
        const y = lane ? (x < 0 ? 12 : 30 + (x / 460) * 90) : (x < 0 ? -40 : -32 + (x / 460) * 90);
        return (
          <g key={i} transform={`translate(${x},${y}) scale(${lane ? 1 : -1},1)`}>
            <path d="M -26 -9 L 22 -9 L 30 0 L 22 9 L -26 9 Z" fill={danger > 0 && i % 3 === 0 ? C.red : C.navy} stroke={C.ink} strokeWidth={3} />
          </g>
        );
      })}
      {labels && (
        <g>
          <Text x={-330} y={-230} size={44} color="#7A6A45" ls={4}>IRAN</Text>
          <Text x={-360} y={-60} size={30} color="#2F6690">PERSIAN GULF</Text>
          <Text x={360} y={-10} size={30} color="#2F6690">GULF OF OMAN</Text>
          <Text x={-380} y={250} size={36} color="#7A6A45">ARABIA</Text>
          <Text x={170} y={275} size={34} color="#7A6A45">OMAN</Text>
        </g>
      )}
      {measure > 0 && (
        <g opacity={measure}>
          <path d="M 25 -66 L 25 102" stroke={C.red} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 14" />
          <path d="M 5 -60 L 25 -80 L 45 -60 M 5 96 L 25 116 L 45 96" fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <g transform="translate(160,-160)">
            <rect x={-120} y={-36} width={240} height={72} rx={18} fill="#fff" stroke={C.red} strokeWidth={6} />
            <Text size={40} color={C.red}>{label}</Text>
          </g>
          <line x1={60} y1={-130} x2={36} y2={-70} stroke={C.red} strokeWidth={5} />
        </g>
      )}
    </G>
  );
};

export const Rocket: React.FC<P & {f?: number; flame?: number}> = ({f = 0, flame = 1, ...p}) => (
  <G {...p}>
    {flame > 0 && <path d={`M -34 110 Q 0 ${200 + Math.sin(f) * 30} 34 110 Z`} fill={C.yellow} stroke={C.red} strokeWidth={6} opacity={flame} />}
    <path d="M 0 -170 Q 70 -90 60 110 L -60 110 Q -70 -90 0 -170 Z" fill="#fff" {...O} />
    <path d="M -60 40 L -110 130 L -60 110 Z M 60 40 L 110 130 L 60 110 Z" fill={C.red} {...O} strokeWidth={5} />
    <circle cx={0} cy={-40} r={30} fill="#8FD3F5" {...O} strokeWidth={5} />
    <path d="M -34 -110 Q 0 -150 34 -110" fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" />
  </G>
);

export const Feather: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -10 150 Q 0 0 30 -160" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    <path d="M 30 -160 Q 110 -80 60 40 Q 30 100 -4 120 Q -70 60 -60 -30 Q -40 -120 30 -160 Z" fill="#EAF2FA" {...O} strokeWidth={5} />
    {[-100, -60, -20, 20, 60].map((y) => <path key={y} d={`M ${12 - (y + 100) * 0.08} ${y} l -40 26 M ${14 - (y + 100) * 0.08} ${y} l 40 20`} stroke="#9FB3C8" strokeWidth={4} strokeLinecap="round" />)}
  </G>
);

export const Refinery: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    {[0, 1].map((i) => <circle key={i} cx={-120 + i * 40} cy={-330 - ((f + i * 25) % 50)} r={26 + i * 6} fill="#C9CED6" opacity={0.7} />)}
    <rect x={-150} y={-320} width={60} height={320} rx={10} fill="#E3E7EC" {...O} />
    <rect x={-40} y={-240} width={90} height={240} rx={12} fill="#E3E7EC" {...O} />
    <ellipse cx={170} cy={-80} rx={90} ry={80} fill="#E3E7EC" {...O} />
    <path d="M -90 -250 L -40 -250 M -90 -150 Q -65 -120 -40 -150 M 50 -200 Q 120 -260 140 -140 M 50 -100 Q 100 -40 120 -110 Q 140 -170 200 -150 M -150 -60 Q -200 -120 -170 -200 L -150 -200" fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" />
    <path d="M -90 -60 Q -20 -10 50 -60 Q 90 -90 90 -20" fill="none" stroke={C.yellow} strokeWidth={14} strokeLinecap="round" />
    <line x1={-230} y1={0} x2={280} y2={0} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  </G>
);

export const SaltCave: React.FC<P & {level?: number; cap?: number; label?: string}> = ({level = 0.6, label, ...p}) => {
  const top = 180 - 360 * level;
  return (
    <G {...p}>
      <rect x={-420} y={-300} width={840} height={560} rx={24} fill="#C9A77C" {...O} />
      <rect x={-414} y={-294} width={828} height={60} rx={18} fill="#8BC06A" />
      {[[-300, -150], [280, -120], [-330, 120], [300, 170], [-200, 220], [200, -210]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={10} fill="#A88758" />)}
      <defs>
        <clipPath id="cave21">
          <path d="M -200 -180 Q -90 -220 0 -180 Q 110 -210 200 -160 Q 250 0 210 150 Q 120 210 0 190 Q -130 210 -210 150 Q -260 0 -200 -180 Z" />
        </clipPath>
      </defs>
      <path d="M -200 -180 Q -90 -220 0 -180 Q 110 -210 200 -160 Q 250 0 210 150 Q 120 210 0 190 Q -130 210 -210 150 Q -260 0 -200 -180 Z" fill="#F4EEE2" />
      <g clipPath="url(#cave21)">
        <rect x={-300} y={top} width={600} height={400} fill={OIL} />
        <rect x={-300} y={top} width={600} height={10} fill="#5B6470" />
      </g>
      <path d="M -200 -180 Q -90 -220 0 -180 Q 110 -210 200 -160 Q 250 0 210 150 Q 120 210 0 190 Q -130 210 -210 150 Q -260 0 -200 -180 Z" fill="none" {...O} />
      <rect x={-14} y={-300} width={28} height={110} fill="#5B6470" {...O} strokeWidth={4} />
      {label && <Text y={-262} size={30} color="#fff" stroke={C.ink} sw={5}>{label}</Text>}
    </G>
  );
};

export const Piggy: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={0} rx={150} ry={110} fill="#F4A6B8" {...O} />
    <circle cx={-90} cy={-90} r={30} fill="#F4A6B8" {...O} />
    <ellipse cx={-160} cy={10} rx={34} ry={30} fill="#F08CA4" {...O} strokeWidth={5} />
    <circle cx={-168} cy={6} r={5} fill={C.ink} />
    <circle cx={-152} cy={6} r={5} fill={C.ink} />
    <circle cx={-90} cy={-30} r={9} fill={C.ink} />
    <rect x={-40} y={-116} width={80} height={14} rx={7} fill={C.ink} />
    {[-80, 70].map((x) => <rect key={x} x={x} y={90} width={36} height={50} rx={10} fill="#F4A6B8" {...O} strokeWidth={5} />)}
    <path d="M 150 -10 q 40 -20 30 20 q -10 20 20 10" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    {label && <Text x={20} y={10} size={36} color={C.ink}>{label}</Text>}
  </G>
);

export const Tractor: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-120} y={-110} width={170} height={80} rx={10} fill={C.green} {...O} />
    <rect x={-40} y={-200} width={100} height={100} rx={10} fill="#CFEFFF" {...O} strokeWidth={5} />
    <rect x={40} y={-150} width={20} height={60} fill={C.ink} />
    <circle cx={-70} cy={0} r={60} fill={C.ink} />
    <circle cx={-70} cy={0} r={24} fill={C.yellow} />
    <circle cx={80} cy={20} r={38} fill={C.ink} />
    <circle cx={80} cy={20} r={14} fill={C.yellow} />
  </G>
);

export const Chips: React.FC<P & {label?: string}> = ({label = 'CHIPS', ...p}) => (
  <G {...p}>
    <path d="M -70 -110 L 70 -110 L 60 -90 Q 80 0 60 90 L 70 110 L -70 110 L -60 90 Q -80 0 -60 -90 Z" fill={C.yellow} {...O} />
    <Text y={0} size={34} color={C.red}>{label}</Text>
  </G>
);

export const Tire: React.FC<P & {psi?: string}> = ({psi = '35 PSI', ...p}) => (
  <G {...p}>
    <circle r={120} fill={C.ink} />
    <circle r={70} fill="#C9CED6" {...O} />
    <circle r={16} fill="#5B6470" />
    {Array.from({length: 12}).map((_, i) => <rect key={i} x={-8} y={-122} width={16} height={24} fill="#5B6470" transform={`rotate(${i * 30})`} />)}
    <g transform="translate(150,-110)">
      <rect x={-70} y={-34} width={140} height={68} rx={14} fill="#fff" {...O} strokeWidth={5} />
      <Text size={30}>{psi}</Text>
    </g>
  </G>
);

export const AiBubble: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <circle r={230} fill="rgba(143,211,245,0.25)" stroke="#5AB6E0" strokeWidth={8} />
    <path d="M -150 -110 Q -120 -170 -60 -190" fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" opacity={0.8} />
    <g transform={`translate(0,${Math.sin(f / 10) * 8})`}>
      <rect x={-90} y={-90} width={180} height={180} rx={24} fill="#1F2A36" {...O} />
      {[-60, -20, 20, 60].map((v) => (
        <g key={v}>
          <line x1={v} y1={-90} x2={v} y2={-125} stroke={C.ink} strokeWidth={8} />
          <line x1={v} y1={90} x2={v} y2={125} stroke={C.ink} strokeWidth={8} />
          <line x1={-90} y1={v} x2={-125} y2={v} stroke={C.ink} strokeWidth={8} />
          <line x1={90} y1={v} x2={125} y2={v} stroke={C.ink} strokeWidth={8} />
        </g>
      ))}
      <Text y={4} size={70} color="#6EF0A8">AI</Text>
    </g>
  </G>
);
