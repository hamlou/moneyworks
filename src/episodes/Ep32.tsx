import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, MoneyStack, SourceTag, Sparkle, Stamp, Text, XMark} from '../props';
import {CreditCard, Envelope, Frame, Row, SubButton, Bell} from '../props2';
import {Plate, PriceTag, Raccoon} from '../props3';
import {Burger, House, LineChart} from '../props4';
import {Contract} from '../props5';
import {Paycheck, Scale, SlicePie} from '../props8';
import {BlueCar} from '../props18';
import {Suv} from '../props23';
import {Escalator} from '../props24';
import {Couch, Jar} from '../props19';
import {Closet, LoanBar, TaxBucket, Wheel} from '../props32';
import {BillCard} from '../props31';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Boss: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={62} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

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

const UpArrow: React.FC<{x: number; y: number; s?: number; color?: string; r?: number}> = ({x, y, s = 1, color = C.red, r = 0}) => (
  <path transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} d="M 0 -60 L 44 0 L 18 0 L 18 60 L -18 60 L -18 0 L -44 0 Z" fill={color} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
);

const Bite: React.FC<{x: number; y: number; w: number; label: string; value: string; on: number; color?: string}> = ({x, y, w, label, value, on, color = C.red}) => (
  <G2 x={x} y={y} o={0.35 + 0.65 * on}>
    <rect x={-w / 2} y={-60} width={w} height={120} rx={14} fill={on ? color : '#fff'} stroke={C.ink} strokeWidth={5} />
    <Text y={-12} size={30} color={on ? '#fff' : '#5B6470'}>{label}</Text>
    <Text y={34} size={40} color={on ? '#fff' : '#5B6470'}>{on ? value : '?'}</Text>
  </G2>
);

