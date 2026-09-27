import React from 'react';
import {C} from '../theme';
import {Coffee, PriceTag, Raccoon, TollBooth} from '../props3';
import {Boot} from '../props35';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep35: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.45} />
        <Hero x={860} y={500} s={2.6}>
          <Coffee steam={1} f={0} />
        </Hero>
        <Hero x={1080} y={330} s={1.6} r={12}><PriceTag text="$39" color={C.red} /></Hero>
        <BigNum x={880} y={110} size={140} text="$3 SHORT" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={860} cy={440}>
        <Hero x={740} y={500} s={2.1}><Boot cheap leak={1} f={20} /></Hero>
        <Hero x={1040} y={500} s={2.1}><Boot /></Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#FFE680" />
        <Headline x={880} y={92} size={108} anchor="middle" r={-2} lines={[[{t: 'PAYING'}, {t: 'TWICE', c: C.ink, box: '#fff'}]]} />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
      <Hero x={960} y={520} s={1.3}><TollBooth barUp={0} label="$0 LANE" /></Hero>
      <Hero x={720} y={560} s={1.5}><Raccoon f={0} mood="greedy" holdCoin /></Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#8FD3F5" />
      <BigNum x={880} y={120} size={140} text="BROKE FEE" c="gold" r={-3} />
    </Stage>
  );
};
