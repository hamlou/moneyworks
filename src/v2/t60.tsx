import React from 'react';
import {C} from '../theme';
import {BetPhone} from '../props17';
import {MoneyStack} from '../props';
import {Raccoon} from '../props3';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep60: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF6B35" b="#2A0A0E" cx={280} cy={400}>
        <Glow x={280} y={420} r={200} color="#FFD23F" o={0.5} />
        <Hero x={280} y={420} s={1.8}>
          <BetPhone title="SIGN UP NOW" rows={[['BONUS', '$1,000'], ['STATUS', 'FREE!']]} hl={0} />
        </Hero>
        <Face cx={280} cy={100} s={4.5} expr="happy" pose="idle" look={0} rim="#FFB347" />
        <Hero x={900} y={440} s={1.3} r={-6}>
          <g transform="scale(0.7)">
            <Raccoon f={20} x={0} y={0} mood="greedy" holdCoin />
          </g>
        </Hero>
        <BigNum x={900} y={120} size={110} text="$25,000" c="red" r={-4} />
        <Headline x={900} y={210} size={72} anchor="middle" r={-4} lines={[[{t: 'REQUIRED', c: '#fff'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#4A148C" b="#1A0A2E" cx={640} cy={400}>
        <Glow x={640} y={420} r={280} color="#FF5252" o={0.6} />
        <Hero x={640} y={420} s={2.2}>
          <BetPhone title="SPORTSBOOK" rows={[['MAX BET', '$2.00'], ['STATUS', 'LIMITED']]} hl={0} />
        </Hero>
        <Face cx={200} cy={160} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#CE93D8" />
        <Headline x={640} y={90} size={90} anchor="middle" r={0} lines={[[{t: 'WIN?', c: 'gold'}, {t: 'BANNED', c: '#fff', box: C.red}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#0A2E1C" cx={900} cy={440}>
      <Hero x={900} y={470} s={1.8} r={-5}>
        <g transform="scale(0.85)">
          <Raccoon f={20} x={0} y={0} mood="greedy" />
        </g>
      </Hero>
      <Hero x={900} y={280} s={1.3}>
        <MoneyStack n={7} label="" />
      </Hero>
      <Face cx={240} cy={450} s={4.8} expr="shock" look={0.8} rim="#7FE3A8" />
      <Headline x={240} y={100} size={75} anchor="middle" r={0} lines={[[{t: '$2', c: 'red'}, {t: 'MAX', c: '#fff'}]]} />
    </Stage>
  );
};
