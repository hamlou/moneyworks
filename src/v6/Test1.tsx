import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import V from '../../pipeline/voice/test1.json';
import {ANTON, ComicBurst, Counter, HomeBase, K, NumCard, ReportCard, Smear, Threshold, UI, UICard, snap} from './kit';

// test1: the 1-minute v6 test (pipeline/episodes/test1.json). 3D shots = Blender pose-state stills (blender/test1.py,
// real CC0 classroom) held and cut on the voice the reference's way (STYLE_3D.md §12.3): burst → hold, 1-frame white
// silhouette on swaps, 2-frame smear on whips, light-leak time skip, 1-frame B&W threshold before a reveal.
// Home base = charcoal icon pattern + wobbling rounded cards + Dave cut-out lower right. Every card comes from its line.
export const FPS = 30;
type W = {text: string; start: number; end: number};
type Beat = {id: string; start: number; end: number; words: W[]};
const beats = (V as {beats: Beat[]}).beats;
const B: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));
// the voice file in public/test1 is slowed to 0.87× with pitch kept (Chatterbox reads ~210 wpm; the reference ~190)
const STRETCH = 1 / 0.87;
const fr = (t: number) => Math.round(t * STRETCH * FPS);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');
// frame where `word` (n-th time) is spoken in beat `id`; no word → beat start
const at = (id: string, word?: string, n = 0) => {
  const b = B[id];
  if (!word) return fr(b.start);
  const hit = b.words.filter((w) => norm(w.text) === word)[n];
  return fr(hit ? hit.start : b.start);
};
export const TEST1_FRAMES = fr((V as {total: number}).total) + FPS;

// ---- 3D stills ---------------------------------------------------------------------------------------------
const Still: React.FC<{name: string}> = ({name}) => <Img src={staticFile(`test1/${name}.jpg`)} style={{position: 'absolute', inset: 0, width: 1920, height: 1080}} />;
const pick = (f: number, keys: [number, string][]) => {
  let cur = keys[0][1];
  for (const [a, n] of keys) if (f >= a) cur = n;
  return cur;
};

// ---- home base ---------------------------------------------------------------------------------------------
// Dave cut-out lower right; instant pose swaps with a 1-frame white silhouette (outline kept), gentle bobble
const OUTLINE = ['5px 0', '-5px 0', '0 5px', '0 -5px'].map((o) => `drop-shadow(${o} 0 #111)`).join(' ');
const Cut: React.FC<{f: number; keys: [number, string][]}> = ({f, keys}) => {
  const name = pick(f, keys);
  const swap = keys.some(([a], i) => i > 0 && f === a);
  const bob = Math.sin(f / 17) * 0.8;
  return (
    <Img
      src={staticFile(`test1/cut_${name}.png`)}
      style={{position: 'absolute', right: -40, bottom: 0, height: 1080, transformOrigin: '50% 100%', transform: `rotate(${bob}deg)`, filter: swap ? `brightness(0) invert(1) ${OUTLINE}` : `${OUTLINE} drop-shadow(0 20px 30px rgba(0,0,0,0.45))`}}
    />
  );
};
const Wob: React.FC<{f: number; i?: number; children: React.ReactNode}> = ({f, i = 0, children}) => (
  <div style={{position: 'absolute', inset: 0, transformOrigin: '6% 50%', transform: `scale(1.22) rotate(${Math.sin(f / 23 + i) * 0.6}deg) translateY(${Math.sin(f / 19 + i * 2) * 4}px)`}}>{children}</div>
);
const Big: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = K.white, size = 120, style}) => (
  <div style={{fontFamily: ANTON, fontSize: size, color, lineHeight: 1.05, ...style}}>{children}</div>
);
const Small: React.FC<{children: React.ReactNode; color?: string; size?: number}> = ({children, color = K.grey, size = 40}) => (
  <div style={{fontFamily: UI, fontWeight: 600, fontSize: size, color}}>{children}</div>
);

