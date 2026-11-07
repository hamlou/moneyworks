import React from 'react';
import {AbsoluteFill, Audio, Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import {ANTON, UI, K, snap, Counter, ComicBurst, HomeBase} from './kit';
import {Music, MSeg} from './kit2';
import {MacroText} from './macro';
import {noise2D} from '@remotion/noise';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {loadFont as lBangers} from '@remotion/google-fonts/Bangers';
import {loadFont as lBebas} from '@remotion/google-fonts/BebasNeue';
import {loadFont as lBungee} from '@remotion/google-fonts/Bungee';
import {loadFont as lOswald} from '@remotion/google-fonts/Oswald';
import {loadFont as lArchivo} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as lRubik} from '@remotion/google-fonts/RubikMonoOne';
import {loadFont as lMarker} from '@remotion/google-fonts/PermanentMarker';

// per-episode creative identity (plan.look from tools/auto.py STYLES): headline font + colour grade
const FONTS: Record<string, () => string> = {
  Bangers: () => lBangers().fontFamily, BebasNeue: () => lBebas().fontFamily, Bungee: () => lBungee().fontFamily,
  Oswald: () => lOswald('normal', {weights: ['700']}).fontFamily, ArchivoBlack: () => lArchivo().fontFamily,
  RubikMonoOne: () => lRubik().fontFamily, PermanentMarker: () => lMarker().fontFamily,
};
let HEAD = ANTON;

// AUTOPILOT renderer: draws ANY episode from src/v6/auto/<id>.plan.json (written by tools/auto.py from the spec).
// No per-episode code. Look = ea1 (owner-approved): 3D shots with push-ins, posed Dave cut-outs on blurred sets,
// verbatim macro quotes, kinetic text, counters, bursts, Src line on every fact, flashes + shakes on hits.
type Bg = {from: number; to: number; k: string; n?: string; off?: number; t?: number; len24?: number; pose?: string | null; set?: [string, number]; title?: string; lines?: string[]; far?: string[]; file?: string; label?: string; flash?: boolean};
type Ov = {from: number; to: number; k: string; [x: string]: any};
export type Plan = {id: string; title: string; frames: number; hookEnd: number; look?: {grade: string; font: string}; bgs: Bg[]; ovs: Ov[]; music: MSeg[]; sfx: Cue[]; lens: Record<string, number>};

const OUTLINE = ['2px 0', '-2px 0', '0 2px', '0 -2px'].map((o) => `drop-shadow(${o} 0 #111)`).join(' ');

const Shot3D: React.FC<{id: string; n: string; off: number; len24: number}> = ({id, n, off, len24}) => {
  const f = useCurrentFrame();
  const last = Math.max(1, Math.floor((len24 / 24 - off) * 30) - 2);
  const v = <OffthreadVideo src={staticFile(`${id}/shot_${n}.mp4`)} startFrom={Math.round(off * 30)} muted style={{width: 1920, height: 1080}} />;
  const z = 1 + 0.0012 * Math.min(f, last) + (f > last ? 0.004 * (f - last) : 0);
  return <AbsoluteFill style={{transform: `scale(${z})`}}>{f < last ? v : <Freeze frame={last}>{v}</Freeze>}</AbsoluteFill>;
};
const Still: React.FC<{id: string; n: string; t: number; soft?: boolean}> = ({id, n, t, soft}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: `scale(${(soft ? 1.12 : 1.03) + 0.0028 * f})`, filter: soft ? 'blur(7px) brightness(0.62)' : 'brightness(0.85)'}}>
      <Freeze frame={Math.round(t * 30)}>
        <OffthreadVideo src={staticFile(`${id}/shot_${n}.mp4`)} muted style={{width: 1920, height: 1080}} />
      </Freeze>
    </AbsoluteFill>
  );
};
const Cut: React.FC<{id: string; pose: string; push?: boolean}> = ({id, pose, push = true}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, transformOrigin: '78% 100%', transform: `scale(${push ? 1.08 + 0.0028 * f : 1})`}}>
      <Img
        src={staticFile(`${id}/cut_${pose}.png`)}
        style={{position: 'absolute', right: -40, bottom: 0, height: 1080, transformOrigin: '50% 100%', transform: `rotate(${Math.sin(f / 17) * 0.8}deg)`, filter: f < 2 ? `brightness(0) invert(1) ${OUTLINE}` : `${OUTLINE} drop-shadow(0 20px 30px rgba(0,0,0,0.45))`}}
      />
    </div>
  );
};
const Chapter: React.FC<{id: string; title: string; n: string; t: number}> = ({id, title, n, t}) => {
  const f = useCurrentFrame();
  return (
    <>
      <Still id={id} n={n} t={t} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: HEAD, fontSize: title.length > 12 ? 150 : 210, color: '#fff', WebkitTextStroke: '8px #111', transform: `scale(${1.6 - 0.6 * snap(f, 2, 6)}) rotate(-3deg)`, textAlign: 'center', padding: '0 80px'}}>{title}</div>
      </AbsoluteFill>
    </>
  );
};
const Photo: React.FC<{id: string; file: string; label?: string}> = ({id, file, label}) => {
  const f = useCurrentFrame();
  return (
    <>
      <HomeBase f={f} />
      <div style={{position: 'absolute', left: 200, top: 120, width: 1000, transformOrigin: '50% 60%', transform: `rotate(-2deg) scale(${snap(f, 0, 6) * (1 + 0.001 * f)})`, background: '#fff', padding: 14, boxShadow: '0 30px 60px rgba(0,0,0,.6)'}}>
        <Img src={staticFile(`${id}/${file}`)} style={{width: '100%', height: 640, objectFit: 'cover', display: 'block'}} />
        {label ? <div style={{fontFamily: HEAD, fontSize: 52, color: '#111', textAlign: 'center', paddingTop: 10}}>{label}</div> : null}
      </div>
    </>
  );
};

