import React from 'react';
import {C} from '../theme';
import {Diamond, PriceSlash, RingBox} from '../props44';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep44: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={470} s={2.6} r={-6}>
          <Diamond glow={1} />
        </Hero>
        <BigNum x={880} y={110} size={140} text="3 MONTHS?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="scream" pose="shock" look={0.8} lines sweat rim="#8FD3F5" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Hero x={880} y={480} s={1.4}>
          <RingBox open={1} glow={0.5} />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="suspicious" look={0.8} lines rim="#FFB347" />
        <Headline x={880} y={92} size={110} anchor="middle" r={-2} lines={[[{t: 'FAKE'}, {t: 'RULE', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={470} s={1.1}>
        <PriceSlash from="$4,600" to="$460" label="LAB-GROWN" hit={1} />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="smug" look={0.8} rim="#B8FFD9" />
      <BigNum x={880} y={120} size={130} text="90% CHEAPER" c="gold" r={-3} />
    </Stage>
  );
};
