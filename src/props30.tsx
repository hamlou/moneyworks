import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const Handcuffs: React.FC<P & {open?: number; color?: string}> = ({open = 0, color = C.gold, ...p}) => (
  <G {...p}>
    <path d="M -40 0 Q 0 -30 40 0" fill="none" stroke={C.ink} strokeWidth={10} strokeDasharray="14 8" />
    {[-1, 1].map((k) => (
      <g key={k} transform={`translate(${k * 120},0) rotate(${k * open * 30})`}>
        <circle r={80} fill="none" stroke={C.ink} strokeWidth={34} />
        <circle r={80} fill="none" stroke={color} strokeWidth={22} />
        <rect x={k > 0 ? 60 : -110} y={-24} width={50} height={48} rx={8} fill={color} {...O} />
        <path d="M -40 -50 Q -20 -64 10 -60" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.8} />
      </g>
    ))}
  </G>
);

export const Ladder: React.FC<P & {steps?: number; h?: number; lit?: number}> = ({steps = 8, h = 640, lit = -1, ...p}) => (
  <G {...p}>
    <line x1={-70} y1={0} x2={-70} y2={-h} stroke={C.woodDark} strokeWidth={22} strokeLinecap="round" />
    <line x1={70} y1={0} x2={70} y2={-h} stroke={C.woodDark} strokeWidth={22} strokeLinecap="round" />
    {Array.from({length: steps}).map((_, i) => (
      <line key={i} x1={-70} x2={70} y1={-40 - i * ((h - 60) / (steps - 1))} y2={-40 - i * ((h - 60) / (steps - 1))} stroke={i <= lit ? C.green : C.wood} strokeWidth={16} strokeLinecap="round" />
    ))}
  </G>
);

export const Elevator: React.FC<P & {h?: number; car?: number; label?: string}> = ({h = 640, car = 0, label = 'HOUSE PRICES', ...p}) => (
  <G {...p}>
    <rect x={-110} y={-h} width={220} height={h} rx={10} fill="#E8EEF1" {...O} />
    <line x1={0} y1={-h} x2={0} y2={-h + 30 + (1 - car) * (h - 220)} stroke={C.ink} strokeWidth={5} />
    <g transform={`translate(0,${-190 - car * (h - 220)})`}>
      <rect x={-90} y={0} width={180} height={180} rx={10} fill={C.red} {...O} />
      <rect x={-60} y={30} width={120} height={120} rx={6} fill="#FFE3E9" stroke={C.ink} strokeWidth={4} />
      <path d="M 0 55 L 30 90 L -30 90 Z" fill={C.ink} />
    </g>
    <Text y={50} size={34}>{label}</Text>
  </G>
);

export const Chair: React.FC<P & {color?: string; taken?: boolean}> = ({color = C.blue, taken, ...p}) => (
  <G {...p}>
    <rect x={-50} y={-160} width={100} height={110} rx={12} fill={color} {...O} />
    <rect x={-60} y={-60} width={120} height={26} rx={8} fill={color} {...O} />
    <line x1={-48} y1={-34} x2={-48} y2={40} {...O} strokeWidth={10} />
    <line x1={48} y1={-34} x2={48} y2={40} {...O} strokeWidth={10} />
    {taken && <circle cx={0} cy={-110} r={18} fill="#fff" stroke={C.ink} strokeWidth={4} />}
  </G>
);

export const Cake: React.FC<P & {n?: string; lit?: number; f?: number}> = ({n = '40', lit = 1, f = 0, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-120} width={340} height={140} rx={20} fill="#F7C6D0" {...O} />
    <path d="M -170 -80 Q -140 -40 -110 -80 Q -80 -40 -50 -80 Q -20 -40 10 -80 Q 40 -40 70 -80 Q 100 -40 130 -80 Q 150 -50 170 -80" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" />
    <rect x={-200} y={14} width={400} height={24} rx={12} fill="#fff" {...O} />
    {n.split('').map((d, i) => (
      <g key={i} transform={`translate(${(i - (n.length - 1) / 2) * 110},-190)`}>
        <Text size={130} color={C.yellow} stroke={C.ink} sw={7}>{d}</Text>
        {lit > 0 && <path d={`M 0 -110 Q ${-14 + Math.sin(f / 3) * 4} -130 0 -160 Q 14 -130 0 -110 Z`} fill="#FF9F1C" stroke={C.ink} strokeWidth={3} />}
      </g>
    ))}
  </G>
);

