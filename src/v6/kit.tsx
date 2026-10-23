import React, {useLayoutEffect} from 'react';
import {AbsoluteFill, interpolate, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {localFont} from '../theme';
import {Dave3D, Dave3DProps, Face} from './Dave3D';

// v6 kit (STYLE_3D.md §5). Timing grammar measured frame by frame on the reference (30 fps):
//  - motion comes in SHORT bursts then HOLDS: 45 % of all frames are perfectly still, most holds are 0.3–1.5 s;
//  - entrances are fast (4–8 frames) with ease-out + small overshoot, never slow fades;
//  - a pose/face change is an instant swap with 1–2 frames of WHITE silhouette in between (no tween);
//  - big moves get 1–2 smear frames (directional blur + stretch); big reveals get 1 frame high-contrast B&W;
//  - counters roll fast with vertical motion blur under a slow push-in.
export const ANTON = localFont('Anton', 'anton.woff2', '400');
export const UI = localFont('Fredoka', 'fredoka.woff2', '300 700');
export const K = {bg: '#17181B', card: '#222429', line: '#2E3036', green: '#5BE33B', red: '#FF3B3B', yellow: '#FFD400', blue: '#3DB8F5', white: '#F4F4F2', grey: '#8B8F98'};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const outBack = Easing.bezier(0.2, 1.5, 0.4, 1);
export const outQuick = Easing.bezier(0.1, 0.9, 0.2, 1);
// snappy entrance 0→1 in n frames with overshoot
export const snap = (f: number, at: number, n = 6, e = outBack) => interpolate(f, [at, at + n], [0, 1], {...clamp, easing: e});
export const lin = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);

// ---- pose track: [{at, pose, face}] → current state + white flash on swap frames ---------------------------
export type PKey = {at: number; pose?: string; face?: Face};
export const track = (f: number, keys: PKey[], flashLen = 2) => {
  let pose = 'idle';
  let face: Face = 'neutral';
  let last = -1e9;
  let poseChanged = -1e9;
  for (const k of keys) {
    if (k.at > f) break;
    if (k.pose && k.pose !== pose) poseChanged = k.at;
    if (k.pose) pose = k.pose;
    if (k.face) face = k.face;
    last = k.at;
  }
  return {pose, face, since: f - last, flash: f >= poseChanged && f < poseChanged + flashLen && poseChanged > 0};
};

// ---- 3D stage: transparent ThreeCanvas over the 2D layers, camera set per frame ------------------------------
const Cam: React.FC<{pos: [number, number, number]; look: [number, number, number]; fov: number}> = ({pos, look, fov}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    camera.position.set(...pos);
    (camera as any).fov = fov;
    camera.lookAt(...look);
    camera.updateProjectionMatrix();
  });
  return null;
};

export const Stage: React.FC<{
  cam?: [number, number, number];
  look?: [number, number, number];
  fov?: number;
  lights?: 'studio' | 'night' | 'warm';
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({cam = [0, 1.9, 11], look = [0, 1.7, 0], fov = 32, lights = 'studio', style, children}) => (
  <ThreeCanvas width={1920} height={1080} style={{position: 'absolute', inset: 0, ...style}} gl={{antialias: true, alpha: true, preserveDrawingBuffer: true}} camera={{fov, position: cam, near: 0.1, far: 200}}>
    <Cam pos={cam} look={look} fov={fov} />
    {lights === 'night' ? (
      <>
        <ambientLight intensity={0.35} color="#7d93c9" />
        <directionalLight position={[-4, 5, 6]} intensity={1.1} color="#9fc2ff" />
        <pointLight position={[-3.5, 2.4, 1.5]} intensity={14} distance={9} color="#45d6ff" />
      </>
    ) : lights === 'warm' ? (
      <>
        <ambientLight intensity={1.0} color="#ffe6c8" />
        <directionalLight position={[4, 7, 6]} intensity={2.6} color="#fff1dc" />
        <directionalLight position={[-6, 4, -5]} intensity={1.4} color="#bcd6ff" />
      </>
    ) : (
      <>
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 8]} intensity={2.4} />
        <directionalLight position={[-6, 3, -6]} intensity={1.8} color="#b9d4ff" />
      </>
    )}
    {children}
  </ThreeCanvas>
);

