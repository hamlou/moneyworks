import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, Beach} from '../fx';
import {Bank, Bubble, Calendar, Duck, MoneyStack, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, GoldBar, Phone, Row, SubButton, Bell} from '../props2';
import {Raccoon, Ticket} from '../props3';
import {Globe, LineChart, Pizza} from '../props4';
import {Factory} from '../props7';
import {Scale, SlicePie} from '../props8';
import {Bolt, BtcCoin, Coaster, HardDrive, Key, Mystery, Notebook, ORANGE, Rig, Turbine, Whitepaper} from '../props20';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Kevin: React.FC<SP> = (p) => <Stick acc={['cap', 'shades']} seed={88} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Laszlo: React.FC<SP> = (p) => <Stick acc={['glasses']} seed={40} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string}> = ({w, h, fill = '#fff'}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
);

export const Ep20: React.FC = () => {
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
    const tt = w('o1', 'ten', 1);
    const pz = w('o1', 'pizzas');
    const td = w('o1', 'today');
    const em = w('o1', 'eight');
    q(2, 'pop', 0.6);
    q(tt, 'coin', 0.6);
    q(pz, 'pop2', 0.6);
    q(td, 'whoosh', 0.4);
    q(em, 'cash', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={300} y={880} s={1.2} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: em, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={960} y={140} s={pop(f, 2)}><Text size={56}>2010: two pizzas =</Text></G2>
          {[0, 1].map((i) => <Pizza key={i} x={760 + i * 420} y={440} s={0.9 * pop(f, 4 + i * 4)} eaten={0} />)}
          {f >= tt && <G2 x={1560} y={400} s={pop(f, tt)}><BtcCoin s={0.9} label="10,000 BTC" /></G2>}
          {f >= em && (
            <G2 x={1080} y={800} s={pop(f, em, 9, 240)}>
              <Box w={880} h={170} fill={C.yellow} />
              <Text y={-2} size={96} color={C.ink}>$840,000,000</Text>
            </G2>
          )}
          {f >= td && f < em && <G2 x={1080} y={800} s={pop(f, td)}><Text size={60}>today those coins = ...</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const kv = w('o2', 'kevin');
    const tp = w('o2', 'top');
    const oh = w('o2', 'one');
    const ef = w('o3', 'eighty');
    const th = w('o3', 'third');
    const cl = w('o3', 'calls');
    q(kv, 'pop', 0.6);
    q(tp, 'ding', 0.5);
    q(oh, 'cash', 0.6);
    q(ef, 'thud', 0.7);
    q(th, 'trombone', 0.5);
    q(cl, 'ding', 0.5);
    const pts = [60, 80, 95, 126, 110, 100, 84];
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Kevin f={f} x={330} y={880} s={1.2 * pop(f, A('o2'))} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: ef, pose: 'panic', expr: 'shock', look: 0.8}]} sweat={f >= ef} />
          <G2 x={330} y={430} s={pop(f, kv)}><Text size={52}>cousin Kevin</Text></G2>
          <LineChart x={1150} y={470} w={900} h={420} t={ease(f, A('o2'), ef + 20, 0, 1)} pts={pts} lo={50} hi={130} color={ORANGE} />
          {f >= oh && <G2 x={1150} y={190} s={pop(f, oh)}><Text size={52} color={C.green}>bought: $126,000</Text></G2>}
          {f >= tp && <G2 x={1150} y={281} s={pop(f, tp)}><circle r={20} fill={C.red} stroke={C.ink} strokeWidth={5} /></G2>}
          {f >= ef && <G2 x={1500} y={560} s={pop(f, ef)}><Text size={56} color={C.red}>now: ~$84,000</Text></G2>}
          {f >= th && <Stamp x={1400} y={800} s={pop(f, th, 9, 260)} text="-1/3" size={70} color={C.red} r={-6} />}
          {f >= cl && <G2 x={560} y={300} s={pop(f, cl)}><Bubble text="Dave?! Help!" size={40} tail="left" /></G2>}
          <SourceTag f={f} at={ef} text="Fortune, BTC price Sept 25, 2026 · record Oct 6, 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const qs = [w('o4', 'what'), w('o4', 'who'), w('o4', 'why')];
    const nb = w('o5', 'nobody');
    qs.forEach((x) => q(x, 'pop', 0.5));
    q(nb, 'sting', 0.6);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={380} y={880} s={1.25} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: nb, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <BtcCoin x={380} y={300} s={0.8 * pop(f, A('o4'))} spin={Math.cos(f / 12)} />
          {['What even is it?', 'Who controls it?', 'Why so crazy?'].map((l, i) => (
            <G2 key={l} x={1000} y={220 + i * 170} s={pop(f, qs[i])}><Bubble text={l} size={48} tail="left" /></G2>
          ))}
          {f >= nb && <Mystery x={1600} y={880} s={pop(f, nb)} />}
          {f >= nb && <G2 x={1600} y={380} s={pop(f, nb + 6)}><Text size={44}>the inventor: ???</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'notebook'), w('o6', 'lottery'), w('o6', 'million'), w('o6', 'kevin')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {['SHARED NOTEBOOK', 'PUZZLE LOTTERY', '21 MILLION', "DON'T BE KEVIN"].map((l, i) => (
            <Frame key={l} x={270 + i * 460} y={520} s={pop(f, pv[i] - 2)} w={420} h={440} label={l}>
              {i === 0 && <Notebook s={0.45} y={-40} lines={['Dave: 1', 'Gran: 2']} />}
              {i === 1 && <Ticket s={0.9} y={-40} text="GUESS #1" />}
              {i === 2 && <BtcCoin s={0.9} y={-40} />}
              {i === 3 && <Kevin f={f} x={0} y={130} s={0.6} keys={[{at: 0, pose: 'panic', expr: 'shock'}]} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Satoshi ============
  {
    const oc = w('c1b', 'october');
    const sn = w('c1b', 'satoshi');
    const np = w('c1b', 'nine');
    const tl = w('c1c', 'title');
    const an = w('c1c', 'anyone');
    const nb = w('c1c', 'no');
    const cr = w('c1d', 'crisis');
    const cl = w('c1d', 'collapsing');
    const rb = w('c1d', 'rock');
    const jn = w('c1e', 'january');
    const sw = w('c1e', 'switched');
    const ds = w('c1e', 'disappeared');
    const nk = w('c1e', 'nobody');
    const wk = w('c1f', 'walking');
    q(oc, 'paper', 0.6);
    q(sn, 'pop', 0.5);
    q(np, 'ding', 0.5);
    q(an, 'whoosh_s', 0.5);
    q(nb, 'stamp', 0.6);
    q(cr, 'thud', 0.6);
    q(cl, 'crinkle', 0.5);
    q(rb, 'trombone', 0.4);
    q(jn, 'flip', 0.5);
    q(sw, 'click', 0.7);
    q(ds, 'poof', 0.7);
    q(nk, 'cricket', 0.5);
    q(wk, 'step', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Mystery x={330} y={900} s={pop(f, A('c1a'))} />
            <G2 x={330} y={400} s={pop(f, sn)}><Text size={48}>"Satoshi Nakamoto"</Text></G2>
            {f < tl ? (
              <g>
                <Whitepaper x={1150} y={500} s={pop(f, oc)} />
                {f >= np && <G2 x={1560} y={250} s={pop(f, np)} r={8}><Stamp text="9 PAGES" size={50} color={C.blue} /></G2>}
              </g>
            ) : (
              <g>
                <Dave f={f} x={820} y={800} s={0.9} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
                <Grandma f={f} x={1640} y={800} s={0.9} keys={[{at: 0, pose: 'wave', expr: 'happy', look: -0.8}]} />
                <G2 x={1230} y={200} s={pop(f, tl)}><Text size={46}>peer-to-peer electronic cash</Text></G2>
                {f >= an && <BtcCoin x={lin(f, an, an + 30, 900, 1560)} y={520} s={0.5} spin={Math.cos(f / 5)} />}
                {f >= nb && <G2 x={1230} y={380} s={pop(f, nb)}><Bank s={0.3} label="BANK" /><XMark s={0.35} y={-60} /></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Bank x={1150} y={822} s={0.8 * pop(f, A('c1d'))} r={f >= cl ? Math.sin(f / 3) * 2 : 0} label="BANK" />
            {f >= cr && <Stamp x={1150} y={200} s={pop(f, cr, 9, 260)} text="2008 FINANCIAL CRISIS" size={56} color={C.red} r={-4} />}
            {f >= rb && <G2 x={1150} y={330} s={pop(f, rb)}><Text size={44}>trust in banks: rock bottom</Text></G2>}
            <Dave f={f} x={420} y={822} s={1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={500} y={420} s={0.9 * pop(f, A('c1e'))} top="JANUARY" year={2009} flip={0} />
            {f >= sw && <G2 x={500} y={740} s={pop(f, sw)}><Text size={48} color={C.green}>network: ON</Text></G2>}
            {f < ds + 8 && <Mystery x={1350} y={880} s={pop(f, A('c1e') + 4)} o={1 - ease(f, ds, ds + 8)} />}
            {f >= ds && f < ds + 24 && <Puff x={1350} y={640} s={2} t={lin(f, ds, ds + 20)} />}
            {f >= nk && <G2 x={1350} y={560} s={pop(f, nk)}><Text size={120} color="#5B6470">?</Text><Text y={120} size={44}>still unknown today</Text></G2>}
            {f >= wk && <G2 x={960} y={130} s={pop(f, wk)}><Text size={50}>invent money... then walk away</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Notebook ============
  {
    const nb0 = w('c2a', 'notebook');
    const bk = w('c2b', 'bank');
    const dv = w('c2b', 'dave');
    const gm = w('c2b', 'grandma');
    const ol = w('c2b', 'only');
    const cp = w('c2c', 'copy');
    const th = w('c2c', 'thousands');
    const sh = w('c2d', 'shouts');
    const pg = w('c2d', 'pays');
    const ad = w('c2d', 'adds');
    const ch = w('c2e', 'cheat');
    const mc = w('c2e', 'million');
    const nope = w('c2e', 'nope');
    const bc = w('c2f', 'blockchain');
    const bl = w('c2f', 'blocks');
    const cn = w('c2f', 'chained');
    const pn = w('c2g', 'pen');
    const pk = w('c2g', 'private');
    const rm = w('c2g', 'remember');
    q(nb0, 'paper', 0.6);
    q(dv, 'scribble', 0.5);
    q(gm, 'scribble', 0.5);
    q(ol, 'stamp', 0.5);
    q(cp, 'flip', 0.5);
    q(th, 'pop', 0.5);
    q(sh, 'crowd', 0.4);
    q(ad, 'scribble', 0.6);
    q(mc, 'scribble', 0.6);
    q(nope, 'buzz', 0.6);
    q(bc, 'ding', 0.6);
    q(cn, 'clank', 0.6);
    q(pk, 'key', 0.7);
    q(rm, 'ding', 0.5);
    const copies = [[260, 330], [700, 250], [1220, 250], [1660, 330], [420, 720], [1500, 720]];
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Notebook x={1050} y={480} s={pop(f, nb0 - 4)} title="THE BANK'S NOTEBOOK" lines={['Dave: $100', 'Grandma: $50']} shown={(f >= dv ? 1 : 0) + (f >= gm ? 1 : 0)} />
            <Banker f={f} x={420} y={860} s={1.2 * pop(f, bk - 4)} keys={[{at: 0, pose: 'hold', expr: 'smug', look: 0.8}]} />
            {f >= ol && <Stamp x={1050} y={880} s={pop(f, ol, 9, 260)} text="ONLY THE BANK WRITES" size={50} color={C.red} r={-3} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {copies.map(([x, y], i) => (
              <Notebook key={i} x={x} y={y} s={0.42 * pop(f, cp + i * 4)} title="COPY" lines={['Dave: $100', 'Gran: $50', 'Dave>Gran 1']} shown={f >= ad ? 3 : 2} hl={f >= ad && f < ad + 40 ? 2 : -1} />
            ))}
            {f >= th && <G2 x={960} y={560} s={pop(f, th)}><Globe f={f} s={0.9} /></G2>}
            {f < cp && <Text x={960} y={300} size={60}>give EVERYONE a copy</Text>}
            {f >= sh && <Dave f={f} x={960} y={1000} s={0.75} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />}
            {f >= pg && <G2 x={960} y={120} s={pop(f, pg)}><Bubble text="Dave pays Grandma 1 bitcoin!" size={42} tail="down" /></G2>}
            {f >= ad && <G2 x={960} y={830} s={pop(f, ad)}><Text size={40} color={C.green}>every copy updates</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'suspicious', look: 0.8}, {at: nope, pose: 'facepalm', expr: 'sad'}]} />
            <Notebook x={1000} y={480} s={0.9 * pop(f, A('c2e'))} title="DAVE'S COPY" lines={['Dave: $100', 'Gran: $50', 'Dave: 1,000,000!']} shown={f >= mc ? 3 : 2} strike={f >= nope ? 2 : -1} />
            {f >= ch && f < nope && <G2 x={1000} y={130} s={pop(f, ch)}><Text size={52}>cheat?</Text></G2>}
            {f >= nope && <Stamp x={1000} y={130} s={pop(f, nope, 9, 260)} text="NOPE" size={80} color={C.red} r={-6} />}
            {f >= nope && [0, 1, 2].map((i) => <Notebook key={i} x={1620} y={250 + i * 250} s={0.3} title="COPY" lines={['Dave: $100', 'Gran: $50']} />)}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={pop(f, bc - 6)}><Text size={90} color={ORANGE} stroke={C.ink} sw={8}>BLOCKCHAIN</Text></G2>
            {[0, 1, 2, 3].map((i) => (
              <G2 key={i} x={330 + i * 420} y={560} s={pop(f, (f >= bl ? bl : A('c2f') + 6) + i * 5)}>
                <Box w={300} h={260} />
                <Text y={-80} size={36} color="#5B6470">BLOCK {i + 1}</Text>
                {[0, 1, 2].map((k) => <line key={k} x1={-110} x2={110} y1={-20 + k * 45} y2={-20 + k * 45} stroke="#C9CED6" strokeWidth={10} strokeLinecap="round" />)}
              </G2>
            ))}
            {f >= cn && [0, 1, 2].map((i) => (
              <G2 key={i} x={540 + i * 420} y={560} s={pop(f, cn + i * 5)}>
                <ellipse cx={-22} rx={34} ry={20} fill="none" stroke={C.ink} strokeWidth={10} />
                <ellipse cx={22} rx={34} ry={20} fill="none" stroke={C.gray} strokeWidth={10} />
              </G2>
            ))}
            {f >= cn && <G2 x={960} y={830} s={pop(f, cn + 10)}><Text size={44}>pages in order, chained together</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: pk, pose: 'present', expr: 'grin', look: 0.8}]} />
            {f < pk && <G2 x={1100} y={450} s={pop(f, pn)}><path d="M -150 40 L 150 -40" stroke={C.blue} strokeWidth={24} strokeLinecap="round" /><XMark s={0.3} /></G2>}
            {f >= pk && <Key x={1150} y={450} s={1.6 * pop(f, pk)} r={-12} />}
            {f >= pk && <G2 x={1150} y={720} s={pop(f, pk + 8)}><Text size={52}>PRIVATE KEY = your secret signature</Text></G2>}
            {f >= rm && <G2 x={1150} y={180} s={pop(f, rm)}><Text size={44} color={C.red}>remember this one!</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Mining ============
  {
    const np = w('c3a', 'next');
    const mn = w('c3b', 'mining');
    const sv = w('c3b', 'shovels');
    const tn = w('c3c', 'ten');
    const pz = w('c3c', 'puzzle');
    const gs = w('c3c', 'guess');
    const wr = w('c3c', 'wrong');
    const tr = w('c3c', 'trillions');
    const lt = w('c3d', 'lottery');
    const tk = w('c3d', 'ticket');
    const mo = w('c3d', 'more');
    const wn = w('c3e', 'winner');
    const pr = w('c3e', 'prize');
    const bn = w('c3e', 'born');
    const ex = w('c3f', 'expensive');
    const ww = w('c3f', 'world');
    q(np, 'pop', 0.5);
    q(mn, 'ding', 0.5);
    q(sv, 'buzz', 0.5);
    q(tn, 'tick', 0.5);
    q(pz, 'pop', 0.5);
    q(wr, 'buzz', 0.4);
    q(tr, 'whoosh', 0.5);
    q(lt, 'ding', 0.5);
    q(tk, 'paper', 0.5);
    q(mo, 'pop2', 0.5);
    q(wn, 'crowd', 0.5);
    q(pr, 'coin', 0.7);
    q(bn, 'chime', 0.5);
    q(ex, 'cash', 0.5);
    q(ww, 'thud', 0.5);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
            <Notebook x={1150} y={430} s={0.7 * pop(f, A('c3a'))} title="NEXT PAGE" lines={['???']} shown={f >= np ? 1 : 0} />
            {f >= mn && <G2 x={1150} y={800} s={pop(f, mn)}><Text size={60}>= MINING</Text></G2>}
            {f >= sv && (
              <G2 x={1650} y={500} s={pop(f, sv)}>
                <path d="M 0 -150 L 0 100" stroke="#8C5A33" strokeWidth={20} strokeLinecap="round" />
                <path d="M -60 90 L 60 90 L 50 190 Q 0 220 -50 190 Z" fill={C.gray} stroke={C.ink} strokeWidth={6} />
                <XMark s={0.4} y={30} />
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1, 2].map((i) => <Rig key={i} f={f} x={420 + i * 540} y={560} s={pop(f, A('c3c') + i * 5)} on={f >= pz} />)}
            <Calendar x={200} y={180} s={0.5 * pop(f, tn)} top="EVERY" year="~10 min" flip={0} />
            {f >= gs && (
              <G2 x={960} y={200} s={pop(f, gs)}>
                <Box w={760} h={130} />
                <text x={-340} y={6} fontFamily="monospace" fontWeight={700} fontSize={52} fill={C.ink} dominantBaseline="middle">{`guess: ${String((f * 7919) % 9999999).padStart(7, '0')}`}</text>
                {f >= wr && <Text x={260} y={4} size={50} color={C.red}>WRONG</Text>}
              </G2>
            )}
            {f >= tr && <G2 x={960} y={880} s={pop(f, tr)}><Text size={52} color={C.blue}>trillions of guesses per second</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c3d'))}><Text size={60}>a giant LOTTERY</Text></G2>
            <Rig f={f} x={400} y={520} s={0.6} />
            {f >= tk && <Ticket x={400} y={760} s={0.8 * pop(f, tk)} text="1 GUESS" />}
            <G2 x={1300} y={520}>{[0, 1, 2].map((i) => <Rig key={i} f={f} x={(i - 1) * 240} y={0} s={0.55 * pop(f, (f >= mo ? mo : 1e9) + i * 4)} />)}</G2>
            {f >= mo && [0, 1, 2, 3, 4].map((i) => <Ticket key={i} x={1120 + i * 90} y={740 + (i % 2) * 40} s={0.6 * pop(f, mo + 6 + i * 3)} r={-10 + i * 5} text="GUESS" />)}
            {f >= mo && <G2 x={1300} y={300} s={pop(f, mo)}><Text size={40}>more computers = more tickets</Text></G2>}
            {f >= wn && (
              <g>
                <rect x={0} y={0} width={1920} height={1080} fill="rgba(251,246,236,0.85)" />
                <Rig f={f} x={700} y={560} s={pop(f, wn)} label="WINNER!" />
                <Sparkle x={560} y={380} t={(f % 30) / 30} s={0.8} />
                {f >= pr && <BtcCoin x={1250} y={420} s={pop(f, pr)} spin={Math.cos((f - pr) / 6)} label="NEW BITCOIN" />}
                {f >= wn && <Notebook x={1250} y={800} s={0.4 * pop(f, wn + 6)} title="PAGE WRITTEN" lines={['...', '...']} />}
                {f >= bn && <G2 x={960} y={130} s={pop(f, bn)}><Text size={52} color={C.green}>that's how new coins are born</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Raccoon f={f} x={420} y={820} s={1.1 * pop(f, A('c3f'))} mood="sneaky" />
            <G2 x={420} y={440} s={pop(f, A('c3f') + 4)}><Bubble text="rewrite the notebook?" size={40} tail="down" /></G2>
            {f >= ex && <G2 x={1000} y={200} s={pop(f, ex)}><Text size={56} color={C.red}>cheating = super expensive</Text></G2>}
            {f >= ex && <G2 x={1400} y={600} s={pop(f, ex + 8)}><Globe f={f} s={1.2} /></G2>}
            {f >= ww && <G2 x={1400} y={880} s={pop(f, ww)}><Text size={44}>beat the whole world, again and again</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 21 million ============
  {
    const tw = w('c4a', 'twenty');
    const ev = w('c4a', 'ever', 1);
    const dk = w('c4b', 'duck');
    const cn = w('c4b', 'cant');
    const cd = w('c4b', 'code');
    const hf = w('c4c', 'half');
    const hv = w('c4c', 'halving');
    const bars = [w('c4d', 'fifty'), w('c4d', 'twenty'), w('c4d', 'twelve'), w('c4d', 'six'), w('c4e', 'three')];
    const ap = w('c4e', 'april');
    const mr = w('c4f', 'march');
    const tm = w('c4f', 'twenty');
    const lm = w('c4f', 'last');
    const yr = w('c4f', 'year', 1);
    const gd = w('c4g', 'gold');
    const hg = w('c4g', 'hard');
    q(tw, 'cash', 0.6);
    q(ev, 'stamp', 0.7);
    q(dk, 'quack', 0.7);
    q(cn, 'buzz', 0.5);
    q(cd, 'key', 0.6);
    q(hf, 'rip', 0.6);
    q(hv, 'ding', 0.6);
    bars.forEach((x) => q(x, 'pop', 0.5));
    q(ap, 'stamp', 0.5);
    q(mr, 'ding', 0.5);
    q(lm, 'tick', 0.5);
    q(gd, 'coin', 0.6);
    q(hg, 'thud', 0.4);
    const vals = [50, 25, 12.5, 6.25, 3.125];
    const yrs = ['2009', '2012', '2016', '2020', '2024'];
    scene(A('c4a'), () =>
      f < A('c4b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <BtcCoin x={960} y={330} s={1.3 * pop(f, A('c4a'))} spin={Math.cos(f / 10)} />
            {f >= tw && <G2 x={960} y={660} s={pop(f, tw)}><Text size={150} color={ORANGE} stroke={C.ink} sw={10}>21,000,000</Text></G2>}
            {f >= ev && <Stamp x={1500} y={850} s={pop(f, ev, 9, 260)} text="EVER." size={70} color={C.red} r={-8} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Duck f={f} x={420} y={620} s={1.2 * pop(f, A('c4b'))} />
            {f >= dk && <G2 x={420} y={370} s={pop(f, dk)}><Bubble text="new money!" size={42} tail="down" /></G2>}
            <G2 x={420} y={880} s={pop(f, A('c4b') + 4)}><Text size={44}>banks: can create money</Text></G2>
            {f >= cn && <BtcCoin x={1350} y={380} s={pop(f, cn)} />}
            {f >= cd && (
              <G2 x={1350} y={740} s={pop(f, cd)}>
                <rect x={-380} y={-90} width={760} height={180} rx={16} fill="#1F2A36" stroke={C.ink} strokeWidth={6} />
                <text x={-340} y={-20} fontFamily="monospace" fontWeight={700} fontSize={40} fill="#6EF0A8" dominantBaseline="middle">MAX_SUPPLY =</text>
                <text x={-340} y={40} fontFamily="monospace" fontWeight={700} fontSize={40} fill="#FFD166" dominantBaseline="middle">21,000,000</text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c4c'))}><Text size={60}>{f >= hv ? 'THE HALVING' : "the miners' prize..."}</Text></G2>
            {f >= hf && f < bars[0] && <G2 x={960} y={500} s={pop(f, hf)}><BtcCoin s={1.2} /><path d="M 0 -160 L 0 160" stroke={C.red} strokeWidth={14} strokeDasharray="20 14" /><Text y={230} size={48}>cut in half every ~4 years</Text></G2>}
            <line x1={220} y1={880} x2={1700} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {vals.map((v, i) => (
              <g key={i}>
                <Bar x={340 + i * 320} y={880} h={ease(f, bars[i] - 4, bars[i] + 12, 2, v * 11)} color={i === 4 ? C.red : ORANGE} label={yrs[i]} value={`${v} BTC`} w={200} />
              </g>
            ))}
            {f >= ap && <Stamp x={1620} y={380} s={pop(f, ap, 9, 260)} text="APRIL 2024" size={46} color={C.blue} r={-6} />}
            <SourceTag f={f} at={ap} text="Halving #4: block 840,000, Apr 20, 2024" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={pop(f, A('c4f'))}><Text size={56}>March 2026: 20 millionth bitcoin mined</Text></G2>
            <G2 x={960} y={480}>
              <rect x={-760} y={-70} width={1520} height={140} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-750} y={-60} width={1500 * ease(f, A('c4f'), tm + 20, 0, 20 / 21)} height={120} rx={24} fill={ORANGE} />
              <Text x={-300} y={4} size={56} color="#fff" stroke={C.ink} sw={6}>{f >= tm ? '20,000,000 (95%)' : ''}</Text>
            </G2>
            {f >= lm && <G2 x={1560} y={660} s={pop(f, lm)}><Text size={44} color={C.red}>last 1 million → slower and slower</Text></G2>}
            {f >= yr && <Calendar x={1560} y={880} s={0.55 * pop(f, yr)} top="LAST BITS" year="~2140" flip={0} />}
            <Dave f={f} x={380} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
            <SourceTag f={f} at={mr} text="The Block / CoinDesk, Mar 9, 2026 (block 939,999)" until={lm + 60} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <GoldBar x={600} y={480} s={2.4 * pop(f, gd - 4)} />
            <BtcCoin x={1320} y={480} s={1.2 * pop(f, A('c4g'))} />
            <Text x={960} y={480} size={80}>≈</Text>
            {f >= hg && <G2 x={960} y={800} s={pop(f, hg)}><Text size={52}>hard to get · supply grows slower</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Pizza & price ============
  {
    const nt = w('c5a', 'nothing');
    const ma = w('c5b', 'may');
    const lz = w('c5b', 'laszlo');
    const tt = w('c5b', 'ten');
    const sd = w('c5b', 'someone');
    const fd = w('c5c', 'forty');
    const pd = w('c5c', 'pizza');
    const cl = w('c5d', 'climbing');
    const yr = [w('c5d', 'thirteen'), w('c5d', 'seventeen'), w('c5d', 'one', 1)];
    const rc = w('c5e', 'record');
    const ls = w('c5f', 'eighty');
    const em = w('c5g', 'eight');
    const hs = w('c5g', 'history');
    q(nt, 'cricket', 0.5);
    q(ma, 'flip', 0.5);
    q(lz, 'pop', 0.5);
    q(tt, 'coin', 0.6);
    q(sd, 'ding', 0.6);
    q(fd, 'cash', 0.5);
    q(pd, 'crowd', 0.5);
    q(cl, 'whoosh', 0.4);
    yr.forEach((x) => q(x, 'pop', 0.5));
    q(rc, 'stamp', 0.7);
    q(ls, 'thud', 0.5);
    q(em, 'cash', 0.7);
    q(hs, 'sting', 0.6);
    const pts = [0.1, 0.3, 1, 1.1, 5, 19.7, 7, 10, 69, 16, 42, 126, 84];
    const idx = [3, 5, 8, 11, 12];
    const shownT = f < yr[0] ? 0.18 : f < yr[1] ? 0.4 : f < yr[2] ? 0.66 : f < rc ? 0.8 : f < ls ? 0.92 : 1;
    scene(A('c5a'), () =>
      f < A('c5b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <BtcCoin x={960} y={420} s={1.3 * pop(f, A('c5a'))} />
            {f >= nt && <G2 x={960} y={760} s={pop(f, nt)}><Text size={70} color="#5B6470">worth: almost $0</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Laszlo f={f} x={380} y={880} s={1.2 * pop(f, A('c5b'))} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.8}, {at: sd, pose: 'celebrate', expr: 'grin'}]} />
            <Calendar x={1700} y={220} s={0.6 * pop(f, ma)} top={f >= pd ? 'PIZZA DAY' : 'MAY 22'} year={2010} flip={0} />
            {f >= lz && <G2 x={380} y={420} s={pop(f, lz)}><Text size={44}>Laszlo, programmer</Text></G2>}
            {f >= tt && <G2 x={900} y={300} s={pop(f, tt)}><Bubble text={'10,000 bitcoin\nfor 2 pizzas?'} size={44} tail="left" /></G2>}
            {f >= sd && [0, 1].map((i) => <Pizza key={i} x={1100 + i * 380} y={700} s={0.75 * pop(f, sd + i * 5)} eaten={0} />)}
            {f >= fd && <G2 x={1290} y={960} s={pop(f, fd)}><Text size={48} color={C.green}>worth then: about $41</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c5d'))}><Text size={56}>price of 1 bitcoin</Text></G2>
            <LineChart x={900} y={540} w={1300} h={560} t={shownT} pts={pts} lo={0} hi={130} color={ORANGE} />
            {[['~$1,000', '2013'], ['~$20,000', '2017'], ['$69,000', '2021'], ['$126,000', 'Oct 2025'], ['~$84,000', 'Sept 2026']].map(([v, y], i) => {
              const at = [yr[0], yr[1], yr[2], rc, ls][i];
              const px = 250 + (idx[i] / (pts.length - 1)) * 1300;
              const py = 820 - (pts[idx[i]] / 130) * 560;
              return f >= at ? (
                <G2 key={i} x={px} y={py - 70} s={pop(f, at)}>
                  <Text size={i >= 3 ? 44 : 36} color={i === 3 ? C.green : i === 4 ? C.red : C.ink}>{v}</Text>
                  <Text y={40} size={26} color="#5B6470">{y}</Text>
                </G2>
              ) : null;
            })}
            {f >= rc && f < ls && <Stamp x={650} y={320} s={pop(f, rc, 9, 260)} text="RECORD" size={50} color={C.green} r={-6} />}
            <SourceTag f={f} at={ls} text="Fortune: $84,413 on Sept 25, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1].map((i) => <Pizza key={i} x={640 + i * 640} y={420} s={pop(f, A('c5g') + i * 4)} eaten={0} />)}
            {f >= em && (
              <G2 x={960} y={760} s={pop(f, em, 9, 240)}>
                <Box w={900} h={170} fill={C.yellow} />
                <Text size={96}>$840,000,000</Text>
              </G2>
            )}
            {f >= hs && <G2 x={960} y={940} s={pop(f, hs)}><Text size={48} color={C.red}>the most expensive dinner in history</Text></G2>}
            <SourceTag f={f} at={em} text="10,000 BTC × $84,413 ≈ $844M" until={hs} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Wild ride ============
  {
    const rc = w('c6a', 'roller');
    const dn = w('c6a', 'down');
    const sn = w('c6b', 'sixty');
    const sx = w('c6b', 'sixteen');
    const pc = w('c6b', 'seventy');
    const wd = w('c6c', 'wild');
    const bs2 = w('c6c', 'buying');
    const np = w('c6c', 'profits');
    const ni = w('c6c', 'interest');
    const nx = w('c6c', 'next');
    const jn = w('c6d', 'january');
    const el = w('c6d', 'eleven');
    const ac = w('c6e', 'account');
    const pi = w('c6e', 'poured');
    const cm = w('c6e', 'climbed');
    const fn = w('c6f', 'funds');
    const rk = w('c6f', 'risky');
    const tk = w('c6g', 'talking');
    const fr = w('c6g', 'friends');
    const nw = w('c6g', 'news');
    const mo = w('c6g', 'missing');
    const tt = w('c6h', 'ten');
    const tp = w('c6h', 'top');
    const sv = w('c6h', 'six');
    const hy = w('c6h', 'hype');
    q(rc, 'boing', 0.5);
    q(dn, 'whoosh', 0.6);
    q(sn, 'ding', 0.5);
    q(sx, 'thud', 0.7);
    q(pc, 'stamp', 0.6);
    q(wd, 'pop', 0.5);
    q(np, 'buzz', 0.4);
    q(ni, 'buzz', 0.4);
    q(nx, 'ding', 0.5);
    q(jn, 'flip', 0.5);
    q(el, 'stamp', 0.7);
    q(ac, 'click', 0.6);
    q(pi, 'cash', 0.6);
    q(fn, 'paper', 0.5);
    q(rk, 'sting', 0.5);
    q(fr, 'pop', 0.5);
    q(nw, 'pop', 0.5);
    q(mo, 'dream', 0.5);
    q(tt, 'cash', 0.6);
    q(sv, 'trombone', 0.6);
    q(hy, 'stamp', 0.7);
    const cpts = [10, 40, 25, 69, 16, 50, 126, 84];
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Coaster x={960} y={560} s={pop(f, A('c6a'))} t={f < A('c6b') ? lin(f, A('c6a'), dn + 20, 0, 0.55) : ease(f, sn, sx + 10, 0.4, 0.58)} pts={cpts} />
            {f >= rc && f < A('c6b') && <G2 x={960} y={130} s={pop(f, rc)}><Text size={60}>a roller coaster</Text></G2>}
            {f >= sn && <G2 x={760} y={200} s={pop(f, sn)}><Text size={52} color={C.green}>2021: $69,000</Text></G2>}
            {f >= sx && <G2 x={960} y={940} s={pop(f, sx)}><Text size={52} color={C.red}>2022: ~$16,000</Text></G2>}
            {f >= pc && <Stamp x={1500} y={180} s={pop(f, pc, 9, 260)} text="-75%+" size={70} color={C.red} r={-6} />}
            <SourceTag f={f} at={sn} text="CoinMarketCap: $69K (Nov 2021) → $15.5K (Nov 2022)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, wd - 4)}><Text size={60}>why so wild?</Text></G2>
            {f >= bs2 && (
              <G2 x={560} y={560} s={pop(f, bs2)}>
                <Stick f={f} x={-150} y={250} s={0.9} acc={['cap']} seed={21} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
                <Stick f={f} x={150} y={250} s={0.9} acc={['ponytail']} seed={44} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}]} />
                <BtcCoin y={-160} s={0.6} spin={Math.cos(f / 6)} />
              </G2>
            )}
            {f >= np && <G2 x={1400} y={380} s={pop(f, np)}><Text size={52}>company profits:</Text><XMark x={260} s={0.12} /></G2>}
            {f >= ni && <G2 x={1400} y={500} s={pop(f, ni)}><Text size={52}>interest:</Text><XMark x={180} s={0.12} /></G2>}
            {f >= nx && <G2 x={1400} y={700} s={pop(f, nx)}><Box w={640} h={140} fill={C.yellow} /><Text size={40}>price = what the next</Text><Text y={44} size={40}>person will pay</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Bank x={520} y={822} s={0.75 * pop(f, A('c6d'))} label="SEC" />
            <Calendar x={180} y={180} s={0.5 * pop(f, jn)} top="JANUARY" year={2024} flip={0} />
            {f >= el && <Stamp x={520} y={250} s={pop(f, el, 9, 260)} text="11 BITCOIN ETFs" size={50} color={C.green} r={-4} />}
            {f >= ac && <Phone x={1250} y={500} s={1.1 * pop(f, ac)} title="INVESTMENTS" value="BTC ETF" color={ORANGE} />}
            {f >= pi && [0, 1, 2].map((i) => <Banker key={i} f={f} x={1540 + i * 120} y={822} s={0.7} keys={[{at: 0, pose: 'carry', expr: 'grin', look: -0.8}]} />)}
            {f >= cm && <G2 x={1650} y={380} s={pop(f, cm)}><Text size={48} color={C.green}>price climbed</Text></G2>}
            {f >= fn && (
              <G2 x={960} y={140} s={pop(f, fn)}>
                <Box w={1100} h={130} />
                <Text size={44}>"we approved the funds, NOT bitcoin"</Text>
              </G2>
            )}
            {f >= rk && <G2 x={1250} y={870} s={pop(f, rk)}><Text size={46} color={C.red}>still very risky</Text></G2>}
            <SourceTag f={f} at={el} text="SEC, Chair Gensler statement, Jan 10, 2024" until={fn} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Kevin f={f} x={960} y={822} s={1.1 * pop(f, A('c6g'))} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: mo, pose: 'panic', expr: 'worried'}, {at: tt, pose: 'celebrate', expr: 'grin'}, {at: sv, pose: 'facepalm', expr: 'sad'}]} sweat={f >= sv} />
            {f < tt ? (
              <g>
                {f >= tk && <G2 x={960} y={180} s={pop(f, tk)}><Text size={56}>everyone: "BITCOIN!"</Text></G2>}
                {f >= fr && [0, 1].map((i) => <Stick key={i} f={f} x={300 + i * 200} y={822} s={0.9} acc={i ? ['ponytail'] : ['cap']} seed={50 + i} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />)}
                {f >= fr && <G2 x={400} y={400} s={pop(f, fr)}><Bubble text="I'm rich!" size={40} tail="down" /></G2>}
                {f >= nw && (
                  <G2 x={1550} y={500} s={pop(f, nw)}>
                    <rect x={-220} y={-150} width={440} height={300} rx={16} fill="#1F2A36" stroke={C.ink} strokeWidth={6} />
                    <Text y={-60} size={36} color="#fff">NEWS</Text>
                    <Text y={20} size={56} color="#6EF0A8">BTC RECORD!</Text>
                  </G2>
                )}
                {f >= mo && <G2 x={960} y={400} s={pop(f, mo)}><Bubble text="I'm missing out!" size={44} tail="down" /></G2>}
              </g>
            ) : (
              <g>
                <G2 x={500} y={500} s={pop(f, tt)}><MoneyStack n={6} s={1} label={f >= sv ? '$6,700' : '$10,000'} /></G2>
                {f >= tp && <G2 x={500} y={200} s={pop(f, tp)}><Text size={46}>bought at the top: $126K</Text></G2>}
                {f >= sv && <G2 x={1450} y={400} s={pop(f, sv)}><Text size={60} color={C.red}>worth now: ~$6,700</Text></G2>}
                {f >= hy && <Stamp x={1450} y={650} s={pop(f, hy, 9, 260)} text="BOUGHT THE HYPE" size={54} color={C.red} r={-5} />}
              </g>
            )}
            <SourceTag f={f} at={sv} text="$10,000 × 84,413 ÷ 126,198 ≈ $6,690" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Lost keys & scams ============
  {
    const dk = w('c7a', 'dark');
    const pk = w('c7a', 'private');
    const ls = w('c7b', 'lose');
    const fv = w('c7b', 'forever');
    const bk = w('c7b', 'bank');
    const fp = w('c7b', 'forgot');
    const ch = w('c7c', 'chainalysis');
    const two = w('c7c', 'two');
    const six = w('c7c', 'six');
    const wl = w('c7d', 'wales');
    const hd = w('c7d', 'hard');
    const lf = w('c7d', 'landfill');
    const dg = w('c7d', 'dig');
    const sc = w('c7e', 'scammers');
    const el = w('c7e', 'eleven');
    const fb = w('c7e', 'according');
    const rcd = w('c7e', 'record');
    const fa = w('c7f', 'apps');
    const rm = w('c7f', 'romances');
    const hp = w('c7f', 'helpers');
    const rac = w('c7g', 'raccoon');
    const cs = w('c7g', 'costume');
    q(dk, 'sting', 0.5);
    q(pk, 'key', 0.6);
    q(ls, 'whoosh', 0.5);
    q(fv, 'poof', 0.7);
    q(bk, 'buzz', 0.4);
    q(fp, 'buzz', 0.4);
    q(ch, 'paper', 0.5);
    q(two, 'pop', 0.5);
    q(six, 'ding', 0.6);
    q(wl, 'pop', 0.5);
    q(hd, 'clank', 0.6);
    q(lf, 'thud', 0.6);
    q(dg, 'step', 0.5);
    q(sc, 'sting', 0.5);
    q(el, 'cash', 0.7);
    q(rcd, 'stamp', 0.7);
    q(fa, 'pop', 0.5);
    q(rm, 'heart', 0.5);
    q(hp, 'pop', 0.5);
    q(rac, 'pop', 0.6);
    q(cs, 'boing', 0.6);
    const fall = f >= ls ? ease(f, ls, ls + 20, 0, 1) : 0;
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: fv, pose: 'panic', expr: 'shock', look: 0.8}]} sweat={f >= fv} />
            <G2 x={960} y={120} s={pop(f, dk - 4)}><Text size={60} color="#5B6470">the dark side</Text></G2>
            {f < fv + 10 && <Key x={1000} y={400 + fall * 500} s={1.4 * pop(f, pk - 6)} r={-12 + fall * 120} o={1 - ease(f, fv, fv + 10)} />}
            {f >= fv && f < fv + 24 && <Puff x={1000} y={800} s={2} t={lin(f, fv, fv + 20)} />}
            {f >= fv && <G2 x={1100} y={380} s={pop(f, fv)}><Text size={80} color={C.red}>GONE. FOREVER.</Text></G2>}
            {f >= bk && <G2 x={1100} y={560} s={pop(f, bk)}><Text size={44}>no bank to call</Text></G2>}
            {f >= fp && (
              <G2 x={1100} y={700} s={pop(f, fp)}>
                <rect x={-230} y={-44} width={460} height={88} rx={44} fill={C.blue} stroke={C.ink} strokeWidth={5} />
                <Text size={36} color="#fff">forgot password?</Text>
                <XMark s={0.18} />
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c7c'))}><Text size={56}>all bitcoin that will ever exist: 21M</Text></G2>
            <SlicePie x={700} y={560} s={pop(f, A('c7c') + 4)} rad={300} t={ease(f, two, two + 20, 0.001, 1)} slices={[{v: 3.7 / 21, c: '#5B6470', l: 'LOST'}, {v: 17.3 / 21, c: ORANGE}]} pop={0} />
            {f >= two && <G2 x={1450} y={450} s={pop(f, two)}><Text size={60}>2.3 – 3.7 million</Text><Text y={70} size={44}>probably lost for good</Text></G2>}
            {f >= six && <G2 x={1450} y={700} s={pop(f, six)}><Text size={52} color={C.red}>up to ~1 in 6 coins</Text></G2>}
            <SourceTag f={f} at={ch} text="Chainalysis estimate: 2.3M–3.7M BTC lost" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={1150} y={822} s={pop(f, A('c7d'))}>
              <path d="M -500 0 Q -400 -260 -150 -300 Q 50 -340 250 -260 Q 450 -200 520 0 Z" fill="#A89B82" stroke={C.ink} strokeWidth={6} />
              {[[-300, -120, C.blue], [-100, -220, C.red], [120, -180, C.yellow], [320, -90, C.green], [-20, -80, C.gray]].map(([x, y, c], i) => (
                <rect key={i} x={Number(x)} y={Number(y)} width={70} height={50} rx={6} fill={String(c)} stroke={C.ink} strokeWidth={4} transform={`rotate(${i * 17 - 30},${x},${y})`} />
              ))}
              {f >= lf && <Text y={-380} size={48}>landfill</Text>}
            </G2>
            {f >= hd && <HardDrive x={lin(f, hd, hd + 25, 400, 1150)} y={lin(f, hd, hd + 25, 400, 640)} s={0.6} r={lin(f, hd, hd + 25, 0, 200)} label="8,000 BTC" />}
            <Stick f={f} x={380} y={822} s={1.1 * pop(f, wl - 6)} acc={['cap']} seed={62} keys={[{at: 0, pose: 'present', expr: 'neutral', look: 0.8}, {at: dg, pose: 'carry', expr: 'tired', look: 0.8}]} sweat={f >= dg} />
            {f >= wl && <G2 x={380} y={440} s={pop(f, wl)}><Text size={44}>a man in Wales</Text></G2>}
            {f >= dg && <G2 x={1150} y={180} s={pop(f, dg)}><Text size={48} color={C.red}>years of trying to dig it up</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < fa ? (
              <g>
                <G2 x={960} y={180} s={pop(f, sc - 4)}><Text size={60}>crypto fraud reported in 2025</Text></G2>
                {f >= el && (
                  <G2 x={960} y={480} s={pop(f, el, 9, 240)}>
                    <Box w={1000} h={220} fill={C.yellow} />
                    <Text size={120}>$11.4 BILLION</Text>
                  </G2>
                )}
                {f >= fb && <G2 x={960} y={720} s={pop(f, fb)}><Text size={48}>source: FBI crime report</Text></G2>}
                {f >= rcd && <Stamp x={1500} y={820} s={pop(f, rcd, 9, 260)} text="A RECORD" size={54} color={C.red} r={-6} />}
              </g>
            ) : (
              <g>
                <G2 x={960} y={120}><Text size={56}>common scams</Text></G2>
                <Frame x={380} y={540} s={pop(f, fa)} w={460} h={560} label="fake investing apps">
                  <Phone s={0.9} y={-40} title="SUPER CRYPTO" value="+900%" color={C.green} />
                </Frame>
                {f >= rm && (
                  <Frame x={960} y={540} s={pop(f, rm)} w={460} h={560} label="romance → invest">
                    <path d="M 0 60 C -160 -60 -80 -200 0 -110 C 80 -200 160 -60 0 60 Z" transform="translate(0,-40)" fill={C.red} stroke={C.ink} strokeWidth={6} />
                  </Frame>
                )}
                {f >= hp && (
                  <Frame x={1540} y={540} s={pop(f, hp)} w={460} h={560} label="fake 'recovery' help">
                    <Stick f={f} x={0} y={130} s={0.8} acc={['tie']} seed={77} keys={[{at: 0, pose: 'present', expr: 'smug'}]} />
                  </Frame>
                )}
              </g>
            )}
            <SourceTag f={f} at={el} text="FBI IC3 2025 Internet Crime Report: $11.37B crypto fraud" until={fa} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Raccoon f={f} x={960} y={760} s={1.5 * pop(f, A('c7g'))} mood="sneaky" hood={f >= cs} holdCoin />
            {f >= cs && <G2 x={960} y={200} s={pop(f, cs)}><Text size={60}>same raccoon, new costume</Text></G2>}
            {f >= cs && <Sparkle x={1200} y={400} t={(f % 30) / 30} s={0.8} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Energy ============
  {
    const el = w('c8a', 'electricity');
    const cb = w('c8b', 'cambridge');
    const ot = w('c8b', 'one');
    const hp = w('c8b', 'half');
    const cr = w('c8c', 'critics');
    const pl = w('c8c', 'pollution');
    const gr = w('c8c', 'grids');
    const sp = w('c8d', 'supporters');
    const ms = w('c8d', 'sustainable');
    const wt = w('c8d', 'waste');
    const ww = w('c8e', 'worth');
    const dg = w('c8e', 'disagree');
    q(el, 'buzz', 0.5);
    q(cb, 'paper', 0.5);
    q(ot, 'pop', 0.5);
    q(hp, 'ding', 0.6);
    q(cr, 'pop', 0.5);
    q(pl, 'sputter', 0.5);
    q(sp, 'pop', 0.5);
    q(ms, 'ding', 0.5);
    q(wt, 'chime', 0.4);
    q(dg, 'stamp', 0.6);
    const tilt = f < sp ? ease(f, cr, cr + 20, 0, -10) : f < ww ? ease(f, sp, sp + 20, -10, 10) : ease(f, ww, ww + 20, 10, 0);
    scene(A('c8a'), () =>
      f < A('c8c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1, 2].map((i) => <Rig key={i} f={f} x={300 + i * 330} y={420} s={0.8 * pop(f, A('c8a') + i * 4)} />)}
            {f >= el && <Bolt x={630} y={780} s={pop(f, el)} />}
            {f >= ot && (
              <G2 x={1450} y={380} s={pop(f, ot)}>
                <Box w={640} h={200} />
                <Text y={-30} size={80} color={ORANGE}>~138 TWh</Text>
                <Text y={50} size={36}>of electricity per year</Text>
              </G2>
            )}
            {f >= hp && <G2 x={1450} y={680} s={pop(f, hp)}><Text size={52} color={C.red}>≈ 0.5% of the world's</Text></G2>}
            <SourceTag f={f} at={cb} text="Cambridge Digital Mining Industry Report (2025)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={960} s={pop(f, A('c8c'))} tilt={tilt} left="critics" right="supporters" />
            {f >= cr && <Factory x={420} y={420} s={0.6 * pop(f, pl - 4)} label="POWER" />}
            {f >= pl && [0, 1, 2].map((i) => <circle key={i} cx={320 + i * 70} cy={200 - ((f + i * 20) % 60)} r={30 + i * 6} fill="#9AA5B1" opacity={0.6} />)}
            {f >= cr && <G2 x={420} y={520} s={pop(f, cr)}><Text size={38}>{f >= gr ? 'pollution · strained grids' : 'lots of power for guessing'}</Text></G2>}
            {f >= sp && [0, 1].map((i) => <Turbine key={i} f={f} x={1400 + i * 220} y={440} s={0.8 * pop(f, sp + i * 5)} />)}
            {f >= ms && <G2 x={1510} y={520} s={pop(f, ms)}><Text size={38} color={C.green}>52% sustainable energy</Text></G2>}
            {f >= wt && <G2 x={1510} y={100} s={pop(f, wt)}><Text size={36}>uses wasted, cheap power</Text></G2>}
            <SourceTag f={f} at={ms} text="Cambridge (2025): 42.6% renewables + 9.8% nuclear" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={260} s={pop(f, ww - 4)}><Text size={64}>is it worth it?</Text></G2>
            {f >= dg && <Stamp x={960} y={480} s={pop(f, dg, 9, 260)} text="SMART PEOPLE DISAGREE" size={60} color={C.blue} />}
            {f >= dg && <G2 x={960} y={640} s={pop(f, dg + 20)}><Text size={48}>now you know the numbers</Text></G2>}
            <Dave f={f} x={960} y={1000} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: dg, pose: 'thumbs', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e')];
    const bp = w('c9f', 'blood');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(bp, 'heart', 0.6);
    const items = ["Only money you can lose", "'Everyone's rich' = careful", 'Never share your private key', 'Understand what you buy'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c9a'), () =>
      f < A('c9f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={60}>What Dave tells Kevin</Text></G2>
            <G2 x={1620} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={ORANGE} w={1080} />)}
            {cur === 0 && <Dave f={f} x={700} y={900} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.8}]} />}
            {cur === 0 && <Kevin f={f} x={1250} y={900} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'sad', look: -0.8}]} />}
            {cur === 1 && <G2 x={1600} y={520}><Coaster s={0.25} t={1} pts={[20, 60, 10, 50, 5]} cart={false} /><Text y={140} size={36} color={C.red}>it can drop 50%+</Text></G2>}
            {cur === 2 && <Kevin f={f} x={1600} y={760} s={0.8} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} />}
            {cur === 3 && <G2 x={1600} y={520}><Key s={0.9} /><XMark s={0.3} /></G2>}
            {cur === 4 && <G2 x={1600} y={520}><Notebook s={0.5} lines={['Dave: 1', 'Gran: 2']} /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Beach f={f} />
          <Svg>
            <Kevin f={f} x={900} y={880} s={1.2 * pop(f, A('c9f'))} keys={[{at: 0, pose: 'relax', expr: 'happy'}]} />
            <G2 x={1400} y={500} s={pop(f, A('c9f') + 6)}><Phone s={0.8} title="PRICE APP" value="OFF" color="#9AA5B1" /></G2>
            {f >= bp && <G2 x={900} y={400} s={pop(f, bp)}><Text size={48} color={C.green}>blood pressure: thank you</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH10 recap ============
  const recap = ['A shared notebook, no bank in the middle', 'Puzzle lottery · halvings · 21M max', 'Wild price · scams · lost key = lost money'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('d1a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={300} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={ORANGE} w={1320} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH11 series wrap ============
  {
    const wr = w('d2a', 'wrap');
    const ls = w('d2a', 'last');
    const tp = [
      w('d2b', 'airlines'), w('d2b', 'costco'), w('d2b', 'billionaires'), w('d2b', 'credit'),
      w('d2c', 'compound'), w('d2c', 'fed'), w('d2c', 'casino'), w('d2c', 'insurance'), w('d2c', 'recession'), w('d2c', 'bitcoin'),
    ];
    const tv = w('d2d', 'ten');
    const nx = w('d2d', 'next');
    const cm = w('d2d', 'comments');
    const s3 = w('d2d', 'three');
    const sb = w('d2e', 'subscribe');
    const fr = w('d2e', 'free');
    const ch = w('d2e', 'changes');
    q(wr, 'crowd', 0.5);
    q(ls, 'chime', 0.6);
    tp.forEach((x) => q(x, 'pop', 0.45));
    q(tv, 'ding', 0.6);
    q(nx, 'pop', 0.6);
    q(cm, 'mail', 0.6);
    q(s3, 'chime', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    q(ch, 'coin', 0.5);
    const eps = ['Airlines', 'Costco', 'Billionaire taxes', 'Credit scores', 'Compound interest', 'The Fed', 'Casinos', 'Insurance', 'Recessions', 'Bitcoin'];
    scene(A('d2a'), () =>
      f < A('d2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('d2a'))}><Text size={70}>SERIES 2 COMPLETE</Text></G2>
            {f >= ls && <G2 x={960} y={180} s={pop(f, ls)}><Text size={36} color="#5B6470">episodes 11 – 20</Text></G2>}
            {eps.map((e, i) => (
              <G2 key={e} x={260 + (i % 5) * 350} y={400 + Math.floor(i / 5) * 300} s={pop(f, tp[i] - 2)}>
                <Box w={310} h={240} fill={i === 9 ? '#FFE3BF' : '#fff'} />
                <circle cx={-110} cy={-80} r={34} fill={i === 9 ? ORANGE : C.blue} stroke={C.ink} strokeWidth={5} />
                <Text x={-110} y={-78} size={30} color="#fff">{i + 11}</Text>
                <Text y={30} size={e.length > 12 ? 30 : 36}>{e}</Text>
                <path d="M -60 80 l 30 22 l 60 -50" fill="none" stroke={C.green} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
              </G2>
            ))}
            {f < tp[0] && <Dave f={f} x={960} y={900} s={0.9} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />}
          </Svg>
        </AbsoluteFill>
      ) : f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: nx, pose: 'point_r', expr: 'happy', look: 0.8}]} />
            <G2 x={400} y={380} s={pop(f, tv - 4)}><Text size={44}>10 videos · 1 smarter Dave</Text></G2>
            {f >= nx && (
              <G2 x={1200} y={400} s={pop(f, nx)}>
                <Box w={900} h={300} />
                <circle cx={-360} cy={-70} r={40} fill={C.gray} stroke={C.ink} strokeWidth={4} />
                <Text x={-300} y={-70} size={32} anchor="start" color="#5B6470">you · just now</Text>
                <Text x={-400} y={20} size={50} anchor="start">Dave, explain ______ next!</Text>
                <rect x={220} y={80} width={180} height={50} rx={25} fill={C.blue} />
                <Text x={310} y={106} size={28} color="#fff">COMMENT</Text>
              </G2>
            )}
            {f >= cm && <G2 x={1200} y={680} s={pop(f, cm)}><Text size={48}>What should Dave explain next?</Text></G2>}
            {f >= s3 && <Stamp x={1200} y={850} s={pop(f, s3, 9, 260)} text="SERIES 3" size={56} color={ORANGE} r={-4} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Kevin f={f} x={1550} y={860} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
            {f >= ch && <G2 x={960} y={680} s={pop(f, ch)}><Text size={46} color={C.green}>price: $0 · always</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5g', 'history') + 20;
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
