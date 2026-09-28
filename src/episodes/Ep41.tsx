import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, Car, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Bell, CreditCard, Envelope, Frame, Icon, Row, SubButton} from '../props2';
import {Raccoon} from '../props3';
import {Candle, SaleSign} from '../props36';
import {Suitcase} from '../props8';
import {BNPLDots, ChristmasTree, GiftBox, InterestGauge, LayawayTicket, Sweater, Tablet, ToyBox, WrapRoll} from '../props41';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;

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

export const Ep41: React.FC = () => {
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
    const mr = w('o1', 'march');
    const bk = w('o1', 'banking');
    const lo = w('o1', 'leftover');
    const th = w('o2', 'three');
    const cd = w('o2', 'candle');
    const sw = w('o2', 'sweater');
    const wp = w('o2', 'wrapping');
    q(2, 'pop', 0.6);
    q(mr, 'ding', 0.5);
    q(bk, 'click', 0.5);
    q(lo, 'buzz', 0.5);
    q(th, 'cash', 0.8);
    q(cd, 'pop2', 0.5);
    q(sw, 'pop2', 0.5);
    q(wp, 'pop2', 0.5);
    const sk = shake(f, th, 12, 14);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={300} y={920} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}, {at: th + 20, pose: 'facepalm', expr: 'tired', look: 0.8}]} />
          <Box x={760} y={220} w={520} h={140} s={P(0) * bump(mr, 0.1)}><Text size={44}>{f >= mr ? 'IT IS MARCH' : "it's march..."}</Text></Box>
          <G2 x={760} y={520} s={1.15 * P(0) * bump(bk, 0.1)}>
            <rect x={-190} y={-260} width={380} height={520} rx={40} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
            <rect x={-162} y={-228} width={324} height={456} rx={16} fill="#F7FAFD" />
            <rect x={-162} y={-228} width={324} height={64} rx={16} fill={C.navy} />
            <Text y={-196} size={24} color="#fff" ls={2}>DAVE'S BANK APP</Text>
            <Text y={-130} size={26} color={GRAY}>Leftover from Christmas</Text>
            <G2 y={-30} s={bump(th, 0.2)}><Text size={f >= th ? 76 : 90} color={f >= th ? C.red : C.ink}>{f >= th ? '$312.00' : '$???'}</Text></G2>
            <Text y={70} size={24} color={f >= lo ? C.red : GRAY}>{f >= lo ? 'still leftover... in March' : 'balance'}</Text>
          </G2>
          <G2 x={1420} y={420} s={P(sk ? 0 : 0)} />
          <G2 x={1380} y={420 + sk.y} s={1.1 * P(0) * bump(cd, 0.15)}><Candle /></G2>
          <G2 x={1600} y={480 + sk.y} s={1 * P(0) * bump(sw, 0.15)}><Sweater /></G2>
          <G2 x={1420} y={720} s={1 * P(0) * bump(wp, 0.15)}><WrapRoll r={30} /></G2>
          <G2 x={1500} y={880} o={lt(wp, 0.4)}><Text size={36} color={C.red}>3 things nobody wanted</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('o3', 'twist');
    const bd = w('o3', 'bad');
    const bl = w('o3', 'built');
    const pv = [w('o4', 'ads'), w('o4', 'discounts'), w('o4', 'payments'), w('o4', 'list')];
    const pk = w('o5', 'pocket');
    q(tw, 'boing', 0.4);
    q(bd, 'buzz', 0.5);
    q(bl, 'stamp', 0.7);
    pv.forEach((x) => q(x, 'pop', 0.5));
    q(pk, 'coin', 0.5);
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={140} s={P(A('o3')) * bump(bl, 0.12)} text={f >= bl ? 'DESIGNED THIS WAY' : 'BAD WITH MONEY?'} size={58} color={f >= bl ? C.red : GRAY} r={-3} />
          {['THE ADS', 'FAKE DISCOUNTS', 'PAY IN 4', "KID'S WISH LIST"].map((l, i) => (
            <G2 key={l} x={250 + i * 470} y={570} s={P(A('o3')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={420} h={420}>
                {i === 0 && <G2 y={-20} s={0.7}><Envelope label="50% OFF!" /></G2>}
                {i === 1 && <SaleSign s={0.55} y={-10} was="$80" now="$40" />}
                {i === 2 && <BNPLDots s={0.55} y={0} paid={2} />}
                {i === 3 && <Tablet s={0.7} y={-10} />}
                <Text y={175} size={30}>{l}</Text>
              </Frame>
            </G2>
          ))}
          <Dave f={f} x={960} y={1040} s={0.6} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
          <G2 x={1500} y={950} s={P(A('o3'))} o={lt(pk, 0.4)}><Text size={38} color={C.red}>pulling from his pocket, on purpose</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'spend'), w('o6', 'profits'), w('o6', 'march')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['HOW MUCH IS SPENT', 'WHO PROFITS', 'NO MARCH BILL'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <G2 y={0} s={0.9}><GiftBox color={C.red} /></G2>}
                {i === 1 && <Raccoon f={f} s={0.7} y={60} mood="greedy" holdCoin />}
                {i === 2 && <Icon kind="check" s={0.8} y={0} />}
                <Text y={210} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 the number ============
  {
    const nv = w('c1a', 'never');
    const nrf = w('c1b', 'national');
    const pln = w('c1b', 'plan');
    const avg = w('c1c', 'average');
    const amt = w('c1c', 'eight');
    const per = w('c1c', 'person');
    q(nv, 'whoosh_s', 0.4);
    q(nrf, 'paper', 0.5);
    q(pln, 'pop', 0.4);
    q(avg, 'stamp', 0.5);
    q(amt, 'cash', 0.8);
    q(per, 'ding', 0.5);
    const gf = w('c1d', 'gifts');
    const sec = w('c1d', 'second');
    const pc = w('c1e', 'percent');
    const rc = w('c1e', 'record');
    q(gf, 'pop2', 0.4);
    q(sec, 'stamp', 0.6);
    q(pc, 'ding', 0.5);
    q(rc, 'clank', 0.5);
    const ml = w('c1f', 'multiply');
    const hh = w('c1f', 'households');
    const tr = w('c1f', 'trillion');
    const wk = w('c1f', 'weeks');
    q(ml, 'pop', 0.5);
    q(hh, 'coin', 0.6);
    q(tr, 'stamp', 0.8);
    q(wk, 'tick', 0.5);
    scene(A('c1a'), () =>
      f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1a')) * bump(nv)}><Text size={48}>{f >= nrf ? 'the National Retail Federation asks' : "a number Dave never adds up"}</Text></G2>
            <Box x={620} y={520} w={640} h={420} s={P(A('c1a')) * bump(avg, 0.06)}>
              <Text y={-150} size={30} color={GRAY}>NRF 2025 Winter Holiday Survey</Text>
              <Text y={-70} size={28} color={GRAY}>{f >= pln ? 'planned spend per person' : 'average shopper plans to spend...'}</Text>
              <Text y={30} size={90} color={f >= amt ? C.red : C.ink}>{f >= amt ? '$890.49' : '$???'}</Text>
              <Text y={130} size={30} color={f >= per ? C.ink : GRAY}>{f >= per ? 'gifts · food · decor · cards' : ''}</Text>
            </Box>
            <G2 x={1420} y={420} s={0.9 * P(A('c1a')) * bump(gf, 0.1)}><GiftBox color={C.blue} /></G2>
            <G2 x={1620} y={460} s={0.7 * P(A('c1a')) * bump(gf, 0.1)}><GiftBox color={C.green} /></G2>
            <Box x={1500} y={780} w={620} h={220} s={P(A('c1a')) * bump(rc, 0.1)} o={lt(sec, 0.45)} fill={f >= pc ? C.yellow : '#fff'}>
              <Text y={-50} size={30} color={GRAY}>2nd-highest in 23 years</Text>
              <Text y={30} size={54} color={C.red}>{f >= pc ? 'only 1% off the record' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={nrf} text="NRF 2025 Winter Holiday consumer survey (Prosper Insights & Analytics)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1f')) * bump(ml)}><Text size={48}>now multiply that</Text></G2>
            <Box x={500} y={520} w={560} h={260} s={P(A('c1f'))}>
              <Text y={-50} size={34} color={GRAY}>per person</Text>
              <Text y={40} size={70} color={C.red}>$890</Text>
            </Box>
            <G2 x={880} y={520} s={bump(hh)} o={lt(hh, 0.4)}><Text size={70}>×</Text></G2>
            <Box x={1260} y={520} w={620} h={260} s={P(A('c1f')) * bump(hh, 0.06)} o={lt(hh, 0.45)}>
              <Text y={-50} size={30} color={GRAY}>U.S. households</Text>
              <Text y={40} size={62}>130,000,000</Text>
            </Box>
            <Box x={960} y={880} w={760} h={240} s={P(A('c1f')) * bump(tr, 0.1)} o={lt(tr, 0.45)} fill={f >= tr ? C.yellow : '#fff'}>
              <Text y={-45} size={32} color={GRAY}>{f >= wk ? 'in about 8 weeks' : 'the whole country plans to spend'}</Text>
              <Text y={50} size={76} color={C.red}>{f >= tr ? 'OVER $1 TRILLION' : '?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 fake sale ============
  {
    const bf = w('c2a', 'black');
    const st = w('c2b', 'study');
    const fh = w('c2b', 'fifteen');
    const nr = w('c2c', 'not');
    const on3 = w('c2c', 'three');
    q(bf, 'boing', 0.5);
    q(st, 'paper', 0.4);
    q(fh, 'pop2', 0.4);
    q(nr, 'buzz', 0.5);
    q(on3, 'ding', 0.5);
    const sm = w('c2d', 'same');
    const oc = w('c2d', 'october');
    const lg = w('c2e', 'luggage');
    const s61 = w('c2e', 'sixty');
    q(sm, 'stamp', 0.5);
    q(oc, 'ding', 0.4);
    q(lg, 'pop', 0.5);
    q(s61, 'stamp', 0.7);
    const hd = w('c2f', 'hide');
    const s37 = w('c2f', 'thirty');
    q(hd, 'buzz', 0.5);
    q(s37, 'cash', 0.7);
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <SaleSign x={620} y={480} s={1.25 * P(A('c2a')) * bump(bf, 0.08)} was="$80" now="$40" strike={1} />
            <Box x={1450} y={300} w={780} h={280} s={P(A('c2a')) * bump(st, 0.06)}>
              <Text y={-85} size={30} color={GRAY}>2025 study, 1,500+ products tracked</Text>
              <Text y={0} size={44} color={f >= nr ? C.red : C.ink}>{f >= nr ? 'ONE IN THREE deals' : 'October → Cyber Monday'}</Text>
              <Text y={70} size={40} color={f >= nr ? C.red : GRAY}>{f >= nr ? 'were NOT real discounts' : ''}</Text>
            </Box>
            <Dave f={f} x={1450} y={900} s={1.1} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.8}, {at: nr, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <G2 x={1450} y={720} o={lt(sm, 0.4)}><Text size={38} color={C.red}>same price as October, or higher</Text></G2>
            <SourceTag f={f} at={st} text="Visualping / WalletHub analysis, Oct–Cyber Monday 2025 (via CNBC, Nov 26 2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={110} s={P(A('c2e')) * bump(lg)}><Text size={48}>worst offender: luggage</Text></G2>
            <G2 x={620} y={520} s={1.3 * P(A('c2e')) * bump(s61, 0.1)}><Suitcase color={C.blue} tag={f >= s61 ? '61%' : undefined} /></G2>
            <Box x={620} y={880} w={560} h={200} s={P(A('c2e')) * bump(s61, 0.1)} o={lt(s61, 0.45)} fill={f >= s61 ? C.red : '#fff'}>
              <Text y={0} size={60} color={f >= s61 ? '#fff' : C.ink}>{f >= s61 ? '61% FAKE' : '?'}</Text>
            </Box>
            <Box x={1450} y={560} w={760} h={340} s={P(A('c2e')) * bump(s37, 0.06)} o={lt(hd, 0.45)}>
              <Text y={-100} size={32} color={GRAY}>even the fake ones try to hide it</Text>
              <Text y={-10} size={34} color={GRAY}>average "sale" price still</Text>
              <Text y={80} size={72} color={C.red}>{f >= s37 ? '+37%' : '?'}</Text>
              <Text y={150} size={28} color={GRAY}>above the item's real low</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 pay in four ============
  {
    const gc = w('c3a', 'console');
    const fr = w('c3a', 'four');
    const bnpl = w('c3b', 'later');
    const nt = w('c3b', 'nothing');
    q(gc, 'pop', 0.5);
    q(fr, 'ding', 0.5);
    q(bnpl, 'stamp', 0.6);
    q(nt, 'buzz', 0.4);
    const tb = w('c3c', 'twenty', 1);
    const bn = w('c3c', 'billion');
    const al = w('c3c', 'all');
    q(tb, 'ding', 0.4);
    q(bn, 'cash', 0.8);
    q(al, 'stamp', 0.6);
    const tn = w('c3d', 'ten');
    const mn = w('c3d', 'midnight');
    q(tn, 'pop2', 0.4);
    q(mn, 'boing', 0.5);
    const rg = w('c3e', 'regulators');
    const lg2 = w('c3e', 'lighter');
    q(rg, 'paper', 0.5);
    q(lg2, 'buzz', 0.5);
    const mth = w('c3f', 'math');
    const hd = w('c3f', 'hundred', 1);
    q(mth, 'stamp', 0.5);
    q(hd, 'cash', 0.7);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={620} y={110} s={P(A('c3a')) * bump(gc)}><Text size={48}>{f >= bnpl ? 'buy now, pay later' : "can't quite afford it..."}</Text></G2>
            <G2 x={620} y={520} s={1.2 * P(A('c3a')) * bump(fr, 0.1)}><ToyBox label="GAME CONSOLE" /></G2>
            <G2 x={620} y={880} s={P(A('c3a')) * bump(fr, 0.1)}><BNPLDots paid={0} amt="$25" /></G2>
            <Dave f={f} x={1420} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: nt, pose: 'typing', expr: 'happy', look: -0.8}]} />
            <Box x={1500} y={330} w={640} h={280} s={P(A('c3a')) * bump(bn, 0.08)} o={lt(tb, 0.45)} fill={f >= bn ? C.yellow : '#fff'}>
              <Text y={-70} size={30} color={GRAY}>holiday BNPL spend, 2025</Text>
              <Text y={20} size={76} color={C.red}>{f >= bn ? '$20 BILLION' : '?'}</Text>
              <Text y={100} size={30} color={f >= al ? C.red : GRAY}>{f >= al ? 'an all-time high' : ''}</Text>
            </Box>
            <SourceTag f={f} at={bn} text="Adobe Analytics 2025 Holiday Shopping Report (Jan 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3e')) * bump(rg)}><Text size={46} color={f >= rg ? C.red : C.ink}>{f >= rg ? 'lighter rules than credit cards' : 'worth knowing...'}</Text></G2>
            <G2 x={620} y={520} s={1.1 * P(A('c3e')) * bump(rg, 0.1)}><Icon kind="rulebook" /></G2>
            <G2 x={620} y={820} o={lt(lg2, 0.4)}><Text size={34} color={GRAY}>regulators walked the rule back in 2025</Text></G2>
            <G2 x={1400} y={480} s={1.3 * P(A('c3e')) * bump(hd, 0.12)}><BNPLDots paid={4} amt="$25" /></G2>
            <Box x={1400} y={800} w={640} h={220} s={P(A('c3e')) * bump(hd, 0.08)} o={lt(mth, 0.45)} fill={f >= hd ? C.yellow : '#fff'}>
              <Text y={-40} size={32} color={GRAY}>4 × $25 =</Text>
              <Text y={40} size={64} color={C.red}>{f >= hd ? '$100, all at once' : '?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 grandma layaway ============
  {
    const gm = w('c4a', 'grandma');
    const lw = w('c4a', 'layaway');
    const hd2 = w('c4b', 'holds');
    const pd = w('c4b', 'paid');
    q(gm, 'pop', 0.5);
    q(lw, 'ding', 0.5);
    q(hd2, 'stamp', 0.5);
    q(pd, 'coin', 0.6);
    const fl = w('c4c', 'flips');
    const tk = w('c4c', 'today');
    q(fl, 'boing', 0.5);
    q(tk, 'pop2', 0.5);
    const af = w('c4d', 'afford');
    const bt = w('c4d', 'bets');
    q(af, 'ding', 0.5);
    q(bt, 'buzz', 0.5);
    const sl = w('c4e', 'slower');
    const ow = w('c4e', 'owing');
    q(sl, 'whoosh_s', 0.4);
    q(ow, 'stamp', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100} s={P(A('c4a'))}><Text size={48}>Grandma's Layaway vs Dave's 4 Payments</Text></G2>
          <Grandma f={f} x={480} y={880} s={1.05} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
          <G2 x={480} y={520} s={1.05 * P(A('c4a')) * bump(lw, 0.08)}><LayawayTicket paidPct={f >= af ? 1 : f >= hd2 ? 0.6 : f >= pd ? 0.3 : 0} /></G2>
          <G2 x={480} y={220} o={lt(hd2, 0.4)}><Text size={32} color={C.green}>{f >= af ? 'pay first → take home' : 'store holds it'}</Text></G2>
          <Dave f={f} x={1440} y={880} s={1.05} keys={[{at: 0, pose: 'carry', expr: 'happy', look: -0.8}, {at: bt, pose: 'worried', expr: 'worried', look: -0.8}]} />
          <G2 x={1440} y={520} s={1.05 * P(A('c4a')) * bump(fl, 0.08)}><BNPLDots paid={f >= af ? 1 : 0} amt="$25" /></G2>
          <G2 x={1440} y={220} o={lt(tk, 0.4)}><Text size={32} color={C.red}>{f >= bt ? 'bets you\'ll figure it out' : 'take home → pay after'}</Text></G2>
          <Arrow d="M 900 700 L 1020 700" t={f >= sl ? 1 : 0.2} color={C.ink} />
          <G2 x={960} y={950} s={bump(ow)} o={lt(sl, 0.4)}><Text size={36} color={GRAY}>slower & less exciting, but way harder to end up owing money you don't have</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 balance ============
  {
    const qf = w('c5a', 'quietly');
    const ny = w('c5b', 'federal');
    const fb = w('c5b', 'forty');
    q(qf, 'boing', 0.4);
    q(ny, 'paper', 0.5);
    q(fb, 'cash', 0.8);
    const t28 = w('c5c', 'two');
    const half = w('c5c', 'half');
    q(t28, 'stamp', 0.7);
    q(half, 'ding', 0.5);
    const dp = w('c5d', 'dipped');
    const sx = w('c5d', 'six');
    q(dp, 'buzz', 0.5);
    q(sx, 'stamp', 0.6);
    const dis = w('c5e', 'disappear');
    const nb = w('c5e', 'normal');
    q(dis, 'whoosh_s', 0.4);
    q(nb, 'ding', 0.6);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={600} y={110} s={P(A('c5a')) * bump(qf)}><Text size={46}>Dave's card is quietly filling up</Text></G2>
            <CreditCard x={600} y={540} s={1.5 * P(A('c5a')) * bump(fb, 0.1)} label="DAVE" />
            <Box x={600} y={900} w={640} h={200} s={P(A('c5a')) * bump(fb, 0.08)} o={lt(ny, 0.45)} fill={f >= fb ? C.yellow : '#fff'}>
              <Text y={-40} size={30} color={GRAY}>Q4 2025 jump</Text>
              <Text y={35} size={58} color={C.red}>{f >= fb ? '+$44 BILLION' : '?'}</Text>
            </Box>
            <Box x={1450} y={520} w={720} h={340} s={P(A('c5a')) * bump(half, 0.06)} o={lt(t28, 0.45)}>
              <Text y={-90} size={30} color={GRAY}>total U.S. credit card debt</Text>
              <Text y={0} size={70} color={C.red}>{f >= t28 ? '$1.28 TRILLION' : '?'}</Text>
              <Text y={90} size={34} color={f >= half ? C.red : GRAY}>{f >= half ? 'up 5.5% from a year before' : ''}</Text>
            </Box>
            <SourceTag f={f} at={ny} text="Federal Reserve Bank of New York, Household Debt and Credit, Q4 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5d')) * bump(dp)}><Text size={46}>by spring...</Text></G2>
            <Bar x={620} y={820} h={310} color={C.red} label="Q4 2025 balance" value="$1.28T" s={P(A('c5d'))} />
            <Bar x={1180} y={820} h={280} color={f >= dp ? C.yellow : C.red} label="Q1 2026 balance" value={f >= dp ? '$1.25T (dipped)' : '$1.28T'} s={P(A('c5d')) * bump(dp, 0.1)} />
            <Box x={1560} y={420} w={560} h={280} s={P(A('c5d')) * bump(sx, 0.08)} o={lt(sx, 0.45)} fill={f >= sx ? C.yellow : '#fff'}>
              <Text y={-70} size={28} color={GRAY}>still, vs. one year earlier</Text>
              <Text y={30} size={70} color={C.red}>{f >= sx ? '+5.9%' : '?'}</Text>
            </Box>
            <G2 x={960} y={960} o={lt(nb, 0.35)}><Text size={38} color={f >= dis ? C.red : GRAY}>{f >= dis ? "it doesn't disappear — it becomes the new normal" : ''}</Text></G2>
            <SourceTag f={f} at={sx} text="Federal Reserve Bank of New York, Household Debt and Credit, Q1 2026" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 kids marketing ============
  {
    const kid = w('c6a', 'kid');
    const bn = w('c6b', 'billion');
    q(kid, 'boing', 0.4);
    q(bn, 'cash', 0.7);
    const on2 = w('c6c', 'online');
    const fd = w('c6c', 'feed');
    q(on2, 'pop', 0.4);
    q(fd, 'ding', 0.5);
    const lc = w('c6d', 'licensed');
    const th30 = w('c6d', 'thirty');
    q(lc, 'pop2', 0.5);
    q(th30, 'stamp', 0.7);
    const ftc = w('c6e', 'federal');
    const tl = w('c6e', 'tell');
    q(ftc, 'paper', 0.5);
    q(tl, 'buzz', 0.5);
    const fr = w('c6f', 'fridge');
    const mk = w('c6f', 'marketing');
    q(fr, 'ding', 0.5);
    q(mk, 'stamp', 0.6);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={600} y={110} s={P(A('c6a')) * bump(kid)}><Text size={46}>this part isn't aimed at Dave. It's aimed at his kid.</Text></G2>
            <G2 x={560} y={560} s={1.05 * P(A('c6a')) * bump(fd, 0.08)}><Tablet /></G2>
            <Dave f={f} x={1000} y={900} s={1} keys={[{at: 0, pose: 'point_l', expr: 'worried', look: -0.8}]} />
            <Box x={1500} y={480} w={700} h={300} s={P(A('c6a')) * bump(bn, 0.08)} o={lt(bn, 0.45)} fill={f >= bn ? C.yellow : '#fff'}>
              <Text y={-80} size={28} color={GRAY}>U.S. kids/toy ad spend, per year</Text>
              <Text y={20} size={64} color={C.red}>{f >= bn ? '$1.5 BILLION+' : '?'}</Text>
              <Text y={100} size={26} color={GRAY}>before the holiday push itself</Text>
            </Box>
            <G2 x={1500} y={820} o={lt(on2, 0.4)}><Text size={34} color={f >= fd ? C.red : GRAY}>{f >= fd ? "a kid's video feed = one long wish list" : 'over half of toys bought online'}</Text></G2>
            <SourceTag f={f} at={bn} text="Statista / Amra & Elma toy-marketing industry compilation, 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={600} y={110} s={P(A('c6d')) * bump(lc)}><Text size={46}>{f >= tl ? "kids can't always tell ad from show" : 'licensed characters'}</Text></G2>
            <G2 x={600} y={520} s={1.2 * P(A('c6d')) * bump(th30, 0.08)}><ToyBox label="LICENSED HERO" /></G2>
            <Box x={600} y={880} w={560} h={200} s={P(A('c6d')) * bump(th30, 0.08)} o={lt(lc, 0.45)} fill={f >= th30 ? C.yellow : '#fff'}>
              <Text y={0} size={58} color={C.red}>{f >= th30 ? '~30% of toy sales' : '?'}</Text>
            </Box>
            <G2 x={1450} y={540} s={1.1 * P(A('c6d')) * bump(ftc, 0.1)}><Icon kind="warning" /></G2>
            <G2 x={1450} y={780} o={lt(ftc, 0.4)}><Text size={34} color={C.red}>FTC flag: ads blur into content</Text></G2>
            <Box x={1450} y={940} w={680} h={160} s={P(A('c6d')) * bump(mk, 0.08)} o={lt(fr, 0.45)}>
              <Text y={0} size={32} color={f >= mk ? C.red : GRAY}>{f >= mk ? "the wish list? built by a marketing team" : 'the list on the fridge...'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 january gut punch ============
  {
    const np = w('c7a', 'nope');
    const lt37 = w('c7b', 'thirty');
    q(np, 'buzz', 0.7);
    q(lt37, 'stamp', 0.6);
    const ow2 = w('c7c', 'owed');
    const amt2 = w('c7c', 'one');
    q(ow2, 'pop', 0.5);
    q(amt2, 'cash', 0.8);
    const th3 = w('c7d', 'third');
    q(th3, 'ding', 0.5);
    const p40 = w('c7e', 'forty');
    const rc = w('c7e', 'raccoon');
    q(p40, 'stamp', 0.7);
    q(rc, 'boing', 0.5);
    const tw3 = w('c7f', 'thirds');
    const mch = w('c7f', 'march');
    q(tw3, 'ding', 0.5);
    q(mch, 'clank', 0.6);
    scene(A('c7a'), () =>
      f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={140} s={P(A('c7a')) * bump(np, 0.14)} text={f >= np ? 'NOPE' : 'JUST A JANUARY PROBLEM?'} size={f >= np ? 110 : 46} color={f >= np ? C.red : GRAY} r={f >= np ? -8 : 0} />
            <Box x={620} y={560} w={640} h={340} s={P(A('c7a')) * bump(lt37, 0.06)}>
              <Text y={-100} size={30} color={GRAY}>LendingTree survey</Text>
              <Text y={0} size={64} color={C.red}>{f >= lt37 ? '37%' : '?'}</Text>
              <Text y={90} size={32} color={GRAY}>took on holiday debt</Text>
            </Box>
            <Box x={1450} y={560} w={700} h={340} s={P(A('c7a')) * bump(amt2, 0.06)} o={lt(ow2, 0.45)} fill={f >= amt2 ? C.yellow : '#fff'}>
              <Text y={-90} size={30} color={GRAY}>average amount owed</Text>
              <Text y={20} size={68} color={C.red}>{f >= amt2 ? '$1,223' : '?'}</Text>
              <Text y={110} size={28} color={f >= th3 ? C.red : GRAY}>{f >= th3 ? '1/3 also has BNPL debt on top' : ''}</Text>
            </Box>
            <SourceTag f={f} at={lt37} text="LendingTree holiday debt survey (2,000+ U.S. consumers, 2025/2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={130} s={P(A('c7e')) * bump(p40)}><Text size={46}>paying interest of...</Text></G2>
            <InterestGauge x={620} y={560} s={1.1 * P(A('c7e')) * bump(p40, 0.08)} pct={20} />
            <G2 x={620} y={880} o={lt(rc, 0.4)}><Text size={36} color={C.red}>a raccoon-sized bite</Text></G2>
            <Raccoon f={f} x={1300} y={880} s={0.9 * P(A('c7e')) * bump(rc, 0.1)} mood="greedy" holdCoin />
            <Box x={1450} y={430} w={640} h={260} s={P(A('c7e')) * bump(tw3, 0.08)} o={lt(tw3, 0.45)}>
              <Text y={-50} size={30} color={GRAY}>time to pay it off</Text>
              <Text y={40} size={58} color={C.red}>{f >= tw3 ? '2/3 need 3+ months' : '?'}</Text>
            </Box>
            <G2 x={960} y={1000} o={lt(mch, 0.35)}><Text size={36} color={GRAY}>March isn't a coincidence. It's the math.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 who profits ============
  {
    const rt = w('c8b', 'retailers');
    const one = w('c8c', 'later');
    const iss = w('c8d', 'longest');
    q(rt, 'pop', 0.5);
    q(one, 'pop2', 0.5);
    q(iss, 'pop2', 0.5);
    const tr2 = w('c8b', 'trillion');
    const fee = w('c8c', 'fees');
    const cmp = w('c8d', 'compounding');
    q(tr2, 'cash', 0.7);
    q(fee, 'coin', 0.6);
    q(cmp, 'stamp', 0.7);
    const cur = [rt, one, iss].filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={54}>who wins while Dave's still paying it off?</Text></G2>
          {['RETAILERS', 'BNPL COMPANIES', 'CARD ISSUERS'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('c8a')) * bump([rt, one, iss][i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <G2 y={-10} s={0.9}><GiftBox color={C.red} /><G2 y={140}><Text size={34} color={C.red}>{f >= tr2 ? '$1 TRILLION+' : ''}</Text></G2></G2>}
                {i === 1 && <G2 y={0} s={0.9}><BNPLDots s={0.6} paid={2} /><G2 y={140}><Text size={30} color={C.red}>{f >= fee ? 'fees + late fees' : ''}</Text></G2></G2>}
                {i === 2 && <Banker f={f} x={0} s={0.65} y={40} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />}
                <Text y={210} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
          <G2 x={960} y={1000} o={lt(cmp, 0.4)}><Text size={34} color={GRAY}>interest keeps compounding, quietly, in the background</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const nv = w('c9b', 'november');
    const em = w('c9c', 'empty');
    const ss = w('c9d', 'santa');
    const fc = w('c9e', 'four', 1);
    const jn = w('c9f', 'january');
    q(nv, 'boing', 0.4);
    q(em, 'pop', 0.4);
    q(ss, 'ding', 0.5);
    q(fc, 'buzz', 0.4);
    q(jn, 'tick', 0.5);
    const items = ['Set the gift budget in November', 'Cash or debit for gifts — empty envelope, stop shopping', 'Secret Santa, or "3 gifts each"', "Treat BNPL like real debt — 4 payments = 1 full price", 'Pay off January balance before anything new'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={90}><Text size={52}>How to Close the Year for Real</Text></G2>
          <G2 x={650} y={150}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={250 + i * 155} s={0.9 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1220} />)}
          {cur === 0 && <G2 x={1620} y={520}><Dave f={f} x={0} y={0} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} /></G2>}
          {cur === 1 && <G2 x={1620} y={520} s={bump(nv, 0.1)}><GiftBox color={C.green} /><Text y={140} size={34} color={C.green}>write the number down</Text></G2>}
          {cur === 2 && <G2 x={1620} y={520} s={bump(em, 0.1)}><Envelope label="CASH" /><Text y={140} size={34} color={f >= em ? C.red : GRAY}>{f >= em ? 'empty = stop' : 'envelope'}</Text></G2>}
          {cur === 3 && <G2 x={1620} y={520} s={bump(ss, 0.1)}><GiftBox color={C.blue} /><GiftBox x={110} color={C.gold} /><Text y={150} size={30} color={C.green}>fewer gifts, same love</Text></G2>}
          {cur === 4 && <G2 x={1620} y={520} s={bump(fc, 0.1)}><BNPLDots paid={0} /><XMark s={0.4} y={-20} /></G2>}
          {cur >= 5 && <G2 x={1620} y={520}><CreditCard s={0.9} /><Text y={200} size={34} color={f >= jn ? C.green : GRAY}>pay January first</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['~$890 per person, and 1 in 3 Black Friday deals are fake', 'BNPL & card balances spike in Dec, and stay up', 'November budget, cash envelopes, fewer gifts win'];
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
    const dt = w('r5', 'dating');
    const fd = w('r5', 'forty');
    const sb = w('r6', 'subscribe');
    const fr2 = w('r6', 'free');
    q(dt, 'pop', 0.5);
    q(fd, 'cash', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr2, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={54}>Next: Dave's dating app has ZERO matches</Text></G2>
            <Icon kind="heart" x={1000} y={620} s={1.2 * P(A('r5')) * bump(dt, 0.1)} />
            <G2 x={1450} y={560} s={P(A('r5')) * bump(fd, 0.15)} r={6}>
              <rect x={-160} y={-60} width={320} height={120} rx={16} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={4} size={56} color={C.red}>$40/mo</Text>
            </G2>
            <Dave f={f} x={500} y={900} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}, {at: fd, pose: 'shrug', expr: 'worried'}]} />
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

  const SUB = w('c5c', 'trillion') + 20;
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
