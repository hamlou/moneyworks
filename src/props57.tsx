import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const DamageMeter57: React.FC<P & {value: string; sub?: string; saved?: boolean; flash?: number}> = ({value, sub, saved = false, flash = 0, ...p}) => (
  <G {...p}>
    <rect x={-200 + 8} y={-80 + 10} width={400} height={170} rx={22} fill="rgba(35,35,43,0.18)" />
    <rect x={-200} y={-80} width={400} height={170} rx={22} fill={saved ? C.green : flash > 0 ? '#FFE3EA' : '#fff'} {...O} />
    <rect x={-200} y={-80} width={400} height={50} rx={22} fill={saved ? '#1E8F5E' : C.red} {...O} />
    <Text y={-54} size={26} color="#fff" ls={3}>{saved ? 'DAVE: RECOVERING' : "DAVE'S DAMAGE"}</Text>
    <Text y={14} size={58} color={saved ? '#fff' : C.red}>{value}</Text>
    {sub && <Text y={64} size={24} color={saved ? '#fff' : '#5B6470'} weight={600}>{sub}</Text>}
  </G>
);

export const PizzaSlice: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -50 -40 Q 0 -66 50 -40 L 0 70 Z" fill="#F4C95D" {...O} strokeWidth={5} />
    <path d="M -50 -40 Q 0 -66 50 -40 L 44 -26 Q 0 -50 -44 -26 Z" fill="#D9A15B" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-12} cy={-8} r={9} fill="#D1495B" stroke={C.ink} strokeWidth={3} />
    <circle cx={14} cy={10} r={8} fill="#D1495B" stroke={C.ink} strokeWidth={3} />
    <circle cx={0} cy={36} r={7} fill="#D1495B" stroke={C.ink} strokeWidth={3} />
  </G>
);

export const SendApp: React.FC<P & {amount: string; to?: string; sent?: number; memo?: number; ring?: number}> = ({amount, to = 'DANNY', sent = 0, memo = 1, ring = 0, ...p}) => (
  <G {...p}>
    <rect x={-210} y={-380} width={420} height={760} rx={50} fill="#2E3440" {...O} />
    <rect x={-186} y={-350} width={372} height={680} rx={24} fill="#F7FAFD" />
    <rect x={-186} y={-350} width={372} height={96} rx={24} fill={C.navy} />
    <rect x={-186} y={-280} width={372} height={26} fill={C.navy} />
    <Text y={-300} size={34} color="#fff" ls={3}>SEND MONEY</Text>
    <Text y={-200} size={30} color="#7B8794" weight={600}>{`to: ${to}`}</Text>
    <Text y={-110} size={amount.length > 6 ? 84 : 96} color={C.ink}>{amount}</Text>
    <rect x={-150} y={-20} width={300} height={130} rx={18} fill="#fff" stroke="#C9D2DC" strokeWidth={4} />
    <Text x={-130} y={10} size={26} color="#7B8794" anchor="start" weight={600}>memo:</Text>
    {memo > 0 && <PizzaSlice x={30} y={56} s={0.55 * memo} />}
    {ring > 0 && <ellipse cx={0} cy={45} rx={185 * ring} ry={95 * ring} fill="none" stroke={C.red} strokeWidth={10} />}
    <rect x={-150} y={160} width={300} height={100} rx={50} fill={sent > 0 ? C.green : C.blue} {...O} strokeWidth={5} />
    <Text y={212} size={44} color="#fff" ls={2}>{sent > 0 ? 'SENT ✓' : 'SEND'}</Text>
    <rect x={-40} y={350} width={80} height={10} rx={5} fill="#555" />
  </G>
);

