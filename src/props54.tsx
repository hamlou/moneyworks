import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const GamePhone: React.FC<P & {f?: number; screen?: React.ReactNode; glow?: number}> = ({f = 0, screen, glow = 0, ...p}) => (
  <G {...p}>
    <rect x={-180} y={-320} width={360} height={640} rx={50} fill="#2E3440" {...O} />
    <rect x={-160} y={-294} width={320} height={588} rx={30} fill="#1D3557" />
    {screen}
    {glow > 0 && [0, 1].map((i) => {
      const k = ((f / 18 + i * 0.5) % 1);
      return <circle key={i} r={240 + k * 100} fill="none" stroke={C.yellow} strokeWidth={10} opacity={(1 - k) * glow * 0.6} />;
    })}
  </G>
);

export const EnergyBar: React.FC<P & {level: number; max?: number}> = ({level, max = 100, ...p}) => (
  <G {...p}>
    <rect x={-140} y={-30} width={280} height={60} rx={16} fill="#3A4A5C" {...O} strokeWidth={4} />
    <rect x={-130} y={-20} width={Math.max(0, 260 * (level / max))} height={40} rx={12} fill={level === 0 ? C.red : C.green} />
    <Text y={2} size={28} color="#fff">{level}/{max} ENERGY</Text>
  </G>
);

export const GemDisplay: React.FC<P & {gems: number; highlight?: number}> = ({gems, highlight = 0, ...p}) => (
  <G {...p}>
    <rect x={-80} y={-28} width={160} height={56} rx={16} fill={highlight ? C.yellow : '#5C4A8C'} {...O} strokeWidth={4} />
    <circle cx={-40} cy={0} r={18} fill={C.blue} stroke="#fff" strokeWidth={3} />
    <Text x={20} y={2} size={32} color="#fff">{gems}</Text>
  </G>
);

export const DragonEgg: React.FC<P & {glow?: number; crack?: number; open?: number}> = ({glow = 0, crack = 0, open = 0, ...p}) => (
  <G {...p}>
    {glow > 0 && [0, 1, 2].map((i) => {
      const a = (i * 120);
      return (
        <g key={i} opacity={glow}>
          <path d={`M 0 0 L ${Math.sin((a * Math.PI) / 180) * 140} ${-Math.cos((a * Math.PI) / 180) * 140}`} stroke={C.yellow} strokeWidth={8} opacity={0.6} />
        </g>
      );
    })}
    <ellipse cx={0} cy={10} rx={90} ry={110} fill={open > 0 ? '#7A5230' : '#9B59B6'} {...O} />
    {crack > 0 && (
      <>
        <path d="M 0 -110 L -14 -60 L 8 -20 L -6 30 L 10 80 L 0 110" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <path d="M 0 -60 L 24 -40 L 20 20" fill="none" stroke={C.ink} strokeWidth={6} />
      </>
    )}
    {open > 0 && (
      <>
        <ellipse cx={-40} cy={-40} rx={40} ry={50} fill="#A86B3C" {...O} />
        <ellipse cx={60} cy={-20} rx={50} ry={60} fill="#A86B3C" {...O} />
        <path d="M -20 20 Q 0 -10 20 20 Q 40 40 20 60 Q 0 50 -20 60 Q -40 40 -20 20 Z" fill={C.red} {...O} />
        <circle cx={-8} cy={34} r={8} fill="#fff" />
        <circle cx={12} cy={34} r={8} fill="#fff" />
        <path d="M -14 52 Q 0 60 14 52" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      </>
    )}
  </G>
);

export const GemPack: React.FC<P & {price: string; gems: number; bonus?: string; best?: number}> = ({price, gems, bonus, best = 0, ...p}) => (
  <G {...p}>
    <rect x={-140} y={-140} width={280} height={280} rx={24} fill="#3A4A8C" {...O} />
    {best > 0 && (
      <g transform="rotate(-12) translate(0,-90)">
        <rect x={-80} y={-24} width={160} height={48} rx={12} fill={C.yellow} {...O} strokeWidth={4} />
        <Text y={0} size={28} color={C.ink}>BEST VALUE</Text>
      </g>
    )}
    <circle cx={0} cy={-20} r={50} fill={C.blue} stroke="#fff" strokeWidth={5} />
    <Text y={40} size={48} color="#fff">{gems}</Text>
    <Text y={80} size={24} color="#C9D6E6">GEMS</Text>
    {bonus && <Text y={110} size={20} color={C.yellow}>+{bonus} BONUS</Text>}
    <rect x={-120} y={120} width={240} height={44} rx={12} fill={C.green} {...O} strokeWidth={4} />
    <Text y={146} size={30} color="#fff">{price}</Text>
  </G>
);

