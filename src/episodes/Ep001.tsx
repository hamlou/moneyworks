import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT, TAIL_SEC} from '../timing';
import {ease, lin, out, pop, shake} from '../anim';
import {Stick, Key} from '../Stick';
import {Board, Cam, Captions, Cue, DreamBg, DreamFrame, Interior, Scene, Sfx, Street, Svg, Vignette} from '../fx';
import {
  Arrow, Bank, Bill, Bubble, Calendar, Car, Card, Clock, Coin, Desk, DocCard, Duck, G, Keyboard, Monitor, MoneyStack, Moth, Paper, Pencil, Puff, Sack, Sparkle, Stamp, Text, Thought, Vault, XMark,
} from '../props';

const DAVE = ['hair'] as const;
const BANKER = ['tophat', 'monocle', 'tie'] as const;

const fmt = (n: number) => '$' + n.toLocaleString('en-US');

export const Ep001: React.FC = () => {
  const f = useCurrentFrame();
  const {bs, w, we, end, t} = useT();
  const cut = (id: string) => Math.max(0, bs(id) - 6);
  const END = end + Math.round(TAIL_SEC * 30);
  const cues: Cue[] = [];
  const q = (at: number, src: string, v = 0.7) => cues.push({at, src, v});

  // ---------- S1: Meet Dave ----------
  const s1 = {from: 0, to: cut('b3')};
  const car = w('b2', 'car');
  const but = w('b2', 'but');
  const zero = w('b2', 'zero');
  const daveName = w('b1', 'dave');
  q(3, 'pop', 0.6);
  q(daveName, 'pop2', 0.5);
  q(car - 4, 'pop', 0.55);
  q(but, 'whoosh_s', 0.35);
  q(zero, 'thud', 0.8);
  q(zero + 4, 'flutter', 0.45);
  const shk1 = shake(f, zero, 10);

  // ---------- S2: to the bank ----------
  const asks = w('b3', 'asks');
  const s2a = {from: cut('b3'), to: asks - 4};
  const s2b = {from: asks - 4, to: cut('b4')};
  q(s2a.from, 'whoosh', 0.45);
  for (let k = s2a.from + 6; k < s2a.to - 4; k += 10) q(k, 'step', 0.28);
  q(s2b.from, 'whoosh_s', 0.35);
  q(w('b3', 'can') - 2, 'pop', 0.6);

  // ---------- S3: what people think / Nope ----------
  const s3 = {from: cut('b4'), to: cut('b6')};
  const safe = w('b4', 'safe');
  const gives = w('b4', 'gives');
  const nope = w('b5', 'nope');
  q(s3.from, 'dream', 0.5);
  q(safe - 2, 'clank', 0.75);
  q(w('b4', 'other'), 'pop2', 0.45);
  q(w('b4', 'peoples'), 'pop2', 0.45);
  q(w('b4', 'money'), 'pop2', 0.45);
  [0, 1, 2, 3].forEach((i) => q(gives + i * 5 + 18, 'coin', 0.45));
  q(nope, 'buzz', 0.7);
  q(nope, 'thud', 0.7);
  const shk3 = shake(f, nope, 16);
  const gray = ease(f, nope, nope + 10) * 0.75;

  // ---------- S4: the bank types ----------
  const s4 = {from: cut('b6'), to: cut('b8')};
  const types = w('b6', 'types');
  const click = w('b6', 'click');
  const done = w('b6', 'done');
  const b7 = bs('b7');
  const five7 = w('b7', 'five');
  const ago = we('b7', 'ago');
  q(s4.from, 'whoosh', 0.45);
  for (let k = types; k < click - 2; k += 4) q(k, k % 8 ? 'key' : 'key2', 0.4);
  q(click, 'click', 0.9);
  q(done, 'cash', 0.7);
  q(b7 - 4, 'whoosh_s', 0.35);
  q(five7, 'pop', 0.55);
  q(ago + 8, 'whoosh_s', 0.3);
  const digits = Math.floor(lin(f, types + 4, click - 2, 0, 5.99));
  const balance = digits === 0 ? '$0' : fmt(Number('10000'.slice(0, digits)));
  const typed = f >= click;
  const flash = typed ? out(f, click, 10) : 0;

  // ---------- S5: duck analogy + second paper + cards ----------
  const s5 = {from: cut('b8'), to: cut('b11')};
  const writing = w('b8', 'writing');
  const paperW = we('b8', 'paper');
  const poof = w('b8', 'poof');
  const appears = w('b8', 'appears');
  const b9 = bs('b9');
  const second = w('b9', 'second');
  const owes = w('b9', 'dave');
  const owesEnd = we('b9', 'dollars');
  const b10 = bs('b10');
  const mMoney = w('b10', 'money');
  const mDebt = w('b10', 'debt');
  const same = w('b10', 'same');
  q(s5.from, 'whoosh', 0.45);
  q(s5.from + 4, 'pop', 0.5);
  q(writing, 'scribble', 0.6);
  q(poof - 8, 'draw', 0.3);
  q(poof, 'poof', 0.7);
  q(poof + 7, 'quack', 0.75);
  q(appears, 'boing', 0.4);
  q(b9 - 6, 'whoosh_s', 0.4);
  q(second - 4, 'pop', 0.5);
  q(owes, 'scribble', 0.6);
  q(b10 - 6, 'whoosh', 0.4);
  q(mMoney - 3, 'pop', 0.6);
  q(mMoney + 2, 'coin', 0.4);
  q(mDebt - 3, 'pop', 0.6);
  q(mDebt + 2, 'thud', 0.45);
  q(same - 3, 'tick', 0.6);
  q(same + 3, 'stamp', 0.75);

  // ---------- S6: Bank of England ----------
  const s6 = {from: cut('b11'), to: cut('b12')};
  const consp = w('b11', 'conspiracy');
  const boe = w('b11', 'bank');
  const expl = w('b11', 'explained');
  q(s6.from, 'whoosh', 0.45);
  q(consp - 4, 'crinkle', 0.6);
  q(boe - 4, 'whoosh_s', 0.45);
  q(boe, 'paper', 0.7);
  q(expl, 'marker', 0.5);

  // ---------- S7: paying back ----------
  const s7 = {from: cut('b12'), to: cut('b13')};
  const five12 = w('b12', 'five');
  const years = we('b12', 'years');
  const interest = w('b12', 'interest');
  q(s7.from, 'whoosh', 0.45);
  for (let k = s7.from + 8; k < s7.to - 10; k += 10) q(k, 'step', 0.3);
  const yA = five12 - 4;
  const yB = years + 18;
  for (let i = 1; i <= 5; i++) q(Math.round(yA + ((yB - yA) * i) / 6), 'flip', 0.55);
  [0, 4, 8, 12].forEach((d) => q(interest + d, 'coin', 0.45));
  q(interest - 2, 'stamp', 0.6);
  const yp = lin(f, yA, yB, 0, 5.99);
  const year = 2026 + Math.floor(yp);
  const yfr = yp - Math.floor(yp);
  const yflip = yp > 0.02 && yp < 5.9 && yfr < 0.18 ? 1 - yfr / 0.18 : 0;

  // ---------- S8: now you know why ----------
  const s8 = {from: cut('b13'), to: END};
  const smiles = w('b13', 'smiles');
  const wed = w('b13', 'wed');
  const lend = we('b13', 'money');
  const now = w('b13', 'now');
  q(s8.from, 'whoosh', 0.45);
  q(smiles, 'ding', 0.6);
  q(wed - 3, 'pop', 0.55);
  q(now - 2, 'whoosh_s', 0.3);
  q(we('b13', 'why') + 2, 'sting', 0.5);

  const k1: Key[] = [
    {at: 0, pose: 'idle', expr: 'happy'},
    {at: daveName - 4, pose: 'wave', expr: 'grin'},
    {at: car - 6, pose: 'think', expr: 'happy', look: 0.7},
    {at: zero - 3, pose: 'pockets', expr: 'sad', look: 0},
  ];
  const mothT = lin(f, zero + 4, zero + 70);

  return (
    <AbsoluteFill>
      {/* S1 */}
      <Scene f={f} {...s1}>
        <Cam f={f} keys={[[0, 1, 960, 540], [car, 1.06, 1040, 500], [zero, 1.12, 1000, 540]]} sx={shk1.x} sy={shk1.y}>
          <Street f={f} />
          <Svg>
            <Stick f={f} x={960} y={820} s={1.35 * pop(f, 3, 10)} keys={k1} acc={[...DAVE]} pockets={ease(f, zero - 3, zero + 5)} seed={7} />
            <G x={610} y={400} s={pop(f, daveName) * out(f, car - 6)} r={-6}>
              <Text size={64} color={C.ink}>DAVE</Text>
            </G>
            <Arrow d="M 640 450 Q 700 540 800 540" t={ease(f, daveName + 2, daveName + 12) * out(f, car - 6)} />
            <G x={1360} y={330} s={pop(f, car - 4) * out(f, but, 8)}>
              <Thought w={400} h={260} tx={-220} ty={160}>
                <Car s={0.95} y={30} />
              </Thought>
            </G>
            <G x={1340} y={380} s={pop(f, zero, 9, 240) * 1.1} r={-8}>
              <Text size={170} color={C.red} stroke={C.ink} sw={14}>$0</Text>
            </G>
            <Moth f={f} x={960 + mothT * 260 + Math.sin(mothT * 20) * 30} y={690 - mothT * 480} s={0.8} o={mothT > 0 ? 1 - Math.max(0, mothT - 0.8) * 5 : 0} />
          </Svg>
        </Cam>
      </Scene>

      {/* S2a exterior */}
      <Scene f={f} {...s2a}>
        <Cam f={f} keys={[[s2a.from, 1, 960, 540], [asks, 1.08, 1020, 520]]}>
          <Street f={f} />
          <Svg>
            <Bank x={1300} y={822} s={1.05} />
            <Stick f={f} x={ease(f, s2a.from, s2a.to, 260, 780)} y={820} s={1.1} walk keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} acc={[...DAVE]} seed={7} />
          </Svg>
        </Cam>
      </Scene>

      {/* S2b interior ask */}
      <Scene f={f} {...s2b}>
        <Cam f={f} keys={[[s2b.from, 1, 960, 540], [w('b3', 'ten'), 1.08, 1100, 500]]}>
          <Interior />
          <Svg>
            <Stick f={f} x={720} y={785} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.6}, {at: we('b3', 'dollars'), pose: 'present', expr: 'grin'}]} acc={[...BANKER]} seed={31} />
            <Desk x={720} y={822} w={560} />
            <Stick f={f} x={1400} y={820} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: w('b3', 'can') - 2, pose: 'talk', talk: true}, {at: we('b3', 'dollars'), pose: 'idle', talk: false, expr: 'happy'}]} acc={[...DAVE]} seed={7} />
            <Bubble x={1400} y={300} s={pop(f, w('b3', 'can') - 2)} text={'Can I borrow\n$10,000?'} size={52} tail="down" />
          </Svg>
        </Cam>
      </Scene>

      {/* S3 dream vault */}
      <Scene f={f} {...s3}>
        <AbsoluteFill style={{filter: `grayscale(${gray}) brightness(${1 - gray * 0.15})`, transform: `translate(${shk3.x}px,${shk3.y}px)`}}>
          <Cam f={f} keys={[[s3.from, 1, 960, 540], [safe, 1.06, 820, 500], [gives, 1, 960, 520]]}>
            <DreamBg />
            <Svg>
              <Vault x={640} y={470} s={0.95} open={ease(f, safe - 4, safe + 22)}
                inside={
                  <g>
                    <MoneyStack x={-95} y={150} n={7} />
                    <MoneyStack x={95} y={150} n={5} />
                    <MoneyStack x={0} y={40} n={4} />
                    {[-120, -40, 40, 120].map((cx) => <Coin key={cx} x={cx} y={-120} s={0.9} />)}
                  </g>
                }
              />
              <MoneyStack x={300} y={300} n={0} label="Grandma's savings" lr={-8} s={1.6 * pop(f, w('b4', 'other'))} />
              <MoneyStack x={1010} y={250} n={0} label="Bob's paycheck" lr={6} s={1.6 * pop(f, w('b4', 'peoples'))} />
              <MoneyStack x={640} y={850} n={0} label="Your deposit" lr={-3} s={1.6 * pop(f, w('b4', 'money'))} />
              {[0, 1, 2, 3].map((i) => {
                const a = gives + i * 5;
                const p = ease(f, a, a + 20);
                if (f < a) return null;
                const x = 640 + (1440 + (i - 1.5) * 46 - 640) * p;
                const y = 470 + (820 - i * 16 - 470) * p - Math.sin(p * Math.PI) * 260;
                return <Bill key={i} x={x} y={y} s={0.8} r={p < 1 ? p * 540 : (i - 1.5) * 8} />;
              })}
              <Stick f={f} x={1440} y={860} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: gives, pose: 'celebrate', expr: 'grin', look: 0}, {at: nope, pose: 'shock', expr: 'shock'}]} acc={[...DAVE]} seed={7} />
            </Svg>
          </Cam>
          <DreamFrame label="WHAT MOST PEOPLE THINK" />
        </AbsoluteFill>
        <AbsoluteFill style={{transform: `translate(${shk3.x}px,${shk3.y}px)`}}>
          <Svg>
            <XMark x={960} y={470} s={pop(f, nope, 9, 280) * 1.05} r={-4} />
            <G x={960} y={470} s={pop(f, nope + 3, 10, 260)} r={-4}>
              <Text size={150} color="#fff" stroke={C.ink} sw={18}>NOPE.</Text>
            </G>
          </Svg>
        </AbsoluteFill>
      </Scene>

      {/* S4 typing */}
      <Scene f={f} {...s4}>
        <Cam f={f} keys={[[s4.from, 1, 960, 540], [click, 1.12, 1000, 500], [b7, 1.12, 1000, 500], [b7 + 14, 1.5, 1080, 430], [ago + 6, 1.5, 1080, 430], [ago + 22, 1.02, 1100, 520]]}>
          <Interior />
          <Svg>
            <Stick f={f} x={640} y={785} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.9}, {at: types - 4, pose: 'typing'}, {at: click + 4, pose: 'present', expr: 'grin'}]} acc={[...BANKER]} seed={31} />
            <Desk x={820} y={822} w={760} />
            <Keyboard x={640} y={614} />
            <Monitor x={1080} y={560} s={0.82} value={balance} valueColor={typed ? C.green : C.ink} flash={flash} />
            <Sparkle x={1260} y={250} t={lin(f, done, done + 20)} s={0.9} />
            <Sparkle x={900} y={300} t={lin(f, done + 4, done + 24)} s={0.6} />
            <Stick f={f} x={1640} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: done, pose: 'shock', expr: 'shock', look: -0.4}]} acc={[...DAVE]} seed={7} />
            <G x={1340} y={215} s={pop(f, five7) * 1.25} r={5}>
              <MoneyStack n={0} label="5 sec ago: $0" lr={0} />
            </G>
          </Svg>
        </Cam>
      </Scene>

      {/* S5 duck + papers + cards */}
      <Scene f={f} {...s5}>
        {(() => {
          const e = ease(f, b9 - 6, b9 + 8);
          const fadeA = out(f, b10 - 6, 10);
          const rv1 = lin(f, writing, paperW + 4);
          const rv2 = lin(f, owes, owesEnd + 4);
          const hop = f > appears && f < appears + 16 ? -Math.sin(((f - appears) / 16) * Math.PI) * 50 : 0;
          return (
            <Cam f={f} keys={[[s5.from, 1, 960, 540], [poof, 1.05, 1000, 500], [b9, 1, 960, 540]]}>
              <Board />
              <Svg>
                <g opacity={fadeA} transform={`translate(${960 - 420 * e},${470 - 260 * e}) scale(${1 - 0.5 * e}) translate(-960,-470)`}>
                  <Paper id="p1" x={560} y={470} r={-4} s={pop(f, s5.from + 4)} text="1 DUCK" reveal={rv1} size={120} />
                  <Pencil x={560 - 170 + 340 * rv1} y={470 + Math.sin(f * 1.4) * 8} o={rv1 > 0 && rv1 < 1 ? 1 : 0} />
                  <Arrow d="M 830 470 Q 960 400 1110 470" t={ease(f, poof - 8, poof + 2)} />
                  <Puff x={1350} y={470} t={lin(f, poof, poof + 24)} />
                  <Duck f={f} x={1350} y={450 + hop} s={pop(f, poof + 3, 9)} />
                </g>
                <g opacity={fadeA}>
                  <Paper id="p2" x={1200} y={560} r={3} s={pop(f, second - 4)} text={'Dave owes us\n$10,000'} reveal={rv2} size={88} color={C.red} w={560} h={340} />
                  <Pencil x={1200 - 200 + 400 * rv2} y={560 + Math.sin(f * 1.4) * 8} o={rv2 > 0 && rv2 < 1 ? 1 : 0} />
                </g>
                <Card x={560} y={330} s={pop(f, mMoney - 3)} top="NEW MONEY" big="+$10,000" color={C.green} />
                <Card x={1360} y={330} s={pop(f, mDebt - 3)} top="NEW DEBT" big="−$10,000" color={C.red} />
                <Clock f={f} x={960} y={330} s={pop(f, same - 3) * 0.7} />
                <Stamp x={960} y={545} s={pop(f, same + 3, 9, 280)} r={-4} text="AT THE SAME TIME" size={50} color={C.ink} />
                <Stick f={f} x={960} y={880} s={0.75 * ease(f, b10 - 4, b10 + 6)} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: mMoney - 3, pose: 'point_l', expr: 'happy', look: -0.9}, {at: mDebt - 3, pose: 'point_r', expr: 'worried', look: 0.9}, {at: same, pose: 'shock', expr: 'shock', look: 0}]} acc={[...DAVE]} seed={7} />
              </Svg>
            </Cam>
          );
        })()}
      </Scene>

      {/* S6 Bank of England */}
      <Scene f={f} {...s6}>
        {(() => {
          const fly = ease(f, boe - 4, boe + 16);
          return (
            <Cam f={f} keys={[[s6.from, 1, 960, 540], [boe, 1, 960, 540], [expl, 1.1, 1150, 470]]}>
              <Board />
              <Svg>
                <Stick f={f} x={430} y={840} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'suspicious', look: 0.4}, {at: consp - 4, pose: 'think', expr: 'suspicious'}, {at: boe - 4, pose: 'shock', expr: 'shock', look: 0.8}, {at: expl, pose: 'point_r', expr: 'happy', look: 0.9}]} acc={[...DAVE]} seed={7}
                  tinfoil={{x: 150 * fly, y: -6 - 420 * fly, r: 150 * fly, o: pop(f, consp - 4) * (1 - Math.max(0, fly - 0.7) / 0.3)}} />
                <DocCard x={ease(f, boe - 6, boe + 10, 2400, 1220)} y={440} s={0.98} r={2} hl={lin(f, expl, we('b11', 'fourteen') + 12)} />
              </Svg>
            </Cam>
          );
        })()}
      </Scene>

      {/* S7 paying back */}
      <Scene f={f} {...s7}>
        <Cam f={f} keys={[[s7.from, 1.08, 760, 520], [we('b12', 'interest'), 1.08, 1100, 500]]}>
          <Street f={f} />
          <Svg>
            <Bank x={1640} y={822} s={0.6} />
            <Stick f={f} x={ease(f, s7.from, s7.to, 520, 1180)} y={820} s={1.15} walk sweat keys={[{at: 0, pose: 'carry', expr: 'tired', look: 0.7}]} acc={[...DAVE]} seed={7}
              handItem={<Sack y={-78} s={0.85 + 0.25 * ease(f, interest, interest + 14)} coins={Math.floor(lin(f, interest, interest + 14, 0, 10))} />} />
          </Svg>
        </Cam>
        <Svg>
          <Calendar x={200} y={210} s={0.85 * pop(f, s7.from + 6)} year={year} flip={yflip} />
          <Stamp x={1480} y={200} s={pop(f, interest - 2, 9, 260)} r={6} text="+ INTEREST" size={60} />
        </Svg>
      </Scene>

      {/* S8 now you know */}
      <Scene f={f} {...s8}>
        <Cam f={f} keys={[[s8.from, 1, 960, 540], [now - 2, 1.04, 900, 520], [now + 14, 1.42, 1420, 470]]}>
          <Interior />
          <Svg>
            <Stick f={f} x={700} y={790} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.6}, {at: smiles - 4, pose: 'present', expr: 'grin'}, {at: wed - 2, talk: true}, {at: lend, talk: false, expr: 'grin'}]} acc={[...BANKER]} seed={31} />
            <Desk x={700} y={822} w={560} />
            <Sparkle x={742} y={440} t={lin(f, smiles, smiles + 18)} s={0.55} color="#fff" />
            <Bubble x={720} y={200} s={pop(f, wed - 3) * out(f, now + 4)} text={"We'd LOVE to lend\nyou money!"} size={48} tail="down" />
            <Stick f={f} x={1420} y={820} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: now - 2, pose: 'hips', expr: 'smug', look: 0}]} acc={[...DAVE]} seed={7} />
          </Svg>
        </Cam>
      </Scene>

      <Vignette />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
