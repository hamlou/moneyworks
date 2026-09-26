import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const Jet: React.FC<P & {livery?: string; name?: string}> = ({livery = C.blue, name = 'DAVE AIR', ...p}) => (
  <G {...p}>
    <path d="M -330 -40 L -380 -170 L -320 -170 L -230 -40 Z" fill={livery} {...O} />
    <path d="M -380 10 Q -380 -60 -300 -60 L 300 -60 Q 400 -60 420 0 Q 400 50 300 50 L -330 50 Q -380 50 -380 10 Z" fill="#fff" {...O} />
    <path d="M -380 20 L 420 8 Q 410 40 300 50 L -330 50 Q -380 50 -380 20 Z" fill={livery} {...O} strokeWidth={0} />
    <path d="M -380 10 Q -380 -60 -300 -60 L 300 -60 Q 400 -60 420 0 Q 400 50 300 50 L -330 50 Q -380 50 -380 10 Z" fill="none" {...O} />
    <path d="M 330 -40 Q 380 -40 395 -10 L 340 -10 Z" fill="#8FD3F5" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    {Array.from({length: 12}).map((_, i) => <circle key={i} cx={-260 + i * 48} cy={-22} r={11} fill="#8FD3F5" stroke={C.ink} strokeWidth={3} />)}
    <path d="M -20 20 L -150 150 L -80 150 L 90 20 Z" fill="#DDE3E9" {...O} />
    <rect x={-120} y={80} width={90} height={40} rx={20} fill="#B8C2CC" {...O} strokeWidth={5} />
    <text x={230} y={34} fontFamily={FONT} fontWeight={700} fontSize={34} fill="#fff" textAnchor="middle" letterSpacing={4}>{name}</text>
  </G>
);

export const Biplane: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-70} width={340} height={20} rx={8} fill="#E9DDC4" {...O} strokeWidth={5} />
    <rect x={-170} y={30} width={340} height={20} rx={8} fill="#E9DDC4" {...O} strokeWidth={5} />
    {[-120, 120].map((x) => <line key={x} x1={x} y1={-50} x2={x} y2={30} stroke={C.ink} strokeWidth={5} />)}
    <path d="M -40 -10 L 200 -10 L 230 -40 L 240 20 L -40 20 Z" fill="#C9B79A" {...O} strokeWidth={5} />
    <g transform={`translate(-50,5) scale(1,${Math.abs(Math.cos(f * 0.9))})`}>
      <rect x={-8} y={-70} width={16} height={140} rx={8} fill="#8C5A33" stroke={C.ink} strokeWidth={4} />
    </g>
  </G>
);

export const MilesCard: React.FC<P & {miles: string; label?: string; color?: string}> = ({miles, label = 'DAVE · MILES', color = C.navy, ...p}) => (
  <G {...p}>
    <rect x={-230} y={-140} width={460} height={280} rx={30} fill={color} {...O} />
    <path d="M -150 -80 L -40 -80 L 20 -110 L 30 -95 L -10 -75 L 60 -75" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
    <Text y={-20} size={32} color="#C9D6E6" ls={4}>{label}</Text>
    <Text y={50} size={80} color={C.yellow}>{miles}</Text>
  </G>
);

export const Egg: React.FC<P & {label?: string; gold?: boolean}> = ({label = 'MILES', gold, ...p}) => (
  <G {...p}>
    <path d="M 0 -70 Q 52 -70 56 10 Q 58 70 0 72 Q -58 70 -56 10 Q -52 -70 0 -70 Z" fill={gold ? C.gold : '#FFF7E6'} {...O} strokeWidth={5} />
    <text x={0} y={16} fontFamily={FONT} fontWeight={700} fontSize={24} fill={gold ? '#8A6A1E' : C.ink} textAnchor="middle">{label}</text>
  </G>
);

