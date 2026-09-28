import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};

// A big ON/OFF toggle switch, used for "auto-renew" defaults.
export const Toggle: React.FC<P & {on: number; label?: string}> = ({on, label = 'AUTO RENEW', ...p}) => (
  <G {...p}>
    <rect x={-160} y={-70} width={320} height={140} rx={70} fill={on >= 0.5 ? C.green : '#fff'} stroke={C.ink} strokeWidth={7} />
    <circle cx={-100 + 200 * Math.max(0, Math.min(1, on))} cy={0} r={54} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <Text y={110} size={34} color={C.ink}>{label}</Text>
    <Text y={8} size={38} color={on >= 0.5 ? '#fff' : C.gray} x={on >= 0.5 ? -34 : 34}>{on >= 0.5 ? 'ON' : 'OFF'}</Text>
  </G>
);

// A phone-shaped app screen mockup: stage 0 = trial offer button, 1 = card added check, 2 = "day N of 7" running.
export const TrialScreen: React.FC<P & {stage: number; app?: string; day?: number}> = ({stage, app = 'STREAMBOX', day = 1, ...p}) => (
  <G {...p}>
    <rect x={-230} y={-340} width={460} height={680} rx={44} fill="#fff" {...O} />
    <rect x={-230} y={-340} width={460} height={110} rx={44} fill={C.navy} />
    <rect x={-230} y={-290} width={460} height={60} fill={C.navy} />
    <Text y={-278} size={34} color="#fff">{app}</Text>
    {stage === 0 && (
      <>
        <Text y={-140} size={40} color={C.ink}>7 days</Text>
        <Text y={-90} size={40} color={C.ink}>FREE</Text>
        <rect x={-170} y={-10} width={340} height={110} rx={24} fill={C.green} stroke={C.ink} strokeWidth={6} />
        <Text y={55} size={40} color="#fff">START FREE TRIAL</Text>
      </>
    )}
    {stage === 1 && (
      <>
        <Text y={-160} size={34} color={C.gray}>card number</Text>
        <rect x={-170} y={-120} width={340} height={80} rx={14} fill={C.soft} stroke={C.ink} strokeWidth={5} />
        <Text y={-70} size={36}>•••• •••• •••• 4242</Text>
        <circle cx={0} cy={80} r={60} fill={C.green} stroke={C.ink} strokeWidth={6} />
        <path d="M -26 80 L -8 100 L 30 55" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
        <Text y={190} size={32} color={C.gray}>trial started</Text>
      </>
    )}
    {stage === 2 && (
      <>
        <Text y={-140} size={34} color={C.gray}>day</Text>
        <Text y={-40} size={110} color={C.red}>{day}</Text>
        <Text y={40} size={34} color={C.gray}>of 7</Text>
        <rect x={-170} y={90} width={340} height={70} rx={16} fill={day >= 7 ? C.red : C.soft} stroke={C.ink} strokeWidth={5} />
        <Text y={135} size={30} color={day >= 7 ? '#fff' : C.ink}>{day >= 7 ? 'CHARGING NOW' : 'auto-renews after trial'}</Text>
      </>
    )}
  </G>
);

// A vertical "maze" of cancel steps; lit = how many the shopper has clicked through.
export const CancelMaze: React.FC<P & {steps: string[]; lit: number}> = ({steps, lit, ...p}) => (
  <G {...p}>
    {steps.map((s, i) => (
      <g key={i}>
        <rect x={-260} y={i * 130 - (steps.length * 130) / 2 + 20} width={520} height={96} rx={18} fill={i < lit ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={5} />
        <Text y={i * 130 - (steps.length * 130) / 2 + 20 + 58} size={32} color={i < lit ? C.red : C.gray}>{s}</Text>
        {i < steps.length - 1 && <path d={`M 0 ${i * 130 - (steps.length * 130) / 2 + 116} L 0 ${i * 130 - (steps.length * 130) / 2 + 150}`} stroke={C.ink} strokeWidth={6} />}
      </g>
    ))}
  </G>
);

// Simple courthouse gavel icon for the legal / FTC chapters.
export const Gavel: React.FC<P & {bang?: number}> = ({bang = 0, ...p}) => (
  <G {...p} r={bang > 0 ? -18 + 18 * bang : -18}>
    <rect x={-140} y={70} width={280} height={26} rx={8} fill={C.wood} {...O} strokeWidth={4} />
    <rect x={-24} y={-90} width={130} height={54} rx={10} fill={C.woodDark} {...O} strokeWidth={5} transform="rotate(35)" />
    <rect x={30} y={-40} width={26} height={130} rx={10} fill={C.wood} {...O} strokeWidth={5} />
    <circle cx={70} cy={-96} r={10} fill={C.gold} stroke={C.ink} strokeWidth={3} />
  </G>
);

// A fan of small virtual card numbers, one per merchant.
export const VirtualCards: React.FC<P & {n: number; locked?: number}> = ({n, locked = -1, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => {
      const rot = (i - (n - 1) / 2) * 14;
      const off = Math.abs(i - (n - 1) / 2) * 10;
      const isLocked = i === locked;
      return (
        <g key={i} transform={`translate(${(i - (n - 1) / 2) * 90} ${off}) rotate(${rot})`}>
          <rect x={-90} y={-60} width={180} height={120} rx={16} fill={isLocked ? '#DADFE6' : [C.blue, C.green, C.gold][i % 3]} stroke={C.ink} strokeWidth={5} />
          <rect x={-90} y={-24} width={180} height={20} fill={C.ink} opacity={0.15} />
          <Text y={44} size={22} color="#fff">•••• {1000 + i * 37}</Text>
          {isLocked && (
            <g transform="translate(0,-10)">
              <rect x={-22} y={-4} width={44} height={34} rx={6} fill="#fff" stroke={C.ink} strokeWidth={4} />
              <path d="M -14 -4 L -14 -20 A 14 14 0 0 1 14 -20 L 14 -4" fill="none" stroke={C.ink} strokeWidth={5} />
            </g>
          )}
        </g>
      );
    })}
  </G>
);
