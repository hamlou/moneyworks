import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Crib: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <rect x={-160} y={-30} width={320} height={140} rx={14} fill="#F4E9D8" {...O} />
    {Array.from({length: 8}).map((_, i) => <line key={i} x1={-140 + i * 40} y1={-30} x2={-140 + i * 40} y2={-140} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />)}
    <rect x={-160} y={-160} width={320} height={22} rx={10} fill="#F4E9D8" {...O} strokeWidth={5} />
    {[-140, 140].map((x) => <line key={x} x1={x} y1={110} x2={x} y2={190} stroke="#C98F5E" strokeWidth={16} strokeLinecap="round" />)}
    {[-140, 140].map((x) => <line key={x} x1={x - 30} y1={40} x2={x + 30} y2={40} stroke="#C98F5E" strokeWidth={14} strokeLinecap="round" />)}
    {price && (
      <g transform="translate(150,-90) rotate(10)">
        <rect x={0} y={-28} width={price.length * 26 + 30} height={56} rx={10} fill={C.yellow} {...O} strokeWidth={4} />
        <text x={(price.length * 26 + 30) / 2} y={8} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.ink} textAnchor="middle">{price}</text>
      </g>
    )}
  </G>
);

export const Stroller: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <path d="M -100 -140 Q 20 -180 70 -60" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M -100 -140 Q -140 -130 -130 -70" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M -140 -70 Q -30 20 90 -20 Q 130 -34 120 -80 L 40 -110 Q -60 -140 -140 -70 Z" fill={C.blue} {...O} strokeWidth={5} />
    <circle cx={-70} cy={70} r={34} fill="#2E3440" {...O} strokeWidth={5} />
    <circle cx={80} cy={70} r={34} fill="#2E3440" {...O} strokeWidth={5} />
    {price && <Text y={150} size={40}>{price}</Text>}
  </G>
);

export const CarSeatProp: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <path d="M -110 100 L -100 -40 Q -90 -140 0 -140 Q 90 -140 100 -40 L 110 100 Z" fill="#EF476F" {...O} strokeWidth={5} />
    <path d="M -70 60 L -64 -30 Q -58 -100 0 -100 Q 58 -100 64 -30 L 70 60 Z" fill="#fff" opacity={0.5} />
    <path d="M -100 20 Q 0 60 100 20" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    {price && <Text y={150} size={38}>{price}</Text>}
  </G>
);

export const DiaperStack: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={i} cx={0} cy={40 - i * 26} rx={110} ry={30} fill={i % 2 ? '#fff' : '#EAF3FF'} stroke={C.ink} strokeWidth={5} />
    ))}
    <path d="M -110 -60 Q -110 -100 0 -100 Q 110 -100 110 -60" fill="none" stroke={C.blue} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
    {label && <Text y={110} size={34}>{label}</Text>}
  </G>
);

export const FormulaCan: React.FC<P & {brand?: boolean; label?: string}> = ({brand = true, label, ...p}) => (
  <G {...p}>
    <path d="M -70 -110 L 70 -110 L 62 120 Q 60 140 40 140 L -40 140 Q -60 140 -62 120 Z" fill={brand ? '#3A86FF' : '#E6E9ED'} {...O} strokeWidth={5} />
    <rect x={-70} y={-130} width={140} height={26} rx={8} fill="#C9D1DA" {...O} strokeWidth={5} />
    <circle cx={0} cy={-30} r={38} fill="#fff" opacity={brand ? 0.9 : 0.6} />
    <Text y={-22} size={brand ? 22 : 26} color={brand ? C.blue : '#5B6470'}>{brand ? 'MASCOT\nBRAND' : 'STORE\nBRAND'}</Text>
    {label && <Text y={175} size={34}>{label}</Text>}
  </G>
);

