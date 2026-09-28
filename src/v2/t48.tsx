import React from 'react';
import {C} from '../theme';
import {Casket, PriceFolder, RuleCard} from '../props48';
import {BigNum, Face, Glow, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep48: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.35} />
        <Hero x={880} y={480} s={1.2}>
          <PriceFolder open={1} total="$10,000" />
        </Hero>
        <BigNum x={880} y={110} size={130} text="$10,000?" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="worried" look={0.8} sweat rim="#8FD3F5" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
        <Hero x={880} y={490} s={1.3} r={-3}>
          <Casket tag="+300%" glow />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="worried" look={0.8} rim="#D9C2FF" />
        <BigNum x={880} y={100} size={110} text="MARKED UP 300%" c="gold" r={-2} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={480} s={1.2}>
        <RuleCard n={1} text="ITEMIZED PRICE LIST" on />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="neutral" look={0.8} rim="#B8FFD9" />
      <BigNum x={880} y={120} size={110} text="KNOW YOUR RIGHTS" c="gold" r={-3} />
    </Stage>
  );
};
