import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, MoneyStack, Paper, SourceTag, Sparkle, Stamp, Text, Thought, XMark} from '../props';
import {Bar, BigButton, CreditCard, Printer, Row, SubButton, Bell, Frame, Phone} from '../props2';
import {Raccoon, PriceTag, SourceCard, Person} from '../props3';
import {Cat} from '../props4';
import {Contract} from '../props5';
import {Stand, Share} from '../props7';
import {Bottle, MemberCard, Paycheck, Scale, Seat, Warehouse} from '../props8';
import {Bucket, Dumbbell, GymBuilding, Maze, Puppy, Stairs, SubTile, Tap} from '../props28';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const TILES: [string, string, string][] = [
  ['Stream+', '$15.49', C.red],
  ['FlixMax', '$17.99', C.blue],
  ['WatchIt', '$9.99', C.navy],
  ['Tunes', '$11.99', C.green],
  ['BeatBox', '$10.99', '#9B5DE5'],
  ['Cloud 2TB', '$9.99', C.blue],
  ['News Daily', '$4.99', '#5B6470'],
  ['FitApp', '$14.99', C.green],
  ['Iron Gym', '$39.99', C.red],
  ['MealBox', '$59.99', C.gold],
  ['Game Pass', '$9.99', '#9B5DE5'],
];

