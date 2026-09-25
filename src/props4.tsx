import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Cat: React.FC<P & {f: number; mood?: 'happy' | 'old' | 'shock'}> = ({f, mood = 'happy', ...p}) => {
  const blink = (f + 11) % 89 < 4;
  const tail = Math.sin(f / 10) * 14;
  return (
    <G {...p}>
      <ellipse cx={0} cy={62} rx={80} ry={10} fill="rgba(35,35,43,0.10)" />
      <g transform={`rotate(${tail},50,40)`}>
        <path d="M 50 40 Q 120 30 110 -40" fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
        <path d="M 50 40 Q 120 30 110 -40" fill="none" stroke="#F4A259" strokeWidth={12} strokeLinecap="round" />
      </g>
      <ellipse cx={10} cy={20} rx={62} ry={44} fill="#F4A259" {...O} />
      <g transform="translate(-40,-24)">
        <path d="M -40 -20 L -34 -68 L -6 -40 Z M 40 -20 L 34 -68 L 6 -40 Z" fill="#F4A259" {...O} strokeWidth={5} />
        <circle cx={0} cy={0} r={46} fill="#F4A259" {...O} />
        {mood === 'old' ? (
          <g stroke={C.ink} strokeWidth={4} strokeLinecap="round">
            <path d="M -22 -4 L -8 -4 M 8 -4 L 22 -4" />
            <path d="M -30 -20 Q -20 -26 -10 -20 M 10 -20 Q 20 -26 30 -20" stroke="#fff" />
          </g>
        ) : (
          <g>
            <ellipse cx={-15} cy={-4} rx={5} ry={blink ? 1 : mood === 'shock' ? 9 : 7} fill={C.ink} />
            <ellipse cx={15} cy={-4} rx={5} ry={blink ? 1 : mood === 'shock' ? 9 : 7} fill={C.ink} />
          </g>
        )}
        <path d="M -5 10 L 5 10 L 0 16 Z" fill="#E86A6A" />
        <path d="M 0 16 Q -8 24 -14 18 M 0 16 Q 8 24 14 18" fill="none" stroke={C.ink} strokeWidth={3} />
        <path d="M -20 12 L -52 6 M -20 16 L -52 20 M 20 12 L 52 6 M 20 16 L 52 20" stroke={C.ink} strokeWidth={2.5} />
        {mood === 'old' && <path d="M -30 34 Q 0 50 30 34" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />}
      </g>
      <path d="M -20 58 L -20 64 M 40 58 L 40 64" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
    </G>
  );
};

