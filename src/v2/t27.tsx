import React from 'react';
import {C} from '../theme';
import {Cloud, Parcel, ServerRack} from '../props27';
import {Raccoon} from '../props3';
import {Bill} from '../props';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep27: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={420}>
        <Glow x={880} y={420} r={280} color="#7FE3FF" o={0.45} />
        <Hero x={900} y={400} s={1.0}>
          <Cloud label="CLOUD" />
        </Hero>
        <BigNum x={880} y={620} size={150} text="57% HERE" c="gold" r={-3} />
        <Face cx={250} cy={450} s={5.1} expr="shock" pose="shock" look={0.8} lines sweat rim="#8FD3F5" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF8A3D" b="#5A1206" cx={860} cy={440}>
        <Hero x={760} y={520} s={1.5} r={-8}>
          <Parcel label="$10" />
        </Hero>
        <Hero x={1050} y={470} s={1.5}>
          <Raccoon f={20} mood="greedy" holdCoin grab={0.9} />
        </Hero>
        <Face cx={230} cy={460} s={4.8} expr="angry" look={0.8} lines rim="#FFB347" />
        <Headline x={860} y={92} size={108} anchor="middle" r={-2} lines={[[{t: 'HALF'}, {t: 'IS'}, {t: 'THEIRS', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={880} cy={440}>
      <Hero x={880} y={560} s={1.1}>
        <ServerRack f={20} on label="AWS" />
      </Hero>
      <Hero x={1130} y={250} s={1.2} r={15}>
        <Bill />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="money" look={0.8} rim="#FFD23F" />
      <Headline x={860} y={92} size={108} anchor="middle" r={-2} lines={[[{t: 'NOT'}, {t: 'THE', c: 'gold'}, {t: 'STORE', c: 'gold'}]]} />
    </Stage>
  );
};
