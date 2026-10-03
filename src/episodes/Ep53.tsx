import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, SUB_FRAMES, subCues} from '../fx';
import {Bubble, Clock, Desk, SourceTag, Stamp, Text, Thought, XMark} from '../props';
import {Bar, Bell, Envelope, Magnifier, Phone, Row, Sign, SubButton} from '../props2';
import {Raccoon, Shop, SourceCard, TollBooth} from '../props3';
import {Stand, Lemon} from '../props7';
import {Bread} from '../props6';
import {SlicedPizza} from '../props23';
import {Cheque} from '../props26';
import {Stairs} from '../props28';
import {People} from '../props35';
import {Sweater} from '../props41';
import {Gavel} from '../props49';
import {PyramidDiagram, StarterKit, ShakeBox, BoxPile, IncomeLabel, DamageMeter, ChatPhone, Napkin, RallyStage, GuessCard, FlowNode, MoneyFlowUp, RecruitCounter} from '../props53';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Mom: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Guru: React.FC<SP> = (p) => <Stick acc={['fedora', 'tie']} seed={63} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';
const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const Box: React.FC<{x: number; y: number; w: number; h: number; o?: number; s?: number; fill?: string; children?: React.ReactNode}> = ({x, y, w, h, o = 1, s = 1, fill = '#fff', children}) => (
  <G2 x={x} y={y} o={o} s={s}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </G2>
);

