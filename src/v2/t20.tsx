import React from 'react';
import {C} from '../theme';
import {Pizza} from '../props4';
import {BtcCoin, Notebook} from '../props20';
import {Face, Glow, Headline, Hero, Stage, UpArrow} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep20: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF8A3D" b="#5A1206" cx={420} cy={440}>
        <Glow x={420} y={440} r={260} color={Y} o={0.45} />
        <Hero x={420} y={470} s={1.25} r={-8}>
          <Pizza eaten={0} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
        <Headline x={420} y={92} size={120} anchor="middle" r={-2} lines={[[{t: '$840M'}, {t: 'PIZZA', c: C.ink, box: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={860} cy={440}>
        <Glow x={860} y={440} r={260} color="#FFB36B" o={0.4} />
        <Hero x={860} y={450} s={1.9} r={8}>
          <BtcCoin />
        </Hero>
        <UpArrow x={900} y={560} s={0.9} color="#FF2D2D" down />
        <Face cx={260} cy={440} s={5.2} expr="scream" pose="shock" acc={['cap', 'shades']} seed={88} look={0.8} lines sweat />
        <Headline x={860} y={96} size={116} anchor="middle" r={-3} lines={[[{t: 'BOUGHT'}, {t: 'THE TOP', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#3AA0FF" b="#061A3D" cx={860} cy={450}>
      <Hero x={860} y={470} s={1.15} r={-5}>
        <Notebook lines={['Dave: 1 BTC', 'Gran: 2 BTC', 'Kevin: 0.1']} title="EVERYONE'S COPY" w={600} />
      </Hero>
      <Face cx={260} cy={440} s={5.2} expr="suspicious" look={0.8} />
      <Headline x={860} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'NO'}, {t: 'BANK?', c: Y}]]} />
    </Stage>
  );
};
