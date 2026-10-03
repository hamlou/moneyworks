import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, Street, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, SUB_FRAMES, subCues} from '../fx';
import {Bubble, Calendar, Clock, Coin, SourceTag, Stamp, Text} from '../props';
import {Bar, CreditCard, Row, SubButton, Bell} from '../props2';
import {Raccoon, TollBooth, SourceCard, Person} from '../props3';
import {Globe, Pizza} from '../props4';
import {Stand, Factory} from '../props7';
import {SlicePie} from '../props8';
import {Couch} from '../props19';
import {Laptop} from '../props26';
import {Parcel, SearchPage} from '../props27';
import {Tap, Bucket} from '../props28';
import {Cookie} from '../props37';
import {Notif} from '../props38';
import {Confetti} from '../props42';
import {Toggle} from '../props49';
import {CatLamp, SalesPhone, DamageMeter, Napkin, ClickGrid, AdCard, ShovelShop, BudgetButton, BoatLamps, RefundStack} from '../props56';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Brother: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;

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

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

export const Ep56: React.FC = () => {
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

  // ============ DAMAGE METER (running total of Dave's loss) ============
  const dmgSteps: [number, number][] = [
    [w('c1a', 'nine'), 39],
    [w('c4f', 'eight'), 856],
    [w('c6c', 'fifteen'), 946],
    [w('c6e', 'refunded'), 1546],
  ];
  dmgSteps.forEach(([at]) => q(at, 'cash', 0.55));
  const dmgVal = () => {
    let v = 0;
    let prev = 0;
    for (const [at, val] of dmgSteps) {
      if (f >= at) {
        v = lerp(prev, val, ease(f, at, at + 20));
        prev = val;
      }
    }
    return v;
  };
  const SAVE = w('c9d', 'never');
  q(SAVE, 'chime', 0.7);
  const METER_ON = w('o4', 'minus');
  const METER_OFF = A('r4');

  // ============ COLD OPEN ============
  const BZ = w('o1', 'buzzes');
  const TH = w('o1', 'three');
  const BK = w('o1', 'bank');
  q(0, 'pop', 0.5);
  q(BZ, 'buzz', 0.5);
  q(TH, 'cash', 0.7);
  q(TH + 4, 'ding', 0.5);
  q(BK, 'sputter', 0.6);
  const o1Scene = (ff: number) => {
    const sk = shake(ff, BK, 12, 16);
    return (
      <AbsoluteFill>
        <Cam f={ff} keys={[[0, 1.15, 960, 560], [40, 1.0, 960, 540]]}>
          <Interior />
          <Svg>
            <Dave f={ff} x={960} y={930} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.3}, {at: BK, pose: 'shock', expr: 'shock', look: 0.5}]} sweat={ff >= BK} />
            <G2 x={500} y={500} s={bump(TH, 0.12)} r={-4 + Math.sin(ff / 2) * (ff < TH ? 2 : 0)}>
              <SalesPhone value={ff >= TH ? '$3,000' : '$0'} head="MY STORE" sub="first month!" />
            </G2>
            <Confetti x={500} y={300} t={ff >= TH ? Math.min(1, (ff - TH) / 40) : 0} s={1.6} />
            <G2 x={1420 + sk.x} y={500 + sk.y} s={pop(ff, BK - 4) * bump(BK, 0.16)} r={5}>
              <SalesPhone value="-$????" head="MY BANK" headColor={C.navy} label="BALANCE" color={C.red} />
            </G2>
            <G2 x={960} y={110} s={pop(ff, 0)}><Text size={52}>{ff >= BK ? '...and his bank account?' : 'Dave just made his first sales!'}</Text></G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  scene(0, () => o1Scene(f));
  const FR = A('o2');
  const RW = w('o2', 'rewind');
  q(FR, 'sting', 0.7);
  q(RW, 'whoosh', 0.6);
  q(RW + 4, 'flip', 0.6);
  scene(FR, () => (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}</AbsoluteFill>
      <AbsoluteFill style={{background: '#fff', opacity: 1 - ease(f, FR, FR + 8)}} />
      <Svg>
        <G2 x={960} y={360} s={P(FR) * bump(w('o2', 'yep'), 0.15)} r={-4}>
          <rect x={-300} y={-60} width={600} height={120} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
          <Text size={70}>THAT'S DAVE</Text>
        </G2>
        <path d="M 960 430 Q 970 560 980 640" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
        <path d="M 950 610 L 980 650 L 1004 606" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        <G2 x={960} y={780} o={lt(w('o2', 'rich'), 0.3)}><Text size={46} color="#fff" stroke={C.ink} sw={10}>rich on paper. broke in real life.</Text></G2>
      </Svg>
    </AbsoluteFill>
  ));
  scene(RW, () => (
    <AbsoluteFill>
      {o1Scene(Math.max(0, FR - (f - RW) * 4))}
      <Svg>
        <Stamp x={960} y={540} s={1.2 * P(RW) * bump(RW + 4, 0.2)} text="1 MONTH EARLIER" color={C.navy} size={70} r={-6} />
        <G2 x={160} y={110} o={0.8}><Text size={64} color={C.red}>{'<<'}</Text></G2>
      </Svg>
    </AbsoluteFill>
  ), false);
  {
    const vd = w('o3', 'video');
    const ez = w('o3', 'easy');
    const ch = w('o3', 'couch');
    q(A('o3'), 'pop', 0.5);
    q(vd, 'click', 0.6);
    q(ez, 'ding', 0.5);
    q(ch, 'boing', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Couch x={620} y={860} s={1.2} color="#E07A5F" />
          <Dave f={f} x={620} y={860} s={1.05} keys={[{at: 0, pose: 'relax', expr: 'happy', look: 0.6}, {at: ch, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
          <G2 x={1340} y={640} s={1.5 * P(A('o3')) * bump(vd, 0.08)}>
            <Laptop screen="#2B2D42" />
            <Text y={-170} size={30} color={C.yellow}>{f >= ez ? 'EASY STORE!' : 'NEW VIDEO'}</Text>
            <Text y={-120} size={26} color="#fff">{f >= ch ? 'run it from your couch' : 'no warehouse'}</Text>
            <rect x={-40} y={-90} width={80} height={56} rx={12} fill={C.red} />
            <path d="M -12 -78 L 18 -62 L -12 -46 Z" fill="#fff" />
          </G2>
          <G2 x={960} y={110} s={P(A('o3'))}><Text size={50}>a video made it look so easy...</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const a = A('o4');
    const mn = w('o4', 'minus');
    const fo = w('o4', 'forty');
    const ds = we('o4', 'dollars');
    q(mn, 'tick', 0.5);
    q(ds, 'stamp', 0.9);
    const sk = shake(f, ds, 18, 16);
    const val = Math.round(lerp(0, 1546, ease(f, mn, fo)));
    scene(a, () => (
      <AbsoluteFill>
        <Cam f={f} keys={[[ds, 1.0, 960, 540], [ds + 8, 1.12, 960, 520]]}>
          <Board />
          <Svg>
            <G2 x={960} y={150} s={P(a)}><Text size={52}>Dave's REAL result after one month:</Text></G2>
            <Box x={960 + sk.x} y={520 + sk.y} w={1100} h={330} s={P(a) * bump(ds, 0.12)} fill={f >= ds ? '#FFE3EA' : '#fff'}>
              <Text y={0} size={170} color={C.red}>{`-$${val.toLocaleString('en-US')}`}</Text>
            </Box>
            <G2 x={420} y={880} s={0.55 * P(a)}><SalesPhone value="$3,000" head="MY STORE" sub="sales" /></G2>
            <G2 x={1500} y={880} o={lt(ds, 0.3)}><Text size={44} color={GRAY}>(a made-up example, real math)</Text></G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    ));
  }
  {
    const a = A('o5');
    const wh = w('o5', 'where');
    const sb = w('o5', 'somebody');
    const nd = w('o5', 'dave', 0);
    q(wh, 'pop', 0.5);
    q(sb, 'thud', 0.6);
    q(nd, 'buzz', 0.5);
    const slide = ease(f, sb, sb + 14, 400, 0);
    scene(a, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={140} s={P(a) * bump(wh)}><Text size={54}>where did the $3,000 go?</Text></G2>
          <G2 x={760} y={560} s={P(a)}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <G2 key={i} x={-300 + i * 120} y={Math.sin((f - a) / 6 + i) * 14 - ((f - a) % 60) * (i % 2 ? 1.2 : 0.8)}><Coin s={1.1} /></G2>
            ))}
            <Text y={200} size={46} color={C.red}>{f >= sb ? 'somebody got paid...' : '$3,000 in sales'}</Text>
          </G2>
          <Dave f={f} x={380} y={940} s={0.9} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.6}, {at: nd, pose: 'facepalm', expr: 'sad'}]} />
          <G2 x={1580 + slide} y={720} s={1.5}>
            <g style={{filter: 'brightness(0)'}}><Raccoon f={f} mood="greedy" holdCoin /></g>
            <circle cx={0} cy={-150} r={70} fill={C.ink} />
            <Text y={-150} size={100} color={C.yellow}>?</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const a = A('o6');
    const wo = w('o6', 'who');
    const nm = w('o6', 'number');
    const fs = w('o6', 'first');
    q(wo, 'pop', 0.5);
    q(nm, 'scribble', 0.6);
    q(fs, 'ding', 0.6);
    scene(a, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(a)}><Text size={52}>stay to the end for...</Text></G2>
          <Box x={480} y={540} w={620} h={420} s={P(a) * bump(wo, 0.1)} fill={f >= wo ? C.yellow : '#fff'}>
            <Text y={-90} size={52}>WHO got paid</Text>
            <Text y={60} size={180} color={C.ink}>?</Text>
          </Box>
          <Napkin x={1360} y={560} s={1.1 * P(a) * bump(nm, 0.1)} lines={['the ONE number:', '$ ? ? . ? ?']} hl={f >= nm ? 1 : -1} />
          <G2 x={1360} y={870} o={lt(fs, 0.35)}><Text size={42} color={C.red}>he should have checked it FIRST</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: a store from the couch ============
  {
    const sh = w('c1a', 'shopify');
    const nn = w('c1a', 'nine');
    q(sh, 'click', 0.6);
    q(nn, 'stamp', 0.6);
    const cu = w('c1b', 'customer');
    const fw = w('c1b', 'forwards');
    const sp = w('c1b', 'supplier', 1);
    const ml = w('c1b', 'mails');
    q(cu, 'pop', 0.5);
    q(fw, 'mail', 0.5);
    q(sp, 'pop2', 0.5);
    q(ml, 'whoosh_s', 0.5);
    scene(A('c1a'), () =>
      f < A('c1b') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={520} y={920} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
            <G2 x={1200} y={640} s={1.6 * P(A('c1a')) * bump(sh, 0.06)}>
              <Laptop screen="#F7FAFD" />
              <rect x={-180} y={-222} width={360} height={50} fill={C.green} />
              <Text y={-196} size={26} color="#fff">DAVE'S STORE</Text>
              <CatLamp s={0.42} y={-30} glow={0.5} />
            </G2>
            <G2 x={1620} y={330} s={P(A('c1a')) * bump(nn, 0.18)} o={lt(nn, 0.3)}><Stamp text="$39 / MONTH" color={C.navy} size={52} r={-6} /></G2>
            <G2 x={960} y={110} s={P(A('c1a'))}><Text size={50}>step 1: open an online store</Text></G2>
            <SourceTag f={f} at={nn} text="Shopify Basic plan, monthly billing (shopify.com/pricing, Oct 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1b'))}><Text size={50}>dropshipping: Dave never touches the lamp</Text></G2>
            <G2 x={300} y={560} s={1.6 * bump(cu, 0.12)} o={lt(cu, 0.45)}><Person c={C.blue} /><Text y={110} size={30}>CUSTOMER</Text></G2>
            <G2 x={860} y={600} s={1.1 * bump(fw, 0.08)}><Laptop screen="#F7FAFD" /><Text y={-110} size={34} color={C.green}>DAVE'S SITE</Text></G2>
            <G2 x={1560} y={640} s={0.9 * bump(sp, 0.1)} o={lt(sp, 0.45)}><Factory label="SUPPLIER" /></G2>
            <path d="M 400 480 L 640 480" stroke={C.ink} strokeWidth={8} strokeLinecap="round" opacity={lt(cu, 0.2)} />
            <path d="M 1080 480 L 1290 480" stroke={C.ink} strokeWidth={8} strokeLinecap="round" opacity={lt(fw, 0.2)} />
            <path d={`M 1500 760 Q 900 1000 330 700`} fill="none" stroke={C.green} strokeWidth={8} strokeDasharray="20 16" opacity={lt(ml, 0.15)} />
            <G2 x={lerp(1420, 420, ease(f, ml, ml + 40))} y={lerp(780, 760, ease(f, ml, ml + 40))} s={0.5} o={lt(ml, 0.4)}><Parcel /></G2>
            <G2 x={960} y={960} o={lt(ml, 0.35)}><Text size={40} color={GRAY}>the box goes straight from supplier to customer</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const wt = w('c1c', 'waiter');
    const kt = w('c1c', 'kitchen');
    const hp = w('c1c', 'hopes');
    q(wt, 'pop', 0.5);
    q(kt, 'boing', 0.5);
    q(hp, 'cricket', 0.5);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={560} y={920} s={1.15} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}, {at: hp, pose: 'shrug', expr: 'worried', look: 0.6}]} handItem={<ellipse cx={0} cy={-20} rx={70} ry={16} fill="#fff" stroke={C.ink} strokeWidth={5} />} />
          <G2 x={1360} y={820} s={P(A('c1c')) * bump(kt, 0.08)}>
            <rect x={-200} y={-520} width={400} height={520} rx={14} fill={C.wood} stroke={C.ink} strokeWidth={6} />
            <rect x={-150} y={-470} width={300} height={120} rx={10} fill="#F4E1B5" stroke={C.ink} strokeWidth={5} />
            <Text y={-410} size={44}>KITCHEN</Text>
            <circle cx={140} cy={-250} r={14} fill={C.gold} stroke={C.ink} strokeWidth={4} />
            <Text y={-200} size={120} color="#fff" stroke={C.ink} sw={8}>???</Text>
          </G2>
          <G2 x={960} y={110} s={P(A('c1c')) * bump(wt)}><Text size={50}>Dave = a waiter who never saw the kitchen</Text></G2>
          <G2 x={560} y={420} o={lt(hp, 0.3)}><Bubble text="your food is... coming?" size={34} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lp = w('c1d', 'lamp');
    const tw = w('c1d', 'twelve');
    const tr = w('c1d', 'thirty');
    q(lp, 'pop', 0.6);
    q(tw, 'ding', 0.5);
    q(tr, 'cash', 0.6);
    const ei = w('c1e', 'eighteen');
    const nap = w('c1e', 'napkin');
    const hd = w('c1e', 'hundred');
    q(ei, 'cash', 0.6);
    q(nap, 'scribble', 0.6);
    q(hd, 'ding', 0.5);
    const ms = w('c1f', 'missing');
    q(ms, 'buzz', 0.5);
    scene(A('c1d'), () =>
      f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1d'))}><Text size={50}>the product: a glowing cat lamp</Text></G2>
            <CatLamp x={960} y={760} s={1.5 * P(A('c1d')) * bump(lp, 0.1)} f={f} />
            <Box x={390} y={560} w={440} h={220} s={P(A('c1d')) * bump(tw, 0.12)} o={lt(tw, 0.45)}>
              <Text y={-50} size={32} color={GRAY}>supplier charges</Text>
              <Text y={30} size={76} color={C.red}>$12</Text>
            </Box>
            <Box x={1530} y={560} w={440} h={220} s={P(A('c1d')) * bump(tr, 0.12)} o={lt(tr, 0.45)} fill={f >= tr ? '#DDF5E6' : '#fff'}>
              <Text y={-50} size={32} color={GRAY}>Dave sells it for</Text>
              <Text y={30} size={76} color={C.green}>$30</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'money', look: 0.6}, {at: A('c1f'), pose: 'think', expr: 'suspicious', look: 0.6}]} />
            <Napkin x={1180} y={540} s={1.25 * P(A('c1e')) * bump(nap, 0.08)} w={720} lines={f < A('c1f') ? ['$30 - $12 = $18 a lamp', 'x 100 lamps', '= $1,800 a month!'] : ['$30 - $12 = $18 a lamp', '- ???', '- ???', '- ???']} shown={f < A('c1f') ? (f >= hd ? 3 : f >= nap ? 1 : 1) : 4} hl={f >= ms ? 1 : f >= hd ? 2 : -1} />
            <G2 x={960} y={110} s={P(A('c1e')) * bump(ei)}><Text size={50}>{f >= ms ? '...but the napkin is missing lines' : "Dave's napkin math"}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2: the first bite ============
  {
    const fs = w('c2a', 'first');
    const sc = w('c2a', 'screenshot');
    const mo = w('c2a', 'mom');
    q(fs, 'ding', 0.6);
    q(sc, 'click', 0.7);
    q(mo, 'heart', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={600} y={920} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.6}]} />
          <G2 x={1300} y={520} s={0.95 * P(A('c2a')) * bump(fs, 0.1)}><SalesPhone value="$30" head="MY STORE" label="NEW ORDER!" sub="1 glowing cat lamp" /></G2>
          <Confetti x={1300} y={300} t={f >= fs ? Math.min(1, (f - fs) / 40) : 0} s={1.5} />
          <AbsoluteFill />
          <rect x={0} y={0} width={1920} height={1080} fill="#fff" opacity={f >= sc && f < sc + 6 ? 0.6 : 0} />
          <G2 x={960} y={110} s={P(A('c2a'))}><Text size={52}>FIRST SALE!</Text></G2>
          <G2 x={600} y={420} o={lt(mo, 0.3)}><Bubble text="MOM, LOOK!!" size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fee = w('c2b', 'fee');
    const pc = w('c2b', 'percent');
    const tw = w('c2b', 'twenty');
    q(fee, 'pop', 0.5);
    q(pc, 'ding', 0.5);
    q(tw, 'coin', 0.7);
    const rc = w('c2c', 'raccoon');
    const ms = w('c2c', 'misses');
    q(rc, 'pop2', 0.5);
    q(ms, 'coin', 0.6);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c2b'))}><Text size={50}>{f >= A('c2c') ? 'every sale drives through the toll booth' : 'the payment fee comes off first'}</Text></G2>
          <TollBooth x={1180} y={860} s={1.1 * P(A('c2b')) * bump(fee, 0.06)} label="CARD FEE" barUp={f >= tw ? 1 : 0} />
          <Raccoon f={f} x={1180} y={560} s={0.9 * P(A('c2b')) * bump(rc, 0.12)} mood="greedy" holdCoin={f >= ms} grab={f >= ms ? 1 : 0} />
          <Box x={420} y={470} w={560} h={300} s={P(A('c2b')) * bump(pc, 0.1)}>
            <Text y={-90} size={34} color={GRAY}>on a $30 sale:</Text>
            <Text y={-10} size={54}>2.9% + 30¢</Text>
            <Text y={80} size={64} color={C.red}>{f >= tw ? '≈ -$1.20' : '= ?'}</Text>
          </Box>
          <G2 x={420} y={760} o={lt(rc, 0.3)}><Text size={36} color={C.navy}>remember the raccoon? (episode 2)</Text></G2>
          <SourceTag f={f} at={pc} text="Shopify Payments online card rate, Basic plan: 2.9% + 30¢ (shopify.com/pricing)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sp = w('c2d', 'supplier');
    const sx = w('c2d', 'sixteen');
    q(sp, 'pop', 0.5);
    q(sx, 'cash', 0.6);
    const nb = w('c2e', 'nobody');
    const eb = w('c2e', 'billion');
    const mo = w('c2e', 'mom');
    q(nb, 'cricket', 0.5);
    q(eb, 'pop', 0.5);
    q(mo, 'boing', 0.5);
    const at = w('c2f', 'attention');
    q(at, 'cash', 0.6);
    scene(A('c2d'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c2d'))}><Text size={50}>one $30 lamp, sliced up</Text></G2>
            {[
              {x: 420, w: 140, c: C.red, l: 'FEE', v: '$1.17', on: A('c2d')},
              {x: 760, w: 520, c: C.navy, l: 'SUPPLIER', v: '$12', on: sp},
              {x: 1360, w: 660, c: C.green, l: 'DAVE (before ads)', v: '$16.83', on: sx},
            ].map((b, i) => (
              <G2 key={i} x={b.x} y={560} s={P(A('c2d')) * bump(b.on, 0.08)}>
                <rect x={-b.w / 2} y={-90} width={b.w} height={180} rx={18} fill={f >= b.on ? b.c : '#E8E1D2'} stroke={C.ink} strokeWidth={6} />
                <Text y={0} size={i === 0 ? 40 : 64} color="#fff" stroke={C.ink} sw={5}>{f >= b.on ? b.v : '?'}</Text>
                <Text y={150} size={36}>{b.l}</Text>
              </G2>
            ))}
            <CatLamp x={960} y={980} s={0.4} glow={0.6} f={f} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2e'))}><Text size={50}>{f >= A('c2f') ? 'so Dave paid for attention...' : 'one problem: nobody knew the store existed'}</Text></G2>
            <G2 x={480} y={540} s={1.5 * P(A('c2e')) * bump(eb, 0.08)}><Globe f={f} /></G2>
            <G2 x={480} y={860} o={lt(eb, 0.4)}><Text size={42}>8,000,000,000 people</Text></G2>
            <Box x={1360} y={520} w={620} h={360} s={P(A('c2e')) * bump(mo, 0.1)}>
              <Text y={-110} size={34} color={GRAY}>visitors today</Text>
              <Text y={0} size={140} color={C.red}>1</Text>
              <Text y={110} size={40} color={C.navy}>{f >= mo ? '(his mom)' : ''}</Text>
            </Box>
            <G2 x={1360} y={900} o={lt(at, 0.3)}><Text size={44} color={C.red}>attention = the most expensive item</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: paying for strangers ============
  {
    const vd = w('c3a', 'video');
    const st = w('c3a', 'strangers');
    q(vd, 'click', 0.6);
    q(st, 'pop', 0.5);
    const fc = w('c3b', 'fifty');
    const cl = w('c3b', 'clicked', 1);
    q(fc, 'coin', 0.6);
    q(cl, 'click', 0.6);
    const vs = w('c3c', 'visitor');
    const ck = w('c3c', 'cookie');
    const jr = w('c3c', 'jar');
    q(vs, 'pop', 0.5);
    q(ck, 'pop2', 0.5);
    q(jr, 'trombone', 0.4);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}, {at: cl, pose: 'celebrate', expr: 'grin'}]} />
            <AdCard x={1040} y={560} s={1.05 * P(A('c3a')) * bump(vd, 0.06)} cost={f >= fc ? '$0.50' : '$?'} clicks={f >= cl ? `${Math.min(500, Math.max(0, Math.round((f - cl) * 3)))} clicks...` : 'shown to strangers'} hl={f >= cl ? 1 : 0} />
            <G2 x={1600} y={420} s={P(A('c3a')) * bump(st, 0.1)}>
              {[0, 1, 2, 3, 4, 5].map((i) => <Person key={i} x={(i % 3) * 100 - 100} y={Math.floor(i / 3) * 150} c={i < Math.min(6, Math.max(0, Math.floor((f - cl) / 8))) ? C.blue : '#9AA5B1'} />)}
            </G2>
            <G2 x={1600} y={760} o={lt(cl, 0.4)}><Text size={38} color={C.green}>visitors! finally!</Text></G2>
            <G2 x={960} y={110} s={P(A('c3a'))}><Text size={50}>Dave pays to show his lamp to strangers</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3c')) * bump(vs)}><Text size={50}>a visitor is NOT a buyer</Text></G2>
            <G2 x={620} y={560} s={P(A('c3c')) * bump(ck, 0.08)}>
              <rect x={-330} y={-40} width={660} height={60} rx={20} fill="#C0C7CF" stroke={C.ink} strokeWidth={6} />
              {[0, 1, 2, 3, 4].map((i) => <Cookie key={i} x={-260 + i * 130} y={-90} s={0.8} o={f >= ck + i * 6 ? 0.25 : 1} />)}
              <Text y={110} size={40}>FREE SAMPLES</Text>
            </G2>
            <G2 x={1420} y={560} s={P(A('c3c')) * bump(jr, 0.1)}>
              <rect x={-150} y={-180} width={300} height={320} rx={50} fill="#E3F1F4" stroke={C.ink} strokeWidth={6} />
              <rect x={-110} y={-220} width={220} height={50} rx={14} fill={C.wood} stroke={C.ink} strokeWidth={6} />
              <Cookie y={10} s={1} />
              <Text y={220} size={40}>{f >= jr ? 'sold: almost 0' : 'COOKIE JAR $30'}</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const gs = w('c3d', 'guess');
    const hu = w('c3d', 'hundred');
    const cm = w('c3d', 'comments');
    const mn = w('c3d', 'minute');
    q(gs, 'ding', 0.6);
    q(hu, 'pop', 0.5);
    q(cm, 'scribble', 0.5);
    for (let k = gs + 15; k < bs('c3e') - 4; k += 15) q(k, 'tick', 0.35);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c3d')) * bump(gs)}><Text size={58} color={C.red}>QUICK GUESS!</Text></G2>
          <ClickGrid x={700} y={540} s={P(A('c3d')) * bump(hu, 0.06)} n={100} lit={100} buy={0} cols={20} gap={46} />
          <G2 x={700} y={820} o={lt(hu, 0.4)}><Text size={40}>100 people clicked the ad</Text></G2>
          <Box x={1560} y={440} w={420} h={360} s={P(A('c3d')) * bump(cm, 0.08)} fill={C.yellow}>
            <Text y={-110} size={34}>how many bought?</Text>
            <Text y={30} size={170}>?</Text>
          </Box>
          <G2 x={1560} y={800} s={0.9 * P(A('c3d'))}><Clock f={f} /></G2>
          <G2 x={1560} y={960} o={lt(mn, 0.3)}><Text size={34} color={GRAY}>answer in a minute...</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mt = w('c3e', 'meta');
    const tw = w('c3e', 'twelve');
    q(mt, 'paper', 0.5);
    q(tw, 'stamp', 0.6);
    const al = w('c3f', 'alone');
    const th = w('c3f', 'thousands');
    const ex = w('c3f', 'exact');
    q(al, 'pop', 0.5);
    q(th, 'crowd', 0.5);
    q(ex, 'buzz', 0.5);
    const bl = w('c3g', 'bill');
    const sn = w('c3g', 'sense');
    q(bl, 'mail', 0.6);
    q(sn, 'thud', 0.6);
    scene(A('c3e'), () =>
      f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={360} y={930} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'worried', look: 0.6}]} />
            <SourceCard x={1120} y={540} s={1.05 * P(A('c3e')) * bump(mt, 0.06)} org="META" sub="Q2 2026 RESULTS" title={['average price per ad,', 'vs. one year earlier']} stat={f >= tw ? '+12%' : '?'} statLabel="ads keep getting pricier" color={C.blue} />
            <SourceTag f={f} at={mt} text="Meta, Second Quarter 2026 Results (July 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3f')) * bump(al)}><Text size={50}>Dave was not alone</Text></G2>
            {Array.from({length: 12}).map((_, i) => (
              <G2 key={i} x={260 + (i % 6) * 280} y={440 + Math.floor(i / 6) * 330} s={0.42 * P(A('c3f') + i * 2) * bump(th + i, 0.1)}>
                <rect x={-260} y={-380} width={520} height={460} rx={20} fill="#fff" stroke={C.ink} strokeWidth={8} />
                <CatLamp y={20} s={0.9} glow={f >= ex ? 1 : 0.3} />
                <Text y={-330} size={52}>{`STORE #${i + 1}`}</Text>
              </G2>
            ))}
            <G2 x={960} y={1000} o={lt(ex, 0.3)}><Text size={44} color={C.red}>same eyeballs. same lamp.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={560} y={920} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.6}, {at: sn, pose: 'shock', expr: 'shock', look: 0.6}]} sweat={f >= sn} />
            <Box x={1300} y={540} w={620} h={460} s={P(A('c3g')) * bump(bl, 0.1)}>
              <rect x={-310} y={-230} width={620} height={90} rx={24} fill={C.blue} stroke={C.ink} strokeWidth={6} />
              <Text y={-185} size={44} color="#fff">AD BILL</Text>
              <Text y={-60} size={36} color={GRAY}>month total:</Text>
              <Text y={60} size={110} color={C.red}>$?,???</Text>
            </Box>
            <G2 x={960} y={110} s={P(A('c3g'))}><Text size={50}>end of the month...</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4: the ad bill arrives ============
  {
    const tw = w('c4a', 'two');
    q(tw, 'stamp', 0.9);
    const sk = shake(f, tw, 14, 14);
    const fc = w('c4b', 'clicks', 1);
    const tf = w('c4b', 'twenty');
    q(fc, 'click', 0.6);
    q(tf, 'cash', 0.7);
    scene(A('c4a'), () =>
      f < A('c4b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a'))}><Text size={52}>the answer to the guess:</Text></G2>
            <ClickGrid x={700} y={560} s={P(A('c4a'))} n={100} lit={100} buy={f >= tw ? 2 : 0} cols={20} gap={46} />
            <Box x={1560 + sk.x} y={540 + sk.y} w={420} h={360} s={P(A('c4a')) * bump(tw, 0.2)} fill={f >= tw ? C.green : C.yellow}>
              <Text y={-110} size={34} color={f >= tw ? '#fff' : C.ink}>bought a lamp</Text>
              <Text y={30} size={170} color={f >= tw ? '#fff' : C.ink}>{f >= tw ? '2' : '?'}</Text>
            </Box>
            <G2 x={700} y={860} o={lt(tw, 0.3)}><Text size={40} color={C.red}>98 just looked, then left</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4b'))}><Text size={50}>what ONE lamp sale really costs in ads</Text></G2>
            <Box x={380} y={520} w={480} h={260} s={P(A('c4b')) * bump(fc, 0.1)}>
              <Text y={-50} size={80}>50</Text>
              <Text y={50} size={36} color={GRAY}>clicks</Text>
            </Box>
            <Text x={700} y={520} size={90}>×</Text>
            <Box x={1000} y={520} w={420} h={260} s={P(A('c4b'))}>
              <Text y={-50} size={80}>$0.50</Text>
              <Text y={50} size={36} color={GRAY}>per click</Text>
            </Box>
            <Text x={1290} y={520} size={90}>=</Text>
            <Box x={1600} y={520} w={440} h={300} s={P(A('c4b')) * bump(tf, 0.18)} fill={f >= tf ? C.red : '#fff'}>
              <Text y={-10} size={110} color={f >= tf ? '#fff' : C.ink}>{f >= tf ? '$25' : '$?'}</Text>
              <Text y={90} size={30} color={f >= tf ? '#fff' : GRAY}>of ads</Text>
            </Box>
            <CatLamp x={960} y={1000} s={0.42} price="$30" glow={0.6} f={f} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const ta = w('c4c', 'take');
    const lo = w('c4c', 'loses');
    q(ta, 'scribble', 0.6);
    q(lo, 'buzz', 0.6);
    const ls = w('c4d', 'lemonade');
    const pa = w('c4d', 'pays');
    const em = w('c4d', 'empty');
    q(ls, 'pop', 0.5);
    q(pa, 'coin', 0.6);
    q(em, 'cricket', 0.5);
    scene(A('c4c'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}, {at: lo, pose: 'facepalm', expr: 'sad'}]} />
            <Napkin x={1160} y={520} s={1.3 * P(A('c4c'))} w={700} lines={['left per lamp: $16.83', '- $25.00 of ads', f >= lo ? '= -$8 per sale' : '= ?']} shown={f >= ta ? 3 : 1} hl={f >= lo ? 2 : -1} />
            <G2 x={1160} y={940} o={lt(lo, 0.3)}><Text size={44} color={C.red}>every sale LOSES money</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Stand x={760} y={860} s={1.1 * P(A('c4d')) * bump(ls, 0.06)} label="DAVE'S LEMONADE" />
            <Dave f={f} x={760} y={900} s={0.95} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}, {at: em, pose: 'shrug', expr: 'sad', look: 0.6}]} />
            {[0, 1, 2, 3].map((i) => <Person key={i} x={1180 + i * 150} y={860} s={1.4} c={i % 2 ? C.blue : C.green} />)}
            {[0, 1, 2, 3].map((i) => <Coin key={i} x={lerp(900, 1180 + i * 150, ease(f, pa + i * 6, pa + i * 6 + 18))} y={700 - Math.sin(Math.PI * ease(f, pa + i * 6, pa + i * 6 + 18)) * 120} s={0.8} o={lt(pa, 0)} />)}
            <G2 x={420} y={560} s={P(A('c4d')) * bump(em, 0.12)}>
              <rect x={-140} y={-80} width={280} height={160} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-30} size={32}>CASH BOX</Text>
              <Text y={30} size={48} color={C.red}>{f >= em ? 'EMPTY' : '$...'}</Text>
            </G2>
            <G2 x={960} y={110} s={P(A('c4d'))}><Text size={50}>a stand that PAYS customers to walk over</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const hd = w('c4e', 'hundred');
    const tt = w('c4e', 'three');
    const ad = w('c4e', 'ads');
    q(hd, 'pop', 0.5);
    q(tt, 'cash', 0.6);
    q(ad, 'buzz', 0.6);
    const dn = w('c4f', 'down');
    const ei = w('c4f', 'eight');
    q(dn, 'thud', 0.6);
    const bq = w('c4g', 'bigger');
    const wh = w('c4g', 'who');
    q(bq, 'pop', 0.5);
    q(wh, 'sting', 0.6);
    scene(A('c4e'), () =>
      f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110} s={P(A('c4e'))}><Text size={48}>Dave's whole month (100 lamps)</Text></G2>
            <Bar x={300} y={860} s={P(A('c4e')) * bump(tt, 0.08)} h={f >= tt ? 470 : 40} color={C.green} label="SALES" value={f >= tt ? '$3,000' : '?'} />
            <Bar x={620} y={860} s={P(A('c4e')) * bump(ad, 0.08)} h={f >= ad ? 392 : 40} color={C.red} label="ADS" value={f >= ad ? '$2,500' : '?'} />
            <Bar x={940} y={860} s={P(A('c4e')) * bump(A('c4f'), 0.08)} h={f >= A('c4f') ? 188 : 40} color={C.navy} label="LAMPS" value={f >= A('c4f') ? '$1,200' : '?'} />
            <Bar x={1260} y={860} s={P(A('c4e')) * bump(A('c4f') + 10, 0.08)} h={f >= A('c4f') + 10 ? 60 : 40} color={C.blue} label="FEES+PLAN" value={f >= A('c4f') + 10 ? '$156' : '?'} />
            <Box x={1580} y={560} w={420} h={240} s={P(A('c4e')) * bump(ei, 0.14)} fill={f >= ei ? '#FFE3EA' : '#fff'}>
              <Text y={-60} size={32} color={GRAY}>result</Text>
              <Text y={30} size={80} color={C.red}>{f >= ei ? '-$856' : '?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={520} y={930} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
            <Box x={1280} y={520} w={760} h={380} s={P(A('c4g')) * bump(wh, 0.1)} fill={f >= wh ? C.yellow : '#fff'}>
              <Text y={-120} size={40}>Dave lost money...</Text>
              <Text y={-30} size={56}>so WHO made money</Text>
              <Text y={50} size={56}>from his store?</Text>
              <Text y={140} size={60} color={C.red}>?</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5: who got Dave's money (villain reveal) ============
  {
    const pie = w('c5a', 'pie');
    q(pie, 'pop', 0.6);
    const big = w('c5b', 'biggest');
    const fn = w('c5b', 'fifty');
    q(big, 'ding', 0.6);
    q(fn, 'cash', 0.8);
    const sh = w('c5c', 'shopify');
    const tp = w('c5c', 'two');
    q(sh, 'ding', 0.6);
    q(tp, 'cash', 0.7);
    const sp = w('c5d', 'supplier');
    const fa = w('c5d', 'factory');
    q(sp, 'ding', 0.5);
    q(fa, 'stamp', 0.5);
    const slices = [
      {v: 2500, c: C.red, l: 'ADS', on: big},
      {v: 1200, c: C.navy, l: 'SUPPLIER', on: sp},
      {v: 156, c: C.blue, l: '', on: sh},
    ];
    const tot = slices.reduce((a, b) => a + b.v, 0);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100} s={P(A('c5a'))}><Text size={48}>following every slice of Dave's money</Text></G2>
          <SlicePie x={520} y={570} s={P(A('c5a')) * bump(pie, 0.06)} rad={300} t={Math.max(0.15, ease(f, pie, pie + 25))} pop={f >= sp ? 1 : f >= sh ? 2 : f >= big ? 0 : -1} slices={slices.map((x) => ({v: x.v / tot, c: f >= x.on ? x.c : '#D8D0BF', l: f >= x.on ? x.l : ''}))} />
          <G2 x={520} y={960} o={lt(sh, 0.3)}><Text size={34} color={C.blue}>small blue slice: Shopify plan + fees ($156)</Text></G2>
          {f < A('c5c') ? (
            <SourceCard x={1400} y={560} s={0.95 * P(A('c5b')) * bump(fn, 0.08)} o={lt(A('c5b'), 0.3)} org="META" sub="AD REVENUE · Q2 2026" title={['from ads, in 3 months:']} stat={f >= fn ? '$59.4B' : '$??B'} statLabel="Dave's ad slice: $2,500" color={C.red} />
          ) : f < A('c5d') ? (
            <SourceCard x={1400} y={560} s={0.95 * P(A('c5c')) * bump(tp, 0.08)} org="SHOPIFY" sub="MERCHANT SOLUTIONS · Q2 2026" title={['payments side, in 3 months:']} stat={f >= tp ? '$2.78B' : '$?.??B'} statLabel="plan + a fee on every sale" color={C.green} />
          ) : (
            <G2 x={1400} y={620} s={0.9 * P(A('c5d')) * bump(fa, 0.08)}>
              <Factory label="SUPPLIER" />
              <G2 y={-560}><Stamp text="PAID UP FRONT" color={C.green} size={56} r={-5} /></G2>
            </G2>
          )}
          <SourceTag f={f} at={fn} until={A('c5c')} text="Meta Q2 2026 results: ad revenue $59.36B" />
          <SourceTag f={f} at={tp} until={A('c5d')} text="Shopify Q2 2026 results (SEC 8-K): merchant solutions $2.78B" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ws = w('c5e', 'whether');
    const rk = w('c5e', 'risk');
    q(ws, 'ding', 0.5);
    q(rk, 'thud', 0.6);
    const gd = w('c5f', 'gold');
    const sv = w('c5f', 'shovels');
    const cu = w('c5f', 'customer');
    q(gd, 'pop', 0.5);
    q(sv, 'clank', 0.6);
    q(cu, 'trombone', 0.5);
    scene(A('c5e'), () =>
      f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5e'))}><Text size={50}>everyone got paid. win OR lose.</Text></G2>
            {['ADS', 'SHOPIFY', 'SUPPLIER'].map((l, i) => (
              <Box key={l} x={380 + i * 420} y={420} w={360} h={200} s={P(A('c5e') + i * 4) * bump(ws + i * 4, 0.1)} fill="#DDF5E6">
                <Text y={-40} size={44}>{l}</Text>
                <Text y={40} size={50} color={C.green}>PAID ✓</Text>
              </Box>
            ))}
            <Dave f={f} x={960} y={950} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0}, {at: rk, pose: 'panic', expr: 'scream'}]} sweat={f >= rk} />
            <G2 x={1500} y={760} s={bump(rk, 0.15)} o={lt(rk, 0.3)}><Stamp text="ALL THE RISK: DAVE" color={C.red} size={48} r={-4} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c5f')) * bump(gd)}><Text size={50}>in a gold rush... sell shovels</Text></G2>
            <ShovelShop x={1300} y={900} s={1.2 * P(A('c5f')) * bump(sv, 0.06)} sign="SHOVELS $$$" />
            <Raccoon f={f} x={1500} y={880} s={1.0} mood="greedy" holdCoin />
            <Dave f={f} x={480} y={930} s={1.15} keys={[{at: 0, pose: 'carry', expr: 'happy', look: 0.6}, {at: cu, pose: 'shrug', expr: 'tired', look: 0.6}]} />
            <G2 x={480} y={380} o={lt(cu, 0.3)}><Bubble text="I was the customer?!" size={36} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const cr = w('c5g', 'crime');
    const bt = w('c5g', 'boat');
    q(cr, 'pop', 0.5);
    q(bt, 'whoosh', 0.5);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c5g')) * bump(cr)}><Text size={48}>not a crime. just the business.</Text></G2>
          <BoatLamps x={1000} y={600} s={1.3 * P(A('c5g')) * bump(bt, 0.06)} f={f} label="DAVE'S LAMPS" />
          <G2 x={960} y={900} o={lt(bt, 0.3)}><Text size={46} color={C.red}>...but the lamps were still on a boat</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: the lamps come back ============
  {
    const wh = w('c6a', 'where');
    const sv = w('c6a', 'seven');
    const lg = w('c6a', 'longer');
    q(wh, 'mail', 0.6);
    q(sv, 'pop', 0.5);
    q(lg, 'tick', 0.5);
    const ftc = w('c6b', 'ftc');
    const td = w('c6b', 'thirty');
    const ce = w('c6b', 'cent');
    q(ftc, 'paper', 0.6);
    q(td, 'stamp', 0.6);
    q(ce, 'cash', 0.5);
    scene(A('c6a'), () =>
      f < A('c6b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6a'))}><Text size={50}>Dave's inbox...</Text></G2>
            {[0, 1, 2, 3].map((i) => (
              <Notif key={i} x={560} y={300 + i * 150} s={P(A('c6a')) * (f >= wh + i * 8 ? bump(wh + i * 8, 0.08) : 0.85)} w={760} title="Where is my lamp??" body={`order #${1040 + i * 7} · still not here`} hl={i === 3 ? 1 : 0} />
            ))}
            <BoatLamps x={1450} y={600} s={0.7 * P(A('c6a'))} f={f} label={f >= lg ? 'DAY 31...' : 'DAY 12'} />
            <G2 x={1450} y={880} o={lt(sv, 0.3)}><Text size={38} color={GRAY}>supplier page: "7-20 days"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={680} y={560} s={P(A('c6b')) * bump(ftc, 0.06)} org="U.S. FTC" sub="MAIL, INTERNET OR PHONE ORDER RULE" title={['no shipping time promised?', 'seller must ship within']} stat={f >= td ? '30 DAYS' : '?? DAYS'} statLabel="or the buyer can get a refund" color={C.navy} />
            <Calendar x={1500} y={480} s={1.2 * P(A('c6b')) * bump(td, 0.12)} year="30" flip={f >= td ? 1 : 0} top="DAYS" />
            <G2 x={1500} y={800} o={lt(ce, 0.3)}><Text size={44} color={C.red}>can't ship? every cent back</Text></G2>
            <SourceTag f={f} at={ftc} text="FTC, Business Guide to the Mail, Internet, or Telephone Order Merchandise Rule" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const cb = w('c6c', 'chargeback');
    const tw = w('c6c', 'two');
    const ff = w('c6c', 'fifteen');
    q(cb, 'stamp', 0.7);
    q(tw, 'pop', 0.5);
    const re = w('c6d', 'returns');
    const fv = w('c6d', 'five');
    const nr = w('c6d', 'national');
    q(re, 'pop', 0.5);
    q(fv, 'stamp', 0.6);
    q(nr, 'paper', 0.5);
    scene(A('c6c'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6c'))}><Text size={50}>some customers skipped the email...</Text></G2>
            <CreditCard x={480} y={520} s={1.4 * P(A('c6c'))} label="CUSTOMER" />
            <G2 x={480} y={520} s={bump(cb, 0.2)} o={lt(cb, 0)}><Stamp text="CHARGEBACK" color={C.red} size={60} r={-10} /></G2>
            {[0, 1].map((i) => (
              <Box key={i} x={1380} y={380 + i * 280} w={640} h={220} s={P(A('c6c')) * bump(tw + i * 6, 0.1)} o={lt(tw, 0.4)} fill={f >= ff ? '#FFE3EA' : '#fff'}>
                <Text y={-50} size={34} color={GRAY}>{`chargeback #${i + 1}`}</Text>
                <Text y={30} size={56} color={C.red}>{f >= ff ? '-$30 - $15 fee' : '-$30'}</Text>
              </Box>
            ))}
            <SourceTag f={f} at={ff} text="Shopify Help Center: US chargeback fee $15" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={640} y={560} s={P(A('c6d')) * bump(nr, 0.06)} org="NATIONAL RETAIL FEDERATION" sub="2025 RETAIL RETURNS LANDSCAPE" title={['online sales expected', 'to be returned:']} stat={f >= fv ? '19.3%' : '??%'} statLabel="about 1 in 5" color={C.navy} />
            <G2 x={1450} y={560} s={P(A('c6d')) * bump(fv, 0.1)}>
              {[0, 1, 2, 3, 4].map((i) => <Parcel key={i} x={(i - 2) * 150} y={0} s={0.5} color={i === 4 && f >= fv ? C.red : '#E8B878'} />)}
              <Text y={160} size={44} color={C.red}>{f >= fv ? '1 of every 5 comes back' : 'online orders'}</Text>
            </G2>
            <SourceTag f={f} at={nr} text="NRF & Happy Returns, 2025 Retail Returns Landscape (Oct 2025)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const tr = w('c6e', 'twenty');
    const ov = w('c6e', 'overseas');
    const rf = w('c6e', 'refunded');
    const kp = w('c6e', 'kept');
    q(tr, 'mail', 0.6);
    q(ov, 'boing', 0.5);
    q(kp, 'trombone', 0.5);
    const sh = w('c6f', 'shopify');
    const dg = w('c6f', 'delivery');
    q(sh, 'coin', 0.6);
    q(dg, 'pop2', 0.5);
    const fd = w('c6g', 'damage');
    const ot = w('c6g', 'one');
    q(fd, 'sting', 0.6);
    q(ot, 'stamp', 0.9);
    const sk = shake(f, ot, 16, 16);
    scene(A('c6e'), () =>
      f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6e'))}><Text size={50}>{f >= tr ? '20 refund requests' : 'then came the returns...'}</Text></G2>
            <RefundStack x={560} y={760} s={1.1 * P(A('c6e'))} n={f < tr ? 3 : Math.max(3, Math.min(8, Math.floor((f - tr) / 6) + 1))} />
            <Dave f={f} x={1500} y={930} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.6}, {at: rf, pose: 'facepalm', expr: 'sad'}]} />
            <G2 x={1360} y={420} o={lt(ov, 0.3)}><Text size={38} color={GRAY}>mail it back overseas? costs more than the lamp</Text></G2>
            <G2 x={1360} y={510} o={lt(kp, 0.3)}><Text size={42} color={C.red}>20 × $30 = $600 gone (they kept the lamps)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6f'))}><Text size={50}>refund the sale... the card fee stays gone</Text></G2>
            <Pizza x={560} y={580} s={1.1 * P(A('c6f'))} eaten={0} />
            <G2 x={560} y={580} s={bump(sh, 0.2)} o={lt(sh, 0)}><Stamp text="RETURNED" color={C.navy} size={56} r={-8} /></G2>
            <Dave f={f} x={1180} y={930} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'tired', look: 0.6}]} />
            <G2 x={1540} y={560} s={P(A('c6f')) * bump(dg, 0.12)}>
              <Person s={2} c={C.red} />
              <G2 x={0} y={-220}><Bubble text="still $1.17 please" size={32} tail="down" /></G2>
            </G2>
            <SourceTag f={f} at={sh} text="Shopify Help Center: card processing fees aren't returned on refunds" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c6g')) * bump(fd)}><Text size={52}>Dave's final damage for the month</Text></G2>
            <Box x={960 + sk.x} y={500 + sk.y} w={1000} h={300} s={P(A('c6g')) * bump(ot, 0.14)} fill={f >= ot ? '#FFE3EA' : '#fff'}>
              <Text y={0} size={150} color={C.red}>{f >= ot ? '-$1,546' : '-$?,???'}</Text>
            </Box>
            <G2 x={960} y={820} s={0.5 * P(A('c6g'))}><SalesPhone value="$3,000" head="MY STORE" sub="in sales" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: Dave doubles down (myth-bust + low point) ============
  {
    const th = w('c7a', 'thousand');
    const su = w('c7a', 'scale');
    q(th, 'pop', 0.6);
    q(su, 'boing', 0.5);
    const tht = w('c7b', 'thought');
    const np = w('c7b', 'nope');
    q(tht, 'dream', 0.6);
    q(np, 'buzz', 0.8);
    scene(A('c7a'), () =>
      f < A('c7b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7a'))}><Text size={52}>Dave's new plan</Text></G2>
            <Dave f={f} x={420} y={930} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}, {at: su, pose: 'point_up', expr: 'grin'}]} />
            <Bar x={1000} y={860} s={P(A('c7a'))} h={80} color={C.gray} label="100 SALES" value="100" />
            <Bar x={1450} y={860} s={P(A('c7a')) * bump(th, 0.1)} h={f >= th ? 560 : 60} color={C.yellow} label="1,000 SALES" value={f >= th ? '1,000!' : '?'} />
            <G2 x={1220} y={220} s={bump(su, 0.2)} o={lt(su, 0.3)}><Stamp text="SCALE UP!" color={C.green} size={60} r={-6} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <DreamBg />
          <DreamFrame label="WHAT DAVE THOUGHT" />
          <Svg>
            <G2 x={960} y={300} s={P(A('c7b'))}><Text size={70}>more sales will fix it</Text></G2>
            <Dave f={f} x={500} y={900} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}, {at: np, pose: 'shock', expr: 'shock'}]} />
            <Stamp x={1200} y={620} s={1.4 * P(A('c7b')) * bump(np, 0.2)} text={f >= np ? 'NOPE' : '?'} color={C.red} size={110} r={-8} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const ei = w('c7c', 'eight', 1);
    const bk = w('c7c', 'bucket');
    q(ei, 'stamp', 0.6);
    q(bk, 'sputter', 0.5);
    const lw = w('c7d', 'lowest');
    const cc = w('c7d', 'card');
    const ib = w('c7d', 'increase');
    q(lw, 'sting', 0.6);
    q(cc, 'pop', 0.4);
    q(ib, 'click', 0.4);
    const nk = w('c7e', 'napkin');
    const sv = w('c7e', 'saved');
    q(nk, 'flutter', 0.6);
    q(sv, 'ding', 0.6);
    scene(A('c7c'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={190} w={1200} h={170} s={P(A('c7c')) * bump(ei, 0.1)} fill={f >= ei ? '#FFE3EA' : '#fff'}>
              <Text y={0} size={60} color={C.red}>{f >= ei ? '-$8 × 1,000 = -$8,000' : '-$8 × 1,000 = ?'}</Text>
            </Box>
            <Tap x={1000} y={430} s={1.2 * P(A('c7c'))} f={f} drip={3} />
            <Bucket x={1040} y={820} s={1.1 * P(A('c7c')) * bump(bk, 0.06)} level={0.3 + 0.1 * Math.sin(f / 10)} label="PROFIT?" />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${940 + i * 90} 950 Q ${930 + i * 90} ${990 + ((f + i * 10) % 30)} ${940 + i * 90} 1030`} stroke={C.blue} strokeWidth={10} strokeLinecap="round" fill="none" />)}
            <Dave f={f} x={420} y={930} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.6}]} />
            <G2 x={1620} y={620} o={lt(bk, 0.3)}><Text size={40} color={C.red}>more water in, more leaks out</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <AbsoluteFill style={{background: 'rgba(30,20,40,0.28)'}} />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7d')) * bump(lw)}><Text size={52} color="#fff" stroke={C.ink} sw={10}>{f >= A('c7e') ? 'wait... the napkin!' : "Dave's lowest moment"}</Text></G2>
            <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.6}, {at: nk, pose: 'point_r', expr: 'think', look: 0.6}]} sweat={f < nk} />
            <BudgetButton x={1250} y={480} s={1.1 * P(A('c7d')) * bump(ib, 0.08)} press={f >= ib && f < nk ? 0.5 + 0.5 * Math.sin(f / 4) : 0} />
            <G2 x={1250 + Math.sin(f / 7) * 12} y={640} s={1.2} o={f < nk ? 1 : 0.2}>
              <path d="M -30 80 L -30 -10 Q -30 -40 0 -40 Q 30 -40 30 -10 L 30 80 Z" fill="#FCE3C8" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            </G2>
            <CreditCard x={480} y={520} s={0.6 * P(A('c7d')) * bump(cc, 0.1)} label="DAVE" />
            <Napkin x={1250} y={800} s={0.8 * pop(f, nk) * bump(sv, 0.12)} w={560} lines={['$30 - $12 - fee', '= ???']} hl={f >= sv ? 1 : -1} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8: Dave fights back (education, not advice) ============
  {
    const off = w('c8a', 'turned');
    q(off, 'click', 0.7);
    const hs = [bs('c8b'), bs('c8d'), bs('c8e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const nn = w('c8b', 'nine');
    q(nn, 'stamp', 0.6);
    const tp = w('c8c', 'taps');
    q(tp, 'click', 0.5);
    const ft = w('c8d', 'fifty');
    const sr = w('c8d', 'stop', 1);
    q(ft, 'coin', 0.6);
    q(sr, 'stamp', 0.6);
    const bka = w('c8e', 'bank');
    const sl = w('c8e', 'slice');
    q(bka, 'ding', 0.5);
    q(sl, 'pop', 0.5);
    const items = ['Search your own product first', 'Test tiny, with a stop rule ($50, not $500)', 'Read the bank account, not the sales screen'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={48}>Dave fights back</Text></G2>
          <G2 x={650} y={160}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={300 + i * 190} s={0.85 * P(A('c8a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && (
            <G2 x={1560} y={560} s={P(A('c8a'))}>
              <Toggle s={1.4} on={f >= off ? 0 : 1} label="DAVE'S ADS" />
              <G2 y={-260}><Stamp text={f >= off ? 'ADS OFF' : 'ADS ON'} color={f >= off ? C.green : C.red} size={52} r={-5} /></G2>
            </G2>
          )}
          {cur === 1 && (
            <G2 x={1560} y={560} s={0.62 * bump(nn, 0.06)}>
              <SearchPage query="glowing cat lamp" rows={[{t: 'Glowing cat lamp', p: f >= nn ? '$9' : '$?'}, {t: 'Cat night light', p: '$11'}, {t: "DAVE'S STORE lamp", p: '$30'}]} hl={f >= nn ? 0 : -1} />
              <G2 y={430} o={lt(tp, 0.3)}><Text size={56} color={C.red}>same lamp, two taps away</Text></G2>
            </G2>
          )}
          {cur === 2 && (
            <G2 x={1560} y={560}>
              <Box x={0} y={-60} w={460} h={300} s={bump(ft, 0.1)}>
                <Text y={-80} size={34} color={GRAY}>test budget</Text>
                <Text y={10} size={110} color={C.green}>$50</Text>
                <Text y={100} size={34} color={GRAY}>not $500</Text>
              </Box>
              <G2 y={220} s={bump(sr, 0.18)} o={lt(sr, 0.2)}><Stamp text="NO PROFIT? STOP." color={C.red} size={48} r={-4} /></G2>
            </G2>
          )}
          {cur >= 3 && (
            <G2 x={1560} y={560}>
              <Pizza s={1.0 * bump(sl, 0.08)} eaten={0} />
              <G2 x={140} y={-120} s={bump(sl, 0.2)} o={lt(sl, 0.2)}>
                <path d="M 0 0 L 110 -40 A 120 120 0 0 1 120 50 Z" fill={C.yellow} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
              </G2>
              <Text y={260} size={40}>{f >= sl ? 'profit = YOUR slice' : 'sales = the whole pizza'}</Text>
            </G2>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9: the napkin number (big payoff) ============
  {
    const sx = w('c9a', 'sixteen');
    q(sx, 'stamp', 0.9);
    const tm = w('c9b', 'minus');
    const fe = w('c9b', 'fee');
    const be = w('c9b', 'break');
    q(tm, 'scribble', 0.5);
    q(fe, 'scribble', 0.5);
    q(be, 'ding', 0.6);
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c9a'))}><Text size={50}>the number Dave should have checked FIRST</Text></G2>
          <Napkin x={760} y={560} s={1.35 * P(A('c9a'))} w={720} lines={['price: $30.00', '- lamp: $12.00', '- fee: $1.17', f >= sx ? '= $16.83' : '= ?']} hl={f >= sx ? 3 : f >= fe ? 2 : f >= tm ? 1 : -1} />
          <Box x={1530} y={520} w={560} h={360} s={P(A('c9a')) * bump(be, 0.1)} fill={f >= be ? C.yellow : '#fff'}>
            <Text y={-110} size={36}>Dave's AD CEILING</Text>
            <Text y={0} size={100} color={C.green}>{f >= sx ? '$16.80' : '$??'}</Text>
            <Text y={100} size={30} color={GRAY}>max to win 1 customer</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tf = w('c9c', 'twenty');
    const sec = w('c9c', 'seconds');
    const ot = w('c9c', 'one', 1);
    q(tf, 'buzz', 0.6);
    q(sec, 'tick', 0.6);
    q(ot, 'stamp', 0.8);
    const cl = w('c9d', 'closed');
    q(cl, 'thud', 0.6);
    scene(A('c9c'), () =>
      f < A('c9d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c9c'))}><Text size={50}>ceiling vs. what Dave actually paid</Text></G2>
            <Bar x={560} y={860} s={P(A('c9c'))} h={300} color={C.green} label="AD CEILING" value="$16.80" />
            <Bar x={960} y={860} s={P(A('c9c')) * bump(tf, 0.1)} h={f >= tf ? 450 : 60} color={C.red} label="DAVE PAID" value={f >= tf ? '$25' : '?'} />
            <Box x={1520} y={520} w={600} h={380} s={P(A('c9c')) * bump(ot, 0.1)}>
              <Text y={-120} size={40}>1 line of math</Text>
              <Text y={-50} size={40} color={f >= sec ? C.ink : GRAY}>30 seconds</Text>
              <Text y={60} size={44} color={GRAY}>would have saved</Text>
              <Text y={140} size={70} color={C.red}>{f >= ot ? '$1,546' : '$?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={520} y={920} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: cl, pose: 'thumbs', expr: 'happy', look: 0.6}]} />
            <G2 x={1200} y={680} s={1.4 * P(A('c9d'))}>
              <Laptop screen={f >= cl ? '#2B2D42' : '#F7FAFD'} />
              <Text y={-120} size={36} color={f >= cl ? '#fff' : C.green}>{f >= cl ? 'STORE CLOSED' : "DAVE'S STORE"}</Text>
            </G2>
            <BudgetButton x={1200} y={300} s={0.7 * P(A('c9d'))} label="NOT PRESSED" />
            <G2 x={960} y={110} s={P(A('c9d'))}><Text size={50}>month two's loss? never happened</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const re = w('c9e', 'real');
    const ow = w('c9e', 'product');
    const sk = w('c9e', 'skill');
    const tt = w('c9e', 'ten');
    q(re, 'pop', 0.5);
    q(ow, 'ding', 0.5);
    q(sk, 'ding', 0.5);
    q(tt, 'buzz', 0.5);
    scene(A('c9e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c9e')) * bump(re)}><Text size={50}>real online businesses: hard to copy</Text></G2>
          <Box x={400} y={500} w={480} h={300} s={P(A('c9e')) * bump(ow, 0.1)} o={lt(ow, 0.45)} fill="#DDF5E6">
            <Text y={-40} size={44}>their OWN</Text>
            <Text y={30} size={56} color={C.green}>product</Text>
          </Box>
          <Box x={960} y={500} w={480} h={300} s={P(A('c9e')) * bump(sk, 0.1)} o={lt(sk, 0.45)} fill="#DDF5E6">
            <Text y={-40} size={44}>their OWN</Text>
            <Text y={30} size={56} color={C.green}>skill</Text>
          </Box>
          <G2 x={1520} y={560} s={P(A('c9e')) * bump(tt, 0.1)} o={lt(tt, 0.45)}>
            <CatLamp s={0.8} glow={0.4} f={f} />
            <G2 y={-120}><Stamp text="× 10,000 STORES" color={C.red} size={44} r={-6} /></G2>
          </G2>
          <Dave f={f} x={960} y={950} s={0.85} keys={[{at: 0, pose: 'point_up', expr: 'happy'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ WHAT DAVE LEARNED ============
  const recap = ['Sales are not profit. Count every cost.', 'Know your ad ceiling before you buy a click.', 'In a gold rush, shovel sellers get paid first.'];
  {
    const r = [bs('r1'), bs('r2'), bs('r3')];
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('r1'))}><Text size={80}>WHAT DAVE LEARNED</Text></G2>
          {recap.map((b, i) => <Row key={i} x={200} y={340 + i * 180} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1520} />)}
          <Napkin x={1660} y={960} s={0.35} w={520} lines={['$16.83']} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const br = w('r4', 'brother');
    const fr = w('r4', 'friday');
    const ys = w('r4', 'yes');
    const pb = w('r4', 'problem');
    q(br, 'pop', 0.6);
    q(fr, 'flip', 0.5);
    q(ys, 'ding', 0.5);
    q(pb, 'sting', 0.6);
    const sb = w('r5', 'subscribe');
    const rf = w('r5', 'refund');
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(rf, 'boing', 0.5);
    scene(A('r4'), () =>
      f < A('r5') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P(A('r4'))}><Text size={50}>next time: Dave's next money problem</Text></G2>
            <Brother f={f} x={1240} y={920} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'grin', look: -0.6}]} />
            <Dave f={f} x={600} y={920} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: ys, pose: 'thumbs', expr: 'happy', look: 0.6}, {at: pb, pose: 'shock', expr: 'worried', look: 0.6}]} />
            <G2 x={1240} y={420} s={P(br)}><Bubble text="can I borrow some money?" size={34} tail="down" /></G2>
            <Calendar x={1660} y={520} s={0.9 * P(A('r4')) * bump(fr, 0.12)} year="FRI" flip={f >= fr ? 1 : 0} top="JUST UNTIL" />
            <G2 x={600} y={420} o={lt(ys, 0)}><Bubble text="sure!" size={40} tail="down" /></G2>
            <G2 x={960} y={300} s={bump(pb, 0.2)} o={lt(pb, 0)}><Stamp text="THAT'S THE PROBLEM" color={C.red} size={48} r={-4} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={420} s={1.4 * pop(f, A('r5'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1420} y={420} s={1.1 * pop(f, A('r5') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={880} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <CatLamp x={760} y={900} s={0.6} f={f} />
            <G2 x={1350} y={800} o={lt(rf, 0.4)}><Text size={40} color={C.green}>free · ships instantly · no refunds needed</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5c', 'quarter') + 12;
  subCues(SUB).forEach((c) => cues.push(c));

  const inChapter = (t.chapters ?? []).some((c) => {
    const s = Math.round(c.start * 30);
    return f >= s - 4 && f < s + CHAPTER_FRAMES + 4;
  });
  const inSub = f >= SUB - 4 && f <= SUB + SUB_FRAMES + 4;
  const showMeter = f >= METER_ON && f < METER_OFF && !inChapter && !inSub;
  const lastStep = dmgSteps.filter(([at]) => f >= at).pop();
  const flash = lastStep && f - lastStep[0] < 24 ? 1 : 0;
  const saved = f >= SAVE;

  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {showMeter && (
        <Svg>
          <DamageMeter x={1700} y={90} s={0.9 * pop(f, METER_ON) * (flash ? bump(lastStep![0], 0.12) : saved ? bump(SAVE, 0.15) : 1)} value={saved ? money(1546) : money(dmgVal())} saved={saved} flash={flash} />
        </Svg>
      )}
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <SubReminder f={f} at={SUB} Dave={<Stick f={f} x={0} y={200} s={1} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}]} acc={['hair']} seed={7} />} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
