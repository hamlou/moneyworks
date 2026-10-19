import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from './theme';
import {ease, pop} from './anim';
import {Cue, Sfx, Svg} from './fx';
import {Pic, PicBg, PicLook, Slam} from './photo';
import {Dave, Guru, Ink} from './memes52';
import {Expr, Key} from './Stick';
import {Beat, Timings, useT} from './timing';

// UPGRADE.md layer: an old episode is upgraded by editing ONLY pipeline/episodes/epNN.json. Beat fields read here
// (copied into timings.json by tts.py). "host"/"bg"/"card" beats cover the old drawing; "pic"/"meme"/"slam" on other beats
// open a right-hand panel while the old drawing shrinks to the left (owner, 19 Oct 2026: never hide what Dave explains).
// Everything can be anchored to a spoken WORD ("at"): photos, memes, slams, zooms and sounds land on that word.
export type Meme = {t: 'drake' | 'brain' | 'buttons' | 'fine' | 'stonks' | 'vs'; a: string; b?: string; c?: string; at?: string};
export type PicFx = string | {id: string; look?: PicLook; label?: string; cut?: boolean; at?: string};
export type SfxFx = string | {s: string; at?: string; v?: number};
export type Fx = {host?: boolean; mood?: Expr; pose?: string; bg?: string; pic?: PicFx; meme?: Meme; slam?: string | {t: string; at?: string}; sfx?: SfxFx | SfxFx[]; card?: string | {t: string; dark?: boolean}; zoom?: boolean | string | {in: string; out?: string}};
type FBeat = Beat & Fx;

const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9$]/g, '');
// frame of a word in a beat ("word" or "word#2" for the 2nd one); falls back to the beat start
export const wordFrame = (b: Beat, word?: string, end = false) => {
  if (!word) return Math.round((end ? b.end : b.start) * 30);
  const [wd, n] = word.split('#');
  const hits = b.words.filter((x) => norm(x.text) === norm(wd));
  const h = hits[(Number(n) || 1) - 1] ?? hits[0];
  return Math.round((h ? (end ? h.end : h.start) : end ? b.end : b.start) * 30);
};
const isCover = (b: FBeat) => !!(b.host || b.bg || b.card);
// how far the old drawing is pushed into the left panel at frame f (0..1); Episode.tsx applies it
export const splitAt = (t: Timings, f: number) => {
  const beats = t.beats as FBeat[];
  let v = 0;
  beats.forEach((b, i) => {
    if (isCover(b) || !(b.pic || b.meme)) return;
    const pic = typeof b.pic === 'string' ? {id: b.pic} : b.pic;
    const a = Math.min(pic ? wordFrame(b, pic.at) : 1e9, b.meme ? wordFrame(b, b.meme.at) : 1e9) - 6;
    const nx = beats[i + 1];
    const e = nx ? Math.round(nx.start * 30) - 2 : Math.round(b.end * 30) + 20;
    v = Math.max(v, ease(f, a, a + 8) * (1 - ease(f, e - 4, e + 6)));
  });
  return v;
};
export const SPLIT_SCALE = 0.6;
const PX = 1152 + (1920 - 1152) / 2; // centre of the right panel

const LOOKS: PicLook[] = ['polaroid', 'tape', 'news', 'sticker', 'circle', 'plain'];
const POSES = ['talk', 'present', 'point_r', 'shrug', 'hips', 'think'];
const MW = 900;
const MH = 560;

