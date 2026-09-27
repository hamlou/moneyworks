import React from 'react';
import {C} from '../theme';
import {Cart} from '../props8';
import {Milk, SaleSign} from '../props36';
import {Magnifier} from '../props2';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep36: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={900} y={500} s={1.8}><Cart items={8} /></Hero>
        <Hero x={1130} y={560} s={1.4}><Milk /></Hero>
        <BigNum x={880} y={110} size={150} text="$87" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#B8FFD9" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Hero x={880} y={470} s={2.6}><Milk /></Hero>
        <Face cx={240} cy={460} s={5} expr="scream" pose="shock" look={0.8} lines sweat rim="#FFB347" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'JUST'}, {t: 'MILK?!', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
      <Hero x={860} y={470} s={1.5} r={-4}><SaleSign was="$60" now="$9.99" strike={1} /></Hero>
      <Hero x={1060} y={520} s={1.4} r={-20}><Magnifier /></Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#D9C2FF" />
      <BigNum x={880} y={120} size={130} text="FAKE SALE?" c="gold" r={-3} />
    </Stage>
  );
};