// handheld drift (owner: never frozen). Perlin noise -> slow organic sway on every flat/card background.
const Drift: React.FC<{seed: string; children: React.ReactNode}> = ({seed, children}) => {
  const f = useCurrentFrame();
  const x = noise2D(seed + 'x', f / 90, 0) * 14;
  const y = noise2D(seed + 'y', 0, f / 90) * 10;
  const r = noise2D(seed + 'r', f / 120, f / 120) * 0.4;
  return <AbsoluteFill style={{transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(1.04)`}}>{children}</AbsoluteFill>;
};
// chapter light leak: warm burn sweeping across the first ~16 frames of a chapter card
const LightLeak: React.FC<{t: number}> = ({t}) => {
  if (t < 0 || t > 16) return null;
  const o = t < 3 ? t / 3 : Math.max(0, 1 - (t - 3) / 13);
  const cx = -20 + t * 9;
  return <AbsoluteFill style={{mixBlendMode: 'screen', opacity: o, background: `radial-gradient(ellipse 60% 90% at ${cx}% 40%, rgba(255,236,200,1) 0%, rgba(255,150,60,.85) 30%, rgba(200,40,20,.35) 60%, transparent 80%)`}} />;
};

const Background: React.FC<{id: string; b: Bg; fallback: string}> = ({id, b, fallback}) => {
  const f = useCurrentFrame();
  if (b.k === 'shot') return <Shot3D id={id} n={b.n!} off={b.off ?? 0} len24={b.len24 ?? 120} />;
  return <Drift seed={`${b.k}${b.from}`}><BgFlat id={id} b={b} fallback={fallback} /></Drift>;
};
const BgFlat: React.FC<{id: string; b: Bg; fallback: string}> = ({id, b, fallback}) => {
  const f = useCurrentFrame();
  if (b.k === 'still') return (<><Still id={id} n={b.n!} t={b.t ?? 0} soft={!!b.pose} />{b.pose ? <Cut id={id} pose={b.pose} /> : null}</>);
  if (b.k === 'chapter') return <Chapter id={id} title={b.title!} n={b.n!} t={b.t ?? 0} />;
  if (b.k === 'macro') return <MacroText lines={b.lines!} far={b.far} />;
  if (b.k === 'photo') return <Photo id={id} file={b.file!} label={b.label} />;
  if (b.k === 'home') return (<><HomeBase f={f} /><Cut id={id} pose={b.pose || 'determined_present'} push={false} /></>);
  const [n, t] = b.set ?? [fallback, 1];
  return (<><Still id={id} n={n} t={t} soft /><Cut id={id} pose={b.pose || 'neutral_shrug'} /></>);
};

const Kinetic: React.FC<{f: number; o: Ov}> = ({f, o}) => {
  const k = snap(f, o.from, 5);
  return (
    <div style={{position: 'absolute', left: o.x, top: o.y, maxWidth: 1250, fontFamily: HEAD, fontSize: o.size, lineHeight: 1.02, color: o.color, WebkitTextStroke: '5px #111', paintOrder: 'stroke fill', transform: `scale(${1.5 - 0.5 * k}) rotate(-3deg)`, transformOrigin: 'left center', opacity: Math.min(1, k * 2)}}>{o.text}</div>
  );
};
const Bars: React.FC<{f: number; o: Ov}> = ({f, o}) => (
  <div style={{position: 'absolute', left: 140, top: 200, width: 1100}}>
    {o.rows.map((r: {label: string; pct: number; color: string}, i: number) => {
      const k = Math.min(1, Math.max(0, (f - o.from - i * 3) / 10));
      return (
        <div key={i} style={{marginBottom: 40}}>
          <div style={{fontFamily: UI, fontWeight: 600, fontSize: 44, color: '#fff', textShadow: '0 3px 8px #000'}}>{r.label}</div>
          <div style={{height: 76, background: 'rgba(42,44,51,.9)', borderRadius: 12, marginTop: 8, overflow: 'hidden'}}>
            <div style={{width: `${(r.pct / o.max) * 100 * k}%`, height: '100%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20, fontFamily: HEAD, fontSize: 52, color: '#fff'}}>{(r.pct * k).toFixed(r.pct % 1 ? 1 : 0)}</div>
          </div>
        </div>
      );
    })}
  </div>
);
const Checks: React.FC<{f: number; o: Ov}> = ({f, o}) => (
  <div style={{position: 'absolute', left: 140, top: 170, width: 1000, background: '#f3efe4', borderRadius: 18, padding: 50, boxShadow: '0 30px 60px rgba(0,0,0,.6)', transform: `scale(${snap(f, o.from, 6)}) rotate(-1.5deg)`, transformOrigin: '30% 50%'}}>
    {o.title ? <div style={{fontFamily: HEAD, fontSize: 64, color: '#1d2b4f', borderBottom: '4px solid #1d2b4f', paddingBottom: 14, marginBottom: 30}}>{o.title}</div> : null}
    {o.rows.map((r: {text: string; sub: string; at: number}, i: number) => (
      <div key={i} style={{display: 'flex', alignItems: 'center', marginBottom: 30, opacity: f >= r.at ? 1 : 0.25}}>
        <div style={{width: 80, height: 80, borderRadius: 12, border: '6px solid #1d2b4f', marginRight: 30, fontFamily: HEAD, fontSize: 70, color: '#2e9d43', textAlign: 'center', lineHeight: '78px'}}>{f >= r.at ? '✓' : ''}</div>
        <div>
          <div style={{fontFamily: UI, fontWeight: 700, fontSize: 52, color: '#222'}}>{r.text}</div>
          {r.sub ? <div style={{fontFamily: UI, fontSize: 34, color: '#666'}}>{r.sub}</div> : null}
        </div>
      </div>
    ))}
  </div>
);
const Overlay: React.FC<{f: number; o: Ov}> = ({f, o}) => {
  if (o.k === 'text') return <Kinetic f={f} o={o} />;
  if (o.k === 'count')
    return (
      <div style={o.center ? {position: 'absolute', left: 0, right: 0, top: o.y, textAlign: 'center', WebkitTextStroke: '4px #111'} : {position: 'absolute', left: o.x, top: o.y, WebkitTextStroke: '4px #111'}}>
        <Counter f={f} at={o.from} dur={o.dur} to={o.to} dec={o.dec} prefix={o.prefix} suffix={o.suffix} size={o.size} color={o.color} />
      </div>
    );
  if (o.k === 'burst') return <ComicBurst f={f} at={o.from} word={o.word} x={560} y={600} />;
  if (o.k === 'stamp')
    return (
      <div style={{position: 'absolute', left: 160, top: 700, fontFamily: HEAD, fontSize: 110, color: o.color, border: `10px solid ${o.color}`, padding: '0 30px', background: 'rgba(0,0,0,.25)', transform: `rotate(-6deg) scale(${1.6 - 0.6 * snap(f, o.from, 4)})`}}>{o.text}</div>
    );
  if (o.k === 'bars') return <Bars f={f} o={o} />;
  if (o.k === 'checks') return <Checks f={f} o={o} />;
  if (o.k === 'src')
    return (
      <div style={{position: 'absolute', left: 40, bottom: 34, maxWidth: 1300, fontFamily: UI, fontWeight: 600, fontSize: 26, color: '#fff', background: 'rgba(0,0,0,0.62)', padding: '8px 16px', borderRadius: 10, opacity: snap(f, o.from, 6)}}>Source: {o.text}</div>
    );
  return null;
};

export const AutoEp: React.FC<{plan: Plan}> = ({plan}) => {
  const f = useCurrentFrame();
  HEAD = plan.look && FONTS[plan.look.font] ? FONTS[plan.look.font]() : ANTON;
  const grade = plan.look?.grade;
  const {bgs, ovs, id} = plan;
  let i = 0;
  while (i + 1 < bgs.length && f >= bgs[i + 1].from) i++;
  const b = bgs[i];
  const fallback = Object.keys(plan.lens)[0];
  const live = ovs.filter((o) => o.k !== 'shake' && o.k !== 'punch' && f >= o.from && f < o.to);
  const pu = ovs.find((o) => o.k === 'punch' && f >= o.from && f < o.to && o.from >= (b ? b.from : 0));
  const sh = ovs.filter((o) => o.k === 'shake' && f >= o.from && f < o.to).reduce((m, o) => Math.max(m, o.amp * (1 - (f - o.from) / (o.to - o.from))), 0);
  const flash = b && b.flash && f - b.from < 2;
  // motion blur: real (CameraMotionBlur) only on the light overlay layer; the 3D video layer gets a cheap
  // decaying CSS blur instead (multi-sample blur re-decodes video 6x per frame -> render timeout on CI).
  const pb = pu ? Math.max(0, 6 - (f - pu.from)) : 0;
  const eb = b && i > 0 ? Math.max(0, 5 - (f - b.from)) : 0;
  const bgBlur = Math.max(pb, eb * 1.2, sh > 4 ? sh * 0.25 : 0);
  const fast = bgBlur > 0;
  const chap = b && b.k === 'chapter';
  const whip = chap ? (1 - snap(f, b.from, 7)) * 260 : 0;
  const ovs2 = (
    <AbsoluteFill>
      {live.map((o, k) => (
        <Overlay key={k} f={f} o={o} />
      ))}
    </AbsoluteFill>
  );
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `translate(${Math.sin(f * 2.9) * sh + whip}px, ${Math.cos(f * 3.7) * sh * 0.7}px)`}}>
        {b ? (
          <AbsoluteFill style={{...(pu ? {transform: `scale(${pu.z + 0.002 * (f - pu.from)})`, transformOrigin: `${pu.ox}% ${pu.oy}%`} : {}), filter: [grade, bgBlur > 0.3 ? `blur(${bgBlur.toFixed(1)}px)` : ''].filter(Boolean).join(' ') || undefined}}>
          <Sequence from={b.from} durationInFrames={Math.max(1, b.to - b.from)} layout="none">
            <AbsoluteFill>
              <Background id={id} b={b} fallback={fallback} />
            </AbsoluteFill>
          </Sequence>
          </AbsoluteFill>
        ) : null}
        {fast ? <CameraMotionBlur shutterAngle={200} samples={5}>{ovs2}</CameraMotionBlur> : ovs2}
      </AbsoluteFill>
      {chap ? <LightLeak t={f - b.from} /> : null}
      {flash ? <AbsoluteFill style={{background: '#fff', opacity: f === b.from ? 1 : 0.5}} /> : null}
      <Audio src={staticFile(`${id}/voice.flac`)} />
      <Music segs={plan.music} />
      <Sfx cues={plan.sfx} />
    </AbsoluteFill>
  );
};

export const autoComponent = (p: Plan): React.FC => {
  const C: React.FC = () => <AutoEp plan={p} />;
  return C;
};
