import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';
import {Svg, W, H} from './fx';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
const GREEN = '#1E9E5A';
const BLACK = '#2E3440';
const FELT = '#1F7A4D';

export const CasinoBg: React.FC<{f: number}> = ({f}) => (
  <Svg>
    <defs>
      <pattern id="carpet17" width="120" height="120" patternUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="#8E2B3A" />
        <circle cx="30" cy="30" r="18" fill="#C9A13A" opacity={0.55} />
        <path d="M 90 60 q 20 -30 0 -50 q -20 20 0 50 Z" fill="#2E6FA8" opacity={0.6} />
        <path d="M 10 100 l 30 -20 l 20 30 Z" fill="#E7B04A" opacity={0.5} />
        <circle cx="95" cy="100" r="8" fill="#F2E1B8" opacity={0.6} />
      </pattern>
    </defs>
    <rect x={-400} y={-300} width={W + 800} height={H + 600} fill="#3B1830" />
    <rect x={-400} y={-300} width={W + 800} height={420} fill="#2A1024" />
    {Array.from({length: 24}).map((_, i) => (
      <circle key={i} cx={-40 + i * 90} cy={90} r={14} fill={(i + Math.floor(f / 8)) % 3 === 0 ? '#FFE08A' : '#B98A3A'} stroke={C.ink} strokeWidth={3} />
    ))}
    <rect x={-400} y={760} width={W + 800} height={H + 300} fill="url(#carpet17)" />
    <rect x={-400} y={752} width={W + 800} height={12} fill={C.ink} />
  </Svg>
);

export const RouletteWheel: React.FC<P & {spin?: number; hl?: 'green' | 'red' | 'none'; ball?: number}> = ({spin = 0, hl = 'none', ball, ...p}) => {
  const n = 38;
  const R = 300;
  const r0 = 180;
  const cols = Array.from({length: n}).map((_, i) => (i === 0 || i === 19 ? GREEN : i % 2 ? C.red : BLACK));
  return (
    <G {...p}>
      <circle r={R + 50} fill="#8C5A33" {...O} />
      <circle r={R + 20} fill="#C98F5E" {...O} strokeWidth={4} />
      <g transform={`rotate(${spin})`}>
        {cols.map((c, i) => {
          const a0 = (i / n) * Math.PI * 2;
          const a1 = ((i + 1) / n) * Math.PI * 2;
          const d = `M ${Math.cos(a0) * r0} ${Math.sin(a0) * r0} L ${Math.cos(a0) * R} ${Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${Math.cos(a1) * R} ${Math.sin(a1) * R} L ${Math.cos(a1) * r0} ${Math.sin(a1) * r0} A ${r0} ${r0} 0 0 0 ${Math.cos(a0) * r0} ${Math.sin(a0) * r0} Z`;
          const dim = hl === 'green' ? (c === GREEN ? 1 : 0.35) : hl === 'red' ? (c === C.red ? 1 : 0.35) : 1;
          return <path key={i} d={d} fill={c} opacity={dim} stroke="#F2E1B8" strokeWidth={3} />;
        })}
        {[0, 19].map((i) => {
          const a = ((i + 0.5) / n) * 360;
          return (
            <g key={i} transform={`rotate(${a}) translate(${(R + r0) / 2},0) rotate(90)`}>
              <text x={0} y={0} fontFamily={FONT} fontWeight={700} fontSize={26} fill="#fff" textAnchor="middle" dominantBaseline="middle">{i === 0 ? '0' : '00'}</text>
            </g>
          );
        })}
        <circle r={r0} fill="#C98F5E" {...O} strokeWidth={5} />
        {[0, 90, 180, 270].map((a) => <rect key={a} x={-12} y={-150} width={24} height={150} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={4} transform={`rotate(${a})`} />)}
        <circle r={40} fill={C.gold} {...O} strokeWidth={5} />
      </g>
      {ball !== undefined && <circle cx={Math.cos(ball) * (R - 30)} cy={Math.sin(ball) * (R - 30)} r={16} fill="#fff" stroke={C.ink} strokeWidth={4} />}
    </G>
  );
};

export const Chip: React.FC<P & {color?: string; label?: string}> = ({color = C.red, label, ...p}) => (
  <G {...p}>
    <circle r={70} fill={color} {...O} />
    {Array.from({length: 8}).map((_, i) => (
      <rect key={i} x={-10} y={-70} width={20} height={22} fill="#fff" transform={`rotate(${i * 45})`} />
    ))}
    <circle r={70} fill="none" {...O} />
    <circle r={46} fill="#fff" stroke={C.ink} strokeWidth={4} />
    {label && <Text y={2} size={label.length > 3 ? 26 : 34} color={color}>{label}</Text>}
  </G>
);

