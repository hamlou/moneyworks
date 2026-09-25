import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette} from '../fx';
import {Arrow, Bank, Bill, Bubble, Calendar, Card, Clock, Coin, Monitor, MoneyStack, Sack, Sparkle, SourceTag, Stamp, Text, Duck, Puff, XMark} from '../props';
import {Badge, Bar, CreditCard, Frame, Icon, Magnifier, Phone, Row, SubButton, Bell} from '../props2';
import {Atm, Bathtub, Bush, Coffee, Fridge, HospitalBill, Person, PieSplit, Plane, Plate, PriceTag, Raccoon, Shop, SourceCard, SplitBar, Terminal, Ticket, TollBooth} from '../props3';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Rich: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle']} seed={53} {...p} />;

const Halo: React.FC<{x: number; y: number; o: number; drop?: number}> = ({x, y, o, drop = 0}) =>
  o <= 0 ? null : (
    <g transform={`translate(${x},${y + drop * 500}) rotate(${drop * 60})`} opacity={o}>
      <ellipse cx={0} cy={0} rx={56} ry={16} fill="none" stroke={C.gold} strokeWidth={12} />
      <ellipse cx={0} cy={0} rx={56} ry={16} fill="none" stroke="#FFF3A6" strokeWidth={4} />
    </g>
  );

