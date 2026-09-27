import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bubble, Calendar, SourceTag, Sparkle, Stamp, Text, XMark} from '../props';
import {CreditCard, Frame, Phone, Row, SubButton, Bell} from '../props2';
import {PriceTag, Raccoon, Shop} from '../props3';
import {Scale} from '../props8';
import {Couch, Jar} from '../props19';
import {Brain} from '../props17';
import {AppTile} from '../props26';
import {Hourglass} from '../props30';
import {CheckBox, Countdown, Hundred38, Notif, Package, Register, Slide, WishList} from '../props38';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Nerd: React.FC<SP & {i?: number}> = ({i = 0, ...p}) => <Stick acc={i % 2 ? ['glasses'] : ['glasses', 'cap']} seed={70 + i} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const Panel: React.FC<{x: number; y: number; w: number; h?: number; title: string; value: string; color?: string; s?: number; o?: number; size?: number; fill?: string}> = ({x, y, w, h = 200, title, value, color = C.ink, s = 1, o = 1, size = 80, fill}) => (
  <G2 x={x} y={y} s={s} o={o}>
    <Box w={w} h={h} fill={fill} />
    <Text y={-h / 2 + 40} size={30} color={GRAY} ls={2}>{title}</Text>
    <Text y={24} size={size} color={color}>{value}</Text>
  </G2>
);

const Check: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M -30 0 l 22 22 l 44 -48" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
);

const VBar: React.FC<{x: number; base: number; h: number; w?: number; color: string; label: string; value: string; s?: number}> = ({x, base, h, w = 220, color, label, value, s = 1}) => (
  <G2 x={x} y={base} s={s}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={14} fill={color} stroke={C.ink} strokeWidth={6} />
    <Text y={-h - 40} size={52}>{value}</Text>
    <Text y={50} size={36}>{label}</Text>
  </G2>
);

const Btn: React.FC<{x: number; y: number; w: number; label: string; color?: string; s?: number; o?: number; size?: number}> = ({x, y, w, label, color = C.blue, s = 1, o = 1, size = 40}) => (
  <G2 x={x} y={y} s={s} o={o}>
    <rect x={-w / 2} y={-45} width={w} height={90} rx={45} fill={color} stroke={C.ink} strokeWidth={5} />
    <Text y={3} size={size} color="#fff">{label}</Text>
  </G2>
);