export const ChipStack: React.FC<P & {n?: number; color?: string}> = ({n = 6, color = C.red, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => (
      <g key={i} transform={`translate(${(i % 2) * 4},${-i * 22})`}>
        <ellipse cx={0} cy={10} rx={70} ry={22} fill={color} {...O} strokeWidth={5} />
        <rect x={-70} y={-8} width={140} height={18} fill={color} />
        <ellipse cx={0} cy={-8} rx={70} ry={22} fill={color} {...O} strokeWidth={5} />
        {[-40, 0, 40].map((x) => <rect key={x} x={x - 7} y={0} width={14} height={16} fill="#fff" />)}
      </g>
    ))}
  </G>
);

const Sym: React.FC<{k: string}> = ({k}) =>
  k === 'cherry' ? (
    <g>
      <path d="M -20 10 Q -10 -40 20 -50 M 20 10 Q 16 -30 20 -50" fill="none" stroke="#3E8E4A" strokeWidth={6} strokeLinecap="round" />
      <circle cx={-22} cy={18} r={22} fill={C.red} stroke={C.ink} strokeWidth={4} />
      <circle cx={22} cy={18} r={22} fill={C.red} stroke={C.ink} strokeWidth={4} />
    </g>
  ) : k === 'bar' ? (
    <g>
      <rect x={-60} y={-26} width={120} height={52} rx={8} fill={BLACK} stroke={C.ink} strokeWidth={4} />
      <text x={0} y={3} fontFamily={FONT} fontWeight={700} fontSize={34} fill="#fff" textAnchor="middle" dominantBaseline="middle">BAR</text>
    </g>
  ) : (
    <text x={0} y={6} fontFamily={FONT} fontWeight={700} fontSize={110} fill={C.red} stroke={C.ink} strokeWidth={5} paintOrder="stroke" textAnchor="middle" dominantBaseline="middle">{k}</text>
  );

export const SlotMachine: React.FC<P & {reels?: string[]; off?: number[]; lever?: number; lit?: number; label?: string}> = ({reels = ['7', '7', '7'], off = [0, 0, 0], lever = 0, lit = 0, label = 'JACKPOT', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-380} width={520} height={120} rx={40} fill={C.gold} {...O} />
    <Text y={-320} size={58} color={lit ? '#fff' : C.ink} stroke={lit ? C.red : undefined} sw={lit ? 8 : 0}>{label}</Text>
    <rect x={-280} y={-270} width={560} height={560} rx={36} fill={C.red} {...O} />
    <rect x={-240} y={-220} width={480} height={240} rx={20} fill="#fff" {...O} />
    <clipPath id="slotwin17">
      <rect x={-236} y={-216} width={472} height={232} rx={18} />
    </clipPath>
    <g clipPath="url(#slotwin17)">
      {reels.map((k, i) => (
        <g key={i} transform={`translate(${-160 + i * 160},${-100 - (off[i] ?? 0)})`}>
          <Sym k={k} />
          <g transform="translate(0,150)"><Sym k="cherry" /></g>
          <g transform="translate(0,-150)"><Sym k="bar" /></g>
        </g>
      ))}
    </g>
    {[-80, 80].map((x) => <line key={x} x1={x} y1={-220} x2={x} y2={20} stroke={C.ink} strokeWidth={5} />)}
    <line x1={-250} y1={-100} x2={250} y2={-100} stroke={C.red} strokeWidth={6} strokeDasharray="16 10" opacity={0.8} />
    <rect x={-200} y={70} width={400} height={70} rx={14} fill="#2E3440" {...O} strokeWidth={5} />
    <rect x={-120} y={180} width={240} height={60} rx={12} fill={C.gold} {...O} strokeWidth={5} />
    <g transform={`translate(300,-120) rotate(${lever * 60})`}>
      <line x1={0} y1={0} x2={0} y2={-200} stroke="#9AA5B1" strokeWidth={16} strokeLinecap="round" />
      <circle cx={0} cy={-210} r={34} fill={C.red} {...O} />
    </g>
  </G>
);

export const PlayingCard: React.FC<P & {rank: string; suit: 'h' | 's'; back?: boolean}> = ({rank, suit, back, ...p}) => (
  <G {...p}>
    <rect x={-90} y={-130} width={180} height={260} rx={18} fill={back ? C.blue : '#fff'} {...O} />
    {back ? (
      <rect x={-66} y={-106} width={132} height={212} rx={10} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="14 10" />
    ) : (
      <g>
        <Text x={-54} y={-92} size={46} color={suit === 'h' ? C.red : C.ink}>{rank}</Text>
        <g transform="scale(1.6)">
          {suit === 'h' ? (
            <path d="M 0 30 L -34 -4 Q -48 -24 -30 -36 Q -12 -44 0 -24 Q 12 -44 30 -36 Q 48 -24 34 -4 Z" fill={C.red} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          ) : (
            <g>
              <path d="M 0 -40 L 34 0 Q 48 20 30 30 Q 12 36 0 18 Q -12 36 -30 30 Q -48 20 -34 0 Z" fill={C.ink} />
              <path d="M 0 10 L 12 40 L -12 40 Z" fill={C.ink} />
            </g>
          )}
        </g>
      </g>
    )}
  </G>
);

