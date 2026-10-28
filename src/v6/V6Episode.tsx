import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cue, Sfx} from '../fx';
import {Bedroom, Blob} from './sets';
import {ANTON, ChapterCard, ComicBurst, Counter, DaveT, HomeBase, K, PKey, ReportCard, Stage, UI, UICard, WhiteFlash, lin, snap} from './kit';
import {Face} from './Dave3D';

// V6Episode: a generic beat interpreter for v6 episodes (STYLE_3D.md §7). Reads
//   public/<ep>/script.json   (the episode JSON: beats with set/face/pose3d/ui/num/comic/slam/score/report/plate/skip/sfx)
//   public/<ep>/timings.json  (word times from the voice step)
// and draws every beat with the v6 kit (HomeBase, UICard, counters, comic bursts, report cards, 3D Dave).

const FPS = 30;
export const V6_TAIL = 1.6;

type Word = {text: string; start: number; end: number};
type TBeat = {id: string; start: number; end: number; text: string; words: Word[]};
export type V6Timings = {fps: number; total: number; beats: TBeat[]; chapters?: {n: number; title: any; start: number; beat: string}[]};
type At = {at?: string};
export type SBeat = {
  id: string;
  text: string;
  set?: 'home' | 'garage' | 'tvroom' | 'bedroom' | 'finale';
  face?: string;
  pose3d?: string;
  chapter?: string;
  chapter_sub?: string;
  aside?: boolean;
  skip?: string;
  sfx?: {s: string; at: string}[];
  num?: {label: string; v: string; color?: string; sub?: string} & At;
  comic?: {t: string} & At;
  slam?: {t: string} & At;
  ui?: {t: 'list' | 'stats' | 'search' | 'app'; data: any; push?: string};
  score?: {a: number; b: number; c: string} & At;
  report?: {title: string; rows: string[][]; grade: string};
  plate?: {id: string} & At;
};
export type V6Script = {id: string; beats: SBeat[]};
export type V6EpisodeProps = {ep: string; timings: V6Timings | null; script: V6Script | null; plates: Record<string, boolean>};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const fr = (sec: number) => Math.round(sec * FPS);

// frame of a spoken word inside a beat. "word#2" = 2nd occurrence (1-based).
const wf = (tb: TBeat, spec: string | undefined, fallback: number) => {
  if (!spec) return fallback;
  const [w, n] = spec.split('#');
  const hits = tb.words.filter((x) => norm(x.text) === norm(w));
  const hit = hits[n ? Number(n) - 1 : 0] ?? hits[hits.length - 1];
  return hit ? fr(hit.start) : fallback;
};

const POSE: Record<string, string> = {
  point_r: 'point_r', point_l: 'point_l', point_up: 'point_up', present: 'present_l', pointer_stick: 'point_l', shrug: 'shrug', celebrate: 'celebrate', panic: 'panic',
  facepalm: 'facepalm', hands_on_face: 'facepalm', thinking: 'think', think: 'think', arms_crossed: 'hips', thumbs_up: 'thumbs', peace: 'peace', wave: 'wave', idle: 'idle',
  sitting_laptop: 'sit', lying_down: 'lie',
};
const FACE: Record<string, Face> = {
  neutral: 'neutral', happy: 'happy', grin: 'grin', shock: 'shock', angry: 'angry', sad: 'sad', smug: 'smug', think: 'think', worried: 'sad', suspicious: 'think', tired: 'sad', scream: 'shock',
  money: 'money', sleep: 'sleep',
};
const ALT = ['point_l', 'present_l', 'idle', 'shrug', 'point_r'];

const col = (c?: string) => (c === 'red' ? K.red : c === 'green' ? K.green : c === 'blue' ? K.blue : K.yellow);