const MemeArt: React.FC<{m: Meme; f: number}> = ({m, f}) => {
  const w = MW;
  const h = MH;
  const k = (at: number, pose: string, expr: Expr, look = 0) => [{at, pose, expr, look}];
  if (m.t === 'drake')
    return (
      <g>
        <rect width={w * 0.38} height={h} fill="#F2A33A" />
        <Guru f={f} x={w * 0.19} y={h * 0.47} s={0.62} keys={k(0, 'point_r', 'suspicious', -1)} />
        <Guru f={f} x={w * 0.19} y={h * 0.97} s={0.62} keys={k(0, 'thumbs', 'grin', 0.8)} />
        <Ink x={w * 0.69} y={h * 0.25} size={50} mw={w * 0.56}>{m.a}</Ink>
        <Ink x={w * 0.69} y={h * 0.75} size={50} mw={w * 0.56}>{m.b ?? ''}</Ink>
        <line x1={0} y1={h / 2} x2={w} y2={h / 2} stroke={C.ink} strokeWidth={6} />
        <line x1={w * 0.38} y1={0} x2={w * 0.38} y2={h} stroke={C.ink} strokeWidth={6} />
      </g>
    );
  if (m.t === 'brain') {
    const rows = [m.a, m.b ?? '', m.c ?? ''];
    return (
      <g>
        {rows.map((r, i) => (
          <g key={i} opacity={f > i * 18 ? 1 : 0}>
            <rect y={(h / 3) * i} width={w} height={h / 3} fill={i === 2 ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={5} />
            <Ink x={w * 0.35} y={(h / 3) * i + h / 6 + 14} size={44} mw={w * 0.62}>{r}</Ink>
            <circle cx={w * 0.84} cy={(h / 3) * i + h / 6} r={40 + i * 14} fill={i === 2 ? '#fff' : '#F7B6C8'} stroke={C.ink} strokeWidth={5} opacity={i === 2 ? 0.6 + 0.4 * Math.sin(f / 4) : 1} />
          </g>
        ))}
      </g>
    );
  }
  if (m.t === 'buttons')
    return (
      <g>
        <rect width={w} height={h} fill={C.sky} />
        {[m.a, m.b ?? ''].map((x, i) => (
          <g key={i} transform={`translate(${w * (0.3 + i * 0.4)},${h * 0.25}) rotate(${i ? 6 : -6})`}>
            <circle r={110} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Ink y={12} size={36} color="#fff" mw={190}>{x}</Ink>
          </g>
        ))}
        <Dave f={f} x={w * 0.5} y={h * 1.02} s={0.75} keys={[{at: 0, pose: 'panic', expr: 'worried'}]} sweat />
      </g>
    );
  if (m.t === 'fine')
    return (
      <g>
        <rect width={w} height={h} fill="#F28B30" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${80 + i * 150} ${h} q30 ${-140 - ((f * 7 + i * 40) % 60)} 60 0`} fill={C.yellow} stroke={C.red} strokeWidth={6} />
        ))}
        <Dave f={f} x={w * 0.35} y={h * 0.95} s={0.75} keys={[{at: 0, pose: 'relax', expr: 'happy'}]} />
        <rect x={w * 0.55} y={h * 0.12} width={w * 0.4} height={h * 0.34} rx={30} fill="#fff" stroke={C.ink} strokeWidth={5} />
        <Ink x={w * 0.75} y={h * 0.31} size={44} mw={w * 0.36}>{m.a}</Ink>
      </g>
    );
  if (m.t === 'stonks') {
    const p = Math.min(1, f / 40);
    return (
      <g>
        <rect width={w} height={h} fill={C.navy} />
        <polyline points={[0, 1, 2, 3, 4, 5].map((i) => `${60 + i * 160 * p},${h - 80 - i * 70 * p - (i % 2 ? 40 : 0)}`).join(' ')} fill="none" stroke={C.green} strokeWidth={14} />
        <Guru f={f} x={w * 0.25} y={h * 0.98} s={0.75} keys={k(0, 'thumbs', 'smug', 1)} />
        <Ink x={w * 0.65} y={h * 0.22} size={62} color="#fff" mw={w * 0.6}>{m.a}</Ink>
      </g>
    );
  }
  return (
    <g>
      <rect width={w} height={h} fill={C.wall} />
      <Dave f={f} x={w * 0.25} y={h * 0.95} s={0.7} keys={k(0, 'point_r', 'shock', 1)} />
      <Guru f={f} x={w * 0.75} y={h * 0.95} s={0.7} flip keys={k(0, 'point_r', 'shock', 1)} />
      <Ink x={w * 0.25} y={h * 0.12} size={44} mw={w * 0.45}>{m.a}</Ink>
      <Ink x={w * 0.75} y={h * 0.12} size={44} mw={w * 0.45}>{m.b ?? ''}</Ink>
    </g>
  );
};

const MemeCard: React.FC<{f: number; at: number; out: number; m: Meme; x?: number; y?: number; k?: number}> = ({f, at, out, m, x = 960, y = 400, k = 1}) => {
  if (f < at || f >= out) return null;
  const sc = k * pop(f, at, 9, 240) * (1 - ease(f, out - 6, out));
  return (
    <div style={{position: 'absolute', left: x - MW / 2, top: y - MH / 2, width: MW, height: MH, transform: `rotate(${Math.floor(f / 7) % 2 ? -1.4 : -2}deg) scale(${sc})`, border: '14px solid #fff', outline: `6px solid ${C.ink}`, boxShadow: '14px 18px 0 rgba(35,35,43,0.35)', overflow: 'hidden', background: '#fff'}}>
      <svg width={MW} height={MH} viewBox={`0 0 ${MW} ${MH}`}>
        <MemeArt m={m} f={f - at} />
      </svg>
    </div>
  );
};

// Mouth moves only while words are actually spoken: talk on at each run of words, off at gaps and after the last word.
export const speechKeys = (words: {start: number; end: number}[], at: number, pose: string, expr: Expr, look = 0.15, endPose = pose): Key[] => {
  const ks: Key[] = [{at, pose, expr, look, talk: false}];
  let runStart = -1;
  words.forEach((w, j) => {
    if (runStart < 0) runStart = w.start;
    const nx = words[j + 1];
    if (!nx || nx.start - w.end > 0.2) {
      ks.push({at: Math.round(runStart * 30), talk: true}, {at: Math.round(w.end * 30), talk: false});
      runStart = -1;
    }
  });
  const last = words.length ? Math.round(words[words.length - 1].end * 30) : at;
  ks.push({at: last + 1, pose: endPose, talk: false});
  return ks;
};

// Big word-synced captions for host scenes: the last 4 spoken words, current word in yellow.
const HostCaption: React.FC<{f: number; words: {text: string; start: number; end: number}[]; x: number}> = ({f, words, x}) => {
  const sec = f / 30;
  const i = words.findIndex((w) => w.end >= sec);
  const cur = i < 0 ? words.length - 1 : i;
  const from = Math.floor(cur / 4) * 4;
  const shown = words.slice(from, from + 4);
  return (
    <div style={{position: 'absolute', left: x - 560, top: 760, width: 1120, textAlign: 'center', fontFamily: 'Caveat', fontWeight: 700, fontSize: 104, lineHeight: 1, color: '#fff', WebkitTextStroke: `10px ${C.ink}`, paintOrder: 'stroke fill', textTransform: 'uppercase'}}>
      {shown.map((w, j) => (
        <span key={j} style={{color: from + j === cur ? C.yellow : '#fff', opacity: w.start <= sec + 0.05 ? 1 : 0.25, marginRight: 22}}>
          {w.text}
        </span>
      ))}
    </div>
  );
};

// Camera cuts in host scenes land on speech: a new framing at each sentence start or breath (never mid-phrase).
const cutPoints = (b: Beat) => {
  const out = [Math.round(b.start * 30)];
  b.words.forEach((w, j) => {
    if (!j) return;
    const prev = b.words[j - 1];
    const f0 = Math.round(w.start * 30);
    const brk = /[.?!]$/.test(prev.text) || w.start - prev.end > 0.22;
    if (brk && f0 - out[out.length - 1] >= 36) out.push(f0);
  });
  return out;
};

export const Upgrade: React.FC<{ep: string}> = ({ep}) => {
  const f = useCurrentFrame();
  const {t, fr} = useT();
  const beats = t.beats as FBeat[];
  if (!beats.some((b) => b.host || b.bg || b.pic || b.meme || b.slam || b.card)) return null;
  const cues: Cue[] = [];
  const layers: React.ReactNode[] = [];
  beats.forEach((b, i) => {
    const at = Math.max(0, fr(b.start) - 4);
    const next = beats[i + 1];
    const out = Math.max(at + 90, next ? fr(next.start) - 2 : fr(b.end) + 20);
    const cover = isCover(b);
    const pic = typeof b.pic === 'string' ? {id: b.pic} : b.pic;
    const picAt = pic ? wordFrame(b, pic.at) - 3 : 0;
    const picSrc = pic ? `${ep}/${pic.id}.${pic.cut ? 'png' : 'jpg'}` : '';
    const slam = typeof b.slam === 'string' ? {t: b.slam, at: undefined} : b.slam;
    const slamAt = slam ? wordFrame(b, slam.at) - 2 : 0;
    const coverEnd = next && isCover(next) ? fr(next.start) - 4 : fr(b.end) + 12;
    if (b.card && f >= at && f < coverEnd) {
      const c = typeof b.card === 'string' ? {t: b.card, dark: false} : b.card;
      layers.push(
        <AbsoluteFill key={`c${i}`} style={{background: c.dark ? '#000' : '#F2F2F2', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: 'Caveat', fontWeight: 700, fontSize: c.t.length > 14 ? 120 : 220, color: c.dark ? '#fff' : C.ink, textAlign: 'center', maxWidth: 1600, lineHeight: 0.95, transform: `scale(${pop(f, at, 10, 220)})`}}>{c.t}</div>
        </AbsoluteFill>,
      );
    } else if (cover && f >= at && f < coverEnd) {
      const daveX = pic ? 470 : 560;
      const cuts = cutPoints(b);
      const ci = Math.max(0, cuts.filter((c) => c <= f + 2).length - 1);
      const SHOTS: [number, string][] = [[1, '50% 50%'], [1.32, `${daveX / 19.2}% 28%`], [1.12, pic ? '70% 40%' : '35% 45%']];
      const [sc, origin] = SHOTS[(ci + i) % 3];
      const kick = 1 + 0.05 * (1 - ease(f, cuts[ci], cuts[ci] + 8));
      const z = !b.zoom ? null : b.zoom === true ? {in: undefined, out: undefined} : typeof b.zoom === 'string' ? {in: b.zoom, out: undefined} : b.zoom;
      const zin = z ? wordFrame(b, z.in) - 2 : 0;
      const zout = z ? (z.out ? wordFrame(b, z.out, true) : fr(b.end) + 4) : 0;
      const zk = z ? ease(f, zin, zin + 5) * (1 - ease(f, zout, zout + 6)) : 0;
      const punch = zk > 0 ? 1 + 0.9 * zk : sc * kick;
      layers.push(
        <AbsoluteFill key={`h${i}`} style={{transform: `scale(${punch})`, transformOrigin: zk > 0 ? `${daveX / 19.2}% 40%` : origin}}>
          {b.bg ? <PicBg f={f} src={`${ep}/${b.bg}.jpg`} from={at} dim={0.45} /> : <AbsoluteFill style={{background: `radial-gradient(circle at 30% 40%, #fff 0%, ${i % 2 ? C.sky : C.stone} 70%)`}} />}
          <Svg>
            <ellipse cx={daveX} cy={1050} rx={260} ry={34} fill="rgba(0,0,0,0.18)" />
            <Dave f={f} x={daveX} y={1060} s={2.3} keys={speechKeys(b.words, at, b.pose ?? POSES[i % POSES.length], b.mood ?? 'happy', 0.15, b.pose ?? 'idle')} />
          </Svg>
          {pic && <Pic f={f} src={picSrc} x={1340} y={400} w={760} h={560} at={picAt} look={pic.cut ? 'cutout' : pic.look ?? LOOKS[i % LOOKS.length]} enter="slam" rot={i % 2 ? 3 : -3} label={pic.label} />}
          {slam && <Slam f={f} at={slamAt} text={slam.t} x={pic ? 1340 : 1300} y={pic ? 120 : 380} size={pic ? 110 : 170} color={C.yellow} />}
        </AbsoluteFill>,
      );
      layers.push(<HostCaption key={`hc${i}`} f={f} words={b.words} x={pic ? 1340 : 1300} />);
      if (z) cues.push({at: zin, src: 'boom', v: 0.9});
    } else if (!cover) {
      // right-hand panel: the old drawing is shrunk to the left by Episode.tsx, so nothing Dave explains is hidden
      if (pic) layers.push(<Pic key={`p${i}`} f={f} src={picSrc} x={PX} y={b.meme ? 300 : 500} w={640} h={b.meme ? 400 : 520} at={picAt} out={out} look={pic.cut ? 'cutout' : pic.look ?? LOOKS[i % LOOKS.length]} enter="right" rot={i % 2 ? 3 : -3} label={pic.label} />);
      if (b.meme) {
        const ma = wordFrame(b, b.meme.at) - 3;
        layers.push(<MemeCard key={`m${i}`} f={f} at={ma} out={Math.min(out, ma + 165)} m={b.meme} x={PX} y={pic ? 760 : 520} k={0.74} />);
      }
      if (slam) layers.push(<Slam key={`s${i}`} f={f} at={slamAt} text={slam.t} x={b.pic || b.meme ? PX : 960} y={130} size={b.pic || b.meme ? 110 : 150} color={C.yellow} out={out} />);
    }
    const sfx = b.sfx ? (Array.isArray(b.sfx) ? b.sfx : [b.sfx]) : [];
    sfx.forEach((x) => {
      const o = typeof x === 'string' ? {s: x, at: undefined, v: undefined} : x;
      cues.push({at: wordFrame(b, o.at) - 1, src: o.s, v: o.v ?? (o.s === 'trombone' ? 0.3 : 0.85)});
    });
    if (cover && !b.card && !sfx.length && !b.zoom) cues.push({at, src: 'whoosh_s', v: 0.3});
    if (pic) cues.push({at: picAt + 2, src: 'paper', v: 0.5});
  });
  return (
    <AbsoluteFill>
      {layers}
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
