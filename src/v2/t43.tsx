import React from 'react';
import {C} from '../theme';
import {Crib, DaycareSign, RentHouse} from '../props43';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep43: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={480} s={1.5} r={-4}>
          <Crib price="$300K?!" />
        </Hero>
        <BigNum x={880} y={110} size={140} text="$300K?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
        <Hero x={880} y={480} s={1.5}>
          <DaycareSign price="$1,600" />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#D9C2FF" />
        <Headline x={880} y={92} size={100} anchor="middle" r={-2} lines={[[{t: 'MORE'}, {t: 'THAN RENT', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={720} y={500} s={1.3}><RentHouse price="$1,400" label="RENT" /></Hero>
      <Hero x={1050} y={480} s={1.1}><DaycareSign price="$1,600" /></Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#B8FFD9" />
      <BigNum x={880} y={120} size={120} text="HIDDEN COST" c="gold" r={-3} />
    </Stage>
  );
};
