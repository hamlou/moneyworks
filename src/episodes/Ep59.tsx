import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Car, Desk, MoneyStack, Pencil, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Envelope, Magnifier, Mailbox, Phone, Row, Sign, SubButton, Bell} from '../props2';
import {Raccoon, SourceCard} from '../props3';
import {House, Pizza, Sandwich} from '../props4';
import {Hospital} from '../props40';
import {DamageMeter} from '../props53';
import {Napkin} from '../props56';
import {Contract} from '../props5';
import {Dealership, TowTruck} from '../props23';
import {Door, Gavel, Handset, Laptop} from '../props26';
import {WholesalerHQ} from '../props51';
import {Handcuffs} from '../props30';
import {People} from '../props35';
import {Notif} from '../props38';
import {Ghost} from '../props39';
import {Paycheck, Scale} from '../props8';
import {AgeBadge, ExpenseRatioLine, FinishLine, FRABadge, Lunchbox, NameTag, PicnicBasket, RetirementCalc, SSdial, TrustJar, VendingMachine} from '../props59';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Dad: React.FC<SP> = (p) => <Stick acc={['cap', 'glasses']} seed={19} {...p} />;
const Officer: React.FC<SP> = (p) => <Stick acc={['ponytail', 'glasses']} seed={44} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Boss: React.FC<SP> = (p) => <Stick acc={['tie', 'glasses']} seed={52} {...p} />;

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

const getDamage = (f: number, stages: {at: number; val: number}[]) => {
  for (let i = stages.length - 1; i >= 0; i--) {
    if (f >= stages[i].at) return stages[i].val;
  }
  return 0;
};

