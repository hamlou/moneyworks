import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Car, Desk, MoneyStack, Pencil, SourceTag, Stamp, Text, XMark} from '../props';
import {Envelope, Mailbox, Row, Sign, SubButton, Bell} from '../props2';
import {SourceCard, Raccoon} from '../props3';
import {Pizza} from '../props4';
import {DamageMeter, GuessCard, Pill} from '../props58';
import {TradingPhone, OptionCoupon, WholesalerHQ, ExchangeBooth, ToggleSwitch, Puppy, StudyPaper} from '../props51';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Wholesaler: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={88} {...p} />;

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
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const Ep51: React.FC = () => {
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

  let damage = 0;
  const dmg = (id: string, val: number) => {
    if (f >= w(id, 'damage') || f >= w(id, 'ninety') || f >= w(id, 'four') || f >= w(id, 'sixteen')) damage = val;
  };

  // ============ HOOK ============
  const o1Scene = (ff: number) => {
    const ls = w('o1', 'lost');
    const cf = w('o1', 'confetti');
    return (
      <AbsoluteFill>
        <Interior />
        <Cam f={ff} keys={[[0, 1.15, 960, 560], [40, 1.0, 960, 540]]}>
          <Svg>
            <Dave f={ff} x={420} y={930} s={1.2} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
            <TradingPhone f={ff} x={1000} y={520} s={0.95 * bump(ls, 0.08)} balance="$400" change="-$600" color={C.red} confetti={ff >= cf ? ease(ff, cf, cf + 30) : 0} />
            <G2 x={1000} y={200} s={bump(ls, 0.15)} o={lt(ls, 0.35)}><Pill text="LOST $600" color={C.red} size={48} /></G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  {
    q(2, 'tick', 0.4);
    q(w('o1', 'six'), 'thud', 0.7);
    q(w('o1', 'confetti'), 'flutter', 0.5);
    scene(0, () => o1Scene(f), false);
  }
  const FR = A('o2');
  const RW = w('o2', 'rewind');
  {
    q(FR, 'sting', 0.7);
    q(RW, 'whoosh', 0.7);
    q(RW + 4, 'flip', 0.6);
    scene(FR, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}</AbsoluteFill>
        <AbsoluteFill style={{background: '#fff', opacity: 1 - ease(f, FR, FR + 8)}} />
        <Svg>
          <G2 x={420} y={240} s={P(FR) * bump(w('o2', 'dave'), 0.12)}>
            <Stamp text="THAT'S DAVE" color={C.red} size={70} r={-4} />
            <path d="M 0 80 L 0 230 M -30 200 L 0 236 L 30 200" fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </G2>
          <G2 x={1380} y={240} s={P(FR)} o={lt(w('o2', 'how'), 0.45)}><Text size={60} color={C.ink} stroke="#fff" sw={10}>how did he get here?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
    scene(RW, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.5)'}}>{o1Scene(Math.max(0, FR - (f - RW) * 4))}</AbsoluteFill>
        <Svg>
          <G2 x={960} y={520} s={P(RW) * 1.2}><Stamp text="3 MONTHS EARLIER" color={C.navy} size={80} r={-3} /></G2>
          <G2 x={960} y={700} o={0.8}><Text size={90} color="#fff" stroke={C.ink} sw={10}>{'<< <<'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
  }
  {
    const zr = w('o3', 'zero');
    const tp = w('o3', 'tap');
    q(A('o3') + 4, 'pop', 0.5);
    q(zr, 'stamp', 0.6);
    q(tp, 'click', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={1.0 * P(A('o3')) * bump(tp, 0.06)} balance="$2,000" change="+$0" color={C.green} />
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.6}]} />
          <G2 x={1480} y={360} s={P(A('o3'))}><Pill text={f >= zr ? 'ZERO FEES' : 'FREE APP'} color={f >= zr ? C.green : C.ink} size={44} /></G2>
          <G2 x={1480} y={500} o={lt(tp, 0.35)}><Text size={48}>swipe, tap, buy</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ly = w('o4', 'last');
    const op = w('o4', 'options');
    const bl = w('o4', 'billion');
    const land = bl + 20;
    q(ly, 'paper', 0.5);
    q(op, 'pop', 0.5);
    q(bl, 'cash', 0.8);
    q(land, 'stamp', 0.8);
    dmg('o4', 0);
    scene(A('o4'), () => {
      const n = Math.round(lerp(0, 1100, ease(f, bl, land)));
      const sk = shake(f, land, 16, 14);
      const z = 1 + 0.12 * ease(f, land, land + 10);
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, z, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('o4'))}><Text size={56} color={GRAY}>one app, last year</Text></G2>
              <rect x={960 + sk.x - 550} y={480 + sk.y - 170} width={1100} height={340} rx={24} fill={f >= land ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text x={960 + sk.x} y={480 + sk.y - 80} size={200} color={f >= land ? C.red : C.ink}>${n}M</Text>
              <Text x={960 + sk.x} y={480 + sk.y + 60} size={44} color={GRAY}>from options alone</Text>
              <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} />
              <SourceTag f={f} at={ly} text="Robinhood FY2025 10-K: options revenue $1,123M" />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const fr = w('o5', 'free');
    const py = w('o5', 'paying');
    q(fr, 'pop', 0.5);
    q(py, 'sting', 0.6);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <TradingPhone x={900} y={600} s={0.75 * P(A('o5'))} balance="$400" change="FREE" color={C.green} />
          <G2 x={900} y={170} s={P(A('o5')) * bump(fr, 0.1)}><Text size={64}>if the app is free,</Text></G2>
          <G2 x={1420} y={330} s={P(A('o5')) * bump(py, 0.14)}><Text size={68} color={C.red}>who's paying?</Text></G2>
          <Raccoon f={f} x={1440} y={760} s={1.5 * P(A('o5'))} mood="sneaky" o={lt(py, 0.45)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const kn = w('o6', 'know');
    const on = w('o6', 'one');
    const fo = w('o6', 'four');
    q(kn, 'pop', 0.5);
    q(on, 'ding', 0.5);
    q(fo, 'cash', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={720} y={470} w={860} h={460} s={P(A('o6'))} fill={f >= fo ? C.yellow : '#fff'}>
          <Text y={-140} size={50} color={GRAY}>by the end, you'll know:</Text>
          <Text y={-40} size={54} color={C.navy}>WHO PAYS</Text>
          <Text y={60} size={44} color={C.ink}>and the one switch</Text>
          <Text y={150} size={60} color={C.red}>{f >= fo ? 'that saved $400' : 'that saved $ ? ? ?'}</Text>
          </Box>
          <ToggleSwitch x={720} y={840} s={1.3 * P(A('o6')) * bump(on, 0.12)} on={1} label="? ? ?" />
          <Dave f={f} x={1480} y={930} s={1.2} keys={[{at: 0, pose: 'point_l', expr: 'happy', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: Why Dave Kept Tapping ============
  {
    const pu = w('c1a', 'puts');
    const cf = w('c1a', 'confetti');
    q(pu, 'cash', 0.5);
    q(cf, 'flutter', 0.7);
    dmg('c1a', 0);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.9 * P(A('c1a')) * bump(cf, 0.08)} balance="$2,000" change="+$12" color={C.green} confetti={f >= cf ? ease(f, cf, cf + 30) : 0} />
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
          <G2 x={480} y={340} s={P(A('c1a')) * bump(cf, 0.12)}><Bubble text="nice!" size={42} tail="down" /></G2>
          <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const am = w('c1b', 'amazing');
    const pr = w('c1b', 'press');
    q(am, 'ding', 0.5);
    q(pr, 'boing', 0.4);
    scene(A('c1b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={240} s={P(A('c1b'))}><Text size={54}>it felt amazing</Text></G2>
          <G2 x={560} y={540} s={1.8 * bump(am, 0.1)}><TradingPhone balance="$2,012" change="+$12" color={C.green} confetti={0.6} /></G2>
          <Dave f={f} x={1400} y={930} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.6}]} />
          <G2 x={1400} y={360} o={lt(pr, 0.35)}><Text size={48} color={GRAY}>all he did was press a button</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nt = w('c1c', 'notifications');
    const mv = w('c1c', 'moving');
    const tp = w('c1c', 'taps');
    q(nt, 'buzz', 0.6);
    q(mv, 'pop', 0.5);
    q(tp, 'click', 0.5);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={540} s={0.85 * P(A('c1c'))} balance="$2,024" change="+$24" color={C.green} />
          <G2 x={960} y={180} s={bump(nt, 0.12)}><Pill text="NOTIFICATIONS" color={C.red} size={40} /></G2>
          <Text x={960} y={280} size={36} color={GRAY}>a stock is moving! don't miss out!</Text>
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: 0.6}, {at: tp, pose: 'typing', expr: 'happy', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tr = w('c1d', 'train');
    const ck = w('c1d', 'click');
    const pp = w('c1d', 'puppy');
    q(tr, 'pop', 0.5);
    q(ck, 'click', 0.5);
    q(pp, 'boing', 0.5);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={160} s={P(A('c1d'))}><Text size={50}>click, treat. click, treat.</Text></G2>
          <Puppy x={620} y={660} s={1.6 * P(A('c1d')) * bump(pp, 0.08)} f={f} sitting={f >= pp ? 1 : 0} />
          <G2 x={620} y={920} o={lt(pp, 0.35)}><Text size={44} color={GRAY}>the puppy sits</Text></G2>
          <Dave f={f} x={1400} y={930} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: -0.6}]} />
          <G2 x={1400} y={360} s={bump(pp, 0.12)}><Pill text="DAVE = PUPPY" color={C.red} size={44} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c1e', 'twenty');
    const ms = w('c1e', 'massachusetts');
    const gm = w('c1e', 'gamification');
    q(tw, 'paper', 0.5);
    q(ms, 'stamp', 0.6);
    q(gm, 'pop', 0.5);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={700} y={180} s={P(A('c1e')) * bump(tw, 0.1)}><Text size={48}>in twenty twenty,</Text></G2>
          <G2 x={700} y={280} s={bump(ms, 0.12)}><Text size={46} color={C.red}>Massachusetts regulators</Text></G2>
          <G2 x={700} y={600} s={P(A('c1e'))}><Text size={40}>confetti · notifications</Text></G2>
          <Stamp x={700} y={780} s={bump(gm, 0.2)} text="GAMIFICATION" color={C.red} size={56} r={-6} />
          <Dave f={f} x={1460} y={930} s={1.0} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.6}]} />
          <SourceTag f={f} at={ms} text="MA Securities Division complaint vs Robinhood (Dec 2020)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cx = w('c1f', 'customer');
    const tw = w('c1f', 'twelve');
    const sx = w('c1f', 'six');
    q(cx, 'pop', 0.5);
    q(tw, 'tick', 0.7);
    q(sx, 'thud', 0.6);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={P(A('c1f'))}><Text size={44}>one customer, no experience</Text></G2>
          <rect x={960 - 420} y={460} width={840} height={220} rx={20} fill={f >= tw ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={530} size={46} color={GRAY}>made more than</Text>
          <Text x={960} y={610} size={92} color={C.red}>{f >= tw ? '12,700 trades' : '?? trades'}</Text>
          <G2 x={960} y={840} o={lt(sx, 0.35)}><Text size={44} color={C.red}>in about six months</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dp = w('c1g', 'dropped');
    const pd = w('c1g', 'paid');
    const wk = w('c1g', 'works');
    q(dp, 'rip', 0.5);
    q(pd, 'cash', 0.6);
    q(wk, 'sting', 0.5);
    scene(A('c1g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150} s={P(A('c1g'))}><Text size={50}>the confetti app, 2021 to 2024</Text></G2>
          <TradingPhone f={f} x={380} y={600} s={0.85 * P(A('c1g')) * bump(dp, 0.06)} balance="$2,012" change="+$12" color={C.green} confetti={1} />
          <Box x={1000} y={480} w={620} h={320} s={P(A('c1g')) * bump(pd, 0.12)} fill={f >= pd ? C.yellow : '#fff'}>
          <Text y={-80} size={40} color={GRAY}>paid to settle</Text>
          <Text y={30} size={96} color={C.red}>{f >= pd ? '$7.5 MILLION' : '$ ? MILLION'}</Text>
          </Box>
          <Puppy x={1560} y={720} s={1.5 * P(A('c1g')) * bump(wk, 0.1)} f={f} sitting={1} />
          <G2 x={1100} y={860} s={bump(wk, 0.1)} o={lt(wk, 0.4)}><Text size={46} color={C.red}>puppy training works on everyone</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mn = w('c1h', 'month');
    const ft = w('c1h', 'forty');
    const dn = w('c1h', 'down');
    const nty = w('c1h', 'ninety');
    q(mn, 'pop', 0.5);
    q(ft, 'tick', 0.5);
    q(dn, 'thud', 0.7);
    q(nty, 'cash', 0.7);
    dmg('c1h', 90);
    scene(A('c1h'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.85 * P(A('c1h')) * bump(dn, 0.08)} balance="$1,910" change="-$90" color={C.red} />
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <G2 x={480} y={340} s={bump(ft, 0.1)}><Bubble text={f >= nty ? 'down ninety dollars?!' : 'forty trades...'} size={34} tail="down" /></G2>
          <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} hot={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: The Taxi That Gets Paid ============
  {
    const dg = w('c2a', 'digs');
    const ch = w('c2a', 'charge');
    q(dg, 'paper', 0.5);
    q(ch, 'pop', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <StudyPaper x={960} y={560} s={1.25 * P(A('c2a')) * bump(dg, 0.06)} title="FINE PRINT" stat="$0" label="commission" />
          <G2 x={960} y={160} s={P(A('c2a')) * bump(dg, 0.1)}><Text size={54}>Dave digs into the fine print</Text></G2>
          <G2 x={1480} y={520} s={P(A('c2a')) * bump(ch, 0.14)} o={lt(ch, 0.4)}><Bubble text="why charge nothing?" size={42} tail="left" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tp = w('c2b', 'taps');
    const sl = w('c2b', 'sells');
    q(tp, 'click', 0.5);
    q(sl, 'cash', 0.7);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c2b'))}><Text size={50}>when Dave taps BUY</Text></G2>
          <Dave f={f} x={360} y={930} s={1.0} keys={[{at: 0, pose: 'present', expr: 'neutral', look: 0.6}]} hold={{item: <TradingPhone s={0.3} balance="$1,910" change="+$0" color={C.green} />, side: 'r'}} />
          <path d="M 580 600 L 900 500" stroke={C.red} strokeWidth={8} strokeLinecap="round" markerEnd="url(#arrowhead)" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ease(f, tp, tp + 20)} />
          <defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill={C.red} /></marker></defs>
          <Wholesaler f={f} x={1400} y={930} s={1.0} keys={[{at: 0, pose: 'relax', expr: 'smug', look: -0.6}]} />
          <G2 x={1400} y={380} s={bump(sl, 0.12)}><Pill text={f >= sl ? 'APP SELLS IT' : 'WHOLESALER'} color={f >= sl ? C.red : C.ink} size={40} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sd = w('c2c', 'sends');
    const wh = w('c2c', 'wholesaler');
    const py = w('c2c', 'pays');
    q(sd, 'whoosh_s', 0.5);
    q(wh, 'pop', 0.5);
    q(py, 'cash', 0.7);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c2c'))}><Text size={46}>it sends the order to a</Text></G2>
          <WholesalerHQ x={960} y={480} s={0.85 * P(A('c2c')) * bump(wh, 0.08)} label="WHOLESALER" />
          <G2 x={960} y={800} s={bump(py, 0.15)}><Pill text={f >= py ? 'PAYS THE APP' : '...'} color={f >= py ? C.green : C.ink} size={46} /></G2>
          <G2 x={960} y={940} o={lt(py, 0.35)}><Text size={40} color={C.navy}>payment for order flow</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tx = w('c2d', 'taxi');
    const rs = w('c2d', 'restaurant');
    const dr = w('c2d', 'driver');
    q(tx, 'pop', 0.5);
    q(rs, 'cash', 0.6);
    q(dr, 'ding', 0.5);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="LIKE A TAXI" />
        <Svg>
          <G2 x={560} y={500} s={2.0 * P(A('c2d'))}><Car /></G2>
          <Dave f={f} x={580} y={390} s={0.6} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0}]} />
          <G2 x={1380} y={540} s={1.0 * P(A('c2d'))}><Text size={46}>RESTAURANT</Text></G2>
          <path d="M 780 500 L 1180 540" stroke={C.red} strokeWidth={8} strokeLinecap="round" markerEnd="url(#arrowhead)" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ease(f, dr, dr + 20)} />
          <G2 x={980} y={380} s={bump(rs, 0.15)}><Pill text={f >= rs ? '$10 PER TOURIST' : '...'} color={f >= rs ? C.green : C.ink} size={36} /></G2>
          <G2 x={560} y={800} o={lt(dr, 0.35)}><Text size={38} color={GRAY}>the driver gets paid</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const er = w('c2e', 'earns');
    const sp = w('c2e', 'spread');
    const bp = w('c2e', 'booth');
    q(er, 'pop', 0.5);
    q(sp, 'cash', 0.6);
    q(bp, 'ding', 0.5);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={140} s={P(A('c2e'))}><Text size={46}>the wholesaler earns</Text></G2>
          <G2 x={620} y={240} s={bump(sp, 0.12)}><Text size={50} color={C.red}>the spread</Text></G2>
          <ExchangeBooth x={620} y={600} s={0.85 * P(A('c2e')) * bump(bp, 0.06)} buy="$99.50" sell="$100.00" />
          <Dave f={f} x={1400} y={930} s={1.0} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: -0.6}]} />
          <G2 x={1400} y={380} o={lt(bp, 0.35)}><Text size={40} color={GRAY}>like an airport booth</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('c2f', 'care');
    const ws = w('c2f', 'wins');
    const tr = w('c2f', 'trades');
    q(cr, 'pop', 0.5);
    q(ws, 'boing', 0.5);
    q(tr, 'ding', 0.6);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('c2f'))}><Text size={52}>the app doesn't care who scores</Text></G2>
          <Box x={480} y={500} w={520} h={300} s={P(A('c2f')) * bump(ws, 0.08)}>
          <Text y={-60} size={44} color={GRAY}>Dave WINS</Text>
          <Text y={40} size={70} color={C.green}>app gets paid</Text>
          </Box>
          <Box x={1440} y={500} w={520} h={300} s={P(A('c2f')) * bump(ws, 0.08)}>
          <Text y={-60} size={44} color={GRAY}>Dave LOSES</Text>
          <Text y={40} size={70} color={C.red}>app gets paid</Text>
          </Box>
          <Dave f={f} x={960} y={900} s={1.0} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: 0}]} />
          <G2 x={960} y={480} s={P(A('c2f')) * bump(tr, 0.2)}><Stamp text="JUST TRADE" color={C.red} size={56} r={-6} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c2g', 'guess');
    const on = w('c2g', 'one');
    const cm = w('c2g', 'comments');
    q(gs, 'pop', 0.6);
    for (let i = 0; i < 6; i++) q(gs + 20 + i * 30, 'tick', 0.35);
    q(cm, 'ding', 0.5);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GuessCard f={f} x={820} y={500} s={P(A('c2g')) * bump(gs, 0.06)} q={['when Dave buys one', 'options contract,', 'how much does the app get?']} />
          <Dave f={f} x={1600} y={930} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
          <G2 x={820} y={900} s={bump(cm, 0.12)} o={lt(cm, 0.4)}><Pill text="write your guess in the comments" color={C.navy} size={36} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: The Coupon That Expires ============
  {
    const tp = w('c3a', 'taps');
    const bd = w('c3a', 'buddy');
    const tr = w('c3a', 'turn');
    q(tp, 'click', 0.5);
    q(bd, 'pop', 0.5);
    q(tr, 'cash', 0.6);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.85 * P(A('c3a')) * bump(tp, 0.06)} balance="$1,910" change="+$0" color={C.green} />
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
          <G2 x={1460} y={380} s={bump(bd, 0.1)}><Bubble text={f >= tr ? 'turn $200 into $2,000!' : 'his buddy swears...'} size={32} tail="left" /></G2>
          <G2 x={1460} y={540} o={lt(tr, 0.35)}><Text size={40} color={GRAY}>at work</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cp = w('c3b', 'coupon');
    const lets = w('c3b', 'lets');
    const dt = w('c3b', 'date');
    q(cp, 'paper', 0.6);
    q(lets, 'pop', 0.5);
    q(dt, 'stamp', 0.6);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('c3b'))}><Text size={54}>an option is like a coupon</Text></G2>
          <OptionCoupon x={860} y={520} s={1.35 * P(A('c3b')) * bump(cp, 0.08) * bump(lets, 0.06)} stock="STOCK" price="$200" expires="FRIDAY" />
          <Dave f={f} x={300} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: dt, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <Box x={1520} y={560} w={420} h={300} s={P(A('c3b')) * bump(dt, 0.14)} fill={f >= dt ? '#FFE3EA' : '#fff'}>
          <Text y={-70} size={38} color={GRAY}>good until</Text>
          <Text y={20} size={72} color={C.red}>FRIDAY</Text>
          <Text y={100} size={34} color={C.red}>{f >= dt ? 'then it expires' : ' '}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pz = w('c3c', 'pizza');
    const hp = w('c3c', 'half');
    const jm = w('c3c', 'jump');
    const md = w('c3c', 'midnight');
    q(pz, 'pop', 0.5);
    q(hp, 'ding', 0.5);
    q(jm, 'cash', 0.6);
    q(md, 'rip', 0.7);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="PIZZA COUPON" />
        <Svg>
          <Pizza x={560} y={540} s={1.4 * P(A('c3c')) * bump(pz, 0.08)} eaten={0} />
          <G2 x={560} y={840} s={bump(hp, 0.1)}><Pill text={f >= hp ? 'HALF PRICE' : 'COUPON'} color={f >= hp ? C.green : C.ink} size={44} /></G2>
          <OptionCoupon x={1360} y={540} s={0.75 * P(A('c3c')) * bump(md, 0.08)} stock="PIZZA" price="HALF OFF" expires="FRIDAY" expired={f >= md ? 1 : 0} />
          <G2 x={1360} y={860} o={lt(jm, 0.35)}><Text size={38} color={GRAY}>if prices jump, gold</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const by = w('c3d', 'buys');
    const fr = w('c3d', 'friday');
    const zr = w('c3d', 'zero');
    q(by, 'paper', 0.6);
    q(fr, 'tick', 0.5);
    q(zr, 'rip', 0.8);
    dmg('c3d', 490);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c3d'))}><Text size={46}>Dave buys coupons</Text></G2>
          <G2 x={960} y={260} o={lt(by, 0.4)}><Text size={40} color={GRAY}>that bet a stock jumps this week</Text></G2>
          <OptionCoupon x={560} y={560} s={0.7 * P(A('c3d'))} stock="STOCK" price="$300" expires="FRIDAY" expired={f >= zr ? 1 : 0} />
          <G2 x={560} y={820} s={bump(by, 0.12)}><Pill text="$400" color={C.red} size={44} /></G2>
          <G2 x={1360} y={460} s={bump(fr, 0.1)}><Text size={50}>the stock moves.</Text></G2>
          <G2 x={1360} y={560} o={lt(fr, 0.4)}><Text size={44} color={GRAY}>just not enough</Text></G2>
          <G2 x={1360} y={700} s={bump(zr, 0.15)}><Text size={80} color={C.red}>{f >= zr ? 'ZERO' : '...'}</Text></G2>
          <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} hot={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dv = w('c3e', 'damage');
    const gt = w('c3e', 'got');
    q(dv, 'thud', 0.6);
    q(gt, 'ding', 0.5);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.8 * P(A('c3e')) * bump(dv, 0.08)} balance="$1,510" change="-$490" color={C.red} />
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.6}]} />
          <G2 x={1460} y={360} s={bump(gt, 0.1)} o={lt(gt, 0.35)}><Text size={44} color={GRAY}>the app got paid</Text></G2>
          <G2 x={1460} y={480} o={lt(gt, 0.35)}><Text size={46} color={C.red}>win or lose</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dk = w('c3f', 'dangerous');
    const ex = w('c3f', 'exactly');
    const mc = w('c3f', 'much');
    q(dk, 'sting', 0.6);
    q(ex, 'pop', 0.5);
    q(mc, 'tick', 0.5);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={1060} y={160} s={P(A('c3f')) * bump(dk, 0.12)}><Text size={56} color={C.red}>the dangerous question</Text></G2>
          <Box x={860} y={520} w={480} h={340} s={P(A('c3f')) * bump(ex, 0.1)}>
          <Text y={-70} size={44} color={GRAY}>WHO</Text>
          <Text y={30} size={56} color={C.ink}>is paying it?</Text>
          </Box>
          <Box x={1420} y={520} w={480} h={340} s={P(A('c3f')) * bump(mc, 0.12)} fill={f >= mc ? C.yellow : '#fff'}>
          <Text y={-70} size={44} color={GRAY}>HOW MUCH</Text>
          <Text y={40} size={100} color={C.red}>$ ?</Text>
          </Box>
          <Raccoon f={f} x={1140} y={880} s={0.8 * P(A('c3f'))} mood="sneaky" o={0.5} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: Who Pays For Free? (VILLAIN) ============
  const SUB = w('c4g', 'question') + 20;
  subCues(SUB).forEach((c) => cues.push(c));
  {
    const pl = w('c4a', 'pulls');
    const fm = w('c4a', 'famous');
    q(pl, 'paper', 0.6);
    q(fm, 'pop', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={700} />
          <G2 x={960} y={500} s={1.4 * P(A('c4a')) * bump(pl, 0.08)}>
            <rect x={-240} y={-180} width={480} height={360} rx={12} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-120} size={40} color={GRAY}>ANNUAL REPORT</Text>
            <Text y={-50} size={36} color={C.navy}>ZERO-COMMISSION APP</Text>
          </G2>
          <Dave f={f} x={420} y={930} s={1.1} keys={[{at: 0, pose: 'present', expr: 'think', look: 0.6}]} />
          <G2 x={1500} y={360} s={bump(fm, 0.1)} o={lt(fm, 0.35)}><Text size={44} color={GRAY}>it's public</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tf = w('c4b', 'twenty');
    const bl = w('c4b', 'billion');
    const op = w('c4b', 'options');
    const fx = w('c4b', 'four');
    q(tf, 'stamp', 0.6);
    q(bl, 'cash', 0.8);
    q(op, 'ding', 0.6);
    q(fx, 'pop', 0.6);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c4b'))}><Text size={46}>in twenty twenty five</Text></G2>
          <rect x={960 - 500} y={360} width={1000} height={260} rx={20} fill={f >= bl ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={440} size={80} color={C.red}>{f >= bl ? '$4.5B' : '$?.?B'}</Text>
          <Text x={960} y={520} size={40} color={GRAY}>total revenues</Text>
          <rect x={960 - 500} y={660} width={1000} height={220} rx={20} fill={f >= op ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={740} size={64} color={C.red}>{f >= op ? '$1.1B from options' : '...'}</Text>
          <Text x={960} y={820} size={38} color={GRAY}>{f >= fx ? 'almost 4× stock trades' : ''}</Text>
          <SourceTag f={f} at={tf} text="Robinhood FY2025 10-K" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rm = w('c4c', 'remember');
    const ls = w('c4c', 'last');
    const th = w('c4c', 'three');
    q(rm, 'pop', 0.5);
    q(ls, 'paper', 0.5);
    q(th, 'tick', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c4c')) * bump(rm, 0.1)}><Text size={50} color={C.navy}>remember your guess?</Text></G2>
          <G2 x={960} y={300} s={bump(ls, 0.1)}><Text size={46}>in the last three months</Text></G2>
          <G2 x={960} y={400} o={lt(ls, 0.4)}><Text size={42} color={GRAY}>of twenty twenty five</Text></G2>
          <rect x={960 - 480} y={540} width={960} height={180} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={600} size={42} color={GRAY}>$314M from options</Text>
          <Text x={960} y={670} size={40} color={GRAY}>÷ 659M contracts</Text>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ab = w('c4d', 'about');
    const ft = w('c4d', 'forty');
    const land = ft + 20;
    const tn = w('c4d', 'tiny');
    const ml = w('c4d', 'millions');
    q(ft, 'stamp', 0.8);
    q(land, 'cash', 0.8);
    q(tn, 'pop', 0.5);
    q(ml, 'crowd', 0.5);
    scene(A('c4d'), () => {
      const n = Math.round(lerp(0, 48, ease(f, ft, land)));
      const sk = shake(f, land, 12, 10);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <rect x={960 + sk.x - 440} y={360 + sk.y - 140} width={880} height={280} rx={24} fill={f >= land ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text x={960 + sk.x} y={360 + sk.y - 40} size={52} color={GRAY}>about</Text>
            <Text x={960 + sk.x} y={360 + sk.y + 60} size={100} color={C.red}>{n}¢</Text>
            <G2 x={960} y={720} s={bump(tn, 0.1)}><Text size={48} color={GRAY}>tiny. but tiny ×</Text></G2>
            <G2 x={960} y={840} s={bump(ml, 0.12)}><Text size={52} color={C.red}>millions of Daves</Text></G2>
            <SourceTag f={f} at={ab} text="Robinhood Q4 2025: $314M ÷ 659M = $0.48 per contract" />
          </Svg>
        </AbsoluteFill>
      );
    });
  }
  {
    const py = w('c4e', 'pays');
    const cl = w('c4e', 'club');
    const tw = w('c4e', 'twenty');
    const th = w('c4e', 'three');
    q(py, 'pop', 0.5);
    q(cl, 'ding', 0.5);
    q(tw, 'paper', 0.5);
    q(th, 'cash', 0.6);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('c4e'))}><Text size={52}>and who pays it?</Text></G2>
          <WholesalerHQ x={520} y={600} s={1.0 * P(A('c4e')) * bump(tw, 0.08)} label="TOP 3 FIRMS" />
          <Wholesaler f={f} x={1000} y={940} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}]} />
          <Box x={1440} y={520} w={520} h={340} s={P(A('c4e')) * bump(cl, 0.12)} fill={f >= th ? C.yellow : '#fff'}>
          <Text y={-90} size={40} color={GRAY}>a small club of wholesalers</Text>
          <Text y={20} size={110} color={C.red}>~85%</Text>
          <Text y={110} size={36} color={C.navy}>paid by the top 3</Text>
          </Box>
          <SourceTag f={f} at={tw} text="Bryzgalova et al (2023): top 3 wholesalers ~85% share" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rm = w('c4f', 'remember');
    const rc = w('c4f', 'raccoon');
    const lf = w('c4f', 'left');
    q(rm, 'pop', 0.5);
    q(rc, 'quack', 0.6);
    q(lf, 'boing', 0.5);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={260} s={P(A('c4f')) * bump(rm, 0.1)}><Text size={50}>remember the raccoon</Text></G2>
          <G2 x={960} y={360} o={lt(rm, 0.4)}><Text size={44} color={GRAY}>from our credit card video?</Text></G2>
          <Raccoon f={f} x={960} y={720} s={1.8 * P(A('c4f')) * bump(rc, 0.08)} mood="greedy" holdCoin />
          <G2 x={960} y={1000} s={bump(lf, 0.12)}><Text size={48} color={C.red}>he never left</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ll = w('c4g', 'illegal');
    const lg = w('c4g', 'legal');
    const bn = w('c4g', 'banned');
    const qt = w('c4g', 'question');
    q(ll, 'pop', 0.5);
    q(lg, 'stamp', 0.6);
    q(bn, 'paper', 0.5);
    q(qt, 'ding', 0.5);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c4g')) * bump(ll, 0.1)}><Text size={54}>is this illegal?</Text></G2>
          <Box x={520} y={480} w={640} h={380} s={P(A('c4g')) * bump(lg, 0.12)} fill="#E3F6EA">
          <Text y={-110} size={44} color={GRAY}>AMERICA</Text>
          <Text y={0} size={90} color={C.green}>LEGAL</Text>
          <Text y={100} size={40} color={C.ink}>and disclosed</Text>
          </Box>
          <Box x={1320} y={480} w={640} h={380} s={P(A('c4g')) * bump(bn, 0.12)} fill={f >= bn ? '#FFE3EA' : '#fff'}>
          <Text y={-110} size={44} color={GRAY}>EUROPE</Text>
          <Text y={0} size={90} color={C.red}>{f >= bn ? 'BANNED' : '?'}</Text>
          <Text y={100} size={40} color={C.ink}>from 2026</Text>
          </Box>
          <G2 x={920} y={800} s={bump(qt, 0.12)} o={lt(qt, 0.4)}><Text size={46} color={C.navy}>a political question. now you know the numbers.</Text></G2>
          <SourceTag f={f} at={bn} text="EU MiFIR Art. 39a: PFOF ban (effective June 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bl = w('c4h', 'believed');
    const ls = w('c4h', 'least');
    const fr = w('c4h', 'free');
    const cs = w('c4h', 'costs');
    q(bl, 'pop', 0.5);
    q(ls, 'ding', 0.5);
    q(fr, 'stamp', 0.6);
    q(cs, 'sting', 0.7);
    scene(A('c4h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={1100} y={300} s={P(A('c4h')) * bump(bl, 0.1)}><Text size={50}>but Dave still believed</Text></G2>
          <G2 x={1100} y={400} o={lt(bl, 0.4)}><Text size={44} color={GRAY}>one thing</Text></G2>
          <G2 x={1100} y={560} s={bump(ls, 0.12)}><Text size={52}>at least his trades</Text></G2>
          <G2 x={1100} y={660} s={bump(fr, 0.15)}><Text size={58} color={C.green}>were free</Text></G2>
          <G2 x={1100} y={840} s={bump(cs, 0.12)}><Text size={48} color={C.red}>what free really costs</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: The Price You Never See ============
  {
    const th = w('c5a', 'thought');
    const np = w('c5a', 'nope');
    q(th, 'pop', 0.5);
    q(np, 'buzz', 0.8);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={300} s={P(A('c5a')) * bump(th, 0.12)}><Text size={56}>Dave thought zero commission</Text></G2>
          <G2 x={960} y={420} o={lt(th, 0.4)}><Text size={50} color={GRAY}>meant he paid nothing</Text></G2>
          <Stamp x={960} y={680} s={P(A('c5a')) * bump(np, 0.2)} text="NOPE" color={C.red} size={100} r={-8} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c5b', 'twenty', 1);
    const sd = w('c5b', 'said');
    const wp = w('c5b', 'worse');
    const th = w('c5b', 'thirty');
    q(tw, 'paper', 0.5);
    q(sd, 'stamp', 0.7);
    q(wp, 'cash', 0.6);
    q(th, 'thud', 0.7);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c5b'))}><Text size={46}>in twenty twenty, the S E C</Text></G2>
          <G2 x={960} y={240} s={bump(sd, 0.12)}><Text size={48} color={C.red}>said one big app</Text></G2>
          <G2 x={960} y={360} s={bump(wp, 0.1)}><Text size={46}>gave customers</Text></G2>
          <G2 x={960} y={460} o={lt(wp, 0.4)}><Text size={44} color={GRAY}>worse prices</Text></G2>
          <rect x={960 - 480} y={600} width={960} height={180} rx={20} fill={f >= th ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={660} size={48} color={GRAY}>they lost</Text>
          <Text x={960} y={730} size={66} color={C.red}>{f >= th ? '$34.1M' : '$??M'}</Text>
          <G2 x={960} y={880} o={lt(th, 0.35)}><Text size={38} color={GRAY}>even after commission savings</Text></G2>
          <SourceTag f={f} at={tw} text="SEC 2020-321: Robinhood $65M settlement (Dec 2020)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bt = w('c5c', 'booth');
    const bs = w('c5c', 'buys');
    const gp = w('c5c', 'gap');
    const tw = w('c5c', 'twelve');
    q(bt, 'pop', 0.5);
    q(bs, 'cash', 0.6);
    q(gp, 'ding', 0.5);
    q(tw, 'stamp', 0.7);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={580} y={160} s={P(A('c5c'))}><Text size={48}>remember the booth?</Text></G2>
          <ExchangeBooth x={580} y={540} s={0.7 * P(A('c5c')) * bump(bt, 0.06)} buy="$87.40" sell="$100.00" />
          <G2 x={1360} y={300} s={bump(bs, 0.1)}><Text size={44}>every buy and sell,</Text></G2>
          <G2 x={1360} y={400} o={lt(bs, 0.4)}><Text size={42} color={GRAY}>Dave crosses the gap</Text></G2>
          <G2 x={1360} y={520} s={bump(gp, 0.12)}><Text size={46} color={C.red}>twice</Text></G2>
          <G2 x={1360} y={680} s={bump(tw, 0.15)}><Text size={52}>on cheap weeklies:</Text></G2>
          <G2 x={1360} y={800} s={bump(tw, 0.15)}><Text size={62} color={C.red}>{f >= tw ? '12.6% gap' : '?% gap'}</Text></G2>
          <SourceTag f={f} at={gp} text="Bryzgalova et al (2023): avg bid-ask spread 12.6% on weeklies" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ph = w('c5d', 'phone');
    const hd = w('c5d', 'hundred');
    const bk = w('c5d', 'back');
    q(ph, 'pop', 0.5);
    q(hd, 'cash', 0.6);
    q(bk, 'thud', 0.7);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="IMAGINE" />
        <Svg>
          <G2 x={960} y={200} s={P(A('c5d'))}><Text size={48}>imagine buying a phone</Text></G2>
          <G2 x={560} y={540} s={1.4 * P(A('c5d')) * bump(ph, 0.08)}>
            <rect x={-80} y={-140} width={160} height={280} rx={20} fill="#1D1F2B" stroke={C.ink} strokeWidth={6} />
          </G2>
          <G2 x={560} y={380} s={bump(hd, 0.12)}><Pill text={f >= hd ? '$100' : '...'} color={f >= hd ? C.green : C.ink} size={44} /></G2>
          <G2 x={1360} y={540} s={1.4 * bump(bk, 0.1)}>
            <rect x={-80} y={-140} width={160} height={280} rx={20} fill="#1D1F2B" stroke={C.ink} strokeWidth={6} />
          </G2>
          <G2 x={1360} y={380} s={bump(bk, 0.15)}><Pill text={f >= bk ? 'BUY BACK: $87' : '...'} color={f >= bk ? C.red : C.ink} size={40} /></G2>
          <G2 x={960} y={900} o={lt(bk, 0.35)}><Text size={44} color={C.red}>before you even open the box</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sm = w('c5e', 'same');
    const lt = w('c5e', 'late');
    const md = w('c5e', 'mid');
    const sm2 = w('c5e', 'small');
    const bl = w('c5e', 'billion', 1);
    q(sm, 'paper', 0.5);
    q(lt, 'pop', 0.5);
    q(md, 'cash', 0.7);
    q(sm2, 'ding', 0.5);
    q(bl, 'thud', 0.8);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c5e')) * bump(sm, 0.1)}><Text size={46}>same study</Text></G2>
          <G2 x={960} y={280} s={bump(lt, 0.1)}><Text size={40} color={GRAY}>from late 2019 to mid 2021</Text></G2>
          <rect x={960 - 520} y={420} width={1040} height={160} rx={16} fill={f >= sm2 ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={470} size={42} color={GRAY}>small traders lost</Text>
          <Text x={960} y={540} size={62} color={C.red}>{f >= sm2 ? '$2.1B' : '$?.?B'}</Text>
          <rect x={960 - 520} y={620} width={1040} height={160} rx={16} fill={f >= bl ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={670} size={42} color={GRAY}>paid in trading costs</Text>
          <Text x={960} y={740} size={62} color={C.red}>{f >= bl ? '$6.4B' : '$?.?B'}</Text>
          <SourceTag f={f} at={sm} text="Bryzgalova et al (2023)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c5f', 'two');
    const ht = w('c5f', 'hit');
    const ts = w('c5f', 'thousand');
    const td = w('c5f', 'tried');
    q(tw, 'tick', 0.5);
    q(ht, 'thud', 0.7);
    q(ts, 'cash', 0.7);
    q(td, 'sting', 0.6);
    dmg('c5f', 1000);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.8 * P(A('c5f')) * bump(ht, 0.08)} balance="$1,000" change="-$1,000" color={C.red} />
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'panic', expr: 'scream', look: 0.6}]} sweat />
          <G2 x={1460} y={360} s={bump(ts, 0.15)}><Pill text={f >= ts ? '-$1,000' : 'damage...'} color={C.red} size={52} /></G2>
          <G2 x={1460} y={520} s={bump(td, 0.12)} o={lt(td, 0.35)}><Text size={44} color={C.red}>and instead of stopping...</Text></G2>
          <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} hot={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: The Six Hundred Dollar Tap (LOW POINT) ============
  {
    const el = w('c6a', 'eleven');
    const nt = w('c6a', 'night');
    const hm = w('c6a', 'has');
    const ts = w('c6a', 'thousand');
    q(el, 'tick', 0.5);
    q(nt, 'dream', 0.4);
    q(hm, 'cash', 0.6);
    q(ts, 'thud', 0.6);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.8 * P(A('c6a'))} balance="$1,000" change="+$0" color={C.green} />
          <G2 x={960} y={180} s={bump(el, 0.12)}><Text size={48}>it's eleven at night</Text></G2>
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'worried', look: 0.6}]} sweat />
          <G2 x={1460} y={380} s={bump(ts, 0.1)}><Pill text={f >= ts ? '$1,000 LEFT' : '...'} color={f >= ts ? C.red : C.ink} size={44} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c6b', 'thinks');
    const pt = w('c6b', 'puts');
    const sx = w('c6b', 'six');
    const cf = w('c6b', 'confetti');
    q(th, 'pop', 0.5);
    q(pt, 'click', 0.6);
    q(sx, 'cash', 0.7);
    q(cf, 'poof', 0.6);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.85 * P(A('c6b')) * bump(pt, 0.08)} balance="$400" change="-$600" color={C.red} confetti={f >= cf ? ease(f, cf, cf + 30) : 0} />
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}, {at: cf, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
          <G2 x={480} y={340} s={bump(th, 0.1)} o={f < cf ? 1 : 0.0001}><Bubble text="one big win!" size={36} tail="down" /></G2>
          <G2 x={1460} y={360} s={bump(sx, 0.15)}><Pill text={f >= sx ? '$600' : '...'} color={C.red} size={52} /></G2>
          <G2 x={1460} y={500} o={lt(sx, 0.35)}><Text size={40} color={GRAY}>expires tomorrow</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hr = w('c6c', 'here');
    const nx = w('c6c', 'next');
    const sx = w('c6c', 'sixteen');
    const fr = w('c6c', 'left');
    q(hr, 'sting', 0.7);
    q(nx, 'tick', 0.5);
    q(sx, 'rip', 0.8);
    q(fr, 'thud', 0.7);
    dmg('c6c', 1600);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={P(A('c6c')) * bump(hr, 0.12)}><Text size={56} color={C.red}>and here we are</Text></G2>
          <G2 x={960} y={320} o={lt(hr, 0.4)}><Text size={46}>right back where we started</Text></G2>
          <G2 x={960} y={480} s={bump(nx, 0.1)}><Text size={44} color={GRAY}>the next day,</Text></G2>
          <G2 x={960} y={580} o={lt(nx, 0.35)}><Text size={42} color={GRAY}>the coupons expire</Text></G2>
          <OptionCoupon x={560} y={860} s={0.6 * bump(sx, 0.1)} stock="STOCK" price="$300" expires="TODAY" expired={f >= sx ? 1 : 0} />
          <rect x={1360 - 280} y={760} width={560} height={200} rx={20} fill={f >= sx ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={1360} y={820} size={48} color={GRAY}>damage</Text>
          <Text x={1360} y={900} size={80} color={C.red}>{f >= sx ? '$1,600' : '$?'}</Text>
          <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} hot={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wd = w('c6d', 'wondered');
    const jt = w('c6d', 'just');
    const bd = w('c6d', 'bad');
    q(wd, 'pop', 0.5);
    q(jt, 'ding', 0.5);
    q(bd, 'sting', 0.5);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}]} />
          <G2 x={420} y={360} s={P(A('c6d')) * bump(jt, 0.12)}><Bubble text="am I just bad at this?" size={42} tail="down" /></G2>
          <TradingPhone x={1000} y={560} s={0.8 * P(A('c6d'))} balance="$400" change="-$1,600" color={C.red} />
          <StudyPaper x={1480} y={560} s={1.0 * P(A('c6d')) * bump(bd, 0.12)} title="PROOF?" stat="?" label="who is good at this" />
          <G2 x={1240} y={170} s={P(A('c6d')) * bump(wd, 0.1)}><Text size={48}>so he looked for proof</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fn = w('c6e', 'found');
    const st = w('c6e', 'study');
    const nn = w('c6e', 'ninety');
    q(fn, 'paper', 0.6);
    q(st, 'pop', 0.5);
    q(nn, 'stamp', 0.8);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={680} y={140} s={P(A('c6e')) * bump(fn, 0.1)}><Text size={46}>he found a study</Text></G2>
          <G2 x={680} y={240} o={lt(fn, 0.4)}><Text size={40} color={GRAY}>from Brazil</Text></G2>
          <StudyPaper x={680} y={640} s={0.65 * P(A('c6e')) * bump(nn, 0.08)} title="DAY TRADERS" stat={f >= nn ? '97%' : '?%'} label={f >= nn ? 'lost money' : ''} />
          <Dave f={f} x={1420} y={930} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <SourceTag f={f} at={st} text="Chague et al (2019): 97% of persistent day traders lost" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c6f', 'only');
    const mn = w('c6f', 'minimum');
    const sg = w('c6f', 'sign');
    q(on, 'pop', 0.5);
    q(mn, 'cash', 0.6);
    q(sg, 'sting', 0.6);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={P(A('c6f'))}><Text size={48}>of those who kept trading</Text></G2>
          <G2 x={960} y={300} o={lt(on, 0.4)}><Text size={42} color={GRAY}>more than 300 days</Text></G2>
          <rect x={960 - 520} y={460} width={1040} height={180} rx={20} fill={f >= on ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
          <Text x={960} y={510} size={46} color={GRAY}>only about</Text>
          <Text x={960} y={590} size={70} color={C.red}>{f >= on ? '1 in 100' : '?'}</Text>
          <G2 x={960} y={720} o={lt(mn, 0.35)}><Text size={44} color={GRAY}>earned more than minimum wage</Text></G2>
          <G2 x={960} y={880} s={bump(sg, 0.12)}><Text size={46} color={C.red}>no sign people got better</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pp = w('c6g', 'puppy');
    const fn = w('c6g', 'found');
    const tr = w('c6g', 'treats');
    const mn = w('c6g', 'money');
    const sw = w('c6g', 'switch');
    q(pp, 'boing', 0.6);
    q(fn, 'sting', 0.7);
    q(tr, 'rip', 0.6);
    q(mn, 'cash', 0.6);
    q(sw, 'ding', 0.6);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Puppy x={420} y={560} s={1.8 * P(A('c6g')) * bump(pp, 0.08)} f={f} sitting={1} />
          <G2 x={420} y={860} s={P(A('c6g')) * bump(fn, 0.12)}><Text size={44} color={C.red}>the treats were made of</Text></G2>
          <MoneyStack x={960} y={560} s={1.4 * P(A('c6g')) * bump(mn, 0.14)} n={5} label="HIS OWN MONEY" />
          <Box x={1480} y={520} w={500} h={360} s={P(A('c6g')) * bump(sw, 0.12)} fill={f >= sw ? C.yellow : '#fff'}>
          <Text y={-100} size={36} color={GRAY}>one thing the app</Text>
          <Text y={-40} size={36} color={GRAY}>didn't want him to find</Text>
          <Text y={80} size={110} color={C.red}>?</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: Dave Flips The Switch (WIN) ============
  {
    const op = w('c7a', 'opens');
    const ed = w('c7a', 'education');
    q(op, 'click', 0.5);
    q(ed, 'stamp', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.8 * P(A('c7a'))} balance="$400" change="+$0" color={C.green} />
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.6}]} />
          <G2 x={1460} y={360} s={bump(op, 0.12)}><Pill text="SETTINGS" color={C.navy} size={44} /></G2>
          <G2 x={1460} y={520} s={bump(ed, 0.1)} o={lt(ed, 0.35)}><Text size={40} color={C.red}>education, not advice</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c7b', 'one');
    const tr = w('c7b', 'trading');
    const fp = w('c7b', 'flips');
    const cp = w('c7b', 'coupons');
    q(on, 'pop', 0.5);
    q(tr, 'stamp', 0.6);
    q(fp, 'click', 0.7);
    q(cp, 'rip', 0.5);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={680} y={180} s={P(A('c7b'))}><Text size={48}>step one</Text></G2>
          <G2 x={680} y={300} s={bump(on, 0.1)} o={lt(on, 0.4)}><Text size={42} color={GRAY}>in many apps, you can</Text></G2>
          <G2 x={680} y={420} s={bump(tr, 0.12)}><Text size={46} color={C.red}>turn off options trading</Text></G2>
          <ToggleSwitch x={680} y={660} s={1.0 * P(A('c7b')) * bump(fp, 0.08)} on={f >= fp ? 1 : 0} label="OPTIONS" />
          <Dave f={f} x={1420} y={930} s={1.05} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.6}]} />
          <G2 x={1420} y={380} o={lt(cp, 0.35)}><Text size={40} color={GRAY}>no more coupons</Text></G2>
          <G2 x={1420} y={500} o={lt(cp, 0.35)}><Text size={38} color={C.red}>that melt on Friday</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c7c', 'two');
    const nt = w('c7c', 'notifications');
    const ck = w('c7c', 'clicker');
    q(tw, 'pop', 0.5);
    q(nt, 'click', 0.6);
    q(ck, 'boing', 0.5);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={150} s={P(A('c7c'))}><Text size={50} color={GRAY}>STEP TWO</Text></G2>
          <TradingPhone x={420} y={600} s={0.8 * P(A('c7c'))} balance="$400" change="quiet" color={GRAY} />
          <Box x={1020} y={440} w={620} h={220} s={P(A('c7c')) * bump(nt, 0.14)} fill={f >= nt ? '#E3F6EA' : '#fff'}>
          <Text y={-30} size={40} color={GRAY}>notifications</Text>
          <Text y={50} size={72} color={f >= nt ? C.green : C.ink}>{f >= nt ? 'OFF' : 'ON'}</Text>
          </Box>
          <Puppy x={1520} y={700} s={1.6 * P(A('c7c')) * bump(ck, 0.1)} f={f} sitting={0} />
          <G2 x={1100} y={800} s={bump(ck, 0.1)} o={lt(ck, 0.4)}><Text size={46} color={C.navy}>the puppy gets to be a dog again</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c7d', 'three');
    const mv = w('c7d', 'moves');
    const ex = w('c7d', 'extra');
    q(th, 'pop', 0.5);
    q(mv, 'whoosh_s', 0.5);
    q(ex, 'ding', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={560} y={200} s={P(A('c7d'))}><Text size={48}>step three</Text></G2>
          <TradingPhone x={560} y={600} s={0.7 * P(A('c7d'))} balance="$400" change="+$0" color={C.green} />
          <G2 x={560} y={960} s={bump(mv, 0.12)}><Text size={40} color={C.red}>off home screen</Text></G2>
          <Dave f={f} x={1400} y={930} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.6}]} hold={{item: <TradingPhone s={0.25} balance="$400" change="+$0" color={C.green} />, side: 'r'}} />
          <G2 x={1400} y={380} s={bump(ex, 0.1)} o={lt(ex, 0.35)}><Text size={42} color={GRAY}>one extra swipe</Text></G2>
          <G2 x={1400} y={500} o={lt(ex, 0.35)}><Text size={40}>stops a lot of</Text></G2>
          <G2 x={1400} y={600} o={lt(ex, 0.35)}><Text size={38} color={C.red}>midnight taps</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('c7e', 'four');
    const bf = w('c7e', 'before');
    const wl = w('c7e', 'would');
    const bz = w('c7e', 'buzz');
    q(fr, 'pop', 0.5);
    q(bf, 'ding', 0.5);
    q(wl, 'boing', 0.5);
    q(bz, 'buzz', 0.5);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={150} s={P(A('c7e'))}><Text size={50} color={GRAY}>STEP FOUR: ONE QUESTION</Text></G2>
          <Dave f={f} x={380} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <Box x={1080} y={520} w={980} h={440} s={P(A('c7e')) * bump(wl, 0.08)} fill={f >= bz ? C.yellow : '#fff'}>
          <Text y={-120} size={56} color={C.navy}>would I still buy this</Text>
          <Text y={0} size={64} color={C.red}>with no confetti</Text>
          <Text y={110} size={56} color={C.ink}>and no buzz?</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('c7f', 'five');
    const lg = w('c7f', 'long');
    const br = w('c7f', 'boring');
    const ix = w('c7f', 'index');
    q(fv, 'pop', 0.5);
    q(lg, 'ding', 0.5);
    q(br, 'boing', 0.5);
    q(ix, 'cash', 0.6);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={150} s={P(A('c7f'))}><Text size={50} color={GRAY}>STEP FIVE: LONG TERM MONEY</Text></G2>
          <Dave f={f} x={360} y={930} s={1.1} keys={[{at: 0, pose: 'relax', expr: 'happy', look: 0.6}]} />
          <Box x={900} y={500} w={560} h={400} s={P(A('c7f')) * bump(br, 0.1)}>
          <Text y={-120} size={40} color={GRAY}>automatic, every month</Text>
          <Text y={0} size={100} color={C.green}>$ + $ + $</Text>
          <Text y={120} size={44} color={C.ink}>boring on purpose</Text>
          </Box>
          <Box x={1500} y={500} w={520} h={400} s={P(A('c7f')) * bump(ix, 0.14)} fill={f >= ix ? '#E3F6EA' : '#fff'}>
          <Text y={-100} size={40} color={GRAY}>into a</Text>
          <Text y={-10} size={58} color={C.green}>LOW COST</Text>
          <Text y={70} size={58} color={C.green}>INDEX FUND</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ls = w('c7g', 'last');
    const fr = w('c7g', 'still');
    const sv = w('c7g', 'saved');
    q(ls, 'cash', 0.6);
    q(fr, 'ding', 0.7);
    q(sv, 'chime', 0.8);
    dmg('c7g', 400);
    scene(A('c7g'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <TradingPhone x={960} y={520} s={0.85 * P(A('c7g')) * bump(ls, 0.08)} balance="$400" change="+$0" color={C.green} />
          <Dave f={f} x={480} y={930} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}]} />
          <G2 x={1460} y={360} s={bump(fr, 0.15)}><Pill text={f >= fr ? '$400' : '...'} color={f >= fr ? C.green : C.ink} size={52} /></G2>
          <G2 x={1460} y={520} s={bump(sv, 0.12)}><Text size={48} color={C.green}>{f >= sv ? 'SAVED' : 'still there'}</Text></G2>
          <DamageMeter x={1700} y={90} s={1.0} value={money(damage)} saved={f >= sv ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: Who Was Paying All Along (PAYOFF) ============
  {
    const fr = w('c8a', 'free');
    const py = w('c8a', 'paying');
    q(fr, 'pop', 0.6);
    q(py, 'ding', 0.6);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={340} s={P(A('c8a')) * bump(fr, 0.12)}><Text size={64}>so if the app is free,</Text></G2>
          <G2 x={960} y={500} s={bump(py, 0.15)}><Text size={68} color={C.red}>who's paying?</Text></G2>
          <Raccoon f={f} x={960} y={880} s={1.6 * P(A('c8a'))} mood="greedy" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nt = w('c8b', 'not');
    const fe = w('c8b', 'fee');
    const cp = w('c8b', 'coupons');
    const at = w('c8b', 'attention');
    q(nt, 'stamp', 0.7);
    q(fe, 'pop', 0.5);
    q(cp, 'rip', 0.5);
    q(at, 'sting', 0.6);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'tired', look: 0.6}]} />
          <G2 x={1120} y={240} s={P(A('c8b')) * bump(nt, 0.15)}><Text size={56} color={C.red}>Dave was</Text></G2>
          <G2 x={1120} y={380} s={bump(fe, 0.1)}><Text size={46}>not with a fee he could see</Text></G2>
          <G2 x={1120} y={540} s={bump(cp, 0.12)}><Text size={48}>with coupons</Text></G2>
          <G2 x={1120} y={640} o={lt(cp, 0.35)}><Text size={44} color={GRAY}>that melted on Friday</Text></G2>
          <G2 x={1120} y={780} s={bump(at, 0.12)}><Text size={46} color={C.navy}>and with his attention</Text></G2>
          <G2 x={1120} y={900} o={lt(at, 0.35)}><Text size={42} color={C.red}>sold one tap at a time</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const md = w('c8c', 'made');
    const fc = w('c8c', 'forty');
    const dc = w('c8c', 'lost');
    const bh = w('c8c', 'both');
    q(md, 'cash', 0.6);
    q(fc, 'ding', 0.5);
    q(dc, 'thud', 0.7);
    q(bh, 'stamp', 0.7);
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c8c'))}><Text size={48}>the app made about</Text></G2>
          <G2 x={960} y={300} s={bump(md, 0.12)}><Text size={52} color={C.green}>forty eight cents</Text></G2>
          <G2 x={960} y={400} o={lt(md, 0.4)}><Text size={42} color={GRAY}>on each contract</Text></G2>
          <G2 x={960} y={560} s={bump(dc, 0.15)}><Text size={56}>Dave lost</Text></G2>
          <G2 x={960} y={680} s={bump(dc, 0.15)}><Text size={66} color={C.red}>sixteen hundred dollars</Text></G2>
          <G2 x={960} y={860} s={bump(bh, 0.12)}><Text size={50} color={C.navy}>both happened</Text></G2>
          <G2 x={960} y={980} o={lt(bh, 0.35)}><Text size={46}>in the very same tap</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c8d', 'one');
    const sv = w('c8d', 'saved');
    const ls = w('c8d', 'last');
    const sw = w('c8d', 'switch');
    const fr = w('c8d', 'four');
    const of = w('c8d', 'off');
    q(on, 'pop', 0.6);
    q(sv, 'chime', 0.7);
    q(ls, 'cash', 0.6);
    q(fr, 'ding', 0.6);
    q(sw, 'click', 0.7);
    q(of, 'stamp', 0.7);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c8d'))}><Text size={48}>and the one switch</Text></G2>
          <G2 x={960} y={280} s={bump(sv, 0.12)}><Text size={52} color={C.green}>that saved his last</Text></G2>
          <G2 x={960} y={400} s={bump(fr, 0.15)}><Text size={62} color={C.green}>four hundred dollars?</Text></G2>
          <G2 x={960} y={580} s={bump(sw, 0.12)}><Text size={50}>it wasn't a secret</Text></G2>
          <G2 x={960} y={680} o={lt(sw, 0.35)}><Text size={46} color={GRAY}>trading trick</Text></G2>
          <ToggleSwitch x={960} y={900} s={0.9 * bump(of, 0.08)} on={1} label="OPTIONS" />
          <G2 x={960} y={1040} o={lt(of, 0.35)}><Text size={42} color={C.red}>the one setting the confetti never mentioned</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ OUTRO: What Dave Learned ============
  {
    const ot = w('r1', 'one');
    const gt = w('r1', 'get');
    q(ot, 'pop', 0.5);
    q(gt, 'ding', 0.5);
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150}><Text size={56} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Row x={300} y={340} s={0.9} n={1} text="free apps get paid when you trade" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9} n={2} text="options are coupons that expire" lit={0.35} w={1200} />
          <Row x={300} y={660} s={0.9} n={3} text="confetti is a clicker: turn it off" lit={0.35} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('r2', 'two');
    const op = w('r2', 'options');
    const cp = w('r2', 'coupons');
    q(tw, 'pop', 0.5);
    q(op, 'paper', 0.5);
    q(cp, 'rip', 0.6);
    scene(A('r2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150}><Text size={56} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Row x={300} y={340} s={0.9} n={1} text="free apps get paid when you trade" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9} n={2} text="options are coupons that expire" lit={1} w={1200} />
          <Row x={300} y={660} s={0.9} n={3} text="confetti is a clicker: turn it off" lit={0.35} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('r3', 'three');
    const cf = w('r3', 'confetti');
    const ck = w('r3', 'clicker');
    q(th, 'pop', 0.5);
    q(cf, 'flutter', 0.5);
    q(ck, 'boing', 0.5);
    scene(A('r3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150}><Text size={56} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Row x={300} y={340} s={0.9} n={1} text="free apps get paid when you trade" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9} n={2} text="options are coupons that expire" lit={1} w={1200} />
          <Row x={300} y={660} s={0.9} n={3} text="confetti is a clicker: turn it off" lit={1} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tn = w('r4', 'tonight');
    const gb = w('r4', 'lamborghini');
    const cs = w('r4', 'course');
    q(tn, 'sting', 0.6);
    q(gb, 'boing', 0.5);
    q(cs, 'cash', 0.6);
    scene(A('r4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('r4'))}><Text size={60} color={C.red}>NEXT TIME</Text></G2>
          <Car x={520} y={700} s={1.5 * P(A('r4')) * bump(gb, 0.1)} />
          <G2 x={520} y={470} s={P(A('r4')) * bump(gb, 0.14)}><Pill text="RENTED" color={C.red} size={40} /></G2>
          <Stick f={f} x={900} y={930} s={1.05} acc={['shades']} seed={66} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.6, talk: true}]} />
          <G2 x={900} y={360} s={P(A('r4')) * bump(tn, 0.12)}><Bubble text="I'll teach you to trade" size={40} tail="down" /></G2>
          <Box x={1460} y={560} w={480} h={320} s={P(A('r4')) * bump(cs, 0.14)} fill={f >= cs ? C.yellow : '#fff'}>
          <Text y={-80} size={40} color={GRAY}>the course costs</Text>
          <Text y={40} size={120} color={C.red}>{f >= cs ? '$399' : '$ ?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('r5', 'subscribe');
    const rc = w('r5', 'raccoon');
    q(sb, 'ding', 0.6);
    q(rc, 'quack', 0.5);
    scene(A('r5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={860} y={400} s={1.4 * P(A('r5')) * bump(sb, 0.08)} done={f > sb + 14 ? 1 : 0} />
          <Bell f={f} x={1300} y={400} s={1.2 * P(A('r5'))} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={380} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
          <Raccoon f={f} x={1540} y={780} s={1.1 * P(A('r5')) * bump(rc, 0.1)} mood="sneaky" />
          <G2 x={1000} y={660} s={P(A('r5'))}><Text size={48}>subscribe, and see what happens</Text></G2>
          <G2 x={1000} y={760} s={bump(rc, 0.1)} o={lt(rc, 0.4)}><Text size={44} color={C.red}>the raccoon might be back</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

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
