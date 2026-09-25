import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Coin, Sparkle, G} from '../props';
import {CreditCard} from '../props2';
import {Raccoon, TollBooth, Bathtub, Bush} from '../props3';
import {Big, Burst, TW, TH} from '../Thumb';

export const Ep02Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={900} cy={420} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <CreditCard x={330} y={470} s={1.3} r={-10} />
          <path d="M 560 470 Q 640 400 700 450" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          <Raccoon f={20} x={930} y={430} s={1.9} mood="greedy" holdCoin grab={0.8} />
          <Sparkle x={1180} y={160} t={0.5} s={0.7} />
          <Big x={40} y={100} size={112} r={-3}>THE HIDDEN</Big>
          <Big x={40} y={220} size={112} r={-3} color={C.yellow}>FEE</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: '#BDE7F7'}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Stick f={20} x={420} y={1180} s={2.8} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.2}]} acc={['hair']} seed={50} />
          <ellipse cx={420} cy={165} rx={90} ry={24} fill="none" stroke={C.gold} strokeWidth={14} />
          <Raccoon f={20} x={960} y={520} s={1.5} mood="sneaky" />
          <Bush x={980} y={700} s={1.6} />
          <Big x={1240} y={110} size={100} anchor="end">PAID ON</Big>
          <Big x={1240} y={225} size={100} anchor="end" color={C.yellow}>TIME?</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.navy}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <Bathtub x={900} y={560} s={0.95} level={0.62} f={10} spoon={1} />
        <Stick f={20} x={330} y={880} s={1.5} sweat keys={[{at: 0, pose: 'shock', expr: 'shock'}]} acc={['cap']} seed={50} />
        <Big x={640} y={120} size={130} anchor="middle" color={C.red}>THE 22% TRAP</Big>
        <G x={1160} y={330} s={0.9}><Coin /></G>
      </svg>
    </AbsoluteFill>
  );
};
