import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, Interior} from '../fx';
import {Arrow, Bubble, Coin, Duck, MoneyStack, SourceTag, Stamp, Text} from '../props';
import {Bar, Frame, Icon, Magnifier, Row, SubButton, Bell} from '../props2';
import {Raccoon, TollBooth} from '../props3';
import {Burger, House} from '../props4';
import {Lemon, Stand} from '../props7';
import {Bottle, MemberCard, SlicePie} from '../props8';
import {Gym} from '../props29';
import {BigReceipt, DeliveryApp, FoodBag, MenuCard, Scooter} from '../props33';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Driver: React.FC<SP> = (p) => <Stick acc={['cap']} seed={58} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';
const DIM = '#E8E1D2';

const Box: React.FC<{x: number; y: number; w: number; h: number; o?: number; s?: number; fill?: string; children?: React.ReactNode}> = ({x, y, w, h, o = 1, s = 1, fill = '#fff', children}) => (
  <G2 x={x} y={y} o={o} s={s}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </G2>
);

const Trash: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <G2 x={x} y={y} s={s}>
    <path d="M -110 -120 L 110 -120 L 90 130 L -90 130 Z" fill="#9AA5B1" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-130} y={-150} width={260} height={36} rx={10} fill="#7B8794" stroke={C.ink} strokeWidth={6} />
    {[-50, 0, 50].map((xx) => <line key={xx} x1={xx} y1={-80} x2={xx * 0.85} y2={100} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />)}
  </G2>
);

