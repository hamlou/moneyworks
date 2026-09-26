import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from './theme';
import {Stick} from './Stick';
import {Coin, Duck, Sparkle} from './props';

export type AvatarProps = {v: 'A' | 'B' | 'C'};

export const Avatar: React.FC<AvatarProps> = ({v}) => {
  const bg = v === 'A' ? C.yellow : v === 'B' ? C.navy : '#9EDDB0';
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={800} height={800} viewBox="0 0 800 800">
        {v !== 'B' && Array.from({length: 16}).map((_, i) => {
          const a0 = (i / 16) * Math.PI * 2;
          const a1 = a0 + Math.PI / 16;
          return <path key={i} d={`M 400 400 L ${400 + Math.cos(a0) * 800} ${400 + Math.sin(a0) * 800} L ${400 + Math.cos(a1) * 800} ${400 + Math.sin(a1) * 800} Z`} fill="#fff" opacity={0.18} />;
        })}
        {v === 'C' ? (
          <g>
            <Stick f={20} x={300} y={2130} s={6.2} keys={[{at: 0, pose: 'idle', expr: 'grin', look: 0.4}]} acc={['hair']} seed={50} />
            <Duck f={20} x={600} y={560} s={1.3} />
          </g>
        ) : (
          <Stick f={20} x={400} y={2460} s={7.2} keys={[{at: 0, pose: 'idle', expr: v === 'B' ? 'smug' : 'grin', look: 0}]} acc={['hair']} seed={50} />
        )}
        {v === 'A' && <Coin x={640} y={620} s={3.2} />}
        {v === 'B' && (
          <g>
            <Coin x={630} y={600} s={3} />
            <Sparkle x={660} y={200} t={0.5} s={1} color={C.gold} />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
