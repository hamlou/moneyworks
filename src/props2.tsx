import React from 'react';
import {C, FONT, HAND} from './theme';
import {G, Text, Bill, Coin} from './props';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};

export const OldCar: React.FC<P & {f: number; shake?: number; sag?: number}> = ({f, shake = 0, sag = 0, ...p}) => {
  const jx = shake ? Math.sin(f * 2.1) * 5 * shake : 0;
  const jy = shake ? Math.cos(f * 2.7) * 4 * shake : 0;
  return (
    <G {...p}>
      <ellipse cx={0} cy={50} rx={170} ry={12} fill="rgba(35,35,43,0.12)" />
      <g transform={`translate(${jx},${jy}) rotate(${sag * 4})`}>
        <path d="M -150 30 L -150 -14 Q -148 -30 -128 -34 L -90 -40 L -60 -92 Q -52 -102 -36 -102 L 60 -102 Q 76 -102 84 -92 L 112 -40 L 134 -36 Q 152 -32 152 -12 L 152 30 Z" fill="#A89880" {...O} />
        <path d="M -48 -86 L 8 -86 L 8 -48 L -74 -48 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
        <path d="M 22 -86 L 62 -86 L 92 -48 L 22 -48 Z" fill="#DDE7EC" {...O} strokeWidth={4.5} />
        <path d="M -30 -80 L -10 -60 M 40 -84 L 52 -62" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
        <circle cx={-110} cy={-6} r={10} fill="#8A5A3B" opacity={0.8} />
        <circle cx={70} cy={4} r={14} fill="#8A5A3B" opacity={0.8} />
        <circle cx={10} cy={-10} r={7} fill="#8A5A3B" opacity={0.8} />
        <rect x={-162} y={10} width={30} height={12} rx={4} fill="#777" {...O} strokeWidth={4} />
        <circle cx={140} cy={-18} r={8} fill="#E8D9A0" stroke={C.ink} strokeWidth={3} />
      </g>
      <circle cx={-90} cy={32} r={30} fill={C.ink} />
      <circle cx={-90} cy={32} r={12} fill="#bbb" />
      <circle cx={96} cy={32 + sag * 12} r={30} fill={C.ink} />
      <circle cx={96} cy={32 + sag * 12} r={12} fill="#bbb" />
    </G>
  );
};

export const Phone: React.FC<P & {title?: string; value: string; color?: string}> = ({title = 'MY BANK', value, color = C.ink, ...p}) => (
  <G {...p}>
    <rect x={-120} y={-220} width={240} height={440} rx={34} fill="#2E3440" {...O} />
    <rect x={-104} y={-196} width={208} height={380} rx={16} fill="#F7FAFD" />
    <rect x={-104} y={-196} width={208} height={64} rx={16} fill={C.navy} />
    <rect x={-104} y={-150} width={208} height={18} fill={C.navy} />
    <Text y={-162} size={24} color="#fff" ls={3}>{title}</Text>
    <Text y={-90} size={22} color="#7B8794" weight={500}>Balance</Text>
    <Text y={-30} size={value.length > 7 ? 46 : 64} color={color}>{value}</Text>
    <rect x={-80} y={40} width={160} height={16} rx={8} fill="#E3E8EE" />
    <rect x={-80} y={72} width={120} height={16} rx={8} fill="#E3E8EE" />
    <rect x={-80} y={104} width={140} height={16} rx={8} fill="#E3E8EE" />
    <rect x={-30} y={196} width={60} height={8} rx={4} fill="#555" />
  </G>
);

export const Coupon: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -130 -60 L 130 -60 L 130 -20 Q 110 0 130 20 L 130 60 L -130 60 L -130 20 Q -110 0 -130 -20 Z" fill="#FFE8A3" {...O} strokeWidth={5} />
    <line x1={-60} y1={-54} x2={-60} y2={54} stroke={C.ink} strokeWidth={3} strokeDasharray="8 8" />
    <g transform="translate(-96,4)">
      <path d="M -22 -6 L 22 -6 L 16 36 L -16 36 Z" fill={C.red} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      {[-14, -5, 4, 13].map((x, i) => <rect key={x} x={x - 3} y={-34 + (i % 2) * 6} width={7} height={32} rx={3} fill={C.yellow} stroke={C.ink} strokeWidth={3} />)}
    </g>
    <Text x={34} y={-16} size={30} font={FONT}>FREE</Text>
    <Text x={34} y={22} size={30}>FRIES</Text>
  </G>
);

