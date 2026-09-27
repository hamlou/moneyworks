import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, MoneyStack, SourceTag, Sparkle, Stamp, Text, XMark} from '../props';
import {BigButton, Frame, Phone, Row, SubButton, Bell, CreditCard} from '../props2';
import {Coffee, Person, Plate, PriceTag, Raccoon, TollBooth} from '../props3';
import {Cat, LineChart, Pizza} from '../props4';
import {Contract} from '../props5';
import {Paycheck, Receipt, Scale, SlicePie, Yacht} from '../props8';
import {ChipStack, Brain} from '../props17';
import {BlueCar} from '../props18';
import {Couch, Jar} from '../props19';
import {Tire} from '../props21';
import {SubTile, Tap, Bucket} from '../props28';
import {Bowl, BillCard, Crackers, Leak, MonthStrip, Plug} from '../props31';


type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Friend: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;

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

const money = (v: number) => '$' + Math.round(v).toLocaleString('en-US');

export const Ep31: React.FC = () => {
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
    const fr = w('o1', 'friday');
    const pd = w('o1', 'paid');
    const on = w('o1', 'one');
    const rc = w('o1', 'rich');
    q(fr, 'pop', 0.5);
    q(pd, 'cash', 0.7);
    q(on, 'ding', 0.6);
    q(rc, 'chime', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Calendar x={220} y={220} s={0.7 * pop(f, 2) * bump(fr)} top="FRIDAY" year={29} flip={0} />
          <G2 x={220} y={420} s={pop(f, 3)}><Text size={48} color={C.green}>PAYDAY</Text></G2>
          <Dave f={f} x={760} y={880} s={1.3 * pop(f, 2)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: rc, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          <Phone x={1200} y={500} s={1.35 * pop(f, 4) * bump(on, 0.1)} title="DAVE'S BANK" value={f >= on ? '$1,576' : '$0.00'} color={C.green} />
          <G2 x={1620} y={360} s={0.55 * pop(f, 5) * bump(pd)}><Paycheck amount="PAID!" /></G2>
          <G2 x={1620} y={700} s={pop(f, 6) * bump(rc)}><Bubble text={f >= rc ? 'I am RICH!' : 'payday...'} size={46} tail="left" /></G2>
          {f >= rc && <Sparkle x={1320} y={220} t={((f - rc) % 30) / 30} s={0.9} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mo = w('o2', 'monday');
    const th = w('o2', 'thirty');
    q(mo, 'flip', 0.5);
    q(th, 'thud', 0.8);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Calendar x={220} y={220} s={0.7 * P('o2') * bump(mo)} top="MONDAY" year={1} flip={0} />
          <G2 x={220} y={420} s={P('o2', 1)}><Text size={44} color="#5B6470">3 days later</Text></G2>
          <Dave f={f} x={760} y={880} s={1.3} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.8}, {at: th, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= th} />
          <Phone x={1200} y={500} s={1.35 * P('o2', 2) * bump(th, 0.2)} title="DAVE'S BANK" value={f >= th ? '$38' : '$...'} color={C.red} />
          <G2 x={1620} y={300} s={P('o2', 4)} o={0.5}><Text size={60} color="#9C9383">$1,576</Text><line x1={-130} y1={-10} x2={130} y2={-10} stroke={C.red} strokeWidth={8} opacity={lit(th)} /></G2>
          <G2 x={1620} y={620} s={P('o2', 5) * bump(th)}><Text size={120} color={C.red}>{f >= th ? '$38' : '?'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('o3', 'car');
    const vg = w('o3', 'vegas');
    const nm = w('o3', 'normal');
    q(cr, 'buzz', 0.5);
    q(vg, 'buzz', 0.5);
    q(nm, 'ding', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o3')}><Text size={58}>What did Dave buy?</Text></G2>
          <Frame x={380} y={540} s={P('o3', 2) * bump(cr)} w={480} h={520} label="a new car?">
            <BlueCar s={0.9} y={40} />
            {f >= cr && <XMark s={0.7} y={0} />}
          </Frame>
          <Frame x={960} y={540} s={P('o3', 4) * bump(vg)} w={480} h={520} label="a Vegas trip?">
            <ChipStack s={1} y={80} n={6} />
            {f >= vg && <XMark s={0.7} y={0} />}
          </Frame>
          <Frame x={1540} y={540} s={P('o3', 6) * bump(nm)} w={480} h={520} label="a normal weekend">
            <Couch s={0.6} y={60} />
            {f >= nm && <Check x={140} y={-160} s={1.4} />}
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cn = w('o4', 'cnbc');
    const sx = w('o4', 'sixty');
    const pp = w('o4', 'paycheck');
    q(cn, 'paper', 0.5);
    q(sx, 'stamp', 0.7);
    q(pp, 'crowd', 0.4);
    const red = Math.round(lin(f, sx, sx + 30, 0, 13));
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o4')}><Text size={56}>Americans living paycheck to paycheck</Text></G2>
          {Array.from({length: 20}).map((_, i) => (
            <Person key={i} x={640 + (i % 5) * 150} y={360 + Math.floor(i / 5) * 160} s={0.5 * P('o4', 1 + i * 0.4)} c={i < red ? C.red : '#9AA5B1'} />
          ))}
          <Panel x={1550} y={480} w={440} h={260} title="JULY 2026 SURVEY" value={V(sx, '63%')} color={C.red} size={120} s={P('o4', 3) * bump(sx)} />
          <Dave f={f} x={240} y={880} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: pp, pose: 'shrug', expr: 'sad', look: 0.8}]} />
          <G2 x={240} y={380} s={P('o4', 4)}><Bubble text="not just me?" size={40} tail="down" /></G2>
          <SourceTag f={f} at={cn} text="CNBC|SurveyMonkey, July 2026: 63% live paycheck to paycheck" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('o5', 'worse');
    const gn = w('o5', 'gone');
    const ac = w('o5', 'account');
    q(wr, 'sting', 0.5);
    q(gn, 'poof', 0.7);
    q(ac, 'pop', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o5') * bump(wr)}><Text size={60}>it gets worse...</Text></G2>
          <G2 x={520} y={500} s={0.95 * P('o5', 2)}><Paycheck amount="$2,000" cut={ease(f, gn - 4, gn + 16, 0, 0.21)} /></G2>
          <path d="M 880 500 L 1180 500" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={P('o5', 3)} />
          <path d="M 1190 500 l -34 -26 l 0 52 Z" fill={C.ink} opacity={P('o5', 3)} />
          <Phone x={1450} y={520} s={1.1 * P('o5', 4) * bump(ac, 0.1)} title="DAVE'S BANK" value="$1,576" color={C.green} />
          <G2 x={960} y={820} s={P('o5', 5) * bump(gn)}><Box w={760} h={110} fill={f >= gn ? C.yellow : '#fff'} /><Text size={50} color={C.red}>{f >= gn ? '-$424 before it arrives' : 'where did it go?'}</Text></G2>
          <Dave f={f} x={180} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: gn, pose: 'shock', expr: 'shock', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('o6', 'five');
    const pr = w('o6', 'profits');
    const pl = w('o6', 'plan');
    q(fv, 'stamp', 0.5);
    q(pr, 'stamp', 0.5);
    q(pl, 'stamp', 0.5);
    const leaks = ['TAXES', 'TIMING', 'SUBSCRIPTIONS', 'PAYDAY BRAIN', 'LATTES?'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={100} size={60} color="#5B6470">TODAY</Text>
          {leaks.map((l, i) => (
            <Frame key={l} x={220 + i * 370} y={340} s={0.9 * P('o6', i) * bump(fv, 0.08)} o={lit(fv)} w={330} h={300} label={l}>
              {i === 0 && <Paycheck s={0.4} y={-30} amount="$2,000" cut={0.21} />}
              {i === 1 && <Calendar s={0.6} y={-30} top="THE 1ST" year={1} flip={0} />}
              {i === 2 && <SubTile s={0.8} y={-30} name="STREAM" price="$15.99" />}
              {i === 3 && <Brain s={0.6} y={-30} glow={f >= fv ? 0.6 : 0} />}
              {i === 4 && <Coffee s={0.8} y={-10} f={f} />}
            </Frame>
          ))}
          <Frame x={620} y={780} s={P('o6', 5) * bump(pr)} o={lit(pr)} w={560} h={340} label="WHO PROFITS">
            <Raccoon f={f} x={-60} y={60} s={0.6} mood="sneaky" />
            <Banker f={f} x={150} y={110} s={0.4} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} />
          </Frame>
          <Frame x={1300} y={780} s={P('o6', 6) * bump(pl)} o={lit(pl)} w={560} h={340} label="THE FIX">
            <Bucket s={0.55} y={-20} level={0.7} />
            <Plug s={0.9} x={170} y={10} />
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 The check that shrinks ============
  {
    const sg = w('c1a', 'single');
    const ff = w('c1b', 'fifty');
    const tw = w('c1b', 'two', 1);
    const ms = w('c1b', 'most');
    const td = w('c1b', 'two', 2);
    const ss = w('c1c', 'social');
    const sx = w('c1c', 'six');
    const md = w('c1c', 'medicare');
    const fd = w('c1d', 'federal');
    const st = w('c1d', 'state');
    const hl = w('c1d', 'health');
    const on = w('c1e', 'one');
    const ov = w('c1e', 'over');
    const pz = w('c1f', 'pizza');
    const ts = w('c1f', 'two');
    const nv = w('c1f', 'never');
    q(sg, 'pop', 0.5);
    q(ff, 'cash', 0.6);
    q(tw, 'flip', 0.5);
    q(ms, 'paper', 0.5);
    q(td, 'ding', 0.6);
    [sx, md, fd, st, hl].forEach((x) => q(x, 'pop2', 0.55));
    q(on, 'thud', 0.7);
    q(ov, 'stamp', 0.6);
    q(pz, 'pop', 0.5);
    q(ts, 'poof', 0.6);
    q(nv, 'trombone', 0.4);
    const rows: [string, number, number][] = [
      ['Social Security (6.2%)', 124, sx],
      ['Medicare (1.45%)', 29, md],
      ['Federal income tax', 156, fd],
      ['State tax (example)', 60, st],
      ['Health insurance', 55, hl],
    ];
    const taken = rows.filter(([, , a]) => f >= a).reduce((s, [, v]) => s + v, 0);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c1a') * bump(sg)}><Text size={56}>LEAK #1: the check shrinks</Text></G2>
            <Dave f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
            <Panel x={820} y={330} w={520} title="DAVE'S SALARY / YEAR" value={V(ff, '$52,000')} color={C.green} s={P('c1a', 2) * bump(ff)} />
            <Calendar x={1420} y={330} s={0.8 * P('c1a', 3) * bump(tw)} top="PAID EVERY" year="2 wks" flip={0} />
            <G2 x={1100} y={680} s={0.9 * P('c1a', 4) * bump(td)}><Paycheck amount={V(td, '$2,000')} /></G2>
            <G2 x={1100} y={880} s={P('c1a', 5)} o={lit(td)}><Text size={40} color="#5B6470">...each paycheck, on paper</Text></G2>
            <SourceTag f={f} at={ms} text="BLS: biweekly pay is most common (43% of private employers)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={110} s={P('c1c')}><Text size={50}>where the $2,000 goes first</Text></G2>
            {rows.map(([l, v, a], i) => (
              <G2 key={l} x={560} y={230 + i * 110} s={P('c1c', 1 + i) * bump(a, 0.08)} o={f >= a ? 1 : 0.4}>
                <Box w={880} h={90} fill={f >= a ? '#FDE3EA' : '#fff'} />
                <Text x={-400} y={2} size={38} anchor="start">{l}</Text>
                <Text x={400} y={2} size={44} anchor="end" color={C.red}>{f >= a ? `-$${v}` : '?'}</Text>
              </G2>
            ))}
            <G2 x={560} y={840} s={P('c1c', 6) * bump(ov)}><Box w={880} h={110} fill={f >= ov ? C.yellow : '#fff'} /><Text size={52} color={C.red}>{`taken: -$${taken}`}</Text></G2>
            <G2 x={1460} y={330} s={0.85 * P('c1c', 3)}><Paycheck amount="$2,000" cut={taken / 2000} /></G2>
            <Phone x={1460} y={720} s={1 * P('c1c', 4) * bump(on, 0.15)} title="TAKE-HOME" value={f >= on ? '$1,576' : money(2000 - taken)} color={C.green} />
            <Dave f={f} x={1800} y={900} s={0.7} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: on, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={ss} until={hl} text="SSA/IRS: payroll tax 6.2% + 1.45% · IRS 2026 brackets (example: single, $52K)" />
            <SourceTag f={f} at={hl} text="KFF 2025: workers pay ~$1,440/yr for single coverage (~$55 a paycheck)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Pizza x={900} y={540} s={1.3 * P('c1f') * bump(ts, 0.08)} eaten={f >= ts ? 2 : 0} />
            <G2 x={900} y={180} s={P('c1f', 2) * bump(pz)}><Text size={54}>you ordered 8 slices...</Text></G2>
            <G2 x={900} y={900} s={P('c1f', 3) * bump(nv)}><Box w={820} h={100} fill={f >= nv ? C.yellow : '#fff'} /><Text size={44}>{f >= nv ? 'they were never yours' : 'nobody stole them'}</Text></G2>
            <Dave f={f} x={320} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ts, pose: 'shock', expr: 'shock', look: 0.8}, {at: nv, pose: 'shrug', expr: 'tired', look: 0.8}]} />
            <G2 x={1540} y={400} s={0.9 * P('c1f', 4)}><Paycheck s={0.7} amount="TAXES" /></G2>
            <G2 x={1540} y={640} s={P('c1f', 5)}><Text size={40} color="#5B6470">= the missing slices</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Bills wake up at once ============
  {
    const tm = w('c2a', 'timing');
    const pd = w('c2b', 'paid');
    const bl = w('c2b', 'bills');
    const fs = w('c2b', 'first');
    const nn = w('c2c', 'ninth');
    const rn = w('c2c', 'rent');
    const oh = w('c2c', 'one');
    const ph = w('c2c', 'phone');
    const ct = w('c2d', 'cat');
    const bw = w('c2d', 'bowl');
    const sd = w('c2d', 'suddenly');
    const pr = w('c2e', 'rent');
    const ot = w('c2e', 'other');
    const ev = w('c2e', 'everything');
    const bd = w('c2f', 'bad');
    const cl = w('c2f', 'calendar');
    q(tm, 'tick', 0.6);
    q(pd, 'coin', 0.5);
    q(bl, 'paper', 0.5);
    q(fs, 'stamp', 0.6);
    q(nn, 'flip', 0.5);
    q(rn, 'thud', 0.7);
    q(ph, 'pop', 0.5);
    q(ct, 'pop', 0.5);
    q(bw, 'coin', 0.5);
    q(sd, 'boing', 0.7);
    q(pr, 'thud', 0.5);
    q(ev, 'pop', 0.5);
    q(bd, 'buzz', 0.4);
    q(cl, 'stamp', 0.6);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2a') * bump(tm)}><Text size={56}>LEAK #2: timing</Text></G2>
            <G2 x={160} y={330} s={P('c2a', 1)}><Text size={38} color={C.green} anchor="start">PAYDAYS</Text></G2>
            <MonthStrip x={1060} y={330} s={P('c2a', 2) * bump(pd, 0.05)} w={1400} pay={[1, 15, 29]} bills={[]} lp={lit(pd)} />
            <G2 x={160} y={560} s={P('c2a', 3)}><Text size={38} color={C.red} anchor="start">BILLS</Text></G2>
            <MonthStrip x={1060} y={560} s={P('c2a', 4) * bump(fs, 0.05)} w={1400} pay={[]} bills={[1, 2, 3, 5, 15]} lb={f >= bl ? 1 : 0.35} />
            <G2 x={1060} y={720} s={P('c2a', 5) * bump(fs)} o={lit(fs)}><Box w={900} h={100} fill={f >= fs ? C.yellow : '#fff'} /><Text size={44}>bills LOVE the 1st of the month</Text></G2>
            <Dave f={f} x={1700} y={960} s={0.6} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Calendar x={260} y={230} s={0.7 * P('c2c') * bump(nn)} top="FRI" year={29} flip={0} />
            <Calendar x={520} y={230} s={0.7 * P('c2c', 1) * bump(rn)} top="MON" year={1} flip={0} />
            <Dave f={f} x={400} y={900} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: rn, pose: 'shock', expr: 'worried', look: 0.8}]} />
            <BillCard x={900} y={560} s={1.2 * P('c2c', 2) * bump(oh, 0.1)} label="RENT" amount={V(oh, '$1,100')} date="due: the 1st" lit={lit(rn)} paid={pop(f, oh + 10)} />
            <BillCard x={1300} y={560} s={1.0 * P('c2c', 3) * bump(ph, 0.1)} label="PHONE" amount={V(ph, '$80')} date="due: the 1st" lit={lit(ph)} paid={pop(f, ph + 10)} />
            <Phone x={1700} y={520} s={1 * P('c2c', 4)} title="DAVE'S BANK" value={f >= ph ? '$396' : f >= oh ? '$476' : '$1,576'} color={f >= oh ? C.red : C.green} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Bowl x={960} y={800} s={1.3 * P('c2d')} label="PAYCHECK" full={1} />
            <Cat f={f} x={760} y={820} s={0.9 * P('c2d', 1) * bump(ct, 0.2)} />
            {['RENT', 'PHONE', 'CAR', 'CARD', 'NETFLIX?'].map((l, i) => {
              const sx = [140, 1780, 300, 1620, 1780][i];
              const tx = [540, 1380, 640, 1240, 1500][i];
              const x = ease(f, sd + i * 4, sd + i * 4 + 20, sx, tx);
              return (
                <G2 key={l} x={x} y={i === 4 ? 620 : 820} s={P('c2d', 2 + i)} o={f >= sd ? 1 : 0.6}>
                  <Cat f={f} x={0} y={0} s={0.7} mood={f >= sd ? 'happy' : 'happy'} />
                  <G2 y={-230}><Box w={190} h={60} fill={C.red} /><Text size={28} color="#fff">{l}</Text></G2>
                </G2>
              );
            })}
            <G2 x={960} y={200} s={P('c2d', 3) * bump(sd)}><Text size={56}>{f >= sd ? 'every bill shows up at once' : "Dave's cat at dinner time"}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2e')}><Text size={54}>2 paychecks a month</Text></G2>
            {[0, 1].map((k) => {
              const at = k ? ev : pr;
              const segs: [string, number, string][] = k
                ? [['car', 0.2, C.blue], ['card', 0.15, C.navy], ['insurance', 0.12, C.gold], ['food', 0.28, C.green], ['gas', 0.1, '#9AA5B1'], ['fun', 0.15, C.yellow]]
                : [['RENT $1,100', 0.7, C.red], ['phone', 0.05, C.blue]];
              let acc = 0;
              return (
                <G2 key={k} x={560 + k * 800} y={560} s={P('c2e', 2 + k * 2) * bump(at, 0.06)}>
                  <Text y={-310} size={44}>{k ? 'paycheck #2' : 'paycheck #1'}</Text>
                  <rect x={-220} y={-260} width={440} height={520} rx={18} fill="#fff" stroke={C.ink} strokeWidth={6} />
                  {segs.map(([l, v, c]) => {
                    const y0 = 260 - (acc + v) * 520;
                    acc += v;
                    return (
                      <g key={l} opacity={f >= at ? 1 : 0.35}>
                        <rect x={-214} y={y0} width={428} height={v * 520 - 4} fill={c} stroke={C.ink} strokeWidth={3} />
                        {v > 0.09 && <Text y={y0 + v * 260} size={v > 0.5 ? 44 : 28} color="#fff">{l}</Text>}
                      </g>
                    );
                  })}
                  <Text y={320} size={36} color={k ? C.red : '#5B6470'}>{k ? 'covers EVERYTHING else' : 'rent... and almost nothing'}</Text>
                </G2>
              );
            })}
            <Dave f={f} x={960} y={900} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={480} y={880} s={1.25} keys={[{at: 0, pose: 'shrug', expr: 'tired', look: 0.8}, {at: cl, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
            <G2 x={1200} y={500} s={1.6 * P('c2f') * bump(cl, 0.2)} r={f >= cl ? Math.sin(f / 2) * 3 : 0}><Calendar top="THE 1ST" year={1} flip={0} /></G2>
            <G2 x={1200} y={170} s={P('c2f', 2) * bump(cl)}><Text size={56} color={f >= cl ? C.red : C.ink}>{f >= cl ? 'the calendar is the villain' : 'bad with money?'}</Text></G2>
            <XMark x={560} y={330} s={0.5 * pop(f, bd)} />
            <G2 x={1200} y={850} s={P('c2f', 3)} o={lit(cl)}><Text size={40} color="#5B6470">(not Dave)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Quiet subscriptions ============
  {
    const qt = w('c3a', 'quiet', 1);
    const rm = w('c3b', 'remember');
    const tiles: [string, string, number, string][] = [
      ['STREAM', '$15.99', w('c3b', 'streaming'), C.red],
      ['MUSIC', '$11.99', w('c3b', 'music'), C.green],
      ['CLOUD', '$2.99', w('c3b', 'cloud'), C.blue],
      ['FITNESS', '$14.99', w('c3b', 'fitness'), '#8E6CCF'],
    ];
    const cr = w('c3c', 'c');
    const eg = w('c3c', 'eighty');
    const ls = w('c3c', 'listed');
    const tn = w('c3c', 'two');
    const dr = w('c3d', 'dripping');
    const dp = w('c3d', 'drop');
    const yr = w('c3d', 'year');
    const sp = w('c3d', 'surprise');
    const pd = w('c3e', 'payday');
    const mn = w('c3e', 'money');
    q(qt, 'cricket', 0.5);
    q(rm, 'flip', 0.5);
    tiles.forEach(([, , a]) => q(a, 'pop', 0.5));
    q(cr, 'paper', 0.5);
    q(eg, 'ding', 0.6);
    q(ls, 'scribble', 0.5);
    q(tn, 'thud', 0.8);
    q(dr, 'pop', 0.4);
    q(yr, 'tick', 0.5);
    q(sp, 'boing', 0.6);
    q(pd, 'coin', 0.6);
    q(mn, 'cash', 0.6);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3a') * bump(qt)}><Text size={56}>LEAK #3: the quiet ones</Text></G2>
            {tiles.map(([n, p, a, c], i) => (
              <SubTile key={n} x={640 + (i % 2) * 380} y={360 + Math.floor(i / 2) * 220} s={1.1 * P('c3a', 2 + i) * bump(a, 0.12)} name={n} price={p} color={c} lit={f >= a ? 1 : 0.35} forgot={i === 3 && f >= a} />
            ))}
            <G2 x={830} y={820} s={P('c3a', 6)} o={lit(rm)}><Text size={38} color="#5B6470">remember our subscriptions video?</Text></G2>
            <Dave f={f} x={1500} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: tiles[3][2], pose: 'facepalm', expr: 'sad'}]} />
            <G2 x={1500} y={380} s={P('c3a', 4)} o={lit(tiles[3][2])}><Bubble text="opened it ONCE" size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110} s={P('c3c')}><Text size={52}>subscriptions per month</Text></G2>
            <line x1={320} y1={820} x2={1200} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[0, 1].map((k) => {
              const at = k ? tn : eg;
              const h = k ? ease(f, tn - 4, tn + 18, 60, 520) : ease(f, eg - 4, eg + 18, 60, 205);
              return (
                <G2 key={k} x={520 + k * 480} y={820} s={P('c3c', 2 + k * 2)}>
                  <rect x={-130} y={-h} width={260} height={h} rx={14} fill={k ? C.red : '#9AA5B1'} stroke={C.ink} strokeWidth={6} />
                  <Text y={-h - 50} size={64} color={k ? C.red : C.ink}>{V(at, k ? '$219' : '$86')}</Text>
                  <Text y={56} size={38} color="#5B6470">{k ? 'REAL (listed)' : 'GUESS'}</Text>
                </G2>
              );
            })}
            <Dave f={f} x={1550} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: tn, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <G2 x={1550} y={380} s={P('c3c', 5) * bump(tn)} o={lit(tn)}><Box w={380} h={100} fill={C.yellow} /><Text size={44}>2.5x more!</Text></G2>
            <SourceTag f={f} at={cr} text="C+R Research subscription survey: guess ~$86/mo vs itemized ~$219/mo" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Tap f={f} x={900} y={260} s={1.2 * P('c3d') * bump(dr, 0.08)} />
            <Bucket x={960} y={720} s={P('c3d', 2)} level={ease(f, dp, sp, 0.1, 0.85)} label={f >= yr ? '$2,628/yr' : '$219/mo'} />
            <G2 x={420} y={260} s={P('c3d', 3) * bump(dp)}><Text size={48}>{f >= dp ? 'one drop: nothing' : 'drip... drip...'}</Text></G2>
            <G2 x={1500} y={260} s={P('c3d', 4) * bump(sp, 0.25)} o={lit(yr)}><Box w={500} h={110} fill={f >= sp ? C.yellow : '#fff'} /><Text size={44} color={C.red}>all year = SURPRISE</Text></G2>
            <Dave f={f} x={1500} y={900} s={1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: sp, pose: 'shock', expr: 'shock', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3e')}><Text size={54}>when do subscriptions charge?</Text></G2>
            <MonthStrip x={960} y={460} s={P('c3e', 1)} w={1600} pay={[15, 29]} bills={[]} lp={1} />
            {[0, 1, 2, 3].map((i) => {
              const hop = f >= pd ? Math.abs(Math.sin((f - pd) / 6 + i)) * 30 : 0;
              return <SubTile key={i} x={1400 + (i % 2) * 330} y={660 + Math.floor(i / 2) * 170 - hop} s={0.8 * P('c3e', 2 + i)} name={['STREAM', 'MUSIC', 'CLOUD', 'FITNESS'][i]} price="charging..." color={[C.red, C.green, C.blue, '#8E6CCF'][i]} lit={lit(pd)} />;
            })}
            <G2 x={1587} y={330} s={P('c3e', 2) * bump(pd, 0.3)}><Text size={40} color={C.green}>PAYDAY</Text></G2>
            <Phone x={560} y={760} s={0.9 * P('c3e', 3) * bump(mn, 0.1)} title="DAVE'S BANK" value={f >= mn ? '$$$ in here' : '$1,576'} color={C.green} />
            <Dave f={f} x={240} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Rich for a day ============
  {
    const hd = w('c4a', 'head');
    const hg = w('c4b', 'huge');
    const dn = w('c4b', 'dinner');
    const ef = w('c4b', 'eighty');
    const rd = w('c4b', 'ride');
    const ft = w('c4b', 'forty');
    const sc = w('c4c', 'science');
    const jm = w('c4c', 'jumps');
    const fl = w('c4c', 'falls');
    const sv = w('c4c', 'savings');
    const fu = w('c4d', 'full');
    const kg = w('c4d', 'king');
    const wd = w('c4d', 'wednesday');
    const ck = w('c4d', 'crackers');
    const su = w('c4e', 'sunday');
    const gr = w('c4e', 'groceries');
    const gs = w('c4e', 'gas');
    const sx = w('c4e', 'sixty');
    const ad = w('c4f', 'add');
    const tt = w('c4f', 'thirty');
    const cz = w('c4f', 'crazy');
    q(hd, 'pop', 0.5);
    q(hg, 'chime', 0.5);
    q(dn, 'pop', 0.5);
    q(ef, 'cash', 0.6);
    q(rd, 'pop', 0.5);
    q(ft, 'cash', 0.6);
    q(sc, 'paper', 0.5);
    q(jm, 'boing', 0.6);
    q(fl, 'whoosh_s', 0.5);
    q(sv, 'ding', 0.5);
    q(fu, 'ding', 0.5);
    q(kg, 'chime', 0.5);
    q(wd, 'flip', 0.5);
    q(ck, 'trombone', 0.5);
    q(su, 'flip', 0.5);
    q(gr, 'cash', 0.5);
    q(gs, 'cash', 0.5);
    q(sx, 'cash', 0.5);
    q(ad, 'scribble', 0.5);
    q(tt, 'thud', 0.8);
    q(cz, 'ding', 0.5);
    const spend = [1, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.65, 0.6, 3.4, 2.2, 1.6, 1.2, 1, 0.9, 0.8, 0.7, 0.6, 0.55, 3.3, 2.1, 1.5, 1.1, 0.9];
    const lines: [string, string][] = [['Fri dinner', '$85'], ['Fri ride home', '$48'], ['Sun groceries', '$120'], ['Sun gas', '$45'], ['subscriptions', '$60'], ['Mon rent', '$1,100'], ['Mon phone', '$80']];
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P('c4a') * bump(hd)}><Text size={56}>LEAK #4: the payday feeling</Text></G2>
            <Brain x={330} y={330} s={0.9 * P('c4a', 1) * bump(hg)} glow={f >= hg ? 0.8 : 0.2} />
            <Dave f={f} x={330} y={900} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: hg, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <Friend f={f} x={760} y={900} s={0.95 * P('c4a', 2)} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.8}]} />
            <Bob f={f} x={1000} y={900} s={0.95 * P('c4a', 3)} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
            <Plate x={880} y={620} s={0.9 * P('c4a', 4) * bump(dn)} label="DINNER" big><Text y={-40} size={64} color={C.red}>{V(ef, '$85')}</Text></Plate>
            <G2 x={1200} y={560} s={0.55 * P('c4a', 5) * bump(rd)} o={lit(rd)}><BlueCar /><Text y={-150} size={60}>{V(ft, 'RIDE $48')}</Text></G2>
            <Phone x={1620} y={560} s={1.05 * P('c4a', 6)} title="DAVE'S BANK" value={f >= ft ? '$1,443' : f >= ef ? '$1,491' : '$1,576'} color={C.green} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110} s={P('c4c')}><Text size={50}>daily spending (real bank data)</Text></G2>
            <LineChart x={760} y={520} s={P('c4c', 2)} w={1100} h={440} t={ease(f, A('c4c'), fl + 30, 0.35, 1)} pts={spend} lo={0} hi={3.6} color={C.red} />
            {[9, 19].map((k, i) => (
              <G2 key={k} x={210 + (k / 23) * 1100} y={220} s={P('c4c', 3 + i) * bump(jm, 0.2)} o={lit(jm)}><Text size={36} color={C.green}>PAYDAY</Text></G2>
            ))}
            <G2 x={760} y={880} s={P('c4c', 5)} o={lit(fl)}><Text size={40}>jumps on payday... then slowly falls</Text></G2>
            <G2 x={1620} y={420} s={P('c4c', 4) * bump(sv)}><Box w={440} h={170} fill={f >= sv ? C.yellow : '#fff'} /><Text y={-24} size={38}>even people</Text><Text y={30} size={38}>WITH savings</Text></G2>
            <Dave f={f} x={1620} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: sv, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={sc} text="Gelman et al. (2014), Science 345: spending responds to payday" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Frame x={560} y={520} s={P('c4d') * bump(fu, 0.06)} w={680} h={620} label="FRIDAY">
              <rect x={-150} y={-230} width={300} height={380} rx={18} fill="#E8EEF2" stroke={C.ink} strokeWidth={6} />
              {Array.from({length: 9}).map((_, i) => <circle key={i} cx={-90 + (i % 3) * 90} cy={-170 + Math.floor(i / 3) * 110} r={34} fill={[C.red, C.green, C.gold][i % 3]} stroke={C.ink} strokeWidth={4} />)}
              <Dave f={f} x={240} y={200} s={0.6} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
              <path d="M 205 -95 L 215 -125 L 240 -100 L 265 -125 L 275 -95 Z" fill={C.gold} stroke={C.ink} strokeWidth={4} opacity={lit(kg)} transform={`translate(0,${-20}) scale(${bump(kg, 0.4)})`} />
            </Frame>
            <Frame x={1360} y={520} s={P('c4d', 2) * bump(wd, 0.06)} o={f >= wd ? 1 : 0.55} w={680} h={620} label="WEDNESDAY">
              <rect x={-150} y={-230} width={300} height={380} rx={18} fill="#E8EEF2" stroke={C.ink} strokeWidth={6} />
              <Crackers x={-20} y={60} s={0.9 * bump(ck, 0.2)} />
              <Dave f={f} x={240} y={200} s={0.6} keys={[{at: 0, pose: 'shrug', expr: 'sad'}]} />
            </Frame>
            <G2 x={960} y={110} s={P('c4d', 1)}><Text size={56}>the full fridge effect</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Receipt x={640} y={540} s={1.15 * P('c4e') * bump(tt, 0.05)} lines={lines} total={f >= tt ? 'TOTAL $1,538' : ''} shown={f >= ad ? 7 : f >= sx ? 5 : f >= gs ? 4 : f >= gr ? 3 : 2} />
            <G2 x={640} y={100} s={P('c4e', 1) * bump(su)}><Text size={50}>{f >= A('c4f') ? 'Friday to Monday' : 'then Sunday...'}</Text></G2>
            <Phone x={1300} y={520} s={1.2 * P('c4e', 2) * bump(tt, 0.2)} title="DAVE'S BANK" value={f >= tt ? '$38' : f >= sx ? '$1,218' : f >= gs ? '$1,278' : f >= gr ? '$1,323' : '$1,443'} color={f >= tt ? C.red : C.green} />
            <Dave f={f} x={1680} y={900} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: tt, pose: 'shock', expr: 'shock', look: -0.8}, {at: cz, pose: 'shrug', expr: 'tired', look: -0.8}]} sweat={f >= tt} />
            <G2 x={1300} y={900} s={P('c4e', 3) * bump(cz)} o={lit(cz)}><Box w={560} h={100} fill={C.yellow} /><Text size={40}>not one crazy purchase</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Honest latte math ============
  {
    const cf = w('c5a', 'coffee');
    const sx = w('c5b', 'six');
    const wk = w('c5b', 'work');
    const on = w('c5b', 'one');
    const rl = w('c5b', 'real');
    const rch = w('c5c', 'rich');
    const np = w('c5c', 'nope');
    const bl = w('c5d', 'bureau');
    const sv = w('c5d', 'seventy');
    const th = w('c5d', 'third');
    const ho = w('c5d', 'housing');
    const eo = w('c5e', 'eating');
    const tr = w('c5e', 'three');
    const ss = w('c5e', 'seventy');
    const sm = w('c5f', 'small');
    const bg = w('c5f', 'big');
    const lv = w('c5f', 'love');
    const nt = w('c5f', 'notice');
    q(cf, 'pop', 0.6);
    q(sx, 'coin', 0.5);
    q(wk, 'tick', 0.5);
    q(on, 'cash', 0.7);
    q(rch, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(bl, 'paper', 0.5);
    q(sv, 'ding', 0.5);
    q(ho, 'thud', 0.7);
    q(eo, 'pop', 0.5);
    q(tr, 'cash', 0.6);
    q(ss, 'ding', 0.5);
    q(sm, 'pop', 0.4);
    q(bg, 'thud', 0.6);
    q(lv, 'heart', 0.6);
    q(nt, 'poof', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={110} s={P('c5a') * bump(cf)}><Text size={56}>LEAK #5? the famous coffee</Text></G2>
            <Dave f={f} x={300} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}]} handItem={<Coffee s={0.5} f={f} />} />
            <G2 x={740} y={420} s={P('c5a', 2) * bump(sx)}><Coffee s={1.4} f={f} /></G2>
            <G2 x={740} y={640} s={P('c5a', 3)}><Text size={52}>{V(sx, '$6')}</Text></G2>
            <G2 x={1040} y={440} s={P('c5a', 4)} o={lit(wk)}><Text size={70}>×5 days</Text></G2>
            <G2 x={1380} y={440} s={P('c5a', 5)} o={lit(wk)}><Text size={70}>×52</Text></G2>
            <G2 x={1240} y={660} s={P('c5a', 6) * bump(on)}><Box w={600} h={140} fill={f >= on ? C.yellow : '#fff'} /><Text size={80} color={C.red}>{V(on, '$1,560/yr')}</Text></G2>
            <G2 x={1240} y={790} s={P('c5a', 7)} o={lit(rl)}><Text size={40} color="#5B6470">real money</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c5c')}><Text size={52}>"skip the latte, become a millionaire"</Text></G2>
            <Coffee x={520} y={560} s={1.5 * P('c5c', 1)} f={f} />
            <path d="M 700 560 L 1000 560" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={P('c5c', 2)} />
            <path d="M 1010 560 l -34 -26 l 0 52 Z" fill={C.ink} opacity={P('c5c', 2)} />
            <Yacht x={1380} y={600} s={0.8 * P('c5c', 3) * bump(rch)} f={f} />
            <Stamp x={960} y={820} s={pop(f, np, 9, 260)} text="NOPE" size={90} color={C.red} r={-8} />
            <G2 x={1380} y={860} s={P('c5c', 4)} o={lit(np)}><Text size={40}>not on its own</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c5d')}><Text size={52}>average household spending per year</Text></G2>
            <SlicePie x={620} y={560} s={P('c5d', 2) * bump(ho, 0.08)} rad={300} t={1} slices={[{v: 0.334, c: C.red, l: f >= ho ? 'HOUSING' : ''}, {v: 0.17, c: C.blue, l: 'cars'}, {v: 0.13, c: C.green, l: 'food'}, {v: 0.366, c: '#C9CED6', l: 'everything else'}]} pop={f >= ho ? 0 : -1} />
            <Panel x={1400} y={360} w={600} h={220} title="TOTAL / YEAR" value={V(sv, '$78,535')} size={90} s={P('c5d', 3) * bump(sv)} />
            <Panel x={1400} y={640} w={600} h={220} title="HOUSING" value={V(th, '1/3')} color={C.red} size={100} s={P('c5d', 4) * bump(th)} />
            <SourceTag f={f} at={bl} text="BLS Consumer Expenditures 2024: $78,535 total, housing $26,266" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110} s={P('c5e')}><Text size={52}>per year: coffee vs eating out</Text></G2>
            <line x1={260} y1={820} x2={1260} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={500} y={820} s={P('c5e', 2)}>
              <rect x={-130} y={-230} width={260} height={230} rx={14} fill="#8C5A33" stroke={C.ink} strokeWidth={6} />
              <Text y={-280} size={56}>$1,560</Text>
              <Text y={56} size={36} color="#5B6470">Dave's lattes</Text>
            </G2>
            <G2 x={1000} y={820} s={P('c5e', 3) * bump(tr, 0.08)}>
              <rect x={-130} y={-ease(f, tr - 4, tr + 18, 120, 580)} width={260} height={ease(f, tr - 4, tr + 18, 120, 580)} rx={14} fill={C.red} stroke={C.ink} strokeWidth={6} opacity={f >= eo ? 1 : 0.5} />
              <Text y={-ease(f, tr - 4, tr + 18, 120, 580) - 50} size={56} color={C.red}>{V(tr, '$3,945')}</Text>
              <Text y={56} size={36} color="#5B6470">eating out (average)</Text>
            </G2>
            <G2 x={1600} y={450} s={P('c5e', 4) * bump(ss)}><Plate label="EATING OUT" big><Text y={-50} size={64} color={C.red}>{V(ss, '$76/wk')}</Text></Plate></G2>
            <Dave f={f} x={1600} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ss, pose: 'shock', expr: 'worried', look: -0.8}]} />
            <SourceTag f={f} at={eo} text="BLS CE 2024: food away from home $3,945/yr ÷ 52 ≈ $76/week" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={760} s={P('c5f')} tilt={ease(f, bg - 4, bg + 16, 0, 10)} left="small things" right="BIG things" />
            <Coffee x={660} y={420} s={0.6 * P('c5f', 1) * bump(sm)} f={f} />
            <G2 x={1260} y={440} s={P('c5f', 2) * bump(bg)}><BillCard s={0.7} label="RENT" amount="$1,100" /></G2>
            <G2 x={330} y={330} s={P('c5f', 3) * bump(lv)} o={lit(lv)}>
              <Coffee s={0.9} f={f} />
              <path d="M 0 -150 C -30 -190 -80 -160 -60 -120 L 0 -70 L 60 -120 C 80 -160 30 -190 0 -150 Z" fill={C.red} stroke={C.ink} strokeWidth={4} />
              <Text y={140} size={36} color={C.green}>keep the one you LOVE</Text>
            </G2>
            <G2 x={1600} y={330} s={P('c5f', 4) * bump(nt)} o={lit(nt)}>
              <Coffee s={0.9} f={f} steam={0} />
              {f >= nt && <XMark s={0.6} />}
              <Text y={140} size={36} color={C.red}>cut the one you don't notice</Text>
            </G2>
            <Dave f={f} x={960} y={1010} s={0.5} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Who profits ============
  {
    const zr = w('c6a', 'zero');
    const rc = w('c6b', 'raccoon');
    const ov = w('c6b', 'overdraft');
    const tf = w('c6b', 'thirty');
    const fv = w('c6b', 'five', 1);
    const fh = w('c6c', 'financial');
    const tw = w('c6c', 'twelve');
    const fr = w('c6d', 'federal');
    const rp = w('c6d', 'repealed');
    const sp = w('c6d', 'supporters');
    const cr = w('c6d', 'critics');
    const pq = w('c6d', 'political');
    const sb = w('c6e', 'subscription');
    const pl = w('c6e', 'pay');
    const lv = w('c6e', 'loves');
    q(zr, 'buzz', 0.6);
    q(rc, 'boing', 0.6);
    q(ov, 'stamp', 0.6);
    q(tf, 'cash', 0.7);
    q(fv, 'coin', 0.5);
    q(fh, 'paper', 0.5);
    q(tw, 'thud', 0.8);
    q(fr, 'paper', 0.5);
    q(rp, 'stamp', 0.7);
    q(sp, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(pq, 'stamp', 0.6);
    q(sb, 'pop', 0.5);
    q(pl, 'pop', 0.5);
    q(lv, 'ding', 0.5);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={110} s={P('c6a') * bump(zr)}><Text size={56}>who wins when Dave hits $0?</Text></G2>
            <Phone x={260} y={560} s={1 * P('c6a', 1) * bump(zr, 0.1)} title="DAVE'S BANK" value={f >= zr ? '$0.00' : '$38'} color={C.red} />
            <TollBooth x={1000} y={822} s={1.1 * P('c6a', 2) * bump(ov, 0.08)} label={f >= ov ? 'OVERDRAFT' : 'TOLL'} barUp={0} />
            <Raccoon f={f} x={1000} y={560} s={0.7 * P('c6a', 3) * bump(rc, 0.2)} mood="sneaky" holdCoin={f >= tf} />
            <G2 x={1540} y={380} s={P('c6a', 4) * bump(tf)}><PriceTag s={1.3} text={V(tf, 'FEE $35')} color={C.red} /></G2>
            <G2 x={1540} y={640} s={P('c6a', 5) * bump(fv)} o={lit(fv)}><Coffee s={0.7} f={f} /><Text x={120} y={0} size={48} anchor="start">$5</Text></G2>
            <Dave f={f} x={520} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: tf, pose: 'shock', expr: 'shock', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6c')}><Text size={54}>overdraft + bounced payment fees, 2024</Text></G2>
            <Panel x={640} y={440} w={760} h={280} title="PAID BY AMERICANS" value={V(tw, '~$12.1 BILLION')} color={C.red} size={90} s={P('c6c', 2) * bump(tw)} />
            <G2 x={640} y={780} s={P('c6c', 3)}><MoneyStack n={f >= tw ? 9 : 3} s={1} /></G2>
            <Raccoon f={f} x={1450} y={760} s={1.1 * P('c6c', 4) * bump(tw, 0.1)} mood={f >= tw ? 'happy' : 'sneaky'} holdCoin />
            <SourceTag f={f} at={fh} text="Financial Health Network: ~$12.1B in 2024 ($6.7B banks, $5.4B credit unions)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Contract x={960} y={380} s={0.8 * P('c6d') * bump(rp, 0.08)} lines={['OVERDRAFT FEE CAP', 'federal rule, 2024', 'repealed 2025']} signed={0} />
            <Stamp x={1100} y={420} s={pop(f, rp, 9, 260)} text="REPEALED" size={56} color={C.red} r={-10} />
            <Scale x={960} y={1000} s={0.7 * P('c6d', 2)} tilt={0} left="" right="" />
            <G2 x={420} y={700} s={P('c6d', 3) * bump(sp)} o={lit(sp)}><Box w={560} h={140} fill="#E3F6EC" /><Text y={-20} size={34}>supporters: it</Text><Text y={24} size={34}>protected families</Text></G2>
            <G2 x={1500} y={700} s={P('c6d', 4) * bump(cr)} o={lit(cr)}><Box w={560} h={140} fill="#FDE3EA" /><Text y={-20} size={34}>critics: banks would</Text><Text y={24} size={34}>cut services</Text></G2>
            <G2 x={960} y={110} s={P('c6d', 5) * bump(pq)}><Box w={1140} h={110} fill={f >= pq ? C.yellow : '#fff'} /><Text size={46}>a political question. Now you know the numbers.</Text></G2>
            <SourceTag f={f} at={fr} text="CRS IN12513: Congress repealed the CFPB overdraft rule (2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6e') * bump(lv)}><Text size={54}>{f >= lv ? 'they all love the day after payday' : 'and the others?'}</Text></G2>
            <Frame x={380} y={520} s={P('c6e', 1) * bump(sb)} o={lit(sb)} w={480} h={500} label="subscriptions">
              <SubTile s={1} y={-60} name="FORGOT?" price="$14.99" forgot />
            </Frame>
            <Frame x={960} y={520} s={P('c6e', 2) * bump(pl)} o={lit(pl)} w={480} h={500} label="pay later buttons">
              <BigButton s={1.2} y={-40} press={f >= pl ? 1 : 0} />
              <Text y={60} size={40} color={C.red}>PAY IN 4</Text>
            </Frame>
            <Frame x={1540} y={520} s={P('c6e', 3) * bump(lv)} o={lit(lv)} w={480} h={500} label="the day after payday">
              <Calendar s={0.8} y={-40} top="SATURDAY" year={30} flip={0} />
            </Frame>
            <Raccoon f={f} x={960} y={960} s={0.5 * P('c6e', 4)} mood="sneaky" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Missing cushion ============
  {
    const hr = w('c7a', 'hurt');
    const fed = w('c7b', 'federal');
    const fh = w('c7b', 'four');
    const sx = w('c7b', 'sixty');
    const ys = w('c7b', 'yes');
    const mo = w('c7c', 'more');
    const br = w('c7c', 'borrow');
    const sl = w('c7c', 'sell');
    const cp = w('c7c', 'couldnt');
    const ft = w('c7d', 'tire');
    const cd = w('c7d', 'card');
    const it = w('c7d', 'interest');
    const sm = w('c7d', 'smaller');
    const sp = w('c7e', 'spare');
    const is = w('c7e', 'isnt');
    q(hr, 'thud', 0.5);
    q(fed, 'paper', 0.5);
    q(fh, 'cash', 0.6);
    q(sx, 'ding', 0.6);
    q(ys, 'stamp', 0.5);
    q(mo, 'pop', 0.5);
    q(br, 'pop', 0.5);
    q(sl, 'pop', 0.5);
    q(cp, 'buzz', 0.6);
    q(ft, 'poof', 0.6);
    q(cd, 'pop', 0.5);
    q(it, 'boing', 0.5);
    q(sm, 'thud', 0.6);
    q(sp, 'pop', 0.5);
    q(is, 'thud', 0.7);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c7a') * bump(hr)}><Text size={52}>Fed question: a $400 surprise bill?</Text></G2>
            <G2 x={420} y={500} s={P('c7a', 2) * bump(fh)}><BillCard s={1.4} label="SURPRISE!" amount={V(fh, '$400')} date="car repair? vet?" /></G2>
            <SlicePie x={1100} y={560} s={P('c7a', 3) * bump(sx, 0.08)} rad={260} t={1} slices={[{v: 0.63, c: C.green, l: f >= sx ? 'cash: 63%' : ''}, {v: 0.37, c: C.red, l: f >= mo ? '37%' : ''}]} pop={f >= mo ? 1 : -1} />
            <Panel x={1640} y={420} w={420} h={220} title="COULD PAY IN CASH" value={V(sx, '63%')} color={C.green} size={100} s={P('c7a', 4) * bump(ys)} />
            <Dave f={f} x={1640} y={900} s={0.85} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}]} />
            <SourceTag f={f} at={fed} text="Federal Reserve SHED, May 2026 (2025 data): 63% would use cash or equivalent" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c7c') * bump(mo)}><Text size={54}>more than 1 in 3 would...</Text></G2>
            <Frame x={380} y={540} s={P('c7c', 1) * bump(br)} o={lit(br)} w={480} h={500} label="borrow">
              <CreditCard s={0.9} y={-40} />
            </Frame>
            <Frame x={960} y={540} s={P('c7c', 2) * bump(sl)} o={lit(sl)} w={480} h={500} label="sell something">
              <PriceTag s={1.2} y={-40} text="FOR SALE" />
            </Frame>
            <Frame x={1540} y={540} s={P('c7c', 3) * bump(cp)} o={lit(cp)} w={480} h={500} label="couldn't pay">
              <XMark s={0.8} y={-40} />
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c7d')}><Text size={52}>no cushion = a chain reaction</Text></G2>
            {[
              [ft, 'flat tire', <Tire key="t" s={0.8} psi="FLAT" />],
              [cd, 'on the card', <CreditCard key="c" s={0.8} />],
              [it, 'interest', <Raccoon key="r" f={f} s={0.55} y={60} mood="sneaky" holdCoin />],
              [sm, 'next check: smaller', <Paycheck key="p" s={0.4} amount="$1,576" cut={0.25} />],
            ].map(([at, l, el], i) => (
              <G2 key={String(l)} x={250 + i * 470} y={520} s={P('c7d', 1 + i) * bump(Number(at), 0.12)} o={f >= Number(at) ? 1 : 0.4}>
                <Frame w={400} h={420} label={String(l)}>{el as React.ReactNode}</Frame>
                {i < 3 && <path d="M 210 0 l 40 0 l -14 -14 M 250 0 l -14 14" stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" opacity={f >= Number(at) ? 1 : 0.3} />}
              </G2>
            ))}
            <Dave f={f} x={960} y={1000} s={0.5} keys={[{at: 0, pose: 'hold', expr: 'worried'}, {at: sm, pose: 'facepalm', expr: 'sad'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <BlueCar x={900} y={780} s={1.6 * P('c7e')} f={f} shake={f >= is ? 1 : 0} />
            <G2 x={1500} y={620} s={P('c7e', 2) * bump(sp)}>
              <circle r={120} fill="none" stroke="#9AA5B1" strokeWidth={8} strokeDasharray="20 14" />
              <Text size={40} color="#9AA5B1">spare?</Text>
            </G2>
            <G2 x={960} y={200} s={P('c7e', 3) * bump(is)}><Text size={56} color={f >= is ? C.red : C.ink}>{f >= is ? '...until it really isn\'t' : 'everything is fine...'}</Text></G2>
            <Dave f={f} x={380} y={822} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: is, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= is} />
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
    const sn = w('c8b', 'snacks');
    const mv = w('c8c', 'move');
    const cn = w('c8d', 'cancelled');
    const sd = w('c8e', 'sunday');
    const gn = w('c8f', 'gone', 1);
    q(sn, 'boing', 0.5);
    q(mv, 'whoosh_s', 0.5);
    q(cn, 'rip', 0.6);
    q(sd, 'chime', 0.5);
    q(gn, 'poof', 0.5);
    const items = ['Pay yourself first', 'A bill calendar', 'A subscription check', 'The 48-hour rule', 'A weekly fun number'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100} s={P('c8a')}><Text size={56}>How Dave plugged the leaks</Text></G2>
          <G2 x={650} y={160} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={280 + i * 130} s={0.85 * P('c8a', 2 + i)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.green} w={1060} />)}
          {cur > 1 && Array.from({length: cur - 1}).map((_, i) => <Check key={i} x={960} y={280 + i * 130} s={0.8} />)}
          <G2 x={1540} y={560} s={P('c8a', 3)}>
            <Frame w={600} h={680}>
              {cur === 0 && <g><Bucket s={0.9} y={-40} level={0.4} /><Plug s={1.2} x={180} y={120} /><Dave f={f} x={-180} y={260} s={0.6} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} /></g>}
              {cur === 1 && <g><Paycheck s={0.6} y={-200} amount="PAYDAY" /><path d="M 0 -110 L 0 -40" stroke={C.ink} strokeWidth={8} /><Jar s={0.8} y={110} level={0.3 + 0.3 * ease(f, hs[0], hs[0] + 60)} label="SAVINGS" /><Text y={290} size={36} color={C.green}>auto: $50 first</Text></g>}
              {cur === 2 && <g><MonthStrip s={1} y={-160} w={540} pay={[15, 29]} bills={f >= mv ? [1, 15] : [1, 2, 3]} /><BillCard s={0.8} y={60} label="DUE DATE" amount={f >= mv ? 'the 15th' : 'the 1st'} /><Text y={250} size={36}>half the bills per paycheck</Text></g>}
              {cur === 3 && <g>{['STREAM', 'MUSIC', 'CLOUD', 'FITNESS'].map((n, k) => <SubTile key={n} s={0.9} y={-230 + k * 150} name={n} price="$" cut={k > 0 && f >= cn ? ease(f, cn + k * 6, cn + k * 6 + 12) : 0} />)}</g>}
              {cur === 4 && <g><PriceTag s={1.2} y={-200} text="$120 jacket" /><Calendar s={0.8} y={30} top="WAIT" year="48 h" flip={0} /><Text y={250} size={36} color={f >= sd ? C.green : C.ink}>{f >= sd ? 'still want it? buy it' : 'wait two days...'}</Text></g>}
              {cur >= 5 && <g><Jar s={0.8} y={-40} level={f >= gn ? 0.05 : 0.6} label="FUN $" /><Text y={230} size={40}>{f >= gn ? 'gone = gone (till next week)' : 'one number per week'}</Text></g>}
            </Frame>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 Next payday ============
  {
    const tw = w('c9a', 'payday');
    const ff = w('c9b', 'fifty');
    const rn = w('c9b', 'rent');
    const th = w('c9b', 'three');
    const fr = w('c9c', 'friday');
    const lt = w('c9c', 'latte');
    const mo = w('c9c', 'monday');
    const fh = w('c9c', 'four');
    const ss = w('c9d', 'same');
    const pl = w('c9d', 'plugged');
    const sc = w('c9d', 'schedule');
    q(tw, 'cash', 0.6);
    q(ff, 'coin', 0.6);
    q(rn, 'ding', 0.5);
    q(th, 'rip', 0.5);
    q(fr, 'pop', 0.5);
    q(lt, 'pop', 0.5);
    q(mo, 'flip', 0.5);
    q(fh, 'chime', 0.8);
    q(ss, 'pop', 0.5);
    q(pl, 'pop2', 0.6);
    q(sc, 'ding', 0.6);
    scene(A('c9a'), () =>
      f < A('c9c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Calendar x={220} y={220} s={0.7 * P('c9a') * bump(tw)} top="FRIDAY" year={12} flip={0} />
            <G2 x={220} y={420} s={P('c9a', 1)}><Text size={44} color={C.green}>PAYDAY again</Text></G2>
            {[[ff, 'savings first: $50'], [rn, 'rent: split in two'], [th, '3 subscriptions: gone']].map(([at, l], i) => (
              <G2 key={String(l)} x={900} y={330 + i * 180} s={P('c9a', 2 + i) * bump(Number(at), 0.08)} o={f >= Number(at) ? 1 : 0.4}>
                <Box w={760} h={130} fill={f >= Number(at) ? '#E3F6EC' : '#fff'} />
                <Text x={-330} y={2} size={48} anchor="start">{String(l)}</Text>
                {f >= Number(at) && <Check x={320} y={0} s={1} />}
              </G2>
            ))}
            <Jar x={1600} y={620} s={0.9 * P('c9a', 5) * bump(ff, 0.1)} level={f >= ff ? 0.35 : 0.1} label="SAVINGS" />
            <Dave f={f} x={380} y={900} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c9d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Calendar x={220} y={220} s={0.7 * P('c9c') * bump(mo)} top={f >= mo ? 'MONDAY' : 'FRIDAY'} year={f >= mo ? 15 : 12} flip={0} />
            <Dave f={f} x={620} y={880} s={1.25} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: fh, pose: 'celebrate', expr: 'grin', look: 0.8}]} handItem={<Coffee s={0.45} f={f} />} />
            <G2 x={220} y={520} s={P('c9c', 1) * bump(fr)} o={lit(fr)}><Plate s={0.8} label="FRIDAY: still out" /></G2>
            <G2 x={220} y={780} s={P('c9c', 2) * bump(lt)} o={lit(lt)}><Coffee s={0.7} f={f} /></G2>
            <Phone x={1150} y={520} s={1.3 * P('c9c', 3) * bump(fh, 0.2)} title="DAVE'S BANK" value={f >= fh ? '$412' : '$...'} color={C.green} />
            <G2 x={1600} y={300} s={P('c9c', 4)} o={0.5}><Text size={70} color="#9C9383">$38</Text><line x1={-80} y1={-10} x2={80} y2={-10} stroke={C.red} strokeWidth={8} /></G2>
            <G2 x={1600} y={620} s={P('c9c', 5) * bump(fh)}><Text size={130} color={C.green}>{V(fh, '$412')}</Text></G2>
            {f >= fh && <Sparkle x={1600} y={460} t={((f - fh) % 30) / 30} s={0.9} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bucket x={760} y={620} s={1.4 * P('c9d')} level={0.8} label="PAYCHECK" />
            <Leak f={f} x={900} y={760} on={f >= pl ? 0 : 1} />
            <Plug x={900} y={740} s={P('c9d', 1) * pop(f, pl) * bump(pl, 0.3)} />
            <G2 x={960} y={130} s={P('c9d', 2) * bump(ss)}><Text size={58}>same salary · same Dave</Text></G2>
            <G2 x={1460} y={420} s={P('c9d', 3) * bump(sc)} o={lit(pl)}><Calendar s={0.9} top="ON A" year="plan" flip={0} /></G2>
            <Dave f={f} x={1460} y={900} s={1} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ RECAP ============
  const recap = ['Your paycheck shrinks before you see it', 'Timing, subscriptions & the payday feeling', 'Pay yourself first · match bills to paydays'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P('r1')}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={220} y={380 + i * 170} s={P('r1', 2 + i) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1480} />)}
          <Dave f={f} x={1800} y={960} s={0.55} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rs = w('r5', 'raise');
    const rc = w('r5', 'richer');
    const sb = w('r6', 'subscribe');
    const lk = w('r6', 'leak');
    q(rs, 'cash', 0.6);
    q(rc, 'sting', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(lk, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('r5')}><Text size={58}>Next: Dave gets a raise...</Text></G2>
            <G2 x={1200} y={520} s={0.9 * P('r5', 2) * bump(rs, 0.1)}><Paycheck amount="RAISE!" /></G2>
            <G2 x={1620} y={800} s={P('r5', 3) * bump(rc, 0.2)} r={8}><Box w={420} h={110} fill={C.yellow} /><Text size={50} color={C.red}>richer? ???</Text></G2>
            <Dave f={f} x={450} y={900} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: rc, pose: 'shrug', expr: 'think', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Bucket x={1560} y={800} s={0.7 * pop(f, sb - 6)} level={0.8} label="$0" />
            <Plug x={1680} y={860} s={0.7 * pop(f, sb - 4) * bump(lk, 0.3)} />
            <G2 x={960} y={680} s={pop(f, sb - 6) * bump(lk)}><Text size={46} color={f >= lk ? C.green : C.ink}>price: $0 · zero leaks</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4f', 'purchase') + 20;
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
