import React from 'react';
import {AbsoluteFill, Audio, Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import V from '../../pipeline/voice/ea1.json';
import {ANTON, ComicBurst, Counter, HomeBase, K, UI, UICard, snap} from './kit';
import {Shake} from './kit2';

// ea1: "What if Abdul El-Sayed became president?" — 1-minute hook test (pipeline/episodes/ea1.json, brief ea1_brief.md).
// SENSITIVE: every fact card shows its source line; quotes are verbatim (S5, S6), opponents' claims are labelled as claims
// and paired with the fact check (S7); real people are only shown as the public-domain photo or as quoted text.
export const FPS = 30;
type W = {text: string; start: number; end: number};
type Beat = {id: string; start: number; end: number; words: W[]};
const beats = (V as {beats: Beat[]}).beats;
const B: Record<string, Beat> = Object.fromEntries(beats.map((b) => [b.id, b]));
const STRETCH = 1 / 0.9; // public/ea1/voice.flac is the cached voice slowed to 0.9× (Chatterbox ≈ 211 wpm → ≈ 190)
const fr = (t: number) => Math.round(t * STRETCH * FPS);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');
const at = (id: string, word?: string, n = 0) => {
  const b = B[id];
  if (!word) return fr(b.start);
  const hit = b.words.filter((w) => norm(w.text).startsWith(word))[n];
  return fr(hit ? hit.start : b.start);
};
export const EA1_FRAMES = fr((V as {total: number}).total) + FPS;
const S24 = (f24: number) => Math.round((f24 / 24) * FPS); // Blender shot frames (24 fps) → composition frames

// a Blender shot that holds its last frame if the segment is longer than the render
const ShotInner: React.FC<{name: string; len24: number}> = ({name, len24}) => {
  const f = useCurrentFrame(); // relative to the segment start (inside the Sequence)
  const last = S24(len24) - 1;
  const v = <OffthreadVideo src={staticFile(`ea1/shot_${name}.mp4`)} muted style={{width: 1920, height: 1080}} />;
  return f < last ? v : <Freeze frame={last}>{v}</Freeze>;
};
const Shot: React.FC<{name: string; len24: number; from: number; seg: number}> = ({name, len24, from, seg}) => (
  <Sequence from={from} durationInFrames={Math.max(1, seg)} layout="none">
    <AbsoluteFill>
      <ShotInner name={name} len24={len24} />
    </AbsoluteFill>
  </Sequence>
);

const OUTLINE = ['5px 0', '-5px 0', '0 5px', '0 -5px'].map((o) => `drop-shadow(${o} 0 #111)`).join(' ');
const Cut: React.FC<{f: number; keys: [number, string][]}> = ({f, keys}) => {
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
const Wob: React.FC<{f: number; i?: number; children: React.ReactNode}> = ({f, i = 0, children}) => (
  <div style={{position: 'absolute', inset: 0, transformOrigin: '6% 50%', transform: `scale(1.18) rotate(${Math.sin(f / 23 + i) * 0.6}deg) translateY(${Math.sin(f / 19 + i * 2) * 4}px)`}}>{children}</div>
);
const Big: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = K.white, size = 110, style}) => (
  <div style={{fontFamily: ANTON, fontSize: size, color, lineHeight: 1.05, ...style}}>{children}</div>
);
const Small: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = K.grey, size = 38, style}) => (
  <div style={{fontFamily: UI, fontWeight: 600, fontSize: size, color, ...style}}>{children}</div>
);
// the source line every fact card carries (sensitive topic: the viewer always sees where a claim comes from)
const Src: React.FC<{f: number; at: number; children: React.ReactNode}> = ({f, at: a, children}) =>
  f < a ? null : (
    <div style={{position: 'absolute', left: 40, bottom: 34, fontFamily: UI, fontWeight: 600, fontSize: 26, color: '#fff', background: 'rgba(0,0,0,0.62)', padding: '8px 16px', borderRadius: 10, opacity: snap(f, a, 6)}}>
      Source: {children}
    </div>
  );
