import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Car, Coin, Sparkle, SourceTag, Stamp, Text, XMark, Monitor} from '../props';
import {Frame, Magnifier, Phone, Row, SubButton, Bell} from '../props2';
import {Coffee, HospitalBill, Person, PriceTag, Raccoon} from '../props3';
import {House} from '../props4';
import {Contract} from '../props5';
import {MemberCard, Receipt, Scale, ScoreGauge, SlicePie} from '../props8';
import {Pot, Bumper, BlueCar} from '../props18';
import {Couch, StormCloud} from '../props19';
import {Suv} from '../props23';
import {Hourglass} from '../props30';
import {CoffeeSign, Cookie, Gavel37, Hailstone, Lobster, MapPin, Radar, RenewalLetter, Salad, Windshield} from '../props37';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Agent: React.FC<SP> = (p) => <Stick acc={['ponytail', 'glasses']} seed={46} {...p} />;
const Lawyer: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={88} {...p} />;
const Tech: React.FC<SP> = (p) => <Stick acc={['cap']} seed={92} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const Panel: React.FC<{x: number; y: number; w: number; h?: number; title: string; value: string; color?: string; s?: number; o?: number; size?: number; fill?: string}> = ({x, y, w, h = 200, title, value, color = C.ink, s = 1, o = 1, size = 80, fill}) => (
  <G2 x={x} y={y} s={s} o={o}>
    <Box w={w} h={h} fill={fill} />
    <Text y={-h / 2 + 40} size={30} color={GRAY} ls={2}>{title}</Text>
    <Text y={24} size={size} color={color}>{value}</Text>
  </G2>
);

const Check: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M -30 0 l 22 22 l 44 -48" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
);

const UpArrow: React.FC<{x: number; y: number; s?: number; color?: string}> = ({x, y, s = 1, color = C.red}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M 0 -60 L 44 0 L 18 0 L 18 60 L -18 60 L -18 0 L -44 0 Z" fill={color} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
);

const VBar: React.FC<{x: number; base: number; h: number; w?: number; color: string; label: string; value: string; s?: number}> = ({x, base, h, w = 220, color, label, value, s = 1}) => (
  <G2 x={x} y={base} s={s}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={14} fill={color} stroke={C.ink} strokeWidth={6} />
    <Text y={-h - 40} size={52} color={color === '#C9CED6' ? GRAY : C.ink}>{value}</Text>
    <Text y={50} size={36}>{label}</Text>
  </G2>
);

