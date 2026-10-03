import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Car, Desk, MoneyStack, Pencil, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Envelope, Mailbox, Row, Sign, SubButton, Bell} from '../props2';
import {SourceCard} from '../props3';
import {House, Pizza} from '../props4';
import {Contract} from '../props5';
import {Dealership, TowTruck} from '../props23';
import {Door, Gavel, Handset, Laptop} from '../props26';
import {GymBuilding} from '../props28';
import {Handcuffs} from '../props30';
import {People} from '../props35';
import {Notif} from '../props38';
import {Ghost} from '../props39';
import {Paycheck} from '../props8';
import {CallPhone, CreditReport, DamageMeter, GuessCard, Letter, NoticePage, Pill, Shadow, Strap, Wallet} from '../props58';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Seller: React.FC<SP> = (p) => <Stick acc={['tie']} seed={60} {...p} />;
const Officer: React.FC<SP> = (p) => <Stick acc={['ponytail', 'glasses']} seed={44} {...p} />;
const Collector: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={66} {...p} />;

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

export const Ep58: React.FC = () => {
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
  // o1 scene is a function of a local frame so it can be frozen and rewound.
  const o1Scene = (ff: number) => {
    const dc = w('o1', 'collector');
    const nv = w('o1', 'never');
    return (
      <AbsoluteFill>
        <Street f={ff} />
        <Cam f={ff} keys={[[0, 1.15, 960, 560], [40, 1.0, 960, 540]]}>
          <Svg>
            <Dave f={ff} x={430} y={930} s={1.2} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
            <CallPhone f={ff} x={820} y={520} s={0.95 * bump(dc, 0.08)} who={ff >= dc ? 'DEBT COLLECTOR' : 'UNKNOWN'} sub="about: a car loan" />
            <G2 x={1500 + ff * 2} y={860} s={1.6}>
              <Car />
            </G2>
            <Bob f={ff} x={1530 + ff * 2} y={760} s={0.55} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.6}]} />
            <Pill x={1460} y={460} s={bump(nv, 0.15)} text="NEVER DROVE IT" color={ff >= nv ? C.red : C.ink} size={44} />
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  {
    q(2, 'tick', 0.4);
    q(w('o1', 'collector'), 'buzz', 0.6);
    q(w('o1', 'never'), 'stamp', 0.6);
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
          <G2 x={430} y={240} s={P(FR) * bump(w('o2', 'dave'), 0.12)}>
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
          <G2 x={960} y={520} s={P(RW) * 1.2}><Stamp text="6 MONTHS EARLIER" color={C.navy} size={80} r={-3} /></G2>
          <G2 x={960} y={700} o={0.8}><Text size={90} color="#fff" stroke={C.ink} sw={10}>{'<< <<'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
  }
  {
    const bd = w('o3', 'bad');
    const sg = w('o3', 'sign');
    q(A('o3') + 4, 'pop', 0.5);
    q(bd, 'buzz', 0.5);
    q(sg, 'scribble', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dealership x={960} y={560} s={0.9} f={f} name="BEST USED CARS" />
          <Bob f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.6}, {at: sg, pose: 'point_r', expr: 'grin', look: 0.6}]} />
          <Dave f={f} x={700} y={930} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.5}, {at: sg, pose: 'hold', expr: 'happy', look: 0.4}]} />
          <Pill x={420} y={420} s={bump(bd, 0.15)} text="BOB'S CREDIT: BAD" color={f >= bd ? C.red : C.ink} />
          <Contract x={1450} y={640} s={0.8 * P(A('o3'))} lines={['CAR LOAN', 'BORROWER: BOB', 'CO-SIGNER: ______']} signed={ease(f, sg, sg + 20)} />
          <G2 x={960} y={260} s={P(A('o3'))}><Bubble text="just sign here!" size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lo = w('o4', 'loan');
    const ei = w('o4', 'eighteen');
    const ev = w('o4', 'every');
    const land = ei + 20;
    q(lo, 'paper', 0.5);
    q(ei, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    q(ev, 'scribble', 0.5);
    scene(A('o4'), () => {
      const n = Math.round(lerp(0, 18000, ease(f, ei, land)));
      const sk = shake(f, land, 16, 14);
      const z = 1 + 0.12 * ease(f, land, land + 10);
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, z, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('o4'))}><Text size={56} color={GRAY}>BOB'S CAR LOAN</Text></G2>
              <Box x={960 + sk.x} y={480 + sk.y} w={1100} h={340} s={P(A('o4'))} fill={f >= land ? C.yellow : '#fff'}>
                <Text y={20} size={200} color={f >= land ? C.red : C.ink}>{money(n)}</Text>
              </Box>
              <Dave f={f} x={360} y={960} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}, {at: land, pose: 'shock', expr: 'shock', look: 0.6}]} />
              <G2 x={1100} y={800} s={P(A('o4')) * bump(ev, 0.1)}>
                <Text size={44} color={C.navy}>co-signer: DAVE</Text>
                <Pencil x={260} y={-10} s={0.7} r={30} />
              </G2>
              <G2 x={1100} y={880} o={lt(ev, 0.35)}><Text size={40} color={C.red}>responsible for every cent</Text></G2>
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const fv = w('o5', 'favor');
    const db = w('o5', 'debt');
    const wn = w('o5', 'winning');
    q(fv, 'pop', 0.5);
    q(db, 'thud', 0.6);
    q(wn, 'sting', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={820} y={170} s={P(A('o5'))}><Text size={60}>one favor → Dave's debt?</Text></G2>
          <Dave f={f} x={480} y={920} s={1.15} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}]} />
          <G2 x={900} y={540} s={P(A('o5')) * bump(fv, 0.1)}><Bubble text="it's only a signature..." size={38} tail="down" /></G2>
          <Pill x={900} y={700} s={bump(db, 0.15)} text="DEBT: DAVE'S" color={f >= db ? C.red : GRAY} size={44} />
          <Shadow f={f} x={lerp(2150, 1600, ease(f, A('o5'), A('o5') + 20))} y={880} s={1.25} />
          <G2 x={1600} y={300} o={lt(wn, 0.4)}><Text size={44} color={C.red}>who's winning?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pr = w('o6', 'printed');
    const on = w('o6', 'one');
    const st = w('o6', 'stay');
    q(pr, 'paper', 0.6);
    q(on, 'ding', 0.5);
    q(st, 'pop', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <NoticePage x={760} y={560} s={1.0 * P(A('o6')) * bump(pr, 0.06)} lines={['. . . . . . . .', '. . . . . . . .', '. . . . . . . .', '? ? ? ? ? ? ?', '? ? ? ? ? ? ?']} hl={f >= on ? 1 : 0} />
          <G2 x={760} y={480} s={bump(on, 0.2)}><Stamp text="1 SENTENCE" color={C.red} size={70} r={-8} /></G2>
          <Dave f={f} x={1420} y={930} s={1.1} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          <G2 x={1420} y={400} s={bump(st, 0.15)} o={lt(st, 0.45)}><Pill text="STAY FOR IT" color={C.yellow} fg={C.ink} size={48} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: Just a signature? ============
  {
    const lot = w('c1a', 'lot');
    const sl = w('c1a', 'slides');
    const bs1 = w('c1a', 'signs');
    const ds = w('c1a', 'signs', 1);
    q(lot, 'pop', 0.5);
    q(sl, 'paper', 0.6);
    q(bs1, 'scribble', 0.5);
    q(ds, 'scribble', 0.6);
    const gf = w('c1b', 'great');
    const rf = w('c1b', 'reference');
    q(gf, 'ding', 0.5);
    q(rf, 'pop2', 0.5);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={880} w={760} />
          <Contract x={960} y={560} s={0.62 * P(A('c1a')) * bump(sl, 0.08)} lines={['BORROWER: BOB', 'CO-SIGNER: DAVE', 'AMOUNT: $18,000']} signed={ease(f, ds, ds + 24)} />
          <Seller f={f} x={1500} y={930} s={1.1} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.6}]} />
          <Bob f={f} x={330} y={930} s={1.1} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
          <Dave f={f} x={560} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: gf, pose: 'hips', expr: 'grin', look: 0.6}]} />
          <G2 x={560} y={330} s={P(A('c1a'))} o={lt(A('c1b'), 0.0001)}>
            <Bubble text={f >= rf ? "I'm just his reference!" : 'happy to help!'} size={38} tail="down" />
          </G2>
          <G2 x={1500} y={330} s={P(A('c1a'))} o={f < A('c1b') ? 1 : 0.0001}><Bubble text="sign right here" size={36} tail="down" /></G2>
          <G2 x={960} y={150} s={P(A('c1a'))}><Text size={48}>at the car lot</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const np = w('c1c', 'nope');
    const sb = w('c1c', 'second');
    const all = w('c1c', 'eighteen');
    q(np, 'buzz', 0.7);
    q(sb, 'stamp', 0.6);
    q(all, 'cash', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="WHAT DAVE THOUGHT" />
        <Svg>
          <Box x={560} y={500} w={620} h={300} s={P(A('c1c'))} fill={f >= np ? '#EEE' : '#fff'}>
            <Text y={-60} size={36} color={GRAY}>Dave's job:</Text>
            <Text y={20} size={64}>"REFERENCE"</Text>
            <Text y={90} size={30} color={GRAY}>just vouching for Bob</Text>
          </Box>
          <G2 x={560} y={500} s={0.5 * bump(np, 0.2)} o={lt(np, 0.0001)}><XMark /></G2>
          <Box x={1360} y={500} w={640} h={360} s={P(A('c1c')) * bump(sb, 0.08)} fill={f >= sb ? C.yellow : '#fff'}>
            <Text y={-110} size={36} color={GRAY}>reality:</Text>
            <Text y={-30} size={56} color={f >= sb ? C.red : C.ink}>BORROWER #2</Text>
            <Text y={60} size={44}>same loan · same debt</Text>
            <Text y={130} size={52} color={C.red}>{f >= all ? 'ALL $18,000' : 'ALL $?'}</Text>
          </Box>
          <Stamp x={560} y={780} s={P(A('c1c')) * bump(np, 0.2)} text={f >= np ? 'NOPE' : '?'} color={C.red} size={80} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pz = w('c1d', 'pizza');
    const ea = w('c1d', 'eats');
    const kn = w('c1d', 'knocks');
    q(pz, 'pop', 0.5);
    q(ea, 'crinkle', 0.5);
    q(kn, 'thud', 0.7);
    q(kn + 8, 'thud', 0.6);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c1d'))}><Text size={50}>one order, two names</Text></G2>
          <Pizza x={560} y={520} s={1.0 * P(A('c1d')) * bump(pz, 0.08)} eaten={Math.round(8 * ease(f, ea, ea + 40))} />
          <Pill x={560} y={780} text="ORDER: BOB + DAVE" color={C.navy} />
          <Bob f={f} x={270} y={930} s={1.0} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}, {at: ea, pose: 'celebrate', expr: 'grin', look: 0.6}]} />
          <Door x={1460} y={880} s={0.9} open={0} />
          <Text x={1460} y={420} size={34} color={GRAY}>DAVE'S DOOR</Text>
          <Stick f={f} x={1760} y={930} s={1.0} acc={['cap']} seed={88} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: kn, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          <G2 x={1700} y={540} s={bump(kn, 0.2)} o={lt(kn, 0.35)}><Bubble text="KNOCK KNOCK. you owe." size={30} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nm = w('c1e', 'name');
    const zr = w('c1e', 'zero');
    const cp = w('c1e', 'cup');
    q(nm, 'stamp', 0.6);
    q(zr, 'pop2', 0.5);
    q(cp, 'boing', 0.5);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={600} s={2.6 * P(A('c1e'))}><Car /></G2>
          <G2 x={760} y={240} s={bump(nm, 0.15)}><Pill text="TITLE: BOB" color={f >= nm ? C.blue : C.ink} size={48} /></G2>
          <Box x={1500} y={480} w={560} h={300} s={P(A('c1e')) * bump(zr, 0.1)} fill={f >= zr ? C.yellow : '#fff'}>
            <Text y={-60} size={34} color={GRAY}>Dave owns:</Text>
            <Text y={30} size={90} color={C.red}>0 wheels</Text>
          </Box>
          <G2 x={1500} y={720} o={lt(cp, 0.35)}><Text size={38}>(not even the cup holder)</Text></G2>
          <Dave f={f} x={1500} y={960} s={0.75} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hk = w('c1f', 'honking');
    const pd = w('c1f', 'proud');
    const fl = w('c1f', 'followed');
    q(hk, 'boing', 0.6);
    q(pd, 'ding', 0.4);
    q(fl, 'sting', 0.6);
    scene(A('c1f'), () => {
      const k = f - A('c1f');
      return (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={1300 + k * 5} y={860} s={1.6}><Car /></G2>
            <Bob f={f} x={1330 + k * 5} y={760} s={0.55} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.6}]} />
            <G2 x={1500 + k * 5} y={600} s={bump(hk, 0.3)} o={lt(hk, 0.35)}><Text size={60} color={C.red}>HONK!</Text></G2>
            <Dave f={f} x={720 - k * 1.2} y={930} s={1.1} walk flip keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}]} />
            <Ghost f={f} x={1000 - k * 1.2} y={680} s={1.0 * bump(fl, 0.2)} label="LOAN" />
            <G2 x={760} y={200} o={lt(fl, 0.4)}><Text size={50} color={C.red}>the loan followed him home</Text></G2>
          </Svg>
        </AbsoluteFill>
      );
    });
  }

  // ============ CH2: a ghost in his report ============
  {
    const dp = w('c2a', 'down');
    const hm = w('c2a', 'home');
    q(dp, 'cash', 0.5);
    q(hm, 'ding', 0.5);
    const fr = w('c2b', 'frowns');
    const fo = w('c2b', 'four');
    const nt = w('c2b', 'bobs');
    q(fr, 'buzz', 0.4);
    q(fo, 'pop', 0.5);
    q(nt, 'boing', 0.4);
    const tr = w('c2c', 'turns');
    const yr = w('c2c', 'yours');
    q(tr, 'whoosh_s', 0.4);
    q(yr, 'stamp', 0.7);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={880} w={700} />
          <G2 x={960} y={560} s={P(A('c2a'))}>
            <rect x={-230} y={-150} width={460} height={290} rx={20} fill={f >= tr ? '#fff' : '#DDEBF7'} stroke={C.ink} strokeWidth={6} />
            <Text y={-100} size={28} color={GRAY}>{f >= tr ? "DAVE'S CREDIT REPORT" : 'MORTGAGE CHECK'}</Text>
            <Text y={-30} size={36}>car loan</Text>
            <Text y={40} size={60} color={f >= fo ? C.red : C.ink}>$400/mo</Text>
            <Text y={105} size={30} color={f >= yr ? C.red : GRAY}>{f >= yr ? 'owner: DAVE' : 'owner: ?'}</Text>
          </G2>
          <Officer f={f} x={1450} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: fr, pose: 'think', expr: 'suspicious', look: -0.6}, {at: tr, pose: 'point_l', expr: 'neutral', look: -0.6}]} />
          <Dave f={f} x={420} y={930} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.6}, {at: nt, pose: 'shrug', expr: 'grin', look: 0.6}, {at: yr, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <G2 x={420} y={300} s={P(A('c2a')) * bump(hm, 0.1)}>
            <House s={0.45} sold={f >= hm ? 'MY FIRST HOME?' : undefined} />
          </G2>
          <G2 x={1450} y={330} s={bump(nt, 0.1)} o={lt(fr, 0.4)}><Bubble text={f >= tr ? "it's yours." : "whose $400 car payment?"} size={32} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ex = w('c2d', 'experian');
    const rp = w('c2d', 'report');
    const hs = w('c2d', 'himself');
    q(ex, 'paper', 0.5);
    q(rp, 'pop', 0.5);
    q(hs, 'stamp', 0.6);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <CreditReport x={700} y={530} s={0.95 * P(A('c2d'))} rows={["Dave's card: $0 owed", "Dave's phone: paid", 'CAR LOAN: $18,000', 'payment: $400/mo']} hl={f >= rp ? 2 : -1} />
          <Dave f={f} x={1380} y={930} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} sweat />
          <G2 x={1380} y={330} s={bump(hs, 0.12)}><Bubble text={f >= hs ? 'as if I borrowed it?!' : 'that loan is MINE?'} size={34} tail="down" /></G2>
          <SourceTag f={f} at={ex} text="Experian: a co-signed loan appears on the co-signer's credit report" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fm = w('c2e', 'fannie');
    const tw = w('c2e', 'twelve');
    const ot = w('c2e', 'time');
    q(fm, 'paper', 0.5);
    q(tw, 'ding', 0.6);
    q(ot, 'pop', 0.5);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={720} y={540} s={P(A('c2e')) * bump(tw, 0.06)} org="FANNIE MAE SELLING GUIDE" sub="B3-6-05 · MONTHLY DEBTS" title={["the co-signed payment counts", 'as YOUR debt... unless you show']} stat={f >= tw ? '12 months' : '?? months'} statLabel={f >= ot ? 'of proof someone else paid, on time' : 'of proof...'} />
          <Dave f={f} x={1450} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.6}]} />
          <G2 x={1450} y={360} o={lt(tw, 0.4)}><Calendar s={0.7} year="12" flip={f >= tw ? 1 : 0} top="MONTHS" /></G2>
          <SourceTag f={f} at={fm} text="Fannie Mae Selling Guide B3-6-05, Monthly Debt Obligations (2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gh = w('c2f', 'ghost');
    const rn = w('c2f', 'rent');
    q(gh, 'flutter', 0.6);
    q(rn, 'cash', 0.6);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Ghost f={f} x={1350} y={560} s={1.8 * P(A('c2f')) * bump(gh, 0.1)} label="$400" />
          <Box x={600} y={520} w={600} h={460} s={P(A('c2f'))}>
            <Text y={-180} size={38} color={GRAY}>DAVE'S MONTH</Text>
            <Text y={-100} size={40}>rent ........ $1,100</Text>
            <Text y={-30} size={40}>food ........ $350</Text>
            <Text y={40} size={40}>savings ..... $300</Text>
            <Text y={120} size={44} color={f >= rn ? C.red : GRAY}>ghost car .. $400</Text>
          </Box>
          <Dave f={f} x={980} y={960} s={0.85} keys={[{at: 0, pose: 'shrug', expr: 'tired', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const yr = w('c2g', 'year');
    const ez = w('c2g', 'easy');
    const st = w('c2g', 'stopped');
    q(yr, 'pop', 0.5);
    q(ez, 'ding', 0.5);
    q(st, 'sting', 0.6);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={520} y={480} s={1.1 * P(A('c2g')) * bump(yr, 0.1)} year="1 YEAR" flip={f >= yr ? 1 : 0} top="WAIT" />
          <Dave f={f} x={520} y={960} s={0.95} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}, {at: ez, pose: 'thumbs', expr: 'happy', look: 0.6}, {at: st, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <CallPhone f={f} x={1360} y={540} s={0.95 * P(A('c2g')) * bump(st, 0.08)} who="BOB" sub={f >= st ? 'no answer...' : 'calling...'} ring={f >= st ? 0 : 1} />
          <G2 x={1360} y={940} o={lt(st, 0.35)}><Text size={44} color={C.red}>Bob stopped answering</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: Bob goes quiet ============
  {
    const tx = w('c3a', 'texts');
    const vm = w('c3a', 'voicemail');
    const lj = w('c3a', 'lost');
    const sp = w('c3a', 'stopped');
    q(tx, 'key', 0.5);
    q(vm, 'buzz', 0.5);
    q(lj, 'thud', 0.6);
    q(sp, 'stamp', 0.7);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Handset x={560} y={520} s={1.0 * P(A('c3a'))}>
            <Text y={-180} size={30} color={GRAY}>BOB</Text>
            <G2 x={20} y={-100}><Pill text="bob?" color={C.blue} size={30} /></G2>
            <G2 x={10} y={-20} o={lt(vm, 0.3)}><Pill text="hello??" color={C.blue} size={30} /></G2>
            <G2 x={0} y={60} o={lt(vm, 0.3)}><Pill text="VOICEMAIL" color={GRAY} size={28} /></G2>
          </Handset>
          <Dave f={f} x={240} y={940} s={0.95} keys={[{at: 0, pose: 'typing', expr: 'worried', look: 0.6}]} />
          <Bob f={f} x={1350} y={930} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: -0.6}]} />
          <Pill x={1350} y={400} s={bump(lj, 0.15)} text={f >= lj ? 'NEW JOB: LOST' : 'NEW JOB: ...'} color={f >= lj ? C.red : C.ink} size={40} />
          <Stamp x={1350} y={560} s={bump(sp, 0.2)} o={lt(sp, 0.35)} text="PAYMENTS STOPPED" color={C.red} size={44} r={-5} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bl = w('c3b', 'bills');
    const nc = w('c3b', 'clue');
    q(bl, 'mail', 0.6);
    q(nc, 'cricket', 0.5);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Mailbox x={560} y={760} s={1.3 * P(A('c3b'))} flag={1} />
          {[0, 1, 2].map((i) => <Envelope key={i} x={520 + i * 50} y={420 - i * 60} s={0.7 * bump(bl + i * 4, 0.15)} label="BILL" />)}
          <Text x={560} y={1000 - 70} size={40}>BOB'S MAILBOX</Text>
          <Mailbox x={1360} y={760} s={1.3 * P(A('c3b'))} flag={0} />
          <Text x={1360} y={930} size={40}>DAVE'S MAILBOX</Text>
          <Dave f={f} x={1620} y={930} s={1.0} keys={[{at: 0, pose: 'pockets', expr: 'happy', look: -0.6}]} />
          <G2 x={1360} y={420} o={lt(nc, 0.4)}><Text size={44} color={GRAY}>(nothing. no clue.)</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c3c', 'thirty');
    const bt = w('c3c', 'both');
    const dv = w('c3c', 'daves');
    q(th, 'tick', 0.6);
    q(bt, 'stamp', 0.6);
    q(dv, 'stamp', 0.8);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c3c')) * bump(th, 0.1)}><Text size={52}>{f >= th ? '30 days late → reported' : 'a payment goes late...'}</Text></G2>
          <CreditReport x={560} y={590} s={0.7 * P(A('c3c'))} name="BOB'S REPORT" rows={['car loan', 'card', 'phone']} hl={0} late={f >= bt ? 3 : 0} />
          <CreditReport x={1360} y={590} s={0.7 * P(A('c3c')) * bump(dv, 0.08)} rows={['car loan (co-signed)', 'card', 'phone']} hl={0} late={f >= dv ? 3 : 0} />
          <SourceTag f={f} at={th} text="Experian: lenders typically report a payment late at 30 days past due" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cv = w('c3d', 'video');
    const tf = w('c3d', 'thirty');
    const md = w('c3d', 'muddy');
    q(cv, 'pop', 0.5);
    q(tf, 'ding', 0.6);
    q(md, 'step', 0.7);
    q(md + 8, 'step', 0.7);
    q(md + 16, 'step', 0.7);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <CreditReport x={620} y={560} s={0.85 * P(A('c3d'))} rows={['payment history', 'amounts owed', 'credit age', 'new credit']} hl={0} mud={ease(f, md, md + 40)} />
          <Box x={1400} y={420} w={640} h={260} s={P(A('c3d')) * bump(tf, 0.1)} fill={f >= tf ? C.yellow : '#fff'}>
            <Text y={-60} size={34} color={GRAY}>payment history</Text>
            <Text y={30} size={80} color={C.red}>{f >= tf ? '≈ 35%' : '≈ ?%'}</Text>
            <Text y={100} size={28} color={GRAY}>of a FICO score (ep. 14)</Text>
          </Box>
          <Bob f={f} x={1400} y={940} s={0.9} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.6}]} />
          <SourceTag f={f} at={tf} text="FICO: payment history ≈ 35% of a FICO Score" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c3e', 'guess');
    const cm = w('c3e', 'comments');
    q(gs, 'pop', 0.6);
    for (let i = 0; i < 6; i++) q(gs + 20 + i * 30, 'tick', 0.35);
    q(cm, 'ding', 0.5);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GuessCard f={f} x={820} y={500} s={P(A('c3e')) * bump(gs, 0.06)} q={['out of 100 people who co-sign,', 'how many end up paying?']} />
          <Dave f={f} x={1600} y={930} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
          <G2 x={820} y={880} s={bump(cm, 0.12)} o={lt(cm, 0.4)}><Pill text="write your number in the comments" color={C.navy} size={36} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rg = w('c3f', 'ringing');
    q(rg, 'buzz', 0.7);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <CallPhone f={f} x={1100} y={520} s={1.05 * P(A('c3f')) * bump(rg, 0.1)} who="UNKNOWN" sub="incoming call..." />
          <Dave f={f} x={520} y={930} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: the call from nowhere ============
  {
    const bh = w('c4a', 'behind');
    const tw = w('c4a', 'twelve');
    const lf = w('c4a', 'fees');
    q(bh, 'thud', 0.6);
    q(tw, 'cash', 0.8);
    q(lf, 'pop2', 0.5);
    const cb = w('c4b', 'bob');
    q(cb, 'boing', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <CallPhone f={f} x={460} y={520} s={0.85 * P(A('c4a'))} who="DEBT COLLECTOR" sub="on the line" ring={0} />
          <Box x={1200} y={400} w={820} h={330} s={P(A('c4a')) * bump(tw, 0.1)} fill={f >= tw ? C.yellow : '#fff'}>
            <Text y={-100} size={38} color={GRAY}>Bob: 3 payments behind</Text>
            <Text y={-20} size={56}>3 × $400</Text>
            <Text y={80} size={84} color={C.red}>{f >= tw ? '= $1,200' : '= $?'}</Text>
          </Box>
          <G2 x={1200} y={630} o={lt(lf, 0.35)}><Text size={44} color={C.red}>+ late fees</Text></G2>
          <Dave f={f} x={1200} y={960} s={0.85} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}, {at: A('c4b'), pose: 'panic', expr: 'scream', look: -0.6}]} />
          <G2 x={1620} y={780} s={bump(cb, 0.15)} o={lt(A('c4b'), 0.0001)}><Bubble text="CALL BOB!" size={40} tail="left" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dh = w('c4c', 'have');
    q(dh, 'stamp', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Collector f={f} x={1300} y={930} s={1.15} keys={[{at: 0, pose: 'relax', expr: 'smug', look: -0.6}]} />
          <G2 x={1300} y={320} s={P(A('c4c')) * bump(dh, 0.12)}><Bubble text="we don't have to." size={46} tail="down" /></G2>
          <Dave f={f} x={540} y={930} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
          <Desk x={1300} y={1000} w={500} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c4d', 'thought');
    const np = w('c4d', 'nope');
    const ft = w('c4d', 'federal');
    const st = w('c4d', 'states');
    q(th, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(ft, 'paper', 0.5);
    q(st, 'pop', 0.4);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130}><Text size={46}>who does the lender call first?</Text></G2>
          <G2 x={960} y={330} s={P(A('c4d'))} o={f >= np ? 0.4 : 1}>
            <Pill text="DAVE THOUGHT: LENDER → BOB → (maybe) DAVE" color={GRAY} size={40} />
          </G2>
          <G2 x={960} y={330} s={0.25 * bump(np, 0.2)} o={lt(np, 0.0001)}><XMark /></G2>
          <G2 x={960} y={560} s={P(A('c4d')) * bump(np, 0.1)} o={lt(np, 0.35)}>
            <Pill text="REALITY: LENDER → DAVE" color={C.red} size={56} />
          </G2>
          <Banker f={f} x={360} y={960} s={0.9} keys={[{at: 0, pose: 'point_r', expr: 'smug', look: 0.6}]} />
          <Dave f={f} x={1560} y={960} s={0.9} keys={[{at: 0, pose: 'shock', expr: 'worried', look: -0.6}]} />
          <G2 x={960} y={760} o={lt(st, 0.35)}><Text size={36} color={GRAY}>(a few states add extra rules)</Text></G2>
          <SourceTag f={f} at={ft} text="FTC, Notice to Cosigner: can collect from you without first trying the borrower" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ls = w('c4e', 'lawsuit');
    const pc = w('c4e', 'paycheck');
    const gw = w('c4e', 'garnishing');
    q(ls, 'stamp', 0.7);
    q(pc, 'rip', 0.6);
    q(gw, 'ding', 0.5);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c4e'))}><Text size={48}>same tools on Dave as on Bob</Text></G2>
          <Gavel x={520} y={520} s={1.6 * P(A('c4e')) * bump(ls, 0.12)} hit={ease(f, ls, ls + 6)} />
          <Pill x={520} y={780} text="A LAWSUIT" color={f >= ls ? C.red : C.ink} size={44} />
          <Paycheck x={1340} y={520} s={0.9 * P(A('c4e')) * bump(pc, 0.08)} amount="$2,400" cut={0} />
          <G2 x={1340} y={520} o={lt(pc, 0.0001)}>
            <rect x={-60} y={-130} width={330} height={260} rx={16} fill="rgba(239,71,111,0.85)" stroke={C.ink} strokeWidth={5} />
            <Text x={105} y={0} size={40} color="#fff">TAKEN</Text>
          </G2>
          <Pill x={1340} y={780} text={f >= gw ? 'GARNISHED WAGES' : 'YOUR PAYCHECK'} color={f >= gw ? C.red : C.ink} size={44} />
          <SourceTag f={f} at={ls} text="FTC: same collection methods against the co-signer (suing, garnishing wages)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const py = w('c4f', 'pays');
    const nv = w('c4f', 'never');
    q(py, 'cash', 0.8);
    q(nv, 'trombone', 0.4);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Wallet x={700} y={520} s={1.4 * P(A('c4f')) * bump(py, 0.08)} label="DAVE" open={ease(f, py, py + 12)} />
          <MoneyStack x={1000 + ease(f, py, py + 30) * 200} y={460 - ease(f, py, py + 30) * 80} s={0.8} n={4} label="$1,200" />
          <Dave f={f} x={420} y={940} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.6}]} />
          <G2 x={1500} y={760} s={1.3 * P(A('c4f'))} o={0.45}><Car /></G2>
          <Pill x={1500} y={600} s={bump(nv, 0.12)} text="NEVER DROVE IT" color={f >= nv ? C.red : GRAY} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c4g', 'guess');
    const ts = w('c4g', 'thirty');
    const cl = w('c4g', 'club');
    q(gs, 'pop', 0.5);
    q(ts, 'stamp', 0.8);
    q(cl, 'crowd', 0.4);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={620} y={520} s={0.95 * P(A('c4g')) * bump(ts, 0.08)} org="CREDITCARDS.COM SURVEY" sub="CO-SIGNERS · 2016" title={['had to pay some or', 'all of the loan']} stat={f >= ts ? '38%' : '?'} statLabel="of co-signers" />
          <People x={1420} y={560} s={0.95 * P(A('c4g'))} n={100} hot={38} lit={f >= ts ? 1 : 0} />
          <G2 x={1420} y={940} o={lt(cl, 0.35)}><Text size={40} color={C.red}>Dave just joined the club</Text></G2>
          <SourceTag f={f} at={ts} text="CreditCards.com co-signer survey (June 2016)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dq = w('c4h', 'dangerous');
    const nm = w('c4h', 'name');
    q(dq, 'sting', 0.5);
    q(nm, 'pop', 0.5);
    scene(A('c4h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={760} y={300} s={P(A('c4h')) * bump(dq, 0.1)}><Bubble text="why did they want MY name?" size={42} tail="down" /></G2>
          <Shadow f={f} x={1450} y={900} s={1.4 * bump(nm, 0.06)} />
          <Pill x={1450} y={300} text="LENDER?" color={C.ink} size={44} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: why the lender smiled (villain) ============
  {
    const sd = w('c5a', 'side', 1);
    q(sd, 'pop', 0.5);
    const al = w('c5b', 'alone');
    const ry = w('c5b', 'risky');
    const pl = w('c5b', 'plus');
    const tw = w('c5b', 'two');
    q(ry, 'buzz', 0.5);
    q(pl, 'pop', 0.5);
    q(tw, 'cash', 0.7);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <Banker f={f} x={960} y={720} s={1.0} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0}, {at: tw, pose: 'celebrate', expr: 'money', look: 0}]} />
          <Pill x={960} y={200} s={P(A('c5a')) * bump(sd, 0.1)} text="THE LENDER'S SIDE" color={C.navy} size={46} />
          <Wallet x={460} y={540} s={1.0 * P(A('c5a')) * bump(al, 0.1)} label="BOB" />
          <G2 x={460} y={700} o={lt(ry, 0.35)}><Stamp text="RISKY" color={C.red} size={48} r={-6} /></G2>
          <Wallet x={1460} y={540} s={1.0 * P(A('c5a')) * bump(pl, 0.12)} label="DAVE" o={lt(pl, 0.35)} />
          <G2 x={1460} y={720} o={lt(tw, 0.35)}><Pill text="2 WALLETS · 1 CAR" color={C.green} size={40} /></G2>
          <Text x={960} y={1010 - 60} size={30} color={GRAY}>who profits?</Text>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('c5c', 'seatbelt');
    const bk = w('c5c', 'buckled');
    const rf = w('c5c', 'roof');
    q(sb, 'click', 0.7);
    q(bk, 'key', 0.6);
    q(rf, 'boing', 0.6);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={960} y={820} s={3.2 * P(A('c5c'))}><Car /></G2>
          <Banker f={f} x={960} y={690} s={0.75} keys={[{at: 0, pose: 'relax', expr: 'smug', look: 0.5}]} />
          <Strap x={960} y={560} s={1.0} t={ease(f, bk, bk + 10)} />
          <Dave f={f} x={980} y={500} s={0.8} keys={[{at: 0, pose: 'panic', expr: 'scream', look: 0}]} sweat />
          <G2 x={1500} y={200} s={P(A('c5c')) * bump(sb, 0.1)}><Pill text="LENDER: SEATBELT ON" color={C.green} size={40} /></G2>
          <G2 x={420} y={200} s={bump(rf, 0.15)} o={lt(rf, 0.35)}><Pill text="DAVE: ON THE ROOF" color={C.red} size={40} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c5d', 'twenty');
    const on = w('c5d', 'one');
    const tk = w('c5d', 'talking');
    q(tw, 'stamp', 0.6);
    q(on, 'heart', 0.4);
    q(tk, 'cricket', 0.5);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={520} y={380} w={640} h={260} s={P(A('c5d')) * bump(tw, 0.1)} fill={f >= tw ? '#FFE3EA' : '#fff'}>
            <Text y={-60} size={34} color={GRAY}>credit score dropped</Text>
            <Text y={40} size={100} color={C.red}>{f >= tw ? '28%' : '?%'}</Text>
          </Box>
          <Box x={520} y={720} w={640} h={260} s={P(A('c5d')) * bump(on, 0.1)} fill={f >= on ? '#FFE3EA' : '#fff'}>
            <Text y={-60} size={34} color={GRAY}>relationship got hurt</Text>
            <Text y={40} size={90} color={C.red}>{f >= on ? '1 in 4' : '?'}</Text>
          </Box>
          <Dave f={f} x={1240} y={930} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'sad', look: -0.6}]} flip />
          <Bob f={f} x={1560} y={930} s={1.05} keys={[{at: 0, pose: 'pockets', expr: 'sad', look: 0.6}]} flip />
          <G2 x={1400} y={420} o={lt(tk, 0.35)}><Text size={48} color={GRAY}>...not talking.</Text></G2>
          <SourceTag f={f} at={tw} text="CreditCards.com co-signer survey (June 2016)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cf = w('c5e', 'c');
    const nt = w('c5e', 'ninety');
    const rj = w('c5e', 'rejected');
    q(cf, 'paper', 0.5);
    q(nt, 'cash', 0.6);
    q(rj, 'stamp', 0.8);
    const np = w('c5f', 'ninety');
    const ti = w('c5f', 'in');
    const ws = w('c5f', 'worse');
    q(np, 'thud', 0.6);
    q(ti, 'clank', 0.6);
    q(ws, 'sting', 0.6);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={680} y={520} s={0.95 * P(A('c5e')) * bump(rj, 0.06)} org="CFPB STUDENT LOAN OMBUDSMAN" sub="PRIVATE STUDENT LOANS · 2015" title={['asked to remove a co-signer:']} stat={f >= nt ? '90%' : '?%'} statLabel={f >= rj ? 'REJECTED' : '...'} color={C.navy} />
          <Banker f={f} x={1480} y={930} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'smug', look: -0.6}]} handItem={<Handcuffs s={0.6} open={0} />} />
          <G2 x={1480} y={360} s={bump(ti, 0.12)} o={lt(ti, 0.35)}><Bubble text="once you're in, you're in." size={34} tail="down" /></G2>
          <SourceTag f={f} at={cf} text="CFPB, June 18 2015: 90% of co-signer release applicants were rejected" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: no exit door ============
  {
    const nm = w('c6a', 'name');
    const no = w('c6a', 'no');
    q(nm, 'pop', 0.5);
    q(no, 'buzz', 0.8);
    const gm = w('c6b', 'gym');
    q(gm, 'boing', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={360} y={930} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'worried', look: 0.6}, {at: no, pose: 'shock', expr: 'sad', look: 0.6}]} />
          <G2 x={520} y={330} s={P(A('c6a')) * bump(nm, 0.1)}><Bubble text="take my name off?" size={36} tail="down" /></G2>
          <Banker f={f} x={1000} y={930} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
          <Stamp x={1000} y={360} s={bump(no, 0.2)} o={lt(no, 0.35)} text="NO" color={C.red} size={90} />
          <GymBuilding x={1560} y={760} s={0.55 * P(A('c6a'))} name="GYM" />
          <G2 x={1560} y={360} o={lt(gm, 0.35)}><Text size={36} color={GRAY}>easier to quit than this</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c6c', 'one');
    const gc = w('c6c', 'good');
    const ws = w('c6c', 'worse');
    q(on, 'pop', 0.5);
    q(gc, 'ding', 0.4);
    q(ws, 'buzz', 0.6);
    const tw = w('c6d', 'two');
    const ec = w('c6d', 'every');
    q(tw, 'pop', 0.5);
    q(ec, 'cash', 0.6);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c6c'))}><Text size={48}>only two ways out</Text></G2>
          <Door x={560} y={860} s={1.2 * P(A('c6c')) * bump(on, 0.06)} open={0} />
          <Pill x={560} y={260} text="1. BOB GETS A NEW LOAN ALONE" color={C.navy} size={30} />
          <G2 x={560} y={650} s={bump(ws, 0.15)} o={lt(gc, 0.35)}><Stamp text={f >= ws ? "BOB'S CREDIT: WORSE" : 'NEEDS GOOD CREDIT'} color={C.red} size={34} r={-6} /></G2>
          <Door x={1360} y={860} s={1.2 * P(A('c6c')) * bump(tw, 0.06)} open={f >= ec ? 0.6 : 0} />
          <Pill x={1360} y={260} text="2. PAY OFF THE WHOLE LOAN" color={C.navy} size={30} />
          <G2 x={1360} y={650} o={lt(ec, 0.35)}><Text size={52} color={C.red} stroke="#fff" sw={8}>every cent</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cb = w('c6e', 'calls');
    const sh = w('c6e', 'shaking');
    const tk = w('c6e', 'take');
    q(cb, 'buzz', 0.6);
    q(sh, 'pop2', 0.4);
    q(tk, 'sting', 0.7);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <CallPhone f={f} x={560} y={520} s={0.9 * P(A('c6e')) * bump(cb, 0.08)} who="BOB" sub="calling back..." />
          <Bob f={f} x={1300} y={930 + shake(f, sh, 8, 60).y} s={1.1} keys={[{at: 0, pose: 'panic', expr: 'scream', look: -0.6}]} sweat />
          <Envelope x={1650} y={520} s={1.1 * P(A('c6e')) * bump(tk, 0.12)} label={f >= tk ? 'WE WANT THE CAR' : 'URGENT'} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: the seven thousand trap (low point) ============
  {
    const rp = w('c7a', 'repossess');
    const au = w('c7a', 'auction');
    q(rp, 'clank', 0.7);
    q(au, 'stamp', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Letter x={520} y={540} s={0.95 * P(A('c7a'))} title="FINAL NOTICE" lines={['payments are behind', 'car may be repossessed', 'and sold at auction', 'DEADLINE: 10 DAYS']} hl={f >= au ? 2 : f >= rp ? 1 : -1} />
          <TowTruck x={1350} y={860} s={1.2 * P(A('c7a'))} lift={ease(f, rp, rp + 20)} />
          <G2 x={1080} y={800 - ease(f, rp, rp + 20) * 60} s={1.2} r={-12 * ease(f, rp, rp + 20)}><Car /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fn = w('c7b', 'fine');
    const np = w('c7b', 'nope');
    q(fn, 'pop', 0.4);
    q(np, 'buzz', 0.8);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="WHAT DAVE THOUGHT" />
        <Svg>
          <Dave f={f} x={520} y={920} s={1.15} keys={[{at: 0, pose: 'relax', expr: 'happy', look: 0.6}, {at: np, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <Box x={1260} y={460} w={820} h={300} s={P(A('c7b')) * bump(fn, 0.08)}>
            <Text y={-60} size={46}>car gone = loan gone?</Text>
            <Text y={30} size={40} color={GRAY}>"we're done."</Text>
          </Box>
          <Stamp x={1260} y={760} s={P(A('c7b')) * bump(np, 0.2)} text={f >= np ? 'NOPE' : '?'} color={C.red} size={90} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fi = w('c7c', 'fifteen');
    const ei = w('c7c', 'eight');
    const sv = w('c7c', 'seven');
    const fe = w('c7c', 'fees');
    q(fi, 'pop', 0.5);
    q(ei, 'pop2', 0.5);
    q(sv, 'stamp', 0.8);
    q(fe, 'cash', 0.6);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c7c'))}><Text size={48}>the FTC's repossession math</Text></G2>
          <Bar x={460} y={860} s={P(A('c7c')) * bump(fi, 0.08)} h={f >= fi ? 520 : 60} color={C.navy} label="STILL OWED" value={f >= fi ? '$15,000' : '?'} />
          <Bar x={960} y={860} s={P(A('c7c')) * bump(ei, 0.08)} h={f >= ei ? 280 : 60} color={C.blue} label="AUCTION PRICE" value={f >= ei ? '$8,000' : '?'} />
          <Bar x={1460} y={860} s={P(A('c7c')) * bump(sv, 0.12)} h={f >= sv ? 240 : 60} color={C.red} label="YOU STILL OWE" value={f >= sv ? '$7,000' : '?'} />
          <G2 x={1460} y={380} o={lt(fe, 0.35)}><Pill text="+ repossession fees" color={C.red} size={34} /></G2>
          <SourceTag f={f} at={fi} text="FTC, Vehicle Repossession: deficiency example ($15,000 owed, $8,000 sale)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sx = w('c7d', 'sixteen');
    const sv = w('c7d', 'seven');
    const an = w('c7d', 'anymore');
    q(sx, 'pop', 0.5);
    q(sv, 'cash', 0.8);
    q(an, 'cricket', 0.5);
    const pz = w('c7e', 'pizza');
    const tx = w('c7e', 'texts');
    q(pz, 'pop', 0.5);
    q(tx, 'trombone', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={760} y={860} s={2.2}>
            <rect x={-150} y={-10} width={300} height={30} rx={6} fill="none" stroke="#fff" strokeWidth={8} strokeDasharray="20 14" />
          </G2>
          <G2 x={760} y={780} s={2.2} o={f >= an ? 0.15 : 0.5}><Car /></G2>
          <Pill x={760} y={500} s={P(A('c7d')) * bump(sx, 0.1)} text="BOB OWES ≈ $16,000" color={C.navy} size={40} />
          <Pill x={760} y={360} s={bump(sv, 0.15)} text={f >= sv ? 'DAVE COULD OWE $7,000' : 'DAVE COULD OWE...'} color={f >= sv ? C.red : GRAY} size={44} />
          <Dave f={f} x={1450} y={930} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}, {at: pz, pose: 'facepalm', expr: 'tired', look: -0.6}]} sweat />
          <G2 x={1450} y={330} s={P(A('c7d')) * bump(pz, 0.08)}><Pizza s={0.5} eaten={f >= pz ? 8 : 0} /></G2>
          <G2 x={1450} y={500} o={lt(tx, 0.35)}><Text size={34} color={C.red}>someone else ate it</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lw = w('c7f', 'lowest');
    const dl = w('c7f', 'deadline');
    const tm = w('c7f', 'time');
    q(lw, 'sting', 0.5);
    q(dl, 'ding', 0.7);
    q(tm, 'chime', 0.5);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={520} y={930} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.6}, {at: dl, pose: 'point_r', expr: 'suspicious', look: 0.6}]} />
          <Letter x={1250} y={530} s={0.95 * P(A('c7f')) * bump(dl, 0.06)} title="FINAL NOTICE" lines={['payments are behind', 'car may be repossessed', 'and sold at auction', 'DEADLINE: 10 DAYS']} hl={f >= dl ? 3 : -1} />
          <G2 x={520} y={300} o={lt(tm, 0.35)}><Pill text="still time" color={C.green} size={44} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: Dave fights back ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const ed = w('c8a', 'education');
    q(ed, 'pop', 0.5);
    const st = w('c8b', 'statements');
    const wr = w('c8b', 'writing');
    q(st, 'mail', 0.6);
    q(wr, 'scribble', 0.5);
    const fr = w('c8c', 'free');
    const ow = w('c8c', 'official');
    q(fr, 'coin', 0.6);
    q(ow, 'stamp', 0.5);
    const sl = w('c8d', 'sells');
    const au = w('c8d', 'auction');
    q(sl, 'pop', 0.6);
    q(au, 'buzz', 0.5);
    const items = ['Get the statements + written alerts', 'Check your credit reports (free, weekly)', 'Make a plan: sell before the deadline'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={640} y={110}><Text size={52}>Dave fights back</Text></G2>
          <G2 x={640} y={175} s={bump(ed, 0.1)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={330 + i * 190} s={0.9 * P(A('c8a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1060} />)}
          {cur === 0 && <Dave f={f} x={1550} y={930} s={1.15} keys={[{at: 0, pose: 'hips', expr: 'grin', look: -0.6}]} />}
          {cur === 1 && (
            <G2 x={1560} y={520}>
              <Envelope y={-120} s={1.0 * bump(st, 0.1)} label="STATEMENT → DAVE" />
              <Notif y={160} s={0.62 * bump(wr, 0.1)} title="Payment missed" body="borrower: Bob" hl={f >= wr ? 1 : 0} />
            </G2>
          )}
          {cur === 2 && (
            <G2 x={1560} y={520}>
              <Laptop s={0.9 * bump(fr, 0.1)} />
              <Text y={-60} size={26} color={C.navy}>annualcreditreport.com</Text>
              <Pill y={240} text="FREE · EVERY WEEK" color={f >= fr ? C.green : C.ink} size={34} />
            </G2>
          )}
          {cur >= 3 && (
            <G2 x={1560} y={560}>
              <G2 s={1.6}><Car /></G2>
              <G2 y={-180} s={bump(sl, 0.12)}><Sign text="FOR SALE" color={C.green} /></G2>
              <G2 y={220} o={lt(au, 0.35)}><Pill text="no rushed auction" color={C.red} size={34} /></G2>
            </G2>
          )}
          <SourceTag f={f} at={cur === 1 ? st : cur === 2 ? fr : 1e9} until={cur >= 3 ? 0 : 1e9} text={cur === 2 ? 'FTC: free weekly credit reports at AnnualCreditReport.com (permanent since 2023)' : 'FTC, Cosigning a Loan FAQs: ask the lender to tell you in writing about missed payments'} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ft = w('c8e', 'fourteen');
    const tw = w('c8e', 'two');
    const pd = w('c8e', 'paid');
    const fr = w('c8e', 'free');
    q(ft, 'cash', 0.6);
    q(tw, 'coin', 0.6);
    q(pd, 'stamp', 0.8);
    q(fr, 'chime', 0.6);
    scene(A('c8e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bar x={420} y={820} s={P(A('c8e')) * bump(ft, 0.08)} h={f >= ft ? 420 : 60} color={C.green} label="CAR SOLD" value={f >= ft ? '$14,000' : '?'} />
          <Bar x={740} y={820} s={P(A('c8e')) * bump(tw, 0.1)} h={f >= tw ? 80 : 60} color={C.blue} label="BOB'S JOB" value={f >= tw ? '$2,000' : '?'} />
          <Bar x={1080} y={820} s={P(A('c8e'))} h={480} color={C.navy} label="LOAN" value="$16,000" />
          <Stamp x={1080} y={300} s={bump(pd, 0.2)} o={lt(pd, 0.35)} text="PAID OFF" color={C.green} size={60} r={-6} />
          <Handcuffs x={1560} y={420} s={1.4 * P(A('c8e'))} open={ease(f, fr, fr + 12)} />
          <Dave f={f} x={1560} y={940} s={1.0} keys={[{at: 0, pose: 'idle', expr: 'worried', look: -0.6}, {at: fr, pose: 'celebrate', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sp = w('c8f', 'stops');
    const nv = w('c8f', 'never');
    const sv = w('c8f', 'saved');
    q(sp, 'pop', 0.5);
    q(nv, 'poof', 0.6);
    q(sv, 'chime', 0.8);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={560} y={420} w={640} h={260} s={P(A('c8f')) * bump(sp, 0.1)}>
            <Text y={-60} size={34} color={GRAY}>damage stopped at</Text>
            <Text y={40} size={90} color={C.red}>$1,200</Text>
          </Box>
          <Box x={560} y={760} w={640} h={220} s={P(A('c8f')) * bump(nv, 0.1)} o={f >= nv ? 0.5 : 1}>
            <Text y={-40} size={34} color={GRAY}>the repossession gap</Text>
            <Text y={40} size={70} color={C.ink}>$7,000</Text>
          </Box>
          <G2 x={560} y={760} s={0.25 * bump(nv, 0.2)} o={lt(nv, 0.0001)}><XMark /></G2>
          <Box x={1380} y={560} w={720} h={320} s={P(A('c8f')) * bump(sv, 0.12)} fill={f >= sv ? C.green : '#fff'}>
            <Text y={-70} size={40} color={f >= sv ? '#fff' : GRAY}>DAVE SAVED</Text>
            <Text y={40} size={120} color={f >= sv ? '#fff' : C.ink}>{f >= sv ? '$7,000' : '$?'}</Text>
          </Box>
          <Dave f={f} x={1380} y={980} s={0.7} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}, {at: sv, pose: 'celebrate', expr: 'grin', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9: the sentence on page one (big payoff) ============
  {
    const pp = w('c9a', 'papers');
    const nt = w('c9a', 'notice');
    q(pp, 'paper', 0.6);
    q(nt, 'ding', 0.6);
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill="rgba(29,53,87,0.35)" />
          <NoticePage x={1250} y={560} s={0.95 * P(A('c9a')) * bump(nt, 0.06)} hl={0} />
          <Dave f={f} x={480} y={930} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.6}, {at: nt, pose: 'point_r', expr: 'shock', look: 0.6}]} />
          <G2 x={480} y={300} o={lt(nt, 0.35)}><Pill text="page one." color={C.yellow} fg={C.ink} size={44} /></G2>
          <SourceTag f={f} at={nt} text="FTC Credit Practices Rule, 16 CFR 444.3: Notice to Cosigner" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gu = w('c9b', 'guarantee');
    const bo = w('c9b', 'borrower');
    const hv = w('c9b', 'have');
    q(gu, 'pop', 0.5);
    q(bo, 'marker', 0.6);
    q(hv, 'stamp', 0.8);
    scene(A('c9b'), () => (
      <AbsoluteFill>
        <Board />
        <Cam f={f} keys={[[A('c9b'), 1.0, 960, 540], [hv, 1.12, 960, 600]]}>
          <Svg>
            <NoticePage x={960} y={560} s={1.25 * P(A('c9b'))} hl={ease(f, bo, hv + 6)} />
          </Svg>
        </Cam>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c9c', 'collector');
    const cr = w('c9c', 'credit');
    const sv = w('c9c', 'seven');
    const nr = w('c9c', 'never');
    q(cl, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(sv, 'cash', 0.6);
    q(nr, 'trombone', 0.5);
    scene(A('c9c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c9c'))}><Text size={50}>one sentence predicted it all</Text></G2>
          <CallPhone f={f} x={420} y={500} s={0.65 * P(A('c9c')) * bump(cl, 0.1)} who="COLLECTOR" sub="" ring={0} />
          <CreditReport x={960} y={520} s={0.55 * P(A('c9c')) * bump(cr, 0.1)} rows={['car loan', 'card']} hl={0} late={3} />
          <Box x={1500} y={500} w={420} h={240} s={P(A('c9c')) * bump(sv, 0.1)} fill={C.yellow}>
            <Text y={20} size={84} color={C.red}>$7,000</Text>
          </Box>
          <Dave f={f} x={960} y={1000} s={0.6} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0}, {at: nr, pose: 'facepalm', expr: 'tired', look: 0}]} />
          <G2 x={1500} y={800} o={lt(nr, 0.35)}><Pill text="signed it. never read it." color={C.red} size={34} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const af = w('c9d', 'afford');
    const rl = w('c9d', 'rule');
    const ok = w('c9d', 'okay');
    q(af, 'marker', 0.5);
    q(rl, 'ding', 0.6);
    q(ok, 'chime', 0.5);
    const kd = w('c9e', 'kindest');
    const sg = w('c9e', 'signature', 1);
    q(kd, 'heart', 0.5);
    q(sg, 'stamp', 0.6);
    scene(A('c9d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c9d')) * bump(af, 0.08)}><Text size={44} color={C.navy}>"Be sure you can afford to pay if you have to."</Text></G2>
          <Box x={760} y={500} w={1100} h={330} s={P(A('c9d')) * bump(rl, 0.06)} fill={f >= rl ? C.yellow : '#fff'}>
            <Text y={-110} size={36} color={GRAY}>DAVE'S NEW RULE</Text>
            <Text y={-20} size={50}>Could I pay this WHOLE loan</Text>
            <Text y={60} size={50}>myself... and still be OK?</Text>
          </Box>
          <Dave f={f} x={1600} y={930} s={1.1} keys={[{at: 0, pose: 'point_up', expr: 'think', look: -0.6}, {at: A('c9e'), pose: 'talk', expr: 'happy', look: -0.6}]} />
          <Bob f={f} x={1380} y={930} s={1.0} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: kd, pose: 'thumbs', expr: 'happy', look: 0.6}]} />
          <G2 x={760} y={800} s={bump(sg, 0.12)} o={lt(A('c9e'), 0.35)}><Pill text="a signature is never just a signature" color={C.ink} size={38} /></G2>
          <SourceTag f={f} at={af} until={A('c9e')} text="FTC Notice to Cosigner (16 CFR 444.3)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ OUTRO: What Dave Learned ============
  const recap = ["A co-signer isn't a reference. It's borrower #2.", 'Their late payments land on YOUR report.', 'Read the notice. Only sign what you could pay alone.'];
  {
    const r = [bs('r1'), bs('r2'), bs('r3')];
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('r1'))}><Text size={80}>WHAT DAVE LEARNED</Text></G2>
          {recap.map((b, i) => <Row key={i} x={180} y={360 + i * 180} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1560} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rt = w('r4', 'retirement');
    const sv = w('r4', 'seventy');
    const lg = w('r4', 'longer');
    const sb = w('r5', 'subscribe');
    q(rt, 'click', 0.5);
    q(sv, 'stamp', 0.7);
    q(lg, 'sting', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('r4'), () =>
      f < A('r5') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Laptop x={1250} y={560} s={1.3 * P(A('r4')) * bump(rt, 0.06)} />
            <G2 x={1250} y={480}><Text size={30} color={C.navy}>RETIREMENT ACCOUNT</Text></G2>
            <G2 x={1250} y={300} s={bump(sv, 0.15)}><Pill text={f >= sv ? 'RETIRE AT: 70' : 'RETIRE AT: ?'} color={f >= sv ? C.red : C.ink} size={48} /></G2>
            <Dave f={f} x={520} y={930} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: 0.6}, {at: sv, pose: 'shock', expr: 'shock', look: 0.6}]} sweat={f >= lg} />
            <G2 x={520} y={300} o={lt(lg, 0.35)}><Text size={48} color={C.red}>...maybe longer?!</Text></G2>
            <G2 x={960} y={130}><Text size={40} color={GRAY}>NEXT: Dave's next problem</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={420} s={1.4 * pop(f, A('r5'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1420} y={420} s={1.1 * pop(f, A('r5') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={880} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Bob f={f} x={680} y={880} s={1.15} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
            <G2 x={1300} y={760}><Text size={40} color={C.green}>the only thing we'll ask you to sign</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ DAMAGE METER (HUD) ============
  const D_ON = w('o4', 'loan');
  const D1 = w('c4a', 'twelve');
  const D2 = w('c7d', 'seven');
  const D3 = w('c8f', 'stops');
  const D4 = w('c8f', 'saved');
  q(D1 + 4, 'cash', 0.5);
  q(D2 + 4, 'cash', 0.5);
  const dmg = f < D1 ? 0 : f < D2 ? lerp(0, 1200, ease(f, D1, D1 + 20)) : f < D3 ? lerp(1200, 8200, ease(f, D2, D2 + 24)) : 1200;
  const saved = f >= D4 ? 1 : 0;
  const inChapterCard = (t.chapters ?? []).some((c) => f >= Math.round(c.start * 30) - 4 && f < Math.round(c.start * 30) + CHAPTER_FRAMES + 4);
  const SUB = we('c5c', 'roof') + 20;
  const inSub = f >= SUB - 4 && f <= SUB + SUB_FRAMES + 4;
  const showMeter = f >= D_ON && !inChapterCard && !inSub && f < A('r1');
  subCues(SUB).forEach((c) => cues.push(c));
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {showMeter && (
        <Svg>
          <DamageMeter x={1700} y={150} s={pop(f, D_ON) * bump(D1, 0.15) * bump(D2, 0.15) * bump(D4, 0.2)} value={saved ? '$7,000' : (f >= D2 && f < D3 ? money(dmg) + '?' : money(dmg))} saved={saved} hot={f >= D2 && f < D3 ? 1 : 0} />
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
