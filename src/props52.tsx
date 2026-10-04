import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Laptop showing a webinar screen with timer and guru
export const WebinarLaptop: React.FC<P & {timer?: string; spots?: number}> = ({timer, spots, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-140} width={440} height={280} rx={20} fill="#2E3440" {...O} />
    <rect x={-200} y={-120} width={400} height={240} rx={8} fill="#1D3557" />
    {timer && (
      <>
        <rect x={-160} y={-100} width={320} height={70} rx={12} fill={C.red} />
        <Text y={-62} size={40} color="#fff">{timer}</Text>
      </>
    )}
    {spots !== undefined && (
      <Text y={20} size={36} color={C.yellow}>{spots} SPOTS LEFT</Text>
    )}
    <Text y={80} size={32} color="#fff">FREE TRAINING</Text>
    <rect x={-260} y={150} width={520} height={20} rx={10} fill="#555" {...O} />
  </G>
);

// Fancy mansion (upgraded house)
export const Mansion: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <rect x={-280} y={-80} width={560} height={240} rx={16} fill="#F4E4C1" {...O} />
    <rect x={-320} y={-160} width={640} height={80} rx={12} fill="#8B4513" {...O} />
    <rect x={-200} y={-40} width={120} height={140} rx={8} fill="#5B3A29" {...O} />
    <circle cx={-140} cy={30} r={12} fill={C.gold} {...O} strokeWidth={4} />
    {[0, 1, 2].map(i => (
      <rect key={i} x={-20 + i * 100} y={-100} width={70} height={120} rx={8} fill="#87CEEB" {...O} strokeWidth={4} />
    ))}
    {label && <Text y={200} size={32} color={C.red}>{label}</Text>}
  </G>
);

// Notebook with scribbles
export const Notebook: React.FC<P & {lines?: number}> = ({lines = 5, ...p}) => (
  <G {...p}>
    <rect x={-160} y={-200} width={320} height={400} rx={12} fill="#FFF9E6" {...O} />
    <rect x={-170} y={-200} width={20} height={400} fill="#E63946" />
    {Array.from({length: lines}).map((_, i) => (
      <line key={i} x1={-120} y1={-140 + i * 60} x2={120} y2={-140 + i * 60} stroke="#C9D3DD" strokeWidth={3} />
    ))}
    {Array.from({length: lines}).map((_, i) => (
      <path key={`s${i}`} d={`M ${-100 + i * 10} ${-120 + i * 60} q 20 -8 40 0 t 40 4`} fill="none" stroke={C.blue} strokeWidth={4} strokeLinecap="round" />
    ))}
  </G>
);

// Course tier badge (Gold/Platinum/Diamond)
export const CourseTier: React.FC<P & {tier: 'GOLD' | 'PLATINUM' | 'DIAMOND'; price?: string}> = ({tier, price, ...p}) => {
  const colors = {GOLD: C.gold, PLATINUM: '#C0C0C0', DIAMOND: '#B9F2FF'};
  const color = colors[tier];
  return (
    <G {...p}>
      <rect x={-140} y={-80} width={280} height={160} rx={20} fill={color} {...O} />
      <Text y={-30} size={42} color={C.ink} weight={700}>{tier}</Text>
      {price && <Text y={30} size={38} color={C.ink}>{price}</Text>}
    </G>
  );
};

// Gold vial/bottle (Sam Brannan)
export const GoldBottle: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-20} y={-60} width={40} height={80} rx={8} fill="#D4AF37" {...O} />
    <rect x={-24} y={-70} width={48} height={20} rx={6} fill="#8B6914" {...O} />
    <circle cx={0} cy={-30} r={8} fill={C.gold} />
    <circle cx={0} cy={0} r={6} fill={C.gold} />
  </G>
);

// Mining tools (pick, pan, shovel)
export const MiningTools: React.FC<P> = (p) => (
  <G {...p}>
    <g transform="translate(-80,0) rotate(-30)">
      <rect x={-8} y={-80} width={16} height={140} fill="#654321" {...O} strokeWidth={4} />
      <path d="M -30 -90 L 0 -120 L 30 -90 Z" fill="#778899" {...O} strokeWidth={4} />
    </g>
    <circle cx={0} cy={20} r={40} fill={C.gold} {...O} strokeWidth={4} />
    <g transform="translate(80,0)">
      <rect x={-8} y={-70} width={16} height={120} fill="#654321" {...O} strokeWidth={4} />
      <path d="M -35 -80 L -35 -60 L 35 -60 L 35 -80 Z" fill="#778899" {...O} strokeWidth={4} />
    </g>
  </G>
);

