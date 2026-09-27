import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, Interior, OldFilm} from '../fx';
import {Arrow, Bubble, Calendar, Coin, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Phone, Row, SubButton, Bell} from '../props2';
import {Person, Raccoon, TollBooth} from '../props3';
import {Globe, House} from '../props4';
import {Bottle, Scale} from '../props8';
import {Cup} from '../props25';
import {Gavel} from '../props26';
import {FoodBag, MenuCard} from '../props33';
import {Kiosk, RailCar, Register, StaringJar, TipScreen, WageSandwich} from '../props34';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Rich: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Worker: React.FC<SP> = (p) => <Stick acc={['cap']} seed={58} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';
const DIMT = '#B8AF9E';

const Box: React.FC<{x: number; y: number; w: number; h: number; o?: number; s?: number; fill?: string; children?: React.ReactNode}> = ({x, y, w, h, o = 1, s = 1, fill = '#fff', children}) => (
  <G2 x={x} y={y} o={o} s={s}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </G2>
);

export const Ep34: React.FC = () => {
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
    const wt = w('o1', 'water');
    const tw = w('o1', 'two');
    const sc = w('o1', 'scans');
    const sp = w('o2', 'spins');
    const tp = w('o2', 'tip');
    const opt = [w('o2', 'twenty'), w('o2', 'twenty', 1), w('o2', 'thirty')];
    q(wt, 'pop', 0.6);
    q(tw, 'coin', 0.5);
    q(sc, 'key', 0.6);
    q(sp, 'whoosh', 0.6);
    q(tp, 'ding', 0.6);
    opt.forEach((x) => q(x, 'pop2', 0.5));
    const hl = opt.filter((x) => f >= x).length - 1;
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={300} y={900} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sc, pose: 'point_r', expr: 'neutral'}, {at: tp, pose: 'shock', expr: 'shock'}]} handItem={<Bottle s={0.5} color={C.blue} />} />
          <Kiosk x={900} y={620} s={1.05 * P(0)}>
            <G2 r={ease(f, sp, sp + 16, 180, 360)}><TipScreen hl={hl} title={f >= sp ? 'ADD A TIP?' : 'SCAN ITEM'} /></G2>
          </Kiosk>
          <Box x={1560} y={300} w={520} h={240} s={P(0) * bump(tw, 0.15)}>
            <Text y={-60} size={38} color={GRAY}>bottle of water</Text>
            <Text y={40} size={100} color={f >= tw ? C.ink : DIMT}>{f >= tw ? '$2.50' : '?'}</Text>
          </Box>
          <G2 x={1560} y={560} s={1.2 * P(0) * bump(wt, 0.15)}><Bottle color={C.blue} label="H2O" /></G2>
          <G2 x={1560} y={820} s={P(0) * bump(tp, 0.15)} o={lt(tp, 0.4)}><Text size={60} color={C.red}>{f >= tp ? 'a TIP?!' : 'self checkout'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mc = w('o3', 'machine');
    const wk = w('o3', 'work');
    const sv = w('o4', 'seven');
    const tn = w('o4', 'ten');
    const gt = w('o5', 'gets');
    q(mc, 'buzz', 0.5);
    q(wk, 'thud', 0.5);
    q(sv, 'stamp', 0.6);
    q(tn, 'pop2', 0.5);
    q(gt, 'sting', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={240} y={900} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'angry', look: 0.8}, {at: wk, pose: 'facepalm', expr: 'tired'}, {at: sv, pose: 'shrug', expr: 'worried'}]} />
          <Kiosk x={620} y={640} s={0.85 * P(A('o3')) * bump(mc, 0.1)}><TipScreen hl={1} /></Kiosk>
          <G2 x={620} y={110} s={P(A('o3')) * bump(wk, 0.1)}><Text size={52} color={f >= wk ? C.red : C.ink}>{f >= wk ? 'Dave did all the work!' : 'a tip... for a machine?'}</Text></G2>
          <Box x={1440} y={380} w={820} h={520} s={P(A('o3')) * bump(sv, 0.06)}>
            <Text y={-200} size={36} color={GRAY}>"tipping is expected in more places"</Text>
            {Array.from({length: 10}).map((_, i) => (
              <Person key={i} x={-300 + (i % 5) * 150} y={-60 + Math.floor(i / 5) * 170} s={1.1} c={f >= sv && i < 7 ? C.red : '#C9C0AE'} />
            ))}
            <Text y={210} size={56} color={f >= tn ? C.red : DIMT}>{f >= tn ? '7 in 10 Americans' : '? in 10'}</Text>
          </Box>
          <Box x={1440} y={870} w={820} h={150} s={P(A('o3')) * bump(gt, 0.12)} fill={f >= gt ? C.yellow : '#fff'} o={lt(gt, 0.5)}>
            <Coin x={-320} s={1.4} />
            <Text x={40} size={54}>who gets that tip? ?</Text>
          </Box>
          <SourceTag f={f} at={sv} text="Pew Research Center, 2023: 72% say tipping expected in more places" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'came'), w('o6', 'screens'), w('o6', 'profits'), w('o6', 'fine')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['WHERE IT CAME FROM', 'WHY SCREENS', 'WHO PROFITS', 'WHEN "NO TIP" IS OK'].map((l, i) => (
            <G2 key={l} x={265 + i * 463} y={570} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={430} h={520}>
                {i === 0 && <RailCar y={20} s={0.42} />}
                {i === 1 && <TipScreen y={-30} s={0.65} hl={1} />}
                {i === 2 && <Raccoon f={f} y={-70} s={0.8} mood="greedy" holdCoin />}
                {i === 3 && <TipScreen y={-30} s={0.65} noHl={1} />}
                <Text y={210} size={32}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 tip screen ============
  {
    const tf = w('c1b', 'twenty');
    const sx = w('c1b', 'sixty');
    const st = w('c1b', 'stings');
    const nb = [w('c1c', 'cooked'), w('c1c', 'carried'), w('c1c', 'hello')];
    const sr = w('c1d', 'stares');
    const wc = w('c1d', 'watching');
    q(tf, 'click', 0.5);
    q(sx, 'coin', 0.6);
    q(st, 'sting', 0.5);
    nb.forEach((x) => q(x, 'buzz', 0.35));
    q(sr, 'dream', 0.4);
    q(wc, 'cricket', 0.4);
    const pw = w('c1e', 'pew');
    const sv = w('c1e', 'seventy');
    const th = w('c1e', 'third');
    const sy = w('c1f', 'system');
    q(pw, 'paper', 0.5);
    q(sv, 'stamp', 0.6);
    q(th, 'ding', 0.5);
    q(sy, 'stamp', 0.6);
    const sk = shake(f, sr, 8, 16);
    scene(A('c1a'), () =>
      f < A('c1e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={240} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: st, pose: 'shrug', expr: 'sad'}, {at: sr, pose: 'shock', expr: 'worried'}]} sweat={f >= wc} />
            <Kiosk x={640} y={640} s={0.95 * P(A('c1a'))}><G2 x={sk.x} y={sk.y}><TipScreen hl={1} /></G2></Kiosk>
            <Box x={1400} y={220} w={820} h={240} s={P(A('c1a')) * bump(sx, 0.1)}>
              <Text y={-55} size={52}>25% × $2.50 =</Text>
              <Text y={45} size={84} color={f >= sx ? C.red : DIMT}>{f >= sx ? '$0.63' : '?'}</Text>
            </Box>
            {['nobody cooked', 'nobody carried', 'nobody said hello'].map((l, i) => (
              <G2 key={l} x={1400} y={430 + i * 110} s={P(A('c1a')) * bump(nb[i])} o={lt(nb[i], 0.4)}>
                <rect x={-300} y={-44} width={600} height={88} rx={20} fill={f >= nb[i] ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={42}>{l}</Text>
              </G2>
            ))}
            {[0, 1, 2].map((i) => <Person key={i} x={1200 + i * 190} y={930} s={1.2 * P(A('c1a'))} c={f >= wc ? C.navy : '#9AA5B1'} />)}
            <G2 x={1750} y={820} s={P(A('c1a')) * bump(wc, 0.2)} o={lt(wc, 0.3)}><Text size={40} color={C.red}>*watching*</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={120} s={P(A('c1e')) * bump(pw)}><Text size={48}>Pew Research · ~12,000 Americans</Text></G2>
            <Box x={700} y={380} w={1000} h={280} s={P(A('c1e')) * bump(sv, 0.08)} fill={f >= sv ? C.yellow : '#fff'}>
              <Text y={-90} size={36} color={GRAY}>"tipping expected in more places than 5 years ago"</Text>
              <Text y={40} size={140} color={f >= sv ? C.ink : DIMT}>{f >= sv ? '72%' : '?'}</Text>
            </Box>
            <line x1={260} y1={900} x2={1140} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={700} y={600}><Text size={36} color={GRAY}>"it's easy to know when to tip"</Text></G2>
            <rect x={260} y={660} width={880} height={200} rx={20} fill="#E8E1D2" stroke={C.ink} strokeWidth={6} />
            <rect x={260} y={660} width={880 * ease(f, th - 4, th + 16, 0.08, 0.34)} height={200} rx={20} fill={C.blue} stroke={C.ink} strokeWidth={6} />
            <Text x={900} y={765} size={60} color={f >= th ? C.blue : DIMT}>{f >= th ? '~1 in 3' : '?'}</Text>
            <Dave f={f} x={1580} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: sy, pose: 'point_up', expr: 'happy'}]} />
            <Stamp x={1580} y={300} s={P(A('c1e')) * bump(sy, 0.2)} o={lt(sy, 0.3)} text={"IT'S THE SYSTEM"} size={52} color={C.red} r={-5} />
            <SourceTag f={f} at={pw} text="Pew Research Center, Nov 2023: 72% more places; 34% easy to know whether to tip" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 history ============
  {
    const eu = w('c2a', 'europe');
    const fc = w('c2a', 'fancy');
    const cw = w('c2b', 'civil');
    const fr = w('c2b', 'freed');
    const ct = w('c2b', 'tips');
    const rr = w('c2c', 'railroad');
    const pl = w('c2c', 'pullman');
    const ic = w('c2c', 'income');
    q(eu, 'whoosh', 0.5);
    q(fc, 'pop', 0.5);
    q(cw, 'stamp', 0.5);
    q(fr, 'pop2', 0.4);
    q(ct, 'coin', 0.5);
    q(rr, 'clank', 0.5);
    q(pl, 'stamp', 0.5);
    q(ic, 'coin', 0.5);
    const bn = w('c2d', 'banned');
    const sv = w('c2d', 'several');
    const en = w('c2e', 'enforce');
    const gn = w('c2e', 'gone');
    const st = w('c2f', 'stayed');
    const bs2 = w('c2f', 'boss');
    q(bn, 'stamp', 0.7);
    q(sv, 'pop2', 0.5);
    q(en, 'buzz', 0.4);
    q(gn, 'poof', 0.6);
    q(st, 'thud', 0.5);
    q(bs2, 'ding', 0.5);
    const tl = [eu, cw, pl];
    const cur = tl.filter((x) => f >= x).length;
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={200} y1={200} x2={1720} y2={200} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
            {['1800s: EUROPE → U.S.', 'AFTER THE CIVIL WAR', 'PULLMAN PORTERS'].map((l, i) => (
              <G2 key={l} x={400 + i * 560} y={200} s={P(A('c2a')) * bump(tl[i], 0.12)} o={cur > i ? 1 : 0.45}>
                <circle r={26} fill={cur > i ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
                <Text y={-60} size={38}>{l}</Text>
              </G2>
            ))}
            <Rich f={f} x={300} y={900} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.8}, {at: fc, pose: 'present', expr: 'grin'}]} />
            <G2 x={300} y={440} s={P(A('c2a')) * bump(fc)} o={lt(eu, 0.45)}><Bubble text={'how\nsophisticated!'} size={36} tail="down" /></G2>
            <G2 x={1050} y={420} s={P(A('c2a')) * bump(ct, 0.1)} o={lt(cw, 0.45)}>
              <Text size={38}>{f >= fr ? 'newly freed Black workers' : 'workers'}</Text>
              <Text y={55} size={38} color={f >= ct ? C.red : GRAY}>{f >= ct ? 'low or no wage → tips cover the rest' : '...'}</Text>
            </G2>
            <RailCar x={1150} y={880} s={0.75 * P(A('c2a')) * bump(rr, 0.08)} label="PULLMAN SLEEPING CAR" />
            <Worker f={f} x={1700} y={900} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'tired', look: -0.8}]} handItem={<Coin s={0.8} />} />
            <G2 x={1700} y={500} s={P(A('c2a')) * bump(ic, 0.15)} o={lt(pl, 0.4)}><Text size={36} color={C.red}>tiny wage + tips</Text></G2>
          </Svg>
          <OldFilm f={f} o={0.8} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={380} y={380} s={1.2 * P(A('c2d')) * bump(bn, 0.12)} top="WASHINGTON" year="1909" flip={0} />
            <Stamp x={380} y={640} s={P(A('c2d')) * bump(bn, 0.2)} o={lt(bn, 0.3)} text="TIPPING BANNED" size={48} color={C.red} r={-6} />
            {[0, 1, 2, 3].map((i) => (
              <G2 key={i} x={780 + i * 130} y={380} s={P(A('c2d')) * bump(sv, 0.2)} o={lt(sv, 0.35)}>
                <rect x={-50} y={-60} width={100} height={120} rx={14} fill={C.greenLight} stroke={C.ink} strokeWidth={5} />
                <Text y={4} size={32}>BAN</Text>
                {f >= gn && <XMark s={0.6} />}
              </G2>
            ))}
            <G2 x={975} y={530} s={P(A('c2d'))} o={lt(sv, 0.35)}><Text size={36}>more states followed</Text></G2>
            <Calendar x={1550} y={380} s={1.2 * P(A('c2d')) * bump(gn, 0.12)} top="ALL BANS GONE" year={f >= gn ? '1926' : '?'} flip={0} />
            <G2 x={1550} y={620} s={P(A('c2d')) * bump(en)} o={lt(en, 0.35)}><Text size={38} color={C.red}>impossible to enforce</Text></G2>
            <Box x={960} y={850} w={1300} h={170} s={P(A('c2d')) * bump(bs2, 0.08)} fill={f >= bs2 ? C.yellow : '#fff'} o={lt(st, 0.5)}>
              <Text size={50}>part of a worker's pay comes from YOU, not the boss</Text>
            </Box>
            <SourceTag f={f} at={bn} text="NPR Throughline / TIME: Washington banned tipping 1909; all state bans repealed by 1926" />
          </Svg>
          <OldFilm f={f} o={0.6} />
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 $2.13 ============
  {
    const sv = w('c3b', 'seven');
    const lb = w('c3b', 'labor');
    const tw = w('c3b', 'two');
    const fv = w('c3c', 'five');
    const cr = w('c3c', 'credit');
    const nn = w('c3d', 'nineteen');
    const th = w('c3d', 'thirty');
    const np = w('c3e', 'nope');
    const df = w('c3e', 'difference');
    q(sv, 'ding', 0.5);
    q(lb, 'paper', 0.4);
    q(tw, 'thud', 0.6);
    q(fv, 'coin', 0.5);
    q(cr, 'stamp', 0.6);
    q(nn, 'pop', 0.5);
    q(th, 'tick', 0.5);
    q(np, 'buzz', 0.7);
    q(df, 'ding', 0.6);
    const hg = w('c3f', 'higher');
    const nc = w('c3f', 'credit');
    const lv = w('c3f', 'live');
    const bd = w('c3g', 'bread');
    const fl = w('c3g', 'filling');
    const ms = w('c3g', 'most');
    q(hg, 'pop2', 0.5);
    q(nc, 'pop2', 0.5);
    q(lv, 'ding', 0.5);
    q(bd, 'pop', 0.5);
    q(fl, 'pop', 0.5);
    q(ms, 'boing', 0.6);
    scene(A('c3a'), () =>
      f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={110} s={P(A('c3a'))}><Text size={46}>federal minimum wage, per hour</Text></G2>
            <line x1={180} y1={880} x2={940} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={360} y={880} h={ease(f, sv - 4, sv + 14, 200, 580)} color={C.green} label="regular" value={f >= sv ? '$7.25' : '?'} w={240} />
            <Bar x={760} y={880} h={ease(f, tw - 4, tw + 14, 60, 170)} color={C.red} label="tipped worker" value={f >= tw ? '$2.13' : '?'} w={240} />
            <G2 o={lt(fv, 0.25)}>
              <rect x={640} y={880 - 580} width={240} height={410} rx={10} fill="none" stroke={C.ink} strokeWidth={5} strokeDasharray="16 12" />
              <Text x={760} y={880 - 400} size={48} color={C.blue}>{f >= fv ? '$5.12' : ''}</Text>
              <Text x={760} y={880 - 340} size={32} color={C.blue}>{f >= cr ? 'from tips' : ''}</Text>
            </G2>
            <Stamp x={760} y={210} s={P(A('c3a')) * bump(cr, 0.2)} o={lt(cr, 0.3)} text="TIP CREDIT" size={52} color={C.blue} r={-5} />
            <Box x={1450} y={260} w={740} h={250} s={P(A('c3a')) * bump(nn, 0.1)} o={lt(nn, 0.5)}>
              <Text y={-60} size={40} color={GRAY}>$2.13 unchanged since</Text>
              <Text y={40} size={96} color={f >= nn ? C.red : DIMT}>{f >= nn ? '1991' : '?'}</Text>
            </Box>
            <G2 x={1450} y={450} s={P(A('c3a')) * bump(th)} o={lt(th, 0.35)}><Text size={40}>30+ years, same number</Text></G2>
            <Box x={1450} y={700} w={740} h={220} s={P(A('c3a')) * bump(np, 0.1)} fill={f >= df ? C.greenLight : '#fff'} o={lt(np, 0.5)}>
              <Text y={-50} size={40} color={f >= np ? C.red : GRAY}>{f >= np ? 'NOPE:' : 'myth: bad night = $2.13'}</Text>
              <Text y={30} size={40}>{f >= np ? 'boss must top up to $7.25' : ''}</Text>
            </Box>
            <Worker f={f} x={1760} y={960} s={0.75} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: -0.6}, {at: df, pose: 'thumbs', expr: 'happy'}]} />
            <SourceTag f={f} at={lb} text="U.S. Dept. of Labor: tipped cash wage $2.13, tip credit up to $5.12, min. wage $7.25" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={720} y={120} s={P(A('c3f'))}><Text size={50}>and many states go further</Text></G2>
            {[['federal', 'cash wage $2.13', A('c3f')], ['some states', 'much higher base wage', hg], ['some states', 'no tip credit at all', nc]].map(([a, b, at], i) => (
              <G2 key={i} x={720} y={300 + i * 180} s={P(A('c3f')) * bump(at as number, 0.08)} o={lt(at as number, 0.4)}>
                <rect x={-540} y={-65} width={1080} height={130} rx={26} fill={f >= (at as number) && i > 0 ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={6} />
                <Text x={-500} y={4} size={46} anchor="start" color={GRAY}>{a as string}:</Text>
                <Text x={500} y={4} size={46} anchor="end">{b as string}</Text>
              </G2>
            ))}
            <G2 x={720} y={880} s={P(A('c3f')) * bump(lv, 0.12)} o={lt(lv, 0.4)}><Text size={52} color={C.blue}>rules depend on where you live</Text></G2>
            <House x={1600} y={880} s={0.6 * P(A('c3f')) * bump(lv, 0.1)} />
            <Dave f={f} x={1600} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: lv, pose: 'point_up', expr: 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3g'))}><Text size={52}>the tipped-wage sandwich</Text></G2>
            <WageSandwich x={960} y={560} s={1.35 * P(A('c3g')) * bump(ms, 0.08)} lit={[f >= bd ? 1 : 0, f >= fl ? 1 : 0, f >= bd ? 1 : 0]} />
            <Owner f={f} x={300} y={900} s={1.05} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}]} />
            <G2 x={300} y={420} s={P(A('c3g')) * bump(bd)} o={lt(bd, 0.4)}><Bubble text={'I bring\nthe bread'} size={38} tail="down" /></G2>
            <Dave f={f} x={1620} y={900} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ms, pose: 'shock', expr: 'shock'}]} />
            <G2 x={1620} y={420} s={P(A('c3g')) * bump(ms)} o={lt(fl, 0.4)}><Bubble text={f >= ms ? "that's most\nof it!" : 'I bring the\nfilling?'} size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 screens ============
  {
    const tb = w('c4b', 'tablet');
    const rg = w('c4b', 'registers');
    const sw = w('c4b', 'switch');
    const pd = w('c4c', 'pandemic');
    const ex = w('c4c', 'extra');
    const sy = w('c4c', 'stayed');
    q(tb, 'pop', 0.5);
    q(rg, 'clank', 0.4);
    q(sw, 'click', 0.7);
    q(pd, 'pop2', 0.5);
    q(ex, 'heart', 0.5);
    q(sy, 'stamp', 0.6);
    const ds = w('c4d', 'design');
    const tw = w('c4d', 'twenty');
    const sm = w('c4d', 'small');
    const df = w('c4e', 'default');
    const md = w('c4e', 'middle');
    q(ds, 'pop', 0.5);
    q(tw, 'ding', 0.5);
    q(sm, 'boing', 0.5);
    q(df, 'stamp', 0.7);
    q(md, 'click', 0.6);
    const cs = w('c4f', 'cashier');
    const ln = w('c4f', 'line');
    const bx = w('c4f', 'box');
    const jr = w('c4f', 'jar');
    q(cs, 'pop2', 0.5);
    q(ln, 'step', 0.5);
    q(bx, 'thud', 0.5);
    q(jr, 'boing', 0.6);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a'))}><Text size={50}>why is a self checkout asking for a tip?</Text></G2>
            <G2 x={450} y={560} s={P(A('c4a')) * bump(rg, 0.1)} o={f >= sw ? 0.5 : 1}>
              <Register label="$2.50" />
              <Text y={250} size={40} color={GRAY}>old register: asks nothing</Text>
            </G2>
            <Arrow d="M 700 520 L 1000 520" t={ease(f, tb, tb + 14, 0.2, 1)} color={C.red} />
            <G2 x={1300} y={500} s={P(A('c4a')) * bump(sw, 0.1)}><TipScreen hl={f >= sw ? 1 : -1} title={f >= sw ? 'ADD A TIP?' : 'PAY HERE'} /></G2>
            <G2 x={1300} y={800} s={P(A('c4a')) * bump(sw)} o={lt(tb, 0.4)}><Text size={40} color={C.red}>tip screen = flip a switch</Text></G2>
            <Calendar x={1760} y={300} s={0.75 * P(A('c4a')) * bump(pd, 0.15)} top="PANDEMIC" year="2020" flip={0} />
            <G2 x={1760} y={520} s={P(A('c4a')) * bump(ex, 0.2)} o={lt(ex, 0.35)}><Icon kind="heart" s={0.6} /></G2>
            <Stamp x={1650} y={930} s={P(A('c4a')) * bump(sy, 0.2)} o={lt(sy, 0.3)} text="SCREENS STAYED" size={46} color={C.red} r={-5} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={540} s={1.55 * P(A('c4d')) * bump(ds, 0.05)}><TipScreen hl={f >= md ? 1 : -1} sub={f >= tw ? 'starts at 20%' : undefined} /></G2>
            <Arrow d="M 700 960 L 700 820" t={ease(f, sm, sm + 10, 0.2, 1)} color={C.red} />
            <G2 x={1000} y={930} s={P(A('c4d')) * bump(sm)} o={lt(sm, 0.35)}><Text size={40} color={C.red}>tiny "no tip" at the bottom</Text></G2>
            <Stamp x={1490} y={220} s={P(A('c4d')) * bump(df, 0.2)} o={lt(df, 0.3)} text="DEFAULT EFFECT" size={58} color={C.blue} r={-4} />
            <Dave f={f} x={1560} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}, {at: md, pose: 'point_l', expr: 'worried'}]} />
            <G2 x={1560} y={440} s={P(A('c4d')) * bump(md)} o={lt(df, 0.35)}><Bubble text={'looks normal\n= feels right'} size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Worker f={f} x={1050} y={900} s={1} keys={[{at: 0, pose: 'hips', expr: 'neutral', look: -0.8}, {at: cs, pose: 'hips', expr: 'suspicious'}]} />
            <G2 x={760} y={560} s={P(A('c4f'))}><TipScreen s={0.7} hl={1} /></G2>
            <Dave f={f} x={480} y={900} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'worried', look: 0.8}]} sweat={f >= ln} />
            {[0, 1].map((i) => <Person key={i} x={110 + i * 150} y={900} s={1.6 * P(A('c4f'))} c={f >= ln ? C.navy : '#9AA5B1'} />)}
            <G2 x={260} y={560} s={P(A('c4f')) * bump(ln, 0.2)} o={lt(ln, 0.35)}><Text size={36} color={GRAY}>the line behind you</Text></G2>
            <StaringJar x={1560} y={620} s={1.3 * P(A('c4f')) * bump(jr, 0.15)} f={f} />
            <G2 x={1560} y={200} s={P(A('c4f')) * bump(bx, 0.15)} o={lt(bx, 0.4)}><Text size={50} color={C.red}>social pressure in a box</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 who profits ============
  {
    const wn = [w('c5b', 'worker'), w('c5c', 'business'), w('c5d', 'payment')];
    const ch = w('c5c', 'cheaper');
    const en = w('c5c', 'end');
    const sq = w('c5d', 'two');
    const sx = w('c5e', 'sixty');
    const lw = w('c5e', 'law');
    wn.forEach((x) => q(x, 'ding', 0.6));
    q(ch, 'pop2', 0.5);
    q(en, 'whoosh_s', 0.4);
    q(sq, 'coin', 0.5);
    q(sx, 'cash', 0.6);
    q(lw, 'stamp', 0.5);
    const rc = w('c5f', 'raccoon');
    const bt = w('c5f', 'bite');
    const nw = w('c5g', 'no');
    const ak = w('c5g', 'ask');
    q(rc, 'pop2', 0.6);
    q(bt, 'crinkle', 0.6);
    q(nw, 'buzz', 0.4);
    q(ak, 'ding', 0.5);
    const cur = wn.filter((x) => f >= x).length;
    scene(A('c5a'), () =>
      f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={105} s={P(A('c5a'))}><Text size={50}>who wins when you tap 25%?</Text></G2>
            {['1. THE WORKER', '2. THE BUSINESS', '3. THE PAYMENT CO.'].map((l, i) => (
              <G2 key={l} x={380 + i * 580} y={460} s={P(A('c5a')) * bump(wn[i], 0.07)} o={cur > i ? 1 : 0.45}>
                <Frame w={540} h={500}>
                  {i === 0 && <Worker f={f} x={0} y={140} s={0.7} keys={[{at: 0, pose: 'thumbs', expr: 'happy'}]} />}
                  {i === 1 && (
                    <g>
                      <MenuCard y={-60} s={0.6} title="MENU" item="coffee" price="$4" color={C.green} />
                      <Text y={90} size={32} color={f >= ch ? C.green : GRAY}>price looks cheaper</Text>
                      <Text y={140} size={32} color={f >= en ? C.red : GRAY}>real cost moved to the end</Text>
                    </g>
                  )}
                  {i === 2 && (
                    <g>
                      <TipScreen y={-80} s={0.5} hl={1} />
                      <Text y={80} size={32} color={GRAY}>fee on the WHOLE payment</Text>
                      <Text y={140} size={40} color={f >= sq ? C.red : DIMT}>{f >= sq ? '2.6% + 15¢' : '?'}</Text>
                    </g>
                  )}
                  <Text y={210} size={34}>{l}</Text>
                </Frame>
              </G2>
            ))}
            <Box x={700} y={880} w={900} h={150} s={P(A('c5a')) * bump(sx, 0.1)} o={lt(sq, 0.45)} fill={f >= sx ? C.yellow : '#fff'}>
              <Text size={50}>$100 of card tips × 2.6% = {f >= sx ? '$2.60' : '?'}</Text>
            </Box>
            <G2 x={1500} y={880} s={P(A('c5a')) * bump(lw, 0.12)} o={lt(lw, 0.35)}>
              <Text size={34} color={C.red}>law lets employers take</Text>
              <Text y={44} size={34} color={C.red}>the card fee out of tips</Text>
            </G2>
            <SourceTag f={f} at={sq} text="Square: in-person rate 2.6% + 15¢ · DOL Fact Sheet #15: card fee may be deducted from tips" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <TollBooth x={560} y={822} s={0.9 * P(A('c5f'))} label="CARD FEE" barUp={f >= bt ? 0.9 : 0} />
            <Raccoon f={f} x={280} y={740} s={1.1 * P(A('c5f')) * bump(rc, 0.2)} mood="greedy" grab={ease(f, bt, bt + 10)} holdCoin={f >= bt} />
            <G2 x={560} y={200} s={P(A('c5f')) * bump(bt, 0.15)} o={lt(bt, 0.45)}><Text size={48} color={C.red}>a bite of every card tip</Text></G2>
            <Kiosk x={1400} y={640} s={0.9 * P(A('c5f')) * bump(nw, 0.08)}><TipScreen hl={1} /></Kiosk>
            <G2 x={1400} y={130} s={P(A('c5f')) * bump(nw, 0.12)} o={lt(nw, 0.4)}><Text size={44}>self checkout: no tipped worker?</Text></G2>
            <G2 x={1760} y={330} s={P(A('c5f')) * bump(ak, 0.25)} o={lt(ak, 0.35)}><Icon kind="question" s={0.9} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 what people do ============
  {
    const ts = w('c6b', 'toast');
    const sv = w('c6b', 'seventy');
    const nn = w('c6b', 'nineteen');
    const ff = w('c6c', 'fifteen');
    q(ts, 'pop', 0.5);
    q(sv, 'ding', 0.4);
    q(nn, 'stamp', 0.6);
    q(ff, 'stamp', 0.6);
    const br = w('c6d', 'bankrate');
    const st = [w('c6d', 'forty'), w('c6d', 'thirty'), w('c6e', 'twenty'), w('c6f', 'seventy'), w('c6f', 'eighteen')];
    const dl = w('c6f', 'lines');
    q(br, 'paper', 0.5);
    st.forEach((x) => q(x, 'ding', 0.5));
    q(dl, 'pop', 0.5);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={600} y={120} s={P(A('c6a')) * bump(ts)}><Text size={46}>average card tip · early 2026</Text></G2>
            <line x1={200} y1={860} x2={1000} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={400} y={860} h={ease(f, nn - 4, nn + 14, 80, 560)} color={C.green} label="sit-down" value={f >= nn ? '19.3%' : '?'} w={260} />
            <Bar x={800} y={860} h={ease(f, ff - 4, ff + 14, 80, 455)} color={C.blue} label="counter service" value={f >= ff ? '15.8%' : '?'} w={260} />
            <Box x={1450} y={330} w={700} h={240} s={P(A('c6a')) * bump(sv, 0.1)}>
              <Text y={-60} size={36} color={GRAY}>Toast payment data from</Text>
              <Text y={30} size={70} color={f >= sv ? C.ink : DIMT}>{f >= sv ? '171,000+ places' : '?'}</Text>
            </Box>
            <Dave f={f} x={1450} y={920} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: nn, pose: 'point_l', expr: 'happy'}]} />
            <SourceTag f={f} at={ts} text="Toast Restaurant Tipping Trends, Q1 2026 (card tips)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={100} s={P(A('c6d')) * bump(br)}><Text size={46}>Bankrate survey · Americans say...</Text></G2>
            {[['41%', 'tipping culture is out of control', C.red], ['38%', 'pre-entered tip screens annoy them', C.red], ['27%', 'tip LESS when a screen pushes', C.blue], ['70%', 'always tip at a sit-down restaurant', C.green], ['18%', 'always tip a barista', C.green]].map(([n, l, c], i) => (
              <G2 key={i} x={700} y={220 + i * 150} s={P(A('c6d')) * bump(st[i], 0.08)} o={lt(st[i], 0.45)}>
                <rect x={-620} y={-58} width={1240} height={116} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text x={-500} y={6} size={64} color={f >= st[i] ? (c as string) : DIMT}>{f >= st[i] ? (n as string) : '?'}</Text>
                <Text x={-380} y={4} size={42} anchor="start">{l as string}</Text>
              </G2>
            ))}
            <Dave f={f} x={1660} y={900} s={1} keys={[{at: 0, pose: 'hips', expr: 'tired', look: -0.8}, {at: dl, pose: 'thumbs', expr: 'happy'}]} />
            <G2 x={1660} y={420} s={P(A('c6d')) * bump(dl)} o={lt(dl, 0.35)}><Bubble text={'people draw\ntheir own lines'} size={34} tail="down" /></G2>
            <SourceTag f={f} at={br} text="Bankrate tipping survey, June 2025 (2,445 U.S. adults)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 no tax on tips ============
  {
    const pl = w('c7a', 'politics');
    const cg = w('c7b', 'congress');
    const eg = w('c7b', 'eight');
    const th = w('c7b', 'thousand');
    const sh = w('c7c', 'shrinks');
    const md = w('c7c', 'medicare');
    q(pl, 'pop', 0.5);
    q(cg, 'stamp', 0.5);
    q(eg, 'tick', 0.5);
    q(th, 'cash', 0.6);
    q(sh, 'pop2', 0.4);
    q(md, 'ding', 0.5);
    const sp = w('c7d', 'supporters');
    const cr = w('c7d', 'critics');
    const yl = w('c7d', 'thirty');
    const nt = w('c7d', 'nothing');
    const wg = w('c7e', 'wages');
    const nb = w('c7f', 'numbers');
    q(sp, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(yl, 'stamp', 0.6);
    q(nt, 'trombone', 0.4);
    q(wg, 'pop2', 0.4);
    q(nb, 'ding', 0.6);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={330} y={420} s={1.3 * P(A('c7a')) * bump(cg, 0.1)}><Gavel hit={f >= cg ? 1 : 0} /></G2>
            <G2 x={330} y={200} s={P(A('c7a')) * bump(pl)}><Text size={46}>"No tax on tips"</Text></G2>
            <Dave f={f} x={330} y={920} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
            <Box x={1200} y={280} w={1100} h={260} s={P(A('c7a')) * bump(th, 0.08)} fill={f >= th ? C.yellow : '#fff'}>
              <Text y={-75} size={38} color={GRAY}>federal income tax deduction on tips, up to</Text>
              <Text y={40} size={110} color={f >= th ? C.ink : DIMT}>{f >= th ? '$25,000' : '?'}</Text>
            </Box>
            {[['years', f >= eg ? '2025 – 2028' : '?', cg], ['shrinks above', f >= sh ? '$150,000 income' : '?', sh], ['still paid', f >= md ? 'Social Security & Medicare' : '?', md]].map(([a, b, at], i) => (
              <G2 key={i} x={1200} y={550 + i * 140} s={P(A('c7a')) * bump(at as number, 0.08)} o={lt(at as number, 0.45)}>
                <rect x={-550} y={-55} width={1100} height={110} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text x={-510} y={4} size={42} anchor="start" color={GRAY}>{a as string}</Text>
                <Text x={510} y={4} size={46} anchor="end">{b as string}</Text>
              </G2>
            ))}
            <SourceTag f={f} at={cg} text="IRS: One Big Beautiful Bill Act, tip deduction up to $25,000, 2025-2028, phase-out above $150K" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={620} y={820} s={1.15 * P(A('c7d'))} tilt={f >= cr ? 0 : f >= sp ? -12 : 0} left="SUPPORTERS" right="CRITICS" />
            <G2 x={275} y={250} s={P(A('c7d')) * bump(sp, 0.1)} o={lt(sp, 0.4)}><Text size={34} color={C.green}>more money in</Text><Text y={42} size={34} color={C.green}>workers' pockets</Text></G2>
            <G2 x={965} y={250} s={P(A('c7d')) * bump(cr, 0.1)} o={lt(cr, 0.4)}><Text size={34} color={C.red}>{f >= wg ? 'tips instead of wages?' : 'helps fewer people'}</Text></G2>
            <Box x={1500} y={330} w={700} h={320} s={P(A('c7d')) * bump(yl, 0.08)} fill={f >= yl ? C.yellow : '#fff'}>
              <Text y={-100} size={34} color={GRAY}>tipped workers who paid</Text>
              <Text y={-55} size={34} color={GRAY}>no federal income tax (2022)</Text>
              <Text y={60} size={120} color={f >= yl ? C.ink : DIMT}>{f >= yl ? '37%+' : '?'}</Text>
            </Box>
            <G2 x={1500} y={580} s={P(A('c7d')) * bump(nt, 0.15)} o={lt(nt, 0.35)}><Text size={40} color={C.red}>for them: changes nothing</Text></G2>
            <Box x={1500} y={850} w={760} h={170} s={P(A('c7d')) * bump(nb, 0.1)} o={lt(nb, 0.45)} fill={f >= nb ? C.greenLight : '#fff'}>
              <Text size={46}>Political question. Now you know the numbers.</Text>
            </Box>
            <SourceTag f={f} at={yl} text="Yale Budget Lab, 'No Tax on Tips' (2024): 37%+ of tipped workers had no federal income tax liability in 2022" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 guide ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f'), bs('c8g')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const eg = w('c8b', 'eighteen');
    const dr = w('c8c', 'door');
    const op = w('c8e', 'optional');
    const fn = w('c8f', 'fine');
    const cs = w('c8g', 'cash');
    q(eg, 'pop', 0.5);
    q(dr, 'pop2', 0.5);
    q(op, 'pop', 0.5);
    q(fn, 'stamp', 0.6);
    q(cs, 'cash', 0.6);
    const items = ['Sit-down, served: ~18-20%', 'Delivery drivers: yes', 'Hair, bartenders, taxis: custom', 'Coffee & takeout: optional', 'Self checkout: "no tip" is fine', 'Want it to reach them? Cash'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={640} y={95}><Text size={54}>A simple tipping guide (U.S.)</Text></G2>
          <G2 x={640} y={150}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={260 + i * 118} s={0.82 * P(A('c8a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dave f={f} x={1560} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={1560} y={420}><Bubble text={'so when do\nI tip?'} size={44} tail="down" /></G2>}
          {cur === 1 && (
            <G2 x={1560} y={560}>
              <Worker f={f} x={0} y={330} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.6}]} />
              <G2 y={-200} s={bump(eg, 0.15)}><Text size={80} color={C.green}>18-20%</Text></G2>
            </G2>
          )}
          {cur === 2 && (
            <G2 x={1560} y={560}>
              <FoodBag s={1.1} />
              <G2 y={-240} s={bump(dr, 0.15)}><Text size={40} color={C.green}>they drove to your door</Text></G2>
            </G2>
          )}
          {cur === 3 && (
            <G2 x={1560} y={560}>
              <Icon kind="check" y={-60} s={1} />
              <Text y={140} size={40}>customary in the U.S.</Text>
            </G2>
          )}
          {cur === 4 && (
            <G2 x={1560} y={540}>
              <Cup s={1.2} label="TO GO" f={f} />
              <G2 y={250} s={bump(op, 0.15)}><Text size={42}>small tip = kind, not required</Text></G2>
            </G2>
          )}
          {cur === 5 && (
            <G2 x={1560} y={500}>
              <TipScreen s={0.75} noHl={f >= fn ? 1 : 0} />
              <G2 y={260} s={bump(fn, 0.15)}><Text size={44} color={C.green}>you did the work</Text></G2>
            </G2>
          )}
          {cur >= 6 && (
            <G2 x={1560} y={560}>
              <Worker f={f} x={0} y={330} s={1} keys={[{at: 0, pose: 'hold', expr: 'grin', look: -0.6}]} />
              <G2 y={-200} s={bump(cs, 0.2)}><Coin s={2} /></G2>
              <Text y={-80} size={36} color={C.green}>no card fee, no raccoon</Text>
            </G2>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 what Dave did ============
  {
    const br = w('c9b', 'breath');
    const ig = w('c9b', 'ignored');
    const tp = w('c9b', 'tapped');
    const cy = w('c9c', 'cry');
    const gs = w('c9c', 'gasped');
    const spn = w('c9c', 'spinning');
    q(br, 'whoosh_s', 0.4);
    q(ig, 'step', 0.4);
    q(tp, 'click', 0.8);
    q(cy, 'pop2', 0.4);
    q(gs, 'cricket', 0.4);
    q(spn, 'ding', 0.5);
    const dn = w('c9d', 'dinner');
    const gd = w('c9d', 'good');
    const sv = w('c9e', 'service');
    const sc = w('c9e', 'screens');
    q(dn, 'pop', 0.5);
    q(gd, 'coin', 0.6);
    q(sv, 'stamp', 0.6);
    q(sc, 'ding', 0.5);
    scene(A('c9a'), () =>
      f < A('c9d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={330} y={900} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: br, pose: 'relax', expr: 'neutral'}, {at: tp, pose: 'point_r', expr: 'grin'}]} handItem={<Bottle s={0.5} color={C.blue} />} />
            <Kiosk x={800} y={640} s={0.95 * P(A('c9a'))}><TipScreen hl={f >= tp ? -1 : 1} noHl={f >= tp ? 1 : 0} /></Kiosk>
            <G2 x={800} y={110} s={P(A('c9a')) * bump(tp, 0.12)}><Text size={56} color={f >= tp ? C.green : GRAY}>{f >= tp ? 'tap: NO TIP' : 'what will Dave tap?'}</Text></G2>
            {['machine didn\'t cry', 'nobody gasped', 'world kept spinning'].map((l, i) => {
              const at = [cy, gs, spn][i];
              return (
                <G2 key={l} x={1500} y={260 + i * 130} s={P(A('c9a')) * bump(at)} o={lt(at, 0.4)}>
                  <rect x={-300} y={-48} width={600} height={96} rx={22} fill={f >= at ? C.greenLight : '#fff'} stroke={C.ink} strokeWidth={5} />
                  <Text y={3} size={42}>{l}</Text>
                </G2>
              );
            })}
            <Globe x={1500} y={820} s={0.8 * P(A('c9a')) * bump(spn, 0.1)} f={f} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <House x={380} y={822} s={0.8 * P(A('c9d'))} />
            <Dave f={f} x={700} y={822} s={1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: gd, pose: 'thumbs', expr: 'grin'}]} />
            <Worker f={f} x={1000} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: gd, pose: 'celebrate', expr: 'grin'}]} handItem={<FoodBag s={0.4} />} />
            <G2 x={850} y={380} s={P(A('c9d')) * bump(gd, 0.2)} o={lt(gd, 0.4)}><Coin s={1.6} /><Text y={90} size={40} color={C.green}>a good tip</Text></G2>
            <Box x={1500} y={330} w={700} h={260} s={P(A('c9d')) * bump(sv, 0.1)} fill={f >= sv ? C.yellow : '#fff'} o={lt(dn, 0.6)}>
              <Text y={-40} size={52}>tip for SERVICE</Text>
              <Text y={40} size={52} color={f >= sc ? C.red : DIMT}>not for screens</Text>
            </Box>
            <G2 x={1500} y={700} s={0.6 * P(A('c9d'))}><TipScreen noHl={1} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ RECAP ============
  const recap = ['Tipping spread after the Civil War; base can be $2.13', 'Tablets + preset buttons; others profit too', 'Tip for service. No service? "No tip" is fine'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={180} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1560} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('r5', 'four');
    const on = w('r5', 'one');
    const pr = w('r5', 'poor');
    const sb = w('r6', 'subscribe');
    const nv = w('r6', 'never');
    q(fr, 'pop', 0.5);
    q(on, 'buzz', 0.5);
    q(pr, 'sting', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(nv, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={58}>Next: why being poor is so expensive</Text></G2>
            <G2 x={900} y={600} s={1.4 * P(A('r5')) * bump(fr, 0.12)}><Cup label="$4" f={f} /></G2>
            <G2 x={1400} y={600} s={P(A('r5')) * bump(on, 0.12)}><Phone title="DAVE'S BANK" value={f >= on ? '$1.00' : '$?'} color={C.red} /></G2>
            <Dave f={f} x={430} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: pr, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={1500} y={800} s={0.55 * pop(f, sb - 4) * bump(nv, 0.1)}><TipScreen title="SUBSCRIBE?" opts={['FREE']} hl={0} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5e', 'tips', 1) + 20;
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
