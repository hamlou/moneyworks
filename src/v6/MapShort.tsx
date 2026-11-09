import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Easing, Img, Loop, OffthreadVideo, Sequence, getStaticFiles, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {geoArea, geoBounds, geoCentroid, geoGraticule10, geoInterpolate, geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import topo from 'world-atlas/countries-50m.json';
import {ANTON, UI, K, snap} from './kit';
import {Music, MSeg} from './kit2';
import {Sfx, Cue} from '../fx';
import {ISO3, ISO3_NAME, SHORT} from './mapIso';

// MAP SHORT (1080x1920): Natural Earth 1:50m world map (world-atlas, public domain) + camera moves per beat + flat vector FX + Dave slot.
// plan = src/v6/maps/<id>.plan.json written by tools/mapshort.py build <id>

export type MapStyle = 'gone' | 'loss' | 'win' | 'neutral';
export type MapFx = {type: string; from?: string; to?: string; at: number; end: number};
export type MapBeat = {from: number; to: number; say: string; text?: string; focus: string; highlight: string[]; style: MapStyle; dave?: string; fx: MapFx[]};
export type DaveMedia = {src: string; kind: 'webm' | 'png'; len?: number};
export type MapPlan = {id: string; title?: string; w?: number; h?: number; frames: number; voice?: string; beats: MapBeat[]; music: MSeg[]; sfx: Cue[]; dave?: Record<string, DaveMedia>};

const W = 1080;
const H = 1920;
const FIT = {cx: 540, cy: 720, w: 900, h: 700}; // focus box = upper 60 % (Dave owns the bottom 35 %)
const MOVE = 18; // camera move 0.6 s
const OCEAN_TOP = '#0B1A33';
const OCEAN_BOT = '#050B17';
const LAND = '#E4E1D8';
const BORDER = '#8A93A3';
const COL: Record<MapStyle, string> = {win: K.green, loss: K.red, gone: '#0A0D14', neutral: K.yellow};
const PILL: Record<MapStyle, string> = {win: K.green, loss: K.red, gone: '#1B1F29', neutral: K.yellow};

// ───────── geography (computed once per bundle) ─────────
type Pt = [number, number];
type Country = {iso: string; name: string; d: string; area: number; b: [Pt, Pt]; c: Pt; ll: Pt};
const proj = geoMercator().scale(W / (2 * Math.PI)).translate([0, 0]).precision(0.3);
const gpath = geoPath(proj);
const NUM2ISO: Record<string, string> = Object.fromEntries(Object.entries(ISO3).map(([a, n]) => [n, a]));
const NAME2ISO: Record<string, string> = Object.fromEntries(Object.entries(ISO3_NAME).map(([a, n]) => [n, a]));

const COUNTRIES_BY: {v: Record<string, Country>} = {v: {}};
const COUNTRIES: Country[] = (() => {
  const fc = feature(topo as any, (topo as any).objects.countries) as any;
  const by: Record<string, Country> = {};
  const out: Country[] = [];
  for (const ft of fc.features) {
    if (ft.id === '010' || !ft.geometry) continue; // no Antarctica (Mercator blows it up)
    const iso = NUM2ISO[ft.id] ?? NAME2ISO[ft.properties?.name] ?? `N${out.length}`;
    const g = ft.geometry;
    const polys: any[] = g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates];
    const areas = polys.map((p) => geoArea({type: 'Polygon', coordinates: p} as any));
    const big = Math.max(...areas);
    const main = {type: 'MultiPolygon', coordinates: polys.filter((_, i) => areas[i] >= big * 0.25)} as any; // mainland (USA w/o Alaska, France w/o Guiana)
    const largest = {type: 'Polygon', coordinates: polys[areas.indexOf(big)]} as any;
    const gb = geoBounds(main);
    const b = (gb[0][0] > gb[1][0] ? [proj([gb[0][0], gb[1][1]]), proj([180, gb[0][1]])] : gpath.bounds(main)) as [Pt, Pt]; // crosses the antimeridian (Russia, Fiji): keep the west side
    const ll = geoCentroid(largest) as Pt;
    const c: Country = {iso, name: ft.properties?.name ?? iso, d: gpath(ft) ?? '', area: areas.reduce((x, y) => x + y, 0), b, c: proj(ll) as Pt, ll};
    out.push(c);
    if (!by[iso] || by[iso].area < c.area) by[iso] = c;
  }
  COUNTRIES_BY.v = by;
  return out;
})();
const country = (iso?: string): Country | undefined => (iso ? COUNTRIES_BY.v[iso.toUpperCase()] : undefined);
const GRATICULE = gpath(geoGraticule10()) ?? '';
const WORLD_B: [Pt, Pt] = [proj([-180, 84]) as Pt, proj([180, -58]) as Pt];