export const Printer: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-60} y={-110} width={120} height={60} fill="#fff" {...O} strokeWidth={5} />
    <rect x={-110} y={-60} width={220} height={110} rx={16} fill="#C9D1DA" {...O} />
    <rect x={-70} y={30} width={140} height={60} fill="#fff" {...O} strokeWidth={5} />
    <Bill y={60} s={0.7} />
    <circle cx={80} cy={-30} r={8} fill={C.green} />
  </G>
);

export const GoldBar: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -90 40 L -60 -30 L 60 -30 L 90 40 Z" fill={C.gold} {...O} />
    <path d="M -60 -30 L -44 -10 L 44 -10 L 60 -30" fill="none" stroke="#E0A91F" strokeWidth={4} />
    <Text y={14} size={26} color="#B7830F">GOLD</Text>
  </G>
);

export const BigButton: React.FC<P & {press: number; label?: string}> = ({press, label = '$', ...p}) => (
  <G {...p}>
    <rect x={-110} y={-10} width={220} height={60} rx={14} fill="#56606B" {...O} />
    <ellipse cx={0} cy={-10 + press * 18} rx={80} ry={28} fill="#B3263F" stroke={C.ink} strokeWidth={6} />
    <path d={`M -80 ${-10 + press * 18} L -80 ${-40 + press * 18} A 80 28 0 0 1 80 ${-40 + press * 18} L 80 ${-10 + press * 18}`} fill={C.red} stroke={C.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-40 + press * 18} rx={80} ry={28} fill={C.red} stroke={C.ink} strokeWidth={6} />
    <Text y={-40 + press * 18} size={36} color="#fff">{label}</Text>
  </G>
);

export const Chest: React.FC<P & {open: number}> = ({open, children, ...p}) => (
  <G {...p}>
    <rect x={-130} y={-40} width={260} height={130} rx={10} fill="#B07A4B" {...O} />
    <rect x={-130} y={-40} width={260} height={24} fill="#8C5A33" {...O} strokeWidth={5} />
    <g>{children}</g>
    <g transform={`translate(0,-40) scale(1,${1 - open * 1.8}) translate(0,40)`}>
      <path d="M -130 -40 Q -130 -120 0 -120 Q 130 -120 130 -40 Z" fill="#C48A57" {...O} />
      <path d="M -10 -120 L -10 -40 M 10 -120 L 10 -40" stroke={C.gold} strokeWidth={8} />
    </g>
    <rect x={-22} y={-30} width={44} height={40} rx={6} fill={C.gold} {...O} strokeWidth={4} />
  </G>
);

export const Cushion: React.FC<P & {w?: number; label?: string}> = ({w = 520, label = 'CAPITAL', ...p}) => (
  <G {...p}>
    <path d={`M ${-w / 2} 0 Q ${-w / 2 - 30} -60 ${-w / 2 + 20} -80 Q 0 -110 ${w / 2 - 20} -80 Q ${w / 2 + 30} -60 ${w / 2} 0 Q 0 30 ${-w / 2} 0 Z`} fill="#8EC5FF" {...O} />
    <path d={`M ${-w / 2 + 40} -50 Q 0 -70 ${w / 2 - 40} -50`} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
    <Text y={-34} size={44} color={C.navy} ls={6}>{label}</Text>
  </G>
);

