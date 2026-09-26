import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Bill, Sparkle} from '../props';
import {Big, Burst, TW, TH} from '../Thumb';

export const Ep07Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={380} cy={400} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <g transform="translate(250,380) scale(2.2)"><Bill /></g>
          <text x={470} y={390} fontSize={120} fontWeight={700} fill={C.ink} textAnchor="middle" dominantBaseline="middle">→</text>
          <g transform="translate(620,400) scale(1.1)"><Bill /></g>
          <Stick f={20} x={1050} y={1250} s={2.8} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.5}]} acc={['hair']} seed={50} />
          <Big x={40} y={100} size={96} r={-3}>IT'S SHRINKING</Big>
          <Big x={40} y={640} size={80} r={-2} color={C.red}>$100 → $52</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <rect x={120} y={200} width={460} height={460} rx={20} fill="#fff" stroke={C.ink} strokeWidth={8} />
          <rect x={700} y={330} width={460} height={330} rx={20} fill="#fff" stroke={C.ink} strokeWidth={8} />
          <Big x={350} y={430} size={70} anchor="middle" color={C.red}>CHIPS</Big>
          <Big x={930} y={500} size={60} anchor="middle" color={C.red}>CHIPS</Big>
          <Big x={350} y={600} size={50} anchor="middle">$4.99</Big>
          <Big x={930} y={620} size={50} anchor="middle">$4.99</Big>
          <Big x={640} y={110} size={92} anchor="middle" color={C.yellow}>SAME PRICE?!</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(330,400) scale(2.4)"><Bill /></g>
        <Sparkle x={560} y={200} t={0.5} s={0.8} />
        <Big x={1240} y={220} size={110} anchor="end" color={C.red}>$1 in 1913</Big>
        <Big x={1240} y={380} size={110} anchor="end">= $33</Big>
        <Big x={1240} y={560} size={60} anchor="end" color="#5B6470">where did it go?</Big>
      </svg>
    </AbsoluteFill>
  );
};