// ───────── camera ─────────
type Cam = {x: number; y: number; k: number};
const fitCam = (b: [Pt, Pt], world: boolean): Cam => {
  const bw = Math.max(1e-3, b[1][0] - b[0][0]);
  const bh = Math.max(1e-3, b[1][1] - b[0][1]);
  const k = world ? 1060 / bw : Math.min(FIT.w / bw, FIT.h / bh);
  return {x: (b[0][0] + b[1][0]) / 2, y: (b[0][1] + b[1][1]) / 2, k: Math.max(0.9, Math.min(40, k))};
};
const targetOf = (focus: string): Cam => {
  const c = focus && focus.toUpperCase() !== 'WORLD' ? country(focus) : undefined;
  return c ? fitCam(c.b, false) : fitCam(WORLD_B, true);
};
const drift = (t: Cam, n: number, i: number): Cam => {
  const dir = i % 2 ? -1 : 1;
  return {x: t.x + (dir * n * 0.22) / t.k, y: t.y + (Math.sin(n / 45 + i) * 5) / t.k, k: t.k * (1 + 0.0009 * n)}; // slow push + drift: never frozen
};
const overshoot = Easing.bezier(0.5, 0, 0.2, 1.08);

type Seg = {from: number; i: number; cam: Cam};
const segments = (beats: MapBeat[]): Seg[] => {
  const segs: Seg[] = [];
  beats.forEach((b, i) => {
    const key = (b.focus || 'WORLD').toUpperCase();
    if (i === 0 || key !== (beats[i - 1].focus || 'WORLD').toUpperCase()) segs.push({from: b.from, i, cam: targetOf(key)});
  });
  return segs;
};
const cameraAt = (f: number, segs: Seg[]): Cam => {
  let s = 0;
  while (s + 1 < segs.length && f >= segs[s + 1].from) s++;
  const n = f - segs[s].from;
  const cur = drift(segs[s].cam, n, s);
  if (s === 0 || n >= MOVE) return cur;
  const prev = drift(segs[s - 1].cam, segs[s].from - segs[s - 1].from, s - 1);
  const p = Math.min(1, Math.max(0, n / MOVE));
  const e = overshoot(p);
  const d = Math.hypot(cur.x - prev.x, cur.y - prev.y) * Math.min(cur.k, prev.k);
  const bump = Math.min(1.1, Math.max(0, Math.log(d / 700) * 0.6)) * Math.sin(Math.PI * p); // fly out a bit on long hops
  const lk = Math.log(prev.k) + (Math.log(cur.k) - Math.log(prev.k)) * e - bump;
  return {x: prev.x + (cur.x - prev.x) * e, y: prev.y + (cur.y - prev.y) * e, k: Math.exp(lk)};
};
const toScreen = (cam: Cam, p: Pt): Pt => [(p[0] - cam.x) * cam.k + FIT.cx, (p[1] - cam.y) * cam.k + FIT.cy];

// ───────── map layers ─────────
const Land = React.memo(() => (
  <g>
    <path d={GRATICULE} fill="none" stroke="rgba(140,180,255,0.10)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    {COUNTRIES.map((c, i) => (
      <path key={i} d={c.d} fill={LAND} stroke={BORDER} strokeWidth={0.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    ))}
  </g>
));