export const DinnerTable: React.FC<P & {turkey?: number; roll?: number}> = ({turkey = 1, roll = 0, ...p}) => (
  <G {...p}>
    <rect x={-560} y={-30} width={1120} height={60} rx={16} fill="#fff" {...O} />
    <path d="M -560 30 L -540 150 L 540 150 L 560 30 Z" fill="#E9F1F7" {...O} />
    {[-420, -300, 300, 420].map((x) => <ellipse key={x} cx={x} cy={-38} rx={56} ry={16} fill="#fff" stroke={C.ink} strokeWidth={4} />)}
    {turkey > 0 && (
      <g transform="translate(0,-60)">
        <ellipse cx={0} cy={30} rx={190} ry={36} fill="#E3E7EC" stroke={C.ink} strokeWidth={5} />
        <path d="M -130 20 Q -150 -110 0 -120 Q 150 -110 130 20 Z" fill="#C98F5E" {...O} />
        <path d="M -80 -70 Q -40 -95 10 -88" fill="none" stroke="#E8B878" strokeWidth={10} strokeLinecap="round" />
        <path d="M 110 -20 L 175 -70 M 175 -70 l 14 -10 M 175 -70 l 4 -18" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
        <path d="M -110 -20 L -175 -70 M -175 -70 l -14 -10 M -175 -70 l -4 -18" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
      </g>
    )}
    <g transform="translate(-230,-55)">
      <path d="M -50 0 Q -40 40 0 40 Q 50 40 60 0 L 90 -16 L 60 -6 Z" fill="#F4E1B5" {...O} strokeWidth={5} />
      <path d="M -46 0 L 58 0" stroke="#8B5A2B" strokeWidth={10} strokeLinecap="round" />
    </g>
    <g transform={`translate(${260 - roll * 80},${-55 - roll * 120})`}>
      <ellipse cx={0} cy={0} rx={38} ry={26} fill="#E9B872" stroke={C.ink} strokeWidth={5} />
      <path d="M -14 -18 Q -4 0 -14 18 M 10 -20 Q 20 0 10 20" fill="none" stroke={C.ink} strokeWidth={3} />
    </g>
  </G>
);

export const Fork: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-6} y={-10} width={12} height={90} rx={6} fill="#B8C2CC" stroke={C.ink} strokeWidth={4} />
    <path d="M -20 -10 L -20 -60 M -7 -10 L -7 -60 M 7 -10 L 7 -60 M 20 -10 L 20 -60 M -20 -10 Q 0 6 20 -10" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  </G>
);

export const GuessCard57: React.FC<P & {f: number; answer?: string}> = ({f, answer, ...p}) => {
  const a = (f % 30) / 30;
  return (
    <G {...p}>
      <rect x={-330 + 10} y={-260 + 12} width={660} height={520} rx={34} fill="rgba(35,35,43,0.15)" />
      <rect x={-330} y={-260} width={660} height={520} rx={34} fill={answer ? C.yellow : '#fff'} {...O} />
      <Text y={-190} size={40} ls={3} color={C.navy}>QUICK GUESS</Text>
      <Text y={10} size={answer ? 190 : 230} color={answer ? C.red : C.ink}>{answer ?? '?'}</Text>
      <Text y={190} size={34} color="#5B6470" weight={600}>out of 100 lenders</Text>
      {!answer && (
        <g transform="translate(250,-180)">
          <circle r={56} fill="#fff" {...O} />
          <line x1={0} y1={0} x2={Math.sin(a * Math.PI * 2) * 40} y2={-Math.cos(a * Math.PI * 2) * 40} stroke={C.red} strokeWidth={7} strokeLinecap="round" />
          <circle r={7} fill={C.ink} />
        </g>
      )}
    </G>
  );
};

export const Jaw: React.FC<P & {open?: number; color?: string}> = ({open = 0.5, color = C.red, ...p}) => {
  const o = 20 + 60 * open;
  const teeth = [-70, -35, 0, 35, 70];
  return (
    <G {...p}>
      <path d={`M -110 ${-o} Q 0 ${-o - 90} 110 ${-o} Z`} fill={color} {...O} />
      <path d={`M -110 ${o} Q 0 ${o + 90} 110 ${o} Z`} fill={color} {...O} />
      {teeth.map((x) => <path key={'u' + x} d={`M ${x - 16} ${-o} L ${x} ${-o + 34} L ${x + 16} ${-o} Z`} fill="#fff" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />)}
      {teeth.map((x) => <path key={'l' + x} d={`M ${x - 16} ${o} L ${x} ${o - 34} L ${x + 16} ${o} Z`} fill="#fff" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />)}
    </G>
  );
};

export const BillTicket: React.FC<P & {n: number | string; label: string; color?: string; teeth?: boolean; open?: number; hl?: number; w?: number}> = ({n, label, color = C.blue, teeth = true, open = 0.4, hl = 0, w = 300, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 8} y={-170 + 10} width={w} height={340} rx={24} fill="rgba(35,35,43,0.14)" />
    <rect x={-w / 2} y={-170} width={w} height={340} rx={24} fill={hl ? '#FFF4D6' : '#fff'} {...O} />
    <rect x={-w / 2} y={-170} width={w} height={70} rx={24} fill={color} {...O} />
    <Text y={-134} size={36} color="#fff">{`#${n}`}</Text>
    {teeth ? <Jaw y={10} s={0.75} open={open} color={color} /> : <Text y={20} size={60} color="#5B6470">: )</Text>}
    <Text y={130} size={label.length > 10 ? 30 : 36}>{label}</Text>
  </G>
);

