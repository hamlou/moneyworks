import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const Couch: React.FC<P & {color?: string; tag?: string}> = ({color = '#E07A5F', tag, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={60} rx={300} ry={16} fill="rgba(35,35,43,0.12)" />
    <rect x={-230} y={-170} width={460} height={140} rx={30} fill={color} {...O} />
    <rect x={-240} y={-50} width={480} height={90} rx={20} fill={color} {...O} />
    <line x1={0} y1={-50} x2={0} y2={40} stroke={C.ink} strokeWidth={4} opacity={0.5} />
    <rect x={-290} y={-100} width={80} height={150} rx={30} fill={color} {...O} />
    <rect x={210} y={-100} width={80} height={150} rx={30} fill={color} {...O} />
    {[-240, 240].map((x) => <rect key={x} x={x - 12} y={50} width={24} height={20} fill={C.woodDark} stroke={C.ink} strokeWidth={4} />)}
    {tag && (
      <g transform="translate(200,-150) rotate(14)">
        <path d="M -20 -30 L 110 -30 L 140 0 L 110 30 L -20 30 Z" fill={C.yellow} {...O} strokeWidth={4} />
        <Text x={55} y={2} size={30}>{tag}</Text>
      </g>
    )}
  </G>
);

export const Dominoes: React.FC<P & {n?: number; fall?: number; labels?: string[]; gap?: number}> = ({n = 6, fall = 0, labels = [], gap = 150, ...p}) => (
  <G {...p}>
    <line x1={-60} y1={0} x2={(n - 1) * gap + 60} y2={0} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    {Array.from({length: n}).map((_, i) => {
      const t = Math.max(0, Math.min(1, fall * n - i));
      return (
        <g key={i} transform={`translate(${i * gap + 25},0) rotate(${t * 62})`}>
          <rect x={-50} y={-220} width={50} height={220} rx={8} fill={i % 2 ? '#fff' : C.yellow} {...O} />
          <circle cx={-25} cy={-160} r={7} fill={C.ink} />
          <circle cx={-25} cy={-60} r={7} fill={C.ink} />
          {labels[i] && t < 0.3 && <Text x={-25} y={-260} size={30}>{labels[i]}</Text>}
        </g>
      );
    })}
  </G>
);

export const Jenga: React.FC<P & {f?: number; wob?: number; pulled?: number; fallen?: number}> = ({f = 0, wob = 0, pulled = 0, fallen = 0, ...p}) => {
  const rows = 12;
  return (
    <G {...p}>
      <g transform={`rotate(${Math.sin(f / 3) * 4 * wob + fallen * 20})`}>
        {Array.from({length: rows}).map((_, r) => (
          <g key={r} transform={`translate(${Math.sin(f / 4 + r) * 6 * wob},${-r * 40 - 40})`}>
            {r % 2 === 0
              ? [-1, 0, 1].map((c) => (r === 3 && c === 0 ? null : <rect key={c} x={c * 60 - 30 + (r === 3 && c === 0 ? pulled * 200 : 0)} y={0} width={60} height={40} fill={r === 3 && c === 0 ? C.red : C.wood} stroke={C.ink} strokeWidth={4} />))
              : <rect x={-90} y={0} width={180} height={40} fill={C.wood} stroke={C.ink} strokeWidth={4} />}
          </g>
        ))}
      </g>
      <rect x={-30 + pulled * 260} y={-3 * 40 - 40} width={60} height={40} fill={C.red} stroke={C.ink} strokeWidth={4} />
    </G>
  );
};

export const PauseBtn: React.FC<P & {press?: number}> = ({press = 0, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-130 + press * 20} width={300} height={260 - press * 20} rx={40} fill="#3D4B5C" {...O} />
    <rect x={-120} y={-140 + press * 30} width={240} height={200} rx={34} fill={C.red} {...O} />
    <rect x={-50} y={-100 + press * 30} width={30} height={120} rx={8} fill="#fff" />
    <rect x={20} y={-100 + press * 30} width={30} height={120} rx={8} fill="#fff" />
  </G>
);

export const SmokeAlarm: React.FC<P & {f?: number; on?: number}> = ({f = 0, on = 0, ...p}) => (
  <G {...p}>
    <circle r={110} fill="#F1F3F5" {...O} />
    <circle r={70} fill="#fff" stroke={C.ink} strokeWidth={4} />
    {[-30, 0, 30].map((x) => <line key={x} x1={x} y1={-40} x2={x} y2={40} stroke="#C9CED6" strokeWidth={8} strokeLinecap="round" />)}
    <circle cx={70} cy={-70} r={14} fill={on && Math.floor(f / 6) % 2 === 0 ? C.red : '#C9CED6'} stroke={C.ink} strokeWidth={3} />
    {on > 0 && [0, 1, 2].map((i) => <path key={i} d={`M ${130 + i * 30} -40 Q ${150 + i * 30} 0 ${130 + i * 30} 40`} fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" opacity={0.3 + 0.7 * ((f / 5 + i) % 3 < 1.5 ? 1 : 0)} />)}
  </G>
);

export const StormCloud: React.FC<P & {f?: number; rain?: number; sunny?: number}> = ({f = 0, rain = 1, sunny = 0, ...p}) => (
  <G {...p}>
    {rain > 0 && Array.from({length: 7}).map((_, i) => {
      const y = ((f * 8 + i * 37) % 160) + 40;
      return <line key={i} x1={-150 + i * 50} y1={y} x2={-160 + i * 50} y2={y + 30} stroke="#5AB6E0" strokeWidth={8} strokeLinecap="round" opacity={rain} />;
    })}
    <path d="M -200 20 Q -240 -60 -160 -80 Q -140 -160 -40 -140 Q 20 -200 110 -140 Q 220 -150 210 -50 Q 260 20 180 30 Z" fill={sunny ? '#fff' : '#8C96A3'} {...O} />
    {!sunny && <path d="M -10 20 L -40 90 L 0 90 L -30 160" fill="none" stroke={C.yellow} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" />}
  </G>
);

export const YieldCurve: React.FC<P & {inv?: number; t?: number}> = ({inv = 0, t = 1, ...p}) => {
  const xs = [-380, -200, 0, 200, 380];
  const normal = [60, 10, -30, -60, -80];
  const inverted = [-80, -60, -30, 0, 20];
  const pts = xs.map((x, i) => [x, normal[i] + (inverted[i] - normal[i]) * inv]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
  return (
    <G {...p}>
      <rect x={-460} y={-220} width={920} height={400} rx={24} fill="#fff" {...O} />
      <line x1={-400} y1={130} x2={420} y2={130} stroke={C.ink} strokeWidth={5} />
      <line x1={-400} y1={130} x2={-400} y2={-180} stroke={C.ink} strokeWidth={5} />
      <Text x={-420} y={-195} size={26} anchor="start" color="#5B6470">interest paid</Text>
      <Text x={-380} y={158} size={26} color="#5B6470">3 months</Text>
      <Text x={380} y={158} size={26} color="#5B6470">10 years</Text>
      <path d={d} fill="none" stroke={inv > 0.5 ? C.red : C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} />
      {t > 0.95 && pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={12} fill={inv > 0.5 ? C.red : C.green} stroke={C.ink} strokeWidth={4} />)}
    </G>
  );
};

export const BtcCoin: React.FC<P> = (p) => (
  <G {...p}>
    <circle r={150} fill="#F7931A" {...O} strokeWidth={8} />
    <circle r={118} fill="none" stroke="#FFD08A" strokeWidth={8} />
    <line x1={-18} y1={-110} x2={-18} y2={110} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
    <line x1={18} y1={-110} x2={18} y2={110} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
    <Text y={8} size={190} color="#fff" stroke={C.ink} sw={4}>B</Text>
  </G>
);

export const Jar: React.FC<P & {level?: number; label?: string}> = ({level = 0.5, label = 'EMERGENCY', ...p}) => (
  <G {...p}>
    <rect x={-120} y={-230} width={240} height={40} rx={12} fill={C.wood} {...O} />
    <path d="M -130 -190 L 130 -190 L 140 100 Q 140 130 110 130 L -110 130 Q -140 130 -140 100 Z" fill="rgba(200,230,255,0.5)" {...O} />
    <rect x={-122} y={120 - 300 * level} width={244} height={300 * level} rx={16} fill={C.greenLight} opacity={0.9} />
    {Array.from({length: Math.round(level * 8)}).map((_, i) => <circle key={i} cx={-70 + (i % 3) * 70} cy={100 - Math.floor(i / 3) * 70} r={26} fill={C.gold} stroke={C.ink} strokeWidth={4} />)}
    <rect x={-110} y={-120} width={220} height={70} rx={10} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <Text y={-84} size={30}>{label}</Text>
  </G>
);
