import React from 'react';
import {AbsoluteFill, Audio, Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import V from './ea1_timing.json'; // voice json with chapter breaths (tools/voice_gaps.py)
import LENS from '../../blender/ea1_lens.json';
import {ANTON, ComicBurst, Counter, HomeBase, K, UI, UICard, snap} from './kit';
import {Music, Shake} from './kit2';
import {BodyScene, bodyStart, bodyMusic, bodyCues} from './Ea1Body';

// ea1: "What if Abdul El-Sayed became president?" — 1-minute hook test (pipeline/episodes/ea1.json, brief ea1_brief.md).
// SENSITIVE: every fact card shows its source line; quotes are verbatim (S5, S6), opponents' claims are labelled as claims
// and paired with the fact check (S7); real people are only shown as the public-domain photo or as quoted text.
export const FPS = 30;
type W = {text: string; start: number; end: number};
type Beat = {id: string; start: number; end: number; words: W[]};
const beats = (V as {beats: Beat[]}).beats;
const B: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));
const STRETCH = 1 / 0.9; // public/ea1/voice.flac is the cached voice slowed to 0.9× (Chatterbox ≈ 211 wpm → ≈ 190)
export const fr = (t: number) => Math.round(t * STRETCH * FPS);
export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');
export const at = (id: string, word?: string, n = 0) => {
  const b = B[id];
  if (!word) return fr(b.start);
  const hit = b.words.filter((w) => norm(w.text).startsWith(word))[n];
  return fr(hit ? hit.start : b.start);
};
export const CUT1 = fr(B.k3.end) + 4; // Ea1Cold inserts the 3 rally clips right after the title question (owner 31 Oct)
export const EA1_FRAMES = fr((V as {total: number}).total) + FPS;
export const S24 = (f24: number) => Math.round((f24 / 24) * FPS); // Blender shot frames (24 fps) → composition frames

// a Blender shot that holds its last frame if the segment is longer than the render
export const ShotInner: React.FC<{name: string; len24: number}> = ({name, len24}) => {
  const f = useCurrentFrame(); // relative to the segment start (inside the Sequence)
  const last = S24(len24) - 1;
  const v = <OffthreadVideo src={staticFile(`ea1/shot_${name}.mp4`)} muted style={{width: 1920, height: 1080}} />;
  return f < last ? v : <Freeze frame={last}>{v}</Freeze>;
};
export const Shot: React.FC<{name: string; len24: number; from: number; seg: number}> = ({name, len24, from, seg}) => (
  <Sequence from={from} durationInFrames={Math.max(1, seg)} layout="none">
    <AbsoluteFill>
      <ShotInner name={name} len24={len24} />
    </AbsoluteFill>
  </Sequence>
);


const OUTLINE = ['2px 0', '-2px 0', '0 2px', '0 -2px'].map((o) => `drop-shadow(${o} 0 #111)`).join(' ');
export const Cut: React.FC<{f: number; keys: [number, string][]}> = ({f, keys}) => {
  let name = keys[0][1];
  for (const [a, n] of keys) if (f >= a) name = n;
  const swap = keys.some(([a], i) => i > 0 && f === a);
  return (
    <Img
      src={staticFile(`ea1/cut_${name}.png`)}
      style={{position: 'absolute', right: -40, bottom: 0, height: 1080, transformOrigin: '50% 100%', transform: `rotate(${Math.sin(f / 17) * 0.8}deg)`, filter: swap ? `brightness(0) invert(1) ${OUTLINE}` : `${OUTLINE} drop-shadow(0 20px 30px rgba(0,0,0,0.45))`}}
    />
  );
};
export const Wob: React.FC<{f: number; i?: number; children: React.ReactNode}> = ({f, i = 0, children}) => (
  <div style={{position: 'absolute', inset: 0, transformOrigin: '6% 50%', transform: `scale(1.18) rotate(${Math.sin(f / 23 + i) * 0.6}deg) translateY(${Math.sin(f / 19 + i * 2) * 4}px)`}}>{children}</div>
);
export const Big: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = K.white, size = 110, style}) => (
  <div style={{fontFamily: ANTON, fontSize: size, color, lineHeight: 1.05, ...style}}>{children}</div>
);
export const Small: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = K.grey, size = 38, style}) => (
  <div style={{fontFamily: UI, fontWeight: 600, fontSize: size, color, ...style}}>{children}</div>
);
// the source line every fact card carries (sensitive topic: the viewer always sees where a claim comes from)
export const Src: React.FC<{f: number; at: number; children: React.ReactNode}> = ({f, at: a, children}) =>
  f < a ? null : (
    <div style={{position: 'absolute', left: 40, bottom: 34, fontFamily: UI, fontWeight: 600, fontSize: 26, color: '#fff', background: 'rgba(0,0,0,0.62)', padding: '8px 16px', borderRadius: 10, opacity: snap(f, a, 6)}}>
      Source: {children}
    </div>
  );
