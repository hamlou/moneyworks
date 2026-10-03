import React from 'react';
import {Raccoon} from '../props3';
import {BoxPile, PyramidDiagram, ShakeBox} from '../props53';
import {Face, Glow, Headline, Hero, SplitStage, Stage, Tower} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep53: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <SplitStage left={['#3BE36B', '#0B3D1E']} right={['#FF4040', '#3A0612']}>
        <Tower x={330} base={600} h={110} w={260} color="#2BD67B" label="EARNED" value="$240" />
        <Tower x={930} base={600} h={400} w={300} color="#FF4040" label="SPENT" value="$1,649" />
        <Face cx={600} cy={560} s={2.3} expr="shock" look={0.9} lines sweat rim="#FFE680" />
      </SplitStage>
    );
  if (v === 'B')
    return (
      <Stage a="#C08A3E" b="#2A1606" cx={760} cy={380}>
        <Hero x={780} y={640} s={0.72} flat>
          <BoxPile n={40} />
        </Hero>
        <Face cx={300} cy={430} s={3.3} expr="grin" look={0.6} rim="#FFE0A8" />
        <Hero x={470} y={560} s={0.95} r={8}>
          <ShakeBox />
        </Hero>
        <Headline x={60} y={90} size={120} lines={[[{t: 'BOSS?', c: 'gold'}]]} />
      </Stage>
    );
  return (
    <Stage a="#9B5DE5" b="#1A0636" cx={700} cy={300}>
      <Glow x={700} y={150} r={180} color="#FFD23F" o={0.5} />
      <Hero x={700} y={480} s={1.05} flat>
        <PyramidDiagram top="" bottom="YOU" highlight={3} />
      </Hero>
      <Hero x={700} y={140} s={1.0}>
        <Raccoon f={20} mood="greedy" holdCoin />
      </Hero>
      <Face cx={170} cy={560} s={2.4} expr="shock" look={0.9} lines rim="#D9C2FF" />
      <Headline x={60} y={80} size={70} lines={[[{t: 'WHO GETS', c: '#fff'}], [{t: 'PAID?', c: 'gold'}]]} />
    </Stage>
  );
};
