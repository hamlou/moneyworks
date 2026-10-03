import React from 'react';
import {C} from '../theme';
import {CatLamp, SalesPhone} from '../props56';
import {Raccoon} from '../props3';
import {BigNum, Face, Glow, Headline, Hero, Ring, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

// A: Dramatic irony - Dave happy at "EASY STORE!" while raccoon empties wallet behind
export const V2Ep56: React.FC<V> = ({v}) => {
  if (v === 'A')
    return (
      <Stage a="#FF5A36" b="#3A0612" cx={860} cy={440}>
        <Glow x={320} y={440} r={240} color="#FFD23F" o={0.35} />
        <Face cx={240} cy={440} s={5} expr="grin" look={0.7} rim="#FFB347" />
        <g transform="translate(240,320) scale(0.42)">
          <rect x={-180} y={-50} width={360} height={100} rx={20} fill={C.green} stroke={C.ink} strokeWidth={12} />
          <text x={0} y={20} fontSize={52} fontWeight="900" fontFamily="sans-serif" fill="#fff" textAnchor="middle">EASY STORE!</text>
        </g>
        <Hero x={1100} y={480} s={2.2} r={8}>
          <Raccoon f={0} mood="greedy" holdCoin />
        </Hero>
        <Ring x={920} y={680} rx={90} ry={90} color={C.red} />
        <BigNum x={880} y={90} size={110} text="FREE?" c="yellow" r={-4} />
      </Stage>
    );

  // B: Your own screen - Giant phone split showing sales vs bank damage
  if (v === 'B')
    return (
      <Stage a="#3B82F6" b="#0A1F44" cx={860} cy={440}>
        <Hero x={860} y={460} s={2.0} r={-3}>
          <g>
            <rect x={-200} y={-360} width={400} height={720} rx={40} fill="#F7FAFD" stroke={C.ink} strokeWidth={8} />
            <rect x={-200} y={-360} width={400} height={340} fill="#DDF5E6" />
            <text x={0} y={-260} fontSize={50} fontWeight="900" fontFamily="sans-serif" fill={C.green} textAnchor="middle">SALES</text>
            <text x={0} y={-150} fontSize={120} fontWeight="900" fontFamily="sans-serif" fill={C.green} textAnchor="middle">$3,000</text>
            <line x1={-200} y1={-20} x2={200} y2={-20} stroke={C.ink} strokeWidth={6} />
            <text x={0} y={140} fontSize={50} fontWeight="900" fontFamily="sans-serif" fill={C.red} textAnchor="middle">BANK</text>
            <text x={0} y={270} fontSize={100} fontWeight="900" fontFamily="sans-serif" fill={C.red} textAnchor="middle">-$1,546</text>
          </g>
        </Hero>
        <Ring x={860} y={700} rx={120} ry={120} color={C.red} />
      </Stage>
    );

  // C: Shocking contrast - $30 lamp tiny vs $25 HUGE (what it costs in ads)
  return (
    <Stage a="#9B5DE5" b="#1E0838" cx={860} cy={440}>
      <g transform="translate(300,280) scale(0.7)">
        <rect x={-160} y={-100} width={320} height={200} rx={24} fill="#DDF5E6" stroke={C.ink} strokeWidth={8} />
        <CatLamp x={0} y={20} s={0.5} glow={0.6} f={0} />
        <text x={0} y={-50} fontSize={56} fontWeight="900" fontFamily="sans-serif" fill={C.green} textAnchor="middle">$30</text>
      </g>
      <Hero x={1050} y={440} s={2.2}>
        <g>
          <rect x={-180} y={-120} width={360} height={240} rx={24} fill="#FFE3EA" stroke={C.ink} strokeWidth={8} />
          <text x={0} y={30} fontSize={130} fontWeight="900" fontFamily="sans-serif" fill={C.red} textAnchor="middle">$25</text>
        </g>
      </Hero>
      <g transform="translate(1050,640)">
        <text x={0} y={0} fontSize={44} fontWeight="900" fontFamily="sans-serif" fill="#fff" textAnchor="middle">IN ADS</text>
      </g>
      <Face cx={240} cy={680} s={3.5} expr="shock" pose="facepalm" rim="#D9C2FF" />
    </Stage>
  );
};
