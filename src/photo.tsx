import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, FONT, HAND} from './theme';
import {ease, pop, shake} from './anim';

// Mixed media (PLAYBOOK §0.10): REAL photos next to the drawn world.
// These are HTML layers in the same 1920×1080 space as <Svg>, so put them as siblings of <Svg> inside a scene:
//   <Interior /> <PicBg …/> <Pic …/> <Svg>…Dave…</Svg>
// Files live in public/photos/epNN/<id>.jpg|png (made by pipeline/photos.py from pipeline/photos/epNN.json).
// `src` is 'epNN/<id>.jpg'.

export type PicLook = 'polaroid' | 'sticker' | 'tape' | 'cutout' | 'plain' | 'news' | 'circle';
export type PicEnter = 'pop' | 'slam' | 'drop' | 'left' | 'right' | 'none';

export type PicProps = {
  f: number;
  src: string;
  x: number; // centre
  y: number;
  w: number;
  h: number;
  at?: number; // frame it enters (default: already there)
  out?: number; // frame it leaves
  look?: PicLook;
  enter?: PicEnter;
  rot?: number;
  kb?: number; // Ken Burns zoom inside the frame (0 = off)
  pos?: string; // CSS object-position, e.g. '50% 20%' to keep a face in frame
  label?: string; // caption on the polaroid / tape strip / news banner
  gray?: boolean;
  wob?: boolean; // paper-cutout wobble (stop-motion feel)
  o?: number;
  s?: number; // extra scale (use bump())
  ring?: boolean; // red marker ring around it
};

const url = (src: string) => staticFile(`photos/${src}`);

export const Pic: React.FC<PicProps> = ({f, src, x, y, w, h, at = -999, out, look = 'polaroid', enter = 'pop', rot = 0, kb = 0.06, pos = '50% 50%', label, gray, wob = true, o = 1, s = 1, ring}) => {
  if (f < at || (out !== undefined && f >= out + 8) || o <= 0) return null;
  const k = f - at;
  const leave = out !== undefined ? ease(f, out, out + 8) : 0;
  let sc = 1;
  let dx = 0;
  let dy = 0;
  let dr = 0;
  if (at > -999) {
    if (enter === 'pop') sc = pop(f, at, 10, 210);
    if (enter === 'slam') {
      sc = ease(k, 0, 6, 2.4, 1);
      const sh = shake(f, at + 6, 16, 10);
      dx = sh.x;
      dy = sh.y;
    }
    if (enter === 'drop') {
      dy = ease(k, 0, 9, -900, 0) + (k >= 9 && k < 16 ? -Math.sin(((k - 9) / 7) * Math.PI) * 26 : 0);
      dr = ease(k, 0, 12, -14, 0);
    }
    if (enter === 'left') {
      dx = ease(k, 0, 10, -1400, 0);
      dr = ease(k, 0, 14, -10, 0);
    }
    if (enter === 'right') {
      dx = ease(k, 0, 10, 1400, 0);
      dr = ease(k, 0, 14, 10, 0);
    }
  }
  const wobble = wob ? (Math.floor(f / 7) % 2 ? 0.7 : -0.7) : 0;
  const zoom = 1 + kb * Math.min(1, Math.max(0, k < 0 ? f : k) / 240);
  const framed = look === 'polaroid' || look === 'sticker' || look === 'tape' || look === 'news';
  const pad = look === 'polaroid' ? 22 : look === 'sticker' ? 14 : look === 'news' ? 10 : look === 'tape' ? 12 : 0;
  const bottom = look === 'polaroid' ? (label ? 92 : 56) : look === 'news' && label ? 78 : pad;
  const radius = look === 'sticker' ? 28 : look === 'circle' ? 9999 : look === 'plain' ? 18 : 4;
  const outline = '#fff';
  const cut = look === 'cutout';
  const img = (
    <Img
      src={url(src)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: cut ? 'contain' : 'cover',
        objectPosition: pos,
        transform: cut ? undefined : `scale(${zoom})`,
        filter: [gray ? 'grayscale(1) contrast(1.1)' : '', cut ? `drop-shadow(7px 0 0 ${outline}) drop-shadow(-7px 0 0 ${outline}) drop-shadow(0 7px 0 ${outline}) drop-shadow(0 -7px 0 ${outline}) drop-shadow(10px 14px 0 rgba(35,35,43,0.22))` : ''].join(' ').trim() || undefined,
        display: 'block',
      }}
    />
  );
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2 - pad + dx,
        top: y - h / 2 - pad + dy + leave * 60,
        width: w + pad * 2,
        height: h + pad + bottom,
        transform: `rotate(${rot + dr + wobble}deg) scale(${sc * s * (1 - leave * 0.2)})`,
        transformOrigin: '50% 50%',
        opacity: o * (1 - leave),
      }}
    >
      {framed ? (
        <div style={{position: 'absolute', inset: 0, background: '#fff', border: `6px solid ${C.ink}`, borderRadius: look === 'sticker' ? 38 : 8, boxShadow: '12px 16px 0 rgba(35,35,43,0.18)'}} />
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: pad,
          top: pad,
          width: w,
          height: h,
          overflow: cut ? 'visible' : 'hidden',
          borderRadius: radius,
          border: look === 'circle' || look === 'plain' ? `7px solid ${C.ink}` : framed ? `3px solid ${C.ink}` : undefined,
          boxShadow: look === 'circle' || look === 'plain' ? '10px 14px 0 rgba(35,35,43,0.18)' : undefined,
          boxSizing: 'border-box',
          background: cut ? undefined : '#ddd',
        }}
      >
        {img}
      </div>
      {look === 'tape' ? (
        <>
          <div style={{position: 'absolute', left: '50%', top: -26, width: 190, height: 52, marginLeft: -95, background: 'rgba(255,209,102,0.92)', border: `3px solid ${C.ink}`, transform: 'rotate(-4deg)'}} />
          {label ? (
            <div style={{position: 'absolute', left: 0, right: 0, bottom: -64, textAlign: 'center'}}>
              <span style={{fontFamily: FONT, fontWeight: 700, fontSize: 40, color: C.ink, background: C.yellow, border: `5px solid ${C.ink}`, borderRadius: 14, padding: '4px 22px'}}>{label}</span>
            </div>
          ) : null}
        </>
      ) : null}
      {look === 'polaroid' && label ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontFamily: HAND, fontWeight: 700, fontSize: Math.min(58, (w / Math.max(6, label.length)) * 1.9), color: C.ink, lineHeight: 1}}>{label}</div>
      ) : null}
      {look === 'news' && label ? (
        <div style={{position: 'absolute', left: pad, right: pad, bottom: 10, height: 60, background: C.red, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: Math.min(40, (w / Math.max(8, label.length)) * 1.7), display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 1}}>{label}</div>
      ) : null}
      {(look === 'sticker' || look === 'circle' || look === 'plain' || look === 'cutout') && label ? (
        <div style={{position: 'absolute', left: -200, right: -200, bottom: -74, textAlign: 'center'}}>
          <span style={{fontFamily: FONT, fontWeight: 700, fontSize: 40, color: '#fff', background: C.ink, borderRadius: 30, padding: '6px 26px'}}>{label}</span>
        </div>
      ) : null}
      {ring ? <div style={{position: 'absolute', inset: -18, border: `12px solid ${C.red}`, borderRadius: look === 'circle' ? 9999 : 40, transform: 'rotate(-2deg)'}} /> : null}
    </div>
  );
};