export const Ep32: React.FC = () => {
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
    const rs = w('o1', 'raise');
    const fv = w('o1', 'five');
    const cb = w('o1', 'celebrates');
    const cr = w('o1', 'car');
    q(rs, 'chime', 0.6);
    q(fv, 'cash', 0.7);
    q(cb, 'crowd', 0.4);
    q(cr, 'ding', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={380} y={822} s={1.25 * pop(f, 2)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: cb, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          <G2 x={430} y={330} s={0.7 * pop(f, 3) * bump(fv)}><Paycheck amount={f >= fv ? '+$5,000' : 'RAISE!'} /></G2>
          <Suv x={1200} y={800} s={1.5 * pop(f, 4) * bump(cr, 0.08)} color={C.red} tag={f >= cr ? 'NEW!' : 'SALE'} />
          <G2 x={1200} y={330} s={pop(f, 5) * bump(cr)}><Text size={64} color={f >= cr ? C.red : C.ink}>{f >= cr ? 'brand new car!' : 'how to celebrate?'}</Text></G2>
          {f >= cb && <Sparkle x={1500} y={560} t={((f - cb) % 30) / 30} s={0.9} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sx = w('o2', 'six');
    const ls = w('o2', 'less');
    q(sx, 'flip', 0.5);
    q(ls, 'thud', 0.8);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={220} y={220} s={0.7 * P('o2') * bump(sx)} top="LATER" year="+6 mo" flip={0} />
          <G2 x={960} y={120} s={P('o2', 1)}><Text size={52}>money left at the end of the month</Text></G2>
          <line x1={640} y1={820} x2={1500} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <G2 x={820} y={820} s={P('o2', 2)}>
            <rect x={-120} y={-360} width={240} height={360} rx={14} fill={C.green} stroke={C.ink} strokeWidth={6} />
            <Text y={-400} size={48}>$450</Text>
            <Text y={52} size={34} color="#5B6470">before raise</Text>
          </G2>
          <G2 x={1320} y={820} s={P('o2', 3) * bump(ls, 0.08)}>
            <rect x={-120} y={-ease(f, ls - 4, ls + 16, 340, 80)} width={240} height={ease(f, ls - 4, ls + 16, 340, 80)} rx={14} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={-ease(f, ls - 4, ls + 16, 340, 80) - 40} size={48} color={C.red}>{V(ls, '$80')}</Text>
            <Text y={52} size={34} color="#5B6470">after raise</Text>
          </G2>
          <Dave f={f} x={260} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ls, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= ls} />
          <G2 x={1700} y={500} s={P('o2', 4)} o={lit(ls)}><Text size={32} color="#5B6470">(example)</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tx = w('o3', 'taxes');
    const pr = w('o3', 'prices');
    const lf = w('o3', 'lifestyle');
    q(tx, 'pop2', 0.6);
    q(pr, 'pop2', 0.6);
    q(lf, 'pop2', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o3')}><Text size={56}>who ate Dave's raise?</Text></G2>
          <Frame x={380} y={540} s={P('o3', 1) * bump(tx)} o={lit(tx)} w={480} h={520} label="taxes">
            <Paycheck s={0.55} y={-40} amount="$5,000" cut={f >= tx ? 0.27 : 0} />
          </Frame>
          <Frame x={960} y={540} s={P('o3', 2) * bump(pr)} o={lit(pr)} w={480} h={520} label="prices">
            <PriceTag s={1.2} y={-60} text="+3.4%" color={C.red} />
            <UpArrow x={130} y={-40} s={0.7} />
          </Frame>
          <Frame x={1540} y={540} s={P('o3', 3) * bump(lf)} o={lit(lf)} w={480} h={520} label="Dave's new lifestyle">
            <Suv s={0.8} y={0} color={C.red} />
            <Dave f={f} x={130} y={160} s={0.4} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tp = w('o4', 'typical');
    const tr = w('o4', 'three');
    const fr = w('o4', 'four');
    const nt = w('o4', 'nothing');
    q(tp, 'paper', 0.5);
    q(tr, 'cash', 0.6);
    q(fr, 'thud', 0.7);
    q(nt, 'trombone', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o4')}><Text size={56}>2026: raise vs prices</Text></G2>
          <line x1={420} y1={840} x2={1300} y2={840} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <G2 x={640} y={840} s={P('o4', 1) * bump(tr, 0.08)}>
            <rect x={-130} y={-ease(f, tr - 4, tr + 16, 80, 500)} width={260} height={ease(f, tr - 4, tr + 16, 80, 500)} rx={14} fill={C.green} stroke={C.ink} strokeWidth={6} />
            <Text y={-ease(f, tr - 4, tr + 16, 80, 500) - 44} size={60} color={C.green}>{V(tr, '3.5%')}</Text>
            <Text y={52} size={36} color="#5B6470">typical raise</Text>
          </G2>
          <G2 x={1080} y={840} s={P('o4', 2) * bump(fr, 0.08)}>
            <rect x={-130} y={-ease(f, fr - 4, fr + 16, 80, 486)} width={260} height={ease(f, fr - 4, fr + 16, 80, 486)} rx={14} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={-ease(f, fr - 4, fr + 16, 80, 486) - 44} size={60} color={C.red}>{V(fr, '3.4%')}</Text>
            <Text y={52} size={36} color="#5B6470">prices</Text>
          </G2>
          <G2 x={1620} y={460} s={P('o4', 3) * bump(nt)}><Box w={440} h={170} fill={f >= nt ? C.yellow : '#fff'} /><Text y={-22} size={38}>left over:</Text><Text y={32} size={50} color={C.red}>{V(nt, '~0.1%')}</Text></G2>
          <Dave f={f} x={1620} y={900} s={0.85} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: nt, pose: 'facepalm', expr: 'sad'}]} />
          <SourceTag f={f} at={tp} text="WTW 2026 salary budgets: 3.5% · BLS CPI Aug 2026: +3.4%" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('o5', 'worse');
    const sc = w('o5', 'scared');
    const br = w('o5', 'bracket');
    const sp = w('o5', 'spoiler');
    q(wr, 'sting', 0.5);
    q(sc, 'boing', 0.5);
    q(br, 'pop', 0.5);
    q(sp, 'stamp', 0.7);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P('o5') * bump(wr)}><Text size={58}>it gets worse...</Text></G2>
          <Stick f={f} x={420} y={880} s={1.15 * P('o5', 1)} acc={['ponytail']} seed={44} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: sc, pose: 'panic', expr: 'shock', look: 0.8}]} sweat={f >= sc} />
          <G2 x={420} y={380} s={P('o5', 2) * bump(sc)}><Bubble text={'a raise?! NO!\nhigher bracket!'} size={40} tail="down" /></G2>
          <G2 x={1080} y={560} s={P('o5', 3) * bump(br)}><Paycheck s={0.8} amount="RAISE" /></G2>
          <XMark x={1080} y={560} s={0.6 * P('o5', 3)} />
          <Stamp x={1500} y={560} s={pop(f, sp, 9, 260)} text="MYTH" size={90} color={C.red} r={-10} />
          <G2 x={1500} y={330} s={P('o5', 4)} o={lit(sp)}><Text size={44}>it doesn't work like that</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'raise'), w('o6', 'myth'), w('o6', 'profits'), w('o6', 'keep')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    const labels = ['WHERE IT GOES', 'BRACKET MYTH', 'WHO PROFITS', 'KEEP MORE'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {labels.map((l, i) => (
            <Frame key={l} x={270 + i * 460} y={540} s={P('o6', i * 2) * bump(pv[i])} o={lit(pv[i])} w={420} h={520} label={l}>
              {i === 0 && <Paycheck s={0.5} y={-40} amount="+$5,000" cut={0.6} />}
              {i === 1 && <TaxBucket s={0.8} y={-20} rate="22%" level={0.3} color={C.red} />}
              {i === 2 && <Raccoon f={f} x={0} y={40} s={0.7} mood="sneaky" holdCoin />}
              {i === 3 && <Jar s={0.8} y={-20} level={0.6} label="HALF" />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dave's big raise ============
  {
    const gd = w('c1a', 'good');
    const bo = w('c1b', 'boss');
    const sx = w('c1b', 'sixty');
    const sv = w('c1b', 'seventy');
    const fv = w('c1b', 'five');
    const tw = w('c1c', 'twelve');
    const fr = w('c1c', 'four');
    const qk = w('c1c', 'quickly');
    const cr = w('c1d', 'car');
    const ap = w('c1d', 'apartment');
    const dn = w('c1d', 'dinners');
    const er = w('c1d', 'earned');
    const pa = w('c1e', 'paper');
    const pk = w('c1e', 'pocket');
    q(gd, 'chime', 0.5);
    q(bo, 'pop', 0.5);
    q(sx, 'coin', 0.5);
    q(sv, 'cash', 0.7);
    q(fv, 'ding', 0.6);
    q(tw, 'flip', 0.5);
    q(fr, 'coin', 0.6);
    q(qk, 'boing', 0.5);
    q(cr, 'pop', 0.5);
    q(ap, 'pop', 0.5);
    q(dn, 'pop', 0.5);
    q(er, 'ding', 0.5);
    q(pa, 'paper', 0.5);
    q(pk, 'coin', 0.5);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Boss f={f} x={1500} y={880} s={1.15 * P('c1a')} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}]} />
            <Dave f={f} x={360} y={880} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: sv, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <G2 x={1500} y={400} s={P('c1a', 1) * bump(bo)}><Bubble text="Dave, got a minute?" size={40} tail="down" /></G2>
            <Panel x={900} y={300} w={520} title="OLD SALARY" value={V(sx, '$65,000')} s={P('c1a', 2) * bump(sx)} />
            <Panel x={900} y={560} w={520} title="NEW SALARY" value={V(sv, '$70,000')} color={C.green} s={P('c1a', 3) * bump(sv)} />
            <G2 x={900} y={780} s={P('c1a', 4) * bump(fv)}><Box w={520} h={110} fill={f >= fv ? C.yellow : '#fff'} /><Text size={52} color={C.green}>{V(fv, '+$5,000 / year')}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={300} s={P('c1c') * bump(tw)}><Text size={100}>$5,000 ÷ 12</Text></G2>
            <G2 x={760} y={560} s={P('c1c', 2) * bump(fr)}><Box w={620} h={180} fill={f >= fr ? '#E3F6EC' : '#fff'} /><Text size={100} color={C.green}>{V(fr, '$417/mo')}</Text></G2>
            <G2 x={760} y={800} s={P('c1c', 3)} o={lit(fr)}><Text size={40} color="#5B6470">...on paper</Text></G2>
            <Dave f={f} x={1500} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: qk, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <G2 x={1500} y={400} s={P('c1c', 4) * bump(qk)}><Bubble text={f >= qk ? 'SO much money!' : 'hmm...'} size={42} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c1d')}><Text size={54}>Dave's upgrade list</Text></G2>
            <Frame x={380} y={520} s={P('c1d', 1) * bump(cr)} o={lit(cr)} w={480} h={480} label="new car"><Suv s={0.8} y={0} color={C.red} /></Frame>
            <Frame x={960} y={520} s={P('c1d', 2) * bump(ap)} o={lit(ap)} w={480} h={480} label="bigger apartment"><House s={0.35} y={80} /></Frame>
            <Frame x={1540} y={520} s={P('c1d', 3) * bump(dn)} o={lit(dn)} w={480} h={480} label="nicer dinners"><Plate s={0.9} y={-20} label="" big><Burger s={0.5} y={-30} /></Plate></Frame>
            <Dave f={f} x={960} y={1010} s={0.5} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
            <G2 x={1540} y={870} s={P('c1d', 4) * bump(er)} o={lit(er)}><Text size={44} color={C.green}>"I earned it!"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={480} s={P('c1e') * bump(pa)}><Paycheck amount="$417/mo" /></G2>
            <G2 x={640} y={700} s={P('c1e', 1)}><Text size={44} color="#5B6470">on paper</Text></G2>
            <path d="M 1000 480 L 1200 480" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={P('c1e', 2)} />
            <path d="M 1210 480 l -34 -26 l 0 52 Z" fill={C.ink} opacity={P('c1e', 2)} />
            <G2 x={1460} y={480} s={P('c1e', 3) * bump(pk)}><Box w={380} h={260} fill="#fff" /><Text y={-40} size={40}>in his pocket:</Text><Text y={40} size={90} color={C.red}>?</Text></G2>
            <Dave f={f} x={1460} y={940} s={0.7} keys={[{at: 0, pose: 'pockets', expr: 'suspicious', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Tax bracket myth ============
  {
    const my = w('c2a', 'myth');
    const mp = w('c2b', 'most');
    const al = w('c2b', 'all');
    const ls = w('c2b', 'less');
    const np = w('c2b', 'nope');
    const bk = w('c2c', 'buckets');
    const fi = w('c2c', 'first');
    const fu = w('c2c', 'full');
    const sp = w('c2c', 'spills');
    const sx = w('c2d', 'sixteen');
    const zr = w('c2d', 'zero');
    const tn = w('c2e', 'ten');
    const tw = w('c2e', 'twelve');
    const ff = w('c2e', 'fifty');
    const tt = w('c2e', 'twenty');
    const th = w('c2f', 'three');
    const on = w('c2f', 'only');
    const sm = w('c2f', 'same');
    const nv = w('c2g', 'never');
    const ms = w('c2g', 'most');
    q(my, 'sting', 0.5);
    q(al, 'thud', 0.6);
    q(ls, 'buzz', 0.5);
    q(np, 'stamp', 0.8);
    q(bk, 'pop', 0.5);
    q(fu, 'ding', 0.5);
    q(sp, 'whoosh_s', 0.6);
    q(sx, 'ding', 0.5);
    q(zr, 'pop', 0.5);
    q(tn, 'pop', 0.5);
    q(tw, 'pop', 0.5);
    q(ff, 'ding', 0.5);
    q(tt, 'thud', 0.6);
    q(th, 'coin', 0.6);
    q(on, 'ding', 0.6);
    q(sm, 'chime', 0.5);
    q(nv, 'stamp', 0.7);
    q(ms, 'cash', 0.6);
    const bks = [
      ['0%', '$16,100', '#9EDDB0'],
      ['10%', 'to $12,400', C.green],
      ['12%', 'to $50,400', C.blue],
      ['22%', 'to $105,700', C.red],
    ] as const;
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2a') * bump(my)}><Text size={56}>MYTH: "a raise can cost you money"</Text></G2>
            <Frame x={620} y={540} s={P('c2a', 1)} w={760} h={560} label={f >= al ? 'ALL your pay at the higher rate?' : 'what most people think'}>
              <G2 y={-60}>
                <Box w={560} h={140} fill={f >= al ? '#FDE3EA' : '#fff'} />
                <Text size={70} color={f >= al ? C.red : C.ink}>{f >= al ? 'ALL × 22%' : '$70,000'}</Text>
              </G2>
              <G2 y={120} o={lit(ls)}><Text size={50} color={C.red}>take home LESS?!</Text></G2>
            </Frame>
            <Stamp x={620} y={520} s={pop(f, np, 9, 260)} text="NOPE" size={110} color={C.red} r={-10} />
            <Dave f={f} x={1480} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: ls, pose: 'shock', expr: 'shock', look: -0.8}, {at: np, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
            <G2 x={1480} y={400} s={P('c2a', 3)} o={lit(mp)}><Bubble text={f >= np ? 'phew!' : 'is that true?'} size={42} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P('c2c') * bump(bk)}><Text size={52}>tax brackets = a row of buckets</Text></G2>
            {bks.map(([r, cap, c], i) => {
              const on = [sx, tn, tw, tt][i];
              const lv = i === 0 ? ease(f, fi, fu, 0.15, 1) : i === 1 ? ease(f, sp, sp + 20, 0.05, 1) : i === 2 ? ease(f, tw, tw + 24, 0.05, 1) : 0.05;
              return (
                <G2 key={r} x={330 + i * 420} y={500} s={P('c2c', 1 + i) * bump(on, 0.1)}>
                  <TaxBucket rate={r} level={lv} color={c} cap={f >= on ? cap : ''} hl={i === 3 && f >= ff ? 1 : 0} />
                  {i < 3 && <path d="M 130 -120 Q 200 -200 280 -120" fill="none" stroke={C.blue} strokeWidth={10} strokeLinecap="round" opacity={f >= sp ? 1 : 0.2} />}
                </G2>
              );
            })}
            <G2 x={960} y={820} s={P('c2c', 5) * bump(ff)}><Box w={1280} h={110} fill={f >= ff ? C.yellow : '#fff'} /><Text size={40}>{f >= ff ? '22% only on taxable income ABOVE $50,400' : f >= zr ? 'first $16,100: taxed at ZERO (standard deduction)' : 'fill one bucket, then spill into the next'}</Text></G2>
            <SourceTag f={f} at={sx} text="IRS, tax year 2026 (single): std. deduction $16,100 · 10% / 12% / 22% brackets" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P('c2f')}><Text size={52}>Dave's taxable income: $48,900 → $53,900</Text></G2>
            <G2 x={420} y={520} s={P('c2f', 1) * bump(sm, 0.06)}><TaxBucket rate="12%" level={1} color={C.blue} cap="stays the SAME" hl={f >= sm ? 1 : 0} w={300} h={380} /></G2>
            <G2 x={980} y={520} s={P('c2f', 2) * bump(th, 0.1)}><TaxBucket rate="22%" level={ease(f, th - 4, th + 20, 0.02, 0.35)} color={C.red} cap={f >= th ? '$3,500 spills in' : 'empty'} w={300} h={380} /></G2>
            <G2 x={1520} y={440} s={P('c2f', 3) * bump(on)}><Box w={520} h={220} fill={f >= on ? C.yellow : '#fff'} /><Text y={-40} size={40}>only this part</Text><Text y={30} size={60} color={C.red}>$3,500 × 22%</Text></G2>
            <Dave f={f} x={1520} y={920} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: sm, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={860} s={P('c2g')} tilt={ease(f, ms, ms + 20, 0, -12)} left="YOU KEEP" right="tax" />
            <G2 x={660} y={440} s={P('c2g', 1) * bump(ms)}><MoneyStack n={f >= ms ? 5 : 3} s={0.7} /></G2>
            <G2 x={1260} y={460} s={P('c2g', 2)}><MoneyStack n={1} s={0.7} /></G2>
            <G2 x={960} y={130} s={P('c2g', 3) * bump(nv)}><Box w={1260} h={120} fill={f >= nv ? C.yellow : '#fff'} /><Text size={46}>a raise can NEVER lower your take-home (fed. income tax)</Text></G2>
            <Dave f={f} x={200} y={900} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 First bites ============
  {
    const bt = w('c3a', 'bite');
    const nn = w('c3b', 'nine');
    const so = w('c3c', 'social');
    const sv = w('c3c', 'seven');
    const th = w('c3c', 'three');
    const st = w('c3d', 'state');
    const tt = w('c3e', 'three');
    const mo = w('c3e', 'month');
    const fr = w('c3e', 'four');
    const gd = w('c3f', 'good');
    const cr = w('c3f', 'car');
    q(bt, 'crinkle', 0.6);
    q(nn, 'pop2', 0.6);
    q(so, 'paper', 0.5);
    q(th, 'pop2', 0.6);
    q(st, 'pop2', 0.5);
    q(tt, 'thud', 0.7);
    q(mo, 'ding', 0.6);
    q(fr, 'buzz', 0.5);
    q(gd, 'coin', 0.5);
    q(cr, 'boing', 0.6);
    const left = f >= tt ? 3667 : f >= th ? 3667 : f >= nn ? 4050 : 5000;
    scene(A('c3a'), () =>
      f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P('c3a') * bump(bt)}><Text size={54}>the raise: $5,000 a year</Text></G2>
            <G2 x={960} y={320} s={P('c3a', 1)}>
              <rect x={-700} y={-70} width={1400} height={140} rx={20} fill={C.green} stroke={C.ink} strokeWidth={6} />
              <rect x={700 - 1400 * (1 - left / 5000)} y={-70} width={1400 * (1 - left / 5000)} height={140} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
              <Text x={-660} y={4} size={60} color="#fff" anchor="start">{`$${left.toLocaleString('en-US')}`}</Text>
            </G2>
            <Bite x={420} y={600} w={440} label="federal income tax" value="-$950" on={f >= nn ? 1 : 0} />
            <Bite x={960} y={600} w={500} label="Social Security + Medicare" value={f >= th ? '-$383' : '7.65%'} on={f >= sv ? 1 : 0} />
            <Bite x={1500} y={600} w={440} label="state tax (maybe)" value="-$ varies" on={f >= st ? 1 : 0} color={C.gold} />
            <G2 x={960} y={850} s={P('c3a', 3) * bump(tt)}><Box w={900} h={130} fill={f >= tt ? C.yellow : '#fff'} /><Text size={54}>{f >= mo ? '≈ $305/month · not $417' : f >= tt ? '≈ $3,667 a year' : 'what\'s left?'}</Text></G2>
            <Dave f={f} x={1780} y={960} s={0.55} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: fr, pose: 'shock', expr: 'worried', look: -0.8}]} />
            <SourceTag f={f} at={so} text="IRS 2026 brackets · SSA: 6.2% + 1.45% payroll tax (math in description)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={600} y={320} s={P('c3f') * bump(gd)}><Paycheck s={0.8} amount="$305/mo" /></G2>
            <G2 x={600} y={520} s={P('c3f', 1)} o={lit(gd)}><Text size={44} color={C.green}>still good money!</Text></G2>
            <Suv x={1300} y={800} s={1.3 * P('c3f', 2)} color={C.red} tag="$600/mo" />
            <G2 x={1300} y={420} s={P('c3f', 3) * bump(cr)} o={lit(cr)}><Box w={560} h={110} fill={C.yellow} /><Text size={40}>picked with the $417 number</Text></G2>
            <Dave f={f} x={300} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: cr, pose: 'facepalm', expr: 'sad'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Inflation ============
  {
    const pr = w('c4a', 'prices');
    const nm = w('c4b', 'nominal');
    const rl = w('c4b', 'real');
    const by = w('c4b', 'buy');
    const inf = w('c4c', 'inflation');
    const th = w('c4c', 'three');
    const bu = w('c4d', 'bureau');
    const fl = w('c4d', 'fell');
    const zr = w('c4d', 'zero');
    const es = w('c4e', 'escalator');
    const sw = w('c4e', 'sweating');
    const hi = w('c4e', 'higher');
    const ff = w('c4f', 'fifty');
    const on = w('c4f', 'one');
    const tw = w('c4g', 'two');
    const nc = w('c4g', 'car');
    q(pr, 'pop', 0.5);
    q(nm, 'paper', 0.5);
    q(rl, 'ding', 0.5);
    q(by, 'cash', 0.5);
    q(inf, 'pop', 0.5);
    q(th, 'thud', 0.6);
    q(bu, 'paper', 0.5);
    q(fl, 'thud', 0.7);
    q(es, 'pop', 0.5);
    q(sw, 'boing', 0.5);
    q(hi, 'trombone', 0.4);
    q(ff, 'coin', 0.5);
    q(on, 'pop2', 0.7);
    q(tw, 'ding', 0.6);
    q(nc, 'buzz', 0.5);
    const cpi = [2.9, 3.0, 2.8, 2.7, 2.9, 3.1, 3.0, 3.2, 3.3, 3.2, 3.3, 3.4, 3.4];
    const wage = [3.9, 3.8, 3.7, 3.6, 3.6, 3.4, 3.4, 3.3, 3.2, 3.2, 3.1, 3.1, 3.1];
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c4a') * bump(pr)}><Text size={56}>two kinds of pay</Text></G2>
            <Frame x={560} y={520} s={P('c4a', 1) * bump(nm)} o={lit(nm)} w={640} h={560} label="NOMINAL: the number">
              <Paycheck s={0.8} y={-60} amount="$70,000" />
            </Frame>
            <Frame x={1360} y={520} s={P('c4a', 2) * bump(rl)} o={lit(rl)} w={640} h={560} label="REAL: what it can BUY">
              <G2 y={-60} s={bump(by, 0.2)}><Burger s={0.6} x={-140} /><House s={0.22} x={40} y={80} /><PriceTag s={0.8} x={170} y={-40} text="$$" /></G2>
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={110} s={P('c4c')}><Text size={50}>12 months to Aug 2026 (%)</Text></G2>
            <LineChart x={700} y={500} s={P('c4c', 1)} w={900} h={440} t={ease(f, A('c4c'), th + 20, 0.3, 1)} pts={cpi} lo={2.4} hi={4.2} color={C.red} />
            <LineChart x={700} y={500} s={P('c4c', 1)} w={900} h={440} t={ease(f, A('c4c'), th + 20, 0.3, 1)} pts={wage} lo={2.4} hi={4.2} color={C.green} axes={false} />
            <G2 x={1240} y={300} s={P('c4c', 2)} o={lit(inf)}><Text size={36} color={C.red} anchor="start">prices 3.4%</Text></G2>
            <G2 x={1240} y={370} s={P('c4c', 2)}><Text size={36} color={C.green} anchor="start">wages ~3.1%</Text></G2>
            <Panel x={1560} y={640} w={560} h={240} title="REAL HOURLY EARNINGS" value={V(zr, '−0.3%')} color={C.red} size={100} s={P('c4c', 3) * bump(fl)} />
            <G2 x={700} y={880} s={P('c4c', 4)} o={lit(inf)}><Text size={36} color="#5B6470">(illustrative path · endpoints from BLS)</Text></G2>
            <SourceTag f={f} at={bu} text="BLS Real Earnings, Aug 2026: real avg hourly earnings −0.3% over the year" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Escalator f={f} x={960} y={620} s={1.2 * P('c4e') * bump(es, 0.05)} dir="down" label="INFLATION" len={900} />
            <Dave f={f} x={960 + Math.sin(f / 5) * 8} y={500} s={0.8} keys={[{at: 0, pose: 'carry', expr: 'tired', look: 0.8}]} sweat={f >= sw} />
            <G2 x={1540} y={220} s={P('c4e', 2)}><Text size={50} color={C.green}>raise = walking up</Text></G2>
            <G2 x={420} y={900} s={P('c4e', 3) * bump(hi)} o={lit(hi)}><Box w={620} h={100} fill={C.yellow} /><Text size={40}>...not getting much higher</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P('c4f')}><Text size={52}>Dave's raise, after prices</Text></G2>
            <Panel x={400} y={380} w={520} title="AFTER TAX" value="$3,667" color={C.green} s={P('c4f', 1)} />
            <Text x={720} y={400} size={90}>−</Text>
            <Panel x={1040} y={380} w={520} title={f >= ff ? '3.4% × ~$50K SPENDING' : 'SAME LIFE COSTS MORE'} value={V(on, '$1,700')} color={C.red} s={P('c4f', 2) * bump(on)} />
            <Text x={1360} y={400} size={90}>=</Text>
            <Panel x={1640} y={380} w={440} title="REAL RAISE" value={V(tw, '~$2,000')} color={C.blue} s={P('c4f', 3) * bump(tw)} />
            <Suv x={1000} y={800} s={0.9 * P('c4f', 4)} color={C.red} />
            <XMark x={1000} y={760} s={0.6 * pop(f, nc)} />
            <G2 x={1540} y={760} s={P('c4f', 5)} o={lit(nc)}><Text size={44}>nice... not "new car" nice</Text></G2>
            <Dave f={f} x={300} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: nc, pose: 'shrug', expr: 'tired', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Lifestyle creep ============
  {
    const dv = w('c5a', 'dave');
    const pd = w('c5b', 'paid');
    const ug = w('c5b', 'ugly');
    const fr = w('c5b', 'free');
    const sh = w('c5b', 'shiny');
    const ed = w('c5c', 'edmunds');
    const sv = w('c5c', 'seven');
    const oi = w('c5c', 'one');
    const sx = w('c5d', 'six');
    const st = w('c5d', 'seven');
    const mr = w('c5d', 'more');
    const ap = w('c5e', 'apartment');
    const dn = w('c5e', 'dinners');
    const cz = w('c5e', 'crazy');
    const cp = w('c5f', 'creep');
    const cl = w('c5f', 'closet');
    const fl = w('c5f', 'fills');
    q(dv, 'sting', 0.5);
    q(pd, 'ding', 0.5);
    q(ug, 'boing', 0.5);
    q(fr, 'coin', 0.5);
    q(sh, 'chime', 0.6);
    q(ed, 'paper', 0.5);
    q(sv, 'cash', 0.6);
    q(oi, 'thud', 0.6);
    q(sx, 'cash', 0.6);
    q(st, 'thud', 0.7);
    q(mr, 'buzz', 0.5);
    q(ap, 'pop', 0.5);
    q(dn, 'pop', 0.5);
    q(cp, 'stamp', 0.6);
    q(cl, 'pop', 0.5);
    q(fl, 'pop2', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={110} s={P('c5a') * bump(dv)}><Text size={56}>the biggest bite: Dave himself</Text></G2>
            <BlueCar x={520} y={800} s={1.3 * P('c5a', 1)} dent />
            <G2 x={520} y={500} s={P('c5a', 2) * bump(fr)}><Box w={380} h={110} fill={f >= pd ? '#E3F6EC' : '#fff'} /><Text size={40} color={C.green}>{f >= fr ? 'PAID OFF: $0/mo' : 'old car'}</Text></G2>
            <Suv x={1380} y={800} s={1.3 * P('c5a', 3) * bump(sh, 0.08)} color={C.red} tag="NEW" />
            {f >= sh && <Sparkle x={1560} y={600} t={((f - sh) % 30) / 30} s={0.9} />}
            <Dave f={f} x={960} y={822} s={1} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.8}, {at: sh, pose: 'point_r', expr: 'grin', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Panel x={560} y={300} w={640} h={240} title="AVG NEW-CAR PAYMENT (Q2 2026)" value={V(sv, '$777/mo')} color={C.red} size={96} s={P('c5c') * bump(sv)} />
            <G2 x={560} y={520} s={P('c5c', 1) * bump(oi)} o={lit(oi)}><Text size={44}>1 in 5 buyers: $1,000+ a month</Text></G2>
            <G2 x={1360} y={330} s={P('c5c', 2) * bump(sx)}><BillCard s={1.3} label="DAVE'S CAR" amount={V(sx, '$600/mo')} /></G2>
            <line x1={440} y1={900} x2={1500} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={700} y={900} s={P('c5c', 3)}>
              <rect x={-120} y={-180} width={240} height={180} rx={12} fill={C.green} stroke={C.ink} strokeWidth={6} />
              <Text y={-210} size={44} color={C.green}>raise $5,000</Text>
            </G2>
            <G2 x={1200} y={900} s={P('c5c', 4) * bump(st, 0.08)}>
              <rect x={-120} y={-ease(f, st - 4, st + 16, 60, 260)} width={240} height={ease(f, st - 4, st + 16, 60, 260)} rx={12} fill={C.red} stroke={C.ink} strokeWidth={6} />
              <Text y={-ease(f, st - 4, st + 16, 60, 260) - 30} size={44} color={C.red}>{V(st, 'car $7,200/yr')}</Text>
            </G2>
            <Dave f={f} x={1700} y={900} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: mr, pose: 'shock', expr: 'shock', look: -0.8}]} sweat={f >= mr} />
            <SourceTag f={f} at={ed} text="Edmunds, Q2 2026: record $777 average new-car payment; 1 in 5 pay $1,000+" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P('c5e')}><Text size={54}>a little upgrade here, a little there</Text></G2>
            {[
              ['car', '+$600', A('c5e')],
              ['apartment', '+$300', ap],
              ['dinners', '+$150', dn],
              ['streaming 4K', '+$10', cz],
            ].map(([l, v, at], i) => (
              <G2 key={String(l)} x={460 + i * 330} y={520 - i * 60} s={P('c5e', 1 + i) * bump(Number(at), 0.1)} o={f >= Number(at) ? 1 : 0.4}>
                <Box w={290} h={150} fill={f >= Number(at) ? '#FDE3EA' : '#fff'} />
                <Text y={-28} size={34}>{String(l)}</Text>
                <Text y={32} size={50} color={C.red}>{String(v)}</Text>
              </G2>
            ))}
            <Couch x={960} y={860} s={0.8 * P('c5e', 5)} tag="NEW" />
            <Dave f={f} x={1600} y={880} s={1} keys={[{at: 0, pose: 'relax', expr: 'happy', look: -0.8}, {at: cz, pose: 'shrug', expr: 'neutral', look: -0.8}]} />
            <G2 x={400} y={860} s={P('c5e', 6)} o={lit(cz)}><Text size={40}>nothing crazy...</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={P('c5f') * bump(cp)}><Text size={60} color={f >= cp ? C.red : C.ink}>LIFESTYLE CREEP</Text></G2>
            <Closet x={560} y={860} s={P('c5f', 1) * bump(cl, 0.06)} wide={1} fill={1} />
            <G2 x={560} y={950} s={P('c5f', 1)}><Text size={36} color="#5B6470">old closet: full</Text></G2>
            <Closet x={1340} y={860} s={P('c5f', 2) * bump(fl, 0.06)} wide={1.8} fill={f >= fl ? 1 : 0.2} />
            <G2 x={1340} y={950} s={P('c5f', 2)}><Text size={36} color={f >= fl ? C.red : '#5B6470'}>{f >= fl ? 'bigger closet: ALSO full' : 'bigger closet'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Hedonic treadmill ============
  {
    const su = w('c6a', 'surprised');
    const am = w('c6b', 'amazing');
    const tw = w('c6b', 'three');
    const js = w('c6b', 'just');
    const ps = w('c6c', 'psychologists');
    const hd = w('c6c', 'hedonic');
    const nt = w('c6c', 'nineteen');
    const fs = w('c6c', 'fast');
    const n8 = w('c6d', 'nineteen');
    const lt = w('c6d', 'lottery');
    const hp = w('c6d', 'happier');
    const wo = w('c6d', 'wore');
    const rn = w('c6e', 'run');
    const sm = w('c6e', 'same');
    const hm = w('c6e', 'hamster');
    q(su, 'sting', 0.5);
    q(am, 'chime', 0.6);
    q(tw, 'tick', 0.5);
    q(js, 'trombone', 0.5);
    q(ps, 'paper', 0.5);
    q(hd, 'stamp', 0.6);
    q(nt, 'flip', 0.5);
    q(fs, 'whoosh_s', 0.5);
    q(lt, 'cash', 0.6);
    q(hp, 'ding', 0.5);
    q(wo, 'poof', 0.5);
    q(rn, 'step', 0.5);
    q(sm, 'thud', 0.6);
    q(hm, 'boing', 0.6);
    const joy = [2, 9.5, 8.8, 7.5, 6, 4.5, 3.4, 2.8, 2.5, 2.4, 2.4];
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={110} s={P('c6a') * bump(su)}><Text size={52}>Dave's happiness with the new car</Text></G2>
            <LineChart x={700} y={520} s={P('c6a', 1)} w={900} h={440} t={ease(f, am - 10, js + 10, 0.2, 1)} pts={joy} lo={0} hi={10} color={C.gold} />
            <G2 x={420} y={250} s={P('c6a', 2) * bump(am)} o={lit(am)}><Text size={44} color={C.green}>AMAZING!</Text></G2>
            <G2 x={1080} y={600} s={P('c6a', 3) * bump(js)} o={lit(tw)}><Text size={40} color="#5B6470">~3 weeks later: "just a car"</Text></G2>
            <Suv x={1540} y={640} s={0.9 * P('c6a', 4)} color={f >= js ? '#B98B94' : C.red} />
            <Dave f={f} x={1540} y={960} s={0.6} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.8}, {at: js, pose: 'idle', expr: 'neutral', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6c') * bump(hd)}><Text size={60}>{f >= hd ? 'the HEDONIC TREADMILL' : 'psychologists have a name for it'}</Text></G2>
            <Calendar x={380} y={380} s={0.8 * P('c6c', 1) * bump(nt)} top="PAPER" year={1971} flip={0} />
            <G2 x={380} y={600} s={P('c6c', 2)} o={lit(nt)}><Text size={36}>Brickman & Campbell</Text></G2>
            <G2 x={380} y={680} s={P('c6c', 3)} o={lit(fs)}><Text size={40} color={C.red}>we get used to it, FAST</Text></G2>
            <Calendar x={1200} y={380} s={0.8 * P('c6c', 3) * bump(n8)} top="STUDY" year={1978} flip={0} />
            <G2 x={1200} y={660} s={P('c6c', 4) * bump(lt)} o={lit(lt)}><MoneyStack n={5} s={0.6} label="LOTTERY" /></G2>
            <G2 x={1620} y={420} s={P('c6c', 5) * bump(hp)} o={lit(hp)}><Box w={400} h={160} fill={f >= wo ? C.yellow : '#fff'} /><Text y={-22} size={34}>not much happier</Text><Text y={28} size={34}>than regular people</Text></G2>
            <Stick f={f} x={1620} y={900} s={0.8 * P('c6c', 6)} acc={['cap']} seed={88} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.8}, {at: wo, pose: 'idle', expr: 'neutral', look: -0.8}]} />
            <SourceTag f={f} at={ps} text="Brickman & Campbell (1971); Brickman, Coates & Janoff-Bulman (1978)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Wheel f={f} x={960} y={560} s={1.1 * P('c6e')} spin={f >= rn ? 2 : 0.5} />
            <Dave f={f} x={960} y={770} s={0.7} keys={[{at: 0, pose: 'carry', expr: 'tired'}]} sweat={f >= sm} />
            <G2 x={380} y={300} s={P('c6e', 1) * bump(rn)}><Text size={48}>{f >= rn ? 'earn more → buy more' : 'run faster...'}</Text></G2>
            <G2 x={380} y={420} s={P('c6e', 2) * bump(sm)} o={lit(sm)}><Text size={48} color={C.red}>same place</Text></G2>
            <G2 x={1540} y={380} s={P('c6e', 3) * bump(hm)} o={lit(hm)}><BillCard s={1} label="CAR PAYMENT" amount="$600" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Who profits ============
  {
    const wn = w('c7a', 'wins');
    const ld = w('c7b', 'lenders');
    const bg = w('c7b', 'bigger');
    const lg = w('c7b', 'longer');
    const ed = w('c7c', 'edmunds');
    const tw = w('c7c', 'twenty');
    const ei = w('c7c', 'eighty');
    const yr = w('c7c', 'years');
    const lo = w('c7d', 'longer');
    const sm = w('c7d', 'smaller');
    const it = w('c7d', 'interest');
    const rc = w('c7d', 'raccoon');
    const cr = w('c7e', 'credit');
    const hl = w('c7e', 'higher');
    const ad = w('c7e', 'ads');
    const ds = w('c7e', 'deserve');
    const fr = w('c7f', 'fair');
    const sg = w('c7f', 'sign', 1);
    q(wn, 'pop', 0.5);
    q(ld, 'pop', 0.5);
    q(bg, 'cash', 0.5);
    q(lg, 'whoosh_s', 0.5);
    q(ed, 'paper', 0.5);
    q(tw, 'thud', 0.7);
    q(yr, 'tick', 0.5);
    q(sm, 'ding', 0.5);
    q(it, 'thud', 0.6);
    q(rc, 'boing', 0.6);
    q(cr, 'pop', 0.5);
    q(hl, 'ding', 0.5);
    q(ad, 'pop', 0.5);
    q(ds, 'chime', 0.5);
    q(sg, 'stamp', 0.5);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={110} s={P('c7a') * bump(wn)}><Text size={56}>who wins when Dave upgrades?</Text></G2>
            <Banker f={f} x={1500} y={822} s={1.1 * P('c7a', 1) * bump(ld, 0.08)} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.8}]} />
            <G2 x={1500} y={380} s={P('c7a', 2) * bump(bg)} o={lit(ld)}><Bubble text={f >= bg ? 'bigger salary?\nborrow MORE!' : 'hello, Dave!'} size={38} tail="down" /></G2>
            <Contract x={900} y={520} s={0.7 * P('c7a', 3) * bump(lg, 0.08)} lines={['CAR LOAN', f >= lg ? 'term: 84 months' : 'term: 60 months', 'sign here ___']} signed={0} />
            <Dave f={f} x={380} y={822} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P('c7c')}><Text size={52}>new-car loans, Q2 2026</Text></G2>
            <LoanBar x={1060} y={260} s={P('c7c', 1)} months={60} label="60 mo" color={C.green} w={1100} />
            <LoanBar x={1060} y={380} s={P('c7c', 2) * bump(ei, 0.05)} months={f >= ei ? 84 : 72} label={f >= ei ? '84 mo' : '72 mo'} color={C.red} w={1100} />
            <Panel x={560} y={620} w={620} h={220} title="LOANS 84+ MONTHS" value={V(tw, '23.9%')} color={C.red} size={96} s={P('c7c', 3) * bump(tw)} />
            <G2 x={560} y={800} s={P('c7c', 4)} o={lit(yr)}><Text size={44}>= 7 years of payments</Text></G2>
            <G2 x={1360} y={620} s={P('c7c', 5) * bump(sm, 0.1)}><Box w={560} h={200} fill="#fff" /><Text y={-40} size={40} color={C.green}>{f >= sm ? 'monthly: smaller' : 'monthly: ?'}</Text><Text y={30} size={40} color={C.red}>{f >= it ? 'interest: MORE' : 'total: ?'}</Text></G2>
            <Raccoon f={f} x={1600} y={900} s={0.7 * P('c7c', 6) * bump(rc, 0.2)} mood={f >= rc ? 'happy' : 'sneaky'} holdCoin={f >= it} />
            <SourceTag f={f} at={ed} text="Edmunds, Q2 2026: record 23.9% of new-car loans 84+ months; avg term 70.4 mo" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={500} y={420} s={P('c7e') * bump(hl)}><CreditCard s={1.2} label="DAVE" /></G2>
            <G2 x={500} y={640} s={P('c7e', 1) * bump(hl)} o={lit(cr)}><Text size={44} color={f >= hl ? C.red : C.ink}>{f >= hl ? 'LIMIT: raised!' : 'your income?'}</Text></G2>
            <G2 x={1020} y={400} s={P('c7e', 2) * bump(cr, 0.1)}><Envelope label="PRE-APPROVED!" /></G2>
            <G2 x={1500} y={380} s={P('c7e', 3) * bump(ad)} o={lit(ad)}>
              <rect x={-240} y={-160} width={480} height={320} rx={20} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
              <rect x={-220} y={-140} width={440} height={280} rx={10} fill={C.yellow} />
              <Text y={-20} size={48}>{f >= ds ? 'YOU DESERVE IT' : 'AD'}</Text>
              <Text y={50} size={34} color={C.red}>upgrade today!</Text>
            </G2>
            <Dave f={f} x={1000} y={900} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: ds, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {['UPGRADE', 'NEW CAR', 'BIGGER HOME', 'YOU DESERVE IT'].map((l, i) => (
              <G2 key={l} x={1000 + (i % 2) * 460} y={260 + Math.floor(i / 2) * 240} s={P('c7f', i) * bump(sg, 0.1)}>
                <rect x={-200} y={-70} width={400} height={140} rx={14} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
                <path d="M 200 -30 L 250 0 L 200 30 Z" fill={C.ink} />
                <Text size={36}>{l}</Text>
              </G2>
            ))}
            <Dave f={f} x={380} y={822} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: 0.8}, {at: sg, pose: 'think', expr: 'suspicious', look: 0.8}]} />
            <G2 x={1230} y={800} s={P('c7f', 4)} o={lit(fr)}><Box w={740} h={100} fill="#fff" /><Text size={38}>nobody forces Dave to sign...</Text></G2>
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
    const th = w('c8d', 'thirteen');
    const tc = w('c8e', 'total');
    const th3 = w('c8e', 'thirty');
    const rv = w('c8f', 'review');
    q(th, 'cash', 0.6);
    q(tc, 'pop', 0.5);
    q(th3, 'tick', 0.5);
    q(rv, 'chime', 0.5);
    const items = ['Save half, automatically', 'Enjoy the other half', 'Bump retirement savings', 'Total cost + wait 30 days', 'Check your REAL raise'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100} s={P('c8a')}><Text size={56}>Keep more of every raise</Text></G2>
          <G2 x={650} y={160} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={280 + i * 130} s={0.85 * P('c8a', 2 + i)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.green} w={1060} />)}
          {cur > 1 && Array.from({length: cur - 1}).map((_, i) => <Check key={i} x={960} y={280 + i * 130} s={0.8} />)}
          <G2 x={1540} y={560} s={P('c8a', 3)}>
            <Frame w={600} h={680}>
              {cur === 0 && <g><Paycheck s={0.6} y={-120} amount="RAISE" /><Dave f={f} x={0} y={260} s={0.6} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} /></g>}
              {cur === 1 && <g><SlicePie s={0.8} y={-60} rad={200} t={1} slices={[{v: 0.5, c: C.green, l: 'SAVE'}, {v: 0.5, c: C.gold, l: 'LIVE'}]} /><Text y={240} size={36}>auto-transfer: day 1</Text></g>}
              {cur === 2 && <g><Plate s={1} y={-40} label="guilt free" big><Burger s={0.5} y={-30} /></Plate><Text y={240} size={36} color={C.green}>a raise should feel like one</Text></g>}
              {cur === 3 && <g><Text y={-230} size={34}>Save More Tomorrow</Text><Jar s={0.8} y={0} level={ease(f, hs[2], th + 10, 0.12, 0.7)} label="401(k)" /><Text y={240} size={46} color={C.green}>{f >= th ? '3.5% → 13.6%' : '3.5% → ?'}</Text></g>}
              {cur === 4 && <g><PriceTag s={1} y={-200} text="$600/mo" /><Text y={-80} size={40} color={C.red}>{f >= tc ? '= $50,400 total' : 'total = ?'}</Text><Calendar s={0.7} y={120} top="WAIT" year="30 d" flip={0} /></g>}
              {cur >= 5 && <g><Scale s={0.6} y={180} tilt={-6} left="raise" right="inflation" /><Text y={-220} size={40}>raise &gt; inflation?</Text><Text y={230} size={34} color={f >= rv ? C.blue : '#5B6470'}>useful at your next review</Text></g>}
            </Frame>
          </G2>
          <SourceTag f={f} at={th} text="Thaler & Benartzi (2004), Save More Tomorrow, J. of Political Economy" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 Dave's do-over ============
  {
    const rw = w('c9a', 'rewind');
    const kp = w('c9b', 'kept');
    const tr = w('c9b', 'transfer');
    const hf = w('c9b', 'half');
    const on = w('c9c', 'one');
    const dn = w('c9c', 'dinners');
    const ev = w('c9d', 'every');
    const bt = w('c9d', 'better');
    const fs = w('c9d', 'faster');
    q(rw, 'whoosh', 0.6);
    q(kp, 'pop', 0.5);
    q(tr, 'coin', 0.6);
    q(hf, 'ding', 0.5);
    q(on, 'cash', 0.7);
    q(dn, 'pop', 0.5);
    q(ev, 'ding', 0.5);
    q(bt, 'chime', 0.5);
    q(fs, 'chime', 0.7);
    const yrs = [0, 1, 2, 3, 4, 5];
    scene(A('c9a'), () =>
      f < A('c9d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={110} s={P('c9a') * bump(rw)}><Text size={56}>{'<< REWIND'}</Text></G2>
            <BlueCar x={420} y={800} s={1.2 * P('c9a', 1) * bump(kp, 0.08)} dent />
            <G2 x={420} y={560} s={P('c9a', 2)} o={lit(kp)}><Text size={40} color={C.green}>kept: $0/mo</Text></G2>
            <G2 x={960} y={420} s={P('c9a', 3) * bump(tr)}><Paycheck s={0.6} amount="+$305/mo" /></G2>
            <path d="M 1120 470 L 1300 560" stroke={C.ink} strokeWidth={8} strokeLinecap="round" opacity={lit(tr)} />
            <Jar x={1440} y={700} s={0.9 * P('c9a', 4) * bump(on, 0.1)} level={ease(f, tr, on + 20, 0.1, 0.7)} label="$150/mo" />
            <G2 x={1440} y={330} s={P('c9a', 5) * bump(on)}><Box w={420} h={110} fill={f >= on ? C.yellow : '#fff'} /><Text size={50} color={C.green}>{V(on, '$1,800/yr')}</Text></G2>
            <G2 x={960} y={640} s={P('c9a', 6) * bump(dn)} o={lit(hf)}><Plate s={0.7} label="half: nicer dinners" big><Burger s={0.4} y={-30} /></Plate></G2>
            <Dave f={f} x={760} y={822} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c9d') * bump(ev)}><Text size={52}>every raise: half to life, half to savings</Text></G2>
            <line x1={300} y1={860} x2={1620} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {yrs.map((y, i) => {
              const life = 160 + i * 30;
              const sav = 20 + i * i * 14;
              const on2 = f >= bt;
              return (
                <G2 key={y} x={400 + i * 240} y={860} s={P('c9d', 1 + i * 0.5)}>
                  <rect x={-90} y={-life} width={80} height={life} rx={8} fill={C.gold} stroke={C.ink} strokeWidth={4} />
                  <rect x={10} y={-(on2 ? sav : 20)} width={80} height={on2 ? sav : 20} rx={8} fill={C.green} stroke={C.ink} strokeWidth={4} opacity={f >= fs ? 1 : 0.6} />
                  <Text y={44} size={30} color="#5B6470">{`yr ${y}`}</Text>
                </G2>
              );
            })}
            <G2 x={500} y={260} s={P('c9d', 4)}><rect x={-20} y={-20} width={40} height={40} fill={C.gold} stroke={C.ink} strokeWidth={4} /><Text x={40} size={36} anchor="start">life gets better</Text></G2>
            <G2 x={500} y={330} s={P('c9d', 4) * bump(fs)}><rect x={-20} y={-20} width={40} height={40} fill={C.green} stroke={C.ink} strokeWidth={4} /><Text x={40} size={36} anchor="start" color={f >= fs ? C.green : C.ink}>savings get better FASTER</Text></G2>
            <Dave f={f} x={1760} y={900} s={0.7} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <G2 x={1400} y={330} s={P('c9d', 5)}><Text size={30} color="#5B6470">(illustration)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ RECAP ============
  const recap = ['A bracket only taxes the EXTRA dollars', 'Taxes, inflation & creep can eat a raise', 'Save half of every raise, enjoy the rest'];
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
    const bg = w('r5', 'burger');
    const tw = w('r5', 'twenty');
    const sb = w('r6', 'subscribe');
    const rq = w('r6', 'raise');
    q(bg, 'pop', 0.6);
    q(tw, 'sting', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(rq, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('r5')}><Text size={58}>Next: the $12 burger that costs $28</Text></G2>
            <Burger x={1150} y={600} s={1.3 * P('r5', 1) * bump(bg, 0.1)} />
            <G2 x={1550} y={420} s={P('r5', 2) * bump(tw, 0.2)} r={8}><PriceTag s={1.3} text={f >= tw ? '$28' : '$12'} color={f >= tw ? C.red : C.yellow} /></G2>
            <Dave f={f} x={450} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: tw, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Boss f={f} x={1550} y={860} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
            <G2 x={960} y={680} s={pop(f, sb - 6) * bump(rq)}><Text size={46} color={f >= rq ? C.green : C.ink}>price: $0 · no raise required</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2g', 'dollar') + 20;
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
