import React from 'react';
import {C} from '../theme';
import {ChipStack, RouletteWheel, SlotMachine} from '../props17';
import {Face, Glow, Headline, Hero, Ring, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep17: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={880} cy={440}>
        <Glow x={880} y={440} r={260} color={Y} o={0.4} />
        <Hero x={880} y={450} s={0.72} r={-8}>
          <RouletteWheel spin={12} hl="green" />
        </Hero>
        <Ring x={880} y={450} rx={120} ry={120} r={-8} />
        <Face cx={260} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} lines sweat />
        <Headline x={880} y={92} size={120} anchor="middle" r={-3} lines={[[{t: 'THE'}, {t: 'GREEN', c: C.ink, box: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={420} cy={440}>
        <Glow x={420} y={440} r={240} color={Y} o={0.4} />
        <Hero x={420} y={500} s={0.78} r={-5}>
          <SlotMachine reels={['7', '7', '7']} off={[0, 0, 118]} lit={1} label="SO CLOSE!" />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
        <Headline x={420} y={80} size={112} anchor="middle" r={-2} lines={[[{t: 'ALMOST?', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={460}>
      <Glow x={860} y={460} r={260} color="#fff" o={0.35} />
      <Hero x={760} y={620} s={1.3}>
        <ChipStack n={9} color={C.red} />
      </Hero>
      <Hero x={960} y={640} s={1.3}>
        <ChipStack n={12} color={C.blue} />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} />
      <Headline x={860} y={92} size={120} anchor="middle" r={-2} lines={[[{t: '$1M'}, {t: 'AN HOUR', c: Y}]]} />
    </Stage>
  );
};
