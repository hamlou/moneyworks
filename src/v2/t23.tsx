import React from 'react';
import {C} from '../theme';
import {Suv, TowTruck, Sticker, Dealership} from '../props23';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep23: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={860} y={440} r={280} color="#FFD23F" o={0.4} />
        <Hero x={880} y={560} s={1.3} r={-3}>
          <Suv color={C.blue} />
        </Hero>
        <BigNum x={870} y={170} size={170} text="84 MONTHS" c="gold" r={-3} />
        <Face cx={250} cy={450} s={5.1} expr="scream" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Hero x={860} y={470} s={1.15} r={3}>
          <Sticker title="MONTHLY" value="$750" color={C.red} sub="for 7 years" />
        </Hero>
        <Face cx={250} cy={450} s={5.1} expr="angry" look={0.8} lines rim="#8FD3F5" />
        <Headline x={860} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'THE'}, {t: 'TRAP', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={880} cy={460}>
      <Hero x={880} y={520} s={1.15}>
        <TowTruck lift={1} />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="worried" look={0.8} sweat rim="#9EDDB0" />
      <BigNum x={880} y={140} size={140} text="UNDERWATER" c="red" r={-3} />
    </Stage>
  );
};
