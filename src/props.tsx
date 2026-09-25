import React from 'react';
import {C, FONT, HAND} from './theme';

const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
type P = {x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode};
const T = (x = 0, y = 0, s = 1, r = 0) => `translate(${x},${y}) rotate(${r}) scale(${s})`;

export const G: React.FC<P> = ({x, y, s, r, o = 1, children}) =>
  o <= 0 || s === 0 ? null : (
    <g transform={T(x, y, s, r)} opacity={o}>
      {children}
    </g>
  );

export const Text: React.FC<{x?: number; y?: number; size?: number; color?: string; weight?: number; font?: string; anchor?: 'start' | 'middle' | 'end'; stroke?: string; sw?: number; ls?: number; children: React.ReactNode}> = ({
  x = 0, y = 0, size = 48, color = C.ink, weight = 700, font = FONT, anchor = 'middle', stroke, sw = 0, ls = 0, children,
}) => (
  <text x={x} y={y} fontFamily={font} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} dominantBaseline="middle"
    stroke={stroke} strokeWidth={sw} paintOrder="stroke" strokeLinejoin="round" letterSpacing={ls}>
    {children}
  </text>
);

export const Bank: React.FC<P & {label?: string}> = ({label = 'BANK', ...p}) => (
  <G {...p}>
    <ellipse cx={0} cy={4} rx={360} ry={16} fill="rgba(35,35,43,0.10)" />
    <rect x={-340} y={-34} width={680} height={34} fill={C.stoneDark} {...O} />
    <rect x={-310} y={-66} width={620} height={32} fill={C.stone} {...O} />
    <rect x={-285} y={-370} width={570} height={304} fill={C.stone} {...O} />
    <rect x={-40} y={-200} width={80} height={134} rx={10} fill="#7A5A43" {...O} />
    <circle cx={22} cy={-130} r={5} fill={C.gold} />
    {[-215, -85, 85, 215].map((cx) => (
      <g key={cx}>
        <rect x={cx - 24} y={-350} width={48} height={284} fill="#fff" {...O} strokeWidth={5} />
        <rect x={cx - 32} y={-360} width={64} height={16} fill={C.stoneDark} {...O} strokeWidth={5} />
        <rect x={cx - 32} y={-80} width={64} height={14} fill={C.stoneDark} {...O} strokeWidth={5} />
      </g>
    ))}
    <rect x={-305} y={-420} width={610} height={52} fill={C.stoneDark} {...O} />
    <Text y={-393} size={label.length > 6 ? Math.min(40, 1000 / label.length) : 40} ls={label.length > 6 ? 3 : 14}>{label}</Text>
    <path d="M -325 -420 L 325 -420 L 0 -530 Z" fill={C.stone} {...O} />
    <circle cx={0} cy={-468} r={30} fill={C.gold} {...O} strokeWidth={5} />
    <Text y={-466} size={36}>$</Text>
  </G>
);

export const Bill: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-66} y={-34} width={132} height={68} rx={8} fill={C.greenLight} {...O} strokeWidth={5} />
    <rect x={-54} y={-23} width={108} height={46} rx={5} fill="none" stroke={C.green} strokeWidth={3} />
    <circle cx={0} cy={0} r={18} fill="#fff" stroke={C.green} strokeWidth={3} />
    <Text y={1} size={28} color={C.green}>$</Text>
  </G>
);

export const Coin: React.FC<P> = (p) => (
  <G {...p}>
    <circle cx={0} cy={0} r={24} fill={C.gold} {...O} strokeWidth={5} />
    <circle cx={0} cy={0} r={15} fill="none" stroke="#E0A91F" strokeWidth={3} />
    <Text y={1} size={24} color="#B7830F">$</Text>
  </G>
);

