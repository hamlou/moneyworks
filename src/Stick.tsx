import React from 'react';
import {C, SW} from './theme';
import {ease, lerp} from './anim';

export type Pose = {torso: number; head: number; lu: number; ll: number; ru: number; rl: number; lt: number; ls: number; rt: number; rs: number};
export type Expr = 'neutral' | 'happy' | 'grin' | 'sad' | 'shock' | 'worried' | 'smug' | 'think' | 'tired' | 'suspicious';
export type Key = {at: number; pose?: string; expr?: Expr; look?: number; talk?: boolean};

const L = {torso: 115, neck: 4, head: 36, ua: 62, la: 58, th: 70, sh: 66, sho: 14};
const HIP_Y = L.th + L.sh;
const D = Math.PI / 180;
const dir = (a: number): [number, number] => [Math.sin(a * D), Math.cos(a * D)];
const add = (p: [number, number], len: number, a: number): [number, number] => {
  const d = dir(a);
  return [p[0] + d[0] * len, p[1] + d[1] * len];
};

const IDLE: Pose = {torso: 0, head: 0, lu: -14, ll: -4, ru: 14, rl: 4, lt: -9, ls: 0, rt: 9, rs: 0};

export const POSES: Record<string, (f: number) => Pose> = {
  idle: (f) => ({...IDLE, lu: -14 + 1.5 * Math.sin(f / 20), ru: 14 - 1.5 * Math.sin(f / 20)}),
  wave: (f) => ({...IDLE, ru: 145, rl: 25 + 28 * Math.sin(f * 0.45), head: -4}),
  point_r: () => ({...IDLE, ru: 95, rl: -4, torso: 3}),
  point_l: () => ({...IDLE, lu: -95, ll: 4, torso: -3}),
  point_up: () => ({...IDLE, ru: 168, rl: 0}),
  shrug: (f) => ({...IDLE, lu: -62, ll: -88, ru: 62, rl: 88, head: 6 * Math.sin(f / 14)}),
  pockets: () => ({...IDLE, lu: -30, ll: -8, ru: 30, rl: 8, head: -6}),
  think: (f) => ({...IDLE, ru: 80, rl: 158, head: -7 + 1.5 * Math.sin(f / 15)}),
  typing: (f) => ({...IDLE, lu: -28, ll: 78 + 9 * Math.sin(f * 1.3), ru: 28, rl: -78 - 9 * Math.sin(f * 1.3 + 1.7)}),
  celebrate: (f) => ({...IDLE, lu: -150 + 8 * Math.sin(f * 0.5), ll: -10, ru: 150 - 8 * Math.sin(f * 0.5), rl: 10}),
  shock: () => ({...IDLE, lu: -118, ll: -28, ru: 118, rl: 28}),
  hips: () => ({...IDLE, lu: -48, ll: 84, ru: 48, rl: -84, lt: -14, rt: 14}),
  facepalm: () => ({...IDLE, ru: 120, rl: 134, head: 8}),
  carry: () => ({...IDLE, lu: -165, ll: -8, ru: 165, rl: 8}),
  present: (f) => ({...IDLE, ru: 70, rl: 30 + 4 * Math.sin(f / 10), lu: -14}),
  relax: (f) => ({...IDLE, lu: -150, ll: 250, ru: 150, rl: -250, head: 4 * Math.sin(f / 30)}),
  panic: (f) => ({...IDLE, lu: -125 + 22 * Math.sin(f * 0.8), ll: -30, ru: 125 - 22 * Math.sin(f * 0.8 + 1), rl: 30}),
  thumbs: () => ({...IDLE, ru: 60, rl: 110}),
  hold: () => ({...IDLE, lu: -30, ll: 150, ru: 30, rl: -150}),
  talk: (f) => ({...IDLE, ru: 40 + 10 * Math.sin(f / 9), rl: 60 + 10 * Math.sin(f / 7), head: 3 * Math.sin(f / 11)}),
};

const blend = (a: Pose, b: Pose, t: number): Pose => {
  const o = {} as Pose;
  (Object.keys(a) as (keyof Pose)[]).forEach((k) => (o[k] = lerp(a[k], b[k], t)));
  return o;
};

