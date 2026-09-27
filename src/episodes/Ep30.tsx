import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, MoneyStack, SourceTag, Sparkle, Stamp, Text, XMark} from '../props';
import {Dial, Frame, Icon, Magnifier, Row, SubButton, Bell} from '../props2';
import {Person, PriceTag, Raccoon} from '../props3';
import {Cat, House, LineChart} from '../props4';
import {Contract} from '../props5';
import {Paycheck, Scale, SlicePie} from '../props8';
import {Seesaw} from '../props16';
import {Cake, Chair, Dog, Elevator, Handcuffs, Hourglass, Ladder, Lumber, Ruler} from '../props30';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Dad: React.FC<SP> = (p) => <Stick acc={['fedora', 'glasses']} seed={12} {...p} />;
const Partner: React.FC<SP> = (p) => <Stick acc={['ponytail', 'glasses']} seed={55} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;

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

const UpArrow: React.FC<{x: number; y: number; s?: number; color?: string}> = ({x, y, s = 1, color = C.red}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M 0 -60 L 44 0 L 18 0 L 18 60 L -18 60 L -18 0 L -44 0 Z" fill={color} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
);

export const Ep30: React.FC = () => {
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
    const nf = w('o1', 'ninety');
    const bt = w('o1', 'bought');
    const os = w('o1', 'one');
    const kd = w('o1', 'kids');
    const dg = w('o1', 'biscuit');
    q(nf, 'flip', 0.5);
    q(bt, 'stamp', 0.6);
    q(os, 'cash', 0.6);
    q(kd, 'pop', 0.5);
    q(dg, 'boing', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Calendar x={180} y={180} s={0.55 * pop(f, 2) * bump(nf)} top="YEAR" year={1995} flip={0} />
          <House x={930} y={822} s={0.95 * pop(f, 2)} sold={f >= bt ? 'SOLD!' : 'FOR SALE'} />
          <Dad f={f} x={430} y={822} s={1.15 * pop(f, 3)} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: bt, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          <G2 x={430} y={330} s={pop(f, 4)}><Text size={44}>Dave's dad</Text></G2>
          <G2 x={500} y={470} s={0.7 * pop(f, 4) * bump(os)}><Paycheck amount="1 SALARY" /></G2>
          {[0, 1].map((i) => <Stick key={i} f={f} x={1420 + i * 120} y={822} s={0.55 * pop(f, 5 + i * 2) * bump(kd)} acc={i ? ['ponytail'] : []} seed={60 + i} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />)}
          <Dog f={f} x={1690} y={800} s={0.8 * pop(f, 6) * bump(dg, 0.25)} />
          <G2 x={1600} y={420} s={pop(f, 6)} o={lit(dg)}><Text size={40}>2 kids · a yard · Biscuit</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ft = w('o2', 'full');
    const ts = w('o2', 'two');
    const ca = w('o2', 'cant');
    q(ft, 'pop', 0.5);
    q(ts, 'cash', 0.6);
    q(ca, 'buzz', 0.7);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={330} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ca, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= ca} />
          <Partner f={f} x={560} y={822} s={1.05 * P('o2')} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ca, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
          {[0, 1].map((i) => <G2 key={i} x={330 + i * 230} y={380} s={0.55 * P('o2', 2) * bump(ts)}><Paycheck amount={`SALARY ${i + 1}`} /></G2>)}
          <House x={1330} y={822} s={0.9 * P('o2', 2)} sold="$$$$$" />
          <G2 x={1330} y={180} s={P('o2', 4) * bump(ca)}><Text size={60} color={f >= ca ? C.red : C.ink}>{f >= ca ? "still can't afford it" : '2 salaries...'}</Text></G2>
          <XMark x={1330} y={600} s={0.6 * pop(f, ca)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('o3', 'three');
    const fv = w('o3', 'five');
    q(th, 'pop', 0.6);
    q(fv, 'thud', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P('o3')}><Text size={58}>a typical house costs... years of income</Text></G2>
          <Ruler x={1080} y={420} s={P('o3', 2)} w={1100} max={5} val={ease(f, th - 4, th + 16, 0.4, 3.2)} color={C.green} label="1995" />
          <Ruler x={1080} y={660} s={P('o3', 4)} w={1100} max={5} val={ease(f, fv - 4, fv + 16, 0.4, 4.9)} color={C.red} label="TODAY" />
          <G2 x={1720} y={330} s={pop(f, th)}><Text size={46} color={C.green}>~3 years</Text></G2>
          <G2 x={1720} y={570} s={pop(f, fv)}><Text size={46} color={C.red}>~5 years</Text></G2>
          <Dave f={f} x={180} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: fv, pose: 'shock', expr: 'shock', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fy = w('o4', 'forty');
    const rc = w('o4', 'record');
    q(fy, 'ding', 0.6);
    q(rc, 'stamp', 0.7);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P('o4')}><Text size={56}>average first-time home buyer: age</Text></G2>
          <Cake f={f} x={960} y={640} s={1.2 * P('o4', 2) * bump(fy)} n={f >= fy ? '40' : '??'} lit={f >= fy ? 1 : 0} />
          <Dave f={f} x={380} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: fy, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <Grandma f={f} x={1560} y={880} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}]} />
          <G2 x={1560} y={440} s={P('o4', 4)}><Bubble text="Happy first house!" size={36} tail="down" /></G2>
          <Stamp x={1450} y={760} s={pop(f, rc, 9, 260)} text="RECORD" size={60} color={C.red} r={-8} />
          <SourceTag f={f} at={fy} text="NAR 2025 Profile of Home Buyers and Sellers" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ws = w('o5', 'wallstreet');
    const nb = w('o5', 'neighbor');
    const rc = w('o5', 'raccoon');
    q(ws, 'pop', 0.6);
    q(nb, 'pop', 0.6);
    q(rc, 'boing', 0.7);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P('o5')}><Text size={64}>WHO is buying the houses?</Text></G2>
          <Frame x={380} y={560} s={P('o5', 2) * bump(ws)} o={lit(ws)} w={460} h={560} label="Wall Street?">
            <Banker f={f} x={0} y={160} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} />
          </Frame>
          <Frame x={960} y={560} s={P('o5', 4) * bump(nb)} o={lit(nb)} w={460} h={560} label="your neighbor?">
            <Bob f={f} x={0} y={160} s={0.8} keys={[{at: 0, pose: 'wave', expr: 'happy'}]} />
          </Frame>
          <Frame x={1540} y={560} s={P('o5', 6) * bump(rc)} o={lit(rc)} w={460} h={560} label="a raccoon in a suit?">
            <Raccoon f={f} x={0} y={120} s={0.8} mood="sneaky" />
            <path d="M -16 40 L 16 40 L 8 110 L 0 124 L -8 110 Z" fill={C.red} stroke={C.ink} strokeWidth={4} />
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'price'), w('o6', 'rate'), w('o6', 'missing'), w('o6', 'investors'), w('o6', 'dave')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    const labels = ['PRICES', 'RATE TRAP', 'MISSING HOMES', 'INVESTORS', "DAVE'S MOVES"];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {labels.map((l, i) => (
            <Frame key={l} x={220 + i * 370} y={520} s={0.95 * P('o6', i * 2) * bump(pv[i])} o={lit(pv[i])} w={340} h={440} label={l}>
              {i === 0 && <PriceTag s={1.1} y={-50} text="$429K" />}
              {i === 1 && <Dial s={0.7} y={-20} v={0.8} label="RATES" />}
              {i === 2 && <House s={0.35} y={40} color="#fff" />}
              {i === 3 && <Banker f={f} x={0} y={110} s={0.55} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} />}
              {i === 4 && <Dave f={f} x={0} y={110} s={0.55} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dad vs Dave ============
  {
    const ru = w('c1a', 'ruler');
    const tf = w('c1b', 'thirty');
    const oh = w('c1c', 'one');
    const tp = w('c1c', 'three');
    const cb = w('c1d', 'census');
    const ez = w('c1d', 'eighty');
    const au = w('c1e', 'august');
    const fh = w('c1e', 'four');
    const fp = w('c1e', 'four', 1);
    const ld = w('c1f', 'ladder');
    const cl = w('c1f', 'climbed');
    const el = w('c1f', 'elevator');
    q(ru, 'pop', 0.5);
    q(tf, 'cash', 0.6);
    q(oh, 'ding', 0.6);
    q(tp, 'stamp', 0.6);
    q(cb, 'paper', 0.5);
    q(ez, 'cash', 0.6);
    q(fh, 'ding', 0.6);
    q(fp, 'thud', 0.7);
    q(ld, 'pop', 0.5);
    q(cl, 'step', 0.5);
    q(el, 'ding', 0.7);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={180} y={180} s={0.5 * P('c1a')} top="THEN" year={1995} flip={0} />
            <Dad f={f} x={330} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
            <Panel x={900} y={260} w={560} title="HOUSEHOLD INCOME / YEAR" value={V(tf, '$34,000')} color={C.green} s={P('c1a', 2) * bump(tf)} />
            <G2 x={1500} y={440} s={0.55 * P('c1a', 3)}><House sold={V(oh, '$110,000')} /></G2>
            <Ruler x={1060} y={640} s={P('c1a', 4) * bump(ru, 0.08)} w={1000} max={5} val={ease(f, tp - 4, tp + 16, 0.3, 3.2)} color={C.green} label="" />
            <G2 x={1060} y={780} s={P('c1a', 5)}><Text size={48}>{f >= tp ? '= 3.2 years of income' : 'years of income = ?'}</Text></G2>
            <SourceTag f={f} at={tf} text="Census CPS 1995: $34,076 · NAR 1995 median ≈ $110,500" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={180} y={180} s={0.5 * P('c1d')} top="NOW" year={2026} flip={0} />
            <Dave f={f} x={260} y={880} s={1.05} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: fp, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Partner f={f} x={430} y={880} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: fp, pose: 'facepalm', expr: 'sad'}]} />
            <Panel x={900} y={250} w={560} title="HOUSEHOLD INCOME / YEAR" value={V(ez, '$87,460')} color={C.green} s={P('c1d', 2) * bump(ez)} />
            <G2 x={1500} y={440} s={0.55 * P('c1d', 3) * bump(fh, 0.1)}><House sold={V(fh, '$429,100')} /></G2>
            <G2 x={1060} y={560} s={0.7 * P('c1d', 4)} o={0.6}><Ruler w={1000} max={5} val={3.2} color={C.green} label="1995" /></G2>
            <Ruler x={1060} y={700} s={P('c1d', 5)} w={1000} max={5} val={ease(f, fp - 4, fp + 16, 0.3, 4.9)} color={C.red} label="2026" />
            <G2 x={1500} y={820} s={P('c1d', 6)}><Text size={46} color={f >= fp ? C.red : C.ink}>{f >= fp ? '= 4.9 years of income' : 'years = ?'}</Text></G2>
            <SourceTag f={f} at={cb} until={au} text="U.S. Census Bureau: median household income 2025 = $87,460" />
            <SourceTag f={f} at={au} text="NAR: median existing-home price Aug 2026 = $429,100" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Ladder x={620} y={860} s={P('c1f')} h={640} lit={f >= cl ? Math.floor(lin(f, cl, cl + 30, 0, 3)) : -1} />
            <Stick f={f} x={620} y={lin(f, cl, cl + 30, 820, 640)} s={0.7} acc={['cap']} seed={24} keys={[{at: 0, pose: 'carry', expr: 'tired'}]} />
            <G2 x={620} y={960} s={P('c1f', 2)}><Text size={40}>INCOMES</Text></G2>
            <Elevator x={1240} y={860} s={P('c1f', 2)} h={700} car={ease(f, el, el + 30, 0, 1)} />
            {f >= el && <Sparkle x={1400} y={220} t={((f - el) % 30) / 30} s={0.8} />}
            <G2 x={1680} y={500} s={P('c1f', 4) * bump(el)}><Bubble text={f >= el ? 'going up!' : 'ding?'} size={40} tail="left" /></G2>
            <Dave f={f} x={240} y={880} s={1} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}, {at: el, pose: 'shock', expr: 'shock', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Rate trap ============
  {
    const br = w('c2a', 'borrow');
    const ir = w('c2a', 'interest');
    const mv = w('c2b', 'mortgage');
    const sv = w('c2b', 'seven');
    const fm = w('c2c', 'freddie');
    const sp = w('c2c', 'seven');
    const ya = w('c2c', 'ago');
    const ep = w('c2d', 'eight');
    const lm = w('c2d', 'less');
    const sx = w('c2e', 'six');
    const qt = w('c2e', 'quarter');
    const tw = w('c2f', 'two');
    const th = w('c2f', 'third');
    const dp = w('c2g', 'down');
    const em = w('c2g', 'eight');
    const wy = w('c2g', 'whole');
    q(br, 'pop', 0.5);
    q(ir, 'ding', 0.5);
    q(mv, 'flip', 0.5);
    q(sv, 'cash', 0.7);
    q(fm, 'paper', 0.5);
    q(sp, 'thud', 0.6);
    q(ya, 'tick', 0.5);
    q(ep, 'pop', 0.5);
    q(lm, 'ding', 0.5);
    q(sx, 'coin', 0.6);
    q(qt, 'ding', 0.5);
    q(tw, 'cash', 0.6);
    q(th, 'thud', 0.7);
    q(dp, 'pop', 0.5);
    q(em, 'coin', 0.5);
    q(wy, 'thud', 0.6);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: sv, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={900} y={560} s={0.75 * P('c2a')}><House /></G2>
            <PriceTag x={780} y={200} s={1.2 * P('c2a', 2)} text="$300,000" />
            <G2 x={1120} y={200} s={P('c2a', 3) * bump(sv, 0.25)} o={lit(sv)}><PriceTag s={1.2} text={V(sv, '$720,000')} color={C.red} /></G2>
            <Raccoon f={f} x={1560} y={760} s={0.9 * P('c2a', 4) * bump(ir)} mood="sneaky" holdCoin={f >= ir} />
            <G2 x={1560} y={400} s={P('c2a', 5)} o={lit(ir)}><Text size={48}>INTEREST</Text></G2>
            <G2 x={960} y={880} s={P('c2a', 6)} o={lit(mv)}><Text size={40} color="#5B6470">from our mortgage video (episode 3)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dial x={620} y={560} s={1.6 * P('c2c')} v={ease(f, sp - 6, sp + 16, 0.4, 0.82)} label="30-YEAR RATE" />
            <Panel x={1380} y={330} w={560} title="A YEAR AGO" value={V(ya, '6.30%')} s={P('c2c', 2) * bump(ya)} />
            <Panel x={1380} y={600} w={560} title="NOW (SEPT 24, 2026)" value={V(sp, '7.03%')} color={C.red} s={P('c2c', 4) * bump(sp)} />
            <UpArrow x={1720} y={470} s={0.7 * pop(f, sp)} />
            <Dave f={f} x={180} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}]} />
            <SourceTag f={f} at={fm} text="Freddie Mac PMMS, Sept 24, 2026: 7.03% (year ago 6.30%)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={130} s={P('c2d')}><Text size={56}>DAD · 1995</Text></G2>
            <G2 x={1360} y={130} s={P('c2d', 2)}><Text size={56} color={C.red}>DAVE · 2026</Text></G2>
            {[
              ['RATE', V(ep, '~8%'), V(A('c2f'), '~7%'), ep, A('c2f')],
              ['LOAN (80%)', V(lm, '$88,400'), V(A('c2f'), '$343,280'), lm, A('c2f')],
              ['MONTHLY', V(sx, '~$650'), V(tw, '~$2,300'), sx, tw],
              ['OF INCOME', V(qt, '< 1/4'), V(th, '~1/3'), qt, th],
            ].map(([l, a, b, ta, tb], i) => (
              <G2 key={String(l)} y={280 + i * 150} s={P('c2d', 2 + i * 2)}>
                <Text x={180} y={0} size={34} color="#5B6470">{String(l)}</Text>
                <G2 x={640} s={bump(Number(ta))} o={f >= Number(ta) ? 1 : 0.6}><Box w={440} h={110} fill={f >= Number(ta) ? '#E3F6EC' : '#fff'} /><Text size={52} color={C.green}>{String(a)}</Text></G2>
                <G2 x={1360} s={bump(Number(tb))} o={f >= Number(tb) ? 1 : 0.6}><Box w={440} h={110} fill={f >= Number(tb) ? '#FDE3EA' : '#fff'} /><Text size={52} color={C.red}>{String(b)}</Text></G2>
              </G2>
            ))}
            <Dad f={f} x={1700} y={500} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.8}]} />
            <Dave f={f} x={1790} y={880} s={0.7} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: th, pose: 'shock', expr: 'shock', look: -0.8}]} sweat={f >= th} />
            <SourceTag f={f} at={sx} text="Principal + interest, 20% down, 30 yrs · 7.93% (1995) vs 7.03% (2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('c2g')}><Text size={58}>20% down payment =</Text></G2>
            <G2 x={560} y={560} s={P('c2g', 2) * bump(em)}><MoneyStack n={3} s={1.1} label="$22,100" /></G2>
            <G2 x={560} y={800} s={P('c2g', 3)} o={lit(em)}><Text size={48} color={C.green}>Dad: ~8 months of income</Text></G2>
            <G2 x={1360} y={560} s={P('c2g', 4) * bump(wy)}><MoneyStack n={9} s={1.1} label="$85,820" /></G2>
            <G2 x={1360} y={800} s={P('c2g', 5)} o={lit(wy)}><Text size={48} color={C.red}>Dave: a WHOLE year</Text></G2>
            <Stamp x={1640} y={300} s={pop(f, wy, 9, 260)} text="1 YEAR" size={54} color={C.red} r={-8} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Golden handcuffs ============
  {
    const fs = w('c3a', 'sale');
    const wd = w('c3a', 'weird');
    const pd = w('c3b', 'pandemic');
    const tp = w('c3b', 'three');
    const lk = w('c3b', 'locked');
    const hf = w('c3c', 'half');
    const fp = w('c3c', 'four');
    const sl = w('c3d', 'sell');
    const sw = w('c3d', 'swap');
    const sv = w('c3d', 'seven');
    const jm = w('c3d', 'jumps');
    const sp = w('c3e', 'stay');
    const kd = w('c3e', 'kids');
    const lc = w('c3e', 'lock');
    const gh = w('c3f', 'golden');
    const lv = w('c3f', 'leave');
    const fw = w('c3f', 'fewer');
    q(fs, 'pop', 0.5);
    q(wd, 'boing', 0.5);
    q(pd, 'flip', 0.5);
    q(tp, 'whoosh', 0.5);
    q(lk, 'key', 0.7);
    q(hf, 'ding', 0.6);
    q(sl, 'pop', 0.5);
    q(sw, 'whoosh_s', 0.5);
    q(sv, 'thud', 0.6);
    q(jm, 'boing', 0.7);
    q(kd, 'step', 0.5);
    q(lc, 'clank', 0.7);
    q(gh, 'chime', 0.6);
    q(lv, 'buzz', 0.5);
    q(fw, 'trombone', 0.5);
    const ratePts = [4.5, 3.9, 3.1, 2.8, 3.1, 5.5, 6.8, 6.9, 6.3, 7.0];
    scene(A('c3a'), () =>
      f < A('c3b') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[0, 1, 2, 3].map((i) => <House key={i} x={560 + i * 380} y={822} s={0.5 * P('c3a', i * 2)} color={['#F4D6B8', '#CFE8F5', '#F7C6D0', '#E3F6EC'][i]} sold={i === 2 && f >= fs ? 'FOR SALE' : undefined} />)}
            <Dave f={f} x={220} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.8}]} />
            <Magnifier x={330} y={560} s={0.6 * P('c3a', 2)} />
            <G2 x={1100} y={200} s={P('c3a', 4) * bump(wd)}><Text size={56}>{f >= wd ? 'only ONE for sale?!' : 'homes for sale?'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={130} s={P('c3b')}><Text size={48}>30-year mortgage rate, 2018 → 2026</Text></G2>
            <LineChart x={640} y={500} s={P('c3b', 2)} w={900} h={440} t={ease(f, A('c3b'), hf, 0.3, 1)} pts={ratePts} lo={2} hi={8} color={C.blue} />
            <G2 x={500} y={800} s={P('c3b', 3) * bump(tp)}><Text size={46} color={f >= tp ? C.green : '#5B6470'}>{f >= tp ? 'pandemic: ~3%!' : 'pandemic: ?'}</Text></G2>
            <SlicePie x={1480} y={470} s={P('c3b', 4) * bump(hf, 0.1)} rad={260} t={1} slices={[{v: 0.525, c: C.gold, l: f >= hf ? '52.5%' : ''}, {v: 0.475, c: '#C9CED6'}]} pop={f >= hf ? 0 : -1} />
            <G2 x={1480} y={810} s={P('c3b', 5)} o={lit(fp)}><Text size={40}>of mortgages pay UNDER 4%</Text></G2>
            <G2 x={1480} y={140} s={P('c3b', 5) * bump(lk)}><Text size={44} color={f >= lk ? C.gold : C.ink}>locked-in cheap loans</Text></G2>
            <SourceTag f={f} at={hf} text="FHFA National Mortgage Database via Redfin, Q2 2025: 52.5% below 4%" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bob f={f} x={300} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: jm, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= jm} />
            <Panel x={760} y={300} w={400} title="OLD LOAN" value="4%" color={C.green} s={P('c3d', 2) * bump(sl)} />
            <path d="M 990 300 L 1110 300" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={lit(sw)} />
            <path d="M 1110 300 l -30 -24 l 0 48 Z" fill={C.ink} opacity={lit(sw)} />
            <Panel x={1360} y={300} w={400} title="NEW LOAN" value={V(sv, '7%')} color={C.red} s={P('c3d', 3) * bump(sv)} />
            <line x1={620} y1={840} x2={1600} y2={840} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[0, 1].map((i) => {
              const h = i === 0 ? 180 : ease(f, jm - 6, jm + 14, 190, 320);
              return (
                <G2 key={i} x={860 + i * 500} y={840} s={P('c3d', 4 + i * 2)}>
                  <rect x={-110} y={-h} width={220} height={h} rx={12} fill={i ? C.red : C.green} stroke={C.ink} strokeWidth={6} />
                  <Text y={-h - 40} size={38}>{i ? (f >= jm ? 'PAYMENT: UP!' : 'payment ?') : 'payment now'}</Text>
                </G2>
              );
            })}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <House x={640} y={822} s={1.05 * P('c3e')} color="#F4D6B8" />
            <Bob f={f} x={640} y={822} s={0.8} keys={[{at: 0, pose: 'pockets', expr: 'neutral'}, {at: gh, pose: 'hold', expr: 'worried'}]} />
            <Handcuffs x={640} y={180} s={0.9 * P('c3e', 2) * bump(gh, 0.25)} color={f >= gh ? C.gold : '#C9CED6'} />
            {f >= gh && <Sparkle x={820} y={120} t={((f - gh) % 30) / 30} s={0.7} />}
            <G2 x={1080} y={360} s={P('c3e', 3) * bump(kd)} o={lit(kd)}><Text size={38}>kids moved out · house too big</Text></G2>
            <G2 x={1080} y={200} s={P('c3e', 3) * bump(lc)}><Text size={60} color={f >= lc ? C.red : C.ink}>{f >= lc ? 'THE LOCK-IN EFFECT' : 'people stay put'}</Text></G2>
            <Dave f={f} x={1600} y={822} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.8}, {at: fw, pose: 'facepalm', expr: 'sad'}]} />
            <G2 x={1600} y={420} s={P('c3e', 4) * bump(fw)} o={lit(fw)}><Box w={400} h={100} fill={C.yellow} /><Text size={36}>fewer homes for Dave</Text></G2>
            <XMark x={1150} y={620} s={0.4 * pop(f, lv)} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Missing homes ============
  {
    const bd = w('c4a', 'build');
    const cr = w('c4b', 'crash');
    const bu = w('c4b', 'bust');
    const tn = w('c4b', 'ten');
    const ml = w('c4c', 'millennials');
    const hh = w('c4c', 'households');
    const nh = w('c4c', 'houses');
    const fm = w('c4d', 'freddie');
    const tp = w('c4d', 'three');
    const ug = w('c4d', 'growth');
    const t8 = w('c4d', 'three', 1);
    const mc = w('c4e', 'musical');
    const ep = w('c4e', 'eight');
    const st = w('c4e', 'stops');
    const ex = w('c4e', 'expensive');
    q(bd, 'pop', 0.5);
    q(cr, 'thud', 0.6);
    q(bu, 'poof', 0.6);
    q(tn, 'tick', 0.5);
    q(ml, 'crowd', 0.4);
    q(hh, 'pop', 0.5);
    q(nh, 'buzz', 0.5);
    q(fm, 'paper', 0.5);
    q(tp, 'ding', 0.6);
    q(t8, 'ding', 0.6);
    q(mc, 'boing', 0.5);
    q(st, 'stamp', 0.6);
    q(ex, 'cash', 0.7);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={260} y={822} s={1.05} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}]} />
            <Lumber x={760} y={822} s={1.1 * P('c4a', 2)} label="" />
            <Calendar x={1180} y={260} s={0.55 * P('c4a', 3) * bump(cr)} top="CRASH" year={2008} flip={0} />
            <Hourglass x={1520} y={560} s={P('c4a', 4)} t={ease(f, tn - 10, tn + 60, 0.1, 0.9)} />
            <G2 x={1520} y={780} s={P('c4a', 5)} o={lit(tn)}><Text size={40}>~10 years of slow building</Text></G2>
            <Stick f={f} x={1080} y={822} s={0.9 * P('c4a', 5)} acc={['cap']} seed={90} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: bu, pose: 'facepalm', expr: 'sad'}]} />
            <Stamp x={780} y={480} s={pop(f, bu, 9, 260)} text="BUILDERS: BUST" size={48} color={C.red} r={-6} />
            <G2 x={960} y={130} s={P('c4a', 1) * bump(bd)}><Text size={56}>America didn't build enough homes</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={150} s={P('c4c')} o={lit(hh)}><Text size={50}>new households</Text></G2>
            {Array.from({length: 7}).map((_, i) => <Stick key={i} f={f} x={180 + (i % 4) * 190} y={i < 4 ? 560 : 880} s={0.62 * P('c4c', 2 + i)} acc={i % 2 ? ['ponytail'] : ['hair']} seed={70 + i} keys={[{at: 0, pose: i % 3 ? 'wave' : 'celebrate', expr: 'happy'}]} />)}
            <G2 x={1420} y={150} s={P('c4c', 2)} o={lit(nh)}><Text size={50}>new houses</Text></G2>
            {[0, 1, 2].map((i) => <House key={i} x={1220 + i * 220} y={560} s={0.3 * P('c4c', 4 + i)} />)}
            {[0, 1, 2].map((i) => <rect key={i} x={1130 + i * 220} y={660} width={180} height={150} rx={10} fill="none" stroke="#9AA5B1" strokeWidth={5} strokeDasharray="14 10" opacity={P('c4c', 6)} />)}
            <G2 x={1420} y={880} s={P('c4c', 7) * bump(nh)}><Text size={44} color={C.red}>not enough!</Text></G2>
            <line x1={960} y1={220} x2={960} y2={860} stroke={C.ink} strokeWidth={5} strokeDasharray="10 12" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('c4d')}><Text size={58}>how many homes is America short?</Text></G2>
            <Panel x={620} y={420} w={620} h={240} title="FREDDIE MAC" value={V(tp, '~3.7 million')} color={C.red} s={P('c4d', 2) * bump(tp)} />
            <Panel x={1300} y={420} w={620} h={240} title="UP FOR GROWTH" value={V(t8, '~3.8 million')} color={C.red} s={P('c4d', 3) * bump(t8)} />
            {Array.from({length: 8}).map((_, i) => (
              <G2 key={i} x={380 + i * 165} y={760} s={0.22 * P('c4d', 4 + i)}>
                <path d="M -260 0 L -260 -300 L 0 -500 L 260 -300 L 260 0 Z" fill="none" stroke={f >= ug ? C.red : '#9AA5B1'} strokeWidth={22} strokeDasharray="40 30" />
              </G2>
            ))}
            <G2 x={960} y={850} s={P('c4d', 6)} o={lit(ug)}><Text size={40} color="#5B6470">missing homes</Text></G2>
            <SourceTag f={f} at={fm} text="Freddie Mac (2024) ≈ 3.7M · Up for Growth (Nov 2025) 3.78M" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c4e') * bump(mc)}><Text size={56}>musical chairs: 10 people, 8 chairs</Text></G2>
            {Array.from({length: 8}).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <Chair key={i} x={960 + Math.cos(a) * 330} y={560 + Math.sin(a) * 200} s={0.75 * P('c4e', 2 + i) * bump(ep)} taken={f >= st} color={f >= ex ? C.gold : C.blue} />;
            })}
            {Array.from({length: 10}).map((_, i) => {
              const a = (i / 10) * Math.PI * 2 + (f < st ? f / 30 : st / 30);
              return <Person key={i} x={960 + Math.cos(a) * 520} y={600 + Math.sin(a) * 300} s={0.55 * P('c4e', 3 + i)} c={i < 2 && f >= st ? C.red : C.ink} />;
            })}
            <G2 x={960} y={560} s={P('c4e', 6) * bump(ex)}><PriceTag s={1.1} text={f >= ex ? '$$$$' : '$'} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Why not build ============
  {
    const hl = w('c5a', 'harder');
    const zn = w('c5b', 'zoned');
    const na = w('c5b', 'apartments');
    const nt = w('c5b', 'townhouses');
    const lot = w('c5b', 'lot');
    const pm = w('c5c', 'permit');
    const yr = w('c5c', 'years');
    const nb = w('c5c', 'neighbors');
    const nh = w('c5c', 'here');
    const tf = w('c5d', 'twenty');
    const ld = w('c5e', 'land');
    const lb = w('c5e', 'lumber');
    const wk = w('c5e', 'workers');
    const fr = w('c5f', 'fair');
    const sf = w('c5f', 'safety');
    const pq = w('c5f', 'political');
    q(hl, 'pop', 0.5);
    q(zn, 'stamp', 0.6);
    q(na, 'buzz', 0.4);
    q(nt, 'buzz', 0.4);
    q(lot, 'pop', 0.5);
    q(pm, 'paper', 0.6);
    q(yr, 'tick', 0.5);
    q(nb, 'crowd', 0.5);
    q(nh, 'buzz', 0.6);
    q(tf, 'cash', 0.7);
    q(ld, 'pop', 0.5);
    q(lb, 'pop', 0.5);
    q(wk, 'pop', 0.5);
    q(sf, 'ding', 0.5);
    q(pq, 'stamp', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c5a') * bump(zn)}><Text size={52}>{f >= zn ? 'ZONING MAP: single-family only' : 'why not just build more?'}</Text></G2>
            {Array.from({length: 18}).map((_, i) => {
              const apt = i === 4 || i === 13;
              return (
                <G2 key={i} x={620 + (i % 6) * 190} y={290 + Math.floor(i / 6) * 200} s={P('c5a', 2 + i)}>
                  <rect x={-85} y={-85} width={170} height={170} rx={12} fill={apt ? '#CFE8F5' : f >= zn ? C.yellow : '#FFF3C4'} stroke={C.ink} strokeWidth={5} />
                  {apt ? <rect x={-30} y={-60} width={60} height={110} fill="#9AA5B1" stroke={C.ink} strokeWidth={4} /> : <House s={0.16} y={50} />}
                </G2>
              );
            })}
            <Dave f={f} x={220} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: na, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <Icon kind="rulebook" x={220} y={330} s={1.2 * P('c5a', 3) * bump(zn)} />
            <G2 x={220} y={480} s={P('c5a', 4)} o={lit(na)}><Text size={32} color={C.red}>no apartments</Text></G2>
            <G2 x={220} y={530} s={P('c5a', 4)} o={lit(nt)}><Text size={32} color={C.red}>no townhouses</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Contract x={560} y={460} s={0.9 * P('c5c') * bump(pm)} lines={['BUILDING PERMIT', 'form 1 of 27', 'waiting...']} signed={0} />
            <Hourglass x={960} y={440} s={P('c5c', 2)} t={ease(f, pm, nh, 0.1, 0.9)} />
            <G2 x={960} y={660} s={P('c5c', 3)} o={lit(yr)}><Text size={40}>months... years</Text></G2>
            {[0, 1, 2].map((i) => <Stick key={i} f={f} x={1340 + i * 180} y={880} s={0.85 * P('c5c', 4 + i)} acc={i === 1 ? ['bun', 'glasses'] : i ? ['cap'] : ['glasses']} seed={80 + i} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: nb, pose: 'point_l', expr: 'suspicious', look: -0.8}]} />)}
            <G2 x={1520} y={360} s={P('c5c', 6) * bump(nh)} o={lit(nb)}><Bubble text={'Build it...\njust not HERE!'} size={42} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c5d')}><Text size={54}>price of a new home: the rules part</Text></G2>
            <SlicePie x={640} y={540} s={P('c5d', 2) * bump(tf, 0.1)} rad={300} t={1} slices={[{v: 0.238, c: C.red, l: f >= tf ? 'RULES' : ''}, {v: 0.762, c: '#C9CED6', l: 'everything else'}]} pop={f >= tf ? 0 : -1} />
            <Panel x={1360} y={440} w={560} h={240} title="REGULATIONS" value={V(tf, '~24%')} color={C.red} size={110} s={P('c5d', 3) * bump(tf)} />
            <Stick f={f} x={1360} y={880} s={0.9} acc={['cap']} seed={90} keys={[{at: 0, pose: 'present', expr: 'tired', look: -0.8}]} />
            <SourceTag f={f} at={tf} text="NAHB (2021): regulation ≈ 23.8% of a new home's price" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={130} s={P('c5e')}><Text size={54}>the stuff costs more too</Text></G2>
            <G2 x={420} y={620} s={P('c5e', 2) * bump(ld)} o={lit(ld)}>
              <rect x={-200} y={-80} width={400} height={160} rx={14} fill="#B5D99C" stroke={C.ink} strokeWidth={6} />
              <Text y={4} size={52}>LAND</Text>
            </G2>
            <G2 x={960} y={700} s={P('c5e', 4) * bump(lb)} o={lit(lb)}><Lumber label="LUMBER" /></G2>
            <G2 x={1500} y={822} s={P('c5e', 6) * bump(wk)} o={lit(wk)}>
              <Stick f={f} x={0} y={0} s={1} acc={['cap']} seed={91} keys={[{at: 0, pose: 'carry', expr: 'tired'}]} />
              <Text y={-470} size={44}>WORKERS</Text>
            </G2>
            {[ld, lb, wk].map((x, i) => <UpArrow key={i} x={[640, 1200, 1680][i]} y={440} s={0.8 * P('c5e', 3 + i * 2) * bump(x, 0.3)} color={f >= x ? C.red : '#C9CED6'} />)}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={880} s={P('c5f')} tilt={ease(f, sf, sf + 20, -8, 0)} left="more homes, cheaper" right="safety · traffic · nature" />
            <G2 x={660} y={640} s={P('c5f', 2)}><House s={0.28} /></G2>
            <G2 x={1260} y={640} s={P('c5f', 3)}><Icon kind="warning" s={1.1} /></G2>
            <Dave f={f} x={220} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: pq, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={960} y={130} s={P('c5f', 4) * bump(pq)} o={lit(fr)}><Box w={1140} h={110} fill={f >= pq ? C.yellow : '#fff'} /><Text size={46}>a political question. Now you know the numbers.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Wall Street ============
  {
    const bq = w('c6a', 'question');
    const gi = w('c6b', 'giant');
    const np = w('c6b', 'nope');
    const th = w('c6b', 'three');
    const tw = w('c6c', 'twist');
    const bu = w('c6c', 'bunched');
    const at = w('c6d', 'atlanta');
    const on = w('c6d', 'one');
    const cp = w('c6d', 'compete');
    const sm = w('c6e', 'small');
    const sh = w('c6e', 'second');
    const ff = w('c6e', 'fifteen');
    const rp = w('c6f', 'problem');
    const ms = w('c6f', 'missing');
    q(bq, 'pop', 0.5);
    q(gi, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(th, 'ding', 0.6);
    q(tw, 'sting', 0.5);
    q(bu, 'pop', 0.5);
    q(at, 'stamp', 0.6);
    q(on, 'ding', 0.6);
    q(cp, 'crowd', 0.4);
    q(sm, 'pop', 0.5);
    q(ff, 'ding', 0.6);
    q(ms, 'thud', 0.6);
    const cities = [[380, 420, 0], [620, 360, 0], [760, 560, 0], [1000, 420, 0], [1150, 620, 1], [1260, 500, 0], [880, 660, 1], [1320, 330, 0], [520, 600, 1]] as const;
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Banker f={f} x={300} y={880} s={1.1 * P('c6a')} keys={[{at: 0, pose: 'hold', expr: 'smug', look: 0.8}, {at: np, pose: 'shrug', expr: 'neutral', look: 0.8}]} />
            {[0, 1, 2, 3, 4, 5].map((i) => <House key={i} x={520 + (i % 3) * 150} y={560 + Math.floor(i / 3) * 190} s={0.2 * P('c6a', 2 + i)} color={f >= np && i > 0 ? '#E8EEF1' : '#F4D6B8'} />)}
            <G2 x={640} y={180} s={P('c6a', 3) * bump(gi)}><Text size={46}>{f >= np ? 'myth!' : '"Wall Street owns everything!"'}</Text></G2>
            <Stamp x={640} y={340} s={pop(f, np, 9, 260)} text="NOPE" size={70} color={C.red} r={-8} />
            <SlicePie x={1400} y={500} s={P('c6a', 4) * bump(th, 0.1)} rad={280} t={1} slices={[{v: 0.03, c: C.red}, {v: 0.97, c: '#C9CED6', l: 'everyone else'}]} pop={f >= th ? 0 : -1} />
            <Panel x={1400} y={170} w={620} h={150} title="LARGE INVESTORS (1,000+ HOMES)" value={V(th, '~3%')} color={C.red} size={70} s={P('c6a', 5) * bump(th)} />
            <G2 x={1400} y={840} s={P('c6a', 6)}><Text size={36}>of single-family rental homes, nationally</Text></G2>
            <SourceTag f={f} at={th} text="GAO-24-106643 (2024) / Urban Institute estimates" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={820} y={520} s={P('c6c')}>
              <path d="M -560 -240 Q -300 -330 0 -290 Q 300 -320 520 -220 Q 600 -60 470 80 Q 380 220 200 180 Q 60 260 -60 190 Q -300 200 -470 120 Q -600 -20 -560 -240 Z" fill="#E3F1F4" stroke={C.ink} strokeWidth={6} />
            </G2>
            {cities.map(([x, y, big], i) => {
              const hot = big && f >= bu;
              const atl = i === 4;
              return <circle key={i} cx={x} cy={y} r={(atl && f >= at ? 70 : hot ? 44 : 22) * P('c6c', 2 + i)} fill={hot ? C.red : '#9AA5B1'} stroke={C.ink} strokeWidth={4} />;
            })}
            <G2 x={1150} y={720} s={P('c6c', 4) * bump(at)} o={lit(at)}><Text size={42} color={C.red}>ATLANTA</Text></G2>
            <G2 x={820} y={150} s={P('c6c', 2) * bump(tw)}><Text size={50}>{f >= bu ? 'bunched up in a few fast-growing cities' : 'spread out evenly?'}</Text></G2>
            <Panel x={1640} y={330} w={460} h={220} title="ATLANTA RENTAL HOUSES" value={V(on, '~1 in 4')} color={C.red} size={80} s={P('c6c', 5) * bump(on)} />
            {[0, 1, 2, 3].map((i) => <House key={i} x={1480 + (i % 2) * 320} y={i < 2 ? 640 : 830} s={0.22 * P('c6c', 6 + i)} color={i === 0 && f >= on ? C.red : '#F4D6B8'} />)}
            <G2 x={1640} y={880} s={P('c6c', 8)} o={lit(cp)}><Text size={32}>families compete with investors</Text></G2>
            <SourceTag f={f} at={at} text="Urban Institute / GAO: large investors ≈ 25% of Atlanta-area single-family rentals" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Bob f={f} x={380} y={822} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
            <G2 x={380} y={360} s={P('c6e', 2)} o={lit(sm)}><Text size={44}>small investors</Text></G2>
            <House x={900} y={822} s={0.5 * P('c6e', 2)} />
            <House x={1260} y={822} s={0.5 * P('c6e', 4) * bump(sh)} sold={f >= sh ? '2ND HOME' : undefined} color="#CFE8F5" />
            <Panel x={1600} y={300} w={460} h={220} title="SHARE OF SALES (AUG)" value={V(ff, '~15%')} color={C.blue} size={90} s={P('c6e', 6) * bump(ff)} />
            <SourceTag f={f} at={ff} text="NAR, Aug 2026: individual investors / second-home buyers = 15% of sales" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={880} s={P('c6f')} tilt={ease(f, ms - 4, ms + 16, 0, 12)} left="investors" right="missing homes" />
            <G2 x={660} y={630} s={P('c6f', 2)}><Banker f={f} x={0} y={0} s={0.45} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} /></G2>
            <G2 x={1260} y={640} s={P('c6f', 3)}>
              <path d="M -110 0 L -110 -120 L 0 -200 L 110 -120 L 110 0 Z" fill="none" stroke={C.red} strokeWidth={10} strokeDasharray="22 14" />
            </G2>
            <G2 x={960} y={150} s={P('c6f', 4) * bump(ms)}><Text size={50}>{f >= ms ? 'the big story: MISSING HOMES' : 'a real problem, in some places'}</Text></G2>
            <Dave f={f} x={220} y={880} s={0.95} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ms, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Age 40 ============
  {
    const tg = w('c7a', 'together');
    const fy = w('c7b', 'forty');
    const rh = w('c7b', 'high');
    const ne = w('c7b', 'nineteen');
    const tn = w('c7b', 'twenty');
    const t1 = w('c7c', 'twenty');
    const rl = w('c7c', 'low');
    const pr = w('c7d', 'rise');
    const wn = w('c7d', 'win');
    const pm = w('c7d', 'more');
    const t8 = w('c7e', 'twenty');
    const t4 = w('c7e', 'thirty');
    const rt = w('c7e', 'renting');
    const ct = w('c7e', 'cat');
    q(tg, 'pop', 0.5);
    q(fy, 'ding', 0.6);
    q(rh, 'stamp', 0.6);
    q(ne, 'flip', 0.5);
    q(tn, 'pop', 0.5);
    q(t1, 'ding', 0.6);
    q(rl, 'stamp', 0.6);
    q(pr, 'boing', 0.5);
    q(wn, 'cash', 0.6);
    q(pm, 'thud', 0.5);
    q(t8, 'pop', 0.5);
    q(t4, 'pop', 0.5);
    q(ct, 'pop2', 0.6);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c7a') * bump(tg)}><Text size={54}>median age of a first-time buyer</Text></G2>
            <Cake f={f} x={560} y={620} s={1.1 * P('c7a', 2) * bump(tn)} n={f >= tn ? '29' : '??'} lit={f >= tn ? 1 : 0} />
            <G2 x={560} y={800} s={P('c7a', 3)} o={lit(ne)}><Text size={48}>1981</Text></G2>
            <Cake f={f} x={1360} y={620} s={1.1 * P('c7a', 4) * bump(fy)} n={f >= fy ? '40' : '??'} lit={f >= fy ? 1 : 0} />
            <G2 x={1360} y={800} s={P('c7a', 5)}><Text size={48} color={C.red}>2025</Text></G2>
            <Stamp x={1640} y={300} s={pop(f, rh, 9, 260)} text="RECORD HIGH" size={46} color={C.red} r={-8} />
            <SourceTag f={f} at={fy} text="NAR 2025 Profile of Home Buyers and Sellers" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c7c')}><Text size={54}>first-time buyers, share of all buyers</Text></G2>
            <SlicePie x={700} y={540} s={P('c7c', 2) * bump(t1, 0.1)} rad={300} t={1} slices={[{v: 0.21, c: C.green, l: f >= t1 ? '21%' : ''}, {v: 0.79, c: '#C9CED6', l: 'repeat buyers'}]} pop={f >= t1 ? 0 : -1} />
            <Panel x={1420} y={420} w={520} h={240} title="FIRST-TIME BUYERS" value={V(t1, '21%')} color={C.green} size={110} s={P('c7c', 3) * bump(t1)} />
            <Stamp x={1420} y={680} s={pop(f, rl, 9, 260)} text="RECORD LOW" size={54} color={C.red} r={-6} />
            <Dave f={f} x={1740} y={900} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Seesaw x={960} y={860} s={P('c7d')} tilt={ease(f, pr - 4, pr + 20, 0, 12)} left="OWNERS" right="BUYERS" lc={C.green} rc={C.red} />
            <Grandma f={f} x={600} y={lin(ease(f, pr - 4, pr + 20), 0, 1, 700, 610)} s={0.8 * P('c7d', 2)} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: wn, pose: 'celebrate', expr: 'grin'}]} />
            <Dave f={f} x={1330} y={lin(ease(f, pr - 4, pr + 20), 0, 1, 700, 790)} s={0.8 * P('c7d', 3)} keys={[{at: 0, pose: 'hold', expr: 'neutral'}, {at: pm, pose: 'panic', expr: 'shock'}]} />
            <G2 x={520} y={250} s={P('c7d', 4) * bump(wn)} o={lit(wn)}><Text size={52} color={C.green}>prices rose: they win</Text></G2>
            <G2 x={1400} y={250} s={P('c7d', 5) * bump(pm)} o={lit(pm)}><Text size={52} color={C.red}>newcomers pay more</Text></G2>
            <House x={300} y={560} s={0.35 * P('c7d', 3)} sold={f >= pr ? '+$$$' : undefined} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Frame x={480} y={430} s={P('c7e')} w={600} h={520} label={f >= t8 ? 'Dad: first home at 28' : 'Dad: first home at ?'}>
              <House s={0.4} y={120} />
              <Dad f={f} x={-200} y={140} s={0.55} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            </Frame>
            <Dave f={f} x={1200} y={880} s={1.15 * P('c7e', 2)} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: rt, pose: 'shrug', expr: 'tired', look: 0.8}]} />
            <Cat f={f} x={1500} y={860} s={1.1 * P('c7e', 3) * bump(ct, 0.3)} />
            <G2 x={1360} y={260} s={P('c7e', 4) * bump(t4)}><Box w={620} h={130} fill={f >= rt ? C.yellow : '#fff'} /><Text size={46}>{f >= t4 ? 'Dave: 34 · still renting' : 'Dave: ?'}</Text></G2>
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
    const items = ['Renting is not throwing money away', 'Count the WHOLE monthly cost', 'Ask about first-time buyer help', 'Compare lenders', "Don't let anyone rush you"];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={700} y={100} s={P('c8a')}><Text size={56}>What Dave can actually do</Text></G2>
          <G2 x={700} y={160} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={270 + i * 130} s={0.85 * P('c8a', 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.blue} w={1180} />)}
          {cur > 1 && Array.from({length: cur - 1}).map((_, i) => <Check key={i} x={1060} y={270 + i * 130} s={0.8} />)}
          <G2 x={1620} y={560} s={P('c8a', 4)}>
            <Frame w={440} h={600}>
              {cur === 0 && <Dave f={f} x={0} y={200} s={0.8} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} />}
              {cur === 1 && <g><House s={0.3} y={30} /><Text y={120} size={34}>$300K → $720K</Text><Text y={180} size={30} color="#5B6470">moving soon? renting</Text><Text y={220} size={30} color="#5B6470">often makes sense</Text></g>}
              {cur === 2 && <g><Text y={-160} size={40}>monthly cost</Text>{['mortgage', '+ taxes', '+ insurance', '+ repairs'].map((l, k) => <Text key={l} y={-80 + k * 70} size={40} color={k ? C.red : C.ink}>{l}</Text>)}</g>}
              {cur === 3 && <g><MoneyStack n={4} s={0.8} y={-40} label="DOWN PAYMENT HELP" /><Text y={170} size={32}>ask your state / city</Text></g>}
              {cur === 4 && <g>{['LENDER A: 7.1%', 'LENDER B: 6.8%', 'LENDER C: 7.3%'].map((l, k) => <G2 key={l} y={-120 + k * 110}><Box w={380} h={90} fill={k === 1 ? '#E3F6EC' : '#fff'} /><Text size={36}>{l}</Text></G2>)}<Text y={220} size={30} color="#5B6470">(example numbers)</Text></g>}
              {cur === 5 && <g><Hourglass s={0.9} y={-40} t={0.4} /><Text y={180} size={40}>take your time</Text></g>}
            </Frame>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Recap ============
  const recap = ['~3 → ~5 years of income · rates near 7%', 'Cheap old loans lock owners in · millions of homes missing', 'Big investors: small nationally, big in some cities'];
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

  // ============ Series wrap ============
  {
    const wr = w('d2a', 'wrap');
    const ls = w('d2a', 'last');
    const tp = [
      w('d2b', 'gas'), w('d2b', 'i'), w('d2b', 'car'), w('d2b', 'k'),
      w('d2c', 'starbucks'), w('d2c', 'apple'), w('d2c', 'amazon'), w('d2c', 'subscriptions'), w('d2c', 'banks'), w('d2c', 'housing'),
    ];
    const tv = w('d2d', 'thirty');
    const nx = w('d2d', 'next');
    const cm = w('d2d', 'comments');
    const s4 = w('d2d', 'four');
    const sb = w('d2e', 'subscribe');
    const fr = w('d2e', 'free');
    const ic = w('d2e', 'income');
    q(wr, 'crowd', 0.5);
    q(ls, 'chime', 0.6);
    tp.forEach((x) => q(x, 'pop', 0.45));
    q(tv, 'ding', 0.6);
    q(nx, 'pop', 0.6);
    q(cm, 'mail', 0.6);
    q(s4, 'chime', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    q(ic, 'coin', 0.5);
    const eps = ['Gas prices', 'AI bubble?', 'Car loans', 'K-shaped economy', 'Starbucks', 'Apple', 'Amazon', 'Subscriptions', 'Bank savings', 'Housing'];
    scene(A('d2a'), () =>
      f < A('d2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('d2a') * bump(wr)}><Text size={70}>SERIES 3 COMPLETE</Text></G2>
            <G2 x={960} y={180} s={P('d2a', 1)} o={lit(ls)}><Text size={36} color="#5B6470">episodes 21 – 30</Text></G2>
            {eps.map((e, i) => {
              const on = f >= tp[i];
              return (
                <G2 key={e} x={260 + (i % 5) * 350} y={400 + Math.floor(i / 5) * 300} s={P('d2a', 2 + i) * bump(tp[i], 0.12)} o={on ? 1 : 0.45}>
                  <Box w={310} h={240} fill={i === 9 ? '#FFE3BF' : '#fff'} />
                  <circle cx={-110} cy={-80} r={34} fill={on ? (i === 9 ? C.red : C.blue) : '#CFC6B4'} stroke={C.ink} strokeWidth={5} />
                  <Text x={-110} y={-78} size={30} color="#fff">{i + 21}</Text>
                  <Text y={30} size={e.length > 12 ? 30 : 36}>{e}</Text>
                  {on && <path d="M -60 80 l 30 22 l 60 -50" fill="none" stroke={C.green} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />}
                </G2>
              );
            })}
          </Svg>
        </AbsoluteFill>
      ) : f < A('d2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: nx, pose: 'point_r', expr: 'happy', look: 0.8}]} />
            <G2 x={400} y={380} s={P('d2d') * bump(tv)}><Text size={44}>30 videos · 1 smarter Dave</Text></G2>
            <G2 x={1200} y={400} s={P('d2d', 2) * bump(nx, 0.08)}>
              <Box w={900} h={300} />
              <circle cx={-360} cy={-70} r={40} fill={C.gray} stroke={C.ink} strokeWidth={4} />
              <Text x={-300} y={-70} size={32} anchor="start" color="#5B6470">you · just now</Text>
              <Text x={-400} y={20} size={50} anchor="start">Dave, explain ______ next!</Text>
              <rect x={220} y={80} width={180} height={50} rx={25} fill={f >= cm ? C.blue : C.gray} />
              <Text x={310} y={106} size={28} color="#fff">COMMENT</Text>
            </G2>
            <G2 x={1200} y={680} s={P('d2d', 3)} o={lit(nx)}><Text size={48}>What should Dave explain next?</Text></G2>
            <G2 x={1200} y={840} s={P('d2d', 4) * bump(s4)} o={lit(s4)}><Stamp text="SERIES 4" size={56} color={C.blue} r={-4} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * P('d2e')} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={P('d2e', 2)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Dad f={f} x={1550} y={860} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
            <G2 x={960} y={680} s={P('d2e', 3) * bump(ic)}><Text size={46} color={f >= fr ? C.green : C.ink}>price: $0 · never 5 years of income</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2f', 'insurance') + 20;
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
