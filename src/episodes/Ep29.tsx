import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, Beach} from '../fx';
import {Arrow, Bank, Bubble, Car, Calendar, Coin, Duck, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Envelope, Frame, Icon, Magnifier, Phone, Row, Shield, SubButton, Bell, Sun} from '../props2';
import {House, LineChart} from '../props4';
import {Contract} from '../props5';
import {CreditCard} from '../props2';
import {Raccoon} from '../props3';
import {Lemon, Stand, Thermo} from '../props7';
import {Jar} from '../props19';
import {CandyBar, Gym, IceCream, Lawnmower, Lock, Shoe, TBill} from '../props29';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;

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

export const Ep29: React.FC = () => {
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
    const fv = w('o1', 'five');
    const fc = w('o1', 'fifty');
    const nt = w('o1', 'not');
    const fc2 = w('o1', 'fifty', 2);
    const zr = w('o2', 'zero');
    const pn = w('o2', 'penny');
    q(2, 'pop', 0.6);
    q(fv, 'cash', 0.5);
    q(fc, 'coin', 0.6);
    q(nt, 'buzz', 0.5);
    q(fc2, 'trombone', 0.5);
    q(zr, 'stamp', 0.6);
    q(pn, 'coin', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={330} y={900} s={1.25} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: fc, pose: 'shock', expr: 'shock', look: 0.8}, {at: zr, pose: 'facepalm', expr: 'sad'}]} />
          <G2 x={820} y={560} s={1.25 * P(0) * bump(fv, 0.08)}><Phone title="DAVE'S SAVINGS" value="$5,000" /></G2>
          <Box x={1450} y={300} w={720} h={300} s={P(0)}>
            <Text y={-90} size={36} color={GRAY}>INTEREST PAID LAST YEAR</Text>
            <G2 y={30} s={bump(fc, 0.2)}><Text size={130} color={f >= fc ? C.red : GRAY}>{f >= fc ? '$0.50' : '?'}</Text></G2>
          </Box>
          <G2 x={1450} y={520} s={P(0) * bump(nt)} o={lt(nt)}><Text size={60} color={C.red}>not $50. fifty CENTS.</Text></G2>
          <Box x={1450} y={740} w={720} h={220} s={P(0)} o={lt(zr, 0.45)}>
            <Text y={-50} size={40} color={GRAY}>Dave's rate</Text>
            <G2 y={30} s={bump(zr, 0.2)}><Text size={90} color={C.red}>0.01%</Text></G2>
          </Box>
          <G2 x={1450} y={920} s={P(0) * bump(pn)} o={lt(pn)}>
            <Coin x={-300} s={1.4} />
            <Text x={30} size={44}>= 1¢ per $100 per year</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pk = w('o3', 'park');
    const th = w('o3', 'three');
    const sf = w('o3', 'safe');
    const hd = w('o4', 'hundred');
    const ft = w('o5', 'fifty');
    const rs = w('o5', 'rest');
    q(pk, 'whoosh', 0.5);
    q(th, 'ding', 0.6);
    q(sf, 'stamp', 0.5);
    q(hd, 'cash', 0.6);
    q(ft, 'coin', 0.4);
    q(rs, 'sting', 0.6);
    const mx = ease(f, pk, pk + 24, 820, 1500);
    const my = ease(f, pk, pk + 24, 250, 250) - Math.sin(Math.PI * lin(f, pk, pk + 24)) * 90;
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={230} y={900} s={1.05} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: rs, pose: 'shock', expr: 'angry', look: 0.8}]} />
          <Bank x={820} y={880} s={0.55 * P(A('o3'))} label="DAVE'S BANK" />
          <Bank x={1500} y={880} s={0.55 * P(A('o3'))} label="THE FED" />
          <G2 x={mx} y={my + 230} s={P(A('o3'))}><MoneyStack n={5} s={0.9} label="DAVE'S $5,000" /></G2>
          <Arrow d="M 1000 380 Q 1160 300 1320 380" t={ease(f, pk, pk + 16)} color={C.green} />
          <Box x={820} y={140} w={440} h={170} s={P(A('o3'))} o={lt(ft, 0.7)}>
            <Text y={-40} size={30} color={GRAY}>pays Dave</Text>
            <G2 y={25} s={bump(ft)}><Text size={64} color={C.red}>0.01% · $0.50</Text></G2>
          </Box>
          <Box x={1500} y={140} w={440} h={170} s={P(A('o3'))}>
            <Text y={-40} size={30} color={GRAY}>Fed pays the bank</Text>
            <G2 y={25} s={bump(th, 0.2)}><Text size={64} color={f >= th ? C.green : GRAY}>{f >= th ? '3.9%' : '?'}{f >= hd ? ' · $195' : ''}</Text></G2>
          </Box>
          <G2 x={1840} y={560} s={P(A('o3')) * bump(sf)} o={lt(sf)} r={8}><Text size={40} color={C.green}>no risk</Text></G2>
          <Box x={1160} y={620} w={300} h={130} s={P(A('o3')) * bump(rs, 0.2)} fill={f >= rs ? C.yellow : '#fff'}>
            <Text y={-30} size={28} color={GRAY}>bank keeps</Text>
            <Text y={20} size={50} color={C.red}>{f >= rs ? '$194.50' : '?'}</Text>
          </Box>
          <SourceTag f={f} at={th} text="Federal Reserve: interest on reserves 3.90% (Sept 17, 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'rest'), w('o6', 'away'), w('o6', 'more')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['WHERE THE REST GOES', 'WHY BANKS GET AWAY WITH IT', 'WHERE TO EARN MORE'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <Bank s={0.4} y={120} label="BANK" />}
                {i === 1 && <Shoe s={0.9} y={-40} stretch={0.4} />}
                {i === 2 && <Jar s={0.8} y={0} level={0.8} label="MORE" />}
                <Text y={210} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dave's fifty cents ============
  {
    const zr = w('c1b', 'zero');
    const tn = w('c1b', 'tiny', 1);
    const tm = w('c1c', 'times');
    const fc = w('c1c', 'fifty');
    const cd = w('c1c', 'candy');
    q(zr, 'pop', 0.5);
    q(tn, 'boing', 0.5);
    q(tm, 'click', 0.5);
    q(fc, 'coin', 0.6);
    q(cd, 'trombone', 0.5);
    const fd = w('c1d', 'fdic');
    const zr2 = w('c1d', 'zero');
    const tw = w('c1d', 'two');
    const fl = w('c1e', 'follow');
    q(fd, 'paper', 0.5);
    q(zr2, 'ding', 0.6);
    q(tw, 'coin', 0.5);
    q(fl, 'step', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={290} y={900} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: 0.8}, {at: tn, pose: 'shrug', expr: 'worried'}, {at: cd, pose: 'facepalm', expr: 'sad'}]} />
            <G2 x={740} y={520} s={1.15 * P(A('c1a'))}><Phone title="MY BANK" value="$5,000" /></G2>
            <G2 x={740} y={880} s={P(A('c1a')) * bump(zr, 0.2) * (f >= tn ? 1 - 0.25 * Math.sin(Math.PI * lin(f, tn, tn + 14)) : 1)}>
              <rect x={-150} y={-44} width={300} height={88} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={48}>0.01% APY</Text>
            </G2>
            <Box x={1420} y={320} w={820} h={300} s={P(A('c1a')) * bump(tm, 0.06)}>
              <Text y={-70} size={60}>$5,000 × 0.01% =</Text>
              <G2 y={50} s={bump(fc, 0.2)}><Text size={110} color={f >= fc ? C.red : GRAY}>{f >= fc ? '$0.50 / year' : '?'}</Text></G2>
            </Box>
            <G2 x={1420} y={700} s={1.1 * P(A('c1a')) * bump(cd)}><CandyBar /></G2>
            <G2 x={1420} y={850} s={P(A('c1a'))} o={lt(cd)}><Text size={44} color={C.red}>{f >= cd ? "can't even buy this" : 'a candy bar...'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={130} s={P(A('c1d'))}><Text size={50}>average U.S. savings rate</Text></G2>
            <line x1={300} y1={800} x2={1020} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={470} y={800} h={16} color={C.red} label="Dave's bank" value="0.01%" w={220} />
            <Bar x={850} y={800} h={ease(f, zr2 - 4, zr2 + 14, 40, 370)} color={C.blue} label="national average" value={f >= zr2 ? '0.37%' : '?'} w={220} />
            <G2 x={660} y={250} s={P(A('c1d')) * bump(tw)} o={lt(tw)}><Text size={44} color={C.green}>= $18.50 a year (under $2 a month)</Text></G2>
            <G2 x={660} y={950} s={P(A('c1d')) * bump(fd)}><Text size={36} color={GRAY}>{f >= zr2 ? 'better... but still tiny' : 'source: FDIC'}</Text></G2>
            <Bank x={1560} y={880} s={0.55 * P(A('c1d'))} label="BANK" />
            <Dave f={f} x={1210} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: fl, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
            {[0, 1, 2].map((i) => <Coin key={i} x={f >= fl ? lin(f, fl + i * 5, fl + 30 + i * 5, 1270 + i * 30, 1480) : 1270 + i * 40} y={820 - i * 6} s={1} />)}
            <G2 x={1560} y={220} s={P(A('c1d')) * bump(fl)} o={lt(fl)}><Text size={48} color={C.blue}>follow the cash →</Text></G2>
            <SourceTag f={f} at={fd} text="FDIC National Rates, Sept 21, 2026: savings 0.37%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 markup ============
  {
    const by = w('c2a', 'buys');
    const sl = w('c2a', 'sells');
    const sv = w('c2b', 'savers');
    const cs = w('c2b', 'cost');
    const it = [w('c2c', 'car'), w('c2c', 'mortgages'), w('c2c', 'credit'), w('c2c', 'government')];
    const nt = w('c2d', 'net');
    const mk = w('c2d', 'markup');
    q(by, 'coin', 0.5);
    q(sl, 'cash', 0.5);
    q(cs, 'pop', 0.5);
    it.forEach((x) => q(x, 'pop2', 0.5));
    q(nt, 'stamp', 0.6);
    q(mk, 'ding', 0.5);
    const ln = w('c2e', 'lemons');
    const ct = w('c2e', 'cent');
    const fv = w('c2e', 'five');
    q(ln, 'pop', 0.5);
    q(ct, 'coin', 0.5);
    q(fv, 'cash', 0.6);
    const fd = w('c2f', 'fdic');
    const e5 = w('c2f', 'five');
    const e2 = w('c2f', 'two');
    const e3 = w('c2g', 'three');
    const tw = w('c2g', 'twenty');
    const lm = w('c2g', 'lemonade');
    q(fd, 'paper', 0.5);
    q(e5, 'ding', 0.5);
    q(e2, 'ding', 0.5);
    q(e3, 'stamp', 0.6);
    q(tw, 'cash', 0.6);
    q(lm, 'pop', 0.5);
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2a')) * bump(nt, 0.1)} o={lt(nt, 0.5)}>
              <rect x={-620} y={-50} width={1240} height={100} rx={24} fill={f >= nt ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={46}>EARNS − PAYS = NET INTEREST MARGIN {f >= mk ? '(the markup)' : ''}</Text>
            </G2>
            <Dave f={f} x={230} y={720} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}]} handItem={<Coin s={1.2} />} />
            <Bank x={960} y={720} s={0.55 * P(A('c2a'))} label="MONEY SHOP" />
            <Bob f={f} x={1690} y={720} s={0.95} keys={[{at: 0, pose: 'present', expr: 'neutral', look: -0.8}]} />
            <Arrow d="M 330 520 L 720 520" t={1} color={C.green} />
            <Arrow d="M 1200 520 L 1590 520" t={1} color={C.red} />
            <G2 x={520} y={400} s={P(A('c2a')) * bump(by)} o={lt(by, 0.5)}><Text size={42} color={C.green}>BUYS money cheap</Text><Text y={52} size={34} color={GRAY}>{f >= cs ? 'pays savers 0.01% = its cost' : 'from savers'}</Text></G2>
            <G2 x={1400} y={400} s={P(A('c2a')) * bump(sl)} o={lt(sl, 0.5)}><Text size={42} color={C.red}>SELLS it expensive</Text><Text y={52} size={34} color={GRAY}>as loans & investments</Text></G2>
            {['car loans', 'mortgages', 'credit cards', 'gov. bonds'].map((l, i) => (
              <G2 key={l} x={360 + i * 400} y={880} s={P(A('c2a')) * bump(it[i])} o={lt(it[i], 0.4)}>
                <rect x={-170} y={-45} width={340} height={90} rx={20} fill={f >= it[i] ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={40}>{l}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={130} s={P(A('c2e'))}><Text size={60}>the bank's lemonade stand</Text></G2>
            <Stand x={960} y={822} s={1.25 * P(A('c2e'))} label="BANK LEMONADE" big />
            <Banker f={f} x={1420} y={822} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}, {at: fv, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={330} y={480} s={P(A('c2e')) * bump(ct, 0.2)} o={lt(ln, 0.6)}>
              <Lemon s={2.2} />
              <Text y={140} size={52} color={C.green}>BUY: 1¢</Text>
            </G2>
            <G2 x={1700} y={480} s={P(A('c2e')) * bump(fv, 0.2)} o={lt(fv, 0.6)}>
              <path d="M -50 -90 L 50 -90 L 38 60 L -38 60 Z" fill="#FFF7B0" stroke={C.ink} strokeWidth={6} />
              <Text y={140} size={52} color={C.red}>SELL: $5</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={120} s={P(A('c2f'))}><Text size={48}>U.S. banks · second quarter 2026</Text></G2>
            <line x1={260} y1={820} x2={1100} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={460} y={820} h={ease(f, e5 - 4, e5 + 14, 60, 535)} color={C.green} label="banks earn" value={f >= e5 ? '5.35%' : '?'} w={240} />
            <Bar x={820} y={820} h={ease(f, e2 - 4, e2 + 14, 60, 203)} color={C.red} label="banks pay" value={f >= e2 ? '2.03%' : '?'} w={240} />
            <G2 o={lt(e3, 0.3)}>
              <path d={`M 990 ${820 - 535} L 1030 ${820 - 535} L 1030 ${820 - 203} L 990 ${820 - 203}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            </G2>
            <Box x={1450} y={400} w={560} h={220} s={P(A('c2f')) * bump(e3, 0.15)} fill={f >= e3 ? C.yellow : '#fff'}>
              <Text y={-60} size={34} color={GRAY}>NET INTEREST MARGIN</Text>
              <Text y={30} size={96}>{f >= e3 ? '3.32%' : '?'}</Text>
            </Box>
            <Box x={1450} y={680} w={560} h={200} s={P(A('c2f')) * bump(tw, 0.15)} o={lt(tw, 0.5)}>
              <Text y={-50} size={32} color={GRAY}>deposits at U.S. banks</Text>
              <Text y={30} size={70} color={C.green}>{f >= tw ? '$20.7 TRILLION' : '?'}</Text>
            </Box>
            <Banker f={f} x={1800} y={960} s={0.7} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}, {at: lm, pose: 'celebrate', expr: 'grin'}]} />
            <SourceTag f={f} at={fd} text="FDIC Quarterly Banking Profile, Q2 2026" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 three jobs ============
  {
    const jb = [w('c3b', 'loans'), w('c3c', 'treasury'), w('c3d', 'reserves')];
    const rc = w('c3b', 'raccoon');
    const sf = w('c3c', 'safe');
    jb.forEach((x) => q(x, 'pop', 0.55));
    q(rc, 'pop2', 0.6);
    q(sf, 'ding', 0.5);
    const sn = w('c3d', 'sneaky');
    const fr = w('c3d', 'federal');
    const ip = w('c3d', 'interest', 1);
    const th = w('c3e', 'three');
    const z1 = w('c3e', 'zero');
    const z2 = w('c3e', 'zero', 1);
    const hd = w('c3f', 'hundred');
    const ft = w('c3f', 'fifty');
    q(sn, 'boing', 0.4);
    q(fr, 'quack', 0.3);
    q(ip, 'coin', 0.6);
    q(th, 'stamp', 0.6);
    q(z1, 'ding', 0.5);
    q(z2, 'ding', 0.5);
    q(hd, 'cash', 0.7);
    q(ft, 'trombone', 0.5);
    const fre = w('c3g', 'free');
    const rn = w('c3g', 'rents');
    const two = w('c3g', 'two');
    q(fre, 'pop', 0.5);
    q(rn, 'whoosh', 0.5);
    q(two, 'cash', 0.6);
    const cur = jb.filter((x) => f >= x).length;
    scene(A('c3a'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={P(A('c3a'))}><MoneyStack n={5} s={1} label="DAVE'S $5,000" /></G2>
            {[0, 1, 2].map((i) => <Arrow key={i} d={`M ${960 + (i - 1) * 60} 240 L ${380 + i * 580} 320`} t={cur > i ? 1 : 0.35} color={cur > i ? C.green : '#C9C0AE'} w={6} />)}
            {['1. LOANS', '2. TREASURY BILLS', '3. RESERVES AT THE FED'].map((l, i) => (
              <G2 key={l} x={380 + i * 580} y={620} s={P(A('c3a')) * bump(jb[i], 0.08)} o={cur > i ? 1 : 0.45}>
                <Frame w={540} h={540}>
                  {i === 0 && (
                    <g>
                      <Car x={-120} y={-90} s={0.9} />
                      <CreditCard x={120} y={-110} s={0.5} />
                      <Raccoon f={f} x={0} y={60} s={0.45 * bump(rc, 0.3)} mood="greedy" />
                    </g>
                  )}
                  {i === 1 && (
                    <g>
                      <TBill y={-80} s={0.95} />
                      <Text y={90} size={34} color={f >= sf ? C.green : GRAY}>super safe · pays ~ the Fed's rate</Text>
                    </g>
                  )}
                  {i === 2 && <Bank s={0.33} y={130} label="THE FED" />}
                  <Text y={220} size={36}>{l}</Text>
                </Frame>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Banker f={f} x={400} y={900} s={1.15} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}, {at: z2, pose: 'relax', expr: 'grin'}]} />
            <Bank x={1300} y={900} s={0.55 * P(A('c3d'))} label="THE FED" />
            <G2 x={1300} y={560} s={P(A('c3d')) * bump(ip, 0.15)}><MoneyStack n={4} s={0.8} label="bank's cash" /></G2>
            <Box x={1300} y={170} w={620} h={220} s={P(A('c3d')) * bump(th, 0.15)} fill={f >= th ? C.greenLight : '#fff'}>
              <Text y={-60} size={34} color={GRAY}>INTEREST ON RESERVES</Text>
              <Text y={30} size={100}>{f >= th ? '3.90%' : '?'}</Text>
            </Box>
            <G2 x={1760} y={430} s={P(A('c3d')) * bump(z1)} o={lt(z1)}><Text size={44} color={C.green}>zero risk</Text></G2>
            <G2 x={1760} y={510} s={P(A('c3d')) * bump(z2)} o={lt(z2)}><Text size={44} color={C.green}>zero effort</Text></G2>
            <Box x={520} y={250} w={640} h={120} s={P(A('c3d')) * bump(hd, 0.12)} o={lt(hd, 0.5)}>
              <Text size={44}>Fed → bank: {f >= hd ? '$195 a year' : '?'}</Text>
            </Box>
            <Box x={520} y={400} w={640} h={120} s={P(A('c3d')) * bump(ft, 0.12)} o={lt(ft, 0.5)}>
              <Text size={44} color={C.red}>bank → Dave: $0.50</Text>
            </Box>
            <SourceTag f={f} at={th} text="Federal Reserve Implementation Note, Sept 16, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={280} y={822} s={1.05} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: two, pose: 'shock', expr: 'shock'}]} />
            <Lawnmower x={ease(f, rn, rn + 30, 700, 1330)} y={790} s={1} f={f >= rn ? f - rn : 0} />
            <Bob f={f} x={1000} y={822} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}, {at: rn, pose: 'present', expr: 'smug', look: 0.8}]} />
            <Stick f={f} x={1650} y={822} s={1.05} acc={['ponytail']} seed={44} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}]} handItem={<MoneyStack n={3} s={0.5} />} />
            <Box x={560} y={300} w={460} h={130} s={P(A('c3g')) * bump(fre, 0.15)} o={lt(fre, 0.55)}>
              <Text size={46}>Dave → Bob: $0</Text>
            </Box>
            <Box x={1380} y={300} w={560} h={130} s={P(A('c3g')) * bump(two, 0.15)} o={lt(two, 0.55)} fill={f >= two ? C.greenLight : '#fff'}>
              <Text size={46}>Bob → renter: $200</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 big profits ============
  {
    const en = w('c4a', 'enormous');
    const o1 = w('c4b', 'one');
    const th = w('c4b', 'three');
    const nn = w('c4c', 'ninety');
    const ev = w('c4c', 'every');
    q(en, 'cash', 0.5);
    q(o1, 'stamp', 0.6);
    q(th, 'tick', 0.5);
    q(nn, 'cash', 0.6);
    q(ev, 'ding', 0.6);
    const jp = w('c4d', 'jpmorgan');
    const sx = w('c4d', 'sixty');
    const fa = w('c4e', 'fair');
    const cs = [w('c4e', 'branches'), w('c4e', 'staff'), w('c4e', 'apps'), w('c4e', 'fraud'), w('c4e', 'loans')];
    const lm = w('c4f', 'lemon');
    q(jp, 'pop', 0.5);
    q(sx, 'cash', 0.6);
    q(fa, 'whoosh_s', 0.4);
    cs.forEach((x) => q(x, 'pop2', 0.45));
    q(lm, 'pop', 0.6);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Banker f={f} x={330} y={900} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.8}, {at: en, pose: 'celebrate', expr: 'grin'}]} />
            <MoneyStack x={180} y={960} n={6} s={0.8} />
            <MoneyStack x={500} y={960} n={8} s={0.8} />
            <Box x={1100} y={280} w={900} h={260} s={P(A('c4a')) * bump(o1, 0.1)}>
              <Text y={-80} size={34} color={GRAY}>U.S. BANKS · NET INTEREST INCOME · Q2 2026</Text>
              <Text y={30} size={110} color={f >= o1 ? C.green : GRAY}>{f >= o1 ? '$197 BILLION' : '?'}</Text>
            </Box>
            <Calendar x={1720} y={620} s={0.8 * P(A('c4a')) * bump(th, 0.2)} top="IN ONLY" year="3 mo" flip={0} />
            <Box x={1050} y={620} w={800} h={220} s={P(A('c4a')) * bump(nn, 0.1)} o={lt(nn, 0.55)}>
              <Text y={-60} size={34} color={GRAY}>TOTAL PROFIT THAT QUARTER</Text>
              <Text y={30} size={90} color={C.green}>{f >= nn ? '$90.1 BILLION' : '?'}</Text>
            </Box>
            <G2 x={1050} y={830} s={P(A('c4a')) * bump(ev)} o={lt(ev)}><Text size={54} color={C.red}>≈ $1 billion every single day</Text></G2>
            <SourceTag f={f} at={o1} text="FDIC QBP Q2 2026 · $90.1B ÷ 91 days ≈ $1B/day" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={500} y={290} w={760} h={330} s={P(A('c4d')) * bump(sx, 0.08)}>
              <Text y={-110} size={34} color={GRAY}>BIGGEST U.S. BANK</Text>
              <Text y={-50} size={56}>JPMorgan Chase</Text>
              <Text y={20} size={32} color={GRAY}>profit, last 12 months</Text>
              <Text y={95} size={96} color={f >= sx ? C.green : GRAY}>{f >= sx ? '~$63B' : '?'}</Text>
            </Box>
            <Bank x={500} y={900} s={0.42 * P(A('c4d'))} label="BIG BANK" />
            <G2 x={1400} y={130} s={P(A('c4d')) * bump(fa)} o={lt(fa, 0.5)}><Text size={48}>to be fair: real costs</Text></G2>
            {['branches', 'staff', 'apps', 'fraud', 'bad loans'].map((l, i) => (
              <G2 key={l} x={1400} y={240 + i * 100} s={P(A('c4d')) * bump(cs[i])} o={lt(cs[i], 0.4)}>
                <rect x={-230} y={-40} width={460} height={80} rx={18} fill={f >= cs[i] ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={40}>− {l}</Text>
              </G2>
            ))}
            <G2 x={1150} y={860} s={P(A('c4d')) * bump(lm, 0.25)} o={lt(lm, 0.55)}><Lemon s={1.6} /></G2>
            <G2 x={1520} y={860} s={P(A('c4d')) * bump(lm)} o={lt(lm, 0.55)}><Text size={40}>0.01% deposit = cheap lemon</Text></G2>
            <SourceTag f={f} at={sx} text="JPMorgan Chase filings: TTM net income ~$63.6B (to Q2 2026)" until={A('c4f')} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 why they get away with it ============
  {
    const rs = [w('c5b', 'one'), w('c5c', 'two'), w('c5d', 'three')];
    const eg = w('c5b', 'eighteen');
    const mv = w('c5c', 'moving');
    const ap = w('c5d', 'app');
    rs.forEach((x) => q(x, 'ding', 0.55));
    q(eg, 'pop', 0.4);
    q(mv, 'thud', 0.5);
    q(ap, 'pop', 0.4);
    const st = w('c5e', 'sticky');
    const gm = w('c5e', 'gum');
    const mo = w('c5e', 'more');
    q(st, 'stamp', 0.6);
    q(gm, 'boing', 0.6);
    q(mo, 'pop', 0.5);
    const sf = w('c5f', 'safer');
    const np = w('c5f', 'nope');
    const ins = w('c5f', 'insured');
    const sm = w('c5f', 'same');
    q(sf, 'dream', 0.4);
    q(np, 'buzz', 0.7);
    q(ins, 'stamp', 0.5);
    q(sm, 'ding', 0.6);
    const cur = rs.filter((x) => f >= x).length;
    scene(A('c5a'), () =>
      f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Text x={960} y={110} size={56} color={GRAY}>WHY PEOPLE DON'T LEAVE</Text>
            {['INERTIA', 'CONVENIENCE', 'BRANCHES & TRUST'].map((l, i) => (
              <G2 key={l} x={380 + i * 580} y={580} s={P(A('c5a')) * bump(rs[i], 0.08)} o={cur > i ? 1 : 0.45}>
                <Frame w={540} h={620}>
                  {i === 0 && (
                    <g>
                      <Calendar x={0} y={-150} s={0.6 * bump(eg, 0.2)} top="OPENED AT" year="18" flip={0} />
                      <Dave f={f} x={0} y={170} s={0.75} keys={[{at: 0, pose: 'relax', expr: 'tired'}]} />
                    </g>
                  )}
                  {i === 1 && (
                    <g>
                      <Envelope x={-120} y={-160} s={0.9} label="PAYCHECK" />
                      <Envelope x={120} y={-160} s={0.9} label="BILLS" />
                      <Icon kind="house" y={50} s={1.1 * bump(mv, 0.25)} />
                      <Text y={200} size={32} color={f >= mv ? C.red : GRAY}>switching = moving house</Text>
                    </g>
                  )}
                  {i === 2 && (
                    <g>
                      <Bank x={-110} y={60} s={0.3} label="BANK" />
                      <Phone x={150} y={-20} s={0.5 * bump(ap, 0.2)} title="APP BANK" value="?" />
                      <Text y={180} size={32} color={GRAY}>columns feel safe</Text>
                    </g>
                  )}
                  <Text y={270} size={40}>{l}</Text>
                </Frame>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={140} s={P(A('c5e')) * bump(st, 0.15)} text="STICKY MONEY" size={70} color={C.red} r={-4} />
            <Dave f={f} x={330} y={900} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <G2 x={900} y={520} s={1.4 * P(A('c5e'))}><Shoe stretch={ease(f, gm, gm + 40, 0.1, 1)} /></G2>
            <Banker f={f} x={1560} y={900} s={1.15} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}]} />
            <G2 x={1450} y={430} s={P(A('c5e')) * bump(mo)} o={lt(mo, 0.5)}><Bubble text={"why pay more?\nthey're not leaving"} size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5f'))}><Text size={54} color={f >= np ? C.green : GRAY}>{f >= np ? 'both FDIC insured = same protection' : 'myth: big bank = safer?'}</Text></G2>
            <Bank x={520} y={880} s={0.55 * P(A('c5f'))} label="BIG BANK" />
            <G2 x={1400} y={600} s={1.1 * P(A('c5f'))}><Phone title="ONLINE BANK" value="$5,000" /></G2>
            <Shield x={520} y={330} s={0.75 * P(A('c5f')) * bump(ins, 0.15)} o={lt(ins, 0.4)} />
            <Shield x={1720} y={380} s={0.75 * P(A('c5f')) * bump(ins, 0.15)} o={lt(ins, 0.4)} />
            <G2 x={960} y={560} s={P(A('c5f')) * bump(sm, 0.3)}><Text size={160} color={f >= sm ? C.green : GRAY}>=</Text></G2>
            {f >= np && <XMark x={960} y={560} s={0.35 * pop(f, np)} o={1 - lin(f, np + 20, np + 30)} />}
            <SourceTag f={f} at={ins} text="FDIC: $250,000 per depositor, per insured bank, per ownership category" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 HYSA ============
  {
    const hy = w('c6a', 'high');
    const on = w('c6b', 'online');
    const ps = w('c6b', 'pass');
    const fr = w('c6c', 'four');
    const tw = w('c6d', 'two');
    q(hy, 'ding', 0.5);
    q(on, 'pop', 0.5);
    q(ps, 'coin', 0.5);
    q(fr, 'stamp', 0.6);
    q(tw, 'cash', 0.7);
    const ins = w('c6e', 'insured');
    const two = w('c6e', 'two');
    const rw = [w('c6e', 'person'), w('c6e', 'bank'), w('c6e', 'type')];
    const fs = w('c6f', 'first');
    const rn = w('c6f', 'runs');
    const wn = w('c6g', 'warning');
    const ck = w('c6g', 'check');
    q(ins, 'stamp', 0.5);
    q(two, 'ding', 0.6);
    rw.forEach((x) => q(x, 'pop2', 0.45));
    q(fs, 'quack', 0.6);
    q(rn, 'crowd', 0.3);
    q(wn, 'buzz', 0.5);
    q(ck, 'ding', 0.5);
    scene(A('c6a'), () =>
      f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={960} h={170} s={P(A('c6a')) * bump(tw, 0.1)}>
              <Text y={-40} size={34} color={GRAY}>Dave's $5,000 for one year</Text>
              <Text y={25} size={64}>$0.50 <tspan fill={GRAY}>vs</tspan> <tspan fill={C.green}>{f >= tw ? '~$210' : '?'}</tspan></Text>
            </Box>
            <Bank x={330} y={900} s={0.5 * P(A('c6a'))} label="BIG BANK" />
            <line x1={680} y1={830} x2={1240} y2={830} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={820} y={830} h={16} color={C.red} label="big bank" value="0.01%" w={220} />
            <Bar x={1100} y={830} h={ease(f, fr - 4, fr + 14, 60, 420)} color={C.green} label="top HYSA" value={f >= fr ? '~4.2%' : '?'} w={220} />
            <G2 x={1590} y={560} s={1.1 * P(A('c6a')) * bump(on, 0.1)}><Phone title="ONLINE BANK" value="HYSA" color={C.green} /></G2>
            <G2 x={1590} y={900} s={P(A('c6a')) * bump(ps)} o={lt(ps, 0.45)}><Text size={38} color={C.green}>no marble lobby → higher rate</Text></G2>
            <SourceTag f={f} at={fr} text="Bankrate, best high-yield savings, Sept 2026: up to 4.20% APY" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Shield x={440} y={420} s={1.4 * P(A('c6e')) * bump(two, 0.12)} />
            <G2 x={440} y={710} s={P(A('c6e')) * bump(ins)}><Text size={48} color={C.blue}>check: INSURED?</Text></G2>
            {['per person', 'per bank', 'per account type'].map((l, i) => (
              <G2 key={l} x={1100} y={200 + i * 120} s={P(A('c6e')) * bump(rw[i])} o={lt(rw[i], 0.4)}>
                <rect x={-260} y={-45} width={520} height={90} rx={20} fill={f >= rw[i] ? '#DCE9FF' : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={42}>{l}</Text>
              </G2>
            ))}
            <G2 x={1000} y={700} o={lt(fs, 0.45)} s={P(A('c6e')) * bump(fs, 0.2)}>
              <Duck f={f} s={0.8} />
              <Text y={-150} size={34}>ep01: bank runs happen</Text>
            </G2>
            <G2 x={1690} y={640} s={0.8 * P(A('c6e')) * bump(wn, 0.12)} o={lt(wn, 0.5)}><Phone title="MONEY APP" value="?" /></G2>
            <Icon kind="warning" x={1500} y={760} s={0.55 * P(A('c6e')) * bump(wn, 0.3)} o={lt(wn, 0.4)} />
            <G2 x={1690} y={240} s={P(A('c6e')) * bump(ck)} o={lt(ck, 0.4)}>
              <Text size={36}>is the bank behind</Text>
              <Text y={46} size={36} color={C.red}>the app insured?</Text>
            </G2>
            <SourceTag f={f} at={two} text="FDIC deposit insurance: $250,000 per depositor, per bank, per category" until={A('c6f')} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 CDs, MMFs, T-bills ============
  {
    const fr = [w('c7b', 'certificate'), w('c7e', 'money'), w('c7f', 'treasury')];
    const lk = w('c7b', 'locked');
    const pn = w('c7b', 'penalty');
    const gy = w('c7c', 'gym');
    const rt = w('c7d', 'one', 1);
    const sh = w('c7d', 'shopping');
    const nt = w('c7e', 'not');
    const stt = w('c7f', 'state');
    fr.forEach((x) => q(x, 'pop', 0.55));
    q(lk, 'clank', 0.5);
    q(pn, 'buzz', 0.5);
    q(gy, 'boing', 0.5);
    q(rt, 'ding', 0.5);
    q(sh, 'pop2', 0.4);
    q(nt, 'stamp', 0.5);
    q(stt, 'ding', 0.6);
    const cur = fr.filter((x) => f >= x).length;
    const sk = shake(f, pn, 12, 14);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={105} size={54} color={GRAY}>3 MORE OPTIONS</Text>
          {['CD', 'MONEY MARKET FUND', 'TREASURY BILLS'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={570} s={P(A('c7a')) * bump(fr[i], 0.07)} o={cur > i ? 1 : 0.45}>
              <Frame w={540} h={640}>
                {i === 0 && (
                  <g>
                    <Lock x={-130 + sk.x} y={-150} s={0.8 * bump(lk, 0.2)} open={0} />
                    <G2 x={100} y={-160} s={0.8 * bump(gy, 0.25)} r={6}><Gym s={0.9} /></G2>
                    <Text y={20} size={34} color={f >= pn ? C.red : GRAY}>rate locked · early exit = penalty</Text>
                    <Text y={100} size={34} color={GRAY}>avg 1-year CD:</Text>
                    <G2 y={170} s={bump(rt, 0.2)}><Text size={64} color={C.blue}>{f >= rt ? '1.73%' : '?'}</Text></G2>
                  </g>
                )}
                {i === 1 && (
                  <g>
                    <MoneyStack y={-80} n={5} s={1} />
                    <TBill y={-170} x={120} s={0.4} />
                    <Text y={40} size={34} color={GRAY}>buys very short, safe debt</Text>
                    <Text y={100} size={34} color={GRAY}>yield follows the Fed</Text>
                    <G2 y={180} s={bump(nt, 0.2)} o={lt(nt, 0.4)}><Text size={40} color={C.red}>NOT FDIC insured</Text></G2>
                  </g>
                )}
                {i === 2 && (
                  <g>
                    <TBill y={-120} s={1} />
                    <Text y={40} size={34} color={GRAY}>buy straight from</Text>
                    <Text y={90} size={34} color={GRAY}>the government</Text>
                    <G2 y={180} s={bump(stt, 0.2)} o={lt(stt, 0.4)}><Text size={40} color={C.green}>no state income tax</Text></G2>
                  </g>
                )}
                <Text y={275} size={40}>{l}</Text>
              </Frame>
            </G2>
          ))}
          <SourceTag f={f} at={rt} text="FDIC National Rates, Sept 2026: 12-month CD 1.73%" until={fr[1]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 inflation ============
  {
    const th = w('c8b', 'three');
    const hd = w('c8c', 'hundred');
    const fc = w('c8c', 'fifty');
    q(th, 'stamp', 0.6);
    q(fc, 'coin', 0.4);
    q(hd, 'thud', 0.6);
    const ic = w('c8d', 'ice');
    const ml = w('c8d', 'melting');
    q(ic, 'pop', 0.5);
    q(ml, 'sputter', 0.5);
    const cp = w('c8e', 'compound');
    const gr = w('c8e', 'grows');
    const nz = w('c8e', 'zero');
    const fr = w('c8f', 'four');
    const bt = w('c8f', 'beats', 1);
    q(cp, 'pop', 0.5);
    q(gr, 'ding', 0.5);
    q(nz, 'trombone', 0.4);
    q(fr, 'ding', 0.5);
    q(bt, 'stamp', 0.6);
    const grow = Array.from({length: 21}).map((_, i) => 5000 * Math.pow(1.042, i));
    const flat = Array.from({length: 21}).map(() => 5000);
    scene(A('c8a'), () =>
      f < A('c8d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Thermo x={300} y={720} s={1.7 * P(A('c8a'))} level={ease(f, th - 4, th + 20, 0.25, 0.75)} />
            <G2 x={300} y={200} s={P(A('c8a')) * bump(th, 0.2)}><Text size={40} color={GRAY}>prices, 12 months</Text><Text y={70} size={90} color={C.red}>{f >= th ? '+3.4%' : '?'}</Text></G2>
            <Dave f={f} x={650} y={900} s={1.05} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: hd, pose: 'shock', expr: 'shock'}]} />
            <G2 x={1350} y={130} s={P(A('c8a'))}><Text size={52}>Dave's $5,000, one year</Text></G2>
            <line x1={950} y1={800} x2={1750} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={1150} y={800} h={20} color={C.green} label="interest earned" value="+$0.50" w={240} />
            <Bar x={1550} y={800} h={ease(f, hd - 4, hd + 14, 40, 420)} color={C.red} label="buying power lost" value={f >= hd ? '−$170' : '?'} w={240} />
            <SourceTag f={f} at={th} text="BLS CPI, Aug 2026: +3.4% y/y · $5,000 × 3.4% = $170" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Beach f={f} />
          <Svg>
            <Sun x={1700} y={180} f={f} />
            <Dave f={f} x={650} y={880} s={1.3} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: ml, pose: 'panic', expr: 'shock'}]} />
            <IceCream x={1150} y={480} s={1.5 * P(A('c8d')) * bump(ic, 0.1)} melt={ease(f, A('c8d') + 10, ml + 20, 0.1, 1)} />
            <G2 x={1150} y={170} s={P(A('c8d'))}><Text size={48}>savings at 0.01%</Text></G2>
            <G2 x={650} y={380} s={P(A('c8d')) * bump(ml)} o={lt(ml, 0.55)}><Bubble text={f >= ml ? "it's melting!" : "still there..."} size={44} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={130} s={P(A('c8e')) * bump(cp)}><Text size={48}>compound interest: 20 years</Text></G2>
            <LineChart x={560} y={560} t={ease(f, gr - 4, gr + 30, 0.3, 1)} pts={grow} lo={4500} hi={12000} w={720} h={480} color={C.green} />
            <LineChart x={560} y={560} t={1} pts={flat} lo={4500} hi={12000} w={720} h={480} color={C.red} axes={false} />
            <G2 x={1000} y={300} o={lt(gr, 0.5)}><Text size={40} color={C.green}>4.2% → ~$11,300</Text></G2>
            <G2 x={1000} y={800} s={bump(nz)} o={lt(nz, 0.5)}><Text size={40} color={C.red}>0.01% → ~$5,010</Text></G2>
            <line x1={1250} y1={830} x2={1800} y2={830} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={1350} y={830} h={420 * bump(fr, 0.1)} color={C.green} label="HYSA" value="4.2%" w={140} />
            <Bar x={1525} y={830} h={340} color={C.red} label="inflation" value="3.4%" w={140} />
            <Bar x={1700} y={830} h={16} color={GRAY} label="big bank" value="0.01%" w={140} />
            <G2 x={1525} y={180} s={P(A('c8e')) * bump(bt, 0.12)} o={lt(bt, 0.45)}><Text size={38} color={C.green}>+0.8% real vs −3.4% real</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 what Dave did ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const tp = w('c9d', 'teaser');
    const tw = w('c9f', 'twenty');
    const hd = w('c9f', 'hundred');
    q(tp, 'buzz', 0.4);
    q(tw, 'tick', 0.5);
    q(hd, 'cash', 0.6);
    const items = ['Emergency fund → HYSA', 'Check insurance: FDIC BankFind', 'Read the small print (teaser rates)', 'Check the rate once a year'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={56}>What Dave did</Text></G2>
          <G2 x={650} y={160}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={90} y={290 + i * 140} s={0.9 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1080} />)}
          <G2 x={650} y={880} s={P(A('c9a')) * bump(tw, 0.1)} o={lt(tw, 0.45)}><Text size={46} color={C.green}>20 minutes → ~$200 more a year</Text></G2>
          {cur === 0 && <Dave f={f} x={1560} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={1560} y={420}><Bubble text="where do I start?" size={44} tail="down" /></G2>}
          {cur === 1 && <G2 x={1560} y={560}><Jar s={1.1} level={0.8} label="EMERGENCY" /><Text y={260} size={40} color={C.green}>in a HYSA</Text></G2>}
          {cur === 2 && <G2 x={1560} y={520}><Shield s={1.1} /><Magnifier x={130} y={130} s={0.9} /></G2>}
          {cur === 3 && <G2 x={1560} y={520} s={bump(tp, 0.08)}><Contract s={1} lines={['TEASER: 5.00%*', '*first 3 months', '*up to $1,000 only']} /></G2>}
          {cur >= 4 && <G2 x={1560} y={520}><Calendar s={1} top="CHECK" year="yearly" flip={0} /><Dave f={f} x={-250} y={380} s={0.8} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Banks pay little, earn more: the NIM', 'It works because people never move', 'HYSA, CDs, funds, T-bills: check the fine print'];
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
    const hm = w('r5', 'home');
    const un = w('r5', 'unaffordable');
    const sb = w('r6', 'subscribe');
    const kp = w('r6', 'rest');
    q(hm, 'chime', 0.5);
    q(un, 'sting', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(kp, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={58}>Next: why houses became unaffordable</Text></G2>
            <House x={1250} y={880} s={0.9 * P(A('r5')) * bump(hm, 0.08)} />
            <G2 x={1600} y={420} s={P(A('r5')) * bump(un, 0.2)} r={8}>
              <rect x={-150} y={-55} width={300} height={110} rx={16} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={56} color={C.red}>$???,???</Text>
            </G2>
            <Dave f={f} x={450} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: un, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Banker f={f} x={1550} y={860} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}, {at: kp, pose: 'facepalm', expr: 'sad'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3f', 'cents') + 20;
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
