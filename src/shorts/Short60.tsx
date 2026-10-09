import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop, lin} from '../anim';

export const W = 1080;
export const H = 1920;

// ---- mood accent per beat (purely cosmetic, picked by hand) ----
const MOOD: Record<string, string> = {
  s2: C.red, s10: C.red, s14: C.red,
  s1: C.green, s8: C.green, s17: C.gold, s16: C.gold, s13: C.gold,
};
const moodFor = (id: string) => MOOD[id] ?? C.blue;

// ---- tiny sound helper: plays a one-shot sfx at an absolute frame ----
const Sfx: React.FC<{at: number; file: string; vol?: number}> = ({at, file, vol = 1}) =>
  at < 0 ? null : (
    <Sequence from={at} durationInFrames={60} layout="none">
      <Audio src={staticFile(`sfx/${file}.wav`)} volume={vol} />
    </Sequence>
  );

// ---- big full-bleed word slam (BANNED / LIMITED style) ----
const Slam: React.FC<{f: number; at: number; text: string; sub?: string; color: string}> = ({f, at, text, sub, color}) => {
  const lf = f - at;
  if (lf < 0 || lf > 58) return null;
  const s = pop(lf, 0, 9, 220);
  const o = 1 - ease(lf, 40, 58);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <div
        style={{
          transform: `scale(${0.4 + s * 0.6}) rotate(${(1 - s) * -8}deg)`,
          background: color,
          color: '#fff',
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 148,
          padding: '28px 64px',
          borderRadius: 28,
          border: '10px solid #fff',
          boxShadow: '0 18px 0 rgba(0,0,0,0.18)',
          letterSpacing: 2,
          textAlign: 'center',
        }}
      >
        {text}
        {sub && <div style={{fontSize: 40, fontWeight: 500, marginTop: 8}}>{sub}</div>}
      </div>
    </AbsoluteFill>
  );
};

// ---- small persistent HUD, top-right ----
const Hud: React.FC<{f: number; show: boolean; value: string; label: string; bump: number}> = ({f, show, value, label, bump}) => {
  const o = show ? ease(f, 0, 10) : 0;
  const k = pop(Math.max(0, f - bump), 0, 10, 240);
  if (!show) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 110,
        right: 48,
        opacity: o,
        background: '#fff',
        border: `5px solid ${C.ink}`,
        borderRadius: 18,
        padding: '14px 22px',
        textAlign: 'center',
        transform: `scale(${1 + k * 0.12})`,
        boxShadow: '0 8px 0 rgba(0,0,0,0.12)',
      }}
    >
      <div style={{fontFamily: FONT, fontSize: 22, fontWeight: 600, color: C.gray, letterSpacing: 1}}>{label}</div>
      <div style={{fontFamily: FONT, fontSize: 44, fontWeight: 700, color: value.startsWith('-') ? C.red : C.green}}>{value}</div>
    </div>
  );
};

// ---- comparison bar stat (0.5% vs 70%) ----
const CompareBar: React.FC<{f: number; at: number}> = ({f, at}) => {
  const lf = f - at;
  if (lf < 0 || lf > 170) return null;
  const o = ease(lf, 0, 10) * (1 - ease(lf, 150, 170));
  const w1 = ease(lf, 10, 40, 0, 10);
  const w2 = ease(lf, 30, 65, 0, 94);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <div style={{width: 820, background: '#fff', border: `6px solid ${C.ink}`, borderRadius: 24, padding: 36}}>
        <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 30, color: C.ink, marginBottom: 20, textAlign: 'center'}}>
          who makes the sportsbook its money
        </div>
        <Row label="0.5% of customers" pct={w1} color={C.gray} />
        <div style={{height: 18}} />
        <Row label="make 70%+ of revenue" pct={w2} color={C.red} />
      </div>
    </AbsoluteFill>
  );
};
const Row: React.FC<{label: string; pct: number; color: string}> = ({label, pct, color}) => (
  <div>
    <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 26, color: C.ink, marginBottom: 8}}>{label}</div>
    <div style={{height: 34, background: C.soft, borderRadius: 10, overflow: 'hidden'}}>
      <div style={{height: '100%', width: `${pct}%`, background: color, borderRadius: 10}} />
    </div>
  </div>
);