export const MoneyStack: React.FC<P & {n?: number; label?: string; lr?: number}> = ({n = 5, label, lr = -6, ...p}) => (
  <G {...p}>
    {Array.from({length: n}).map((_, i) => (
      <g key={i} transform={`translate(${(i % 2) * 5},${-i * 16})`}>
        <rect x={-70} y={-16} width={140} height={20} rx={5} fill={i % 2 ? C.greenLight : '#8BD39E'} {...O} strokeWidth={4.5} />
        <rect x={-14} y={-16} width={28} height={20} fill="#fff" stroke={C.ink} strokeWidth={3} />
      </g>
    ))}
    {label && (
      <g transform={`translate(0,${-n * 16 - 34}) rotate(${lr})`}>
        <rect x={-(label.length * 8.6 + 26)} y={-26} width={label.length * 17.2 + 52} height={52} fill="#FFF3A6" stroke={C.ink} strokeWidth={3.5} />
        <Text y={2} size={34} font={HAND}>{label}</Text>
      </g>
    )}
  </G>
);

export const Vault: React.FC<P & {open: number; inside?: React.ReactNode}> = ({open, inside, ...p}) => {
  const sx = 1 - 0.86 * open;
  return (
    <G {...p}>
      <circle cx={0} cy={0} r={250} fill={C.gray} {...O} />
      <circle cx={0} cy={0} r={212} fill="#39424D" {...O} />
      <clipPath id="vaultClip">
        <circle cx={0} cy={0} r={208} />
      </clipPath>
      <g clipPath="url(#vaultClip)">{inside}</g>
      <g transform={`translate(-212,0) scale(${sx},1) translate(212,0)`}>
        <circle cx={0} cy={0} r={212} fill="#C4CDD6" {...O} />
        <circle cx={0} cy={0} r={170} fill="none" stroke="#A3AEB9" strokeWidth={6} />
        {Array.from({length: 12}).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 190} cy={Math.sin(a) * 190} r={8} fill="#8E99A5" stroke={C.ink} strokeWidth={3} />;
        })}
        <circle cx={0} cy={0} r={62} fill="#DDE3E9" {...O} />
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a + open * 160})`}>
            <line x1={-110} y1={0} x2={110} y2={0} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
            <circle cx={-110} cy={0} r={14} fill={C.red} stroke={C.ink} strokeWidth={4} />
            <circle cx={110} cy={0} r={14} fill={C.red} stroke={C.ink} strokeWidth={4} />
          </g>
        ))}
        <circle cx={0} cy={0} r={22} fill={C.gold} stroke={C.ink} strokeWidth={5} />
      </g>
    </G>
  );
};

export const Car: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -130 20 L -130 -20 Q -128 -34 -110 -38 L -70 -44 L -40 -84 Q -32 -92 -18 -92 L 58 -92 Q 72 -92 80 -82 L 106 -44 L 124 -40 Q 138 -36 138 -20 L 138 20 Z" fill={C.red} {...O} />
    <path d="M -30 -78 L 16 -78 L 16 -46 L -54 -46 Z" fill="#CFEFFF" {...O} strokeWidth={4.5} />
    <path d="M 30 -78 L 62 -78 L 86 -46 L 30 -46 Z" fill="#CFEFFF" {...O} strokeWidth={4.5} />
    <circle cx={-76} cy={22} r={28} fill={C.ink} />
    <circle cx={-76} cy={22} r={11} fill="#ddd" />
    <circle cx={84} cy={22} r={28} fill={C.ink} />
    <circle cx={84} cy={22} r={11} fill="#ddd" />
    <circle cx={126} cy={-14} r={7} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
  </G>
);

export const Desk: React.FC<P & {w?: number}> = ({w = 640, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 - 16} y={-210} width={w + 32} height={26} rx={6} fill={C.woodDark} {...O} />
    <rect x={-w / 2} y={-186} width={w} height={186} fill={C.wood} {...O} />
    <rect x={-w / 2 + 30} y={-160} width={w / 2 - 50} height={130} rx={6} fill="none" stroke={C.woodDark} strokeWidth={5} />
    <rect x={20} y={-160} width={w / 2 - 50} height={130} rx={6} fill="none" stroke={C.woodDark} strokeWidth={5} />
  </G>
);

export const Monitor: React.FC<P & {value: string; valueColor?: string; flash?: number; title?: string}> = ({value, valueColor = C.ink, flash = 0, title = "DAVE'S ACCOUNT", ...p}) => (
  <G {...p}>
    <rect x={-40} y={-20} width={80} height={60} fill="#56606B" {...O} strokeWidth={5} />
    <rect x={-90} y={34} width={180} height={18} rx={6} fill="#56606B" {...O} strokeWidth={5} />
    <rect x={-250} y={-330} width={500} height={320} rx={22} fill="#2E3440" {...O} />
    <rect x={-226} y={-306} width={452} height={272} rx={10} fill="#F7FAFD" />
    <rect x={-226} y={-306} width={452} height={56} rx={10} fill={C.navy} />
    <Text y={-278} size={26} color="#fff" ls={3}>{title}</Text>
    <Text y={-212} size={24} color="#7B8794" weight={500}>Balance</Text>
    <Text y={-146} size={Math.min(92, 760 / Math.max(1, value.length))} color={valueColor}>{value}</Text>
    <rect x={-226} y={-306} width={452} height={272} rx={10} fill="#fff" opacity={flash} />
  </G>
);

export const Keyboard: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -160 0 L 160 0 L 140 -34 L -140 -34 Z" fill="#E4E8EC" {...O} strokeWidth={5} />
    {Array.from({length: 3}).map((_, r) =>
      Array.from({length: 9}).map((_, c) => <rect key={`${r}-${c}`} x={-124 + c * 28 - r * 3} y={-29 + r * 9} width={22} height={6} rx={2} fill="#AAB4BE" />),
    )}
  </G>
);

export const Paper: React.FC<P & {text: string; reveal: number; color?: string; w?: number; h?: number; size?: number; id: string}> = ({text, reveal, color = C.ink, w = 480, h = 320, size = 110, id, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 10} y={-h / 2 + 12} width={w} height={h} rx={8} fill="rgba(35,35,43,0.12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill="#fff" {...O} strokeWidth={5} />
    {Array.from({length: 6}).map((_, i) => (
      <line key={i} x1={-w / 2 + 24} x2={w / 2 - 24} y1={-h / 2 + 50 + i * 46} y2={-h / 2 + 50 + i * 46} stroke="#CFE3F5" strokeWidth={3} />
    ))}
    <line x1={-w / 2 + 60} x2={-w / 2 + 60} y1={-h / 2 + 6} y2={h / 2 - 6} stroke="#F6B2BF" strokeWidth={3} />
    <clipPath id={`rv-${id}`}>
      <rect x={-w / 2} y={-h / 2} width={w * reveal} height={h} />
    </clipPath>
    <g clipPath={`url(#rv-${id})`}>
      {text.split('\n').map((ln, i, arr) => (
        <Text key={i} y={(i - (arr.length - 1) / 2) * size * 0.95 + 6} size={size} font={HAND} color={color}>{ln}</Text>
      ))}
    </g>
  </G>
);

