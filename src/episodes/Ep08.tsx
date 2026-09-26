import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bill, Bubble, Calendar, Car, Coin, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Row, SubButton, Bell, GoldBar} from '../props2';
import {PriceTag, Raccoon} from '../props3';
import {House, LineChart} from '../props4';
import {Flag} from '../props6';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Nixon: React.FC<SP> = (p) => <Stick acc={['tie']} seed={77} {...p} />;
const Buffett: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={79} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Nugget: React.FC<{x: number; y: number; s?: number; f: number}> = ({x, y, s = 1, f}) => (
  <g transform={`translate(${x},${y}) scale(${s}) rotate(${Math.sin(f / 30) * 3})`}>
    <path d="M -120 20 Q -140 -60 -60 -90 Q 20 -130 90 -80 Q 150 -30 120 40 Q 80 100 -20 90 Q -100 80 -120 20 Z" fill={C.gold} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -50 Q -20 -80 30 -60" fill="none" stroke="#FFF3A6" strokeWidth={12} strokeLinecap="round" />
    <circle cx={50} cy={10} r={14} fill="#E0A91F" />
    <circle cx={-40} cy={30} r={10} fill="#E0A91F" />
  </g>
);

const Cube: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -150 -60 L 0 -140 L 150 -60 L 0 20 Z" fill="#FFE08A" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -150 -60 L 0 20 L 0 200 L -150 120 Z" fill={C.gold} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 150 -60 L 0 20 L 0 200 L 150 120 Z" fill="#E0A91F" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -110 -50 L -20 -95" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
  </g>
);

