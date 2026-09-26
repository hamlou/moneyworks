import React from 'react';
import {C} from '../theme';
import {Bill, Coin, MoneyStack, Sparkle} from '../props';
import {CreditCard, GoldBar, Printer} from '../props2';
import {PriceTag, Raccoon, Shop, Terminal} from '../props3';
import {Burger, House} from '../props4';
import {Board, Fries} from '../props5';
import {Bread, Flag, Wheelbarrow} from '../props6';
import {Lemon, Share, Stand, Ticker} from '../props7';
import {ArrowCue, Face, Glow, HalfBill, Headline, Hero, Pie, Ring, Rock, Stage, Tower, UpArrow, XBig} from './kit';

type V = {v: 'A' | 'B' | 'C'};
const Y = C.yellow;
const GREEN = '#2BD67B';
const RED = '#FF4D5E';

export const V2Ep02: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={430} cy={430}>
        <Glow x={430} y={430} r={250} color="#C9B6FF" o={0.5} />
        <Hero x={420} y={450} s={2.1} r={-12}>
          <CreditCard />
        </Hero>
        <Hero x={960} y={420} s={2.2}>
          <Raccoon f={20} mood="greedy" holdCoin grab={0.9} />
        </Hero>
        <Headline x={640} y={92} size={118} anchor="middle" r={-2} lines={[[{t: 'THE'}, {t: 'SECRET', c: Y}, {t: 'FEE'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF8A3D" b="#5A1206" cx={880} cy={430}>
        <Glow x={880} y={420} r={230} color="#fff" o={0.45} />
        <Hero x={880} y={440} s={2.2} r={6}>
          <Terminal text="$100" />
        </Hero>
        <Headline x={1150} y={580} size={120} anchor="middle" r={-8} lines={[[{t: '-$3', c: RED}]]} />
        <Face cx={320} cy={430} s={5.2} expr="angry" look={0.8} lines />
        <Headline x={60} y={92} size={112} r={-2} lines={[[{t: 'EVERY'}, {t: 'SWIPE', c: C.ink, box: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#053B24" cx={420} cy={420}>
      <Hero x={420} y={450} s={2.2} r={-8}>
        <CreditCard />
      </Hero>
      <Hero x={470} y={300} s={1.5} r={-6}>
        <PriceTag text="$0" color={GREEN} />
      </Hero>
      <Ring x={460} y={300} rx={200} ry={110} />
      <Face cx={1000} cy={420} s={5.2} expr="suspicious" look={-0.8} flip sweat />
      <Headline x={420} y={92} size={120} anchor="middle" r={-2} lines={[[{t: 'STILL'}, {t: 'PROFIT?', c: Y}]]} />
    </Stage>
  );
};

export const V2Ep03: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF6B6B" b="#3D0710" cx={400} cy={440}>
        <Glow x={400} y={420} r={260} color="#FFD0C4" o={0.45} />
        <Hero x={400} y={640} s={0.95}>
          <House />
        </Hero>
        <Hero x={420} y={300} s={1.6} r={-8}>
          <PriceTag text="$720K" color={Y} />
        </Hero>
        <Face cx={1000} cy={420} s={5.2} expr="scream" pose="shock" look={-0.7} flip lines />
        <Headline x={1000} y={92} size={104} anchor="middle" r={2} lines={[[{t: '30'}, {t: 'YEARS', c: Y}, {t: 'LATER'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={880} cy={440}>
        <Tower x={740} base={630} h={220} color="#9EDDB0" label="HOUSE" value="$300K" />
        <Tower x={1040} base={630} h={330} color={RED} label="INTEREST" value="$420K" />
        <Face cx={290} cy={430} s={5.2} expr="worried" look={0.8} sweat />
        <Headline x={640} y={80} size={108} anchor="middle" r={-2} lines={[[{t: "BANK'S"}, {t: 'CUT', c: C.ink, box: '#fff'}]]} />
      </Stage>
    );
  return (
    <Stage a="#3AA0FF" b="#061A3D" cx={880} cy={420}>
      <Hero x={880} y={640} s={0.9}>
        <House sold="SOLD" />
      </Hero>
      <Face cx={300} cy={430} s={5.2} expr="money" acc={['tophat', 'monocle']} seed={31} look={0.8} />
      <Headline x={880} y={110} size={170} anchor="middle" r={-4} lines={[[{t: 'PAY', c: '#fff'}, {t: '2.4×', c: Y}]]} />
    </Stage>
  );
};

export const V2Ep04: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FFD34D" b="#B3200E" cx={420} cy={430}>
        <Glow x={420} y={430} r={240} color="#fff" o={0.5} />
        <Hero x={420} y={450} s={2.4}>
          <Burger />
        </Hero>
        <XBig x={420} y={440} s={1.5} />
        <Face cx={990} cy={420} s={5.2} expr="smug" acc={['fedora']} seed={44} look={-0.8} flip />
        <Headline x={420} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'NOT'}, {t: 'FOOD', c: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={420} cy={420}>
        <Hero x={420} y={410} s={0.95} r={-4}>
          <Board hotels={[1, 3, 6, 9, 12, 14]} piece={5} />
        </Hero>
        <Face cx={1010} cy={440} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
        <Headline x={1010} y={92} size={104} anchor="middle" r={2} lines={[[{t: 'SECRET', c: Y}, {t: 'LANDLORD'}]]} />
      </Stage>
    );
  return (
    <Stage a="#FF4D5E" b="#3A0612" cx={900} cy={430}>
      <Hero x={640} y={470} s={1.6} r={-10}>
        <Fries />
      </Hero>
      <Hero x={960} y={660} s={0.75}>
        <House />
      </Hero>
      <Hero x={980} y={250} s={1.4} r={6}>
        <PriceTag text="RENT" color={GREEN} />
      </Hero>
      <Face cx={250} cy={440} s={5} expr="money" look={0.8} />
      <Headline x={60} y={92} size={112} r={-2} lines={[[{t: 'REAL'}, {t: 'MENU', c: C.ink, box: Y}]]} />
    </Stage>
  );
};

export const V2Ep05: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#3A86FF" b="#081436" cx={420} cy={430}>
        <Glow x={420} y={430} r={240} color="#9EC5FF" o={0.4} />
        <Pie x={420} y={440} r={230} pop={0} slices={[{v: 0.3, c: Y, label: '?'}, {v: 0.2, c: RED}, {v: 0.18, c: GREEN}, {v: 0.17, c: '#8A5CFF'}, {v: 0.15, c: '#9AA5B1'}]} />
        <Face cx={1000} cy={430} s={5.2} expr="shock" acc={['bun', 'glasses']} seed={13} look={-0.8} flip lines />
        <Headline x={640} y={80} size={108} anchor="middle" r={-2} lines={[[{t: '#1', c: Y}, {t: 'IS...'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={900} cy={440}>
        <Hero x={850} y={480} s={1.55} r={-6}>
          <Wheelbarrow f={20} />
        </Hero>
        <ArrowCue x1={660} y1={640} x2={1150} y2={620} bend={0.12} />
        <Face cx={290} cy={430} s={5.2} expr="angry" look={0.8} lines />
        <Headline x={640} y={92} size={112} anchor="middle" r={-2} lines={[[{t: "WHERE'D"}, {t: 'IT', c: Y}, {t: 'GO?', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#FFC94D" b="#8A3A00" cx={420} cy={430}>
      <Hero x={420} y={440} s={3} r={-8}>
        <Bill />
      </Hero>
      <Headline x={420} y={640} size={96} anchor="middle" r={-4} lines={[[{t: 'SPLIT 10 WAYS', c: '#fff'}]]} />
      <Face cx={1010} cy={420} s={5.2} expr="suspicious" look={-0.8} flip />
      <Headline x={420} y={92} size={116} anchor="middle" r={-2} lines={[[{t: 'YOUR'}, {t: '$1', c: C.ink, box: GREEN}]]} />
    </Stage>
  );
};

export const V2Ep06: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={420} cy={430}>
        <Hero x={420} y={430} s={2.3} r={-4}>
          <Flag kind="cn" />
        </Hero>
        <XBig x={420} y={400} s={1.5} />
        <Face cx={1000} cy={430} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
        <Headline x={640} y={92} size={118} anchor="middle" r={-2} lines={[[{t: 'THEN'}, {t: 'WHO?', c: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#2BD67B" b="#052A1B" cx={880} cy={460}>
        <Glow x={880} y={460} r={250} color={Y} o={0.35} />
        {[0, 1, 2, 3].map((i) => (
          <Hero key={i} x={880 + (i % 2 ? 40 : -40)} y={680 - i * 120} s={1.6} pop={false}>
            <MoneyStack n={5} />
          </Hero>
        ))}
        <Headline x={880} y={130} size={160} anchor="middle" r={-4} lines={[[{t: '$40T', c: Y}]]} />
        <Face cx={300} cy={440} s={5.2} expr="scream" pose="shock" look={0.8} sweat />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={880} cy={420}>
      <Hero x={900} y={430} s={2.1} r={4}>
        <Flag kind="us" />
      </Hero>
      <Face cx={300} cy={430} s={5.2} expr="suspicious" look={0.8} />
      <Headline x={880} y={100} size={124} anchor="middle" r={-2} lines={[[{t: "IT'S"}, {t: 'YOU?', c: C.ink, box: Y}]]} />
    </Stage>
  );
};

export const V2Ep07: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#2BD67B" b="#062E1C" cx={420} cy={420}>
        <Hero x={390} y={400} s={0.95} r={-12}>
          <HalfBill side={-1} />
        </Hero>
        <Hero x={520} y={430} s={0.95} r={10}>
          <HalfBill side={1} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="scream" look={-0.8} flip lines />
        <Headline x={420} y={92} size={118} anchor="middle" r={-2} lines={[[{t: 'HALF'}, {t: 'GONE', c: RED}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={420} cy={450}>
        <Glow x={420} y={460} r={220} color="#fff" o={0.5} />
        <Hero x={420} y={480} s={2.8}>
          <Bread />
        </Hero>
        <Hero x={300} y={250} s={1.1} r={-10}>
          <PriceTag text="$1" color={GREEN} />
        </Hero>
        <Hero x={600} y={300} s={1.4} r={8}>
          <PriceTag text="$4" color={RED} />
        </Hero>
        <Face cx={1000} cy={430} s={5.2} expr="shock" acc={['bun', 'glasses']} seed={13} look={-0.8} flip lines />
        <Headline x={420} y={640} size={104} anchor="middle" r={-2} lines={[[{t: 'SAME'}, {t: 'BREAD?!', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#8A5CFF" b="#170A3A" cx={420} cy={440}>
      <Hero x={420} y={500} s={1.6}>
        <Printer />
      </Hero>
      {[
        [230, 250, -20],
        [560, 210, 18],
        [420, 150, -6],
      ].map(([x, y, r], i) => (
        <Hero key={i} x={x} y={y} s={1.1} r={r} pop={false}>
          <Bill />
        </Hero>
      ))}
      <Face cx={1000} cy={430} s={5.2} expr="angry" look={-0.8} flip lines />
      <Headline x={1000} y={92} size={104} anchor="middle" r={2} lines={[[{t: 'WHO'}, {t: 'DID', c: Y}, {t: 'THIS?'}]]} />
    </Stage>
  );
};

export const V2Ep08: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FFD34D" b="#6B3A00" cx={420} cy={430}>
        <Glow x={420} y={430} r={260} color="#fff" o={0.6} />
        <Hero x={420} y={440} s={3.4} r={-6}>
          <GoldBar />
        </Hero>
        <Sparkle x={200} y={260} t={0.5} s={1.1} color="#fff" />
        <Sparkle x={640} y={560} t={0.5} s={0.8} color="#fff" />
        <Face cx={1000} cy={430} s={5.2} expr="money" look={-0.8} flip />
        <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'JUST'}, {t: 'A'}, {t: 'ROCK?', c: C.ink, box: '#fff'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#3A86FF" b="#081436" cx={640} cy={440}>
        <Hero x={300} y={450} s={1.3}>
          <Rock />
        </Hero>
        <g filter="url(#shadow)">
          {[405, 475].map((y) => (
            <rect key={y} x={570} y={y} width={140} height={44} rx={12} fill={Y} stroke={C.ink} strokeWidth={9} />
          ))}
        </g>
        <Hero x={960} y={450} s={2.4} r={6}>
          <GoldBar />
        </Hero>
        <Glow x={960} y={450} r={200} color={Y} o={0.35} />
        <Headline x={640} y={100} size={120} anchor="middle" r={-2} lines={[[{t: 'SAME'}, {t: 'THING?', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={420} cy={430}>
      <UpArrow x={420} y={430} s={1.1} color={Y} />
      <Hero x={300} y={560} s={1.5} r={-4}>
        <GoldBar />
      </Hero>
      <Face cx={1000} cy={430} s={5.2} expr="shock" pose="shock" look={-0.8} flip lines />
      <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'WHY'}, {t: 'SO'}, {t: 'HIGH?', c: Y}]]} />
    </Stage>
  );
};

export const V2Ep09: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FFE24D" b="#8A5A00" cx={420} cy={440}>
        <Glow x={420} y={440} r={240} color="#fff" o={0.5} />
        <Hero x={420} y={690} s={1.05}>
          <Stand />
        </Hero>
        <Face cx={1000} cy={430} s={5.2} expr="money" look={-0.8} flip />
        <Headline x={640} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'YOU'}, {t: 'OWN', c: C.ink, box: '#fff'}, {t: 'THIS?'}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={420} cy={430}>
        <Hero x={440} y={420} s={0.95} r={-4}>
          <Ticker f={0} price="-40%" up={false} />
        </Hero>
        <Face cx={1010} cy={430} s={5.2} expr="scream" pose="panic" look={-0.8} flip lines sweat />
        <Headline x={420} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'WHY'}, {t: 'IT'}, {t: 'CRASHES', c: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={880} cy={430}>
      <Hero x={860} y={430} s={1.9} r={5}>
        <Share n="1 SHARE" />
      </Hero>
      <Hero x={1100} y={600} s={1.6} r={-14}>
        <Lemon />
      </Hero>
      <Face cx={290} cy={430} s={5.2} expr="grin" look={0.8} />
      <Headline x={860} y={100} size={120} anchor="middle" r={-2} lines={[[{t: 'WORTH', c: Y}, {t: '$?'}]]} />
    </Stage>
  );
};

export const V2Ep10: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF7EB6" b="#3D0724" cx={420} cy={430}>
        <Glow x={420} y={430} r={240} color="#fff" o={0.4} />
        {[0, 1, 2, 3].map((i) => (
          <Hero key={i} x={140 + i * 190} y={400 + (i % 2 ? -25 : 25)} s={3} r={i % 2 ? 8 : -8}>
            <Coin />
          </Hero>
        ))}
        <Headline x={420} y={610} size={120} anchor="middle" lines={[[{t: 'PAY'}, {t: '×4', c: Y}]]} />
        <Face cx={1010} cy={430} s={5.2} expr="suspicious" look={-0.8} flip />
        <Headline x={640} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'WHO'}, {t: 'PAYS?', c: Y}]]} />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={880} cy={430}>
        <Hero x={880} y={440} s={2.2} r={6}>
          <Terminal text="0%" />
        </Hero>
        <Ring x={880} y={290} rx={170} ry={120} />
        <Face cx={300} cy={430} s={5.2} expr="angry" look={0.8} lines />
        <Headline x={640} y={92} size={118} anchor="middle" r={-2} lines={[[{t: 'THE'}, {t: 'CATCH', c: C.ink, box: Y}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={420} cy={450}>
      <Hero x={360} y={700} s={1}>
        <Shop name="STORE" />
      </Hero>
      <Hero x={960} y={470} s={2.1}>
        <Raccoon f={20} mood="greedy" holdCoin grab={0.9} />
      </Hero>
      <ArrowCue x1={520} y1={420} x2={760} y2={420} bend={-0.25} />
      <Headline x={640} y={88} size={108} anchor="middle" r={-2} lines={[[{t: 'THE'}, {t: 'STORE', c: Y}, {t: 'PAYS?'}]]} />
    </Stage>
  );
};
