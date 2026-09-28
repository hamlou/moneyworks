import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export type DogMood = 'happy' | 'hurt' | 'cone' | 'sleepy';
export const Dog: React.FC<P & {f?: number; mood?: DogMood; limp?: number}> = ({f = 0, mood = 'happy', limp = 0, ...p}) => {
  const blink = (f + 5) % 91 < 4;
  const tail = mood === 'hurt' ? 0 : Math.sin(f / 7) * 22;
  const legLift = limp > 0 ? Math.max(0, Math.sin(f / 6)) * 14 * limp : 0;
  return (
    <G {...p}>
      <ellipse cx={0} cy={96} rx={110} ry={14} fill="rgba(35,35,43,0.10)" />
      <g transform={`rotate(${tail},70,10)`}>
        <path d="M 70 10 Q 140 -10 130 -60" fill="none" stroke="#D9A15C" strokeWidth={20} strokeLinecap="round" />
      </g>
      <ellipse cx={0} cy={30} rx={96} ry={58} fill="#E9BC7E" {...O} />
      <g transform={`translate(${-96 + legLift * -0.3},60)`}>
        <rect x={-16} y={0} width={32} height={40 - legLift} rx={12} fill="#D9A15C" {...O} strokeWidth={5} />
      </g>
      <rect x={64} y={60} width={32} height={40} rx={12} fill="#D9A15C" {...O} strokeWidth={5} />
      <g transform="translate(-90,-10)">
        <circle cx={0} cy={0} r={62} fill="#EFCB93" {...O} />
        <path d="M -50 -30 Q -70 -80 -30 -70 Q -44 -46 -30 -20 Z" fill="#D9A15C" {...O} strokeWidth={5} />
        <path d="M 26 -50 Q 50 -90 62 -50 Q 48 -30 30 -26 Z" fill="#D9A15C" {...O} strokeWidth={5} />
        <ellipse cx={-18} cy={-6} rx={8} ry={blink ? 1.5 : mood === 'hurt' ? 10 : 8} fill={C.ink} />
        <ellipse cx={16} cy={-6} rx={8} ry={blink ? 1.5 : mood === 'hurt' ? 10 : 8} fill={C.ink} />
        {mood === 'hurt' && (
          <g stroke={C.ink} strokeWidth={4} strokeLinecap="round">
            <path d="M -28 -20 L -8 -14" />
            <path d="M 26 -20 L 6 -14" />
          </g>
        )}
        <ellipse cx={0} cy={20} rx={22} ry={16} fill="#F4DDB0" />
        <ellipse cx={0} cy={16} rx={9} ry={7} fill={C.ink} />
        {mood === 'happy' || mood === 'sleepy' ? (
          <path d="M 0 26 Q -14 44 -30 30" fill="none" stroke="#E86A6A" strokeWidth={8} strokeLinecap="round" />
        ) : (
          <path d="M -14 30 Q 0 22 14 30" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        )}
      </g>
    </G>
  );
};

export const Cone: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M 0 -6 L -130 76 Q 0 110 130 76 Z" fill="#EAF3F8" {...O} strokeWidth={5} />
    <path d="M -70 30 L 70 30 M -95 52 L 95 52" stroke="#C9E0EC" strokeWidth={4} />
    <ellipse cx={0} cy={-6} rx={46} ry={20} fill="#CFE8F5" stroke={C.ink} strokeWidth={4} />
  </G>
);

export const VetClinic: React.FC<P & {name?: string; emergency?: boolean}> = ({name = 'VET CLINIC', emergency, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={4} rx={330} ry={16} fill="rgba(35,35,43,0.10)" />
    <rect x={-300} y={-360} width={600} height={360} fill={emergency ? '#2E3B4A' : '#EAF3EF'} {...O} />
    <path d="M -330 -360 L 330 -360 L 300 -270 L -300 -270 Z" fill={emergency ? C.navy : '#3E8E6E'} {...O} />
    <rect x={-240} y={-420} width={480} height={56} rx={10} fill={C.ink} />
    <text x={0} y={-388} fontFamily={FONT} fontWeight={700} fontSize={Math.min(34, 620 / name.length)} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={3}>{name}</text>
    <rect x={-260} y={-220} width={220} height={220} rx={8} fill="#CFE8F5" {...O} strokeWidth={5} />
    <rect x={40} y={-220} width={220} height={220} rx={8} fill={emergency ? '#41536A' : '#CFE8F5'} {...O} strokeWidth={5} />
    <g transform="translate(150,-120) scale(0.9)">
      <rect x={-14} y={-60} width={28} height={120} fill={C.red} />
      <rect x={-60} y={-14} width={120} height={28} fill={C.red} />
    </g>
    <g transform="translate(-150,-120) scale(0.9)">
      <rect x={-14} y={-60} width={28} height={120} fill={C.red} />
      <rect x={-60} y={-14} width={120} height={28} fill={C.red} />
    </g>
  </G>
);

export const Xray: React.FC<P & {crack?: number}> = ({crack = 0, ...p}) => (
  <G {...p}>
    <rect x={-220} y={-160} width={440} height={320} rx={14} fill="#0B1420" {...O} strokeWidth={6} />
    <g opacity={0.9}>
      <rect x={-40} y={-120} width={80} height={100} rx={30} fill="#DCE9F5" opacity={0.85} />
      <rect x={-30} y={-20} width={26} height={140} rx={12} fill="#DCE9F5" opacity={0.85} transform="rotate(-8)" />
      <rect x={10} y={-20} width={26} height={140} rx={12} fill="#DCE9F5" opacity={0.85} transform="rotate(10)" />
    </g>
    {crack > 0 && <path d="M -6 20 L 10 44 L -4 60 L 14 84" fill="none" stroke={C.red} strokeWidth={6} strokeLinecap="round" opacity={crack} />}
  </G>
);
