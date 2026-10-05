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

export const V2Ep55: React.FC<V> = ({v}) => {
  // A - the first 3 s: a lawyer bill for fighting over a couch
  if (v === 'A')
    return (
      <Stage a="#FF8C1A" b="#2E0E00" cx={640} cy={420}>
        <Hero x={380} y={470} s={1} flat>
          <rect x={-280} y={-60} width={560} height={170} rx={40} fill="#8B93A1" stroke={C.ink} strokeWidth={8} />
          <rect x={-320} y={-140} width={120} height={250} rx={36} fill="#737B89" stroke={C.ink} strokeWidth={8} />
          <rect x={200} y={-140} width={120} height={250} rx={36} fill="#737B89" stroke={C.ink} strokeWidth={8} />
          <rect x={-150} y={-190} width={300} height={90} rx={16} fill="#FFD23F" stroke={C.ink} strokeWidth={8} />
          <T x={0} y={-142} size={70}>COUCH: $400</T>
        </Hero>
        <Hero x={930} y={330} r={6} flat>
          <rect x={-230} y={-240} width={460} height={480} rx={14} fill="#FFFDF5" stroke={C.ink} strokeWidth={8} />
          <T x={0} y={-150} size={64} c="#5B6470">LAWYER BILL</T>
          <T x={0} y={-50} size={50}>re: the couch</T>
          <T x={0} y={110} size={150} c="#D61F1F">$516</T>
        </Hero>
        <Face cx={1120} cy={620} s={2.2} expr="shock" look={-0.8} lines rim="#FFE3B0" />
      </Stage>
    );
  // B - shocking contrast: paperwork vs the fight
  if (v === 'B')
    return (
      <SplitStage left={['#3BE36B', '#0B3D1E']} right={['#FF4040', '#3A0612']}>
        <Headline x={320} y={110} size={80} anchor="middle" r={-3} lines={[[{t: 'THE FORMS', c: '#fff'}]]} />
        <BigNum x={320} y={330} size={190} text="$300" c="green" r={-3} />
        <Headline x={960} y={110} size={80} anchor="middle" r={3} lines={[[{t: 'THE FIGHT', c: '#fff'}]]} />
        <BigNum x={960} y={330} size={150} text="$20,400" c="gold" r={3} />
        <Face cx={640} cy={590} s={2.6} expr="scream" look={0.6} lines rim="#fff" />
      </SplitStage>
    );
  // C - villain reveal: two meters running
  return (
    <Stage a="#7B2FF7" b="#14062B" cx={640} cy={420}>
      <g filter="url(#pop)"><Stick f={20} x={300} y={705} s={1.5} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}]} acc={['glasses', 'tie']} seed={44} /></g>
      <g filter="url(#pop)"><Stick f={20} x={980} y={705} s={1.5} flip keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} acc={['glasses', 'tie']} seed={47} /></g>
      <Hero x={640} y={400} flat>
        <rect x={-210} y={-130} width={420} height={260} rx={30} fill="#101014" stroke="#FFD23F" strokeWidth={10} />
        <T x={0} y={-60} size={56} c="#FFD23F">METER x 2</T>
        <T x={0} y={50} size={120} c="#FF4D4D">$688/HR</T>
      </Hero>
      <Headline x={640} y={80} size={88} anchor="middle" lines={[[{t: 'STILL', c: '#fff'}, {t: 'ARGUING?', c: C.ink, box: C.yellow}]]} />
    </Stage>
  );
};
