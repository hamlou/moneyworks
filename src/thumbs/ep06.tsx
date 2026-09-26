import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {XMark, Bill} from '../props';
import {Globe} from '../props4';
import {Flag} from '../props6';
import {Big, Burst, TW, TH} from '../Thumb';

export const Ep06Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={380} cy={420} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Flag kind="cn" x={380} y={400} s={1.7} />
          <XMark x={380} y={380} s={0.55} />
          <Stick f={20} x={1000} y={1260} s={2.9} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.5}]} acc={['hair']} seed={50} />
          <Big x={1250} y={100} size={110} anchor="end">NOT CHINA.</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Flag kind="us" x={330} y={400} s={1.4} />
          <text x={640} y={380} fontSize={150} fill="#fff" textAnchor="middle" dominantBaseline="middle">→</text>
          <Flag kind="us" x={950} y={400} s={1.4} />
          <Big x={640} y={100} size={96} anchor="middle" color={C.yellow}>WHO GETS PAID?</Big>
          <Big x={640} y={640} size={80} anchor="middle">$40,000,000,000,000</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <Globe x={420} y={420} s={1.5} f={40} />
        <circle cx={420} cy={420} r={270} fill="none" stroke={C.green} strokeWidth={30} />
        <Bill x={420} y={150} s={1} />
        <Big x={1240} y={260} size={120} anchor="end" color={C.red}>$40</Big>
        <Big x={1240} y={400} size={100} anchor="end" color={C.red}>TRILLION</Big>
        <Big x={1240} y={560} size={60} anchor="end">owed to... who?</Big>
      </svg>
    </AbsoluteFill>
  );
};
