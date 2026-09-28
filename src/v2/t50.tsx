import React from 'react';
import {C} from '../theme';
import {GuestRow, PriceCake, RingPair} from '../props50';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep50: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={480} s={1.6} r={-4}>
          <PriceCake price="$35,000" hi />
        </Hero>
        <BigNum x={880} y={110} size={140} text="$35,000?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
        <Hero x={880} y={490} s={1.4}>
          <GuestRow n={12} lit={12} perRow={6} />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="suspicious" look={0.8} lines rim="#D9C2FF" />
        <Headline x={880} y={92} size={100} anchor="middle" r={-2} lines={[[{t: 'SAY'}, {t: '"WEDDING"', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={470} s={1.6}>
        <RingPair />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="happy" look={0.8} rim="#B8FFD9" />
      <BigNum x={880} y={120} size={130} text="PRICE DOUBLES" c="gold" r={-3} />
    </Stage>
  );
};