export const Suitcase: React.FC<P & {color?: string; tag?: string}> = ({color = C.red, tag, ...p}) => (
  <G {...p}>
    <path d="M -40 -110 L -40 -140 L 40 -140 L 40 -110" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <rect x={-110} y={-110} width={220} height={220} rx={24} fill={color} {...O} />
    {[-50, 50].map((x) => <line key={x} x1={x} y1={-110} x2={x} y2={110} stroke={C.ink} strokeWidth={5} opacity={0.5} />)}
    {[-70, 70].map((x) => <circle key={x} cx={x} cy={124} r={14} fill={C.ink} />)}
    {tag && (
      <g transform="translate(120,-60) rotate(12)">
        <rect x={0} y={-30} width={150} height={60} rx={10} fill={C.yellow} {...O} strokeWidth={4} />
        <text x={75} y={10} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.ink} textAnchor="middle">{tag}</text>
      </g>
    )}
  </G>
);

export const Seat: React.FC<P & {color?: string; label?: string}> = ({color = C.blue, label, ...p}) => (
  <G {...p}>
    <rect x={-70} y={-200} width={140} height={210} rx={30} fill={color} {...O} />
    <rect x={-90} y={0} width={180} height={60} rx={20} fill={color} {...O} />
    <rect x={-60} y={-190} width={120} height={50} rx={16} fill="#fff" opacity={0.6} />
    <line x1={-60} y1={60} x2={-60} y2={110} stroke={C.ink} strokeWidth={8} />
    <line x1={60} y1={60} x2={60} y2={110} stroke={C.ink} strokeWidth={8} />
    {label && <Text y={-100} size={44} color="#fff">{label}</Text>}
  </G>
);

export const FuelDrop: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M 0 -90 Q 70 0 60 40 Q 50 90 0 90 Q -50 90 -60 40 Q -70 0 0 -90 Z" fill="#2E3440" {...O} />
    <path d="M -30 30 Q -30 60 -5 70" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.5} />
  </G>
);

export const SlicePie: React.FC<P & {slices: {v: number; c: string; l?: string}[]; t?: number; pop?: number; rad?: number}> = ({slices, t = 1, pop = -1, rad = 260, ...p}) => {
  let a0 = -Math.PI / 2;
  return (
    <G {...p}>
      {slices.map((s, i) => {
        const a1 = a0 + s.v * Math.PI * 2 * t;
        const m = (a0 + a1) / 2;
        const off = i === pop ? 34 : 0;
        const ox = Math.cos(m) * off;
        const oy = Math.sin(m) * off;
        const d = `M ${ox} ${oy} L ${ox + Math.cos(a0) * rad} ${oy + Math.sin(a0) * rad} A ${rad} ${rad} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${ox + Math.cos(a1) * rad} ${oy + Math.sin(a1) * rad} Z`;
        const lx = ox + Math.cos(m) * rad * 0.62;
        const ly = oy + Math.sin(m) * rad * 0.62;
        a0 = a1;
        return (
          <g key={i}>
            <path d={d} fill={s.c} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            {s.l && t > 0.95 && <Text x={lx} y={ly} size={rad * 0.13} color="#fff" stroke={C.ink} sw={5}>{s.l}</Text>}
          </g>
        );
      })}
    </G>
  );
};

export const PriceBoard: React.FC<P & {rows: [string, string][]; title?: string; hl?: number}> = ({rows, title = 'DEPARTURES', hl = -1, ...p}) => (
  <G {...p}>
    <rect x={-420} y={-60 - rows.length * 45} width={840} height={rows.length * 90 + 120} rx={20} fill="#1F2A36" {...O} />
    <text x={0} y={-10 - rows.length * 45} fontFamily="monospace" fontWeight={700} fontSize={40} fill="#FFD166" textAnchor="middle" dominantBaseline="middle">{title}</text>
    {rows.map(([a, b], i) => (
      <g key={i} transform={`translate(0,${50 - rows.length * 45 + i * 90})`}>
        {i === hl && <rect x={-400} y={-38} width={800} height={76} rx={10} fill="#34465A" />}
        <text x={-370} y={0} fontFamily="monospace" fontWeight={700} fontSize={40} fill="#C9D6E6" dominantBaseline="middle">{a}</text>
        <text x={370} y={0} fontFamily="monospace" fontWeight={700} fontSize={44} fill={i === hl ? '#6EF0A8' : '#fff'} textAnchor="end" dominantBaseline="middle">{b}</text>
      </g>
    ))}
  </G>
);

