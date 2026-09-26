import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Calendar, Coin, Paper, SourceTag, Stamp, Text, XMark, Bubble, Car} from '../props';
import {Bar, Frame, Row, SubButton, Bell, Phone, CreditCard, Magnifier} from '../props2';
import {Fridge, Raccoon} from '../props3';
import {House} from '../props4';
import {ReportCard} from '../props6';
import {AppleTree, Notepad, ScoreGauge, Star} from '../props8';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Pct: React.FC<{x: number; y: number; s: number; pct: string; label: string; color: string}> = ({x, y, s, pct, label, color}) => (
  <G2 x={x} y={y} s={s}>
    <circle r={120} fill={color} stroke={C.ink} strokeWidth={7} />
    <Text y={-10} size={70} color="#fff">{pct}</Text>
    <Text y={170} size={40}>{label}</Text>
  </G2>
);

export const Ep14: React.FC = () => {
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
    const bl = w('o2', 'low');
    const hg = w('o2', 'higher');
    const th = w('o2', 'thousands');
    const jb = w('o3', 'job');
    const sl = w('o3', 'salary');
    const dg = w('o3', 'digit');
    const ev = w('o4', 'everywhere');
    const ln = w('o4', 'loans');
    const ap = w('o4', 'apartments');
    const ph = w('o4', 'phone');
    const cs = w('o5', 'credit');
    q(2, 'pop', 0.6);
    q(bl, 'ding', 0.6);
    q(hg, 'buzz', 0.6);
    q(th, 'cash', 0.5);
    q(jb, 'pop2', 0.4);
    q(sl, 'pop2', 0.4);
    q(dg, 'sting', 0.6);
    [ln, ap, ph].forEach((x) => q(x, 'pop', 0.5));
    q(cs, 'stamp', 0.7);
    scene(0, () =>
      f < ev - 4 ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Car x={960} y={800} s={1.1 * pop(f, 2)} />
            <Bob f={f} x={420} y={822} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: bl, pose: 'celebrate', expr: 'grin'}]} />
            <Dave f={f} x={1500} y={822} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}, {at: hg, pose: 'shock', expr: 'shock', look: -0.6}]} sweat={f >= th} />
            <G2 x={420} y={330} s={pop(f, bl)}><Card2 text="4.9% APR" color={C.green} /></G2>
            <G2 x={1500} y={330} s={pop(f, hg)}><Card2 text="11.9% APR" color={C.red} /></G2>
            {f >= th && <G2 x={960} y={180} s={pop(f, th)}><Text size={56} color={C.red}>Dave pays thousands more</Text></G2>}
            {f >= dg && <G2 x={960} y={480} s={pop(f, dg)}><Text size={120} stroke="#fff" sw={12}>???</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <ScoreGauge x={960} y={560} s={1.2 * pop(f, cs - 6)} score={lin(f, cs, cs + 30, 300, 640)} />
            {[[ln, 'LOANS', 400], [ap, 'APARTMENTS', 960], [ph, 'PHONE PLANS', 1520]].map(([at, l, x]) => (
              <G2 key={l as string} x={x as number} y={150} s={pop(f, at as number)}>
                <rect x={-190} y={-50} width={380} height={100} rx={50} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text size={40}>{l as string}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'number'), w('o6', 'ingredients'), w('o6', 'myths'), w('o6', 'raise')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['Who makes it', '5 ingredients', 'Myths', 'Raising it'].map((l, i) => (
            <Frame key={l} x={300 + i * 440} y={500} s={pop(f, pv[i] - 2)} w={400} h={380} label={l}>
              {i === 0 && <Bank s={0.25} y={30} label="BUREAU" />}
              {i === 1 && <Text y={-30} size={110} color={C.green}>5</Text>}
              {i === 2 && <XMark s={0.8} y={-30} />}
              {i === 3 && <path d="M -100 40 L -30 0 L 20 20 L 100 -60" fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const th = w('c1b', 'three');
    const ef = w('c1b', 'eight');
    const bk = w('c1b', 'back');
    const hb = w('c1c', 'higher');
    const sv = w('c1c', 'seven');
    const bn = w('c1d', 'banks');
    const ll = w('c1d', 'landlords');
    const rc = w('c1e', 'report');
    const tc = w('c1e', 'teacher');
    q(th, 'pop', 0.5);
    q(ef, 'pop', 0.5);
    q(bk, 'ding', 0.5);
    q(sv, 'ding', 0.6);
    q(bn, 'pop', 0.5);
    q(ll, 'pop', 0.5);
    q(rc, 'paper', 0.6);
    q(tc, 'boing', 0.5);
    const score = f < ef ? 300 : f < sv ? lin(f, ef, ef + 20, 300, 850) : lin(f, sv, sv + 20, 850, 715);
    scene(A('c1a'), () =>
      f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <ScoreGauge x={560} y={560} s={1.1 * pop(f, A('c1a'))} score={score} />
            {f >= bk && <G2 x={1350} y={260} s={pop(f, bk)}><Bubble text={'Will this person\npay us back?'} size={44} tail="left" /></G2>}
            {f >= sv && <G2 x={560} y={900} s={pop(f, sv)}><Text size={44}>US average ≈ 715</Text></G2>}
            {f >= bn && <G2 x={1250} y={620} s={pop(f, bn)}><Bank s={0.4} label="BANK" /><Text y={80} size={32}>loan? interest?</Text></G2>}
            {f >= ll && <G2 x={1600} y={620} s={pop(f, ll)}><House s={0.35} /><Text y={80} size={32}>rent?</Text></G2>}
            <SourceTag f={f} at={sv} text="FICO Score Credit Insights (2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={520} s={pop(f, rc)}><ReportCard s={1.3} grade="?" old="" /></G2>
            <G2 x={700} y={170} s={pop(f, rc + 4)}><Text size={52}>a report card for money</Text></G2>
            {f >= tc && <Stick f={f} x={1400} y={880} s={1.2} acc={['glasses', 'tie']} seed={140} keys={[{at: 0, pose: 'shrug', expr: 'smug', look: -0.6}]} />}
            {f >= tc && <G2 x={1400} y={420} s={pop(f, tc)}><Bubble text="the rules? secret!" size={44} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ HISTORY ============
  {
    const lk = w('h2', 'like');
    const st = w('h2', 'suit');
    const nf = w('h3', 'nineteen');
    const fr = w('h3', 'fair');
    const is = w('h3', 'isaac');
    const mt = w('h3', 'math');
    const ne = w('h4', 'nineteen');
    const fc = w('h4', 'fico');
    const eq = w('h5', 'equifax');
    const ex = w('h5', 'experian');
    const tu = w('h5', 'transunion');
    const ns = w('h6', 'nosy');
    const lt = w('h6', 'late');
    const wr = w('h6', 'write');
    const cu = w('h7', 'customer');
    const pr = w('h7', 'product');
    q(lk, 'pop', 0.5);
    q(st, 'pop', 0.5);
    q(nf, 'dream', 0.4);
    [fr, is].forEach((x) => q(x, 'pop', 0.5));
    q(mt, 'ding', 0.6);
    q(fc, 'stamp', 0.6);
    [eq, ex, tu].forEach((x) => q(x, 'pop', 0.6));
    q(ns, 'boing', 0.5);
    q(wr, 'scribble', 0.6);
    q(cu, 'pop', 0.5);
    q(pr, 'sting', 0.6);
    scene(A('h1'), () =>
      f < A('h5') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.45)'}}>
            <Board />
            <Svg>
              {f < nf - 4 ? (
                <g>
                  <Banker f={f} x={1200} y={880} s={1.2 * pop(f, A('h1'))} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: -0.8}]} />
                  <Stick f={f} x={600} y={880} s={1.1} acc={['hair']} seed={150} keys={[{at: 0, pose: 'present', expr: 'worried', look: 0.8}]} />
                  <G2 x={1200} y={420} s={pop(f, lk)}><Bubble text={f >= st ? 'nice suit?' : 'do I like you?'} size={44} tail="down" /></G2>
                </g>
              ) : (
                <g>
                  <Calendar x={260} y={260} s={0.75} top="YEAR" year={f >= ne ? 1989 : 1956} flip={0} />
                  <Stick f={f} x={700} y={880} s={1.1 * pop(f, fr)} acc={['glasses']} seed={151} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.6}]} />
                  <Stick f={f} x={950} y={880} s={1.1 * pop(f, is)} acc={['tie']} seed={152} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.4}]} />
                  <G2 x={700} y={480} s={pop(f, fr)}><Text size={36}>Bill Fair</Text></G2>
                  <G2 x={950} y={480} s={pop(f, is)}><Text size={36}>Earl Isaac</Text></G2>
                  {f >= mt && f < ne && <G2 x={1450} y={450} s={pop(f, mt)}><Text size={60} color={C.blue}>MATH</Text><Text y={70} size={40}>not gut feelings</Text></G2>}
                  {f >= fc && <Stamp x={1450} y={450} s={pop(f, fc, 9, 260)} text="FICO SCORE" size={64} color={C.green} r={-6} />}
                </g>
              )}
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.5} />
        </AbsoluteFill>
      ) : f < A('h7') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[[eq, 'EQUIFAX'], [ex, 'EXPERIAN'], [tu, 'TRANSUNION']].map(([at, n], i) => (
              <G2 key={n as string} x={560 + i * 400} y={0} s={1}>
                <Stick f={f} x={0} y={822} s={0.95 * pop(f, at as number)} acc={['glasses']} seed={160 + i} keys={[{at: 0, pose: 'hold', expr: f >= wr ? 'grin' : 'suspicious', look: -0.8}]} handItem={<Notepad s={0.6} y={-20} />} />
                <G2 y={420} s={pop(f, at as number)}><Text size={36}>{n as string}</Text></G2>
              </G2>
            ))}
            <Dave f={f} x={180} y={822} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: lt, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            {f >= ns && <G2 x={960} y={160} s={pop(f, ns)}><Text size={56}>three nosy neighbors</Text></G2>}
            {f >= wr && <G2 x={960} y={250} s={pop(f, wr)}><Text size={40} color={C.red}>they write EVERYTHING down</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={1350} y={760} s={0.55 * pop(f, cu)} label="BANK" />
            <G2 x={1350} y={300} s={pop(f, cu)}><Text size={52} color={C.green}>the customer</Text></G2>
            <G2 x={560} y={520} s={pop(f, pr)}>
              <rect x={-230} y={-280} width={460} height={500} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-220} size={34} color="#5B6470">FILE: DAVE</Text>
              {[-150, -90, -30, 30, 90].map((y) => <line key={y} x1={-180} x2={180} y1={y} y2={y} stroke="#C9CED6" strokeWidth={12} strokeLinecap="round" />)}
              <Text y={170} size={44} color={C.red}>= the product</Text>
            </G2>
            <Dave f={f} x={900} y={880} s={0.9} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 on time ============
  {
    const eq = w('c2a', 'equal');
    const tf = w('c2b', 'thirty');
    const ot = w('c2b', 'time');
    const gs = w('c2c', 'gold');
    const pl = w('c2c', 'pile');
    const lt = w('c2d', 'late');
    const bm = w('c2d', 'black');
    const sy = w('c2d', 'seven');
    const fg = w('c2e', 'forgot');
    const ms = w('c2e', 'mistake');
    const bb = w('c2f', 'bob');
    const tw = w('c2f', 'twelve');
    const sm = w('c2f', 'smiled');
    q(eq, 'pop', 0.5);
    q(tf, 'stamp', 0.6);
    q(gs, 'ding', 0.5);
    for (let i = 0; i < 10; i++) q(pl + i * 4, 'pop2', 0.3);
    q(lt, 'buzz', 0.5);
    q(bm, 'thud', 0.7);
    q(sy, 'stamp', 0.5);
    q(fg, 'pop', 0.5);
    q(ms, 'trombone', 0.5);
    q(bb, 'pop', 0.5);
    q(sm, 'ding', 0.5);
    const stars = Math.floor(lin(f, pl, pl + 40, 1, 12));
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={56}>The recipe: 5 ingredients</Text></G2>
            {f < tf && [['35%', C.green], ['30%', C.blue], ['15%', '#8A5CFF'], ['10%', C.yellow], ['10%', '#E9C27A']].map(([p0, c], i) => (
              <G2 key={i} x={400 + i * 280} y={520} s={pop(f, A('c2a') + 6 + i * 5) * (0.6 + (i === 0 ? 0.4 : 0))}>
                <circle r={120} fill={c} stroke={C.ink} strokeWidth={7} />
                <Text size={64} color="#fff">{p0}</Text>
              </G2>
            ))}
            <Pct x={330} y={450} s={pop(f, tf)} pct="35%" label="paying on time" color={C.green} />
            {f >= gs && (
              <g>
                {Array.from({length: stars}).map((_, i) => <Star key={i} x={720 + (i % 6) * 150} y={380 + Math.floor(i / 6) * 150} s={0.9 * pop(f, pl + i * 4)} />)}
                {f >= lt && <G2 x={1400} y={720} s={pop(f, bm)}><circle r={80} fill={C.ink} /><Text y={0} size={30} color="#fff">30+ DAYS</Text><Text y={40} size={26} color="#fff">LATE</Text></G2>}
                {f >= sy && <G2 x={1400} y={900} s={pop(f, sy)}><Text size={40} color={C.red}>stays up to 7 years</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={860} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} />
            <Phone x={400} y={330} s={0.6 * pop(f, fg)} title="PHONE BILL" value="$40 LATE" color={C.red} />
            {f >= ms && <G2 x={400} y={620} s={pop(f, ms)}><Text size={36} color={C.red}>→ higher interest for years</Text></G2>}
            <Bob f={f} x={1400} y={860} s={1.1 * pop(f, bb)} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            {f >= tw && Array.from({length: 12}).map((_, i) => <Star key={i} x={1150 + (i % 6) * 100} y={260 + Math.floor(i / 6) * 100} s={0.6 * pop(f, tw + i * 2)} />)}
            {f >= sm && <Banker f={f} x={960} y={860} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.8}]} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 utilization ============
  {
    const tp = w('c3a', 'thirty');
    const lm = w('c3b', 'limit');
    const oh = w('c3c', 'hundred');
    const rl = w('c3c', 'relaxed');
    const nh = w('c3d', 'nine');
    const nn = w('c3d', 'ninety');
    const ro = w('c3d', 'running');
    const fr = w('c3e', 'fridge');
    const fl = w('c3e', 'full');
    const sp = w('c3e', 'space');
    const tu = w('c3f', 'thirty');
    const tn = w('c3f', 'ten');
    q(tp, 'stamp', 0.6);
    q(lm, 'pop', 0.5);
    q(oh, 'coin', 0.5);
    q(rl, 'ding', 0.5);
    q(nh, 'coin', 0.5);
    q(nn, 'buzz', 0.6);
    q(fr, 'pop', 0.5);
    q(fl, 'thud', 0.5);
    q(sp, 'ding', 0.5);
    q(tu, 'pop', 0.5);
    q(tn, 'pop', 0.5);
    const used = f < oh ? 0 : f < nh ? 0.1 : 0.9;
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Pct x={300} y={420} s={pop(f, tp)} pct="30%" label="how much you use" color={C.blue} />
            <CreditCard x={960} y={330} s={1.1 * pop(f, lm)} />
            <G2 x={960} y={520} s={pop(f, lm)}><Text size={44}>limit: $1,000</Text></G2>
            <G2 x={1100} y={700} s={pop(f, lm)}>
              <rect x={-450} y={-50} width={900} height={100} rx={50} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-446} y={-46} width={892 * ease(f, oh - 6, oh + 10, 0, used) + (f >= nh ? 892 * ease(f, nh, nh + 14, 0, 0) : 0)} height={92} rx={46} fill={used > 0.5 ? C.red : C.green} />
              <Text y={2} size={44}>{used ? `${Math.round(used * 100)}% used` : '0% used'}</Text>
            </G2>
            {f >= rl && f < nh && <G2 x={1100} y={860} s={pop(f, rl)}><Text size={48} color={C.green}>relaxed · under control</Text></G2>}
            {f >= ro && <G2 x={1100} y={860} s={pop(f, ro)}><Text size={48} color={C.red}>looks like running out of money</Text></G2>}
            <Dave f={f} x={300} y={1000} s={0.6} keys={[{at: 0, pose: 'idle', expr: used > 0.5 ? 'worried' : 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={880} s={pop(f, fr)}>
              <Fridge s={1} />
              {Array.from({length: f >= sp ? 3 : 10}).map((_, i) => <rect key={i} x={-90 + (i % 3) * 60} y={-240 + Math.floor(i / 3) * 50} width={50} height={40} rx={6} fill={[C.red, C.yellow, C.green][i % 3]} stroke={C.ink} strokeWidth={3} />)}
            </G2>
            <G2 x={560} y={200} s={pop(f, fl)}><Text size={48}>{f >= sp ? 'some space = calm' : 'stuffed = worry'}</Text></G2>
            {f >= tu && <G2 x={1400} y={420} s={pop(f, tu)}><Text size={90} color={C.blue}>&lt; 30%</Text><Text y={80} size={36}>common advice</Text></G2>}
            {f >= tn && <G2 x={1400} y={720} s={pop(f, tn)}><Text size={90} color={C.green}>&lt; 10%</Text><Text y={80} size={36}>top scores often</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 other three ============
  {
    const fi = w('c4b', 'fifteen');
    const of = w('c4b', 'friend');
    const tn = w('c4c', 'ten');
    const hc = w('c4c', 'hard');
    const ds = w('c4c', 'desperate');
    const mx = w('c4d', 'mix');
    const nt = w('c4e', 'not');
    const sal = w('c4e', 'salary');
    const ml = w('c4e', 'millionaire');
    const rich = w('c4f', 'rich');
    const hb = w('c4f', 'borrowing');
    q(fi, 'pop', 0.6);
    q(of, 'heart', 0.5);
    q(tn, 'pop', 0.6);
    q(hc, 'stamp', 0.5);
    q(ds, 'buzz', 0.5);
    q(mx, 'pop', 0.6);
    q(nt, 'pop', 0.5);
    q(ml, 'boing', 0.5);
    q(hb, 'ding', 0.5);
    scene(A('c4a'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Pct x={350} y={400} s={pop(f, A('c4a') + 4) * (f >= fi ? 1 : 0.7)} pct="15%" label="how long" color="#8A5CFF" />
            <Pct x={960} y={400} s={pop(f, A('c4a') + 8) * (f >= tn ? 1 : 0.7)} pct="10%" label="new credit" color={C.yellow} />
            <Pct x={1570} y={400} s={pop(f, A('c4a') + 12) * (f >= mx ? 1 : 0.7)} pct="10%" label="your mix" color="#E9C27A" />
            {f >= of && f < tn && <G2 x={350} y={800} s={pop(f, of)}><CreditCard s={0.5} /><Text y={100} size={32}>10-year-old card</Text></G2>}
            {f >= hc && f < mx && <G2 x={960} y={800} s={pop(f, hc)}><Magnifier s={0.8} /><Text y={110} size={32} color={f >= ds ? C.red : C.ink}>{f >= ds ? 'too many = desperate' : 'hard check'}</Text></G2>}
            {f >= mx && <G2 x={1570} y={800} s={pop(f, mx)}><CreditCard s={0.4} x={-90} /><Car s={0.25} x={110} y={40} /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c4e'))}><Text size={56}>NOT in the recipe:</Text></G2>
            {['SALARY', 'SAVINGS', 'JOB'].map((l, i) => (
              <G2 key={l} x={560 + i * 400} y={320} s={pop(f, sal + i * 8)}>
                <rect x={-160} y={-50} width={320} height={100} rx={20} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text size={44}>{l}</Text>
                <XMark s={0.4} />
              </G2>
            ))}
            {f >= ml && (
              <g>
                <Stick f={f} x={600} y={900} s={1} acc={['tophat', 'shades']} seed={170} keys={[{at: 0, pose: 'hips', expr: 'suspicious'}]} />
                <ScoreGauge x={600} y={560} s={0.5} score={620} label="MILLIONAIRE" />
                <Dave f={f} x={1350} y={900} s={1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
                <ScoreGauge x={1350} y={560} s={0.5} score={700} label="DAVE" />
              </g>
            )}
            {f >= rich && <G2 x={960} y={1000} s={pop(f, hb)}><Text size={40} color={C.blue}>it's about how you handle borrowing</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 myths ============
  {
    const ms = [bs('c5b'), bs('c5c'), bs('c5d'), bs('c5e'), bs('c5f')];
    const np = [w('c5b', 'nope'), w('c5c', 'nope'), w('c5d', 'opposite'), w('c5e', 'isnt'), w('c5f', 'not')];
    const rc = w('c5c', 'raccoon');
    ms.forEach((x) => q(x, 'pop', 0.5));
    np.forEach((x) => q(x, 'buzz', 0.5));
    q(rc, 'boing', 0.5);
    const labels = ['Checking your own score hurts it', 'You must pay interest to build credit', 'Closing old cards helps', 'High salary = high score', 'Paying a late bill erases it'];
    const cur = ms.filter((x) => f >= x).length;
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>Myths that cost money</Text></G2>
          {cur === 0 && <Dave f={f} x={960} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious'}]} />}
          {cur > 0 && (
            <G2 x={960} y={420} s={pop(f, ms[cur - 1])}>
              <rect x={-620} y={-120} width={1240} height={240} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-60} size={36} color="#5B6470">{'MYTH ' + cur}</Text>
              <Text y={20} size={50}>{labels[cur - 1]}</Text>
              {f >= np[cur - 1] && <Stamp x={480} y={-150} s={pop(f, np[cur - 1], 9, 260)} text="NOPE" size={60} color={C.red} r={-10} />}
            </G2>
          )}
          {cur === 2 && f >= rc && <Raccoon f={f} x={1500} y={820} s={0.7} mood="greedy" holdCoin />}
          {cur === 1 && <G2 x={960} y={800}><Text size={44} color={C.green}>your own check = "soft" · no effect</Text></G2>}
          {cur === 3 && <G2 x={960} y={800}><Text size={44} color={C.green}>less available credit + shorter history</Text></G2>}
          {cur === 5 && <G2 x={960} y={800}><Text size={44} color={C.green}>stays on the report · fades with time</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 cost ============
  {
    const th = w('c6b', 'three');
    const sx = w('c6c', 'six');
    const os = w('c6c', 'fifty');
    const sv = w('c6c', 'seven');
    const fs = w('c6d', 'fifty');
    const nc = w('c6e', 'car');
    const cl = w('c6f', 'car');
    const sev = w('c6f', 'several');
    q(th, 'pop', 0.5);
    q(sx, 'pop', 0.5);
    q(os, 'coin', 0.5);
    q(sv, 'pop', 0.5);
    q(fs, 'cash', 0.7);
    q(nc, 'pop', 0.6);
    q(cl, 'pop', 0.5);
    q(sev, 'cash', 0.5);
    scene(A('c6a'), () =>
      f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <House x={960} y={420} s={0.45 * pop(f, A('c6a'))} />
            <G2 x={960} y={480} s={pop(f, th)}><Text size={44}>$300,000 · 30 years</Text></G2>
            <G2 x={500} y={700} s={pop(f, sx)}><ScoreGauge s={0.55} score={620} label="DAVE" /></G2>
            <G2 x={1420} y={700} s={pop(f, sv)}><ScoreGauge s={0.55} score={770} label="BOB" /></G2>
            {f >= os && <G2 x={500} y={950} s={pop(f, os)}><Text size={48} color={C.red}>+$156 / month</Text></G2>}
            {f >= fs && <G2 x={960} y={160} s={pop(f, fs)}><Text size={110} color={C.red} stroke={C.ink} sw={8}>≈ $56,000</Text></G2>}
            {f >= nc && <Car x={960} y={900} s={0.6 * pop(f, nc)} />}
            <SourceTag f={f} at={os} text="myFICO loan savings calculator (Nov 2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Car x={960} y={800} s={1.1 * pop(f, cl)} />
            <Bob f={f} x={400} y={822} s={1} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
            <Dave f={f} x={1500} y={822} s={1} keys={[{at: 0, pose: 'shrug', expr: 'sad', look: -0.6}]} />
            {f >= sev && <G2 x={960} y={300} s={pop(f, sev)}><Text size={64} color={C.red}>several $1,000s extra</Text><Text y={70} size={36}>on a $30,000 car loan</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 raise ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e'), bs('c7f')];
    const oif = w('c7e', 'one');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(oif, 'stamp', 0.5);
    const items = ['Autopay (at least the minimum)', 'Pay down high balances', 'Keep your oldest card open', 'Check reports free · dispute errors', 'Be patient'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={900} y={100}><Text size={56}>How people raise it</Text></G2>
          <G2 x={1620} y={100}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={120} y={230 + i * 140} s={0.85 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1120} />)}
          {cur === 0 && <ScoreGauge x={1580} y={620} s={0.6} score={640} label="DAVE" />}
          {cur >= 1 && <ScoreGauge x={1580} y={620} s={0.6} score={640 + cur * 22} label="DAVE" />}
          {cur === 4 && f >= oif && <G2 x={1580} y={920} s={pop(f, oif)}><Text size={40} color={C.red}>1 in 5 had an error</Text></G2>}
          {cur === 5 && <G2 x={1580} y={1000}><AppleTree s={0.3} apples={4} /></G2>}
          <SourceTag f={f} at={oif} text="FTC study on credit report accuracy (2012)" until={hs[4]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 ============
  const recap = ['A guess: will you pay it back?', 'On time + low usage = over half', 'Better score = $10,000s saved'];
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
    const hd = w('c8e', 'hundred');
    const sb = w('c8f', 'subscribe');
    q(ei, 'chime', 0.5);
    q(hd, 'coin', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={pop(f, A('c8e'))}><Text size={60}>Next: the 8th wonder of the world?</Text></G2>
            <Stick f={f} x={500} y={880} s={1.2 * pop(f, ei)} acc={['glasses']} seed={180} keys={[{at: 0, pose: 'point_up', expr: 'grin'}]} />
            <G2 x={500} y={430} s={pop(f, ei)}><Text size={36}>Einstein (supposedly)</Text></G2>
            <G2 x={1300} y={520} s={pop(f, hd)}><Coin s={2} /><Text y={180} size={48}>$100 / month → ?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <ScoreGauge x={1550} y={800} s={0.4} score={850} label="SUBSCRIBERS" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3d', 'later') + 20;
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

const Card2: React.FC<{text: string; color: string}> = ({text, color}) => (
  <g>
    <rect x={-190} y={-60} width={380} height={120} rx={24} fill={color} stroke={C.ink} strokeWidth={6} />
    <Text size={52} color="#fff">{text}</Text>
  </g>
);