export const TicketMachine: React.FC<P & {n: number | string}> = ({n, ...p}) => (
  <G {...p}>
    <rect x={-120} y={-170} width={240} height={250} rx={30} fill={C.red} {...O} />
    <rect x={-80} y={-130} width={160} height={70} rx={12} fill="#2E3440" {...O} strokeWidth={4} />
    <Text y={-94} size={44} color={C.yellow}>{String(n)}</Text>
    <Text y={-20} size={26} color="#fff" ls={2}>TAKE A</Text>
    <Text y={18} size={26} color="#fff" ls={2}>NUMBER</Text>
    <rect x={-14} y={80} width={28} height={220} fill="#9AA5B1" {...O} strokeWidth={4} />
    <rect x={-90} y={300} width={180} height={30} rx={10} fill="#9AA5B1" {...O} strokeWidth={4} />
  </G>
);

export const OnePage: React.FC<P & {lines: string[]; shown?: number; signA?: number; signB?: number; title?: string}> = ({lines, shown = 99, signA = 0, signB = 0, title = 'DAVE + DANNY', ...p}) => (
  <G {...p}>
    <rect x={-260 + 10} y={-330 + 12} width={520} height={660} rx={12} fill="rgba(35,35,43,0.12)" />
    <rect x={-260} y={-330} width={520} height={660} rx={12} fill="#FFFDF5" {...O} />
    <Text y={-270} size={40} ls={3}>{title}</Text>
    <line x1={-200} y1={-235} x2={200} y2={-235} stroke={C.ink} strokeWidth={3} />
    {lines.map((l, i) =>
      i < shown ? (
        <text key={i} x={-210} y={-180 + i * 64} fontFamily={HAND} fontSize={46} fontWeight={700} fill={C.ink} dominantBaseline="middle">{l}</text>
      ) : null,
    )}
    <line x1={-220} y1={250} x2={-30} y2={250} stroke={C.ink} strokeWidth={3} />
    <line x1={30} y1={250} x2={220} y2={250} stroke={C.ink} strokeWidth={3} />
    <text x={-125} y={285} fontFamily={FONT} fontSize={22} fontWeight={600} fill="#5B6470" textAnchor="middle">DAVE</text>
    <text x={125} y={285} fontFamily={FONT} fontSize={22} fontWeight={600} fill="#5B6470" textAnchor="middle">DANNY</text>
    <path d="M -200 240 q 30 -40 50 0 t 50 -10 t 60 0" fill="none" stroke={C.blue} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - signA} />
    <path d="M 50 240 q 30 -40 50 0 t 50 -10 t 60 0" fill="none" stroke={C.green} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - signB} />
  </G>
);

export const GiftBox57: React.FC<P & {label?: string; bow?: boolean}> = ({label, bow = true, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-110} width={300} height={220} rx={10} fill={C.blue} {...O} />
    <rect x={-170} y={-150} width={340} height={60} rx={10} fill="#5C9DFF" {...O} />
    <rect x={-22} y={-150} width={44} height={260} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
    {bow && <path d="M 0 -150 Q -90 -230 -70 -160 Q -50 -140 0 -150 Q 50 -140 70 -160 Q 90 -230 0 -150 Z" fill={C.yellow} {...O} strokeWidth={5} />}
    {label && <Text y={40} size={34} color="#fff">{label}</Text>}
  </G>
);

export const IrsPage: React.FC<P & {hl?: number; lines: string[]}> = ({hl = -1, lines, ...p}) => (
  <G {...p}>
    <rect x={-380 + 10} y={-300 + 12} width={760} height={600} rx={18} fill="rgba(35,35,43,0.12)" />
    <rect x={-380} y={-300} width={760} height={600} rx={18} fill="#fff" {...O} />
    <rect x={-380} y={-300} width={760} height={90} rx={18} fill={C.navy} {...O} />
    <Text y={-254} size={36} color="#fff" ls={3}>IRS · TOPIC 453 · BAD DEBTS</Text>
    {lines.map((l, i) => (
      <g key={i}>
        {i === hl && <rect x={-350} y={-180 + i * 90} width={700} height={70} rx={12} fill={C.yellow} opacity={0.75} />}
        <Text x={-330} y={-144 + i * 90} size={32} anchor="start" color={i === hl ? C.ink : '#5B6470'} weight={600}>{l}</Text>
      </g>
    ))}
  </G>
);
