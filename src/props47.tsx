import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

// A gate window: terminal wall with a big round window showing a plane outside, and a gate number sign.
export const GateWindow: React.FC<P & {gate?: string}> = ({gate = 'B12', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-320} width={520} height={480} rx={20} fill="#DDEAF3" {...O} />
    <rect x={-220} y={-280} width={440} height={340} rx={16} fill="#8FD3F5" stroke={C.ink} strokeWidth={5} />
    <path d="M -180 60 L -60 -60 L 40 -60 L 160 60 Z" fill="#fff" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" opacity={0.95} />
    <circle cx={100} cy={-160} r={40} fill="#FFE9A8" stroke={C.ink} strokeWidth={4} />
    <rect x={-220} y={60} width={440} height={30} fill="#C9D1DA" stroke={C.ink} strokeWidth={4} />
    <rect x={-140} y={-380} width={280} height={80} rx={14} fill={C.navy} {...O} />
    <text x={0} y={-330} fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={3}>GATE {gate}</text>
  </G>
);

// Departure-area seats, three in a row.
export const GateSeats: React.FC<P> = (p) => (
  <G {...p}>
    {[-180, 0, 180].map((x) => (
      <g key={x} transform={`translate(${x},0)`}>
        <rect x={-70} y={-140} width={140} height={140} rx={14} fill="#3A86FF" stroke={C.ink} strokeWidth={5} />
        <rect x={-80} y={0} width={160} height={30} rx={10} fill="#2E3440" stroke={C.ink} strokeWidth={5} />
        <rect x={-60} y={30} width={16} height={60} fill="#2E3440" />
        <rect x={44} y={30} width={16} height={60} fill="#2E3440" />
      </g>
    ))}
  </G>
);

// The velvet-rope / glass divider that marks "past security" — used for the captive-customer visual.
export const SecurityWall: React.FC<P & {label?: string}> = ({label = 'SECURITY', ...p}) => (
  <G {...p}>
    <rect x={-24} y={-320} width={48} height={640} fill="#C9D1DA" {...O} />
    <rect x={-140} y={-360} width={280} height={70} rx={14} fill={C.red} {...O} />
    <text x={0} y={-323} fontFamily={FONT} fontWeight={700} fontSize={32} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={2}>{label}</text>
    <path d="M -24 -260 L -80 -260 M -24 -180 L -80 -180 M -24 -100 L -80 -100" stroke={C.ink} strokeWidth={5} opacity={0.4} />
  </G>
);

// An x-ray / metal-detector arch with a conveyor belt of bins.
export const ScannerArch: React.FC<P & {glow?: number}> = ({glow = 0, ...p}) => (
  <G {...p}>
    <path d="M -140 120 L -140 -140 Q -140 -220 -20 -220 L 20 -220 Q 140 -220 140 -140 L 140 120" fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
    <path d="M -140 120 L -140 -140 Q -140 -220 -20 -220 L 20 -220 Q 140 -220 140 -140 L 140 120" fill="none" stroke={glow > 0 ? C.red : '#DDE3E9'} strokeWidth={10} strokeLinecap="round" opacity={0.7 + glow * 0.3} />
    <rect x={-220} y={110} width={440} height={40} rx={10} fill="#B8C2CC" {...O} strokeWidth={5} />
    {Array.from({length: 8}).map((_, i) => <line key={i} x1={-200 + i * 55} y1={150} x2={-200 + i * 55} y2={130} stroke={C.ink} strokeWidth={4} opacity={0.5} />)}
  </G>
);

// A gray security bin, optionally holding a confiscated bottle (thrown out) with an X over it.
export const SecurityBin: React.FC<P & {confiscated?: boolean}> = ({confiscated, ...p}) => (
  <G {...p}>
    <path d="M -100 -20 L 100 -20 L 84 60 L -84 60 Z" fill="#C9D1DA" {...O} strokeWidth={5} />
    <rect x={-100} y={-36} width={200} height={20} rx={8} fill="#9AA5B1" stroke={C.ink} strokeWidth={4} />
    {confiscated && (
      <g transform="translate(0,-90)">
        <rect x={-16} y={-40} width={32} height={20} rx={5} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <path d="M -34 -20 L 34 -20 L 40 60 Q 40 74 26 74 L -26 74 Q -40 74 -40 60 Z" fill="#3A86FF" {...O} strokeWidth={4} />
        <line x1={-38} y1={-6} x2={38} y2={54} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
        <line x1={38} y1={-6} x2={-38} y2={54} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
      </g>
    )}
  </G>
);

