import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {geoArea, geoCentroid, geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import topo from 'world-atlas/countries-50m.json';
import {ANTON, UI, K} from './kit';
import {Music, MSeg} from './kit2';
import {Sfx, Cue} from '../fx';
import {BigText, DaveSlot, MapPlan} from './MapShort';

// SCENE SHORT sal1 (1080x1920): "What if everyone could see your salary?" — plan src/v6/scenes/<id>.plan.json (tools/salshort.py)
// every visual hit is keyed to a spoken word: plan.cues[name] = frame of that word (FX lead already applied)

export type SBeat = {id: string; from: number; to: number; say: string; text?: string; scene: string; dave?: string; fx: never[]; highlight: string[]; focus: string; style: 'neutral'};
export type SalPlan = {id: string; w?: number; h?: number; frames: number; voice?: string | null; beats: SBeat[]; cues: Record<string, number>; music: MSeg[]; sfx: Cue[]; dave?: MapPlan['dave']};

const W = 1080;
const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const pop = (t: number, d = 0) => interpolate(t - d, [0, 5, 9], [0, 1.15, 1], CL);
const ease = (f: number, a: number, n: number) => interpolate(f, [a, a + n], [0, 1], {...CL, easing: Easing.bezier(0.2, 0.9, 0.2, 1)});
const money = (v: number, cur = '$') => (cur === 'kr' ? `${Math.round(v).toLocaleString('en-US')} kr` : `$${Math.round(v).toLocaleString('en-US')}`);
type SP = {f: number; c: (k: string) => number; b: SBeat};

// ───────── street (frame 0 + loop) ─────────
const PEOPLE = [
  {x: 160, y: 1000, s: 1.32, col: '#3D7BD9', pay: 38400, tag: K.yellow, dir: 1, ty: 545},
  {x: 410, y: 925, s: 1.08, col: '#8E5BD6', pay: 127000, tag: K.green, dir: -1, ty: 455},
  {x: 680, y: 945, s: 1.14, col: '#D9853D', pay: 52900, tag: K.yellow, dir: 1, ty: 470},
  {x: 925, y: 1015, s: 1.38, col: '#3DB89A', pay: 24800, tag: K.red, dir: -1, ty: 560},
];
const Building: React.FC<{x: number; w: number; h: number; seed: number}> = ({x, w, h, seed}) => {
  const rows = Math.floor(h / 70);
  const cols = Math.max(2, Math.floor(w / 62));
  return (
    <g>
      <rect x={x} y={760 - h} width={w} height={h} fill="#0F1830" />
      {Array.from({length: rows * cols}).map((_, i) => {
        const r = Math.floor(i / cols);
        const cc = i % cols;
        const on = random(`w${seed}-${i}`) > 0.55;
        return <rect key={i} x={x + 14 + cc * ((w - 28) / cols)} y={760 - h + 22 + r * 70} width={(w - 28) / cols - 16} height={36} rx={3} fill={on ? '#FFD87A' : '#1A2645'} opacity={on ? 0.85 : 1} />;
      })}
    </g>
  );
};
const Person: React.FC<{f: number; x: number; y: number; s: number; col: string; dir: number; i: number}> = ({f, x, y, s, col, dir, i}) => {
  const ph = f * 0.32 + i * 1.7;
  const bob = Math.abs(Math.sin(ph)) * 10;
  const swing = Math.sin(ph) * 16;
  const px = x + dir * Math.sin(f / 40 + i) * 14;
  return (
    <g transform={`translate(${px} ${y - bob}) scale(${s})`}>
      <ellipse cx={0} cy={250 + bob / s} rx={70} ry={14} fill="#000" opacity={0.35} />
      <g transform={`rotate(${swing} -18 150)`}><rect x={-34} y={150} width={30} height={100} rx={14} fill="#1B1E29" /></g>
      <g transform={`rotate(${-swing} 18 150)`}><rect x={4} y={150} width={30} height={100} rx={14} fill="#1B1E29" /></g>
      <rect x={-52} y={20} width={104} height={150} rx={40} fill={col} />
      <circle cx={0} cy={-22} r={44} fill="#F2C9A0" />
      <path d="M -44 -30 Q 0 -86 44 -30 Q 30 -52 0 -54 Q -30 -52 -44 -30 Z" fill="#2A1C14" />
    </g>
  );
};
const Tag: React.FC<{x: number; y: number; s: number; text: string; color: string; scale: number; glow?: number}> = ({x, y, s, text, color, scale, glow = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s * scale})`, background: '#0B0F1A', color, border: `5px solid ${color}`, borderRadius: 999, padding: '4px 22px', fontFamily: ANTON, fontSize: 60, letterSpacing: 1, whiteSpace: 'nowrap', boxShadow: `0 0 ${24 + glow * 40}px ${color}AA, 0 8px 0 rgba(0,0,0,0.5)`}}>
    {text}
  </div>
);
const StreetBg: React.FC<{f: number}> = ({f}) => (
  <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#060B1C" />
        <stop offset="100%" stopColor="#16244A" />
      </linearGradient>
      <radialGradient id="lamp" cx="50%" cy="0%" r="100%">
        <stop offset="0%" stopColor="#FFE7A8" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#FFE7A8" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#sky)" />
    {[[-20, 180, 420], [150, 230, 560], [370, 200, 470], [560, 260, 610], [810, 290, 500]].map(([x, w, h], i) => (
      <Building key={i} x={x} w={w} h={h} seed={i} />
    ))}
    <rect x={0} y={760} width={1080} height={1160} fill="#1D2233" />
    <rect x={0} y={760} width={1080} height={22} fill="#2C3348" />
    {[110, 970].map((x, i) => (
      <g key={i}>
        <rect x={x - 7} y={420} width={14} height={360} fill="#0A0E18" />
        <rect x={x - 34} y={404} width={68} height={22} rx={8} fill="#0A0E18" />
        <polygon points={`${x - 30},426 ${x + 30},426 ${x + 180},1000 ${x - 180},1000`} fill="url(#lamp)" opacity={0.55 + 0.05 * Math.sin(f / 7 + i)} />
        <circle cx={x} cy={430} r={14} fill="#FFE7A8" />
      </g>
    ))}
  </svg>
);
const Street: React.FC<SP & {mode: 'hook' | 'loop' | 'fade'}> = ({f, c, b, mode}) => {
  const t = f - b.from;
  const punch = mode === 'hook' ? interpolate(f - c('hook_salary'), [0, 4, 14], [0, 0.07, 0.04], CL) : 0;
  const k = 1 + t * 0.0009 + punch;
  return (
    <AbsoluteFill style={{transform: `scale(${k})`, transformOrigin: '50% 62%'}}>
      <StreetBg f={f} />
      <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        {PEOPLE.slice().sort((a, z) => a.y - z.y).map((p) => (
          <Person key={p.x} f={f} {...p} i={PEOPLE.indexOf(p)} />
        ))}
      </svg>
      {PEOPLE.map((p, i) => {
        const px = p.x + p.dir * Math.sin(f / 40 + i) * 14;
        const appear = mode === 'loop' ? pop(f - c(`loop_t${i}`)) : 1;
        const gone = mode === 'fade' ? 1 - ease(f, c('fade_number') + i * 3, 6) : 1;
        const q = mode === 'fade' && f >= c('fade_number') + i * 3 + 6;
        const roll = mode === 'hook' && i === 1 ? Math.min(1, t / 20) : 1;
        return gone > 0.01 || q ? (
          <Tag key={i} x={px} y={p.ty - Math.abs(Math.sin(f * 0.32 + i * 1.7)) * 10} s={1} scale={q ? pop(f - c('fade_number') - i * 3 - 6) : appear * gone} text={q ? '?' : money(p.pay * roll)} color={q ? K.grey : p.tag} />
        ) : null;
      })}
      <Tag x={540} y={1120} s={1.3} scale={mode === 'loop' ? pop(f - c('loop_dave')) : 1} text="$41,200" color={K.red} glow={mode === 'hook' ? interpolate(f - c('hook_salary'), [0, 6, 20], [0, 1, 0.3], CL) : 0.2} />
    </AbsoluteFill>
  );
};

// ───────── Norway (flag inside the country) ─────────
const NOR = (() => {
  const fc = feature(topo as any, (topo as any).objects.countries) as any;
  const ft = fc.features.find((x: any) => x.id === '578');
  const polys: any[] = ft.geometry.type === 'MultiPolygon' ? ft.geometry.coordinates : [ft.geometry.coordinates];
  const areas = polys.map((p) => geoArea({type: 'Polygon', coordinates: p} as any));
  const big = Math.max(...areas);
  const main = {type: 'Feature', geometry: {type: 'MultiPolygon', coordinates: polys.filter((p, i) => areas[i] >= big * 0.004 && (geoCentroid({type: 'Polygon', coordinates: p} as any) as number[])[1] < 71.5)}} as any;
  const proj = geoMercator().fitExtent([[170, 400], [910, 1150]], main);
  const gp = geoPath(proj);
  const [[x0, y0], [x1, y1]] = gp.bounds(main);
  return {d: gp(main) ?? '', x0, y0, x1, y1};
})();
const Norway: React.FC<SP> = ({f, c, b}) => {
  const t = f - b.from;
  const fill = ease(f, c('nor_norway'), 10);
  const s = interpolate(t, [0, 8], [0.6, 1], {...CL, easing: Easing.bezier(0.2, 1.4, 0.4, 1)});
  const {x0, y0, x1, y1} = NOR;
  const cw = (x1 - x0) * 0.09;
  const cx = x0 + (x1 - x0) * 0.33;
  const cy = y0 + (y1 - y0) * 0.6;
  const st = pop(f - c('nor_actually'));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1D2A52 0%, #0A0F22 70%)'}}>
      <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, transform: `scale(${s})`, transformOrigin: '540px 780px'}}>
        <defs>
          <clipPath id="norc"><path d={NOR.d} /></clipPath>
        </defs>
        <path d={NOR.d} fill="#E4E1D8" stroke="#000" strokeWidth={10} strokeLinejoin="round" />
        <g clipPath="url(#norc)" opacity={fill}>
          <rect x={0} y={0} width={1080} height={1920} fill="#BA0C2F" />
          <rect x={cx - cw * 1.6} y={0} width={cw * 3.2} height={1920} fill="#fff" />
          <rect x={0} y={cy - cw * 1.6} width={1080} height={cw * 3.2} fill="#fff" />
          <rect x={cx - cw * 0.8} y={0} width={cw * 1.6} height={1920} fill="#00205B" />
          <rect x={0} y={cy - cw * 0.8} width={1080} height={cw * 1.6} fill="#00205B" />
        </g>
        <path d={NOR.d} fill="none" stroke="#fff" strokeWidth={4} strokeLinejoin="round" opacity={0.8} />
      </svg>
      <div style={{position: 'absolute', left: 640, top: 900, transform: `translate(-50%,-50%) rotate(-12deg) scale(${st * (1 + 0.6 * (1 - Math.min(1, (f - c('nor_actually')) / 5)))})`, opacity: f >= c('nor_actually') ? 1 : 0, border: `12px solid ${K.green}`, color: K.green, fontFamily: ANTON, fontSize: 150, padding: '0 34px', borderRadius: 18, background: 'rgba(5,10,20,0.6)', letterSpacing: 6}}>
        REAL
      </div>
    </AbsoluteFill>
  );
};

// ───────── phone search ─────────
const Phone: React.FC<{x?: number; y?: number; s?: number; children: React.ReactNode}> = ({x = 540, y = 700, s = 1, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 560, height: 760, transform: `translate(-50%,-50%) scale(${s})`, background: '#0E1220', borderRadius: 70, border: '14px solid #2B3040', boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 3px #4A5166', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 205, top: 18, width: 122, height: 30, borderRadius: 20, background: '#000'}} />
    {children}
  </div>
);
const NAME = 'Kari Hansen';
const Search: React.FC<SP> = ({f, c, b}) => {
  const t = f - b.from;
  const rate = Math.max(1.6, (c('ph_pops') - c('ph_type') - 8) / NAME.length);
  const typed = Math.max(0, Math.min(NAME.length, Math.floor((f - c('ph_type')) / rate)));
  const res = pop(f - c('ph_pops'));
  const s = interpolate(t, [0, 7], [0.75, 1], {...CL, easing: Easing.bezier(0.2, 1.4, 0.4, 1)});
  const tilt = interpolate(t, [0, 60], [-4, 2], CL);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #233163 0%, #0A0F22 70%)'}}>
      <div style={{position: 'absolute', inset: 0, transform: `rotate(${tilt}deg)`}}>
        <Phone s={s * 1.05}>
          <div style={{position: 'absolute', left: 34, right: 34, top: 90, fontFamily: UI, fontWeight: 700, fontSize: 34, color: K.grey}}>Tax list search</div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 150, height: 92, borderRadius: 26, background: '#1E2436', border: `4px solid ${K.blue}`, display: 'flex', alignItems: 'center', padding: '0 26px', fontFamily: UI, fontWeight: 600, fontSize: 48, color: K.white}}>
            {NAME.slice(0, typed)}
            <span style={{opacity: Math.floor(f / 8) % 2 ? 1 : 0, color: K.blue}}>|</span>
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 290, height: 380, borderRadius: 30, background: '#F4F4F2', transform: `scale(${res})`, transformOrigin: '50% 0%', padding: 30, boxSizing: 'border-box'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 92, height: 92, borderRadius: 999, background: '#C9455B'}} />
              <div style={{fontFamily: UI, fontWeight: 700, fontSize: 40, color: '#111'}}>{NAME}<div style={{fontSize: 28, color: '#666', fontWeight: 500}}>born 1988 · Oslo</div></div>
            </div>
            <div style={{fontFamily: UI, fontWeight: 600, fontSize: 30, color: '#666', marginTop: 34}}>INCOME</div>
            <div style={{fontFamily: ANTON, fontSize: 88, color: '#111', lineHeight: 1, whiteSpace: 'nowrap'}}>{money(612000 * Math.min(1, Math.max(0, f - c('ph_pops')) / 14), 'kr')}</div>
            <div style={{fontFamily: UI, fontWeight: 600, fontSize: 30, color: '#2E8B3A'}}>≈ $57,000</div>
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

// ───────── boss / neighbor / ex ─────────
const CARDS = [
  {k: 'lk_boss', who: 'YOUR BOSS', pay: '$148,000', col: '#3D7BD9', rot: -6, y: 560},
  {k: 'lk_neighbor', who: 'YOUR NEIGHBOR', pay: '$63,500', col: '#D9853D', rot: 5, y: 800},
  {k: 'lk_ex', who: 'YOUR EX', pay: '$212,000', col: '#C9455B', rot: -4, y: 1040},
];
const Lookup: React.FC<SP> = ({f, c}) => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2A1E4A 0%, #0B0A18 70%)'}}>
    {CARDS.map((x, i) =>
      f < c(x.k) ? (
        <div key={`g${i}`} style={{position: 'absolute', left: 540, top: x.y, width: 860, height: 200, transform: `translate(-50%,-50%) rotate(${x.rot}deg)`, borderRadius: 34, border: '6px dashed #5A4F80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ANTON, fontSize: 110, color: '#5A4F80', opacity: 0.8 + 0.2 * Math.sin(f / 5 + i)}}>?</div>
      ) : null,
    )}
    {CARDS.map((x, i) => {
      const at = c(x.k);
      if (f < at) return null;
      const s = interpolate(f - at, [0, 3, 7], [2.2, 0.94, 1], CL);
      const ex = i === 2;
      return (
        <div key={i} style={{position: 'absolute', left: 540, top: x.y, width: 860, height: 200, transform: `translate(-50%,-50%) rotate(${x.rot}deg) scale(${s})`, background: '#F4F4F2', borderRadius: 34, border: '6px solid #000', boxShadow: '0 16px 0 rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', padding: '0 36px', gap: 30, boxSizing: 'border-box'}}>
          <div style={{width: 120, height: 120, borderRadius: 999, background: x.col, border: '5px solid #000'}} />
          <div style={{flex: 1}}>
            <div style={{fontFamily: UI, fontWeight: 700, fontSize: 40, color: '#555'}}>{x.who}</div>
            <div style={{fontFamily: ANTON, fontSize: 92, color: ex ? '#1E9B3A' : '#111', lineHeight: 1}}>{x.pay}</div>
          </div>
          {ex ? <div style={{fontFamily: ANTON, fontSize: 46, color: '#fff', background: K.red, borderRadius: 14, padding: '6px 16px', transform: `rotate(8deg) scale(${pop(f - at, 8)})`}}>MORE THAN YOU</div> : null}
        </div>
      );
    })}
  </AbsoluteFill>
);

// ───────── 16.5 million searches / 5 million people ─────────
const Count: React.FC<SP> = ({f, c}) => {
  const a = c('ct_sixteen');
  const v = 16500000 * Easing.out(Easing.cubic)(interpolate(f, [a, a + 34], [0, 1], CL));
  const blur = f < a + 34 ? (1 - (f - a) / 34) * 5 : 0;
  const pp = c('ct_five');
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #163A2C 0%, #07120D 70%)'}}>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: UI, fontWeight: 700, fontSize: 52, color: K.grey, letterSpacing: 4}}>SEARCHES IN ONE YEAR</div>
      <div style={{position: 'absolute', top: 540, width: '100%', textAlign: 'center', fontFamily: ANTON, fontSize: 196, color: K.green, filter: `blur(${blur}px)`, textShadow: `0 0 50px ${K.green}66`, transform: `scale(${f >= a + 34 ? 1 + 0.08 * Math.max(0, 1 - (f - a - 34) / 6) : 1})`}}>
        {Math.round(v).toLocaleString('en-US')}
      </div>
      {f >= pp ? (
        <div style={{position: 'absolute', top: 830, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${pop(f - pp)})`}}>
          <div style={{fontFamily: UI, fontWeight: 700, fontSize: 52, color: K.grey, letterSpacing: 4}}>PEOPLE IN NORWAY</div>
          <div style={{fontFamily: ANTON, fontSize: 150, color: K.white}}>5,100,000</div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ───────── happiness meters (rich vs poor) ─────────
