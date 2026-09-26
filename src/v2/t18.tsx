import React from 'react';
import {C} from '../theme';
import {Coffee, PriceTag} from '../props3';
import {BlueCar, FloatPool, Ship} from '../props18';
import {Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep18: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={460}>
        <Glow x={860} y={460} r={280} color={Y} o={0.4} />
        <Hero x={870} y={500} s={1.0} r={-4}>
          <FloatPool f={0} fill={0.95} label="FLOAT" />
        </Hero>
        <Face cx={260} cy={440} s={5.2} expr="money" look={0.8} lines />
        <Headline x={870} y={100} size={124} anchor="middle" r={-3} lines={[[{t: '$176'}, {t: 'BILLION', c: C.ink, box: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={430} cy={450}>
        <Glow x={430} y={450} r={240} color="#fff" o={0.35} />
        <Hero x={430} y={470} s={2.2} r={-6}>
          <BlueCar f={0} />
        </Hero>
        <Hero x={470} y={640} s={1.2} r={-4}>
          <PriceTag text="$1,500 / yr" color={Y} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="scream" pose="shock" look={-0.8} flip lines sweat />
        <Headline x={430} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'FOR'}, {t: 'NOTHING?!', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#8A5CFF" b="#170A3A" cx={860} cy={450}>
      <Glow x={860} y={450} r={260} color={Y} o={0.35} />
      <Hero x={700} y={500} s={1.1} r={-4}>
        <Ship />
      </Hero>
      <Hero x={1030} y={520} s={2.2} r={8}>
        <Coffee />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} />
      <Headline x={860} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'SINCE'}, {t: '1688?!', c: Y}]]} />
    </Stage>
  );
};