// Dave driven by a pose track (the usual way to use him)
export const DaveT: React.FC<{f: number; keys: PKey[]} & Omit<Dave3DProps, 'pose' | 'face' | 'flash' | 'f'>> = ({f, keys, ...rest}) => {
  const s = track(f, keys);
  const face = s.face === 'neutral' && rest.shake ? 'shock' : s.face;
  return <Dave3D {...rest} f={f} pose={s.pose} face={face} flash={s.flash} />;
};

// ---- 2D layers -------------------------------------------------------------------------------------------------
// Home base: charcoal + drifting faint money icons
const ICONS = ['$', '¢', '%', '▲', '◎', '▤'];
export const HomeBase: React.FC<{f: number}> = ({f}) => {
  const cells = [];
  for (let r = 0; r < 11; r++)
    for (let c = 0; c < 18; c++) {
      const x = c * 118 + (r % 2) * 59 - ((f * 0.35) % 118);
      const y = r * 104 - ((f * 0.2) % 104);
      cells.push(
        <div key={`${r}_${c}`} style={{position: 'absolute', left: x, top: y, fontFamily: UI, fontWeight: 700, fontSize: 34, color: '#fff', opacity: 0.05, transform: `rotate(${((r * 7 + c * 13) % 30) - 15}deg)`}}>
          {ICONS[(r * 5 + c * 3) % ICONS.length]}
        </div>,
      );
    }
  return <AbsoluteFill style={{background: `radial-gradient(ellipse at 40% 40%, #202227 0%, ${K.bg} 70%)`, overflow: 'hidden'}}>{cells}</AbsoluteFill>;
};

// Rounded dark UI card that snaps in, then pushes in toward (px,py) from frame `push`
export const UICard: React.FC<{f: number; at: number; x: number; y: number; w: number; h: number; push?: number; px?: number; py?: number; zoom?: number; children: React.ReactNode}> = ({f, at, x, y, w, h, push, px = 0.5, py = 0.5, zoom = 1.5, children}) => {
  const k = snap(f, at, 7);
  const z = push !== undefined ? 1 + (zoom - 1) * snap(f, push, 10, outQuick) : 1;
  const drift = 1 + lin(f, at, at + 240) * 0.04;
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transformOrigin: `${px * 100}% ${py * 100}%`, transform: `translateY(${(1 - k) * 40}px) scale(${(0.85 + 0.15 * k) * z * drift})`, opacity: Math.min(1, k * 1.6)}}>
      <div style={{width: '100%', height: '100%', background: K.card, border: `2px solid ${K.line}`, borderRadius: 22, boxShadow: '0 24px 60px rgba(0,0,0,0.55)', overflow: 'hidden', position: 'relative'}}>{children}</div>
    </div>
  );
};

const fmt = (v: number, d = 0) => v.toLocaleString('en-US', {minimumFractionDigits: d, maximumFractionDigits: d});

// Rolling counter: fast roll with vertical motion blur, lands with a tiny bounce
export const Counter: React.FC<{f: number; at: number; dur?: number; from?: number; to: number; dec?: number; prefix?: string; suffix?: string; size?: number; color?: string; style?: React.CSSProperties}> = ({f, at, dur = 18, from = 0, to, dec = 0, prefix = '', suffix = '', size = 200, color = K.white, style}) => {
  const t = lin(f, at, at + dur);
  const e = Easing.out(Easing.cubic)(t);
  const v = from + (to - from) * e;
  const speed = t < 1 ? (1 - e) * 1.2 : 0;
  const land = f >= at + dur ? 1 + 0.08 * Math.max(0, 1 - (f - at - dur) / 5) : 1;
  return (
    <div style={{fontFamily: ANTON, fontSize: size, color, lineHeight: 1, filter: `blur(${speed * 4}px)`, transform: `scale(${land}) scaleY(${1 + speed * 0.25})`, textShadow: color !== K.white ? `0 0 40px ${color}55` : '0 6px 0 rgba(0,0,0,0.35)', ...style}}>
      {prefix}
      {fmt(v, dec)}
      {suffix}
    </div>
  );
};

