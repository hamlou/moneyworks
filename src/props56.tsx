import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const CatLamp: React.FC<P & {glow?: number; price?: string; f?: number}> = ({glow = 1, price, f = 0, ...p}) => {
  const pulse = 1 + 0.05 * Math.sin(f / 8);
  return (
    <G {...p}>
      {glow > 0 && <circle cx={0} cy={-120} r={210 * pulse} fill={C.yellow} opacity={0.28 * glow} />}
      {glow > 0 && <circle cx={0} cy={-120} r={150 * pulse} fill={C.yellow} opacity={0.3 * glow} />}
      <path d="M -110 -40 Q -130 -150 -90 -220 L -110 -300 L -40 -250 Q 0 -262 40 -250 L 110 -300 L 90 -220 Q 130 -150 110 -40 Z" fill={glow > 0 ? '#FFF1B8' : '#E9E3D3'} {...O} />
      <ellipse cx={-38} cy={-170} rx={12} ry={18} fill={C.ink} />
      <ellipse cx={38} cy={-170} rx={12} ry={18} fill={C.ink} />
      <path d="M -10 -138 L 10 -138 L 0 -126 Z" fill={C.red} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M 0 -126 Q -12 -110 -26 -116 M 0 -126 Q 12 -110 26 -116" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M -100 -140 L -160 -150 M -100 -124 L -160 -118 M 100 -140 L 160 -150 M 100 -124 L 160 -118" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <rect x={-140} y={-44} width={280} height={54} rx={14} fill={C.navy} {...O} />
      {price && (
        <g transform="translate(150,-250) rotate(10)">
          <rect x={-80} y={-36} width={160} height={72} rx={14} fill={C.green} {...O} strokeWidth={5} />
          <Text y={2} size={44} color="#fff">{price}</Text>
        </g>
      )}
    </G>
  );
};

export const SalesPhone: React.FC<P & {value: string; label?: string; color?: string; head?: string; headColor?: string; sub?: string}> = ({value, label = 'TOTAL SALES', color = C.green, head = 'MY STORE', headColor = C.green, sub, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-310} width={340} height={620} rx={44} fill="#2E3440" {...O} />
    <rect x={-150} y={-280} width={300} height={540} rx={22} fill="#F7FAFD" />
    <rect x={-150} y={-280} width={300} height={90} rx={22} fill={headColor} />
    <rect x={-150} y={-214} width={300} height={24} fill={headColor} />
    <Text y={-236} size={34} color="#fff" ls={3}>{head}</Text>
    <Text y={-130} size={30} color="#5B6470" weight={600}>{label}</Text>
    <Text y={-50} size={value.length > 7 ? 70 : 84} color={color}>{value}</Text>
    {sub && <Text y={30} size={30} color="#5B6470" weight={600}>{sub}</Text>}
    <path d="M -110 200 L -60 150 L -10 170 L 50 100 L 110 60" fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={-40} y={282} width={80} height={10} rx={5} fill="#555" />
  </G>
);

export const DamageMeter: React.FC<P & {value: string; saved?: boolean; flash?: number}> = ({value, saved = false, flash = 0, ...p}) => (
  <G {...p}>
    <rect x={-190 + 8} y={-70 + 10} width={380} height={140} rx={22} fill="rgba(35,35,43,0.18)" />
    <rect x={-190} y={-70} width={380} height={140} rx={22} fill={saved ? C.green : flash > 0 ? '#FFE3EA' : '#fff'} {...O} />
    <rect x={-190} y={-70} width={380} height={48} rx={22} fill={saved ? '#1E8F5E' : C.red} {...O} />
    <Text y={-45} size={26} color="#fff" ls={3}>{saved ? 'DAVE: SAVED' : "DAVE'S DAMAGE"}</Text>
    <Text y={24} size={56} color={saved ? '#fff' : C.red}>{value}</Text>
  </G>
);

export const Napkin: React.FC<P & {lines: string[]; shown?: number; hl?: number; w?: number}> = ({lines, shown = 99, hl = -1, w = 520, ...p}) => {
  const h = 90 + lines.length * 70;
  return (
    <G {...p}>
      <rect x={-w / 2 + 10} y={-h / 2 + 12} width={w} height={h} fill="rgba(35,35,43,0.12)" />
      <path d={`M ${-w / 2} ${-h / 2} L ${w / 2} ${-h / 2} L ${w / 2 - 6} ${h / 2} L ${-w / 2 + 8} ${h / 2 - 4} Z`} fill="#FFFDF6" {...O} />
      <path d={`M ${-w / 2 + 20} ${-h / 2 + 20} L ${w / 2 - 20} ${-h / 2 + 20}`} stroke="#E8DFCB" strokeWidth={4} strokeDasharray="10 8" />
      {lines.map((l, i) =>
        i < shown ? (
          <g key={i}>
            {i === hl && <rect x={-w / 2 + 24} y={-h / 2 + 52 + i * 70} width={w - 48} height={60} rx={10} fill={C.yellow} opacity={0.7} />}
            <text x={-w / 2 + 40} y={-h / 2 + 84 + i * 70} fontFamily={HAND} fontSize={50} fontWeight={700} fill={l.startsWith('-') ? C.red : C.ink} dominantBaseline="middle">{l}</text>
          </g>
        ) : null,
      )}
    </G>
  );
};

