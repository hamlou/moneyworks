import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../theme';
import {Stick} from '../Stick';
import {Coin} from '../props';
import {Raccoon} from '../props3';
import {Big, Burst, TW, TH} from '../Thumb';

const Slice: React.FC<{a0: number; a1: number; c: string; push?: number; label?: string}> = ({a0, a1, c, push = 0, label}) => {
  const mid = (a0 + a1) / 2;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return (
    <g transform={`translate(${Math.cos(mid) * push},${Math.sin(mid) * push})`}>
      <path d={`M 0 0 L ${Math.cos(a0) * 250} ${Math.sin(a0) * 250} A 250 250 0 ${large} 1 ${Math.cos(a1) * 250} ${Math.sin(a1) * 250} Z`} fill={c} stroke={C.ink} strokeWidth={7} />
      {label && <text x={Math.cos(mid) * 150} y={Math.sin(mid) * 150} fontFamily={FONT} fontWeight={700} fontSize={50} fill="#fff" stroke={C.ink} strokeWidth={8} paintOrder="stroke" textAnchor="middle" dominantBaseline="middle">{label}</text>}
    </g>
  );
};

export const Ep05Thumb: React.FC<{v: 'A' | 'B' | 'C'}> = ({v}) => {
  if (v === 'A')
    return (
      <AbsoluteFill style={{background: C.navy}}>
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <line x1={100} y1={650} x2={760} y2={650} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
          <rect x={150} y={210} width={240} height={440} rx={12} fill={C.red} stroke={C.ink} strokeWidth={7} />
          <rect x={470} y={235} width={240} height={415} rx={12} fill="#9AA5B1" stroke={C.ink} strokeWidth={7} />
          <Big x={270} y={170} size={56} anchor="middle" color={C.red}>INTEREST</Big>
          <Big x={590} y={195} size={56} anchor="middle">MILITARY</Big>
          <Raccoon f={20} x={1010} y={440} s={1.5} mood="greedy" holdCoin grab={0.7} />
          <Big x={1250} y={95} size={120} anchor="end" color={C.yellow}>&gt; ?!</Big>
        </svg>
      </AbsoluteFill>
    );
  if (v === 'B') {
    const pts = [23, 14, 13, 14, 36];
    const cols = ['#3A86FF', '#2DB77A', '#6B7B8C', '#EF476F', '#F4C95D'];
    let a = -Math.PI / 2;
    return (
      <AbsoluteFill>
        <Burst a="#FFD166" b="#FFC23D" cx={400} cy={420} />
        <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
          <g transform="translate(400,430)">
            <circle r={270} fill="#E9B872" stroke={C.ink} strokeWidth={8} />
            {pts.map((p, i) => {
              const a0 = a;
              a += (p / 100) * Math.PI * 2;
              return <Slice key={i} a0={a0} a1={a} c={cols[i]} push={i === 3 ? 40 : 0} label={i === 3 ? '$14' : undefined} />;
            })}
          </g>
          <Stick f={20} x={1020} y={1180} s={2.6} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} acc={['hair']} seed={50} />
          <Big x={1250} y={90} size={92} anchor="end">WHERE YOUR</Big>
          <Big x={1250} y={195} size={92} anchor="end" color={C.red}>TAXES GO</Big>
        </svg>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <svg width={TW} height={TH} style={{position: 'absolute', inset: 0}}>
        <line x1={100} y1={640} x2={900} y2={640} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <rect x={180} y={260} width={260} height={380} rx={12} fill="#C9C3B6" stroke={C.ink} strokeWidth={7} />
        <rect x={580} y={620} width={260} height={20} rx={6} fill={C.green} stroke={C.ink} strokeWidth={6} />
        <Big x={310} y={210} size={80} anchor="middle" color="#8C7A5B">26%</Big>
        <Big x={710} y={560} size={80} anchor="middle" color={C.green}>1%</Big>
        <Big x={310} y={690} size={40} anchor="middle" color={C.ink}>you guessed</Big>
        <Big x={710} y={690} size={40} anchor="middle" color={C.ink}>reality</Big>
        <Big x={640} y={100} size={96} anchor="middle" color={C.red}>FOREIGN AID?</Big>
        <Coin x={1100} y={420} s={3.5} />
      </svg>
    </AbsoluteFill>
  );
};
