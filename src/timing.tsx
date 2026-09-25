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
    if (!b) throw new Error(`beat ${id} missing`);
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