export const Ep28: React.FC = () => {
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
  const lt = (at: number, lo = 0.35) => (f >= at ? 1 : lo);
  const bump = (at: number, k = 0.15) => (f < at ? 1 : 1 + k * Math.sin(Math.min(1, (f - at) / 14) * Math.PI));
  const on = (at: number) => ease(f, at, at + 10);
  const Grid: React.FC<{x0: number; y0: number; litAt: number[]; cutAt?: number[]; sc?: number}> = ({x0, y0, litAt, cutAt = [], sc = 1}) => (
    <g>
      {TILES.map(([n, p, c], i) => (
        <SubTile key={i} x={x0 + (i % 4) * 330 * sc} y={y0 + Math.floor(i / 4) * 170 * sc} s={sc * pop(f, 2 + i) * bump(litAt[i] ?? 1e9, 0.1)} name={n} price={p} color={c} lit={f >= (litAt[i] ?? 1e9) ? 1 : 0.35} cut={cutAt[i] ? ease(f, cutAt[i], cutAt[i] + 10) : 0} />
      ))}
    </g>
  );

  // ============ HOOK ============
  {
    const ct = w('o1', 'counted');
    const el = w('o1', 'eleven');
    const th = w('o1', 'three');
    const mu = w('o2', 'music');
    const fi = w('o2', 'fitness');
    const cl = w('o2', 'cloud');
    const ca = w('o2', 'cat');
    const mk = w('o2', 'meal');
    const tg = w('o2', 'thought');
    q(2, 'pop', 0.6);
    q(ct, 'scribble', 0.5);
    q(el, 'ding', 0.6);
    q(th, 'trombone', 0.4);
    q(mu, 'pop', 0.5);
    q(fi, 'pop', 0.5);
    q(cl, 'pop', 0.5);
    q(mk, 'pop', 0.5);
    q(tg, 'stamp', 0.6);
    const litAt = TILES.map((_, i) => ct + i * 3);
    const hl = (i: number) => (i === 3 || i === 4 ? mu : i === 7 ? fi : i === 5 ? cl : i === 9 ? mk : 1e9);
    const n = f < ct ? '?' : String(Math.min(11, Math.floor(lin(f, ct, el, 1, 11))));
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={230} y={900} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: el, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={960} y={110} s={pop(f, 2)}><Text size={56}>DAVE'S BANK STATEMENT</Text></G2>
          {TILES.map(([nm, p, c], i) => (
            <SubTile key={i} x={620 + (i % 4) * 330} y={290 + Math.floor(i / 4) * 170} s={pop(f, 2 + i) * bump(hl(i), 0.14)} name={nm} price={p} color={c} lit={f >= litAt[i] ? 1 : 0.35} />
          ))}
          <G2 x={1610} y={630} s={pop(f, 4) * bump(el, 0.25)}>
            <circle r={110} fill={f >= el ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={20} size={110} color={f >= el ? '#fff' : C.ink}>{n}</Text>
          </G2>
          <G2 x={1610} y={780} s={pop(f, 5)}><Text size={36} color={f >= th ? C.green : '#9C9383'}>remembered: {f >= th ? '3' : '?'}</Text></G2>
          <G2 x={250} y={380} s={pop(f, 6)}><Cat f={f} s={0.5} mood={f >= ca ? 'happy' : 'happy'} /></G2>
          <Stamp x={1450} y={900} s={pop(f, 7) * bump(tg, 0.3)} o={f >= tg ? 1 : 0.25} text="CANCELLED...?" size={50} color={C.red} r={-5} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const e8 = w('o3', 'eighty');
    const re = w('o3', 'real');
    const tw = w('o3', 'two');
    q(e8, 'coin', 0.6);
    q(re, 'pop', 0.5);
    q(tw, 'cash', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={330} y={880} s={1.2 * pop(f, A('o3'))} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: tw, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={1150} y={150} s={pop(f, A('o3') + 2)}><Text size={52}>Monthly subscription spending</Text></G2>
          <line x1={700} y1={860} x2={1600} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={930} y={860} h={ease(f, e8 - 4, e8 + 14, 40, 86 * 2.6)} color={C.blue} label="what people guessed" value={f >= e8 ? '$86' : '?'} w={280} />
          <Bar x={1370} y={860} h={ease(f, tw - 4, tw + 16, 40, 219 * 2.6)} color={C.red} label="what they really pay" value={f >= tw ? '$219' : '?'} w={280} />
          <SourceTag f={f} at={A('o3') + 4} text="C+R Research survey, 1,000 U.S. adults (2022)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('o4', 'car');
    const mf = w('o4', 'monthly');
    const ht = w('o4', 'heated');
    const al = w('o4', 'already');
    q(cr, 'pop', 0.5);
    q(mf, 'cash', 0.6);
    q(ht, 'ding', 0.5);
    q(al, 'buzz', 0.5);
    const heat = on(ht);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Seat x={900} y={620} s={1.6 * pop(f, A('o4'))} color={C.navy} />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${820 + i * 70} 420 q 20 -30 0 -60 q -20 -30 0 -60`} fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" opacity={0.2 + 0.8 * heat} transform={`translate(0,${-8 * Math.sin(f / 6 + i)})`} />
          ))}
          <PriceTag x={1450} y={400} s={1.3 * pop(f, A('o4') + 3) * bump(mf, 0.2)} r={-6} text={f >= mf ? '$18 / month' : '$?? / month'} color={C.yellow} />
          <G2 x={1450} y={620} s={pop(f, A('o4') + 5)}><Text size={44} color={f >= al ? C.red : '#9C9383'}>the heater is already in the seat</Text></G2>
          <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: 0.8}, {at: al, pose: 'shock', expr: 'shock', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ev = w('o5', 'everything');
    q(ev, 'boing', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={pop(f, A('o5')) * bump(ev, 0.1)}><Text size={80}>WHY IS EVERYTHING</Text><Text y={100} size={80} color={C.red}>A SUBSCRIPTION?</Text></G2>
          <Seat x={380} y={640} s={0.8 * pop(f, A('o5') + 2)} color={C.navy} />
          <Printer x={760} y={640} s={0.7 * pop(f, A('o5') + 3)} />
          <Dumbbell x={1180} y={640} s={0.8 * pop(f, A('o5') + 4)} />
          <Phone x={1560} y={640} s={0.8 * pop(f, A('o5') + 5)} title="STREAM" value="$/mo" />
          <Dave f={f} x={960} y={1010} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'love'), w('o6', 'free'), w('o6', 'cancel'), w('o6', 'money')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    const cur = pv.filter((x) => f >= x).length - 1;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={56} color="#5B6470">TODAY</Text>
          {['WHY THEY LOVE IT', 'FREE TRIALS', 'THE CANCEL FIGHT', 'TAKE IT BACK'].map((l, i) => (
            <G2 key={l} x={270 + i * 460} y={520} s={pop(f, A('o6') + i * 2) * (cur === i ? 1.06 : 1)} o={cur >= i ? 1 : 0.45}>
              <Frame w={420} h={500} label={l}>
                {i === 0 && <Stand s={0.55} y={60} />}
                {i === 1 && <Text y={20} size={110} color={C.green}>FREE</Text>}
                {i === 2 && <Maze s={0.5} y={0} t={cur >= 2 ? lin(f, pv[2], pv[2] + 40) : 0} />}
                {i === 3 && <MoneyStack s={0.8} y={40} n={5} />}
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const ws = [
      w('c1b', 'streaming', 0), w('c1b', 'streaming', 1), w('c1b', 'streaming', 2), w('c1b', 'music', 0), w('c1b', 'music', 1), w('c1b', 'cloud'),
      w('c1b', 'news'), w('c1b', 'fitness'), w('c1b', 'gym'), w('c1b', 'meal'), w('c1b', 'phone'),
    ];
    ws.forEach((x) => q(x, 'pop', 0.4));
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={1100} y={110} s={pop(f, A('c1a'))}><Text size={56}>Dave's list: 11 subscriptions</Text></G2>
          <Grid x0={620} y0={290} litAt={ws} />
          <Dave f={f} x={230} y={900} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'worried', look: 0.8}]} />
          <G2 x={1600} y={820} s={pop(f, A('c1a') + 4)}><Text size={40} color="#5B6470">{ws.filter((x) => f >= x).length} / 11 checked</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nn = w('c1c', 'nine');
    const tt = w('c1c', 'thirteen');
    const lk = w('c1c', 'leaky');
    const fl = w('c1d', 'fill');
    const tw = w('c1d', 'two');
    const tf = w('c1d', 'twenty');
    q(nn, 'coin', 0.5);
    q(tt, 'coin', 0.5);
    q(lk, 'pop2', 0.5);
    q(tw, 'cash', 0.6);
    q(tf, 'ding', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Tap f={f} x={760} y={260} s={1.2 * pop(f, A('c1c'))} />
          <Bucket x={815} y={800} s={1.1 * pop(f, A('c1c') + 2)} level={f < fl ? 0.12 + 0.04 * lin(f, A('c1c'), fl) : ease(f, fl, fl + 60, 0.16, 0.8)} />
          <PriceTag x={320} y={330} s={pop(f, A('c1c') + 3) * bump(nn, 0.2)} o={lt(nn, 0.5)} text="$9 here" color={C.yellow} />
          <PriceTag x={320} y={520} s={pop(f, A('c1c') + 4) * bump(tt, 0.2)} o={lt(tt, 0.5)} text="$13 there" color={C.yellow} />
          <G2 x={1450} y={330} s={pop(f, A('c1c') + 5) * bump(tw, 0.15)}>
            <rect x={-280} y={-80} width={560} height={160} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={34} color="#5B6470">per month</Text>
            <Text y={36} size={70} color={f >= tw ? C.red : '#9C9383'}>{f >= tw ? '≈ $200' : '?'}</Text>
          </G2>
          <G2 x={1450} y={560} s={pop(f, A('c1c') + 6) * bump(tf, 0.15)}>
            <rect x={-280} y={-80} width={560} height={160} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={34} color="#5B6470">per year</Text>
            <Text y={36} size={70} color={f >= tf ? C.red : '#9C9383'}>{f >= tf ? '≈ $2,400' : '?'}</Text>
          </G2>
          <Dave f={f} x={1450} y={1000} s={0.75} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: tf, pose: 'shock', expr: 'shock'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nv = w('c1e', 'never');
    const mo = w('c1e', 'month');
    const it = w('c1e', 'itself');
    q(nv, 'buzz', 0.5);
    q(mo, 'flip', 0.5);
    q(it, 'thud', 0.5);
    const mp = Math.max(0, lin(f, mo, mo + 90, 0, 6));
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={1000} y={450} s={1.1 * pop(f, A('c1e'))} top="CHARGED" year={months[Math.floor(mp)]} flip={mp - Math.floor(mp) < 0.2 && mp > 0 ? 1 - (mp - Math.floor(mp)) / 0.2 : 0} />
          <G2 x={1550} y={400} s={pop(f, A('c1e') + 3)}>
            <rect x={-170} y={-60} width={340} height={120} rx={60} fill={C.green} stroke={C.ink} strokeWidth={6} />
            <circle cx={100} r={46} fill="#fff" stroke={C.ink} strokeWidth={5} />
            <Text x={-50} y={4} size={40} color="#fff">AUTO</Text>
          </G2>
          <G2 x={1550} y={540} s={pop(f, A('c1e') + 4)}><Text size={36} color="#5B6470">auto-renew: ON</Text></G2>
          <G2 x={1100} y={850} s={pop(f, A('c1e') + 5) * bump(nv, 0.12)}><Text size={52} color={f >= nv ? C.red : '#9C9383'}>Dave never decided this</Text></G2>
          <Dave f={f} x={340} y={880} s={1.2} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 ============
  {
    const ow = w('c2b', 'old');
    const cp = w('c2b', 'cup');
    const rn = w('c2b', 'rains');
    const nk = w('c2b', 'knows');
    q(ow, 'pop', 0.5);
    q(cp, 'coin', 0.5);
    q(rn, 'thud', 0.4);
    q(nk, 'boing', 0.4);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Stand x={800} y={822} s={1.1 * pop(f, A('c2a'))} />
          <Dave f={f} x={800} y={700} s={0.8} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: rn, pose: 'shrug', expr: 'worried', look: 0.8}]} />
          <Stick f={f} x={1350} y={822} s={1} acc={['cap']} seed={21} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}]} />
          <G2 x={400} y={200} s={pop(f, A('c2a') + 3) * bump(ow, 0.12)}><Text size={60} color={f >= ow ? C.ink : '#9C9383'}>OLD WAY</Text><Text y={70} size={40}>pay per cup</Text></G2>
          <G2 x={1400} y={250} s={pop(f, A('c2a') + 5)}><Bubble text={f >= rn ? 'maybe tomorrow...\nif it doesn\'t rain' : 'one cup, please'} size={40} tail="down" /></G2>
          <G2 x={1080} y={560} s={pop(f, A('c2a') + 6) * bump(cp, 0.3)}><Coin s={0.8} /></G2>
          <G2 x={1700} y={600} s={pop(f, A('c2a') + 7) * bump(nk, 0.3)}><Text size={120} color={f >= nk ? C.red : '#C9CED6'}>?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nw = w('c2c', 'new');
    const fv = w('c2c', 'five');
    const nx = w('c2c', 'next');
    const af = w('c2c', 'after');
    const ex = w('c2c', 'exactly');
    q(nw, 'pop', 0.5);
    q(fv, 'coin', 0.6);
    q(ex, 'ding', 0.5);
    q(nx, 'coin', 0.5);
    q(af, 'coin', 0.5);
    const mAt = [ex, nx, af];
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={400} y={140} s={pop(f, A('c2c'))}><Text size={60} color={C.green}>NEW WAY</Text></G2>
          <MemberCard x={420} y={430} s={1.1 * pop(f, A('c2c') + 2) * bump(fv, 0.12)} r={-6} tier="LEMONADE CLUB" price={f >= fv ? '$5 / month' : '$? / month'} color={C.yellow} />
          {['MONTH 1', 'MONTH 2', 'MONTH 3'].map((m, i) => (
            <G2 key={m} x={1000 + i * 300} y={430} s={pop(f, A('c2c') + 3 + i) * bump(mAt[i], 0.15)} o={lt(mAt[i], 0.4)}>
              <rect x={-120} y={-150} width={240} height={300} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-100} size={34}>{m}</Text>
              <Coin s={0.6} y={10} />
              <Text y={110} size={44} color={C.green}>+$5</Text>
            </G2>
          ))}
          <Dave f={f} x={1300} y={1000} s={0.8} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={500} y={850} s={pop(f, A('c2c') + 6)}><Text size={44} color={f >= ex ? C.ink : '#9C9383'}>Dave knows what's coming</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rr = w('c2d', 'recurring');
    const pr = w('c2d', 'predictable');
    const pc = w('c2d', 'paycheck');
    q(rr, 'pop', 0.5);
    q(pr, 'stamp', 0.7);
    q(pc, 'cash', 0.5);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={pop(f, A('c2d')) * bump(rr, 0.1)}><Text size={72} color={f >= rr ? C.blue : '#9C9383'}>RECURRING REVENUE</Text></G2>
          <Paycheck x={1150} y={520} s={1.1 * pop(f, A('c2d') + 2) * bump(pc, 0.1)} amount="$5 × every member" />
          <Stamp x={1150} y={820} s={pop(f, A('c2d') + 4) * bump(pr, 0.3)} o={f >= pr ? 1 : 0.25} text="PREDICTABLE" size={64} color={C.green} r={-5} />
          <Stand x={380} y={880} s={0.8 * pop(f, A('c2d') + 3)} />
          <Dave f={f} x={380} y={780} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lv = w('c2e', 'love');
    const st = w('c2e', 'stock');
    const fu = w('c2e', 'future');
    const mr = w('c2e', 'more');
    const sv = w('c2f', 'seven');
    const lo = w('c2f', 'lower');
    const rw = w('c2f', 'rewards');
    q(lv, 'heart', 0.5);
    q(st, 'pop', 0.4);
    q(mr, 'cash', 0.5);
    q(sv, 'ding', 0.7);
    q(lo, 'pop2', 0.4);
    q(rw, 'coin', 0.5);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Banker f={f} x={300} y={880} s={1.15 * pop(f, A('c2e'))} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: lv, pose: 'present', expr: 'money', look: 0.8}]} />
          <G2 x={420} y={330} s={pop(f, A('c2e') + 3)}><Bubble text={f >= fu ? 'certain future?\nI pay more!' : 'steady money...'} size={40} tail="down" /></G2>
          <line x1={800} y1={860} x2={1780} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={1040} y={860} h={70} color={C.blue} label="$1 of yearly sales" value="$1" w={260} />
          <Bar x={1520} y={860} h={ease(f, sv - 4, sv + 16, 90, 7 * 70)} color={C.green} label="what investors pay" value={f >= sv ? '≈ $7' : '?'} w={260} />
          <G2 x={1290} y={150} s={pop(f, A('c2e') + 5)}><Text size={44}>Typical software subscription company</Text></G2>
          <G2 x={1290} y={220} s={pop(f, A('c2e') + 6)}><Text size={34} color={f >= lo ? C.red : '#9C9383'}>other counts: lower (about 3–5x)</Text></G2>
          <SourceTag f={f} at={sv} text="Value Add VC, public SaaS median ≈ 6.8x revenue (May 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wo = w('c2g', 'worth');
    const pa = w('c2g', 'pay');
    const sl = w('c2g', 'same');
    const bs2 = w('c2g', 'story');
    q(wo, 'boing', 0.5);
    q(sl, 'pop', 0.5);
    q(bs2, 'ding', 0.6);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stand x={480} y={620} s={0.8 * pop(f, A('c2g'))} label="PAY PER CUP" />
          <Stand x={1440} y={620} s={0.8 * pop(f, A('c2g') + 2)} label="LEMONADE CLUB" />
          <G2 x={480} y={250} s={pop(f, A('c2g') + 3)}><Share s={0.7} n="$1M" owner="STOCK VALUE" color={C.blue} /></G2>
          <G2 x={1440} y={250} s={pop(f, A('c2g') + 4) * (1 + 0.35 * on(wo))}><Share s={0.7} n={f >= wo ? '$3M' : '$1M'} owner="STOCK VALUE" /></G2>
          <G2 x={960} y={450} s={pop(f, A('c2g') + 5) * bump(pa, 0.2)}><Text size={90}>→</Text></G2>
          <G2 x={960} y={880} s={pop(f, A('c2g') + 6) * bump(bs2, 0.12)}><Text size={56} color={f >= sl ? C.ink : '#9C9383'}>same lemonade · better story</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 ============
  {
    const bx = w('c3b', 'box');
    const on1 = w('c3b', 'once');
    const mo = w('c3b', 'month');
    const fe = w('c3b', 'forever');
    q(bx, 'pop', 0.5);
    q(on1, 'coin', 0.5);
    q(mo, 'cash', 0.5);
    q(fe, 'trombone', 0.4);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={480} y={480} s={pop(f, A('c3a')) * bump(bx, 0.1)} o={lt(bx, 0.6)}>
            <path d="M -170 -160 L 130 -160 L 190 -210 L -110 -210 Z" fill="#CFE0FF" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <path d="M 130 -160 L 190 -210 L 190 110 L 130 160 Z" fill="#9DB9EA" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <rect x={-170} y={-160} width={300} height={320} fill={C.blue} stroke={C.ink} strokeWidth={6} />
            <Text x={-20} y={-60} size={44} color="#fff">SOFTWARE</Text>
            <Text x={-20} y={40} size={60} color="#fff">2005</Text>
          </G2>
          <G2 x={480} y={760} s={pop(f, A('c3a') + 2) * bump(on1, 0.2)}><Text size={52} color={f >= on1 ? C.green : '#9C9383'}>pay once: $199</Text></G2>
          <G2 x={960} y={480} s={pop(f, A('c3a') + 3)}><Text size={120}>→</Text></G2>
          <Phone x={1450} y={460} s={1.2 * pop(f, A('c3a') + 4) * bump(mo, 0.12)} title="SOFTWARE" value={f >= mo ? '$20/mo' : '$?'} color={C.red} />
          <G2 x={1450} y={800} s={pop(f, A('c3a') + 5) * bump(fe, 0.2)}><Text size={52} color={f >= fe ? C.red : '#9C9383'}>...forever</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ei = w('c3c', 'eighteen');
    const ht = w('c3c', 'heated');
    const bi = w('c3c', 'built');
    const fu = w('c3d', 'furious');
    const dr = w('c3d', 'dropped');
    const ap = w('c3d', 'apps');
    q(ei, 'cash', 0.6);
    q(ht, 'ding', 0.5);
    q(bi, 'buzz', 0.5);
    q(fu, 'crowd', 0.5);
    q(dr, 'stamp', 0.7);
    q(ap, 'pop', 0.5);
    const sh = shake(f, fu, 10, 20);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Seat x={560} y={600} s={1.4 * pop(f, A('c3c'))} color={C.navy} />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${490 + i * 70} 420 q 20 -30 0 -60 q -20 -30 0 -60`} fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" opacity={0.25 + 0.75 * on(ht)} />
          ))}
          <PriceTag x={1100} y={250} s={1.2 * pop(f, A('c3c') + 2) * bump(ei, 0.2)} r={-5} text={f >= ei ? 'heated seats: $18/mo' : 'heated seats: $?/mo'} color={C.yellow} />
          <G2 x={560} y={870} s={pop(f, A('c3c') + 3)}><Text size={40} color={f >= bi ? C.red : '#9C9383'}>heater already built in</Text></G2>
          {[0, 1, 2].map((i) => (
            <Stick key={i} f={f} x={1150 + i * 220 + sh.x} y={880 + sh.y} s={0.85 * pop(f, A('c3c') + 4 + i)} acc={i === 1 ? ['cap'] : i === 2 ? ['ponytail'] : ['glasses']} seed={50 + i} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.5}, {at: fu, pose: 'panic', expr: 'angry', look: -0.5}]} />
          ))}
          <Stamp x={1400} y={520} s={pop(f, A('c3c') + 6) * bump(dr, 0.3)} o={f >= dr ? 1 : 0.2} text="DROPPED 2023" size={60} color={C.green} r={-6} />
          <G2 x={1400} y={640} s={pop(f, A('c3c') + 7)}><Text size={36} color={f >= ap ? C.ink : '#B8B0A0'}>other features: still sold in apps</Text></G2>
          <SourceTag f={f} at={ei} text="BMW, ~$18/mo in UK, Germany, S. Korea (2022); dropped Sept 2023" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pc = w('c3e', 'cheap');
    const ik = w('c3e', 'money');
    const sb = w('c3e', 'subscribe');
    const tn = w('c3e', 'ten');
    q(pc, 'pop', 0.5);
    q(ik, 'cash', 0.6);
    q(sb, 'ding', 0.5);
    q(tn, 'ding', 0.6);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Printer x={420} y={520} s={1.2 * pop(f, A('c3e'))} />
          <PriceTag x={420} y={800} s={pop(f, A('c3e') + 2) * bump(pc, 0.2)} text="printer: cheap" color={C.greenLight} />
          <Bottle x={900} y={560} s={1.2 * pop(f, A('c3e') + 3) * bump(ik, 0.15)} color={C.navy} label="INK" />
          <G2 x={900} y={800} s={pop(f, A('c3e') + 4)}><Text size={44} color={f >= ik ? C.red : '#9C9383'}>ink: the money</Text></G2>
          <G2 x={1450} y={460} s={pop(f, A('c3e') + 5) * bump(sb, 0.1)} o={lt(sb, 0.5)}>
            <rect x={-280} y={-200} width={560} height={400} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-120} size={44}>INK PLAN</Text>
            <Text y={-40} size={36} color="#5B6470">subscribers</Text>
            <Text y={60} size={90} color={f >= tn ? C.blue : '#9C9383'}>{f >= tn ? '10M+' : '?'}</Text>
          </G2>
          <SourceTag f={f} at={tn} text="HP: Instant Ink, 10M+ subscribers in 38 countries (2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mv = w('c3f', 'movies');
    const mu = w('c3f', 'music');
    const ga = w('c3f', 'games');
    const st = w('c3f', 'statement');
    [mv, mu, ga].forEach((x) => q(x, 'pop', 0.5));
    q(st, 'paper', 0.5);
    const at = [mv, mu, ga];
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {['MOVIES', 'MUSIC', 'GAMES'].map((l, i) => (
            <G2 key={l} x={400 + i * 560} y={420} s={pop(f, A('c3f') + i * 2) * bump(at[i], 0.12)} o={lt(at[i], 0.45)}>
              <rect x={-230} y={-160} width={460} height={300} rx={20} fill={C.navy} stroke={C.ink} strokeWidth={6} />
              <Text y={-20} size={60} color="#fff">{l}</Text>
              <Text y={60} size={44} color={C.yellow}>$ / month</Text>
              <rect x={-40} y={140} width={80} height={40} fill="#5B6470" stroke={C.ink} strokeWidth={5} />
            </G2>
          ))}
          <G2 x={1200} y={840} s={pop(f, A('c3f') + 6) * bump(st, 0.12)}><Text size={48} color={f >= st ? C.red : '#9C9383'}>on the statement. every. month.</Text></G2>
          <Dave f={f} x={300} y={960} s={0.8} keys={[{at: 0, pose: 'point_r', expr: 'worried', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 ============
  {
    const cr = w('c4b', 'research');
    const th = w('c4b', 'thousand');
    const hm = w('c4b', 'how');
    q(cr, 'paper', 0.5);
    q(th, 'pop', 0.5);
    q(hm, 'pop2', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={1150} y={480} s={pop(f, A('c4a')) * bump(cr, 0.06)} org="C+R RESEARCH" sub="survey · April–May 2022" title={['How much do you spend', 'on subscriptions', 'each month?']} stat={f >= th ? '1,000' : '?'} statLabel="Americans asked" />
          <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
          <G2 x={380} y={380} s={pop(f, A('c4a') + 4) * bump(hm, 0.12)}><Bubble text="Hmm... not much?" size={42} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const e8 = w('c4c', 'eighty');
    const tw = w('c4c', 'two');
    const on3 = w('c4d', 'one');
    const si = w('c4d', 'sixteen');
    q(e8, 'coin', 0.6);
    q(tw, 'cash', 0.7);
    q(on3, 'stamp', 0.6);
    q(si, 'ding', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={300} y1={860} x2={1300} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={550} y={860} h={ease(f, e8 - 4, e8 + 14, 40, 86 * 2.6)} color={C.blue} label="average guess" value={f >= e8 ? '$86' : '?'} w={280} />
          <Bar x={1050} y={860} h={ease(f, tw - 4, tw + 16, 40, 219 * 2.6)} color={C.red} label="real average" value={f >= tw ? '$219' : '?'} w={280} />
          <G2 x={1600} y={380} s={pop(f, A('c4c') + 3) * bump(on3, 0.15)} o={lt(on3, 0.45)}>
            <rect x={-230} y={-110} width={460} height={220} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-45} size={34} color="#5B6470">didn't notice</Text>
            <Text y={40} size={80} color={C.red}>{f >= on3 ? '+$133' : '?'}</Text>
          </G2>
          <G2 x={1600} y={640} s={pop(f, A('c4c') + 5) * bump(si, 0.15)} o={lt(si, 0.45)}>
            <rect x={-230} y={-90} width={460} height={180} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={32} color="#5B6470">per year</Text>
            <Text y={40} size={64} color={C.red}>{f >= si ? '≈ $1,600' : '?'}</Text>
          </G2>
          <SourceTag f={f} at={A('c4c') + 4} text="C+R Research (2022): guess $86 vs itemized $219" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('c4e', 'seventy');
    const fg = w('c4e', 'forget');
    q(sv, 'ding', 0.6);
    q(fg, 'pop', 0.4);
    const k = f >= sv ? Math.floor(lin(f, sv, sv + 20, 0, 74)) : 0;
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {Array.from({length: 20}).map((_, i) => (
            <Person key={i} x={760 + (i % 10) * 105} y={380 + Math.floor(i / 10) * 200} s={1.1 * pop(f, A('c4e') + (i % 10))} c={i < Math.round(k / 5) ? C.red : '#C9CED6'} />
          ))}
          <G2 x={1230} y={780} s={pop(f, A('c4e') + 3) * bump(sv, 0.15)}><Text size={90} color={f >= sv ? C.red : '#9C9383'}>{f >= sv ? `${k}%` : '?%'}</Text></G2>
          <G2 x={1230} y={900} s={pop(f, A('c4e') + 4)}><Text size={44} color={f >= fg ? C.ink : '#9C9383'}>"easy to forget repeat charges"</Text></G2>
          <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'facepalm', expr: 'tired'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const iv = w('c4f', 'invisible');
    const cs = w('c4f', 'cash');
    const bt = w('c4f', 'button');
    const nv = w('c4f', 'never');
    q(iv, 'poof', 0.5);
    q(cs, 'pop', 0.4);
    q(bt, 'click', 0.5);
    q(nv, 'ding', 0.5);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={pop(f, A('c4f')) * bump(iv, 0.1)}><Text size={64} color={f >= iv ? C.blue : '#9C9383'}>the INVISIBLE payment</Text></G2>
          <G2 x={450} y={480} s={pop(f, A('c4f') + 2)} o={f >= cs ? 0.35 + 0.3 * Math.sin(f / 5) : 1}><Bill s={1.4} /></G2>
          {f >= cs && <XMark x={450} y={480} s={ease(f, cs, cs + 10, 0.6, 1)} />}
          <G2 x={450} y={720} s={pop(f, A('c4f') + 3)}><Text size={40}>no cash leaves your hand</Text></G2>
          <BigButton x={1000} y={480} s={0.9 * pop(f, A('c4f') + 4)} press={0} label="PAY" />
          {f >= bt && <XMark x={1000} y={450} s={ease(f, bt, bt + 10, 0.6, 1)} />}
          <G2 x={1000} y={720} s={pop(f, A('c4f') + 5)}><Text size={40}>no button to press</Text></G2>
          <Raccoon f={f} x={1550} y={620} s={0.8 * pop(f, A('c4f') + 6)} mood={f >= nv ? 'sneaky' : 'happy'} holdCoin />
          <G2 x={960} y={900} s={pop(f, A('c4f') + 7) * bump(nv, 0.1)}><Text size={48} color={f >= nv ? C.red : '#9C9383'}>best payment for a company = the one you never see</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 ============
  {
    const fr = w('c5a', 'free');
    const sv = w('c5b', 'seven');
    const mo = w('c5b', 'month');
    const cd = w('c5b', 'card');
    const wr = w('c5b', 'worry');
    q(fr, 'chime', 0.6);
    q(sv, 'pop', 0.5);
    q(mo, 'pop', 0.5);
    q(cd, 'key', 0.6);
    q(wr, 'pop2', 0.5);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={330} s={pop(f, A('c5a')) * bump(fr, 0.2)}><Text size={200} color={C.green} stroke={C.ink} sw={10}>FREE!</Text></G2>
          <Sparkle x={250} y={200} t={(f % 30) / 30} s={0.8} />
          <Sparkle x={880} y={200} t={((f + 15) % 30) / 30} s={0.8} />
          <G2 x={560} y={560} s={pop(f, A('c5a') + 2)}><Text size={52} color={f >= mo ? C.ink : '#9C9383'}>{f >= mo ? '7 days · 30 days' : f >= sv ? '7 days' : 'free trial'}</Text></G2>
          <G2 x={1400} y={500} s={pop(f, A('c5a') + 3)}>
            <rect x={-320} y={-300} width={640} height={600} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-220} size={44}>Start your free trial</Text>
            <rect x={-260} y={-150} width={520} height={80} rx={12} fill={f >= cd ? '#FFF4D6' : '#F2F4F7'} stroke={C.ink} strokeWidth={4} />
            <Text x={-240} y={-108} size={32} anchor="start" color="#5B6470">{f >= cd ? '•••• •••• •••• 4242' : 'card number'}</Text>
            <CreditCard x={0} y={60} s={0.7 * bump(cd, 0.15)} />
            <Text y={240} size={30} color={f >= wr ? C.red : '#9C9383'}>"we won't charge you... yet"</Text>
          </G2>
          <Dave f={f} x={560} y={1000} s={0.75} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ea = w('c5c', 'easy');
    const np = w('c5c', 'nope');
    const fg = w('c5c', 'forget');
    const bl = w('c5c', 'bill');
    q(ea, 'pop', 0.5);
    q(np, 'buzz', 0.7);
    q(fg, 'cricket', 0.5);
    q(bl, 'cash', 0.7);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: 0.8}, {at: np, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={520} y={330} s={pop(f, A('c5c')) * bump(ea, 0.1)}><Bubble text={"I'll just cancel\nbefore it ends!"} size={44} tail="down" /></G2>
          <Calendar x={1050} y={420} s={0.9 * pop(f, A('c5c') + 2)} top="TRIAL ENDS" year={f >= fg ? 'missed' : 'day 7'} flip={0} />
          <Stamp x={1050} y={720} s={pop(f, A('c5c') + 3) * bump(np, 0.35)} o={f >= np ? 1 : 0.2} text="NOPE" size={90} color={C.red} r={-8} />
          <G2 x={1550} y={500} s={pop(f, A('c5c') + 4) * bump(bl, 0.15)} o={lt(bl, 0.45)}>
            <rect x={-200} y={-220} width={400} height={440} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-150} size={40}>CHARGED</Text>
            <Text y={-40} size={80} color={C.red}>$14.99</Text>
            <Text y={60} size={32} color="#5B6470">renews monthly</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pu = w('c5d', 'puppy');
    const mn = w('c5d', 'monday');
    const yp = w('c5d', 'puppy', 1);
    const ea = w('c5d', 'eats');
    q(pu, 'pop', 0.6);
    q(mn, 'flip', 0.5);
    q(yp, 'stamp', 0.5);
    q(ea, 'coin', 0.6);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Puppy f={f} x={900} y={760} s={1.3 * pop(f, A('c5d')) * bump(pu, 0.12)} />
          <Calendar x={1500} y={330} s={0.8 * pop(f, A('c5d') + 2)} top="FREE UNTIL" year={f >= mn ? 'MONDAY' : 'weekend'} flip={f >= mn && f < mn + 8 ? 1 - (f - mn) / 8 : 0} />
          <G2 x={1500} y={760} s={pop(f, A('c5d') + 3) * bump(ea, 0.2)} o={lt(ea, 0.45)}>
            <ellipse rx={150} ry={50} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={-80} size={44} color={C.red}>$ every month</Text>
          </G2>
          <Dave f={f} x={380} y={880} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'happy', look: 0.8}, {at: yp, pose: 'shrug', expr: 'worried', look: 0.8}]} />
          <G2 x={900} y={440} s={pop(f, A('c5d') + 4)}><Text size={48} color={f >= yp ? C.red : '#9C9383'}>{f >= yp ? 'your puppy now' : 'free puppy!'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nt = w('c5e', 'nothing');
    const sy = w('c5e', 'staying');
    const lv = w('c5e', 'leaving');
    q(nt, 'cricket', 0.4);
    q(sy, 'ding', 0.5);
    q(lv, 'thud', 0.5);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={pop(f, A('c5e')) * bump(nt, 0.1)}><Text size={56}>doing nothing = the easiest choice</Text></G2>
          <G2 x={560} y={560} s={pop(f, A('c5e') + 2) * bump(sy, 0.08)} o={lt(sy, 0.55)}>
            <rect x={-230} y={-300} width={460} height={600} rx={20} fill={C.green} stroke={C.ink} strokeWidth={6} />
            <Text y={-200} size={56} color="#fff">STAY</Text>
            <Text y={0} size={40} color="#fff">automatic</Text>
            <Text y={60} size={40} color="#fff">0 clicks</Text>
          </G2>
          <G2 x={1380} y={560} s={pop(f, A('c5e') + 3) * bump(lv, 0.1)} o={lt(lv, 0.55)}>
            <Maze s={0.8} t={f >= lv ? lin(f, lv, lv + 50) : 0.05} />
            <Text y={-250} size={48} color={C.red}>LEAVE: your job</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 ============
  {
    const dp = w('c6b', 'dark');
    const fv = w('c6b', 'five');
    const gu = w('c6b', 'guilt');
    const ti = w('c6b', 'tiny');
    q(dp, 'sting', 0.5);
    q(fv, 'pop', 0.5);
    q(gu, 'pop', 0.5);
    q(ti, 'pop', 0.5);
    const at = [fv, gu, ti];
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={160} s={pop(f, A('c6a')) * bump(dp, 0.12)}><Text size={72} color={f >= dp ? C.ink : '#9C9383'}>DARK PATTERNS</Text></G2>
          <Maze x={620} y={600} s={pop(f, A('c6a') + 2)} t={lin(f, A('c6a') + 10, A('c6c') - 10, 0.02, 1)} />
          {['5 pages to cancel', '"We\'ll miss you :("', 'a tiny grey link'].map((l, i) => (
            <Row key={i} x={1120} y={340 + i * 170} s={0.72 * pop(f, A('c6a') + 3 + i)} n={i + 1} text={l} lit={f >= at[i] ? 1 : 0.2} color={C.red} w={960} />
          ))}
          <Dave f={f} x={1500} y={1010} s={0.6} keys={[{at: 0, pose: 'facepalm', expr: 'tired'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const am = w('c6c', 'amazon');
    const tw = w('c6c', 'two');
    const wi = w('c6c', 'without');
    q(am, 'pop', 0.5);
    q(tw, 'cash', 0.8);
    q(wi, 'paper', 0.5);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bank x={380} y={620} s={0.55 * pop(f, A('c6c'))} label="FTC" />
          <Warehouse x={1540} y={700} s={0.7 * pop(f, A('c6c') + 2) * bump(am, 0.06)} name="AMAZON" />
          <G2 x={960} y={320} s={pop(f, A('c6c') + 3) * bump(tw, 0.2)}>
            <rect x={-330} y={-110} width={660} height={220} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-40} size={36} color="#5B6470">settlement (Prime)</Text>
            <Text y={45} size={90} color={f >= tw ? C.red : '#9C9383'}>{f >= tw ? 'up to $2.5B' : '$?'}</Text>
          </G2>
          <MoneyStack x={960} y={650} s={0.9 * pop(f, A('c6c') + 4)} n={f >= tw ? 7 : 2} />
          <G2 x={960} y={860} s={pop(f, A('c6c') + 5)}><Text size={40} color={f >= wi ? C.ink : '#B8B0A0'}>no admission of wrongdoing</Text></G2>
          <SourceTag f={f} at={tw} text="FTC press release, Sept 25, 2025: $1B penalty + $1.5B refunds" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const il = w('c6d', 'iliad');
    const gr = w('c6d', 'greek');
    const wr = w('c6d', 'war');
    q(il, 'stamp', 0.7);
    q(gr, 'paper', 0.5);
    q(wr, 'trombone', 0.4);
    const unroll = ease(f, gr - 4, gr + 30, 0.35, 1);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={1100} y={140} s={pop(f, A('c6d')) * bump(il, 0.25)}><Text size={110} color={f >= il ? C.red : '#9C9383'}>"ILIAD"</Text></G2>
          <G2 x={1100} y={260} s={pop(f, A('c6d') + 2)}><Text size={40} color="#5B6470">the cancel process's nickname, per the FTC</Text></G2>
          <G2 x={1100} y={330} s={pop(f, A('c6d') + 3)}>
            <rect x={-300} y={0} width={600} height={700 * unroll} fill="#FFF7E0" stroke={C.ink} strokeWidth={6} />
            {Array.from({length: Math.floor(12 * unroll)}).map((_, i) => <line key={i} x1={-240} x2={i % 3 === 2 ? 120 : 240} y1={50 + i * 55} y2={50 + i * 55} stroke="#C9B98F" strokeWidth={10} strokeLinecap="round" />)}
            <rect x={-330} y={-30} width={660} height={50} rx={25} fill={C.wood} stroke={C.ink} strokeWidth={6} />
          </G2>
          <G2 x={1600} y={900} s={pop(f, A('c6d') + 4)}><Text size={36} color={f >= gr ? C.ink : '#B8B0A0'}>a VERY long Greek poem</Text></G2>
          <Dave f={f} x={380} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: wr, pose: 'facepalm', expr: 'tired', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ru = w('c6e', 'rule');
    const cc = w('c6e', 'click');
    const on6 = w('c6e', 'one');
    const es = w('c6e', 'easy');
    q(ru, 'paper', 0.5);
    q(cc, 'click', 0.7);
    q(on6, 'click', 0.6);
    q(es, 'ding', 0.6);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Contract x={380} y={560} s={0.9 * pop(f, A('c6e')) * bump(ru, 0.08)} lines={['FTC RULE (2024)', '"CLICK TO CANCEL"', 'easy in =', 'easy out']} />
          <BigButton x={1000} y={520} s={0.9 * pop(f, A('c6e') + 2)} press={f >= on6 && f < on6 + 8 ? 1 : 0} label="SIGN UP" />
          <G2 x={1000} y={780} s={pop(f, A('c6e') + 3)}><Text size={44}>1 click</Text></G2>
          <BigButton x={1500} y={520} s={0.9 * pop(f, A('c6e') + 4) * bump(es, 0.12)} press={f >= es && f < es + 8 ? 1 : 0} label="CANCEL" />
          <G2 x={1500} y={780} s={pop(f, A('c6e') + 5)}><Text size={44} color={f >= es ? C.green : '#9C9383'}>{f >= es ? '1 click too ✓' : '? clicks'}</Text></G2>
          <G2 x={1250} y={180} s={pop(f, A('c6e') + 6) * bump(cc, 0.1)}><Text size={60} color={f >= cc ? C.blue : '#9C9383'}>"click to cancel"</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const su = w('c6f', 'sued');
    const ct = w('c6f', 'court');
    const th = w('c6f', 'threw');
    const sk = w('c6f', 'skipped');
    q(su, 'paper', 0.5);
    q(ct, 'thud', 0.6);
    q(th, 'rip', 0.7);
    q(sk, 'buzz', 0.5);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Contract x={900} y={520} s={0.9 * pop(f, A('c6f')) * (f >= th ? 1 - 0.1 * on(th) : 1)} r={f >= th ? -8 * on(th) : 0} lines={['FTC RULE (2024)', '"CLICK TO CANCEL"', 'start: July 2025']} />
          <Stamp x={900} y={560} s={pop(f, A('c6f') + 2) * bump(th, 0.3)} o={f >= th ? 1 : 0.18} text="VACATED" size={80} color={C.red} r={-10} />
          {[0, 1].map((i) => (
            <Banker key={i} f={f} x={260 + i * 200} y={880} s={0.9 * pop(f, A('c6f') + 3)} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: su, pose: 'point_r', expr: 'angry', look: 0.6}]} />
          ))}
          <G2 x={360} y={420} s={pop(f, A('c6f') + 4)}><Text size={40} color={f >= su ? C.ink : '#9C9383'}>business groups: sue</Text></G2>
          <G2 x={1500} y={330} s={pop(f, A('c6f') + 5) * bump(ct, 0.1)}>
            <rect x={-250} y={-90} width={500} height={180} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-25} size={38}>8th Circuit court</Text>
            <Text y={35} size={38} color={f >= ct ? C.red : '#9C9383'}>July 8, 2025</Text>
          </G2>
          <G2 x={1500} y={620} s={pop(f, A('c6f') + 6) * bump(sk, 0.12)}><Text size={40} color={f >= sk ? C.red : '#9C9383'}>reason: a required step skipped</Text></G2>
          <SourceTag f={f} at={ct} text="U.S. Court of Appeals, 8th Cir., July 8, 2025 (procedural grounds)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mr = w('c6g', 'march');
    const sp = w('c6g', 'supporters');
    const cr = w('c6g', 'critics');
    const bo = w('c6g', 'both');
    q(mr, 'flip', 0.5);
    q(sp, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(bo, 'ding', 0.6);
    const tilt = f < sp ? 0 : f < cr ? ease(f, sp, sp + 14, 0, -10) : f < bo ? ease(f, cr, cr + 14, -10, 10) : ease(f, bo, bo + 14, 10, 0);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Scale x={960} y={960} s={pop(f, A('c6g'))} tilt={tilt} left="protects shoppers" right="costs + red tape" />
          <Calendar x={260} y={260} s={0.7 * pop(f, A('c6g') + 2) * bump(mr, 0.15)} top="FTC RESTART" year="Mar 2026" flip={0} />
          <G2 x={500} y={500} s={pop(f, A('c6g') + 3)}><Text size={44} color={f >= sp ? C.green : '#9C9383'}>supporters</Text></G2>
          <G2 x={1420} y={500} s={pop(f, A('c6g') + 4)}><Text size={44} color={f >= cr ? C.red : '#9C9383'}>critics</Text></G2>
          <G2 x={1500} y={200} s={pop(f, A('c6g') + 5) * bump(bo, 0.12)}><Text size={48} color={f >= bo ? C.blue : '#9C9383'}>now you know both sides</Text></G2>
          <SourceTag f={f} at={mr} text="FTC advance notice of proposed rulemaking, Mar 13, 2026" until={sp + 60} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 ============
  {
    const prices = ['$7.99', '$8.99', '$9.99', '$10.99', '$12.99', '$13.99', '$15.49', '$17.99', '$19.99'];
    const el = w('c7b', 'eleven');
    const tt = w('c7b', 'twenty', 2);
    const tw = w('c7c', 'two');
    const jp = w('c7c', 'jump');
    const dn = w('c7d', 'down');
    const cl = w('c7d', 'climbed');
    q(el, 'pop', 0.5);
    q(tt, 'ding', 0.6);
    q(tw, 'stamp', 0.6);
    q(jp, 'boing', 0.5);
    q(dn, 'pop2', 0.5);
    q(cl, 'thud', 0.5);
    const hl = f < el ? -1 : f < tt ? 0 : Math.min(8, Math.floor(lin(f, tt, tt + 40, 0, 8.99)));
    const step = Math.max(0, hl);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, A('c7a'))}><Text size={52}>Netflix standard plan, U.S. (2011 → 2026)</Text></G2>
          <Stairs x={260} y={960} s={pop(f, A('c7a') + 2)} labels={prices} hl={hl} h={75} w={160} />
          <Dave f={f} x={260 + step * 160 + 80} y={960 - (step + 1) * 75} s={0.55} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: dn, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <G2 x={520} y={300} s={pop(f, A('c7a') + 4) * bump(tw, 0.2)} o={lt(tw, 0.35)}><Text size={90} color={C.red}>×2.5</Text></G2>
          <G2 x={520} y={400} s={pop(f, A('c7a') + 5) * bump(jp, 0.12)}><Text size={40} color={f >= jp ? C.ink : '#9C9383'}>each step: just $1–2</Text></G2>
          <G2 x={520} y={480} s={pop(f, A('c7a') + 6)}><Text size={40} color={f >= cl ? C.red : '#B8B0A0'}>look how high!</Text></G2>
          <SourceTag f={f} at={el} text="Netflix U.S. Standard: $7.99 (2011) → $19.99 (Mar 2026), CNBC" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fa = w('c7e', 'fair');
    const cs = w('c7e', 'costs');
    const kn = w('c7e', 'know');
    const tw = w('c7e', 'two');
    q(fa, 'pop', 0.5);
    q(kn, 'pop', 0.5);
    q(tw, 'coin', 0.6);
    const tilt = f < cs ? 0 : f < kn ? ease(f, cs, cs + 14, 0, -8) : ease(f, kn, kn + 14, -8, 8);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Scale x={960} y={960} s={pop(f, A('c7e'))} tilt={tilt} left="shows cost more" right="people won't leave" />
          <G2 x={960} y={130} s={pop(f, A('c7e') + 2) * bump(fa, 0.1)}><Text size={60}>to be fair...</Text></G2>
          <G2 x={450} y={420} s={pop(f, A('c7e') + 3)} o={lt(cs, 0.5)}><Text size={44}>more to watch</Text></G2>
          <G2 x={1470} y={420} s={pop(f, A('c7e') + 4) * bump(tw, 0.2)} o={lt(kn, 0.5)}><PriceTag text="+$2" color={C.yellow} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rc = w('c7f', 'raccoon');
    const gr = w('c7f', 'grab');
    const lt2 = w('c7f', 'little');
    q(rc, 'pop', 0.6);
    q(lt2, 'coin', 0.6);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Raccoon f={f} x={1100} y={640} s={1.1 * pop(f, A('c7f')) * bump(rc, 0.1)} mood={f >= lt2 ? 'greedy' : 'sneaky'} grab={f >= lt2 ? ease(f, lt2, lt2 + 12) : 0} holdCoin={f >= lt2} />
          <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: lt2, pose: 'shock', expr: 'worried', look: 0.8}]} />
          <G2 x={1550} y={300} s={pop(f, A('c7f') + 3)}><Text size={48} color={f >= gr ? C.ink : '#9C9383'}>not the whole wallet...</Text></G2>
          <G2 x={1550} y={400} s={pop(f, A('c7f') + 4) * bump(lt2, 0.2)}><Text size={52} color={f >= lt2 ? C.red : '#9C9383'}>+ a little every year</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 ============
  {
    const gy = w('c8a', 'gym');
    const ei = w('c8b', 'eight');
    const sv = w('c8b', 'seventy');
    const fo = w('c8b', 'four');
    q(gy, 'clank', 0.6);
    q(ei, 'paper', 0.5);
    q(sv, 'coin', 0.6);
    q(fo, 'ding', 0.6);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <GymBuilding x={560} y={700} s={pop(f, A('c8a')) * bump(gy, 0.05)} />
          <Dumbbell x={560} y={250} s={0.6 * pop(f, A('c8a') + 2)} />
          <G2 x={1400} y={420} s={pop(f, A('c8a') + 3)}>
            <rect x={-360} y={-230} width={720} height={460} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-160} size={36} color="#5B6470">{f >= ei ? '7,752 members · 3 U.S. gyms' : 'gym study'}</Text>
            <Text x={-320} y={-60} size={44} anchor="start">monthly fee:</Text>
            <Text x={320} y={-60} size={50} anchor="end" color={f >= sv ? C.red : '#9C9383'}>{f >= sv ? '$70+' : '?'}</Text>
            <Text x={-320} y={60} size={44} anchor="start">visits a month:</Text>
            <Text x={320} y={60} size={70} anchor="end" color={f >= fo ? C.red : '#9C9383'}>{f >= fo ? '4.3' : '?'}</Text>
          </G2>
          <Dave f={f} x={1000} y={822} s={0.9} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: fo, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <SourceTag f={f} at={ei} text="DellaVigna & Malmendier, American Economic Review (2006)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('c8c', 'seventeen');
    const tn = w('c8c', 'ten', 1);
    const sx = w('c8d', 'six');
    const pn = w('c8d', 'paying');
    q(sv, 'cash', 0.6);
    q(tn, 'coin', 0.5);
    q(sx, 'stamp', 0.7);
    q(pn, 'trombone', 0.4);
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={250} y1={860} x2={1150} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={480} y={860} h={ease(f, sv - 4, sv + 14, 40, 17 * 28)} color={C.red} label="membership, per visit" value={f >= sv ? '$17+' : '?'} w={260} />
          <Bar x={920} y={860} h={ease(f, tn - 4, tn + 14, 40, 10 * 28)} color={C.green} label="10-visit pass" value={f >= tn ? '$10' : '?'} w={260} />
          <G2 x={1500} y={330} s={pop(f, A('c8c') + 3) * bump(sx, 0.15)} o={lt(sx, 0.45)}>
            <rect x={-260} y={-110} width={520} height={220} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-45} size={34} color="#5B6470">extra paid, on average</Text>
            <Text y={45} size={80} color={C.red}>{f >= sx ? '≈ $600' : '?'}</Text>
          </G2>
          <G2 x={1500} y={600} s={pop(f, A('c8c') + 5) * bump(pn, 0.1)}><Text size={44} color={f >= pn ? C.ink : '#9C9383'}>"Paying Not to Go to the Gym"</Text></G2>
          <Dave f={f} x={1500} y={1010} s={0.6} keys={[{at: 0, pose: 'facepalm', expr: 'tired'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fu = w('c8e', 'future');
    const dr = w('c8e', 'dream');
    q(fu, 'dream', 0.5);
    q(dr, 'cash', 0.5);
    scene(A('c8e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'happy', look: 0.8}]} />
          <Thought x={1150} y={400} s={pop(f, A('c8e')) * bump(fu, 0.06)} w={760} h={520} tx={-480} ty={330}>
            <Stick f={f} x={-100} y={170} s={0.75} acc={['hair']} seed={7} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            <Dumbbell x={160} y={20} s={0.6} />
            <Text y={-170} size={40} color={f >= fu ? C.blue : '#9C9383'}>future Dave: every morning!</Text>
          </Thought>
          <G2 x={1300} y={900} s={pop(f, A('c8e') + 3) * bump(dr, 0.15)}><Text size={48} color={f >= dr ? C.red : '#9C9383'}>the gym gets paid by the dream</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ev = w('c8f', 'evil');
    const lo = w('c8f', 'lot');
    const pr = w('c8f', 'problem');
    q(ev, 'pop', 0.5);
    q(lo, 'ding', 0.5);
    q(pr, 'buzz', 0.5);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={pop(f, A('c8f')) * bump(ev, 0.1)}><Text size={60}>subscriptions aren't evil</Text></G2>
          <G2 x={560} y={520} s={pop(f, A('c8f') + 2) * bump(lo, 0.08)} o={lt(lo, 0.5)}>
            <Frame w={620} h={460} label="use it a lot">
              <Text y={-40} size={120} color={C.green}>✓</Text>
              <Text y={80} size={40}>can be the cheapest way</Text>
            </Frame>
          </G2>
          <G2 x={1360} y={520} s={pop(f, A('c8f') + 3) * bump(pr, 0.08)} o={lt(pr, 0.5)}>
            <Frame w={620} h={460} label="don't use it">
              <XMark y={-40} s={0.8} />
              <Text y={80} size={40}>paying for nothing</Text>
            </Frame>
          </G2>
          <Dave f={f} x={960} y={1010} s={0.6} keys={[{at: 0, pose: 'shrug', expr: 'think'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const cn = w('c9c', 'cancel');
    const dc = w('c9e', 'declined');
    q(cn, 'rip', 0.5);
    q(dc, 'buzz', 0.5);
    const items = ['List 3 months of statements', 'Used it? Would I rejoin?', 'Trial reminder: 2 days before', 'Virtual card numbers', 'Rotate streaming'];
    const cur = hs.filter((x) => f >= x - 6).length;
    const S0 = A('c9a');
    scene(S0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={100} s={pop(f, S0)}><Text size={56}>Dave's subscription audit</Text></G2>
          <G2 x={620} y={160} s={pop(f, S0 + 2)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={270 + i * 150} s={0.8 * pop(f, S0 + 3 + i)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.6 : 0.15} color={C.green} w={1080} />)}
          <G2 x={1560} y={520}>
            {cur === 0 && <Dave f={f} x={0} y={380} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
            {cur === 1 && <Paper id="stm" x={0} y={0} s={pop(f, hs[0] - 6)} text="STATEMENT" reveal={1} size={50} w={420} h={520} />}
            {cur === 2 && (
              <g transform={`scale(${pop(f, hs[1] - 6)})`}>
                <SubTile y={-120} name="FitApp" price="$14.99" color={C.green} cut={ease(f, cn, cn + 12)} />
                <SubTile y={60} name="MealBox" price="$59.99" color={C.gold} cut={ease(f, cn + 6, cn + 18)} />
                <Text y={220} size={40} color={f >= cn ? C.red : '#9C9383'}>not used → cancel</Text>
              </g>
            )}
            {cur === 3 && <Calendar s={0.9 * pop(f, hs[2] - 6)} top="REMINDER" year="2 days left" flip={0} />}
            {cur === 4 && (
              <g transform={`scale(${pop(f, hs[3] - 6)})`}>
                <CreditCard s={0.9} label="VIRTUAL" />
                <Text y={200} size={40}>limit: $0 · switch off</Text>
                <Text y={260} size={44} color={f >= dc ? C.red : '#9C9383'}>trial → DECLINED</Text>
              </g>
            )}
            {cur === 5 && (
              <g transform={`scale(${pop(f, hs[4] - 6)})`}>
                {[0, 1, 2].map((i) => <rect key={i} x={-260 + i * 180} y={-80} width={160} height={120} rx={14} fill={i === Math.floor(f / 45) % 3 ? C.blue : '#E3E8EE'} stroke={C.ink} strokeWidth={5} />)}
                <Text y={120} size={40}>one at a time</Text>
              </g>
            )}
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fo = w('c9g', 'four');
    const on9 = w('c9g', 'one');
    const ct = w('c9g', 'cat');
    q(fo, 'stamp', 0.6);
    q(on9, 'cash', 0.7);
    q(ct, 'pop', 0.5);
    const kept = [1, 3, 5, 8];
    const cutAt = TILES.map((_, i) => (kept.includes(i) ? 0 : A('c9g') + 10 + i * 3));
    scene(A('c9g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Grid x0={620} y0={260} litAt={TILES.map(() => 0)} cutAt={cutAt} sc={0.85} />
          <G2 x={1000} y={780} s={pop(f, A('c9g') + 3) * bump(fo, 0.2)}><Text size={90} color={f >= fo ? C.green : '#9C9383'}>{f >= fo ? '11 → 4' : '11 → ?'}</Text></G2>
          <G2 x={1000} y={900} s={pop(f, A('c9g') + 4) * bump(on9, 0.2)}><Text size={56} color={f >= on9 ? C.green : '#9C9383'}>{f >= on9 ? '+ $120 a month' : '+ $?'}</Text></G2>
          <Dave f={f} x={260} y={900} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: on9, pose: 'celebrate', expr: 'grin'}]} />
          <Cat f={f} x={1650} y={880} s={0.7 * pop(f, A('c9g') + 5) * bump(ct, 0.15)} mood="happy" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Steady money → investors pay more', 'Trials, dark patterns, price steps', 'Audit · reminders · virtual cards'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('d1a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={330} y={360 + i * 170} s={pop(f, A('d1a') + 4 + i * 2)} n={i + 1} text={b} lit={f >= r[i] - 4 ? 1 : 0.2} color={C.blue} w={1260} />)}
          <Dave f={f} x={180} y={1000} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('d2a', 'savings');
    const zr = w('d2a', 'zero');
    const wh = w('d2a', 'where');
    const sb = w('d2b', 'subscribe');
    const cn = w('d2b', 'cancel');
    q(sv, 'pop', 0.5);
    q(zr, 'trombone', 0.5);
    q(wh, 'pop2', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(cn, 'ding', 0.5);
    scene(A('d2a'), () =>
      f < A('d2b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('d2a'))}><Text size={56}>Next: why your bank pays you almost nothing</Text></G2>
            <Phone x={1000} y={540} s={1.3 * pop(f, A('d2a') + 2) * bump(zr, 0.15)} title="SAVINGS" value={f >= zr ? '0.01%' : '?%'} color={f >= zr ? C.red : C.ink} />
            <Bank x={1550} y={700} s={0.5 * pop(f, A('d2a') + 3)} label="BANK" />
            <Banker f={f} x={1550} y={940} s={0.7 * pop(f, A('d2a') + 4)} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
            <Dave f={f} x={380} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: zr, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={1000} y={900} s={pop(f, A('d2a') + 5)}><Text size={44} color={f >= wh ? C.ink : '#9C9383'}>so where does the money go?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, A('d2b'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, A('d2b') + 3)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={960} y={760} s={pop(f, A('d2b') + 5) * bump(cn, 0.12)}><Text size={48} color={f >= cn ? C.green : '#9C9383'}>free · easy to cancel</Text></G2>
            <Cat f={f} x={1500} y={880} s={0.6} mood="happy" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4d', 'year') + 20;
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