export const Dial: React.FC<P & {v: number; label?: string}> = ({v, label = 'INTEREST RATES', ...p}) => {
  const a = -80 + v * 160;
  return (
    <G {...p}>
      <path d="M -170 40 A 170 170 0 0 1 170 40 Z" fill="#fff" {...O} />
      <path d="M -150 30 A 150 150 0 0 1 -50 -112" fill="none" stroke={C.green} strokeWidth={22} />
      <path d="M -40 -118 A 150 150 0 0 1 40 -118" fill="none" stroke={C.yellow} strokeWidth={22} />
      <path d="M 50 -112 A 150 150 0 0 1 150 30" fill="none" stroke={C.red} strokeWidth={22} />
      <Text x={-120} y={70} size={30} color={C.green}>LOW</Text>
      <Text x={120} y={70} size={30} color={C.red}>HIGH</Text>
      <g transform={`rotate(${a})`}>
        <path d="M -10 0 L 0 -130 L 10 0 Z" fill={C.ink} />
      </g>
      <circle cx={0} cy={0} r={18} fill={C.ink} />
      <Text y={120} size={34} ls={3}>{label}</Text>
    </G>
  );
};

export const Shield: React.FC<P & {top?: string; big?: string}> = ({top = 'FDIC', big = '$250,000', ...p}) => (
  <G {...p}>
    <path d="M 0 -170 L 150 -120 L 140 20 Q 120 120 0 180 Q -120 120 -140 20 L -150 -120 Z" fill={C.blue} {...O} />
    <path d="M 0 -140 L 122 -100 L 114 16 Q 98 100 0 150 Q -98 100 -114 16 L -122 -100 Z" fill="none" stroke="#fff" strokeWidth={5} opacity={0.6} />
    <Text y={-70} size={56} color="#fff" ls={6}>{top}</Text>
    <Text y={10} size={52} color="#fff">{big}</Text>
    <Text y={66} size={24} color="#DCE9FF" weight={500}>per person, per bank</Text>
  </G>
);

export const Umbrella: React.FC<P> = (p) => (
  <G {...p}>
    <line x1={0} y1={-220} x2={20} y2={120} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M -200 -150 Q 0 -330 200 -150 Q 150 -175 100 -150 Q 50 -180 0 -150 Q -50 -180 -100 -150 Q -150 -175 -200 -150 Z" fill={C.red} {...O} />
    <path d="M -100 -150 Q -60 -260 0 -262 M 100 -150 Q 60 -260 0 -262" fill="none" stroke="#fff" strokeWidth={10} opacity={0.8} />
  </G>
);

