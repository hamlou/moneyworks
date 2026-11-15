import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {localFont} from '../theme';

// CINEMATIC DOCUMENTARY long-form (LONG.md [DOC], 14 Nov 2026; model = Gloam "How Binance Lost $6.3B in One Night").
// Data-driven: tools/doc.py turns pipeline/doc/<id>.json + voice timing into src/v6/doc/<id>.plan.json. Never hand-edit a plan.
const SERIF = localFont('Instrument Serif', 'instrument-serif.woff2', '400');
const MONO = localFont('Plex Mono', 'plex-mono-400.woff2', '400');
const MONOB = localFont('Plex Mono B', 'plex-mono-600.woff2', '600');

export type DocEv = {at: number; v: string; t?: string; label?: string; pos?: string; n?: number; prefix?: string; suffix?: string; dec?: number; val?: string; w?: number;
  color?: string; k?: string; sub?: string; gold?: boolean; bold?: boolean; x?: number; y?: number; row?: number};
export type DocScene = {from: number; to: number; kind: string; img?: string; move?: string; hud?: string; tag?: string; head?: string; source?: string; by?: string; pub?: string;
  date?: string; n?: number; side?: string; bg?: string; ev: DocEv[]};
export type DocPlan = {id: string; frames: number; voice: string | null; scenes: DocScene[]; sfx: {at: number; src: string; v: number}[]; music: {src: string; from: number; to: number; v: number}[]};

const K = {black: '#0A0A0B', ink: '#1B1815', cream: '#E8E3D2', cream2: '#D9D3BF', red: '#B4222C', gold: '#E2A21C', amber: '#E8942C', dim: '#8C877A', white: '#F4F1E8'};
const cl = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ez = (t: number) => 1 - Math.pow(1 - t, 3);
// every element arrives the same way: soft focus → sharp, a small rise, no bounce (premium, not cartoon)
const arrive = (f: number, at: number, d = 12) => ez(interpolate(f - at, [0, d], [0, 1], cl));
const inStyle = (f: number, at: number, d = 12, dy = 18): React.CSSProperties => {
  const p = arrive(f, at, d);
  return {opacity: p, filter: p < 1 ? `blur(${(1 - p) * 10}px)` : undefined, transform: `translateY(${(1 - p) * dy}px)`};
};

const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string; sp?: number; bold?: boolean; style?: React.CSSProperties}> = ({children, size = 22, color = K.dim, sp = 0.22, bold, style}) => (
  <div style={{fontFamily: bold ? MONOB : MONO, fontWeight: bold ? 600 : 400, fontSize: size, letterSpacing: `${sp}em`, textTransform: 'uppercase', color, lineHeight: 1.25, ...style}}>{children}</div>
);
const Serif: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 120, color = K.ink, style}) => (
  <div style={{fontFamily: SERIF, fontSize: size, color, lineHeight: 1.02, letterSpacing: '-0.01em', ...style}}>{children}</div>
);
const num = (e: DocEv, f: number) => {
  if (e.n === undefined) return e.t ?? '';
  const k = ez(interpolate(f - e.at, [0, 38], [0, 1], cl));
  return (e.prefix ?? '') + (e.n * k).toLocaleString('en-US', {minimumFractionDigits: e.dec ?? 0, maximumFractionDigits: e.dec ?? 0}) + (e.suffix ?? '');
};
// [phrase] = marker highlight that sweeps in
const Marked: React.FC<{t: string; f: number; at: number; color?: string}> = ({t, f, at, color = K.gold}) => (
  <>
    {t.split(/(\[[^\]]+\])/).filter(Boolean).map((p, i) => {
      if (!p.startsWith('[')) return <span key={i}>{p}</span>;
      const w = interpolate(f - at - 10, [0, 12], [0, 100], cl);
      return <span key={i} style={{backgroundImage: `linear-gradient(${color},${color})`, backgroundRepeat: 'no-repeat', backgroundSize: `${w}% 86%`, backgroundPosition: '0 60%', padding: '0 0.08em'}}>{p.slice(1, -1)}</span>;
    })}
  </>
);

