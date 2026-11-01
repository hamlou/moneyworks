import React from 'react';
import {AbsoluteFill, Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Cue} from '../fx';
import {ANTON, ComicBurst, Counter, K, snap} from './kit';
import {MSeg} from './kit2';
import {at, Cut, Flash, Kinetic, Src} from './Ea1';
import {MacroText} from './macro';

// ea1 v3 body (pipeline/episodes/ea1_v3_script.md) — STYLE_3D §17: short word-synced pieces of 3D scenes, real 0.5–1.5 s
// clips, verbatim "macro highlight" evidence shots, still Dave poses + one gag per joke. NO "Dave beside a text card".
// Sensitive topic: every factual visual carries its Src line; quotes are verbatim; no Gaza.
export const GAP = 60; // 2 s music breath before every chapter (tools/voice_gaps.py ea1 2)
const LEN: Record<string, number> = {G: 3.33, Y: 9.25, Q: 17.17, P: 21.25, R: 19.21, B: 13.83, T: 37.71, V: 26.63, A: 47.38, W: 28.63, D: 29.25, E: 4.75};
type Pose = 'shock_panic' | 'smug_point_you' | 'determined_present' | 'think_think' | 'neutral_shrug' | 'grin_cheer' | 'determined_point_l';
type Vis =
  | {k: 'shot'; n: string; off: number}
  | {k: 'still'; n: string; t: number; pose?: Pose}
  | {k: 'clip'; src: string}
  | {k: 'macro'; lines: string[]; far?: string[]}
  | {k: 'pose'; pose: Pose}
  | {k: 'chapter'; title: string; n: string; t: number};
type Ov = (f: number, a: number) => React.ReactNode;
type E = {id: string; w?: string; n?: number; dt?: number; v: Vis; ov?: Ov; src?: string; sfx?: string};

// a 3D shot from an offset; if the segment outlasts the clip it keeps pushing in on the last frame (no dead freeze)
const Shot3D: React.FC<{n: string; off: number}> = ({n, off}) => {
  const f = useCurrentFrame();
  const last = Math.floor((LEN[n] - off) * 30) - 2;
  const v = <OffthreadVideo src={staticFile(`ea1/shot_${n}.mp4`)} startFrom={Math.round(off * 30)} muted style={{width: 1920, height: 1080}} />;
  return f < last ? v : <AbsoluteFill style={{transform: `scale(${1 + 0.002 * (f - last)})`}}><Freeze frame={last}>{v}</Freeze></AbsoluteFill>;
};
// a held 3D frame with a slow push-in (the reference's posed-diorama look)
const Still: React.FC<{n: string; t: number}> = ({n, t}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: `scale(${1.03 + 0.0028 * f})`, filter: 'brightness(0.8)'}}>
      <Freeze frame={Math.round(t * 30)}>
        <OffthreadVideo src={staticFile(`ea1/shot_${n}.mp4`)} muted style={{width: 1920, height: 1080}} />
      </Freeze>
    </AbsoluteFill>
  );
};
const RealClip: React.FC<{src: string}> = ({src}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: `scale(${1.02 + 0.002 * f})`}}>
      <OffthreadVideo src={staticFile(`ea1/names/${src}.mp4`)} muted style={{width: 1920, height: 1080}} />
    </AbsoluteFill>
  );
};
const Chapter: React.FC<{title: string; n: string; t: number}> = ({title, n, t}) => {
  const f = useCurrentFrame();
  return (
    <>
      <Still n={n} t={t} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: ANTON, fontSize: 210, color: '#fff', WebkitTextStroke: '8px #111', transform: `scale(${1.6 - 0.6 * snap(f, 2, 6)}) rotate(-3deg)`}}>{title}</div>
      </AbsoluteFill>
    </>
  );
};
// chapter → its set (latest chapter first)
const SETS: [() => number, [string, number]][] = [
  [() => at('c7_01') - GAP, ['W', 20]], [() => at('c6_01') - GAP, ['D', 20]], [() => at('c5_01') - GAP, ['A', 20]],
  [() => at('c4_01') - GAP, ['T', 30]], [() => at('c3_01') - GAP, ['V', 20]], [() => at('c2_01') - GAP, ['Y', 6]], [() => 0, ['G', 3]],
];
const Render: React.FC<{v: Vis; f0: number}> = ({v, f0}) => {
  const r = useCurrentFrame();
  const f = r + f0;
  if (v.k === 'shot') return <Shot3D n={v.n} off={v.off} />;
  if (v.k === 'clip') return <RealClip src={v.src} />;
  if (v.k === 'macro') return <MacroText lines={v.lines} far={v.far} />;
  if (v.k === 'chapter') return <Chapter title={v.title} n={v.n} t={v.t} />;
  if (v.k === 'still')
    return (
      <>
        <Still n={v.n} t={v.t} />
        {v.pose ? <Cut f={f} keys={[[0, v.pose]]} /> : null}
      </>
    );
  const set = SETS.find(([c]) => f >= c())?.[1] ?? ['G', 3];
  return (
    <>
      <AbsoluteFill style={{filter: 'blur(7px) brightness(0.62)', transform: `scale(${1.12 + 0.0015 * r})`}}>
        <Freeze frame={Math.round(set[1] * 30)}>
          <OffthreadVideo src={staticFile(`ea1/shot_${set[0]}.mp4`)} muted style={{width: 1920, height: 1080}} />
        </Freeze>
      </AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '78% 100%', transform: `scale(${1.08 + 0.0028 * r})`}}>
        <Cut f={f} keys={[[0, v.pose]]} />
      </div>
    </>
  );
};

