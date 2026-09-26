import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Duck, Coin, Bill, Sparkle} from '../props';
import {Raccoon} from '../props3';
import {Defs, Face, HEAD} from './kit';

export type AvatarV2Props = {v: 'A' | 'B' | 'C'};

const CoinRim: React.FC<{r: number}> = ({r}) => (
  <g>
    <circle cx={400} cy={400} r={r} fill={C.gold} stroke={C.ink} strokeWidth={16} />
    {Array.from({length: 60}).map((_, i) => {
      const a = (i / 60) * Math.PI * 2;
      return <line key={i} x1={400 + Math.cos(a) * (r - 12)} y1={400 + Math.sin(a) * (r - 12)} x2={400 + Math.cos(a) * (r - 40)} y2={400 + Math.sin(a) * (r - 40)} stroke="#D9A21E" strokeWidth={8} strokeLinecap="round" />;
    })}
    <circle cx={400} cy={400} r={r - 52} fill="#FFE08A" stroke="#D9A21E" strokeWidth={8} />
  </g>
);

export const AvatarV2: React.FC<AvatarV2Props> = ({v}) => {
  const bg = v === 'A' ? '#12A150' : v === 'B' ? C.yellow : C.navy;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={800} height={800} viewBox="0 0 800 800">
        <Defs />
        <radialGradient id="ag" cx={400} cy={380} r={560} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity={0.35} />
          <stop offset="1" stopColor="#000" stopOpacity={0.25} />
        </radialGradient>
        <rect width={800} height={800} fill="url(#ag)" />
        {v === 'A' && (
          <g>
            <CoinRim r={330} />
            <Face cx={400} cy={410} s={6.2} expr="money" acc={[]} />
          </g>
        )}
        {v === 'B' && <Face cx={400} cy={430} s={8.4} expr="money" />}
        {v === 'C' && (
          <g>
            {Array.from({length: 16}).map((_, i) => {
              const a0 = (i / 16) * Math.PI * 2;
              const a1 = a0 + Math.PI / 16;
              return <path key={i} d={`M 400 400 L ${400 + Math.cos(a0) * 800} ${400 + Math.sin(a0) * 800} L ${400 + Math.cos(a1) * 800} ${400 + Math.sin(a1) * 800} Z`} fill="#fff" opacity={0.06} />;
            })}
            <Face cx={400} cy={470} s={7} expr="smug" acc={['tophat', 'monocle']} seed={31} />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

export const BW = 2560;
export const BH = 1440;

export const Banner: React.FC = () => {
  const cx = BW / 2;
  const cy = BH / 2;
  return (
    <AbsoluteFill style={{background: '#0B2A1C'}}>
      <svg width={BW} height={BH} viewBox={`0 0 ${BW} ${BH}`}>
        <Defs />
        <radialGradient id="bb" cx={cx} cy={cy} r={1500} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1FBF6A" />
          <stop offset="1" stopColor="#06241A" />
        </radialGradient>
        <rect width={BW} height={BH} fill="url(#bb)" />
        {Array.from({length: 28}).map((_, i) => {
          const a0 = (i / 28) * Math.PI * 2;
          const a1 = a0 + Math.PI / 28;
          return <path key={i} d={`M ${cx} ${cy} L ${cx + Math.cos(a0) * 2600} ${cy + Math.sin(a0) * 2600} L ${cx + Math.cos(a1) * 2600} ${cy + Math.sin(a1) * 2600} Z`} fill="#fff" opacity={0.05} />;
        })}
        {[
          [260, 300, 2.2, -20],
          [2300, 260, 2.4, 18],
          [180, 1150, 2.6, 14],
          [2380, 1180, 2.2, -16],
          [620, 200, 1.6, 8],
          [1960, 1260, 1.8, -8],
        ].map(([x, y, s, r], i) => (i % 2 ? <Coin key={i} x={x} y={y} s={s * 1.4} r={r} /> : <Bill key={i} x={x} y={y} s={s} r={r} />))}
        <Face cx={720} cy={700} s={3.9} expr="shock" lines />
        <g filter="url(#pop)">
          <text x={1250} y={600} fontFamily={HEAD} fontSize={124} fill="#fff" stroke={C.ink} strokeWidth={15} paintOrder="stroke" strokeLinejoin="round" textAnchor="middle" dominantBaseline="middle">
            DAVE EXPLAINS
          </text>
          <text x={1250} y={732} fontFamily={HEAD} fontSize={136} fill={C.yellow} stroke={C.ink} strokeWidth={15} paintOrder="stroke" strokeLinejoin="round" textAnchor="middle" dominantBaseline="middle">
            MONEY
          </text>
        </g>
        <g filter="url(#shadow)">
          <rect x={1250 - 470} y={800} width={940} height={66} rx={33} fill={C.ink} />
          <text x={1250} y={835} fontFamily={HEAD} fontSize={38} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={2}>
            MONEY, BUSINESS &amp; ECONOMICS · SO SIMPLE A DUCK GETS IT
          </text>
        </g>
        <text x={1250} y={902} fontFamily={HEAD} fontSize={34} fill="#fff" opacity={0.9} textAnchor="middle" dominantBaseline="middle" letterSpacing={4}>
          NEW VIDEOS EVERY FRIDAY &amp; SUNDAY
        </text>
        <g filter="url(#pop)">
          <Duck f={20} x={1800} y={790} s={1.05} />
        </g>
        <g filter="url(#pop)">
          <Raccoon f={20} x={1975} y={730} s={0.9} mood="wink" holdCoin />
        </g>
        <Sparkle x={1860} y={560} t={0.5} s={0.8} color="#fff" />
      </svg>
    </AbsoluteFill>
  );
};

export const BannerGuide: React.FC = () => (
  <AbsoluteFill>
    <Banner />
    <svg width={BW} height={BH} style={{position: 'absolute', inset: 0}}>
      <rect x={(BW - 1546) / 2} y={(BH - 423) / 2} width={1546} height={423} fill="none" stroke="#FF2D2D" strokeWidth={6} strokeDasharray="20 12" />
      <rect x={(BW - 2560) / 2} y={(BH - 423) / 2} width={2560} height={423} fill="none" stroke="#3AF" strokeWidth={4} strokeDasharray="10 10" />
    </svg>
  </AbsoluteFill>
);
