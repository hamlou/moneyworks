import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, SourceTag, Stamp, Text, XMark} from '../props';
import {Bell, Frame, Icon, Row, SubButton} from '../props2';
import {Raccoon} from '../props3';
import {Brain} from '../props17';
import {AppIcon, Confetti, DatingPhone, DateTable, PaywallLock, SlotMachine, SwipeCard, UmbrellaOwner, XHeartBtns} from '../props42';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';

const Box: React.FC<{x: number; y: number; w: number; h: number; o?: number; s?: number; fill?: string; children?: React.ReactNode}> = ({x, y, w, h, o = 1, s = 1, fill = '#fff', children}) => (
  <G2 x={x} y={y} o={o} s={s}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </G2>
);

export const Ep42: React.FC = () => {
  const f = useCurrentFrame();
  const {bs, w, t} = useT();
  const A = (id: string) => Math.max(0, bs(id) - 6);
  const cues: Cue[] = [];
  const q = (at: number, src: string, v = 0.7) => cues.push({at, src, v});
  const S: SceneItem[] = [];
  const scene = (at: number, el: () => React.ReactNode, whoosh = true) => {
    S.push({at, el});
    if (whoosh && at > 0) q(at, 'whoosh_s', 0.3);
  };
  for (const c of t.chapters ?? []) {
    const s = Math.round(c.start * 30);
    q(s, 'whoosh', 0.5);
    q(s + 10, 'chime', 0.45);
    q(s + CHAPTER_FRAMES - 10, 'whoosh_s', 0.35);
  }
  const bump = (at: number, k = 0.14) => (f < at ? 1 : 1 + k * Math.sin(Math.PI * Math.min(1, (f - at) / 12)));
  const lt = (at: number, lo = 0.35) => (f >= at ? 1 : lo);
  const P = (at: number) => pop(f, at + 2);

  // ============ COLD OPEN ============
  {
    const fd = w('o1', 'forty');
    const bk = w('o1', 'banking');
    const gn = w('o1', 'gone');
    q(2, 'pop', 0.6);
    q(bk, 'click', 0.5);
    q(fd, 'cash', 0.8);
    q(gn, 'buzz', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={400} y={900} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}, {at: fd, pose: 'facepalm', expr: 'tired', look: 0.8}]} />
          <G2 x={900} y={520} s={1.2 * P(0) * bump(bk, 0.1)}>
            <rect x={-190} y={-260} width={380} height={520} rx={40} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
            <rect x={-162} y={-228} width={324} height={456} rx={16} fill="#F7FAFD" />
            <rect x={-162} y={-228} width={324} height={64} rx={16} fill={C.navy} />
            <Text y={-196} size={24} color="#fff" ls={2}>DAVE'S BANK APP</Text>
            <Text y={-130} size={26} color={GRAY}>DATING APP — MONTHLY</Text>
            <G2 y={-20} s={bump(fd, 0.2)}><Text size={f >= fd ? 84 : 90} color={f >= fd ? C.red : C.ink}>{f >= fd ? '-$40.00' : '-$??'}</Text></G2>
            <Text y={90} size={26} color={f >= gn ? C.red : GRAY}>{f >= gn ? 'gone again' : 'charged'}</Text>
          </G2>
          <G2 x={1480} y={520} s={1.1 * P(0)}><Icon kind="heart" /></G2>
          <G2 x={1480} y={720} o={lt(gn, 0.4)}><Text size={36} color={GRAY}>same subscription, every month</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const zm = w('o2', 'zero');
    const sm = w('o2', 'same');
    q(zm, 'buzz', 0.6);
    q(sm, 'trombone', 0.4);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DatingPhone x={620} y={560} s={1.05 * P(A('o2'))}>
            <G2 y={-30}><SwipeCard s={0.8} name="0 NEW MATCHES" sub="" /></G2>
            <G2 y={220} s={0.75}><XHeartBtns hit={f >= zm ? 'x' : null} /></G2>
          </DatingPhone>
          <Box x={1420} y={480} w={640} h={280} s={P(A('o2')) * bump(sm, 0.08)} o={lt(zm, 0.45)} fill={f >= zm ? C.yellow : '#fff'}>
            <Text y={-50} size={34} color={GRAY}>this month</Text>
            <Text y={40} size={70} color={C.red}>{f >= zm ? 'ZERO' : '?'}</Text>
          </Box>
          <G2 x={1420} y={720} o={lt(sm, 0.4)}><Text size={36} color={GRAY}>same as last month. same as the month before.</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('o3', 'twist');
    const dsg = w('o3', 'designed');
    const gl = w('o4', 'goal', 1);
    const lg = w('o5', 'longer');
    const mk = w('o5', 'makes');
    q(tw, 'boing', 0.4);
    q(dsg, 'stamp', 0.7);
    q(gl, 'ding', 0.5);
    q(lg, 'whoosh_s', 0.4);
    q(mk, 'cash', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={140} s={P(A('o3')) * bump(dsg, 0.12)} text={f >= dsg ? 'WORKING AS DESIGNED' : 'IS THE APP BROKEN?'} size={54} color={f >= dsg ? C.red : GRAY} r={-3} />
          <G2 x={620} y={560} s={1.2 * P(A('o3')) * bump(gl, 0.1)}><Icon kind="heart" /><XMark s={0.35} /></G2>
          <G2 x={620} y={820} o={lt(gl, 0.4)}><Text size={36} color={C.red}>a match isn't the goal</Text></G2>
          <Dave f={f} x={1200} y={900} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'tired', look: -0.8}]} />
          <Box x={1500} y={480} w={620} h={260} s={P(A('o3')) * bump(mk, 0.08)} o={lt(lg, 0.45)} fill={f >= mk ? C.yellow : '#fff'}>
            <Text y={-30} size={32} color={GRAY}>single + subscribed, longer</Text>
            <Text y={50} size={46} color={C.red}>{f >= mk ? '= more money for the app' : '?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'money'), w('o6', 'algorithm'), w('o6', 'broke')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['HOW THEY MAKE MONEY', 'THE ALGORITHM MYTH', 'DATE WITHOUT BROKE'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <G2 s={0.9}><Icon kind="heart" /></G2>}
                {i === 1 && <Brain glow={f >= pv[1] ? 0.6 : 0} />}
                {i === 2 && <Icon kind="check" s={0.8} />}
                <Text y={210} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 dating economy size ============
  {
    const fr = w('c1a', 'free');
    const mg = w('c1b', 'match');
    const bh = w('c1b', 'billion');
    q(fr, 'whoosh_s', 0.4);
    q(mg, 'paper', 0.5);
    q(bh, 'cash', 0.8);
    const bm = w('c1c', 'bumble');
    const dp = w('c1c', 'drop');
    q(bm, 'pop', 0.5);
    q(dp, 'buzz', 0.6);
    const ind = w('c1d', 'industry');
    const six = w('c1d', 'six');
    q(ind, 'stamp', 0.5);
    q(six, 'cash', 0.8);
    const tn = w('c1e', 'tinder');
    const fw = w('c1e', 'fewer');
    q(tn, 'pop', 0.5);
    q(fw, 'clank', 0.6);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={620} y={110} s={P(A('c1a')) * bump(fr)}><Text size={46}>{f >= mg ? 'Match Group: Tinder, Hinge, Match.com' : "Dave thinks it's a free app"}</Text></G2>
            <Box x={620} y={520} w={600} h={300} s={P(A('c1a')) * bump(bh, 0.08)}>
              <Text y={-70} size={30} color={GRAY}>Match Group revenue, 2025</Text>
              <Text y={30} size={78} color={C.red}>{f >= bh ? '$3.5 BILLION' : '?'}</Text>
            </Box>
            <Box x={1450} y={560} w={680} h={340} s={P(A('c1a')) * bump(dp, 0.06)} o={lt(bm, 0.45)}>
              <Text y={-90} size={30} color={GRAY}>Bumble revenue, 2025</Text>
              <Text y={0} size={68} color={C.red}>{f >= bm ? '$782 MILLION' : '?'}</Text>
              <Text y={90} size={32} color={f >= dp ? C.red : GRAY}>{f >= dp ? 'a DROP from the year before' : ''}</Text>
            </Box>
            <SourceTag f={f} at={mg} text="Match Group FY2025 results; Business of Apps 'Match/Bumble Statistics' (2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1d')) * bump(ind)}><Text size={46}>the whole dating-app industry</Text></G2>
            <Box x={620} y={520} w={620} h={280} s={P(A('c1d')) * bump(six, 0.08)} fill={f >= six ? C.yellow : '#fff'}>
              <Text y={-50} size={30} color={GRAY}>industry revenue, 2025</Text>
              <Text y={40} size={76} color={C.red}>{f >= six ? '$6 BILLION+' : '?'}</Text>
            </Box>
            <Box x={1450} y={520} w={700} h={320} s={P(A('c1d')) * bump(fw, 0.06)} o={lt(tn, 0.45)}>
              <Text y={-90} size={30} color={GRAY}>Tinder alone, 2025</Text>
              <Text y={0} size={68} color={C.red}>{f >= tn ? '$1.9 BILLION' : '?'}</Text>
              <Text y={90} size={30} color={f >= fw ? C.red : GRAY}>{f >= fw ? 'fewer payers, more per payer' : ''}</Text>
            </Box>
            <SourceTag f={f} at={six} text="Business of Apps 'Dating App Market' & 'Tinder Statistics' (2026)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 one company ============
  {
    const fr2 = w('c2a', 'frustrated');
    const tw = w('c2b', 'twist');
    const sm = w('c2b', 'same');
    q(fr2, 'buzz', 0.5);
    q(tw, 'boing', 0.5);
    q(sm, 'stamp', 0.7);
    const sw = w('c2c', 'switches');
    q(sw, 'pop', 0.5);
    const aisle = w('c2d', 'aisle');
    q(aisle, 'ding', 0.5);
    const apps = ['Tinder', 'Hinge', 'Match', 'OkCupid', 'Plenty of Fish'];
    const cols = [C.red, C.blue, C.navy, C.green, '#9B5DE5'];
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100} s={P(A('c2a'))}><Text size={46}>{f >= sm ? 'all owned by the SAME company' : 'Dave tries a different app...'}</Text></G2>
          <UmbrellaOwner x={960} y={380} s={1.1 * P(A('c2a')) * bump(sm, 0.08)} />
          {apps.map((nm, i) => (
            <G2 key={nm} x={480 + i * 250} y={780} s={P(A('c2a')) * bump(sw + i * 2, 0.1)} o={f >= sw ? 1 : 0.5}>
              <AppIcon name={nm} color={cols[i]} />
            </G2>
          ))}
          <Dave f={f} x={960} y={1010} s={0.6} keys={[{at: 0, pose: 'shrug', expr: 'worried'}, {at: sw, pose: 'facepalm', expr: 'tired'}]} />
          <G2 x={1560} y={620} o={lt(aisle, 0.4)}><Text size={32} color={C.red}>different aisle, same store</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 matches not the goal ============
  {
    const sts = w('c3a', 'stings');
    const lst = w('c3a', 'lost');
    q(sts, 'buzz', 0.5);
    q(lst, 'trombone', 0.5);
    const c2 = w('c3b', 'cancels');
    const nt = w('c3b', 'nothing');
    q(c2, 'pop', 0.5);
    q(nt, 'boing', 0.5);
    const fm = w('c3c', 'far');
    q(fm, 'cash', 0.7);
    const rw = w('c3d', 'rewards');
    q(rw, 'stamp', 0.6);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={100} s={P(A('c3a')) * bump(sts)}><Text size={44}>a happy couple who deletes the app...</Text></G2>
          <Dave f={f} x={560} y={900} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: c2, pose: 'wave', expr: 'happy', look: 0.8}]} />
          <Box x={560} y={520} w={560} h={260} s={P(A('c3a')) * bump(c2, 0.08)}>
            <Text y={-50} size={30} color={GRAY}>meets someone, cancels day 2</Text>
            <Text y={40} size={64} color={f >= nt ? C.red : GRAY}>{f >= nt ? 'almost $0' : '?'}</Text>
          </Box>
          <Dave f={f} x={1420} y={900} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'tired', look: -0.8}]} />
          <Box x={1420} y={520} w={620} h={300} s={P(A('c3a')) * bump(fm, 0.08)} o={lt(fm, 0.45)} fill={f >= fm ? C.yellow : '#fff'}>
            <Text y={-70} size={30} color={GRAY}>stays single, keeps paying</Text>
            <Text y={30} size={62} color={C.red}>{f >= fm ? 'far more, every month' : '?'}</Text>
          </Box>
          <G2 x={960} y={980} o={lt(rw, 0.4)}><Text size={34} color={GRAY}>the business math rewards you staying a customer</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 myth-bust algorithm ============
  {
    const np = w('c4a', 'nope');
    q(np, 'buzz', 0.7);
    const ins = w('c4b', 'instantly');
    q(ins, 'boing', 0.5);
    const ftc = w('c4c', 'f');
    const fl = w('c4c', 'flagged');
    q(ftc, 'paper', 0.5);
    q(fl, 'stamp', 0.6);
    const m14 = w('c4d', 'fourteen');
    q(m14, 'cash', 0.8);
    const ns = w('c4e', 'notification');
    const ps = w('c4e', 'promise');
    q(ns, 'ding', 0.5);
    q(ps, 'whoosh_s', 0.4);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <DreamFrame label="WHAT MOST PEOPLE THINK" />
            <Dave f={f} x={600} y={880} s={1.15} keys={[{at: 0, pose: 'hips', expr: 'happy', look: 0.8}, {at: np, pose: 'shock', expr: 'shock'}]} />
            <G2 x={1150} y={440} s={P(A('c4a'))}><Bubble text={'"the algorithm wants\nme to find my match"'} size={44} tail="left" /></G2>
            <Stamp x={1150} y={760} s={pop(f, np)} text="NOPE" size={110} r={-8} />
            <G2 x={1150} y={930} o={lt(ins, 0.4)}><Text size={40} color={C.red}>it's built to keep you swiping</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={620} y={480} w={780} h={340} s={P(A('c4c')) * bump(fl, 0.06)}>
              <Text y={-100} size={28} color={GRAY}>2019: the F T C sued Match Group</Text>
              <Text y={-10} size={36} color={f >= fl ? C.red : C.ink}>{f >= fl ? 'flagged, likely-fraud accounts' : 'claim: fake "likes you" emails'}</Text>
              <Text y={60} size={32} color={GRAY}>pushed non-subscribers to pay</Text>
            </Box>
            <Box x={1450} y={520} w={680} h={300} s={P(A('c4c')) * bump(m14, 0.08)} o={lt(m14, 0.45)} fill={f >= m14 ? C.yellow : '#fff'}>
              <Text y={-70} size={30} color={GRAY}>2025 settlement</Text>
              <Text y={30} size={70} color={C.red}>{f >= m14 ? '$14 MILLION' : '?'}</Text>
              <Text y={110} size={26} color={GRAY}>no wrongdoing admitted</Text>
            </Box>
            <G2 x={960} y={960} o={lt(ps, 0.4)}><Text size={34} color={f >= ns ? C.red : GRAY}>{f >= ns ? 'a business tool, not a promise' : ''}</Text></G2>
            <SourceTag f={f} at={ftc} text="FTC v. Match Group (2019); FTC press release, Aug 2025 ($14M settlement)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 paywall buffet ============
  {
    const fd = w('c5a', 'forty');
    q(fd, 'cash', 0.7);
    const lk = w('c5b', 'liked');
    const un = w('c5b', 'unlimited');
    q(lk, 'ding', 0.5);
    q(un, 'pop', 0.5);
    const nn = w('c5c', 'none');
    q(nn, 'buzz', 0.5);
    const rc = w('c5d', 'raccoon');
    const tl = w('c5d', 'toll');
    q(rc, 'boing', 0.6);
    q(tl, 'stamp', 0.5);
    const sv = w('c5e', 'seven');
    const nt3 = w('c5e', 'ninety');
    q(sv, 'cash', 0.8);
    q(nt3, 'stamp', 0.6);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c5a')) * bump(fd)}><Text size={46}>what does $40/month actually buy?</Text></G2>
            {[
              ['Seeing who liked you', lk],
              ['Unlimited swipes', un],
              ["Undo a swipe ('rewind')", un],
              ['Boosted visibility', un],
            ].map(([label, at], i) => (
              <G2 key={label as string} x={480 + (i % 2) * 980} y={420 + Math.floor(i / 2) * 300} s={P(A('c5a')) * bump(at as number, 0.08)}>
                <PaywallLock label={label as string} locked={f < nn} />
              </G2>
            ))}
            <G2 x={960} y={1010} o={lt(nn, 0.4)}><Text size={34} color={C.red}>none of it finds a better person</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={110} s={P(A('c5d')) * bump(rc)}><Text size={44}>just like our credit card raccoon</Text></G2>
            <Raccoon f={f} x={620} y={560} s={1.1 * P(A('c5d')) * bump(tl, 0.1)} mood="greedy" holdCoin />
            <G2 x={620} y={880} o={lt(tl, 0.4)}><Text size={34} color={GRAY}>build the toll booth, then charge to skip it</Text></G2>
            <Box x={1450} y={480} w={680} h={340} s={P(A('c5d')) * bump(sv, 0.06)}>
              <Text y={-90} size={30} color={GRAY}>dating-app users who pay, worldwide</Text>
              <Text y={0} size={80} color={C.red}>{f >= sv ? '~7%' : '?'}</Text>
              <Text y={100} size={30} color={f >= nt3 ? C.red : GRAY}>{f >= nt3 ? 'the other 93% ARE the product' : ''}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 slot machine swiping ============
  {
    const sw = w('c6a', 'slot');
    q(sw, 'pop', 0.5);
    const rn = w('c6b', 'random');
    const mt = w('c6b', 'match');
    q(rn, 'buzz', 0.5);
    q(mt, 'ding', 0.6);
    const vr = w('c6c', 'variable');
    q(vr, 'stamp', 0.6);
    const tw2 = w('c6d', 'twenty');
    q(tw2, 'clank', 0.5);
    const spin = Math.floor(f / 6);
    const win = mt <= f && f < mt + 30;
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={110} s={P(A('c6a')) * bump(sw)}><Text size={46}>swiping feels like a slot machine</Text></G2>
          <SlotMachine x={620} y={560} s={1.2 * P(A('c6a')) * bump(rn, 0.08)} spin={spin} win={win} />
          {win && <Confetti x={620} y={480} t={ease(f, mt, mt + 40)} />}
          <Box x={1500} y={480} w={640} h={300} s={P(A('c6a')) * bump(vr, 0.08)} o={lt(vr, 0.45)} fill={f >= vr ? C.yellow : '#fff'}>
            <Text y={-70} size={30} color={GRAY}>psychologists call it a</Text>
            <Text y={20} size={50} color={C.red}>{f >= vr ? 'VARIABLE REWARD' : '?'}</Text>
            <Text y={100} size={28} color={GRAY}>same as slot machines & social feeds</Text>
          </Box>
          <G2 x={1500} y={840} o={lt(tw2, 0.35)}><Text size={34} color={GRAY}>opened once, twice, 20 times a day</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 dates expensive ============
  {
    const app = w('c7a', 'app');
    q(app, 'whoosh_s', 0.4);
    const amt = w('c7b', 'one');
    const gas = w('c7b', 'gas');
    q(gas, 'pop', 0.4);
    q(amt, 'cash', 0.8);
    const pc = w('c7c', 'twelve');
    q(pc, 'stamp', 0.7);
    const yr = w('c7d', 'two');
    q(yr, 'cash', 0.8);
    const hlf = w('c7e', 'half');
    const fwr = w('c7e', 'fewer');
    q(hlf, 'buzz', 0.5);
    q(fwr, 'boing', 0.5);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={620} y={110} s={P(A('c7a')) * bump(app)}><Text size={46}>the date itself costs more too</Text></G2>
            <DateTable x={620} y={620} s={1.3 * P(A('c7a')) * bump(gas, 0.06)} />
            <Box x={1500} y={480} w={660} h={300} s={P(A('c7a')) * bump(amt, 0.08)} o={lt(gas, 0.45)} fill={f >= amt ? C.yellow : '#fff'}>
              <Text y={-70} size={30} color={GRAY}>average "all-in" date night</Text>
              <Text y={30} size={78} color={C.red}>{f >= amt ? '$189' : '?'}</Text>
            </Box>
            <G2 x={1500} y={800} o={lt(pc, 0.4)}><Text size={34} color={f >= pc ? C.red : GRAY}>{f >= pc ? '+12.5% in a single year' : ''}</Text></G2>
            <SourceTag f={f} at={amt} text="BMO Real Financial Progress Index / Ipsos survey (Feb 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={110} s={P(A('c7d')) * bump(yr)}><Text size={46}>added up over a year</Text></G2>
            <Box x={620} y={520} w={640} h={300} s={P(A('c7d')) * bump(yr, 0.08)} fill={f >= yr ? C.yellow : '#fff'}>
              <Text y={-40} size={30} color={GRAY}>per adult, per year</Text>
              <Text y={40} size={70} color={C.red}>{f >= yr ? '$2,323' : '?'}</Text>
            </Box>
            <Dave f={f} x={1420} y={900} s={1.1} keys={[{at: 0, pose: 'pockets', expr: 'worried', look: -0.8}]} />
            <Box x={1420} y={480} w={660} h={280} s={P(A('c7d')) * bump(fwr, 0.06)} o={lt(hlf, 0.45)}>
              <Text y={-60} size={30} color={GRAY}>~47% of singles say</Text>
              <Text y={30} size={38} color={C.red}>{f >= fwr ? 'not worth it financially' : "dating isn't worth it?"}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 generation spend ============
  {
    const cst = w('c8a', 'cost');
    q(cst, 'ding', 0.5);
    const th = w('c8b', 'three');
    q(th, 'cash', 0.8);
    const gz = w('c8c', 'gen');
    const p53 = w('c8c', 'fifty');
    q(gz, 'pop', 0.5);
    q(p53, 'stamp', 0.7);
    const nc = w('c8d', 'noticed');
    q(nc, 'whoosh_s', 0.4);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100} s={P(A('c8a')) * bump(cst)}><Text size={46}>how much does dating cost, all in?</Text></G2>
          <Box x={560} y={520} w={620} h={300} s={P(A('c8a')) * bump(th, 0.08)}>
            <Text y={-50} size={28} color={GRAY}>active daters, per month</Text>
            <Text y={40} size={70} color={C.red}>{f >= th ? '$300+' : '?'}</Text>
          </Box>
          <Box x={1400} y={520} w={680} h={320} s={P(A('c8a')) * bump(p53, 0.06)} o={lt(gz, 0.45)} fill={f >= p53 ? C.yellow : '#fff'}>
            <Text y={-80} size={28} color={GRAY}>Gen Z who spend $0/month dating</Text>
            <Text y={20} size={78} color={C.green}>{f >= p53 ? '53%' : '?'}</Text>
          </Box>
          <G2 x={960} y={950} o={lt(nc, 0.4)}><Text size={34} color={GRAY}>not cheap, or lazy — plenty just noticed the math</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 who profits ============
  {
    const ap = w('c9b', 'apps');
    const rst = w('c9c', 'restaurants');
    const dw = w('c9d', 'wins');
    q(ap, 'pop', 0.5);
    q(rst, 'pop2', 0.5);
    q(dw, 'ding', 0.5);
    const ev = w('c9e', 'evil');
    q(ev, 'boing', 0.5);
    const cur = [ap, rst, dw].filter((x) => f >= x).length;
    scene(A('c9a'), () =>
      f < A('c9e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={52}>who wins while Dave keeps swiping?</Text></G2>
            {['THE APPS', 'RESTAURANTS & BARS', 'DAVE (IF SMART)'].map((l, i) => (
              <G2 key={l} x={380 + i * 580} y={560} s={P(A('c9a')) * bump([ap, rst, dw][i], 0.08)} o={cur > i ? 1 : 0.45}>
                <Frame w={520} h={520}>
                  {i === 0 && <Icon kind="heart" s={0.9} />}
                  {i === 1 && <DateTable s={0.9} />}
                  {i === 2 && <Dave f={f} x={0} y={40} s={0.75} keys={[{at: 0, pose: 'thumbs', expr: 'happy'}]} />}
                  <Text y={210} size={30}>{l}</Text>
                </Frame>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={400} s={P(A('c9e'))}><Icon kind="heart" s={1.3} /></G2>
            <G2 x={960} y={680} o={lt(ev, 0.4)}><Text size={40} color={C.green}>plenty of people DO find real love here</Text></G2>
            <G2 x={960} y={760} o={lt(ev, 0.4)}><Text size={34} color={GRAY}>the business just quietly profits either way</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH10 practical ============
  {
    const hs = [bs('c10b'), bs('c10c'), bs('c10d'), bs('c10e'), bs('c10f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const cent = w('c10b', 'cent');
    const bdg = w('c10c', 'budget');
    const sw2 = w('c10d', 'swap');
    const cxl = w('c10e', 'cancel');
    const cff = w('c10f', 'coffee');
    q(cent, 'boing', 0.4);
    q(bdg, 'pop', 0.4);
    q(sw2, 'ding', 0.5);
    q(cxl, 'buzz', 0.4);
    q(cff, 'tick', 0.5);
    const nth = w('c10g', 'nothing');
    q(nth, 'ding', 0.6);
    const items = ['Try the free tier first, seriously', 'Set a real budget for dates', 'Swap numbers, then move on fast', 'No real chats in a month? Cancel, not upgrade', 'Coffee or a walk beats a fancy dinner'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c10a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={90}><Text size={50}>How to Date Without Going Broke</Text></G2>
          <G2 x={650} y={150}><Text size={28} color="#8C7A5B">(education, not relationship advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={250 + i * 155} s={0.9 * P(A('c10a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1220} />)}
          {cur === 0 && <Dave f={f} x={1620} y={520} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 1 && <G2 x={1620} y={520} s={bump(cent, 0.1)}><Icon kind="heart" s={0.9} /><Text y={140} size={30} color={C.green}>free tier: most matches happen here</Text></G2>}
          {cur === 2 && <G2 x={1620} y={520} s={bump(bdg, 0.1)}><DateTable s={0.75} /><Text y={200} size={30} color={C.green}>budget it like groceries</Text></G2>}
          {cur === 3 && <G2 x={1620} y={520} s={bump(sw2, 0.1)}><SwipeCard s={0.65} name="swap numbers" sub="" /></G2>}
          {cur === 4 && <G2 x={1620} y={520} s={bump(cxl, 0.1)}><PaywallLock label="0 real chats" locked={false} /></G2>}
          {cur >= 5 && <G2 x={1620} y={520} s={bump(cff, 0.1)}><Text size={90}>☕</Text><Text y={140} size={30} color={f >= nth ? C.green : GRAY}>{f >= nth ? 'costs nothing at all' : 'a coffee, or a walk'}</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Dating apps made $6B+ last year; a match ending your sub hurts them', "The algorithm isn't rooting for you, and dates got pricier too", 'Free tier, real budget, move fast beat every paid feature'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={200} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1520} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rs = w('r5', 'raise');
    const pc = w('r5', 'paycheck');
    const sb = w('r6', 'subscribe');
    const fr3 = w('r6', 'free');
    q(rs, 'pop', 0.5);
    q(pc, 'cash', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr3, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={54}>Next: Dave finally gets his raise</Text></G2>
            <Icon kind="briefcase" x={700} y={620} s={1.2 * P(A('r5')) * bump(rs, 0.1)} />
            <Box x={1350} y={560} w={640} h={260} s={P(A('r5')) * bump(pc, 0.08)} o={lt(pc, 0.45)} fill={f >= pc ? C.yellow : '#fff'}>
              <Text y={0} size={44} color={C.red}>same paycheck??</Text>
            </Box>
            <Dave f={f} x={960} y={950} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'happy'}, {at: pc, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={1500} y={800} s={pop(f, sb)}>
              <rect x={-140} y={-60} width={280} height={120} rx={20} fill={C.greenLight} stroke={C.ink} strokeWidth={6} />
              <Text y={4} size={56}>FREE</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = w('c4d', 'fourteen') + 30;
  subCues(SUB).forEach((c) => cues.push(c));
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <SubReminder f={f} at={SUB} Dave={<Stick f={f} x={0} y={200} s={1} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}]} acc={['hair']} seed={7} />} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
