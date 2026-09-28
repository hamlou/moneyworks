import React from 'react';
import {C} from '../theme';
import {DatingPhone, SlotMachine, XHeartBtns} from '../props42';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep42: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={470} s={1.4} r={-4}>
          <DatingPhone>
            <XHeartBtns />
          </DatingPhone>
        </Hero>
        <BigNum x={880} y={110} size={140} text="0 MATCHES" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="sad" look={0.8} sweat rim="#D9C2FF" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Hero x={880} y={480} s={1.3}>
          <SlotMachine spin={1} />
        </Hero>
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines rim="#FFB347" />
        <Headline x={880} y={92} size={104} anchor="middle" r={-2} lines={[[{t: 'STUCK'}, {t: 'SWIPING', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Glow x={880} y={470} r={230} color="#FF2D2D" o={0.3} />
      <Hero x={880} y={480} s={1}>
        <svg viewBox="-120 -120 240 240" width={440} height={440}>
          <path d="M0 80 C-100 0 -80 -100 0 -36 C80 -100 100 0 0 80 Z" fill="#FF2D2D" stroke={C.ink} strokeWidth={7} />
          <rect x={-36} y={-22} width={72} height={52} rx={10} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <circle cx={0} cy={-38} r={20} fill="none" stroke={C.ink} strokeWidth={6} />
        </svg>
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#B8FFD9" />
      <BigNum x={880} y={110} size={140} text="PAYWALL" c="gold" r={-3} />
    </Stage>
  );
};
