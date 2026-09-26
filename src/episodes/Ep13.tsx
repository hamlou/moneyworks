import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, Beach} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, Duck, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Row, SubButton, Bell} from '../props2';
import {House, LineChart} from '../props4';
import {Contract} from '../props5';
import {Share} from '../props7';
import {AppleTree, Paycheck, Scale, Tombstone, Yacht} from '../props8';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Richie: React.FC<SP> = (p) => <Stick acc={['shades', 'tie']} seed={60} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Buffett: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={79} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

export const Ep13: React.FC = () => {
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

  // ============ COLD OPEN ============
  {
    const sx = w('o1', 'sixty');
    const tx = w('o1', 'taxes');
    const six = w('o1', 'six');
    const lk = w('o2', 'look');
    const tf = w('o2', 'twenty');
    const fh = w('o3', 'four');
    const th = w('o3', 'thirteen');
    const tp = w('o4', 'three');
    const dv = w('o4', 'dave');
    const lg = w('o5', 'legal');
    q(2, 'pop', 0.6);
    q(sx, 'cash', 0.5);
    q(tx, 'rip', 0.5);
    q(six, 'ding', 0.5);
    q(lk, 'pop', 0.6);
    q(tf, 'paper', 0.5);
    q(fh, 'cash', 0.6);
    q(th, 'coin', 0.6);
    q(tp, 'stamp', 0.7);
    q(dv, 'pop', 0.5);
    q(lg, 'sting', 0.6);
    scene(0, () =>
      f < lk - 2 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={360} y={880} s={1.25} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: tx, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Paycheck x={1150} y={480} s={1.15 * pop(f, 2)} amount="$60,000/yr" cut={ease(f, tx, tx + 12, 0, 1 / 6)} />
            <G2 x={1150} y={780} s={pop(f, six)}><Text size={64} color={C.red}>~1 dollar in every 6</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, lk - 2)}><Text size={48}>ProPublica investigation · 25 richest Americans</Text></G2>
            <line x1={400} y1={860} x2={1300} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={620} y={860} h={ease(f, fh - 4, fh + 16, 2, 560)} color={C.green} label="wealth growth (5 yrs)" value="+$401B" w={280} />
            <Bar x={1080} y={860} h={ease(f, th - 4, th + 12, 2, 19)} color={C.red} label="income tax paid" value="$13.6B" w={280} />
            <G2 x={1560} y={420} s={pop(f, tp)}><Text size={150} color={C.red} stroke={C.ink} sw={10}>3.4%</Text><Text y={110} size={40}>"true tax rate"</Text></G2>
            {f >= dv && <G2 x={1560} y={720} s={pop(f, dv)}><Text size={44}>Dave: ~16%</Text></G2>}
            {f >= lg && <Stamp x={1560} y={900} s={pop(f, lg, 9, 260)} text="LEGAL" size={60} color={C.green} r={-6} />}
            <SourceTag f={f} at={fh} text="ProPublica, The Secret IRS Files (2021), 2014–2018" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'buy'), w('o6', 'borrow'), w('o6', 'die')];
    const bth = w('o6', 'both');
    pv.forEach((x) => q(x, 'stamp', 0.55));
    q(bth, 'pop', 0.5);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">THE 3-STEP TRICK</Text>
          {['BUY', 'BORROW', 'DIE'].map((l, i) => (
            <Frame key={l} x={380 + i * 580} y={500} s={pop(f, pv[i] - 2)} w={500} h={420} label={['things that grow', 'instead of selling', 'the tax clock resets'][i]}>
              {i === 0 && <G2 y={-40}><Share s={0.7} n="SHARES" /></G2>}
              {i === 1 && <Bank s={0.3} y={40} label="BANK" />}
              {i === 2 && <Tombstone s={0.8} y={60} />}
              <Text y={-160} size={60} color={[C.green, C.blue, '#5B6470'][i]}>{l}</Text>
            </Frame>
          ))}
          <G2 x={960} y={900} s={pop(f, bth)}><Text size={44}>+ the arguments on both sides</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dave pays ============
  {
    const tw = w('c1b', 'two');
    const gv = w('c1b', 'government');
    const it = w('c1c', 'income');
    const ss = w('c1c', 'social');
    const hp = w('c1c', 'happens');
    const sl = w('c1d', 'salary');
    const inc = w('c1d', 'income');
    const rw = w('c1d', 'right');
    const inc2 = w('c1e', 'income');
    const tn = w('c1f', 'ten');
    const lv = w('c1f', 'leaves');
    q(tw, 'pop', 0.5);
    q(gv, 'rip', 0.6);
    q(it, 'coin', 0.5);
    q(ss, 'coin', 0.5);
    q(hp, 'ding', 0.5);
    q(sl, 'pop', 0.5);
    q(rw, 'stamp', 0.6);
    q(inc2, 'ding', 0.6);
    q(tn, 'cash', 0.6);
    q(lv, 'whoosh', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={360} y={860} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'neutral'}, {at: gv, pose: 'shrug', expr: 'worried'}]} />
            <Calendar x={1600} y={260} s={0.7 * pop(f, tw)} top="PAYDAY" year="every 2 wks" flip={0} />
            <Paycheck x={1050} y={430} s={pop(f, A('c1a'))} amount="$2,308" cut={ease(f, gv, gv + 12, 0, 0.17)} />
            <G2 x={1050} y={680} s={pop(f, it)}><Text size={44}>→ income tax</Text></G2>
            <G2 x={1050} y={760} s={pop(f, ss)}><Text size={44}>→ Social Security + Medicare</Text></G2>
            <G2 x={1050} y={870} s={pop(f, hp)}><Text size={40} color={C.red}>no choice · no waiting</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={300} s={pop(f, sl)}><Text size={70}>SALARY</Text></G2>
            <G2 x={960} y={300} s={pop(f, inc)}><Text size={70}>=</Text></G2>
            <G2 x={1420} y={300} s={pop(f, inc)}><Text size={70} color={C.red}>INCOME</Text></G2>
            <Stamp x={960} y={480} s={pop(f, rw, 9, 260)} text="TAXED RIGHT AWAY" size={56} color={C.red} r={-4} />
            {f >= inc2 && <G2 x={960} y={640} s={pop(f, inc2) * (1 + 0.05 * Math.sin(f / 5))}><Text size={50} color={C.blue}>remember this word: INCOME</Text></G2>}
            {f >= tn && <G2 x={960} y={820} s={pop(f, tn)}><Text size={60} color={C.green}>~$10,000 a year, gone before it arrives</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 income vs wealth ============
  {
    const rc = w('c2a', 'richie');
    const tb = w('c2a', 'ten');
    const od = w('c2b', 'one');
    const gr = w('c2c', 'great');
    const ob = w('c2c', 'billion');
    const zr = w('c2d', 'zero');
    const pp = w('c2e', 'paper');
    const sl = w('c2e', 'sells');
    const at = w('c2f', 'apple');
    const pk = w('c2f', 'pick');
    const bg = w('c2f', 'bigger');
    const nb = w('c2f', 'nobody');
    const ap = w('c2g', 'apples');
    const tr = w('c2g', 'tree');
    q(rc, 'pop', 0.6);
    q(tb, 'cash', 0.5);
    q(od, 'trombone', 0.4);
    q(gr, 'ding', 0.5);
    q(ob, 'cash', 0.6);
    q(zr, 'stamp', 0.7);
    q(pp, 'paper', 0.5);
    q(at, 'pop', 0.6);
    q(pk, 'pop2', 0.5);
    q(bg, 'boing', 0.5);
    q(nb, 'ding', 0.5);
    q(ap, 'pop', 0.5);
    q(tr, 'pop', 0.5);
    const val = f < ob ? 10 : 11;
    scene(A('c2a'), () =>
      f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Richie f={f} x={360} y={880} s={1.25 * pop(f, rc - 4)} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}, {at: ob, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={360} y={420} s={pop(f, rc)}><Text size={52}>Richie</Text></G2>
            <G2 x={1000} y={380} s={pop(f, tb)}>
              <Share s={1.2} n={`$${val} BILLION`} owner="RICHIE'S COMPANY" />
            </G2>
            {f >= od && f < gr && <G2 x={1500} y={700} s={pop(f, od)}><PriceTag2 text="salary: $1" /></G2>}
            {f >= ob && <G2 x={1550} y={250} s={pop(f, ob)}><Text size={80} color={C.green}>+$1B</Text></G2>}
            {f >= zr && (
              <G2 x={1200} y={740} s={pop(f, zr)}>
                <rect x={-320} y={-80} width={640} height={160} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text x={-80} size={56}>tax on it:</Text>
                <Text x={200} size={90} color={C.red}>$0</Text>
              </G2>
            )}
            {f >= pp && <G2 x={1200} y={900} s={pop(f, pp)}><Text size={40}>{f >= sl ? 'only taxed when he SELLS' : 'just a gain on paper'}</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <AppleTree x={1250} y={822} s={pop(f, at)} grow={ease(f, bg, bg + 30, 0.3, 1.3)} apples={f >= bg ? 10 : 6} />
            <Dave f={f} x={600} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}]} />
            {f >= pk && (
              <G2 x={680} y={600} s={pop(f, pk)}>
                <circle r={26} fill={C.red} stroke={C.ink} strokeWidth={4} />
                <Text x={120} y={-120} size={40} color={C.red}>picked = taxed</Text>
              </G2>
            )}
            {f >= nb && <G2 x={1250} y={170} s={pop(f, nb)}><Text size={48} color={C.green}>the tree: not taxed</Text></G2>}
            {f >= ap && <G2 x={600} y={300} s={pop(f, ap)}><Text size={44}>Dave: paid in apples</Text></G2>}
            {f >= tr && <Richie f={f} x={1600} y={822} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />}
            {f >= tr && <G2 x={1600} y={450} s={pop(f, tr)}><Text size={44}>Richie: owns the tree</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Buy ============
  {
    const by = w('c3a', 'buy');
    const it = [w('c3b', 'shares'), w('c3b', 'buildings'), w('c3b', 'land'), w('c3b', 'businesses')];
    const nv = w('c3c', 'never');
    const cr = w('c3c', 'creates');
    const tf = w('c3d', 'twenty');
    const ds = w('c3d', 'doesnt');
    const yc = w('c3e', 'yacht');
    q(by, 'stamp', 0.6);
    it.forEach((x) => q(x, 'pop', 0.5));
    q(nv, 'buzz', 0.5);
    q(tf, 'coin', 0.5);
    q(ds, 'thud', 0.5);
    q(yc, 'boing', 0.6);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={130} s={pop(f, by, 9, 260)} text="STEP 1: BUY" size={60} color={C.green} />
            {['SHARES', 'BUILDINGS', 'LAND', 'BUSINESSES'].map((l, i) => (
              <G2 key={l} x={300 + i * 440} y={400} s={pop(f, it[i])}>
                <rect x={-190} y={-110} width={380} height={220} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text y={-50} size={40}>{l}</Text>
                <path d="M -110 60 L -40 20 L 20 40 L 110 -30" fill="none" stroke={C.green} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
              </G2>
            ))}
            {f >= nv && <Stamp x={960} y={680} s={pop(f, nv, 9, 260)} text="NEVER SELL" size={70} color={C.red} r={-4} />}
            {f >= cr && <G2 x={960} y={820} s={pop(f, cr)}><Text size={44}>sell → income → tax</Text></G2>}
            {f >= tf && <G2 x={960} y={930} s={pop(f, tf)}><Text size={40} color="#5B6470">selling $1B of gains → ~24% federal tax</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Beach f={f} />
          <Svg>
            <Yacht x={1200} y={640} s={pop(f, yc)} f={f} />
            <Richie f={f} x={500} y={860} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
            <G2 x={560} y={420} s={pop(f, A('c3e') + 4)}><Bubble text="no selling... so how do I pay?" size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Borrow ============
  {
    const br = w('c4a', 'borrow');
    const fm = w('c4b', 'fifty');
    const gu = w('c4b', 'guarantee');
    const lv = w('c4c', 'loves');
    const tn = w('c4c', 'tiny');
    const ln = w('c4c', 'loan');
    const ky = w('c4d', 'key');
    const ni = w('c4d', 'not');
    const nt = w('c4d', 'no');
    const ip = w('c4e', 'interest');
    const fl = w('c4e', 'less');
    const gw = w('c4f', 'growing');
    const yr = w('c4f', 'year');
    const tree = w('c4g', 'tree');
    const nb = w('c4g', 'neighbor');
    const fv = w('c4h', 'first');
    const nm = w('c4h', 'money');
    const ng = w('c4h', 'nothing');
    q(br, 'stamp', 0.6);
    q(fm, 'cash', 0.5);
    q(gu, 'paper', 0.5);
    q(lv, 'ding', 0.5);
    q(ln, 'cash', 0.6);
    q(ky, 'pop', 0.5);
    q(ni, 'stamp', 0.6);
    q(ip, 'coin', 0.5);
    q(fl, 'ding', 0.5);
    q(gw, 'pop', 0.5);
    q(tree, 'pop', 0.5);
    q(nb, 'pop', 0.5);
    q(fv, 'quack', 0.6);
    q(ng, 'trombone', 0.5);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={130} s={pop(f, br, 9, 260)} text="STEP 2: BORROW" size={60} color={C.blue} />
            <Richie f={f} x={400} y={860} s={1.2} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}]} />
            <Banker f={f} x={1500} y={860} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: lv, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <G2 x={620} y={380} s={pop(f, fm)}><Bubble text={'$50 million, please.\nMy shares = guarantee.'} size={40} tail="left" /></G2>
            {f >= gu && <G2 x={900} y={620} s={pop(f, gu)} r={-6}><Share s={0.6} n="$10B" owner="RICHIE'S SHARES" /></G2>}
            {f >= tn && <G2 x={1350} y={360} s={pop(f, tn)}><Text size={40} color={C.green}>risk: tiny</Text></G2>}
            {f >= ln && <G2 x={1150} y={700} s={pop(f, ln)}><MoneyStack n={6} s={0.9} label="$50M LOAN" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={300} s={pop(f, A('c4d'))}><MoneyStack n={6} s={1.1} label="LOAN" /></G2>
            <G2 x={500} y={120} s={pop(f, ky)}><Text size={52}>the key:</Text></G2>
            {f >= ni && <Stamp x={500} y={520} s={pop(f, ni, 9, 260)} text="NOT INCOME" size={60} color={C.red} r={-6} />}
            {f >= nt && <G2 x={500} y={700} s={pop(f, nt)}><Text size={48} color={C.green}>income tax: $0</Text></G2>}
            {f >= ip && (
              <g>
                <line x1={1050} y1={860} x2={1750} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                <Bar x={1230} y={860} h={ease(f, ip, ip + 12, 2, 5 * 20)} color={C.blue} label="loan interest" value="~5%" w={220} />
                <Bar x={1570} y={860} h={ease(f, fl, fl + 12, 2, 23.8 * 20)} color={C.red} label="tax if he sold" value="~24%" w={220} />
              </g>
            )}
            {f >= gw && <G2 x={1400} y={200} s={pop(f, gw)}><Text size={44} color={C.green}>{f >= yr ? 'borrow again... and again...' : 'shares keep growing'}</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4h') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <AppleTree x={600} y={822} s={pop(f, A('c4g'))} grow={1} apples={10} />
            <Richie f={f} x={900} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.6}]} />
            <Stick f={f} x={1450} y={822} s={1} acc={['cap']} seed={21} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}]} />
            {f >= nb && [0, 1, 2].map((i) => <circle key={i} cx={lin(f, nb + i * 6, nb + 20 + i * 6, 1400, 960)} cy={620 - i * 20} r={24} fill={C.red} stroke={C.ink} strokeWidth={4} />)}
            {f >= nb && <G2 x={1200} y={320} s={pop(f, nb)}><Bubble text={'borrow my apples...\nI get the tree later'} size={40} tail="right" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Duck f={f} x={380} y={700} s={1.2 * pop(f, fv)} />
            <G2 x={380} y={440} s={pop(f, fv + 4)}><Bubble text="new money!" size={40} tail="down" /></G2>
            <Bank x={960} y={800} s={0.5 * pop(f, A('c4h'))} label="BANK" />
            <G2 x={960} y={330} s={pop(f, nm)}><Text size={48}>bank: happy · Richie: happy</Text></G2>
            {f >= ng && <G2 x={1500} y={500} s={pop(f, ng)}><Text size={52} color={C.red}>tax office: $0</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Die ============
  {
    const dd = w('c5a', 'die');
    const mg = w('c5b', 'magic');
    const kd = w('c5c', 'kids');
    const nm = w('c5c', 'normally');
    const su = w('c5d', 'step');
    const rs = w('c5d', 'resets');
    const dy = w('c5d', 'day');
    const vn = w('c5e', 'vanishes');
    const pf = w('c5e', 'poof');
    const sl = w('c5f', 'sell');
    const lt = w('c5f', 'little');
    const es = w('c5g', 'estate');
    const ft = w('c5g', 'forty');
    const trs = w('c5g', 'trusts');
    q(dd, 'stamp', 0.6);
    q(mg, 'dream', 0.5);
    q(kd, 'pop', 0.5);
    q(su, 'stamp', 0.6);
    q(rs, 'tick', 0.6);
    q(vn, 'poof', 0.7);
    q(pf, 'poof', 0.6);
    q(sl, 'cash', 0.5);
    q(lt, 'ding', 0.5);
    q(es, 'paper', 0.5);
    q(ft, 'pop', 0.5);
    q(trs, 'stamp', 0.5);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={130} s={pop(f, dd, 9, 260)} text="STEP 3: DIE" size={60} color="#5B6470" />
            <Tombstone x={560} y={820} s={1.3 * pop(f, mg)} name="RICHIE" />
            <Sparkle x={380} y={440} t={(f % 30) / 30} s={0.8} />
            {f >= kd && [0, 1].map((i) => <Stick key={i} f={f} x={1150 + i * 220} y={860} s={0.9} acc={i ? ['ponytail', 'shades'] : ['hair', 'shades']} seed={70 + i} keys={[{at: 0, pose: 'hold', expr: 'grin'}]} handItem={<Share s={0.25} n="$$$" />} />)}
            {f >= nm && <G2 x={1260} y={330} s={pop(f, nm)}><Text size={40}>normally: sell → tax on all the growth</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, su)}><Text size={64}>the "step-up in basis"</Text></G2>
            <G2 x={960} y={480}>
              <rect x={-640} y={-150} width={1280} height={300} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text x={-600} y={-90} size={36} anchor="start" color="#5B6470">GROWTH TO BE TAXED</Text>
              <rect x={-600} y={-40} width={1200 * (f >= rs ? 1 - ease(f, rs, rs + 20) : 1)} height={110} rx={16} fill={C.red} stroke={C.ink} strokeWidth={5} />
              {f < rs && <Text x={0} y={16} size={50} color="#fff">$1 → $10 billion (a whole life)</Text>}
              {f >= rs && <Text x={0} y={16} size={60} color={C.green}>RESET → $0</Text>}
            </G2>
            {f >= dy && <Calendar x={1600} y={800} s={0.7 * pop(f, dy)} top="NEW START" year="today" flip={0} />}
            {f >= vn && <Puff x={960} y={480} s={2} t={lin(f, vn, vn + 20)} />}
            {f >= pf && <G2 x={700} y={820} s={pop(f, pf)}><Text size={70} color={C.red}>POOF.</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1].map((i) => <Stick key={i} f={f} x={420 + i * 220} y={860} s={1} acc={i ? ['ponytail', 'shades'] : ['hair', 'shades']} seed={70 + i} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />)}
            <G2 x={530} y={330} s={pop(f, sl)}><Text size={44}>sell · repay loans</Text></G2>
            <G2 x={530} y={420} s={pop(f, lt)}><Text size={52} color={C.green}>≈ little or no income tax</Text></G2>
            {f >= es && (
              <G2 x={1400} y={500} s={pop(f, es)}>
                <Contract s={0.9} lines={['ESTATE TAX', 'up to 40%', 'on very large estates']} />
              </G2>
            )}
            {f >= trs && <G2 x={1400} y={860} s={pop(f, trs)}><Text size={44} color={C.red}>experts + trusts → much smaller bill</Text></G2>}
            <SourceTag f={f} at={ft} text="Estate tax: 40% above ≈ $15M exemption (2026)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Buffett ============
  {
    const bf = w('c6b', 'buffett');
    const ny = w('c6b', 'times');
    const sv = w('c6c', 'seventeen');
    const tt = w('c6d', 'thirty');
    const ft = w('c6d', 'forty');
    const inv = w('c6g', 'investments');
    const sal = w('c6g', 'salaries', 1);
    const mr = w('c6e', 'more');
    q(bf, 'pop', 0.6);
    q(ny, 'paper', 0.6);
    q(sv, 'ding', 0.6);
    q(tt, 'pop', 0.5);
    q(ft, 'stamp', 0.6);
    q(inv, 'pop', 0.5);
    q(mr, 'heart', 0.6);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Buffett f={f} x={360} y={860} s={1.2 * pop(f, A('c6a'))} keys={[{at: 0, pose: 'talk', expr: 'think', look: 0.8}, {at: mr, pose: 'present', expr: 'happy', look: 0.8}]} />
          {f < sv && (
            <G2 x={1100} y={450} s={pop(f, A('c6a') + 8)}>
              <rect x={-360} y={-260} width={720} height={520} rx={10} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-200} size={40}>The New York Times</Text>
              <line x1={-320} y1={-160} x2={320} y2={-160} stroke={C.ink} strokeWidth={3} />
              <Text y={-90} size={46}>"Stop Coddling</Text>
              <Text y={-30} size={46}>the Super-Rich"</Text>
              {[40, 90, 140, 190].map((y) => <line key={y} x1={-300} x2={300} y1={y} y2={y} stroke="#C9CED6" strokeWidth={10} strokeLinecap="round" />)}
              <Text y={240} size={30} color="#5B6470">Aug 14, 2011</Text>
            </G2>
          )}
          {f >= sv && (
            <g>
              <line x1={820} y1={860} x2={1780} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
              <Bar x={1040} y={860} h={ease(f, sv, sv + 12, 2, 17.4 * 14)} color={C.green} label="Buffett" value="17.4%" w={260} />
              <Bar x={1500} y={860} h={ease(f, tt, tt + 14, 2, 41 * 14)} color={C.red} label="his office staff" value={f >= ft ? '33–41%' : '33%+'} w={260} />
            </g>
          )}
          {f >= inv && <G2 x={1300} y={130} s={pop(f, inv)}><Text size={40}>{f >= sal ? 'investments: lower rates · salaries: higher' : 'most of his money: investments'}</Text></G2>}
          <SourceTag f={f} at={sv} text="W. Buffett, NYT op-ed, Aug 14, 2011" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 Other side ============
  {
    const d1 = w('c7b', 'one');
    const cr = w('c7b', 'crash');
    const gn = w('c7b', 'gone');
    const d2 = w('c7c', 'two');
    const tw = w('c7c', 'twenty');
    const tc = w('c7c', 'twice');
    const d3 = w('c7d', 'three');
    const ft = w('c7d', 'forty');
    const ans = w('c7e', 'answers');
    const pol = w('c7f', 'political');
    q(A('c7a') + 2, 'pop', 0.5);
    q(d1, 'ding', 0.5);
    q(cr, 'thud', 0.6);
    q(gn, 'poof', 0.5);
    q(d2, 'ding', 0.5);
    q(tc, 'pop', 0.5);
    q(d3, 'ding', 0.5);
    q(ft, 'pop', 0.5);
    q(ans, 'whoosh', 0.5);
    q(pol, 'stamp', 0.6);
    const tilt = f < ans ? ease(f, d1, d3 + 20, 0, -10) : ease(f, ans, ans + 30, -10, 0);
    scene(A('c7a'), () =>
      f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={920} s={pop(f, A('c7a') + 2)} tilt={tilt} left="keep the rules" right="change them" />
            {f >= d1 && f < d2 && (
              <G2 x={960} y={200} s={pop(f, d1)}>
                <Text size={48}>1. paper gains can vanish</Text>
                {f >= cr && <path d="M -300 120 L -150 60 L 0 100 L 150 40 L 300 200" transform="translate(0,20)" fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />}
              </G2>
            )}
            {f >= d2 && f < d3 && <G2 x={960} y={200} s={pop(f, d2)}><Text size={48}>2. company already paid 21% tax</Text>{f >= tc && <Text y={70} size={40} color={C.red}>"taxed twice?"</Text>}</G2>}
            {f >= d3 && f < ans && <G2 x={960} y={200} s={pop(f, d3)}><Text size={48}>3. top 1% pay ~40% of income taxes</Text></G2>}
            {f >= ans && <G2 x={960} y={200} s={pop(f, ans)}><Text size={44}>other side: small % of a huge fortune · workers can't borrow billions</Text></G2>}
            <SourceTag f={f} at={ft} text="Tax Foundation / IRS data (2022)" until={ans} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={380} s={pop(f, pol, 9, 260)} text="A POLITICAL QUESTION" size={70} color={C.blue} />
            <G2 x={960} y={620} s={pop(f, pol + 20)}><Text size={52}>now you know how the rules work</Text></G2>
            <Dave f={f} x={960} y={1000} s={0.8} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 copy ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Own things that grow', 'Hold 1+ year → lower tax', 'Use 401(k) / IRA accounts', 'Step-up applies to you too'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>What Dave can copy</Text></G2>
          <G2 x={1620} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1080} />)}
          {cur === 0 && <Dave f={f} x={960} y={900} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={960} y={480} s={pop(f, A('c8a') + 6)}><Bubble text="Can I do this too?" size={48} tail="down" /></G2>}
          {cur === 1 && <G2 x={1600} y={560}><AppleTree s={0.6} apples={6} /></G2>}
          {cur === 2 && <G2 x={1600} y={520}><Calendar s={0.8} top="HOLD" year="1 yr+" flip={0} /></G2>}
          {cur === 3 && <G2 x={1600} y={520}><rect x={-150} y={-100} width={300} height={200} rx={20} fill={C.blue} stroke={C.ink} strokeWidth={6} /><Text y={-20} size={50} color="#fff">401(k)</Text><Text y={50} size={44} color="#fff">IRA</Text></G2>}
          {cur === 4 && <G2 x={1600} y={640}><House s={0.45} /><Grandma f={f} x={-200} y={40} s={0.7} keys={[{at: 0, pose: 'wave', expr: 'happy'}]} /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 ============
  const recap = ['Salaries: taxed now · growth: taxed at sale', 'Buy · borrow · die (step-up)', 'Legal, debated, two real sides'];
  {
    const r = [bs('c9b'), bs('c9c'), bs('c9d')];
    q(A('c9a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c9a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={330} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1260} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('c9e', 'credit');
    const sb = w('c9f', 'subscribe');
    const fr = w('c9f', 'free');
    q(cs, 'chime', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={pop(f, A('c9e'))}><Text size={60}>Next: the secret number that follows you</Text></G2>
            <G2 x={960} y={520} s={pop(f, cs)}>
              <circle r={220} fill="#fff" stroke={C.ink} strokeWidth={8} />
              <path d="M -170 60 A 180 180 0 0 1 170 60" fill="none" stroke={C.green} strokeWidth={30} strokeLinecap="round" />
              <Text y={20} size={110}>???</Text>
              <Text y={120} size={36}>CREDIT SCORE</Text>
            </G2>
            <Dave f={f} x={400} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'suspicious'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Richie f={f} x={1550} y={860} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5e', 'poof') + 20;
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

const PriceTag2: React.FC<{text: string}> = ({text}) => (
  <g>
    <path d="M -180 -50 L 130 -50 L 180 0 L 130 50 L -180 50 Z" fill={C.yellow} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <Text x={-20} y={3} size={46}>{text}</Text>
  </g>
);
