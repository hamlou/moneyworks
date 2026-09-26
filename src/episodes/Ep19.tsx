import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bill, Bubble, Calendar, Car, Coin, Duck, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Dial, Envelope, Frame, Magnifier, Phone, Row, Shield, Sign, Sun, SubButton, Bell} from '../props2';
import {Person, Raccoon} from '../props3';
import {House, LineChart, Pizza} from '../props4';
import {Thermo} from '../props7';
import {Notepad, Scale} from '../props8';
import {BtcCoin, Couch, Dominoes, Jar, Jenga, PauseBtn, SmokeAlarm, StormCloud, YieldCurve} from '../props19';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Boss: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Doc: React.FC<SP> = (p) => <Stick acc={['glasses']} seed={55} {...p} />;
const Chef: React.FC<SP> = (p) => <Stick acc={['paperhat']} seed={62} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Card2: React.FC<{x: number; y: number; s: number; big: string; small: string; color: string}> = ({x, y, s, big, small, color}) => (
  <G2 x={x} y={y} s={s}>
    <rect x={-260} y={-150} width={520} height={300} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <Text y={-20} size={96} color={color}>{big}</Text>
    <Text y={80} size={36} color="#5B6470">{small}</Text>
  </G2>
);

export const Ep19: React.FC = () => {
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
    const cch = w('o1', 'couches');
    const gd = w('o1', 'good');
    const bo = w('o1', 'boss');
    const rc = w('o1', 'recession');
    const lk = w('o2', 'look');
    const ml = w('o2', 'million');
    const tm = w('o2', 'months');
    const ft = w('o3', 'fourteen');
    const hi = w('o3', 'highest');
    const nf = w('o3', 'nineteen');
    q(2, 'pop', 0.6);
    q(cch, 'pop', 0.5);
    q(gd, 'cash', 0.5);
    q(bo, 'pop', 0.5);
    q(rc, 'sting', 0.7);
    q(rc + 2, 'stamp', 0.7);
    q(lk, 'pop', 0.6);
    q(ml, 'thud', 0.6);
    q(tm, 'tick', 0.6);
    q(ft, 'stamp', 0.7);
    q(hi, 'ding', 0.5);
    scene(0, () =>
      f < lk - 2 ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Couch x={1250} y={820} s={1.1 * pop(f, 2)} tag="$899" />
            <Dave f={f} x={600} y={880} s={1.2} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: rc, pose: 'shock', expr: 'shock', look: 0.6}]} />
            {f >= gd && f < bo && <G2 x={1250} y={420} s={pop(f, gd)}><Text size={52} color={C.green}>business is good</Text></G2>}
            {f >= bo && <Boss f={f} x={1650} y={880} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'worried', look: -0.8}]} />}
            {f >= bo && f < rc && <G2 x={1450} y={400} s={pop(f, bo)}><Bubble text="Dave... bad news." size={42} tail="right" /></G2>}
            {f >= rc && <Stamp x={1150} y={330} s={pop(f, rc, 9, 260)} text="RECESSION" size={96} color={C.red} r={-6} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, lk - 2)}><Text size={52}>The 2020 recession</Text></G2>
            <G2 x={540} y={430} s={pop(f, lk)}>
              <rect x={-360} y={-170} width={720} height={340} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-90} size={40} color="#5B6470">jobs lost</Text>
              <Text y={20} size={110} color={C.red}>{f >= ml ? '~22 MILLION' : '...'}</Text>
              {f >= tm && <Text y={120} size={46}>in just 2 months</Text>}
            </G2>
            {f >= ft && (
              <G2 x={1400} y={430} s={pop(f, ft)}>
                <LineChart t={ease(f, ft, ft + 20)} pts={[3.5, 3.6, 3.5, 4.4, 14.8, 13.2, 11.0]} lo={0} hi={16} w={600} h={300} color={C.red} />
                <Text y={-230} size={120} color={C.red} stroke={C.ink} sw={8}>14.8%</Text>
                <Text y={210} size={36}>unemployment rate</Text>
              </G2>
            )}
            {f >= hi && <G2 x={1400} y={800} s={pop(f, hi)}><Text size={44} color={C.navy}>{f >= nf ? 'highest since records began (1948)' : 'the highest...'}</Text></G2>}
            <Dave f={f} x={200} y={900} s={0.8} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <SourceTag f={f} at={ml} text="BLS: April 2020 unemployment 14.8%; ~22M jobs lost Mar–Apr 2020" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const wr = w('o4', 'weirder');
    const kn = w('o4', 'know');
    const tq = w('o5', 'two');
    const nt = w('o5', 'not');
    q(wr, 'boing', 0.5);
    q(kn, 'pop', 0.5);
    q(tq, 'pop', 0.5);
    q(nt + 4, 'buzz', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={500} y={880} s={1.3} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: nt, pose: 'shrug', expr: 'suspicious'}]} />
          <G2 x={560} y={380} s={pop(f, A('o4') + 4)}><Bubble text={'Wait... what IS\na recession?'} size={46} tail="down" /></G2>
          {f >= kn && <G2 x={1350} y={260} s={pop(f, kn)}><Text size={140} color={C.navy}>???</Text></G2>}
          {f >= tq && (
            <G2 x={1350} y={600} s={pop(f, tq)}>
              <rect x={-320} y={-130} width={640} height={260} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-70} size={40}>"2 bad quarters"</Text>
              <rect x={-130} y={-10} width={100} height={60} fill={C.red} stroke={C.ink} strokeWidth={5} />
              <rect x={30} y={-10} width={100} height={80} fill={C.red} stroke={C.ink} strokeWidth={5} />
              <line x1={-200} y1={-10} x2={200} y2={-10} stroke={C.ink} strokeWidth={5} />
            </G2>
          )}
          {f >= nt && <XMark x={1350} y={600} s={1.6 * pop(f, nt + 4)} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'recession'), w('o6', 'chain'), w('o6', 'ready')];
    pv.forEach((x) => q(x, 'stamp', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">TODAY</Text>
          {['WHAT IT IS', 'CHAIN REACTION', 'GET READY'].map((l, i) => (
            <Frame key={l} x={380 + i * 580} y={540} s={pop(f, pv[i] - 2)} w={500} h={440} label={['not what most think', 'how it spreads', 'what Dave can do'][i]}>
              {i === 0 && <Magnifier s={1.1} y={-10} />}
              {i === 1 && <Dominoes x={-170} y={80} s={0.6} n={5} gap={90} fall={lin(f, pv[1] + 10, pv[1] + 50)} />}
              {i === 2 && <Jar s={0.55} y={50} level={0.7} />}
              <Text y={-170} size={52} color={[C.navy, C.red, C.green][i]}>{l}</Text>
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 definition ============
  {
    const items = [w('c1b', 'couches'), w('c1b', 'haircuts'), w('c1b', 'pizzas'), w('c1b', 'apps')];
    const gdp = w('c1b', 'g');
    const gr = w('c1c', 'grows');
    const sh = w('c1c', 'shrinks');
    items.forEach((x) => q(x, 'pop', 0.5));
    q(gdp, 'ding', 0.6);
    q(gr, 'boing', 0.4);
    q(sh, 'thud', 0.5);
    const nope = w('c1d', 'nope');
    const rt = w('c1d', 'rule');
    const two = w('c1d', 'two');
    q(two, 'pop', 0.5);
    q(nope, 'buzz', 0.6);
    q(rt, 'stamp', 0.6);
    const nb = w('c1e', 'n');
    const bg = w('c1e', 'big');
    const sp = w('c1e', 'spread');
    const ls = w('c1e', 'lasting');
    q(nb, 'paper', 0.5);
    [bg, sp, ls].forEach((x) => q(x, 'ding', 0.5));
    const ck = [w('c1f', 'jobs'), w('c1f', 'income'), w('c1f', 'spending'), w('c1f', 'factory')];
    ck.forEach((x) => q(x, 'pop2', 0.5));
    const ty = w('c1g', 'twenty');
    const shr = w('c1g', 'shrank');
    const th = w('c1g', 'three');
    const ntr = w('c1g', 'not');
    q(ty, 'paper', 0.5);
    q(shr, 'thud', 0.5);
    q(th, 'ding', 0.6);
    q(ntr, 'stamp', 0.7);
    const dr = w('c1h', 'doctor');
    const tp = w('c1h', 'temperature');
    const ev = w('c1h', 'everything');
    q(dr, 'pop', 0.5);
    q(tp, 'tick', 0.5);
    q(ev, 'ding', 0.6);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c1a'))}><Text size={64}>What is a recession?</Text></G2>
            {f < gdp - 4 ? (
              <g>
                <G2 x={360} y={520} s={0.5 * pop(f, items[0])}><Couch /></G2>
                <G2 x={760} y={500} s={pop(f, items[1])}><Text size={80}>haircuts</Text></G2>
                <G2 x={1160} y={500} s={0.9 * pop(f, items[2])}><Pizza eaten={0} /></G2>
                <G2 x={1560} y={500} s={0.8 * pop(f, items[3])}><Phone title="APPS" value="$4.99" /></G2>
                <Dave f={f} x={960} y={1000} s={0.7} keys={[{at: 0, pose: 'present', expr: 'happy'}]} />
              </g>
            ) : (
              <g>
                <G2 x={960} y={380} s={pop(f, gdp - 4)}>
                  <rect x={-380} y={-130} width={760} height={260} rx={30} fill={C.navy} stroke={C.ink} strokeWidth={6} />
                  <Text y={-40} size={120} color="#fff">GDP</Text>
                  <Text y={70} size={34} color="#C9D6E6">everything a country makes</Text>
                </G2>
                {f >= gr && <G2 x={560} y={760} s={pop(f, gr)}><Text size={60} color={C.green}>grows = healthy</Text></G2>}
                {f >= sh && <G2 x={1360} y={760} s={pop(f, sh)}><Text size={60} color={C.red}>shrinks = uh oh</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <line x1={560} y1={560} x2={1360} y2={560} stroke={C.ink} strokeWidth={6} />
            <G2 x={760} y={560} s={pop(f, A('c1d') + 4)}><rect x={-90} y={0} width={180} height={160} fill={C.red} stroke={C.ink} strokeWidth={6} /><Text y={-40} size={40}>Quarter 1</Text></G2>
            {f >= two && <G2 x={1160} y={560} s={pop(f, two)}><rect x={-90} y={0} width={180} height={200} fill={C.red} stroke={C.ink} strokeWidth={6} /><Text y={-40} size={40}>Quarter 2</Text></G2>}
            <G2 x={960} y={330} s={pop(f, A('c1d') + 6)}><Text size={54}>GDP shrinks 2 quarters in a row?</Text></G2>
            {f >= nope && <XMark x={960} y={600} s={2.2 * pop(f, nope)} />}
            {f >= rt && <Stamp x={960} y={900} s={pop(f, rt, 9, 260)} text="JUST A RULE OF THUMB" size={56} color={C.navy} r={-4} />}
          </Svg>
          <DreamFrame label="WHAT MOST PEOPLE THINK" />
        </AbsoluteFill>
      ) : f < A('c1g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c1e'))}><Text size={56}>The official referee: the NBER</Text></G2>
            <G2 x={330} y={560} s={pop(f, nb)}>
              <rect x={-230} y={-280} width={460} height={560} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-220} size={44} color={C.navy}>N.B.E.R.</Text>
              <Text y={-170} size={26} color="#5B6470">economists' committee</Text>
              {[0, 1, 2].map((i) => <Stick key={i} f={f} x={-120 + i * 120} y={200} s={0.45} acc={i === 1 ? ['glasses', 'tie'] : ['glasses']} seed={90 + i} keys={[{at: 0, pose: 'think', expr: 'think'}]} />)}
            </G2>
            {f < ck[0] ? (
              <g>
                {['a BIG drop in activity', 'SPREAD across the economy', 'lasts MORE than a few months'].map((l, i) => (
                  <Row key={l} x={660} y={360 + i * 170} s={pop(f, [bg, sp, ls][i] - 3)} n={i + 1} text={l} lit={1} color={C.navy} w={1080} />
                ))}
              </g>
            ) : (
              <g>
                {['JOBS', 'INCOME', 'SPENDING', 'FACTORY OUTPUT'].map((l, i) => (
                  <G2 key={l} x={870 + (i % 2) * 560} y={380 + Math.floor(i / 2) * 250} s={pop(f, ck[i])}>
                    <rect x={-240} y={-90} width={480} height={180} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
                    <Text size={52}>{l}</Text>
                    <Text x={200} y={-60} size={50} color={C.green}>✓</Text>
                  </G2>
                ))}
                <G2 x={1150} y={900} s={pop(f, ck[3] + 10)}><Text size={44} color={C.red}>not just GDP</Text></G2>
              </g>
            )}
            <SourceTag f={f} at={bg} text="NBER Business Cycle Dating Committee" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={260} s={0.7 * pop(f, A('c1g'))} top="EXAMPLE" year="2022" flip={0} />
            <line x1={560} y1={420} x2={1100} y2={420} stroke={C.ink} strokeWidth={6} />
            <G2 x={700} y={420} s={pop(f, shr)}><rect x={-80} y={0} width={160} height={160} fill={C.red} stroke={C.ink} strokeWidth={6} /><Text y={-40} size={38}>Q1: −1.6%</Text></G2>
            <G2 x={960} y={420} s={pop(f, shr + 6)}><rect x={-80} y={0} width={160} height={90} fill={C.red} stroke={C.ink} strokeWidth={6} /><Text y={-40} size={38}>Q2: −0.9%</Text></G2>
            <G2 x={830} y={300} s={pop(f, ty)}><Text size={44}>GDP (first estimates)</Text></G2>
            {f >= th && (
              <G2 x={1480} y={420} s={pop(f, th)}>
                <rect x={-280} y={-150} width={560} height={300} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text y={-80} size={38} color="#5B6470">unemployment</Text>
                <Text y={30} size={120} color={C.green}>3.6%</Text>
              </G2>
            )}
            {f >= ntr && <Stamp x={960} y={820} s={pop(f, ntr, 9, 260)} text="NOT A RECESSION" size={80} color={C.green} r={-4} />}
            <SourceTag f={f} at={shr} text="BEA GDP (initial estimates, 2022); BLS: June 2022 unemployment 3.6%" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Doc f={f} x={1300} y={880} s={1.2} keys={[{at: 0, pose: 'talk', expr: 'think', look: -0.8}, {at: ev, pose: 'present', expr: 'happy', look: -0.8}]} />
            <Dave f={f} x={600} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}]} handItem={<Thermo s={0.5} level={0.8} />} />
            <G2 x={1300} y={300} s={pop(f, dr)}><Text size={50}>Dr. Economy</Text></G2>
            {f >= tp && <G2 x={620} y={330} s={pop(f, tp)}><Text size={40}>1 high temperature...</Text></G2>}
            {f >= ev && <G2 x={1000} y={180} s={pop(f, ev)}><Text size={44} color={C.green}>checks EVERYTHING: jobs · income · spending</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 chain reaction ============
  {
    const sc = w('c2b', 'secret');
    const pc = w('c2b', 'paycheck');
    const bb = w('c2c', 'bob');
    const sal = w('c2c', 'salary');
    const pz = w('c2c', 'pizza');
    const pg = w('c2c', 'guy');
    const sc2 = w('c2d', 'scares');
    const pr = w('c2d', 'prices');
    const bk = w('c2d', 'bank');
    const vr = w('c2d', 'virus');
    const nv = w('c2d', 'nervous');
    const old = w('c2d', 'old');
    q(sc, 'pop', 0.5);
    q(pc, 'cash', 0.6);
    q(bb, 'pop', 0.5);
    q(sal, 'coin', 0.5);
    q(pz, 'coin', 0.5);
    q(pg, 'ding', 0.5);
    q(sc2, 'sting', 0.5);
    [pr, bk, vr].forEach((x) => q(x, 'pop', 0.5));
    q(nv, 'boing', 0.4);
    q(old, 'thud', 0.5);
    const fc = w('c2e', 'fewer');
    const dm = w('c2g', 'dominoes');
    const rr = w('c2g', 'round');
    const bsF = w('c2h', 'first');
    const car = w('c2h', 'cars');
    const hs = w('c2h', 'houses');
    const cc = w('c2h', 'couches');
    const gl = w('c2h', 'gulp');
    q(fc, 'thud', 0.4);
    q(bs('c2f'), 'thud', 0.4);
    q(dm, 'clank', 0.5);
    q(rr, 'whoosh', 0.4);
    q(car, 'thud', 0.5);
    q(hs, 'thud', 0.5);
    q(cc, 'thud', 0.6);
    q(gl, 'boing', 0.6);
    const fall = ease(f, A('c2e') + 10, bs('c2g') + 60);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={180} s={pop(f, A('c2a'))}><Text size={70}>THE CHAIN REACTION</Text></G2>
            <Dominoes x={640} y={560} n={5} fall={0} />
            {f >= sc && (
              <G2 x={960} y={780} s={pop(f, sc)}>
                <rect x={-620} y={-90} width={1240} height={180} rx={30} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
                <Text y={0} size={56}>{f >= pc ? "your spending = someone's paycheck" : 'the secret...'}</Text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Couch x={960} y={800} s={0.55} tag="$899" />
            <Bob f={f} x={420} y={822} s={1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: nv, pose: 'panic', expr: 'worried', look: 0.8}]} sweat={f >= nv} />
            <Dave f={f} x={1180} y={822} s={1} keys={[{at: 0, pose: 'wave', expr: 'grin', look: -0.8}, {at: old, pose: 'shrug', expr: 'sad', look: -0.8}]} />
            <Chef f={f} x={1650} y={822} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: pg, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
            {f >= sal && f < sc2 && <G2 x={lin(f, sal, sal + 20, 500, 1120)} y={560}><Bill s={0.7} /></G2>}
            {f >= pz && f < sc2 && <G2 x={lin(f, pz, pz + 20, 1200, 1600)} y={560}><Bill s={0.7} /></G2>}
            {f >= pz && f < sc2 && <G2 x={1420} y={420} s={pop(f, pz)}><Pizza s={0.4} eaten={0} /></G2>}
            {f >= pg && f < sc2 && <G2 x={960} y={200} s={pop(f, pg)}><Text size={48}>Bob → Dave → pizza guy</Text></G2>}
            {f >= sc2 && (
              <g>
                {['prices jump', 'a bank fails', 'a virus'].map((l, i) => (
                  <G2 key={l} x={560 + i * 420} y={200} s={pop(f, [pr, bk, vr][i])}>
                    <rect x={-180} y={-50} width={360} height={100} rx={20} fill={C.red} stroke={C.ink} strokeWidth={5} />
                    <Text size={42} color="#fff">{l}</Text>
                  </G2>
                ))}
              </g>
            )}
            {f >= old && <G2 x={560} y={420} s={pop(f, old)}><Bubble text="I'll keep my old couch." size={40} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, A('c2e'))}><Text size={56}>{f >= dm ? 'like a line of dominoes' : 'one thing knocks over the next'}</Text></G2>
            <Dominoes x={260} y={720} n={6} gap={270} fall={fall} labels={['fewer sales', 'hours cut', 'layoffs', 'less money', 'less pizza', 'more layoffs']} />
            {f >= rr && (
              <G2 x={960} y={900} s={pop(f, rr)}>
                <path d="M -300 0 A 300 60 0 1 1 300 0" fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" />
                <Text y={0} size={46} color={C.red}>less spending ⟷ layoffs</Text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, A('c2h'))}><Text size={60}>big stuff falls first</Text></G2>
            <G2 x={440} y={560} s={pop(f, car)} r={f >= car + 10 ? 20 : 0}><Car s={1.6} /></G2>
            <G2 x={960} y={640} s={0.55 * pop(f, hs)} r={f >= hs + 10 ? -12 : 0}><House /></G2>
            <G2 x={1480} y={620} s={0.7 * pop(f, cc)} r={f >= cc + 10 ? 14 : 0}><Couch /></G2>
            {f >= gl && <Dave f={f} x={960} y={1000} s={0.8} keys={[{at: 0, pose: 'shock', expr: 'scream'}]} sweat />}
            {f >= gl && <G2 x={1250} y={820} s={pop(f, gl)}><Text size={70} color={C.red}>GULP.</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 2008 ============
  {
    const ln = w('c3b', 'loans');
    const an = w('c3b', 'anyone');
    const up = w('c3c', 'up');
    const bm = w('c3c', 'more');
    const fl = w('c3d', 'falling');
    const tw = w('c3d', 'twenty');
    const ow = w('c3d', 'owed');
    const sp = w('c3d', 'stopped');
    const jg = w('c3e', 'jenga');
    const pl = w('c3e', 'pull');
    const wb = w('c3e', 'wobbles');
    const lh = w('c3f', 'lehman');
    const cl = w('c3f', 'collapsed');
    const eg = w('c3g', 'eighteen');
    const em = w('c3g', 'eight');
    const tn = w('c3g', 'ten');
    q(ln, 'paper', 0.5);
    q(an, 'cash', 0.5);
    q(up, 'boing', 0.5);
    q(fl, 'whoosh', 0.5);
    q(tw, 'stamp', 0.6);
    q(ow, 'buzz', 0.5);
    q(sp, 'thud', 0.5);
    q(jg, 'pop', 0.5);
    q(pl, 'click', 0.6);
    q(wb, 'clank', 0.6);
    q(lh, 'pop', 0.5);
    q(cl, 'thud', 0.8);
    q(eg, 'ding', 0.5);
    q(em, 'ding', 0.5);
    q(tn, 'stamp', 0.6);
    scene(A('c3a'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={260} y={250} s={0.7 * pop(f, A('c3a'))} top="RECESSION" year="2008" flip={0} />
            <Banker f={f} x={760} y={880} s={1.2} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
            {f >= ln && [0, 1, 2, 3].map((i) => (
              <G2 key={i} x={lin(f, ln + i * 5, ln + i * 5 + 16, 820, 1150 + i * 180)} y={560 - (i % 2) * 60} s={0.8} r={-8 + i * 5}>
                <rect x={-70} y={-90} width={140} height={180} rx={8} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text y={-40} size={28}>HOME</Text>
                <Text y={0} size={28}>LOAN</Text>
                <Text y={50} size={40} color={C.green}>OK!</Text>
              </G2>
            ))}
            {f >= an && f < up && <G2 x={1400} y={250} s={pop(f, an)}><Text size={52}>loans to almost anyone</Text></G2>}
            {f >= up && (
              <G2 x={1400} y={250} s={pop(f, up)}>
                <Text size={52} color={C.green}>"prices only go UP!"</Text>
                {f >= bm && <Text y={70} size={40}>borrow more... and more...</Text>}
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c3d'))}><Text size={52}>U.S. home prices</Text></G2>
            <LineChart x={760} y={480} t={ease(f, A('c3d'), fl + 40)} pts={[100, 118, 138, 160, 184, 178, 160, 145, 136, 134]} lo={90} hi={190} w={900} h={440} color={f >= fl ? C.red : C.green} />
            {f >= tw && <G2 x={1450} y={420} s={pop(f, tw)}><Text size={130} color={C.red} stroke={C.ink} sw={8}>−27%</Text><Text y={90} size={36}>peak (2006) to bottom (2012)</Text></G2>}
            {f >= ow && (
              <G2 x={1500} y={800} s={pop(f, ow)}>
                <House s={0.4} sold={f >= sp ? 'NOT PAYING' : undefined} />
                <Text x={0} y={70} size={34} color={C.red}>owe more than it's worth</Text>
              </G2>
            )}
            <SourceTag f={f} at={tw} text="S&P CoreLogic Case-Shiller U.S. National Home Price Index" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c3e'))}><Text size={52}>bad loans, hidden inside investments</Text></G2>
            <Jenga x={620} y={940} s={1.25 * pop(f, jg)} f={f} wob={f >= wb ? Math.min(1, (f - wb) / 20) : 0} pulled={ease(f, pl, pl + 20)} fallen={f >= cl ? ease(f, cl, cl + 16) : 0} />
            {f >= jg && <G2 x={960} y={300} s={pop(f, pl)}><Text size={36} color={C.red}>{'← one bad loan'}</Text></G2>}
            {f >= lh && (
              <G2 x={1450} y={820} r={f >= cl ? ease(f, cl, cl + 16, 0, -10) : 0}>
                <Bank s={0.6 * pop(f, lh)} label="LEHMAN BROS" />
              </G2>
            )}
            {f >= cl && <Stamp x={1450} y={560} s={pop(f, cl, 9, 260)} text="COLLAPSED · SEPT 2008" size={50} color={C.red} r={-6} />}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, A('c3g'))}><Text size={60}>The Great Recession (2007–2009)</Text></G2>
            <Card2 x={380} y={500} s={pop(f, eg)} big="18" small="months long" color={C.navy} />
            <Card2 x={960} y={500} s={pop(f, em)} big="8.7M" small="jobs lost" color={C.red} />
            <Card2 x={1540} y={500} s={pop(f, tn)} big="10%" small="unemployment (Oct 2009)" color={C.red} />
            <Dave f={f} x={960} y={1000} s={0.6} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} />
            <SourceTag f={f} at={eg} text="NBER dates; BLS: payrolls −8.7M (2008–2010), unemployment peak 10.0%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 2020 ============
  {
    const df = w('c4a', 'different');
    const vr = w('c4b', 'virus');
    const cl = w('c4b', 'closed');
    const pb = w('c4c', 'pause');
    const tt = w('c4d', 'twenty');
    const rs = w('c4d', 'restaurants');
    const ft = w('c4e', 'fourteen');
    const hg = w('c4e', 'higher');
    const sh = w('c4f', 'shortest');
    const tm = w('c4f', 'two');
    const br = w('c4g', 'brakes');
    const sp = w('c4g', 'speeds');
    q(df, 'pop', 0.5);
    q(vr, 'sting', 0.5);
    q(cl, 'stamp', 0.6);
    q(pb, 'click', 0.8);
    q(tt, 'thud', 0.6);
    q(rs, 'pop', 0.5);
    q(ft, 'stamp', 0.7);
    q(hg, 'ding', 0.5);
    q(sh, 'ding', 0.6);
    q(tm, 'tick', 0.6);
    q(br, 'sputter', 0.6);
    q(sp, 'whoosh', 0.6);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Calendar x={260} y={250} s={0.7 * pop(f, A('c4a'))} top="RECESSION" year="2020" flip={0} />
            {f >= df && f < cl && <G2 x={960} y={330} s={pop(f, df)}><Text size={60}>totally different</Text></G2>}
            {f >= vr && f < cl && <G2 x={1400} y={500} s={pop(f, vr)}><Text size={52}>no bubble · just a virus</Text></G2>}
            {f >= cl && ['SHOPS', 'RESTAURANTS', 'OFFICES'].map((l, i) => (
              <G2 key={l} x={600 + i * 460} y={620} s={pop(f, cl + i * 5)}>
                <rect x={-190} y={-110} width={380} height={220} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text y={-50} size={36}>{l}</Text>
                <Sign y={70} s={0.8} text="CLOSED" />
              </G2>
            ))}
            <Dave f={f} x={200} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <PauseBtn x={500} y={520} s={1.4 * pop(f, A('c4c'))} press={f >= pb + 4 ? 1 : 0} />
            <G2 x={500} y={180} s={pop(f, pb)}><Text size={52}>the economy: PAUSED</Text></G2>
            {f >= tt && (
              <G2 x={1330} y={440} s={pop(f, tt)}>
                <rect x={-400} y={-170} width={800} height={340} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text y={-100} size={38} color="#5B6470">March + April 2020</Text>
                <Text y={10} size={110} color={C.red}>−22 million</Text>
                <Text y={110} size={40}>jobs</Text>
              </G2>
            )}
            {f >= rs && <G2 x={1330} y={800} s={pop(f, rs)}><Text size={44}>hit hardest: restaurants & hotels</Text></G2>}
            <SourceTag f={f} at={tt} text="BLS Current Employment Statistics, 2020" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < sh ? (
              <g>
                <G2 x={960} y={130} s={pop(f, A('c4e'))}><Text size={52}>unemployment peak</Text></G2>
                <line x1={500} y1={880} x2={1420} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                <Bar x={720} y={880} h={ease(f, A('c4e'), A('c4e') + 14, 2, 10 * 40)} color={C.navy} label="Oct 2009" value="10%" w={260} />
                <Bar x={1200} y={880} h={ease(f, ft, ft + 16, 2, 14.8 * 40)} color={C.red} label="April 2020" value="14.8%" w={260} />
                {f >= hg && <G2 x={1600} y={420} s={pop(f, hg)}><Text size={50} color={C.red}>way higher</Text></G2>}
                <SourceTag f={f} at={ft} text="BLS: unemployment rate (seasonally adjusted)" />
              </g>
            ) : (
              <g>
                <G2 x={960} y={130} s={pop(f, sh)}><Text size={60}>the SHORTEST recession on record</Text></G2>
                <Text x={300} y={400} size={40} anchor="start">2008 recession</Text>
                <rect x={300} y={440} width={ease(f, sh, sh + 20, 0, 1320)} height={90} rx={16} fill={C.navy} stroke={C.ink} strokeWidth={5} />
                {f >= sh + 20 && <Text x={960} y={486} size={44} color="#fff">18 months</Text>}
                <Text x={300} y={640} size={40} anchor="start">2020 recession</Text>
                {f >= tm && <rect x={300} y={680} width={ease(f, tm, tm + 10, 0, 147)} height={90} rx={16} fill={C.red} stroke={C.ink} strokeWidth={5} />}
                {f >= tm && <G2 x={620} y={725} s={pop(f, tm + 6)}><Text size={50} color={C.red}>2 months</Text></G2>}
                <SourceTag f={f} at={sh} text="NBER: Feb 2020 peak – Apr 2020 trough" />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={f < br ? 500 : f < sp ? 700 : lin(f, sp, sp + 40, 700, 2300)} y={780} r={f >= br && f < sp ? -5 : 0}><Car s={2} /></G2>
            <G2 x={960} y={250} s={pop(f, A('c4g'))}><Text size={70}>DEEP, BUT QUICK</Text></G2>
            {f >= br && f < sp && <G2 x={560} y={720}>{[0, 1, 2].map((i) => <line key={i} x1={-40 - i * 30} y1={-40 + i * 30} x2={-120 - i * 30} y2={-40 + i * 30} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />)}</G2>}
            {f >= br && <G2 x={960} y={400} s={pop(f, br)}><Text size={46}>{f >= sp ? '...then speeds off again' : 'slam the brakes...'}</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 rescue ============
  {
    const tt = w('c5a', 'teams');
    const fd = w('c5b', 'federal');
    const ct = w('c5c', 'cuts');
    const zr = w('c5c', 'zero');
    const sb = w('c5d', 'standing');
    const dk = w('c5e', 'duck');
    const qk = w('c5e', 'quack');
    const gv = w('c5f', 'government');
    const ub = w('c5f', 'unemployment');
    const pzz = w('c5f', 'pizza');
    const eh = w('c5g', 'eight');
    const tr = w('c5g', 'trillion');
    const ck = w('c5g', 'checks');
    const cr = w('c5h', 'critics');
    const su = w('c5h', 'supporters');
    const pol = w('c5h', 'political');
    q(tt, 'pop', 0.5);
    q(fd, 'pop', 0.6);
    q(ct, 'click', 0.6);
    q(zr, 'ding', 0.6);
    q(sb, 'boing', 0.5);
    q(dk, 'quack', 0.6);
    q(qk, 'quack', 0.7);
    q(gv, 'pop', 0.6);
    q(ub, 'mail', 0.5);
    q(pzz, 'pop2', 0.5);
    q(eh, 'cash', 0.5);
    q(tr, 'cash', 0.7);
    q(ck, 'mail', 0.6);
    q(cr, 'pop', 0.5);
    q(su, 'pop', 0.5);
    q(pol, 'stamp', 0.6);
    const dial = f < ct ? 0.8 : ease(f, ct, zr + 10, 0.8, 0.02);
    const tilt = f < cr ? 0 : f < su ? ease(f, cr, cr + 20, 0, 8) : ease(f, su, su + 20, 8, -8);
    scene(A('c5a'), () =>
      f < A('c5b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dominoes x={560} y={760} n={5} gap={180} fall={0.6} />
            <G2 x={960} y={200} s={pop(f, A('c5a'))}><Text size={60}>who stops the dominoes?</Text></G2>
            {f >= tt && <G2 x={960} y={360} s={pop(f, tt)}><Text size={52} color={C.blue}>TWO TEAMS</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={pop(f, A('c5b'))}><Text size={50} color={C.navy}>TEAM 1: THE FEDERAL RESERVE</Text></G2>
            <Bank x={420} y={900} s={0.8 * pop(f, fd)} label="THE FED" />
            {f < A('c5e') ? (
              <g>
                <Dial x={1250} y={460} s={1.4 * pop(f, ct - 6)} v={dial} />
                {f >= zr && <G2 x={1250} y={740} s={pop(f, zr)}><Text size={46}>2008 & 2020: rates cut to ~0%</Text></G2>}
                {f >= sb && <Dominoes x={1000} y={1010} s={0.5} n={5} gap={120} fall={1 - ease(f, sb, sb + 30)} />}
                <SourceTag f={f} at={zr} text="Federal Reserve: target range 0–0.25% (Dec 2008, Mar 2020)" />
              </g>
            ) : (
              <g>
                <Duck f={f} x={1250} y={620} s={1.5 * pop(f, dk)} />
                <G2 x={1250} y={330} s={pop(f, dk + 4)}><Bubble text={'new money\nto buy bonds!'} size={42} tail="down" /></G2>
                {f >= qk && <G2 x={1600} y={500} s={pop(f, qk)}><Text size={60}>QUACK.</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={pop(f, A('c5f'))}><Text size={50} color={C.green}>TEAM 2: THE GOVERNMENT</Text></G2>
            <Bank x={380} y={900} s={0.7 * pop(f, gv)} label="GOV'T" />
            {f < A('c5g') ? (
              <g>
                <Envelope x={1100} y={450} s={1.3 * pop(f, ub)} label="BENEFITS" />
                {f >= ub && <G2 x={1100} y={680} s={pop(f, ub + 6)}><Text size={40}>unemployment benefits</Text></G2>}
                {f >= pzz && <G2 x={1550} y={500} s={0.7 * pop(f, pzz)}><Pizza eaten={0} /></G2>}
              </g>
            ) : (
              <g>
                <line x1={900} y1={860} x2={1700} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                <Bar x={1080} y={860} h={ease(f, eh, eh + 14, 2, 0.8 * 230)} color={C.blue} label="2009 stimulus" value="~$800B" w={240} />
                <Bar x={1500} y={860} h={ease(f, tr, tr + 14, 2, 2.2 * 230)} color={C.green} label="2020 CARES Act" value="~$2.2T" w={240} />
                {f >= ck && [0, 1, 2].map((i) => <Envelope key={i} x={760 + i * 60} y={300 + i * 40} s={0.6 * pop(f, ck + i * 4)} r={-10 + i * 8} label="CHECK" />)}
                <SourceTag f={f} at={eh} text="CBO: ARRA 2009 ≈ $787B; CARES Act 2020 ≈ $2.2T" />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={880} s={pop(f, A('c5h'))} tilt={tilt} left="critics" right="supporters" />
            {f >= cr && <G2 x={480} y={260} s={pop(f, cr)}><Text size={40}>more national debt</Text><Text y={56} size={40}>prices up later</Text></G2>}
            {f >= su && <G2 x={1440} y={260} s={pop(f, su)}><Text size={40}>doing nothing</Text><Text y={56} size={40}>hurts more</Text></G2>}
            {f >= pol && <Stamp x={960} y={200} s={pop(f, pol, 9, 260)} text="A POLITICAL QUESTION" size={54} color={C.blue} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 how long ============
  {
    const en = w('c6a', 'end');
    const tw = w('c6b', 'twelve');
    const tn = w('c6b', 'ten');
    const fv = w('c6c', 'five');
    const wt = w('c6d', 'weather');
    const st = w('c6d', 'storms');
    const mo = w('c6d', 'most');
    const gd = w('c6e', 'great');
    const ft = w('c6e', 'forty');
    const on = w('c6f', 'one');
    const ui = w('c6g', 'unemployment');
    const di = w('c6g', 'deposit');
    const tb = w('c6g', 'thousands');
    const sn = w('c6g', 'safety');
    q(en, 'chime', 0.6);
    q(tw, 'pop', 0.5);
    q(tn, 'ding', 0.5);
    q(fv, 'ding', 0.6);
    q(st, 'thud', 0.5);
    q(mo, 'ding', 0.5);
    q(gd, 'paper', 0.5);
    q(ft, 'stamp', 0.6);
    q(on, 'thud', 0.6);
    q(ui, 'pop', 0.5);
    q(di, 'pop', 0.5);
    q(tb, 'crowd', 0.4);
    q(sn, 'ding', 0.5);
    scene(A('c6a'), () =>
      f < A('c6b') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Sun x={1500} y={260} f={f} s={pop(f, en)} />
            <Dave f={f} x={800} y={822} s={1.2} keys={[{at: 0, pose: 'think', expr: 'worried'}, {at: en, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={960} y={200} s={pop(f, A('c6a'))}><Text size={70}>{f >= en ? 'RECESSIONS END.' : 'good news...'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c6b'))}><Text size={52}>{f >= tw ? '12 U.S. recessions since World War II' : 'since World War II...'}</Text></G2>
            <Text x={200} y={380} size={40} anchor="start">average recession</Text>
            <rect x={200} y={420} width={ease(f, tn, tn + 12, 0, 10.3 * 22)} height={100} rx={16} fill={C.red} stroke={C.ink} strokeWidth={5} />
            {f >= tn && <G2 x={560} y={470} s={pop(f, tn)}><Text size={48} color={C.red} anchor="start">~10 months</Text></G2>}
            <Text x={200} y={640} size={40} anchor="start">average good times in between</Text>
            {f >= fv && <rect x={200} y={680} width={ease(f, fv, fv + 20, 0, 64.2 * 22)} height={100} rx={16} fill={C.green} stroke={C.ink} strokeWidth={5} />}
            {f >= fv + 20 && <Text x={900} y={732} size={48} color="#fff">~64 months (5+ years)</Text>}
            <SourceTag f={f} at={tn} text="NBER cycles 1945–2020 (via CRS IF10411): 10.3 vs 64.2 months" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, wt)}><Text size={60}>like weather</Text></G2>
            <StormCloud x={420} y={480} f={f} s={pop(f, st)} />
            {f >= mo && Array.from({length: 5}).map((_, i) => <Sun key={i} x={820 + i * 230} y={500} f={f} s={0.6 * pop(f, mo + i * 3)} />)}
            <Text x={420} y={780} size={40}>storm: ~10 months</Text>
            {f >= mo && <Text x={1280} y={780} size={40}>sunny: 5+ years</Text>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, gd)}><Text size={60}>The Great Depression</Text></G2>
            {f < on ? (
              <g>
                <Calendar x={500} y={500} s={pop(f, A('c6e'))} top="STARTED" year="1929" flip={0} />
                {f >= ft && <Card2 x={1300} y={500} s={pop(f, ft)} big="43" small="months of shrinking" color={C.red} />}
              </g>
            ) : f < ui ? (
              <g>
                {[0, 1, 2, 3].map((i) => <Person key={i} x={480 + i * 320} y={560} s={2.4 * pop(f, on + i * 3)} c={i === 3 ? C.red : C.ink} />)}
                <G2 x={960} y={840} s={pop(f, on + 10)}><Text size={64} color={C.red}>1933: 1 in 4 workers jobless</Text></G2>
                <SourceTag f={f} at={on} text="BLS historical estimate: ~24.9% unemployment (1933)" />
              </g>
            ) : (
              <g>
                <G2 x={420} y={420} s={pop(f, ui)}><XMark s={0.8} x={-160} /><Text x={20} size={40} anchor="start">unemployment insurance</Text></G2>
                <G2 x={420} y={540} s={pop(f, di)}><XMark s={0.8} x={-160} /><Text x={20} size={40} anchor="start">deposit insurance</Text></G2>
                {f >= tb && <G2 x={1400} y={620} s={pop(f, tb)}><Bank s={0.5} label="BANK" /><Sign y={-120} s={0.9} text="CLOSED" /></G2>}
                {f >= sn && <G2 x={620} y={820} s={pop(f, sn)}><Shield s={0.9} top="BUILT AFTER" big="safety nets" /></G2>}
              </g>
            )}
          </Svg>
          <OldFilm f={f} o={1} />
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 warning signs ============
  {
    const sn = w('c7a', 'warning');
    const iv = w('c7b', 'inverted');
    const sm = w('c7b', 'simple');
    const lg = w('c7c', 'long');
    const tny = w('c7c', 'ten');
    const thm = w('c7c', 'three');
    const wl = w('c7c', 'waiting');
    const fp = w('c7d', 'flips');
    const iv2 = w('c7d', 'inverted');
    const tro = w('c7e', 'trouble');
    const lk = w('c7e', 'lock');
    const sx = w('c7f', 'sixties');
    const ev = w('c7f', 'every');
    const nf = w('c7g', 'perfect');
    const tw = w('c7g', 'twenty');
    const nr = w('c7g', 'no');
    const sa = w('c7g', 'smoke');
    const cb = w('c7g', 'crystal');
    const o1 = w('c7h', 'unemployment');
    const o2 = w('c7h', 'cutting');
    const o3 = w('c7h', 'couches');
    const nts = w('c7h', 'notes');
    q(sn, 'sting', 0.5);
    q(iv, 'pop', 0.6);
    q(sm, 'ding', 0.5);
    q(lg, 'draw', 0.5);
    q(tny, 'coin', 0.5);
    q(thm, 'coin', 0.5);
    q(fp, 'boing', 0.6);
    q(iv2, 'stamp', 0.6);
    q(tro, 'buzz', 0.4);
    q(lk, 'key', 0.6);
    q(ev, 'stamp', 0.6);
    q(nf, 'pop', 0.5);
    q(nr, 'trombone', 0.5);
    q(sa, 'buzz', 0.5);
    q(cb, 'dream', 0.5);
    [o1, o2, o3].forEach((x) => q(x, 'ding', 0.5));
    q(nts, 'scribble', 0.6);
    const years = ['1969', '1973', '1980', '1981', '1990', '2001', '2007', '2020'];
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={480} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.8}]} handItem={<Magnifier s={0.6} />} />
            <G2 x={1200} y={200} s={pop(f, A('c7a'))}><Text size={60}>{f >= sn ? 'WARNING SIGNS' : 'can we see it coming?'}</Text></G2>
            {f >= iv && (
              <G2 x={1200} y={540} s={pop(f, iv)}>
                <rect x={-480} y={-120} width={960} height={240} rx={30} fill={C.navy} stroke={C.ink} strokeWidth={6} />
                <Text y={-10} size={72} color="#fff">INVERTED YIELD CURVE</Text>
                <Text y={70} size={36} color={C.yellow}>{f >= sm ? "(don't worry, it's simple)" : ''}</Text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c7c'))}><Text size={52}>{f >= fp ? 'upside down: short loans pay MORE' : 'normal: lend longer → earn more'}</Text></G2>
            <YieldCurve x={760} y={560} s={1.2} t={ease(f, lg, lg + 30)} inv={ease(f, fp, fp + 20)} />
            {f >= tny && f < fp && <G2 x={1600} y={420} s={pop(f, tny)}><Text size={44} color={C.green}>10 years: more</Text></G2>}
            {f >= thm && f < fp && <G2 x={1600} y={520} s={pop(f, thm)}><Text size={44}>3 months: less</Text></G2>}
            {f >= wl && f < fp && <G2 x={1600} y={640} s={pop(f, wl)}><Clock2 /></G2>}
            {f >= iv2 && <Stamp x={1550} y={380} s={pop(f, iv2, 9, 260)} text="INVERTED" size={60} color={C.red} r={-8} />}
            {f >= tro && (
              <G2 x={1550} y={700} s={pop(f, tro)}>
                <Bubble text={f >= lk ? "lock in today's rate\nfor 10 years!" : 'trouble ahead...\nrates will be cut'} size={36} tail="down" />
              </G2>
            )}
            <SourceTag f={f} at={lg} text="NY Fed: 10-year minus 3-month Treasury spread" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < nf ? (
              <g>
                <G2 x={960} y={140} s={pop(f, A('c7f'))}><Text size={50}>curve flipped before every U.S. recession since the late 1960s</Text></G2>
                <line x1={160} y1={520} x2={1760} y2={520} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                {years.map((y, i) => (
                  <G2 key={y} x={250 + i * 205} y={520} s={pop(f, sx + i * 4)}>
                    <circle r={40} fill={f >= ev ? C.green : '#fff'} stroke={C.ink} strokeWidth={5} />
                    {f >= ev && <Text y={3} size={44} color="#fff">✓</Text>}
                    <Text y={90} size={36}>{y}</Text>
                  </G2>
                ))}
                <SourceTag f={f} at={sx} text="NY Fed / SF Fed yield-curve research; NBER dates" />
              </g>
            ) : (
              <g>
                <G2 x={960} y={130} s={pop(f, nf)}><Text size={56}>but it's not perfect</Text></G2>
                {f >= tw && (
                  <G2 x={520} y={500} s={pop(f, tw)}>
                    <rect x={-360} y={-170} width={720} height={340} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
                    <Text y={-100} size={40}>Oct 2022 → Dec 2024</Text>
                    <Text y={-20} size={48} color={C.red}>inverted ~2 years</Text>
                    {f >= nr && <Text y={80} size={56} color={C.green}>no recession came</Text>}
                  </G2>
                )}
                {f >= sa && <SmokeAlarm x={1250} y={500} s={1.1 * pop(f, sa)} f={f} on={1} />}
                {f >= sa && <G2 x={1250} y={720} s={pop(f, sa)}><Text size={40}>smoke alarm</Text></G2>}
                {f >= cb && (
                  <G2 x={1620} y={500} s={pop(f, cb)}>
                    <circle r={110} fill="#C9B6FF" stroke={C.ink} strokeWidth={6} opacity={0.9} />
                    <path d="M -80 110 L 80 110 L 60 150 L -60 150 Z" fill={C.wood} stroke={C.ink} strokeWidth={5} />
                    <XMark s={1.2} />
                    <Text y={220} size={40}>crystal ball</Text>
                  </G2>
                )}
                <SourceTag f={f} at={tw} text="FRED T10Y3M: inverted Oct 25, 2022 – Dec 13, 2024" />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c7h'))}><Text size={56}>other warning signs</Text></G2>
            {['more unemployment claims', 'companies cutting hours', 'big purchases slowing (couches!)'].map((l, i) => (
              <Row key={l} x={140} y={300 + i * 170} s={pop(f, [o1, o2, o3][i] - 3)} n={i + 1} text={l} lit={1} color={C.red} w={1060} />
            ))}
            <Dave f={f} x={1560} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: nts, pose: 'hold', expr: 'grin'}]} handItem={f >= nts ? <Notepad s={0.8} /> : undefined} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 get ready ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const fl = w('c8d', 'fell');
    const bk = w('c8d', 'even');
    const rac = w('c8e', 'raccoon');
    const cush = w('c8b', 'cushion');
    const on = w('c8c', 'online');
    q(fl, 'thud', 0.5);
    q(bk, 'ding', 0.5);
    q(rac, 'pop', 0.6);
    q(cush, 'boing', 0.5);
    q(on, 'key', 0.5);
    const items = ['Emergency fund: 3–6 months', 'Keep learning skills', "Don't panic sell", "Don't pile up debt"];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={110}><Text size={60}>How Dave gets ready</Text></G2>
          <G2 x={1560} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={100} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={960} />)}
          {cur === 0 && <Dave f={f} x={960} y={900} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 0 && <G2 x={960} y={480} s={pop(f, A('c8a') + 6)}><Bubble text="What can I do?" size={48} tail="down" /></G2>}
          {cur === 1 && <Jar x={1550} y={620} s={1.1} level={ease(f, hs[0], hs[0] + 60, 0.1, 0.8)} />}
          {cur === 1 && f >= cush && <G2 x={1550} y={900} s={pop(f, cush)}><Text size={40}>a cushion for hard landings</Text></G2>}
          {cur === 2 && (
            <G2 x={1550} y={560}>
              <rect x={-260} y={-170} width={520} height={340} rx={24} fill="#1F2A36" stroke={C.ink} strokeWidth={6} />
              <Text y={-60} size={40} color="#6EF0A8">ONLINE SALES 101</Text>
              <rect x={-200} y={20} width={400 * ease(f, on, on + 40, 0.2, 0.9)} height={40} rx={20} fill={C.green} />
              <Dave f={f} x={0} y={500} s={0.8} keys={[{at: 0, pose: 'typing', expr: 'happy'}]} />
            </G2>
          )}
          {cur === 3 && (
            <G2 x={1500} y={560}>
              <LineChart t={ease(f, hs[2], hs[2] + 90)} pts={[100, 70, 43, 60, 80, 100, 130]} lo={30} hi={140} w={560} h={360} color={C.blue} />
              {f >= fl && <Text x={-60} y={200} size={60} color={C.red}>−57%</Text>}
              {f >= bk && <Text x={180} y={-240} size={40} color={C.green}>back to even (2013)</Text>}
              <Text x={0} y={-290} size={34} color="#5B6470">S&P 500</Text>
            </G2>
          )}
          {cur === 4 && (
            <G2 x={1550} y={620}>
              <G2 x={-120} y={-80}><CardBill /></G2>
              {f >= rac && <Raccoon f={f} x={120} y={120} s={0.9 * pop(f, rac)} mood="greedy" />}
            </G2>
          )}
          <SourceTag f={f} at={fl} text="S&P Dow Jones Indices: S&P 500 Oct 2007–Mar 2009 ≈ −57%" until={hs[3]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hr = w('c8f', 'hours');
    const ef = w('c8f', 'emergency');
    const rn = w('c8f', 'rent');
    const cm = w('c8f', 'calm');
    const kj = w('c8f', 'kept');
    q(hr, 'thud', 0.5);
    q(ef, 'coin', 0.5);
    q(rn, 'paper', 0.5);
    q(cm, 'ding', 0.5);
    q(kj, 'stamp', 0.7);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Couch x={1250} y={820} s={1} tag="SALE" />
          <Dave f={f} x={600} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'worried'}, {at: ef, pose: 'relax', expr: 'happy'}, {at: kj, pose: 'celebrate', expr: 'grin'}]} />
          {f >= hr && <G2 x={600} y={250} s={pop(f, hr)}><Text size={44} color={C.red}>hours cut for a while</Text></G2>}
          {f >= ef && <Jar x={250} y={700} s={0.7 * pop(f, ef)} level={0.6} />}
          {f >= rn && <G2 x={1250} y={250} s={pop(f, rn)}><Text size={44} color={C.green}>rent paid · stayed calm</Text></G2>}
          {f >= kj && <Stamp x={1100} y={480} s={pop(f, kj, 9, 260)} text="KEPT HIS JOB" size={70} color={C.green} r={-6} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 recap ============
  const recap = ['Big, broad drop that lasts months', 'Spreads like dominoes', 'Recessions end: ~10 months on average'];
  {
    const r = [bs('c9b'), bs('c9c'), bs('c9d')];
    q(A('c9a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c9a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={330} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1260} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nb = w('c9e', 'bank');
    const nbo = w('c9e', 'boss');
    const np = w('c9e', 'printer');
    const bt = w('c9e', 'bitcoin');
    const sb = w('c9f', 'subscribe');
    const rp = w('c9f', 'proof');
    q(nb, 'pop', 0.5);
    q(nbo, 'pop', 0.5);
    q(np, 'pop', 0.5);
    q(bt, 'chime', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(rp, 'ding', 0.5);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={pop(f, A('c9e'))}><Text size={60}>Next: money with no bank?</Text></G2>
            <BtcCoin x={1150} y={540} s={1.3 * pop(f, bt)} r={Math.sin(f / 10) * 6} />
            {f < bt && <G2 x={1150} y={540} s={pop(f, A('c9e') + 4)}><Text size={160} color={C.navy}>?</Text></G2>}
            {['no bank', 'no boss', 'no printer'].map((l, i) => (
              <G2 key={l} x={1600} y={380 + i * 120} s={pop(f, [nb, nbo, np][i])}><Text size={44} color={C.red}>{l}</Text></G2>
            ))}
            {f >= bt && <G2 x={1150} y={860} s={pop(f, bt)}><Text size={52}>How Bitcoin actually works</Text></G2>}
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
            {f >= rp && <Stamp x={960} y={680} s={pop(f, rp, 9, 260)} text="RECESSION-PROOF" size={52} color={C.green} r={-4} />}
            <Sparkle x={1550} y={700} t={(f % 30) / 30} s={0.8} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4d', 'hardest') + 15;
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

const Clock2: React.FC = () => (
  <g>
    <circle r={60} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <line x1={0} y1={0} x2={0} y2={-40} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    <line x1={0} y1={0} x2={30} y2={10} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    <Text y={100} size={36}>waiting longer = paid more</Text>
  </g>
);

const CardBill: React.FC = () => (
  <g>
    <rect x={-200} y={-130} width={400} height={260} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <Text y={-80} size={34} color="#5B6470">CREDIT CARD BILL</Text>
    <Text y={0} size={72} color={C.red}>$$$</Text>
    <Text y={70} size={30} color={C.red}>+ interest</Text>
    <Coin x={170} y={-120} s={0.6} />
  </g>
);
