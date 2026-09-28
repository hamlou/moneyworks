import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Card, Duck, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Row, SubButton, Bell, Envelope} from '../props2';
import {Raccoon, SourceCard} from '../props3';
import {SlicePie} from '../props8';
import {People} from '../props35';
import {RingBox} from '../props44';
import {PriceCake, Venue, GuestRow, RingPair} from '../props50';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Partner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={52} {...p} />;

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

export const Ep50: React.FC = () => {
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
    const cd = w('o1', 'cake');
    const pt = w('o1', 'party');
    const fr = w('o1', 'four');
    q(cd, 'pop', 0.5);
    q(pt, 'ding', 0.5);
    q(fr, 'cash', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={480} y={920} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.6}]} />
          <Partner f={f} x={720} y={920} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.5}]} />
          <PriceCake x={1350} y={620} s={0.95 * P(0) * bump(cd, 0.1)} price={f >= fr ? '$400' : '?'} />
          <G2 x={960} y={180} s={P(0)}><Text size={44}>{f >= pt ? '"a cake... for a party"' : 'calling the bakery'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wk = w('o2', 'week');
    const wd = w('o2', 'wedding');
    q(wk, 'tick', 0.5);
    q(wd, 'stamp', 0.7);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={560} y={920} s={1.15} keys={[{at: 0, pose: 'talk', expr: 'neutral', look: 0.6}, {at: wd, pose: 'point_r', expr: 'grin', look: 0.6}]} />
          <PriceCake x={1350} y={620} s={0.95 * P(A('o2'))} price="?" />
          <G2 x={960} y={180} s={P(A('o2')) * bump(wk, 0.08)}><Text size={42} color={GRAY}>same bakery, one week later...</Text></G2>
          <Stamp x={960} y={520} s={P(A('o2')) * bump(wd, 0.18)} text={f >= wd ? 'WEDDING' : '...'} color={C.navy} size={64} r={-3} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ei = w('o3', 'eight');
    q(ei, 'stamp', 0.8);
    const sk = shake(f, ei, 14, 14);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={480} y={920} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'shock', look: 0.6}, {at: ei, pose: 'shock', expr: 'shock', look: 0.6}]} />
          <Partner f={f} x={720} y={920} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.5}]} />
          <PriceCake x={1350 + sk.x} y={620 + sk.y} s={1.05 * P(A('o3')) * bump(ei, 0.2)} price={f >= ei ? '$800' : '$400'} hi={f >= ei} />
          <G2 x={960} y={180} o={lt(ei, 0.4)}><Text size={44} color={C.red}>same cake. same baker. new price.</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cn = w('o4', 'coincidence');
    const rg = w('o4', 'ring');
    q(cn, 'buzz', 0.5);
    q(rg, 'ding', 0.6);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={640} y={220} s={P(A('o4')) * bump(cn, 0.12)} text={f >= cn ? 'NOT A COINCIDENCE' : '?'} color={C.red} size={52} r={-3} />
          <RingBox x={640} y={620} s={0.85 * P(A('o4')) * bump(rg, 0.12)} open={1} />
          <G2 x={640} y={920} o={lt(rg, 0.4)}><Text size={34} color={GRAY}>dave already survived the ring (ep. 44)</Text></G2>
          <Venue x={1420} y={650} s={0.85 * P(A('o4'))} label="NOW: THE WEDDING" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const av = w('o5', 'average');
    const th = w('o5', 'thirty');
    q(av, 'paper', 0.5);
    q(th, 'cash', 0.8);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140} s={P(A('o5')) * bump(av)}><Text size={48}>the average American wedding costs...</Text></G2>
          <Box x={960} y={620} w={760} h={320} s={P(A('o5')) * bump(th, 0.16)} fill={f >= th ? C.yellow : '#fff'}>
            <Text y={-40} size={90} color={C.ink}>{f >= th ? '$34,200' : '$??,???'}</Text>
            <Text y={80} size={34} color={GRAY}>for one single day</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'markup'), w('o6', 'goes'), w('o6', 'less')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['THE WEDDING MARKUP', 'WHERE IT GOES', 'HOW TO SPEND LESS'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <PriceCake s={0.55} y={-10} price="2x" hi />}
                {i === 1 && <SlicePie s={0.75} y={30} t={1} slices={[{v: 0.45, c: C.navy, l: ''}, {v: 0.25, c: C.blue, l: ''}, {v: 0.3, c: C.gold, l: ''}]} rad={150} />}
                {i === 2 && <Venue s={0.5} y={0} label="" />}
                <Text y={210} size={30}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: the wedding tax ============
  {
    const mk = w('c1a', 'markup');
    q(mk, 'pop', 0.5);
    const cr = w('c1b', 'consumer');
    const tw = w('c1b', 'twice');
    q(cr, 'paper', 0.5);
    q(tw, 'ding', 0.5);
    const fi = w('c1c', 'fiftieth');
    q(fi, 'pop2', 0.5);
    const hi2 = w('c1d', 'higher');
    const th3 = w('c1d', 'thousands');
    q(hi2, 'stamp', 0.7);
    q(th3, 'cash', 0.6);
    const mc = w('c1e', 'mechanic');
    const iv = w('c1e', 'invoice');
    q(mc, 'pop', 0.4);
    q(iv, 'ding', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c1a')) * bump(mk)}><Text size={48}>is the "wedding markup" real, or a rumor?</Text></G2>
            <SourceCard x={640} y={600} s={0.95 * P(A('c1a')) * bump(cr, 0.06)} org="CONSUMER REPORTS" sub="SECRET-SHOPPER TEST (2016)" title={['called the same vendors', f >= tw ? 'twice each' : '...']} stat="?" statLabel="wedding vs. anniversary party" />
            <G2 x={1500} y={620} s={P(A('c1a')) * bump(fi, 0.1)} o={lt(fi, 0.4)}>
              <Text size={36} color={C.navy}>call 1: "50th anniversary party"</Text>
              <Text y={70} size={36} color={C.red}>call 2: "wedding"</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={140} s={P(A('c1d')) * bump(hi2)}><Text size={46}>{f >= hi2 ? 'wedding quote: HIGHER' : 'same call, twice...'}</Text></G2>
            <Box x={620} y={600} w={520} h={320} s={P(A('c1d')) * bump(hi2, 0.14)} fill={f >= hi2 ? C.red : '#fff'}>
              <Text y={-50} size={32} color={f >= hi2 ? '#fff' : GRAY}>1 in 4 calls</Text>
              <Text y={40} size={80} color={f >= hi2 ? '#fff' : C.ink}>28%</Text>
            </Box>
            <G2 x={1440} y={600} s={P(A('c1d')) * bump(th3, 0.1)} o={lt(th3, 0.4)}><Text size={36} color={C.red}>sometimes: thousands of $ more</Text></G2>
            <Dave f={f} x={1440} y={920} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'suspicious', look: -0.6}, {at: mc, pose: 'point_l', expr: 'worried', look: -0.6}]} />
            <G2 x={1440} y={330} o={lt(iv, 0.4)}><Bubble text="my car vs. my WEDDING car..." size={30} tail="down" /></G2>
            <SourceTag f={f} at={cr} text="Consumer Reports, secret-shopper wedding pricing test (2016)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2: the $34,200 number ============
  {
    const kn = w('c2b', 'knot');
    q(kn, 'paper', 0.5);
    const cr2 = w('c2c', 'car');
    q(cr2, 'pop', 0.4);
    const f15 = w('c2d', 'fifteen');
    const f40 = w('c2d', 'forty');
    const s70 = w('c2d', 'seventy');
    q(f15, 'ding', 0.4);
    q(f40, 'ding', 0.5);
    q(s70, 'cash', 0.7);
    const wt = w('c2e', 'water');
    q(wt, 'boing', 0.4);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={960} y={560} s={1.05 * P(A('c2a')) * bump(kn, 0.06)} org="THE KNOT" sub="2026 REAL WEDDINGS STUDY" title={['average US wedding cost:']} stat={f >= kn ? '$34,200' : '$??,???'} statLabel={f >= cr2 ? 'one single day' : 'not a used car'} color={C.navy} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2d'))}><Text size={44}>it scales with your starting budget</Text></G2>
            <Bar x={480} y={800} s={1.1 * P(A('c2d')) * bump(f15, 0.1)} h={f >= f15 ? 140 : 40} color={C.greenLight} label="BUDGET <$15K" value={f >= f15 ? '~$8,900' : '?'} />
            <Bar x={960} y={800} s={1.1 * P(A('c2d')) * bump(f40, 0.1)} h={f >= f40 ? 260 : 40} color={C.yellow} label="BUDGET $15-40K" value={f >= f40 ? '~$26,400' : '?'} />
            <Bar x={1440} y={800} s={1.1 * P(A('c2d')) * bump(s70, 0.12)} h={f >= s70 ? 420 : 40} color={C.red} label="BUDGET >$40K" value={f >= s70 ? '~$70,300' : '?'} />
            <G2 x={960} y={200} o={lt(wt, 0.4)}><Text size={34} color={C.red}>{f >= wt ? 'water finds every crack in the sidewalk' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: where the money goes ============
  {
    const vn = w('c3b', 'venue');
    const fd = w('c3b', 'food');
    q(vn, 'pop', 0.5);
    q(fd, 'pop2', 0.5);
    const eg = w('c3c', 'eighty');
    const gt = w('c3c', 'guests');
    q(eg, 'cash', 0.6);
    q(gt, 'ding', 0.5);
    const ph = w('c3d', 'photography');
    const ds = w('c3d', 'dress');
    q(ph, 'click', 0.5);
    q(ds, 'ding', 0.5);
    const pg = w('c3e', 'gone');
    q(pg, 'buzz', 0.5);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c3a')) * bump(vn)}><Text size={48}>where does $34,200 actually go?</Text></G2>
            <Venue x={620} y={640} s={0.85 * P(A('c3a')) * bump(vn, 0.12)} label="VENUE" />
            <G2 x={1300} y={640} s={0.9 * P(A('c3a')) * bump(fd, 0.12)}><PriceCake price="" /><Text y={130} size={36}>+ FOOD</Text></G2>
            <G2 x={960} y={980} o={lt(fd, 0.4)}><Text size={38} color={C.red}>together: ~half the entire budget</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c3c')) * bump(eg)}><Text size={44}>catering: about $80 a plate</Text></G2>
            <GuestRow x={960} y={520} s={1.1 * P(A('c3c')) * bump(gt, 0.1)} n={20} lit={f >= gt ? 20 : 0} perRow={10} />
            <Box x={960} y={880} w={700} h={200} s={P(A('c3c')) * bump(eg, 0.12)} fill={f >= eg ? C.yellow : '#fff'}>
              <Text y={-30} size={30} color={GRAY}>100 guests, dinner alone:</Text>
              <Text y={35} size={54} color={C.red}>{f >= eg ? '$8,000' : '$?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={120} s={P(A('c3e')) * bump(ph)}><Text size={44}>photo/video, dress, flowers, music...</Text></G2>
            <SlicePie x={640} y={640} s={1.1 * P(A('c3e')) * bump(pg, 0.06)} t={1} slices={[{v: 0.45, c: C.navy, l: 'Venue+catering'}, {v: 0.11, c: C.blue, l: 'Photo/video'}, {v: 0.07, c: C.red, l: 'Attire'}, {v: 0.37, c: C.gold, l: 'Everything else'}]} rad={260} />
            <G2 x={1580} y={900} o={lt(pg, 0.4)}><Text size={36} color={C.red}>the whole pie... gone</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4: guest list lever ============
  {
    const gl = w('c4a', 'list');
    q(gl, 'pop', 0.5);
    const mp = w('c4b', 'multiplies');
    q(mp, 'ding', 0.5);
    const tn = w('c4c', 'ten');
    const ei2 = w('c4c', 'eight');
    q(tn, 'pop2', 0.5);
    q(ei2, 'cash', 0.7);
    const sp = w('c4d', 'split');
    q(sp, 'boing', 0.5);
    const tw2 = w('c4e', 'twenty');
    q(tw2, 'stamp', 0.6);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a')) * bump(gl)}><Text size={48}>the number that controls everything else</Text></G2>
            <Dave f={f} x={330} y={900} s={1.1} keys={[{at: 0, pose: 'present', expr: 'think', look: 0.6}]} />
            <Box x={1250} y={640} w={900} h={340} s={P(A('c4a')) * bump(mp, 0.08)} fill={f >= mp ? '#FFE3EA' : '#fff'}>
              <Text y={-100} size={32} color={GRAY}>every name on the list multiplies:</Text>
              <Text y={-30} size={34}>venue · food · chairs</Text>
              <Text y={30} size={34} color={f >= mp ? C.red : C.ink}>{f >= mp ? '...and the cake' : ''}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c4c')) * bump(tn)}><Text size={44}>+10 names on the list =</Text></G2>
            <GuestRow x={960} y={560} s={1.3 * P(A('c4c')) * bump(ei2, 0.1)} n={10} lit={f >= tn ? 10 : 0} perRow={10} />
            <Box x={960} y={900} w={560} h={190} s={P(A('c4c')) * bump(ei2, 0.14)} fill={f >= ei2 ? C.red : '#fff'}>
              <Text y={20} size={60} color={f >= ei2 ? '#fff' : C.ink}>{f >= ei2 ? '+$800' : '+$?'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c4e')) * bump(sp)}><Text size={46}>like a group order, split thirty ways</Text></G2>
            <Partner f={f} x={620} y={900} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.6}]} />
            <Dave f={f} x={1300} y={900} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: tw2, pose: 'thumbs', expr: 'happy', look: -0.6}]} />
            <G2 x={960} y={480} s={bump(tw2, 0.1)} o={lt(tw2, 0.4)}><Text size={40} color={C.green}>cut 20 guests → everything shrinks</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5: $66B industry ============
  {
    const bz = w('c5a', 'businesses');
    q(bz, 'pop', 0.5);
    const tm = w('c5b', 'million');
    q(tm, 'paper', 0.5);
    const sx = w('c5c', 'sixty');
    const bl = w('c5c', 'billion');
    q(sx, 'cash', 0.6);
    q(bl, 'cash', 0.8);
    const bk = w('c5d', 'bakeries');
    q(bk, 'ding', 0.5);
    const up = w('c5e', 'upgrade');
    q(up, 'boing', 0.5);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c5a')) * bump(bz)}><Text size={48}>why does everyone show up for "I do"?</Text></G2>
            <People x={960} y={620} s={1.1 * P(A('c5a')) * bump(tm, 0.06)} n={80} hot={0} lit={0} />
            <G2 x={960} y={980} o={lt(tm, 0.4)}><Text size={38} color={C.navy}>~2 million US couples marry, every year</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SourceCard x={640} y={560} s={0.98 * P(A('c5c')) * bump(bl, 0.08)} org="INDUSTRY ESTIMATE" sub="US WEDDING MARKET · 2025" title={['~2 million weddings']} stat={f >= bl ? '$66B' : f >= sx ? '$6?B' : '$?B'} statLabel="in a single year" color={C.navy} />
            <Venue x={1500} y={560} s={0.7 * P(A('c5d')) * bump(bk, 0.1)} label="" />
            <G2 x={1500} y={800} o={lt(bk, 0.4)}><Text size={32} color={GRAY}>venues · caterers · photographers · bakeries</Text></G2>
            <G2 x={1500} y={940} o={lt(up, 0.4)}><Text size={30} color={C.red}>{f >= up ? 'everyone wants to sell you "one more upgrade"' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6: debt hangover ============
  {
    const sv = w('c6b', 'survey');
    const tt = w('c6b', 'two');
    q(sv, 'paper', 0.5);
    q(tt, 'stamp', 0.6);
    const pr = w('c6c', 'pressured');
    q(pr, 'buzz', 0.5);
    const rg = w('c6d', 'regret');
    const dv = w('c6d', 'divorce');
    q(rg, 'sting', 0.5);
    q(dv, 'buzz', 0.7);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c6a')) * bump(sv)}><Text size={46}>how are couples actually paying for this?</Text></G2>
            <Box x={960} y={600} w={780} h={320} s={P(A('c6a')) * bump(tt, 0.14)} fill={f >= tt ? C.red : '#fff'}>
              <Text y={-50} size={34} color={f >= tt ? '#fff' : GRAY}>took on DEBT for their wedding</Text>
              <Text y={50} size={80} color={f >= tt ? '#fff' : C.ink}>{f >= tt ? '2 in 3' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={sv} text="LendingTree newlywed survey, 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Partner f={f} x={480} y={920} s={1.15} keys={[{at: 0, pose: 'facepalm', expr: 'tired', look: 0.6}]} />
            <Dave f={f} x={720} y={920} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.5}]} sweat={f >= pr} />
            <G2 x={1400} y={520} o={lt(pr, 0.4)}><Text size={34} color={C.red}>1 in 3: pressured to overspend</Text></G2>
            <G2 x={1400} y={620} o={lt(rg, 0.4)}><Text size={34} color={C.red}>{f >= rg ? 'more than half: regret the total' : ''}</Text></G2>
            <G2 x={1400} y={720} o={lt(dv, 0.4)}><Text size={30} color={GRAY}>{f >= dv ? 'some: it even caused money fights' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: myth-bust ============
  {
    const nb = w('c7a', 'bigger');
    const np = w('c7a', 'nope');
    q(nb, 'pop', 0.5);
    q(np, 'buzz', 0.7);
    const of = w('c7b', 'official');
    q(of, 'paper', 0.5);
    const mt = w('c7c', 'mountain');
    q(mt, 'thud', 0.6);
    const hf = w('c7d', 'hopefully');
    q(hf, 'ding', 0.5);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P(A('c7a')) * bump(nb)}><Text size={44}>myth: bigger wedding = better marriage</Text></G2>
          <Stamp x={960} y={480} s={1.1 * P(A('c7a')) * bump(np, 0.18)} text={f >= np ? 'NOPE' : '?'} color={C.red} size={90} />
          <Box x={960} y={840} w={1400} h={260} s={P(A('c7b')) * bump(mt, 0.06)} o={lt(of, 0.4)}>
            <Text y={-60} size={30} color={GRAY}>{f >= of ? 'no study proves a pricier wedding = happier marriage' : ''}</Text>
            <Text y={0} size={34} color={f >= mt ? C.navy : GRAY}>{f >= mt ? 'what matters: no debt mountain, no money fight' : ''}</Text>
            <Text y={70} size={34} color={C.green}>{f >= hf ? 'the wedding is one day. the marriage is not.' : ''}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const sk = w('c8b', 'shrink');
    const qt = w('c8c', 'quotes');
    const fd2 = w('c8d', 'friday');
    const rk = w('c8e', 'rank');
    const wn = w('c8f', 'wonderful');
    q(sk, 'boing', 0.4);
    q(qt, 'paper', 0.5);
    q(fd2, 'ding', 0.5);
    q(rk, 'pop', 0.5);
    q(wn, 'chime', 0.6);
    const items = ['Shrink the guest list first — the biggest lever', 'Get quotes before you say the word "wedding"', 'Try a Friday, Sunday, or the off-season', 'Set the budget first, then rank your top priorities', "Choose the wedding you want, not the invoice you got"];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={100}><Text size={48}>Get the wedding you actually want</Text></G2>
          <G2 x={650} y={160}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={270 + i * 150} s={0.85 * P(A('c8a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <GuestRow x={1600} y={560} s={1.1 * bump(sk, 0.1)} n={12} lit={f >= sk ? 0 : 12} perRow={4} />}
          {cur === 1 && <Envelope x={1600} y={560} s={1.3 * bump(qt, 0.1)} label={f >= qt ? '"a party for 80..."' : 'get quote first'} />}
          {cur === 2 && <Calendar x={1600} y={560} s={1.2 * bump(fd2, 0.12)} year="FRI/SUN" flip={f >= fd2 ? 1 : 0} top="-15-40%" />}
          {cur === 3 && <Bar x={1600} y={620} s={1.1 * bump(rk, 0.1)} h={f >= rk ? 300 : 60} color={C.gold} label="TOP PRIORITY" value={f >= rk ? '#1' : '?'} />}
          {cur >= 4 && <RingPair x={1600} y={560} s={1.3 * bump(wn, 0.12)} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['The wedding markup is real (Consumer Reports)', 'Average: ~$34,200 — the guest list drives the rest', 'Shorter list + quotes first + off-season + priorities'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={200} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1520} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  // ============ SERIES FINALE CLOSE (no next-episode teaser — ep50 is the last episode) ============
  {
    const ft = w('r5', 'fifty');
    const pr2 = w('r5', 'profits');
    const sb = w('r6', 'subscribe');
    const th4 = w('r6', 'thanks');
    q(ft, 'chime', 0.6);
    q(pr2, 'ding', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(th4, 'ding', 0.6);
    const mascots = [<Duck key="d" f={f} />, <Raccoon key="r" f={f} mood="greedy" holdCoin />, <RingPair key="g" />, <PriceCake key="c" price="" />];
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={P(A('r5')) * bump(ft, 0.1)}><Text size={54}>{f >= ft ? '50 episodes of Dave Explains Money' : "that's a wrap..."}</Text></G2>
            {mascots.map((m, i) => (
              <G2 key={i} x={480 + i * 340} y={620} s={1.1 * P(A('r5')) * bump(ft + i * 3, 0.12)}>{m}</G2>
            ))}
            <G2 x={960} y={960} o={lt(pr2, 0.4)}><Text size={36} color={C.navy}>your problem → who profits → what to do</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={420} s={1.4 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1420} y={420} s={1.1 * pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={880} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Partner f={f} x={680} y={880} s={1.2} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={1350} y={840} o={lt(th4, 0.4)}><Text size={40} color={C.green}>thanks for watching!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2b', 'knot') + 30;
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