export const ClickGrid: React.FC<P & {n?: number; lit?: number; buy?: number; cols?: number; gap?: number}> = ({n = 100, lit = 100, buy = 0, cols = 20, gap = 46, ...p}) => {
  const rows = Math.ceil(n / cols);
  const w = (cols - 1) * gap;
  const h = (rows - 1) * gap;
  return (
    <G {...p}>
      <rect x={-w / 2 - 40} y={-h / 2 - 40} width={w + 80} height={h + 80} rx={24} fill="#fff" {...O} />
      {Array.from({length: n}).map((_, i) => {
        const x = -w / 2 + (i % cols) * gap;
        const y = -h / 2 + Math.floor(i / cols) * gap;
        const isBuy = i < buy;
        const on = i < lit;
        return <circle key={i} cx={x} cy={y} r={isBuy ? 19 : 15} fill={isBuy ? C.green : on ? '#9AA5B1' : '#E8E1D2'} stroke={C.ink} strokeWidth={isBuy ? 5 : 3} />;
      })}
    </G>
  );
};

export const AdCard: React.FC<P & {cost?: string; clicks?: string; hl?: number}> = ({cost = '$0.50', clicks, hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-230 + 10} y={-280 + 12} width={460} height={560} rx={26} fill="rgba(35,35,43,0.14)" />
    <rect x={-230} y={-280} width={460} height={560} rx={26} fill="#fff" {...O} />
    <rect x={-200} y={-250} width={400} height={300} rx={14} fill="#2B2D42" {...O} strokeWidth={5} />
    <CatLamp s={0.75} y={10} glow={1} />
    <rect x={-200} y={-250} width={130} height={40} rx={10} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
    <Text x={-135} y={-229} size={24}>SPONSORED</Text>
    <rect x={-170} y={90} width={340} height={70} rx={35} fill={hl ? C.red : C.blue} {...O} strokeWidth={5} />
    <Text y={126} size={34} color="#fff">SHOP NOW</Text>
    <Text y={220} size={34} color={C.red}>{`each click: ${cost}`}</Text>
    {clicks && <Text y={258} size={26} color="#5B6470">{clicks}</Text>}
  </G>
);

export const ShovelShop: React.FC<P & {sign?: string}> = ({sign = 'SHOVELS', ...p}) => (
  <G {...p}>
    <rect x={-260} y={-300} width={520} height={300} fill="#F4E1B5" {...O} />
    <path d="M -290 -300 L 290 -300 L 260 -380 L -260 -380 Z" fill={C.red} {...O} />
    {[-220, -140, -60, 20, 100, 180].map((x, i) => <path key={x} d={`M ${x} -380 L ${x + 40} -380 L ${x + 50} -300 L ${x + 10} -300 Z`} fill={i % 2 ? '#fff' : C.red} stroke={C.ink} strokeWidth={3} />)}
    <rect x={-200} y={-460} width={400} height={70} rx={12} fill="#fff" {...O} />
    <Text y={-424} size={44} ls={4}>{sign}</Text>
    {[-170, -90, -10].map((x) => (
      <g key={x} transform={`translate(${x},-40) rotate(-8)`}>
        <rect x={-6} y={-220} width={12} height={170} fill={C.wood} stroke={C.ink} strokeWidth={4} />
        <path d="M -34 -60 L 34 -60 L 26 10 Q 0 34 -26 10 Z" fill="#B8C2CC" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      </g>
    ))}
    <rect x={60} y={-150} width={180} height={150} fill="#fff" {...O} />
    <Text x={150} y={-75} size={70} color={C.green}>$</Text>
  </G>
);

export const BudgetButton: React.FC<P & {press?: number; label?: string}> = ({press = 0, label = 'INCREASE BUDGET', ...p}) => (
  <G {...p}>
    <rect x={-300 + 10} y={-70 + 12 + press * 8} width={600} height={140} rx={70} fill="rgba(35,35,43,0.2)" />
    <rect x={-300} y={-70 + press * 8} width={600} height={140} rx={70} fill={C.blue} {...O} />
    <Text y={press * 8 + 2} size={50} color="#fff" ls={2}>{label}</Text>
  </G>
);

export const BoatLamps: React.FC<P & {f: number; label?: string}> = ({f, label = 'DAY 23...', ...p}) => (
  <G {...p}>
    <g transform={`translate(0,${Math.sin(f / 12) * 8}) rotate(${Math.sin(f / 18) * 2})`}>
      <path d="M -360 -20 L 360 -20 L 290 100 L -300 100 Z" fill={C.navy} {...O} />
      {[-260, -150, -40, 70, 180].map((x, i) => (
        <g key={x}>
          <rect x={x} y={-130 - (i % 2) * 70} width={100} height={110 + (i % 2) * 70} fill={[C.red, C.yellow, C.blue, C.green, '#E8B878'][i]} {...O} strokeWidth={5} />
        </g>
      ))}
      <text x={0} y={52} fontFamily={FONT} fontWeight={700} fontSize={40} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={4}>{label}</text>
    </g>
    <path d="M -460 120 q 40 -20 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="#5AB6E0" strokeWidth={10} strokeLinecap="round" />
  </G>
);

export const RefundStack: React.FC<P & {n: number; label?: string}> = ({n, label = 'REFUND', ...p}) => (
  <G {...p}>
    {Array.from({length: Math.min(n, 8)}).map((_, i) => (
      <g key={i} transform={`translate(${(i % 2 ? 1 : -1) * (i * 6)},${-i * 28}) rotate(${(i % 3) * 3 - 3})`}>
        <rect x={-200} y={-50} width={400} height={100} rx={18} fill="#fff" {...O} strokeWidth={5} />
        <rect x={-180} y={-30} width={60} height={60} rx={12} fill={C.red} stroke={C.ink} strokeWidth={4} />
        <Text x={-150} y={2} size={36} color="#fff">!</Text>
        <Text x={30} y={2} size={34} color={C.red}>{`${label} -$30`}</Text>
      </g>
    ))}
  </G>
);
