import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Top-right HUD: running cost of the co-signed loan. saved=1 flips it to a green SAVED card.
export const DamageMeter: React.FC<P & {value: string; saved?: number; hot?: number}> = ({value, saved = 0, hot = 0, ...p}) => (
  <G {...p}>
    <rect x={-190 + 6} y={-62 + 8} width={380} height={124} rx={22} fill="rgba(35,35,43,0.18)" />
    <rect x={-190} y={-62} width={380} height={124} rx={22} fill={saved ? C.green : hot ? '#FFE3EA' : '#fff'} {...O} strokeWidth={5} />
    <Text y={-30} size={24} ls={3} color={saved ? '#fff' : C.red}>{saved ? 'DAVE SAVED' : "DAVE'S DAMAGE"}</Text>
    <Text y={22} size={54} color={saved ? '#fff' : C.ink}>{value}</Text>
  </G>
);

// A credit report sheet with rows; one row can be highlighted, late marks stamp in.
export const CreditReport: React.FC<P & {name?: string; rows: string[]; hl?: number; late?: number; mud?: number}> = ({name = "DAVE'S CREDIT REPORT", rows, hl = -1, late = 0, mud = 0, ...p}) => (
  <G {...p}>
    <rect x={-300 + 12} y={-340 + 14} width={600} height={680} rx={16} fill="rgba(35,35,43,0.14)" />
    <rect x={-300} y={-340} width={600} height={680} rx={16} fill="#fff" {...O} />
    <path d="M -300 -322 Q -300 -340 -282 -340 L 282 -340 Q 300 -340 300 -322 L 300 -260 L -300 -260 Z" fill={C.navy} {...O} />
    <Text y={-298} size={30} color="#fff" ls={3}>{name}</Text>
    {rows.map((r, i) => (
      <g key={i} transform={`translate(0,${-190 + i * 110})`}>
        <rect x={-260} y={-40} width={520} height={80} rx={12} fill={i === hl ? '#FFF3C4' : '#F2F5F8'} stroke={i === hl ? C.red : '#C9D3DD'} strokeWidth={i === hl ? 6 : 3} />
        <Text x={-236} y={2} size={30} anchor="start" color={C.ink}>{r}</Text>
      </g>
    ))}
    {Array.from({length: 3}).map((_, i) =>
      late > i ? (
        <g key={i} transform={`translate(${-150 + i * 150},250) rotate(${-8 + i * 6})`}>
          <rect x={-66} y={-30} width={132} height={60} rx={10} fill="rgba(255,255,255,0.9)" stroke={C.red} strokeWidth={6} />
          <Text y={2} size={30} color={C.red}>LATE</Text>
        </g>
      ) : null,
    )}
    {mud > 0 &&
      Array.from({length: 6}).map((_, i) => (
        <g key={`m${i}`} opacity={Math.min(1, Math.max(0, mud * 6 - i))} transform={`translate(${-230 + i * 90},${-120 + (i % 2) * 60 + i * 40}) rotate(${70 + (i % 2) * 20})`}>
          <ellipse cx={0} cy={0} rx={22} ry={34} fill="#7A5230" />
          {[-14, -4, 6, 16].map((x) => <circle key={x} cx={x} cy={-44} r={7} fill="#7A5230" />)}
        </g>
      ))}
  </G>
);

// The "Notice to Cosigner" page. hl = 0..1 highlights the key sentence.
export const NoticePage: React.FC<P & {hl?: number; lines?: string[]; sign?: number}> = ({hl = 0, lines = ['You are being asked to', 'guarantee this debt.', 'Think carefully before you do.', "If the borrower doesn't pay", 'the debt, you will have to.'], sign = 1, ...p}) => (
  <G {...p}>
    <rect x={-330 + 12} y={-400 + 14} width={660} height={800} rx={10} fill="rgba(35,35,43,0.14)" />
    <rect x={-330} y={-400} width={660} height={800} rx={10} fill="#FFFDF5" {...O} />
    <Text y={-330} size={46} ls={4}>NOTICE TO</Text>
    <Text y={-275} size={46} ls={4}>COSIGNER</Text>
    {lines.map((l, i) => {
      const key = i >= 3;
      return (
        <g key={i}>
          {key && hl > 0 && <rect x={-290} y={-205 + i * 62} width={580 * Math.min(1, hl)} height={52} fill={C.yellow} opacity={0.8} />}
          <Text y={-178 + i * 62} size={34} weight={key ? 700 : 500} color={key && hl > 0 ? C.red : C.ink}>{l}</Text>
        </g>
      );
    })}
    {[170, 205, 240].map((y) => <rect key={y} x={-260} y={y} width={520} height={12} rx={6} fill="#E3E0D2" />)}
    <line x1={-240} y1={340} x2={240} y2={340} stroke={C.ink} strokeWidth={4} />
    <path d="M -210 330 q 30 -46 56 0 t 56 -12 t 66 0 t 50 -6" fill="none" stroke={C.blue} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - sign} />
    <Text x={-240} y={370} size={24} anchor="start" color="#5B6470">co-signer: DAVE</Text>
  </G>
);