const Gauge: React.FC<{x: number; label: string; v: number; col: string}> = ({x, label, v, col}) => {
  const ang = -90 + v * 180;
  return (
    <g transform={`translate(${x} 930)`}>
      <path d="M -190 0 A 190 190 0 0 1 190 0" fill="none" stroke="#2A2F3E" strokeWidth={46} />
      <path d="M -190 0 A 190 190 0 0 1 190 0" fill="none" stroke={col} strokeWidth={46} pathLength={1} strokeDasharray={`${v} 1`} />
      <g transform={`rotate(${ang})`}><rect x={-8} y={-170} width={16} height={170} rx={8} fill="#fff" /></g>
      <circle r={26} fill="#fff" />
      <text y={110} textAnchor="middle" fontFamily={ANTON} fontSize={78} fill="#fff" letterSpacing={3}>{label}</text>
      <g transform="translate(0 -250)">
        <circle r={62} fill={col} stroke="#000" strokeWidth={8} />
        <circle cx={-22} cy={-14} r={9} fill="#000" />
        <circle cx={22} cy={-14} r={9} fill="#000" />
        <path d={`M -30 ${22} Q 0 ${22 + (v - 0.5) * 90} 30 ${22}`} fill="none" stroke="#000" strokeWidth={9} strokeLinecap="round" />
      </g>
    </g>
  );
};
const Happy: React.FC<SP> = ({f, c}) => {
  const rich = 0.5 + 0.32 * ease(f, c('hp_happier'), 14);
  const poor = 0.5 - 0.32 * ease(f, c('hp_sadder'), 14);
  const scan = f >= c('hp_measured') && f < c('hp_paycheck') ? interpolate((f - c('hp_measured')) % 30, [0, 15, 30], [-260, 260, -260]) : null;
  const stamp = f >= c('hp_paycheck');
  const sa = f - c('hp_paycheck');
  const gap = f >= c('hp_sadder') + 16;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #22263A 0%, #0A0B12 72%)'}}>
      <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        <Gauge x={290} label="RICH" v={rich} col={rich > 0.55 ? K.green : K.yellow} />
        <Gauge x={790} label="POOR" v={poor} col={poor < 0.45 ? K.red : K.yellow} />
        {scan !== null ? (
          <g transform={`translate(${540 + scan} 760)`}>
            <circle r={90} fill="none" stroke="#fff" strokeWidth={16} />
            <circle r={90} fill="#3DB8F5" opacity={0.18} />
            <rect x={56} y={56} width={30} height={110} rx={12} fill="#fff" transform="rotate(-45 70 70)" />
          </g>
        ) : null}
      </svg>
      {stamp ? (
        <div style={{position: 'absolute', left: 540, top: 470, transform: `translate(-50%,-50%) rotate(-8deg) scale(${interpolate(sa, [0, 3, 7], [2, 0.95, 1], CL)})`, opacity: interpolate(f - c('hp_happier'), [0, 6], [1, 0], CL), background: '#F4F4F2', border: '6px solid #000', borderRadius: 20, padding: '14px 30px', fontFamily: ANTON, fontSize: 70, color: '#111', display: 'flex', gap: 22, alignItems: 'center'}}>
          PAYCHECK <span style={{color: '#fff', background: K.blue, padding: '0 18px', borderRadius: 10}}>NO CHANGE</span>
        </div>
      ) : null}
      {gap ? (
        <div style={{position: 'absolute', left: 540, top: 1110, transform: `translate(-50%,-50%) scale(${pop(f - c('hp_sadder') - 16)})`, fontFamily: ANTON, fontSize: 92, color: K.yellow, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', whiteSpace: 'nowrap'}}>
          HAPPINESS GAP +29%
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ───────── the new rule ─────────
const Rule: React.FC<SP> = ({f, c, b}) => {
  const slide = ease(f, b.from, 10);
  const g = f - c('ru_rule');
  const hit = interpolate(g, [-6, 0, 3], [-40, 10, 0], CL);
  return (
    <AbsoluteFill style={{background: '#07080D'}}>
      <div style={{position: 'absolute', left: 540, top: 800 + (1 - slide) * 700, width: 640, height: 640, transform: `translate(-50%,-50%) rotate(${-3 + slide * 2}deg) scale(${g >= 0 ? interpolate(g, [0, 3, 8], [1, 0.96, 1], CL) : 1})`, background: '#F2EEE3', borderRadius: 10, boxShadow: '0 30px 80px rgba(0,0,0,0.8)', padding: 50, boxSizing: 'border-box'}}>
        <div style={{fontFamily: ANTON, fontSize: 96, color: '#111', textAlign: 'center'}}>NEW RULE</div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{height: 22, borderRadius: 11, background: '#CFC8B6', margin: '26px 0', width: `${[100, 92, 96, 70, 84][i]}%`}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 760, top: 470, transform: `rotate(${hit}deg)`, transformOrigin: '90% 90%', opacity: f >= c('ru_rule') - 8 ? 1 : 0}}>
        <svg width={360} height={360} viewBox="0 0 360 360">
          <rect x={40} y={60} width={220} height={110} rx={24} fill="#7A4A26" stroke="#000" strokeWidth={8} />
          <rect x={210} y={140} width={34} height={210} rx={14} fill="#5C3519" stroke="#000" strokeWidth={8} transform="rotate(-35 227 145)" />
        </svg>
      </div>
      {g >= 0 && g < 3 ? <AbsoluteFill style={{background: '#fff', opacity: 0.6 - g * 0.2}} /> : null}
    </AbsoluteFill>
  );
};

// ───────── "they can see your name" notification ─────────
const Notif: React.FC<SP> = ({f, c, b}) => {
  const d = ease(f, c('nt_see'), 9);
  const shake = f >= c('nt_see') && f < c('nt_see') + 10 ? Math.sin(f * 2.4) * 8 * (1 - (f - c('nt_see')) / 10) : 0;
  const clock = interpolate(f - b.from, [0, 200], [0, 1], CL);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #3A1A2A 0%, #0D0710 72%)'}}>
      <Phone s={1.05} x={540 + shake}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#2B3A6B,#141B33)'}} />
        <div style={{position: 'absolute', top: 120, width: '100%', textAlign: 'center', fontFamily: UI, fontWeight: 500, fontSize: 130, color: '#fff'}}>21:4{Math.floor(clock * 3) + 6}</div>
        <div style={{position: 'absolute', left: 24, right: 24, top: 330 - (1 - d) * 300, opacity: d, background: 'rgba(244,244,242,0.96)', borderRadius: 34, padding: '24px 26px', boxShadow: '0 12px 40px rgba(0,0,0,0.5)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: UI, fontWeight: 600, fontSize: 28, color: '#666'}}>
            <div style={{width: 40, height: 40, borderRadius: 10, background: K.red}} /> TAX LIST · now
          </div>
          <div style={{fontFamily: UI, fontWeight: 700, fontSize: 50, color: '#111', marginTop: 10, lineHeight: 1.12}}>
            <span style={{color: K.red}}>Dave</span> (born 1991, Oslo) just looked up your income
          </div>
        </div>
      </Phone>
    </AbsoluteFill>
  );
};

// ───────── crash 16.5M → 2.15M ─────────
const Crash: React.FC<SP> = ({f, c}) => {
  const a = c('cr_crashed');
  const u = Easing.in(Easing.cubic)(interpolate(f, [a, a + 26], [0, 1], CL));
  const v = 16500000 - (16500000 - 2150000) * u;
  const landed = f >= a + 26;
  const pts = Array.from({length: 40}, (_, i) => {
    const x = 120 + i * 21;
    const y = i < 20 ? 560 + Math.sin(i * 1.3) * 18 : 560 + Math.pow((i - 19) / 20, 1.6) * 330 * u;
    return `${x},${y}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #3A1414 0%, #120606 72%)', transform: landed && f < a + 34 ? `translateY(${Math.sin(f * 3) * 10 * (1 - (f - a - 26) / 8)}px)` : undefined}}>
      <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        <polyline points={pts} fill="none" stroke={K.red} strokeWidth={16} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: UI, fontWeight: 700, fontSize: 52, color: K.grey, letterSpacing: 4}}>SEARCHES PER YEAR</div>
      <div style={{position: 'absolute', top: 780, width: '100%', textAlign: 'center', fontFamily: ANTON, fontSize: 190, color: landed ? K.red : K.white, filter: `blur(${u > 0 && !landed ? 4 : 0}px)`}}>{Math.round(v).toLocaleString('en-US')}</div>
      {landed ? <div style={{position: 'absolute', left: 820, top: 740, transform: `translate(-50%,-50%) rotate(10deg) scale(${pop(f - a - 26)})`, background: K.red, color: '#fff', fontFamily: ANTON, fontSize: 90, padding: '0 26px', borderRadius: 16, border: '6px solid #000'}}>-87%</div> : null}
    </AbsoluteFill>
  );
};

// ───────── punchline: caught peeking ─────────
const Peek: React.FC<SP> = ({f, c, b}) => {
  const t = f - b.from;
  const caught = f >= c('pk_caught');
  const g = f - c('pk_caught');
  const lean = caught ? interpolate(g, [0, 5], [0, -40], CL) : Math.sin(t / 9) * 10;
  return (
    <AbsoluteFill style={{background: '#05070E'}}>
      <svg width={W} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        <rect x={150} y={420} width={780} height={760} fill={caught ? '#2B2B1E' : '#101830'} stroke="#3A2A1A" strokeWidth={30} />
        <rect x={525} y={420} width={30} height={760} fill="#3A2A1A" />
        <rect x={150} y={785} width={780} height={30} fill="#3A2A1A" />
        <g transform={`translate(${560 + lean} 860)`}>
          <circle cx={0} cy={-120} r={110} fill="#1A1A1A" />
          <rect x={-150} y={-20} width={300} height={360} rx={90} fill="#1A1A1A" />
          <rect x={-95} y={-170} width={80} height={70} rx={18} fill="#333" stroke={caught ? '#fff' : '#555'} strokeWidth={6} />
          <rect x={15} y={-170} width={80} height={70} rx={18} fill="#333" stroke={caught ? '#fff' : '#555'} strokeWidth={6} />
          <circle cx={-55} cy={-135} r={20} fill={caught ? '#FFF6C9' : '#6FA8FF'} />
          <circle cx={55} cy={-135} r={20} fill={caught ? '#FFF6C9' : '#6FA8FF'} />
        </g>
        <path d={`M 150 420 Q ${360 + Math.sin(t / 11) * 14} 800 ${300 + (caught ? -60 : 0)} 1180 L 150 1180 Z`} fill="#6E1F2A" />
        <path d={`M 930 420 Q ${790 - Math.sin(t / 13) * 14} 800 ${840 + (caught ? 60 : 0)} 1180 L 930 1180 Z`} fill="#6E1F2A" />
      </svg>
      {caught ? <AbsoluteFill style={{background: 'radial-gradient(circle at 56% 45%, rgba(255,246,200,0.55) 0%, rgba(255,246,200,0.12) 30%, rgba(0,0,0,0) 55%)'}} /> : null}
      {caught && g < 3 ? <AbsoluteFill style={{background: '#fff', opacity: 0.8 - g * 0.25}} /> : null}
      {caught ? (
        <div style={{position: 'absolute', left: 540, top: 1080, transform: `translate(-50%,-50%) rotate(-6deg) scale(${pop(g, 2)})`, fontFamily: ANTON, fontSize: 170, color: K.red, WebkitTextStroke: '14px #000', paintOrder: 'stroke fill', letterSpacing: 6}}>CAUGHT</div>
      ) : null}
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  street_hook: (p) => <Street {...p} mode="hook" />,
  street_loop: (p) => <Street {...p} mode="loop" />,
  street_fade: (p) => <Street {...p} mode="fade" />,
  norway: Norway,
  search: Search,
  lookup: Lookup,
  count: Count,
  happy: Happy,
  rule: Rule,
  notif: Notif,
  crash: Crash,
  peek: Peek,
};

export const SalShort: React.FC<{plan: SalPlan}> = ({plan}) => {
  const f = useCurrentFrame();
  const c = useMemo(() => (k: string) => plan.cues[k] ?? 1e9, [plan]);
  let bi = 0;
  while (bi + 1 < plan.beats.length && f >= plan.beats[bi + 1].from) bi++;
  const b = plan.beats[bi];
  const S = SCENES[b.scene] ?? SCENES.street_hook;
  const cut = bi > 0 && f - b.from < 2;
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: cut ? `scale(${1.04 - (f - b.from) * 0.02})` : undefined}}>
        <S f={f} c={c} b={b} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.55) 100%)'}} />
      <DaveSlot plan={plan as unknown as MapPlan} />
      <BigText f={f} b={b as any} i={bi} />
      {plan.voice ? <Audio src={staticFile(plan.voice)} /> : null}
      <Music segs={plan.music} />
      <Sfx cues={plan.sfx} />
    </AbsoluteFill>
  );
};
