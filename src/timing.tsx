import React, {createContext, useContext} from 'react';

export const TAIL_SEC = 1.6;
export const FPS = 30;

export type Word = {text: string; start: number; end: number};
export type Beat = {id: string; start: number; end: number; text: string; words: Word[]};
export type Chapter = {n: number; title: string; start: number; beat: string};
export type Timings = {fps: number; total: number; beats: Beat[]; chapters?: Chapter[]};

const Ctx = createContext<Timings | null>(null);
export const TimingProvider: React.FC<{t: Timings; children: React.ReactNode}> = ({t, children}) => (
  <Ctx.Provider value={t}>{children}</Ctx.Provider>
);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export const useT = () => {
  const t = useContext(Ctx)!;
  const beat = (id: string) => {
    const b = t.beats.find((x) => x.id === id);
    // An upgraded episode (UPGRADE.md) may delete beats the old drawing still names: those scenes simply never appear.
    if (!b) {
      console.warn(`beat ${id} missing`);
      return {id, start: t.total + 60, end: t.total + 61, text: '', words: [{text: '', start: t.total + 60, end: t.total + 61}]};
    }
    return b;
  };
  const fr = (sec: number) => Math.round(sec * FPS);
  const bs = (id: string) => fr(beat(id).start);
  const be = (id: string) => fr(beat(id).end);
  const w = (id: string, word: string, nth = 0, which: 'start' | 'end' = 'start') => {
    const b = beat(id);
    const hits = b.words.filter((x) => norm(x.text) === norm(word));
    const hit = hits[nth] ?? hits[hits.length - 1];
    if (!hit) {
      console.warn(`word "${word}" not in ${id}`);
      return fr(b.start);
    }
    return fr(hit[which]);
  };
  const we = (id: string, word: string, nth = 0) => w(id, word, nth, 'end');
  return {t, beat, bs, be, w, we, fr, end: fr(t.total)};
};

// True while a word is being spoken at frame f (or when there are no timings, e.g. thumbnails).
const spans = new WeakMap<Timings, number[]>();
export const useSpeaking = (f: number) => {
  const t = useContext(Ctx);
  if (!t) return true;
  let s = spans.get(t);
  if (!s) {
    s = t.beats.flatMap((b) => (b.words ?? []).flatMap((w) => [Math.round(w.start * FPS) - 1, Math.round(w.end * FPS) + 1]));
    spans.set(t, s);
  }
  let lo = 0, hi = s.length / 2 - 1;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (f < s[2 * m]) hi = m - 1;
    else if (f > s[2 * m + 1]) lo = m + 1;
    else return true;
  }
  return false;
};
