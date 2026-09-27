import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const BLUE_B = '#2F80ED';
export const GREEN_B = '#34C759';

export const Handset: React.FC<P & {body?: string; screen?: string; cracked?: boolean; cam?: number}> = ({body = '#2E3440', screen = '#F7FAFD', cracked, cam = 0, children, ...p}) => (
  <G {...p}>
    <rect x={-130} y={-250} width={260} height={500} rx={40} fill={body} {...O} />
    <rect x={-112} y={-226} width={224} height={452} rx={24} fill={screen} />
    <rect x={-40} y={-236} width={80} height={16} rx={8} fill={C.ink} />
    {cam > 0 && <circle cx={0} cy={-228} r={10 + 18 * cam} fill="none" stroke={C.yellow} strokeWidth={6} opacity={cam} />}
    {children}
    {cracked && <path d="M -100 -170 L -30 -90 L -60 -20 L 20 40 L -10 120 M -30 -90 L 60 -120 M 20 40 L 90 60" fill="none" stroke="#9AA5B1" strokeWidth={5} strokeLinecap="round" />}
  </G>
);

export const Garden: React.FC<P & {wall?: number; gate?: number; f?: number}> = ({wall = 1, gate = 1, f = 0, ...p}) => {
  const wh = 170 * wall;
  const bricks = (x0: number, w: number) => {
    const out: React.ReactNode[] = [];
    const rows = Math.max(1, Math.round(wh / 42));
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < Math.ceil(w / 90) + 1; c++) {
        const bx = x0 + c * 90 - (r % 2 ? 45 : 0);
        if (bx + 90 < x0 || bx > x0 + w) continue;
        out.push(<rect key={`${x0}-${r}-${c}`} x={Math.max(bx, x0)} y={-wh + r * (wh / rows)} width={Math.min(90, x0 + w - Math.max(bx, x0))} height={wh / rows} fill="#D9774B" stroke="#7A3B22" strokeWidth={3} />);
      }
    return out;
  };
  return (
    <G {...p}>
      <ellipse cx={0} cy={-80} rx={700} ry={140} fill="#9EDDB0" {...O} />
      {[-460, -200, 220, 470].map((x, i) => (
        <g key={x} transform={`translate(${x},${-160 - (i % 2) * 30}) rotate(${Math.sin(f / 20 + i) * 2})`}>
          <rect x={-14} y={-10} width={28} height={110} fill="#8C5A33" {...O} strokeWidth={5} />
          <circle cx={0} cy={-70} r={90} fill={C.green} {...O} />
          <circle cx={-30} cy={-90} r={12} fill={C.red} stroke={C.ink} strokeWidth={3} />
          <circle cx={30} cy={-50} r={12} fill={C.red} stroke={C.ink} strokeWidth={3} />
        </g>
      ))}
      {[-560, -330, -80, 90, 330, 580].map((x, i) => (
        <g key={x} transform={`translate(${x},-60)`}>
          <line x1={0} y1={0} x2={0} y2={-40} stroke="#2F6D38" strokeWidth={5} />
          {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 12} cy={-44 + Math.sin((a * Math.PI) / 180) * 12} r={10} fill={[C.yellow, C.red, '#B983FF'][i % 3]} stroke={C.ink} strokeWidth={2} />)}
        </g>
      ))}
      {bricks(-760, 640)}
      {bricks(120, 640)}
      <rect x={-760} y={-wh} width={640} height={wh} fill="none" {...O} />
      <rect x={120} y={-wh} width={640} height={wh} fill="none" {...O} />
      <path d={`M -120 0 L -120 ${-wh - 40} Q 0 ${-wh - 130} 120 ${-wh - 40} L 120 0`} fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
      <g transform={`translate(-116,0) scale(${1 - 0.8 * gate},1)`}>
        <rect x={0} y={-wh - 20} width={116} height={wh + 20} fill="#C9CED6" stroke={C.ink} strokeWidth={4} opacity={0.9} />
        {[20, 50, 80].map((x) => <line key={x} x1={x} y1={-wh - 10} x2={x} y2={0} stroke={C.ink} strokeWidth={5} />)}
      </g>
      <g transform={`translate(116,0) scale(${-(1 - 0.8 * gate)},1)`}>
        <rect x={0} y={-wh - 20} width={116} height={wh + 20} fill="#C9CED6" stroke={C.ink} strokeWidth={4} opacity={0.9} />
        {[20, 50, 80].map((x) => <line key={x} x1={x} y1={-wh - 10} x2={x} y2={0} stroke={C.ink} strokeWidth={5} />)}
      </g>
    </G>
  );
};

