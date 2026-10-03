import React from 'react';
import {C} from '../theme';
import {BoxPile, ChatPhone, ShakeBox} from '../props53';
import {BigNum, Face, Glow, Headline, Hero, SplitStage, Stage, Tower} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep53: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <SplitStage left={['#3BE36B', '#0D4D25']} right={['#FF4040', '#4D0D0D']}>
        <Tower x={320} base={660} h={120} w={260} color="#3BE36B" label="SOLD" value="$240" />
        <Tower x={960} base={660} h={540} w={280} color="#FF4040" label="SPENT" value="$1,649" />
        <Face cx={320} cy={240} s={4.2} expr="sad" pose="sad" look={0.5} rim="#90FFB8" />
        <Face cx={960} cy={140} s={3.2} expr="shock" pose="shock" sweat lines rim="#FFB3B3" />
      </SplitStage>
    );
  if (v === 'B')
    return (
      <Stage a="#9B5DE5" b="#2A0F52" cx={640} cy={400}>
        <Glow x={640} y={380} r={280} color="#D9C2FF" o={0.5} />
        <Hero x={640} y={420} s={1.7}>
          <ChatPhone to="Grandma 💝" lines={['Hey hun! 🎉', 'Exciting opportunity...', '']} sent={0} deleted={0} />
        </Hero>
        <Face cx={220} cy={580} s={4.8} expr="shock" pose="shock" sweat lines rim="#FFB8E6" />
        <Headline x={640} y={80} size={90} anchor="middle" r={-2} lines={[[{t: 'ALMOST', c: '#fff'}, {t: 'SENT', c: C.ink, box: C.red}]]} />
      </Stage>
    );
  return (
    <Stage a="#FF8C42" b="#5C2B0F" cx={960} cy={480}>
      <Glow x={980} y={500} r={300} color="#FFBB7A" o={0.4} />
      <Hero x={1120} y={500} s={1.4} r={-6}>
        <BoxPile n={40} />
      </Hero>
      <Face cx={280} cy={480} s={5.2} expr="happy" pose="idle" look={0.8} rim="#FFDBB3" />
      <Hero x={280} y={650} s={0.7} flat>
        <ShakeBox label="MIRACLE SHAKE" />
      </Hero>
      <BigNum x={1100} y={140} size={120} text="40 BOXES" c="gold" r={-4} />
    </Stage>
  );
};