// time skip: 2 frames pink-red leak wiping from the left → 3 near-white → 1 dark wipe out (§12.3, 0:08.5)
const LightLeak: React.FC<{f: number; at: number}> = ({f, at: a}) => {
  const k = f - a;
  if (k < 0 || k > 5) return null;
  const bg =
    k < 2
      ? `linear-gradient(90deg, rgba(255,80,110,${0.55 + k * 0.25}) 0%, rgba(255,170,150,${0.3 + k * 0.3}) ${40 + k * 30}%, transparent ${70 + k * 30}%)`
      : k < 5
        ? 'rgba(255,248,240,0.93)'
        : 'linear-gradient(90deg, rgba(255,248,240,0.9) 0%, rgba(40,30,30,0.5) 60%, transparent 100%)';
  return <AbsoluteFill style={{background: bg}} />;
};

const Zs: React.FC<{f: number; a: number; x: number; y: number}> = ({f, a, x, y}) => (
  <>
    {[0, 1, 2].map((i) => {
      const t = f - a - i * 10;
      if (t < 0) return null;
      const s = Math.floor(t / 3) % 2;
      return (
        <div key={i} style={{position: 'absolute', left: x + i * 46 + s * 3, top: y - i * 60 - (t % 30) * 0.5, fontFamily: ANTON, fontSize: 60 + i * 18, color: '#fff', WebkitTextStroke: '4px #111'}}>
          Z
        </div>
      );
    })}
  </>
);

const CLASSES = ['MATH', 'HISTORY', 'BIOLOGY', 'ENGLISH', 'CHEMISTRY', 'GYM'];