export const Popcorn: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    {[-60, -20, 20, 60, -40, 0, 40].map((x, i) => <circle key={i} cx={x} cy={-130 - (i > 3 ? 40 : 0)} r={36} fill="#FFF6D8" {...O} strokeWidth={4} />)}
    <path d="M -110 -120 L 110 -120 L 80 120 L -80 120 Z" fill="#fff" {...O} />
    {[-70, -20, 30].map((x) => <path key={x} d={`M ${x} -120 L ${x + 20} -120 L ${x + 16} 120 L ${x - 4} 120 Z`} fill={C.red} />)}
    <path d="M -110 -120 L 110 -120 L 80 120 L -80 120 Z" fill="none" {...O} />
    {label && <Text y={180} size={40}>{label}</Text>}
  </G>
);

export const Cheque: React.FC<P & {to?: string; amount: string; memo?: string; from?: string}> = ({to = 'APPLE', amount, memo = '', from = 'GOOGLE', ...p}) => (
  <G {...p}>
    <rect x={-470 + 12} y={-200 + 14} width={940} height={400} rx={20} fill="rgba(35,35,43,0.14)" />
    <rect x={-470} y={-200} width={940} height={400} rx={20} fill="#E8F6EE" {...O} />
    <Text x={-420} y={-140} size={36} anchor="start" color="#5B6470">FROM: {from}</Text>
    <Text x={420} y={-140} size={32} anchor="end" color="#5B6470">{memo}</Text>
    <Text x={-420} y={-50} size={44} anchor="start">PAY TO: {to}</Text>
    <rect x={-420} y={10} width={840} height={110} rx={14} fill="#fff" {...O} strokeWidth={5} />
    <Text y={66} size={amount.length > 12 ? 64 : 84} color={C.green}>{amount}</Text>
    <path d="M 160 170 Q 200 140 230 170 T 300 165 T 380 160" fill="none" stroke={C.navy} strokeWidth={5} strokeLinecap="round" />
  </G>
);

export const Door: React.FC<P & {open?: number; mat?: string}> = ({open = 0, mat, ...p}) => (
  <G {...p}>
    <rect x={-150} y={-440} width={300} height={440} fill="#23232B" {...O} />
    <rect x={-150} y={-440} width={300} height={440} fill="#FFE8A3" opacity={open} />
    <g transform={`translate(-150,0) scale(${1 - 0.75 * open},1)`}>
      <rect x={0} y={-440} width={300} height={440} fill={C.wood} {...O} />
      <circle cx={250} cy={-220} r={14} fill={C.gold} stroke={C.ink} strokeWidth={4} />
    </g>
    <rect x={-170} y={-460} width={340} height={20} fill="#fff" {...O} strokeWidth={5} />
    {mat && (
      <g>
        <path d="M -190 20 L 190 20 L 230 90 L -230 90 Z" fill="#C98F5E" {...O} />
        <Text y={56} size={34} color="#fff" stroke={C.ink} sw={4}>{mat}</Text>
      </g>
    )}
  </G>
);

