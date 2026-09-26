import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {XMark} from '../props';
import {PriceTag} from '../props3';
import {House, Pizza, Cat} from '../props4';
import {Big, Burst, TW, TH} from '../Thumb';

export const Ep03Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#BDE7F7" b="#A5DDF2" cx={420} cy={480} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <House x={400} y={700} s={0.8} />
          <PriceTag x={420} y={210} s={1.2} r={-6} text="$300,000" />
          <XMark x={400} y={210} s={0.28} />
          <Stick f={20} x={1090} y={1320} s={3.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.5}]} acc={['hair']} seed={50} />
          <Big x={1250} y={120} size={130} anchor="end" color={C.red}>$720,000?!</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Pizza x={420} y={430} s={1.35} eaten={7} />
          <Stick f={20} x={1000} y={1100} s={2.3} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} acc={['tophat', 'monocle', 'tie']} seed={50} />
          <Big x={640} y={80} size={96} anchor="middle" color={C.yellow}>THE BANK EATS FIRST</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <rect x={60} y={300} width={1160} height={170} rx={30} fill={C.red} stroke={C.ink} strokeWidth={8} />
        <rect x={60} y={300} width={142} height={170} rx={30} fill={C.green} stroke={C.ink} strokeWidth={8} />
        <Big x={131} y={560} size={70} anchor="middle" color={C.green}>$244</Big>
        <Big x={700} y={390} size={110} anchor="middle">$1,758 → BANK</Big>
        <Big x={640} y={110} size={92} anchor="middle">WHERE YOUR $2,002 GOES</Big>
        <Cat f={20} x={1080} y={620} s={1.1} mood="shock" />
      </svg>
    </AbsoluteFill>
  );
};
