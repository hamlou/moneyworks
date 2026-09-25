import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette} from '../fx';
import {Bank, Bill, Bubble, Calendar, Card, Coin, Desk, Duck, Monitor, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Envelope, Frame, Icon, Magnifier, Phone, Row, Shield, Sign, SubButton, Bell} from '../props2';
import {PriceTag, SplitBar} from '../props3';
import {amort, BouncyCastle, Burger, Cat, Globe, House, LineChart, Pizza, Sandwich, Truck, WaterHeater} from '../props4';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Landlord: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle']} seed={53} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const AM = amort(300000, 0.0703, 30);

export const Ep03: React.FC = () => {
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
    const bo = w('o1', 'borrowed');
    q(2, 'pop', 0.6);
    q(8, 'ding', 0.5);
    q(bo, 'stamp', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <House x={1250} y={822} s={0.85 * pop(f, 2, 12)} sold="SOLD!" />
          <Dave f={f} x={520} y={820} s={1.3} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          <Cat f={f} x={760} y={800} s={0.8} />
          <Stamp x={560} y={200} s={pop(f, bo, 9, 260)} r={-5} text="$300,000 LOAN" size={60} color={C.navy} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('o2', 'seven');
    const dl = we('o2', 'dollars');
    const db = w('o3', 'double');
    q(sv, 'whoosh', 0.5);
    for (let k = sv; k < dl; k += 5) q(k, 'coin', 0.25);
    q(dl, 'thud', 0.7);
    q(db, 'stamp', 0.8);
    q(db + 4, 'heart', 0.7);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={240}><Text size={56} color="#5B6470">Dave will pay the bank</Text></G2>
          <G2 x={960} y={430}><Text size={200} color={f >= dl ? C.red : C.ink} stroke={C.ink} sw={f >= dl ? 14 : 0}>{fmt(lin(f, sv - 6, dl, 300000, 720000))}</Text></G2>
          <Stamp x={960} y={660} s={pop(f, db, 9, 260)} r={-5} text="MORE THAN DOUBLE" size={72} />
          <Dave f={f} x={1640} y={880} s={0.9} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: dl, pose: 'shock', expr: 'shock'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hr = w('o4', 'hurts');
    const nn = w('o4', 'none');
    q(hr, 'heart', 0.5);
    q(nn, 'pop', 0.5);
    for (let i = 0; i < 7; i++) q(nn + 6 + i * 4, 'crinkle', 0.2);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Pizza x={960} y={480} s={1.3 * pop(f, bs('o4'))} eaten={Math.floor(lin(f, nn + 6, nn + 34, 0, 7))} />
          <G2 x={960} y={130} s={pop(f, nn)}><Text size={60}>First 5 years: almost all → the bank</Text></G2>
          <Banker f={f} x={1560} y={880} s={1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          <Dave f={f} x={360} y={880} s={1} keys={[{at: 0, pose: 'idle', expr: 'sad', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const a = w('o5', 'mortgage');
    const b = w('o5', 'first');
    const c = w('o5', 'costs');
    const d = w('o5', 'habit');
    [a, b, c, d].forEach((x) => q(x - 2, 'pop', 0.6));
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {[
            [a, 'How it works', <House key="h" s={0.35} y={110} />],
            [b, 'First payments', <Pizza key="p" s={0.6} eaten={7} y={-20} />],
            [c, 'Hidden costs', <PriceTag key="t" s={1} text="???" y={-30} />],
            [d, 'Save $100,000+', <MoneyStack key="m" n={7} s={1.2} y={60} />],
          ].map(([at, label, el], i) => (
            <Frame key={i} x={270 + i * 460} y={500} s={pop(f, (at as number) - 2)} w={420} h={420} label={label as string}>
              {el}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const lm = w('c1b', 'landlord');
    const gn = w('c1b', 'gone');
    const pays = [lm, lm + 22, lm + 44];
    pays.forEach((x) => q(x + 14, 'coin', 0.45));
    q(gn, 'poof', 0.6);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={520} y={820} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.7}, {at: lm, pose: 'present'}]} />
          <Landlord f={f} x={1400} y={820} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: -0.7}, {at: lm + 10, pose: 'celebrate', expr: 'grin'}]} />
          <Calendar x={960} y={220} s={0.7 * pop(f, bs('c1b'))} top="RENT" year={['JAN', 'FEB', 'MAR', 'APR'][Math.min(3, Math.floor(lin(f, lm, gn, 0, 3.99)))]} flip={0} />
          {pays.map((x, i) => {
            const p = ease(f, x, x + 16);
            return f < x || p >= 1 ? null : <Bill key={i} x={620 + p * 700} y={560 - Math.sin(p * Math.PI) * 180} s={0.8} r={p * 180} />;
          })}
          <Puff x={1400} y={420} t={lin(f, gn, gn + 20)} s={0.8} />
          <G2 x={1400} y={330} s={pop(f, gn + 4)}><Text size={60} color={C.red}>gone.</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pr = w('c1c', 'price');
    const ct = w('c1d', 'cat');
    q(A('c1c') + 4, 'pop', 0.5);
    q(pr, 'stamp', 0.5);
    q(ct, 'boing', 0.5);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <House x={1250} y={822} s={0.85 * pop(f, A('c1c') + 4)} sold="FOR SALE" />
          <PriceTag x={1250} y={180} s={1.3 * pop(f, pr)} r={-4} text="$300,000" />
          <Dave f={f} x={520} y={820} s={1.25} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: bs('c1d'), pose: 'pockets', expr: 'sad', look: 0}, {at: ct, pose: 'shrug', expr: 'worried'}]} pockets={ease(f, bs('c1d'), bs('c1d') + 6)} />
          <Cat f={f} x={760} y={800} s={0.9 * pop(f, ct, 9)} />
          <G2 x={760} y={600} s={pop(f, ct + 4)}><Text size={44} font="Caveat" color={C.ink}>total assets: 1 cat</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mo = w('c1e', 'mortgage');
    const pm = w('c1f', 'promise');
    const tk = w('c1g', 'take');
    const fc = w('c1g', 'foreclosure');
    q(mo - 2, 'pop', 0.6);
    q(pm, 'stamp', 0.6);
    q(tk, 'thud', 0.5);
    q(fc, 'stamp', 0.7);
    scene(A('c1e'), () =>
      f < A('c1g') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Banker f={f} x={720} y={785} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.6}, {at: pm - 4, pose: 'present', expr: 'grin'}]} />
            <Desk x={720} y={822} w={560} />
            <Dave f={f} x={1420} y={820} s={1.3} keys={[{at: 0, pose: 'talk', expr: 'happy', look: -0.8, talk: true}, {at: mo + 20, pose: 'idle', talk: false}]} />
            <Bubble x={1420} y={300} s={pop(f, mo - 2) * out(f, pm - 10)} text={'A mortgage,\nplease!'} size={52} />
            <G2 x={1180} y={330} s={pop(f, pm - 6)} r={3}>
              <Paper id="e3m1" text={'MORTGAGE'} reveal={1} size={64} color={C.navy} w={400} h={220} />
              <G2 x={0} y={140} s={pop(f, pm)}><Stamp text="HOUSE = PROMISE" size={40} color={C.red} /></G2>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{filter: `grayscale(${ease(f, fc, fc + 12) * 0.6})`}}>
          <Street f={f} />
          <Svg>
            <House x={1150} y={822} s={0.85} />
            <Sign x={1480} y={640} s={pop(f, fc, 9, 260)} text="FORECLOSURE" />
            <Banker f={f} x={1650} y={820} s={1} keys={[{at: 0, pose: 'point_l', expr: 'smug', look: -0.8}]} />
            <Dave f={f} x={450} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: tk, pose: 'shock', expr: 'shock'}]} />
            <Cat f={f} x={640} y={800} s={0.8} mood="shock" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const cl = w('c1h', 'click');
    q(A('c1h') + 4, 'dream', 0.35);
    q(cl, 'click', 0.8);
    q(cl + 8, 'quack', 0.5);
    scene(A('c1h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={480} s={pop(f, A('c1h') + 4)}>
            <rect x={-520} y={-320} width={1040} height={620} rx={24} fill="#F7EEDC" stroke={C.ink} strokeWidth={6} strokeDasharray="22 14" />
            <Text y={-270} size={32} color="#8C7A5B" ls={4}>FROM OUR FIRST VIDEO</Text>
            <Monitor x={-160} y={230} s={0.8} value={f > cl ? '$300,000' : '$0'} valueColor={C.green} flash={f > cl ? out(f, cl, 10) : 0} />
            <Duck f={f} x={280} y={120} s={0.8 * pop(f, cl + 6)} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 ============
  {
    const sv = w('c2b', 'seven');
    q(A('c2a') + 4, 'pop', 0.5);
    q(sv, 'stamp', 0.8);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bank x={480} y={820} s={0.8} />
          <G2 x={1250} y={300} s={pop(f, A('c2a') + 4)}><Text size={60} color="#5B6470">30-year mortgage today</Text></G2>
          <G2 x={1250} y={500} s={pop(f, sv)}><Text size={260} color={C.red} stroke={C.ink} sw={16}>~7%</Text></G2>
          <G2 x={1250} y={660} s={pop(f, sv + 6)}><Text size={44} color="#5B6470">per year</Text></G2>
          <SourceTag f={f} at={sv + 6} text="Freddie Mac PMMS: 7.03% (Sept 24, 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bc = w('c2c', 'bouncy');
    const big = w('c2c', 'big');
    const lng = w('c2c', 'long');
    const hg = w('c2d', 'huge');
    const th = w('c2d', 'thirty');
    q(bc, 'boing', 0.6);
    q(big, 'whoosh_s', 0.4);
    q(lng, 'tick', 0.5);
    q(hg, 'boing', 0.6);
    q(th, 'flip', 0.5);
    const size = f < hg ? ease(f, big, big + 14, 0.6, 0.9) : ease(f, hg, hg + 14, 0.9, 1.3);
    const jump = Math.abs(Math.sin(f / 7)) * 60;
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <BouncyCastle x={960} y={840} s={pop(f, bc - 4)} size={size} f={f} />
          <Dave f={f} x={960} y={660 - jump * pop(f, bc + 6)} s={0.8} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={1600} y={200} s={pop(f, lng)}><Calendar top="YEARS" year={f >= th ? 30 : 1} flip={0} s={0.8} /></G2>
          <G2 x={330} y={200} s={pop(f, hg)}><PriceTag text="$300,000" s={1.1} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c2e', 'two');
    const tp = w('c2f', 'three');
    const ad = w('c2g', 'add');
    const sv = w('c2g', 'seven');
    const dl = we('c2g', 'dollars');
    q(tw, 'pop', 0.6);
    q(tp, 'whoosh', 0.4);
    q(sv, 'cash', 0.5);
    q(dl, 'thud', 0.6);
    const nPay = Math.floor(lin(f, bs('c2f'), we('c2f', 'payments'), 0, 360));
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Phone x={330} y={500} s={1 * pop(f, tw - 4)} title="MONTHLY" value="$2,002" color={C.red} />
          {Array.from({length: nPay}).map((_, i) => (
            <rect key={i} x={620 + (i % 30) * 40} y={200 + Math.floor(i / 30) * 40} width={30} height={30} rx={5} fill={i % 12 === 11 ? C.red : '#F28C9E'} />
          ))}
          <G2 x={1200} y={710} s={pop(f, tp)}><Text size={56}>{nPay} payments</Text></G2>
          <G2 x={1200} y={840} s={pop(f, ad)}><Text size={90} color={C.red} stroke={C.ink} sw={8}>{'= ' + fmt(lin(f, sv - 4, dl, 0, 720700))}</Text></G2>
          <SourceTag f={f} at={tw + 6} text="$300,000 at 7.03%, 30 years (principal & interest)" until={ad} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hs = w('c2h', 'house');
    const bw = w('c2h', 'borrowing');
    const ag = w('c2i', 'again');
    q(hs, 'pop', 0.5);
    q(bw, 'pop', 0.5);
    q(ag, 'poof', 0.5);
    scene(A('c2h'), () =>
      f < A('c2i') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={220}><Text size={64}>Where the $720,700 goes</Text></G2>
            <SplitBar x={960} y={480} a={0.416} la="House $300k" lb="Interest $420k" ca={C.green} cb={C.red} t={ease(f, hs - 4, bw)} w={1300} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <House x={560} y={822} s={0.7} sold="DAVE" />
            <Puff x={1350} y={600} t={lin(f, ag, ag + 22)} s={1} />
            <G2 o={ease(f, ag + 4, ag + 12)}>
              <House x={1350} y={822} s={0.7} sold="BANK" color="#E6E0F5" />
              <Banker f={f} x={1600} y={820} s={0.9} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
              <G2 x={1350} y={150} s={pop(f, ag + 16)}><Text size={52} color={C.red}>+ a little extra</Text></G2>
            </G2>
            <Dave f={f} x={900} y={820} s={1} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 ============
  {
    const fp = w('c3b', 'first');
    const tw = w('c3d', 'two');
    const oth = w('c3e', 'other');
    const it = w('c3e', 'interest');
    q(fp, 'pop', 0.6);
    for (let k = bs('c3c'); k < tw - 4; k += 12) q(k, 'tick', 0.45);
    q(tw, 'boing', 0.6);
    q(it, 'cash', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Phone x={330} y={500} s={pop(f, fp - 4)} title="PAYMENT #1" value="$2,002" />
          <G2 x={1180} y={220} s={pop(f, bs('c3c'))}><Text size={60}>How much goes to the house?</Text></G2>
          <SplitBar x={1180} y={480} a={0.122} la="$244" lb={f >= oth ? '$1,758 → BANK' : ''} ca={C.green} cb={C.red} t={f >= oth ? 1 : ease(f, tw - 4, tw + 8) * 0.999} w={1100} />
          <G2 x={680} y={660} s={pop(f, tw + 4)}><Text size={40} color={C.green}>house</Text></G2>
          <G2 x={1300} y={700} s={pop(f, it)}><Stamp text="INTEREST" size={56} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pz = w('c3f', 'pizza');
    const bk = w('c3f', 'bank');
    const dv = w('c3f', 'dave');
    q(pz, 'pop', 0.6);
    for (let i = 0; i < 7; i++) q(bk + i * 5, 'crinkle', 0.25);
    q(dv, 'boing', 0.5);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Pizza x={960} y={480} s={1.4 * pop(f, pz)} eaten={Math.floor(lin(f, bk, bk + 36, 0, 7))} />
          <Banker f={f} x={1560} y={840} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'grin', look: -0.8}, {at: bk, pose: 'celebrate', expr: 'grin'}]} />
          <Dave f={f} x={380} y={840} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: dv, pose: 'shrug', expr: 'sad'}]} />
          <G2 x={1560} y={250} s={pop(f, bk + 20)}><Text size={60} color={C.red}>7 slices</Text></G2>
          <G2 x={380} y={250} s={pop(f, dv)}><Text size={60} color={C.green}>1 slice</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ow = w('c3g', 'owe');
    const ev = w('c3g', 'everything');
    const sh = w('c3h', 'shrinks');
    q(ow, 'pop', 0.5);
    q(ev, 'stamp', 0.5);
    q(sh, 'whoosh_s', 0.4);
    const years = ease(f, sh - 10, A('c3i'), 0, 1);
    scene(A('c3g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={pop(f, ow)}><Text size={56}>interest = 7% × what you still owe</Text></G2>
          {f < sh - 10 ? (
            <Card x={960} y={450} s={pop(f, ev)} top="DAVE STILL OWES" big="$300,000" color={C.red} w={620} />
          ) : (
            <g>
              <LineChart x={960} y={520} w={1300} h={420} t={years} pts={AM.intY} lo={0} hi={24000} color={C.red} />
              <LineChart x={960} y={520} w={1300} h={420} t={years} pts={AM.prinY} lo={0} hi={24000} color={C.green} axes={false} />
              <Text x={400} y={260} size={40} color={C.red} anchor="start">to the bank</Text>
              <Text x={400} y={780} size={40} color={C.green} anchor="start">to the house</Text>
              <Text x={1610} y={790} size={34} color="#5B6470">year 30</Text>
            </g>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sl = w('c3i', 'slow');
    q(sl, 'boing', 0.4);
    scene(A('c3i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={300} s={pop(f, A('c3i') + 2)}><Text size={120}>Painfully slow.</Text></G2>
          <G2 x={ease(f, A('c3i'), A('c3j'), 300, 520)} y={700}>
            <path d="M -60 20 Q -60 -60 10 -60 Q 70 -60 70 0 Q 70 30 20 30 Z" fill="#F4A259" stroke={C.ink} strokeWidth={6} />
            <path d="M 10 -30 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0" fill="none" stroke={C.ink} strokeWidth={5} />
            <path d="M -80 30 L 120 30 Q 150 30 150 0 L 150 -20 M 140 -20 L 130 -50 M 150 -20 L 165 -50" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c3j', 'one');
    const sv = w('c3j', 'seventeen');
    q(on, 'pop', 0.6);
    q(sv, 'thud', 0.6);
    q(sv + 8, 'trombone', 0.4);
    scene(A('c3j'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140}><Text size={60}>After 5 years</Text></G2>
          <line x1={400} y1={820} x2={1520} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={720} y={820} h={ease(f, on - 4, on + 14, 0, 520)} color={C.blue} label="Dave paid" value="$120,100" />
          <Bar x={1200} y={820} h={Math.max(4, ease(f, sv - 4, sv + 10, 0, 76))} color={C.green} label="Loan went down" value={f >= sv ? '$17,500' : '...'} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c3k', 'twenty');
    q(tw, 'stamp', 0.6);
    scene(A('c3k'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <LineChart x={960} y={520} w={1300} h={420} t={1} pts={AM.intY} lo={0} hi={24000} color={C.red} />
          <LineChart x={960} y={520} w={1300} h={420} t={1} pts={AM.prinY} lo={0} hi={24000} color={C.green} axes={false} />
          <g opacity={pop(f, tw)}>
            <line x1={310 + (20 / 29) * 1300} y1={290} x2={310 + (20 / 29) * 1300} y2={750} stroke={C.ink} strokeWidth={5} strokeDasharray="14 10" />
            <circle cx={310 + (20.2 / 29) * 1300} cy={520} r={18} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
          </g>
          <Stamp x={310 + (20 / 29) * 1300} y={200} s={pop(f, tw, 9, 260)} text="YEAR 20" size={56} color={C.navy} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const od = w('c3l', 'old');
    q(od, 'boing', 0.4);
    scene(A('c3l'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <House x={1200} y={822} s={0.75} sold="DAVE" />
          <Cat f={f} x={620} y={790} s={1.5} mood={f >= od - 6 ? 'old' : 'happy'} />
          <G2 x={620} y={460} s={pop(f, od)}><Text size={52} font="Caveat">*20 years later*</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 ============
  {
    const ns = w('c4a', 'not');
    q(ns, 'pop', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Phone x={700} y={500} s={1} title="MONTHLY" value="$2,002" color={C.red} />
          <G2 x={1200} y={500} s={pop(f, ns)}><Text size={150} color={C.red} stroke={C.ink} sw={10}>+ ???</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cc = w('c4b', 'closing');
    const tp = w('c4b', 'two');
    const six = w('c4b', 'six');
    const tx = w('c4c', 'taxes');
    const fv = w('c4c', 'forever');
    const ins = w('c4d', 'insurance');
    const tr = w('c4d', 'truck');
    q(cc, 'paper', 0.6);
    q(six, 'stamp', 0.6);
    q(tx, 'pop', 0.6);
    q(fv, 'flip', 0.4);
    q(ins, 'pop', 0.6);
    q(tr - 10, 'whoosh', 0.5);
    q(tr + 4, 'thud', 0.8);
    const truckX = ease(f, tr - 14, tr + 4, 2200, 1500);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Frame x={330} y={460} s={pop(f, cc - 2)} w={520} h={540}>
            {[0, 1, 2].map((i) => <G2 key={i} x={-10 + i * 12} y={-60 + i * 14} r={-4 + i * 4}><Paper id={`e3cc${i}`} text={i === 2 ? 'CLOSING' : ''} reveal={1} size={50} color={C.navy} w={300} h={200} /></G2>)}
            <G2 x={0} y={170} s={pop(f, six)}><Text size={48} color={C.red}>$6k – $15k</Text></G2>
            <G2 x={0} y={220} s={pop(f, tp)}><Text size={28} color="#5B6470">2–5% of the loan</Text></G2>
          </Frame>
          <Frame x={960} y={460} s={pop(f, tx - 2)} w={520} h={540}>
            <Calendar x={0} y={-50} s={0.9} top="EVERY" year="YEAR" flip={0} />
            <Text y={170} size={46} color={C.red}>PROPERTY TAX</Text>
            <G2 x={0} y={220} s={pop(f, fv)}><Text size={30} color="#5B6470">...forever</Text></G2>
          </Frame>
          <Frame x={1590} y={460} s={pop(f, ins - 2)} w={520} h={540}>
            <House x={-40} y={120} s={0.4} r={f > tr + 4 ? Math.sin(f) * 3 * out(f, tr + 20, 10) : 0} />
            <Truck x={truckX - 1590} y={140} s={0.6} />
            <Text y={200} size={46} color={C.red}>INSURANCE</Text>
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pmi = w('c4e', 'mortgage');
    const bk = w('c4e', 'bank', 1);
    q(pmi, 'pop', 0.6);
    q(bk, 'stamp', 0.6);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130}><Text size={52}>Less than 20% down?</Text></G2>
          <Banker f={f} x={1350} y={860} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.4}]} />
          <Shield x={1050} y={520} s={pop(f, pmi)} top="PMI" big="protects" />
          <Dave f={f} x={450} y={860} s={1.2} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.7}]} />
          <Stamp x={960} y={860} s={pop(f, bk, 9, 260)} text="THE BANK. NOT DAVE." size={52} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rf = w('c4f', 'roof');
    const wh = w('c4f', 'water');
    const my = w('c4f', 'mysterious');
    const rt = w('c4g', 'rent');
    const ow = w('c4g', 'own');
    q(rf, 'thud', 0.5);
    q(wh, 'sputter', 0.5);
    q(my, 'heart', 0.6);
    q(rt, 'pop', 0.5);
    q(ow, 'pop', 0.5);
    scene(A('c4f'), () =>
      f < A('c4g') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <House x={520} y={822} s={0.6 * pop(f, rf - 4)} />
            <Puff x={560} y={560} t={lin(f, rf, rf + 20)} s={0.5} />
            <WaterHeater x={1050} y={822} s={pop(f, wh - 4)} f={f} />
            <G2 x={1500} y={400} s={pop(f, my)}><Text size={140} color={C.blue}>?!?</Text></G2>
            <Dave f={f} x={1500} y={820} s={1.1} sweat keys={[{at: 0, pose: 'panic', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Frame x={530} y={470} s={pop(f, rt - 2)} w={700} h={560} label="Renting: landlord fixes it">
              <Dave f={f} x={-150} y={170} s={0.8} keys={[{at: 0, pose: 'relax', expr: 'happy'}]} />
              <Landlord f={f} x={120} y={170} s={0.8} sweat keys={[{at: 0, pose: 'typing', expr: 'tired'}]} />
            </Frame>
            <Frame x={1390} y={470} s={pop(f, ow - 2)} w={700} h={560} label="Owning: you fix it">
              <Dave f={f} x={-80} y={170} s={0.8} sweat keys={[{at: 0, pose: 'typing', expr: 'tired'}]} />
              <WaterHeater x={150} y={170} s={0.6} f={f} />
            </Frame>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 ============
  {
    const pt = w('c5a', 'twist');
    const lt = w('c5b', 'letter');
    const tf = w('c5b', 'transferred');
    q(pt, 'sting', 0.6);
    q(lt, 'mail', 0.6);
    q(tf, 'stamp', 0.6);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={960} y={180} s={pop(f, pt, 9, 260)} r={-4}><Stamp text="PLOT TWIST" size={80} color={C.navy} /></G2>
          <Dave f={f} x={620} y={820} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: lt, pose: 'hold', expr: 'think'}, {at: tf, pose: 'shock', expr: 'shock'}]} />
          <Envelope x={1250} y={500} s={2 * pop(f, lt)} r={-4} label="TRANSFERRED" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sl = w('c5c', 'sells');
    const bd = w('c5d', 'bundled');
    const wd = w('c5d', 'world');
    q(sl, 'cash', 0.5);
    q(bd, 'pop', 0.6);
    q(wd, 'whoosh', 0.5);
    const p = ease(f, sl - 4, sl + 16);
    scene(A('c5c'), () =>
      f < bd - 6 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={450} y={820} s={0.7} />
            <Bank x={1480} y={820} s={0.7} label="INVESTORS" />
            <G2 x={450 + p * 1030} y={300 - Math.sin(p * Math.PI) * 100}><Paper id="e3dl" text="Dave's loan" reveal={1} size={48} color={C.navy} w={300} h={140} /></G2>
            {f > sl + 8 && <Bill x={1480 - ease(f, sl + 8, sl + 26) * 1030} y={420} s={0.9} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Sandwich x={620} y={380} s={1.2 * pop(f, bd)} n={6} />
            <Globe x={1400} y={470} s={1.1 * pop(f, wd - 4)} f={f} />
            {Array.from({length: 6}).map((_, i) => {
              const a = (i / 6) * Math.PI * 2 + f / 40;
              return <G2 key={i} x={1400 + Math.cos(a) * 250} y={470 + Math.sin(a) * 250} s={pop(f, wd + i * 3) * 0.55}><Icon kind="briefcase" /></G2>;
            })}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const hf = w('c5e', 'half');
    const fm = w('c5e', 'fannie');
    const fr = w('c5e', 'freddie');
    const ag = w('c5f', 'another');
    const tt = w('c5g', 'thirteen');
    q(hf, 'pop', 0.5);
    q(fm, 'pop', 0.6);
    q(fr, 'pop', 0.6);
    q(ag, 'coin', 0.4);
    q(tt, 'stamp', 0.7);
    scene(A('c5e'), () =>
      f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={560} y={800} s={0.7 * pop(f, fm - 2)} label="FANNIE MAE" />
            <Bank x={1360} y={800} s={0.7 * pop(f, fr - 2)} label="FREDDIE MAC" />
            <G2 x={960} y={150} s={pop(f, hf)}><Text size={60}>≈ HALF of US mortgage debt</Text></G2>
            <SourceTag f={f} at={hf + 6} text="NY Fed Liberty Street Economics (2025): GSE loans ≈ 52% of balances" />
            {f >= ag - 10 && (
              <g>
                {[0, 1, 2].map((i) => {
                  const pp = ((f - ag + 10 + i * 12) % 36) / 36;
                  return <Bill key={i} x={400 + pp * 1100} y={270 + Math.sin(pp * Math.PI * 2) * 30} s={0.6} />;
                })}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={330}><Text size={56} color="#5B6470">Americans owe on mortgages</Text></G2>
            <G2 x={960} y={500} s={pop(f, tt)}><Text size={200} color={C.red} stroke={C.ink} sw={14}>{'$' + lin(f, tt - 6, tt + 20, 0, 13.1).toFixed(1) + ' TRILLION'}</Text></G2>
            <SourceTag f={f} at={tt + 6} text="NY Fed Household Debt and Credit, Q2 2026" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 ============
  {
    const dp = w('c6b', 'depends');
    const rn = w('c6c', 'rent');
    const eq = w('c6c', 'equity');
    q(A('c6a') + 2, 'pop', 0.5);
    q(dp, 'boing', 0.5);
    q(rn, 'poof', 0.5);
    q(eq, 'ding', 0.6);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={pop(f, A('c6a') + 2)}><Text size={90}>Buy or rent?</Text></G2>
            <Dave f={f} x={960} y={880} s={1.3} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: dp, pose: 'shrug', expr: 'smug'}]} />
            <G2 x={960} y={330} s={pop(f, dp)}><Text size={70} color={C.blue}>It depends.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Frame x={560} y={480} w={640} h={560} label="Rent">
              <MoneyStack y={120} n={6} s={1.2} o={1 - ease(f, rn + 4, rn + 12)} />
              <Puff y={60} t={lin(f, rn + 4, rn + 26)} s={0.7} />
            </Frame>
            <Frame x={1360} y={480} w={640} h={560} label="Mortgage">
              <rect x={-200} y={-180} width={400} height={300} rx={20} fill="#EEE" stroke={C.ink} strokeWidth={5} />
              <rect x={-200} y={120 - 300 * ease(f, eq - 10, eq + 30, 0, 0.35)} width={400} height={300 * ease(f, eq - 10, eq + 30, 0, 0.35)} fill={C.green} />
              <Text y={-40} size={60} color={C.ink}>EQUITY</Text>
            </Frame>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const vl = w('c6d', 'value');
    const fr = w('c6d', 'four');
    q(vl, 'whoosh_s', 0.4);
    q(fr, 'stamp', 0.6);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <LineChart x={760} y={520} w={900} h={400} t={ease(f, vl - 6, vl + 30)} pts={[100, 104, 103, 110, 118, 116, 125, 138, 150, 149, 158, 162]} />
          <House x={760} y={330} s={0.25} />
          <G2 x={1500} y={430} s={pop(f, fr)}><Text size={110} color={C.green} stroke={C.ink} sw={8}>$429,100</Text></G2>
          <G2 x={1500} y={540} s={pop(f, fr + 6)}><Text size={40} color="#5B6470">typical US home (Aug 2026)</Text></G2>
          <SourceTag f={f} at={fr + 6} text="NAR Existing-Home Sales, August 2026 (chart illustrative)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mv = w('c6e', 'move');
    const rf = w('c6e', 'roof');
    const iv = w('c6e', 'invested');
    const lng = w('c6f', 'long');
    const pr = w('c6f', 'prices');
    const ir = w('c6f', 'interest');
    [mv, rf, iv].forEach((x) => q(x, 'pop', 0.5));
    [lng, pr, ir].forEach((x) => q(x, 'ding', 0.45));
    scene(A('c6e'), () =>
      f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140}><Text size={64}>Renting has perks too</Text></G2>
            <Frame x={400} y={500} s={pop(f, mv)} w={460} h={440} label="Move easily"><Truck y={60} s={0.9} /></Frame>
            <Frame x={960} y={500} s={pop(f, rf)} w={460} h={440} label="No roof bills"><House y={110} s={0.3} /><XMark s={0.2} y={-20} /></Frame>
            <Frame x={1520} y={500} s={pop(f, iv)} w={460} h={440} label="Invest the rest"><LineChart t={1} pts={[1, 2, 2.4, 3.5, 4.1, 5]} w={300} h={200} y={-20} /></Frame>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={170}><Text size={70}>It depends on...</Text></G2>
            {['How long you\'ll stay', 'Prices where you live', 'Your interest rate'].map((b, i) => <Row key={i} x={430} y={360 + i * 170} s={pop(f, [lng, pr, ir][i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1060} />)}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 ============
  {
    const ex = w('c7a', 'extra');
    const tw = w('c7b', 'two');
    const sv = w('c7c', 'seven');
    const on = w('c7c', 'one');
    q(ex, 'coin', 0.5);
    q(tw, 'pop', 0.6);
    q(sv, 'flip', 0.5);
    q(on, 'cash', 0.7);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={150} s={pop(f, ex)}><Text size={60}>Extra dollars early = less interest</Text></G2>
          <Card x={480} y={440} s={pop(f, tw)} top="EXTRA / MONTH" big="+$200" color={C.blue} w={520} />
          <Calendar x={1060} y={450} s={pop(f, sv - 4)} top="LOAN LENGTH" year={f >= sv ? '~23 yrs' : '30 yrs'} flip={0} />
          <Card x={1560} y={440} s={pop(f, on)} top="INTEREST SAVED" big="$117,000" color={C.green} w={560} />
          <Dave f={f} x={1060} y={900} s={0.8} keys={[{at: 0, pose: 'idle', expr: 'happy'}, {at: on, pose: 'celebrate', expr: 'grin'}]} />
          <SourceTag f={f} at={on + 6} text="Amortization: $300,000 at 7.03%, +$200/month" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pw = w('c7d', 'power');
    q(pw, 'ding', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={330} s={pop(f, A('c7d') + 2)}><Text size={110} color={C.blue}>$200 / month</Text></G2>
          <G2 x={960} y={470} s={pop(f, A('c7d') + 12)}><Text size={80}>↓</Text></G2>
          <G2 x={960} y={620} s={pop(f, A('c7d') + 22)}><Text size={130} color={C.green} stroke={C.ink} sw={10}>$117,000 saved</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fy = w('c7e', 'fifteen');
    const hg = w('c7e', 'higher');
    const tt = w('c7e', 'two');
    q(fy, 'pop', 0.6);
    q(hg, 'pop', 0.5);
    q(tt, 'stamp', 0.6);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={300} y1={820} x2={1620} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Text x={620} y={150} size={50}>30-year</Text>
          <Text x={1300} y={150} size={50}>15-year</Text>
          <Bar x={520} y={820} h={ease(f, fy - 4, fy + 10, 0, 2002 / 8)} color={C.blue} label="Payment" value="$2,002" w={180} />
          <Bar x={720} y={820} h={ease(f, fy, fy + 14, 0, 420)} color={C.red} label="Interest" value="$420k" w={180} />
          <Bar x={1200} y={820} h={ease(f, hg - 4, hg + 10, 0, 2702 / 8)} color={C.blue} label="Payment" value="$2,702" w={180} />
          <Bar x={1400} y={820} h={ease(f, hg, hg + 14, 0, 186)} color={C.red} label="Interest" value="$186k" w={180} />
          <Stamp x={1300} y={300} s={pop(f, tt, 9, 260)} r={-5} text="~$234k LESS" size={52} color={C.green} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lr = w('c7f', 'lender');
    const cp = w('c7f', 'comparing');
    const pn = w('c7g', 'penalty');
    const ask = w('c7g', 'ask');
    q(lr, 'pop', 0.5);
    q(cp, 'whoosh_s', 0.4);
    q(pn, 'pop', 0.6);
    q(ask, 'ding', 0.5);
    scene(A('c7f'), () =>
      f < A('c7g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[['BANK A', '7.3%'], ['BANK B', '7.0%'], ['BANK C', '6.8%']].map(([n, r], i) => (
              <Frame key={i} x={450 + i * 510} y={480} s={pop(f, lr + i * 4)} w={420} h={440}>
                <Bank y={120} s={0.35} label={n} />
                <Text y={-120} size={90} color={i === 2 ? C.green : C.red}>{r}</Text>
              </Frame>
            ))}
            <Magnifier x={ease(f, cp, cp + 40, 300, 1480)} y={400} s={0.9} />
            <G2 x={960} y={880} s={pop(f, cp)}><Text size={48}>Compare offers before you sign</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={450} s={pop(f, pn)} r={-3}><Paper id="e3pp" text={'Prepayment\npenalty?'} reveal={1} size={80} color={C.navy} w={560} h={340} /></G2>
            <Magnifier x={1000} y={380} s={0.8} />
            <Icon kind="check" x={1350} y={450} s={1.1 * pop(f, ask)} />
            <G2 x={1350} y={620} s={pop(f, ask)}><Text size={44}>always ask</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 ============
  const recap = ['30 yrs at 7% = pay 2x+', 'Early payments = mostly interest', 'Extra, shorter, shop around'];
  {
    const r = [bs('c8b'), bs('c8c'), bs('c8d')];
    q(A('c8a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c8a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={400} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1120} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bg = w('c8e', 'burgers');
    const nt = w('c8f', 'isnt');
    const wh = w('c8g', 'what');
    const sb = w('c8g', 'subscribe');
    q(bg, 'pop', 0.6);
    q(nt, 'stamp', 0.7);
    q(wh, 'boing', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <Burger x={620} y={480} s={1.6 * pop(f, bg)} />
            <Stamp x={620} y={720} s={pop(f, nt, 9, 260)} r={-6} text="NOT A BURGER COMPANY?" size={52} />
            <House x={1400} y={720} s={0.45 * pop(f, wh)} />
            <Icon kind="question" x={1400} y={270} s={0.8 * pop(f, wh + 4)} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
            <Cat f={f} x={1500} y={820} s={1.1} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