const Highlights: React.FC<{f: number; b: MapBeat; cam: Cam}> = ({f, b, cam}) => {
  const t = f - b.from;
  const a = b.from === 0 ? 1 : Math.min(1, t / 6);
  const pulse = 0.7 + 0.3 * Math.sin(f / 5);
  const fades = b.fx.filter((x) => x.type === 'fade_country' && f >= x.at);
  return (
    <>
      {b.highlight.map((iso) => {
        const c = country(iso);
        if (!c) return null;
        if (b.style === 'gone') {
          const g = b.from === 0 ? 1 : Math.min(1, t / 24);
          return (
            <g key={iso}>
              <path d={c.d} fill={COL.gone} opacity={g * 0.92} />
              <path d={c.d} fill="none" stroke="#fff" strokeWidth={2.5} strokeDasharray="7 7" strokeDashoffset={-f * 0.6} vectorEffect="non-scaling-stroke" opacity={g} />
            </g>
          );
        }
        return (
          <g key={iso}>
            <path d={c.d} fill={COL[b.style]} stroke={COL[b.style]} strokeWidth={22} vectorEffect="non-scaling-stroke" opacity={0.45 * pulse * a} filter="url(#mglow)" />
            <path d={c.d} fill={COL[b.style]} stroke="#fff" strokeWidth={2.5} vectorEffect="non-scaling-stroke" opacity={0.92 * a} />
          </g>
        );
      })}
      {fades.map((x, i) => {
        const c = country(x.from || b.focus);
        if (!c) return null;
        const p = Math.min(1, (f - x.at) / 30);
        return (
          <g key={`fd${i}`}>
            <path d={c.d} fill={OCEAN_TOP} opacity={p} />
            <path d={c.d} fill="none" stroke="#fff" strokeWidth={2} strokeDasharray="4 8" vectorEffect="non-scaling-stroke" opacity={p * 0.8} />
          </g>
        );
      })}
      <defs>
        <filter id="mglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={14 / cam.k} />
        </filter>
      </defs>
    </>
  );
};