export const Cactus: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -20 0 L -20 -160 Q -20 -190 0 -190 Q 20 -190 20 -160 L 20 0 Z" fill="#6BBF59" {...O} strokeWidth={5} />
    <path d="M -20 -80 L -50 -80 Q -64 -80 -64 -100 L -64 -130" fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
    <path d="M -20 -80 L -50 -80 Q -64 -80 -64 -100 L -64 -130" fill="none" stroke="#6BBF59" strokeWidth={12} strokeLinecap="round" />
  </G>
);

export const Warehouse: React.FC<P & {name?: string}> = ({name = 'WAREHOUSE', ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={6} rx={520} ry={18} fill="rgba(35,35,43,0.10)" />
    <rect x={-480} y={-360} width={960} height={360} fill="#E3E7EC" {...O} />
    <rect x={-480} y={-360} width={960} height={90} fill={C.red} {...O} />
    <text x={0} y={-300} fontFamily={FONT} fontWeight={700} fontSize={58} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={6}>{name}</text>
    <rect x={-120} y={-200} width={240} height={200} fill="#9BC7E0" {...O} />
    <line x1={0} y1={-200} x2={0} y2={0} stroke={C.ink} strokeWidth={5} />
    {[-360, -240, 240, 360].map((x) => <rect key={x} x={x - 40} y={-220} width={80} height={60} rx={6} fill="#C9D1DA" stroke={C.ink} strokeWidth={4} />)}
  </G>
);

export const HotDog: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -130 0 Q -130 -50 -80 -50 L 80 -50 Q 130 -50 130 0 Q 130 40 80 40 L -80 40 Q -130 40 -130 0 Z" fill="#E9C27A" {...O} />
    <path d="M -150 -10 Q -150 -38 -120 -38 L 120 -38 Q 150 -38 150 -10 Q 150 16 120 16 L -120 16 Q -150 16 -150 -10 Z" fill="#C0533A" {...O} strokeWidth={5} />
    <path d="M -110 -14 q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" />
  </G>
);

export const Soda: React.FC<P> = (p) => (
  <G {...p}>
    <line x1={20} y1={-150} x2={0} y2={-80} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
    <path d="M -50 -90 L 50 -90 L 38 80 L -38 80 Z" fill="#fff" {...O} />
    <rect x={-54} y={-100} width={108} height={20} rx={8} fill="#D3DEE3" {...O} strokeWidth={4} />
    <path d="M -44 -20 L 44 -20 L 40 30 L -40 30 Z" fill={C.red} />
  </G>
);

export const Chicken: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-20} width={300} height={70} rx={20} fill="#2E3440" {...O} strokeWidth={5} />
    <path d="M -110 -10 Q -120 -110 0 -115 Q 120 -110 110 -10 Z" fill="#C98F5E" {...O} />
    <path d="M 90 -60 Q 150 -90 160 -50 Q 150 -30 110 -40" fill="#C98F5E" {...O} strokeWidth={5} />
    <path d="M -90 -60 Q -150 -90 -160 -50 Q -150 -30 -110 -40" fill="#C98F5E" {...O} strokeWidth={5} />
    <path d="M -50 -80 Q -20 -95 10 -85" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.5} />
    <path d="M -110 -10 Q -120 60 0 60 Q 120 60 110 -10" fill="rgba(255,255,255,0.35)" stroke={C.ink} strokeWidth={5} />
    {price && <Text y={120} size={46}>{price}</Text>}
  </G>
);

