import React from 'react';
import {C, FONT} from './theme';
import {G, Text, Bill, MoneyStack} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const Flag: React.FC<P & {kind: 'jp' | 'cn' | 'uk' | 'us'}> = ({kind, ...p}) => (
  <G {...p}>
    <line x1={-110} y1={-80} x2={-110} y2={200} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <g>
      {kind === 'jp' && (
        <g>
          <rect x={-110} y={-80} width={220} height={146} fill="#fff" {...O} />
          <circle cx={0} cy={-7} r={40} fill="#D7263D" />
        </g>
      )}
      {kind === 'cn' && (
        <g>
          <rect x={-110} y={-80} width={220} height={146} fill="#D7263D" {...O} />
          <path d="M -70 -60 l 8 22 l 24 0 l -19 14 l 7 22 l -20 -13 l -20 13 l 7 -22 l -19 -14 l 24 0 Z" fill="#FFD166" />
        </g>
      )}
      {kind === 'uk' && (
        <g>
          <rect x={-110} y={-80} width={220} height={146} fill="#1D3F8F" {...O} />
          <path d="M -110 -80 L 110 66 M 110 -80 L -110 66" stroke="#fff" strokeWidth={22} />
          <path d="M -110 -80 L 110 66 M 110 -80 L -110 66" stroke="#D7263D" strokeWidth={8} />
          <path d="M 0 -80 L 0 66 M -110 -7 L 110 -7" stroke="#fff" strokeWidth={34} />
          <path d="M 0 -80 L 0 66 M -110 -7 L 110 -7" stroke="#D7263D" strokeWidth={18} />
          <rect x={-110} y={-80} width={220} height={146} fill="none" {...O} />
        </g>
      )}
      {kind === 'us' && (
        <g>
          <rect x={-110} y={-80} width={220} height={146} fill="#fff" {...O} />
          {Array.from({length: 7}).map((_, i) => <rect key={i} x={-107} y={-77 + i * 20.8} width={214} height={10.4} fill="#D7263D" />)}
          <rect x={-107} y={-77} width={96} height={72} fill="#1D3F8F" />
          <rect x={-110} y={-80} width={220} height={146} fill="none" {...O} />
        </g>
      )}
    </g>
  </G>
);

export const Bread: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -80 30 Q -90 -40 0 -44 Q 90 -40 80 30 Z" fill="#D9A15B" {...O} />
    <path d="M -40 -30 Q -30 -10 -40 10 M 0 -36 Q 10 -14 0 8 M 40 -30 Q 50 -10 40 10" fill="none" stroke="#B07A3E" strokeWidth={5} strokeLinecap="round" />
  </G>
);

export const Wheelbarrow: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <path d="M -180 -60 L 120 -60 L 80 40 L -140 40 Z" fill="#6BBF59" {...O} />
    <g transform="translate(-40,-60)">
      {[0, 1, 2].map((i) => <MoneyStack key={i} x={-80 + i * 80} y={0} n={5 - i} s={0.7} />)}
    </g>
    <line x1={80} y1={40} x2={200} y2={80} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={120} y1={-60} x2={260} y2={-10} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <g transform={`translate(-120,60) rotate(${f * 8})`}>
      <circle r={40} fill={C.ink} />
      <line x1={-30} y1={0} x2={30} y2={0} stroke="#bbb" strokeWidth={6} />
      <line x1={0} y1={-30} x2={0} y2={30} stroke="#bbb" strokeWidth={6} />
    </g>
  </G>
);

export const ReportCard: React.FC<P & {grade: string; old?: string; cross?: number}> = ({grade, old = 'Aaa', cross = 0, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-270} width={440} height={540} rx={14} fill="#FFFDF5" {...O} />
    <rect x={-220} y={-270} width={440} height={80} rx={14} fill={C.navy} {...O} />
    <Text y={-228} size={34} color="#fff" ls={4}>CREDIT RATING</Text>
    <Text y={-140} size={30} color="#5B6470">USA</Text>
    <Text y={-30} size={120} color={C.green}>{old}</Text>
    {cross > 0 && <line x1={-140} y1={-30} x2={-140 + 280 * cross} y2={-30} stroke={C.red} strokeWidth={14} strokeLinecap="round" />}
    {cross >= 1 && <Text y={140} size={130} color={C.blue} font={FONT}>{grade}</Text>}
  </G>
);

export const Pockets: React.FC<P & {f: number; t: number}> = ({f, t, ...p}) => (
  <G {...p}>
    <path d="M -300 -100 L -80 -100 L -90 120 Q -190 160 -290 120 Z" fill="#6E8BB7" {...O} />
    <path d="M 80 -100 L 300 -100 L 290 120 Q 190 160 90 120 Z" fill="#6E8BB7" {...O} />
    <Text x={-190} y={-150} size={40}>LEFT</Text>
    <Text x={190} y={-150} size={40}>RIGHT</Text>
    <Bill x={-190 + 380 * t} y={-40 - Math.sin(t * Math.PI) * 140} s={0.9} r={t * 360} />
    <g opacity={t > 0.9 ? 1 : 0}>
      <rect x={-270} y={10} width={160} height={70} rx={8} fill="#fff" stroke={C.ink} strokeWidth={4} />
      <Text x={-190} y={46} size={30} color={C.red}>IOU</Text>
    </g>
  </G>
);

export const Conveyor: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <rect x={-500} y={0} width={1000} height={40} rx={20} fill="#9AA5B1" {...O} />
    {[-460, -300, -140, 20, 180, 340, 460].map((x) => <circle key={x} cx={x} cy={20} r={16} fill="#C9D1DA" stroke={C.ink} strokeWidth={4} />)}
    {Array.from({length: 5}).map((_, i) => {
      const x = ((f * 3 + i * 220) % 1100) - 550;
      const old = x < 0;
      return (
        <g key={i} transform={`translate(${x},-50)`} opacity={Math.abs(x) > 480 ? 0 : 1}>
          <rect x={-70} y={-40} width={140} height={80} rx={8} fill={old ? '#E6DCC4' : '#fff'} stroke={C.ink} strokeWidth={4} />
          <text y={2} fontFamily={FONT} fontWeight={700} fontSize={24} fill={old ? '#8C7A5B' : C.navy} textAnchor="middle" dominantBaseline="middle">{old ? 'OLD BOND' : 'NEW BOND'}</text>
        </g>
      );
    })}
  </G>
);