// ───────── FX shapes (flat vector, no emoji fonts) ─────────
const arcPts = (cam: Cam, a: Pt, b: Pt, n = 48): Pt[] => {
  const ip = geoInterpolate(a, b);
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) pts.push(toScreen(cam, proj(ip(i / n)) as Pt));
  return pts;
};
const along = (pts: Pt[], u: number): {p: Pt; ang: number} => {
  const L: number[] = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const tgt = Math.max(0, Math.min(1, u)) * L[L.length - 1];
  let i = 1;
  while (i < pts.length - 1 && L[i] < tgt) i++;
  const s = (tgt - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
  const [x0, y0] = pts[i - 1];
  const [x1, y1] = pts[i];
  return {p: [x0 + (x1 - x0) * s, y0 + (y1 - y0) * s], ang: (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI};
};
const pop = (t: number, d = 0) => interpolate(t - d, [0, 5, 9], [0, 1.18, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Drop: React.FC = () => (
  <g>
    <path d="M0,-16 C7,-4 11,3 11,8 A11,11 0 0 1 -11,8 C-11,3 -7,-4 0,-16Z" fill="#111" stroke="#000" strokeWidth={2} />
    <ellipse cx={-4} cy={5} rx={2.5} ry={4} fill="#555" />
  </g>
);
const Derrick: React.FC<{t: number}> = ({t}) => {
  const r = Math.sin(t / 6) * 14;
  return (
    <g>
      <rect x={-60} y={40} width={120} height={12} rx={3} fill="#2A2D33" />
      <path d="M-30,40 L0,-28 L30,40" fill="none" stroke="#2A2D33" strokeWidth={9} strokeLinejoin="round" />
      <path d="M-18,14 L18,14" stroke="#2A2D33" strokeWidth={6} />
      <g transform={`translate(0,-28) rotate(${r})`}>
        <rect x={-70} y={-8} width={120} height={16} rx={5} fill="#FFB020" stroke="#000" strokeWidth={3} />
        <path d="M50,-14 Q72,0 50,22 L44,22 L44,-14Z" fill="#FFB020" stroke="#000" strokeWidth={3} />
        <rect x={-82} y={-14} width={18} height={30} rx={4} fill="#2A2D33" />
      </g>
      <line x1={58} y1={-20 + r * 1.6} x2={58} y2={40} stroke="#111" strokeWidth={3} />
      <circle cx={0} cy={-28} r={7} fill="#111" />
    </g>
  );
};
const Wheat: React.FC = () => (
  <g>
    <path d="M0,40 C2,10 -2,-10 0,-40" stroke="#B8860B" strokeWidth={4} fill="none" />
    {[-30, -18, -6, 6, 18].map((y, i) => (
      <g key={i}>
        <ellipse cx={-8} cy={y} rx={6} ry={11} fill="#F2C14E" stroke="#8A5A00" strokeWidth={2} transform={`rotate(-28 -8 ${y})`} />
        <ellipse cx={8} cy={y} rx={6} ry={11} fill="#F2C14E" stroke="#8A5A00" strokeWidth={2} transform={`rotate(28 8 ${y})`} />
      </g>
    ))}
    <ellipse cx={0} cy={-42} rx={5} ry={10} fill="#F2C14E" stroke="#8A5A00" strokeWidth={2} />
  </g>
);
const Corn: React.FC = () => (
  <g>
    <ellipse cx={0} cy={-6} rx={14} ry={32} fill="#FFD43B" stroke="#8A5A00" strokeWidth={3} />
    {[-20, -8, 4, 16].map((y) => <line key={y} x1={-12} y1={y} x2={12} y2={y} stroke="#C99A00" strokeWidth={2} />)}
    <path d="M-4,34 C-30,10 -26,-20 -14,-30 C-16,0 -8,20 0,30Z" fill="#3FA34D" stroke="#1E5E2A" strokeWidth={2} />
    <path d="M4,34 C30,10 26,-20 14,-30 C16,0 8,20 0,30Z" fill="#4CBB5A" stroke="#1E5E2A" strokeWidth={2} />
  </g>
);
const Ship: React.FC<{t: number}> = ({t}) => (
  <g transform={`translate(0,${Math.sin(t / 5) * 3}) rotate(${Math.sin(t / 7) * 3})`}>
    <path d="M-70,0 L70,0 L52,26 L-58,26Z" fill="#C8102E" stroke="#000" strokeWidth={3} />
    <rect x={-70} y={-4} width={140} height={6} fill="#1D2B44" />
    {[['#3DB8F5', -60], ['#FFD400', -34], ['#5BE33B', -8], ['#FF7A1A', 18]].map(([c, x], i) => (
      <rect key={i} x={x as number} y={-26} width={24} height={20} fill={c as string} stroke="#000" strokeWidth={2} />
    ))}
    {[['#FF7A1A', -48], ['#3DB8F5', -22]].map(([c, x], i) => (
      <rect key={`u${i}`} x={x as number} y={-46} width={24} height={20} fill={c as string} stroke="#000" strokeWidth={2} />
    ))}
    <rect x={46} y={-40} width={18} height={36} fill="#F4F4F2" stroke="#000" strokeWidth={2} />
  </g>
);
const Bill: React.FC = () => (
  <g>
    <rect x={-38} y={-20} width={76} height={40} rx={4} fill="#4CAF50" stroke="#1B5E20" strokeWidth={3} />
    <rect x={-31} y={-13} width={62} height={26} rx={3} fill="none" stroke="#A5D6A7" strokeWidth={2} />
    <circle cx={0} cy={0} r={11} fill="#A5D6A7" />
    <text x={0} y={7} textAnchor="middle" fontFamily={ANTON} fontSize={20} fill="#1B5E20">$</text>
  </g>
);
const Chip: React.FC = () => (
  <g>
    {[-18, -6, 6, 18].map((p) => (
      <g key={p}>
        <rect x={p - 3} y={-38} width={6} height={10} fill="#C0C4CC" />
        <rect x={p - 3} y={28} width={6} height={10} fill="#C0C4CC" />
        <rect x={-38} y={p - 3} width={10} height={6} fill="#C0C4CC" />
        <rect x={28} y={p - 3} width={10} height={6} fill="#C0C4CC" />
      </g>
    ))}
    <rect x={-30} y={-30} width={60} height={60} rx={6} fill="#1E2430" stroke="#000" strokeWidth={3} />
    <rect x={-15} y={-15} width={30} height={30} rx={3} fill="#3DB8F5" stroke="#9BE1FF" strokeWidth={2} />
    <path d="M-15,-6 L-24,-6 M15,6 L24,6 M-6,15 L-6,24 M6,-15 L6,-24" stroke="#9BE1FF" strokeWidth={2} />
  </g>
);
const Factory: React.FC<{t: number}> = ({t}) => (
  <g>
    {[0, 1, 2, 3, 4].map((i) => {
      const u = ((t + i * 9) % 45) / 45;
      return <circle key={i} cx={34 + u * 26} cy={-70 - u * 90} r={10 + u * 22} fill="#9AA0AA" opacity={0.85 * (1 - u)} />;
    })}
    <rect x={24} y={-70} width={20} height={60} fill="#5A606B" stroke="#000" strokeWidth={3} />
    <path d="M-70,50 L-70,-10 L-40,-30 L-40,-10 L-10,-30 L-10,-10 L20,-30 L20,-10 L70,-10 L70,50Z" fill="#7B8190" stroke="#000" strokeWidth={3} strokeLinejoin="round" />
    {[-54, -26, 2, 34].map((x) => <rect key={x} x={x} y={10} width={18} height={16} fill="#FFD400" stroke="#000" strokeWidth={2} />)}
  </g>
);
const Pill: React.FC = () => (
  <g>
    <path d="M-32,-14 L0,-14 L0,14 L-32,14 A14,14 0 0 1 -32,-14Z" fill="#FF3B3B" stroke="#000" strokeWidth={3} />
    <path d="M0,-14 L32,-14 A14,14 0 0 1 32,14 L0,14Z" fill="#F4F4F2" stroke="#000" strokeWidth={3} />
    <rect x={-30} y={-9} width={20} height={4} rx={2} fill="#fff" opacity={0.6} />
  </g>
);
const Plane: React.FC = () => (
  <g>
    <path d="M44,0 C44,-6 36,-8 30,-8 L-36,-8 C-44,-8 -46,0 -46,0 C-46,0 -44,8 -36,8 L30,8 C36,8 44,6 44,0Z" fill="#F4F4F2" stroke="#000" strokeWidth={3} />
    <path d="M6,-6 L-14,-40 L-24,-40 L-12,-6Z M6,6 L-14,40 L-24,40 L-12,6Z" fill="#DDE1E7" stroke="#000" strokeWidth={3} strokeLinejoin="round" />
    <path d="M-34,-6 L-44,-24 L-50,-24 L-46,-4Z M-34,6 L-44,24 L-50,24 L-46,4Z" fill="#DDE1E7" stroke="#000" strokeWidth={2.5} />
    <path d="M34,-4 L40,-2 L40,2 L34,4Z" fill="#3DB8F5" />
  </g>
);
const Flame: React.FC<{t: number; seed: number}> = ({t, seed}) => {
  const s = 1 + Math.sin(t / 2.3 + seed * 3) * 0.12;
  return (
    <g transform={`scale(${s},${2 - s})`}>
      <path d="M0,-46 C18,-20 26,-6 26,10 A26,26 0 0 1 -26,10 C-26,-6 -12,-14 -6,-30 C-2,-18 4,-14 0,-46Z" fill="#FF5A1F" stroke="#7A1E00" strokeWidth={3} />
      <path d="M0,-18 C10,-4 14,4 14,12 A14,14 0 0 1 -14,12 C-14,4 -6,-4 0,-18Z" fill="#FFD43B" />
    </g>
  );
};
const ring = (n: number, r: number, seed: number): Pt[] =>
  Array.from({length: n}, (_, i) => {
    const a = (i / n) * Math.PI * 2 + random(`r${seed}-${i}`) * 0.6;
    const rr = r * (0.6 + random(`d${seed}-${i}`) * 0.5);
    return [Math.cos(a) * rr, Math.sin(a) * rr * 0.75] as Pt;
  });
const crackPaths = (seed: number): string[] =>
  Array.from({length: 7}, (_, i) => {
    let a = (i / 7) * Math.PI * 2 + random(`ca${seed}${i}`) * 0.5;
    let x = 0;
    let y = 0;
    let d = 'M0,0';
    for (let s = 0; s < 6; s++) {
      a += (random(`cj${seed}${i}${s}`) - 0.5) * 0.9;
      const l = 22 + random(`cl${seed}${i}${s}`) * 26;
      x += Math.cos(a) * l;
      y += Math.sin(a) * l;
      d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
    }
    return d;
  });

const FxItem: React.FC<{fx: MapFx; f: number; cam: Cam; focus: string; seed: number}> = ({fx, f, cam, focus, seed}) => {
  const t = f - fx.at;
  const dur = Math.max(1, fx.end - fx.at);
  const A = country(fx.from) ?? country(focus);
  const B = country(fx.to);
  const at: Pt = A ? toScreen(cam, A.c) : [FIT.cx, FIT.cy];
  const arc = A && B && A.iso !== B.iso ? arcPts(cam, A.ll, B.ll) : null;
  const G = (p: Pt, s: number, ch: React.ReactNode, rot = 0, k?: React.Key) => (
    <g key={k} transform={`translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${s.toFixed(3)})`}>{ch}</g>
  );
  const travel = (u: number, s: number, ch: React.ReactNode, k?: React.Key, rot = true) => {
    const {p, ang} = along(arc!, u);
    const flip = Math.abs(ang) > 90;
    return G(p, s, flip ? <g transform="scale(-1,1)">{ch}</g> : ch, rot ? (flip ? ang - 180 : ang) : 0, k);
  };
  const trail = arc && (
    <polyline points={arc.map((p) => p.join(',')).join(' ')} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={4} strokeDasharray="10 12" strokeDashoffset={-f * 2} strokeLinecap="round" />
  );
  const icons = (C: React.FC, n: number, r: number) => ring(n, r, seed).map((o, i) => G([at[0] + o[0], at[1] + o[1] - Math.sin((t + i * 7) / 9) * 6], pop(t, i * 4), <C />, 0, i));
  switch (fx.type) {
    case 'oil': {
      const drops = [0, 1, 2, 3, 4, 5].map((i) => {
        const u = ((t + i * 8) % 32) / 32;
        return G([at[0] - 40 + i * 16, at[1] + 30 + u * 110], (1 - u * 0.3) * pop(t, i * 2), <Drop />, 0, i);
      });
      return <g>{trail}{G([at[0] - 70, at[1] - 30], pop(t) * 0.8, <Derrick t={t} />)}{G([at[0] + 80, at[1] - 10], pop(t, 4) * 0.65, <Derrick t={t + 9} />)}{drops}</g>;
    }
    case 'grain':
    case 'food':
      return (
        <g>
          {trail}
          {ring(5, 120, seed).map((o, i) => G([at[0] + o[0], at[1] + o[1]], pop(t, i * 3), i % 2 && fx.type === 'food' ? <Corn /> : <Wheat />, Math.sin((t + i * 5) / 8) * 8, i))}
          {arc ? travel(Math.min(1, t / Math.min(dur, 75)), 0.9, <Ship t={t} />, 's') : G([at[0], at[1] + 120], pop(t, 6) * 0.9, <Ship t={t} />)}
        </g>
      );
    case 'money':
      if (arc) return <g>{trail}{[0, 1, 2, 3, 4, 5].map((i) => (t - i * 5 >= 0 ? travel(((t - i * 5) % 30) / 30, 1, <g transform={`rotate(${Math.sin((t + i * 4) / 3) * 25})`}><Bill /></g>, i, false) : null))}</g>;
      return <g>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const u = ((t + i * 4) % 36) / 36; const a = random(`m${seed}${i}`) * Math.PI * 2; return G([at[0] + Math.cos(a) * 160 * u, at[1] - 140 * Math.sin(Math.PI * u) + Math.sin(a) * 60 * u], pop(t, i * 2), <Bill />, (u * 360 + i * 40) % 360, i); })}</g>;
    case 'ship':
      return <g>{trail}{arc ? travel(Math.min(1, t / Math.min(dur, 90)), 1, <Ship t={t} />) : G([at[0], at[1] + 110], pop(t), <Ship t={t} />)}</g>;
    case 'plane':
      return <g>{trail}{arc ? travel(((t % 50) / 50), 1, <Plane />) : G([at[0] + Math.cos(t / 12) * 130, at[1] + Math.sin(t / 12) * 70], pop(t), <Plane />, (t / 12) * 57.3 + 90)}</g>;
    case 'chip':
      return <g>{trail}{icons(Chip, 5, 130)}{arc && t > 6 ? travel(((t - 6) % 40) / 40, 0.7, <Chip />, 'c', false) : null}</g>;
    case 'medicine':
      return <g>{trail}{ring(6, 125, seed).map((o, i) => G([at[0] + o[0], at[1] + o[1] - Math.sin((t + i * 6) / 9) * 8], pop(t, i * 3), <Pill />, i * 37 + t * 1.5, i))}</g>;
    case 'factory':
      return <g>{trail}{G([at[0], at[1]], pop(t) * 0.9, <Factory t={t} />)}{G([at[0] + 120, at[1] + 40], pop(t, 5) * 0.6, <Factory t={t + 20} />)}</g>;
    case 'fire':
      return <g>{ring(5, 110, seed).map((o, i) => G([at[0] + o[0], at[1] + o[1]], pop(t, i * 3) * (0.7 + random(`fs${seed}${i}`) * 0.5), <Flame t={t} seed={i} />, 0, i))}</g>;
    case 'arrow': {
      const pts = arc ?? [[at[0] - 200, at[1] + 60], [at[0], at[1]]] as Pt[];
      const u = Math.min(1, t / 16);
      const L = pts.length;
      const cut = pts.slice(0, Math.max(2, Math.ceil(u * (L - 1)) + 1));
      const tip = along(pts, u);
      return (
        <g>
          <polyline points={cut.map((p) => p.join(',')).join(' ')} fill="none" stroke="#000" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={cut.map((p) => p.join(',')).join(' ')} fill="none" stroke={K.yellow} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
          <g transform={`translate(${tip.p[0]},${tip.p[1]}) rotate(${tip.ang})`}>
            <path d="M-6,-34 L40,0 L-6,34Z" fill={K.yellow} stroke="#000" strokeWidth={6} strokeLinejoin="round" />
          </g>
        </g>
      );
    }
    case 'crack': {
      const u = Math.min(1, t / 14);
      return (
        <g transform={`translate(${at[0]},${at[1]})`}>
          {crackPaths(seed).map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="#000" strokeWidth={11} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - u} />
              <path d={d} fill="none" stroke="#fff" strokeWidth={4} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - u} />
            </g>
          ))}
        </g>
      );
    }
    default:
      return null;
  }
};

