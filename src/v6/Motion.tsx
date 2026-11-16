import React from 'react';
import {AbsoluteFill, interpolate, random, spring} from 'remotion';
import {localFont} from '../theme';

// MOTION SCENES (owner 16 Nov 2026: "not just text on the screen… animation related to what is spoken… not look like a coding video").
// A stage of illustrated ACTORS that act out the words: things enter, a cursor presses, money flies A → B, stacks drain,
// stamps slam, the camera moves. Depth: parallax + focus blur + dust + light. Declared in the spec, timed on spoken words.
const MONOB = localFont('Plex Mono B', 'plex-mono-600.woff2', '600');
const SERIF = localFont('Instrument Serif', 'instrument-serif.woff2', '400');
const cl = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ez = (t: number) => 1 - Math.pow(1 - t, 3);
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const sp = (f: number, at: number, d = 11, st = 170) => (f < at ? 0 : spring({frame: f - at, fps: 30, config: {damping: d, stiffness: st, mass: 0.7}}));

export type Actor = {id: string; obj: string; x: number; y: number; s?: number; z?: number; t?: string; flip?: boolean};
export type MEv = {at: number; v: string; id?: string; on?: string; from?: string; to?: string; obj?: string; n?: number; t?: string; color?: string; prefix?: string; suffix?: string; zoom?: number};
const C = {gold: '#E2A21C', gold2: '#F6CF62', red: '#C92A35', cream: '#EFEADB', ink: '#16161A', steel: '#8E99A8', steel2: '#3B434F', green: '#3F8F5F', green2: '#7CC08F'};