const Dark: React.FC<{f: number; warm?: boolean}> = ({f, warm}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at ${50 + 4 * Math.sin(f / 90)}% 46%, ${warm ? '#2A2119' : '#1D2026'} 0%, #101012 48%, ${K.black} 100%)`}} />
);
const Light: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at ${50 + 3 * Math.sin(f / 80)}% 44%, #F1EEE4 0%, #DCD8CB 55%, #A9A598 100%)`}} />
);
const Paper: React.FC<{f: number; at: number; w: number; h?: number; rot?: number; children: React.ReactNode; style?: React.CSSProperties; seed?: number}> = ({f, at, w, h, rot = -1.2, children, style, seed = 1}) => {
  const p = arrive(f, at, 14);
  const drift = Math.sin((f + seed * 40) / 70) * 0.35;
  return (
    <div style={{width: w, height: h, position: 'relative', opacity: p, transform: `perspective(1800px) rotateX(${(1 - p) * 14 + 2}deg) rotateY(${-3 + drift}deg) rotate(${rot + drift * 0.4}deg) translateY(${(1 - p) * 60}px)`,
      background: `linear-gradient(160deg, #EFEBDC 0%, ${K.cream} 45%, ${K.cream2} 100%)`, boxShadow: '0 40px 90px rgba(0,0,0,.55), 0 4px 14px rgba(0,0,0,.35), inset 0 0 80px rgba(120,100,60,.14)', padding: '54px 64px', boxSizing: 'border-box', ...style}}>
      {children}
    </div>
  );
};
const Head: React.FC<{t?: string; color?: string; line?: string}> = ({t, color = '#4A453B', line = 'rgba(40,35,25,.45)'}) => (t ? (
  <div style={{borderBottom: `1.5px solid ${line}`, paddingBottom: 16, marginBottom: 34}}><Mono size={22} color={color}>{t}</Mono></div>
) : null);

const POS: Record<string, React.CSSProperties> = {tl: {left: 110, top: 150}, tr: {right: 110, top: 150}, bl: {left: 110, bottom: 170}, br: {right: 110, bottom: 170}, l: {left: 110, top: 500}, r: {right: 110, top: 500}};
const Tag: React.FC<{f: number; e: DocEv}> = ({f, e}) => (
  <div style={{position: 'absolute', ...(POS[e.pos ?? 'tl'] ?? POS.tl), ...inStyle(f, e.at, 9, 10)}}>
    <div style={{background: K.white, borderLeft: `10px solid ${K.gold}`, padding: e.sub ? '16px 30px 18px 26px' : '18px 30px 18px 26px', boxShadow: '0 14px 40px rgba(0,0,0,.5)'}}>
      {e.sub ? <Mono size={20} color={K.amber} style={{marginBottom: 4}}>{e.sub}</Mono> : null}
      {e.sub ? <Serif size={56}>{e.t}</Serif> : <Mono size={32} color={K.ink} bold sp={0.2}>{e.t}</Mono>}
    </div>
  </div>
);

