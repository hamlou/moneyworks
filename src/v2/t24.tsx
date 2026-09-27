import React from 'react';
import {C} from '../theme';
import {KChart} from '../props24';
import {SlicePie} from '../props8';
import {BigNum, Face, Glow, Headline, Hero, SplitStage, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep24: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
        <Glow x={880} y={440} r={260} color="#FFD23F" o={0.35} />
        <Hero x={880} y={460} s={0.95}>
          <SlicePie rad={230} slices={[{v: 0.881, c: C.green, l: '88%'}, {v: 0.113, c: '#9AA5B1'}, {v: 0.006, c: C.red}]} pop={2} />
        </Hero>
        <Face cx={250} cy={450} s={5.1} expr="shock" pose="shock" look={0.8} lines sweat rim="#8FD3F5" />
        <Headline x={880} y={92} size={104} anchor="middle" r={-2} lines={[[{t: 'WHO'}, {t: 'OWNS', c: 'gold'}, {t: 'IT?'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <SplitStage left={['#2BD67B', '#062E1C']} right={['#FF4D5E', '#3A0612']}>
        <Face cx={300} cy={430} s={4.6} expr="smug" acc={['shades', 'tie']} seed={60} look={0.6} rim="#B9FFB0" />
        <Face cx={1000} cy={430} s={4.6} expr="worried" look={-0.6} flip sweat rim="#FFB3B3" />
        <BigNum x={300} y={640} size={110} text="UP" c="green" />
        <BigNum x={1000} y={640} size={110} text="DOWN" c="red" />
        <Headline x={640} y={90} size={104} anchor="middle" lines={[[{t: 'SAME'}, {t: 'STREET', c: C.ink, box: C.yellow}]]} />
      </SplitStage>
    );
  return (
    <Stage a="#8A5CFF" b="#170A3A" cx={880} cy={440}>
      <Hero x={900} y={470} s={0.72} flat>
        <KChart up={1} down={1} split={1} upLabel="THEM" downLabel="YOU" />
      </Hero>
      <Face cx={240} cy={460} s={4.8} expr="angry" look={0.8} lines rim="#B79CFF" />
      <BigNum x={880} y={120} size={150} text="THE K" c="gold" r={-3} />
    </Stage>
  );
};
