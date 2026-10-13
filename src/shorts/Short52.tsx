import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop, shake} from '../anim';
import {G, Text, Paper} from '../props';
import {SubButton, Bell} from '../props2';
import {WebinarLaptop, CourseTier, Mansion} from '../props52';
import {Slam} from '../photo';
import {Dave, Guru, Coach, Cap, M2am, MTrustBro, MPigeon, MPanik, MTakeMoney, MFine, MAlways, MPointing, MStonks, MDrake, MSurprised, MButtons, MError, MSuccess, MDanger, MTrade, MSweat, MMath, MWaiting, MReverse, ToBeContinued} from '../memes52';

// short52 v2 (13 Oct 2026): split screen. TOP = the real photo (or a meme card over it), BOTTOM = the drawn stage with the cast.
// Every photo id is used exactly once and sits under the words that name it; a meme lands every 2-4 s (PLAYBOOK_SHORTS §9).
const W = 1080;
const H = 1920;
const TOP = 1100;
const DY = 1765; // feet line of the cast

const Svg: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>{children}</svg>;

// Real photo filling the top panel: punch-in on the cut, then a slow push so it never sits still.
const Photo: React.FC<{f: number; at: number; id: string; pos?: string; zoom?: [number, number]; gray?: boolean}> = ({f, at, id, pos = '50% 50%', zoom = [1.14, 1.02], gray}) => {
  const k = Math.max(0, f - at);
  const z = (zoom[0] + (zoom[1] - zoom[0]) * Math.min(1, k / 100)) * ease(k, 0, 5, 1.22, 1);
  const sh = shake(f, at + 4, 10, 10);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: TOP, overflow: 'hidden', background: C.ink}}>
      <Img src={staticFile(`photos/short52/${id}.jpg`)} style={{position: 'absolute', left: -30 + sh.x, top: -30 + sh.y, width: W + 60, height: TOP + 60, objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`, filter: gray ? 'grayscale(1) contrast(1.1)' : 'saturate(1.12) contrast(1.04)'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(35,35,43,0.28) 0%, rgba(35,35,43,0) 22%, rgba(35,35,43,0) 78%, rgba(35,35,43,0.4) 100%)'}} />
    </div>
  );
};

// Flat colour top panel for the few seconds that have no photo (kinetic type / drawn props).
const Panel: React.FC<{f: number; at: number; color: string; children?: React.ReactNode}> = ({f, at, color, children}) => {
  const k = Math.max(0, f - at);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: TOP, overflow: 'hidden', background: color}}>
      <svg width={W} height={TOP} viewBox={`0 0 ${W} ${TOP}`} style={{position: 'absolute', inset: 0, transform: `scale(${ease(k, 0, 5, 1.18, 1)})`}}>
        {Array.from({length: 14}).map((_, i) => <path key={i} d={`M ${W / 2} ${TOP / 2} L ${W / 2 + Math.cos((i / 14) * 6.283 + f / 60) * 1400} ${TOP / 2 + Math.sin((i / 14) * 6.283 + f / 60) * 1400}`} stroke="rgba(255,255,255,0.10)" strokeWidth={70} />)}
        {children}
      </svg>
    </div>
  );
};

// Meme card over the top panel: white frame, pops in, wobbles like paper.
const Meme: React.FC<{f: number; at: number; out: number; w?: number; h?: number; y?: number; rot?: number; children: (m: {f: number; w: number; h: number}) => React.ReactNode}> = ({f, at, out, w = 960, h = 700, y = 570, rot = -2, children}) => {
  if (f < at || f >= out) return null;
  const sc = pop(f, at, 9, 240);
  const sh = shake(f, at + 3, 12, 10);
  const wob = Math.floor(f / 7) % 2 ? 0.6 : -0.6;
  return (
    <div style={{position: 'absolute', left: W / 2 - w / 2 + sh.x, top: y - h / 2 + sh.y, width: w, height: h, transform: `rotate(${rot + wob}deg) scale(${sc * (1 + 0.012 * Math.sin((f - at) / 6))})`, border: '14px solid #fff', outline: `6px solid ${C.ink}`, boxShadow: '14px 18px 0 rgba(35,35,43,0.35)', boxSizing: 'content-box', marginLeft: -14, marginTop: -14, overflow: 'hidden', background: '#fff'}}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>{children({f: f - at, w, h})}</svg>
    </div>
  );
};

// TikTok-style "POV:" text box.
const Pov: React.FC<{f: number; at: number; out: number; text: string; y?: number}> = ({f, at, out, text, y = 190}) =>
  f < at || f >= out ? null : (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', transform: `scale(${at < 0 ? 1 : pop(f, at, 10, 240)})`}}>
      <span style={{fontFamily: FONT, fontWeight: 700, fontSize: 54, color: '#fff', background: 'rgba(0,0,0,0.78)', borderRadius: 18, padding: '10px 26px', lineHeight: 1.5, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' as any}}>{text}</span>
    </div>
  );

// Word-synced captions, three words at a time, sitting on the line between photo and stage.
const Captions: React.FC<{f: number}> = ({f}) => {
  const {t} = useT();
  const sec = f / 30;
  const words = t.beats.flatMap((b) => b.words);
  const chunks: (typeof words)[] = [];
  t.beats.forEach((b) => {
    let cur: typeof words = [];
    b.words.forEach((w) => {
      if (cur.length >= 3 || cur.reduce((n, x) => n + x.text.length, 0) + w.text.length > 17) {
        chunks.push(cur);
        cur = [];
      }
      cur.push(w);
    });
    if (cur.length) chunks.push(cur);
  });
  let ci = -1;
  chunks.forEach((c, i) => {
    if (c[0].start <= sec + 0.03) ci = i;
  });
  if (ci < 0 || !words.length) return null;
  const c = chunks[ci];
  const k = pop(f, Math.round(c[0].start * 30) - 1, 10, 300);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: TOP + 18, textAlign: 'center', transform: `scale(${0.8 + 0.2 * k})`, fontFamily: FONT, fontWeight: 700, fontSize: 70, lineHeight: 1, color: '#fff', WebkitTextStroke: `14px ${C.ink}`, paintOrder: 'stroke fill' as any, textTransform: 'uppercase', whiteSpace: 'nowrap'}}>
      {c.map((w, i) => (
        <span key={i} style={{color: w.start <= sec + 0.03 && sec < w.end + 0.12 ? C.yellow : '#fff', margin: '0 17px', display: 'inline-block', transform: w.start <= sec + 0.03 && sec < w.end + 0.12 ? 'scale(1.1) rotate(-2deg)' : undefined}}>{w.text}</span>
      ))}
    </div>
  );
};

const Sfx: React.FC<{at: number; file: string; vol?: number}> = ({at, file, vol = 1}) => (at < 0 ? null : <Sequence from={at} durationInFrames={60} layout="none"><Audio src={staticFile(`sfx/${file}.wav`)} volume={vol} /></Sequence>);

// The long video as a player card (end CTA).
const VideoCard: React.FC<{f: number; at: number}> = ({f, at}) => {
  const k = pop(f, at, 10, 220);
  const pulse = 1 + 0.08 * Math.sin((f - at) / 3);
  return (
    <g transform={`translate(${W / 2},520) scale(${k}) rotate(-2)`}>
      <rect x={-486} y={-286} width={972} height={572} rx={34} fill="#fff" stroke={C.ink} strokeWidth={8} />
      <rect x={-460} y={-260} width={920} height={520} rx={18} fill="#8FD0F2" />
      <rect x={-460} y={110} width={920} height={150} fill="#7BC96F" />
      <G x={-170} y={40} s={0.9}><Mansion /></G>
      <Guru f={f} x={250} y={230} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.4}]} />
      <Cap x={0} y={-190} size={70} mw={860}>{"WHY 'GET RICH' GURUS SELL COURSES"}</Cap>
      <g transform={`scale(${pulse})`}>
        <rect x={-110} y={-70} width={220} height={150} rx={40} fill="#E62117" stroke={C.ink} strokeWidth={8} />
        <path d="M -30 -40 L 50 5 L -30 50 Z" fill="#fff" />
      </g>
      <rect x={300} y={196} width={150} height={52} rx={10} fill={C.ink} />
      <Text x={375} y={224} size={34} color="#fff">10:42</Text>
    </g>
  );
};

const Body: React.FC = () => {
  const f = useCurrentFrame();
  const {t, bs, w} = useT();
  const d = Math.round(t.total * 30);
  const pick = <T extends {at: number}>(items: T[]): T | null => {
    let cur: T | null = null;
    [...items].sort((a, b) => a.at - b.at).forEach((x) => {
      if (x.at <= f) cur = x;
    });
    return cur;
  };

  // ---- word anchors (frames) ----
  const o1 = 0;
  const o1dave = w('o1', 'Dave');
  const o1pay = w('o1', 'paying');
  const o1nine = w('o1', 'nine');
  const o1seven = w('o1', 'seven');
  const o1man = w('o1', 'man');
  const o2 = bs('o2');
  const o2hang = w('o2', 'hang');
  const o3 = bs('o3');
  const o3i = w('o3', 'I');
  const o3free = w('o3', 'free');
  const o4 = bs('o4');
  const o4lambo = w('o4', 'Lamborghini');
  const o4jet = w('o4', 'jet') - 3;
  const o4but = w('o4', 'but');
  const o5 = bs('o5');
  const o5twenty = w('o5', 'twenty');
  const o5one = w('o5', 'one');
  const o5so = w('o5', 'so');
  const o5paid = w('o5', 'paid') + 6;
  const o6 = bs('o6');
  const o6real = w('o6', 'real');
  const o6sword = w('o6', 'sword') - 4;
  const o6armor = w('o6', 'armor');
  const o6never = w('o6', 'never') - 4;
  const o7 = bs('o7');
  const o7and = w('o7', 'and');
  const o8 = bs('o8');
  const o8and = w('o8', 'and');
  const o9 = bs('o9');
  const o9says = w('o9', 'says');
  const o9mobe = w('o9', 'MOBE');
  const o9took = w('o9', 'took');
  const o9num = w('o9', 'one', 1);
  const o9and = w('o9', 'and');
  const o10 = bs('o10');
  const o10sold = w('o10', 'sold');
  const o10almost = w('o10', 'almost');
  const o10even = w('o10', 'even') - 4;
  const o11 = bs('o11');
  const o11refund = w('o11', 'refund');
  const o11door = w('o11', 'revolving') - 2;
  const o11three = w('o11', 'three');
  const o11zero = w('o11', 'zero');
  const o12 = bs('o12');
  const o12one = w('o12', 'one');
  const o12what = w('o12', 'What');
  const o12after = w('o12', 'after');
  const o13 = bs('o13');
  const o13another = w('o13', 'another');
  const o13hung = w('o13', 'hung');
  const o14 = bs('o14');
  const o14and = w('o14', 'and');
  const o15 = bs('o15');
  const o15and = w('o15', 'and');
  const o15linked = w('o15', 'linked');
  const o15tap = w('o15', 'tap');

  // ---- TOP: real photos (each id once) + the few drawn panels ----
  type It = {at: number; el: (at: number) => React.ReactNode};
  const tops: It[] = [
    {at: o1, el: () => <Photo f={f} at={-4} id="night_phone" pos="100% 50%" zoom={[1.12, 1.02]} />},
    {at: o1pay, el: (at) => <Photo f={f} at={at} id="card_hand" pos="42% 50%" />},
    {at: o2, el: (at) => (
      <Panel f={f} at={at} color={C.red}>
        <text x={W / 2} y={640} fontFamily={FONT} fontWeight={700} fontSize={900} fill="rgba(255,255,255,0.22)" textAnchor="middle" transform={`rotate(${8 * Math.sin(f / 9)} ${W / 2} 560)`}>?</text>
      </Panel>
    )},
    {at: o3, el: (at) => <Photo f={f} at={at} id="mansion" pos="45% 50%" />},
    {at: o4, el: (at) => (
      <Panel f={f} at={at} color={C.navy}>
        <G x={W / 2} y={560} s={1.9 + 0.04 * Math.sin(f / 5)} r={-3}><WebinarLaptop /></G>
      </Panel>
    )},
    {at: o4lambo, el: (at) => <Photo f={f} at={at} id="lambo" pos="50% 60%" />},
    {at: o4jet, el: (at) => <Photo f={f} at={at} id="jetski" pos="60% 50%" zoom={[1.06, 1.0]} />},
    {at: o5, el: (at) => <Photo f={f} at={at} id="stopwatch" pos="50% 35%" zoom={[1.2, 1.05]} />},
    {at: o6, el: (at) => (
      <Panel f={f} at={at} color="#3B2A6B">
        <G x={W / 2} y={250} s={1.25 * pop(f, at, 10)} r={-3}><CourseTier tier="GOLD" /></G>
        <G x={W / 2} y={540} s={1.7 * pop(f, at + 8, 10) * (1 + 0.04 * Math.sin(f / 4))} r={2}><CourseTier tier="PLATINUM" price="$9,997" /></G>
        <G x={W / 2} y={850} s={1.25 * pop(f, at + 16, 10)} r={-2}><CourseTier tier="DIAMOND" /></G>
      </Panel>
    )},
    {at: o6sword, el: (at) => <Photo f={f} at={at} id="armor" pos="50% 18%" zoom={[1.25, 1.05]} />},
    {at: o6never, el: (at) => <Photo f={f} at={at} id="castle" pos="42% 50%" />},
    {at: o7, el: (at) => <Photo f={f} at={at} id="rental_villa" pos="55% 60%" />},
    {at: o8, el: (at) => <Photo f={f} at={at} id="night_desk" pos="55% 60%" zoom={[1.06, 1.0]} />},
    {at: o9, el: (at) => <Photo f={f} at={at} id="ftc_hq" pos="40% 50%" />},
    {at: o9took, el: (at) => <Photo f={f} at={at} id="cash_hands" pos="50% 50%" zoom={[1.08, 1.0]} />},
    {at: o10, el: (at) => <Photo f={f} at={at} id="calculator" pos="50% 30%" zoom={[1.2, 1.05]} />},
    {at: o10sold, el: (at) => <Photo f={f} at={at} id="seats" pos="50% 50%" />},
    {at: o11, el: (at) => (
      <Panel f={f} at={at} color={C.yellow}>
        <G x={W / 2} y={540} s={1.7} r={-4}><Paper id="rf52" text={'100%\nRISK FREE'} reveal={1} w={520} h={330} size={84} /></G>
      </Panel>
    )},
    {at: o11door, el: (at) => <Photo f={f} at={at} id="revolving_door" pos="50% 55%" zoom={[1.2, 1.04]} />},
    {at: o12, el: (at) => <Photo f={f} at={at} id="handset" pos="30% 50%" zoom={[1.05, 1.0]} />},
    {at: o13, el: (at) => <Panel f={f} at={at} color="#2E6FD9" />},
    {at: o13another, el: (at) => <Photo f={f} at={at} id="hung_up" pos="50% 40%" zoom={[1.25, 1.06]} />},
    {at: o14, el: (at) => <Photo f={f} at={at} id="benjamin" pos="50% 50%" zoom={[1.3, 1.05]} />},
    {at: o15, el: (at) => <Panel f={f} at={at} color={C.red} />},
    {at: o15and, el: (at) => (
      <Panel f={f} at={at} color={C.navy}>
        <VideoCard f={f} at={at + 2} />
        <ToBeContinued x={W / 2} y={960} s={1.1 * pop(f, o15linked, 10, 220)} />
      </Panel>
    )},
  ];

  const midAt = o9and + 20;
  const mv = (at: number) => Math.round(ease(f, at - 4, at + 6, 540, 330));

  // ---- BOTTOM: the cast reacting to what is on top (pose changes every 1-2 s) ----
  const stage: It[] = [
    {at: o1, el: () => <Dave f={f} x={540} y={DY} s={1.5} sweat keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.4}, {at: o1dave, pose: 'point_up', expr: 'money', look: 0.3}, {at: o1pay, pose: 'hold', expr: 'worried'}, {at: o1nine, pose: 'shock', expr: 'shock'}, {at: o1seven + 10, pose: 'panic', expr: 'scream'}]} />},
    {at: o1man, el: () => (
      <>
        <Dave f={f} x={300} y={DY} s={1.42} keys={[{at: 0, pose: 'present', expr: 'happy', look: 1}]} />
        <Guru f={f} x={Math.round(ease(f, o1man, o1man + 8, 1300, 790))} y={DY} s={1.42} flip keys={[{at: 0, pose: 'wave', expr: 'smug', look: -1}]} />
      </>
    )},
    {at: o2, el: () => (
      <>
        <Dave f={f} x={300} y={DY} s={1.5} keys={[{at: 0, pose: 'point_up', expr: 'suspicious', look: 1, talk: true}, {at: o2hang, pose: 'hips', expr: 'smug', look: 1}]} />
        <Guru f={f} x={790} y={DY} s={1.42} flip sweat keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -1}, {at: o2hang, pose: 'shock', expr: 'shock', look: -1}]} />
      </>
    )},
    {at: o3, el: () => (
      <>
        <Guru f={f} x={320} y={DY} s={1.5} keys={[{at: 0, pose: 'point_up', expr: 'smug', look: 0.5}, {at: o3i, pose: 'celebrate', expr: 'grin', talk: true}, {at: o3i + 45, pose: 'present', expr: 'smug', talk: true}, {at: o3free - 12, pose: 'thumbs', expr: 'grin'}]} />
        <Dave f={f} x={800} y={DY} s={1.38} flip keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -1}, {at: o3i, pose: 'shock', expr: 'shock', look: -1}, {at: o3i + 50, pose: 'think', expr: 'money', look: -1}, {at: o3free - 8, pose: 'celebrate', expr: 'money'}]} />
      </>
    )},
    {at: o4, el: () => <Dave f={f} x={540} y={DY} s={1.5} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.3}, {at: o4lambo, pose: 'point_up', expr: 'money', look: 0.3}, {at: o4jet, pose: 'celebrate', expr: 'grin'}, {at: o4but, pose: 'shrug', expr: 'suspicious'}, {at: o4but + 28, pose: 'think', expr: 'tired'}]} />},
    {at: o5, el: () => <Dave f={f} x={mv(o5paid)} y={DY} s={1.5} sweat={f >= o5twenty} keys={[{at: 0, pose: 'point_up', expr: 'worried', look: 0.3}, {at: o5twenty, pose: 'shock', expr: 'shock'}, {at: o5one, pose: 'panic', expr: 'scream'}, {at: o5paid, pose: 'point_r', expr: 'scream', look: 1}, {at: o5paid + 30, pose: 'facepalm', expr: 'sad'}]} />},
    {at: o6, el: () => (
      <>
        <Guru f={f} x={300} y={DY} s={1.42} keys={[{at: 0, pose: 'point_up', expr: 'smug', look: 0.5, talk: true}, {at: o6real + 20, pose: 'hips', expr: 'grin'}, {at: o6sword, pose: 'present', expr: 'smug', talk: true}, {at: o6sword + 45, pose: 'point_up', expr: 'smug', talk: true}, {at: o6never, pose: 'shrug', expr: 'grin'}]} />
        <Dave f={f} x={790} y={DY} s={1.42} flip keys={[{at: 0, pose: 'shock', expr: 'shock', look: -1}, {at: o6real + 20, pose: 'facepalm', expr: 'sad'}, {at: o6sword, pose: 'hold', expr: 'worried', look: -1}, {at: o6sword + 45, pose: 'shrug', expr: 'tired'}, {at: o6never, pose: 'panic', expr: 'scream'}]} />
      </>
    )},
    {at: o7, el: () => <Dave f={f} x={540} y={DY} s={1.5} keys={[{at: 0, pose: 'typing', expr: 'suspicious', look: 0.3}, {at: o7 + 28, pose: 'think', expr: 'suspicious'}, {at: o7and, pose: 'shock', expr: 'shock'}, {at: o7and + 36, pose: 'facepalm', expr: 'sad'}]} />},
    {at: o8, el: () => <Dave f={f} x={540} y={DY} s={1.5} keys={[{at: 0, pose: 'typing', expr: 'suspicious', look: 0.3}, {at: o8 + 30, pose: 'think', expr: 'think'}, {at: o8and, pose: 'point_up', expr: 'shock'}, {at: o8and + 30, pose: 'hips', expr: 'angry'}]} />},
    {at: o9, el: () => <Dave f={f} x={mv(midAt)} y={DY} s={1.5} keys={[{at: 0, pose: 'point_up', expr: 'neutral', look: 0.3, talk: true}, {at: o9 + 40, pose: 'present', expr: 'suspicious', talk: true}, {at: o9took, pose: 'think', expr: 'worried'}, {at: o9num, pose: 'shock', expr: 'shock'}, {at: o9num + 40, pose: 'panic', expr: 'scream'}, {at: o9and, pose: 'facepalm', expr: 'tired'}, {at: o9and + 40, pose: 'shrug', expr: 'suspicious'}]} />},
    {at: o10, el: () => <Dave f={f} x={540} y={DY} s={1.5} keys={[{at: 0, pose: 'typing', expr: 'think', look: 0.3}, {at: o10sold, pose: 'point_up', expr: 'suspicious'}, {at: o10almost, pose: 'shock', expr: 'shock'}, {at: o10even, pose: 'shrug', expr: 'angry'}, {at: o10even + 36, pose: 'hips', expr: 'angry'}]} />},
    {at: o11, el: () => <Dave f={f} x={540} y={DY} s={1.5} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.4, talk: true}, {at: o11refund, pose: 'shock', expr: 'shock'}, {at: o11refund + 40, pose: 'shrug', expr: 'sad'}]} />},
    {at: o11door, el: () => <Dave f={f} x={Math.round(540 + 300 * Math.sin((f - o11door) / 9))} y={DY} s={1.42} walk flip={Math.cos((f - o11door) / 9) < 0} keys={[{at: 0, pose: 'idle', expr: 'tired'}, {at: o11three, expr: 'worried'}, {at: o11zero, expr: 'scream'}]} />},
    {at: o12, el: () => (
      <>
        <Dave f={f} x={300} y={DY} s={1.5} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 1}, {at: o12one, pose: 'point_up', expr: 'smug', look: 1, talk: true}, {at: o12what, pose: 'present', expr: 'suspicious', look: 1, talk: true}, {at: o12after, pose: 'hips', expr: 'smug', look: 1, talk: true}]} />
        <Coach f={f} x={Math.round(ease(f, o12, o12 + 8, 1300, 800))} y={DY} s={1.42} flip sweat={f >= o12what} keys={[{at: 0, pose: 'wave', expr: 'grin', look: -1}, {at: o12one, pose: 'thumbs', expr: 'smug', look: -1}, {at: o12what, pose: 'shock', expr: 'shock', look: -1}, {at: o12after, pose: 'panic', expr: 'worried', look: -1}]} />
      </>
    )},
    {at: o13, el: () => (
      <>
        <Dave f={f} x={300} y={DY} s={1.5} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 1}, {at: o13another, pose: 'shrug', expr: 'suspicious', look: 1}, {at: o13hung, pose: 'shock', expr: 'shock', look: 1}]} />
        <Coach f={f} x={Math.round(ease(f, o13another, o13hung + 6, 800, 1350))} y={DY} s={1.42} walk={f >= o13another} sweat keys={[{at: 0, pose: 'idle', expr: 'shock', look: -1}, {at: o13another - 6, pose: 'wave', expr: 'worried', look: 1}]} />
      </>
    )},
    {at: o14, el: () => <Dave f={f} x={mv(o14and + 10)} y={DY} s={1.5} keys={[{at: 0, pose: 'point_r', expr: 'smug', look: 0.5}, {at: o14 + 26, pose: 'hips', expr: 'grin'}, {at: o14and, pose: 'celebrate', expr: 'grin'}, {at: o14and + 50, pose: 'thumbs', expr: 'happy'}]} />},
    {at: o15, el: () => <Dave f={f} x={mv(o15and)} y={DY} s={1.5} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.3}, {at: o15 + 30, pose: 'shrug', expr: 'worried'}, {at: o15and, pose: 'hips', expr: 'angry'}, {at: o15and + 30, pose: 'point_up', expr: 'grin', talk: true}, {at: o15linked, pose: 'present', expr: 'happy', talk: true}, {at: o15tap, pose: 'celebrate', expr: 'grin'}]} />},
  ];

  const top = pick(tops);
  const st = pick(stage);
  const stageTint = ['#FBF6EC', '#FFF1D6', '#E8F6EE', '#FDE8EC', '#E6F0FF'][tops.filter((x) => x.at <= f).length % 5];
  const cutShake = top ? shake(f, top.at, 7, 6) : {x: 0, y: 0};

  // ---- memes: [at, out, format] ----
  const memes: [number, number, (m: {f: number; w: number; h: number}) => React.ReactNode, number?][] = [
    [o1seven - 4, o2, (m) => <M2am {...m} />],
    [o2 + 9, o2hang, (m) => <MDanger {...m} />, 2],
    [o3i, o4, (m) => <MTrustBro {...m} />, 2],
    [o4but - 2, o5, (m) => <MPigeon {...m} />],
    [o5so - 4, o5paid, (m) => <MPanik {...m} />, 2],
    [o5paid, o6, (m) => <MTakeMoney {...m} />],
    [o6real + 14, o6sword, (m) => <MFine {...m} />, 2],
    [o6armor - 6, o6never, (m) => <MTrade {...m} />],
    [o7and + 6, o8, (m) => <MAlways {...m} />],
    [o8and, o9, (m) => <MPointing {...m} />, 2],
    [o9says, o9mobe - 2, (m) => <MSweat {...m} />, 2],
    [o9and, o10, (m) => <MStonks {...m} />],
    [o10 + 22, o10almost, (m) => <MMath {...m} />],
    [o10even, o11, (m) => <MDrake {...m} />, 2],
    [o11refund + 4, o11door, (m) => <MSurprised {...m} />],
    [o11door + 20, o11zero, (m) => <MWaiting {...m} />],
    [o12one, o12what, (m) => <MReverse {...m} />, 2],
    [o12after, o13, (m) => <MButtons {...m} />, 2],
    [o13 + 2, o13another, (m) => <MError {...m} />],
    [o14and, o15, (m) => <MSuccess {...m} />, 2],
  ];

  const showMid = f >= midAt && f < midAt + 70;
  const arrowY = 12 * Math.sin(f / 3);

  return (
    <AbsoluteFill style={{background: C.ink}}>
      <AbsoluteFill style={{transform: `translate(${cutShake.x}px,${cutShake.y}px)`}}>
        {/* stage */}
        <div style={{position: 'absolute', left: 0, top: TOP, width: W, height: H - TOP, background: stageTint}}>
          <svg width={W} height={H - TOP} style={{position: 'absolute', inset: 0}}>
            {Array.from({length: 9}).map((_, i) => <circle key={i} cx={(i * 263 + f * 2) % (W + 200) - 100} cy={150 + ((i * 97) % 420)} r={46 + (i % 3) * 22} fill="rgba(35,35,43,0.035)" />)}
            <rect y={H - TOP - 150} width={W} height={150} fill="rgba(35,35,43,0.07)" />
          </svg>
        </div>
        {top ? top.el(top.at) : null}
        <div style={{position: 'absolute', left: 0, top: TOP - 6, width: W, height: 12, background: C.ink}} />

        {/* kinetic type on the photos */}
        <Slam f={f} at={-3} out={o1pay} text="2:00 AM" x={W / 2} y={900} size={190} color={C.yellow} rot={-4} />
        <Pov f={f} at={-1} out={o1pay} text="POV: you found a webinar" />
        <Slam f={f} at={o1nine} out={o1seven - 4} text="$9,997" x={W / 2} y={300} size={230} color="#fff" bg={C.red} rot={-5} />
        <Slam f={f} at={o1pay + 6} out={o1nine} text="ONE TAP AWAY" x={W / 2} y={900} size={120} color={C.yellow} rot={3} />
        <Slam f={f} at={o2 + 2} out={o2hang} text="ONE QUESTION" x={W / 2} y={1010} size={120} color="#fff" rot={-2} />
        <Slam f={f} at={o2hang} out={o3} text="*CLICK*" x={W / 2} y={520} size={210} color={C.yellow} rot={5} />
        <Slam f={f} at={o3 + 2} out={o3i} text="3 WEEKS EARLIER" x={W / 2} y={220} size={104} color="#fff" bg={C.navy} rot={-3} />
        <Slam f={f} at={o4 + 4} out={o4lambo} text="FREE TRAINING" x={W / 2} y={200} size={120} color={C.yellow} rot={-3} />
        <Slam f={f} at={o4lambo + 4} out={o4jet} text="THE LAMBO" x={W / 2} y={880} size={140} color={C.yellow} rot={-4} />
        <Slam f={f} at={o4jet + 4} out={o4but - 2} text="THE JET SKI" x={W / 2} y={220} size={140} color="#fff" rot={4} />
        <Slam f={f} at={o5 + 4} out={o5twenty} text="TIMER!" x={W / 2} y={880} size={200} color={C.red} rot={-5} />
        <Slam f={f} at={o5twenty} out={o5one} text="20 SPOTS" x={W / 2} y={880} size={180} color="#fff" bg={C.navy} rot={-3} />
        <Slam f={f} at={o5one} out={o5so - 4} text="1 SPOT LEFT" x={W / 2} y={880} size={160} color="#fff" bg={C.red} rot={4} />
        <Slam f={f} at={o6 + 26} out={o6real + 14} text="THE REAL SYSTEM?" x={W / 2} y={985} size={88} color={C.yellow} rot={-2} />
        <Slam f={f} at={o6sword + 4} out={o6armor - 6} text="SWORD: $$$" x={W / 2} y={900} size={150} color={C.yellow} rot={-4} />
        <Slam f={f} at={o6armor} out={o6never} text="ARMOR: $$$" x={W / 2} y={1010} size={110} color="#fff" bg={C.red} rot={2} />
        <Slam f={f} at={o6never + 6} out={o7} text="NEVER." x={W / 2} y={860} size={230} color={C.red} rot={-5} />
        <Slam f={f} at={o7 + 4} out={o7and} text="IMAGE SEARCH..." x={W / 2} y={220} size={104} color="#fff" bg={C.navy} rot={-3} />
        <Slam f={f} at={o7and} out={o7and + 6} text="RENTAL!" x={W / 2} y={880} size={220} color={C.red} rot={-5} />
        <Slam f={f} at={o8 + 4} out={o8and} text="HIS REAL BUSINESS?" x={W / 2} y={220} size={98} color="#fff" bg={C.navy} rot={-3} />
        <Slam f={f} at={o9 + 4} out={o9took} text="THE FTC" x={W / 2} y={1000} size={120} color="#fff" bg={C.navy} rot={-2} />
        <Slam f={f} at={o9mobe - 2} out={o9took} text={'"MOBE"'} x={W / 2} y={900} size={170} color={C.yellow} rot={4} />
        <Slam f={f} at={o9num} out={o9and} text="$125,000,000" x={W / 2} y={540} size={148} color="#fff" bg={C.red} rot={-5} />
        <Slam f={f} at={o10 + 4} out={o10sold} text="DO THE MATH" x={W / 2} y={1010} size={120} color={C.yellow} rot={-2} />
        <Slam f={f} at={o10sold + 4} out={o10almost} text="x 1,000 PEOPLE" x={W / 2} y={1010} size={104} color="#fff" bg={C.navy} rot={2} />
        <Slam f={f} at={o10almost} out={o10even} text="$1,997,000" x={W / 2} y={560} size={170} color="#fff" bg={C.red} rot={-5} />
        <Slam f={f} at={o11door + 4} out={o11three} text="REFUND?" x={W / 2} y={120} size={150} color={C.yellow} rot={-3} />
        <Slam f={f} at={o11three} out={o11zero} text="3 REPLIES" x={W / 2} y={1005} size={120} color="#fff" bg={C.navy} rot={2} />
        <Slam f={f} at={o11zero} out={o12} text="$0 BACK" x={W / 2} y={560} size={230} color="#fff" bg={C.red} rot={-5} />
        <Slam f={f} at={o12 + 4} out={o12one} text="RING RING" x={W / 2} y={230} size={160} color={C.yellow} rot={-4} />
        <Slam f={f} at={o12one} out={o12what} text="ONE QUESTION" x={W / 2} y={1010} size={110} color="#fff" bg={C.red} rot={2} />
        {f >= o12what && f < o12after ? (
          <div style={{position: 'absolute', left: 60, top: 250, width: 960, transform: `rotate(-2deg) scale(${pop(f, o12what, 10, 240)})`, background: '#fff', border: `8px solid ${C.ink}`, borderRadius: 44, padding: '34px 30px', boxSizing: 'border-box', boxShadow: '12px 16px 0 rgba(35,35,43,0.3)', fontFamily: FONT, fontWeight: 700, fontSize: 84, lineHeight: 1.08, textAlign: 'center', color: C.ink}}>
            What did your <span style={{color: C.red}}>typical student</span> earn?
          </div>
        ) : null}
        <Slam f={f} at={o13hung} out={o14} text="CLICK." x={W / 2} y={540} size={250} color="#fff" bg={C.ink} rot={-5} />
        <Slam f={f} at={o14 + 4} out={o14and} text="TAB CLOSED" x={W / 2} y={880} size={150} color="#fff" bg={C.green} rot={-4} />
        <Slam f={f} at={o15 + 3} out={o15and} text="-$1,997" x={W / 2} y={430} size={250} color="#fff" rot={-5} />
        <Slam f={f} at={o15 + 16} out={o15and} text="STILL GONE" x={W / 2} y={720} size={160} color={C.yellow} rot={3} />

        {/* memes */}
        {memes.map(([at, out, fmt, alt], i) => <Meme key={i} f={f} at={at} out={out} rot={alt ? 2 : -2}>{fmt}</Meme>)}

        {/* cast */}
        <Svg>
          {st ? st.el(st.at) : null}
          {/* stage-side numbers while Dave is alone */}
          {f >= o5paid && f < o6 ? <G x={790} y={1480} s={pop(f, o5paid, 9, 240)} r={6}><rect x={-230} y={-80} width={460} height={160} rx={24} fill={C.red} stroke={C.ink} strokeWidth={8} /><Text y={6} size={104} color="#fff">-$1,997</Text></G> : null}
          {f >= o14and + 10 && f < o15 ? <G x={780} y={1500} s={pop(f, o14and + 10, 9, 240)} r={-6}><rect x={-230} y={-80} width={460} height={160} rx={24} fill={C.green} stroke={C.ink} strokeWidth={8} /><Text y={6} size={96} color="#fff">+$9,997</Text></G> : null}
          {showMid ? (
            <>
              <G x={760} y={1470} s={0.62 * pop(f, midAt, 10, 220)}><SubButton done={f >= midAt + 40 ? 1 : 0} /></G>
              <G x={960} y={1380} s={0.6 * pop(f, midAt + 5, 10, 220)}><Bell f={f} ring={1} /></G>
            </>
          ) : null}
          {f >= o15and ? (
            <>
              {[0, 1, 2].map((i) => <G key={i} x={690 + i * 120} y={1500 + arrowY * (i % 2 ? -1 : 1)} s={pop(f, o15and + 10 + i * 4, 9, 240)}><path d="M -34 -90 L 34 -90 L 34 10 L 80 10 L 0 110 L -80 10 L -34 10 Z" fill={C.red} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" /></G>)}
              <G x={790} y={1700} s={0.6 * pop(f, o15tap, 10, 220)}><SubButton done={0} /></G>
            </>
          ) : null}
        </Svg>
        {f >= o15and ? <Slam f={f} at={o15and + 6} text="FULL VIDEO" x={770} y={1330} size={84} color="#fff" bg={C.red} rot={-3} /> : null}

        <Captions f={f} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 0, top: 0, height: 12, width: `${(f / d) * 100}%`, background: C.yellow}} />

      {/* sound: one hit on every cut, slam and meme */}
      <Sfx at={0} file="stamp" vol={0.9} />
      {tops.slice(1).map((x, i) => <Sfx key={`t${i}`} at={x.at} file={i % 2 ? 'whoosh' : 'whoosh_s'} vol={0.45} />)}
      {memes.map(([at], i) => <Sfx key={`m${i}`} at={at} file={['pop', 'boing', 'pop2'][i % 3]} vol={0.85} />)}
      <Sfx at={o1nine} file="stamp" />
      <Sfx at={o2hang} file="click" />
      <Sfx at={o3free} file="ding" vol={0.7} />
      <Sfx at={o5 + 4} file="tick" vol={0.9} />
      <Sfx at={o5one} file="buzz" vol={0.7} />
      <Sfx at={o5paid} file="cash" />
      <Sfx at={o6never + 6} file="thud" vol={0.9} />
      <Sfx at={o7and} file="sting" vol={0.7} />
      <Sfx at={o9num} file="stamp" />
      <Sfx at={o9num + 4} file="cash" vol={0.8} />
      <Sfx at={midAt} file="ding" vol={0.6} />
      <Sfx at={o10almost} file="stamp" />
      <Sfx at={o11refund + 30} file="trombone" vol={0.7} />
      <Sfx at={o11zero} file="thud" />
      <Sfx at={o12 + 4} file="key" vol={0.7} />
      <Sfx at={o12what} file="ding" vol={0.8} />
      <Sfx at={o13 + 2} file="buzz" vol={0.7} />
      <Sfx at={o13hung} file="click" />
      <Sfx at={o13hung + 2} file="stamp" vol={0.8} />
      <Sfx at={o14and} file="chime" />
      <Sfx at={o15 + 3} file="thud" />
      <Sfx at={o15linked} file="sting" vol={0.6} />
      <Sfx at={o15tap} file="ding" />
      <Audio src={staticFile('short52/voice.wav')} />
      <Audio src={staticFile('music/bgm.mp3')} volume={(x: number) => interpolate(x, [0, 8, d - 30, d], [0.1, 0.1, 0.1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} loop />
    </AbsoluteFill>
  );
};

export type Short52Props = {timings: Timings | null};
export const Short52: React.FC<Short52Props> = ({timings}) => (timings ? <TimingProvider t={timings}><Body /></TimingProvider> : null);
