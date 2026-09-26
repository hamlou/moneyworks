import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bubble, Calendar, Duck, Keyboard, Monitor, MoneyStack, Paper, Puff, SourceTag, Sparkle, Stamp, Text, XMark} from '../props';
import {Bar, Dial, Envelope, Frame, Phone, Printer, Row, SubButton, Bell, CreditCard} from '../props2';
import {Raccoon} from '../props3';
import {Globe, House, LineChart} from '../props4';
import {Contract} from '../props5';
import {Bread} from '../props6';
import {Thermo} from '../props7';
import {Scale} from '../props8';
import {Bicycle, Palm, Pond, Seesaw, Ship, SlotMachine, Stone, Tapes, Train} from '../props16';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string}> = ({w, h, fill = '#fff'}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
);

export const Ep16: React.FC = () => {
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

  // ============ COLD OPEN ============
  {
    const lt = w('o1', 'letter');
    const cr = w('o1', 'credit');
    const up = w('o1', 'up');
    const sv = w('o1', 'savings');
    const mr = w('o1', 'more');
    const nb = w('o2', 'nobody');
    const tw = w('o2', 'twelve');
    const wa = w('o2', 'washington');
    q(2, 'pop', 0.6);
    q(lt, 'mail', 0.6);
    q(cr, 'pop', 0.5);
    q(up, 'buzz', 0.5);
    q(sv, 'pop', 0.5);
    q(mr, 'coin', 0.6);
    q(nb, 'pop', 0.5);
    q(tw, 'crowd', 0.4);
    q(wa, 'ding', 0.5);
    scene(0, () =>
      f < A('o2') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.25} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: up, pose: 'shock', expr: 'shock', look: 0.8}, {at: mr, pose: 'shrug', expr: 'think', look: 0.8}]} />
            <Envelope x={380} y={260} s={0.9 * pop(f, 2)} label="DAVE" />
            {f >= cr && (
              <G2 x={1050} y={420} s={pop(f, cr)}>
                <CreditCard s={1.1} />
                {f >= up && <G2 x={330} y={-40} s={pop(f, up)}><Text size={90} color={C.red}>APR ↑</Text></G2>}
              </G2>
            )}
            {f >= sv && (
              <G2 x={1500} y={780} s={pop(f, sv)}>
                <Phone s={0.8} title="SAVINGS" value={f >= mr ? '+ more' : '...'} color={C.green} />
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={500} y={820} s={0.6} label="DAVE'S BANK" />
            <Banker f={f} x={500} y={880} s={0.9} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: 0.6}]} />
            <G2 x={500} y={300} s={pop(f, nb)}><Bubble text="wasn't us!" size={44} tail="down" /></G2>
            {f >= tw && Array.from({length: 12}).map((_, i) => (
              <Stick key={i} f={f} x={1080 + (i % 6) * 130} y={i < 6 ? 560 : 900} s={0.6 * pop(f, tw + i * 2)} acc={i % 3 === 0 ? ['glasses', 'tie'] : i % 3 === 1 ? ['tie'] : ['bun', 'glasses']} seed={200 + i} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.4}]} />
            ))}
            <G2 x={1400} y={170} s={pop(f, A('o2') + 4)}><Text size={52}>12 people</Text></G2>
            {f >= wa && <G2 x={1400} y={240} s={pop(f, wa)}><Text size={40} color={C.blue}>in Washington</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const sp = w('o3', 'september');
    const qt = w('o3', 'quarter');
    const rp = w('o3', 'rippled');
    const am = w('o3', 'america');
    q(sp, 'flip', 0.6);
    q(qt, 'stamp', 0.7);
    q(rp, 'whoosh', 0.5);
    q(am, 'ding', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={330} y={320} s={0.9 * pop(f, A('o3'))} top="SEP 16" year={2026} flip={0} />
          <G2 x={960} y={300} s={pop(f, qt)}><Text size={150} color={C.red} stroke={C.ink} sw={10}>+0.25%</Text></G2>
          {f >= rp && <Pond f={f} t0={rp} x={960} y={780} s={0.8} rings={4} />}
          {f >= rp && <Stone x={960} y={770} s={pop(f, rp)} />}
          {f >= am && <G2 x={1560} y={560} s={pop(f, am)}><Text size={44}>loans all over America</Text></G2>}
          <SourceTag f={f} at={qt} text="Federal Reserve, FOMC statement, Sept 16, 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('o4', 'federal');
    const wl = w('o4', 'wallet');
    const bo = w('o4', 'boss');
    const dk = w('o5', 'duck');
    const tr = w('o5', 'trip');
    q(fr, 'stamp', 0.6);
    q(wl, 'cash', 0.5);
    q(bo, 'boing', 0.5);
    q(dk, 'quack', 0.8);
    q(tr, 'pop', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bank x={620} y={760} s={0.9 * pop(f, A('o4'))} label="THE FED" />
          {f >= fr && <G2 x={620} y={150} s={pop(f, fr)}><Text size={64}>The Federal Reserve</Text></G2>}
          <Dave f={f} x={1450} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: dk, pose: 'shock', expr: 'shock', look: -0.8}]} />
          {f >= wl && f < dk && <G2 x={1450} y={330} s={pop(f, wl)}><Bubble text={'more power over my\nwallet than my boss?'} size={40} tail="down" /></G2>}
          {f >= dk && <Duck f={f} x={1050} y={880} s={0.9 * pop(f, dk)} />}
          {f >= dk && <G2 x={1450} y={330} s={pop(f, dk + 4)}><Bubble text="a fake DUCK HUNT?!" size={44} tail="down" /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'fed'), w('o6', 'cards'), w('o6', 'printing'), w('o6', 'control')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const lab = ['WHAT IS THE FED?', 'RATES → YOUR WALLET', '"PRINTING MONEY"', 'WHO CONTROLS IT?'];
    const col = [C.blue, C.red, C.green, '#5B6470'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color="#5B6470">TODAY</Text>
          {lab.map((l, i) => (
            <Frame key={l} x={270 + i * 460} y={520} s={pop(f, pv[i] - 2)} w={420} h={440} label={l}>
              {i === 0 && <Bank s={0.4} y={90} label="FED" />}
              {i === 1 && <G2 y={-10}><CreditCard s={0.6} /></G2>}
              {i === 2 && <Printer s={1.1} y={10} />}
              {i === 3 && <Dial s={0.8} y={40} v={0.5 + 0.3 * Math.sin(f / 10)} label="" />}
              <Text y={-170} size={44} color={col[i]}>{['1', '2', '3', '4'][i]}</Text>
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 What is the Fed ============
  {
    const cb = w('c1b', 'central');
    const bb = w('c1b', 'banks');
    const ca = w('c1b', 'cant');
    const db = w('c1b', 'can');
    q(cb, 'pop', 0.5);
    q(bb, 'ding', 0.5);
    q(ca, 'buzz', 0.5);
    q(db, 'ding', 0.5);
    const sv = w('c1c', 'seven');
    const tr = w('c1c', 'twelve');
    const cm = w('c1c', 'committee');
    const vm = w('c1d', 'voting');
    const ei = w('c1d', 'eight');
    const wd = w('c1d', 'world');
    q(sv, 'pop', 0.5);
    q(tr, 'pop', 0.5);
    q(cm, 'pop', 0.5);
    q(vm, 'ding', 0.5);
    q(ei, 'ding', 0.5);
    q(wd, 'whoosh', 0.4);
    const pr = w('c1e', 'prices');
    const jb = w('c1e', 'jobs', 1);
    const tp = w('c1f', 'two');
    const zr = w('c1f', 'zero');
    const bo = w('c1f', 'boring');
    q(pr, 'stamp', 0.5);
    q(jb, 'stamp', 0.5);
    q(tp, 'ding', 0.6);
    q(zr, 'buzz', 0.4);
    q(bo, 'pop', 0.5);
    const th = w('c1g', 'thermostat');
    const hot = w('c1g', 'hot');
    const cold = w('c1g', 'cold');
    q(th, 'pop', 0.6);
    q(hot, 'sting', 0.4);
    q(cold, 'tick', 0.5);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Bank x={700} y={822} s={0.95} label="THE FED" />
            <G2 x={700} y={200} s={pop(f, A('c1a') + 4)}><Text size={60}>{f >= cb ? "America's central bank" : 'the Fed'}</Text></G2>
            {f >= bb && <G2 x={700} y={290} s={pop(f, bb)}><Text size={44} color={C.blue}>the bank for banks</Text></G2>}
            <Dave f={f} x={1350} y={822} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: ca, pose: 'shrug', expr: 'sad', look: -0.8}]} />
            {f >= ca && <XMark x={1350} y={420} s={0.7 * pop(f, ca)} />}
            {f >= db && <Bank x={1650} y={822} s={0.4 * pop(f, db)} label="DAVE'S BANK" />}
            {f >= db && <G2 x={1650} y={560} s={pop(f, db)}><Text size={60} color={C.green}>✓</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Text x={960} y={120} size={56}>3 parts</Text>
            {[
              [sv, '7 GOVERNORS', 'the Board · Washington'],
              [tr, '12 REGIONAL FEDS', 'around the country'],
              [cm, 'RATE COMMITTEE', 'sets interest rates'],
            ].map(([at, a, b], i) => (
              <G2 key={i} x={380 + i * 580} y={380} s={pop(f, (at as number) - 2)}>
                <Box w={500} h={240} fill={i === 2 ? '#FFF3D1' : '#fff'} />
                <Text y={-30} size={48} color={[C.blue, C.green, C.red][i]}>{a as string}</Text>
                <Text y={50} size={34} color="#5B6470">{b as string}</Text>
              </G2>
            ))}
            {f >= vm && <G2 x={960} y={680} s={pop(f, vm)}><Text size={52}>{f >= ei ? '12 voters · 8 meetings a year' : '12 voters'}</Text></G2>}
            {f >= wd && <Globe f={f} x={960} y={900} s={0.7 * pop(f, wd)} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, A('c1e') + 2)}><Text size={60}>The Fed's 2 jobs</Text></G2>
            {f >= pr && <Stamp x={560} y={330} s={pop(f, pr, 9, 260)} text="STABLE PRICES" size={56} color={C.blue} r={-4} />}
            {f >= jb && <Stamp x={1360} y={330} s={pop(f, jb, 9, 260)} text="MAXIMUM JOBS" size={56} color={C.green} r={4} />}
            {f >= tp && <G2 x={560} y={640} s={pop(f, tp)}><Text size={180} color={C.blue} stroke={C.ink} sw={10}>2%</Text><Text y={120} size={40}>inflation goal per year</Text></G2>}
            {f >= zr && <G2 x={1360} y={640} s={pop(f, zr)}><Text size={52} color="#5B6470">not 0%</Text>{f >= bo && <Text y={80} size={44} color={C.green}>gentle · boring · 2</Text>}</G2>}
            <Dave f={f} x={1700} y={960} s={0.7} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Thermo x={960} y={700} s={2 * pop(f, A('c1g'))} level={f < hot ? 0.5 : f < cold ? ease(f, hot, hot + 20, 0.9, 0.5) : ease(f, cold, cold + 20, 0.15, 0.5)} />
            <G2 x={960} y={130} s={pop(f, th)}><Text size={60}>the economy's thermostat</Text></G2>
            {f >= hot && <G2 x={450} y={450} s={pop(f, hot)}><Text size={60} color={C.red}>TOO HOT</Text><Text y={70} size={40}>→ cool it down</Text></G2>}
            {f >= cold && <G2 x={1470} y={450} s={pop(f, cold)}><Text size={60} color={C.blue}>TOO COLD</Text><Text y={70} size={40}>→ warm it up</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Duck hunt ============
  {
    const ns = w('c2a', 'nineteen');
    const nc = w('c2b', 'no');
    const pn = w('c2b', 'panic');
    const ln = w('c2b', 'lined');
    const fl = w('c2b', 'fail');
    const rn = w('c2c', 'run');
    const cn = w('c2c', 'country');
    const jp = w('c2d', 'morgan');
    const pl = w('c2d', 'plan');
    q(ns, 'flip', 0.6);
    q(pn, 'sting', 0.5);
    q(ln, 'crowd', 0.5);
    q(fl, 'thud', 0.6);
    q(rn, 'pop', 0.5);
    q(jp, 'pop', 0.6);
    q(pl, 'buzz', 0.5);
    const nt = w('c2e', 'november');
    const tn = w('c2e', 'train');
    const jk = w('c2e', 'jekyll');
    const cv = w('c2f', 'cover');
    const dh = w('c2f', 'duck');
    const fn = w('c2f', 'first');
    const dc = w('c2g', 'duck');
    const cs = w('c2g', 'consulted');
    const ac = w('c2h', 'act');
    const wi = w('c2h', 'wilson');
    const dec = w('c2h', 'december');
    const bn = w('c2h', 'born');
    q(nt, 'flip', 0.6);
    q(tn, 'whoosh', 0.5);
    q(jk, 'pop', 0.5);
    q(cv, 'pop', 0.5);
    q(dh, 'quack', 0.7);
    q(fn, 'paper', 0.5);
    q(dc, 'quack', 0.8);
    q(cs, 'trombone', 0.5);
    q(ac, 'paper', 0.6);
    q(wi, 'scribble', 0.6);
    q(dec, 'flip', 0.5);
    q(bn, 'stamp', 0.7);
    const names = ['NELSON', 'PAUL', 'FRANK', 'HARRY', 'PIATT', 'ARTHUR'];
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.45)'}}>
            <Street f={f} />
            <Svg>
              <Calendar x={260} y={240} s={0.75} top="YEAR" year={1907} flip={0} />
              <Bank x={1400} y={822} s={0.8} label="BANK" />
              {f >= nc && f < pn && <G2 x={700} y={260} s={pop(f, nc)}><Text size={50}>no central bank</Text></G2>}
              {f >= pn && <Stamp x={700} y={260} s={pop(f, pn, 9, 260)} text="PANIC" size={80} color={C.red} r={-6} />}
              {f >= ln && Array.from({length: 6}).map((_, i) => (
                <Stick key={i} f={f} x={260 + i * 130} y={822} s={0.8 * pop(f, ln + i * 3)} acc={i % 2 ? ['fedora'] : ['bun']} seed={300 + i} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: fl, pose: 'panic', expr: 'shock', look: 0.8}]} />
              ))}
              {f >= fl && f < rn && <XMark x={1400} y={500} s={pop(f, fl)} />}
              {f >= rn && f < jp && <G2 x={1400} y={260} s={pop(f, rn)}><Text size={40}>{f >= cn ? '...all over the country' : 'a bank run (episode 1)'}</Text></G2>}
              {f >= jp && <Stick f={f} x={1150} y={822} s={1.05 * pop(f, jp)} acc={['tophat', 'tie']} seed={333} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}]} />}
              {f >= jp && <G2 x={1150} y={380} s={pop(f, jp)}><Text size={44}>J.P. Morgan</Text></G2>}
              {f >= pl && <G2 x={1400} y={170} s={pop(f, pl)}><Text size={44} color={C.red}>one rich guy ≠ a plan</Text></G2>}
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.5} />
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.45)'}}>
            <Street f={f} />
            <Svg>
              <Calendar x={260} y={240} s={0.75} top="NOV" year={1910} flip={0} />
              {f < cv ? (
                <g>
                  <Train f={f} x={lin(f, A('c2e'), A('c2f'), 700, 1150)} y={780} s={1} />
                  {f >= tn && <G2 x={960} y={200} s={pop(f, tn)}><Text size={50}>a secret train...</Text></G2>}
                  {f >= jk && <Palm x={1750} y={822} s={1.1 * pop(f, jk)} />}
                  {f >= jk && <G2 x={1600} y={300} s={pop(f, jk)}><Text size={44}>Jekyll Island, Georgia</Text></G2>}
                </g>
              ) : (
                <g>
                  <Palm x={1780} y={822} s={1} />
                  {names.map((n, i) => (
                    <G2 key={n} x={330 + i * 230} y={0}>
                      <Stick f={f} x={0} y={822} s={0.85} acc={i % 2 ? ['fedora', 'tie'] : ['tie']} seed={400 + i} keys={[{at: 0, pose: i === 0 ? 'point_up' : 'idle', expr: 'suspicious', look: 0.3}]} />
                      {f >= fn && <G2 y={620} s={pop(f, fn + i * 3)}><rect x={-80} y={-24} width={160} height={48} rx={10} fill="#fff" stroke={C.ink} strokeWidth={4} /><Text size={28}>{n}</Text></G2>}
                    </G2>
                  ))}
                  <G2 x={560} y={270} s={pop(f, cv)}><Bubble text={f >= dh ? "we're... duck hunting!" : 'our cover story?'} size={44} tail="down" /></G2>
                  {f >= fn && <G2 x={1300} y={200} s={pop(f, fn)}><Text size={40}>first names only</Text></G2>}
                </g>
              )}
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.5} />
        </AbsoluteFill>
      ) : f < A('c2h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Duck f={f} x={960} y={720} s={1.8 * pop(f, A('c2g'))} />
            <G2 x={960} y={300} s={pop(f, dc)}><Bubble text={f >= cs ? 'I was NOT consulted.' : 'excuse me?'} size={52} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.35)'}}>
            <Board />
            <Svg>
              <Contract x={560} y={560} s={1.1 * pop(f, A('c2h'))} lines={['FEDERAL', 'RESERVE ACT', '1913']} signed={f >= wi ? ease(f, wi, wi + 25) : 0} />
              <Stick f={f} x={1200} y={900} s={1.1} acc={['glasses', 'tie']} seed={501} keys={[{at: 0, pose: 'present', expr: 'neutral', look: -0.8}]} />
              {f >= wi && <G2 x={1200} y={460} s={pop(f, wi)}><Text size={44}>President Woodrow Wilson</Text></G2>}
              {f >= dec && <Calendar x={1650} y={300} s={0.7 * pop(f, dec)} top="DEC 23" year={1913} flip={0} />}
              {f >= bn && <Stamp x={1450} y={680} s={pop(f, bn, 9, 260)} text="THE FED IS BORN" size={56} color={C.green} r={-6} />}
              <SourceTag f={f} at={A('c2h') + 10} text="Federal Reserve History: Jekyll Island (1910), Federal Reserve Act (1913)" />
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.35} />
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Master dial ============
  {
    const sn = w('c3a', 'special');
    const ff = w('c3b', 'federal');
    const ov = w('c3b', 'overnight');
    const ex = w('c3c', 'extra');
    const sh = w('c3c', 'short');
    const ld = w('c3c', 'lend');
    const tg = w('c3d', 'target');
    const pk = w('c3d', 'park');
    const tn = w('c3d', 'three');
    const ls = w('c3d', 'less');
    q(sn, 'pop', 0.6);
    q(ff, 'stamp', 0.6);
    q(ov, 'tick', 0.5);
    q(ex, 'cash', 0.5);
    q(sh, 'buzz', 0.4);
    q(ld, 'whoosh_s', 0.5);
    q(tg, 'pop', 0.5);
    q(pk, 'coin', 0.6);
    q(tn, 'ding', 0.6);
    q(ls, 'boing', 0.5);
    const md = w('c3e', 'master');
    const u1 = w('c3e', 'up');
    const d1 = w('c3e', 'down');
    const nw = w('c3f', 'now');
    const rg = w('c3f', 'range');
    const hk = w('c3g', 'hike');
    const tz = w('c3g', 'twelve');
    const au = w('c3g', 'august');
    const tf = w('c3g', 'three');
    q(md, 'pop', 0.6);
    q(u1, 'click', 0.6);
    q(d1, 'click', 0.6);
    q(nw, 'pop', 0.5);
    q(rg, 'stamp', 0.7);
    q(hk, 'ding', 0.5);
    q(tz, 'pop', 0.5);
    q(au, 'paper', 0.5);
    q(tf, 'ding', 0.5);
    const dv = f < u1 ? 0.5 : f < d1 ? ease(f, u1, u1 + 15, 0.5, 0.9) : f < nw ? ease(f, d1, d1 + 15, 0.9, 0.15) : ease(f, nw, rg + 10, 0.15, 0.62);
    scene(A('c3a'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, sn)}><Text size={60}>{f >= ff ? 'the federal funds rate' : 'one special number'}</Text></G2>
            {f >= ov && <G2 x={960} y={210} s={pop(f, ov)}><Text size={40} color="#5B6470">bank → bank · overnight loans</Text></G2>}
            <Bank x={450} y={800} s={0.6} label="BANK A" />
            <Bank x={1470} y={800} s={0.6} label="BANK B" />
            <G2 x={1700} y={330}><circle r={60} fill="#FFF3B0" stroke={C.ink} strokeWidth={5} /><circle cx={30} cy={-20} r={55} fill="#FBF6EC" /></G2>
            {f >= ex && <G2 x={450} y={420} s={pop(f, ex)}><Text size={40} color={C.green}>extra cash</Text></G2>}
            {f >= sh && <G2 x={1470} y={420} s={pop(f, sh)}><Text size={40} color={C.red}>short</Text></G2>}
            {f >= ld && <G2 x={lin(f, ld, ld + 40, 600, 1300)} y={620}><MoneyStack n={3} s={0.6} label="1 NIGHT" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={500} y={820} s={0.8} label="THE FED" />
            <G2 x={960} y={130} s={pop(f, tg)}><Text size={56}>the Fed sets a TARGET</Text></G2>
            {f >= pk && <G2 x={500} y={300} s={pop(f, pk)}><Text size={44}>pays banks on parked money</Text></G2>}
            {f >= tn && <G2 x={500} y={400} s={pop(f, tn)}><Text size={90} color={C.green} stroke={C.ink} sw={8}>3.9%</Text></G2>}
            <Stick f={f} x={1400} y={880} s={1.1} acc={['tie']} seed={600} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: ls, pose: 'shrug', expr: 'smug', look: -0.8}]} />
            {f >= ls && <G2 x={1400} y={380} s={pop(f, ls)}><Bubble text={'lend it for LESS?\nno thanks.'} size={42} tail="down" /></G2>}
            <SourceTag f={f} at={tn} text="Fed: interest on reserve balances 3.90% (Sept 17, 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dial x={620} y={600} s={2.2 * pop(f, A('c3e'))} v={dv} label="THE MASTER DIAL" />
            {f >= u1 && f < nw && <G2 x={1400} y={400} s={pop(f, u1)}><Text size={48} color={C.red}>up → money costs more</Text></G2>}
            {f >= d1 && f < nw && <G2 x={1400} y={500} s={pop(f, d1)}><Text size={48} color={C.green}>down → money costs less</Text></G2>}
            {f >= rg && (
              <G2 x={1400} y={400} s={pop(f, rg)}>
                <Box w={640} h={220} fill="#FFF3D1" />
                <Text y={-50} size={38} color="#5B6470">FED FUNDS TARGET · SEPT 2026</Text>
                <Text y={30} size={90} color={C.red}>3.75%–4%</Text>
              </G2>
            )}
            {f >= hk && <G2 x={1400} y={620} s={pop(f, hk)}><Text size={40}>{f >= tz ? 'first hike since 2023 · vote 12–0' : 'first hike since 2023'}</Text></G2>}
            {f >= au && <G2 x={1400} y={740} s={pop(f, au)}><Text size={40} color={C.red}>{f >= tf ? 'August inflation: 3.4%' : 'inflation: still too high'}</Text></G2>}
            <SourceTag f={f} at={rg} text="Federal Reserve (Sept 16, 2026) · BLS CPI (Aug 2026)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Ripple ============
  {
    const st = w('c4a', 'stone');
    const sf = w('c4b', 'stone');
    const bk = w('c4b', 'banks');
    const cc = w('c4c', 'credit');
    const vr = w('c4c', 'variable');
    const tt = w('c4c', 'twenty');
    const rc = w('c4c', 'raccoon');
    const car = w('c4d', 'car');
    const bus = w('c4d', 'business');
    const mg = w('c4d', 'mortgages');
    q(st, 'pop', 0.5);
    q(sf, 'thud', 0.6);
    q(bk, 'pop', 0.5);
    q(cc, 'pop', 0.5);
    q(vr, 'ding', 0.4);
    q(tt, 'coin', 0.6);
    q(rc, 'pop2', 0.7);
    q(car, 'pop', 0.5);
    q(bus, 'pop', 0.5);
    q(mg, 'pop', 0.5);
    const lt = w('c4e', 'long');
    const sv = w('c4e', 'seven');
    const hi = w('c4e', 'highest');
    const th = w('c4f', 'three');
    const tw = w('c4f', 'twelve');
    const s7 = w('c4f', 'seven');
    const tk = w('c4f', 'thousand', 1);
    const sh = w('c4f', 'same');
    const sm = w('c4f', 'more');
    q(lt, 'pop', 0.5);
    q(sv, 'stamp', 0.6);
    q(hi, 'ding', 0.5);
    q(th, 'pop', 0.5);
    q(tw, 'coin', 0.5);
    q(s7, 'pop', 0.5);
    q(tk, 'cash', 0.6);
    q(sh, 'pop', 0.5);
    q(sm, 'sting', 0.6);
    const gd = w('c4g', 'good');
    const sa = w('c4g', 'savings');
    const gm = w('c4g', 'grandma');
    const sml = w('c4g', 'smiling');
    const hr = w('c4h', 'higher');
    const lw = w('c4h', 'lower');
    const ss = w('c4h', 'seesaw');
    q(gd, 'ding', 0.5);
    q(sa, 'coin', 0.6);
    q(gm, 'pop', 0.5);
    q(sml, 'heart', 0.5);
    q(hr, 'boing', 0.5);
    q(lw, 'boing', 0.5);
    q(ss, 'pop', 0.5);
    const rings: [number, string, number, number][] = [
      [bk, 'BANKS', 960, 560],
      [cc, 'CREDIT CARDS', 520, 470],
      [car, 'CAR LOANS', 1420, 470],
      [bus, 'BUSINESS LOANS', 360, 960],
      [mg, 'MORTGAGES', 1560, 960],
    ];
    scene(A('c4a'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c4a') + 2)}><Text size={56}>From the Fed to Dave's wallet</Text></G2>
            <Pond f={f} t0={sf} x={960} y={760} s={1} rings={5} />
            {f >= st && <Stone x={960} y={f < sf ? lin(f, st, sf, 300, 750) : 750} s={1.2} label={f >= sf ? 'THE FED' : undefined} />}
            {rings.map(([at, l, x, y]) => f >= at && (
              <G2 key={l} x={x} y={y} s={pop(f, at)}>
                <rect x={-170} y={-36} width={340} height={72} rx={36} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text size={34}>{l}</Text>
              </G2>
            ))}
            {f >= tt && <G2 x={520} y={320} s={pop(f, tt)}><Text size={60} color={C.red}>~22%</Text></G2>}
            {f >= rc && f < car && <Raccoon f={f} x={220} y={480} s={0.8 * pop(f, rc)} mood="greedy" holdCoin />}
            <SourceTag f={f} at={tt} text="Federal Reserve G.19: credit card rate, accounts assessed interest (2026)" until={car} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <House x={380} y={820} s={0.8 * pop(f, A('c4e'))} />
            <G2 x={380} y={200} s={pop(f, lt)}><Text size={40}>follow long-term rates</Text></G2>
            {f >= sv && f < th && <G2 x={1250} y={450} s={pop(f, sv)}><Text size={140} color={C.red} stroke={C.ink} sw={10}>7.03%</Text><Text y={110} size={40}>{f >= hi ? 'avg 30-yr mortgage · highest of 2026' : 'avg 30-yr mortgage'}</Text></G2>}
            {f >= th && (
              <g>
                <G2 x={1200} y={130} s={pop(f, th)}><Text size={44}>$300,000 mortgage · 30 years</Text></G2>
                <line x1={800} y1={860} x2={1600} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                <Bar x={1000} y={860} h={ease(f, tw - 4, tw + 12, 2, 1265 / 4)} color={C.green} label="at 3%" value="$1,265/mo" w={260} />
                {f >= s7 && <Bar x={1400} y={860} h={ease(f, tk - 4, tk + 12, 2, 1996 / 4)} color={C.red} label="at 7%" value="$1,996/mo" w={260} />}
                {f >= sm && <G2 x={1200} y={230} s={pop(f, sm)}><Text size={52} color={C.red}>same house: +$731 every month</Text></G2>}
              </g>
            )}
            <SourceTag f={f} at={sv} text="Freddie Mac PMMS, Sept 24, 2026 · payment math: standard 30-yr amortization" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, gd)}><Text size={56} color={C.green}>the good side</Text></G2>
            <Bank x={1300} y={820} s={0.7} label="BANK" />
            {f >= sa && <G2 x={1300} y={300} s={pop(f, sa)}><Text size={52}>savings pay more ↑</Text></G2>}
            <Grandma f={f} x={600} y={880} s={1.2 * pop(f, A('c4g'))} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: sml, pose: 'celebrate', expr: 'happy', look: 0.8}]} />
            {f >= sml && <Sparkle x={760} y={420} t={(f % 30) / 30} s={0.8} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Seesaw x={960} y={880} s={1.2 * pop(f, A('c4h'))} tilt={f < lw ? ease(f, hr, hr + 15, 0, 12) : ease(f, lw, lw + 15, 12, -12)} left="BORROWING" right="SAVING" />
            {f >= hr && <G2 x={960} y={200} s={pop(f, hr)}><Text size={56}>{f >= lw ? 'lower rates: the opposite' : 'higher rates: borrowing hurts, saving helps'}</Text></G2>}
            {f >= ss && <G2 x={960} y={300} s={pop(f, ss)}><Text size={48} color={C.blue}>a seesaw</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 2022 ============
  {
    const tt = w('c5a', 'twenty');
    const pw = w('c5b', 'wild');
    const nn = w('c5b', 'nine');
    const fy = w('c5b', 'forty');
    const br = w('c5c', 'bread');
    const tm = w('c5c', 'much');
    const up = w('c5c', 'up');
    q(tt, 'flip', 0.5);
    q(pw, 'sting', 0.5);
    q(nn, 'stamp', 0.7);
    q(fy, 'ding', 0.5);
    q(br, 'pop', 0.5);
    q(tm, 'cash', 0.5);
    q(up, 'boing', 0.5);
    const gr = w('c5d', 'grabbed');
    const zr = w('c5d', 'zero');
    const el = w('c5d', 'eleven');
    const ov = w('c5d', 'five');
    const fs = w('c5e', 'fastest');
    const wn = w('c5e', 'window');
    q(gr, 'click', 0.6);
    q(zr, 'pop', 0.5);
    q(ov, 'stamp', 0.6);
    q(fs, 'whoosh', 0.5);
    q(wn, 'whoosh', 0.5);
    const ht = w('c5f', 'hurt');
    const db = w('c5f', 'doubled');
    const sl = w('c5f', 'slowed');
    const svb = w('c5f', 'silicon');
    const cd = w('c5g', 'down');
    const nine = w('c5g', 'nine');
    q(ht, 'thud', 0.6);
    q(db, 'boing', 0.5);
    q(sl, 'trombone', 0.4);
    q(svb, 'thud', 0.6);
    q(cd, 'ding', 0.6);
    q(nine, 'pop', 0.5);
    const off = w('c5h', 'off');
    const np = w('c5h', 'nope');
    const yr = w('c5h', 'year');
    const shp = w('c5h', 'ship');
    const bc = w('c5h', 'bicycle');
    q(off, 'click', 0.6);
    q(np, 'buzz', 0.7);
    q(yr, 'tick', 0.5);
    q(shp, 'pop', 0.5);
    q(bc, 'boing', 0.5);
    const hikes = [0.375, 0.875, 1.625, 2.375, 3.125, 3.875, 4.375, 4.625, 4.875, 5.125, 5.375];
    const nh = f < el ? Math.max(0, Math.floor(lin(f, gr, el, 0, 8))) : Math.min(11, 8 + Math.floor(lin(f, el, el + 20, 0, 4)));
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={260} s={0.75 * pop(f, A('c5a'))} top="YEAR" year={f >= tt ? 2022 : 2021} flip={0} />
            {f < br ? (
              <g>
                <LineChart x={960} y={560} t={ease(f, pw - 10, nn + 10)} pts={[1.4, 1.7, 2.6, 4.2, 5.4, 6.2, 7, 7.5, 8.5, 8.3, 8.6, 9.1]} w={900} h={460} color={C.red} lo={0} hi={10} axes />
                {f >= nn && <G2 x={1500} y={260} s={pop(f, nn)}><Text size={120} color={C.red} stroke={C.ink} sw={8}>9.1%</Text><Text y={90} size={36}>{f >= fy ? 'highest in ~40 years' : 'inflation, June 2022'}</Text></G2>}
              </g>
            ) : (
              <g>
                <Bread x={960} y={600} s={2 * pop(f, br)} />
                {f >= tm && <G2 x={960} y={250} s={pop(f, tm)}><Text size={50}>too much money, too few things</Text></G2>}
                {f >= up && <G2 x={1350} y={560} s={pop(f, up)}><Text size={80} color={C.red}>$$ ↑</Text></G2>}
              </g>
            )}
            <SourceTag f={f} at={nn} text="BLS CPI: +9.1% (12 months to June 2022)" until={br} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, gr)}><Text size={56}>{f >= el ? '11 hikes in 16 months' : 'the Fed grabs the dial'}</Text></G2>
            <line x1={300} y1={860} x2={1650} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {f >= zr && <G2 x={300} y={900}><Text size={34} anchor="start">Mar 2022: ~0%</Text></G2>}
            {hikes.map((h, i) => i < nh && <rect key={i} x={340 + i * 115} y={860 - h * 110} width={90} height={h * 110} rx={8} fill={C.red} stroke={C.ink} strokeWidth={5} />)}
            {f >= ov && <G2 x={1500} y={170} s={pop(f, ov)}><Text size={60} color={C.red}>5.25–5.5%</Text><Text y={60} size={32}>July 2023</Text></G2>}
            {f >= fs && <G2 x={700} y={260} s={pop(f, fs)}><Text size={44} color={C.blue}>{f >= wn ? 'open every window at once!' : 'one of the fastest in decades'}</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, ht)}><Text size={60} color={C.red}>{f >= cd ? '...but inflation came down' : 'it hurt'}</Text></G2>
            {f < cd ? (
              <g>
                {f >= db && <G2 x={400} y={450} s={pop(f, db)}><Text size={44}>mortgage rates</Text><Text y={80} size={70} color={C.red}>~3% → ~7%</Text></G2>}
                {f >= sl && <G2 x={400} y={680} s={pop(f, sl)}><House s={0.4} sold="SLOW" /></G2>}
                {f >= svb && <G2 x={1350} y={800}><Bank s={0.65 * pop(f, svb)} label="SVB" /><XMark y={-150} s={pop(f, svb + 6)} /></G2>}
                {f >= svb && <G2 x={1350} y={330} s={pop(f, svb)}><Text size={40}>bet on low rates (episode 1)</Text></G2>}
              </g>
            ) : (
              <g>
                <LineChart x={960} y={600} t={ease(f, cd, cd + 40)} pts={[9.1, 8.2, 6.5, 5, 4, 3.2, 3, 2.9, 2.7, 3, 2.9, 3.4]} w={1000} h={460} color={C.green} lo={0} hi={10} axes />
                <line x1={460} x2={1460} y1={600 - 460 * 0.2 + 230} y2={600 - 460 * 0.2 + 230} stroke={C.blue} strokeWidth={4} strokeDasharray="14 10" />
                {f >= nine && <G2 x={1500} y={260} s={pop(f, nine)}><Text size={44}>9.1% → ~3%</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < np ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <Stick f={f} x={960} y={880} s={1.2} acc={['tie']} seed={610} keys={[{at: 0, pose: 'point_r', expr: 'smug'}]} />
            <G2 x={1350} y={560} s={pop(f, A('c5h') + 4)}>
              <rect x={-110} y={-160} width={220} height={320} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-50} y={f >= off ? 0 : -110} width={100} height={110} rx={14} fill={f >= off ? '#5B6470' : C.red} stroke={C.ink} strokeWidth={5} />
              <Text y={-200} size={36}>INFLATION</Text>
            </G2>
          </Svg>
          <DreamFrame label="WHAT MOST PEOPLE THINK" />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={140} s={pop(f, np, 9, 260)} text="NOPE" size={80} color={C.red} r={-6} />
            {f >= yr && <G2 x={960} y={260} s={pop(f, yr)}><Text size={44}>rate changes: a year or more to fully work</Text></G2>}
            <Ship x={620} y={700} s={0.9 * pop(f, np + 6)} f={f} />
            {f >= bc && <Bicycle x={1450} y={760} s={1.2 * pop(f, bc)} />}
            {f >= bc && <XMark x={1450} y={760} s={0.9 * pop(f, bc + 8)} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Money printer ============
  {
    const pm = w('c6a', 'printing');
    const dk = w('c6b', 'duck');
    const ln = w('c6b', 'loan');
    const lf = w('c6b', 'life');
    const bp = w('c6c', 'pen');
    const qe = w('c6c', 'quantitative');
    const bb = w('c6d', 'buys');
    const gb = w('c6d', 'government');
    const mb = w('c6d', 'mortgage');
    const cp = w('c6d', 'computer');
    q(pm, 'sputter', 0.5);
    q(dk, 'quack', 0.8);
    q(ln, 'pop', 0.5);
    q(lf, 'quack', 0.6);
    q(bp, 'scribble', 0.5);
    q(qe, 'stamp', 0.6);
    q(bb, 'paper', 0.5);
    q(gb, 'pop', 0.5);
    q(mb, 'pop', 0.5);
    q(cp, 'key', 0.7);
    const mbst = w('c6e', 'myth');
    const tr = w('c6e', 'treasury');
    const dg = w('c6e', 'digital');
    const rs = w('c6e', 'reserves');
    q(mbst, 'stamp', 0.7);
    q(tr, 'pop', 0.5);
    q(dg, 'key2', 0.6);
    q(rs, 'ding', 0.5);
    const b8 = w('c6f', 'eight');
    const ap = w('c6f', 'april');
    const nt = w('c6f', 'trillion');
    const tb = w('c6f', 'ten');
    const rv = w('c6g', 'reverse');
    const dis = w('c6g', 'disappears');
    const sx = w('c6g', 'six');
    q(b8, 'pop', 0.5);
    q(nt, 'cash', 0.7);
    q(tb, 'boing', 0.5);
    q(rv, 'whoosh', 0.5);
    q(dis, 'poof', 0.5);
    q(sx, 'ding', 0.5);
    const yes = w('c6h', 'yes');
    const bd = w('c6h', 'big');
    const dp = w('c6h', 'disappear');
    q(yes, 'quack', 0.7);
    q(bd, 'boing', 0.6);
    q(dp, 'poof', 0.7);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < dk ? (
              <g>
                <Printer x={960} y={600} s={2.6 * pop(f, A('c6a'))} />
                {Array.from({length: 4}).map((_, i) => {
                  const k = ((f - A('c6a')) / 18 + i / 4) % 1;
                  return <rect key={i} x={900 + k * 400} y={460 - k * 300} width={120} height={56} rx={6} fill={C.greenLight} stroke={C.ink} strokeWidth={4} opacity={1 - k} />;
                })}
                <G2 x={960} y={160} s={pop(f, pm)}><Text size={64}>Is the Fed really printing money?</Text></G2>
              </g>
            ) : (
              <g>
                <Paper x={700} y={560} s={1} text="" reveal={1} id="ep16duck" w={520} h={420} />
                <Duck f={f} x={700} y={560} s={pop(f, dk)} />
                {f >= ln && <G2 x={1350} y={450} s={pop(f, ln)}><Text size={48}>bank loan = new money</Text><Text y={70} size={36} color="#5B6470">(episode 1)</Text></G2>}
                {f >= lf && <Sparkle x={860} y={380} t={(f % 30) / 30} s={0.9} />}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={480} y={820} s={0.8} label="THE FED" />
            <G2 x={960} y={130} s={pop(f, qe)}><Text size={60}>{f >= qe ? 'Quantitative Easing (QE)' : 'an even bigger pen'}</Text></G2>
            {f >= bb && <G2 x={1350} y={400} s={pop(f, bb)}><Text size={44}>the Fed buys bonds</Text></G2>}
            {f >= gb && <G2 x={1200} y={560} s={pop(f, gb)} r={-6}><Paper s={0.6} text="GOV BOND" reveal={1} id="ep16gb" /></G2>}
            {f >= mb && <G2 x={1500} y={560} s={pop(f, mb)} r={6}><Paper s={0.6} text="MORTGAGE BOND" reveal={1} id="ep16mb" /></G2>}
            {f >= cp && <G2 x={1350} y={850} s={pop(f, cp)}><Keyboard s={0.9} /><Text y={-110} size={40} color={C.green}>+ new money, typed in</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={140} s={pop(f, mbst, 9, 260)} text="MYTH BUST" size={64} color={C.red} r={-4} />
            <G2 x={520} y={560} s={pop(f, tr)}>
              <Printer s={2} />
              <Text y={220} size={40}>Treasury: paper cash</Text>
            </G2>
            {f >= dg && (
              <G2 x={1400} y={560} s={pop(f, dg)}>
                <Monitor s={1} value={f >= rs ? 'RESERVES' : '$$$'} title="THE FED" valueColor={C.green} />
                <Text y={260} size={40}>Fed: digital money for banks</Text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c6f') + 2)}><Text size={56}>What the Fed owns (its balance sheet)</Text></G2>
            <line x1={400} y1={880} x2={1600} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={600} y={880} h={ease(f, b8 - 4, b8 + 12, 2, 0.9 * 60)} color={C.blue} label="before 2008" value="$0.9T" w={260} />
            {f >= ap && <Bar x={1000} y={880} h={ease(f, nt - 4, nt + 16, 2, 8.97 * 60)} color={C.red} label="April 2022" value="$8.97T" w={260} />}
            {f >= tb && <G2 x={800} y={250} s={pop(f, tb)}><Text size={52} color={C.red}>×10</Text></G2>}
            {f >= rv && <G2 x={1400} y={250} s={pop(f, rv)}><Text size={44} color={C.blue}>now: QT (the reverse)</Text></G2>}
            {f >= sx && <Bar x={1400} y={880} h={ease(f, sx - 4, sx + 12, 2, 6.73 * 60)} color={C.green} label="Aug 2026" value="$6.7T" w={260} />}
            <SourceTag f={f} at={nt} text="Federal Reserve H.4.1 / CRS IF12147: peak $8.97T (Apr 13, 2022); $6.73T (Aug 26, 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < dp + 4 && <Duck f={f} x={960} y={620} s={(f < bd ? 1.2 : ease(f, bd, bd + 15, 1.2, 2.6)) * pop(f, A('c6h'))} />}
            {f >= dp && <Puff x={960} y={560} s={3} t={lin(f, dp, dp + 22)} />}
            <G2 x={960} y={140} s={pop(f, yes)}><Text size={60}>{f >= dp ? '...and make them disappear' : 'the Fed can make ducks'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Who controls ============
  {
    const pw = w('c7a', 'power');
    const ind = w('c7b', 'independent');
    const pk = w('c7b', 'picks');
    const sn = w('c7b', 'senate');
    const cut = w('c7b', 'cut');
    const my = w('c7c', 'may');
    const ww = w('c7c', 'warsh');
    const jp = w('c7c', 'powell');
    const lo = w('c7c', 'loud');
    q(pw, 'pop', 0.5);
    q(ind, 'stamp', 0.6);
    q(pk, 'pop', 0.5);
    q(sn, 'pop', 0.5);
    q(cut, 'buzz', 0.6);
    q(my, 'flip', 0.5);
    q(ww, 'pop', 0.6);
    q(jp, 'whoosh_s', 0.4);
    q(lo, 'crowd', 0.4);
    const s1 = w('c7d', 'one');
    const el = w('c7d', 'elections');
    const bl = w('c7d', 'bill');
    const tp = w('c7e', 'tapes');
    const nx = w('c7e', 'nixon');
    const fu = w('c7e', 'fuel');
    const s2 = w('c7f', 'two');
    const ne = w('c7f', 'elected');
    const vo = w('c7f', 'voters');
    const mi = w('c7f', 'mistakes');
    const pol = w('c7g', 'political');
    const kn = w('c7g', 'know');
    q(s1, 'ding', 0.5);
    q(el, 'pop', 0.5);
    q(bl, 'paper', 0.5);
    q(tp, 'click', 0.6);
    q(nx, 'pop', 0.5);
    q(fu, 'sting', 0.5);
    q(s2, 'ding', 0.5);
    q(ne, 'pop', 0.5);
    q(mi, 'thud', 0.5);
    q(pol, 'stamp', 0.6);
    const tilt = f < s2 ? ease(f, s1, s1 + 30, 0, -10) : ease(f, s2, s2 + 30, -10, 10);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dial x={960} y={330} s={1.2 * pop(f, A('c7a'))} v={0.6} label="WHO HOLDS THE DIAL?" />
            {f >= ind && f < my && <Stamp x={960} y={130} s={pop(f, ind, 9, 260)} text="INDEPENDENT" size={60} color={C.blue} r={-3} />}
            {f < my ? (
              <g>
                {[[pk, 'PRESIDENT', 'picks'], [sn, 'SENATE', 'approves'], [cut, 'RATE CUT', 'on order?']].map(([at, a, b], i) =>
                  f >= (at as number) && (
                    <G2 key={i} x={420 + i * 540} y={720} s={pop(f, at as number)}>
                      <Box w={420} h={180} fill={i === 2 ? '#FDE3E9' : '#fff'} />
                      <Text y={-24} size={44}>{a as string}</Text>
                      <Text y={40} size={34} color="#5B6470">{b as string}</Text>
                      {i === 2 && <XMark s={0.9} />}
                    </G2>
                  ),
                )}
              </g>
            ) : (
              <g>
                <Calendar x={260} y={700} s={0.7 * pop(f, my)} top="MAY" year={2026} flip={0} />
                {f >= ww && <Stick f={f} x={800} y={960} s={1 * pop(f, ww)} acc={['tie']} seed={701} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.4}]} />}
                {f >= ww && <G2 x={800} y={600} s={pop(f, ww)}><Text size={40}>new chair: Kevin Warsh</Text></G2>}
                {f >= jp && <Stick f={f} x={1450} y={960} s={1} acc={['glasses', 'tie']} seed={702} keys={[{at: 0, pose: 'wave', expr: 'neutral', look: -0.4}]} opacity={ease(f, jp, jp + 30, 1, 0.5)} />}
                {f >= jp && <G2 x={1450} y={600} s={pop(f, jp)}><Text size={40}>replacing Jerome Powell</Text></G2>}
                {f >= lo && <G2 x={1150} y={200} s={pop(f, lo)}><Text size={48} color={C.red}>the debate gets loud</Text></G2>}
              </g>
            )}
            <SourceTag f={f} at={ww} text="CNN / CBS News, May 22, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={960} s={pop(f, A('c7d'))} tilt={tilt} left="keep it independent" right="more accountability" />
            {f >= s1 && f < s2 && (
              <g>
                <G2 x={960} y={130} s={pop(f, s1)}><Text size={48} color={C.blue}>side 1: independence is essential</Text></G2>
                {f >= el && f < tp && <G2 x={960} y={220} s={pop(f, el)}><Text size={40}>{f >= bl ? 'cheap loans now · inflation bill later' : 'politicians love low rates before elections'}</Text></G2>}
                {f >= tp && <Tapes x={500} y={380} s={0.7 * pop(f, tp)} />}
                {f >= nx && <G2 x={1350} y={260} s={pop(f, nx)}><Text size={40}>early 1970s: Nixon pushed</Text><Text y={50} size={40}>his Fed chair for easy money</Text></G2>}
                {f >= fu && <G2 x={1350} y={380} s={pop(f, fu)}><Text size={38} color={C.red}>→ many blame it for 1970s inflation</Text></G2>}
                <SourceTag f={f} at={nx} text="Abrams, Journal of Economic Perspectives (2006): Nixon tapes" />
              </g>
            )}
            {f >= s2 && (
              <g>
                <G2 x={960} y={130} s={pop(f, s2)}><Text size={48} color={C.red}>side 2: huge power, not elected</Text></G2>
                {f >= vo && <G2 x={960} y={220} s={pop(f, vo)}><Text size={40}>should answer more to voters & Congress</Text></G2>}
                {f >= mi && <G2 x={960} y={300} s={pop(f, mi)}><Text size={40}>2021: called inflation "transitory"</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={180} s={pop(f, A('c7g'))}><Text size={48}>both sides: stable prices + good jobs</Text></G2>
            {f >= pol && <Stamp x={960} y={400} s={pop(f, pol, 9, 260)} text="A POLITICAL QUESTION" size={70} color={C.blue} />}
            {f >= kn && <G2 x={960} y={580} s={pop(f, kn)}><Text size={52}>now you know how the dial works</Text></G2>}
            <Dave f={f} x={960} y={1000} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: kn, pose: 'thumbs', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 What Dave can do ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Know your variable-rate debts', 'Make savings work: compare rates', 'Fixed vs variable on big loans', "Don't try to outsmart the Fed", 'Glance at the 8 meetings a year'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={100}><Text size={58}>What Dave can do</Text></G2>
          <G2 x={1620} y={100}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={120} y={230 + i * 140} s={0.85 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1100} />)}
          {cur === 0 && <Dave f={f} x={960} y={900} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={960} y={480} s={pop(f, A('c8a') + 6)}><Bubble text="I can't control the Fed..." size={48} tail="down" /></G2>}
          {cur === 1 && <G2 x={1650} y={560}><CreditCard s={0.8} /><Text y={150} size={36} color={C.red}>pay these first</Text></G2>}
          {cur === 2 && <G2 x={1650} y={600}><Grandma f={f} x={0} y={260} s={0.8} keys={[{at: 0, pose: 'celebrate', expr: 'happy'}]} /><MoneyStack y={-240} n={4} s={0.6} label="SAVINGS" /></G2>}
          {cur === 3 && <G2 x={1650} y={640}><House s={0.45} /><Text y={-260} size={40} color={C.blue}>FIXED = no surprise</Text></G2>}
          {cur === 4 && <G2 x={1650} y={560}><Dial s={0.9} v={0.5 + 0.4 * Math.sin(f / 8)} label="???" /></G2>}
          {cur === 5 && <G2 x={1650} y={560}><Calendar s={0.8} top="FED MEETS" year="8× a year" flip={0} /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 Recap ============
  const recap = ['The Fed: central bank, born 1913', 'One master rate → cards, mortgages, savings', 'It can create money · who controls it: debated'];
  {
    const r = [bs('c9b'), bs('c9c'), bs('c9d')];
    q(A('c9a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c9a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={280} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1360} />)}
          {f >= r[0] && <Duck f={f} x={1700} y={940} s={0.5} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('c9e', 'casino');
    const jk = w('c9e', 'jackpot');
    const wn = w('c9e', 'win');
    const sb = w('c9f', 'subscribe');
    const dh = w('c9f', 'duck');
    q(cs, 'chime', 0.5);
    q(jk, 'cash', 0.6);
    q(wn, 'ding', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(dh, 'quack', 0.6);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={pop(f, A('c9e'))}><Text size={60}>Next: how casinos always win</Text></G2>
            <SlotMachine x={1250} y={680} s={1.1 * pop(f, cs)} f={f} spin={f >= jk && f < wn ? 1 : 0} symbols={['?', '?', '?']} />
            <Dave f={f} x={500} y={900} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: jk, pose: 'celebrate', expr: 'money', look: 0.8}, {at: wn, pose: 'shrug', expr: 'suspicious', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            {f >= dh && <Duck f={f} x={1500} y={860} s={0.8 * pop(f, dh)} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4f', 'month', 1) + 20;
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