// "missing" crack on gone countries: automatic, on top of any fx
const GoneMark: React.FC<{f: number; b: MapBeat; cam: Cam}> = ({f, b, cam}) => (
  <>
    {b.style === 'gone' &&
      b.highlight.map((iso, k) => {
        const c = country(iso);
        if (!c) return null;
        const t = b.from === 0 ? 30 : f - b.from;
        const u = Math.min(1, Math.max(0, (t - 8) / 14));
        const [x, y] = toScreen(cam, c.c);
        return (
          <g key={iso} transform={`translate(${x},${y})`}>
            {crackPaths(k + 99).map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#FF3B3B" strokeWidth={5} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - u} />
            ))}
            <g transform={`rotate(-8) scale(${pop(t, 14)})`}>
              <rect x={-150} y={-42} width={300} height={84} rx={10} fill="none" stroke="#FF3B3B" strokeWidth={8} />
              <text x={0} y={28} textAnchor="middle" fontFamily={ANTON} fontSize={72} fill="#FF3B3B" letterSpacing={4}>MISSING</text>
            </g>
          </g>
        );
      })}
  </>
);

const Labels: React.FC<{f: number; b: MapBeat; cam: Cam}> = ({f, b, cam}) => (
  <>
    {b.highlight.slice(0, 3).map((iso, i) => {
      const c = country(iso);
      if (!c) return null;
      const [x0, y0] = toScreen(cam, c.b[0]);
      const [x1, y1] = toScreen(cam, c.b[1]);
      const name = (SHORT[c.iso] ?? c.name).toUpperCase();
      let y = Math.min(y1 + 50, 1150);
      if (y1 + 50 > 1150) y = Math.max(y0 - 50, 470);
      const x = Math.max(200, Math.min(880, (x0 + x1) / 2)) + i * 0;
      const s = b.from === 0 ? 1 : pop(f - b.from, 4 + i * 3);
      const fg = b.style === 'neutral' || b.style === 'win' ? '#111' : '#fff';
      return (
        <div key={iso} style={{position: 'absolute', left: x, top: y + i * 80, transform: `translate(-50%,-50%) scale(${s})`, background: PILL[b.style], color: fg, fontFamily: UI, fontWeight: 700, fontSize: 46, padding: '8px 30px', borderRadius: 999, border: '4px solid #000', boxShadow: '0 8px 20px rgba(0,0,0,0.5)', whiteSpace: 'nowrap', letterSpacing: 1}}>
          {name}
        </div>
      );
    })}
  </>
);

