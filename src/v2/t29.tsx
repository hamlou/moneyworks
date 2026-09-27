import React from 'react';
import {C} from '../theme';
import {IceCream} from '../props29';
import {Coin, MoneyStack} from '../props';
import {Vault} from '../props';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep29: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={440} r={240} color="#FFD23F" o={0.45} />
        <Hero x={880} y={450} s={6}>
          <Coin />
        </Hero>
        <BigNum x={880} y={120} size={150} text="50 CENTS?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Hero x={880} y={480} s={1.2}>
          <Vault open={1} inside={<g>{[-60, 0, 60].map((x) => <MoneyStack key={x} x={x} y={40} n={4} s={0.6} />)}</g>} />
        </Hero>
        <Face cx={250} cy={450} s={5} expr="smug" acc={['tophat', 'monocle']} seed={31} look={0.8} rim="#FFD23F" />
        <Headline x={880} y={92} size={108} anchor="middle" r={-2} lines={[[{t: '3.9%'}, {t: 'FOR'}, {t: 'THEM', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
      <Hero x={880} y={470} s={1.9} r={-6}>
        <IceCream melt={0.6} />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#8FD3F5" />
      <BigNum x={880} y={120} size={150} text="MELTING" c="red" r={-3} />
    </Stage>
  );
};