// Full-screen real photo as the WORLD of a scene (Dave stands in front of it). Slow push-in so it never looks like a still.
export const PicBg: React.FC<{f: number; src: string; from?: number; zoom?: [number, number]; pan?: [number, number]; dim?: number; tint?: string; blur?: number; gray?: boolean; pos?: string; floor?: boolean}> = ({f, src, from = 0, zoom = [1.12, 1.02], pan = [0, 0], dim = 0.18, tint, blur = 0, gray, pos = '50% 50%', floor = true}) => {
  const k = Math.min(1, Math.max(0, (f - from) / 210));
  const z = zoom[0] + (zoom[1] - zoom[0]) * k;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: C.ink}}>
      <Img src={url(src)} style={{position: 'absolute', left: -60, top: -40, width: 2040, height: 1160, objectFit: 'cover', objectPosition: pos, transform: `scale(${z}) translate(${pan[0] * k}px,${pan[1] * k}px)`, filter: [gray ? 'grayscale(1) contrast(1.1)' : 'saturate(1.08)', blur ? `blur(${blur}px)` : ''].join(' ').trim()}} />
      <AbsoluteFill style={{background: tint ?? 'rgba(35,35,43,1)', opacity: dim}} />
      {floor ? <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(35,35,43,0) 62%, rgba(35,35,43,0.55) 100%)'}} /> : null}
    </AbsoluteFill>
  );
};

// Giant kinetic word for hooks (HTML, so it can sit above photos). Slams in, then holds.
export const Slam: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; color?: string; bg?: string; rot?: number; out?: number}> = ({f, at, text, x, y, size = 150, color = '#fff', bg, rot = -3, out}) => {
  if (f < at || (out !== undefined && f >= out)) return null;
  const k = f - at;
  const sc = ease(k, 0, 5, 2.6, 1);
  const sh = shake(f, at + 5, 12, 9);
  return (
    <div style={{position: 'absolute', left: x + sh.x, top: y + sh.y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity: ease(k, 0, 3), whiteSpace: 'nowrap'}}>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1,
          color,
          background: bg,
          padding: bg ? '6px 34px 14px' : undefined,
          borderRadius: bg ? 26 : undefined,
          border: bg ? `8px solid ${C.ink}` : undefined,
          WebkitTextStroke: bg ? undefined : `${Math.round(size / 9)}px ${C.ink}`,
          paintOrder: 'stroke fill',
          boxShadow: bg ? '12px 14px 0 rgba(35,35,43,0.25)' : undefined,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Drawn characters on top of a real photo need a white paper outline or they vanish on dark areas:
//   <PicBg …/> <Halo><Svg>…Dave…</Svg></Halo>
export const Halo: React.FC<{children: React.ReactNode; w?: number; color?: string}> = ({children, w = 5, color = '#fff'}) => (
  <AbsoluteFill style={{filter: `drop-shadow(${w}px 0 0 ${color}) drop-shadow(-${w}px 0 0 ${color}) drop-shadow(0 ${w}px 0 ${color}) drop-shadow(0 -${w}px 0 ${color}) drop-shadow(8px 12px 0 rgba(35,35,43,0.25))`}}>{children}</AbsoluteFill>
);