// Phone with an incoming call screen.
export const CallPhone: React.FC<P & {f: number; who: string; sub?: string; ring?: number}> = ({f, who, sub = 'incoming call...', ring = 1, ...p}) => {
  const wob = ring ? Math.sin(f * 1.6) * 4 : 0;
  return (
    <G {...p}>
      <g transform={`rotate(${wob})`}>
        <rect x={-150} y={-280} width={300} height={560} rx={44} fill="#2E3440" {...O} />
        <rect x={-130} y={-254} width={260} height={508} rx={26} fill="#1D3557" />
        <circle cx={0} cy={-120} r={62} fill="#9AA5B1" stroke="#fff" strokeWidth={5} />
        <Text y={-112} size={70} color="#fff">?</Text>
        <Text y={-10} size={who.length > 12 ? 30 : 38} color="#fff">{who}</Text>
        <Text y={36} size={24} color="#C9D6E6" weight={500}>{sub}</Text>
        <circle cx={-70} cy={170} r={42} fill={C.red} stroke="#fff" strokeWidth={4} />
        <circle cx={70} cy={170} r={42} fill={C.green} stroke="#fff" strokeWidth={4} />
        <path d="M 52 166 q 18 -18 36 0" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        <path d="M -88 176 q 18 18 36 0" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
      </g>
      {ring > 0 &&
        [0, 1].map((i) => {
          const k = ((f / 14 + i * 0.5) % 1);
          return <circle key={i} r={190 + k * 90} fill="none" stroke={C.yellow} strokeWidth={8} opacity={(1 - k) * 0.8} />;
        })}
    </G>
  );
};

// A brown leather wallet with a name tag.
export const Wallet: React.FC<P & {label?: string; open?: number}> = ({label, open = 0, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-90} width={300} height={180} rx={24} fill="#8C5A33" {...O} />
    <rect x={-150} y={-90 - open * 40} width={300} height={70} rx={20} fill="#A86B3C" {...O} />
    {open > 0 && [0, 1, 2].map((i) => <rect key={i} x={-110 + i * 20} y={-130 - open * 40 + i * 6} width={170} height={70} rx={6} fill={C.greenLight} stroke={C.ink} strokeWidth={4} />)}
    <circle cx={110} cy={0} r={16} fill={C.gold} stroke={C.ink} strokeWidth={4} />
    {label && <Text y={40} size={34} color="#fff" stroke={C.ink} sw={6}>{label}</Text>}
  </G>
);

// A dark mystery silhouette with a top hat and a "?" face (the villain before the reveal).
export const Shadow: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <g transform={`translate(0,${Math.sin(f / 12) * 4})`}>
      <rect x={-60} y={-370} width={120} height={90} rx={8} fill="#15151B" />
      <rect x={-95} y={-290} width={190} height={22} rx={10} fill="#15151B" />
      <circle cx={0} cy={-210} r={70} fill="#15151B" />
      <path d="M -110 -120 Q 0 -160 110 -120 L 130 120 L -130 120 Z" fill="#15151B" />
      <Text y={-198} size={80} color={C.yellow}>?</Text>
    </g>
  </G>
);

// A letter sheet with a red title and a deadline line.
export const Letter: React.FC<P & {title: string; lines: string[]; hl?: number}> = ({title, lines, hl = -1, ...p}) => (
  <G {...p}>
    <rect x={-280 + 12} y={-330 + 14} width={560} height={660} rx={10} fill="rgba(35,35,43,0.14)" />
    <rect x={-280} y={-330} width={560} height={660} rx={10} fill="#fff" {...O} />
    <rect x={-280} y={-330} width={560} height={90} rx={10} fill={C.red} {...O} />
    <Text y={-284} size={40} color="#fff" ls={3}>{title}</Text>
    {lines.map((l, i) => (
      <g key={i}>
        {i === hl && <rect x={-250} y={-200 + i * 90} width={500} height={64} rx={8} fill={C.yellow} />}
        <Text y={-166 + i * 90} size={34} color={i === hl ? C.red : C.ink}>{l}</Text>
      </g>
    ))}
  </G>
);

// "?" guess card with a ticking clock hand.
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

// Seatbelt strap drawn across a seat (used for the lender's seatbelt gag).
export const Strap: React.FC<P & {t?: number}> = ({t = 1, ...p}) => (
  <G {...p}>
    <path d="M -60 -90 L 60 90" stroke="#5B6470" strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} />
    {t >= 1 && <rect x={40} y={70} width={44} height={34} rx={6} fill={C.gold} stroke={C.ink} strokeWidth={4} />}
  </G>
);

// A plain label pill.
export const Pill: React.FC<P & {text: string; color?: string; fg?: string; size?: number}> = ({text, color = C.ink, fg = '#fff', size = 34, ...p}) => {
  const w = text.length * size * 0.6 + 60;
  return (
    <G {...p}>
      <rect x={-w / 2} y={-size * 0.9} width={w} height={size * 1.8} rx={size * 0.9} fill={color} stroke={C.ink} strokeWidth={4} />
      <text x={0} y={3} textAnchor="middle" dominantBaseline="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={fg}>{text}</text>
    </G>
  );
};
