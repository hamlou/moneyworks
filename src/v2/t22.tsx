import React from 'react';
import {C} from '../theme';
import {SoapBubble, Chip, DataCenter, Tulip} from '../props22';
import {BigNum, Face, Glow, Headline, Hero, SplitStage, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep22: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#8A5CFF" b="#12062E" cx={860} cy={420}>
        <Glow x={860} y={420} r={300} color="#7FE3FF" o={0.4} />
        <Hero x={860} y={420} s={1.5} flat>
          <SoapBubble rad={210} label="AI" />
        </Hero>
        <BigNum x={860} y={640} size={120} text="$1.4 TRILLION" c="gold" r={-3} />
        <Face cx={250} cy={450} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#B79CFF" />
        <Headline x={860} y={90} size={100} anchor="middle" r={-2} lines={[[{t: 'ABOUT'}, {t: 'TO', c: 'red'}, {t: 'POP?', c: 'red'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <SplitStage left={['#FF7EB6', '#3D0724']} right={['#3AA0FF', '#061A3D']}>
        <Hero x={330} y={470} s={1.6} r={-8}>
          <Tulip />
        </Hero>
        <Hero x={960} y={450} s={1.3} r={6}>
          <Chip label="AI" />
        </Hero>
        <Headline x={330} y={650} size={80} anchor="middle" lines={[[{t: '1637'}]]} />
        <Headline x={960} y={650} size={80} anchor="middle" lines={[[{t: '2026', c: 'gold'}]]} />
        <Headline x={640} y={90} size={110} anchor="middle" lines={[[{t: 'SAME'}, {t: 'MISTAKE?', c: C.ink, box: C.yellow}]]} />
      </SplitStage>
    );
  return (
    <Stage a="#2E3A5C" b="#05070F" cx={900} cy={420}>
      <Glow x={900} y={430} r={280} color="#3BE36B" o={0.3} />
      <Hero x={900} y={560} s={1.1}>
        <DataCenter on label="AI" />
      </Hero>
      <BigNum x={900} y={150} size={150} text="$690B" c="red" r={-3} />
      <Face cx={260} cy={450} s={5} expr="suspicious" look={0.8} rim="#7FE3FF" />
      <Headline x={900} y={660} size={80} anchor="middle" lines={[[{t: "SPENT ON"}, {t: "WHAT?", c: "gold"}]]} />
    </Stage>
  );
};
