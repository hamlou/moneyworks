import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, OldFilm} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, Duck, MoneyStack, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Dial, Frame, Icon, Phone, Row, SubButton, Bell} from '../props2';
import {PriceTag, Raccoon, SplitBar} from '../props3';
import {House, LineChart, Truck} from '../props4';
import {Bread, Wheelbarrow} from '../props6';

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

const Jacket: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -160 -200 L -60 -240 L 0 -180 L 60 -240 L 160 -200 L 200 60 L 120 60 L 110 -60 L 100 220 L -100 220 L -110 -60 L -120 60 L -200 60 Z" fill="#8C6A4A" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <line x1={0} y1={-180} x2={0} y2={220} stroke={C.ink} strokeWidth={5} />
    <rect x={20} y={40} width={70} height={60} rx={6} fill="#7A5A3E" stroke={C.ink} strokeWidth={4} />
  </g>
);

const Basket: React.FC<{x: number; y: number; s?: number; items?: number}> = ({x, y, s = 1, items = 6}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -120 -80 Q 0 -200 120 -80" fill="none" stroke={C.ink} strokeWidth={10} />
    {Array.from({length: items}).map((_, i) => (
      <g key={i} transform={`translate(${-80 + (i % 3) * 80},${-90 + Math.floor(i / 3) * 30})`}>
        {i % 3 === 0 ? <Bread s={0.5} /> : i % 3 === 1 ? <circle r={24} fill={C.red} stroke={C.ink} strokeWidth={4} /> : <rect x={-20} y={-30} width={40} height={60} rx={6} fill={C.blue} stroke={C.ink} strokeWidth={4} />}
      </g>
    ))}
    <path d="M -150 -70 L 150 -70 L 120 80 L -120 80 Z" fill="#D9A15B" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-90, -30, 30, 90].map((xx) => <line key={xx} x1={xx} y1={-70} x2={xx * 0.85} y2={80} stroke="#B07A3E" strokeWidth={5} />)}
  </g>
);