export const Cocktail: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -80 -100 L 80 -100 L 0 0 Z" fill="#FF9EC0" {...O} />
    <path d="M -64 -86 L 64 -86" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
    <line x1={0} y1={0} x2={0} y2={90} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M -50 96 L 50 96" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <circle cx={50} cy={-110} r={20} fill={C.yellow} {...O} strokeWidth={4} />
    <line x1={-30} y1={-150} x2={10} y2={-60} stroke={C.red} strokeWidth={6} strokeLinecap="round" />
  </G>
);

export const BigCoin: React.FC<P & {side: 'H' | 'T'; flip?: number}> = ({side, flip = 1, ...p}) => (
  <G {...p}>
    <g transform={`scale(1,${Math.max(0.06, Math.abs(flip))})`}>
      <circle r={110} fill={C.gold} {...O} />
      <circle r={82} fill="none" stroke="#E0A91F" strokeWidth={8} />
      <Text y={4} size={100} color="#B7830F">{side}</Text>
    </g>
  </G>
);

export const Brain: React.FC<P & {glow?: number}> = ({glow = 0, ...p}) => (
  <G {...p}>
    {glow > 0 && <circle cx={20} cy={20} r={60 + glow * 60} fill={C.yellow} opacity={0.5 * glow} />}
    <path d="M -150 20 Q -170 -80 -80 -110 Q -30 -160 40 -120 Q 130 -130 150 -40 Q 180 40 110 80 Q 60 120 -10 100 Q -110 110 -150 20 Z" fill="#F7B3C2" {...O} />
    <path d="M -90 -60 Q -50 -30 -80 10 M 0 -100 Q 20 -50 -10 -10 Q -40 30 0 70 M 70 -80 Q 40 -30 90 0 M 60 40 Q 90 60 120 40" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    {glow > 0 && <circle cx={20} cy={20} r={26} fill={C.yellow} stroke={C.ink} strokeWidth={4} />}
  </G>
);

export const BetPhone: React.FC<P & {rows?: [string, string][]; hl?: number; title?: string}> = ({rows = [['LIONS', '-110'], ['SHARKS', '-110']], hl = -1, title = 'SPORTSBOOK', ...p}) => (
  <G {...p}>
    <rect x={-150} y={-280} width={300} height={560} rx={40} fill="#2E3440" {...O} />
    <rect x={-130} y={-250} width={260} height={480} rx={18} fill="#10261C" />
    <rect x={-130} y={-250} width={260} height={70} rx={18} fill={C.green} />
    <rect x={-130} y={-200} width={260} height={20} fill={C.green} />
    <Text y={-214} size={28} color="#fff" ls={3}>{title}</Text>
    {rows.map(([a, b], i) => (
      <g key={i} transform={`translate(0,${-120 + i * 100})`}>
        <rect x={-114} y={-38} width={228} height={76} rx={14} fill={i === hl ? C.yellow : '#1F3A2C'} stroke={i === hl ? C.ink : '#3E6B55'} strokeWidth={4} />
        <text x={-96} y={2} fontFamily={FONT} fontWeight={700} fontSize={28} fill={i === hl ? C.ink : '#fff'} dominantBaseline="middle">{a}</text>
        <text x={96} y={2} fontFamily={FONT} fontWeight={700} fontSize={28} fill={i === hl ? C.ink : '#6EF0A8'} textAnchor="end" dominantBaseline="middle">{b}</text>
      </g>
    ))}
    <rect x={-100} y={140} width={200} height={60} rx={30} fill={C.green} stroke="#fff" strokeWidth={3} />
    <Text y={172} size={28} color="#fff">BET NOW</Text>
    <rect x={-40} y={250} width={80} height={10} rx={5} fill="#555" />
  </G>
);

export const NoClock: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <circle r={92} fill="#fff" {...O} />
    <line x1={0} y1={0} x2={0} y2={-50} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(f * 0.21) * 70} y2={-Math.cos(f * 0.21) * 70} stroke={C.red} strokeWidth={5} strokeLinecap="round" />
    <circle r={120} fill="none" stroke={C.red} strokeWidth={18} />
    <line x1={-85} y1={-85} x2={85} y2={85} stroke={C.red} strokeWidth={18} strokeLinecap="round" />
  </G>
);

export const Hundred: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-170} y={-80} width={340} height={160} rx={12} fill="#9EDDB0" {...O} />
    <rect x={-146} y={-58} width={292} height={116} rx={6} fill="none" stroke="#2DB77A" strokeWidth={5} />
    <circle r={46} fill="#E8F7EC" stroke="#2DB77A" strokeWidth={5} />
    <Text y={2} size={56} color="#1E8F5B">$</Text>
    <Text x={-112} y={-30} size={34} color="#1E8F5B">100</Text>
    <Text x={112} y={32} size={34} color="#1E8F5B">100</Text>
  </G>
);

export {FELT};
