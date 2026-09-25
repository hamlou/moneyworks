import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text, Coin} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export type RaccoonMood = 'happy' | 'greedy' | 'sneaky' | 'wink';
export const Raccoon: React.FC<P & {f: number; mood?: RaccoonMood; grab?: number; hood?: boolean; holdCoin?: boolean}> = ({f, mood = 'happy', grab = 0, hood, holdCoin, ...p}) => {
  const blink = f % 97 < 4;
  const tail = Math.sin(f / 9) * 10;
  const arm = -20 - grab * 70;
  return (
    <G {...p}>
      <ellipse cx={0} cy={118} rx={110} ry={14} fill="rgba(35,35,43,0.10)" />
      <g transform={`rotate(${tail},60,70)`}>
        <path d="M 60 70 Q 170 60 180 -30 Q 186 -70 160 -80 Q 150 20 60 40 Z" fill="#8E8F99" {...O} />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${118 + i * 20} ${40 - i * 38} q 14 -6 24 4`} stroke={C.ink} strokeWidth={10} strokeLinecap="round" fill="none" />)}
      </g>
      <ellipse cx={0} cy={50} rx={78} ry={70} fill="#A6A7B1" {...O} />
      <ellipse cx={0} cy={66} rx={46} ry={44} fill="#E4E4EA" />
      <path d="M -40 110 L -40 118 M 40 110 L 40 118" stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
      <g transform={`rotate(${arm},-60,20)`}>
        <path d="M -60 20 L -118 40" stroke="#A6A7B1" strokeWidth={22} strokeLinecap="round" />
        <path d="M -60 20 L -118 40" stroke={C.ink} strokeWidth={30} strokeLinecap="round" opacity={0.0} />
        <circle cx={-122} cy={42} r={14} fill="#55565F" stroke={C.ink} strokeWidth={4} />
        {holdCoin && <Coin x={-130} y={30} s={0.9} />}
      </g>
      <path d="M 60 20 Q 96 40 96 64" stroke="#A6A7B1" strokeWidth={22} strokeLinecap="round" fill="none" />
      <circle cx={96} cy={68} r={14} fill="#55565F" stroke={C.ink} strokeWidth={4} />
      <g transform={`translate(0,-44) rotate(${Math.sin(f / 13) * 4})`}>
        <path d="M -62 -40 L -74 -96 L -30 -66 Z" fill="#A6A7B1" {...O} strokeWidth={5} />
        <path d="M 62 -40 L 74 -96 L 30 -66 Z" fill="#A6A7B1" {...O} strokeWidth={5} />
        <ellipse cx={0} cy={0} rx={82} ry={66} fill="#A6A7B1" {...O} />
        <path d="M -76 -6 Q -40 -34 0 -8 Q 40 -34 76 -6 Q 60 26 30 20 Q 0 6 -30 20 Q -60 26 -76 -6 Z" fill="#2E2F36" />
        <ellipse cx={-30} cy={0} rx={11} ry={blink || mood === 'wink' ? 2 : mood === 'sneaky' ? 6 : 12} fill="#fff" />
        <ellipse cx={30} cy={0} rx={11} ry={blink ? 2 : mood === 'sneaky' ? 6 : 12} fill="#fff" />
        {!blink && <circle cx={-28} cy={mood === 'sneaky' ? 1 : 2} r={5} fill={C.ink} />}
        {!blink && mood !== 'wink' && <circle cx={32} cy={mood === 'sneaky' ? 1 : 2} r={5} fill={C.ink} />}
        {mood === 'sneaky' && <path d="M -46 -14 L -16 -8 M 46 -14 L 16 -8" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
        <ellipse cx={0} cy={36} rx={40} ry={24} fill="#E4E4EA" />
        <ellipse cx={0} cy={26} rx={10} ry={7} fill={C.ink} />
        {mood === 'greedy' ? (
          <path d="M -20 40 Q 0 62 20 40 Z" fill={C.ink} />
        ) : (
          <path d={mood === 'sneaky' ? 'M -16 44 Q 4 50 20 38' : 'M -16 40 Q 0 54 16 40'} fill="none" stroke={C.ink} strokeWidth={4.5} strokeLinecap="round" />
        )}
        {mood === 'greedy' && <Text x={-30} y={-2} size={20} color={C.green}>$</Text>}
        {mood === 'greedy' && <Text x={30} y={-2} size={20} color={C.green}>$</Text>}
        {hood && (
          <g transform="translate(0,-58)">
            <path d="M -70 10 Q -40 -60 20 -52 Q 70 -44 84 6 Z" fill="#3E8E4A" {...O} strokeWidth={5} />
            <path d="M 40 -40 Q 110 -110 130 -80 Q 90 -60 60 -30" fill="#E94F4F" stroke={C.ink} strokeWidth={4} />
            <rect x={-74} y={0} width={162} height={14} rx={6} fill="#2F6D38" stroke={C.ink} strokeWidth={4} />
          </g>
        )}
      </g>
    </G>
  );
};

export const TollBooth: React.FC<P & {barUp?: number; label?: string}> = ({barUp = 0, label = 'SWIPE FEE', ...p}) => (
  <G {...p}>
    <rect x={-120} y={-300} width={240} height={300} fill="#F4F0E6" {...O} />
    <rect x={-140} y={-340} width={280} height={50} rx={8} fill={C.red} {...O} />
    <Text y={-314} size={32} color="#fff" ls={3}>{label}</Text>
    <rect x={-90} y={-250} width={180} height={120} rx={8} fill="#CFE8F5" {...O} strokeWidth={5} />
    <rect x={-140} y={-10} width={280} height={20} fill="#9AA5B1" {...O} strokeWidth={5} />
    <g transform={`translate(130,-110) rotate(${-barUp * 80})`}>
      <rect x={0} y={-12} width={420} height={24} rx={6} fill="#fff" {...O} strokeWidth={5} />
      {[40, 140, 240, 340].map((x) => <rect key={x} x={x} y={-12} width={50} height={24} fill={C.red} />)}
    </g>
    <rect x={120} y={-130} width={24} height={130} fill="#9AA5B1" {...O} strokeWidth={5} />
  </G>
);

export const Coffee: React.FC<P & {steam?: number; f?: number}> = ({steam = 1, f = 0, ...p}) => (
  <G {...p}>
    {steam > 0 && [-20, 10].map((x, i) => (
      <path key={x} d={`M ${x} -90 q ${12 * Math.sin(f / 8 + i)} -20 0 -40 q ${-12 * Math.sin(f / 8 + i)} -20 0 -40`} fill="none" stroke="#C9CED6" strokeWidth={7} strokeLinecap="round" opacity={0.8 * steam} />
    ))}
    <path d="M -56 -80 L 56 -80 L 44 60 Q 42 76 26 76 L -26 76 Q -42 76 -44 60 Z" fill="#fff" {...O} />
    <rect x={-60} y={-100} width={120} height={26} rx={8} fill="#8C5A33" {...O} strokeWidth={5} />
    <rect x={-50} y={-30} width={100} height={46} fill="#C98F5E" stroke={C.ink} strokeWidth={4} />
    <Text y={-6} size={26} color="#fff">$5</Text>
  </G>
);

export const Shop: React.FC<P & {name?: string}> = ({name = 'COFFEE', ...p}) => (
  <G {...p}>
    <rect x={-300} y={-420} width={600} height={420} fill="#F6E7D2" {...O} />
    <path d="M -330 -420 L 330 -420 L 300 -330 L -300 -330 Z" fill={C.red} {...O} />
    {[-240, -120, 0, 120, 240].map((x) => <path key={x} d={`M ${x - 60} -330 Q ${x} -290 ${x + 60} -330`} fill="#fff" stroke={C.ink} strokeWidth={5} />)}
    <rect x={-240} y={-470} width={480} height={56} rx={10} fill={C.ink} />
    <Text y={-442} size={38} color={C.yellow} ls={8}>{name}</Text>
    <rect x={-260} y={-260} width={300} height={180} rx={8} fill="#CFE8F5" {...O} strokeWidth={5} />
    <rect x={90} y={-230} width={140} height={230} rx={8} fill="#8C5A33" {...O} strokeWidth={5} />
    <circle cx={200} cy={-110} r={7} fill={C.gold} />
  </G>
);

export const Terminal: React.FC<P & {text?: string; ok?: number}> = ({text = '$5.00', ok = 0, ...p}) => (
  <G {...p}>
    <rect x={-80} y={-130} width={160} height={260} rx={24} fill="#2E3440" {...O} />
    <rect x={-60} y={-106} width={120} height={80} rx={8} fill={ok > 0.5 ? '#C8F5D8' : '#E6F0F5'} />
    <Text y={-66} size={32} color={ok > 0.5 ? C.green : C.ink}>{ok > 0.5 ? '✓' : text}</Text>
    {Array.from({length: 9}).map((_, i) => <rect key={i} x={-50 + (i % 3) * 38} y={0 + Math.floor(i / 3) * 34} width={26} height={22} rx={5} fill="#56606B" />)}
    <path d="M 100 -60 q 20 20 0 40 M 120 -76 q 36 36 0 72" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" opacity={ok > 0 && ok < 1 ? 1 : 0} />
  </G>
);

export const PriceTag: React.FC<P & {text: string; color?: string}> = ({text, color = C.yellow, ...p}) => (
  <G {...p}>
    <path d="M -110 -46 L 70 -46 L 120 0 L 70 46 L -110 46 Z" fill={color} {...O} />
    <circle cx={70} cy={0} r={10} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <Text x={-24} y={3} size={48}>{text}</Text>
  </G>
);

export const Fridge: React.FC<P & {broken?: number; f?: number}> = ({broken = 0, f = 0, ...p}) => (
  <G {...p} r={(p.r ?? 0) + broken * Math.sin(f * 1.5) * 2}>
    <rect x={-110} y={-400} width={220} height={400} rx={20} fill="#E8EEF2" {...O} />
    <line x1={-110} y1={-260} x2={110} y2={-260} stroke={C.ink} strokeWidth={6} />
    <rect x={70} y={-360} width={14} height={70} rx={6} fill="#9AA5B1" stroke={C.ink} strokeWidth={4} />
    <rect x={70} y={-230} width={14} height={90} rx={6} fill="#9AA5B1" stroke={C.ink} strokeWidth={4} />
    {broken > 0 && (
      <g opacity={broken}>
        <path d="M -60 -140 L -20 -100 L -50 -60 L -10 -20" fill="none" stroke={C.ink} strokeWidth={6} />
        <path d="M 20 -330 l 20 -30 l 10 22 l 20 -34" fill="none" stroke={C.yellow} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={-70} cy={-300} r={8} fill="#8ECDF2" />
        <circle cx={-40} cy={20} r={20} fill="#8ECDF2" opacity={0.6} />
      </g>
    )}
  </G>
);

export const Bathtub: React.FC<P & {level: number; f: number; spoon?: number}> = ({level, f, spoon = 0, ...p}) => (
  <G {...p}>
    <rect x={250} y={-360} width={26} height={120} fill="#9AA5B1" {...O} strokeWidth={5} />
    <path d="M 276 -350 L 200 -350 L 200 -310" fill="none" stroke="#9AA5B1" strokeWidth={24} strokeLinecap="round" />
    <path d="M 276 -350 L 200 -350 L 200 -310" fill="none" stroke={C.ink} strokeWidth={4} opacity={0} />
    <rect x={180} y={-316} width={40} height={16} rx={6} fill="#9AA5B1" {...O} strokeWidth={4} />
    {Array.from({length: 6}).map((_, i) => <rect key={i} x={193 + (i % 2) * 6} y={-300 + ((f * 6 + i * 30) % 200)} width={8} height={24} rx={4} fill="#6EC3F0" />)}
    <clipPath id="tubclip"><path d="M -300 -220 L 300 -220 L 270 40 Q 260 80 220 80 L -220 80 Q -260 80 -270 40 Z" /></clipPath>
    <g clipPath="url(#tubclip)">
      <rect x={-320} y={80 - 300 * level} width={640} height={400} fill="#8FD3F5" />
      <path d={`M -320 ${80 - 300 * level} q 40 ${-8 + Math.sin(f / 6) * 4} 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0`} fill="#B8E6FA" stroke="#fff" strokeWidth={4} />
    </g>
    <path d="M -300 -220 L 300 -220 L 270 40 Q 260 80 220 80 L -220 80 Q -260 80 -270 40 Z" fill="none" {...O} strokeWidth={8} />
    <rect x={-320} y={-236} width={640} height={24} rx={12} fill="#fff" {...O} />
    <path d="M -220 80 L -230 120 M 220 80 L 230 120" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    {spoon > 0 && (
      <g transform={`translate(${-120},${-260 + Math.sin(f / 4) * 30}) rotate(${-30 + Math.sin(f / 4) * 20})`}>
        <rect x={-6} y={-120} width={12} height={110} rx={6} fill="#C9D1DA" stroke={C.ink} strokeWidth={4} />
        <ellipse cx={0} cy={0} rx={22} ry={30} fill="#C9D1DA" stroke={C.ink} strokeWidth={4} />
      </g>
    )}
  </G>
);

export const Ticket: React.FC<P & {text?: string}> = ({text = 'BASKETBALL', ...p}) => (
  <G {...p}>
    <path d="M -150 -70 L 150 -70 L 150 -24 Q 128 0 150 24 L 150 70 L -150 70 L -150 24 Q -128 0 -150 -24 Z" fill="#FFB86B" {...O} />
    <circle cx={-96} cy={0} r={36} fill="#F28C28" stroke={C.ink} strokeWidth={4} />
    <path d="M -132 0 L -60 0 M -96 -36 L -96 36 M -122 -24 Q -96 0 -122 24 M -70 -24 Q -96 0 -70 24" fill="none" stroke={C.ink} strokeWidth={3} />
    <Text x={40} y={-14} size={26}>{text}</Text>
    <Text x={40} y={22} size={24} color="#8C5A33">ADMIT ONE</Text>
  </G>
);

export const Plane: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -140 0 Q -120 -24 60 -20 L 140 -6 Q 160 0 140 6 L 60 20 Q -120 24 -140 0 Z" fill="#fff" {...O} />
    <path d="M -10 -18 L -60 -90 L -20 -90 L 50 -18 Z M -10 18 L -60 90 L -20 90 L 50 18 Z" fill="#DDE3E9" {...O} strokeWidth={5} />
    <path d="M -130 -6 L -150 -50 L -118 -50 L -100 -12 Z" fill="#DDE3E9" {...O} strokeWidth={5} />
    {[0, 30, 60].map((x) => <circle key={x} cx={x - 40} cy={-4} r={6} fill="#8FD3F5" stroke={C.ink} strokeWidth={3} />)}
  </G>
);

export const Atm: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-120} y={-300} width={240} height={300} rx={14} fill="#C9D1DA" {...O} />
    <rect x={-120} y={-340} width={240} height={50} rx={10} fill={C.navy} {...O} strokeWidth={5} />
    <Text y={-314} size={32} color="#fff" ls={6}>ATM</Text>
    <rect x={-80} y={-260} width={160} height={100} rx={8} fill="#E6F0F5" {...O} strokeWidth={4} />
    <rect x={-70} y={-120} width={140} height={14} rx={6} fill={C.ink} />
  </G>
);

export const HospitalBill: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-110} y={-150} width={220} height={300} rx={8} fill="#fff" {...O} />
    <rect x={-20} y={-126} width={40} height={40} fill={C.red} />
    <rect x={-6} y={-138} width={12} height={64} fill={C.red} />
    <rect x={-32} y={-112} width={64} height={12} fill={C.red} />
    {[-40, -10, 20].map((y) => <rect key={y} x={-80} y={y} width={160} height={10} rx={5} fill="#E3E8EE" />)}
    <Text y={100} size={40} color={C.red}>$4,800</Text>
  </G>
);

export const PieSplit: React.FC<P & {t: number}> = ({t, ...p}) => {
  const slices = [
    {v: 0.7, c: C.navy, l: 'Card bank'},
    {v: 0.12, c: C.blue, l: 'Visa/MC'},
    {v: 0.18, c: '#9AA5B1', l: 'Processor'},
  ];
  let a0 = -Math.PI / 2;
  return (
    <G {...p}>
      {slices.map((s, i) => {
        const a1 = a0 + s.v * Math.PI * 2 * t;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M 0 0 L ${Math.cos(a0) * 160} ${Math.sin(a0) * 160} A 160 160 0 ${large} 1 ${Math.cos(a1) * 160} ${Math.sin(a1) * 160} Z`;
        const mid = (a0 + a1) / 2;
        const el = (
          <g key={i}>
            <path d={d} fill={s.c} stroke={C.ink} strokeWidth={5} />
            {t > 0.95 && <Text x={Math.cos(mid) * 250} y={Math.sin(mid) * 220} size={30} font={FONT}>{s.l}</Text>}
          </g>
        );
        a0 = a1;
        return el;
      })}
    </G>
  );
};