export const Ep33: React.FC = () => {
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
    const tw = w('o1', 'twelve');
    const td = w('o2', 'tired');
    const op = w('o2', 'opens');
    const tp = w('o2', 'taps');
    const tt = w('o2', 'twenty');
    q(2, 'pop', 0.6);
    q(tw, 'coin', 0.6);
    q(td, 'sputter', 0.4);
    q(op, 'click', 0.5);
    q(tp, 'key', 0.6);
    q(tt, 'sting', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={300} y={900} s={1.2} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: td, pose: 'relax', expr: 'tired'}, {at: tp, pose: 'typing', expr: 'neutral'}, {at: tt, pose: 'shock', expr: 'shock'}]} />
          <MenuCard x={760} y={330} s={P(0) * bump(tw, 0.12)} title="AT THE RESTAURANT" item="burger" price="$12" on={f >= tw ? 1 : 0} color={C.green} />
          <G2 x={760} y={720} s={0.9 * P(0)}><Burger s={1.1} /></G2>
          <DeliveryApp x={1200} y={560} s={P(0) * bump(op, 0.08)} big="burger" sub="delivered to you" btn="ORDER" press={f >= tp && f < tp + 8 ? 1 : 0} />
          <Box x={1650} y={420} w={420} h={300} s={P(0) * bump(tt, 0.2)} fill={f >= tt ? C.yellow : '#fff'}>
            <Text y={-90} size={38} color={GRAY}>APP TOTAL</Text>
            <Text y={30} size={130} color={f >= tt ? C.red : GRAY}>{f >= tt ? '$28' : '?'}</Text>
          </Box>
          <G2 x={1650} y={680} s={P(0)} o={lt(tt, 0.4)}><Text size={48} color={C.red}>{f >= tt ? 'for ONE burger' : 'loading...'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sm = w('o3', 'same');
    const db = w('o3', 'double');
    const ls = w('o4', 'less');
    const sv = w('o4', 'seven');
    const rs = w('o5', 'rest');
    q(sm, 'pop', 0.5);
    q(db, 'boing', 0.6);
    q(ls, 'ding', 0.5);
    q(sv, 'coin', 0.5);
    q(rs, 'sting', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={420} y={300} s={P(A('o3')) * bump(sm, 0.1)}><Burger s={1.2} /><Text y={190} size={60} color={C.green}>$12 in store</Text></G2>
          <G2 x={1000} y={300} s={P(A('o3')) * bump(db, 0.15)}><Text size={120} color={f >= db ? C.red : GRAY}>{f >= db ? '×2.3' : '='}</Text></G2>
          <G2 x={1560} y={300} s={P(A('o3')) * bump(sm, 0.1)}><Burger s={1.2} /><Text y={190} size={60} color={C.red}>$28 on the app</Text></G2>
          {[['RESTAURANT', 'less than $12', ls, C.green], ['DRIVER', '~$7', sv, C.blue], ['THE REST', '???', rs, C.red]].map(([l, v, at, c], i) => (
            <Box key={l as string} x={420 + i * 570} y={800} w={500} h={220} s={P(A('o3')) * bump(at as number, 0.12)} fill={f >= (at as number) && i === 2 ? C.yellow : '#fff'}>
              <Text y={-55} size={38} color={GRAY}>{l as string}</Text>
              <Text y={35} size={64} color={f >= (at as number) ? (c as string) : '#B8AF9E'}>{f >= (at as number) ? (v as string) : '?'}</Text>
            </Box>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'receipt'), w('o6', 'slice'), w('o6', 'less')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['EVERY LINE', 'WHO GETS EACH SLICE', 'HOW TO PAY LESS'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <BigReceipt y={-30} s={0.42} lines={[['burger', '$15'], ['fees', '$7'], ['tip', '$4']]} lit={[1, 1, 1]} total="$28" totalOn={1} />}
                {i === 1 && <SlicePie y={-30} rad={150} slices={[{v: 0.4, c: C.green}, {v: 0.25, c: C.blue}, {v: 0.07, c: GRAY}, {v: 0.28, c: C.red}]} />}
                {i === 2 && <FoodBag y={-30} s={1.1} label="PICKUP" />}
                <Text y={210} size={36}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 receipt ============
  {
    const lit = [w('c1b', 'fifteen'), w('c1c', 'two'), w('c1c', 'two', 1), w('c1d', 'one'), w('c1e', 'one'), w('c1e', 'four')];
    const tw = w('c1b', 'twelve');
    const id = w('c1d', 'idea');
    const tot = w('c1f', 'twenty');
    const sc = w('c1f', 'second');
    const ex = w('c1f', 'except');
    lit.forEach((x) => q(x, 'key2', 0.55));
    q(tw, 'boing', 0.5);
    q(id, 'cricket', 0.4);
    q(tot, 'stamp', 0.7);
    q(sc, 'pop', 0.5);
    q(ex, 'trombone', 0.5);
    const cur = lit.filter((x) => f >= x).length;
    const lines: [string, string][] = [['burger', '$15.00'], ['delivery fee', '$2.99'], ['service fee', '$2.25'], ['regulatory resp. fee', '$1.99'], ['taxes', '$1.77'], ['driver tip', '$4.00']];
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={260} y={900} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: tw, pose: 'shrug', expr: 'suspicious'}, {at: id, pose: 'think', expr: 'worried'}, {at: tot, pose: 'shock', expr: 'shock'}]} />
          <BigReceipt x={1000} y={540} s={P(A('c1a'))} w={700} lines={lines} lit={lines.map((_, i) => (f >= lit[i] ? 1 : 0))} hl={cur - 1} total="$28.00" totalOn={f >= tot ? 1 : 0} title="DAVE'S ORDER" />
          <MenuCard x={1650} y={250} s={0.7 * P(A('c1a')) * bump(tw, 0.15)} title="IN STORE" item="burger" price="$12" color={C.green} on={1} />
          <G2 x={1650} y={500} s={P(A('c1a')) * bump(id, 0.15)} o={lt(id, 0.4)}><Bubble text={'regulatory...\nwhat?'} size={38} tail="down" /></G2>
          <G2 x={1650} y={800} s={P(A('c1a')) * bump(sc, 0.15)} o={lt(sc, 0.35)}>
            <Burger s={0.9} />
            <Text y={140} size={40} color={C.red}>+$16 of extras</Text>
            {f >= ex && <path d="M -140 -110 L 140 110 M 140 -110 L -140 110" stroke={C.red} strokeWidth={14} strokeLinecap="round" />}
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 menu markup ============
  {
    const hi = w('c2b', 'higher');
    const nt = w('c2b', 'notice');
    const cm = w('c2c', 'commission');
    const pc = [w('c2c', 'fifteen'), w('c2c', 'twenty'), w('c2c', 'thirty')];
    q(hi, 'ding', 0.6);
    q(nt, 'whoosh_s', 0.4);
    q(cm, 'stamp', 0.5);
    pc.forEach((x) => q(x, 'pop2', 0.5));
    const ld = w('c2d', 'lemonade');
    const gt = w('c2d', 'gate');
    const th = w('c2d', 'thirty');
    const rz = w('c2d', 'raise');
    q(ld, 'pop', 0.5);
    q(gt, 'pop2', 0.5);
    q(th, 'coin', 0.6);
    q(rz, 'boing', 0.6);
    const sd = w('c2e', 'study');
    const th2 = w('c2e', 'thirty');
    const sx = w('c2e', 'six');
    const ff = w('c2f', 'fifteen');
    const hd = w('c2f', 'hiding');
    const fe = w('c2f', 'fee');
    q(sd, 'paper', 0.5);
    q(th2, 'ding', 0.6);
    q(sx, 'ding', 0.5);
    q(ff, 'cash', 0.5);
    q(hd, 'whoosh_s', 0.4);
    q(fe, 'stamp', 0.6);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <MenuCard x={480} y={380} s={P(A('c2a'))} title="IN THE STORE" item="burger" price="$12" color={C.green} />
            <MenuCard x={1060} y={380} s={P(A('c2a')) * bump(hi, 0.15)} title="ON THE APP" item="same burger" price="$15" color={C.red} on={f >= hi ? 1 : 0} />
            <G2 x={770} y={380} s={P(A('c2a'))}><Text size={70} color={f >= hi ? C.red : GRAY}>{f >= hi ? '<' : 'vs'}</Text></G2>
            <G2 x={770} y={680} s={P(A('c2a')) * bump(cm, 0.1)} o={lt(cm, 0.45)}><Text size={46}>the app's commission on every order:</Text></G2>
            {['15%', '25%', '30%'].map((l, i) => (
              <G2 key={l} x={470 + i * 300} y={830} s={P(A('c2a')) * bump(pc[i], 0.2)}>
                <rect x={-120} y={-60} width={240} height={120} rx={26} fill={f >= pc[i] ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
                <Text y={4} size={64} color={f >= pc[i] ? '#fff' : '#B8AF9E'}>{l}</Text>
              </G2>
            ))}
            <Dave f={f} x={1600} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}, {at: nt, pose: 'shrug', expr: 'neutral'}, {at: cm, pose: 'point_l', expr: 'shock'}]} />
            <G2 x={1600} y={330} s={P(A('c2a')) * bump(nt)} o={lt(nt, 0.4)}><Bubble text={'I never\nnoticed!'} size={40} tail="down" /></G2>
            <SourceTag f={f} at={pc[0]} text="DoorDash merchant pricing: Basic 15%, Plus 25%, Premier 30% commission" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Stand x={560} y={822} s={1.1 * P(A('c2d'))} label="LEMONADE" big />
            <Dave f={f} x={230} y={822} s={1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: th, pose: 'shock', expr: 'angry'}, {at: rz, pose: 'point_up', expr: 'smug'}]} />
            <G2 x={560} y={330} s={P(A('c2d')) * bump(rz, 0.2)}>
              <rect x={-150} y={-60} width={300} height={120} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={4} size={64} color={f >= rz ? C.red : C.ink}>{f >= rz ? '$1.30' : '$1.00'}</Text>
            </G2>
            <TollBooth x={1250} y={822} s={0.8 * P(A('c2d')) * bump(gt, 0.1)} label="THE GATE" barUp={f >= th ? 0.9 : 0} />
            <Raccoon f={f} x={1560} y={740} s={1.1 * P(A('c2d'))} mood="greedy" grab={ease(f, th, th + 10)} holdCoin={f >= th} />
            <G2 x={1400} y={250} s={P(A('c2d')) * bump(th, 0.2)} o={lt(th, 0.4)}><Text size={56} color={C.red}>takes 30¢ a cup</Text></G2>
            <G2 x={900} y={560} o={lt(ld, 0.5)}><Lemon s={1.6} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={120} s={P(A('c2e')) * bump(sd)}><Text size={46}>2026 study · 100+ menu items</Text></G2>
            <line x1={200} y1={820} x2={920} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={380} y={820} h={ease(f, th2 - 4, th2 + 14, 60, 540)} color={C.red} label="big chains" value={f >= th2 ? '+30%' : '?'} w={240} />
            <Bar x={740} y={820} h={ease(f, sx - 4, sx + 14, 40, 110)} color={C.green} label="small local place" value={f >= sx ? '+6%' : '?'} w={240} />
            <Box x={1420} y={330} w={760} h={300} s={P(A('c2e')) * bump(ff, 0.1)} fill={f >= ff ? C.yellow : '#fff'}>
              <Text y={-90} size={36} color={GRAY}>Dave's burger</Text>
              <Text y={10} size={96}>$12 → {f >= ff ? '$15' : '?'}</Text>
              <Text y={100} size={44} color={C.red}>{f >= ff ? '+25% markup' : ''}</Text>
            </Box>
            <G2 x={1420} y={620} s={P(A('c2e')) * bump(hd, 0.2)} o={lt(hd, 0.4)}><Magnifier s={1.1} /></G2>
            <Stamp x={1420} y={860} s={P(A('c2e')) * bump(fe, 0.15)} o={lt(fe, 0.35)} text="NOT CALLED A FEE" size={56} color={C.red} r={-4} />
            <SourceTag f={f} at={sd} text="2026 analysis of 100+ items at 4 restaurants: markups of 30%, 20% and 6%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 fee zoo ============
  {
    const np = w('c3a', 'nope');
    const zo = w('c3a', 'zoo');
    const it = [w('c3b', 'delivery'), w('c3c', 'service'), w('c3d', 'small'), w('c3e', 'regulatory')];
    const zr = w('c3b', 'zero');
    const fi = w('c3c', 'fifteen');
    const bg = w('c3c', 'bigger', 1);
    const tw = w('c3d', 'two');
    const ny = w('c3e', 'new');
    const nn = w('c3e', 'one');
    q(np, 'buzz', 0.7);
    q(zo, 'boing', 0.5);
    it.forEach((x) => q(x, 'pop', 0.55));
    q(zr, 'ding', 0.5);
    q(fi, 'ding', 0.5);
    q(bg, 'pop2', 0.4);
    q(tw, 'coin', 0.5);
    q(ny, 'pop2', 0.4);
    q(nn, 'coin', 0.5);
    const rc = w('c3f', 'raccoon');
    const rw = w('c3f', 'row');
    const lt2 = w('c3f', 'little');
    const hu = w('c3g', 'hurt');
    const dp = w('c3g', 'drip');
    q(rc, 'pop2', 0.6);
    q(rw, 'clank', 0.5);
    q(lt2, 'coin', 0.5);
    q(hu, 'thud', 0.5);
    q(dp, 'stamp', 0.7);
    const cur = it.filter((x) => f >= x).length;
    const booths = ['DELIVERY', 'SERVICE', 'SMALL ORDER', 'REGULATORY'];
    scene(A('c3a'), () =>
      f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3a')) * bump(np, 0.12)}>
              <Text size={52} color={f >= np ? C.red : GRAY}>{f >= np ? "NOPE. It's a whole fee zoo." : 'Myth: the delivery fee is the only extra'}</Text>
            </G2>
            {booths.map((l, i) => (
              <G2 key={l} x={270 + i * 460} y={590} s={P(A('c3a')) * bump(it[i], 0.07)} o={cur > i ? 1 : 0.45}>
                <Frame w={420} h={700}>
                  {i === 0 && (
                    <g>
                      <Scooter y={-120} s={0.8} f={f} />
                      <Text y={60} size={32} color={GRAY}>pays for the trip</Text>
                      <Text y={110} size={32} color={GRAY}>changes by distance</Text>
                      <G2 y={180} s={bump(zr, 0.2)}><Text size={36} color={f >= zr ? C.green : '#B8AF9E'}>sometimes "$0" bait</Text></G2>
                    </g>
                  )}
                  {i === 1 && (
                    <g>
                      <Text y={-150} size={110} color={f >= fi ? C.red : '#B8AF9E'}>{f >= fi ? '15%' : '?'}</Text>
                      <Text y={-60} size={32} color={GRAY}>of your food</Text>
                      <G2 y={60} s={bump(bg, 0.2)}><Text size={32} color={f >= bg ? C.red : GRAY}>bigger order =</Text><Text y={44} size={32} color={f >= bg ? C.red : GRAY}>bigger fee</Text></G2>
                    </g>
                  )}
                  {i === 2 && (
                    <g>
                      <Burger y={-150} s={0.6} />
                      <Text y={-30} size={32} color={GRAY}>tiny order?</Text>
                      <Text y={60} size={90} color={f >= tw ? C.red : '#B8AF9E'}>{f >= tw ? '~$2' : '?'}</Text>
                    </g>
                  )}
                  {i === 3 && (
                    <g>
                      <Icon kind="rulebook" y={-150} s={1} />
                      <Text y={-20} size={30} color={GRAY}>city pay laws</Text>
                      <Text y={30} size={30} color={f >= ny ? C.ink : GRAY}>New York City:</Text>
                      <Text y={110} size={80} color={f >= nn ? C.red : '#B8AF9E'}>{f >= nn ? '$1.99' : '?'}</Text>
                    </g>
                  )}
                  <Text y={300} size={36}>{l} FEE</Text>
                </Frame>
              </G2>
            ))}
            <SourceTag f={f} at={fi} text="DoorDash Help Center: service fee usually 15% of subtotal" until={it[3]} />
            <SourceTag f={f} at={nn} text="DoorDash Regulatory Response Fee: $1.99 in NYC ($4.99 Seattle)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {booths.map((l, i) => (
              <TollBooth key={l} x={400 + i * 380} y={822} s={0.62 * P(A('c3f')) * bump(rw, 0.08)} label={l} barUp={f >= lt2 + i * 6 ? 0.9 : 0} />
            ))}
            <Raccoon f={f} x={220} y={740} s={1.05 * P(A('c3f')) * bump(rc, 0.2)} mood="greedy" grab={ease(f, lt2, lt2 + 10)} holdCoin={f >= lt2} />
            <G2 x={960} y={150} s={P(A('c3f'))}><Text size={48}>{f >= hu ? 'many small lines hurt less than one big number' : 'each booth takes only a little...'}</Text></G2>
            <G2 x={960} y={270} s={P(A('c3f')) * bump(lt2, 0.15)} o={lt(lt2, 0.4)}><Text size={44} color={C.red}>$2.99 + $2.25 + $1.99 ... = a LOT</Text></G2>
            <Stamp x={1560} y={420} s={P(A('c3f')) * bump(dp, 0.2)} o={lt(dp, 0.3)} text="DRIP PRICING" size={64} color={C.red} r={-6} />
            <G2 x={1780} y={900} s={P(A('c3f'))}><Text size={30} color={GRAY}>ep02 raccoon</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 slices ============
  {
    const pz = w('c4a', 'pizza');
    const el = w('c4b', 'eleven');
    const ls = w('c4c', 'less');
    const ev = w('c4c', 'even');
    const sv = w('c4d', 'seven');
    const bp = w('c4d', 'base');
    const tx = w('c4e', 'one');
    const eg = w('c4f', 'eight');
    const mr = w('c4g', 'more');
    q(pz, 'pop', 0.6);
    q(el, 'cash', 0.6);
    q(ls, 'buzz', 0.4);
    q(ev, 'pop2', 0.4);
    q(bp, 'pop2', 0.4);
    q(sv, 'coin', 0.6);
    q(tx, 'paper', 0.5);
    q(eg, 'cash', 0.7);
    q(mr, 'sting', 0.6);
    const on = [el, sv, tx, eg];
    const cur = on.filter((x) => f >= x).length;
    const sl = [
      {v: 11.25, c: C.green, l: 'RESTAURANT', a: '$11.25'},
      {v: 7, c: C.blue, l: 'DRIVER', a: '~$7.00'},
      {v: 1.77, c: '#8C7A5B', l: 'TAXES', a: '$1.77'},
      {v: 7.98, c: C.red, l: 'THE APP', a: '~$7.98'},
    ];
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={520} y={120} s={P(A('c4a'))}><Text size={50}>Dave's $28, sliced</Text></G2>
          <SlicePie x={520} y={570} s={P(A('c4a')) * bump(pz, 0.08)} rad={320} pop={cur - 1} slices={sl.map((s, i) => ({v: s.v / 28, c: f >= on[i] ? s.c : DIM, l: f >= on[i] ? s.a : undefined}))} />
          {sl.map((s, i) => (
            <G2 key={s.l} x={1380} y={250 + i * 150} s={P(A('c4a')) * bump(on[i], 0.1)} o={f >= on[i] ? 1 : 0.5}>
              <rect x={-400} y={-58} width={800} height={116} rx={24} fill={i === 3 && f >= mr ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
              <rect x={-380} y={-38} width={76} height={76} rx={16} fill={f >= on[i] ? s.c : DIM} stroke={C.ink} strokeWidth={5} />
              <Text x={-280} y={4} size={46} anchor="start">{s.l}</Text>
              <Text x={370} y={4} size={52} anchor="end" color={f >= on[i] ? s.c : '#B8AF9E'}>{f >= on[i] ? s.a : '?'}</Text>
            </G2>
          ))}
          <G2 x={1380} y={860} s={P(A('c4a')) * bump(ls, 0.1)} o={lt(ls, 0.4)}>
            <Text size={38} color={C.green}>{f >= bp ? 'driver: base pay (~$3) + 100% of the $4 tip' : 'restaurant gets less than its $12 in-store price'}</Text>
          </G2>
          <G2 x={1380} y={940} s={P(A('c4a')) * bump(mr, 0.12)} o={lt(mr, 0.3)}><Text size={44} color={C.red}>app slice {'>'} driver slice</Text></G2>
          <SourceTag f={f} at={bp} text="DoorDash: Dasher base pay $2-$10+, Dashers keep 100% of tips · example order" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 company ============
  {
    const zm = w('c5a', 'zoom');
    const nn = w('c5b', 'nine');
    const tn = w('c5b', 'ten');
    const th = w('c5c', 'thirty');
    q(zm, 'whoosh', 0.5);
    q(nn, 'stamp', 0.6);
    q(tn, 'ding', 0.5);
    q(th, 'cash', 0.6);
    const fr = w('c5d', 'four');
    const tr = w('c5d', 'thirteen');
    const tk = w('c5d', 'take');
    const pe = w('c5e', 'four');
    q(fr, 'cash', 0.6);
    q(tr, 'ding', 0.6);
    q(tk, 'stamp', 0.5);
    q(pe, 'coin', 0.6);
    const sp = w('c5f', 'surprise');
    const cs = [w('c5f', 'support'), w('c5f', 'insurance'), w('c5f', 'refunds'), w('c5f', 'engineers'), w('c5f', 'ads')];
    const tw = w('c5f', 'two');
    const tc = w('c5f', 'twenty');
    const dk = w('c5g', 'duck');
    const tsl = w('c5g', 'thin');
    q(sp, 'dream', 0.4);
    cs.forEach((x) => q(x, 'pop2', 0.45));
    q(tw, 'stamp', 0.6);
    q(tc, 'coin', 0.6);
    q(dk, 'quack', 0.6);
    q(tsl, 'ding', 0.5);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={250} y={900} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}, {at: nn, pose: 'shock', expr: 'shock'}]} />
            <Box x={1050} y={250} w={1000} h={260} s={P(A('c5a')) * bump(nn, 0.08)} fill={f >= nn ? C.yellow : '#fff'}>
              <Text y={-80} size={36} color={GRAY}>DOORDASH ORDERS · Q2 2026 (3 months)</Text>
              <Text y={30} size={110} color={f >= nn ? C.ink : '#B8AF9E'}>{f >= nn ? '970 MILLION' : '?'}</Text>
            </Box>
            <G2 x={1050} y={450} s={P(A('c5a')) * bump(tn)} o={lt(tn, 0.4)}><Text size={50} color={C.red}>= over 10 million orders a day</Text></G2>
            <Box x={1050} y={710} w={1000} h={240} s={P(A('c5a')) * bump(th, 0.08)} o={lt(th, 0.55)}>
              <Text y={-70} size={36} color={GRAY}>TOTAL ORDERED (food & stuff)</Text>
              <Text y={30} size={100} color={f >= th ? C.green : '#B8AF9E'}>{f >= th ? '$33.1 BILLION' : '?'}</Text>
            </Box>
            {[0, 1, 2].map((i) => <Scooter key={i} x={1680 + (i % 2) * 60} y={330 + i * 260} s={0.45 * P(A('c5a'))} f={f} />)}
            <SourceTag f={f} at={nn} text="DoorDash Q2 2026 results: 970M orders, Marketplace GOV $33.1B" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c5d'))}><Text size={48}>Out of $33.1 billion ordered...</Text></G2>
            <G2 x={960} y={380} s={P(A('c5d')) * bump(fr, 0.06)}>
              <rect x={-760} y={-80} width={1520} height={160} rx={24} fill="#E8E1D2" stroke={C.ink} strokeWidth={6} />
              <rect x={-760} y={-80} width={1520 * 0.135} height={160} rx={24} fill={f >= fr ? C.red : '#C9C0AE'} stroke={C.ink} strokeWidth={6} />
              <Text x={-760 + 760 * 0.135} y={4} size={44} color="#fff">{f >= fr ? '$4.5B' : '?'}</Text>
              <Text x={150} y={4} size={44} color={GRAY}>food, drivers, taxes, restaurants...</Text>
            </G2>
            <G2 x={420} y={560} s={P(A('c5d')) * bump(tr, 0.15)} o={lt(fr, 0.4)}><Text size={52} color={C.red}>{f >= tr ? 'DoorDash keeps 13.5%' : 'DoorDash keeps...'}</Text></G2>
            <Stamp x={420} y={700} s={P(A('c5d')) * bump(tk, 0.2)} o={lt(tk, 0.3)} text="TAKE RATE" size={60} color={C.red} r={-5} />
            <Box x={1350} y={740} w={720} h={300} s={P(A('c5d')) * bump(pe, 0.12)} fill={f >= pe ? C.yellow : '#fff'}>
              <Text y={-90} size={36} color={GRAY}>revenue per order (avg)</Text>
              <Text y={30} size={120} color={f >= pe ? C.ink : '#B8AF9E'}>{f >= pe ? '~$4.64' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={fr} text="DoorDash Q2 2026: revenue $4.5B, net revenue margin 13.5% · $4.5B ÷ 970M" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={120} s={P(A('c5f')) * bump(sp)}><Text size={48}>revenue per order: ~$4.64</Text></G2>
            {['− support', '− insurance', '− refunds', '− engineers', '− lots of ads'].map((l, i) => (
              <G2 key={l} x={500} y={230 + i * 105} s={P(A('c5f')) * bump(cs[i])} o={lt(cs[i], 0.4)}>
                <rect x={-240} y={-42} width={480} height={84} rx={18} fill={f >= cs[i] ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={40}>{l}</Text>
              </G2>
            ))}
            <Box x={500} y={870} w={640} h={150} s={P(A('c5f')) * bump(tc, 0.15)} fill={f >= tc ? C.yellow : '#fff'}>
              <Text size={60} color={f >= tc ? C.red : '#B8AF9E'}>{f >= tc ? 'profit ≈ 21¢ / order' : 'profit = ?'}</Text>
            </Box>
            <Box x={1370} y={250} w={720} h={200} s={P(A('c5f')) * bump(tw, 0.1)} o={lt(tw, 0.5)}>
              <Text y={-45} size={34} color={GRAY}>net profit, Q2 2026</Text>
              <Text y={35} size={80} color={C.green}>{f >= tw ? '$200 MILLION' : '?'}</Text>
            </Box>
            <G2 x={1200} y={700} s={P(A('c5f')) * bump(dk, 0.25)} o={lt(dk, 0.45)}>
              <Duck f={f} s={0.9} />
              {f >= dk && <path d="M -120 -120 L 120 120 M 120 -120 L -120 120" stroke={C.red} strokeWidth={12} strokeLinecap="round" />}
            </G2>
            <G2 x={1620} y={700} s={P(A('c5f')) * bump(tsl, 0.12)} o={lt(tsl, 0.4)}>
              <Text size={44}>thin slices</Text>
              <Text y={60} size={44} color={C.red}>× billions of orders</Text>
            </G2>
            <SourceTag f={f} at={tw} text="DoorDash Q2 2026: GAAP net income $200M · $200M ÷ 970M ≈ $0.21" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 DashPass ============
  {
    const ob = w('c6a', 'often');
    const ds = w('c6b', 'dashpass');
    const zr = w('c6b', 'zero');
    const dn = w('c6b', 'down');
    const th = w('c6c', 'thirty');
    q(ob, 'pop', 0.5);
    q(ds, 'stamp', 0.6);
    q(zr, 'ding', 0.6);
    q(dn, 'ding', 0.5);
    q(th, 'cash', 0.6);
    const gy = w('c6d', 'gym');
    const ag = [w('c6d', 'again'), w('c6d', 'again', 1)];
    const ss = [w('c6e', 'markup'), w('c6e', 'tip'), w('c6e', 'small')];
    q(gy, 'boing', 0.5);
    ag.forEach((x) => q(x, 'pop', 0.5));
    ss.forEach((x) => q(x, 'buzz', 0.4));
    const fr = w('c6f', 'four');
    const tw = w('c6f', 'two');
    const on = w('c6f', 'once');
    const nv = w('c6f', 'never');
    q(fr, 'coin', 0.5);
    q(tw, 'ding', 0.6);
    q(on, 'pop2', 0.4);
    q(nv, 'trombone', 0.5);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={260} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ds, pose: 'present', expr: 'happy'}]} />
            <G2 x={780} y={330} s={1.1 * P(A('c6a')) * bump(ds, 0.1)}><MemberCard tier="SUBSCRIBER" price="$9.99/mo" color={C.red} /></G2>
            <G2 x={780} y={130} s={P(A('c6a')) * bump(ob)}><Text size={44} color={f >= ob ? C.red : GRAY}>goal: you order more often</Text></G2>
            <Box x={1450} y={250} w={640} h={150} s={P(A('c6a')) * bump(zr, 0.12)}>
              <Text x={-290} y={3} size={44} anchor="start">delivery fee:</Text>
              <Text x={290} y={3} size={56} anchor="end" color={f >= zr ? C.green : C.ink}>{f >= zr ? '$0' : '$2.99'}</Text>
            </Box>
            <Box x={1450} y={430} w={640} h={150} s={P(A('c6a')) * bump(dn, 0.12)}>
              <Text x={-290} y={3} size={44} anchor="start">service fee:</Text>
              <Text x={290} y={3} size={56} anchor="end" color={f >= dn ? C.green : C.ink}>{f >= dn ? '~5%' : '15%'}</Text>
            </Box>
            <Box x={1100} y={790} w={1100} h={240} s={P(A('c6a')) * bump(th, 0.08)} fill={f >= th ? C.yellow : '#fff'}>
              <Text y={-70} size={36} color={GRAY}>subscription members, end of 2025</Text>
              <Text y={30} size={100} color={f >= th ? C.ink : '#B8AF9E'}>{f >= th ? '35 MILLION+' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={ds} text="DoorDash Help Center: DashPass $9.99/mo, $0 delivery & lower service fees on eligible orders" until={th} />
            <SourceTag f={f} at={th} text="DoorDash Q4 2025: 35M+ DashPass, Wolt+ & Deliveroo Plus members" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={420} y={300} s={1.3 * P(A('c6d')) * bump(gy, 0.15)}><Gym /></G2>
            <Dave f={f} x={420} y={900} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.8}, {at: ss[0], pose: 'shrug', expr: 'worried'}]} />
            {[0, 1, 2].map((i) => (
              <G2 key={i} x={800 + i * 140} y={880} s={0.55 * P(A('c6d')) * (i === 0 ? 1 : bump(ag[i - 1], 0.2))} o={i === 0 || f >= ag[i - 1] ? 1 : 0.3}><FoodBag /></G2>
            ))}
            <G2 x={1450} y={130} s={P(A('c6d'))}><Text size={46}>what the subscription does NOT remove:</Text></G2>
            {['menu markup', 'the tip', 'small order fee'].map((l, i) => (
              <G2 key={l} x={1450} y={280 + i * 150} s={P(A('c6d')) * bump(ss[i])} o={lt(ss[i], 0.4)}>
                <rect x={-300} y={-55} width={600} height={110} rx={22} fill={f >= ss[i] ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={6} />
                <Text y={4} size={48}>{l}: still there</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={700} y={300} w={1000} h={320} s={P(A('c6f')) * bump(tw, 0.08)} fill={f >= tw ? C.yellow : '#fff'}>
              <Text y={-100} size={40} color={GRAY}>break-even math</Text>
              <Text y={-20} size={56}>$9.99 ÷ {f >= fr ? '~$4 saved/order' : '?'}</Text>
              <Text y={80} size={72} color={f >= tw ? C.red : '#B8AF9E'}>{f >= tw ? '= 2 to 3 orders/month' : '= ?'}</Text>
            </Box>
            <G2 x={700} y={680} s={P(A('c6f')) * bump(on, 0.12)} o={lt(on, 0.4)}><Text size={52}>order once a month?</Text></G2>
            <G2 x={1500} y={450} s={1.4 * P(A('c6f')) * bump(nv, 0.15)}><Gym /></G2>
            <Dave f={f} x={1500} y={960} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: nv, pose: 'facepalm', expr: 'sad'}]} />
            <Stamp x={700} y={860} s={P(A('c6f')) * bump(nv, 0.2)} o={lt(nv, 0.3)} text="UNUSED GYM" size={60} color={C.red} r={-4} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 worth it ============
  {
    const sc = w('c7a', 'scam');
    const dr = w('c7a', 'drove');
    const rs = [w('c7b', 'sick'), w('c7b', 'stuck'), w('c7b', 'car')];
    const sx = w('c7b', 'sixteen');
    const tg = w('c7b', 'gas');
    q(sc, 'buzz', 0.4);
    q(dr, 'whoosh', 0.5);
    rs.forEach((x) => q(x, 'pop2', 0.5));
    q(sx, 'coin', 0.5);
    q(tg, 'ding', 0.5);
    const hb = w('c7c', 'habit');
    const tw = w('c7c', 'twice');
    const th = w('c7c', 'thousand');
    const tr = w('c7d', 'trash');
    const kn = w('c7e', 'know');
    q(hb, 'pop', 0.5);
    q(tw, 'tick', 0.5);
    q(th, 'cash', 0.7);
    q(tr, 'thud', 0.6);
    q(kn, 'ding', 0.6);
    const bx = ease(f, dr, dr + 40, 1500, 1050);
    const trx = ease(f, tr - 10, tr + 14, 1150, 1600);
    const tru = Math.sin(Math.PI * lin(f, tr - 10, tr + 14)) * 160;
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <House x={380} y={822} s={0.8 * P(A('c7a'))} />
            <Dave f={f} x={720} y={822} s={1} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.8}, {at: rs[0], pose: 'shrug', expr: 'tired'}, {at: tg, pose: 'thumbs', expr: 'grin'}]} />
            <G2 x={bx} y={760} s={P(A('c7a'))}>
              <Scooter s={0.8} f={f < dr + 40 ? f : 0} />
              <Driver f={f} x={-30} y={-40} s={0.75} keys={[{at: 0, pose: 'relax', expr: 'happy', look: -0.8}]} />
            </G2>
            <G2 x={960} y={140} s={P(A('c7a')) * bump(sc, 0.1)}><Text size={52} color={f >= sc ? C.green : GRAY}>to be fair: delivery is NOT a scam</Text></G2>
            {['sick', 'stuck at work', 'no car'].map((l, i) => (
              <G2 key={l} x={560 + i * 400} y={290} s={P(A('c7a')) * bump(rs[i], 0.2)} o={lt(rs[i], 0.4)}>
                <rect x={-170} y={-45} width={340} height={90} rx={45} fill={f >= rs[i] ? C.blue : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={40} color={f >= rs[i] ? '#fff' : GRAY}>{l}</Text>
              </G2>
            ))}
            <G2 x={1560} y={430} s={P(A('c7a')) * bump(sx, 0.15)} o={lt(sx, 0.4)}><Bubble text={'+$16 = their\ntime & gas'} size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c7c')) * bump(hb)}><Text size={52} color={f >= hb ? C.red : GRAY}>the problem: when it becomes a HABIT</Text></G2>
            <Box x={560} y={400} w={900} h={320} s={P(A('c7c')) * bump(th, 0.08)} fill={f >= th ? C.yellow : '#fff'}>
              <Text y={-90} size={46}>$16 extra × 2 a week × 52</Text>
              <Text y={40} size={110} color={f >= th ? C.red : '#B8AF9E'}>{f >= th ? '$1,664/yr' : '?'}</Text>
            </Box>
            <G2 x={trx} y={720 - tru} s={P(A('c7c'))} o={lt(tr, 0.8)}><Burger s={0.9} /></G2>
            <Trash x={1600} y={820} s={P(A('c7c')) * bump(tr, 0.15)} />
            <Dave f={f} x={400} y={940} s={0.95} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: tr, pose: 'shock', expr: 'shock'}, {at: kn, pose: 'point_up', expr: 'think'}]} />
            <G2 x={1000} y={930} s={P(A('c7c')) * bump(kn, 0.12)} o={lt(kn, 0.35)}><Text size={48} color={C.blue}>Do you KNOW what you're paying for?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 pay less ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f'), bs('c8g')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const pk = w('c8b', 'pickup');
    const hi = w('c8c', 'higher');
    const kp = w('c8d', 'keeps');
    const cn = w('c8e', 'count');
    const gp = w('c8f', 'group');
    const dn = w('c8g', 'dinner');
    q(pk, 'pop', 0.5);
    q(hi, 'buzz', 0.4);
    q(kp, 'coin', 0.5);
    q(cn, 'tick', 0.5);
    q(gp, 'pop2', 0.5);
    q(dn, 'heart', 0.5);
    const items = ['Use pickup', 'Compare with the real menu', "Order from the restaurant's site", 'Do the subscription math', 'Order together, as a group', 'Tip the driver fairly'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={640} y={95}><Text size={54}>How to pay less</Text></G2>
          <G2 x={640} y={150}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={260 + i * 118} s={0.82 * P(A('c8a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dave f={f} x={1560} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={1560} y={420}><Bubble text={'how do I\npay less?'} size={44} tail="down" /></G2>}
          {cur === 1 && (
            <G2 x={1560} y={520}>
              <FoodBag s={1.3} label="PICKUP" />
              <Text y={250} size={40} color={C.green}>no delivery or service fee</Text>
              <G2 y={310} s={bump(pk, 0.1)}><Text size={34} color={GRAY}>restaurant pays a smaller cut</Text></G2>
            </G2>
          )}
          {cur === 2 && (
            <G2 x={1560} y={520}>
              <MenuCard x={-120} y={-60} s={0.6} title="MENU" item="burger" price="$12" color={C.green} />
              <MenuCard x={120} y={80} s={0.6 * bump(hi, 0.15)} title="APP" item="burger" price="$15" color={C.red} />
              <Magnifier x={-150} y={200} s={0.8} />
            </G2>
          )}
          {cur === 3 && (
            <G2 x={1560} y={560}>
              <DeliveryApp s={0.9} title="RESTAURANT" big="$12" sub="order direct" btn="ORDER" color={C.green} />
              <G2 y={330} s={bump(kp, 0.15)}><Text size={38} color={C.green}>restaurant keeps more</Text></G2>
            </G2>
          )}
          {cur === 4 && (
            <G2 x={1560} y={520}>
              <MemberCard s={0.9} tier="SUBSCRIBER" price="$9.99/mo" color={C.red} />
              <G2 y={220} s={bump(cn, 0.15)}><Text size={44}>orders/month: ?</Text></G2>
            </G2>
          )}
          {cur === 5 && (
            <G2 x={1560} y={520}>
              <FoodBag x={-120} s={0.9} label="GROUP" />
              <FoodBag x={120} s={0.9} label="ORDER" />
              <Text y={220} size={38} color={C.green}>fees split across people</Text>
              <Text y={275} size={32} color={GRAY}>(service fee still grows)</Text>
            </G2>
          )}
          {cur >= 6 && (
            <G2 x={1560} y={560}>
              <Driver f={f} x={0} y={320} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'grin', look: -0.6}]} handItem={<FoodBag s={0.4} />} />
              <G2 y={-230} s={bump(dn, 0.2)}><Icon kind="heart" s={0.8} /></G2>
            </G2>
          )}
          <SourceTag f={f} at={pk} text="DoorDash merchant pricing: pickup commission 6%" until={hs[1]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Apps charge up to 30%, so menu prices go up', 'Delivery fee = just one of many fees', 'Pickup, compare menus, order direct'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={250} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1420} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wt = w('r5', 'water');
    const tp = w('r5', 'twenty');
    const sb = w('r6', 'subscribe');
    const nf = w('r6', 'regulatory');
    q(wt, 'pop', 0.5);
    q(tp, 'sting', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(nf, 'ding', 0.5);
    const sk = shake(f, tp, 12, 14);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={58}>Next: why does everyone want a tip now?</Text></G2>
            <G2 x={900} y={620} s={1.4 * P(A('r5')) * bump(wt, 0.12)}><Bottle color={C.blue} label="H2O" /></G2>
            <G2 x={1400 + sk.x} y={560 + sk.y} s={P(A('r5')) * bump(tp, 0.12)}>
              <rect x={-230} y={-200} width={460} height={400} rx={30} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
              <rect x={-205} y={-175} width={410} height={350} rx={16} fill="#F7FAFD" />
              <Text y={-120} size={38}>ADD A TIP?</Text>
              {['20%', '25%', '30%'].map((l, i) => (
                <G2 key={l} x={-130 + i * 130} y={10}>
                  <rect x={-55} y={-45} width={110} height={90} rx={16} fill={i === 1 && f >= tp ? C.red : '#fff'} stroke={C.ink} strokeWidth={5} />
                  <Text y={3} size={34} color={i === 1 && f >= tp ? '#fff' : C.ink}>{l}</Text>
                </G2>
              ))}
              <Text y={120} size={28} color={GRAY}>no tip</Text>
            </G2>
            <Dave f={f} x={430} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: tp, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Raccoon f={f} x={1550} y={800} s={0.9} mood="sneaky" />
            <G2 x={960} y={750} s={pop(f, sb - 4) * bump(nf, 0.1)}><Text size={48} color={C.green}>$0 fees. Ever.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4g', 'door') + 20;
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