export const Pencil: React.FC<P> = (p) => (
  <G {...p}>
    <g transform="rotate(35)">
      <rect x={-12} y={-150} width={24} height={120} fill={C.yellow} {...O} strokeWidth={4.5} />
      <rect x={-12} y={-172} width={24} height={22} rx={4} fill="#F4A6B7" {...O} strokeWidth={4.5} />
      <path d="M -12 -30 L 12 -30 L 0 0 Z" fill="#F3D9B1" {...O} strokeWidth={4.5} />
      <path d="M -4 -10 L 4 -10 L 0 0 Z" fill={C.ink} />
    </g>
  </G>
);

export const Duck: React.FC<P & {f: number}> = ({f, ...p}) => {
  const blink = f % 83 < 4;
  const bob = Math.sin(f / 7) * 4;
  return (
    <G {...p}>
      <ellipse cx={0} cy={112} rx={120} ry={14} fill="rgba(35,35,43,0.10)" />
      <path d="M -30 78 L -30 104 L -52 110 M 30 78 L 30 104 L 8 110" fill="none" stroke="#FF8C42" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -120 0 Q -150 -40 -110 -30 Q -60 -60 20 -40 Q 110 -20 110 30 Q 100 90 0 90 Q -110 90 -120 0 Z" fill="#FFD23F" {...O} />
      <path d="M -40 10 Q 0 -10 40 20 Q 0 50 -40 10 Z" fill="#F5BD1F" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(70,${-70 + bob}) rotate(${Math.sin(f / 13) * 6})`}>
        <circle cx={0} cy={0} r={52} fill="#FFD23F" {...O} />
        <path d="M 40 0 Q 90 -6 96 12 Q 80 26 40 18 Z" fill="#FF8C42" {...O} strokeWidth={5} />
        <ellipse cx={14} cy={-14} rx={8} ry={blink ? 1 : 10} fill={C.ink} />
        <circle cx={17} cy={-18} r={3} fill="#fff" opacity={blink ? 0 : 1} />
        <ellipse cx={-6} cy={12} rx={12} ry={7} fill="#FFB3A0" opacity={0.7} />
      </g>
    </G>
  );
};

export const Puff: React.FC<P & {t: number}> = ({t, ...p}) => {
  if (t <= 0 || t >= 1) return null;
  const k = Math.sin(t * Math.PI);
  return (
    <G {...p}>
      {Array.from({length: 9}).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const d = 40 + t * 150;
        return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.8} r={30 + k * 60} fill="#fff" stroke="#C9CED6" strokeWidth={5} opacity={1 - t} />;
      })}
      <circle cx={0} cy={0} r={60 + k * 90} fill="#fff" opacity={(1 - t) * 0.95} />
    </G>
  );
};

export const Sparkle: React.FC<P & {t: number; color?: string}> = ({t, color = C.yellow, ...p}) => {
  if (t <= 0 || t >= 1) return null;
  const k = Math.sin(t * Math.PI);
  return (
    <G {...p} s={(p.s ?? 1) * k} r={t * 90}>
      <path d="M 0 -60 Q 8 -8 60 0 Q 8 8 0 60 Q -8 8 -60 0 Q -8 -8 0 -60 Z" fill={color} stroke={C.ink} strokeWidth={4} />
    </G>
  );
};

export const Bubble: React.FC<P & {text: string; size?: number; tail?: 'left' | 'right' | 'down'; w?: number; bg?: string; color?: string}> = ({text, size = 48, tail = 'down', w, bg = '#fff', color = C.ink, ...p}) => {
  const lines = text.split('\n');
  const width = w ?? Math.max(...lines.map((l) => l.length)) * size * 0.56 + 80;
  const h = lines.length * size * 1.15 + 50;
  const tx = tail === 'left' ? -width / 2 + 60 : tail === 'right' ? width / 2 - 60 : 0;
  return (
    <G {...p}>
      <path d={`M ${tx - 24} ${h / 2 - 6} L ${tx + (tail === 'left' ? -30 : tail === 'right' ? 30 : 0)} ${h / 2 + 44} L ${tx + 24} ${h / 2 - 6} Z`} fill={bg} {...O} />
      <rect x={-width / 2} y={-h / 2} width={width} height={h} rx={34} fill={bg} {...O} />
      <rect x={tx - 20} y={h / 2 - 14} width={40} height={14} fill={bg} />
      {lines.map((l, i) => (
        <Text key={i} y={(i - (lines.length - 1) / 2) * size * 1.15 + 3} size={size} color={color}>{l}</Text>
      ))}
    </G>
  );
};

export const Thought: React.FC<P & {w?: number; h?: number; tx?: number; ty?: number}> = ({w = 420, h = 280, tx = -200, ty = 200, children, ...p}) => (
  <G {...p}>
    <circle cx={tx * 0.55} cy={ty * 0.55} r={16} fill="#fff" {...O} strokeWidth={5} />
    <circle cx={tx * 0.8} cy={ty * 0.8} r={10} fill="#fff" {...O} strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={w / 2} ry={h / 2} fill="#fff" {...O} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const a = (i / 8) * Math.PI * 2 + 0.3;
      return <circle key={i} cx={Math.cos(a) * w * 0.45} cy={Math.sin(a) * h * 0.45} r={52} fill="#fff" {...O} />;
    })}
    <ellipse cx={0} cy={0} rx={w / 2 - 10} ry={h / 2 - 10} fill="#fff" />
    {children}
  </G>
);

export const XMark: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -260 -200 L 260 200 M 260 -200 L -260 200" stroke={C.ink} strokeWidth={96} strokeLinecap="round" />
    <path d="M -260 -200 L 260 200 M 260 -200 L -260 200" stroke={C.red} strokeWidth={72} strokeLinecap="round" />
  </G>
);

export const Stamp: React.FC<P & {text: string; color?: string; size?: number}> = ({text, color = C.red, size = 64, ...p}) => {
  const w = text.length * size * 0.66 + 70;
  return (
    <G {...p}>
      <rect x={-w / 2} y={-size * 0.85} width={w} height={size * 1.7} rx={16} fill="rgba(255,255,255,0.85)" stroke={color} strokeWidth={10} />
      <Text y={3} size={size} color={color} ls={4}>{text}</Text>
    </G>
  );
};

export const Moth: React.FC<P & {f: number}> = ({f, ...p}) => {
  const fl = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.9));
  return (
    <G {...p}>
      <g transform={`scale(1,${fl})`}>
        <path d="M 0 0 Q -44 -40 -52 -6 Q -40 16 0 4 Z" fill="#B9B1A3" stroke={C.ink} strokeWidth={4} />
        <path d="M 0 0 Q 44 -40 52 -6 Q 40 16 0 4 Z" fill="#B9B1A3" stroke={C.ink} strokeWidth={4} />
      </g>
      <ellipse cx={0} cy={4} rx={7} ry={16} fill="#7E7568" stroke={C.ink} strokeWidth={4} />
      <path d="M -3 -10 Q -10 -24 -16 -26 M 3 -10 Q 10 -24 16 -26" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
    </G>
  );
};

export const Card: React.FC<P & {top: string; big: string; color: string; w?: number}> = ({top, big, color, w = 460, ...p}) => (
  <G {...p}>
    <rect x={-w / 2 + 10} y={-100 + 14} width={w} height={200} rx={28} fill="rgba(35,35,43,0.14)" />
    <rect x={-w / 2} y={-100} width={w} height={200} rx={28} fill={color} {...O} />
    <Text y={-40} size={40} color="#fff" ls={6}>{top}</Text>
    <Text y={32} size={84} color="#fff">{big}</Text>
  </G>
);

export const Clock: React.FC<P & {f: number}> = ({f, ...p}) => (
  <G {...p}>
    <circle cx={0} cy={0} r={92} fill="#fff" {...O} />
    {Array.from({length: 12}).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <line key={i} x1={Math.cos(a) * 72} y1={Math.sin(a) * 72} x2={Math.cos(a) * 82} y2={Math.sin(a) * 82} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
    })}
    <line x1={0} y1={0} x2={0} y2={-50} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(f * 0.21) * 70} y2={-Math.cos(f * 0.21) * 70} stroke={C.red} strokeWidth={5} strokeLinecap="round" />
    <circle cx={0} cy={0} r={9} fill={C.ink} />
  </G>
);

export const Calendar: React.FC<P & {year: number | string; flip: number; top?: string}> = ({year, flip, top = 'YEAR', ...p}) => (
  <G {...p}>
    <rect x={-120} y={-130} width={240} height={260} rx={18} fill="#fff" {...O} />
    <rect x={-120} y={-130} width={240} height={70} rx={18} fill={C.red} {...O} />
    <rect x={-116} y={-80} width={232} height={20} fill={C.red} />
    <circle cx={-60} cy={-130} r={10} fill={C.ink} />
    <circle cx={60} cy={-130} r={10} fill={C.ink} />
    <Text y={-94} size={32} color="#fff" ls={6}>{top}</Text>
    <g transform={`translate(0,${-60}) scale(1,${1 - flip}) translate(0,${60})`}>
      <Text y={30} size={86}>{year}</Text>
    </g>
  </G>
);

export const Sack: React.FC<P & {coins?: number}> = ({coins = 0, ...p}) => (
  <G {...p}>
    <path d="M -40 -70 Q -110 -40 -104 30 Q -96 90 0 92 Q 96 90 104 30 Q 110 -40 40 -70 Z" fill="#D8B98A" {...O} />
    <path d="M -40 -70 Q -60 -104 -30 -100 Q 0 -86 30 -100 Q 60 -104 40 -70 Z" fill="#C9A673" {...O} strokeWidth={5} />
    <path d="M -44 -68 L 44 -68" stroke="#8A6A3E" strokeWidth={8} strokeLinecap="round" />
    <Text y={14} size={78} color="#8A6A3E">$</Text>
    {Array.from({length: coins}).map((_, i) => (
      <Coin key={i} x={-60 + (i % 5) * 30} y={-90 - Math.floor(i / 5) * 26} s={0.9} />
    ))}
  </G>
);

export const DocCard: React.FC<P & {hl: number}> = ({hl, ...p}) => (
  <G {...p}>
    <rect x={-370 + 14} y={-250 + 16} width={740} height={500} rx={18} fill="rgba(35,35,43,0.14)" />
    <rect x={-370} y={-250} width={740} height={500} rx={18} fill="#fff" {...O} />
    <path d="M -370 -232 Q -370 -250 -352 -250 L 352 -250 Q 370 -250 370 -232 L 370 -160 L -370 -160 Z" fill={C.navy} {...O} />
    <Text y={-218} size={34} color="#fff" ls={8}>BANK OF ENGLAND</Text>
    <Text y={-180} size={22} color="#C9D6E6" weight={500} ls={3}>QUARTERLY BULLETIN · 2014 Q1</Text>
    <Text y={-110} size={40}>Money creation in the</Text>
    <Text y={-64} size={40}>modern economy</Text>
    {[[24, 470], [74, 370], [124, 300]].map(([cy, w], i) => {
      const k = Math.min(1, Math.max(0, hl * 3 - i));
      return k > 0 ? <rect key={i} x={-w / 2 - 8} y={cy - 22} width={(w + 16) * k} height={44} rx={6} fill={C.yellow} opacity={0.8} /> : null;
    })}
    <Text y={24} size={32} weight={500} font={FONT}>“Whenever a bank makes a loan,</Text>
    <Text y={74} size={32} weight={500}>it simultaneously creates</Text>
    <Text y={124} size={32} weight={500}>a matching deposit...”</Text>
    <Text y={200} size={22} color="#7B8794" weight={500}>McLeay, Radia & Thomas — Bank of England, 2014</Text>
  </G>
);

export const SourceTag: React.FC<{f: number; at: number; text: string; until?: number}> = ({f, at, text, until = 1e9}) => {
  const o = Math.min(1, Math.max(0, (f - at) / 8)) * (f > until ? Math.max(0, 1 - (f - until) / 8) : 1);
  if (o <= 0) return null;
  const w = text.length * 13 + 40;
  return (
    <g transform={`translate(${1880 - w},${862})`} opacity={o}>
      <rect x={0} y={-22} width={w} height={44} rx={22} fill="rgba(35,35,43,0.78)" />
      <text x={20} y={2} fontFamily={FONT} fontSize={22} fontWeight={500} fill="#fff" dominantBaseline="middle">{text}</text>
    </g>
  );
};

export const Arrow: React.FC<{d: string; t: number; color?: string; w?: number}> = ({d, t, color = C.ink, w = 8}) =>
  t <= 0 ? null : (
    <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} />
  );