type Resolved = {at: number; pose: string; expr: Expr; look: number; talk: boolean};
const resolve = (keys: Key[]): Resolved[] => {
  const out: Resolved[] = [];
  let prev: Resolved = {at: 0, pose: 'idle', expr: 'neutral', look: 0, talk: false};
  for (const k of [...keys].sort((a, b) => a.at - b.at)) {
    prev = {at: k.at, pose: k.pose ?? prev.pose, expr: k.expr ?? prev.expr, look: k.look ?? prev.look, talk: k.talk ?? prev.talk};
    out.push(prev);
  }
  return out.length ? out : [prev];
};

const Mouth: React.FC<{e: Expr; talk: boolean; f: number}> = ({e, talk, f}) => {
  const s = {fill: 'none', stroke: C.ink, strokeWidth: 4.5, strokeLinecap: 'round' as const};
  if (talk) {
    const o = 2 + 6.5 * Math.abs(Math.sin(f * 0.75)) * (0.6 + 0.4 * Math.abs(Math.sin(f * 0.23)));
    return <ellipse cx={0} cy={13} rx={7} ry={o} fill={C.ink} />;
  }
  switch (e) {
    case 'happy':
      return <path d="M -12 8 Q 0 22 12 8" {...s} />;
    case 'grin':
      return (
        <g>
          <path d="M -15 6 Q 0 30 15 6 Z" fill={C.ink} />
          <path d="M -12 8 L 12 8 L 11 12 L -11 12 Z" fill="#fff" />
        </g>
      );
    case 'sad':
      return <path d="M -10 17 Q 0 7 10 17" {...s} />;
    case 'shock':
      return <ellipse cx={0} cy={15} rx={7} ry={10} fill={C.ink} />;
    case 'worried':
      return <path d="M -11 15 q 5.5 -5 11 0 t 11 0" {...s} />;
    case 'smug':
      return <path d="M -9 13 Q 4 17 12 6" {...s} />;
    case 'think':
      return <path d="M -6 14 L 8 12" {...s} />;
    case 'tired':
      return <path d="M -9 15 Q 0 11 9 15" {...s} />;
    case 'suspicious':
      return <path d="M -8 14 L 8 14" {...s} />;
    default:
      return <path d="M -8 11 Q 0 16 8 11" {...s} />;
  }
};

const Brows: React.FC<{e: Expr}> = ({e}) => {
  const s = {stroke: C.ink, strokeWidth: 4, strokeLinecap: 'round' as const};
  const pair = (l: string, r: string) => (
    <g>
      <path d={l} {...s} />
      <path d={r} {...s} />
    </g>
  );
  switch (e) {
    case 'sad':
    case 'worried':
    case 'tired':
      return pair('M -19 -13 L -7 -18', 'M 7 -18 L 19 -13');
    case 'shock':
      return pair('M -18 -22 Q -12 -26 -6 -22', 'M 6 -22 Q 12 -26 18 -22');
    case 'smug':
      return pair('M -18 -14 L -6 -14', 'M 6 -21 Q 12 -25 18 -20');
    case 'think':
      return pair('M -18 -18 L -6 -15', 'M 6 -21 Q 12 -24 18 -21');
    case 'suspicious':
      return pair('M -19 -18 L -6 -13', 'M 6 -13 L 19 -18');
    case 'happy':
    case 'grin':
      return pair('M -18 -17 Q -12 -21 -6 -17', 'M 6 -17 Q 12 -21 18 -17');
    default:
      return pair('M -17 -16 L -7 -16', 'M 7 -16 L 17 -16');
  }
};

const Face: React.FC<{e: Expr; f: number; look: number; talk: boolean; seed: number}> = ({e, f, look, talk, seed}) => {
  const blink = (f + seed) % 101 < 4;
  const lid = e === 'tired' || e === 'suspicious' ? 0.45 : 1;
  const ry = blink ? 0.8 : 5.6 * lid;
  const lx = look * 5;
  const big = e === 'shock' ? 1.25 : 1;
  return (
    <g>
      <ellipse cx={-12 + lx} cy={-3} rx={4.3 * big} ry={ry * big} fill={C.ink} />
      <ellipse cx={12 + lx} cy={-3} rx={4.3 * big} ry={ry * big} fill={C.ink} />
      <Brows e={e} />
      <Mouth e={e} talk={talk} f={f} />
    </g>
  );
};

const Hair = () => (
  <g fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round">
    <path d="M -10 -34 Q -8 -48 2 -50" />
    <path d="M -1 -35 Q 3 -49 14 -48" />
    <path d="M 8 -33 Q 14 -43 22 -40" />
  </g>
);

