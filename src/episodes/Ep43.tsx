import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, Card, Clock, SourceTag, Stamp, Text} from '../props';
import {Frame, Row, SubButton, Bell, Icon} from '../props2';
import {SplitBar} from '../props3';
import {LineChart} from '../props4';
import {Scale, Paycheck, Receipt} from '../props8';
import {Crib, DiaperStack, FormulaCan, Belly, DaycareSign, RentHouse, GearTag, PiggyJar} from '../props43';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Partner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={52} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

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

const DreamBgLite: React.FC = () => (
  <Svg>
    <rect x={-400} y={-300} width={2720} height={1680} fill="#F7EEDC" />
  </Svg>
);

export const Ep43: React.FC = () => {
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
    const crib = w('o1', 'crib');
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={640} y={920} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'neutral', look: 0.8}]} />
          <G2 x={640} y={700}><Partner f={f} x={0} y={0} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} /></G2>
          <Box x={1300} y={520} w={560} h={620} s={P(0) * bump(crib, 0.1)} fill="#F7F1E4">
            <Crib s={1.15} y={0} />
            <G2 y={260}><Text size={34} color={GRAY}>NURSERY CRIB</Text></G2>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fo = w('o2', 'four');
    const nn = w('o2', 'nine');
    const bx = w('o2', 'box');
    q(fo, 'coin', 0.6);
    q(bx, 'thud', 0.6);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={640} y={920} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={640} y={700}>
            <Partner f={f} x={0} y={0} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} />
            <G2 x={60} y={90}><Belly s={0.7} /></G2>
          </G2>
          <Box x={1300} y={520} w={560} h={620} s={P(A('o2'))} fill="#F7F1E4">
            <Crib s={1.15} y={-40} price={f >= fo ? '$499' : '?'} />
            <G2 y={260}><Text size={34} color={GRAY}>{f >= bx ? 'a box a baby sleeps in' : 'NURSERY CRIB'}</Text></G2>
          </Box>
          <G2 x={1650} y={280} s={pop(f, nn)}><Stamp text="$499" size={54} color={C.red} r={-6} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sq = w('o3', 'squeezes');
    const bb = w('o3', 'baby');
    const th = w('o4', 'thrilled');
    const mh = w('o4', 'math', 0);
    const th2 = w('o4', 'terrifying');
    q(sq, 'pop', 0.5);
    q(bb, 'ding', 0.6);
    q(th, 'chime', 0.5);
    q(mh, 'scribble', 0.5);
    q(th2, 'buzz', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={880}>
            <Partner f={f} x={0} y={0} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}]} />
            <G2 x={70} y={100}><Belly s={0.75} /></G2>
          </G2>
          <Dave f={f} x={1200} y={880} s={1.1} keys={[{at: 0, pose: 'idle', expr: f >= th ? 'happy' : 'neutral', look: -0.8}, {at: mh, pose: 'think', expr: 'worried', look: -0.8}, {at: th2, pose: 'shock', expr: 'shock', look: -0.8}]} sweat={f >= th2} />
          <G2 x={1200} y={480} s={P(A('o3')) * bump(bb, 0.14)} o={lt(bb, 0.4)}><Bubble text={'we\'re having\na baby!'} size={44} tail="down" /></G2>
          <G2 x={1560} y={620} s={P(A('o3')) * bump(mh, 0.12)} o={f >= mh ? 1 : 0.3}>
            <rect x={-150} y={-110} width={300} height={220} rx={18} fill="#fff" stroke={C.ink} strokeWidth={5} />
            <Text y={-50} size={30} color={GRAY}>DAVE'S MATH</Text>
            <Text y={20} size={64} color={f >= th2 ? C.red : GRAY}>{f >= th2 ? '$$$' : '?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sc = w('o5', 'scary');
    const th = w('o5', 'three');
    const tt = w('o5', 'thousand');
    const cr = w('o6', 'today');
    const dc = w('o6', 'goes');
    const pr = w('o6', 'profits');
    const bl = w('o6', 'bill');
    q(sc, 'buzz', 0.4);
    q(th, 'coin', 0.5);
    q(tt, 'cash', 0.8);
    q(cr, 'pop', 0.5);
    q(dc, 'pop2', 0.5);
    q(pr, 'pop2', 0.5);
    q(bl, 'chime', 0.6);
    const sk = shake(f, tt, 16, 16);
    const labels: [string, number][] = [
      ['CRIB & GEAR', cr],
      ['DAYCARE', dc],
      ['WHO PROFITS', pr],
      ['THE FIX', bl],
    ];
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960 + sk.x} y={420 + sk.y} s={P(A('o5')) * bump(tt, 0.2)}>
            <rect x={-460} y={-100} width={920} height={200} rx={28} fill={f >= tt ? C.red : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={8} size={84} color={f >= tt ? '#fff' : GRAY}>{f >= tt ? '$300,000' : f >= sc ? 'scary number?' : '?'}</Text>
          </G2>
          <G2 y={640}><Text x={960} size={38} color={GRAY}>birth → age eighteen</Text></G2>
          {labels.map(([l, at], i) => (
            <G2 key={l} x={280 + i * 460} y={880} s={P(A('o5')) * bump(at, 0.1)} o={f >= at ? 1 : 0.4}>
              <rect x={-190} y={-70} width={380} height={140} rx={20} fill={f >= at ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={5} />
              <Text y={6} size={34}>{l}</Text>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: the $300,000 number ============
  {
    const wd = w('c1a', 'where');
    const bk = w('c1b', 'brookings');
    const dt = w('c1b', 'data');
    q(wd, 'ding', 0.4);
    q(bk, 'stamp', 0.6);
    q(dt, 'paper', 0.5);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c1a'))}><Text size={54}>where does $300,000 come from?</Text></G2>
          <Dave f={f} x={420} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
          <Box x={1180} y={620} w={900} h={440} s={P(A('c1a')) * bump(bk, 0.08)} fill="#fff">
            <Text y={-160} size={38} color={GRAY}>research group: Brookings</Text>
            <G2 x={-380} y={-70} o={lt(dt, 0.4)}><Text size={30} anchor="start">{f >= dt ? 'food + housing + clothes + child care' : '...'}</Text></G2>
            <Arrow d="M -300 30 L 300 30" t={f >= dt ? 1 : 0.2} />
            <Text y={130} size={40} color={C.blue}>adjusted for today's prices</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const md = w('c1c', 'middle');
    const ei = w('c1c', 'eighteen');
    const sep = w('c1d', 'separate');
    const fd = w('c1d', 'four');
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c1c'))}><Text size={44}>two separate estimates. same neighborhood.</Text></G2>
          <Card x={560} y={520} top="BROOKINGS (USDA-BASED)" big={f >= ei ? '~$300K' : '?'} color={C.blue} s={P(A('c1c')) * bump(ei, 0.1)} w={780} />
          <G2 x={560} y={720} o={lt(md, 0.4)}><Text size={30} color={GRAY}>middle-income, 2-parent family · birth to 18</Text></G2>
          <Card x={1400} y={520} top="LENDINGTREE 2025" big={f >= fd ? '$303,418' : '?'} color={C.green} s={P(A('c1c')) * bump(fd, 0.1)} w={780} />
          <G2 x={1400} y={720} o={lt(sep, 0.4)}><Text size={30} color={GRAY}>independent 2025 study</Text></G2>
          <SourceTag f={f} at={fd} text="Brookings Institution (USDA-based estimate); LendingTree, 'The Cost of Raising a Child' (2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const stp = w('c1e', 'stopped');
    const sev = w('c1e', 'seventeen');
    const est = w('c1e', 'estimates', 0);
    const col = w('c1f', 'college');
    const min = w('c1f', 'minutes');
    q(stp, 'buzz', 0.6);
    q(col, 'pop', 0.5);
    q(min, 'pop2', 0.4);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={640} y={520} w={880} h={460} s={P(A('c1e')) * bump(stp, 0.08)} fill="#FFF3D6">
            <Text y={-150} size={36} color={GRAY}>honesty break</Text>
            <Text y={-60} size={38}>{f >= stp ? 'official gov\'t count stopped' : 'gov\'t used to publish this yearly'}</Text>
            <Stamp y={80} text={f >= sev ? 'AFTER 2017' : '?'} size={44} color={C.red} r={-4} />
            <G2 y={190} o={lt(est, 0.4)}><Text size={30} color={GRAY}>today's figures = smart estimates, not fresh counts</Text></G2>
          </Box>
          <Box x={1500} y={520} w={640} h={460} s={P(A('c1e')) * bump(col, 0.1)} fill="#fff">
            <Icon kind="warning" s={0.7} y={-140} />
            <Text y={20} size={40} color={f >= col ? C.red : GRAY}>{f >= col ? 'college NOT included' : '?'}</Text>
            <G2 y={100} o={lt(min, 0.4)}><Text size={30} color={GRAY}>just birth → age 18</Text></G2>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: the baby markup ============
  {
    const gr = w('c2a', 'gear');
    const st = w('c2b', 'stroller');
    const fh = w('c2b', 'four', 1);
    const wh = w('c2b', 'wheels');
    q(gr, 'pop', 0.5);
    q(fh, 'coin', 0.5);
    q(wh, 'pop2', 0.4);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c2a'))}><Text size={50}>the baby gear markup</Text></G2>
          <GearTag icon="stroller" price={f >= fh ? '$200–$1,000+' : '?'} label="STROLLER" x={520} y={620} s={P(A('c2a')) * bump(st, 0.08)} />
          <Dave f={f} x={1400} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
          <G2 x={1400} y={560} s={P(A('c2a')) * bump(wh, 0.1)} o={lt(wh, 0.4)}><Bubble text="four wheels and\na cup holder" size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('c2c', 'seat');
    const on = w('c2c', 'one', 0);
    const law = w('c2c', 'law');
    const ad = w('c2d', 'add');
    const two = w('c2d', 'two');
    const fiv = w('c2d', 'five');
    q(cs, 'pop', 0.5);
    q(law, 'stamp', 0.6);
    q(two, 'coin', 0.5);
    q(fiv, 'cash', 0.7);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GearTag icon="car" price={f >= on ? '$150+' : '?'} label="CAR SEAT" x={520} y={600} s={P(A('c2c')) * bump(cs, 0.08)} />
          <Stamp x={520} y={920} s={pop(f, law)} text="REQUIRED BY LAW" size={36} color={C.red} r={-3} />
          <Box x={1420} y={600} w={720} h={480} s={P(A('c2c')) * bump(ad, 0.08)} fill="#fff">
            <Text y={-160} size={34} color={GRAY}>crib + mattress + monitor + bag + outfits</Text>
            <Arrow d="M 0 -60 L 0 40" t={f >= two ? 1 : 0.2} />
            <Text y={100} size={54} color={f >= fiv ? C.red : GRAY}>{f >= fiv ? '$2,000–$5,000' : '?'}</Text>
            <Text y={160} size={28} color={GRAY}>before baby even arrives</Text>
          </Box>
          <SourceTag f={f} at={fiv} text="Consumer finance / parenting-industry surveys, 2025-2026 (illustrative averages)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fs = w('c2e', 'sells');
    const ch = w('c2e', 'cheaped');
    const lux = w('c2e', 'luxury');
    const fx = w('c2f', 'fix');
    const sh = w('c2f', 'secondhand');
    const cons = w('c2f', 'consignment');
    q(fs, 'buzz', 0.5);
    q(ch, 'pop', 0.5);
    q(lux, 'ding', 0.5);
    q(fx, 'chime', 0.6);
    q(sh, 'ding', 0.6);
    scene(A('c2e'), () =>
      f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Banker f={f} x={560} y={900} s={1.15} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}]} />
            <G2 x={560} y={520} s={P(A('c2e')) * bump(fs, 0.1)}><Text size={46} color={f >= fs ? C.red : GRAY}>{f >= fs ? 'fear sells' : 'why so much?'}</Text></G2>
            <Crib x={1350} y={640} s={1.3 * P(A('c2e')) * bump(ch, 0.1)} price={f >= lux ? 'LUXURY' : undefined} />
            <G2 x={1350} y={960} s={P(A('c2e'))} o={lt(ch, 0.4)}><Text size={32} color={GRAY}>"cheaped out on the crib?"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={P(A('c2f')) * bump(fx, 0.1)}><Text size={54} color={C.green}>the fix: secondhand</Text></G2>
            {['CRIBS', 'STROLLERS', 'CLOTHES'].map((l, i) => (
              <G2 key={l} x={370 + i * 610} y={560} s={P(A('c2f')) * bump(sh, 0.08)} o={f >= sh ? 1 : 0.4}>
                <rect x={-230} y={-140} width={460} height={280} rx={22} fill={f >= cons ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={0} size={44}>{l}</Text>
              </G2>
            ))}
            <Dave f={f} x={960} y={960} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: diapers and formula ============
  {
    const rep = w('c3a', 'repeats');
    const dy = w('c3a', 'day');
    q(rep, 'tick', 0.5);
    q(dy, 'tick', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={140} s={P(A('c3a'))}><Text size={50}>the bill that repeats. every. single. day.</Text></G2>
          <Clock x={620} y={560} s={1.1 * P(A('c3a')) * bump(rep, 0.1)} f={f} />
          <DiaperStack x={1300} y={640} s={1.15 * P(A('c3a')) * bump(dy, 0.1)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rgh = w('c3b', 'roughly');
    const eig = w('c3b', 'eight');
    const fmt = w('c3c', 'formula');
    const twf = w('c3c', 'twenty');
    q(rgh, 'ding', 0.4);
    q(eig, 'cash', 0.6);
    q(fmt, 'pop', 0.5);
    q(twf, 'cash', 0.6);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DiaperStack x={520} y={600} s={1.1 * P(A('c3b')) * bump(rgh, 0.08)} label="2,500 diapers / yr" />
          <Box x={520} y={960} w={520} h={110} s={P(A('c3b')) * bump(eig, 0.15)} fill={f >= eig ? '#FFE3EA' : '#fff'}><Text size={44} color={f >= eig ? C.red : GRAY}>{f >= eig ? '$850–$1,200/yr' : '?'}</Text></Box>
          <FormulaCan x={1400} y={560} s={1.05 * P(A('c3b')) * bump(fmt, 0.08)} brand />
          <Box x={1400} y={960} w={520} h={110} s={P(A('c3b')) * bump(twf, 0.15)} fill={f >= twf ? '#FFE3EA' : '#fff'}><Text size={44} color={f >= twf ? C.red : GRAY}>{f >= twf ? '$1,200–$2,400/yr' : '?'}</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const twi = w('c3d', 'twist');
    const fda = w('c3d', 'fda');
    const pct = w('c3d', 'percent');
    q(twi, 'boing', 0.5);
    q(fda, 'stamp', 0.6);
    q(pct, 'ding', 0.6);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c3d')) * bump(twi, 0.1)}><Text size={48}>the twist: same rules, less money</Text></G2>
          <SplitBar x={960} y={560} s={P(A('c3d'))} a={0.5} la={f >= fda ? 'NAME BRAND: FDA rules ✓' : 'NAME BRAND'} lb={f >= pct ? 'STORE BRAND: FDA rules ✓' : 'STORE BRAND'} ca="#3A86FF" cb="#2DB77A" w={1400} />
          <FormulaCan x={620} y={880} s={0.85 * P(A('c3d'))} brand />
          <FormulaCan x={1300} y={880} s={0.85 * P(A('c3d')) * bump(pct, 0.1)} brand={false} />
          <G2 x={960} y={200} s={P(A('c3d')) * bump(pct, 0.12)} o={lt(pct, 0.4)}><Text size={44} color={C.green}>{f >= pct ? '20–40% less' : ''}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: daycare vs rent ============
  {
    const brk = w('c4a', 'breaks');
    const dc2 = w('c4b', 'thirteen');
    q(brk, 'buzz', 0.5);
    q(dc2, 'cash', 0.7);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c4a')) * bump(brk, 0.1)}><Text size={50}>the chapter that breaks budgets: daycare</Text></G2>
          <DaycareSign x={960} y={640} s={1.15 * P(A('c4a'))} price={f >= dc2 ? '$13,184 / yr' : '?'} />
          <SourceTag f={f} at={dc2} text="Child Care Aware of America, 'Child Care in America: 2025 Price & Supply'" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st47 = w('c4c', 'forty');
    const rent = w('c4c', 'rent');
    const st39 = w('c4c', 'thirty');
    const mort = w('c4c', 'mortgage');
    q(st47, 'thud', 0.6);
    q(rent, 'ding', 0.5);
    q(st39, 'thud', 0.6);
    q(mort, 'ding', 0.5);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c4c'))}><Text size={44}>daycare (2 kids) beats...</Text></G2>
          <Scale x={620} y={780} s={0.95 * P(A('c4c')) * bump(rent, 0.06)} tilt={f >= rent ? -8 : 0} left="RENT" right="DAYCARE" />
          <G2 x={620} y={280} s={P(A('c4c')) * bump(st47, 0.12)} o={lt(st47, 0.4)}><Text size={40} color={C.red}>{f >= st47 ? '47 states' : ''}</Text></G2>
          <Scale x={1360} y={780} s={0.95 * P(A('c4c')) * bump(mort, 0.06)} tilt={f >= mort ? -8 : 0} left="MORTGAGE" right="DAYCARE" />
          <G2 x={1360} y={280} s={P(A('c4c')) * bump(st39, 0.12)} o={lt(st39, 0.4)}><Text size={40} color={C.red}>{f >= st39 ? '39 states' : ''}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bg2 = w('c4d', 'bigger');
    const rf = w('c4d', 'roof');
    const ad2 = w('c4e', 'adult');
    const shc = w('c4e', 'shortcut');
    q(bg2, 'thud', 0.6);
    q(rf, 'ding', 0.5);
    q(ad2, 'pop', 0.5);
    q(shc, 'buzz', 0.5);
    scene(A('c4d'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <RentHouse x={620} y={640} s={1.1 * P(A('c4d'))} label="THE ROOF" price="$" />
            <DaycareSign x={1360} y={640} s={0.95 * P(A('c4d')) * bump(bg2, 0.08)} price={f >= bg2 ? 'BIGGER BILL' : '$'} />
            <G2 x={960} y={980} s={P(A('c4d'))} o={lt(rf, 0.4)}><Text size={38} color={GRAY}>watching the kids &gt; the roof over their heads</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={1050} h={120}><Text size={44}>why? one adult per few babies. by law.</Text></Box>
            {Array.from({length: 4}).map((_, i) => (
              <G2 key={i} x={520 + i * 300} y={620} s={1.5 * P(A('c4e')) * bump(ad2, 0.08)}>
                <circle cy={-40} r={30} fill="#F4D6B8" stroke={C.ink} strokeWidth={4} />
                <rect x={-34} y={-6} width={68} height={90} rx={16} fill={i === 0 ? C.blue : C.yellow} stroke={C.ink} strokeWidth={4} />
              </G2>
            ))}
            <Box x={960} y={880} w={700} h={110} o={lt(ad2, 0.5)}><Text size={34} color={GRAY}>1 adult : a few babies (safety law)</Text></Box>
            <Stamp x={960} y={960} s={pop(f, shc)} text="NO SHORTCUT" size={40} color={C.red} r={-3} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5: lost wages ============
  {
    const nope = w('c5a', 'nope');
    const inv = w('c5a', 'invisible');
    q(nope, 'buzz', 0.6);
    q(inv, 'ding', 0.5);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <DreamBgLite />
        <Svg>
          <Dave f={f} x={620} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'sad'}]} />
          <G2 x={620} y={480} s={P(A('c5a'))}><Bubble text={'diapers + daycare...\nthat\'s the whole bill?'} size={38} tail="down" /></G2>
          <Stamp x={1300} y={560} s={pop(f, nope)} text="NOPE" size={90} r={-8} />
          <G2 x={1300} y={780} s={P(A('c5a')) * bump(inv, 0.1)} o={lt(inv, 0.4)}><Text size={40} color={C.red}>{f >= inv ? 'the biggest cost is invisible' : ''}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const comp = w('c5b', 'compound');
    const grw = w('c5b', 'grow');
    const rse = w('c5c', 'raise');
    const prm = w('c5c', 'promotion');
    q(comp, 'ding', 0.5);
    q(grw, 'pop', 0.5);
    q(rse, 'thud', 0.5);
    q(prm, 'thud', 0.5);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={130} s={P(A('c5b')) * bump(comp, 0.1)}><Text size={40}>remember ep15? compound interest</Text></G2>
          <LineChart x={620} y={620} s={0.8 * P(A('c5b'))} t={ease(f, A('c5b'), A('c5b') + 60)} pts={[10, 30, 55, 85, 125]} color={C.green} w={620} h={340} />
          <G2 x={620} y={840} o={lt(grw, 0.4)}><Text size={32} color={GRAY}>money invested → grows. a career works the same way.</Text></G2>
          <Partner f={f} x={1440} y={900} s={1.05} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} />
          <Paycheck x={1440} y={600} s={0.85 * P(A('c5b')) * bump(rse, 0.1)} amount="RAISE" cut={f >= prm ? 0.6 : f >= rse ? 0.3 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const six = w('c5d', 'six');
    const dt = w('c5d', 'dollars');
    const rcp = w('c5e', 'receipt');
    const nvr = w('c5e', 'never');
    q(six, 'coin', 0.6);
    q(dt, 'cash', 0.8);
    q(rcp, 'paper', 0.5);
    q(nvr, 'buzz', 0.5);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={480} s={1.1 * P(A('c5d')) * bump(dt, 0.15)}>
            <rect x={-320} y={-100} width={640} height={200} rx={28} fill={f >= dt ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={4} size={70} color={f >= dt ? '#fff' : GRAY}>$600,000+</Text>
          </G2>
          <G2 x={620} y={680}><Text size={32} color={GRAY}>the "motherhood penalty" (lifetime)</Text></G2>
          <SourceTag f={f} at={dt} text="IWPR / Census Bureau data (2024-2025); ABA Law Practice, 'Yes, There Is Still a Motherhood Penalty in 2025'" />
          <Receipt x={1420} y={620} s={1.05 * P(A('c5d')) * bump(rcp, 0.08)} lines={[['diapers', '$1,000'], ['formula', '$1,800'], ['daycare', '$13,184'], ['career, minus', f >= nvr ? '(never shows up)' : '...']]} shown={f >= rcp ? 4 : 3} total="" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: who profits ============
  {
    const cash = w('c6a', 'cashing');
    q(cash, 'ding', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c6a')) * bump(cash, 0.1)}><Text size={54}>who's cashing in on your baby?</Text></G2>
          {['GEAR COMPANIES', 'FORMULA BRANDS', 'DAYCARE CENTER'].map((l, i) => (
            <G2 key={l} x={330 + i * 630} y={560} s={P(A('c6a'))}>
              <Frame w={560} h={560}>
                {i === 0 && <Crib s={0.6} y={-60} />}
                {i === 1 && <FormulaCan s={0.7} y={-40} brand />}
                {i === 2 && <DaycareSign s={0.45} y={-40} />}
                <Text y={220} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
          <Banker f={f} x={960} y={1010} s={0.65 * P(A('c6a'))} keys={[{at: 0, pose: 'present', expr: 'smug'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fair = w('c6c', 'fair');
    const mod = w('c6c', 'modestly');
    const diff = w('c6d', 'different');
    const nic = w('c6d', 'nicer');
    q(fair, 'ding', 0.5);
    q(mod, 'pop', 0.5);
    q(diff, 'boing', 0.5);
    q(nic, 'stamp', 0.6);
    scene(A('c6c'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={140} s={P(A('c6c')) * bump(fair, 0.1)}><Text size={44}>to be fair...</Text></G2>
            <Paycheck x={620} y={620} s={0.85 * P(A('c6c')) * bump(mod, 0.1)} amount="$14/hr" cut={0} />
            <G2 x={620} y={840} o={lt(mod, 0.4)}><Text size={32} color={GRAY}>daycare workers: paid modestly</Text></G2>
            <G2 x={1420} y={620} s={P(A('c6c'))}><Text size={38} color={GRAY}>real cost: careful adult supervision,{'\n'}all day, classroom of toddlers</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6d')) * bump(diff, 0.1)}><Text size={44}>gear companies: a different story</Text></G2>
            <GearTag icon="crib" price="$150" label="SAFE" x={620} y={620} s={P(A('c6d'))} />
            <GearTag icon="crib" price="$500" label="ALSO SAFE" x={1300} y={620} s={P(A('c6d')) * bump(nic, 0.08)} />
            <G2 x={960} y={940} o={lt(nic, 0.4)}><Text size={32} color={GRAY}>same government safety rules. nicer catalog photo.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: practical ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e'), bs('c7f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Buy secondhand (not the car seat)', 'Daycare co-ops / babysitting swaps', 'Check employer dependent-care benefits', 'Open a 529 education plan, even small', 'Store-brand formula & diapers'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={54}>How to lower the bill</Text></G2>
          <G2 x={650} y={160}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={270 + i * 150} s={0.9 * P(A('c7a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <DaycareSign x={1600} y={860} s={0.55} price="?" />}
          {cur === 1 && <Crib x={1600} y={860} s={0.7} />}
          {cur === 2 && (
            <G2 x={1600} y={860} s={1.05}>
              <Icon kind="briefcase" s={1.1} />
              <G2 y={110}><Text size={30}>dependent-care FSA</Text></G2>
            </G2>
          )}
          {cur === 3 && <PiggyJar x={1600} y={860} s={1} label="529" fill={0.55} />}
          {cur >= 4 && <FormulaCan x={1600} y={860} s={0.85} brand={false} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: is it worth it ============
  {
    const scy = w('c8a', 'scary');
    const spr = w('c8b', 'spread');
    const car = w('c8b', 'car');
    const notScared = w('c8c', 'scared');
    q(scy, 'buzz', 0.4);
    q(spr, 'ding', 0.5);
    q(car, 'pop', 0.5);
    q(notScared, 'chime', 0.7);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c8a'))}><Text size={48}>$300,000... is it worth it?</Text></G2>
          <G2 x={620} y={600} s={P(A('c8a')) * bump(spr, 0.1)} o={lt(spr, 0.4)}><Text size={40} color={GRAY}>{f >= spr ? 'spread across 18 years...' : ''}</Text></G2>
          <Box x={1360} y={620} w={620} h={300} s={P(A('c8a')) * bump(car, 0.1)}>
            <Text y={-70} size={30} color={GRAY}>≈ per month</Text>
            <Text y={20} size={64} color={f >= car ? C.blue : GRAY}>{f >= car ? 'used car payment' : '?'}</Text>
          </Box>
          <Dave f={f} x={620} y={940} s={1} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: notScared, pose: 'thumbs', expr: 'happy'}]} />
          <G2 x={880} y={940}>
            <Partner f={f} x={0} y={0} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'happy'}]} />
            <G2 x={0} y={-80} s={0.9}><Belly s={0.7} /></G2>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['~$300,000 to raise a kid to 18 — before college. Daycare can beat rent.', 'Some is gear markup & brand names. Some is real cost (adult supervision).', 'Biggest cost is often invisible: career & lifetime earnings.'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={220} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1480} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rg = w('r5', 'ring');
    const inv2 = w('r5', 'invented');
    const sb = w('r6', 'subscribe');
    const un = w('r6', 'unlike');
    q(rg, 'pop', 0.5);
    q(inv2, 'ding', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(un, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={950} h={130}><Text size={54}>Next: Dave goes ring shopping</Text></Box>
            <Dave f={f} x={620} y={920} s={1.4} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: rg, pose: 'shrug', expr: 'worried'}]} />
            <G2 x={1300} y={620} s={1.1 * P(A('r5')) * bump(inv2, 0.1)} o={lt(inv2, 0.5)}><Bubble text={'"three months\nof salary..."'} size={40} tail="left" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Partner f={f} x={1550} y={880} s={0.9} keys={[{at: 0, pose: 'idle', expr: 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5d', 'dollars') + 20;
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
