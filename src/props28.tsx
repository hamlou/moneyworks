import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const SubTile: React.FC<P & {name: string; price: string; color?: string; lit?: number; cut?: number; forgot?: boolean}> = ({name, price, color = C.blue, lit = 1, cut = 0, forgot, ...p}) => (
  <G {...p}>
    <g opacity={0.4 + 0.6 * lit}>
      <rect x={-150} y={-70} width={300} height={140} rx={24} fill="#fff" {...O} />
      <rect x={-130} y={-50} width={80} height={80} rx={18} fill={color} {...O} strokeWidth={4} />
      <circle cx={-90} cy={-10} r={18} fill="#fff" />
      <Text x={-30} y={-24} size={30} anchor="start">{name}</Text>
      <Text x={-30} y={26} size={34} anchor="start" color={forgot ? C.red : '#5B6470'}>{price}</Text>
    </g>
    {cut > 0 && <line x1={-160} y1={0} x2={-160 + 320 * cut} y2={0} stroke={C.red} strokeWidth={12} strokeLinecap="round" />}
  </G>
);

export const Tap: React.FC<P & {f: number; drip?: number}> = ({f, drip = 1, ...p}) => (
  <G {...p}>
    <rect x={-200} y={-40} width={160} height={50} rx={10} fill="#B8C2CC" {...O} />
    <path d="M -40 -40 L 40 -40 Q 70 -40 70 -10 L 70 40 L 20 40 L 20 10 L -40 10 Z" fill="#B8C2CC" {...O} />
    <rect x={-20} y={-90} width={40} height={50} rx={8} fill="#B8C2CC" {...O} />
    <rect x={-60} y={-110} width={120} height={26} rx={12} fill={C.red} {...O} strokeWidth={5} />
    {[0, 1, 2].map((i) => {
      const t = ((f * drip) / 30 + i / 3) % 1;
      return <path key={i} d="M 45 0 Q 30 22 45 30 Q 60 22 45 0 Z" transform={`translate(0,${60 + t * 260})`} fill={C.blue} stroke={C.ink} strokeWidth={3} opacity={1 - t * 0.3} />;
    })}
  </G>
);

export const Bucket: React.FC<P & {level: number; label?: string}> = ({level, label, ...p}) => (
  <G {...p}>
    <clipPath id="bk28"><path d="M -140 -120 L 140 -120 L 110 120 L -110 120 Z" /></clipPath>
    <path d="M -140 -120 L 140 -120 L 110 120 L -110 120 Z" fill="#fff" />
    <rect x={-150} y={120 - 240 * level} width={300} height={240 * level} fill={C.blue} opacity={0.75} clipPath="url(#bk28)" />
    <path d="M -140 -120 L 140 -120 L 110 120 L -110 120 Z" fill="none" {...O} />
    <path d="M -140 -120 Q 0 -260 140 -120" fill="none" stroke={C.ink} strokeWidth={6} />
    {label && <Text y={30} size={40} color={C.ink}>{label}</Text>}
  </G>
);

export const Puppy: React.FC<P & {f: number; happy?: boolean}> = ({f, happy = true, ...p}) => {
  const wag = Math.sin(f / 3) * 18;
  return (
    <G {...p}>
      <path d={`M 110 -30 Q 150 ${-80 + wag} 170 ${-90 + wag}`} fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
      <ellipse cx={20} cy={0} rx={110} ry={60} fill="#E0B07A" {...O} />
      {[-60, -10, 50, 100].map((x) => <rect key={x} x={x - 12} y={40} width={24} height={60} rx={10} fill="#E0B07A" {...O} strokeWidth={5} />)}
      <circle cx={-110} cy={-60} r={62} fill="#E0B07A" {...O} />
      <path d="M -160 -100 Q -200 -40 -165 -10 Q -150 -60 -140 -90 Z" fill="#9C6B3E" {...O} strokeWidth={5} />
      <path d="M -60 -100 Q -20 -40 -55 -10 Q -70 -60 -80 -90 Z" fill="#9C6B3E" {...O} strokeWidth={5} />
      <circle cx={-130} cy={-70} r={7} fill={C.ink} />
      <circle cx={-90} cy={-70} r={7} fill={C.ink} />
      <ellipse cx={-110} cy={-45} rx={12} ry={8} fill={C.ink} />
      {happy ? <path d="M -125 -30 Q -110 -15 -95 -30" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" /> : <path d="M -125 -22 Q -110 -34 -95 -22" fill="none" stroke={C.ink} strokeWidth={4} />}
    </G>
  );
};

export const Dumbbell: React.FC<P & {color?: string}> = ({color = '#5B6470', ...p}) => (
  <G {...p}>
    <rect x={-120} y={-12} width={240} height={24} rx={10} fill="#B8C2CC" {...O} strokeWidth={5} />
    {[-1, 1].map((k) => (
      <g key={k}>
        <rect x={k * 120 - 30} y={-70} width={60} height={140} rx={14} fill={color} {...O} />
        <rect x={k * 170 - 20} y={-50} width={40} height={100} rx={10} fill={color} {...O} />
      </g>
    ))}
  </G>
);

export const GymBuilding: React.FC<P & {name?: string}> = ({name = 'IRON GYM', ...p}) => (
  <G {...p}>
    <rect x={-300} y={-260} width={600} height={360} rx={12} fill="#F0E6D6" {...O} />
    <rect x={-320} y={-320} width={640} height={80} rx={14} fill={C.red} {...O} />
    <Text y={-280} size={48} color="#fff" ls={4}>{name}</Text>
    {[-180, 0, 180].map((x) => <rect key={x} x={x - 60} y={-200} width={120} height={120} rx={10} fill={C.sky} {...O} strokeWidth={5} />)}
    <rect x={-60} y={-40} width={120} height={140} rx={8} fill={C.woodDark} {...O} strokeWidth={5} />
  </G>
);

export const Stairs: React.FC<P & {labels: string[]; hl?: number; h?: number; w?: number}> = ({labels, hl = -1, h = 70, w = 150, ...p}) => (
  <G {...p}>
    {labels.map((l, i) => (
      <g key={i}>
        <rect x={i * w} y={-(i + 1) * h} width={w} height={(i + 1) * h} fill={i <= hl ? C.red : '#fff'} {...O} strokeWidth={5} />
        <Text x={i * w + w / 2} y={-(i + 1) * h - 30} size={34} color={i <= hl ? C.red : '#9C9383'}>{l}</Text>
      </g>
    ))}
  </G>
);

export const Maze: React.FC<P & {t?: number}> = ({t = 0, ...p}) => {
  const d = 'M -300 -200 L 300 -200 L 300 -100 L -200 -100 L -200 0 L 300 0 L 300 100 L -200 100 L -200 200 L 300 200';
  return (
    <G {...p}>
      <rect x={-360} y={-260} width={720} height={520} rx={24} fill="#fff" {...O} />
      <path d={d} fill="none" stroke="#E3E8EE" strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${t} 1`} />
      <rect x={250} y={180} width={100} height={40} rx={8} fill="#E3E8EE" stroke="#B8C2CC" strokeWidth={2} />
      <Text x={300} y={202} size={16} color="#9C9383">cancel</Text>
    </G>
  );
};