export const Ep38: React.FC = () => {
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
  const P = (id: string, d = 0) => pop(f, A(id) + 2 + d);
  const lit = (at: number) => (f >= at ? 1 : 0.35);
  const bump = (at: number, k = 0.16) => (f < at ? 1 : 1 + k * Math.sin(Math.min(1, (f - at) / 14) * Math.PI));
  const V = (at: number, v: string) => (f >= at ? v : '?');

  // ============ COLD OPEN ============
  {
    const mo = w('o1', 'monday');
    const pr = w('o1', 'promise');
    const tw = w('o1', 'two');
    const rl = w('o1', 'real');
    q(mo, 'flip', 0.5);
    q(pr, 'pop', 0.6);
    q(tw, 'coin', 0.6);
    q(rl, 'stamp', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Calendar x={200} y={200} s={0.5 * pop(f, 2) * bump(mo)} top="MONDAY" year="AM" flip={0} />
          <Dave f={f} x={520} y={880} s={1.2 * pop(f, 3)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: pr, pose: 'point_up', expr: 'grin', look: 0.8}]} />
          <Jar x={1100} y={700} s={1.2 * pop(f, 4)} level={0.05} label="SAVINGS" />
          <G2 x={1480} y={330} s={pop(f, 5) * bump(tw)}><Bubble text={f >= tw ? 'Save $200\nthis month!' : 'This month...'} size={50} tail="left" /></G2>
          <Stamp x={1500} y={620} s={pop(f, rl, 9, 260)} text="FOR REAL" size={64} color={C.green} r={-8} />
          <G2 x={1500} y={620} s={pop(f, 6)} o={f >= rl ? 0 : 0.35}><Text size={48} color={GRAY}>for real?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nt = w('o2', 'night');
    const bz = w('o2', 'buzzes');
    const fl = w('o2', 'flash');
    const fy = w('o2', 'forty');
    const tw = w('o2', 'two');
    q(nt, 'pop', 0.4);
    q(bz, 'buzz', 0.8);
    q(fl, 'ding', 0.6);
    q(fy, 'cash', 0.6);
    q(tw, 'tick', 0.6);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <rect x={0} y={0} width={1920} height={1080} fill="#1F2A44" opacity={0.35} />
          <Couch x={520} y={880} s={1.1 * P('o2')} color="#8FB8DE" />
          <Dave f={f} x={520} y={800} s={1} keys={[{at: 0, pose: 'relax', expr: 'tired', look: 0.8}, {at: bz, pose: 'hold', expr: 'shock', look: 0.8}]} />
          <G2 x={1200} y={520} s={1.2 * P('o2', 2) * bump(bz, 0.12)} r={f >= bz && f < bz + 16 ? Math.sin(f * 2) * 4 : 0}>
            <Phone title="SHOP" value={V(fy, '-40%')} color={C.red} />
          </G2>
          <Notif x={1300} y={180} s={P('o2', 3) * bump(fl)} o={lit(fl)} title="FLASH SALE!" body="40% off everything" hl={f >= fl ? 1 : 0} />
          <Countdown x={1640} y={820} s={0.9 * P('o2', 4) * bump(tw)} time={f >= tw ? `01:${String(59 - (Math.floor((f - tw) / 30) % 60)).padStart(2, '0')}:00` : '--:--'} hl={f >= tw ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('o3', 'one');
    const sv = w('o3', 'saved');
    const bt = w('o3', 'bought');
    const fr = w('o3', 'friday');
    const th = w('o3', 'three');
    const zr = w('o3', 'zero');
    q(on, 'click', 0.8);
    q(sv, 'key', 0.5);
    q(bt, 'cash', 0.7);
    q(fr, 'flip', 0.5);
    q(th, 'thud', 0.6);
    q(zr, 'trombone', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Phone x={420} y={520} s={1.1 * P('o3') * bump(on, 0.1)} title="CHECKOUT" value={f >= bt ? 'BOUGHT!' : 'BUY NOW'} color={f >= bt ? C.green : C.blue} />
          <CreditCard x={420} y={880} s={0.8 * P('o3', 2) * bump(sv)} label="SAVED" />
          <Calendar x={960} y={200} s={0.45 * P('o3', 3) * bump(fr)} top="BY" year="FRIDAY" flip={0} />
          {[0, 1, 2].map((i) => <Package key={i} x={820 + i * 240} y={820 - (i === 1 ? 60 : 0)} s={0.9 * P('o3', 4 + i) * bump(th)} label={f >= th ? `#${i + 1}` : ''} />)}
          <Jar x={1600} y={700} s={1.1 * P('o3', 5)} level={0} label="SAVINGS" />
          <G2 x={1600} y={380} s={P('o3', 6) * bump(zr)}><Text size={80} color={f >= zr ? C.red : GRAY}>{V(zr, '$0')}</Text></G2>
          <Dave f={f} x={1180} y={560} s={0.6} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: zr, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fm = w('o4', 'familiar');
    const ac = w('o4', 'accident');
    const ds = w('o4', 'designed');
    const sp = w('o4', 'spend');
    q(fm, 'pop', 0.5);
    q(ac, 'buzz', 0.5);
    q(ds, 'stamp', 0.7);
    q(sp, 'cash', 0.6);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={540} s={1.4 * P('o4') * bump(ds, 0.06)}><Phone title="YOUR PHONE" value={f >= sp ? 'SPEND' : '...'} color={C.red} /></G2>
          <Stamp x={1400} y={300} s={pop(f, ds, 9, 260)} text="DESIGNED" size={72} color={C.red} r={-8} />
          <G2 x={1400} y={300} s={P('o4', 2)} o={f >= ds ? 0 : 1}><Text size={52} color={GRAY}>{f >= ac ? 'not an accident' : 'sound familiar?'}</Text></G2>
          <Dave f={f} x={380} y={880} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}, {at: ds, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={1500} y={760} s={P('o4', 3)} o={lit(fm)}><Text size={44}>sound familiar?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tm = w('o5', 'teams');
    const pd = w('o5', 'paid');
    const rm = w('o5', 'remove');
    const tk = w('o5', 'think');
    q(tm, 'crowd', 0.4);
    q(pd, 'cash', 0.6);
    q(rm, 'poof', 0.6);
    q(tk, 'ding', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          {[0, 1, 2, 3].map((i) => <Nerd key={i} i={i} f={f} x={220 + i * 220} y={880} s={0.95 * P('o5', i * 2) * bump(tm)} keys={[{at: 0, pose: 'typing', expr: 'think'}, {at: pd, pose: 'typing', expr: 'smug'}]} />)}
          <G2 x={550} y={330} s={P('o5', 3) * bump(pd)} o={lit(pd)}><Box w={620} h={100} fill={C.yellow} /><Text size={44}>paid to remove friction</Text></G2>
          <G2 x={1420} y={420} s={P('o5', 4)}>
            <Frame w={640} h={520} label="the moment you STOP & THINK">
              <Brain s={0.9} y={-40} glow={f >= tk ? 1 : 0.3} />
              <Text y={120} size={60}>?</Text>
            </Frame>
          </G2>
          <XMark x={1420} y={380} s={0.9 * pop(f, rm)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const words = ['one', 'pay', 'ads', 'tricks', 'brain', 'saves'];
    const pv = words.map((x) => w('o6', x));
    pv.forEach((x) => q(x, 'stamp', 0.45));
    const labels = ['ONE-TAP STORE', 'PAY LATER', 'ADS', 'TRICKS', 'YOUR BRAIN', 'DAVE SAVES'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={110} size={60} color={GRAY}>TODAY</Text>
          {labels.map((l, i) => (
            <Frame key={l} x={380 + (i % 3) * 580} y={i < 3 ? 380 : 790} s={0.9 * P('o6', i * 2) * bump(pv[i])} o={lit(pv[i])} w={520} h={360} label={l}>
              {i === 0 && <Btn x={0} y={-30} w={300} label="1-TAP BUY" />}
              {i === 1 && <Btn x={0} y={-30} w={320} label="PAY IN 4" color="#E36397" />}
              {i === 2 && <Notif y={-30} s={0.7} title="Just for you!" body="you'll love this" />}
              {i === 3 && <Countdown y={-30} s={0.6} time="00:59" hl={1} />}
              {i === 4 && <Brain s={0.6} y={-20} />}
              {i === 5 && <Jar s={0.4} y={0} level={0.7} label="SAVED" />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Not alone ============
  {
    const bc = w('c1a', 'company');
    const fr = w('c1b', 'reserve');
    const fh = w('c1b', 'four');
    const cs = w('c1b', 'cash');
    const sx = w('c1c', 'sixty');
    const ot = w('c1c', 'three');
    const br = w('c1c', 'borrow');
    const cp = w('c1c', 'couldnt');
    const ff = w('c1d', 'fifty');
    const tm = w('c1d', 'three');
    const jl = w('c1e', 'july');
    const th = w('c1e', 'three');
    const sv = w('c1e', 'seventies');
    const tn = w('c1e', 'ten');
    const wp = w('c1f', 'willpower');
    const ch = w('c1f', 'change');
    q(bc, 'crowd', 0.4);
    q(fr, 'paper', 0.5);
    q(fh, 'cash', 0.6);
    q(sx, 'ding', 0.6);
    q(ot, 'thud', 0.6);
    q(br, 'pop', 0.4);
    q(ff, 'ding', 0.6);
    q(jl, 'flip', 0.5);
    q(th, 'thud', 0.7);
    q(sv, 'flip', 0.5);
    q(tn, 'ding', 0.6);
    q(wp, 'boing', 0.5);
    q(ch, 'sting', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c1a') * bump(fr)}><Text size={50}>Fed survey: a surprise $400 bill. Pay with cash?</Text></G2>
            <G2 x={420} y={440} s={P('c1a', 2) * bump(fh)}><Hundred38 v="$400" /></G2>
            <G2 x={420} y={620} s={P('c1a', 3)} o={lit(cs)}><Text size={40}>surprise bill</Text></G2>
            {Array.from({length: 10}).map((_, i) => {
              const yes = i < 6;
              const on = yes ? f >= sx : f >= ot;
              return (
                <G2 key={i} x={880 + (i % 5) * 170} y={i < 5 ? 420 : 700} s={P('c1a', 3 + i)}>
                  <circle r={62} fill={on ? (yes ? C.green : C.red) : '#E3E8EE'} stroke={C.ink} strokeWidth={5} />
                  <Text y={4} size={34} color={on ? '#fff' : GRAY}>{on ? (yes ? 'YES' : 'NO') : '?'}</Text>
                </G2>
              );
            })}
            <Panel x={1220} y={900} w={760} h={150} title="COULD PAY WITH CASH" value={V(sx, '63%')} color={C.green} size={64} s={P('c1a', 6) * bump(sx)} />
            <G2 x={420} y={820} s={P('c1a', 7) * bump(br)} o={lit(ot)}><Text size={36} color={C.red}>{f >= cp ? 'borrow · sell · or can\'t pay' : 'the rest: ?'}</Text></G2>
            <SourceTag f={f} at={sx} text="Federal Reserve SHED, Economic Well-Being of U.S. Households in 2025 (May 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c1d')}><Text size={52}>emergency savings for 3 months of bills</Text></G2>
            <Jar x={640} y={640} s={1.5 * P('c1d', 2) * bump(ff, 0.08)} level={ease(f, ff - 4, ff + 16, 0.1, 0.55)} label="3 MONTHS" />
            <Panel x={1360} y={460} w={620} h={260} title="HAVE IT" value={V(ff, '55%')} color={C.green} size={120} s={P('c1d', 3) * bump(ff)} />
            <Panel x={1360} y={760} w={620} h={200} title="DON'T" value={V(tm, '45%')} color={C.red} size={90} s={P('c1d', 4) * bump(tm)} />
            <SourceTag f={f} at={ff} text="Federal Reserve SHED 2025: 55% have 3 months of emergency savings" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c1e')}><Text size={52}>share of after-tax income Americans save</Text></G2>
            <line x1={500} y1={840} x2={1420} y2={840} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <VBar x={720} base={840} h={ease(f, tn - 4, tn + 16, 120, 480)} color={C.green} label="1970s" value={V(tn, '10%+')} s={P('c1e', 2) * bump(sv, 0.05)} />
            <VBar x={1200} base={840} h={ease(f, th - 4, th + 16, 60, 144)} color={C.red} label="July 2026" value={V(th, '3%')} s={P('c1e', 3) * bump(jl, 0.05)} />
            <Dave f={f} x={1700} y={900} s={0.95} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: tn, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={th} text="BEA, July 2026: personal saving rate 3.0% · 1970s ≈ 10%+ (FRED PSAVERT)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={900} s={P('c1f')} tilt={ease(f, ch - 4, ch + 16, -10, 10)} left="lost willpower?" right="world changed?" />
            <G2 x={660} y={560} s={P('c1f', 2) * bump(wp)}><Brain s={0.6} /></G2>
            <G2 x={1260} y={560} s={P('c1f', 3) * bump(ch)}><Phone s={0.5} title="SHOP" value="BUY" color={C.red} /></G2>
            <Dave f={f} x={240} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ch, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
            <G2 x={960} y={140} s={P('c1f', 4)}><Text size={52}>{f >= ch ? 'something changed around us' : 'what happened?'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 One tap store ============
  {
    const wk = w('c2a', 'walk');
    const fd = w('c2a', 'find');
    const cr = w('c2a', 'carry');
    const wt = w('c2a', 'wait');
    const wl = w('c2b', 'wallet');
    const ca = w('c2b', 'cash');
    const nd = w('c2b', 'need');
    const fc = w('c2c', 'friction');
    const bf = w('c2c', 'friend');
    const nn = w('c2d', 'nineteen');
    const pt = w('c2d', 'patent');
    const oc = w('c2d', 'click');
    const cs = w('c2e', 'card');
    const ad = w('c2e', 'address');
    const fa = w('c2e', 'face');
    const nw = w('c2e', 'wallet');
    const nt = w('c2e', 'think');
    const sl = w('c2f', 'slide');
    const wh = w('c2f', 'wheee');
    const sx = w('c2f', 'sixty');
    q(wk, 'step', 0.5);
    q(fd, 'pop', 0.4);
    q(cr, 'step', 0.4);
    q(wt, 'tick', 0.5);
    q(wl, 'crinkle', 0.6);
    q(nd, 'ding', 0.6);
    q(fc, 'stamp', 0.6);
    q(bf, 'heart', 0.5);
    q(nn, 'flip', 0.5);
    q(pt, 'paper', 0.6);
    q(oc, 'click', 0.8);
    q(cs, 'key', 0.5);
    q(ad, 'key', 0.5);
    q(fa, 'ding', 0.5);
    q(nt, 'buzz', 0.5);
    q(sl, 'whoosh', 0.6);
    q(wh, 'boing', 0.7);
    q(sx, 'cash', 0.8);
    const steps: [string, number][] = [['walk in', wk], ['find it', fd], ['carry it', cr], ['wait in line', wt], ['open wallet', wl], ['"do I need this?"', nd]];
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Shop x={560} y={822} s={0.9 * P('c2a')} name="STORE" />
            <Dave f={f} x={lin(f, wk, wt, 300, 820)} y={822} s={0.95} walk={f >= wk && f < wt} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: wl, pose: 'hold', expr: 'neutral', look: 0.8}, {at: nd, pose: 'think', expr: 'think', look: 0.8}]} />
            {steps.map(([l, at], i) => (
              <G2 key={l} x={1460} y={170 + i * 105} s={P('c2a', 2 + i) * bump(at, 0.1)} o={lit(at)}>
                <Box w={520} h={86} fill={i === 5 && f >= at ? C.yellow : '#fff'} />
                <Text size={36}>{`${i + 1}. ${l}`}</Text>
              </G2>
            ))}
            <G2 x={900} y={420} s={P('c2a', 4)} o={lit(fc)}><Box w={560} h={150} fill={f >= bf ? '#E3F6EC' : '#fff'} /><Text y={-20} size={48}>= FRICTION</Text><Text y={36} size={32} color={C.green}>savings' best friend</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={300} s={P('c2d') * bump(pt, 0.08)}><Box w={640} h={300} fill="#FFF8DC" /><Text y={-80} size={34} color={GRAY}>U.S. PATENT · 1999</Text><Text y={0} size={50}>buying with</Text><Text y={70} size={60} color={C.red}>ONE CLICK</Text></G2>
            <Calendar x={180} y={640} s={0.45 * P('c2d', 2) * bump(nn)} top="PATENT" year={1999} flip={0} />
            <Btn x={560} y={720} w={360} label="BUY NOW" s={P('c2d', 3) * bump(oc, 0.2)} color={f >= oc ? C.green : C.blue} />
            {([['card: saved', cs], ['address: saved', ad], ['face = payment', fa], ['no wallet · no line', nw], ['no second to think', nt]] as const).map(([l, at], i) => (
              <G2 key={l} x={1380} y={220 + i * 130} s={P('c2d', 4 + i) * bump(at, 0.1)} o={lit(at)}>
                <Box w={620} h={100} fill={i === 4 && f >= at ? '#FDE3EA' : '#fff'} />
                <Text size={40}>{l}</Text>
                {f >= at && i < 4 && <Check x={250} y={0} s={0.6} />}
              </G2>
            ))}
            <SourceTag f={f} at={pt} text="Amazon 1-Click patent, US 5,960,411 (1999–2017)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Slide x={760} y={640} s={1.1 * P('c2f')} />
            <Register x={1460} y={780} s={1.2 * P('c2f', 2) * bump(sx)} total={V(sx, '$60')} hl={f >= sx ? 1 : 0} />
            <G2 x={330} y={220} s={P('c2f', 3)}><Box w={320} h={90} /><Text size={40}>FRONT DOOR</Text></G2>
            <Dave f={f} x={lin(f, sl, wh + 20, 380, 1180)} y={lin(f, sl, wh + 20, 340, 700)} s={0.8} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: sl, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: sx, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={1460} y={400} s={P('c2f', 4) * bump(wh)} o={lit(wh)}><Bubble text="Wheee!" size={52} tail="left" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Pay later ============
  {
    const bt = w('c3a', 'button');
    const pf = w('c3b', 'four');
    const ft = w('c3b', 'fifteen');
    const kl = w('c3b', 'klarna');
    const fe = w('c3c', 'fee');
    const sm = w('c3c', 'smaller');
    const bm = w('c3c', 'more');
    const bg = w('c3c', 'bigger');
    const fr = w('c3d', 'federal');
    const sx = w('c3d', 'sixteen');
    const tn = w('c3d', 'ten');
    const ot = w('c3e', 'four');
    const lt = w('c3e', 'late');
    const gr = w('c3e', 'groceries');
    const sw = w('c3f', 'same');
    const rc = w('c3f', 'raccoon');
    q(bt, 'pop', 0.6);
    q(pf, 'ding', 0.5);
    q(ft, 'coin', 0.6);
    q(kl, 'flip', 0.5);
    q(fe, 'cash', 0.6);
    q(sm, 'pop', 0.5);
    q(bg, 'boing', 0.5);
    q(fr, 'paper', 0.5);
    q(sx, 'ding', 0.6);
    q(tn, 'pop', 0.5);
    q(lt, 'thud', 0.6);
    q(gr, 'pop', 0.5);
    q(sw, 'thud', 0.7);
    q(rc, 'pop2', 0.6);
    scene(A('c3a'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={520} s={1.2 * P('c3a')}>
              <Phone title="CHECKOUT" value={f >= ft ? '$15 today' : '$60'} color={f >= ft ? C.green : C.ink} />
            </G2>
            <Btn x={500} y={860} w={380} label="PAY IN 4" color="#E36397" s={P('c3a', 2) * bump(bt, 0.2)} />
            <G2 x={1360} y={180} s={P('c3a', 3) * bump(kl)} o={lit(kl)}><Box w={740} h={100} fill="#FFF8DC" /><Text size={40}>remember our Klarna video? (ep 10)</Text></G2>
            <Shop x={1180} y={760} s={0.55 * P('c3a', 4)} name="STORE" />
            <Raccoon f={f} x={1620} y={760} s={0.8 * P('c3a', 5) * bump(fe, 0.2)} mood="greedy" holdCoin={f >= fe} />
            <G2 x={1400} y={420} s={P('c3a', 6) * bump(fe)} o={lit(fe)}><Text size={40}>store pays a fee →</Text></G2>
            <G2 x={1400} y={500} s={P('c3a', 6) * bump(bm)} o={lit(sm)}><Text size={40} color={C.red}>{f >= bg ? 'people buy MORE & BIGGER' : 'price looks smaller'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3d')}><Text size={52}>buy now, pay later in America</Text></G2>
            <Panel x={520} y={380} w={600} h={250} title="ADULTS WHO USED IT" value={V(sx, '16%')} color={C.blue} size={120} s={P('c3d', 2) * bump(sx)} />
            <G2 x={520} y={600} s={P('c3d', 3)} o={lit(tn)}><Text size={38} color={GRAY}>up from 10% in 2021</Text></G2>
            <Panel x={1400} y={380} w={600} h={250} title="USERS WHO PAID LATE" value={V(lt, '1 in 4+')} color={C.red} size={100} s={P('c3d', 4) * bump(lt)} />
            <Panel x={1400} y={720} w={600} h={220} title="USED IT FOR FOOD" value={V(gr, '1 in 5')} color={C.red} size={90} s={P('c3d', 5) * bump(gr)} />
            <Dave f={f} x={520} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: gr, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <SourceTag f={f} at={sx} text="Federal Reserve SHED 2025 (May 2026): BNPL use 16%; > 1 in 4 users paid late" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c3f')}><Text size={52}>{f >= sw ? 'all due the SAME week' : '4 small payments... feel like nothing'}</Text></G2>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <G2 key={i} x={f >= sw ? 900 + (i % 3) * 30 : 260 + i * 240} y={f >= sw ? 440 + i * 28 : 420} s={0.8 * P('c3f', 2 + i)}>
                <rect x={-100} y={-60} width={200} height={120} rx={14} fill="#FDE3EA" stroke={C.ink} strokeWidth={5} />
                <Text y={-15} size={28} color={GRAY}>{['shoes', 'jacket', 'phone', 'shoes', 'lamp', 'food'][i]}</Text>
                <Text y={30} size={40} color={C.red}>$15</Text>
              </G2>
            ))}
            <Calendar x={1500} y={440} s={0.55 * P('c3f', 3) * bump(sw)} top="SAME WEEK" year="DUE" flip={0} />
            <Raccoon f={f} x={1500} y={820} s={0.9 * P('c3f', 4) * bump(rc, 0.25)} mood={f >= rc ? 'greedy' : 'sneaky'} holdCoin={f >= rc} />
            <Dave f={f} x={380} y={900} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sw, pose: 'panic', expr: 'shock', look: 0.8}]} sweat={f >= sw} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Phone knows ============
  {
    const pk = w('c4a', 'pocket');
    const pd = w('c4b', 'price');
    const bs2 = w('c4b', 'back');
    const lc = w('c4b', 'cart');
    const ni = w('c4c', 'night');
    const py = w('c4c', 'payday');
    const bd = w('c4c', 'bored');
    const sm = w('c4d', 'social');
    const sc = w('c4d', 'scroll');
    const lk = w('c4d', 'like');
    const vd = w('c4d', 'video');
    const tn = w('c4e', 'two');
    const eh = w('c4e', 'eight');
    const wk = w('c4f', 'works');
    const pr = w('c4f', 'product');
    q(pk, 'pop', 0.5);
    q(pd, 'ding', 0.5);
    q(bs2, 'ding', 0.5);
    q(lc, 'ding', 0.5);
    q(ni, 'pop', 0.4);
    q(py, 'cash', 0.5);
    q(bd, 'pop', 0.4);
    q(sc, 'whoosh_s', 0.5);
    q(lk, 'heart', 0.5);
    q(vd, 'pop', 0.4);
    q(tn, 'cash', 0.7);
    q(eh, 'thud', 0.6);
    q(wk, 'ding', 0.5);
    q(pr, 'stamp', 0.7);
    const ns: [string, string, number][] = [['Price drop!', 'the thing you looked at', pd], ['Back in stock!', 'hurry, almost gone', bs2], ['You left something...', 'in your cart', lc]];
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Couch x={420} y={880} s={1.0 * P('c4a')} color="#8FB8DE" />
            <Dave f={f} x={420} y={800} s={0.95} keys={[{at: 0, pose: 'relax', expr: 'tired', look: 0.8}, {at: lc, pose: 'hold', expr: 'happy', look: 0.8}]} />
            {ns.map(([a, b, at], i) => <Notif key={a} x={1260} y={200 + i * 150} s={P('c4a', 2 + i * 2) * bump(at)} o={lit(at)} title={a} body={b} hl={f >= at ? 1 : 0} w={640} />)}
            {([['at night', ni], ['on payday', py], ['when bored', bd]] as const).map(([l, at], i) => (
              <G2 key={l} x={1060 + i * 260} y={760} s={P('c4a', 8 + i) * bump(at)} o={lit(at)}><Box w={230} h={90} fill={f >= at ? C.yellow : '#fff'} /><Text size={34}>{l}</Text></G2>
            ))}
            <G2 x={420} y={400} s={P('c4a', 3) * bump(pk)} o={lit(pk)}><Text size={44}>the store lives in his pocket</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={540} s={1.3 * P('c4d')}>
              <Phone title="FEED" value={f >= vd ? 'sneakers?' : 'scrolling'} color={C.blue} />
            </G2>
            <G2 x={560} y={130} s={P('c4d', 2) * bump(sm)}><Text size={50}>social media</Text></G2>
            {([['every scroll', sc], ['every like', lk], ['every pause on a video', vd]] as const).map(([l, at], i) => (
              <G2 key={l} x={1320} y={240 + i * 150} s={P('c4d', 3 + i) * bump(at)} o={lit(at)}><Box w={600} h={110} fill={f >= at ? '#E3F1F4' : '#fff'} /><Text size={42}>{l}</Text></G2>
            ))}
            <path d="M 820 500 L 1000 500" stroke={C.ink} strokeWidth={8} strokeLinecap="round" opacity={lit(sc)} />
            <G2 x={1320} y={770} s={P('c4d', 6)} o={lit(vd)}><Brain s={0.6} glow={f >= vd ? 1 : 0} /><Text y={150} size={36}>the app learns what you want</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Panel x={640} y={360} w={820} h={280} title="U.S. INTERNET ADS, 2025" value={V(tn, '$294.6 billion')} color={C.red} size={96} s={P('c4e') * bump(tn)} />
            <Panel x={640} y={720} w={820} h={240} title="PER PERSON IN AMERICA" value={V(eh, '≈ $860')} color={C.red} size={100} s={P('c4e', 2) * bump(eh)} />
            <Banker f={f} x={1420} y={880} s={1.1 * P('c4e', 3)} keys={[{at: 0, pose: 'hold', expr: 'smug', look: -0.8}, {at: pr, pose: 'present', expr: 'grin', look: -0.8}]} />
            <G2 x={1540} y={300} s={P('c4e', 4) * bump(pr)} o={lit(wk)}><Box w={560} h={170} fill={f >= pr ? C.yellow : '#fff'} /><Text y={-30} size={36}>free app?</Text><Text y={30} size={42}>YOU are the product</Text></G2>
            <SourceTag f={f} at={tn} text="IAB/PwC Internet Advertising Revenue Report FY2025: $294.6B · ÷ ~342M people ≈ $860" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Dark patterns ============
  {
    const tr = w('c5a', 'trick');
    const ftc = w('c5b', 'federal');
    const dp = w('c5b', 'dark');
    const cd = w('c5c', 'countdown');
    const rs = w('c5c', 'resets');
    const tw = w('c5c', 'two');
    const bx = w('c5c', 'checked');
    const nt = w('c5d', 'thanks');
    const cs = w('c5d', 'confirm');
    const rl = w('c5d', 'really');
    const sx = w('c5e', 'six');
    const th = w('c5e', 'three');
    const rsh = w('c5f', 'rushed');
    const pp = w('c5f', 'purpose');
    q(tr, 'sting', 0.6);
    q(ftc, 'paper', 0.5);
    q(dp, 'stamp', 0.7);
    q(cd, 'tick', 0.6);
    q(rs, 'boing', 0.6);
    q(tw, 'buzz', 0.5);
    q(bx, 'click', 0.7);
    q(nt, 'pop', 0.5);
    q(cs, 'stamp', 0.6);
    q(rl, 'trombone', 0.5);
    q(sx, 'ding', 0.5);
    q(th, 'thud', 0.7);
    q(rsh, 'tick', 0.5);
    q(pp, 'stamp', 0.7);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={P('c5a') * bump(tr)}><Text size={56}>{f >= tr ? "they don't just make it easy. They TRICK you." : 'some designs go further'}</Text></G2>
            <G2 x={600} y={580} s={P('c5a', 2) * bump(ftc, 0.06)}><Box w={620} h={380} fill="#FFF8DC" /><Text y={-120} size={32} color={GRAY}>FTC STAFF REPORT · 2022</Text><Text y={-40} size={48}>Bringing</Text><Text y={40} size={64} color="#2E3440">DARK PATTERNS</Text><Text y={110} size={48}>to Light</Text></G2>
            <G2 x={1400} y={580} s={P('c5a', 3)}>
              <rect x={-260} y={-220} width={520} height={440} rx={30} fill={f >= dp ? '#2E3440' : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text y={0} size={60} color={f >= dp ? '#fff' : GRAY}>{f >= dp ? 'DARK PATTERNS' : '?'}</Text>
            </G2>
            <SourceTag f={f} at={ftc} text="FTC Staff Report, Bringing Dark Patterns to Light (Sept 2022)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={300} s={P('c5c') * bump(cd)} o={lit(cd)}>
              <Countdown time={f >= rs ? '09:59' : `09:${String(Math.max(0, 59 - Math.floor((f - cd) / 30))).padStart(2, '0')}`} hl={f >= rs ? 1 : 0} />
              <Text y={130} size={34} color={f >= rs ? C.red : GRAY}>{f >= rs ? 'refresh → resets!' : 'fake timer'}</Text>
            </G2>
            <G2 x={1400} y={300} s={P('c5c', 2) * bump(tw)} o={lit(tw)}>
              <Box w={560} h={160} fill={f >= tw ? '#FDE3EA' : '#fff'} />
              <Text y={-20} size={48} color={C.red}>Only 2 left!</Text>
              <Text y={40} size={30} color={GRAY}>(there are plenty)</Text>
            </G2>
            <CheckBox x={480} y={660} s={P('c5c', 3) * bump(bx)} o={lit(bx)} on={f >= bx ? 1 : 0} label="Add protection plan $9.99" w={620} />
            <G2 x={1400} y={680} s={P('c5c', 4)} o={lit(nt)}>
              <Btn x={0} y={-70} w={520} label="YES, SAVE 40%!" color={C.green} />
              <Text y={40} size={32} color={GRAY}>no thanks, I don't like saving money</Text>
            </G2>
            <Stamp x={1400} y={880} s={pop(f, cs, 9, 260)} text="CONFIRMSHAMING" size={50} color={C.red} r={-6} />
            <Dave f={f} x={160} y={920} s={0.7} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: rl, pose: 'facepalm', expr: 'tired', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c5e')}><Text size={50}>2024 review: {V(sx, '642')} subscription sites & apps</Text></G2>
            {Array.from({length: 20}).map((_, i) => {
              const bad = i < 15;
              const on = f >= th;
              return (
                <G2 key={i} x={380 + (i % 5) * 170} y={300 + Math.floor(i / 5) * 160} s={0.9 * P('c5e', 2 + i)}>
                  <rect x={-65} y={-60} width={130} height={120} rx={18} fill={on ? (bad ? '#2E3440' : '#E3F6EC') : '#fff'} stroke={C.ink} strokeWidth={5} />
                  <Text y={4} size={30} color={on && bad ? '#fff' : GRAY}>{on ? (bad ? 'DARK' : 'ok') : 'app'}</Text>
                </G2>
              );
            })}
            <Panel x={1520} y={420} w={560} h={260} title="USED 1+ DARK PATTERN" value={V(th, '76%')} color={C.red} size={120} s={P('c5e', 4) * bump(th)} />
            <G2 x={1520} y={700} s={P('c5e', 6) * bump(pp)} o={lit(rsh)}><Box w={560} h={140} fill={f >= pp ? C.yellow : '#fff'} /><Text y={-18} size={36}>feel rushed?</Text><Text y={30} size={40}>often ON PURPOSE</Text></G2>
            <SourceTag f={f} at={sx} text="FTC / ICPEN / GPEN review (July 2024): 76% of 642 sites & apps used ≥1 dark pattern" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Brain ============
  {
    const br = w('c6a', 'brains');
    const hd = w('c6b', 'hundred');
    const tn = w('c6b', 'ten');
    const gb = w('c6b', 'grab');
    const yr = w('c6c', 'year');
    const wt = w('c6c', 'wait');
    const df = w('c6d', 'different');
    const pb = w('c6d', 'present');
    const bn = w('c6d', 'bonus');
    const tw = w('c6e', 'two');
    const td = w('c6e', 'today');
    const fd = w('c6e', 'future');
    const hp = w('c6e', 'holds');
    const vt = w('c6f', 'vote');
    q(br, 'pop', 0.5);
    q(hd, 'cash', 0.6);
    q(tn, 'cash', 0.6);
    q(gb, 'pop2', 0.6);
    q(yr, 'flip', 0.5);
    q(wt, 'ding', 0.6);
    q(df, 'sting', 0.5);
    q(pb, 'stamp', 0.7);
    q(bn, 'ding', 0.5);
    q(tw, 'pop', 0.5);
    q(td, 'pop', 0.5);
    q(fd, 'pop', 0.5);
    q(hp, 'buzz', 0.6);
    q(vt, 'trombone', 0.5);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6a') * bump(br)}><Text size={54}>quick test: which would you pick?</Text></G2>
            {[0, 1].map((row) => {
              const on = row ? f >= yr : true;
              const pick = row ? (f >= wt ? 1 : -1) : (f >= gb ? 0 : -1);
              return (
                <G2 key={row} y={row ? 700 : 360} s={P('c6a', 2 + row * 4)} o={on ? 1 : 0.35}>
                  <G2 x={560} s={pick === 0 ? bump(gb) : 1}>
                    <rect x={-300} y={-110} width={600} height={220} rx={24} fill={pick === 0 ? '#E3F6EC' : '#fff'} stroke={pick === 0 ? C.green : C.ink} strokeWidth={6} />
                    <Hundred38 x={-120} s={0.8} v="$100" />
                    <Text x={130} y={0} size={40}>{row ? 'in 1 year' : 'TODAY'}</Text>
                  </G2>
                  <G2 x={1360} s={pick === 1 ? bump(wt) : 1}>
                    <rect x={-300} y={-110} width={600} height={220} rx={24} fill={pick === 1 ? '#E3F6EC' : '#fff'} stroke={pick === 1 ? C.green : C.ink} strokeWidth={6} />
                    <Hundred38 x={-120} s={0.8} v="$110" color="#8FD694" />
                    <Text x={130} y={0} size={36}>{row ? '1 yr + 1 week' : 'next week'}</Text>
                  </G2>
                  <Text x={960} size={50} color={GRAY}>or</Text>
                </G2>
              );
            })}
            <G2 x={560} y={510} s={P('c6a', 3)} o={lit(gb)}><Text size={36} color={C.green}>most grab this</Text></G2>
            <G2 x={1360} y={850} s={P('c6a', 7)} o={lit(wt)}><Text size={36} color={C.green}>"sure, I'll wait"</Text></G2>
            <SourceTag f={f} at={hd} text="Classic present-bias choice experiment (Thaler 1981; Laibson 1997)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c6d') * bump(df)}><Text size={54}>same 1-week wait. different answer.</Text></G2>
            <Brain x={620} y={560} s={1.6 * P('c6d', 2) * bump(pb, 0.08)} glow={f >= bn ? 1 : 0.2} />
            <Stamp x={620} y={860} s={pop(f, pb, 9, 260)} text="PRESENT BIAS" size={58} color={C.red} r={-5} />
            <G2 x={620} y={860} s={P('c6d', 3)} o={f >= pb ? 0 : 0.4}><Text size={44} color={GRAY}>name?</Text></G2>
            <G2 x={1400} y={420} s={P('c6d', 4) * bump(bn)}>
              <Box w={560} h={200} fill={f >= bn ? C.yellow : '#fff'} />
              <Text y={-30} size={44}>RIGHT NOW</Text>
              <Text y={40} size={56} color={C.red}>{f >= bn ? '= HUGE bonus' : '= ?'}</Text>
            </G2>
            <G2 x={1400} y={720} s={P('c6d', 5)} o={0.6}><Box w={560} h={140} /><Text size={40} color={GRAY}>later = tiny</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={520} y={860} s={1.2 * P('c6e') * bump(td, 0.06)} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.8}]} handItem={<Phone s={0.25} title="SHOP" value="BUY" color={C.red} />} />
            <Dave f={f} x={1400} y={860} s={1.2 * P('c6e', 2) * bump(fd, 0.06)} keys={[{at: 0, pose: 'point_l', expr: 'worried', look: -0.8}, {at: vt, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
            <G2 x={520} y={260} s={P('c6e', 3) * bump(td)} o={lit(td)}><Box w={460} h={150} fill="#FDE3EA" /><Text y={-25} size={48}>TODAY DAVE</Text><Text y={35} size={34}>wants the sneakers</Text></G2>
            <G2 x={1400} y={260} s={P('c6e', 4) * bump(fd)} o={lit(fd)}><Box w={500} h={150} fill="#E3F6EC" /><Text y={-25} size={48}>FUTURE DAVE</Text><Text y={35} size={34}>needs the emergency fund</Text></G2>
            <Jar x={1700} y={760} s={0.6 * P('c6e', 5)} level={0.1} label="FUND" />
            <G2 x={960} y={520} s={P('c6e', 5) * bump(hp)} o={lit(hp)}><Text size={40} color={C.red}>{f >= vt ? 'Future Dave: no vote' : 'who holds the phone?'}</Text></G2>
            <G2 x={960} y={120} s={P('c6e', 6)} o={lit(tw)}><Text size={52}>there are two Daves</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Willpower myth ============
  {
    const pf = w('c7a', 'profits');
    const st = w('c7a', 'stores');
    const fe = w('c7a', 'fees');
    const ad = w('c7a', 'click');
    const wp = w('c7b', 'willpower');
    const np = w('c7b', 'nope');
    const th = w('c7c', 'thousands');
    const bl = w('c7c', 'billions');
    const fa = w('c7c', 'fair');
    const pr = w('c7d', 'proof');
    const au = w('c7d', 'automatically');
    const ts = w('c7e', 'thirty');
    const ef = w('c7e', 'eighty');
    const dfl = w('c7e', 'default');
    const gn = w('c7f', 'good');
    const sv = w('c7f', 'save');
    const ys = w('c7f', 'yourself');
    q(pf, 'cash', 0.6);
    q(st, 'pop', 0.5);
    q(fe, 'coin', 0.5);
    q(ad, 'click', 0.6);
    q(wp, 'pop', 0.5);
    q(np, 'buzz', 0.8);
    q(th, 'crowd', 0.4);
    q(bl, 'cash', 0.6);
    q(fa, 'thud', 0.6);
    q(pr, 'paper', 0.5);
    q(au, 'ding', 0.5);
    q(ts, 'pop', 0.6);
    q(ef, 'ding', 0.8);
    q(dfl, 'stamp', 0.6);
    q(gn, 'chime', 0.5);
    q(sv, 'coin', 0.6);
    q(ys, 'ding', 0.6);
    scene(A('c7a'), () =>
      f < A('c7b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c7a') * bump(pf)}><Text size={58}>who profits?</Text></G2>
            <Frame x={400} y={560} s={P('c7a', 2) * bump(st)} o={lit(st)} w={480} h={560} label="stores sell more">
              <Shop s={0.5} y={80} name="STORE" />
            </Frame>
            <Frame x={960} y={560} s={P('c7a', 4) * bump(fe)} o={lit(fe)} w={480} h={560} label="pay-later fees">
              <Raccoon f={f} x={0} y={80} s={0.7} mood="greedy" holdCoin />
            </Frame>
            <Frame x={1520} y={560} s={P('c7a', 6) * bump(ad)} o={lit(ad)} w={480} h={560} label="ad platforms, per click">
              <Banker f={f} x={0} y={160} s={0.75} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} />
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c7b')}><Text size={52}>{f >= np ? 'myth: "just have more willpower"' : '"just have more willpower!"'}</Text></G2>
            <Stamp x={960} y={270} s={pop(f, np, 9, 260)} text="NOPE" size={80} color={C.red} r={-8} />
            <Grandma f={f} x={260} y={880} s={1} keys={[{at: 0, pose: 'point_r', expr: 'smug', look: 0.8}]} />
            <G2 x={260} y={420} s={P('c7b', 2) * bump(wp)}><Bubble text="Just stop buying!" size={34} tail="down" /></G2>
            <Dave f={f} x={640} y={880} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: 0.8}, {at: fa, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <G2 x={640} y={520} s={P('c7b', 3)}><Text size={40}>1 Dave</Text></G2>
            <G2 x={960} y={640} s={P('c7b', 4) * bump(fa)} o={lit(fa)}><Text size={64}>vs</Text></G2>
            {Array.from({length: 8}).map((_, i) => <Nerd key={i} i={i} f={f} x={1180 + (i % 4) * 170} y={i < 4 ? 620 : 900} s={0.62 * P('c7b', 4 + i) * bump(th)} keys={[{at: 0, pose: 'typing', expr: 'think'}]} />)}
            <G2 x={1440} y={330} s={P('c7b', 6) * bump(bl)} o={lit(th)}><Text size={40}>{f >= bl ? 'engineers + $ billions in ads' : 'thousands of engineers'}</Text></G2>
            <G2 x={960} y={760} s={P('c7b', 7)} o={lit(fa)}><Text size={38} color={C.red}>not a fair fight</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c7d') * bump(pr)}><Text size={50}>proof: a famous retirement-plan study</Text></G2>
            <CheckBox x={960} y={240} s={P('c7d', 2) * bump(au)} on={f >= au ? 1 : 0} label="signed up automatically (can leave)" w={820} />
            <line x1={520} y1={860} x2={1400} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <VBar x={740} base={860} h={ease(f, ts - 4, ts + 16, 80, 196)} color="#9AA5B1" label="before" value={V(ts, '37%')} s={P('c7d', 3)} />
            <VBar x={1180} base={860} h={ease(f, ef - 4, ef + 16, 80, 456)} color={C.green} label="after" value={V(ef, '86%')} s={P('c7d', 4)} />
            <G2 x={1680} y={560} s={P('c7d', 5) * bump(dfl)} o={lit(dfl)}><Box w={380} h={200} fill={f >= dfl ? C.yellow : '#fff'} /><Text y={-30} size={34}>same people</Text><Text y={30} size={38}>new DEFAULT</Text></G2>
            <SourceTag f={f} at={ts} text="Madrian & Shea (2001), QJE: auto-enrollment raised 401(k) participation 37% → 86%" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={900} s={P('c7f')} tilt={ease(f, sv - 4, sv + 16, 10, -10)} left="design → spend" right="design → SAVE" />
            <G2 x={660} y={560} s={P('c7f', 2)}><Phone s={0.5} title="SHOP" value="BUY" color={C.red} /></G2>
            <G2 x={1260} y={580} s={P('c7f', 3) * bump(sv)}><Jar s={0.7} level={f >= sv ? 0.7 : 0.2} label="SAVINGS" /></G2>
            <Dave f={f} x={240} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ys, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={960} y={140} s={P('c7f', 4) * bump(ys)} o={lit(gn)}><Box w={900} h={110} fill={f >= ys ? C.yellow : '#fff'} /><Text size={46}>design it for YOURSELF</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    const ea = w('c8a', 'education');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ea, 'stamp', 0.5);
    const items = ['Save first, automatically (payday)', 'Savings: separate & a bit annoying', 'Add friction: delete saved cards', 'Delete apps / kill notifications', 'Wait list: 2 days before buying'];
    const cur = hs.filter((x) => f >= x).length;
    const wk = w('c8g', 'weeks');
    const tw = w('c8g', 'two');
    const ft = w('c8g', 'first');
    const dg = w('c8g', 'design');
    q(wk, 'flip', 0.5);
    q(tw, 'cash', 0.8);
    q(ft, 'chime', 0.6);
    q(dg, 'ding', 0.6);
    scene(A('c8a'), () =>
      f < A('c8g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={100} s={P('c8a')}><Text size={56}>How Dave finally saves</Text></G2>
            <G2 x={700} y={160} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={80} y={270 + i * 130} s={0.85 * P('c8a', 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.blue} w={1180} />)}
            {cur > 1 && Array.from({length: cur - 1}).map((_, i) => <Check key={i} x={1060} y={270 + i * 130} s={0.8} />)}
            <G2 x={1620} y={560} s={P('c8a', 4)}>
              <Frame w={440} h={600}>
                {cur === 0 && <Dave f={f} x={0} y={200} s={0.8} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} />}
                {cur === 1 && <g><Calendar s={0.35} y={-170} top="PAYDAY" year="AUTO" flip={0} /><Text y={-20} size={36}>paycheck →</Text><Jar s={0.45} y={120} level={0.5} label="SAVE" /></g>}
                {cur === 2 && <g><Bank s={0.45} y={-40} label="BANK #2" /><Text y={140} size={30}>no card · no app</Text><Text y={185} size={30} color={GRAY}>out of sight</Text></g>}
                {cur === 3 && <g><CreditCard s={0.8} y={-60} label="SAVED" /><XMark s={0.5} y={-60} /><Text y={100} size={32}>type it every time</Text><Text y={150} size={30} color={GRAY}>log out</Text></g>}
                {cur === 4 && <g>{[0, 1, 2, 3].map((k) => <AppTile key={k} s={0.7} x={-70 + (k % 2) * 140} y={-140 + Math.floor(k / 2) * 140} color={[C.red, C.blue, '#E36397', C.green][k]} label="$" />)}<XMark s={0.6} y={-70} /><Text y={150} size={32}>no buzz = no sale</Text></g>}
                {cur === 5 && <g><WishList s={0.8} y={-40} items={['sneakers', 'lamp', 'headphones']} crossed={Math.min(3, Math.floor((f - hs[4]) / 30))} /><Hourglass s={0.4} y={230} t={0.5} /></g>}
              </Frame>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Calendar x={220} y={220} s={0.5 * P('c8g') * bump(wk)} top="WEEKS" year="LATER" flip={0} />
            <Phone x={760} y={520} s={1.2 * P('c8g', 2) * bump(tw, 0.08)} title="SAVINGS" value={V(tw, '$200')} color={C.green} />
            <Jar x={1180} y={720} s={1.1 * P('c8g', 3)} level={ease(f, tw - 4, tw + 20, 0.05, 0.6)} label="SAVINGS" />
            <Dave f={f} x={1560} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'think', look: -0.8}, {at: tw, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <Stamp x={1180} y={280} s={pop(f, ft, 9, 260)} text="FIRST TIME EVER" size={54} color={C.green} r={-6} />
            <G2 x={960} y={960} s={P('c8g', 4)} o={lit(dg)}><Text size={44}>not more willpower · better design</Text></G2>
            {f >= tw && <Sparkle x={1260} y={560} t={((f - tw) % 30) / 30} s={0.8} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ Recap + next ============
  const recap = ['1-tap, saved cards & pay later kill the pause', 'Ads, dark patterns & present bias push you', 'Automate saving, add friction to spending'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const cur = r.filter((x) => f >= x).length;
    const gr = w('d1e', 'grow');
    const nc = w('d1e', 'new');
    const pr = w('d1e', 'poorer');
    const sb = w('d1f', 'subscribe');
    const tp = w('d1f', 'tap');
    const dm = w('d1f', 'dime');
    q(gr, 'coin', 0.5);
    q(nc, 'chime', 0.5);
    q(pr, 'trombone', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(tp, 'click', 0.5);
    q(dm, 'coin', 0.6);
    scene(A('d1a'), () =>
      f < A('d1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={P('d1a')}><Text size={100}>RECAP</Text></G2>
            {recap.map((b, i) => <Row key={i} x={140} y={380 + i * 170} s={P('d1a', 2 + i * 2) * (cur === i + 1 ? bump(r[i], 0.06) : 1)} n={i + 1} text={b} lit={cur >= i + 1 ? 1 : 0.35} color={C.blue} w={1480} />)}
            <Dave f={f} x={1780} y={900} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('d1f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={120} s={P('d1e')}><Text size={54}>Next: why a new car makes you poorer</Text></G2>
            <Jar x={380} y={720} s={0.9 * P('d1e', 2) * bump(gr)} level={0.7} label="SAVINGS" />
            <Dave f={f} x={720} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: nc, pose: 'point_r', expr: 'grin', look: 0.8}, {at: pr, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={1360} y={800} s={1.3 * P('d1e', 3) * bump(nc)}><path d="M -150 30 L -150 -14 Q -148 -30 -128 -34 L -90 -40 L -60 -92 Q -52 -102 -36 -102 L 60 -102 Q 76 -102 84 -92 L 112 -40 L 134 -36 Q 152 -32 152 -12 L 152 30 Z" fill={C.red} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" /><circle cx={-90} cy={32} r={30} fill={C.ink} /><circle cx={94} cy={32} r={30} fill={C.ink} /></G2>
            {f >= nc && <Sparkle x={1500} y={620} t={((f - nc) % 30) / 30} s={0.8} />}
            <G2 x={1360} y={500} s={P('d1e', 4) * bump(pr)}><PriceTag s={1.1} text={f >= pr ? 'poorer?!' : 'NEW!'} color={f >= pr ? C.red : C.green} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * P('d1f')} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={P('d1f', 2)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Jar x={1560} y={800} s={0.8 * P('d1f', 3)} level={0.7} label="SAVINGS" />
            <G2 x={960} y={680} s={P('d1f', 4) * bump(dm)}><Text size={46} color={f >= dm ? C.green : C.ink}>the only 1-tap button that costs $0</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2f', 'dollars') + 20;
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