export const Ep53: React.FC = () => {
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
  const chStarts: number[] = [];
  for (const c of t.chapters ?? []) {
    const s = Math.round(c.start * 30);
    chStarts.push(s);
    q(s, 'whoosh', 0.5);
    q(s + 10, 'chime', 0.45);
    q(s + CHAPTER_FRAMES - 10, 'whoosh_s', 0.35);
  }
  const bump = (at: number, k = 0.14) => (f < at ? 1 : 1 + k * Math.sin(Math.PI * Math.min(1, (f - at) / 12)));
  const lt = (at: number, lo = 0.35) => (f >= at ? 1 : lo);
  const P = (at: number) => pop(f, at + 2);

  // ============ DAMAGE METER (running total) ============
  const M1 = w('c1e', 'ninety');
  const M2 = w('c2e', 'nine');
  const M3 = w('c3a', 'fifty');
  const SAVE = w('c8h', 'nine');
  const FINAL = w('c8h', 'four', 0);
  [M1, M2, M3].forEach((x) => q(x, 'cash', 0.6));
  q(SAVE, 'chime', 0.7);
  const steps: [number, number][] = [[M1, 499], [M2, 1399], [M3, 1649]];
  let dmg = 0;
  for (const [at, v] of steps) if (f >= at) dmg = lerp(dmg, v, ease(f, at, at + 18));
  const SUB = we('c5f', 'top') + 4;
  subCues(SUB).forEach((c) => cues.push(c));
  const meterOn = f >= A('o4') + 6 && f < A('r1') && !chStarts.some((s) => f >= s - 4 && f < s + CHAPTER_FRAMES + 4) && !(f >= SUB - 4 && f < SUB + SUB_FRAMES + 4);
  const lastHit = [M1, M2, M3].filter((x) => f >= x).pop() ?? -100;

  // ============ HOOK ============
  const o1Scene = (ff: number) => {
    const fo = w('o1', 'forty');
    const sl = w('o1', 'sell');
    const sk = shake(ff, sl, 12, 14);
    const n = Math.round(lerp(8, 40, ease(ff, 0, fo + 10)));
    return (
      <AbsoluteFill>
        <Cam f={ff} keys={[[0, 1.15, 960, 560], [50, 1, 960, 540]]}>
          <Interior />
          <Svg>
            <G2 x={1180 + sk.x} y={900 + sk.y}><BoxPile n={n} s={1} /></G2>
            <Dave f={ff} x={360} y={930} s={1.25} sweat keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.7}, {at: sl, pose: 'facepalm', expr: 'sad', look: 0.5}]} />
            <G2 x={420} y={170} s={bump(fo, 0.16)}>
              <rect x={-300} y={-70} width={600} height={140} rx={24} fill={C.red} stroke={C.ink} strokeWidth={6} />
              <Text y={4} size={84} color="#fff">{n} BOXES</Text>
            </G2>
            <Stamp x={1250} y={250} s={pop(ff, sl)} text="CAN'T SELL THEM" color={C.red} size={60} r={-4} />
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  {
    q(2, 'thud', 0.6);
    q(w('o1', 'forty'), 'pop', 0.6);
    q(w('o1', 'sell'), 'stamp', 0.8);
    scene(-10, () => o1Scene(f), false);
  }
  {
    const FR = A('o2');
    const RW = w('o2', 'rewind');
    const END = A('o3');
    const sp = Math.max(4, FR / Math.max(8, END - RW));
    q(FR, 'sting', 0.8);
    q(RW, 'whoosh', 0.7);
    q(RW + 4, 'flip', 0.6);
    scene(FR, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}</AbsoluteFill>
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill="#fff" opacity={Math.max(0, 1 - (f - FR) / 8)} />
          <G2 x={760} y={430} s={P(FR)}>
            <rect x={-200} y={-55} width={400} height={110} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={4} size={62}>THAT'S DAVE</Text>
          </G2>
          <path d="M 620 500 Q 520 560 470 620" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={ease(f, FR + 4, FR + 10)} />
          <path d="M 450 590 L 466 628 L 504 612" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={ease(f, FR + 4, FR + 10)} />
        </Svg>
      </AbsoluteFill>
    ), false);
    scene(RW, () => (
      <AbsoluteFill>
        {o1Scene(Math.max(0, FR - (f - RW) * sp))}
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill={C.navy} opacity={0.15} />
          <Text x={960} y={540} size={160} color="#fff" stroke={C.ink} sw={14}>{'<<'}</Text>
          <Stamp x={960} y={760} s={P(RW)} text="6 MONTHS EARLIER" color={C.navy} size={64} r={-3} />
        </Svg>
      </AbsoluteFill>
    ), false);
  }
  {
    const pa = w('o3', 'party');
    const bz = w('o3', 'business');
    q(pa, 'pop', 0.5);
    q(bz, 'stamp', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Bob f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin', look: 0.8}, {at: bz, pose: 'present', expr: 'grin', look: 0.8}]} />
          <Dave f={f} x={1000} y={930} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: bz, pose: 'think', expr: 'suspicious', look: -0.8}]} />
          <G2 x={520} y={430} s={P(A('o3')) * bump(pa)}><Bubble text={f >= pa ? "it's NOT a party..." : 'hey Dave!'} size={44} tail="down" /></G2>
          <Box x={1480} y={420} w={640} h={260} s={P(A('o3')) * bump(bz, 0.1)} fill={f >= bz ? C.yellow : '#fff'}>
            <Text y={-70} size={34} color={GRAY}>BOB'S INVITE</Text>
            <Text y={10} size={52} color={f >= bz ? C.red : C.ink}>{f >= bz ? 'BUSINESS' : 'tonight, 7pm'}</Text>
            <Text y={75} size={52} color={f >= bz ? C.red : '#C9CED6'}>OPPORTUNITY</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('o4', 'survey');
    const hf = w('o4', 'half');
    const ls = w('o4', 'lost');
    q(sv, 'paper', 0.5);
    q(hf, 'stamp', 0.8);
    q(ls, 'thud', 0.6);
    const n = Math.round(lerp(0, 47, ease(f, sv, hf + 4)));
    const sk = shake(f, hf, 14, 14);
    const z = f < hf ? 1 : lerp(1, 1.1, ease(f, hf, hf + 10));
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Cam f={f} keys={[[0, 1, 960, 540]]}>
          <Board />
          <Svg>
            <G2 x={960 + sk.x} y={500 + sk.y} s={z}>
              <Box x={0} y={0} w={900} h={460} s={P(A('o4'))} fill={f >= hf ? C.red : '#fff'}>
                <Text y={-150} size={40} color={f >= hf ? '#fff' : GRAY}>PEOPLE WHO JOINED</Text>
                <Text y={0} size={230} color={f >= hf ? '#fff' : C.ink}>{n}%</Text>
                <Text y={150} size={60} color={f >= ls ? '#fff' : f >= hf ? '#FFD6E0' : '#C9CED6'}>LOST MONEY</Text>
              </Box>
            </G2>
            <Dave f={f} x={240} y={930} s={1} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: hf, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <SourceTag f={f} at={sv} text="AARP Foundation MLM survey (2018)" />
          </Svg>
        </Cam>
      </AbsoluteFill>
    ));
  }
  {
    const go = w('o5', 'go');
    const sb = w('o5', 'somebody');
    q(go, 'whoosh_s', 0.5);
    q(sb, 'sting', 0.6);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={150} s={P(A('o5')) * bump(go)}><Text size={64}>where does the money go?</Text></G2>
          {Array.from({length: 7}).map((_, i) => {
            const y = 900 - ((f - A('o5')) * 9 + i * 110) % 760;
            return (
              <G2 key={i} x={380 + i * 130} y={y} r={(i * 23) % 30 - 15}>
                <rect x={-60} y={-32} width={120} height={64} rx={8} fill={C.greenLight} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={38} color={C.ink}>$</Text>
              </G2>
            );
          })}
          <G2 x={lerp(2200, 1600, ease(f, sb - 10, sb + 6))} y={0}>
            <g style={{filter: 'brightness(0)'}}><Banker f={f} x={0} y={940} s={1.6} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} /></g>
            <Text x={0} y={330} size={150} color={C.yellow} stroke={C.ink} sw={10}>?</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wh = w('o6', 'who');
    const sn = w('o6', 'sentence');
    const bk = w('o6', 'back');
    q(wh, 'pop', 0.5);
    q(sn, 'scribble', 0.5);
    q(bk, 'cash', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={360} y={930} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'smug', look: 0.8}]} handItem={<Phone s={0.35} value="..." />} />
          <G2 x={1150} y={330} s={P(A('o6')) * bump(sn, 0.08)}>
            <Bubble text={'"I\'m ______, and I\'d\nlike the ________."'} size={52} tail="left" />
          </G2>
          <Box x={1150} y={720} w={760} h={180} s={P(A('o6')) * bump(bk, 0.12)} fill={f >= bk ? C.greenLight : '#fff'}>
            <Text y={-30} size={34} color={GRAY}>ONE SENTENCE =</Text>
            <Text y={30} size={56} color={f >= bk ? C.green : C.ink}>{f >= bk ? 'MONEY BACK' : '???'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: Not a party. A pitch. ============
  {
    const ch = w('c1a', 'chips');
    const tr = w('c1a', 'triangle');
    q(ch, 'crinkle', 0.5);
    q(tr, 'pop', 0.5);
    const py = w('c1b', 'pyramid');
    const ts = w('c1b', 'success');
    q(py, 'buzz', 0.5);
    q(ts, 'stamp', 0.7);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <rect x={620} y={140} width={760} height={560} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <G2 x={1000} y={460} s={0.8 * P(A('c1a')) * bump(tr, 0.08)}><PyramidDiagram highlight={f >= py ? 3 : -1} /></G2>
          <Bob f={f} x={1580} y={930} s={1.1} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.8}, {at: ts, pose: 'celebrate', expr: 'grin'}]} />
          <Dave f={f} x={330} y={930} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: py, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
          <G2 x={330} y={470} o={lt(py, 0.4)}><Bubble text="is that a pyramid?" size={38} tail="down" /></G2>
          <Stamp x={1000} y={790} s={P(A('c1a')) * bump(ts, 0.18)} text={f >= ts ? 'TRIANGLE OF SUCCESS' : 'chips + folding chairs'} color={f >= ts ? C.red : GRAY} size={52} r={-3} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const s1 = w('c1c', 'sell');
    const rc = w('c1c', 'recruit');
    const ct = w('c1c', 'cut');
    q(s1, 'pop', 0.5);
    q(rc, 'pop2', 0.5);
    q(ct, 'coin', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c1c'))}><Text size={54}>two ways to earn</Text></G2>
          <Box x={520} y={540} w={680} h={480} s={P(A('c1c')) * bump(s1, 0.08)} o={lt(s1, 0.45)}>
            <Text y={-180} size={40}>1. SELL</Text>
            <ShakeBox y={20} s={0.9} />
          </Box>
          <Box x={1400} y={540} w={680} h={480} s={P(A('c1c')) * bump(rc, 0.08)} o={lt(rc, 0.45)}>
            <Text y={-180} size={40}>2. RECRUIT</Text>
            <RecruitCounter y={-30} count="FRIENDS" label="SIGN UP" s={0.9} />
            <Text y={140} size={40} color={f >= ct ? C.green : '#C9CED6'}>+ a cut of what they buy</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lm = w('c1d', 'lemonade');
    const kd = w('c1d', 'kids');
    q(kd, 'ding', 0.5);
    q(lm, 'pop', 0.5);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Stand x={560} y={860} s={1.1} label="LEMONADE" />
          <Lemon x={560} y={560} s={1.2 * bump(lm, 0.2)} />
          <G2 x={560} y={200} s={P(A('c1d'))}><Card2 top="SELL A CUP" big="+$1" color={C.yellow} /></G2>
          {[0, 1, 2, 3].map((i) => (
            <Stick key={i} f={f} x={1180 + i * 150} y={880} s={0.75 * pop(f, kd + i * 4)} keys={[{at: 0, pose: 'wave', expr: 'happy'}]} seed={90 + i} acc={['paperhat']} />
          ))}
          <G2 x={1400} y={200} s={P(A('c1d')) * bump(kd, 0.14)}><Card2 top="SIGN UP A KID" big="+$20" color={C.red} /></G2>
        </Svg>
        <DreamFrame label="PICTURE THIS" />
      </AbsoluteFill>
    ));
  }
  {
    const kt = w('c1e', 'kit');
    const mo = w('c1e', 'month');
    q(kt, 'pop', 0.6);
    q(mo, 'boing', 0.4);
    const sg = w('c1f', 'signed');
    const tk = w('c1f', 'ticket');
    const au = w('c1f', 'autoship');
    q(sg, 'scribble', 0.6);
    q(tk, 'paper', 0.5);
    q(au, 'sting', 0.7);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={1240} y={460} s={1.3 * P(A('c1e')) * bump(M1, 0.14)}><StarterKit price={f >= M1 ? '$499' : '$???'} /></G2>
          <Bob f={f} x={1700} y={930} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          <G2 x={1680} y={420} o={lt(mo, 0.4)}><Bubble text={'pays for itself\nin a month!'} size={34} tail="down" /></G2>
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: sg, pose: 'typing', expr: 'happy', look: 0.8}, {at: au, pose: 'shock', expr: 'worried', look: 0.8}]} />
          <Stamp x={1240} y={860} s={P(A('c1e')) * bump(au, 0.2)} text={f >= au ? 'AUTOSHIP' : f >= sg ? 'SIGNED' : 'TO JOIN'} color={f >= au ? C.red : C.navy} size={58} r={-4} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: The shake subscription ============
  {
    const fb = w('c2a', 'first');
    const an = w('c2a', 'another');
    const od = w('c2a', 'ordered');
    q(fb, 'thud', 0.5);
    q(an, 'thud', 0.6);
    q(od, 'buzz', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <rect x={1260} y={260} width={300} height={640} rx={10} fill={C.wood} stroke={C.ink} strokeWidth={6} />
          <circle cx={1300} cy={600} r={14} fill={C.ink} />
          <G2 x={1080} y={790} s={P(A('c2a')) * bump(fb, 0.12)}><ShakeBox /></G2>
          <G2 x={880} y={810} s={pop(f, an) * bump(an, 0.12)} r={-6}><ShakeBox /></G2>
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'carry', expr: 'happy', look: 0.8}, {at: an, pose: 'shrug', expr: 'suspicious', look: 0.8}]} />
          <G2 x={500} y={430} s={P(A('c2a'))}><Bubble text={f >= od ? "I didn't order this!" : 'my first box!'} size={40} tail="down" /></G2>
          <G2 x={960} y={130} s={P(A('c2a'))}><Text size={50} color={f >= an ? C.red : GRAY}>{f >= an ? '...a month later: ANOTHER box' : 'box #1 arrives'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ac = w('c2b', 'active');
    const mn = w('c2b', 'minimum');
    const fi = w('c2b', 'fifty');
    const au = w('c2b', 'automatically');
    q(ac, 'pop', 0.5);
    q(mn, 'ding', 0.5);
    q(fi, 'cash', 0.6);
    q(au, 'stamp', 0.7);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c2b')) * bump(ac)}><Text size={50}>to stay "ACTIVE" + earn commissions:</Text></G2>
          <Box x={960} y={400} w={900} h={260} s={P(A('c2b')) * bump(fi, 0.12)} fill={f >= fi ? C.yellow : '#fff'}>
            <Text y={-70} size={36} color={GRAY}>minimum order, every month</Text>
            <Text y={30} size={110} color={C.red}>{f >= fi ? '$150' : '$???'}</Text>
          </Box>
          {months.map((m, i) => (
            <G2 key={m} x={360 + i * 240} y={740} s={P(A('c2b'))} o={f >= au ? 1 : 0.4}>
              <ShakeBox s={0.55} />
              <Text y={130} size={34}>{m}</Text>
            </G2>
          ))}
          <Stamp x={1560} y={300} s={pop(f, au)} text="AUTOMATIC" color={C.red} size={46} r={8} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bo = w('c2c', 'boss');
    const ds = w('c2c', 'desk');
    const jb = w('c2c', 'job');
    q(bo, 'pop', 0.5);
    q(ds, 'thud', 0.5);
    q(jb, 'coin', 0.6);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Desk x={960} y={820} s={1.1} />
          <Dave f={f} x={760} y={900} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.8}, {at: jb, pose: 'present', expr: 'sad', look: 0.8}]} />
          <Guru f={f} x={1380} y={900} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}]} />
          <G2 x={1380} y={420} s={P(A('c2c')) * bump(ds, 0.12)}><Sign text={f >= ds ? 'DESK RENT: $150/mo' : 'BOSS'} color={C.red} /></G2>
          <G2 x={760} y={450} o={lt(jb, 0.4)}><Bubble text="...to keep my job?" size={38} tail="down" /></G2>
        </Svg>
        <DreamFrame label="LIKE PAYING YOUR BOSS RENT" />
      </AbsoluteFill>
    ));
  }
  {
    const mo = w('c2d', 'mom');
    const cw = w('c2d', 'coworker');
    const ni = w('c2d', 'nice');
    const ft = w('c2d', 'forty');
    q(mo, 'cash', 0.4);
    q(cw, 'coin', 0.5);
    q(ni, 'boing', 0.4);
    q(ft, 'ding', 0.6);
    const na = w('c2e', 'nine');
    q(na, 'thud', 0.7);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Mom f={f} x={260} y={900} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}]} handItem={<ShakeBox s={0.3} />} />
          <Stick f={f} x={500} y={900} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: ni, pose: 'thumbs', expr: 'grin', look: 0.6}]} acc={['glasses']} seed={70} />
          <G2 x={380} y={420} s={P(A('c2d'))}><Text size={40} color={GRAY}>{f >= cw ? 'mom: 2 · coworker: 1' : 'Dave tries selling...'}</Text></G2>
          <Bar x={1040} y={860} s={1.1 * P(A('c2d')) * bump(ft, 0.1)} h={f >= ft ? 70 : 40} color={C.green} label="SOLD (6 MONTHS)" value={f >= ft ? '$240' : '$?'} />
          <Bar x={1560} y={860} s={1.1 * P(A('c2d')) * bump(na, 0.12)} h={f >= na ? 520 : 40} color={C.red} label="AUTOSHIP (6 MONTHS)" value={f >= na ? '$900' : '$?'} />
          {f >= na && <Stamp x={1300} y={170} s={pop(f, na)} text="OUCH" color={C.red} size={70} r={-6} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const br = w('c2f', 'breakfast');
    const lu = w('c2f', 'lunch');
    const di = w('c2f', 'dinner');
    const ss = w('c2f', 'stop');
    const sr = w('c2f', 'start');
    [br, lu, di].forEach((x) => q(x, 'pop', 0.45));
    q(ss, 'buzz', 0.5);
    q(sr, 'stamp', 0.7);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          {['BREAKFAST', 'LUNCH', 'DINNER'].map((l, i) => (
            <G2 key={l} x={300 + i * 300} y={300} s={P(A('c2f')) * bump([br, lu, di][i], 0.14)} o={lt([br, lu, di][i], 0.4)}>
              <ShakeBox s={0.7} />
              <Text y={150} size={34}>{l}</Text>
            </G2>
          ))}
          <Dave f={f} x={600} y={930} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.8}]} handItem={<ShakeBox s={0.3} />} />
          <Bob f={f} x={1500} y={930} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'grin', look: -0.8}, {at: sr, pose: 'point_up', expr: 'grin', look: -0.8}]} />
          <G2 x={1450} y={380} s={P(A('c2f')) * bump(sr, 0.12)}>
            <Bubble text={f >= sr ? 'STOP SELLING.\nSTART RECRUITING.' : 'I have a solution!'} size={46} tail="down" />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: Recruit five friends ============
  {
    const ra = w('c3a', 'rally');
    const lg = w('c3a', 'lights');
    const ck = w('c3a', 'check');
    q(ra, 'crowd', 0.5);
    q(lg, 'ding', 0.4);
    q(ck, 'cash', 0.6);
    const sc = w('c3b', 'secret');
    const fv = w('c3b', 'five');
    const fv2 = w('c3b', 'five', 1);
    q(sc, 'pop', 0.5);
    q(fv, 'ding', 0.5);
    q(fv2, 'ding', 0.6);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill={C.navy} opacity={0.85} />
          <RallyStage x={960} y={560} f={f} />
          <Guru f={f} x={700} y={640} s={1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: sc, pose: 'point_up', expr: 'smug'}]} />
          <G2 x={1160} y={380} s={0.6 * P(A('c3a')) * bump(ck, 0.12)}><Cheque to="TOP RANK" from="THE COMPANY" amount="$$$$$" /></G2>
          <G2 x={960} y={830} s={P(A('c3a'))}>
            <rect x={-200} y={-60} width={400} height={120} rx={16} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={4} size={52}>{f >= M3 ? 'TICKET $250' : 'TICKET $???'}</Text>
          </G2>
          {f >= fv && <G2 x={1540} y={240} s={pop(f, fv)}><Bubble text={f >= fv2 ? 'each recruits 5!' : 'recruit 5 friends!'} size={40} tail="left" /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nk = w('c3c', 'napkin');
    const l1 = w('c3c', 'five');
    const l2 = w('c3c', 'twenty');
    const l3 = w('c3c', 'hundred');
    q(nk, 'scribble', 0.5);
    [l1, l2, l3].forEach((x) => q(x, 'marker', 0.5));
    const tt = w('c3d', 'thirteen');
    const bi = w('c3d', 'billion');
    const am = w('c3d', 'america');
    q(tt, 'pop', 0.5);
    q(bi, 'stamp', 0.8);
    q(am, 'ding', 0.5);
    const shown = 1 + [l1, l2, l3].filter((x) => f >= x).length;
    scene(A('c3c'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={540} s={1.1 * P(A('c3c'))} r={-3}><Napkin lines={['you: 1', 'level 1: 5', 'level 2: 25', 'level 3: 125']} shown={shown} /></G2>
            <Dave f={f} x={1500} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}]} />
            <G2 x={1460} y={420} s={P(A('c3c'))}><Thought w={360} h={200} tx={-60} ty={170}><Text size={50}>×5 ×5 ×5...</Text></Thought></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c3d')) * bump(tt)}><Text size={52}>keep going... level 13 needs:</Text></G2>
            <Bar x={620} y={880} s={1.1 * P(A('c3d')) * bump(bi, 0.12)} h={f >= bi ? 560 : 60} w={300} color={C.red} label="LEVEL 13" value={f >= bi ? '1.2 BILLION' : '?'} />
            <Bar x={1300} y={880} s={1.1 * P(A('c3d')) * bump(am, 0.12)} h={f >= am ? 160 : 60} w={300} color={C.blue} label="ALL OF AMERICA" value={f >= am ? '342 MILLION' : '?'} />
            <SourceTag f={f} at={am} text="5^13 = 1.22 billion · US Census Vintage 2025: 341.8M" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pz = w('c3e', 'pizza');
    const sl = w('c3e', 'slices');
    const cr = w('c3e', 'crumbs');
    q(pz, 'pop', 0.5);
    q(sl, 'scribble', 0.4);
    q(cr, 'trombone', 0.5);
    const n = Math.round(lerp(4, 48, ease(f, sl, cr)));
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={760} y={560} s={1.4 * P(A('c3e')) * bump(pz, 0.08)}><SlicedPizza n={n} hl={0} /></G2>
          <G2 x={1460} y={360} s={P(A('c3e'))}><Text size={44} color={C.green}>first in: real slices</Text></G2>
          <G2 x={1460} y={560} o={lt(cr, 0.35)}><Text size={44} color={C.red}>arriving now: crumbs</Text></G2>
          <G2 x={1460} y={700} o={lt(cr, 0.35)}>{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-80 + i * 40} cy={(i % 2) * 14} r={7} fill="#E9B872" stroke={C.ink} strokeWidth={2} />)}</G2>
        </Svg>
        <DreamFrame label="A PIZZA FOR EVERYONE?" />
      </AbsoluteFill>
    ));
  }
  {
    const wd = w('c3f', 'wonder');
    const nm = w('c3f', 'normal');
    q(wd, 'pop', 0.5);
    q(nm, 'ding', 0.5);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={520} y={930} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={1200} y={420} s={P(A('c3f')) * bump(nm, 0.1)}>
            <Thought w={760} h={360} tx={-420} ty={260}>
              <Text y={-60} size={44}>what do NORMAL</Text>
              <Text y={10} size={44}>people actually earn?</Text>
              <Text y={90} size={70} color={C.red}>$ ?</Text>
            </Thought>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c3g', 'guess');
    const ei = w('c3g', 'eight');
    const ty = w('c3g', 'typical');
    const cm = w('c3g', 'comments');
    q(gs, 'pop', 0.6);
    q(ei, 'ding', 0.5);
    q(cm, 'mail', 0.6);
    for (let k = ty; k < bs('c3g') + 30 * 15; k += 30) q(k, 'tick', 0.35);
    scene(A('c3g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c3g')) * bump(gs)}><Text size={60}>QUICK GUESS</Text></G2>
          <G2 x={520} y={540} s={P(A('c3g')) * bump(ei, 0.06)}>
            <People n={100} hot={0} s={1.1} />
            <Text y={400} size={40}>~108,000 resellers</Text>
          </G2>
          <GuessCard x={1360} y={480} s={0.85 * P(A('c3g')) * bump(cm, 0.08)} sub={f >= cm ? 'WRITE IT IN THE COMMENTS' : 'EARN ANYTHING IN A MONTH?'} />
          <Clock x={1360} y={880} s={0.6 * P(A('c3g'))} f={f} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: The label Bob skipped ============
  {
    const fl = w('c4a', 'flipped');
    const lb = w('c4a', 'label');
    const tp = w('c4a', 'tiny');
    q(fl, 'flip', 0.6);
    q(lb, 'pop', 0.5);
    q(tp, 'ding', 0.4);
    const ds = w('c4b', 'disclosure');
    const nv = w('c4b', 'never');
    q(ds, 'paper', 0.6);
    q(nv, 'buzz', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={520} y={500} s={1.5 * P(A('c4a')) * bump(fl, 0.08)}><ShakeBox back={f >= fl} hl={f >= tp ? 1 : 0} /></G2>
          <Dave f={f} x={180} y={930} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}]} />
          <G2 x={1360} y={520} s={0.95 * P(A('c4a'))} o={lt(ds, 0.3)}>
            <IncomeLabel rows={[['resellers', '?'], ['earned in a month', '?'], ['typical earnings', '?']]} shown={0} />
          </G2>
          <G2 x={960} y={110} s={P(A('c4a'))}><Text size={48} color={f >= ds ? C.navy : GRAY}>{f >= ds ? 'the business has a label too' : 'the boring truth, in tiny print'}</Text></G2>
          {f >= nv && <Stamp x={1360} y={900} s={pop(f, nv)} text="BOB NEVER SHOWED IT" color={C.red} size={44} r={-4} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hb = w('c4c', 'herbalife');
    q(hb, 'paper', 0.6);
    const ei = w('c4d', 'eight');
    const fs = w('c4d', 'forty');
    q(ei, 'ding', 0.5);
    q(fs, 'stamp', 0.8);
    const rm = w('c4e', 'guess');
    const fw = w('c4e', 'fewer');
    const sx = w('c4e', 'sixty');
    const be = w('c4e', 'before');
    q(fw, 'stamp', 0.8);
    q(sx, 'cash', 0.5);
    q(be, 'buzz', 0.5);
    const shown = f >= sx ? 3 : f >= fs ? 2 : f >= ei ? 1 : 0;
    const hl = f >= sx ? 2 : f >= fs ? 1 : f >= ei ? 0 : -1;
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={520} s={1.05 * P(A('c4c')) * bump(hb, 0.06)}>
            <IncomeLabel rows={[['resellers (US, 2025)', '107,769'], ['earned anything, typical month', '~47,000'], ['1st-year: half made <', '$166/mo']]} shown={shown} hl={hl} />
          </G2>
          <G2 x={1420} y={300} s={P(A('c4c')) * bump(fs, 0.06)}><People n={100} hot={f >= fs ? 56 : 0} s={0.8} /></G2>
          <G2 x={1420} y={600} o={lt(fs, 0.35)}><Text size={36} color={C.red}>{f >= fs ? 'red = earned $0 that month' : 'who earned anything?'}</Text></G2>
          <G2 x={1420} y={740} s={pop(f, rm)}><GuessCard s={0.42} answer={f >= fw ? '< HALF' : '?'} sub="YOUR GUESS?" /></G2>
          {f >= be && <G2 x={1420} y={900} s={pop(f, be)}><Text size={44} color={C.red}>BEFORE EXPENSES</Text></G2>}
          <SourceTag f={f} at={hb} text="Herbalife U.S. Statement of Typical Distributor Earnings 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sh = w('c4f', 'shakes');
    const gs = w('c4f', 'gas');
    const ra = w('c4f', 'rally');
    const au = w('c4f', 'autoship');
    [sh, gs, ra].forEach((x) => q(x, 'pop', 0.45));
    q(au, 'thud', 0.6);
    const mk = w('c4g', 'marker');
    const fo = w('c4g', 'followed');
    q(mk, 'marker', 0.6);
    q(fo, 'whoosh_s', 0.5);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bar x={520} y={860} s={1.1 * P(A('c4f'))} h={300} color={C.yellow} label="HALF MADE LESS THAN" value="$166" />
          <G2 x={520} y={360} s={P(A('c4f'))}><Text size={36} color={GRAY}>{['minus shakes', 'minus gas', 'minus rally'][[sh, gs, ra].filter((x) => f >= x).length - 1] ?? 'before costs...'}</Text></G2>
          <Bar x={1000} y={860} s={1.1 * P(A('c4f')) * bump(au, 0.12)} h={270} color={C.red} label="DAVE'S AUTOSHIP" value="$150" />
          <Dave f={f} x={1550} y={930} s={1.15} keys={[{at: 0, pose: 'facepalm', expr: 'tired', look: -0.8}, {at: mk, pose: 'point_up', expr: 'suspicious', look: -0.6}]} />
          <G2 x={1550} y={430} s={pop(f, mk)}><Bubble text={'where is all\nthat money going?'} size={36} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: Who gets Dave's money? (villain reveal) ============
  {
    const dr = w('c5a', 'arrows');
    const co = w('c5a', 'company');
    const up = w('c5a', 'line');
    q(dr, 'marker', 0.5);
    q(co, 'pop', 0.5);
    q(up, 'whoosh_s', 0.4);
    const sb = [w('c5b', 'bob'), w('c5b', 'woman'), w('c5b', 'person'), w('c5b', 'top')];
    sb.forEach((x) => q(x, 'coin', 0.55));
    const nodes = [
      {l: 'DAVE', sub: '$150 / month', y: 900, c: '#fff'},
      {l: 'THE COMPANY', sub: '', y: 730, c: C.yellow},
      {l: 'BOB', sub: 'a slice', y: 560, c: '#fff'},
      {l: "BOB'S RECRUITER", sub: 'a slice', y: 410, c: '#fff'},
      {l: 'HER RECRUITER', sub: 'a slice', y: 260, c: '#fff'},
      {l: 'THE TOP', sub: 'slice, slice, slice...', y: 110, c: C.red},
    ];
    const on = [0, co, sb[0], sb[1], sb[2], sb[3]];
    const coinY = (k: number) => lerp(900, 110, ((f - up) * 0.012 + k * 0.33) % 1);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={760} y1={880} x2={760} y2={130} stroke={C.ink} strokeWidth={8} strokeDasharray="20 16" opacity={lt(dr, 0.3)} />
          {nodes.map((n, i) => (
            <FlowNode key={n.l} x={760} y={n.y} s={P(A('c5a'))} o={f >= on[i] ? 1 : 0.35} label={n.l} sub={n.sub} color={n.c} w={420} />
          ))}
          {f >= up && [0, 1, 2].map((k) => <circle key={k} cx={760 + 240} cy={coinY(k)} r={26} fill={C.gold} stroke={C.ink} strokeWidth={4} />)}
          <MoneyFlowUp x={1060} y={520} s={1.4 * P(A('c5a'))} f={f} />
          <Dave f={f} x={1500} y={930} s={1.05} keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.8}, {at: sb[3], pose: 'shock', expr: 'shock', look: -0.6}]} />
          <G2 x={1500} y={420} s={P(A('c5a'))}><Text size={44} color={C.navy}>follow Dave's $150</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wt = w('c5c', 'wait');
    const pt = w('c5c', 'partner');
    const cu = w('c5c', 'customer');
    q(wt, 'boing', 0.5);
    q(pt, 'pop', 0.4);
    q(cu, 'stamp', 0.9);
    const sk = shake(f, cu, 14, 14);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Bob f={f} x={1380} y={930} s={1.2} sweat={f >= cu} keys={[{at: 0, pose: 'pockets', expr: 'worried', look: -0.8}]} />
          <Dave f={f} x={540} y={930} s={1.2} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}, {at: cu, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
          <G2 x={960} y={330} s={P(A('c5c'))}>
            <rect x={-560} y={-90} width={1120} height={180} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={44} color={f >= pt ? C.ink : GRAY}>{f >= pt ? <tspan textDecoration="line-through">BOB'S BUSINESS PARTNER</tspan> : 'Bob earns on MY autoship?'}</Text>
            <Text y={40} size={64} color={C.red}>{f >= cu ? "BOB'S CUSTOMER" : '...'}</Text>
          </G2>
          {f >= cu && <Stamp x={960 + sk.x} y={600 + sk.y} s={pop(f, cu)} text="DAVE = CUSTOMER" color={C.red} size={60} r={-5} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st = w('c5d', 'staircase');
    const tb = w('c5d', 'booth');
    const rc = w('c5d', 'raccoon');
    q(st, 'step', 0.6);
    q(tb, 'clank', 0.5);
    q(rc, 'cash', 0.6);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={300} y={940} s={P(A('c5d')) * bump(st, 0.06)}><Stairs labels={['DAVE', 'BOB', '', '', 'TOP']} w={270} h={130} hl={-1} /></G2>
          {[1, 2, 3, 4].map((i) => (
            <G2 key={i} x={300 + i * 270 + 135} y={940 - (i + 1) * 130} s={0.38 * pop(f, tb + i * 3)}><TollBooth label="TOLL" /></G2>
          ))}
          <Raccoon f={f} x={1640} y={300} s={0.9 * P(A('c5d')) * bump(rc, 0.14)} mood="greedy" holdCoin grab={f >= rc ? 1 : 0} />
          <Dave f={f} x={435} y={810} s={0.7} keys={[{at: 0, pose: 'carry', expr: 'tired', look: 0.6}]} />
          <G2 x={1000} y={120} o={lt(rc, 0.4)}><Text size={44} color={C.navy}>remember the raccoon? (ep. 2)</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tp = w('c5e', 'top');
    const tw = w('c5e', 'twenty');
    const yr = w('c5e', 'years');
    q(tp, 'pop', 0.5);
    q(tw, 'cash', 0.8);
    q(yr, 'ding', 0.5);
    const vl = w('c5f', 'villain');
    const nb = w('c5f', 'bob');
    const fu = w('c5f', 'flows');
    q(vl, 'sting', 0.8);
    q(nb, 'pop', 0.5);
    q(fu, 'whoosh_s', 0.5);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={620} s={1.1 * P(A('c5e'))}><PyramidDiagram highlight={0} top="" bottom="THE MANY" /></G2>
          <Banker f={f} x={760} y={340} s={0.8 * P(A('c5e')) * bump(vl, 0.1)} keys={[{at: 0, pose: 'celebrate', expr: 'smug'}]} />
          <Box x={1480} y={300} w={640} h={260} s={P(A('c5e')) * bump(tw, 0.12)} fill={f >= tw ? C.yellow : '#fff'}>
            <Text y={-80} size={30} color={GRAY}>TOP 1% (experienced sellers)</Text>
            <Text y={0} size={70} color={C.green}>{f >= tw ? '$21,893+' : '$??,???'}</Text>
            <Text y={75} size={32} color={GRAY}>{f >= yr ? 'a month · in it 5-12 years' : 'a month'}</Text>
          </Box>
          <G2 x={1480} y={620} s={P(A('c5e')) * bump(vl, 0.16)} o={lt(vl, 0.3)}>
            <rect x={-300} y={-60} width={600} height={120} rx={20} fill={C.ink} />
            <Text y={4} size={50} color={C.yellow}>VILLAIN: THE PAY PLAN</Text>
          </G2>
          <G2 x={1480} y={780} o={lt(nb, 0.3)}><Text size={40} color={C.navy}>(not Bob)</Text></G2>
          <SourceTag f={f} at={tw} text="Herbalife U.S. Statement of Typical Distributor Earnings 2025 (before expenses)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lg = w('c5g', 'legal');
    q(lg, 'buzz', 0.5);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Gavel x={700} y={560} s={1.2 * P(A('c5g'))} />
          <G2 x={1300} y={500} s={P(A('c5g')) * bump(lg, 0.16)}><Text size={110} color={C.red}>LEGAL?!</Text></G2>
          <Dave f={f} x={1300} y={930} s={0.9} keys={[{at: 0, pose: 'shrug', expr: 'suspicious'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: Legal, but for whom? ============
  {
    const sc = w('c6a', 'scam');
    const np = w('c6a', 'nope');
    q(sc, 'dream', 0.5);
    q(np, 'buzz', 0.8);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.2} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}, {at: np, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <G2 x={1200} y={400} s={P(A('c6a'))}><Thought w={820} h={300} tx={-560} ty={260}><Text y={-30} size={46}>"if it were a scam,</Text><Text y={40} size={46}>it'd be illegal"</Text></Thought></G2>
          {f >= np && <Stamp x={1200} y={780} s={pop(f, np)} text="NOPE" color={C.red} size={110} r={-6} />}
        </Svg>
        <DreamFrame label="WHAT DAVE THOUGHT" />
      </AbsoluteFill>
    ));
  }
  {
    const ft = w('c6b', 'f');
    const lg = w('c6b', 'legal');
    const cu = w('c6b', 'customers');
    const rc = w('c6c', 'recruiting');
    const ac = w('c6c', 'active');
    const il = w('c6c', 'illegal');
    q(ft, 'paper', 0.5);
    q(lg, 'chime', 0.5);
    q(cu, 'ding', 0.5);
    q(rc, 'pop', 0.5);
    q(ac, 'pop2', 0.5);
    q(il, 'stamp', 0.8);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <rect x={958} y={60} width={4} height={900} fill={C.ink} />
          <Box x={480} y={500} w={800} h={680} s={P(A('c6b')) * bump(lg, 0.05)} fill={f >= lg ? '#E6F7EE' : '#fff'}>
            <Text y={-280} size={46} color={C.green}>CAN BE LEGAL</Text>
            <Text y={-200} size={32} color={GRAY}>people earn mainly by selling to</Text>
            <G2 y={20} o={lt(cu, 0.3)}>
              <ShakeBox x={-220} s={0.7} />
              <Person2 x={60} c={C.green} />
              <Person2 x={180} c={C.green} />
            </G2>
            <Text y={240} size={40} color={f >= cu ? C.green : '#C9CED6'}>real outside customers</Text>
          </Box>
          <Box x={1440} y={500} w={800} h={680} s={P(A('c6b'))} fill={f >= il ? '#FFE3EA' : '#fff'} o={lt(rc, 0.45)}>
            <Text y={-280} size={46} color={C.red}>{f >= il ? 'ILLEGAL PYRAMID?' : 'starts to look like...'}</Text>
            <Text y={-150} size={40} color={f >= rc ? C.ink : '#C9CED6'}>earn mainly by recruiting</Text>
            <Text y={-70} size={40} color={f >= ac ? C.ink : '#C9CED6'}>buy stuff to "stay active"</Text>
            <G2 y={130}><PyramidDiagram s={0.4} highlight={3} top="" bottom="" /></G2>
          </Box>
          <SourceTag f={f} at={ft} text="FTC: Multi-Level Marketing Businesses and Pyramid Schemes" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bk = w('c6d', 'bakery');
    const st = w('c6d', 'strangers');
    const ow = w('c6d', 'bakers');
    const ar = w('c6d', 'are');
    q(bk, 'pop', 0.5);
    q(st, 'cash', 0.5);
    q(ow, 'buzz', 0.5);
    q(ar, 'stamp', 0.7);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Shop x={960} y={720} s={1.05 * P(A('c6d'))} name="BAKERY" />
          <Bread x={960} y={300} s={1.3 * bump(st, 0.14)} />
          <G2 o={f < ow ? 1 : 0.25}>
            {[0, 1].map((i) => <Stick key={i} f={f} x={240 + i * 170} y={930} s={0.85} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}]} seed={120 + i} acc={i ? ['glasses'] : ['ponytail']} handItem={<Bread s={0.4} />} />)}
          </G2>
          <G2 o={f >= ow ? 1 : 0.25}>
            {[0, 1].map((i) => <Stick key={i} f={f} x={1500 + i * 170} y={930} s={0.85} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.6}]} seed={130 + i} acc={['paperhat']} handItem={<Bread s={0.4} />} />)}
          </G2>
          <G2 x={330} y={560} s={P(A('c6d'))} o={f < ow ? 1 : 0.4}><Text size={36} color={C.green}>strangers buy</Text></G2>
          <G2 x={1590} y={560} s={P(A('c6d'))} o={lt(ow, 0.4)}><Text size={36} color={C.red}>its own bakers buy</Text></G2>
          {f >= ar && <Stamp x={960} y={150} s={pop(f, ar)} text="THE BAKERS ARE THE BUSINESS" color={C.red} size={50} r={-3} />}
        </Svg>
        <DreamFrame label="THINK OF A BAKERY" />
      </AbsoluteFill>
    ));
  }
  {
    const sx = w('c6e', 'sixteen');
    const mi = w('c6e', 'misleading');
    const tw = w('c6e', 'two');
    const ck = w('c6e', 'checks');
    const th = w('c6e', 'fifty');
    q(sx, 'flip', 0.5);
    q(mi, 'buzz', 0.4);
    q(tw, 'cash', 0.8);
    q(ck, 'mail', 0.6);
    q(th, 'ding', 0.5);
    const tt = w('c6f', 'thirds');
    const rt = w('c6f', 'retail');
    const ln = w('c6f', 'line');
    q(tt, 'pop', 0.5);
    q(rt, 'ding', 0.5);
    q(ln, 'draw', 0.5);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={600} y={520} s={P(A('c6e')) * bump(tw, 0.06)} org="FTC" sub="HERBALIFE SETTLEMENT · 2016" title={['charged: misleading earnings claims', f >= ck ? 'checks to ~350,000 people' : '...']} stat={f >= tw ? '$200M' : '$?'} statLabel="paid to consumers" color={C.navy} />
          <Gavel x={1450} y={330} s={0.9 * P(A('c6e'))} />
          <Box x={1450} y={720} w={720} h={240} s={P(A('c6e')) * bump(tt, 0.1)} o={lt(tt, 0.35)} fill={f >= rt ? C.yellow : '#fff'}>
            <Text y={-60} size={32} color={GRAY}>new rule in the deal:</Text>
            <Text y={10} size={56}>2/3 of rewards</Text>
            <Text y={75} size={36} color={C.green}>from real retail sales</Text>
          </Box>
          <SourceTag f={f} at={sx} text="FTC press releases, Jul 2016 & Jan 2017" />
        </Svg>
        <OldFilm f={f} o={f < A('c6f') ? 0.6 : 0} />
      </AbsoluteFill>
    ));
  }
  {
    const lg = w('c6g', 'legal');
    const lt2 = w('c6g', 'little');
    const ls = w('c6g', 'lose');
    q(lg, 'paper', 0.5);
    q(lt2, 'stamp', 0.7);
    q(ls, 'thud', 0.6);
    const tw = w('c6h', 'twice');
    const ph = w('c6h', 'phone');
    const tr = w('c6h', 'terrible');
    q(tw, 'flip', 0.4);
    q(ph, 'pop', 0.5);
    q(tr, 'sting', 0.7);
    scene(A('c6g'), () =>
      f < A('c6h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={480} w={1400} h={480} s={P(A('c6g'))}>
              <Text y={-170} size={36} color={GRAY}>FTC CONSUMER ADVICE PAGE</Text>
              <Text y={-70} size={50}>"Most people who join legitimate MLMs</Text>
              <Text y={10} size={62} color={f >= lt2 ? C.red : C.ink}>make little or no money.</Text>
              <Text y={100} size={50} color={f >= ls ? C.red : '#C9CED6'}>Some of them lose money."</Text>
            </Box>
            <SourceTag f={f} at={lg} text="FTC, consumer.ftc.gov (MLMs and pyramid schemes)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={700} y={930} s={1.25} sweat={f >= tr} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.6}, {at: tr, pose: 'shock', expr: 'shock', look: 0.6}]} />
            <G2 x={1240} y={480} s={0.75 * P(A('c6h')) * bump(ph, 0.1)}><ChatPhone to="GRANDMA" lines={['Hey hun!', '...']} /></G2>
            <G2 x={1240} y={110} o={lt(tr, 0.3)}><Text size={50} color={C.red}>wait... what did I type?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: Dave becomes Bob (low point) ============
  {
    const gm = w('c7a', 'grandma');
    const hh = w('c7a', 'hun');
    const op = w('c7a', 'opportunity');
    q(gm, 'pop', 0.5);
    q(hh, 'key', 0.5);
    q(op, 'key2', 0.5);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={520} s={1.15 * P(A('c7a'))}><ChatPhone to="GRANDMA" lines={f >= op ? ['Hey hun!', 'I have an', 'EXCITING', 'opportunity', 'for you!'] : f >= hh ? ['Hey hun!'] : ['...']} /></G2>
          <Grandma f={f} x={1500} y={930} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: op, pose: 'think', expr: 'suspicious', look: -0.6}]} />
          <G2 x={1500} y={420} s={pop(f, op)}><Bubble text="hun??" size={44} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bb = w('c7b', 'bob');
    const zb = w('c7b', 'zombie');
    const bt = w('c7b', 'bite');
    q(bb, 'sting', 0.6);
    q(zb, 'dream', 0.5);
    q(bt, 'boing', 0.6);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill="#4F7A4A" opacity={0.25} />
          <Bob f={f} x={300 + (f - A('c7b')) * 1.2} y={930} s={1} walk keys={[{at: 0, pose: 'carry', expr: 'tired'}]} />
          <Dave f={f} x={620 + (f - A('c7b')) * 1.2} y={930} s={1.1} walk keys={[{at: 0, pose: 'carry', expr: 'tired'}]} />
          <Grandma f={f} x={1500 + (f - A('c7b')) * 1.6} y={930} s={1} walk keys={[{at: 0, pose: 'panic', expr: 'shock'}]} />
          <G2 x={960} y={240} s={P(A('c7b')) * bump(bt, 0.12)}><Text size={60} color={C.ink}>{f >= bt ? 'one bite... and you recruit family' : 'DAVE HAS BECOME BOB'}</Text></G2>
        </Svg>
        <DreamFrame label="ZOMBIE MOVIE" />
      </AbsoluteFill>
    ));
  }
  {
    const ar = w('c7c', 'survey');
    const fr = w('c7c', 'friend');
    const fm = w('c7c', 'family');
    q(ar, 'paper', 0.5);
    q(fr, 'ding', 0.6);
    q(fm, 'ding', 0.6);
    const ms = w('c7d', 'misled');
    const tn = w('c7d', 'thirty');
    const un = w('c7d', 'uncomfortable');
    q(ms, 'buzz', 0.5);
    q(tn, 'stamp', 0.7);
    q(un, 'pop', 0.4);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c7c'))}><Text size={50}>{f >= A('c7d') ? 'and how it felt...' : 'who recruited them?'}</Text></G2>
          <Bar x={360} y={880} s={1.05 * P(A('c7c')) * bump(fr, 0.12)} h={f >= fr ? 340 : 40} color={C.blue} label="A FRIEND" value={f >= fr ? '34%' : '?'} />
          <Bar x={700} y={880} s={1.05 * P(A('c7c')) * bump(fm, 0.12)} h={f >= fm ? 120 : 40} color={C.gold} label="FAMILY" value={f >= fm ? '12%' : '?'} />
          <Bar x={1220} y={880} s={1.05 * P(A('c7c')) * bump(ms, 0.12)} h={f >= ms ? 410 : 40} color={C.red} label="FELT MISLED" value={f >= ms ? '41%' : '?'} />
          <Bar x={1560} y={880} s={1.05 * P(A('c7c')) * bump(tn, 0.12)} h={f >= tn ? 390 : 40} color={C.navy} label="QUIT: AWKWARD" value={f >= tn ? '39%' : '?'} />
          <SourceTag f={f} at={ar} text="AARP Foundation MLM survey (2018)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c7e', 'called');
    const qt = w('c7e', 'quiet');
    const ad = w('c7e', 'admitted');
    const ls = w('c7e', 'losing');
    q(cl, 'click', 0.5);
    q(qt, 'cricket', 0.6);
    q(ad, 'pop', 0.4);
    q(ls, 'trombone', 0.6);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <rect x={958} y={80} width={4} height={860} fill={C.ink} />
          <Dave f={f} x={480} y={930} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.6}]} handItem={<Phone s={0.3} value="BOB" title="CALL" />} />
          <Bob f={f} x={1440} y={930} s={1.15} sweat keys={[{at: 0, pose: 'hold', expr: 'sad', look: -0.6}, {at: ls, pose: 'facepalm', expr: 'sad', look: -0.6}]} handItem={<Phone s={0.3} value="DAVE" title="CALL" />} />
          <G2 x={1440} y={430} s={P(A('c7e'))}><Bubble text={f >= ls ? "I'm losing\nmoney too..." : f >= qt ? '...' : 'hey Dave!'} size={44} tail="down" /></G2>
          <G2 x={480} y={430} s={P(A('c7e'))}><Bubble text="Bob... be honest." size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dn = w('c7f', 'down');
    const fb = w('c7f', 'boxes');
    const tx = w('c7f', 'text');
    q(dn, 'thud', 0.7);
    q(fb, 'thud', 0.5);
    q(tx, 'sting', 0.5);
    const dl = w('c7g', 'deleted');
    const rl = w('c7g', 'rule');
    const up = w('c7g', 'upline');
    q(dl, 'poof', 0.6);
    q(rl, 'ding', 0.6);
    q(up, 'pop', 0.4);
    scene(A('c7f'), () =>
      f < A('c7g') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={1220} y={920}><BoxPile n={40} s={0.85 * P(A('c7f'))} /></G2>
            <Dave f={f} x={320} y={930} s={1.15} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.6}]} />
            <Box x={760} y={240} w={620} h={240} s={P(A('c7f')) * bump(dn, 0.14)} fill={C.red}>
              <Text y={-60} size={34} color="#fff">DAVE IS DOWN</Text>
              <Text y={30} size={96} color="#fff">$1,649</Text>
            </Box>
            <G2 x={1500} y={240} o={lt(tx, 0.3)}><ChatPhone s={0.4} to="GRANDMA" lines={['Hey hun!']} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={520} s={0.95 * P(A('c7g'))}><ChatPhone to="GRANDMA" lines={['Hey hun!', 'I have an', 'EXCITING', 'opportunity']} deleted={f >= dl ? 1 : 0} /></G2>
            {f >= dl && <G2 x={560} y={420} s={pop(f, dl)}><XMark s={1.3} /></G2>}
            <G2 x={1360} y={460} s={P(A('c7g')) * bump(rl, 0.1)}>
              <rect x={-330} y={-220} width={660} height={440} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
              {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-280} y={-170 + i * 60} width={i === 3 ? 560 : 480} height={20} rx={10} fill={i === 3 && f >= rl ? C.yellow : '#E3E8EE'} />)}
              <Text y={-200 + 10} size={1}>{''}</Text>
            </G2>
            <G2 x={1460} y={560} s={P(A('c7g')) * bump(rl, 0.14)}><Magnifier s={1.2} /></G2>
            <G2 x={1360} y={800} o={lt(up, 0.35)}><Text size={44} color={C.red}>the rule the upline never mentions</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8: Dave fights back ============
  {
    const ed = w('c8a', 'education');
    const cn = w('c8a', 'cancelled');
    const wr = w('c8a', 'writing');
    const zr = w('c8a', 'zero');
    q(ed, 'pop', 0.4);
    q(cn, 'scribble', 0.6);
    q(wr, 'paper', 0.5);
    q(zr, 'chime', 0.6);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100} s={P(A('c8a'))}><Text size={50}>Dave fights back</Text></G2>
          <G2 x={960} y={160} s={P(A('c8a'))}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          <Row x={80} y={300} s={0.9 * P(A('c8a'))} n={1} text="Cancel autoship, in writing" lit={1} color={C.green} w={900} />
          <G2 x={540} y={640} s={1.3 * P(A('c8a')) * bump(wr, 0.1)}><Envelope label={f >= cn ? 'CANCEL AUTOSHIP' : 'TO: THE COMPANY'} /></G2>
          <Box x={1440} y={560} w={620} h={300} s={P(A('c8a')) * bump(zr, 0.14)} fill={f >= zr ? '#E6F7EE' : '#fff'}>
            <Text y={-80} size={34} color={GRAY}>next month's charge</Text>
            <Text y={30} size={110} color={f >= zr ? C.green : C.red}>{f >= zr ? '$0' : '$150'}</Text>
          </Box>
          <Dave f={f} x={1700} y={930} s={0.85} keys={[{at: 0, pose: 'typing', expr: 'think', look: -0.6}, {at: zr, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rl = w('c8b', 'rule');
    const ds = w('c8b', 'direct');
    const tw = w('c8b', 'twelve');
    const nn = w('c8b', 'ninety');
    q(rl, 'pop', 0.5);
    q(ds, 'paper', 0.6);
    q(tw, 'ding', 0.5);
    q(nn, 'stamp', 0.8);
    const rc = w('c8c', 'receipt');
    const sw = w('c8c', 'sweater');
    q(rc, 'crinkle', 0.5);
    q(sw, 'ding', 0.5);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Row x={80} y={160} s={0.9 * P(A('c8b'))} n={2} text="Ask for the buyback" lit={1} color={C.green} w={900} />
          <SourceCard x={620} y={600} s={0.95 * P(A('c8b')) * bump(nn, 0.06)} org="DIRECT SELLING ASSOCIATION" sub="CODE OF ETHICS (MEMBERS)" title={['buy back sellable inventory', f >= tw ? 'bought in the last 12 months' : '...']} stat={f >= nn ? '90%+' : '?%'} statLabel="of what you paid" color={C.green} />
          <G2 x={1460} y={500} s={P(A('c8b')) * bump(sw, 0.1)} o={lt(rc, 0.35)}>
            <Sweater s={1.1} />
            <G2 x={170} y={170} r={12}>
              <rect x={-80} y={-110} width={160} height={220} rx={8} fill="#fff" stroke={C.ink} strokeWidth={5} />
              <Text y={-70} size={26}>RECEIPT</Text>
              {[0, 1, 2].map((i) => <rect key={i} x={-55} y={-35 + i * 40} width={110} height={14} rx={7} fill="#E3E8EE" />)}
            </G2>
          </G2>
          <G2 x={1460} y={880} o={lt(rc, 0.35)}><Text size={38} color={C.green}>like a receipt you forgot</Text></G2>
          <SourceTag f={f} at={ds} text="Direct Selling Association, Code of Ethics (inventory repurchase)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ck = w('c8d', 'checked');
    const mb = w('c8d', 'member');
    const un = w('c8d', 'unopened');
    const ff = w('c8d', 'fifty');
    q(ck, 'click', 0.5);
    q(mb, 'ding', 0.5);
    q(un, 'pop', 0.4);
    q(ff, 'cash', 0.6);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={1160} y={930}><BoxPile n={Math.round(lerp(10, 28, ease(f, un, un + 40)))} s={0.75 * P(A('c8d'))} /></G2>
          <Dave f={f} x={330} y={930} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.8}, {at: ff, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
          <Box x={1160} y={200} w={680} h={220} s={P(A('c8d')) * bump(ff, 0.12)} fill={f >= ff ? C.yellow : '#fff'}>
            <Text y={-50} size={34} color={GRAY}>{f >= mb ? "Bob's company: DSA member" : 'is the company a member?'}</Text>
            <Text y={30} size={70}>{f >= ff ? '$1,050 unopened' : 'counting...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st = w('c8e', 'three');
    const dc = w('c8e', 'disclosure');
    const ex = w('c8e', 'expenses');
    const ou = w('c8e', 'outside');
    q(st, 'pop', 0.5);
    q(dc, 'ding', 0.5);
    q(ex, 'ding', 0.5);
    q(ou, 'ding', 0.6);
    const an = w('c8f', 'answer', 1);
    q(an, 'stamp', 0.8);
    const qs = ['Can I see the income disclosure?', 'What do people earn after expenses?', 'How much comes from outside customers?'];
    const at = [dc, ex, ou];
    scene(A('c8e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Row x={80} y={150} s={0.9 * P(A('c8e'))} n={3} text="For next time: ask first" lit={1} color={C.green} w={900} />
          {qs.map((x, i) => (
            <G2 key={i} x={820} y={340 + i * 170} s={P(A('c8e')) * bump(at[i], 0.06)} o={lt(at[i], 0.35)}>
              <rect x={-720} y={-60} width={1440} height={120} rx={24} fill={f >= at[i] ? '#E6F7EE' : '#fff'} stroke={C.ink} strokeWidth={5} />
              <Text x={-680} y={2} size={44} anchor="start">{`${i + 1}. ${x}`}</Text>
            </G2>
          ))}
          {f >= A('c8f') && <Stamp x={1500} y={880} s={pop(f, A('c8f') + 4) * bump(an, 0.2)} text={f >= an ? 'NO ANSWER = THE ANSWER' : 'no answer?'} color={C.red} size={46} r={-4} />}
          <Dave f={f} x={1760} y={700} s={0.7} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c8g', 'called');
    const sn = w('c8g', 'sentence');
    const cc = w('c8g', 'cancelling');
    const bb = w('c8g', 'buyback');
    q(cl, 'click', 0.5);
    q(sn, 'pop', 0.5);
    q(cc, 'key', 0.5);
    q(bb, 'ding', 0.7);
    scene(A('c8g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={360} y={930} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: cc, pose: 'talk', expr: 'smug', look: 0.8}]} handItem={<Phone s={0.32} value="CALL" title="COMPANY" />} />
          <G2 x={1140} y={430} s={P(A('c8g')) * bump(bb, 0.08)}>
            <Bubble text={`"I'm ${f >= cc ? 'CANCELLING' : '______'}, and I'd like\nthe ${f >= bb ? 'INVENTORY BUYBACK' : '________'}\non my unopened products."`} size={50} tail="left" />
          </G2>
          <G2 x={1140} y={800} o={lt(sn, 0.35)}><Text size={44} color={C.navy}>the one sentence</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wk = w('c8h', 'weeks');
    const tf = w('c8h', 'forty', 1);
    q(wk, 'mail', 0.5);
    q(tf, 'cash', 0.6);
    q(FINAL, 'stamp', 0.8);
    const shown = f < SAVE ? 1649 : f < tf ? lerp(1649, 704, ease(f, SAVE, SAVE + 20)) : lerp(704, 464, ease(f, tf, tf + 20));
    scene(A('c8h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={480} s={1.3 * P(A('c8h')) * bump(SAVE, 0.12)}><Phone value={f >= SAVE ? '+$945' : 'pending...'} color={f >= SAVE ? C.green : GRAY} title="DAVE'S BANK" /></G2>
          <Box x={1320} y={430} w={780} h={420} s={P(A('c8h')) * bump(FINAL, 0.12)} fill={f >= FINAL ? '#E6F7EE' : '#fff'}>
            <Text y={-150} size={36} color={GRAY}>DAVE'S DAMAGE</Text>
            <Text y={-40} size={60} color={GRAY}>{f >= SAVE ? <tspan textDecoration="line-through">$1,649</tspan> : '$1,649'}</Text>
            <Text y={80} size={130} color={f >= FINAL ? C.green : C.red}>{fmt(shown)}</Text>
          </Box>
          <G2 x={1320} y={760} o={lt(tf, 0.3)}><Text size={38} color={C.navy}>- $945 buyback - $240 sold</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bq = w('c8i', 'question');
    const tr = w('c8i', 'triangle');
    const tp = w('c8i', 'top');
    const cl = w('c8i', 'climbing');
    q(bq, 'pop', 0.5);
    q(tr, 'whoosh_s', 0.5);
    q(tp, 'cash', 0.6);
    q(cl, 'chime', 0.7);
    scene(A('c8i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={600} s={1.15 * P(A('c8i'))}><PyramidDiagram highlight={f >= tp ? 0 : -1} top="" bottom="" /></G2>
          <MoneyFlowUp x={760} y={560} s={1.1 * P(A('c8i'))} f={f} />
          <Banker f={f} x={760} y={330} s={0.7 * P(A('c8i'))} keys={[{at: 0, pose: 'celebrate', expr: 'smug'}]} />
          <Dave f={f} x={f >= cl ? 1300 + (f - cl) * 3 : 1300} y={930} s={1.1} walk={f >= cl} keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.8}, {at: cl, pose: 'wave', expr: 'grin', look: 0.6}]} />
          <G2 x={1460} y={280} s={P(A('c8i')) * bump(tr, 0.1)}><Text size={52}>{f >= tr ? 'the money went UP' : 'where did it go?'}</Text></G2>
          <G2 x={1460} y={380} o={lt(tp, 0.3)}><Text size={40} color={C.red}>to the company + the few at the top</Text></G2>
          {f >= cl && <Stamp x={1460} y={560} s={pop(f, cl)} text="DAVE STOPPED CLIMBING" color={C.green} size={48} r={-3} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ WHAT DAVE LEARNED ============
  {
    const r = [bs('r1'), bs('r2'), bs('r3')];
    r.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Read the label first: the income disclosure', 'Must buy every month to stay in? You are the customer', 'Leaving? Ask for the buyback. 90% beats zero'];
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('r1'))}><Text size={80}>WHAT DAVE LEARNED</Text></G2>
          {items.map((b, i) => <Row key={i} x={160} y={340 + i * 180} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1600} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('r4', 'free');
    const ds = w('r4', 'disagrees');
    q(fr, 'ding', 0.6);
    q(ds, 'buzz', 0.6);
    const sb = w('r5', 'subscribe');
    const au = w('r5', 'autoship');
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(au, 'boing', 0.5);
    scene(A('r4'), () =>
      f < A('r5') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('r4'))}><Text size={50} color={GRAY}>next time, Dave's next problem...</Text></G2>
            <G2 x={640} y={540} s={1.3 * P(A('r4')) * bump(fr, 0.12)}><Phone value="FREE" color={C.green} title="NEW GAME" /></G2>
            <G2 x={1300} y={540} s={1.3 * P(A('r4')) * bump(ds, 0.12)}><Phone value={f >= ds ? '-$???' : '...'} color={C.red} title="DAVE'S BANK" /></G2>
            <Dave f={f} x={1700} y={930} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.6}, {at: ds, pose: 'shock', expr: 'shock', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={400} s={1.4 * pop(f, A('r5'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1420} y={400} s={1.1 * pop(f, A('r5') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={900} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Bob f={f} x={680} y={900} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy'}]} handItem={<ShakeBox s={0.3} />} />
            <G2 x={1300} y={760} s={pop(f, A('r5') + 6) * bump(au, 0.12)}><Text size={44} color={C.green}>free. no autoship.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {meterOn && (
        <Svg>
          <DamageMeter x={1700} y={110} s={pop(f, A('o4') + 6) * bump(lastHit, 0.18) * bump(SAVE, 0.18)} value={fmt(dmg)} flash={f >= lastHit && f < lastHit + 15 ? 1 : 0} saved={f >= SAVE ? '+$945' : undefined} />
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

const Card2: React.FC<{top: string; big: string; color: string}> = ({top, big, color}) => (
  <g>
    <rect x={-220 + 8} y={-110 + 10} width={440} height={220} rx={24} fill="rgba(35,35,43,0.12)" />
    <rect x={-220} y={-110} width={440} height={220} rx={24} fill={color} stroke={C.ink} strokeWidth={6} />
    <Text y={-50} size={34} color={C.ink}>{top}</Text>
    <Text y={30} size={96} color={C.ink}>{big}</Text>
  </g>
);

const Person2: React.FC<{x?: number; y?: number; c: string}> = ({x = 0, y = 0, c}) => (
  <g transform={`translate(${x},${y})`}>
    <circle cy={-70} r={34} fill={c} stroke={C.ink} strokeWidth={5} />
    <path d="M -50 60 Q -50 -20 0 -20 Q 50 -20 50 60 Z" fill={c} stroke={C.ink} strokeWidth={5} />
  </g>
);