export const House: React.FC<P & {sold?: string; color?: string}> = ({sold, color = '#F4D6B8', ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={6} rx={330} ry={16} fill="rgba(35,35,43,0.10)" />
    <rect x={-260} y={-300} width={520} height={300} fill={color} {...O} />
    <path d="M -310 -290 L 0 -520 L 310 -290 Z" fill={C.red} {...O} />
    <rect x={150} y={-470} width={50} height={110} fill="#B85C4A" {...O} strokeWidth={5} />
    <rect x={-60} y={-180} width={120} height={180} rx={8} fill="#8C5A33" {...O} />
    <circle cx={35} cy={-90} r={7} fill={C.gold} />
    {[-180, 180].map((x) => (
      <g key={x}>
        <rect x={x - 60} y={-240} width={120} height={100} rx={6} fill="#CFE8F5" {...O} strokeWidth={5} />
        <line x1={x} y1={-240} x2={x} y2={-140} stroke={C.ink} strokeWidth={5} />
        <line x1={x - 60} y1={-190} x2={x + 60} y2={-190} stroke={C.ink} strokeWidth={5} />
      </g>
    ))}
    <circle cx={0} cy={-380} r={40} fill="#CFE8F5" {...O} strokeWidth={5} />
    {sold && (
      <g transform="translate(330,-40)">
        <rect x={-6} y={-150} width={12} height={150} fill="#8C5A33" stroke={C.ink} strokeWidth={4} />
        <rect x={-100} y={-200} width={200} height={70} rx={8} fill="#fff" stroke={C.red} strokeWidth={6} />
        <Text y={-164} size={Math.min(40, 400 / sold.length)} color={C.red}>{sold}</Text>
      </g>
    )}
  </G>
);

export const BouncyCastle: React.FC<P & {f: number; size?: number}> = ({f, size = 1, ...p}) => {
  const b = Math.sin(f / 5) * 4;
  const w = 300 * size;
  const cols = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2'];
  return (
    <G {...p}>
      <rect x={-w - 30} y={-40} width={2 * w + 60} height={60} rx={30} fill="#118AB2" {...O} />
      <rect x={-w} y={-260 * size + b} width={2 * w} height={240 * size - b} rx={30} fill="#FFD166" {...O} />
      {[-1, 1].map((sd) => (
        <g key={sd}>
          <rect x={sd * w - 50 * size} y={-380 * size + b} width={100 * size} height={360 * size} rx={40} fill={cols[sd > 0 ? 0 : 2]} {...O} />
          <circle cx={sd * w} cy={-400 * size + b} r={46 * size} fill={cols[sd > 0 ? 3 : 0]} {...O} />
        </g>
      ))}
      {Array.from({length: 5}).map((_, i) => (
        <path key={i} d={`M ${-w + 40 + i * ((2 * w - 80) / 5)} ${-260 * size + b} l ${(2 * w - 80) / 10} -60 l ${(2 * w - 80) / 10} 60`} fill={cols[i % 4]} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      ))}
      <path d={`M ${-80 * size} -20 L ${-80 * size} ${-150 * size + b} Q 0 ${-230 * size + b} ${80 * size} ${-150 * size + b} L ${80 * size} -20 Z`} fill="#fff" {...O} />
    </G>
  );
};

export const Pizza: React.FC<P & {eaten: number; bankColor?: string}> = ({eaten, bankColor = C.red, ...p}) => (
  <G {...p}>
    <circle r={200} fill="#E9B872" {...O} />
    {Array.from({length: 8}).map((_, i) => {
      const a0 = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
      const gone = i < eaten;
      const d = `M 0 0 L ${Math.cos(a0) * 180} ${Math.sin(a0) * 180} A 180 180 0 0 1 ${Math.cos(a1) * 180} ${Math.sin(a1) * 180} Z`;
      const mid = (a0 + a1) / 2;
      return (
        <g key={i} transform={gone ? `translate(${Math.cos(mid) * 30},${Math.sin(mid) * 30})` : ''}>
          <path d={d} fill={gone ? '#F6E2C0' : '#F4C95D'} stroke={C.ink} strokeWidth={4} opacity={gone ? 0.55 : 1} />
          {!gone && <circle cx={Math.cos(mid) * 110} cy={Math.sin(mid) * 110} r={16} fill="#D1495B" stroke={C.ink} strokeWidth={3} />}
          {gone && <text x={Math.cos(mid) * 115} y={Math.sin(mid) * 115} fontFamily={FONT} fontWeight={700} fontSize={34} fill={bankColor} textAnchor="middle" dominantBaseline="middle">$</text>}
        </g>
      );
    })}
  </G>
);

export const Sandwich: React.FC<P & {n?: number}> = ({n = 5, ...p}) => (
  <G {...p}>
    <path d="M -200 0 Q -200 -60 0 -60 Q 200 -60 200 0 Z" fill="#E9B872" {...O} />
    {Array.from({length: n}).map((_, i) => (
      <g key={i} transform={`translate(${(i % 2) * 8 - 4},${10 + i * 34})`}>
        <rect x={-190} y={0} width={380} height={30} rx={6} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <text x={0} y={17} fontFamily={FONT} fontWeight={700} fontSize={20} fill={C.navy} textAnchor="middle" dominantBaseline="middle">MORTGAGE</text>
      </g>
    ))}
    <path d={`M -200 ${14 + n * 34} L 200 ${14 + n * 34} Q 200 ${54 + n * 34} 0 ${54 + n * 34} Q -200 ${54 + n * 34} -200 ${14 + n * 34} Z`} fill="#E9B872" {...O} />
    <path d="M -210 -2 q 30 20 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="#6BBF59" strokeWidth={12} strokeLinecap="round" />
  </G>
);

export const Globe: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <circle r={150} fill="#8FD3F5" {...O} />
    <g transform={`translate(${((f * 1.5) % 300) - 150},0)`} opacity={0.95}>
      {[-300, 0].map((dx) => (
        <g key={dx} transform={`translate(${dx},0)`}>
          <path d="M -60 -90 Q 0 -120 40 -70 Q 70 -30 20 0 Q -40 20 -70 -30 Z" fill="#6BBF59" stroke={C.ink} strokeWidth={4} />
          <path d="M 60 30 Q 120 20 110 90 Q 70 110 50 70 Z" fill="#6BBF59" stroke={C.ink} strokeWidth={4} />
          <path d="M 140 -60 Q 200 -80 220 -20 Q 180 10 150 -20 Z" fill="#6BBF59" stroke={C.ink} strokeWidth={4} />
        </g>
      ))}
    </g>
    <circle r={150} fill="none" {...O} />
  </G>
);

