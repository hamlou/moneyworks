import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from './theme';
import {ease, pop} from './anim';
import {Cue, Sfx, Svg} from './fx';
import {Pic, PicBg, PicLook, Slam} from './photo';
import {Dave, Guru, Ink} from './memes52';
import {Expr} from './Stick';
import {useT} from './timing';

// UPGRADE.md layer: an old episode is upgraded by editing ONLY pipeline/episodes/epNN.json. Beat fields read here
// (copied into timings.json by tts.py): host, mood, pose, bg, pic, meme, slam. A "host" or "bg" beat covers the old drawing
// with Dave talking straight to the viewer; "pic"/"meme"/"slam" float over the old drawing.
export type Meme = {t: 'drake' | 'brain' | 'buttons' | 'fine' | 'stonks' | 'vs'; a: string; b?: string; c?: string};
export type PicFx = string | {id: string; look?: PicLook; label?: string; cut?: boolean};
export type Fx = {host?: boolean; mood?: Expr; pose?: string; bg?: string; pic?: PicFx; meme?: Meme; slam?: string; sfx?: string; card?: string | {t: string; dark?: boolean}; zoom?: boolean};

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

const MemeCard: React.FC<{f: number; at: number; out: number; m: Meme}> = ({f, at, out, m}) => {
  if (f < at || f >= out) return null;
  const sc = pop(f, at, 9, 240) * (1 - ease(f, out - 6, out));
  return (
    <div style={{position: 'absolute', left: 960 - MW / 2, top: 400 - MH / 2, width: MW, height: MH, transform: `rotate(${Math.floor(f / 7) % 2 ? -1.4 : -2}deg) scale(${sc})`, border: '14px solid #fff', outline: `6px solid ${C.ink}`, boxShadow: '14px 18px 0 rgba(35,35,43,0.35)', overflow: 'hidden', background: '#fff'}}>
      <svg width={MW} height={MH} viewBox={`0 0 ${MW} ${MH}`}>
        <MemeArt m={m} f={f - at} />
      </svg>
    </div>
  );
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

export const Upgrade: React.FC<{ep: string}> = ({ep}) => {
  const f = useCurrentFrame();
  const {t, fr} = useT();
  const beats = t.beats as (typeof t.beats[number] & Fx)[];
  if (!beats.some((b) => b.host || b.bg || b.pic || b.meme || b.slam || b.card)) return null;
  const cues: Cue[] = [];
  const layers: React.ReactNode[] = [];
  let side = 0;
  beats.forEach((b, i) => {
    const at = Math.max(0, fr(b.start) - 4);
    const next = beats[i + 1];
    const out = Math.max(at + 90, next ? fr(next.start) - 2 : fr(b.end) + 20);
    const cover = !!(b.host || b.bg || b.card);
    const pic = typeof b.pic === 'string' ? {id: b.pic} : b.pic;
    const picSrc = pic ? `${ep}/${pic.id}.${pic.cut ? 'png' : 'jpg'}` : '';
    const coverEnd = next && (next.host || next.bg || next.card) ? fr(next.start) - 4 : fr(b.end) + 12;
    if (b.card && f >= at && f < coverEnd) {
      const c = typeof b.card === 'string' ? {t: b.card} : b.card;
      layers.push(
        <AbsoluteFill key={`c${i}`} style={{background: c.dark ? '#000' : '#F2F2F2', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: 'Caveat', fontWeight: 700, fontSize: c.t.length > 14 ? 120 : 220, color: c.dark ? '#fff' : C.ink, textAlign: 'center', maxWidth: 1600, lineHeight: 0.95, transform: `scale(${pop(f, at, 10, 220)})`}}>{c.t}</div>
        </AbsoluteFill>,
      );
    } else if (cover && f >= at && f < coverEnd) {
      const k = f - at;
      const daveX = pic ? 470 : 560;
      // Camera cuts like the owner's reference videos: a new framing about every 1.8 s (wide -> face close-up -> medium).
      const shot = Math.floor(k / 54);
      const SHOTS: [number, string][] = [[1, '50% 50%'], [1.32, `${daveX / 19.2}% 28%`], [1.12, pic ? '70% 40%' : '35% 45%']];
      const [sc, origin] = SHOTS[(shot + i) % 3];
      const kick = 1 + 0.05 * (1 - ease(k - shot * 54, 0, 8));
      const punch = b.zoom ? 1 + 0.9 * ease(k, 0, 5) : sc * kick;
      layers.push(
        <AbsoluteFill key={`h${i}`} style={{transform: `scale(${punch})`, transformOrigin: b.zoom ? `${daveX / 19.2}% 40%` : origin}}>
          {b.bg ? <PicBg f={f} src={`${ep}/${b.bg}.jpg`} from={at} dim={0.45} /> : <AbsoluteFill style={{background: `radial-gradient(circle at 30% 40%, #fff 0%, ${i % 2 ? C.sky : C.stone} 70%)`}} />}
          <Svg>
            <ellipse cx={daveX} cy={1050} rx={260} ry={34} fill="rgba(0,0,0,0.18)" />
            <Dave f={f} x={daveX} y={1060} s={2.3} keys={[{at, pose: b.pose ?? POSES[i % POSES.length], expr: b.mood ?? 'happy', look: 0.15, talk: true}, {at: fr(b.end), pose: b.pose ?? 'idle', expr: b.mood ?? 'happy', look: 0.15}]} />
          </Svg>
          {pic && <Pic f={f} src={picSrc} x={1340} y={400} w={760} h={560} at={at + 6} look={pic.cut ? 'cutout' : pic.look ?? LOOKS[i % LOOKS.length]} enter="slam" rot={i % 2 ? 3 : -3} label={pic.label} />}
          {b.slam && <Slam f={f} at={at + 2} text={b.slam} x={pic ? 1340 : 1300} y={pic ? 120 : 380} size={pic ? 110 : 170} color={C.yellow} />}
          <HostCaption f={f} words={b.words} x={pic ? 1340 : 1300} />
        </AbsoluteFill>,
      );
    } else if (!cover) {
      if (pic) {
        const s = side++ % 2;
        layers.push(<Pic key={`p${i}`} f={f} src={picSrc} x={s ? 1480 : 440} y={330} w={620} h={440} at={at} out={out} look={pic.cut ? 'cutout' : pic.look ?? LOOKS[i % LOOKS.length]} enter={s ? 'right' : 'left'} rot={s ? 4 : -4} label={pic.label} />);
      }
      if (b.meme) layers.push(<MemeCard key={`m${i}`} f={f} at={at} out={Math.min(out, at + 150)} m={b.meme} />);
      if (b.slam) layers.push(<Slam key={`s${i}`} f={f} at={at} text={b.slam} x={960} y={150} size={150} color={C.yellow} out={out} />);
    }
    if (b.sfx) cues.push({at, src: b.sfx, v: 0.8});
    else if (b.zoom) cues.push({at, src: 'boom', v: 0.8});
    else if (cover) cues.push({at, src: 'whoosh_s', v: 0.35});
    if (pic) cues.push({at: at + 6, src: 'paper', v: 0.6});
    if (b.meme) cues.push({at, src: 'pop', v: 0.6});
    if (b.slam) cues.push({at: at + 2, src: 'stamp', v: 0.5});
  });
  return (
    <AbsoluteFill>
      {layers}
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
