import React from 'react';
import {C} from '../theme';
import {ChristmasTree} from '../props41';
import {CreditCard} from '../props2';
import {Calendar} from '../props';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep41: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={470} s={1.7} r={-5}>
          <CreditCard label="STILL PAYING" />
        </Hero>
        <BigNum x={880} y={110} size={130} text="IN MARCH?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Hero x={880} y={470} s={2.2}>
          <ChristmasTree lit={1} />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#B8FFD9" />
        <Headline x={880} y={92} size={104} anchor="middle" r={-2} lines={[[{t: 'FAKE'}, {t: 'DEALS?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
      <Hero x={880} y={470} s={2.2} r={-4}>
        <Calendar year="MAR" flip={0} top="STILL OWE" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="sad" look={0.8} sweat rim="#8FD3F5" />
      <BigNum x={880} y={120} size={130} text="XMAS DEBT" c="gold" r={-3} />
    </Stage>
  );
};