// ---------- the object library (layered, lit from the top-left; ~200 px tall at s = 1)
const G: React.FC = () => (
  <defs>
    <linearGradient id="mSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9D2DD" /><stop offset="0.5" stopColor="#7C8796" /><stop offset="1" stopColor="#2C333D" /></linearGradient>
    <linearGradient id="mStone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3EEDF" /><stop offset="1" stopColor="#B9B19C" /></linearGradient>
    <linearGradient id="mGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE79A" /><stop offset="0.5" stopColor="#E2A21C" /><stop offset="1" stopColor="#8A5A08" /></linearGradient>
    <linearGradient id="mBill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A9DDB7" /><stop offset="1" stopColor="#3F8F5F" /></linearGradient>
    <linearGradient id="mDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A414D" /><stop offset="1" stopColor="#14171C" /></linearGradient>
    <linearGradient id="mRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F0535D" /><stop offset="1" stopColor="#8E1620" /></linearGradient>
    <linearGradient id="mPaper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBF8EE" /><stop offset="1" stopColor="#D5CFBB" /></linearGradient>
    <radialGradient id="mSkin" cx="0.35" cy="0.3" r="0.9"><stop offset="0" stopColor="#59616E" /><stop offset="1" stopColor="#1B1F26" /></radialGradient>
  </defs>
);
const Bill: React.FC<{w?: number}> = ({w = 90}) => (
  <g><rect x={-w / 2} y={-w * 0.22} width={w} height={w * 0.44} rx={4} fill="url(#mBill)" stroke="#1F5236" strokeWidth={2} /><circle r={w * 0.13} fill="none" stroke="#1F5236" strokeWidth={2.5} /><rect x={-w / 2 + 6} y={-w * 0.22 + 5} width={w - 12} height={w * 0.44 - 10} rx={2} fill="none" stroke="#EAF6EC" strokeWidth={1} opacity={0.6} /></g>
);
const Coin: React.FC = () => (<g><ellipse cx={0} cy={3} rx={22} ry={22} fill="#7A4E06" /><circle r={22} fill="url(#mGold)" /><circle r={15} fill="none" stroke="#8A5A08" strokeWidth={2} /><text y={8} textAnchor="middle" fontFamily={MONOB} fontSize={24} fill="#7A4E06">$</text></g>);
const OBJ: Record<string, (p: {level: number; open: number; t?: string; f: number}) => React.ReactNode> = {
  bank: () => (
    <g>
      <polygon points="-130,-70 0,-150 130,-70" fill="url(#mStone)" stroke="#6E6757" strokeWidth={3} /><rect x={-130} y={-70} width={260} height={22} fill="#DDD6C2" stroke="#6E6757" strokeWidth={3} />
      {[-96, -48, 0, 48, 96].map((x) => <g key={x}><rect x={x - 13} y={-48} width={26} height={120} fill="url(#mStone)" stroke="#6E6757" strokeWidth={2.5} /><rect x={x - 13} y={-48} width={8} height={120} fill="#fff" opacity={0.35} /></g>)}
      <rect x={-140} y={72} width={280} height={18} fill="#CFC8B3" stroke="#6E6757" strokeWidth={3} /><rect x={-152} y={90} width={304} height={14} fill="#B9B19C" stroke="#6E6757" strokeWidth={3} />
      <circle cx={0} cy={-98} r={17} fill="url(#mGold)" stroke="#7A4E06" strokeWidth={2.5} /><text x={0} y={-90} textAnchor="middle" fontFamily={MONOB} fontSize={22} fill="#7A4E06">$</text>
    </g>
  ),
  vault: ({open}) => (
    <g>
      <rect x={-150} y={-150} width={300} height={300} rx={18} fill="url(#mDark)" stroke="#0B0D10" strokeWidth={5} /><circle r={118} fill="#07080A" /><circle r={118} fill="none" stroke="#565F6C" strokeWidth={8} />
      {open > 0.05 ? [0, 1, 2, 3, 4].map((i) => <rect key={i} x={-70 + i * 30} y={30 - (i % 2) * 18} width={24} height={50 + (i % 2) * 18} rx={3} fill="url(#mGold)" opacity={Math.min(1, open * 1.6)} />) : null}
      <g transform={`translate(${-118 * open},0) scale(${1 - 0.86 * open},1)`} style={{transformOrigin: '-118px 0px'}}>
        <circle r={112} fill="url(#mSteel)" stroke="#1B2027" strokeWidth={5} /><circle r={84} fill="none" stroke="#2C333D" strokeWidth={4} opacity={0.7} />
        <g transform={`rotate(${open * 200})`}>{[0, 60, 120].map((a) => <rect key={a} x={-62} y={-6} width={124} height={12} rx={6} fill="#D7DEE8" stroke="#2C333D" strokeWidth={2.5} transform={`rotate(${a})`} />)}<circle r={20} fill="url(#mSteel)" stroke="#1B2027" strokeWidth={3} /></g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <circle key={a} cx={98 * Math.cos((a * Math.PI) / 180)} cy={98 * Math.sin((a * Math.PI) / 180)} r={6} fill="#2C333D" />)}
      </g>
    </g>
  ),
  cashstack: ({level}) => {
    const n = Math.round(9 * level);
    return (<g>{Array.from({length: n}, (_, i) => <g key={i} transform={`translate(${(i % 2) * 4 - 2},${86 - i * 19})`}><rect x={-70} y={-9} width={140} height={18} rx={3} fill="url(#mBill)" stroke="#1F5236" strokeWidth={2} /><rect x={-14} y={-9} width={28} height={18} fill="#F3EEDF" stroke="#1F5236" strokeWidth={1.5} /></g>)}</g>);
  },
  goldbars: ({level}) => (<g>{[[0, 60], [-52, 60], [52, 60], [-26, 26], [26, 26], [0, -8]].slice(0, Math.round(6 * level)).map(([x, y], i) => <g key={i} transform={`translate(${x},${y})`}><polygon points="-44,14 -34,-14 34,-14 44,14" fill="url(#mGold)" stroke="#7A4E06" strokeWidth={2.5} /><polygon points="-34,-14 34,-14 30,-8 -30,-8" fill="#FFF3C4" opacity={0.7} /></g>)}</g>),
  cursor: () => (<g><path d="M0 0 L0 78 L20 60 L34 92 L48 86 L34 54 L60 54 Z" fill="#fff" stroke="#16161A" strokeWidth={5} strokeLinejoin="round" /></g>),
  button: ({t}) => (<g><rect x={-150} y={-44} width={300} height={104} rx={22} fill="#5E0E15" /><rect x={-150} y={-60} width={300} height={104} rx={22} fill="url(#mRed)" stroke="#5E0E15" strokeWidth={4} /><rect x={-136} y={-52} width={272} height={30} rx={14} fill="#fff" opacity={0.2} /><text y={10} textAnchor="middle" fontFamily={MONOB} fontSize={50} letterSpacing={6} fill="#fff">{t ?? 'SEND'}</text></g>),
  laptop: ({t}) => (<g><rect x={-150} y={-120} width={300} height={190} rx={12} fill="url(#mDark)" stroke="#0B0D10" strokeWidth={4} /><rect x={-134} y={-106} width={268} height={162} rx={4} fill="#0E1A26" /><rect x={-134} y={-106} width={268} height={162} rx={4} fill="url(#mSteel)" opacity={0.08} />{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-118} y={-90 + i * 26} width={[150, 220, 120, 190, 90][i]} height={10} rx={3} fill={i === 3 ? C.gold : '#4D6A86'} opacity={0.9} />)}<text x={0} y={42} textAnchor="middle" fontFamily={MONOB} fontSize={18} fill="#9FB6CC">{t ?? ''}</text><polygon points="-190,70 190,70 210,96 -210,96" fill="url(#mSteel)" stroke="#1B2027" strokeWidth={3} /></g>),
  person: () => (<g><circle cx={0} cy={-62} r={42} fill="url(#mSkin)" stroke="#0B0D10" strokeWidth={3} /><path d="M-86 96 V44 a86 70 0 0 1 172 0 V96 Z" fill="url(#mSkin)" stroke="#0B0D10" strokeWidth={3} /><path d="M-18 -22 L0 14 L18 -22" fill="#EFEADB" opacity={0.85} /></g>),
  envelope: () => (<g><rect x={-80} y={-52} width={160} height={104} rx={8} fill="url(#mPaper)" stroke="#6E6757" strokeWidth={3} /><path d="M-80 -46 L0 12 L80 -46" fill="none" stroke="#6E6757" strokeWidth={3} /></g>),
  document: ({t}) => (<g><rect x={-78} y={-104} width={156} height={208} rx={6} fill="url(#mPaper)" stroke="#6E6757" strokeWidth={3} />{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-58} y={-56 + i * 22} width={[116, 96, 110, 70, 104, 84][i]} height={7} rx={2} fill="#8C877A" opacity={0.7} />)}<text x={-58} y={-72} fontFamily={MONOB} fontSize={15} letterSpacing={2} fill="#3A362E">{t ?? 'WIRE TRANSFER'}</text></g>),
  gavel: () => (<g><rect x={-120} y={70} width={240} height={26} rx={8} fill="#5A3A1C" stroke="#2A1A0A" strokeWidth={3} /><g transform="rotate(-32)"><rect x={-18} y={-30} width={36} height={150} rx={10} fill="#7A5228" stroke="#2A1A0A" strokeWidth={3} /><rect x={-64} y={-76} width={128} height={62} rx={12} fill="#8D6233" stroke="#2A1A0A" strokeWidth={3} /><rect x={-64} y={-76} width={18} height={62} rx={6} fill="url(#mGold)" /><rect x={46} y={-76} width={18} height={62} rx={6} fill="url(#mGold)" /></g></g>),
  clock: ({f}) => (<g><circle r={100} fill="url(#mPaper)" stroke="#16161A" strokeWidth={7} />{Array.from({length: 12}, (_, i) => <rect key={i} x={-3} y={-90} width={6} height={i % 3 ? 10 : 20} fill="#16161A" transform={`rotate(${i * 30})`} />)}<rect x={-4} y={-66} width={8} height={72} rx={4} fill="#16161A" transform={`rotate(${f * 1.4})`} /><rect x={-2.5} y={-84} width={5} height={92} rx={2} fill={C.red} transform={`rotate(${f * 9})`} /><circle r={8} fill={C.red} /></g>),
  lock: ({open}) => (<g><path d={`M-40 -20 V-56 a40 40 0 0 1 80 0 V${-20 - open * 40}`} fill="none" stroke="url(#mSteel)" strokeWidth={18} strokeLinecap="round" /><rect x={-68} y={-24} width={136} height={110} rx={14} fill="url(#mGold)" stroke="#7A4E06" strokeWidth={4} /><circle cx={0} cy={22} r={13} fill="#3A2603" /><rect x={-5} y={24} width={10} height={30} rx={4} fill="#3A2603" /></g>),
  phone: ({t}) => (<g><rect x={-70} y={-130} width={140} height={260} rx={22} fill="url(#mDark)" stroke="#0B0D10" strokeWidth={4} /><rect x={-58} y={-112} width={116} height={224} rx={10} fill="#0E1A26" /><rect x={-44} y={-60} width={88} height={56} rx={8} fill={C.gold} opacity={0.95} /><text x={0} y={-24} textAnchor="middle" fontFamily={MONOB} fontSize={17} fill="#16161A">{t ?? 'ALERT'}</text></g>),
  briefcase: () => (<g><rect x={-34} y={-78} width={68} height={30} rx={10} fill="none" stroke="#2A1A0A" strokeWidth={9} /><rect x={-110} y={-56} width={220} height={140} rx={14} fill="#6B4320" stroke="#2A1A0A" strokeWidth={4} /><rect x={-110} y={-4} width={220} height={12} fill="#2A1A0A" opacity={0.6} /><rect x={-16} y={-10} width={32} height={26} rx={4} fill="url(#mGold)" stroke="#7A4E06" strokeWidth={2} /></g>),
  building: () => (<g><rect x={-80} y={-170} width={160} height={270} fill="url(#mDark)" stroke="#0B0D10" strokeWidth={4} />{Array.from({length: 30}, (_, i) => <rect key={i} x={-62 + (i % 5) * 27} y={-152 + Math.floor(i / 5) * 40} width={16} height={24} fill={random(`w${i}`) > 0.45 ? '#F6CF62' : '#232932'} opacity={0.9} />)}</g>),
  globe: ({f}) => (<g><circle r={100} fill="#10202E" stroke="#5E7C99" strokeWidth={4} />{[-60, -30, 0, 30, 60].map((a) => <ellipse key={a} rx={100 * Math.cos((a * Math.PI) / 180)} ry={100} fill="none" stroke="#5E7C99" strokeWidth={1.5} opacity={0.6} transform={`rotate(${90 + f * 0})`} />)}{[-50, 0, 50].map((y) => <ellipse key={y} cy={y} rx={Math.sqrt(10000 - y * y)} ry={14} fill="none" stroke="#5E7C99" strokeWidth={1.5} opacity={0.6} />)}</g>),
};
export const MOTION_OBJS = Object.keys(OBJ);

