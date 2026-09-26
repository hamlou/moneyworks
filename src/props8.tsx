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