export const Lumber: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].slice(r).map((c) => (
        <g key={`${r}${c}`}>
          <rect x={-200 + c * 100 + r * 50 - 50} y={-r * 80 - 80} width={96} height={76} rx={10} fill="#E9B872" {...O} strokeWidth={5} />
          <circle cx={-200 + c * 100 + r * 50 - 2} cy={-r * 80 - 42} r={18} fill="none" stroke={C.woodDark} strokeWidth={4} />
        </g>
      )),
    )}
    {label && <Text y={50} size={36}>{label}</Text>}
  </G>
);

export const Hourglass: React.FC<P & {t?: number}> = ({t = 0, ...p}) => (
  <G {...p}>
    <rect x={-90} y={-150} width={180} height={24} rx={8} fill={C.wood} {...O} />
    <rect x={-90} y={126} width={180} height={24} rx={8} fill={C.wood} {...O} />
    <path d="M -70 -126 L 70 -126 Q 70 -40 8 0 Q 70 40 70 126 L -70 126 Q -70 40 -8 0 Q -70 -40 -70 -126 Z" fill="#E3F1F4" {...O} />
    <path d={`M ${-56 * (1 - t)} ${-110 + t * 90} L ${56 * (1 - t)} ${-110 + t * 90} L 0 -6 Z`} fill={C.yellow} />
    <path d={`M -58 116 L 58 116 L ${58 - 50 * t} ${116 - 90 * t} L ${-58 + 50 * t} ${116 - 90 * t} Z`} fill={C.yellow} />
  </G>
);

export const Dog: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <g transform={`rotate(${Math.sin(f / 4) * 20},80,-40)`}>
      <path d="M 80 -40 Q 120 -70 130 -110" fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
      <path d="M 80 -40 Q 120 -70 130 -110" fill="none" stroke="#D9A066" strokeWidth={9} strokeLinecap="round" />
    </g>
    <ellipse cx={0} cy={-30} rx={100} ry={50} fill="#D9A066" {...O} />
    {[-60, -20, 30, 70].map((x) => <line key={x} x1={x} y1={0} x2={x} y2={40} {...O} strokeWidth={14} />)}
    <circle cx={-100} cy={-90} r={50} fill="#D9A066" {...O} />
    <ellipse cx={-130} cy={-80} rx={20} ry={36} fill="#8C5A33" {...O} strokeWidth={4} />
    <circle cx={-110} cy={-100} r={7} fill={C.ink} />
    <circle cx={-148} cy={-80} r={9} fill={C.ink} />
    <path d="M -135 -60 Q -120 -50 -105 -60" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
  </G>
);

export const Ruler: React.FC<P & {w?: number; val?: number; max?: number; color?: string; label?: string}> = ({w = 1200, val = 0, max = 6, color = C.green, label, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-45} width={w} height={90} rx={14} fill="#FFF3C4" {...O} />
    <rect x={-w / 2 + 8} y={-37} width={Math.max(0, (w - 16) * Math.min(1, val / max))} height={74} rx={10} fill={color} opacity={0.85} />
    {Array.from({length: max + 1}).map((_, i) => (
      <g key={i}>
        <line x1={-w / 2 + (i * w) / max} y1={-45} x2={-w / 2 + (i * w) / max} y2={-10} stroke={C.ink} strokeWidth={5} />
        <Text x={-w / 2 + (i * w) / max} y={80} size={34} color="#5B6470">{i}</Text>
      </g>
    ))}
    {label && <Text x={-w / 2 - 20} y={4} size={40} anchor="end">{label}</Text>}
  </G>
);
