import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Sparkle} from '../props';
import {GoldBar} from '../props2';
import {Big, Burst, TW, TH} from '../Thumb';

const Rock: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -120 20 Q -140 -60 -60 -90 Q 20 -130 90 -80 Q 150 -30 120 40 Q 80 100 -20 90 Q -100 80 -120 20 Z" fill={C.gold} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -50 Q -20 -80 30 -60" fill="none" stroke="#FFF3A6" strokeWidth={12} strokeLinecap="round" />
  </g>
);

export const Ep08Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Rock x={400} y={420} s={2.2} />
          <Sparkle x={640} y={180} t={0.5} s={0.9} />
          <Stick f={20} x={1050} y={1240} s={2.7} keys={[{at: 0, pose: 'shrug', expr: 'suspicious', look: -0.5}]} acc={['hair']} seed={50} />
          <Big x={40} y={100} size={100} r={-3} color={C.yellow}>JUST A ROCK?</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={640} cy={430} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <g transform="translate(640,430) scale(1.9)">
            <path d="M -150 -60 L 0 -140 L 150 -60 L 0 20 Z" fill="#FFE08A" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <path d="M -150 -60 L 0 20 L 0 200 L -150 120 Z" fill={C.gold} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <path d="M 150 -60 L 0 20 L 0 200 L 150 120 Z" fill="#E0A91F" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
          </g>
          <Big x={640} y={90} size={96} anchor="middle">ALL GOLD EVER = $30T</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <GoldBar x={380} y={420} s={3} />
        <Big x={1240} y={230} size={110} anchor="end" color={C.red}>$35</Big>
        <Big x={1240} y={380} size={110} anchor="end">→ $4,300</Big>
        <Big x={1240} y={540} size={56} anchor="end" color="#5B6470">why so expensive?</Big>
      </svg>
    </AbsoluteFill>
  );
};
