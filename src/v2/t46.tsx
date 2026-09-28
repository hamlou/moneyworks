import React from 'react';
import {C} from '../theme';
import {Cone, Dog, VetClinic} from '../props46';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep46: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={500} s={2}>
          <Dog mood="cone" />
        </Hero>
        <Hero x={880} y={470} s={1.3}><Cone /></Hero>
        <BigNum x={880} y={110} size={140} text="$2,000?!" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#8FD3F5" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={860} cy={440}>
        <Hero x={880} y={490} s={1.3}>
          <VetClinic />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="suspicious" look={0.8} lines rim="#FFE680" />
        <Headline x={880} y={92} size={104} anchor="middle" r={-2} lines={[[{t: 'WHO'}, {t: 'OWNS IT?', c: C.ink, box: '#fff'}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={510} s={2.2}>
        <Dog mood="sleepy" />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="worried" look={0.8} sweat rim="#B8FFD9" />
      <BigNum x={880} y={120} size={120} text="NO PRICE TAG" c="gold" r={-3} />
    </Stage>
  );
};
