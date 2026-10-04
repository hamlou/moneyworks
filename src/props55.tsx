import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Top-right HUD: damage meter showing divorce costs. saved=1 flips to green SAVED.
export const DamageMeter: React.FC<P & {value: string; saved?: number}> = ({value, saved = 0, ...p}) => (
  <G {...p}>
    <rect x={-190 + 6} y={-62 + 8} width={380} height={124} rx={22} fill="rgba(35,35,43,0.18)" />
    <rect x={-190} y={-62} width={380} height={124} rx={22} fill={saved ? C.green : '#FFE3EA'} {...O} strokeWidth={5} />
    <Text y={-30} size={24} ls={3} color={saved ? '#fff' : C.red}>{saved ? 'BOB SAVED' : "BOB'S DAMAGE"}</Text>
    <Text y={22} size={54} color={saved ? '#fff' : C.ink}>{value}</Text>
  </G>
);

// Lawyer bill showing hours x rate = total.
export const LawyerBill: React.FC<P & {topic: string; hours: string; rate: string; total: string; hl?: number}> = ({topic, hours, rate, total, hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-300 + 12} y={-340 + 14} width={600} height={680} rx={16} fill="rgba(35,35,43,0.14)" />
    <rect x={-300} y={-340} width={600} height={680} rx={16} fill="#fff" {...O} />
    <path d="M -300 -322 Q -300 -340 -282 -340 L 282 -340 Q 300 -340 300 -322 L 300 -260 L -300 -260 Z" fill={C.navy} {...O} />
    <Text y={-298} size={30} color="#fff" ls={3}>LAWYER BILL</Text>
    {hl > 0 && <rect x={-260} y={-190} width={520} height={400} rx={12} fill={C.yellow} opacity={0.7} />}
    <Text y={-150} size={34} anchor="start" x={-260} color={C.ink}>Topic:</Text>
    <Text y={-90} size={48} color={hl > 0 ? C.red : C.ink}>{topic}</Text>
    <line x1={-260} y1={-40} x2={260} y2={-40} stroke="#DDD" strokeWidth={3} />
    <Text y={10} size={32} color={GRAY}>Time: {hours} hours</Text>
    <Text y={70} size={32} color={GRAY}>Rate: {rate}/hour</Text>
    <line x1={-260} y1={120} x2={260} y2={120} stroke={C.ink} strokeWidth={4} />
    <Text y={200} size={70} color={C.red}>TOTAL: {total}</Text>
  </G>
);

const GRAY = '#5B6470';

