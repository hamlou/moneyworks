import React from 'react';
import {C} from '../theme';
import {Cake, Handcuffs} from '../props30';
import {House} from '../props4';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep30: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF7EB6" b="#3D0724" cx={860} cy={440}>
        <Glow x={880} y={440} r={260} color="#FFD23F" o={0.4} />
        <Hero x={880} y={620} s={0.55}>
          <House />
        </Hero>
        <Hero x={880} y={400} s={0.95}>
          <Cake n="40" lit={1} />
        </Hero>
        <BigNum x={880} y={110} size={140} text="AGE 40?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="scream" pose="shock" look={0.8} lines sweat rim="#FFB3C7" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={860} cy={440}>
        <Hero x={880} y={640} s={0.62}>
          <House />
        </Hero>
        <Hero x={880} y={420} s={1.6} r={-8}>
          <Handcuffs color={C.gold} />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#FFE680" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'LOCKED'}, {t: 'IN', c: C.ink, box: '#fff'}]]} />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
      <Hero x={880} y={640} s={0.75}>
        <House sold="SOLD" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#8FD3F5" />
      <BigNum x={860} y={140} size={118} text="WHO BOUGHT IT?" c="gold" r={-3} anchor="middle" />
    </Stage>
  );
};
