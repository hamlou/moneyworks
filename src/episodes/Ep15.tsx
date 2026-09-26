import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text} from '../props';
import {Bar, Frame, Row, SubButton, Bell, CreditCard} from '../props2';
import {Raccoon} from '../props3';
import {Share} from '../props7';
import {Briefcase, Crayon, Hill, Penny, Snowball} from '../props15';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Buffett: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={79} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const money = (v: number) => (v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v).toLocaleString('en-US')}` : v >= 1 ? `$${v.toFixed(2)}` : `${Math.round(v * 100)}¢`);

export const Ep15: React.FC = () => {
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
    const mil = w('o1', 'million');
    const pn = w('o1', 'penny');
    const tk = w('o2', 'million');
    const lk = w('o3', 'look');
    const fv = w('o3', 'five');
    const cp = w('o4', 'compounding');
    const qt = w('o4', 'quarter');
    const cd = w('o5', 'credit');
    const ex = w('o5', 'explode');
    q(mil, 'cash', 0.6);
    q(pn, 'coin', 0.6);
    q(tk, 'ding', 0.5);
    q(lk, 'pop', 0.6);
    q(fv, 'stamp', 0.7);
    q(cp, 'pop', 0.5);
    q(qt, 'cash', 0.6);
    q(cd, 'pop', 0.5);
    q(ex, 'thud', 0.7);
    const day = Math.round(lin(f, lk, fv, 1, 30));
    scene(0, () =>
      f < cp - 4 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={960} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: tk, pose: 'point_l', expr: 'grin', look: -0.8}, {at: fv, pose: 'shock', expr: 'shock'}]} />
            <G2 x={480} y={420} s={pop(f, 2)}><Briefcase s={1.1} /></G2>
            <G2 x={480} y={640} s={pop(f, mil)}><Text size={48}>$1 million today</Text></G2>
            <G2 x={1440} y={420} s={pop(f, pn) * (f >= lk ? 1 + 0.4 * ease(f, lk, fv) : 1)}><Penny s={1.3} label={f >= lk ? '' : '1¢'} /></G2>
            <G2 x={1440} y={640} s={pop(f, pn)}><Text size={44}>1¢, doubled daily · 30 days</Text></G2>
            {f >= lk && <G2 x={1440} y={420}><Text size={f >= fv ? 60 : 44} color={f >= fv ? C.green : '#fff'} stroke={C.ink} sw={6}>{money(0.01 * 2 ** (day - 1))}</Text></G2>}
            {f >= lk && <G2 x={1440} y={200}><Text size={40}>{'day ' + day}</Text></G2>}
            {f >= fv && <Stamp x={1440} y={780} s={pop(f, fv, 9, 260)} text="$5.37 MILLION" size={52} color={C.green} r={-6} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Hill />
          <Svg>
            <Snowball x={lin(f, cp - 4, cd, 200, 1100)} y={lin(f, cp - 4, cd, 190, 520) - lin(f, cp - 4, cd, 20, 120)} rad={lin(f, cp - 4, cd, 20, 120)} spin={f * 8} label={f >= qt ? '$239K' : ''} color={C.green} />
            <G2 x={500} y={700} s={pop(f, cp)}><Text size={56}>$100 a month →</Text></G2>
            {f >= qt && <G2 x={1300} y={200} s={pop(f, qt)}><Text size={64} color={C.green}>≈ $239,000</Text></G2>}
            {f >= cd && (
              <g>
                <Snowball x={1600} y={740} rad={lin(f, cd, ex + 10, 40, 180)} spin={-f * 8} color={C.red} label="DEBT" />
                <CreditCard x={1250} y={880} s={0.6 * pop(f, cd)} r={-10} />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'works'), w('o6', 'early'), w('o6', 'seventy'), w('o6', 'dark')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['How it works', 'Start early', 'Rule of 72', 'The dark side'].map((l, i) => (
            <Frame key={l} x={300 + i * 440} y={500} s={pop(f, pv[i] - 2)} w={400} h={380} label={l}>
              {i === 0 && <Snowball rad={80} y={-30} />}
              {i === 1 && <Calendar s={0.6} y={-30} top="AGE" year={25} flip={0} />}
              {i === 2 && <Text y={-30} size={120} color={C.blue}>72</Text>}
              {i === 3 && <Snowball rad={80} y={-30} color={C.red} label="DEBT" />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 interest on interest ============
  {
    const oh = w('c1a', 'hundred');
    const tp = w('c1a', 'ten');
    const td = w('c1b', 'ten');
    const ot = w('c1b', 'one', 1);
    const el = w('c1c', 'eleven');
    const mg = w('c1d', 'magic');
    const bb = w('c1d', 'babies');
    const bb2 = w('c1d', 'babies', 1);
    const sb = w('c1e', 'snowball');
    const gb = w('c1e', 'grabs');
    const gu = w('c1f', 'give');
    q(oh, 'coin', 0.5);
    q(tp, 'pop', 0.5);
    q(td, 'coin', 0.5);
    q(el, 'ding', 0.6);
    q(mg, 'sparkle' as string, 0);
    q(bb, 'pop', 0.5);
    q(bb2, 'pop2', 0.5);
    q(sb, 'whoosh', 0.5);
    q(gb, 'boing', 0.4);
    q(gu, 'trombone', 0.4);
    scene(A('c1a'), () =>
      f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: el, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={960} y={120} s={pop(f, A('c1a'))}><Text size={52}>$100 at 10% a year</Text></G2>
            <line x1={600} y1={820} x2={1700} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={760} y={820} h={ease(f, oh - 4, oh + 10, 2, 300)} color={C.blue} label="start" value="$100" w={200} />
            {f >= td && <Bar x={1080} y={820} h={ease(f, td, td + 10, 2, 330)} color={C.blue} label="year 1" value="$110" w={200} />}
            {f >= el && <Bar x={1400} y={820} h={ease(f, el, el + 10, 2, 363)} color={C.green} label="year 2" value="$121" w={200} />}
            {f >= el && <G2 x={1400} y={300} s={pop(f, el)}><Text size={40} color={C.green}>+$11, not +$10</Text></G2>}
            {f >= mg && <G2 x={1080} y={180} s={pop(f, mg)}><Text size={44} color={C.red}>interest on interest</Text></G2>}
            {f >= bb && [0, 1, 2].map((i) => <Coin key={i} x={1500 + i * 70} y={430 - (f >= bb2 ? i * 20 : 0)} s={0.4 * pop(f, bb + i * 6)} />)}
            {f >= bb2 && [0, 1, 2, 3].map((i) => <Coin key={'b' + i} x={1480 + i * 50} y={500} s={0.25 * pop(f, bb2 + i * 4)} />)}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Hill />
          <Svg>
            <Snowball x={lin(f, A('c1e'), gu + 40, 180, 1500)} y={lin(f, A('c1e'), gu + 40, 200, 740) - lin(f, A('c1e'), gu + 40, 20, 150)} rad={lin(f, A('c1e'), gu + 40, 20, 150) ** 1} spin={f * 7} />
            {f >= gu && <Dave f={f} x={400} y={560} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'tired'}]} />}
            {f >= gu && <G2 x={400} y={300} s={pop(f, gu)}><Bubble text="nothing is happening..." size={36} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 penny ============
  {
    const d1 = w('c2b', 'one');
    const wk = w('c2b', 'week');
    const lg = w('c2b', 'laughing');
    const tw = w('c2c', 'two');
    const tt = w('c2d', 'twenty');
    const st = w('c2d', 'stops');
    const ex = w('c2e', 'explodes');
    const t28 = w('c2e', 'eight');
    const t29 = w('c2e', 'nine');
    const t30 = w('c2e', 'thirty');
    const hf = w('c2f', 'half');
    const tm = w('c2f', 'time');
    q(d1, 'coin', 0.4);
    q(wk, 'pop', 0.5);
    q(tw, 'pop', 0.5);
    q(tt, 'cash', 0.5);
    q(st, 'thud', 0.5);
    q(ex, 'boing', 0.5);
    [t28, t29, t30].forEach((x) => q(x, 'cash', 0.6));
    q(hf, 'stamp', 0.6);
    q(tm, 'ding', 0.6);
    const day = f < wk ? Math.min(3, 1 + Math.floor(lin(f, d1, wk, 0, 3))) : f < tw ? 7 : f < tt ? 14 : f < t28 ? 20 : f < t29 ? 28 : f < t30 ? 29 : 30;
    const vals = Array.from({length: 30}).map((_, i) => 0.01 * 2 ** i);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={56}>{'The penny · day ' + day}</Text></G2>
          <line x1={140} y1={860} x2={1780} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          {vals.slice(0, day).map((v, i) => {
            const h = Math.max(4, (v / vals[29]) * 640);
            return <rect key={i} x={160 + i * 54} y={860 - h} width={42} height={h} rx={6} fill={i >= 29 ? C.green : i >= 27 ? C.yellow : C.blue} stroke={C.ink} strokeWidth={3} />;
          })}
          <G2 x={500} y={300}><Text size={90} color={C.green} stroke={C.ink} sw={6}>{money(vals[day - 1])}</Text></G2>
          <Dave f={f} x={380} y={1000} s={0.7} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: st, pose: 'shock', expr: 'shock'}]} />
          {f >= hf && <Stamp x={1300} y={330} s={pop(f, hf, 9, 260)} text="HALF ON THE LAST DAY" size={50} color={C.red} r={-5} />}
          {f >= tm && <G2 x={1300} y={470} s={pop(f, tm)}><Text size={60} color={C.blue}>ingredient #1: TIME</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 Dave vs Bob ============
  {
    const sv = w('c3a', 'seven');
    const ng = w('c3a', 'guaranteed');
    const tf = w('c3b', 'twenty');
    const tn = w('c3b', 'ten');
    const sp = w('c3b', 'stops');
    const bw = w('c3c', 'waits');
    const sf = w('c3c', 'sixty');
    const tw = w('c3d', 'twelve');
    const ts = w('c3d', 'thirty');
    const tm = w('c3d', 'three');
    const wh = w('c3e', 'who');
    const dv = w('c3f', 'dave');
    const bb = w('c3f', 'bob');
    const th = w('c3g', 'third');
    const fy = w('c3h', 'forty');
    const two = w('c3h', 'two');
    q(sv, 'ding', 0.5);
    q(ng, 'pop', 0.4);
    q(tf, 'pop', 0.5);
    q(sp, 'thud', 0.5);
    q(bw, 'pop', 0.5);
    q(tw, 'coin', 0.5);
    q(ts, 'coin', 0.5);
    q(wh, 'drum' as string, 0);
    q(dv, 'stamp', 0.7);
    q(bb, 'pop', 0.5);
    q(fy, 'pop', 0.5);
    q(two, 'cash', 0.7);
    const ages = [25, 35, 45, 55, 65];
    const X = (age: number) => 300 + ((age - 25) / 40) * 1300;
    const dVal = (age: number) => {
      const r = 0.07;
      if (age <= 35) return 1200 * ((1 + r) ** (age - 25) - 1) / r;
      return 16580 * (1 + r) ** (age - 35);
    };
    const bVal = (age: number) => (age <= 35 ? 0 : 1200 * ((1 + 0.07) ** (age - 35) - 1) / 0.07);
    const Y = (v: number) => 820 - (v / 130000) * 520;
    const pathOf = (fn: (a: number) => number, upTo: number) => Array.from({length: Math.max(1, Math.floor(upTo - 25) + 1)}).map((_, i) => `${i ? 'L' : 'M'} ${X(25 + i)} ${Y(fn(25 + i))}`).join(' ');
    const reveal = lin(f, wh, dv, 25, 65);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < tf - 4 ? (
              <g>
                <G2 x={960} y={400} s={pop(f, sv)}><Text size={160} color={C.green} stroke={C.ink} sw={10}>~7%</Text></G2>
                <G2 x={960} y={560} s={pop(f, sv + 6)}><Text size={44}>a year, after inflation (long-run average)</Text></G2>
                {f >= ng && <Stamp x={960} y={760} s={pop(f, ng, 9, 260)} text="NOT GUARANTEED" size={50} color={C.red} r={-4} />}
                <SourceTag f={f} at={sv} text="S&P 500 since 1957: ~10%/yr nominal, ~7% real" />
              </g>
            ) : (
              <g>
                <Dave f={f} x={420} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}, {at: sp, pose: 'relax', expr: 'happy'}]} />
                <G2 x={420} y={360} s={pop(f, tf)}><Text size={44}>Dave: age 25 → 35</Text><Text y={60} size={40} color={C.green}>$100/mo · 10 years</Text>{f >= sp && <Text y={120} size={40} color={C.red}>then STOPS</Text>}</G2>
                {f >= bw && <Bob f={f} x={1450} y={880} s={1.1} keys={[{at: 0, pose: 'pockets', expr: 'neutral', look: -0.6}, {at: sf, pose: 'typing', expr: 'happy'}]} />}
                {f >= bw && <G2 x={1450} y={360} s={pop(f, bw)}><Text size={44}>Bob: age 35 → 65</Text><Text y={60} size={40} color={C.blue}>$100/mo · 30 years</Text></G2>}
                {f >= tw && <G2 x={420} y={620} s={pop(f, tw)}><Text size={60}>$12,000 in</Text></G2>}
                {f >= ts && <G2 x={1450} y={620} s={pop(f, ts)}><Text size={60}>$36,000 in</Text></G2>}
                {f >= tm && <G2 x={960} y={200} s={pop(f, tm)}><Text size={52} color={C.red}>Bob puts in 3× more</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={56}>At 65, who has more?</Text></G2>
            <line x1={300} y1={820} x2={1620} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {ages.map((a) => <Text key={a} x={X(a)} y={870} size={34}>{'age ' + a}</Text>)}
            <path d={pathOf(dVal, reveal)} fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
            <path d={pathOf(bVal, reveal)} fill="none" stroke={C.blue} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
            {f >= dv && <G2 x={1700} y={Y(126209)} s={pop(f, dv)}><Text size={48} color={C.green}>Dave $126K</Text></G2>}
            {f >= bb && <G2 x={1700} y={Y(113353) + 60} s={pop(f, bb)}><Text size={48} color={C.blue}>Bob $113K</Text></G2>}
            {f >= th && <G2 x={700} y={300} s={pop(f, th)}><Text size={44}>1/3 of the money · 10 extra years of rolling</Text></G2>}
            {f >= fy && (
              <G2 x={960} y={500} s={pop(f, fy)}>
                <rect x={-440} y={-90} width={880} height={180} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text y={-30} size={40}>if Dave never stopped (40 years):</Text>
                <Text y={40} size={70} color={C.green}>≈ $239,000</Text>
              </G2>
            )}
            <SourceTag f={f} at={dv} text="Calculation: $100/mo at 7%/yr, annual compounding" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 rule of 72 ============
  {
    const sv = w('c4a', 'seventy');
    const dv = w('c4b', 'divide');
    const dbl = w('c4b', 'double');
    const tn = w('c4c', 'ten');
    const d = [w('c4d', 'twenty'), w('c4d', 'forty'), w('c4d', 'eighty'), w('c4d', 'sixty')];
    const one = w('c4e', 'one');
    const gk = w('c4e', 'grandkids');
    const inf = w('c4f', 'inflation');
    const mt = w('c4f', 'mattress');
    q(sv, 'stamp', 0.6);
    q(dv, 'pop', 0.5);
    q(tn, 'ding', 0.6);
    d.forEach((x) => q(x, 'coin', 0.5));
    q(one, 'pop', 0.5);
    q(gk, 'trombone', 0.4);
    q(inf, 'pop', 0.5);
    q(mt, 'crinkle', 0.5);
    const stacks = d.filter((x) => f >= x).length;
    scene(A('c4a'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={pop(f, sv)}><Text size={110} color={C.blue} stroke={C.ink} sw={6}>72 ÷ rate = years to double</Text></G2>
            {f >= tn && <G2 x={960} y={360} s={pop(f, tn)}><Text size={70}>72 ÷ 7 ≈ 10 years</Text></G2>}
            {f >= d[0] - 10 && ['$10K', '$20K', '$40K', '$80K', '$160K'].map((l, i) => (
              <G2 key={l} x={360 + i * 300} y={880} s={i === 0 ? 1 : pop(f, d[i - 1])}>
                <MoneyStack n={2 + i * 2} s={0.8} />
                <Text y={70} size={40}>{l}</Text>
                <Text y={120} size={30} color="#5B6470">{'year ' + i * 10}</Text>
              </G2>
            ))}
            {stacks === 0 && f < tn && <Dave f={f} x={960} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={300} s={pop(f, one)}><Text size={90}>1% savings account</Text><Text y={110} size={70} color={C.red}>72 years to double</Text></G2>
            {f >= gk && <Stick f={f} x={960} y={880} s={0.7} acc={['bun', 'glasses']} seed={13} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />}
            {f >= gk && <G2 x={1300} y={700} s={pop(f, gk)}><Text size={40}>grandkids: "finally!"</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={pop(f, inf)}><Text size={60}>inflation 3% → prices double in ~24 years</Text></G2>
            <G2 x={560} y={600} s={pop(f, mt)}>
              <rect x={-260} y={-60} width={520} height={120} rx={30} fill="#B8E0FF" stroke={C.ink} strokeWidth={6} />
              <MoneyStack n={3} s={0.6} y={-60} />
              <Text y={140} size={40} color={C.red}>cash under the mattress: shrinks</Text>
            </G2>
            <G2 x={1400} y={600} s={pop(f, mt + 20)}><Snowball rad={110} color={C.green} spin={f * 5} /><Text y={180} size={40} color={C.green}>invested: a chance to grow</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ Buffett ============
  {
    const wb = w('w1', 'buffett');
    const el = w('w2', 'eleven');
    const cr = w('w2', 'crayons');
    const ef = w('w3', 'eighty');
    const eo = w('w3', 'one');
    const sf = w('w3', 'sixty');
    const tm = w('w4', 'time');
    const ey = w('w4', 'eighty');
    const nm = w('w5', 'name');
    q(wb, 'pop', 0.6);
    q(el, 'pop', 0.5);
    q(cr, 'boing', 0.5);
    q(ef, 'cash', 0.6);
    q(sf, 'stamp', 0.7);
    q(tm, 'ding', 0.6);
    q(nm, 'trombone', 0.4);
    scene(A('w1'), () =>
      f < A('w3') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.4)'}}>
            <Board />
            <Svg>
              <Buffett f={f} x={560} y={880} s={0.7 * pop(f, A('w1'))} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.6}]} handItem={<Share s={0.25} n="1 SHARE" />} />
              <G2 x={560} y={430} s={pop(f, wb)}><Text size={48}>young Warren Buffett</Text></G2>
              <Calendar x={1000} y={300} s={0.7 * pop(f, el)} top="AGE" year={11} flip={0} />
              {f >= cr && <Dave f={f} x={1450} y={880} s={0.6} keys={[{at: 0, pose: 'hold', expr: 'grin'}]} handItem={<Crayon s={0.6} />} />}
              {f >= cr && <G2 x={1450} y={500} s={pop(f, cr)}><Text size={40}>Dave at 11</Text></G2>}
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.4} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={52}>Buffett's ~$84.5 billion</Text></G2>
            <G2 x={960} y={480} s={pop(f, A('w3'))}>
              <rect x={-700} y={-80} width={1400} height={160} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-700} y={-80} width={1400 * (3 / 84.5)} height={160} rx={20} fill={C.blue} stroke={C.ink} strokeWidth={6} />
              {f >= sf && <rect x={-700 + 1400 * (3 / 84.5)} y={-80} width={1400 * ease(f, sf, sf + 30, 0, 81.5 / 84.5)} height={160} fill={C.green} stroke={C.ink} strokeWidth={6} />}
              <Text x={-560} y={140} size={34}>before 65: ~$3B</Text>
              {f >= sf && <Text x={200} y={140} size={40} color={C.green}>after 65: ~$81.5B</Text>}
            </G2>
            {f >= tm && <G2 x={960} y={760} s={pop(f, tm)}><Text size={60}>superpower: TIME</Text>{f >= ey && <Text y={80} size={40}>80+ years of rolling</Text>}</G2>}
            {f >= nm && <G2 x={960} y={940} s={pop(f, nm)}><Text size={36} color="#5B6470">start at 30, stop at 60 → almost nobody knows his name</Text></G2>}
            <SourceTag f={f} at={ef} text="Morgan Housel, The Psychology of Money (2020)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 dark side ============
  {
    const sd = w('c5a', 'side');
    const rc = w('c5b', 'raccoon');
    const tt = w('c5b', 'twenty');
    const cmp = w('c5b', 'compound');
    const th = w('c5c', 'three');
    const dbl = w('c5d', 'double');
    const sd2 = w('c5d', 'straight');
    const bst = w('c5e', 'best');
    const st = w('c5e', 'stops');
    q(sd, 'sting', 0.6);
    q(rc, 'boing', 0.5);
    q(tt, 'pop', 0.5);
    q(th, 'stamp', 0.6);
    q(dbl, 'thud', 0.6);
    q(sd2, 'buzz', 0.5);
    q(bst, 'ding', 0.6);
    q(st, 'pop', 0.5);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={pop(f, A('c5a'))}><Text size={60}>compounding doesn't pick sides</Text></G2>
            <Raccoon f={f} x={500} y={620} s={1.1 * pop(f, rc)} mood="greedy" holdCoin grab={0.6} />
            <CreditCard x={1000} y={520} s={0.9 * pop(f, rc + 6)} r={-8} />
            {f >= tt && <G2 x={1450} y={450} s={pop(f, tt)}><Text size={120} color={C.red} stroke={C.ink} sw={8}>~22%</Text></G2>}
            {f >= cmp && <G2 x={1450} y={580} s={pop(f, cmp)}><Text size={40}>and it compounds</Text></G2>}
            {f >= th && <G2 x={1200} y={800} s={pop(f, th)}><Text size={70}>72 ÷ 22 ≈ 3 years</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Hill />
          <Svg>
            <Snowball x={lin(f, A('c5d'), bst, 300, 1250)} y={lin(f, A('c5d'), bst, 240, 700) - lin(f, A('c5d'), bst, 40, 150)} rad={lin(f, A('c5d'), bst, 40, 150)} spin={f * 9} color={C.red} label="DEBT" />
            <Dave f={f} x={1650} y={940} s={1} sweat keys={[{at: 0, pose: 'panic', expr: 'shock', look: -0.8}, {at: st, pose: 'celebrate', expr: 'grin'}]} />
            {f >= dbl && <G2 x={600} y={700} s={pop(f, dbl)}><Text size={56} color={C.red}>$5,000 → ~$10,000 in ~3 years</Text></G2>}
            {f >= bst && <G2 x={700} y={880} s={pop(f, bst)}><Text size={48} color={C.green}>paying it off = a guaranteed "return"</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 thieves ============
  {
    const th = [w('c6b', 'fees'), w('c6c', 'stopping'), w('c6d', 'panic'), w('c6e', 'waiting')];
    const tr = w('c6b', 'third');
    th.forEach((x) => q(x, 'pop', 0.6));
    q(tr, 'thud', 0.6);
    const labels = ['FEES', 'STOP & START', 'PANIC SELLING', 'WAITING'];
    const cur = th.filter((x) => f >= x).length;
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={56}>The snowball thieves</Text></G2>
          <Snowball x={420} y={560} rad={180 - cur * 20} spin={f * 3} color={C.green} />
          {Array.from({length: 4}).map((_, i) => (
            <G2 key={i} x={1000 + (i % 2) * 460} y={380 + Math.floor(i / 2) * 330} s={pop(f, th[i])}>
              <rect x={-200} y={-120} width={400} height={240} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Raccoon f={f} x={-110} y={-10} s={0.35} mood="sneaky" />
              <Text x={60} y={-40} size={36}>{'thief ' + (i + 1)}</Text>
              <Text x={60} y={20} size={34} color={C.red}>{labels[i]}</Text>
            </G2>
          ))}
          {f >= tr && f < th[1] && <G2 x={420} y={860} s={pop(f, tr)}><Text size={40}>7% vs 6% for 40 yrs → ~1/3 less</Text></G2>}
          {cur === 0 && <Dave f={f} x={420} y={1000} s={0.6} keys={[{at: 0, pose: 'hold', expr: 'happy'}]} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 habits ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e'), bs('c7f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Start early, even small', 'Make it automatic', 'Watch the fees', 'Kill high-interest debt first', 'Be boring · don\'t touch it'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={900} y={100}><Text size={56}>Making it work</Text></G2>
          <G2 x={1620} y={100}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={120} y={230 + i * 140} s={0.85 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1120} />)}
          {cur === 0 && <Dave f={f} x={1600} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur > 0 && <Snowball x={1600} y={620} rad={60 + cur * 22} spin={f * 4} color={C.green} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 recap + end ============
  const recap = ['Interest on interest: slow, then huge', 'Time beats money (Dave won)', 'Debt + fees compound against you'];
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
    const ei = w('c8e', 'einstein');
    const ev = w('c8e', 'evidence');
    const tr = w('c8e', 'true');
    const fd = w('c8f', 'federal');
    const sb = w('c8g', 'subscribe');
    q(ei, 'pop', 0.5);
    q(ev, 'buzz', 0.5);
    q(tr, 'ding', 0.5);
    q(fd, 'chime', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < A('c8f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stick f={f} x={560} y={880} s={1.2} acc={['glasses']} seed={180} keys={[{at: 0, pose: 'shrug', expr: 'think'}]} />
            <G2 x={1250} y={380} s={pop(f, ei)}><Bubble text={'"compound interest is the\n8th wonder of the world"'} size={40} tail="left" /></G2>
            {f >= ev && <Stamp x={1250} y={620} s={pop(f, ev, 9, 260)} text="NO EVIDENCE HE SAID IT" size={44} color={C.red} r={-6} />}
            {f >= tr && <G2 x={1250} y={820} s={pop(f, tr)}><Text size={52} color={C.green}>...but still true</Text></G2>}
            <SourceTag f={f} at={ev} text="Quote Investigator (2019)" />
          </Svg>
        </AbsoluteFill>
      ) : f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={pop(f, fd)}><Text size={60}>Next: the Federal Reserve</Text></G2>
            <G2 x={960} y={520} s={pop(f, fd + 6)}>
              <circle r={200} fill="#fff" stroke={C.ink} strokeWidth={8} />
              <Text y={-40} size={44}>INTEREST RATES</Text>
              <line x1={0} y1={30} x2={120} y2={-60} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
              <circle cy={30} r={20} fill={C.ink} />
            </G2>
            <Dave f={f} x={400} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'suspicious'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Snowball x={1500} y={820} rad={90} spin={f * 6} color={C.green} label="SUBS" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3h', 'month') + 20;
  subCues(SUB).forEach((c) => cues.push(c));
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <SubReminder f={f} at={SUB} Dave={<Stick f={f} x={0} y={200} s={1} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}]} acc={['hair']} seed={7} />} />
      <Captions f={f} t={t} />
      <Sfx cues={cues.filter((c) => c.v !== 0)} />
    </AbsoluteFill>
  );
};