// Stack of divorce forms/papers.
export const DivorceForms: React.FC<P & {cost?: string}> = ({cost = '$300', ...p}) => (
  <G {...p}>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${i * 8},${i * 8})`}>
        <rect x={-200 + 12} y={-280 + 14} width={400} height={560} rx={10} fill="rgba(35,35,43,0.12)" />
        <rect x={-200} y={-280} width={400} height={560} rx={10} fill={i === 2 ? '#fff' : '#F5F5F5'} {...O} />
      </g>
    ))}
    <Text y={-200} size={40} ls={3}>DIVORCE FORMS</Text>
    <Text y={-140} size={28} color={GRAY}>Petition</Text>
    <Text y={-90} size={28} color={GRAY}>Response</Text>
    <Text y={-40} size={28} color={GRAY}>Financial Disclosure</Text>
    <Text y={10} size={28} color={GRAY}>Settlement Agreement</Text>
    {[70, 110, 150, 190].map((y) => <rect key={y} x={-160} y={y} width={320} height={8} rx={4} fill="#E0E0E0" />)}
    <Text y={250} size={48} color={C.green}>{cost}</Text>
  </G>
);

// Whiteboard with arrows pointing to a center.
export const Whiteboard: React.FC<P & {arrows?: number}> = ({arrows = 0, ...p}) => (
  <G {...p}>
    <rect x={-400 + 12} y={-300 + 14} width={800} height={600} rx={20} fill="rgba(35,35,43,0.15)" />
    <rect x={-400} y={-300} width={800} height={600} rx={20} fill="#F8F9FA" {...O} />
    <circle cx={0} cy={0} r={80} fill={C.yellow} {...O} />
    <Text y={0} size={48} color={C.ink}>THE CLOCK</Text>
    {arrows >= 1 && (
      <>
        <path d="M -220 -140 L -100 -60" stroke={C.red} strokeWidth={10} strokeLinecap="round" markerEnd="url(#arrowRed)" />
        <Text x={-260} y={-140} size={32} color={C.red}>BOB</Text>
      </>
    )}
    {arrows >= 2 && (
      <>
        <path d="M 220 -140 L 100 -60" stroke={C.red} strokeWidth={10} strokeLinecap="round" markerEnd="url(#arrowRed)" />
        <Text x={260} y={-140} size={32} color={C.red}>BOB'S WIFE</Text>
      </>
    )}
    {arrows >= 3 && (
      <>
        <path d="M 0 200 L 0 100" stroke={C.green} strokeWidth={10} strokeLinecap="round" markerEnd="url(#arrowGreen)" />
        <Text x={0} y={240} size={34} color={C.green}>LAWYERS PAID</Text>
      </>
    )}
    <defs>
      <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill={C.red} />
      </marker>
      <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill={C.green} />
      </marker>
    </defs>
  </G>
);

// Yellow sticky note with text.
export const StickyNote: React.FC<P & {text: string; size?: number}> = ({text, size = 28, ...p}) => (
  <G {...p}>
    <rect x={-100 + 6} y={-100 + 8} width={200} height={200} rx={8} fill="rgba(35,35,43,0.2)" />
    <rect x={-100} y={-100} width={200} height={200} rx={8} fill="#FFF176" stroke={C.ink} strokeWidth={5} />
    <rect x={-100} y={-100} width={200} height={30} fill="#FFD54F" opacity={0.6} />
    <text x={0} y={10} textAnchor="middle" dominantBaseline="middle" fontFamily={FONT} fontSize={size} fontWeight={600} fill={C.ink} style={{whiteSpace: 'pre-wrap'}}>
      {text}
    </text>
  </G>
);

// "?" guess card with ticking clock.
export const GuessCard: React.FC<P & {f: number; q: string[]; answer?: string}> = ({f, q, answer, ...p}) => {
  const a = (f * 6) % 360;
  return (
    <G {...p}>
      <rect x={-420 + 12} y={-260 + 14} width={840} height={520} rx={30} fill="rgba(35,35,43,0.16)" />
      <rect x={-420} y={-260} width={840} height={520} rx={30} fill={answer ? C.yellow : '#fff'} {...O} />
      <Text y={-200} size={40} ls={6} color={C.red}>QUICK GUESS</Text>
      {q.map((l, i) => <Text key={i} y={-130 + i * 54} size={38}>{l}</Text>)}
      <Text x={-120} y={120} size={answer ? 130 : 150} color={answer ? C.red : C.ink}>{answer ?? '?'}</Text>
      <g transform="translate(220,120)">
        <circle r={80} fill="#fff" {...O} />
        <line x1={0} y1={0} x2={Math.sin((a * Math.PI) / 180) * 60} y2={-Math.cos((a * Math.PI) / 180) * 60} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
        <circle r={10} fill={C.ink} />
      </g>
    </G>
  );
};

// List showing fight items, can strike through.
export const FightList: React.FC<P & {items: string[]; struck?: number}> = ({items, struck = 0, ...p}) => (
  <G {...p}>
    <rect x={-300 + 10} y={-340 + 12} width={600} height={680} rx={16} fill="rgba(35,35,43,0.14)" />
    <rect x={-300} y={-340} width={600} height={680} rx={16} fill="#fff" {...O} />
    <Text y={-280} size={36} ls={3} color={C.red}>BOB'S FIGHT LIST</Text>
    {items.map((item, i) => {
      const done = i < struck;
      return (
        <g key={i} transform={`translate(0,${-200 + i * 60})`}>
          <Text x={-240} y={0} size={32} anchor="start" color={done ? GRAY : C.ink}>{i + 1}. {item}</Text>
          {done && <line x1={-240} y1={0} x2={240} y2={0} stroke={C.red} strokeWidth={6} strokeLinecap="round" />}
        </g>
      );
    })}
  </G>
);

// Staircase visual showing cost steps going down.
export const CostStaircase: React.FC<P & {step?: number}> = ({step = 0, ...p}) => {
  const steps = [
    {label: 'AGREED', cost: '$4,100'},
    {label: 'FOUGHT & SETTLED', cost: '$10,600'},
    {label: 'TRIAL (1 ISSUE)', cost: '$20,400'},
    {label: 'TRIAL (2+ ISSUES)', cost: '$23,300'},
  ];
  return (
    <G {...p}>
      {steps.map((s, i) => {
        const active = i === step;
        const y = -200 + i * 150;
        const x = i * 160 - 240;
        return (
          <g key={i}>
            <rect x={x - 140 + 8} y={y + 8} width={280} height={120} rx={16} fill="rgba(35,35,43,0.15)" />
            <rect x={x - 140} y={y} width={280} height={120} rx={16} fill={active ? C.yellow : '#F5F5F5'} {...O} strokeWidth={active ? 7 : 5} />
            <Text x={x} y={y + 40} size={28} color={GRAY}>{s.label}</Text>
            <Text x={x} y={y + 85} size={44} color={active ? C.red : C.ink}>{s.cost}</Text>
          </g>
        );
      })}
    </G>
  );
};

// QDRO document.
export const QDRO: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-280 + 12} y={-360 + 14} width={560} height={720} rx={12} fill="rgba(35,35,43,0.14)" />
    <rect x={-280} y={-360} width={560} height={720} rx={12} fill="#fff" {...O} />
    <rect x={-280} y={-360} width={560} height={80} rx={12} fill={C.navy} {...O} />
    <Text y={-318} size={32} color="#fff" ls={4}>QDRO</Text>
    <Text y={-240} size={28} weight={600}>Qualified Domestic</Text>
    <Text y={-200} size={28} weight={600}>Relations Order</Text>
    <line x1={-240} y1={-150} x2={240} y2={-150} stroke="#DDD" strokeWidth={3} />
    <Text y={-90} size={26} color={GRAY}>401(k) account holder:</Text>
    <Text y={-40} size={32}>BOB</Text>
    <Text y={20} size={26} color={GRAY}>Alternate payee:</Text>
    <Text y={70} size={32}>BOB'S WIFE</Text>
    <Text y={140} size={26} color={GRAY}>Amount awarded:</Text>
    <Text y={190} size={38} color={C.blue}>50% of account</Text>
    <line x1={-240} y1={250} x2={240} y2={250} stroke={C.ink} strokeWidth={4} />
    <Text y={310} size={24} color={C.green}>NO 10% EARLY PENALTY</Text>
  </G>
);

// Agreement document with signatures.
export const Agreement: React.FC<P & {signed?: number}> = ({signed = 0, ...p}) => (
  <G {...p}>
    <rect x={-280 + 10} y={-340 + 12} width={560} height={680} rx={12} fill="rgba(35,35,43,0.14)" />
    <rect x={-280} y={-340} width={560} height={680} rx={12} fill="#FFFDF5" {...O} />
    <Text y={-280} size={40} ls={3}>SETTLEMENT</Text>
    <Text y={-230} size={40} ls={3}>AGREEMENT</Text>
    {[-150, -100, -50, 0, 50, 100, 150].map((y) => <rect key={y} x={-220} y={y} width={440} height={10} rx={5} fill="#E0E0D0" />)}
    <line x1={-200} y1={240} x2={-20} y2={240} stroke={C.ink} strokeWidth={3} />
    <line x1={20} y1={240} x2={200} y2={240} stroke={C.ink} strokeWidth={3} />
    {signed >= 1 && <path d="M -180 230 q 30 -40 50 0 t 44 -8 t 46 0" fill="none" stroke={C.blue} strokeWidth={5} strokeLinecap="round" />}
    {signed >= 1 && <path d="M 40 230 q 28 -36 48 0 t 42 -6 t 50 0" fill="none" stroke={C.blue} strokeWidth={5} strokeLinecap="round" />}
    <Text x={-110} y={280} size={22} color={GRAY}>BOB</Text>
    <Text x={120} y={280} size={22} color={GRAY}>BOB'S WIFE</Text>
  </G>
);
