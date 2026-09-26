import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../theme';
import {Stick} from '../Stick';
import {Raccoon} from '../props3';
import {Big, Burst, TW, TH} from '../Thumb';

const PayBtn: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-300} y={-60} width={600} height={120} rx={60} fill="#FFB3C7" stroke={C.ink} strokeWidth={7} />
    <text x={0} y={4} fontFamily={FONT} fontWeight={700} fontSize={50} fill={C.ink} textAnchor="middle" dominantBaseline="middle">Pay in 4 · 0%</text>
  </g>
);

export const Ep10Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFD6E2" b="#FFC2D4" cx={420} cy={420} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <PayBtn x={420} y={400} s={1.1} />
          <Raccoon f={20} x={1010} y={460} s={1.5} mood="greedy" holdCoin grab={0.7} />
          <Big x={40} y={100} size={96} r={-3}>WHO PAYS?</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <PayBtn x={420} y={300} s={0.9} />
          <text x={420} y={480} fontFamily={FONT} fontWeight={700} fontSize={70} fill="#fff" textAnchor="middle">"FREE"?</text>
          <Stick f={20} x={1000} y={1200} s={2.6} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.5}]} acc={['hair']} seed={50} />
          <Big x={640} y={640} size={80} anchor="middle" color={C.yellow}>$15 BILLION</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${240 + i * 170},${380}) rotate(${(i - 1.5) * 6})`}>
            <rect x={-80} y={-150} width={160} height={300} rx={24} fill={['#FFB3C7', '#B8E0FF', '#C8F5D8', '#FFE08A'][i]} stroke={C.ink} strokeWidth={6} />
            <text y={0} fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.ink} textAnchor="middle" dominantBaseline="middle">$50</text>
          </g>
        ))}
        <Big x={1240} y={250} size={110} anchor="end" color={C.red}>THE TRAP</Big>
        <Big x={1240} y={400} size={60} anchor="end">nearly half pay late</Big>
      </svg>
    </AbsoluteFill>
  );
};
