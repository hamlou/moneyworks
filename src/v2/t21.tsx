import React from 'react';
import {C} from '../theme';
import {GasPump, StraitMap, Rocket, Feather, Barrel} from '../props21';
import {BigNum, Face, Glow, Headline, Hero, SplitStage, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep21: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={420} cy={420}>
        <Glow x={420} y={430} r={280} color="#FFD23F" o={0.45} />
        <Hero x={360} y={690} s={0.95} r={-4}>
          <GasPump price="$$$" />
        </Hero>
        <BigNum x={640} y={110} size={140} text="RECORD HIGH" c="gold" r={-3} />
        <Face cx={1010} cy={430} s={5.2} expr="scream" pose="shock" look={-0.8} flip lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2E8BFF" b="#061A3D" cx={860} cy={420}>
        <Hero x={930} y={440} s={0.88} r={-3}>
          <StraitMap ships={1} danger={1} labels={false} />
        </Hero>
        <BigNum x={860} y={150} size={170} text="95% GONE" c="red" r={-3} />
        <Face cx={240} cy={460} s={4.7} expr="shock" pose="shock" look={0.8} lines rim="#8FD3F5" />
      </Stage>
    );
  return (
    <SplitStage left={['#2BD67B', '#062E1C']} right={['#9AA5B1', '#2A2F38']}>
      <Hero x={300} y={420} s={1.4} r={-18}>
        <Rocket />
      </Hero>
      <Hero x={1000} y={400} s={1.5} r={25}>
        <Feather />
      </Hero>
      <Hero x={650} y={560} s={0.8}>
        <Barrel />
      </Hero>
      <Headline x={330} y={640} size={96} anchor="middle" r={-3} lines={[[{t: 'UP', c: 'green'}, {t: 'FAST'}]]} />
      <Headline x={1000} y={640} size={96} anchor="middle" r={3} lines={[[{t: 'DOWN', c: 'red'}, {t: 'SLOW'}]]} />
      <Headline x={640} y={90} size={110} anchor="middle" lines={[[{t: 'THE'}, {t: 'GAS', c: C.ink, box: C.yellow}, {t: 'TRICK'}]]} />
    </SplitStage>
  );
};