const ImageScene: React.FC<{sc: DocScene; f: number; id: string}> = ({sc, f, id}) => {
  const k = (f - sc.from) / Math.max(1, sc.to - sc.from);
  const mv = sc.move ?? 'push';
  const scale = mv === 'pull' ? 1.16 - 0.1 * k : 1.06 + 0.1 * k;
  const tx = mv === 'left' ? 3 - 6 * k : mv === 'right' ? -3 + 6 * k : 0;
  const big = [...sc.ev].reverse().find((e) => e.v === 'big' && e.at <= f);
  return (
    <AbsoluteFill style={{background: K.black}}>
      {sc.img ? <Img src={staticFile(`${id}/${sc.img}`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale}) translateX(${tx}%)`, filter: 'brightness(.6) contrast(1.18) saturate(.72)'}} /> : null}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,10,16,.55) 0%, rgba(8,10,16,0) 30%, rgba(8,6,4,0) 60%, rgba(8,6,4,.7) 100%)', mixBlendMode: 'multiply'}} />
      <AbsoluteFill style={{background: 'linear-gradient(120deg, rgba(20,40,70,.28), rgba(120,60,10,.18))', mixBlendMode: 'soft-light'}} />
      {big ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', ...inStyle(f, big.at, 16, 0)}}>
          <Serif size={(big.t ?? '').length > 16 ? 150 : 200} color={K.white} style={{textShadow: '0 6px 50px rgba(0,0,0,.8)', transform: `scale(${1 + 0.04 * interpolate(f - big.at, [0, 120], [0, 1], cl)})`}}>{num(big, f)}</Serif>
          {big.label ? <Mono size={26} color={K.amber} style={{marginTop: 22}}>{big.label}</Mono> : null}
        </AbsoluteFill>
      ) : null}
      {sc.ev.filter((e) => e.v === 'label' && e.at <= f).map((e, i) => <Tag key={i} f={f} e={e} />)}
    </AbsoluteFill>
  );
};

const CardScene: React.FC<{sc: DocScene; f: number}> = ({sc, f}) => {
  const stamp = sc.ev.find((e) => e.v === 'stamp' && e.at <= f);
  const rows = sc.ev.filter((e) => e.v === 'stat' || e.v === 'bar');
  return (
    <AbsoluteFill>
      {sc.bg === 'light' ? <Light f={f} /> : <Dark f={f} warm />}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <Paper f={f} at={sc.from + 2} w={1240}>
          <Head t={sc.head} />
          {rows.map((e, i) => e.at > f ? <div key={i} style={{height: e.v === 'bar' ? 150 : 250}} /> : e.v === 'stat' ? (
            <div key={i} style={{marginBottom: 34, ...inStyle(f, e.at)}}>
              <Serif size={rows.length > 2 ? 130 : 170} color={e.color === 'red' ? K.red : K.ink}>{num(e, f)}</Serif>
              <Mono size={24} color="#5A554A" style={{marginTop: 10}}>{e.label}</Mono>
            </div>
          ) : (
            <div key={i} style={{marginBottom: 40, ...inStyle(f, e.at)}}>
              <Mono size={22} color="#3A362E" style={{marginBottom: 12}}>{e.label}</Mono>
              <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
                <div style={{height: 62, width: 860 * (e.w ?? 0.5) * ez(interpolate(f - e.at, [4, 30], [0, 1], cl)), background: e.color === 'red' ? K.red : '#343A44'}} />
                <Serif size={64}>{e.val}</Serif>
              </div>
            </div>
          ))}
          {sc.source ? <Mono size={17} color="#7A7466" style={{marginTop: 8}}>{sc.source}</Mono> : null}
          {stamp ? (
            <div style={{position: 'absolute', right: 40, top: 26, transform: `rotate(-7deg) scale(${interpolate(f - stamp.at, [0, 5], [1.9, 1], cl)})`, opacity: interpolate(f - stamp.at, [0, 3], [0, 0.9], cl),
              border: `6px solid ${K.red}`, padding: '10px 26px', fontFamily: MONOB, fontWeight: 600, fontSize: 54, letterSpacing: '0.12em', color: K.red, textTransform: 'uppercase', mixBlendMode: 'multiply'}}>{stamp.t}</div>
          ) : null}
        </Paper>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ReceiptScene: React.FC<{sc: DocScene; f: number; id: string}> = ({sc, f, id}) => {
  const rows = sc.ev.filter((e) => e.v === 'row');
  const circ = sc.ev.find((e) => e.v === 'circle' && e.at <= f);
  const zig = Array.from({length: 26}, (_, i) => `${(i * 100) / 25}% ${i % 2 ? 100 : 0}%`).join(',');
  return (
    <AbsoluteFill>
      {sc.img ? <ImageScene sc={{...sc, ev: []}} f={f} id={id} /> : <Dark f={f} />}
      <AbsoluteFill style={{alignItems: sc.img ? 'flex-end' : 'center', justifyContent: 'center', paddingRight: sc.img ? 150 : 0}}>
        <div style={{...inStyle(f, sc.from + 2, 14, 80), transformOrigin: 'top center'}}>
          <div style={{width: 640, background: '#F2EFE6', padding: '48px 46px 40px', transform: `rotate(${1.5 + Math.sin(f / 60) * 0.3}deg)`, boxShadow: '0 40px 90px rgba(0,0,0,.6)', fontFamily: MONO, color: K.ink}}>
            <div style={{textAlign: 'center', fontSize: 26, letterSpacing: '0.12em', lineHeight: 1.5, textTransform: 'uppercase', borderBottom: '2px dashed #6A655A', paddingBottom: 20, marginBottom: 20, whiteSpace: 'pre-line'}}>{sc.head}</div>
            {rows.map((e, i) => (
              <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: e.bold ? 34 : 25, fontFamily: e.bold ? MONOB : MONO, fontWeight: e.bold ? 600 : 400, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: e.bold ? '22px 0' : '7px 0', borderTop: e.bold ? '2px dashed #6A655A' : undefined, borderBottom: e.bold ? '2px dashed #6A655A' : undefined, margin: e.bold ? '14px 0' : 0, opacity: e.at <= f ? 1 : 0}}>
                <span>{e.k}</span>
                <span style={{position: 'relative', color: circ && circ.row === i ? K.red : undefined}}>
                  {e.val}
                  {circ && circ.row === i ? (
                    <svg style={{position: 'absolute', left: -22, top: -14, width: 'calc(100% + 44px)', height: 'calc(100% + 28px)', overflow: 'visible'}} viewBox="0 0 100 40" preserveAspectRatio="none">
                      <ellipse cx="50" cy="20" rx="49" ry="19" fill="none" stroke={K.red} strokeWidth="2.2" vectorEffect="non-scaling-stroke" pathLength={100} strokeDasharray={`${interpolate(f - circ.at, [0, 12], [0, 100], cl)} 100`} />
                    </svg>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
          <div style={{width: 640, height: 18, background: '#F2EFE6', clipPath: `polygon(0 0, 100% 0, ${zig.split(',').reverse().join(',')})`, transform: `rotate(${1.5 + Math.sin(f / 60) * 0.3}deg) translate(-4px,-1px)`}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ListScene: React.FC<{sc: DocScene; f: number}> = ({sc, f}) => (
  <AbsoluteFill>
    <Dark f={f} warm />
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Paper f={f} at={sc.from + 2} w={1260} rot={0.6} style={{minHeight: 560}}>
        <Head t={sc.head} />
        {sc.ev.filter((e) => e.v === 'row' && e.at <= f).map((e, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 40, background: 'linear-gradient(180deg,#F3F0E2,#E2DCC6)', boxShadow: '0 10px 22px rgba(60,50,20,.28)', padding: '26px 40px', marginBottom: 30, ...inStyle(f, e.at)}}>
            <Mono size={24} color="#7A7466">{String(i + 1).padStart(2, '0')}</Mono>
            <Serif size={70}>{e.t}</Serif>
          </div>
        ))}
      </Paper>
    </AbsoluteFill>
  </AbsoluteFill>
);

const Globe: React.FC<{f: number}> = ({f}) => {
  const pts: React.ReactNode[] = [];
  const R = 420, rot = f / 240;
  for (let la = -80; la <= 80; la += 6) {
    const n = Math.max(6, Math.round(60 * Math.cos((la * Math.PI) / 180)));
    for (let j = 0; j < n; j++) {
      const lo = (j / n) * Math.PI * 2 + rot;
      const z = Math.cos((la * Math.PI) / 180) * Math.cos(lo);
      if (z < 0.02) continue;
      const land = random(`g${la}-${Math.round((j / n) * 40)}`) > 0.56;
      pts.push(<circle key={`${la}-${j}`} cx={R * Math.cos((la * Math.PI) / 180) * Math.sin(lo)} cy={-R * Math.sin((la * Math.PI) / 180)} r={land ? 3.4 : 1.4} fill={land ? '#C9CED8' : '#59606C'} opacity={0.25 + 0.75 * z} />);
    }
  }
  return <svg width={900} height={900} viewBox="-450 -450 900 900"><circle r={R + 8} fill="none" stroke="#3A404B" strokeWidth={1.5} />{pts}</svg>;
};

const StatsScene: React.FC<{sc: DocScene; f: number; id: string}> = ({sc, f, id}) => (
  <AbsoluteFill>
    <Dark f={f} />
    <div style={{position: 'absolute', right: -80, top: 90, opacity: 0.9}}>
      {sc.side && sc.side !== 'globe' ? <Img src={staticFile(`${id}/${sc.side}`)} style={{width: 900, height: 900, objectFit: 'cover', filter: 'brightness(.7) saturate(.7)', maskImage: 'radial-gradient(circle, #000 45%, transparent 72%)'}} /> : <Globe f={f} />}
    </div>
    <div style={{position: 'absolute', left: 190, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      {sc.head ? <div style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 70, ...inStyle(f, sc.from + 3)}}><div style={{width: 46, height: 2, background: K.red}} /><Mono size={24} color="#B9B4A6">{sc.head}</Mono></div> : null}
      {sc.ev.filter((e) => e.v === 'stat' && e.at <= f).map((e, i) => (
        <div key={i} style={{marginBottom: 64, ...inStyle(f, e.at)}}>
          <Serif size={170} color={e.color === 'red' ? '#E0463F' : K.white}>{num(e, f)}</Serif>
          <Mono size={24} color={K.amber} style={{marginTop: 14}}>{e.label}</Mono>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

const TilesScene: React.FC<{sc: DocScene; f: number}> = ({sc, f}) => {
  const tiles = sc.ev.filter((e) => e.v === 'tile');
  const n = Math.max(sc.n ?? tiles.length, tiles.length);
  const cur = tiles.filter((e) => e.at <= f).length - 1;
  const tw = Math.min(330, (1640 - (n - 1) * 26) / n);
  return (
    <AbsoluteFill>
      <Light f={f} />
      <div style={{position: 'absolute', left: 140, top: 330}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 54}}><div style={{width: 46, height: 2, background: K.red}} /><Mono size={24} color="#4A453B">{sc.head}</Mono></div>
        <div style={{display: 'flex', gap: 26}}>
          {Array.from({length: n}, (_, i) => {
            const e = tiles[i];
            const on = e && e.at <= f;
            const gold = on && i === cur;
            const g = gold ? arrive(f, e.at, 10) : 0;
            return (
              <div key={i} style={{width: tw, height: tw, position: 'relative', background: gold ? `linear-gradient(150deg,#F3C246,${K.gold})` : 'linear-gradient(160deg,#ECE9DF,#DDD9CC)', boxShadow: gold ? `0 0 ${60 * g}px rgba(226,162,28,.7), 0 16px 34px rgba(0,0,0,.25)` : '0 10px 24px rgba(0,0,0,.14)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 18, boxSizing: 'border-box', transform: `translateY(${gold ? -10 * g : 0}px)`}}>
                <Mono size={15} color="#8C877A" style={{position: 'absolute', left: 14, top: 12}}>{String(i + 1).padStart(2, '0')}</Mono>
                {on ? <div style={inStyle(f, e.at, 10, 8)}><Mono size={tw > 280 ? 27 : 22} color={gold ? K.ink : '#6A655A'} bold={gold} sp={0.16}>{e.t}</Mono>{e.sub ? <Mono size={20} color={gold ? '#3A3020' : '#8C877A'} style={{marginTop: 14}}>{e.sub}</Mono> : null}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const QuoteScene: React.FC<{sc: DocScene; f: number}> = ({sc, f}) => {
  const q = [...sc.ev].reverse().find((e) => e.v === 'quote' && e.at <= f);
  const words = (q?.t ?? '').split(' ');
  return (
    <AbsoluteFill>
      <Dark f={f} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 220px', textAlign: 'center'}}>
        {sc.by ? <Mono size={24} color="#A9A496" style={{marginBottom: 40, ...inStyle(f, sc.from + 3)}}>{sc.by}</Mono> : null}
        {q ? (
          <Serif size={words.length > 12 ? 92 : 124} color={K.white}>
            “{words.map((w, i) => { const p = arrive(f, q.at + i * 3, 9); return <span key={i} style={{opacity: p, filter: p < 1 ? `blur(${(1 - p) * 12}px)` : undefined}}>{w}{i < words.length - 1 ? ' ' : ''}</span>; })}”
          </Serif>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const HeadlineScene: React.FC<{sc: DocScene; f: number}> = ({sc, f}) => (
  <AbsoluteFill>
    <Dark f={f} warm />
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Paper f={f} at={sc.from + 2} w={1380} rot={-1.6} style={{background: 'linear-gradient(160deg,#F6F4EC,#E9E6DA)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '3px solid #1B1815', paddingBottom: 14, marginBottom: 36}}>
          <Serif size={52}>{sc.pub}</Serif><Mono size={20} color="#5A554A">{sc.date}</Mono>
        </div>
        {sc.ev.filter((e) => e.v === 'head' && e.at <= f).map((e, i) => (
          <div key={i} style={{marginBottom: 30, ...inStyle(f, e.at)}}><Serif size={i === 0 ? 104 : 60} color={i === 0 ? K.ink : '#4A453B'}><Marked t={e.t ?? ''} f={f} at={e.at} /></Serif></div>
        ))}
        <div style={{height: 14, background: 'repeating-linear-gradient(90deg,#C9C4B4 0 70%,transparent 70% 100%)', backgroundSize: '100% 14px', opacity: 0.5, marginTop: 20}} />
        <div style={{height: 14, width: '82%', background: '#C9C4B4', opacity: 0.4, marginTop: 14}} />
      </Paper>
    </AbsoluteFill>
  </AbsoluteFill>
);

const ClockScene: React.FC<{sc: DocScene; f: number}> = ({sc, f}) => {
  const t = [...sc.ev].reverse().find((e) => e.v === 'time' && e.at <= f);
  const s = [...sc.ev].reverse().find((e) => e.v === 'sub' && e.at <= f);
  return (
    <AbsoluteFill>
      <Dark f={f} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        {t ? <div style={{fontFamily: MONOB, fontWeight: 600, fontSize: 210, letterSpacing: '0.08em', color: K.amber, textShadow: '0 0 60px rgba(232,148,44,.45)', ...inStyle(f, t.at, 8, 0)}}>{t.t}</div> : null}
        {s ? <Mono size={26} color="#A9A496" style={{marginTop: 26, ...inStyle(f, s.at)}}>{s.t}</Mono> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const VIEW: Record<string, React.FC<{sc: DocScene; f: number; id: string}>> = {image: ImageScene, card: CardScene, receipt: ReceiptScene, list: ListScene, stats: StatsScene, tiles: TilesScene, quote: QuoteScene, headline: HeadlineScene, clock: ClockScene};

export const Doc: React.FC<{plan: DocPlan}> = ({plan}) => {
  const f = useCurrentFrame();
  const i = Math.max(0, plan.scenes.findIndex((s) => f >= s.from && f < s.to));
  const sc = plan.scenes[i];
  const V = VIEW[sc?.kind] ?? ImageScene;
  const cut = sc ? interpolate(f - sc.from, [0, 4], [0, 1], cl) : 1;
  const drift = sc ? 1 + 0.02 * ((f - sc.from) / Math.max(1, sc.to - sc.from)) : 1;
  return (
    <AbsoluteFill style={{background: K.black}}>
      {sc ? <AbsoluteFill style={{opacity: cut, transform: sc.kind === 'image' || sc.kind === 'receipt' ? undefined : `scale(${drift})`}}><V sc={sc} f={f} id={plan.id} /></AbsoluteFill> : null}
      {sc?.hud ? (
        <div style={{position: 'absolute', left: 110, top: 78, display: 'flex', alignItems: 'center', gap: 16, opacity: cut}}>
          <div style={{width: 11, height: 11, borderRadius: 6, background: K.amber, opacity: 0.55 + 0.45 * Math.sin(f / 6)}} /><Mono size={22} color={K.amber} sp={0.3} bold>{sc.hud}</Mono>
        </div>
      ) : null}
      {sc?.tag ? <div style={{position: 'absolute', left: 110, bottom: 70, display: 'flex', alignItems: 'center', gap: 12, opacity: cut}}><div style={{width: 8, height: 8, background: K.red}} /><Mono size={18} color="#C9C4B4">{sc.tag}</Mono></div> : null}
      {/* film: vignette + moving grain on everything */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 52%, rgba(0,0,0,.5) 100%)', pointerEvents: 'none'}} />
      <AbsoluteFill style={{backgroundImage: `url(${staticFile('doc/grain.png')})`, backgroundPosition: `${Math.floor(random(`gx${f}`) * 512)}px ${Math.floor(random(`gy${f}`) * 512)}px`, opacity: 0.11, mixBlendMode: 'overlay', pointerEvents: 'none'}} />
      {plan.voice ? <Audio src={staticFile(plan.voice)} /> : null}
      {plan.music.map((m, k) => (
        <Sequence key={`m${k}`} from={m.from} durationInFrames={Math.max(1, m.to - m.from)}>
          <Audio src={staticFile(m.src)} loop volume={(t) => m.v * Math.min(1, t / 30, (m.to - m.from - t) / 30)} />
        </Sequence>
      ))}
      {plan.sfx.map((s, k) => (
        <Sequence key={`s${k}`} from={s.at} durationInFrames={90}><Audio src={staticFile(s.src)} volume={s.v} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