export const Ep37: React.FC = () => {
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
  const P = (id: string, d = 0) => pop(f, A(id) + 2 + d);
  const lit = (at: number) => (f >= at ? 1 : 0.35);
  const bump = (at: number, k = 0.16) => (f < at ? 1 : 1 + k * Math.sin(Math.min(1, (f - at) / 14) * Math.PI));
  const V = (at: number, v: string) => (f >= at ? v : '?');

  // ============ COLD OPEN ============
  {
    const op = w('o1', 'opens');
    const ac = w('o1', 'accidents');
    const tk = w('o1', 'tickets');
    const sc = w('o1', 'scratch');
    q(op, 'paper', 0.6);
    q(ac, 'ding', 0.5);
    q(tk, 'ding', 0.5);
    q(sc, 'ding', 0.6);
    const items: [string, number][] = [['no accidents', ac], ['no tickets', tk], ['not even a scratch', sc]];
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <BlueCar x={1480} y={800} s={1.6 * pop(f, 2)} f={f} />
          <Dave f={f} x={420} y={822} s={1.2 * pop(f, 3)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sc, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
          <G2 x={760} y={430} s={0.62 * pop(f, 4) * bump(op, 0.1)} r={-4}><RenewalLetter old="$1,800" now="?" /></G2>
          {items.map(([l, at], i) => (
            <G2 key={l} x={1480} y={170 + i * 110} s={pop(f, 5 + i * 2) * bump(at)} o={lit(at)}>
              <Box w={560} h={90} fill={f >= at ? '#E3F6EC' : '#fff'} />
              <Text x={-20} size={40}>{l}</Text>
              {f >= at && <Check x={230} y={0} s={0.8} />}
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const eh = w('o2', 'eighteen');
    const ty = w('o2', 'twenty');
    q(eh, 'coin', 0.6);
    q(ty, 'thud', 0.8);
    q(ty + 8, 'boing', 0.5);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <RenewalLetter x={960} y={560} s={1.25 * P('o2') * bump(ty, 0.06)} old={V(eh, '$1,800')} now={V(ty, '$2,200')} hl={f >= ty ? 1 : 0} />
          <Dave f={f} x={360} y={900} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: ty, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= ty} />
          <UpArrow x={1500} y={560} s={1.4 * P('o2', 3) * bump(ty, 0.3)} color={f >= ty ? C.red : '#C9CED6'} />
          <Stamp x={1560} y={300} s={pop(f, ty + 6, 9, 260)} text="+$400" size={70} color={C.red} r={-8} />
          <G2 x={1540} y={820} s={P('o2', 4)}><Text size={44} color={GRAY}>same car · same driver</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const al = w('o3', 'alone');
    const fy = w('o3', 'fifty');
    const db = w('o3', 'double');
    const inf = w('o3', 'inflation');
    q(al, 'crowd', 0.4);
    q(fy, 'thud', 0.7);
    q(db, 'boing', 0.5);
    q(inf, 'pop', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o3')}><Text size={54}>price change, Aug 2021 → Aug 2026</Text></G2>
          <line x1={700} y1={820} x2={1500} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <VBar x={900} base={820} h={ease(f, fy - 4, fy + 16, 60, 500)} color={C.red} label="car insurance" value={V(fy, '+50%')} s={P('o3', 2)} />
          <VBar x={1300} base={820} h={ease(f, inf - 4, inf + 16, 60, 220)} color="#9AA5B1" label="everything else" value={V(inf, '+22%')} s={P('o3', 3)} />
          {Array.from({length: 6}).map((_, i) => <Person key={i} x={120 + (i % 3) * 130} y={i < 3 ? 560 : 820} s={0.6 * P('o3', 3 + i) * bump(al)} c={f >= al ? C.red : C.ink} />)}
          <G2 x={250} y={320} s={P('o3', 4)} o={lit(al)}><Text size={44}>not just Dave</Text></G2>
          <G2 x={1720} y={380} s={P('o3', 5) * bump(db)} o={lit(db)}><Box w={300} h={120} fill={C.yellow} /><Text size={44}>2x+</Text></G2>
          <SourceTag f={f} at={fy} text="BLS CPI-U: motor vehicle insurance +49.8%, all items +22.4% (Aug 2021 → Aug 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wd = w('o4', 'weird');
    const nt = w('o4', 'nothing');
    const dr = w('o4', 'drive');
    q(wd, 'sting', 0.5);
    q(nt, 'buzz', 0.6);
    q(dr, 'pop', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P('o4') * bump(wd)}><Text size={56}>what goes into YOUR price?</Text></G2>
          <Scale x={960} y={900} s={P('o4', 2)} tilt={ease(f, nt - 4, nt + 16, 0, 12)} left="how you drive" right="other stuff" />
          <G2 x={660} y={560} s={0.7 * P('o4', 3) * bump(dr)}><BlueCar f={f} /></G2>
          <G2 x={1260} y={620} s={P('o4', 4) * bump(nt)}><Text size={120} color={f >= nt ? C.red : GRAY}>?</Text></G2>
          <Dave f={f} x={240} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: nt, pose: 'shock', expr: 'shock', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('o5', 'credit');
    const zp = w('o5', 'zip');
    const sh = w('o5', 'shop');
    q(cr, 'pop', 0.6);
    q(zp, 'pop', 0.6);
    q(sh, 'boing', 0.6);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Frame x={380} y={540} s={P('o5') * bump(cr)} o={lit(cr)} w={480} h={600} label="your credit">
            <ScoreGauge s={0.75} y={40} score={f >= cr ? 580 : 720} label="SCORE" />
          </Frame>
          <Frame x={960} y={540} s={P('o5', 2) * bump(zp)} o={lit(zp)} w={480} h={600} label="your ZIP code">
            <House s={0.28} y={60} />
            <MapPin y={-60} s={0.9} />
          </Frame>
          <Frame x={1540} y={540} s={P('o5', 4) * bump(sh)} o={lit(sh)} w={480} h={600} label="will you shop around?">
            <Magnifier s={0.8} y={-20} />
            <Text y={140} size={60} color={C.red}>?</Text>
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const words = ['pot', 'bumper', 'crashes', 'storms', 'scores', 'loyalty', 'fights'];
    const pv = words.map((x) => w('o6', x));
    pv.forEach((x) => q(x, 'stamp', 0.45));
    const labels = ['THE POT', 'THE BUMPER', 'CRASHES', 'STORMS', 'SECRET SCORES', 'LOYALTY PENALTY', 'FIGHT BACK'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={110} size={60} color={GRAY}>TODAY</Text>
          {labels.map((l, i) => {
            const row = i < 4 ? 0 : 1;
            const col = row ? i - 4 : i;
            const x = row ? 480 + col * 480 : 300 + col * 440;
            return (
              <Frame key={l} x={x} y={row ? 780 : 400} s={0.9 * P('o6', i * 2) * bump(pv[i])} o={lit(pv[i])} w={400} h={330} label={l}>
                {i === 0 && <Pot s={0.45} y={-20} level={0.6} />}
                {i === 1 && <Bumper s={0.45} y={-10} sensors={1} />}
                {i === 2 && <BlueCar s={0.8} y={-20} f={f} dent />}
                {i === 3 && <StormCloud s={0.45} y={-40} f={f} />}
                {i === 4 && <ScoreGauge s={0.4} y={0} score={600} label="" />}
                {i === 5 && <MemberCard s={0.5} y={-30} tier="LOYAL" price="+$$" />}
                {i === 6 && <Dave f={f} x={0} y={90} s={0.5} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />}
              </Frame>
            );
          })}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Renewal letter ============
  {
    const sc = w('c1a', 'car');
    const sd = w('c1a', 'driver');
    const cm = w('c1a', 'commute');
    const fh = w('c1b', 'four');
    const tt = w('c1b', 'twenty');
    const wr = w('c1b', 'wrong');
    const ins = w('c1c', 'insurify');
    const tw = w('c1c', 'two');
    const eg = w('c1d', 'eighty');
    const sec = w('c1d', 'second');
    const own = w('c1d', 'own');
    const ra = w('c1e', 'rates');
    const dn = w('c1e', 'didnt');
    const kn = w('c1e', 'know');
    const ex = w('c1f', 'explain');
    const bg = w('c1f', 'bigger');
    const du = w('c1f', 'due');
    q(sc, 'pop', 0.4);
    q(sd, 'pop', 0.4);
    q(cm, 'pop', 0.4);
    q(fh, 'cash', 0.6);
    q(tt, 'thud', 0.6);
    q(wr, 'buzz', 0.5);
    q(ins, 'paper', 0.5);
    q(tw, 'ding', 0.6);
    q(eg, 'coin', 0.6);
    q(sec, 'boing', 0.5);
    q(ra, 'pop', 0.5);
    q(dn, 'boing', 0.6);
    q(kn, 'trombone', 0.5);
    q(ex, 'paper', 0.5);
    q(bg, 'thud', 0.5);
    q(du, 'stamp', 0.6);
    const same: [string, number][] = [['same car', sc], ['same driver', sd], ['same boring commute', cm]];
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: wr, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <RenewalLetter x={820} y={520} s={0.95 * P('c1a')} old="$1,800" now="$2,200" hl={f >= fh ? 1 : 0} />
            {same.map(([l, at], i) => (
              <G2 key={l} x={1480} y={220 + i * 120} s={P('c1a', 2 + i * 2) * bump(at)} o={lit(at)}>
                <Box w={560} h={96} />
                <Text size={40}>{l}</Text>
              </G2>
            ))}
            <Panel x={1480} y={720} w={560} h={220} title="THE JUMP" value={f >= tt ? '+22%' : V(fh, '+$400')} color={C.red} size={96} s={P('c1a', 6) * bump(f >= tt ? tt : fh)} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c1c')}><Text size={54}>what a normal driver pays (full coverage)</Text></G2>
            <Panel x={560} y={420} w={640} h={240} title="AVERAGE PER YEAR" value={V(tw, '$2,240')} color={C.red} size={110} s={P('c1c', 2) * bump(tw)} />
            <Panel x={560} y={720} w={640} h={220} title="PER MONTH" value={V(eg, '$187')} color={C.red} size={100} s={P('c1c', 4) * bump(eg)} />
            <G2 x={1400} y={560} s={P('c1c', 3)}><BlueCar s={1.8} f={f} /></G2>
            <G2 x={1400} y={300} s={P('c1c', 5) * bump(sec)} o={lit(sec)}><Bubble text="a 2nd car payment?!" size={42} tail="down" /></G2>
            <G2 x={1400} y={820} s={P('c1c', 6)} o={lit(own)}><Text size={40} color={GRAY}>...for a car you already own</Text></G2>
            <SourceTag f={f} at={ins} text="Insurify, Sept 2026: full coverage ≈ $187/mo ≈ $2,244/yr" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={340} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: dn, pose: 'shock', expr: 'shock', look: 0.8}, {at: kn, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
            <Phone x={560} y={520} s={0.6 * P('c1e')} title="CALLING..." value="INSURER" />
            <Agent f={f} x={1560} y={880} s={1.1 * P('c1e', 2)} keys={[{at: 0, pose: 'talk', expr: 'happy', look: -0.8}, {at: kn, pose: 'shrug', expr: 'smug', look: -0.8}]} />
            <G2 x={1320} y={300} s={P('c1e', 3) * bump(ra)}><Bubble text={'Rates went up\nin your area.'} size={40} tail="right" /></G2>
            <G2 x={640} y={200} s={P('c1e', 4) * bump(dn)} o={lit(dn)}><Bubble text="But I didn't do anything!" size={40} tail="down" /></G2>
            <G2 x={1320} y={520} s={P('c1e', 5) * bump(kn)} o={lit(kn)}><Bubble text="I know." size={44} tail="right" /></G2>
            <G2 x={960} y={700} s={0.55 * P('c1e', 6) * bump(bg, 0.1)} o={lit(ex)}><RenewalLetter old="$1,800" now="$2,200" hl={1} title="NO EXPLANATION" /></G2>
            <Calendar x={1060} y={260} s={0.4 * P('c1e', 7) * bump(du)} top="DUE" year="NOV 1" flip={0} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Pot ============
  {
    const iv = w('c2a', 'insurance');
    const pt = w('c2b', 'pot');
    const cr = w('c2b', 'crashes');
    const ev = w('c2c', 'everybodys');
    const gr = w('c2c', 'group');
    const em = w('c2d', 'emptied');
    const rf = w('c2d', 'refill');
    const cd = w('c2d', 'careful');
    const ed = w('c2d', 'dave');
    const rb = w('c2g', 'restaurant');
    const sl = w('c2g', 'salad');
    const lb = w('c2g', 'lobster');
    const sh = w('c2g', 'share');
    const gv = w('c2e', 'government');
    const ff = w('c2e', 'fifty');
    const tw = w('c2e', 'twenty');
    const dp = w('c2f', 'dipped');
    const mu = w('c2f', 'much');
    q(iv, 'flip', 0.5);
    q(pt, 'coin', 0.6);
    q(cr, 'thud', 0.6);
    q(ev, 'crowd', 0.4);
    q(gr, 'pop', 0.5);
    q(em, 'whoosh', 0.5);
    q(rf, 'coin', 0.6);
    q(cd, 'pop', 0.4);
    q(ed, 'boing', 0.5);
    q(rb, 'pop', 0.5);
    q(sl, 'pop', 0.5);
    q(lb, 'boing', 0.6);
    q(sh, 'cash', 0.6);
    q(gv, 'paper', 0.5);
    q(ff, 'thud', 0.7);
    q(tw, 'pop', 0.5);
    q(dp, 'whoosh_s', 0.5);
    q(mu, 'trombone', 0.4);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2a') * bump(iv)}><Text size={52}>the village pot (from our insurance video)</Text></G2>
            <Pot x={960} y={560} s={1.1 * P('c2a', 2) * bump(pt, 0.08)} level={f >= cr ? 0.45 : 0.75} coins={f >= pt ? 6 : 3} />
            {Array.from({length: 6}).map((_, i) => {
              const L = i < 3;
              return <Person key={i} x={L ? 200 + i * 130 : 1420 + (i - 3) * 130} y={880} s={0.6 * P('c2a', 3 + i)} c={i === 1 ? C.blue : C.ink} />;
            })}
            {f >= pt && [0, 1, 2, 3].map((i) => <Coin key={i} x={lin(f, pt + i * 5, pt + 20 + i * 5, i < 2 ? 330 : 1550, 900 + (i - 1.5) * 60)} y={lin(f, pt + i * 5, pt + 20 + i * 5, 700, 440)} s={0.5} />)}
            <G2 x={1560} y={420} s={0.8 * P('c2a', 4) * bump(cr)} o={lit(cr)}><BlueCar f={f} dent={f >= cr} shake={f >= cr && f < cr + 20 ? 1 : 0} /></G2>
            <G2 x={1560} y={300} s={P('c2a', 5)} o={lit(cr)}><Text size={38} color={C.red}>crash → paid from the pot</Text></G2>
            <Dave f={f} x={330} y={500} s={0.6} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Pot x={960} y={600} s={1.1 * P('c2c')} level={f < em ? 0.7 : f < rf ? ease(f, em, em + 20, 0.7, 0.15) : ease(f, rf, rf + 30, 0.15, 0.7)} coins={f >= rf ? 8 : 0} />
            <G2 x={960} y={130} s={P('c2c', 2) * bump(ev)}><Text size={52}>{f >= ev ? "Dave pays for EVERYBODY'S crashes" : "Dave pays for his own crashes?"}</Text></G2>
            {[0, 1, 2].map((i) => <G2 key={i} x={1480 + (i % 2) * 180} y={380 + i * 170} s={0.55 * P('c2c', 3 + i)} o={lit(gr)}><Car s={1} /></G2>)}
            <G2 x={1560} y={880} s={P('c2c', 5)} o={lit(gr)}><Text size={40}>his group's crashes</Text></G2>
            <Dave f={f} x={340} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: rf, pose: 'carry', expr: 'tired', look: 0.8}, {at: ed, pose: 'shock', expr: 'worried', look: 0.8}]} sweat={f >= ed} />
            <G2 x={960} y={880} s={P('c2c', 6)} o={lit(em)}><Text size={44} color={f >= rf ? C.gold : C.red}>{f >= rf ? 'everyone refills it — even careful drivers' : 'emptied faster...'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <rect x={460} y={620} width={1000} height={40} rx={12} fill="#B07A4B" stroke={C.ink} strokeWidth={6} />
            <Salad x={700} y={590} s={P('c2g') * bump(sl)} />
            <Lobster x={1200} y={590} s={P('c2g', 2) * bump(lb, 0.3)} />
            <Dave f={f} x={380} y={880} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sh, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Bob f={f} x={1560} y={880} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: lb, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <G2 x={700} y={480} s={P('c2g', 3)} o={lit(sl)}><Text size={36}>Dave: salad</Text></G2>
            <G2 x={1200} y={480} s={P('c2g', 4)} o={lit(lb)}><Text size={36} color={C.red}>somebody: LOBSTER</Text></G2>
            <G2 x={960} y={230} s={P('c2g', 5) * bump(sh)}><Box w={720} h={140} fill={f >= sh ? '#FDE3EA' : '#fff'} /><Text size={50} color={f >= sh ? C.red : C.ink}>{f >= sh ? 'your share: $20 → $45' : 'split the bill 10 ways'}</Text></G2>
            <G2 x={960} y={330} s={P('c2g', 5)} o={0.8}><Text size={28} color={GRAY}>(example numbers)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={900} y={120} s={P('c2e')}><Text size={52}>5 years of prices (Aug 2021 → Aug 2026)</Text></G2>
            <line x1={500} y1={820} x2={1300} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <VBar x={700} base={820} h={ease(f, ff - 4, ff + 16, 60, 500)} color={C.red} label="car insurance" value={V(ff, '+50%')} s={P('c2e', 2)} />
            <VBar x={1100} base={820} h={ease(f, tw - 4, tw + 16, 60, 220)} color="#9AA5B1" label="everything else" value={V(tw, '+22%')} s={P('c2e', 3)} />
            <Panel x={1620} y={380} w={440} h={200} title="LAST 12 MONTHS" value={V(dp, '−5%')} color={C.green} size={80} s={P('c2e', 4) * bump(dp)} />
            <Dave f={f} x={1620} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: mu, pose: 'shrug', expr: 'tired', look: -0.8}]} />
            <G2 x={1620} y={560} s={P('c2e', 5)} o={lit(mu)}><Text size={36} color={GRAY}>small dip after a big climb</Text></G2>
            <SourceTag f={f} at={gv} text="BLS CPI-U: motor vehicle insurance +49.8% (5 yrs), −5.1% (12 mo to Aug 2026); all items +22.4%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Bumper ============
  {
    const cp = w('c3a', 'computers');
    const pl = w('c3b', 'plastic');
    const fw = w('c3b', 'few');
    const se = w('c3c', 'sensors');
    const ra = w('c3c', 'radar');
    const ca = w('c3c', 'cameras');
    const sf = w('c3c', 'safety');
    const aa = w('c3d', 'aaa');
    const th = w('c3d', 'third');
    const on = w('c3e', 'one');
    const tt = w('c3e', 'thirteen');
    const ck = w('c3e', 'cookie');
    const wn = w('c3g', 'windshield');
    const cm = w('c3g', 'camera');
    const gl = w('c3g', 'glass', 1);
    const tc = w('c3g', 'technician');
    const sh = w('c3f', 'shops');
    const fy = w('c3f', 'forty');
    const tp = w('c3f', 'tap');
    const tw = w('c3f', 'two');
    q(cp, 'key', 0.5);
    q(pl, 'pop', 0.5);
    q(fw, 'coin', 0.5);
    q(se, 'ding', 0.5);
    q(ra, 'ding', 0.5);
    q(ca, 'ding', 0.5);
    q(sf, 'chime', 0.4);
    q(aa, 'paper', 0.5);
    q(th, 'thud', 0.7);
    q(on, 'pop', 0.5);
    q(tt, 'cash', 0.7);
    q(ck, 'boing', 0.6);
    q(wn, 'pop', 0.5);
    q(cm, 'click', 0.6);
    q(gl, 'pop', 0.5);
    q(tc, 'key2', 0.5);
    q(sh, 'pop', 0.5);
    q(fy, 'thud', 0.6);
    q(tp, 'pop2', 0.6);
    q(tw, 'cash', 0.7);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c3a') * bump(cp)}><Text size={56}>cars became computers on wheels</Text></G2>
            <Frame x={560} y={520} s={P('c3a', 2)} w={640} h={520} label="OLD bumper">
              <G2 y={-30} s={0.8 * bump(pl)}><Bumper sensors={0} /></G2>
              <G2 y={100} s={bump(fw)} o={lit(fw)}><PriceTag s={0.9} text="~$300" color={C.green} /></G2>
            </Frame>
            <Frame x={1360} y={520} s={P('c3a', 4)} w={640} h={520} label="NEW bumper">
              <G2 y={-10} s={0.8}><Bumper sensors={1} /></G2>
              <Text y={130} size={72} color={GRAY}>?</Text>
            </Frame>
            <Dave f={f} x={180} y={900} s={0.8} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bumper x={700} y={560} s={1.5 * P('c3c')} sensors={1} />
            {([['sensors', se, 420, 800], ['radar', ra, 700, 800], ['cameras', ca, 700, 300]] as const).map(([l, at, x, y], i) => (
              <G2 key={l} x={x} y={y} s={P('c3c', 2 + i) * bump(at)} o={lit(at)}><Box w={260} h={80} fill={f >= at ? C.yellow : '#fff'} /><Text size={40}>{l}</Text></G2>
            ))}
            <G2 x={1000} y={800} s={P('c3c', 5)} o={lit(sf)}><Text size={38} color={C.green}>brakes & parks by itself</Text></G2>
            <SlicePie x={1480} y={460} s={0.9 * P('c3c', 4) * bump(th, 0.1)} rad={220} t={1} slices={[{v: 0.38, c: C.red, l: f >= th ? 'ADAS' : ''}, {v: 0.62, c: '#C9CED6', l: 'rest'}]} pop={f >= th ? 0 : -1} />
            <Panel x={1480} y={820} w={560} h={180} title="SHARE OF REPAIR BILL" value={V(th, 'up to ~38%')} color={C.red} size={64} s={P('c3c', 6) * bump(th)} />
            <SourceTag f={f} at={aa} text="AAA (2023): ADAS can be ~38% of repair costs after a crash" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c3e')}><Text size={54}>one front radar sensor</Text></G2>
            <Radar x={620} y={500} s={1.8 * P('c3e', 2) * bump(on)} glow={f >= on ? 1 : 0} />
            <Text x={960} y={520} size={90} color={GRAY}>≈</Text>
            <Cookie x={1300} y={500} s={1.8 * P('c3e', 3) * bump(ck, 0.3)} />
            <G2 x={620} y={800} s={P('c3e', 4) * bump(tt)}><PriceTag s={1.3} text={V(tt, 'up to $1,300')} color={C.red} /></G2>
            <G2 x={1300} y={800} s={P('c3e', 5)} o={lit(ck)}><PriceTag s={1.1} text="$2" color={C.green} /></G2>
            <Dave f={f} x={1720} y={900} s={0.85} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: tt, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={tt} text="AAA (2023): front radar sensor $500–$1,300" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Windshield x={760} y={520} s={1.3 * P('c3g') * bump(wn, 0.06)} crack={1} cam={1} />
            <G2 x={760} y={260} s={P('c3g', 2) * bump(cm)} o={lit(cm)}><Box w={380} h={80} fill={C.yellow} /><Text size={38}>camera behind glass</Text></G2>
            <Tech f={f} x={1360} y={822} s={1.1 * P('c3g', 3) * bump(tc, 0.08)} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: tc, pose: 'typing', expr: 'think', look: -0.8}]} />
            {([['new glass', gl], ['+ technician to aim the camera', tc]] as const).map(([l, at], i) => (
              <G2 key={l} x={1480} y={200 + i * 110} s={P('c3g', 4 + i)} o={lit(at)}><Box w={620} h={90} fill={f >= at ? '#FDE3EA' : '#fff'} /><Text size={36}>{l}</Text></G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={120} s={P('c3f')}><Text size={48}>car repair prices, 5 years</Text></G2>
            <line x1={300} y1={820} x2={980} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <VBar x={480} base={820} h={260} color="#9AA5B1" label="2021" value="100" s={P('c3f', 2)} />
            <VBar x={800} base={820} h={ease(f, fy - 4, fy + 16, 270, 380)} color={C.red} label="2026" value={V(fy, '+45%')} s={P('c3f', 3) * bump(sh, 0.05)} />
            <G2 x={1440} y={520} s={0.9 * P('c3f', 4)}><BlueCar s={1.6} f={f} dent={f >= tp} shake={f >= tp && f < tp + 16 ? 1 : 0} /></G2>
            <G2 x={1440} y={330} s={P('c3f', 5) * bump(tp)} o={lit(tp)}><Text size={44}>tiny parking-lot tap</Text></G2>
            <G2 x={1440} y={780} s={P('c3f', 6) * bump(tw)}><PriceTag s={1.3} text={V(tw, '$2,000 claim')} color={C.red} /></G2>
            <SourceTag f={f} at={fy} text="BLS CPI-U: motor vehicle maintenance & repair +45.1% (Aug 2021 → Aug 2026)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Bigger crashes ============
  {
    const cm = w('c4a', 'more');
    const bg = w('c4b', 'bigger');
    const ds = w('c4b', 'distracted');
    const ph = w('c4b', 'phone');
    const th = w('c4c', 'three');
    const ki = w('c4c', 'killed');
    const md = w('c4d', 'medical');
    const lw = w('c4d', 'lawyers');
    const st = w('c4d', 'settlements');
    const tn = w('c4e', 'twenty');
    const ts = w('c4e', 'thirty');
    const pt = w('c4f', 'pot');
    const ch = w('c4f', 'checks');
    const rf = w('c4f', 'refill');
    q(cm, 'cash', 0.5);
    q(bg, 'thud', 0.6);
    q(ds, 'pop', 0.5);
    q(ph, 'buzz', 0.7);
    q(th, 'ding', 0.6);
    q(ki, 'thud', 0.5);
    q(md, 'paper', 0.5);
    q(lw, 'pop', 0.5);
    q(st, 'stamp', 0.6);
    q(tn, 'cash', 0.7);
    q(ts, 'thud', 0.6);
    q(pt, 'pop', 0.5);
    q(ch, 'whoosh_s', 0.5);
    q(rf, 'coin', 0.6);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={130} s={P('c4a') * bump(cm)}><Text size={56}>crashes got more expensive</Text></G2>
            <G2 x={520} y={800} s={P('c4a', 2)}><Car s={1.3} /></G2>
            <G2 x={1080} y={790} s={P('c4a', 3) * bump(bg, 0.1)}><Suv s={1.6} tag={f >= bg ? 'HEAVIER' : undefined} /></G2>
            <G2 x={1080} y={420} s={P('c4a', 4)} o={lit(bg)}><Text size={44}>bigger · heavier</Text></G2>
            <Phone x={1600} y={500} s={0.8 * P('c4a', 5) * bump(ph, 0.2)} title="NEW MESSAGE" value="lol" />
            <G2 x={1600} y={820} s={P('c4a', 6)} o={lit(ds)}><Text size={44} color={C.red}>distracted drivers</Text></G2>
            <XMark x={1600} y={500} s={0.5 * pop(f, ph)} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Panel x={960} y={380} w={900} h={300} title="KILLED IN DISTRACTION-AFFECTED CRASHES, 2024" value={V(th, '3,208')} color={C.red} size={150} s={P('c4c') * bump(th)} />
            <Phone x={400} y={600} s={0.9 * P('c4c', 2)} title="DRIVING..." value="ding!" />
            <XMark x={400} y={600} s={0.7 * P('c4c', 3)} />
            {Array.from({length: 8}).map((_, i) => <Person key={i} x={760 + (i % 8) * 60} y={800} s={0.45 * P('c4c', 3 + i)} c={f >= ki ? C.red : '#9AA5B1'} />)}
            <Dave f={f} x={1640} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: ki, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
            <SourceTag f={f} at={th} text="NHTSA, Distracted Driving in 2024: 3,208 killed" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <HospitalBill x={260} y={420} s={1.1 * P('c4d') * bump(md)} />
            <Lawyer f={f} x={560} y={880} s={1.05 * P('c4d', 2) * bump(lw, 0.08)} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: lw, pose: 'present', expr: 'smug', look: 0.8}]} />
            <Gavel37 x={560} y={330} s={0.8 * P('c4d', 3)} hit={f >= st ? 1 : 0} />
            <Panel x={1300} y={330} w={720} h={250} title="AVG PAYOUT PER INJURED PERSON" value={V(tn, '~$29,100')} color={C.red} size={110} s={P('c4d', 4) * bump(tn)} />
            <Panel x={1300} y={640} w={720} h={200} title="SINCE 2020" value={V(ts, '+36%')} color={C.red} size={90} s={P('c4d', 5) * bump(ts)} />
            <UpArrow x={1760} y={640} s={0.8 * P('c4d', 6)} color={f >= ts ? C.red : '#C9CED6'} />
            <SourceTag f={f} at={tn} text="CCC Intelligent Solutions, Crash Course 2026: ~$29,100 (Q2 2025), +36% since Q4 2020" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Pot x={960} y={620} s={1.1 * P('c4f') * bump(pt, 0.08)} level={f >= rf ? ease(f, rf, rf + 30, 0.2, 0.6) : 0.5} coins={f >= rf ? 6 : 0} />
            {[0, 1, 2, 3].map((i) => {
              const a = ch + i * 6;
              return (
                <G2 key={i} x={lin(f, a, a + 30, 960, 1400 + i * 110)} y={lin(f, a, a + 30, 500, 240 + i * 70)} s={0.8 * P('c4f', 2)} o={f >= ch ? 1 : 0.4}>
                  <rect x={-90} y={-36} width={180} height={72} rx={8} fill="#E3F6EC" stroke={C.ink} strokeWidth={4} />
                  <Text size={28}>CHECK</Text>
                </G2>
              );
            })}
            <Dave f={f} x={400} y={900} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: rf, pose: 'carry', expr: 'tired', look: 0.8}]} />
            <G2 x={400} y={360} s={P('c4f', 3)} o={lit(rf)}><Text size={44}>Dave refills it</Text></G2>
            <G2 x={1500} y={880} s={P('c4f', 3)}><Text size={40} color={GRAY}>repairs · medical · lawyers</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Storms & ZIP ============
  {
    const sk = w('c5a', 'sky');
    const hl = w('c5b', 'hail');
    const dn = w('c5b', 'dent');
    const fl = w('c5b', 'floods');
    const tr = w('c5c', 'three');
    const ft = w('c5c', 'fifty');
    const zp = w('c5d', 'zip');
    const sl = w('c5d', 'sleeps');
    const rows = ['storms', 'theft', 'crashes', 'lawsuits'].map((x) => w('c5d', x));
    const hp = w('c5d', 'higher');
    const td = w('c5e', 'two');
    const tm = w('c5e', 'ten');
    const hu = w('c5e', 'hundreds');
    const mv = w('c5f', 'move');
    const ne = w('c5f', 'neighborhoods');
    const up = w('c5f', 'up');
    q(sk, 'thud', 0.5);
    q(hl, 'clank', 0.5);
    q(dn, 'thud', 0.7);
    q(fl, 'whoosh', 0.5);
    q(tr, 'ding', 0.5);
    q(ft, 'cash', 0.7);
    q(zp, 'pop', 0.6);
    q(sl, 'pop', 0.4);
    rows.forEach((x) => q(x, 'tick', 0.5));
    q(hp, 'thud', 0.6);
    q(td, 'pop', 0.5);
    q(tm, 'step', 0.5);
    q(hu, 'cash', 0.7);
    q(ne, 'whoosh_s', 0.5);
    q(up, 'boing', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <StormCloud x={960} y={220} s={1.4 * P('c5a') * bump(sk)} f={f} rain={f >= fl ? 1 : 0} />
            {f >= hl && Array.from({length: 10}).map((_, i) => <Hailstone key={i} x={480 + i * 100} y={((f - hl) * 14 + i * 57) % 420 + 340} s={0.6} />)}
            {[0, 1, 2].map((i) => <BlueCar key={i} x={560 + i * 400} y={800} s={1.3 * P('c5a', 2 + i)} f={f} dent={f >= dn} shake={f >= dn && f < dn + 16 ? 1 : 0} />)}
            <G2 x={260} y={360} s={P('c5a', 4) * bump(hl)} o={lit(hl)}><Box w={380} h={120} fill="#fff" /><Text size={36}>golf-ball hail</Text></G2>
            <G2 x={1660} y={360} s={P('c5a', 5) * bump(fl)} o={lit(fl)}><Box w={380} h={120} fill="#CFE8F5" /><Text size={36}>floods: totaled</Text></G2>
            {f >= fl && <rect x={0} y={lin(f, fl, fl + 30, 1080, 900)} width={1920} height={200} fill="#5AB6E0" opacity={0.45} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c5c')}><Text size={52}>U.S. insured damage from severe storms</Text></G2>
            <line x1={420} y1={820} x2={1500} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {['2023', '2024', '2025'].map((y, i) => (
              <VBar key={y} x={600 + i * 360} base={820} h={ease(f, ft - 4 + i * 5, ft + 16 + i * 5, 100, 460)} color={f >= tr ? C.red : '#9AA5B1'} label={y} value={V(ft, '$50B+')} s={P('c5c', 2 + i * 2)} />
            ))}
            <StormCloud x={1720} y={420} s={0.8 * P('c5c', 3)} f={f} />
            <G2 x={1720} y={660} s={P('c5c', 4) * bump(tr)} o={lit(tr)}><Text size={40}>3 years in a row</Text></G2>
            <SourceTag f={f} at={ft} text="Triple-I (Apr 2026): severe convective storms > $50B insured losses, 3rd straight year" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={600} y={520} s={P('c5d')}>
              <rect x={-420} y={-320} width={840} height={640} rx={24} fill="#E3F1F4" stroke={C.ink} strokeWidth={6} />
              {[-200, 0, 200].map((x) => <line key={x} x1={x} y1={-320} x2={x} y2={320} stroke="#fff" strokeWidth={18} />)}
              {[-120, 120].map((y) => <line key={y} x1={-420} y1={y} x2={420} y2={y} stroke="#fff" strokeWidth={18} />)}
              <House s={0.2} x={-100} y={60} />
            </G2>
            <MapPin x={500} y={560} s={1.2 * P('c5d', 2) * bump(zp)} label={f >= zp ? 'ZIP 12345' : ''} />
            <G2 x={500} y={330} s={P('c5d', 3)} o={lit(sl)}><Text size={36}>where your car sleeps</Text></G2>
            {['more storms?', 'more theft?', 'more crashes?', 'more lawsuits?'].map((l, i) => (
              <G2 key={l} x={1440} y={220 + i * 120} s={P('c5d', 3 + i) * bump(rows[i])} o={lit(rows[i])}><Box w={460} h={96} fill={f >= rows[i] ? '#FDE3EA' : '#fff'} /><Text size={40}>{l}</Text></G2>
            ))}
            <G2 x={1440} y={760} s={P('c5d', 8) * bump(hp)}><PriceTag s={1.3} text={f >= hp ? 'HIGHER PRICE' : 'price ?'} color={f >= hp ? C.red : C.ink} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[0, 1].map((i) => (
              <G2 key={i} x={i ? 1440 : 480} y={822} s={P('c5e', i * 2) * bump(td)}>
                <House s={0.55} x={-60} />
                <Stick f={f} x={200} y={0} s={0.85} acc={['hair']} seed={62 + i} keys={[{at: 0, pose: 'hold', expr: i && f >= hu ? 'shock' : 'happy', look: i ? -0.8 : 0.8}]} />
                <Text x={0} y={-480} size={40}>{i ? 'Driver B' : 'Driver A'}</Text>
              </G2>
            ))}
            <G2 x={960} y={560} s={P('c5e', 3) * bump(tm)} o={lit(tm)}>
              <path d="M -220 0 L 220 0" stroke={C.ink} strokeWidth={8} strokeDasharray="20 14" />
              <path d="M 220 0 l -30 -20 l 0 40 Z M -220 0 l 30 -20 l 0 40 Z" fill={C.ink} />
              <Text y={-40} size={44}>10 miles</Text>
            </G2>
            <G2 x={960} y={200} s={P('c5e', 4)}><Box w={900} h={110} fill="#fff" /><Text size={44}>same car · same perfect record</Text></G2>
            <G2 x={480} y={340} s={P('c5e', 5)}><PriceTag s={1.1} text="$" color={C.green} /></G2>
            <G2 x={1440} y={340} s={P('c5e', 6) * bump(hu)}><PriceTag s={1.1} text={f >= hu ? '$$$ +hundreds/yr' : '$ ?'} color={f >= hu ? C.red : C.ink} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <House x={460} y={822} s={0.8 * P('c5f')} color="#CFE8F5" />
            <Dave f={f} x={860} y={822} s={1.1} keys={[{at: 0, pose: 'pockets', expr: 'neutral', look: 0.8}, {at: up, pose: 'shrug', expr: 'tired', look: 0.8}]} />
            <G2 x={460} y={260} s={P('c5f', 2)} o={lit(mv)}><Text size={44}>Dave didn't move</Text></G2>
            <Pot x={1420} y={640} s={0.8 * P('c5f', 3)} level={ease(f, ne, ne + 20, 0.7, 0.15)} label="AREA POT" />
            <G2 x={1420} y={300} s={P('c5f', 4) * bump(up)}><PriceTag s={1.2} text={f >= up ? 'price: UP' : 'price'} color={f >= up ? C.red : C.ink} /></G2>
            <UpArrow x={1700} y={300} s={0.7 * pop(f, up)} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Secret scores ============
  {
    const dk = w('c6a', 'know');
    const cb = w('c6b', 'credit');
    const rp = w('c6b', 'report');
    const lo = w('c6c', 'lower');
    const cl = w('c6c', 'claims');
    const pr = w('c6c', 'perfect');
    const db = w('c6d', 'double');
    const un = w('c6e', 'unfair');
    const br = w('c6e', 'broke');
    const stt = ['california', 'hawaii', 'massachusetts', 'michigan'].map((x) => w('c6e', x));
    const bn = w('c6e', 'ban');
    const pd = w('c6f', 'predicts');
    const pq = w('c6f', 'political');
    q(dk, 'sting', 0.5);
    q(cb, 'pop', 0.5);
    q(rp, 'paper', 0.6);
    q(lo, 'pop', 0.5);
    q(cl, 'paper', 0.4);
    q(pr, 'ding', 0.5);
    q(db, 'thud', 0.8);
    q(un, 'buzz', 0.5);
    stt.forEach((x) => q(x, 'pop', 0.45));
    q(bn, 'stamp', 0.6);
    q(pd, 'ding', 0.5);
    q(pq, 'stamp', 0.6);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.8}, {at: rp, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Magnifier x={480} y={520} s={0.8 * P('c6a') * bump(dk)} />
            <Contract x={960} y={500} s={0.85 * P('c6a', 2) * bump(rp, 0.08)} lines={['CREDIT REPORT', 'cards · loans', 'late payments']} signed={0} />
            <path d="M 1180 500 L 1300 500" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={lit(cb)} />
            <path d="M 1300 500 l -30 -24 l 0 48 Z" fill={C.ink} opacity={lit(cb)} />
            <G2 x={1570} y={500} s={P('c6a', 4) * bump(cb)} o={lit(cb)}>
              <Box w={480} h={300} fill={f >= cb ? C.yellow : '#fff'} />
              <Text y={-60} size={36}>CREDIT-BASED</Text>
              <Text y={0} size={36}>INSURANCE</Text>
              <Text y={60} size={48}>SCORE</Text>
            </G2>
            <G2 x={960} y={130} s={P('c6a', 3)}><Text size={52}>the one most people don't know</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6c')}><Text size={48}>two drivers, both perfect records</Text></G2>
            {[0, 1].map((i) => (
              <G2 key={i} x={i ? 1400 : 520} y={0} s={P('c6c', 2 + i * 2)}>
                <ScoreGauge y={360} s={0.7 * (i ? bump(lo) : 1)} score={i ? 560 : 780} label={i ? 'LOWER CREDIT' : 'GOOD CREDIT'} />
                <G2 y={560} o={lit(pr)}><Box w={380} h={80} fill="#E3F6EC" /><Text size={34}>no crashes</Text>{f >= pr && <Check x={150} y={0} s={0.6} />}</G2>
                <rect x={-110} y={900 - (i ? ease(f, db - 4, db + 16, 120, 250) : 120)} width={220} height={i ? ease(f, db - 4, db + 16, 120, 250) : 120} rx={14} fill={i ? C.red : C.green} stroke={C.ink} strokeWidth={6} />
                <Text y={i ? 900 - ease(f, db - 4, db + 16, 120, 250) - 36 : 744} size={46}>{i ? V(db, '~2x price') : '1x price'}</Text>
              </G2>
            ))}
            <G2 x={960} y={620} s={P('c6c', 6)} o={lit(cl)}><Bubble text={'"lower scores\nfile more claims"'} size={34} tail="down" /></G2>
            <SourceTag f={f} at={db} text="Rate studies (Bankrate, ValuePenguin 2026): poor credit often ~2x full-coverage price" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={130} s={P('c6e')} o={lit(bn)}><Text size={48}>banned for car insurance in:</Text></G2>
            {['California', 'Hawaii', 'Massachusetts', 'Michigan'].map((s, i) => (
              <G2 key={s} x={520} y={260 + i * 120} s={P('c6e', 2 + i) * bump(stt[i])} o={lit(stt[i])}><Box w={520} h={96} fill={f >= stt[i] ? '#E3F6EC' : '#fff'} /><Text size={42}>{s}</Text></G2>
            ))}
            <Scale x={1360} y={900} s={0.85 * P('c6e', 3)} tilt={f >= pd ? ease(f, pd, pd + 20, -10, 0) : ease(f, un, un + 20, 0, -10)} left="punishes being broke" right="predicts risk" />
            <G2 x={1360} y={220} s={P('c6e', 5) * bump(pq)} o={lit(pq)}><Box w={820} h={110} fill={f >= pq ? C.yellow : '#fff'} /><Text size={40}>political question · now you know</Text></G2>
            <G2 x={1100} y={520} s={P('c6e', 6)} o={lit(un)}><Text size={40} color={C.red}>unfair?</Text></G2>
            <G2 x={1620} y={520} s={P('c6e', 6)} o={lit(pd)}><Text size={40} color={C.blue}>insurers</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Loyalty penalty ============
  {
    const sn = w('c7a', 'sneakiest');
    const yr = w('c7b', 'years');
    const rw = w('c7b', 'rewarded');
    const np = w('c7b', 'nope');
    const cmp = w('c7c', 'computer');
    const po = w('c7c', 'optimization');
    const bz = w('c7d', 'busy');
    const ng = w('c7d', 'nudge');
    const rk = w('c7d', 'riskier');
    const cf = w('c7d', 'comfy');
    const cs = w('c7e', 'coffee');
    const rg = w('c7e', 'regulars');
    const rc = w('c7e', 'raccoon');
    const tw = w('c7f', 'twenty');
    const ap = w('c7f', 'approve');
    const pl = w('c7f', 'pile');
    const on = w('c7f', 'once');
    q(sn, 'sting', 0.6);
    q(yr, 'tick', 0.5);
    q(rw, 'chime', 0.5);
    q(np, 'buzz', 0.8);
    q(cmp, 'key', 0.6);
    q(po, 'stamp', 0.6);
    q(bz, 'pop', 0.5);
    q(ng, 'coin', 0.6);
    q(rk, 'buzz', 0.4);
    q(cf, 'boing', 0.6);
    q(cs, 'pop', 0.5);
    q(rg, 'cash', 0.6);
    q(rc, 'pop2', 0.6);
    q(tw, 'ding', 0.6);
    q(ap, 'paper', 0.5);
    q(pl, 'tick', 0.5);
    q(on, 'thud', 0.8);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c7a') * bump(sn)}><Text size={56}>the sneakiest one</Text></G2>
            <Dave f={f} x={380} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: np, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <MemberCard x={880} y={520} s={1.1 * P('c7a', 2) * bump(yr)} tier={f >= yr ? '10 YEARS' : 'MEMBER'} price="LOYAL" />
            <G2 x={1420} y={400} s={P('c7a', 3) * bump(rw)}><Bubble text={'Loyalty gets\nthe best deal!'} size={46} tail="left" /></G2>
            <Stamp x={1420} y={700} s={pop(f, np, 9, 260)} text="OFTEN: NOPE" size={64} color={C.red} r={-8} />
            <G2 x={1420} y={700} s={P('c7a', 4)} o={f >= np ? 0 : 0.5}><Text size={44} color={GRAY}>true?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Monitor x={560} y={620} s={1.05 * P('c7c') * bump(cmp, 0.06)} title="PRICE MODEL" value={f >= bz ? 'WON’T SHOP' : 'will Dave shop?'} valueColor={f >= bz ? C.red : C.ink} />
            <G2 x={560} y={130} s={P('c7c', 2) * bump(po)}><Box w={700} h={110} fill={f >= po ? C.yellow : '#fff'} /><Text size={48}>PRICE OPTIMIZATION</Text></G2>
            <Couch x={1360} y={860} s={1.0 * P('c7c', 3)} color="#8FB8DE" />
            <Dave f={f} x={1360} y={780} s={0.95} keys={[{at: 0, pose: 'relax', expr: 'happy', look: -0.8}, {at: cf, pose: 'relax', expr: 'grin', look: -0.8}]} />
            <G2 x={1360} y={300} s={P('c7c', 4) * bump(ng)}><PriceTag s={1.2} text={f >= ng ? '+ a little more' : 'yearly price'} color={f >= ng ? C.red : C.ink} /></G2>
            <G2 x={1360} y={460} s={P('c7c', 5)} o={lit(rk)}><Text size={38}>not riskier... just comfy</Text></G2>
            {[0, 1, 2].map((i) => <UpArrow key={i} x={1640 + i * 70} y={380 - i * 50} s={0.4 * pop(f, ng + i * 8)} />)}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <CoffeeSign x={700} y={360} s={P('c7e') * bump(rg, 0.08)} hl={f >= rg ? 1 : 0} />
            <Coffee x={700} y={760} s={1.1 * P('c7e', 2)} f={f} />
            <Dave f={f} x={1080} y={822} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: rg, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <Raccoon f={f} x={1520} y={780} s={1.0 * P('c7e', 3) * bump(rc, 0.25)} mood={f >= rc ? 'wink' : 'sneaky'} holdCoin={f >= rc} />
            <G2 x={1520} y={420} s={P('c7e', 4)} o={lit(rc)}><Bubble text="approved!" size={40} tail="down" /></G2>
            <G2 x={700} y={130} s={P('c7e', 5)} o={lit(cs)}><Text size={44}>imagine this coffee shop...</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Panel x={520} y={340} w={680} h={260} title="BANNED OR RESTRICTED" value={V(tw, '~20 states + D.C.')} color={C.green} size={70} s={P('c7f') * bump(tw)} />
            <Contract x={520} y={740} s={0.6 * P('c7f', 2) * bump(ap)} lines={['PRICE INCREASE', 'regulator approval', 'pending...']} signed={f >= on ? 1 : 0} />
            <Hourglass x={1160} y={520} s={P('c7f', 3)} t={ease(f, pl, on, 0.1, 0.9)} />
            <G2 x={1160} y={780} s={P('c7f', 4)} o={lit(pl)}><Text size={38}>costs pile up for years...</Text></G2>
            <UpArrow x={1620} y={520} s={2 * P('c7f', 5) * bump(on, 0.3)} color={f >= on ? C.red : '#C9CED6'} />
            <G2 x={1620} y={780} s={P('c7f', 6) * bump(on)} o={lit(on)}><Text size={44} color={C.red}>...then all at once</Text></G2>
            <SourceTag f={f} at={tw} text="Consumer Federation of America / state regulators: price optimization banned or restricted in ~20 states + D.C." />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    const ea = w('c8a', 'education');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ea, 'stamp', 0.5);
    const items = ['Shop at every renewal (3+ quotes)', 'Raise the deductible, carefully', 'Bundle & ask for every discount', 'Tracking apps: pros & cons', 'Check your credit report'];
    const cur = hs.filter((x) => f >= x).length;
    const fq = w('c8g', 'four');
    const th = w('c8g', 'three');
    const bc = w('c8g', 'blue');
    q(fq, 'pop', 0.5);
    q(th, 'cash', 0.7);
    q(bc, 'chime', 0.5);
    scene(A('c8a'), () =>
      f < A('c8g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={100} s={P('c8a')}><Text size={56}>How Dave fights back</Text></G2>
            <G2 x={700} y={160} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={80} y={270 + i * 130} s={0.85 * P('c8a', 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.blue} w={1180} />)}
            {cur > 1 && Array.from({length: cur - 1}).map((_, i) => <Check key={i} x={1060} y={270 + i * 130} s={0.8} />)}
            <G2 x={1620} y={560} s={P('c8a', 4)}>
              <Frame w={440} h={600}>
                {cur === 0 && <Dave f={f} x={0} y={200} s={0.8} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} />}
                {cur === 1 && <g>{['QUOTE A', 'QUOTE B', 'QUOTE C'].map((l, k) => <G2 key={l} y={-160 + k * 110}><Box w={360} h={90} fill={k === 1 ? '#E3F6EC' : '#fff'} /><Text size={36}>{l}</Text></G2>)}<Text y={200} size={32} color={GRAY}>~1 hour</Text></g>}
                {cur === 2 && <g><Text y={-190} size={34}>deductible ↑ = price ↓</Text><Text y={-130} size={30} color={GRAY}>only what your</Text><Text y={-90} size={30} color={GRAY}>emergency fund can pay</Text><G2 y={80}><Pot s={0.5} level={0.6} label="FUND" /></G2></g>}
                {cur === 3 && <g><House s={0.22} x={-80} y={-40} /><G2 x={90} y={-60}><BlueCar s={0.7} f={f} /></G2><Text y={60} size={32}>home + car</Text><Text y={120} size={28} color={GRAY}>good student · low miles</Text><Text y={165} size={28} color={GRAY}>pay yearly</Text></g>}
                {cur === 4 && <g><Phone s={0.6} y={-60} title="TRACKING" value="B+" /><Text y={140} size={30} color={C.green}>calm drivers can save</Text><Text y={185} size={30} color={C.red}>watches brakes, speed, time</Text><Text y={225} size={26} color={GRAY}>bad score can cost more</Text></g>}
                {cur === 5 && <g><ScoreGauge s={0.55} y={20} score={700} label="REPORT" /><Text y={150} size={32}>fix any mistakes</Text></g>}
              </Frame>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {['$2,200', '$2,050', '$1,850', '$2,300'].map((p, i) => (
              <G2 key={p} x={330 + i * 330} y={380} s={P('c8g', i * 2) * bump(fq, 0.08)}>
                <Box w={280} h={200} fill={i === 2 && f >= th ? '#E3F6EC' : '#fff'} stroke={i === 2 && f >= th ? C.green : C.ink} />
                <Text y={-50} size={30} color={GRAY}>{`QUOTE ${i + 1}`}</Text>
                <Text y={30} size={52} color={i === 2 && f >= th ? C.green : C.ink}>{p}</Text>
              </G2>
            ))}
            <Stamp x={990} y={200} s={pop(f, th, 9, 260)} text="-$350" size={64} color={C.green} r={-6} />
            <Dave f={f} x={1640} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'think', look: -0.8}, {at: th, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <BlueCar x={960} y={800} s={1.5 * P('c8g', 8) * bump(bc)} f={f} />
            <G2 x={660} y={660} s={P('c8g', 9)} o={lit(bc)}><Text size={40}>same coverage · same funny blue car</Text></G2>
            <G2 x={330} y={560} s={P('c8g', 9)}><Text size={28} color={GRAY}>(example numbers)</Text></G2>
            {f >= th && <Sparkle x={990} y={380} t={((f - th) % 30) / 30} s={0.8} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ Recap + next ============
  const recap = ['You pay for everyone\'s crashes', 'ZIP, credit & shopping habits matter', 'Loyalty often isn\'t rewarded: compare'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const cur = r.filter((x) => f >= x).length;
    const ph = w('d1e', 'phone');
    const sv = w('d1e', 'save', 1);
    const ml = w('d1e', 'mostly');
    const sb = w('d1f', 'subscribe');
    const fr = w('d1f', 'free');
    const rn = w('d1f', 'renewal');
    q(ph, 'buzz', 0.6);
    q(sv, 'pop', 0.5);
    q(ml, 'boing', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    q(rn, 'stamp', 0.5);
    scene(A('d1a'), () =>
      f < A('d1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={P('d1a')}><Text size={100}>RECAP</Text></G2>
            {recap.map((b, i) => <Row key={i} x={160} y={380 + i * 170} s={P('d1a', 2 + i * 2) * (cur === i + 1 ? bump(r[i], 0.06) : 1)} n={i + 1} text={b} lit={cur >= i + 1 ? 1 : 0.35} color={C.blue} w={1400} />)}
            <Dave f={f} x={1760} y={900} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('d1f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={120} s={P('d1e')}><Text size={54}>Next: why can't you save money?</Text></G2>
            <Dave f={f} x={600} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ph, pose: 'hold', expr: 'worried', look: 0.8}, {at: ml, pose: 'shrug', expr: 'grin', look: 0.8}]} />
            <Phone x={1200} y={540} s={1.1 * P('d1e', 2) * bump(ph, 0.1)} title="FLASH SALE!" value={f >= ph ? 'BUY NOW' : '$0'} color={C.red} />
            <G2 x={1560} y={360} s={P('d1e', 3) * bump(sv)} o={lit(sv)}><Bubble text={'not your fault...\nmostly'} size={40} tail="left" /></G2>
            <G2 x={420} y={400} s={0.6 * P('d1e', 4)}><Pot level={0.1} label="SAVINGS" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * P('d1f')} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={P('d1f', 2)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <BlueCar x={1560} y={860} s={1.3 * P('d1f', 3)} f={f} />
            <G2 x={960} y={680} s={P('d1f', 4) * bump(rn)}><Text size={46} color={f >= fr ? C.green : C.ink}>price: $0 · no renewal hikes</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2e', 'percent', 1) + 20;
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
