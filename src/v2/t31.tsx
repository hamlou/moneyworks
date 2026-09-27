import React from 'react';
import {C} from '../theme';
import {Phone} from '../props2';
import {Leak} from '../props31';
import {Calendar, MoneyStack} from '../props';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep31: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={470} s={1.9} r={-6}>
          <Phone title="BALANCE" value="$38" color={C.red} />
        </Hero>
        <BigNum x={880} y={110} size={140} text="BY MONDAY?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Hero x={880} y={420} s={1.5}>
          <MoneyStack n={5} />
        </Hero>
        <Hero x={880} y={560} s={1.6} flat>
          <Leak f={40} on={0} />
        </Hero>
        <Face cx={250} cy={450} s={5} expr="scream" pose="shock" look={0.8} lines rim="#8FD3F5" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: '5'}, {t: 'LEAKS', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={470} s={2.2} r={-5}>
        <Calendar year="1st" flip={0} top="EVERY BILL" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#FFE680" />
      <BigNum x={880} y={120} size={140} text="THE 1ST" c="gold" r={-3} />
    </Stage>
  );
};
