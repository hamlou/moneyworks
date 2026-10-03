import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const};
const GRAY = '#5B6470';
export const SHAKE = '#8E5CC2';

export const PyramidDiagram: React.FC<P & {layers?: number; highlight?: number; top?: string; bottom?: string}> = ({layers = 4, highlight = -1, top = 'TOP 1%', bottom = '99%', ...p}) => (
  <G {...p}>
    <path d="M 0 -280 L -340 140 L 340 140 Z" fill={C.yellow} {...O} />
    {Array.from({length: layers}).map((_, i) => {
      const y = -280 + (420 / layers) * (i + 1);
      const w = 680 * (i + 1) / layers;
      const y0 = y - 420 / layers;
      const w0 = 680 * i / layers;
      return (
        <g key={i}>
          {i === highlight && <path d={`M ${-w0 / 2} ${y0} L ${w0 / 2} ${y0} L ${w / 2} ${y} L ${-w / 2} ${y} Z`} fill={C.red} opacity={0.55} />}
          {i < layers - 1 && <line x1={-w / 2} y1={y} x2={w / 2} y2={y} stroke={C.ink} strokeWidth={5} />}
        </g>
      );
    })}
    <Text y={-200} size={30} color={C.ink}>{top}</Text>
    <Text y={90} size={52} color={C.ink}>{bottom}</Text>
  </G>
);

export const StarterKit: React.FC<P & {price?: string}> = ({price = '$499', ...p}) => (
  <G {...p}>
    <rect x={-160 + 10} y={-140 + 12} width={320} height={280} rx={20} fill="rgba(35,35,43,0.12)" />
    <rect x={-160} y={-140} width={320} height={280} rx={20} fill="#FFE5CC" {...O} />
    <rect x={-160} y={-140} width={320} height={64} rx={20} fill={C.red} {...O} />
    <Text y={-106} size={32} color="#fff" ls={3}>STARTER KIT</Text>
    <Text y={4} size={84} color={C.red}>{price}</Text>
    <Text y={84} size={28} color={GRAY}>REQUIRED TO JOIN</Text>
  </G>
);

export const IncomeDisclosure: React.FC<P & {median?: string; top?: string}> = ({median = '$0', top = '$250K', ...p}) => (
  <G {...p}>
    <rect x={-240} y={-200} width={480} height={400} rx={16} fill="#fff" {...O} />
    <Text y={-160} size={32} color={GRAY} ls={2}>INCOME DISCLOSURE</Text>
    <line x1={-200} y1={-125} x2={200} y2={-125} stroke="#C9CED6" strokeWidth={3} />
    <Text x={-180} y={-60} size={28} anchor="start" color={GRAY}>Median earner:</Text>
    <Text x={180} y={-60} size={44} anchor="end" color={C.red}>{median}</Text>
    <Text x={-180} y={20} size={28} anchor="start" color={GRAY}>Top 1% earns:</Text>
    <Text x={180} y={20} size={44} anchor="end" color={C.green}>{top}</Text>
    <Text y={120} size={24} color="#8C8C8C">*before expenses</Text>
  </G>
);

export const SocialPost: React.FC<P & {tag?: string}> = ({tag = '#BOSSBABE', ...p}) => (
  <G {...p}>
    <rect x={-200} y={-240} width={400} height={480} rx={20} fill="#fff" {...O} />
    <rect x={-200} y={-240} width={400} height={280} rx={20} fill="#E8F4F8" stroke={C.ink} strokeWidth={5} />
    <Text y={-100} size={120} color={C.green}>$$$</Text>
    <Text y={80} size={32} color={GRAY}>{tag}</Text>
  </G>
);

export const MoneyFlowUp: React.FC<P & {f?: number}> = ({f = 0, ...p}) => {
  const coins = Array.from({length: 5}).map((_, i) => {
    const y = 200 - ((f * 4 + i * 90) % 440);
    return <circle key={i} cy={y} r={24} fill={C.gold} stroke={C.ink} strokeWidth={4} />;
  });
  return (
    <G {...p}>
      <path d="M -8 200 L -8 -240 L 0 -260 L 8 -240 L 8 200" fill={C.yellow} stroke={C.ink} strokeWidth={5} />
      {coins}
    </G>
  );
};

export const BossCar: React.FC<P & {leased?: boolean}> = ({leased, ...p}) => (
  <G {...p}>
    <path d="M -200 -40 Q -220 -100 -160 -120 L 160 -120 Q 220 -100 200 -40 L 200 60 L -200 60 Z" fill={C.red} {...O} />
    <path d="M -140 -120 L -100 -180 L 100 -180 L 140 -120" fill={C.red} {...O} />
    <rect x={-120} y={-160} width={80} height={40} rx={8} fill="#8FD3F5" stroke={C.ink} strokeWidth={4} />
    <rect x={40} y={-160} width={80} height={40} rx={8} fill="#8FD3F5" stroke={C.ink} strokeWidth={4} />
    <circle cx={-140} cy={80} r={30} fill={C.ink} />
    <circle cx={140} cy={80} r={30} fill={C.ink} />
    <circle cx={-140} cy={80} r={16} fill="#C9CED6" />
    <circle cx={140} cy={80} r={16} fill="#C9CED6" />
    {leased && (
      <g transform="translate(0,-200)">
        <path d="M -60 0 L -100 -60 L 100 -60 L 60 0 Z" fill={C.yellow} stroke={C.ink} strokeWidth={5} />
        <Text y={-28} size={28} color={C.ink}>BONUS*</Text>
      </g>
    )}
  </G>
);

