import React from 'react';
import {C} from './theme';
import {G, Text} from './props';

type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const SoapBubble: React.FC<P & {rad?: number; f?: number; label?: string; sub?: string}> = ({rad = 220, f = 0, label, sub, ...p}) => {
  const wob = 1 + 0.02 * Math.sin(f / 9);
  return (
    <G {...p}>
      <g transform={`scale(${wob},${2 - wob})`}>
        <circle r={rad} fill="rgba(160,215,255,0.28)" stroke="#6FA8DC" strokeWidth={8} />
        <path d={`M ${-rad * 0.62} ${-rad * 0.35} A ${rad * 0.72} ${rad * 0.72} 0 0 1 ${-rad * 0.2} ${-rad * 0.7}`} fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" />
        <circle cx={rad * 0.45} cy={rad * 0.42} r={rad * 0.08} fill="rgba(255,255,255,0.8)" />
        <path d={`M ${rad * 0.3} ${rad * 0.75} A ${rad * 0.8} ${rad * 0.8} 0 0 0 ${rad * 0.75} ${rad * 0.3}`} fill="none" stroke="#E7A6F2" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
      </g>
      {label && <Text y={sub ? -20 : 0} size={Math.min(64, rad * 0.3)}>{label}</Text>}
      {sub && <Text y={40} size={Math.min(40, rad * 0.18)} color="#5B6470">{sub}</Text>}
    </G>
  );
};

export const Tulip: React.FC<P & {color?: string; striped?: boolean; stem?: number}> = ({color = C.red, striped, stem = 160, ...p}) => (
  <G {...p}>
    <path d={`M 0 0 L 0 ${-stem}`} stroke="#3F8F4E" strokeWidth={10} strokeLinecap="round" />
    <path d={`M 0 -30 Q -60 -60 -50 -110 Q -10 -80 0 -40`} fill="#5DBB6B" {...O} strokeWidth={4} />
    <g transform={`translate(0,${-stem})`}>
      <path d="M -55 0 Q -65 -70 -40 -95 L -20 -60 L 0 -105 L 20 -60 L 40 -95 Q 65 -70 55 0 Q 0 30 -55 0 Z" fill={color} {...O} strokeWidth={5} />
      {striped && [-30, -10, 10, 30].map((x) => <path key={x} d={`M ${x} 5 Q ${x * 1.2} -40 ${x * 0.9} -80`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />)}
    </g>
  </G>
);

export const Bulb: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <path d="M 0 -110 Q 20 -70 70 -30 Q 110 20 70 70 Q 0 110 -70 70 Q -110 20 -70 -30 Q -20 -70 0 -110 Z" fill="#C9A27A" {...O} />
    <path d="M -20 -60 Q 0 0 -10 70 M 25 -50 Q 40 10 30 75" stroke="#A67C52" strokeWidth={5} fill="none" />
    {[-40, -15, 15, 40].map((x) => <path key={x} d={`M ${x} 85 q ${x / 8} 25 ${x / 4} 40`} stroke={C.ink} strokeWidth={4} fill="none" />)}
    {label && <Text y={170} size={36}>{label}</Text>}
  </G>
);

export const Onion: React.FC<P & {label?: string}> = ({label, ...p}) => (
  <G {...p}>
    <path d="M 0 -120 Q 10 -80 60 -40 Q 110 20 60 75 Q 0 110 -60 75 Q -110 20 -60 -40 Q -10 -80 0 -120 Z" fill="#D9B8E8" {...O} />
    <path d="M 0 -100 Q -40 0 -20 90 M 0 -100 Q 40 0 20 90" stroke="#B48ACB" strokeWidth={5} fill="none" />
    {label && <Text y={170} size={36}>{label}</Text>}
  </G>
);

export const Windmill: React.FC<P & {f?: number}> = ({f = 0, ...p}) => (
  <G {...p}>
    <path d="M -80 0 L -50 -300 L 50 -300 L 80 0 Z" fill="#C98F5E" {...O} />
    <path d="M -70 -300 L 0 -370 L 70 -300 Z" fill={C.red} {...O} />
    <rect x={-22} y={-80} width={44} height={80} rx={20} fill="#6E4527" {...O} strokeWidth={4} />
    <g transform={`translate(0,-300) rotate(${f * 1.5})`}>
      {[0, 90, 180, 270].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <rect x={-8} y={-230} width={16} height={230} fill="#8C5A33" />
          <rect x={8} y={-220} width={60} height={170} fill="#FFFDF5" {...O} strokeWidth={4} />
        </g>
      ))}
      <circle r={18} fill={C.ink} />
    </g>
  </G>
);

