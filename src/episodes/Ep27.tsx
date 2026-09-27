import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Magnifier, Phone, Row, SubButton, Bell} from '../props2';
import {Person, PriceTag, Raccoon, Shop, TollBooth} from '../props3';
import {Truck} from '../props4';
import {Factory, Stand} from '../props7';
import {Cart, HotDog, MemberCard, Receipt, Scale, SlicePie, Warehouse} from '../props8';
import {FloatPool} from '../props18';
import {Key} from '../props20';
import {BigNum, Books, CarSeat, Charger, Chip27, Cloud, CodeScreen, Flywheel, Garage, MoneySplit, ORANGE27, Parcel, Plug, PURPLE, SearchPage, ServerRack, ShareBar, TV} from '../props27';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Seller: React.FC<SP> = (p) => <Stick acc={['cap', 'glasses']} seed={55} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string}> = ({w, h, fill = '#fff'}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
);

const GRAY = '#5B6470';

export const Ep27: React.FC = () => {
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
  const on = (at: number) => (f >= at ? 1 : 0);
  const dim = (at: number, lo = 0.35) => (f >= at ? 1 : lo);
  const bump = (at: number, k = 0.15) => (f < at ? 1 : 1 + k * Math.sin(Math.min(1, (f - at) / 12) * Math.PI));
  const P = (id: string, d = 0) => pop(f, A(id) + d);

  // ============ HOOK ============
  {
    const tn = w('o1', 'ten');
    const ch = w('o1', 'charger');
    const fr = w('o1', 'free');
    const tm = w('o1', 'tomorrow');
    q(2, 'pop', 0.6);
    q(tn, 'cash', 0.6);
    q(ch, 'pop2', 0.5);
    q(fr, 'ding', 0.5);
    q(tm, 'ding', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={300} y={880} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.8}, {at: fr, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          <G2 x={720} y={470} s={pop(f, 2)}><Phone title="SHOP" value="ORDERED" color={C.green} /></G2>
          <G2 x={1250} y={420} s={pop(f, 4) * bump(ch)}><Charger /></G2>
          <G2 x={1560} y={230} s={pop(f, 6) * bump(tn, 0.3)}><PriceTag text="$10" /></G2>
          <Chip27 x={1000} y={800} s={pop(f, 6) * bump(fr)} text="FREE SHIPPING" on={on(fr)} />
          <Chip27 x={1480} y={800} s={pop(f, 8) * bump(tm)} text="ARRIVES TOMORROW" on={on(tm)} color={C.blue} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wh = w('o2', 'warehouse');
    const tr = w('o2', 'truck');
    const dr = w('o2', 'driver');
    const bx = w('o2', 'box');
    const ls = w('o2', 'losing');
    [wh, tr, dr, bx].forEach((x) => q(x, 'pop', 0.5));
    q(ls, 'trombone', 0.5);
    const lab = ['WAREHOUSE', 'TRUCK', 'DRIVER', 'BOX'];
    const at = [wh, tr, dr, bx];
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Warehouse x={400} y={822} s={0.55 * P('o2')} name="WAREHOUSE" />
          <Truck x={lin(f, A('o2'), A('o3'), 820, 1000)} y={822} s={1.3 * P('o2', 2)} />
          <Stick f={f} x={1230} y={822} s={0.85 * P('o2', 3)} acc={['cap']} seed={23} keys={[{at: 0, pose: 'carry', expr: 'happy', look: 0.8}]} />
          <G2 x={1400} y={760} s={0.55 * P('o2', 4) * bump(bx)}><Parcel /></G2>
          <G2 x={1400} y={600} s={P('o2', 4)}><PriceTag text="$10" /></G2>
          <Dave f={f} x={1720} y={822} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ls, pose: 'shock', expr: 'shock', look: -0.8}]} sweat={f >= ls} />
          {lab.map((l, i) => <Chip27 key={l} x={330 + i * 400} y={140} s={P('o2', i * 2) * bump(at[i])} text={l} on={on(at[i])} color={C.blue} />)}
          <G2 x={960} y={300} s={P('o2', 4) * bump(ls, 0.25)}><Text size={60} color={f >= ls ? C.red : '#B8AF9E'}>Amazon: losing money?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ei = w('o3', 'eighty');
    const e2 = w('o3', 'eighty', 1);
    const st = w('o4', 'store');
    const tw = w('o4', 'twist');
    q(ei, 'cash', 0.8);
    q(e2, 'stamp', 0.6);
    q(tw, 'sting', 0.6);
    q(st, 'pop', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={260} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ei, pose: 'shock', expr: 'shock', look: 0.8}, {at: tw, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
          <BigNum x={1150} y={280} s={P('o3') * bump(e2, 0.1)} label="AMAZON OPERATING PROFIT, 2025" value="$80 BILLION" on={on(ei)} w={1100} size={120} />
          <G2 x={1150} y={640} s={P('o3', 4)}>
            <MoneySplit w={1200} parts={[{v: 43, c: C.blue, l: 'the store', amt: '~43%'}, {v: 57, c: C.green, l: 'something else...', amt: '~57%'}]} lit={[on(st), on(st + 8)]} />
          </G2>
          <SourceTag f={f} at={ei} text="Amazon 10-K FY2025: operating income $80.0B" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ks = [w('o5', 'fees'), w('o5', 'ad'), w('o5', 'cloud'), w('o5', 'money')];
    ks.forEach((x) => q(x, 'stamp', 0.5));
    const lab = ['HIDDEN FEES', 'AD MACHINE', 'SECRET CLOUD', "OTHER PEOPLE'S $"];
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color={GRAY}>TODAY</Text>
          {lab.map((l, i) => (
            <G2 key={l} x={270 + i * 460} y={520} s={P('o5', i * 2) * bump(ks[i])} o={dim(ks[i], 0.45)}>
              <Frame w={420} h={440} label={l}>
                {i === 0 && <Raccoon f={f} x={0} y={90} s={0.5} mood="greedy" />}
                {i === 1 && <SearchPage s={0.32} y={-40} rows={[{t: 'Charger', p: '$12', sp: true}, {t: 'Charger', p: '$9'}]} tag={on(ks[1])} />}
                {i === 2 && <Cloud s={0.42} y={-10} label="?" />}
                {i === 3 && <MoneyStack s={0.8} y={0} n={5} />}
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 charger ============
  {
    const mk = w('c1b', 'didnt');
    const ow = w('c1b', 'doesnt');
    const sl = w('c1b', 'seller');
    const py = w('c1b', 'pays');
    const sx = w('c1c', 'six');
    const os = w('c1c', 'outside');
    const it = w('c1c', 'itself');
    const sp = w('c1d', 'split');
    const fi = w('c1e', 'fifty');
    const th = w('c1e', 'three');
    const ad = w('c1e', 'ad');
    const hf = w('c1f', 'half');
    const rk = w('c1f', 'risk');
    const sk = w('c1f', 'seller');
    const ll = w('c1g', 'landlord');
    const ml = w('c1g', 'mall');
    q(mk, 'buzz', 0.5);
    q(ow, 'buzz', 0.5);
    q(sl, 'pop', 0.6);
    q(py, 'coin', 0.6);
    q(sx, 'ding', 0.6);
    q(os, 'pop', 0.5);
    q(sp, 'rip', 0.5);
    q(fi, 'coin', 0.6);
    q(th, 'coin', 0.6);
    q(ad, 'coin', 0.6);
    q(hf, 'stamp', 0.7);
    q(rk, 'thud', 0.5);
    q(ml, 'crowd', 0.4);
    q(ll, 'key', 0.7);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={240} y={880} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}]} />
            <G2 x={660} y={430} s={P('c1a')}><Charger /></G2>
            <G2 x={870} y={250} s={P('c1a', 2)}><PriceTag text="$10" /></G2>
            {[['made by Amazon?', mk], ['owned by Amazon?', ow]].map(([l, at], i) => (
              <G2 key={i} x={1180} y={220 + i * 130} s={P('c1a', 2 + i * 2)}>
                <rect x={-230} y={-50} width={460} height={100} rx={20} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text x={-40} size={40}>{l as string}</Text>
                <G2 x={180} s={bump(at as number, 0.3)}>{f >= (at as number) ? <XMark s={0.18} /> : <Text size={56} color="#B8AF9E">?</Text>}</G2>
              </G2>
            ))}
            <Seller f={f} x={1640} y={880} s={1.1 * P('c1a', 4)} opacity={dim(sl, 0.4)} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: sl, pose: 'wave', expr: 'happy', look: -0.8}, {at: py, pose: 'present', expr: 'happy', look: -0.8}]} />
            <Chip27 x={1640} y={440} s={P('c1a', 4) * bump(sl)} text="a small seller" on={on(sl)} color={C.green} />
            <Chip27 x={1180} y={620} s={P('c1a', 6) * bump(py)} text="pays Amazon to sell it" on={on(py)} color={C.red} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1060} y={110} s={P('c1c')}><Text size={54}>who sells the items on Amazon?</Text></G2>
            <Dave f={f} x={230} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: sx, pose: 'shock', expr: 'shock', look: 0.8}]} />
            {Array.from({length: 10}).map((_, i) => (
              <G2 key={i} x={640 + (i % 5) * 230} y={330 + Math.floor(i / 5) * 250} s={0.62 * pop(f, A('c1c') + i) * (i < 6 ? bump(sx + i * 2) : 1)}>
                <Parcel color={i < 6 && f >= sx ? C.green : '#D9A15B'} />
              </G2>
            ))}
            <Chip27 x={900} y={800} s={P('c1c', 4) * bump(os)} text="~6 in 10: outside sellers" on={on(os)} color={C.green} />
            <Chip27 x={1540} y={800} s={P('c1c', 6) * bump(it)} text="4 in 10: Amazon" on={on(it)} color={GRAY} />
            <SourceTag f={f} at={sx} text="Amazon disclosures 2024: ~60–62% of units from third-party sellers" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c1d')}><Text size={54}>{"Dave's $10: where does it go?"}</Text></G2>
            <Text x={1700} y={180} size={30} color={GRAY}>(illustrative example)</Text>
            <G2 x={960} y={420} s={P('c1d', 2) * bump(sp, 0.06)}>
              <MoneySplit w={1500} parts={[{v: 1.5, c: C.red, l: 'sales fee', amt: '$1.50'}, {v: 3, c: C.blue, l: 'store · pack · ship', amt: '$3.00'}, {v: 0.5, c: PURPLE, l: 'ad', amt: '50¢'}, {v: 5, c: C.green, l: 'seller: product + risk', amt: '~$5'}]} lit={[on(fi), on(th), on(ad), on(sk)]} />
            </G2>
            <G2 x={585} y={660} s={P('c1d', 4) * bump(hf, 0.2)} o={dim(hf, 0.4)}>
              <path d="M -370 -40 L -370 0 L 370 0 L 370 -40" fill="none" stroke={f >= hf ? C.red : GRAY} strokeWidth={10} strokeLinejoin="round" />
              <Text y={60} size={54} color={f >= hf ? C.red : GRAY}>≈ HALF → AMAZON</Text>
            </G2>
            <Dave f={f} x={1450} y={900} s={0.85} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: hf, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Seller f={f} x={1740} y={900} s={0.85} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: rk, pose: 'shrug', expr: 'worried', look: -0.8}]} sweat={f >= rk} />
            <SourceTag f={f} at={fi} text="Amazon US: 15% referral fee · FBA fee ≈ $3 for a small item" until={A('c1g')} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[0, 1, 2].map((i) => <Shop key={i} x={600 + i * 380} y={822} s={0.55 * P('c1g', i * 2)} name={['CHARGERS', 'SOCKS', 'TOYS'][i]} />)}
            <G2 x={980} y={180} s={P('c1g', 2) * bump(ml)}>
              <Box w={1100} h={110} fill={f >= ml ? C.yellow : '#fff'} />
              <Text size={50}>THE BIGGEST MALL ON EARTH</Text>
            </G2>
            <Dave f={f} x={220} y={822} s={1} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
            <Stick f={f} x={1700} y={822} s={1 * P('c1g', 4)} acc={['fedora', 'tie']} seed={60} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}]} />
            <Key x={1700} y={420} s={0.6 * P('c1g', 4) * bump(ll, 0.3)} r={-15} />
            <Chip27 x={1700} y={330} s={P('c1g', 6) * bump(ll)} text="LANDLORD" on={on(ll)} color={C.navy} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 thin store ============
  {
    const np = w('c2b', 'nope');
    const tn = w('c2b', 'thinnest');
    const tw = w('c2c', 'two');
    const tr = w('c2c', 'trucks');
    const wh = w('c2c', 'warehouses');
    const rt = w('c2c', 'returns');
    const et = w('c2c', 'eat');
    const fv = w('c2d', 'five');
    const th = w('c2d', 'thirty');
    const sx = w('c2d', 'six');
    const fe = w('c2e', 'fees');
    const ads = w('c2e', 'ads');
    const ls = w('c2e', 'less');
    const cs = w('c2f', 'cost');
    const rn = w('c2f', 'renting');
    q(np, 'buzz', 0.7);
    q(tn, 'pop', 0.5);
    q(tw, 'cash', 0.6);
    [tr, wh, rt].forEach((x) => q(x, 'thud', 0.5));
    q(fv, 'pop', 0.5);
    q(th, 'coin', 0.6);
    q(sx, 'stamp', 0.6);
    q(fe, 'ding', 0.5);
    q(ads, 'ding', 0.5);
    q(ls, 'trombone', 0.4);
    q(cs, 'pop', 0.5);
    q(rn, 'cash', 0.6);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: np, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
            <Cart x={780} y={720} s={1.1 * P('c2a')} items={8} />
            <G2 x={1320} y={520} s={P('c2a', 2)}><MoneyStack n={7} s={1.2} label="selling stuff = $$$" /></G2>
            <Stamp x={1250} y={380} s={pop(f, np, 9, 260)} text="NOPE" size={90} color={C.red} r={-8} />
            <Chip27 x={1100} y={820} s={P('c2a', 4) * bump(tn)} text="selling stuff = thinnest margins" on={on(tn)} color={C.red} />
          </Svg>
          <DreamFrame label="WHAT MOST PEOPLE THINK" />
        </AbsoluteFill>
      ) : f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: et, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <BigNum x={1150} y={250} s={P('c2c') * bump(tw, 0.08)} label="Amazon's own products sold online, 2025" value="$269 BILLION" on={on(tw)} w={1100} />
            <G2 x={760} y={700} s={P('c2c', 2) * bump(tr)} o={dim(tr, 0.4)}><Truck s={1.1} /></G2>
            <Warehouse x={1150} y={740} s={0.33 * P('c2c', 3) * bump(wh)} o={dim(wh, 0.4)} name="WAREHOUSE" />
            <G2 x={1540} y={650} s={0.6 * P('c2c', 4) * bump(rt)} o={dim(rt, 0.4)}><Parcel label="RETURNS" /></G2>
            <Chip27 x={1150} y={500} s={P('c2c', 5) * bump(et)} text="costs eat most of it" on={on(et)} color={C.red} />
            <SourceTag f={f} at={tw} text="Amazon FY2025: online stores net sales $269.3B" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={130} s={P('c2d')}><Text size={48}>{"Amazon's two store divisions, 2025"}</Text></G2>
            <line x1={320} y1={820} x2={1000} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={500} y={820} h={ease(f, fv - 4, fv + 14, 60, 560) * P('c2d')} color={C.blue} label="sales" value={f >= fv ? '$588B' : '?'} />
            <Bar x={820} y={820} h={36 * P('c2d', 2)} color={C.green} label="profit" value={f >= th ? '$34B' : '?'} />
            <BigNum x={1450} y={300} s={P('c2d', 4) * bump(sx, 0.1)} label="profit per $1 of sales" value="< 6¢" on={on(sx)} w={700} />
            <Chip27 x={1450} y={560} s={P('c2d', 5) * bump(fe)} text="+ includes seller fees" on={on(fe)} color={C.red} />
            <Chip27 x={1450} y={660} s={P('c2d', 6) * bump(ads)} text="+ includes ads" on={on(ads)} color={PURPLE} />
            <Chip27 x={1450} y={780} s={P('c2d', 7) * bump(ls)} text="selling alone: even less" on={on(ls)} color={GRAY} />
            <SourceTag f={f} at={th} text="10-K FY2025: N. America $29.6B + Intl $4.7B op. income on $588.2B sales" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={330} y={822} s={1.05} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: rn, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <Stand x={800} y={822} s={1.1 * P('c2f')} label="LEMONADE" big />
            <G2 x={800} y={310} s={P('c2f', 2) * bump(cs)}><PriceTag text={f >= cs ? 'AT COST' : '$?'} color={f >= cs ? '#E8E1D2' : C.yellow} /></G2>
            <G2 x={1450} y={450} s={P('c2f', 4) * bump(rn, 0.2)}>
              <Box w={560} h={260} fill={f >= rn ? C.green : '#fff'} />
              <Text y={-50} size={50} color={f >= rn ? '#fff' : C.ink}>TABLE FOR RENT</Text>
              <Text y={40} size={80} color={f >= rn ? '#fff' : '#B8AF9E'}>{f >= rn ? '$$$' : '?'}</Text>
            </G2>
            <line x1={1450} y1={580} x2={1450} y2={822} stroke={C.ink} strokeWidth={10} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 landlord ============
  {
    const sl = w('c3a', 'sellers');
    const on1 = w('c3b', 'one');
    const cw = ['selling', 'storing', 'packing', 'shipping'].map((x) => w('c3b', x));
    const mp = w('c3c', 'marketplace');
    const fe = w('c3c', 'fees');
    const ad = w('c3c', 'ads');
    const hf = w('c3c', 'half');
    const es = w('c3c', 'estimate');
    const rc = w('c3d', 'raccoon');
    const tb = w('c3d', 'toll');
    const en = w('c3d', 'entrance');
    const sh = w('c3e', 'shoppers');
    const hu = w('c3e', 'hundreds');
    const lv = w('c3e', 'leaving');
    const cr = w('c3f', 'critics');
    const am = w('c3f', 'amazon');
    const bo = w('c3f', 'both');
    q(sl, 'pop', 0.5);
    q(on1, 'cash', 0.7);
    cw.forEach((x) => q(x, 'pop', 0.4));
    q(mp, 'paper', 0.5);
    q(hf, 'stamp', 0.6);
    q(es, 'ding', 0.5);
    q(rc, 'pop', 0.6);
    q(tb, 'clank', 0.6);
    q(en, 'coin', 0.6);
    q(hu, 'crowd', 0.5);
    q(lv, 'thud', 0.5);
    q(cr, 'pop', 0.5);
    q(am, 'pop', 0.5);
    q(bo, 'stamp', 0.6);
    const tilt = f < cr ? 0 : f < am ? ease(f, cr, cr + 20, 0, -10) : f < bo ? ease(f, am, am + 20, -10, 10) : ease(f, bo, bo + 20, 10, 0);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Warehouse x={1250} y={720} s={0.7 * P('c3a')} name="AMAZON" />
            {[0, 1, 2].map((i) => <Seller key={i} f={f} x={180 + i * 180} y={880} s={0.9 * P('c3a', i * 2)} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: sl, pose: 'present', expr: 'worried', look: 0.8}]} />)}
            {f >= sl && [0, 1, 2].map((i) => {
              const k = ((f - sl + i * 14) % 42) / 42;
              return <Coin key={i} x={lin(k, 0, 1, 400, 900)} y={620 - Math.sin(k * Math.PI) * 180} s={0.5} />;
            })}
            <BigNum x={1250} y={200} s={P('c3a', 2) * bump(on1, 0.08)} label="third-party seller services, 2025" value="$172 BILLION" on={on(on1)} w={900} />
            {['selling', 'storing', 'packing', 'shipping'].map((l, i) => <Chip27 key={l} x={870 + i * 260} y={800} s={P('c3a', 3 + i) * bump(cw[i])} text={l} on={on(cw[i])} color={C.red} size={34} w={230} />)}
            <SourceTag f={f} at={on1} text="Amazon FY2025: third-party seller services $172.2B" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3c')}><Text size={50}>a typical seller's revenue (estimate)</Text></G2>
            <G2 x={520} y={500} s={P('c3c', 2) * bump(hf, 0.08)}>
              <SlicePie rad={290} slices={[{v: 0.52, c: f >= hf ? C.red : '#D8D0C0', l: f >= hf ? '50%+ to Amazon' : '?'}, {v: 0.48, c: f >= hf ? C.green : '#E8E1D2', l: 'seller'}]} />
            </G2>
            {[['referral fee ~15%', fe], ['fulfillment 20–35%', fe + 12], ['ads & promos', ad]].map(([l, at], i) => (
              <Row key={i} x={960} y={300 + i * 150} s={0.9 * P('c3c', 3 + i * 2)} n={i + 1} text={l as string} lit={f >= (at as number) ? 1 : 0.3} color={C.red} w={820} />
            ))}
            <Stamp x={1380} y={760} s={P('c3c', 6) * bump(es, 0.2)} text={f >= es ? 'ESTIMATE · VARIES' : 'ESTIMATE'} size={48} color={f >= es ? C.blue : '#B8AF9E'} r={-4} />
            <SourceTag f={f} at={mp} text="Marketplace Pulse: 'Amazon Takes a 50% Cut of Sellers' Revenue' (estimate)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Shop x={1500} y={822} s={0.8 * P('c3d')} name="THE MALL" />
            <TollBooth x={960} y={822} s={P('c3d', 2)} barUp={ease(f, en, en + 12)} label="SELLER FEES" />
            <Raccoon f={f} x={720} y={822} s={1 * P('c3d', 3) * bump(rc)} mood={f >= tb ? 'greedy' : 'sneaky'} holdCoin={f >= en} />
            <Seller f={f} x={250} y={822} s={1} keys={[{at: 0, pose: 'carry', expr: 'worried', look: 0.8}]} />
            <Chip27 x={960} y={200} s={P('c3d', 4) * bump(tb)} text="a new toll booth" on={on(tb)} color={C.red} />
            <Chip27 x={1500} y={200} s={P('c3d', 5) * bump(en)} text="at the mall entrance" on={on(en)} color={C.navy} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1200} y={500} s={P('c3e')}>
              <rect x={-560} y={-330} width={1120} height={620} rx={40} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-270} size={44} color={GRAY}>AMAZON</Text>
              {Array.from({length: 24}).map((_, i) => (
                <Person key={i} x={-460 + (i % 8) * 130} y={-120 + Math.floor(i / 8) * 150} s={0.8 * pop(f, (f >= hu ? hu : A('c3e')) + i)} c={[C.blue, C.red, C.green, PURPLE][i % 4]} />
              ))}
            </G2>
            <Seller f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: lv, pose: 'panic', expr: 'shock', look: 0.8}]} sweat={f >= lv} />
            <Chip27 x={1200} y={880} s={P('c3e', 3) * bump(hu)} text="hundreds of millions of shoppers" on={on(sh)} color={C.blue} />
            <G2 x={300} y={300} s={P('c3e', 4) * bump(lv)}><Bubble text={f >= lv ? 'leave = lose sales!' : 'leave?'} size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={960} s={P('c3f')} tilt={tilt} left="critics" right="Amazon" />
            <Chip27 x={480} y={260} s={P('c3f', 2) * bump(cr)} text="fees push prices up" on={on(cr)} color={C.red} />
            <Chip27 x={1440} y={260} s={P('c3f', 3) * bump(am)} text="helps small sellers reach the world" on={on(am)} color={C.green} />
            <Stamp x={960} y={130} s={P('c3f', 4) * bump(bo, 0.2)} text="BOTH SIDES HAVE A POINT" size={48} color={f >= bo ? C.blue : '#B8AF9E'} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 ads ============
  {
    const fr = w('c4a', 'first');
    const cl = w('c4a', 'closely');
    const sp = w('c4a', 'sponsored');
    const ad = w('c4b', 'ads');
    const ck = w('c4b', 'click');
    const ab = w('c4c', 'advertising');
    const sx = w('c4c', 'sixty');
    const tw = w('c4c', 'twenty', 2);
    const tr = w('c4d', 'truck');
    const bx = w('c4d', 'box');
    const wh = w('c4d', 'warehouse');
    const cd = w('c4d', 'code');
    const ft = w('c4d', 'first');
    const by = w('c4e', 'buy');
    const lv = w('c4e', 'love');
    const cu = w('c4f', 'customer');
    const au = w('c4f', 'audience');
    q(fr, 'pop', 0.5);
    q(cl, 'whoosh_s', 0.5);
    q(sp, 'stamp', 0.7);
    q(ad, 'ding', 0.5);
    q(ck, 'click', 0.8);
    q(ck + 8, 'coin', 0.6);
    q(ab, 'pop', 0.5);
    q(sx, 'cash', 0.7);
    q(tw, 'stamp', 0.6);
    [tr, bx, wh].forEach((x) => q(x, 'buzz', 0.4));
    q(cd, 'key', 0.6);
    q(ft, 'ding', 0.6);
    q(by, 'cash', 0.5);
    q(lv, 'heart', 0.6);
    q(cu, 'pop', 0.5);
    q(au, 'crowd', 0.5);
    const rows = [{t: 'MegaVolt 20W', p: '$12.99', sp: true}, {t: 'PowerPro Fast', p: '$14.49', sp: true}, {t: 'Basic Charger', p: '$8.99'}, {t: 'Charger 2-pack', p: '$10.99'}];
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={240} y={880} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'think', look: 0.8}, {at: sp, pose: 'shock', expr: 'suspicious', look: 0.8}]} />
            <SearchPage x={1000} y={480} s={P('c4a')} rows={rows} tag={ease(f, sp, sp + 10)} hl={f >= fr && f < sp ? 0 : -1} />
            <Magnifier x={ease(f, cl, cl + 20, 1650, 780)} y={ease(f, cl, cl + 20, 760, 330)} s={0.7 * P('c4a', 3)} />
            <Chip27 x={1660} y={200} s={P('c4a', 4) * bump(ad)} text="= ADS" on={on(ad)} color={C.red} />
            <Chip27 x={1660} y={320} s={P('c4a', 5) * bump(ck)} text="seller pays per click" on={on(ck)} color={PURPLE} />
            {f >= ck && f < ck + 30 && <Coin x={lin(f, ck, ck + 20, 800, 1660)} y={lin(f, ck, ck + 20, 300, 320)} s={0.5} />}
            <G2 x={lin(f, ck - 20, ck, 1200, 950)} y={lin(f, ck - 20, ck, 700, 300)} s={P('c4a', 5) * (f >= ck && f < ck + 6 ? 0.85 : 1)}>
              <path d="M 0 0 L 0 56 L 14 44 L 26 70 L 38 64 L 26 38 L 44 38 Z" fill="#fff" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={800} y={130} s={P('c4c')}><Text size={54}>Amazon advertising revenue</Text></G2>
            <line x1={400} y1={820} x2={1200} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={600} y={820} h={ease(f, ab - 4, ab + 14, 60, 56 * 8) * P('c4c')} color="#C9B8F0" label="2024" value={f >= ab ? '$56B' : '?'} />
            <Bar x={1000} y={820} h={ease(f, sx - 4, sx + 14, 60, 69 * 8) * P('c4c', 2)} color={PURPLE} label="2025" value={f >= sx ? '$69B' : '?'} />
            <Stamp x={1500} y={330} s={P('c4c', 4) * bump(tw, 0.25)} text={f >= tw ? '+22%' : '+?%'} size={90} color={f >= tw ? C.green : '#B8AF9E'} r={-6} />
            <Dave f={f} x={1550} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: sx, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={sx} text="Amazon: advertising services $68.6B (2025) vs $56.2B (2024)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[tr, bx, wh].map((at, i) => (
              <G2 key={i} x={280} y={230 + i * 250} s={P('c4d', i * 2)}>
                <Frame w={380} h={220}>
                  {i === 0 && <Truck s={0.7} y={40} />}
                  {i === 1 && <Parcel s={0.6} />}
                  {i === 2 && <Warehouse s={0.3} y={70} />}
                  {f >= at && <XMark s={0.25} />}
                </Frame>
              </G2>
            ))}
            <CodeScreen x={1150} y={430} s={P('c4d', 3) * bump(cd, 0.08)} lines={['search: "charger"', 'if ad_paid:', '  rank = 1', '# put this one first']} lit={on(ft)} />
            <Chip27 x={1150} y={760} s={P('c4d', 5) * bump(ft)} text="almost pure profit" on={on(ft)} color={C.green} />
            <Dave f={f} x={1720} y={880} s={0.95} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ft, pose: 'point_l', expr: 'grin', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={960} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: au, pose: 'shock', expr: 'shock'}]} />
            <Receipt x={500} y={500} s={0.9 * P('c4e')} lines={[['charger', '$10'], ['cat food', '$24'], ['socks', '$9']]} total="what Dave BUYS" />
            {[0, 1, 2].map((i) => <Stick key={i} f={f} x={1400 + i * 160} y={880} s={0.8 * P('c4e', 2 + i)} acc={['tie']} seed={70 + i} keys={[{at: 0, pose: 'think', expr: 'neutral', look: -0.8}, {at: lv, pose: 'celebrate', expr: 'grin', look: -0.8}]} />)}
            <G2 x={1560} y={460} s={P('c4e', 4) * bump(lv)}><Bubble text={f >= lv ? 'we LOVE that data!' : 'advertisers'} size={40} tail="down" /></G2>
            <Chip27 x={700} y={150} s={P('c4e', 5) * bump(cu)} text="CUSTOMER" on={on(cu)} color={C.blue} />
            <Chip27 x={1220} y={150} s={P('c4e', 6) * bump(au)} text="AUDIENCE" on={on(au)} color={PURPLE} />
            <SourceTag f={f} at={by} text="Ads sold via 'sponsored products', display & video (Amazon 10-K)" until={cu} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Prime ============
  {
    const nf = w('c5a', 'not');
    const pr = w('c5a', 'prime');
    const o1 = w('c5b', 'one');
    const ft = w('c5b', 'fourteen');
    const fi = w('c5c', 'fifty');
    const ps = w('c5d', 'psychology');
    const pd = w('c5d', 'paid');
    const mo = w('c5d', 'more');
    const st = w('c5d', 'stops');
    const el = w('c5e', 'eleven');
    const fv = w('c5e', 'five');
    const db = w('c5e', 'double');
    const ck = w('c5f', 'costco');
    const fe = w('c5f', 'fee');
    const hb = w('c5f', 'habit');
    q(nf, 'buzz', 0.5);
    q(pr, 'pop', 0.6);
    q(o1, 'cash', 0.6);
    q(ft, 'coin', 0.5);
    q(fi, 'cash', 0.7);
    q(ps, 'dream', 0.5);
    q(mo, 'pop2', 0.5);
    q(st, 'poof', 0.5);
    q(el, 'pop', 0.5);
    q(fv, 'pop', 0.5);
    q(db, 'stamp', 0.7);
    q(ck, 'pop', 0.5);
    q(fe, 'ding', 0.5);
    q(hb, 'ding', 0.5);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={480} s={1.1 * P('c5a')}><Parcel /></G2>
            <G2 x={480} y={250} s={P('c5a', 2)}>
              <Text size={56} color={f >= nf ? '#B8AF9E' : C.green}>FREE SHIPPING</Text>
              {f >= nf && <line x1={-230} y1={0} x2={230} y2={0} stroke={C.red} strokeWidth={12} strokeLinecap="round" />}
            </G2>
            <MemberCard x={1180} y={400} s={1.3 * P('c5a', 3) * bump(pr, 0.1)} tier="PRIME" price={f >= o1 ? '$139/yr' : '?'} color={C.navy} />
            <Chip27 x={1180} y={700} s={P('c5a', 4) * bump(ft)} text="or $14.99 / month" on={on(ft)} color={C.blue} />
            <Dave f={f} x={1700} y={880} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: nf, pose: 'shrug', expr: 'suspicious', look: -0.8}]} />
            <SourceTag f={f} at={o1} text="Amazon Prime (US): $139/year or $14.99/month" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={250} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
            <BigNum x={1150} y={280} s={P('c5c') * bump(fi, 0.08)} label="subscription services (mostly Prime), 2025" value="$49.6 BILLION" on={on(fi)} w={1000} />
            <MemberCard x={800} y={680} s={0.7 * P('c5c', 2)} tier="PRIME" price="$139/yr" color={C.navy} />
            <TV x={1200} y={660} s={0.8 * P('c5c', 3)} label="video" />
            <G2 x={1560} y={660} s={0.6 * P('c5c', 4)}><Parcel label="fast shipping" /></G2>
            <SourceTag f={f} at={fi} text="Amazon FY2025: subscription services $49.6B" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Chip27 x={960} y={120} s={P('c5d') * bump(ps)} text="PSYCHOLOGY" on={on(ps)} color={PURPLE} />
            <Dave f={f} x={380} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: mo, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <G2 x={420} y={330} s={P('c5d', 2) * bump(pd)}><Bubble text={f >= pd ? 'I paid... must use it!' : 'hmm...'} size={40} tail="down" /></G2>
            <Cart x={900} y={760} s={1.2 * P('c5d', 3)} items={Math.round(ease(f, mo, mo + 30, 3, 12))} />
            {[0, 1].map((i) => (
              <G2 key={i} x={1400 + i * 330} y={800} s={0.4 * P('c5d', 4 + i)} o={f >= st ? 0.35 : 1}>
                <Shop name={i ? 'STORE C' : 'STORE B'} />
                {f >= st && <XMark s={0.8} y={-200} />}
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={900} y={120} s={P('c5e')}><Text size={48}>yearly spending on Amazon (CIRP estimate)</Text></G2>
            <line x1={500} y1={820} x2={1300} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={700} y={820} h={ease(f, el - 4, el + 14, 60, 1170 * 0.45) * P('c5e')} color={C.navy} label="Prime members" value={f >= el ? '$1,170' : '?'} w={260} />
            <Bar x={1100} y={820} h={ease(f, fv - 4, fv + 14, 60, 570 * 0.45) * P('c5e', 2)} color={C.gray} label="non-members" value={f >= fv ? '$570' : '?'} w={260} />
            <Stamp x={1560} y={380} s={P('c5e', 4) * bump(db, 0.25)} text={f >= db ? '≈ 2x' : '?x'} size={100} color={f >= db ? C.red : '#B8AF9E'} r={-6} />
            <Dave f={f} x={1600} y={880} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: db, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={el} text="CIRP (2024): Prime ≈ $1,170/yr vs non-Prime ≈ $570/yr" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <MemberCard x={450} y={330} s={P('c5f') * bump(ck, 0.1)} tier="WAREHOUSE CLUB" price="membership" />
            <HotDog x={450} y={640} s={P('c5f', 2)} />
            <G2 x={1250} y={560} s={P('c5f', 3)}>
              <rect x={-170} y={-320} width={340} height={640} rx={12} fill="#8C5A33" stroke={C.ink} strokeWidth={6} />
              <circle cx={120} cy={0} r={14} fill={C.gold} stroke={C.ink} strokeWidth={4} />
            </G2>
            <Chip27 x={1250} y={170} s={P('c5f', 4) * bump(fe)} text="the FEE gets you in" on={on(fe)} color={C.blue} />
            <Chip27 x={1250} y={950 - 150} s={P('c5f', 5) * bump(hb)} text="the HABIT does the rest" on={on(hb)} color={C.red} />
            <Dave f={f} x={1650} y={880} s={1} walk={f >= hb} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 AWS ============
  {
    const sc = w('c6a', 'secret');
    const aw = w('c6b', 'a');
    const wb = w('c6b', 'web');
    const rn = w('c6b', 'rents');
    const cl = [w('c6c', 'streaming'), w('c6c', 'banks'), w('c6c', 'games'), w('c6c', 'i')];
    const sk = w('c6c', 'socket');
    const pl = w('c6c', 'plant');
    const ei = w('c6d', 'eighteen');
    const on1 = w('c6d', 'one');
    const fy = w('c6e', 'fifty');
    const fo = w('c6e', 'forty');
    const lt = w('c6f', 'lights');
    const pt = w('c6f', 'party');
    const tw = w('c6g', 'two');
    const dc = w('c6g', 'data');
    const bt = w('c6g', 'bet');
    const nb = w('c6g', 'nobody');
    q(sc, 'sting', 0.6);
    q(aw, 'stamp', 0.6);
    q(rn, 'pop', 0.5);
    cl.forEach((x) => q(x, 'pop', 0.45));
    q(sk, 'click', 0.6);
    q(pl, 'buzz', 0.5);
    q(on1, 'pop', 0.5);
    q(ei, 'ding', 0.6);
    q(fo, 'cash', 0.7);
    q(fy, 'stamp', 0.8);
    q(lt, 'click', 0.6);
    q(pt, 'crowd', 0.5);
    q(tw, 'cash', 0.7);
    q(bt, 'thud', 0.6);
    q(nb, 'cricket', 0.4);
    const cn = ['streaming', 'banks', 'games', 'AI'];
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: aw, pose: 'point_r', expr: 'grin', look: 0.8}]} />
            <G2 x={1150} y={430} s={P('c6a') * bump(aw, 0.1)}><Cloud label={f >= aw ? 'AWS' : '?'} color={f >= aw ? '#E3F1F4' : '#fff'} size={110} /></G2>
            {[0, 1, 2, 3].map((i) => <ServerRack key={i} f={f} x={780 + i * 250} y={880} s={0.65 * P('c6a', 2 + i)} on={f >= rn} />)}
            <Chip27 x={1150} y={120} s={P('c6a', 3) * bump(wb)} text="Amazon Web Services" on={on(wb)} color={ORANGE27} />
            <Chip27 x={1150} y={580} s={P('c6a', 4) * bump(rn)} text="rents computers over the internet" on={on(rn)} color={C.blue} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={380} s={0.7 * P('c6c')}><Cloud label="AWS" color="#E3F1F4" size={110} /></G2>
            {cn.map((l, i) => (
              <g key={l}>
                <line x1={300 + i * 440} y1={660} x2={960} y2={430} stroke={f >= cl[i] ? C.green : '#D8D0C0'} strokeWidth={8} strokeDasharray="18 12" />
                <G2 x={300 + i * 440} y={760} s={P('c6c', 2 + i) * bump(cl[i])} o={dim(cl[i], 0.5)}>
                  <Frame w={300} h={200} label={l}>
                    {i === 0 && <TV s={0.35} y={-30} />}
                    {i === 1 && <Bank s={0.17} y={20} label="BANK" />}
                    {i === 2 && <Text y={-30} size={60}>▶ ◆</Text>}
                    {i === 3 && <Text y={-30} size={64} color={PURPLE}>AI</Text>}
                  </Frame>
                </G2>
              </g>
            ))}
            <G2 x={230} y={290} s={0.6 * P('c6c', 4) * bump(sk)} o={dim(sk, 0.5)}><Plug /></G2>
            <G2 x={1700} y={360} s={0.45 * P('c6c', 5)} o={dim(pl, 0.5)}><Factory label="POWER PLANT" />{f >= pl && <XMark s={0.7} y={-120} />}</G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <ShareBar x={900} y={330} s={P('c6d')} label="AWS share of Amazon's SALES" share={0.18} t={ease(f, ei, ei + 16)} color={ORANGE27} tag="≈ 18% ($128.7B)" />
            <ShareBar x={900} y={680} s={P('c6d', 3)} label="AWS share of Amazon's operating PROFIT" share={0.57} t={ease(f, fy, fy + 16)} color={C.green} tag={'≈ 57%'} />
            <G2 x={1320} y={800} s={P('c6d', 5) * bump(fo)} o={dim(fo, 0.4)}><Text size={48} color={C.green}>{f >= fo ? '$45.6 billion' : '$? billion'}</Text></G2>
            <Dave f={f} x={1780} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: fy, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={on1} text="10-K FY2025: AWS sales $128.7B of $716.9B · op. income $45.6B of $80.0B" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Shop x={520} y={860} s={0.8 * P('c6f')} name="STORE" />
            <G2 x={520} y={260} s={P('c6f', 2) * bump(lt, 0.25)}>
              <circle r={70} fill={f >= lt ? C.yellow : '#EFEAE0'} stroke={C.ink} strokeWidth={6} />
              <rect x={-30} y={66} width={60} height={40} rx={6} fill={C.gray} stroke={C.ink} strokeWidth={5} />
              {f >= lt && [0, 1, 2, 3, 4].map((i) => <line key={i} x1={Math.cos(i * 0.75 - 2.9) * 95} y1={Math.sin(i * 0.75 - 2.9) * 95} x2={Math.cos(i * 0.75 - 2.9) * 130} y2={Math.sin(i * 0.75 - 2.9) * 130} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />)}
            </G2>
            <Chip27 x={520} y={420} s={P('c6f', 3)} text="keeps the lights on" on={on(lt)} color={C.blue} />
            <G2 x={1380} y={520} s={0.9 * P('c6f', 2) * bump(pt, 0.1)}><Cloud label="AWS" color={f >= pt ? '#E3F1F4' : '#fff'} size={110} /></G2>
            {Array.from({length: 14}).map((_, i) => <rect key={i} x={1050 + ((i * 97) % 680)} y={(f >= pt ? ((f - pt) * 6 + i * 53) % 300 : i * 20) + 140} width={18} height={30} fill={[C.red, C.yellow, C.green, C.blue, PURPLE][i % 5]} opacity={f >= pt ? 1 : 0.25} transform={`rotate(${i * 31 + f * 3},${1050 + ((i * 97) % 680)},${200})`} />)}
            <Chip27 x={1380} y={760} s={P('c6f', 4) * bump(pt)} text="pays for the party" on={on(pt)} color={C.green} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={280} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: bt, pose: 'shock', expr: 'worried', look: 0.8}]} />
            <BigNum x={1150} y={230} s={P('c6g') * bump(tw, 0.08)} label="Amazon's planned spending, 2026" value="~$200 BILLION" on={on(tw)} w={1000} />
            {[0, 1, 2, 3, 4].map((i) => <ServerRack key={i} f={f} x={750 + i * 210} y={880} s={0.6 * P('c6g', 2 + i)} on={f >= dc} />)}
            <Chip27 x={1150} y={480} s={P('c6g', 3) * bump(dc)} text="mostly AI data centers" on={on(dc)} color={PURPLE} />
            <Stamp x={1650} y={500} s={P('c6g', 5) * bump(bt, 0.25)} text="GIANT BET" size={56} color={f >= bt ? C.red : '#B8AF9E'} r={-8} />
            <G2 x={330} y={330} s={P('c6g', 4) * bump(nb)}><Bubble text={f >= nb ? 'will it pay off? nobody knows' : 'hmm...'} size={36} tail="down" /></G2>
            <SourceTag f={f} at={tw} text="Amazon Q4 2025 release: ~$200B capex expected in 2026" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 history + flywheel ============
  {
    const bk = w('c7a', 'back');
    const nn = w('c7b', 'nineteen');
    const bz = w('c7b', 'bezos');
    const bs2 = w('c7b', 'bookstore');
    const gr = w('c7b', 'garage');
    const ml = w('c7b', 'millions');
    const np = w('c7c', 'napkin');
    const ci = w('c7c', 'circle');
    const fl = [w('c7d', 'lower'), w('c7d', 'customers'), w('c7d', 'sellers'), w('c7d', 'choice')];
    const fw = w('c7e', 'flywheel');
    const sp = w('c7e', 'spins');
    const cm = w('c7f', 'computer');
    const tw = w('c7f', 'two');
    const ev = w('c7f', 'everyone');
    const sd = w('c7f', 'side');
    const mc = w('c7f', 'machine');
    q(bk, 'flip', 0.5);
    q(nn, 'flip', 0.6);
    q(bz, 'pop', 0.5);
    q(bs2, 'paper', 0.5);
    q(ml, 'pop2', 0.5);
    q(np, 'scribble', 0.6);
    q(ci, 'draw', 0.6);
    fl.forEach((x) => q(x, 'pop', 0.5));
    q(fw, 'whoosh', 0.6);
    q(sp, 'chime', 0.5);
    q(cm, 'key', 0.5);
    q(tw, 'flip', 0.6);
    q(ev, 'crowd', 0.4);
    q(mc, 'cash', 0.7);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Garage x={1080} y={822} s={0.9 * P('c7a')} sign="GARAGE" />
            <Books x={1080} y={800} s={1.1 * P('c7a', 2) * bump(ml)} n={f >= ml ? 7 : 4} />
            <Calendar x={230} y={260} s={0.6 * P('c7a', 2) * bump(nn)} top="YEAR" year={f >= nn ? 1994 : '19??'} flip={0} />
            <Stick f={f} x={620} y={822} s={1 * P('c7a', 3)} acc={[]} seed={90} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: bs2, pose: 'present', expr: 'grin', look: 0.8}]} />
            <Chip27 x={620} y={420} s={P('c7a', 4) * bump(bz)} text="Jeff Bezos" on={on(bz)} color={C.navy} size={32} />
            <Chip27 x={1080} y={140} s={P('c7a', 4) * bump(bs2)} text="an online BOOKSTORE" on={on(bs2)} color={C.blue} />
            <Chip27 x={1500} y={240} s={P('c7a', 5) * bump(ml)} text="easy to ship · millions of titles" on={on(ml)} color={C.green} size={32} />
            <Dave f={f} x={1750} y={822} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}]} />
            {f >= gr && <SourceTag f={f} at={gr} text="Amazon founded July 1994, Bellevue, WA" />}
          </Svg>
          <OldFilm f={f} o={0.8} />
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={240} y={880} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: fw, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <Flywheel x={1100} y={520} s={0.88 * P('c7c') * bump(ci, 0.05)} labels={['LOWER PRICES', 'MORE CUSTOMERS', 'MORE SELLERS', 'MORE CHOICE']} lit={fl.map((x) => on(x))} spin={f >= fw ? (f - fw) * (f >= sp ? 3 : 1.2) : 0} />
            <Chip27 x={300} y={200} s={P('c7c', 4) * bump(np)} text="the napkin" on={on(np)} color={C.navy} />
            <G2 x={1100} y={520} s={P('c7c', 5) * bump(fw, 0.25)}><Text size={44} color={f >= fw ? C.green : '#B8AF9E'}>{f >= fw ? 'FLYWHEEL' : '...'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Warehouse x={420} y={840} s={0.55 * P('c7f')} name="AMAZON STORE" />
            <ServerRack f={f} x={420} y={540} s={0.6 * P('c7f', 2) * bump(cm)} on={f >= cm} />
            <Calendar x={960} y={260} s={0.6 * P('c7f', 3) * bump(tw)} top="AWS LAUNCH" year={f >= tw ? 2006 : '20??'} flip={0} />
            <path d="M 620 560 Q 900 520 1120 520" fill="none" stroke={f >= tw ? C.green : '#D8D0C0'} strokeWidth={10} strokeDasharray="22 14" />
            <G2 x={1440} y={440} s={0.75 * P('c7f', 3)}><Cloud label="AWS" color="#E3F1F4" size={110} /></G2>
            {[0, 1, 2, 3].map((i) => <Stick key={i} f={f} x={1230 + i * 150} y={880} s={0.6 * P('c7f', 4 + i)} acc={i % 2 ? ['tie'] : ['cap']} seed={80 + i} opacity={dim(ev, 0.4)} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: ev, pose: 'celebrate', expr: 'grin'}]} />)}
            <Chip27 x={960} y={110} s={P('c7f', 5) * bump(sd)} text={f >= mc ? 'side project → PROFIT MACHINE' : 'side project'} on={on(sd)} color={f >= mc ? C.green : C.blue} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 float ============
  {
    const fl = w('c8a', 'float');
    const ho = w('c8a', 'hold');
    const cs = w('c8b', 'cash');
    const su = w('c8c', 'suppliers');
    const wk = w('c8c', 'weeks');
    const us = w('c8c', 'use');
    const o1 = w('c8d', 'one');
    const th = w('c8d', 'thirty');
    const ol = w('c8d', 'only');
    const td = w('c8e', 'today');
    const mn = w('c8e', 'month');
    const gw = w('c8e', 'growth');
    q(fl, 'ding', 0.6);
    q(ho, 'pop', 0.5);
    q(cs, 'cash', 0.7);
    q(su, 'pop', 0.5);
    q(wk, 'tick', 0.6);
    q(us, 'coin', 0.6);
    q(o1, 'thud', 0.6);
    q(th, 'pop', 0.5);
    q(ol, 'stamp', 0.6);
    q(td, 'cash', 0.6);
    q(mn, 'flip', 0.5);
    q(gw, 'chime', 0.5);
    scene(A('c8a'), () =>
      f < A('c8b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={330} y={880} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
            <FloatPool f={f} x={1150} y={500} s={1.3 * P('c8a') * bump(fl, 0.08)} label="FLOAT" />
            <Chip27 x={1150} y={180} s={P('c8a', 3)} text="from our insurance video" on={1} color={C.navy} size={34} />
            <Chip27 x={1150} y={800} s={P('c8a', 4) * bump(ho)} text="money you hold before paying it out" on={on(ho)} color={C.green} size={34} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={320} y1={420} x2={1600} y2={420} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
            {[[320, 'DAY 0'], [1600, 'WEEKS LATER']].map(([x, l], i) => (
              <G2 key={i} x={x as number} y={420} s={P('c8b', i * 2)}>
                <circle r={26} fill={i === 0 ? C.green : C.red} stroke={C.ink} strokeWidth={6} />
                <Text y={-60} size={40}>{l as string}</Text>
              </G2>
            ))}
            <Chip27 x={450} y={560} s={P('c8b', 3) * bump(cs)} text="Dave pays → Amazon gets cash" on={on(cs)} color={C.green} size={32} />
            <Chip27 x={1470} y={560} s={P('c8b', 4) * bump(wk)} text="Amazon pays suppliers" on={on(su)} color={C.red} size={32} />
            <G2 x={960} y={300} s={P('c8b', 5) * bump(us, 0.2)} o={dim(us, 0.45)}>
              <path d="M -560 60 L -560 20 L 560 20 L 560 60" fill="none" stroke={f >= us ? C.gold : GRAY} strokeWidth={10} strokeLinejoin="round" />
              <Text y={-30} size={50} color={f >= us ? C.ink : GRAY}>Amazon gets to USE the money</Text>
            </G2>
            <Dave f={f} x={320} y={900} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}]} />
            <Coin x={f >= cs ? lin(f, cs, cs + 20, 400, 960) : 400} y={f >= cs ? 760 - Math.sin(lin(f, cs, cs + 20) * Math.PI) * 120 : 760} s={0.6 * P('c8b', 2)} />
            <Warehouse x={960} y={900} s={0.3 * P('c8b', 2)} name="AMAZON" />
            <Stick f={f} x={1600} y={900} s={0.8 * P('c8b', 4)} acc={['ponytail']} seed={44} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: wk, pose: 'hips', expr: 'tired', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={850} y={120} s={P('c8d')}><Text size={50}>Amazon, December 31, 2025</Text></G2>
            <line x1={420} y1={820} x2={1280} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={640} y={820} h={ease(f, o1 - 4, o1 + 14, 60, 122 * 4.2) * P('c8d')} color={C.red} label="unpaid bills it owes" value={f >= o1 ? '$122B' : '?'} w={280} />
            <Bar x={1060} y={820} h={ease(f, th - 4, th + 14, 60, 38 * 4.2) * P('c8d', 2)} color={ORANGE27} label="all its inventory" value={f >= th ? '$38B' : '?'} w={280} />
            <Chip27 x={1560} y={300} s={P('c8d', 4) * bump(ol)} text="owes 3x its shelves" on={on(ol)} color={C.red} />
            <Dave f={f} x={1600} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ol, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={o1} text="Amazon balance sheet 12/31/2025: accounts payable $121.9B · inventories $38.3B" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={380} y={822} s={1.05} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
            <Stand x={820} y={822} s={1.05 * P('c8e')} label="DAVE'S LEMONADE" big />
            {[0, 1].map((i) => <Stick key={i} f={f} x={1230 + i * 170} y={822} s={0.85 * P('c8e', 2 + i)} acc={i ? ['bun', 'glasses'] : ['cap']} seed={i ? 13 : 21} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}]} />)}
            <Chip27 x={820} y={170} s={P('c8e', 3) * bump(td)} text="paid TODAY" on={on(td)} color={C.green} />
            <Calendar x={1650} y={330} s={0.55 * P('c8e', 4) * bump(mn)} top="LEMON BILL" year={f >= mn ? 'next month' : '?'} flip={0} />
            <Chip27 x={1300} y={170} s={P('c8e', 5) * bump(gw)} text="customers fund the growth" on={on(gw)} color={C.blue} size={34} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e')];
    const ed = w('c9a', 'education');
    const dl = w('c9f', 'deal');
    const tr = w('c9f', 'truck');
    q(ed, 'ding', 0.5);
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(dl, 'ding', 0.5);
    q(tr, 'chime', 0.5);
    const items = ['Look past "sponsored"', 'Compare prices', 'Do the Prime math', 'Watch the habit'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c9a'), () =>
      f < A('c9f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={110} s={P('c9a')}><Text size={60}>What Dave does now</Text></G2>
            <G2 x={1560} y={110} s={P('c9a', 2) * bump(ed)}><Text size={34} color={f >= ed ? C.red : '#8C7A5B'}>(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={100} y={270 + i * 150} s={0.9 * P('c9a', 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.55} color={C.blue} w={1000} />)}
            {cur === 0 && <Dave f={f} x={1550} y={880} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'happy', look: -0.8}]} />}
            {cur === 1 && <SearchPage x={1520} y={520} s={0.55} rows={[{t: 'MegaVolt', p: '$12.99', sp: true}, {t: 'PowerPro', p: '$14.49', sp: true}, {t: 'Basic', p: '$8.99'}]} tag={1} hl={2} />}
            {cur === 2 && [['$10.99', C.yellow], ['$9.49', C.green], ['$11.20', C.yellow]].map(([p, c], i) => <PriceTag key={i} x={1520} y={320 + i * 180} s={1.2} text={p} color={c} />)}
            {cur === 3 && <G2 x={1520} y={480}><MemberCard s={1.1} tier="PRIME" price="$139/yr" color={C.navy} /><Text y={230} size={44}>vs. shipping you'd pay</Text></G2>}
            {cur === 4 && <G2 x={1520} y={480}><Parcel s={1.1} /><Text y={-220} size={50}>"free"?</Text><XMark s={0.35} x={150} y={-120} /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={520} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: tr, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={700} y={650} s={0.45 * P('c9f')}><Parcel /></G2>
            <Truck x={1300} y={822} s={1.4 * P('c9f', 2)} />
            <Chip27 x={520} y={250} s={P('c9f', 3) * bump(dl)} text="still a good deal" on={on(dl)} color={C.green} />
            {['seller fees', 'ads', 'Prime', 'AWS'].map((l, i) => <Chip27 key={l} x={1060 + i * 230} y={400} s={P('c9f', 4 + i) * bump(tr + i * 4)} text={l} on={on(tr + i * 4)} color={[C.red, PURPLE, C.navy, ORANGE27][i]} size={32} w={210} />)}
            <G2 x={1400} y={280} s={P('c9f', 4)}><Text size={40}>who paid for the truck?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ recap + teaser + end ============
  const recap = ['Thin store margins · fees & ads make it pay', 'Prime = more shopping · cash before bills', 'Most of the profit: the cloud (AWS)'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P('d1a')}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={220} y={360 + i * 170} s={P('d1a', 2 + i * 2)} n={i + 1} text={b} lit={f >= r[i] ? 1 : 0.4} color={ORANGE27} w={1320} />)}
          <Dave f={f} x={1700} y={900} s={0.8} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ks = [w('d2a', 'streaming'), w('d2a', 'software'), w('d2a', 'phone'), w('d2a', 'seats')];
    const sb = w('d2b', 'subscribe');
    const sn = w('d2a', 'subscription');
    const fe = w('d2b', 'fee');
    const ck = w('d2b', 'checked');
    ks.forEach((x) => q(x, 'pop', 0.5));
    q(sn, 'stamp', 0.6);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fe, 'coin', 0.5);
    q(ck, 'ding', 0.5);
    scene(A('d2a'), () =>
      f < A('d2b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('d2a')}><Text size={56}>NEXT: why is everything a subscription?</Text></G2>
            {['streaming', 'software', 'your phone', 'heated seats'].map((l, i) => (
              <G2 key={l} x={300 + i * 440} y={520} s={P('d2a', 2 + i * 2) * bump(ks[i])} o={dim(ks[i], 0.5)}>
                <Frame w={380} h={440} label={l}>
                  {i === 0 && <TV s={0.8} y={-40} />}
                  {i === 1 && <CodeScreen s={0.4} y={-40} lines={['app.exe', 'plan: monthly']} />}
                  {i === 2 && <Phone s={0.6} y={-30} title="PHONE" value="$/mo" />}
                  {i === 3 && <CarSeat f={f} s={0.7} y={20} />}
                </Frame>
                <PriceTag x={90} y={-230} s={0.6} text="$/mo" color={f >= ks[i] ? C.yellow : '#EFEAE0'} />
              </G2>
            ))}
            <Stamp x={1650} y={820} s={P('d2a', 8) * bump(sn, 0.2)} text="EPISODE 28" size={48} color={f >= sn ? C.red : '#B8AF9E'} r={-6} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={420} s={1.3 * P('d2b')} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={420} s={P('d2b', 3)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.8}]} />
            <MemberCard x={1300} y={700} s={0.8 * P('d2b', 4) * bump(fe, 0.1)} tier="SUBSCRIBER" price={f >= fe ? '$0 · no fee' : 'price: ?'} color={C.red} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c6e', 'profit', 1) + 20;
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
