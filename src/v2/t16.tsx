import React from 'react';
import {C} from '../theme';
import {Duck} from '../props';
import {Dial, Printer} from '../props2';
import {Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep16: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={860} cy={440}>
        <Glow x={860} y={460} r={260} color="#fff" o={0.35} />
        <Hero x={870} y={520} s={1.7} r={-4}>
          <Dial v={0.92} label="YOUR RATES" />
        </Hero>
        <Face cx={260} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} lines sweat />
        <Headline x={870} y={92} size={120} anchor="middle" r={-3} lines={[[{t: 'WHO'}, {t: 'TURNS', c: Y}, {t: 'IT?'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3AA0FF" b="#061A3D" cx={420} cy={440}>
        <Glow x={420} y={460} r={240} color={Y} o={0.4} />
        <Hero x={420} y={450} s={1.9} r={-8}>
          <Duck f={0} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="suspicious" look={-0.8} flip />
        <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'FAKE'}, {t: 'DUCK HUNT', c: C.ink, box: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Glow x={860} y={460} r={260} color={Y} o={0.35} />
      <Hero x={870} y={500} s={3.2} r={-5}>
        <Printer />
      </Hero>
      <Face cx={260} cy={440} s={5.2} expr="money" look={0.8} />
      <Headline x={870} y={92} size={120} anchor="middle" r={-2} lines={[[{t: 'BRRRR', c: Y}, {t: '?!'}]]} />
    </Stage>
  );
};
