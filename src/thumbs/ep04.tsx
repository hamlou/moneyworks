import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Sparkle} from '../props';
import {Burger, House} from '../props4';
import {Board, Land} from '../props5';
import {Big, Burst, TW, TH} from '../Thumb';

export const Ep04Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={640} cy={420} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Burger x={300} y={450} s={1.4} />
          <path d="M 520 440 Q 640 360 760 440" fill="none" stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
          <path d="M 730 408 L 766 444 L 720 466" fill="none" stroke={C.ink} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
          <House x={1000} y={640} s={0.62} />
          <Sparkle x={1180} y={200} t={0.5} s={0.7} />
          <Big x={640} y={90} size={104} anchor="middle">SECRET LANDLORD</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Board x={420} y={400} s={0.85} hotels={[1, 3, 6, 9, 12, 14]} piece={5} />
          <Stick f={20} x={1020} y={1060} s={2.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} acc={['fedora', 'tie']} seed={50} />
          <Big x={1250} y={100} size={92} anchor="end" color={C.yellow}>NOT BURGERS.</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <line x1={120} y1={640} x2={880} y2={640} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <rect x={200} y={590} width={220} height={50} rx={10} fill={C.blue} stroke={C.ink} strokeWidth={6} />
        <rect x={560} y={140} width={220} height={500} rx={10} fill={C.green} stroke={C.ink} strokeWidth={6} />
        <Big x={310} y={540} size={64} anchor="middle" color={C.blue}>$1.4B</Big>
        <Big x={670} y={95} size={64} anchor="middle" color={C.green}>$13.9B</Big>
        <Land x={1060} y={560} s={0.9} owned={1} />
        <Big x={1080} y={250} size={120} anchor="middle" color={C.red}>10×?!</Big>
      </svg>
    </AbsoluteFill>
  );
};
