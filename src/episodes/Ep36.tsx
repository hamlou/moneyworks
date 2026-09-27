import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, Car, Clock, SourceTag, Stamp, Text, XMark} from '../props';
import {Frame, Phone, Row, SubButton, Bell, Icon, Magnifier} from '../props2';
import {Raccoon, PriceTag} from '../props3';
import {Pizza} from '../props4';
import {Flag} from '../props6';
import {Cart, Receipt, HotDog, Soda, Scale} from '../props8';
import {Chips} from '../props21';
import {Laptop} from '../props26';
import {Charger, Parcel} from '../props27';
import {Brain} from '../props17';
import {Candle, Can, Checkout, EndCap, Jar, Milk, SaleSign, Shelf, ShopBasket, StoreMap, UnitTag} from '../props36';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;

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

export const Ep36: React.FC = () => {
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
    const mk = w('o1', 'milk');
    const th = w('o1', 'three');
    const tw = w('o2', 'twenty');
    const items = [w('o2', 'cookies'), w('o2', 'candle'), w('o2', 'charger'), w('o2', 'pizzas'), w('o2', 'chips')];
    const tot = w('o2', 'eighty');
    q(2, 'pop', 0.6);
    q(mk, 'pop', 0.6);
    q(th, 'coin', 0.5);
    q(tw, 'tick', 0.5);
    items.forEach((x) => q(x, 'pop2', 0.5));
    q(tot, 'cash', 0.8);
    const n = items.filter((x) => f >= x).length;
    const sk = shake(f, tot, 14, 14);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={260} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: items[2], pose: 'carry', expr: 'neutral', look: 0.8}, {at: tot, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <Milk x={620} y={560} s={1.3 * P(0) * bump(mk, 0.15)} price={f >= th ? '$3.49' : '?'} />
          <Box x={620} y={200} w={420} h={130} s={P(0)}><Text size={44}>the plan: MILK</Text></Box>
          <Cart x={1080} y={900} s={1.4 * P(0)} items={3 + n * 2} />
          <Clock x={1080} y={320} s={0.7 * P(0) * bump(tw, 0.15)} f={f >= tw ? f * 3 : 0} />
          <Receipt x={1560} y={470} s={0.95 * P(0)} lines={[['milk', '$3.49'], ['cookies', '$4.99'], ['candle', '$12.99'], ['charger', '$19.99'], ['2 pizzas', '$15.98'], ['chips', '$5.49']]} shown={1 + n} total="" />
          <G2 x={1560 + sk.x} y={880 + sk.y} s={P(0) * bump(tot, 0.25)}>
            <rect x={-230} y={-60} width={460} height={120} rx={20} fill={f >= tot ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={4} size={64} color={f >= tot ? '#fff' : GRAY}>{f >= tot ? 'TOTAL $87' : 'TOTAL ?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('o3', 'twist');
    const ms = w('o3', 'mistake');
    const ds = w('o3', 'designed');
    const pv = [w('o4', 'walk'), w('o4', 'shelves'), w('o4', 'prices'), w('o4', 'cart')];
    const pl = w('o5', 'planned');
    q(tw, 'boing', 0.4);
    q(ms, 'buzz', 0.5);
    q(ds, 'stamp', 0.7);
    pv.forEach((x) => q(x, 'pop', 0.5));
    q(pl, 'marker', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={140} s={P(A('o3')) * bump(ds, 0.12)} text={f >= ds ? 'DESIGNED THIS WAY' : 'DAVE\'S MISTAKE?'} size={60} color={f >= ds ? C.red : GRAY} r={-3} />
          {['THE WALK', 'THE SHELVES', 'THE PRICES', 'THE CART'].map((l, i) => (
            <G2 key={l} x={270 + i * 460} y={560} s={P(A('o3')) * bump(pv[i], 0.08)} o={f >= pv[i] ? 1 : 0.45}>
              <Frame w={420} h={420}>
                {i === 0 && <StoreMap s={0.38} y={-20} t={f >= pv[0] ? 1 : 0.3} />}
                {i === 1 && <Shelf s={0.3} y={-20} hl={1} labels={['', '', '', '']} />}
                {i === 2 && <PriceTag s={1.1} y={-30} text="$9.99" />}
                {i === 3 && <Cart s={0.9} y={40} items={4} />}
                <Text y={165} size={34}>{l}</Text>
              </Frame>
            </G2>
          ))}
          <Owner f={f} x={960} y={1060} s={0.6} keys={[{at: 0, pose: 'present', expr: 'smug'}, {at: pl, pose: 'hips', expr: 'grin'}]} />
          <G2 x={1400} y={960} s={P(A('o3')) * bump(pl)} o={lt(pl, 0.4)}><Text size={40} color={C.red}>planned by shopper scientists</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'tricks'), w('o6', 'profits'), w('o6', 'milk')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['THE TRICKS', 'WHO PROFITS', 'JUST THE MILK'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <SaleSign s={0.6} y={-10} was="$80" now="$40" />}
                {i === 1 && <Raccoon f={f} s={0.7} y={60} mood="greedy" holdCoin />}
                {i === 2 && <Milk s={1} y={0} />}
                <Text y={210} size={34}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 milk at the back ============
  {
    const bk = w('c1b', 'back');
    const cn = w('c1b', 'corner');
    const fr = w('c1c', 'fair');
    const ld = w('c1c', 'loading');
    const tr = w('c1c', 'trucks');
    q(bk, 'pop', 0.5);
    q(cn, 'ding', 0.5);
    q(fr, 'whoosh_s', 0.4);
    q(ld, 'thud', 0.5);
    q(tr, 'pop2', 0.4);
    const wk = w('c1d', 'walk');
    const hl = [w('c1d', 'snacks'), w('c1d', 'flowers'), w('c1d', 'seasonal')];
    q(wk, 'step', 0.5);
    hl.forEach((x) => q(x, 'pop2', 0.5));
    const jm = w('c1e', 'jump');
    const gs = w('c1e', 'gift');
    q(jm, 'boing', 0.5);
    q(gs, 'ding', 0.5);
    const cs = w('c1f', 'costco');
    const hd = w('c1f', 'hot');
    const dr = w('c1f', 'door');
    const mm = w('c1f', 'money');
    q(cs, 'pop', 0.5);
    q(hd, 'coin', 0.6);
    q(dr, 'whoosh_s', 0.4);
    q(mm, 'cash', 0.6);
    const hi = hl.filter((x) => f >= x).length - 1;
    scene(A('c1a'), () =>
      f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={100} s={P(A('c1a'))}><Text size={48}>{f >= bk ? 'milk: always at the back' : "where's the milk?"}</Text></G2>
            <StoreMap x={660} y={580} s={0.95 * P(A('c1a')) * bump(cn, 0.04)} t={f < wk ? ease(f, bk, bk + 30, 0, 0.12) : ease(f, wk, hl[2] + 20, 0.12, 1)} hl={hi} />
            <Dave f={f} x={1500} y={930} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: wk, pose: 'idle', expr: 'tired', look: -0.8}]} walk={f >= wk} />
            <Box x={1520} y={320} w={620} h={260} s={P(A('c1a')) * bump(ld, 0.08)} o={lt(fr, 0.4)} fill={f >= fr && f < wk ? '#DCE9FF' : '#fff'}>
              <Text y={-80} size={34} color={GRAY}>to be fair...</Text>
              <Text y={-10} size={40}>big fridges sit near</Text>
              <Text y={50} size={40}>{f >= ld ? 'the loading dock' : '...'}</Text>
            </Box>
            <G2 x={1520} y={560} s={P(A('c1a')) * bump(tr)} o={lt(tr, 0.3)}><Car s={0.6} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1e')) * bump(gs)}><Text size={50}>{f >= gs ? 'like the gift shop at a museum exit' : 'every step = a chance'}</Text></G2>
            <Dave f={f} x={380} y={900} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: jm, pose: 'shock', expr: 'shock', look: 0.8}]} walk />
            <Cart x={760} y={920} s={1.2 * P(A('c1e'))} items={f >= jm ? 7 : 3} />
            {[0, 1, 2].map((i) => (
              <G2 key={i} x={1160 + i * 250} y={f >= jm ? ease(f, jm + i * 5, jm + i * 5 + 16, 560, 480) : 560} s={P(A('c1e')) * bump(jm + i * 5, 0.2)}>
                {i === 0 && <Chips s={1} />}
                {i === 1 && <Candle s={1.2} f={f} />}
                {i === 2 && <Charger s={1} />}
              </G2>
            ))}
            <G2 x={1400} y={780} s={P(A('c1e'))} o={lt(jm, 0.4)}><Text size={44} color={C.red}>"jump into your cart"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={120} s={P(A('c1f')) * bump(cs)}><Text size={46}>remember our Costco video?</Text></G2>
            <G2 x={380} y={440} s={1.3 * P(A('c1f')) * bump(hd, 0.15)}><HotDog /></G2>
            <G2 x={640} y={440} s={1.1 * P(A('c1f')) * bump(hd, 0.15)}><Soda /></G2>
            <G2 x={500} y={640} s={P(A('c1f')) * bump(hd)}><Text size={60} color={C.green}>$1.50</Text></G2>
            <Milk x={500} y={900} s={0.8 * P(A('c1f'))} price="$3.49" />
            <Arrow d="M 780 700 Q 950 620 1110 700" t={f >= dr ? 1 : 0.3} color={C.green} />
            <G2 x={960} y={590} o={lt(dr, 0.4)}><Text size={36} color={C.green}>cheap stars = get you in</Text></G2>
            <Cart x={1450} y={880} s={1.6 * P(A('c1f')) * bump(mm, 0.08)} items={f >= mm ? 12 : 6} />
            <Box x={1450} y={330} w={620} h={200} s={P(A('c1f')) * bump(mm, 0.1)} o={lt(mm, 0.45)} fill={f >= mm ? C.yellow : '#fff'}>
              <Text y={-40} size={34} color={GRAY}>the store's real profit</Text>
              <Text y={30} size={50}>everything else you grab</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 bigger carts ============
  {
    const hg = w('c2a', 'huge');
    const lm = w('c2b', 'lindstrom');
    const db = w('c2b', 'doubled');
    const ft = w('c2b', 'forty');
    q(hg, 'boing', 0.5);
    q(lm, 'paper', 0.4);
    q(db, 'whoosh_s', 0.5);
    q(ft, 'stamp', 0.7);
    const sd = w('c2c', 'sad');
    const fl = w('c2c', 'fill');
    const fg = w('c2c', 'forgot');
    q(sd, 'trombone', 0.4);
    q(fl, 'pop', 0.5);
    q(fg, 'pop2', 0.4);
    const pl = w('c2d', 'plate');
    const ad = w('c2d', 'add');
    q(pl, 'pop', 0.5);
    q(ad, 'pop2', 0.5);
    const bs2 = w('c2e', 'basket');
    const hv = w('c2e', 'heavy');
    const ar = w('c2e', 'arm');
    const st = w('c2e', 'stop');
    q(bs2, 'pop', 0.5);
    q(hv, 'thud', 0.5);
    q(ar, 'boing', 0.4);
    q(st, 'ding', 0.6);
    const big = ease(f, db, db + 20, 1, 1.5);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2a')) * bump(hg)}><Text size={52}>bigger cart = bigger bill</Text></G2>
            <Cart x={480} y={760} s={1.5 * P(A('c2a'))} items={6} />
            <G2 x={480} y={880}><Text size={40} color={GRAY}>normal cart</Text></G2>
            <Cart x={1250} y={760} s={1.5 * big * P(A('c2a')) * bump(db, 0.06)} items={f >= ft ? 9 : f >= fl ? 7 : 2} />
            <G2 x={1250} y={890} o={lt(db, 0.4)}><Text size={40} color={GRAY}>{f >= db ? 'DOUBLE size cart' : 'bigger cart?'}</Text></G2>
            <Box x={1580} y={300} w={460} h={200} s={P(A('c2a')) * bump(ft, 0.15)} o={lt(lm, 0.45)} fill={f >= ft ? C.yellow : '#fff'}>
              <Text y={-40} size={32} color={GRAY}>shoppers bought</Text>
              <Text y={35} size={76} color={C.red}>{f >= ft ? '+40%' : '?'}</Text>
            </Box>
            <G2 x={760} y={330} s={P(A('c2a')) * bump(sd)} o={lt(sd, 0.4)}><Bubble text={f >= fg ? 'did I forget\nsomething?' : 'so empty...'} size={40} tail="down" /></G2>
            <SourceTag f={f} at={lm} text="Martin Lindstrom (retail consultant): doubling cart size → ~40% more bought" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2d'))}><Text size={50}>same trick as a huge plate</Text></G2>
            <G2 x={700} y={600} s={P(A('c2d')) * bump(pl, 0.1)}>
              <ellipse rx={380} ry={130} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <ellipse rx={290} ry={90} fill="none" stroke="#D8CFC0" strokeWidth={4} />
              <Pizza s={0.25} eaten={0} x={f >= ad ? -90 : 0} />
              {f >= ad && <Pizza s={0.25} eaten={0} x={90} />}
            </G2>
            <Dave f={f} x={1420} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ad, pose: 'point_l', expr: 'happy', look: -0.8}]} />
            <G2 x={1420} y={400} s={P(A('c2d')) * bump(ad)} o={lt(ad, 0.45)}><Bubble text="looks tiny... add more!" size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2e')) * bump(bs2)}><Text size={52}>a basket does the opposite</Text></G2>
            <Dave f={f} x={700} y={900} s={1.25} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: hv, pose: 'hold', expr: 'tired', look: 0.8}, {at: st, pose: 'thumbs', expr: 'grin'}]} handItem={<ShopBasket s={0.6} items={3} />} sweat={f >= hv && f < st} />
            <ShopBasket x={1300} y={560} s={1.6 * P(A('c2e')) * bump(hv, 0.1)} items={3} />
            <Pill x={1300} y={800} w={440} text="heavy → you stop" on={f >= ar} s={P(A('c2e')) * bump(ar)} color={C.greenLight} />
            <G2 x={1300} y={930} s={bump(st)} o={lt(st, 0.4)}><Text size={44} color={C.green}>your arm = your budget</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 eye level ============
  {
    const ey = w('c3a', 'eye');
    const by = w('c3a', 'buy');
    const re = w('c3b', 'real');
    const pa = w('c3b', 'pay');
    q(ey, 'pop', 0.5);
    q(by, 'ding', 0.6);
    q(re, 'pop2', 0.4);
    q(pa, 'cash', 0.6);
    const sl = w('c3c', 'slotting');
    const ft = w('c3c', 'federal');
    const sh = w('c3c', 'shelf');
    q(sl, 'stamp', 0.6);
    q(ft, 'paper', 0.5);
    q(sh, 'cash', 0.5);
    const sb = w('c3d', 'store');
    const an = w('c3d', 'ankles');
    const cr = w('c3d', 'cereal');
    const kd = w('c3d', 'kids');
    q(sb, 'pop', 0.4);
    q(an, 'boing', 0.4);
    q(cr, 'pop2', 0.4);
    q(kd, 'ding', 0.5);
    const ec = w('c3e', 'end');
    const dl = w('c3e', 'deal');
    const np = w('c3e', 'normal');
    const sg = w('c3e', 'sign');
    q(ec, 'pop', 0.5);
    q(dl, 'ding', 0.5);
    q(np, 'buzz', 0.4);
    q(sg, 'boing', 0.5);
    const wk = w('c3f', 'work');
    const fr = w('c3f', 'four');
    q(wk, 'pop', 0.4);
    q(fr, 'stamp', 0.7);
    const hl = f >= kd ? 2 : f >= an ? 3 : f >= sb ? 3 : 1;
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Shelf x={560} y={560} s={0.95 * P(A('c3a')) * bump(ey, 0.04)} hl={hl} labels={['TOP', 'EYE LEVEL', 'KID LEVEL', 'BOTTOM']} />
            <G2 x={560} y={80} s={P(A('c3a')) * bump(by, 0.12)}><Text size={52} color={f >= by ? C.red : C.ink}>"eye level is buy level"</Text></G2>
            <Box x={1450} y={260} w={700} h={250} s={P(A('c3a')) * bump(sl, 0.08)} o={lt(re, 0.45)} fill={f >= sl ? C.yellow : '#fff'}>
              <Text y={-75} size={32} color={GRAY}>{f >= pa ? 'brands pay for the best spot' : 'prime real estate'}</Text>
              <Text y={0} size={60}>{f >= sl ? 'SLOTTING FEES' : '?'}</Text>
              <Text y={70} size={32} color={f >= sh ? C.red : GRAY}>{f >= sh ? 'paid just to get ON the shelf' : ''}</Text>
            </Box>
            <Banker f={f} x={1250} y={930} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'smug', look: 0.8}]} handItem={f >= pa ? <PriceTag s={0.5} text="$$$" /> : undefined} />
            <Owner f={f} x={1700} y={930} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: -0.8}, {at: pa, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <G2 x={1450} y={560} s={P(A('c3a')) * bump(cr)} o={lt(sb, 0.4)}>
              <Text size={36} color={f >= kd ? C.red : GRAY}>{f >= kd ? 'sugary cereal → kid level' : f >= an ? 'store brand → by your ankles' : 'where are the cheap ones?'}</Text>
            </G2>
            <SourceTag f={f} at={ft} text="FTC, The Use of Slotting Allowances in the Retail Grocery Industry (2003)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <EndCap x={520} y={920} s={1.2 * P(A('c3e')) * bump(sg, 0.08)} sign={f >= np ? 'SALE?' : 'SALE!'} />
            <G2 x={520} y={130} s={P(A('c3e')) * bump(ec)}><Text size={52}>the END CAP</Text></G2>
            <Pill x={1000} y={300} w={420} text="sometimes a deal" on={f >= dl} s={P(A('c3e')) * bump(dl)} color={C.greenLight} size={36} />
            <Pill x={1000} y={420} w={420} text="sometimes normal price" on={f >= np} s={P(A('c3e')) * bump(np)} color="#FFE3EA" size={34} />
            <line x1={1180} y1={900} x2={1820} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={1330} y={900}><rect x={-100} y={-100} width={200} height={100} fill={GRAY} stroke={C.ink} strokeWidth={6} /><Text y={50} size={30}>normal shelf</Text></G2>
            <G2 x={1660} y={900}><rect x={-110} y={-ease(f, fr - 4, fr + 16, 120, 520)} width={220} height={ease(f, fr - 4, fr + 16, 120, 520)} fill={C.red} stroke={C.ink} strokeWidth={6} /><Text y={50} size={30}>end cap</Text><Text y={-ease(f, fr - 4, fr + 16, 120, 520) - 40} size={50}>{f >= fr ? '4x+' : '?'}</Text></G2>
            <SourceTag f={f} at={fr} text="J. of Retailing & Consumer Services (2018): endcap sales uplift +346% to +416%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 9.99 ============
  {
    const nn = w('c4a', 'ninety');
    const lf = w('c4b', 'left');
    const n9 = w('c4b', 'nine', 2);
    const tn = w('c4b', 'ten', 1);
    const wd = w('c4b', 'whole');
    const oc = w('c4b', 'cent');
    q(nn, 'pop', 0.5);
    q(lf, 'whoosh_s', 0.4);
    q(n9, 'ding', 0.5);
    q(tn, 'ding', 0.5);
    q(wd, 'boing', 0.5);
    q(oc, 'coin', 0.7);
    const le = w('c4c', 'left');
    const rd = w('c4c', 'rounds');
    q(le, 'stamp', 0.6);
    q(rd, 'pop2', 0.4);
    const mit = w('c4d', 'm');
    const dr = w('c4d', 'dress');
    const tp = w('c4d', 'three');
    const t34 = w('c4e', 'thirty');
    const t39 = w('c4e', 'thirty', 1);
    const hg = w('c4e', 'higher');
    const nine = w('c4e', 'nine', 1);
    q(mit, 'paper', 0.5);
    q(dr, 'pop', 0.5);
    q(tp, 'pop2', 0.4);
    q(t34, 'ding', 0.5);
    q(t39, 'ding', 0.5);
    q(hg, 'stamp', 0.7);
    q(nine, 'ding', 0.5);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a')) * bump(nn)}><Text size={52}>{f >= le ? 'the LEFT-DIGIT effect' : 'why .99 everywhere?'}</Text></G2>
            <PriceTag x={580} y={420} s={2.2 * P(A('c4a')) * bump(n9, 0.1)} text="$9.99" />
            <PriceTag x={1340} y={420} s={2.2 * P(A('c4a')) * bump(tn, 0.1)} text="$10.00" color="#fff" />
            <G2 x={500} y={610} o={lt(lf, 0.3)}><Arrow d="M -130 0 L 130 0" t={f >= lf ? 1 : 0.3} color={C.blue} /><Text y={50} size={30} color={C.blue}>brain reads left → right</Text></G2>
            <G2 x={580} y={780} s={bump(wd)} o={lt(n9, 0.4)}><Text size={52} color={C.green}>{f >= wd ? 'feels like $9' : 'starts with 9'}</Text></G2>
            <G2 x={1340} y={780} o={lt(tn, 0.4)}><Text size={52}>starts with 10</Text></G2>
            <Box x={960} y={950} w={620} h={120} s={P(A('c4a')) * bump(oc, 0.2)} o={lt(oc, 0.45)} fill={f >= oc ? C.yellow : '#fff'}><Text size={50}>real difference: {f >= oc ? '1¢' : '?'}</Text></Box>
            <G2 x={1700} y={640} s={0.8 * P(A('c4a')) * bump(rd, 0.1)}><Brain glow={f >= rd ? 0.5 : 0} /></G2>
            <SourceTag f={f} at={le} text="Thomas & Morwitz, Journal of Consumer Research (2005)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c4d')) * bump(mit)}><Text size={46}>MIT + University of Chicago: one dress, 3 prices</Text></G2>
            <G2 x={330} y={560} s={1.2 * P(A('c4d')) * bump(dr, 0.1)}>
              <path d="M -60 -200 L 60 -200 L 80 -120 L 50 -100 L 150 160 L -150 160 L -50 -100 L -80 -120 Z" fill="#9B5DE5" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            </G2>
            <line x1={700} y1={880} x2={1800} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[['$34', 260, t34], ['$39', 440, t39], ['$44', 200, tp]].map(([l, h, at], i) => (
              <G2 key={l as string} x={880 + i * 360} y={880} o={f >= (at as number) ? 1 : 0.45}>
                <rect x={-110} y={-(f >= t34 ? (h as number) : 100)} width={220} height={f >= t34 ? (h as number) : 100} fill={i === 1 && f >= hg ? C.green : '#C9C0AE'} stroke={C.ink} strokeWidth={6} />
                <Text y={60} size={52}>{l as string}</Text>
              </G2>
            ))}
            <G2 x={1240} y={300} s={P(A('c4d')) * bump(hg, 0.15)} o={lt(hg, 0.35)}><Text size={48} color={C.green}>$39 outsold $34!</Text></G2>
            <G2 x={1240} y={370} o={lt(nine, 0.3)}><Text size={38} color={GRAY}>(sales, illustrative)</Text></G2>
            <SourceTag f={f} at={mit} text="Anderson & Simester, Quantitative Marketing and Economics (2003)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 fake sale ============
  {
    const wa = w('c5a', 'was');
    const nw = w('c5a', 'now');
    const an = w('c5b', 'anchor');
    const sl = w('c5b', 'steal');
    const wn = w('c5b', 'wanted');
    q(wa, 'pop', 0.5);
    q(nw, 'cash', 0.6);
    q(an, 'clank', 0.6);
    q(sl, 'ding', 0.5);
    q(wn, 'buzz', 0.4);
    const ac = w('c5c', 'actually');
    const ftc = w('c5d', 'f');
    const rl = w('c5d', 'real');
    const mu = w('c5d', 'made');
    q(ac, 'boing', 0.5);
    q(ftc, 'paper', 0.5);
    q(rl, 'stamp', 0.5);
    q(mu, 'buzz', 0.5);
    const jc = w('c5e', 'j');
    const ff = w('c5e', 'fifty');
    const dn = w('c5e', 'didnt');
    q(jc, 'pop', 0.5);
    q(ff, 'cash', 0.7);
    q(dn, 'paper', 0.4);
    const qn = w('c5f', 'question');
    const ng = w('c5f', 'no');
    q(qn, 'ding', 0.5);
    q(ng, 'pop2', 0.5);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <SaleSign x={620} y={480} s={1.3 * P(A('c5a')) * bump(nw, 0.08)} was="$80" now={f >= nw ? '$40' : '?'} strike={f >= nw ? 1 : 0} />
            <G2 x={620} y={880} s={P(A('c5a')) * bump(an, 0.15)} o={lt(an, 0.4)}>
              <path d="M 0 -90 L 0 60 M -70 20 Q 0 110 70 20 M -40 -60 L 40 -60" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
              <circle cy={-110} r={22} fill="none" stroke={C.ink} strokeWidth={10} />
              <Text x={160} y={0} size={44} anchor="start" color={C.blue}>the ANCHOR</Text>
            </G2>
            <Dave f={f} x={1450} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: sl, pose: 'celebrate', expr: 'money', look: -0.8}, {at: wn, pose: 'shrug', expr: 'worried', look: -0.8}]} />
            <G2 x={1450} y={400} s={P(A('c5a')) * bump(sl)} o={lt(sl, 0.45)}><Bubble text={f >= wn ? "...did I even\nwant this?" : 'what a steal!'} size={42} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SaleSign x={450} y={420} s={1.0 * P(A('c5c')) * bump(ac, 0.08)} was="$80" now="$40" cross={f >= ac ? 1 : 0} />
            <G2 x={450} y={750} s={P(A('c5c')) * bump(ac)}><Text size={44} color={C.blue}>did anyone ever pay $80?</Text></G2>
            <Box x={1320} y={290} w={880} h={290} s={P(A('c5c')) * bump(rl, 0.06)} o={lt(ftc, 0.45)}>
              <Text y={-95} size={32} color={GRAY}>FTC Guides Against Deceptive Pricing</Text>
              <Text y={-20} size={42} color={f >= rl ? C.green : GRAY}>"was" = a REAL past price,</Text>
              <Text y={40} size={42} color={f >= rl ? C.green : GRAY}>offered for a good while</Text>
              <Text y={105} size={40} color={f >= mu ? C.red : GRAY}>{f >= mu ? 'not a made-up number' : ''}</Text>
            </Box>
            <Box x={1320} y={700} w={880} h={240} s={P(A('c5c')) * bump(ff, 0.08)} o={lt(jc, 0.45)} fill={f >= ff ? C.yellow : '#fff'}>
              <Text y={-70} size={32} color={GRAY}>J.C. Penney settlement (inflated "original" prices)</Text>
              <Text y={10} size={80} color={C.red}>{f >= ff ? '$50 MILLION' : '?'}</Text>
              <Text y={80} size={30} color={GRAY}>{f >= dn ? 'no wrongdoing admitted' : ''}</Text>
            </Box>
            <SourceTag f={f} at={ftc} text={f < jc ? 'FTC, 16 CFR 233.1: former price comparisons' : 'Spann v. J.C. Penney Corp. (C.D. Cal., 2016): $50M settlement'} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c5f')) * bump(qn)}><Text size={52}>the only question that matters:</Text></G2>
            <G2 x={500} y={560} s={P(A('c5f'))}>
              <SaleSign s={0.9} was="$80" now="$40" />
              <XMark x={0} y={-100} s={0.8 * pop(f, ng)} />
            </G2>
            <PriceTag x={1300} y={480} s={2 * P(A('c5f')) * bump(ng, 0.12)} text="$40" />
            <G2 x={1300} y={700} s={P(A('c5f')) * bump(ng)} o={lt(ng, 0.4)}><Text size={46}>would I buy it at $40</Text><Text y={60} size={46}>with NO "was" price?</Text></G2>
            <Dave f={f} x={960} y={1050} s={0.6} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 BOGO ============
  {
    const bg = w('c6a', 'free');
    const tt = w('c6a', 'ten', 1);
    q(bg, 'pop', 0.5);
    q(tt, 'cash', 0.5);
    const nd = w('c6b', 'needed');
    const db = w('c6b', 'double');
    const pk = w('c6b', 'pickles');
    const tt30 = w('c6b', 'thirty');
    q(nd, 'pop', 0.4);
    q(db, 'buzz', 0.5);
    q(pk, 'boing', 0.6);
    q(tt30, 'trombone', 0.4);
    const od = w('c6c', 'one');
    const dh = w('c6c', 'dont');
    const nm = w('c6c', 'normal');
    q(od, 'ding', 0.5);
    q(dh, 'pop2', 0.5);
    q(nm, 'stamp', 0.5);
    const lm = w('c6d', 'limit');
    const sv = w('c6d', 'seven');
    const th = w('c6d', 'three');
    q(lm, 'stamp', 0.6);
    q(sv, 'cash', 0.6);
    q(th, 'ding', 0.4);
    const pl = w('c6e', 'planted');
    const an = w('c6e', 'anchor');
    q(pl, 'pop', 0.5);
    q(an, 'clank', 0.5);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6a')) * bump(bg)}><Text size={50}>BUY ONE, GET ONE FREE!</Text></G2>
            <Jar x={560} y={560} s={1.6 * P(A('c6a'))} />
            <Jar x={820} y={560} s={1.6 * P(A('c6a')) * bump(pk, 0.15)} />
            <G2 x={690} y={820} s={P(A('c6a')) * bump(db)} o={lt(nd, 0.4)}><Text size={46} color={f >= db ? C.red : C.ink}>{f >= db ? 'needed 1 → paid for 2' : 'needed: 1 jar'}</Text></G2>
            <Dave f={f} x={1400} y={900} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: db, pose: 'shrug', expr: 'worried', look: -0.8}]} />
            <G2 x={1500} y={380} s={P(A('c6a')) * bump(tt30, 0.15)} o={lt(pk, 0.4)}><Calendar2 f={f} on={f >= tt30} /></G2>
            <Pill x={1500} y={170} w={420} text="10 for $10" on={f >= tt} s={P(A('c6a')) * bump(tt)} size={44} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c6c'))}>
              <rect x={-300} y={-70} width={600} height={140} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
              <Text y={5} size={80} color="#fff">10 FOR $10</Text>
            </G2>
            {Array.from({length: 10}).map((_, i) => <Can key={i} x={300 + i * 145} y={480} s={1.1 * P(A('c6c'))} o={i === 0 || f < dh ? 1 : 0.3} />)}
            <G2 x={300} y={640} s={bump(od, 0.2)} o={lt(od, 0.4)}><Text size={48} color={C.green}>= $1 each</Text></G2>
            <Pill x={960} y={800} w={760} text="you DON'T have to buy 10" on={f >= dh} s={P(A('c6c')) * bump(dh)} color={C.greenLight} />
            <G2 x={960} y={930} s={bump(nm)} o={lt(nm, 0.4)}><Text size={42} color={C.red}>the sign just makes 10 feel normal</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c6d'))}><Text size={46}>the soup study: same discount, different sign</Text></G2>
            <G2 x={500} y={300} s={P(A('c6d'))}><rect x={-230} y={-50} width={460} height={100} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} /><Text y={5} size={44}>NO LIMIT</Text></G2>
            <G2 x={1360} y={300} s={P(A('c6d')) * bump(lm, 0.12)}><rect x={-300} y={-50} width={600} height={100} rx={16} fill={f >= lm ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} /><Text y={5} size={44}>LIMIT 12 PER PERSON</Text></G2>
            {Array.from({length: 7}).map((_, i) => <Can key={i} x={1130 + (i % 4) * 150} y={520 + Math.floor(i / 4) * 170} s={0.95 * P(A('c6d'))} o={f >= sv ? 1 : 0.25} />)}
            {Array.from({length: 3}).map((_, i) => <Can key={i} x={350 + i * 150} y={520} s={0.95 * P(A('c6d'))} o={f >= th ? 1 : 0.25} />)}
            <G2 x={500} y={800} s={bump(th, 0.2)} o={lt(th, 0.4)}><Text size={60}>~3.3 cans</Text></G2>
            <G2 x={1360} y={900} s={bump(sv, 0.2)} o={lt(sv, 0.4)}><Text size={60} color={C.red}>7 cans</Text></G2>
            <G2 x={500} y={950} s={P(A('c6d')) * bump(an, 0.1)} o={lt(pl, 0.4)}><Text size={42} color={C.blue}>a big number = an anchor</Text></G2>
            <SourceTag f={f} at={lm} text="Wansink, Kent & Hoch, Journal of Marketing Research (1998)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 online ============
  {
    const fs = w('c7a', 'free');
    const tf = w('c7b', 'thirty');
    const sv = w('c7b', 'seven');
    const fo = w('c7b', 'fifty');
    const ff = w('c7b', 'fifteen');
    const s7 = w('c7b', 'seven', 1);
    q(fs, 'pop', 0.5);
    q(tf, 'click', 0.5);
    q(sv, 'coin', 0.5);
    q(fo, 'ding', 0.6);
    q(ff, 'pop2', 0.5);
    q(s7, 'trombone', 0.5);
    const dl = w('c7c', 'deloitte');
    const f8 = w('c7c', 'fifty');
    q(dl, 'paper', 0.5);
    q(f8, 'stamp', 0.6);
    const la = w('c7d', 'loyalty');
    const cp = w('c7d', 'coupons');
    const ev = w('c7d', 'everything');
    q(la, 'pop', 0.5);
    q(cp, 'coin', 0.5);
    q(ev, 'whoosh_s', 0.5);
    const ftc = w('c7e', 'f');
    const lc = w('c7e', 'location');
    const df = w('c7e', 'different');
    q(ftc, 'paper', 0.5);
    q(lc, 'pop2', 0.5);
    q(df, 'sting', 0.5);
    const wm = w('c7f', 'walmart');
    const dg = w('c7f', 'digital');
    const sg = w('c7f', 'surge');
    const no = w('c7f', 'no');
    const ey = w('c7f', 'eye');
    q(wm, 'pop', 0.5);
    q(dg, 'ding', 0.5);
    q(sg, 'buzz', 0.5);
    q(no, 'ding', 0.5);
    q(ey, 'pop2', 0.4);
    const bar = f < fo ? 35 / 50 : f < ff ? 35 / 50 : ease(f, ff, ff + 20, 35 / 50, 1);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Laptop x={560} y={560} s={1.5 * P(A('c7a'))} />
            <G2 x={560} y={430} s={P(A('c7a'))}>
              <Text y={-40} size={40}>{f >= ff ? 'cart: $50' : 'cart: $35'}</Text>
              <Text y={20} size={34} color={f >= ff ? C.green : C.red}>{f >= ff ? 'shipping: FREE' : 'shipping: $6.99'}</Text>
            </G2>
            <G2 x={560} y={200} s={P(A('c7a')) * bump(fo, 0.1)}>
              <rect x={-360} y={-30} width={720} height={60} rx={30} fill="#E4DCCB" stroke={C.ink} strokeWidth={5} />
              <rect x={-360} y={-30} width={720 * bar} height={60} rx={30} fill={bar >= 1 ? C.green : C.yellow} stroke={C.ink} strokeWidth={5} />
              <Text y={-70} size={34}>{f >= fo ? 'FREE SHIPPING OVER $50!' : 'free shipping?'}</Text>
            </G2>
            <G2 x={560} y={930} s={P(A('c7a')) * bump(ff, 0.2)} o={lt(ff, 0.3)}><Parcel s={0.8} label="$15 thing" /></G2>
            <Box x={1400} y={300} w={640} h={220} s={P(A('c7a')) * bump(s7, 0.1)} o={lt(ff, 0.45)} fill={f >= s7 ? '#FFE3EA' : '#fff'}>
              <Text y={-45} size={40}>spent $15 extra</Text>
              <Text y={30} size={50} color={C.red}>to save $7</Text>
            </Box>
            <Box x={1400} y={700} w={640} h={240} s={P(A('c7a')) * bump(f8, 0.1)} o={lt(dl, 0.45)} fill={f >= f8 ? C.yellow : '#fff'}>
              <Text y={-60} size={32} color={GRAY}>online shoppers who add items</Text>
              <Text y={10} size={32} color={GRAY}>just for free shipping</Text>
              <Text y={80} size={70} color={C.red}>{f >= f8 ? '58%' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={dl} text="Deloitte consumer survey (as widely cited): 58% add items to hit free shipping" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={460} y={560} s={1.1 * P(A('c7d')) * bump(la, 0.08)}><Phone title="LOYALTY APP" value={f >= cp ? '$2 OFF!' : 'MEMBER'} color={C.green} /></G2>
            <Arrow d="M 620 460 Q 800 360 980 420" t={f >= cp ? 1 : 0.3} color={C.green} />
            <G2 x={800} y={330} o={lt(cp, 0.3)}><Text size={36} color={C.green}>coupons → you</Text></G2>
            <Arrow d="M 980 640 Q 800 760 620 680" t={f >= ev ? 1 : 0.3} color={C.red} />
            <G2 x={800} y={800} o={lt(ev, 0.3)}><Text size={36} color={C.red}>your data → store</Text></G2>
            <Box x={1400} y={300} w={640} h={300} s={P(A('c7d')) * bump(ev, 0.06)}>
              {['what you buy', 'when', 'where', f >= lc ? 'location + browsing' : '...'].map((l, i) => <Text key={i} y={-95 + i * 62} size={38} color={f >= ev ? C.ink : GRAY}>{l}</Text>)}
            </Box>
            <Box x={1400} y={720} w={640} h={220} s={P(A('c7d')) * bump(df, 0.1)} o={lt(ftc, 0.45)} fill={f >= df ? C.yellow : '#fff'}>
              <Text y={-50} size={32} color={GRAY}>FTC, 2025</Text>
              <Text y={20} size={42}>{f >= df ? 'different prices for' : 'can data set prices?'}</Text>
              <Text y={70} size={42}>{f >= df ? 'different people' : ''}</Text>
            </Box>
            <Raccoon f={f} x={1000} y={960} s={0.55 * P(A('c7d'))} mood="sneaky" />
            <SourceTag f={f} at={ftc} text="FTC Surveillance Pricing 6(b) study, initial findings (Jan 17, 2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7f')) * bump(wm)}><Text size={48}>Walmart: digital price tags, all U.S. stores by end of 2026</Text></G2>
            <G2 x={560} y={560} s={1.4 * P(A('c7f')) * bump(dg, 0.1)}>
              <rect x={-220} y={-110} width={440} height={220} rx={16} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
              <rect x={-195} y={-85} width={390} height={170} rx={8} fill="#E6F0F5" />
              <Text y={20} size={90}>{f >= sg && f < no ? '$5.49?' : '$3.49'}</Text>
            </G2>
            <Pill x={1360} y={400} w={640} text="lawmakers: surge pricing?" on={f >= sg} s={P(A('c7f')) * bump(sg)} color="#FFE3EA" size={38} />
            <Pill x={1360} y={540} w={640} text="one study: no sign of it" on={f >= no} s={P(A('c7f')) * bump(no)} color={C.greenLight} size={38} />
            <G2 x={1360} y={760} s={P(A('c7f')) * bump(ey, 0.1)} o={lt(ey, 0.4)}><Magnifier s={1} /><Text x={0} y={170} size={40}>worth watching</Text></G2>
            <SourceTag f={f} at={wm} text="CNBC (Mar 2026); Kellogg Insight (May 2026): virtually no surge pricing found" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 checkout ============
  {
    const ot = w('c8a', 'other');
    const np = w('c8a', 'nope');
    const ev = w('c8a', 'everyone');
    q(ot, 'dream', 0.4);
    q(np, 'buzz', 0.7);
    q(ev, 'ding', 0.5);
    const ch = w('c8b', 'checkout');
    const tw = w('c8c', 'twenty');
    const td = w('c8c', 'tired');
    const kh = w('c8c', 'kid');
    const cd = w('c8c', 'candy');
    q(ch, 'pop', 0.5);
    q(tw, 'tick', 0.4);
    q(td, 'sputter', 0.4);
    q(kh, 'pop2', 0.4);
    q(cd, 'ding', 0.5);
    const fb = w('c8d', 'final');
    const on = w('c8d', 'one');
    q(fb, 'sting', 0.6);
    q(on, 'buzz', 0.5);
    const en = w('c8e', 'england');
    const bn = w('c8e', 'banned');
    const tt = w('c8e', 'twenty');
    q(en, 'pop', 0.5);
    q(bn, 'stamp', 0.7);
    q(tt, 'ding', 0.4);
    const pol = w('c8f', 'political');
    const nb = w('c8f', 'numbers');
    q(pol, 'dream', 0.4);
    q(nb, 'ding', 0.5);
    const will = f < on ? ease(f, A('c8b'), td + 30, 1, 0.3) : ease(f, on, on + 20, 0.3, 0.01);
    scene(A('c8a'), () =>
      f < A('c8b') ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <DreamFrame label="WHAT MOST PEOPLE THINK" />
            <Dave f={f} x={600} y={880} s={1.15} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.8}, {at: np, pose: 'shock', expr: 'shock'}]} />
            <G2 x={1150} y={440} s={P(A('c8a')) * bump(ot)}><Bubble text={'"these tricks only\nwork on other people"'} size={46} tail="left" /></G2>
            <Stamp x={1150} y={760} s={pop(f, np)} text="NOPE" size={110} r={-8} />
            <G2 x={1150} y={930} o={lt(ev, 0)}><Text size={46} color={C.red}>they work on everyone</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={700} y={110} s={P(A('c8b')) * bump(fb, 0.1)}><Text size={52} color={f >= fb ? C.red : C.ink}>{f >= fb ? "the checkout: the store's FINAL BOSS" : 'last stop: the checkout'}</Text></G2>
            <Checkout x={700} y={930} s={1.2 * P(A('c8b')) * bump(cd, 0.04)} glow={f >= cd ? 1 : 0} />
            <Dave f={f} x={380} y={900} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: td, pose: 'relax', expr: 'tired', look: 0.8}, {at: on, pose: 'point_r', expr: 'money', look: 0.8}]} />
            <Clock x={200} y={300} s={0.6 * P(A('c8b')) * bump(tw, 0.15)} f={f} />
            <G2 x={1500} y={300} s={P(A('c8b'))}><Text size={40}>WILLPOWER</Text></G2>
            <G2 x={1500} y={420} s={P(A('c8b')) * bump(on, 0.12)}>
              <rect x={-230} y={-50} width={460} height={100} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-220} y={-40} width={440 * will} height={80} rx={14} fill={will < 0.35 ? C.red : C.green} />
              <Text y={4} size={44}>{Math.max(1, Math.round(will * 100))}%</Text>
            </G2>
            <G2 x={1500} y={620} o={lt(kh, 0.4)}><Text size={40} color={C.red}>candy at kid height</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={380} s={1.6 * P(A('c8e')) * bump(en, 0.1)}><Flag kind="uk" /></G2>
            <G2 x={520} y={130} s={P(A('c8e'))}><Text size={48}>England, since {f >= tt ? '2022' : '...'}</Text></G2>
            <Box x={1360} y={400} w={780} h={420} s={P(A('c8e')) * bump(bn, 0.06)}>
              <Text y={-150} size={40} color={f >= bn ? C.red : GRAY}>junk food BANNED at:</Text>
              {['checkouts', 'aisle ends', 'store entrances'].map((l, i) => <Text key={l} y={-60 + i * 70} size={46} color={f >= bn ? C.ink : GRAY}>{f >= bn ? '✓ ' : ''}{l}</Text>)}
              <Text y={170} size={30} color={GRAY}>(bigger stores only)</Text>
            </Box>
            <Scale x={800} y={880} s={0.8 * P(A('c8e')) * bump(pol, 0.08)} tilt={Math.sin(f / 20) * 0.1} left="BAN" right="NO BAN" />
            <G2 x={1360} y={780} s={bump(pol)} o={lt(pol, 0.35)}><Text size={44}>a political question</Text></G2>
            <G2 x={1360} y={860} s={bump(nb)} o={lt(nb, 0.35)}><Text size={44} color={C.green}>now you know the numbers</Text></G2>
            <SourceTag f={f} at={bn} text="Food (Promotion and Placement) (England) Regulations 2021, in force Oct 2022" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const hg = w('c9b', 'hungry');
    const ar = w('c9c', 'arm');
    const up = w('c9d', 'unit');
    const ig = w('c9e', 'ignore');
    const tm = w('c9f', 'tomorrow');
    q(hg, 'boing', 0.4);
    q(ar, 'pop', 0.4);
    q(up, 'ding', 0.5);
    q(ig, 'buzz', 0.4);
    q(tm, 'tick', 0.5);
    const items = ['A list, and eat before you go', 'Basket, not cart', 'Look up & down: read the UNIT price', 'Ignore the "was" price', 'Online: 24-hour rule · compare shipping'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={56}>How to walk out with just the milk</Text></G2>
          <G2 x={650} y={160}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={270 + i * 150} s={0.9 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dave f={f} x={1600} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={1600} y={420}><Bubble text="how do I beat the store?" size={40} tail="down" /></G2>}
          {cur === 1 && <G2 x={1600} y={520}><Milk s={1.2} /><Text y={300} size={40} color={f >= hg ? C.red : GRAY}>{f >= hg ? "hungry = store's best friend" : 'list: MILK'}</Text></G2>}
          {cur === 2 && <G2 x={1600} y={560} s={bump(ar, 0.1)}><ShopBasket s={1.6} items={1} /><Text y={220} size={40} color={C.green}>arm = budget</Text></G2>}
          {cur === 3 && <G2 x={1600} y={420}><UnitTag s={1} price="$5.00" unit="$1.25/roll" hl={f >= up ? 1 : 0} /><UnitTag y={260} s={1} price="$24.00" unit="$0.80/roll" hl={f >= up ? 1 : 0} /></G2>}
          {cur === 4 && <G2 x={1600} y={520} s={bump(ig, 0.1)}><SaleSign s={0.8} was="$80" now="$40" /><XMark y={-100} s={0.6} /></G2>}
          {cur >= 5 && <G2 x={1600} y={520}><Laptop s={1} /><G2 y={-260} s={bump(tm, 0.2)}><Text size={52} color={C.green}>wait 24 hours</Text></G2></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Stores are built to make you walk, look & grab', 'Prices play with your brain: .99, fake "was", limits', 'List, basket, unit price, 24-hour rule'];
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
    const ci = w('r5', 'insurance');
    const up = w('r5', 'up');
    const sb = w('r6', 'subscribe');
    const fr = w('r6', 'free', 1);
    q(ci, 'paper', 0.5);
    q(up, 'sting', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={58}>Next: why your car insurance keeps going up</Text></G2>
            <Car x={1250} y={700} s={1.6 * P(A('r5')) * bump(ci, 0.08)} />
            <G2 x={1600} y={400} s={P(A('r5')) * bump(up, 0.2)} r={8}>
              <rect x={-150} y={-55} width={300} height={110} rx={16} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={56} color={C.red}>+$$$</Text>
            </G2>
            <Icon kind="question" x={1000} y={400} s={0.8 * P(A('r5'))} />
            <Dave f={f} x={450} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: up, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={1500} y={800} s={pop(f, sb)}><PriceTag s={1.2} text="FREE" color={C.greenLight} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3f', 'shelf') + 20;
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

const Calendar2: React.FC<{f: number; on: boolean}> = ({on}) => (
  <g>
    <rect x={-150} y={-110} width={300} height={220} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <rect x={-150} y={-110} width={300} height={60} rx={16} fill={C.red} stroke={C.ink} strokeWidth={6} />
    <Text y={-78} size={30} color="#fff">EXPIRES</Text>
    <Text y={30} size={70} color={on ? C.red : GRAY}>{on ? '2030' : '...'}</Text>
  </g>
);
