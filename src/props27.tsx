import React from 'react';
import {C, FONT} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const BOX = '#D9A15B';
export const PURPLE = '#8E6CD9';
export const ORANGE27 = '#F28C28';

export const Charger: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M 0 60 C 0 160 -160 140 -150 230 C -140 300 -40 300 -20 250" fill="none" stroke="#fff" strokeWidth={22} strokeLinecap="round" />
    <path d="M 0 60 C 0 160 -160 140 -150 230 C -140 300 -40 300 -20 250" fill="none" stroke={C.ink} strokeWidth={30} strokeLinecap="round" opacity={0.9} />
    <path d="M 0 60 C 0 160 -160 140 -150 230 C -140 300 -40 300 -20 250" fill="none" stroke="#F4F6F8" strokeWidth={18} strokeLinecap="round" />
    <rect x={-40} y={240} width={40} height={60} rx={8} fill="#F4F6F8" {...O} strokeWidth={5} transform="rotate(-30,-20,250)" />
    <rect x={-90} y={-110} width={180} height={170} rx={30} fill="#F4F6F8" {...O} />
    <rect x={-50} y={-160} width={18} height={56} rx={4} fill={C.gray} stroke={C.ink} strokeWidth={4} />
    <rect x={32} y={-160} width={18} height={56} rx={4} fill={C.gray} stroke={C.ink} strokeWidth={4} />
    <path d="M -10 -40 L 10 -40 L -4 -5 L 14 -5 L -12 30 L -4 2 L -20 2 Z" fill={C.yellow} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </G>
);

export const Parcel: React.FC<P & {label?: string; color?: string}> = ({label, color = BOX, ...p}) => (
  <G {...p}>
    <path d="M -130 -60 L 0 -110 L 130 -60 L 0 -10 Z" fill="#E8B878" {...O} />
    <path d="M -130 -60 L 0 -10 L 0 120 L -130 70 Z" fill={color} {...O} />
    <path d="M 130 -60 L 0 -10 L 0 120 L 130 70 Z" fill="#C88A45" {...O} />
    <path d="M -65 -85 L 65 -35" stroke="#F4E4C8" strokeWidth={16} />
    {label && <Text y={180} size={40}>{label}</Text>}
  </G>
);

export const SearchPage: React.FC<P & {query?: string; rows: {t: string; p: string; sp?: boolean}[]; tag?: number; hl?: number}> = ({query = 'phone charger', rows, tag = 0, hl = -1, ...p}) => (
  <G {...p}>
    <rect x={-420} y={-340} width={840} height={680} rx={30} fill="#fff" {...O} />
    <rect x={-420} y={-340} width={840} height={90} rx={30} fill={C.navy} {...O} />
    <rect x={-380} y={-322} width={620} height={54} rx={27} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <Text x={-350} y={-294} size={30} anchor="start" color="#5B6470" weight={500}>{query}</Text>
    <circle cx={300} cy={-296} r={22} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
    {rows.map((r, i) => (
      <g key={i} transform={`translate(0,${-190 + i * 115})`} opacity={hl >= 0 && hl !== i ? 0.45 : 1}>
        <rect x={-390} y={-50} width={780} height={100} rx={16} fill={hl === i ? '#FFF4D6' : '#F7F4EE'} stroke={C.ink} strokeWidth={4} />
        <rect x={-375} y={-38} width={76} height={76} rx={10} fill="#E3E7EC" stroke={C.ink} strokeWidth={3} />
        <rect x={-352} y={-24} width={30} height={40} rx={6} fill="#fff" stroke={C.ink} strokeWidth={3} />
        <Text x={-280} y={-12} size={30} anchor="start">{r.t}</Text>
        <Text x={360} y={-6} size={36} anchor="end" color={C.green}>{r.p}</Text>
        {r.sp && (
          <g transform={`translate(-280,24) scale(${1 + tag * 0.6})`}>
            <rect x={0} y={-14} width={110} height={28} rx={8} fill={tag > 0.5 ? C.red : '#E3E7EC'} />
            <text x={55} y={1} fontFamily={FONT} fontWeight={600} fontSize={18} fill={tag > 0.5 ? '#fff' : '#7B8794'} textAnchor="middle" dominantBaseline="middle">Sponsored</text>
          </g>
        )}
        {!r.sp && <rect x={-280} y={14} width={200} height={16} rx={8} fill="#E3E7EC" />}
      </g>
    ))}
  </G>
);

export const ServerRack: React.FC<P & {f: number; label?: string; on?: boolean}> = ({f, label, on = true, ...p}) => (
  <G {...p}>
    <rect x={-110} y={-330} width={220} height={330} rx={12} fill="#2E3440" {...O} />
    {Array.from({length: 6}).map((_, i) => (
      <g key={i} transform={`translate(0,${-300 + i * 50})`}>
        <rect x={-90} y={0} width={180} height={38} rx={6} fill="#4C566A" stroke="#1F2430" strokeWidth={3} />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={-66 + k * 22} cy={19} r={6} fill={on && (Math.floor(f / 6) + i * 3 + k * 5) % 7 < 4 ? (k === 2 ? C.yellow : '#6EF0A8') : '#39414F'} />
        ))}
        <rect x={10} y={14} width={64} height={10} rx={5} fill="#39414F" />
      </g>
    ))}
    {label && <Text y={50} size={34}>{label}</Text>}
  </G>
);