const BGS: Record<string, [string, string, string]> = {vault: ['#2A3442', '#0D1117', '#58708C'], desk: ['#3A2C1E', '#0F0C09', '#C98B3C'], city: ['#1B2A44', '#07090E', '#5E86C9'], court: ['#3A342A', '#0E0D0A', '#D9C48A'], void: ['#23262D', '#060608', '#8E99A8']};

export const MotionScene: React.FC<{sc: {from: number; to: number; bg?: string; actors?: Actor[]; ev: MEv[]}; f: number; id: string}> = ({sc, f}) => {
  const actors = sc.actors ?? [];
  const A = Object.fromEntries(actors.map((a) => [a.id, a]));
  const ev = sc.ev as MEv[];
  const [c1, c2, c3] = BGS[sc.bg ?? 'void'] ?? BGS.void;
  const k = (f - sc.from) / Math.max(1, sc.to - sc.from);
  // camera: starts wide and keeps pushing; 'cam' events travel to an actor
  let cx = 960, cy = 560, zoom = 1.16;
  const cams = ev.filter((e) => e.v === 'cam' && e.at <= f + 18);
  for (const c of cams) {
    const t = io(interpolate(f - (c.at - 6), [0, 22], [0, 1], cl));
    const tx = c.id && A[c.id] ? A[c.id].x : 960, ty = c.id && A[c.id] ? A[c.id].y : 540, tz = c.zoom ?? (c.id ? 1.5 : 1);
    cx += (tx - cx) * t; cy += (ty - cy) * t; zoom += (tz - zoom) * t;
  }
  zoom *= 1 + 0.06 * k;
  const hitShake = ev.filter((e) => ['press', 'stamp', 'shake', 'cross'].includes(e.v) && f >= e.at && f < e.at + 7).map((e) => 1 - (f - e.at) / 7).reduce((a, b) => Math.max(a, b), 0);
  const shx = Math.sin(f * 2.7) * 10 * hitShake, shy = Math.cos(f * 3.3) * 8 * hitShake;
  const focus = [...cams].reverse().find((c) => c.id && c.at <= f)?.id;
  const fz = focus && A[focus] ? A[focus].z ?? 0.5 : 0.5;

  const state = (a: Actor) => {
    const mine = ev.filter((e) => e.id === a.id || (e.v === 'press' && e.to === a.id));
    const ein = mine.find((e) => e.v === 'in');
    const eout = mine.find((e) => e.v === 'out' && e.at <= f);
    let x = a.x, y = a.y, sc0 = a.s ?? 1, op = ein ? 0 : 1, rot = 0, skew = 0, sy = 1;
    if (ein && f >= ein.at) {
      const p = sp(f, ein.at, ein.from === 'drop' ? 8 : 12, ein.from === 'pop' || !ein.from ? 200 : 150);
      op = Math.min(1, (f - ein.at) / 3);
      const far = 1 - p;
      if (ein.from === 'left') { x -= 900 * far; skew = -18 * far; }
      else if (ein.from === 'right') { x += 900 * far; skew = 18 * far; }
      else if (ein.from === 'top' || ein.from === 'drop') y -= 800 * far;
      else if (ein.from === 'bottom') y += 700 * far;
      else sc0 *= p;
    }
    // the cursor travels to its target and presses
    for (const e of ev.filter((e) => e.v === 'press' && e.id === a.id)) {
      const tg = e.to ? A[e.to] : undefined;
      if (!tg) continue;
      const t = io(interpolate(f, [e.at - 12, e.at], [0, 1], cl));
      x += (tg.x + 30 - x) * t; y += (tg.y + 10 - y) * t;
      sc0 *= 1 - 0.14 * Math.max(0, 1 - Math.abs(f - e.at) / 3);
    }
    for (const e of ev.filter((e) => e.v === 'press' && e.to === a.id)) sy *= 1 - 0.16 * Math.max(0, 1 - Math.abs(f - e.at - 1) / 4);
    const sh = mine.filter((e) => e.v === 'shake' && f >= e.at && f < e.at + 14).length ? 1 : 0;
    if (sh) { x += Math.sin(f * 4.1) * 12; rot += Math.sin(f * 3.3) * 5; }
    if (eout) { const t = ez(interpolate(f - eout.at, [0, 9], [0, 1], cl)); op *= 1 - t; sc0 *= 1 - 0.3 * t; y += 60 * t; }
    const dr = mine.find((e) => e.v === 'drain'), gr = mine.find((e) => e.v === 'grow'), opn = mine.find((e) => e.v === 'open');
    let level = gr ? 0 : 1;
    if (gr) level = ez(interpolate(f - gr.at, [0, 26], [0, 1], cl));
    if (dr) level = 1 - io(interpolate(f - dr.at, [0, 36], [0, 1], cl));
    const open = opn ? io(interpolate(f - opn.at, [0, 26], [0, 1], cl)) : 0;
    return {x, y, s: sc0, op, rot, skew, sy, level, open};
  };

  const world = (z: number) => `translate(${960 + shx}px, ${540 + shy}px) scale(${zoom}) translate(${-(cx) * (0.75 + 0.5 * z) - 960 * (0.25 - 0.5 * z)}px, ${-(cy) * (0.75 + 0.5 * z) - 540 * (0.25 - 0.5 * z)}px)`;
  const blur = (z: number) => Math.min(9, Math.abs(z - fz) * 10 + (zoom > 1.25 ? Math.abs(z - fz) * 6 : 0));
  const sorted = [...actors].sort((a, b) => (a.z ?? 0.5) - (b.z ?? 0.5));
  const flies = ev.filter((e) => e.v === 'fly' && e.from && e.to && A[e.from] && A[e.to]);

  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 38%, ${c1} 0%, ${c2} 72%)`, overflow: 'hidden'}}>
      {/* back wall + floor */}
      <AbsoluteFill style={{transform: world(0), transformOrigin: '0 0', filter: 'blur(3px)'}}>
        <svg width={1920} height={1080} style={{overflow: 'visible'}}>
          {Array.from({length: 15}, (_, i) => <rect key={i} x={-600 + i * 220} y={-300} width={3} height={1100} fill={c3} opacity={0.1} />)}
          <rect x={-900} y={760} width={3700} height={900} fill="#000" opacity={0.42} /><rect x={-900} y={758} width={3700} height={3} fill={c3} opacity={0.35} />
          {sc.bg === 'city' ? Array.from({length: 16}, (_, i) => <g key={i}><rect x={-300 + i * 160} y={760 - 200 - random(`b${i}`) * 380} width={130} height={600} fill="#0A0F18" />{Array.from({length: 10}, (_, j) => <rect key={j} x={-285 + i * 160 + (j % 3) * 38} y={760 - 180 - random(`b${i}`) * 380 + Math.floor(j / 3) * 50} width={16} height={22} fill="#F6CF62" opacity={random(`w${i}-${j}`) > 0.5 ? 0.55 : 0.06} />)}</g>) : null}
          {sc.bg === 'court' ? [200, 560, 1360, 1720].map((x) => <rect key={x} x={x - 45} y={-200} width={90} height={960} fill={c3} opacity={0.12} />) : null}
        </svg>
      </AbsoluteFill>
      {/* light cone */}
      <AbsoluteFill style={{background: `radial-gradient(ellipse 46% 70% at ${50 + 3 * Math.sin(f / 70)}% 0%, ${c3}55 0%, transparent 70%)`, mixBlendMode: 'screen'}} />
      {sorted.map((a) => {
        const s = state(a), z = a.z ?? 0.5;
        if (s.op <= 0) return null;
        const mine = ev.filter((e) => e.id === a.id && e.at <= f);
        const glow = [...mine].reverse().find((e) => e.v === 'glow');
        const stamp = mine.find((e) => e.v === 'stamp'), cross = mine.find((e) => e.v === 'cross'), label = [...mine].reverse().find((e) => e.v === 'label'), count = [...mine].reverse().find((e) => e.v === 'count');
        const ripples = ev.filter((e) => e.v === 'press' && e.to === a.id && f >= e.at && f < e.at + 22);
        const gcol = glow ? ({red: C.red, gold: C.gold, green: C.green2} as Record<string, string>)[glow.color ?? 'gold'] ?? C.gold : '';
        return (
          <AbsoluteFill key={a.id} style={{transform: world(z), transformOrigin: '0 0', filter: blur(z) > 0.6 ? `blur(${blur(z)}px)` : undefined}}>
            <svg width={1920} height={1080} style={{overflow: 'visible'}}>
              <G />
              <ellipse cx={s.x} cy={a.y + 118 * (a.s ?? 1)} rx={130 * s.s} ry={20 * s.s} fill="#000" opacity={0.5 * s.op * (a.obj === 'cursor' ? 0 : 1)} />
              <g transform={`translate(${s.x},${s.y + Math.sin((f + a.x) / 26) * 4}) rotate(${s.rot}) skewX(${s.skew}) scale(${s.s * (a.flip ? -1 : 1)},${s.s * s.sy})`} opacity={s.op}>
                {glow ? <circle r={190} fill={gcol} opacity={0.28 + 0.12 * Math.sin(f / 5)} style={{filter: 'blur(40px)'}} /> : null}
                {(OBJ[a.obj] ?? OBJ.document)({level: s.level, open: s.open, t: a.t, f})}
                {cross ? (() => { const d = interpolate(f - cross.at, [0, 8], [0, 1], cl); return <g stroke={C.red} strokeWidth={20} strokeLinecap="round"><line x1={-110} y1={-110} x2={-110 + 220 * Math.min(1, d * 2)} y2={-110 + 220 * Math.min(1, d * 2)} />{d > 0.5 ? <line x1={110} y1={-110} x2={110 - 220 * (d * 2 - 1)} y2={-110 + 220 * (d * 2 - 1)} /> : null}</g>; })() : null}
              </g>
              {ripples.map((e, i) => { const t = (f - e.at) / 22; return <circle key={i} cx={a.x} cy={a.y} r={60 + 420 * ez(t)} fill="none" stroke="#fff" strokeWidth={10 * (1 - t)} opacity={0.8 * (1 - t)} />; })}
              {stamp ? <g transform={`translate(${s.x},${s.y}) rotate(-9) scale(${interpolate(f - stamp.at, [0, 5], [2.6, 1], cl) * s.s})`} opacity={interpolate(f - stamp.at, [0, 2], [0, 1], cl)}><rect x={-150} y={-42} width={300} height={84} rx={8} fill="rgba(10,10,12,.55)" stroke={stamp.color === 'green' ? C.green2 : '#F0535D'} strokeWidth={8} /><text y={16} textAnchor="middle" fontFamily={MONOB} fontSize={46} letterSpacing={5} fill={stamp.color === 'green' ? C.green2 : '#F0535D'}>{stamp.t}</text></g> : null}
              {label ? <g transform={`translate(${s.x},${a.y + 170 * (a.s ?? 1)})`} opacity={interpolate(f - label.at, [0, 5], [0, 1], cl)}><rect x={-(label.t ?? '').length * 11 - 22} y={-26 + 10 * (1 - ez(interpolate(f - label.at, [0, 7], [0, 1], cl)))} width={(label.t ?? '').length * 22 + 44} height={52} fill="#F4F1E8" /><rect x={-(label.t ?? '').length * 11 - 22} y={-26} width={8} height={52} fill={C.gold} /><text y={11} textAnchor="middle" fontFamily={MONOB} fontSize={30} letterSpacing={3} fill="#16161A">{label.t}</text></g> : null}
              {count ? <text x={s.x} y={a.y - 190 * (a.s ?? 1)} textAnchor="middle" fontFamily={MONOB} fontSize={76} fill={count.color === 'red' ? '#F0535D' : '#F4F1E8'} style={{filter: 'drop-shadow(0 6px 24px rgba(0,0,0,.9))'}}>{(count.prefix ?? '') + Math.round((count.n ?? 0) * ez(interpolate(f - count.at, [0, 34], [0, 1], cl))).toLocaleString('en-US') + (count.suffix ?? '')}</text> : null}
            </svg>
          </AbsoluteFill>
        );
      })}
      {/* things flying A → B on arcs, with trails */}
      <AbsoluteFill style={{transform: world(0.6), transformOrigin: '0 0'}}>
        <svg width={1920} height={1080} style={{overflow: 'visible'}}>
          <G />
          {flies.map((e, fi) => Array.from({length: e.n ?? 12}, (_, i) => {
            const a = A[e.from!], b = A[e.to!], t0 = e.at + i * 2, T = 20;
            if (f < t0 || f > t0 + T) return null;
            return [0.16, 0.08, 0].map((lag, gi) => {
              const t = Math.max(0, (f - t0) / T - lag), u = io(t), r = random(`fl${fi}-${i}`);
              const mx = (a.x + b.x) / 2 + (r - 0.5) * 160, my = Math.min(a.y, b.y) - 220 - r * 160;
              const x = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * mx + u * u * b.x, y = (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * my + u * u * b.y;
              return <g key={`${fi}-${i}-${gi}`} transform={`translate(${x},${y}) rotate(${r * 360 + t * 420}) scale(${0.75 + 0.4 * Math.sin(Math.PI * u)})`} opacity={gi === 2 ? 1 : 0.25 + gi * 0.15}>{e.obj === 'coin' ? <Coin /> : e.obj === 'doc' ? <rect x={-22} y={-30} width={44} height={60} rx={3} fill="url(#mPaper)" stroke="#6E6757" strokeWidth={2} /> : <Bill />}</g>;
            });
          }))}
        </svg>
      </AbsoluteFill>
      {/* dust in the light, nearest layer out of focus */}
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <svg width={1920} height={1080}>{Array.from({length: 46}, (_, i) => { const r = random(`d${i}`), r2 = random(`e${i}`), near = i % 5 === 0; return <circle key={i} cx={(r * 1920 + f * (0.3 + r2) * (near ? 2.2 : 0.7)) % 1920} cy={(r2 * 1080 + Math.sin((f + i * 30) / 40) * 24 - f * 0.25 * (near ? 2 : 1) + 2160) % 1080} r={near ? 7 + r * 9 : 1.6 + r * 2} fill="#fff" opacity={near ? 0.05 : 0.1 + 0.14 * Math.abs(Math.sin((f + i * 20) / 30))} style={near ? {filter: 'blur(5px)'} : undefined} />; })}</svg>
      </AbsoluteFill>
      {void SERIF}
    </AbsoluteFill>
  );
};