// ---- big number: rolling counter when the value is numeric, otherwise a popped text ------------------------------
const BigNum: React.FC<{f: number; at: number; n: NonNullable<SBeat['num']>}> = ({f, at, n}) => {
  if (f < at) return null;
  const k = snap(f, at, 6);
  const m = /^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/.exec(n.v);
  const color = col(n.color);
  return (
    <div style={{position: 'absolute', left: 760, top: 470, transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * k})`, opacity: Math.min(1, k * 2), textAlign: 'center', width: 1300}}>
      <div style={{fontFamily: UI, fontWeight: 700, fontSize: 44, color: K.white, letterSpacing: 4}}>{n.label}</div>
      {m ? (
        <Counter f={f} at={at + 2} to={parseFloat(m[2].replace(/,/g, ''))} dec={(m[2].split('.')[1] || '').length} prefix={m[1]} suffix={m[3]} color={color} size={230} />
      ) : (
        <div style={{fontFamily: ANTON, fontSize: 230, color, lineHeight: 1, textShadow: `0 0 40px ${color}55`}}>{n.v}</div>
      )}
      {n.sub ? <div style={{fontFamily: UI, fontSize: 30, color: K.grey, marginTop: 6}}>{n.sub}</div> : null}
    </div>
  );
};

// ---- UI card content ---------------------------------------------------------------------------------------------
const Row: React.FC<{f: number; at: number; children: React.ReactNode}> = ({f, at, children}) => {
  const k = snap(f, at, 6);
  return <div style={{opacity: Math.min(1, k * 2), transform: `translateX(${(1 - k) * 40}px)`}}>{children}</div>;
};
const UiBody: React.FC<{f: number; at: number; ui: NonNullable<SBeat['ui']>}> = ({f, at, ui}) => {
  const d = ui.data;
  const title = (
    <div style={{fontFamily: UI, fontWeight: 700, fontSize: 40, color: K.grey, letterSpacing: 3, padding: '28px 44px 10px'}}>{d.title ?? (ui.t === 'search' ? 'SEARCH' : '')}</div>
  );
  if (ui.t === 'search') {
    const typed = Math.min(d.query.length, Math.floor(Math.max(0, f - at - 4) / 1.6));
    return (
      <div style={{padding: 44}}>
        <div style={{background: K.bg, borderRadius: 60, padding: '24px 40px', fontFamily: UI, fontSize: 48, color: K.white}}>
          {d.query.slice(0, typed)}
          <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>|</span>
        </div>
        {(d.suggest ?? []).map((s: string, i: number) => (
          <div key={s} style={{opacity: f - at > 40 + i * 6 ? 1 : 0, fontFamily: UI, fontSize: 38, color: K.grey, padding: '18px 40px'}}>
            {s}
          </div>
        ))}
      </div>
    );
  }
  if (ui.t === 'stats') {
    return (
      <div>
        {title}
        <div style={{padding: '0 44px'}}>
          {d.rows.map((r: string[], i: number) => (
            <Row key={i} f={f} at={at + 8 + i * 10}>
              <div style={{display: 'flex', alignItems: 'center', fontFamily: UI, fontWeight: 600, fontSize: 46, color: '#fff', height: 98, borderBottom: `2px solid ${K.line}`}}>
                <span style={{flex: 1}}>{r[0]}</span>
                <span style={{fontFamily: ANTON, fontSize: 58, color: K.yellow}}>{r[1]}</span>
              </div>
            </Row>
          ))}
        </div>
      </div>
    );
  }
  // list + app
  return (
    <div>
      {title}
      <div style={{padding: '0 44px'}}>
        {(d.rows as string[]).map((r, i) => (
          <Row key={i} f={f} at={at + 8 + i * 9}>
            <div style={{fontFamily: UI, fontWeight: 600, fontSize: 46, color: i === d.rows.length - 1 && ui.t === 'app' ? K.red : '#fff', height: 74, display: 'flex', alignItems: 'center'}}>
              <span style={{color: K.green, marginRight: 20, fontSize: 40}}>{ui.t === 'list' ? String(i + 1) : '\u25cf'}</span>
              {r}
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
};

// ---- scoreboard (three tiles) ------------------------------------------------------------------------------------
const Scoreboard: React.FC<{f: number; at: number; s: {a: number; b: number; c: string}}> = ({f, at, s}) => {
  const tile = (i: number, label: string, value: string, color: string) => {
    const k = snap(f, at + i * 4, 6);
    return (
      <div key={label} style={{width: 330, height: 250, background: K.card, border: `2px solid ${K.line}`, borderRadius: 26, boxShadow: '0 24px 60px rgba(0,0,0,0.55)', textAlign: 'center', opacity: Math.min(1, k * 2), transform: `translateY(${(1 - k) * 40}px) scale(${0.85 + 0.15 * k})`}}>
        <div style={{fontFamily: UI, fontWeight: 700, fontSize: 28, color: K.grey, letterSpacing: 3, marginTop: 30}}>{label}</div>
        <div style={{fontFamily: ANTON, fontSize: 110, color, marginTop: 14, lineHeight: 1.1}}>{value}</div>
      </div>
    );
  };
  return (
    <div style={{position: 'absolute', left: 90, top: 330, display: 'flex', gap: 34}}>
      {tile(0, 'PROMISES PASSED', `${s.a}/8`, K.green)}
      {tile(1, 'SENATE VOTES', `${s.b}/60`, K.yellow)}
      {tile(2, 'DOLLARS ON THE LINE', s.c, K.red)}
    </div>
  );
};

// ---- garage whiteboard -------------------------------------------------------------------------------------------
const PROMISES = ['Medicare for All', 'Tax on billionaires', 'Overturn Citizens United', 'Restructure ICE', 'Public oversight of AI', 'Cheaper housing', 'New Israel and Gaza policy', 'Court and filibuster'];
const Garage: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg,#34302b 0%,#26231f 62%,#1b1916 62%,#15130f 100%)'}}>
    <div style={{position: 'absolute', left: 150, top: 150, width: 1100, height: 680, background: '#f4f4f0', borderRadius: 14, border: '14px solid #8b8f98', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
      <div style={{fontFamily: 'Caveat', fontWeight: 700, fontSize: 84, color: '#c0392b', padding: '24px 50px 0', transform: 'rotate(-1.5deg)'}}>100 DAY SIMULATION</div>
      {PROMISES.map((p, i) => (
        <div key={p} style={{fontFamily: 'Caveat', fontWeight: 600, fontSize: 52, color: '#1d3557', padding: '0 70px', height: 58, transform: `rotate(${i % 2 ? 0.6 : -0.5}deg)`}}>
          {i + 1}. {p}
        </div>
      ))}
    </div>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 40% 20%, rgba(255,235,200,${0.06 + 0.02 * Math.sin(f / 20)}) 0%, transparent 60%)`}} />
  </AbsoluteFill>
);