// Big number card on home base (label / number / grey explanation)
export const NumCard: React.FC<{f: number; at: number; label: string; to: number; dec?: number; prefix?: string; suffix?: string; color?: string; sub?: string; x?: number; y?: number}> = ({f, at, label, to, dec, prefix, suffix, color = K.green, sub, x = 760, y = 470}) => {
  if (f < at) return null;
  const k = snap(f, at, 6);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * k})`, opacity: Math.min(1, k * 2), textAlign: 'center'}}>
      <div style={{fontFamily: UI, fontWeight: 700, fontSize: 46, color: K.white, letterSpacing: 4}}>{label}</div>
      <Counter f={f} at={at + 2} to={to} dec={dec} prefix={prefix} suffix={suffix} color={color} size={230} />
      {sub ? <div style={{fontFamily: UI, fontSize: 30, color: K.grey, marginTop: 6}}>{sub}</div> : null}
    </div>
  );
};

// Comic burst: white starburst + giant outlined word, halftone, slams in over 3 frames
export const ComicBurst: React.FC<{f: number; at: number; top?: string; word: string; x?: number; y?: number; color?: string; rot?: number}> = ({f, at, top, word, x = 560, y = 560, color = '#FF2E3F', rot = -8}) => {
  if (f < at) return null;
  const k = snap(f, at, 3, outQuick);
  const sh = f - at < 8 ? Math.sin((f - at) * 2.5) * (8 - (f - at)) * 2 : 0;
  const pts: string[] = [];
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const r = i % 2 ? 300 : 410 + ((i * 37) % 60);
    pts.push(`${Math.cos(a) * r * 1.35},${Math.sin(a) * r * 0.8}`);
  }
  const txt = (s: string, size: number, fill: string, dy: number) => (
    <text x={0} y={dy} fontFamily={ANTON} fontSize={size} fill={fill} textAnchor="middle" dominantBaseline="middle" stroke="#111" strokeWidth={size / 9} paintOrder="stroke" strokeLinejoin="round">
      {s}
    </text>
  );
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <defs>
        <pattern id="ht" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="3.2" fill="#000" opacity="0.18" />
        </pattern>
      </defs>
      <g transform={`translate(${x + sh},${y}) rotate(${rot}) scale(${1.5 - 0.5 * k})`}>
        <polygon points={pts.join(' ')} fill="#fff" stroke="#111" strokeWidth={10} />
        <polygon points={pts.join(' ')} fill="url(#ht)" />
        {top ? txt(top, 150, '#fff', -120) : null}
        {txt(word, top ? 230 : 260, color, top ? 60 : 0)}
      </g>
    </svg>
  );
};

// Chapter title card: bright blue, giant yellow condensed italic, small white subtitle
export const ChapterCard: React.FC<{f: number; at: number; title: string; kicker?: string; sub?: string}> = ({f, at, title, kicker, sub}) => {
  if (f < at) return null;
  const k = snap(f, at, 6, outQuick);
  return (
    <AbsoluteFill style={{background: K.blue, alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 6px)'}} />
      <div style={{fontFamily: ANTON, fontStyle: 'italic', fontSize: 250, color: K.yellow, transform: `skewX(-8deg) translateX(${(1 - k) * -160}px) scaleX(${0.9 + 0.1 * k})`, letterSpacing: 2, textShadow: '0 8px 0 rgba(0,0,0,0.12)'}}>{title}</div>
      {kicker ? <div style={{fontFamily: UI, fontWeight: 700, fontSize: 30, color: '#fff', letterSpacing: 6, marginTop: 10, opacity: lin(f, at + 4, at + 8)}}>{kicker}</div> : null}
      {sub ? <div style={{fontFamily: UI, fontSize: 40, color: '#fff', opacity: lin(f, at + 6, at + 10)}}>{sub}</div> : null}
    </AbsoluteFill>
  );
};

// Week report card: dotted leaders, rows type in one by one, letter grade slams
export const ReportCard: React.FC<{f: number; at: number; title: string; rows: [string, string, string][]; grade: string; gradeColor?: string}> = ({f, at, title, rows, grade, gradeColor = K.yellow}) => {
  if (f < at) return null;
  const row = (label: string, value: string, icon: string, i: number) => {
    const a = at + 8 + i * 9;
    const shown = f >= a;
    const vk = snap(f, a + 4, 5);
    return (
      <div key={label} style={{display: 'flex', alignItems: 'center', fontFamily: UI, fontWeight: 600, fontSize: 52, color: '#fff', height: 86, opacity: shown ? 1 : 0}}>
        <span style={{width: 70, fontSize: 46}}>{icon}</span>
        <span>{label}</span>
        <span style={{flex: 1, borderBottom: '6px dotted #555', margin: '0 18px 14px', transform: `scaleX(${lin(f, a, a + 6)})`, transformOrigin: 'left'}} />
        <span style={{opacity: vk, transform: `scale(${0.6 + 0.4 * vk})`}}>{value}</span>
      </div>
    );
  };
  const ga = at + 8 + rows.length * 9 + 10;
  const gk = snap(f, ga, 4, outBack);
  return (
    <AbsoluteFill style={{background: '#0b0b0c', padding: '110px 260px'}}>
      <div style={{fontFamily: ANTON, fontSize: 96, color: '#fff', marginBottom: 30}}>{title}</div>
      {rows.map((r, i) => row(r[0], r[1], r[2], i))}
      <div style={{height: 4, background: '#666', margin: '26px 0'}} />
      <div style={{display: 'flex', alignItems: 'center', fontFamily: UI, fontWeight: 600, fontSize: 52, color: '#fff', opacity: f >= ga - 6 ? 1 : 0}}>
        <span>Rating</span>
        <span style={{flex: 1, borderBottom: '6px dotted #555', margin: '0 18px 14px'}} />
        <span style={{fontFamily: ANTON, fontSize: 120, color: gradeColor, transform: `scale(${f >= ga ? 2.2 - 1.2 * gk : 0})`, display: 'inline-block'}}>{grade}</span>
      </div>
    </AbsoluteFill>
  );
};

// Full-frame flashes used as cut accents
export const WhiteFlash: React.FC<{f: number; at: number; n?: number}> = ({f, at, n = 2}) => (f >= at && f < at + n ? <AbsoluteFill style={{background: '#fff', opacity: 1 - (f - at) / (n + 1)}} /> : null);
// 1-frame high-contrast black & white "photocopy" frame before a big reveal: wrap the scene in this
export const Threshold: React.FC<{f: number; at: number; n?: number; children: React.ReactNode}> = ({f, at, n = 1, children}) => (
  <AbsoluteFill style={f >= at && f < at + n ? {filter: 'grayscale(1) contrast(12) brightness(1.4)'} : undefined}>{children}</AbsoluteFill>
);
// Smear: directional blur + stretch for the first frames of a fast entrance/exit
export const Smear: React.FC<{f: number; at: number; n?: number; dir?: 'x' | 'y'; children: React.ReactNode}> = ({f, at, n = 2, dir = 'x', children}) => {
  const on = f >= at && f < at + n;
  return <AbsoluteFill style={on ? {filter: 'blur(10px)', transform: dir === 'x' ? 'scaleX(1.18)' : 'scaleY(1.18)'} : undefined}>{children}</AbsoluteFill>;
};
// Hand-drawn "shock lines" that boil (redrawn every 3 frames) around a point
export const ShockLines: React.FC<{f: number; at: number; x: number; y: number; r?: number; n?: number; color?: string}> = ({f, at, x, y, r = 170, n = 9, color = '#fff'}) => {
  if (f < at) return null;
  const seed = Math.floor(f / 3);
  const rnd = (i: number) => {
    const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: n}).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + rnd(i) * 0.3;
        const r0 = r + rnd(i + 9) * 25;
        const r1 = r0 + 50 + rnd(i + 3) * 40;
        const mx = Math.cos(a + 0.15) * (r0 + r1) * 0.5;
        const my = Math.sin(a + 0.15) * (r0 + r1) * 0.5;
        return <polyline key={i} points={`${x + Math.cos(a) * r0},${y + Math.sin(a) * r0} ${x + mx},${y + my} ${x + Math.cos(a) * r1},${y + Math.sin(a) * r1}`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />;
      })}
    </svg>
  );
};