export const Sun: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <g transform={`rotate(${f * 0.6})`}>
      {Array.from({length: 12}).map((_, i) => (
        <line key={i} x1={0} y1={-80} x2={0} y2={-112} stroke="#F4B400" strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 30})`} />
      ))}
    </g>
    <circle cx={0} cy={0} r={64} fill={C.yellow} stroke="#F4B400" strokeWidth={6} />
  </G>
);

export const Towel: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-190} y={-40} width={380} height={80} rx={10} fill="#fff" {...O} strokeWidth={5} />
    {[-130, -50, 30, 110].map((x) => <rect key={x} x={x} y={-40} width={40} height={80} fill={C.blue} opacity={0.85} />)}
  </G>
);

export const Envelope: React.FC<P & {label?: string}> = ({label = 'PRE-APPROVED!', ...p}) => (
  <G {...p}>
    <rect x={-100} y={-62} width={200} height={124} rx={8} fill="#fff" {...O} strokeWidth={5} />
    <path d="M -100 -62 L 0 10 L 100 -62" fill="none" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <g transform="rotate(-10) translate(0,30)">
      <rect x={-92} y={-18} width={184} height={36} rx={6} fill="#fff" stroke={C.red} strokeWidth={4} />
      <Text y={2} size={22} color={C.red} ls={1}>{label}</Text>
    </g>
  </G>
);

export const Mailbox: React.FC<P & {flag?: number}> = ({flag = 0, ...p}) => (
  <G {...p}>
    <rect x={-12} y={-20} width={24} height={200} fill="#8C5A33" {...O} strokeWidth={5} />
    <path d="M -110 -20 L -110 -110 Q -110 -170 0 -170 Q 110 -170 110 -110 L 110 -20 Z" fill={C.blue} {...O} />
    <g transform={`translate(110,-110) rotate(${-90 * flag})`}>
      <rect x={0} y={-8} width={70} height={16} fill={C.red} {...O} strokeWidth={4} />
      <rect x={52} y={-30} width={30} height={30} fill={C.red} {...O} strokeWidth={4} />
    </g>
  </G>
);

export const TornNote: React.FC<P & {t: number; text: string}> = ({t, text, ...p}) => {
  const d = t * 140;
  const half = (side: -1 | 1) => (
    <g transform={`translate(${side * d},${t * t * 200}) rotate(${side * t * 25})`}>
      <clipPath id={`tn${side}`}>
        <path d={side < 0 ? 'M -300 -200 L 10 -200 L -10 -100 L 15 0 L -12 100 L 8 200 L -300 200 Z' : 'M 300 -200 L 10 -200 L -10 -100 L 15 0 L -12 100 L 8 200 L 300 200 Z'} />
      </clipPath>
      <g clipPath={`url(#tn${side})`}>
        <rect x={-260} y={-160} width={520} height={320} rx={8} fill="#fff" {...O} strokeWidth={5} />
        {text.split('\n').map((ln, i, a) => (
          <Text key={i} y={(i - (a.length - 1) / 2) * 84 + 6} size={88} font={HAND} color={C.red}>{ln}</Text>
        ))}
      </g>
    </g>
  );
  return (
    <G {...p} o={(p.o ?? 1) * (1 - Math.max(0, t - 0.6) / 0.4)}>
      {half(-1)}
      {half(1)}
    </G>
  );
};

export const Chalkboard: React.FC<P & {lines: string[]}> = ({lines, ...p}) => (
  <G {...p}>
    <rect x={-330} y={-200} width={660} height={400} rx={10} fill="#8C5A33" {...O} />
    <rect x={-305} y={-175} width={610} height={350} fill="#2F4F3E" />
    {lines.map((l, i) => (
      <Text key={i} y={-90 + i * 90} size={60} font={HAND} color="#F2F2E8">{l}</Text>
    ))}
    <rect x={-80} y={200} width={160} height={14} rx={4} fill="#8C5A33" {...O} strokeWidth={4} />
  </G>
);

export const Magnifier: React.FC<P> = (p) => (
  <G {...p}>
    <line x1={60} y1={60} x2={150} y2={150} stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
    <line x1={60} y1={60} x2={150} y2={150} stroke="#8C5A33" strokeWidth={16} strokeLinecap="round" />
    <circle cx={0} cy={0} r={90} fill="rgba(200,230,255,0.45)" stroke={C.ink} strokeWidth={14} />
    <path d="M -50 -30 Q -40 -60 -10 -66" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
  </G>
);

export const Bar: React.FC<P & {h: number; w?: number; color: string; label: string; value: string}> = ({h, w = 220, color, label, value, ...p}) => (
  <G {...p}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={12} fill={color} {...O} />
    <Text y={-h - 44} size={52}>{value}</Text>
    <Text y={46} size={34} color="#5B6470">{label}</Text>
  </G>
);

export const Screen$: React.FC<P & {t: number}> = ({t, ...p}) => (
  <G {...p}>
    <g opacity={1 - t}>
      <Bill s={0.9} />
    </g>
    <g opacity={t} transform={`scale(${0.6 + 0.4 * t})`}>
      <rect x={-62} y={-44} width={124} height={88} rx={12} fill="#1F2A36" {...O} strokeWidth={5} />
      <Text y={2} size={40} color="#6EF0A8" font="monospace">$</Text>
    </g>
  </G>
);

export const Badge: React.FC<P & {n: number | string; color?: string; lit?: number}> = ({n, color = C.ink, lit = 1, ...p}) => (
  <G {...p}>
    <circle cx={0} cy={0} r={46} fill={lit > 0.5 ? color : '#CFC6B4'} {...O} />
    <Text y={3} size={54} color="#fff">{n}</Text>
  </G>
);

