import React from 'react';
import {C} from '../theme';
import {Paycheck} from '../props8';
import {Car} from '../props';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep32: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={900} y={480} s={1.35} r={-6}>
          <Paycheck amount="+$5,000" cut={0.6} />
        </Hero>
        <BigNum x={880} y={110} size={130} text="WHERE'D IT GO?" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#B8FFD9" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Hero x={880} y={480} s={2.4}>
          <Car />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#FFB347" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: '$777'}, {t: '/MONTH', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
      <Hero x={880} y={480} s={1.7} r={-4}>
        <Paycheck amount="RAISE!" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="sad" look={0.8} sweat rim="#D9C2FF" />
      <BigNum x={880} y={120} size={140} text="STILL BROKE" c="red" r={-3} />
    </Stage>
  );
};
