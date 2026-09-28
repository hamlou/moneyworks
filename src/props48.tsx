import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

// A gentle office desk with a folder on it (the arrangement-room scene). Not somber-dark, kept warm & simple.
export const OfficeDesk: React.FC<P & {w?: number}> = ({w = 640, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-16} width={w} height={30} rx={8} fill="#C98F5E" {...O} strokeWidth={5} />
    <rect x={-w / 2 + 20} y={14} width={26} height={140} fill="#A8744A" stroke={C.ink} strokeWidth={4} />
    <rect x={w / 2 - 46} y={14} width={26} height={140} fill="#A8744A" stroke={C.ink} strokeWidth={4} />
  </G>
);

// A closed folder with an itemized-looking price list peeking out; `open` 0..1 reveals the price.
export const PriceFolder: React.FC<P & {open?: number; total?: string; label?: string}> = ({open = 0, total, label = 'GENERAL PRICE LIST', ...p}) => (
  <G {...p}>
    <path d="M -190 -20 L 190 -20 L 190 120 L -190 120 Z" fill="#F0E4C8" {...O} strokeWidth={5} />
    <path d="M -190 -20 L -40 -70 L 190 -20" fill="#F6EDD8" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    {open > 0.05 && (
      <g opacity={open}>
        <rect x={-160} y={-100 * open} width={320} height={90 * open} rx={8} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <text x={0} y={-100 * open + 30 * open} fontFamily={FONT} fontWeight={700} fontSize={22} fill="#5B6470" textAnchor="middle">{label}</text>
        {total && <text x={0} y={-100 * open + 65 * open} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.ink} textAnchor="middle">{total}</text>}
      </g>
    )}
  </G>
);

// A casket, simple and respectful (rounded, no gore) — `lid` 0 closed .. 1 open, `tag` optional price.
export const Casket: React.FC<P & {color?: string; tag?: string; glow?: boolean}> = ({color = '#7A5230', tag, glow, ...p}) => (
  <G {...p}>
    <path d="M -220 40 L -170 -60 L 170 -60 L 220 40 L 170 140 L -170 140 Z" fill={color} {...O} strokeWidth={6} />
    <path d="M -190 40 L -150 -30 L 150 -30 L 190 40 L 150 110 L -150 110 Z" fill="none" stroke="#C9A876" strokeWidth={4} opacity={0.7} />
    {[-90, 0, 90].map((x) => <rect key={x} x={x - 14} y={126} width={28} height={16} rx={4} fill="#D9C27A" stroke={C.ink} strokeWidth={3} />)}
    {glow && <ellipse cx={0} cy={40} rx={260} ry={40} fill={C.gold} opacity={0.25} />}
    {tag && (
      <g transform="translate(240,-40) rotate(8)">
        <rect x={-80} y={-34} width={160} height={68} rx={10} fill={C.yellow} {...O} strokeWidth={4} />
        <text x={0} y={6} fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.ink} textAnchor="middle">{tag}</text>
      </g>
    )}
  </G>
);

// A simple cremation urn on a small stand.
export const Urn: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <path d="M -50 -90 Q -70 -20 -40 20 L -40 60 Q -40 80 0 80 Q 40 80 40 60 L 40 20 Q 70 -20 50 -90 Z" fill="#C9A876" {...O} strokeWidth={5} />
    <ellipse cx={0} cy={-92} rx={46} ry={14} fill="#DDBF8C" stroke={C.ink} strokeWidth={4} />
    <rect x={-70} y={80} width={140} height={20} rx={6} fill="#8C5A33" stroke={C.ink} strokeWidth={4} />
    {label && <Text y={140} size={34}>{label}</Text>}
  </G>
);

// The outer burial vault (a plain concrete box) with the casket sitting inside it.
export const BurialVault: React.FC<P & {label?: string}> = ({label = 'VAULT', ...p}) => (
  <G {...p}>
    <path d="M -260 60 L -220 -30 L 220 -30 L 260 60 L 220 150 L -220 150 Z" fill="#B9C2CB" {...O} strokeWidth={6} />
    <path d="M -230 55 L -195 -15 L 195 -15 L 230 55 L 195 130 L -195 130 Z" fill="#CBD3DA" stroke={C.ink} strokeWidth={4} />
    <text x={0} y={60} fontFamily={FONT} fontWeight={700} fontSize={30} fill="#5B6470" textAnchor="middle">{label}</text>
  </G>
);

// A scale-like balance comparing two prices (wholesale vs. marked-up) — reuse-friendly, simple two-post version.
export const PriceCompare: React.FC<P & {aLabel: string; aVal: string; bLabel: string; bVal: string; hi?: 0 | 1}> = ({aLabel, aVal, bLabel, bVal, hi, ...p}) => (
  <G {...p}>
    {[[-260, aLabel, aVal, hi === 0], [260, bLabel, bVal, hi === 1]].map(([x, l, v, on], i) => (
      <g key={i} transform={`translate(${x as number},0)`}>
        <rect x={-160} y={-110} width={320} height={220} rx={20} fill={on ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
        <Text y={-50} size={30} color="#5B6470">{l as string}</Text>
        <Text y={30} size={56} color={on ? C.red : C.ink}>{v as string}</Text>
      </g>
    ))}
    <Text y={-160} size={40}>vs</Text>
  </G>
);

// A soft document icon representing the FTC Funeral Rule / itemized rights list.
export const RuleCard: React.FC<P & {n: number; text: string; on?: boolean}> = ({n, text, on = true, ...p}) => (
  <G {...p}>
    <rect x={-360} y={-70} width={720} height={140} rx={20} fill={on ? '#E8F7EC' : '#fff'} {...O} />
    <circle cx={-290} cy={0} r={44} fill={C.green} stroke={C.ink} strokeWidth={5} />
    <text x={-290} y={14} fontFamily={FONT} fontWeight={700} fontSize={44} fill="#fff" textAnchor="middle">{n}</text>
    <foreignObject x={-220} y={-50} width={540} height={100}>
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 30, color: C.ink, display: 'flex', alignItems: 'center', height: '100%', lineHeight: 1.15}}>{text}</div>
    </foreignObject>
  </G>
);

// A gentle bouquet of flowers, used to keep scenes warm rather than clinical.
export const Flowers: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M 0 40 L 0 -20" stroke="#5A8F4A" strokeWidth={8} strokeLinecap="round" />
    {[[-30, -40], [30, -40], [0, -70], [-16, -60], [16, -60]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={22} fill={['#F2A6B1', '#F6C343', '#9B5DE5', '#F2A6B1', '#F6C343'][i]} stroke={C.ink} strokeWidth={4} />
    ))}
  </G>
);

// A small trust/lockbox for the "where does the prepaid money go" beat.
export const TrustBox: React.FC<P & {locked?: boolean; label?: string}> = ({locked = true, label = 'TRUST', ...p}) => (
  <G {...p}>
    <rect x={-110} y={-80} width={220} height={160} rx={16} fill={locked ? C.greenLight : '#FFE3EA'} {...O} />
    <rect x={-30} y={-120} width={60} height={70} rx={30} fill="none" stroke={C.ink} strokeWidth={10} />
    <circle cy={-10} r={16} fill={C.ink} />
    <Text y={60} size={30}>{label}</Text>
  </G>
);