export const Row: React.FC<P & {n: number; text: string; lit: number; color?: string; w?: number}> = ({n, text, lit, color = C.green, w = 980, ...p}) => (
  <G {...p}>
    <rect x={-10} y={-56} width={w} height={112} rx={24} fill="#fff" {...O} opacity={0.35 + 0.65 * lit} />
    <Badge x={60} n={n} color={color} lit={lit} />
    <Text x={130} y={2} size={50} anchor="start" color={lit > 0.5 ? C.ink : '#9C9383'}>{text}</Text>
  </G>
);

export const Sign: React.FC<P & {text: string; color?: string}> = ({text, color = C.red, ...p}) => (
  <G {...p}>
    <line x1={-60} y1={-60} x2={0} y2={-110} stroke={C.ink} strokeWidth={5} />
    <line x1={60} y1={-60} x2={0} y2={-110} stroke={C.ink} strokeWidth={5} />
    <rect x={-text.length * 22 - 30} y={-60} width={text.length * 44 + 60} height={100} rx={12} fill={color} {...O} />
    <Text y={-8} size={64} color="#fff" ls={4}>{text}</Text>
  </G>
);

export const CreditCard: React.FC<P & {label?: string}> = ({label = 'DAVE', ...p}) => (
  <G {...p}>
    <rect x={-170} y={-106} width={340} height={212} rx={22} fill={C.navy} {...O} />
    <rect x={-170} y={-60} width={340} height={34} fill="#0F1B2D" />
    <rect x={-130} y={-10} width={60} height={46} rx={8} fill={C.gold} stroke={C.ink} strokeWidth={3} />
    <Text x={-130} y={70} size={26} color="#fff" anchor="start" ls={4}>•••• 4242</Text>
    <Text x={140} y={70} size={24} color="#C9D6E6" anchor="end">{label}</Text>
    <circle cx={100} cy={10} r={24} fill={C.red} opacity={0.9} />
    <circle cx={132} cy={10} r={24} fill={C.yellow} opacity={0.9} />
  </G>
);

export const SubButton: React.FC<P & {done: number}> = ({done, ...p}) => (
  <G {...p}>
    <rect x={-230} y={-60} width={460} height={120} rx={60} fill={done > 0.5 ? '#9AA5B1' : '#E62117'} {...O} />
    <Text y={3} size={56} color="#fff" ls={3}>{done > 0.5 ? 'SUBSCRIBED' : 'SUBSCRIBE'}</Text>
  </G>
);

export const Bell: React.FC<P & {f: number; ring: number}> = ({f, ring, ...p}) => (
  <G {...p} r={(p.r ?? 0) + Math.sin(f * 1.2) * 18 * ring}>
    <path d="M -50 30 Q -50 -60 0 -64 Q 50 -60 50 30 L 64 46 L -64 46 Z" fill={C.yellow} {...O} />
    <circle cx={0} cy={60} r={14} fill={C.yellow} {...O} strokeWidth={5} />
    <circle cx={0} cy={-72} r={9} fill={C.ink} />
  </G>
);

export const Clapper: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-110} y={-40} width={220} height={140} rx={8} fill="#2E3440" {...O} />
    <g transform="rotate(-14,-110,-40)">
      <rect x={-110} y={-80} width={220} height={40} fill="#fff" {...O} strokeWidth={5} />
      {[-90, -40, 10, 60].map((x) => <path key={x} d={`M ${x} -80 L ${x + 30} -80 L ${x + 10} -40 L ${x - 20} -40 Z`} fill={C.ink} />)}
    </g>
    <Text y={30} size={30} color="#fff">MOVIE</Text>
  </G>
);

