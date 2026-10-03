import React from 'react';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Car} from '../props';
import {Handcuffs} from '../props30';
import {BigNum, Face, Glow, Headline, Hero, HEAD, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

const T: React.FC<{x: number; y: number; size: number; c?: string; anchor?: 'start' | 'middle' | 'end'; children: React.ReactNode}> = ({x, y, size, c = C.ink, anchor = 'middle', children}) => (
  <text x={x} y={y} fontFamily={HEAD} fontSize={size} fill={c} textAnchor={anchor} dominantBaseline="middle">{children}</text>
);

export const V2Ep58: React.FC<V> = ({v}) => {
  // A — "your own screen": the debt collector calling Dave (same as the first 3 s of the video).
  if (v === 'A')
    return (
      <Stage a="#2F6BFF" b="#050B2E" cx={800} cy={380}>
        <Glow x={800} y={390} r={300} color="#FFD23F" o={0.35} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={800} cy={390} r={330 + i * 40} fill="none" stroke="#FFD23F" strokeWidth={10} opacity={0.5 - i * 0.15} />
        ))}
        <Hero x={800} y={390} r={6} flat>
          <rect x={-215} y={-330} width={430} height={660} rx={56} fill="#1E2430" stroke={C.ink} strokeWidth={8} />
          <rect x={-190} y={-300} width={380} height={600} rx={34} fill="#14284A" />
          <T x={0} y={-200} size={56} c="#C9D6E6">INCOMING CALL</T>
          <T x={0} y={-60} size={110} c="#fff">DEBT</T>
          <T x={0} y={60} size={88} c="#fff">COLLECTOR</T>
          <circle cx={-100} cy={210} r={56} fill="#FF3B3B" stroke="#fff" strokeWidth={6} />
          <circle cx={100} cy={210} r={56} fill="#2BD67B" stroke="#fff" strokeWidth={6} />
        </Hero>
        <Face cx={230} cy={470} s={4.6} expr="shock" pose="shock" look={0.9} lines sweat rim="#9EC3FF" />
        <Headline x={40} y={80} size={92} anchor="start" r={-3} lines={[[{t: 'NEVER'}, {t: 'DROVE IT', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // B — dramatic irony: Dave happily signs; the shadow lender behind the page is already holding the bill.
  if (v === 'B')
    return (
      <Stage a="#14B8A6" b="#02201D" cx={760} cy={420}>
        <g transform="translate(940,420)">
          <rect x={-60} y={-330} width={120} height={100} rx={10} fill="#0B0B10" />
          <rect x={-100} y={-240} width={200} height={24} rx={10} fill="#0B0B10" />
          <circle cx={0} cy={-150} r={86} fill="#0B0B10" />
          <path d="M -40 -140 Q 0 -100 40 -140" stroke="#FFD23F" strokeWidth={10} fill="none" strokeLinecap="round" />
          <circle cx={-30} cy={-175} r={10} fill="#FFD23F" />
          <circle cx={30} cy={-175} r={10} fill="#FFD23F" />
          <path d="M -170 -60 Q 0 -110 170 -60 L 200 330 L -200 330 Z" fill="#0B0B10" />
        </g>
        <Hero x={1120} y={300} r={10}>
          <rect x={-150} y={-70} width={300} height={140} rx={12} fill="#FF3B3B" stroke={C.ink} strokeWidth={8} />
          <T x={0} y={4} size={86} c="#fff">$18,000</T>
        </Hero>
        <Hero x={700} y={470} r={-4} flat>
          <rect x={-240} y={-210} width={480} height={420} rx={14} fill="#FFFDF5" stroke={C.ink} strokeWidth={8} />
          <T x={0} y={-120} size={74}>CO-SIGNER:</T>
          <line x1={-190} y1={70} x2={190} y2={70} stroke={C.ink} strokeWidth={6} />
          <path d="M -170 50 q 40 -70 80 0 t 80 -16 t 90 0" fill="none" stroke="#1F6FEB" strokeWidth={12} strokeLinecap="round" />
          <T x={0} y={150} size={72} c="#1F6FEB">DAVE</T>
        </Hero>
        <g filter="url(#pop)">
          <Stick f={20} x={250} y={700} s={1.55} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} acc={['hair']} seed={7} />
        </g>
        <Headline x={40} y={80} size={84} anchor="start" r={-3} lines={[[{t: 'JUST A'}, {t: 'SIGNATURE?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // C — absurd metaphor: Dave handcuffed to Bob's car while Bob drives away.
  return (
    <Stage a="#FF8C1A" b="#2E0E00" cx={760} cy={430}>
      <Hero x={820} y={470} s={3.4} r={-3}>
        <Car />
      </Hero>
      <g filter="url(#pop)">
        <Stick f={20} x={860} y={300} s={0.95} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.8}]} acc={['cap']} seed={21} />
      </g>
      <Hero x={300} y={500} r={-20} flat>
        <Handcuffs s={1.5} />
      </Hero>
      <g filter="url(#pop)">
        <Stick f={20} x={170} y={700} s={1.25} keys={[{at: 0, pose: 'panic', expr: 'scream', look: 0.8}]} acc={['hair']} seed={7} />
      </g>
      <BigNum x={900} y={110} size={150} text="MY DEBT?!" c="gold" r={-3} />
    </Stage>
  );
};
