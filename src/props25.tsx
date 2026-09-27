import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
export const GREEN = '#1E7A4E';

export const Cup: React.FC<P & {label?: string; color?: string; f?: number; steam?: boolean}> = ({label, color = GREEN, f = 0, steam = true, ...p}) => (
  <G {...p}>
    {steam && [-24, 16].map((x, i) => (
      <path key={x} d={`M ${x} -170 q ${14 * Math.sin(f / 8 + i)} -22 0 -44 q ${-14 * Math.sin(f / 8 + i)} -22 0 -44`} fill="none" stroke="#C9CED6" strokeWidth={8} strokeLinecap="round" opacity={0.8} />
    ))}
    <path d="M -80 -130 L 80 -130 L 62 120 Q 60 136 44 136 L -44 136 Q -60 136 -62 120 Z" fill="#fff" {...O} />
    <rect x={-92} y={-160} width={184} height={34} rx={12} fill="#F4EFE6" {...O} />
    <path d="M -74 -40 L 74 -40 L 68 50 L -68 50 Z" fill={color} {...O} strokeWidth={5} />
    {label && <Text y={6} size={label.length > 5 ? 26 : 34} color="#fff">{label}</Text>}
  </G>
);

export const GiftCard: React.FC<P & {value?: string; color?: string; title?: string}> = ({value, color = GREEN, title = 'GIFT CARD', ...p}) => (
  <G {...p}>
    <rect x={-170} y={-106} width={340} height={212} rx={22} fill={color} {...O} />
    <circle cx={-110} cy={-50} r={30} fill="#fff" opacity={0.85} stroke={C.ink} strokeWidth={4} />
    <path d="M -126 -58 L -94 -58 L -98 -32 L -122 -32 Z" fill={color} />
    <Text x={60} y={-54} size={28} color="#fff" ls={3}>{title}</Text>
    {value && <Text y={40} size={value.length > 6 ? 54 : 64} color={C.yellow} stroke={C.ink} sw={6}>{value}</Text>}
  </G>
);

export const Drawer: React.FC<P & {open?: number; label?: string}> = ({open = 1, label, children, ...p}) => (
  <G {...p}>
    <rect x={-260} y={-200} width={520} height={330} rx={16} fill={C.wood} {...O} />
    <rect x={-230} y={-170} width={460} height={110} rx={10} fill={C.woodDark} {...O} strokeWidth={5} />
    <g transform={`translate(0,${open * 90})`}>
      <rect x={-240} y={-80} width={480} height={150} rx={10} fill="#E2B384" {...O} />
      <g transform="translate(0,-60)">{children}</g>
      <rect x={-240} y={-10} width={480} height={80} rx={10} fill={C.wood} {...O} />
      <rect x={-50} y={16} width={100} height={22} rx={11} fill={C.gold} stroke={C.ink} strokeWidth={4} />
    </g>
    {label && <Text y={-115} size={36} color="#fff">{label}</Text>}
  </G>
);

export const BankHall: React.FC<P & {label?: string; color?: string}> = ({label = 'BANK', color = C.stone, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={4} rx={320} ry={16} fill="rgba(35,35,43,0.10)" />
    <rect x={-300} y={-40} width={600} height={40} fill={C.stoneDark} {...O} />
    <path d="M -300 -300 L 0 -430 L 300 -300 Z" fill={color} {...O} />
    <rect x={-280} y={-300} width={560} height={40} fill={color} {...O} />
    {[-210, -70, 70, 210].map((x) => <rect key={x} x={x - 26} y={-260} width={52} height={220} fill="#fff" {...O} strokeWidth={5} />)}
    <Text y={-340} size={44}>{label}</Text>
  </G>
);

export const Ledger: React.FC<P & {rows: [string, string][]; lit?: number[]; title?: string}> = ({rows, lit = [], title = "STARBUCKS' BOOKS", ...p}) => (
  <G {...p}>
    <rect x={-400} y={-60 - rows.length * 45} width={800} height={rows.length * 90 + 150} rx={20} fill="#FFFDF5" {...O} />
    <rect x={-400} y={-60 - rows.length * 45} width={800} height={80} rx={20} fill={C.navy} {...O} />
    <Text y={-20 - rows.length * 45} size={36} color="#fff" ls={3}>{title}</Text>
    <line x1={0} y1={40 - rows.length * 45} x2={0} y2={rows.length * 45 + 80} stroke={C.ink} strokeWidth={4} opacity={0.3} />
    {rows.map(([a, b], i) => {
      const on = lit[i] ?? 1;
      return (
        <g key={i} transform={`translate(0,${75 - rows.length * 45 + i * 90})`} opacity={0.3 + 0.7 * on}>
          <Text x={-370} size={36} anchor="start">{a}</Text>
          <Text x={370} size={40} anchor="end" color={b.startsWith('-') || b.startsWith('owes') ? C.red : C.green}>{b}</Text>
        </g>
      );
    })}
  </G>
);

export const Coat: React.FC<P & {color?: string}> = ({color = '#7C8FB5', ...p}) => (
  <G {...p}>
    <path d="M -20 -200 Q 0 -230 20 -200" fill="none" stroke={C.ink} strokeWidth={6} />
    <path d="M -110 -150 L 0 -190 L 110 -150" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M -100 -150 L -130 120 L 130 120 L 100 -150 L 40 -170 L 0 -60 L -40 -170 Z" fill={color} {...O} />
    <line x1={0} y1={-60} x2={0} y2={120} stroke={C.ink} strokeWidth={5} />
    {[-10, 40, 90].map((y) => <circle key={y} cx={16} cy={y} r={7} fill={C.ink} />)}
  </G>
);

export const Muffin: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -60 0 L 60 0 L 46 80 L -46 80 Z" fill="#E9C27A" {...O} />
    <path d="M -72 6 Q -80 -70 0 -76 Q 80 -70 72 6 Z" fill="#8C5A33" {...O} />
    {[[-30, -30], [10, -50], [30, -20], [-5, -10]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} fill="#3B2415" />)}
  </G>
);