const Kinetic: React.FC<{f: number; at: number; until?: number; x: number; y: number; children: React.ReactNode; color?: string; size?: number}> = ({f, at: a, until, x, y, children, color = '#fff', size = 96}) => {
  if (f < a || (until !== undefined && f >= until)) return null;
  const k = snap(f, a, 5);
  return (
    <div style={{position: 'absolute', left: x, top: y, fontFamily: ANTON, fontSize: size, color, WebkitTextStroke: '5px #111', transform: `scale(${1.5 - 0.5 * k}) rotate(-3deg)`, transformOrigin: 'left center', opacity: Math.min(1, k * 2)}}>
      {children}
    </div>
  );
};
const Bar: React.FC<{f: number; at: number; label: string; pct: number; color: string; y: number}> = ({f, at: a, label, pct, color, y}) => {
  const k = Math.min(1, Math.max(0, (f - a) / 24));
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
  const h2 = h('h2'), h3 = h('h3'), h4 = h('h4'), h5 = h('h5'), h6 = h('h6'), h7 = h('h7'), h8 = h('h8'), h9 = h('h9'), h10 = h('h10');
  const doctor = at('h1', 'doctor'), egypt = at('h1', 'egypt'), pres = at('h1', 'president');
  const constitution = at('h3', 'constitution'), born = at('h3', 'born'), thirty5 = at('h3', 'thirty');
  const sign = at('h4', 'sign'), redundant = at('h5', 'redundant'), unnecessary = at('h5', 'unnecessary');
  const thirty3 = at('h6', 'thirty'), still = at('h6', 'still');
  const mohammed = at('h7', 'mohammed'), jihad = at('h7', 'jihad');
  const claimed = at('h9', 'claimed'), noEv = at('h9', 'evidence');
  const mEnd = h4 + S24(274);
  const cStart = thirty3, cEnd = still;

  let scene: React.ReactNode;
  if (f < h2) {
    scene = (
      <>
        <Shot name="O" len24={133} from={0} seg={h2} />
        <Kinetic f={f} at={doctor} until={egypt} x={120} y={120}>A DOCTOR</Kinetic>
        <Kinetic f={f} at={egypt} until={pres} x={120} y={120} color={K.yellow}>DAD FROM EGYPT</Kinetic>
        <Kinetic f={f} at={pres} x={120} y={120} color={K.red}>PRESIDENT?</Kinetic>
      </>
    );
  } else if (f < h4) {
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
  } else if (f < Math.min(mEnd, h6)) {
    scene = (
      <>
        <Shot name="M" len24={274} from={h4} seg={h6 - h4} />
        <Kinetic f={f} at={sign} until={redundant} x={120} y={110} color={K.yellow}>MEDICARE FOR ALL</Kinetic>
        {f >= redundant ? (
          <div style={{position: 'absolute', left: 90, top: 90, width: 1000, background: 'rgba(15,16,20,0.88)', borderRadius: 18, padding: '26px 34px', opacity: snap(f, redundant, 6)}}>
            <Small color="#fff" size={40}>“…Medicare for All should make those choices <span style={{color: K.red}}>redundant and unnecessary</span>.”</Small>
            <Small size={28} style={{marginTop: 10}}>— El-Sayed campaign, on private insurance</Small>
          </div>
        ) : null}
        <ComicBurst f={f} at={unnecessary + 2} word="UNNECESSARY" x={1350} y={720} rot={-8} />
        <Src f={f} at={redundant}>Bridge Michigan fact check, Sep 25 2026</Src>
      </>
    );
  } else if (f < cStart) {
    scene = (
      <>
        <HomeBase f={f} />
        <Wob f={f}>
          <UICard f={f} at={Math.max(h6, mEnd) + 1} x={160} y={300} w={900} h={400}>
            <div style={{padding: 50}}>
              <Small>2026 Michigan Democratic Senate primary</Small>
              <Big size={120} color={K.yellow}>BUT FIRST…</Big>
            </div>
          </UICard>
        </Wob>
        <Cut f={f} keys={[[0, 'think_think']]} />
      </>
    );
  } else if (f < cEnd) {
    scene = (
      <>
        <Shake f={f} at={cStart} amp={14} len={12}>
          <Shot name="C" len24={110} from={cStart} seg={cEnd - cStart} />
        </Shake>
        <div style={{position: 'absolute', left: 90, top: 70}}>
          <Counter f={f} at={cStart} dur={40} to={33000000} prefix="$" size={150} color={K.green} />
          <Small color="#fff" size={36} style={{background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: 10, display: 'inline-block'}}>spent by United Democracy Project (AIPAC's super PAC) against him</Small>
        </div>
        <Src f={f} at={cStart}>NBC News, Oct 9 2026</Src>
      </>
    );
  } else if (f < h7) {
    scene = (
      <>
        <HomeBase f={f} />
        <Bar f={f} at={cEnd} label="Abdul El-Sayed" pct={48.4} color="#2f6fd6" y={300} />
        <Bar f={f} at={cEnd + 6} label="Haley Stevens (backed by that money)" pct={47.6} color="#8a8f99" y={520} />
        <Kinetic f={f} at={cEnd + 30} x={160} y={760} color={K.yellow} size={80}>WON BY LESS THAN 1 POINT</Kinetic>
        <Cut f={f} keys={[[0, 'grin_cheer']]} />
        <Src f={f} at={cEnd}>AP via ClickOnDetroit, Aug 5 2026; Wikipedia</Src>
      </>
    );
  } else if (f < h10) {
    const keys: [number, string][] = [[h7, 'shock_panic'], [h8, 'smug_point_you'], [h9, 'neutral_shrug'], [noEv, 'determined_point_l']];
    const card = (a: number, title: string, sub: string, body: React.ReactNode, i: number) => (
      <Wob f={f} i={i}>
        <UICard f={f} at={a + 2} x={140} y={210} w={1020} h={600}>
          <div style={{padding: 44}}>
            <Small color="#fff" size={40}>{title}</Small>
            <Small size={30} style={{marginBottom: 24}}>{sub}</Small>
            {body}
          </div>
        </UICard>
      </Wob>
    );
    scene = (
      <>
        <HomeBase f={f} />
        {f < h8
          ? card(
              h7,
              'Donald J. Trump',
              'Truth Social · Oct 8, 2026',
              <div style={{fontFamily: UI, fontSize: 44, color: '#fff', lineHeight: 1.35}}>
                “<span style={{color: f >= mohammed ? K.red : '#fff'}}>Mohammed</span> El-Sayed is a terrible Candidate for the Dumocrats…Mohammed goes back to the days of the <span style={{color: f >= jihad ? K.red : '#fff'}}>Jihad</span>. He is a RADICAL Extremist, Terrorist Sympathizer…”
              </div>,
              0,
            )
          : f < h9
            ? card(
                h8,
                'Abdul El-Sayed',
                'on X · Oct 9, 2026',
                <div style={{fontFamily: UI, fontSize: 60, color: '#fff', lineHeight: 1.3}}>“He knows my name is Abdul. He says it everyday.”</div>,
                1,
              )
            : card(
                h9,
                'CLAIM — Mike Rogers (Republican opponent), Aug 5, 2026',
                'El-Sayed "pledged his support to the Muslim Brotherhood"',
                <div style={{fontFamily: UI, fontSize: 40, color: '#ddd', lineHeight: 1.35}}>
                  Fact check: “There is no evidence that El-Sayed has ties to the organization or pledged support.”
                  {f >= noEv ? (
                    <div style={{marginTop: 30, display: 'inline-block', fontFamily: ANTON, fontSize: 110, color: K.red, border: `10px solid ${K.red}`, padding: '0 30px', transform: `rotate(-6deg) scale(${1.6 - 0.6 * snap(f, noEv, 4)})`}}>NO EVIDENCE</div>
                  ) : null}
                </div>,
                2,
              )}
        <Cut f={f} keys={keys} />
        <Src f={f} at={h7}>{f < h9 ? 'Mediaite, Oct 9 2026; Detroit News, Oct 8 2026' : 'Bridge Michigan fact check, Sep 3 2026'}</Src>
      </>
    );
  } else {
    scene = (
      <>
        <Shot name="E" len24={103} from={h10} seg={EA1_FRAMES - h10} />
        <Kinetic f={f} at={h10 + 10} x={120} y={120} size={84}>WHAT CHANGES FOR YOU?</Kinetic>
        <Kinetic f={f} at={at('h10', 'who')} x={120} y={240} size={84} color={K.yellow}>WHO FIGHTS HARDEST?</Kinetic>
      </>
    );
  }

  const cues: Cue[] = [
    {at: 0, src: 'ea1/door', v: 0.6},
    {at: 4, src: 'ea1/steps', v: 0.5},
    {at: doctor, src: 'ea1/heart', v: 0.5},
    {at: egypt, src: 'pop_hi', v: 0.4},
    {at: pres - 3, src: 'ea1/chair_whoosh', v: 0.6},
    {at: pres, src: 'stamp', v: 0.45},
    {at: h2 + 2, src: 'ea1/photo_slide', v: 0.5},
    {at: h3 + 2, src: 'slide', v: 0.45},
    {at: constitution, src: 'ea1/gavel', v: 0.6},
    {at: born, src: 'ea1/check1', v: 0.45},
    {at: thirty5, src: 'ea1/check2', v: 0.45},
    {at: h4, src: 'thump_low', v: 0.6},
    {at: sign, src: 'ea1/scribble', v: 0.55},
    {at: redundant, src: 'pop_hi', v: 0.4},
    {at: unnecessary, src: 'ea1/deflate', v: 0.6},
    {at: unnecessary + 2, src: 'ea1/stamp_un', v: 0.6},
    {at: h6, src: 'swish', v: 0.5},
    {at: cStart - 2, src: 'swish_fast', v: 0.5},
    {at: cStart, src: 'ea1/cash_rain', v: 0.6},
    {at: cStart, src: 'ea1/roll33', v: 0.55},
    {at: cEnd, src: 'ea1/vote_tick', v: 0.5},
    {at: cEnd + 30, src: 'ding', v: 0.45},
    {at: h7, src: 'ea1/notif', v: 0.55},
    {at: mohammed, src: 'ea1/name_glitch', v: 0.5},
    {at: jihad, src: 'boom', v: 0.35},
    {at: h8, src: 'ea1/reply_pop', v: 0.5},
    {at: h9, src: 'ea1/claim_buzz', v: 0.45},
    {at: noEv, src: 'ea1/no_evidence', v: 0.65},
    {at: h10, src: 'thump_low', v: 0.5},
    {at: h10 + 4, src: 'ea1/end_riser', v: 0.45},
    ...[h2, h3, h7, h8, h9, noEv].map((a) => ({at: a, src: 'snap_white', v: 0.3})),
  ];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {scene}
      <Audio src={staticFile('ea1/voice.flac')} />
      <Audio src={staticFile('music/bgm.mp3')} volume={0.06} loop />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