const Chips: React.FC<{x: number; y: number; s?: number; h?: number; label?: string}> = ({x, y, s = 1, h = 1, label = '$4.99'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d={`M -110 ${-180 * h} L 110 ${-180 * h} L 120 0 L -120 0 Z`} fill={C.yellow} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -110 ${-180 * h} q 22 -14 44 0 t 44 0 t 44 0 t 44 0 t 44 0`} fill="none" stroke={C.ink} strokeWidth={5} />
    <Text y={-90 * h} size={48 * Math.max(0.7, h)} color={C.red}>CHIPS</Text>
    <g transform="translate(0,50)"><PriceTag text={label} s={0.8} /></g>
  </g>
);

const Note100T: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-300} y={-130} width={600} height={260} rx={12} fill="#CFE3C5" stroke={C.ink} strokeWidth={6} />
    <rect x={-270} y={-100} width={540} height={200} rx={8} fill="none" stroke="#6B8F5E" strokeWidth={4} />
    <Text y={-50} size={30} color="#4E6B43" ls={3}>ONE HUNDRED TRILLION DOLLARS</Text>
    <Text y={30} size={64} color="#2F4F2A">100,000,000,000,000</Text>
  </g>
);

export const Ep07: React.FC = () => {
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
    const jk = w('o1', 'jacket');
    const hd = w('o2', 'hundred');
    const tw = w('o2', 'two');
    const half = w('o4', 'half');
    const van = w('o5', 'vanished');
    q(jk, 'crinkle', 0.5);
    q(hd, 'ding', 0.7);
    q(tw, 'flip', 0.5);
    q(half, 'stamp', 0.7);
    q(van, 'poof', 0.6);
    const shrink = ease(f, half - 4, half + 20, 1, 0.52);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Jacket x={1250} y={560} s={pop(f, 2, 12)} />
          <Dave f={f} x={560} y={820} s={1.3} keys={[{at: 0, pose: 'point_r', expr: 'neutral', look: 0.8}, {at: hd, pose: 'celebrate', expr: 'grin'}, {at: half, pose: 'shock', expr: 'shock'}]} />
          <G2 x={1250} y={ease(f, hd - 6, hd + 10, 600, 300)} s={pop(f, hd - 6) * 1.8 * shrink}><Bill /></G2>
          <Sparkle x={1400} y={220} t={lin(f, hd, hd + 20)} s={0.6} />
          <Calendar x={1650} y={220} s={0.7 * pop(f, tw)} top="FROM" year={2000} flip={0} />
          <G2 x={1250} y={880} s={pop(f, half)}><Text size={64} color={C.red}>buys only ~HALF today</Text></G2>
          <Puff x={1350} y={300} t={lin(f, van, van + 20)} s={0.6} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'went'), w('o6', 'wins'), w('o6', 'want'), w('o6', 'protect')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['Where it went', 'Who wins & loses', 'Why they want some', 'How people protect'].map((l, i) => (
            <Frame key={l} x={270 + i * 460} y={500} s={pop(f, pv[i] - 2)} w={420} h={400} label={l}>
              {i === 0 && <Bill s={1.2} y={-40} />}
              {i === 1 && <Text y={-40} size={60}>WIN / LOSE</Text>}
              {i === 2 && <Text y={-40} size={100} color={C.green}>2%</Text>}
              {i === 3 && <Icon kind="check" s={0.9} y={-40} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const nm = w('c1a', 'inflation');
    const up = w('c1b', 'up');
    const bk = w('c1c', 'basket');
    const nn = w('c1d', 'ninety');
    const ft = w('c1e', 'fifty');
    const ws = w('c1f', 'world');
    q(nm, 'stamp', 0.7);
    q(up, 'boing', 0.4);
    q(bk, 'pop', 0.6);
    q(nn, 'cash', 0.6);
    q(ft, 'thud', 0.5);
    q(ws, 'ding', 0.4);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={250} s={pop(f, nm, 9, 260)} r={-4} text="INFLATION" size={100} />
            <PriceTag x={660} y={620} s={1.3 * pop(f, up)} text={f > up + 20 ? '$5.40' : '$5.00'} color={f > up + 20 ? C.red : C.yellow} />
            <Text x={960} y={620} size={80}>=</Text>
            <G2 x={1260} y={620} s={pop(f, up + 10) * (f > up + 20 ? 0.8 : 1)}><Bill s={1.2} /></G2>
            <G2 x={960} y={860} s={pop(f, up + 20)}><Text size={52}>each dollar buys a little less</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Basket x={500} y={560} s={1.4 * pop(f, bk)} />
            <G2 x={500} y={200} s={pop(f, bk + 6)}><Text size={44}>food · rent · gas · clothes · doctor</Text></G2>
            <G2 x={1320} y={320} s={pop(f, nn - 20)}><Text size={60} color="#5B6470">Same basket</Text></G2>
            <G2 x={1320} y={430} s={pop(f, nn - 14)}><Text size={70}>2000: $100</Text></G2>
            <G2 x={1320} y={540} s={pop(f, nn)}><Text size={90} color={C.red} stroke={C.ink} sw={6}>2026: ~$194</Text></G2>
            <G2 x={1320} y={700} s={pop(f, ft)}><Text size={52}>your $100 buys what $52 did</Text></G2>
            <SourceTag f={f} at={nn} text="BLS CPI-U, 2000 annual avg vs 2026" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 ============
  {
    const tn = w('c2b', 'hundred');
    const mo = w('c2c', 'more');
    const bk = w('c2c', 'bakery');
    const rs = w('c2d', 'raises');
    const r2 = w('c2f', 'two');
    const fl = w('c2f', 'flour');
    const tr = w('c2f', 'truck');
    const r3 = w('c2g', 'three');
    const ex = w('c2g', 'expectations');
    q(tn, 'pop', 0.5);
    q(mo, 'cash', 0.6);
    q(rs, 'stamp', 0.6);
    q(r2, 'pop', 0.5);
    q(tr, 'thud', 0.5);
    q(r3, 'pop', 0.5);
    q(ex, 'whoosh_s', 0.4);
    scene(A('c2a'), () =>
      f < A('c2f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {Array.from({length: 10}).map((_, i) => <Bread key={i} x={220 + (i % 5) * 150} y={380 + Math.floor(i / 5) * 110} s={0.9 * pop(f, tn + i)} />)}
            <G2 x={520} y={600} s={pop(f, bk)}><Text size={40}>the bakery can't bake faster</Text></G2>
            {Array.from({length: f >= mo ? 20 : 10}).map((_, i) => <Bill key={i} x={1200 + (i % 5) * 120} y={320 + Math.floor(i / 5) * 90} s={0.7 * pop(f, i < 10 ? tn + 6 + i : mo + (i - 10) * 2)} />)}
            <PriceTagBig x={880} y={830} text={f >= rs ? '1 loaf = $2' : '1 loaf = $1'} red={f >= rs} s={pop(f, tn + 20)} />
            <G2 x={1440} y={180} s={pop(f, we('c2e', 'stuff'))}><Stamp text="REASON 1" size={50} color={C.navy} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Frame x={560} y={440} s={pop(f, r2)} w={700} h={480} label="Reason 2: harder to make">
              <G2 x={-120} y={20} s={pop(f, fl)}><Text size={48}>flour $$↑</Text></G2>
              <G2 x={130} y={60} s={pop(f, tr)} r={f > tr ? -12 : 0}><Truck s={0.8} /></G2>
            </Frame>
            <Frame x={1360} y={440} s={pop(f, r3)} w={700} h={480} label="Reason 3: expectations">
              <Stick f={f} x={-150} y={160} s={0.8} acc={['cap']} seed={21} keys={[{at: 0, pose: 'point_up', expr: 'smug'}]} />
              <G2 x={80} y={-40} s={pop(f, ex)}><Bubble text={'raise my pay!\nraise prices!'} size={36} /></G2>
              <G2 x={160} y={120} s={pop(f, ex + 10)}><Text size={90} color={C.red}>↻</Text></G2>
            </Frame>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 ============
  {
    const rl = w('c3b', 'relief');
    const zr = w('c3b', 'zero');
    const ft = w('c3c', 'forty');
    const sh = w('c3d', 'ships');
    const en = w('c3d', 'energy');
    const nn = w('c3f', 'nine');
    const hg = w('c3f', 'highest');
    q(rl, 'cash', 0.6);
    q(zr, 'tick', 0.5);
    q(ft, 'whoosh', 0.5);
    q(sh, 'thud', 0.5);
    q(en, 'pop', 0.5);
    q(nn, 'stamp', 0.8);
    q(hg, 'heart', 0.5);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={260} s={0.8 * pop(f, bs('c3b'))} top="YEAR" year={2020} flip={0} />
            {f >= rl && Array.from({length: 8}).map((_, i) => {
              const p = ((f - rl + i * 9) % 50) / 50;
              return <Bill key={i} x={500 + i * 130} y={-60 + p * 700} s={0.7} r={p * 200} />;
            })}
            <Dial x={1500} y={330} s={0.7 * pop(f, zr)} v={0.05} />
            <G2 x={960} y={820} s={pop(f, ft)}><Text size={80} color={C.red} stroke={C.ink} sw={6}>money supply +~40%</Text></G2>
            {f >= sh && <G2 x={600} y={600} s={pop(f, sh)}><Truck s={0.9} r={-10} /><XMark s={0.22} /></G2>}
            {f >= en && <G2 x={1400} y={620} s={pop(f, en)}><PriceTag text="GAS $$$" color={C.red} s={1.1} /></G2>}
            <SourceTag f={f} at={ft} text="Federal Reserve H.6: M2, Feb 2020 → 2022 peak" until={sh} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, bs('c3e'))}><Text size={60}>more money + fewer things =</Text></G2>
            <LineChart x={960} y={540} w={1300} h={420} t={ease(f, bs('c3e'), nn + 10)} pts={[1.5, 0.3, 1.4, 5.4, 7.0, 8.5, 9.1, 8.2, 6.5, 4.9, 3.7, 3.2]} lo={0} hi={10} color={C.red} />
            <G2 x={1200} y={290} s={pop(f, nn)}><Text size={110} color={C.red} stroke={C.ink} sw={8}>9.1%</Text></G2>
            <G2 x={1200} y={400} s={pop(f, hg)}><Text size={44}>June 2022 · highest in 40+ years</Text></G2>
            <SourceTag f={f} at={nn} text="BLS CPI-U 12-month change (chart simplified)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 ============
  {
    const cs = w('c4b', 'cash');
    const mt = w('c4b', 'mattress');
    const fx = w('c4c', 'fixed');
    const bw = w('c4d', 'borrowers');
    const mg = w('c4e', 'mortgage');
    const gv = w('c4f', 'government');
    const hid = w('c4g', 'hidden');
    q(cs, 'pop', 0.5);
    q(mt, 'crinkle', 0.4);
    q(fx, 'thud', 0.4);
    q(bw, 'ding', 0.6);
    q(mg, 'pop', 0.5);
    q(gv, 'pop', 0.5);
    q(hid, 'stamp', 0.7);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, bs('c4a'))}><Text size={70} color={C.red}>LOSERS</Text></G2>
            <Grandma f={f} x={520} y={860} s={1.2 * pop(f, cs)} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
            <G2 x={520} y={320} s={pop(f, mt)}><MoneyStack n={5} s={1.3} y={60} o={1 - 0.4 * ease(f, mt, mt + 60)} /></G2>
            <G2 x={520} y={470} s={pop(f, mt + 6)}><Text size={40}>savings shrink yearly</Text></G2>
            <Frame x={1350} y={500} s={pop(f, fx)} w={620} h={440} label="fixed incomes">
              <Phone s={0.6} y={-20} title="PAY" value="$2,000" />
              <Text x={200} y={-40} size={70} color={C.red}>=</Text>
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, bw)}><Text size={70} color={C.green}>WINNERS: borrowers</Text></G2>
            <House x={450} y={780} s={0.5 * pop(f, mg)} />
            <G2 x={450} y={300} s={pop(f, mg + 4)}><PriceTag text="$2,002/mo (fixed)" s={1} /></G2>
            <G2 x={450} y={400} s={pop(f, mg + 20)}><Text size={40} color={C.green}>wages ↑ → easier to pay</Text></G2>
            <Bank x={1400} y={800} s={0.6 * pop(f, gv)} label="USA · $40T" />
            <G2 x={1400} y={250} s={pop(f, gv + 10)}><Text size={44}>debt shrinks vs the economy</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={260} s={pop(f, hid, 9, 260)} r={-4} text="A HIDDEN TAX" size={90} />
            <Grandma f={f} x={500} y={860} s={1} keys={[{at: 0, pose: 'shrug', expr: 'sad'}]} />
            {Array.from({length: 4}).map((_, i) => {
              const p = ((f - hid + i * 10) % 40) / 40;
              return f < hid ? null : <Coin key={i} x={600 + p * 800} y={600 - Math.sin(p * Math.PI) * 160} s={0.9} />;
            })}
            <Bank x={1450} y={820} s={0.55} label="BORROWERS" />
            <G2 x={960} y={880} s={pop(f, hid + 10)}><Text size={48}>savers → borrowers, no vote needed</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 ============
  {
    const df = w('c5b', 'deflation');
    const tv = w('c5c', 'tv');
    const jb = w('c5d', 'jobs');
    const tw = w('c5e', 'two');
    const br = w('c5f', 'raises');
    const fv = w('c5g', 'five');
    const cl = w('c5g', 'cooled');
    q(df, 'stamp', 0.6);
    q(tv, 'pop', 0.5);
    q(jb, 'thud', 0.5);
    q(tw, 'ding', 0.6);
    q(br, 'tick', 0.6);
    q(fv, 'pop', 0.6);
    q(cl, 'chime', 0.4);
    scene(A('c5a'), () =>
      f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={180} s={pop(f, df, 9, 260)} r={-4} text="DEFLATION" size={80} color={C.blue} />
            <G2 x={560} y={520} s={pop(f, tv)}>
              <rect x={-180} y={-120} width={360} height={220} rx={14} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
              <rect x={-160} y={-100} width={320} height={180} rx={8} fill="#8FD3F5" />
              <PriceTag x={0} y={170} s={0.9} text={f > tv + 30 ? '$390 next month' : '$400'} />
            </G2>
            <Dave f={f} x={1000} y={860} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: tv + 20, pose: 'hips', expr: 'smug'}]} />
            {f >= jb && [0, 1, 2].map((i) => <G2 key={i} x={1350 + i * 150} y={560} s={pop(f, jb + i * 4)}><Icon kind="briefcase" s={0.6} /><XMark s={0.15} /></G2>)}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dial x={560} y={500} s={1.2 * pop(f, tw - 4)} v={f < br ? 0.35 : f < cl ? 0.9 : 0.35} label="INFLATION" />
            <G2 x={560} y={760} s={pop(f, tw)}><Text size={60} color={C.green}>target ≈ 2%</Text></G2>
            <Bank x={1350} y={800} s={0.6 * pop(f, br)} label="FEDERAL RESERVE" />
            <G2 x={1350} y={260} s={pop(f, fv)}><Text size={70} color={C.red}>rates: ~0% → 5%+</Text></G2>
            <G2 x={1350} y={360} s={pop(f, cl)}><Text size={48} color={C.blue}>inflation cooled</Text></G2>
            <SourceTag f={f} at={tw} text="Federal Reserve: 2% longer-run goal; fed funds 5.25–5.50% (Jul 2023)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 ============
  {
    const sm = w('c6b', 'smaller');
    const sf = w('c6c', 'shrinkflation');
    const cb = w('c6d', 'cereal');
    q(sm, 'boing', 0.5);
    q(sf, 'stamp', 0.7);
    q(cb, 'pop', 0.5);
    const h = ease(f, sm - 4, sm + 20, 1, 0.72);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Chips x={560} y={740} s={1.4} h={1} label="$4.99" />
          <Chips x={1360} y={740} s={1.4} h={h} label="$4.99" />
          <G2 x={560} y={200}><Text size={48}>before</Text></G2>
          <G2 x={1360} y={200} s={pop(f, sm)}><Text size={48}>after (same price!)</Text></G2>
          <Stamp x={960} y={420} s={pop(f, sf, 9, 260)} r={-6} text="SHRINKFLATION" size={70} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Personal inflation ============
  {
    const av = w('y2', 'average');
    const rn = w('y2', 'rent');
    const gs = w('y3', 'gas');
    const sc = w('y4', 'screaming');
    const bk = w('y5', 'basket');
    q(av, 'pop', 0.5);
    q(rn, 'pop', 0.6);
    q(gs, 'pop', 0.6);
    q(sc, 'buzz', 0.5);
    q(bk, 'ding', 0.5);
    scene(A('y1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={pop(f, bs('y1'))}><Text size={60}>Your inflation ≠ the official number</Text></G2>
          <Frame x={400} y={480} s={pop(f, av)} w={520} h={420} label="official: 3.4%"><Basket x={0} y={40} s={0.9} /></Frame>
          <Frame x={960} y={480} s={pop(f, rn)} w={500} h={420} label="renter: rent ↑↑"><House s={0.3} y={100} /></Frame>
          <Frame x={1520} y={480} s={pop(f, gs)} w={500} h={420} label="driver: gas ↑↑"><Truck s={0.7} y={40} /></Frame>
          <G2 x={960} y={850} s={pop(f, sc)}><Text size={56} color={C.red}>news: 3% · your wallet: AAAH!</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Craziest inflation ============
  {
    const gm = w('x2', 'germany');
    const tw = w('x2', 'two');
    const tc = w('x3', 'twice');
    const kd = w('x4', 'children');
    const zb = w('x5', 'zimbabwe');
    const bs1 = w('x5', 'bus');
    const ot = w('x6', 'nineteen');
    const tt = w('x6', 'thirty');
    const rl = w('x7', 'relentless');
    q(gm, 'dream', 0.4);
    q(tw, 'stamp', 0.7);
    q(tc, 'pop', 0.5);
    q(kd, 'pop2', 0.5);
    q(zb, 'pop', 0.6);
    q(bs1, 'trombone', 0.4);
    q(ot, 'flip', 0.5);
    q(tt, 'cash', 0.5);
    q(rl, 'heart', 0.5);
    scene(A('x1'), () =>
      f < A('x5') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: f >= gm - 6 ? 'sepia(0.5) grayscale(0.3)' : 'none'}}>
            <Street f={f} />
            <Svg>
              <Calendar x={260} y={260} s={0.8 * pop(f, gm)} top="GERMANY" year={1923} flip={0} />
              <G2 x={900} y={420} s={pop(f, tw)}><Bread s={1.6} /></G2>
              <G2 x={900} y={260} s={pop(f, tw + 4)}><PriceTagBig x={0} y={0} text="200,000,000,000 marks" red s={1} /></G2>
              <Stick f={f} x={1450} y={820} s={1.1 * pop(f, tc)} acc={['cap']} seed={98} keys={[{at: 0, pose: 'carry', expr: 'worried'}]} walk handItem={<MoneyStack n={5} s={0.6} y={-40} />} />
              {f >= kd && Array.from({length: 6}).map((_, i) => <G2 key={i} x={560 + (i % 3) * 90} y={820 - Math.floor(i / 3) * 60} s={pop(f, kd + i * 3)}><MoneyStack n={2} s={0.6} /></G2>)}
              {f >= kd && <Stick f={f} x={400} y={840} s={0.6} acc={[]} seed={99} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />}
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={f >= gm - 6 ? 0.6 : 0} />
        </AbsoluteFill>
      ) : f < A('x6') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Calendar x={260} y={260} s={0.8 * pop(f, zb)} top="ZIMBABWE" year={2009} flip={0} />
            <Note100T x={1000} y={420} s={1.1 * pop(f, zb + 4)} />
            <G2 x={1000} y={720} s={pop(f, bs1)}><Text size={56} color={C.red}>still not enough for a bus ride</Text></G2>
            <SourceTag f={f} at={zb + 6} text="Reserve Bank of Zimbabwe Z$100 trillion note (2009)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={400} y={420} s={pop(f, ot)} top="YEAR" year={1913} flip={0} />
            <G2 x={400} y={680} s={pop(f, ot + 6)}><Text size={80}>$1</Text></G2>
            <Text x={800} y={500} size={120}>→</Text>
            <Calendar x={1200} y={420} s={pop(f, tt - 6)} top="YEAR" year={2026} flip={0} />
            <G2 x={1200} y={680} s={pop(f, tt)}><Text size={100} color={C.red} stroke={C.ink} sw={6}>~$33</Text></G2>
            <G2 x={960} y={880} s={pop(f, rl)}><Text size={52}>slow · quiet · relentless</Text></G2>
            <SourceTag f={f} at={tt} text="BLS CPI-U: 1913 ≈ 9.9 vs 2026 ≈ 333" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const edu = w('c7a', 'education');
    q(edu, 'pop', 0.4);
    const items = ["Don't let too much cash sit idle", 'Accounts/bonds that track inflation', 'Long-term assets (with risk)', 'Grow your income'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>How people fight back</Text></G2>
          <G2 x={1600} y={110} s={pop(f, edu)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1080} />)}
          {cur === 1 && <G2 x={1620} y={520}><MoneyStack n={5} s={1.2} o={0.5 + 0.5 * Math.abs(Math.sin(f / 10))} /></G2>}
          {cur === 2 && <Frame x={1620} y={480} w={380} h={300}><Text size={40}>interest ≥</Text><Text y={60} size={40}>inflation?</Text></Frame>}
          {cur === 3 && <LineChart x={1620} y={500} w={360} h={260} t={1} pts={[1, 1.3, 1.1, 1.8, 2.4, 2.1, 3.2, 4]} />}
          {cur === 4 && <Dave f={f} x={1620} y={820} s={1} keys={[{at: 0, pose: 'point_up', expr: 'grin'}]} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 ============
  const recap = ['Each dollar buys less over time', 'Too much money · supply · expectations', 'Hurts savers, helps borrowers · Fed aims 2%'];
  {
    const r = [bs('c8b'), bs('c8c'), bs('c8d')];
    q(A('c8a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c8a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={260} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1400} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const yr = w('c8f', 'yellow');
    const tr = w('c8f', 'trillions');
    const gd = w('c8g', 'gold');
    const sb = w('c8g', 'subscribe');
    const jk = w('c8g', 'jackets');
    q(yr, 'ding', 0.6);
    q(tr, 'cash', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(jk, 'boing', 0.4);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <G2 x={960} y={480} s={1.6 * pop(f, yr)}>
              <path d="M -90 40 L -60 -30 L 60 -30 L 90 40 Z" fill={C.gold} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
              <Text y={12} size={26} color="#B7830F">GOLD</Text>
            </G2>
            <Sparkle x={1140} y={330} t={((f % 40) / 40)} s={0.6} />
            <G2 x={960} y={760} s={pop(f, gd)}><Text size={70}>Why is gold SO expensive?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
            <Jacket x={1550} y={760} s={0.6 * pop(f, jk)} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = bs('c3f') + 60;
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

const PriceTagBig: React.FC<{x: number; y: number; text: string; red?: boolean; s?: number}> = ({x, y, text, red, s = 1}) =>
  s <= 0 ? null : (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d={`M ${-text.length * 15 - 40} -54 L ${text.length * 15 + 10} -54 L ${text.length * 15 + 70} 0 L ${text.length * 15 + 10} 54 L ${-text.length * 15 - 40} 54 Z`} fill={red ? C.red : C.yellow} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <Text x={0} y={3} size={52} color={red ? '#fff' : C.ink}>{text}</Text>
    </g>
  );