export const MoneyMachine: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-160} width={300} height={260} rx={20} fill="#C9D1DA" {...O} />
    <rect x={-110} y={-120} width={220} height={90} rx={10} fill="#1F2A36" {...O} strokeWidth={5} />
    <Text y={-74} size={40} color="#6EF0A8" font="monospace">LOAN</Text>
    <g transform={`translate(-60,30) rotate(${f * 4})`}>
      {Array.from({length: 8}).map((_, i) => <rect key={i} x={-8} y={-44} width={16} height={20} fill="#9AA5B1" stroke={C.ink} strokeWidth={3} transform={`rotate(${i * 45})`} />)}
      <circle r={30} fill="#9AA5B1" stroke={C.ink} strokeWidth={5} />
    </g>
    <g transform={`translate(50,40) rotate(${-f * 5})`}>
      {Array.from({length: 6}).map((_, i) => <rect key={i} x={-7} y={-32} width={14} height={16} fill="#B8C2CC" stroke={C.ink} strokeWidth={3} transform={`rotate(${i * 60})`} />)}
      <circle r={20} fill="#B8C2CC" stroke={C.ink} strokeWidth={5} />
    </g>
    <rect x={150} y={20} width={60} height={30} fill="#9AA5B1" {...O} strokeWidth={5} />
    {[0, 1, 2].map((i) => {
      const t = ((f + i * 12) % 36) / 36;
      return <Coin key={i} x={210 + t * 120} y={34 - Math.sin(t * Math.PI) * 80 + t * 90} s={0.8} o={1 - t * 0.5} />;
    })}
  </G>
);

export const Frame: React.FC<P & {w: number; h: number; label?: string}> = ({w, h, label, children, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 10} y={-h / 2 + 12} width={w} height={h} rx={18} fill="rgba(35,35,43,0.12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="#fff" {...O} />
    {children}
    {label && <Text y={h / 2 - 40} size={34}>{label}</Text>}
  </G>
);

export const Icon: React.FC<P & {kind: 'briefcase' | 'house' | 'warning' | 'heart' | 'question' | 'check' | 'rulebook'}> = ({kind, ...p}) => (
  <G {...p}>
    {kind === 'briefcase' && (
      <g>
        <rect x={-70} y={-40} width={140} height={100} rx={12} fill="#8C5A33" {...O} />
        <path d="M -26 -40 L -26 -62 L 26 -62 L 26 -40" fill="none" stroke={C.ink} strokeWidth={6} />
        <rect x={-70} y={-4} width={140} height={10} fill="#6E4527" />
      </g>
    )}
    {kind === 'house' && (
      <g>
        <rect x={-70} y={-20} width={140} height={100} fill="#F4D6B8" {...O} />
        <path d="M -90 -14 L 0 -90 L 90 -14 Z" fill={C.red} {...O} />
        <rect x={-18} y={24} width={36} height={56} fill="#8C5A33" {...O} strokeWidth={4} />
      </g>
    )}
    {kind === 'warning' && (
      <g>
        <path d="M 0 -90 L 90 70 L -90 70 Z" fill={C.yellow} {...O} />
        <Text y={16} size={100}>!</Text>
      </g>
    )}
    {kind === 'heart' && <path d="M 0 70 Q -100 0 -70 -50 Q -40 -90 0 -44 Q 40 -90 70 -50 Q 100 0 0 70 Z" fill={C.red} {...O} />}
    {kind === 'question' && <Text size={170} color={C.blue} stroke={C.ink} sw={12}>?</Text>}
    {kind === 'check' && (
      <g>
        <circle r={60} fill={C.green} {...O} />
        <path d="M -28 2 L -6 24 L 30 -18" fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
    {kind === 'rulebook' && (
      <g>
        <rect x={-70} y={-90} width={140} height={180} rx={10} fill={C.navy} {...O} />
        <rect x={-50} y={-60} width={100} height={40} rx={6} fill="#fff" />
        <Text y={-40} size={26} color={C.navy}>RULES</Text>
        <line x1={-45} y1={10} x2={45} y2={10} stroke="#fff" strokeWidth={5} opacity={0.6} />
        <line x1={-45} y1={34} x2={30} y2={34} stroke="#fff" strokeWidth={5} opacity={0.6} />
      </g>
    )}
  </G>
);
