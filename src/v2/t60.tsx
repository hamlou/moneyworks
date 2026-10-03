import React from 'react';
import {C} from '../theme';
import {BaitHook, Banner} from '../props60';
import {BigNum, Face, Glow, Headline, Hero, Ring, SplitStage, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep60: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#1FA9E0" b="#04203A" cx={820} cy={380}>
        <Glow x={820} y={420} r={240} color="#9EFFC0" o={0.45} />
        <Hero x={820} y={330} s={1.55} r={-4}>
          <BaitHook f={0} />
        </Hero>
        <Face cx={300} cy={470} s={3.6} expr="happy" pose="point_up" look={0.7} rim="#BFF3FF" />
        <Headline x={60} y={95} size={120} lines={[[{t: 'FREE?', c: 'gold'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#7B2FF7" b="#14062B" cx={700} cy={330}>
        <Hero x={720} y={250} s={1.25} flat>
          <Banner title="SPORTSBOOK" body="Max bet: $2.00" w={760} color={C.red} />
        </Hero>
        <Hero x={720} y={450} s={1.25} flat>
          <Banner title="SPORTSBOOK" body="You're winning too much" w={760} color={C.red} />
        </Hero>
        <Ring x={760} y={250} rx={430} ry={110} />
        <Face cx={170} cy={560} s={2.8} expr="shock" pose="shock" look={0.8} lines sweat rim="#D9C2FF" />
        <Headline x={720} y={80} size={96} anchor="middle" lines={[[{t: 'YOU', c: '#fff'}, {t: 'WON.', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <SplitStage left={['#3BE36B', '#0B3D1E']} right={['#FF4040', '#3A0612']}>
      <BigNum x={330} y={250} size={150} text="$1,000" c="green" r={-3} />
      <Headline x={330} y={390} size={80} anchor="middle" r={-3} lines={[[{t: 'FREE', c: '#fff'}]]} />
      <BigNum x={960} y={250} size={150} text="$25,000" c="gold" r={3} />
      <Headline x={960} y={390} size={64} anchor="middle" r={3} lines={[[{t: 'IN BETS FIRST', c: '#fff'}]]} />
      <Face cx={210} cy={600} s={2.4} expr="shock" look={0.9} lines rim="#B8FFD9" />
    </SplitStage>
  );
};
