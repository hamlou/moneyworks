import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Laptop showing retirement calculator result
export const RetirementCalc: React.FC<P & {age?: string}> = ({age = '70', ...p}) => (
  <G {...p}>
    <rect x={-240} y={-160} width={480} height={320} rx={20} fill="#404854" {...O} />
    <rect x={-220} y={-140} width={440} height={270} rx={10} fill="#1D3557" />
    <rect x={-200} y={-120} width={400} height={60} rx={8} fill="#fff" />
    <Text y={-86} size={28} color={C.ink}>retirement calculator</Text>
    <Text y={-20} size={30} color="#E0E6ED">Your savings: $25,000</Text>
    <Text y={30} size={30} color="#E0E6ED">Monthly: $400</Text>
    <rect x={-180} y={60} width={360} height={80} rx={12} fill={C.yellow} />
    <Text y={74} size={26} color={C.red}>RETIRE AT:</Text>
    <Text y={120} size={80} color={C.red}>{age}</Text>
  </G>
);

// Vending machine (pension analogy)
export const VendingMachine: React.FC<P & {drop?: number}> = ({drop = 0, ...p}) => (
  <G {...p}>
    <rect x={-140} y={-280} width={280} height={560} rx={20} fill={C.red} {...O} />
    <rect x={-110} y={-240} width={220} height={200} rx={10} fill="rgba(0,0,0,0.3)" stroke={C.ink} strokeWidth={4} />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${-60 + i * 60},${-140 + i * 60})`}>
        <rect x={-20} y={-15} width={40} height={30} rx={4} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
        <Text y={2} size={20}>$</Text>
      </g>
    ))}
    <rect x={-110} y={-20} width={220} height={100} rx={10} fill="#2E3440" stroke={C.ink} strokeWidth={4} />
    {drop > 0 && (
      <g transform={`translate(0,${-20 + drop * 200})`}>
        <rect x={-30} y={-20} width={60} height={40} rx={6} fill={C.greenLight} stroke={C.ink} strokeWidth={4} />
        <Text y={6} size={24}>$$$</Text>
      </g>
    )}
    <rect x={-100} y={100} width={200} height={60} rx={8} fill="#FFE3EA" />
    <Text y={136} size={24} color={C.ink}>EVERY MONTH</Text>
    <Text y={220} size={28}>PENSION</Text>
  </G>
);

// Lunchbox (401k analogy)
export const Lunchbox: React.FC<P & {label?: string; open?: number}> = ({label = '401(k)', open = 0, ...p}) => (
  <G {...p}>
    <rect x={-120 + 8} y={-70 + 10} width={240} height={140} rx={16} fill="rgba(35,35,43,0.15)" />
    <rect x={-120} y={-70} width={240} height={140} rx={16} fill={C.blue} {...O} />
    <rect x={-120} y={-70 - open * 50} width={240} height={60} rx={16} fill="#7BA3CC" {...O} />
    {open > 0 && (
      <g transform={`translate(0,${-40 - open * 30})`}>
        <rect x={-30} y={-15} width={60} height={30} rx={4} fill={C.greenLight} stroke={C.ink} strokeWidth={3} />
        <Text y={4} size={20}>$</Text>
      </g>
    )}
    <rect x={-30} y={-10} width={60} height={20} rx={8} fill={C.gold} stroke={C.ink} strokeWidth={3} />
    {label && <Text y={110} size={28} color={C.ink}>{label}</Text>}
  </G>
);

// FRA badge (Full Retirement Age card)
export const FRABadge: React.FC<P & {age: string; color?: string}> = ({age, color = C.navy, ...p}) => (
  <G {...p}>
    <rect x={-160 + 8} y={-100 + 10} width={320} height={200} rx={20} fill="rgba(35,35,43,0.12)" />
    <rect x={-160} y={-100} width={320} height={200} rx={20} fill="#fff" {...O} />
    <rect x={-160} y={-100} width={320} height={70} rx={20} fill={color} {...O} />
    <Text y={-60} size={28} color="#fff" ls={2}>FULL RETIREMENT AGE</Text>
    <Text y={40} size={110} color={color}>{age}</Text>
  </G>
);

// Marathon finish line with distance markers
export const FinishLine: React.FC<P & {moved?: number; label?: string}> = ({moved = 0, label = 'FINISH', ...p}) => (
  <G {...p}>
    <g transform={`translate(${moved * 200},0)`}>
      <rect x={-20} y={-200} width={40} height={400} rx={0} fill="#fff" stroke={C.ink} strokeWidth={6} />
      <rect x={-20} y={-200} width={40} height={80} fill={C.red} />
      <rect x={-20} y={-40} width={40} height={80} fill={C.red} />
      <rect x={-20} y={120} width={40} height={80} fill={C.red} />
      <Text y={-240} size={36} color={C.red}>{label}</Text>
    </g>
    {moved > 0 && (
      <path d={`M 0 -50 L ${moved * 200} -50`} stroke={C.yellow} strokeWidth={10} strokeDasharray="20 15" markerEnd="url(#arrowhead)" />
    )}
  </G>
);

// Social Security dial showing claim ages and percentages
export const SSdial: React.FC<P & {show62?: number; show67?: number; show70?: number}> = ({show62 = 0, show67 = 0, show70 = 0, ...p}) => (
  <G {...p}>
    <circle r={160} fill="#E8EDF2" {...O} />
    <circle r={120} fill="#fff" stroke={C.navy} strokeWidth={4} />
    {[62, 67, 70].map((age, i) => {
      const a = -90 + i * 90;
      const rad = (a * Math.PI) / 180;
      return (
        <g key={age} transform={`translate(${Math.cos(rad) * 100},${Math.sin(rad) * 100})`}>
          <circle r={24} fill={age === 62 ? C.red : age === 67 ? C.navy : C.green} stroke={C.ink} strokeWidth={4} />
          <Text y={6} size={28} color="#fff">{age}</Text>
        </g>
      );
    })}
    <Text y={-10} size={36} color={C.ink}>CLAIM AT</Text>
    {show62 > 0 && <Text x={-200} y={40} size={32} color={C.red}>70%</Text>}
    {show67 > 0 && <Text x={0} y={-200} size={32} color={C.navy}>100%</Text>}
    {show70 > 0 && <Text x={200} y={40} size={32} color={C.green}>124%</Text>}
  </G>
);

// Expense ratio line item (boring line in 401k statement)
export const ExpenseRatioLine: React.FC<P & {ratio?: string; hl?: number}> = ({ratio = '1.5%', hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-340 + 12} y={-200 + 14} width={680} height={400} rx={20} fill="rgba(35,35,43,0.14)" />
    <rect x={-340} y={-200} width={680} height={400} rx={20} fill="#fff" {...O} />
    <Text y={-150} size={32} color="#7A8694">401(k) STATEMENT</Text>
    <Text y={-90} size={36} color={C.ink}>Balance ............... $25,000</Text>
    <Text y={-30} size={36} color={C.ink}>YTD Return ......... +6.8%</Text>
    <Text y={30} size={36} color={C.ink}>Contributions ...... $4,800</Text>
    {hl > 0 && <rect x={-320} y={70} width={640} height={70} rx={10} fill={C.yellow} opacity={0.7} />}
    <Text y={110} size={hl > 0 ? 42 : 36} weight={hl > 0 ? 700 : 500} color={hl > 0 ? C.red : C.ink}>Expense Ratio ..... {ratio}</Text>
  </G>
);

// Age badge (for showing Dave's age)
export const AgeBadge: React.FC<P & {age: string}> = ({age, ...p}) => (
  <G {...p}>
    <circle r={50} fill={C.yellow} {...O} strokeWidth={5} />
    <Text y={-12} size={28} color={C.ink}>AGE</Text>
    <Text y={26} size={44} color={C.red}>{age}</Text>
  </G>
);

// Name tag (for Dave turning 70 at work)
export const NameTag: React.FC<P & {name?: string}> = ({name = 'DAVE', ...p}) => (
  <G {...p}>
    <rect x={-90 + 6} y={-60 + 8} width={180} height={120} rx={12} fill="rgba(35,35,43,0.12)" />
    <rect x={-90} y={-60} width={180} height={120} rx={12} fill="#fff" {...O} />
    <rect x={-90} y={-60} width={180} height={40} rx={12} fill={C.red} {...O} />
    <Text y={-34} size={20} color="#fff" ls={2}>HELLO</Text>
    <Text y={20} size={40} color={C.ink}>{name}</Text>
  </G>
);

// Trust fund jar (Social Security reserves)
export const TrustJar: React.FC<P & {empty?: number; label?: string}> = ({empty = 0, label = 'TRUST FUND', ...p}) => {
  const level = 1 - empty;
  return (
    <G {...p}>
      <ellipse cx={0} cy={-140} rx={90} ry={30} fill="#C9D6E6" stroke={C.ink} strokeWidth={6} />
      <rect x={-90} y={-140} width={180} height={280} fill="rgba(201,214,230,0.6)" stroke={C.ink} strokeWidth={6} />
      <rect x={-90} y={-140 + (1 - level) * 280} width={180} height={level * 280} fill={C.blue} />
      <ellipse cx={0} cy={140} rx={90} ry={30} fill="#9BAEC4" stroke={C.ink} strokeWidth={6} />
      {label && <Text y={200} size={28}>{label}</Text>}
    </G>
  );
};

// Picnic basket (workers carrying beneficiaries analogy)
export const PicnicBasket: React.FC<P & {people?: number}> = ({people = 3, ...p}) => (
  <G {...p}>
    <rect x={-100} y={-60} width={200} height={80} rx={12} fill="#D4A574" {...O} />
    <path d="M -100 -60 Q -100 -100 -50 -100 L 50 -100 Q 100 -100 100 -60" fill="none" {...O} />
    <circle cx={-50} cy={-100} r={10} fill={C.red} stroke={C.ink} strokeWidth={4} />
    <circle cx={50} cy={-100} r={10} fill={C.red} stroke={C.ink} strokeWidth={4} />
    {people && <Text y={60} size={32} color={C.ink}>{people} workers</Text>}
  </G>
);
