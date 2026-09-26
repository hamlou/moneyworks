import React from 'react';
import {C} from '../theme';
import {Couch, Dominoes, YieldCurve} from '../props19';
import {Face, Glow, Headline, Hero, Stage, UpArrow} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep19: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={860} cy={440}>
        <Glow x={860} y={440} r={260} color="#fff" o={0.35} />
        <Hero x={600} y={560} s={1.15}>
          <Dominoes n={5} gap={130} fall={0.55} />
        </Hero>
        <Face cx={260} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} lines sweat />
        <Headline x={870} y={92} size={120} anchor="middle" r={-3} lines={[[{t: 'YOUR'}, {t: 'JOB?!', c: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3AA0FF" b="#061A3D" cx={420} cy={440}>
        <Glow x={420} y={440} r={240} color={Y} o={0.35} />
        <Hero x={430} y={470} s={0.8} r={-4}>
          <YieldCurve inv={1} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="suspicious" look={-0.8} flip sweat />
        <Headline x={430} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'WARNING'}, {t: 'SIGN', c: C.ink, box: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#FF8A3D" b="#5A1206" cx={860} cy={460}>
      <Hero x={860} y={560} s={1.1} r={8}>
        <Couch tag="SALE" />
      </Hero>
      <UpArrow x={900} y={330} s={0.8} color="#FF2D2D" down />
      <Face cx={250} cy={450} s={5} expr="shock" pose="shock" look={0.8} lines />
      <Headline x={860} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'FIRST'}, {t: 'TO', c: Y}, {t: 'FALL', c: Y}]]} />
    </Stage>
  );
};
