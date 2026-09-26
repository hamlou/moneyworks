import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Phone, Row, SubButton, Bell, CreditCard} from '../props2';
import {PriceTag, Raccoon, Shop, TollBooth, Ticket, SplitBar} from '../props3';
import {Bread} from '../props6';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Sitter: React.FC<SP> = (p) => <Stick acc={['ponytail', 'glasses']} seed={150} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Sneaker: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -160 40 L -160 -20 Q -150 -60 -100 -60 L -40 -60 Q 0 -100 40 -60 L 100 -20 Q 170 -10 170 40 Z" fill="#fff" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -165 40 L 175 40 L 175 64 Q 0 76 -165 64 Z" fill={C.red} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -60 -50 L 60 0 M -40 -58 L 80 -10" stroke={C.blue} strokeWidth={10} strokeLinecap="round" />
    {[-30, 0, 30].map((xx) => <line key={xx} x1={xx - 20} y1={-50} x2={xx + 10} y2={-40} stroke={C.ink} strokeWidth={4} />)}
  </g>
);

const Checkout: React.FC<{x: number; y: number; s?: number; press?: number}> = ({x, y, s = 1, press = 0}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-360} y={-260} width={720} height={520} rx={24} fill="#fff" stroke={C.ink} strokeWidth={7} />
    <rect x={-360} y={-260} width={720} height={80} rx={24} fill={C.navy} />
    <rect x={-360} y={-200} width={720} height={20} fill={C.navy} />
    <text x={0} y={-218} fontFamily={FONT} fontWeight={700} fontSize={36} fill="#fff" textAnchor="middle" dominantBaseline="middle" letterSpacing={4}>CHECKOUT</text>
    <text x={-300} y={-120} fontFamily={FONT} fontWeight={600} fontSize={40} fill={C.ink} dominantBaseline="middle">Sneakers</text>
    <text x={300} y={-120} fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.ink} textAnchor="end" dominantBaseline="middle">$200.00</text>
    <rect x={-300} y={-60} width={600} height={90} rx={45} fill={C.blue} stroke={C.ink} strokeWidth={5} />
    <text x={0} y={-14} fontFamily={FONT} fontWeight={700} fontSize={36} fill="#fff" textAnchor="middle" dominantBaseline="middle">Pay $200 now</text>
    <g transform={`translate(0,${100 + press * 6}) scale(${1 - press * 0.05})`}>
      <rect x={-300} y={-45} width={600} height={90} rx={45} fill="#FFB3C7" stroke={C.ink} strokeWidth={5} />
      <text x={0} y={2} fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.ink} textAnchor="middle" dominantBaseline="middle">Pay in 4 × $50 · 0% interest</text>
    </g>
  </g>
);

const Cart: React.FC<{x: number; y: number; s?: number; items: number}> = ({x, y, s = 1, items}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {Array.from({length: items}).map((_, i) => (
      <rect key={i} x={-110 + (i % 4) * 55} y={-130 - Math.floor(i / 4) * 50} width={50} height={46} rx={6} fill={[C.red, C.blue, C.yellow, C.green][i % 4]} stroke={C.ink} strokeWidth={4} />
    ))}
    <path d="M -180 -160 L -140 -160 L -110 0 L 120 0 L 150 -120 L -125 -120" fill="none" stroke={C.ink} strokeWidth={10} strokeLinejoin="round" />
    <circle cx={-90} cy={40} r={20} fill={C.ink} />
    <circle cx={100} cy={40} r={20} fill={C.ink} />
  </g>
);

