import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text, XMark, Bill} from '../props';
import {Bar, Frame, Phone, Row, CreditCard, Badge, SubButton, Bell} from '../props2';
import {Shop} from '../props3';
import {MemberCard, Scale} from '../props8';
import {Jet} from '../props8';
import {Cup} from '../props25';
import {Brain} from '../props17';
import {Treadmill, Dumbbell, CapacityDots} from '../props45';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Manager: React.FC<SP> = (p) => <Stick acc={['shades']} seed={91} {...p} />;

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

const Pill: React.FC<{x: number; y: number; w: number; text: string; on: boolean; s?: number; color?: string; size?: number}> = ({x, y, w, text, on, s = 1, color = C.yellow, size = 40}) => (
  <G2 x={x} y={y} s={s} o={on ? 1 : 0.4}>
    <rect x={-w / 2} y={-44} width={w} height={88} rx={20} fill={on ? color : '#fff'} stroke={C.ink} strokeWidth={5} />
    <Text y={3} size={size}>{text}</Text>
  </G2>
);

export const Ep45: React.FC = () => {
  const f = useCurrentFrame();
  const {bs, w, we, t} = useT();
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
    const jan = w('o1', 'january');
    const signs = w('o1', 'signs');
    const promises = w('o1', 'promises');
    const every = w('o1', 'every');
    q(2, 'pop', 0.6);
    q(jan, 'ding', 0.5);
    q(signs, 'paper', 0.6);
    q(promises, 'stamp', 0.6);
    q(every, 'sparkle', 0.4);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Calendar x={280} y={340} s={0.85 * P(0) * bump(jan, 0.12)} top="TODAY" year="JAN 1" flip={0} />
          <Dave f={f} x={640} y={900} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: promises, pose: 'point_up', expr: 'happy'}]} />
          <G2 x={640} y={480} s={P(0) * bump(signs, 0.1)}><Bubble text="every single day!" size={44} tail="down" /></G2>
          <Box x={1420} y={620} w={640} h={420} s={P(0) * bump(signs, 0.08)}>
            <Text y={-150} size={34} color={GRAY}>NEW MEMBERSHIP</Text>
            <MemberCard y={30} s={1.05} tier="GYM CONTRACT" price="signed" color={C.navy} />
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const march = w('o2', 'march');
    const three = w('o2', 'three');
    const call = w('o2', 'call');
    const care = w('o2', 'care');
    q(march, 'flip', 0.5);
    q(three, 'buzz', 0.5);
    q(call, 'ding', 0.4);
    q(care, 'sting', 0.5);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={380} y={280} s={0.75 * P(A('o2'))} top="NOW" year="MARCH" flip={1} />
          <Treadmill x={950} y={780} s={1.3 * P(A('o2'))} f={f} running={false} />
          <G2 x={950} y={480} s={P(A('o2')) * bump(three, 0.12)}>
            <Text size={70} color={f >= three ? C.red : GRAY}>{f >= three ? 'visits: 3' : 'visits: ?'}</Text>
          </G2>
          <Dave f={f} x={1560} y={900} s={1.05} keys={[{at: 0, pose: 'pockets', expr: 'sad', look: -0.8}]} pockets={1} />
          <G2 x={1560} y={560} s={P(A('o2')) * bump(call)} o={lt(call, 0.4)}><Bubble text={f >= care ? "doesn't call,\ndoesn't care" : "doesn't call..."} size={38} tail="down" /></G2>
          <Phone x={470} y={860} s={0.7 * P(A('o2'))} title="GYM APP" value="$0 owed?" color={C.red} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const still = w('o3', 'still');
    const paying = w('o3', 'paying');
    const never = w('o3', 'never');
    const accident = w('o4', 'accident');
    const plan = w('o4', 'plan');
    q(still, 'thud', 0.6);
    q(paying, 'cash', 0.6);
    q(never, 'buzz', 0.4);
    q(accident, 'boing', 0.5);
    q(plan, 'stamp', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}, {at: plan, pose: 'shock', expr: 'shock'}]} />
          <Box x={480} y={480} w={620} h={260} s={P(A('o3')) * bump(paying, 0.08)}>
            <Text y={-70} size={32} color={GRAY}>DAVE'S BANK</Text>
            <Text y={0} size={56} color={f >= paying ? C.red : C.ink}>{f >= paying ? '-$24.99 / mo' : 'charged...'}</Text>
            <Text y={70} size={30} color={f >= never ? C.red : GRAY}>{f >= never ? 'visits this year: 0' : ''}</Text>
          </Box>
          <Treadmill x={1420} y={820} s={1.2 * P(A('o3'))} f={f} running={false} />
          <G2 x={1420} y={480} s={pop(f, still)}><Text size={54} color={C.red}>still paying</Text></G2>
          <Stamp x={960} y={220} s={pop(f, plan)} text="IT'S THE PLAN" size={64} color={C.navy} r={-4} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sell = w('o5', 'sell');
    const room = w('o5', 'room');
    const betting = w('o5', 'betting');
    const quit = w('o5', 'quit');
    q(sell, 'cash', 0.5);
    q(room, 'buzz', 0.5);
    q(betting, 'coin', 0.6);
    q(quit, 'trombone', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('o5'))}><Text size={52}>{f >= sell ? 'sell MORE than they have room for' : 'the gym math...'}</Text></G2>
          <CapacityDots x={960} y={560} s={1.1 * P(A('o5')) * bump(room, 0.06)} total={48} filled={f >= room ? 48 : 20} cols={12} />
          <Manager f={f} x={1580} y={900} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}, {at: betting, pose: 'present', expr: 'grin'}]} />
          <G2 x={1580} y={560} s={P(A('o5')) * bump(betting)} o={lt(betting, 0.4)}><Bubble text={f >= quit ? "...and you'll\nquit showing up" : "betting you\nwon't come"} size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'business'), w('o6', 'study'), w('o6', 'beat')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['THE BUSINESS MODEL', 'THE STUDY', 'HOW TO BEAT IT'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <Treadmill s={0.8} y={80} f={f} running />}
                {i === 1 && <Text y={0} size={80}>📊</Text>}
                {i === 2 && <Badge x={0} y={0} n="✓" color={C.green} />}
                <Text y={210} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 the oversell machine ============
  {
    const biz = w('c1a', 'business');
    const pf = w('c1b', 'planet');
    const million = w('c1b', 'million');
    const clubs = w('c1b', 'clubs');
    const math = w('c1c', 'math');
    const seven = w('c1c', 'seven');
    q(biz, 'pop', 0.5);
    q(pf, 'ding', 0.5);
    q(million, 'cash', 0.6);
    q(clubs, 'stamp', 0.5);
    q(math, 'paper', 0.5);
    q(seven, 'thud', 0.7);
    const floor = w('c1d', 'floor');
    const three = w('c1d', 'three');
    const not = w('c1d', 'not');
    q(floor, 'boing', 0.4);
    q(three, 'ding', 0.5);
    q(not, 'buzz', 0.6);
    const simple = w('c1e', 'simple');
    const nobody = w('c1e', 'nobody');
    const zero = w('c1e', 'zero');
    q(simple, 'pop', 0.5);
    q(nobody, 'sputter', 0.5);
    q(zero, 'buzz', 0.6);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Shop x={620} y={900} s={0.75 * P(A('c1a')) * bump(pf, 0.06)} name="GYM" />
            <G2 x={620} y={340} s={P(A('c1a')) * bump(biz)}><Text size={44}>the business Dave joined</Text></G2>
            <Box x={1480} y={400} w={720} h={260} s={P(A('c1a')) * bump(million, 0.08)}>
              <Text y={-70} size={30} color={GRAY}>Planet Fitness, FY2025 10-K</Text>
              <Text y={0} size={54}>{f >= million ? '20.8 million members' : '? members'}</Text>
              <Text y={65} size={40} color={f >= clubs ? C.blue : GRAY}>{f >= clubs ? '2,896 clubs' : ''}</Text>
            </Box>
            <Box x={1480} y={860} w={720} h={230} s={P(A('c1a')) * bump(seven, 0.1)} o={lt(math, 0.45)} fill={f >= seven ? C.yellow : '#fff'}>
              <Text y={-50} size={30} color={GRAY}>20.8M ÷ 2,896 clubs</Text>
              <Text y={30} size={70} color={C.red}>{f >= seven ? '~7,200 / club' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={million} text="Planet Fitness Form 10-K, FY2025: 20.8M members, 2,896 clubs" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1d')) * bump(floor)}><Text size={50}>a normal gym floor fits...</Text></G2>
            <CapacityDots x={640} y={620} s={1.2 * P(A('c1d')) * bump(three, 0.06)} total={24} filled={f >= three ? 24 : 12} cols={8} />
            <G2 x={640} y={950} s={bump(three)} o={lt(three, 0.4)}><Text size={42} color={C.green}>~200-300 people</Text></G2>
            <G2 x={1420} y={620} s={P(A('c1d')) * bump(not, 0.1)}><Text size={140} color={C.red}>{f >= not ? '≠' : ''}</Text></G2>
            <Box x={1620} y={620} w={560} h={220} s={P(A('c1d')) * bump(not, 0.08)} o={lt(not, 0.45)} fill={f >= not ? '#FFE3EA' : '#fff'}>
              <Text y={-30} size={32} color={GRAY}>members</Text>
              <Text y={40} size={64} color={C.red}>~7,200</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c1f')) * bump(simple)}><Text size={50}>{f >= simple ? 'simple: bet nobody comes at once' : 'so how does that work?'}</Text></G2>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <G2 key={i} x={220 + (i % 3) * 300} y={480 + Math.floor(i / 3) * 260} s={0.55 * P(A('c1f'))} o={f >= zero && i > 0 ? 0.3 : 1}>
                <Treadmill f={f + i * 9} running={i === 0} />
              </G2>
            ))}
            <G2 x={1580} y={520} s={P(A('c1f')) * bump(nobody, 0.1)} o={lt(nobody, 0.45)}><Bubble text={'most months:\nzero visits'} size={40} tail="left" /></G2>
            <Manager f={f} x={1580} y={920} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const trick = w('c1f', 'trick');
    const airline = w('c1f', 'airline');
    const seats = w('c1f', 'seats');
    const show = w('c1f', 'show');
    q(trick, 'pop2', 0.5);
    q(airline, 'whoosh', 0.5);
    q(seats, 'ding', 0.5);
    q(show, 'boing', 0.5);
    const low = w('c1g', 'low');
    const coffee = w('c1g', 'coffee');
    const enrolled = w('c1g', 'enrolled');
    q(low, 'coin', 0.5);
    q(coffee, 'ding', 0.5);
    q(enrolled, 'stamp', 0.6);
    scene(A('c1f'), () =>
      f < A('c1g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={120} s={P(A('c1f')) * bump(trick)}><Text size={48}>same trick: airline overbooking</Text></G2>
            <G2 x={640} y={560} s={1.3 * P(A('c1f')) * bump(airline, 0.1)}><Jet s={0.9} name="GYM AIR" /></G2>
            <Box x={640} y={950} w={620} h={160} s={P(A('c1f')) * bump(seats, 0.1)}>
              <Text x={-260} y={-30} size={36} anchor="start">seats</Text>
              <Text x={260} y={-30} size={36} anchor="end">180</Text>
              <Text x={-260} y={30} size={36} anchor="start" color={f >= seats ? C.red : GRAY}>tickets sold</Text>
              <Text x={260} y={30} size={36} anchor="end" color={C.red}>{f >= seats ? '210' : '?'}</Text>
            </Box>
            <G2 x={1520} y={620} s={P(A('c1f')) * bump(show)} o={lt(show, 0.4)}><Text size={44} color={C.blue}>bet: some won't show</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={620} y={120} s={P(A('c1g')) * bump(low)}><Text size={46}>the low price IS the strategy</Text></G2>
            <MemberCard x={640} y={560} s={1.05 * P(A('c1g')) * bump(low, 0.08)} tier="CLASSIC" price="$15/mo" color={C.navy} />
            <G2 x={1420} y={480} s={P(A('c1g')) * bump(coffee, 0.12)}><Cup s={1} label="$5" f={f} /></G2>
            <G2 x={1420} y={720} s={bump(coffee)} o={lt(coffee, 0.4)}><Text size={40} color={C.green}>less than a coffee habit</Text></G2>
            <G2 x={1420} y={880} s={bump(enrolled)} o={lt(enrolled, 0.4)}><Text size={38} color={C.red}>too cheap to bother cancelling</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 january the big bet ============
  {
    const january = w('c2a', 'january');
    const twelve = w('c2b', 'twelve');
    const signups = w('c2b', 'sign');
    const newyou = w('c2b', 'you');
    q(january, 'flip', 0.5);
    q(twelve, 'cash', 0.6);
    q(signups, 'ding', 0.5);
    q(newyou, 'sparkle', 0.5);
    const checkins = w('c2c', 'checkins');
    const fifty = w('c2c', 'fifty');
    const dec = w('c2c', 'december');
    q(checkins, 'pop', 0.5);
    q(fifty, 'coin', 0.6);
    q(dec, 'flip', 0.4);
    const first = w('c2d', 'first');
    const excited = w('c2d', 'excited');
    const bob = w('c2d', 'bob');
    q(first, 'ding', 0.5);
    q(excited, 'sparkle', 0.6);
    q(bob, 'pop2', 0.5);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={620} y={560} s={1.3 * P(A('c2a')) * bump(january, 0.08)} top="THE BET" year="JANUARY" flip={0} />
            <Box x={1420} y={480} w={680} h={260} s={P(A('c2a')) * bump(twelve, 0.1)}>
              <Text y={-60} size={30} color={GRAY}>of a whole year's sign ups</Text>
              <Text y={30} size={90} color={f >= twelve ? C.blue : GRAY}>{f >= twelve ? '12%' : '?'}</Text>
            </Box>
            <G2 x={1420} y={860} s={P(A('c2a')) * bump(newyou)} o={lt(signups, 0.45)}><Text size={44} color={C.green}>"New Year, new you"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={120} s={P(A('c2c')) * bump(checkins)}><Text size={48}>check-ins, first 2 weeks of Jan</Text></G2>
            <line x1={260} y1={880} x2={1020} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={420} y={880} h={ease(f, dec - 4, dec + 12, 60, 260)} color={GRAY} label="December" value="normal" w={220} />
            <Bar x={820} y={880} h={ease(f, fifty - 4, fifty + 16, 60, 480)} color={C.yellow} label="early January" value={f >= fifty ? '+30-50%' : '?'} w={220} />
            <Dave f={f} x={1500} y={900} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: first, pose: 'wave', expr: 'happy'}]} />
            <Bob f={f} x={1720} y={900} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: bob, pose: 'thumbs', expr: 'happy'}]} />
            <SourceTag f={f} at={fifty} text="Gym industry survey compilations (2025-2026): +30-50% check-ins, early January" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={620} y={920} s={1.15} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.8}]} />
            <G2 x={620} y={480} s={P(A('c2e')) * bump(excited)}><Bubble text={'a changed man,\nBob!'} size={42} tail="down" /></G2>
            <MemberCard x={1500} y={620} s={1.1 * P(A('c2e'))} tier="JAN 1 SIGN-UP" price="Dave" color={C.green} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const know = w('c2e', 'know');
    const wont = w('c2e', 'wont');
    const guessing = w('c2f', 'guessing');
    const movie = w('c2f', 'movie');
    q(know, 'ding', 0.5);
    q(wont, 'buzz', 0.5);
    q(guessing, 'pop', 0.5);
    q(movie, 'flip', 0.6);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Manager f={f} x={640} y={900} s={1.1} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}, {at: guessing, pose: 'hips', expr: 'grin'}]} />
          <G2 x={640} y={470} s={P(A('c2e')) * bump(know)}><Bubble text={f >= wont ? "...and most\nwon't last" : 'we already know'} size={40} tail="down" /></G2>
          {Array.from({length: 5}).map((_, i) => (
            <Calendar key={i} x={1250 + i * 140} y={700} s={0.42 * P(A('c2e'))} top={String(2021 + i)} year="JAN" flip={0} />
          ))}
          <G2 x={1500} y={980} s={bump(movie)} o={lt(movie, 0.4)}><Text size={40} color={C.blue}>same movie, every January</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 quitter's day ============
  {
    const date = w('c3a', 'date');
    const strava = w('c3b', 'strava');
    const thirty = w('c3b', 'thirty');
    const quitters = w('c3c', 'quitters');
    const friday = w('c3c', 'friday');
    const ninth = w('c3c', 'ninth');
    q(date, 'pop', 0.5);
    q(strava, 'ding', 0.5);
    q(thirty, 'cash', 0.5);
    q(quitters, 'stamp', 0.7);
    q(friday, 'flip', 0.5);
    q(ninth, 'boing', 0.5);
    const eighty = w('c3d', 'eighty');
    q(eighty, 'thud', 0.7);
    scene(A('c3a'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c3a')) * bump(date)}><Text size={48}>{f >= strava ? 'Strava crunched 30M+ workouts' : "there's even a date for it"}</Text></G2>
            <Calendar x={620} y={620} s={1.35 * P(A('c3a')) * bump(quitters, 0.1)} top={f >= friday ? '2nd FRIDAY' : 'JANUARY'} year={f >= ninth ? 'JAN 9' : '?'} flip={0} />
            <Stamp x={1500} y={560} s={P(A('c3a')) * bump(quitters, 0.15)} text="QUITTER'S DAY" size={54} color={C.red} r={-5} />
            <G2 x={1500} y={780} s={P(A('c3a')) * bump(strava)}><Text size={34} color={GRAY}>Strava, 30M+ Jan activities</Text></G2>
            <Dave f={f} x={1600} y={950} s={0.95 * P(A('c3a'))} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.8}, {at: quitters, pose: 'facepalm', expr: 'sad'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c3d'))}><Text size={52}>resolutions abandoned by then</Text></G2>
            <Stamp x={960} y={230} s={P(A('c3d')) * bump(eighty, 0.12)} text="QUITTER'S DAY" size={38} color={C.navy} r={-3} />
            <line x1={480} y1={880} x2={1440} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={680} y={880} h={220} color={C.green} label="still going" value="20%" w={300} />
            <Bar x={1240} y={880} h={ease(f, eighty - 4, eighty + 16, 70, 660)} color={C.red} label="quit already" value={f >= eighty ? '80%' : '?'} w={300} />
            <Dave f={f} x={1680} y={880} s={1.15 * P(A('c3d'))} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const stop = w('c3e', 'stop');
    const sixtyseven = w('c3e', 'sixty');
    const dollars = w('c3f', 'dollars');
    const change = w('c3g', 'change');
    q(stop, 'pop', 0.4);
    q(sixtyseven, 'stamp', 0.7);
    q(dollars, 'cash', 0.7);
    q(change, 'thud', 0.5);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={120} s={P(A('c3e')) * bump(stop)}><Text size={44}>and it doesn't stop in January</Text></G2>
          <CapacityDots x={620} y={620} s={1.15 * P(A('c3e')) * bump(sixtyseven, 0.06)} total={30} filled={f >= sixtyseven ? 20 : 5} cols={10} />
          <G2 x={620} y={960} s={bump(sixtyseven)} o={lt(sixtyseven, 0.4)}><Text size={42} color={C.red}>67% rarely or never go</Text></G2>
          <Box x={1500} y={560} w={680} h={320} s={P(A('c3e')) * bump(dollars, 0.1)} o={lt(change, 0.45)} fill={f >= dollars ? C.yellow : '#fff'}>
            <Text y={-90} size={30} color={GRAY}>wasted on unused memberships</Text>
            <Text y={10} size={90} color={C.red}>{f >= dollars ? '$1.3B' : '?'}</Text>
            <Text y={100} size={32} color={GRAY}>every year, in the U.S.</Text>
          </Box>
          <SourceTag f={f} at={sixtyseven} text="Industry survey compilations (2025-2026, secondary source): 67% rarely/never use; $1.3B wasted/yr" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 the gym study ============
  {
    const vibe = w('c4a', 'vibe');
    const economists = w('c4a', 'economists');
    const dellavigna = w('c4b', 'dellavigna');
    const members = w('c4b', 'members');
    q(vibe, 'boing', 0.4);
    q(economists, 'ding', 0.5);
    q(dellavigna, 'pop', 0.5);
    q(members, 'paper', 0.5);
    const four = w('c4c', 'four');
    const way = w('c4c', 'way');
    const seventeen = w('c4d', 'seventeen');
    const ten = w('c4d', 'ten');
    q(four, 'coin', 0.5);
    q(way, 'boing', 0.5);
    q(seventeen, 'cash', 0.7);
    q(ten, 'ding', 0.5);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c4a')) * bump(vibe)}><Text size={44}>{f >= economists ? 'two economists proved it' : "not just a vibe..."}</Text></G2>
            <Box x={620} y={560} w={740} h={380} s={P(A('c4a')) * bump(dellavigna, 0.08)}>
              <Text y={-130} size={30} color={GRAY}>DellaVigna & Malmendier, 2006</Text>
              <Text y={-60} size={38}>American Economic Review</Text>
              <Text y={20} size={54} color={f >= members ? C.blue : GRAY}>{f >= members ? '7,752 members' : '? members'}</Text>
              <Text y={90} size={34} color={GRAY}>3 U.S. health clubs, 3 years</Text>
            </Box>
            <Dave f={f} x={1560} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={780} y={140} s={P(A('c4d')) * bump(four)}><Text size={50}>real cost, per visit</Text></G2>
            <G2 x={780} y={230} s={P(A('c4d')) * bump(way)}><Text size={36} color={GRAY}>{f >= way ? 'paid for way more' : '~4 visits/month...'}</Text></G2>
            <Dumbbell x={1620} y={260} s={1.1 * P(A('c4d'))} o={0.85} />
            <line x1={380} y1={880} x2={1180} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={600} y={880} h={ease(f, ten - 4, ten + 12, 130, 340)} color={C.green} label="10-visit pass" value={f >= ten ? '$10/visit' : '?'} w={320} />
            <Bar x={1000} y={880} h={ease(f, seventeen - 4, seventeen + 16, 130, 560)} color={C.red} label="monthly plan" value={f >= seventeen ? '$17+/visit' : '?'} w={320} />
            <Dave f={f} x={1600} y={920} s={1.35 * P(A('c4d'))} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.8}, {at: seventeen, pose: 'facepalm', expr: 'sad'}]} />
            <SourceTag f={f} at={ten} text="DellaVigna & Malmendier, AER 96(3), 2006: monthly members paid $17+/visit vs $10 drop-in" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const eighty2 = w('c4e', 'eighty');
    const six = w('c4e', 'six');
    const extra = w('c4f', 'extra');
    const guilty = w('c4f', 'guilty');
    q(eighty2, 'stamp', 0.7);
    q(six, 'cash', 0.6);
    q(extra, 'thud', 0.5);
    q(guilty, 'sting', 0.6);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={620} y={480} w={700} h={300} s={P(A('c4e')) * bump(eighty2, 0.08)} fill={f >= eighty2 ? C.yellow : '#fff'}>
            <Text y={-80} size={32} color={GRAY}>would have saved money</Text>
            <Text y={0} size={100} color={C.red}>{f >= eighty2 ? '80%' : '?'}</Text>
            <Text y={90} size={34} color={f >= six ? C.blue : GRAY}>{f >= six ? '~$600-700 / year' : ''}</Text>
          </Box>
          <Dave f={f} x={1500} y={920} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried'}, {at: guilty, pose: 'facepalm', expr: 'sad'}]} />
          <G2 x={1500} y={500} s={P(A('c4e')) * bump(extra)} o={lt(extra, 0.45)}><Bubble text={f >= guilty ? 'paid extra...\nto feel guilty' : 'paid extra, for what?'} size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 why smart people do this ============
  {
    const lazy = w('c5a', 'lazy');
    const nope = w('c5a', 'nope');
    const smart = w('c5b', 'smart');
    const bias = w('c5b', 'bias');
    q(lazy, 'boing', 0.4);
    q(nope, 'buzz', 0.7);
    q(smart, 'pop', 0.5);
    q(bias, 'stamp', 0.6);
    const today = w('c5c', 'todaydave');
    const pizza = w('c5c', 'pizza');
    const future = w('c5c', 'futuredave');
    q(today, 'ding', 0.5);
    q(pizza, 'pop2', 0.5);
    q(future, 'sparkle', 0.5);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={640} y={900} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.8}]} />
            <G2 x={1150} y={440} s={P(A('c5a')) * bump(lazy)}><Bubble text={'"lazy people\nquit gyms"'} size={44} tail="left" /></G2>
            <Stamp x={1150} y={760} s={pop(f, nope)} text="NOPE" size={100} r={-8} />
            <G2 x={640} y={280} s={P(A('c5a')) * bump(bias)} o={lt(smart, 0.4)}><Text size={42} color={C.blue}>{f >= bias ? 'it\'s called "present bias"' : 'happens to smart people too'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={960} y1={160} x2={960} y2={1000} stroke={C.ink} strokeWidth={5} strokeDasharray="20 16" />
            <G2 x={960} y={110} s={P(A('c5c')) * bump(today)}><Text size={44}>today-Dave vs. contract-signing-Dave</Text></G2>
            <Dave f={f} x={560} y={900} s={1.1} keys={[{at: 0, pose: 'relax', expr: 'tired', look: 0.8}]} handItem={f >= pizza ? <MoneyStack n={1} s={0.4} label="pizza" /> : undefined} />
            <G2 x={560} y={500} s={P(A('c5c')) * bump(pizza)} o={lt(pizza, 0.45)}><Bubble text="just want pizza" size={38} tail="down" /></G2>
            <Dave f={f} x={1360} y={900} s={1.1} keys={[{at: 0, pose: 'point_up', expr: 'happy', look: -0.8}]} />
            <G2 x={1360} y={500} s={P(A('c5c')) * bump(future)} o={lt(future, 0.45)}><Bubble text="future me will go every day!" size={34} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const odds = w('c5d', 'odds');
    const laundry = w('c5e', 'laundry');
    const small = w('c5f', 'small');
    const twenty = w('c5f', 'twenty');
    q(odds, 'ding', 0.5);
    q(laundry, 'boing', 0.6);
    q(small, 'coin', 0.5);
    q(twenty, 'cash', 0.5);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Manager f={f} x={1560} y={900} s={1} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.8}]} />
          <G2 x={1560} y={500} s={P(A('c5d')) * bump(odds)} o={lt(odds, 0.4)}><Bubble text={'happy to take\nthat bet'} size={38} tail="down" /></G2>
          <G2 x={560} y={620} s={1.2 * P(A('c5d')) * bump(laundry, 0.1)}><Treadmill f={f} running={false} /></G2>
          <G2 x={560} y={880} s={bump(laundry)} o={lt(laundry, 0.4)}><Text size={40} color={C.red}>the treadmill-turned-laundry-rack</Text></G2>
          <Box x={960} y={220} w={780} h={170} s={P(A('c5d')) * bump(small, 0.08)} o={lt(twenty, 0.4)}>
            <Text y={-30} size={34} color={GRAY}>2nd reason: the fee is small</Text>
            <Text y={35} size={44} color={f >= twenty ? C.blue : GRAY}>{f >= twenty ? 'often under $20/mo' : ''}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 the exit maze ============
  {
    const cancel = w('c6a', 'cancel');
    const interesting = w('c6b', 'interesting');
    const two = w('c6b', 'two');
    const cancelling = w('c6b', 'cancelling');
    q(cancel, 'ding', 0.5);
    q(interesting, 'boing', 0.5);
    q(two, 'ding', 0.5);
    q(cancelling, 'buzz', 0.6);
    const lafitness = w('c6c', 'l');
    const thirty = w('c6c', 'thirty');
    const certified = w('c6c', 'certified');
    q(lafitness, 'pop', 0.5);
    q(thirty, 'paper', 0.5);
    q(certified, 'mail', 0.7);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={640} y={920} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: cancel, pose: 'point_r', expr: 'happy'}]} />
            <G2 x={640} y={480} s={P(A('c6a')) * bump(cancel)}><Bubble text="time to cancel!" size={44} tail="down" /></G2>
            <Phone x={1500} y={620} s={1} title="SIGN UP" value={f >= two ? '2 min ✓' : 'app...'} color={C.green} />
            <G2 x={1500} y={950} s={bump(interesting)} o={lt(interesting, 0.4)}><Text size={40} color={f >= cancelling ? C.red : GRAY}>{f >= cancelling ? 'cancelling? not so fast' : 'that part was easy...'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c6c')) * bump(lafitness)}><Text size={44}>L A Fitness: cancel by mail</Text></G2>
            <Box x={620} y={560} w={700} h={340} s={P(A('c6c')) * bump(thirty, 0.08)}>
              <Text y={-100} size={32} color={GRAY}>required:</Text>
              <Text y={-30} size={40} color={f >= thirty ? C.blue : GRAY}>{f >= thirty ? '30 days written notice' : '?'}</Text>
              <Text y={40} size={40} color={f >= certified ? C.red : GRAY}>{f >= certified ? 'sent by certified mail' : ''}</Text>
            </Box>
            <Dave f={f} x={1500} y={880} s={1} keys={[{at: 0, pose: 'carry', expr: 'tired'}]} />
            <G2 x={1500} y={480} s={bump(certified, 0.12)}><Text size={80}>✉️</Text></G2>
            <SourceTag f={f} at={thirty} text="LA Fitness membership agreement: 30 days' written notice, certified mail recommended" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const wrongday = w('c6d', 'wrong');
    const billed = w('c6d', 'billed');
    const click = w('c6e', 'click');
    const netflix = w('c6f', 'netflix');
    const stamps = w('c6f', 'stamps');
    q(wrongday, 'buzz', 0.5);
    q(billed, 'thud', 0.6);
    q(click, 'ding', 0.6);
    q(netflix, 'pop', 0.5);
    q(stamps, 'sting', 0.5);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c6d'))}><Text size={46}>signing up vs. cancelling</Text></G2>
          <Box x={520} y={560} w={620} h={300} s={P(A('c6d')) * bump(click, 0.08)} fill={C.greenLight}>
            <Text y={-90} size={34}>SIGN UP</Text>
            <Text y={0} size={46}>1 click</Text>
            <Text y={70} size={34} color={f >= click ? C.green : GRAY}>done instantly</Text>
          </Box>
          <Box x={1400} y={560} w={620} h={300} s={P(A('c6d')) * bump(wrongday, 0.08)} fill={f >= billed ? '#FFE3EA' : '#fff'}>
            <Text y={-90} size={34}>CANCEL</Text>
            <Text y={0} size={40} color={C.red}>letter + 30 days</Text>
            <Text y={70} size={32} color={f >= billed ? C.red : GRAY}>{f >= billed ? 'wrong day = billed again' : ''}</Text>
          </Box>
          <G2 x={960} y={950} s={bump(netflix)} o={lt(netflix, 0.4)}><Text size={42} color={C.blue}>{f >= stamps ? 'no stamps, no countdown' : 'compare: Netflix, 2 taps'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 click to cancel or not ============
  {
    const gov = w('c7a', 'government');
    const ftc = w('c7b', 'f');
    const online = w('c7b', 'online');
    q(gov, 'ding', 0.5);
    q(ftc, 'stamp', 0.5);
    q(online, 'pop', 0.5);
    const july = w('c7c', 'july');
    const threw = w('c7c', 'threw');
    q(july, 'flip', 0.5);
    q(threw, 'rip', 0.7);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c7a')) * bump(gov)}><Text size={46}>the government tried to fix this</Text></G2>
            <Box x={620} y={560} w={760} h={340} s={P(A('c7a')) * bump(ftc, 0.08)}>
              <Text y={-110} size={30} color={GRAY}>FTC, 2024</Text>
              <Text y={-40} size={42} color={C.blue}>"click to cancel" rule</Text>
              <Text y={40} size={34} color={f >= online ? C.ink : GRAY}>{f >= online ? 'sign up online = cancel online' : ''}</Text>
            </Box>
            <Dave f={f} x={1500} y={900} s={1} keys={[{at: 0, pose: 'thumbs', expr: 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Pill x={620} y={260} w={700} text="July 2025: rule takes effect..." on={f >= july} s={P(A('c7c')) * bump(july)} color={C.greenLight} size={34} />
            <Arrow d="M 620 320 L 620 410" t={f >= threw ? 1 : 0.3} />
            <Pill x={620} y={480} w={700} text="...days later, court vacates it" on={f >= threw} s={P(A('c7c')) * bump(threw)} color="#FFE3EA" size={34} />
            <XMark x={980} y={260} s={0.45 * pop(f, threw)} />
            <Manager f={f} x={1500} y={900} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
            <SourceTag f={f} at={july} text="FTC Negative Option Rule vacated by the 8th Circuit, July 8, 2025 (procedural grounds)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const jan26 = w('c7d', 'january');
    const notlaw = w('c7d', 'law');
    const political = w('c7e', 'political');
    const stands = w('c7e', 'stands');
    q(jan26, 'paper', 0.5);
    q(notlaw, 'buzz', 0.5);
    q(political, 'dream', 0.4);
    q(stands, 'ding', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={130} s={P(A('c7d')) * bump(jan26)}><Text size={44}>Jan 2026: FTC starts over</Text></G2>
          <G2 x={620} y={220} s={bump(notlaw)} o={lt(notlaw, 0.4)}><Text size={38} color={C.red}>not law yet</Text></G2>
          <Scale x={620} y={700} s={1.1 * P(A('c7d')) * bump(political, 0.06)} tilt={Math.sin(f / 20) * 0.1} left="CA · NY · MN" right="NO FEDERAL LAW" />
          <G2 x={1500} y={480} s={P(A('c7d')) * bump(political)} o={lt(political, 0.45)}><Text size={44}>a political question</Text></G2>
          <G2 x={1500} y={620} s={bump(stands)} o={lt(stands, 0.4)}><Text size={38} color={C.green}>{f >= stands ? 'now you know where it stands' : ''}</Text></G2>
          <SourceTag f={f} at={jan26} text="FTC draft ANPRM submitted to OIRA, Jan 30, 2026; state auto-renewal laws still apply" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 who profits ============
  {
    const wins = w('c8a', 'wins');
    const empty = w('c8b', 'empty');
    const profit = w('c8b', 'profit');
    q(wins, 'coin', 0.5);
    q(empty, 'buzz', 0.4);
    q(profit, 'cash', 0.7);
    const fair = w('c8c', 'fair');
    const collapse = w('c8c', 'collapse');
    const fit = w('c8c', 'fit');
    q(fair, 'whoosh_s', 0.4);
    q(collapse, 'thud', 0.6);
    q(fit, 'boing', 0.5);
    scene(A('c8a'), () =>
      f < A('c8c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c8a')) * bump(wins)}><Text size={48}>who wins if Dave doesn't show?</Text></G2>
            <Treadmill x={620} y={620} s={1.3 * P(A('c8a')) * bump(empty, 0.1)} f={f} running={false} />
            <G2 x={620} y={900} s={bump(empty)} o={lt(empty, 0.4)}><Text size={40} color={C.red}>empty = free money</Text></G2>
            <Manager f={f} x={1500} y={900} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}, {at: profit, pose: 'thumbs', expr: 'grin'}]} />
            <G2 x={1500} y={500} s={P(A('c8a')) * bump(profit)} o={lt(profit, 0.45)}><Bubble text="pure profit" size={44} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c8c')) * bump(fair)}><Text size={44}>to be fair: if everyone showed up...</Text></G2>
            <CapacityDots x={960} y={560} s={1.2 * P(A('c8c')) * bump(collapse, 0.05)} total={48} filled={f >= collapse ? 48 : 15} cols={12} />
            <G2 x={960} y={940} s={bump(fit)} o={lt(fit, 0.4)}><Text size={42} color={C.red}>{f >= fit ? "even the regulars couldn't fit" : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const weird = w('c8d', 'weird');
    const cheap = w('c8d', 'cheap');
    const okay = w('c8e', 'okay');
    q(weird, 'boing', 0.4);
    q(cheap, 'coin', 0.5);
    q(okay, 'buzz', 0.5);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={220} s={P(A('c8d')) * bump(weird)}><Text size={46}>{f >= cheap ? 'keeps it cheap for everyone who goes' : 'in a weird way...'}</Text></G2>
          <Treadmill x={480} y={780} s={1 * P(A('c8d'))} f={f} running={false} />
          <Dave f={f} x={640} y={920} s={1.15 * P(A('c8d'))} keys={[{at: 0, pose: 'shrug', expr: 'neutral'}]} />
          <Bob f={f} x={1280} y={920} s={1.1 * P(A('c8d'))} keys={[{at: 0, pose: 'idle', expr: 'happy'}]} handItem={<Dumbbell s={0.35} />} />
          <Box x={960} y={620} w={880} h={160} s={P(A('c8d')) * bump(okay, 0.08)}>
            <Text size={38} color={f >= okay ? C.navy : GRAY}>doesn't make the exit maze okay, though</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f'), bs('c9g'), bs('c9h')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = [
      'Ask: will I ACTUALLY go 3x/week?',
      'Not sure? Try pay-per-visit apps first',
      'Pick month-to-month over annual',
      'Put gym days on your calendar',
      'Cancel by certified mail, keep receipts',
      'Audit your bank statement yearly',
      'Send certified + registered, screenshot it',
    ];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={90}><Text size={52}>How to not get trapped</Text></G2>
          <G2 x={650} y={148}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={230 + i * 118} s={0.85 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dave f={f} x={1600} y={800} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 1 && <G2 x={1600} y={700}><Phone s={1} title="CLASSPASS" value="pay-per-visit" color={C.green} /></G2>}
          {cur === 2 && <G2 x={1600} y={700}><CreditCard s={0.75} /><Text y={140} size={34}>month-to-month</Text></G2>}
          {cur === 3 && <G2 x={1600} y={700}><Calendar s={0.85} top="MON" year="GYM" flip={0} /></G2>}
          {cur === 4 && <G2 x={1600} y={700}><Text size={80}>✉️</Text><Text y={90} size={30}>certified mail</Text></G2>}
          {cur === 5 && <G2 x={1600} y={700}><Bill s={1.2} /><Text y={90} size={30}>check statements</Text></G2>}
          {cur >= 6 && <G2 x={1600} y={700}><Text size={70}>📋</Text><Text y={80} size={30}>keep the paper trail</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Gyms oversell memberships, betting you quit', 'A study proved most would save paying per visit', 'Cancelling is hard on purpose: go month-to-month'];
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
    const dog = w('r5', 'dog');
    const bill = w('r5', 'bill');
    const sb = w('r6', 'subscribe');
    const easier = w('r6', 'easier');
    q(dog, 'pop', 0.5);
    q(bill, 'thud', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(easier, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={54}>Next: Dave's dog needs surgery...</Text></G2>
            <Dave f={f} x={640} y={900} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}, {at: bill, pose: 'facepalm', expr: 'sad'}]} />
            <Box x={1350} y={620} w={560} h={220} s={P(A('r5')) * bump(bill, 0.1)} fill={f >= bill ? '#FFE3EA' : '#fff'}>
              <Text y={-30} size={34} color={GRAY}>vet bill</Text>
              <Text y={40} size={70} color={C.red}>{f >= dog ? '$2,000' : '?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={200} y={240} s={0.7 * pop(f, sb - 8)} o={0.5}><Dumbbell /></G2>
            <G2 x={1720} y={260} s={0.55 * pop(f, sb - 8)} o={0.5}><Treadmill f={f} running /></G2>
            <SubButton x={960} y={420} s={1.4 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1440} y={420} s={1.1 * pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={900} s={1.3 * pop(f, sb - 8)} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Bob f={f} x={1620} y={900} s={1.1 * pop(f, sb - 6)} keys={[{at: 0, pose: 'thumbs', expr: 'happy'}]} />
            <G2 x={1000} y={820} s={pop(f, sb - 4) * bump(easier)} o={lt(easier, 0.45)}><Text size={40} color={C.green}>{f >= easier ? 'easier than cancelling a gym' : 'no thirty day wait'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3g', 'change') + 20;
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
