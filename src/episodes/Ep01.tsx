import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT, TAIL_SEC} from '../timing';
import {ease, lin, out, pop, shake} from '../anim';
import {Stick, Key, StickProps} from '../Stick';
import {Beach, Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette} from '../fx';
import {Arrow, Bank, Bill, Bubble, Calendar, Car, Card, Clock, Coin, Desk, DocCard, Duck, G, Keyboard, Monitor, MoneyStack, Moth, Paper, Pencil, Puff, Sack, Sparkle, SourceTag, Stamp, Text, Thought, Vault, XMark} from '../props';
import {Badge, Bar, BigButton, Chalkboard, Chest, Clapper, Coupon, CreditCard, Cushion, Dial, Envelope, Frame, GoldBar, Icon, Magnifier, Mailbox, MoneyMachine, OldCar, Phone, Printer, Row, Screen$, Shield, Sign, SubButton, Bell, Sun, TornNote, Towel, Umbrella} from '../props2';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP & {shades?: boolean}> = ({shades, ...p}) => <Stick acc={shades ? ['tophat', 'shades', 'tie'] : ['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Extra: React.FC<SP & {seed: number; hat?: boolean}> = ({seed, hat, ...p}) => <Stick acc={hat ? ['tophat'] : seed % 3 === 0 ? ['cap'] : seed % 3 === 1 ? ['hair'] : []} seed={seed} {...p} />;

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const Ep01: React.FC = () => {
  const f = useCurrentFrame();
  const {bs, w, we, end, t} = useT();
  const A = (id: string) => Math.max(0, bs(id) - 6);
  const END = end + Math.round(TAIL_SEC * 30);
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

  // ================= COLD OPEN =================
  {
    const ap = w('o1', 'appeared');
    const no = w('o1', 'nothing');
    q(2, 'key', 0.5);
    q(8, 'key2', 0.5);
    q(ap + 4, 'cash', 0.75);
    q(no, 'stamp', 0.8);
    scene(0, () => (
      <Cam f={f} keys={[[0, 1.15, 960, 520], [ap + 6, 1, 960, 540], [A('o2'), 1.06, 960, 520]]}>
        <Board />
        <Svg>
          <Monitor x={960} y={760} s={1.25} value={fmt(lin(f, 4, ap + 4, 0, 10000))} valueColor={f > ap + 4 ? C.green : C.ink} flash={f > ap + 4 ? out(f, ap + 4, 10) : 0} />
          <Sparkle x={1330} y={260} t={lin(f, ap + 4, ap + 24)} />
          <Sparkle x={600} y={330} t={lin(f, ap + 8, ap + 28)} s={0.6} />
          <Stamp x={960} y={140} s={pop(f, no, 9, 260)} r={-4} text="OUT OF NOTHING" size={62} />
        </Svg>
      </Cam>
    ));
  }
  {
    const pr = w('o2', 'printer');
    const go = w('o2', 'gold');
    const va = w('o2', 'vault');
    const guy = w('o2', 'guy');
    const press = w('o2', 'pressing');
    [pr, go, va].forEach((x) => {
      q(x - 2, 'pop', 0.55);
      q(x + 8, 'thud', 0.4);
    });
    q(guy - 4, 'whoosh_s', 0.35);
    q(press + 4, 'click', 0.9);
    const fadeItems = out(f, guy - 4, 8);
    const pr2 = f < press + 2 ? 0 : f < press + 10 ? 1 : ease(f, press + 10, press + 16, 1, 0);
    scene(A('o2'), () => (
      <Cam f={f} keys={[[A('o2'), 1, 960, 540], [press, 1.12, 960, 500]]}>
        <Board />
        <Svg>
          <g opacity={fadeItems}>
            <Printer x={420} y={500} s={1.3 * pop(f, pr - 2)} />
            <XMark x={420} y={480} s={0.33 * pop(f, pr + 8, 9, 280)} />
            <GoldBar x={960} y={500} s={1.6 * pop(f, go - 2)} />
            <XMark x={960} y={480} s={0.33 * pop(f, go + 8, 9, 280)} />
            <Vault x={1500} y={480} s={0.55 * pop(f, va - 2)} open={0} />
            <XMark x={1500} y={480} s={0.33 * pop(f, va + 8, 9, 280)} />
          </g>
          <g opacity={ease(f, guy - 4, guy + 4)}>
            <Banker f={f} x={820} y={840} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.8}, {at: press - 6, pose: 'point_r', expr: 'grin'}]} />
            <rect x={1000} y={600} width={200} height={240} rx={10} fill="#C9D1DA" stroke={C.ink} strokeWidth={6} />
            <BigButton x={1100} y={590} s={1.1} press={pr2} />
          </g>
        </Svg>
      </Cam>
    ));
  }
  {
    const cz = w('o3', 'crazy');
    const pays = w('o4', 'pays');
    const dis = w('o4', 'disappear');
    const fo = w('o4', 'forever');
    q(cz, 'heart', 0.8);
    [0, 6, 12].forEach((d) => q(pays + d + 14, 'coin', 0.4));
    q(dis, 'poof', 0.75);
    q(fo, 'stamp', 0.8);
    scene(A('o3'), () => (
      <Cam f={f} keys={[[A('o3'), 1, 960, 540], [cz, 1.7, 560, 420], [bs('o4') - 2, 1.7, 560, 420], [bs('o4') + 12, 1, 960, 540]]}>
        <Board />
        <Svg>
          <Bank x={1420} y={822} s={0.75} />
          <Dave f={f} x={560} y={820} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'suspicious', look: 0}, {at: cz, expr: 'shock'}, {at: pays - 4, pose: 'present', expr: 'happy', look: 0.9}, {at: dis, pose: 'shock', expr: 'shock'}]} />
          {[0, 6, 12].map((d) => {
            const p = ease(f, pays + d, pays + d + 16);
            return f < pays + d ? null : <Coin key={d} x={680 + p * 640} y={560 - Math.sin(p * Math.PI) * 180 + p * 60} s={1.2} o={1 - Math.max(0, p - 0.9) * 10} />;
          })}
          <G x={1420} y={220} s={pop(f, pays) * (1 - ease(f, dis, dis + 6))}>
            <Text size={120} color={C.green} stroke={C.ink} sw={12}>$10,000</Text>
          </G>
          <Puff x={1420} y={220} t={lin(f, dis, dis + 24)} s={0.9} />
          <Stamp x={1420} y={220} s={pop(f, fo, 9, 260)} r={5} text="FOREVER" size={72} />
        </Svg>
      </Cam>
    ));
  }
  {
    const con = w('o5', 'conspiracy');
    const mov = w('o5', 'movie');
    const dol = w('o5', 'dollar');
    const born = w('o5', 'born');
    q(con - 4, 'crinkle', 0.6);
    q(mov, 'stamp', 0.6);
    q(dol, 'pop', 0.6);
    q(born, 'pop2', 0.6);
    const fly = ease(f, mov - 2, mov + 16);
    scene(A('o5'), () => (
      <Cam f={f} keys={[[A('o5'), 1, 960, 540], [born + 20, 1.06, 1100, 500]]}>
        <Board />
        <Svg>
          <Dave f={f} x={460} y={840} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'suspicious', look: 0.5}, {at: con, pose: 'think'}, {at: mov, pose: 'shock', expr: 'shock'}, {at: dol, pose: 'point_r', expr: 'happy', look: 0.9}]}
            tinfoil={{x: 150 * fly, y: -6 - 420 * fly, r: 150 * fly, o: pop(f, con - 4) * (1 - Math.max(0, fly - 0.7) / 0.3)}} />
          <G o={out(f, dol - 4)}>
            <Clapper x={1000} y={420} s={1.3 * pop(f, mov - 2)} r={-6} />
            <XMark x={1000} y={440} s={0.35 * pop(f, mov + 6, 9, 280)} />
          </G>
          <Phone x={1350} y={520} s={1.05 * pop(f, dol)} title="YOUR ACCOUNT" value="$2,340" />
          <G x={1350} y={190} s={1.6 * pop(f, born)} r={-5}>
            <MoneyStack n={0} label="born from a loan" lr={0} />
          </G>
        </Svg>
      </Cam>
    ));
  }
  {
    const a = w('o6', 'comes');
    const b = w('o6', 'love');
    const c = w('o6', 'break');
    [a, b, c].forEach((x) => q(x - 2, 'pop', 0.6));
    scene(A('o6'), () => (
      <Cam f={f} keys={[[A('o6'), 1, 960, 540], [A('o7'), 1.04, 960, 520]]}>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          <Frame x={380} y={500} s={pop(f, a - 2)} w={470} h={430} label="Where money comes from">
            <Bill y={-40} s={1.3} />
            <G x={110} y={-120} s={0.55}><Icon kind="question" /></G>
          </Frame>
          <Frame x={960} y={500} s={pop(f, b - 2)} w={470} h={430} label="Why banks love loans">
            <Bank y={50} s={0.42} />
            <G x={120} y={-130} s={0.6}><Icon kind="heart" /></G>
          </Frame>
          <Frame x={1540} y={500} s={pop(f, c - 2)} w={470} h={430} label="What can break it">
            <Bank y={50} s={0.42} r={-6} />
            <G x={120} y={-120} s={0.55}><Icon kind="warning" /></G>
          </Frame>
        </Svg>
      </Cam>
    ));
  }
  {
    const d = w('o7', 'duck');
    q(d - 2, 'poof', 0.5);
    q(d + 6, 'quack', 0.8);
    scene(A('o7'), () => (
      <Cam f={f} keys={[[A('o7'), 1, 960, 540], [d + 10, 1.1, 1200, 520]]}>
        <Board />
        <Svg>
          <Dave f={f} x={520} y={840} s={1.3} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.7}, {at: d, pose: 'present', expr: 'grin'}]} />
          <Puff x={1250} y={560} t={lin(f, d - 2, d + 20)} />
          <Duck f={f} x={1250} y={560} s={1.35 * pop(f, d, 9)} />
          <Sparkle x={1480} y={330} t={lin(f, d + 8, d + 26)} s={0.6} />
        </Svg>
      </Cam>
    ));
  }

  // ================= CH1: Dave needs a car =================
  {
    const dv = w('c1a', 'dave');
    const job = w('c1b', 'job');
    const apt = w('c1b', 'apartment');
    const car = w('c1b', 'car');
    const snd = we('c1c', 'this');
    const none = w('c1d', 'no');
    const allE = we('c1d', 'all');
    q(A('c1a') + 2, 'pop', 0.6);
    q(dv, 'pop2', 0.5);
    q(job - 2, 'pop', 0.5);
    q(apt - 2, 'pop', 0.5);
    q(car - 6, 'whoosh', 0.45);
    q(snd + 2, 'sputter', 0.9);
    q(allE + 4, 'cricket', 0.55);
    const carX = ease(f, car - 6, car + 12, 2300, 1380);
    const shk = f > snd + 2 && f < snd + 42 ? 1 : 0;
    scene(A('c1a'), () => (
      <Cam f={f} keys={[[A('c1a'), 1, 960, 540], [car, 1, 1000, 540], [snd, 1.1, 1200, 560], [none, 1.1, 1100, 560]]}>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={720} y={820} s={1.3 * pop(f, A('c1a') + 2, 10)} keys={[{at: 0, pose: 'wave', expr: 'grin'}, {at: job - 6, pose: 'idle', expr: 'happy', look: -0.5}, {at: car, pose: 'point_r', expr: 'happy', look: 0.9}, {at: snd, pose: 'shock', expr: 'worried', look: 0.9}, {at: none, pose: 'facepalm', expr: 'tired'}]} />
          <G x={420} y={390} s={pop(f, dv) * out(f, job - 8)} r={-6}>
            <Text size={64}>DAVE</Text>
          </G>
          <G x={360} y={250} s={0.8 * pop(f, job - 2)}><Icon kind="briefcase" /></G>
          <G x={360} y={340} s={pop(f, job - 2)}><Text size={32} color="#5B6470">normal job</Text></G>
          <G x={560} y={170} s={0.8 * pop(f, apt - 2)}><Icon kind="house" /></G>
          <G x={560} y={270} s={pop(f, apt - 2)}><Text size={32} color="#5B6470">normal apartment</Text></G>
          <OldCar f={f} x={carX} y={782} s={1.15} shake={shk} sag={ease(f, none, none + 10)} />
          {[0, 12, 24, 36].map((d) => <Puff key={d} x={1170 - (f - snd - d) * 2} y={760 - (f - snd - d) * 1.5} t={lin(f, snd + 2 + d, snd + 30 + d)} s={0.45} />)}
        </Svg>
      </Cam>
    ));
  }
  {
    const tn = w('c1e', 'ten');
    q(A('c1e') + 4, 'pop', 0.55);
    q(tn, 'stamp', 0.6);
    scene(A('c1e'), () => (
      <Cam f={f} keys={[[A('c1e'), 1, 960, 540], [A('c1f'), 1.06, 1100, 500]]}>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={520} y={820} s={1.3} keys={[{at: 0, pose: 'think', expr: 'happy', look: 0.7}]} />
          <G x={1220} y={400} s={pop(f, A('c1e') + 4)}>
            <Thought w={620} h={400} tx={-440} ty={260}>
              <Car s={1.3} y={40} />
              <Sparkle x={170} y={-70} t={((f % 40) / 40)} s={0.4} />
            </Thought>
          </G>
          <Stamp x={1400} y={610} s={pop(f, tn, 9, 260)} r={-6} text="$10,000" size={70} color={C.green} />
        </Svg>
      </Cam>
    ));
  }
  {
    const tw = w('c1g', 'twelve');
    const cp = w('c1g', 'coupon');
    q(A('c1f') + 4, 'pop', 0.55);
    q(tw, 'thud', 0.7);
    q(tw + 6, 'flutter', 0.45);
    q(cp - 2, 'pop2', 0.6);
    const mothT = lin(f, tw + 6, tw + 70);
    scene(A('c1f'), () => (
      <Cam f={f} keys={[[A('c1f'), 1, 960, 540], [tw, 1.12, 1250, 520]]}>
        <Board />
        <Svg>
          <Dave f={f} x={620} y={840} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: tw, pose: 'pockets', expr: 'sad'}, {at: cp, pose: 'shrug', expr: 'worried'}]} pockets={ease(f, tw, tw + 6)} />
          <Phone x={1250} y={510} s={1.05 * pop(f, A('c1f') + 4)} title="SAVINGS" value={f >= tw ? '$12' : '...'} color={f >= tw ? C.red : C.ink} />
          <Coupon x={1600} y={760} s={pop(f, cp - 2)} r={8} />
          <Moth f={f} x={1250 + mothT * 300 + Math.sin(mothT * 20) * 30} y={480 - mothT * 420} s={0.8} o={mothT > 0 ? 1 - Math.max(0, mothT - 0.8) * 5 : 0} />
        </Svg>
      </Cam>
    ));
  }
  {
    const s0 = A('c1h');
    const s1 = A('c1i');
    for (let k = s0 + 6; k < s1 - 4; k += 10) q(k, 'step', 0.25);
    scene(s0, () => (
      <Cam f={f} keys={[[s0, 1, 960, 540], [s1, 1.06, 1020, 520]]}>
        <Street f={f} />
        <Svg>
          <Bank x={1320} y={822} s={1.05} />
          {[0, 1, 2].map((i) => (
            <Extra key={i} seed={40 + i} f={f} x={ease(f, s0, s1, -100 - i * 160, 520 - i * 150)} y={800 - i * 10} s={0.8} walk keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}]} opacity={0.55} />
          ))}
          <Dave f={f} x={ease(f, s0, s1, 200, 800)} y={820} s={1.15} walk keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} />
        </Svg>
      </Cam>
    ));
  }
  {
    const cn = w('c1i', 'can');
    const job = w('c1j', 'job');
    const sal = w('c1j', 'salary');
    const sure = w('c1j', 'sure');
    q(cn - 2, 'pop', 0.6);
    q(job, 'ding', 0.4);
    q(sal, 'ding', 0.4);
    q(sure, 'pop', 0.6);
    q(sure + 2, 'sting', 0.45);
    scene(A('c1i'), () => (
      <Cam f={f} keys={[[A('c1i'), 1, 960, 540], [bs('c1j'), 1.04, 900, 520], [sure, 1.08, 1000, 500]]}>
        <Interior />
        <Svg>
          <Banker f={f} x={720} y={785} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: job - 4, pose: 'think', expr: 'think', look: 0.3}, {at: sure - 3, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
          <Desk x={720} y={822} w={560} />
          <Dave f={f} x={1400} y={820} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: cn - 2, pose: 'talk', talk: true}, {at: we('c1i', 'dollars'), pose: 'idle', talk: false, expr: 'worried'}, {at: sure, pose: 'celebrate', expr: 'grin'}]} />
          <Bubble x={1400} y={300} s={pop(f, cn - 2) * out(f, job - 6)} text={'Can I borrow\n$10,000?'} size={52} />
          <G x={720} y={250} s={pop(f, job - 4) * out(f, sure - 4)}>
            <rect x={-200} y={-90} width={400} height={180} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text x={-150} y={-38} size={44} anchor="start">Job</Text>
            <Text x={-150} y={40} size={44} anchor="start">Salary</Text>
            <G x={130} y={-38} s={0.45 * pop(f, job)}><Icon kind="check" /></G>
            <G x={130} y={40} s={0.45 * pop(f, sal)}><Icon kind="check" /></G>
          </G>
          <Bubble x={720} y={250} s={pop(f, sure)} text="SURE!" size={70} />
        </Svg>
      </Cam>
    ));
  }
  {
    const st = w('c1k', 'stop');
    const wh = w('c1l', 'where');
    q(st, 'click', 0.7);
    for (let k = st + 10; k < A('c2a') - 50; k += 15) q(k, 'tick', 0.5);
    q(wh - 2, 'pop', 0.6);
    const g = ease(f, st, st + 8);
    scene(A('c1k'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: `grayscale(${g}) blur(${g * 3}px)`, opacity: 1 - g * 0.35}}>
          <Interior />
          <Svg>
            <Banker f={st} x={720} y={785} s={1.25} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
            <Desk x={720} y={822} w={560} />
            <Dave f={st} x={1400} y={820} s={1.3} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
        <Svg>
          <G x={140} y={130} s={pop(f, st)}>
            <rect x={-60} y={-50} width={120} height={100} rx={18} fill={C.ink} />
            <rect x={-26} y={-28} width={16} height={56} rx={4} fill="#fff" />
            <rect x={10} y={-28} width={16} height={56} rx={4} fill="#fff" />
          </G>
          <G x={960} y={470} s={pop(f, wh - 2)}>
            <rect x={-700} y={-170} width={1400} height={340} rx={30} fill="#fff" stroke={C.ink} strokeWidth={8} />
            <Text y={-50} size={84}>WHERE DOES THE</Text>
            <Text y={50} size={84} color={C.green}>$10,000 COME FROM?</Text>
          </G>
          <Clock f={f} x={1560} y={250} s={0.8 * pop(f, wh + 10)} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ================= CH2: The big myth =================
  {
    const sf = w('c2b', 'safe');
    const gm = w('c2c', 'grandmas');
    const bb = w('c2c', 'bobs');
    const yr = w('c2c', 'your');
    const ln = w('c2d', 'lends');
    q(A('c2a') + 2, 'dream', 0.5);
    q(sf - 2, 'clank', 0.75);
    [gm, bb, yr].forEach((x) => q(x, 'pop2', 0.5));
    [0, 1, 2, 3].forEach((i) => q(ln + i * 5 + 18, 'coin', 0.45));
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Cam f={f} keys={[[A('c2a'), 1, 960, 540], [sf, 1.06, 820, 500], [ln, 1, 960, 520]]}>
          <DreamBg />
          <Svg>
            <Vault x={600} y={460} s={0.9} open={ease(f, sf - 4, sf + 22)}
              inside={
                <g>
                  <MoneyStack x={-95} y={150} n={7} />
                  <MoneyStack x={95} y={150} n={5} />
                  <MoneyStack x={0} y={40} n={4} />
                  {[-120, -40, 40, 120].map((cx) => <Coin key={cx} x={cx} y={-120} s={0.9} />)}
                </g>
              } />
            <MoneyStack x={290} y={270} n={0} label="Grandma's savings" lr={-8} s={1.5 * pop(f, gm)} />
            <MoneyStack x={930} y={220} n={0} label="Bob's paycheck" lr={6} s={1.5 * pop(f, bb)} />
            <MoneyStack x={600} y={830} n={0} label="Your money" lr={-3} s={1.5 * pop(f, yr)} />
            <Grandma f={f} x={1080} y={860} s={0.95 * pop(f, gm)} keys={[{at: 0, pose: 'point_l', expr: 'happy', look: -0.9}]} />
            <Bob f={f} x={1260} y={860} s={0.95 * pop(f, bb)} keys={[{at: 0, pose: 'point_l', expr: 'happy', look: -0.9}]} />
            {[0, 1, 2, 3].map((i) => {
              const a = ln + i * 5;
              const p = ease(f, a, a + 20);
              if (f < a) return null;
              return <Bill key={i} x={600 + (1600 + (i - 1.5) * 46 - 600) * p} y={460 + (830 - i * 16 - 460) * p - Math.sin(p * Math.PI) * 280} s={0.8} r={p < 1 ? p * 540 : (i - 1.5) * 8} />;
            })}
            <Dave f={f} x={1600} y={860} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: ln, pose: 'celebrate', expr: 'grin', look: 0}]} />
          </Svg>
        </Cam>
        <DreamFrame label="WHAT MOST PEOPLE THINK" />
      </AbsoluteFill>
    ));
  }
  {
    const sc = w('c2e', 'school');
    const np = w('c2g', 'nope');
    q(A('c2e') + 4, 'scribble', 0.5);
    q(np, 'buzz', 0.7);
    q(np, 'thud', 0.7);
    const shk = shake(f, np, 16);
    const g = ease(f, np, np + 10) * 0.75;
    scene(A('c2e'), () => (
      <AbsoluteFill style={{transform: `translate(${shk.x}px,${shk.y}px)`}}>
        <AbsoluteFill style={{filter: `grayscale(${g})`}}>
          <Board />
          <Svg>
            <Chalkboard x={960} y={430} s={pop(f, A('c2e') + 2)} lines={['BANK =', 'A BIG SAFE', 'FOR SAVINGS']} />
            <Dave f={f} x={1560} y={860} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: sc, pose: 'thumbs', expr: 'grin'}, {at: np, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
        <Svg>
          <XMark x={960} y={440} s={pop(f, np, 9, 280) * 1.05} r={-4} />
          <G x={960} y={440} s={pop(f, np + 3, 10, 260)} r={-4}>
            <Text size={150} color="#fff" stroke={C.ink} sw={18}>NOPE.</Text>
          </G>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ================= CH3: Click. Done. =================
  {
    const ty = w('c3c', 'types');
    const en = w('c3c', 'enter');
    const cl = w('c3d', 'click');
    const dn = w('c3d', 'done');
    const fr = w('c3e', 'from');
    for (let k = ty; k < en - 2; k += 4) q(k, k % 8 ? 'key' : 'key2', 0.4);
    q(en, 'click', 0.9);
    q(cl, 'click', 0.5);
    q(dn, 'cash', 0.75);
    const typed = '10,000'.slice(0, Math.floor(lin(f, ty + 2, en - 2, 0, 6.99)));
    const done = f >= en;
    scene(A('c3a'), () => (
      <Cam f={f} keys={[[A('c3a'), 1, 960, 540], [ty, 1.08, 1000, 500], [dn, 1.12, 1000, 500], [fr, 1.45, 1080, 450], [A('c3f'), 1.45, 1080, 450]]}>
        <Interior />
        <Svg>
          <Banker f={f} x={640} y={785} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.9}, {at: ty - 4, pose: 'typing'}, {at: en + 4, pose: 'present', expr: 'grin'}]} />
          <Desk x={820} y={822} w={760} />
          <Keyboard x={640} y={614} />
          <Monitor x={1080} y={560} s={0.82} value={done ? '$10,012' : '$12'} valueColor={done ? C.green : C.ink} flash={done ? out(f, en, 10) : 0} />
          {!done && typed && (
            <G x={1080} y={505} s={0.82}>
              <Text size={34} color={C.blue}>{'+ ' + typed + (f % 16 < 8 ? '|' : '')}</Text>
            </G>
          )}
          <Sparkle x={1260} y={250} t={lin(f, dn, dn + 20)} s={0.9} />
          <Sparkle x={900} y={300} t={lin(f, dn + 4, dn + 24)} s={0.6} />
          <Dave f={f} x={1640} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: dn, pose: 'shock', expr: 'shock', look: -0.4}]} />
          <G x={1080} y={180} s={pop(f, fr) * 0.8}>
            <rect x={-300} y={-50} width={600} height={100} rx={20} fill={C.ink} />
            <Text y={3} size={56} color="#fff">$12 → <tspan fill="#6EF0A8">$10,012</tspan></Text>
          </G>
        </Svg>
      </Cam>
    ));
  }
  {
    const sv = w('c3f', 'savings');
    const pc = w('c3f', 'paycheck');
    q(A('c3f') + 2, 'pop', 0.5);
    q(sv, 'ding', 0.5);
    q(pc, 'ding', 0.5);
    scene(A('c3f'), () => (
      <Board />
    ));
    S[S.length - 1].el = () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={56} color="#5B6470">Nobody lost a single dollar</Text>
          <Frame x={530} y={520} s={pop(f, A('c3f') + 2)} w={720} h={560}>
            <Grandma f={f} x={-170} y={200} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: sv, pose: 'thumbs', expr: 'grin'}]} />
            <MoneyStack x={130} y={200} n={6} label="Grandma's savings" lr={-4} s={0.9} />
            <G x={250} y={-200} s={0.7 * pop(f, sv)}><Icon kind="check" /></G>
          </Frame>
          <Frame x={1390} y={520} s={pop(f, A('c3f') + 8)} w={720} h={560}>
            <Bob f={f} x={-170} y={200} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: pc, pose: 'thumbs', expr: 'grin'}]} />
            <MoneyStack x={130} y={200} n={4} label="Bob's paycheck" lr={4} s={0.9} />
            <G x={250} y={-200} s={0.7 * pop(f, pc)}><Icon kind="check" /></G>
          </Frame>
        </Svg>
      </AbsoluteFill>
    );
  }
  {
    const fv = w('c3g', 'five');
    const cr = w('c3g', 'created');
    q(fv, 'tick', 0.6);
    q(cr, 'stamp', 0.8);
    scene(A('c3g'), () => (
      <Cam f={f} keys={[[A('c3g'), 1, 960, 540], [cr, 1.08, 960, 520]]}>
        <Board />
        <Svg>
          <Monitor x={960} y={720} s={1.2} value="$10,012" valueColor={C.green} />
          <Clock f={f} x={330} y={330} s={pop(f, fv)} />
          <G x={330} y={470} s={pop(f, fv + 4)}><Text size={40} color="#5B6470">5 seconds ago:</Text></G>
          <G x={330} y={530} s={pop(f, fv + 8)}><Text size={56} color={C.red}>didn't exist</Text></G>
          <Stamp x={1520} y={260} s={pop(f, cr, 9, 260)} r={8} text="CREATED" size={80} color={C.green} />
        </Svg>
      </Cam>
    ));
  }
  {
    const dk = w('c3h', 'duck');
    const wr = w('c3i', 'write');
    const pe = we('c3i', 'paper');
    const pf = w('c3j', 'poof');
    const nb = w('c3k', 'number');
    const ap = w('c3k', 'appeared');
    q(dk, 'quack', 0.5);
    q(wr, 'scribble', 0.6);
    q(pf - 8, 'draw', 0.3);
    q(pf, 'poof', 0.75);
    q(pf + 7, 'quack', 0.8);
    q(nb, 'pop2', 0.5);
    q(ap, 'pop2', 0.5);
    const rv = lin(f, wr, pe + 4);
    scene(A('c3h'), () => (
      <Cam f={f} keys={[[A('c3h'), 1, 960, 540], [pf, 1.05, 1000, 500], [bs('c3k'), 1, 960, 520]]}>
        <Board />
        <Svg>
          <G x={1650} y={1000 - 160 * ease(f, dk - 4, dk + 6) * out(f, wr, 8)} r={-12}><Duck f={f} s={0.7} /></G>
          <Paper id="e1p1" x={560} y={450} r={-4} s={pop(f, wr - 8)} text="1 DUCK" reveal={rv} size={120} />
          <Pencil x={560 - 170 + 340 * rv} y={450 + Math.sin(f * 1.4) * 8} o={rv > 0 && rv < 1 ? 1 : 0} />
          <Arrow d="M 830 450 Q 960 380 1110 450" t={ease(f, pf - 8, pf + 2)} />
          <Puff x={1350} y={450} t={lin(f, pf, pf + 24)} />
          <Duck f={f} x={1350} y={430} s={pop(f, pf + 3, 9)} />
          <G x={560} y={720} s={pop(f, nb)}><Stamp text="BANK TYPES A NUMBER" size={40} color={C.ink} /></G>
          <G x={1350} y={720} s={pop(f, ap)}><Stamp text="NEW MONEY APPEARS" size={40} color={C.green} /></G>
        </Svg>
      </Cam>
    ));
  }
  {
    const sc = w('c3l', 'second');
    const dv = w('c3m', 'dave');
    const dl = we('c3m', 'dollars');
    q(sc - 2, 'pop', 0.55);
    q(dv, 'scribble', 0.6);
    const rv = lin(f, dv, dl + 4);
    scene(A('c3l'), () => (
      <Cam f={f} keys={[[A('c3l'), 1, 960, 540], [dv, 1.06, 1100, 500]]}>
        <Board />
        <Svg>
          <G x={330} y={250} s={0.55}>
            <Paper id="e1p1b" x={0} y={0} r={-4} text="1 DUCK" reveal={1} size={120} />
          </G>
          <Duck f={f} x={620} y={250} s={0.5} />
          <Paper id="e1p2" x={1180} y={560} r={3} s={pop(f, sc - 2)} text={'Dave owes us\n$10,000'} reveal={rv} size={88} color={C.red} w={620} h={360} />
          <Pencil x={1180 - 220 + 440 * rv} y={560 + Math.sin(f * 1.4) * 8} o={rv > 0 && rv < 1 ? 1 : 0} />
          <Banker f={f} x={1700} y={860} s={0.9} keys={[{at: 0, pose: 'point_l', expr: 'smug', look: -0.9}]} />
        </Svg>
      </Cam>
    ));
  }
  {
    const mo = w('c3n', 'money');
    const de = w('c3n', 'debt');
    q(mo - 3, 'pop', 0.6);
    q(mo + 2, 'coin', 0.4);
    q(de - 3, 'pop', 0.6);
    q(de + 2, 'thud', 0.45);
    scene(A('c3n'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={150} size={58} color="#5B6470">Born at the same time</Text>
          <Card x={560} y={390} s={pop(f, mo - 3)} top="NEW MONEY" big="+$10,000" color={C.green} />
          <Card x={1360} y={390} s={pop(f, de - 3)} top="NEW DEBT" big="−$10,000" color={C.red} />
          <Text x={960} y={392} size={90} color="#5B6470">+</Text>
          <Dave f={f} x={960} y={880} s={0.8} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: mo - 3, pose: 'point_l', expr: 'happy', look: -0.9}, {at: de - 3, pose: 'point_r', expr: 'worried', look: 0.9}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gd = w('c3o', 'goes');
    const st = w('c3o', 'stays');
    const tr = w('c3o', 'treasure');
    const pm = w('c3p', 'promise');
    const it = w('c3p', 'interest');
    q(gd, 'whoosh_s', 0.4);
    q(st, 'paper', 0.6);
    q(tr, 'ding', 0.6);
    q(pm - 2, 'pop', 0.5);
    q(it, 'stamp', 0.6);
    q(it + 6, 'coin', 0.5);
    const billP = ease(f, gd, gd + 18);
    const noteP = ease(f, st, st + 18);
    const open = ease(f, st - 4, st + 6);
    scene(A('c3o'), () => (
      <Cam f={f} keys={[[A('c3o'), 1, 960, 540], [pm, 1.05, 1100, 500]]}>
        <Interior />
        <Svg>
          <Dave f={f} x={380} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: gd + 14, pose: 'celebrate', expr: 'grin'}]} />
          <Bill x={960 - 540 * billP} y={420 - Math.sin(billP * Math.PI) * 160 + billP * 60} s={1.1 * pop(f, A('c3o') + 2)} r={billP * 360} o={billP > 0.95 ? 0 : 1} />
          <G x={960 + 460 * noteP} y={420 + 280 * noteP} s={(1 - noteP * 0.6) * pop(f, A('c3o') + 2)} r={-4 + noteP * 20}>
            <Paper id="e1p3" text={'Dave owes\n$10,000'} reveal={1} size={60} color={C.red} w={320} h={210} />
          </G>
          <Chest x={1420} y={760} s={1.1} open={open} />
          <Sparkle x={1420} y={600} t={lin(f, tr, tr + 20)} s={0.8} />
          <Sparkle x={1540} y={660} t={lin(f, tr + 5, tr + 25)} s={0.5} />
          <G x={1080} y={300} s={pop(f, pm - 2)} r={-3}>
            <Paper id="e1p4" text={'I promise to pay\n$10,000 + extra'} reveal={ease(f, pm, pm + 30)} size={64} color={C.navy} w={600} h={250} />
          </G>
          <Stamp x={1380} y={140} s={pop(f, it, 9, 260)} r={8} text="= INTEREST" size={56} />
        </Svg>
      </Cam>
    ));
  }
  {
    const wl = w('c3q', 'wild');
    const bk = w('c3q', 'bank');
    const wv = w('c3r', 'whenever');
    const dp = we('c3r', 'deposit');
    q(wl - 4, 'crinkle', 0.6);
    q(bk - 4, 'whoosh_s', 0.45);
    q(bk, 'paper', 0.7);
    q(wv, 'marker', 0.5);
    const fly = ease(f, bk - 4, bk + 16);
    scene(A('c3q'), () => (
      <Cam f={f} keys={[[A('c3q'), 1, 960, 540], [bk, 1, 960, 540], [wv, 1.12, 1180, 470]]}>
        <Board />
        <Svg>
          <Dave f={f} x={430} y={840} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'suspicious', look: 0.4}, {at: wl - 4, pose: 'think', expr: 'suspicious'}, {at: bk - 4, pose: 'shock', expr: 'shock', look: 0.8}, {at: wv, pose: 'point_r', expr: 'happy', look: 0.9}]}
            tinfoil={{x: 150 * fly, y: -6 - 420 * fly, r: 150 * fly, o: pop(f, wl - 4) * (1 - Math.max(0, fly - 0.7) / 0.3)}} />
          <DocCard x={ease(f, bk - 6, bk + 10, 2400, 1220)} y={440} s={0.98} r={2} hl={lin(f, wv, dp + 6)} />
          <SourceTag f={f} at={bk + 10} text="Bank of England Quarterly Bulletin, 2014 Q1" />
        </Svg>
      </Cam>
    ));
  }

  // ================= CH4: Is money just numbers? =================
  {
    const cs = w('c4a', 'cash');
    q(A('c4a') + 4, 'pop', 0.5);
    q(cs, 'pop', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={700} y={840} s={1.35} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.4}]}
            handItem={<g transform="translate(0,-30)">{[-24, 0, 24].map((r) => <Bill key={r} r={r} s={0.9} y={-10} />)}</g>} />
          <Bubble x={1300} y={380} s={pop(f, cs)} text={'Real money\n= CASH!'} size={64} tail="left" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    q(A('c4b') + 2, 'whoosh_s', 0.5);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Magnifier x={ease(f, A('c4b'), A('c4c'), 300, 1500)} y={480 + Math.sin(f / 5) * 20} s={1.4} />
          <Text x={960} y={820} size={80}>Let's check.</Text>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c4c', 'twenty');
    const tr = we('c4c', 'trillion');
    const ca = w('c4d', 'cash');
    const two = w('c4d', 'two');
    const tr2 = we('c4d', 'trillion');
    q(tw, 'whoosh', 0.4);
    q(tr, 'stamp', 0.5);
    q(two, 'pop', 0.6);
    q(tr2, 'boing', 0.4);
    const h1 = ease(f, tw - 4, tr, 0, 560);
    const h2 = ease(f, two, tr2, 0, 60);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={50} color="#5B6470">Money in America</Text>
          <line x1={400} y1={800} x2={1520} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          {h1 > 1 && <Bar x={720} y={800} h={h1} color={C.green} label="Accounts + cash" value={fmt(lin(f, tw - 4, tr, 0, 23.3)).replace('$', '$') + (f >= tr ? '.3 TRILLION' : 'T')} />}
          {f >= ca - 4 && <Bar x={1200} y={800} h={Math.max(4, h2)} color={C.gold} label="Paper cash" value={f >= tr2 ? '$2.4 TRILLION' : '...'} />}
          <SourceTag f={f} at={tw + 10} text="Federal Reserve H.6 (Aug 2026) · FRED currency in circulation" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nn = w('c4e', 'nine');
    const nm = w('c4e', 'numbers');
    q(nn - 2, 'pop2', 0.5);
    Array.from({length: 9}).forEach((_, i) => q(nm - 20 + i * 3, 'key', 0.35));
    q(nm + 10, 'ding', 0.5);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {Array.from({length: 10}).map((_, i) => {
            const cx = 480 + (i % 5) * 240;
            const cy = 330 + Math.floor(i / 5) * 220;
            const tt = i < 9 ? ease(f, nm - 20 + i * 3, nm - 12 + i * 3) : 0;
            return <Screen$ key={i} x={cx} y={cy} s={1.3 * pop(f, A('c4e') + 2 + i * 2)} t={tt} />;
          })}
          <G x={960} y={790} s={pop(f, nm + 8)}>
            <Stamp text="9 OUT OF 10 = JUST NUMBERS" size={52} color={C.ink} />
          </G>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sl = w('c4f', 'salary');
    const rn = w('c4f', 'rent');
    const ap = w('c4f', 'app');
    const n0 = w('c4f', 'numbers', 0);
    const n1 = w('c4f', 'numbers', 1);
    const n2 = w('c4f', 'numbers', 2);
    [sl, rn, ap].forEach((x) => q(x - 2, 'pop', 0.55));
    [n0, n1, n2].forEach((x) => q(x, 'stamp', 0.5));
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {[
            [sl, n0, 'PAYCHECK', '+$3,200', C.green],
            [rn, n1, 'RENT', '−$1,400', C.red],
            [ap, n2, 'MY BANK', '$1,812', C.ink],
          ].map(([a, b, ti, v, col], i) => (
            <g key={i}>
              <Phone x={480 + i * 480} y={470} s={0.95 * pop(f, (a as number) - 2)} title={ti as string} value={v as string} color={col as string} />
              <Stamp x={480 + i * 480} y={560} s={pop(f, b as number, 9, 260)} r={-8} text="NUMBERS" size={50} color={C.blue} />
            </g>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ln = w('c4g', 'loan');
    q(ln - 2, 'pop', 0.6);
    q(ln + 8, 'draw', 0.4);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Paper id="e1p5" x={520} y={450} r={-3} s={pop(f, ln - 2)} text="LOAN" reveal={1} size={130} color={C.navy} w={440} h={300} />
          <Arrow d="M 780 450 L 1120 450" t={ease(f, ln + 6, ln + 16)} w={12} />
          <path d="M 1100 420 L 1140 450 L 1100 480" fill="none" stroke={C.ink} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={f > ln + 16 ? 1 : 0} />
          <Screen$ x={1400} y={450} s={2.4 * pop(f, ln + 16)} t={1} />
          <G x={960} y={760} s={pop(f, ln + 22)}><Text size={60}>Most money is born from a loan</Text></G>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ================= CH5: Why not infinite money? =================
  {
    const tr = w('c5a', 'trillion');
    const bc = w('c5a', 'beach');
    q(tr, 'cash', 0.6);
    q(bc - 4, 'whoosh', 0.5);
    const beach = f >= bc - 4;
    scene(A('c5a'), () =>
      !beach ? (
        <Cam f={f} keys={[[A('c5a'), 1, 960, 540], [tr, 1.3, 1080, 450]]}>
          <Interior />
          <Svg>
            <Banker f={f} x={640} y={785} s={1.25} keys={[{at: 0, pose: 'typing', expr: 'grin', look: 0.9}]} />
            <Desk x={820} y={822} w={760} />
            <Keyboard x={640} y={614} />
            <Monitor x={1080} y={560} s={0.82} value={f >= tr ? '$1 TRILLION' : '$...'} valueColor={C.green} title="BANKER'S ACCOUNT" />
          </Svg>
        </Cam>
      ) : (
        <AbsoluteFill>
          <Beach f={f} />
          <Svg>
            <Sun f={f} x={1650} y={170} />
            <Umbrella x={1180} y={800} s={1.1} />
            <Towel x={840} y={860} />
            <Banker f={f} x={840} y={850} s={1.2} shades keys={[{at: 0, pose: 'relax', expr: 'grin'}]} />
            <Sign x={420} y={560} s={pop(f, bc)} text="$1 TRILLION" color={C.green} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  const brakes = ['Someone must borrow', 'The rules', 'The boss of the banks'];
  {
    const th = w('c5b', 'three');
    q(th, 'pop', 0.6);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G x={960} y={170} s={pop(f, A('c5b') + 2)}><Text size={90}>THE 3 BRAKES</Text></G>
          {brakes.map((b, i) => <Row key={i} x={470} y={360 + i * 170} s={pop(f, th + i * 5)} n={i + 1} text={b} lit={0} w={980} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  const BrakeHead: React.FC<{n: number}> = ({n}) => (
    <G x={90} y={120}>
      <Badge x={60} y={0} n={n} color={C.red} />
      <Text x={125} y={2} size={46} anchor="start">{brakes[n - 1].toUpperCase()}</Text>
    </G>
  );
  {
    const lo = w('c5d', 'loan');
    const pb = w('c5d', 'back');
    const cp = w('c5e', 'cant');
    const wn = w('c5e', 'nothing');
    const ms = w('c5f', 'mostly');
    q(lo, 'scribble', 0.4);
    [0, 6, 12].forEach((d) => q(pb + d + 12, 'coin', 0.4));
    q(cp, 'whoosh_s', 0.4);
    q(wn, 'crinkle', 0.7);
    q(wn + 6, 'stamp', 0.6);
    q(ms, 'boing', 0.45);
    const shady = f >= cp - 4;
    const crumple = ease(f, wn - 4, wn + 10);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BrakeHead n={1} />
          {!shady ? (
            <Dave f={f} x={440} y={860} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: lo, pose: 'present'}]} />
          ) : (
            <Bob f={f} x={440} y={860} s={1.2} keys={[{at: 0, pose: 'shrug', expr: 'suspicious', look: 0.6}]} opacity={ease(f, cp - 4, cp + 4)} />
          )}
          <G x={960} y={470} s={(1 - crumple * 0.55) * pop(f, lo - 4)} r={crumple * 40}>
            <g style={{filter: `grayscale(${crumple})`}}>
              <Paper id="e1p6" text={shady ? 'LOAN\n(no job)' : 'LOAN'} reveal={1} size={96} color={C.navy} w={380} h={260} />
            </g>
          </G>
          {!shady && [0, 6, 12].map((d) => {
            const p = ease(f, pb + d, pb + d + 14);
            return f < pb + d ? null : <Coin key={d} x={520 + p * 900} y={600 - Math.sin(p * Math.PI) * 160} s={1.1} o={1 - Math.max(0, p - 0.9) * 10} />;
          })}
          <Stamp x={960} y={720} s={pop(f, wn + 6, 9, 260)} r={-6} text="WORTHLESS" size={64} />
          <Banker f={f} x={1500} y={860} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'smug', look: -0.8}, {at: wn, pose: 'shock', expr: 'worried'}, {at: ms, pose: 'shrug', expr: 'smug', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cu = w('c5h', 'cushion');
    const cap = w('c5h', 'capital');
    const bad = w('c5h', 'bad');
    const hit = we('c5h', 'first');
    const lends = w('c5i', 'lends');
    const bigger = w('c5i', 'bigger');
    q(A('c5g') + 2, 'pop', 0.5);
    q(cu - 2, 'pop', 0.6);
    q(bad + 10, 'whoosh_s', 0.4);
    q(hit, 'thud', 0.8);
    q(bigger, 'boing', 0.4);
    const fallY = ease(f, bad + 4, hit, -200, 560);
    const squish = f > hit && f < hit + 14 ? 1 - 0.18 * Math.sin(((f - hit) / 14) * Math.PI) : 1;
    const cw = ease(f, lends, bigger + 10, 640, 1000);
    const nLoans = Math.floor(ease(f, lends - 4, bigger + 6, 0, 6));
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BrakeHead n={2} />
          <G x={1650} y={330} s={0.8 * pop(f, A('c5g') + 2)}><Icon kind="rulebook" /></G>
          <g transform={`translate(960,${820}) scale(1,${squish}) translate(-960,-820)`}>
            <Cushion x={960} y={840} w={cw} s={pop(f, cu - 2)} label={f >= cap ? 'CAPITAL' : ''} />
          </g>
          <Bank x={960} y={770} s={0.62} />
          {Array.from({length: nLoans}).map((_, i) => <G key={i} x={560 - (i % 2) * 20} y={700 - i * 40} r={(i % 2 ? 4 : -4)}><Paper id={`e1l${i}`} text="LOAN" reveal={1} size={40} color={C.navy} w={180} h={70} /></G>)}
          {f > bad && f < hit + 40 && (
            <G x={1180} y={fallY} r={(f - bad) * 6} o={1 - Math.max(0, f - hit - 20) / 20}>
              <Paper id="e1bad" text="BAD LOAN" reveal={1} size={44} color={C.red} w={240} h={100} />
            </G>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fd = w('c5k', 'federal');
    const pr = w('c5l', 'price');
    const up = w('c5m', 'up');
    const fw = w('c5m', 'fewer');
    const dn = w('c5n', 'down');
    const mb = w('c5n', 'more');
    q(fd - 2, 'pop', 0.6);
    q(pr, 'pop', 0.6);
    q(up, 'tick', 0.7);
    q(fw, 'crinkle', 0.3);
    q(dn, 'tick', 0.7);
    q(mb + 4, 'cash', 0.5);
    const v = f < up ? 0.5 : f < dn ? ease(f, up, up + 12, 0.5, 0.92) : ease(f, dn, dn + 12, 0.92, 0.08);
    const high = f >= fw && f < dn;
    const low = f >= mb;
    scene(A('c5j'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BrakeHead n={3} />
          <Bank x={480} y={760} s={0.66 * pop(f, fd - 2)} label="FEDERAL RESERVE" />
          <Dial x={1300} y={400} s={pop(f, pr)} v={v} />
          {Array.from({length: 5}).map((_, i) => {
            const leave = high && i > 0;
            return (
              <g key={i}>
                <Extra seed={60 + i} f={f} x={1020 + i * 140} y={880} s={0.6 * pop(f, pr + 10 + i * 2)} keys={[{at: 0, pose: 'idle', expr: 'happy'}, {at: fw, pose: i > 0 ? 'shrug' : 'idle', expr: i > 0 ? 'sad' : 'neutral'}, {at: mb, pose: 'celebrate', expr: 'grin'}]} opacity={leave ? 0.3 : 1} />
                {(low || (high && i === 0) || (f >= pr + 10 && f < up)) && <Bill x={1020 + i * 140} y={620} s={0.55 * pop(f, low ? mb + i * 3 : pr + 14 + i * 2)} />}
              </g>
            );
          })}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bo = w('c5o', 'borrowers');
    const ru = w('c5o', 'rules');
    const ir = w('c5o', 'interest');
    [bo, ru, ir].forEach((x) => q(x, 'ding', 0.5));
    scene(A('c5o'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G x={960} y={170}><Text size={90}>THE 3 BRAKES</Text></G>
          {brakes.map((b, i) => <Row key={i} x={470} y={360 + i * 170} n={i + 1} text={b} lit={f >= [bo, ru, ir][i] ? 1 : 0} w={980} s={1 + 0.06 * pop(f, [bo, ru, ir][i]) * out(f, [bo, ru, ir][i] + 10)} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ================= CH6: Magic trick in reverse =================
  {
    q(A('c6a') + 4, 'dream', 0.4);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.7)'}}>
          <Board />
          <Svg>
            <Monitor x={960} y={740} s={1.2} value="$10,000" valueColor={C.green} />
            <Puff x={960} y={430} t={lin(f, A('c6a') + 30, A('c6a') + 54)} s={1.2} />
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={1} />
        <Svg>
          <G x={200} y={110}><rect x={-120} y={-32} width={240} height={64} rx={32} fill={C.ink} /><Text size={34} color="#fff" ls={4}>FLASHBACK</Text></G>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const s0 = A('c6b');
    const mo = w('c6b', 'month');
    const s1 = A('c6c');
    const flips = 6;
    const mp = lin(f, mo, s1 - 4, 0, flips - 0.01);
    const month = 1 + Math.floor(mp);
    for (let i = 1; i < flips; i++) {
      const at = Math.round(mo + ((s1 - 4 - mo) * i) / flips);
      q(at, 'flip', 0.45);
      q(at + 8, 'coin', 0.35);
    }
    q(s0 + 4, 'ding', 0.5);
    scene(s0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Bank x={1600} y={822} s={0.6} />
          <Car x={880} y={790} s={1.2} />
          <Sparkle x={1000} y={620} t={lin(f, s0 + 4, s0 + 24)} s={0.7} />
          <Dave f={f} x={520} y={820} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: mo, pose: 'present', expr: 'happy', look: 0.9}]} />
          <Calendar x={220} y={220} s={0.8 * pop(f, mo - 4)} top="MONTH" year={month} flip={mp > 0.02 && mp - Math.floor(mp) < 0.18 ? 1 - (mp - Math.floor(mp)) / 0.18 : 0} />
          {f > mo && (() => {
            const fr = mp - Math.floor(mp);
            const p = ease(fr, 0.1, 0.8);
            return <Coin x={620 + p * 900} y={560 - Math.sin(p * Math.PI) * 200 + p * 120} s={1.1} o={p > 0.02 && p < 0.98 ? 1 : 0} />;
          })()}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pb = w('c6c', 'pays');
    const dsp = w('c6c', 'disappears');
    const del = w('c6d', 'deleted');
    const tn = w('c6e', 'torn');
    const vn = w('c6e', 'vanishes');
    const pf = w('c6f', 'poof');
    const gb = w('c6f', 'goodbye');
    q(del, 'click', 0.8);
    q(tn, 'rip', 0.85);
    q(vn, 'poof', 0.6);
    q(pf, 'poof', 0.8);
    q(gb, 'quack', 0.5);
    const bal = f < pb ? 10000 : f < del ? lin(f, pb, dsp + 10, 10000, 3000) : ease(f, del, del + 8, 3000, 0);
    scene(A('c6c'), () => (
      <Cam f={f} keys={[[A('c6c'), 1, 960, 540], [pf - 10, 1.08, 1300, 520]]}>
        <Board />
        <Svg>
          <Monitor x={560} y={700} s={0.95} title="DAVE OWES" value={fmt(bal)} valueColor={bal < 1 ? C.green : C.red} flash={f > del ? out(f, del, 10) : 0} />
          <TornNote x={1340} y={300} s={0.62 * pop(f, A('c6c') + 4)} t={ease(f, tn, tn + 24)} text={'Dave owes us\n$10,000'} />
          <G o={1 - ease(f, vn, vn + 6)}>
            <MoneyStack x={1180} y={800} n={6} s={0.8} />
          </G>
          <Puff x={1180} y={740} t={lin(f, vn, vn + 22)} s={0.6} />
          <Duck f={f} x={1500} y={640} s={0.9 * (1 - ease(f, pf, pf + 6))} />
          <Puff x={1500} y={640} t={lin(f, pf, pf + 26)} s={0.9} />
          <G x={1500} y={640} s={pop(f, gb)} r={-6}><Text size={60} color="#5B6470" font="Caveat">bye!</Text></G>
        </Svg>
      </Cam>
    ));
  }
  {
    const tt = w('c6h', 'ten');
    const tw = w('c6h', 'two');
    const ex = w('c6i', 'extra');
    const pr = w('c6i', 'profit');
    const cr = w('c6j', 'created');
    const ea = w('c6j', 'earned');
    q(tt, 'pop', 0.5);
    q(tw, 'pop', 0.5);
    q(ex, 'poof', 0.6);
    q(pr - 6, 'whoosh_s', 0.4);
    q(pr, 'cash', 0.6);
    q(cr, 'pop', 0.5);
    q(ea, 'pop', 0.5);
    const into = ease(f, pr - 8, pr + 6);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G o={1 - ease(f, ex, ex + 6)}>
            <MoneyStack x={560} y={780} n={10} label="$10,000 paid back" lr={-4} s={pop(f, tt)} />
          </G>
          <Puff x={560} y={640} t={lin(f, ex, ex + 22)} s={0.9} />
          <MoneyStack x={960 + 440 * into} y={780 - 60 * into} n={3} label="+$2,000 interest" lr={4} s={pop(f, tw) * (1 - 0.5 * into)} />
          <Chest x={1420} y={780} s={1} open={ease(f, pr - 12, pr - 4) * out(f, pr + 8, 8)} />
          <G x={1420} y={560} s={pop(f, pr)}><Text size={44} color={C.gold} stroke={C.ink} sw={8}>BANK PROFIT</Text></G>
          <Card x={560} y={300} s={pop(f, cr)} top="CREATED (CLICK)" big="$10,000" color="#9AA5B1" w={520} />
          <Card x={1300} y={300} s={pop(f, ea)} top="EARNED (REAL)" big="$2,000" color={C.gold} w={520} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lv = w('c6k', 'love');
    const mc = w('c6k', 'machine');
    const mb = w('c6l', 'mailbox');
    const pa = w('c6l', 'preapproved');
    q(lv, 'pop', 0.6);
    q(mc, 'cash', 0.5);
    for (let i = 0; i < 8; i++) q(mb + i * 5 + 10, 'mail', 0.35);
    q(pa, 'stamp', 0.7);
    scene(A('c6k'), () =>
      f < mb - 6 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <MoneyMachine f={f} x={820} y={520} s={1.3 * pop(f, A('c6k') + 2)} />
            <Banker f={f} x={1500} y={860} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            <G x={1500} y={300} s={0.8 * pop(f, lv)}><Icon kind="heart" /></G>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Mailbox x={1300} y={700} s={1.1} flag={ease(f, mb, mb + 8)} />
            {Array.from({length: 12}).map((_, i) => {
              const a = mb + i * 5;
              const p = ease(f, a, a + 16);
              if (f < a) return null;
              const tx = 700 + ((i * 97) % 400) - 200;
              const ty = 800 - (i % 4) * 26;
              return <Envelope key={i} x={1300 + (tx - 1300) * p} y={-100 + (ty + 100) * p} s={0.7} r={p * 360 + i * 20} />;
            })}
            <Dave f={f} x={700} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: mb + 10, pose: 'shock', expr: 'shock'}]} />
            <Envelope x={1150} y={300} s={2 * pop(f, pa)} r={-6} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ================= CH7: Bank run =================
  {
    const br = w('c7a', 'break');
    q(br, 'heart', 0.9);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bank x={960} y={820} s={0.85} r={Math.sin(f / 3) * ease(f, br, br + 10) * 1.2} />
          <G x={1500} y={300} s={pop(f, br)}><Icon kind="warning" /></G>
        </Svg>
        <AbsoluteFill style={{background: 'rgba(20,20,30,0.28)'}} />
      </AbsoluteFill>
    ));
  }
  {
    const ev = w('c7b', 'everybody');
    q(ev, 'crowd', 0.6);
    q(ev + 12, 'crowd', 0.5);
    scene(A('c7b'), () => (
      <Cam f={f} keys={[[A('c7b'), 1, 960, 540], [A('c7c'), 1.08, 1100, 520]]}>
        <Street f={f} />
        <Svg>
          <Bank x={1400} y={822} s={0.95} />
          {Array.from({length: 12}).map((_, i) => {
            const st = ev - 10 + i * 3;
            const x = ease(f, st, st + 40, -200 - (i % 4) * 90, 520 + (i % 6) * 110);
            return <Extra key={i} seed={80 + i} f={f} x={x} y={800 + (i % 3) * 18} s={0.75} walk={f < st + 40} keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.9}]} />;
          })}
        </Svg>
      </Cam>
    ));
  }
  {
    q(A('c7c') + 4, 'pop', 0.5);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <line x1={900} y1={800} x2={1760} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={1120} y={800} h={ease(f, A('c7c') + 4, A('c7c') + 24, 0, 520)} color={C.blue} label="Money in accounts" value="$$$$$$" />
          <Bar x={1560} y={800} h={ease(f, A('c7c') + 20, A('c7c') + 34, 0, 50)} color={C.gold} label="Cash in the vault" value="$" />
          <Banker f={f} x={480} y={820} s={1.2} sweat keys={[{at: 0, pose: 'panic', expr: 'worried'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const brn = w('c7d', 'run');
    const mv = w('c7d', 'movies');
    q(brn, 'stamp', 0.8);
    q(mv - 4, 'dream', 0.3);
    const film = ease(f, mv - 4, mv + 4);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: `grayscale(${film}) sepia(${film * 0.5})`}}>
          <Street f={f} />
          <Svg>
            <Bank x={1300} y={822} s={0.95} />
            {Array.from({length: 10}).map((_, i) => (
              <Extra key={i} seed={100 + i} hat={film > 0.5} f={f} x={420 + (i % 5) * 120 + Math.sin(f / 4 + i) * 10} y={800 + Math.floor(i / 5) * 24} s={0.72} keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.9}]} />
            ))}
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={film} />
        <Svg>
          <Stamp x={960} y={260} s={pop(f, brn, 9, 260)} r={-5} text="BANK RUN" size={110} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ma = w('c7e', 'march');
    const sv = w('c7e', 'silicon');
    const bd = w('c7e', 'bad');
    q(ma, 'pop', 0.5);
    q(sv, 'pop2', 0.5);
    q(bd, 'heart', 0.6);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Bank x={1180} y={822} s={1.05 * pop(f, sv - 2)} label="SILICON VALLEY BANK" />
          <Calendar x={260} y={260} s={0.85 * pop(f, ma)} top="MARCH" year={2023} flip={0} />
          <G x={260} y={470} s={pop(f, ma + 6)}><Text size={40} color="#5B6470">California</Text></G>
          <Icon kind="warning" x={1650} y={260} s={0.8 * pop(f, bd)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sc = w('c7f', 'scared');
    const od = w('c7f', 'one');
    const fo = w('c7f', 'forty');
    const bl = we('c7f', 'dollars');
    q(sc, 'crowd', 0.6);
    q(fo, 'whoosh', 0.5);
    for (let k = fo; k < bl; k += 5) q(k, 'coin', 0.3);
    q(bl, 'stamp', 0.7);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Clock f={f * 6} x={330} y={330} s={pop(f, od - 4)} />
          <G x={330} y={470} s={pop(f, od)}><Text size={48}>ONE DAY</Text></G>
          <G x={1100} y={420} s={pop(f, fo - 2)}>
            <Text size={170} color={C.red} stroke={C.ink} sw={14}>{'$' + Math.round(lin(f, fo, bl, 0, 42)) + ' BILLION'}</Text>
          </G>
          <G x={1100} y={560} s={pop(f, bl)}><Text size={44} color="#5B6470">withdrawn on March 9, 2023</Text></G>
          {Array.from({length: 7}).map((_, i) => {
            const st = sc + i * 6;
            const x = ease(f, st, st + 60, 1900, 300 + i * 40);
            return <Extra key={i} seed={120 + i} f={f} x={x} y={880} s={0.55} walk flip keys={[{at: 0, pose: 'carry', expr: 'worried'}]} handItem={<MoneyStack n={3} s={0.5} y={-10} />} />;
          })}
          <SourceTag f={f} at={fo + 10} text="Federal Reserve OIG, SVB Material Loss Review (2023)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sh = w('c7g', 'shut');
    q(sh, 'stamp', 0.8);
    q(sh + 10, 'trombone', 0.6);
    scene(A('c7g'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: `grayscale(${ease(f, sh, sh + 20) * 0.6})`}}>
          <Street f={f} />
          <Svg>
            <Bank x={960} y={822} s={1.05} label="SILICON VALLEY BANK" />
            <Sign x={960} y={620} s={pop(f, sh, 9, 260)} text="CLOSED" />
          </Svg>
        </AbsoluteFill>
      </AbsoluteFill>
    ));
  }
  {
    q(A('c7h') + 4, 'heart', 0.5);
    scene(A('c7h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={960} y={1300} s={2.6} sweat keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ins = w('c7i', 'insured');
    const tw = w('c7i', 'two');
    const br = w('c7j', 'breathe');
    q(ins, 'pop', 0.7);
    q(ins + 4, 'ding', 0.5);
    q(tw, 'stamp', 0.5);
    q(br, 'chime', 0.5);
    scene(A('c7i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={520} y={860} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: br - 6, pose: 'celebrate', expr: 'grin', look: 0}]} />
          <MoneyStack x={900} y={820} n={6} label="Dave's money" lr={-4} />
          <Shield x={1350} y={470} s={1.3 * pop(f, ins)} />
          <SourceTag f={f} at={ins + 10} text="FDIC standard deposit insurance: $250,000" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ================= CH8: Recap =================
  const recap = ['Loans CREATE new money', 'Paying back DELETES it', '3 brakes: borrow, rules, rates'];
  {
    const r = [bs('c8b'), bs('c8c'), bs('c8d')];
    q(A('c8a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G x={960} y={170} s={pop(f, A('c8a') + 2)}><Text size={100}>RECAP</Text></G>
          {recap.map((b, i) => <Row key={i} x={430} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1060} />)}
          <G x={1500} y={880} s={0.8 * pop(f, r[1] + 10) * (f < r[2] ? 1 : 0)}><Text size={40} color={C.gold}>(interest = bank profit)</Text></G>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sm = w('c8e', 'smiles');
    const wd = w('c8e', 'wed');
    const lend = we('c8e', 'money');
    const nw = w('c8f', 'now');
    q(sm, 'ding', 0.6);
    q(wd - 3, 'pop', 0.55);
    q(nw - 2, 'whoosh_s', 0.3);
    q(we('c8f', 'why') + 2, 'sting', 0.5);
    scene(A('c8e'), () => (
      <Cam f={f} keys={[[A('c8e'), 1, 960, 540], [nw - 2, 1.04, 900, 520], [nw + 14, 1.42, 1420, 470]]}>
        <Interior />
        <Svg>
          <Banker f={f} x={700} y={790} s={1.25} keys={[{at: 0, pose: 'idle', expr: 'smug', look: 0.6}, {at: sm - 4, pose: 'present', expr: 'grin'}, {at: wd - 2, talk: true}, {at: lend, talk: false, expr: 'grin'}]} />
          <Desk x={700} y={822} w={560} />
          <Sparkle x={742} y={440} t={lin(f, sm, sm + 18)} s={0.55} color="#fff" />
          <Bubble x={720} y={200} s={pop(f, wd - 3) * out(f, nw + 4)} text={"We'd LOVE to lend\nyou money!"} size={48} />
          <Dave f={f} x={1420} y={820} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: nw - 2, pose: 'hips', expr: 'smug', look: 0}]} />
        </Svg>
      </Cam>
    ));
  }
  {
    const cc = w('c8h', 'credit');
    const ot = w('c8h', 'time');
    const ce = w('c8h', 'cent');
    const hw = w('c8i', 'how');
    q(cc - 2, 'pop', 0.6);
    q(ot, 'ding', 0.6);
    q(ce, 'thud', 0.4);
    q(hw, 'boing', 0.5);
    for (let k = bs('c8i'); k < hw; k += 6) q(k, 'coin', 0.3);
    scene(A('c8g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={52} color="#5B6470">NEXT VIDEO</Text>
          <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: ot, pose: 'thumbs', expr: 'grin'}, {at: hw, pose: 'shrug', expr: 'worried'}]} />
          <CreditCard x={900} y={440} s={1.3 * pop(f, cc - 2)} r={-6} />
          <Stamp x={900} y={680} s={pop(f, ot, 9, 260)} r={-4} text="PAID ON TIME ✓" size={48} color={C.green} />
          <Banker f={f} x={1500} y={860} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'smug', look: -0.8}, {at: bs('c8i'), pose: 'celebrate', expr: 'grin'}]} />
          <Sack x={1500} y={480} s={pop(f, bs('c8i')) * 0.9} coins={Math.floor(lin(f, bs('c8i'), hw, 0, 10))} />
          <G x={1500} y={230} s={pop(f, hw)}><Icon kind="question" /></G>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('c8j', 'subscribe');
    const al = w('c8j', 'alone');
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(al + 6, 'quack', 0.6);
    scene(A('c8j'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={1060} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
          <Bell x={1500} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={480} y={860} s={1.25} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
          <Duck f={f} x={1500} y={800} s={0.7 * pop(f, al)} />
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
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