export const Cloud: React.FC<P & {label?: string; color?: string; size?: number}> = ({label, color = '#fff', size = 70, ...p}) => (
  <G {...p}>
    <path d="M -300 90 Q -380 90 -380 20 Q -380 -60 -290 -60 Q -280 -170 -160 -170 Q -90 -250 20 -210 Q 120 -270 210 -170 Q 330 -170 330 -60 Q 400 -40 390 30 Q 380 90 300 90 Z" fill={color} {...O} />
    {label && <Text y={-30} size={size} color={C.navy}>{label}</Text>}
  </G>
);

export const Flywheel: React.FC<P & {labels: string[]; lit: number[]; spin?: number; napkin?: boolean; color?: string}> = ({labels, lit, spin = 0, napkin = true, color = C.green, ...p}) => {
  const R = 300;
  const n = labels.length;
  return (
    <G {...p}>
      {napkin && (
        <g>
          <rect x={-470} y={-440} width={940} height={880} rx={14} fill="#FFFDF7" {...O} strokeWidth={5} transform="rotate(-2)" />
          {Array.from({length: 18}).map((_, i) => <circle key={i} cx={-440 + i * 52} cy={-440} r={14} fill="#FFFDF7" />)}
          <path d="M -470 -380 L 470 -380" stroke="#EDE4D2" strokeWidth={4} strokeDasharray="10 12" />
        </g>
      )}
      <g transform={`rotate(${spin})`}>
        <circle r={R} fill="none" stroke={C.ink} strokeWidth={10} strokeDasharray="30 22" opacity={0.85} />
        {Array.from({length: n}).map((_, i) => {
          const a = ((i + 0.5) / n) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * R;
          const y = Math.sin(a) * R;
          const deg = (a * 180) / Math.PI + 90;
          return <path key={i} d="M -22 -18 L 22 0 L -22 18 Z" transform={`translate(${x},${y}) rotate(${deg - 90})`} fill={C.ink} />;
        })}
      </g>
      {labels.map((l, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * R;
        const y = Math.sin(a) * R;
        const on = lit[i] ?? 0;
        return (
          <g key={l} transform={`translate(${x},${y}) scale(${1 + on * 0.08})`}>
            <rect x={-170} y={-52} width={340} height={104} rx={52} fill={on > 0.5 ? color : '#EFEAE0'} {...O} strokeWidth={5} />
            <Text y={2} size={l.length > 12 ? 34 : 40} color={on > 0.5 ? '#fff' : '#8C8577'}>{l}</Text>
          </g>
        );
      })}
    </G>
  );
};

export const Garage: React.FC<P & {sign?: string}> = ({sign = 'GARAGE', ...p}) => (
  <G {...p}>
    <path d="M -380 0 L -380 -360 L 0 -540 L 380 -360 L 380 0 Z" fill="#F1E3C8" {...O} />
    <rect x={-280} y={-330} width={560} height={330} fill="#D7DDE3" {...O} />
    {Array.from({length: 5}).map((_, i) => <line key={i} x1={-280} x2={280} y1={-270 + i * 60} y2={-270 + i * 60} stroke="#AAB4BE" strokeWidth={5} />)}
    <rect x={-140} y={-430} width={280} height={60} rx={10} fill={C.ink} />
    <Text y={-400} size={34} color={C.yellow} ls={4}>{sign}</Text>
  </G>
);

export const Books: React.FC<P & {n?: number}> = ({n = 5, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => (
      <rect key={i} x={-110 + ((i * 17) % 30)} y={-50 - i * 48} width={220 - ((i * 23) % 40)} height={44} rx={6} fill={[C.red, C.blue, C.green, C.yellow, PURPLE][i % 5]} {...O} strokeWidth={5} />
    ))}
  </G>
);

export const MoneySplit: React.FC<P & {parts: {v: number; c: string; l: string; amt: string}[]; lit: number[]; w?: number}> = ({parts, lit, w = 1400, ...p}) => {
  const tot = parts.reduce((a, b) => a + b.v, 0);
  let x0 = -w / 2;
  return (
    <G {...p}>
      <rect x={-w / 2 + 10} y={-70 + 12} width={w} height={140} rx={24} fill="rgba(35,35,43,0.12)" />
      {parts.map((pt, i) => {
        const ww = (pt.v / tot) * w;
        const x = x0;
        x0 += ww;
        const on = lit[i] ?? 0;
        return (
          <g key={i}>
            <rect x={x} y={-70} width={ww} height={140} fill={on > 0.5 ? pt.c : '#E8E1D2'} {...O} />
            <Text x={x + ww / 2} y={4} size={ww < 160 ? 40 : 56} color={on > 0.5 ? '#fff' : '#9C9383'} stroke={on > 0.5 ? C.ink : undefined} sw={on > 0.5 ? 5 : 0}>{on > 0.5 ? pt.amt : '?'}</Text>
            <Text x={x + ww / 2} y={i % 2 ? 130 : -118} size={32} color={on > 0.5 ? C.ink : '#9C9383'}>{pt.l}</Text>
          </g>
        );
      })}
    </G>
  );
};