const BigText: React.FC<{f: number; b: MapBeat; i: number}> = ({f, b, i}) => {
  if (!b.text) return null;
  const n = b.text.length;
  const size = n <= 10 ? 160 : n <= 18 ? 145 : 130;
  const s = b.from === 0 ? 1 : interpolate(snap(f, b.from, 5), [0, 1], [1.35, 1]); // frame 0: fully shown already
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 130, display: 'flex', justifyContent: 'center', transform: `scale(${s})`, transformOrigin: '50% 30%'}}>
      <div style={{fontFamily: ANTON, fontSize: size, lineHeight: 1.02, textAlign: 'center', color: i % 2 ? K.white : K.yellow, WebkitTextStroke: '18px #000', paintOrder: 'stroke fill', textShadow: '0 10px 0 rgba(0,0,0,0.55)', textTransform: 'uppercase'}}>
        {b.text}
      </div>
    </div>
  );
};

// ───────── Dave slot ─────────
const POSES = ['talk', 'shock', 'point', 'laugh', 'shrug', 'cheer', 'think', 'worried'];
const DaveSlot: React.FC<{plan: MapPlan}> = ({plan}) => {
  const f = useCurrentFrame();
  const files = useMemo(() => {
    try {
      return new Set(getStaticFiles().map((x) => x.name.replace(/\\/g, '/')));
    } catch {
      return new Set<string>();
    }
  }, []);
  const media = (pose: string): DaveMedia | null => {
    const w = `${plan.id}/dave_${pose}.webm`;
    const p = `${plan.id}/dave_${pose}.png`;
    if (files.has(w)) return {src: w, kind: 'webm', len: plan.dave?.[pose]?.len};
    if (files.has(p)) return {src: p, kind: 'png'};
    return files.size ? null : plan.dave?.[pose] ?? null;
  };
  const runs: {from: number; to: number; pose: string}[] = [];
  plan.beats.forEach((b) => {
    const pose = POSES.includes(b.dave ?? '') ? b.dave! : 'talk';
    const last = runs[runs.length - 1];
    if (last && last.pose === pose) last.to = b.to;
    else runs.push({from: b.from, to: b.to, pose});
  });
  return (
    <>
      {runs.map((r, i) => {
        const m = media(r.pose);
        if (!m) return null;
        const t = f - r.from;
        const s = r.from === 0 ? 1 : interpolate(t, [0, 4, 8], [0.82, 1.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'contain', objectPosition: '50% 100%'};
        return (
          <Sequence key={i} from={r.from} durationInFrames={Math.max(1, r.to - r.from)} layout="none">
            <div style={{position: 'absolute', left: 140, width: 800, top: 1190, height: 730, transform: `scale(${s})`, transformOrigin: '50% 100%'}}>
              {m.kind === 'webm' ? (
                <Loop durationInFrames={Math.max(10, m.len ?? 120)} layout="none">
                  <OffthreadVideo src={staticFile(m.src)} transparent muted style={st} />
                </Loop>
              ) : (
                <Img src={staticFile(m.src)} style={st} />
              )}
            </div>
          </Sequence>
        );
      })}
    </>
  );
};

// ───────── composition ─────────
export const MapShort: React.FC<{plan: MapPlan}> = ({plan}) => {
  const f = useCurrentFrame();
  const segs = useMemo(() => segments(plan.beats), [plan]);
  let bi = 0;
  while (bi + 1 < plan.beats.length && f >= plan.beats[bi + 1].from) bi++;
  const b = plan.beats[bi];
  const cam = cameraAt(f, segs);
  const tr = `translate(${FIT.cx} ${FIT.cy}) scale(${cam.k}) translate(${-cam.x} ${-cam.y})`;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${OCEAN_TOP} 0%, #0A1730 55%, ${OCEAN_BOT} 100%)`, overflow: 'hidden'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id="mvig" cx="50%" cy="38%" r="75%">
            <stop offset="55%" stopColor="#000" stopOpacity={0} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.55} />
          </radialGradient>
        </defs>
        <g transform={tr}>
          <Land />
          <Highlights f={f} b={b} cam={cam} />
        </g>
        <GoneMark f={f} b={b} cam={cam} />
        {b.fx.filter((x) => f >= x.at && f < x.end).map((x, i) => (
          <FxItem key={`${bi}-${i}`} fx={x} f={f} cam={cam} focus={b.focus} seed={bi * 10 + i} />
        ))}
        <rect width={W} height={H} fill="url(#mvig)" />
      </svg>
      <Labels f={f} b={b} cam={cam} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 62%, rgba(0,0,0,0.6) 100%)'}} />
      <DaveSlot plan={plan} />
      <BigText f={f} b={b} i={bi} />
      {plan.voice ? <Audio src={staticFile(plan.voice)} /> : null}
      <Music segs={plan.music} />
      <Sfx cues={plan.sfx} />
    </AbsoluteFill>
  );
};