export const RecruitCounter: React.FC<P & {count: number | string; label?: string}> = ({count, label = 'RECRUIT', ...p}) => (
  <G {...p}>
    <rect x={-170} y={-90} width={340} height={180} rx={24} fill={C.navy} {...O} />
    <Text y={-40} size={32} color="#C9D6E6" ls={2}>{label}</Text>
    <Text y={30} size={84} color={C.yellow}>{count}</Text>
  </G>
);

// product box: front = brand, back = nutrition label
export const ShakeBox: React.FC<P & {back?: boolean; label?: string; hl?: number}> = ({back, label = 'MIRACLE SHAKE', hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-110 + 8} y={-150 + 10} width={220} height={300} rx={14} fill="rgba(35,35,43,0.12)" />
    <rect x={-110} y={-150} width={220} height={300} rx={14} fill={back ? '#fff' : SHAKE} {...O} />
    {!back ? (
      <>
        <rect x={-110} y={-150} width={220} height={60} rx={14} fill={C.yellow} {...O} />
        <Text y={-118} size={26} color={C.ink} ls={2}>{label.split(' ')[0]}</Text>
        <Text y={-40} size={40} color="#fff">{label.split(' ')[1] ?? ''}</Text>
        <circle cy={50} r={52} fill="#F3E9FF" stroke={C.ink} strokeWidth={5} />
        <path d="M -24 30 L 24 30 L 16 90 L -16 90 Z" fill="#fff" stroke={C.ink} strokeWidth={4} />
        <Text y={120} size={22} color="#fff">VANILLA</Text>
      </>
    ) : (
      <>
        <Text y={-118} size={26} ls={1}>NUTRITION FACTS</Text>
        <line x1={-90} x2={90} y1={-94} y2={-94} stroke={C.ink} strokeWidth={8} />
        {['Calories', 'Sugar', 'Protein', 'Fat'].map((l, i) => (
          <g key={l}>
            <rect x={-96} y={-80 + i * 52} width={192} height={44} rx={6} fill={hl === i + 1 ? C.yellow : 'none'} />
            <Text x={-86} y={-56 + i * 52} size={24} anchor="start">{l}</Text>
            <Text x={86} y={-56 + i * 52} size={24} anchor="end" color={GRAY}>{['240', '18g', '20g', '6g'][i]}</Text>
          </g>
        ))}
      </>
    )}
  </G>
);

// pile of shake boxes (n visible)
export const BoxPile: React.FC<P & {n?: number}> = ({n = 40, ...p}) => {
  const cols = 8;
  const out: React.ReactNode[] = [];
  for (let i = 0; i < Math.min(n, 40); i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const off = row % 2 ? 40 : 0;
    out.push(<ShakeBox key={i} x={-560 + col * 150 + off} y={-row * 170} s={0.62} r={((i * 37) % 9) - 4} />);
  }
  return <G {...p}>{out}</G>;
};

// "nutrition label" for the business = income disclosure in label style
export const IncomeLabel: React.FC<P & {rows: [string, string][]; hl?: number; shown?: number}> = ({rows, hl = -1, shown = 99, ...p}) => (
  <G {...p}>
    <rect x={-330 + 10} y={-300 + 12} width={660} height={600} rx={18} fill="rgba(35,35,43,0.12)" />
    <rect x={-330} y={-300} width={660} height={600} rx={18} fill="#fff" {...O} />
    <Text y={-245} size={50} ls={1}>INCOME FACTS</Text>
    <Text y={-195} size={26} color={GRAY}>income disclosure statement</Text>
    <line x1={-290} x2={290} y1={-165} y2={-165} stroke={C.ink} strokeWidth={12} />
    {rows.map(([l, v], i) => (
      <g key={i} opacity={i < shown ? 1 : 0.15}>
        <rect x={-300} y={-148 + i * 92} width={600} height={80} rx={10} fill={hl === i ? C.yellow : 'none'} />
        <Text x={-284} y={-108 + i * 92} size={30} anchor="start">{l}</Text>
        <Text x={284} y={-108 + i * 92} size={40} anchor="end" color={hl === i ? C.red : C.ink}>{i < shown ? v : '?'}</Text>
        <line x1={-290} x2={290} y1={-60 + i * 92} y2={-60 + i * 92} stroke={C.ink} strokeWidth={3} />
      </g>
    ))}
  </G>
);

