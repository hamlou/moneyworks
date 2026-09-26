import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Beach, Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, MoneyStack, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, GoldBar, Icon, Row, Sun, SubButton, Bell, CreditCard} from '../props2';
import {PriceTag, Raccoon, Person} from '../props3';
import {LineChart} from '../props4';
import {Boxes, Factory, Lemon, Share, Stand, Thermo, Ticker} from '../props7';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Buffett: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={79} {...p} />;
const Suit: React.FC<SP & {seed: number}> = ({seed, ...p}) => <Stick acc={['tie', 'shades']} seed={seed} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

export const Ep09: React.FC = () => {
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
    const ls = w('o2', 'lose');
    const bl = w('o2', 'billions');
    const jp = w('o3', 'jump');
    const hp = w('o3', 'happened');
    const bt = w('o4', 'bet');
    const bf = w('o4', 'boring');
    const ch = w('o5', 'chaos');
    const lm = w('o5', 'lemonade');
    q(2, 'pop', 0.5);
    q(ls, 'thud', 0.5);
    q(bl, 'cash', 0.6);
    q(jp, 'boing', 0.6);
    q(bt, 'pop', 0.6);
    q(bf, 'ding', 0.5);
    q(ch, 'crowd', 0.4);
    q(lm, 'pop', 0.6);
    scene(0, () =>
      f < bs('o3') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={150} s={pop(f, 2)}><Text size={70}>This makes no sense...</Text></G2>
            <Frame x={560} y={500} s={pop(f, ls - 4)} w={620} h={360}><Text y={-60} size={40} color="#5B6470">profit</Text><Text y={40} size={110} color={C.red}>−$$$</Text></Frame>
            <Frame x={1360} y={500} s={pop(f, bl - 4)} w={620} h={360}><Text y={-60} size={40} color="#5B6470">company value</Text><Text y={40} size={110} color={C.green}>BILLIONS</Text></Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < bs('o4') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Ticker x={960} y={420} s={1.2 * pop(f, bs('o3'))} f={f} price={f >= jp ? '$240 +20%' : '$200'} up />
            <G2 x={960} y={760} s={pop(f, hp)}><Text size={56}>...for something that hasn't happened yet</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, bt)}><Stamp text="$1,000,000 BET" size={70} color={C.gold} /></G2>
            <Frame x={560} y={520} s={pop(f, bf)} w={600} h={460} label="boring fund">
              {[0, 1, 2, 3, 4, 5].map((i) => <G2 key={i} x={-150 + (i % 3) * 150} y={-60 + Math.floor(i / 3) * 110} s={0.25}><Stand /></G2>)}
            </Frame>
            <Text x={960} y={520} size={80}>vs</Text>
            <Frame x={1360} y={520} s={pop(f, bf + 10)} w={600} h={460} label="the pros">
              {[0, 1, 2].map((i) => <Suit key={i} seed={110 + i} f={f} x={-150 + i * 150} y={150} s={0.6} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />)}
            </Frame>
            {f >= lm - 6 && <G2 x={960} y={520} s={pop(f, lm - 6)}><rect x={-700} y={-360} width={1400} height={720} fill={C.bg} /><Stand x={0} y={200} s={1.3} /></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH1 ============
  {
    const hc = w('c1b', 'hundred');
    const ft = w('c1b', 'fifty');
    const dr = w('c1c', 'dream');
    const bc = w('c1c', 'beach');
    const tt = w('c1d', 'ten');
    const kn = w('c1d', 'know');
    const bw = w('c1e', 'borrow');
    const sl = w('c1f', 'sells');
    q(hc, 'pop2', 0.4);
    for (let i = 0; i < 6; i++) q(hc + 6 + i * 4, 'coin', 0.25);
    q(ft, 'cash', 0.6);
    q(dr, 'dream', 0.4);
    q(tt, 'pop', 0.5);
    q(kn, 'boing', 0.5);
    q(bw, 'pop', 0.4);
    q(sl, 'ding', 0.6);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          {f < dr ? <Street f={f} /> : <Beach f={f} />}
          <Svg>
            {f < dr ? (
              <g>
                <Stand x={900} y={822} s={1.1 * pop(f, A('c1a') + 4)} />
                <Dave f={f} x={620} y={822} s={1.2} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
                {Array.from({length: 5}).map((_, i) => <Stick key={i} f={f} x={1250 + i * 110} y={822} s={0.7 * pop(f, hc + i * 3)} acc={i % 2 ? ['cap'] : []} seed={120 + i} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}]} />)}
                <G2 x={960} y={200} s={pop(f, ft)}><Text size={70} color={C.green}>+$50 profit / day</Text></G2>
              </g>
            ) : (
              <g>
                <Stand x={700} y={860} s={1.3} big label="DAVE'S LEMONADE II" />
                <Stand x={1400} y={860} s={0.9 * pop(f, bc)} label="BEACH BRANCH" />
                <Sun f={f} x={1650} y={170} />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={180} s={pop(f, tt)}><Text size={90}>Needs: $10,000</Text></G2>
            <Dave f={f} x={500} y={860} s={1.2} keys={[{at: 0, pose: 'pockets', expr: 'sad'}, {at: sl, pose: 'point_up', expr: 'grin'}]} pockets={1} />
            <Frame x={1000} y={560} s={pop(f, bw)} w={460} h={340} label="borrow = owe interest">
              <Raccoon f={f} s={0.5} mood="greedy" />
            </Frame>
            <XMark x={1000} y={560} s={0.3 * pop(f, sl - 6, 9, 280)} />
            <G2 x={1560} y={560} s={pop(f, sl)}><Share s={1.1} n="SELL PIECES?" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 ============
  {
    const hd = w('c2a', 'hundred');
    const sh = w('c2a', 'share');
    const kp = w('c2b', 'keeps');
    const sl = w('c2b', 'sells');
    const tt = w('c2c', 'ten');
    const gm = w('c2d', 'grandma');
    const tp = w('c2d', 'percent');
    const mk = w('c2e', 'money');
    const fl = w('c2e', 'fails');
    const pc = w('c2f', 'ownership');
    const ipo = w('c2g', 'i');
    const ex = w('c2g', 'exchange');
    const mp = w('c2h', 'marketplace');
    q(hd, 'pop', 0.5);
    for (let i = 0; i < 10; i++) q(hd + 4 + i * 2, 'pop2', 0.2);
    q(sh, 'stamp', 0.6);
    q(sl, 'cash', 0.6);
    q(tt, 'ding', 0.5);
    q(gm, 'pop', 0.5);
    q(tp, 'stamp', 0.5);
    q(mk, 'coin', 0.4);
    q(fl, 'thud', 0.4);
    q(pc, 'ding', 0.5);
    q(ipo, 'pop', 0.5);
    q(ex, 'crowd', 0.4);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {Array.from({length: 100}).map((_, i) => {
              const sold = f >= sl && i >= 50;
              return <rect key={i} x={260 + (i % 20) * 70} y={200 + Math.floor(i / 20) * 70} width={60} height={60} rx={8} fill={sold ? C.blue : C.yellow} stroke={C.ink} strokeWidth={3} opacity={pop(f, hd + (i % 20))} />;
            })}
            <G2 x={960} y={620} s={pop(f, sh)}><Text size={60}>100 pieces = 100 SHARES</Text></G2>
            <G2 x={560} y={740} s={pop(f, kp)}><Text size={44} color="#B7830F">Dave keeps 50</Text></G2>
            <G2 x={1360} y={740} s={pop(f, sl)}><Text size={44} color={C.blue}>sells 50 × $200</Text></G2>
            <G2 x={960} y={860} s={pop(f, tt)}><Text size={60} color={C.green}>= $10,000 · owes nobody</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Stand x={1300} y={822} s={1} />
            <Grandma f={f} x={520} y={820} s={1.2 * pop(f, gm - 4)} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.6}, {at: fl, pose: 'shock', expr: 'worried'}]} handItem={<Share s={0.35} y={-30} n="10 SHARES" />} />
            <G2 x={520} y={250} s={pop(f, tp)}><Text size={60}>owns 10% of the stand</Text></G2>
            <G2 x={1300} y={250} s={pop(f, mk)}><Text size={48} color={C.green}>profits ↑ → her piece ↑</Text></G2>
            <G2 x={1300} y={330} s={pop(f, fl)}><Text size={48} color={C.red}>fails → worth $0</Text></G2>
            <G2 x={960} y={920} s={pop(f, pc)}><Text size={52}>stock = a piece of a real business</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={500} y={250} s={pop(f, ipo)}><Stamp text="IPO" size={80} color={C.green} /></G2>
            <G2 x={500} y={380} s={pop(f, ipo + 6)}><Text size={36}>first sale to the public</Text></G2>
            <Ticker x={1250} y={380} s={pop(f, ex)} f={f} price="$200" name="LMNDE" />
            {Array.from({length: 8}).map((_, i) => <Stick key={i} f={f} x={900 + i * 120} y={880} s={0.6 * pop(f, mp + i * 2)} acc={i % 3 === 0 ? ['cap'] : i % 3 === 1 ? ['tie'] : ['hair']} seed={130 + i} keys={[{at: 0, pose: i % 2 ? 'point_up' : 'panic', expr: 'grin'}]} />)}
            <G2 x={500} y={700} s={pop(f, mp)}><Text size={48}>a giant marketplace</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 ============
  {
    const bb = w('c3a', 'bob');
    const ki = w('c3b', 'future');
    const hw = w('c3c', 'heat');
    const ln = w('c3d', 'lines');
    const jp = w('c3e', 'jumps');
    const th = w('c3e', 'three');
    const jc = w('c3f', 'juice');
    const dr = w('c3f', 'drops');
    const ex = w('c3g', 'expectations');
    const gs = w('c3h', 'guess');
    q(bb, 'pop', 0.5);
    q(ki, 'ding', 0.5);
    q(hw, 'whoosh', 0.5);
    q(ln, 'crowd', 0.4);
    q(jp, 'boing', 0.6);
    q(th, 'cash', 0.6);
    q(jc, 'thud', 0.6);
    q(dr, 'trombone', 0.4);
    q(ex, 'stamp', 0.6);
    q(gs, 'pop', 0.5);
    const price = f < jp ? '$200' : f < dr ? '$300' : '$150';
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bob f={f} x={420} y={860} s={1.2 * pop(f, bb)} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
            <Grandma f={f} x={760} y={860} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.6}]} handItem={<Share s={0.3} y={-30} />} />
            <G2 x={1350} y={320} s={pop(f, ki - 20)}><Text size={52}>A share is worth...</Text></G2>
            <G2 x={1350} y={430} s={pop(f, ki - 10)}><Text size={44} color="#9C9383">not today's profit</Text></G2>
            <G2 x={1350} y={540} s={pop(f, ki)}><Stamp text="FUTURE PROFIT" size={60} color={C.green} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          {f < jc ? <Beach f={f} /> : <Street f={f} />}
          <Svg>
            {f < jc && <Sun f={f} x={1650} y={180} s={1 + 0.3 * ease(f, hw, hw + 20)} />}
            {f < jc && <Thermo x={1450} y={400} s={pop(f, hw)} level={ease(f, hw, hw + 30, 0.4, 0.95)} />}
            {f >= jc && <Factory x={1450} y={822} s={0.8 * pop(f, jc)} />}
            <Stand x={560} y={822} s={0.9} />
            {f >= ln && f < jc && Array.from({length: 6}).map((_, i) => <Stick key={i} f={f} x={820 + i * 90} y={822} s={0.55} acc={[]} seed={140 + i} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.8}]} opacity={0.5} />)}
            <Ticker x={960} y={200} s={0.8} f={f} price={price} up={f < dr} />
            <G2 x={960} y={930} s={pop(f, ex)}><Text size={52}>same stand · expectations moved</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 ============
  {
    const tm = w('c4b', 'tomorrow');
    const am = w('c4c', 'amazon');
    const fp = w('c4c', 'first');
    const wh = w('c4d', 'warehouses');
    const pd = w('c4d', 'did');
    const dp = w('c4e', 'disappeared');
    q(tm, 'ding', 0.5);
    q(am, 'pop', 0.6);
    q(fp, 'stamp', 0.6);
    q(wh, 'pop2', 0.5);
    q(pd, 'cash', 0.6);
    q(dp, 'poof', 0.6);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={300} s={pop(f, bs('c4a'))}><Text size={70}>losing money, worth billions?</Text></G2>
            <G2 x={960} y={560} s={pop(f, tm)}><Text size={100} color={C.blue}>investors buy TOMORROW</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={260} s={0.8 * pop(f, am)} top="IPO" year={1997} flip={0} />
            <Boxes x={760} y={620} s={1.1 * pop(f, wh)} />
            <LineChart x={1350} y={520} w={600} h={320} t={ease(f, am, pd + 20)} pts={[-1, -1.5, -2, -1.2, -0.6, -0.2, 0.3, 1, 2]} lo={-2.2} hi={2.2} color={C.blue} />
            <G2 x={1350} y={260} s={pop(f, fp)}><Text size={52}>first full-year profit: 2003</Text></G2>
            <G2 x={1350} y={800} s={pop(f, pd)}><Text size={52} color={C.green}>the bet paid off</Text></G2>
            <SourceTag f={f} at={fp} text="Amazon: IPO 1997; first annual profit reported for 2003" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {Array.from({length: 6}).map((_, i) => (
              <G2 key={i} x={260 + i * 280} y={620} s={0.45} o={i === 0 ? 1 : 1 - ease(f, dp + i * 3, dp + i * 3 + 8)}>
                <Stand label={i === 0 ? 'WINNER' : 'BURNED $$'} />
              </G2>
            ))}
            {Array.from({length: 5}).map((_, i) => <Puff key={i} x={540 + i * 280} y={540} t={lin(f, dp + (i + 1) * 3, dp + (i + 1) * 3 + 20)} s={0.5} />)}
            <G2 x={960} y={220} s={pop(f, dp)}><Text size={56}>for every Amazon... many vanished</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 ============
  {
    const w1 = w('c5b', 'price');
    const w2 = w('c5c', 'dividends');
    const rt = w('c5c', 'rent');
    const gw = w('c5d', 'grow');
    const gd = w('c5e', 'gold');
    q(w1, 'pop', 0.5);
    q(w2, 'pop', 0.5);
    q(rt, 'coin', 0.5);
    q(gw, 'ding', 0.4);
    q(gd, 'pop', 0.5);
    scene(A('c5a'), () =>
      f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Frame x={560} y={470} s={pop(f, w1)} w={680} h={500} label="Way 1: price goes up">
              <Share s={0.8} x={-120} y={-40} n="$200" />
              <Text x={40} y={-40} size={70}>→</Text>
              <Share s={0.8} x={180} y={-40} n="$300" />
              <Text y={120} size={50} color={C.green}>+$100</Text>
            </Frame>
            <Frame x={1360} y={470} s={pop(f, w2)} w={680} h={500} label="Way 2: dividends">
              <Stand s={0.4} y={70} />
              {f >= rt && [0, 1, 2].map((i) => {
                const p = ((f - rt + i * 10) % 30) / 30;
                return <Coin key={i} x={-60 + p * 240} y={-60 - Math.sin(p * Math.PI) * 60} s={0.7} />;
              })}
            </Frame>
            <G2 x={960} y={850} s={pop(f, gw)}><Text size={44} color="#5B6470">some pay out · some reinvest to grow</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Frame x={560} y={480} s={pop(f, gd)} w={620} h={440} label="Gold: just sits">
              <GoldBar s={1.1} y={-40} />
            </Frame>
            <Frame x={1360} y={480} s={pop(f, gd + 8)} w={620} h={440} label="Business: keeps earning">
              <Stand s={0.45} y={80} />
              <Coin x={120} y={-120 - Math.abs(Math.sin(f / 6)) * 30} s={0.8} />
            </Frame>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 ============
  {
    const sc = w('c6a', 'scary');
    const ff = w('c6b', 'fifty');
    const th = w('c6c', 'thirty');
    const pn = w('c6d', 'panicked');
    const tp = w('c6e', 'ten');
    const rc = w('c6f', 'recovered');
    q(sc, 'heart', 0.6);
    q(ff, 'thud', 0.7);
    q(th, 'thud', 0.7);
    q(pn, 'crowd', 0.4);
    q(tp, 'ding', 0.6);
    q(rc, 'chime', 0.5);
    scene(A('c6a'), () =>
      f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={180} s={pop(f, ff)}><Text size={52}>2007–2009: −57%</Text></G2>
            <LineChart x={500} y={500} w={640} h={360} t={ease(f, bs('c6b'), ff + 20)} pts={[100, 95, 85, 70, 55, 43, 50, 60]} lo={30} hi={105} color={C.red} />
            <G2 x={1420} y={180} s={pop(f, th)}><Text size={52}>2020: −34% in ~1 month</Text></G2>
            <LineChart x={1420} y={500} w={640} h={360} t={ease(f, bs('c6c'), th + 20)} pts={[100, 98, 90, 75, 66, 72, 85, 100]} lo={30} hi={105} color={C.red} />
            <G2 x={960} y={850} s={pop(f, pn)}><Text size={48}>many panicked and sold at the bottom</Text></G2>
            <SourceTag f={f} at={ff} text="S&P 500 peak-to-trough declines (charts simplified)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <LineChart x={960} y={520} w={1400} h={440} t={ease(f, bs('c6e'), tp + 40)} pts={[1, 1.2, 0.8, 1.4, 1.9, 1.6, 2.6, 3.4, 2.5, 4.2, 5.5, 4.6, 7, 9.5, 8, 12, 16]} lo={0.5} hi={16.5} color={C.green} />
            <G2 x={700} y={200} s={pop(f, tp)}><Text size={70} color={C.green}>~10% a year on average</Text></G2>
            <G2 x={700} y={290} s={pop(f, tp + 6)}><Text size={40}>S&P 500, since the 1920s</Text></G2>
            <G2 x={960} y={880} s={pop(f, rc)}><Text size={40} color="#5B6470">past results don't guarantee the future</Text></G2>
            <SourceTag f={f} at={tp} text="S&P 500 total return since 1926 ≈ 10%/yr (chart illustrative)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 ============
  {
    const bf = w('c7b', 'buffett');
    const ix = w('c7c', 'index');
    const tn = w('c7c', 'tiny');
    const hf = w('c7d', 'hedge');
    const fee = w('c7d', 'fees');
    const sv = w('c7e', 'seven');
    const tw = w('c7e', 'two', 1);
    const wn = w('c7f', 'won');
    const ch = w('c7f', 'charity');
    const fm = w('c7g', 'fees');
    q(bf, 'pop', 0.6);
    q(ix, 'pop', 0.5);
    for (let i = 0; i < 12; i++) q(tn + i * 2, 'pop2', 0.2);
    q(hf, 'pop', 0.5);
    q(fee, 'cash', 0.5);
    q(sv, 'stamp', 0.6);
    q(tw, 'thud', 0.5);
    q(wn, 'sting', 0.6);
    q(ch, 'chime', 0.5);
    q(fm, 'ding', 0.5);
    scene(A('c7a'), () =>
      f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={260} s={0.8 * pop(f, bf)} top="BET" year={2008} flip={0} />
            <Buffett f={f} x={260} y={860} s={0.9 * pop(f, bf)} keys={[{at: 0, pose: 'point_r', expr: 'smug', look: 0.8}]} />
            <Frame x={880} y={500} s={pop(f, ix)} w={560} h={520} label="index fund: a bit of everything">
              {Array.from({length: 12}).map((_, i) => <G2 key={i} x={-180 + (i % 4) * 120} y={-150 + Math.floor(i / 4) * 110} s={0.18 * pop(f, tn + i * 2)}><Stand label="" /></G2>)}
            </Frame>
            <Frame x={1500} y={500} s={pop(f, hf)} w={560} h={520} label="hedge funds: big fees">
              {[0, 1, 2].map((i) => <Suit key={i} seed={110 + i} f={f} x={-160 + i * 160} y={170} s={0.6} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />)}
              <G2 y={-150} s={pop(f, fee)}><PriceTag text="FEES" color={C.red} s={0.9} /></G2>
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={400} y1={820} x2={1520} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={720} y={820} h={ease(f, sv - 4, sv + 14, 0, 7.1 * 60)} color={C.green} label="Index fund" value="7.1%/yr" w={280} />
            <Bar x={1200} y={820} h={ease(f, tw - 4, tw + 14, 0, 2.2 * 60)} color={C.red} label="Hedge fund picks" value="2.2%/yr" w={280} />
            <G2 x={960} y={160} s={pop(f, wn)}><Stamp text="BUFFETT WINS" size={70} color={C.green} /></G2>
            <G2 x={1600} y={420} s={pop(f, ch)}><Icon kind="heart" s={0.6} /><Text y={110} size={36}>→ charity</Text></G2>
            <G2 x={960} y={930} s={pop(f, fm)}><Text size={48}>fees matter · beating the market is hard</Text></G2>
            <SourceTag f={f} at={sv} text="Berkshire Hathaway 2017 shareholder letter (2008–2017)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 ============
  const recap = ['Stock = a piece of a real business', 'Prices follow expectations', 'Crashes happen · long-term, low-cost'];
  {
    const r = [bs('c8b'), bs('c8c'), bs('c8d')];
    q(A('c8a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c8a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={330} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1260} />)}
          <G2 x={1600} y={880} s={pop(f, r[0] + 20)}><Text size={32} color="#8C7A5B">~6 in 10 Americans own stock (Gallup 2025)</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const p4 = w('c8e', 'four');
    const zr = w('c8e', 'zero');
    const bl = w('c8f', 'billions');
    const sb = w('c8g', 'subscribe');
    q(p4, 'pop', 0.6);
    q(zr, 'pop', 0.6);
    q(bl, 'boing', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <G2 x={760} y={460} s={pop(f, p4)}>
              <rect x={-300} y={-160} width={600} height={320} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-80} size={40}>CHECKOUT</Text>
              <rect x={-240} y={-20} width={480} height={90} rx={45} fill="#FFB3C7" stroke={C.ink} strokeWidth={5} />
              <Text y={26} size={40}>Pay in 4 · 0% interest</Text>
            </G2>
            <G2 x={1450} y={460} s={pop(f, bl)}><Icon kind="question" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
            <Lemon x={1500} y={780} s={2 * pop(f, sb + 20)} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = w('c3g', 'expectations') + 20;
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
