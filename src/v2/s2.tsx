import React from 'react';
import {C} from '../theme';
import {Sparkle} from '../props';
import {CreditCard} from '../props2';
import {AppleTree, HotDog, Jet, MemberCard, MilesCard, Receipt, Yacht} from '../props8';
import {Share} from '../props7';
import {PriceTag} from '../props3';
import {Face, Glow, Headline, Hero, Ring, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;

export const V2Ep11: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3AA0FF" b="#061A3D" cx={860} cy={420}>
        <Glow x={860} y={420} r={260} color="#BFE6F7" o={0.45} />
        <Hero x={880} y={440} s={1.05} r={-6}>
          <Jet livery={C.red} name="AIRLINE" />
        </Hero>
        <Face cx={270} cy={440} s={5.2} expr="shock" pose="shock" look={0.8} lines />
        <Headline x={880} y={100} size={124} anchor="middle" r={-3} lines={[[{t: '$8'}, {t: 'PROFIT?!', c: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={420} cy={430}>
        <Glow x={420} y={430} r={260} color={Y} o={0.4} />
        <Hero x={420} y={440} s={1.45} r={-8}>
          <MilesCard miles="80,000" />
        </Hero>
        <Sparkle x={160} y={230} t={0.5} s={1} color="#fff" />
        <Face cx={1000} cy={430} s={5.2} expr="money" look={-0.8} flip />
        <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'SECRET'}, {t: 'PRINTER', c: C.ink, box: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={880} cy={440}>
      <Hero x={860} y={470} s={0.95} r={4}>
        <Jet livery={C.navy} name="BANK AIR" />
      </Hero>
      <Hero x={1110} y={640} s={0.75} r={-10}>
        <CreditCard />
      </Hero>
      <Ring x={860} y={430} rx={440} ry={200} r={-4} />
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} />
      <Headline x={860} y={90} size={120} anchor="middle" r={-2} lines={[[{t: 'SECRETLY'}, {t: 'A'}, {t: 'BANK', c: Y}]]} />
    </Stage>
  );
};

export const V2Ep12: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={420} cy={430}>
        <Glow x={420} y={430} r={260} color="#fff" o={0.35} />
        <Hero x={430} y={450} s={1.6} r={-8}>
          <MemberCard />
        </Hero>
        <Face cx={1000} cy={430} s={5.2} expr="money" look={-0.8} flip />
        <Headline x={430} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'REAL'}, {t: 'PRODUCT', c: C.ink, box: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={430} cy={430}>
        <Glow x={430} y={440} r={240} color={Y} o={0.45} />
        <Hero x={430} y={460} s={2.6} r={-8}>
          <HotDog />
        </Hero>
        <Hero x={430} y={640} s={1.3} r={-4}>
          <PriceTag text="$1.50" color={Y} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
        <Headline x={430} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'SINCE'}, {t: '1985?!', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={880} cy={430}>
      <Hero x={880} y={470} s={1.15} r={5}>
        <Receipt lines={[['Hot dog', '$1.50'], ['TV', '$199.99'], ['Pickles', '$9.49'], ['Misc', '$76.02']]} total="$287.00" />
      </Hero>
      <Face cx={270} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} lines sweat />
      <Headline x={880} y={90} size={120} anchor="middle" r={-2} lines={[[{t: 'I'}, {t: 'SAVED?!', c: Y}]]} />
    </Stage>
  );
};

export const V2Ep13: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
        <Glow x={860} y={440} r={260} color={Y} o={0.4} />
        <Hero x={860} y={470} s={1.55} r={-6}>
          <Share n="$10 BILLION" owner="RICHIE'S SHARES" />
        </Hero>
        <Face cx={260} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} lines sweat />
        <Headline x={860} y={96} size={124} anchor="middle" r={-3} lines={[[{t: 'TAX:'}, {t: '$0', c: C.ink, box: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3AA0FF" b="#061A3D" cx={880} cy={460}>
        <Hero x={900} y={520} s={1.2} r={-4}>
          <Yacht />
        </Hero>
        <Face cx={270} cy={440} s={5.2} expr="smug" acc={['shades', 'tie']} seed={60} look={0.8} />
        <Headline x={900} y={100} size={110} anchor="middle" r={-2} lines={[[{t: 'BUY.'}, {t: 'BORROW.', c: Y}, {t: 'DIE.'}]]} />
      </Stage>
    );
  return (
    <Stage a="#FF8A3D" b="#5A1206" cx={420} cy={460}>
      <Glow x={420} y={420} r={240} color="#fff" o={0.35} />
      <Hero x={420} y={700} s={1.0}>
        <AppleTree apples={10} />
      </Hero>
      <Face cx={1010} cy={430} s={5.2} expr="suspicious" look={-0.8} flip />
      <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'NOT'}, {t: 'TAXED?', c: Y}]]} />
    </Stage>
  );
};
