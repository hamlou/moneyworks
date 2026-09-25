import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from './theme';
import {Stick} from './Stick';
import {Monitor, Vault, XMark, Sparkle, G, Bill, MoneyStack} from './props';
import {BigButton} from './props2';

export const EP_THUMBS: Record<string, React.FC<{v: 'A' | 'B' | 'C'}>> = {};

export const TW = 1280;
export const TH = 720;

export const Burst: React.FC<{a: string; b: string; cx?: number; cy?: number}> = ({a, b, cx = 640, cy = 360}) => (
  <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
    <rect width={TW} height={TH} fill={a} />
    {Array.from({length: 18}).map((_, i) => {
      const a0 = (i / 18) * Math.PI * 2;
      const a1 = a0 + Math.PI / 18;
      const R = 1600;
      return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} L ${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} Z`} fill={b} />;
    })}
  </svg>
);

export const Big: React.FC<{x: number; y: number; size: number; color?: string; r?: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'}> = ({x, y, size, color = '#fff', r = 0, children, anchor = 'start'}) => (
  <text x={x} y={y} transform={`rotate(${r},${x},${y})`} fontFamily={FONT} fontWeight={700} fontSize={size} fill={color} stroke={C.ink} strokeWidth={size * 0.16} paintOrder="stroke" strokeLinejoin="round" textAnchor={anchor} dominantBaseline="middle">
    {children}
  </text>
);

export type ThumbProps = {ep?: string; v: 'A' | 'B' | 'C'};

export const Thumb: React.FC<ThumbProps> = ({ep = 'ep01', v}) => {
  const Ep = EP_THUMBS[ep];
  if (Ep) return <Ep v={v} />;
  if (v === 'A')
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={430} cy={380} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <Monitor x={420} y={640} s={1.05} value="$10,000" valueColor={C.green} />
          <Sparkle x={660} y={150} t={0.5} s={0.9} />
          <Sparkle x={170} y={230} t={0.5} s={0.6} />
          <Stick f={0} x={1040} y={1330} s={3.3} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} acc={['hair']} seed={50} />
          <Big x={40} y={110} size={120} r={-3}>FROM</Big>
          <Big x={40} y={235} size={120} r={-3} color={C.yellow}>NOTHING?!</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <rect x={0} y={0} width={640} height={TH} fill="#24406B" />
          <Vault x={320} y={430} s={0.95} open={0.6} inside={<g>{[-60, 0, 60].map((x) => <Bill key={x} x={x} y={60} s={0.8} />)}</g>} />
          <XMark x={320} y={430} s={0.62} />
          <Stick f={0} x={930} y={900} s={2.0} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}]} acc={['tophat', 'monocle', 'tie']} seed={5} />
          <rect x={1060} y={560} width={220} height={200} rx={14} fill="#C9D1DA" stroke={C.ink} strokeWidth={6} />
          <BigButton x={1170} y={540} s={1.2} press={0.6} />
          <Big x={640} y={90} size={96} anchor="middle" color={C.yellow}>NOT YOUR SAVINGS</Big>
        </svg>
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill>
      <Burst a="#C9F1D8" b="#B4EAC6" cx={900} cy={470} />
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(300,470) rotate(-8)">
          <rect x={-150} y={-120} width={300} height={260} rx={40} fill="#9AA5B1" stroke={C.ink} strokeWidth={8} />
          <rect x={-150} y={-150} width={300} height={250} rx={40} fill="#F4F6F8" stroke={C.ink} strokeWidth={8} />
          <text x={0} y={-40} fontFamily={FONT} fontWeight={700} fontSize={76} fill={C.ink} textAnchor="middle" dominantBaseline="middle">ENTER</text>
          <path d="M 60 20 L 60 50 L -50 50 M -30 30 L -52 50 L -30 70" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {[[140, 250], [110, 300], [470, 250]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l ${i === 2 ? 30 : -30} -40`} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />)}
        <path d="M 500 470 Q 580 410 650 470" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
        <path d="M 622 440 L 656 472 L 614 492" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        <G x={960} y={640} s={1.7}><MoneyStack n={8} /></G>
        <Bill x={800} y={330} s={1.1} r={-20} />
        <Bill x={1130} y={300} s={1.1} r={18} />
        <Sparkle x={1190} y={460} t={0.5} s={0.8} />
        <Sparkle x={760} y={470} t={0.5} s={0.5} />
        <Big x={960} y={215} size={110} anchor="middle" color={C.green}>$10,000</Big>
        <Big x={40} y={95} size={112} r={-3}>ONE CLICK.</Big>
      </svg>
    </AbsoluteFill>
  );
};