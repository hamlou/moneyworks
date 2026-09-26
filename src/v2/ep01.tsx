import React from 'react';
import {C} from '../theme';
import {Monitor, Vault, Moth, Sparkle} from '../props';
import {BigButton} from '../props2';
import {Stage, Face, Hero, Headline, ArrowCue, Glow} from './kit';

export const V2Ep01: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3566D6" b="#0A1330" cx={880} cy={420}>
        <Glow x={880} y={420} r={260} color={C.green} o={0.55} />
        <Hero x={880} y={690} s={1.25} r={4}>
          <Monitor value="$10,000" valueColor={C.green} />
        </Hero>
        <Face cx={300} cy={430} s={5.4} expr="shock" pose="shock" lines />
        <Headline x={880} y={95} size={118} anchor="middle" r={-3} lines={[[{t: 'JUST'}, {t: 'TYPED', c: C.yellow}, {t: 'IT?'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFD34D" b="#D9480F" cx={380} cy={420}>
        <Glow x={380} y={440} r={230} color="#fff" o={0.6} />
        <Hero x={380} y={470} s={2.3} r={-6}>
          <BigButton press={0} />
        </Hero>
        <Face cx={960} cy={400} s={5.2} expr="money" acc={['tophat', 'monocle']} seed={31} look={-0.8} />
        <ArrowCue x1={760} y1={560} x2={560} y2={520} bend={-0.3} />
        <Headline x={60} y={95} size={120} r={-3} lines={[[{t: 'ONE'}, {t: 'CLICK', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BC4A6" b="#062A28" cx={400} cy={430}>
      <Glow x={400} y={430} r={240} color="#fff" o={0.35} />
      <Hero x={400} y={450} s={1.45}>
        <Vault open={1} inside={<Moth f={20} x={0} y={0} s={1.2} />} />
      </Hero>
      <Sparkle x={250} y={220} t={0.5} s={0.7} color="#fff" />
      <Face cx={1000} cy={420} s={5.2} expr="scream" pose="shock" look={-0.7} flip lines sweat />
      <Headline x={400} y={92} size={118} anchor="middle" r={-2} lines={[[{t: "IT'S"}, {t: 'EMPTY', c: C.yellow}]]} />
    </Stage>
  );
};