export const SourceCard: React.FC<P & {org: string; sub: string; title: string[]; stat: string; statLabel?: string; color?: string}> = ({org, sub, title, stat, statLabel, color = C.navy, ...p}) => (
  <G {...p}>
    <rect x={-380 + 14} y={-260 + 16} width={760} height={520} rx={18} fill="rgba(35,35,43,0.14)" />
    <rect x={-380} y={-260} width={760} height={520} rx={18} fill="#fff" {...O} />
    <path d="M -380 -242 Q -380 -260 -362 -260 L 362 -260 Q 380 -260 380 -242 L 380 -170 L -380 -170 Z" fill={color} {...O} />
    <Text y={-228} size={Math.min(34, 1300 / org.length)} color="#fff" ls={5}>{org}</Text>
    <Text y={-190} size={22} color="#C9D6E6" weight={500} ls={3}>{sub}</Text>
    {title.map((t, i) => <Text key={i} y={-110 + i * 46} size={38}>{t}</Text>)}
    <Text y={80} size={stat.length > 10 ? 72 : 96} color={C.red}>{stat}</Text>
    {statLabel && <Text y={170} size={32} color="#5B6470" weight={500}>{statLabel}</Text>}
  </G>
);

export const SplitBar: React.FC<P & {a: number; la: string; lb: string; ca?: string; cb?: string; w?: number; t?: number}> = ({a, la, lb, ca = C.red, cb = C.green, w = 1100, t = 1, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-50} width={w} height={100} rx={20} fill="#E8E1D2" {...O} />
    <rect x={-w / 2} y={-50} width={w * a * t} height={100} rx={20} fill={ca} {...O} />
    {t >= 1 && <rect x={-w / 2 + w * a} y={-50} width={w * (1 - a)} height={100} rx={0} fill={cb} {...O} />}
    <Text x={-w / 2 + (w * a) / 2} y={100} size={40} color={ca}>{la}</Text>
    {t >= 1 && <Text x={-w / 2 + w * a + (w * (1 - a)) / 2 + 40} y={100} size={40} color={cb}>{lb}</Text>}
  </G>
);

