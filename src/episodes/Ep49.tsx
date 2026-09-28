import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, Calendar, Card, Clock, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Row, SubButton, Bell, CreditCard} from '../props2';
import {Raccoon, SourceCard} from '../props3';
import {Receipt, MemberCard, Notepad, Scale as PScale} from '../props8';
import {CheckForm, People, Alarm} from '../props35';
import {Toggle, TrialScreen, CancelMaze, Gavel, VirtualCards} from '../props49';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

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

export const Ep49: React.FC = () => {
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
    const fr = w('o1', 'free');
    const sv = w('o1', 'seven');
    const sg = w('o1', 'sign');
    q(fr, 'ding', 0.6);
    q(sv, 'pop', 0.5);
    q(sg, 'click', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={520} y={920} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.5}, {at: sg, pose: 'point_r', expr: 'grin', look: 0.5}]} />
          <TrialScreen x={1180} y={620} s={1 * P(0) * bump(fr, 0.1)} stage={f >= sg ? 1 : 0} />
          <Box x={1180} y={200} w={520} h={130} s={P(0)}>
            <Text size={40}>{f >= sv ? 'seven days, free' : "dave's plan: watch one show"}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fteen = w('o2', 'fourteen');
    const agains = [w('o2', 'again', 0), w('o2', 'again', 1), w('o2', 'again', 2)];
    q(fteen, 'cash', 0.7);
    agains.forEach((x) => q(x, 'coin', 0.6));
    const shown = 2 + agains.filter((x) => f >= x).length;
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={430} y={930} s={1.1} keys={[{at: 0, pose: 'relax', expr: 'neutral', look: 0.6}, {at: fteen, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <G2 x={430} y={560} s={P(A('o2'))}><CreditCard /></G2>
          <Receipt x={1350} y={560} s={1.05 * P(A('o2')) * bump(fteen, 0.1)} lines={[['month 1', '$14.99'], ['month 2', '$14.99'], ['month 3', '$14.99'], ['month 4', '$14.99'], ['month 5', '$14.99']]} total="" shown={shown} />
          <G2 x={960} y={140} s={P(A('o2'))}><Text size={48} color={f >= fteen ? C.red : C.ink}>{f >= fteen ? '$14.99... again' : "dave's bank app"}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sev = w('o3', 'seventy');
    const fr2 = w('o3', 'free');
    q(sev, 'stamp', 0.8);
    const sk = shake(f, sev, 14, 14);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={430} y={930} s={1.2} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.7}]} />
          <G2 x={1180 + sk.x} y={560 + sk.y} s={P(A('o3')) * bump(sev, 0.22)}>
            <rect x={-320} y={-140} width={640} height={280} rx={26} fill={f >= sev ? C.red : '#fff'} stroke={C.ink} strokeWidth={7} />
            <Text y={-40} size={32} color={f >= sev ? '#fff' : GRAY}>TOTAL DAMAGE</Text>
            <Text y={60} size={82} color={f >= sev ? '#fff' : GRAY}>{f >= sev ? '$74.95' : '$??.??'}</Text>
          </G2>
          <G2 x={1180} y={840} o={lt(fr2, 0.4)}><Text size={40} color={C.red}>for a trial that was "free"</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('o4', 'twist');
    const sc = w('o4', 'scammed');
    const wk = w('o4', 'work');
    q(tw, 'boing', 0.4);
    q(sc, 'buzz', 0.5);
    q(wk, 'stamp', 0.7);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={200} s={P(A('o4')) * bump(wk, 0.12)} text={f >= wk ? 'DESIGNED THIS WAY' : "DAVE GOT SCAMMED?"} size={58} color={f >= wk ? C.red : GRAY} r={-3} />
          <Banker f={f} x={1350} y={900} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.7}]} />
          <Dave f={f} x={620} y={900} s={1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.7}]} />
          <G2 x={960} y={620} o={lt(sc, 0.4)}><XMark s={0.7} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mi = w('o5', 'millions');
    const nt = w('o5', 'noticing');
    q(mi, 'pop', 0.6);
    q(nt, 'buzz', 0.4);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('o5')) * bump(mi, 0.1)}><Text size={52}>millions are paying this exact bill</Text></G2>
          <People x={960} y={640} s={1.1 * P(A('o5'))} n={90} hot={30} lit={f >= nt ? 1 : 0} />
          <G2 x={960} y={980} o={lt(nt, 0.4)}><Text size={38} color={C.red}>right now, without noticing</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'card'), w('o6', 'profits'), w('o6', 'trapped')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['WHY FREE NEEDS YOUR CARD', 'WHO PROFITS', "DON'T GET TRAPPED"].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <CreditCard s={0.8} y={-10} />}
                {i === 1 && <Raccoon f={f} s={0.7} y={60} mood="greedy" holdCoin />}
                {i === 2 && <VirtualCards s={0.7} y={0} n={3} />}
                <Text y={210} size={30}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: the card that isn't free ============
  {
    const dt = w('c1a', 'detail');
    const fr = w('c1a', 'free');
    const cd = w('c1a', 'card');
    q(dt, 'pop', 0.5);
    q(fr, 'ding', 0.4);
    q(cd, 'click', 0.6);
    const bl = w('c1c', 'blank');
    const ck = w('c1c', 'check');
    q(bl, 'paper', 0.5);
    q(ck, 'stamp', 0.5);
    const dy = w('c1e', 'day');
    const ch = w('c1e', 'cashed');
    const au = w('c1e', 'automatically');
    q(dy, 'tick', 0.5);
    q(ch, 'cash', 0.8);
    q(au, 'buzz', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={110} s={P(A('c1a'))}><Text size={46}>{f >= cd ? 'to get "free", dave hands over his card' : 'the detail everyone skips'}</Text></G2>
            <Dave f={f} x={620} y={920} s={1.15} keys={[{at: 0, pose: 'present', expr: 'neutral', look: 0.6}, {at: cd, pose: 'carry', expr: 'worried', look: 0.6}]} />
            <G2 x={1000} y={560} s={P(A('c1a')) * bump(cd, 0.15)}><CreditCard /></G2>
            <Box x={1500} y={860} w={520} h={220} s={P(A('c1a')) * bump(bl, 0.1)} o={lt(bl, 0.4)} fill={f >= ck ? '#FFE3EA' : '#fff'}>
              <Text y={-40} size={30} color={GRAY}>free sample, sure...</Text>
              <Text y={30} size={36} color={f >= ck ? C.red : C.ink}>{f >= ck ? 'but sign this blank check' : 'but first...'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1d'))}><Text size={48}>the card isn't for the trial...</Text></G2>
            <G2 x={960} y={560} s={P(A('c1d'))}><Arrow d="M -420 0 L 380 0" t={1} color={C.ink} w={10} /></G2>
            <CreditCard x={540} y={560} s={0.9 * P(A('c1d'))} />
            <TrialScreen x={1400} y={640} s={0.85 * P(A('c1d')) * bump(dy, 0.1)} stage={2} day={f >= dy ? 8 : 1} />
            <G2 x={960} y={950} o={lt(ch, 0.4)}><Text size={40} color={f >= ch ? C.red : GRAY}>{f >= au ? 'automatically. no new click.' : f >= ch ? 'cashed.' : "it's for what happens after"}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2: breakage ============
  {
    const nm = w('c2a', 'name');
    const brk = w('c2a', 'breakage');
    q(nm, 'pop', 0.4);
    q(brk, 'stamp', 0.7);
    const bl15 = w('c2c', 'fifteen');
    const bn = w('c2c', 'billion');
    q(bl15, 'paper', 0.5);
    q(bn, 'cash', 0.8);
    const hf = w('c2d', 'half');
    q(hf, 'ding', 0.5);
    const dsg = w('c2f', 'designed');
    q(dsg, 'stamp', 0.7);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={P(A('c2a')) * bump(nm, 0.1)}><Text size={54}>{f >= brk ? 'economists call it: BREAKAGE' : "there's a name for this"}</Text></G2>
            <Stamp x={960} y={560} s={1.1 * P(A('c2a')) * bump(brk, 0.14)} text={f >= brk ? 'BREAKAGE' : '?'} size={70} color={C.red} />
            <Box x={960} y={900} w={1100} h={190} s={P(A('c2a'))} o={lt(brk, 0.4)}>
              <Text y={-30} size={32} color={GRAY}>money you paid for...</Text>
              <Text y={30} size={38}>but never actually used</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={620} y={540} s={0.98 * P(A('c2c')) * bump(bn, 0.06)} org="RESEARCH ESTIMATE" sub="FORGOTTEN APP SUBSCRIPTIONS" title={['Americans lose about']} stat={f >= bn ? '$15.5B' : '$?B'} statLabel="every single year" />
            <People x={1500} y={560} s={0.85 * P(A('c2c'))} n={60} hot={30} lit={f >= hf ? 1 : 0} />
            <G2 x={1500} y={900} o={lt(hf, 0.4)}><Text size={34} color={C.red}>~half say: charged after forgetting a trial</Text></G2>
            <SourceTag f={f} at={bl15} text="Industry survey estimate (2026), forgotten app subscriptions" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c2f')) * bump(dsg)}><Text size={50}>a forgotten trial isn't a mistake</Text></G2>
            <Banker f={f} x={1350} y={900} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.7}]} handItem={f >= dsg ? <Card top="" big="$" color={C.gold} w={220} /> : undefined} />
            <Stamp x={700} y={700} s={P(A('c2f')) * bump(dsg, 0.15)} text="THE PLAN" size={64} color={C.red} r={-4} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: default switch ============
  {
    const rn = w('c3b', 'renew');
    const on = w('c3b', 'on');
    q(rn, 'ding', 0.5);
    q(on, 'stamp', 0.7);
    const df = w('c3c', 'default');
    q(df, 'boing', 0.5);
    const ch2 = w('c3d', 'checked');
    q(ch2, 'pop', 0.5);
    const nt = w('c3e', 'nothing', 0);
    q(nt, 'buzz', 0.4);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c3a'))}><Text size={48}>one tiny setting, buried in the signup</Text></G2>
            <Toggle x={960} y={560} s={1.3 * P(A('c3a')) * bump(rn, 0.12)} on={f >= on ? 1 : 0} label="AUTO RENEW" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={500} s={P(A('c3c')) * bump(df, 0.14)} text="THE DEFAULT EFFECT" size={54} color={C.navy} r={2} />
            <Box x={960} y={860} w={1200} h={190} s={P(A('c3c'))} o={lt(df, 0.4)}>
              <Text y={-30} size={32} color={GRAY}>most people never touch</Text>
              <Text y={30} size={38}>a setting already chosen for them</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={130} s={P(A('c3d'))}><Text size={42}>organ donation forms found the same pattern</Text></G2>
            <CheckForm x={620} y={620} s={0.95 * P(A('c3d')) * bump(ch2, 0.1)} title="DONOR FORM" lines={['[x] Yes, sign me up', '[ ] No thanks']} checked={f >= ch2 ? 1 : 0} />
            <Dave f={f} x={1480} y={900} s={1.15} keys={[{at: 0, pose: 'relax', expr: 'tired', look: -0.7}]} />
            <G2 x={1480} y={560} o={lt(nt, 0.4)}><Bubble text={f >= nt ? "do nothing...\n= stay subscribed" : 'zzz'} size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4: price after honeymoon ============
  {
    const tk = w('c4a', 'trick');
    const nb = w('c4a', 'number');
    q(tk, 'pop', 0.5);
    q(nb, 'ding', 0.5);
    const ft = w('c4b', 'fourteen');
    const fv = w('c4b', 'forever');
    q(ft, 'cash', 0.6);
    q(fv, 'sting', 0.5);
    const pk = w('c4d', 'parking');
    const pd = w('c4d', 'parked');
    q(pk, 'pop', 0.5);
    q(pd, 'thud', 0.6);
    const dr = w('c4e', 'door');
    const bl = w('c4e', 'bills');
    q(dr, 'ding', 0.5);
    q(bl, 'cash', 0.7);
    const big = ease(f, ft, ft + 20, 0, 1);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c4a')) * bump(tk)}><Text size={48}>the trial price ≠ the real price</Text></G2>
            <Bar x={640} y={780} s={1.1 * P(A('c4a'))} h={40} color={C.greenLight} label="TRIAL" value="$0" />
            <Bar x={1240} y={780} s={1.1 * P(A('c4a')) * bump(ft, 0.1)} h={40 + big * 300} color={C.red} label="AFTER" value={f >= ft ? '$14.99/mo' : '?'} />
            <G2 x={1240} y={340} o={lt(fv, 0.4)}><Text size={38} color={C.red}>{f >= fv ? 'forever, unless you stop it' : ''}</Text></G2>
            <SourceTag f={f} at={nb} text="illustrative: $14.99/mo x 5 months = $74.95" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c4d')) * bump(pk)}><Text size={46}>like a "free" parking lot</Text></G2>
            <G2 x={640} y={640} s={P(A('c4d'))}>
              <rect x={-260} y={-160} width={520} height={320} rx={20} fill="#D9C9AC" stroke={C.ink} strokeWidth={6} />
              <Text y={-190} size={34}>PARKING</Text>
              <Text y={0} size={44} color={C.green}>FREE today</Text>
            </G2>
            <Dave f={f} x={640} y={900} s={0.9} keys={[{at: 0, pose: 'idle', expr: 'happy'}, {at: pd, pose: 'shock', expr: 'shock'}]} />
            <Box x={1400} y={640} w={560} h={260} s={P(A('c4d')) * bump(pd, 0.12)} o={lt(pd, 0.4)} fill={f >= pd ? C.red : '#fff'}>
              <Text y={-40} size={32} color={f >= pd ? '#fff' : GRAY}>day two...</Text>
              <Text y={30} size={46} color={f >= pd ? '#fff' : C.ink}>now charging</Text>
            </Box>
            <G2 x={960} y={980} o={lt(dr, 0.4)}><Text size={36} color={C.green}>{f >= bl ? 'the second price pays the bills' : 'first price = the door'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5: maze to the exit ============
  {
    const hd = w('c5a', 'hard');
    q(hd, 'boing', 0.4);
    const dk = w('c5b', 'dark');
    q(dk, 'stamp', 0.7);
    const sx = w('c5c', 'siriusxm');
    const cl = w('c5c', 'call');
    q(sx, 'paper', 0.5);
    q(cl, 'buzz', 0.6);
    const mg = w('c5d', 'manager');
    q(mg, 'pop', 0.5);
    const steps = [bs('c5e'), w('c5e', 'menus'), w('c5e', 'offer'), w('c5e', 'stay')];
    steps.forEach((x) => q(x, 'ding', 0.4));
    const lit = steps.filter((x) => f >= x - 4).length;
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c5a')) * bump(hd)}><Text size={50}>okay, dave wants out. how hard can it be?</Text></G2>
            <Stamp x={960} y={560} s={1.1 * P(A('c5a')) * bump(dk, 0.12)} text={f >= dk ? 'DARK PATTERNS' : '?'} color={C.red} size={58} r={-3} />
            <Dave f={f} x={620} y={950} s={1.05} keys={[{at: 0, pose: 'point_r', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={620} y={540} s={0.95 * P(A('c5c')) * bump(sx, 0.06)} org="NY ATTORNEY GENERAL" sub="LAWSUIT v. SIRIUSXM (2024)" title={['Sign up online:', 'a few clicks']} stat={f >= cl ? 'Cancel: CALL' : '?'} statLabel="talk a real person out of it" color={C.red} />
            <Gavel x={1500} y={620} s={1.1 * P(A('c5c'))} bang={f >= cl ? 1 : 0} />
            <G2 x={1500} y={950} o={lt(mg, 0.4)}><Text size={32} color={GRAY}>hotel checkout: 30s kiosk...</Text><Text y={50} size={32} color={C.red}>{f >= mg ? 'to leave: find the manager' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={100} s={P(A('c5e'))}><Text size={46}>every extra click = one more chance to give up</Text></G2>
            <CancelMaze x={620} y={640} s={0.95 * P(A('c5e'))} steps={['HOLD MUSIC', 'CONFUSING MENU', 'ONE MORE OFFER', 'STILL SUBSCRIBED']} lit={lit} />
            <Dave f={f} x={1480} y={900} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'tired'}]} sweat={lit >= 2} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6: click to cancel history ============
  {
    const cc = w('c6a', 'cancel', 0);
    q(cc, 'stamp', 0.7);
    const eff = w('c6b', 'effort');
    q(eff, 'ding', 0.5);
    const sd = w('c6c', 'sued');
    const th = w('c6c', 'threw');
    q(sd, 'buzz', 0.5);
    q(th, 'thud', 0.8);
    const hrd = w('c6d', 'hard');
    const cst = w('c6d', 'cost');
    q(hrd, 'pop', 0.4);
    q(cst, 'paper', 0.5);
    const rp = w('c6e', 'reopened');
    q(rp, 'ding', 0.5);
    const rf = w('c6f', 'force');
    const tp = w('c6f', 'tape');
    q(rf, 'buzz', 0.5);
    q(tp, 'boing', 0.5);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c6a')) * bump(cc)}><Text size={44}>2024: the FTC writes a rule. "Click to cancel."</Text></G2>
            <PScale x={960} y={720} s={1 * P(A('c6a')) * bump(eff, 0.06)} tilt={f >= eff ? 0 : -14} left="SIGN UP: 1 CLICK" right={f >= eff ? 'CANCEL: 1 CLICK' : 'CANCEL: ???'} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Gavel x={960} y={480} s={1.4 * P(A('c6c')) * bump(th, 0.2)} bang={f >= th ? 1 : 0} />
            <Stamp x={960} y={780} s={P(A('c6c')) * bump(th, 0.14)} text={f >= th ? 'RULE VACATED' : 'lawsuit filed...'} color={C.red} size={60} r={-3} />
            <Box x={960} y={980} w={1300} h={170} s={P(A('c6d'))} o={lt(hrd, 0.4)}>
              <Text y={-25} size={30} color={GRAY}>not because cancelling should be hard —</Text>
              <Text y={25} size={32} color={f >= cst ? C.red : C.ink}>{f >= cst ? 'FTC skipped a required cost analysis' : 'a paperwork step was skipped'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={200} s={P(A('c6e')) * bump(rp, 0.1)}><Text size={44}>{f >= rp ? '2026: FTC reopens the process' : 'so what now?'}</Text></G2>
            <PScale x={960} y={720} s={1.05 * P(A('c6e'))} tilt={0} left="SUPPORTERS: protects shoppers" right={f >= tp ? 'CRITICS: red tape' : '...'} />
            <G2 x={960} y={990} o={lt(rf, 0.4)}><Text size={34} color={C.red}>{f >= rf ? 'right now: no federal rule in force' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: states step in ============
  {
    const st = w('c7a', 'states');
    q(st, 'pop', 0.5);
    const ol = w('c7b', 'online', 1);
    q(ol, 'ding', 0.5);
    const wn = w('c7c', 'warn');
    const fteen = w('c7c', 'fifteen');
    q(wn, 'buzz', 0.4);
    q(fteen, 'paper', 0.5);
    const il = w('c7d', 'illinois');
    q(il, 'pop2', 0.5);
    const fifty = w('c7e', 'fifty');
    q(fifty, 'stamp', 0.6);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c7a')) * bump(st)}><Text size={48}>while D.C. was stuck, states wrote their own</Text></G2>
            <Box x={960} y={620} w={1200} h={300} s={P(A('c7a')) * bump(ol, 0.08)} fill={f >= ol ? '#DCE9FF' : '#fff'}>
              <Text y={-70} size={34} color={C.navy}>CALIFORNIA (Auto-Renewal Law)</Text>
              <Text y={-5} size={34}>sign up online →</Text>
              <Text y={55} size={38} color={f >= ol ? C.green : GRAY}>{f >= ol ? 'must cancel online too, start to finish' : '?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={620} y={580} s={1.1 * P(A('c7c')) * bump(fteen, 0.1)} year={f >= fteen ? '15-45 DAYS' : '?'} flip={f >= wn ? 1 : 0} top="NOTICE" />
            <G2 x={620} y={960} o={lt(wn, 0.4)}><Text size={34} color={GRAY}>warning before renewal (plans 1yr+)</Text></G2>
            <Box x={1450} y={620} w={560} h={280} s={P(A('c7d')) * bump(il, 0.08)} o={lt(il, 0.4)}>
              <Text y={-60} size={32} color={GRAY}>other states, own rules:</Text>
              <Text y={0} size={38}>New York</Text>
              <Text y={60} size={38} color={f >= il ? C.navy : GRAY}>{f >= il ? 'Illinois...' : ''}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c7e')) * bump(fifty)}><Text size={50} color={C.red}>{f >= fifty ? '50 different rulebooks' : 'not one national rulebook...'}</Text></G2>
            {Array.from({length: 8}).map((_, i) => (
              <G2 key={i} x={360 + (i % 4) * 400} y={520 + Math.floor(i / 4) * 340} s={0.55 * P(A('c7e')) * bump(fifty + i * 2, 0.1)}><Notepad /></G2>
            ))}
            <G2 x={960} y={1010} o={lt(fifty, 0.4)}><Text size={32} color={GRAY}>slowly getting stricter, one lawsuit at a time</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8: amazon ============
  {
    const bt = w('c8a', 'button');
    q(bt, 'pop', 0.5);
    const il2 = w('c8b', 'iliad');
    const pm = w('c8b', 'poem');
    q(il2, 'stamp', 0.7);
    q(pm, 'paper', 0.4);
    const bn1 = w('c8c', 'billion', 0);
    const bn2 = w('c8c', 'billion', 1);
    q(bn1, 'cash', 0.7);
    q(bn2, 'cash', 0.8);
    const rz = w('c8d', 'raised');
    const th2 = w('c8d', 'hundred', 0);
    q(rz, 'ding', 0.5);
    q(th2, 'stamp', 0.6);
    const ex = w('c8e', 'expensive');
    const eight = w('c8e', 'eight');
    q(ex, 'buzz', 0.5);
    q(eight, 'cash', 0.8);
    scene(A('c8a'), () =>
      f < A('c8c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={120} s={P(A('c8a')) * bump(bt)}><Text size={44}>the button that says "end membership"</Text></G2>
            <MemberCard x={640} y={600} s={1.1 * P(A('c8a'))} tier="PRIME" price="$139/yr" color={C.navy} />
            <Stamp x={1450} y={620} s={1.1 * P(A('c8a')) * bump(il2, 0.14)} text={f >= il2 ? 'ILIAD FLOW' : '?'} color={C.red} size={56} r={4} />
            <G2 x={1450} y={900} o={lt(pm, 0.4)}><Text size={30} color={GRAY}>like the ancient poem — leaving took that long</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={640} y={540} s={0.95 * P(A('c8c')) * bump(bn1, 0.06)} org="FTC v. AMAZON" sub="SETTLEMENT · SEPT 2025" title={['penalty + consumer redress']} stat={f >= bn2 ? '$1B + $1.5B' : f >= bn1 ? '$1B +' : '?'} statLabel="without admitting wrongdoing" color={C.navy} />
            <Bar x={1520} y={760} s={1 * P(A('c8d')) * bump(rz, 0.1)} h={40 + (f >= rz ? 260 : 40)} color={C.green} label="REFUND CAP" value={f >= th2 ? '$200' : '$51'} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c8e')) * bump(eight)}><Text size={40}>by Sept 2026, Amazon had refunded</Text></G2>
            <Stamp x={960} y={600} s={1.3 * P(A('c8e')) * bump(eight, 0.16)} text={f >= eight ? '$845M+' : '?'} color={C.green} size={90} />
            <G2 x={960} y={950} o={lt(ex, 0.4)}><Text size={36} color={C.red}>that's how expensive a confusing cancel button gets</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9: practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const vc = w('c9b', 'virtual');
    const cal = w('c9c', 'calendar');
    const im = w('c9d', 'immediately');
    const st2 = w('c9e', 'statement');
    q(vc, 'click', 0.5);
    q(cal, 'ding', 0.5);
    q(im, 'stamp', 0.6);
    q(st2, 'paper', 0.5);
    const items = ['Use a virtual card number for trials', 'Set a calendar reminder, the day before it ends', "Cancel immediately — you still keep access", 'Once a year, scan your statement for surprises'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={50}>Trial anything, without getting trapped</Text></G2>
          <G2 x={650} y={160}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={270 + i * 170} s={0.9 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dave f={f} x={1600} y={900} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 1 && <VirtualCards x={1600} y={560} s={0.9 * bump(vc, 0.1)} n={3} locked={f >= vc ? 1 : -1} />}
          {cur === 2 && <Alarm x={1600} y={560} s={1.1 * bump(cal, 0.15)} f={f} on={f >= cal ? 1 : 0} />}
          {cur === 3 && <G2 x={1600} y={560} s={bump(im, 0.1)}><Toggle on={f >= im ? 0 : 1} label="AUTO RENEW" /><Text y={220} size={34} color={C.green}>off — access stays till trial ends</Text></G2>}
          {cur >= 4 && <Receipt x={1600} y={560} s={0.95 * bump(st2, 0.1)} lines={[['coffee shop', '$4.50'], ['??? app', f >= st2 ? '$14.99' : '?'], ['groceries', '$62.10']]} total="" shown={3} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Free needs your card: the real business starts after', 'Auto-renew defaults ON; cancelling can be a maze', 'Virtual card + calendar + cancel right away = safe'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={220} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1480} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wd1 = w('r5', 'wedding', 0);
    const ck = w('r5', 'cake');
    const tw = w('r5', 'twice');
    const sb = w('r6', 'subscribe');
    const fr3 = w('r6', 'free');
    q(wd1, 'paper', 0.5);
    q(ck, 'ding', 0.5);
    q(tw, 'sting', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr3, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={52}>Next: the exact same cake costs 2x, one word later</Text></G2>
            <Card x={1220} y={620} s={1.2 * P(A('r5')) * bump(ck, 0.1)} top="cake" big={f >= tw ? '$1,200' : '$600'} color={f >= tw ? C.red : C.greenLight} />
            <Dave f={f} x={550} y={900} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.7}, {at: wd1, pose: 'talk', expr: 'happy', look: 0.7}]} />
            <G2 x={1220} y={940} o={lt(tw, 0.4)}><Text size={36} color={C.red}>{f >= tw ? 'say "wedding" → price jumps' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={1500} y={800} s={pop(f, sb)}><Text size={40} color={C.green}>{f >= fr3 ? 'still free. cancel any time.' : 'no card required'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2c', 'alone') + 20;
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