// ---- word-synced caption, one beat on screen at a time ----
const Captions: React.FC<{f: number}> = ({f}) => {
  const {t} = useT();
  const sec = f / 30;
  const beats = t.beats;
  let idx = 0;
  for (let i = 0; i < beats.length; i++) {
    if (beats[i].start <= sec) idx = i;
    else break;
  }
  const b = beats[idx];
  const nextStart = beats[idx + 1]?.start ?? t.total;
  if (sec >= nextStart - 0.02) return null; // gap between beats: blank
  const bf = f - Math.round(b.start * 30);
  const entrance = pop(bf, 0, 12, 260);
  const accent = moodFor(b.id);
  let activeWord = 0;
  b.words.forEach((w, i) => {
    if (w.start <= sec) activeWord = i;
  });
  const n = b.words.length;
  const fontSize = n > 13 ? 52 : n > 9 ? 60 : n > 6 ? 68 : 76;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 70px'}}>
      <div
        style={{
          transform: `translateY(${(1 - entrance) * 40}px) scale(${0.9 + entrance * 0.1})`,
          opacity: entrance,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize,
          lineHeight: 1.16,
          textAlign: 'center',
          textShadow: '0 3px 0 rgba(0,0,0,0.08)',
        }}
      >
        {b.words.map((w, i) => {
          const spoken = w.start <= sec;
          const isActive = i === activeWord && spoken;
          const wp = isActive ? pop(f - Math.round(w.start * 30), 0, 9, 300) : 1;
          return (
            <span
              key={i}
              style={{
                color: spoken ? (isActive ? accent : C.ink) : C.gray,
                opacity: spoken ? 1 : 0.45,
                display: 'inline-block',
                transform: `scale(${isActive ? 1 + wp * 0.07 : 1})`,
                margin: '0 16px',
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---- bottom progress bar ----
const Progress: React.FC<{f: number; d: number}> = ({f, d}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: 'rgba(0,0,0,0.08)'}}>
    <div style={{height: '100%', width: `${(f / d) * 100}%`, background: C.green}} />
  </div>
);

// ---- intro bumper (0 - ~0.9s) ----
const Bumper: React.FC<{f: number}> = ({f}) => {
  const o = 1 - ease(f, 18, 28);
  if (f > 30) return null;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 130, opacity: o}}>
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 34, color: C.navy, letterSpacing: 3}}>MONEYWORKS</div>
      <div style={{fontFamily: FONT, fontWeight: 500, fontSize: 24, color: C.gray, marginTop: 4}}>dave's money shorts</div>
    </AbsoluteFill>
  );
};

// ---- outro CTA (last beat, s21) ----
const Outro: React.FC<{f: number; at: number}> = ({f, at}) => {
  const lf = f - at;
  if (lf < 0) return null;
  const o = ease(lf, 0, 15);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 260, opacity: o}}>
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 46, color: C.green}}>▶ WATCH THE FULL STORY</div>
      <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 30, color: C.ink, marginTop: 10}}>follow for part 2 — raccoon's back 🦝</div>
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const f = useCurrentFrame();
  const {t, bs} = useT();
  const d = Math.round(t.total * 30);

  const damageBump = bs('s7');
  const bigDamage = bs('s17');
  const showHud = f >= bs('s2');
  const hudValue = f >= bigDamage ? '-$1,136' : f >= damageBump ? '-$140' : '-$0';

  return (
    <AbsoluteFill style={{background: C.bg}}>
      <Captions f={f} />
      <Bumper f={f} />
      <Hud f={f} show={showHud} value={hudValue} label="DAVE'S DAMAGE" bump={Math.min(damageBump, bigDamage) === damageBump ? damageBump : bigDamage} />

      <Slam f={f} at={bs('s2')} text="BANNED" color={C.red} />
      <Slam f={f} at={bs('s10')} text="LIMITED" sub="for winning too much" color={C.red} />
      <Slam f={f} at={bs('s17')} text="$1,136" sub="the real cost of the 'free' $1,000" color={C.gold} />
      <CompareBar f={f} at={bs('s13')} />
      <Outro f={f} at={bs('s21')} />

      <Progress f={f} d={d} />

      {/* sfx cues */}
      <Sfx at={bs('s2')} file="stamp" />
      <Sfx at={bs('s7')} file="cash" />
      <Sfx at={bs('s8')} file="chime" />
      <Sfx at={bs('s10')} file="stamp" vol={0.9} />
      <Sfx at={bs('s13')} file="whoosh" vol={0.7} />
      <Sfx at={bs('s17')} file="stamp" />
      <Sfx at={bs('s21')} file="ding" vol={0.8} />

      <Audio src={staticFile('music/bgm.mp3')} volume={(x: number) => interpolate(x, [0, 30, d - 40, d], [0, 0.09, 0.09, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} loop />
    </AbsoluteFill>
  );
};

export type Short60Props = {timings: Timings | null};
export const Short60: React.FC<Short60Props> = ({timings}) => {
  if (!timings) return null;
  return (
    <TimingProvider t={timings}>
      <Body />
    </TimingProvider>
  );
};