export const Person: React.FC<P & {c?: string}> = ({c = C.ink, ...p}) => (
  <G {...p}>
    <circle cx={0} cy={-60} r={26} fill={c} />
    <path d="M -40 40 Q -40 -26 0 -26 Q 40 -26 40 40 Z" fill={c} />
  </G>
);

export const Plate: React.FC<P & {label: string; big?: boolean}> = ({label, big, children, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={30} rx={big ? 230 : 150} ry={big ? 60 : 40} fill="#fff" {...O} />
    <ellipse cx={0} cy={26} rx={big ? 170 : 110} ry={big ? 40 : 26} fill="none" stroke="#DDE3E9" strokeWidth={5} />
    {children}
    <Text y={big ? 140 : 110} size={38} color="#5B6470">{label}</Text>
  </G>
);

export const Bush: React.FC<P> = (p) => (
  <G {...p}>
    {[[-90, 0, 80], [0, -40, 100], [90, 0, 80], [0, 20, 90]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#5DBB63" {...O} />)}
    {[[-90, 0, 76], [0, -40, 96], [90, 0, 76], [0, 20, 86]].map(([x, y, r], i) => <circle key={`i${i}`} cx={x} cy={y} r={r} fill="#5DBB63" />)}
  </G>
);

export const Handwritten: React.FC<{x: number; y: number; size?: number; color?: string; r?: number; children: React.ReactNode}> = ({x, y, size = 48, color = C.ink, r = 0, children}) => (
  <text x={x} y={y} transform={`rotate(${r},${x},${y})`} fontFamily={HAND} fontWeight={700} fontSize={size} fill={color} textAnchor="middle" dominantBaseline="middle">{children}</text>
);
