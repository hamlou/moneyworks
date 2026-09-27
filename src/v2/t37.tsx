import React from 'react';
import {C} from '../theme';
import {Radar, RenewalLetter} from '../props37';
import {Car} from '../props';
import {Raccoon} from '../props3';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep37: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={470} s={1.3} r={-5}><RenewalLetter old="$1,840" now="$2,244" hl={1} title="RENEWAL" /></Hero>
        <BigNum x={880} y={105} size={125} text="I DID NOTHING" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Hero x={880} y={500} s={2.3}><Car /></Hero>
        <Hero x={1060} y={520} s={1.3}><Radar glow={1} /></Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#8FD3F5" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: '$2,000'}, {t: 'BUMPER', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#FFC94D" b="#7A2E00" cx={860} cy={440}>
      <Hero x={880} y={560} s={1.8}><Raccoon f={0} mood="greedy" holdCoin /></Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#FFE680" />
      <BigNum x={880} y={120} size={130} text="LOYALTY TAX" c="red" r={-3} />
    </Stage>
  );
};
