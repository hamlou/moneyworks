import React from 'react';
import {C} from '../theme';
import {Raccoon} from '../props3';
import {MoneyStack} from '../props';
import {CatLamp, SalesPhone} from '../props56';
import {ArrowCue, BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep56: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2E8BFF" b="#061A3A" cx={680} cy={360}>
        <Hero x={480} y={385} s={0.98} r={-4} flat>
          <SalesPhone value="$3,000" head="MY STORE" />
        </Hero>
        <Hero x={890} y={385} s={0.98} r={4} flat>
          <SalesPhone value="-$1,546" label="BALANCE" head="MY BANK" headColor={C.red} color={C.red} />
        </Hero>
        <ArrowCue x1={600} y1={250} x2={760} y2={250} bend={-0.3} />
        <Face cx={150} cy={560} s={2.3} expr="shock" look={0.9} lines sweat rim="#BFE0FF" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFB020" b="#3A1A02" cx={400} cy={380}>
        <Hero x={400} y={640} s={1.35} flat>
          <CatLamp price="$30" />
        </Hero>
        <BigNum x={930} y={300} size={210} text="-$25" c="red" r={-4} />
        <Headline x={930} y={460} size={72} anchor="middle" r={-4} lines={[[{t: 'ADS PER LAMP', c: '#fff'}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={820} cy={420}>
      <Glow x={820} y={440} r={260} color="#FFD23F" o={0.4} />
      <Hero x={820} y={470} s={1.7}>
        <Raccoon f={20} mood="greedy" holdCoin />
      </Hero>
      <Hero x={1060} y={300} s={1.1}>
        <MoneyStack n={6} label="" />
      </Hero>
      <Face cx={180} cy={560} s={2.4} expr="shock" look={0.9} lines rim="#B8FFD9" />
      <Headline x={60} y={90} size={96} lines={[[{t: 'THEY', c: '#fff'}, {t: 'GOT PAID', c: C.ink, box: C.yellow}]]} />
    </Stage>
  );
};
