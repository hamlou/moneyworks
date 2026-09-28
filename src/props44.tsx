import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Diamond: React.FC<P & {glow?: number; color?: string}> = ({glow = 0, color = '#CFEFFF', ...p}) => (
  <G {...p}>
    {glow > 0 && <circle r={90 + glow * 30} fill="#fff" opacity={glow * 0.5} />}
    <path d="M -70 -30 L 70 -30 L 0 -120 Z" fill={color} {...O} strokeWidth={5} />
    <path d="M -70 -30 L -34 70 L 0 -30 Z" fill={color} {...O} strokeWidth={5} opacity={0.95} />
    <path d="M 70 -30 L 34 70 L 0 -30 Z" fill={color} {...O} strokeWidth={5} opacity={0.85} />
    <path d="M -34 70 L 0 -30 L 34 70 L 0 130 Z" fill={color} {...O} strokeWidth={5} />
    <path d="M -70 -30 L 0 -8 L 70 -30" fill="none" stroke="#fff" strokeWidth={4} opacity={0.7} />
  </G>
);

export const RingBox: React.FC<P & {open?: number; glow?: number}> = ({open = 1, glow = 0, ...p}) => (
  <G {...p}>
    <path d={`M -140 20 L 140 20 L 140 140 Q 140 170 110 170 L -110 170 Q -140 170 -140 140 Z`} fill="#1D3557" {...O} strokeWidth={5} />
    {open < 0.6 && (
      <path d="M -140 20 L 140 20 L 128 -70 Q 120 -110 0 -118 Q -120 -110 -128 -70 Z" fill="#243B5C" {...O} strokeWidth={5} />
    )}
    {open >= 0.6 && (
      <path d="M -140 20 L 128 -6 Q 120 -46 0 -54 Q -120 -46 -128 -6 Z" fill="#243B5C" {...O} strokeWidth={5} opacity={0.9} />
    )}
    {open > 0.6 && (
      <g transform={`translate(0,80) scale(${Math.min(1, (open - 0.6) * 2.5)})`}>
        <ellipse cx={0} cy={30} rx={60} ry={18} fill="#0F2038" />
        <circle r={26} fill="#FFD166" stroke={C.ink} strokeWidth={4} />
        <g transform="translate(0,-46) scale(0.55)"><Diamond glow={glow} /></g>
      </g>
    )}
  </G>
);

export const AdPoster: React.FC<P & {headline: string; sub?: string}> = ({headline, sub, ...p}) => (
  <G {...p}>
    <rect x={-320} y={-220} width={640} height={440} fill="#F2E9D3" {...O} strokeWidth={6} />
    <rect x={-296} y={-196} width={592} height={392} fill="none" stroke="#B79A67" strokeWidth={3} strokeDasharray="6 5" />
    <g transform="translate(0,-90) scale(0.7)"><Diamond /></g>
    <text x={0} y={40} fontFamily="Georgia, serif" fontStyle="italic" fontWeight={700} fontSize={54} fill="#3A2E1F" textAnchor="middle">{headline}</text>
    {sub && <text x={0} y={100} fontFamily="Georgia, serif" fontSize={30} fill="#6B5B41" textAnchor="middle">{sub}</text>}
  </G>
);

export const SalaryStack: React.FC<P & {months: number; label?: string; color?: string}> = ({months, label, color = C.green, ...p}) => (
  <G {...p}>
    {Array.from({length: Math.max(1, Math.round(months))}).map((_, i) => (
      <rect key={i} x={-90} y={-i * 56 - 50} width={180} height={46} rx={10} fill={color} stroke={C.ink} strokeWidth={5} />
    ))}
    {label && <Text y={30} size={36}>{label}</Text>}
  </G>
);

export const PriceSlash: React.FC<P & {from: string; to: string; label: string; hit?: number}> = ({from, to, label, hit = 1, ...p}) => (
  <G {...p}>
    <rect x={-210} y={-160} width={420} height={300} rx={24} fill="#fff" {...O} />
    <Text y={-100} size={30} color="#5B6470">{label}</Text>
    <text x={0} y={-20} fontFamily={FONT} fontWeight={700} fontSize={54} fill="#9AA5B1" textAnchor="middle" style={{textDecoration: hit ? 'line-through' : 'none'}}>{from}</text>
    {hit > 0 && <line x1={-140} y1={-32} x2={140} y2={-32} stroke={C.red} strokeWidth={8} strokeLinecap="round" transform={`scale(${hit},1)`} />}
    <Text y={70} size={72} color={hit ? C.green : '#fff'}>{hit ? to : ''}</Text>
  </G>
);

export const ResaleTag: React.FC<P & {paid: string; get: string}> = ({paid, get, ...p}) => (
  <G {...p}>
    <rect x={-230} y={-100} width={460} height={200} rx={20} fill="#fff" {...O} />
    <Text x={-140} y={-40} size={32} color="#5B6470">you paid</Text>
    <Text x={-140} y={20} size={54}>{paid}</Text>
    <line x1={0} y1={-70} x2={0} y2={70} stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" />
    <Text x={140} y={-40} size={32} color="#5B6470">resale</Text>
    <Text x={140} y={20} size={54} color={C.red}>{get}</Text>
  </G>
);

export const JewelerCounter: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-360} y={-40} width={720} height={120} rx={16} fill="#2E3440" {...O} strokeWidth={5} />
    <rect x={-340} y={-140} width={680} height={110} rx={12} fill="#DCEBF5" {...O} strokeWidth={5} opacity={0.85} />
    <rect x={-320} y={-130} width={640} height={90} rx={8} fill="#EAF6FB" opacity={0.6} />
  </G>
);

export const Ring: React.FC<P & {glow?: number; color?: string}> = ({glow = 0, color = '#CFEFFF', ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={50} rx={54} ry={22} fill="none" stroke={C.gold} strokeWidth={12} />
    <g transform="translate(0,-4)"><Diamond glow={glow} color={color} s={0.6} /></g>
  </G>
);
