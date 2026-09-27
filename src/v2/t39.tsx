import React from 'react';
import {C} from '../theme';
import {WaterSlide} from '../props39';
import {Car} from '../props';
import {PriceTag} from '../props3';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep39: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={500} s={2.4}><Car /></Hero>
        <Hero x={1080} y={360} s={1.5} r={12}><PriceTag text="-20%" color={C.red} /></Hero>
        <BigNum x={880} y={110} size={140} text="$27 A DAY" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#8FD3F5" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Hero x={880} y={440} s={0.85} flat><WaterSlide t={0.6} car /></Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#FFB347" />
        <Headline x={880} y={92} size={104} anchor="middle" r={-2} lines={[[{t: 'GONE'}, {t: 'IN'}, {t: '1 YEAR', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#FFC94D" b="#7A2E00" cx={860} cy={440}>
      <Hero x={880} y={500} s={2.2}><Car /></Hero>
      <Face cx={250} cy={450} s={5} expr="smug" acc={['tie']} seed={62} look={0.8} rim="#FFE680" />
      <BigNum x={880} y={120} size={130} text="REAL PROFIT?" c="red" r={-3} />
    </Stage>
  );
};