export const Belly: React.FC<P> = ({s = 1, o = 1}) => (
  <g transform={`scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={72} ry={82} fill="#F4D6B8" stroke={C.ink} strokeWidth={5} />
    <path d="M -30 -40 Q 0 -20 30 -40" fill="none" stroke="#D8B48F" strokeWidth={4} strokeLinecap="round" />
  </g>
);

export const DaycareSign: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={6} rx={340} ry={16} fill="rgba(35,35,43,0.10)" />
    <rect x={-320} y={-220} width={640} height={220} fill="#FFF3D6" {...O} />
    <path d="M -350 -220 L 0 -330 L 350 -220 Z" fill={C.red} {...O} />
    {[-220, -20, 180].map((x) => <rect key={x} x={x} y={-160} width={140} height={140} rx={10} fill="#9EDDB0" stroke={C.ink} strokeWidth={5} />)}
    <Text y={-360} size={40}>LITTLE STARS DAYCARE</Text>
    {price && (
      <g transform="translate(0,60)">
        <rect x={-170} y={-40} width={340} height={80} rx={16} fill="#fff" {...O} strokeWidth={5} />
        <Text y={4} size={44} color={C.red}>{price}</Text>
      </g>
    )}
  </G>
);

export const RentHouse: React.FC<P & {price?: string; label?: string}> = ({price, label = 'RENT', ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={6} rx={230} ry={14} fill="rgba(35,35,43,0.10)" />
    <rect x={-160} y={-120} width={320} height={126} fill="#F4D6B8" {...O} />
    <path d="M -190 -120 L 0 -240 L 190 -120 Z" fill={C.red} {...O} />
    <rect x={-32} y={-60} width={64} height={66} fill="#8C5A33" {...O} strokeWidth={5} />
    <rect x={-130} y={-90} width={60} height={50} fill="#9EDDB0" {...O} strokeWidth={4} />
    <rect x={70} y={-90} width={60} height={50} fill="#9EDDB0" {...O} strokeWidth={4} />
    <Text y={70} size={34}>{label}</Text>
    {price && <Text y={116} size={44} color={C.green}>{price}</Text>}
  </G>
);

export const CareerBar: React.FC<P & {h: number; color: string; label: string; value: string}> = ({h, color, label, value, ...p}) => h <= 1 ? null : (
  <G {...p}>
    <rect x={-90} y={-h} width={180} height={h} rx={14} fill={color} {...O} />
    <Text y={-h - 40} size={44}>{value}</Text>
    <Text y={54} size={30} color="#5B6470">{label}</Text>
  </G>
);

export const GearTag: React.FC<P & {icon: 'crib' | 'car' | 'stroller'; price: string; label: string}> = ({icon, price, label, ...p}) => (
  <G {...p}>
    <rect x={-190} y={-230} width={380} height={300} rx={22} fill="#fff" {...O} />
    <g transform="translate(0,-100) scale(0.85)">
      {icon === 'crib' && <Crib />}
      {icon === 'stroller' && <Stroller />}
      {icon === 'car' && <CarSeatProp />}
    </g>
    <Text y={-8} size={34}>{label}</Text>
    <Text y={44} size={46} color={C.red}>{price}</Text>
  </G>
);

export const PiggyJar: React.FC<P & {label?: string; fill?: number}> = ({label = '529', fill = 0.4, ...p}) => (
  <G {...p}>
    <path d="M -90 60 L -90 -60 Q -90 -160 0 -160 Q 90 -160 90 -60 L 90 60 Q 90 100 40 100 L -40 100 Q -90 100 -90 60 Z" fill="#fff" {...O} strokeWidth={6} />
    <rect x={-90} y={60 - fill * 190} width={180} height={fill * 190} fill={C.greenLight} clipPath="inset(0 0 0 0 round 40px)" opacity={0.8} />
    <rect x={-30} y={-176} width={60} height={20} rx={8} fill={C.gold} {...O} strokeWidth={4} />
    <Text y={-20} size={42} color={C.green}>{label}</Text>
  </G>
);
