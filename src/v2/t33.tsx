import React from 'react';
import {C} from '../theme';
import {Burger} from '../props4';
import {PriceTag, Raccoon, TollBooth} from '../props3';
import {BigReceipt} from '../props33';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep33: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={460} r={250} color="#FFD23F" o={0.4} />
        <Hero x={880} y={440} s={0.9} r={-5}>
          <BigReceipt title="YOUR ORDER" lines={[['Burger', '$15.00'], ['Delivery', '$3.99'], ['Service', '$2.25'], ['Small order', '$2.00'], ['Tip', '$4.00']]} lit={[1, 1, 1, 1, 1]} total="$28.40" totalOn={1} />
        </Hero>
        <BigNum x={880} y={100} size={140} text="WAIT... $28?" c="gold" r={-3} />
        <Face cx={240} cy={460} s={5} expr="shock" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#FFC94D" b="#7A2E00" cx={860} cy={440}>
        <Hero x={880} y={480} s={2.4}>
          <Burger />
        </Hero>
        <Hero x={700} y={380} s={1.3} r={-18}><PriceTag text="+FEE" color={C.red} /></Hero>
        <Hero x={1060} y={400} s={1.3} r={16}><PriceTag text="+FEE" color={C.red} /></Hero>
        <Hero x={880} y={640} s={1.2} r={-4}><PriceTag text="+TIP" color={C.red} /></Hero>
        <Face cx={240} cy={460} s={5} expr="angry" look={0.8} lines rim="#FFE680" />
        <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'FEE'}, {t: 'ZOO', c: C.ink, box: '#fff'}]]} />
      </Stage>
    );
  return (
    <Stage a="#3A86FF" b="#081436" cx={860} cy={440}>
      <Hero x={960} y={520} s={1.3}>
        <TollBooth barUp={0} label="FEES" />
      </Hero>
      <Hero x={720} y={560} s={1.5}>
        <Raccoon f={0} mood="greedy" holdCoin />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#8FD3F5" />
      <BigNum x={880} y={120} size={150} text="7 FEES" c="gold" r={-3} />
    </Stage>
  );
};
