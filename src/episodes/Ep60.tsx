import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Street, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, SUB_FRAMES, subCues} from '../fx';
import {Car, Clock, Coin, MoneyStack, SourceTag, Stamp, Text, XMark, Bank} from '../props';
import {Bar, Bell, Frame, Magnifier, Row, SubButton} from '../props2';
import {Raccoon, SourceCard, Ticket, TollBooth} from '../props3';
import {SlicePie} from '../props8';
import {BetPhone} from '../props17';
import {Lock} from '../props29';
import {People} from '../props35';
import {Toggle} from '../props49';
import {AppPhone, Banner, BaitHook, Napkin, PizzaSign, PlateStack, Salad, Slip, Token} from '../props60';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Host: React.FC<SP> = (p) => <Stick acc={['fedora', 'tie']} seed={63} {...p} />;

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

const Rewind: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <G2 x={x} y={y} s={s}>
    <path d="M 0 -50 L -70 0 L 0 50 Z M 70 -50 L 0 0 L 70 50 Z" fill="#fff" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
  </G2>
);

export const Ep60: React.FC = () => {
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
  const bz = w('o1', 'buzzes');
  const mx = w('o1', 'max');
  const wn1 = w('o1', 'winning');
  const ct = w('o1', 'cut');
  q(0, 'pop', 0.5);
  q(bz, 'buzz', 0.6);
  q(mx, 'stamp', 0.7);
  q(wn1, 'coin', 0.5);
  q(ct, 'thud', 0.6);
  const o1Scene = (ff: number) => {
    const sk = shake(ff, mx, 16, 14);
    const drop = ease(ff, mx - 4, mx + 8, -260, 0);
    return (
      <AbsoluteFill>
        <Cam f={ff} keys={[[0, 1.15, 960, 520], [45, 1, 960, 540]]}>
          <Interior />
          <Svg>
            <Dave f={ff} x={520} y={930} s={1.25} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.7}, {at: ct, pose: 'shock', expr: 'shock', look: 0.7}]} sweat={ff >= ct} />
            <G2 x={1240 + sk.x} y={540 + sk.y} s={1.05 * (1 + 0.04 * Math.sin(ff / 3) * (ff < mx ? 1 : 0))}>
              <AppPhone>
                <Text y={-170} size={30} color={GRAY}>YOUR BALANCE</Text>
                <Text y={-90} size={84} color={C.green}>+$640</Text>
                <Text y={-20} size={28} color={GRAY}>you're on a hot streak!</Text>
                <rect x={-130} y={40} width={260} height={90} rx={20} fill={ff >= mx ? '#E3E8EE' : C.green} stroke={C.ink} strokeWidth={4} />
                <Text y={86} size={40} color={ff >= mx ? GRAY : '#fff'}>{ff >= mx ? 'MAX $2' : 'BET $500'}</Text>
              </AppPhone>
            </G2>
            <G2 x={1240} y={250 + drop} o={ff >= mx - 4 ? 1 : 0} s={bump(mx, 0.1)}>
              <Banner title="BET APP · now" body="MAX BET: $2.00" w={600} />
            </G2>
            <G2 x={520} y={300} s={pop(ff, 2)}><Text size={52} color={ff >= ct ? C.red : C.green}>{ff >= ct ? 'CUT OFF.' : 'WINNING!'}</Text></G2>
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
  q(RW + 4, 'flip', 0.5);
  scene(FR, () => (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}</AbsoluteFill>
      <AbsoluteFill style={{background: '#fff', opacity: 1 - ease(f, FR, FR + 8)}} />
      <Svg>
        <G2 x={520} y={250} s={pop(f, FR + 4)}>
          <rect x={-230} y={-55} width={460} height={110} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
          <Text y={4} size={58}>THAT'S DAVE</Text>
        </G2>
        <path d="M 520 320 L 520 500" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={ease(f, FR + 6, FR + 12)} />
        <path d="M 490 470 L 520 510 L 550 470" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={ease(f, FR + 6, FR + 12)} />
        <G2 x={1240} y={980} s={pop(f, w('o2', 'winning'))}><Text size={40} color={C.red} stroke="#fff" sw={10}>winning = kicked out?</Text></G2>
      </Svg>
    </AbsoluteFill>
  ), false);
  scene(RW, () => (
    <AbsoluteFill>
      {o1Scene(Math.max(0, FR - (f - RW) * 4))}
      <AbsoluteFill style={{background: 'rgba(29,53,87,0.18)'}} />
      <Svg>
        <Rewind x={180} y={150} s={1 + 0.1 * Math.sin(f / 3)} />
        <Stamp x={960} y={150} s={pop(f, RW + 2)} text="3 MONTHS EARLIER" color={C.navy} size={56} r={-3} />
      </Svg>
    </AbsoluteFill>
  ), false);
  {
    const ad = w('o3', 'ad');
    const th = w('o3', 'thousand');
    const fr = w('o3', 'free');
    q(ad, 'pop', 0.6);
    q(th, 'cash', 0.6);
    q(fr, 'ding', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.6}, {at: fr, pose: 'point_r', expr: 'money', look: 0.6}]} />
          <G2 x={1240} y={540} s={P(A('o3')) * bump(ad, 0.06)}>
            <AppPhone>
              <Text y={-170} size={34} color={GRAY}>NEW CUSTOMERS</Text>
              <Text y={-100} size={46}>UP TO</Text>
              <Text y={-20} size={84} color={f >= th ? C.green : C.ink}>{f >= th ? '$1,000' : '$?,???'}</Text>
              <G2 y={80} s={bump(fr, 0.25)}><Text size={74} color={C.red}>FREE</Text></G2>
              <rect x={-120} y={150} width={240} height={70} rx={35} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={186} size={32} color="#fff">SIGN UP</Text>
            </AppPhone>
          </G2>
          <Stamp x={480} y={200} s={P(A('o3'))} text="3 MONTHS EARLIER" color={C.navy} size={44} r={-3} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ls = w('o4', 'lost');
    const sv = w('o4', 'seventeen');
    const bl = w('o4', 'billion');
    q(ls, 'paper', 0.5);
    q(sv, 'tick', 0.5);
    q(bl, 'stamp', 0.8);
    const v = Math.round(lerp(0, 16890, ease(f, A('o4') + 4, bl)));
    const sk = shake(f, bl, 16, 14);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Cam f={f} keys={[[bl, 1, 960, 540], [bl + 10, 1.12, 960, 520]]}>
          <Board />
          <Svg>
            <G2 x={960} y={170} s={P(A('o4'))}><Text size={50}>Americans lost to betting apps in 2025</Text></G2>
            <Box x={960 + sk.x} y={500 + sk.y} w={1300} h={330} s={P(A('o4')) * bump(bl, 0.12)} fill={f >= bl ? C.red : '#fff'}>
              <Text y={-10} size={150} color={f >= bl ? '#fff' : C.ink}>{f >= bl ? '$16.9 BILLION' : `$${(v / 1000).toFixed(2)} B`}</Text>
            </Box>
            <Dave f={f} x={300} y={940} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.6}, {at: bl, pose: 'shock', expr: 'shock', look: 0.6}]} />
            <G2 x={1200} y={800} o={lt(ls, 0.4)}><Text size={38} color={GRAY}>(what sportsbooks kept after paying winners)</Text></G2>
            <SourceTag f={f} at={ls} text="American Gaming Association, State of the States 2026" />
          </Svg>
        </Cam>
      </AbsoluteFill>
    ));
  }
  {
    const hd = w('o5', 'hand');
    const kk = w('o5', 'kick');
    const wn = w('o5', 'winning');
    q(hd, 'pop', 0.5);
    q(kk, 'pop2', 0.5);
    q(wn, 'sting', 0.5);
    const sx = ease(f, A('o5'), A('o5') + 20, 2200, 1600);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={360} y={930} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'think', look: 0.7}]} />
          <Box x={960} y={330} w={700} h={200} s={P(A('o5')) * bump(hd, 0.1)} fill={f >= hd ? C.yellow : '#fff'}>
            <Text y={4} size={60}>$1,000 FREE... why?</Text>
          </Box>
          <Box x={960} y={640} w={700} h={200} s={P(A('o5')) * bump(kk, 0.1)} o={lt(kk, 0.45)} fill={f >= wn ? '#FFE3EA' : '#fff'}>
            <Text y={4} size={56} color={C.red}>banned for WINNING?</Text>
          </Box>
        </Svg>
        <AbsoluteFill style={{filter: 'brightness(0)', opacity: 0.9}}>
          <Svg><Raccoon f={f} x={sx} y={700} s={2.2} mood="sneaky" /></Svg>
        </AbsoluteFill>
        <Svg><G2 x={sx - 10} y={540} s={pop(f, A('o5') + 14)}><Text size={150} color={C.yellow} stroke={C.ink} sw={10}>?</Text></G2></Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ln = w('o6', 'line');
    const fp = w('o6', 'print');
    const cs = w('o6', 'costs');
    q(ln, 'pop', 0.5);
    q(fp, 'paper', 0.5);
    q(cs, 'ding', 0.7);
    const mgx = ease(f, A('o6'), fp, 700, 1000);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('o6'))}><Text size={50}>the fine print</Text></G2>
          <Box x={960} y={540} w={1000} h={620} s={P(A('o6'))}>
            {Array.from({length: 7}).map((_, i) => (
              <rect key={i} x={-420} y={-250 + i * 74} width={i === 4 ? 840 : 760 - (i % 3) * 90} height={i === 4 ? 46 : 26} rx={8} fill={i === 4 ? (f >= ln ? C.yellow : '#E3E8EE') : '#E3E8EE'} stroke={i === 4 && f >= ln ? C.ink : 'none'} strokeWidth={4} />
            ))}
            <Text x={0} y={-250 + 4 * 74 + 24} size={36} color={C.ink}>{f >= cs ? 'REAL COST: $?,???' : ''}</Text>
          </Box>
          <G2 x={mgx} y={560} s={1.3 * P(A('o6'))}><Magnifier /></G2>
          <Dave f={f} x={240} y={940} s={0.95} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: 0.7}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: the thousand dollar catch ============
  {
    const tp = w('c1a', 'taps');
    const dp = w('c1a', 'deposits');
    const fn = w('c1a', 'fun');
    q(tp, 'click', 0.6);
    q(dp, 'cash', 0.6);
    q(fn, 'pop', 0.4);
    const sl = w('c1b', 'slowly');
    const tw = w('c1b', 'twenty');
    const th = w('c1b', 'thousand');
    q(sl, 'paper', 0.5);
    q(tw, 'pop', 0.5);
    q(th, 'ding', 0.5);
    const oh = w('c1c', 'one');
    const fv = w('c1c', 'five', 1);
    const fl = w('c1c', 'full');
    q(oh, 'coin', 0.6);
    q(fl, 'pop2', 0.5);
    q(fv, 'stamp', 0.7);
    scene(A('c1a'), () =>
      f < A('c1b') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={500} y={930} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.7}]} />
            <G2 x={1240} y={540} s={P(A('c1a')) * bump(tp, 0.06)}>
              <AppPhone>
                <Text y={-170} size={34} color={GRAY}>DEPOSIT</Text>
                <Text y={-80} size={96} color={f >= dp ? C.green : C.ink}>{f >= dp ? '$500' : '$___'}</Text>
                <rect x={-120} y={20} width={240} height={80} rx={40} fill={f >= tp ? C.green : '#E3E8EE'} stroke={C.ink} strokeWidth={4} />
                <Text y={62} size={36} color={f >= tp ? '#fff' : GRAY}>CONFIRM</Text>
              </AppPhone>
            </G2>
            <G2 x={500} y={260} o={lt(fn, 0.4)}><Text size={44} color={C.navy}>his whole fun budget</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={600} y={400} w={880} h={420} s={P(A('c1b')) * bump(tw, 0.06)}>
              <Text y={-140} size={34} color={GRAY}>THE OFFER, READ SLOWLY</Text>
              <Text y={-50} size={64} color={f >= tw ? C.red : C.ink}>20% DEPOSIT MATCH</Text>
              <Text y={40} size={52}>up to $1,000</Text>
              <Text y={130} size={34} color={GRAY}>(released in DK-style site credit)</Text>
            </Box>
            <Box x={1450} y={360} w={640} h={240} s={P(A('c1b')) * bump(oh, 0.12)} fill={f >= oh ? C.yellow : '#fff'}>
              <Text y={-50} size={40} color={GRAY}>20% of $500 =</Text>
              <Text y={40} size={90}>{f >= oh ? '$100' : '$?'}</Text>
            </Box>
            <Box x={1050} y={820} w={1400} h={190} s={P(A('c1b')) * bump(fv, 0.1)} fill={f >= fv ? '#FFE3EA' : '#fff'}>
              <Text y={4} size={54} color={f >= fl ? C.red : GRAY}>full $1,000 → deposit {f >= fv ? '$5,000' : '$?,???'}</Text>
            </Box>
            <Dave f={f} x={1700} y={760} s={0.7} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: fv, pose: 'shock', expr: 'shock', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pz = w('c1d', 'pizza');
    const tn = w('c1d', 'tiny');
    const sl = w('c1d', 'slice');
    q(pz, 'pop', 0.5);
    q(tn, 'scribble', 0.5);
    q(sl, 'boing', 0.6);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c1d'))}><Text size={48}>big letters. tiny letters.</Text></G2>
          <PizzaSign x={1100} y={500} s={1.15 * P(A('c1d')) * bump(pz, 0.06)} fine={ease(f, tn, sl + 10)} />
          <Dave f={f} x={320} y={930} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.6}, {at: sl, pose: 'facepalm', expr: 'tired', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gn = w('c1e', 'generous');
    const np = w('c1e', 'nope');
    const cu = w('c1e', 'customer');
    q(gn, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(cu, 'cash', 0.6);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="WHAT DAVE THOUGHT" />
        <Svg>
          <Dave f={f} x={420} y={900} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'happy', look: 0.6}, {at: np, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <Box x={1180} y={440} w={760} h={300} s={P(A('c1e')) * bump(gn, 0.08)} fill={f >= np ? '#fff' : C.yellow}>
            <Text y={-60} size={44} color={GRAY}>{f >= np ? 'the bonus is really...' : 'the app is just...'}</Text>
            <Text y={40} size={f >= cu ? 52 : 80} color={f >= cu ? C.red : C.green}>{f >= cu ? 'the price of a new customer' : 'GENEROUS!'}</Text>
          </Box>
          <Stamp x={1180} y={780} s={pop(f, np) * bump(np, 0.2)} text="NOPE" color={C.red} size={90} r={-6} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hb = w('c1f', 'hundred');
    const bb = w('c1f', 'bob');
    const rl = w('c1f', 'real');
    q(hb, 'coin', 0.6);
    q(bb, 'ding', 0.6);
    q(rl, 'pop', 0.5);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}, {at: bb, pose: 'hold', expr: 'neutral', look: 0.6}]} />
          <G2 x={480} y={330} s={P(A('c1f')) * bump(hb, 0.15)}><Coin s={2} /><Text y={150} size={46} color={C.green}>$100 bonus</Text></G2>
          <G2 x={1260} y={540} s={P(A('c1f')) * bump(bb, 0.08)} r={f >= bb ? Math.sin(f * 1.4) * 3 : 0}>
            <AppPhone title="CALL" color={C.navy}>
              <Text y={-150} size={36} color={GRAY}>incoming call</Text>
              <Text y={-60} size={80}>{f >= bb ? 'BOB' : '...'}</Text>
              <circle cx={-70} cy={120} r={44} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <circle cx={70} cy={120} r={44} fill={C.red} stroke={C.ink} strokeWidth={4} />
            </AppPhone>
          </G2>
          <G2 x={1260} y={950} o={lt(rl, 0.4)}><Text size={38} color={C.red} stroke="#fff" sw={8}>free money isn't real money?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: bonus bets aren't cash ============
  {
    const fv = w('c2a', 'five');
    const tw = w('c2a', 'two');
    q(fv, 'coin', 0.5);
    q(tw, 'cash', 0.6);
    const ff = w('c2b', 'fifty');
    const wn = w('c2b', 'win');
    const hd = w('c2b', 'hundred');
    q(ff, 'click', 0.5);
    q(wn, 'crowd', 0.5);
    q(hd, 'ding', 0.5);
    const gf = w('c2c', 'fifty');
    const st = w('c2c', 'stake');
    const wg = w('c2c', 'winnings');
    q(gf, 'trombone', 0.5);
    q(st, 'rip', 0.6);
    q(wg, 'coin', 0.5);
    scene(A('c2a'), () =>
      f < A('c2b') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Bob f={f} x={500} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.6}]} />
            <G2 x={1240} y={540} s={P(A('c2a'))}>
              <AppPhone title="OTHER APP" color={C.blue}>
                <Text y={-160} size={36} color={GRAY}>BET</Text>
                <Text y={-90} size={80} color={f >= fv ? C.ink : GRAY}>$5</Text>
                <Text y={-10} size={36} color={GRAY}>GET</Text>
                <Text y={70} size={80} color={f >= tw ? C.green : GRAY}>{f >= tw ? '$200' : '$???'}</Text>
                <Text y={140} size={36}>in BONUS BETS</Text>
              </AppPhone>
            </G2>
            <G2 x={500} y={280} s={P(A('c2a'))}><Text size={48}>Bob's offer</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bob f={f} x={330} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: wn, pose: 'celebrate', expr: 'grin', look: 0.6}, {at: gf, pose: 'shrug', expr: 'sad', look: 0.6}]} />
            <Slip x={900} y={330} s={P(A('c2b')) * bump(ff, 0.06)} title="BONUS BET" rows={[['stake (bonus)', '$50'], ['odds', 'EVEN'], ['result', f >= wn ? 'WIN!' : '...', C.green]]} />
            <Box x={1500} y={330} w={440} h={300} s={P(A('c2b')) * bump(hd, 0.1)}>
              <Text y={-90} size={34} color={GRAY}>Bob expects</Text>
              <Text y={10} size={96} color={f >= gf ? GRAY : C.green}>$100</Text>
              {f >= gf && <line x1={-140} y1={10} x2={140} y2={10} stroke={C.red} strokeWidth={12} strokeLinecap="round" />}
            </Box>
            <Box x={1200} y={780} w={900} h={240} s={P(A('c2b')) * bump(gf, 0.14)} fill={f >= gf ? C.yellow : '#fff'} o={lt(gf, 0.45)}>
              <Text y={-50} size={44}>{f >= gf ? 'Bob gets: $50' : 'Bob gets: $?'}</Text>
              <Text y={40} size={38} color={f >= st ? C.red : GRAY}>{f >= st ? 'the app keeps the $50 stake' : '...'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const ex = w('c2d', 'expire');
    const wk = w('c2d', 'week');
    const rs = w('c2d', 'rush');
    q(ex, 'tick', 0.6);
    q(wk, 'stamp', 0.6);
    q(rs, 'whoosh', 0.5);
    const cv = w('c2e', 'carnival');
    const hm = w('c2e', 'home');
    q(cv, 'boing', 0.5);
    q(hm, 'buzz', 0.6);
    scene(A('c2d'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c2d')) * bump(ex)}><Text size={50}>bonus bets have an expiry date</Text></G2>
            <G2 x={620} y={520} s={1.5 * P(A('c2d')) * bump(wk, 0.12)}><Clock f={f * 3} /></G2>
            <Stamp x={620} y={800} s={P(A('c2d')) * bump(wk, 0.2)} text={f >= wk ? '7 DAYS' : '? DAYS'} color={C.red} size={60} r={-4} />
            <Bob f={f} x={1360} y={930} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'worried', look: -0.6}, {at: rs, pose: 'panic', expr: 'shock', look: -0.6}]} sweat={f >= rs} />
            <G2 x={1360} y={330} o={lt(rs, 0.4)}><Text size={40} color={C.red}>bet it on ANY game, fast</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c2e'))}><Text size={50}>a bonus bet is like a carnival token</Text></G2>
            <Token x={620} y={530} s={1.3 * P(A('c2e')) * bump(cv, 0.12)} r={Math.sin(f / 10) * 6} />
            <G2 x={1340} y={520} s={P(A('c2e'))}>
              <Frame w={560} h={460}>
                <Text y={-150} size={40}>EXIT → HOME</Text>
                <rect x={-110} y={-100} width={220} height={260} rx={12} fill="#C98F5E" stroke={C.ink} strokeWidth={6} />
                <circle cx={70} cy={40} r={12} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
              </Frame>
            </G2>
            <G2 x={1340} y={520} s={0.6 * pop(f, hm)}><XMark /></G2>
            <G2 x={960} y={900} o={lt(hm, 0.4)}><Text size={42} color={C.red}>play with it all day... never cash it out</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const ls = w('c2f', 'less');
    const bg = w('c2f', 'bigger');
    const lk = w('c2f', 'locked');
    q(ls, 'pop', 0.5);
    q(bg, 'sting', 0.5);
    q(lk, 'clank', 0.8);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c2f')) * bump(ls)}><Text size={48}>free bets: worth less than they look</Text></G2>
          <Dave f={f} x={420} y={930} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}, {at: lk, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <G2 x={1200} y={540} s={1.1 * P(A('c2f')) * bump(bg, 0.06)}><MoneyStack n={4} label="DAVE'S $100" /></G2>
          <G2 x={1200} y={520} s={2 * pop(f, lk) * bump(lk, 0.2)}><Lock /></G2>
          <Stamp x={1200} y={850} s={pop(f, lk)} text="LOCKED" color={C.red} size={64} r={-3} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: the toll on every bet ============
  {
    const ru = w('c3a', 'rules');
    const tf = w('c3a', 'twenty');
    q(ru, 'paper', 0.5);
    q(tf, 'coin', 0.6);
    const unl = Math.round(ease(f, tf, A('c3b'), 0, 4));
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c3a')) * bump(ru)}><Text size={50}>how the $100 unlocks</Text></G2>
          <Box x={960} y={420} w={1400} h={240} s={P(A('c3a')) * bump(tf, 0.06)}>
            <Text y={-40} size={70}>bet <tspan fill={C.red}>$25</tspan> → unlock <tspan fill={C.green}>$1</tspan></Text>
            <Text y={50} size={34} color={GRAY}>one dollar at a time</Text>
          </Box>
          {Array.from({length: 4}).map((_, i) => (
            <G2 key={i} x={560 + i * 270} y={760} s={P(A('c3a'))} o={i < unl ? 1 : 0.35}><Coin s={1.4} /><Text y={90} size={30} color={GRAY}>$25 bet</Text></G2>
          ))}
          <Dave f={f} x={1700} y={940} s={0.9} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c3b', 'guess');
    const cm = w('c3b', 'comments');
    const cg = w('c3b', 'coming');
    q(gs, 'pop', 0.6);
    for (let k = gs + 10; k < A('c3c') - 10; k += 15) q(k, 'tick', 0.35);
    q(cm, 'scribble', 0.5);
    q(cg, 'ding', 0.5);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={130} s={P(A('c3b')) * bump(gs, 0.15)} text="QUICK GUESS" color={C.navy} size={64} r={-2} />
          <Box x={760} y={540} w={1000} h={440} s={P(A('c3b'))} fill={C.yellow}>
            <Text y={-130} size={44}>to unlock the FULL $1,000</Text>
            <Text y={-60} size={44}>you must bet...</Text>
            <Text y={80} size={170} color={C.red}>$ ?</Text>
          </Box>
          <G2 x={1550} y={470} s={1.4 * P(A('c3b'))}><Clock f={f} /></G2>
          <G2 x={1550} y={760} o={lt(cm, 0.4)}><Text size={40} color={C.navy}>write it in the comments</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mn = w('c3c', 'minus');
    q(mn, 'ding', 0.6);
    const rk = w('c3d', 'risks');
    const wn = w('c3d', 'win');
    const bt = w('c3d', 'both');
    q(rk, 'cash', 0.5);
    q(wn, 'coin', 0.5);
    q(bt, 'pop', 0.5);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c3c'))}><Text size={48}>the little number next to every team</Text></G2>
          <BetPhone x={560} y={580} s={1.05 * P(A('c3c')) * bump(mn, 0.06)} rows={[['LIONS', '-110'], ['SHARKS', '-110']]} hl={f >= bt ? 1 : f >= mn ? 0 : -1} />
          <Slip x={1330} y={380} s={P(A('c3c')) * bump(rk, 0.08)} o={lt(rk, 0.45)} title="-110 MEANS" rows={[['you risk', '$110', C.red], ['to win', '$100', C.green], ['both teams', f >= bt ? 'SAME' : '?']]} />
          <Dave f={f} x={1560} y={960} s={0.75} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hf = w('c3e', 'half');
    const ls = w('c3e', 'loses');
    const ft = w('c3e', 'fifty');
    q(hf, 'pop', 0.5);
    q(ls, 'buzz', 0.5);
    q(ft, 'stamp', 0.6);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c3e')) * bump(hf)}><Text size={48}>win rate Dave needs just to break even</Text></G2>
          <Bar x={700} y={820} s={P(A('c3e')) * bump(hf, 0.1)} w={300} h={400} color={f >= ls ? C.red : C.gray} label="WINS HALF" value="50%" />
          <Bar x={1220} y={820} s={P(A('c3e')) * bump(ft, 0.1)} w={300} h={f >= ft ? 440 : 400} color={f >= ft ? C.green : C.gray} label="BREAK EVEN" value={f >= ft ? '52.4%' : '?%'} />
          <G2 x={700} y={300} o={lt(ls, 0.4)}><Text size={40} color={C.red}>still LOSES money</Text></G2>
          <Dave f={f} x={1650} y={930} s={0.95} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rc = w('c3f', 'raccoon');
    const bk = w('c3f', 'back');
    const fr = w('c3f', 'four');
    q(rc, 'pop', 0.5);
    q(bk, 'boing', 0.5);
    q(fr, 'coin', 0.7);
    const cx = ((f - A('c3f')) * 6) % 900;
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c3f')) * bump(rc)}><Text size={46}>remember the toll booth raccoon? (ep. 2)</Text></G2>
          <TollBooth x={900} y={780} s={1.3 * P(A('c3f'))} barUp={0.5 + 0.5 * Math.sin(f / 8)} label="EVERY BET" />
          <Raccoon f={f} x={900} y={520} s={1.1 * P(A('c3f')) * bump(bk, 0.12)} mood="greedy" holdCoin={f >= fr} />
          <G2 x={300 + cx} y={720} s={P(A('c3f'))}><Coin s={1.2} /></G2>
          <Box x={1520} y={420} w={560} h={260} s={P(A('c3f')) * bump(fr, 0.12)} fill={f >= fr ? C.yellow : '#fff'}>
            <Text y={-60} size={34} color={GRAY}>toll per $1 bet</Text>
            <Text y={30} size={96} color={C.red}>{f >= fr ? '4.5¢' : '?¢'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('c3g', 'crossing');
    const un = w('c3g', 'unlocked');
    const bl = w('c3g', 'balance');
    q(cr, 'step', 0.5);
    q(un, 'chime', 0.6);
    q(bl, 'sting', 0.6);
    const px = ((f - A('c3g')) * 9) % 1400;
    scene(A('c3g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <path d="M 120 760 Q 960 560 1800 760" fill="none" stroke={C.woodDark} strokeWidth={28} />
          <path d="M 120 760 Q 960 560 1800 760" fill="none" stroke={C.wood} strokeWidth={16} />
          <TollBooth x={960} y={700} s={0.8 * P(A('c3g'))} barUp={(f % 30) < 15 ? 1 : 0} label="4.5¢ TOLL" />
          <Dave f={f} x={250 + px} y={700 - Math.sin(((250 + px) / 1920) * Math.PI) * 140} s={0.75} walk keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.6}]} />
          <G2 x={960} y={160} s={P(A('c3g')) * bump(cr)}><Text size={46}>$25 at a time... for a whole month</Text></G2>
          <Box x={960} y={330} w={620} h={130} s={P(A('c3g')) * bump(un, 0.12)} fill={f >= un ? C.greenLight : '#fff'}>
            <Text y={4} size={48}>{f >= un ? 'BONUS UNLOCKED: $100' : 'unlocked: $??'}</Text>
          </Box>
          <G2 x={960} y={900} o={lt(bl, 0.35)}><Text size={44} color={C.red}>...and then he checks his balance</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: paying more for free ============
  {
    const dn = w('c4a', 'down');
    const fo = w('c4a', 'forty');
    const ul = w('c4a', 'unlock');
    q(dn, 'thud', 0.6);
    q(fo, 'cash', 0.8);
    q(ul, 'trombone', 0.5);
    const sk = shake(f, fo, 12, 12);
    const tw = w('c4b', 'two');
    const ft = w('c4b', 'fourteen');
    const un = w('c4b', 'unlucky');
    q(tw, 'paper', 0.5);
    q(ft, 'stamp', 0.6);
    q(un, 'boing', 0.5);
    scene(A('c4a'), () =>
      f < A('c4b') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.6}, {at: dn, pose: 'shock', expr: 'shock', look: 0.6}]} sweat={f >= fo} />
            <G2 x={1240 + sk.x} y={540 + sk.y} s={P(A('c4a')) * bump(fo, 0.08)}>
              <AppPhone>
                <Text y={-170} size={30} color={GRAY}>YOUR RESULT</Text>
                <Text y={-80} size={90} color={C.red}>{f >= fo ? '-$140' : '-$???'}</Text>
                <Text y={20} size={30} color={GRAY}>to unlock</Text>
                <Text y={90} size={70} color={C.green}>+$100</Text>
                <Text y={160} size={28} color={GRAY}>"free" bonus</Text>
              </AppPhone>
            </G2>
            <G2 x={480} y={280} o={lt(ul, 0.4)}><Text size={44} color={C.red}>paid $140 for $100?!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4b'))}><Text size={48}>the math behind Dave's $140</Text></G2>
            <Box x={960} y={360} w={1300} h={200} s={P(A('c4b')) * bump(tw, 0.06)}>
              <Text y={4} size={64}>$2,500 of bets <tspan fill={GRAY}>to unlock $100</tspan></Text>
            </Box>
            <Box x={960} y={620} w={1300} h={200} s={P(A('c4b')) * bump(ft, 0.1)} fill={f >= ft ? C.yellow : '#fff'}>
              <Text y={4} size={64}>× 4.5¢ toll = ~<tspan fill={C.red}>{f >= ft ? '$114' : '$???'}</tspan></Text>
            </Box>
            <G2 x={960} y={850} o={lt(un, 0.4)}><Text size={42} color={GRAY}>+ a little bad luck = $140</Text></G2>
            <Raccoon f={f} x={1700} y={880} s={0.8} mood="greedy" holdCoin />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const gs = w('c4c', 'guess');
    const tf = w('c4c', 'twenty');
    const nn = w('c4c', 'ninety');
    q(gs, 'pop', 0.6);
    q(tf, 'stamp', 0.9);
    q(nn, 'tick', 0.6);
    const sk = shake(f, tf, 16, 14);
    const v = Math.round(lerp(0, 25000, ease(f, gs, tf)));
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={130} s={P(A('c4c'))} text="YOUR GUESS..." color={C.navy} size={60} r={-2} />
          <Box x={960 + sk.x} y={500 + sk.y} w={1200} h={380} s={P(A('c4c')) * bump(tf, 0.12)} fill={f >= tf ? C.red : C.yellow}>
            <Text y={-110} size={44} color={f >= tf ? '#fff' : C.ink}>bets needed to unlock $1,000</Text>
            <Text y={40} size={170} color={f >= tf ? '#fff' : C.ink}>${v.toLocaleString('en-US')}</Text>
          </Box>
          <G2 x={960} y={830} s={pop(f, nn)}><Calendar90 /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('c4d', 'cars');
    const bn = w('c4d', 'bonus');
    q(cr, 'pop', 0.6);
    q(bn, 'buzz', 0.5);
    const rm = w('c4e', 'remember');
    const en = w('c4e', 'end');
    q(rm, 'marker', 0.6);
    q(en, 'ding', 0.5);
    scene(A('c4d'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={150} s={P(A('c4d'))}><Text size={52} stroke="#fff" sw={10}>$25,000 of betting = a whole car</Text></G2>
            <Car x={880} y={700} s={3 * P(A('c4d')) * bump(cr, 0.06)} />
            <G2 x={880} y={420} s={P(A('c4d')) * bump(cr, 0.12)}><Text size={60} color={C.red} stroke="#fff" sw={10}>$25,000</Text></G2>
            <Dave f={f} x={1600} y={930} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.7}]} />
            <G2 x={1600} y={420} o={lt(bn, 0.4)}><Text size={40} color={C.ink} stroke="#fff" sw={8}>...for a bonus?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={500} r={-3} s={P(A('c4e')) * bump(rm, 0.1)}>
              <rect x={-420} y={-230} width={840} height={460} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <circle cx={0} cy={-200} r={22} fill={C.red} stroke={C.ink} strokeWidth={5} />
              <Text y={-90} size={56}>REMEMBER THIS:</Text>
              <Text y={40} size={140} color={C.red}>$25,000</Text>
              <Text y={150} size={40} color={GRAY}>{f >= en ? 'it comes back at the end' : ''}</Text>
            </G2>
            <Dave f={f} x={1650} y={930} s={0.9} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const sg = w('c4f', 'strange');
    const wn = w('c4f', 'winning');
    q(sg, 'dream', 0.5);
    q(wn, 'chime', 0.7);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={700} y={930} s={1.3} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}, {at: wn, pose: 'celebrate', expr: 'grin', look: 0.6}]} />
          <G2 x={1300} y={500} s={P(A('c4f')) * bump(wn, 0.2)}>
            <path d="M -200 160 L -60 40 L 40 100 L 200 -140" fill="none" stroke={f >= wn ? C.green : C.gray} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 130 -150 L 210 -150 L 210 -70" fill="none" stroke={f >= wn ? C.green : C.gray} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
          </G2>
          <G2 x={1300} y={820} o={lt(wn, 0.4)}><Text size={50} color={C.green}>Dave starts WINNING</Text></G2>
          <G2 x={700} y={300} o={lt(sg, 0.4)}><Text size={44} color={GRAY}>but then...</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: why winners get cut ============
  {
    const pl = w('c5a', 'parlay');
    const bb = w('c5a', 'basketball');
    const an = w('c5a', 'another');
    const sx = w('c5a', 'six');
    q(pl, 'stamp', 0.6);
    q(bb, 'stamp', 0.6);
    q(an, 'stamp', 0.6);
    q(sx, 'cash', 0.8);
    const v = Math.round(lerp(-140, 640, ease(f, w('c5a', 'two'), sx + 10)));
    const gn = w('c5b', 'genius');
    const bzz = w('c5b', 'buzzes');
    const mx2 = w('c5b', 'max');
    const st = w('c5b', 'start');
    q(gn, 'chime', 0.5);
    q(bzz, 'buzz', 0.7);
    q(mx2, 'stamp', 0.8);
    q(st, 'sting', 0.5);
    scene(A('c5a'), () =>
      f < A('c5b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {['FOOTBALL PARLAY', 'BASKETBALL', 'ANOTHER ONE'].map((l, i) => {
              const at = [pl, bb, an][i];
              return (
                <G2 key={l} x={380 + i * 460} y={360} s={P(A('c5a'))} r={-4 + i * 4}>
                  <Ticket text={l} s={1.3} />
                  <Stamp y={0} s={pop(f, at) * bump(at, 0.2)} text="WIN" color={C.green} size={56} r={-8} />
                </G2>
              );
            })}
            <Box x={960} y={720} w={760} h={220} s={P(A('c5a')) * bump(sx, 0.12)} fill={v >= 0 ? C.greenLight : '#FFE3EA'}>
              <Text y={-50} size={34} color={GRAY}>in two weeks, Dave is</Text>
              <Text y={30} size={96} color={v >= 0 ? C.green : C.red}>{v >= 0 ? `UP $${v}` : `DOWN $${-v}`}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={520} y={930} s={1.25} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.7}, {at: bzz, pose: 'shock', expr: 'shock', look: 0.7}]} />
            <G2 x={1240} y={560} s={P(A('c5b'))}>
              <AppPhone>
                <Text y={-170} size={30} color={GRAY}>YOUR BALANCE</Text>
                <Text y={-90} size={84} color={C.green}>+$640</Text>
                <rect x={-130} y={40} width={260} height={90} rx={20} fill={f >= mx2 ? '#E3E8EE' : C.green} stroke={C.ink} strokeWidth={4} />
                <Text y={86} size={40} color={f >= mx2 ? GRAY : '#fff'}>{f >= mx2 ? 'MAX $2' : 'BET $500'}</Text>
              </AppPhone>
            </G2>
            <G2 x={1240} y={260} s={pop(f, bzz) * bump(mx2, 0.12)}><Banner title="BET APP · now" body="MAX BET: $2.00" w={600} /></G2>
            <G2 x={520} y={300} s={P(A('c5b'))}><Text size={52} color={f >= bzz ? C.red : C.green}>{f >= bzz ? 'the message from the start' : 'GENIUS!'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const lm = w('c5c', 'limiting');
    const al = w('c5c', 'allowed');
    const cp = w('c5c', 'cap');
    q(lm, 'stamp', 0.7);
    q(al, 'paper', 0.5);
    q(cp, 'clank', 0.6);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c5c'))}><Text size={50}>it has a name</Text></G2>
          <Stamp x={960} y={380} s={1.4 * P(A('c5c')) * bump(lm, 0.2)} text={f >= lm ? 'LIMITING' : '???'} color={C.red} size={100} r={-4} />
          <Box x={960} y={700} w={1100} h={200} s={P(A('c5c')) * bump(al, 0.08)} o={lt(al, 0.45)}>
            <Text y={-30} size={46}>allowed in most states</Text>
            <Text y={40} size={38} color={f >= cp ? C.red : GRAY}>cap almost anyone, for almost any reason</Text>
          </Box>
          <Dave f={f} x={260} y={940} s={0.95} keys={[{at: 0, pose: 'shrug', expr: 'angry', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ma = w('c5d', 'massachusetts');
    const zr = w('c5d', 'zero');
    const lk = w('c5d', 'link');
    const wn = w('c5d', 'winning');
    q(ma, 'paper', 0.5);
    q(zr, 'ding', 0.5);
    q(lk, 'pop', 0.5);
    q(wn, 'stamp', 0.7);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={600} y={520} s={0.95 * P(A('c5d')) * bump(ma, 0.05)} org="MASSACHUSETTS GAMING COMMISSION" sub="SPORTSBOOK DATA, DEC 2024" title={['accounts with limits:']} stat={f >= zr ? '0.64%' : '?%'} statLabel="a small share..." color={C.navy} />
          <Box x={1450} y={520} w={700} h={420} s={P(A('c5d')) * bump(lk, 0.06)} o={lt(lk, 0.45)} fill={f >= wn ? C.yellow : '#fff'}>
            <Text y={-140} size={38} color={GRAY}>but a direct link:</Text>
            <People x={0} y={110} s={0.8} n={30} hot={f >= wn ? 3 : 0} />
            <Text y={150} size={40} color={C.red}>{f >= wn ? 'limited = winning more' : ''}</Text>
          </Box>
          <SourceTag f={f} at={ma} text="Massachusetts Gaming Commission bettor-limits data" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wl = w('c5e', 'wallstreet');
    const hf = w('c5e', 'half');
    const sv = w('c5e', 'seventy');
    const rv = w('c5e', 'revenue');
    q(wl, 'paper', 0.5);
    q(hf, 'pop', 0.6);
    q(sv, 'stamp', 0.8);
    q(rv, 'cash', 0.6);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c5e')) * bump(wl)}><Text size={48}>who really pays the app's bills?</Text></G2>
          <G2 x={560} y={560} s={1.05 * P(A('c5e')) * bump(hf, 0.06)}>
            <rect x={-330} y={-360} width={660} height={720} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-310} size={34} color={GRAY}>200 customers</Text>
            {Array.from({length: 200}).map((_, i) => (
              <circle key={i} cx={-285 + (i % 20) * 30} cy={-250 + Math.floor(i / 20) * 54} r={11} fill={i === 0 && f >= hf ? C.red : '#C9C0AE'} stroke={i === 0 && f >= hf ? C.ink : 'none'} strokeWidth={3} />
            ))}
            <Text y={320} size={34} color={C.red}>{f >= hf ? '0.5% = 1 in 200' : ''}</Text>
          </G2>
          <SlicePie x={1380} y={520} s={P(A('c5e')) * bump(sv, 0.06)} t={1} rad={240} slices={[{v: 0.7, c: f >= sv ? C.red : C.gray, l: f >= sv ? '70%+' : ''}, {v: 0.3, c: '#D9D2C3', l: ''}]} />
          <G2 x={1380} y={830} o={lt(sv, 0.4)}><Text size={38} color={C.red}>of revenue, from that 0.5%</Text></G2>
          <SourceTag f={f} at={wl} text="Wall Street Journal review (2024), via AIBM 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bf = w('c5f', 'buffet');
    const sl = w('c5f', 'salad');
    const sh = w('c5f', 'shrimp');
    const bn = w('c5f', 'banned');
    const lo = w('c5f', 'lose');
    q(bf, 'ding', 0.5);
    q(sl, 'pop', 0.5);
    q(sh, 'pop2', 0.5);
    q(bn, 'stamp', 0.8);
    q(lo, 'cash', 0.6);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={120} s={P(A('c5f')) * bump(bf)}><Text size={52}>ALL YOU CAN EAT</Text></G2>
          <Bob f={f} x={420} y={930} s={1.1} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}]} />
          <Salad x={420} y={520} s={1.3 * P(A('c5f')) * bump(sl, 0.15)} />
          <G2 x={420} y={330} o={lt(sl, 0.4)}><Text size={40} color={C.green}>WELCOME!</Text></G2>
          <Dave f={f} x={1420} y={930} s={1.1} keys={[{at: 0, pose: 'carry', expr: 'grin', look: -0.6}, {at: bn, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <PlateStack x={1420} y={560} s={1.1 * P(A('c5f')) * bump(sh, 0.1)} n={10} />
          <Stamp x={1420} y={330} s={pop(f, bn) * bump(bn, 0.2)} text="BANNED" color={C.red} size={80} r={-6} />
          <G2 x={960} y={760} o={lt(lo, 0.35)}><Text size={40} color={C.red}>{f >= lo ? 'the app wants customers who LOSE' : ''}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gf = w('c5g', 'gift');
    const bt = w('c5g', 'bait');
    const am = w('c5g', 'aimed');
    q(gf, 'pop', 0.5);
    q(bt, 'sting', 0.7);
    q(am, 'whoosh', 0.5);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c5g'))}><Text size={50}>{f >= bt ? 'not a gift. BAIT.' : 'the bonus was never a gift...'}</Text></G2>
          <BaitHook f={f} x={1000} y={560} s={1.2 * P(A('c5g')) * bump(bt, 0.1)} />
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}, {at: bt, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <G2 x={1550} y={800} o={lt(am, 0.4)}><Text size={40} color={C.red}>aimed at... who?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: Bob gets presents ============
  {
    const tx = w('c6a', 'text');
    const vp = w('c6a', 'vip');
    const tk = w('c6a', 'tickets');
    q(tx, 'mail', 0.6);
    q(vp, 'chime', 0.6);
    q(tk, 'pop', 0.5);
    const th = w('c6b', 'three');
    q(th, 'thud', 0.7);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Bob f={f} x={420} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}, {at: th, pose: 'hold', expr: 'worried', look: 0.6}]} />
          <Host f={f} x={1680} y={930} s={1.1} keys={[{at: 0, pose: 'wave', expr: 'smug', look: -0.6}]} />
          <G2 x={1040} y={500} s={P(A('c6a')) * bump(tx, 0.06)}>
            <AppPhone title="MESSAGES" color={C.navy}>
              <rect x={-140} y={-210} width={280} height={150} rx={20} fill="#E3E8EE" />
              <Text y={-165} size={26} color={GRAY}>{f >= vp ? 'your VIP host' : 'new message'}</Text>
              <Text y={-110} size={30}>hey Bob! a gift :)</Text>
              <G2 y={20} s={pop(f, tk)}><Ticket text="FREE TICKETS" s={0.8} /></G2>
              <rect x={-120} y={110} width={240} height={70} rx={20} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={146} size={28} color="#fff">+ BONUS BETS</Text>
            </AppPhone>
          </G2>
          <Box x={420} y={300} w={460} h={160} s={P(A('c6a')) * bump(th, 0.14)} o={lt(th, 0.45)} fill={f >= th ? '#FFE3EA' : '#fff'}>
            <Text y={-30} size={30} color={GRAY}>Bob this year</Text>
            <Text y={30} size={62} color={C.red}>{f >= th ? '-$3,000' : '-$?,???'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sp = w('c6c', 'september');
    const md = w('c6c', 'model');
    const lo = w('c6c', 'lose');
    q(sp, 'paper', 0.6);
    q(md, 'key', 0.5);
    q(lo, 'sting', 0.6);
    const fo = w('c6d', 'four');
    const dn = w('c6d', 'denies');
    const rv = w('c6d', 'review');
    q(fo, 'cash', 0.7);
    q(dn, 'pop', 0.5);
    q(rv, 'stamp', 0.6);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <rect x={-20} y={40} width={1960} height={110} fill={C.red} />
          <Text x={960} y={97} size={56} color="#fff" ls={4}>REPORTED · NEW YORK TIMES · SEPT 2026</Text>
          <Box x={560} y={520} w={760} h={520} s={P(A('c6c')) * bump(md, 0.05)}>
            <Text y={-200} size={36} color={GRAY}>reported model scores each customer:</Text>
            <Text y={-130} size={52}>"LIKELY TO LOSE"</Text>
            {['Customer A', 'Customer B', 'Bob'].map((n, i) => {
              const val = [0.25, 0.5, 0.92][i];
              return (
                <g key={n} transform={`translate(0,${-30 + i * 90})`}>
                  <text x={-330} y={0} fontFamily="Fredoka" fontSize={34} fontWeight={600} fill={C.ink} dominantBaseline="middle">{n}</text>
                  <rect x={-90} y={-20} width={400} height={40} rx={20} fill="#E3E8EE" stroke={C.ink} strokeWidth={4} />
                  <rect x={-90} y={-20} width={400 * val * ease(f, md, md + 20)} height={40} rx={20} fill={i === 2 && f >= lo ? C.red : C.gray} />
                </g>
              );
            })}
            <Text y={220} size={34} color={C.red}>{f >= lo ? 'top scores get the most perks' : ''}</Text>
          </Box>
          <Box x={1420} y={420} w={720} h={300} s={P(A('c6c')) * bump(fo, 0.1)} o={lt(fo, 0.45)} fill={f >= fo ? C.yellow : '#fff'}>
            <Text y={-80} size={34} color={GRAY}>bonuses + perks to top scores, 2025</Text>
            <Text y={30} size={90} color={C.red}>{f >= fo ? '~$400M' : '$???M'}</Text>
          </Box>
          <Box x={1420} y={760} w={720} h={240} s={P(A('c6c'))} o={lt(dn, 0.4)}>
            <Text y={-50} size={36} color={C.navy}>DraftKings: strongly denies</Text>
            <Text y={0} size={30} color={GRAY}>targeting anyone based on losses</Text>
            <Text y={60} size={36} color={f >= rv ? C.red : GRAY}>{f >= rv ? 'Massachusetts: review opened' : ''}</Text>
          </Box>
          <SourceTag f={f} at={sp} text="The New York Times (Sept 2026); company denial; MGC" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('c6e', 'winner');
    const lr = w('c6e', 'loser');
    const op = w('c6e', 'opposite');
    q(wr, 'thud', 0.5);
    q(lr, 'chime', 0.5);
    q(op, 'stamp', 0.6);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <rect x={0} y={0} width={960} height={1080} fill="#FFE3EA" opacity={0.6} />
          <rect x={960} y={0} width={960} height={1080} fill="#E3F6EA" opacity={0.6} />
          <line x1={960} y1={0} x2={960} y2={1080} stroke={C.ink} strokeWidth={8} />
          <G2 x={480} y={150} s={P(A('c6e'))}><Text size={54}>DAVE: WINS</Text></G2>
          <G2 x={1440} y={150} s={P(A('c6e'))}><Text size={54}>BOB: LOSES</Text></G2>
          <Dave f={f} x={480} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.4}]} />
          <Box x={480} y={460} w={560} h={220} s={P(A('c6e')) * bump(wr, 0.12)} fill={C.red}>
            <Text y={4} size={80} color="#fff">$2 LIMIT</Text>
          </Box>
          <Bob f={f} x={1340} y={900} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.4}]} />
          <Host f={f} x={1640} y={900} s={1} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.5}]} />
          <Box x={1440} y={460} w={560} h={220} s={P(A('c6e')) * bump(lr, 0.12)} fill={C.green}>
            <Text y={4} size={56} color="#fff">PERSONAL HOST</Text>
          </Box>
          <Stamp x={960} y={700} s={pop(f, op) * bump(op, 0.2)} text="SAME APP" color={C.navy} size={60} r={-4} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tr = w('c6f', 'trap');
    const cu = w('c6f', 'cut');
    const hg = w('c6f', 'hugged');
    const ah = w('c6f', 'ahead');
    q(tr, 'pop', 0.5);
    q(cu, 'pop', 0.5);
    q(hg, 'pop', 0.5);
    q(ah, 'cricket', 0.6);
    const items = [['THE BONUS', 'a trap', tr], ['WINNING', 'gets you cut', cu], ['LOSING', 'gets you hugged', hg]] as const;
    const mv = w('c6g', 'move');
    const nv = w('c6g', 'never');
    q(mv, 'sting', 0.6);
    q(nv, 'ding', 0.5);
    scene(A('c6f'), () =>
      f < A('c6g') ? (
        <AbsoluteFill>
          <Interior />
          <AbsoluteFill style={{background: 'rgba(29,53,87,0.25)'}} />
          <Svg>
            <Dave f={f} x={420} y={940} s={1.25} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.4}]} />
            {items.map(([a, b, at], i) => (
              <Box key={a} x={1250} y={250 + i * 220} w={900} h={170} s={P(A('c6f'))} o={lt(at, 0.4)} fill={f >= at ? '#fff' : '#F1EADC'}>
                <Text x={-400} y={4} size={46} anchor="start" color={GRAY}>{a}</Text>
                <Text x={400} y={4} size={50} anchor="end" color={C.red}>{b}</Text>
              </Box>
            ))}
            <G2 x={420} y={300} s={bump(ah, 0.2)} o={lt(ah, 0.4)}><Text size={150} color={C.yellow} stroke={C.ink} sw={10}>?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c6g'))}><Text size={52}>one move the app hopes winners never make</Text></G2>
            <G2 x={960} y={540} s={1.3 * P(A('c6g')) * bump(mv, 0.1)}>
              <rect x={-360} y={-110} width={720} height={220} rx={110} fill="#2E3440" stroke={C.ink} strokeWidth={8} />
              <Text y={8} size={100} color={C.yellow}>? ? ? ? ?</Text>
            </G2>
            <Dave f={f} x={300} y={940} s={0.95} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
            <Raccoon f={f} x={1650} y={860} s={0.9} mood="sneaky" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: Dave fights back ============
  {
    const ed = w('c7a', 'education');
    const wd = w('c7a', 'withdraw');
    const fv = w('c7a', 'five');
    const sx = w('c7a', 'six');
    q(ed, 'pop', 0.5);
    q(wd, 'click', 0.8);
    q(fv, 'cash', 0.6);
    q(sx, 'chime', 0.7);
    const fly = ((f - wd) % 40) / 40;
    const ap = w('c7b', 'app');
    const bk = w('c7b', 'bank');
    q(ap, 'pop', 0.4);
    q(bk, 'ding', 0.5);
    scene(A('c7a'), () =>
      f < A('c7b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7a'))}><Text size={46} color="#8C7A5B">(education, not advice)</Text></G2>
            <Dave f={f} x={300} y={940} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'think', look: 0.6}, {at: wd, pose: 'point_r', expr: 'grin', look: 0.6}]} />
            <G2 x={760} y={560} s={0.95 * P(A('c7a')) * bump(wd, 0.06)}>
              <AppPhone>
                <Text y={-170} size={30} color={GRAY}>CASH BALANCE</Text>
                <Text y={-90} size={80} color={C.green}>$1,140</Text>
                <rect x={-130} y={20} width={260} height={100} rx={24} fill={f >= wd ? C.navy : C.green} stroke={C.ink} strokeWidth={4} />
                <Text y={70} size={40} color="#fff">{f >= wd ? 'SENT ✓' : 'WITHDRAW'}</Text>
              </AppPhone>
            </G2>
            {f >= wd && [0, 1, 2].map((i) => {
              const k = (fly + i / 3) % 1;
              return <G2 key={i} x={lerp(860, 1440, k)} y={460 - Math.sin(k * Math.PI) * 180} s={0.9}><MoneyStack n={1} /></G2>;
            })}
            <Bank x={1500} y={640} s={1.1 * P(A('c7a')) * bump(sx, 0.08)} label="DAVE'S BANK" />
            <G2 x={1500} y={280} o={lt(fv, 0.4)}><Text size={40}>$500 {f >= sx ? <tspan fill={C.green}>+ $640 won</tspan> : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <rect x={60} y={200} width={860} height={700} rx={30} fill="#FFE3EA" stroke={C.ink} strokeWidth={6} />
            <rect x={1000} y={200} width={860} height={700} rx={30} fill="#E3F6EA" stroke={C.ink} strokeWidth={6} />
            <G2 x={490} y={270} s={P(A('c7b'))}><Text size={46}>winnings IN the app</Text></G2>
            <G2 x={1430} y={270} s={P(A('c7b'))}><Text size={46}>winnings in the BANK</Text></G2>
            <AppPhone x={490} y={600} s={0.75 * P(A('c7b')) * bump(ap, 0.08)}>
              <Text y={-120} size={40} color={GRAY}>$640</Text>
              <rect x={-120} y={0} width={240} height={90} rx={24} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={45} size={40} color="#fff">BET AGAIN?</Text>
            </AppPhone>
            <Bank x={1430} y={700} s={P(A('c7b')) * bump(bk, 0.1)} label="JUST MONEY" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const s2 = w('c7c', 'two');
    const pt = w('c7c', 'playthrough');
    const tm = w('c7c', 'times');
    q(s2, 'pop', 0.5);
    q(pt, 'marker', 0.6);
    q(tm, 'ding', 0.5);
    const s3 = w('c7d', 'three');
    const lm = w('c7d', 'limit');
    const cn = w('c7d', 'concert');
    q(s3, 'pop', 0.5);
    q(lm, 'click', 0.7);
    q(cn, 'ding', 0.5);
    scene(A('c7c'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Row x={120} y={130} s={P(A('c7c'))} n={2} text="Read ONE line before any free offer" lit={1} color={C.green} w={1300} />
            <Box x={800} y={580} w={1100} h={480} s={P(A('c7c'))}>
              <Text y={-170} size={40} color={GRAY}>OFFER TERMS</Text>
              {[0, 1, 3].map((i) => <rect key={i} x={-460} y={-110 + i * 80} width={760 - i * 60} height={26} rx={8} fill="#E3E8EE" />)}
              <rect x={-470} y={10} width={940} height={70} rx={14} fill={f >= pt ? C.yellow : '#E3E8EE'} stroke={f >= pt ? C.ink : 'none'} strokeWidth={4} />
              <Text y={48} size={44}>{f >= pt ? 'PLAYTHROUGH: 25x' : ''}</Text>
            </Box>
            <G2 x={1050} y={620} s={1.4 * P(A('c7c')) * bump(pt, 0.1)}><Magnifier /></G2>
            <Dave f={f} x={1650} y={940} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
            <G2 x={1650} y={420} o={lt(tm, 0.4)}><Text size={38}>"how many times?"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Row x={120} y={130} s={P(A('c7d'))} n={3} text="Set a deposit limit" lit={1} color={C.green} w={1000} />
            <Toggle x={640} y={520} s={1.6 * P(A('c7d')) * bump(lm, 0.08)} on={ease(f, lm, lm + 10)} label="DEPOSIT LIMIT" />
            <Box x={640} y={830} w={560} h={130} s={P(A('c7d'))} o={lt(lm, 0.4)}>
              <Text y={4} size={48}>$50 / month</Text>
            </Box>
            <Ticket x={1300} y={520} s={1.6 * P(A('c7d')) * bump(cn, 0.12)} text="CONCERT" />
            <G2 x={1300} y={720} o={lt(cn, 0.4)}><Text size={38} color={GRAY}>a fun price, not a scary one</Text></G2>
            <Dave f={f} x={1700} y={940} s={0.95} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const lm = w('c7e', 'limited');
    const jn = w('c7e', 'june');
    const fe = w('c7e', 'forty');
    q(lm, 'pop', 0.5);
    q(jn, 'paper', 0.5);
    q(fe, 'stamp', 0.6);
    const hp = w('c7f', 'help');
    const gb = w('c7f', 'gambler');
    const ex = w('c7f', 'exclusion');
    q(hp, 'chime', 0.5);
    q(gb, 'ding', 0.6);
    q(ex, 'pop', 0.5);
    scene(A('c7e'), () =>
      f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7e')) * bump(lm)}><Text size={48}>limited? you can ask why</Text></G2>
            <SourceCard x={640} y={560} s={0.95 * P(A('c7e')) * bump(jn, 0.05)} org="MASSACHUSETTS RULE" sub="IN FORCE SINCE JUNE 1, 2026" title={['app must tell you you\'re limited', 'and give a real reason, within']} stat={f >= fe ? '48 HOURS' : '?? HOURS'} statLabel="no copy-paste excuses" color={C.navy} />
            <Dave f={f} x={1450} y={940} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.6}]} />
            <G2 x={1450} y={430} s={P(A('c7e'))}><Banner title="BET APP" body="Why: winning > avg" color={C.navy} w={560} /></G2>
            <SourceTag f={f} at={jn} text="Massachusetts Gaming Commission rule (approved Dec 2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7f')) * bump(hp)}><Text size={50}>if it stops being fun: free help</Text></G2>
            <Box x={700} y={480} w={1000} h={340} s={P(A('c7f')) * bump(gb, 0.08)} fill={f >= gb ? C.yellow : '#fff'}>
              <Text y={-100} size={38} color={GRAY}>National Problem Gambling Helpline</Text>
              <Text y={10} size={96}>1-800-GAMBLER</Text>
              <Text y={100} size={34} color={GRAY}>free · confidential · 24/7</Text>
            </Box>
            <Box x={700} y={830} w={1000} h={170} s={P(A('c7f')) * bump(ex, 0.08)} o={lt(ex, 0.45)}>
              <Text y={4} size={44}>state self-exclusion list = block the apps</Text>
            </Box>
            <Dave f={f} x={1550} y={940} s={1.1} keys={[{at: 0, pose: 'point_l', expr: 'neutral', look: -0.6}]} />
            <SourceTag f={f} at={gb} text="National Council on Problem Gambling" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const fs = w('c7g', 'final');
    const sx = w('c7g', 'six');
    const cs = w('c7g', 'cost');
    q(fs, 'pop', 0.5);
    q(sx, 'chime', 0.7);
    q(cs, 'sting', 0.5);
    scene(A('c7g'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.6}, {at: cs, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={1250} y={560} s={P(A('c7g')) * bump(sx, 0.08)}>
            <Frame w={640} h={420}>
              <Text y={-140} size={40} color={GRAY}>DAVE'S FINAL SCORE</Text>
              <Text y={-20} size={110} color={C.green}>+$640</Text>
              <Text y={100} size={40}>safe in the bank</Text>
            </Frame>
          </G2>
          <G2 x={480} y={280} o={lt(cs, 0.4)}><Text size={46} color={C.navy}>{f >= cs ? 'what would the $1,000 have cost?' : ' '}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: the real price of free ============
  {
    const nk = w('c8a', 'napkin');
    const tf = w('c8a', 'twenty');
    q(nk, 'paper', 0.6);
    q(tf, 'scribble', 0.6);
    const tl = w('c8b', 'toll');
    const fr = w('c8b', 'four');
    q(tl, 'pop', 0.5);
    q(fr, 'scribble', 0.6);
    const ti = w('c8c', 'times');
    const tt = w('c8c', 'thirty');
    q(ti, 'marker', 0.5);
    q(tt, 'stamp', 0.9);
    const sk = shake(f, tt, 14, 14);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100} s={P(A('c8a'))}><Text size={48}>the real price of "free $1,000"</Text></G2>
          <Napkin x={820 + sk.x} y={540 + sk.y} s={1.05 * P(A('c8a')) * bump(tt, 0.06)} lines={[
            {t: '$25,000 bets', on: f >= tf},
            {t: '× 4.5¢ toll', c: C.red, on: f >= fr},
            {t: f >= tt ? '= ~$1,136' : '= ?', c: C.red, on: f >= ti},
          ]} />
          <Dave f={f} x={1600} y={940} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: tt, pose: 'shock', expr: 'shock', look: -0.6}]} />
          {f >= tt && <rect x={460} y={700} width={720} height={10} rx={5} fill={C.red} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mr = w('c8d', 'more');
    const pr = w('c8d', 'parlays');
    const tn = w('c8d', 'ten');
    q(mr, 'stamp', 0.6);
    q(pr, 'pop', 0.5);
    q(tn, 'cash', 0.6);
    const sm = w('c8e', 'smiled');
    const nv = w('c8e', 'never');
    const tm = w('c8e', 'time');
    q(sm, 'pop', 0.5);
    q(nv, 'thud', 0.6);
    q(tm, 'coin', 0.5);
    scene(A('c8d'), () =>
      f < A('c8e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c8d'))}><Text size={48}>"free" vs. what it costs, on average</Text></G2>
            <Bar x={620} y={760} s={P(A('c8d'))} w={320} h={380} color={C.green} label="THE BONUS" value="$1,000" />
            <Bar x={1120} y={760} s={P(A('c8d')) * bump(mr, 0.1)} w={320} h={432} color={C.red} label="THE TOLL" value="~$1,136" />
            <Box x={1600} y={480} w={480} h={340} s={P(A('c8d')) * bump(tn, 0.1)} o={lt(pr, 0.45)} fill={f >= tn ? C.yellow : '#fff'}>
              <Text y={-110} size={32} color={GRAY}>all bets, 2025:</Text>
              <Text y={-20} size={40}>apps kept about</Text>
              <Text y={70} size={90} color={C.red}>{f >= tn ? '10¢' : '?¢'}</Text>
              <Text y={140} size={30} color={GRAY}>of every $1 bet</Text>
            </Box>
            <SourceTag f={f} at={tn} text="AGA: $16.89B revenue / $166.94B bet in 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={1240} y={540} s={P(A('c8e')) * bump(sm, 0.08)}>
              <AppPhone>
                <circle cx={-60} cy={-90} r={22} fill={C.ink} />
                <circle cx={60} cy={-90} r={22} fill={C.ink} />
                <path d={f >= sm ? 'M -100 20 Q 0 130 100 20' : 'M -100 40 L 100 40'} fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
                <Text y={170} size={34} color={C.red}>{f >= nv ? 'never free' : ''}</Text>
              </AppPhone>
            </G2>
            <Dave f={f} x={500} y={930} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: 0.6}]} />
            <G2 x={500} y={300} o={lt(tm, 0.4)}><Text size={44}>paid for... one bet at a time</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ WHAT DAVE LEARNED ============
  const recap = ['A free bonus is paid for with your bets', 'Winners get limited. Losers get perks.', 'Read the playthrough. Take winnings out.'];
  {
    const r = [w('r1', 'one'), bs('r2'), bs('r3')];
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('r1'))}><Text size={84}>WHAT DAVE LEARNED</Text></G2>
          {recap.map((b, i) => <Row key={i} x={180} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1560} />)}
          <Dave f={f} x={1800} y={1000} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bo = w('r4', 'boss');
    const tw = w('r4', 'two');
    const ly = w('r4', 'loyal', 1);
    q(bo, 'mail', 0.6);
    q(tw, 'trombone', 0.5);
    q(ly, 'sting', 0.5);
    const sb = w('r5', 'subscribe');
    const rc = w('r5', 'raccoon');
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(rc, 'boing', 0.4);
    scene(A('r4'), () =>
      f < A('r5') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Stamp x={960} y={120} s={P(A('r4'))} text="NEXT TIME" color={C.navy} size={52} r={-2} />
            <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}, {at: tw, pose: 'shrug', expr: 'suspicious', look: 0.6}]} />
            <Box x={1220} y={520} w={860} h={460} s={P(A('r4')) * bump(bo, 0.06)}>
              <Text y={-170} size={34} color={GRAY}>FROM: YOUR BOSS</Text>
              <Text y={-90} size={48}>Congrats on 5 loyal years!</Text>
              <Text y={20} size={44}>here's your raise:</Text>
              <Text y={120} size={110} color={f >= tw ? C.red : C.ink}>{f >= tw ? '+2%' : '+?%'}</Text>
            </Box>
            <G2 x={480} y={280} o={lt(ly, 0.4)}><Text size={44} color={C.red}>loyal = poorer?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={400} s={1.4 * pop(f, A('r5'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1420} y={400} s={1.1 * pop(f, A('r5') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <TollBooth x={1500} y={900} s={0.8 * pop(f, A('r5') + 6)} label="TOLL" />
            <Raccoon f={f} x={1500} y={680} s={0.7 * pop(f, A('r5') + 8)} mood="wink" holdCoin />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ DAMAGE METER ============
  const SUB = we('c5e', 'revenue') + 20;
  subCues(SUB).forEach((c) => cues.push(c));
  const dIn = A('o4');
  const d140 = w('c4a', 'forty');
  const d640 = w('c5a', 'six');
  const dSaved = w('c7a', 'withdraw');
  q(dSaved + 6, 'chime', 0.5);
  const dmg = f >= dSaved ? {lab: "DAMAGE → SAVED", val: '+$640', c: C.green, at: dSaved} : f >= d640 ? {lab: "DAVE'S DAMAGE", val: 'UP $640', c: C.gold, at: d640} : f >= d140 ? {lab: "DAVE'S DAMAGE", val: '-$140', c: C.red, at: d140} : {lab: "DAVE'S DAMAGE", val: '$0', c: C.ink, at: dIn};
  const inCard = (t.chapters ?? []).some((c) => f >= Math.round(c.start * 30) - 4 && f < Math.round(c.start * 30) + CHAPTER_FRAMES + 4);
  const inSub = f >= SUB - 4 && f <= SUB + SUB_FRAMES + 4;
  const showD = f >= dIn && f < A('r1') && !inCard && !inSub;
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {showD && (
        <Svg>
          <G2 x={1720} y={110} s={pop(f, dIn) * bump(dmg.at, 0.2)}>
            <rect x={-176} y={-56} width={352} height={124} rx={22} fill="rgba(35,35,43,0.18)" transform="translate(6,8)" />
            <rect x={-176} y={-56} width={352} height={124} rx={22} fill="#fff" stroke={C.ink} strokeWidth={5} />
            <Text y={-26} size={24} color={GRAY} ls={2}>{dmg.lab}</Text>
            <Text y={26} size={52} color={dmg.c}>{dmg.val}</Text>
          </G2>
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

const Calendar90: React.FC = () => (
  <g>
    <rect x={-260} y={-60} width={520} height={120} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <rect x={-260} y={-60} width={110} height={120} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
    <Text x={-205} y={4} size={40} color="#fff">90</Text>
    <Text x={60} y={4} size={50}>DAYS TO DO IT</Text>
  </g>
);
