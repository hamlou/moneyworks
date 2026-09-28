import React from 'react';
import {C} from '../theme';
import {DeliSandwich, ScannerArch, SecurityBin} from '../props47';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep47: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={500} s={3.6} r={-6}>
          <DeliSandwich price="$18" />
        </Hero>
        <BigNum x={880} y={110} size={140} text="TRAPPED" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Hero x={880} y={470} s={1.1}>
          <SecurityBin confiscated />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#8FD3F5" />
        <Headline x={880} y={92} size={96} anchor="middle" r={-2} lines={[[{t: 'THEN'}, {t: 'THEY SELL IT', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
      <Hero x={880} y={480} s={1.2}>
        <ScannerArch glow={1} />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#D9C2FF" />
      <BigNum x={880} y={120} size={120} text="FAKE RULE?" c="gold" r={-3} />
    </Stage>
  );
};
