import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bank, Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Phone, Row, Shield, SubButton, Bell, CreditCard} from '../props2';
import {Raccoon, TollBooth, Shop, Terminal} from '../props3';
import {House} from '../props4';
import {Scale, Paycheck, ScoreGauge, Receipt} from '../props8';
import {Cup} from '../props25';
import {TV} from '../props27';
import {Brain} from '../props17';
import {Bolt} from '../props20';
import {Car} from '../props';
import {Alarm, AccountMeter, BookCover, Boot, CheckForm, HamsterWheel, People, TPPack} from '../props35';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Rich: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={55} {...p} />;

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

const Pill: React.FC<{x: number; y: number; w: number; text: string; on: boolean; s?: number; color?: string; size?: number}> = ({x, y, w, text, on, s = 1, color = C.yellow, size = 40}) => (
  <G2 x={x} y={y} s={s} o={on ? 1 : 0.4}>
    <rect x={-w / 2} y={-44} width={w} height={88} rx={20} fill={on ? color : '#fff'} stroke={C.ink} strokeWidth={5} />
    <Text y={3} size={size}>{text}</Text>
  </G2>
);

export const Ep35: React.FC = () => {
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
    const fr = w('o1', 'four');
    const one = w('o1', 'one');
    const sh = w('o1', 'short');
    const gt = w('o2', 'through');
    const th = w('o2', 'thirty');
    const ov = w('o2', 'overdraft');
    const nn = w('o2', 'thirty', 1);
    q(2, 'pop', 0.6);
    q(fr, 'coin', 0.5);
    q(one, 'pop', 0.5);
    q(sh, 'buzz', 0.5);
    q(gt, 'ding', 0.5);
    q(th, 'stamp', 0.7);
    q(nn, 'trombone', 0.6);
    const sk = shake(f, th, 16, 14);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={300} y={900} s={1.25} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sh, pose: 'shrug', expr: 'worried', look: 0.8}, {at: th, pose: 'shock', expr: 'shock', look: 0.8}, {at: nn, pose: 'facepalm', expr: 'sad'}]} />
          <Cup x={620} y={720} s={1.1 * P(0) * bump(fr, 0.15)} label="$4" f={f} />
          <Terminal x={620} y={330} s={0.9 * P(0) * bump(gt, 0.15)} text="$4.00" ok={f >= gt ? 1 : 0} />
          <G2 x={1000} y={560} s={P(0) * bump(one, 0.12)}><Phone title="DAVE'S BANK" value={f >= gt ? '-$3.00' : '$1.00'} color={f >= sh ? C.red : C.ink} /></G2>
          <Box x={1530} y={470} w={620} h={560} s={P(0)} fill="#fff">
            <Text y={-230} size={34} color={GRAY}>WHAT THE COFFEE COST</Text>
            <Text x={-260} y={-140} size={44} anchor="start">coffee</Text>
            <Text x={260} y={-140} size={44} anchor="end">$4</Text>
            <G2 x={sk.x} y={sk.y} o={lt(th, 0.35)}>
              <Text x={-260} y={-50} size={44} anchor="start" color={f >= th ? C.red : GRAY}>overdraft fee</Text>
              <Text x={260} y={-50} size={44} anchor="end" color={f >= th ? C.red : GRAY}>{f >= th ? '$35' : '?'}</Text>
            </G2>
            <line x1={-260} y1={10} x2={260} y2={10} stroke={C.ink} strokeWidth={5} />
            <G2 y={130} s={bump(nn, 0.25)}><Text size={130} color={f >= nn ? C.red : GRAY}>{f >= nn ? '$39' : '?'}</Text></G2>
          </Box>
          <G2 x={1530} y={860} s={P(0) * bump(sh)} o={lt(sh)}><Text size={52} color={C.red}>only $3 short</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lk = w('o3', 'look');
    const th = w('o3', 'thousand');
    const fr = w('o3', 'four');
    const sc = w('o4', 'coffee');
    const ss = w('o4', 'shop');
    const mo = w('o4', 'money');
    const pr = w('o5', 'poor');
    const ex = w('o5', 'extra');
    q(lk, 'whoosh', 0.4);
    q(th, 'cash', 0.6);
    q(fr, 'ding', 0.7);
    q(sc, 'pop2', 0.5);
    q(ss, 'pop2', 0.5);
    q(mo, 'coin', 0.5);
    q(pr, 'stamp', 0.7);
    q(ex, 'sting', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={960} y1={180} x2={960} y2={1000} stroke={C.ink} strokeWidth={5} strokeDasharray="20 16" />
          <Dave f={f} x={230} y={920} s={1} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.8}, {at: pr, pose: 'facepalm', expr: 'sad'}]} />
          <Rich f={f} x={1690} y={920} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: fr, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          <Cup x={560} y={560} s={0.9 * P(A('o3')) * bump(sc, 0.15)} label="$4" f={f} />
          <Cup x={1360} y={560} s={0.9 * P(A('o3')) * bump(sc, 0.15)} label="$4" f={f} />
          <Box x={560} y={180} w={560} h={150} s={P(A('o3'))}>
            <Text y={-35} size={30} color={GRAY}>Dave's bank: $1</Text>
            <Text y={30} size={60} color={C.red}>cost: $39</Text>
          </Box>
          <Box x={1360} y={180} w={560} h={150} s={P(A('o3')) * bump(th, 0.1)}>
            <Text y={-35} size={30} color={GRAY}>{f >= th ? "neighbor's bank: $1,000" : "neighbor's bank: ?"}</Text>
            <G2 y={30} s={bump(fr, 0.25)}><Text size={60} color={f >= fr ? C.green : GRAY}>{f >= fr ? 'cost: $4' : 'cost: ?'}</Text></G2>
          </Box>
          <Pill x={960} y={780} w={360} text="same coffee" on={f >= sc} s={P(A('o3')) * bump(sc)} />
          <Pill x={960} y={890} w={360} text="same shop" on={f >= ss} s={P(A('o3')) * bump(ss)} />
          <Pill x={960} y={1000} w={500} text="different: money" on={f >= mo} s={P(A('o3')) * bump(mo)} color={C.greenLight} />
          <Stamp x={960} y={430} s={pop(f, pr)} text="BEING POOR COSTS EXTRA" size={52} r={-5} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'hidden'), w('o6', 'profits'), w('o6', 'stop')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['THE HIDDEN FEES', 'WHO PROFITS', 'HOW TO STOP PAYING'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <TollBooth s={0.6} y={90} label="FEE" />}
                {i === 1 && <Raccoon f={f} s={0.7} y={60} mood="greedy" holdCoin />}
                {i === 2 && <Shield s={0.8} y={0} top="NO" big="FEES" />}
                <Text y={210} size={34}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 the $39 coffee ============
  {
    const dc = w('c1b', 'decline');
    const pa = w('c1b', 'pay');
    const ld = w('c1b', 'lend');
    const od = w('c1b', 'overdraft');
    const wf = w('c1c', 'wells');
    const th = w('c1c', 'thirty');
    const bk = w('c1c', 'bankrate');
    const tw = w('c1c', 'twenty');
    q(dc, 'buzz', 0.5);
    q(pa, 'ding', 0.5);
    q(ld, 'coin', 0.5);
    q(od, 'stamp', 0.6);
    q(wf, 'pop', 0.4);
    q(th, 'cash', 0.6);
    q(tw, 'ding', 0.5);
    const sn = w('c1d', 'sneaky');
    const pm = w('c1d', 'permission');
    const op = w('c1d', 'opting');
    const tk = w('c1d', 'tick');
    const fg = w('c1d', 'forget');
    q(sn, 'boing', 0.4);
    q(pm, 'paper', 0.5);
    q(op, 'stamp', 0.5);
    q(tk, 'marker', 0.6);
    q(fg, 'poof', 0.5);
    const wd = w('c1e', 'watchdog');
    const tf = w('c1e', 'twenty');
    const td = w('c1e', 'three');
    const ln = w('c1f', 'loan');
    const fee = w('c1f', 'thirty');
    const sv = w('c1f', 'seventeen');
    q(wd, 'pop', 0.5);
    q(tf, 'coin', 0.5);
    q(td, 'tick', 0.5);
    q(ln, 'paper', 0.4);
    q(fee, 'thud', 0.6);
    q(sv, 'sting', 0.7);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={240} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: th, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={640} y={520} s={P(A('c1a'))}><CreditCard s={0.8} /></G2>
            <G2 x={640} y={250} s={P(A('c1a'))}><Text size={44}>$3 short...</Text></G2>
            <Arrow d="M 800 460 Q 900 330 1020 300" t={1} color={f >= dc ? C.red : '#C9C0AE'} />
            <Arrow d="M 800 580 Q 900 700 1020 740" t={1} color={f >= pa ? C.green : '#C9C0AE'} />
            <G2 x={1200} y={300} s={P(A('c1a')) * bump(dc)} o={lt(dc, 0.45)}>
              <rect x={-190} y={-60} width={380} height={120} rx={20} fill={f >= dc ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={46}>1. DECLINE</Text>
            </G2>
            <G2 x={1280} y={740} s={P(A('c1a')) * bump(ld)} o={lt(pa, 0.45)}>
              <rect x={-270} y={-60} width={540} height={120} rx={20} fill={f >= od ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={42}>{f >= od ? '2. OVERDRAFT (a loan)' : '2. PAY + LEND YOU $3'}</Text>
            </G2>
            <Box x={1530} y={500} w={560} h={170} s={P(A('c1a')) * bump(th, 0.1)} o={lt(wf, 0.5)}>
              <Text y={-40} size={30} color={GRAY}>Wells Fargo, Chase: per overdraft</Text>
              <Text y={30} size={66} color={C.red}>{f >= th ? '~$35' : '?'}</Text>
            </Box>
            <Box x={1530} y={950} w={560} h={140} s={P(A('c1a')) * bump(tw, 0.1)} o={lt(bk, 0.5)}>
              <Text y={-30} size={28} color={GRAY}>average, all banks (Bankrate)</Text>
              <Text y={25} size={54}>{f >= tw ? '$26.77' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={wf} text="Wells Fargo & Chase fee schedules; Bankrate 2025 checking survey: avg $26.77" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1d')) * bump(sn)}><Text size={54} color={C.red}>the sneaky part: the opt-in box</Text></G2>
            <Dave f={f} x={330} y={920} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.8}, {at: fg, pose: 'shrug', expr: 'neutral', look: 0.8}]} />
            <CheckForm x={1000} y={560} s={P(A('c1d')) * bump(tk, 0.06)} title="NEW ACCOUNT" lines={['Overdraft coverage for', 'debit card & ATM? (opt-in)', 'Paperless statements']} checked={f >= tk ? 1 : 0} />
            <G2 x={1580} y={330} s={P(A('c1d')) * bump(pm)} o={lt(pm, 0.45)}><Bubble text={'bank needs\nyour YES first'} size={40} tail="left" /></G2>
            <G2 x={1580} y={700} s={P(A('c1d')) * bump(op)} o={lt(op, 0.4)}><Text size={48} color={C.blue}>= "opting in"</Text></G2>
            <G2 x={1580} y={830} s={P(A('c1d')) * bump(fg)} o={lt(fg, 0.4)}><Text size={44} color={C.red}>...then forgotten</Text></G2>
            <SourceTag f={f} at={pm} text="CFPB, Regulation E (12 CFR 1005.17): opt-in required for ATM & one-time debit overdraft fees" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={110} s={P(A('c1e')) * bump(wd)}><Text size={46}>CFPB: a typical overdraft</Text></G2>
            <Pill x={500} y={280} w={620} text={f >= tf ? 'amount: $24 or less' : 'amount: ?'} on={f >= tf} s={P(A('c1e')) * bump(tf)} />
            <Pill x={500} y={410} w={620} text={f >= td ? 'paid back: ~3 days' : 'paid back: ?'} on={f >= td} s={P(A('c1e')) * bump(td)} />
            <Pill x={500} y={540} w={620} text={f >= fee ? 'fee: $34' : 'fee: ?'} on={f >= fee} s={P(A('c1e')) * bump(fee)} color="#FFE3EA" />
            <Calendar x={500} y={820} s={0.7 * P(A('c1e')) * bump(td, 0.15)} top="BORROWED" year="3 days" flip={0} />
            <G2 x={1400} y={120} s={P(A('c1e')) * bump(ln)}><Text size={44}>as a yearly interest rate (APR)</Text></G2>
            <line x1={1020} y1={900} x2={1800} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={1180} y={900} h={30} color={C.blue} label="credit card" value="~25%" w={220} />
            <Bar x={1580} y={900} h={ease(f, sv - 4, sv + 18, 60, 640)} color={C.red} label="that overdraft" value={f >= sv ? '~17,000%' : '?'} w={260} />
            <SourceTag f={f} at={tf} text="CFPB Data Point: Checking Account Overdraft (2014): $34 fee on $24 for 3 days ≈ 17,000% APR" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 raccoon at the bottom ============
  {
    const rc = w('c2a', 'raccoon');
    const jb = w('c2a', 'job');
    const bt = w('c2b', 'bottom');
    const zr = w('c2b', 'zero');
    const dp = w('c2b', 'dip');
    const tb = w('c2b', 'toll');
    q(rc, 'pop2', 0.6);
    q(jb, 'ding', 0.5);
    q(bt, 'whoosh_s', 0.4);
    q(zr, 'pop', 0.5);
    q(dp, 'sputter', 0.5);
    q(tb, 'cash', 0.7);
    const fv = w('c2c', 'five');
    const tt = w('c2c', 'twenty');
    const th = w('c2d', 'three');
    const sx = w('c2d', 'six');
    q(fv, 'stamp', 0.6);
    q(tt, 'tick', 0.4);
    q(th, 'cash', 0.6);
    q(sx, 'tick', 0.4);
    const nn = w('c2e', 'nine');
    const sv = w('c2e', 'seventy');
    const sm = w('c2f', 'same');
    const ov = w('c2f', 'over', 1);
    const le = w('c2f', 'least');
    q(nn, 'pop', 0.6);
    q(sv, 'stamp', 0.7);
    q(sm, 'ding', 0.5);
    q(ov, 'cash', 0.5);
    q(le, 'sting', 0.5);
    const lvl = f < dp ? ease(f, A('c2a') + 20, bt + 20, 120, 30) : ease(f, dp, dp + 20, 30, -40);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2a')) * bump(jb)}><Text size={52}>{f >= jb ? "the raccoon's new job" : 'remember the raccoon?'}</Text></G2>
            <AccountMeter x={480} y={640} s={1.05 * P(A('c2a'))} level={lvl} label="DAVE'S ACCOUNT" />
            <G2 x={480} y={900} o={lt(dp, 0)}><Text size={40} color={C.red}>below zero!</Text></G2>
            <TollBooth x={1180} y={900} s={1.1 * P(A('c2a')) * bump(tb, 0.08)} barUp={f >= tb ? 0 : 1} label="OVERDRAFT" />
            <Raccoon f={f} x={1600} y={880} s={1.1 * P(A('c2a')) * bump(rc, 0.2)} mood={f >= tb ? 'greedy' : 'sneaky'} holdCoin={f >= tb} />
            <G2 x={1400} y={330} s={P(A('c2a')) * bump(zr)} o={lt(zr, 0.4)}><Bubble text={f >= tb ? '$35, please!' : 'I live at $0'} size={46} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={120} s={P(A('c2c'))}><Text size={46}>overdraft + bounced payment fees</Text></G2>
            <G2 x={700} y={180} s={P(A('c2c'))}><Text size={30} color={GRAY}>banks with over $1 billion in assets</Text></G2>
            <line x1={260} y1={880} x2={1140} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={480} y={880} h={ease(f, fv - 4, fv + 16, 60, 580)} color={C.red} label="all of 2023" value={f >= fv ? '$5.8B' : '?'} w={260} />
            <Bar x={920} y={880} h={ease(f, th - 4, th + 16, 60, 296)} color={C.red} label="first half 2026" value={f >= th ? '~$3B' : '?'} w={260} />
            <Raccoon f={f} x={1500} y={880} s={1.2 * P(A('c2c')) * bump(th, 0.1)} mood="greedy" holdCoin />
            <MoneyStack x={1700} y={960} n={f >= th ? 8 : 4} s={0.8} />
            <SourceTag f={f} at={fv} text={f < th ? 'CFPB Data Spotlight (Apr 2024): $5.8B in 2023' : 'FFIEC Call Reports, H1 2026: $2.96B (512 banks >$1B)'} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={110} s={P(A('c2e'))}><Text size={44}>100 bank accounts</Text></G2>
            <People x={560} y={640} s={1.05 * P(A('c2e')) * bump(nn, 0.05)} hot={9} lit={f >= nn ? 1 : 0} />
            <G2 x={560} y={1000} s={P(A('c2e')) * bump(nn)} o={lt(nn, 0.4)}><Text size={44} color={C.red}>9 accounts (10+ overdrafts a year)</Text></G2>
            <Box x={1420} y={330} w={680} h={280} s={P(A('c2e')) * bump(sv, 0.12)} fill={f >= sv ? C.yellow : '#fff'}>
              <Text y={-80} size={34} color={GRAY}>share of ALL overdraft fees they paid</Text>
              <Text y={40} size={140} color={C.red}>{f >= sv ? '79%' : '?'}</Text>
            </Box>
            <Raccoon f={f} x={1250} y={900} s={0.9 * P(A('c2e'))} mood={f >= sm ? 'greedy' : 'sneaky'} holdCoin={f >= ov} />
            <G2 x={1620} y={720} s={P(A('c2e')) * bump(sm)} o={lt(sm, 0.4)}><Text size={42}>same people,</Text><Text y={56} size={42}>over and over</Text></G2>
            <G2 x={1620} y={900} s={P(A('c2e')) * bump(le)} o={lt(le, 0.4)}><Text size={40} color={C.red}>the ones with the least</Text></G2>
            <SourceTag f={f} at={nn} text="CFPB Data Point: Frequent Overdrafters (Aug 2017)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 boots theory ============
  {
    const fn = w('c3a', 'fantasy');
    const ny = w('c3b', 'nineteen');
    const tp = w('c3b', 'terry');
    const mn = w('c3b', 'men');
    const sv = w('c3b', 'sam');
    const bo = w('c3b', 'boots');
    q(fn, 'dream', 0.4);
    q(ny, 'flip', 0.5);
    q(tp, 'paper', 0.5);
    q(mn, 'pop', 0.5);
    q(sv, 'pop2', 0.5);
    q(bo, 'thud', 0.5);
    const gd = w('c3c', 'fifty');
    const tn = w('c3c', 'ten');
    const ch = w('c3d', 'ten');
    const lk = w('c3d', 'leak');
    const an = [w('c3d', 'another'), w('c3d', 'another', 1), w('c3d', 'another', 2)];
    const r50 = w('c3e', 'fifty');
    const r100 = w('c3e', 'hundred');
    const wt = w('c3e', 'wet');
    q(gd, 'cash', 0.6);
    q(tn, 'ding', 0.5);
    q(ch, 'coin', 0.5);
    q(lk, 'sputter', 0.5);
    an.forEach((x) => q(x, 'pop', 0.5));
    q(r50, 'ding', 0.5);
    q(r100, 'stamp', 0.7);
    q(wt, 'trombone', 0.5);
    const th = w('c3f', 'boots');
    const bt = w('c3f', 'bad');
    q(th, 'stamp', 0.6);
    q(bt, 'ding', 0.5);
    const nb = an.filter((x) => f >= x).length;
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <OldFilm f={f} o={0.5} />
          <Svg>
            <BookCover x={560} y={560} s={1.25 * P(A('c3a')) * bump(mn, 0.08)} title="MEN AT ARMS" sub="Terry Pratchett" />
            <G2 x={560} y={170} s={P(A('c3a')) * bump(ny, 0.2)}><Text size={56}>{f >= ny ? '1993 · a fantasy novel' : 'a fantasy novel'}</Text></G2>
            <Stick f={f} x={1260} y={900} s={1.2} acc={['cap']} seed={62} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: -0.6}, {at: bo, pose: 'point_r', expr: 'think', look: 0.8}]} />
            <G2 x={1260} y={330} s={P(A('c3a')) * bump(sv)} o={lt(sv, 0.45)}><Bubble text={f >= bo ? "it's all about\nBOOTS" : 'city guard\nSam Vimes'} size={42} tail="down" /></G2>
            <G2 x={1650} y={840} s={P(A('c3a')) * bump(bo, 0.25)} o={lt(bo, 0.4)}><Boot s={0.9} /></G2>
            <SourceTag f={f} at={tp} text="Terry Pratchett, Men at Arms (Discworld, 1993): Sam Vimes 'Boots' theory" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <line x1={960} y1={150} x2={960} y2={1000} stroke={C.ink} strokeWidth={5} strokeDasharray="20 16" />
            <Rich f={f} x={220} y={822} s={1} keys={[{at: 0, pose: 'hips', expr: 'happy', look: 0.8}, {at: r50, pose: 'thumbs', expr: 'grin'}]} />
            <Dave f={f} x={1700} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: lk, pose: 'shrug', expr: 'worried', look: -0.8}, {at: wt, pose: 'facepalm', expr: 'sad'}]} sweat={f >= wt} />
            <G2 x={560} y={560} s={1.3 * P(A('c3c')) * bump(gd, 0.12)}><Boot /></G2>
            <G2 x={560} y={200} s={P(A('c3c')) * bump(gd)}><Text size={60} color={C.green}>GOOD: $50</Text><Text y={60} size={40} color={f >= tn ? C.ink : GRAY}>lasts 10 years</Text></G2>
            {[0, 1, 2, 3].map((i) => (
              <G2 key={i} x={1180 + (i % 2) * 230} y={500 + Math.floor(i / 2) * 250} s={0.8 * P(A('c3c')) * (i === 0 ? 1 : i <= nb ? pop(f, an[i - 1]) : 1)} o={i === 0 || i <= nb ? 1 : 0.25}>
                <Boot cheap leak={f >= lk ? 1 : 0} f={f} />
              </G2>
            ))}
            <G2 x={1300} y={200} s={P(A('c3c')) * bump(ch)} o={lt(ch, 0.5)}><Text size={60} color={C.red}>CHEAP: $10</Text><Text y={60} size={40} color={f >= lk ? C.red : GRAY}>leaks in a season or two</Text></G2>
            <Box x={560} y={900} w={420} h={110} s={P(A('c3c')) * bump(r50, 0.2)} o={lt(r50, 0.45)}><Text size={46}>10 years: {f >= r50 ? '$50' : '?'}</Text></Box>
            <Box x={1300} y={900} w={460} h={110} s={P(A('c3c')) * bump(r100, 0.2)} o={lt(r100, 0.45)} fill={f >= r100 ? '#FFE3EA' : '#fff'}><Text size={46} color={C.red}>10 years: {f >= r100 ? '$100' : '?'}</Text></Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={200} s={P(A('c3f')) * bump(th, 0.15)} text="THE BOOTS THEORY" size={80} color={C.blue} r={-3} />
            <Boot x={560} y={700} s={1.4 * P(A('c3f'))} />
            <Boot x={1360} y={700} s={1.4 * P(A('c3f'))} cheap leak={1} f={f} />
            <Text x={560} y={880} size={44} color={C.green}>can afford it → pay less</Text>
            <G2 x={1360} y={880} s={bump(bt)} o={lt(bt, 0.5)}><Text size={44} color={C.red}>can't afford it → pay MORE</Text></G2>
            <Text x={960} y={560} size={120}>≠</Text>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 smaller sizes ============
  {
    const tpw = w('c4a', 'toilet');
    const tb = w('c4b', 'thirty');
    const tf = w('c4b', 'twenty');
    const fp = w('c4b', 'four');
    const fv = w('c4b', 'five');
    const tn = w('c4b', 'ten');
    const fr = w('c4b', 'friday');
    const by = w('c4b', 'four', 1);
    q(tpw, 'pop', 0.5);
    q(tb, 'pop2', 0.5);
    q(tf, 'cash', 0.5);
    q(fp, 'pop2', 0.5);
    q(fv, 'coin', 0.5);
    q(tn, 'coin', 0.4);
    q(fr, 'tick', 0.4);
    q(by, 'ding', 0.5);
    const ml = w('c4c', 'millions');
    const fvh = w('c4c', 'five');
    q(ml, 'paper', 0.5);
    q(fvh, 'stamp', 0.6);
    const rt = w('c4d', 'rent');
    const tv = w('c4d', 'tv');
    const sp = w('c4d', 'five');
    const dh = w('c4d', 'doesnt');
    q(rt, 'pop', 0.5);
    q(tv, 'pop2', 0.5);
    q(sp, 'cash', 0.5);
    q(dh, 'buzz', 0.5);
    const tw = w('c4e', 'twenty');
    const sv = w('c4e', 'seventy');
    const ot = w('c4e', 'one');
    const th = w('c4e', 'three');
    const ft = w('c4f', 'federal');
    const mo = w('c4f', 'most');
    const fl = w('c4f', 'full');
    q(tw, 'coin', 0.5);
    q(sv, 'tick', 0.5);
    q(ot, 'stamp', 0.7);
    q(th, 'trombone', 0.5);
    q(ft, 'paper', 0.5);
    q(mo, 'ding', 0.5);
    q(fl, 'thud', 0.5);
    const weeks = Math.round(ease(f, sv - 10, sv + 20, 0, 78));
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={100} s={P(A('c4a')) * bump(tpw)}><Text size={52}>the toilet paper aisle</Text></G2>
            <TPPack x={500} y={620} s={1.05 * P(A('c4a')) * bump(tb, 0.08)} n={30} color={f >= by ? '#E4DCCB' : '#DCE9FF'} />
            <G2 x={500} y={210} s={P(A('c4a')) * bump(tf)}><Text size={48}>30-pack: {f >= tf ? '$24' : '?'}</Text><Text y={54} size={36} color={C.green}>= 80¢ a roll</Text></G2>
            <TPPack x={1120} y={620} s={1.2 * P(A('c4a')) * bump(by, 0.2)} n={4} color={f >= by ? C.yellow : '#DCE9FF'} />
            <G2 x={1120} y={210} s={P(A('c4a')) * bump(fv)}><Text size={48}>4-pack: {f >= fv ? '$5' : '?'}</Text><Text y={54} size={36} color={C.red}>= $1.25 a roll</Text></G2>
            <Dave f={f} x={1620} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: by, pose: 'shrug', expr: 'sad', look: -0.8}]} />
            <G2 x={1620} y={380} s={P(A('c4a')) * bump(tn)} o={lt(tn, 0.45)}><Bubble text={f >= fr ? '$10 until Friday...' : 'my wallet: ?'} size={38} tail="down" /></G2>
            <Box x={800} y={930} w={760} h={120} s={P(A('c4a')) * bump(fvh, 0.12)} o={lt(ml, 0.4)} fill={f >= fvh ? C.yellow : '#fff'}>
              <Text size={40}>low-income families pay {f >= fvh ? '+5.5%' : '?'} per roll</Text>
            </Box>
            <SourceTag f={f} at={ml} text="Orhun & Palazzolo, 'Frugality Is Hard to Afford', J. of Marketing Research (2019)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c4d')) * bump(rt)}><Text size={52}>rent-to-own</Text></G2>
            <TV x={400} y={430} s={1.1 * P(A('c4d')) * bump(tv, 0.12)} />
            <G2 x={400} y={660} s={P(A('c4d')) * bump(sp)}><Text size={52}>store price: {f >= sp ? '$500' : '?'}</Text></G2>
            <G2 x={400} y={740} s={bump(dh)} o={lt(dh, 0.35)}><Text size={40} color={C.red}>Dave has: $0 saved</Text></G2>
            <Dave f={f} x={400} y={1060} s={0.6} keys={[{at: 0, pose: 'shrug', expr: 'worried'}, {at: th, pose: 'facepalm', expr: 'sad'}]} />
            <Shop x={1350} y={560} s={0.6 * P(A('c4d'))} name="RENT-TO-OWN" />
            <G2 x={1350} y={180} s={P(A('c4d')) * bump(tw, 0.15)} r={-4}>
              <rect x={-260} y={-50} width={520} height={100} rx={16} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={3} size={50}>ONLY $20 A WEEK!</Text>
            </G2>
            <Box x={1350} y={710} w={640} h={130} s={P(A('c4d')) * bump(sv, 0.1)} o={lt(tw, 0.45)}>
              <Text size={48}>$20 × {weeks} weeks = <tspan fill={C.red}>{f >= ot ? '$1,560' : '?'}</tspan></Text>
            </Box>
            {[0, 1, 2].map((i) => <TV key={i} x={1080 + i * 270} y={930} s={0.6 * P(A('c4d')) * bump(th, 0.2)} o={f >= th ? 1 : i === 0 ? 0.8 : 0.25} />)}
            <G2 x={400} y={880} s={bump(mo)} o={lt(ft, 0)}><Text size={36} color={GRAY}>FTC: most customers</Text><Text y={46} size={36} color={C.red}>end up buying it</Text></G2>
            <SourceTag f={f} at={ft} text="FTC testimony on rent-to-own (2001): 70% of items end up purchased · $20 × 78 = $1,560" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 payday & check cashing ============
  {
    const py = w('c5a', 'payday');
    const pl = w('c5b', 'payday');
    const th = w('c5b', 'three');
    const tw = w('c5b', 'two');
    const ff = w('c5b', 'fifteen');
    q(py, 'tick', 0.5);
    q(pl, 'pop', 0.5);
    q(th, 'cash', 0.6);
    q(tw, 'flip', 0.5);
    q(ff, 'coin', 0.5);
    const cz = w('c5c', 'crazy');
    const an = w('c5c', 'annual');
    const fh = w('c5c', 'four');
    q(cz, 'boing', 0.4);
    q(an, 'whoosh_s', 0.4);
    q(fh, 'sting', 0.7);
    const cc = w('c5d', 'credit');
    const ag = w('c5d', 'again');
    const hm = w('c5d', 'hamster');
    q(cc, 'pop', 0.5);
    q(ag, 'boing', 0.5);
    q(hm, 'boing', 0.6);
    const ck = w('c5e', 'check');
    const one = w('c5e', 'one');
    const tn = w('c5e', 'ten');
    const ev = w('c5e', 'every');
    q(ck, 'pop', 0.5);
    q(one, 'coin', 0.5);
    q(tn, 'cash', 0.6);
    q(ev, 'thud', 0.5);
    const fd = w('c5f', 'f');
    const fv = w('c5f', 'five');
    const rs = w('c5f', 'reason');
    const mb = w('c5f', 'minimum');
    q(fd, 'paper', 0.5);
    q(fv, 'stamp', 0.6);
    q(rs, 'ding', 0.5);
    q(mb, 'buzz', 0.5);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Shop x={560} y={822} s={0.85 * P(A('c5a')) * bump(pl, 0.06)} name="PAYDAY LOANS" />
            <Dave f={f} x={1030} y={822} s={1.05} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: th, pose: 'hold', expr: 'happy', look: -0.8}, {at: fh, pose: 'shock', expr: 'shock', look: 0.8}]} handItem={f >= th ? <MoneyStack n={3} s={0.5} /> : undefined} />
            <Calendar x={180} y={260} s={0.6 * P(A('c5a')) * bump(py, 0.15)} top="PAYDAY IN" year={f >= tw ? '2 wks' : '7 days'} flip={0} />
            <Box x={1520} y={260} w={640} h={330} s={P(A('c5a'))}>
              <Text x={-280} y={-100} size={40} anchor="start">borrow</Text>
              <Text x={280} y={-100} size={40} anchor="end">{f >= th ? '$350' : '?'}</Text>
              <Text x={-280} y={-20} size={40} anchor="start" color={f >= ff ? C.red : GRAY}>fee ($15 per $100)</Text>
              <Text x={280} y={-20} size={40} anchor="end" color={C.red}>{f >= ff ? '$52.50' : '?'}</Text>
              <line x1={-280} y1={30} x2={280} y2={30} stroke={C.ink} strokeWidth={5} />
              <Text y={100} size={56}>owe in 2 weeks: {f >= ff ? '$402.50' : '?'}</Text>
            </Box>
            <line x1={1220} y1={900} x2={1840} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={1370} y={900} h={ease(f, cz - 4, cz + 12, 30, 60)} color={GRAY} label="fee, 2 weeks" value="15%" w={200} />
            <Bar x={1680} y={900} h={ease(f, fh - 4, fh + 16, 40, 440)} color={C.red} label="per year (APR)" value={f >= fh ? '~400%' : '?'} w={220} />
            <SourceTag f={f} at={ff} text="CFPB: typical 2-week payday loan, $15 per $100 = almost 400% APR" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={160} y1={860} x2={760} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={320} y={860} h={ease(f, cc - 4, cc + 12, 30, 60)} color={C.blue} label="credit card" value="~25%" w={200} />
            <Bar x={600} y={860} h={500} color={C.red} label="payday loan" value="~400%" w={220} />
            <HamsterWheel x={1300} y={560} s={1.5 * P(A('c5d')) * bump(hm, 0.08)} f={f >= ag ? f * 2 : f * 0.4} />
            <Dave f={f} x={1300} y={740} s={0.75} keys={[{at: 0, pose: 'panic', expr: 'worried'}]} walk={f >= ag} sweat={f >= hm} />
            <G2 x={1300} y={130} s={P(A('c5d')) * bump(ag)} o={lt(ag, 0.45)}><Text size={48} color={C.red}>can't repay → borrow again</Text></G2>
            <G2 x={1300} y={980} s={P(A('c5d')) * bump(hm)} o={lt(hm, 0.4)}><Text size={48}>the hamster wheel</Text></G2>
            <SourceTag f={f} at={ag} text="CFPB: most payday borrowers can't repay in two weeks and roll over or re-borrow" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Shop x={380} y={900} s={0.6 * P(A('c5e')) * bump(ck, 0.08)} name="CHECK CASHING" />
            <Paycheck x={380} y={320} s={0.9 * P(A('c5e')) * bump(one, 0.1)} amount="$1,000" cut={f >= tn ? 0.1 : f >= one ? 0.01 : 0} />
            <G2 x={380} y={560} s={P(A('c5e')) * bump(tn)} o={lt(one, 0.4)}><Text size={44} color={C.red}>fee: {f >= tn ? '1% to 10% ($10-$100)' : '1% ...'}</Text></G2>
            <G2 x={380} y={620} s={bump(ev)} o={lt(ev, 0)}><Text size={40} color={C.red}>every payday</Text></G2>
            <Box x={1300} y={300} w={780} h={300} s={P(A('c5e')) * bump(fv, 0.08)} o={lt(fd, 0.5)}>
              <Text y={-90} size={34} color={GRAY}>U.S. households with NO bank account</Text>
              <Text y={10} size={96} color={C.red}>{f >= fv ? '5.6 million' : '?'}</Text>
              <Text y={95} size={36} color={GRAY}>(4.2% of households)</Text>
            </Box>
            <Box x={1300} y={700} w={780} h={220} s={P(A('c5e')) * bump(mb, 0.08)} o={lt(rs, 0.45)} fill={f >= mb ? C.yellow : '#fff'}>
              <Text y={-50} size={34} color={GRAY}>#1 reason</Text>
              <Text y={20} size={44}>{f >= mb ? 'not enough money for the' : '?'}</Text>
              <Text y={70} size={44}>{f >= mb ? 'minimum balance' : ''}</Text>
            </Box>
            <SourceTag f={f} at={fd} text="FDIC National Survey of Unbanked & Underbanked Households, 2023" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 credit ============
  {
    const cs = w('c6a', 'score');
    const tm = w('c6b', 'trust');
    const lo = w('c6b', 'lower');
    const cs2 = w('c6b', 'case');
    q(cs, 'pop', 0.5);
    q(tm, 'ding', 0.5);
    q(lo, 'sputter', 0.4);
    q(cs2, 'pop2', 0.4);
    const ci = w('c6c', 'insurance');
    const tw = w('c6c', 'twice');
    const sc = w('c6c', 'car', 1);
    const cl = w('c6c', 'clean');
    q(ci, 'pop', 0.5);
    q(tw, 'stamp', 0.7);
    q(sc, 'pop2', 0.4);
    q(cl, 'ding', 0.4);
    const fa = w('c6d', 'fair');
    const pr = w('c6d', 'predict');
    const fs = w('c6d', 'federal');
    const cal = w('c6d', 'california');
    q(fa, 'whoosh_s', 0.4);
    q(pr, 'ding', 0.5);
    q(fs, 'paper', 0.4);
    q(cal, 'stamp', 0.5);
    const dps = [w('c6e', 'apartment'), w('c6e', 'electricity'), w('c6e', 'phone')];
    const dp = w('c6e', 'deposit');
    const le = w('c6e', 'least');
    q(dp, 'cash', 0.5);
    dps.forEach((x) => q(x, 'pop', 0.5));
    q(le, 'sting', 0.4);
    const score = f < lo ? 700 : ease(f, lo, lo + 30, 700, 520);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6a')) * bump(tm)}><Text size={56}>{f >= tm ? 'your credit score = a trust meter' : 'your credit score'}</Text></G2>
            <ScoreGauge x={620} y={620} s={1.05 * P(A('c6a')) * bump(cs, 0.06)} score={score} label="TRUST METER" />
            <Dave f={f} x={1150} y={920} s={1.05} keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.8}, {at: lo, pose: 'shock', expr: 'worried', look: -0.8}]} />
            <Banker f={f} x={1650} y={920} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: -0.8}, {at: cs2, pose: 'present', expr: 'smug', look: -0.8}]} />
            <G2 x={1650} y={420} s={P(A('c6a')) * bump(cs2)} o={lt(lo, 0.45)}><Bubble text={f >= cs2 ? 'lower score?\nhigher price.\njust in case.' : 'let me check\nyour score...'} size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={110} s={P(A('c6c')) * bump(ci)}><Text size={48}>car insurance, same driver</Text></G2>
            <Car x={640} y={320} s={1.0 * P(A('c6c')) * bump(sc, 0.1)} />
            <G2 x={640} y={440} s={bump(cl)} o={lt(cl, 0.45)}><Text size={36} color={C.green}>same car · clean record</Text></G2>
            <line x1={260} y1={930} x2={1020} y2={930} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={450} y={930} h={200} color={C.green} label="excellent credit" value="$" w={240} />
            <Bar x={830} y={930} h={ease(f, tw - 4, tw + 16, 210, 400)} color={C.red} label="poor credit" value={f >= tw ? '~2x' : '?'} w={240} />
            <Box x={1450} y={380} w={720} h={260} s={P(A('c6c')) * bump(pr, 0.08)} o={lt(fa, 0.45)}>
              <Text y={-80} size={36} color={GRAY}>to be fair</Text>
              <Text y={-10} size={40}>insurers: credit predicts claims</Text>
              <Text y={60} size={36} color={f >= fs ? C.blue : GRAY}>{f >= fs ? 'a federal (FTC) study agreed' : '...'}</Text>
            </Box>
            <Box x={1450} y={720} w={720} h={200} s={P(A('c6c')) * bump(cal, 0.1)} o={lt(cal, 0.4)}>
              <Text y={-40} size={34} color={GRAY}>banned in a few states</Text>
              <Text y={30} size={50}>CA · HI · MA</Text>
            </Box>
            <SourceTag f={f} at={tw} text="Consumer Federation of America (2023); FTC report to Congress (2007)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c6e')) * bump(dp)}><Text size={52}>no credit? pay a bigger DEPOSIT</Text></G2>
            {['APARTMENT', 'ELECTRICITY', 'PHONE'].map((l, i) => (
              <G2 key={l} x={380 + i * 580} y={560} s={P(A('c6e')) * bump(dps[i], 0.08)} o={f >= dps[i] ? 1 : 0.45}>
                <Frame w={500} h={520}>
                  {i === 0 && <House s={0.5} y={120} />}
                  {i === 1 && <Bolt s={1.3} y={-20} />}
                  {i === 2 && <Phone s={0.6} y={-20} title="PHONE" value="$$" />}
                  <Text y={200} size={40}>{l}</Text>
                </Frame>
              </G2>
            ))}
            <Dave f={f} x={1740} y={1060} s={0.6} keys={[{at: 0, pose: 'shrug', expr: 'worried'}, {at: le, pose: 'facepalm', expr: 'sad'}]} />
            <G2 x={960} y={930} s={P(A('c6e')) * bump(le)} o={lt(le, 0.4)}><Text size={46} color={C.red}>money you need, when you have the least</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 who profits ============
  {
    const fm = w('c7a', 'money');
    const pv = [w('c7b', 'banks'), w('c7b', 'payday'), w('c7b', 'rent'), w('c7b', 'check')];
    q(fm, 'coin', 0.5);
    pv.forEach((x) => q(x, 'cash', 0.5));
    const fa = w('c7c', 'fair');
    const cs = [w('c7c', 'cost'), w('c7c', 'never'), w('c7c', 'rent')];
    q(fa, 'whoosh_s', 0.4);
    cs.forEach((x) => q(x, 'pop2', 0.45));
    const co = w('c7d', 'capital');
    const dr = w('c7d', 'dropped');
    const fn = w('c7d', 'fine');
    q(co, 'pop', 0.5);
    q(dr, 'stamp', 0.6);
    q(fn, 'ding', 0.5);
    const y24 = w('c7e', 'twenty');
    const cg = w('c7e', 'congress');
    const cn = w('c7e', 'cancelled');
    const pol = w('c7e', 'political');
    const nb = w('c7e', 'numbers');
    q(y24, 'paper', 0.5);
    q(cg, 'pop', 0.5);
    q(cn, 'rip', 0.6);
    q(pol, 'dream', 0.4);
    q(nb, 'ding', 0.5);
    const cur = pv.filter((x) => f >= x).length;
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c7a')) * bump(fm)}><Text size={54}>follow the money: who profits?</Text></G2>
            {['BANKS', 'PAYDAY LENDERS', 'RENT-TO-OWN', 'CHECK CASHERS'].map((l, i) => (
              <G2 key={l} x={270 + i * 460} y={520} s={P(A('c7a')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
                <Frame w={420} h={520}>
                  {i === 0 && <Bank s={0.3} y={110} label="BANK" />}
                  {i === 1 && <Calendar s={0.5} y={-20} top="PAYDAY" year="$$$" flip={0} />}
                  {i === 2 && <TV s={0.8} y={-30} />}
                  {i === 3 && <Paycheck s={0.55} y={-30} amount="$1,000" cut={0.1} />}
                  <Text y={200} size={34}>{l}</Text>
                  <Text y={150} size={28} color={C.red}>{['overdraft fees', 'rollovers', 'weekly payments', 'every paycheck'][i]}</Text>
                </Frame>
              </G2>
            ))}
            <Raccoon f={f} x={960} y={1010} s={0.6 * P(A('c7a'))} mood="greedy" holdCoin={cur >= 4} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={120} s={P(A('c7c')) * bump(fa)}><Text size={52}>to be fair...</Text></G2>
            {['small loans cost money to make', 'some borrowers never pay back', 'an overdraft can save your rent'].map((l, i) => (
              <G2 key={l} x={520} y={290 + i * 140} s={P(A('c7c')) * bump(cs[i])} o={lt(cs[i], 0.4)}>
                <rect x={-400} y={-50} width={800} height={100} rx={20} fill={f >= cs[i] ? '#DCE9FF' : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={3} size={38}>{l}</Text>
              </G2>
            ))}
            <Banker f={f} x={520} y={1000} s={0.75} keys={[{at: 0, pose: 'present', expr: 'neutral', look: 0.8}]} />
            <Box x={1420} y={420} w={700} h={400} s={P(A('c7c')) * bump(dr, 0.08)} o={lt(co, 0.45)}>
              <Text y={-140} size={34} color={GRAY}>but some big banks...</Text>
              <Text y={-60} size={56}>Capital One · Citi</Text>
              <G2 y={40} s={bump(dr, 0.2)}><Text size={48} color={f >= dr ? C.green : GRAY}>{f >= dr ? '$0 overdraft fees' : '?'}</Text></G2>
              <Text y={130} size={40} color={f >= fn ? C.green : GRAY}>{f >= fn ? '...and still doing fine' : ''}</Text>
            </Box>
            <Stamp x={1420} y={800} s={pop(f, dr)} text="NO OVERDRAFT FEES" size={44} color={C.green} r={-4} />
            <SourceTag f={f} at={co} text="Bankrate: banks that have cut or eliminated overdraft fees" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Pill x={520} y={250} w={720} text="2024: CFPB rule caps overdraft fees" on={f >= y24} s={P(A('c7e')) * bump(y24)} color={C.greenLight} size={36} />
            <Arrow d="M 520 310 L 520 400" t={f >= cg ? 1 : 0.3} />
            <Pill x={520} y={470} w={720} text="2025: Congress cancels it" on={f >= cn} s={P(A('c7e')) * bump(cn)} color="#FFE3EA" size={36} />
            <XMark x={880} y={250} s={0.5 * pop(f, cn)} />
            <Scale x={1400} y={700} s={1.1 * P(A('c7e')) * bump(pol, 0.06)} tilt={Math.sin(f / 20) * 0.1} left="CAP" right="NO CAP" />
            <G2 x={1400} y={180} s={P(A('c7e')) * bump(pol)} o={lt(pol, 0.45)}><Text size={48}>a political question</Text></G2>
            <G2 x={520} y={750} s={P(A('c7e')) * bump(nb)} o={lt(nb, 0.4)}><Text size={52} color={C.green}>now you know the numbers</Text></G2>
            <Dave f={f} x={520} y={1060} s={0.6} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: nb, pose: 'thumbs', expr: 'happy'}]} />
            <SourceTag f={f} at={cg} text="Congressional Research Service IN12513: Congress repeals CFPB overdraft rule (2025)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 myth ============
  {
    const bd = w('c8a', 'bad');
    const np = w('c8a', 'nope');
    q(bd, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    const ms = w('c8b', 'mistake');
    const th = w('c8b', 'three');
    const nt = w('c8c', 'notice');
    const nth = w('c8c', 'nothing');
    const tf = w('c8c', 'thirty');
    const df = w('c8c', 'different');
    q(ms, 'pop', 0.5);
    q(th, 'coin', 0.5);
    q(nt, 'ding', 0.4);
    q(nth, 'ding', 0.5);
    q(tf, 'thud', 0.7);
    q(df, 'sting', 0.5);
    const tp = w('c8d', 'toilet');
    const kn = w('c8d', 'knew');
    const td = w('c8d', 'today');
    q(tp, 'pop', 0.5);
    q(kn, 'ding', 0.5);
    q(td, 'buzz', 0.4);
    const st = w('c8e', 'stress');
    const br = w('c8e', 'brain');
    const pz = w('c8e', 'puzzle');
    const al = w('c8e', 'alarm');
    q(st, 'thud', 0.5);
    q(br, 'pop', 0.5);
    q(pz, 'pop2', 0.4);
    q(al, 'buzz', 0.6);
    scene(A('c8a'), () =>
      f < A('c8b') ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <DreamFrame label="WHAT MOST PEOPLE THINK" />
            <Dave f={f} x={600} y={880} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: 0.8}]} />
            <G2 x={1150} y={440} s={P(A('c8a')) * bump(bd)}><Bubble text={'"poor people are just\nbad with money"'} size={46} tail="left" /></G2>
            <Stamp x={1150} y={760} s={pop(f, np)} text="NOPE" size={110} r={-8} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={960} y1={160} x2={960} y2={1000} stroke={C.ink} strokeWidth={5} strokeDasharray="20 16" />
            <G2 x={960} y={100} s={P(A('c8b')) * bump(ms)}><Text size={48}>same mistake: overspend by {f >= th ? '$3' : '?'}</Text></G2>
            <Rich f={f} x={260} y={900} s={1} keys={[{at: 0, pose: 'relax', expr: 'happy', look: 0.8}, {at: nt, pose: 'thumbs', expr: 'grin'}]} />
            <AccountMeter x={620} y={640} s={0.85 * P(A('c8b'))} level={f >= th ? 97 : 100} label="$1,000 → $997" />
            <Box x={560} y={960} w={520} h={110} s={P(A('c8b')) * bump(nth, 0.2)} o={lt(nth, 0.45)} fill={f >= nth ? C.greenLight : '#fff'}><Text size={50}>cost: {f >= nth ? '$0' : '?'}</Text></Box>
            <Dave f={f} x={1660} y={900} s={1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: -0.8}, {at: tf, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <AccountMeter x={1300} y={640} s={0.85 * P(A('c8b'))} level={f >= th ? -30 : 10} label="$1 → -$2" />
            <Raccoon f={f} x={1560} y={560} s={0.6 * P(A('c8b')) * bump(tf, 0.2)} mood={f >= tf ? 'greedy' : 'sneaky'} holdCoin={f >= tf} />
            <Box x={1360} y={960} w={520} h={110} s={P(A('c8b')) * bump(tf, 0.2)} o={lt(tf, 0.45)} fill={f >= tf ? '#FFE3EA' : '#fff'}><Text size={50} color={C.red}>cost: {f >= tf ? '$35' : '?'}</Text></Box>
            <Stamp x={960} y={250} s={pop(f, df)} text="SAME MISTAKE · DIFFERENT PRICE" size={40} r={-3} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <TPPack x={560} y={640} s={1.05 * P(A('c8d')) * bump(tp, 0.08)} n={30} />
            <G2 x={560} y={200} s={P(A('c8d')) * bump(kn)} o={lt(kn, 0.5)}><Text size={50} color={C.green}>they KNEW: better deal</Text></G2>
            <Dave f={f} x={1250} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: td, pose: 'pockets', expr: 'sad', look: -0.8}]} pockets={f >= td ? 1 : 0} />
            <G2 x={1560} y={400} s={P(A('c8d')) * bump(td)} o={lt(td, 0.45)}><Bubble text={'but I need $24\nTODAY'} size={44} tail="left" /></G2>
            <G2 x={960} y={1000} s={P(A('c8d'))}><Text size={40} color={GRAY}>the problem is cash, not knowledge</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={500} y={440} s={1.3 * P(A('c8e')) * bump(br, 0.1)}><Brain glow={f >= br ? 0.4 : 0} /></G2>
            <G2 x={500} y={140} s={P(A('c8e')) * bump(st)}><Text size={52}>money stress eats brain power</Text></G2>
            <G2 x={500} y={690} s={P(A('c8e')) * bump(pz)} o={lt(pz, 0.45)}><Text size={44}>every dollar = a puzzle</Text></G2>
            <G2 x={500} y={770} o={lt(pz, 0.45)}><Text size={40} color={GRAY}>(Mullainathan & Shafir, "Scarcity")</Text></G2>
            <Dave f={f} x={1300} y={900} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'think', look: 0.6}, {at: al, pose: 'panic', expr: 'shock'}]} sweat={f >= al} />
            <G2 x={1300} y={880} s={P(A('c8e'))}><rect x={-140} y={-20} width={280} height={60} rx={8} fill="#fff" stroke={C.ink} strokeWidth={5} /><Text y={12} size={28}>HOMEWORK</Text></G2>
            <Alarm x={1650} y={330} s={1.1 * P(A('c8e'))} f={f} on={f >= al ? 1 : 0} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const no = w('c9b', 'no');
    const bo = w('c9c', 'bank');
    const fv = w('c9d', 'fifty');
    const bf = w('c9e', 'boots');
    const tw = w('c9f', 'twenty');
    q(no, 'buzz', 0.4);
    q(bo, 'stamp', 0.5);
    q(fv, 'mail', 0.5);
    q(bf, 'pop2', 0.5);
    q(tw, 'ding', 0.5);
    const items = ['Turn OFF debit overdraft (opt out)', 'Fee-free account: "Bank On" certified', 'Low-balance text alerts', 'A $100 buffer: the "boots fund"', 'Secured card / credit-builder loan · PALs'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={56}>How to stop paying the poor tax</Text></G2>
          <G2 x={650} y={160}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={270 + i * 150} s={0.9 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dave f={f} x={1600} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={1600} y={420}><Bubble text="so what can I do?" size={44} tail="down" /></G2>}
          {cur === 1 && <G2 x={1600} y={520}><Terminal s={1.6} text="$4.00" /><G2 x={0} y={-130} s={bump(no, 0.3)} o={lt(no, 0.4)}><Text size={56} color={C.red}>DECLINED</Text></G2><Text y={330} size={40} color={C.green}>embarrassing, but $0</Text></G2>}
          {cur === 2 && <G2 x={1600} y={520} s={bump(bo, 0.08)}><Shield s={1.1} top="BANK ON" big="$0 OD" /><Text y={260} size={38}>monthly fee ≤ $5</Text></G2>}
          {cur === 3 && <G2 x={1600} y={520}><Phone s={1} title="ALERT" value="< $50!" color={C.red} /><Text y={340} size={40} color={C.green}>{f >= fv ? 'saves you $35' : ''}</Text></G2>}
          {cur === 4 && <G2 x={1600} y={560} s={bump(bf, 0.1)}><Boot s={1.2} /><Text y={-300} size={48} color={C.green}>BOOTS FUND: $100</Text></G2>}
          {cur >= 5 && <G2 x={1600} y={520}><CreditCard s={0.6} y={-100} /><Text y={80} size={40}>credit union loans (PALs)</Text><G2 y={150} s={bump(tw, 0.2)}><Text size={52} color={C.green}>{f >= tw ? 'max 28% APR' : '?'}</Text></G2></G2>}
          <SourceTag f={f} at={hs[1]} text={cur >= 5 ? 'NCUA: Payday Alternative Loans capped at 28% APR' : 'Bank On National Account Standards 2025-2026 (CFE Fund)'} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Being poor costs extra: fees hit those with least', 'Boots theory: no cash now → pay more later', 'Fight back: overdraft off, fee-free, buffer'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={250} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1420} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mk = w('r5', 'milk');
    const eg = w('r5', 'eighty');
    const sb = w('r6', 'subscribe');
    const od = w('r6', 'overdraft');
    q(mk, 'pop', 0.5);
    q(eg, 'cash', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(od, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={58}>Next: the store tricks that make you spend more</Text></G2>
            <Receipt x={1300} y={620} s={1.1 * P(A('r5')) * bump(eg, 0.08)} lines={[['milk', '$3.49'], ['cookies', '$4.99'], ['candles', '$12.99'], ['...', '...']]} total={f >= eg ? 'TOTAL $87' : 'TOTAL ?'} />
            <Dave f={f} x={500} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: eg, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Raccoon f={f} x={1550} y={880} s={0.8} mood={f >= od ? 'sneaky' : 'greedy'} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2f', 'money') + 20;
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