const Potato: React.FC<{x: number; y: number; s?: number; rot?: number}> = ({x, y, s = 1, rot = 0}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse rx={90} ry={60} fill={rot > 0.5 ? '#6B5A3A' : '#C9A36B'} stroke={C.ink} strokeWidth={6} />
    {[[-30, -10], [20, 15], [40, -20]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#8C6A3E" />)}
    {rot > 0.5 && <path d="M -40 -70 q 10 -20 20 0 M 20 -70 q 10 -20 20 0" fill="none" stroke="#8FBF6B" strokeWidth={5} />}
  </g>
);

export const Ep08: React.FC = () => {
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
    const et = w('o2', 'eat');
    const dr = w('o2', 'drive');
    const lv = w('o2', 'live');
    const sits = w('o2', 'sits');
    q(2, 'ding', 0.6);
    [et, dr, lv].forEach((x) => q(x, 'buzz', 0.35));
    q(sits, 'cricket', 0.4);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Nugget x={960} y={480} s={1.6 * pop(f, 2, 10)} f={f} />
          <Sparkle x={1180} y={300} t={((f % 45) / 45)} s={0.7} />
          {[[et, 'eat'], [dr, 'drive'], [lv, 'live in']].map(([at, l], i) => (
            <G2 key={l as string} x={420 + i * 540} y={830} s={pop(f, at as number)}>
              <Text size={50}>{'can\'t ' + l}</Text>
              <XMark s={0.12} y={-4} />
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const kg = w('o3', 'kilogram');
    const cr = w('o3', 'car');
    q(kg, 'pop', 0.6);
    q(cr, 'cash', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <GoldBar x={560} y={560} s={1.5 * pop(f, kg)} />
          <G2 x={560} y={380} s={pop(f, kg + 6)}><Text size={52}>1 kg bar ≈ $138,000</Text></G2>
          <Text x={960} y={560} size={100}>&gt;</Text>
          <Car x={1400} y={620} s={1.2 * pop(f, cr)} />
          <SourceTag f={f} at={kg + 10} text="32.15 oz × ≈ $4,300/oz (Sept 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cb = w('o4', 'cube');
    const tt = w('o4', 'thirty');
    const bk = w('o5', 'buying');
    q(cb, 'pop', 0.6);
    q(tt, 'cash', 0.7);
    q(bk, 'coin', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Cube x={700} y={500} s={1.3 * pop(f, cb - 4)} />
          <G2 x={700} y={860} s={pop(f, cb)}><Text size={48}>ALL gold ever mined · ~22 m wide</Text></G2>
          <G2 x={1400} y={420} s={pop(f, tt)}><Text size={120} color={C.gold} stroke={C.ink} sw={10}>~$30T</Text></G2>
          {f >= bk && [0, 1, 2].map((i) => <Bank key={i} x={1250 + i * 160} y={760} s={0.25 * pop(f, bk + i * 4)} label="CENTRAL BANK" />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'oldest'), w('o6', 'price'), w('o6', 'buying'), w('o6', 'investment')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['Oldest money', 'What moves the price', "Who's buying", 'Good investment?'].map((l, i) => (
            <Frame key={l} x={270 + i * 460} y={500} s={pop(f, pv[i] - 2)} w={420} h={400} label={l}>
              {i === 0 && <Coin s={2.5} y={-40} />}
              {i === 1 && <LineChart t={1} pts={[1, 1.4, 1.2, 2, 1.7, 3]} w={260} h={160} y={-40} color={C.gold} />}
              {i === 2 && <Bank s={0.3} y={50} />}
              {i === 3 && <Icon kind="question" s={0.7} y={-40} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const pt = w('c1a', 'potatoes');
    const sp = w('c1b', 'superpowers');
    const items = [w('c1c', 'rare'), w('c1d', 'rusts'), w('c1e', 'melt'), w('c1f', 'fake'), w('c1g', 'print')];
    const eg = w('c1d', 'egyptian');
    q(pt, 'boing', 0.5);
    q(sp, 'sting', 0.5);
    items.forEach((x) => q(x, 'ding', 0.5));
    q(eg, 'dream', 0.3);
    const labels = ['Rare', 'Never rusts', 'Splits easily', 'Hard to fake', "Can't be printed"];
    const cur = items.filter((x) => f >= x - 4).length;
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={500} s={pop(f, bs('c1a') + 10)}><Text size={140}>?</Text></G2>
            <Potato x={960} y={520} s={1.3 * pop(f, pt)} />
            <Nugget x={1450} y={520} s={1 * pop(f, sp)} f={f} />
            <G2 x={1450} y={250} s={pop(f, sp)}><Stamp text="SUPERPOWERS" size={50} color={C.gold} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={60}>Gold's 5 superpowers</Text></G2>
            {labels.map((l, i) => <Row key={l} x={140} y={250 + i * 140} s={0.85 * pop(f, items[i] - 4)} n={i + 1} text={l} lit={cur === i + 1 ? 1 : 0.6} color={C.gold} w={820} />)}
            {cur === 1 && <G2 x={1450} y={520}><Nugget x={0} y={0} s={0.8} f={f} /><Text y={180} size={40}>rare, but not TOO rare</Text></G2>}
            {cur === 2 && (
              <G2 x={1450} y={520}>
                <path d="M -120 -160 L 120 -160 L 150 160 L -150 160 Z" fill={C.gold} stroke={C.ink} strokeWidth={6} />
                <circle cx={-40} cy={-60} r={20} fill={C.ink} />
                <circle cx={40} cy={-60} r={20} fill={C.ink} />
                <Sparkle x={130} y={-170} t={((f % 40) / 40)} s={0.5} />
                <Text y={220} size={36}>3,000+ years, still shining</Text>
              </G2>
            )}
            {cur === 3 && <G2 x={1450} y={520}>{[0, 1, 2, 3].map((i) => <Coin key={i} x={-90 + i * 60} y={Math.sin(f / 8 + i) * 10} s={0.8 + i * 0.1} />)}</G2>}
            {cur === 4 && <G2 x={1450} y={520}><GoldBar s={1.2} /><Text y={140} size={36}>super heavy for its size</Text></G2>}
            {cur === 5 && <G2 x={1450} y={520}><Text size={60}>printer</Text><XMark s={0.25} /><Text y={120} size={36}>must dig it out</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const rt = w('c1h', 'rot');
    const pc = w('c1h', 'coin');
    q(rt, 'boing', 0.5);
    q(pc, 'buzz', 0.4);
    scene(A('c1h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Potato x={700} y={480} s={1.5} rot={f >= rt ? 1 : 0} />
          <G2 x={700} y={720} s={pop(f, pc)}><Text size={56}>potato coin: NO</Text></G2>
          <Nugget x={1300} y={480} s={1.1} f={f} />
          <Sparkle x={1450} y={330} t={((f % 40) / 40)} s={0.6} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 ============
  {
    const fk = w('c2a', 'five');
    const ly = w('c2b', 'lydia');
    const cn = w('c2b', 'coins');
    const ppr = w('c2d', 'paper');
    const pr = w('c2d', 'promise');
    const tf = w('c2e', 'thirty');
    const nx = w('c2f', 'nixon');
    const tr = w('c2g', 'trust');
    const fr = w('c2h', 'four');
    q(fk, 'dream', 0.4);
    q(ly, 'pop', 0.5);
    q(cn, 'coin', 0.6);
    q(ppr, 'paper', 0.5);
    q(tf, 'pop', 0.5);
    q(nx, 'stamp', 0.7);
    q(tr, 'heart', 0.5);
    q(fr, 'cash', 0.6);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.4)'}}>
            <Street f={f} />
            <Svg>
              <Calendar x={260} y={260} s={0.8 * pop(f, ly)} top="LYDIA" year="600 BC" flip={0} />
              {[0, 1, 2, 3, 4].map((i) => <Coin key={i} x={760 + i * 150} y={480 - (f > cn ? Math.abs(Math.sin(f / 6 + i)) * 40 : 0)} s={1.6 * pop(f, cn + i * 3)} />)}
              <G2 x={1050} y={720} s={pop(f, cn + 10)}><Text size={52}>some of the first coins ever</Text></G2>
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.5} />
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={460} s={pop(f, ppr)}><Paper id="e8p1" text={'I promise to pay\n1 ounce of GOLD'} reveal={ease(f, pr, pr + 20)} size={56} color={C.navy} w={620} h={300} /></G2>
            <Text x={960} y={460} size={100}>=</Text>
            <GoldBar x={1300} y={460} s={1.4 * pop(f, pr)} />
            <G2 x={960} y={800} s={pop(f, tf)}><Text size={70}>$35 = 1 ounce of gold</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.35)'}}>
            <Interior />
            <Svg>
              <Calendar x={260} y={260} s={0.8 * pop(f, nx)} top="AUG 15" year={1971} flip={0} />
              <rect x={700} y={300} width={560} height={380} rx={20} fill="#2E3440" stroke={C.ink} strokeWidth={8} />
              <rect x={730} y={330} width={500} height={320} rx={10} fill="#B8C6D1" />
              <Nixon f={f} x={980} y={760} s={0.9} keys={[{at: 0, pose: 'talk', expr: 'neutral', talk: true}]} />
              <G2 x={1500} y={440} s={pop(f, tr)}><Text size={60}>dollar backed by:</Text></G2>
              <G2 x={1500} y={530} s={pop(f, tr + 6)}><Stamp text="TRUST" size={60} color={C.blue} /></G2>
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.5} />
          <Svg>
            <G2 x={960} y={900} s={pop(f, fr)}><Text size={60} color={C.gold} stroke={C.ink} sw={6}>$35 → $4,000+ per ounce</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 ============
  {
    const ev = w('c3b', 'every');
    const tt = w('c3b', 'two');
    const ml = w('c3c', 'melt');
    const sv = w('c3c', 'seven');
    const tv = w('c3e', 'thirty');
    const ff = w('c3f', 'less');
    q(ev, 'pop', 0.5);
    for (let i = 0; i < 6; i++) q(ev + 8 + i * 4, 'coin', 0.3);
    q(ml, 'whoosh', 0.5);
    q(sv, 'pop', 0.5);
    q(tv, 'cash', 0.6);
    q(ff, 'stamp', 0.7);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {f < ml && ['ring', 'coin', 'bar', 'tooth'].map((k, i) => (
              <G2 key={k} x={300 + i * 250} y={420} s={pop(f, ev + i * 5)}>
                {k === 'coin' ? <Coin s={1.4} /> : k === 'bar' ? <GoldBar s={0.8} /> : <circle r={40} fill="none" stroke={C.gold} strokeWidth={16} />}
              </G2>
            ))}
            {f < ml && <G2 x={960} y={620} s={pop(f, tt)}><Text size={64}>≈ 220,000 tonnes</Text></G2>}
            {f >= ml && <Cube x={900} y={560} s={1.7 * ease(f, ml, ml + 20, 0.2, 1)} />}
            {f >= sv && <House x={1450} y={822} s={0.5} />}
            {f >= sv && <G2 x={1450} y={250} s={pop(f, sv)}><Text size={44}>≈ 7-story building tall</Text></G2>}
            <SourceTag f={f} at={tt} text="World Gold Council above-ground stocks (end-2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={400} y1={820} x2={1520} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={720} y={820} h={ease(f, tv - 4, tv + 12, 0, 30 * 13)} color={C.gold} label="All gold ever" value="~$30T" w={280} />
            <Bar x={1200} y={820} h={ease(f, ff - 4, ff + 12, 0, 40 * 13)} color={C.red} label="US national debt" value="$40T" w={280} />
            <SourceTag f={f} at={tv} text="≈220k t × 32,151 oz/t × ≈$4,300 · Treasury Debt to the Penny" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 ============
  {
    const items = [w('c4b', 'fear'), w('c4c', 'inflation'), w('c4d', 'interest'), w('c4e', 'buying')];
    items.forEach((x) => q(x, 'ding', 0.5));
    const labels = ['Fear', 'Inflation', 'Interest rates', "Who's buying"];
    const cur = items.filter((x) => f >= x - 4).length;
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>What moves the gold price</Text></G2>
          {labels.map((l, i) => <Row key={l} x={140} y={260 + i * 160} s={0.9 * pop(f, items[i] - 4)} n={i + 1} text={l} lit={cur === i + 1 ? 1 : 0.6} color={C.gold} w={800} />)}
          {cur === 1 && <G2 x={1450} y={560}><Stick f={f} x={-80} y={200} s={0.9} acc={['cap']} seed={21} keys={[{at: 0, pose: 'hold', expr: 'worried'}]} handItem={<GoldBar s={0.35} y={-20} />} /><Icon kind="warning" x={120} y={-100} s={0.6} /></G2>}
          {cur === 2 && <G2 x={1450} y={520}><Bill s={1.2 * (1 - 0.3 * Math.abs(Math.sin(f / 20)))} x={-120} /><GoldBar x={150} s={0.9} /><Text y={140} size={36}>can't print gold</Text></G2>}
          {cur === 3 && <G2 x={1450} y={520}><Frame w={500} h={320}><Text y={-60} size={40}>savings: +5%/yr</Text><Text y={20} size={40}>gold: +0%/yr</Text><Text y={90} size={30} color="#5B6470">(unless price rises)</Text></Frame></G2>}
          {cur === 4 && <G2 x={1450} y={560}><Bank s={0.45} label="CENTRAL BANK" /><Icon kind="question" x={180} y={-240} s={0.5} /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 ============
  {
    const th = w('c5b', 'thousand');
    const eg = w('c5b', 'eight');
    const pl = w('c5c', 'poland');
    const rs = w('c5d', 'russia');
    const fz = w('c5d', 'froze');
    const vt = w('c5e', 'vault');
    const nb = w('c5f', 'nobody');
    const rc = w('c5g', 'record');
    q(th, 'pop', 0.6);
    q(eg, 'pop', 0.5);
    q(pl, 'pop', 0.5);
    q(fz, 'stamp', 0.7);
    q(vt, 'clank', 0.6);
    q(rc, 'cash', 0.7);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={260} y1={820} x2={1400} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[['2022', 1082], ['2023', 1051], ['2024', 1045], ['2025', 863]].map(([y, v], i) => (
              <Bar key={y as string} x={380 + i * 280} y={820} h={ease(f, (i < 3 ? th : eg) - 6 + i * 3, (i < 3 ? th : eg) + 10 + i * 3, 0, (v as number) * 0.5)} color={C.gold} label={y as string} value={'' + v + 't'} w={200} />
            ))}
            <G2 x={960} y={130} s={pop(f, th - 10)}><Text size={60}>Central bank gold buying (tonnes)</Text></G2>
            <G2 x={1650} y={500} s={pop(f, pl)}><Text size={48}>Poland: +102t</Text></G2>
            <SourceTag f={f} at={th} text="World Gold Council, Gold Demand Trends (2022–2025)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={260} s={0.8 * pop(f, rs)} top="YEAR" year={2022} flip={0} />
            <G2 x={760} y={520} s={pop(f, rs + 6)}><Bank s={0.6} label="SAVINGS ABROAD" /></G2>
            <G2 x={760} y={430} s={pop(f, fz, 9, 260)}><Stamp text="FROZEN" size={70} color={C.blue} /></G2>
            <G2 x={1450} y={560} s={pop(f, vt)}>
              <rect x={-220} y={-200} width={440} height={400} rx={20} fill="#9AA5B1" stroke={C.ink} strokeWidth={6} />
              {[0, 1, 2].map((i) => <GoldBar key={i} x={-110 + i * 110} y={120 - (i % 2) * 40} s={0.6} />)}
              <Text y={-140} size={40}>OWN VAULT</Text>
            </G2>
            <G2 x={1450} y={880} s={pop(f, nb)}><Text size={48} color={C.green}>nobody can switch it off</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <LineChart x={960} y={520} w={1300} h={420} t={ease(f, bs('c5g'), rc + 10)} pts={[1800, 1950, 2050, 2350, 2650, 3000, 3400, 4000, 4700, 5500, 4800, 4300]} lo={1500} hi={5700} color={C.gold} />
            <G2 x={1300} y={240} s={pop(f, rc)}><Text size={70} color={C.gold} stroke={C.ink} sw={6}>record: $5,000+</Text></G2>
            <SourceTag f={f} at={rc} text="Gold price, 2023–2026 (chart simplified)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ Where gold comes from ============
  {
    const sp = w('m1', 'space');
    const st = w('m2', 'stars');
    const sd = w('m2', 'dust');
    const th = w('m3', 'three');
    const tn = w('m4', 'tonne');
    const gr = w('m4', 'grams');
    const ft = w('m5', 'fort');
    const ph = w('m6', 'phone');
    q(sp, 'dream', 0.5);
    q(st, 'poof', 0.7);
    q(sd, 'ding', 0.5);
    q(th, 'pop', 0.5);
    q(tn, 'thud', 0.6);
    q(gr, 'ding', 0.5);
    q(ft, 'clank', 0.6);
    q(ph, 'pop', 0.5);
    scene(A('m1'), () =>
      f < A('m3') ? (
        <AbsoluteFill style={{background: '#141828'}}>
          <Svg>
            {Array.from({length: 60}).map((_, i) => <circle key={i} cx={(i * 337) % 1920} cy={(i * 191) % 1080} r={2 + (i % 3)} fill="#fff" opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 20 + i))} />)}
            <circle cx={ease(f, st - 20, st, 300, 900)} cy={500} r={70} fill="#FFD166" />
            <circle cx={ease(f, st - 20, st, 1620, 1020)} cy={560} r={60} fill="#8FD3F5" />
            <Puff x={960} y={530} t={lin(f, st, st + 30)} s={2} />
            {f >= st + 10 && Array.from({length: 24}).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              const d = ease(f, st + 10, st + 60, 0, 600);
              return <circle key={`g${i}`} cx={960 + Math.cos(a) * d} cy={530 + Math.sin(a) * d * 0.7} r={8} fill={C.gold} />;
            })}
            <G2 x={960} y={900} s={pop(f, sd)}><Text size={60} color={C.gold}>gold = star dust</Text></G2>
            <G2 x={960} y={140} s={pop(f, sp)}><Text size={64} color="#fff">it came from SPACE</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('m5') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={180} s={pop(f, th)}><Text size={60}>~3,600 tonnes mined per year</Text></G2>
            <path d="M 300 822 L 700 380 L 1100 822 Z" fill="#9C8F7A" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" opacity={pop(f, tn)} />
            <G2 x={700} y={880} s={pop(f, tn)}><Text size={44}>1 tonne of rock</Text></G2>
            <Text x={1150} y={600} size={100}>→</Text>
            <G2 x={1450} y={600} s={pop(f, gr)}>
              <rect x={-26} y={-26} width={52} height={52} rx={6} fill={C.gold} stroke={C.ink} strokeWidth={5} />
              <Sparkle x={50} y={-50} t={((f % 40) / 40)} s={0.4} />
              <Text y={100} size={40}>a few grams</Text>
            </G2>
            <SourceTag f={f} at={th} text="World Gold Council mine production data" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={460} s={pop(f, ft)}>
              <rect x={-260} y={-200} width={520} height={300} fill="#C9D1DA" stroke={C.ink} strokeWidth={6} />
              <rect x={-80} y={-60} width={160} height={160} fill="#56606B" stroke={C.ink} strokeWidth={6} />
              <Text y={-150} size={40}>FORT KNOX</Text>
              {[0, 1, 2].map((i) => <GoldBar key={i} x={-170 + i * 170} y={170} s={0.5} />)}
            </G2>
            <G2 x={560} y={800} s={pop(f, ft + 6)}><Text size={48}>USA: ~8,100 tonnes</Text></G2>
            <G2 x={1400} y={500} s={pop(f, ph)}>
              <rect x={-130} y={-230} width={260} height={460} rx={34} fill="#2E3440" stroke={C.ink} strokeWidth={6} />
              <rect x={-80} y={-60} width={160} height={120} rx={8} fill="#1F7A4D" stroke={C.ink} strokeWidth={4} />
              {[-60, -20, 20, 60].map((x) => <line key={x} x1={x} y1={-60} x2={x} y2={60} stroke={C.gold} strokeWidth={6} />)}
            </G2>
            <G2 x={1400} y={800} s={pop(f, ph + 6)}><Text size={44}>a little gold in every phone</Text></G2>
            <SourceTag f={f} at={ft} text="U.S. Treasury: official gold reserves ≈ 8,133 tonnes" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  // ============ Gold rush ============
  {
    const ey = w('r2', 'eighteen');
    const th = w('r2', 'three');
    const mt = w('r3', 'most');
    const sh = w('r3', 'shovels');
    const sf = w('r4', 'safest');
    q(ey, 'flip', 0.5);
    q(th, 'crowd', 0.5);
    q(mt, 'trombone', 0.4);
    q(sh, 'cash', 0.6);
    q(sf, 'ding', 0.6);
    scene(A('r1'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.4)'}}>
          <Street f={f} />
          <Svg>
            <Calendar x={260} y={260} s={0.8 * pop(f, ey)} top="CALIFORNIA" year={1848} flip={0} />
            {Array.from({length: 9}).map((_, i) => (
              <Stick key={i} f={f} x={ease(f, th - 10 + i * 3, th + 60 + i * 3, -200, 400 + i * 110)} y={820} s={0.7} walk={f < th + 60 + i * 3} acc={i % 2 ? ['cap'] : ['fedora']} seed={200 + i} keys={[{at: 0, pose: 'carry', expr: f >= mt ? 'sad' : 'grin'}]} handItem={<path d="M -8 -60 L 8 -60 L 4 0 L -4 0 Z" fill="#9AA5B1" stroke={C.ink} strokeWidth={3} />} />
            ))}
            <G2 x={960} y={160} s={pop(f, th)}><Text size={56}>~300,000 people rushed in</Text></G2>
            <G2 x={1600} y={822} s={pop(f, sh)}>
              <rect x={-170} y={-260} width={340} height={260} fill="#E9B872" stroke={C.ink} strokeWidth={6} />
              <rect x={-190} y={-300} width={380} height={50} rx={8} fill={C.red} stroke={C.ink} strokeWidth={5} />
              <Text y={-274} size={30} color="#fff">SHOVELS · JEANS · FOOD</Text>
              <Stick f={f} x={0} y={0} s={0.8} acc={['tophat']} seed={210} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            </G2>
            <G2 x={1600} y={420} s={pop(f, sf)}><Stamp text="SELL THE SHOVELS" size={44} color={C.green} /></G2>
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={0.4} />
      </AbsoluteFill>
    ));
  }

  // ============ CH6 ============
  {
    const gd = w('c6b', 'good');
    const nt = w('c6c', 'nothing');
    const md = w('c6d', 'mcdonalds');
    const bf = w('c6e', 'buffett');
    const cb = w('c6e', 'cube', 1);
    const fv = w('c6f', 'forty');
    const wh = w('c6g', 'where');
    const fe = w('c6h', 'extinguisher');
    q(gd, 'ding', 0.5);
    q(nt, 'buzz', 0.4);
    q(md, 'pop', 0.5);
    q(bf, 'pop', 0.6);
    q(cb, 'thud', 0.5);
    q(fv, 'trombone', 0.4);
    q(wh, 'pop', 0.5);
    q(fe, 'ding', 0.5);
    scene(A('c6a'), () =>
      f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, bs('c6a'))}><Text size={56}>Good investment? (education, not advice)</Text></G2>
            <Frame x={560} y={470} s={pop(f, gd)} w={700} h={460} label="✓ keeps value long-term">
              <GoldBar s={1.2} y={-30} />
            </Frame>
            <Frame x={1360} y={470} s={pop(f, nt)} w={700} h={460} label="✗ produces nothing">
              <GoldBar s={0.8} x={-140} y={-30} />
              <G2 x={140} y={-20} s={pop(f, md)}><House s={0.22} y={60} /><Text y={-90} size={30} color={C.green}>land earns rent</Text></G2>
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Buffett f={f} x={420} y={860} s={1.2 * pop(f, bf)} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}]} />
            <G2 x={420} y={300} s={pop(f, bf + 6)}><Text size={44}>Warren Buffett</Text></G2>
            <Cube x={1000} y={480} s={0.9 * pop(f, cb)} />
            <G2 x={1000} y={780} s={pop(f, cb + 6)}><Text size={44}>"it will just be a cube"</Text></G2>
            <LineChart x={1580} y={500} w={380} h={260} t={ease(f, fv - 6, fv + 20)} pts={[1900, 1650, 1300, 1200, 1060]} lo={1000} hi={2000} color={C.red} />
            <G2 x={1580} y={760} s={pop(f, fv)}><Text size={52} color={C.red}>2011→2015: −45%</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Frame x={560} y={440} s={pop(f, wh)} w={640} h={420} label="Where? Who guards it?">
              <GoldBar s={1} y={-40} />
              <Raccoon f={f} x={180} y={60} s={0.4} mood="sneaky" />
            </Frame>
            <G2 x={1350} y={480} s={pop(f, fe)}>
              <rect x={-60} y={-200} width={120} height={320} rx={50} fill={C.red} stroke={C.ink} strokeWidth={6} />
              <rect x={-30} y={-250} width={60} height={60} fill="#56606B" stroke={C.ink} strokeWidth={5} />
              <path d="M 30 -230 Q 120 -240 140 -160" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
              <Text y={0} size={30} color="#fff">SAFETY</Text>
            </G2>
            <G2 x={1350} y={820} s={pop(f, fe + 10)}><Text size={48}>a safety tool, not a money machine</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 ============
  const recap = ['Rare · lasts forever · can\'t be printed', 'Moves with fear, inflation, rates, buyers', 'Protects value, produces nothing'];
  {
    const r = [bs('c7b'), bs('c7c'), bs('c7d')];
    q(A('c7a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c7a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={300} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1320} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st = w('c7f', 'stocks');
    const lm = w('c7g', 'lemonade');
    const sb = w('c7g', 'subscribe');
    q(st, 'pop', 0.6);
    q(lm, 'pop', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c7e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <Buffett f={f} x={420} y={860} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'smug', look: 0.8}]} />
            <G2 x={1100} y={420} s={pop(f, st)}><Text size={90}>What IS a stock?</Text></G2>
            <G2 x={1100} y={640} s={pop(f, lm)}>
              <rect x={-200} y={-80} width={400} height={160} rx={12} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text size={50}>LEMONADE 5¢</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
            <GoldBar x={1500} y={800} s={pop(f, sb + 20)} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = w('c5e', 'nobody') + 30;
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