export const CodeScreen: React.FC<P & {lines: string[]; lit?: number}> = ({lines, lit = 1, ...p}) => (
  <G {...p}>
    <rect x={-360} y={-200} width={720} height={400} rx={20} fill="#1F2A36" {...O} />
    {lines.map((l, i) => (
      <text key={i} x={-320} y={-120 + i * 70} fontFamily="monospace" fontWeight={700} fontSize={40} fill={i === lines.length - 1 && lit > 0.5 ? C.yellow : '#6EF0A8'} dominantBaseline="middle">{l}</text>
    ))}
  </G>
);

export const Plug: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-120} y={-150} width={240} height={300} rx={30} fill="#fff" {...O} />
    {[-70, 70].map((y) => (
      <g key={y} transform={`translate(0,${y})`}>
        <circle r={52} fill="#EFEAE0" stroke={C.ink} strokeWidth={5} />
        <rect x={-24} y={-18} width={12} height={30} rx={4} fill={C.ink} />
        <rect x={12} y={-18} width={12} height={30} rx={4} fill={C.ink} />
      </g>
    ))}
  </G>
);

export const Chip27: React.FC<P & {text: string; on: number; color?: string; w?: number; size?: number}> = ({text, on, color = C.green, w, size = 38, ...p}) => {
  const ww = w ?? text.length * size * 0.56 + 60;
  return (
    <G {...p}>
      <rect x={-ww / 2} y={-40} width={ww} height={80} rx={40} fill={on > 0.5 ? color : '#EFEAE0'} {...O} strokeWidth={5} />
      <Text y={2} size={size} color={on > 0.5 ? '#fff' : '#9C9383'}>{text}</Text>
    </G>
  );
};

export const BigNum: React.FC<P & {label: string; value: string; on: number; color?: string; w?: number; size?: number}> = ({label, value, on, color = C.yellow, w = 900, size = 110, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 10} y={-120 + 12} width={w} height={240} rx={28} fill="rgba(35,35,43,0.12)" />
    <rect x={-w / 2} y={-120} width={w} height={240} rx={28} fill={on > 0.5 ? color : '#fff'} {...O} />
    <Text y={-70} size={36} color="#5B6470">{label}</Text>
    <Text y={30} size={size} color={on > 0.5 ? C.ink : '#B8AF9E'}>{on > 0.5 ? value : '?'}</Text>
  </G>
);

export const ShareBar: React.FC<P & {label: string; share: number; t: number; color: string; tag: string; w?: number}> = ({label, share, t, color, tag, w = 1200, ...p}) => (
  <G {...p}>
    <Text x={-w / 2} y={-100} size={42} anchor="start">{label}</Text>
    <rect x={-w / 2} y={-60} width={w} height={120} rx={22} fill="#E8E1D2" {...O} />
    <rect x={-w / 2} y={-60} width={Math.max(24, w * share * t)} height={120} rx={22} fill={color} {...O} />
    <Text x={-w / 2 + Math.max(24, w * share * t) + 30} y={4} size={60} anchor="start" color={t > 0.05 ? C.ink : '#B8AF9E'}>{t > 0.05 ? tag : '?'}</Text>
  </G>
);

export const TV: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <rect x={-170} y={-120} width={340} height={220} rx={16} fill="#2E3440" {...O} />
    <rect x={-150} y={-100} width={300} height={180} rx={8} fill="#5BC0DE" />
    <path d="M -24 -40 L 36 -10 L -24 20 Z" fill="#fff" />
    <line x1={-60} y1={100} x2={-90} y2={150} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <line x1={60} y1={100} x2={90} y2={150} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    {label && <Text y={200} size={34}>{label}</Text>}
  </G>
);

export const CarSeat: React.FC<P & {f?: number; label?: string}> = ({f = 0, label, ...p}) => (
  <G {...p}>
    <path d="M -60 -220 Q -80 -60 -60 40 L 110 40 Q 130 40 130 70 L 130 110 L -120 110 Q -150 110 -150 70 L -130 -200 Q -120 -250 -80 -250 Q -55 -250 -60 -220 Z" fill="#5B6470" {...O} />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${-40 + i * 40} ${-20 - ((f * 2 + i * 12) % 40)} q 12 -14 0 -28 q -12 -14 0 -28`} fill="none" stroke={C.red} strokeWidth={7} strokeLinecap="round" />)}
    {label && <Text y={170} size={34}>{label}</Text>}
  </G>
);
