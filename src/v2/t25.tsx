import React from 'react';
import {C} from '../theme';
import {Cup, GiftCard, BankHall} from '../props25';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep25: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Glow x={860} y={440} r={280} color="#FFD23F" o={0.4} />
        <Hero x={900} y={520} s={1.6} r={-4}>
          <Cup label="BANK" />
        </Hero>
        <BigNum x={880} y={140} size={150} text="$1.75B" c="gold" r={-3} />
        <Face cx={250} cy={450} s={5.1} expr="money" look={0.8} rim="#FFD23F" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={860} cy={440}>
        <Hero x={880} y={460} s={1.6} r={-8}>
          <GiftCard value="$50" />
        </Hero>
        <Face cx={250} cy={450} s={5.1} expr="shock" pose="shock" look={0.8} lines rim="#B79CFF" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'FREE'}, {t: 'LOAN?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={880} cy={460}>
      <Hero x={900} y={560} s={1}>
        <BankHall label="STARBUCKS BANK" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#8FD3F5" />
      <Headline x={900} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'SECRETLY'}, {t: 'A'}, {t: 'BANK', c: 'gold'}]]} />
    </Stage>
  );
};