export const Test1: React.FC = () => {
  const f = useCurrentFrame();
  // ---- segment boundaries (all from the voice words) ----
  const t1 = at('t1');
  const tri = at('t1', 'triangle');
  const zero = at('t1', 'zero');
  const taxes = at('t1', 'taxes');
  const t2 = at('t2');
  const dog = at('t2', 'dog');
  const t3 = at('t3');
  const back = at('t3', 'went');
  const t4 = at('t4');
  const sitting = at('t4', 'sitting');
  const money4 = at('t4', 'money');
  const t5 = at('t5');
  const dont = at('t5', "don't");
  const you5 = at('t5', 'you');
  const t6 = at('t6');
  const t7 = at('t7');
  const t8 = at('t8');
  const rent = at('t8', 'rent');
  const t9 = at('t9');
  const four = at('t9', 'four');
  const zero9 = at('t9', 'zero');
  const which = at('t9', 'which');
  const t10 = at('t10');
  const already = at('t10', 'honestly');

  let scene: React.ReactNode = null;
  if (f < t2) {
    // t1: wide hold → shock snap → [triangle] white silhouette close-up → spiral → [taxes] whip smear → panic shake
    const st =
      f < t1 + 12 ? 't1_hold' : f < tri ? 't1_shock' : f === tri ? 't1_flash' : f < taxes ? 't1_look' : (Math.floor((f - taxes) / 2) % 2 ? 't1_panic_b' : 't1_panic');
    scene = (
      <>
        <Smear f={f} at={taxes} n={2}>
          <Still name={st} />
        </Smear>
        {f >= zero && f < taxes ? <Big size={90} style={{position: 'absolute', left: 120, top: 110, WebkitTextStroke: '4px #111', opacity: snap(f, zero, 4)}}>0 MINUTES</Big> : null}
        <ComicBurst f={f} at={taxes + 3} word="TAXES?!" x={430} y={300} />
      </>
    );
  } else if (f < back) {
    // t2 + first half of t3: home base, counters
    const keys: [number, string][] = [[t2, 'count_think'], [dog, 'shrug_neutral'], [t3, 'shrug_neutral']];
    scene = (
      <>
        <HomeBase f={f} />
        {f < dog ? (
          <Wob f={f}>
            <NumCard f={f} at={t2 + 2} label="YEARS IN SCHOOL" to={12} color={K.yellow} x={700} y={480} />
          </Wob>
        ) : f < t3 ? (
          <Wob f={f} i={1}>
            <NumCard f={f} at={dog} label="AVERAGE DOG LIFE" to={12.5} dec={1} suffix=" YRS" color={K.blue} sub="(yes I checked)" x={700} y={480} />
          </Wob>
        ) : (
          <Wob f={f} i={2}>
            <UICard f={f} at={t3 + 2} x={260} y={330} w={820} h={360}>
              <div style={{padding: 50}}>
                <Small>the only reasonable thing</Small>
                <Big size={130} color={K.green}>GO BACK</Big>
              </div>
            </UICard>
          </Wob>
        )}
        <Cut f={f} keys={keys} />
      </>
    );
  } else if (f < sitting) {
    // "I went back." hero low angle: stand → white silhouette → fists; then "For thirty days" → B&W frame → 30 DAYS pops
    const days0 = at('t4', 'thirty');
    const st = f < back + 6 ? 't3_stand' : f === back + 6 ? 't3_flash' : f < days0 ? 't3_fists' : f < days0 + 2 ? 't4_days_small' : f < days0 + 4 ? 't4_days_big' : 't4_days';
    scene = (
      <Threshold f={f} at={days0 - 1} n={1}>
        <Still name={st} />
      </Threshold>
    );
  } else if (f < t5) {
    // rest of t4: every class listed one by one, MONEY ? lands on "money"
    const step = Math.max(6, Math.floor((money4 - sitting) / (CLASSES.length + 1)));
    scene = (
      <>
        <HomeBase f={f} />
        <Wob f={f}>
          <UICard f={f} at={sitting} x={180} y={150} w={900} h={780} push={money4} py={0.9} zoom={1.25}>
            <div style={{padding: '40px 60px'}}>
              <Small color={K.white} size={44}>every class a normal school has</Small>
              {CLASSES.map((c, i) => (
                <div key={c} style={{fontFamily: UI, fontWeight: 700, fontSize: 56, color: '#fff', opacity: f >= sitting + step * (i + 1) ? 1 : 0, marginTop: 8}}>
                  □ {c}
                </div>
              ))}
              <div style={{fontFamily: ANTON, fontSize: 90, color: K.yellow, marginTop: 14, opacity: f >= money4 ? 1 : 0, transform: `scale(${f >= money4 ? 1.6 - 0.6 * snap(f, money4, 5) : 1})`, transformOrigin: 'left'}}>MONEY ?</div>
            </div>
          </UICard>
        </Wob>
        <Cut f={f} keys={[[sitting, 'point_l_determined']]} />
      </>
    );
  } else if (f < t6) {
    // t5: win card → punch to "MONEY 101 taught by Dave" with the viewer as the student
    const keys: [number, string][] = [[t5, 'cheer_grin'], [dont, 'point_you_smug']];
    scene = (
      <>
        <HomeBase f={f} />
        {f < dont ? (
          <Wob f={f}>
            <UICard f={f} at={t5 + 2} x={240} y={300} w={820} h={420}>
              <div style={{padding: 50, textAlign: 'center'}}>
                <Small>find the money lesson</Small>
                <Big size={190} color={K.yellow}>I WIN</Big>
              </div>
            </UICard>
          </Wob>
        ) : (
          <Wob f={f} i={1}>
            <UICard f={f} at={dont + 1} x={200} y={200} w={900} h={640} push={you5} px={0.5} py={0.85} zoom={1.35}>
              <div style={{padding: 50}}>
                <Big size={110} color={K.green}>MONEY 101</Big>
                <Small color={K.white} size={46}>teacher: Dave</Small>
                <div style={{height: 3, background: K.line, margin: '24px 0'}} />
                <Small size={44}>students:</Small>
                <Big size={140} color={K.red} style={{opacity: f >= you5 ? 1 : 0}}>YOU</Big>
              </div>
            </UICard>
          </Wob>
        )}
        <Cut f={f} keys={keys} />
      </>
    );
  } else if (f < t8) {
    // t6 "Day one." chalk board (3D) after a light-leak time skip → t7 maths class cheer (3D)
    scene = <Still name={f < t7 ? 't6_board' : 't7_math'} />;
  } else if (f < t9) {
    // t8: the train problem chalked on the board → [fifty] Dave stares at it → [rent] whip to the RENT bill panic
    const fifty = at('t8', 'fifty');
    const st = f < fifty ? 't8_board' : f < rent ? 't8_stare' : Math.floor((f - rent) / 2) % 2 ? 't8_rent_b' : 't8_rent';
    scene = (
      <>
        <Smear f={f} at={rent} n={2}>
          <Still name={st} />
        </Smear>
        {f >= fifty && f < rent ? <Big size={110} style={{position: 'absolute', left: 120, top: 100, WebkitTextStroke: '5px #111', transform: `scale(${1.4 - 0.4 * snap(f, fifty, 4)})`}}>50 MINUTES</Big> : null}
        {f >= rent ? <ComicBurst f={f} at={rent + 2} word="EVERY MONTH" x={470} y={250} rot={-6} /> : null}
      </>
    );
  } else if (f < four) {
    // t9 "I searched the whole textbook for the word interest" — hunched over the book (3D), search bar types on top
    scene = (
      <>
        <Still name="t9_search" />
        <div style={{position: 'absolute', left: 140, top: 90, background: '#23252bee', borderRadius: 50, padding: '22px 44px', fontFamily: UI, fontSize: 64, color: '#fff', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', transform: `scale(${0.6 + 0.4 * snap(f, t9 + 4, 6)})`, transformOrigin: 'left'}}>
          search: {'interest'.slice(0, Math.max(0, Math.floor((f - t9 - 10) / 3)))}
          <span style={{opacity: Math.floor(f / 8) % 2}}>|</span>
        </div>
      </>
    );
  } else if (f < which) {
    const keys: [number, string][] = [[four, 'count_think'], [zero9, 'idle_dead']];
    scene = (
      <>
        <HomeBase f={f} />
        <Wob f={f} i={2}>
          <UICard f={f} at={four} x={170} y={260} w={860} h={520} push={zero9} zoom={1.15}>
            <div style={{padding: 60}}>
              <Counter f={f} at={four} to={400} suffix=" PAGES" size={150} />
              {f >= zero9 ? <Big size={150} color={K.red} style={{marginTop: 10, transform: `scale(${1.5 - 0.5 * snap(f, zero9, 4)})`, transformOrigin: 'left'}}>0 INTEREST</Big> : null}
            </div>
          </UICard>
        </Wob>
        <Cut f={f} keys={keys} />
      </>
    );
  } else if (f < t10) {
    // "how much I had by page ten" → asleep on the textbook (3D) + boiling Zs
    scene = (
      <>
        <Still name="t9_sleep" />
        <Zs f={f} a={which + 10} x={1080} y={360} />
      </>
    );
  } else if (f < already) {
    scene = <ReportCard f={f} at={t10} title="DAY 1" rows={[['Classes sat in', '1', '•'], ['Money lessons', '0', '•']]} grade="F" gradeColor={K.red} />;
  } else {
    scene = <Still name="t10_slump" />;
  }

  const cues: Cue[] = [
    {at: t1 + 12, src: 'pop', v: 0.35},
    {at: tri, src: 'whoosh_s', v: 0.4},
    {at: taxes, src: 'whoosh', v: 0.5},
    {at: taxes + 3, src: 'boom', v: 0.55},
    {at: t2 + 2, src: 'tick', v: 0.4},
    {at: dog, src: 'pop2', v: 0.4},
    {at: back + 6, src: 'thud', v: 0.6},
    {at: at('t4', 'thirty') - 1, src: 'stamp', v: 0.6},
    {at: money4, src: 'cash', v: 0.5},
    {at: t5 + 2, src: 'ding', v: 0.4},
    {at: you5, src: 'stamp', v: 0.5},
    {at: t6 - 2, src: 'whoosh', v: 0.45},
    {at: t6 + 2, src: 'scribble', v: 0.5},
    {at: t7, src: 'pop', v: 0.4},
    {at: rent, src: 'whoosh', v: 0.5},
    {at: rent + 2, src: 'buzz', v: 0.45},
    {at: at('t8', 'fifty'), src: 'pop', v: 0.4},
    {at: t9 + 10, src: 'key', v: 0.35},
    {at: four, src: 'tick', v: 0.4},
    {at: zero9, src: 'trombone', v: 0.35},
    {at: which + 10, src: 'dream', v: 0.3},
    {at: t10, src: 'stamp', v: 0.5},
    {at: already, src: 'thud', v: 0.5},
  ];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {scene}
      <LightLeak f={f} at={t6 - 3} />
      <Audio src={staticFile('test1/voice.flac')} />
      <Audio src={staticFile('music/bgm.mp3')} volume={0.07} loop />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