export const Truck: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-160} y={-140} width={220} height={130} rx={10} fill="#fff" {...O} />
    <path d="M 60 -100 L 130 -100 L 170 -50 L 170 -10 L 60 -10 Z" fill={C.blue} {...O} />
    <rect x={80} y={-90} width={50} height={36} rx={4} fill="#CFE8F5" stroke={C.ink} strokeWidth={4} />
    <circle cx={-100} cy={0} r={30} fill={C.ink} />
    <circle cx={110} cy={0} r={30} fill={C.ink} />
    <circle cx={-100} cy={0} r={12} fill="#bbb" />
    <circle cx={110} cy={0} r={12} fill="#bbb" />
    <Text x={-50} y={-76} size={26} color={C.navy}>OOPS</Text>
  </G>
);

export const LineChart: React.FC<P & {t: number; pts: number[]; w?: number; h?: number; color?: string; lo?: number; hi?: number; axes?: boolean}> = ({t, pts, w = 700, h = 360, color = C.green, lo, hi, axes = true, ...p}) => {
  const mx = hi ?? Math.max(...pts);
  const mn = lo ?? Math.min(...pts);
  const xy = pts.map((v, i) => [-w / 2 + (i / (pts.length - 1)) * w, h / 2 - ((v - mn) / (mx - mn || 1)) * h] as [number, number]);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
  return (
    <G {...p}>
      {axes && <line x1={-w / 2} y1={h / 2 + 20} x2={w / 2} y2={h / 2 + 20} stroke={C.ink} strokeWidth={5} />}
      {axes && <line x1={-w / 2} y1={-h / 2 - 20} x2={-w / 2} y2={h / 2 + 20} stroke={C.ink} strokeWidth={5} />}
      <path d={d} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} />
    </G>
  );
};

export const Burger: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -130 -20 Q -130 -120 0 -120 Q 130 -120 130 -20 Z" fill="#E9A23B" {...O} />
    {[[-60, -80], [-10, -95], [40, -78], [70, -55], [-90, -50]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={8} ry={5} fill="#FFF3D6" />)}
    <path d="M -140 -18 q 20 18 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="#6BBF59" stroke={C.ink} strokeWidth={5} />
    <rect x={-135} y={-6} width={270} height={40} rx={18} fill="#7A4B2A" {...O} />
    <path d="M -130 34 L 130 34 L 110 56 L -110 56 Z" fill={C.yellow} stroke={C.ink} strokeWidth={5} />
    <path d="M -130 60 L 130 60 Q 130 110 0 110 Q -130 110 -130 60 Z" fill="#E9A23B" {...O} />
  </G>
);

export const amort = (P: number, rate: number, years: number) => {
  const r = rate / 12;
  const n = years * 12;
  const pmt = (P * r) / (1 - Math.pow(1 + r, -n));
  let b = P;
  const intY: number[] = [];
  const prinY: number[] = [];
  for (let y = 0; y < years; y++) {
    let ii = 0;
    let pp = 0;
    for (let m = 0; m < 12; m++) {
      const i = b * r;
      ii += i;
      pp += pmt - i;
      b -= pmt - i;
    }
    intY.push(ii);
    prinY.push(pp);
  }
  return {pmt, intY, prinY};
};

export const WaterHeater: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p} r={Math.sin(f * 1.3) * 3}>
    <rect x={-70} y={-260} width={140} height={260} rx={40} fill="#C9D1DA" {...O} />
    <rect x={-20} y={-300} width={40} height={40} fill="#9AA5B1" {...O} strokeWidth={4} />
    <path d="M 30 -120 l 20 -20 l 10 16 l 22 -24" fill="none" stroke={C.red} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={0} cy={-40} r={14} fill={C.red} stroke={C.ink} strokeWidth={4} />
    {[0, 1, 2].map((i) => {
      const t = ((f + i * 9) % 27) / 27;
      return <circle key={i} cx={-40 + i * 30} cy={10 + t * 40} r={8} fill="#8ECDF2" opacity={1 - t} />;
    })}
  </G>
);
