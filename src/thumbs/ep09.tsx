import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Stand, Share} from '../props7';
import {Big, Burst, TW, TH} from '../Thumb';

export const Ep09Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFE14D" b="#FFD000" cx={380} cy={460} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <g transform="translate(380,700) scale(1.1)"><Stand /></g>
          <Stick f={20} x={1050} y={1250} s={2.7} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.5}]} acc={['hair']} seed={50} />
          <Big x={40} y={90} size={84} r={-2} color={C.red}>NO PROFIT.</Big>
          <Big x={40} y={190} size={84} r={-2}>WORTH BILLIONS?</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <g transform="translate(330,420) scale(1.4)"><Share n="$200" /></g>
          <text x={640} y={420} fontSize={120} fill="#fff" textAnchor="middle" dominantBaseline="middle">→</text>
          <g transform="translate(950,420) scale(1.4)"><Share n="$300" /></g>
          <Big x={640} y={100} size={96} anchor="middle" color={C.yellow}>SAME LEMONADE?!</Big>
          <Big x={640} y={640} size={60} anchor="middle">how stock prices REALLY move</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <line x1={120} y1={640} x2={760} y2={640} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <rect x={170} y={220} width={240} height={420} rx={12} fill={C.green} stroke={C.ink} strokeWidth={7} />
        <rect x={480} y={510} width={240} height={130} rx={12} fill={C.red} stroke={C.ink} strokeWidth={7} />
        <Big x={290} y={180} size={64} anchor="middle" color={C.green}>7.1%</Big>
        <Big x={600} y={470} size={64} anchor="middle" color={C.red}>2.2%</Big>
        <Stick f={20} x={1020} y={1160} s={2.3} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} acc={['glasses', 'tie']} seed={79} />
        <Big x={1250} y={100} size={80} anchor="end">THE $1M BET</Big>
      </svg>
    </AbsoluteFill>
  );
};
