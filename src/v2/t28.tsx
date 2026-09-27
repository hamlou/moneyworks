import React from 'react';
import {C} from '../theme';
import {SubTile, GymBuilding} from '../props28';
import {BigNum, Face, Glow, Headline, Hero, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

export const V2Ep28: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF4D5E" b="#3A0612" cx={860} cy={440}>
        <Glow x={880} y={440} r={280} color="#FFD23F" o={0.35} />
        {[
          ['STREAM', '$19.99', C.red],
          ['MUSIC', '$11.99', C.green],
          ['CLOUD', '$2.99', C.blue],
          ['GYM', '$49', '#8A5CFF'],
          ['APP', '$9.99', '#F29A1E'],
          ['NEWS', '$4.99', '#2E3440'],
        ].map(([n, p0, c], i) => (
          <Hero key={n} x={660 + (i % 3) * 230} y={300 + Math.floor(i / 3) * 230} s={0.8} r={(i % 2 ? 5 : -5)}>
            <SubTile name={n} price={p0} color={c} forgot={i % 2 === 0} />
          </Hero>
        ))}
        <BigNum x={880} y={120} size={140} text="$219/MO" c="gold" r={-3} />
        <Face cx={230} cy={460} s={4.9} expr="scream" pose="shock" look={0.8} lines sweat rim="#FFB347" />
      </Stage>
    );
  if (v === 'B')
    return (
      <Stage a="#8A5CFF" b="#170A3A" cx={860} cy={440}>
        <Hero x={880} y={560} s={1.1}>
          <GymBuilding name="GYM" />
        </Hero>
        <Face cx={250} cy={450} s={5} expr="suspicious" look={0.8} rim="#B79CFF" />
        <BigNum x={880} y={140} size={140} text="$17/VISIT" c="red" r={-3} />
      </Stage>
    );
  return (
    <Stage a="#2BD67B" b="#062E1C" cx={860} cy={440}>
      <Hero x={880} y={440} s={1.5} r={-6}>
        <SubTile name="FREE TRIAL" price="$0.00" color={C.green} />
      </Hero>
      <Face cx={250} cy={450} s={5} expr="angry" look={0.8} lines rim="#9EDDB0" />
      <Headline x={880} y={92} size={112} anchor="middle" r={-2} lines={[[{t: 'NOT'}, {t: 'FREE', c: C.ink, box: C.yellow}]]} />
    </Stage>
  );
};
