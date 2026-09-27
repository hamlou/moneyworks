import React from 'react';
import {C} from '../theme';
import {Phone} from '../props2';
import {Countdown} from '../props38';
import {Jar} from '../props36';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep38: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={480} s={1.9} r={-6}><Phone title="1-CLICK" value="BUY NOW" color={C.red} /></Hero>
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#D9C2FF" />
        <Headline x={880} y={92} size={100} anchor="middle" r={-2} lines={[[{t: 'BUILT'}, {t: 'TO'}, {t: 'SPEND', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Hero x={880} y={480} s={2.4}><Jar label="SAVINGS" /></Hero>
        <BigNum x={880} y={110} size={140} text="$0 AGAIN" c="red" r={-3} />
        <Face cx={240} cy={460} s={5} expr="sad" look={0.8} sweat rim="#B8FFD9" />
      </Stage>
    );
  return (
    <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
      <Hero x={880} y={470} s={1.7} r={-4}><Countdown time="00:59" hl={1} /></Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#FFB347" />
      <BigNum x={880} y={120} size={130} text="IT'S A TRICK" c="gold" r={-3} />
    </Stage>
  );
};
