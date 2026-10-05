import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Desk, MoneyStack, Pencil, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Envelope, Mailbox, Row, Sign, SubButton, Bell} from '../props2';
import {SourceCard} from '../props3';
import {House} from '../props4';
import {Couch} from '../props19';
import {DamageMeter, LawyerBill, DivorceForms, Whiteboard, StickyNote, GuessCard, FightList, CostStaircase, QDRO, Agreement} from '../props55';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Lawyer: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={44} {...p} />;
const Wife: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={33} {...p} />;
const Mediator: React.FC<SP> = (p) => <Stick acc={['glasses']} seed={55} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const Ep55: React.FC = () => {
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

  // Damage tracking
  let dmg = 0;
  let savedMode = 0;

  // ============ HOOK ============
  const o1Scene = (ff: number) => {
    const cm = w('o1', 'came');
    const hl = w('o1', 'holding');
    const fg = w('o1', 'fighting');
    return (
      <AbsoluteFill>
        <Interior />
        <Cam f={ff} keys={[[0, 1.15, 960, 560], [30, 1.0, 960, 540]]}>
          <Svg>
            <Desk x={960} y={900} w={600} />
            <Couch x={1400} y={900} s={0.65 * bump(w('o1', 'couch'), 0.08)} color="#888" tag={ff >= w('o1', 'couch') ? '$400' : undefined} />
            <Bob f={ff} x={780} y={930} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.6}]} hold={{item: <LawyerBill topic="GRAY COUCH" hours="1.5" rate="$344" total="$516" s={0.35} />, side: 'r'}} />
            <Dave f={ff} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
            <G2 x={420} y={320} s={bump(fg, 0.15)} o={lt(fg, 0.35)}><Text size={50} color={C.red}>fighting over a couch?!</Text></G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  {
    q(w('o1', 'came'), 'pop', 0.5);
    q(w('o1', 'holding'), 'paper', 0.6);
    q(w('o1', 'couch'), 'stamp', 0.7);
    q(w('o1', 'fighting'), 'buzz', 0.6);
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
          <G2 x={780} y={240} s={P(FR) * bump(w('o2', 'bob'), 0.12)}>
            <Stamp text="THAT'S BOB" color={C.red} size={70} r={-4} />
            <path d="M 0 80 L 0 200 M -30 170 L 0 206 L 30 170" fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
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
    const th = w('o3', 'three');
    const sm = w('o3', 'simple');
    const hd = w('o3', 'hundred');
    q(A('o3') + 4, 'pop', 0.5);
    q(th, 'pop2', 0.4);
    q(sm, 'ding', 0.5);
    q(hd, 'cash', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={600} />
          <Bob f={f} x={480} y={930} s={1.15} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}]} />
          <Dave f={f} x={1400} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}]} />
          <DivorceForms x={960} y={480} s={0.75 * P(A('o3'))} cost={f >= hd ? '$300' : '$??'} />
          <G2 x={480} y={340} s={P(A('o3')) * bump(sm, 0.1)}><Bubble text="simple divorce!" size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const av = w('o4', 'average');
    const tw = w('o4', 'twenty');
    const land = tw + 20;
    q(av, 'pop', 0.5);
    q(tw, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    scene(A('o4'), () => {
      const n = Math.round(lerp(0, 20400, ease(f, tw, land)));
      const sk = shake(f, land, 16, 14);
      const z = 1 + 0.12 * ease(f, land, land + 10);
      dmg = n;
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, z, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('o4'))}><Text size={52} color={GRAY}>TRIAL DIVORCE COST</Text></G2>
              <G2 x={960 + sk.x} y={480 + sk.y}>
                <rect x={-560} y={-180} width={1120} height={360} rx={30} fill={f >= land ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
                <Text y={20} size={200} color={f >= land ? C.red : C.ink}>{money(n)}</Text>
              </G2>
              <Dave f={f} x={360} y={960} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: land, pose: 'shock', expr: 'shock', look: 0.6}]} />
              <G2 x={1560} y={540} s={P(A('o4'))}><Text size={44} color={C.navy}>each person</Text></G2>
              <DamageMeter x={1720} y={100} s={0.9 * P(A('o4'))} value={money(n)} />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }

  {
    const wh = w('o5', 'who');
    const fm = w('o5', 'forms');
    q(wh, 'pop', 0.5);
    q(fm, 'sting', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={720} y={200} s={P(A('o5'))}><Text size={58}>who gets {money(20400)}?</Text></G2>
          <DivorceForms x={460} y={620} s={0.5 * P(A('o5'))} />
          <G2 x={1380} y={200} s={P(A('o5')) * bump(wh, 0.12)}><Text size={80} color={C.red}>?</Text></G2>
          <G2 x={1380} y={640} s={1.6}><MoneyStack n={5} label="$20K+" /></G2>
          <Dave f={f} x={1380} y={960} s={0.85} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const st = w('o6', 'stay');
    const on = w('o6', 'one');
    const hf = w('o6', 'half');
    q(st, 'pop', 0.6);
    q(on, 'ding', 0.5);
    q(hf, 'stamp', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={P(A('o6')) * bump(st, 0.1)}><Text size={52} color={C.navy}>STAY TO THE END</Text></G2>
          <G2 x={960} y={520} s={1.8 * P(A('o6'))}>
            <rect x={-340} y={-130} width={680} height={260} rx={24} fill="#fff" stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={46} color={C.red}>1 QUESTION</Text>
            <Text y={20} size={50}>cut Bob's bill</Text>
            <Text y={90} size={60} color={f >= hf ? C.green : C.ink}>{f >= hf ? 'IN HALF' : 'by...'}</Text>
          </G2>
          <Dave f={f} x={960} y={960} s={1.0} keys={[{at: 0, pose: 'point_up', expr: 'happy', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: Just Some Forms? ============
  {
    const sn = w('c1a', 'snacks');
    const pr = w('c1a', 'print');
    q(A('c1a') + 4, 'pop', 0.5);
    q(sn, 'pop2', 0.4);
    q(pr, 'paper', 0.6);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <DivorceForms x={960} y={520} s={0.6 * P(A('c1a'))} />
          <Dave f={f} x={560} y={930} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.6}]} />
          <Bob f={f} x={1320} y={930} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}]} />
          <G2 x={1320} y={320} s={P(A('c1a')) * bump(sn, 0.1)}><Bubble text="thanks Dave!" size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const oh = w('c1b', 'one');
    const hd = w('c1b', 'hundred');
    const st = w('c1b', 'state');
    q(oh, 'pop', 0.5);
    q(hd, 'cash', 0.7);
    q(st, 'pop2', 0.4);
    scene(A('c1b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c1b'))}><Text size={48}>FILING FEES</Text></G2>
          <G2 x={960} y={520} s={P(A('c1b'))}>
            <rect x={-480} y={-180} width={960} height={360} rx={28} fill={f >= hd ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={52} color={GRAY}>state fees</Text>
            <Text y={40} size={100} color={C.green}>{f >= hd ? '$100 – $400' : '$? – $?'}</Text>
          </G2>
          <SourceTag f={f} at={oh} text="filing fees vary by state, $100–$400+" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const sv = w('c1c', 'survey');
    const th = w('c1c', 'three');
    const tt = w('c1c', 'total');
    q(sv, 'paper', 0.5);
    q(th, 'cash', 0.7);
    q(tt, 'ding', 0.5);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={680} y={520} s={0.95 * P(A('c1c'))} org="MARTINDALE-NOLO SURVEY" sub="PEOPLE WITHOUT LAWYERS" title={['median cost']} stat={f >= th ? '$300' : '$?'} statLabel={f >= tt ? 'TOTAL' : '...'} color={C.green} />
          <Dave f={f} x={1440} y={930} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
          <SourceTag f={f} at={sv} text="Martindale-Nolo Research 2019 divorce survey" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const fp = w('c1d', 'flat');
    const pk = w('c1d', 'pack');
    const sc = w('c1d', 'scary');
    const cp = w('c1d', 'cheap');
    q(fp, 'pop', 0.5);
    q(pk, 'boing', 0.4);
    q(sc, 'buzz', 0.5);
    q(cp, 'ding', 0.6);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c1d'))}><Text size={48}>like flat-pack furniture</Text></G2>
          <G2 x={560} y={560} s={1.2 * P(A('c1d'))}>
            <rect x={-200} y={-180} width={400} height={360} rx={20} fill="#F5DEB3" stroke={C.ink} strokeWidth={6} />
            <rect x={-160} y={-140} width={320} height={30} fill="#8B4513" />
            {[-80, -20, 40, 100].map((y) => <rect key={y} x={-140} y={y} width={280} height={20} fill="#8B4513" />)}
            <Text y={-140} size={24} color="#fff" stroke={C.ink} sw={4}>INSTRUCTIONS</Text>
          </G2>
          <G2 x={1360} y={560} s={1.0 * P(A('c1d'))}>
            <Text y={-100} size={36} color={f >= sc ? C.red : GRAY}>{f >= sc ? 'ANNOYING' : '...'}</Text>
            <Text y={-40} size={36} color={f >= sc ? C.red : GRAY}>{f >= sc ? 'SCARY' : '...'}</Text>
            <Text y={40} size={48} color={f >= cp ? C.green : GRAY}>{f >= cp ? 'CHEAP' : '...'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const wf = w('c1e', 'wife');
    const in1 = w('c1e', 'instructions');
    const lr = w('c1e', 'lawyer');
    const pn = w('c1e', 'panicked');
    q(wf, 'pop', 0.5);
    q(in1, 'buzz', 0.6);
    q(lr, 'stamp', 0.7);
    q(pn, 'thud', 0.6);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={420} y={900} w={500} />
          <Wife f={f} x={420} y={930} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: 0.6}]} />
          <G2 x={420} y={340} s={bump(in1, 0.12)}><Bubble text="I hired a lawyer." size={38} tail="down" /></G2>
          <Desk x={1500} y={900} w={500} />
          <Bob f={f} x={1500} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: pn, pose: 'panic', expr: 'shock', look: -0.6}]} />
          <G2 x={1500} y={340} s={bump(pn, 0.15)} o={lt(pn, 0.35)}><Bubble text="panic hire!" size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const tw = w('c1f', 'two');
    const bl = w('c1f', 'bill');
    const ab = w('c1f', 'about');
    q(tw, 'pop2', 0.4);
    q(bl, 'paper', 0.6);
    q(ab, 'stamp', 0.7);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={600} />
          <LawyerBill x={960} y={500} s={0.7 * P(A('c1f')) * bump(bl, 0.06)} topic="GRAY COUCH" hours="1.5" rate="$344" total="$516" hl={ease(f, ab, ab + 20)} />
          <Bob f={f} x={560} y={930} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.6}]} />
          <Dave f={f} x={1360} y={930} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} sweat />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: The $516 Couch ============
  {
    const rd = w('c2a', 'read');
    const on = w('c2a', 'one');
    const hf = w('c2a', 'half');
    q(A('c2a') + 4, 'pop', 0.5);
    q(rd, 'paper', 0.5);
    q(on, 'ding', 0.5);
    q(hf, 'pop2', 0.4);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={640} />
          <LawyerBill x={760} y={500} s={0.6 * P(A('c2a'))} topic="GRAY COUCH" hours="1.5" rate="$344" total="$516" />
          <Dave f={f} x={440} y={930} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.6}]} hold={{item: <LawyerBill topic="..." hours="..." rate="..." total="..." s={0.35} />, side: 'r'}} />
          <Bob f={f} x={1480} y={930} s={1.05} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const lw = w('c2b', 'lawyer');
    const th = w('c2b', 'three');
    const av = w('c2b', 'average');
    q(lw, 'pop', 0.5);
    q(th, 'cash', 0.7);
    q(av, 'stamp', 0.6);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c2b'))}><Text size={50} color={GRAY}>family lawyer hourly rate</Text></G2>
          <G2 x={960} y={520} s={P(A('c2b'))}>
            <rect x={-420} y={-160} width={840} height={320} rx={28} fill={f >= th ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={0} size={140} color={C.red}>{f >= th ? '$344' : '$??'}</Text>
            <Text y={90} size={44} color={GRAY}>/hour</Text>
          </G2>
          <SourceTag f={f} at={av} text="Clio Legal Trends 2025: family law avg $344/hour" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const on = w('c2c', 'one');
    const tm = w('c2c', 'times');
    const ff = w('c2c', 'five');
    q(on, 'pop', 0.4);
    q(tm, 'tick', 0.5);
    q(ff, 'cash', 0.8);
    dmg = 516;
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={300} s={P(A('c2c'))}><Text size={70}>1.5 hours × $344</Text></G2>
          <G2 x={960} y={540} s={1.2 * P(A('c2c')) * bump(ff, 0.08)}>
            <rect x={-320} y={-120} width={640} height={240} rx={24} fill={f >= ff ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={0} size={120} color={C.red}>{f >= ff ? '$516' : '$?'}</Text>
          </G2>
          <DamageMeter x={1720} y={100} s={0.9} value={money(dmg)} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const co = w('c2d', 'couch');
    const fo = w('c2d', 'four');
    q(co, 'pop', 0.5);
    q(fo, 'cash', 0.6);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Couch x={560} y={540} s={1.2 * P(A('c2d'))} color="#888" tag={f >= fo ? '$400' : "BOB'S COUCH"} />
          <G2 x={1360} y={300} s={P(A('c2d'))}><Text size={54}>bill for the couch</Text></G2>
          <G2 x={1360} y={540} s={1.2 * bump(fo, 0.1)}>
            <rect x={-240} y={-110} width={480} height={220} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={100} color={C.red}>{f >= fo ? '$516' : '$?'}</Text>
          </G2>
          <G2 x={1360} y={820} s={bump(fo, 0.12)} o={lt(fo, 0.35)}><Text size={46} color={C.red}>MORE than the couch!</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const tx = w('c2e', 'taxi');
    const pk = w('c2e', 'parking');
    const mt = w('c2e', 'meter');
    q(tx, 'boing', 0.5);
    q(pk, 'pop2', 0.4);
    q(mt, 'tick', 0.6);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={960} y={180} s={P(A('c2e'))}><Text size={52}>like a taxi going nowhere</Text></G2>
          <G2 x={820} y={820} s={2.2}>
            <rect x={-140} y={-80} width={280} height={160} rx={16} fill="#FFD54F" stroke={C.ink} strokeWidth={5} />
            <circle cx={-70} cy={0} r={36} fill={C.ink} />
            <circle cx={70} cy={0} r={36} fill={C.ink} />
            <rect x={-100} y={-120} width={200} height={60} rx={8} fill="#FF5252" stroke={C.ink} strokeWidth={4} />
            <Text y={-88} size={32} color="#fff">TAXI</Text>
          </G2>
          <Bob f={f} x={580} y={680} s={0.5} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: 0.6}]} />
          <Wife f={f} x={1060} y={680} s={0.5} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: -0.6}]} flip />
          <G2 x={1560} y={600} s={1.4 * bump(mt, 0.1)}>
            <Text size={64} color={C.red}>$516</Text>
            <Text y={70} size={38} color={GRAY}>meter running</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const gs = w('c2f', 'guess');
    const cm = w('c2f', 'comments');
    q(gs, 'pop', 0.6);
    for (let i = 0; i < 6; i++) q(gs + 20 + i * 30, 'tick', 0.35);
    q(cm, 'ding', 0.5);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GuessCard f={f} x={820} y={500} s={P(A('c2f')) * bump(gs, 0.06)} q={['If they agreed on everything,', 'average divorce with lawyers costs?']} />
          <Dave f={f} x={1600} y={930} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
          <G2 x={820} y={880} s={bump(cm, 0.12)} o={lt(cm, 0.4)}><Text size={36} color={C.navy}>write your number</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const on = w('c2g', 'one');
    const tw = w('c2g', 'twelve');
    q(on, 'ding', 0.5);
    q(tw, 'stamp', 0.6);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={720} y={240} s={P(A('c2g'))}><Text size={50}>couch = item one</Text></G2>
          <FightList x={960} y={620} s={0.75 * P(A('c2g'))} items={['gray couch', 'TV', 'dog', 'house', '...8 more']} struck={0} />
          <G2 x={1580} y={680} s={bump(tw, 0.15)} o={lt(tw, 0.35)}>
            <rect x={-140} y={-80} width={280} height={160} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={90} color={C.red}>12</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: The Meter Ticks Twice ============
  {
    const cl = w('c3a', 'calculator');
    const nx = w('c3a', 'next');
    q(A('c3a') + 4, 'pop', 0.5);
    q(cl, 'key', 0.5);
    q(nx, 'paper', 0.6);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={680} />
          {[0, 1, 2].map((i) => <LawyerBill key={i} x={680 + i * 60} y={420 - i * 40} s={0.45} topic="..." hours="..." rate="$344" total="..." />)}
          <Dave f={f} x={1460} y={930} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'worried', look: -0.6}]} />
          <Bob f={f} x={460} y={930} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const em = w('c3b', 'email');
    const rd = w('c3b', 'reads');
    const bl = w('c3b', 'bill');
    q(em, 'mail', 0.5);
    q(rd, 'pop', 0.4);
    q(bl, 'cash', 0.6);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={460} y={400} s={P(A('c3b'))} o={0.7}>
            <Envelope s={1.2} label="from Bob's lawyer" />
          </G2>
          <path d="M 600 400 L 1320 400" stroke={C.blue} strokeWidth={8} strokeDasharray="16 12" markerEnd="url(#arrow1)" />
          <G2 x={1460} y={400} s={P(A('c3b'))} o={0.7}>
            <Envelope s={1.2} label="to wife's lawyer" />
          </G2>
          <G2 x={960} y={720} s={P(A('c3b'))}><Text size={54} color={C.red}>BOTH LAWYERS BILL</Text></G2>
          <defs><marker id="arrow1" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill={C.blue} /></marker></defs>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const py = w('c3c', 'pays');
    const hr = w('c3c', 'hour');
    const sx = w('c3c', 'six');
    q(py, 'cash', 0.6);
    q(hr, 'tick', 0.5);
    q(sx, 'stamp', 0.8);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c3c'))}><Text size={50}>every hour of arguing</Text></G2>
          <G2 x={960} y={520} s={P(A('c3c'))}>
            <rect x={-560} y={-180} width={1120} height={360} rx={30} fill={f >= sx ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-70} size={52} color={GRAY}>2 lawyers × $344</Text>
            <Text y={40} size={150} color={C.red}>{f >= sx ? '$688' : '$?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const it = w('c3d', 'item');
    const hm = w('c3d', 'house');
    const fw = w('c3d', 'few');
    q(it, 'pop', 0.4);
    q(hm, 'boing', 0.5);
    q(fw, 'tick', 0.6);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <FightList x={720} y={560} s={0.7 * P(A('c3d'))} items={['gray couch', 'TV', 'dog', 'house']} struck={0} />
          <G2 x={1460} y={440} s={1.6 * bump(hm, 0.1)}><House sold="?" /></G2>
          <G2 x={1460} y={800} s={bump(fw, 0.12)} o={lt(fw, 0.35)}><Text size={42} color={C.red}>few more hours</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const dm = w('c3e', 'damage');
    const th = w('c3e', 'three');
    const tn = w('c3e', 'ten');
    const nt = w('c3e', 'nothing');
    q(dm, 'pop', 0.5);
    q(th, 'cash', 0.7);
    q(tn, 'stamp', 0.8);
    q(nt, 'buzz', 0.5);
    dmg = 3440;
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={720} y={280} s={P(A('c3e'))}><Text size={52} color={GRAY}>10 hours billed</Text></G2>
          <G2 x={720} y={540} s={1.4 * bump(th, 0.1)}>
            <rect x={-360} y={-140} width={720} height={280} rx={26} fill={f >= th ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={0} size={140} color={C.red}>{f >= th ? money(dmg) : '$?'}</Text>
          </G2>
          <G2 x={720} y={820} s={bump(nt, 0.12)} o={lt(nt, 0.35)}><Text size={44} color={C.red}>nothing decided yet</Text></G2>
          <DamageMeter x={1720} y={100} s={0.9} value={money(dmg)} />
          <Bob f={f} x={1560} y={960} s={0.85} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const th = w('c3f', 'theory');
    const bg = w('c3f', 'big');
    const sk = w('c3f', 'skip');
    q(th, 'pop', 0.5);
    q(bg, 'ding', 0.5);
    q(sk, 'pop2', 0.4);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={600} />
          <Dave f={f} x={680} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={680} y={340} s={P(A('c3f')) * bump(th, 0.1)}><Bubble text="skip small, fight big!" size={38} tail="down" /></G2>
          <G2 x={1380} y={540} s={1.4 * P(A('c3f'))}>
            <rect x={-240} y={-140} width={480} height={280} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-70} size={36} color={GRAY}>small:</Text>
            <Text y={-20} size={44}>couch, TV, dog</Text>
            <Text y={60} size={36} color={GRAY}>big:</Text>
            <Text y={110} size={48} color={C.red}>HOUSE</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const wr = w('c3g', 'wrong');
    const rl = w('c3g', 'real');
    const hd = w('c3g', 'hiding');
    q(wr, 'buzz', 0.7);
    q(rl, 'pop', 0.5);
    q(hd, 'sting', 0.5);
    scene(A('c3g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.6}]} />
          <G2 x={1280} y={400} s={P(A('c3g')) * bump(wr, 0.15)}>
            <rect x={-400} y={-120} width={800} height={240} rx={24} fill="#FFF" stroke={C.red} strokeWidth={7} />
            <Text y={0} size={80} color={C.red}>WRONG</Text>
          </G2>
          <G2 x={1280} y={720} s={bump(hd, 0.12)} o={lt(hd, 0.35)}><Text size={44} color={C.navy}>the answer is in the survey</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: Not What. How Many. ============
  {
    const op = w('c4a', 'opened');
    const ln = w('c4a', 'line');
    q(A('c4a') + 4, 'pop', 0.5);
    q(op, 'paper', 0.6);
    q(ln, 'ding', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={600} />
          <G2 x={840} y={480} s={0.8 * P(A('c4a')) * bump(op, 0.06)}>
            <rect x={-320} y={-260} width={640} height={520} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-200} size={32} color={GRAY}>MARTINDALE-NOLO</Text>
            {[-140, -100, -60, -20, 20, 60].map((y) => <rect key={y} x={-280} y={y} width={560} height={12} rx={6} fill="#E0E0E0" />)}
            <rect x={-280} y={110} width={560} height={24} rx={8} fill={C.yellow} />
            <Text y={122} size={24} color={C.red}>type of fight ≈ same cost</Text>
          </G2>
          <Dave f={f} x={1480} y={930} s={1.1} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const ty = w('c4b', 'type');
    const br = w('c4b', 'barely');
    const mt = w('c4b', 'mattered');
    const mn = w('c4b', 'many');
    q(ty, 'pop', 0.4);
    q(br, 'buzz', 0.5);
    q(mt, 'stamp', 0.6);
    q(mn, 'ding', 0.5);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c4b'))}><Text size={52}>not WHAT. HOW MANY.</Text></G2>
          <G2 x={560} y={520} s={P(A('c4b'))}>
            <rect x={-240} y={-180} width={480} height={360} rx={20} fill="#F5F5F5" stroke={C.ink} strokeWidth={5} />
            <Text y={-100} size={36} color={GRAY}>kids</Text>
            <Text y={-40} size={36} color={GRAY}>money</Text>
            <Text y={20} size={36} color={GRAY}>house</Text>
            <Text y={100} size={38} color={f >= mt ? C.red : C.ink}>{f >= mt ? "didn't matter much" : '...'}</Text>
          </G2>
          <G2 x={1360} y={520} s={P(A('c4b')) * bump(mn, 0.1)}>
            <rect x={-280} y={-180} width={560} height={360} rx={20} fill={f >= mn ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-80} size={48} color={C.red}>HOW MANY</Text>
            <Text y={20} size={44}>fights</Text>
            <Text y={100} size={46} color={C.red}>+ trial?</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const gs = w('c4c', 'guess');
    const ag = w('c4c', 'agreed');
    const fo = w('c4c', 'four');
    q(gs, 'pop', 0.5);
    q(ag, 'ding', 0.6);
    q(fo, 'cash', 0.8);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={820} y={200} s={P(A('c4c'))}><Text size={48}>REMEMBER YOUR GUESS?</Text></G2>
          <SourceCard x={920} y={600} s={0.95 * P(A('c4c')) * bump(fo, 0.08)} org="MARTINDALE-NOLO" sub="COUPLES WITH LAWYERS" title={['agreed on everything']} stat={f >= fo ? '$4,100' : '$?'} statLabel="average" color={C.green} />
          <SourceTag f={f} at={ag} text="Martindale-Nolo: uncontested w/ lawyers avg $4,100" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const ft = w('c4d', 'fought');
    const sx = w('c4d', 'six');
    q(ft, 'pop', 0.5);
    q(sx, 'cash', 0.7);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={920} y={520} s={0.95 * P(A('c4d')) * bump(sx, 0.08)} org="MARTINDALE-NOLO" sub="FOUGHT, THEN SETTLED" title={['outside of court']} stat={f >= sx ? '$10,600' : '$?'} statLabel="average" color={C.navy} />
          <SourceTag f={f} at={ft} text="Martindale-Nolo: fought & settled avg $10,600" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const tr = w('c4e', 'trial');
    const on = w('c4e', 'one');
    const tw = w('c4e', 'twenty');
    const mr = w('c4e', 'more');
    const tf = w('c4e', 'twenty', 1);
    q(tr, 'pop', 0.5);
    q(on, 'ding', 0.5);
    q(tw, 'stamp', 0.8);
    q(mr, 'thud', 0.6);
    q(tf, 'stamp', 0.7);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={360} s={P(A('c4e')) * bump(tw, 0.1)}>
            <rect x={-280} y={-140} width={560} height={280} rx={22} fill={f >= tw ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-70} size={36} color={GRAY}>trial · 1 issue</Text>
            <Text y={30} size={90} color={C.red}>{f >= tw ? '$20,400' : '$?'}</Text>
          </G2>
          <G2 x={1360} y={360} s={P(A('c4e')) * bump(tf, 0.1)}>
            <rect x={-280} y={-140} width={560} height={280} rx={22} fill={f >= tf ? '#FFB3B3' : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-70} size={36} color={GRAY}>trial · 2+ issues</Text>
            <Text y={30} size={90} color={C.red}>{f >= tf ? '$23,300' : '$?'}</Text>
          </G2>
          <G2 x={960} y={780} s={bump(mr, 0.12)} o={lt(mr, 0.35)}><Text size={48} color={C.red}>PER PERSON</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const st = w('c4f', 'staircase');
    const dw = w('c4f', 'down');
    const bs = w('c4f', 'basement');
    const sp = w('c4f', 'step');
    q(st, 'pop', 0.5);
    q(dw, 'step', 0.5);
    q(dw + 10, 'step', 0.5);
    q(dw + 20, 'step', 0.5);
    q(bs, 'thud', 0.6);
    q(sp, 'cash', 0.6);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c4f'))}><Text size={48}>like a staircase into a basement</Text></G2>
          <CostStaircase x={960} y={600} s={0.75 * P(A('c4f'))} step={ease(f, sp, sp + 30) > 0.5 ? 2 : -1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const ls = w('c4g', 'losing');
    const st = w('c4g', 'step');
    const gt = w('c4g', 'getting');
    q(ls, 'pop', 0.5);
    q(st, 'thud', 0.6);
    q(gt, 'sting', 0.5);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={300} y={930} s={1.1 * P(A('c4g'))} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={1300} y={400} s={P(A('c4g')) * bump(st, 0.1)}><Text size={54} color={C.red}>BOTH LOSING $$$</Text></G2>
          <G2 x={1300} y={620} s={P(A('c4g')) * bump(gt, 0.12)} o={lt(gt, 0.35)}><Text size={52} color={C.ink}>who's getting paid?</Text></G2>
          <Bob f={f} x={640} y={930} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.6}]} />
          <Wife f={f} x={900} y={930} s={1.05} flip keys={[{at: 0, pose: 'shrug', expr: 'sad', look: -0.6}]} />
          <G2 x={770} y={560} s={P(A('c4g')) * bump(ls, 0.12)}><Text size={44} color={C.red}>-$ -$ -$</Text></G2>
          <MoneyStack x={1300} y={840} s={1.1 * P(A('c4g')) * bump(gt, 0.14)} n={5} label="WHO GETS THIS?" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: Who Owns The Clock? ============
  {
    const dw = w('c5a', 'drew');
    const wb = w('c5a', 'whiteboard');
    const ar = w('c5a', 'arrows');
    q(A('c5a') + 4, 'pop', 0.5);
    q(dw, 'scribble', 0.6);
    q(wb, 'marker', 0.5);
    q(ar, 'pop', 0.5);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Whiteboard x={960} y={540} s={0.85 * P(A('c5a'))} arrows={ease(f, ar, ar + 40) > 0.3 ? 3 : ease(f, ar, ar + 40) > 0.1 ? 2 : 0} />
          <Dave f={f} x={420} y={960} s={0.9} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const vl = w('c5b', 'villain');
    const wf = w('c5b', 'wife');
    const lw = w('c5b', 'lawyers');
    const cl = w('c5b', 'clock');
    q(vl, 'sting', 0.7);
    q(wf, 'pop', 0.4);
    q(lw, 'pop2', 0.4);
    q(cl, 'stamp', 0.8);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c5b')) * bump(vl, 0.12)}><Text size={60} color={C.red}>THE VILLAIN</Text></G2>
          <G2 x={560} y={480} s={P(A('c5b'))} o={f >= cl ? 0.4 : 1}>
            <rect x={-220} y={-120} width={440} height={240} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-50} size={40}>not Bob's wife</Text>
            <Text y={20} size={40}>not the lawyers</Text>
          </G2>
          <G2 x={560} y={480} s={0.4 * bump(wf, 0.2)} o={lt(wf, 0.0001)}><XMark /></G2>
          <G2 x={1360} y={480} s={1.3 * P(A('c5b')) * bump(cl, 0.1)}>
            <rect x={-260} y={-140} width={520} height={280} rx={24} fill={f >= cl ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={48} color={C.red}>THE HOURLY</Text>
            <Text y={20} size={72} color={C.red}>CLOCK</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const wn = w('c5c', 'win');
    const ls = w('c5c', 'lose');
    const co = w('c5c', 'couch');
    q(wn, 'ding', 0.5);
    q(ls, 'buzz', 0.5);
    q(co, 'cash', 0.7);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c5c'))}><Text size={52}>the clock gets paid...</Text></G2>
          <G2 x={360} y={460} s={P(A('c5c')) * bump(wn, 0.1)}>
            <rect x={-180} y={-100} width={360} height={200} rx={18} fill={C.green} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={56} color="#fff">when you WIN</Text>
          </G2>
          <G2 x={960} y={460} s={P(A('c5c')) * bump(ls, 0.1)}>
            <rect x={-180} y={-100} width={360} height={200} rx={18} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={56} color="#fff">when you LOSE</Text>
          </G2>
          <G2 x={1560} y={460} s={P(A('c5c')) * bump(co, 0.1)}>
            <rect x={-220} y={-100} width={440} height={200} rx={18} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={50} color={C.ink}>when you argue</Text>
            <Text y={60} size={40} color={C.ink}>over a couch</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const lt = w('c5d', 'lot');
    const cd = w('c5d', 'c');
    const sx = w('c5d', 'six');
    const sv = w('c5d', 'seventy');
    q(lt, 'pop', 0.5);
    q(cd, 'paper', 0.5);
    q(sx, 'cash', 0.7);
    q(sv, 'stamp', 0.6);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c5d'))}><Text size={50}>and there are a LOT of clocks</Text></G2>
          <SourceCard x={920} y={580} s={0.95 * P(A('c5d')) * bump(sv, 0.08)} org="CDC / NCHS" sub="2023 (45 STATES)" title={['divorces in one year']} stat={f >= sv ? '672,502' : '???'} statLabel="" color={C.navy} />
          <SourceTag f={f} at={cd} text="CDC FastStats: 672,502 divorces in 2023" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const ev = w('c5e', 'every');
    const mt = w('c5e', 'meter');
    const cr = w('c5e', 'care');
    q(ev, 'tick', 0.6);
    q(mt, 'cash', 0.7);
    q(cr, 'sting', 0.5);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={260} s={P(A('c5e'))}><Text size={52}>two people, one meter</Text></G2>
          <Bob f={f} x={520} y={680} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.6}]} />
          <Wife f={f} x={1400} y={680} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}]} flip />
          <G2 x={960} y={560} s={1.6 * bump(mt, 0.1)}>
            <circle r={90} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
            <Text y={0} size={60} color={C.red}>$$$</Text>
          </G2>
          <G2 x={960} y={920} s={bump(cr, 0.12)} o={lt(cr, 0.35)}><Text size={46} color={GRAY}>meter doesn't care who's right</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // SUB REMINDER after villain reveal
  const SUB = w('c5e', 'meter') + 20;
  subCues(SUB).forEach((c) => cues.push(c));

  {
    const sh = w('c5f', 'showed');
    const nd = w('c5f', 'nodded');
    const tr = w('c5f', 'trial');
    q(sh, 'pop', 0.5);
    q(nd, 'ding', 0.4);
    q(tr, 'stamp', 0.8);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={420} y={900} w={500} />
          <Whiteboard x={420} y={480} s={0.45 * P(A('c5f'))} arrows={3} />
          <Dave f={f} x={420} y={960} s={0.95} keys={[{at: 0, pose: 'point_r', expr: 'neutral', look: 0.6}]} />
          <Desk x={1500} y={900} w={500} />
          <Bob f={f} x={1500} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: tr, pose: 'hips', expr: 'grin', look: -0.6}]} />
          <G2 x={1500} y={340} s={bump(tr, 0.15)} o={lt(tr, 0.35)}><Bubble text="let's go to trial!" size={42} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: Bob's Terrible Plan ============
  {
    const pn = w('c6a', 'plan');
    const hs = w('c6a', 'house');
    const cs = w('c6a', 'cash');
    q(A('c6a') + 4, 'pop', 0.5);
    q(pn, 'ding', 0.5);
    q(hs, 'boing', 0.5);
    q(cs, 'cash', 0.6);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={600} />
          <Bob f={f} x={720} y={930} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'grin', look: 0.6}]} />
          <Dave f={f} x={1260} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}]} />
          <G2 x={720} y={340} s={P(A('c6a')) * bump(pn, 0.1)}><Bubble text="win the house, cash out 401(k)!" size={36} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const mt = w('c6b', 'math');
    const tr = w('c6b', 'trial');
    const tw = w('c6b', 'twenty');
    const sc = w('c6b', 'sick');
    q(mt, 'key', 0.5);
    q(tr, 'stamp', 0.7);
    q(tw, 'cash', 0.8);
    q(sc, 'buzz', 0.6);
    dmg = 20400;
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={720} y={280} s={P(A('c6b'))}><Text size={50}>a trial puts Bob on...</Text></G2>
          <CostStaircase x={960} y={680} s={0.75 * P(A('c6b'))} step={ease(f, tw, tw + 20) > 0.5 ? 2 : -1} />
          <DamageMeter x={1720} y={100} s={0.9} value={money(dmg)} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const cs = w('c6c', 'cashing');
    const in1 = w('c6c', 'income');
    const pn = w('c6c', 'penalty');
    q(cs, 'cash', 0.6);
    q(in1, 'thud', 0.6);
    q(pn, 'stamp', 0.8);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c6c'))}><Text size={50}>cashing out early 401(k)</Text></G2>
          <G2 x={560} y={540} s={P(A('c6c')) * bump(in1, 0.1)}>
            <rect x={-240} y={-140} width={480} height={280} rx={22} fill={f >= in1 ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={40} color={GRAY}>income tax</Text>
            <Text y={30} size={70} color={C.red}>OWED</Text>
          </G2>
          <G2 x={1360} y={540} s={P(A('c6c')) * bump(pn, 0.1)}>
            <rect x={-280} y={-140} width={560} height={280} rx={22} fill={f >= pn ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={44} color={GRAY}>IRS penalty</Text>
            <Text y={30} size={90} color={C.red}>{f >= pn ? '10%' : '?%'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const bk = w('c6d', 'bucket');
    const pk = w('c6d', 'poking');
    const hl = w('c6d', 'hole');
    q(bk, 'pop', 0.5);
    q(pk, 'poof', 0.4);
    q(hl, 'tick', 0.5);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('c6d'))}><Text size={48}>like carrying water in a leaky bucket</Text></G2>
          <Bob f={f} x={420} y={930} s={1.1} walk keys={[{at: 0, pose: 'carry', expr: 'worried', look: 0.6}]} sweat />
          <G2 x={960} y={560} s={1.9 * P(A('c6d')) * bump(bk, 0.06)}>
          <rect x={-80} y={-120} width={160} height={140} rx={8} fill={C.blue} stroke={C.ink} strokeWidth={5} opacity={0.7} />
          <circle cx={60} cy={20} r={12} fill={C.red} />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={60} cy={40 + ((i * 30 + f * 3) % 120)} r={6} fill={C.blue} opacity={0.6} />)}
          </G2>
          <G2 x={1480} y={520} s={P(A('c6d')) * bump(hl, 0.14)}>
          <rect x={-230} y={-130} width={460} height={260} rx={24} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
          <Text y={-50} size={40} color={C.ink}>THE HOLE =</Text>
          <Text y={40} size={56} color={C.red}>IRS PENALTY</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const af = w('c6e', 'after');
    const hm = w('c6e', 'home');
    const rn = w('c6e', 'rent');
    const pz = w('c6e', 'pizza');
    q(af, 'pop', 0.5);
    q(hm, 'boing', 0.5);
    q(rn, 'cash', 0.6);
    q(pz, 'crinkle', 0.4);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c6e'))}><Text size={48}>after divorce: everything splits</Text></G2>
          <G2 x={460} y={480} s={P(A('c6e')) * bump(hm, 0.1)}>
            <House s={0.9} sold="BOB'S NEW HOME" />
          </G2>
          <G2 x={1460} y={480} s={P(A('c6e')) * bump(hm, 0.1)}>
            <House s={0.9} sold="WIFE'S NEW HOME" />
          </G2>
          <G2 x={960} y={820} s={bump(pz, 0.12)} o={lt(pz, 0.35)}><Text size={44} color={C.red}>one pizza → two boxes</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const dm = w('c6f', 'damage');
    const ov = w('c6f', 'over');
    const pl = w('c6f', 'plus');
    const sm = w('c6f', 'summer');
    q(dm, 'pop', 0.5);
    q(ov, 'stamp', 0.8);
    q(pl, 'cash', 0.6);
    q(sm, 'thud', 0.6);
    dmg = 20400;
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={720} y={280} s={P(A('c6f'))}><Text size={52} color={C.red}>BOB'S PROJECTION</Text></G2>
          <G2 x={720} y={580} s={1.3 * bump(ov, 0.1)}>
            <rect x={-340} y={-140} width={680} height={280} rx={24} fill={f >= ov ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-50} size={52} color={GRAY}>trial</Text>
            <Text y={40} size={100} color={C.red}>{f >= ov ? '> $20K' : '$?'}</Text>
          </G2>
          <G2 x={720} y={860} s={bump(pl, 0.12)} o={lt(pl, 0.35)}><Text size={38} color={C.red}>+ penalty + rent</Text></G2>
          <DamageMeter x={1720} y={100} s={0.9} value={f >= ov ? '> $20K' : money(dmg)} />
          <Couch x={1560} y={900} s={0.7} color="#E07A5F" tag="DAVE'S" />
          <G2 x={1560} y={1010 - 60} s={bump(sm, 0.12)} o={lt(sm, 0.35)}><Text size={34} color={C.red}>Bob on couch til summer</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const hp = w('c6g', 'hopeless');
    const nt = w('c6g', 'noticed');
    const bl = w('c6g', 'bill');
    q(hp, 'sting', 0.6);
    q(nt, 'pop', 0.5);
    q(bl, 'ding', 0.5);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={680} />
          {[0, 1, 2].map((i) => <LawyerBill key={i} x={680 + i * 60} y={420 - i * 40} s={0.45} topic="..." hours="..." rate="$344" total="..." />)}
          <Dave f={f} x={460} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}]} />
          <Bob f={f} x={1460} y={930} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: -0.6}]} />
          <G2 x={960} y={180} s={bump(nt, 0.12)} o={lt(nt, 0.35)}><Text size={46} color={C.navy}>Dave noticed one tiny thing...</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: The $688 Question ============
  {
    const sk = w('c7a', 'stuck');
    const sn = w('c7a', 'sticky');
    const nt = w('c7a', 'note');
    const ls = w('c7a', 'list');
    q(A('c7a') + 4, 'pop', 0.5);
    q(sk, 'paper', 0.5);
    q(sn, 'pop2', 0.5);
    q(nt, 'marker', 0.5);
    q(ls, 'scribble', 0.5);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={900} w={680} />
          <FightList x={720} y={520} s={0.55 * P(A('c7a'))} items={['gray couch', 'TV', 'dog', 'house', 'savings', 'car', 'tools', '...5 more']} struck={0} />
          {[0, 1, 2].map((i) => <StickyNote key={i} x={1180 + i * 180} y={340 + i * 60} s={0.45 * bump(sn + i * 6, 0.12)} text="Worth an hour of 2 lawyers?" size={20} r={-8 + i * 5} />)}
          <Dave f={f} x={1480} y={960} s={0.9} keys={[{at: 0, pose: 'point_l', expr: 'happy', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const rm = w('c7b', 'reminder');
    const ed = w('c7b', 'education');
    const ev = w('c7b', 'every');
    const sm = w('c7b', 'some');
    const sf = w('c7b', 'safety');
    q(rm, 'pop', 0.5);
    q(ed, 'ding', 0.5);
    q(ev, 'pop2', 0.4);
    q(sm, 'stamp', 0.6);
    q(sf, 'heart', 0.5);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={240} s={P(A('c7b')) * bump(rm, 0.1)}>
            <rect x={-560} y={-100} width={1120} height={200} rx={24} fill={C.navy} stroke={C.ink} strokeWidth={7} />
            <Text y={0} size={54} color="#fff">EDUCATION, NOT ADVICE</Text>
          </G2>
          <G2 x={960} y={500} s={P(A('c7b'))}><Text size={42}>every situation is different</Text></G2>
          <G2 x={960} y={680} s={bump(sf, 0.12)} o={lt(sf, 0.35)}><Text size={46} color={C.red}>safety & kids REALLY matter</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const ct = w('c7c', 'couch');
    const fo = w('c7c', 'four');
    const vs = w('c7c', 'versus');
    const lg = w('c7c', 'let');
    q(ct, 'pop', 0.5);
    q(fo, 'cash', 0.6);
    q(vs, 'stamp', 0.7);
    q(lg, 'whoosh_s', 0.5);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Couch x={520} y={440} s={1.0 * P(A('c7c'))} color="#888" tag={f >= fo ? '$400' : '?'} />
          <G2 x={960} y={600} s={bump(vs, 0.15)}><Text size={80} color={C.red}>vs</Text></G2>
          <G2 x={1400} y={480} s={1.2 * bump(vs, 0.1)}>
            <rect x={-240} y={-140} width={480} height={280} rx={22} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
            <Text y={-50} size={40} color={GRAY}>1 hour</Text>
            <Text y={40} size={70} color={C.red}>$688</Text>
          </G2>
          <G2 x={960} y={900} s={bump(lg, 0.12)} o={lt(lg, 0.35)}><Text size={48} color={C.green}>Bob let it go</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const bg = w('c7d', 'big');
    const md = w('c7d', 'mediation');
    const nt = w('c7d', 'neutral');
    const pr = w('c7d', 'private');
    const th = w('c7d', 'three');
    const tn = w('c7d', 'ten');
    q(bg, 'pop', 0.5);
    q(md, 'ding', 0.6);
    q(nt, 'pop2', 0.4);
    q(pr, 'cash', 0.6);
    q(th, 'cash', 0.5);
    q(tn, 'cash', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c7d'))}><Text size={50}>for the big stuff: MEDIATION</Text></G2>
          <G2 x={560} y={520} s={1.4 * P(A('c7d')) * bump(md, 0.08)}>
            <Mediator f={f} x={0} y={0} s={1.0} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0}]} />
            <Text y={200} size={40} color={C.navy}>ONE NEUTRAL</Text>
          </G2>
          <SourceCard x={1360} y={540} s={0.8 * P(A('c7d')) * bump(tn, 0.06)} org="ADR TIMES 2023" sub="PRIVATE MEDIATION" title={['typical cost']} stat={f >= tn ? '$3K–$10K' : '$?–$?'} statLabel={f >= th ? 'split between you' : '...'} color={C.navy} />
          <SourceTag f={f} at={pr} text="ADR Times 2023 via Nolo: typical $3K–$10K" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const ct = w('c7e', 'courts');
    const fr = w('c7e', 'free');
    const lw = w('c7e', 'low');
    const av = w('c7e', 'advice');
    q(ct, 'paper', 0.5);
    q(fr, 'ding', 0.6);
    q(lw, 'cash', 0.6);
    q(av, 'pop', 0.5);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={360} s={P(A('c7e')) * bump(fr, 0.1)}>
            <rect x={-280} y={-140} width={560} height={280} rx={22} fill={f >= fr ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={40} color={GRAY}>court mediation</Text>
            <Text y={30} size={64} color={C.green}>{f >= fr ? 'FREE or LOW' : '...'}</Text>
          </G2>
          <G2 x={1360} y={360} s={P(A('c7e')) * bump(av, 0.1)}>
            <rect x={-280} y={-140} width={560} height={280} rx={22} fill={f >= av ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-60} size={36} color={GRAY}>lawyer for advice only</Text>
            <Text y={30} size={56} color={C.navy}>{f >= av ? '≈ $4,600' : '≈ $?'}</Text>
          </G2>
          <G2 x={960} y={780} o={lt(av, 0.35)}><Text size={38} color={GRAY}>Martindale-Nolo survey</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const fo = w('c7f', 'four');
    const qd = w('c7f', 'q');
    const cv = w('c7f', 'court');
    const tn = w('c7f', 'ten');
    q(fo, 'pop', 0.5);
    q(qd, 'paper', 0.6);
    q(cv, 'stamp', 0.7);
    q(tn, 'ding', 0.6);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c7f'))}><Text size={48}>and the 401(k)?</Text></G2>
          <QDRO x={960} y={640} s={0.75 * P(A('c7f')) * bump(qd, 0.06)} />
          <SourceTag f={f} at={cv} text="IRS: QDRO from 401(k) = no 10% penalty" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const sg = w('c7g', 'signed');
    const dm = w('c7g', 'damage');
    const st = w('c7g', 'stopped');
    const wd = w('c7g', 'would');
    q(sg, 'paper', 0.6);
    q(dm, 'pop', 0.5);
    q(st, 'stamp', 0.7);
    q(wd, 'ding', 0.5);
    dmg = 10600;
    scene(A('c7g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={540} s={1.3 * P(A('c7g')) * bump(sg, 0.08)}>
            <Mediator f={f} x={0} y={0} s={1.0} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0}]} />
            <Text y={200} size={40} color={C.navy}>MEDIATION</Text>
          </G2>
          <G2 x={1360} y={540} s={P(A('c7g'))}><Text size={52}>meter stopped climbing</Text></G2>
          <DamageMeter x={1720} y={100} s={0.9} value={money(dmg)} />
          <G2 x={1360} y={840} s={bump(wd, 0.12)} o={lt(wd, 0.35)}><Text size={44} color={C.navy}>but would it work?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: Bob's Final Bill ============
  {
    const sx = w('c8a', 'six');
    const ot = w('c8a', 'out');
    const pf = w('c8a', 'paper');
    const ag = w('c8a', 'agreement');
    q(A('c8a') + 4, 'pop', 0.5);
    q(sx, 'pop2', 0.4);
    q(ot, 'whoosh_s', 0.4);
    q(pf, 'paper', 0.6);
    q(ag, 'stamp', 0.7);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={220} s={P(A('c8a'))}><Text size={48}>six weeks later...</Text></G2>
          <Bob f={f} x={960} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0}]} hold={{item: <Agreement signed={ease(f, ag, ag + 20)} s={0.4} />, side: 'r'}} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const nt = w('c8b', 'no');
    const bl = w('c8b', 'bill');
    const av = w('c8b', 'average');
    const sx = w('c8b', 'six');
    q(nt, 'ding', 0.5);
    q(bl, 'paper', 0.6);
    q(av, 'pop', 0.5);
    q(sx, 'cash', 0.7);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c8b'))}><Text size={50}>no trial · settled</Text></G2>
          <SourceCard x={920} y={580} s={0.95 * P(A('c8b')) * bump(sx, 0.08)} org="MARTINDALE-NOLO" sub="FOUGHT THEN SETTLED" title={['close to the average']} stat={f >= sx ? '$10,600' : '$?'} statLabel="" color={C.green} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const cm = w('c8c', 'compare');
    const tr = w('c8c', 'trial');
    const tw = w('c8c', 'twenty');
    const sv = w('c8c', 'saved');
    const nn = w('c8c', 'nine');
    q(cm, 'pop', 0.5);
    q(tr, 'stamp', 0.6);
    q(tw, 'cash', 0.7);
    q(sv, 'ding', 0.8);
    q(nn, 'cash', 0.9);
    dmg = 10600;
    savedMode = 1;
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={520} y={360} s={P(A('c8c')) * bump(tw, 0.1)}>
            <rect x={-260} y={-130} width={520} height={260} rx={22} fill="#FFE3EA" stroke={C.ink} strokeWidth={7} />
            <Text y={-50} size={38} color={GRAY}>trial step</Text>
            <Text y={30} size={80} color={C.red}>{f >= tw ? '$20,400' : '$?'}</Text>
          </G2>
          <G2 x={1400} y={360} s={P(A('c8c')) * bump(nn, 0.1)}>
            <rect x={-260} y={-130} width={520} height={260} rx={22} fill={f >= sv ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-50} size={38} color={GRAY}>{f >= sv ? 'BOB SAVED' : 'saved'}</Text>
            <Text y={30} size={80} color={C.green}>{f >= nn ? '≈ $9,800' : '≈ $?'}</Text>
          </G2>
          <DamageMeter x={1720} y={100} s={0.9} value={money(dmg)} saved={savedMode} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const qt = w('c8d', 'question');
    const hf = w('c8d', 'half');
    q(qt, 'stamp', 0.8);
    q(hf, 'ding', 0.7);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={260} s={P(A('c8d'))}><Text size={52} color={C.navy}>THE QUESTION</Text></G2>
          <G2 x={960} y={520} s={1.4 * P(A('c8d')) * bump(qt, 0.08)}>
            <rect x={-680} y={-140} width={1360} height={280} rx={28} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
            <Text y={-50} size={50}>Is this worth</Text>
            <Text y={30} size={64} color={C.red}>an hour of TWO lawyers?</Text>
          </G2>
          <G2 x={960} y={860} s={bump(hf, 0.12)} o={lt(hf, 0.35)}><Text size={48} color={C.green}>cut his bill in half</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const fm = w('c8e', 'forms');
    const th = w('c8e', 'three');
    const af = w('c8e', 'after');
    q(fm, 'pop', 0.5);
    q(th, 'cash', 0.6);
    q(af, 'sting', 0.5);
    scene(A('c8e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DivorceForms x={420} y={520} s={0.95 * P(A('c8e'))} cost={f >= th ? '$300' : '$?'} />
          <G2 x={1360} y={400} s={P(A('c8e'))}><Text size={50}>forms cost $300</Text></G2>
          <G2 x={1360} y={600} s={P(A('c8e')) * bump(af, 0.12)} o={lt(af, 0.35)}><Text size={52} color={C.red}>after that = the fight</Text></G2>
          <Bob f={f} x={900} y={940} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
          <Lawyer f={f} x={1180} y={940} s={0.9} flip keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
          <Lawyer f={f} x={1560} y={940} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}]} />
          <G2 x={1370} y={800} s={P(A('c8e')) * bump(af, 0.14)}><Text size={60} color={C.red}>$344/hr x 2</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const mv = w('c8f', 'moved');
    const ap = w('c8f', 'apartment');
    const kp = w('c8f', 'kept');
    const gc = w('c8f', 'got');
    q(mv, 'pop', 0.5);
    q(ap, 'ding', 0.5);
    q(kp, 'boing', 0.4);
    q(gc, 'heart', 0.6);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bob f={f} x={460} y={680} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.6}]} />
          <House x={460} y={320} s={0.6 * bump(ap, 0.1)} sold="BOB'S PLACE" />
          <Wife f={f} x={960} y={680} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0}]} />
          <Couch x={960} y={380} s={0.7 * bump(kp, 0.1)} color="#888" tag="WIFE KEPT" />
          <Dave f={f} x={1460} y={680} s={1.2} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0}]} />
          <Couch x={1460} y={380} s={0.7 * bump(gc, 0.1)} color="#E07A5F" tag="DAVE'S BACK" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ OUTRO: What Dave Learned ============
  {
    q(A('r1') + 4, 'pop', 0.5);
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150} s={P(A('r1'))}><Text size={56} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Row x={300} y={340} s={0.9} n={1} text="paperwork is cheap, the fight is expensive" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9} n={2} text="two lawyers = the meter ticks twice" lit={0.35} w={1200} />
          <Row x={300} y={660} s={0.9} n={3} text="before every fight: worth the hour?" lit={0.35} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    scene(A('r2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150} s={P(A('r1'))}><Text size={56} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Row x={300} y={340} s={0.9} n={1} text="paperwork is cheap, the fight is expensive" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9} n={2} text="two lawyers = the meter ticks twice" lit={1} w={1200} />
          <Row x={300} y={660} s={0.9} n={3} text="before every fight: worth the hour?" lit={0.35} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    scene(A('r3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={860} y={150} s={P(A('r1'))}><Text size={56} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Row x={300} y={340} s={0.9} n={1} text="paperwork is cheap, the fight is expensive" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9} n={2} text="two lawyers = the meter ticks twice" lit={1} w={1200} />
          <Row x={300} y={660} s={0.9} n={3} text="before every fight: worth the hour?" lit={1} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const nx = w('r4', 'next');
    const sw = w('r4', 'swears');
    const dr = w('r4', 'dropshipping');
    const op = w('r4', 'opened');
    q(nx, 'pop', 0.5);
    q(sw, 'ding', 0.4);
    q(dr, 'stamp', 0.6);
    q(op, 'boing', 0.5);
    scene(A('r4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={P(A('r4'))}><Text size={60} color={C.red}>NEXT TIME</Text></G2>
          <Stick f={f} x={380} y={930} s={1.1} acc={['shades']} seed={66} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.6, talk: true}]} />
          <G2 x={380} y={360} s={P(A('r4')) * bump(dr, 0.12)}><Bubble text="dropshipping!" size={44} tail="down" /></G2>
          <G2 x={960} y={520} s={P(A('r4')) * bump(sw, 0.1)}>
          <rect x={-260} y={-150} width={520} height={300} rx={24} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
          <Text y={-50} size={44} color={C.ink}>RICH IN</Text>
          <Text y={50} size={90} color={C.red}>30 DAYS</Text>
          </G2>
          <Dave f={f} x={1540} y={930} s={1.1} flip keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: op, pose: 'celebrate', expr: 'money', look: 0}]} />
          <G2 x={1500} y={380} s={P(A('r4')) * bump(op, 0.14)} o={lt(op, 0.4)}><Sign text="DAVE'S STORE: OPEN" color={C.green} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  {
    const sb = w('r5', 'subscribe');
    const fr = w('r5', 'free');
    const nb = w('r5', 'nobody');
    q(sb, 'pop', 0.6);
    q(fr, 'ding', 0.5);
    q(nb, 'boing', 0.5);
    scene(A('r5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={860} y={400} s={1.4 * P(A('r5'))} done={f > sb + 14 ? 1 : 0} />
          <Bell x={1300} y={400} s={1.2 * P(A('r5'))} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={360} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
          <Bob f={f} x={1600} y={900} s={1.15} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
          <G2 x={1000} y={640} s={P(A('r5'))}><Text size={48}>unlike a divorce:</Text></G2>
          <G2 x={1000} y={740} s={P(A('r5')) * bump(fr, 0.1)}><Text size={60} color={C.green}>it's FREE</Text></G2>
          <G2 x={1000} y={840} s={P(A('r5')) * bump(nb, 0.12)} o={lt(nb, 0.4)}><Text size={44}>and nobody fights over the couch</Text></G2>
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
