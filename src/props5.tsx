import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Mixer: React.FC<P & {f: number; on?: boolean}> = ({f, on, ...p}) => (
  <G {...p}>
    <rect x={-120} y={-10} width={240} height={30} rx={10} fill="#9AA5B1" {...O} />
    <rect x={-20} y={-300} width={40} height={290} fill="#C9D1DA" {...O} />
    <rect x={-120} y={-330} width={240} height={70} rx={20} fill="#6EC3F0" {...O} />
    {[-80, 0, 80].map((x, i) => (
      <g key={x} transform={`translate(${x},${on ? Math.sin(f * 2 + i) * 2 : 0})`}>
        <line x1={0} y1={-260} x2={0} y2={-140} stroke={C.ink} strokeWidth={5} />
        <path d="M -30 -150 L 30 -150 L 22 -20 L -22 -20 Z" fill="#EEF2F5" {...O} strokeWidth={5} />
        <path d="M -26 -110 L 26 -110 L 22 -20 L -22 -20 Z" fill="#F7C6D9" />
      </g>
    ))}
  </G>
);

export const Board: React.FC<P & {hotels?: number[]; f?: number; piece?: number}> = ({hotels = [], f = 0, piece = 0, ...p}) => {
  const N = 16;
  const pos = (i: number) => {
    const side = Math.floor(i / 4);
    const k = i % 4;
    const L = 560;
    const st = L / 4;
    if (side === 0) return [-L / 2 + k * st, L / 2];
    if (side === 1) return [L / 2, L / 2 - k * st];
    if (side === 2) return [L / 2 - k * st, -L / 2];
    return [-L / 2, -L / 2 + k * st];
  };
  const cols = [C.red, C.blue, C.green, C.yellow];
  const pp = pos(Math.floor(piece) % N);
  return (
    <G {...p}>
      <rect x={-330} y={-330} width={660} height={660} rx={20} fill="#DFF2E1" {...O} />
      <rect x={-210} y={-210} width={420} height={420} rx={10} fill="#C8E8CC" stroke={C.ink} strokeWidth={4} />
      <text x={0} y={0} fontFamily={FONT} fontWeight={700} fontSize={54} fill={C.red} textAnchor="middle" dominantBaseline="middle" transform="rotate(-30)">RENT!</text>
      {Array.from({length: N}).map((_, i) => {
        const [x, y] = pos(i);
        return (
          <g key={i}>
            <rect x={x - 60} y={y - 60} width={120} height={120} fill="#fff" stroke={C.ink} strokeWidth={4} />
            <rect x={x - 60} y={y - 60} width={120} height={26} fill={cols[Math.floor(i / 4)]} stroke={C.ink} strokeWidth={4} />
            {hotels.includes(i) && (
              <g transform={`translate(${x},${y + 16})`}>
                <rect x={-34} y={-26} width={68} height={40} fill={C.red} stroke={C.ink} strokeWidth={4} />
                <path d="M -40 -26 L 0 -52 L 40 -26 Z" fill="#B3263F" stroke={C.ink} strokeWidth={4} />
                <text y={2} fontFamily={FONT} fontWeight={700} fontSize={18} fill="#fff" textAnchor="middle" dominantBaseline="middle">$$$</text>
              </g>
            )}
          </g>
        );
      })}
      <g transform={`translate(${pp[0]},${pp[1] - 20 - Math.abs(Math.sin(f / 3)) * 10})`}>
        <circle r={20} fill={C.blue} stroke={C.ink} strokeWidth={4} />
        <path d="M -14 26 L 14 26 L 8 4 L -8 4 Z" fill={C.blue} stroke={C.ink} strokeWidth={4} />
      </g>
    </G>
  );
};

export const Land: React.FC<P & {owned?: number; label?: string}> = ({owned = 0, label, ...p}) => (
  <G {...p}>
    <path d="M -180 0 L 0 -90 L 180 0 L 0 90 Z" fill={owned > 0.5 ? '#9ED9A7' : '#E6DCC4'} {...O} />
    <line x1={0} y1={0} x2={0} y2={-150} stroke={C.ink} strokeWidth={5} />
    <path d={`M 0 -150 L 70 -130 L 0 -110 Z`} fill={owned > 0.5 ? C.red : '#fff'} stroke={C.ink} strokeWidth={4} opacity={owned > 0 ? 1 : 0} />
    {label && <Text y={130} size={30} color="#5B6470">{label}</Text>}
  </G>
);

export const IceCreamMachine: React.FC<P & {f: number; broken?: boolean}> = ({f, broken = true, ...p}) => (
  <G {...p} r={(p.r ?? 0) + (broken ? Math.sin(f * 1.4) * 1.5 : 0)}>
    <rect x={-120} y={-360} width={240} height={360} rx={20} fill="#E8EEF2" {...O} />
    <rect x={-90} y={-320} width={180} height={90} rx={10} fill="#1F2A36" {...O} strokeWidth={5} />
    <text y={-272} fontFamily="monospace" fontWeight={700} fontSize={30} fill={broken ? '#FF6B6B' : '#6EF0A8'} textAnchor="middle" dominantBaseline="middle" opacity={broken && f % 20 < 10 ? 0.3 : 1}>{broken ? 'ERROR' : 'READY'}</text>
    {[-50, 50].map((x) => <rect key={x} x={x - 16} y={-200} width={32} height={60} rx={8} fill="#C9D1DA" {...O} strokeWidth={4} />)}
    {broken && <path d="M 90 -380 l 20 -30 l 10 20 l 24 -30" fill="none" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
  </G>
);

export const Fries: React.FC<P> = (p) => (
  <G {...p}>
    {[-40, -20, 0, 20, 40, -30, 30].map((x, i) => <rect key={i} x={x - 8} y={-150 + (i % 3) * 14} width={16} height={110} rx={5} fill={C.yellow} stroke={C.ink} strokeWidth={4} />)}
    <path d="M -70 -60 L 70 -60 L 56 60 L -56 60 Z" fill={C.red} {...O} />
    <path d="M -20 -10 Q 0 20 20 -10" fill="none" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" />
  </G>
);

export const Contract: React.FC<P & {lines: string[]; signed?: number}> = ({lines, signed = 0, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-280} width={440} height={560} rx={10} fill="#FFFDF5" {...O} />
    <Text y={-230} size={40} ls={4}>CONTRACT</Text>
    {lines.map((l, i) => <Text key={i} x={-180} y={-150 + i * 60} size={30} anchor="start">{'• ' + l}</Text>)}
    <line x1={-160} y1={200} x2={160} y2={200} stroke={C.ink} strokeWidth={3} />
    <path d="M -140 190 q 30 -40 50 0 t 50 -10 t 60 0" fill="none" stroke={C.blue} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - signed} />
  </G>
);

export const Corner: React.FC<P & {f: number; value?: string}> = ({f, value, ...p}) => (
  <G {...p}>
    <rect x={-400} y={-20} width={800} height={120} fill="#9AA5B1" />
    <rect x={-60} y={-400} width={120} height={500} fill="#9AA5B1" />
    {[-300, -150, 150, 300].map((x) => <rect key={x} x={x - 40} y={32} width={80} height={14} rx={6} fill="#fff" />)}
    <path d="M -380 -30 L -80 -30 L -80 -380 M 80 -380 L 80 -30 L 380 -30" fill="none" stroke={C.ink} strokeWidth={6} />
    {value && <Text x={-230} y={-200} size={56} color={C.green} stroke="#fff" sw={10}>{value}</Text>}
  </G>
);
