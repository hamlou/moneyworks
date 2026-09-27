import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bill, Bubble, Calendar, Car, MoneyStack, SourceTag, Sparkle, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Mailbox, OldCar, Row, SubButton, Bell} from '../props2';
import {HospitalBill, PriceTag, Raccoon, Ticket} from '../props3';
import {LineChart} from '../props4';
import {Scale, SlicePie, Star} from '../props8';
import {Snowball} from '../props15';
import {Flames} from '../props18';
import {Dealership, Pickup, Sticker, Suv} from '../props23';
import {Popcorn} from '../props26';
import {IceCream} from '../props29';
import {Ghost, RaceTrack, Smell, TrafficLight, Turtle, WaterSlide, Wrench} from '../props39';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Seller: React.FC<SP> = (p) => <Stick acc={['tie', 'shades']} seed={66} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const Panel: React.FC<{x: number; y: number; w: number; h?: number; title: string; value: string; color?: string; s?: number; o?: number; size?: number; fill?: string}> = ({x, y, w, h = 200, title, value, color = C.ink, s = 1, o = 1, size = 80, fill}) => (
  <G2 x={x} y={y} s={s} o={o}>
    <Box w={w} h={h} fill={fill} />
    <Text y={-h / 2 + 40} size={30} color="#5B6470" ls={2}>{title}</Text>
    <Text y={24} size={size} color={color}>{value}</Text>
  </G2>
);

const Check: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M -30 0 l 22 22 l 44 -48" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
);

const DownArrow: React.FC<{x: number; y: number; s?: number; color?: string}> = ({x, y, s = 1, color = C.red}) => (
  <path transform={`translate(${x},${y}) scale(${s}) rotate(180)`} d="M 0 -60 L 44 0 L 18 0 L 18 60 L -18 60 L -18 0 L -44 0 Z" fill={color} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
);

