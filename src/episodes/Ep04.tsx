import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board as Bg, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette} from '../fx';
import {Bank, Bill, Bubble, Calendar, Card, Coin, DocCard, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, CreditCard, Frame, Icon, Magnifier, Row, Sign, SubButton, Bell} from '../props2';
import {Raccoon, Shop, SourceCard, SplitBar} from '../props3';
import {Burger, House} from '../props4';
import {Board, Contract, Corner, Fries, IceCreamMachine, Land, Mixer} from '../props5';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Kroc: React.FC<SP> = (p) => <Stick acc={['fedora', 'tie']} seed={61} {...p} />;
const Harry: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={67} {...p} />;
const Bro: React.FC<SP & {seed: number}> = ({seed, ...p}) => <Stick acc={['paperhat']} seed={seed} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

export const Ep04: React.FC = () => {
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
  const Rest: React.FC<{name?: string}> = ({name = 'BURGERS'}) => <Shop s={1} name={name} />;

  // ============ COLD OPEN ============
  {
    const bl = w('o1', 'billions');
    q(2, 'pop', 0.6);
    for (let i = 0; i < 10; i++) q(bl + i * 3, 'pop2', 0.25);
    scene(0, () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <Burger x={960} y={480} s={1.6 * pop(f, 2, 10)} />
          {f > bl && Array.from({length: 14}).map((_, i) => {
            const p = lin(f, bl + i * 3, bl + i * 3 + 30);
            return p <= 0 || p >= 1 ? null : <Burger key={i} x={200 + ((i * 263) % 1500)} y={-100 + p * 1200} s={0.45} r={p * 200} />;
          })}
          <G2 x={960} y={820} s={pop(f, bl)}><Text size={80}>BILLIONS of burgers</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('o3', 'one');
    const ft = w('o4', 'fourteen');
    const tn = w('o5', 'ten');
    q(on, 'pop', 0.6);
    q(ft, 'cash', 0.7);
    q(tn, 'stamp', 0.8);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <line x1={400} y1={820} x2={1520} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={720} y={820} h={ease(f, on - 4, on + 12, 0, 1.4 * 36)} color={C.blue} label="Restaurants it runs" value={f >= on ? '$1.4B' : ''} w={260} />
          <Bar x={1200} y={820} h={ease(f, ft - 8, ft + 14, 0, 13.9 * 36)} color={C.green} label="Restaurants OTHERS run" value={f >= ft ? '$13.9B' : ''} w={260} />
          <Stamp x={960} y={160} s={pop(f, tn, 9, 260)} r={-4} text="10× MORE" size={80} />
          <SourceTag f={f} at={on + 6} text="McDonald's 10-K FY2025: restaurant margins" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const kt = w('o6', 'kitchen');
    const ft = w('o6', 'feet');
    q(kt, 'pop', 0.5);
    q(ft, 'thud', 0.7);
    q(ft + 6, 'sting', 0.6);
    const drop = ease(f, ft - 4, ft + 12);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <g transform={`translate(0,${-drop * 300})`}>
            <G2 x={960} y={822}><Rest /></G2>
          </g>
          <g opacity={drop}>
            <rect x={600} y={822 - drop * 300} width={720} height={300} fill="#B08A5A" stroke={C.ink} strokeWidth={6} />
            <Text x={960} y={960 - drop * 300 + 20} size={70} color="#fff">THE LAND</Text>
            <Sparkle x={1300} y={720} t={lin(f, ft + 6, ft + 26)} />
          </g>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const fft = w('c1a', 'fifties');
    const bro = w('c1b', 'brothers');
    const sp = w('c1c', 'speed');
    const fc = w('c1c', 'factory');
    q(A('c1a') + 4, 'dream', 0.4);
    q(bro, 'pop', 0.5);
    q(sp, 'whoosh', 0.5);
    for (let i = 0; i < 6; i++) q(fc + i * 5, 'pop2', 0.3);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.35)'}}>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={822}><Rest name="McDONALD'S" /></G2>
            <Bro seed={71} f={f} x={640} y={822} s={1.1 * pop(f, bro)} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Bro seed={73} f={f} x={1280} y={822} s={1.1 * pop(f, bro + 4)} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.6}, {at: fc, pose: 'typing', expr: 'grin'}]} />
            {f > fc && Array.from({length: 6}).map((_, i) => {
              const p = lin(f, fc + i * 5, fc + i * 5 + 20);
              return p <= 0 || p >= 1 ? null : <Burger key={i} x={1280 + p * 500} y={500 - Math.sin(p * Math.PI) * 120} s={0.35} />;
            })}
            <G2 x={960} y={180} s={pop(f, fft)}><Calendar top="YEAR" year="1950s" flip={0} s={0.7} /></G2>
            <G2 x={400} y={300} s={pop(f, sp)}><Stamp text="SPEED" size={60} color={C.red} /></G2>
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={0.6} />
      </AbsoluteFill>
    ));
  }
  {
    const sl = w('c1d', 'salesman');
    const gm = w('c1d', 'gold');
    const fr = w('c1e', 'franchises');
    const fe = w('c1e', 'fee');
    q(sl, 'pop', 0.5);
    q(gm, 'ding', 0.6);
    q(fr, 'stamp', 0.6);
    q(fe, 'coin', 0.5);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.35)'}}>
          <Street f={f} />
          <Svg>
            <G2 x={1300} y={822} s={0.8}><Rest name="McDONALD'S" /></G2>
            <Kroc f={f} x={520} y={822} s={1.25 * pop(f, sl - 4)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: gm, pose: 'shock', expr: 'grin'}, {at: fr, pose: 'present', expr: 'grin'}]} handItem={f < gm ? <Mixer f={f} s={0.3} y={40} /> : undefined} />
            <G2 x={520} y={260} s={pop(f, sl)}><Text size={48}>Ray Kroc</Text></G2>
            <G2 x={900} y={300} s={pop(f, gm)}><Text size={120} color={C.gold} stroke={C.ink} sw={10}>$$$</Text></G2>
            {f >= fr && [0, 1, 2].map((i) => <G2 key={i} x={250 + i * 180} y={560} s={0.35 * pop(f, fr + i * 4)}><Rest name="NEW" /></G2>)}
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={0.6} />
      </AbsoluteFill>
    ));
  }
  {
    const pb = w('c1f', 'problem');
    const on = w('c1g', 'one');
    const br = w('c1g', 'brothers');
    const bk = w('c1h', 'broke');
    q(pb, 'heart', 0.5);
    q(on, 'pop', 0.6);
    q(br, 'coin', 0.4);
    q(bk, 'trombone', 0.5);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={960} y={130} s={pop(f, on)}><Text size={60}>Kroc's cut of each restaurant's sales</Text></G2>
          <SplitBar x={960} y={380} a={0.019} la="" lb="98.1% stays with the restaurant" ca={C.gold} cb="#C9C3B6" t={1} w={1400} />
          <G2 x={300} y={520} s={pop(f, on + 6)}><Text size={60} color={C.gold} stroke={C.ink} sw={6}>1.9%</Text></G2>
          <G2 x={640} y={520} s={pop(f, br)}><Text size={40} color="#5B6470">(part goes to the brothers)</Text></G2>
          <Kroc f={f} x={960} y={900} s={1} sweat keys={[{at: 0, pose: 'idle', expr: 'worried'}, {at: bk, pose: 'pockets', expr: 'sad'}]} pockets={ease(f, bk, bk + 6)} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 ============
  {
    const hs = w('c2a', 'harry');
    const ld = w('c2c', 'land');
    q(hs, 'pop', 0.6);
    q(ld, 'stamp', 0.8);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Kroc f={f} x={560} y={820} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}, {at: ld, pose: 'shock', expr: 'shock'}]} />
          <Harry f={f} x={1300} y={820} s={1.2 * pop(f, hs - 2)} keys={[{at: 0, pose: 'talk', expr: 'smug', look: -0.8, talk: true}, {at: we('c2c', 'land'), pose: 'point_up', talk: false, expr: 'grin'}]} />
          <G2 x={1300} y={260} s={pop(f, hs)}><Text size={44}>Harry Sonneborn</Text></G2>
          <G2 x={960} y={400} s={pop(f, w('c2c', 'stop'))}><Burger s={0.8} /><XMark s={0.2} /></G2>
          <G2 x={960} y={180} s={pop(f, ld)}><Stamp text="FOCUS ON THE LAND" size={60} color={C.green} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const by = w('c2d', 'buys');
    const bu = w('c2d', 'builds');
    const rt = w('c2d', 'rents');
    const rn = w('c2e', 'rent');
    const mo = w('c2e', 'month');
    q(by, 'stamp', 0.6);
    q(bu, 'pop', 0.6);
    q(rt, 'ding', 0.5);
    for (let k = mo; k < A('c2f') - 6; k += 10) q(k, 'coin', 0.35);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Land x={960} y={840} s={1.4 * pop(f, by - 4)} owned={f >= by ? 1 : 0} />
          <G2 x={960} y={800} s={0.8 * pop(f, bu)}><Rest /></G2>
          <Bob f={f} x={1500} y={820} s={1.1 * pop(f, rt)} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}]} />
          <G2 x={1500} y={320} s={pop(f, rt)}><Text size={44}>franchise owner</Text></G2>
          {f > mo && [0, 1, 2].map((i) => {
            const p = ((f - mo + i * 10) % 30) / 30;
            return <Coin key={i} x={1480 - p * 700} y={560 - Math.sin(p * Math.PI) * 160} s={1} />;
          })}
          <Kroc f={f} x={420} y={820} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: mo, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={420} y={300} s={pop(f, rn)}><Stamp text="RENT" size={60} color={C.green} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const qt = w('c2f', 'quoted');
    const re = w('c2f', 'real');
    const tn = w('c2g', 'tenants');
    q(qt, 'paper', 0.6);
    q(re, 'marker', 0.5);
    q(tn, 'pop', 0.5);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={ease(f, qt - 6, qt + 8, 2300, 1150)} y={450}>
            <rect x={-560} y={-230} width={1120} height={460} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-170} size={30} color="#8C7A5B" ls={4}>HARRY SONNEBORN (ATTRIBUTED)</Text>
            <Text y={-70} size={52}>“We are not technically</Text>
            <Text y={0} size={52}>in the food business.</Text>
            <rect x={-420} y={45} width={840 * ease(f, re, re + 20)} height={70} fill={C.yellow} opacity={0.7} />
            <Text y={80} size={56} color={C.navy}>We are in the real estate business.”</Text>
          </G2>
          <Harry f={f} x={300} y={860} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'smug', look: 0.8}]} />
          <G2 x={1150} y={820} s={pop(f, tn)}><Text size={44} color="#5B6470">burgers → pay the rent</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sx = w('c2h', 'sixty');
    const tw = w('c2h', 'two');
    q(sx, 'flip', 0.5);
    q(tw, 'cash', 0.6);
    scene(A('c2h'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.35)'}}>
          <Interior />
          <Svg>
            <Calendar x={300} y={260} s={0.8 * pop(f, sx - 4)} top="YEAR" year={1961} flip={0} />
            <Kroc f={f} x={780} y={820} s={1.2} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
            <Bro seed={71} f={f} x={1300} y={820} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}]} handItem={<MoneyStack n={4} s={0.5} y={-20} />} />
            <Bro seed={73} f={f} x={1500} y={820} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: -0.8}]} />
            <G2 x={1400} y={250} s={pop(f, tw)}><Stamp text="$2.7 MILLION" size={60} color={C.green} /></G2>
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={0.5} />
      </AbsoluteFill>
    ));
  }

  // ============ CH3 ============
  {
    const bb = w('c3a', 'bob');
    const ff = w('c3b', 'forty');
    const ki = w('c3c', 'kitchen');
    const mi = w('c3c', 'million');
    const bl = w('c3d', 'building');
    const mc = w('c3d', 'belong');
    q(bb, 'pop', 0.5);
    q(ff, 'coin', 0.6);
    q(ki, 'pop', 0.5);
    q(mi, 'stamp', 0.6);
    q(mc, 'ding', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Bob f={f} x={380} y={820} s={1.25 * pop(f, bb - 4)} keys={[{at: 0, pose: 'wave', expr: 'grin'}, {at: ff, pose: 'present', expr: 'happy', look: 0.8}]} />
          <G2 x={380} y={300} s={pop(f, ff)}><PriceTagLite text="$45,000 fee" /></G2>
          <G2 x={1150} y={822}><Rest /></G2>
          <G2 x={900} y={400} s={pop(f, ki)}><Fries s={0.7} /></G2>
          <G2 x={1150} y={220} s={pop(f, mi)}><Text size={52} color={C.red}>Bob pays: equipment $1M+</Text></G2>
          <G2 x={1600} y={640} s={pop(f, mc)}>
            <rect x={-170} y={-60} width={340} height={120} rx={20} fill={C.green} stroke={C.ink} strokeWidth={5} />
            <Text y={-14} size={32} color="#fff">Land + building</Text>
            <Text y={28} size={32} color="#fff">= McDonald's</Text>
          </G2>
          <SourceTag f={f} at={ff + 6} text="McDonald's USA Franchise Disclosure Document (2025)" until={bl} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c3e', 'three');
    const r1 = w('c3f', 'royalty');
    const r2 = w('c3g', 'advertising');
    const r3 = w('c3h', 'rent');
    const tp = w('c3h', 'ten');
    [r1, r2, r3].forEach((x) => q(x, 'pop', 0.55));
    q(tp, 'stamp', 0.7);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={960} y={130} s={pop(f, th)}><Text size={64}>Bob pays McDonald's every month</Text></G2>
          <Row x={300} y={330} s={pop(f, r1 - 4)} n={1} text="Royalty (a few %)" lit={1} color={C.blue} w={900} />
          <Row x={300} y={500} s={pop(f, r2 - 4)} n={2} text="Advertising (a %)" lit={1} color={C.blue} w={900} />
          <Row x={300} y={670} s={pop(f, r3 - 4) * (1 + 0.08 * pop(f, tp) * out(f, tp + 10))} n={3} text="RENT (the big one)" lit={1} color={C.red} w={900} />
          <G2 x={1500} y={670} s={pop(f, tp)}><Text size={80} color={C.red} stroke={C.ink} sw={8}>10%+</Text></G2>
          <G2 x={1500} y={760} s={pop(f, tp + 4)}><Text size={32} color="#5B6470">of sales, newer sites</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ch = w('c3i', 'chunk');
    const wk = w('c3i', 'workers');
    const ft = w('c3j', 'forty');
    const nf = w('c3j', 'ninety');
    q(ch, 'cash', 0.5);
    q(wk, 'pop2', 0.4);
    q(ft, 'pop', 0.5);
    q(nf, 'stamp', 0.6);
    scene(A('c3i'), () =>
      f < A('c3j') ? (
        <AbsoluteFill>
          <Bg />
          <Svg>
            <G2 x={960} y={180}><Text size={60}>Bob's $1 of sales</Text></G2>
            <G2 x={960} y={450}><Coin s={6} /></G2>
            <path d={`M 960 450 L 960 ${450 - 150} A 150 150 0 0 1 ${960 + 150 * Math.sin(ease(f, ch - 6, ch + 14) * Math.PI * 0.5)} ${450 - 150 * Math.cos(ease(f, ch - 6, ch + 14) * Math.PI * 0.5)} Z`} fill={C.red} opacity={0.85} stroke={C.ink} strokeWidth={5} />
            <G2 x={1400} y={350} s={pop(f, ch)}><Text size={52} color={C.red}>→ McDonald's first</Text></G2>
            <G2 x={1400} y={560} s={pop(f, wk)}><Text size={44} color="#5B6470">then workers, meat, bread...</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Bg />
          <Svg>
            {Array.from({length: 40}).map((_, i) => (
              <G2 key={i} x={170 + (i % 10) * 175} y={200 + Math.floor(i / 10) * 150} s={0.2 * pop(f, A('c3j') + i)}>
                <Rest name="" />
              </G2>
            ))}
            {Array.from({length: 40}).map((_, i) => (i < 38 && f >= nf ? <circle key={`d${i}`} cx={170 + (i % 10) * 175 + 50} cy={200 + Math.floor(i / 10) * 150 - 90} r={14} fill={C.blue} stroke={C.ink} strokeWidth={3} /> : null))}
            <G2 x={960} y={850} s={pop(f, ft)}><Text size={60}>45,356 restaurants · <tspan fill={C.blue}>~95% franchised</tspan></Text></G2>
            <SourceTag f={f} at={ft + 6} text="McDonald's 10-K FY2025" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 ============
  {
    const rp = w('c4a', 'report');
    const tr = w('c4b', 'twenty');
    q(rp, 'paper', 0.6);
    q(tr, 'cash', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <SourceCard x={960} y={450} s={pop(f, rp - 4)} org="McDONALD'S CORP. · FORM 10-K" sub="ANNUAL REPORT · FISCAL YEAR 2025" title={['Total revenues']} stat={f >= tr ? '$26.9 BILLION' : '...'} statLabel="filed with the SEC" />
          <Magnifier x={1450} y={300} s={0.7} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nn = w('c4c', 'nine');
    const on = w('c4d', 'one');
    const sx = w('c4e', 'sixteen');
    const ft = w('c4f', 'fourteen');
    q(nn, 'pop', 0.6);
    q(on, 'thud', 0.5);
    q(sx, 'pop', 0.6);
    q(ft, 'cash', 0.7);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <Frame x={530} y={480} w={740} h={620} s={pop(f, nn - 4)} label="Restaurants McDonald's runs">
            <Text y={-200} size={40} color="#5B6470">sales</Text>
            <Text y={-130} size={90} color={C.blue}>$9.7B</Text>
            <G2 y={0} s={pop(f, on)}><Text size={40} color="#5B6470">margin left</Text></G2>
            <G2 y={80} s={pop(f, on)}><Text size={110} color={C.ink}>$1.4B</Text></G2>
          </Frame>
          <Frame x={1390} y={480} w={740} h={620} s={pop(f, sx - 4)} label="Franchise owners (like Bob)">
            <Text y={-200} size={40} color="#5B6470">paid to McDonald's</Text>
            <Text y={-130} size={90} color={C.blue}>$16.5B</Text>
            <G2 y={0} s={pop(f, ft)}><Text size={40} color="#5B6470">margin</Text></G2>
            <G2 y={80} s={pop(f, ft)}><Text size={110} color={C.green} stroke={C.ink} sw={6}>$13.9B</Text></G2>
          </Frame>
          <SourceTag f={f} at={nn + 6} text="McDonald's 10-K FY2025: company-operated vs franchised margins" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nn = w('c4g', 'nine');
    const rn = w('c4h', 'rent');
    const tt = w('c4h', 'two');
    q(nn, 'stamp', 0.6);
    q(rn, 'pop', 0.6);
    q(tt, 'ding', 0.5);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={960} y={130}><Text size={56}>Restaurant profit</Text></G2>
          <SplitBar x={960} y={320} a={0.093} la="" lb="≈ 90% from other people's restaurants" ca={C.blue} cb={C.green} w={1400} t={ease(f, nn - 6, nn + 8) < 1 ? 0.999 : 1} />
          {f >= A('c4h') && (
            <g>
              <G2 x={960} y={560}><Text size={52}>Franchise payments: rent vs royalties</Text></G2>
              <SplitBar x={960} y={720} a={0.64} la="RENT ≈ 2/3" lb="royalties" ca={C.red} cb={C.blue} w={1300} t={ease(f, rn - 4, tt + 10) < 1 ? ease(f, rn - 4, tt + 10) * 0.999 : 1} />
              <SourceTag f={f} at={rn + 6} text="McDonald's 10-Q Q1 2024: rents $2.38B vs royalties $1.33B" />
            </g>
          )}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fs = w('c4i', 'fifty');
    const ei = w('c4i', 'eighty');
    const em = w('c4i', 'empires');
    q(fs, 'pop', 0.6);
    q(ei, 'pop', 0.6);
    q(em, 'sting', 0.6);
    scene(A('c4i'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          {Array.from({length: 10}).map((_, i) => (
            <Land key={i} x={200 + i * 170} y={760 + (i % 2) * 70} s={0.55} owned={f >= fs + i * 2 && i < 6 ? 1 : 0} />
          ))}
          <G2 x={560} y={260} s={pop(f, fs)}><Text size={110} color={C.green} stroke={C.ink} sw={8}>~56%</Text></G2>
          <G2 x={560} y={360} s={pop(f, fs)}><Text size={40}>of the land</Text></G2>
          <G2 x={1360} y={260} s={pop(f, ei)}><Text size={110} color={C.green} stroke={C.ink} sw={8}>~80%</Text></G2>
          <G2 x={1360} y={360} s={pop(f, ei)}><Text size={40}>of the buildings</Text></G2>
          <SourceTag f={f} at={fs + 6} text="McDonald's 10-K FY2025 (consolidated markets)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 ============
  {
    const mp = w('c5a', 'monopoly');
    const ic = w('c5b', 'ice');
    const ht = w('c5c', 'hotels');
    const pd = w('c5c', 'pays');
    q(mp, 'pop', 0.6);
    q(ic, 'buzz', 0.35);
    q(ht, 'pop', 0.6);
    q(pd, 'cash', 0.6);
    const piece = lin(f, bs('c5b'), pd, 0, 11);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <Board x={700} y={520} s={0.95 * pop(f, mp)} f={f} piece={piece} hotels={f >= ht ? [2, 6, 11, 14] : []} />
          <Bob f={f} x={1450} y={880} s={1} sweat keys={[{at: 0, pose: 'idle', expr: 'tired'}, {at: pd, pose: 'shock', expr: 'shock'}]} />
          <IceCreamMachine x={1700} y={880} s={0.6 * pop(f, ic)} f={f} />
          <G2 x={1400} y={200} s={pop(f, ht)}><Text size={52} color={C.red}>McDonald's owns the hotels</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hd = [bs('c5d'), bs('c5e'), bs('c5f'), bs('c5g')];
    hd.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Rent is steady (minimum rent)', 'Risk belongs to the franchisee', 'Land gains value over time', 'Contracts last ~20 years'];
    const cur = hd.filter((x) => f >= x).length;
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={960} y={110}><Text size={64}>Why it's genius</Text></G2>
          {items.map((it, i) => <Row key={i} x={140} y={250 + i * 150} s={0.9 * pop(f, hd[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1060} />)}
          {cur === 1 && <Calendar x={1600} y={420} s={0.8} top="RENT" year="PAID" flip={0} />}
          {cur === 2 && <Bob f={f} x={1600} y={760} s={1} sweat keys={[{at: 0, pose: 'panic', expr: 'worried'}]} />}
          {cur === 3 && <Corner x={1600} y={560} s={0.5} f={f} value={f > hd[2] + 20 ? '$$$$' : '$'} />}
          {cur === 4 && <Contract x={1620} y={520} s={0.7} lines={['20 years', 'Rent monthly', 'Renovate when told']} signed={ease(f, hd[3] + 10, hd[3] + 40)} />}
          <SourceTag f={f} at={hd[3]} text="McDonald's 10-K FY2025: franchise terms generally 20 years" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 ============
  {
    const br = w('c6b', 'brand');
    const lv = w('c6c', 'living');
    const dz = w('c6c', 'dozens');
    const rk = w('c6d', 'risk');
    const rn = w('c6d', 'renovations');
    const rs = w('c6e', 'rain');
    q(br, 'ding', 0.5);
    q(lv, 'cash', 0.5);
    q(dz, 'pop2', 0.4);
    q(rk, 'heart', 0.4);
    q(rn, 'thud', 0.5);
    q(rs, 'coin', 0.5);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={822} s={0.9}><Rest /></G2>
            <Bob f={f} x={420} y={820} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'happy'}, {at: lv, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={1550} y={300} s={pop(f, br)}><Text size={48}>famous brand ✓</Text></G2>
            <G2 x={1550} y={380} s={pop(f, br + 10)}><Text size={48}>proven system ✓</Text></G2>
            <G2 x={1550} y={460} s={pop(f, br + 20)}><Text size={48}>ready customers ✓</Text></G2>
            {f >= dz && [0, 1, 2, 3, 4].map((i) => <G2 key={i} x={1250 + i * 130} y={700} s={0.15 * pop(f, dz + i * 3)}><Rest name="" /></G2>)}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Bob f={f} x={620} y={820} s={1.2} sweat keys={[{at: 0, pose: 'typing', expr: 'tired'}]} />
            <G2 x={620} y={260} s={pop(f, rn)}><Paper id="e4rn" text={'RENOVATE\n(you pay)'} reveal={1} size={50} color={C.red} w={320} h={200} /></G2>
            <G2 x={1350} y={600} s={pop(f, rs - 6)}>
              <Stick f={f} x={0} y={220} s={1.1} acc={['tophat', 'tie']} seed={81} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} handItem={<MoneyStack n={4} s={0.5} y={-20} />} />
              {Array.from({length: 8}).map((_, i) => <line key={i} x1={-200 + i * 60} y1={-300 + ((f * 8 + i * 40) % 300)} x2={-210 + i * 60} y2={-270 + ((f * 8 + i * 40) % 300)} stroke="#8ECDF2" strokeWidth={5} />)}
            </G2>
            <G2 x={1350} y={180} s={pop(f, rs)}><Text size={52} color={C.green}>rent: rain or shine</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 ============
  {
    const th = w('c7b', 'thing');
    const lr = w('c7c', 'landlord');
    const fc = w('c7c', 'fee');
    const wh = w('c7d', 'whom');
    const ev = w('c7e', 'everywhere');
    q(th, 'pop', 0.5);
    q(lr, 'pop', 0.5);
    q(fc, 'pop', 0.5);
    q(wh, 'stamp', 0.7);
    q(ev, 'ding', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={960} y={130} s={pop(f, th)}><Text size={60}>What they sell ≠ what makes them rich</Text></G2>
          <Frame x={560} y={470} s={pop(f, lr)} w={620} h={440} label="Burger company → landlord">
            <Burger x={-120} y={-40} s={0.6} />
            <Text x={20} y={-40} size={70}>→</Text>
            <House x={150} y={40} s={0.25} />
          </Frame>
          <Frame x={1360} y={470} s={pop(f, fc)} w={620} h={440} label="Bank → fee collector">
            <CreditCard x={-120} y={-40} s={0.45} />
            <Text x={20} y={-40} size={70}>→</Text>
            <Raccoon f={f} x={150} y={-20} s={0.45} mood="greedy" />
          </Frame>
          <Stamp x={960} y={830} s={pop(f, wh, 9, 260)} r={-3} text="WHO IS PAYING WHOM?" size={62} color={C.navy} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 ============
  const recap = ['~95% run by franchise owners', 'Owners pay fees + RENT', 'A landlord inside a burger company'];
  {
    const r = [bs('c8b'), bs('c8c'), bs('c8d')];
    q(A('c8a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Bg />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c8a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={400} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1120} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pc = w('c8e', 'paycheck');
    const gv = w('c8e', 'government');
    const it = w('c8f', 'interest');
    const ml = w('c8f', 'military');
    const sb = w('c8g', 'subscribe');
    const fr = w('c8g', 'fries');
    q(pc, 'pop', 0.5);
    q(gv, 'coin', 0.5);
    q(it, 'pop', 0.6);
    q(ml, 'stamp', 0.7);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(fr, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Bg />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: gv, pose: 'shock', expr: 'shock'}]} handItem={f < gv ? <Bill y={-20} s={0.6} /> : undefined} />
            <Bank x={1000} y={800} s={0.6 * pop(f, gv)} label="GOVERNMENT" />
            <G2 x={1500} y={330} s={pop(f, it)}><Text size={70} color={C.red}>INTEREST</Text></G2>
            <G2 x={1500} y={430} s={pop(f, ml)}><Text size={70}>&gt; MILITARY?!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Bg />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
            <Fries x={1500} y={820} s={pop(f, fr)} />
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

const PriceTagLite: React.FC<{text: string}> = ({text}) => (
  <g>
    <path d="M -150 -46 L 110 -46 L 160 0 L 110 46 L -150 46 Z" fill={C.yellow} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <Text x={-20} y={3} size={40}>{text}</Text>
  </g>
);
