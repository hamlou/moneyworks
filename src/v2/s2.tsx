import React from 'react';
import {C} from '../theme';
import {Sparkle} from '../props';
import {CreditCard} from '../props2';
import {Jet, MilesCard} from '../props8';
import {Face, Glow, Headline, Hero, Ring, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep11: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3AA0FF" b="#061A3D" cx={860} cy={420}>
        <Glow x={860} y={420} r={260} color="#BFE6F7" o={0.45} />
        <Hero x={880} y={440} s={1.05} r={-6}>
          <Jet livery={C.red} name="AIRLINE" />
        </Hero>
        <Face cx={270} cy={440} s={5.2} expr="shock" pose="shock" look={0.8} lines />
        <Headline x={880} y={100} size={124} anchor="middle" r={-3} lines={[[{t: '$8'}, {t: 'PROFIT?!', c: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={420} cy={430}>
        <Glow x={420} y={430} r={260} color={Y} o={0.4} />
        <Hero x={420} y={440} s={1.45} r={-8}>
          <MilesCard miles="80,000" />
        </Hero>
        <Sparkle x={160} y={230} t={0.5} s={1} color="#fff" />
        <Face cx={1000} cy={430} s={5.2} expr="money" look={-0.8} flip />
        <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'SECRET'}, {t: 'PRINTER', c: C.ink, box: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={880} cy={440}>
      <Hero x={860} y={470} s={0.95} r={4}>
        <Jet livery={C.navy} name="BANK AIR" />
      </Hero>
      <Hero x={1110} y={640} s={0.75} r={-10}>
        <CreditCard />
      </Hero>
      <Ring x={860} y={430} rx={440} ry={200} r={-4} />
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} />
      <Headline x={860} y={90} size={120} anchor="middle" r={-2} lines={[[{t: 'SECRETLY'}, {t: 'A'}, {t: 'BANK', c: Y}]]} />
    </Stage>
  );
};
