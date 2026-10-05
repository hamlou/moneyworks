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

export const V2Ep52: React.FC<V> = ({v}) => {
  // A - the first 3 s: 2 AM, the pay button
  if (v === 'A')
    return (
      <Stage a="#2456D6" b="#040B24" cx={520} cy={380}>
        <Hero x={520} y={360} r={-3} flat>
          <rect x={-400} y={-250} width={800} height={500} rx={30} fill="#1E2430" stroke={C.ink} strokeWidth={8} />
          <rect x={-370} y={-220} width={740} height={440} rx={14} fill="#F7FAFD" />
          <T x={0} y={-130} size={64} c="#5B6470">GET RICH COURSE</T>
          <rect x={-290} y={-50} width={580} height={200} rx={30} fill="#FFD23F" stroke={C.ink} strokeWidth={8} />
          <T x={0} y={56} size={150} c="#D61F1F">$9,997</T>
        </Hero>
        <Ring x={520} y={410} rx={340} ry={140} />
        <Dave x={1080} y={705} s={1.4} pose="point_l" expr="tired" look={-0.8} sweat />
        <Headline x={1250} y={80} size={92} anchor="end" r={3} lines={[[{t: '2 AM', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // B - villain reveal: the guru's real business
  if (v === 'B')
    return (
      <Stage a="#FF8C1A" b="#2E0E00" cx={860} cy={400}>
        <g filter="url(#pop)"><Stick f={20} x={900} y={700} s={1.9} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.6}]} acc={['tie', 'shades']} seed={45} /></g>
        <Hero x={420} y={420} r={-6} flat>
          <rect x={-250} y={-170} width={500} height={340} rx={24} fill="#FFFDF5" stroke={C.ink} strokeWidth={8} />
          <T x={0} y={-90} size={60} c="#5B6470">HIS REAL JOB:</T>
          <T x={0} y={30} size={110} c="#D61F1F">SELLING</T>
          <T x={0} y={120} size={70} c={C.ink}>THIS COURSE</T>
        </Hero>
        <Headline x={640} y={75} size={84} anchor="middle" lines={[[{t: 'RICH FROM', c: '#fff'}, {t: 'WHAT?', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // C - absurd metaphor: the gold rush shovel seller
  return (
    <Stage a="#14B8A6" b="#02201D" cx={640} cy={400}>
      <Hero x={420} y={400} s={1} r={-20}>
        <rect x={-18} y={-260} width={36} height={380} rx={10} fill="#A86B3C" stroke={C.ink} strokeWidth={8} />
        <path d="M -110 110 H 110 L 80 300 Q 0 350 -80 300 Z" fill="#C9D6E6" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
      </Hero>
      <BigNum x={900} y={250} size={170} text="$1,997" c="gold" r={3} />
      <Headline x={900} y={420} size={76} anchor="middle" r={3} lines={[[{t: 'PER SHOVEL', c: '#fff'}]]} />
      <Face cx={1000} cy={600} s={2.4} expr="suspicious" look={-0.8} rim="#BFF3FF" />
    </Stage>
  );
};
