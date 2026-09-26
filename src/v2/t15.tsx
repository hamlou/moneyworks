import React from 'react';
import {C} from '../theme';
import {CreditCard} from '../props2';
import {Briefcase, Penny, Snowball} from '../props15';
import {Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep15: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Glow x={860} y={460} r={260} color={Y} o={0.4} />
        <Hero x={880} y={470} s={1}>
          <Snowball rad={230} color={C.green} label="$239K" />
        </Hero>
        <Face cx={260} cy={440} s={5.2} expr="money" look={0.8} />
        <Headline x={880} y={92} size={120} anchor="middle" r={-3} lines={[[{t: '$100'}, {t: 'A MONTH', c: C.ink, box: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={420} cy={440}>
        <Hero x={300} y={460} s={1.2} r={-6}>
          <Briefcase />
        </Hero>
        <Hero x={690} y={460} s={1.6} r={8}>
          <Penny />
        </Hero>
        <Face cx={1030} cy={430} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
        <Headline x={500} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'PICK'}, {t: 'ONE', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#FF4D5E" b="#3A0612" cx={880} cy={440}>
      <Hero x={880} y={470} s={1}>
        <Snowball rad={230} color={C.red} label="DEBT" />
      </Hero>
      <Hero x={1150} y={640} s={0.8} r={-12}>
        <CreditCard />
      </Hero>
      <Face cx={260} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} lines sweat />
      <Headline x={880} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'DARK'}, {t: 'SIDE', c: Y}]]} />
    </Stage>
  );
};
