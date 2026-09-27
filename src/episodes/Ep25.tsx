import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, DreamBg, DreamFrame} from '../fx';
import {Bubble, Calendar, Duck, MoneyStack, Monitor, SourceTag, Stamp, Text, Thought, XMark, Sparkle} from '../props';
import {Frame, MoneyMachine, Phone, Row, Shield, SubButton, Bell} from '../props2';
import {Person, Shop, Ticket} from '../props3';
import {Bathtub} from '../props3';
import {LineChart, Sandwich} from '../props4';
import {Contract} from '../props5';
import {Jet, MilesCard, Scale, SlicePie, Star} from '../props8';
import {Couch} from '../props19';
import {Apple, BankHall, Chip, Coat, Cobweb, Cup, Drawer, Gear, GiftCard, GREEN, Hanger, Ledger, Muffin, Seg} from '../props25';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Barista: React.FC<SP> = (p) => <Stick acc={['cap']} seed={52} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string}> = ({w, h, fill = '#fff'}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
);

const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const Check: React.FC<{x?: number; y?: number; s?: number}> = ({x = 0, y = 0, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle r={40} fill={C.green} stroke={C.ink} strokeWidth={5} />
    <path d="M -18 0 l 12 14 l 24 -26" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const Ep25: React.FC = () => {
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
  const P0 = (id: string, k = 2) => pop(f, A(id) + k);
  const bump = (at: number, amt = 0.18) => (f < at ? 1 : 1 + amt * Math.sin(Math.min(1, (f - at) / 12) * Math.PI));
  const on = (at: number) => (f >= at ? 1 : 0);
  const dim = (at: number) => (f >= at ? 1 : 0.35);

  // ============ COLD OPEN ============
  {
    const bn = w('o1', 'one');
    const cm = w('o1', 'money');
    const cf = w('o1', 'coffee');
    const nb = w('o1', 'nobody');
    q(2, 'pop', 0.6);
    q(bn, 'cash', 0.7);
    q(cf, 'pop2', 0.5);
    q(nb, 'ding', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={pop(f, 2)}><Text size={54}>customer money Starbucks is holding</Text></G2>
          <G2 x={1010} y={330} s={pop(f, 4) * bump(bn, 0.08)}>
            <Box w={1060} h={180} fill={f >= bn ? C.yellow : '#fff'} />
            <Text size={100}>{`$${fmt(ease(f, bn, bn + 40, 0, 1751700000))}`}</Text>
          </G2>
          <Dave f={f} x={260} y={860} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: bn, pose: 'shock', expr: 'shock', look: 0.8}]} />
          {[0, 1, 2, 3].map((i) => (
            <G2 key={i} x={700 + i * 300} y={700} s={pop(f, 6 + i * 2) * bump(cf + i * 4)} o={f >= cf ? 1 : 0.4}>
              <Cup s={0.8} f={f} label={f >= nb ? 'unbought' : '?'} />
            </G2>
          ))}
          <SourceTag f={f} at={bn} text="Starbucks FY2025 10-K: stored value & loyalty liability $1,751.7M" />
          {f >= cm && <G2 x={1720} y={520} s={pop(f, cm) * 0.9}><Text size={40} color={C.green}>money now</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ad = w('o2', 'added');
    const th = w('o2', 'thinks');
    const ln = w('o2', 'loan');
    const zr = w('o3', 'zero');
    const ct = w('o3', 'cent');
    q(ad, 'coin', 0.7);
    q(th, 'pop', 0.5);
    q(ln, 'stamp', 0.7);
    q(zr, 'thud', 0.6);
    q(ct, 'buzz', 0.5);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ln, pose: 'shock', expr: 'shock', look: 0.8}, {at: ct, pose: 'facepalm', expr: 'sad'}]} />
          <Phone x={720} y={470} s={1.05 * P0('o2') * bump(ad)} title="COFFEE APP" value={f >= ad ? '$50.00' : '$0.00'} color={GREEN} />
          <G2 x={1400} y={880} s={P0('o2', 4)}><Shop name="STARBUCKS" s={0.8} /></G2>
          <G2 x={1080} y={430} s={P0('o2', 6)}>
            <path d="M -110 0 L 110 0" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeDasharray="20 16" strokeDashoffset={-f * 2} />
            <path d="M 90 -26 L 124 0 L 90 26" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          </G2>
          <G2 x={1400} y={170} s={P0('o2', 8) * bump(ln, 0.25)}>
            <Box w={620} h={120} fill={f >= ln ? C.yellow : '#fff'} />
            <Text size={56}>{f >= ln ? 'a LOAN to Starbucks' : '"I bought coffee"'}</Text>
          </G2>
          <G2 x={1400} y={320} s={P0('o2', 10) * bump(zr, 0.25)}>
            <Text size={52} color={f >= zr ? C.red : '#9C9383'}>{`interest paid to Dave: ${f >= zr ? '$0.00' : '?'}`}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ls = w('o4', 'last');
    const tw = w('o4', 'two');
    const nv = w('o4', 'never');
    const kp = w('o4', 'kept');
    q(tw, 'cash', 0.6);
    q(nv, 'crinkle', 0.5);
    q(kp, 'stamp', 0.7);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P0('o4')}><Text size={52}>{f >= ls ? 'last year: money on cards never spent' : 'money on cards never spent'}</Text></G2>
          <Drawer x={430} y={560} s={0.95 * P0('o4', 3)} open={1}>
            {[0, 1, 2].map((i) => <GiftCard key={i} x={-140 + i * 140} y={-10 + (i % 2) * 10} s={0.45} r={-10 + i * 10} color={[GREEN, C.red, C.blue][i]} value={['$3.17', '$1.40', '$0.85'][i]} />)}
          </Drawer>
          <G2 x={1270} y={430} s={P0('o4', 5) * bump(tw, 0.1)}>
            <Box w={800} h={180} fill={f >= tw ? C.yellow : '#fff'} />
            <Text size={92}>{f >= tw ? '~$220 MILLION' : '$ ?'}</Text>
          </G2>
          <G2 x={1270} y={680} s={P0('o4', 7)}>
            <MoneyStack n={f >= kp ? 9 : 4} s={1.1} label={f >= kp ? 'kept by Starbucks' : 'unspent'} />
          </G2>
          {f >= kp && <Stamp x={1650} y={700} s={pop(f, kp, 9, 260)} text="KEPT" size={70} color={C.red} r={-8} />}
          <SourceTag f={f} at={tw} text="Starbucks FY2025 10-K: breakage $200.4M + $22.0M" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('o5', 'coffee');
    const bk = w('o5', 'bank');
    q(cs, 'pop', 0.5);
    q(bk, 'sting', 0.6);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={480} y={822} s={P0('o5') * bump(cs, 0.1)}><Shop name="COFFEE SHOP?" s={0.9} /></G2>
          <G2 x={1440} y={822} s={P0('o5', 4) * bump(bk, 0.12)}><BankHall label={f >= bk ? 'SECRETLY A BANK?' : 'BANK?'} s={0.95} /></G2>
          <G2 x={960} y={420} s={P0('o5', 6)}><Text size={160} color={f >= bk ? C.red : C.ink}>?</Text></G2>
          <Dave f={f} x={960} y={822} s={1} keys={[{at: 0, pose: 'shrug', expr: 'think'}, {at: bk, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'bank'), w('o6', 'nobody'), w('o6', 'stars'), w('o6', 'latte'), w('o6', 'yours')];
    pv.forEach((x) => q(x, 'stamp', 0.45));
    const labels = ['COFFEE BANK', 'NEVER SPENT', 'STARS GAME', '$5 LATTE', 'KEEP IT YOURS'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {labels.map((l, i) => {
            const lit = f >= pv[i];
            return (
              <G2 key={l} x={220 + i * 370} y={520} s={P0('o6', i * 2) * bump(pv[i], 0.12)} o={lit ? 1 : 0.45}>
                <Frame w={340} h={440} label={l}>
                  {i === 0 && <BankHall s={0.42} y={40} label="" />}
                  {i === 1 && <GiftCard s={0.6} y={-40} value="$3.17" />}
                  {i === 2 && [0, 1, 2].map((k) => <Star key={k} x={-80 + k * 80} y={-40} s={0.9} />)}
                  {i === 3 && <Cup s={0.8} y={-20} f={f} label="$5" />}
                  {i === 4 && <Dave f={f} x={0} y={120} s={0.55} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />}
                </Frame>
              </G2>
            );
          })}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dave loads $50 ============
  {
    const rl = w('c1b', 'reload');
    const lv = w('c1b', 'leaves');
    const sp = w('c1b', 'sip');
    q(rl, 'click', 0.7);
    q(lv, 'whoosh_s', 0.5);
    q(sp, 'buzz', 0.4);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={300} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: sp, pose: 'shrug', expr: 'neutral', look: 0.8}]} />
          <G2 x={720} y={480} s={P0('c1a') * bump(rl)}>
            <Phone title="COFFEE APP" value={f >= rl ? '$50.00' : '$0.00'} color={GREEN} />
            <rect x={-80} y={130} width={160} height={50} rx={25} fill={f >= rl ? C.green : '#C9CED6'} stroke={C.ink} strokeWidth={4} />
            <Text y={156} size={26} color="#fff">RELOAD</Text>
          </G2>
          <Monitor x={1300} y={560} s={0.9 * P0('c1a', 4) * bump(lv, 0.08)} value={f >= lv ? '$450' : '$500'} valueColor={f >= lv ? C.red : C.ink} />
          <G2 x={1300} y={170} s={P0('c1a', 6)}><Text size={44}>{f >= lv ? "Dave's bank: -$50" : "Dave's bank account"}</Text></G2>
          <G2 x={1720} y={720} s={P0('c1a', 8) * bump(sp)}>
            <Cup s={0.7} f={f} label="0 sips" />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('c1c', 'cash');
    const td = w('c1c', 'today');
    const rm = w('c1c', 'real');
    q(cs, 'cash', 0.7);
    q(td, 'stamp', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={1150} y={822} s={P0('c1c')}><Shop name="STARBUCKS" /></G2>
          <G2 x={1150} y={250} s={P0('c1c', 4) * bump(cs, 0.25)}><MoneyStack n={6} s={1.2} label="$50 cash" /></G2>
          <Dave f={f} x={380} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}]} />
          <G2 x={380} y={360} s={P0('c1c', 6)}><Bubble text="still no coffee..." size={38} tail="down" /></G2>
          <G2 x={1650} y={300} s={P0('c1c', 8) * bump(td, 0.25)} r={-6}>
            <Stamp text={f >= td ? 'TODAY' : 'WHEN?'} size={60} color={f >= td ? C.green : '#9AA5B1'} />
          </G2>
          <G2 x={1650} y={420} s={P0('c1c', 10)}><Text size={38} color={f >= rm ? C.ink : '#9C9383'}>real money</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ow = w('c1d', 'owes');
    const pf = w('c1d', 'profit');
    const db = w('c1d', 'debt');
    q(ow, 'pop', 0.6);
    q(pf, 'buzz', 0.4);
    q(db, 'stamp', 0.7);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Ledger x={1150} y={470} s={P0('c1d')} rows={[['cash in', '+$50'], ['owes Dave', 'owes $50 of coffee'], ['profit', f >= pf ? '$0 (yet)' : '?']]} lit={[1, on(ow), on(pf)]} />
          <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ow, pose: 'point_r', expr: 'grin', look: 0.8}]} />
          <G2 x={330} y={380} s={P0('c1d', 6)}><Cup s={0.7} f={f} label="IOU" /></G2>
          <G2 x={1150} y={840} s={P0('c1d', 8) * bump(db, 0.2)}>
            <Text size={56} color={f >= db ? C.red : '#9C9383'}>{f >= db ? "it's a DEBT" : 'profit or debt?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const df = w('c1e', 'deferred');
    const lt = w('c1e', 'later');
    const sl = w('c1e', 'sale');
    const la = w('c1e', 'latte');
    q(df, 'stamp', 0.6);
    q(lt, 'ding', 0.5);
    q(la, 'coin', 0.7);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P0('c1e') * bump(df, 0.12)}>
            <Box w={1100} h={150} fill={f >= df ? C.yellow : '#fff'} />
            <Text size={80}>DEFERRED REVENUE</Text>
          </G2>
          <G2 x={960} y={330} s={P0('c1e', 4) * bump(lt, 0.2)}><Text size={52} color={f >= lt ? C.blue : '#9C9383'}>deferred = LATER</Text></G2>
          <line x1={300} y1={620} x2={1620} y2={620} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <G2 x={440} y={620} s={P0('c1e', 6)}>
            <MoneyStack n={4} y={-40} label="NOW: $50 in" />
            <circle r={18} fill={C.ink} />
          </G2>
          <G2 x={1480} y={620} s={P0('c1e', 8)} o={f >= sl ? 1 : 0.5}>
            <Cup s={0.6} y={-150} f={f} label="latte" />
            <circle r={18} fill={C.ink} />
            <Text y={60} size={40}>{f >= la ? 'LATER: sale counts' : 'LATER: ?'}</Text>
            {f >= la && <Check x={120} y={-160} s={pop(f, la)} />}
          </G2>
          <Dave f={f} x={960} y={880} s={0.8} keys={[{at: 0, pose: 'present', expr: 'happy'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tk = w('c1f', 'ticket');
    const nt = w('c1f', 'isnt');
    const hd = w('c1f', 'holding');
    const wr = w('c1g', 'wear');
    const mn = w('c1g', 'money');
    const ra = w('c1g', 'right');
    q(tk, 'paper', 0.6);
    q(nt, 'pop', 0.5);
    q(wr, 'buzz', 0.5);
    q(mn, 'cash', 0.6);
    q(ra, 'ding', 0.6);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={120} s={P0('c1f')}><Text size={56}>COAT CHECK</Text></G2>
          <Hanger x={1150} y={250} w={900} />
          <G2 x={900} y={480} s={P0('c1f', 3) * bump(nt, 0.1)}><Coat /></G2>
          {f >= wr && <XMark x={900} y={420} s={0.5 * pop(f, wr)} />}
          <G2 x={900} y={680} s={P0('c1f', 4)}><Text size={36} color={f >= nt ? C.ink : '#9C9383'}>not theirs</Text></G2>
          <G2 x={1400} y={470} s={P0('c1f', 5) * bump(mn, 0.25)} o={f >= mn ? 1 : 0.45}><MoneyStack n={6} s={1.2} label="your $50" /></G2>
          <G2 x={1400} y={680} s={P0('c1f', 6)}><Text size={36} color={f >= ra ? C.green : '#9C9383'}>{f >= ra ? 'used right away!' : 'your money'}</Text></G2>
          <Dave f={f} x={330} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: mn, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={560} y={560} s={P0('c1f', 7) * bump(tk, 0.3)}><Ticket s={0.7} r={-10} text="COAT #50" /></G2>
          <G2 x={1720} y={300} s={P0('c1f', 8)}><Text size={34} color={f >= hd ? C.ink : '#9C9383'}>just holding it</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 Coffee bank ============
  {
    const ml = w('c2a', 'millions');
    q(ml, 'crowd', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {Array.from({length: 24}).map((_, i) => (
            <G2 key={i} x={180 + (i % 8) * 222} y={360 + Math.floor(i / 8) * 230} s={pop(f, A('c2a') + 1 + (i % 6))}>
              {i === 9 ? (
                <Dave f={f} x={0} y={60} s={0.45} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
              ) : (
                <Person s={0.9} c={f >= ml ? [GREEN, C.blue, C.red, C.navy][i % 4] : '#B8B0A0'} />
              )}
            </G2>
          ))}
          <G2 x={960} y={140} s={P0('c2a') * bump(ml, 0.2)}><Text size={70}>{f >= ml ? 'Dave × MILLIONS' : 'Dave × ?'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on1 = w('c2b', 'one');
    const cd = w('c2b', 'cards');
    const ap = w('c2b', 'app');
    const st = w('c2b', 'stars');
    const sp = w('c2b', 'september');
    q(on1, 'cash', 0.7);
    q(cd, 'pop', 0.5);
    q(ap, 'pop', 0.5);
    q(st, 'ding', 0.5);
    q(sp, 'flip', 0.5);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P0('c2b')}><Text size={50}>customers' money on cards & in the app</Text></G2>
          <G2 x={960} y={300} s={P0('c2b', 3) * bump(on1, 0.08)}>
            <Box w={900} h={170} fill={f >= on1 ? C.yellow : '#fff'} />
            <Text size={100}>{f >= on1 ? '$1.75 BILLION' : '$ ?'}</Text>
          </G2>
          {[['cards', cd], ['app', ap], ['unused Stars', st]].map(([l, at], i) => (
            <G2 key={String(l)} x={420 + i * 540} y={580} s={P0('c2b', 5 + i * 2) * bump(Number(at))} o={dim(Number(at))}>
              {i === 0 && <GiftCard s={0.7} value="$25" />}
              {i === 1 && <Phone s={0.55} title="COFFEE APP" value="$50" color={GREEN} />}
              {i === 2 && [0, 1, 2].map((k) => <Star key={k} x={-90 + k * 90} s={1.1} />)}
              <Text y={170} size={40}>{String(l)}</Text>
            </G2>
          ))}
          <Calendar x={1700} y={250} s={0.55 * P0('c2b', 9) * bump(sp)} top={f >= sp ? 'SEPT' : '?'} year={2025} flip={0} />
          <SourceTag f={f} at={on1} text="Starbucks FY2025 10-K, Deferred Revenue note (Sept 28, 2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lo = w('c2c', 'loaded');
    const f1 = w('c2c', 'fifteen');
    const spn = w('c2c', 'spent');
    const f2 = w('c2c', 'fifteen', 1);
    q(lo, 'coin', 0.6);
    q(f1, 'cash', 0.6);
    q(spn, 'whoosh_s', 0.5);
    q(f2, 'cash', 0.6);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P0('c2c')}><Text size={54}>one year of Starbucks cards</Text></G2>
          <Bathtub x={960} y={640} s={1.05 * P0('c2c', 3)} level={0.45 + Math.sin(f / 20) * 0.05} f={f} />
          <G2 x={1500} y={330} s={P0('c2c', 5) * bump(f1, 0.15)} o={dim(lo)}>
            <Text size={48} color={C.green}>{`loaded in: ${f >= f1 ? '~$15.2B' : '?'}`}</Text>
          </G2>
          <G2 x={420} y={780} s={P0('c2c', 7) * bump(f2, 0.15)} o={dim(spn)}>
            <Text size={48} color={C.red}>{`spent: ${f >= f2 ? '~$15.2B' : '?'}`}</Text>
          </G2>
          <G2 x={960} y={560} s={P0('c2c', 9)}><Text size={44} color="#fff" stroke={C.ink} sw={6}>~$1.75B always inside</Text></G2>
          <SourceTag f={f} at={f1} text="FY2025 10-K: revenue deferred $15,245.8M · recognized $15,199.5M" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hd = w('c2d', 'hand');
    const lt = w('c2d', 'later');
    const it = w('c2e', 'interest');
    const zp = w('c2e', 'zero');
    const sx = w('c2f', 'six');
    const zr = w('c2f', 'zero');
    q(hd, 'pop', 0.5);
    q(it, 'ding', 0.5);
    q(zp, 'coin', 0.6);
    q(sx, 'cash', 0.7);
    q(zr, 'thud', 0.7);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={450} y={700} s={P0('c2d') * bump(it, 0.08)}><BankHall label="BANK" s={0.85} /></G2>
          <G2 x={1470} y={700} s={P0('c2d', 3) * bump(zr, 0.08)}><Shop name="STARBUCKS" s={0.75} /></G2>
          <G2 x={450} y={120} s={P0('c2d', 5) * bump(zp, 0.15)}>
            <Box w={640} h={110} fill={f >= zp ? '#DDF5E6' : '#fff'} />
            <Text size={44}>{`pays you: ${f >= zp ? '~0.37% a year' : '?'}`}</Text>
          </G2>
          <G2 x={1470} y={120} s={P0('c2d', 7) * bump(zr, 0.15)}>
            <Box w={640} h={110} fill={f >= zr ? '#FFD9E2' : '#fff'} />
            <Text size={44}>{`pays you: ${f >= zr ? '$0' : '?'}`}</Text>
          </G2>
          <G2 x={450} y={790} s={P0('c2d', 9) * bump(sx, 0.12)}>
            <Text size={40} color={f >= sx ? C.green : '#9C9383'}>{`on $1.75B: ${f >= sx ? '~$6.5M / year' : '?'}`}</Text>
          </G2>
          <G2 x={960} y={330} s={P0('c2d', 8)}><Text size={40} color={f >= lt ? C.ink : '#9C9383'}>money in · sits · out later</Text></G2>
          <Dave f={f} x={960} y={822} s={0.95} keys={[{at: 0, pose: 'shrug', expr: 'think'}, {at: hd, pose: 'present', expr: 'happy', look: -0.8}, {at: zr, pose: 'point_r', expr: 'suspicious', look: 0.8}]} />
          <SourceTag f={f} at={zp} text="FDIC national avg savings rate 0.37% (Sept 2026) · $1.75B × 0.37% ≈ $6.5M" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ns = w('c2g', 'eighteen');
    const sv = w('c2g', 'seven');
    const sm = w('c2g', 'supermarkets');
    const df = w('c2g', 'deferred');
    q(ns, 'flip', 0.5);
    q(sv, 'cash', 0.7);
    q(sm, 'pop', 0.5);
    q(df, 'stamp', 0.6);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={260} y={260} s={0.7 * P0('c2g') * bump(ns)} top="UP FRONT" year={2018} flip={0} />
          <G2 x={960} y={300} s={P0('c2g', 3) * bump(sv, 0.1)}>
            <rect x={-380} y={-130} width={760} height={260} rx={16} fill="#E8F7EC" stroke={C.ink} strokeWidth={6} />
            <Text x={-340} y={-80} size={30} anchor="start" color="#5B6470">FROM: NESTLÉ · TO: STARBUCKS</Text>
            <Text y={10} size={90} color={C.green}>{f >= sv ? '~$7 BILLION' : '$ ?'}</Text>
            <Text y={90} size={30} color="#5B6470">for the right to sell Starbucks coffee</Text>
          </G2>
          <G2 x={1610} y={620} s={P0('c2g', 5) * bump(sm)} o={dim(sm)}>
            <rect x={-200} y={-200} width={400} height={400} rx={12} fill="#fff" stroke={C.ink} strokeWidth={6} />
            {[0, 1, 2].map((r) => <line key={r} x1={-200} x2={200} y1={-70 + r * 130} y2={-70 + r * 130} stroke={C.ink} strokeWidth={6} />)}
            {Array.from({length: 9}).map((_, i) => <rect key={i} x={-170 + (i % 3) * 120} y={-180 + Math.floor(i / 3) * 130} width={90} height={100} rx={10} fill={[GREEN, '#8C5A33', C.navy][i % 3]} stroke={C.ink} strokeWidth={4} />)}
            <Text y={250} size={36}>supermarket shelf</Text>
          </G2>
          <G2 x={800} y={650} s={P0('c2g', 7) * bump(df, 0.1)}>
            <Ledger rows={[['Nestlé deal, still owed', f >= df ? '~$5.8B left' : '?']]} lit={[on(df)]} title="DEFERRED REVENUE" s={0.9} />
          </G2>
          <SourceTag f={f} at={sv} text="Starbucks FY2025 10-K: Nestlé prepaid royalty; $177.0M current + $5.6B long-term" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c2h', 'coffee');
    const tr = w('c2h', 'trick');
    q(cl, 'pop', 0.5);
    q(tr, 'stamp', 0.7);
    scene(A('c2h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={480} y={480} s={P0('c2h')}><MoneyStack n={7} s={1.4} label="money FIRST" /></G2>
          <G2 x={960} y={420} s={P0('c2h', 3)}>
            <path d="M -170 0 L 150 0" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
            <path d="M 110 -40 L 160 0 L 110 40" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </G2>
          <G2 x={1440} y={460} s={P0('c2h', 5) * bump(cl)} o={dim(cl)}><Cup s={1.3} f={f} label="LATER" /></G2>
          <G2 x={960} y={780} s={P0('c2h', 7) * bump(tr, 0.2)}>
            <Stamp text="THE WHOLE TRICK" size={70} color={f >= tr ? C.red : '#9AA5B1'} r={-4} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 Breakage ============
  {
    const th = w('c3a', 'three');
    const bd = w('c3a', 'birthday');
    const tl = w('c3b', 'little');
    const dr = w('c3b', 'drawer');
    const fv = w('c3b', 'forever');
    q(bd, 'pop', 0.5);
    q(th, 'coin', 0.6);
    q(tl, 'buzz', 0.5);
    q(dr, 'whoosh_s', 0.6);
    q(fv, 'thud', 0.5);
    const slide = ease(f, dr, dr + 18);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={300} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: tl, pose: 'shrug', expr: 'sad', look: 0.8}]} />
          <Drawer x={1450} y={700} s={0.9 * P0('c3a', 3)} open={f >= fv ? 0.2 : 1}>
            {f >= dr + 18 && <GiftCard s={0.45} value="$3.17" />}
          </Drawer>
          {f < dr + 18 && (
            <G2 x={lin(slide, 0, 1, 700, 1450)} y={lin(slide, 0, 1, 420, 640)} s={(1 - slide * 0.6) * P0('c3a', 5) * bump(th, 0.15)} r={slide * 20}>
              <GiftCard value={f >= th ? '$3.17' : '$ ?'} title="HAPPY B-DAY" />
            </G2>
          )}
          <G2 x={1000} y={170} s={P0('c3a', 7) * bump(tl, 0.15)}>
            <Text size={44} color={f >= tl ? C.red : '#9C9383'}>{f >= tl ? 'drink costs more than $3.17' : 'enough for a drink?'}</Text>
          </G2>
          <G2 x={1450} y={330} s={P0('c3a', 9)}><Text size={44} color={f >= fv ? C.red : C.ink}>{f >= fv ? 'FOREVER.' : 'the drawer'}</Text></G2>
          <Cup x={1050} y={640} s={0.6 * P0('c3a', 8)} f={f} label="$5+" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ml = w('c3c', 'millions');
    const dt = w('c3c', 'data');
    const pr = w('c3c', 'predict');
    q(ml, 'pop', 0.5);
    q(dt, 'paper', 0.5);
    q(pr, 'ding', 0.6);
    const vals = ['$0.40', '$2.10', '$3.17', '$0.95', '$1.60', '$4.05', '$0.25', '$2.75'];
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {vals.map((v, i) => (
            <G2 key={i} x={170 + (i % 4) * 250} y={300 + Math.floor(i / 4) * 280} s={pop(f, A('c3c') + 1 + i) * bump(ml + i * 2, 0.12)} r={-8 + (i % 3) * 8}>
              <GiftCard s={0.62} value={v} color={[GREEN, C.red, C.blue, C.navy][i % 4]} />
            </G2>
          ))}
          <G2 x={1450} y={420} s={P0('c3c', 4) * bump(dt, 0.08)}>
            <rect x={-360} y={-260} width={720} height={500} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <LineChart x={0} y={0} w={560} h={300} t={ease(f, A('c3c'), pr + 20, 0.2, 1)} pts={[10, 30, 45, 55, 60, 62, 63]} color={GREEN} />
            <Text y={-215} size={36}>years of data</Text>
            <Text y={200} size={34} color={f >= pr ? C.red : '#9C9383'}>{f >= pr ? 'predicted: never spent' : 'prediction: ?'}</Text>
          </G2>
          <Barista f={f} x={1760} y={880} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: pr, pose: 'point_l', expr: 'smug', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const br = w('c3d', 'breakage');
    const rl = w('c3d', 'rolled');
    const cc = w('c3d', 'couch');
    q(br, 'stamp', 0.7);
    q(rl, 'coin', 0.6);
    q(cc, 'boing', 0.5);
    const roll = ease(f, rl, cc + 10);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={200} s={P0('c3d') * bump(br, 0.15)}>
            <Box w={900} h={170} fill={f >= br ? C.yellow : '#fff'} />
            <Text size={100} color={f >= br ? C.ink : '#9C9383'}>BREAKAGE</Text>
          </G2>
          <Couch x={1150} y={780} s={1.1 * P0('c3d', 3)} color={GREEN} />
          {[0, 1, 2].map((i) => (
            <G2 key={i} x={lin(roll, 0, 1, 380 + i * 90, 1150 + i * 60)} y={lin(roll, 0, 1, 720, 640)} s={P0('c3d', 5 + i)} o={1 - roll * 0.7}>
              <circle r={34} fill={C.gold} stroke={C.ink} strokeWidth={5} transform={`scale(${Math.abs(Math.cos(f / 5 + i))},1)`} />
            </G2>
          ))}
          <G2 x={420} y={470} s={P0('c3d', 8)}><Text size={40}>money that "breaks off"</Text></G2>
          <Dave f={f} x={200} y={880} s={0.95} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: cc, pose: 'facepalm', expr: 'sad'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rv = w('c3e', 'revenue');
    const tw = w('c3e', 'two');
    q(rv, 'ding', 0.5);
    q(tw, 'cash', 0.8);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P0('c3e')}><Text size={52}>breakage counted as revenue · fiscal 2025</Text></G2>
          <G2 x={960} y={340} s={P0('c3e', 3) * bump(tw, 0.06)}>
            <Box w={1100} h={190} fill={f >= tw ? C.yellow : '#fff'} />
            <Text size={110}>{`$${fmt(ease(f, tw, tw + 45, 0, 222400000))}`}</Text>
          </G2>
          <Ledger x={700} y={680} s={0.8 * P0('c3e', 5)} rows={[['coffee shops', f >= tw ? '+$200.4M' : '?'], ['licensed stores', f >= tw ? '+$22.0M' : '?']]} lit={[on(rv), on(rv)]} title="BREAKAGE" />
          <G2 x={1400} y={700} s={P0('c3e', 7) * bump(tw, 0.2)}><MoneyStack n={9} s={1.3} label="no coffee needed" /></G2>
          <SourceTag f={f} at={tw} text="Starbucks FY2025 10-K: breakage $200.4M + $22.0M = $222.4M" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dk = w('c3f', 'duck');
    const nt = w('c3f', 'nothing');
    const nm = w('c3f', 'made');
    const nb = w('c3g', 'beans');
    const nk = w('c3g', 'milk');
    const ba = w('c3g', 'barista');
    const jm = w('c3g', 'just');
    q(dk, 'quack', 0.8);
    q(nt, 'pop', 0.5);
    q(nm, 'ding', 0.5);
    [nb, nk, ba].forEach((x) => q(x, 'buzz', 0.45));
    q(jm, 'cash', 0.7);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={400} y={560} s={1.3 * P0('c3f') * bump(dk, 0.12)}><Duck f={f} /></G2>
          <G2 x={400} y={300} s={P0('c3f', 3) * bump(nt, 0.15)}><Bubble text={f >= nt ? 'money from nothing!' : 'quack?'} size={40} tail="down" /></G2>
          {['beans', 'milk', 'barista'].map((l, i) => {
            const at = [nb, nk, ba][i];
            return (
              <G2 key={l} x={960 + i * 300} y={330} s={P0('c3f', 5 + i * 2) * bump(at, 0.2)}>
                <Frame w={260} h={260} label={l}>
                  {i === 0 && [0, 1, 2].map((k) => <ellipse key={k} cx={-50 + k * 50} cy={-30} rx={22} ry={30} fill="#6B3E1F" stroke={C.ink} strokeWidth={4} />)}
                  {i === 1 && <G2 y={-30} s={0.7}><rect x={-50} y={-70} width={100} height={140} rx={12} fill="#fff" stroke={C.ink} strokeWidth={5} /><Text y={10} size={30} color={C.blue}>MILK</Text></G2>}
                  {i === 2 && <Barista f={f} x={0} y={60} s={0.35} keys={[{at: 0, pose: 'idle', expr: 'neutral'}]} />}
                </Frame>
                {f >= at && <XMark s={0.4 * pop(f, at)} y={-20} />}
              </G2>
            );
          })}
          <G2 x={1260} y={720} s={P0('c3f', 11) * bump(jm, 0.25)}>
            <MoneyStack n={f >= jm ? 8 : 5} s={1.2} label={f >= nm ? 'coffee never made' : 'money for coffee'} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 Stars game ============
  {
    const rw = w('c4a', 'rewards');
    const th = w('c4b', 'thirty');
    const st = w('c4b', 'stars');
    const fd = w('c4b', 'drinks');
    q(rw, 'ding', 0.6);
    q(th, 'cash', 0.6);
    q(st, 'pop', 0.5);
    q(fd, 'chime', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={280} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: rw, pose: 'present', expr: 'happy', look: 0.8}]} />
          <G2 x={700} y={480} s={P0('c4a') * bump(rw, 0.1)}>
            <Phone title="REWARDS" value={f >= st ? '4 / 5' : '0 / 5'} color={GREEN} />
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} x={-80 + i * 40} y={60} s={0.35} color={f >= st && i < 4 ? C.gold : '#D8D2C4'} />)}
          </G2>
          <G2 x={1320} y={260} s={P0('c4a', 4) * bump(th, 0.1)}>
            <Box w={760} h={170} fill={f >= th ? C.yellow : '#fff'} />
            <Text y={-20} size={80}>{f >= th ? '35 MILLION+' : '? members'}</Text>
            <Text y={50} size={30}>active U.S. members (90 days)</Text>
          </G2>
          <G2 x={1150} y={620} s={P0('c4a', 6)} o={dim(st)}>
            {[0, 1, 2].map((i) => <Star key={i} x={i * 110} s={1.2} />)}
          </G2>
          <G2 x={1420} y={620} s={P0('c4a', 7)}><Text size={80}>→</Text></G2>
          <G2 x={1640} y={660} s={P0('c4a', 8) * bump(fd, 0.2)} o={dim(fd)}><Cup s={0.9} f={f} label="FREE" /></G2>
          <SourceTag f={f} at={th} text="Starbucks Q4 FY2025 results (Oct 2025): 35M+ 90-day active U.S. Rewards members" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fs = w('c4c', 'free');
    const pt = w('c4c', 'partly');
    const mc = w('c4c', 'machine');
    q(fs, 'dream', 0.5);
    q(pt, 'stamp', 0.6);
    q(mc, 'clank', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <DreamBg />
        <DreamFrame label="WHAT MOST PEOPLE THINK" />
        <Svg>
          <Dave f={f} x={380} y={880} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: mc, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={620} y={380} s={P0('c4c') * bump(fs, 0.1)}>
            <Thought w={440} h={260} tx={-180} ty={200}>
              <Cup x={-80} s={0.5} f={f} label="FREE" />
              <Star x={80} y={-10} s={1.3} />
            </Thought>
          </G2>
          <G2 x={1400} y={560} s={1.3 * P0('c4c', 4) * bump(mc, 0.12)} o={f >= mc ? 1 : 0.45}><MoneyMachine f={f} /></G2>
          <G2 x={1400} y={260} s={P0('c4c', 6)}><Text size={48} color={f >= mc ? C.red : '#9C9383'}>{f >= mc ? 'a clever MACHINE' : 'or...?'}</Text></G2>
          <G2 x={960} y={200} s={P0('c4c', 8) * bump(pt, 0.2)} r={-6}><Stamp text="PARTLY" size={56} color={f >= pt ? C.blue : '#9AA5B1'} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hs = [bs('c4d'), bs('c4e'), bs('c4f')];
    const ch = w('c4d', 'chips');
    const tp = w('c4d', 'tapping');
    const mf = w('c4e', 'muffin');
    const bk = w('c4e', 'back');
    const tw = w('c4f', 'twelve');
    const nx = w('c4f', 'next');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ch, 'coin', 0.6);
    q(tp, 'click', 0.6);
    q(bk, 'step', 0.5);
    q(mf, 'pop2', 0.6);
    q(tw, 'coin', 0.5);
    q(nx, 'buzz', 0.5);
    const cur = hs.filter((x) => f >= x - 6).length;
    const items = ["Loaded money doesn't feel real", 'The goal: "a few more Stars!"', 'The balance pulls you back'];
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={660} y={120}><Text size={56}>3 tricks of the Stars game</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={290 + i * 170} s={0.9 * P0('c4d', i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.3} color={GREEN} w={1000} />)}
          <G2 x={1560} y={500} s={P0('c4d', 6)}>
            <rect x={-300} y={-360} width={600} height={720} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            {cur <= 1 && (
              <g>
                <G2 x={-120} y={-180} s={bump(ch, 0.25)}>
                  <Chip x={-40} label="$5" />
                  <Chip x={40} y={20} color={C.blue} label="$5" />
                </G2>
                <Text x={-120} y={-60} size={30}>casino chips</Text>
                <G2 x={140} y={-150} s={0.6 * bump(tp, 0.2)}><Phone title="COFFEE APP" value="tap!" color={GREEN} /></G2>
                <G2 x={0} y={170} s={bump(tp, 0.15)}>
                  <MoneyStack n={4} x={-120} />
                  <Text x={-120} y={80} size={28} color={C.red}>cash: ouch</Text>
                  <Text x={130} y={-20} size={28} color={f >= tp ? C.green : '#9C9383'}>tap: no pain</Text>
                </G2>
              </g>
            )}
            {cur === 2 && (
              <g>
                <rect x={-240} y={-230} width={480} height={60} rx={30} fill="#EEE8DC" stroke={C.ink} strokeWidth={5} />
                <rect x={-236} y={-226} width={Math.min(472, 472 * ease(f, hs[1], bk, 0.6, 0.9))} height={52} rx={26} fill={C.gold} />
                <Text y={-130} size={36}>almost a free drink!</Text>
                <Cup x={-110} y={90} s={0.7} f={f} label="FREE" />
                <G2 x={130} y={120} s={f >= mf ? pop(f, mf) + 0.001 : 0.5} o={dim(mf)}><Muffin s={1.3} /></G2>
                <Text x={130} y={260} size={30} color={f >= mf ? C.red : '#9C9383'}>+ muffin</Text>
              </g>
            )}
            {cur >= 3 && (
              <g>
                <G2 x={-130} y={-80} s={0.7 * bump(tw, 0.2)}><Phone title="COFFEE APP" value={f >= tw ? '$12.00' : '$ ?'} color={GREEN} /></G2>
                <G2 x={140} y={60} s={0.4}><Shop name="LITTLE CAFE" /></G2>
                {f >= nx && <XMark x={140} y={-40} s={0.35 * pop(f, nx)} />}
                <Text y={290} size={32}>{f >= nx ? 'not the shop next door' : 'where to go?'}</Text>
              </g>
            )}
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rl = w('c4g', 'real');
    const hb = w('c4g', 'habits');
    const mo = w('c4g', 'more');
    q(rl, 'ding', 0.5);
    q(hb, 'pop', 0.5);
    q(mo, 'thud', 0.6);
    const tilt = ease(f, mo - 4, mo + 16, 0, 14);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Scale x={960} y={900} s={1.1 * P0('c4g')} tilt={tilt} left={f >= rl ? 'free drink (real)' : 'free drink'} right="your cash + habits" />
          <G2 x={960 - 330 * 1.1} y={900 - 330 * 1.1 - tilt * -6} s={P0('c4g', 3)}><Cup s={0.6} y={-40} f={f} label="FREE" /></G2>
          <G2 x={960 + 330 * 1.1} y={900 - 330 * 1.1 + tilt * 6} s={P0('c4g', 5) * bump(hb, 0.15)}><MoneyStack n={7} y={30} /></G2>
          <G2 x={960} y={150} s={P0('c4g', 7) * bump(mo, 0.15)}>
            <Text size={54} color={f >= mo ? C.red : C.ink}>{f >= mo ? 'worth MORE to Starbucks' : 'which is worth more?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 How Starbucks makes money ============
  {
    const fr = w('c5a', 'fair');
    const tn = w('c5a', 'tiny');
    q(fr, 'pop', 0.5);
    q(tn, 'ding', 0.6);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SlicePie x={760} y={520} s={P0('c5a')} rad={320} slices={[{v: 0.006, c: C.red}, {v: 0.994, c: GREEN, l: 'COFFEE & MORE'}]} pop={f >= tn ? 0 : -1} />
          <G2 x={760} y={130} s={P0('c5a', 3)}><Text size={52}>all of Starbucks' revenue</Text></G2>
          <G2 x={1450} y={330} s={P0('c5a', 5) * bump(tn, 0.2)}>
            <Box w={620} h={140} fill={f >= tn ? C.yellow : '#fff'} />
            <Text size={52}>{f >= tn ? 'breakage: ~0.6%' : 'breakage: ?'}</Text>
          </G2>
          <G2 x={1080} y={210} s={P0('c5a', 7)} o={dim(tn)}>
            <path d="M 160 100 Q 60 120 -210 170" fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" />
          </G2>
          <Dave f={f} x={1500} y={880} s={1} keys={[{at: 0, pose: 'hips', expr: 'think', look: -0.8}, {at: tn, pose: 'point_l', expr: 'happy', look: -0.8}]} />
          <SourceTag f={f} at={tn} text="$222.4M ÷ $37,184.4M ≈ 0.6% (FY2025 10-K)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c5b', 'thirty');
    const ei = w('c5c', 'eighty');
    const br = w('c5c', 'baristas');
    const tw = w('c5d', 'twelve');
    const ap = w('c5d', 'airports');
    const fe = w('c5d', 'fee');
    q(th, 'cash', 0.7);
    q(ei, 'pop', 0.6);
    q(br, 'pop2', 0.5);
    q(tw, 'pop', 0.6);
    q(ap, 'whoosh_s', 0.5);
    q(fe, 'coin', 0.6);
    const pp = f >= tw ? 1 : f >= ei ? 0 : -1;
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P0('c5b') * bump(th, 0.08)}>
            <Box w={1100} h={140} fill={f >= th ? C.yellow : '#fff'} />
            <Text size={62}>{f >= th ? 'revenue FY2025: $37.2 BILLION' : 'revenue FY2025: $ ?'}</Text>
          </G2>
          <SlicePie x={480} y={580} s={P0('c5b', 3)} rad={260} slices={[{v: 0.827, c: GREEN, l: '83%'}, {v: 0.117, c: C.blue, l: '12%'}, {v: 0.056, c: C.gold}]} pop={pp} />
          <G2 x={1000} y={420} s={P0('c5b', 5) * bump(ei, 0.12)} o={dim(ei)}>
            <Shop name="OWN SHOPS" s={0.36} y={60} />
            <Text x={140} y={-10} size={40} anchor="start">{f >= ei ? 'own coffee shops: 83%' : 'own coffee shops: ?'}</Text>
            {f >= br && <Barista f={f} x={-60} y={70} s={0.3} keys={[{at: 0, pose: 'wave', expr: 'happy'}]} />}
          </G2>
          <G2 x={1000} y={700} s={P0('c5b', 7) * bump(tw, 0.12)} o={dim(tw)}>
            <G2 s={0.28} y={-10} x={-20}><Jet /></G2>
            <Text x={140} y={-30} size={40} anchor="start">{f >= tw ? 'licensed stores: 12%' : 'licensed stores: ?'}</Text>
            <Text x={140} y={30} size={30} anchor="start" color={f >= fe ? C.green : '#9C9383'}>{f >= ap ? 'airports, supermarkets → pay Starbucks' : 'run by other companies'}</Text>
          </G2>
          <SourceTag f={f} at={th} text="FY2025 10-K: company-operated $30.7B · licensed $4.35B · other $2.1B" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fo = w('c5e', 'forty');
    const hf = w('c5e', 'half');
    const lc = w('c5e', 'licensed');
    q(fo, 'cash', 0.6);
    q(hf, 'pop', 0.5);
    q(lc, 'pop', 0.5);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P0('c5e') * bump(fo, 0.12)}><Text size={62}>{f >= fo ? '40,990 stores worldwide' : '? stores worldwide'}</Text></G2>
          {Array.from({length: 40}).map((_, i) => {
            const own = i < 21;
            const col = own ? (f >= hf ? GREEN : '#B8B0A0') : f >= lc ? C.blue : '#B8B0A0';
            return (
              <G2 key={i} x={250 + (i % 10) * 140} y={290 + Math.floor(i / 10) * 140} s={pop(f, A('c5e') + 1 + (i % 8))}>
                <rect x={-50} y={-40} width={100} height={80} rx={8} fill="#F6E7D2" stroke={C.ink} strokeWidth={4} />
                <rect x={-58} y={-58} width={116} height={26} rx={6} fill={col} stroke={C.ink} strokeWidth={4} />
                <rect x={-14} y={0} width={28} height={40} fill="#8C5A33" stroke={C.ink} strokeWidth={3} />
              </G2>
            );
          })}
          <G2 x={500} y={850} s={P0('c5e', 8)} o={dim(hf)}><Text size={40} color={GREEN}>21,514 its own</Text></G2>
          <G2 x={1400} y={850} s={P0('c5e', 9)} o={dim(lc)}><Text size={40} color={C.blue}>19,476 licensed</Text></G2>
          <SourceTag f={f} at={fo} text="Starbucks FY2025 10-K: 40,990 stores (Sept 28, 2025)" until={A('c5f')} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rs = w('c5f', 'rest');
    const gr = w('c5f', 'grocery');
    const dl = w('c5f', 'deals');
    q(rs, 'pop', 0.5);
    q(gr, 'pop2', 0.5);
    q(dl, 'paper', 0.6);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P0('c5f') * bump(rs, 0.12)}><Text size={56}>{f >= rs ? 'the other ~6%' : 'and the rest?'}</Text></G2>
          <G2 x={600} y={540} s={P0('c5f', 3) * bump(gr, 0.1)} o={dim(gr)}>
            <rect x={-320} y={-260} width={640} height={520} rx={14} fill="#fff" stroke={C.ink} strokeWidth={6} />
            {[0, 1, 2].map((r) => <line key={r} x1={-320} x2={320} y1={-90 + r * 170} y2={-90 + r * 170} stroke={C.ink} strokeWidth={6} />)}
            {Array.from({length: 12}).map((_, i) => <rect key={i} x={-290 + (i % 4) * 150} y={-240 + Math.floor(i / 4) * 170} width={110} height={140} rx={12} fill={[GREEN, '#8C5A33', C.navy, C.gold][i % 4]} stroke={C.ink} strokeWidth={4} />)}
            <Text y={310} size={40}>grocery store shelf</Text>
          </G2>
          <G2 x={1400} y={520} s={0.9 * P0('c5f', 5) * bump(dl, 0.1)}>
            <Contract lines={['Starbucks coffee', 'in supermarkets', 'partner: Nestlé']} signed={ease(f, dl, dl + 20)} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 Inside a $5 latte ============
  {
    const pb = w('c6a', 'publish');
    const sp = w('c6a', 'split');
    const b1 = w('c6b', 'one');
    const b2 = w('c6c', 'two');
    const bg = w('c6c', 'biggest');
    const b3 = w('c6d', 'seventy');
    const cl = w('c6d', 'closing');
    const b4 = w('c6e', 'thirty');
    const b5 = w('c6e', 'twenty');
    q(pb, 'buzz', 0.4);
    q(sp, 'rip', 0.6);
    [b1, b2, b3, b4].forEach((x) => q(x, 'coin', 0.6));
    q(bg, 'pop', 0.5);
    q(cl, 'thud', 0.5);
    q(b5, 'ding', 0.6);
    const segs: {v: number; c: string; l: string; val: string; at: number; icon: React.ReactNode}[] = [
      {v: 1.57, c: '#8C5A33', l: 'coffee, milk, cups', val: '$1.57', at: b1, icon: <Cup s={0.45} f={f} steam={false} />},
      {v: 2.29, c: GREEN, l: 'running the store', val: '$2.29', at: b2, icon: <Barista f={f} x={0} y={70} s={0.3} keys={[{at: 0, pose: 'wave', expr: 'happy'}]} />},
      {v: 0.74, c: C.gray, l: 'everything else', val: '$0.74', at: b3, icon: <Gear s={0.7} rot={f * 2} />},
      {v: 0.39, c: C.gold, l: 'profit', val: '39¢', at: b4, icon: <MoneyStack n={2} s={0.5} />},
    ];
    let x0 = 260;
    const W = 1400;
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P0('c6a') * bump(sp, 0.1)}><Text size={52}>{f >= sp ? 'an average $5 of Starbucks sales, split' : 'the cost of one drink: secret'}</Text></G2>
          {segs.map((sg, i) => {
            const wd = (sg.v / 5) * W;
            const el = <G2 key={i} s={P0('c6a', 2 + i * 2)}><Seg x={x0} y={520} w={wd} h={170} color={sg.c} on={on(sg.at)} label={sg.l} value={sg.val} icon={sg.icon} /></G2>;
            x0 += wd;
            return el;
          })}
          <G2 x={960} y={760} s={P0('c6a', 10) * bump(b5, 0.2)}>
            <Text size={46} color={f >= b5 ? C.green : '#9C9383'}>{f >= b5 ? 'after interest & taxes: ~25¢' : 'kept at the very end: ?'}</Text>
          </G2>
          <SourceTag f={f} at={b1} text="Derived from Starbucks FY2025 10-K income statement (share of $37.2B revenue)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fi = w('c6f', 'fifteen');
    const ei = w('c6f', 'eight');
    const th = w('c6f', 'thin');
    const tb = w('c6g', 'tough');
    const sw = w('c6g', 'sweet');
    q(th, 'pop', 0.5);
    q(fi, 'pop', 0.6);
    q(ei, 'thud', 0.7);
    q(tb, 'buzz', 0.4);
    q(sw, 'chime', 0.6);
    const bar = (at: number, v: number) => ease(f, at - 4, at + 14, 30, v * 32);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={120} s={P0('c6f') * bump(th, 0.12)}><Text size={50}>operating profit per $1</Text></G2>
          <line x1={180} y1={800} x2={940} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          {[['FY2024', fi, 15, '15¢'], ['FY2025', ei, 7.9, '~8¢']].map(([l, at, v, lab], i) => {
            const h = bar(Number(at), Number(v));
            return (
              <G2 key={String(l)} s={P0('c6f', 3 + i * 2)}>
                <rect x={330 + i * 330 - 100} y={800 - h} width={200} height={h} rx={12} fill={i ? C.red : GREEN} stroke={C.ink} strokeWidth={6} />
                <Text x={330 + i * 330} y={800 - h - 44} size={52}>{f >= Number(at) ? String(lab) : '?'}</Text>
                <Text x={330 + i * 330} y={846} size={34} color="#5B6470">{String(l)}</Text>
              </G2>
            );
          })}
          <G2 x={1420} y={330} s={P0('c6f', 7) * bump(tb, 0.12)} o={dim(tb)}>
            <Cup s={0.8} f={f} label="latte" />
            <Text x={0} y={200} size={40} color={C.red}>tough business</Text>
          </G2>
          <G2 x={1420} y={700} s={P0('c6f', 9) * bump(sw, 0.2)} o={dim(sw)}>
            <MoneyStack n={6} s={1} />
            <Text x={0} y={70} size={40} color={C.green}>prepaid cash: sweet</Text>
          </G2>
          <SourceTag f={f} at={fi} text="Starbucks FY2025 results: operating margin 7.9% vs 15.0% (FY2024)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 Gift cards everywhere ============
  {
    const ev = w('c7a', 'everywhere');
    const fo = w('c7b', 'forty');
    const tw = w('c7b', 'two');
    q(ev, 'pop', 0.5);
    q(fo, 'ding', 0.6);
    q(tw, 'cash', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {Array.from({length: 6}).map((_, i) => (
            <G2 key={i} x={180 + (i % 3) * 230} y={260 + Math.floor(i / 3) * 170} s={pop(f, A('c7a') + 1 + i) * bump(ev + i * 2, 0.15)} r={-10 + i * 5}>
              <GiftCard s={0.55} color={[GREEN, C.red, C.blue, C.navy, C.gold, '#8C5A33'][i]} title={['COFFEE', 'SHOES', 'BOOKS', 'MOVIES', 'PIZZA', 'GAMES'][i]} />
            </G2>
          ))}
          <G2 x={400} y={660} s={P0('c7a', 6)}><Text size={40}>gift cards everywhere</Text></G2>
          <G2 x={1320} y={330} s={P0('c7a', 3)}>
            {Array.from({length: 10}).map((_, i) => <Person key={i} x={-360 + (i % 5) * 180} y={Math.floor(i / 5) * 190} s={1.3} c={f >= fo && i < 4 ? C.red : f >= fo && i === 4 ? '#F2A0B4' : '#B8B0A0'} />)}
          </G2>
          <G2 x={1320} y={130} s={P0('c7a', 5) * bump(fo, 0.15)}><Text size={54}>{f >= fo ? '43% of U.S. adults' : '? % of U.S. adults'}</Text></G2>
          <G2 x={1320} y={700} s={P0('c7a', 8) * bump(tw, 0.15)}>
            <Box w={700} h={120} fill={f >= tw ? C.yellow : '#fff'} />
            <Text size={52}>{f >= tw ? 'unused: ~$244 each' : 'unused: $ ?'}</Text>
          </G2>
          <SourceTag f={f} at={fo} text="Bankrate gift card survey (Sept 2024): 43% · avg $244" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c7c', 'twenty');
    const dr = w('c7c', 'drawers');
    const wl = w('c7c', 'wallets');
    const ap = w('c7c', 'apps');
    q(tw, 'cash', 0.7);
    [dr, wl, ap].forEach((x) => q(x, 'pop', 0.5));
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={230} s={P0('c7c') * bump(tw, 0.08)}>
            <Box w={1000} h={200} fill={f >= tw ? C.yellow : '#fff'} />
            <Text size={110}>{f >= tw ? '~$27 BILLION' : '$ ? BILLION'}</Text>
          </G2>
          {['drawers', 'wallets', 'apps'].map((l, i) => {
            const at = [dr, wl, ap][i];
            return (
              <G2 key={l} x={420 + i * 540} y={620} s={P0('c7c', 3 + i * 2) * bump(at, 0.15)} o={dim(at)}>
                <Frame w={420} h={380} label={l}>
                  {i === 0 && <Drawer s={0.5} y={0} open={0.8}><GiftCard s={0.5} /></Drawer>}
                  {i === 1 && (
                    <g>
                      <rect x={-140} y={-110} width={280} height={180} rx={20} fill="#8C5A33" stroke={C.ink} strokeWidth={6} />
                      <GiftCard s={0.45} y={-110} color={C.red} />
                      <rect x={-140} y={-50} width={280} height={120} rx={20} fill="#A8744A" stroke={C.ink} strokeWidth={6} />
                    </g>
                  )}
                  {i === 2 && <Phone s={0.5} y={-20} title="OLD APP" value="$18" color={C.gray} />}
                </Frame>
              </G2>
            );
          })}
          <SourceTag f={f} at={tw} text="Bankrate (2024): ≈ $27 billion in unused gift cards, vouchers & store credit" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ml = w('c7d', 'miles');
    const ex = w('c7d', 'expire');
    const fg = w('c7d', 'forgotten');
    const st = w('c7d', 'seat');
    q(ml, 'ding', 0.5);
    q(ex, 'stamp', 0.6);
    q(fg, 'cricket', 0.4);
    q(st, 'buzz', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P0('c7d')}><Text size={52}>remember ep. 11? airline miles</Text></G2>
          <G2 x={1250} y={330} s={0.9 * P0('c7d', 3)}><Jet /></G2>
          <G2 x={500} y={470} s={P0('c7d', 5) * bump(ml, 0.12)}><MilesCard miles="60,000" /></G2>
          {f >= ex && <Stamp x={500} y={470} s={pop(f, ex, 9, 260)} text="EXPIRED" size={64} color={C.red} r={-10} />}
          <G2 x={500} y={740} s={P0('c7d', 7)}><Text size={40} color={f >= fg ? C.red : '#9C9383'}>expired or forgotten</Text></G2>
          <G2 x={1250} y={680} s={P0('c7d', 8) * bump(st, 0.15)}>
            <rect x={-70} y={-200} width={140} height={210} rx={30} fill={C.blue} stroke={C.ink} strokeWidth={6} />
            <rect x={-90} y={0} width={180} height={60} rx={20} fill={C.blue} stroke={C.ink} strokeWidth={6} />
            {f >= st && <XMark s={0.4 * pop(f, st)} y={-80} />}
          </G2>
          <G2 x={1600} y={680} s={P0('c7d', 9)}><Text size={36} color={f >= st ? C.green : '#9C9383'}>seat never given</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fd = w('c7e', 'federal');
    const fv = w('c7e', 'five');
    const stt = w('c7e', 'states');
    const us = w('c7f', 'useless');
    q(fd, 'paper', 0.6);
    q(fv, 'stamp', 0.6);
    q(stt, 'pop', 0.5);
    q(us, 'trombone', 0.5);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P0('c7e')}><Text size={54}>the rules (U.S.)</Text></G2>
          <G2 x={380} y={480} s={0.75 * P0('c7e', 3) * bump(fd, 0.1)} o={dim(fd)}>
            <Contract lines={['federal law', 'gift cards:', 'no expiry for 5+ yrs']} signed={1} />
          </G2>
          <Calendar x={380} y={820} s={0.45 * P0('c7e', 5) * bump(fv)} top="AT LEAST" year={f >= fv ? '5 YRS' : '?'} flip={0} />
          <G2 x={960} y={520} s={P0('c7e', 7) * bump(stt, 0.12)} o={dim(stt)}>
            <BankHall label="STATE" s={0.6} y={120} />
            <Text y={200} size={34}>some collect unclaimed balances</Text>
          </G2>
          <G2 x={1560} y={520} s={P0('c7e', 9) * bump(us, 0.12)} o={f >= A('c7f') ? 1 : 0.45}>
            <Drawer s={0.7} open={1}><GiftCard s={0.55} value="$25" /></Drawer>
            <Cobweb x={-180} y={-140} s={0.8} />
            <Text y={200} size={38} color={f >= us ? C.red : '#9C9383'}>{f >= us ? 'never expires... still lost' : 'but...'}</Text>
          </G2>
          <SourceTag f={f} at={fv} text="Credit CARD Act of 2009 / CFPB gift card rules; state laws vary" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 Practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e')];
    const ed = w('c8a', 'education');
    const ov = w('c8b', 'overload');
    const nt = w('c8b', 'nothing');
    const fd = w('c8c', 'insurance');
    const dr = w('c8d', 'drawer');
    const lo = w('c8d', 'leftover');
    const nb = w('c8e', 'number');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ed, 'pop', 0.5);
    q(ov, 'buzz', 0.4);
    q(nt, 'cricket', 0.4);
    q(fd, 'buzz', 0.5);
    q(dr, 'whoosh_s', 0.5);
    q(lo, 'coin', 0.6);
    q(nb, 'scribble', 0.6);
    const cur = hs.filter((x) => f >= x - 6).length;
    const items = ["Don't overload the card", 'Not a bank: no FDIC', 'Use up your balances', 'Set a coffee budget'];
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={110}><Text size={56}>What Dave does now</Text></G2>
          <G2 x={620} y={170} s={bump(ed, 0.15)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={300 + i * 150} s={0.88 * P0('c8a', i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.3} color={GREEN} w={1000} />)}
          <G2 x={1560} y={500} s={P0('c8a', 8)}>
            <rect x={-300} y={-360} width={600} height={720} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            {cur === 0 && (
              <g>
                <Dave f={f} x={-90} y={300} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}]} />
                <G2 x={140} y={-80} s={0.6}><Phone title="COFFEE APP" value="$50.00" color={GREEN} /></G2>
              </g>
            )}
            {cur === 1 && (
              <g>
                <G2 x={-130} y={-60} s={0.55}><Phone title="COFFEE APP" value="$200" color={C.red} /></G2>
                <XMark x={-130} y={-60} s={0.35} />
                <G2 x={140} y={-60} s={0.55}><Phone title="COFFEE APP" value="$15" color={GREEN} /></G2>
                <Check x={140} y={-200} />
                <Text y={250} size={34} color={f >= nt ? C.red : '#9C9383'}>interest earned: $0</Text>
              </g>
            )}
            {cur === 2 && (
              <g>
                <Shield y={-40} s={1.2} />
                {f >= fd ? <XMark y={-40} s={0.6 * pop(f, fd)} /> : null}
                <Text y={260} size={34}>app balance ≠ bank deposit</Text>
              </g>
            )}
            {cur === 3 && (
              <g>
                <Drawer y={40} s={0.8} open={1}>
                  <GiftCard s={0.45} x={-80} value="$6" color={C.red} />
                  <GiftCard s={0.45} x={80} value="$9" />
                </Drawer>
                <Text y={-250} size={36} color={f >= lo ? C.green : '#9C9383'}>still YOUR money</Text>
              </g>
            )}
            {cur >= 4 && (
              <g>
                <rect x={-190} y={-250} width={380} height={440} rx={14} fill="#FFF7D6" stroke={C.ink} strokeWidth={6} />
                <Text y={-190} size={36}>COFFEE BUDGET</Text>
                {[-90, -10, 70].map((y) => <line key={y} x1={-150} x2={150} y1={y} y2={y} stroke="#C9B98F" strokeWidth={4} />)}
                <Text y={-40} size={60} color={f >= nb ? C.green : '#C9B98F'}>{f >= nb ? '$30 / month' : '$ ___'}</Text>
                <Text y={260} size={30}>decide before you tap</Text>
              </g>
            )}
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dg = w('c8f', 'dug');
    const th = w('c8f', 'three');
    const tw = w('c8f', 'twenty');
    const lu = w('c8f', 'lunch');
    q(dg, 'crinkle', 0.5);
    q(th, 'pop', 0.6);
    q(tw, 'cash', 0.7);
    q(lu, 'chime', 0.6);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={360} y={880} s={1.2} keys={[{at: 0, pose: 'carry', expr: 'think', look: 0.8}, {at: th, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={980} y={760} s={0.8 * P0('c8f')}><Drawer open={1} /></G2>
          {[0, 1, 2].map((i) => (
            <G2 key={i} x={800 + i * 200} y={f >= th ? 360 : 660} s={0.5 * P0('c8f', 3 + i) * bump(th + i * 3, 0.2)} r={-10 + i * 10}>
              <GiftCard value={['$12', '$9', '$7'][i]} color={[GREEN, C.red, C.blue][i]} />
            </G2>
          ))}
          <G2 x={1560} y={250} s={P0('c8f', 6) * bump(tw, 0.15)}>
            <Box w={440} h={140} fill={f >= tw ? C.yellow : '#fff'} />
            <Text size={80}>{f >= tw ? '$28' : '$ ?'}</Text>
          </G2>
          <G2 x={1560} y={600} s={0.8 * P0('c8f', 8) * bump(lu, 0.15)} o={dim(lu)}><Sandwich n={0} /></G2>
          <G2 x={1560} y={780} s={P0('c8f', 9)}><Text size={40} color={f >= lu ? C.green : '#9C9383'}>lunch is on the drawer</Text></G2>
          {f >= tw && <Sparkle x={1000} y={300} t={(f % 30) / 30} s={0.9} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Recap ============
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const recap = ['Loaded card = cash now, coffee later (0% loan)', 'Never-spent money = breakage = revenue', 'Coffee pays the bills; prepaid cash keeps you'];
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P0('d1a')}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={180} y={370 + i * 170} s={P0('d1a', 2 + i * 2)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={GREEN} w={1560} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ap = w('d2a', 'apple');
    const ip = w('d2a', 'iphones');
    const mm = w('d2a', 'machine');
    const nx = w('d2b', 'next');
    q(ap, 'pop', 0.6);
    q(ip, 'pop2', 0.5);
    q(mm, 'clank', 0.6);
    q(nx, 'stamp', 0.7);
    scene(A('d2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P0('d2a')}><Text size={56}>NEXT TIME</Text></G2>
          <G2 x={430} y={520} s={1.6 * P0('d2a', 3) * bump(ap, 0.1)}><Apple /></G2>
          <G2 x={1000} y={520} s={P0('d2a', 5) * bump(ip, 0.1)}>
            <rect x={-150} y={-280} width={300} height={560} rx={40} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
            <rect x={-130} y={-255} width={260} height={510} rx={24} fill="#F7FAFD" />
            <G2 y={-40} s={f >= mm ? 1 : 0.7} o={f >= mm ? 1 : 0.4}>
              <Gear x={-40} y={-30} s={0.8} rot={f * 3} color={C.gold} />
              <Gear x={50} y={60} s={0.6} rot={-f * 4} color={C.green} />
            </G2>
            <Text y={200} size={34}>{f >= mm ? 'hidden money machine' : 'just a phone?'}</Text>
          </G2>
          <Dave f={f} x={1500} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}, {at: mm, pose: 'point_l', expr: 'shock', look: -0.8}]} />
          <G2 x={1500} y={300} s={P0('d2a', 7) * bump(nx, 0.2)}>
            <Stamp text={f >= nx ? 'NEXT VIDEO' : 'COMING UP'} size={56} color={f >= nx ? C.red : '#9AA5B1'} r={-5} />
            <Text y={90} size={36}>How Apple really makes money</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('d2c', 'subscribe');
    const ct = w('d2c', 'nothing');
    const lt = w('d2c', 'drawer');
    q(sb + 8, 'click', 0.8);
    q(sb + 12, 'ding', 0.6);
    q(ct, 'coin', 0.5);
    q(lt, 'pop', 0.5);
    scene(A('d2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={960} y={400} s={1.3 * P0('d2c')} done={f > sb + 8 ? 1 : 0} />
          <Bell x={1400} y={400} s={P0('d2c', 3)} f={f} ring={f > sb + 10 && f < sb + 44 ? 1 : 0} />
          <Dave f={f} x={400} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
          <G2 x={960} y={620} s={P0('d2c', 5) * bump(ct, 0.15)}><Text size={46} color={f >= ct ? C.green : '#9C9383'}>price: $0 · always</Text></G2>
          <G2 x={1540} y={760} s={0.55 * P0('d2c', 7) * bump(lt, 0.15)}>
            <Drawer open={1}><GiftCard s={0.5} /></Drawer>
            <XMark s={0.5} y={-40} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  const SUB = we('c3e', 'dollars') + 20;
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