export const Bucket: React.FC<P & {level?: number; f?: number; drip?: boolean; label?: string}> = ({level = 0.3, f = 0, drip = true, label, ...p}) => (
  <G {...p}>
    <path d="M -150 -120 L 150 -120 L 120 140 L -120 140 Z" fill="#fff" {...O} />
    <clipPath id="bk26"><path d="M -150 -120 L 150 -120 L 120 140 L -120 140 Z" /></clipPath>
    <rect x={-160} y={140 - 260 * level} width={320} height={260 * level} fill={C.gold} clipPath="url(#bk26)" />
    <path d="M -150 -120 L 150 -120 L 120 140 L -120 140 Z" fill="none" {...O} />
    <path d="M -150 -120 Q 0 -300 150 -120" fill="none" stroke={C.ink} strokeWidth={6} />
    {drip && [0, 1, 2].map((i) => {
      const t = ((f + i * 10) % 30) / 30;
      return <path key={i} d="M 0 -18 Q 12 0 0 8 Q -12 0 0 -18 Z" transform={`translate(${-40 + i * 40},${-380 + t * 260})`} fill={C.gold} stroke={C.ink} strokeWidth={3} opacity={1 - t * 0.3} />;
    })}
    {label && <Text y={200} size={40}>{label}</Text>}
  </G>
);

export const Gavel: React.FC<P & {hit?: number}> = ({hit = 0, ...p}) => (
  <G {...p}>
    <rect x={-120} y={40} width={240} height={40} rx={10} fill={C.woodDark} {...O} />
    <g transform={`rotate(${-30 + hit * 30},60,20)`}>
      <rect x={-80} y={-60} width={140} height={70} rx={14} fill={C.wood} {...O} />
      <rect x={50} y={-34} width={170} height={20} rx={8} fill={C.woodDark} {...O} strokeWidth={5} />
    </g>
  </G>
);

export const Earbuds: React.FC<P> = (p) => (
  <G {...p}>
    {[-1, 1].map((k) => (
      <g key={k} transform={`translate(${k * 60},0) scale(${k},1)`}>
        <ellipse cx={0} cy={-40} rx={34} ry={40} fill="#fff" {...O} />
        <rect x={-14} y={-10} width={28} height={110} rx={14} fill="#fff" {...O} />
      </g>
    ))}
  </G>
);

export const Watch: React.FC<P & {face?: string}> = ({face = '12:00', ...p}) => (
  <G {...p}>
    <rect x={-50} y={-170} width={100} height={340} rx={30} fill={C.navy} {...O} />
    <rect x={-90} y={-100} width={180} height={200} rx={44} fill="#2E3440" {...O} />
    <rect x={-74} y={-84} width={148} height={168} rx={32} fill="#11151C" />
    <Text y={4} size={40} color="#6EF0A8">{face}</Text>
    <rect x={90} y={-30} width={16} height={40} rx={6} fill="#9AA5B1" stroke={C.ink} strokeWidth={3} />
  </G>
);

export const Laptop: React.FC<P & {screen?: string}> = ({screen = '#DDEBF7', ...p}) => (
  <G {...p}>
    <rect x={-200} y={-240} width={400} height={250} rx={18} fill="#9AA5B1" {...O} />
    <rect x={-180} y={-222} width={360} height={214} rx={8} fill={screen} />
    <path d="M -250 10 L 250 10 L 230 44 L -230 44 Z" fill="#C9CED6" {...O} />
  </G>
);

export const CloudBox: React.FC<P & {label?: string; color?: string}> = ({label = 'CLOUD', color = '#fff', ...p}) => (
  <G {...p}>
    <path d="M -160 60 Q -230 60 -220 0 Q -210 -60 -140 -50 Q -120 -130 -30 -120 Q 40 -170 100 -100 Q 190 -110 190 -20 Q 240 20 200 60 Z" fill={color} {...O} />
    <Text y={0} size={44}>{label}</Text>
  </G>
);

