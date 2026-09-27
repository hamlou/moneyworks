import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bubble, Calendar, Car, Desk, MoneyStack, Puff, SourceTag, Stamp, Text, XMark} from '../props';
import {Envelope, OldCar, SubButton, Bell, Frame} from '../props2';
import {Person, Raccoon, TollBooth} from '../props3';
import {House} from '../props4';
import {Contract} from '../props5';
import {Flag} from '../props6';
import {Factory} from '../props7';
import {Scale} from '../props8';
import {BlueCar} from '../props18';
import {Backpack, Dealership, FishingRod, Hand, Microchip, Pickup, SlicedPizza, Sticker, Suv, TowTruck} from '../props23';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Sal: React.FC<SP> = (p) => <Stick acc={['tie', 'shades']} seed={62} {...p} />;
const Fin: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={70} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const Panel: React.FC<{x: number; y: number; w: number; h?: number; title: string; value: string; color?: string; s?: number; o?: number; size?: number}> = ({x, y, w, h = 200, title, value, color = C.ink, s = 1, o = 1, size = 80}) => (
  <G2 x={x} y={y} s={s} o={o}>
    <Box w={w} h={h} />
    <Text y={-h / 2 + 40} size={30} color="#5B6470" ls={2}>{title}</Text>
    <Text y={24} size={size} color={color}>{value}</Text>
  </G2>
);

const Arr: React.FC<{x1: number; y1: number; x2: number; y2: number; t: number; color?: string}> = ({x1, y1, x2, y2, t, color = C.red}) => {
  if (t <= 0) return null;
  const x = x1 + (x2 - x1) * t;
  const y = y1 + (y2 - y1) * t;
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={12} strokeLinecap="round" />
      <path d={`M ${x + Math.cos(a) * 20} ${y + Math.sin(a) * 20} L ${x + Math.cos(a + 2.4) * 34} ${y + Math.sin(a + 2.4) * 34} L ${x + Math.cos(a - 2.4) * 34} ${y + Math.sin(a - 2.4) * 34} Z`} fill={color} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};

const Check: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M -30 0 l 22 22 l 44 -48" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
);