// HUD: running score of what the MLM cost Dave (flips to SAVED)
export const DamageMeter: React.FC<P & {value: string; saved?: string; flash?: number}> = ({value, saved, flash = 0, ...p}) => (
  <G {...p}>
    <rect x={-190 + 6} y={-62 + 8} width={380} height={124} rx={22} fill="rgba(35,35,43,0.18)" />
    <rect x={-190} y={-62} width={380} height={124} rx={22} fill={saved ? C.green : flash ? '#FFE3EA' : '#fff'} {...O} strokeWidth={5} />
    <Text y={-30} size={24} color={saved ? '#fff' : C.red} ls={2}>{saved ? 'SAVED' : "DAVE'S DAMAGE"}</Text>
    <Text y={20} size={52} color={saved ? '#fff' : C.ink}>{saved ?? value}</Text>
  </G>
);

// phone with one chat message
export const ChatPhone: React.FC<P & {to: string; lines: string[]; sent?: number; deleted?: number}> = ({to, lines, sent = 0, deleted = 0, ...p}) => (
  <G {...p}>
    <rect x={-230 + 10} y={-400 + 12} width={460} height={800} rx={50} fill="rgba(35,35,43,0.14)" />
    <rect x={-230} y={-400} width={460} height={800} rx={50} fill="#2E3440" {...O} />
    <rect x={-206} y={-370} width={412} height={740} rx={30} fill="#F7FAFD" />
    <rect x={-206} y={-370} width={412} height={100} rx={30} fill={C.navy} />
    <rect x={-206} y={-300} width={412} height={30} fill={C.navy} />
    <circle cx={-150} cy={-318} r={30} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
    <Text x={-104} y={-318} size={36} anchor="start" color="#fff">{to}</Text>
    <g opacity={deleted ? 0.15 : 1}>
      <rect x={-170} y={-210} width={350} height={lines.length * 56 + 50} rx={26} fill={C.blue} stroke={C.ink} strokeWidth={4} />
      {lines.map((l, i) => <Text key={i} x={-145} y={-160 + i * 56} size={34} anchor="start" color="#fff">{l}</Text>)}
    </g>
    <rect x={-186} y={260} width={290} height={70} rx={35} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <rect x={116} y={260} width={74} height={70} rx={35} fill={sent ? C.green : C.red} stroke={C.ink} strokeWidth={4} />
    <Text x={153} y={296} size={26} color="#fff">{sent ? 'OK' : 'SEND'}</Text>
  </G>
);

// napkin with handwritten math lines
export const Napkin: React.FC<P & {lines: string[]; shown: number}> = ({lines, shown, ...p}) => (
  <G {...p}>
    <path d="M -300 -260 L 300 -250 L 290 260 L -290 250 Z" fill="#fff" {...O} />
    <path d="M -300 -260 L -260 -230 M 300 -250 L 262 -222" stroke="#C9CED6" strokeWidth={3} />
    {lines.map((l, i) => (
      <Text key={i} y={-170 + i * 92} size={58} color={i === lines.length - 1 ? C.red : C.navy} weight={700}>
        {i < shown ? l : ''}
      </Text>
    ))}
  </G>
);

// rally stage with spotlights
export const RallyStage: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    {[-1, 1].map((d) => (
      <path key={d} d={`M ${d * 620} -520 L ${d * 120 + 60 * Math.sin(f / 15 + d)} 80 L ${d * 320 + 60 * Math.sin(f / 15 + d)} 80 Z`} fill={C.yellow} opacity={0.35} />
    ))}
    <rect x={-760} y={80} width={1520} height={70} fill={C.wood} {...O} />
    <rect x={-760} y={150} width={1520} height={40} fill={C.woodDark} {...O} />
    <rect x={-420} y={-470} width={840} height={90} rx={16} fill={C.navy} {...O} />
    <Text y={-424} size={46} color={C.yellow} ls={4}>SPRING RALLY</Text>
  </G>
);

// the "? card" for pause-and-guess
export const GuessCard: React.FC<P & {answer?: string; sub?: string}> = ({answer, sub = 'GUESS IN THE COMMENTS', ...p}) => (
  <G {...p}>
    <rect x={-360 + 12} y={-260 + 14} width={720} height={520} rx={30} fill="rgba(35,35,43,0.16)" />
    <rect x={-360} y={-260} width={720} height={520} rx={30} fill={answer ? C.yellow : C.navy} {...O} />
    <Text y={-40} size={answer ? 150 : 260} color={answer ? C.ink : C.yellow}>{answer ?? '?'}</Text>
    <Text y={180} size={34} color={answer ? C.ink : '#fff'} ls={2}>{sub}</Text>
  </G>
);

// a node in the money-flow chain
export const FlowNode: React.FC<P & {label: string; sub?: string; color?: string; w?: number}> = ({label, sub, color = '#fff', w = 340, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 6} y={-50 + 8} width={w} height={100} rx={22} fill="rgba(35,35,43,0.12)" />
    <rect x={-w / 2} y={-50} width={w} height={100} rx={22} fill={color} {...O} strokeWidth={5} />
    <Text y={sub ? -14 : 2} size={34}>{label}</Text>
    {sub && <Text y={26} size={24} color={GRAY}>{sub}</Text>}
  </G>
);