export const ChatBubble: React.FC<P & {w?: number; color?: string; right?: boolean; text?: string}> = ({w = 300, color = BLUE_B, right, text = '', ...p}) => (
  <G {...p}>
    <rect x={right ? -w : 0} y={-36} width={w} height={72} rx={36} fill={color} {...O} strokeWidth={4} />
    <Text x={right ? -w / 2 : w / 2} y={2} size={32} color="#fff">{text}</Text>
  </G>
);

export const Cage: React.FC<P & {gold?: boolean}> = ({gold = true, ...p}) => (
  <G {...p}>
    <path d="M -170 0 L -170 -260 Q 0 -420 170 -260 L 170 0 Z" fill="rgba(255,209,102,0.15)" {...O} />
    {[-120, -60, 0, 60, 120].map((x) => <line key={x} x1={x} y1={0} x2={x} y2={x === 0 ? -340 : -280 - (120 - Math.abs(x)) * 0.4} stroke={gold ? C.gold : C.gray} strokeWidth={10} />)}
    <rect x={-190} y={-10} width={380} height={30} rx={8} fill={gold ? C.gold : C.gray} {...O} />
    <circle cx={0} cy={-360} r={20} fill="none" stroke={gold ? C.gold : C.gray} strokeWidth={10} />
  </G>
);

export const Report10K: React.FC<P & {hl?: number}> = ({hl = 0, ...p}) => (
  <G {...p}>
    <rect x={-300 + 14} y={-380 + 16} width={600} height={760} rx={16} fill="rgba(35,35,43,0.14)" />
    <rect x={-300} y={-380} width={600} height={760} rx={16} fill="#fff" {...O} />
    <rect x={-300} y={-380} width={600} height={130} rx={16} fill={C.navy} {...O} />
    <Text y={-340} size={34} color="#fff" ls={4}>FORM 10-K</Text>
    <Text y={-285} size={26} color="#C9D6E6">annual report · fiscal 2025</Text>
    <Text y={-190} size={48}>APPLE INC.</Text>
    {[-110, -60, -10, 40, 90, 140, 190, 240, 290].map((y, i) => (
      <g key={y}>
        {i === 3 && hl > 0 && <rect x={-250} y={y - 20} width={500 * hl} height={40} rx={6} fill={C.yellow} opacity={0.85} />}
        <line x1={-230} x2={i % 3 === 2 ? 120 : 230} y1={y} y2={y} stroke="#C9CED6" strokeWidth={12} strokeLinecap="round" />
      </g>
    ))}
  </G>
);

export const Bundle: React.FC<P & {title?: string; price?: string}> = ({title = 'BUNDLE', price = '', ...p}) => (
  <G {...p}>
    <rect x={-230} y={-160} width={460} height={320} rx={30} fill={C.navy} {...O} />
    <Text y={-100} size={46} color="#fff" ls={3}>{title}</Text>
    {['MUSIC', 'TV', 'ARCADE', 'iCLOUD+'].map((l, i) => (
      <g key={l} transform={`translate(${-150 + (i % 2) * 300 * 0.5 + (i % 2) * 150},${-20 + Math.floor(i / 2) * 70})`}>
        <rect x={-90} y={-26} width={180} height={52} rx={26} fill="#fff" stroke={C.ink} strokeWidth={4} />
        <Text size={26}>{l}</Text>
      </g>
    ))}
    {price && <Text y={130} size={40} color={C.yellow}>{price}</Text>}
  </G>
);

export const TopHat: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-70} y={-10} width={140} height={20} rx={8} fill={C.ink} />
    <rect x={-44} y={-100} width={88} height={96} rx={6} fill={C.ink} />
    <rect x={-44} y={-34} width={88} height={16} fill={C.red} />
  </G>
);

export const AppTile: React.FC<P & {color?: string; label?: string}> = ({color = C.blue, label = 'A', ...p}) => (
  <G {...p}>
    <rect x={-60} y={-60} width={120} height={120} rx={30} fill={color} {...O} strokeWidth={5} />
    <Text y={4} size={56} color="#fff">{label}</Text>
  </G>
);