const TopHat = () => (
  <g stroke={C.ink} strokeWidth={5} strokeLinejoin="round">
    <rect x={-40} y={-40} width={80} height={10} rx={5} fill={C.ink} />
    <rect x={-26} y={-88} width={52} height={50} rx={4} fill={C.ink} />
    <rect x={-26} y={-52} width={52} height={10} fill={C.red} />
  </g>
);

const Monocle = () => (
  <g>
    <circle cx={12} cy={-3} r={10} fill="rgba(255,255,255,0.35)" stroke={C.gold} strokeWidth={3.5} />
    <path d="M 20 3 Q 26 20 18 36" fill="none" stroke={C.gold} strokeWidth={2} />
  </g>
);

export const Tinfoil: React.FC<{x?: number; y?: number; r?: number}> = ({x = 0, y = 0, r = 0}) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}>
    <path d="M -34 -26 L 34 -26 L 6 -104 Z" fill="#D5DAE1" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -18 -40 L -4 -58 L 10 -44 M 0 -76 L 12 -66" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
  </g>
);

const Bun = () => (
  <g>
    <circle cx={0} cy={-44} r={16} fill="#D9D9E0" stroke={C.ink} strokeWidth={5} />
    <path d="M -34 -12 Q -36 -40 -10 -40 M 34 -12 Q 36 -40 10 -40" fill="none" stroke="#D9D9E0" strokeWidth={10} strokeLinecap="round" />
  </g>
);
const Glasses = () => (
  <g fill="rgba(255,255,255,0.3)" stroke={C.ink} strokeWidth={3.5}>
    <circle cx={-12} cy={-3} r={10} />
    <circle cx={12} cy={-3} r={10} />
    <path d="M -2 -4 L 2 -4" />
  </g>
);
const Cap = () => (
  <g stroke={C.ink} strokeWidth={5} strokeLinejoin="round">
    <path d="M -36 -14 Q -36 -52 0 -52 Q 36 -52 36 -14 Z" fill={C.blue} />
    <path d="M 20 -16 L 62 -12 L 58 -4 L 20 -8 Z" fill={C.blue} />
  </g>
);
const Ponytail = () => (
  <g>
    <path d="M -34 -16 Q -30 -44 0 -44 Q 30 -44 34 -16 Q 20 -34 0 -34 Q -20 -34 -34 -16 Z" fill="#7A4B2A" stroke={C.ink} strokeWidth={4} />
    <path d="M 30 -30 Q 62 -30 58 10 Q 54 30 44 36 Q 50 6 34 -8" fill="#7A4B2A" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

const Shades = () => (
  <g>
    <rect x={-26} y={-12} width={22} height={16} rx={6} fill={C.ink} />
    <rect x={4} y={-12} width={22} height={16} rx={6} fill={C.ink} />
    <path d="M -4 -6 L 4 -6" stroke={C.ink} strokeWidth={4} />
    <path d="M -22 -8 L -14 -8" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Sweat: React.FC<{f: number}> = ({f}) => {
  const p = (f % 24) / 24;
  return (
    <path
      d="M 0 0 Q 7 10 0 16 Q -7 10 0 0 Z"
      transform={`translate(${44},${-18 + p * 26})`}
      fill="#8ECDF2"
      stroke={C.ink}
      strokeWidth={3}
      opacity={1 - p * 0.6}
    />
  );
};

export type StickProps = {
  f: number;
  x: number;
  y: number;
  s?: number;
  keys: Key[];
  acc?: ('hair' | 'tophat' | 'monocle' | 'tie' | 'bun' | 'glasses' | 'cap' | 'shades' | 'ponytail')[];
  walk?: boolean;
  flip?: boolean;
  sweat?: boolean;
  pockets?: number;
  tinfoil?: {x: number; y: number; r: number; o: number};
  seed?: number;
  opacity?: number;
  handItem?: React.ReactNode;
};

export const Stick: React.FC<StickProps> = ({f, x, y, s = 1, keys, acc = [], walk, flip, sweat, pockets = 0, tinfoil, seed = 0, opacity = 1, handItem}) => {
  const ks = resolve(keys);
  let i = ks.length - 1;
  while (i > 0 && ks[i].at > f) i--;
  const cur = ks[i];
  const prev = i > 0 ? ks[i - 1] : cur;
  const t = i > 0 ? ease(f, cur.at, cur.at + 8) : 1;
  const P = POSES[cur.pose] ?? POSES.idle;
  const Q = POSES[prev.pose] ?? POSES.idle;
  const p = blend(Q(f), P(f), t);
  const phase = f * 0.3;
  if (walk) {
    p.lt = 22 * Math.sin(phase);
    p.rt = -22 * Math.sin(phase);
    p.ls = Math.max(0, -26 * Math.cos(phase));
    p.rs = Math.max(0, 26 * Math.cos(phase));
    if (cur.pose === 'idle') {
      p.lu = -14 - 16 * Math.sin(phase);
      p.ru = 14 - 16 * Math.sin(phase);
    }
  }
  const bob = walk ? -Math.abs(Math.sin(phase)) * 7 : 1.6 * Math.sin((f + seed) / 18);
  const expr = t < 0.3 ? prev.expr : cur.expr;
  const look = lerp(prev.look, cur.look, t);

  const hip: [number, number] = [0, 0];
  const neck = add(hip, L.torso, 180 - p.torso);
  const sho = add(neck, L.sho, -p.torso);
  const headC = add(neck, L.neck + L.head, 180 - p.torso - p.head);
  const le = add(sho, L.ua, p.lu);
  const lh = add(le, L.la, p.lu + p.ll);
  const re = add(sho, L.ua, p.ru);
  const rh = add(re, L.la, p.ru + p.rl);
  const lk = add(hip, L.th, p.lt);
  const lf = add(lk, L.sh, p.lt + p.ls);
  const rk = add(hip, L.th, p.rt);
  const rf = add(rk, L.sh, p.rt + p.rs);
  const seg = (a: [number, number], b: [number, number], c: [number, number]) => `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`;
  const line = {fill: 'none', stroke: C.ink, strokeWidth: SW, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};

  return (
    <g transform={`translate(${x},${y + bob}) scale(${flip ? -s : s},${s}) translate(0,${-HIP_Y})`} opacity={opacity}>
      <ellipse cx={0} cy={HIP_Y + 4} rx={58} ry={9} fill="rgba(35,35,43,0.10)" />
      <path d={seg(lf, lk, hip)} {...line} />
      <path d={seg(rf, rk, hip)} {...line} />
      {pockets > 0 && (
        <g opacity={pockets}>
          <path d="M -30 -6 L -12 -6 L -14 24 L -28 22 Z" fill="#fff" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 12 -6 L 30 -6 L 28 22 L 14 24 Z" fill="#fff" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
        </g>
      )}
      <path d={`M ${hip[0]} ${hip[1]} L ${neck[0]} ${neck[1]}`} {...line} />
      {acc.includes('tie') && (
        <path
          d={`M ${sho[0] - 7} ${sho[1] - 6} L ${sho[0] + 7} ${sho[1] - 6} L ${sho[0] + 4} ${sho[1] + 36} L ${sho[0]} ${sho[1] + 44} L ${sho[0] - 4} ${sho[1] + 36} Z`}
          fill={C.red}
          stroke={C.ink}
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
      )}
      <path d={seg(sho, le, lh)} {...line} />
      <path d={seg(sho, re, rh)} {...line} />
      {handItem && <g transform={`translate(${(lh[0] + rh[0]) / 2},${Math.min(lh[1], rh[1])})`}>{handItem}</g>}
      <g transform={`translate(${headC[0]},${headC[1]}) rotate(${p.torso + p.head}) scale(${flip ? -1 : 1},1)`}>
        <circle cx={0} cy={0} r={L.head} fill={C.paper} stroke={C.ink} strokeWidth={SW} />
        <Face e={expr} f={f} look={flip ? -look : look} talk={cur.talk} seed={seed} />
        {acc.includes('hair') && <Hair />}
        {acc.includes('tophat') && <TopHat />}
        {acc.includes('monocle') && <Monocle />}
        {acc.includes('bun') && <Bun />}
        {acc.includes('glasses') && <Glasses />}
        {acc.includes('cap') && <Cap />}
        {acc.includes('shades') && <Shades />}
        {acc.includes('ponytail') && <Ponytail />}
        {sweat && <Sweat f={f} />}
        {tinfoil && tinfoil.o > 0 && (
          <g opacity={tinfoil.o}>
            <Tinfoil x={tinfoil.x} y={tinfoil.y} r={tinfoil.r} />
          </g>
        )}
      </g>
    </g>
  );
};