export const Ep10: React.FC = () => {
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
    const tw = w('o1', 'two');
    const bt = w('o2', 'button');
    const zr = w('o2', 'zero');
    const fr = w('o3', 'free');
    const kl = w('o4', 'klarna');
    const ff = w('o4', 'fifteen');
    const wh = w('o5', 'who');
    q(2, 'pop', 0.6);
    q(tw, 'cash', 0.5);
    q(bt, 'pop', 0.6);
    q(zr, 'ding', 0.6);
    q(fr, 'sting', 0.5);
    q(kl, 'pop', 0.6);
    q(ff, 'stamp', 0.7);
    q(wh, 'heart', 0.6);
    scene(0, () =>
      f < bs('o4') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}, {at: fr, pose: 'celebrate', expr: 'grin'}]} />
            {f < bt - 4 ? (
              <g>
                <Sneaker x={1000} y={480} s={1.8 * pop(f, 2, 10)} />
                <G2 x={1000} y={260} s={pop(f, tw)}><PriceTag text="$200" s={1.4} /></G2>
              </g>
            ) : (
              <Checkout x={1100} y={500} s={pop(f, bt - 4)} press={f > zr && f < zr + 8 ? 1 : 0} />
            )}
            <G2 x={1100} y={880} s={pop(f, fr)}><Text size={60} color={C.green}>free money?!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={560} y={820} s={0.7 * pop(f, kl)} label="NYSE" />
            <G2 x={560} y={200} s={pop(f, kl + 6)}><Text size={52}>Klarna IPO · Sept 2025</Text></G2>
            <G2 x={1350} y={420} s={pop(f, ff)}><Text size={140} color={C.green} stroke={C.ink} sw={10}>~$15B</Text></G2>
            <G2 x={1350} y={640} s={pop(f, wh)}><Text size={80} color={C.red}>who is paying?</Text></G2>
            <SourceTag f={f} at={ff} text="Klarna NYSE IPO, Sept 10, 2025 ($40/share)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'money'), w('o6', 'stores'), w('o6', 'traps')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['How it makes money', 'Why stores pay extra', 'The traps'].map((l, i) => (
            <Frame key={l} x={380 + i * 580} y={500} s={pop(f, pv[i] - 2)} w={500} h={420} label={l}>
              {i === 0 && <Coin s={2.4} y={-40} />}
              {i === 1 && <Shop s={0.3} y={80} />}
              {i === 2 && <Raccoon f={f} s={0.6} y={-20} mood="sneaky" />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const ck = w('c1b', 'checks');
    const ap = w('c1c', 'approved');
    const pays = [w('c1c', 'fifty'), w('c1c', 'fifty', 1) + 10, w('c1c', 'fifty', 1) + 30, w('c1c', 'four')];
    const st = w('c1d', 'store');
    const ft = w('c1e', 'free');
    const lf = w('c1e', 'lenders');
    q(ck, 'key', 0.5);
    q(ap, 'ding', 0.6);
    pays.forEach((x) => q(x, 'coin', 0.4));
    q(st, 'cash', 0.6);
    q(lf, 'buzz', 0.4);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Phone x={330} y={500} s={1 * pop(f, ck - 4)} title="PAY IN 4" value={f >= ap ? 'APPROVED' : 'checking...'} color={f >= ap ? C.green : C.ink} />
            <line x1={680} y1={560} x2={1760} y2={560} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {['today', 'week 2', 'week 4', 'week 6'].map((l, i) => (
              <G2 key={l} x={760 + i * 320} y={560} s={pop(f, pays[i])}>
                <circle r={70} fill={C.green} stroke={C.ink} strokeWidth={6} />
                <Text y={2} size={44} color="#fff">$50</Text>
                <Text y={120} size={36}>{l}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Shop x={1300} y={822} s={0.9} name="SNEAKERS" />
            <Owner f={f} x={1500} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'grin', look: -0.6}]} handItem={<MoneyStack n={4} s={0.5} y={-20} />} />
            <G2 x={1300} y={200} s={pop(f, st)}><Text size={56}>store gets ~$200 now</Text></G2>
            <G2 x={500} y={400} s={pop(f, ft)}><Bubble text={'$150 lent\nfor FREE?'} size={52} /></G2>
            <Stick f={f} x={500} y={860} s={1.1} acc={['tie', 'glasses']} seed={160} keys={[{at: 0, pose: 'shrug', expr: 'smug'}]} />
            <G2 x={500} y={640} s={pop(f, lf)}><Text size={40} color={C.red}>lenders don't do free</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 ============
  {
    const rc = w('c2b', 'raccoon');
    const tw = w('c2b', 'two');
    const th = w('c2c', 'three');
    const sx = w('c2d', 'six');
    const eng = w('c2e', 'engine');
    const fb = w('c2f', 'fancier');
    q(rc, 'boing', 0.5);
    q(tw, 'pop', 0.5);
    q(th, 'pop', 0.6);
    q(sx, 'cash', 0.5);
    q(eng, 'ding', 0.5);
    q(fb, 'stamp', 0.6);
    scene(A('c2a'), () =>
      f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={300} y1={820} x2={1300} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={560} y={820} h={ease(f, tw - 4, tw + 12, 0, 2.2 * 80)} color={C.blue} label="Credit card fee" value="~2%" w={260} />
            <Bar x={1040} y={820} h={ease(f, th - 4, th + 14, 0, 4.5 * 80)} color={C.red} label="Pay-in-4 fee" value="~3–6%" w={260} />
            <Raccoon f={f} x={1600} y={560} s={0.9 * pop(f, rc)} mood="greedy" holdCoin grab={0.5} />
            <G2 x={960} y={160} s={pop(f, sx)}><Text size={56}>On $200 sneakers: store pays ~$6–$12</Text></G2>
            <G2 x={960} y={930} s={pop(f, eng)}><Text size={48} color={C.green}>Dave pays 0% · the STORE pays the fee</Text></G2>
            <SourceTag f={f} at={th} text="CRS R48858 / CFPB BNPL market report" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <TollBooth x={960} y={820} s={1.2 * pop(f, fb)} label="PAY IN 4 FEE" />
            <Raccoon f={f} x={960} y={560} s={0.9} mood="greedy" holdCoin grab={Math.abs(Math.sin(f / 6))} />
            <G2 x={960} y={330}>
              <path d="M -60 -20 L 60 -20 L 50 -70 L 25 -40 L 0 -80 L -25 -40 L -50 -70 Z" fill={C.gold} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" opacity={pop(f, fb + 6)} />
            </G2>
            <G2 x={960} y={140} s={pop(f, fb + 10)}><Text size={52}>fancier booth · bigger bite</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 ============
  {
    const bm = w('c3b', 'more');
    const tw = w('c3c', 'two');
    const ff = w('c3c', 'fifty', 1);
    const cart = w('c3d', 'cart');
    const tk = w('c3e', 'basketball');
    const ab = w('c3f', 'abandon');
    const ev = w('c3g', 'everywhere');
    const gr = w('c3g', 'groceries');
    q(bm, 'cash', 0.6);
    q(tw, 'thud', 0.4);
    q(ff, 'ding', 0.5);
    for (let i = 0; i < 8; i++) q(cart + i * 5, 'pop2', 0.3);
    q(tk, 'pop', 0.5);
    q(ab, 'pop', 0.5);
    for (let i = 0; i < 5; i++) q(ev + i * 4, 'pop', 0.3);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Owner f={f} x={330} y={860} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: bm, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={760} y={330} s={pop(f, tw)}><Text size={130} color={C.red}>$200</Text></G2>
            <G2 x={760} y={450} s={pop(f, tw + 6)}><Text size={40}>feels expensive</Text></G2>
            <G2 x={1300} y={330} s={pop(f, ff) * (1 + 0.1 * Math.sin(f / 8))}><Text size={170} color={C.green}>$50</Text></G2>
            <G2 x={1300} y={470} s={pop(f, ff + 6)}><Text size={40}>feels easy</Text></G2>
            <Cart x={1050} y={800} s={1} items={Math.floor(lin(f, cart, cart + 40, 2, 10))} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Ticket x={400} y={300} s={1.1 * pop(f, tk)} />
            <G2 x={400} y={450} s={pop(f, tk + 6)}><Text size={36}>cards → people pay more</Text></G2>
            <Frame x={1300} y={380} s={pop(f, ab)} w={760} h={380} label="fewer abandoned carts · bigger orders">
              <Cart x={0} y={40} s={0.8} items={10} />
            </Frame>
            {f >= ev - 4 && ['CLOTHES', 'TECH', 'CONCERTS', 'GROCERIES'].map((l, i) => (
              <G2 key={l} x={300 + i * 440} y={820} s={pop(f, ev + i * 4)}>
                <rect x={-190} y={-50} width={380} height={100} rx={50} fill="#FFB3C7" stroke={C.ink} strokeWidth={5} />
                <Text size={30}>{'Pay in 4 · ' + l}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 ============
  {
    const lt = w('c4b', 'late');
    const lg = w('c4c', 'longer');
    const ts = w('c4c', 'thirty');
    const cd = w('c4d', 'cards');
    const ad = w('c4d', 'ads');
    const pl = w('c4e', 'pulls');
    [lt, lg, cd].forEach((x) => q(x, 'pop', 0.55));
    q(ts, 'stamp', 0.6);
    q(ad, 'ding', 0.4);
    q(pl, 'boing', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={56}>Other ways they earn</Text></G2>
          <Frame x={380} y={500} s={pop(f, lt)} w={520} h={500} label="late fees">
            <Calendar s={0.7} top="MISSED" year="$$" flip={0} y={-40} />
          </Frame>
          <Frame x={960} y={500} s={pop(f, lg)} w={520} h={500} label="longer plans + interest">
            <Text y={-60} size={60}>12 months</Text>
            <G2 y={40} s={pop(f, ts)}><Text size={90} color={C.red}>up to ~36%</Text></G2>
          </Frame>
          <Frame x={1540} y={500} s={pop(f, cd)} w={520} h={500} label="cards · app · ads">
            <CreditCard s={0.6} y={-80} />
            <G2 y={70} s={pop(f, ad)}><Text size={40}>stores pay to be seen</Text></G2>
          </Frame>
          <G2 x={960} y={880} s={pop(f, pl)}><Text size={48}>the "free" part pulls you in</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 ============
  {
    const stk = w('c5b', 'stacking');
    const six = w('c5c', 'six');
    const hf = w('c5d', 'half');
    const gr = w('c5e', 'groceries');
    const hd = w('c5f', 'hidden');
    const ch = w('c5f', 'change');
    q(stk, 'pop', 0.6);
    for (let i = 0; i < 4; i++) q(stk + 12 + i * 8, 'pop2', 0.4);
    q(six, 'heart', 0.6);
    q(hf, 'stamp', 0.7);
    q(gr, 'pop', 0.5);
    q(hd, 'crinkle', 0.5);
    q(ch, 'ding', 0.5);
    const cols = ['#FFB3C7', '#B8E0FF', '#C8F5D8', '#FFE08A'];
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, stk)}><Text size={60}>Trap 1: STACKING</Text></G2>
            {cols.map((c, i) => (
              <G2 key={i} x={330 + i * 330} y={480} s={0.8 * pop(f, stk + 12 + i * 8)} r={(i - 1.5) * 4}>
                <rect x={-120} y={-200} width={240} height={400} rx={30} fill={c} stroke={C.ink} strokeWidth={6} />
                <Text y={-120} size={32}>{'APP ' + (i + 1)}</Text>
                <Text y={0} size={56}>$50</Text>
                <Text y={80} size={28} color="#5B6470">{['Mon', 'Wed', 'Thu', 'Fri'][i]}</Text>
              </G2>
            ))}
            <Dave f={f} x={1650} y={860} s={1.1} sweat keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: six, pose: 'panic', expr: 'worried'}]} />
            <G2 x={960} y={880} s={pop(f, six)}><Text size={52} color={C.red}>6 payments this week · 4 apps</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {Array.from({length: 10}).map((_, i) => <G2 key={i} x={260 + i * 100} y={330} s={0.9 * pop(f, bs('c5d') + i * 2)}><Stick f={f} x={0} y={100} s={0.35} acc={[]} seed={170 + i} keys={[{at: 0, pose: 'idle', expr: i < 5 && f >= hf ? 'worried' : 'neutral'}]} /></G2>)}
            {f >= hf && <rect x={200} y={180} width={500} height={270} rx={20} fill="none" stroke={C.red} strokeWidth={8} strokeDasharray="20 12" />}
            <G2 x={700} y={540} s={pop(f, hf)}><Text size={48}>Trap 2: nearly HALF paid late</Text></G2>
            <G2 x={1500} y={320} s={pop(f, gr)}><Bread s={1.4} /><Text y={110} size={36}>Trap 3: groceries on credit</Text></G2>
            <G2 x={1000} y={780} s={pop(f, hd)}><Paper id="e10cr" text="CREDIT REPORT: ???" reveal={1} size={44} color={C.navy} w={600} h={160} /></G2>
            <G2 x={1000} y={900} s={pop(f, ch)}><Text size={36} color={C.green}>Trap 4: hidden debt (starting to change)</Text></G2>
            <SourceTag f={f} at={hf} text="LendingTree BNPL tracker (2026)" until={gr} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 ============
  {
    const bs1 = w('c6b', 'babysitter');
    const pr = w('c6b', 'parents');
    const kd = w('c6c', 'kid');
    const rl = w('c6c', 'rule');
    const fv = w('c6d', 'favorite');
    const fr = w('c6e', 'free');
    q(bs1, 'pop', 0.6);
    q(pr, 'cash', 0.5);
    q(kd, 'pop', 0.5);
    q(rl, 'coin', 0.5);
    q(fv, 'sting', 0.5);
    q(fr, 'ding', 0.6);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Sitter f={f} x={960} y={820} s={1.3 * pop(f, bs1)} keys={[{at: 0, pose: 'hips', expr: 'grin'}, {at: rl, pose: 'present', expr: 'smug', look: 0.6}, {at: fv, pose: 'point_r', expr: 'smug'}]} />
          <Owner f={f} x={400} y={820} s={1.1 * pop(f, pr)} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
          <G2 x={400} y={300} s={pop(f, pr)}><Text size={40}>parents = the store</Text></G2>
          {f >= pr && f < pr + 40 && <Bill x={400 + ease(f, pr, pr + 30) * 500} y={520} s={0.8} />}
          <Stick f={f} x={1450} y={820} s={0.7 * pop(f, kd)} acc={['hair']} seed={7} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: rl, pose: 'shrug', expr: 'worried'}]} />
          <G2 x={1450} y={400} s={pop(f, kd)}><Text size={40}>kid = you</Text></G2>
          {f >= rl && <Coin x={1450 - ease(f, rl, rl + 20) * 450} y={560} s={0.9} o={1 - ease(f, rl + 18, rl + 24)} />}
          <G2 x={1450} y={250} s={pop(f, rl)}><Text size={36} color={C.red}>breaks a rule → pays</Text></G2>
          <G2 x={960} y={130} s={pop(f, fr)}><Text size={52} color={C.green}>follow the rules = free babysitter</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Only if you could pay in full today', 'Turn on autopay', 'One plan at a time', 'Look at the TOTAL'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>Using it wisely</Text></G2>
          <G2 x={1620} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1080} />)}
          {cur === 4 && <G2 x={1600} y={520}><Text size={60}>$50 × 4</Text><Text y={90} size={80} color={C.red}>= $200</Text></G2>}
          {cur === 2 && <Calendar x={1600} y={520} s={0.8} top="AUTOPAY" year="ON" flip={0} />}
          {cur === 1 && <G2 x={1600} y={520}><MoneyStack n={6} s={1.2} y={60} /></G2>}
          {cur === 3 && <G2 x={1600} y={520}><rect x={-100} y={-150} width={200} height={300} rx={24} fill="#FFB3C7" stroke={C.ink} strokeWidth={6} /><Text size={40}>1 app</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 ============
  const recap = ['Free for you · the store pays more', 'Splitting the price → people buy more', 'Late fees, interest plans, stacking'];
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
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sr = w('c8e', 'series');
    const cm = w('c8f', 'comments');
    const sb = w('c8g', 'subscribe');
    const topics = ['Banks', 'Credit cards', 'Mortgages', "McDonald's", 'Taxes', 'Debt', 'Inflation', 'Gold', 'Stocks', 'Pay in 4'];
    q(sr, 'chime', 0.5);
    topics.forEach((_, i) => q(sr + 10 + i * 6, 'pop2', 0.3));
    q(cm, 'pop', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, sr)}><Text size={64}>Series 1: complete</Text></G2>
            {topics.map((tp, i) => (
              <G2 key={tp} x={300 + (i % 5) * 330} y={330 + Math.floor(i / 5) * 190} s={pop(f, sr + 10 + i * 6)}>
                <rect x={-150} y={-60} width={300} height={120} rx={20} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text x={-110} y={2} size={34} color={C.green}>✓</Text>
                <Text x={20} y={2} size={32}>{tp}</Text>
              </G2>
            ))}
            <G2 x={960} y={800} s={pop(f, cm)}>
              <rect x={-460} y={-70} width={920} height={140} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text size={48}>What should Dave explain next?</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Raccoon f={f} x={1550} y={780} s={0.6} mood="wink" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2e', 'fee') + 20;
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
