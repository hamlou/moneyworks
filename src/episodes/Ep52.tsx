import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Car, Desk, MoneyStack, Pencil, SourceTag, Stamp, Text, XMark} from '../props';
import {Mailbox, Row, Sign, SubButton, Bell, Phone} from '../props2';
import {Door, Laptop} from '../props26';
import {SourceCard, Raccoon} from '../props3';
import {House, Pizza} from '../props4';
import {Contract} from '../props5';
import {WebinarLaptop, Mansion, Notebook, CourseTier, GoldBottle, MiningTools, GeneralStore, GameSword, GameArmor, GameHorse, SampleStand, PayButton, ScreenshotFolder, FTCBadge} from '../props52';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Guru: React.FC<SP> = (p) => <Stick acc={['tie', 'shades']} seed={45} {...p} />;
const Coach: React.FC<SP> = (p) => <Stick acc={['cap', 'tie']} seed={52} {...p} />;
const Kevin: React.FC<SP> = (p) => <Stick acc={['cap']} seed={29} {...p} />;
const Sam: React.FC<SP> = (p) => <Stick acc={['cap']} seed={18} {...p} />;

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

const DamageMeter: React.FC<{x: number; y: number; s?: number; value: string; saved?: number; hot?: number}> = ({x, y, s = 1, value, saved = 0, hot = 0}) => (
  <G2 x={x} y={y} s={s}>
    <rect x={-190 + 6} y={-62 + 8} width={380} height={124} rx={22} fill="rgba(35,35,43,0.18)" />
    <rect x={-190} y={-62} width={380} height={124} rx={22} fill={saved ? C.green : hot ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={5} />
    <Text y={-30} size={24} ls={3} color={saved ? '#fff' : C.red}>{saved ? 'DAVE SAVED' : "DAVE'S DAMAGE"}</Text>
    <Text y={22} size={54} color={saved ? '#fff' : C.ink}>{value}</Text>
  </G2>
);

const GuessCard: React.FC<{f: number; x: number; y: number; s?: number; q: string[]; answer?: string; opened?: number}> = ({f, x, y, s = 1, q, answer, opened = 0}) => {
  const a = (f * 6) % 360;
  return (
    <G2 x={x} y={y} s={s}>
      <rect x={-420 + 12} y={-260 + 14} width={840} height={520} rx={30} fill="rgba(35,35,43,0.16)" />
      <rect x={-420} y={-260} width={840} height={520} rx={30} fill={opened && answer ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
      <Text y={-200} size={40} ls={6} color={C.red}>QUICK GUESS</Text>
      {q.map((l, i) => <Text key={i} y={-130 + i * 54} size={38}>{l}</Text>)}
      {opened ? (
        <Text x={0} y={20} size={answer ? 100 : 150} color={answer ? C.red : C.ink}>{answer ?? '?'}</Text>
      ) : (
        <>
          <Text x={-120} y={120} size={150} color={C.ink}>?</Text>
          <g transform="translate(220,120)">
            <circle r={80} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <line x1={0} y1={0} x2={Math.sin((a * Math.PI) / 180) * 60} y2={-Math.cos((a * Math.PI) / 180) * 60} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
            <circle r={10} fill={C.ink} />
          </g>
        </>
      )}
    </G2>
  );
};

const Shadow: React.FC<{f?: number; x: number; y: number; s?: number}> = ({f = 0, x, y, s = 1}) => (
  <G2 x={x} y={y} s={s}>
    <g transform={`translate(0,${Math.sin(f / 12) * 4})`}>
      <rect x={-60} y={-370} width={120} height={90} rx={8} fill="#15151B" />
      <rect x={-95} y={-290} width={190} height={22} rx={10} fill="#15151B" />
      <circle cx={0} cy={-210} r={70} fill="#15151B" />
      <path d="M -110 -120 Q 0 -160 110 -120 L 130 120 L -130 120 Z" fill="#15151B" />
      <Text y={-198} size={80} color={C.yellow}>?</Text>
    </g>
  </G2>
);

const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const Ep52: React.FC = () => {
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

  let dmgValue = '$0';
  if (f >= w('c1c', 'dollars')) dmgValue = '$1,997';
  if (f >= w('c2f', 'dollars')) dmgValue = '$9,997';

  // ============ HOOK ============
  const am = w('o1', 'a');
  const o1Scene = (ff: number) => {
  const pay = w('o1', 'pay');

    return (
      <AbsoluteFill>
        <Interior />
        <Cam f={ff} keys={[[0, 1.15, 960, 540], [40, 1.0, 960, 540]]}>
          <Svg>
            <Laptop x={960} y={540} s={1.5} />
            <Dave f={ff} x={620} y={920} s={1.0} keys={[{at: 0, pose: 'shock', expr: 'worried', look: 0.6}]} sweat />
            <PayButton x={960} y={340} s={1.0 * bump(pay, 0.08)} amount="$9,997" hover={ff >= pay ? 1 : 0} />
            <Guru f={ff} x={1300} y={920} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
            <G2 x={400} y={200} s={bump(am, 0.12)}><Text size={46} color={GRAY}>2 AM</Text></G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  {
    q(2, 'tick', 0.4);
    q(am, 'ding', 0.5);
    q(w('o1', 'pay'), 'pop', 0.6);
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
          <G2 x={620} y={240} s={P(FR) * bump(w('o2', 'dave'), 0.12)}>
            <Stamp text="THAT'S DAVE" color={C.red} size={70} r={-4} />
            <path d="M 0 80 L 0 230 M -30 200 L 0 236 L 30 200" fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </G2>
        </Svg>
      </AbsoluteFill>
    ), false);
    scene(RW, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.5)'}}>{o1Scene(Math.max(0, FR - (f - RW) * 4))}</AbsoluteFill>
        <Svg>
          <G2 x={960} y={520} s={P(RW) * 1.2}><Stamp text="3 WEEKS EARLIER" color={C.navy} size={80} r={-3} /></G2>
          <G2 x={960} y={700} o={0.8}><Text size={90} color="#fff" stroke={C.ink} sw={10}>{'<< <<'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
  }
  {
    const mg = w('o3', 'mansion');
    const md = w('o3', 'made');
    q(A('o3') + 4, 'pop', 0.5);
    q(mg, 'boing', 0.5);
    q(md, 'cash', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Mansion x={560} y={560} s={0.85 * P(A('o3')) * bump(mg, 0.06)} label={f >= mg ? 'VACATION RENTAL' : undefined} />
          <Guru f={f} x={1380} y={930} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'money', look: -0.6}]} />
          <G2 x={1380} y={340} s={P(A('o3'))}><Bubble text={f >= md ? 'I made a million!' : 'my mansion...'} size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ftc = w('o4', 'f');
    const pr = w('o4', 'program');
    const ov = w('o4', 'over');
    const mk = w('o4', 'million');
    const land = mk + 20;
    q(ftc, 'paper', 0.5);
    q(pr, 'stamp', 0.6);
    q(mk, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    scene(A('o4'), () => {
      const n = Math.round(lerp(0, 125000000, ease(f, mk, land)));
      const sk = shake(f, land, 16, 14);
      const z = 1 + 0.12 * ease(f, land, land + 10);
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, z, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('o4'))}><Text size={50} color={GRAY}>FTC SAYS:</Text></G2>
              <Box x={960 + sk.x} y={500 + sk.y} w={1100} h={360} s={P(A('o4'))} fill={f >= land ? C.yellow : '#fff'}>
                <Text y={-40} size={38} color={GRAY}>one program took</Text>
                <Text y={40} size={140} color={f >= land ? C.red : C.ink}>{money(n)}</Text>
              </Box>
              <SourceTag f={f} at={ftc} text="FTC: MOBE took $125M+ from consumers (June 2018)" />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const wh = w('o5', 'why');
    const ml = w('o5', 'millionaire');
    const sc = w('o5', 'secret');
    q(wh, 'pop', 0.5);
    q(ml, 'ding', 0.5);
    q(sc, 'sting', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={480} s={P(A('o5'))}><Text size={52}>why would a millionaire sell it?</Text></G2>
          <Dave f={f} x={460} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <Guru f={f} x={1460} y={930} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
          <MoneyStack x={1000} y={340} s={1.0 * bump(ml, 0.1)} n={6} label="$1M" />
          <Shadow f={f} x={lerp(2150, 1660, ease(f, A('o5'), A('o5') + 20))} y={880} s={1.2} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st = w('o6', 'stay');
    const on = w('o6', 'one');
    const gu = w('o6', 'guru');
    q(st, 'pop', 0.6);
    q(on, 'ding', 0.5);
    q(gu, 'buzz', 0.5);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: 0.6}]} />
          <G2 x={960} y={400} s={P(A('o6')) * bump(on, 0.12)}><Text size={56} color={C.red}>the ONE question</Text></G2>
          <G2 x={960} y={540} s={bump(gu, 0.15)} o={lt(gu, 0.35)}><Bubble text="*click*" size={60} tail="down" /></G2>
          <Guru f={f} x={1440} y={930} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <G2 x={1440} y={340} s={bump(st, 0.12)} o={lt(st, 0.4)}><Text size={44} color={C.navy}>stay for it</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  const dmgStart = A('o4');

  // ============ CH1: The Free Training Catch ============
  {
    const cl = w('c1a', 'clicked');
    const fr = w('c1a', 'free');
    const sn = w('c1a', 'snack');
    q(cl, 'click', 0.6);
    q(fr, 'pop', 0.5);
    q(sn, 'crinkle', 0.4);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={f >= w('c1c', 'dollars') ? 1 : 0} />
          <WebinarLaptop x={960} y={520} s={1.3 * P(A('c1a')) * bump(fr, 0.08)} />
          <Dave f={f} x={520} y={930} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
          <G2 x={1400} y={600} s={0.9 * bump(sn, 0.1)} o={lt(sn, 0.35)}><Pizza eaten={2} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const m1 = w('c1b', 'one');
    const sh = w('c1b', 'showed');
    const mn = w('c1b', 'mansion');
    const cr = w('c1b', 'car');
    const jt = w('c1b', 'jet');
    q(m1, 'tick', 0.4);
    q(sh, 'pop', 0.5);
    q(mn, 'boing', 0.5);
    q(cr, 'boing', 0.5);
    q(jt, 'boing', 0.5);
    scene(A('c1b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={f >= w('c1c', 'dollars') ? 1 : 0} />
          <G2 x={960} y={140} s={P(A('c1b'))}><Text size={46}>90-MINUTE WEBINAR</Text></G2>
          <Mansion x={360} y={420} s={0.5 * bump(mn, 0.1)} />
          <Text x={360} y={620} size={32} color={GRAY}>min. 10</Text>
          <G2 x={780} y={480} s={2.2 * bump(cr, 0.1)} o={lt(cr, 0.35)}><Car /></G2>
          <Text x={780} y={640} size={32} color={GRAY}>min. 40</Text>
          <GameHorse x={1400} y={520} s={0.8 * bump(jt, 0.1)} o={lt(jt, 0.35)} />
          <Text x={1400} y={660} size={28} color={GRAY}>jet ski... min. 40</Text>
          <Guru f={f} x={1560} y={960} s={0.85} keys={[{at: 0, pose: 'present', expr: 'money', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const m8 = w('c1c', 'eighty');
    const sc = w('c1c', 'secret');
    const of = w('c1c', 'offer');
    const th = w('c1c', 'three');
    const wk = w('c1c', 'workshop');
    const nt = w('c1c', 'ninety');
    const dl = w('c1c', 'dollars');
    const sp = w('c1c', 'spots');
    const tm = w('c1c', 'timer');
    q(m8, 'tick', 0.5);
    q(sc, 'buzz', 0.5);
    q(of, 'pop', 0.6);
    q(th, 'paper', 0.5);
    q(nt, 'cash', 0.7);
    q(sp, 'tick', 0.4);
    q(tm, 'ding', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={f >= dl ? 1 : 0} />
          <WebinarLaptop x={560} y={520} s={1.2 * P(A('c1c'))} timer={f >= tm ? '5:00' : undefined} spots={f >= sp ? 17 : undefined} />
          <Dave f={f} x={240} y={930} s={0.95} keys={[{at: 0, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <Box x={1320} y={480} w={720} h={440} s={P(A('c1c')) * bump(of, 0.08)} fill={f >= dl ? C.yellow : '#fff'}>
            <Text y={-160} size={38} color={GRAY}>3-DAY WORKSHOP</Text>
            <Text y={-80} size={52}>"beginner level"</Text>
            <Text y={20} size={100} color={f >= dl ? C.red : C.ink}>{f >= nt ? '$1,997' : '$?'}</Text>
            <Text y={110} size={36} color={GRAY}>ONLY 20 SPOTS</Text>
            <Text y={160} size={34} color={C.red}>⏱ timer counting down</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('c1d', 'free');
    const sa = w('c1d', 'sample');
    const gu = w('c1d', 'guy');
    const fo = w('c1d', 'follows');
    const ch = w('c1d', 'checkout');
    q(fr, 'pop', 0.5);
    q(sa, 'pop2', 0.5);
    q(gu, 'step', 0.4);
    q(fo, 'boing', 0.5);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <SampleStand x={420} y={520} s={1.4 * P(A('c1d')) * bump(sa, 0.1)} />
          <Dave f={f} x={800 + (f - A('c1d')) * 2} y={930} s={1.0} walk keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}]} />
          <Coach f={f} x={500 + (f - A('c1d')) * 2} y={930} s={0.9} walk keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.6}]} />
          <G2 x={960} y={180} s={P(A('c1d'))}><Text size={48}>the free sample guy...</Text></G2>
          <G2 x={1400} y={420} s={bump(fo, 0.12)} o={lt(fo, 0.35)}><Text size={40} color={C.red}>follows you to checkout</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wt = w('c1e', 'watched');
    const tk = w('c1e', 'tick');
    const ni = w('c1e', 'nineteen');
    const ei = w('c1e', 'eighteen');
    const sv = w('c1e', 'seventeen');
    const bt = w('c1e', 'bought');
    q(wt, 'tick', 0.5);
    q(ni, 'tick', 0.4);
    q(ei, 'tick', 0.4);
    q(sv, 'tick', 0.4);
    q(bt, 'stamp', 0.7);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Laptop x={960} y={560} s={1.4} />
          <Dave f={f} x={560} y={930} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'worried', look: 0.6}]} sweat />
          <G2 x={960} y={240} s={P(A('c1e'))}><Text size={180} color={C.red}>{f >= sv ? '17' : f >= ei ? '18' : f >= ni ? '19' : '20'}</Text></G2>
          <G2 x={960} y={360} s={bump(bt, 0.15)} o={lt(bt, 0.35)}><Stamp text="DAVE BOUGHT ONE" color={C.red} size={48} r={-5} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dy = w('c1f', 'day');
    const ws = w('c1f', 'workshop');
    const hr = w('c1f', 'heard');
    const bg = w('c1f', 'beginner');
    q(dy, 'pop', 0.5);
    q(ws, 'crowd', 0.4);
    q(hr, 'ding', 0.5);
    q(bg, 'stamp', 0.7);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Desk x={960} y={880} w={760} />
          <Notebook x={760} y={560} s={0.85 * P(A('c1f'))} lines={6} />
          <Dave f={f} x={420} y={930} s={1.0} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}]} hold={{item: <Pencil s={0.4} />, side: 'r'}} />
          <Guru f={f} x={1460} y={930} s={1.0} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.6}]} />
          <G2 x={1460} y={340} s={P(A('c1f')) * bump(bg, 0.1)}><Bubble text="this is just beginner level" size={34} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: Just The Beginner Level ============
  {
    const d1 = w('c2a', 'one');
    const fl = w('c2a', 'filled');
    const nb = w('c2a', 'notebook');
    const ex = w('c2a', 'excitement');
    const fw = w('c2a', 'few');
    q(d1, 'paper', 0.5);
    q(fl, 'scribble', 0.5);
    q(ex, 'ding', 0.4);
    q(fw, 'buzz', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Notebook x={640} y={560} s={1.1 * P(A('c2a')) * bump(fl, 0.08)} lines={7} />
          <Dave f={f} x={1360} y={930} s={1.05} keys={[{at: 0, pose: 'hold', expr: f >= fw ? 'worried' : 'happy', look: -0.6}]} hold={{item: <Pencil s={0.35} />, side: 'r'}} />
          <G2 x={1360} y={340} s={bump(ex, 0.1)}><Text size={44} color={f >= fw ? GRAY : C.green}>LOTS of excitement</Text></G2>
          <G2 x={1360} y={420} s={bump(fw, 0.15)} o={lt(fw, 0.35)}><Text size={44} color={C.red}>VERY FEW steps</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const d2 = w('c2b', 'two');
    const ex = w('c2b', 'explained');
    const rl = w('c2b', 'real');
    const gd = w('c2b', 'gold');
    const pt = w('c2b', 'platinum');
    const dm = w('c2b', 'diamond');
    q(d2, 'tick', 0.4);
    q(ex, 'pop', 0.5);
    q(rl, 'ding', 0.5);
    q(gd, 'boing', 0.4);
    q(pt, 'boing', 0.4);
    q(dm, 'boing', 0.4);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Guru f={f} x={320} y={930} s={1.05} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}]} />
          <G2 x={520} y={320} s={P(A('c2b'))}><Bubble text="the REAL system..." size={36} tail="down" /></G2>
          <CourseTier x={800} y={560} s={0.8 * bump(gd, 0.1)} tier="GOLD" />
          <CourseTier x={1200} y={560} s={0.8 * bump(pt, 0.1)} tier="PLATINUM" />
          <CourseTier x={1600} y={560} s={0.8 * bump(dm, 0.1)} tier="DIAMOND" />
          <Dave f={f} x={1360} y={960} s={0.9} keys={[{at: 0, pose: 'shock', expr: 'worried', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gm = w('c2c', 'game');
    const sw = w('c2c', 'sword');
    const ar = w('c2c', 'armor');
    const hr = w('c2c', 'horse');
    const nv = w('c2c', 'never');
    const cs = w('c2c', 'castle');
    q(gm, 'pop', 0.5);
    q(sw, 'boing', 0.5);
    q(ar, 'boing', 0.5);
    q(hr, 'boing', 0.5);
    q(nv, 'buzz', 0.6);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={960} y={120} s={P(A('c2c'))}><Text size={46}>free-to-play game...</Text></G2>
          <GameSword x={360} y={520} s={1.0 * bump(sw, 0.12)} />
          <Text x={360} y={660} size={34} color={GRAY}>sword $</Text>
          <GameArmor x={720} y={520} s={1.0 * bump(ar, 0.12)} />
          <Text x={720} y={660} size={34} color={GRAY}>armor $</Text>
          <GameHorse x={1120} y={520} s={0.85 * bump(hr, 0.12)} />
          <Text x={1120} y={680} size={34} color={GRAY}>horse $</Text>
          <House x={1520} y={520} s={0.5} />
          <Text x={1520} y={680} size={36} color={f >= nv ? C.red : GRAY}>{f >= nv ? 'NEVER REACH' : 'castle'}</Text>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const md = w('c2d', 'made');
    const gu = w('c2d', 'guru');
    const ftc = w('c2d', 'f');
    const re = w('c2d', 'real');
    const zu = w('c2d', 'zurixx');
    const fr = w('c2d', 'free');
    const th = w('c2d', 'three');
    const nt = w('c2d', 'ninety');
    const up = w('c2d', 'upsells');
    q(md, 'stamp', 0.6);
    q(ftc, 'paper', 0.5);
    q(zu, 'pop', 0.5);
    q(fr, 'pop2', 0.4);
    q(th, 'paper', 0.5);
    q(nt, 'cash', 0.6);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={960} y={120} s={P(A('c2d'))}><Text size={48}>FTC vs. ZURIXX</Text></G2>
          <G2 x={480} y={380} s={P(A('c2d'))}><Text size={36} color={GRAY}>FREE EVENT</Text></G2>
          <path d="M 480 420 L 480 500" stroke={C.navy} strokeWidth={8} markerEnd="url(#arrowhead)" />
          <G2 x={480} y={580} s={P(A('c2d')) * bump(th, 0.08)}>
            <rect x={-160} y={-50} width={320} height={100} rx={16} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-10} size={32}>3-DAY WORKSHOP</Text>
            <Text y={30} size={44} color={C.red}>$1,997</Text>
          </G2>
          <path d="M 480 680 L 480 750 L 1360 750" stroke={C.navy} strokeWidth={8} markerEnd="url(#arrowhead)" />
          <G2 x={1460} y={750} s={bump(up, 0.12)} o={lt(up, 0.35)}><Text size={48} color={C.red}>UPSELLS →</Text></G2>
          <Dave f={f} x={1460} y={960} s={0.9} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.6}]} />
          <SourceTag f={f} at={ftc} text="FTC vs. Zurixx (Oct 2019): $1,997 workshop, upsells to $41,297" />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill={C.navy} />
            </marker>
          </defs>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const qu = w('c2e', 'guess');
    const cm = w('c2e', 'comments');
    const an = w('c2e', 'answer');
    const mn = w('c2e', 'minute');
    q(qu, 'pop', 0.6);
    for (let i = 0; i < 6; i++) q(qu + 20 + i * 30, 'tick', 0.35);
    q(cm, 'ding', 0.5);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <GuessCard f={f} x={820} y={500} s={P(A('c2e')) * bump(qu, 0.06)} q={['how high did the', 'Zurixx ladder go?']} />
          <Dave f={f} x={1600} y={930} s={1.0} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
          <G2 x={820} y={880} s={bump(cm, 0.12)} o={lt(cm, 0.4)}><Text size={36} color={C.navy}>write your guess in comments</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bk = w('c2f', 'back');
    const ws = w('c2f', 'workshop');
    const ch = w('c2f', 'coach');
    const pt = w('c2f', 'platinum');
    const ni = w('c2f', 'nine');
    const dl = w('c2f', 'dollars');
    const cr = w('c2f', 'credit');
    const li = w('c2f', 'limit');
    const cl = w('c2f', 'call');
    q(bk, 'whoosh_s', 0.4);
    q(ch, 'pop', 0.5);
    q(pt, 'stamp', 0.6);
    q(ni, 'cash', 0.8);
    q(cr, 'pop2', 0.5);
    q(cl, 'ding', 0.5);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Desk x={960} y={880} w={700} />
          <Coach f={f} x={1400} y={930} s={1.05} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.6}]} />
          <G2 x={1400} y={320} s={P(A('c2f'))}><Bubble text="PLATINUM. $9,997." size={38} tail="down" /></G2>
          <Box x={640} y={480} w={640} h={360} s={P(A('c2f')) * bump(pt, 0.08)} fill={f >= dl ? C.yellow : '#fff'}>
            <Text y={-120} size={40} color={GRAY}>PLATINUM TIER</Text>
            <Text y={-20} size={120} color={f >= dl ? C.red : C.ink}>{f >= ni ? '$9,997' : '$?'}</Text>
            <Text y={90} size={32} color={GRAY}>{f >= cr ? 'credit limit too low?' : '...'}</Text>
            <Text y={140} size={32} color={f >= cl ? C.red : GRAY}>{f >= cl ? '"just call your card"' : '...'}</Text>
          </Box>
          <Dave f={f} x={320} y={960} s={0.9} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hd = w('c2g', 'had');
    const ni = w('c2g', 'night');
    const dd = w('c2g', 'did');
    const sm = w('c2g', 'something');
    const nt = w('c2g', 'never');
    const lk = w('c2g', 'looked');
    q(hd, 'pop', 0.5);
    q(ni, 'tick', 0.4);
    q(dd, 'ding', 0.5);
    q(nt, 'stamp', 0.6);
    q(lk, 'click', 0.5);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Calendar x={520} y={520} s={1.0 * P(A('c2g'))} year="1" flip={0} top="NIGHT" />
          <Dave f={f} x={520} y={960} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <Laptop x={1360} y={560} s={1.2 * bump(lk, 0.08)} />
          <G2 x={1360} y={260} s={bump(nt, 0.12)} o={lt(nt, 0.35)}><Text size={40} color={C.red}>guru never taught this</Text></G2>
          <G2 x={960} y={920} o={lt(dd, 0.4)}><Text size={44} color={C.navy}>Dave looked him up</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  const SUB = A('c4h');
  subCues(SUB).forEach((c) => cues.push(c));

  // ============ CH3: Who Sold The Shovels? ============
  {
    const sr = w('c3a', 'searched');
    const mn = w('c3a', 'mansion');
    const vc = w('c3a', 'vacation');
    const bk = w('c3a', 'book');
    q(sr, 'click', 0.5);
    q(mn, 'pop', 0.5);
    q(vc, 'stamp', 0.7);
    q(bk, 'ding', 0.4);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Laptop x={560} y={560} s={1.3} />
          <Dave f={f} x={240} y={930} s={0.95} keys={[{at: 0, pose: 'typing', expr: 'suspicious', look: 0.6}]} />
          <Mansion x={1360} y={480} s={0.65 * P(A('c3a')) * bump(mn, 0.08)} label={f >= vc ? 'VACATION RENTAL' : undefined} />
          <G2 x={1360} y={720} s={bump(bk, 0.12)} o={lt(bk, 0.35)}><Text size={36} color={C.red}>you can book by night</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sr = w('c3b', 'searched');
    const gr = w('c3b', 'gurus');
    const ml = w('c3b', 'million');
    const fn = w('c3b', 'found');
    const ex = w('c3b', 'exactly');
    const cs = w('c3b', 'course');
    q(sr, 'click', 0.5);
    q(ml, 'cash', 0.6);
    q(fn, 'pop', 0.5);
    q(ex, 'stamp', 0.7);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Laptop x={560} y={560} s={1.3} />
          <Dave f={f} x={240} y={930} s={0.95} keys={[{at: 0, pose: 'typing', expr: 'think', look: 0.6}]} />
          <Box x={1360} y={480} w={640} h={360} s={P(A('c3b')) * bump(fn, 0.08)} fill={f >= ex ? C.yellow : '#fff'}>
            <Text y={-120} size={36} color={GRAY}>guru's businesses:</Text>
            <Text y={-40} size={80} color={f >= ex ? C.red : C.ink}>{f >= ex ? '1' : '?'}</Text>
            <Text y={60} size={44} color={f >= cs ? C.red : C.ink}>{f >= cs ? 'THE COURSE' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rm = w('c3c', 'reminded');
    const st = w('c3c', 'story');
    const ei = w('c3c', 'eighteen');
    q(rm, 'dream', 0.5);
    q(st, 'pop', 0.5);
    q(ei, 'tick', 0.4);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="1848 FLASHBACK" />
        <Svg>
          <Calendar x={960} y={480} s={1.2 * P(A('c3c')) * bump(ei, 0.1)} year="1848" flip={0} top="YEAR" />
          <Dave f={f} x={960} y={960} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sh = w('c3d', 'shopkeeper');
    const sm = w('c3d', 'sam');
    const br = w('c3d', 'brannan');
    const rn = w('c3d', 'ran');
    const wv = w('c3d', 'waving');
    const sh2 = w('c3d', 'shouting');
    const gd = w('c3d', 'gold', 0);
    const gd2 = w('c3d', 'gold', 1);
    q(sh, 'pop', 0.5);
    q(rn, 'step', 0.5);
    q(wv, 'boing', 0.5);
    q(sh2, 'crowd', 0.5);
    q(gd, 'ding', 0.6);
    q(gd2, 'ding', 0.6);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Sam f={f} x={600 + (f - A('c3d')) * 3} y={930} s={1.15} walk keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.6}]} hold={{item: <GoldBottle s={0.5} />, side: 'r'}} />
          <G2 x={960} y={200} s={P(A('c3d'))}><Text size={48}>SAM BRANNAN · 1848</Text></G2>
          <G2 x={600 + (f - A('c3d')) * 3} y={340} s={bump(gd, 0.15)}><Bubble text="GOLD! GOLD!" size={50} tail="down" /></G2>
          <GeneralStore x={1440} y={640} s={1.0 * P(A('c3d'))} />
          <Stick f={f} x={300} y={940} s={0.9} seed={71} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <Stick f={f} x={1100} y={950} s={0.85} acc={['fedora']} seed={72} flip keys={[{at: 0, pose: 'point_l', expr: 'shock', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c3e', 'thousands');
    const rs = w('c3e', 'rushed');
    const dg = w('c3e', 'dig');
    const br = w('c3e', 'brannan');
    const hd = w('c3e', 'had');
    const st = w('c3e', 'stocked');
    const pc = w('c3e', 'picks');
    const st2 = w('c3e', 'store');
    const sl = w('c3e', 'sold');
    const th2 = w('c3e', 'thirty');
    const sx = w('c3e', 'six');
    const mn = w('c3e', 'months');
    q(th, 'crowd', 0.5);
    q(rs, 'step', 0.5);
    q(br, 'pop', 0.5);
    q(st, 'pop2', 0.5);
    q(st2, 'boing', 0.5);
    q(th2, 'cash', 0.7);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GeneralStore x={480} y={560} s={0.7 * P(A('c3e')) * bump(st2, 0.06)} />
          <MiningTools x={1200} y={520} s={1.1 * bump(pc, 0.1)} />
          <Box x={1200} y={800} w={560} h={180} s={P(A('c3e')) * bump(th2, 0.08)} fill={f >= th2 ? C.yellow : '#fff'}>
            <Text y={-40} size={40} color={GRAY}>sales in ~2 months:</Text>
            <Text y={30} size={70} color={f >= th2 ? C.red : C.ink}>{f >= sx ? '$36,000' : '$?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ms = w('c3f', 'most');
    const mn = w('c3f', 'miners');
    const bl = w('c3f', 'blisters');
    const br = w('c3f', 'brannan');
    const bc = w('c3f', 'became');
    const ml = w('c3f', 'millionaire');
    const nv = w('c3f', 'never');
    const dg = w('c3f', 'dug');
    q(ms, 'pop', 0.5);
    q(bl, 'thud', 0.6);
    q(br, 'ding', 0.5);
    q(bc, 'cash', 0.7);
    q(nv, 'stamp', 0.8);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={480} y={440} w={540} h={280} s={P(A('c3f'))} fill="#EEE">
            <Text y={-80} size={40} color={GRAY}>MINERS</Text>
            <Text y={0} size={70} color={f >= bl ? C.red : C.ink}>BLISTERS</Text>
            <Text y={80} size={36} color={GRAY}>hard work</Text>
          </Box>
          <Box x={1240} y={440} w={660} h={360} s={P(A('c3f')) * bump(bc, 0.08)} fill={f >= ml ? C.yellow : '#fff'}>
            <Text y={-120} size={40} color={GRAY}>SAM BRANNAN</Text>
            <Text y={-20} size={60} color={f >= ml ? C.red : C.ink}>MILLIONAIRE</Text>
            <Text y={60} size={44}>(California's FIRST)</Text>
            <Text y={130} size={40} color={f >= nv ? C.red : GRAY}>{f >= nv ? 'NEVER dug gold' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const oh = w('c3g', 'oh');
    const an = w('c3g', 'answer');
    const zu = w('c3g', 'zurixx');
    const up = w('c3g', 'upsells');
    const fr = w('c3g', 'forty');
    const on = w('c3g', 'one');
    const dl = w('c3g', 'dollars');
    const fc = w('c3g', 'coaching');
    const land = on + 20;
    q(oh, 'pop', 0.5);
    q(zu, 'pop2', 0.5);
    q(fr, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    scene(A('c3g'), () => {
      const n = Math.round(lerp(0, 41297, ease(f, fr, land)));
      const sk = shake(f, land, 14, 12);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={P(A('c3g'))}><Text size={48} color={C.navy}>ANSWER TO THE GUESS</Text></G2>
            <GuessCard f={f} x={960} y={520} s={0.95 * bump(an, 0.06)} q={['Zurixx upsells went', 'as high as...']} answer={f >= land ? money(n) : undefined} opened={f >= an ? 1 : 0} />
            <G2 x={960 + sk.x} y={840 + sk.y} s={bump(land, 0.15)} o={lt(land, 0.35)}><Stamp text="FOR COACHING" color={C.red} size={56} r={-5} /></G2>
          </Svg>
          </AbsoluteFill>
        );
      });
  }
  {
    const dv = w('c3h', 'dave');
    const as = w('c3h', 'asked');
    const sc = w('c3h', 'scary');
    const wh = w('c3h', 'what');
    const cs = w('c3h', 'course');
    const is = w('c3h', 'isnt');
    const gd = w('c3h', 'gold');
    q(dv, 'pop', 0.5);
    q(sc, 'sting', 0.6);
    q(wh, 'pop2', 0.5);
    q(is, 'stamp', 0.7);
    q(gd, 'stamp', 0.8);
    scene(A('c3h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={760} y={320} s={P(A('c3h')) * bump(sc, 0.1)}><Bubble text="the scary question..." size={38} tail="down" /></G2>
          <Box x={1320} y={520} w={760} h={400} s={P(A('c3h')) * bump(wh, 0.08)} fill={f >= gd ? C.yellow : '#fff'}>
            <Text y={-140} size={40} color={C.red}>what if...</Text>
            <Text y={-60} size={46}>the course ISN'T</Text>
            <Text y={10} size={46}>how he got rich?</Text>
            <Text y={100} size={60} color={f >= gd ? C.red : C.ink}>{f >= gd ? 'THE COURSE' : '...'}</Text>
            <Text y={160} size={56} color={f >= gd ? C.red : C.ink}>{f >= gd ? 'IS THE GOLD' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: The Course Is The Gold (VILLAIN REVEAL) ============
  {
    const dv = w('c4a', 'dave');
    const wt = w('c4a', 'went');
    const bg = w('c4a', 'biggest');
    const rm = w('c4a', 'remember');
    const on = w('c4a', 'hundred');
    const ml = w('c4a', 'million');
    const pr = w('c4a', 'program');
    const cd = w('c4a', 'called');
    const mb = w('c4a', 'mobe');
    q(dv, 'pop', 0.5);
    q(bg, 'pop2', 0.5);
    q(rm, 'ding', 0.5);
    q(ml, 'cash', 0.7);
    q(mb, 'stamp', 0.8);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'suspicious', look: 0.6}]} />
          <Laptop x={480} y={500} s={1.0} />
          <Box x={1280} y={480} w={760} h={400} s={P(A('c4a')) * bump(mb, 0.08)} fill={f >= mb ? C.yellow : '#fff'}>
            <Text y={-140} size={44} color={GRAY}>FTC CASE:</Text>
            <Text y={-60} size={90} color={f >= mb ? C.red : C.ink}>{f >= mb ? 'MOBE' : '?'}</Text>
            <Text y={50} size={38}>"My Online Business</Text>
            <Text y={100} size={38}>Education"</Text>
            <Text y={160} size={46} color={C.red}>{f >= ml ? '$125M+' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st = w('c4b', 'started');
    const fr = w('c4b', 'forty');
    const sy = w('c4b', 'system');
    const th = w('c4b', 'then');
    const gd = w('c4b', 'gold');
    const dm = w('c4b', 'diamond');
    q(st, 'pop', 0.5);
    q(fr, 'cash', 0.6);
    q(th, 'pop2', 0.5);
    q(gd, 'boing', 0.4);
    q(dm, 'boing', 0.4);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c4b'))}><Text size={48}>MOBE LADDER</Text></G2>
          <Box x={360} y={420} w={420} h={240} s={P(A('c4b'))} fill="#fff">
            <Text y={-70} size={36} color={GRAY}>START</Text>
            <Text y={-10} size={52}>21-STEP SYSTEM</Text>
            <Text y={60} size={60} color={C.blue}>{f >= fr ? '$49' : '$?'}</Text>
          </Box>
          <path d="M 360 540 L 360 640 L 1200 640" stroke={C.navy} strokeWidth={8} markerEnd="url(#arrowhead)" />
          <CourseTier x={900} y={760} s={0.75 * bump(gd, 0.1)} tier="GOLD" price={f >= gd ? '$4,997' : undefined} />
          <CourseTier x={1400} y={760} s={0.75 * bump(dm, 0.1)} tier="DIAMOND" price={f >= dm ? '$29,997' : undefined} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = w('c4c', 'proven');
    const sy = w('c4c', 'system');
    const mk = w('c4c', 'making');
    const ac = w('c4c', 'according');
    const sl = w('c4c', 'selling');
    q(pv, 'pop', 0.5);
    q(sy, 'ding', 0.5);
    q(ac, 'paper', 0.5);
    q(sl, 'stamp', 0.8);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c4c'))}><Text size={48}>"the proven system"</Text></G2>
          <Box x={960} y={560} w={1080} h={380} s={P(A('c4c')) * bump(sl, 0.08)} fill={f >= sl ? C.yellow : '#fff'}>
            <Text y={-120} size={40} color={GRAY}>FTC SAYS:</Text>
            <Text y={-40} size={52}>"the primary thing</Text>
            <Text y={20} size={52}>MOBE sells is</Text>
            <Text y={100} size={70} color={f >= sl ? C.red : C.ink}>{f >= sl ? 'MORE MOBE' : '...'}</Text>
            <Text y={160} size={52}>memberships"</Text>
          </Box>
          <SourceTag f={f} at={ac} text="FTC June 2018: 'primary thing MOBE sells is more MOBE memberships'" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rs = w('c4e', 'restaurant');
    const on = w('c4e', 'only');
    const rc = w('c4e', 'recipe');
    q(rs, 'pop', 0.5);
    q(on, 'pop2', 0.5);
    q(rc, 'stamp', 0.7);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c4e'))}><Text size={50}>it's like a restaurant...</Text></G2>
          <Sign x={420} y={420} s={1.2 * P(A('c4e')) * bump(rs, 0.1)} text="RESTAURANT" color={C.red} />
          <Stick f={f} x={420} y={940} s={1.05} acc={['paperhat']} seed={41} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}]} />
          <Box x={1100} y={540} w={720} h={520} s={P(A('c4e')) * bump(on, 0.06)} fill={f >= rc ? C.yellow : '#fff'}>
          <Text y={-190} size={50} color={C.ink}>MENU</Text>
          <Text y={-90} size={36} color={GRAY}>the only dish:</Text>
          <Text y={20} size={52} color={C.red}>{f >= rc ? 'A RECIPE FOR' : '. . .'}</Text>
          <Text y={100} size={52} color={C.red}>{f >= rc ? 'OPENING A' : ' '}</Text>
          <Text y={180} size={52} color={C.red}>{f >= rc ? 'RESTAURANT' : ' '}</Text>
          </Box>
          <Dave f={f} x={1640} y={950} s={0.95} flip keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: rc, pose: 'facepalm', expr: 'tired', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fn = w('c4f', 'fine');
    const pr = w('c4f', 'print');
    const av = w('c4f', 'average');
    const mb = w('c4f', 'member');
    const md = w('c4f', 'less');
    const tw = w('c4f', 'two');
    const ls = w('c4f', 'lost');
    const tw2 = w('c4f', 'twenty');
    q(fn, 'paper', 0.5);
    q(pr, 'pop', 0.5);
    q(av, 'pop2', 0.5);
    q(tw, 'cash', 0.6);
    q(ls, 'thud', 0.6);
    q(tw2, 'stamp', 0.8);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={520} y={440} w={640} h={340} s={P(A('c4f'))} fill="#FFE3EA">
            <Text y={-120} size={36} color={GRAY}>avg. member made</Text>
            <Text y={-20} size={90} color={C.red}>{f >= tw ? '<$250' : '<?'}</Text>
            <Text y={80} size={36} color={GRAY}>per year</Text>
          </Box>
          <Box x={1240} y={440} w={640} h={340} s={P(A('c4f')) * bump(ls, 0.08)} fill={f >= tw2 ? C.yellow : '#FFE3EA'}>
            <Text y={-120} size={36} color={GRAY}>some people lost</Text>
            <Text y={-20} size={90} color={C.red}>{f >= tw2 ? '>$20k' : '>$?'}</Text>
            <Text y={80} size={36} color={C.red}>total</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const vl = w('c4g', 'villain');
    const nt = w('c4g', 'not');
    const on = w('c4g', 'one');
    const gu = w('c4g', 'guy');
    const mc = w('c4g', 'machine');
    q(vl, 'sting', 0.7);
    q(nt, 'pop', 0.5);
    q(on, 'stamp', 0.7);
    q(mc, 'thud', 0.6);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={P(A('c4g')) * bump(vl, 0.12)}><Text size={60} color={C.red}>THE VILLAIN</Text></G2>
          <Shadow f={f} x={600} y={640} s={1.4 * P(A('c4g'))} />
          <path d="M 860 640 L 1120 640" stroke={C.red} strokeWidth={10} markerEnd="url(#arrowhead)" />
          <Box x={1360} y={640} w={680} h={380} s={P(A('c4g')) * bump(mc, 0.08)} fill={f >= mc ? C.yellow : '#fff'}>
            <Text y={-140} size={46}>not one guy</Text>
            <Text y={-60} size={52} color={f >= mc ? C.red : C.ink}>THE MACHINE</Text>
            <Text y={40} size={40}>a sales funnel</Text>
            <Text y={100} size={40}>built to move you</Text>
            <Text y={150} size={46} color={C.red}>UP → UP → UP</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lf = w('c4h', 'left');
    const wd = w('c4h', 'weird');
    const sm = w('c4h', 'someone');
    const mn = w('c4h', 'money');
    const mc = w('c4h', 'machine');
    const sl = w('c4h', 'sell');
    q(lf, 'pop', 0.5);
    q(wd, 'ding', 0.5);
    q(sm, 'pop2', 0.5);
    q(mc, 'stamp', 0.7);
    scene(A('c4h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={760} y={320} s={P(A('c4h'))}><Bubble text="weird question..." size={38} tail="down" /></G2>
          <Box x={1320} y={560} w={780} h={380} s={P(A('c4h')) * bump(sm, 0.08)} fill={f >= sl ? C.yellow : '#fff'}>
            <Text y={-140} size={48}>if someone had</Text>
            <Text y={-60} size={52} color={C.red}>A MONEY MACHINE</Text>
            <Text y={40} size={48}>why would they</Text>
            <Text y={120} size={60} color={f >= sl ? C.red : C.ink}>{f >= sl ? 'SELL IT?' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: Why Sell A Secret? ============
  {
    const dv = w('c5a', 'dave');
    const th = w('c5a', 'thought');
    const un = w('c5a', 'uncles');
    const sc = w('c5a', 'secret');
    const fs = w('c5a', 'fishing');
    const fl = w('c5a', 'full');
    const nv = w('c5a', 'never');
    q(dv, 'pop', 0.5);
    q(sc, 'ding', 0.5);
    q(fs, 'boing', 0.5);
    q(nv, 'stamp', 0.7);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <Box x={1260} y={520} w={740} h={400} s={P(A('c5a')) * bump(sc, 0.08)} fill={f >= nv ? C.yellow : '#fff'}>
            <Text y={-160} size={40} color={GRAY}>uncle's secret spot</Text>
            <Text y={-80} size={56}>FULL of fish</Text>
            <Text y={20} size={48}>has he told anyone?</Text>
            <Text y={100} size={80} color={f >= nv ? C.red : C.ink}>{f >= nv ? 'NEVER' : '?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sl = w('c5b', 'sold');
    const mp = w('c5b', 'map');
    const th = w('c5b', 'thousand');
    const sp = w('c5b', 'spot');
    const em = w('c5b', 'empty');
    const tu = w('c5b', 'tuesday');
    q(sl, 'pop', 0.5);
    q(mp, 'paper', 0.5);
    q(th, 'crowd', 0.5);
    q(em, 'stamp', 0.8);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c5b')) * bump(mp, 0.1)}><Text size={52}>if he sold a map to 1,000 people...</Text></G2>
          <G2 x={420} y={520} s={1.2 * P(A('c5b')) * bump(mp, 0.1)} r={-6}>
          <rect x={-170} y={-130} width={340} height={260} rx={10} fill="#F6E7C1" stroke={C.ink} strokeWidth={6} />
          <path d="M -120 60 Q -40 -80 30 10 T 110 -70" fill="none" stroke={C.ink} strokeWidth={5} strokeDasharray="14 10" />
          <Text x={112} y={-76} size={50} color={C.red}>X</Text>
          <Text y={110} size={26} color={C.ink}>SECRET SPOT</Text>
          </G2>
          {Array.from({length: 14}).map((_, i) => <Stick key={i} f={f} x={800 + (i % 7) * 130} y={640 + Math.floor(i / 7) * 250} s={0.5} seed={80 + i} keys={[{at: 0, pose: i % 2 ? 'celebrate' : 'carry', expr: 'money', look: 0}]} />)}
          <G2 x={1200} y={900} s={bump(em, 0.16)} o={lt(em, 0.35)}><Stamp text="EMPTY BY TUESDAY" color={C.red} size={64} r={-4} /></G2>
          <G2 x={1200} y={300} s={P(A('c5b')) * bump(th, 0.1)}><Text size={44} color={GRAY}>1,000 buyers</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rl = w('c5c', 'real');
    const mn = w('c5c', 'money');
    const mr = w('c5c', 'more');
    const ls = w('c5c', 'less');
    const sc = w('c5c', 'secret');
    const kt = w('c5c', 'kept');
    q(rl, 'pop', 0.5);
    q(mn, 'cash', 0.6);
    q(mr, 'pop2', 0.5);
    q(ls, 'buzz', 0.5);
    q(kt, 'stamp', 0.8);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c5c'))}><Text size={48}>real money tricks</Text></G2>
          <Box x={960} y={480} w={1040} h={360} s={P(A('c5c')) * bump(mr, 0.08)} fill={f >= kt ? C.yellow : '#fff'}>
            <Text y={-120} size={52}>more people use it</Text>
            <Text y={-40} size={80} color={C.red}>↓</Text>
            <Text y={60} size={52}>less it works</Text>
            <Text y={150} size={56} color={f >= kt ? C.red : C.ink}>{f >= kt ? 'KEPT, NOT SOLD' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bt = w('c5d', 'but');
    const cs = w('c5d', 'course');
    const df = w('c5d', 'different');
    const rc = w('c5d', 'record');
    const on = w('c5d', 'once');
    const fr = w('c5d', 'forever');
    const ns = w('c5d', 'no');
    const st = w('c5d', 'stock');
    const rs = w('c5d', 'risk');
    q(bt, 'pop', 0.5);
    q(cs, 'ding', 0.5);
    q(rc, 'paper', 0.5);
    q(on, 'pop2', 0.5);
    q(ns, 'stamp', 0.7);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c5d'))}><Text size={48}>a course is different</Text></G2>
          <Box x={960} y={520} w={1000} h={420} s={P(A('c5d')) * bump(rc, 0.08)} fill={f >= ns ? C.yellow : '#fff'}>
            <Text y={-160} size={52}>record ONCE</Text>
            <Text y={-80} size={52} color={C.green}>sell FOREVER</Text>
            <Text y={20} size={46} color={f >= ns ? C.red : C.ink}>{f >= ns ? 'no shop' : '...'}</Text>
            <Text y={80} size={46} color={f >= ns ? C.red : C.ink}>{f >= ns ? 'no stock' : '...'}</Text>
            <Text y={140} size={46} color={f >= ns ? C.red : C.ink}>{f >= ns ? 'no risk' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dm = w('c5e', 'do');
    const mt = w('c5e', 'math');
    const on = w('c5e', 'one');
    const th = w('c5e', 'thousand');
    const ws = w('c5e', 'workshop');
    const sl = w('c5e', 'sold');
    const tp = w('c5e', 'people');
    const al = w('c5e', 'almost');
    const tw = w('c5e', 'two');
    const ml = w('c5e', 'million');
    const land = ml + 20;
    q(dm, 'pop', 0.5);
    q(mt, 'ding', 0.5);
    q(on, 'cash', 0.6);
    q(tw, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    scene(A('c5e'), () => {
      const n = Math.round(lerp(0, 1997000, ease(f, tw, land)));
      const sk = shake(f, land, 14, 12);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={P(A('c5e'))}><Text size={48}>DO THE MATH</Text></G2>
            <Box x={960 + sk.x} y={520 + sk.y} w={1060} h={420} s={P(A('c5e'))} fill={f >= land ? C.yellow : '#fff'}>
              <Text y={-160} size={48}>$1,997 workshop</Text>
              <Text y={-90} size={80}>×</Text>
              <Text y={-10} size={48}>1,000 buyers</Text>
              <Text y={80} size={70} color={C.red}>=</Text>
              <Text y={160} size={90} color={f >= land ? C.red : C.ink}>{f >= tw ? money(n) : '$?'}</Text>
            </Box>
          </Svg>
          </AbsoluteFill>
        );
      });
  }
  {
    const us = w('c5f', 'used');
    const th = w('c5f', 'think');
    const rc = w('c5f', 'rich');
    const kn = w('c5f', 'know');
    const np = w('c5f', 'nope');
    const bc = w('c5f', 'because');
    const bl = w('c5f', 'believed');
    q(us, 'pop', 0.5);
    q(th, 'ding', 0.5);
    q(rc, 'cash', 0.6);
    q(np, 'buzz', 0.7);
    q(bc, 'stamp', 0.8);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <Box x={1280} y={480} w={800} h={460} s={P(A('c5f')) * bump(th, 0.08)} fill={f >= bc ? C.yellow : '#fff'}>
            <Text y={-180} size={42} color={GRAY}>Dave used to think:</Text>
            <Text y={-100} size={48}>"he's rich, so he must</Text>
            <Text y={-40} size={48}>know the secret"</Text>
            <Text y={50} size={70} color={f >= np ? C.red : C.ink}>{f >= np ? 'NOPE' : '...'}</Text>
            <Text y={140} size={42}>{f >= bc ? "he's rich BECAUSE" : '...'}</Text>
            <Text y={190} size={42} color={f >= bl ? C.red : GRAY}>{f >= bl ? 'people like Dave believed' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dv = w('c5g', 'dave');
    const dd = w('c5g', 'decided');
    const gt = w('c5g', 'get');
    const mn = w('c5g', 'money');
    const wr = w('c5g', 'worse');
    q(dv, 'pop', 0.5);
    q(dd, 'ding', 0.5);
    q(gt, 'cash', 0.6);
    q(wr, 'sting', 0.7);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: 0.6}]} />
          <G2 x={780} y={320} s={P(A('c5g')) * bump(dd, 0.1)}><Bubble text="getting my money back" size={38} tail="down" /></G2>
          <G2 x={1360} y={480} s={P(A('c5g'))}><Text size={60}>then...</Text></G2>
          <G2 x={1360} y={640} s={bump(wr, 0.15)}><Text size={70} color={f >= wr ? C.red : C.ink}>{f >= wr ? 'THINGS GOT WORSE' : '...'}</Text></G2>
          <Laptop x={300} y={640} s={0.8 * P(A('c5g'))} />
          <MoneyStack x={1360} y={860} s={1.0 * P(A('c5g')) * bump(gt, 0.12)} n={4} label="$1,997" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: The Refund Maze ============
  {
    const dv = w('c6a', 'dave');
    const em = w('c6a', 'emailed');
    const sp = w('c6a', 'support');
    const sl = w('c6a', 'sales');
    const pg = w('c6a', 'page');
    const pr = w('c6a', 'promised');
    const on = w('c6a', 'hundred');
    const rf = w('c6a', 'risk');
    const th = w('c6a', 'thirty');
    const mn = w('c6a', 'money');
    q(dv, 'pop', 0.5);
    q(em, 'mail', 0.5);
    q(pr, 'pop2', 0.5);
    q(on, 'ding', 0.6);
    q(mn, 'cash', 0.6);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Laptop x={560} y={560} s={1.3} />
          <Dave f={f} x={240} y={930} s={0.95} keys={[{at: 0, pose: 'typing', expr: 'worried', look: 0.6}]} />
          <Box x={1360} y={500} w={680} h={400} s={P(A('c6a')) * bump(pr, 0.08)} fill={f >= on ? C.yellow : '#fff'}>
            <Text y={-160} size={36} color={GRAY}>sales page said:</Text>
            <Text y={-80} size={48} color={f >= on ? C.red : C.ink}>{f >= on ? '100% RISK-FREE' : '...'}</Text>
            <Text y={0} size={48}>{f >= th ? '30-day' : '??-day'}</Text>
            <Text y={60} size={48}>{f >= mn ? 'MONEY BACK' : '...'}</Text>
            <Text y={130} size={48}>guarantee</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rp = w('c6b', 'reply');
    const on = w('c6b', 'one');
    const pl = w('c6b', 'please');
    const fl = w('c6b', 'fill');
    const fm = w('c6b', 'form');
    const tw = w('c6b', 'two');
    const fr = w('c6b', 'first');
    const th = w('c6b', 'three');
    const nt = w('c6b', 'nothing');
    q(rp, 'mail', 0.5);
    q(on, 'tick', 0.4);
    q(pl, 'pop', 0.5);
    q(tw, 'tick', 0.4);
    q(fr, 'pop2', 0.5);
    q(th, 'tick', 0.4);
    q(nt, 'buzz', 0.7);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Mailbox x={560} y={560} s={1.4 * P(A('c6b'))} flag={1} />
          <Dave f={f} x={240} y={960} s={0.9} keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.6}]} />
          <Box x={1360} y={480} w={680} h={440} s={P(A('c6b'))} fill="#fff">
            <Text y={-180} size={36} color={GRAY}>replies from support:</Text>
            <Text y={-100} size={38}>{f >= pl ? '1. fill the form' : '1. ...'}</Text>
            <Text y={-40} size={38}>{f >= fr ? '2. finish every lesson' : '2. ...'}</Text>
            <Text y={40} size={70} color={f >= nt ? C.red : GRAY}>{f >= nt ? '3. nothing' : '3. ...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rv = w('c6c', 'revolving');
    const dr = w('c6c', 'door');
    const lt = w('c6c', 'lots');
    const ef = w('c6c', 'effort');
    const en = w('c6c', 'end');
    q(rv, 'pop', 0.5);
    q(dr, 'whoosh_s', 0.5);
    q(lt, 'thud', 0.6);
    q(en, 'stamp', 0.7);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={760} y={170} s={P(A('c6c')) * bump(rv, 0.1)}><Text size={56}>like pushing a revolving door</Text></G2>
          <G2 x={960} y={580} s={1.3 * P(A('c6c'))}>
          <circle r={210} fill="#E8EDF2" stroke={C.ink} strokeWidth={6} />
          <g transform={`rotate(${f * 4})`}>
          <path d="M -200 0 H 200 M 0 -200 V 200" stroke={C.ink} strokeWidth={10} />
          </g>
          <circle r={16} fill={C.ink} />
          </G2>
          <Dave f={f} x={520} y={940} s={1.1} walk keys={[{at: 0, pose: 'carry', expr: 'tired', look: 0.6}]} sweat />
          <G2 x={1440} y={520} s={P(A('c6c')) * bump(lt, 0.1)}><Text size={44} color={GRAY}>lots of effort</Text></G2>
          <G2 x={1440} y={640} s={bump(en, 0.14)} o={f >= en ? 1 : 0.35}><Text size={48} color={C.red}>back where</Text></G2>
          <G2 x={1440} y={710} s={bump(en, 0.14)} o={f >= en ? 1 : 0.35}><Text size={48} color={C.red}>you started</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nt = w('c6d', 'not');
    const js = w('c6d', 'just');
    const bd = w('c6d', 'bad');
    const lk = w('c6d', 'luck');
    const ftc = w('c6d', 'f');
    const mb = w('c6d', 'mobe');
    const of = w('c6d', 'often');
    const zu = w('c6d', 'zurixx');
    const sm = w('c6d', 'some');
    const pp = w('c6d', 'paper');
    q(nt, 'pop', 0.5);
    q(bd, 'buzz', 0.5);
    q(ftc, 'paper', 0.5);
    q(mb, 'stamp', 0.6);
    q(zu, 'paper', 0.5);
    q(pp, 'stamp', 0.7);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={960} y={120} s={P(A('c6d'))}><Text size={46}>NOT JUST BAD LUCK</Text></G2>
          <Box x={480} y={480} w={640} h={340} s={P(A('c6d'))} fill="#FFE3EA">
            <Text y={-120} size={36} color={GRAY}>FTC: MOBE</Text>
            <Text y={-40} size={44}>often REFUSED</Text>
            <Text y={20} size={44}>refunds</Text>
            <Text y={90} size={38} color={C.red}>(or paid only after</Text>
            <Text y={140} size={38} color={C.red}>persistent demands)</Text>
          </Box>
          <Box x={1340} y={480} w={640} h={340} s={P(A('c6d')) * bump(zu, 0.08)} fill={f >= pp ? C.yellow : '#FFE3EA'}>
            <Text y={-120} size={36} color={GRAY}>FTC: ZURIXX</Text>
            <Text y={-40} size={44}>some had to sign</Text>
            <Text y={20} size={48} color={f >= pp ? C.red : C.ink}>{f >= pp ? 'A PAPER' : '...'}</Text>
            <Text y={90} size={38} color={C.red}>promising not to</Text>
            <Text y={140} size={38} color={C.red}>talk to the FTC</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c6e', 'then');
    const dv = w('c6e', 'daves');
    const ws = w('c6e', 'workshop');
    const bd = w('c6e', 'buddy');
    const kv = w('c6e', 'kevin');
    const tx = w('c6e', 'texted');
    const hd = w('c6e', 'had');
    const pt = w('c6e', 'platinum');
    const tw = w('c6e', 'two');
    const cd = w('c6e', 'cards');
    const ch = w('c6e', 'coach');
    const pr = w('c6e', 'perfect');
    const fx = w('c6e', 'fix');
    const by = w('c6e', 'buy');
    const nx = w('c6e', 'next');
    q(th, 'pop', 0.5);
    q(bd, 'pop2', 0.5);
    q(tx, 'key', 0.5);
    q(hd, 'stamp', 0.7);
    q(ch, 'ding', 0.5);
    q(by, 'buzz', 0.7);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Kevin f={f} x={560} y={930} s={1.05} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.6}]} />
          <G2 x={760} y={320} s={P(A('c6e'))}><Bubble text="KEVIN (workshop buddy)" size={32} tail="down" /></G2>
          <Box x={1320} y={480} w={760} h={460} s={P(A('c6e')) * bump(hd, 0.08)} fill={f >= by ? C.yellow : '#fff'}>
            <Text y={-190} size={38} color={GRAY}>Kevin bought Platinum</Text>
            <Text y={-120} size={48}>{f >= tw ? 'on TWO cards' : '...'}</Text>
            <Text y={-30} size={40}>coach's fix:</Text>
            <Text y={40} size={60} color={f >= by ? C.red : C.ink}>{f >= by ? 'BUY THE' : '...'}</Text>
            <Text y={110} size={60} color={f >= by ? C.red : C.ink}>{f >= by ? 'NEXT LEVEL' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dv = w('c6f', 'dave');
    const st = w('c6f', 'stared');
    const ow = w('c6f', 'own');
    const pt = w('c6f', 'platinum');
    const of = w('c6f', 'offer');
    const so = w('c6f', 'open');
    const tw = w('c6f', 'two');
    const sp = w('c6f', 'spots');
    const mb = w('c6f', 'maybe');
    const sp2 = w('c6f', 'spend');
    const mr = w('c6f', 'more');
    const bk = w('c6f', 'back');
    q(dv, 'pop', 0.5);
    q(st, 'ding', 0.5);
    q(of, 'pop2', 0.5);
    q(sp, 'tick', 0.4);
    q(mb, 'sting', 0.6);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Laptop x={560} y={540} s={1.3 * bump(of, 0.06)} />
          <Dave f={f} x={240} y={930} s={0.95} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}]} sweat />
          <Box x={1360} y={480} w={720} h={420} s={P(A('c6f'))} fill={f >= mb ? C.yellow : '#fff'}>
            <Text y={-170} size={40} color={GRAY}>PLATINUM OFFER</Text>
            <Text y={-90} size={52}>{f >= so ? 'still OPEN' : '...'}</Text>
            <Text y={-20} size={48}>{f >= tw ? '2 spots left' : '...'}</Text>
            <Text y={60} size={42} color={f >= mb ? C.red : GRAY}>{f >= mb ? 'maybe spend more' : '...'}</Text>
            <Text y={120} size={42} color={f >= bk ? C.red : GRAY}>{f >= bk ? 'to earn it all back?' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lk = w('c6g', 'looked');
    const hp = w('c6g', 'hopeless');
    const on = w('c6g', 'one');
    const th = w('c6g', 'thing');
    const gr = w('c6g', 'gurus');
    const dn = w('c6g', 'dont');
    const wn = w('c6g', 'want');
    const kn = w('c6g', 'know');
    const st = w('c6g', 'sitting');
    const rl = w('c6g', 'rules');
    q(lk, 'pop', 0.5);
    q(hp, 'sting', 0.6);
    q(on, 'ding', 0.6);
    q(dn, 'stamp', 0.7);
    q(st, 'pop2', 0.5);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Dave f={f} x={560} y={930} s={1.15} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0.6}]} />
          <G2 x={760} y={320} s={P(A('c6g')) * bump(hp, 0.12)}><Bubble text={f >= hp ? 'hopeless...' : '...'} size={40} tail="down" /></G2>
          <Box x={1320} y={540} w={760} h={420} s={P(A('c6g')) * bump(on, 0.08)} fill={f >= st ? C.yellow : '#fff'}>
            <Text y={-160} size={48}>but there's</Text>
            <Text y={-80} size={60} color={C.red}>ONE THING</Text>
            <Text y={20} size={44}>gurus DON'T WANT</Text>
            <Text y={80} size={44}>you to know</Text>
            <Text y={150} size={48} color={f >= st ? C.red : C.ink}>{f >= st ? 'in the RULES' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: Dave Fights Back ============
  {
    const dv = w('c7a', 'dave');
    const op = w('c7a', 'opened');
    const ftc = w('c7a', 'f');
    const ws = w('c7a', 'website');
    const qu = w('c7a', 'quick');
    const rm = w('c7a', 'reminder');
    const ed = w('c7a', 'education');
    q(dv, 'pop', 0.5);
    q(op, 'click', 0.5);
    q(ftc, 'paper', 0.5);
    q(qu, 'ding', 0.5);
    q(ed, 'stamp', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Laptop x={560} y={560} s={1.3} />
          <Dave f={f} x={240} y={930} s={0.95} keys={[{at: 0, pose: 'typing', expr: 'think', look: 0.6}]} />
          <FTCBadge x={1360} y={400} s={1.2 * P(A('c7a')) * bump(ftc, 0.1)} />
          <G2 x={1360} y={620} s={bump(ed, 0.12)} o={lt(ed, 0.35)}><Text size={40} color={C.red}>education, not advice</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c7b', 'clue');
    const ly = w('c7b', 'lying');
    const ea = w('c7b', 'earnings');
    const al = w('c7b', 'already');
    const il = w('c7b', 'illegal');
    const tw = w('c7b', 'twenty');
    const on = w('c7b', 'one');
    const wn = w('c7b', 'warned');
    const el = w('c7b', 'eleven');
    const co = w('c7b', 'companies');
    q(cl, 'pop', 0.5);
    q(ly, 'paper', 0.5);
    q(al, 'stamp', 0.7);
    q(tw, 'tick', 0.4);
    q(wn, 'ding', 0.5);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={960} y={140} s={P(A('c7b'))}><Text size={50}>CLUE ONE</Text></G2>
          <Box x={960} y={540} w={1040} h={460} s={P(A('c7b')) * bump(ly, 0.08)} fill={f >= al ? C.yellow : '#fff'}>
            <Text y={-180} size={48}>lying about earnings</Text>
            <Text y={-100} size={70} color={f >= al ? C.red : C.ink}>{f >= al ? 'ALREADY' : '?'}</Text>
            <Text y={-10} size={70} color={f >= al ? C.red : C.ink}>{f >= al ? 'ILLEGAL' : '?'}</Text>
            <Text y={100} size={40} color={GRAY}>{f >= tw ? '2021: FTC warned 1,100+' : '...'}</Text>
            <Text y={160} size={40} color={GRAY}>{f >= co ? 'companies (biz coaching)' : '...'}</Text>
          </Box>
          <SourceTag f={f} at={tw} text="FTC Oct 2021: warned 1,100+ companies about fake money claims" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c7c', 'clue');
    const tw = w('c7c', 'two');
    const wn = w('c7c', 'warning');
    const ls = w('c7c', 'lists');
    const tr = w('c7c', 'tricks');
    const sy = w('c7c', 'saying');
    const pf = w('c7c', 'profits');
    const nd = w('c7c', 'need');
    const im = w('c7c', 'immediately');
    const cd = w('c7c', 'countdown');
    const tm = w('c7c', 'timer');
    const df = w('c7c', 'different');
    q(cl, 'pop', 0.5);
    q(wn, 'paper', 0.5);
    q(ls, 'ding', 0.5);
    q(sy, 'pop2', 0.5);
    q(nd, 'stamp', 0.6);
    q(cd, 'tick', 0.4);
    q(df, 'stamp', 0.7);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={960} y={120} s={P(A('c7c'))}><Text size={50}>CLUE TWO</Text></G2>
          <Box x={960} y={540} w={1060} h={520} s={P(A('c7c')) * bump(wn, 0.08)} fill={f >= df ? C.yellow : '#fff'}>
            <Text y={-220} size={40} color={GRAY}>FTC warning lists tricks:</Text>
            <Text y={-140} size={44}>{f >= sy ? '• profits are typical' : '...'}</Text>
            <Text y={-80} size={44}>{f >= nd ? '• no experience needed' : '...'}</Text>
            <Text y={-20} size={44}>{f >= im ? '• must act IMMEDIATELY' : '...'}</Text>
            <Text y={60} size={48} color={f >= cd ? C.red : GRAY}>{f >= cd ? "Dave's countdown" : '...'}</Text>
            <Text y={120} size={48} color={f >= cd ? C.red : GRAY}>{f >= cd ? 'timer suddenly' : '...'}</Text>
            <Text y={180} size={52} color={f >= df ? C.red : C.ink}>{f >= df ? 'LOOKED DIFFERENT' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c7d', 'clue');
    const th = w('c7d', 'three');
    const tw = w('c7d', 'twenty');
    const ft = w('c7d', 'five');
    const pr = w('c7d', 'proposed');
    const rl = w('c7d', 'rules');
    const am = w('c7d', 'aimed');
    const bc = w('c7d', 'business');
    const ch = w('c7d', 'coaching');
    const ea = w('c7d', 'earnings');
    const nd = w('c7d', 'need');
    const wt = w('c7d', 'written');
    q(cl, 'pop', 0.5);
    q(tw, 'tick', 0.4);
    q(pr, 'paper', 0.5);
    q(am, 'stamp', 0.6);
    q(ea, 'ding', 0.5);
    q(wt, 'stamp', 0.7);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <G2 x={960} y={120} s={P(A('c7d'))}><Text size={50}>CLUE THREE</Text></G2>
          <Box x={960} y={540} w={1040} h={480} s={P(A('c7d')) * bump(pr, 0.08)} fill={f >= wt ? C.yellow : '#fff'}>
            <Text y={-200} size={40} color={GRAY}>{f >= tw ? '2025: FTC proposed' : '...'}</Text>
            <Text y={-130} size={48}>{f >= pr ? 'NEW RULES' : '...'}</Text>
            <Text y={-60} size={44}>{f >= am ? 'aimed at business' : '...'}</Text>
            <Text y={0} size={44}>{f >= ch ? 'coaching' : '...'}</Text>
            <Text y={90} size={48} color={f >= ea ? C.red : C.ink}>{f >= ea ? 'any earnings claim' : '...'}</Text>
            <Text y={160} size={52} color={f >= wt ? C.red : C.ink}>{f >= wt ? 'WRITTEN PROOF' : '...'}</Text>
          </Box>
          <SourceTag f={f} at={tw} text="FTC Jan 2025: proposed rule requiring proof for biz coaching earnings claims" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dv = w('c7e', 'dave');
    const md = w('c7e', 'made');
    const pl = w('c7e', 'plan');
    const sv = w('c7e', 'saved');
    const sc = w('c7e', 'screenshots');
    const rp = w('c7e', 'reported');
    const pr = w('c7e', 'program');
    const as = w('c7e', 'asked');
    const cd = w('c7e', 'card');
    const ds = w('c7e', 'disputing');
    q(dv, 'pop', 0.5);
    q(md, 'ding', 0.5);
    q(sc, 'click', 0.5);
    q(rp, 'mail', 0.5);
    q(as, 'pop2', 0.5);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value={dmgValue} hot={1} />
          <Dave f={f} x={460} y={930} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: 0.6}]} />
          <ScreenshotFolder x={1020} y={400} s={0.7 * bump(sc, 0.08)} />
          <FTCBadge x={1440} y={600} s={0.8 * bump(rp, 0.1)} />
          <G2 x={1020} y={760} s={bump(as, 0.12)} o={lt(as, 0.35)}><Text size={38} color={C.navy}>asked card about dispute</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pt = w('c7f', 'platinum');
    const of = w('c7f', 'offer');
    const dv = w('c7f', 'dave');
    const cl = w('c7f', 'closed');
    const tb = w('c7f', 'tab');
    const ni = w('c7f', 'nine');
    const sv = w('c7f', 'saved');
    const land = sv + 20;
    q(pt, 'pop', 0.5);
    q(cl, 'click', 0.6);
    q(ni, 'cash', 0.7);
    q(land, 'ding', 0.8);
    scene(A('c7f'), () => {
      const saved = f >= land ? 1 : 0;
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <DamageMeter x={1700} y={90} value={f >= sv ? '$9,997' : dmgValue} saved={saved} hot={saved ? 0 : 1} />
            <Dave f={f} x={520} y={930} s={1.15} keys={[{at: 0, pose: 'hips', expr: f >= land ? 'grin' : 'suspicious', look: 0.6}]} />
            <Box x={1260} y={540} w={760} h={420} s={P(A('c7f'))} fill={f >= land ? C.green : f >= cl ? '#EEE' : C.yellow}>
              <Text y={-160} size={44} color={GRAY}>PLATINUM OFFER</Text>
              <Text y={-80} size={60} color={f >= cl ? GRAY : C.red}>$9,997</Text>
              <Text y={30} size={70} color={f >= cl ? GRAY : C.ink}>{f >= cl ? 'TAB CLOSED' : 'STILL OPEN'}</Text>
              <Text y={140} size={60} color={f >= land ? '#fff' : GRAY}>{f >= land ? 'SAVED' : '...'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      );
    });
  }
  {
    const st = w('c7g', 'still');
    const on = w('c7g', 'one');
    const cl = w('c7g', 'call');
    const bk = w('c7g', 'booked');
    const en = w('c7g', 'enrollment');
    const ch = w('c7g', 'coach');
    const pr = w('c7g', 'prepared');
    const qu = w('c7g', 'question');
    q(st, 'pop', 0.5);
    q(on, 'ding', 0.5);
    q(bk, 'tick', 0.4);
    q(pr, 'stamp', 0.7);
    scene(A('c7g'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Dave f={f} x={520} y={930} s={1.05} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={740} y={320} s={P(A('c7g'))}><Bubble text={f >= pr ? 'one question ready' : '...'} size={38} tail="down" /></G2>
          <Box x={1360} y={520} w={680} h={380} s={P(A('c7g')) * bump(on, 0.08)} fill={f >= pr ? C.yellow : '#fff'}>
            <Text y={-140} size={40} color={GRAY}>Dave had</Text>
            <Text y={-70} size={60} color={C.red}>ONE CALL</Text>
            <Text y={20} size={44}>left with the</Text>
            <Text y={80} size={44}>enrollment coach</Text>
            <Text y={150} size={48} color={f >= pr ? C.red : C.ink}>{f >= pr ? 'prepared question' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: The Question Gurus Hate ============
  {
    const ch = w('c8a', 'coach');
    const pk = w('c8a', 'picked');
    const sm = w('c8a', 'smiles');
    const dv = w('c8a', 'dave');
    const rd = w('c8a', 'ready');
    const pt = w('c8a', 'platinum');
    q(ch, 'pop', 0.5);
    q(pk, 'click', 0.5);
    q(sm, 'ding', 0.5);
    q(rd, 'pop2', 0.5);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Dave f={f} x={520} y={930} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.6}]} hold={{item: <Phone value="COACH" s={0.35} />, side: 'r'}} />
          <Coach f={f} x={1400} y={930} s={1.05} keys={[{at: 0, pose: 'wave', expr: 'grin', look: -0.6}]} />
          <G2 x={1400} y={320} s={P(A('c8a')) * bump(sm, 0.1)}><Bubble text="ready for Platinum?" size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sd = w('c8b', 'said');
    const mb = w('c8b', 'maybe');
    const on = w('c8b', 'one');
    const qu = w('c8b', 'question');
    const wh = w('c8b', 'what');
    const dd = w('c8b', 'did');
    const ty = w('c8b', 'typical');
    const st = w('c8b', 'student');
    const er = w('c8b', 'earn');
    const ls = w('c8b', 'last');
    const yr = w('c8b', 'year');
    const af = w('c8b', 'after');
    const py = w('c8b', 'paying');
    const sn = w('c8b', 'send');
    const wt = w('c8b', 'writing');
    q(sd, 'pop', 0.5);
    q(qu, 'ding', 0.6);
    q(wh, 'pop2', 0.5);
    q(ty, 'stamp', 0.6);
    q(sn, 'stamp', 0.7);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Dave f={f} x={480} y={930} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: 0.6}]} />
          <Box x={1240} y={500} w={800} h={500} s={P(A('c8b')) * bump(qu, 0.08)} fill={f >= sn ? C.yellow : '#fff'}>
            <Text y={-220} size={44} color={C.red}>THE QUESTION:</Text>
            <Text y={-140} size={40}>{f >= wh ? 'what did your' : '...'}</Text>
            <Text y={-80} size={46} color={f >= ty ? C.red : C.ink}>{f >= ty ? 'TYPICAL student' : '...'}</Text>
            <Text y={-20} size={40}>{f >= er ? 'earn last year,' : '...'}</Text>
            <Text y={40} size={40}>{f >= af ? 'AFTER paying' : '...'}</Text>
            <Text y={100} size={40}>{f >= py ? 'for the program?' : '...'}</Text>
            <Text y={180} size={48} color={f >= sn ? C.red : C.ink}>{f >= sn ? 'SEND IN WRITING' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sl = w('c8c', 'silence');
    const rs = w('c8c', 'results');
    const vr = w('c8c', 'vary');
    const oh = w('c8c', 'oh');
    const cl = w('c8c', 'click');
    q(sl, 'cricket', 0.6);
    q(rs, 'pop', 0.5);
    q(vr, 'buzz', 0.5);
    q(oh, 'pop2', 0.5);
    q(cl, 'click', 0.7);
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Dave f={f} x={520} y={930} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.6}]} hold={{item: <Phone value="..." s={0.35} />, side: 'r'}} />
          <Box x={1300} y={460} w={680} h={440} s={P(A('c8c'))} fill={f >= cl ? '#EEE' : '#fff'}>
            <Text y={-170} size={40} color={GRAY}>coach's response:</Text>
            <Text y={-80} size={56} color={f >= sl ? GRAY : C.ink}>{f >= sl ? '...' : '?'}</Text>
            <Text y={0} size={48}>{f >= rs ? '"results vary"' : '...'}</Text>
            <Text y={80} size={48}>{f >= oh ? '"oh, another call"' : '...'}</Text>
            <Text y={160} size={70} color={f >= cl ? C.red : C.ink}>{f >= cl ? '*CLICK*' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c8d', 'thats');
    const qu = w('c8d', 'question');
    const nt = w('c8d', 'not');
    const md = w('c8d', 'much');
    const ty = w('c8d', 'typical');
    const by = w('c8d', 'buyer');
    const wt = w('c8d', 'writing');
    q(th, 'pop', 0.5);
    q(qu, 'stamp', 0.7);
    q(nt, 'pop2', 0.5);
    q(ty, 'ding', 0.6);
    q(wt, 'stamp', 0.8);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Box x={960} y={500} w={1060} h={520} s={P(A('c8d')) * bump(qu, 0.08)} fill={f >= wt ? C.yellow : '#fff'}>
            <Text y={-220} size={50} color={C.red}>THE QUESTION</Text>
            <Text y={-130} size={44}>{f >= nt ? 'NOT "how much did' : '...'}</Text>
            <Text y={-70} size={44}>{f >= md ? 'YOU make"' : '...'}</Text>
            <Text y={20} size={52} color={f >= ty ? C.red : C.ink}>{f >= ty ? 'how much did' : '...'}</Text>
            <Text y={90} size={56} color={f >= ty ? C.red : C.ink}>{f >= ty ? 'TYPICAL BUYER' : '...'}</Text>
            <Text y={160} size={52} color={f >= ty ? C.red : C.ink}>{f >= ty ? 'make?' : '...'}</Text>
            <Text y={220} size={50} color={f >= wt ? C.red : C.ink}>{f >= wt ? 'IN WRITING' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gr = w('c8e', 'gurus');
    const rl = w('c8e', 'real');
    const nm = w('c8e', 'number');
    const nv = w('c8e', 'never');
    const ic = w('c8e', 'income');
    const hw = w('c8e', 'how');
    const mn = w('c8e', 'many');
    const dv = w('c8e', 'daves');
    const bt = w('c8e', 'bought');
    q(gr, 'pop', 0.5);
    q(rl, 'ding', 0.5);
    q(nv, 'stamp', 0.7);
    q(hw, 'pop2', 0.5);
    q(bt, 'cash', 0.6);
    scene(A('c8e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Guru f={f} x={1420} y={930} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <Box x={640} y={520} w={780} h={460} s={P(A('c8e'))} fill={f >= bt ? C.yellow : '#fff'}>
            <Text y={-190} size={44} color={GRAY}>guru's real number</Text>
            <Text y={-110} size={50} color={f >= nv ? GRAY : C.ink}>{f >= nv ? 'NOT his income' : '...'}</Text>
            <Text y={-20} size={56} color={C.red}>it was...</Text>
            <Text y={60} size={52} color={f >= hw ? C.red : C.ink}>{f >= hw ? 'how many DAVES' : '...'}</Text>
            <Text y={130} size={56} color={f >= bt ? C.red : C.ink}>{f >= bt ? 'BOUGHT' : '...'}</Text>
            <Text y={190} size={52}>{f >= bt ? 'the course' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gu = w('c8f', 'guy');
    const rl = w('c8f', 'real');
    const mn = w('c8f', 'money');
    const mc = w('c8f', 'machine');
    const ds = w('c8f', 'doesnt');
    const nd = w('c8f', 'need');
    const sl = w('c8f', 'selling');
    q(gu, 'pop', 0.5);
    q(rl, 'ding', 0.5);
    q(mc, 'cash', 0.6);
    q(ds, 'stamp', 0.7);
    q(sl, 'stamp', 0.8);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Box x={960} y={560} w={1060} h={480} s={P(A('c8f')) * bump(gu, 0.08)} fill={f >= sl ? C.yellow : '#fff'}>
            <Text y={-200} size={48}>a guy with a</Text>
            <Text y={-130} size={60} color={f >= rl ? C.red : C.ink}>{f >= rl ? 'REAL money' : '...'}</Text>
            <Text y={-60} size={60} color={f >= mc ? C.red : C.ink}>{f >= mc ? 'machine' : '...'}</Text>
            <Text y={30} size={48}>{f >= ds ? "DOESN'T NEED" : '...'}</Text>
            <Text y={100} size={48}>{f >= nd ? 'your $2,000' : '...'}</Text>
            <Text y={190} size={56} color={f >= sl ? C.red : C.ink}>{f >= sl ? 'A GUY SELLING ONE' : '...'}</Text>
            <Text y={240} size={48}>{f >= sl ? 'DOES' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9: What Dave Learned ============
  {
    const on = w('r1', 'one');
    const sl = w('r1', 'sells');
    const sc = w('r1', 'secret');
    const bs = w('r1', 'business');
    q(on, 'pop', 0.5);
    q(sl, 'ding', 0.5);
    q(bs, 'stamp', 0.7);
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <G2 x={960} y={140} s={P(A('r1'))}><Text size={50} color={C.navy}>WHAT DAVE LEARNED</Text></G2>
          <Box x={960} y={520} w={1000} h={280} s={P(A('r1')) * bump(on, 0.08)} fill={f >= bs ? C.yellow : '#fff'}>
            <Text y={-80} size={60} color={C.red}>ONE</Text>
            <Text y={0} size={48}>{f >= sl ? 'if someone sells' : '...'}</Text>
            <Text y={60} size={48}>{f >= sc ? 'the secret...' : '...'}</Text>
            <Text y={130} size={56} color={f >= bs ? C.red : C.ink}>{f >= bs ? 'SELLING IS THE BIZ' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('r2', 'two');
    const fr = w('r2', 'free');
    const fs = w('r2', 'first');
    const ld = w('r2', 'ladder');
    q(tw, 'pop', 0.5);
    q(fr, 'ding', 0.5);
    q(ld, 'stamp', 0.7);
    scene(A('r2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Box x={960} y={520} w={1000} h={280} s={P(A('r2')) * bump(tw, 0.08)} fill={f >= ld ? C.yellow : '#fff'}>
            <Text y={-80} size={60} color={C.red}>TWO</Text>
            <Text y={0} size={48}>{f >= fr ? 'free training is just' : '...'}</Text>
            <Text y={60} size={48}>{f >= fs ? 'the FIRST step' : '...'}</Text>
            <Text y={130} size={56} color={f >= ld ? C.red : C.ink}>{f >= ld ? 'OF A LONG LADDER' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('r3', 'three');
    const as = w('r3', 'ask');
    const ty = w('r3', 'typical');
    const by = w('r3', 'buyer');
    const er = w('r3', 'earned');
    const wt = w('r3', 'writing');
    q(th, 'pop', 0.5);
    q(as, 'ding', 0.5);
    q(ty, 'stamp', 0.6);
    q(wt, 'stamp', 0.8);
    scene(A('r3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Box x={960} y={520} w={1000} h={320} s={P(A('r3')) * bump(th, 0.08)} fill={f >= wt ? C.yellow : '#fff'}>
            <Text y={-110} size={60} color={C.red}>THREE</Text>
            <Text y={-30} size={48}>{f >= as ? 'ask what the' : '...'}</Text>
            <Text y={30} size={50} color={f >= ty ? C.red : C.ink}>{f >= ty ? 'TYPICAL BUYER' : '...'}</Text>
            <Text y={90} size={48}>{f >= er ? 'earned' : '...'}</Text>
            <Text y={150} size={56} color={f >= wt ? C.red : C.ink}>{f >= wt ? 'IN WRITING' : '...'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wk = w('r4', 'week');
    const bb = w('r4', 'bob');
    const kn = w('r4', 'knocked');
    const nt = w('r4', 'not');
    const op = w('r4', 'opportunity');
    const sw = w('r4', 'swears');
    const py = w('r4', 'pyramid');
    q(wk, 'pop', 0.5);
    q(bb, 'pop2', 0.5);
    q(kn, 'thud', 0.6);
    q(nt, 'ding', 0.5);
    q(py, 'stamp', 0.7);
    scene(A('r4'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <DamageMeter x={1700} y={90} value="$9,997" saved={1} />
          <Dave f={f} x={520} y={930} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: 0.6}]} />
          <Door x={1400} y={880} s={1.0} open={0} />
          <Dave f={f} x={1720} y={930} s={1.05} keys={[{at: 0, pose: 'wave', expr: 'grin', look: -0.6}]} />
          <G2 x={1600} y={320} s={P(A('r4'))}><Bubble text={f >= py ? "not a pyramid!" : f >= op ? 'business opportunity' : '...'} size={36} tail="down" /></G2>
          <G2 x={960} y={180} s={P(A('r4'))}><Text size={46}>a week later...</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('r5', 'subscribe');
    const rc = w('r5', 'raccoon');
    const cs = w('r5', 'course');
    const sp = w('r5', 'spotting');
    q(sb, 'pop', 0.6);
    q(rc, 'boing', 0.5);
    q(cs, 'stamp', 0.7);
    scene(A('r5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={860} y={380} s={1.4 * P(A('r5'))} done={f > sb + 14 ? 1 : 0} />
          <Bell x={1300} y={380} s={1.2 * P(A('r5'))} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={380} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
          <Raccoon f={f} x={1540} y={760} s={1.0 * P(A('r5')) * bump(rc, 0.12)} mood="wink" />
          <G2 x={1000} y={640} s={P(A('r5'))}><Text size={46}>so the raccoon can't sell you</Text></G2>
          <G2 x={1000} y={740} s={P(A('r5')) * bump(cs, 0.12)} o={f >= cs ? 1 : 0.4}><Text size={52} color={C.red}>a course on spotting raccoons</Text></G2>
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
