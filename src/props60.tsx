import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

// Big betting-app phone. Screen area: x -150..150, y -230..250 (children drawn in that space).
export const AppPhone: React.FC<P & {title?: string; color?: string}> = ({title = 'BET APP', color = C.green, children, ...p}) => (
  <G {...p}>
    <rect x={-180 + 12} y={-320 + 14} width={360} height={640} rx={46} fill="rgba(35,35,43,0.14)" />
    <rect x={-180} y={-320} width={360} height={640} rx={46} fill="#2E3440" {...O} />
    <rect x={-160} y={-296} width={320} height={576} rx={24} fill="#F7FAFD" />
    <path d="M -160 -272 Q -160 -296 -136 -296 L 136 -296 Q 160 -296 160 -272 L 160 -236 L -160 -236 Z" fill={color} />
    <Text y={-264} size={30} color="#fff" ls={4}>{title}</Text>
    {children}
    <rect x={-40} y={294} width={80} height={10} rx={5} fill="#555" />
  </G>
);

// Lock-screen style notification banner.
export const Banner: React.FC<P & {title: string; body: string; color?: string; w?: number}> = ({title, body, color = C.red, w = 520, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 8} y={-70 + 10} width={w} height={140} rx={28} fill="rgba(35,35,43,0.18)" />
    <rect x={-w / 2} y={-70} width={w} height={140} rx={28} fill="#fff" {...O} />
    <rect x={-w / 2 + 22} y={-44} width={88} height={88} rx={20} fill={color} stroke={C.ink} strokeWidth={5} />
    <Text x={-w / 2 + 66} y={4} size={52} color="#fff">!</Text>
    <Text x={-w / 2 + 134} y={-22} size={30} anchor="start" color="#5B6470">{title}</Text>
    <Text x={-w / 2 + 134} y={26} size={44} anchor="start" color={color}>{body}</Text>
  </G>
);

// Pizza shop sign: huge FREE PIZZA, tiny print that can grow (fine = 0..1).
export const PizzaSign: React.FC<P & {fine?: number}> = ({fine = 0, ...p}) => (
  <G {...p}>
    <line x1={-200} y1={160} x2={-200} y2={330} stroke={C.ink} strokeWidth={14} />
    <line x1={200} y1={160} x2={200} y2={330} stroke={C.ink} strokeWidth={14} />
    <rect x={-330} y={-180} width={660} height={350} rx={26} fill={C.yellow} {...O} />
    <g transform="translate(-200,-40)">
      <path d="M 0 -80 L 70 60 L -70 60 Z" fill="#F4C27A" {...O} />
      <path d="M -60 40 Q 0 70 60 40" fill="none" stroke="#D9822B" strokeWidth={10} />
      {[[-12, 0], [18, 30], [-26, 34]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={10} fill={C.red} stroke={C.ink} strokeWidth={3} />)}
    </g>
    <Text x={90} y={-70} size={92} color={C.red}>FREE</Text>
    <Text x={90} y={20} size={92} color={C.red}>PIZZA!</Text>
    <g transform={`translate(0,120) scale(${0.35 + 0.65 * fine})`}>
      <rect x={-300} y={-30} width={600} height={60} rx={10} fill={fine > 0.5 ? '#fff' : 'none'} stroke={fine > 0.5 ? C.ink : 'none'} strokeWidth={4} />
      <Text y={2} size={30} color={C.ink}>1 free slice per 5 pizzas you buy</Text>
    </g>
  </G>
);

// Carnival token.
export const Token: React.FC<P> = (p) => (
  <G {...p}>
    <circle r={150} fill="#C9A0DC" {...O} />
    <circle r={118} fill="none" stroke="#8E5BA8" strokeWidth={8} strokeDasharray="20 14" />
    <Text y={-24} size={52} color="#5E2D79">PLAY</Text>
    <Text y={36} size={44} color="#5E2D79">TOKEN</Text>
  </G>
);