export const Ep59: React.FC = () => {
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
  const o1Scene = (ff: number) => {
    const bd = w('o1', 'birthday');
    const wo = w('o1', 'work');
    return (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={960} y={880} w={600} />
          <Dave f={ff} x={960} y={820} s={1.0} keys={[{at: 0, pose: 'typing', expr: 'tired', look: 0}]} />
          <NameTag x={960} y={420} s={1.0 * bump(bd, 0.1)} />
          <AgeBadge x={560} y={300} s={0.85 * bump(wo, 0.12)} age="70" />
          <Laptop x={1200} y={600} s={0.7} />
          <G2 x={960} y={140} s={bump(bd, 0.1)}><Text size={44} color={C.red}>BIRTHDAY AT WORK</Text></G2>
        </Svg>
      </AbsoluteFill>
    );
  };
  {
    q(2, 'tick', 0.4);
    q(w('o1', 'birthday'), 'pop', 0.5);
    q(w('o1', 'work'), 'stamp', 0.6);
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
          <G2 x={960} y={260} s={P(FR) * bump(w('o2', 'freeze'), 0.12)}>
            <Stamp text="FREEZE" color={C.red} size={70} r={-4} />
          </G2>
          <G2 x={960} y={500} s={P(FR)} o={lt(w('o2', 'how'), 0.45)}><Text size={56} color={C.ink} stroke="#fff" sw={10}>how did he end up here?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
    scene(RW, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.5)'}}>{o1Scene(Math.max(0, FR - (f - RW) * 4))}</AbsoluteFill>
        <Svg>
          <G2 x={960} y={520} s={P(RW) * 1.2}><Stamp text="35 YEARS EARLIER" color={C.navy} size={80} r={-3} /></G2>
          <G2 x={960} y={700} o={0.8}><Text size={90} color="#fff" stroke={C.ink} sw={10}>{'<< <<'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
  }
  {
    const ag = w('o3', 'age');
    const op = w('o3', 'opens');
    q(A('o3') + 4, 'pop', 0.5);
    q(ag, 'pop2', 0.4);
    q(op, 'click', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <RetirementCalc x={960} y={540} s={0.95 * P(A('o3')) * bump(op, 0.08)} age="??" />
          <Dave f={f} x={1520} y={900} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}]} />
          <G2 x={960} y={160} s={P(A('o3'))}><Text size={48} color={GRAY}>RETIREMENT CALCULATOR</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('o4', 'seventy');
    const fv = w('o4', 'five');
    const land = fv + 20;
    q(sv, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    q(fv, 'buzz', 0.5);
    scene(A('o4'), () => {
      const sk = shake(f, land, 16, 14);
      const z = 1 + 0.12 * ease(f, land, land + 10);
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, z, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('o4'))}><Text size={56} color={GRAY}>RETIREMENT CALCULATOR</Text></G2>
              <Box x={560 + sk.x} y={480 + sk.y} w={640} h={280} s={P(A('o4')) * bump(sv, 0.1)} fill={f >= sv ? C.yellow : '#fff'}>
                <Text y={-60} size={36} color={GRAY}>RETIRE AT:</Text>
                <Text y={40} size={130} color={f >= sv ? C.red : C.ink}>{f >= sv ? '70' : '??'}</Text>
              </Box>
              <Box x={1380} y={640} w={620} h={300} s={P(A('o4'))} fill={f >= land ? C.yellow : '#fff'}>
                <Text y={-70} size={38} color={GRAY}>vs. Dad:</Text>
                <Text y={30} size={90} color={f >= fv ? C.red : C.ink}>{f >= fv ? '+5 YEARS' : '?'}</Text>
              </Box>
              <Dave f={f} x={340} y={960} s={0.9} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const wh = w('o5', 'who');
    const fn = w('o5', 'finish');
    q(wh, 'pop', 0.5);
    q(fn, 'whoosh_s', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <FinishLine x={560} y={560} s={1.3 * P(A('o5'))} moved={0} label="65" />
          <G2 x={1200} y={560} s={1.3 * bump(fn, 0.12)}><FinishLine label="70" /></G2>
          <Dave f={f} x={960} y={960} s={1.0} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0}]} />
          <G2 x={960} y={200} s={P(A('o5')) * bump(wh, 0.1)}><Text size={54}>who moved the finish line?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const kn = w('o6', 'know');
    const bo = w('o6', 'boring');
    const st = w('o6', 'stealing');
    q(kn, 'pop', 0.5);
    q(bo, 'ding', 0.5);
    q(st, 'sting', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <ExpenseRatioLine x={720} y={540} s={0.85 * P(A('o6')) * bump(bo, 0.06)} ratio="?.?%" hl={f >= bo ? 1 : 0} />
          <Dave f={f} x={1500} y={920} s={1.05} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          <G2 x={1500} y={340} s={bump(st, 0.12)} o={lt(st, 0.4)}><Bubble text="the boring line..." size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  const T = (x: number, y: number, txt: string, size = 48, color: string = C.ink, s = 1, o = 1) => (
    <G2 x={x} y={y} s={s} o={o}><Text size={size} color={color}>{txt}</Text></G2>
  );

  // ============ CH1: WHAT DID DAD HAVE? ============
  {
    const cl = w('c1a', 'calls');
    const sx = w('c1a', 'sixty');
    const hw = w('c1a', 'how');
    q(cl, 'click', 0.6);
    q(sx, 'pop', 0.6);
    q(hw, 'pop2', 0.5);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <path d="M 960 240 V 1000" stroke={C.ink} strokeWidth={6} strokeDasharray="18 14" />
          <Dave f={f} x={480} y={900} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'worried', look: 0.6, talk: true}]} />
          <Dad f={f} x={1400} y={900} s={1.15} flip keys={[{at: 0, pose: 'relax', expr: 'happy', look: -0.6}]} />
          {T(480, 160, 'DAVE, 35', 48, GRAY, P(A('c1a')))}
          {T(1400, 160, 'DAD', 48, GRAY, P(A('c1a')))}
          <AgeBadge x={1400} y={300} s={1.2 * P(A('c1a')) * bump(sx, 0.16)} age="62" />
          {T(1400, 430, 'stopped working', 42, C.green, P(A('c1a')), lt(sx, 0.4))}
          <G2 x={480} y={360} s={bump(hw, 0.18)} o={lt(hw, 0.35)}><Bubble text="HOW?!" size={60} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pn = w('c1b', 'pension');
    const ck = w('c1b', 'check');
    const lf = w('c1b', 'life');
    q(pn, 'ding', 0.6);
    q(ck, 'mail', 0.6);
    q(lf, 'chime', 0.5);
    scene(A('c1b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dad f={f} x={420} y={900} s={1.2} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6, talk: true}]} />
          <G2 x={420} y={330} s={P(A('c1b')) * bump(pn, 0.12)}><Bubble text="I had a pension." size={46} tail="down" /></G2>
          <Mailbox x={980} y={640} s={1.2 * P(A('c1b'))} flag={f >= ck ? 1 : 0} />
          <Envelope x={1300} y={520} s={1.1 * P(A('c1b')) * bump(ck, 0.14)} label="MONTHLY CHECK" />
          {T(1140, 880, 'every month. for life.', 50, C.green, bump(lf, 0.12), lt(lf, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const vd = w('c1c', 'vending');
    const th = w('c1c', 'thirty');
    const sd = w('c1c', 'sandwich');
    const fo = w('c1c', 'forever');
    q(vd, 'dream', 0.5);
    q(th, 'tick', 0.5);
    q(sd, 'thud', 0.6);
    q(fo, 'chime', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <VendingMachine x={700} y={540} s={1.15 * P(A('c1c')) * bump(vd, 0.06)} drop={ease(f, sd, sd + 14)} />
          <Sandwich x={1180} y={480} s={1.3 * P(A('c1c')) * bump(sd, 0.14)} n={3} />
          {T(1180, 300, 'work 30 years', 48, C.navy, P(A('c1c')) * bump(th, 0.12))}
          {T(1180, 700, 'a sandwich every month', 46, C.ink, P(A('c1c')), lt(sd, 0.4))}
          {T(1180, 790, 'FOREVER', 64, C.green, bump(fo, 0.18), lt(fo, 0.35))}
          <Dad f={f} x={1560} y={940} s={0.95} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
        <DreamFrame label="THE PENSION MACHINE" />
      </AbsoluteFill>
    ));
  }
  {
    const no = w('c1d', 'no');
    const yr = w('c1d', 'nineteen');
    const ml = w('c1d', 'million');
    q(no, 'buzz', 0.5);
    q(yr, 'flip', 0.5);
    q(ml, 'stamp', 0.7);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={300} y={920} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.6}]} />
          <G2 x={300} y={380} s={0.5 * P(A('c1d'))} o={0.9}><VendingMachine /></G2>
          <G2 x={300} y={380} s={0.45 * bump(no, 0.2)} o={lt(no, 0.0001)}><XMark /></G2>
          <Calendar x={860} y={420} s={1.1 * P(A('c1d')) * bump(yr, 0.1)} year={1975} flip={0} />
          <Box x={1260} y={640} w={640} h={300} s={P(A('c1d')) * bump(ml, 0.1)} fill={f >= ml ? C.yellow : '#fff'}>
            <Text y={-70} size={36} color={GRAY}>workers earning a pension</Text>
            <Text y={40} size={100} color={C.navy}>{f >= ml ? '27 MILLION' : '? MILLION'}</Text>
          </Box>
          <SourceTag f={f} at={ml} text="U.S. Dept. of Labor, Private Pension Plan Bulletin: 27.2M active participants (1975)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const el = w('c1e', 'eleven');
    const on = w('c1e', 'one');
    const sv = w('c1e', 'seven');
    q(el, 'stamp', 0.7);
    q(on, 'pop', 0.5);
    q(sv, 'ding', 0.6);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={420} y={860}><Bar h={520} color={C.navy} label="1975" value="27M" /></G2>
          <G2 x={760} y={860}><Bar h={f >= el ? lerp(520, 212, ease(f, el, el + 18)) : 520} color={C.red} label="TODAY" value={f >= el ? '11M' : '?'} /></G2>
          {T(590, 180, 'pension workers', 46, GRAY, P(A('c1e')))}
          <People x={1451} y={1002} s={1.8 * P(A('c1e'))} n={7} hot={f >= on ? 1 : 0} />
          {T(1300, 760, '1 in 7', 84, C.red, P(A('c1e')) * bump(sv, 0.14), lt(on, 0.4))}
          {T(1300, 850, 'even has access to one', 40, C.ink, P(A('c1e')), lt(on, 0.4))}
          <SourceTag f={f} at={on} text="DOL (2023): 11.1M | BLS Employee Benefits, March 2025: 14% of private workers" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fk = w('c1f', 'four');
    const lb = w('c1f', 'lunchbox');
    const la = w('c1f', 'last');
    q(fk, 'pop', 0.5);
    q(lb, 'clank', 0.6);
    q(la, 'tick', 0.5);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={380} y={520} s={0.75 * P(A('c1f'))} o={0.45}><VendingMachine /></G2>
          {T(380, 180, "DAD'S", 44, GRAY, P(A('c1f')))}
          <Lunchbox x={1020} y={520} s={2.0 * P(A('c1f')) * bump(lb, 0.1)} label="401(k)" open={f >= lb ? 1 : 0} />
          {T(1020, 180, "DAVE'S", 44, C.red, P(A('c1f')) * bump(fk, 0.12))}
          {T(1020, 840, 'fill it yourself. make it last.', 46, C.ink, bump(la, 0.1), lt(lb, 0.4))}
          <Dave f={f} x={1560} y={940} s={1.05} flip keys={[{at: 0, pose: 'carry', expr: 'worried', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ad = w('c1g', 'advantage');
    const gv = w('c1g', 'government');
    q(ad, 'pop', 0.5);
    q(gv, 'sting', 0.6);
    scene(A('c1g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dad f={f} x={520} y={900} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}]} />
          {T(1100, 320, 'Dad had one more', 54, C.ink, P(A('c1g')))}
          {T(1100, 420, 'ADVANTAGE', 80, C.navy, P(A('c1g')) * bump(ad, 0.14))}
          <Box x={1100} y={680} w={560} h={220} s={P(A('c1g')) * bump(gv, 0.12)} fill={f >= gv ? C.yellow : '#fff'}>
            <Text y={-20} size={44} color={GRAY}>from:</Text>
            <Text y={50} size={56} color={C.red}>{f >= gv ? 'THE GOVERNMENT' : '? ? ?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: THE FINISH LINE MOVED ============
  {
    const st = w('c2a', 'statement');
    const wd = w('c2a', 'weird');
    const sx = w('c2a', 'sixty');
    q(st, 'click', 0.6);
    q(wd, 'pop2', 0.5);
    q(sx, 'stamp', 0.7);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={1000} y={900} w={900} />
          <Laptop x={1000} y={640} s={1.0 * P(A('c2a'))} />
          <FRABadge x={1000} y={380} s={1.0 * P(A('c2a')) * bump(sx, 0.14)} age={f >= sx ? '67' : '??'} color={f >= sx ? C.red : C.navy} />
          {T(1000, 120, 'SOCIAL SECURITY STATEMENT', 44, GRAY, P(A('c2a')) * bump(st, 0.08))}
          <Dave f={f} x={520} y={940} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: 0.6}, {at: wd, pose: 'think', expr: 'suspicious', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wt = w('c2b', 'wait');
    const fv = w('c2b', 'five');
    const et = w('c2b', 'eighty');
    const ps = w('c2b', 'pushed');
    q(wt, 'pop', 0.6);
    q(fv, 'ding', 0.5);
    q(et, 'flip', 0.6);
    q(ps, 'whoosh_s', 0.6);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={300} y={920} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}, {at: et, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={300} y={400} s={P(A('c2b')) * bump(wt, 0.14)}><Bubble text="isn't it 65?" size={46} tail="down" /></G2>
          <FRABadge x={820} y={380} s={0.8 * P(A('c2b')) * bump(fv, 0.1)} age="65" />
          {T(820, 560, "Dad's generation", 40, GRAY, P(A('c2b')))}
          <Calendar x={1240} y={400} s={1.0 * P(A('c2b')) * bump(et, 0.12)} year={1983} flip={0} />
          <Gavel x={1240} y={700} s={0.9 * P(A('c2b')) * bump(et, 0.1)} />
          {T(1040, 880, 'Congress slowly pushed it back', 46, C.red, bump(ps, 0.1), lt(ps, 0.4))}
          <SourceTag f={f} at={et} text="Social Security Amendments of 1983 (SSA)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bn = w('c2c', 'born');
    const sv = w('c2c', 'seven');
    const nx = w('c2c', 'next');
    q(bn, 'pop', 0.5);
    q(sv, 'stamp', 0.7);
    q(nx, 'ding', 0.6);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={520} y={440} w={680} h={300} s={P(A('c2c')) * bump(bn, 0.08)}>
            <Text y={-50} size={42} color={GRAY}>born in</Text>
            <Text y={50} size={84} color={C.navy}>1960 or later</Text>
          </Box>
          <FRABadge x={1260} y={440} s={1.05 * P(A('c2c')) * bump(sv, 0.14)} age="67" color={C.red} />
          <Calendar x={520} y={800} s={0.7 * P(A('c2c')) * bump(nx, 0.14)} year={2027} flip={0} top="NEXT YEAR" />
          {T(1160, 800, 'the first people ever reach it', 44, C.ink, P(A('c2c')), lt(nx, 0.4))}
          <SourceTag f={f} at={bn} text="SSA: full retirement age is 67 for anyone born in 1960 or later" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mr = w('c2d', 'marathon');
    const mv = w('c2d', 'moves');
    const tw = w('c2d', 'two');
    q(mr, 'dream', 0.5);
    q(mv, 'whoosh', 0.6);
    q(tw, 'boing', 0.5);
    scene(A('c2d'), () => {
      const m = ease(f, mv, mv + 26);
      return (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <path d="M 120 900 H 1800" stroke={C.ink} strokeWidth={8} />
            <Dave f={f} x={300 + 220 * ease(f, A('c2d'), mv)} y={890} s={1.3} walk keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}, {at: mv + 10, pose: 'shock', expr: 'shock', look: 0.8}]} sweat />
            <G2 x={1000 + m * 520} y={600} s={1.4}><FinishLine label={m > 0.5 ? '67' : '65'} /></G2>
            <path d={`M 1000 960 H ${1000 + m * 520}`} stroke={C.red} strokeWidth={10} strokeDasharray="20 14" opacity={m} />
            {T(1260, 1000, '+2 MILES', 44, C.red, bump(tw, 0.16), m)}
            {T(960, 240, 'someone quietly moves the finish line', 48, C.ink, P(A('c2d')))}
          </Svg>
          <DreamFrame label="THE MARATHON" />
        </AbsoluteFill>
      );
    });
  }
  {
    const th = w('c2e', 'thirteen');
    const lf = w('c2e', 'life');
    const gn = w('c2e', 'gone');
    q(th, 'rip', 0.6);
    q(lf, 'thud', 0.5);
    q(gn, 'stamp', 0.7);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(700, 180, 'stop at 65 anyway?', 52, C.ink, P(A('c2e')))}
          <Paycheck x={700} y={500} s={1.3 * P(A('c2e')) * bump(th, 0.08)} amount="SS CHECK" cut={f >= th ? 0.13 : 0} />
          {T(700, 760, '-13%', 110, C.red, P(A('c2e')) * bump(th, 0.16), lt(th, 0.3))}
          {T(700, 870, 'for life', 48, C.red, bump(lf, 0.12), lt(lf, 0.35))}
          <Dave f={f} x={1380} y={920} s={1.15} flip keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.6}, {at: gn, pose: 'facepalm', expr: 'sad', look: 0}]} />
          <G2 x={1300} y={420} s={bump(gn, 0.16)} o={lt(gn, 0.3)}><Stamp text="2 YEARS GONE" color={C.red} size={56} r={-5} /></G2>
          <SourceTag f={f} at={th} text="SSA: with full retirement age 67, claiming at 65 pays about 86.7%" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lb = w('c2f', 'lunchbox');
    const gp = w('c2f', 'gap');
    const sc = w('c2f', 'scary');
    q(lb, 'clank', 0.6);
    q(gp, 'pop', 0.5);
    q(sc, 'sting', 0.7);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={920} s={1.15} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}, {at: sc, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <Lunchbox x={1080} y={560} s={1.9 * P(A('c2f')) * bump(lb, 0.1)} label="401(k)" open={f >= lb ? 1 : 0} />
          {T(1080, 220, 'can it cover the gap?', 54, C.ink, P(A('c2f')) * bump(gp, 0.1))}
          {T(1080, 880, "that's where it got scary", 48, C.red, bump(sc, 0.14), lt(sc, 0.35))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: THE LUNCHBOX TEST ============
  {
    const tw = w('c3a', 'twenty');
    const gd = w('c3a', 'good');
    q(A('c3a') + 6, 'key', 0.5);
    q(tw, 'cash', 0.6);
    q(gd, 'chime', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Phone x={960} y={520} s={1.5 * P(A('c3a')) * bump(tw, 0.08)} title="MY 401(k)" value={f >= tw ? '$25,000' : '$ - - -'} color={C.green} />
          <Dave f={f} x={520} y={940} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: gd, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
          <G2 x={1320} y={760} s={bump(gd, 0.14)} o={lt(gd, 0.35)}><Bubble text="not bad!" size={46} tail="left" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wn = w('c3b', 'wonders');
    const ff = w('c3b', 'fifty');
    const fn = w('c3b', 'finish');
    q(wn, 'pop2', 0.5);
    q(ff, 'pop', 0.5);
    q(fn, 'ding', 0.5);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={320} y={920} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={320} y={400} s={P(A('c3b')) * bump(wn, 0.12)}><Bubble text="what do THEY have?" size={40} tail="down" /></G2>
          <People x={900} y={1059} s={1.7 * P(A('c3b'))} n={12} hot={0} />
          {T(960, 300, 'AGES 55 to 64', 64, C.navy, P(A('c3b')) * bump(ff, 0.12))}
          <G2 x={1420} y={640} s={0.9 * P(A('c3b')) * bump(fn, 0.1)}><FinishLine label="FINISH" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const qk = w('c3c', 'quick');
    const cm = w('c3c', 'comments');
    const mn = w('c3c', 'minute');
    q(qk, 'pop', 0.6);
    for (let i = 0; i < 7; i++) q(qk + 20 + i * 30, 'tick', 0.35);
    q(cm, 'key', 0.5);
    q(mn, 'ding', 0.5);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 170, 'QUICK GUESS', 72, C.red, P(A('c3c')) * bump(qk, 0.12))}
          <Box x={960} y={500} w={980} h={380} s={P(A('c3c'))} fill={C.yellow}>
            <Text y={-110} size={40} color={GRAY}>typical 401(k) balance, ages 55 to 64</Text>
            <Text y={50} size={180} color={C.ink}>{'$ ? ? ?'}</Text>
          </Box>
          <G2 x={300} y={500} s={0.9 * P(A('c3c'))}><circle r={90} fill="#fff" stroke={C.ink} strokeWidth={8} /><path d={`M 0 0 L ${Math.sin(f / 15) * 60} ${-Math.cos(f / 15) * 60}`} stroke={C.red} strokeWidth={8} strokeLinecap="round" /></G2>
          {T(960, 800, 'write your number in the comments', 46, C.navy, bump(cm, 0.1), lt(cm, 0.4))}
          {T(960, 880, 'answer in a minute', 40, GRAY, bump(mn, 0.1), lt(mn, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nv = w('c3d', 'never');
    const ds = w('c3d', 'does');
    q(nv, 'chime', 0.5);
    q(ds, 'trombone', 0.5);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <VendingMachine x={480} y={540} s={1.0 * P(A('c3d')) * bump(nv, 0.06)} drop={(f % 60) / 60} />
          {T(480, 180, 'never runs out', 48, C.green, P(A('c3d')) * bump(nv, 0.12))}
          <Lunchbox x={1260} y={520} s={1.8 * P(A('c3d')) * bump(ds, 0.1)} label="401(k)" open={1} />
          {T(1260, 180, 'runs out', 48, C.red, P(A('c3d')) * bump(ds, 0.14), lt(ds, 0.4))}
          <G2 x={1260} y={520} s={1.6 * bump(ds, 0.12)} o={f >= ds ? 0.9 : 0}><Stamp text="EMPTY" color={C.red} size={60} r={-8} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bg = w('c3e', 'big');
    const nb = w('c3e', 'nobody');
    const lv = w('c3e', 'live');
    q(bg, 'pop', 0.5);
    q(nb, 'pop2', 0.5);
    q(lv, 'heart', 0.6);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Lunchbox x={480} y={540} s={(1.2 + 0.5 * Math.abs(Math.sin(f / 18))) * P(A('c3e'))} label="how big?" />
          <Dave f={f} x={980} y={930} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0}]} />
          <Box x={1380} y={480} w={520} h={320} s={P(A('c3e')) * bump(nb, 0.1)} fill={f >= lv ? C.yellow : '#fff'}>
            <Text y={-90} size={36} color={GRAY}>the number nobody knows</Text>
            <Text y={30} size={110} color={C.red}>? ?</Text>
            <Text y={110} size={36} color={C.ink}>years he will live</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: LIVING TOO LONG? ============
  {
    const fy = w('c4a', 'forty');
    const tv = w('c4a', 'twelve');
    q(fy, 'flip', 0.6);
    q(tv, 'stamp', 0.7);
    scene(A('c4a'), () => (
      <AbsoluteFill style={{filter: 'sepia(0.55)'}}>
        <Board />
        <Svg>
          <Calendar x={420} y={420} s={1.1 * P(A('c4a')) * bump(fy, 0.12)} year={1940} flip={0} />
          <Stick f={f} x={420} y={940} s={1.0} acc={['fedora']} seed={61} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.6}]} />
          {T(1140, 240, 'a man who reached 65 lived', 46, C.ink, P(A('c4a')))}
          <G2 x={1140} y={720}><Bar h={f >= tv ? lerp(40, 254, ease(f, tv, tv + 16)) : 40} w={300} color={C.navy} label="1940" value={f >= tv ? '12.7 more years' : '?'} /></G2>
          <SourceTag f={f} at={tv} text="SSA, Life Expectancy for Social Security: 12.7 years at age 65 (men, 1940)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c4b', 'twenty');
    const gr = w('c4b', 'great');
    const tr = w('c4b', 'terrible');
    q(tw, 'stamp', 0.7);
    q(gr, 'chime', 0.5);
    q(tr, 'trombone', 0.5);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={420} y={860}><Bar h={254} w={240} color={C.navy} label="1940" value="12.7 yrs" /></G2>
          <G2 x={760} y={860}><Bar h={f >= tw ? lerp(254, 400, ease(f, tw, tw + 16)) : 254} w={240} color={C.green} label="TODAY" value={f >= tw ? '~20 yrs' : '?'} /></G2>
          {T(590, 180, 'years left at 65', 46, GRAY, P(A('c4b')))}
          <Dave f={f} x={1180} y={930} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: gr, pose: 'celebrate', expr: 'grin', look: 0}, {at: tr, pose: 'facepalm', expr: 'worried', look: 0}]} />
          <Lunchbox x={1520} y={620} s={1.2 * P(A('c4b')) * bump(tr, 0.14)} label="401(k)" open={1} />
          {T(1300, 330, f >= tr ? 'terrible news for the lunchbox' : 'great news for Dave', 42, f >= tr ? C.red : C.green, bump(gr, 0.1) * bump(tr, 0.1), lt(gr, 0.35))}
          <SourceTag f={f} at={tw} text="CDC/NCHS Data Brief 548 (Jan 2026): 19.7 years at age 65" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sn = w('c4c', 'snacks');
    const wk = w('c4c', 'weekend');
    const th = w('c4c', 'three');
    q(sn, 'dream', 0.5);
    q(wk, 'pop', 0.5);
    q(th, 'boing', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Car x={520} y={760} s={1.2 * P(A('c4c'))} />
          <Lunchbox x={520} y={440} s={1.2 * P(A('c4c')) * bump(sn, 0.12)} label="snacks" open={1} />
          <Calendar x={1200} y={460} s={1.1 * P(A('c4c')) * bump(wk, 0.1) * bump(th, 0.14)} year={f >= th ? '3 WEEKS' : '2 DAYS'} flip={0} top="THE TRIP" />
          <Dave f={f} x={1500} y={930} s={1.0} flip keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}, {at: th, pose: 'panic', expr: 'scream', look: -0.6}]} />
          {T(1200, 760, '20 years of lunches. one box.', 44, C.ink, P(A('c4c')))}
        </Svg>
        <DreamFrame label="THE ROAD TRIP" />
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c4d', 'guess');
    const md = w('c4d', 'median');
    const hd = w('c4d', 'hundred');
    const land = hd + 22;
    q(gs, 'pop', 0.6);
    q(md, 'tick', 0.5);
    q(land, 'stamp', 0.85);
    scene(A('c4d'), () => {
      const sk = shake(f, land, 16, 12);
      const n = Math.round(lerp(0, 107000, ease(f, hd, land)));
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, 1.1, 960, 520]]}>
            <Svg>
              {T(960, 170, 'YOUR GUESS?', 68, C.red, P(A('c4d')) * bump(gs, 0.12))}
              <Box x={960 + sk.x} y={500 + sk.y} w={1040} h={380} s={P(A('c4d'))} fill={C.yellow}>
                <Text y={-110} size={40} color={GRAY}>median 401(k) balance, ages 55 to 64</Text>
                <Text y={50} size={170} color={C.ink}>{f >= hd ? money(n) : '$ ? ? ?'}</Text>
              </Box>
              <Dave f={f} x={300} y={960} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}, {at: land, pose: 'shock', expr: 'shock', look: 0.6}]} />
              <SourceTag f={f} at={land} text="Vanguard, How America Saves 2026: median $107,269 (ages 55-64)" />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const fp = w('c4e', 'four');
    const ts = w('c4e', 'thousand');
    const sx = w('c4e', 'sixty');
    q(fp, 'pop', 0.5);
    q(ts, 'cash', 0.6);
    q(sx, 'stamp', 0.7);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <MoneyStack x={320} y={560} s={1.3 * P(A('c4e'))} n={6} label="$107,000" />
          {T(760, 380, 'x 4% a year', 64, C.navy, P(A('c4e')) * bump(fp, 0.14))}
          {T(760, 470, '(rule of thumb, not a guarantee)', 32, GRAY, P(A('c4e')))}
          {T(760, 620, '= about $4,300 a year', 54, C.ink, P(A('c4e')) * bump(ts, 0.1), lt(ts, 0.35))}
          <Box x={1380} y={640} w={560} h={320} s={P(A('c4e')) * bump(sx, 0.14)} fill={f >= sx ? C.yellow : '#fff'}>
            <Text y={-90} size={36} color={GRAY}>per month</Text>
            <Text y={40} size={130} color={C.red}>{f >= sx ? '$360' : '$ ?'}</Text>
          </Box>
          <SourceTag f={f} at={fp} text="4% rule of thumb (Bengen, 1994): $107,269 x 4% = $4,291 a year" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c4f', 'three');
    const mr = w('c4f', 'more');
    const wh = w('c4f', 'who');
    const mo = w('c4f', 'money');
    q(th, 'pop', 0.5);
    q(mr, 'cash', 0.5);
    q(wh, 'sting', 0.6);
    q(mo, 'step', 0.6);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={380} y={920} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.6}, {at: wh, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          {T(380, 300, '$360 / month', 60, C.red, P(A('c4f')) * bump(th, 0.12))}
          <Dad f={f} x={1420} y={920} s={1.1} flip keys={[{at: 0, pose: 'relax', expr: 'smug', look: -0.6}]} />
          <G2 x={1160} y={560} s={0.55 * P(A('c4f')) * bump(mr, 0.1)}><VendingMachine drop={(f % 50) / 50} /></G2>
          {T(1300, 300, 'Dad gets more', 48, C.green, P(A('c4f')) * bump(mr, 0.12))}
          {T(820, 660, 'who decided this?', 52, C.ink, bump(wh, 0.14), lt(wh, 0.35))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: WHO MOVED THE RISK? ============
  {
    const nk = w('c5a', 'napkin');
    const pn = w('c5a', 'pension');
    const rk = w('c5a', 'risk');
    q(nk, 'paper', 0.6);
    q(pn, 'scribble', 0.5);
    q(rk, 'sting', 0.6);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Desk x={1000} y={920} w={1100} />
          <Napkin x={1000} y={560} s={1.25 * P(A('c5a')) * bump(nk, 0.06)} lines={["DAD'S PENSION", "DAVE'S 401(k)", 'WHO CARRIES THE RISK?']} shown={f >= rk ? 3 : 2} hl={f >= rk ? 2 : -1} w={640} />
          <Pencil x={1380} y={640} s={0.9 * P(A('c5a'))} r={Math.sin(f / 4) * 5} />
          <Dave f={f} x={520} y={960} s={1.05} keys={[{at: 0, pose: 'point_r', expr: 'think', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('c5b', 'crashes');
    const hn = w('c5b', 'hundred');
    const st = w('c5b', 'sits');
    q(cr, 'thud', 0.6);
    q(hn, 'ding', 0.5);
    q(st, 'stamp', 0.7);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 150, 'WITH A PENSION', 56, C.navy, P(A('c5b')))}
          <Row x={520} y={340} s={0.9 * P(A('c5b'))} n={1} text="market crashes? company pays" lit={f >= cr ? 1 : 0.4} />
          <Row x={520} y={480} s={0.9 * P(A('c5b'))} n={2} text="Dad lives to 100? company pays" lit={f >= hn ? 1 : 0.4} />
          <WholesalerHQ x={420} y={780} s={0.6 * P(A('c5b')) * bump(st, 0.08)} label="THE COMPANY" />
          <G2 x={420} y={520} s={bump(st, 0.16)} o={lt(st, 0.3)}><Stamp text="RISK" color={C.red} size={64} r={-6} /></G2>
          
          <Dad f={f} x={1380} y={940} s={1.05} flip keys={[{at: 0, pose: 'relax', expr: 'happy', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ht = w('c5c', 'hits');
    const pb = w('c5c', 'problem');
    const mv = w('c5c', 'moved');
    const on = w('c5c', 'onto');
    q(ht, 'thud', 0.6);
    q(pb, 'buzz', 0.5);
    q(mv, 'whoosh', 0.6);
    q(on + 8, 'stamp', 0.75);
    scene(A('c5c'), () => {
      const m = ease(f, mv, on + 8);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            {T(960, 150, 'WITH A 401(k)', 56, C.red, P(A('c5c')))}
            <Row x={520} y={320} s={0.85 * P(A('c5c'))} n={1} text="market crash? hits Dave" lit={f >= ht ? 1 : 0.4} color={C.red} />
            <Row x={520} y={450} s={0.85 * P(A('c5c'))} n={2} text="lives to 100? Dave's problem" lit={f >= pb ? 1 : 0.4} color={C.red} />
            <WholesalerHQ x={360} y={800} s={0.55 * P(A('c5c'))} label="THE COMPANY" />
            <Dave f={f} x={1400} y={960} s={1.0} flip keys={[{at: 0, pose: 'idle', expr: 'worried', look: -0.6}, {at: on + 8, pose: 'carry', expr: 'tired', look: -0.6}]} sweat />
            <G2 x={lerp(360, 1400, m)} y={lerp(640, 600, m) - Math.sin(m * Math.PI) * 120} s={P(A('c5c')) * bump(on + 8, 0.2)}><Stamp text="RISK" color={C.red} size={64} r={-6} /></G2>
          </Svg>
        </AbsoluteFill>
      );
    });
  }
  {
    const sv = w('c5d', 'seventy');
    const ft = w('c5d', 'fourteen');
    q(sv, 'pop', 0.6);
    q(ft, 'stamp', 0.7);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(760, 160, 'private workers who can get...', 46, GRAY, P(A('c5d')))}
          <G2 x={520} y={880}><Bar h={f >= sv ? lerp(60, 560, ease(f, sv, sv + 18)) : 60} w={280} color={C.red} label="401(k)-style" value={f >= sv ? '70%' : '?'} /></G2>
          <G2 x={1000} y={880}><Bar h={f >= ft ? lerp(60, 112, ease(f, ft, ft + 14)) : 60} w={280} color={C.navy} label="pension" value={f >= ft ? '14%' : '?'} /></G2>
          <Dave f={f} x={1480} y={940} s={1.05} flip keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          <SourceTag f={f} at={sv} text="BLS, Employee Benefits in the United States, March 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('c5e', 'fair');
    const ow = w('c5e', 'owns');
    const kp = w('c5e', 'keeps');
    const fe = w('c5e', 'free');
    q(fr, 'ding', 0.5);
    q(ow, 'pop', 0.5);
    q(kp, 'pop2', 0.5);
    q(fe, 'cash', 0.6);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'TO BE FAIR: THE UPSIDES', 54, C.green, P(A('c5e')) * bump(fr, 0.08))}
          <Row x={520} y={340} s={0.9 * P(A('c5e'))} n={1} text="Dave owns the money" lit={f >= ow ? 1 : 0.4} />
          <Row x={520} y={480} s={0.9 * P(A('c5e'))} n={2} text="it follows him to a new job" lit={f >= kp ? 1 : 0.4} />
          <Row x={520} y={620} s={0.9 * P(A('c5e'))} n={3} text="many companies add free money" lit={f >= fe ? 1 : 0.4} />
          <Lunchbox x={420} y={860} s={1.0 * P(A('c5e')) * bump(fe, 0.12)} label="" open={1} />
          <Dave f={f} x={1500} y={960} s={1.0} flip keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: -0.6}, {at: fe, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nb = w('c5f', 'nobody');
    const hd = w('c5f', 'handed');
    q(nb, 'pop', 0.5);
    q(hd, 'thud', 0.6);
    scene(A('c5f'), () => {
      const m = ease(f, hd, hd + 16);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            {T(960, 200, 'nobody stole it', 56, C.ink, P(A('c5f')) * bump(nb, 0.1))}
            <Boss f={f} x={480} y={920} s={1.1} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.6}]} />
            <Dave f={f} x={1380} y={920} s={1.1} flip keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: hd + 14, pose: 'carry', expr: 'tired', look: -0.6}]} />
            <Box x={lerp(700, 1180, m)} y={lerp(600, 640, m)} w={360} h={200} s={P(A('c5f')) * bump(hd + 16, 0.12)} fill={C.yellow}>
              <Text y={-20} size={34} color={C.ink}>THE WHOLE JOB</Text>
              <Text y={40} size={30} color={GRAY}>of building retirement</Text>
            </Box>
            {T(960, 380, 'it was handed to him', 50, C.red, bump(hd, 0.12), lt(hd, 0.35))}
          </Svg>
        </AbsoluteFill>
      );
    });
  }
  {
    const rc = w('c5g', 'raccoon');
    const fe = w('c5g', 'fee');
    const nv = w('c5g', 'never');
    q(rc, 'sting', 0.7);
    q(fe, 'coin', 0.6);
    q(nv, 'cricket', 0.5);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Lunchbox x={720} y={600} s={1.8 * P(A('c5g'))} label="401(k)" open={1} />
          <Raccoon f={f} x={1180} y={640} s={1.3 * P(A('c5g')) * bump(rc, 0.14)} mood="greedy" holdCoin grab={f >= fe ? 1 : 0} />
          {T(1180, 300, 'THE RACCOON', 52, C.red, P(A('c5g')) * bump(rc, 0.12))}
          {T(1180, 940, 'a tiny fee. every single year.', 44, C.ink, bump(fe, 0.1), lt(fe, 0.4))}
          <Dave f={f} x={300} y={940} s={1.0} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: THE BACKUP PLAN CRACKS ============
  {
    const bk = w('c6a', 'backup');
    const tg = w('c6a', 'thought');
    const np = w('c6a', 'nope');
    q(bk, 'pop', 0.5);
    q(tg, 'dream', 0.4);
    q(np, 'buzz', 0.6);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Dave f={f} x={380} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}]} />
          {T(1000, 200, 'BACKUP PLAN: SOCIAL SECURITY', 50, C.navy, P(A('c6a')) * bump(bk, 0.08))}
          <TrustJar x={1100} y={560} s={1.1 * P(A('c6a'))} empty={f >= tg ? ease(f, tg, tg + 30) : 0} label="" />
          {T(1100, 860, '"it will run out completely"', 44, GRAY, P(A('c6a')), lt(tg, 0.4))}
          <G2 x={1100} y={560} s={1.5 * bump(np, 0.18)} o={f >= np ? 1 : 0}><Stamp text="NOPE" color={C.red} size={90} r={-8} /></G2>
        </Svg>
        <DreamFrame label="WHAT DAVE THOUGHT" />
      </AbsoluteFill>
    ));
  }
  {
    const rp = w('c6b', 'report');
    const tx = w('c6b', 'taxes');
    const kp = w('c6b', 'keeps');
    q(rp, 'paper', 0.6);
    q(tx, 'cash', 0.5);
    q(kp, 'coin', 0.5);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={480} y={540} s={0.95 * P(A('c6b')) * bump(rp, 0.06)} org="SOCIAL SECURITY" sub="Board of Trustees" title={['2026 Annual', 'Report']} stat="JUNE 2026" />
          <People x={1240} y={855} s={1.5 * P(A('c6b'))} n={10} hot={0} />
          {T(1240, 240, 'people working today', 42, C.ink, P(A('c6b')))}
          <path d="M 1240 560 V 700" stroke={C.green} strokeWidth={12} strokeDasharray="18 12" strokeDashoffset={-f * 2} />
          {T(1240, 760, 'payroll taxes', 46, C.green, P(A('c6b')) * bump(tx, 0.12))}
          {T(1240, 860, 'that money keeps coming in', 42, C.ink, bump(kp, 0.1), lt(kp, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const jr = w('c6c', 'jar');
    const tr = w('c6c', 'trust');
    const em = w('c6c', 'empty');
    const yr = w('c6c', 'thirty');
    q(jr, 'clank', 0.5);
    q(tr, 'pop', 0.5);
    q(em, 'sputter', 0.5);
    q(yr, 'stamp', 0.7);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <TrustJar x={560} y={520} s={1.3 * P(A('c6c')) * bump(jr, 0.06)} empty={f >= em ? lerp(0.25, 1, ease(f, em, em + 40)) : 0.25} label="" />
          {T(560, 180, 'THE TRUST FUND', 50, C.navy, P(A('c6c')) * bump(tr, 0.1))}
          <Calendar x={1260} y={460} s={1.2 * P(A('c6c')) * bump(yr, 0.14)} year={f >= yr ? 2032 : '20??'} flip={0} top="RUNS EMPTY" />
          {T(1260, 780, 'projected: end of 2032', 46, C.red, P(A('c6c')), lt(yr, 0.35))}
          <SourceTag f={f} at={em} text="2026 Social Security Trustees Report: OASI reserves depleted Q4 2032" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sh = w('c6d', 'shrink');
    const sv = w('c6d', 'seventy');
    const tw = w('c6d', 'twenty');
    q(sh, 'rip', 0.6);
    q(sv, 'pop', 0.6);
    q(tw, 'stamp', 0.7);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(760, 170, "the checks don't stop. they shrink.", 50, C.ink, P(A('c6d')) * bump(sh, 0.08))}
          <G2 x={480} y={880}><Bar h={500} w={280} color={C.navy} label="promised" value="100%" /></G2>
          <G2 x={920} y={880}><Bar h={f >= sh ? lerp(500, 390, ease(f, sh, sv)) : 500} w={280} color={C.red} label="payable" value={f >= sv ? '78%' : '?'} /></G2>
          <Box x={1420} y={600} w={440} h={280} s={P(A('c6d')) * bump(tw, 0.14)} fill={f >= tw ? C.yellow : '#fff'}>
            <Text y={-70} size={36} color={GRAY}>a cut of about</Text>
            <Text y={40} size={120} color={C.red}>{f >= tw ? '22%' : '?%'}</Text>
          </Box>
          <SourceTag f={f} at={sv} text="2026 Trustees Report: 78% of scheduled benefits payable after depletion" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c6e', 'thousand');
    const fr = w('c6e', 'four');
    const ev = w('c6e', 'every');
    q(th, 'cash', 0.6);
    q(fr, 'rip', 0.6);
    q(ev, 'stamp', 0.7);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stick f={f} x={320} y={930} s={1.05} acc={['bun', 'glasses']} seed={13} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: fr, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <Paycheck x={860} y={440} s={1.3 * P(A('c6e')) * bump(th, 0.08)} amount="$2,070" cut={f >= fr ? 0.22 : 0} />
          {T(860, 180, 'average retired worker, per month', 42, GRAY, P(A('c6e')))}
          <Box x={1400} y={640} w={500} h={300} s={P(A('c6e')) * bump(fr, 0.14)} fill={f >= fr ? C.yellow : '#fff'}>
            <Text y={-80} size={36} color={GRAY}>a 22% cut =</Text>
            <Text y={30} size={110} color={C.red}>{f >= fr ? '-$455' : '-$ ?'}</Text>
            <Text y={110} size={36} color={C.red}>{f >= ev ? 'EVERY MONTH' : ' '}</Text>
          </Box>
          <SourceTag f={f} at={th} text="SSA 2026 COLA fact sheet: average retired-worker benefit about $2,071/month" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('c6f', 'five');
    const th = w('c6f', 'three');
    const pc = w('c6f', 'picnic');
    q(fv, 'pop', 0.5);
    q(th, 'thud', 0.6);
    q(pc, 'boing', 0.5);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(480, 170, '1960', 60, C.navy, P(A('c6f')))}
          {[0, 1, 2, 3, 4].map((i) => <Stick key={i} f={f} x={240 + i * 120} y={900} s={0.7} seed={30 + i} keys={[{at: 0, pose: 'carry', expr: 'happy', look: 0}]} />)}
          <PicnicBasket x={480} y={520} s={1.3 * P(A('c6f')) * bump(fv, 0.1)} people={5} />
          {T(1400, 170, 'TODAY', 60, C.red, P(A('c6f')))}
          {[0, 1, 2].map((i) => <Stick key={i} f={f} x={1260 + i * 140} y={900} s={0.7} seed={50 + i} keys={[{at: 0, pose: 'carry', expr: 'tired', look: 0}]} sweat />)}
          <G2 x={1400} y={520 + (f >= th ? 30 * Math.abs(Math.sin((f - th) / 6)) * Math.max(0, 1 - (f - th) / 40) : 0)} s={1.3 * P(A('c6f')) * bump(th, 0.12)}><PicnicBasket people={f >= th ? 2.7 : 3} /></G2>
          {T(960, 340, 'same basket. fewer carriers.', 44, C.ink, bump(pc, 0.1), lt(pc, 0.4))}
          <SourceTag f={f} at={fv} text="2026 Trustees Report: 5.1 covered workers per beneficiary in 1960, about 2.7 today" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const r1 = w('c6g', 'raise');
    const tm = w('c6g', 'trim');
    const ag = w('c6g', 'age');
    const mx = w('c6g', 'mix');
    const nm = w('c6g', 'numbers');
    q(r1, 'pop', 0.5);
    q(tm, 'pop2', 0.5);
    q(ag, 'pop', 0.5);
    q(mx, 'pop2', 0.5);
    q(nm, 'ding', 0.6);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'THE FIX? A POLITICAL QUESTION', 50, GRAY, P(A('c6g')))}
          <Sign x={520} y={330} s={0.8 * P(A('c6g')) * bump(r1, 0.14)} text="RAISE TAXES?" color={C.navy} />
          <Sign x={1240} y={330} s={0.8 * P(A('c6g')) * bump(tm, 0.14)} text="TRIM BENEFITS?" color={C.red} />
          <Sign x={520} y={520} s={0.8 * P(A('c6g')) * bump(ag, 0.14)} text="RAISE THE AGE?" color={C.green} />
          <Sign x={1240} y={520} s={0.8 * P(A('c6g')) * bump(mx, 0.14)} text="A MIX?" color={C.ink} />
          <Scale x={880} y={800} s={0.7 * P(A('c6g'))} tilt={Math.sin(f / 20) * 0.3} />
          {T(1380, 800, 'now you know the numbers', 46, C.ink, bump(nm, 0.1), lt(nm, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fn = w('c6h', 'fine');
    const sv = w('c6h', 'seventy');
    const wr = w('c6h', 'wrong');
    q(fn, 'pop', 0.5);
    q(sv, 'stamp', 0.7);
    q(wr, 'cricket', 0.6);
    scene(A('c6h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={920} s={1.2} keys={[{at: 0, pose: 'shrug', expr: 'tired', look: 0.6, talk: true}, {at: sv, pose: 'hips', expr: 'smug', look: 0.6}]} />
          <G2 x={480} y={360} s={P(A('c6h')) * bump(fn, 0.12)}><Bubble text="Fine." size={56} tail="down" /></G2>
          <Box x={1200} y={500} w={720} h={340} s={P(A('c6h')) * bump(sv, 0.12)} fill={f >= sv ? C.yellow : '#fff'}>
            <Text y={-100} size={40} color={GRAY}>THE FINAL PLAN</Text>
            <Text y={20} size={70} color={C.ink}>work until 70</Text>
            <Text y={110} size={36} color={C.red}>{f >= wr ? 'what could go wrong?' : ' '}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: PLAN B BREAKS ============
  {
    const sx = w('c7a', 'sixty');
    const qt = w('c7a', 'quiet');
    q(sx, 'pop', 0.5);
    q(qt, 'cricket', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={620} y={900} s={1.2} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6, talk: true}, {at: qt, pose: 'idle', expr: 'worried', look: 0.6}]} />
          <Bob f={f} x={1300} y={900} s={1.2} flip keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: qt, pose: 'pockets', expr: 'sad', look: -0.2}]} />
          <G2 x={620} y={330} s={P(A('c7a'))}><Bubble text="I'll work until 70!" size={42} tail="down" /></G2>
          <AgeBadge x={1300} y={380} s={1.2 * P(A('c7a')) * bump(sx, 0.14)} age="60" />
          <G2 x={1300} y={560} s={bump(qt, 0.12)} o={lt(qt, 0.3)}><Text size={60} color={GRAY}>. . .</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sy = w('c7b', 'survey');
    const fv = w('c7b', 'five');
    const tw = w('c7b', 'two');
    q(sy, 'paper', 0.6);
    q(fv, 'pop', 0.6);
    q(tw, 'stamp', 0.7);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={400} y={560} s={0.85 * P(A('c7b')) * bump(sy, 0.06)} org="EBRI" sub="& Greenwald Research" title={['Retirement', 'Confidence Survey']} stat="2026" />
          <Box x={1000} y={480} w={420} h={380} s={P(A('c7b')) * bump(fv, 0.1)}>
            <Text y={-120} size={34} color={GRAY}>workers EXPECT</Text>
            <Text y={-70} size={34} color={GRAY}>to retire at</Text>
            <Text y={70} size={150} color={C.navy}>{f >= fv ? '65' : '?'}</Text>
          </Box>
          <Box x={1480} y={480} w={420} h={380} s={P(A('c7b')) * bump(tw, 0.14)} fill={f >= tw ? C.yellow : '#fff'}>
            <Text y={-120} size={34} color={GRAY}>retirees ACTUALLY</Text>
            <Text y={-70} size={34} color={GRAY}>stopped at</Text>
            <Text y={70} size={150} color={C.red}>{f >= tw ? '62' : '?'}</Text>
          </Box>
          <SourceTag f={f} at={fv} text="EBRI/Greenwald 2026 Retirement Confidence Survey: median expected 65, actual 62" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('c7c', 'four');
    const on = w('c7c', 'only');
    const dd = w('c7c', 'did');
    q(fr, 'pop', 0.6);
    q(on, 'pop2', 0.5);
    q(dd, 'stamp', 0.7);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(500, 170, 'PLAN to work until 70+', 44, C.navy, P(A('c7c')))}
          <People x={500} y={944} s={1.6 * P(A('c7c')) * bump(fr, 0.06)} n={10} hot={f >= fr ? 4 : 0} />
          {T(500, 800, '4 in 10', 90, C.navy, P(A('c7c')) * bump(fr, 0.12), lt(fr, 0.35))}
          {T(1300, 170, 'ACTUALLY did', 44, C.red, P(A('c7c')))}
          <People x={1300} y={944} s={1.6 * P(A('c7c')) * bump(dd, 0.06)} n={10} hot={f >= on ? 1 : 0} />
          {T(1300, 800, '1 in 10', 90, C.red, P(A('c7c')) * bump(dd, 0.14), lt(on, 0.35))}
          <SourceTag f={f} at={fr} text="EBRI 2026 RCS: 39% of workers expect to retire at 70+ or never; 10% of retirees did" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fs = w('c7d', 'forty');
    const hl = w('c7d', 'health');
    const co = w('c7d', 'company');
    q(fs, 'stamp', 0.7);
    q(hl, 'heart', 0.6);
    q(co, 'thud', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={480} y={460} w={620} h={420} s={P(A('c7d')) * bump(fs, 0.1)} fill={C.yellow}>
            <Text y={-40} size={190} color={C.red}>46%</Text>
            <Text y={100} size={38} color={C.ink}>left work earlier</Text>
            <Text y={150} size={38} color={C.ink}>than planned</Text>
          </Box>
          <Hospital x={1080} y={520} s={0.8 * P(A('c7d')) * bump(hl, 0.12)} name="HEALTH" />
          {T(1080, 800, 'a health problem', 40, C.ink, P(A('c7d')), lt(hl, 0.4))}
          <WholesalerHQ x={1500} y={560} s={0.5 * P(A('c7d')) * bump(co, 0.12)} label="THE COMPANY" />
          {T(1500, 800, 'company changes', 40, C.ink, P(A('c7d')), lt(co, 0.4))}
          <SourceTag f={f} at={fs} text="EBRI 2026 RCS: 46% retired earlier than planned (41% health, 35% company changes)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ou = w('c7e', 'outrun');
    const bd = w('c7e', 'body');
    const bs2 = w('c7e', 'boss');
    const hp = w('c7e', 'hope');
    q(ou, 'step', 0.5);
    q(bd, 'heart', 0.5);
    q(bs2, 'pop', 0.5);
    q(hp, 'stamp', 0.75);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={380} y={920} s={1.1} walk={f < bd} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}, {at: hp, pose: 'facepalm', expr: 'sad', look: 0}]} sweat />
          <Box x={900} y={420} w={360} h={220} s={P(A('c7e')) * bump(bd, 0.14)} fill={f >= bd ? '#FFE3EA' : '#fff'}>
            <Text y={-30} size={36} color={GRAY}>VOTE 1</Text><Text y={40} size={52} color={C.red}>YOUR BODY</Text>
          </Box>
          <Box x={1300} y={420} w={360} h={220} s={P(A('c7e')) * bump(bs2, 0.14)} fill={f >= bs2 ? '#FFE3EA' : '#fff'}>
            <Text y={-30} size={36} color={GRAY}>VOTE 2</Text><Text y={40} size={52} color={C.red}>YOUR BOSS</Text>
          </Box>
          {T(1100, 720, 'working until 70 is not a plan', 46, C.ink, P(A('c7e')))}
          <G2 x={1100} y={860} s={bump(hp, 0.18)} o={lt(hp, 0.3)}><Stamp text="IT'S A HOPE" color={C.red} size={72} r={-4} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const df = w('c7f', 'defeated');
    const rc = w('c7f', 'raccoon');
    const fe = w('c7f', 'fee');
    q(df, 'trombone', 0.5);
    q(rc, 'sting', 0.6);
    q(fe, 'coin', 0.6);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={520} y={940} s={1.2} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0}, {at: rc, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={1140} y={500} s={bump(rc, 0.12)} o={lt(rc, 0.35)}>
            <ellipse rx={320} ry={240} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <circle cx={-300} cy={250} r={26} fill="#fff" stroke={C.ink} strokeWidth={5} /><circle cx={-380} cy={320} r={14} fill="#fff" stroke={C.ink} strokeWidth={5} />
          </G2>
          <Raccoon f={f} x={1080} y={500} s={0.9 * P(A('c7f')) * bump(rc, 0.14)} mood="sneaky" holdCoin />
          {T(1280, 620, 'tiny fee', 40, C.red, bump(fe, 0.16), lt(fe, 0.35))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: DAVE FIGHTS BACK ============
  {
    const ed = w('c8a', 'education');
    const th = w('c8a', 'three');
    const on = w('c8a', 'one');
    const bo = w('c8a', 'boss');
    q(ed, 'ding', 0.5);
    q(th, 'pop', 0.5);
    q(on, 'chime', 0.5);
    q(bo, 'pop2', 0.5);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={140} s={P(A('c8a')) * bump(ed, 0.08)}><Stamp text="EDUCATION, NOT ADVICE" color={C.navy} size={44} r={0} /></G2>
          <Row x={420} y={340} s={0.85 * P(A('c8a'))} n={1} text="ask about the match" lit={f >= on ? 1 : 0.4} />
          <Row x={420} y={470} s={0.85 * P(A('c8a'))} n={2} text="? ? ?" lit={0.4} />
          <Row x={420} y={600} s={0.85 * P(A('c8a'))} n={3} text="? ? ?" lit={0.4} />
          <Dave f={f} x={520} y={960} s={0.95} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: 0.6}, {at: bo, pose: 'talk', expr: 'happy', look: 0.6, talk: true}]} />
          <Boss f={f} x={1380} y={960} s={0.95} flip keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mt = w('c8b', 'match');
    const tw = w('c8b', 'two');
    const tb = w('c8b', 'table');
    const bm = w('c8b', 'bumps');
    q(mt, 'cash', 0.6);
    q(tw, 'pop', 0.5);
    q(tb, 'coin', 0.6);
    q(bm, 'chime', 0.7);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(760, 160, 'THE COMPANY MATCH', 52, C.green, P(A('c8b')) * bump(mt, 0.1))}
          <G2 x={420} y={880}><Bar h={f >= bm ? lerp(200, 400, ease(f, bm, bm + 16)) : 200} w={260} color={C.navy} label="Dave puts in" value={f >= bm ? '4%' : '2%'} /></G2>
          <G2 x={820} y={880}><Bar h={f >= bm ? lerp(200, 400, ease(f, bm, bm + 16)) : 200} w={260} color={C.green} label="company adds" value={f >= bm ? '4%' : '2%'} /></G2>
          <G2 x={820} y={380} s={P(A('c8b'))} o={f >= bm ? 0 : lt(tb, 0.4)}>
            <rect x={-130} y={-100} width={260} height={200} rx={12} fill="none" stroke={C.green} strokeWidth={6} strokeDasharray="16 12" />
            <Text y={-10} size={34} color={C.green}>free money</Text><Text y={40} size={34} color={C.green}>left on the table</Text>
          </G2>
          <Dave f={f} x={1420} y={940} s={1.1} flip keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: tb, pose: 'shock', expr: 'shock', look: -0.6}, {at: bm, pose: 'celebrate', expr: 'grin', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dl = w('c8c', 'dial');
    const s1 = w('c8c', 'seventy');
    const s2 = w('c8c', 'hundred');
    const s3 = w('c8c', 'twenty');
    q(dl, 'click', 0.6);
    q(s1, 'pop', 0.6);
    q(s2, 'pop2', 0.6);
    q(s3, 'chime', 0.7);
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(700, 150, 'MOVE 2: THE SOCIAL SECURITY DIAL', 46, C.navy, P(A('c8c')) * bump(dl, 0.06))}
          <SSdial x={420} y={580} s={1.3 * P(A('c8c')) * bump(dl, 0.06)} />
          <G2 x={900} y={880}><Bar h={280} w={200} color={C.red} label="at 62" value={f >= s1 ? '70%' : '?'} /></G2>
          <G2 x={1180} y={880}><Bar h={400} w={200} color={C.navy} label="at 67" value={f >= s2 ? '100%' : '?'} /></G2>
          <G2 x={1460} y={880}><Bar h={496} w={200} color={C.green} label="at 70" value={f >= s3 ? '124%' : '?'} /></G2>
          <SourceTag f={f} at={s1} text="SSA benefit claiming-age adjustment factors (full retirement age 67)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sp = w('c8d', 'stops');
    const fe = w('c8d', 'free');
    const st = w('c8d', 'statement');
    q(sp, 'stamp', 0.6);
    q(fe, 'ding', 0.6);
    q(st, 'click', 0.5);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <AgeBadge x={520} y={380} s={1.8 * P(A('c8d')) * bump(sp, 0.12)} age="70" />
          {T(520, 620, 'the check stops growing here', 44, C.ink, P(A('c8d')), lt(sp, 0.4))}
          <Laptop x={1240} y={500} s={1.1 * P(A('c8d')) * bump(st, 0.08)} />
          {T(1240, 760, 'your own numbers: free', 44, C.green, bump(fe, 0.12), lt(fe, 0.4))}
          {T(1240, 840, 'on your Social Security statement', 36, GRAY, P(A('c8d')), lt(st, 0.4))}
          <Dave f={f} x={820} y={960} s={0.95} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c8e', 'three');
    const br = w('c8e', 'boring');
    q(th, 'pop', 0.6);
    q(br, 'sting', 0.7);
    scene(A('c8e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Row x={420} y={300} s={0.85 * P(A('c8e'))} n={1} text="grab the full match" lit={1} />
          <Row x={420} y={430} s={0.85 * P(A('c8e'))} n={2} text="know the 62 / 67 / 70 dial" lit={1} />
          <Row x={420} y={560} s={0.85 * P(A('c8e')) * bump(th, 0.06)} n={3} text={f >= br ? 'THE BORING LINE' : '? ? ?'} lit={f >= br ? 1 : 0.5} color={C.red} />
          <Magnifier x={1420} y={600} s={1.3 * P(A('c8e')) * bump(br, 0.14)} />
          <Dave f={f} x={1420} y={960} s={0.9} flip keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9: THE BORING LINE ============
  {
    const sc = w('c9a', 'scrolls');
    const tn = w('c9a', 'tiny');
    const ex = w('c9a', 'expense');
    q(sc, 'flip', 0.5);
    q(tn, 'pop', 0.5);
    q(ex, 'sting', 0.7);
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Cam f={f} keys={[[tn, 1, 960, 540], [ex + 10, 1.25, 760, 640]]}>
          <Svg>
            <ExpenseRatioLine x={760} y={540} s={1.0 * P(A('c9a'))} ratio="1.5%" hl={f >= ex ? 1 : 0} />
            <Dave f={f} x={1520} y={940} s={1.05} flip keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}, {at: ex, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          </Svg>
        </Cam>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c9b', 'one');
    const ix = w('c9b', 'index');
    const hf = w('c9b', 'half', 1);
    q(on, 'buzz', 0.5);
    q(ix, 'pop', 0.5);
    q(hf, 'chime', 0.6);
    scene(A('c9b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={500} y={500} w={640} h={420} s={P(A('c9b')) * bump(on, 0.1)} fill={f >= on ? '#FFE3EA' : '#fff'}>
            <Text y={-130} size={40} color={GRAY}>DAVE'S FUND</Text>
            <Text y={20} size={170} color={C.red}>1.5%</Text>
            <Text y={140} size={36} color={C.ink}>a year</Text>
          </Box>
          <Box x={1220} y={500} w={640} h={420} s={P(A('c9b')) * bump(hf, 0.12)} fill={f >= hf ? '#E3F6EA' : '#fff'}>
            <Text y={-130} size={40} color={GRAY}>PLAIN INDEX FUND</Text>
            <Text y={20} size={170} color={C.green}>{f >= hf ? '0.5%' : '?%'}</Text>
            <Text y={140} size={36} color={C.ink}>same plan</Text>
          </Box>
          <Raccoon f={f} x={500} y={880} s={0.7 * P(A('c9b'))} mood="greedy" holdCoin />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lb = w('c9c', 'labor');
    const tw = w('c9c', 'twenty');
    const th = w('c9c', 'thirty');
    const sv = w('c9c', 'seven');
    q(lb, 'paper', 0.6);
    q(tw, 'pop', 0.5);
    q(th, 'pop2', 0.5);
    q(sv, 'pop', 0.5);
    scene(A('c9c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={440} y={560} s={0.95 * P(A('c9c')) * bump(lb, 0.06)} org="U.S. DEPT. OF LABOR" sub="EBSA" title={['A Look at', '401(k) Plan Fees']} stat="THE MATH" />
          <Row x={1160} y={380} s={0.8 * P(A('c9c'))} n={1} text="$25,000 balance" lit={f >= tw ? 1 : 0.4} w={760} />
          <Row x={1160} y={520} s={0.8 * P(A('c9c'))} n={2} text="35 years" lit={f >= th ? 1 : 0.4} w={760} />
          <Row x={1160} y={660} s={0.8 * P(A('c9c'))} n={3} text="7% returns" lit={f >= sv ? 1 : 0.4} w={760} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const a1 = w('c9d', 'sixty');
    const a2 = w('c9d', 'two');
    q(a1, 'cash', 0.6);
    q(a2, 'chime', 0.7);
    scene(A('c9d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(760, 160, 'after 35 years', 48, GRAY, P(A('c9d')))}
          <G2 x={480} y={900}><Bar h={f >= a1 ? lerp(60, 400, ease(f, a1, a1 + 20)) : 60} w={300} color={C.red} label="1.5% fees" value={f >= a1 ? '$163,000' : '?'} /></G2>
          <G2 x={980} y={900}><Bar h={f >= a2 ? lerp(60, 557, ease(f, a2, a2 + 20)) : 60} w={300} color={C.green} label="0.5% fees" value={f >= a2 ? '$227,000' : '?'} /></G2>
          <Dave f={f} x={1480} y={940} s={1.05} flip keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: a2, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <SourceTag f={f} at={a1} text="U.S. Department of Labor, EBSA: A Look at 401(k) Plan Fees" />
          <Raccoon f={f} x={1220} y={420} s={0.9 * P(A('c9d'))} mood="greedy" holdCoin grab={f >= a1 ? 1 : 0} />
          {T(1380, 250, 'the gap: $64,000', 46, C.red, bump(a2, 0.14), f >= a2 ? 1 : 0.0001)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  const WIN = w('c9e', 'sixty') + 18;
  {
    const sm = w('c9e', 'same');
    const br = w('c9e', 'boring');
    const et = w('c9e', 'eating');
    q(sm, 'pop', 0.5);
    q(WIN, 'stamp', 0.85);
    q(WIN + 4, 'chime', 0.7);
    q(br, 'ding', 0.5);
    q(et, 'poof', 0.6);
    scene(A('c9e'), () => {
      const sk = shake(f, WIN, 16, 12);
      const n = Math.round(lerp(0, 64000, ease(f, WIN - 18, WIN)));
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[WIN, 1, 960, 540], [WIN + 10, 1.1, 960, 500]]}>
            <Svg>
              {T(860, 160, 'same Dave. same savings.', 50, C.ink, P(A('c9e')) * bump(sm, 0.08))}
              <Box x={960 + sk.x} y={470 + sk.y} w={960} h={340} s={P(A('c9e'))} fill={f >= WIN ? '#E3F6EA' : C.yellow}>
                <Text y={-100} size={40} color={GRAY}>from one boring line</Text>
                <Text y={50} size={170} color={C.green}>{f >= WIN - 18 ? '+' + money(n) : '+$ ? ? ?'}</Text>
              </Box>
              <Dave f={f} x={400} y={960} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: WIN, pose: 'celebrate', expr: 'grin', look: 0}]} />
              <Raccoon f={f} x={1500} y={860} s={0.8 * (f >= et ? Math.max(0, 1 - ease(f, et, et + 14)) : 1) * P(A('c9e'))} mood="sneaky" holdCoin />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const jp = w('c9f', 'jump');
    const fs = w('c9f', 'first');
    const mv = w('c9f', 'moving');
    q(jp, 'pop', 0.5);
    q(fs, 'ding', 0.6);
    q(mv, 'whoosh', 0.6);
    scene(A('c9f'), () => {
      const m = ease(f, mv, mv + 30);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <path d="M 120 900 H 1800" stroke={C.ink} strokeWidth={8} />
            <G2 x={1500 - m * 280} y={600} s={1.4}><FinishLine label={m > 0.5 ? 'CLOSER' : '70'} /></G2>
            <Dave f={f} x={1500 - m * 280 - 170} y={890} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: mv, pose: 'point_r', expr: 'grin', look: 0.6}]} />
            {T(760, 240, 'not back to 62', 50, GRAY, P(A('c9f')) * bump(jp, 0.08))}
            {T(760, 360, 'but Dave is the one moving it', 54, C.green, bump(fs, 0.12), lt(fs, 0.35))}
            <MoneyStack x={420} y={760} s={1.2 * P(A('c9f'))} n={6} label="+$64,000" />
            <Lunchbox x={420} y={500} s={1.1 * P(A('c9f'))} label="" open={1} />
          </Svg>
        </AbsoluteFill>
      );
    });
  }

  // ============ OUTRO ============
  {
    const a = A('r1');
    const b = A('r2');
    const c = A('r3');
    q(a + 4, 'pop', 0.6);
    q(b + 4, 'pop', 0.6);
    q(c + 4, 'pop', 0.6);
    scene(a, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'WHAT DAVE LEARNED', 56, C.navy, pop(f, a))}
          <Row x={300} y={340} s={0.9 * pop(f, a)} n={1} text="the finish line and the risk moved to you" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9 * pop(f, a)} n={2} text="working until 70 is a hope, not a plan" lit={f >= b ? 1 : 0.35} w={1200} />
          <Row x={300} y={660} s={0.9 * pop(f, a)} n={3} text="grab the match, check the boring line" lit={f >= c ? 1 : 0.35} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('r4', 'thousand');
    const fe = w('r4', 'free');
    const bn = w('r4', 'bans');
    const wt = w('r4', 'wait');
    q(th, 'cash', 0.6);
    q(fe, 'chime', 0.5);
    q(bn, 'buzz', 0.7);
    q(wt, 'sting', 0.6);
    scene(A('r4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 150, 'NEXT TIME', 60, C.red, P(A('r4')))}
          <Phone x={960} y={560} s={1.5 * P(A('r4')) * bump(th, 0.08)} title="BETTING APP" value={f >= bn ? 'BANNED' : '$1,000 FREE'} color={f >= bn ? C.red : C.green} />
          <Dave f={f} x={420} y={940} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'money', look: 0.6}, {at: bn, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <G2 x={1420} y={560} s={bump(wt, 0.16)} o={lt(wt, 0.3)}><Bubble text="wait, what?" size={50} tail="left" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('r5', 'subscribe');
    const fe = w('r5', 'free');
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.7);
    q(fe, 'chime', 0.5);
    scene(A('r5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={960} y={420} s={1.4 * pop(f, A('r5'))} done={f > sb + 14 ? 1 : 0} />
          <Bell x={1420} y={420} s={1.1 * pop(f, A('r5') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={420} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
          <Raccoon f={f} x={1500} y={820} s={0.8 * pop(f, A('r5'))} mood="wink" />
          {T(1060, 720, 'retire before Dave does', 46, C.green, pop(f, A('r5')), lt(fe, 0.5))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ DAMAGE METER (HUD) ============
  const D_ON = w('o4', 'seventy');
  const D1 = w('c2e', 'gone');
  const D2 = w('c4f', 'who');
  q(D1 + 4, 'cash', 0.5);
  q(D2 + 4, 'cash', 0.5);
  const dmg = f < D1 ? '+0 YRS' : f < D2 ? '+2 YRS' : '+5 YRS';
  const inChapterCard = (t.chapters ?? []).some((c) => f >= Math.round(c.start * 30) - 4 && f < Math.round(c.start * 30) + CHAPTER_FRAMES + 4);
  const SUB = we('c5f', 'him') + 16;
  const inSub = f >= SUB - 4 && f <= SUB + SUB_FRAMES + 4;
  const showMeter = f >= D_ON && !inChapterCard && !inSub && f < A('r1');
  subCues(SUB).forEach((c) => cues.push(c));
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {showMeter && (
        <Svg>
          <DamageMeter x={1700} y={150} s={0.8 * pop(f, D_ON) * bump(D1, 0.15) * bump(D2, 0.15) * bump(WIN, 0.2)} value={dmg} saved={f >= WIN ? '$64,000' : undefined} flash={(f >= D1 && f < D1 + 20) || (f >= D2 && f < D2 + 20) ? 1 : 0} />
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
