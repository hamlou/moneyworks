import React from 'react';
import {C} from '../theme';
import {StaringJar, TipScreen} from '../props34';
import {Bottle} from '../props8';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep34: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={470} s={1.7} r={-4}>
          <TipScreen opts={['20%', '25%', '30%']} hl={2} />
        </Hero>
        <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} lines rim="#D9C2FF" />
        <Headline x={880} y={92} size={104} anchor="middle" r={-2} lines={[[{t: 'FOR A'}, {t: 'MACHINE?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Hero x={760} y={480} s={2.2} r={-6}>
          <Bottle />
        </Hero>
        <Hero x={1030} y={470} s={0.9} r={4}>
          <TipScreen opts={['20%', '25%', '30%']} hl={1} />
        </Hero>
        <BigNum x={880} y={110} size={150} text="25%?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="scream" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={480} s={2.2}>
        <StaringJar f={0} label="TIPS" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="worried" look={0.8} sweat rim="#B8FFD9" />
      <BigNum x={880} y={120} size={130} text="WHO GETS IT?" c="gold" r={-3} />
    </Stage>
  );
};
