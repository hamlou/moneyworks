import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const COLS = [C.red, C.blue, C.yellow, C.green, '#9B5DE5', '#F4A261'];

export const Milk: React.FC<P & {price?: string}> = ({price, ...p}) => (
  <G {...p}>
    <path d="M -60 -120 L -30 -170 L 30 -170 L 60 -120 L 60 120 L -60 120 Z" fill="#fff" {...O} />
    <rect x={-30} y={-195} width={60} height={30} rx={6} fill={C.blue} {...O} strokeWidth={5} />
    <rect x={-60} y={-40} width={120} height={70} fill={C.blue} stroke={C.ink} strokeWidth={5} />
    <Text y={-2} size={34} color="#fff">MILK</Text>
    {price && <Text y={85} size={30}>{price}</Text>}
  </G>
);

export const StoreMap: React.FC<P & {t: number; hl?: number}> = ({t, hl = -1, ...p}) => {
  const pts: [number, number][] = [[-380, 250], [-380, -250], [-150, -250], [-150, 250], [80, 250], [80, -250], [330, -250]];
  const segs = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  const tot = segs.reduce((a, b) => a + b, 0);
  let left = t * tot;
  const path: [number, number][] = [pts[0]];
  for (let i = 0; i < segs.length && left > 0; i++) {
    const k = Math.min(1, left / segs[i]);
    path.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]);
    left -= segs[i];
  }
  const head = path[path.length - 1];
  const labels = ['SNACKS', 'FLOWERS', 'SEASONAL'];
  return (
    <G {...p}>
      <rect x={-460} y={-330} width={920} height={660} rx={20} fill="#fff" {...O} />
      {[-265, -35, 205].map((x, i) => (
        <g key={x}>
          <rect x={x - 45} y={-180} width={90} height={360} rx={10} fill={hl === i ? C.yellow : '#E4DCCB'} stroke={C.ink} strokeWidth={5} />
          <g transform={`translate(${x},0) rotate(-90)`}><Text size={24}>{labels[i]}</Text></g>
        </g>
      ))}
      <rect x={270} y={-320} width={180} height={90} rx={10} fill="#DCE9FF" stroke={C.ink} strokeWidth={5} />
      <Text x={360} y={-272} size={30}>MILK</Text>
      <rect x={-440} y={270} width={120} height={50} fill={C.green} stroke={C.ink} strokeWidth={5} />
      <Text x={-380} y={298} size={24} color="#fff">DOOR</Text>
      <path d={`M ${path.map((q) => q.join(' ')).join(' L ')}`} fill="none" stroke={C.red} strokeWidth={10} strokeDasharray="22 14" strokeLinecap="round" />
      <circle cx={head[0]} cy={head[1]} r={18} fill={C.red} stroke={C.ink} strokeWidth={4} />
    </G>
  );
};

export const Shelf: React.FC<P & {hl?: number; labels?: string[]}> = ({hl = -1, labels = ['TOP', 'EYE LEVEL', 'KID LEVEL', 'BOTTOM'], ...p}) => (
  <G {...p}>
    <rect x={-300} y={-420} width={600} height={840} rx={12} fill="#F4F0E6" {...O} />
    {labels.map((l, i) => {
      const y = -420 + (i + 1) * 210;
      return (
        <g key={l}>
          <rect x={-290} y={y - 200} width={580} height={200} fill={hl === i ? 'rgba(255,209,102,0.55)' : 'none'} />
          {Array.from({length: 5}).map((_, j) => (
            <rect key={j} x={-260 + j * 106} y={y - 150 + (j % 2) * 20} width={80} height={140 - (j % 2) * 20} rx={8} fill={COLS[(i + j) % COLS.length]} stroke={C.ink} strokeWidth={4} />
          ))}
          <rect x={-300} y={y - 12} width={600} height={24} fill={C.woodDark} stroke={C.ink} strokeWidth={5} />
          <Text x={330} y={y - 90} size={30} anchor="start" color={hl === i ? C.ink : '#8C7A5B'}>{l}</Text>
        </g>
      );
    })}
  </G>
);

export const EndCap: React.FC<P & {sign?: string; color?: string}> = ({sign = 'SALE!', color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-440} width={440} height={110} rx={14} fill={color} {...O} />
    <Text y={-383} size={56} color="#fff">{sign}</Text>
    <rect x={-200} y={-330} width={400} height={330} fill="#F4F0E6" {...O} />
    {[0, 1, 2].map((r) => Array.from({length: 4}).map((_, j) => (
      <rect key={`${r}${j}`} x={-180 + j * 92} y={-310 + r * 105} width={76} height={90} rx={8} fill={COLS[(r * 2 + j) % COLS.length]} stroke={C.ink} strokeWidth={4} />
    )))}
  </G>
);