// A small airport shop counter with an awning, a price sign and a fridge of drinks.
export const ShopCounter: React.FC<P & {name?: string; price?: string}> = ({name = 'GATE MARKET', price, ...p}) => (
  <G {...p}>
    <path d="M -260 -180 L 260 -180 L 300 -100 L -300 -100 Z" fill={C.red} {...O} />
    {Array.from({length: 6}).map((_, i) => <path key={i} d={`M ${-300 + i * 100} -100 L ${-260 + i * 100} -100 L ${-280 + i * 100} -40 L ${-320 + i * 100} -40 Z`} fill={i % 2 ? '#fff' : C.red} stroke={C.ink} strokeWidth={4} />)}
    <text x={0} y={-135} fontFamily={FONT} fontWeight={700} fontSize={34} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={2}>{name}</text>
    <rect x={-260} y={-40} width={520} height={220} fill="#E3E7EC" {...O} />
    <rect x={-220} y={-10} width={150} height={150} rx={8} fill="#C9E8F5" stroke={C.ink} strokeWidth={5} />
    <rect x={-30} y={-10} width={150} height={150} rx={8} fill="#C9E8F5" stroke={C.ink} strokeWidth={5} />
    {price && (
      <g transform="translate(160,-60) rotate(-6)">
        <rect x={-90} y={-40} width={180} height={80} rx={12} fill={C.yellow} {...O} strokeWidth={5} />
        <text x={0} y={8} fontFamily={FONT} fontWeight={700} fontSize={46} fill={C.ink} textAnchor="middle">{price}</text>
      </g>
    )}
  </G>
);

// The deli sandwich Dave buys, with a price tag (distinct from the mortgage-labelled Sandwich in props4).
export const DeliSandwich: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <path d="M -170 40 L 0 -110 L 170 40 Z" fill="#E9B872" {...O} />
    <path d="M -170 40 L 170 40 L 150 76 L -150 76 Z" fill="#8FBF5C" {...O} strokeWidth={5} />
    <path d="M -150 20 L 150 20 L 132 50 L -132 50 Z" fill="#D9503A" {...O} strokeWidth={5} />
    <path d="M -170 40 L 0 -110 L 170 40" fill="none" stroke="#F6E2B0" strokeWidth={10} strokeLinecap="round" opacity={0.6} />
    {price && (
      <g transform="translate(190,-70) rotate(10)">
        <rect x={-70} y={-34} width={140} height={68} rx={10} fill={C.yellow} {...O} strokeWidth={4} />
        <text x={0} y={6} fontFamily={FONT} fontWeight={700} fontSize={38} fill={C.ink} textAnchor="middle">{price}</text>
      </g>
    )}
  </G>
);

// A tall departure-hall window seen from outside security (used for "before 9/11" / normal-store scenes).
export const StorefrontStrip: React.FC<P & {label?: string; price?: string}> = ({label = 'SAME SHOP', price, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-180} width={440} height={280} rx={16} fill="#fff" {...O} />
    <rect x={-220} y={-180} width={440} height={70} rx={16} fill="#F1EADC" {...O} strokeWidth={5} />
    <Text y={-145} size={30}>{label}</Text>
    {price && <Text y={30} size={70} color={C.green}>{price}</Text>}
  </G>
);

// A percentage-rent split box: a bar split into "shop keeps" / "airport rent".
export const RentSplit: React.FC<P & {rentPct: number; label?: string}> = ({rentPct, label = 'F&B RENT', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-40} width={520} height={80} rx={16} fill="#E4DCCB" {...O} />
    <rect x={-260} y={-40} width={520 * rentPct} height={80} rx={16} fill={C.red} stroke={C.ink} strokeWidth={6} />
    <Text y={-70} size={32} color="#5B6470">{label}</Text>
    <Text x={-260 + 520 * rentPct + 80} y={6} size={40} color={C.red}>{Math.round(rentPct * 100)}%</Text>
  </G>
);

// A contract paper with "MINIMUM GUARANTEE" stamped, for the MAG (minimum annual guarantee) beat.
export const ContractPaper: React.FC<P & {stamped?: boolean}> = ({stamped, ...p}) => (
  <G {...p}>
    <rect x={-180} y={-230} width={360} height={460} rx={10} fill="#fff" {...O} strokeWidth={5} />
    {[-160, -100, -40, 20, 80].map((y) => <line key={y} x1={-130} x2={130} y1={y} y2={y} stroke="#C9C0AE" strokeWidth={5} />)}
    {stamped && (
      <g transform="rotate(-10)">
        <rect x={-140} y={-30} width={280} height={80} rx={10} fill="none" stroke={C.red} strokeWidth={8} />
        <text x={0} y={12} fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.red} textAnchor="middle">MINIMUM DUE</text>
      </g>
    )}
  </G>
);
