import React from 'react';
import {C} from '../theme';
import {Stick} from '../Stick';
import {Raccoon} from '../props3';
import {ArrowCue, BigNum, Face, Glow, Headline, Hero, HEAD, Ring, SplitStage, Stage} from './kit';

type V = {v: 'A' | 'B' | 'C'};

const T: React.FC<{x: number; y: number; size: number; c?: string; anchor?: 'start' | 'middle' | 'end'; children: React.ReactNode}> = ({x, y, size, c = C.ink, anchor = 'middle', children}) => (
  <text x={x} y={y} fontFamily={HEAD} fontSize={size} fill={c} textAnchor={anchor} dominantBaseline="middle">{children}</text>
);
const Dave: React.FC<{x: number; y: number; s: number; pose: string; expr: any; look?: number; sweat?: boolean}> = ({x, y, s, pose, expr, look = 0, sweat}) => (
  <g filter="url(#pop)"><Stick f={20} x={x} y={y} s={s} keys={[{at: 0, pose, expr, look}]} acc={['hair']} seed={7} sweat={sweat} /></g>
);
const PhoneBody: React.FC<{children: React.ReactNode; screen?: string}> = ({children, screen = '#14284A'}) => (
  <>
    <rect x={-215} y={-310} width={430} height={620} rx={56} fill="#1E2430" stroke={C.ink} strokeWidth={8} />
    <rect x={-190} y={-282} width={380} height={564} rx={34} fill={screen} />
    {children}
  </>
);

export const V2Ep54: React.FC<V> = ({v}) => {
  // A - the first 3 s: a $99.99 button inside a free game
  if (v === 'A')
    return (
      <Stage a="#8A3FFC" b="#12002B" cx={470} cy={390}>
        <Glow x={470} y={400} r={300} color="#FFD23F" o={0.3} />
        <Hero x={470} y={390} r={-7} flat>
          <PhoneBody>
            <T x={0} y={-200} size={56} c="#FFD23F">FREE GAME</T>
            <ellipse cx={0} cy={-60} rx={70} ry={88} fill="#9B59B6" stroke="#fff" strokeWidth={6} />
            <rect x={-170} y={80} width={340} height={150} rx={30} fill="#FF3B3B" stroke="#fff" strokeWidth={8} />
            <T x={0} y={160} size={104} c="#fff">$99.99</T>
          </PhoneBody>
        </Hero>
        <Ring x={470} y={550} rx={230} ry={110} color="#FFD23F" />
        <Dave x={980} y={700} s={1.4} pose="point_l" expr="tired" look={-0.8} sweat />
        <Headline x={1250} y={85} size={96} anchor="end" r={3} lines={[[{t: 'DAY 21', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // B - shocking contrast: what the banner says vs the real price
  if (v === 'B')
    return (
      <SplitStage left={['#3BE36B', '#0B3D1E']} right={['#FF4040', '#3A0612']}>
        <Headline x={320} y={110} size={76} anchor="middle" r={-3} lines={[[{t: 'THE GAME', c: '#fff'}]]} />
        <BigNum x={320} y={330} size={210} text="$0" c="green" r={-3} />
        <Headline x={960} y={110} size={76} anchor="middle" r={3} lines={[[{t: 'THE DRAGON', c: '#fff'}]]} />
        <BigNum x={960} y={330} size={190} text="$356" c="gold" r={3} />
        <Face cx={640} cy={590} s={2.6} expr="shock" look={0.6} lines rim="#fff" />
      </SplitStage>
    );
  // C - absurd metaphor: the egg is the bait on a hook
  return (
    <Stage a="#1E88E5" b="#031326" cx={640} cy={420}>
      <path d="M 640 0 V 250" stroke="#fff" strokeWidth={10} />
      <path d="M 640 250 q 0 150 -90 150 q -80 0 -70 -80" fill="none" stroke="#DDE6F0" strokeWidth={22} strokeLinecap="round" />
      <Hero x={640} y={400} s={1.7} r={8}>
        <ellipse cx={0} cy={0} rx={90} ry={112} fill="#9B59B6" stroke={C.ink} strokeWidth={7} />
        <path d="M -40 -40 l 20 30 l -24 30" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
      </Hero>
      <Dave x={200} y={705} s={1.3} pose="celebrate" expr="money" look={0.8} />
      <BigNum x={1010} y={260} size={190} text="0.6%" c="gold" r={4} />
      <Headline x={1010} y={420} size={70} anchor="middle" r={4} lines={[[{t: 'CHANCE', c: '#fff'}]]} />
    </Stage>
  );
};
