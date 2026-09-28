import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, Car, Card, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Magnifier, Row, SubButton, Bell} from '../props2';
import {Flag} from '../props6';
import {Diamond, RingBox, AdPoster, SalaryStack, PriceSlash, ResaleTag, JewelerCounter, Ring} from '../props44';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Partner: React.FC<SP> = (p) => <Stick acc={['bun']} seed={53} {...p} />;
const Salesman: React.FC<SP> = (p) => <Stick acc={['shades', 'tie']} seed={60} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';

const Box: React.FC<{x: number; y: number; w: number; h: number; o?: number; s?: number; fill?: string; children?: React.ReactNode}> = ({x, y, w, h, o = 1, s = 1, fill = '#fff', children}) => (
  <G2 x={x} y={y} o={o} s={s}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </G2>
);

export const Ep44: React.FC = () => {
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
  const bump = (at: number, k = 0.14) => (f < at ? 1 : 1 + k * Math.sin(Math.PI * Math.min(1, (f - at) / 12)));
  const lt = (at: number, lo = 0.35) => (f >= at ? 1 : lo);
  const P = (at: number) => pop(f, at + 2);

  // ============ COLD OPEN ============
  {
    const rg = w('o1', 'ring');
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <JewelerCounter x={960} y={760} s={1.2 * P(0)} />
          <Salesman f={f} x={1380} y={640} s={1} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.8}]} />
          <Dave f={f} x={560} y={700} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} />
          <G2 x={960} y={560} s={P(0) * bump(rg, 0.12)}><RingBox open={0.3} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mgc = w('o2', 'magic');
    const mo = w('o2', 'months');
    q(mgc, 'ding', 0.5);
    q(mo, 'stamp', 0.6);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <JewelerCounter x={960} y={760} s={1.2} />
          <Salesman f={f} x={1380} y={640} s={1} keys={[{at: 0, pose: 'talk', expr: 'smug', look: -0.8}]} />
          <Dave f={f} x={560} y={700} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}]} />
          <G2 x={1380} y={340} s={P(A('o2')) * bump(mgc, 0.12)} o={lt(mgc, 0.4)}><Bubble text={'"about three months\nof your salary"'} size={38} tail="down" /></G2>
          <G2 x={960} y={560} s={P(A('o2'))}><RingBox open={0.3} /></G2>
          <Stamp x={960} y={220} s={pop(f, mo)} text="3 MONTHS' SALARY" size={40} color={C.red} r={-4} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const brn = w('o3', 'brain');
    const st = w('o3', 'stomach');
    const rk = w('o4', 'rock');
    const nv = w('o4', 'never');
    const sl = w('o4', 'sell');
    q(brn, 'scribble', 0.5);
    q(st, 'buzz', 0.6);
    q(rk, 'pop', 0.5);
    q(sl, 'buzz', 0.5);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={620} y={880} s={1.3} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: st, pose: 'shock', expr: 'shock'}]} sweat={f >= st} />
          <G2 x={620} y={480} s={1.2 * P(A('o3')) * bump(brn, 0.12)} o={lt(brn, 0.6)}>
            <rect x={-180} y={-110} width={360} height={220} rx={18} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-46} size={28} color={GRAY}>DAVE'S BRAIN</Text>
            <Text y={34} size={54} color={f >= st ? C.red : GRAY}>{f >= st ? '3 mo. pay = $$$' : '?'}</Text>
          </G2>
          <G2 x={1360} y={640} s={1.6 * P(A('o3')) * bump(rk, 0.1)}><Diamond glow={f >= rk ? 0.3 : 0} /></G2>
          <Box x={1360} y={900} w={520} h={110} o={lt(sl, 0.5)}><Text size={34} color={f >= sl ? C.red : GRAY}>{f >= sl ? 'never sold. just worn.' : 'a rock. on a ring.'}</Text></Box>
          {f >= sl && <XMark x={1520} y={760} s={0.5 * pop(f, sl)} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('o5', 'twist');
    const co = w('o5', 'company');
    const pu = w('o5', 'purpose');
    const wh = w('o6', 'where');
    const wo = w('o6', 'worth');
    const bu = w('o6', 'buy', 1);
    q(tw, 'boing', 0.5);
    q(co, 'stamp', 0.7);
    q(pu, 'ding', 0.5);
    q(wh, 'pop', 0.5);
    q(wo, 'pop2', 0.5);
    q(bu, 'pop2', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={420} s={P(A('o5')) * bump(co, 0.12)}>
            <AdPoster headline={f >= co ? 'A DIAMOND\nCOMPANY' : 'a made-up\n"rule"?'} sub={f >= pu ? 'invented on purpose' : undefined} />
          </G2>
          <G2 y={720}><Text x={960} size={40} color={GRAY}>{f >= tw ? 'not tradition. not science.' : 'here\'s the twist...'}</Text></G2>
          {['RULE ORIGIN', 'REAL WORTH', 'HOW TO BUY SMART'].map((l, i) => (
            <G2 key={l} x={370 + i * 610} y={940} s={P(A('o5')) * bump([wh, wo, bu][i], 0.1)} o={f >= [wh, wo, bu][i] ? 1 : 0.4}>
              <rect x={-230} y={-70} width={460} height={140} rx={20} fill={f >= [wh, wo, bu][i] ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={5} />
              <Text y={6} size={34}>{l}</Text>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: the rule that isn't a rule ============
  {
    const wq = w('c1a', 'who');
    const db = w('c1b', 'beers');
    q(wq, 'ding', 0.4);
    q(db, 'stamp', 0.7);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c1a'))}><Text size={54}>says who?</Text></G2>
          <Dave f={f} x={480} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
          <Box x={1300} y={620} w={780} h={420} s={P(A('c1a')) * bump(db, 0.1)}>
            <Text y={-100} size={36} color={GRAY}>who decided? not religion. not government.</Text>
            <Text y={20} size={64} color={f >= db ? C.red : GRAY}>{f >= db ? 'DE BEERS' : '?'}</Text>
            <Text y={110} size={30} color={GRAY}>a diamond company</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th30 = w('c1c', 'thirties');
    const on = w('c1c', 'one');
    const eig = w('c1c', 'eighties');
    const tw = w('c1c', 'two');
    q(th30, 'paper', 0.5);
    q(on, 'coin', 0.5);
    q(eig, 'paper', 0.5);
    q(tw, 'coin', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={960} y={110} w={900} h={130}><Text size={44}>the salary number kept climbing</Text></Box>
          <SalaryStack x={620} y={880} s={1.1 * P(A('c1c')) * bump(on, 0.1)} months={1} label="1930s: 1 month" />
          <Arrow d="M 850 780 L 1150 780" t={f >= tw ? 1 : 0.2} />
          <SalaryStack x={1360} y={880} s={1.1 * P(A('c1c')) * bump(tw, 0.12)} months={f >= tw ? 2 : 1} label="1980s: 2 months" color={f >= tw ? C.red : C.gray} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const jp = w('c1d', 'japan');
    const th = w('c1d', 'three');
    const bar = w('c1d', 'barely');
    q(jp, 'ding', 0.5);
    q(th, 'coin', 0.6);
    q(bar, 'buzz', 0.5);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={960} y={110} w={1000} h={120}><Text size={40}>and in Japan? De Beers went further</Text></Box>
          <Flag kind="jp" x={620} y={640} s={1.1 * P(A('c1d')) * bump(jp, 0.1)} />
          <SalaryStack x={1300} y={880} s={1.1 * P(A('c1d')) * bump(th, 0.12)} months={f >= th ? 3 : 1} label="Japan: 3 months" color={f >= th ? C.navy : C.gray} />
          <G2 x={620} y={900} o={lt(bar, 0.4)}><Text size={32} color={GRAY}>where rings barely existed before</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sm = w('c1e', 'same', 0);
    const cont = w('c1e', 'continent');
    q(sm, 'ding', 0.5);
    q(cont, 'buzz', 0.5);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={P(A('c1e')) * bump(sm, 0.1)}><Text size={44}>same company. different numbers.</Text></G2>
          <Flag kind="us" x={480} y={700} s={0.85 * P(A('c1e'))} />
          <Flag kind="jp" x={960} y={700} s={0.85 * P(A('c1e'))} />
          <Flag kind="uk" x={1440} y={700} s={0.85 * P(A('c1e'))} />
          <G2 x={960} y={980} s={P(A('c1e')) * bump(cont, 0.1)} o={lt(cont, 0.4)}><Text size={38} color={C.red}>{f >= cont ? 'that\'s marketing, not tradition' : ''}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: how a company invented a tradition ============
  {
    const dec = w('c2b', 'depression');
    const brd = w('c2b', 'bread');
    q(dec, 'thud', 0.6);
    q(brd, 'buzz', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <OldFilm f={f} o={f >= A('c2b') ? 0.5 : 0} />
        <Svg>
          <Box x={960} y={130} w={1000} h={130}><Text size={46}>how do you invent a "tradition"?</Text></Box>
          <Dave f={f} x={960} y={660} s={1.5 * P(A('c2a')) * bump(dec, 0.06)} keys={[{at: 0, pose: 'pockets', expr: 'sad'}]} />
          <Box x={960} y={940} w={1100} h={110}><Text size={36} color={GRAY}>{f >= dec ? 'the Great Depression: diamond sales crash' : 'rewind to the 1940s...'}</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('c2c', 'wrote');
    const fv = w('c2c', 'forever');
    q(wr, 'scribble', 0.5);
    q(fv, 'chime', 0.7);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={P(A('c2c'))}><Text size={42}>copywriter Frances Gerety writes 4 words</Text></G2>
          <G2 x={960} y={620} s={1.1 * P(A('c2c')) * bump(fv, 0.1)}><AdPoster headline={f >= fv ? 'A DIAMOND\nIS FOREVER' : '. . .'} sub={f >= wr ? '1947' : undefined} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const res = w('c2d', 'resell');
    const gen = w('c2d', 'generation', 0);
    const brd = w('c2e', 'brides');
    const eightTen = w('c2e', 'ten', 1);
    q(res, 'buzz', 0.5);
    q(gen, 'ding', 0.5);
    q(brd, 'pop', 0.5);
    q(eightTen, 'chime', 0.6);
    scene(A('c2d'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={950} h={120}><Text size={42} color={f >= res ? C.red : GRAY}>{f >= res ? 'so you never resell it' : 'the idea was brilliant...'}</Text></Box>
            {[0, 1, 2].map((i) => (
              <G2 key={i} x={370 + i * 590} y={660} s={1.5 * P(A('c2d')) * bump(gen, 0.08)} o={f >= gen ? 1 : 0.6}>
                <Ring glow={0} />
                <Text y={160} size={30}>generation {i + 1}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={130} w={950} h={120}><Text size={44}>a slogan changed a whole country</Text></Box>
            <Bar x={620} y={880} s={1.1 * P(A('c2e')) * bump(brd, 0.1)} h={f >= brd ? 110 : 90} color={C.gray} label="1939" value="10%" />
            <Bar x={1300} y={880} s={1.1 * P(A('c2e')) * bump(eightTen, 0.1)} h={f >= eightTen ? 460 : 90} color={C.green} label="1990" value="80%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: what a diamond is actually worth ============
  {
    const wth = w('c3a', 'worth');
    q(wth, 'ding', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={960} y={140} w={1000} h={130}><Text size={50}>what's a diamond actually worth?</Text></Box>
          <G2 x={960} y={640} s={1.8 * P(A('c3a')) * bump(wth, 0.06)}><Diamond /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fifty = w('c3b', 'fifty', 0);
    const two = w('c3b', 'two');
    const smaller = w('c3c', 'stores');
    const smile = w('c3c', 'smile');
    q(fifty, 'ding', 0.5);
    q(two, 'stamp', 0.6);
    q(smaller, 'pop', 0.5);
    q(smile, 'pop2', 0.5);
    scene(A('c3b'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={130} w={950} h={120}><Text size={42}>jewelry stores mark diamonds way up</Text></Box>
            <Bar x={620} y={880} s={1.2 * P(A('c3b'))} h={200} color={C.blue} label="wholesale" value="$" />
            <Arrow d="M 800 750 L 1100 750" t={f >= fifty ? 1 : 0.2} />
            <Bar x={1360} y={880} s={1.2 * P(A('c3b')) * bump(two, 0.1)} h={f >= two ? 560 : 200} color={C.red} label="retail markup" value={f >= two ? '+50–200%' : '?'} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c3c'))}><Text size={42}>where the markup goes</Text></G2>
            {['STORE RENT', 'VELVET BOX', 'AD CAMPAIGN', 'SALESMAN\'S SMILE'].map((l, i) => (
              <G2 key={l} x={280 + i * 460} y={620} s={P(A('c3c')) * bump(smile, 0.08)} o={f >= smaller ? 1 : 0.4}>
                <Frame w={400} h={420}>
                  <Text y={0} size={34}>{l}</Text>
                </Frame>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const loss = w('c3d', 'loss');
    const half = w('c3d', 'half');
    const car = w('c3e', 'car', 1);
    q(loss, 'buzz', 0.6);
    q(half, 'thud', 0.7);
    q(car, 'pop', 0.5);
    scene(A('c3d'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={130} w={950} h={120}><Text size={44} color={f >= loss ? C.red : GRAY}>{f >= loss ? 'an instant loss' : 'try to resell it tomorrow...'}</Text></Box>
            <ResaleTag x={960} y={640} s={1.4 * P(A('c3d')) * bump(half, 0.08)} paid="$4,600" get={f >= half ? '~$2,000' : '?'} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={P(A('c3e'))}><Text size={44}>like driving a new car off the lot</Text></G2>
            <Car x={960} y={700} s={2.2 * P(A('c3e')) * bump(car, 0.08)} />
            <G2 x={960} y={920} o={lt(car, 0.4)}><Text size={32} color={GRAY}>except the car still gets you to work</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const scam = w('c3f', 'scam');
    const slog = w('c3f', 'slogan');
    q(scam, 'ding', 0.5);
    q(slog, 'chime', 0.6);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={620} s={P(A('c3f')) * bump(scam, 0.08)}><Text size={40} color={GRAY}>not a scam, exactly...</Text></G2>
          <G2 x={1360} y={620} s={1.05 * P(A('c3f')) * bump(slog, 0.08)}><AdPoster headline={'"FOREVER"'} sub="beats: good luck reselling this" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: the lab-grown price crash ============
  {
    const lab = w('c4a', 'diamonds', 0);
    q(lab, 'ding', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('c4a'))}><Text size={48}>the lab-grown price crash</Text></G2>
          <G2 x={620} y={640} s={1.1 * P(A('c4a'))}><Diamond color="#CFEFFF" /><G2 y={160}><Text size={34}>MINED</Text></G2></G2>
          <G2 x={1300} y={640} s={1.1 * P(A('c4a')) * bump(lab, 0.1)}><Diamond color="#D7F5E3" glow={f >= lab ? 0.3 : 0} /><G2 y={160}><Text size={34} color={C.green}>LAB-GROWN</Text></G2></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const eq = w('c4b', 'equipment');
    const gp = w('c4c', 'gap');
    const th = w('c4c', 'thousand');
    q(eq, 'ding', 0.5);
    q(gp, 'buzz', 0.6);
    q(th, 'cash', 0.7);
    scene(A('c4b'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={950} h={120}><Text size={40}>same carbon. same crystal structure.</Text></Box>
            <Diamond x={680} y={640} s={1.5} />
            <Diamond x={1240} y={640} s={1.5} color="#D7F5E3" />
            <Magnifier x={960} y={660} s={1.2 * P(A('c4b')) * bump(eq, 0.1)} />
            <Box x={960} y={940} w={1200} h={110}><Text size={32} color={GRAY}>gemologists need special equipment to tell them apart</Text></Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={130} w={900} h={120}><Text size={40} color={C.red}>the price gap is enormous</Text></Box>
            <PriceSlash x={960} y={650} s={1.5 * P(A('c4c')) * bump(th, 0.08)} from="$4,600" to="< $1,000" label="1 carat, high quality" hit={f >= th ? 1 : 0} />
            <SourceTag f={f} at={th} text="Industry price trackers, 2025-2026 (e.g. Washington Diamond, idyl, MadisonDia)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pct = w('c4d', 'percent');
    const six = w('c4e', 'six');
    const fd = w('c4e', 'four');
    q(pct, 'stamp', 0.7);
    q(six, 'coin', 0.6);
    q(fd, 'cash', 0.7);
    scene(A('c4d'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={620} s={1.3 * P(A('c4d'))}><Diamond color="#D7F5E3" /></G2>
            <G2 x={1240} y={620} s={1.1 * P(A('c4d'))}><Diamond color="#CFEFFF" /></G2>
            <Stamp x={960} y={560} s={pop(f, pct)} text="75–90% LESS" size={70} color={C.green} r={-4} />
            <Box x={960} y={860} w={1050} h={110}><Text size={36} color={GRAY}>for a stone a machine has to tell apart</Text></Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c4e')) * bump(six, 0.1)}><Text size={40}>{f >= six ? '6 in 10 US couples chose lab-grown (2025)' : 'shoppers have noticed...'}</Text></G2>
            <Card x={620} y={600} top="LAB-GROWN AVG" big={f >= fd ? '$4,300' : '?'} color={C.green} s={P(A('c4e')) * bump(fd, 0.1)} w={720} />
            <Card x={1360} y={600} top="NATURAL AVG" big={f >= fd ? '$7,000' : '?'} color={C.blue} s={P(A('c4e')) * bump(fd, 0.1)} w={720} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const svt = w('c4f', 'seventy');
    const rst = w('c4f', 'resetting');
    q(svt, 'thud', 0.6);
    q(rst, 'buzz', 0.6);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={620} y={130} w={800} h={120}><Text size={40}>fallen ~74% since 2020</Text></Box>
          <Bar x={620} y={900} s={1.2 * P(A('c4f')) * bump(svt, 0.1)} h={500} color={f >= svt ? C.red : C.gray} label="2020" value="then" />
          <Bar x={1000} y={900} s={1.2 * P(A('c4f')) * bump(svt, 0.14)} h={130} color={f >= svt ? C.green : C.gray} label="2025" value="now" />
          <Box x={1420} y={700} w={560} h={200} o={lt(rst, 0.4)}><Text size={36} color={GRAY}>{f >= rst ? 'a market resetting,\nnot a sale' : 'still falling...'}</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: the average ring today ============
  {
    const nope = w('c5a', 'nope');
    q(nope, 'buzz', 0.6);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <DreamBgLite />
        <Svg>
          <Dave f={f} x={620} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'neutral'}]} />
          <G2 x={620} y={480} s={P(A('c5a'))}><Bubble text={'everyone still spends\nthree months\' salary'} size={36} tail="down" /></G2>
          <Stamp x={1300} y={620} s={pop(f, nope)} text="NOPE" size={90} r={-8} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const knt = w('c5b', 'knots');
    const fd = w('c5b', 'four');
    q(knt, 'ding', 0.5);
    q(fd, 'cash', 0.7);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={920} s={1.1 * P(A('c5b'))} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          <Card x={1240} y={560} top="THE KNOT · 2025 REAL WEDDINGS" big={f >= fd ? '$4,600' : '?'} color={C.navy} s={1.3 * P(A('c5b')) * bump(fd, 0.1)} w={900} />
          <SourceTag f={f} at={fd} text="The Knot, '2025 Real Weddings Study'" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wk = w('c5c', 'weeks');
    const dr = w('c5d', 'drew');
    q(wk, 'ding', 0.6);
    q(dr, 'boing', 0.5);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={960} y={130} w={800} h={120}><Text size={40}>reality vs. the "rule"</Text></Box>
          <SalaryStack x={620} y={880} s={1.1 * P(A('c5c')) * bump(wk, 0.12)} months={1} label="reality: ~1 month's pay" color={C.green} />
          <SalaryStack x={1360} y={880} s={1.1 * P(A('c5c'))} months={3} label={'the old "rule": 3 months'} color={C.red} />
          <G2 x={960} y={300} s={P(A('c5c')) * bump(dr, 0.1)} o={lt(dr, 0.4)}><Text size={34} color={GRAY}>{f >= dr ? 'bigger ring, smaller bill' : ''}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: who actually profits ============
  {
    const fol = w('c6a', 'follow');
    q(fol, 'ding', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c6a')) * bump(fol, 0.1)}><Text size={52}>follow the money</Text></G2>
          <JewelerCounter x={960} y={700} s={1.1 * P(A('c6a'))} />
          <Salesman f={f} x={1300} y={580} s={0.9} keys={[{at: 0, pose: 'present', expr: 'smug'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sale = w('c6b', 'sale');
    const fake = w('c6c', 'fake');
    q(sale, 'cash', 0.6);
    q(fake, 'buzz', 0.5);
    scene(A('c6b'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={950} h={120}><Text size={40}>bigger "should spend" = bigger sale</Text></Box>
            <Salesman f={f} x={960} y={860} s={1.7 * P(A('c6b')) * bump(sale, 0.08)} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            <JewelerCounter x={960} y={1020} s={1.3 * P(A('c6b'))} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={960} y={140} w={950} h={120}><Text size={40}>mined-diamond industry benefits too</Text></Box>
            <G2 x={620} y={660} s={1.5 * P(A('c6c'))}><Diamond color="#D7F5E3" /></G2>
            <Box x={620} y={880} w={360} h={100}><Text size={30} color={GRAY}>lab-grown</Text></Box>
            <G2 x={1300} y={620} s={P(A('c6c')) * bump(fake, 0.1)} o={lt(fake, 0.5)}><Bubble text={'"that\'s not a REAL\ndiamond..."'} size={34} tail="down" /></G2>
            {f >= fake && <XMark x={1300} y={840} s={0.5 * pop(f, fake)} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const fair = w('c6d', 'fair');
    const cost = w('c6d', 'cost');
    q(fair, 'ding', 0.5);
    q(cost, 'chime', 0.5);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={130} s={P(A('c6d')) * bump(fair, 0.1)}><Text size={42}>to be fair...</Text></G2>
          <Owner f={f} x={620} y={840} s={1.15 * P(A('c6d'))} keys={[{at: 0, pose: 'present', expr: 'happy'}]} />
          <G2 x={620} y={520} o={lt(fair, 0.4)}><Text size={32} color={GRAY}>honest small jewelers exist too</Text></G2>
          <Box x={1360} y={640} w={640} h={360} s={P(A('c6d')) * bump(cost, 0.08)}>
            <Text y={-50} size={32} color={GRAY}>know which is which:</Text>
            <Text y={30} size={38} color={f >= cost ? C.green : GRAY}>{f >= cost ? 'marketing vs. real cost' : '?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: how to actually buy a ring ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Set your own number first (not a % of salary)', 'Seriously consider lab-grown', 'Consider heirloom, vintage, or no diamond', 'Remember: rings are for wearing, not investing'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={50}>How to actually buy a ring</Text></G2>
          <G2 x={650} y={160}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={300 + i * 170} s={0.9 * P(A('c7a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1220} />)}
          {cur === 0 && <Card x={1600} y={880} top="YOUR BUDGET" big="$?" color={C.blue} s={0.85} />}
          {cur === 1 && <Diamond x={1600} y={880} s={0.9} color="#D7F5E3" glow={0.3} />}
          {cur === 2 && <Ring x={1600} y={880} s={1.4} />}
          {cur >= 3 && <G2 x={1600} y={880} s={1}><Ring s={1.3} /><Text y={140} size={30}>wear it, love it</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: this isn't anti-romance ============
  {
    const ruin = w('c8a', 'ruins');
    const val = w('c8b', 'valid');
    const marketing = w('c8c', 'someone');
    q(ruin, 'ding', 0.4);
    q(val, 'chime', 0.6);
    q(marketing, 'ding', 0.5);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={960} y={130} w={800} h={120}><Text size={44}>this isn't anti-romance</Text></Box>
          <G2 x={560} y={660} s={1.4 * P(A('c8a')) * bump(val, 0.1)}><RingBox open={1} glow={f >= val ? 0.3 : 0} /></G2>
          <Dave f={f} x={1180} y={920} s={1.2} keys={[{at: 0, pose: 'present', expr: 'happy'}]} />
          <Partner f={f} x={1460} y={920} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
          <Box x={1330} y={560} w={520} h={200} o={lt(marketing, 0.5)}><Text size={32} color={C.green}>{f >= marketing ? 'the enemy is the fake rule,\nnot the diamond' : 'just love, done right'}</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['The "months of salary" rule was invented by De Beers — pure marketing.', 'Diamonds carry a big markup & lose value fast; lab-grown costs 75-90% less.', 'The real average ring is ~$4,600. Set your own number.'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={220} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1480} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nx = w('r5', 'next');
    const sb = w('r6', 'subscribe');
    const req = w('r6', 'required');
    q(nx, 'pop', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(req, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5')) * bump(nx, 0.1)}><Text size={50}>Next time on Dave Explains Money</Text></G2>
            <Dave f={f} x={960} y={780} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'happy'}]} />
            <G2 x={960} y={440} s={P(A('r5'))}><Bubble text={'another bill,\nanother hidden reason'} size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Ring x={1600} y={900} s={1.2} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4c', 'thousand') + 20;
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

const DreamBgLite: React.FC = () => (
  <Svg>
    <rect x={-400} y={-300} width={2720} height={1680} fill="#F7EEDC" />
  </Svg>
);