export const Chip: React.FC<P & {color?: string; label?: string}> = ({color = C.red, label = '$5', ...p}) => (
  <G {...p}>
    <circle r={70} fill={color} {...O} />
    <circle r={48} fill="none" stroke="#fff" strokeWidth={8} strokeDasharray="16 12" />
    <Text y={3} size={40} color="#fff">{label}</Text>
  </G>
);

export const Apple: React.FC<P & {color?: string}> = ({color = C.red, ...p}) => (
  <G {...p}>
    <path d="M 0 -60 Q 10 -110 40 -120" fill="none" stroke="#8C5A33" strokeWidth={10} strokeLinecap="round" />
    <path d="M 12 -90 Q 60 -130 90 -100 Q 60 -70 12 -90 Z" fill="#6BBF59" {...O} strokeWidth={5} />
    <path d="M 0 -60 Q -40 -90 -90 -60 Q -140 -20 -110 60 Q -80 130 -30 120 Q 0 110 30 120 Q 80 130 110 60 Q 140 -20 90 -60 Q 40 -90 0 -60 Z" fill={color} {...O} />
    <path d="M -70 -30 Q -90 0 -80 30" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.5} />
  </G>
);

export const Gear: React.FC<P & {rot?: number; color?: string}> = ({rot = 0, color = C.gray, ...p}) => (
  <G {...p}>
    <g transform={`rotate(${rot})`}>
      {Array.from({length: 8}).map((_, i) => <rect key={i} x={-14} y={-78} width={28} height={30} fill={color} stroke={C.ink} strokeWidth={4} transform={`rotate(${i * 45})`} />)}
      <circle r={56} fill={color} {...O} />
      <circle r={18} fill="#fff" {...O} strokeWidth={4} />
    </g>
  </G>
);

export const Cobweb: React.FC<P> = (p) => (
  <G {...p}>
    {[0, 30, 60, 90].map((a) => <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 120} y2={Math.sin((a * Math.PI) / 180) * 120} stroke="#9AA5B1" strokeWidth={3} />)}
    {[40, 75, 110].map((r) => <path key={r} d={`M ${r} 0 Q ${r * 0.8} ${r * 0.4} ${r * 0.87} ${r * 0.5} Q ${r * 0.55} ${r * 0.62} ${r * 0.5} ${r * 0.87} Q ${r * 0.3} ${r * 0.85} 0 ${r}`} fill="none" stroke="#9AA5B1" strokeWidth={3} />)}
  </G>
);

export const Hanger: React.FC<{x: number; y: number; w: number}> = ({x, y, w}) => (
  <g>
    <rect x={x - w / 2} y={y - 12} width={w} height={24} rx={12} fill={C.woodDark} stroke={C.ink} strokeWidth={5} />
  </g>
);

export const Seg: React.FC<{x: number; y: number; w: number; h: number; color: string; on: number; label: string; value: string; icon?: React.ReactNode}> = ({x, y, w, h, color, on, label, value, icon}) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={0} y={-h / 2} width={w} height={h} fill={on > 0.5 ? color : '#E4DCCB'} stroke={C.ink} strokeWidth={6} />
    <text x={w / 2} y={4} fontFamily={FONT} fontWeight={700} fontSize={w < 140 ? 34 : 50} fill={on > 0.5 ? '#fff' : '#9C9383'} textAnchor="middle" dominantBaseline="middle" stroke={on > 0.5 ? C.ink : 'none'} strokeWidth={on > 0.5 ? 5 : 0} paintOrder="stroke">{on > 0.5 ? value : '?'}</text>
    <text x={w / 2} y={h / 2 + 40} fontFamily={FONT} fontWeight={600} fontSize={28} fill={on > 0.5 ? C.ink : '#9C9383'} textAnchor="middle" dominantBaseline="middle">{label}</text>
    {icon && <g transform={`translate(${w / 2},${-h / 2 - 80})`} opacity={0.35 + 0.65 * on}>{icon}</g>}
  </g>
);
