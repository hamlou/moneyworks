import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Stick} from '../Stick';
import {CreditCard} from '../props2';

const POS = ['present', 'talk', 'point_r', 'thumbs', 'hold', 'idle'];

export const V2Ep99: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => (
  <AbsoluteFill style={{background: '#FFF8EC'}}>
    <svg width={1280} height={720} viewBox="0 0 1280 720">
      {POS.map((p, i) => (
        <g key={p}>
          <Stick f={20} x={110 + i * 210} y={620} s={0.55} flip={v === 'B'} keys={[{at: 0, pose: p, expr: 'happy', look: 0.5}]} acc={['hair']} seed={7}
            hold={v === 'C' ? undefined : {item: <CreditCard s={0.35} />, side: 'r'}}
            handItem={v === 'C' ? <CreditCard s={0.35} /> : undefined} />
          <text x={110 + i * 210} y={690} textAnchor="middle" fontSize={28}>{p}</text>
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);
