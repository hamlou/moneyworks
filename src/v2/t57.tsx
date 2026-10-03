import React from 'react';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Bubble, MoneyStack} from '../props';
import {BillTicket, DinnerTable, Fork, PizzaSlice, SendApp} from '../props57';
import {ArrowCue, Face, Glow, Headline, Hero, Ring, SplitStage, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep57: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <SplitStage left={['#2BD67B', '#062E1C']} right={['#9B5DE5', '#1E0838']}>
        <Hero x={300} y={640} s={1}>
          <Stick f={20} x={0} y={0} s={1.9} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}]} acc={['hair']} seed={7} handItem={<MoneyStack n={3} s={0.9} label="$3,000" />} />
        </Hero>
        <Headline x={60} y={90} size={120} lines={[[{t: 'LOAN', c: C.ink, box: '#2BD67B'}]]} />
        <Hero x={930} y={600} s={0.62}>
          <DinnerTable />
        </Hero>
        <Face cx={930} cy={330} s={4.2} expr="shock" pose="shock" acc={['shades']} seed={57} look={-0.5} lines rim="#D9C2FF" />
        <Hero x={1150} y={250} s={0.9} r={20}>
          <Fork s={1.6} />
        </Hero>
        <Headline x={1230} y={90} size={120} anchor="end" r={-3} lines={[[{t: 'GIFT??', c: '#fff', box: '#FF2D2D'}]]} />
      </SplitStage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={420} cy={360}>
        <Glow x={420} y={380} r={260} color="#9CC3FF" o={0.35} />
        <Hero x={400} y={370} s={0.88} flat>
          <SendApp amount="$3,000" sent={1} memo={1} />
        </Hero>
        <Ring x={400} y={412} rx={175} ry={95} r={-6} />
        <Headline x={1180} y={120} size={130} anchor="end" r={-2} lines={[[{t: 'THE'}], [{t: 'CONTRACT', c: 'gold'}]]} />
        <ArrowCue x1={900} y1={330} x2={610} y2={420} bend={-0.2} />
        <Face cx={860} cy={560} s={2.6} expr="worried" look={-0.8} acc={['hair']} seed={7} rim="#9CC3FF" sweat />
      </Stage>
    );
  return (
    <Stage a="#14C97A" b="#04261A" cx={560} cy={420}>
      <Headline x={60} y={95} size={130} lines={[[{t: 'PAID'}, {t: 'LAST', c: C.ink, box: C.yellow}]]} />
      {[
        {l: 'RENT', c: C.navy},
        {l: 'CAR', c: C.blue},
        {l: 'CARD', c: C.red},
      ].map((b, i) => (
        <Hero key={b.l} x={190 + i * 300} y={440} s={1.15} r={i % 2 ? 3 : -3}>
          <BillTicket n={i + 1} label={b.l} color={b.c} open={0.75} w={240} />
        </Hero>
      ))}
      <Hero x={1060} y={640} s={1}>
        <Stick f={20} x={0} y={0} s={1.25} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: -0.7}]} acc={['hair']} seed={7} />
      </Hero>
      <Hero x={1060} y={250} s={1}>
        <Bubble text="#99" size={64} tail="down" bg={C.yellow} />
      </Hero>
      <Hero x={1160} y={470} s={0.9} r={15}>
        <PizzaSlice />
      </Hero>
    </Stage>
  );
};