export const SeasonPass: React.FC<P & {tier?: number; total?: number}> = ({tier = 15, total = 100, ...p}) => (
  <G {...p}>
    <rect x={-260} y={-180} width={520} height={360} rx={20} fill="#2A2D4A" {...O} />
    <Text y={-140} size={36} color={C.yellow}>SEASON PASS</Text>
    <rect x={-240} y={-90} width={480} height={20} rx={10} fill="#3A4A5C" />
    <rect x={-240} y={-90} width={480 * (tier / total)} height={20} rx={10} fill={C.green} />
    <Text y={-30} size={30} color="#fff">Tier {tier}/{total}</Text>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${-180 + i * 180},60)`}>
        <rect x={-50} y={-50} width={100} height={100} rx={16} fill={i < tier / 34 ? C.gold : '#3A4A5C'} {...O} strokeWidth={4} />
        <Text y={6} size={40} color={i < tier / 34 ? C.ink : '#7A8490'}>🎁</Text>
      </g>
    ))}
  </G>
);

export const BannerAd: React.FC<P & {f?: number; dragon?: number}> = ({f = 0, dragon = 1, ...p}) => {
  const wobble = Math.sin(f / 8) * 3;
  return (
    <G {...p}>
      <rect x={-340} y={-200} width={680} height={400} rx={30} fill={dragon ? '#9B2D2D' : '#2A2D4A'} {...O} />
      {dragon > 0 && (
        <>
          <path d="M -60 -60 Q -20 -100 20 -80 Q 60 -100 100 -60 L 140 40 Q 100 80 20 60 Q -20 80 -100 40 Z" fill={C.red} {...O} />
          <circle cx={-30} cy={-40} r={16} fill={C.yellow} />
          <circle cx={30} cy={-40} r={16} fill={C.yellow} />
          <path d="M -40 0 Q 0 20 40 0" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <path d="M 140 -20 L 200 -60 L 180 0" fill={C.red} {...O} />
          <path d="M 140 40 L 200 80 L 180 40" fill={C.red} {...O} />
        </>
      )}
      <g transform={`translate(0,${wobble})`}>
        <Text y={-160} size={44} ls={4} color={C.yellow}>LEGENDARY</Text>
        <Text y={120} size={40} color="#fff">48 HOURS ONLY</Text>
        <Text y={170} size={28} color="#C9D6E6">chance: 0.6%</Text>
      </g>
    </G>
  );
};

export const PullCard: React.FC<P & {item: string; rarity: 'common' | 'legendary'; rainbow?: number}> = ({item, rarity, rainbow = 0, ...p}) => (
  <G {...p}>
    {rainbow > 0 && [0, 1, 2, 3].map((i) => (
      <circle key={i} r={180 + i * 40} fill="none" stroke={['#FF0080', '#FFFF00', '#00FFFF', '#FF00FF'][i]} strokeWidth={6} opacity={(1 - i * 0.2) * rainbow} />
    ))}
    <rect x={-120} y={-160} width={240} height={320} rx={20} fill={rarity === 'legendary' ? C.gold : '#5B6470'} {...O} />
    <Text y={-100} size={rarity === 'legendary' ? 50 : 36} color={rarity === 'legendary' ? C.red : '#fff'}>{item}</Text>
    <Text y={120} size={28} color={rarity === 'legendary' ? C.red : '#C9D6E6'}>{rarity.toUpperCase()}</Text>
  </G>
);

export const GiftCard: React.FC<P & {value: string}> = ({value, ...p}) => (
  <G {...p}>
    <rect x={-180} y={-120} width={360} height={240} rx={20} fill={C.blue} {...O} />
    <rect x={-160} y={-100} width={320} height={70} rx={14} fill="#1D3557" />
    <Text y={-60} size={32} color="#fff">GAME STORE</Text>
    <Text y={20} size={56} color={C.yellow}>{value}</Text>
    <rect x={-120} y={70} width={240} height={16} rx={8} fill="#5B6470" />
  </G>
);

export const ScreenTimeIcon: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-80} y={-80} width={160} height={160} rx={34} fill="#5C7CFA" {...O} />
    <circle cx={0} cy={0} r={50} fill="none" stroke="#fff" strokeWidth={10} />
    <path d="M 0 -30 L 0 0 L 24 24" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
  </G>
);

export const DollarRule: React.FC<P & {gems: number; dollars: string}> = ({gems, dollars, ...p}) => (
  <G {...p}>
    <circle cx={-180} cy={0} r={60} fill="#5C4A8C" {...O} strokeWidth={4} />
    <Text x={-180} y={4} size={40} color="#fff">{gems}</Text>
    <path d="M -80 0 L 80 0 M 50 -20 L 80 0 L 50 20" stroke={C.red} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={120} y={-50} width={180} height={100} rx={16} fill={C.yellow} {...O} strokeWidth={4} />
    <Text x={210} y={4} size={48} color={C.red}>{dollars}</Text>
  </G>
);
