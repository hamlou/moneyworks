import {Easing, interpolate, spring} from 'remotion';

const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Guard: if a timing range is empty or reversed (words spoken faster than planned), jump instead of crashing the render.
export const ease = (f: number, a: number, b: number, from = 0, to = 1) =>
  b <= a ? (f < a ? from : to) : interpolate(f, [a, b], [from, to], {...CL, easing: Easing.inOut(Easing.cubic)});

export const lin = (f: number, a: number, b: number, from = 0, to = 1) =>
  b <= a ? (f < a ? from : to) : interpolate(f, [a, b], [from, to], CL);

export const pop = (f: number, at: number, damping = 11, stiffness = 190) =>
  f < at ? 0 : spring({frame: f - at, fps: 30, config: {damping, stiffness, mass: 0.6}});

export const out = (f: number, at: number, dur = 8) => 1 - ease(f, at, at + dur);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const shake = (f: number, at: number, amp = 14, dur = 12) => {
  if (f < at || f > at + dur) return {x: 0, y: 0};
  const k = 1 - (f - at) / dur;
  return {x: Math.sin((f - at) * 2.7) * amp * k, y: Math.cos((f - at) * 3.3) * amp * 0.6 * k};
};

export const keyed = (f: number, keys: [number, number][], e = true) => {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [f0, v0] = keys[i - 1];
    const [f1, v1] = keys[i];
    if (f <= f1) return e ? ease(f, f0, f1, v0, v1) : lin(f, f0, f1, v0, v1);
  }
  return keys[keys.length - 1][1];
};
