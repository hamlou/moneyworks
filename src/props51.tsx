import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Trading app phone with balance and confetti
export const TradingPhone: React.FC<P & {f?: number; balance: string; change: string; color?: string; confetti?: number}> = ({f = 0, balance, change, color = C.green, confetti = 0, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-280} width={300} height={560} rx={44} fill="#1D1F2B" {...O} />
    <rect x={-130} y={-254} width={260} height={508} rx={26} fill="#0F1117" />
    <Text y={-210} size={24} color="#8A93A7">TOTAL BALANCE</Text>
    <Text y={-150} size={68} color={color}>{balance}</Text>
    <Text y={-90} size={36} color={color}>{change}</Text>
    <rect x={-100} y={-30} width={200} height={60} rx={30} fill={C.green} />
    <Text y={4} size={32} color="#fff">BUY</Text>
    <rect x={-100} y={60} width={200} height={60} rx={30} fill={C.red} />
    <Text y={94} size={32} color="#fff">SELL</Text>
    <Text y={170} size={28} color="#8A93A7">OPTIONS</Text>
    <rect x={-50} y={190} width={100} height={36} rx={18} fill="#FFB627" />
    <Text y={212} size={24} color="#000">ENABLED</Text>
    {confetti > 0 &&
      Array.from({length: 20}).map((_, i) => {
        const x = -120 + (i % 5) * 60 + (Math.random() - 0.5) * 40;
        const y = -240 + Math.floor(i / 5) * 80 - confetti * 300 + (i % 3) * 50;
        const colors = ['#FFD700', '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181'];
        return (
          <rect key={i} x={x} y={y} width={10} height={20} rx={2} fill={colors[i % 5]} opacity={Math.max(0, 1 - confetti)} transform={`rotate(${i * 25})`} />
        );
      })}
  </G>
);

// Options coupon (like a pizza coupon)
export const OptionCoupon: React.FC<P & {stock?: string; price?: string; expires?: string; expired?: number}> = ({stock = 'STOCK', price = '$200', expires = 'FRIDAY', expired = 0, ...p}) => (
  <G {...p}>
    <rect x={-200 + 8} y={-120 + 8} width={400} height={240} rx={12} fill="rgba(35,35,43,0.12)" />
    <rect x={-200} y={-120} width={400} height={240} rx={12} fill={expired ? '#DDD' : '#FFE3B0'} {...O} strokeDasharray={expired ? '10 5' : 'none'} />
    <Text y={-70} size={32} color={expired ? '#888' : C.ink}>BUY {stock} AT</Text>
    <Text y={-20} size={56} color={expired ? '#888' : C.red}>{price}</Text>
    <Text y={40} size={28} color={expired ? '#888' : FONT}>expires: {expires}</Text>
    {expired > 0 && (
      <>
        <line x1={-180} y1={-100} x2={180} y2={100} stroke={C.red} strokeWidth={12} />
        <line x1={180} y1={-100} x2={-180} y2={100} stroke={C.red} strokeWidth={12} />
        <Text y={90} size={40} color={C.red}>EXPIRED</Text>
      </>
    )}
  </G>
);

// Wholesaler building (the middleman)
export const WholesalerHQ: React.FC<P & {label?: string}> = ({label = 'WHOLESALER', ...p}) => (
  <G {...p}>
    <rect x={-240} y={-200} width={480} height={340} fill="#3D5A80" {...O} />
    <rect x={-220} y={-180} width={440} height={40} fill="#1D2D44" stroke={C.ink} strokeWidth={4} />
    <Text y={-152} size={32} color="#fff">{label}</Text>
    {[0, 1, 2, 3].map((i) =>
      [0, 1, 2, 3].map((j) => (
        <rect key={`${i}-${j}`} x={-200 + j * 100} y={-120 + i * 80} width={60} height={50} fill="#FFF8DC" stroke={C.ink} strokeWidth={3} />
      )),
    )}
    <rect x={-60} y={150} width={120} height={40} rx={4} fill="#8B7355" {...O} />
  </G>
);

