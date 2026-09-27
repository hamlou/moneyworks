import React from 'react';
import {Pill, PillBottle} from '../props40';
import {HospitalBill, PriceTag, Raccoon} from '../props3';
import {Magnifier} from '../props2';
import {C} from '../theme';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep40: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.45} />
        <Hero x={860} y={480} s={2} r={-10}><Pill /></Hero>
        <Hero x={1090} y={360} s={1.6} r={12}><PriceTag text="$40" color={C.red} /></Hero>
        <BigNum x={880} y={110} size={150} text="ONE PILL?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="scream" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Hero x={860} y={480} s={2} r={-5}><HospitalBill /></Hero>
        <Hero x={1060} y={520} s={1.4} r={-20}><Magnifier /></Hero>
        <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} lines rim="#8FD3F5" />
        <Headline x={880} y={92} size={108} anchor="middle" r={-2} lines={[[{t: 'FAKE'}, {t: 'PRICES?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={780} y={560} s={1.7}><Raccoon f={0} mood="sneaky" /></Hero>
      <Hero x={1050} y={480} s={1.6} r={8}><PillBottle label="Rx" price="$$$" /></Hero>
      <Face cx={250} cy={450} s={5} expr="worried" look={0.8} sweat rim="#B8FFD9" />
      <BigNum x={880} y={120} size={130} text="WHO GETS PAID?" c="gold" r={-3} />
    </Stage>
  );
};