// Store front (Brannan's store)
export const GeneralStore: React.FC<P & {name?: string}> = ({name = "BRANNAN'S GENERAL STORE", ...p}) => (
  <G {...p}>
    <rect x={-300} y={-120} width={600} height={280} rx={12} fill="#8B4513" {...O} />
    <rect x={-280} y={-100} width={560} height={40} rx={8} fill="#F4E4C1" {...O} strokeWidth={4} />
    <Text y={-72} size={28} color={C.ink} weight={700}>{name}</Text>
    {[0, 1, 2].map(i => (
      <rect key={i} x={-240 + i * 160} y={-40} width={120} height={160} rx={8} fill="#87CEEB" {...O} strokeWidth={4} />
    ))}
    <rect x={-60} y={20} width={120} height={100} rx={8} fill="#654321" {...O} strokeWidth={4} />
  </G>
);

// Game items (sword, armor, horse for F2P analogy)
export const GameSword: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-12} y={-80} width={24} height={120} fill="#C0C0C0" {...O} strokeWidth={4} />
    <rect x={-30} y={-90} width={60} height={20} fill={C.gold} {...O} strokeWidth={4} />
    <path d="M -40 40 L -15 70 L 15 70 L 40 40 Z" fill="#654321" {...O} strokeWidth={4} />
  </G>
);

export const GameArmor: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-50} y={-60} width={100} height={120} rx={12} fill="#778899" {...O} strokeWidth={4} />
    <circle cx={-20} cy={-20} r={8} fill={C.ink} />
    <circle cx={20} cy={-20} r={8} fill={C.ink} />
    <rect x={-40} y={20} width={80} height={40} rx={8} fill="#556B2F" {...O} strokeWidth={4} />
  </G>
);

export const GameHorse: React.FC<P> = (p) => (
  <G {...p}>
    <ellipse cx={0} cy={0} rx={70} ry={50} fill="#8B4513" {...O} strokeWidth={4} />
    <circle cx={-50} cy={-40} r={30} fill="#8B4513" {...O} strokeWidth={4} />
    <path d="M -50 -60 L -40 -80 L -60 -80 Z" fill="#654321" {...O} strokeWidth={4} />
    {[-40, -20, 20, 40].map(x => (
      <rect key={x} x={x - 8} y={40} width={16} height={40} fill="#654321" {...O} strokeWidth={4} />
    ))}
  </G>
);

// Free sample stand with toothpick
export const SampleStand: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-80} y={-40} width={160} height={100} fill="#F4E4C1" {...O} strokeWidth={4} />
    <rect x={-70} y={-30} width={140} height={50} rx={8} fill={C.yellow} {...O} strokeWidth={4} />
    <Text y={0} size={24} color={C.ink}>FREE SAMPLE</Text>
    <line x1={0} y1={30} x2={0} y2={80} stroke="#654321" strokeWidth={4} strokeLinecap="round" />
    <circle cx={0} cy={85} r={5} fill={C.red} />
  </G>
);

// Payment button (PAY $9,997)
export const PayButton: React.FC<P & {amount: string; hover?: number}> = ({amount, hover = 0, ...p}) => (
  <G {...p}>
    <rect x={-200 + hover * 8} y={-60 + hover * 8} width={400} height={120} rx={20} fill="rgba(35,35,43,0.15)" />
    <rect x={-200} y={-60} width={400} height={120} rx={20} fill={hover ? C.yellow : C.green} {...O} />
    <Text y={-10} size={32} color="#fff" weight={700}>PAY NOW</Text>
    <Text y={30} size={44} color="#fff" weight={700}>{amount}</Text>
  </G>
);

// Screenshots folder
export const ScreenshotFolder: React.FC<P & {count?: number}> = ({count = 12, ...p}) => (
  <G {...p}>
    <path d="M -160 -80 L -120 -120 L 160 -120 L 160 100 L -160 100 Z" fill={C.yellow} {...O} />
    <rect x={-140} y={-60} width={280} height={140} rx={8} fill="#FFF" {...O} strokeWidth={4} />
    <Text y={-20} size={32} color={C.ink}>SCREENSHOTS</Text>
    <Text y={30} size={48} color={C.red} weight={700}>{count} SAVED</Text>
  </G>
);

// FTC logo/badge
export const FTCBadge: React.FC<P> = (p) => (
  <G {...p}>
    <circle r={80} fill={C.navy} {...O} />
    <Text y={-20} size={50} color="#fff" weight={700}>FTC</Text>
    <Text y={20} size={24} color="#fff">.GOV</Text>
  </G>
);