// Money exchange booth (spread visualization)
export const ExchangeBooth: React.FC<P & {buy: string; sell: string}> = ({buy, sell, ...p}) => (
  <G {...p}>
    <rect x={-200} y={-180} width={400} height={360} rx={20} fill="#A8DADC" {...O} />
    <rect x={-180} y={-160} width={360} height={100} rx={12} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <Text y={-112} size={28} color={FONT}>WE BUY</Text>
    <Text y={-72} size={48} color={C.red}>{buy}</Text>
    <rect x={-180} y={-30} width={360} height={100} rx={12} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <Text y={18} size={28} color={FONT}>WE SELL</Text>
    <Text y={58} size={48} color={C.green}>{sell}</Text>
    <circle cx={0} cy={140} r={36} fill={C.gold} stroke={C.ink} strokeWidth={5} />
    <Text y={148} size={32} color={C.ink}>$</Text>
  </G>
);

// Settings toggle switch
export const ToggleSwitch: React.FC<P & {on?: number; label?: string}> = ({on = 0, label = 'OPTIONS', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-60} width={520} height={120} rx={16} fill="#F8F9FA" {...O} />
    <Text x={-220} y={6} size={42} anchor="start" color={C.ink}>{label}</Text>
    <rect x={110} y={-30} width={120} height={60} rx={30} fill={on ? '#DDD' : C.green} stroke={C.ink} strokeWidth={5} />
    <circle cx={on ? 170 : 140} cy={0} r={24} fill="#fff" stroke={C.ink} strokeWidth={5} />
    <Text x={170} y={6} size={28} color={on ? '#888' : '#fff'}>{on ? 'OFF' : 'ON'}</Text>
  </G>
);

// Puppy with treat (for training analogy)
export const Puppy: React.FC<P & {f?: number; sitting?: number}> = ({f = 0, sitting = 0, ...p}) => (
  <G {...p}>
    <g transform={`translate(0,${Math.sin((f || 0) / 20) * 3})`}>
      <ellipse cx={-20} cy={0} rx={28} ry={36} fill="#D4A574" stroke={C.ink} strokeWidth={5} />
      <ellipse cx={20} cy={0} rx={28} ry={36} fill="#D4A574" stroke={C.ink} strokeWidth={5} />
      <ellipse cx={0} cy={-30} rx={50} ry={44} fill="#E8C9A0" stroke={C.ink} strokeWidth={5} />
      <circle cx={-16} cy={-40} r={8} fill={C.ink} />
      <circle cx={16} cy={-40} r={8} fill={C.ink} />
      <circle cx={0} cy={-20} r={6} fill={C.ink} />
      <path d="M -24 -70 Q -30 -90 -20 -95" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <path d="M 24 -70 Q 30 -90 20 -95" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      {sitting > 0 && <rect x={-50} y={20} width={100} height={40} rx={20} fill="#E8C9A0" stroke={C.ink} strokeWidth={5} />}
    </g>
  </G>
);

// Study paper (Brazil study)
export const StudyPaper: React.FC<P & {title: string; stat: string; label?: string}> = ({title, stat, label, ...p}) => (
  <G {...p}>
    <rect x={-280 + 10} y={-320 + 10} width={560} height={640} rx={10} fill="rgba(35,35,43,0.12)" />
    <rect x={-280} y={-320} width={560} height={640} rx={10} fill="#fff" {...O} />
    <Text y={-260} size={36} color={FONT}>{title}</Text>
    <rect x={-240} y={-200} width={480} height={200} rx={16} fill="#FFF3C4" stroke={C.ink} strokeWidth={4} />
    <Text y={-90} size={100} color={C.red}>{stat}</Text>
    {label && <Text y={40} size={38} color={C.ink}>{label}</Text>}
    {[120, 160, 200].map((y) => <rect key={y} x={-240} y={y} width={480} height={12} rx={6} fill="#E3E0D2" />)}
  </G>
);
