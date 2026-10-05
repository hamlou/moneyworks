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

export const V2Ep59: React.FC<V> = ({v}) => {
  // A - the first 3 s: Dave's 70th birthday, at work, with a name tag
  if (v === 'A')
    return (
      <Stage a="#14B8A6" b="#02201D" cx={520} cy={400}>
        <Dave x={420} y={705} s={1.9} pose="typing" expr="tired" look={0.4} />
        <Hero x={420} y={470} r={-6} flat>
          <rect x={-170} y={-80} width={340} height={160} rx={18} fill="#fff" stroke={C.ink} strokeWidth={8} />
          <rect x={-170} y={-80} width={340} height={60} rx={18} fill="#D61F1F" />
          <T x={0} y={-48} size={40} c="#fff">HELLO I AM</T>
          <T x={0} y={34} size={76}>DAVE</T>
        </Hero>
        <Hero x={920} y={470} flat>
          <rect x={-150} y={-20} width={300} height={150} rx={20} fill="#F78FB3" stroke={C.ink} strokeWidth={8} />
          <rect x={-150} y={-20} width={300} height={44} rx={20} fill="#fff" stroke={C.ink} strokeWidth={8} />
          <rect x={-12} y={-110} width={24} height={90} fill="#FFD23F" stroke={C.ink} strokeWidth={6} />
          <path d="M 0 -160 q 26 30 0 50 q -26 -20 0 -50 Z" fill="#FF8C1A" stroke={C.ink} strokeWidth={5} />
        </Hero>
        <BigNum x={980} y={170} size={230} text="70th" c="gold" r={4} />
        <Headline x={60} y={85} size={84} lines={[[{t: 'BIRTHDAY', c: '#fff'}, {t: 'SHIFT', c: C.ink, box: C.yellow}]]} />
      </Stage>
    );
  // B - dramatic irony: someone is dragging the finish line away behind him
  if (v === 'B')
    return (
      <Stage a="#2456D6" b="#040B24" cx={640} cy={420}>
        <path d="M 0 640 H 1280" stroke="#fff" strokeWidth={10} />
        <Dave x={260} y={640} s={1.5} pose="celebrate" expr="happy" look={0.8} />
        <g opacity={0.45}><rect x={560} y={240} width={40} height={400} fill="#fff" stroke="#fff" strokeWidth={4} strokeDasharray="20 16" /><T x={580} y={190} size={90} c="#fff">65</T></g>
        <ArrowCue x1={640} y1={400} x2={930} y2={400} />
        <Hero x={1020} y={440} flat>
          <rect x={-22} y={-200} width={44} height={400} fill="#fff" stroke={C.ink} strokeWidth={8} />
          {[0, 1, 2].map((i) => <rect key={i} x={-22} y={-200 + i * 160} width={44} height={80} fill="#D61F1F" />)}
        </Hero>
        <BigNum x={1040} y={150} size={170} text="70" c="gold" r={4} />
        <g filter="url(#pop)"><g transform="translate(1160,560) scale(1.1)"><Raccoon f={10} mood="sneaky" /></g></g>
      </Stage>
    );
  // C - villain: the fee quietly eating years
  return (
    <Stage a="#7B2FF7" b="#14062B" cx={700} cy={400}>
      <Hero x={470} y={390} r={-5} flat>
        <rect x={-330} y={-230} width={660} height={460} rx={18} fill="#FFFDF5" stroke={C.ink} strokeWidth={8} />
        <T x={0} y={-150} size={56} c="#5B6470">401(k) STATEMENT</T>
        <T x={0} y={-50} size={52}>Balance ...... $25,000</T>
        <rect x={-300} y={30} width={600} height={120} rx={12} fill="#FFD23F" />
        <T x={0} y={92} size={74} c="#D61F1F">FEE ...... 1.5%</T>
      </Hero>
      <Ring x={470} y={485} rx={350} ry={100} />
      <Hero x={1010} y={560} s={1.5} flat><Raccoon f={10} mood="greedy" holdCoin grab={1} /></Hero>
      <BigNum x={980} y={170} size={130} text="-$64,000" c="gold" r={4} />
    </Stage>
  );
};