export const SockPuppet: React.FC<P & {f?: number; mic?: boolean}> = ({f = 0, mic = true, ...p}) => {
  const jaw = 8 + 8 * Math.sin(f / 4);
  return (
    <G {...p}>
      <path d="M -70 260 L -80 0 Q -90 -150 20 -170 Q 130 -170 140 -80 L 140 0 L 70 20 L 60 260 Z" fill="#F2F2EE" {...O} />
      <path d={`M 140 -10 Q 90 ${10 + jaw} 40 ${-5 + jaw}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={40} cy={-100} r={26} fill="#fff" stroke={C.ink} strokeWidth={5} />
      <circle cx={48} cy={-98} r={11} fill={C.ink} />
      <circle cx={100} cy={-110} r={20} fill="#fff" stroke={C.ink} strokeWidth={5} />
      <circle cx={106} cy={-108} r={9} fill={C.ink} />
      <path d="M -70 200 L 65 200" stroke={C.red} strokeWidth={14} />
      <path d="M -72 150 L 64 150" stroke={C.red} strokeWidth={14} />
      {mic && (
        <g transform="translate(-130,-20) rotate(-20)">
          <rect x={-10} y={0} width={20} height={120} rx={8} fill="#56606B" {...O} strokeWidth={4} />
          <circle cy={-10} r={30} fill="#9AA5B1" {...O} strokeWidth={4} />
        </g>
      )}
    </G>
  );
};

export const DataCenter: React.FC<P & {f?: number; label?: string; on?: boolean; w?: number}> = ({f = 0, label = 'DATA CENTER', on = true, w = 520, ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={6} rx={w / 2 + 40} ry={16} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-300} width={w} height={300} fill="#DDE3EA" {...O} />
    <rect x={-w / 2 - 20} y={-330} width={w + 40} height={34} rx={6} fill="#56606B" {...O} />
    {[-1, 1].map((k) => (
      <g key={k} transform={`translate(${k * w * 0.28},-345)`}>
        <rect x={-40} y={-40} width={80} height={40} fill="#9AA5B1" {...O} strokeWidth={4} />
        <g transform={`translate(0,-20) rotate(${on ? f * 18 : 0})`}>
          <line x1={-26} x2={26} stroke={C.ink} strokeWidth={5} />
          <line y1={-16} y2={16} stroke={C.ink} strokeWidth={5} />
        </g>
      </g>
    ))}
    {Array.from({length: Math.max(2, Math.round(w / 140))}).map((_, i, a) => {
      const x = -w / 2 + 30 + i * ((w - 60) / a.length);
      const rw = (w - 60) / a.length - 20;
      return (
        <g key={i}>
          <rect x={x} y={-260} width={rw} height={200} rx={6} fill="#2E3440" stroke={C.ink} strokeWidth={4} />
          {[0, 1, 2, 3, 4, 5].map((r) => <circle key={r} cx={x + rw / 2 + ((r % 2) * 2 - 1) * rw * 0.22} cy={-235 + Math.floor(r / 2) * 60} r={7} fill={on && (f + i * 5 + r * 3) % 24 < 12 ? '#6EF0A8' : '#3A4A40'} />)}
        </g>
      );
    })}
    {label && <Text y={-30} size={Math.min(38, (w * 1.6) / label.length)}>{label}</Text>}
  </G>
);

export const Chip: React.FC<P & {label?: string; glow?: number}> = ({label = 'AI CHIP', glow = 0, ...p}) => (
  <G {...p}>
    {glow > 0 && <rect x={-150} y={-150} width={300} height={300} rx={40} fill={C.yellow} opacity={0.5 * glow} />}
    {[-80, -40, 0, 40, 80].map((d) => (
      <g key={d}>
        <line x1={d} y1={-140} x2={d} y2={-110} stroke={C.ink} strokeWidth={8} />
        <line x1={d} y1={110} x2={d} y2={140} stroke={C.ink} strokeWidth={8} />
        <line x1={-140} y1={d} x2={-110} y2={d} stroke={C.ink} strokeWidth={8} />
        <line x1={110} y1={d} x2={140} y2={d} stroke={C.ink} strokeWidth={8} />
      </g>
    ))}
    <rect x={-110} y={-110} width={220} height={220} rx={18} fill="#2E3440" {...O} />
    <rect x={-70} y={-70} width={140} height={140} rx={10} fill="#76B900" stroke={C.ink} strokeWidth={4} />
    <Text y={2} size={label.length > 6 ? 26 : 34} color="#fff">{label}</Text>
  </G>
);

export const Basket: React.FC<P & {eggs?: number; label?: string; shine?: number}> = ({eggs = 5, label, shine = 0, ...p}) => (
  <G {...p}>
    <path d="M -160 -60 Q 0 -260 160 -60" fill="none" stroke="#8C5A33" strokeWidth={14} strokeLinecap="round" />
    {Array.from({length: eggs}).map((_, i) => (
      <ellipse key={i} cx={-110 + i * (220 / Math.max(1, eggs - 1))} cy={-70 - (i % 2) * 30} rx={42} ry={54} fill={C.gold} stroke={C.ink} strokeWidth={5} />
    ))}
    <path d="M -180 -60 L 180 -60 L 140 90 L -140 90 Z" fill="#D9A15B" {...O} />
    {[-20, 20, 60].map((y) => <line key={y} x1={-170} y1={y - 20} x2={170} y2={y - 20} stroke="#B07A3E" strokeWidth={6} />)}
    {label && <Text y={20} size={44} color="#fff" stroke={C.ink} sw={6}>{label}</Text>}
    {shine > 0 && [0, 1, 2].map((i) => <path key={i} d="M 0 -26 L 7 -7 L 26 0 L 7 7 L 0 26 L -7 7 L -26 0 L -7 -7 Z" transform={`translate(${-120 + i * 120},${-180 - (i % 2) * 40}) scale(${0.6 + 0.4 * Math.sin(shine + i)})`} fill="#fff" stroke={C.gold} strokeWidth={3} />)}
  </G>
);

export const Bull: React.FC<P & {color?: string}> = ({color = C.green, ...p}) => (
  <G {...p}>
    <path d="M -80 -60 Q -170 -110 -150 -190 Q -120 -120 -60 -110" fill="#FFF7E6" {...O} />
    <path d="M 80 -60 Q 170 -110 150 -190 Q 120 -120 60 -110" fill="#FFF7E6" {...O} />
    <path d="M -110 -80 Q -120 60 -60 110 Q 0 140 60 110 Q 120 60 110 -80 Q 0 -140 -110 -80 Z" fill={color} {...O} />
    <ellipse cx={0} cy={70} rx={70} ry={42} fill="#F4B8C4" {...O} strokeWidth={5} />
    <circle cx={-25} cy={70} r={9} fill={C.ink} />
    <circle cx={25} cy={70} r={9} fill={C.ink} />
    <circle cx={-50} cy={-20} r={14} fill={C.ink} />
    <circle cx={50} cy={-20} r={14} fill={C.ink} />
    <path d="M -70 -50 L -30 -38 M 70 -50 L 30 -38" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  </G>
);

export const Bear: React.FC<P & {color?: string}> = ({color = '#8C5A33', ...p}) => (
  <G {...p}>
    <circle cx={-90} cy={-100} r={45} fill={color} {...O} />
    <circle cx={90} cy={-100} r={45} fill={color} {...O} />
    <circle cx={-90} cy={-100} r={20} fill="#D9A15B" />
    <circle cx={90} cy={-100} r={20} fill="#D9A15B" />
    <circle cx={0} cy={0} r={130} fill={color} {...O} />
    <ellipse cx={0} cy={50} rx={60} ry={45} fill="#D9A15B" {...O} strokeWidth={5} />
    <ellipse cx={0} cy={30} rx={20} ry={14} fill={C.ink} />
    <path d="M -20 75 Q 0 62 20 75" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    <circle cx={-48} cy={-25} r={12} fill={C.ink} />
    <circle cx={48} cy={-25} r={12} fill={C.ink} />
    <path d="M -70 -60 L -30 -45 M 70 -60 L 30 -45" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  </G>
);

export const Tv: React.FC<P> = (p) => (
  <G {...p}>
    <line x1={-40} y1={-130} x2={-10} y2={-90} stroke={C.ink} strokeWidth={5} />
    <line x1={40} y1={-130} x2={10} y2={-90} stroke={C.ink} strokeWidth={5} />
    <rect x={-120} y={-90} width={240} height={170} rx={24} fill="#C98F5E" {...O} />
    <rect x={-95} y={-68} width={150} height={125} rx={18} fill="#9FB7C9" stroke={C.ink} strokeWidth={5} />
    <circle cx={88} cy={-30} r={12} fill={C.ink} />
    <circle cx={88} cy={10} r={12} fill={C.ink} />
    <line x1={-80} y1={80} x2={-95} y2={110} stroke={C.ink} strokeWidth={6} />
    <line x1={80} y1={80} x2={95} y2={110} stroke={C.ink} strokeWidth={6} />
  </G>
);

export const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

// big value box that shows "?" until `at`, then the value
export const ValBox: React.FC<P & {f: number; at: number; value: string; label?: string; w?: number; h?: number; size?: number; color?: string; fill?: string}> = ({f, at, value, label, w = 560, h = 180, size = 84, color = C.ink, fill = '#fff', ...p}) => {
  const on = f >= at;
  const k = on ? Math.max(0, 1 - (f - at) / 12) : 0;
  return (
    <G {...p}>
      <g transform={`scale(${1 + 0.12 * k})`}>
        <Box w={w} h={h} fill={on ? fill : '#F1ECE2'} />
        <Text y={label ? -18 : 4} size={size} color={on ? color : '#B9B0A0'}>{on ? value : '?'}</Text>
        {label && <Text y={h / 2 - 34} size={30} color="#5B6470">{label}</Text>}
      </g>
    </G>
  );
};

// ring of nodes with arrows; lit[i] highlights arrow i (from node i to node i+1)
export const Loop: React.FC<P & {nodes: React.ReactNode[]; labels: string[]; lit: number[]; rad?: number; f: number; coin?: number}> = ({nodes, labels, lit, rad = 300, f, coin = -1, ...p}) => {
  const n = nodes.length;
  const pos = (i: number) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return [Math.cos(a) * rad, Math.sin(a) * rad];
  };
  return (
    <G {...p}>
      {nodes.map((_, i) => {
        const a0 = -Math.PI / 2 + (i / n) * Math.PI * 2 + 0.42;
        const a1 = -Math.PI / 2 + ((i + 1) / n) * Math.PI * 2 - 0.42;
        const x0 = Math.cos(a0) * rad, y0 = Math.sin(a0) * rad, x1 = Math.cos(a1) * rad, y1 = Math.sin(a1) * rad;
        const on = lit[i] ?? 0;
        const col = on > 0.5 ? C.green : '#CFC6B4';
        const am = (a0 + a1) / 2;
        const hx = Math.cos(a1) * rad, hy = Math.sin(a1) * rad;
        const tx = -Math.sin(a1), ty = Math.cos(a1);
        return (
          <g key={i}>
            <path d={`M ${x0} ${y0} A ${rad} ${rad} 0 0 1 ${x1} ${y1}`} fill="none" stroke={col} strokeWidth={on > 0.5 ? 16 : 12} strokeLinecap="round" />
            <path d={`M ${hx + tx * 30} ${hy + ty * 30} L ${hx - ty * 22} ${hy + tx * 22} L ${hx + ty * 22} ${hy - tx * 22} Z`} fill={col} stroke={col} strokeWidth={6} strokeLinejoin="round" />
            <g transform={`translate(${Math.cos(am) * (rad + 70)},${Math.sin(am) * (rad + 70)})`} opacity={0.4 + 0.6 * on}>
              <rect x={-labels[i].length * 12 - 20} y={-28} width={labels[i].length * 24 + 40} height={56} rx={28} fill={on > 0.5 ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={4} />
              <Text y={2} size={32}>{labels[i]}</Text>
            </g>
          </g>
        );
      })}
      {nodes.map((nd, i) => {
        const [x, y] = pos(i);
        return <g key={i} transform={`translate(${x},${y})`}>{nd}</g>;
      })}
      {coin >= 0 && (() => {
        const a = -Math.PI / 2 + coin * Math.PI * 2;
        return (
          <g transform={`translate(${Math.cos(a) * rad},${Math.sin(a) * rad})`}>
            <circle r={34} fill={C.gold} stroke={C.ink} strokeWidth={5} />
            <Text y={3} size={36}>$</Text>
          </g>
        );
      })()}
      {f < 0 && null}
    </G>
  );
};