const SkipCard: React.FC<{f: number; at: number; text: string}> = ({f, at, text}) => {
  const k = snap(f, at, 6);
  return (
    <AbsoluteFill style={{background: '#0b0b0c', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: ANTON, fontSize: 130, color: '#fff', transform: `scale(${0.9 + 0.1 * k})`, textAlign: 'center', letterSpacing: 2}}>{text}</div>
    </AbsoluteFill>
  );
};

const Slam: React.FC<{f: number; at: number; t: string}> = ({f, at, t}) => {
  if (f < at) return null;
  const k = snap(f, at, 4);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: ANTON, fontSize: 190, color: K.yellow, textAlign: 'center', transform: `scale(${1.6 - 0.6 * k}) rotate(-3deg)`, opacity: Math.min(1, k * 3), WebkitTextStroke: '10px #111', paintOrder: 'stroke', lineHeight: 1}}>{t}</div>
    </AbsoluteFill>
  );
};

const Plate: React.FC<{f: number; at: number; ep: string; id: string}> = ({f, at, ep, id}) => {
  if (f < at) return null;
  const k = snap(f, at, 6);
  const drift = 1 + lin(f, at, at + 200) * 0.06;
  return (
    <div style={{position: 'absolute', left: 150, top: 120, width: 1130, height: 720, transform: `translateY(${(1 - k) * 60}px) scale(${(0.85 + 0.15 * k) * drift})`, opacity: Math.min(1, k * 2), borderRadius: 22, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 30px 70px rgba(0,0,0,0.6)'}}>
      <Img src={staticFile(`photos/${ep}/${id}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  );
};

// ---- one beat ----------------------------------------------------------------------------------------------------
const SIT_OK = new Set(['panic', 'facepalm', 'shrug', 'think', 'point_l', 'point_r', 'celebrate', 'thumbs']);
const BeatScene: React.FC<{f: number; ep: string; b: SBeat; tb: TBeat; s0: number; prevSet?: string; score: {a: number; b: number; c: string}; plates: Record<string, boolean>}> = ({f, ep, b, tb, s0, prevSet, score, plates}) => {
  const set = b.set ?? 'home';
  const at = (w?: string) => wf(tb, w, s0 + 4);
  const sitting = set === 'bedroom';
  const base = POSE[b.pose3d ?? 'idle'] ?? 'idle';
  const mainPose = sitting ? (base === 'sit' || base === 'lie' ? base : SIT_OK.has(base) ? `${base}_sit` : 'sit') : base;
  const mainFace = FACE[b.face ?? 'neutral'] ?? 'neutral';
  const keys: PKey[] = [{at: s0, pose: mainPose, face: mainFace}];
  for (let i = 1; i < 12; i++) {
    const alt = sitting ? mainPose : ALT[(i + b.id.length) % ALT.length];
    keys.push({at: s0 + i * 66, pose: i % 2 ? alt : mainPose, face: i % 2 ? 'talk' : mainFace});
  }
  const dave = sitting ? null : (
    <Stage cam={[0, 1.9, 11]} look={[0, 1.6, 0]}>
      <DaveT f={f} position={set === 'finale' ? [2.6, -0.9, 0] : [3.05, -0.9, 0]} rotation={[0, -0.45, 0]} scale={b.aside ? 0.95 : 1.15} keys={keys} />
    </Stage>
  );
  let bg: React.ReactNode;
  if (set === 'garage') bg = <Garage f={f} />;
  else if (set === 'finale') bg = <AbsoluteFill style={{background: 'linear-gradient(160deg,#2b1f3d 0%,#17181B 70%)'}}><HomeBase f={f} /></AbsoluteFill>;
  else bg = <HomeBase f={f} />;
  if (b.report) {
    return (
      <AbsoluteFill>
        <ReportCard f={f} at={s0 + 4} title={b.report.title} rows={b.report.rows.map((r) => [r[0], r[1], '\u25cf'] as [string, string, string])} grade={b.report.grade} gradeColor={b.report.grade.startsWith('D') || b.report.grade.startsWith('F') ? K.red : '#FFB000'} />
      </AbsoluteFill>
    );
  }
  if (b.skip) return <SkipCard f={f} at={s0} text={b.skip} />;
  return (
    <AbsoluteFill>
      {sitting ? (
        <AbsoluteFill style={{background: '#000'}}>
          <Stage cam={[2.2, 2.3, 6.2]} look={[0.4, 1.5, -1.2]} fov={40} lights={f - s0 > 6 && b.face !== 'tired' ? 'warm' : 'night'}>
            <Bedroom tvOn />
            <Blob p={[0.8, 0.48, -0.9]} r={0.7} o={0.25} />
            <DaveT f={f} position={[0.8, -0.05, -0.75]} rotation={[0, 0.3, 0]} keys={keys} />
          </Stage>
        </AbsoluteFill>
      ) : (
        bg
      )}
      {set === 'tvroom' && !b.score ? <Scoreboard f={f} at={s0 + 4} s={score} /> : null}
      {b.score ? <Scoreboard f={f} at={at(b.score.at)} s={score} /> : null}
      {b.plate && plates[b.plate.id] ? <Plate f={f} at={at(b.plate.at)} ep={ep} id={b.plate.id} /> : null}
      {b.ui ? (
        <UICard f={f} at={s0 + 4} x={150} y={170} w={1050} h={640} push={b.ui.push ? at(b.ui.push) : undefined} px={0.3} py={0.5} zoom={1.12}>
          <UiBody f={f} at={s0 + 4} ui={b.ui} />
        </UICard>
      ) : null}
      {dave}
      {b.num ? <BigNum f={f} at={at(b.num.at)} n={b.num} /> : null}
      {b.comic ? <ComicBurst f={f} at={at(b.comic.at)} word={b.comic.t} x={620} y={540} /> : null}
      {b.slam ? <Slam f={f} at={at(b.slam.at)} t={b.slam.t} /> : null}
      {prevSet !== set ? <WhiteFlash f={f} at={s0} n={2} /> : null}
    </AbsoluteFill>
  );
};

export const V6Episode: React.FC<V6EpisodeProps> = ({ep, timings, script, plates}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const data = useMemo(() => {
    if (!timings || !script) return null;
    const sb = new Map(script.beats.map((b) => [b.id, b]));
    const beats = timings.beats.filter((t) => sb.has(t.id)).map((tb) => ({tb, b: sb.get(tb.id)!}));
    const starts = beats.map((x, i) => (i === 0 ? 0 : Math.max(0, fr(x.tb.start) - 3)));
    // running scoreboard state: last `score` seen at or before each beat
    let cur = {a: 0, b: 0, c: '$5.3T'};
    const scores = beats.map((x) => {
      if (x.b.score) cur = {a: x.b.score.a, b: x.b.score.b, c: x.b.score.c};
      return cur;
    });
    const cues: Cue[] = [];
    for (const x of beats) {
      for (const s of x.b.sfx ?? []) cues.push({at: wf(x.tb, s.at, fr(x.tb.start)), src: s.s, v: s.s === 'boom' || s.s === 'stamp' || s.s === 'thud' ? 0.55 : 0.32});
    }
    const chapters = (timings.chapters ?? []).map((c) => {
      const i = beats.findIndex((x) => x.tb.id === c.beat);
      const sb2 = beats[i]?.b;
      return {a: fr(c.start), b: starts[i], title: sb2?.chapter ?? String(c.title), sub: sb2?.chapter_sub};
    });
    for (const c of chapters) cues.push({at: c.a, src: 'whoosh', v: 0.5});
    return {beats, starts, scores, cues, chapters};
  }, [timings, script]);
  if (!data) return null;
  let i = 0;
  for (let k = 0; k < data.starts.length; k++) if (data.starts[k] <= f) i = k;
  const {tb, b} = data.beats[i];
  const ch = data.chapters.find((c) => f >= c.a && f < c.b);
  const music = (x: number) => interpolate(x, [0, 30, d - 45, d], [0, 0.075, 0.075, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fadeOut = interpolate(f, [d - 18, d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: K.bg, overflow: 'hidden'}}>
      <BeatScene f={f} ep={ep} b={b} tb={tb} s0={data.starts[i]} prevSet={i > 0 ? data.beats[i - 1].b.set : undefined} score={data.scores[i]} plates={plates} />
      {ch ? <ChapterCard f={f} at={ch.a} title={ch.title} sub={ch.sub} /> : null}
      <AbsoluteFill style={{background: K.bg, opacity: fadeOut}} />
      <Audio src={staticFile(`${ep}/voice.wav`)} />
      <Audio src={staticFile('music/bgm.mp3')} volume={music} loop />
      <Sfx cues={data.cues} />
    </AbsoluteFill>
  );
};
