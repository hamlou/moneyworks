import React from 'react';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Car} from '../props';
import {BigNum, Face, Glow, Headline, Hero, HEAD, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

const T: React.FC<{x: number; y: number; size: number; c?: string; anchor?: 'start' | 'middle' | 'end'; children: React.ReactNode}> = ({x, y, size, c = C.ink, anchor = 'middle', children}) => (
  <text x={x} y={y} fontFamily={HEAD} fontSize={size} fill={c} textAnchor={anchor} dominantBaseline="middle">{children}</text>
);

export const V2Ep58: React.FC<V> = ({v}) => {
  // A — "your own screen": the debt collector calling Dave (same as the first 3 s of the video).
  if (v === 'A')
    return (
      <Stage a="#8A3FFC" b="#12002B" cx={470} cy={390}>
        <Glow x={470} y={400} r={300} color="#FFD23F" o={0.3} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={470} cy={400} r={330 + i * 40} fill="none" stroke="#FFD23F" strokeWidth={10} opacity={0.55 - i * 0.15} />
        ))}
        <Hero x={470} y={400} r={-8} flat>
          <rect x={-215} y={-310} width={430} height={620} rx={56} fill="#1E2430" stroke={C.ink} strokeWidth={8} />
          <rect x={-190} y={-282} width={380} height={564} rx={34} fill="#14284A" />
          <T x={0} y={-190} size={52} c="#C9D6E6">INCOMING CALL</T>
          <T x={0} y={-50} size={110} c="#fff">DEBT</T>
          <T x={0} y={70} size={88} c="#fff">COLLECTOR</T>
          <circle cx={-100} cy={200} r={56} fill="#FF3B3B" stroke="#fff" strokeWidth={6} />
          <circle cx={100} cy={200} r={56} fill="#2BD67B" stroke="#fff" strokeWidth={6} />
        </Hero>
        <g filter="url(#pop)">
          <Stick f={20} x={960} y={690} s={1.35} keys={[{at: 0, pose: 'panic', expr: 'scream', look: -0.8}]} acc={['hair']} seed={7} sweat />
        </g>
        <Headline x={1250} y={80} size={92} anchor="end" r={3} lines={[[{t: 'NEVER'}, {t: 'DROVE IT', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // B — dramatic irony: Dave happily signs; the shadow lender behind the page is already holding the bill.
  if (v === 'B')
    return (
      <Stage a="#14B8A6" b="#02201D" cx={760} cy={420}>
        <g transform="translate(1110,400)">
          <rect x={-60} y={-330} width={120} height={100} rx={10} fill="#0B0B10" />
          <rect x={-100} y={-240} width={200} height={24} rx={10} fill="#0B0B10" />
          <circle cx={0} cy={-150} r={86} fill="#0B0B10" />
          <path d="M -40 -140 Q 0 -100 40 -140" stroke="#FFD23F" strokeWidth={10} fill="none" strokeLinecap="round" />
          <circle cx={-30} cy={-175} r={10} fill="#FFD23F" />
          <circle cx={30} cy={-175} r={10} fill="#FFD23F" />
          <path d="M -170 -60 Q 0 -110 170 -60 L 200 330 L -200 330 Z" fill="#0B0B10" />
        </g>
        <Hero x={1120} y={480} r={10}>
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
  // C — absurd metaphor: Dave chained to Bob's car while Bob drives off happy.
  return (
    <Stage a="#FF8C1A" b="#2E0E00" cx={760} cy={430}>
      <defs>
        <clipPath id="win58"><rect x={800} y={150} width={240} height={160} /></clipPath>
      </defs>
      <Hero x={850} y={470} s={3.4} r={-3}>
        <Car />
      </Hero>
      <g clipPath="url(#win58)">
        <Stick f={20} x={900} y={560} s={1.1} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.8}]} acc={['cap']} seed={21} />
      </g>
      {Array.from({length: 5}).map((_, i) => (
        <ellipse key={i} cx={300 + i * 32} cy={430 + i * 14} rx={30} ry={16} fill="none" stroke="#FFD23F" strokeWidth={12} transform={`rotate(${25 + (i % 2) * 50},${300 + i * 32},${430 + i * 14})`} />
      ))}
      <g filter="url(#pop)">
        <g transform="rotate(18,220,700)">
          <Stick f={20} x={220} y={700} s={1.3} keys={[{at: 0, pose: 'point_r', expr: 'scream', look: 0.8}]} acc={['hair']} seed={7} sweat />
        </g>
      </g>
      <BigNum x={900} y={100} size={150} text="MY DEBT?!" c="gold" r={-3} />
    </Stage>
  );
};