export const Ep23: React.FC = () => {
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
  const lit = (at: number) => (f >= at ? 1 : 0.35);
  const bump = (at: number, k = 0.16) => (f < at ? 1 : 1 + k * Math.sin(Math.min(1, (f - at) / 14) * Math.PI));
  const v = (at: number, a: string, b: string) => (f >= at ? b : a);
  const P = (at: number) => pop(f, at);

  // ============ COLD OPEN ============
  {
    const ff = w('o1', 'fifty');
    const one = w('o1', 'one');
    const sv = w('o1', 'seven');
    q(2, 'pop', 0.6);
    q(ff, 'cash', 0.7);
    q(one, 'ding', 0.5);
    q(sv, 'stamp', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={230} y={880} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: sv, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <Suv x={720} y={760} s={1.25 * P(2)} />
          <Sticker x={720} y={330} s={bump(ff) * P(4)} title="AVERAGE NEW CAR" value={v(ff, '$ ?', '$50,089')} color={f >= ff ? C.red : C.gray} />
          <G2 x={1480} y={170} s={P(6)}><Text size={44}>buyers on 7-year loans</Text></G2>
          {[0, 1, 2, 3].map((i) => (
            <Person key={i} x={1250 + i * 150} y={390} s={1.3 * P(8 + i * 2) * (i === 0 ? bump(one, 0.3) : 1)} c={i === 0 && f >= one ? C.red : '#B9B1A3'} />
          ))}
          <G2 x={1480} y={500} s={P(10)} o={lit(one)}><Text size={52} color={C.red}>1 in 4</Text></G2>
          <Calendar x={1480} y={740} s={0.75 * P(12) * bump(sv)} top="LOAN" year={v(sv, '? YRS', '7 YRS')} flip={0} />
          <SourceTag f={f} at={ff} text="Kelley Blue Book, Aug 2026 · Edmunds Q2 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dd = w('o2', 'died');
    const dl = w('o2', 'dealership');
    const sm = w('o2', 'smiles');
    const mp = w('o3', 'monthly');
    const six = w('o4', 'six');
    const ok = w('o4', 'problem');
    const ef = w('o4', 'eighty');
    const sg = w('o4', 'sign');
    q(A('o2') + 4, 'pop', 0.5);
    q(dd, 'sputter', 0.7);
    q(dl, 'whoosh_s', 0.4);
    q(sm, 'ding', 0.5);
    q(mp, 'pop', 0.5);
    q(six, 'pop2', 0.5);
    q(ef, 'stamp', 0.6);
    q(sg, 'scribble', 0.6);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dealership f={f} x={1180} y={822} s={1} />
          <OldCar f={f} x={260} y={790} s={1.05 * P(A('o2'))} shake={f >= dd && f < dd + 30 ? 1 : 0} sag={f >= dd ? 1 : 0} />
          {f >= dd && f < dd + 26 && <Puff x={380} y={700} s={1.2} t={lin(f, dd, dd + 24)} />}
          <G2 x={260} y={620} s={P(A('o2') + 4)} o={lit(dd)}><Text size={40} color={C.red}>{v(dd, "Dave's old car", 'RIP old car')}</Text></G2>
          <Dave f={f} x={620} y={822} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: dd, pose: 'facepalm', expr: 'sad', look: -0.8}, {at: dl, pose: 'idle', expr: 'neutral', look: 0.8}, {at: A('o4'), pose: 'think', expr: 'happy', look: 0.8}, {at: sg, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
          <Sal f={f} x={1500} y={822} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: sm, pose: 'wave', expr: 'grin', look: -0.8}, {at: A('o3'), pose: 'talk', expr: 'smug', look: -0.8}, {at: ok, pose: 'present', expr: 'grin', look: -0.8}]} />
          {f < A('o3') && <G2 x={1500} y={300} s={P(A('o2') + 8)} o={lit(sm)}><Bubble text="Welcome, friend!" size={40} tail="down" /></G2>}
          {f >= A('o3') && f < A('o4') && <G2 x={1320} y={300} s={P(A('o3'))}><Bubble text={'Forget the price...\nwhat MONTHLY payment?'} size={42} tail="right" /></G2>}
          {f >= A('o4') && (
            <>
              <G2 x={620} y={330} s={P(A('o4'))} o={lit(six)}><Bubble text="Maybe $600?" size={44} tail="down" /></G2>
              <Contract x={1080} y={560} s={0.62 * P(A('o4') + 4) * bump(ef)} lines={['Monthly: $600', 'Term: 84 MONTHS', 'Rate: ...', 'Add-ons: ...']} signed={ease(f, sg, sg + 20)} />
              {f >= ef && <Stamp x={1080} y={760} s={pop(f, ef, 9, 260)} text="84 MONTHS" size={40} color={C.red} r={-6} />}
            </>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('o5', 'thousands');
    const ml = w('o5', 'millions');
    const fb = w('o5', 'behind');
    q(th, 'thud', 0.7);
    q(ml, 'crowd', 0.5);
    q(fb, 'sting', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={260} y={880} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: th, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= th} />
          <Sticker x={730} y={420} s={P(A('o5')) * bump(th)} title="WHAT IT REALLY COSTS" value={v(th, '$ ???', '+$ THOUSANDS')} color={f >= th ? C.red : C.gray} />
          <G2 x={730} y={700} s={P(A('o5') + 4)}><Text size={40}>the 84-month deal</Text></G2>
          <G2 x={1450} y={150} s={P(A('o5') + 6)} o={lit(fb)}><Text size={52} color={C.red}>already falling behind</Text></G2>
          {Array.from({length: 15}).map((_, i) => (
            <Person key={i} x={1160 + (i % 5) * 145} y={330 + Math.floor(i / 5) * 190} s={1.1 * P(A('o5') + 6 + (i % 5)) * bump(ml + i, 0.2)} c={f >= ml + i * 2 && i % 3 !== 1 ? C.red : '#B9B1A3'} />
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'expensive'), w('o6', 'trick'), w('o6', 'finance'), w('o6', 'underwater')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {['PRICE JUMP', '84-MONTH TRICK', 'FINANCE OFFICE', 'UNDERWATER'].map((l, i) => (
            <Frame key={l} x={270 + i * 460} y={500} s={P(A('o6') + i * 3) * bump(pv[i], 0.1)} o={lit(pv[i])} w={420} h={460} label={l}>
              {i === 0 && <Suv s={0.8} y={-20} tag="$50K" />}
              {i === 1 && <Calendar s={0.8} y={-50} top="MONTHS" year={84} flip={0} />}
              {i === 2 && <G2 y={60}><Desk s={0.45} /><Fin f={f} x={0} y={-90} s={0.45} keys={[{at: 0, pose: 'present', expr: 'smug'}]} /></G2>}
              {i === 3 && (
                <g>
                  <Car s={0.9} y={-30} />
                  <rect x={-190} y={-40} width={380} height={120} fill="#3A86FF" opacity={0.35} />
                  <path d="M -190 -40 q 30 -14 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 70 0" fill="none" stroke={C.blue} strokeWidth={6} />
                </g>
              )}
            </Frame>
          ))}
          <Dave f={f} x={960} y={1000} s={0.7} keys={[{at: 0, pose: 'point_up', expr: 'happy'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Monthly payment trick ============
  {
    const mp = w('c1a', 'monthly');
    const mg = w('c1b', 'magic');
    const ev = w('c1b', 'everything');
    const rows = [w('c1c', 'price'), w('c1c', 'longer'), w('c1c', 'interest'), w('c1c', 'addons')];
    const fits = w('c1c', 'fits');
    const nt = w('c1c', 'notice');
    const pz = w('c1d', 'pizza');
    const sl = w('c1d', 'slice');
    const th = w('c1d', 'thirty');
    const ch = w('c1e', 'cheap');
    const nt2 = w('c1e', 'not');
    q(mp, 'pop', 0.5);
    q(mg, 'dream', 0.5);
    q(ev, 'whoosh', 0.4);
    rows.forEach((x) => q(x, 'click', 0.6));
    q(fits, 'ding', 0.5);
    q(nt, 'cricket', 0.4);
    q(pz, 'pop', 0.5);
    q(sl, 'pop2', 0.5);
    q(th, 'rip', 0.6);
    q(ch, 'coin', 0.5);
    q(nt2, 'thud', 0.7);
    const labels = ['CAR PRICE', 'LOAN LENGTH', 'INTEREST RATE', 'ADD-ONS'];
    const before = ['$44,000', '60 months', '6%', '$0'];
    const after = ['$46,000 ↑', '84 months ↑', '8% ↑', '+$3,000 ↑'];
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Sal f={f} x={260} y={880} s={1.15 * P(A('c1a'))} keys={[{at: 0, pose: 'talk', expr: 'smug', look: 0.8}, {at: mg, pose: 'present', expr: 'grin', look: 0.8}]} />
            <G2 x={420} y={250} s={P(A('c1a') + 4)} o={1}><Bubble text={'What monthly payment\nare you comfortable with?'} size={34} tail="left" /></G2>
            <G2 x={1020} y={210} s={P(A('c1a') + 4) * bump(fits)}>
              <Box w={720} h={130} fill={f >= mp ? '#DFF5E8' : '#fff'} />
              <Text x={-60} size={48}>MONTHLY: $600</Text>
              <Check x={280} y={0} s={1.2} />
            </G2>
            {labels.map((l, i) => (
              <G2 key={l} x={1020} y={390 + i * 130} s={P(A('c1a') + 6 + i * 3) * bump(rows[i], 0.08)}>
                <Box w={720} h={110} fill={f >= rows[i] ? '#FFE3E3' : '#fff'} />
                <Text x={-330} size={36} anchor="start" color="#5B6470">{l}</Text>
                <Text x={330} size={44} anchor="end" color={f >= rows[i] ? C.red : f >= ev ? C.ink : C.gray}>{f >= rows[i] ? after[i] : f >= ev ? '?' : before[i]}</Text>
              </G2>
            ))}
            {f >= mg && <G2 x={1020} y={880} s={pop(f, mg)} o={1}><Text size={34} color="#8C7A5B">(example numbers)</Text></G2>}
            <Dave f={f} x={1640} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: fits, pose: 'thumbs', expr: 'happy', look: -0.8}]} />
            <G2 x={1640} y={360} s={P(A('c1a') + 10)} o={lit(nt)}><Bubble text={'$600? Great!'} size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={130} s={P(A('c1d'))}><Text size={50}>PIZZA SHOP: pay per slice!</Text></G2>
            <SlicedPizza x={620} y={520} s={1.3 * P(A('c1d')) * bump(th, 0.08)} n={f >= th ? 30 : 8} hl={f >= sl ? 0 : -1} />
            <Panel x={1330} y={330} w={560} title="ONE SLICE" value={f >= th ? '$2' : '$7'} color={f >= ch ? C.green : C.ink} s={P(A('c1d') + 4) * bump(ch)} />
            <Panel x={1330} y={590} w={560} title="THE WHOLE PIZZA" value={v(nt2, '?', '$60!')} color={f >= nt2 ? C.red : C.gray} s={P(A('c1d') + 6) * bump(nt2)} />
            <G2 x={1330} y={130} s={P(A('c1d') + 4)} o={lit(th)}><Text size={44} color={C.red}>{v(th, '8 slices', '30 tiny slices')}</Text></G2>
            <Dave f={f} x={1780} y={880} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: nt2, pose: 'shock', expr: 'shock', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 $50,000 car ============
  {
    const ag = w('c2b', 'august');
    const ff = w('c2b', 'fifty');
    const dc = w('c2c', 'december');
    const tn = w('c2c', 'thirty');
    const el = w('c2c', 'eleven');
    const pk = w('c2d', 'pickup');
    const sx = w('c2d', 'sixty');
    const cs = w('c2e', 'cash');
    const br = w('c2e', 'borrow');
    const ft = w('c2e', 'forty');
    const rc = w('c2e', 'record');
    const mg = w('c2f', 'mortgage');
    const wh = w('c2f', 'wheels');
    q(ag, 'flip', 0.5);
    q(ff, 'cash', 0.7);
    q(dc, 'flip', 0.5);
    q(tn, 'pop', 0.5);
    q(el, 'ding', 0.6);
    q(pk, 'pop', 0.5);
    q(sx, 'thud', 0.7);
    q(cs, 'buzz', 0.5);
    q(br, 'paper', 0.5);
    q(ft, 'cash', 0.6);
    q(rc, 'stamp', 0.7);
    q(mg, 'pop', 0.5);
    q(wh, 'boing', 0.6);
    const b1 = ease(f, tn - 4, tn + 14, 120, 38948 / 100);
    const b2 = ease(f, ff, ff + 14, 150, 50089 / 100);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c2a'))}><Text size={54}>the average new car</Text></G2>
            <Dave f={f} x={240} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ff, pose: 'shock', expr: 'shock', look: 0.8}, {at: el, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
            <line x1={560} y1={780} x2={1360} y2={780} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[{x: 760, h: b1, lab: 'Dec 2019', val: v(tn, '?', '$38,948'), at: dc, c: C.gray}, {x: 1160, h: b2, lab: 'Aug 2026', val: v(ff, '?', '$50,089'), at: ag, c: C.red}].map((b) => (
              <G2 key={b.lab} x={b.x} y={780} s={P(A('c2a') + 4)}>
                <rect x={-130} y={-b.h} width={260} height={b.h} rx={12} fill={b.c} stroke={C.ink} strokeWidth={6} opacity={f >= b.at ? 1 : 0.55} />
                <Text y={-b.h - 44} size={52}>{b.val}</Text>
                <Text y={40} size={34} color="#5B6470">{b.lab}</Text>
              </G2>
            ))}
            <Suv x={1640} y={420} s={0.85 * P(A('c2a') + 6)} tag={v(ff, '$ ?', '$50K+')} />
            <G2 x={1640} y={640} s={P(A('c2a') + 8) * bump(el)} o={lit(el)}>
              <Box w={440} h={140} fill={C.yellow} />
              <Text y={-22} size={52} color={C.red}>+$11,000</Text>
              <Text y={34} size={30}>in under 7 years</Text>
            </G2>
            <Arr x1={800} y1={300} x2={1020} y2={230} t={ease(f, el, el + 12)} />
            <SourceTag f={f} at={ff} text="Kelley Blue Book ATP, Dec 2019 & Aug 2026" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={260} y={880} s={1.05} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: sx, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Pickup x={950} y={720} s={1.5 * P(A('c2d')) * bump(pk, 0.06)} tag="POPULAR" />
            <Sticker x={950} y={290} s={P(A('c2d') + 4) * bump(sx)} title="AVG FULL-SIZE PICKUP" value={v(sx, '$ ?', '$67,446')} color={f >= sx ? C.red : C.gray} />
            <G2 x={1600} y={520} s={P(A('c2d') + 6)}>
              <Car s={1} y={40} />
              <Text y={-80} size={34} color="#5B6470">compact car</Text>
              <Text y={120} size={44}>$27,997</Text>
            </G2>
            <SourceTag f={f} at={sx} text="Kelley Blue Book, Aug 2026 segment ATPs" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={280} y={880} s={1.1} keys={[{at: 0, pose: 'pockets', expr: 'worried', look: 0.8}, {at: br, pose: 'hold', expr: 'think', look: 0.8}]} />
            <G2 x={280} y={380} s={P(A('c2e'))}>
              <MoneyStack n={3} s={1.1} />
              {f >= cs && <XMark s={0.25 * pop(f, cs)} y={-20} />}
              <Text y={80} size={36}>pay in cash?</Text>
            </G2>
            <Contract x={960} y={500} s={0.85 * P(A('c2e') + 4) * bump(br, 0.08)} lines={['Borrower: Dave', 'Amount: ?', 'Term: ...', 'Rate: ...']} signed={ease(f, br, br + 20)} />
            <Panel x={1540} y={420} w={560} h={240} title="AVERAGE NEW-CAR LOAN" value={v(ft, '$ ?', '$44,156')} color={f >= ft ? C.red : C.gray} s={P(A('c2e') + 6) * bump(ft)} size={90} />
            <G2 x={1540} y={660} s={P(A('c2e') + 8)} o={lit(rc)} r={-4}><Stamp text="RECORD" size={56} color={C.red} /></G2>
            <SourceTag f={f} at={ft} text="Edmunds, Q2 2026: avg amount financed $44,156" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c2f'))}><Text size={58}>a small mortgage... with wheels</Text></G2>
            <G2 x={900} y={820} s={0.95 * P(A('c2f'))}>
              <House sold="LOAN $44K" />
              {[-200, 200].map((x) => (
                <g key={x} transform={`translate(${x},10) rotate(${f >= wh ? (f - wh) * 6 : 0}) scale(${bump(wh, 0.3)})`}>
                  <circle r={62} fill={C.ink} />
                  <circle r={26} fill="#ddd" />
                  <line x1={-26} x2={26} y1={0} y2={0} stroke={C.ink} strokeWidth={6} />
                </g>
              ))}
            </G2>
            <Dave f={f} x={1600} y={880} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.8}, {at: wh, pose: 'facepalm', expr: 'tired', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Why so expensive ============
  {
    const four = w('c3a', 'four');
    const cp = w('c3b', 'chip');
    const cc = w('c3b', 'computer');
    const fw = w('c3b', 'fewer');
    const fo = w('c3b', 'fought');
    const up = w('c3c', 'up', 1);
    const dn = w('c3c', 'down');
    const tr = w('c3d', 'trucks');
    const bg = w('c3d', 'bigger');
    const cm = w('c3d', 'cost');
    const er = w('c3d', 'earn');
    const dis = w('c3e', 'disappearing');
    const t36 = w('c3e', 'thirty');
    const five = w('c3e', 'five', 2);
    const tf = w('c3f', 'tariffs');
    const bd = w('c3f', 'border');
    const p25 = w('c3f', 'percent');
    const p15 = w('c3f', 'fifteen');
    const sp = w('c3g', 'supporters');
    const cr = w('c3g', 'critics');
    const pl = w('c3g', 'political');
    const nb = w('c3g', 'numbers');
    q(four, 'pop', 0.5);
    q(cp, 'pop', 0.5);
    q(cc, 'buzz', 0.5);
    q(fw, 'thud', 0.5);
    q(fo, 'crowd', 0.5);
    q(up, 'whoosh', 0.4);
    q(dn, 'trombone', 0.4);
    q(tr, 'pop', 0.5);
    q(bg, 'boing', 0.5);
    q(cm, 'cash', 0.5);
    q(er, 'coin', 0.5);
    q(dis, 'poof', 0.5);
    q(t36, 'ding', 0.5);
    q(five, 'thud', 0.7);
    q(tf, 'stamp', 0.5);
    q(bd, 'clank', 0.5);
    q(p25, 'ding', 0.5);
    q(p15, 'ding', 0.5);
    q(sp, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(pl, 'ding', 0.5);
    q(nb, 'chime', 0.5);
    const reasons = ['CHIPS', 'TRUCKS & SUVs', 'NO CHEAP CARS', 'TARIFFS'];
    const cur = f < A('c3b') ? -1 : f < A('c3d') ? 0 : f < A('c3e') ? 1 : f < A('c3f') ? 2 : 3;
    const strip = (
      <g>
        {reasons.map((r, i) => (
          <G2 key={r} x={300 + i * 440} y={130} s={P(A('c3a') + i * 3) * (cur === -1 ? bump(four + i * 3, 0.15) : 1)} o={cur === -1 || cur === i ? 1 : 0.35}>
            <Box w={400} h={100} fill={cur === i ? C.yellow : '#fff'} />
            <Text x={-150} size={36} color={C.red}>{i + 1}</Text>
            <Text x={20} size={34}>{r}</Text>
          </G2>
        ))}
      </g>
    );
    const grid = Array.from({length: 36});
    scene(A('c3a'), () =>
      f < A('c3b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <Dave f={f} x={500} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
            <Suv x={1200} y={700} s={1.3 * P(A('c3a'))} tag="$50,089" />
            <Arr x1={1560} y1={760} x2={1560} y2={420} t={ease(f, A('c3a') + 4, four + 10)} />
            <G2 x={1200} y={400} s={P(A('c3a') + 4)}><Text size={54}>why did prices jump?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <Factory x={380} y={740} s={1 * P(A('c3b'))} label="CAR FACTORY" />
            <G2 x={880} y={480} s={P(A('c3b') + 4) * bump(cc)}>
              <Microchip s={1.1} />
              {f >= cc && <XMark s={0.28 * pop(f, cc)} />}
              <Text y={170} size={36}>{v(cc, 'computer chips', 'not enough chips!')}</Text>
            </G2>
            {[0, 1, 2].map((i) => <Car key={i} x={640 + i * 240} y={820} s={0.9 * P(A('c3b') + 6 + i * 3)} o={f >= fw && i > 0 ? 0.25 : 1} />)}
            {[0, 1, 2].map((i) => (
              <Stick key={i} f={f} x={1360 + i * 180} y={880} s={0.85} acc={i === 1 ? ['hair'] : i ? ['ponytail'] : ['cap']} seed={i === 1 ? 7 : 50 + i} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: fo, pose: 'panic', expr: 'shock', look: i === 2 ? -0.8 : 0.8}]} />
            ))}
            <G2 x={1540} y={420} s={P(A('c3b') + 8)} o={lit(fo)}><Bubble text="That one's MINE!" size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <G2 x={760} y={560} s={P(A('c3c'))}>
              <line x1={-450} y1={260} x2={450} y2={260} stroke={C.ink} strokeWidth={5} />
              <line x1={-450} y1={-230} x2={-450} y2={260} stroke={C.ink} strokeWidth={5} />
              <path d="M -430 220 L -200 200 L -60 -160 L 120 -190 L 300 -180 L 430 -175" fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
              <Text x={-200} y={-80} size={34} color="#5B6470">prices</Text>
            </G2>
            <G2 x={1480} y={430} s={P(A('c3c') + 4) * bump(up)} o={lit(up)}>
              <Box w={560} h={120} fill="#FFE3E3" />
              <Text size={50} color={C.red}>going UP: easy</Text>
            </G2>
            <G2 x={1480} y={600} s={P(A('c3c') + 6) * bump(dn)} o={lit(dn)}>
              <Box w={560} h={120} />
              <Text size={50} color="#5B6470">coming DOWN: rare</Text>
            </G2>
            <Dave f={f} x={1480} y={900} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <G2 x={480} y={600} s={P(A('c3d'))}>
              <Car s={1.3} />
              <Text y={-170} size={36} color="#5B6470">compact car</Text>
              <Text y={130} size={52}>{v(cm, '?', '$27,997')}</Text>
            </G2>
            <G2 x={1250} y={620} s={P(A('c3d') + 4) * bump(bg, 0.1)}>
              <Pickup s={1.35} />
              <Text y={-260} size={36} color="#5B6470">full-size pickup</Text>
              <Text y={150} size={52} color={f >= cm ? C.red : C.ink}>{v(cm, '?', '$67,446')}</Text>
            </G2>
            <Arr x1={700} y1={560} x2={880} y2={560} t={ease(f, tr, tr + 12, 0.35, 1)} color={C.ink} />
            <G2 x={1700} y={300} s={P(A('c3d') + 6)} o={lit(er)} r={-6}><Stamp text="MORE PROFIT" size={40} color={C.green} /></G2>
            <Sal f={f} x={1760} y={880} s={0.8} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: er, pose: 'celebrate', expr: 'money', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <G2 x={330} y={330} s={P(A('c3e'))}><Text size={40} color="#5B6470">new models under $25,000</Text></G2>
            {grid.map((_, i) => (
              <Car key={i} x={120 + (i % 9) * 150} y={440 + Math.floor(i / 9) * 115} s={0.42 * P(A('c3e') + 2 + (i % 9)) * (f >= t36 && f < t36 + 20 ? bump(t36 + (i % 9), 0.2) : 1)} o={f >= five && i >= 5 ? 0.12 : 1} />
            ))}
            <Panel x={1600} y={420} w={420} title="IN 2017" value={v(t36, '?', '36')} s={P(A('c3e') + 4) * bump(t36)} />
            <Panel x={1600} y={660} w={420} title="IN 2025" value={v(five, '?', 'just 5')} color={f >= five ? C.red : C.gray} s={P(A('c3e') + 6) * bump(five)} />
            <SourceTag f={f} at={t36} text="Cox Automotive: 36 models ≤ $25K (Dec 2017) → 5 (2025)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <TollBooth x={960} y={820} s={1.15 * P(A('c3f'))} label="TARIFF" barUp={f >= bd ? ease(f, bd + 30, bd + 50) : 0} />
            <Suv x={lin(f, A('c3f'), bd, 250, 560)} y={790} s={0.8} tag="IMPORT" />
            <G2 x={330} y={440} s={P(A('c3f') + 4)}><Flag kind="jp" s={0.6} /></G2>
            <Panel x={1540} y={380} w={560} h={180} title="MANY IMPORTS" value={v(p25, '?', '25%')} color={f >= p25 ? C.red : C.gray} s={P(A('c3f') + 4) * bump(p25)} />
            <Panel x={1540} y={600} w={560} h={180} title="JAPAN · EUROPE · KOREA" value={v(p15, '?', '15%')} color={f >= p15 ? C.red : C.gray} s={P(A('c3f') + 6) * bump(p15)} />
            <SourceTag f={f} at={p25} text="U.S. Section 232 auto tariffs (2025) + trade deals" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {strip}
            <Scale x={960} y={880} s={1.05 * P(A('c3g'))} tilt={f < cr ? ease(f, sp, sp + 15, 0, -10) : f < pl ? ease(f, cr, cr + 15, -10, 10) : ease(f, pl, pl + 15, 10, 0)} left="factories home" right="buyers pay" />
            <G2 x={420} y={360} s={P(A('c3g') + 4)} o={lit(sp)}><Text size={44} color={C.green}>SUPPORTERS</Text></G2>
            <G2 x={1500} y={360} s={P(A('c3g') + 4)} o={lit(cr)}><Text size={44} color={C.red}>CRITICS</Text></G2>
            <G2 x={960} y={300} s={P(A('c3g') + 6)} o={lit(nb)}><Text size={40}>now you know the numbers</Text></G2>
            <Dave f={f} x={1760} y={880} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: nb, pose: 'thumbs', expr: 'happy', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 84-month trick ============
  {
    const sy = w('c4a', 'seven');
    const ch = w('c4a', 'cheaper');
    const ft = w('c4b', 'forty');
    const sp = w('c4b', 'seven');
    const e874 = w('c4c', 'eight');
    const ouch = w('c4c', 'ouch');
    const st = w('c4d', 'stretches');
    const s666 = w('c4d', 'six');
    const sm = w('c4d', 'smiles');
    const i5 = w('c4e', 'eight');
    const i7 = w('c4e', 'eleven');
    const lp = w('c4f', 'lower');
    const bb = w('c4f', 'bigger');
    const rc = w('c4f', 'raccoon');
    const ll = w('c4f', 'loves');
    const p24 = w('c4g', 'twenty', 2);
    const p777 = w('c4g', 'seven', 0);
    const rec2 = w('c4g', 'record', 1);
    q(sy, 'pop', 0.5);
    q(ch, 'ding', 0.5);
    q(ft, 'cash', 0.6);
    q(sp, 'pop', 0.5);
    q(e874, 'thud', 0.6);
    q(ouch, 'boing', 0.6);
    q(st, 'whoosh', 0.5);
    q(s666, 'ding', 0.6);
    q(i5, 'pop', 0.5);
    q(i7, 'thud', 0.8);
    q(lp, 'pop', 0.5);
    q(bb, 'stamp', 0.6);
    q(rc, 'pop', 0.6);
    q(ll, 'heart', 0.5);
    q(p24, 'ding', 0.6);
    q(p777, 'cash', 0.6);
    q(rec2, 'stamp', 0.7);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={280} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ft, pose: 'hold', expr: 'happy', look: 0.8}]} />
            <Suv x={900} y={760} s={1.3 * P(A('c4a'))} />
            <Panel x={760} y={330} w={440} title="DAVE BORROWS" value={v(ft, '$ ?', '$44,000')} color={f >= ft ? C.ink : C.gray} s={P(A('c4a') + 4) * bump(ft)} size={70} />
            <Panel x={1240} y={330} w={400} title="INTEREST RATE" value={v(sp, '?', '7%')} color={f >= sp ? C.red : C.gray} s={P(A('c4a') + 6) * bump(sp)} size={80} />
            <Calendar x={1620} y={680} s={0.8 * P(A('c4a') + 8) * bump(sy)} top="LOAN" year="7 YRS" flip={0} />
            <G2 x={1620} y={420} s={P(A('c4a') + 8)} o={lit(ch)}><Text size={40} color={C.green}>feels cheaper?</Text></G2>
            <SourceTag f={f} at={sp} text="Edmunds Q2 2026: average new-car APR ≈ 7.0%" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[{x: 560, title: '5-YEAR LOAN', m: v(e874, '?', '$874'), mc: C.red, mat: e874, i: v(i5, '?', '$8,300'), iat: i5, ic: C.ink}, {x: 1200, title: '7-YEAR LOAN (84 mo)', m: v(s666, '?', '$666'), mc: C.green, mat: s666, i: v(i7, '?', '$11,800'), iat: i7, ic: C.red}].map((c, k) => (
              <G2 key={c.title} x={c.x} y={500} s={P(A('c4c') + k * 4) * (k === 1 ? bump(st, 0.06) : 1)}>
                <Box w={580} h={660} fill={k === 1 && f >= st ? '#FFF6D8' : '#fff'} />
                <Text y={-280} size={42}>{c.title}</Text>
                <Text y={-190} size={30} color="#5B6470">monthly payment</Text>
                <G2 y={-100} s={bump(c.mat)}><Text size={96} color={f >= c.mat ? c.mc : C.gray}>{c.m}</Text></G2>
                <line x1={-240} x2={240} y1={0} y2={0} stroke="#D3DEE3" strokeWidth={5} />
                <Text y={70} size={30} color="#5B6470">total interest</Text>
                <G2 y={160} s={bump(c.iat)}><Text size={88} color={f >= c.iat ? c.ic : C.gray}>{c.i}</Text></G2>
                <Text y={270} size={26} color="#8C7A5B">$44,000 at 7%</Text>
              </G2>
            ))}
            {f >= i7 && <Stamp x={1200} y={880 - 40} s={pop(f, i7 + 10, 9, 260)} text="+$3,500 MORE" size={40} color={C.red} r={-4} />}
            <Dave f={f} x={1740} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ouch, pose: 'shock', expr: 'shock', look: -0.8}, {at: sm, pose: 'thumbs', expr: 'grin', look: -0.8}, {at: i7, pose: 'panic', expr: 'shock', look: -0.8}]} sweat={f >= i7} />
            <SourceTag f={f} at={e874} text="Standard loan math: $44,000, 7.0% APR" until={i7} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={300} s={P(A('c4f')) * bump(lp)} o={lit(lp)}><Box w={620} h={130} fill="#DFF5E8" /><Text size={54} color={C.green}>lower payment ↓</Text></G2>
            <G2 x={480} y={480} s={P(A('c4f') + 4) * bump(bb)} o={lit(bb)}><Box w={620} h={130} fill="#FFE3E3" /><Text size={54} color={C.red}>bigger bill ↑</Text></G2>
            {Array.from({length: 84}).map((_, i) => (
              <rect key={i} x={110 + (i % 21) * 42} y={620 + Math.floor(i / 21) * 42} width={34} height={34} rx={6} fill={i < 60 ? '#B9DDF5' : C.red} stroke={C.ink} strokeWidth={3} opacity={P(A('c4f') + 4)} />
            ))}
            <G2 x={560} y={820 + 20} s={P(A('c4f') + 6)}><Text size={30} color="#5B6470">84 monthly payments</Text></G2>
            <Raccoon f={f} x={1450} y={720} s={1.3 * P(A('c4f')) * bump(rc, 0.1)} mood={f >= ll ? 'greedy' : 'sneaky'} holdCoin={f >= ll} />
            <G2 x={1450} y={320} s={P(A('c4f') + 6)} o={lit(ll)}><Bubble text={'I LOVE long loans!'} size={42} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={240} y={880} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <G2 x={760} y={220} s={P(A('c4g'))}><Text size={40} color="#5B6470">new-car buyers on 84+ month loans</Text></G2>
            {[0, 1, 2, 3].map((i) => (
              <Person key={i} x={520 + i * 160} y={460} s={1.5 * P(A('c4g') + 2 + i * 2) * (i === 0 ? bump(p24, 0.3) : 1)} c={i === 0 && f >= p24 ? C.red : '#B9B1A3'} />
            ))}
            <G2 x={760} y={640} s={P(A('c4g') + 4) * bump(p24)}><Text size={96} color={f >= p24 ? C.red : C.gray}>{v(p24, '?', '23.9%')}</Text></G2>
            <Panel x={1480} y={470} w={560} h={320} title="AVG MONTHLY PAYMENT" value={v(p777, '$ ?', '$777')} color={f >= p777 ? C.red : C.gray} s={P(A('c4g') + 6) * bump(p777)} size={130} />
            <G2 x={1480} y={720} s={P(A('c4g') + 8)} o={lit(rec2)} r={-4}><Stamp text="RECORD" size={56} color={C.red} /></G2>
            <SourceTag f={f} at={p24} text="Edmunds, Q2 2026 new-vehicle finance data" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Finance office ============
  {
    const rm = w('c5a', 'room');
    const fo = w('c5a', 'finance');
    const sc = w('c5b', 'secret');
    const bk = w('c5b', 'bank');
    const s6 = w('c5b', 'six');
    const e8 = w('c5c', 'eight');
    const df = w('c5c', 'difference');
    const mk = w('c5c', 'markup');
    const lg = w('c5c', 'legal');
    const tp = w('c5d', 'two');
    const t36 = w('c5d', 'three');
    const ao = w('c5e', 'addons');
    const items = [w('c5e', 'warranty'), w('c5e', 'paint'), w('c5e', 'tire')];
    const fw = w('c5e', 'few');
    const au = w('c5f', 'adds');
    const t25 = w('c5f', 'two');
    const bt = w('c5g', 'bait');
    const rod = w('c5g', 'rod');
    q(rm, 'step', 0.5);
    q(fo, 'ding', 0.5);
    q(sc, 'sting', 0.4);
    q(bk, 'pop', 0.5);
    q(s6, 'ding', 0.5);
    q(e8, 'scribble', 0.7);
    q(df, 'coin', 0.6);
    q(mk, 'stamp', 0.7);
    q(lg, 'paper', 0.4);
    q(tp, 'pop', 0.5);
    q(t36, 'cash', 0.7);
    q(ao, 'pop', 0.5);
    items.forEach((x) => q(x, 'click', 0.6));
    q(fw, 'coin', 0.4);
    q(au, 'cash', 0.5);
    q(t25, 'ding', 0.6);
    q(bt, 'pop', 0.5);
    q(rod, 'whoosh', 0.5);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={760} y={150} s={P(A('c5a')) * bump(fo)}>
              <rect x={-300} y={-50} width={600} height={100} rx={14} fill={C.navy} stroke={C.ink} strokeWidth={6} />
              <Text size={48} color="#fff" ls={4}>FINANCE OFFICE</Text>
            </G2>
            <Desk x={760} y={900} s={1 * P(A('c5a'))} />
            <Fin f={f} x={760} y={700} s={1} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.8}, {at: sc, pose: 'talk', expr: 'smug', look: 0.8}]} />
            <Dave f={f} x={300} y={880} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: sc, pose: 'think', expr: 'suspicious', look: 0.8}]} />
            <Bank x={1560} y={780} s={0.55 * P(A('c5a') + 4) * bump(bk, 0.1)} o={lit(bk)} label="BANK" />
            <G2 x={1560} y={330} s={P(A('c5a') + 6) * bump(s6)} o={lit(bk)}><Bubble text={v(s6, "Dave's rate: ?", "Dave's rate: 6%")} size={40} tail="down" /></G2>
            <Arr x1={1320} y1={600} x2={1020} y2={600} t={ease(f, bk, bk + 14, 0.2, 1)} color={C.blue} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Fin f={f} x={260} y={880} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'smug', look: 0.8}, {at: df, pose: 'celebrate', expr: 'money', look: 0.8}]} />
            <G2 x={760} y={480} s={P(A('c5c'))}>
              <Contract s={0.95} lines={['Car: $44,000', 'Term: 84 mo', 'Rate: 6%', 'Sign: ________']} signed={0} />
              {f >= e8 && <line x1={-190} x2={40} y1={-30} y2={-30} stroke={C.red} strokeWidth={8} strokeLinecap="round" />}
              {f >= e8 && <Hand x={130} y={-30} size={80} color={C.red} r={-8}>8%</Hand>}
            </G2>
            <G2 x={1460} y={330} s={P(A('c5c') + 4)}>
              <Text y={-110} size={36} color="#5B6470">Dave pays 8%</Text>
              <rect x={-330} y={-60} width={495} height={120} rx={14} fill={C.blue} stroke={C.ink} strokeWidth={6} />
              <rect x={165} y={-60} width={165} height={120} rx={14} fill={C.red} stroke={C.ink} strokeWidth={6} opacity={f >= df ? 1 : 0.3} />
              <Text x={-82} size={40} color="#fff">bank: 6%</Text>
              <Text x={248} size={34} color="#fff">+2%</Text>
              <Text x={248} y={100} size={30} color={C.red} >{f >= df ? 'dealer keeps part' : ''}</Text>
            </G2>
            <G2 x={1460} y={620} s={P(A('c5c') + 6) * bump(mk)} o={lit(mk)} r={-4}><Stamp text="DEALER MARKUP" size={48} color={C.red} /></G2>
            <G2 x={1460} y={790} s={P(A('c5c') + 8)} o={lit(lg)}><Text size={38} color="#5B6470">(usually legal)</Text></G2>
            <SourceTag f={f} at={mk} text="CFPB: dealer 'discretionary markup' over the lender's buy rate" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: t36, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= t36} />
            <Panel x={780} y={330} w={460} title="AT 6% (bank)" value="$645/mo" color={C.blue} s={P(A('c5d'))} size={72} />
            <Panel x={1300} y={330} w={460} title="AT 8% (marked up)" value="$688/mo" color={C.red} s={P(A('c5d') + 4) * bump(tp)} size={72} />
            <G2 x={1040} y={640} s={P(A('c5d') + 6) * bump(t36)}>
              <Box w={900} h={220} fill={f >= t36 ? C.yellow : '#fff'} />
              <Text y={-60} size={34} color="#5B6470">extra over 7 years</Text>
              <Text y={30} size={110} color={f >= t36 ? C.red : C.gray}>{v(t36, '$ ?', '+$3,600')}</Text>
            </G2>
            <Raccoon f={f} x={1740} y={840} s={0.8 * P(A('c5d') + 8)} mood="greedy" holdCoin={f >= t36} />
            <SourceTag f={f} at={t36} text="$44,000 over 84 months: 6% ≈ $645/mo, 8% ≈ $688/mo" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={720} y={150} s={P(A('c5e')) * bump(ao)}><Text size={56}>THE ADD-ONS</Text></G2>
            {['Extended warranty', 'Paint protection', 'Tire & wheel plan'].map((l, i) => (
              <G2 key={l} x={720} y={300 + i * 150} s={P(A('c5e') + 3 + i * 3) * bump(items[i], 0.08)} o={lit(items[i])}>
                <Box w={880} h={120} fill={f >= items[i] ? '#FFF6D8' : '#fff'} />
                <Text x={-400} size={46} anchor="start">{l}</Text>
                <Text x={400} size={40} anchor="end" color={C.red}>+$/mo</Text>
              </G2>
            ))}
            <G2 x={720} y={760} s={P(A('c5e') + 12)} o={lit(fw)}><Text size={40} color="#5B6470">"only a few dollars more a month!"</Text></G2>
            <Fin f={f} x={1620} y={880} s={1.05} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.8}, {at: au, pose: 'celebrate', expr: 'money', look: -0.8}]} />
            <Panel x={1560} y={330} w={560} h={240} title="F&I PROFIT PER CAR" value={v(t25, '$ ?', '~$2,500')} color={f >= t25 ? C.green : C.gray} s={P(A('c5e') + 6) * bump(t25)} size={88} />
            <SourceTag f={f} at={t25} text="Haig Partners, Q3 2025: $2,534 F&I gross profit per vehicle (public dealer groups)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={1650} y={880} s={1.1} keys={[{at: 0, pose: 'point_l', expr: 'happy', look: -0.8}, {at: rod, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <Fin f={f} x={300} y={880} s={1.1 * P(A('c5g'))} keys={[{at: 0, pose: 'hold', expr: 'smug', look: 0.8}]} />
            <FishingRod f={f} x={470} y={430} s={1.2 * P(A('c5g'))} bait={<Suv s={0.6} tag="$$$" />} />
            <G2 x={1200} y={200} s={P(A('c5g') + 4) * bump(bt)} o={lit(bt)}><Text size={60} color={C.blue}>the CAR = bait</Text></G2>
            <G2 x={1200} y={330} s={P(A('c5g') + 6) * bump(rod)} o={lit(rod)}><Text size={60} color={C.red}>the LOAN = fishing rod</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Underwater ============
  {
    const lot = w('c6a', 'lot');
    const vl = w('c6a', 'value');
    const fast = w('c6b', 'fast');
    const tw = w('c6b', 'twenty');
    const sl = w('c6c', 'slowly');
    const om = w('c6c', 'owes');
    const uw = w('c6c', 'underwater');
    const ne = w('c6c', 'negative');
    const trap = w('c6d', 'trap');
    const wn = w('c6d', 'wants');
    const roll = w('c6d', 'roll');
    const still = w('c6e', 'still');
    const bp = w('c6e', 'backpack');
    const every = w('c6e', 'every');
    const three = w('c6f', 'three');
    const six = w('c6f', 'six');
    const nine = w('c6f', 'nine');
    q(lot, 'whoosh', 0.5);
    q(vl, 'pop', 0.5);
    q(fast, 'whoosh_s', 0.5);
    q(tw, 'thud', 0.7);
    q(sl, 'tick', 0.5);
    q(om, 'pop', 0.5);
    q(uw, 'sputter', 0.6);
    q(ne, 'stamp', 0.6);
    q(trap, 'sting', 0.5);
    q(roll, 'boing', 0.6);
    q(still, 'thud', 0.5);
    q(bp, 'pop', 0.5);
    q(every, 'thud', 0.6);
    q(three, 'ding', 0.5);
    q(six, 'thud', 0.6);
    q(nine, 'cash', 0.6);
    const cx = (k: number) => 420 + k * 1000;
    const loanY = (k: number) => 300 + k * k * 400;
    const valY = (k: number) => 300 + (1 - Math.pow(1 - k, 2.2)) * 420;
    const path = (fn: (k: number) => number) => Array.from({length: 21}).map((_, i) => `${i ? 'L' : 'M'} ${cx(i / 20)} ${fn(i / 20)}`).join(' ');
    const gap = `${Array.from({length: 21}).map((_, i) => `${i ? 'L' : 'M'} ${cx(i / 20)} ${loanY(i / 20)}`).join(' ')} ${Array.from({length: 21}).map((_, i) => `L ${cx(1 - i / 20)} ${valY(1 - i / 20)}`).join(' ')} Z`;
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dealership f={f} x={380} y={822} s={0.7} />
            <Suv x={lin(f, A('c6a'), lot + 30, 760, 1250)} y={790} s={1.05} tag="NEW!" />
            <Sticker x={1480} y={300} s={P(A('c6a') + 4) * bump(tw)} title="CAR'S VALUE" value={v(tw, '$44,000', '$35,200')} color={f >= tw ? C.red : C.green} sub={f >= tw ? '-20% in year one' : 'day one'} />
            <Dave f={f} x={1760} y={822} s={0.9} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.8}, {at: tw, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <Arr x1={1480} y1={480} x2={1480} y2={600} t={ease(f, fast, fast + 12, 0.3, 1)} />
            <SourceTag f={f} at={tw} text="Kelley Blue Book: many new cars lose ~20% in year one" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 s={P(A('c6c'))}>
              <line x1={400} y1={760} x2={1440} y2={760} stroke={C.ink} strokeWidth={5} />
              <line x1={400} y1={240} x2={400} y2={760} stroke={C.ink} strokeWidth={5} />
              <path d={gap} fill={C.blue} opacity={f >= uw ? 0.35 : 0.08} />
              <path d={path(loanY)} fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" />
              <path d={path(valY)} fill="none" stroke={C.blue} strokeWidth={12} strokeLinecap="round" />
              <Text x={1560} y={700} size={34} color={C.red}>what Dave owes</Text>
              <Text x={1580} y={760 - 40 + 60} size={34} color={C.blue}>car's value</Text>
              <Text x={900} y={800} size={30} color="#5B6470">years →</Text>
            </G2>
            <G2 x={830} y={480} s={P(A('c6c') + 6) * bump(uw)} o={lit(om)}><Text size={56} color={C.navy}>UNDERWATER</Text></G2>
            <G2 x={1560} y={260} s={P(A('c6c') + 8) * bump(ne)} o={lit(ne)} r={-5}><Stamp text="NEGATIVE EQUITY" size={38} color={C.red} /></G2>
            <G2 x={640} y={180} s={P(A('c6c') + 4)} o={lit(sl)}><Text size={36} color={C.red}>long loan shrinks slowly</Text></G2>
            <Dave f={f} x={200} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: uw, pose: 'panic', expr: 'shock', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <OldCar f={f} x={260} y={790} s={1 * P(A('c6d'))} />
            <G2 x={260} y={620} s={P(A('c6d') + 2)}><Text size={36} color={C.red}>old loan: -$6,884</Text></G2>
            <Dave f={f} x={620} y={822} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: wn, pose: 'point_r', expr: 'happy', look: 0.8}, {at: roll, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <Suv x={1080} y={790} s={1 * P(A('c6d') + 4)} tag="NEW LOAN" />
            <Sal f={f} x={1560} y={822} s={1.05} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.8}]} />
            <G2 x={1460} y={330} s={P(A('c6d') + 6)} o={lit(roll)}><Bubble text={"No problem! We'll roll\nyour old debt in."} size={38} tail="right" /></G2>
            <Arr x1={360} y1={560} x2={960} y2={560} t={ease(f, roll, roll + 16)} />
            <G2 x={660} y={180} s={P(A('c6d') + 2) * bump(trap)} o={lit(trap)}><Stamp text="THE TRAP" size={50} color={C.red} r={-4} /></G2>
            <SourceTag f={f} at={roll} text="Edmunds Q2 2026: avg negative equity $6,884" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1, 2].map((i) => (
              <G2 key={i} x={380 + i * 580} y={560} s={P(A('c6e') + i * 3)} o={i === 0 || f >= (i === 1 ? bp : every) ? 1 : 0.35}>
                <Box w={520} h={620} />
                <Text y={-260} size={40} color="#5B6470">{`DEAL #${i + 1}`}</Text>
                <Suv s={0.7} y={-100} />
                <Stick f={f} x={-70} y={230} s={0.8} acc={['hair']} seed={7} keys={[{at: 0, pose: 'carry', expr: i === 2 ? 'tired' : i ? 'worried' : 'happy', look: 0.8}]} />
                <Backpack x={100} y={160} s={0.5 + i * 0.25} label="OLD DEBT" />
              </G2>
            ))}
            <G2 x={960} y={130} s={P(A('c6e') + 4)} o={lit(still)}><Text size={48}>still paying for the old car</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={200} s={P(A('c6f'))}><Text size={40} color="#5B6470">trade-ins toward new cars</Text></G2>
            {Array.from({length: 10}).map((_, i) => (
              <Car key={i} x={200 + (i % 5) * 160} y={360 + Math.floor(i / 5) * 160} s={0.5 * P(A('c6f') + 2 + i)} o={1} />
            ))}
            {Array.from({length: 10}).map((_, i) => (i < 3 ? <rect key={i} x={120 + (i % 5) * 160} y={340} width={160} height={60} fill={C.blue} opacity={f >= three ? 0.5 : 0} /> : null))}
            <G2 x={520} y={680} s={P(A('c6f') + 4) * bump(three)}><Text size={72} color={f >= three ? C.red : C.gray}>{v(three, '?', '~3 in 10 underwater')}</Text></G2>
            <Panel x={1480} y={330} w={620} h={220} title="AVG NEGATIVE EQUITY" value={v(six, '$ ?', '$6,884')} color={f >= six ? C.red : C.gray} s={P(A('c6f') + 6) * bump(six)} size={90} />
            <Panel x={1480} y={620} w={620} h={220} title="THEIR AVG PAYMENT" value={v(nine, '$ ?', '$944/mo')} color={f >= nine ? C.red : C.gray} s={P(A('c6f') + 8) * bump(nine)} size={90} />
            <SourceTag f={f} at={three} text="Edmunds, Q2 2026: 29.6% of trade-ins underwater" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Cracks ============
  {
    const kp = w('c7a', 'keep');
    const one = w('c7b', 'one');
    const fed = w('c7b', 'fed');
    const sub = w('c7c', 'subprime');
    const six = w('c7c', 'six');
    const hi = w('c7d', 'highest');
    const ny = w('c7d', 'nineteen');
    const cr = w('c7d', 'crisis');
    const es = w('c7e', 'eased');
    const tk = w('c7e', 'taken');
    const rp = w('c7e', 'repossessed');
    const wk = w('c7f', 'work');
    const hr = w('c7f', 'hurts');
    q(kp, 'thud', 0.5);
    q(one, 'cash', 0.7);
    q(fed, 'paper', 0.5);
    q(sub, 'pop', 0.5);
    q(six, 'thud', 0.8);
    q(hi, 'stamp', 0.7);
    q(ny, 'flip', 0.5);
    q(cr, 'sting', 0.5);
    q(es, 'pop', 0.5);
    q(tk, 'clank', 0.6);
    q(rp, 'sputter', 0.7);
    q(wk, 'ding', 0.5);
    q(hr, 'heart', 0.5);
    const bh = (val: number, at: number, base = 1.5) => ease(f, at - 4, at + 14, base * 70, val * 70);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1, 2].map((i) => (
              <Stick key={i} f={f} x={200 + i * 210} y={880} s={1} acc={i === 1 ? ['hair'] : i ? ['bun', 'glasses'] : ['cap']} seed={i === 1 ? 7 : i ? 13 : 21} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: kp, pose: 'panic', expr: 'shock', look: 0.8}]} sweat={f >= kp} />
            ))}
            <G2 x={410} y={330} s={P(A('c7a') + 4)} o={lit(kp)}><Bubble text="Can't keep up!" size={42} tail="down" /></G2>
            <G2 x={1260} y={760} s={P(A('c7a'))}>
              {[0, 1, 2].map((c) => <MoneyStack key={c} x={-180 + c * 180} n={8 + c * 2} s={1.1} />)}
            </G2>
            <Panel x={1260} y={250} w={760} h={240} title="AMERICANS OWE IN CAR LOANS" value={v(one, '$ ?', '$1.7 TRILLION')} color={f >= one ? C.red : C.gray} s={P(A('c7a') + 4) * bump(one)} size={90} />
            <SourceTag f={f} at={one} text="New York Fed, Household Debt & Credit, Q2 2026: $1.713T" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={140} s={P(A('c7c'))}><Text size={40}>subprime car loans 60+ days late</Text></G2>
            <line x1={300} y1={780} x2={1240} y2={780} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[{x: 520, val: 2.58, lab: 'May 2021', at: A('c7c') + 4, c: C.gray}, {x: 1000, val: 6.9, lab: 'Jan 2026', at: six, c: C.red}].map((b) => {
              const h = bh(b.val, b.at);
              return (
                <G2 key={b.lab} x={b.x} y={780} s={P(A('c7c') + 2)}>
                  <rect x={-130} y={-h} width={260} height={h} rx={12} fill={b.c} stroke={C.ink} strokeWidth={6} />
                  <Text y={-h - 44} size={54} color={b.c === C.red && f >= b.at ? C.red : C.ink}>{f >= b.at ? `${b.val.toFixed(b.val < 3 ? 2 : 1)}%` : '?'}</Text>
                  <Text y={40} size={34} color="#5B6470">{b.lab}</Text>
                </G2>
              );
            })}
            <G2 x={1580} y={340} s={P(A('c7c') + 6) * bump(hi)} o={lit(hi)} r={-5}><Stamp text="HIGHEST ON RECORD" size={40} color={C.red} /></G2>
            <Calendar x={1580} y={560} s={0.7 * P(A('c7c') + 8) * bump(ny)} top="SINCE" year={1994} flip={0} />
            <G2 x={1580} y={760} s={P(A('c7c') + 8)} o={lit(cr)}><Text size={36}>higher than 2008-09</Text></G2>
            <SourceTag f={f} at={six} text="Fitch Ratings, subprime auto ABS 60+ day delinquency index" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <House x={380} y={822} s={0.8 * P(A('c7e'))} />
            <G2 x={lin(f, rp, rp + 60, 0, 700)}>
              <Suv x={880} y={790} s={0.9} r={f >= tk ? -8 : 0} />
              <TowTruck x={1340} y={790} s={1} lift={f >= tk ? 1 : 0} />
            </G2>
            <Dave f={f} x={160} y={822} s={0.9} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: rp, pose: 'panic', expr: 'shock', look: 0.8}]} />
            <Panel x={1450} y={230} w={560} h={200} title="JULY 2026 (eased a bit)" value={v(es, '?', '6.13%')} color={f >= es ? C.red : C.gray} s={P(A('c7e') + 4) * bump(es)} size={80} />
            <G2 x={780} y={250} s={P(A('c7e') + 6) * bump(rp)} o={lit(rp)} r={-5}><Stamp text="REPOSSESSED" size={52} color={C.red} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Factory x={1500} y={822} s={1.1 * P(A('c7f'))} label="WORK" />
            <BlueCar x={900} y={790} s={1.1 * P(A('c7f') + 4)} />
            <Dave f={f} x={420} y={822} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'neutral', look: 0.8}, {at: hr, pose: 'hold', expr: 'sad', look: 0.8}]} />
            <Arr x1={1080} y1={640} x2={1320} y2={600} t={ease(f, A('c7f') + 4, wk + 10, 0.3, 1)} color={C.green} />
            <G2 x={900} y={250} s={P(A('c7f') + 4) * bump(wk)}><Box w={900} h={130} fill={f >= wk ? C.yellow : '#fff'} /><Text size={48}>a car = how you get to work</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    const ed = w('c8a', 'education');
    const pa = w('c8b', 'preapproved');
    const bt = w('c8b', 'beat');
    const otd = w('c8c', 'door');
    const r20 = w('c8d', 'twenty', 1);
    const r4 = w('c8d', 'four', 1);
    const r10 = w('c8d', 'ten', 1);
    const no = w('c8e', 'no');
    const used = w('c8f', 'used');
    const drop = w('c8f', 'drop');
    const pre = w('c8g', 'preapproval');
    const fy = w('c8g', 'five');
    const stp = w('c8g', 'stops');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ed, 'paper', 0.5);
    q(pa, 'stamp', 0.6);
    q(bt, 'pop', 0.5);
    q(otd, 'ding', 0.5);
    q(r20, 'pop', 0.5);
    q(r4, 'pop', 0.5);
    q(r10, 'pop', 0.5);
    q(no, 'buzz', 0.5);
    q(used, 'pop', 0.5);
    q(drop, 'coin', 0.5);
    q(pre, 'paper', 0.6);
    q(fy, 'ding', 0.5);
    q(stp, 'trombone', 0.5);
    const items = ['Get pre-approved first', 'Negotiate the TOTAL price', 'The 20 / 4 / 10 rule', 'Skip add-ons you don’t need', 'Consider a good used car'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () =>
      f < A('c8g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={110} s={P(A('c8a'))}><Text size={56}>How Dave buys smart</Text></G2>
            <G2 x={620} y={170} s={P(A('c8a') + 2)} o={lit(ed)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {items.map((it, i) => (
              <G2 key={i} x={100} y={290 + i * 128} s={0.85 * P(A('c8a') + 4 + i * 2) * (cur === i + 1 ? bump(hs[i], 0.06) : 1)} o={cur === i + 1 ? 1 : cur > i + 1 ? 0.75 : 0.4}>
                <rect x={-10} y={-56} width={1180} height={112} rx={24} fill={cur === i + 1 ? '#FFF6D8' : '#fff'} stroke={C.ink} strokeWidth={6} />
                <circle cx={60} r={42} fill={cur >= i + 1 ? C.green : '#CFC6B4'} stroke={C.ink} strokeWidth={6} />
                <Text x={60} y={3} size={50} color="#fff">{i + 1}</Text>
                <Text x={130} y={2} size={50} anchor="start">{it}</Text>
              </G2>
            ))}
            {cur === 0 && (
              <g>
                <Dave f={f} x={1500} y={880} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.8}]} />
                <Sal f={f} x={1780} y={880} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: -0.8}]} />
              </g>
            )}
            {cur === 1 && (
              <g>
                <Bank x={1560} y={520} s={0.5} label="CREDIT UNION" />
                <Envelope x={1560} y={680} s={1.6 * bump(pa)} label="PRE-APPROVED 6%" />
                <G2 x={1560} y={830} o={lit(bt)}><Text size={40} color={C.green}>dealer must beat it</Text></G2>
              </g>
            )}
            {cur === 2 && (
              <g>
                <G2 x={1560} y={380}><Text size={40} color="#5B6470">"What payment do you want?"</Text></G2>
                <Sticker x={1560} y={600} s={0.9 * bump(otd)} title="OUT-THE-DOOR PRICE" value={v(otd, '$ ?', 'TOTAL $')} color={f >= otd ? C.green : C.gray} />
              </g>
            )}
            {cur === 3 && (
              <g>
                {[['20%', 'down', r20], ['4 yrs', 'max loan', r4], ['10%', 'of income', r10]].map(([a, b, at], i) => (
                  <G2 key={i} x={1560} y={330 + i * 200} s={bump(at as number)} o={lit(at as number)}>
                    <Box w={520} h={170} fill={f >= (at as number) ? '#DFF5E8' : '#fff'} />
                    <Text x={-110} size={80} color={C.green}>{a as string}</Text>
                    <Text x={140} size={40}>{b as string}</Text>
                  </G2>
                ))}
              </g>
            )}
            {cur === 4 && (
              <g>
                <G2 x={1560} y={560}>
                  <Box w={560} h={420} />
                  {['Paint protection', 'Tire & wheel plan', 'Extended warranty'].map((l, i) => <Text key={l} y={-120 + i * 110} size={40}>{l}</Text>)}
                  <XMark s={0.45 * bump(no, 0.2)} o={lit(no)} />
                </G2>
              </g>
            )}
            {cur === 5 && (
              <g>
                <BlueCar x={1560} y={600} s={1.5 * bump(used, 0.1)} />
                <G2 x={1560} y={360}><Stamp text="USED ✓" size={56} color={C.green} r={-4} /></G2>
                <G2 x={1560} y={800} o={lit(drop)}><Text size={38}>biggest drop: already paid</Text></G2>
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dealership f={f} x={1180} y={822} s={1} />
            <Dave f={f} x={560} y={822} s={1.15 * P(A('c8g'))} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.8}]} />
            <Envelope x={720} y={560} s={1.4 * P(A('c8g') + 2) * bump(pre)} label="PRE-APPROVED" />
            <Sal f={f} x={1500} y={822} s={1.1} keys={[{at: 0, pose: 'present', expr: 'grin', look: -0.8}, {at: stp, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
            <Contract x={1040} y={380} s={0.55 * P(A('c8g') + 4) * bump(fy)} lines={['Same car', 'Term: 60 mo', 'Rate: bank 6%', 'Add-ons: none']} signed={ease(f, fy, fy + 20)} />
            <G2 x={260} y={300} s={P(A('c8g') + 6)} o={lit(stp)}><Text size={44} color={C.red}>salesman: :(</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ RECAP + TEASER ============
  const recap = ['Avg new car: $50,000+ (chips, SUVs, tariffs)', 'Long loans: smaller payment, bigger bill', 'Cars drop fast. Underwater = trap'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const pk = w('d1e', 'pickups');
    const ft = w('d1e', 'forty');
    const gr = w('d1f', 'great');
    const st = w('d1f', 'struggling');
    const kk = w('d1f', 'k');
    const nx = w('d1f', 'next');
    const sb = w('d1g', 'subscribe');
    const pp = w('d1g', 'paint');
    const fr = w('d1g', 'free');
    q(pk, 'pop', 0.5);
    q(ft, 'cash', 0.6);
    q(gr, 'ding', 0.5);
    q(st, 'trombone', 0.4);
    q(kk, 'stamp', 0.7);
    q(nx, 'chime', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(pp, 'buzz', 0.4);
    q(fr, 'coin', 0.5);
    const cur = r.filter((x) => f >= x).length;
    scene(A('d1a'), () =>
      f < A('d1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={P(A('d1a') + 2)}><Text size={100}>RECAP</Text></G2>
            {recap.map((b, i) => (
              <G2 key={i} x={200} y={360 + i * 170} s={P(A('d1a') + 4 + i * 2) * (cur === i + 1 ? bump(r[i], 0.05) : 1)} o={cur >= i + 1 ? 1 : 0.4}>
                <rect x={-10} y={-60} width={1500} height={120} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <circle cx={60} r={44} fill={cur >= i + 1 ? C.red : '#CFC6B4'} stroke={C.ink} strokeWidth={6} />
                <Text x={60} y={3} size={52} color="#fff">{i + 1}</Text>
                <Text x={134} y={2} size={52} anchor="start">{b}</Text>
              </G2>
            ))}
            <Dave f={f} x={1800} y={960} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('d1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={140} s={P(A('d1e'))}><Text size={44} color={C.red}>falling behind</Text></G2>
            <G2 x={1440} y={140} s={P(A('d1e') + 2)}><Text size={44} color={C.green}>buying pricey pickups</Text></G2>
            <line x1={960} y1={180} x2={960} y2={860} stroke={C.ink} strokeWidth={5} strokeDasharray="20 16" />
            <Dave f={f} x={330} y={860} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}]} sweat />
            <OldCar f={f} x={650} y={800} s={0.9} />
            <G2 x={480} y={380} s={P(A('d1e') + 4)}><Bubble text="Payment due... again" size={36} tail="down" /></G2>
            <Pickup x={1520} y={790} s={1 * bump(pk, 0.08)} tag="NEW" />
            <Stick f={f} x={1150} y={860} s={0.95} acc={['tophat', 'monocle', 'tie']} seed={31} keys={[{at: 0, pose: 'celebrate', expr: 'smug', look: 0.8}]} />
            <Panel x={1440} y={330} w={680} h={230} title="$150K+ HOUSEHOLDS BUY" value={v(ft, '? of new cars', '43% of new cars')} color={f >= ft ? C.green : C.gray} s={P(A('d1e') + 6) * bump(ft)} size={64} />
            <SourceTag f={f} at={ft} text="Cox Automotive: $150K+ households = 43% of new-car buyers" />
          </Svg>
        </AbsoluteFill>
      ) : f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={900} y={520} s={P(A('d1f')) * bump(kk, 0.1)}>
              <line x1={-200} y1={-300} x2={-200} y2={300} stroke={C.ink} strokeWidth={30} strokeLinecap="round" />
              <line x1={-190} y1={0} x2={200} y2={-300} stroke={C.green} strokeWidth={30} strokeLinecap="round" opacity={lit(gr)} />
              <line x1={-190} y1={0} x2={200} y2={300} stroke={C.red} strokeWidth={30} strokeLinecap="round" opacity={lit(st)} />
              <Text x={330} y={-300} size={40} color={C.green}>doing great</Text>
              <Text x={330} y={300} size={40} color={C.red}>struggling</Text>
            </G2>
            <G2 x={1500} y={520} s={P(A('d1f') + 4) * bump(nx)} o={lit(nx)}>
              <Box w={560} h={200} fill={C.yellow} />
              <Text y={-40} size={36}>NEXT VIDEO</Text>
              <Text y={30} size={50}>The K-Shaped Economy</Text>
            </G2>
            <Dave f={f} x={300} y={880} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={400} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={400} s={pop(f, sb - 6)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Raccoon f={f} x={1450} y={800} s={0.9 * pop(f, sb - 6)} mood={f >= pp ? 'sneaky' : 'happy'} />
            <G2 x={1450} y={580} s={pop(f, sb - 4)} o={lit(pp)}><Bubble text="Paint protection?" size={36} tail="down" /></G2>
            <G2 x={960} y={620} s={pop(f, sb - 4)} o={lit(fr)}><Text size={46} color={C.green}>free · no monthly payment</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4f', 'loan') + 15;
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