export const MemberCard: React.FC<P & {tier?: string; price?: string; color?: string}> = ({tier = 'GOLD STAR', price = '$65/yr', color = '#1D4E9E', ...p}) => (
  <G {...p}>
    <rect x={-220} y={-135} width={440} height={270} rx={24} fill="#fff" {...O} />
    <rect x={-220} y={-135} width={440} height={80} rx={24} fill={color} {...O} />
    <rect x={-216} y={-80} width={432} height={20} fill={color} />
    <Text y={-95} size={36} color="#fff" ls={4}>MEMBER</Text>
    <circle cx={-140} cy={20} r={48} fill="#D3DEE3" stroke={C.ink} strokeWidth={4} />
    <circle cx={-140} cy={8} r={16} fill={C.ink} />
    <path d="M -168 50 Q -140 26 -112 50" fill={C.ink} />
    <Text x={50} y={0} size={36}>{tier}</Text>
    <Text x={50} y={60} size={44} color={C.green}>{price}</Text>
  </G>
);

export const Pallet: React.FC<P & {color?: string; label?: string}> = ({color = '#F4D6B8', label, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-10} width={300} height={30} fill="#C98F5E" {...O} strokeWidth={5} />
    {[-110, 0, 110].map((x) => <rect key={x} x={x - 20} y={20} width={40} height={20} fill="#A8744A" stroke={C.ink} strokeWidth={4} />)}
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-140 + c * 94} y={-100 - r * 90} width={90} height={90} fill={color} stroke={C.ink} strokeWidth={4} />))}
    {label && <Text y={-150} size={36}>{label}</Text>}
  </G>
);

export const Receipt: React.FC<P & {lines: [string, string][]; total: string; shown?: number}> = ({lines, total, shown = 99, ...p}) => (
  <G {...p}>
    <path d={`M -200 -260 L 200 -260 L 200 ${lines.length * 60 - 60} ${Array.from({length: 10}).map((_, i) => `L ${200 - (i + 0.5) * 40} ${lines.length * 60 - 40} L ${200 - (i + 1) * 40} ${lines.length * 60 - 60}`).join(' ')} Z`} fill="#fff" {...O} strokeWidth={5} />
    <Text y={-215} size={34} color="#5B6470">RECEIPT</Text>
    {lines.slice(0, shown).map(([a, b], i) => (
      <g key={i}>
        <Text x={-170} y={-150 + i * 50} size={30} anchor="start">{a}</Text>
        <Text x={170} y={-150 + i * 50} size={30} anchor="end">{b}</Text>
      </g>
    ))}
    {shown >= lines.length && <Text x={0} y={-150 + lines.length * 50 + 10} size={46} color={C.red}>{total}</Text>}
  </G>
);

export const Cart: React.FC<P & {items: number}> = ({items, ...p}) => (
  <G {...p}>
    {Array.from({length: items}).map((_, i) => (
      <rect key={i} x={-110 + (i % 4) * 55} y={-130 - Math.floor(i / 4) * 50} width={50} height={46} rx={6} fill={[C.red, C.blue, C.yellow, C.green][i % 4]} stroke={C.ink} strokeWidth={4} />
    ))}
    <path d="M -180 -160 L -140 -160 L -110 0 L 120 0 L 150 -120 L -125 -120" fill="none" stroke={C.ink} strokeWidth={10} strokeLinejoin="round" />
    <circle cx={-90} cy={40} r={20} fill={C.ink} />
    <circle cx={100} cy={40} r={20} fill={C.ink} />
  </G>
);

export const Bottle: React.FC<P & {color?: string; label?: string}> = ({color = C.red, label, ...p}) => (
  <G {...p}>
    <rect x={-16} y={-120} width={32} height={30} rx={6} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <path d="M -40 -90 L 40 -90 L 46 80 Q 46 96 30 96 L -30 96 Q -46 96 -46 80 Z" fill={color} {...O} strokeWidth={5} />
    {label && <Text y={10} size={22} color="#fff">{label}</Text>}
  </G>
);
