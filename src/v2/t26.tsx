import React from 'react';
import {C} from '../theme';
import {Popcorn, Cheque, Handset, Cage} from '../props26';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep26: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={440} r={260} color="#FFD23F" o={0.45} />
        <Hero x={880} y={500} s={1.7} r={-6}>
          <Popcorn label="75%" />
        </Hero>
        <Face cx={250} cy={450} s={5.1} expr="money" look={0.8} rim="#FFD23F" />
        <Headline x={880} y={92} size={110} anchor="middle" r={-2} lines={[[{t: 'THE'}, {t: 'POPCORN', c: 'gold'}, {t: 'TRICK'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Hero x={880} y={440} s={1.2} r={-5}>
          <Cheque to="APPLE" amount="$20,000,000,000" memo="for what?" from="GOOGLE" />
        </Hero>
        <Face cx={250} cy={450} s={5.1} expr="suspicious" look={0.8} rim="#9EDDB0" />
        <BigNum x={880} y={130} size={150} text="$20 BILLION" c="green" r={-3} />
      </Stage>
    );
  return (
    <Stage a="#8A5CFF" b="#170A3A" cx={860} cy={440}>
      <Hero x={880} y={520} s={1.3}>
        <Cage gold />
      </Hero>
      <Hero x={880} y={520} s={0.7}>
        <Handset />
      </Hero>
      <Face cx={250} cy={450} s={5.1} expr="shock" pose="shock" look={0.8} lines rim="#B79CFF" />
      <Headline x={880} y={92} size={110} anchor="middle" r={-2} lines={[[{t: 'GOLDEN'}, {t: 'CAGE', c: C.ink, box: C.yellow}]]} />
    </Stage>
  );
};
