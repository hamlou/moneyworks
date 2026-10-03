import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, SUB_FRAMES} from '../fx';
import {Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {OldCar, Row, SubButton, Bell, CreditCard, Phone} from '../props2';
import {Raccoon, SourceCard, Person} from '../props3';
import {Pizza, Burger} from '../props4';
import {DamageMeter57, PizzaSlice, SendApp, DinnerTable, Fork, GuessCard57, Jaw, BillTicket, TicketMachine, OnePage, GiftBox57, IrsPage} from '../props57';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Danny: React.FC<SP> = (p) => <Stick acc={['shades']} seed={57} {...p} />;
const Mom: React.FC<SP> = (p) => <Stick acc={['bun']} seed={60} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Coworker: React.FC<SP> = (p) => <Stick acc={['tie']} seed={88} {...p} />;
const Cousin: React.FC<SP> = (p) => <Stick acc={['glasses']} seed={64} {...p} />;

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

export const Ep57: React.FC = () => {
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

  // ============ HOOK ============
  const o1Three = w('o1', 'three');
  const o1Mom = w('o1', 'mom');
  const o1Scene = (ff: number) => {
    const drop = Math.max(0, ff - o1Mom);
    return (
      <AbsoluteFill>
        <Cam f={ff} keys={[[0, 1.15, 960, 560], [45, 1, 960, 540]]}>
          <Interior />
          <Svg>
            <Stamp x={330} y={130} s={1} text="THANKSGIVING" color={C.navy} size={52} r={-4} />
            <Mom f={ff} x={1640} y={760} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: o1Mom, pose: 'shock', expr: 'shock'}]} />
            <Danny f={ff} x={1220} y={760} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.6}, {at: o1Three, pose: 'shock', expr: 'shock'}]} />
            <DinnerTable x={960} y={820} s={1} />
            <G2 x={1290 + drop * 6} y={Math.min(760, 600 + drop * drop * 0.9)} r={drop * 22}>
              <Fork s={1.1} />
            </G2>
            <Dave f={ff} x={330} y={960} s={1.2} keys={[{at: 0, pose: 'talk', expr: 'worried', look: 0.8}, {at: o1Three, pose: 'point_r', expr: 'think', look: 0.8}]} />
            <G2 x={640} y={400} s={bump(o1Three, 0.12)}>
              <Bubble text={ff >= o1Three ? 'so... about my $3,000' : 'so, Danny...'} size={48} tail="left" />
            </G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  q(2, 'pop', 0.6);
  q(w('o1', 'thanksgiving'), 'ding', 0.5);
  q(o1Three, 'cash', 0.7);
  q(o1Mom, 'boing', 0.6);
  q(o1Mom + 12, 'clank', 0.6);
  scene(0, () => o1Scene(f));
  const FR = A('o2');
  const RW = w('o2', 'rewind');
  q(FR, 'sting', 0.7);
  scene(
    FR,
    () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}</AbsoluteFill>
        <AbsoluteFill style={{background: '#fff', opacity: 1 - ease(f, FR, FR + 8)}} />
        <Svg>
          <Stamp x={760} y={200} s={P(FR)} text="THAT'S DAVE" color={C.red} size={70} r={-6} />
          <path d="M 640 260 Q 520 330 420 520" fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" opacity={P(FR)} />
          <path d="M 400 490 L 420 530 L 455 500" fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={P(FR)} />
        </Svg>
      </AbsoluteFill>
    ),
    false,
  );
  q(RW, 'whoosh', 0.7);
  q(RW + 4, 'flip', 0.6);
  scene(
    RW,
    () => (
      <AbsoluteFill>
        {o1Scene(Math.max(0, FR - (f - RW) * 4))}
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill="rgba(29,53,87,0.12)" />
          <Text x={1700} y={120} size={64} color={C.navy}>{'<< REWIND'}</Text>
          <Stamp x={960} y={540} s={P(RW + 4)} text="LAST SPRING" color={C.navy} size={80} r={-4} />
        </Svg>
      </AbsoluteFill>
    ),
    false,
  );
  {
    const dd = w('o3', 'died');
    const sn = w('o3', 'sent');
    const pz = w('o3', 'pizza');
    q(dd, 'sputter', 0.6);
    q(sn, 'cash', 0.7);
    q(pz, 'pop', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <OldCar f={f} x={430} y={760} s={1.05 * P(A('o3'))} shake={f >= dd ? 1 : 0} sag={f >= dd ? 1 : 0} />
          <Danny f={f} x={760} y={920} s={1.05} keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.6}, {at: sn, pose: 'celebrate', expr: 'grin'}]} />
          <SendApp x={1300} y={540} s={1.12 * P(A('o3')) * bump(sn, 0.06)} amount="$3,000" sent={f >= sn ? 1 : 0} memo={f >= pz ? pop(f, pz) : 0} ring={f >= pz ? ease(f, pz + 4, pz + 14) : 0} />
          <G2 x={1700} y={260} s={bump(pz, 0.12)} o={lt(pz, 0.4)}><Text size={44} color={C.red}>the contract?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('o4', 'fifty');
    const wr = w('o4', 'wrong');
    const slam = fv + 22;
    q(w('o4', 'bankrate'), 'paper', 0.5);
    q(fv, 'tick', 0.5);
    q(slam, 'stamp', 0.8);
    q(wr, 'buzz', 0.5);
    const sk = shake(f, slam, 14, 14);
    const n = Math.round(lerp(0, 55, ease(f, fv, slam)));
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Cam f={f} keys={[[A('o4'), 1, 960, 540], [slam, 1, 960, 540], [slam + 8, 1.12, 960, 560]]}>
          <Board />
          <Svg>
            <G2 x={760} y={150} s={P(A('o4'))}><Text size={42}>people who lend money expecting it back:</Text></G2>
            <Box x={760 + sk.x} y={540 + sk.y} w={720} h={360} s={P(A('o4')) * bump(slam, 0.16)} fill={f >= slam ? C.red : '#fff'}>
              <Text y={-20} size={190} color={f >= slam ? '#fff' : C.ink}>{`${n}%`}</Text>
              <Text y={120} size={40} color={f >= slam ? '#fff' : GRAY}>{f >= wr ? 'say it went wrong' : 'say...'}</Text>
            </Box>
            <Dave f={f} x={1450} y={940} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'worried', look: -0.7}, {at: slam, pose: 'shock', expr: 'shock'}]} />
            <SourceTag f={f} at={fv} text="Bankrate Financial Taboos Survey (YouGov, Sept 2025)" />
          </Svg>
        </Cam>
      </AbsoluteFill>
    ));
  }
  {
    const ev = w('o5', 'everyone');
    const ex = w('o5', 'except');
    const dv = w('o5', 'dave');
    q(ev, 'pop', 0.5);
    q(ex, 'buzz', 0.6);
    q(dv, 'sting', 0.5);
    const sx = ease(f, ex, ex + 14, 2150, 1740);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <defs>
            <filter id="sil57">
              <feColorMatrix type="matrix" values="0 0 0 0 0.12 0 0 0 0 0.12 0 0 0 0 0.15 0 0 0 1 0" />
            </filter>
          </defs>
          <Danny f={f} x={300} y={920} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.7}]} />
          {['CAR', 'PHONE', 'CARD'].map((l, i) => (
            <G2 key={l} x={600 + i * 260} y={520} s={0.75 * P(A('o5') + i * 4) * bump(ev + i * 4, 0.1)}>
              <BillTicket n={i + 1} label={l} color={[C.blue, C.green, C.red][i]} open={0.3} />
              <Stamp x={0} y={-10} s={f >= ev ? 1 : 0} text="PAID" color={C.green} size={44} r={-10} />
            </G2>
          ))}
          <Dave f={f} x={1420} y={920} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: -0.7}]} />
          <G2 x={1420} y={540} s={bump(dv, 0.14)} o={lt(ex, 0.4)}><Text size={110} color={C.red}>?</Text></G2>
          <g transform={`translate(${sx},620) scale(1.3)`} filter="url(#sil57)"><Raccoon f={f} mood="sneaky" /></g>
          <G2 x={sx} y={520} o={f >= ex ? 1 : 0}><Text size={120} color="#fff" stroke={C.ink} sw={8}>?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const se = w('o6', 'sentence');
    const mn = w('o6', 'money');
    const tg = w('o6', 'thanksgiving');
    q(se, 'pop', 0.6);
    q(mn, 'coin', 0.6);
    q(tg, 'ding', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('o6'))}><Text size={50}>the one sentence that saves:</Text></G2>
          <Box x={960} y={440} w={1100} h={200} s={P(A('o6')) * bump(se, 0.08)} fill={C.navy}>
            <rect x={-440} y={-30} width={260} height={60} rx={14} fill="#9AA5B1" />
            <rect x={-150} y={-30} width={160} height={60} rx={14} fill="#9AA5B1" />
            <rect x={40} y={-30} width={200} height={60} rx={14} fill="#9AA5B1" />
            <rect x={270} y={-30} width={150} height={60} rx={14} fill="#9AA5B1" />
            <Text x={480} y={0} size={70} color={C.yellow}>?</Text>
          </Box>
          <G2 x={560} y={780} s={P(A('o6')) * bump(mn, 0.14)} o={lt(mn, 0.4)}><MoneyStack n={3} s={1.1} label="$3,000" /></G2>
          <G2 x={1360} y={800} s={0.55 * P(A('o6')) * bump(tg, 0.1)} o={lt(tg, 0.4)}><DinnerTable /></G2>
          <G2 x={960} y={790} o={lt(tg, 0.4)}><Text size={70} color={C.red}>+</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Just Until Payday ============
  {
    const dd = w('c1a', 'dead');
    const jb = w('c1a', 'job');
    const th = w('c1a', 'three');
    const pd = w('c1a', 'payday');
    q(dd, 'sputter', 0.5);
    q(jb, 'buzz', 0.4);
    q(th, 'cash', 0.6);
    q(pd, 'ding', 0.5);
    const ex = w('c1b', 'exactly');
    const em = w('c1b', 'emergency');
    const tk = w('c1b', 'takeout');
    q(ex, 'coin', 0.5);
    q(em, 'ding', 0.5);
    q(tk, 'buzz', 0.4);
    scene(A('c1a'), () =>
      f < A('c1b') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <OldCar f={f} x={460} y={760} s={1.05} shake={f < jb ? 1 : 0.3} sag={1} />
            <Danny f={f} x={820} y={920} s={1.05} keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.7}, {at: pd, pose: 'present', expr: 'happy'}]} />
            <Box x={1420} y={420} w={600} h={240} s={P(A('c1a')) * bump(th, 0.12)} fill={f >= th ? C.yellow : '#fff'}>
              <Text y={-50} size={34} color={GRAY}>Danny needs</Text>
              <Text y={30} size={90} color={C.red}>{f >= th ? '$3,000' : '$?'}</Text>
            </Box>
            <G2 x={1420} y={720} s={bump(pd, 0.12)} o={lt(pd, 0.4)}><Bubble text={'"just until payday!"'} size={44} tail="left" /></G2>
            <G2 x={460} y={420} o={lt(jb, 0.4)}><Text size={40} color={C.red}>no car = no job</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={380} y={940} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}]} />
            <G2 x={820} y={600} s={1.2 * P(A('c1b')) * bump(ex, 0.1)}><MoneyStack n={3} label="$3,000" /></G2>
            <G2 x={820} y={830} o={lt(em, 0.4)}><Text size={40} color={C.navy}>his whole emergency fund</Text></G2>
            <Box x={1460} y={560} w={560} h={420} s={P(A('c1b')) * bump(tk, 0.1)}>
              <Text y={-160} size={34} color={GRAY}>3 years of skipped takeout</Text>
              <Burger x={-110} y={30} s={0.7} />
              <Pizza x={120} y={30} s={0.45} eaten={0} />
              {f >= tk && <XMark x={-110} y={30} s={0.6} />}
              {f >= tk && <XMark x={120} y={30} s={0.6} />}
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const sn = w('c1c', 'sends');
    const op = w('c1c', 'opens');
    q(op, 'click', 0.5);
    q(sn, 'cash', 0.8);
    const nd = w('c1d', 'date');
    const np = w('c1d', 'plan');
    const pz = w('c1d', 'pizza');
    const ct = w('c1d', 'contract');
    q(nd, 'buzz', 0.4);
    q(np, 'buzz', 0.4);
    q(pz, 'pop', 0.6);
    q(ct, 'stamp', 0.7);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={380} y={940} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}, {at: sn, pose: 'thumbs', expr: 'grin'}]} />
          <SendApp x={960} y={540} s={1.15 * P(A('c1c')) * bump(sn, 0.06)} amount="$3,000" sent={f >= sn ? 1 : 0} memo={f >= pz ? pop(f, pz) : 0} ring={f >= pz ? ease(f, pz + 4, pz + 14) : 0} />
          <G2 x={1530} y={380} s={bump(nd, 0.1)} o={lt(nd, 0.35)}><XMark s={0.45} /><Text x={110} y={0} size={40} anchor="start">no date</Text></G2>
          <G2 x={1530} y={540} s={bump(np, 0.1)} o={lt(np, 0.35)}><XMark s={0.45} /><Text x={110} y={0} size={40} anchor="start">no plan</Text></G2>
          <Stamp x={1560} y={760} s={f >= ct ? pop(f, ct) : 0} text="THE CONTRACT" color={C.red} size={54} r={-8} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pz = w('c1e', 'pizza');
    const ad = w('c1e', 'address');
    const ar = w('c1e', 'arriving');
    q(pz, 'pop', 0.5);
    q(ad, 'buzz', 0.5);
    q(ar, 'cricket', 0.5);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={960} y={130} s={P(A('c1e'))}><Text size={48}>a loan with no date =</Text></G2>
          <G2 x={560} y={560} s={P(A('c1e')) * bump(pz, 0.08)}>
            <rect x={-260} y={-40} width={520} height={80} fill="#E9C28E" stroke={C.ink} strokeWidth={6} />
            <rect x={-260} y={-60} width={520} height={30} fill="#D9A15B" stroke={C.ink} strokeWidth={6} />
            <PizzaSlice x={0} y={-150} s={1.6} />
          </G2>
          <Box x={1360} y={520} w={640} h={340} s={P(A('c1e')) * bump(ad, 0.1)} fill={f >= ad ? '#FFE3EA' : '#fff'}>
            <Text y={-100} size={36} color={GRAY}>DELIVERY ORDER</Text>
            <Text y={-20} size={46}>{`address: ${f >= ad ? '???' : '...'}`}</Text>
            <Text y={60} size={46} color={f >= ar ? C.red : C.ink}>{`arriving: ${f >= ar ? '???' : '...'}`}</Text>
          </Box>
          <Dave f={f} x={1360} y={960} s={0.85} keys={[{at: 0, pose: 'shrug', expr: 'think', look: -0.5}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hg = w('c1f', 'hugs');
    const bk = w('c1f', 'back');
    const wd = w('c1f', 'weird');
    const py = w('c1f', 'paying');
    const nt = w('c1f', 'not');
    q(hg, 'heart', 0.5);
    q(bk, 'pop', 0.5);
    q(wd, 'sting', 0.5);
    q(py, 'cash', 0.6);
    q(nt, 'buzz', 0.6);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={560} y={940} s={1.15} keys={[{at: 0, pose: 'carry', expr: 'grin', look: 0.6}, {at: nt, pose: 'pockets', expr: 'sad'}]} pockets={f >= nt ? 1 : 0} />
          <Danny f={f} x={760} y={940} s={1.1} keys={[{at: 0, pose: 'carry', expr: 'grin', look: -0.6}, {at: py, pose: 'present', expr: 'happy', look: 0.6}]} />
          <G2 x={660} y={420} s={P(A('c1f')) * bump(bk, 0.1)}><Bubble text={`"I'll pay you back, bro!"`} size={44} tail="down" /></G2>
          <G2 x={1420} y={200} s={bump(wd, 0.1)} o={lt(wd, 0.35)}><Text size={44} color={C.navy}>{"here's the weird part..."}</Text></G2>
          {['CAR LOAN', 'PHONE', 'CARD'].map((l, i) => (
            <G2 key={l} x={1180 + i * 240} y={560} s={0.6 * P(A('c1f')) * bump(py + i * 5, 0.12)} o={lt(py, 0.35)}>
              <BillTicket n={i + 1} label={l} color={[C.blue, C.green, C.red][i]} />
              <Stamp y={-10} s={f >= py + i * 5 ? 1 : 0} text="PAID" color={C.green} size={50} r={-10} />
            </G2>
          ))}
          <G2 x={1420} y={900} s={bump(nt, 0.14)} o={lt(nt, 0.35)}><Text size={54} color={C.red}>just not Dave</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 Everyone Got Paid But Dave ============
  {
    const my = w('c2a', 'may');
    const cr = w('c2a', 'car');
    const gr = w('c2a', 'great');
    const cz = w('c2a', 'crazy');
    q(my, 'flip', 0.5);
    q(cr, 'mail', 0.5);
    q(gr, 'ding', 0.5);
    q(cz, 'boing', 0.4);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={960} y={210} s={0.8 * P(A('c2a')) * bump(my, 0.1)} top="MONTH" year="MAY" flip={0} />
          <Dave f={f} x={330} y={940} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
          <G2 x={620} y={560} s={P(A('c2a')) * bump(cr, 0.1)}><Bubble text={'"hey, how\'s the car?"'} size={42} tail="left" /></G2>
          <Danny f={f} x={1600} y={940} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: gr, pose: 'thumbs', expr: 'grin'}, {at: cz, pose: 'shrug', expr: 'worried'}]} />
          <G2 x={1300} y={420} s={bump(gr, 0.1)} o={lt(gr, 0.35)}><Bubble text={f >= cz ? '"great! sorry,\nthis month was crazy"' : '"great!"'} size={42} tail="right" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hs = [w('c2b', 'car'), w('c2b', 'phone'), w('c2b', 'credit')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const tm = w('c2b', 'time');
    q(tm, 'chime', 0.4);
    const jn = w('c2c', 'june');
    const jl = w('c2c', 'july');
    const pd = w('c2c', 'paid');
    const tu = w('c2c', 'thumbs');
    q(jn, 'flip', 0.5);
    q(jl, 'flip', 0.5);
    q(pd, 'cash', 0.5);
    q(tu, 'trombone', 0.5);
    const mon = f >= jl ? 'JULY' : f >= jn ? 'JUNE' : 'MAY';
    const items = ['Car payment', 'Phone bill', 'Credit card minimum', 'Dave: (thumbs up)'];
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={700} y={110} s={P(A('c2b'))}><Text size={46}>{"Danny's month:"}</Text></G2>
          <Calendar x={1540} y={300} s={0.75 * P(A('c2b')) * bump(f >= jl ? jl : jn, 0.1)} top="MONTH" year={mon} flip={0} />
          {items.map((it, i) => {
            const on = i < 3 ? f >= hs[i] : f >= tu;
            return (
              <G2 key={i}>
                <Row x={120} y={240 + i * 170} s={0.95 * P(A('c2b'))} n={i + 1} text={it} lit={on ? 1 : 0.3} color={i < 3 ? C.green : C.red} w={1000} />
                <Text x={1060} y={292 + i * 170} size={40} color={i < 3 ? C.green : C.red}>{on ? (i < 3 ? 'PAID' : '$0') : ''}</Text>
              </G2>
            );
          })}
          <Dave f={f} x={1540} y={960} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: tu, pose: 'thumbs', expr: 'sad'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tr = w('c2d', 'tire');
    const bl = w('c2d', 'blows');
    const ins = w('c2d', 'inside');
    const fr = w('c2d', 'four');
    q(tr, 'pop', 0.4);
    q(bl, 'thud', 0.8);
    q(ins, 'boing', 0.4);
    q(fr, 'cash', 0.7);
    const sk = shake(f, bl, 16, 14);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <OldCar f={f} x={520 + sk.x} y={760 + sk.y} s={1.1} sag={f >= bl ? 1 : 0} shake={f >= bl ? 0.6 : 0} />
          <Stamp x={520} y={460} s={f >= bl ? pop(f, bl) : 0} text="POP!" color={C.red} size={70} r={-8} />
          <Dave f={f} x={900} y={940} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: bl, pose: 'shock', expr: 'shock'}, {at: fr, pose: 'facepalm', expr: 'tired'}]} />
          <G2 x={1450} y={330} o={lt(ins, 0.35)}><Text size={40} color={GRAY}>{"emergency fund: inside Danny's car"}</Text></G2>
          <G2 x={1450} y={620} s={P(A('c2d')) * bump(fr, 0.12)}><CreditCard s={1.4} label="DAVE" /></G2>
          <G2 x={1450} y={860} s={bump(fr, 0.16)} o={lt(fr, 0.35)}><Text size={70} color={C.red}>+$400</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ls = w('c2e', 'last');
    const nk = w('c2e', 'napkin');
    q(ls, 'buzz', 0.4);
    q(nk, 'scribble', 0.5);
    const gs = w('c2f', 'guess');
    const hd = w('c2f', 'hundred');
    const cm = w('c2f', 'comments');
    const mt = w('c2f', 'minute');
    q(gs, 'ding', 0.6);
    for (let k = gs + 15; k < mt + 20; k += 30) q(k, 'tick', 0.35);
    q(cm, 'pop', 0.5);
    scene(A('c2e'), () =>
      f < A('c2f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={500} y={940} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
            <G2 x={500} y={420} s={P(A('c2e')) * bump(ls, 0.1)}><Bubble text="why am I always LAST?" size={44} tail="down" /></G2>
            <G2 x={1320} y={560} s={P(A('c2e')) * bump(nk, 0.1)} r={-4}>
              <rect x={-300} y={-220} width={600} height={440} fill="#FFFDF6" stroke={C.ink} strokeWidth={6} />
              <Text y={-140} size={40} font="Caveat" color={C.ink}>{"Danny's payday"}</Text>
              <path d="M -240 0 L 240 0" stroke={C.ink} strokeWidth={6} strokeDasharray="20 14" />
              <Text y={100} size={60} color={C.red}>?</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2f'))}><Text size={46}>{f >= hd ? 'out of 100 people who lend money...' : 'is Dave the only one?'}</Text></G2>
            <GuessCard57 f={f} x={760} y={590} s={P(A('c2f')) * bump(gs, 0.08)} />
            <Dave f={f} x={1420} y={940} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
            <G2 x={1420} y={460} s={bump(cm, 0.12)} o={lt(cm, 0.35)}><Bubble text={'how many\nlose money?'} size={42} tail="down" /></G2>
            <G2 x={760} y={960} o={lt(cm, 0.35)}><Text size={38} color={C.navy}>write your guess in the comments</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 The Line At The Deli ============
  const LINE = [
    {l: 'LANDLORD', c: C.navy, cons: 'lose your home'},
    {l: 'CAR LENDER', c: C.blue, cons: 'tow truck'},
    {l: 'PHONE', c: C.green, cons: 'phone goes dark'},
    {l: 'CREDIT CARD', c: C.red, cons: 'late fee + score'},
  ];
  {
    const nt = w('c3a', 'night');
    const dl = w('c3a', 'deli');
    const nb = w('c3a', 'number');
    q(nt, 'scribble', 0.4);
    q(dl, 'ding', 0.5);
    q(nb, 'pop', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c3a'))}><Text size={48}>{"payday works like a deli line"}</Text></G2>
          <TicketMachine x={330} y={600} s={1.2 * P(A('c3a')) * bump(nb, 0.1)} n={f >= nb ? 1 : 0} />
          {LINE.map((b, i) => (
            <G2 key={i} x={720 + i * 300} y={560} s={0.82 * P(A('c3a') + i * 3) * bump(nb + i * 4, 0.1)} o={lt(dl, 0.45)}>
              <BillTicket n={i + 1} label={b.l} color={b.c} teeth={false} />
            </G2>
          ))}
          <Dave f={f} x={960} y={1000} s={0.8} keys={[{at: 0, pose: 'present', expr: 'think', look: 0.5}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ks = [w('c3b', 'landlord'), w('c3b', 'car'), w('c3c', 'phone'), w('c3c', 'credit')];
    const cs = [w('c3b', 'home'), w('c3b', 'tow'), w('c3c', 'dark'), w('c3c', 'fee')];
    ks.forEach((x) => q(x, 'pop', 0.5));
    q(cs[0], 'thud', 0.5);
    q(cs[1], 'clank', 0.5);
    q(cs[2], 'buzz', 0.4);
    q(cs[3], 'stamp', 0.6);
    const bk = w('c3d', 'back');
    const dv = w('c3d', 'dave');
    const nth = w('c3d', 'nothing');
    const wr = w('c3d', 'worries');
    q(bk, 'pop2', 0.5);
    q(nth, 'cricket', 0.6);
    q(wr, 'trombone', 0.5);
    const sk2 = w('c3e', 'skip');
    const rn = w('c3e', 'runs');
    q(sk2, 'ding', 0.4);
    q(rn, 'sputter', 0.5);
    const sm = w('c3f', 'something');
    const bn = w('c3f', 'billions');
    q(sm, 'pop', 0.5);
    q(bn, 'sting', 0.7);
    const davePos = 1700;
    scene(A('c3b'), () => {
      const drain = f >= rn ? ease(f, rn, rn + 30) : 0;
      const chomp = f >= sm ? 0.5 + 0.5 * Math.sin((f - sm) * 0.5) : 0.35;
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < A('c3e') ? (
              <G2 x={800} y={110}><Text size={46}>{f >= bk ? 'and at the very back...' : 'every bill has a number'}</Text></G2>
            ) : (
              <G2 x={800} y={110}>
                <rect x={-560} y={-40} width={1120} height={80} rx={20} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <rect x={-556} y={-36} width={1112 * (1 - drain * 0.98)} height={72} rx={18} fill={C.green} />
                <Text y={2} size={36}>{f >= rn ? 'paycheck... runs out' : "Danny's paycheck"}</Text>
              </G2>
            )}
            {LINE.map((b, i) => {
              const on = f >= ks[i];
              return (
                <G2 key={i} x={260 + i * 340} y={540} s={0.9 * P(A('c3b')) * bump(ks[i], 0.12)} o={on ? 1 : 0.45}>
                  <BillTicket n={i + 1} label={b.l} color={b.c} open={f >= A('c3f') ? chomp : on ? 0.5 : 0.2} hl={on && f < A('c3d') ? 1 : 0} />
                  <Text y={220} size={32} color={f >= cs[i] ? C.red : GRAY}>{f >= cs[i] ? b.cons : ''}</Text>
                </G2>
              );
            })}
            <G2 x={davePos} y={540} s={0.9 * P(A('c3b')) * bump(dv, 0.12)} o={lt(bk, 0.4)}>
              <BillTicket n={5} label="DAVE" color={C.gray} teeth={false} hl={f >= bk ? 1 : 0} />
              <Text y={220} size={32} color={f >= nth ? C.red : GRAY}>{f >= wr ? '"no worries!"' : f >= nth ? 'nothing happens' : ''}</Text>
            </G2>
            <PizzaSlice x={davePos + 130} y={420} s={f >= bk ? 0.8 : 0} />
            <Dave f={f} x={davePos} y={1010} s={0.6} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.5}, {at: rn, pose: 'shrug', expr: 'sad'}]} />
            <G2 x={960} y={960} o={lt(bn, 0.3)}><Text size={44} color={C.red}>{f >= bn ? 'what are those teeth worth? billions.' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      );
    });
  }

  // ============ CH4 Who Has The Teeth? ============
  {
    const sp = w('c4a', 'september');
    const hd = w('c4a', 'hundred');
    q(sp, 'paper', 0.5);
    q(hd, 'pop', 0.4);
    const ff = w('c4b', 'forty');
    const tw = w('c4b', 'twenty');
    const fo = w('c4b', 'four', 1);
    const fg = w('c4b', 'fight');
    q(ff, 'stamp', 0.8);
    q(tw, 'ding', 0.5);
    q(fo, 'pop', 0.5);
    q(fg, 'boing', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={800} y={110} s={P(A('c4a'))}><Text size={44}>{f >= hd ? 'Bankrate: ~2,500 US adults, Sept 2025' : 'the answer to your guess...'}</Text></G2>
          <GuessCard57 f={f} x={480} y={580} s={0.95 * P(A('c4a')) * bump(ff, 0.14)} answer={f >= ff ? '44' : undefined} />
          <Box x={1360} y={420} w={760} h={150} s={P(A('c4a')) * bump(ff, 0.08)} fill={f >= ff ? '#FFE3EA' : '#fff'}>
            <Text x={-340} y={0} size={40} anchor="start">lost money</Text>
            <Text x={330} y={0} size={60} anchor="end" color={C.red}>{f >= ff ? '44%' : '?'}</Text>
          </Box>
          <Box x={1360} y={600} w={760} h={150} s={P(A('c4a')) * bump(tw, 0.08)} o={lt(tw, 0.45)}>
            <Text x={-340} y={0} size={40} anchor="start">damaged relationship</Text>
            <Text x={330} y={0} size={60} anchor="end" color={C.red}>{f >= tw ? '26%' : '?'}</Text>
          </Box>
          <Box x={1360} y={780} w={760} h={150} s={P(A('c4a')) * bump(fo, 0.08)} o={lt(fo, 0.45)} fill={f >= fg ? C.yellow : '#fff'}>
            <Text x={-340} y={0} size={40} anchor="start">actual physical fight</Text>
            <Text x={330} y={0} size={60} anchor="end" color={C.red}>{f >= fo ? '4%' : '?'}</Text>
          </Box>
          <SourceTag f={f} at={sp} text="Bankrate 2025 Financial Taboos Survey (YouGov, 2,474 adults, Sept 15-17, 2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const id = w('c4c', 'idiot');
    const cp = w('c4c', 'company');
    const te = w('c4c', 'teeth');
    q(id, 'boing', 0.4);
    q(cp, 'crowd', 0.5);
    q(te, 'stamp', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={640} y={120} s={P(A('c4c'))}><Text size={46}>{f >= cp ? 'Dave is in BIG company' : 'is Dave an idiot?'}</Text></G2>
          {Array.from({length: 18}).map((_, i) => (
            <Person key={i} x={180 + (i % 6) * 180} y={420 + Math.floor(i / 6) * 190} s={0.9 * pop(f, cp + i)} c={i % 3 === 0 ? C.red : '#9AA5B1'} />
          ))}
          <Dave f={f} x={640} y={1000} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'sad'}, {at: cp, pose: 'idle', expr: 'happy'}]} />
          <G2 x={1500} y={560} s={P(A('c4c')) * bump(te, 0.14)} o={lt(te, 0.4)}><Jaw s={1.5} open={f >= te ? 0.5 + 0.5 * Math.sin((f - te) * 0.4) : 0.3} /></G2>
          <G2 x={1500} y={860} o={lt(te, 0.4)}><Text size={44} color={C.red}>everyone ahead has TEETH</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rc = w('c4d', 'raccoon');
    const ft = w('c4d', 'fourteen');
    const bl = w('c4d', 'billion');
    const cf = w('c4d', 'c');
    q(rc, 'pop', 0.6);
    q(ft, 'cash', 0.6);
    q(bl, 'stamp', 0.8);
    q(cf, 'paper', 0.4);
    const sx = w('c4e', 'sixty');
    const tl = w('c4e', 'teeth');
    const bt = w('c4e', 'bite');
    q(sx, 'cash', 0.8);
    q(tl, 'ding', 0.5);
    q(bt, 'thud', 0.7);
    scene(A('c4d'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Raccoon f={f} x={480} y={640} s={1.5 * P(A('c4d')) * bump(rc, 0.1)} mood="greedy" holdCoin />
            <G2 x={480} y={200} o={lt(rc, 0.4)}><Text size={40} color={GRAY}>remember him? (ep. 2)</Text></G2>
            <SourceCard x={1300} y={560} s={P(A('c4d')) * bump(bl, 0.08)} org="CFPB" sub="CREDIT CARD LATE FEES · 2022" title={['card companies charged']} stat={f >= bl ? '$14.5B' : f >= ft ? '$14.?B' : '$?'} statLabel="in late fees, in one year" color={C.red} />
            <SourceTag f={f} at={ft} text="CFPB, credit card market report release, Oct 25, 2023" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={600} y={540} s={P(A('c4e')) * bump(sx, 0.08)} org="CFPB" sub="2025 CREDIT CARD REPORT" title={['interest charged in 2024']} stat={f >= sx ? '~$160B' : '$?'} statLabel="in a single year" color={C.navy} />
            <Raccoon f={f} x={1380} y={700} s={1.3} mood="greedy" holdCoin />
            <G2 x={1380} y={380} s={bump(tl, 0.12)} o={lt(tl, 0.4)}><Jaw s={1.1} open={f >= bt ? 0.5 + 0.5 * Math.sin((f - bt) * 0.5) : 0.5} /></G2>
            <G2 x={1380} y={980} s={bump(bt, 0.12)} o={lt(bt, 0.35)}><Text size={46} color={C.red}>bite first, get paid first</Text></G2>
            <SourceTag f={f} at={sx} text="CFPB 2025 Consumer Credit Card Market Report (Dec 2025)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const xs = [w('c4f', 'fee'), w('c4f', 'interest'), w('c4f', 'report')];
    xs.forEach((x) => q(x, 'buzz', 0.4));
    const sm = w('c4f', 'smile');
    const bt = w('c4f', 'bite');
    q(sm, 'ding', 0.5);
    q(bt, 'trombone', 0.5);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={120} s={P(A('c4f'))}><Text size={48}>{"Dave's teeth:"}</Text></G2>
          {['late fee', 'interest', 'credit report'].map((l, i) => (
            <G2 key={l} x={400} y={330 + i * 170} s={P(A('c4f')) * bump(xs[i], 0.1)} o={lt(xs[i], 0.4)}>
              <XMark s={0.5} />
              <Text x={90} y={0} size={50} anchor="start">{l}</Text>
            </G2>
          ))}
          <Dave f={f} x={1360} y={960} s={1.4} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: sm, pose: 'present', expr: 'grin'}, {at: bt, pose: 'shrug', expr: 'grin'}]} />
          <G2 x={1360} y={340} s={bump(bt, 0.12)} o={lt(sm, 0.35)}><Bubble text={f >= bt ? "a smile doesn't bite" : 'just a smile'} size={46} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  const SUB = we('c4f', 'bite') + 15;
  subCues(SUB).forEach((c) => cues.push(c));
  {
    const fg = w('c4g', 'figured');
    const cr = w('c4g', 'care');
    const np = w('c4g', 'nope');
    const fb = w('c4g', 'financebuzz');
    const ei = w('c4g', 'eighty');
    const tw = w('c4g', 'two');
    q(fg, 'dream', 0.5);
    q(cr, 'pop', 0.4);
    q(np, 'buzz', 0.8);
    q(fb, 'paper', 0.5);
    q(ei, 'ding', 0.6);
    q(tw, 'ding', 0.5);
    scene(A('c4g'), () =>
      f < fb ? (
        <AbsoluteFill>
          <DreamBg />
          <DreamFrame label="WHAT DAVE THOUGHT" />
          <Svg>
            <Danny f={f} x={700} y={900} s={1.2} keys={[{at: 0, pose: 'relax', expr: 'smug'}]} />
            <G2 x={700} y={420} s={P(A('c4g')) * bump(cr, 0.1)}><Bubble text={"\"Dave's money?\nI don't care.\""} size={44} tail="down" /></G2>
            <Stamp x={1350} y={540} s={f >= np ? pop(f, np) * 1.3 : 0} text="NOPE" color={C.red} size={110} r={-10} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(fb)}><Text size={46}>family borrowers going in (FinanceBuzz):</Text></G2>
            <Box x={600} y={540} w={640} h={360} s={P(fb) * bump(ei, 0.1)} fill={f >= ei ? C.greenLight : '#fff'}>
              <Text y={-110} size={34} color={GRAY}>planned to pay back in full</Text>
              <Text y={20} size={140} color={C.green}>{f >= ei ? '85%' : '?'}</Text>
            </Box>
            <Box x={1320} y={540} w={640} h={360} s={P(fb) * bump(tw, 0.1)} o={lt(tw, 0.45)}>
              <Text y={-110} size={34} color={GRAY}>never meant to pay</Text>
              <Text y={20} size={140} color={C.red}>{f >= tw ? '2%' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={fb} text="FinanceBuzz family lending survey, 1,000 US adults, Dec 2024" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const vl = w('c4h', 'villain');
    const br = w('c4h', 'broke');
    const tt = w('c4h', 'teeth');
    const tg = w('c4h', 'thanksgiving');
    const bd = w('c4h', 'bad');
    q(vl, 'pop', 0.4);
    q(br, 'sputter', 0.4);
    q(tt, 'stamp', 0.5);
    q(tg, 'ding', 0.5);
    q(bd, 'sting', 0.7);
    scene(A('c4h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Danny f={f} x={420} y={940} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.6}]} sweat />
          <G2 x={420} y={420} s={P(A('c4h')) * bump(vl, 0.1)}><Bubble text={f >= br ? 'not a villain.\njust broke.' : 'villain?'} size={42} tail="down" /></G2>
          {[0, 1, 2].map((i) => (
            <G2 key={i} x={800 + i * 170} y={760} s={0.6 * P(A('c4h') + i * 3)}><Jaw open={0.5 + 0.4 * Math.sin(f * 0.3 + i)} color={[C.navy, C.blue, C.red][i]} /></G2>
          ))}
          <Dave f={f} x={1520} y={940} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.6}, {at: tt, pose: 'hips', expr: 'angry'}]} />
          <G2 x={1520} y={560} s={f >= tt ? 0.6 * pop(f, tt) : 0}><Jaw open={0.4} color={C.gray} /></G2>
          <Calendar x={1520} y={260} s={0.7 * (f >= tg ? pop(f, tg) : 0)} top="NOVEMBER" year="TURKEY" flip={0} />
          <Stamp x={1000} y={300} s={f >= bd ? pop(f, bd) : 0} text="BAD IDEA" color={C.red} size={80} r={-8} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 Pass The Gravy, Danny ============
  const Table = (o: {mood: 'calm' | 'ask' | 'gift' | 'chaos'; roll?: number; forkAt?: number; napAt?: number}) => {
    const drop = o.forkAt !== undefined ? Math.max(0, f - o.forkAt) : 0;
    const nap = o.napAt !== undefined && f >= o.napAt ? ease(f, o.napAt, o.napAt + 16) : 0;
    return (
      <>
        <Grandma f={f} x={720} y={760} s={1} keys={[{at: 0, pose: 'hold', expr: o.mood === 'calm' ? 'happy' : 'neutral', look: 0.4}]} />
        <Danny f={f} x={1180} y={760} s={1.05} keys={[{at: 0, pose: o.mood === 'calm' || o.mood === 'ask' ? 'hold' : 'shrug', expr: o.mood === 'gift' || o.mood === 'chaos' ? 'shock' : 'happy', look: -0.6}]} />
        <Mom f={f} x={1600} y={760} s={1.05} keys={[{at: 0, pose: o.mood === 'chaos' ? 'point_l' : 'idle', expr: o.mood === 'calm' ? 'happy' : o.mood === 'chaos' ? 'angry' : 'worried', look: -0.6}]} />
        <DinnerTable x={1060} y={820} s={0.95} roll={o.roll ?? 0} />
        {o.forkAt !== undefined && (
          <G2 x={1250 + drop * 5} y={Math.min(760, 600 + drop * drop * 0.9)} r={drop * 22}><Fork s={1.1} /></G2>
        )}
        {nap > 0 && (
          <G2 x={lerp(1180, 380, nap)} y={600 - Math.sin(nap * Math.PI) * 240} r={nap * 360}>
            <rect x={-40} y={-30} width={80} height={60} fill="#fff" stroke={C.ink} strokeWidth={4} />
          </G2>
        )}
      </>
    );
  };
  {
    const tk = w('c5a', 'turkey');
    const mm = w('c5a', 'mom');
    const th = w('c5a', 'throat');
    const tr = w('c5a', 'three');
    q(tk, 'ding', 0.5);
    q(mm, 'heart', 0.4);
    q(th, 'pop', 0.4);
    q(tr, 'cash', 0.6);
    const sl = w('c5b', 'silent');
    const fk = w('c5b', 'fork');
    const gf = w('c5b', 'gift');
    q(sl, 'cricket', 0.6);
    q(fk, 'clank', 0.7);
    q(gf, 'sting', 0.8);
    scene(A('c5a'), () =>
      f < A('c5b') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Table mood={f >= tr ? 'ask' : 'calm'} />
            <Dave f={f} x={300} y={960} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.7}, {at: th, pose: 'talk', expr: 'neutral'}, {at: tr, pose: 'point_r', expr: 'think'}]} />
            <G2 x={520} y={380} s={bump(th, 0.1)} o={lt(th, 0.35)}><Bubble text={f >= tr ? 'so, Danny... about\nmy three thousand dollars' : 'ahem.'} size={42} tail="left" /></G2>
            <Stamp x={1500} y={150} s={P(A('c5a')) * bump(tk, 0.1)} text="THANKSGIVING" color={C.navy} size={48} r={-3} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <rect x={0} y={0} width={1920} height={1080} fill="rgba(35,35,43,0.08)" />
            <Table mood={f >= gf ? 'gift' : 'ask'} forkAt={fk} />
            <Dave f={f} x={300} y={960} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.7}, {at: gf, pose: 'shock', expr: 'shock'}]} />
            <G2 x={1180} y={330} s={bump(gf, 0.14)} o={lt(gf, 0.3)}><Bubble text={f >= gf ? 'wait... I thought\nthat was a GIFT?' : '...'} size={46} tail="down" /></G2>
            <G2 x={420} y={300} o={f >= sl && f < gf ? 1 : 0}><Text size={50} color={GRAY}>(silence)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const mm = w('c5c', 'mom');
    const gm = w('c5c', 'grandma');
    const rl = w('c5c', 'roll');
    const pn = w('c5c', 'punch');
    const nk = w('c5c', 'napkin');
    q(mm, 'buzz', 0.5);
    q(gm, 'pop', 0.4);
    q(rl, 'crinkle', 0.5);
    q(pn, 'boing', 0.4);
    q(nk, 'whoosh', 0.6);
    q(nk + 16, 'poof', 0.5);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Table mood="chaos" roll={f >= rl ? ease(f, rl, rl + 20) : 0} napAt={nk} />
          <Dave f={f} x={300} y={960} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.7}, {at: nk + 14, pose: 'facepalm', expr: 'tired'}]} />
          <G2 x={1600} y={330} s={P(A('c5c')) * bump(mm, 0.1)}><Bubble text={'"Dave! not at\nthe table!"'} size={42} tail="down" /></G2>
          <G2 x={720} y={300} s={bump(rl, 0.1)} o={lt(gm, 0.3)}><Text size={38} color={GRAY}>{f >= rl ? '*very slowly eats a roll*' : '...'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fb = w('c5d', 'financebuzz');
    const ei = w('c5d', 'eight');
    const sv = w('c5d', 'seventeen');
    q(fb, 'paper', 0.5);
    q(ei, 'ding', 0.5);
    q(sv, 'stamp', 0.7);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c5d'))}><Text size={46}>lenders who think they will never be repaid:</Text></G2>
          <Box x={560} y={540} w={620} h={340} s={P(A('c5d')) * bump(ei, 0.08)}>
            <Text y={-110} size={36} color={GRAY}>going in</Text>
            <Text y={20} size={140} color={C.blue}>{f >= ei ? '8%' : '?'}</Text>
          </Box>
          <path d="M 920 540 L 1080 540 M 1050 510 L 1085 540 L 1050 570" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={lt(sv, 0.3)} />
          <Box x={1400} y={540} w={620} h={340} s={P(A('c5d')) * bump(sv, 0.12)} o={lt(sv, 0.45)} fill={f >= sv ? '#FFE3EA' : '#fff'}>
            <Text y={-110} size={36} color={GRAY}>later</Text>
            <Text y={20} size={140} color={C.red}>{f >= sv ? '17%' : '?'}</Text>
          </Box>
          <G2 x={960} y={880} o={lt(sv, 0.35)}><Text size={40} color={C.red}>more than double</Text></G2>
          <SourceTag f={f} at={fb} text="FinanceBuzz family lending survey, 1,000 US adults, Dec 2024" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gn = w('c5e', 'gone');
    const tx = w('c5e', 'texting');
    const sr = w('c5e', 'searches');
    const ir = w('c5e', 'i', 1);
    const ws = w('c5e', 'worse');
    q(gn, 'poof', 0.5);
    q(tx, 'buzz', 0.4);
    q(sr, 'key', 0.5);
    q(sr + 8, 'key2', 0.5);
    q(ir, 'paper', 0.5);
    q(ws, 'sting', 0.7);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={420} y={940} s={1.15} keys={[{at: 0, pose: 'pockets', expr: 'sad', look: 0.6}, {at: sr, pose: 'typing', expr: 'worried'}]} pockets={f < sr ? 1 : 0} />
          <G2 x={420} y={420} o={lt(gn, 0.35)}><Text size={40} color={C.red}>{f >= tx ? 'brother: not texting' : 'money: gone'}</Text></G2>
          <G2 x={1200} y={540} s={P(A('c5e'))}>
            <rect x={-480} y={-300} width={960} height={600} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <rect x={-420} y={-220} width={840} height={90} rx={45} fill="#F1F3F5" stroke={C.ink} strokeWidth={4} />
            <Text x={-380} y={-174} size={34} anchor="start" color={C.ink}>{f >= sr ? 'how do I prove it was a loan?'.slice(0, Math.max(0, Math.floor((f - sr) * 1.2))) : 'search...'}</Text>
            <rect x={-420} y={-80} width={840} height={150} rx={16} fill={f >= ir ? '#E8F0FB' : '#F7F7F7'} />
            <Text x={-390} y={-30} size={34} anchor="start" color={C.navy}>{f >= ir ? 'IRS.gov - Bad debt deduction' : ''}</Text>
            <Text x={-390} y={25} size={28} anchor="start" color={GRAY}>{f >= ir ? 'loan... or gift?' : ''}</Text>
            <Stamp x={180} y={180} s={f >= ws ? pop(f, ws) : 0} text="UH-OH" color={C.red} size={64} r={-6} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 The Gift Trap ============
  {
    const ls = w('c6a', 'loss');
    const ct = w('c6b', 'catch');
    const gf = w('c6b', 'gift');
    const nt = w('c6b', 'note');
    const rl = w('c6c', 'relative');
    const gf2 = w('c6c', 'gift');
    const pz = w('c6c', 'pizza');
    q(w('c6a', 'i'), 'paper', 0.5);
    q(ls, 'ding', 0.5);
    q(ct, 'buzz', 0.5);
    q(gf, 'stamp', 0.6);
    q(nt, 'scribble', 0.5);
    q(rl, 'pop', 0.4);
    q(gf2, 'stamp', 0.6);
    q(pz, 'trombone', 0.6);
    const lines = ['Totally worthless loan = may count as a loss', 'Must show: you meant a LOAN, not a gift', 'Proof: written note, repayment schedule, interest', 'Lent to a relative who may not repay? GIFT'];
    const hl = f >= rl ? 3 : f >= nt ? 2 : f >= ct ? 1 : f >= ls ? 0 : -1;
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <IrsPage x={820} y={500} s={1.05 * P(A('c6a'))} lines={lines} hl={hl} />
          <Dave f={f} x={1600} y={960} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: gf2, pose: 'shock', expr: 'worried'}, {at: pz, pose: 'facepalm', expr: 'tired'}]} />
          <G2 x={820} y={950} s={bump(pz, 0.12)} o={lt(pz, 0.3)}>
            <Text x={-120} y={0} size={46} anchor="end">{"Dave's proof:"}</Text>
            <PizzaSlice x={-40} y={0} s={0.8} />
            <ellipse cx={-40} cy={0} rx={90} ry={70} fill="none" stroke={C.red} strokeWidth={8} opacity={lt(pz, 0)} />
          </G2>
          <SourceTag f={f} at={A('c6a') + 20} text="IRS Tax Topic 453, Bad debt deduction (irs.gov)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gd = w('c6d', 'good');
    const nn = w('c6d', 'nineteen');
    const pw = w('c6d', 'paperwork');
    q(gd, 'chime', 0.5);
    q(nn, 'cash', 0.6);
    q(pw, 'ding', 0.4);
    const pp = w('c6e', 'paper');
    const pr = w('c6e', 'present');
    const bw = w('c6e', 'bow');
    const lw = w('c6e', 'lowest');
    q(pp, 'paper', 0.4);
    q(pr, 'pop', 0.5);
    q(bw, 'poof', 0.5);
    q(lw, 'thud', 0.7);
    scene(A('c6d'), () =>
      f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={760} y={540} s={P(A('c6d')) * bump(nn, 0.08)} org="IRS" sub="2026 ANNUAL GIFT EXCLUSION" title={['you can give, per person,', 'per year:']} stat={f >= nn ? '$19,000' : '$?'} statLabel={f >= pw ? 'usually no gift tax form' : 'with no gift tax'} color={C.green} />
            <Dave f={f} x={1500} y={960} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'tired', look: -0.6}, {at: gd, pose: 'thumbs', expr: 'happy'}]} />
            <G2 x={1500} y={460} o={lt(gd, 0.35)}><Bubble text={"$3,000 < $19,000\nno gift tax. phew."} size={38} tail="down" /></G2>
            <SourceTag f={f} at={nn} text="IRS Rev. Proc. 2025-32: 2026 annual exclusion $19,000" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={130} s={P(A('c6e'))}><Text size={48}>{f >= pr ? 'on paper: a present' : 'on paper, Dave made...'}</Text></G2>
            <GiftBox57 x={760} y={560} s={1.3 * P(A('c6e')) * bump(pr, 0.1)} label="$3,000" bow={f < bw} />
            <Dave f={f} x={1460} y={960} s={1.15} keys={[{at: 0, pose: 'pockets', expr: 'sad', look: -0.6}, {at: lw, pose: 'facepalm', expr: 'tired'}]} pockets={1} />
            <Stamp x={1460} y={420} s={f >= lw ? pop(f, lw) : 0} text="LOWEST POINT" color={C.navy} size={56} r={-6} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const co = w('c6f', 'couch');
    const te = w('c6f', 'teeth');
    const br = w('c6f', 'boring');
    const dt = w('c6f', 'date');
    q(co, 'pop', 0.4);
    q(te, 'ding', 0.4);
    q(br, 'cricket', 0.4);
    q(dt, 'stamp', 0.8);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={420} y={820} s={P(A('c6f'))}>
            <rect x={-300} y={-80} width={600} height={140} rx={30} fill={C.blue} stroke={C.ink} strokeWidth={6} />
            <rect x={-320} y={-140} width={80} height={200} rx={30} fill={C.blue} stroke={C.ink} strokeWidth={6} />
            <rect x={240} y={-140} width={80} height={200} rx={30} fill={C.blue} stroke={C.ink} strokeWidth={6} />
          </G2>
          <Dave f={f} x={420} y={700} s={0.9} keys={[{at: 0, pose: 'relax', expr: 'tired'}, {at: dt, pose: 'point_up', expr: 'shock'}]} />
          {LINE.map((b, i) => (
            <G2 key={i} x={940 + i * 260} y={460} s={0.7 * P(A('c6f') + i * 3) * bump(br + i * 4, 0.1)}>
              <BillTicket n={i + 1} label={b.l} color={b.c} open={0.4} hl={f >= br ? 1 : 0} />
              <G2 y={250} o={lt(br, 0)}>
                <rect x={-120} y={-35} width={240} height={70} rx={14} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
                <Text y={2} size={34}>{`DUE: ${['1st', '5th', '12th', '20th'][i]}`}</Text>
              </G2>
            </G2>
          ))}
          <Calendar x={1330} y={880} s={f >= dt ? 0.9 * pop(f, dt) : 0} top="A DATE" year="!" flip={0} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 Dave Becomes A Bill ============
  {
    const ed = w('c7a', 'education');
    const th = w('c7a', 'three');
    const tb = w('c7a', 'table');
    q(ed, 'pop', 0.5);
    q(th, 'ding', 0.5);
    q(tb, 'buzz', 0.4);
    const cl = w('c7b', 'calls');
    const md = w('c7b', 'mad');
    const wd = w('c7b', 'weird');
    const dt = w('c7b', 'date');
    q(cl, 'ding', 0.5);
    q(md, 'pop', 0.4);
    q(wd, 'pop', 0.4);
    q(dt, 'chime', 0.6);
    scene(A('c7a'), () =>
      f < A('c7b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={120} s={P(A('c7a'))}><Text size={52}>{"Dave's comeback"}</Text></G2>
            <G2 x={760} y={185} o={lt(ed, 0.4)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {['the call', 'one page', 'autopay'].map((l, i) => (
              <Box key={l} x={330 + i * 430} y={560} w={380} h={300} s={P(A('c7a') + i * 4) * bump(th + i * 4, 0.1)} o={lt(th, 0.45)}>
                <Text y={-60} size={90} color={C.green}>{String(i + 1)}</Text>
                <Text y={60} size={44}>{l}</Text>
              </Box>
            ))}
            <Dave f={f} x={1640} y={960} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'grin', look: -0.6}]} />
            <G2 x={760} y={900} o={lt(tb, 0.35)}><Text size={40} color={C.red}>none of them at the dinner table</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={360} y={960} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.6}]} />
            <Phone x={620} y={560} s={0.8 * P(A('c7b'))} title="CALLING" value="DANNY" color={C.green} />
            <Danny f={f} x={1600} y={960} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'worried', look: -0.6}, {at: dt, pose: 'thumbs', expr: 'happy'}]} />
            <Phone x={1340} y={560} s={0.8 * P(A('c7b'))} title="CALLING" value="DAVE" color={C.blue} />
            <G2 x={980} y={220} s={bump(md, 0.08)} o={lt(md, 0.35)}>
              <Bubble text={f >= dt ? '"I\'m not mad. I made it weird.\nlet\'s just put a DATE on it."' : f >= wd ? '"I\'m not mad. I made it weird."' : '"I\'m not mad."'} size={40} tail="left" />
            </G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pg = w('c7c', 'page');
    const tr = w('c7c', 'three');
    const tw = w('c7c', 'twenty');
    const pd = w('c7c', 'payday');
    const ty = w('c7c', 'years');
    const sg = w('c7c', 'sign');
    const lw = w('c7c', 'lawyer');
    q(pg, 'paper', 0.6);
    [tr, tw, pd, ty].forEach((x) => q(x, 'scribble', 0.4));
    q(sg, 'draw', 0.6);
    q(lw, 'ding', 0.5);
    const shown = f >= ty ? 4 : f >= pd ? 3 : f >= tw ? 2 : f >= tr ? 1 : 0;
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <OnePage x={760} y={560} s={1.1 * P(A('c7c')) * bump(pg, 0.06)} lines={['Loan: $3,000', '$125 a month', 'day after payday', 'for 24 months']} shown={shown} signA={f >= sg ? ease(f, sg, sg + 14) : 0} signB={f >= sg ? ease(f, sg + 10, sg + 24) : 0} />
          <Dave f={f} x={1420} y={960} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.6}]} />
          <G2 x={1500} y={420} o={lt(lw, 0.35)}><Text size={44} color={C.green}>10 minutes. no lawyer.</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wd = w('c7d', 'weird');
    const tw = w('c7d', 'twenty');
    const pl = w('c7d', 'plan');
    q(wd, 'pop', 0.4);
    q(tw, 'stamp', 0.6);
    q(pl, 'ding', 0.5);
    const au = w('c7e', 'automatic');
    const bk = w('c7e', 'back');
    const nb = w('c7e', 'number');
    q(au, 'click', 0.6);
    q(bk, 'whoosh_s', 0.4);
    q(nb, 'ding', 0.6);
    scene(A('c7d'), () =>
      f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={130} s={P(A('c7d')) * bump(wd)}><Text size={48}>is a payment plan weird?</Text></G2>
            <Box x={760} y={560} w={820} h={380} s={P(A('c7d')) * bump(tw, 0.1)} fill={f >= tw ? C.greenLight : '#fff'}>
              <Text y={-120} size={34} color={GRAY}>lenders who set up a formal</Text>
              <Text y={-75} size={34} color={GRAY}>payment plan to get paid back</Text>
              <Text y={60} size={150} color={C.green}>{f >= tw ? '26%' : '?'}</Text>
            </Box>
            <Dave f={f} x={1560} y={960} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'think', look: -0.6}, {at: pl, pose: 'thumbs', expr: 'happy'}]} />
            <SourceTag f={f} at={tw} text="FinanceBuzz family lending survey, Dec 2024" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110} s={P(A('c7e')) * bump(au)}><Text size={46}>{f >= au ? 'auto-transfer: ON' : 'step three'}</Text></G2>
            {[LINE[0], LINE[1], {l: 'DAVE', c: C.green, cons: ''}, LINE[2], LINE[3]].map((b, i) => (
              <G2 key={i} x={240 + i * 330} y={540} s={(i === 2 ? 0.95 * bump(nb, 0.16) : 0.8) * P(A('c7e') + i * 3)} o={i === 2 ? 1 : 0.6}>
                <BillTicket n={i + 1} label={b.l} color={b.c} teeth={i !== 2} open={0.3} hl={i === 2 && f >= nb ? 1 : 0} />
              </G2>
            ))}
            <Dave f={f} x={900} y={1000} s={0.65} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={960} y={880} o={lt(nb, 0.35)}><Text size={44} color={C.green}>Dave has a number now: #3</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const dc = w('c7f', 'december');
    const ld = w('c7f', 'lands');
    const jn = w('c7f', 'january');
    const bl = w('c7f', 'bill');
    q(dc, 'flip', 0.5);
    q(ld, 'coin', 0.7);
    q(jn, 'flip', 0.5);
    q(jn + 8, 'coin', 0.7);
    q(bl, 'stamp', 0.8);
    const cw = w('c7g', 'coworker');
    const fv = w('c7g', 'five');
    const sn = w('c7g', 'sentence');
    q(cw, 'pop', 0.5);
    q(fv, 'cash', 0.5);
    q(sn, 'ding', 0.6);
    scene(A('c7f'), () =>
      f < A('c7g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={420} y={420} s={P(A('c7f')) * bump(f >= jn ? jn : dc, 0.1)} top="MONTH" year={f >= jn ? 'JAN' : 'DEC'} flip={0} />
            <Phone x={960} y={540} s={1.1 * P(A('c7f')) * bump(ld, 0.08)} title="DAVE'S BANK" value={f >= jn + 8 ? '+$250' : f >= ld ? '+$125' : '$0'} color={C.green} />
            {f >= ld && <Coin x={960} y={Math.min(300, 100 + (f - ld) * 12)} s={0.8} />}
            <Dave f={f} x={1520} y={960} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: ld, pose: 'celebrate', expr: 'grin'}]} />
            <Stamp x={1520} y={380} s={f >= bl ? pop(f, bl) : 0} text="DAVE = A BILL" color={C.green} size={56} r={-6} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Coworker f={f} x={1400} y={940} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.6}]} />
            <G2 x={1400} y={430} s={bump(fv, 0.12)} o={lt(cw, 0.35)}><Bubble text={f >= fv ? '"can I borrow $500?"' : '"hey Dave..."'} size={42} tail="down" /></G2>
            <Dave f={f} x={520} y={940} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: sn, pose: 'hips', expr: 'grin'}]} />
            <G2 x={520} y={460} s={bump(sn, 0.12)} o={lt(sn, 0.3)}><Text size={46} color={C.navy}>ready with one sentence</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 The One Sentence ============
  {
    const qn = w('c8a', 'question');
    const gf = w('c8a', 'gift');
    const ln = w('c8a', 'loan');
    q(qn, 'pop', 0.5);
    q(gf, 'ding', 0.6);
    q(ln, 'stamp', 0.8);
    const dt = w('c8b', 'date');
    const af = w('c8b', 'afford');
    const nn = w('c8b', 'no');
    const sm = w('c8b', 'smaller');
    q(dt, 'ding', 0.5);
    q(af, 'buzz', 0.4);
    q(nn, 'stamp', 0.6);
    q(sm, 'chime', 0.5);
    scene(A('c8a'), () =>
      f < A('c8b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={240} s={P(A('c8a')) * bump(ln, 0.1)}>
              <Bubble text={f >= ln ? '"Is this a GIFT, or a LOAN?"' : f >= gf ? '"Is this a GIFT..."' : '"..."'} size={64} tail="down" bg={C.yellow} />
            </G2>
            <GiftBox57 x={520} y={680} s={0.9 * P(A('c8a')) * bump(gf, 0.12)} label="GIFT" />
            <OnePage x={1400} y={700} s={0.55 * P(A('c8a')) * bump(ln, 0.12)} lines={['$ ...', 'date: ...']} />
            <Dave f={f} x={960} y={980} s={0.9} keys={[{at: 0, pose: 'present', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={170} s={P(A('c8b'))}><Text size={46} color={C.navy}>LOAN = a date + a page</Text></G2>
            <OnePage x={500} y={600} s={0.7 * P(A('c8b')) * bump(dt, 0.1)} lines={['$ amount', 'date', 'both sign']} signA={1} signB={1} />
            <G2 x={1400} y={170} o={lt(af, 0.35)}><Text size={44} color={C.red}>{"can't afford to lose it?"}</Text></G2>
            <Stamp x={1250} y={480} s={f >= nn ? pop(f, nn) : 0} text="NO" color={C.red} size={90} r={-6} />
            <GiftBox57 x={1560} y={640} s={f >= sm ? 0.7 * pop(f, sm) : 0} label="small" />
            <G2 x={1400} y={900} o={lt(sm, 0.3)}><Text size={44} color={C.green}>...or a smaller gift</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const bk = w('c8c', 'bankrates');
    const ld = w('c8c', 'lend');
    const gf = w('c8c', 'gift');
    q(bk, 'paper', 0.5);
    q(ld, 'ding', 0.5);
    q(gf, 'chime', 0.5);
    const ff = w('c8d', 'fifty');
    const g2 = w('c8d', 'gift');
    const tg = w('c8d', 'thanksgiving');
    q(ff, 'cash', 0.6);
    q(g2, 'heart', 0.5);
    q(tg, 'ding', 0.5);
    scene(A('c8c'), () =>
      f < A('c8d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={760} y={540} s={P(A('c8c')) * bump(ld, 0.06)} org="BANKRATE" sub="SENIOR ANALYST TED ROSSMAN, 2024" title={["don't lend more than", 'you can afford to lose']} stat={f >= gf ? 'or GIFT it' : '...'} statLabel="consider a gift instead of a loan" color={C.navy} />
            <Dave f={f} x={1560} y={960} s={1.15} keys={[{at: 0, pose: 'point_l', expr: 'happy', look: -0.6}]} />
            <SourceTag f={f} at={bk} text="Bankrate press release, Oct 7, 2024 (Ted Rossman quote)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={520} y={940} s={1.15} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}]} />
            <GiftBox57 x={960} y={620} s={0.9 * P(A('c8d')) * bump(ff, 0.12)} label="$50" />
            <Coworker f={f} x={1400} y={940} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: g2, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={960} y={220} o={lt(g2, 0.35)}><Text size={46} color={C.green}>{f >= tg ? 'no date. no line. no weird Thanksgiving.' : 'a gift. no strings.'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const fv = w('c8e', 'five');
    const ap = w('c8e', 'april');
    const mn = w('c8e', 'money');
    const tg = w('c8e', 'thanksgiving');
    q(fv, 'pop', 0.5);
    q(ap, 'flip', 0.5);
    q(mn, 'cash', 0.6);
    q(tg, 'chime', 0.6);
    const ei = w('c8f', 'eight');
    const dn = w('c8f', 'dinner');
    const gv = w('c8f', 'gravy');
    const fs = w('c8f', 'first');
    q(ei, 'coin', 0.6);
    q(dn, 'ding', 0.4);
    q(gv, 'pop', 0.5);
    q(fs, 'heart', 0.6);
    scene(A('c8e'), () =>
      f < A('c8f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={260} w={1300} h={200} s={P(A('c8e')) * bump(fv, 0.08)} fill={C.yellow}>
              <Text y={0} size={80}>GIFT, OR LOAN?</Text>
            </Box>
            <Calendar x={420} y={680} s={0.9 * P(A('c8e')) * bump(ap, 0.1)} top="ASK IN" year="APRIL" flip={0} />
            <G2 x={960} y={700} s={bump(mn, 0.12)} o={lt(mn, 0.35)}><MoneyStack n={3} label="$3,000 kept" /></G2>
            <G2 x={1500} y={720} s={0.55 * bump(tg, 0.1)} o={lt(tg, 0.35)}><DinnerTable /></G2>
            <G2 x={1500} y={900} o={lt(tg, 0.35)}><Text size={40} color={C.green}>+ Thanksgiving kept</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Grandma f={f} x={720} y={760} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.4}]} />
            <Danny f={f} x={1180} y={760} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: gv, pose: 'point_l', expr: 'grin'}]} />
            <Mom f={f} x={1600} y={760} s={1.05} keys={[{at: 0, pose: 'celebrate', expr: 'happy'}]} />
            <DinnerTable x={1060} y={820} s={0.95} />
            <Dave f={f} x={300} y={960} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.7}, {at: fs, pose: 'thumbs', expr: 'grin'}]} />
            <G2 x={960} y={160} s={P(A('c8f')) * bump(ei, 0.08)}>
              <rect x={-420} y={-40} width={840} height={80} rx={20} fill="#fff" stroke={C.ink} strokeWidth={5} />
              <rect x={-416} y={-36} width={832 * (8 / 24)} height={72} rx={18} fill={C.green} />
              <Text y={2} size={36}>payments: 8 of 24</Text>
            </G2>
            <G2 x={700} y={420} o={lt(gv, 0.3)}><Bubble text={f >= fs ? '"gravy? you first."' : '"pass the gravy?"'} size={40} tail="right" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ WHAT DAVE LEARNED ============
  const recap = ['Family pays the bills with teeth first', 'No paper? Even the IRS calls it a gift', 'Before money moves: gift, or loan?'];
  {
    const r = [w('r1', 'one'), w('r2', 'two'), w('r3', 'three')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('r1'))}><Text size={80}>WHAT DAVE LEARNED</Text></G2>
          {recap.map((b, i) => <Row key={i} x={140} y={320 + i * 190} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1260} />)}
          <Dave f={f} x={1680} y={960} s={1.05} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('r4', 'cousin');
    const mn = w('r4', 'money');
    const sg = w('r4', 'signature');
    const pb = w('r4', 'problem');
    const sb = w('r5', 'subscribe');
    const fr = w('r5', 'free');
    const bk = w('r5', 'back');
    q(cs, 'ding', 0.6);
    q(mn, 'buzz', 0.4);
    q(sg, 'scribble', 0.6);
    q(pb, 'sting', 0.7);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'chime', 0.5);
    q(bk, 'coin', 0.5);
    scene(A('r4'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={120} s={P(A('r4'))}><Text size={50}>{"next: Dave's next problem"}</Text></G2>
            <Dave f={f} x={420} y={940} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'neutral', look: 0.6}, {at: pb, pose: 'shock', expr: 'shock'}]} />
            <Cousin f={f} x={1500} y={940} s={1.1} keys={[{at: 0, pose: 'wave', expr: 'grin', look: -0.6}]} />
            <G2 x={1500} y={430} s={bump(sg, 0.1)} o={lt(cs, 0.35)}><Bubble text={f >= sg ? '"just sign here, cuz!"' : '"hey, cousin!"'} size={42} tail="down" /></G2>
            <G2 x={960} y={640} s={P(A('r4')) * bump(sg, 0.08)} r={-4}>
              <rect x={-200} y={-150} width={400} height={300} rx={12} fill="#FFFDF5" stroke={C.ink} strokeWidth={6} />
              <Text y={-90} size={36}>LOAN PAPERS</Text>
              <line x1={-150} y1={70} x2={150} y2={70} stroke={C.ink} strokeWidth={3} />
              <Text y={110} size={26} color={GRAY}>sign here: Dave</Text>
              <Text y={-10} size={80} color={C.red}>{f >= pb ? '!' : '?'}</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={420} s={1.4 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1420} y={420} s={1.1 * pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Danny f={f} x={680} y={900} s={1.15} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
            <G2 x={1250} y={820} s={pop(f, fr)}>
              <rect x={-150} y={-60} width={300} height={120} rx={20} fill={C.greenLight} stroke={C.ink} strokeWidth={6} />
              <Text y={4} size={56}>FREE</Text>
            </G2>
            <G2 x={1250} y={960} o={lt(bk, 0.35)}><Text size={38} color={C.blue}>never pay it back</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ DAMAGE METER HUD ============
  const sentAt = w('o3', 'sent');
  const tireAt = w('c2d', 'four');
  const giftAt = w('c5b', 'gift');
  const savedAt = w('c7f', 'lands');
  q(A('o4') + 4, 'pop', 0.4);
  q(savedAt + 6, 'chime', 0.6);
  const chapHide = (t.chapters ?? []).some((c) => {
    const s = Math.round(c.start * 30);
    return f >= s - 4 && f < s + CHAPTER_FRAMES + 4;
  });
  const hudOn = f >= A('o4') && f < A('r1') && !chapHide && !(f >= SUB - 4 && f < SUB + SUB_FRAMES + 4);
  const saved = f >= savedAt;
  const dmgN = f >= tireAt ? Math.round(lerp(3000, 3400, ease(f, tireAt, tireAt + 15))) : f >= sentAt ? 3000 : 0;
  const hudVal = saved ? '+$125/mo' : `$${dmgN.toLocaleString('en-US')}`;
  const hudSub = saved ? 'back in 24 months' : f >= giftAt ? '+ 1 ruined Thanksgiving' : f >= tireAt ? 'incl. $400 on his card' : 'his whole emergency fund';
  const lastChange = saved ? savedAt : f >= giftAt ? giftAt : f >= tireAt ? tireAt : A('o4');

  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {hudOn && (
        <Svg>
          <DamageMeter57 x={1700} y={115} s={0.78 * bump(lastChange, 0.12)} value={hudVal} sub={hudSub} saved={saved} flash={f - lastChange < 15 && !saved ? 1 : 0} />
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