// ── small 2D gags (one per joke) ──
const Moth: Ov = (f, a) => {
  const t = f - a;
  return t < 0 ? null : (
    <div style={{position: 'absolute', left: 1180 - t * 4 + Math.sin(t / 3) * 40, top: 640 - t * 9, width: 70, height: 40, display: 'flex', gap: 4, transform: `scaleY(${0.4 + 0.6 * Math.abs(Math.sin(t))})`}}>
      <div style={{flex: 1, background: '#8b8478', borderRadius: '50% 10% 50% 50%'}} />
      <div style={{flex: 1, background: '#8b8478', borderRadius: '10% 50% 50% 50%'}} />
    </div>
  );
};
const Sticky: Ov = (f, a) => (f < a ? null : (
  <div style={{position: 'absolute', right: 300, top: 220, width: 260, height: 220, background: '#ffe95c', boxShadow: '0 10px 20px rgba(0,0,0,.4)', transform: `rotate(-8deg) scale(${snap(f, a, 5)})`, fontFamily: ANTON, fontSize: 96, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>DAVE</div>
));
const Coin: Ov = (f, a) => {
  const t = Math.max(0, f - a);
  return f < a ? null : <div style={{position: 'absolute', left: 1040, top: Math.min(700, 120 + t * t * 2.2), width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(#ffe27a,#c9921c)', border: '6px solid #a8740f'}} />;
};
const Buttons: Ov = (f, a) => (
  <div style={{position: 'absolute', left: 140, top: 330, display: 'flex', gap: 60, opacity: snap(f, a, 6)}}>
    {[['TAXES ↑', K.red], ['PREMIUMS ↓', '#2f6fd6']].map(([t, c]) => (
      <div key={t} style={{width: 380, height: 240, borderRadius: 40, background: c, boxShadow: '0 18px 0 rgba(0,0,0,.45)', fontFamily: ANTON, fontSize: 64, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t}</div>
    ))}
  </div>
);
const Books: Ov = (f, a) => (
  <div style={{position: 'absolute', left: 160, top: 160, display: 'flex', gap: 60}}>
    {[0, 1].map((i) => (
      <Img key={i} src={staticFile(`ea1/book_ae${i}.png`)} style={{height: 680, boxShadow: '0 30px 60px rgba(0,0,0,.6)', transform: `translateY(${(1 - snap(f, a + i * 8, 6)) * -1000}px) rotate(${i ? 4 : -4}deg)`}} />
    ))}
  </div>
);
const Card: Ov = (f, a) => (f < a ? null : (
  <div style={{position: 'absolute', left: 260, top: 380, width: 520, height: 320, borderRadius: 24, background: '#2f6fd6', transform: 'rotate(-6deg)', boxShadow: '0 20px 40px rgba(0,0,0,.5)', overflow: 'hidden'}}>
    <div style={{fontFamily: ANTON, fontSize: 64, color: '#fff', padding: 30}}>LIBRARY CARD</div>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${Math.max(0, 70 - (f - a) * 3)}%, #17181b ${Math.max(0, 70 - (f - a) * 3)}%)`}} />
  </div>
));
const kin = (text: string, w: [string, string?], color: string = '#fff', y = 110, size = 120): Ov => (f) => <Kinetic f={f} at={at(w[0], w[1])} x={110} y={y} size={size} color={color}>{text}</Kinetic>;
const burst = (word: string, w: [string, string?]): Ov => (f) => <ComicBurst f={f} at={at(w[0], w[1])} word={word} x={560} y={600} />;
const both = (...o: Ov[]): Ov => (f, a) => <>{o.map((x, i) => <React.Fragment key={i}>{x(f, a)}</React.Fragment>)}</>;

// each visual lasts until the next entry. Anchor: beat id (+ word, nth match); dt < 0 = before the beat (chapter
// breath), dt ≥ 0 = frames after the previous entry (real clips are 1.2 s).
const ENTRIES: E[] = [
  // ── CH1 THE PRESIDENT KNOWS HIS NAME (problem 1)
  {id: 'c1_01', v: {k: 'still', n: 'G', t: 3.0, pose: 'grin_cheer'}, ov: burst('HE WON!', ['c1_01', 'thirty'])},
  {id: 'c1_01', w: 'it', v: {k: 'pose', pose: 'shock_panic'}, sfx: 'ea1/k_boom'},
  {id: 'c1_02', v: {k: 'clip', src: 'n4'}, src: 'President Trump, via CBS News'},
  {id: 'c1_02', dt: 30, v: {k: 'macro', lines: ['Mohammed El-Sayed is a terrible Candidate', '[Mohammed goes back to the days of the Jihad.]', 'He is a RADICAL Extremist'], far: ['Truth Social', 'Terrorist Sympathizer']}, src: 'Truth Social, Oct 8 2026'},
  {id: 'c1_03', v: {k: 'pose', pose: 'smug_point_you'}, ov: kin('"MY NAME IS ABDUL"', ['c1_03', 'abdul'], K.yellow), src: 'Mediaite, Oct 9 2026'},
  {id: 'c1_04', v: {k: 'pose', pose: 'neutral_shrug'}, ov: Sticky, sfx: 'ea1/crickets'},
  {id: 'c1_05', v: {k: 'macro', lines: ['', 'claimed El-Sayed [pledged his support to the Muslim Brotherhood]', ''], far: ['Mike Rogers', 'Aug 5 statement']}, src: 'Mike Rogers statement, Aug 5 2026'},
  {id: 'c1_05', w: 'fact', v: {k: 'macro', lines: ['', '[There is no evidence] that El-Sayed has ties to the organization', ''], far: ['fact check', 'Bridge Michigan']}, src: 'Bridge Michigan fact check, Sep 3 2026', sfx: 'ea1/no_evidence'},
  {id: 'c1_06', v: {k: 'shot', n: 'G', off: 0}},
  // ── CH2 DAY ONE (problem 2: the price, the pen)
  {id: 'c2_01', dt: -GAP, v: {k: 'chapter', title: 'DAY 1', n: 'Y', t: 1}},
  {id: 'c2_01', v: {k: 'shot', n: 'Y', off: 0}, ov: kin('MEDICARE FOR ALL', ['c2_01', 'medicare'], K.yellow), src: 'Bridge Michigan'},
  {id: 'c2_02', v: {k: 'shot', n: 'Q', off: 5}, ov: kin('BILL → WASHINGTON', ['c2_02', 'washington']), src: 'Bridge Michigan'},
  {id: 'c2_03', v: {k: 'shot', n: 'P', off: 3}},
  {id: 'c2_04', v: {k: 'shot', n: 'P', off: 9}, ov: (f) => <Counter f={f} at={at('c2_04', 'thirty')} dur={40} to={34} prefix="$" suffix=" TRILLION" size={130} color={K.yellow} style={{position: 'absolute', left: 110, top: 90}} />, src: 'Urban Institute estimate · John Holahan via Bridge Michigan, Apr 29 2026'},
  {id: 'c2_05', v: {k: 'shot', n: 'P', off: 15}, ov: kin('× 2 TODAY?', ['c2_05', 'double'], K.red, 110, 150), src: 'John Holahan (Urban Institute) via Bridge Michigan'},
  {id: 'c2_06', v: {k: 'pose', pose: 'shock_panic'}, ov: Moth, sfx: 'ea1/crickets'},
  {id: 'c2_07', v: {k: 'still', n: 'Y', t: 8, pose: 'think_think'}, ov: Buttons, src: 'Bridge Michigan'},
  {id: 'c2_08', v: {k: 'macro', lines: ['', 'middle-class taxes [would have to rise]', ''], far: ['Committee for a Responsible Federal Budget', 'Medicare for All']}, src: 'Committee for a Responsible Federal Budget (2019) via Bridge Michigan'},
  {id: 'c2_09', v: {k: 'still', n: 'Y', t: 8, pose: 'determined_present'}, ov: both(Buttons, kin('MANY COULD PAY LESS', ['c2_09', 'less'], K.yellow, 640, 90)), src: 'Committee for a Responsible Federal Budget via Bridge Michigan'},
  {id: 'c2_10', v: {k: 'shot', n: 'Y', off: 4}, sfx: 'ea1/fail'},
  {id: 'c2_10', w: 'nothing', v: {k: 'pose', pose: 'neutral_shrug'}, sfx: 'ea1/crickets'},
  // ── CH3 THE PEN IS NOT ENOUGH (problem 3) → a small win → the money
  {id: 'c3_01', dt: -GAP, v: {k: 'chapter', title: 'THE SENATE', n: 'V', t: 3}},
  {id: 'c3_01', v: {k: 'shot', n: 'V', off: 0}, ov: both(kin('51 TO PASS', ['c3_01', 'senate']), kin('60 TO GET PAST A FILIBUSTER', ['c3_01', 'sixty'], K.yellow, 230, 90)), src: 'U.S. Senate Rule XXII · Straight Arrow News explainer'},
  {id: 'c3_02', v: {k: 'shot', n: 'V', off: 14}},
  {id: 'c3_03', v: {k: 'shot', n: 'R', off: 0}, ov: kin('YOUR RENT', ['c3_03', 'rent'], K.red, 110, 150)},
  {id: 'c3_04', v: {k: 'shot', n: 'R', off: 8}, ov: both(kin('BAN BIG CORPORATE LANDLORDS', ['c3_04', 'ban'], '#fff', 110, 80), kin('BAN RENT-SETTING SOFTWARE', ['c3_04', 'computer'], K.yellow, 210, 80)), src: 'Newsweek, Aug 2026'},
  {id: 'c3_05', v: {k: 'shot', n: 'B', off: 4}, ov: both((f) => <Counter f={f} at={at('c3_05', 'two')} dur={20} to={2} suffix="%" size={170} color={K.yellow} style={{position: 'absolute', left: 110, top: 80}} />, kin('1 OF 50', ['c3_05', 'one'], '#fff', 300, 120)), src: 'Marty P. Jordan (Michigan State University) via Newsweek'},
  {id: 'c3_06', v: {k: 'still', n: 'V', t: 25, pose: 'grin_cheer'}, ov: kin('350+ HOMES → NO MORE BUYING', ['c3_06', 'three'], K.yellow, 110, 90), src: '21st Century ROAD to Housing Act · NPR, Mar 12 2026'},
  {id: 'c3_07', v: {k: 'pose', pose: 'grin_cheer'}, ov: burst('A WIN!', ['c3_07', 'finally'])},
  {id: 'c3_07', w: 'money', v: {k: 'shot', n: 'T', off: 0}, sfx: 'ea1/k_slam'},
  // ── CH4 THE MONEY (problem 4)
  {id: 'c4_01', dt: -GAP, v: {k: 'chapter', title: 'THE MONEY', n: 'T', t: 30}},
  {id: 'c4_01', v: {k: 'shot', n: 'T', off: 2}, ov: both((f) => <Counter f={f} at={at('c4_01')} dur={30} to={33000000} prefix="$" size={140} color={K.green} style={{position: 'absolute', left: 110, top: 90}} />, burst('CUTE.', ['c4_01', 'cute'])), src: 'NBC News, Oct 9 2026'},
  {id: 'c4_02', v: {k: 'shot', n: 'T', off: 6}, ov: (f) => <Counter f={f} at={at('c4_02', 'two')} dur={45} to={205} prefix="$" suffix=" MILLION+" size={130} color={K.yellow} style={{position: 'absolute', left: 110, top: 90}} />, src: 'Bridge Michigan (FEC records), Oct 2 2026'},
  {id: 'c4_03', v: {k: 'shot', n: 'T', off: 14}, ov: kin('GOP GROUPS: $59.3M', ['c4_03', 'fifty'], K.red, 110, 120), src: 'Bridge Michigan (FEC records), Oct 2 2026'},
  {id: 'c4_04', v: {k: 'shot', n: 'T', off: 20}, ov: kin('UP TO $9M MORE (REPORTED)', ['c4_04', 'nine'], K.yellow, 110, 100), src: 'New York Times via Newsweek, Oct 21 2026'},
  {id: 'c4_05', v: {k: 'shot', n: 'T', off: 28}, ov: kin('HIS BACKERS: $23M', ['c4_05', 'twenty'], '#5aa0ff', 110, 130), src: 'Bridge Michigan (FEC records), Oct 2 2026'},
  {id: 'c4_06', v: {k: 'clip', src: 'b_aoc'}, src: 'CBS News Detroit'},
  {id: 'c4_06', dt: 36, v: {k: 'macro', lines: ['Rep. Alexandria Ocasio-Cortez donated', '[$1 million to Dr. Abdul El-Sayed]', 'who is running for U.S. Senate as a Democrat.'], far: ['New York Democratic', 'The National News Desk']}, src: 'WLOS / The National News Desk, Oct 16 2026'},
  {id: 'c4_07', v: {k: 'still', n: 'T', t: 36, pose: 'grin_cheer'}, ov: Coin, sfx: 'ea1/cash_rain'},
  {id: 'c4_08', v: {k: 'pose', pose: 'smug_point_you'}, ov: kin('KEEP AN EYE ON FOX NEWS…', ['c4_08', 'fox'], K.red, 300, 90)},
  {id: 'c4_09', v: {k: 'shot', n: 'A', off: 0}, sfx: 'ea1/heart'},
  // ── CH5 IT GETS PERSONAL (problem 5 → low point)
  {id: 'c5_01', dt: -GAP, v: {k: 'chapter', title: 'PERSONAL', n: 'A', t: 8}},
  {id: 'c5_01', v: {k: 'clip', src: 'b_rally'}, src: 'AP'},
  {id: 'c5_01', dt: 36, v: {k: 'shot', n: 'A', off: 4}, src: 'AP, Oct 25 2026'},
  {id: 'c5_02', v: {k: 'macro', lines: ['he told the crowd', "[I'm here to keep a jihadist Muslim Brotherhood member]", 'from becoming a United States senator.'], far: ['Port Huron', 'McMorran Place']}, src: 'President Trump, Port Huron rally · AP, Oct 25 2026', sfx: 'ea1/k_boom'},
  {id: 'c5_03', v: {k: 'macro', lines: ['El-Sayed', 'has repeatedly said he is [loyal to the U.S.]', 'and disavowed the Muslim Brotherhood.'], far: ['AP', 'Michigan Senate race']}, src: 'AP, Oct 25 2026'},
  {id: 'c5_04', v: {k: 'clip', src: 'b_debate'}, src: 'CBS News · final Senate debate'},
  {id: 'c5_04', w: 'proud', v: {k: 'macro', lines: ['El-Sayed called it shameful.', "[I'm proud of our Constitution]", 'that guarantees all of us the right to pray'], far: ['as we choose to pray.', 'AP']}, src: 'Abdul El-Sayed · AP, Oct 25 2026'},
  {id: 'c5_05', v: {k: 'shot', n: 'A', off: 12}, ov: kin('"DON\'T WUSS OUT, MAN."', ['c5_05', 'donald'], K.yellow, 110, 110), src: 'Abdul El-Sayed · AP, Oct 25 2026'},
  {id: 'c5_06', v: {k: 'shot', n: 'A', off: 40}, sfx: 'ea1/fail'},
  {id: 'c5_07', v: {k: 'macro', lines: ['Michigan Democrat Abdul El-Sayed Fumes About His CNN Interviews:', "'I Get a [Non-Consensual Colonoscopy]'", ''], far: ['Mediaite', 'CNN']}, src: 'Mediaite'},
  {id: 'c5_08', v: {k: 'pose', pose: 'think_think'}, ov: burst('DOCTOR.', ['c5_08', 'doctor'])},
  {id: 'c5_09', v: {k: 'shot', n: 'E', off: 0}, ov: both(kin('MONEY ✗', ['c5_09', 'money'], K.red, 110, 90), kin('MATH ✗', ['c5_09', 'math'], K.red, 210, 90), kin('HALF THE NEWS ✗', ['c5_09', 'half'], K.red, 310, 90))},
  // ── CH6 THE TEST (comeback, with its own problems)
  {id: 'c6_01', dt: -GAP, v: {k: 'chapter', title: 'THE TEST', n: 'D', t: 2}},
  {id: 'c6_01', v: {k: 'macro', lines: ['', "Jesse Watters says '[I actually like]' Abdul el Sayed", 'after interviewing him'], far: ['Washington Examiner', 'Fox News']}, src: 'Washington Examiner'},
  {id: 'c6_02', v: {k: 'pose', pose: 'shock_panic'}, ov: burst('EVEN FOX.', ['c6_02']), sfx: 'ea1/k_boom'},
  {id: 'c6_03', v: {k: 'shot', n: 'D', off: 0}, ov: kin('DETROIT · 2015', ['c6_03', '2015'], K.yellow, 110, 130), src: 'Bridge Michigan, Sep 25 2026 · Wikipedia'},
  {id: 'c6_04', v: {k: 'shot', n: 'D', off: 6}, ov: kin('DEPARTMENT × 2', ['c6_04', 'doubled'], '#fff', 110, 130), src: 'Bridge Michigan, Sep 25 2026'},
  {id: 'c6_05', v: {k: 'shot', n: 'D', off: 10}, ov: both((f) => <Counter f={f} at={at('c6_05', 'ninety')} dur={30} to={94} suffix=" BUILDINGS TESTED" size={100} color="#5aa0ff" style={{position: 'absolute', left: 110, top: 90}} />, kin('19 SCHOOLS: TOO MUCH LEAD OR COPPER', ['c6_05', 'nineteen'], K.red, 230, 76)), src: 'Michigan Public, Aug 30 2016'},
  {id: 'c6_06', v: {k: 'pose', pose: 'neutral_shrug'}, sfx: 'ea1/crickets'},
  {id: 'c6_07', v: {k: 'still', n: 'D', t: 27, pose: 'think_think'}, ov: both(kin('"REMOVED THE LEAD"?', ['c6_07', 'removed'], '#fff', 110, 100), kin('FIXES WERE TEMPORARY', ['c6_07', 'temporary'], K.red, 230, 100), kin('HIS TEAM FOUND IT', ['c6_07', 'honest'], K.yellow, 350, 100)), src: 'Washington Free Beacon, Jul 29 2026'},
  {id: 'c6_08', v: {k: 'still', n: 'D', t: 27, pose: 'grin_cheer'}, ov: (f) => <Counter f={f} at={at('c6_08', 'five')} dur={30} to={5000} suffix="+ FREE GLASSES" size={110} color={K.yellow} style={{position: 'absolute', left: 110, top: 100}} />, src: 'Bridge Michigan, Sep 25 2026 (Vision to Learn)'},
  {id: 'c6_09', v: {k: 'pose', pose: 'smug_point_you'}, ov: (f) => Books(f, at('c6_09', 'they')), src: 'Abrams Press 2020 · Oxford University Press 2021', sfx: 'ea1/co_book'},
  {id: 'c6_10', v: {k: 'pose', pose: 'neutral_shrug'}, ov: (f) => Card(f, at('c6_10', 'library')), sfx: 'ea1/fail'},
  {id: 'c6_11', v: {k: 'still', n: 'G', t: 3.0, pose: 'shock_panic'}, ov: kin('2018: LOST TO GRETCHEN WHITMER', ['c6_11', 'lost'], K.red, 110, 90), src: 'Bridge Michigan, Aug 2018 · Wikipedia'},
  {id: 'c6_12', v: {k: 'pose', pose: 'determined_point_l'}, sfx: 'ea1/end_riser'},
  // ── CH7 THE ANSWER (payoff of the hook)
  {id: 'c7_01', dt: -GAP, v: {k: 'chapter', title: 'THE ANSWER', n: 'W', t: 2}},
  {id: 'c7_01', v: {k: 'shot', n: 'W', off: 0}, ov: both(kin('WHO FIGHTS HARDEST?', ['c7_01', 'who'], K.yellow, 110, 110), kin('NOT ONE PERSON', ['c7_01', 'not'], '#fff', 240, 110)), src: 'Bridge Michigan · Senate Rule XXII'},
  {id: 'c7_02', v: {k: 'shot', n: 'W', off: 18}, ov: both(kin('ABSOLUTELY…', ['c7_02', 'absolutely'], K.yellow, 110, 130), kin('NOTHING (IN MONTH 1)', ['c7_02', 'nothing'], '#fff', 250, 110), kin('PRESIDENT = PEN · CONGRESS = PAPER', ['c7_02', 'because'], K.yellow, 380, 80))},
  {id: 'c7_03', v: {k: 'still', n: 'G', t: 3.0, pose: 'think_think'}, ov: both(kin('VS MIKE ROGERS', ['c7_03', 'rogers'], '#fff', 110, 100), kin('FIRST MUSLIM SENATOR?', ['c7_03', 'first'], K.yellow, 230, 100)), src: 'AP, Oct 25 2026'},
  {id: 'c7_04', v: {k: 'still', n: 'G', t: 3.0, pose: 'determined_point_l'}, ov: kin('NOVEMBER 3', ['c7_04', 'november'], K.red, 110, 170), sfx: 'ea1/k_riser'},
  {id: 'c7_05', v: {k: 'pose', pose: 'smug_point_you'}, ov: both(kin('KEEP IT?', ['c7_05', 'keep'], '#5aa0ff', 140, 120), kin('THROW IT OUT?', ['c7_05', 'throw'], K.red, 290, 120), kin('↓ COMMENTS', ['c7_05', 'comments'], K.yellow, 440, 90))},
  {id: 'c7_06', v: {k: 'pose', pose: 'grin_cheer'}, ov: kin('MONEY TALKS.', ['c7_06'], K.yellow, 380, 130)},
];

let _S: number[] | null = null;
const starts = (): number[] => {
  if (_S) return _S;
  const r: number[] = [];
  ENTRIES.forEach((e, i) => r.push(e.dt !== undefined ? (e.dt < 0 ? at(e.id) + e.dt : r[i - 1] + e.dt) : at(e.id, e.w, e.n ?? 0)));
  _S = r;
  return r;
};
export const bodyStart = () => at('c1_01') - GAP;
const FLASHY = new Set(['clip', 'macro', 'chapter']);

export const BodyScene: React.FC<{f: number; end: number}> = ({f, end}) => {
  const S = starts();
  const c1 = at('c1_01');
  if (f < c1)
    return (
      <AbsoluteFill style={{background: '#000'}}>
        <Sequence from={c1 - GAP} durationInFrames={GAP}>
          <Chapter title="BUT…" n="G" t={1} />
        </Sequence>
      </AbsoluteFill>
    );
  let i = 0;
  while (i + 1 < S.length && f >= S[i + 1]) i++;
  const e = ENTRIES[i];
  const a = S[i];
  const next = i + 1 < S.length ? S[i + 1] : end;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Sequence from={a} durationInFrames={Math.max(1, next - a)}>
        <Render v={e.v} f0={a} />
      </Sequence>
      {e.ov ? e.ov(f, a) : null}
      {e.src ? <Src f={f} at={a + 3}>{e.src}</Src> : null}
      {FLASHY.has(e.v.k) ? <Flash f={f} at={a} /> : null}
    </AbsoluteFill>
  );
};

export const bodyMusic = (end: number): MSeg[] => {
  const b = (id: string) => at(id);
  return [
    {src: 'volatile_reaction', from: b('c1_01') - GAP, to: b('c1_04') - 4},
    {src: 'comic_plodding', from: b('c1_04'), to: b('c2_01') - GAP - 4},
    {src: 'life_of_riley', from: b('c2_01') - GAP, to: b('c2_06') - 4},
    {src: 'thinking_music', from: b('c2_07'), to: b('c2_10') - 4},
    {src: 'monkeys_spinning_monkeys', from: b('c3_01') - GAP, to: b('c3_07') + 20},
    {src: 'scheming_weasel_faster', from: b('c4_01') - GAP, to: b('c4_05') - 4},
    {src: 'hiding_your_reality', from: b('c4_05') + 20, to: b('c4_09')},
    {src: 'darkest_child', from: b('c5_01') - GAP, to: b('c5_06') - 4},
    {src: 'comic_plodding', from: b('c5_06'), to: b('c5_09') - 4, off: 30 * 20},
    {src: 'darkest_child', from: b('c5_09'), to: b('c6_01') - GAP, off: 30 * 40},
    {src: 'pixel_peeker_polka_faster', from: b('c6_01') - GAP, to: b('c6_06')},
    {src: 'life_of_riley', from: b('c6_06'), to: b('c6_12'), off: 30 * 15},
    {src: 'investigations', from: b('c6_12'), to: b('c7_01') - GAP},
    {src: 'unanswered_questions', from: b('c7_01') - GAP, to: b('c7_05') - 4},
    {src: 'monkeys_spinning_monkeys', from: b('c7_05'), to: end, off: 30 * 20},
  ];
};

export const bodyCues = (): Cue[] => {
  const S = starts();
  const cues: Cue[] = [{at: at('c1_01') - GAP, src: 'ea1/k_boom', v: 0.55}];
  ENTRIES.forEach((e, i) => {
    cues.push({at: S[i], src: i % 3 === 0 ? 'ea1/k_flash' : i % 3 === 1 ? 'ea1/reply_pop' : 'ea1/photo_slide', v: 0.4});
    if (e.v.k === 'macro') cues.push({at: S[i], src: `ea1/co_flash${(i % 3) + 1}`, v: 0.6});
    if (e.v.k === 'chapter') cues.push({at: S[i], src: 'ea1/k_boom', v: 0.55});
    if (e.sfx) cues.push({at: S[i] + 2, src: e.sfx, v: 0.55});
  });
  return cues;
};
