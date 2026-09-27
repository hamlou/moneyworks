import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const DIM = '#B8AF9E';

export const BigReceipt: React.FC<P & {lines: [string, string][]; lit: number[]; hl?: number; total?: string; totalOn?: number; w?: number; title?: string; rowH?: number}> = ({lines, lit, hl = -1, total = '', totalOn = 0, w = 620, title = 'YOUR ORDER', rowH = 62, ...p}) => {
  const h = 150 + lines.length * rowH + 120;
  const top = -h / 2;
  const zig = Array.from({length: 12}).map((_, i) => `L ${w / 2 - (i + 0.5) * (w / 12)} ${-top + 18} L ${w / 2 - (i + 1) * (w / 12)} ${-top}`).join(' ');
  return (
    <G {...p}>
      <path d={`M ${-w / 2 + 10} ${top + 12} L ${w / 2 + 10} ${top + 12} L ${w / 2 + 10} ${-top + 12} L ${-w / 2 + 10} ${-top + 12} Z`} fill="rgba(35,35,43,0.10)" />
      <path d={`M ${-w / 2} ${top} L ${w / 2} ${top} L ${w / 2} ${-top} ${zig} Z`} fill="#fff" {...O} strokeWidth={5} />
      <Text y={top + 60} size={40} color="#5B6470" ls={4}>{title}</Text>
      <line x1={-w / 2 + 30} y1={top + 100} x2={w / 2 - 30} y2={top + 100} stroke={DIM} strokeWidth={4} strokeDasharray="12 10" />
      {lines.map(([a, b], i) => {
        const on = (lit[i] ?? 0) > 0.5;
        const y = top + 150 + i * rowH;
        return (
          <g key={i}>
            {i === hl && <rect x={-w / 2 + 16} y={y - rowH / 2 + 4} width={w - 32} height={rowH - 8} rx={12} fill={C.yellow} />}
            <Text x={-w / 2 + 36} y={y} size={36} anchor="start" color={on ? C.ink : DIM}>{a}</Text>
            <Text x={w / 2 - 36} y={y} size={36} anchor="end" color={on ? (i === hl ? C.red : C.ink) : DIM}>{on ? b : '?'}</Text>
          </g>
        );
      })}
      <line x1={-w / 2 + 30} y1={-top - 110} x2={w / 2 - 30} y2={-top - 110} stroke={C.ink} strokeWidth={4} />
      <Text x={-w / 2 + 36} y={-top - 58} size={48} anchor="start">TOTAL</Text>
      <Text x={w / 2 - 36} y={-top - 58} size={58} anchor="end" color={totalOn > 0.5 ? C.red : DIM}>{totalOn > 0.5 ? total : '?'}</Text>
    </G>
  );
};

export const FoodBag: React.FC<P & {label?: string}> = ({label = 'DELIVERY', ...p}) => (
  <G {...p}>
    <path d="M -110 -120 L 110 -120 L 125 130 L -125 130 Z" fill="#D9A15B" {...O} />
    <path d="M -110 -120 L -90 -160 L 90 -160 L 110 -120" fill="#C48A45" {...O} />
    <path d="M -40 -150 Q 0 -210 40 -150" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <rect x={-90} y={-10} width={180} height={60} rx={12} fill="#fff" {...O} strokeWidth={4} />
    <Text y={22} size={28}>{label}</Text>
  </G>
);

export const Scooter: React.FC<P & {f?: number; box?: string}> = ({f = 0, box = 'FOOD', ...p}) => (
  <G {...p}>
    {[-120, 120].map((x) => (
      <g key={x} transform={`translate(${x},0) rotate(${f * 8})`}>
        <circle r={48} fill={C.ink} />
        <circle r={20} fill="#9AA5B1" />
        <line x1={-20} y1={0} x2={20} y2={0} stroke="#fff" strokeWidth={5} />
      </g>
    ))}
    <path d="M -170 -20 Q -150 -80 -60 -80 L 60 -80 L 120 -10 L 150 -20 L 110 -170 L 80 -170" fill={C.red} {...O} />
    <line x1={80} y1={-170} x2={140} y2={-175} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <rect x={-190} y={-210} width={150} height={130} rx={14} fill={C.red} {...O} />
    <rect x={-175} y={-170} width={120} height={50} rx={8} fill="#fff" {...O} strokeWidth={4} />
    <Text x={-115} y={-143} size={26}>{box}</Text>
  </G>
);

export const MenuCard: React.FC<P & {title: string; item: string; price: string; color?: string; on?: number; strike?: string}> = ({title, item, price, color = C.navy, on = 1, strike, ...p}) => (
  <G {...p}>
    <rect x={-210 + 10} y={-170 + 12} width={420} height={340} rx={26} fill="rgba(35,35,43,0.10)" />
    <rect x={-210} y={-170} width={420} height={340} rx={26} fill="#fff" {...O} />
    <path d="M -210 -110 L -210 -144 Q -210 -170 -184 -170 L 184 -170 Q 210 -170 210 -144 L 210 -110 Z" fill={color} {...O} />
    <Text y={-136} size={34} color="#fff" ls={3}>{title}</Text>
    <Text y={-50} size={44}>{item}</Text>
    {strike && <Text y={25} size={44} color={DIM}>{strike}</Text>}
    {strike && <line x1={-70} y1={25} x2={70} y2={25} stroke={C.red} strokeWidth={6} strokeLinecap="round" />}
    <Text y={strike ? 105 : 70} size={strike ? 76 : 96} color={on > 0.5 ? color : DIM}>{on > 0.5 ? price : '?'}</Text>
  </G>
);

export const DeliveryApp: React.FC<P & {title?: string; big: string; sub?: string; btn?: string; press?: number; color?: string}> = ({title = 'FOOD APP', big, sub, btn = 'ORDER', press = 0, color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-280} width={300} height={560} rx={40} fill="#2E3440" {...O} />
    <rect x={-132} y={-256} width={264} height={512} rx={22} fill="#F7FAFD" />
    <rect x={-132} y={-256} width={264} height={70} rx={22} fill={color} />
    <rect x={-132} y={-210} width={264} height={24} fill={color} />
    <Text y={-218} size={28} color="#fff" ls={3}>{title}</Text>
    <circle cx={0} cy={-90} r={70} fill="#FDE8C8" stroke={C.ink} strokeWidth={4} />
    <path d="M -50 -95 Q -50 -135 0 -135 Q 50 -135 50 -95 Z" fill="#E9A23B" stroke={C.ink} strokeWidth={4} />
    <rect x={-52} y={-92} width={104} height={16} rx={7} fill="#7A4B2A" stroke={C.ink} strokeWidth={4} />
    <path d="M -50 -70 L 50 -70 Q 50 -48 0 -48 Q -50 -48 -50 -70 Z" fill="#E9A23B" stroke={C.ink} strokeWidth={4} />
    <Text y={30} size={big.length > 7 ? 46 : 60}>{big}</Text>
    {sub && <Text y={85} size={26} color="#7B8794">{sub}</Text>}
    <G y={180} s={1 - 0.08 * press}>
      <rect x={-100} y={-38} width={200} height={76} rx={38} fill={color} {...O} strokeWidth={5} />
      <Text y={3} size={34} color="#fff">{btn}</Text>
    </G>
  </G>
);