export const Ep02: React.FC = () => {
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
    const pf = w('o1', 'perfect');
    const fu = w('o2', 'full');
    const ti = w('o2', 'time');
    const ce = w('o2', 'cent');
    const cb = w('o3', 'cashback');
    const bt = w('o3', 'beating');
    const hn = w('o4', 'not');
    q(2, 'pop', 0.6);
    q(pf, 'ding', 0.7);
    [fu, ti, ce].forEach((x) => q(x, 'pop2', 0.55));
    q(cb, 'cash', 0.55);
    for (let k = cb + 6; k < hn - 6; k += 7) q(k, 'coin', 0.25);
    q(hn, 'buzz', 0.7);
    q(hn + 2, 'thud', 0.6);
    const shk = shake(f, hn, 14);
    scene(0, () => (
      <AbsoluteFill style={{transform: `translate(${shk.x}px,${shk.y}px)`}}>
        <AbsoluteFill style={{filter: `grayscale(${ease(f, hn, hn + 8) * 0.8})`}}>
          <Board />
          <Svg>
            <Dave f={f} x={600} y={860} s={1.35 * pop(f, 2, 10)} keys={[{at: 0, pose: 'hold', expr: 'smug', look: 0.3}, {at: cb, pose: 'celebrate', expr: 'grin'}, {at: bt, pose: 'hips', expr: 'smug', look: 0}, {at: hn, pose: 'shock', expr: 'shock'}]}
              handItem={f < cb ? <CreditCard y={-40} s={0.35} /> : undefined} />
            <Halo x={600} y={350} o={pop(f, pf)} drop={ease(f, hn, hn + 16)} />
            <Frame x={1330} y={420} w={640} h={380} s={pop(f, fu - 4) * out(f, cb - 4)}>
              {['Pays the full bill', 'Always on time', '$0 interest, ever'].map((l, i) => (
                <g key={i}>
                  <Text x={-270} y={-110 + i * 110} size={46} anchor="start">{l}</Text>
                  <Icon kind="check" x={240} y={-110 + i * 110} s={0.5 * pop(f, [fu, ti, ce][i])} />
                </g>
              ))}
            </Frame>
            {f > cb && Array.from({length: 10}).map((_, i) => {
              const st = cb + i * 5;
              const p = lin(f, st, st + 24);
              return p <= 0 || p >= 1 ? null : <Coin key={i} x={420 + ((i * 131) % 360)} y={-60 + p * 820} s={0.8} r={p * 360} />;
            })}
            <Stamp x={1330} y={300} s={pop(f, cb, 9, 260) * out(f, hn - 4)} r={6} text="2% CASHBACK" size={64} color={C.green} />
          </Svg>
        </AbsoluteFill>
        <Svg>
          <G2 x={1300} y={480} s={pop(f, hn, 9, 280)} r={-6}>
            <Text size={200} color={C.red} stroke={C.ink} sw={18}>HE'S NOT.</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sw = w('o5', 'swipes');
    const taps = [bs('o5') + 6, bs('o5') + 30, sw - 4];
    taps.forEach((x) => {
      q(x, 'key2', 0.6);
      q(x + 14, 'coin', 0.45);
    });
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={430} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          <Terminal x={760} y={560} s={1.1} ok={taps.some((x) => f > x && f < x + 12) ? 0.5 : taps.some((x) => f >= x + 12 && f < x + 24) ? 1 : 0} />
          <Bank x={1450} y={820} s={0.8} />
          {taps.map((x, i) => {
            const p = ease(f, x + 4, x + 22);
            return f < x + 4 || p >= 1 ? null : <Coin key={i} x={800 + p * 650} y={450 - Math.sin(p * Math.PI) * 220 + p * 60} s={1.1} />;
          })}
          <G2 x={1450} y={250} s={pop(f, taps[1] + 20)}><Text size={60} color={C.green}>+ ¢ + ¢ + ¢</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pa = w('o6', 'paying');
    const nv = w('o6', 'never');
    q(pa, 'pop', 0.5);
    q(pa + 16, 'coin', 0.5);
    q(nv, 'boing', 0.4);
    const p = ease(f, pa + 8, pa + 30);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Grandma f={f} x={480} y={820} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.5}, {at: pa + 20, pose: 'shock', expr: 'shock', look: 0.9}]} handItem={f < pa + 8 ? <Bill y={-20} s={0.6} /> : undefined} />
          {f > pa + 8 && p < 1 && <Coin x={520 + p * 900} y={560 - Math.sin(p * Math.PI) * 260} s={1.1} r={p * 400} />}
          <Dave f={f} x={1450} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: pa + 28, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={1450} y={280} s={pop(f, pa + 28)}><Stamp text="CASHBACK" size={50} color={C.green} /></G2>
          <G2 x={480} y={280} s={pop(f, nv)}><Bubble text={'I pay\nwith cash!'} size={48} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const iv = w('o7', 'invisible');
    const rw = w('o7', 'rewards');
    const tr = w('o7', 'trap');
    [iv, rw, tr].forEach((x) => q(x - 2, 'pop', 0.6));
    scene(A('o7'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          <Frame x={380} y={500} s={pop(f, iv - 2)} w={470} h={430} label="The invisible fee">
            <PriceTag y={-40} s={1.2} text="$5.00" />
            <Magnifier x={110} y={-110} s={0.45} />
          </Frame>
          <Frame x={960} y={500} s={pop(f, rw - 2)} w={470} h={430} label="Who pays for rewards">
            <Coin y={-50} s={3} />
            <Icon kind="question" x={130} y={-120} s={0.5} />
          </Frame>
          <Frame x={1540} y={500} s={pop(f, tr - 2)} w={470} h={430} label="The 22% trap">
            <Text y={-40} size={140} color={C.red} stroke={C.ink} sw={10}>22%</Text>
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Magic plastic ============
  {
    const rl = w('c1a', 'really');
    const lm = w('c1b', 'looks');
    const nt = w('c1b', 'not');
    q(A('c1a') + 4, 'pop', 0.6);
    q(lm, 'pop2', 0.5);
    q(nt, 'stamp', 0.7);
    scene(A('c1a'), () => (
      <Cam f={f} keys={[[A('c1a'), 1.05, 960, 520], [nt, 1, 960, 540]]}>
        <Board />
        <Svg>
          <CreditCard x={f < lm ? 960 : 620} y={440} s={1.6 * pop(f, A('c1a') + 4)} r={Math.sin(f / 20) * 4} />
          <Sparkle x={1180} y={250} t={lin(f, rl, rl + 20)} s={0.6} />
          <G2 x={960} y={440} s={pop(f, lm)}><Text size={120}>{f >= nt ? '≠' : '='}</Text></G2>
          <G2 x={1300} y={440} s={pop(f, lm)}><MoneyStack n={6} s={1.3} y={80} /></G2>
          <Stamp x={960} y={760} s={pop(f, nt, 9, 260)} r={-4} text="NOT YOUR MONEY" size={64} />
        </Svg>
      </Cam>
    ));
  }
  {
    const sw = w('c1c', 'swipes');
    const rm = w('c1c', 'remember');
    const cl = w('c1c', 'click');
    q(sw, 'key2', 0.6);
    q(sw + 10, 'pop2', 0.5);
    q(rm, 'dream', 0.35);
    q(cl, 'click', 0.8);
    q(cl + 8, 'quack', 0.5);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={400} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          <Terminal x={720} y={560} s={1} ok={f > sw ? 1 : 0} />
          <G2 x={760} y={260} s={pop(f, sw + 10)} r={-5}><Stamp text="TINY LOAN" size={46} color={C.navy} /></G2>
          <G2 x={1400} y={480} s={pop(f, rm)}>
            <rect x={-360} y={-260} width={720} height={520} rx={24} fill="#F7EEDC" stroke={C.ink} strokeWidth={6} strokeDasharray="22 14" />
            <Text y={-212} size={30} color="#8C7A5B" ls={4}>LAST VIDEO</Text>
            <Monitor x={-110} y={160} s={0.6} value={f > cl ? '$10,000' : '$0'} valueColor={C.green} />
            <Duck f={f} x={200} y={80} s={0.6 * pop(f, cl + 6)} />
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bl = w('c1d', 'bill');
    const tw = w('c1d', 'twenty');
    const ze = w('c1e', 'zero');
    const fr = w('c1e', 'free');
    q(bl, 'mail', 0.5);
    q(tw, 'flip', 0.5);
    q(ze, 'stamp', 0.6);
    q(fr, 'ding', 0.5);
    const days = Math.max(1, Math.round(lin(f, tw - 20, we('c1d', 'one') + 4, 1, 21)));
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={500} y={430} s={1.3 * pop(f, bl)} top="DAYS TO PAY" year={days} flip={0} />
          <Card x={1300} y={380} s={pop(f, ze)} top="INTEREST" big="$0" color={C.green} w={480} />
          <G2 x={1300} y={560} s={pop(f, fr)}><Text size={52}>= a free loan for a month</Text></G2>
          <Dave f={f} x={1300} y={900} s={0.7} keys={[{at: 0, pose: 'idle', expr: 'happy'}, {at: fr, pose: 'celebrate', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wh = w('c1f', 'where');
    q(wh, 'pop', 0.6);
    for (let k = wh + 10; k < A('c2a') - 60; k += 15) q(k, 'tick', 0.45);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Banker f={f} x={1450} y={820} s={1.2} keys={[{at: 0, pose: 'think', expr: 'smug', look: -0.6}]} />
          <G2 x={760} y={430} s={pop(f, wh)}>
            <rect x={-560} y={-150} width={1120} height={300} rx={30} fill="#fff" stroke={C.ink} strokeWidth={8} />
            <Text y={-45} size={70}>If the loan is free...</Text>
            <Text y={50} size={70} color={C.green}>where's the bank's money?</Text>
          </G2>
          <Clock f={f} x={1500} y={220} s={0.6 * pop(f, wh + 10)} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 Invisible toll ============
  {
    const cf = w('c2b', 'coffee');
    const tp = w('c2b', 'taps');
    const bp = w('c2b', 'beep');
    const pd = w('c2c', 'pays');
    const dn = w('c2c', 'doesnt');
    q(cf, 'pop', 0.5);
    q(bp, 'key2', 0.8);
    q(bp + 4, 'ding', 0.4);
    q(dn, 'boing', 0.4);
    scene(A('c2a'), () => (
      <Cam f={f} keys={[[A('c2a'), 1, 960, 540], [tp, 1.1, 960, 520], [pd, 1.1, 960, 520]]}>
        <Street f={f} />
        <Svg>
          <Shop x={1150} y={822} s={1} />
          <Owner f={f} x={1300} y={822} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: dn, pose: 'shrug', expr: 'worried', look: 0}]} />
          <rect x={1000} y={640} width={440} height={180} rx={10} fill="#C98F5E" stroke={C.ink} strokeWidth={6} />
          <Coffee f={f} x={1120} y={560} s={0.8 * pop(f, cf)} />
          <Terminal x={1330} y={560} s={0.6} ok={f > bp ? 1 : f > tp ? 0.5 : 0} />
          <Dave f={f} x={620} y={822} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: tp - 4, pose: 'point_r'}]} />
          <G2 x={620} y={330} s={pop(f, pd)}><Bubble text="$5.00" size={60} tail="down" /></G2>
          <G2 x={1300} y={330} s={pop(f, dn)}><Bubble text="$5.00?" size={60} tail="down" /></G2>
        </Svg>
      </Cam>
    ));
  }
  {
    const tb = w('c2d', 'toll');
    const rc = w('c2d', 'raccoon');
    const bt = w('c2e', 'bite');
    const sf = w('c2e', 'swipe');
    q(tb, 'pop', 0.6);
    q(rc, 'boing', 0.6);
    q(rc + 4, 'sting', 0.5);
    const passes = [bs('c2e'), bs('c2e') + 36, bs('c2e') + 72];
    passes.forEach((x) => {
      q(x + 22, 'coin', 0.5);
      q(x + 24, 'crinkle', 0.2);
    });
    q(sf, 'stamp', 0.6);
    scene(A('c2d'), () => (
      <Cam f={f} keys={[[A('c2d'), 1, 960, 540], [rc, 1.25, 960, 480], [bs('c2e'), 1, 960, 540]]}>
        <Board />
        <Svg>
          <rect x={-300} y={700} width={2600} height={140} fill="#C9C3B6" />
          {Array.from({length: 12}).map((_, i) => <rect key={i} x={i * 200 - 100} y={762} width={100} height={14} rx={6} fill="#fff" />)}
          <Dave f={f} x={180} y={690} s={0.8} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
          <G2 x={1780} y={700} s={0.7}><Shop s={0.7} /></G2>
          <TollBooth x={960} y={700} s={pop(f, tb)} barUp={0} label={f >= sf ? 'SWIPE FEE' : 'TOLL'} />
          <Raccoon f={f} x={960} y={520 + 40 * (1 - pop(f, rc, 9))} s={0.75 * pop(f, rc, 9)} mood={f > passes[0] ? 'greedy' : 'happy'}
            grab={passes.reduce((g, x) => Math.max(g, f > x + 16 && f < x + 30 ? Math.sin(((f - x - 16) / 14) * Math.PI) : 0), 0)} holdCoin={f > passes[0] + 22} />
          {passes.map((x, i) => {
            const p = lin(f, x, x + 60);
            if (p <= 0 || p >= 1) return null;
            const bx = 300 + p * 1400;
            return (
              <g key={i}>
                <Bill x={bx} y={650 + Math.sin(f / 3) * 4} s={0.9} />
                {bx > 960 && <Text x={bx} y={590} size={30} color={C.red}>−2¢</Text>}
              </g>
            );
          })}
          <G2 x={960} y={130} s={pop(f, bt)}><Text size={60}>the "bite" = <tspan fill={C.red}>SWIPE FEE</tspan></Text></G2>
        </Svg>
      </Cam>
    ));
  }
  {
    const tp = w('c2f', 'two');
    const av = w('c2f', 'average');
    const ey = we('c2g', 'cents');
    const tw = w('c2h', 'twelve');
    q(tp, 'pop', 0.6);
    q(av, 'pop', 0.6);
    q(bs('c2g'), 'key', 0.5);
    q(ey, 'ding', 0.5);
    q(tw, 'boing', 0.4);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={500} y={300} s={pop(f, tp)}><Text size={150} color={C.red} stroke={C.ink} sw={12}>~2%</Text></G2>
          <G2 x={500} y={440} s={pop(f, av)}><Text size={44} color="#5B6470">Visa/Mastercard avg: 2.36%</Text></G2>
          <G2 x={1320} y={400} s={pop(f, bs('c2g'))}>
            <rect x={-300} y={-220} width={600} height={440} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-150} size={36} color="#5B6470" ls={4}>RECEIPT</Text>
            <Text x={-240} y={-60} size={52} anchor="start">Dave pays</Text>
            <Text x={240} y={-60} size={52} anchor="end">$5.00</Text>
            <Text x={-240} y={20} size={52} anchor="start" color={C.red}>Swipe fee</Text>
            <Text x={240} y={20} size={52} anchor="end" color={C.red}>−$0.12</Text>
            <line x1={-240} y1={70} x2={240} y2={70} stroke={C.ink} strokeWidth={4} strokeDasharray="12 8" />
            <Text x={-240} y={130} size={56} anchor="start">Shop keeps</Text>
            <Text x={240} y={130} size={56} anchor="end" color={C.green}>{f >= ey - 10 ? '$4.88' : '...'}</Text>
          </G2>
          <Dave f={f} x={500} y={880} s={0.85 * pop(f, tw)} keys={[{at: 0, pose: 'shrug', expr: 'smug'}]} />
          <G2 x={740} y={640} s={pop(f, tw + 4)}><Bubble text="12 cents? lol" size={40} tail="left" /></G2>
          <SourceTag f={f} at={av + 6} text="Nilson Report via Merchants Payments Coalition (2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mu = w('c2i', 'multiply');
    for (let i = 0; i < 12; i++) q(mu + i * 3, 'key', 0.25);
    scene(A('c2i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {Array.from({length: 40}).map((_, i) => {
            const x = 190 + (i % 10) * 170;
            const y = 220 + Math.floor(i / 10) * 170;
            const on = (f + i * 7) % 30 < 8;
            return <Terminal key={i} x={x} y={y} s={0.42 * pop(f, mu + (i % 13) * 2)} ok={on ? 1 : 0} />;
          })}
          <G2 x={960} y={900} s={pop(f, mu + 20)}><Text size={60}>× every swipe in America</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tf = w('c2j', 'twenty');
    const al = w('c2j', 'almost');
    const fe = we('c2j', 'fees');
    const hh = w('c2k', 'household');
    const bn = w('c2l', 'bank');
    q(al, 'whoosh', 0.5);
    q(fe, 'stamp', 0.7);
    q(hh, 'pop', 0.6);
    q(bn, 'pop', 0.5);
    const pie = f >= A('c2l');
    scene(A('c2j'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {!pie ? (
            <g>
              <G2 x={960} y={260} s={pop(f, tf)}><Text size={56} color="#5B6470">Card fees paid by US businesses, 2025</Text></G2>
              <G2 x={960} y={430} s={pop(f, al)}><Text size={180} color={C.red} stroke={C.ink} sw={14}>{'$' + Math.round(lin(f, al, fe, 0, 198)) + ' BILLION'}</Text></G2>
              <Icon kind="house" x={700} y={730} s={1.1 * pop(f, hh)} />
              <G2 x={1150} y={720} s={pop(f, hh + 4)}><PriceTag text="≈$1,500/yr" color={C.yellow} s={1.3} /></G2>
              <SourceTag f={f} at={al + 10} text="Nilson Report (2025) · ~$1,500 = $198B ÷ ~132M US households" />
            </g>
          ) : (
            <g>
              <PieSplit x={760} y={520} s={1.4} t={ease(f, A('c2l') + 4, A('c2l') + 24)} />
              <Raccoon f={f} x={1450} y={620} s={0.9} mood="greedy" holdCoin grab={0.4} />
              <G2 x={960} y={130} s={pop(f, bn)}><Text size={60}>Biggest bite → the bank that issued the card</Text></G2>
            </g>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 Who pays for cashback ============
  {
    const st = w('c3a', 'stupid');
    const rs = w('c3c', 'raises');
    const ev = w('c3c', 'everyone');
    q(st, 'pop2', 0.4);
    q(rs, 'stamp', 0.7);
    q(ev, 'pop', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Owner f={f} x={620} y={840} s={1.3} keys={[{at: 0, pose: 'think', expr: 'smug', look: 0.6}, {at: rs, pose: 'point_r', expr: 'grin', look: 0.9}]} />
          <G2 x={620} y={260} s={pop(f, bs('c3b'))}><Bubble text={'Losing 12¢\nper coffee?'} size={44} /></G2>
          <Coffee f={f} x={1250} y={620} s={1.4} />
          <PriceTag x={1270} y={330} s={1.3} r={-6} text={f >= rs ? '$5.15' : '$5.00'} color={f >= rs ? C.red : C.yellow} />
          <G2 x={1270} y={180} s={pop(f, ev)}><Text size={52}>for EVERYONE</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cs = w('c3d', 'cash');
    const db = w('c3d', 'debit');
    const hd = w('c3e', 'hidden');
    q(cs, 'pop', 0.5);
    q(db, 'pop', 0.5);
    q(hd, 'whoosh', 0.4);
    const tags = [
      [380, 300, 'Bread'], [760, 260, 'Shoes'], [1160, 300, 'Gas'], [1540, 260, 'Phone'],
      [560, 520, 'Rent'], [960, 560, 'Pizza'], [1360, 520, 'TV'],
    ] as [number, number, string][];
    scene(A('c3d'), () =>
      f < hd - 4 ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Grandma f={f} x={520} y={820} s={1.2 * pop(f, cs - 4)} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.5}]} handItem={<Bill y={-20} s={0.6} />} />
            <G2 x={520} y={260} s={pop(f, cs)}><PriceTag text="$5.15" color={C.red} /></G2>
            <Bob f={f} x={1380} y={820} s={1.2 * pop(f, db - 4)} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.5}]} handItem={<CreditCard y={-40} s={0.3} />} />
            <G2 x={1380} y={260} s={pop(f, db)}><PriceTag text="$5.15" color={C.red} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {tags.map(([x, y, l], i) => (
              <g key={i}>
                <PriceTag x={x} y={y} s={pop(f, hd + i * 3)} r={(i % 2 ? 6 : -6)} text={l} />
                <G2 x={x + 90} y={y - 50} s={pop(f, hd + 12 + i * 3)}><Text size={30} color={C.red} stroke="#fff" sw={6}>+fee</Text></G2>
              </g>
            ))}
            <G2 x={960} y={800} s={pop(f, hd + 30)}><Text size={60}>The fee hides inside every price</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pl = w('c3f', 'pile');
    const ev = w('c3g', 'everyone');
    const fv = w('c3g', 'favorite');
    q(pl, 'cash', 0.4);
    q(ev, 'coin', 0.5);
    q(ev + 10, 'coin', 0.5);
    q(ev + 20, 'coin', 0.5);
    q(fv, 'ding', 0.6);
    const walk = ease(f, ev + 24, fv - 10);
    scene(A('c3f'), () =>
      f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <MoneyStack x={700} y={760} n={12} s={1.4 * pop(f, A('c3f') + 2)} label="ALL THE SWIPE FEES" lr={-3} />
            <Arrow d="M 900 500 Q 1100 380 1300 500" t={ease(f, pl, pl + 14)} w={10} />
            <Dave f={f} x={1450} y={860} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'grin'}]} handItem={<Coin y={-20} s={1} />} />
            <G2 x={1450} y={330} s={pop(f, pl + 10)}><Stamp text="2% CASHBACK" size={46} color={C.green} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Grandma f={f} x={300} y={820} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: ev, expr: 'shock'}]} />
            <Bob f={f} x={520} y={820} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: ev + 10, expr: 'shock'}]} />
            <Owner f={f} x={740} y={820} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: ev + 20, expr: 'shock'}]} />
            <Raccoon f={f} x={lin(f, A('c3g'), ev + 24, 150, 800) + walk * 660} y={760} s={0.7} mood={f > fv ? 'wink' : 'greedy'} grab={f < ev + 24 ? Math.abs(Math.sin(f / 4)) : f > fv - 6 ? 1 : 0} holdCoin={f > ev} />
            <Dave f={f} x={1620} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: fv, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={1360} y={330} s={pop(f, fv - 4)}><Bubble text={"You're my\nfavorite customer!"} size={42} tail="left" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const rh = w('c3h', 'reverse');
    const ot = w('c3i', 'other');
    q(rh, 'stamp', 0.7);
    q(rh + 10, 'sting', 0.4);
    for (let k = ot; k < A('c3j') - 10; k += 8) q(k, 'coin', 0.3);
    scene(A('c3h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Raccoon f={f} x={960} y={480} s={1.3} mood="sneaky" hood={f >= rh - 4} />
          <Stamp x={960} y={150} s={pop(f, rh, 9, 260)} r={-4} text="REVERSE ROBIN HOOD" size={62} />
          <Grandma f={f} x={300} y={880} s={0.9 * pop(f, ot - 6)} keys={[{at: 0, pose: 'shrug', expr: 'sad'}]} />
          <Bob f={f} x={460} y={880} s={0.9 * pop(f, ot - 4)} keys={[{at: 0, pose: 'shrug', expr: 'sad'}]} />
          <Rich f={f} x={1500} y={880} s={0.9 * pop(f, ot - 2)} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          <Rich f={f} x={1660} y={880} s={0.9 * pop(f, ot)} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
          {f > ot && Array.from({length: 4}).map((_, i) => {
            const p = ((f - ot + i * 10) % 40) / 40;
            return <Coin key={i} x={420 + p * 1150} y={700 - Math.sin(p * Math.PI) * 180} s={0.9} />;
          })}
          <G2 x={380} y={560} s={pop(f, ot)}><Text size={40} color="#5B6470">poorer</Text></G2>
          <G2 x={1580} y={560} s={pop(f, ot)}><Text size={40} color="#5B6470">richer</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fb = w('c3j', 'fifteen');
    q(A('c3j') + 4, 'paper', 0.6);
    q(fb, 'stamp', 0.6);
    scene(A('c3j'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={ease(f, A('c3j'), A('c3j') + 14, 2400, 1100)} y={450} org="FEDERAL RESERVE" sub="FINANCE & ECONOMICS DISCUSSION SERIES · 2023" title={['Who Pays For Your Rewards?', 'Redistribution in the Credit Card Market']} stat={f >= fb ? '$15 BILLION' : '...'} statLabel="moved each year, poorer → richer" />
          <Raccoon f={f} x={300} y={640} s={0.9} mood="sneaky" hood />
          <SourceTag f={f} at={fb + 6} text="Agarwal, Presbitero, Silva & Wix (2023)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 22% trap ============
  {
    const ap = w('c4a', 'appetizer');
    const mc = w('c4a', 'main');
    q(ap, 'pop', 0.5);
    q(mc, 'stamp', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Plate x={520} y={560} s={pop(f, ap)} label="Appetizer: swipe fees">
            <Coin y={0} s={1.2} />
          </Plate>
          <Plate x={1300} y={560} s={pop(f, mc)} big label="Main course: INTEREST">
            <Text y={-30} size={150} color={C.red} stroke={C.ink} sw={10}>%</Text>
          </Plate>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bb = w('c4b', 'bob');
    const fr = w('c4c', 'fridge');
    const cp = w('c4c', 'cant');
    const lt = w('c4c', 'little');
    q(bb, 'pop2', 0.5);
    q(fr + 4, 'sputter', 0.6);
    q(cp, 'heart', 0.5);
    q(lt, 'coin', 0.4);
    const brk = ease(f, fr + 4, fr + 12);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Bob f={f} x={620} y={820} s={1.3} keys={[{at: 0, pose: 'wave', expr: 'grin'}, {at: fr, pose: 'shock', expr: 'shock', look: 0.8}, {at: cp, pose: 'facepalm', expr: 'worried'}]} />
          <G2 x={320} y={400} s={pop(f, bb) * out(f, fr - 4)} r={-6}><Text size={64}>BOB</Text></G2>
          <Fridge x={1050} y={822} s={1} broken={brk} f={f} />
          <Phone x={1500} y={500} s={0.95 * pop(f, cp - 4)} title="CARD BILL" value={f >= lt ? 'Paid $100' : '$5,000'} color={f >= lt ? C.red : C.ink} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mt = w('c4d', 'meter');
    const tw = w('c4e', 'twenty');
    q(mt, 'click', 0.6);
    for (let k = mt + 4; k < tw; k += 5) q(k, 'tick', 0.3);
    q(tw, 'stamp', 0.8);
    const interest = lin(f, mt, A('c4f'), 0, 91.67);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Monitor x={560} y={760} s={1.1} title="INTEREST METER" value={'$' + interest.toFixed(2)} valueColor={C.red} />
          <G2 x={1330} y={420} s={pop(f, tw)}><Text size={260} color={C.red} stroke={C.ink} sw={16}>22%</Text></G2>
          <G2 x={1330} y={600} s={pop(f, tw + 6)}><Text size={44} color="#5B6470">per year, if you carry a balance</Text></G2>
          <SourceTag f={f} at={tw + 8} text="Federal Reserve G.19: accounts assessed interest ≈ 22% (Q2 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c4f', 'car');
    const mg = w('c4f', 'mortgage');
    const cc = w('c4f', 'credit');
    q(cl, 'pop', 0.5);
    q(mg, 'pop', 0.5);
    q(cc, 'whoosh', 0.5);
    q(we('c4f', 'twenty') + 4, 'stamp', 0.5);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={300} y1={820} x2={1620} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={560} y={820} h={ease(f, cl, cl + 12, 0, 7.5 * 24)} color={C.blue} label="Car loan" value="~7-8%" />
          <Bar x={960} y={820} h={ease(f, mg, mg + 12, 0, 6.3 * 24)} color={C.green} label="Mortgage" value="~6%" />
          <Bar x={1360} y={820} h={ease(f, cc, cc + 18, 0, 22 * 24)} color={C.red} label="Credit card" value="22%" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('c4g', 'five');
    const hn = w('c4g', 'hundred');
    const gs = w('c4h', 'guess');
    q(fv, 'pop', 0.6);
    q(hn, 'pop', 0.6);
    for (let k = gs; k < A('c4i') - 4; k += 8) q(k, 'tick', 0.5);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Card x={560} y={360} s={pop(f, fv)} top="BOB OWES" big="$5,000" color={C.red} />
          <Card x={1360} y={360} s={pop(f, hn)} top="PAYS / MONTH" big="$100" color={C.green} />
          <Bob f={f} x={960} y={880} s={0.85} keys={[{at: 0, pose: 'idle', expr: 'worried'}, {at: gs, pose: 'think', expr: 'think'}]} />
          <Clock f={f * 5} x={960} y={330} s={0.8 * pop(f, gs)} />
          <G2 x={960} y={620} s={pop(f, gs + 4)}><Text size={64}>How long to pay it off?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const el = w('c4i', 'eleven');
    const ei = w('c4i', 'eight');
    const fd = w('c4i', 'debt');
    q(bs('c4i'), 'flip', 0.4);
    for (let i = 1; i <= 11; i++) q(bs('c4i') + i * 4, 'flip', 0.3);
    q(el, 'stamp', 0.7);
    q(ei, 'thud', 0.6);
    q(fd + 6, 'trombone', 0.45);
    const yrs = Math.min(11, Math.floor(lin(f, bs('c4i'), bs('c4i') + 44, 0, 11.99)));
    scene(A('c4i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={450} y={420} s={1.2} top="YEARS" year={yrs + (f >= el ? '+' : '')} flip={0} />
          <G2 x={1260} y={330} s={pop(f, ei)}><Text size={60} color="#5B6470">Interest paid:</Text></G2>
          <G2 x={1260} y={460} s={pop(f, ei + 4)}><Text size={150} color={C.red} stroke={C.ink} sw={12}>$8,700</Text></G2>
          <G2 x={1260} y={600} s={pop(f, fd)}><Text size={52}>on a $5,000 debt</Text></G2>
          <Bob f={f} x={450} y={900} s={0.7} sweat keys={[{at: 0, pose: 'idle', expr: 'tired'}, {at: ei, pose: 'shock', expr: 'shock'}]} />
          <SourceTag f={f} at={ei + 6} text="Illustration: $5,000 at 22% APR, $100/month (standard amortization)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const al = w('c4j', 'almost');
    const eg = w('c4j', 'eight');
    q(al, 'whoosh_s', 0.4);
    q(eg, 'pop', 0.6);
    scene(A('c4j'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={220} s={pop(f, A('c4j') + 2)}><Text size={64}>Bob's first $100 payment</Text></G2>
          <SplitBar x={960} y={480} s={1} a={0.9167} la="$92 → interest" lb="$8" t={ease(f, al, eg)} />
          <G2 x={1560} y={680} s={pop(f, eg)}><Text size={44} color={C.green}>only $8 reduces the debt</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sp = w('c4k', 'spoon');
    const tp = w('c4k', 'tap');
    q(sp, 'boing', 0.4);
    q(tp, 'dream', 0.25);
    scene(A('c4k'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Bathtub x={960} y={720} s={1.3} level={0.55 + 0.05 * Math.sin(f / 30)} f={f} spoon={pop(f, sp - 4)} />
          <Bob f={f} x={560} y={860} s={1} sweat keys={[{at: 0, pose: 'present', expr: 'tired', look: 0.8}]} />
          <G2 x={1400} y={200} s={pop(f, tp)}><Text size={48} color={C.red}>tap = 22% interest</Text></G2>
          <G2 x={500} y={200} s={pop(f, sp)}><Text size={48} color={C.green}>spoon = $8/month</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hf = w('c4l', 'half');
    const on = w('c4l', 'one');
    const cr = we('c4l', 'cards');
    q(hf, 'pop', 0.5);
    q(on, 'whoosh', 0.5);
    q(cr, 'stamp', 0.7);
    scene(A('c4l'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {Array.from({length: 10}).map((_, i) => <Person key={i} x={300 + i * 100} y={400} s={0.9 * pop(f, bs('c4l') + i * 2)} c={i < 5 && f >= hf ? C.red : '#B8B0A0'} />)}
          <G2 x={800} y={560} s={pop(f, hf)}><Text size={50}>About half carried a balance</Text></G2>
          <G2 x={1500} y={380} s={pop(f, on)}><Text size={110} color={C.red} stroke={C.ink} sw={10}>{'$' + lin(f, on, cr, 0, 1.26).toFixed(2) + 'T'}</Text></G2>
          <G2 x={1500} y={490} s={pop(f, cr)}><Text size={40} color="#5B6470">US credit card debt</Text></G2>
          <SourceTag f={f} at={on + 6} text="NY Fed Household Debt Q2 2026 · Fed SHED 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 Sneaky extras ============
  {
    const lt = w('c5b', 'late');
    const ft = w('c5b', 'fourteen');
    const an = w('c5c', 'annual');
    const fo = w('c5d', 'foreign');
    const ca = w('c5d', 'cash');
    const pk = w('c5e', 'pockets');
    [lt, an, fo, ca].forEach((x) => q(x, 'pop', 0.55));
    q(ft, 'stamp', 0.6);
    for (let k = pk; k < pk + 30; k += 6) q(k, 'coin', 0.35);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Raccoon f={f} x={960} y={520} s={1.1} mood="greedy" grab={Math.abs(Math.sin(f / 6)) * (f > pk ? 1 : 0.3)} holdCoin />
          <Frame x={330} y={300} s={pop(f, lt)} w={420} h={260}>
            <Calendar x={-110} y={0} s={0.55} top="DUE" year="LATE" flip={0} />
            <Text x={80} y={-30} size={40} color={C.red}>LATE FEE</Text>
            <Text x={80} y={30} size={30} color="#5B6470">{f >= ft ? '$14B+ / year' : ''}</Text>
          </Frame>
          <Frame x={1590} y={300} s={pop(f, an)} w={420} h={260}>
            <CreditCard x={-80} y={-10} s={0.45} />
            <Text x={100} y={-20} size={36} color={C.red}>ANNUAL</Text>
            <Text x={100} y={24} size={36} color={C.red}>FEE</Text>
          </Frame>
          <Frame x={330} y={720} s={pop(f, fo)} w={420} h={260}>
            <Plane x={-60} y={-10} s={0.6} />
            <Text x={90} y={70} size={34} color={C.red}>FOREIGN FEE</Text>
          </Frame>
          <Frame x={1590} y={720} s={pop(f, ca)} w={420} h={260}>
            <Atm x={-110} y={100} s={0.5} />
            <Text x={70} y={-30} size={32} color={C.red}>CASH ADVANCE</Text>
            <Text x={70} y={14} size={28} color={C.red}>+ interest day 1</Text>
          </Frame>
          <SourceTag f={f} at={ft + 6} text="CFPB (2024): >$14 billion in credit card late fees per year" until={an} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 Why they love Dave ============
  {
    const wn = w('c6a', 'want');
    q(wn, 'ding', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={1300} y={820} s={1.25} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.5}]} />
          <Halo x={1300} y={335} o={1} />
          <Banker f={f} x={620} y={820} s={1.25} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
          <Icon kind="heart" x={620} y={260} s={0.6 * pop(f, wn)} />
          <Icon kind="heart" x={720} y={200} s={0.4 * pop(f, wn + 5)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const r1 = w('c6b', 'one');
    const sp = w('c6b', 'spends');
    const taps = [r1 + 20, r1 + 34, r1 + 48, sp, sp + 12, sp + 24];
    taps.forEach((x) => {
      q(x, 'key2', 0.45);
      q(x + 8, 'coin', 0.35);
    });
    const earned = taps.filter((x) => f > x + 8).length;
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={120} y={120}><Badge n={1} color={C.red} /></G2>
          <Text x={200} y={122} size={48} anchor="start">Every swipe pays</Text>
          <Dave f={f} x={420} y={860} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          <Terminal x={740} y={560} s={1} ok={taps.some((x) => f > x && f < x + 10) ? 1 : 0} />
          <Raccoon f={f} x={1150} y={620} s={0.9} mood="greedy" grab={taps.some((x) => f > x + 2 && f < x + 14) ? 1 : 0} holdCoin />
          <Sack x={1550} y={680} s={1.1} coins={earned} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tk = w('c6d', 'tickets');
    const cr = w('c6d', 'credit');
    const ca = w('c6d', 'cash');
    const hr = w('c6e', 'hurt');
    q(tk, 'pop', 0.5);
    q(ca, 'pop', 0.5);
    q(cr, 'cash', 0.5);
    q(hr, 'boing', 0.4);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={120} y={120}><Badge n={2} color={C.red} /></G2>
          <Text x={200} y={122} size={48} anchor="start">Cards make people spend more</Text>
          <Ticket x={960} y={330} s={1.3 * pop(f, tk)} />
          <Bob f={f} x={560} y={880} s={1} keys={[{at: 0, pose: 'hold', expr: 'worried'}]} handItem={<Bill y={-20} s={0.5} />} />
          <G2 x={560} y={500} s={pop(f, ca)}><Bubble text="I bid $X" size={48} /></G2>
          <Dave f={f} x={1360} y={880} s={1} keys={[{at: 0, pose: 'hold', expr: 'grin'}]} handItem={<CreditCard y={-40} s={0.3} />} />
          <G2 x={1360} y={500} s={pop(f, cr)}><Bubble text="I bid $2X!" size={48} /></G2>
          <G2 x={960} y={700} s={pop(f, hr)}><Text size={46} color="#5B6470">plastic doesn't hurt the same</Text></G2>
          <SourceTag f={f} at={cr + 6} text="Prelec & Simester (2001), Marketing Letters" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lh = w('c6f', 'life');
    const jb = w('c6g', 'job');
    const hp = w('c6g', 'hospital');
    const fr = w('c6g', 'fridge');
    const bc = w('c6g', 'becomes');
    const wt = w('c6h', 'waiting');
    [jb, hp, fr].forEach((x) => q(x, 'thud', 0.5));
    q(bc, 'poof', 0.6);
    q(wt, 'heart', 0.5);
    const morph = f >= bc + 4;
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={120} y={120}><Badge n={3} color={C.red} /></G2>
          <Text x={200} y={122} size={48} anchor="start">Life happens</Text>
          <G2 x={420} y={360} s={pop(f, jb)}>
            <Icon kind="briefcase" />
            <XMark s={0.18} />
          </G2>
          <HospitalBill x={760} y={380} s={0.8 * pop(f, hp)} r={-5} />
          <Fridge x={1060} y={520} s={0.5 * pop(f, fr)} broken={1} f={f} />
          {!morph ? (
            <Dave f={f} x={760} y={840} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy'}, {at: jb, pose: 'shock', expr: 'worried'}]} />
          ) : (
            <Bob f={f} x={760} y={840} s={1.1} sweat keys={[{at: 0, pose: 'shrug', expr: 'tired'}]} />
          )}
          <Puff x={760} y={600} t={lin(f, bc, bc + 20)} s={0.8} />
          <Raccoon f={f} x={1560} y={740 - 70 * ease(f, wt - 10, wt + 4)} s={0.7} mood="sneaky" />
          <Bush x={1560} y={800} s={1.2} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6.5 How not to get bitten ============
  const habits = ['Pay the FULL balance', 'Turn on autopay', 'Spend like it\'s cash', 'Highest rate first', 'Read the fees'];
  {
    const hs = [bs('t2'), bs('t4'), bs('t5'), bs('t6'), bs('t7')];
    q(A('t1') + 4, 'pop', 0.6);
    hs.forEach((x) => q(x, 'ding', 0.5));
    const mb = w('t3', 'favorite');
    q(mb, 'boing', 0.5);
    const cur = hs.filter((x) => f >= x).length;
    scene(A('t1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={pop(f, A('t1') + 4)}><Text size={72}>5 HABITS</Text></G2>
          {habits.map((h, i) => (
            <Row key={i} x={120} y={260 + i * 130} s={0.8 * pop(f, hs[i] - 4)} n={i + 1} text={h} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={900} />
          ))}
          {cur <= 1 && f >= bs('t2') && (
            <g>
              <Phone x={1500} y={480} s={0.95} title="CARD BILL" value="$1,240" />
              <G2 x={1500} y={760} s={pop(f, bs('t2') + 20)}><rect x={-190} y={-40} width={380} height={80} rx={40} fill={C.green} stroke={C.ink} strokeWidth={5} /><Text size={36} color="#fff">PAY FULL ✓</Text></G2>
              <G2 x={1500} y={870} s={pop(f, bs('t2') + 30)}><Text size={30} color="#9C9383">pay minimum ($35)</Text></G2>
              <Raccoon f={f} x={1760} y={880} s={0.45 * pop(f, mb - 4)} mood="greedy" grab={0.6} />
            </g>
          )}
          {cur === 2 && (
            <g>
              <Calendar x={1500} y={420} s={1} top="AUTOPAY" year="ON" flip={0} />
              <Icon kind="check" x={1640} y={560} s={0.6 * pop(f, hs[1] + 10)} />
            </g>
          )}
          {cur === 3 && (
            <g>
              <CreditCard x={1420} y={420} s={0.8} r={-6} />
              <Text x={1560} y={600} size={100}>=</Text>
              <G2 x={1620} y={760}><MoneyStack n={4} /></G2>
            </g>
          )}
          {cur === 4 && (
            <g>
              <Bathtub x={1500} y={700} s={0.7} level={0.5} f={f} spoon={1} />
              <G2 x={1500} y={280} s={pop(f, hs[3] + 20)}><Text size={44} color={C.red}>22% card first!</Text></G2>
            </g>
          )}
          {cur === 5 && (
            <g>
              <Magnifier x={1440} y={430} s={1} />
              <PriceTag x={1560} y={640} s={1} text="FEES" color={C.red} />
            </g>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tl = w('t8', 'toll');
    const mc = w('t8', 'main');
    q(tl, 'coin', 0.5);
    q(mc, 'buzz', 0.4);
    scene(A('t8'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Raccoon f={f} x={760} y={560} s={1.2} mood={f >= mc ? 'sneaky' : 'happy'} holdCoin />
          <Plate x={1360} y={600} big s={pop(f, mc - 4)} label="Main course: DENIED">
            <Text y={-30} size={150} color={C.red} stroke={C.ink} sw={10}>%</Text>
            <XMark y={0} s={0.35 * pop(f, mc, 9, 280)} />
          </Plate>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 Recap ============
  const recap = ['Every swipe = ~2% hidden toll', 'Everyone pays for rewards', 'Real money: 22% + fees'];
  {
    const r = [bs('c7b'), bs('c7c'), bs('c7d')];
    q(A('c7a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c7a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={430} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1060} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cf = w('c7e', 'carefully');
    const cl = w('c7e', 'carelessly');
    q(cf, 'ding', 0.5);
    q(cl, 'boing', 0.5);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Frame x={560} y={470} s={pop(f, cf - 2)} w={640} h={520} label="Careful = convenient">
            <CreditCard y={-40} s={0.9} />
            <Icon kind="check" x={210} y={-180} s={0.6} />
          </Frame>
          <Frame x={1360} y={470} s={pop(f, cl - 2)} w={640} h={520} label="Careless = expensive raccoon">
            <Raccoon f={f} y={-20} s={0.9} mood="greedy" holdCoin grab={0.5} />
          </Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hs = w('c7f', 'house');
    const th = w('c7g', 'three');
    const db = w('c7g', 'double');
    q(hs, 'pop', 0.6);
    q(th, 'pop', 0.5);
    q(db, 'stamp', 0.8);
    q(db + 8, 'heart', 0.6);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={960} y={120} s={pop(f, hs)}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
          <Icon kind="house" x={700} y={560} s={2.6 * pop(f, hs)} />
          <G2 x={1260} y={420} s={pop(f, th)}><PriceTag text="$300,000" s={1.3} /></G2>
          <Stamp x={1260} y={620} s={pop(f, db, 9, 260)} r={-8} text="PAY $700,000?!" size={64} />
          <Dave f={f} x={1700} y={820} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: db, pose: 'shock', expr: 'shock'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('c7h', 'subscribe');
    const rc = w('c7h', 'raccoon');
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(rc + 4, 'boing', 0.5);
    scene(A('c7h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
          <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
          <Raccoon f={f} x={1560} y={900 - 150 * ease(f, rc, rc + 8)} s={0.7} mood="wink" />
          <Bush x={1560} y={940} s={1.1} />
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

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );
