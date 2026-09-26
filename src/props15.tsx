import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

export const Hill: React.FC<{dark?: boolean}> = ({dark}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    <rect width={1920} height={1080} fill={dark ? '#DDE6EE' : '#E8F4FA'} />
    <path d="M 0 180 Q 700 260 1920 900 L 1920 1080 L 0 1080 Z" fill="#fff" stroke={C.ink} strokeWidth={6} />
    {[[200, 120], [1500, 160], [900, 90]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x},${y})`}>
        <ellipse rx={110} ry={40} fill="#fff" />
        <ellipse cx={-60} cy={10} rx={60} ry={30} fill="#fff" />
      </g>
    ))}
  </svg>
);

export const Snowball: React.FC<P & {rad: number; spin?: number; label?: string; color?: string}> = ({rad, spin = 0, label, color = '#fff', ...p}) => (
  <G {...p}>
    <circle r={rad} fill={color} {...O} />
    <g transform={`rotate(${spin})`}>
      <path d={`M ${-rad * 0.5} ${-rad * 0.2} q ${rad * 0.2} ${-rad * 0.2} ${rad * 0.4} 0`} fill="none" stroke="#C9D6E6" strokeWidth={Math.max(4, rad * 0.08)} strokeLinecap="round" />
      <path d={`M ${rad * 0.1} ${rad * 0.4} q ${rad * 0.2} ${-rad * 0.15} ${rad * 0.35} 0`} fill="none" stroke="#C9D6E6" strokeWidth={Math.max(4, rad * 0.08)} strokeLinecap="round" />
    </g>
    {label && <Text y={4} size={Math.max(24, rad * 0.35)} color={color === '#fff' ? C.ink : '#fff'}>{label}</Text>}
  </G>
);

export const Penny: React.FC<P & {label?: string}> = ({label = '1¢', ...p}) => (
  <G {...p}>
    <circle r={70} fill="#C9834A" {...O} />
    <circle r={52} fill="none" stroke="#A8683A" strokeWidth={6} />
    <Text y={4} size={44} color="#fff">{label}</Text>
  </G>
);

export const Briefcase: React.FC<P & {label?: string}> = ({label = '$1,000,000', ...p}) => (
  <G {...p}>
    <path d="M -50 -120 L -50 -150 L 50 -150 L 50 -120" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <rect x={-190} y={-120} width={380} height={240} rx={20} fill="#8C5A33" {...O} />
    <rect x={-190} y={-20} width={380} height={16} fill="#6E4527" />
    <Text y={70} size={40} color={C.yellow}>{label}</Text>
  </G>
);

export const Crayon: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-80} y={-16} width={140} height={32} rx={6} fill={C.blue} {...O} strokeWidth={4} />
    <path d="M 60 -16 L 100 0 L 60 16 Z" fill={C.blue} {...O} strokeWidth={4} />
  </G>
);