export const Ep39: React.FC = () => {
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
    const br = w('o1', 'brand');
    const sh = w('o1', 'shiny');
    const sm = w('o1', 'smell');
    const dr = w('o1', 'drives');
    const gr = w('o1', 'grinning');
    q(br, 'ding', 0.6);
    q(sh, 'chime', 0.5);
    q(sm, 'pop', 0.5);
    q(dr, 'whoosh', 0.5);
    q(gr, 'crowd', 0.4);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dealership f={f} x={1420} y={822} s={0.7 * pop(f, 2)} name="SHINY MOTORS" />
          <Suv x={820} y={790} s={1.25 * pop(f, 3) * bump(br, 0.08)} color="#2A9D8F" tag={f >= br ? 'NEW!' : undefined} />
          {f >= sh && <Sparkle x={700} y={560} t={((f - sh) % 30) / 30} s={0.9} />}
          {f >= sh && <Sparkle x={1000} y={600} t={((f - sh + 12) % 30) / 30} s={0.7} />}
          <Smell f={f} x={900} y={520} s={pop(f, sm)} />
          <Dave f={f} x={380} y={822} s={1.15 * pop(f, 2)} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: gr, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          <G2 x={380} y={300} s={pop(f, 4)}><Text size={48}>Dave's first NEW car</Text></G2>
          <G2 x={900} y={400} s={pop(f, 5)} o={lit(sm)}><Text size={40} color="#5B6470">that new car smell...</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tl = w('o2', 'traffic');
    const th = w('o2', 'thousands');
    const ls = w('o2', 'less');
    q(tl, 'tick', 0.5);
    q(th, 'thud', 0.7);
    q(ls, 'trombone', 0.5);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <TrafficLight x={1560} y={560} s={P('o2')} lit={f >= tl ? 0 : 2} />
          <Suv x={lin(f, A('o2'), tl + 10, 300, 1150)} y={790} s={1.05} color="#2A9D8F" />
          <G2 x={760} y={260} s={P('o2', 2) * bump(th)}>
            <Sticker title="CAR'S VALUE" value={f >= th ? '$40,000' : '$50,000'} color={f >= th ? C.red : C.ink} />
          </G2>
          <DownArrow x={1080} y={260} s={0.8 * pop(f, th)} />
          <G2 x={760} y={470} s={P('o2', 3)} o={lit(ls)}><Text size={44} color={C.red}>before the first red light!</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bk = w('o3', 'broke');
    const sc = w('o3', 'scratched');
    const nw = w('o3', 'new');
    q(bk, 'pop', 0.5);
    q(sc, 'pop', 0.5);
    q(nw, 'stamp', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Suv x={1180} y={640} s={1.5 * P('o3')} color="#2A9D8F" />
          <Stamp x={1180} y={420} s={pop(f, nw, 9, 260)} text="USED" size={80} color={C.red} r={-8} />
          {[['broken?', bk], ['scratched?', sc], ['just not new', nw]].map(([l, at], i) => (
            <G2 key={String(l)} x={380} y={260 + i * 190} s={P('o3', 2 + i * 2) * bump(Number(at))} o={lit(Number(at))}>
              <Box w={440} h={130} fill={i === 2 && f >= Number(at) ? C.yellow : '#fff'} />
              <Text x={-40} size={46}>{String(l)}</Text>
              {i < 2 ? <XMark x={160} y={0} s={0.35} /> : <Check x={160} y={0} s={0.8} />}
            </G2>
          ))}
          <Dave f={f} x={1700} y={900} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('o4', 'worse');
    const tt = w('o4', 'thirteen');
    const mo = w('o4', 'month');
    q(wr, 'sting', 0.5);
    q(tt, 'thud', 0.7);
    q(mo, 'cash', 0.7);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P('o4') * bump(wr)}><Text size={58}>cost to OWN a new car (AAA)</Text></G2>
          <Panel x={760} y={400} w={680} h={230} title="PER YEAR" value={V(tt, '$12,863')} color={C.red} size={100} s={P('o4', 2) * bump(tt)} />
          <Panel x={760} y={680} w={680} h={230} title="PER MONTH" value={V(mo, '$1,072')} color={C.red} size={100} s={P('o4', 4) * bump(mo)} />
          <Suv x={1500} y={520} s={0.9 * P('o4', 3)} color="#2A9D8F" />
          <Dave f={f} x={1500} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: tt, pose: 'shock', expr: 'shock', look: -0.8}]} sweat={f >= mo} />
          <SourceTag f={f} at={tt} text="AAA Your Driving Costs 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pr = w('o5', 'poorer');
    const mn = w('o5', 'money');
    q(pr, 'trombone', 0.5);
    q(mn, 'cash', 0.6);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P('o5')}><Text size={62}>new car = poorer?</Text></G2>
          <Frame x={560} y={560} s={P('o5', 2) * bump(pr)} o={lit(pr)} w={620} h={560} label="Dave">
            <Suv x={0} y={60} s={0.7} color="#2A9D8F" />
            <Dave f={f} x={-200} y={200} s={0.6} keys={[{at: 0, pose: 'hold', expr: 'worried'}, {at: pr, pose: 'facepalm', expr: 'sad'}]} />
          </Frame>
          <Frame x={1360} y={560} s={P('o5', 4) * bump(mn)} o={lit(mn)} w={620} h={560} label="who makes money?">
            <Seller f={f} x={-120} y={200} s={0.7} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} />
            <Raccoon f={f} x={130} y={140} s={0.6} mood="sneaky" holdCoin={f >= mn} />
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'leak'), w('o6', 'true'), w('o6', 'race'), w('o6', 'secret'), w('o6', 'drive')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    const labels = ['INVISIBLE LEAK', 'TRUE COST', 'LOAN RACE', "DEALER'S SECRET", 'DRIVE SMART'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {labels.map((l, i) => (
            <Frame key={l} x={220 + i * 370} y={520} s={0.95 * P('o6', i * 2) * bump(pv[i])} o={lit(pv[i])} w={340} h={440} label={l}>
              {i === 0 && <IceCream s={0.8} y={-60} melt={f >= pv[0] ? 0.6 : 0} />}
              {i === 1 && <PriceTag s={1.1} y={-50} text="$12,863" />}
              {i === 2 && <Turtle f={f} s={0.8} y={-20} />}
              {i === 3 && <Popcorn s={0.6} y={-20} />}
              {i === 4 && <Dave f={f} x={0} y={110} s={0.55} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Invisible leak ============
  {
    const gs = w('c1a', 'gas');
    const ins = w('c1a', 'insurance');
    const nv = w('c1a', 'never');
    const dp = w('c1b', 'depreciation');
    const ev = w('c1b', 'every');
    const au = w('c1c', 'august');
    const ff = w('c1c', 'fifty');
    const kb = w('c1c', 'kelley');
    const tw = w('c1d', 'twenty');
    const tn = w('c1d', 'ten');
    const gn = w('c1d', 'gone');
    const t7 = w('c1e', 'twenty');
    const fi = w('c1e', 'fire');
    const mr = w('c1e', 'morning');
    const dd = w('c1e', 'drive');
    const bl = w('c1f', 'bill');
    const sl = w('c1f', 'sell');
    q(gs, 'pop', 0.5);
    q(ins, 'pop', 0.5);
    q(nv, 'dream', 0.5);
    q(dp, 'stamp', 0.7);
    q(ev, 'tick', 0.5);
    q(au, 'flip', 0.5);
    q(ff, 'cash', 0.6);
    q(kb, 'paper', 0.4);
    q(tw, 'thud', 0.6);
    q(tn, 'ding', 0.6);
    q(gn, 'poof', 0.7);
    q(t7, 'coin', 0.6);
    q(fi, 'whoosh', 0.6);
    q(mr, 'tick', 0.5);
    q(bl, 'mail', 0.5);
    q(sl, 'buzz', 0.6);
    const lossBar = (val: number, lab: string) => (
      <g>
        <rect x={-500} y={-50} width={1000} height={100} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
        <rect x={-494} y={-44} width={988 * val} height={88} rx={16} fill={C.green} />
        <Text x={0} y={4} size={40}>{lab}</Text>
      </g>
    );
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c1a')}><Text size={54}>the BIGGEST cost of a new car is...</Text></G2>
            {[['GAS', gs], ['INSURANCE', ins]].map(([l, at], i) => (
              <G2 key={String(l)} x={420 + i * 520} y={420} s={P('c1a', 2 + i * 2) * bump(Number(at))} o={lit(Number(at))}>
                <Box w={420} h={180} />
                <Text size={56}>{String(l)}</Text>
                <XMark x={160} y={-60} s={0.3 * pop(f, Number(at) + 6)} />
              </G2>
            ))}
            <G2 x={1480} y={420} s={P('c1a', 6) * bump(dp)}>
              <Box w={460} h={180} fill={f >= dp ? C.yellow : '#E8EEF1'} />
              <Text size={f >= dp ? 50 : 80}>{f >= dp ? 'DEPRECIATION' : '???'}</Text>
            </G2>
            <G2 x={1480} y={560} s={P('c1a', 7)} o={lit(nv)}><Text size={34} color="#5B6470">never on a bill</Text></G2>
            <G2 x={960} y={760} s={P('c1b')} o={lit(ev)}><Box w={1100} h={110} fill={f >= ev ? '#FDE3EA' : '#fff'} /><Text size={46}>= your car loses value, EVERY day</Text></G2>
            <Dave f={f} x={180} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: dp, pose: 'shock', expr: 'shock', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={180} y={180} s={0.5 * P('c1c')} top="AUG" year={2026} flip={0} />
            <G2 x={620} y={330} s={P('c1c', 2) * bump(ff)}><Sticker title="AVERAGE NEW CAR" value={V(ff, '$50,089')} /></G2>
            <Suv x={1380} y={380} s={1.1 * P('c1c', 3)} color="#2A9D8F" tag="NEW" />
            <G2 x={960} y={640} s={P('c1c', 4)}>{lossBar(ease(f, tw - 4, tw + 16, 1, 0.8), f >= tw ? 'value after year 1: ~80%' : 'car value: 100%')}</G2>
            <Panel x={960} y={820} w={620} h={150} title="YEAR 1 LOSS" value={V(tn, '~$10,000')} color={C.red} size={64} s={P('c1c', 5) * bump(tn)} />
            <Stamp x={1450} y={800} s={pop(f, gn, 9, 260)} text="GONE" size={64} color={C.red} r={-8} />
            <SourceTag f={f} at={kb} text="Kelley Blue Book: avg new car $50,089 (Aug 2026) · ~20% lost in year 1" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Flames f={f} x={960} y={640} s={1.2 * pop(f, fi)} />
            <G2 x={960} y={520} s={P('c1e') * bump(t7)}><Bill s={1.3} /></G2>
            <G2 x={960} y={200} s={P('c1e', 2) * bump(t7)}><Box w={620} h={130} fill={C.yellow} /><Text size={64}>{V(t7, '$27 a day')}</Text></G2>
            <Calendar x={1500} y={320} s={0.6 * P('c1e', 3) * bump(mr)} top="EVERY" year="DAY" flip={0} />
            <Dave f={f} x={420} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: fi, pose: 'shock', expr: 'shock', look: 0.8}, {at: dd, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
            <G2 x={1500} y={640} s={P('c1e', 4)} o={lit(dd)}><Suv s={0.6} color="#2A9D8F" /><Text y={120} size={34}>even parked!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Mailbox x={420} y={822} s={1.1 * P('c1f')} flag={0} />
            <G2 x={420} y={380} s={P('c1f', 2) * bump(bl)}><Bubble text="no bill for it..." size={40} tail="down" /></G2>
            <Dave f={f} x={900} y={822} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'happy', look: 0.8}, {at: sl, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Suv x={1420} y={790} s={0.95 * P('c1f', 2)} color="#2A9D8F" />
            <G2 x={1420} y={420} s={P('c1f', 3) * bump(sl)} o={lit(sl)}><PriceTag s={1.2} text={f >= sl ? 'OFFER: $$' : 'OFFER: ?'} color={C.red} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Slide ============
  {
    const wd = w('c2a', 'weird');
    const st = w('c2a', 'start');
    const sl = w('c2b', 'slide');
    const sd = w('c2b', 'straight');
    const fl = w('c2b', 'flatter');
    const us = w('c2c', 'used');
    const sm = w('c2c', 'smell');
    const ex = w('c2c', 'expensive');
    const fy = w('c2d', 'forty');
    const ml = w('c2d', 'million');
    const is = w('c2d', 'iseecars');
    const tr = w('c2e', 'trucks');
    const hy = w('c2e', 'hybrids');
    const el = w('c2e', 'electric');
    const f7 = w('c2e', 'fifty');
    const fi = w('c2f', 'fifty');
    const t9 = w('c2f', 'twenty');
    const t1 = w('c2f', 'twenty', 1);
    const me = w('c2f', 'melted');
    q(wd, 'boing', 0.5);
    q(st, 'pop', 0.5);
    q(sl, 'whoosh', 0.5);
    q(sd, 'whoosh_s', 0.6);
    q(fl, 'pop', 0.5);
    q(us, 'stamp', 0.6);
    q(sm, 'pop2', 0.5);
    q(ex, 'cash', 0.6);
    q(fy, 'thud', 0.6);
    q(is, 'paper', 0.4);
    q(tr, 'pop', 0.5);
    q(hy, 'pop', 0.5);
    q(el, 'buzz', 0.5);
    q(f7, 'thud', 0.5);
    q(t9, 'ding', 0.6);
    q(t1, 'thud', 0.6);
    q(me, 'poof', 0.6);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2a') * bump(wd)}><Text size={54}>{f >= fl ? 'steep first... then flatter' : 'car value over time'}</Text></G2>
            <WaterSlide x={1000} y={520} s={P('c2a', 2) * bump(sl, 0.05)} w={1200} h={560} t={f < sd ? ease(f, A('c2a'), st + 10, 0, 0.04) : f < fl ? ease(f, sd, sd + 30, 0.04, 0.35) : ease(f, fl, fl + 40, 0.35, 0.95)} />
            <G2 x={400} y={210} s={P('c2a', 3)}><Text size={36} color="#5B6470">NEW</Text></G2>
            <G2 x={1560} y={840} s={P('c2a', 3)}><Text size={36} color="#5B6470">years later</Text></G2>
            <G2 x={640} y={460} s={pop(f, sd)}><Text size={40} color={C.red}>BIG drop</Text></G2>
            <Stamp x={1480} y={330} s={pop(f, us, 9, 260)} text="USED" size={60} color={C.red} r={-8} />
            <G2 x={1480} y={470} s={pop(f, sm)}><Smell f={f} s={0.8} /></G2>
            <G2 x={1480} y={600} s={pop(f, sm) * bump(ex)} o={lit(ex)}><Box w={660} h={100} fill={C.yellow} /><Text size={36}>the most expensive smell on Earth</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2d')}><Text size={54}>value lost after 5 years</Text></G2>
            <Panel x={480} y={420} w={640} h={260} title="AVERAGE CAR" value={V(fy, '~42%')} color={C.red} size={120} s={P('c2d', 2) * bump(fy)} />
            <G2 x={480} y={640} s={P('c2d', 3)} o={lit(ml)}><Text size={36}>~1 million used cars studied</Text></G2>
            <line x1={1000} y1={800} x2={1800} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[['TRUCKS', 34.2, tr, C.green], ['HYBRIDS', 35.4, hy, C.green], ['EVs', 57.2, el, C.red]].map(([l, v, at, c], i) => (
              <G2 key={String(l)} x={1150 + i * 260} y={800} s={P('c2d', 4 + i * 2) * bump(Number(at), 0.08)} o={lit(Number(at))}>
                <Bar h={40 + ease(f, Number(at) - 4, Number(at) + 14, 0, 1) * Number(v) * 7} w={180} color={String(c)} label={String(l)} value={f >= Number(at) ? `${v}%` : '?'} />
              </G2>
            ))}
            <SourceTag f={f} at={is} text="iSeeCars 2026: avg 5-yr depreciation 41.8% · trucks 34.2% · hybrids 35.4% · EVs 57.2%" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={330} s={P('c2f') * bump(fi)}><Sticker title="DAY 1" value="$50,089" /></G2>
            <G2 x={560} y={680} s={P('c2f', 2) * bump(t9)}><Sticker title="AFTER 5 YEARS" value={V(t9, '~$29,150')} color={C.red} /></G2>
            <IceCream x={1300} y={420} s={1.6 * P('c2f', 3)} melt={ease(f, me - 6, me + 20, 0, 1)} />
            <G2 x={1300} y={820} s={P('c2f', 4) * bump(t1)} o={lit(t1)}><Box w={620} h={120} fill="#FDE3EA" /><Text size={54} color={C.red}>~$21,000 melted</Text></G2>
            <Dave f={f} x={1720} y={900} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: me, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Real price tag ============
  {
    const pc = w('c3a', 'piece');
    const rl = w('c3a', 'really');
    const aa = w('c3b', 'aaa');
    const tw = w('c3b', 'twelve');
    const mo = w('c3b', 'month');
    const sl = [w('c3c', 'depreciation'), w('c3c', 'fuel'), w('c3c', 'insurance'), w('c3d', 'maintenance'), w('c3d', 'interest'), w('c3d', 'taxes')];
    const pm = w('c3e', 'payment');
    const tk = w('c3e', 'ticket');
    const rd = w('c3e', 'ride');
    const se = w('c3f', 'sedan');
    const sx = w('c3f', 'sixty');
    const pu = w('c3f', 'pickup');
    const tn = w('c3f', 'ten');
    q(pc, 'pop', 0.5);
    q(rl, 'ding', 0.5);
    q(aa, 'paper', 0.5);
    q(tw, 'thud', 0.7);
    q(mo, 'cash', 0.6);
    sl.forEach((x) => q(x, 'pop', 0.55));
    q(pm, 'coin', 0.5);
    q(tk, 'pop', 0.5);
    q(rd, 'whoosh', 0.5);
    q(se, 'pop', 0.5);
    q(sx, 'coin', 0.5);
    q(pu, 'pop', 0.5);
    q(tn, 'cash', 0.7);
    const parts: [string, string, number, string][] = [
      ['Depreciation', '$4,422', 4422, C.red],
      ['Fuel', '~$2,600', 2595, C.gold],
      ['Insurance', '$2,098', 2098, C.blue],
      ['Maintenance & tires', '~$1,750', 1755, C.green],
      ['Loan interest', '$1,184', 1184, '#8E6CCF'],
      ['Taxes & fees', '$802', 802, '#9AA5B1'],
    ];
    const cur = sl.filter((x) => f >= x).length;
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c3a') * bump(rl)}><Text size={54}>what does it REALLY cost to own?</Text></G2>
            <Suv x={420} y={620} s={1.1 * P('c3a', 2)} color="#2A9D8F" />
            <G2 x={420} y={300} s={P('c3a', 3)} o={lit(pc)}><Text size={40}>depreciation = 1 piece</Text></G2>
            <Panel x={1220} y={420} w={720} h={240} title="AAA: PER YEAR" value={V(tw, '$12,863')} color={C.red} size={110} s={P('c3a', 4) * bump(tw)} />
            <Panel x={1220} y={720} w={720} h={200} title="PER MONTH" value={V(mo, '~$1,072')} color={C.red} size={90} s={P('c3a', 5) * bump(mo)} />
            <SourceTag f={f} at={aa} text="AAA Your Driving Costs 2026: 5 years, 75,000 miles" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P('c3c')}><Text size={52}>where $12,863 a year goes</Text></G2>
            <SlicePie x={500} y={560} s={P('c3c', 2)} rad={320} t={1} slices={parts.map(([l, , v, c], i) => ({v: v / 12856, c, l: cur > i ? l.split(' ')[0] : ''}))} pop={cur - 1} />
            {parts.map(([l, amt], i) => (
              <G2 key={l} x={1380} y={220 + i * 120} s={P('c3c', 3 + i)} o={cur > i ? 1 : 0.35}>
                <Box w={760} h={100} fill={cur === i + 1 ? C.yellow : '#fff'} />
                <circle cx={-330} cy={0} r={22} fill={parts[i][3]} stroke={C.ink} strokeWidth={4} />
                <Text x={-290} y={2} size={38} anchor="start">{l}</Text>
                <Text x={340} y={2} size={42} anchor="end" color={i === 0 ? C.red : C.ink}>{cur > i ? amt : '?'}</Text>
              </G2>
            ))}
            <SourceTag f={f} at={sl[0]} text="AAA 2026 per year; fuel 17.3¢ & maintenance 11.7¢ per mile x 15,000 miles" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={420} s={P('c3e') * bump(tk)}><Ticket s={1.4} text="$777/mo" /></G2>
            <G2 x={500} y={600} s={P('c3e', 2)} o={lit(pm)}><Text size={42}>the payment = the ticket</Text></G2>
            <G2 x={1320} y={420} s={P('c3e', 3) * bump(rd)} o={lit(rd)}><PriceTag s={1.8} text="$12,863/yr" color={C.red} /></G2>
            <G2 x={1320} y={620} s={P('c3e', 4)} o={lit(rd)}><Text size={42} color={C.red}>the whole ride</Text></G2>
            <Dave f={f} x={900} y={900} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: rd, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={480} y={790} s={1.5 * P('c3f') * bump(se)}><Car /></G2>
            <G2 x={480} y={450} s={P('c3f', 2) * bump(sx)}><Sticker title="SMALL SEDAN" value={V(sx, '62¢ / mile')} color={C.green} /></G2>
            <Pickup x={1380} y={780} s={1.1 * P('c3f', 3) * bump(pu)} />
            <G2 x={1380} y={450} s={P('c3f', 4) * bump(tn)}><Sticker title="BIG PICKUP" value={V(tn, '$1.10 / mile')} color={C.red} /></G2>
            <SourceTag f={f} at={sx} text="AAA 2026: small sedan 61.73¢/mile · half-ton pickup $1.10/mile" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Loan race ============
  {
    const bo = w('c4a', 'borrow');
    const rc = w('c4a', 'race');
    const dh = w('c4b', 'downhill');
    const ln = w('c4b', 'loan');
    const tu = w('c4b', 'turtle');
    const lg = w('c4c', 'longer');
    const ed = w('c4c', 'edmunds');
    const th = w('c4c', 'three');
    const fo = w('c4c', 'four');
    const wn = w('c4d', 'wins');
    const ow = w('c4d', 'owes');
    const uw = w('c4d', 'underwater');
    const tr = w('c4e', 'three');
    const sv = w('c4e', 'seven');
    const vd = w('c4f', 'video');
    const ro = w('c4f', 'rolled');
    const gh = w('c4f', 'ghost');
    q(bo, 'pop', 0.5);
    q(rc, 'ding', 0.6);
    q(dh, 'whoosh', 0.6);
    q(tu, 'boing', 0.6);
    q(lg, 'pop', 0.5);
    q(th, 'ding', 0.6);
    q(fo, 'ding', 0.6);
    q(wn, 'trombone', 0.4);
    q(ow, 'thud', 0.6);
    q(uw, 'stamp', 0.7);
    q(tr, 'ding', 0.6);
    q(sv, 'thud', 0.6);
    q(vd, 'flip', 0.5);
    q(ro, 'whoosh_s', 0.5);
    q(gh, 'dream', 0.7);
    const val = [50, 40, 34, 30, 27, 24, 22, 20];
    const loan = [44, 40, 35.5, 30.5, 25, 19, 12.5, 6];
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('c4a') * bump(rc)}><Text size={60}>THE LOAN RACE (to $0)</Text></G2>
            <RaceTrack x={960} y={420} s={P('c4a', 2)} w={1400} carX={ease(f, dh, dh + 40, 0, 0.75)} loanX={ease(f, ln, A('c4c'), 0, 0.2)} />
            <Turtle f={f} x={1500} y={820} s={0.9 * P('c4a', 4) * bump(tu, 0.25)} label="LOAN" />
            <Dave f={f} x={300} y={900} s={0.8} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}, {at: tu, pose: 'facepalm', expr: 'worried', look: 0.8}]} />
            <G2 x={900} y={840} s={P('c4a', 5)} o={lit(bo)}><Text size={40} color="#5B6470">most people borrow</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c4c') * bump(lg)}><Text size={54}>car loans keep getting LONGER</Text></G2>
            <Panel x={620} y={420} w={640} h={240} title="LONGER THAN 6 YEARS" value={V(th, '1 in 3+')} color={C.red} size={100} s={P('c4c', 2) * bump(th)} />
            <Panel x={1300} y={420} w={640} h={240} title="7 YEARS OR MORE" value={V(fo, '~1 in 4')} color={C.red} size={100} s={P('c4c', 3) * bump(fo)} />
            {[60, 72, 84].map((m, i) => (
              <G2 key={m} x={560 + i * 400} y={720} s={P('c4c', 4 + i)} o={i === 0 ? 0.6 : lit(i === 1 ? th : fo)}>
                <rect x={-150} y={-50} width={300} height={100} rx={20} fill={i ? '#FDE3EA' : '#E3F6EC'} stroke={C.ink} strokeWidth={5} />
                <Text size={42}>{m} months</Text>
              </G2>
            ))}
            <SourceTag f={f} at={ed} text="Edmunds Q2 2026: 36.5% of new-car loans 73+ months · 23.9% at 84+" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P('c4d')}><Text size={46}>what Dave owes vs what the car is worth</Text></G2>
            <G2 x={620} y={500} s={P('c4d', 2)}>
              <LineChart t={ease(f, A('c4d'), wn, 0.2, 1)} pts={val} w={900} h={440} lo={0} hi={52} color={C.green} />
              <LineChart t={ease(f, A('c4d'), wn, 0.2, 1)} pts={loan} w={900} h={440} lo={0} hi={52} color={C.red} axes={false} />
              <Text x={380} y={-20} size={34} color={C.red}>LOAN</Text>
              <Text x={380} y={100} size={34} color={C.green}>CAR</Text>
              <rect x={-450 + 900 / 7} y={-200} width={900 * 3 / 7} height={420} fill={C.blue} opacity={f >= uw ? 0.14 : 0} />
            </G2>
            <Stamp x={620} y={310} s={pop(f, uw, 9, 260)} text="UNDERWATER" size={54} color={C.blue} r={-6} />
            <Panel x={1480} y={380} w={560} h={220} title="TRADE-INS UNDERWATER" value={V(tr, '~3 in 10')} color={C.red} size={86} s={P('c4d', 3) * bump(tr)} />
            <Panel x={1480} y={640} w={560} h={220} title="AVERAGE AMOUNT" value={V(sv, '$7,183')} color={C.red} size={86} s={P('c4d', 4) * bump(sv)} />
            <Dave f={f} x={180} y={900} s={0.7} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ow, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= uw} />
            <SourceTag f={f} at={tr} text="Edmunds Q1 2026: 30.9% of trade-ins underwater, avg $7,183 · chart = illustration" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Suv x={960} y={790} s={1.5 * P('c4f')} color="#E76F51" tag="NEW" />
            <Ghost f={f} x={1180} y={500} s={1.1 * pop(f, gh) * bump(gh, 0.2)} label="OLD DEBT" />
            <G2 x={400} y={330} s={P('c4f', 2) * bump(vd)}><Frame w={420} h={260} label="ep. 23"><Text size={40}>$50,000 car</Text></Frame></G2>
            <G2 x={960} y={200} s={P('c4f', 3) * bump(ro)} o={lit(ro)}><Text size={52}>old debt → rolled into the new loan</Text></G2>
            <Dave f={f} x={1640} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: gh, pose: 'panic', expr: 'shock', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Dealer's secret ============
  {
    const fo = w('c5a', 'fortune');
    const np = w('c5a', 'nope');
    const fy = w('c5b', 'forty');
    const fr = w('c5b', 'four');
    const fn = w('c5c', 'finance');
    const rc = w('c5c', 'record');
    const sv = w('c5d', 'service');
    const hf = w('c5d', 'half');
    const th = w('c5e', 'theater');
    const tk = w('c5e', 'ticket');
    const pc = w('c5e', 'popcorn');
    const it = [w('c5f', 'loan'), w('c5f', 'warranty'), w('c5f', 'paint'), w('c5f', 'service')];
    q(fo, 'cash', 0.5);
    q(np, 'buzz', 0.7);
    q(fy, 'coin', 0.6);
    q(fr, 'ding', 0.6);
    q(fn, 'paper', 0.5);
    q(rc, 'stamp', 0.6);
    q(sv, 'clank', 0.6);
    q(hf, 'cash', 0.7);
    q(th, 'pop', 0.5);
    q(tk, 'pop', 0.5);
    q(pc, 'pop2', 0.7);
    it.forEach((x) => q(x, 'pop', 0.5));
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dealership f={f} x={620} y={822} s={0.8 * P('c5a')} name="SHINY MOTORS" />
            <Seller f={f} x={1140} y={822} s={1.05 * P('c5a', 2)} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}, {at: np, pose: 'shrug', expr: 'neutral', look: 0.8}]} />
            <G2 x={620} y={160} s={P('c5a', 3) * bump(fo)}><Text size={46}>{f >= np ? 'myth!' : '"dealers get rich on the car"'}</Text></G2>
            <Stamp x={620} y={330} s={pop(f, np, 9, 260)} text="NOPE" size={70} color={C.red} r={-8} />
            <Panel x={1560} y={330} w={560} h={220} title="PROFIT PER NEW CAR" value={V(fy, '$1,840')} color={C.green} size={90} s={P('c5a', 4) * bump(fy)} />
            <Panel x={1560} y={600} w={560} h={200} title="OF A $50K CAR" value={V(fr, 'under 4%')} size={80} s={P('c5a', 5) * bump(fr)} />
            <SourceTag f={f} at={fy} text="Presidio-NCM Q2 2026: new-vehicle gross profit $1,840/unit" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c5c')}><Text size={54}>where the dealer really makes money</Text></G2>
            <Frame x={400} y={530} s={P('c5c', 2)} w={460} h={560} label="THE CAR">
              <Suv y={-40} s={0.8} color="#2A9D8F" />
              <Text y={160} size={60} color={C.green}>$1,840</Text>
            </Frame>
            <Frame x={960} y={530} s={P('c5c', 3) * bump(fn)} o={lit(fn)} w={460} h={560} label="FINANCE OFFICE">
              <MoneyStack n={3} s={0.7} y={-40} label="" />
              <Text y={160} size={60} color={C.red}>{V(fn, '$1,769')}</Text>
              <Stamp y={-170} s={0.7 * pop(f, rc, 9, 260)} text="RECORD" size={50} color={C.red} r={-6} />
            </Frame>
            <Frame x={1520} y={530} s={P('c5c', 4) * bump(sv)} o={lit(sv)} w={460} h={560} label="SERVICE & PARTS">
              <Wrench s={1} y={-50} />
              <Text y={160} size={46} color={C.red}>{f >= hf ? '52.8% of profit' : '?'}</Text>
            </Frame>
            <SourceTag f={f} at={fn} text="Presidio-NCM Q2 2026: F&I $1,769/vehicle (record) · service & parts 52.8% of gross profit" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <rect x={560} y={130} width={800} height={380} rx={14} fill="#2E3440" stroke={C.ink} strokeWidth={6} opacity={P('c5e')} />
            <G2 x={960} y={320} s={P('c5e') * bump(th)}><Text size={60} color="#fff">NOW SHOWING: YOUR CAR</Text></G2>
            <G2 x={420} y={720} s={P('c5e', 2) * bump(tk)} o={lit(tk)}><Ticket s={1.1} text="THE CAR" /><Text y={120} size={36}>barely pays the bills</Text></G2>
            <G2 x={1000} y={780} s={1.1 * P('c5e', 3) * bump(pc, 0.25)}><Popcorn /></G2>
            <G2 x={1000} y={520} s={P('c5e', 4)} o={lit(pc)}><Text size={44} color={C.red}>the popcorn = the profit</Text></G2>
            {['LOAN', 'WARRANTY', 'PAINT PROTECTION', 'SERVICE'].map((l, i) => (
              <G2 key={l} x={1580} y={560 + i * 95} s={P('c5e', 5 + i) * bump(it[i])} o={lit(it[i])}>
                <Box w={400} h={78} fill={f >= it[i] ? C.yellow : '#fff'} />
                <Text size={34}>{l}</Text>
              </G2>
            ))}
            <Seller f={f} x={1580} y={430} s={0.5} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Opportunity cost ============
  {
    const oc = w('c6a', 'opportunity');
    const el = w('c6a', 'else');
    const sv = w('c6b', 'seven');
    const ed = w('c6b', 'edmunds');
    const fv = w('c6b', 'five');
    const ex = w('c6b', 'experian');
    const tw = w('c6c', 'two');
    const ev = w('c6c', 'every');
    const ci = w('c6d', 'compound');
    const gu = w('c6d', 'guaranteed');
    const tn = w('c6e', 'forty');
    const ty = w('c6e', 'thirty');
    const tn2 = w('c6e', 'ninety');
    const sd = w('c6f', 'same');
    const sm = w('c6f', 'smell');
    q(oc, 'ding', 0.6);
    q(el, 'dream', 0.5);
    q(sv, 'cash', 0.6);
    q(fv, 'coin', 0.6);
    q(tw, 'ding', 0.7);
    q(ev, 'tick', 0.5);
    q(ci, 'flip', 0.5);
    q(gu, 'pop', 0.4);
    q(tn, 'cash', 0.6);
    q(ty, 'tick', 0.5);
    q(tn2, 'cash', 0.8);
    q(sd, 'pop', 0.5);
    q(sm, 'boing', 0.6);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6a') * bump(oc)}><Text size={56}>OPPORTUNITY COST</Text></G2>
            <G2 x={960} y={175} s={P('c6a', 1)} o={lit(el)}><Text size={34} color="#5B6470">what else your money could have done</Text></G2>
            <Panel x={560} y={440} w={620} h={260} title="NEW CAR PAYMENT" value={V(sv, '$777')} color={C.red} size={120} s={P('c6a', 2) * bump(sv)} />
            <Panel x={1360} y={440} w={620} h={260} title="USED CAR PAYMENT" value={V(fv, '$542')} color={C.green} size={120} s={P('c6a', 3) * bump(fv)} />
            <G2 x={960} y={720} s={P('c6a', 4) * bump(tw)} o={lit(tw)}><Box w={760} h={140} fill={f >= tw ? C.yellow : '#fff'} /><Text size={64}>{V(tw, 'difference: $235 / month')}</Text></G2>
            <SourceTag f={f} at={ed} until={ex} text="Edmunds Q2 2026: average new-car payment $777 (record)" />
            <SourceTag f={f} at={ex} text="Experian Q2 2026: average used-car payment $542" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6d') * bump(ci)}><Text size={52}>$235 a month, invested (example: 7% a year)</Text></G2>
            <Snowball x={560} y={560} s={P('c6d', 2)} rad={ease(f, A('c6d'), ty + 20, 70, 220)} spin={f * 3} label="$235/mo" />
            <G2 x={560} y={870} s={P('c6d', 3)} o={lit(gu)}><Text size={32} color="#5B6470">not guaranteed · just an example</Text></G2>
            <Panel x={1360} y={380} w={640} h={230} title="AFTER 10 YEARS" value={V(tn, '~$41,000')} color={C.green} size={100} s={P('c6d', 4) * bump(tn)} />
            <Panel x={1360} y={660} w={640} h={230} title="AFTER 30 YEARS" value={V(tn2, '~$287,000')} color={C.green} size={100} s={P('c6d', 5) * bump(tn2)} />
            <G2 x={260} y={250} s={P('c6d', 6)}><Frame w={300} h={140} label="ep. 15"><Text size={30}>compound interest</Text></Frame></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={300} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}]} />
            <Suv x={620} y={790} s={0.8 * P('c6f')} color="#2A9D8F" tag="NEW" />
            <G2 x={460} y={360} s={P('c6f', 2)}><Text size={44}>$0 saved</Text></G2>
            <Dave f={f} x={1260} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sd, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <OldCar f={f} x={1560} y={800} s={0.9 * P('c6f', 3)} />
            <G2 x={1420} y={360} s={P('c6f', 4) * bump(sd)}><MoneyStack n={6} s={0.8} label="$287K" /></G2>
            <line x1={960} y1={260} x2={960} y2={880} stroke={C.ink} strokeWidth={5} strokeDasharray="12 12" />
            <G2 x={960} y={180} s={P('c6f', 5) * bump(sm)} o={lit(sm)}><Box w={820} h={100} fill={C.yellow} /><Text size={42}>the difference: the smell of the car</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Sweet spot ============
  {
    const sw = w('c7a', 'sweet');
    const tt = w('c7b', 'two');
    const sp = w('c7b', 'steepest');
    const so = w('c7b', 'someone');
    const ed = w('c7c', 'edmunds');
    const th = w('c7c', 'thirty');
    const ff = w('c7c', 'fifty');
    const sv = w('c7d', 'seventeen');
    const lf = w('c7d', 'life');
    const fa = w('c7e', 'fair');
    const rt = w('c7e', 'rates');
    const wn = w('c7e', 'win');
    const mt = w('c7e', 'math');
    const ch = w('c7f', 'cheapest');
    const ow = w('c7f', 'own');
    const tn = w('c7f', 'thirteen');
    q(sw, 'chime', 0.6);
    q(tt, 'pop', 0.5);
    q(sp, 'whoosh_s', 0.5);
    q(so, 'coin', 0.6);
    q(th, 'ding', 0.6);
    q(ff, 'pop', 0.5);
    q(sv, 'cash', 0.7);
    q(fa, 'pop', 0.5);
    q(rt, 'thud', 0.5);
    q(wn, 'ding', 0.5);
    q(mt, 'scribble', 0.6);
    q(ch, 'ding', 0.6);
    q(ow, 'pop2', 0.6);
    q(tn, 'stamp', 0.6);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c7a') * bump(sw)}><Text size={56}>the SWEET SPOT</Text></G2>
            <WaterSlide x={1000} y={540} s={P('c7a', 2)} w={1200} h={560} t={ease(f, tt, sp + 20, 0, 0.3)} color={C.blue} marks={[{u: 0.3, label: '2-3 years old', lit: f >= tt ? 1 : 0.4}]} />
            {f >= sw && <Star x={1060} y={380} s={0.8 * pop(f, sw)} color={C.gold} />}
            <G2 x={560} y={560} s={P('c7a', 3)} o={lit(sp)}><Text size={38} color={C.red}>steep part: done</Text></G2>
            <Dave f={f} x={1640} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: so, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
            <G2 x={1400} y={620} s={pop(f, so)}><Bubble text="someone else paid!" size={36} tail="right" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={330} s={P('c7c') * bump(ff)}><Sticker title="NEW" value="$50,089" /></G2>
            <G2 x={1360} y={330} s={P('c7c', 2) * bump(th)}><Sticker title="3 YEARS OLD" value={V(th, '$32,461')} color={C.green} /></G2>
            <Suv x={560} y={660} s={0.8 * P('c7c', 3)} color="#2A9D8F" tag="NEW" />
            <Suv x={1360} y={660} s={0.8 * P('c7c', 4)} color="#8AB6D6" />
            <G2 x={960} y={830} s={P('c7c', 5) * bump(sv)} o={lit(sv)}><Box w={800} h={110} fill={C.yellow} /><Text size={48}>{V(sv, '~$17,600 less')}{f >= lf ? ' · lots of life left' : ''}</Text></G2>
            <SourceTag f={f} at={ed} text="Edmunds Q2 2026: avg 3-year-old used car $32,461 · KBB new $50,089" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('c7e') * bump(fa)}><Text size={54}>to be fair...</Text></G2>
            <Scale x={960} y={860} s={P('c7e', 2)} tilt={f < rt ? -8 : f < wn ? 0 : 4} left="used: lower price" right="new: special low rate?" />
            <G2 x={660} y={620} s={P('c7e', 3)}><Suv s={0.45} color="#8AB6D6" /></G2>
            <G2 x={1260} y={620} s={P('c7e', 4) * bump(rt)}><Suv s={0.45} color="#2A9D8F" tag="0.9%" /></G2>
            <G2 x={960} y={280} s={P('c7e', 5) * bump(mt)} o={lit(mt)}><Box w={620} h={110} fill={C.yellow} /><Text size={48}>do the math both ways</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <OldCar f={f} x={700} y={790} s={1.4 * P('c7f') * bump(ow, 0.1)} />
            <Dave f={f} x={300} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: ow, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={700} y={330} s={P('c7f', 2) * bump(ch)} o={lit(ch)}><Bubble text="the cheapest car = the one you own" size={36} tail="down" /></G2>
            <Panel x={1480} y={420} w={600} h={250} title="AVERAGE CAR ON U.S. ROADS" value={V(tn, '12.8 years old')} color={C.blue} size={70} s={P('c7f', 3) * bump(tn)} />
            <SourceTag f={f} at={tn} text="S&P Global Mobility (2025): average light-vehicle age 12.8 years, a record" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f'), w('c8f', 'six')];
    const ea = w('c8a', 'education');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ea, 'stamp', 0.5);
    const items = ['Count the TOTAL cost, not the payment', 'Think 2-3 years old + mechanic check', 'Get a pre-approved loan first', 'The 20/4/10 rule', 'Skip the popcorn (add-ons)', 'Keep your car a long time'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={700} y={90} s={P('c8a')}><Text size={54}>How Dave drives smarter</Text></G2>
          <G2 x={700} y={148} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={240 + i * 112} s={0.8 * P('c8a', 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.blue} w={1260} />)}
          {cur > 1 && Array.from({length: cur - 1}).map((_, i) => <Check key={i} x={1100} y={240 + i * 112} s={0.7} />)}
          <G2 x={1620} y={540} s={P('c8a', 4)}>
            <Frame w={440} h={620}>
              {cur === 0 && <Dave f={f} x={0} y={200} s={0.8} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} />}
              {cur === 1 && <g><PriceTag s={1} y={-120} text="$12,863/yr" color={C.red} /><Text y={20} size={34}>depreciation</Text><Text y={70} size={34}>+ fuel + insurance</Text><Text y={120} size={34}>+ repairs</Text></g>}
              {cur === 2 && <g><Suv s={0.6} y={-60} color="#8AB6D6" /><Wrench s={0.7} y={120} x={-80} /><Text y={200} size={32}>independent check</Text></g>}
              {cur === 3 && <g><Text y={-160} size={36}>BANK / CREDIT UNION</Text><Stamp y={-40} s={0.9} text="PRE-APPROVED" size={40} color={C.green} r={-6} /><Text y={120} size={32}>dealer must beat it</Text></g>}
              {cur === 4 && <g>{[['20%', 'down'], ['4', 'years max'], ['10%', 'of income']].map(([a, b], k) => <g key={a} transform={`translate(0,${-170 + k * 150})`}><Text size={70} color={C.blue}>{a}</Text><Text y={52} size={32} color="#5B6470">{b}</Text></g>)}</g>}
              {cur === 5 && <g><Popcorn s={0.8} y={-40} /><XMark x={0} y={-40} s={0.7} /><Text y={200} size={32}>no mystery add-ons</Text></g>}
              {cur === 6 && <g><OldCar f={f} s={0.6} y={-40} /><Text y={160} size={34}>flatter slide</Text></g>}
            </Frame>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Recap ============
  const recap = ['Depreciation: ~20% in year 1, ~40% in 5 years', 'Owning a new car: ~$12,863 a year · long loans → underwater', 'Dealers profit on loans, add-ons & service · savings can grow'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const cur = r.filter((x) => f >= x).length;
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P('d1a')}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={160} y={380 + i * 170} s={P('d1a', 2 + i * 2) * (cur === i + 1 ? bump(r[i], 0.06) : 1)} n={i + 1} text={b} lit={cur >= i + 1 ? 1 : 0.35} color={C.blue} w={1600} />)}
          <Dave f={f} x={1780} y={900} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Next + subscribe ============
  {
    const hb = w('d1e', 'hospital');
    const as = w('d1e', 'aspirin');
    const ft = w('d1e', 'forty');
    const sb = w('d1f', 'subscribe');
    const fr = w('d1f', 'free');
    const tw = w('d1f', 'twenty');
    q(hb, 'mail', 0.6);
    q(as, 'pop', 0.6);
    q(ft, 'thud', 0.7);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    q(tw, 'coin', 0.5);
    scene(A('d1e'), () =>
      f < A('d1f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={120} s={P('d1e')}><Text size={54} color="#5B6470">NEXT TIME</Text></G2>
            <HospitalBill x={960} y={520} s={1.6 * P('d1e', 2) * bump(hb)} />
            <G2 x={1400} y={420} s={P('d1e', 3) * bump(ft, 0.25)} o={lit(as)}><Box w={420} h={130} fill={C.yellow} /><Text size={50} color={C.red}>{V(ft, '1 aspirin: $40')}</Text></G2>
            <Dave f={f} x={460} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: ft, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= ft} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * P('d1f')} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={P('d1f', 2)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Suv x={1500} y={820} s={0.7 * P('d1f', 3)} color="#2A9D8F" />
            <G2 x={960} y={680} s={P('d1f', 3) * bump(tw)}><Text size={46} color={f >= fr ? C.green : C.ink}>price: $0 · never loses 20% off the lot</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2f', 'away') + 20;
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