// Stack of shrimp plates (n plates).
export const PlateStack: React.FC<P & {n?: number}> = ({n = 8, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => (
      <g key={i} transform={`translate(${(i % 2) * 8 - 4},${-i * 26})`}>
        <ellipse cx={0} cy={0} rx={110} ry={26} fill="#fff" {...O} strokeWidth={5} />
      </g>
    ))}
    <g transform={`translate(0,${-n * 26 - 10})`}>
      {[-50, 0, 50].map((x) => <path key={x} d={`M ${x - 26} 0 Q ${x} -40 ${x + 26} -6 Q ${x + 6} -16 ${x - 6} 2 Z`} fill="#F7A072" stroke={C.ink} strokeWidth={4} />)}
    </g>
  </G>
);

// Salad bowl.
export const Salad: React.FC<P> = (p) => (
  <G {...p}>
    {[[-40, -30], [0, -46], [40, -30], [-16, -20], [22, -18]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={30} fill={i % 2 ? C.greenLight : C.green} stroke={C.ink} strokeWidth={4} />)}
    <path d="M -100 -10 L 100 -10 Q 90 70 0 76 Q -90 70 -100 -10 Z" fill="#fff" {...O} />
  </G>
);

// Fishing hook with a $1,000 bill as bait.
export const BaitHook: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <line x1={0} y1={-420} x2={0} y2={-60} stroke={C.ink} strokeWidth={5} />
    <g transform={`rotate(${Math.sin(f / 14) * 4})`}>
      <path d="M 0 -60 L 0 60 Q 0 120 -50 120 Q -100 120 -100 70 L -86 84" fill="none" stroke="#7B8794" strokeWidth={14} strokeLinecap="round" />
      <path d="M 0 -60 L 0 60 Q 0 120 -50 120 Q -100 120 -100 70 L -86 84" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" opacity={0.4} />
      <g transform="translate(-40,70) rotate(-12)">
        <rect x={-150} y={-60} width={300} height={120} rx={10} fill="#9EDDB0" {...O} />
        <Text y={4} size={58} color="#1E8F5B">$1,000</Text>
      </g>
    </g>
  </G>
);

// Paper napkin with handwritten lines (lines appear when shown).
export const Napkin: React.FC<P & {lines: {t: string; c?: string; on: boolean}[]}> = ({lines, ...p}) => (
  <G {...p}>
    <rect x={-340 + 12} y={-260 + 14} width={680} height={520} fill="rgba(35,35,43,0.12)" />
    <rect x={-340} y={-260} width={680} height={520} fill="#FFFDF6" {...O} />
    <path d="M -340 -200 Q -300 -210 -260 -200 T -180 -200 T -100 -200" fill="none" stroke="#E6DCC8" strokeWidth={4} />
    {lines.map((l, i) => (
      <text key={i} x={0} y={-130 + i * 120} fontFamily={HAND} fontSize={96} fontWeight={700} fill={l.on ? l.c ?? C.ink : '#E8E1D2'} textAnchor="middle" dominantBaseline="middle">{l.t}</text>
    ))}
  </G>
);

// Odds slip: risk X, win Y.
export const Slip: React.FC<P & {rows: [string, string, string?][]; title?: string; w?: number}> = ({rows, title = 'BET SLIP', w = 560, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 10} y={-40 + 12} width={w} height={rows.length * 90 + 90} rx={22} fill="rgba(35,35,43,0.12)" />
    <rect x={-w / 2} y={-40} width={w} height={rows.length * 90 + 90} rx={22} fill="#fff" {...O} />
    <path d={`M ${-w / 2 + 22} -40 L ${w / 2 - 22} -40 Q ${w / 2} -40 ${w / 2} -18 L ${w / 2} 30 L ${-w / 2} 30 L ${-w / 2} -18 Q ${-w / 2} -40 ${-w / 2 + 22} -40 Z`} fill={C.navy} />
    <Text y={-4} size={32} color="#fff" ls={4}>{title}</Text>
    {rows.map(([a, b, c], i) => (
      <g key={i} transform={`translate(0,${80 + i * 90})`}>
        <text x={-w / 2 + 30} y={0} fontFamily={FONT} fontWeight={600} fontSize={36} fill="#5B6470" dominantBaseline="middle">{a}</text>
        <text x={w / 2 - 30} y={0} fontFamily={FONT} fontWeight={700} fontSize={46} fill={c ?? C.ink} textAnchor="end" dominantBaseline="middle">{b}</text>
      </g>
    ))}
  </G>
);
