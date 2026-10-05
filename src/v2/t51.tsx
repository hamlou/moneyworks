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

export const V2Ep51: React.FC<V> = ({v}) => {
  // A - your own screen: the app celebrates a loss (first 3 s of the video)
  if (v === 'A')
    return (
      <Stage a="#1FBF75" b="#04261A" cx={470} cy={390}>
        {Array.from({length: 26}).map((_, i) => <rect key={i} x={40 + ((i * 197) % 860)} y={30 + ((i * 131) % 640)} width={26} height={14} rx={4} fill={['#FFD23F', '#FF4D6D', '#5CC8FF', '#fff'][i % 4]} transform={`rotate(${i * 37},${40 + ((i * 197) % 860)},${30 + ((i * 131) % 640)})`} />)}
        <Hero x={470} y={390} r={-7} flat>
          <PhoneBody>
            <T x={0} y={-190} size={50} c="#C9D6E6">TODAY</T>
            <T x={0} y={-40} size={150} c="#FF4D4D">-$600</T>
            <rect x={-150} y={110} width={300} height={100} rx={24} fill="#2BD67B" stroke="#fff" strokeWidth={6} />
            <T x={0} y={164} size={64} c="#fff">NICE!</T>
          </PhoneBody>
        </Hero>
        <Dave x={980} y={700} s={1.4} pose="shock" expr="shock" look={-0.8} sweat />
        <Headline x={1250} y={85} size={96} anchor="end" r={3} lines={[[{t: 'FREE', c: '#fff'}, {t: 'APP?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // B - villain reveal: someone gets paid on every tap
  if (v === 'B')
    return (
      <Stage a="#7B2FF7" b="#14062B" cx={820} cy={400}>
        <Glow x={860} y={400} r={300} color="#FFD23F" o={0.35} />
        <Hero x={860} y={470} s={2.3} flat><Raccoon f={10} mood="greedy" holdCoin grab={1} /></Hero>
        <Dave x={230} y={700} s={1.2} pose="typing" expr="happy" look={0.6} />
        <BigNum x={330} y={150} size={150} text="48c" c="gold" r={-4} />
        <Headline x={330} y={290} size={70} anchor="middle" r={-4} lines={[[{t: 'PER TAP', c: '#fff'}]]} />
      </Stage>
    );
  // C - shocking contrast
  return (
    <SplitStage left={['#FF4040', '#3A0612']} right={['#3BE36B', '#0B3D1E']}>
      <Headline x={320} y={110} size={90} anchor="middle" r={-3} lines={[[{t: 'YOU LOSE', c: '#fff'}]]} />
      <BigNum x={320} y={330} size={170} text="-$600" c="red" r={-3} />
      <Headline x={960} y={110} size={90} anchor="middle" r={3} lines={[[{t: 'APP WINS', c: '#fff'}]]} />
      <BigNum x={960} y={330} size={170} text="+$$$" c="green" r={3} />
      <Face cx={640} cy={590} s={2.6} expr="shock" look={0} lines rim="#fff" />
    </SplitStage>
  );
};