export const SaleSign: React.FC<P & {was: string; now: string; strike?: number; cross?: number}> = ({was, now, strike = 1, cross = 0, ...p}) => (
  <G {...p}>
    <rect x={-260} y={-190} width={520} height={380} rx={20} fill={C.yellow} {...O} />
    <Text y={-110} size={48} color={C.ink}>WAS {was}</Text>
    <line x1={-150} y1={-110} x2={-150 + 300 * strike} y2={-110} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
    <Text y={20} size={40}>NOW ONLY</Text>
    <Text y={110} size={110} color={C.red}>{now}</Text>
    {cross > 0 && <Text x={200} y={-110} size={80} color={C.blue}>?</Text>}
  </G>
);

export const ShopBasket: React.FC<P & {items?: number}> = ({items = 0, ...p}) => (
  <G {...p}>
    {Array.from({length: items}).map((_, i) => (
      <rect key={i} x={-90 + i * 50} y={-70 - (i % 2) * 14} width={44} height={60} rx={6} fill={COLS[i % COLS.length]} stroke={C.ink} strokeWidth={4} />
    ))}
    <path d="M -80 -30 Q 0 -170 80 -30" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M -130 -30 L 130 -30 L 105 80 L -105 80 Z" fill={C.red} {...O} />
    {[-60, 0, 60].map((x) => <line key={x} x1={x} y1={-10} x2={x * 0.85} y2={60} stroke="#fff" strokeWidth={6} strokeLinecap="round" />)}
  </G>
);

export const Can: React.FC<P & {label?: string; color?: string}> = ({label = 'SOUP', color = C.red, ...p}) => (
  <G {...p}>
    <rect x={-50} y={-70} width={100} height={140} rx={12} fill="#D8DEE4" {...O} strokeWidth={5} />
    <rect x={-50} y={-40} width={100} height={80} fill={color} stroke={C.ink} strokeWidth={4} />
    <Text y={2} size={26} color="#fff">{label}</Text>
  </G>
);

export const Jar: React.FC<P & {label?: string}> = ({label = 'PICKLES', ...p}) => (
  <G {...p}>
    <rect x={-55} y={-110} width={110} height={34} rx={8} fill={C.gold} {...O} strokeWidth={5} />
    <rect x={-65} y={-80} width={130} height={180} rx={24} fill="#B5D99C" {...O} />
    {[-25, 10, 35].map((x, i) => <ellipse key={x} cx={x} cy={-20 + i * 40} rx={14} ry={34} fill={C.green} stroke={C.ink} strokeWidth={3} />)}
    <rect x={-55} y={0} width={110} height={44} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <Text y={24} size={22}>{label}</Text>
  </G>
);

export const Checkout: React.FC<P & {glow?: number}> = ({glow = 0, ...p}) => (
  <G {...p}>
    <rect x={-360} y={-120} width={560} height={120} rx={10} fill="#9AA5B1" {...O} />
    <rect x={-340} y={-140} width={520} height={30} rx={6} fill={C.ink} />
    <rect x={220} y={-460} width={180} height={460} rx={12} fill="#F4F0E6" {...O} />
    {glow > 0 && <rect x={200} y={-480} width={220} height={500} rx={20} fill={C.yellow} opacity={0.35 * glow} />}
    {[0, 1, 2, 3].map((r) => [0, 1].map((j) => (
      <rect key={`${r}${j}`} x={240 + j * 75} y={-440 + r * 110} width={64} height={90} rx={8} fill={COLS[(r + j * 3) % COLS.length]} stroke={C.ink} strokeWidth={4} />
    )))}
    <Text x={310} y={-500} size={34}>CANDY</Text>
  </G>
);

export const Candle: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <path d={`M 0 -110 Q ${14 + Math.sin(f / 4) * 4} -80 0 -60 Q -14 -80 0 -110 Z`} fill={C.gold} stroke={C.ink} strokeWidth={4} />
    <line x1={0} y1={-60} x2={0} y2={-40} stroke={C.ink} strokeWidth={4} />
    <rect x={-50} y={-40} width={100} height={120} rx={10} fill="#F7B7C8" {...O} strokeWidth={5} />
  </G>
);

export const UnitTag: React.FC<P & {price: string; unit: string; hl?: number}> = ({price, unit, hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-80} width={440} height={160} rx={10} fill="#fff" {...O} />
    <Text x={-190} y={-20} size={70} anchor="start">{price}</Text>
    <rect x={40} y={-60} width={165} height={120} rx={8} fill={hl > 0.5 ? C.yellow : '#F4F0E6'} stroke={C.ink} strokeWidth={4} />
    <Text x={122} y={-25} size={22} color="#5B6470">UNIT PRICE</Text>
    <Text x={122} y={20} size={30}>{unit}</Text>
  </G>
);