export const Kinetic: React.FC<{f: number; at: number; until?: number; x: number; y: number; children: React.ReactNode; color?: string; size?: number}> = ({f, at: a, until, x, y, children, color = '#fff', size = 96}) => {
  if (f < a || (until !== undefined && f >= until)) return null;
  const k = snap(f, a, 5);
  return (
    <div style={{position: 'absolute', left: x, top: y, fontFamily: ANTON, fontSize: size, color, WebkitTextStroke: '5px #111', transform: `scale(${1.5 - 0.5 * k}) rotate(-3deg)`, transformOrigin: 'left center', opacity: Math.min(1, k * 2)}}>
      {children}
    </div>
  );
};
// 2-frame white (or black-outline) flash between hook worlds (§12.3 time-skip flash, §15.2 rule 7)
export const Flash: React.FC<{f: number; at: number; white?: boolean}> = ({f, at: a, white = true}) =>
  f >= a && f < a + 2 ? <AbsoluteFill style={{background: white ? '#fff' : '#000', opacity: f === a ? 1 : 0.5}} /> : null;
export const Bar: React.FC<{f: number; at: number; label: string; pct: number; color: string; y: number; speed?: number}> = ({f, at: a, label, pct, color, y, speed = 24}) => {
  const k = Math.min(1, Math.max(0, (f - a) / speed));
  return (
    <div style={{position: 'absolute', left: 140, top: y, width: 1100}}>
      <Small color="#fff" size={44}>{label}</Small>
      <div style={{height: 70, background: '#2a2c33', borderRadius: 12, marginTop: 8, overflow: 'hidden'}}>
        <div style={{width: `${(pct / 60) * 100 * k}%`, height: '100%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20, fontFamily: ANTON, fontSize: 52, color: '#fff'}}>{(pct * k).toFixed(1)}%</div>
      </div>
    </div>
  );
};

export const Ea1: React.FC = () => {
  const f = useCurrentFrame();
  const h = (id: string) => at(id);
  const k2 = h('k2'), k3 = h('k3'), k4 = h('k4');
  const h2 = h('h2'), h3 = h('h3'), h6 = h('h6'), p6 = h('p6'), j1 = h('j1'), j2 = h('j2');
  const stop = at('k1', 'stop'), election = at('k1', 'election'), still = at('k2', 'still'), less = at('k2', 'less');
  const pres = at('k3', 'president'), fight = at('k4', 'fight');
  const constitution = at('h3', 'constitution'), born = at('h3', 'born'), thirty5 = at('h3', 'thirty');
  const thirty3 = at('h6', 'thirty');
  const cStart = thirty3, cEnd = p6;

  let scene: React.ReactNode;
  if (f < k2) {
    // HOOK 1 — the prize first (STYLE_3D §15.3): cash raining into the lens + the number rolling from frame 2
    scene = (
      <>
        <Shake f={f} at={stop} amp={12} len={10}>
          <Shot name="H" len24={LENS.H} from={0} seg={k2} />
        </Shake>
        <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center'}}>
          <Counter f={f} at={2} dur={Math.max(20, stop - 6)} to={33000000} prefix="$" size={190} color={K.green} />
        </div>
        <Kinetic f={f} at={stop} x={300} y={420} color={K.red} size={120}>TO STOP 1 MAN</Kinetic>
        <Kinetic f={f} at={election} x={420} y={570} color={K.yellow} size={100}>IN 1 ELECTION</Kinetic>
        <Src f={f} at={2}>NBC News, Oct 9 2026</Src>
      </>
    );
  } else if (f < k3) {
    // HOOK 2 — the twist: he still won (bars slam, Dave huge, the 0.8 lands)
    scene = (
      <>
        <HomeBase f={f} />
        <Bar f={f} at={k2} label="Abdul El-Sayed" pct={48.4} color="#2f6fd6" y={250} speed={8} />
        <Bar f={f} at={k2 + 3} label="the candidate that money backed" pct={47.6} color="#8a8f99" y={470} speed={8} />
        {f >= less ? (
          <div style={{position: 'absolute', left: 160, top: 700, transform: `scale(${1.5 - 0.5 * snap(f, less, 5)}) rotate(-4deg)`, transformOrigin: 'left center'}}>
            <Big size={150} color={K.yellow} style={{WebkitTextStroke: '6px #111'}}>0.8 POINTS</Big>
          </div>
        ) : null}
        <div style={{position: 'absolute', inset: 0, transformOrigin: '80% 100%', transform: `scale(${f >= still ? 1.25 : 1})`}}>
          <Cut f={f} keys={[[k2, 'neutral_shrug'], [still, 'shock_panic']]} />
        </div>
        <Flash f={f} at={k2} />
        <Src f={f} at={k2}>AP via ClickOnDetroit, Aug 5 2026</Src>
      </>
    );
  } else if (f < CUT1) {
    // HOOK 3 — the question while a new world slams in: Dave spins round in the big chair
    scene = (
      <>
        <Shot name="S" len24={LENS.S} from={k3} seg={k4 - k3} />
        <Kinetic f={f} at={pres} x={120} y={110} color={K.red} size={130}>PRESIDENT?</Kinetic>
        {/* owner 31 Oct: his photo appears exactly where Dave's hand points */}
        <div style={{position: 'absolute', left: 1360, top: 250, width: 470, transformOrigin: '0% 60%', transform: `rotate(3deg) scale(${snap(f, at('k3', 'abdul'), 6)})`, background: '#fff', padding: 12, boxShadow: '0 20px 50px rgba(0,0,0,.5)'}}>
          <Img src={staticFile('ea1/elsayed_senate.jpg')} style={{width: '100%', height: 500, objectFit: 'cover', display: 'block'}} />
          <div style={{fontFamily: ANTON, fontSize: 46, color: '#111', textAlign: 'center', paddingTop: 8}}>ABDUL EL-SAYED</div>
        </div>
        <Flash f={f} at={k3} />
      </>
    );
  } else if (f < k4) {
    // j1/j2 (owner 31 Oct): jokes about how people love him — the crowd keeps going, then Dave alone, then the suit gag
    const dog = at('j1', 'dog'), suit = at('j2', 'suit'), refund = at('j2', 'refund');
    scene =
      f < at('j1', 'when', 1) ? (
        <Sequence from={CUT1} layout="none">
          <AbsoluteFill style={{transform: `scale(${1.05 + 0.0015 * (f - CUT1)})`}}>
            <OffthreadVideo src={staticFile('ea1/names/j_crowd.mp4')} muted style={{width: 1920, height: 1080}} />
          </AbsoluteFill>
        </Sequence>
      ) : f < j2 ? (
        <>
          <AbsoluteFill style={{filter: 'blur(6px) brightness(0.55)'}}><Freeze frame={20}><OffthreadVideo src={staticFile('ea1/shot_E.mp4')} muted style={{width: 1920, height: 1080}} /></Freeze></AbsoluteFill>
          <div style={{position: 'absolute', inset: 0, transformOrigin: '80% 100%', transform: `scale(${f >= dog ? 1.25 : 1})`}}>
            <Cut f={f} keys={[[0, 'grin_cheer'], [dog, 'neutral_shrug']]} />
          </div>
        </>
      ) : (
        <>
          <AbsoluteFill style={{filter: 'blur(6px) brightness(0.6)', transform: `scale(${1.1 + 0.002 * (f - j2)})`}}><Freeze frame={150}><OffthreadVideo src={staticFile('ea1/shot_Y.mp4')} muted style={{width: 1920, height: 1080}} /></Freeze></AbsoluteFill>
          <Cut f={f} keys={[[j2, 'determined_present'], [refund, 'shock_panic']]} />
          <ComicBurst f={f} at={refund} word="REFUND?" x={520} y={560} />
          <Flash f={f} at={suit} />
        </>
      );
  } else if (f < h2) {
    // HOOK 4 — the promise: Dave points at YOU, punch-in
    const punch = f < fight ? 1 : 1.3 - 0.1 * snap(f, fight, 6);
    scene = (
      <>
        <HomeBase f={f} />
        <div style={{position: 'absolute', inset: 0, transformOrigin: '75% 60%', transform: `scale(${punch})`}}>
          <Cut f={f} keys={[[k4, 'smug_point_you'], [fight, 'determined_point_l']]} />
        </div>
        <Kinetic f={f} at={fight} x={110} y={300} color={K.yellow} size={110}>WHO WOULD FIGHT</Kinetic>
        <Kinetic f={f} at={fight + 8} x={110} y={440} color={K.red} size={110}>THE HARDEST?</Kinetic>
        <Flash f={f} at={fight} white={false} />
      </>
    );
  } else if (f < h6) {
    const keys: [number, string][] = [[h2, 'neutral_shrug'], [h3, 'determined_present']];
    scene = (
      <>
        <HomeBase f={f} />
        {f < h3 ? (
          <Wob f={f}>
            <UICard f={f} at={h2 + 2} x={140} y={160} w={900} h={700}>
              <Img src={staticFile('ea1/elsayed_senate.jpg')} style={{width: '100%', height: 560, objectFit: 'cover'}} />
              <div style={{padding: '18px 30px'}}>
                <Big size={60}>ABDUL EL-SAYED</Big>
                <Small color={K.yellow} size={34}>2026 U.S. SENATE CANDIDATE · MICHIGAN</Small>
              </div>
            </UICard>
          </Wob>
        ) : (
          <Wob f={f} i={1}>
            <UICard f={f} at={h3 + 2} x={140} y={200} w={980} h={620}>
              <div style={{padding: 50, background: '#f3efe4', height: '100%'}}>
                <div style={{fontFamily: ANTON, fontSize: 64, color: '#1d2b4f'}}>U.S. CONSTITUTION · ARTICLE II</div>
                <div style={{height: 4, background: '#1d2b4f', margin: '18px 0 30px'}} />
                {[
                  [born, 'Born a U.S. citizen', 'born in Michigan, 1984'],
                  [thirty5, 'At least 35 years old', 'he is 41'],
                ].map(([a, t, sub], i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', marginBottom: 34, opacity: f >= (a as number) ? 1 : 0.25}}>
                    <div style={{width: 80, height: 80, borderRadius: 12, border: '6px solid #1d2b4f', marginRight: 30, fontFamily: ANTON, fontSize: 70, color: '#2e9d43', textAlign: 'center', lineHeight: '78px'}}>{f >= (a as number) ? '✓' : ''}</div>
                    <div>
                      <div style={{fontFamily: UI, fontWeight: 700, fontSize: 54, color: '#222'}}>{t}</div>
                      <div style={{fontFamily: UI, fontSize: 36, color: '#666'}}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </UICard>
          </Wob>
        )}
        <Cut f={f} keys={keys} />
        <Src f={f} at={h2}>{f < h3 ? 'Wikipedia; photo: U.S. Senate HELP Committee 2024 (public domain)' : 'U.S. Constitution Art. II §1; birth date: Wikipedia'}</Src>
      </>
    );
  } else if (f < cStart) {
    scene = <Shot name="C" len24={LENS.C} from={h6} seg={cEnd - h6} />;
  } else if (f < cEnd) {
    scene = (
      <>
        <Shake f={f} at={cStart} amp={14} len={12}>
          <Shot name="C" len24={LENS.C} from={h6} seg={cEnd - h6} />
        </Shake>
        <div style={{position: 'absolute', left: 90, top: 70}}>
          <Counter f={f} at={cStart} dur={40} to={33000000} prefix="$" size={150} color={K.green} />
          <Small color="#fff" size={36} style={{background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: 10, display: 'inline-block'}}>spent by United Democracy Project (AIPAC's super PAC) against him</Small>
        </div>
        <Src f={f} at={cStart}>NBC News, Oct 9 2026</Src>
      </>
    );
  } else if (f < bodyStart()) {
    scene = (
      <>
        <HomeBase f={f} />
        <Bar f={f} at={cEnd} label="Abdul El-Sayed" pct={48.4} color="#2f6fd6" y={300} />
        <Bar f={f} at={cEnd + 2} label="Haley Stevens (backed by that money)" pct={47.6} color="#8a8f99" y={520} />
        {f >= cEnd + 4 ? (
          <div style={{position: 'absolute', left: 160, top: 720, display: 'inline-block', fontFamily: ANTON, fontSize: 110, color: K.red, border: `10px solid ${K.red}`, padding: '0 30px', transform: `rotate(-6deg) scale(${1.6 - 0.6 * snap(f, cEnd + 4, 4)})`}}>IT DID NOT WORK</div>
        ) : null}
        <Cut f={f} keys={[[0, 'grin_cheer']]} />
        <Src f={f} at={cEnd}>AP via ClickOnDetroit, Aug 5 2026; Wikipedia</Src>
      </>
    );
  } else {
    scene = <BodyScene f={f} end={EA1_FRAMES} />;
  }

  const cues: Cue[] = [
    // HOOK — densest sound of the video (§15.2 rule 5)
    {at: 0, src: 'ea1/cash_rain', v: 0.7},
    {at: 2, src: 'ea1/roll33', v: 0.6},
    {at: stop, src: 'ea1/k_stop', v: 0.7},
    {at: election, src: 'ea1/k_slam', v: 0.6},
    {at: k2 - 2, src: 'ea1/k_flash', v: 0.6},
    {at: k2, src: 'ea1/vote_tick', v: 0.5},
    {at: k2 + 3, src: 'ea1/k_slam', v: 0.5},
    {at: still, src: 'ea1/k_boom', v: 0.7},
    {at: less, src: 'ea1/stamp_un', v: 0.55},
    {at: k3 - 2, src: 'ea1/k_flash', v: 0.6},
    {at: k3 + S24(5), src: 'ea1/k_spin', v: 0.7},
    {at: pres, src: 'ea1/k_stop', v: 0.5},
    {at: k4 - 2, src: 'ea1/k_point', v: 0.5},
    {at: k4 + 4, src: 'ea1/k_riser', v: 0.4},
    {at: fight, src: 'ea1/k_boom', v: 0.6},
    // body
    {at: h2 + 2, src: 'ea1/photo_slide', v: 0.5},
    {at: h3 + 2, src: 'slide', v: 0.45},
    {at: constitution, src: 'ea1/gavel', v: 0.6},
    {at: born, src: 'ea1/check1', v: 0.45},
    {at: thirty5, src: 'ea1/check2', v: 0.45},
    {at: h6, src: 'swish_fast', v: 0.5},
    {at: h6 + 2, src: 'ea1/cash_rain', v: 0.6},
    {at: cStart, src: 'ea1/roll33', v: 0.55},
    {at: cEnd, src: 'ea1/vote_tick', v: 0.5},
    {at: cEnd + 4, src: 'ea1/fail', v: 0.55},
    {at: cEnd + 5, src: 'ea1/k_stop', v: 0.5},
    ...[h2, h3].map((a) => ({at: a, src: 'snap_white', v: 0.3})),
    {at: CUT1, src: 'ea1/k_flash', v: 0.5},
    {at: at('j1', 'dog'), src: 'ea1/crickets', v: 0.55},
    {at: at('j2', 'refund'), src: 'ea1/k_boom', v: 0.55},
  ];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {scene}
      <Audio src={staticFile('ea1/voice.flac')} />
      <Music
        segs={[
          {src: 'hitman', from: 0, to: k3 - 3, v: 0.08},
          {src: 'investigations', from: k3, to: j2 - 4},
          {src: 'sneaky_snitch', from: h2, to: h6 - 6},
          {src: 'hitman', from: h6, to: cEnd - 3, v: 0.08, off: 30 * 20},
          ...bodyMusic(EA1_FRAMES),
        ]}
      />
      <Sfx cues={[...cues, ...bodyCues()]} />
    </AbsoluteFill>
  );
};
