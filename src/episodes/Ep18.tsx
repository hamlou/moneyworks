import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, HAND} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bill, Bubble, Calendar, Coin, Duck, MoneyStack, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Phone, Row, SubButton, Bell} from '../props2';
import {Coffee, PriceTag, Raccoon} from '../props3';
import {House, LineChart} from '../props4';
import {Contract} from '../props5';
import {Share} from '../props7';
import {Scale} from '../props8';
import {BlueCar, Bumper, Deductible, Flames, FloatPool, Hut, Pot, Ship, Slip} from '../props18';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Buffett: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={79} {...p} />;
const Lloyd: React.FC<SP> = (p) => <Stick acc={['fedora']} seed={88} {...p} />;
const Agent: React.FC<SP> = (p) => <Stick acc={['tie', 'glasses']} seed={91} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string; children?: React.ReactNode}> = ({w, h, fill = '#fff', children}) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </g>
);

const HUTS = Array.from({length: 100}).map((_, i) => ({x: 560 + (i % 20) * 48, y: 300 + Math.floor(i / 20) * 110}));
const FIRE = 47;

export const Ep18: React.FC = () => {
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
    const ins = w('o1', 'insurance');
    const ff = w('o1', 'fifteen');
    const nv = w('o1', 'never');
    const lk = w('o2', 'look');
    const bk = w('o2', 'berkshire');
    const on = w('o2', 'one', 1);
    const cu = w('o3', 'customers');
    const iv = w('o3', 'invest');
    const cr = w('o4', 'crazy');
    const nt = w('o4', 'nothing');
    const pf = w('o4', 'profit');
    const fl = w('o5', 'float');
    const mc = w('o5', 'machines');
    q(2, 'pop', 0.6);
    q(ins, 'paper', 0.5);
    q(ff, 'cash', 0.5);
    q(nv, 'ding', 0.5);
    q(lk, 'pop', 0.6);
    q(bk, 'pop', 0.5);
    q(on, 'cash', 0.7);
    q(cu, 'coin', 0.5);
    q(iv, 'ding', 0.5);
    q(cr, 'sting', 0.5);
    q(nt, 'stamp', 0.7);
    q(pf, 'cash', 0.6);
    q(fl, 'boing', 0.6);
    q(mc, 'ding', 0.5);
    scene(0, () =>
      f < lk - 2 ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <BlueCar x={1250} y={800} s={1.6 * pop(f, 2)} f={f} />
            <Dave f={f} x={560} y={822} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: nv, pose: 'think', expr: 'worried', look: 0.8}]} />
            <G2 x={960} y={200} s={pop(f, ins)}>
              <Box w={640} h={170}>
                <Text y={-35} size={40} color="#5B6470">DAVE'S CAR INSURANCE</Text>
                <Text y={30} size={60} color={C.red}>{f >= ff ? '~$1,500 / year' : '...'}</Text>
              </Box>
            </G2>
            {f >= nv && <G2 x={560} y={420} s={pop(f, nv)}><Bubble text="hope I never use it..." size={40} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, lk - 2)}><Text size={52}>{f >= bk ? 'Berkshire Hathaway · insurance money it holds' : 'one company...'}</Text></G2>
            <FloatPool x={960} y={560} s={1.5 * pop(f, bk)} f={f} fill={ease(f, on, on + 30, 0.1, 1)} label={f >= fl ? 'THE FLOAT' : '$$$'} />
            {f >= on && <G2 x={960} y={290} s={pop(f, on)}><Text size={110} color={C.green} stroke={C.ink} sw={8}>$176 BILLION</Text></G2>}
            {f >= cu && f < cr && <G2 x={960} y={900} s={pop(f, cu)}><Text size={48}>{f >= iv ? 'not theirs to keep... but they INVEST it' : 'paid in by customers like Dave'}</Text></G2>}
            {f >= nt && f < fl && <Stamp x={960} y={900} s={pop(f, nt, 9, 260)} text={f >= pf ? 'COST: $0 · + PROFIT' : 'COST: $0'} size={56} color={C.red} r={-3} />}
            {f >= fl && <G2 x={960} y={900} s={pop(f, mc)}><Text size={52} color={C.blue}>one of the best money machines ever</Text></G2>}
            <SourceTag f={f} at={on} text="Berkshire Hathaway 2025 shareholder letter" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'insurance'), w('o6', 'twice'), w('o6', 'less')];
    pv.forEach((x) => q(x, 'stamp', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">TODAY</Text>
          {['HOW IT WORKS', 'PAID TWICE', 'PAY LESS'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={520} s={pop(f, pv[i] - 2)}>
              <Box w={500} h={440}>
                <Text y={-160} size={52} color={[C.blue, C.green, C.red][i]}>{l}</Text>
                {i === 0 && <Pot y={60} s={0.7} level={0.6} />}
                {i === 1 && <g><MoneyStack x={-90} y={80} n={4} s={0.6} /><MoneyStack x={90} y={80} n={6} s={0.6} /></g>}
                {i === 2 && <BlueCar y={90} s={1.2} f={f} />}
              </Box>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dave's quote ============
  {
    const us = w('c1b', 'used');
    const bl = w('c1b', 'blue');
    const ns = w('c1b', 'noise');
    const lf = w('c1b', 'left');
    const lw = w('c1c', 'law');
    const qt = w('c1c', 'quote');
    const mo = w('c1c', 'month');
    const cf = w('c1d', 'confused');
    const ff = w('c1d', 'fifteen');
    const hp = w('c1d', 'happen');
    const wh = w('c1e', 'where');
    const vl = w('c1f', 'village');
    q(us, 'pop', 0.5);
    q(bl, 'pop2', 0.5);
    q(ns, 'sputter', 0.6);
    q(lf, 'boing', 0.5);
    q(lw, 'stamp', 0.5);
    q(qt, 'paper', 0.5);
    q(mo, 'cash', 0.6);
    q(cf, 'buzz', 0.4);
    q(ff, 'cash', 0.5);
    q(hp, 'ding', 0.4);
    q(wh, 'whoosh', 0.5);
    q(vl, 'pop', 0.5);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <BlueCar x={1150} y={800} s={1.8 * pop(f, us)} f={f} shake={f >= ns && f < ns + 50 ? 1 : 0} />
            <Dave f={f} x={500} y={822} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: ns, pose: 'shock', expr: 'worried', look: 0.8}]} />
            <G2 x={960} y={180} s={pop(f, A('c1a'))}><Text size={56}>Dave's problem</Text></G2>
            {f >= bl && <G2 x={1150} y={430} s={pop(f, bl)}><Text size={44}>blue · old · used</Text></G2>}
            {f >= ns && <G2 x={1500} y={560} s={pop(f, ns)}><Text size={46} color={C.red} font={HAND}>clunk-clunk!</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={420} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: cf, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <Stamp x={960} y={160} s={pop(f, lw, 9, 260)} text="LAW: INSURANCE REQUIRED" size={48} color={C.blue} r={-3} />
            <Phone x={1000} y={560} s={pop(f, qt)} title="QUOTE" value={f >= mo ? '$125/mo' : '...'} />
            {f >= ff && <G2 x={1500} y={500} s={pop(f, ff)}><Text size={70} color={C.red}>= $1,500 / yr</Text></G2>}
            {f >= hp && <G2 x={1500} y={640} s={pop(f, hp)}><Text size={40}>for something that might never happen?</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={600} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}]} />
            <G2 x={600} y={420} s={pop(f, wh)}><Bubble text="where does my money go?" size={44} tail="down" /></G2>
            {[0, 1, 2].map((i) => <Bill key={i} x={lin(f, wh + i * 8, wh + 60 + i * 8, 800, 1700)} y={lin(f, wh + i * 8, wh + 60 + i * 8, 600, 250 + i * 60)} s={0.5} r={(f * 4 + i * 40) % 360} />)}
            {f >= vl && <G2 x={1400} y={700} s={pop(f, vl)}>{[0, 1, 2].map((i) => <Hut key={i} x={-120 + i * 120} s={0.9} />)}<Text y={70} size={40}>a tiny village</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 village pot ============
  {
    const hn = w('c2a', 'hundred');
    const oh = w('c2b', 'one');
    const nb = w('c2b', 'nobody');
    const yr = w('c2b', 'yours');
    const hk = w('c2c', 'hundred');
    const rn = w('c2c', 'ruined');
    const dl = w('c2d', 'deal');
    const th = w('c2d', 'thousand');
    const pt = w('c2d', 'pot');
    const tm = w('c2e', 'times');
    const en = w('c2e', 'enough');
    const wo = w('c2f', 'whoevers');
    const sl = w('c2f', 'sleeps');
    const ins = w('c2g', 'insurance');
    const sm = w('c2g', 'small');
    const bg = w('c2g', 'big');
    const sc = w('c2h', 'secret');
    const pr = w('c2h', 'predict');
    const lt = w('c2h', 'lots');
    const lw = w('c2h', 'law');
    const dv = w('c2i', 'dave');
    const cp = w('c2i', 'pot');
    q(hn, 'pop', 0.6);
    q(oh, 'sting', 0.5);
    q(nb, 'tick', 0.5);
    q(yr, 'thud', 0.5);
    q(hk, 'cash', 0.5);
    q(rn, 'trombone', 0.5);
    q(dl, 'pop', 0.5);
    for (let i = 0; i < 6; i++) q(th + i * 5, 'coin', 0.35);
    q(tm, 'pop', 0.5);
    q(en, 'ding', 0.6);
    q(wo, 'cash', 0.6);
    q(sl, 'heart', 0.4);
    q(ins, 'stamp', 0.6);
    q(sm, 'pop', 0.5);
    q(bg, 'thud', 0.5);
    q(sc, 'dream', 0.5);
    q(pr, 'buzz', 0.4);
    q(lt, 'pop', 0.5);
    q(lw, 'ding', 0.6);
    q(dv, 'pop', 0.5);
    q(cp, 'coin', 0.6);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1030} y={150} s={pop(f, A('c2a'))}><Text size={56}>{f >= hn ? '100 houses' : 'a village'}</Text></G2>
            {HUTS.map((h, i) => (
              <Hut key={i} x={h.x} y={h.y} s={0.38 * pop(f, hn + (i % 20) + Math.floor(i / 20) * 2)} burnt={f >= yr + 20 && i === FIRE} />
            ))}
            {f >= oh && f < yr + 20 && <Flames x={HUTS[FIRE].x} y={HUTS[FIRE].y} s={0.45 * pop(f, oh)} f={f} />}
            {f >= oh && <G2 x={1030} y={880} s={pop(f, oh)}><Text size={44} color={C.red}>~1 fire per year · {f >= nb ? 'nobody knows which one' : ''}</Text></G2>}
            <Dave f={f} x={250} y={880} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}, {at: yr, pose: 'shock', expr: 'shock', look: 0.8}]} />
            {f >= hk && <G2 x={250} y={400} s={pop(f, hk)}><PriceTag text="new house: $100,000" color={C.yellow} /></G2>}
            {f >= rn && <Stamp x={250} y={560} s={pop(f, rn, 9, 260)} text="RUINED" size={50} color={C.red} r={-8} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {Array.from({length: 7}).map((_, i) => <Hut key={i} x={220 + i * 120} y={822} s={0.8} burnt={f >= wo && i === 3} />)}
            <Pot x={1350} y={700} s={1.2 * pop(f, dl)} level={ease(f, th, en, 0.05, 0.9)} label={f >= en ? '$100,000' : undefined} />
            {f >= th && f < en && [0, 1, 2, 3, 4, 5].map((i) => <Coin key={i} x={lin(f, th + i * 5, th + i * 5 + 18, 220 + i * 120, 1350)} y={lin(f, th + i * 5, th + i * 5 + 18, 650, 520) - Math.sin(Math.min(1, Math.max(0, (f - th - i * 5) / 18)) * Math.PI) * 120} s={0.5} />)}
            <G2 x={960} y={140} s={pop(f, dl)}><Text size={52}>{f >= tm ? '100 houses × $1,000 = $100,000' : 'the deal: $1,000 each, every year'}</Text></G2>
            {f >= en && f < wo && <G2 x={1350} y={360} s={pop(f, en)}><Text size={44} color={C.green}>enough to rebuild ONE house</Text></G2>}
            {f >= wo && <G2 x={580} y={420} s={pop(f, wo)}><Text size={46} color={C.green}>burnt house gets the pot</Text></G2>}
            {f >= sl && <G2 x={1350} y={360} s={pop(f, sl)}><Text size={44}>everyone else: -$1,000, sleeps well</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2i') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={140} s={pop(f, ins, 9, 260)} text="THAT'S INSURANCE" size={60} color={C.green} />
            {f < sc && (
              <g>
                <Scale x={960} y={900} s={pop(f, ins)} tilt={ease(f, bg, bg + 20, 0, 8)} left={f >= sm ? 'small, certain cost' : ''} right={f >= bg ? 'big, uncertain disaster' : ''} />
              </g>
            )}
            {f >= sc && (
              <g>
                <G2 x={520} y={560} s={pop(f, sc)}>
                  <Box w={560} h={420}>
                    <Text y={-160} size={40}>ONE house</Text>
                    <Hut y={60} s={1.3} />
                    <Text x={0} y={-60} size={110} color={C.red}>?</Text>
                    {f >= pr && <Text y={160} size={36} color={C.red}>can't predict</Text>}
                  </Box>
                </G2>
                <G2 x={1400} y={560} s={pop(f, lt)}>
                  <Box w={560} h={420}>
                    <Text y={-160} size={40}>LOTS of houses</Text>
                    {Array.from({length: 30}).map((_, i) => <Hut key={i} x={-220 + (i % 10) * 49} y={-60 + Math.floor(i / 10) * 70} s={0.3} />)}
                    <Text y={160} size={36} color={C.green}>≈ 1 fire per 100 · predictable</Text>
                  </Box>
                </G2>
                {f >= lw && <G2 x={960} y={930} s={pop(f, lw)}><Text size={50} color={C.blue}>the law of large numbers</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={500} y={822} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: cp, pose: 'thumbs', expr: 'happy', look: 0.8}]} />
            <BlueCar x={260} y={800} s={1.1} f={f} />
            <Pot x={1300} y={720} s={1.1 * pop(f, A('c2i'))} level={0.6} label="EVERYONE'S POT" />
            {f >= cp && <Coin x={lin(f, cp, cp + 20, 600, 1300)} y={lin(f, cp, cp + 20, 500, 540)} s={0.6} />}
            <G2 x={960} y={180} s={pop(f, dv)}><Text size={48}>{f >= cp ? 'Dave chips in for whoever crashes' : "not paying for his own crash"}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 coffee house ============
  {
    const sx = w('c3b', 'sixteen');
    const ed = w('c3b', 'edward');
    const cf = w('c3b', 'coffee');
    const cap = w('c3c', 'captains');
    const nw = w('c3c', 'news');
    const pi = w('c3c', 'pirates');
    const pa = w('c3d', 'paper');
    const nm = w('c3d', 'names');
    const sl = w('c3d', 'slice');
    const un = w('c3e', 'under');
    const uw = w('c3e', 'underwriters');
    const ll = w('c3f', 'lloyds');
    const gs = w('c3f', 'gossip');
    q(sx, 'flip', 0.5);
    q(ed, 'pop', 0.5);
    q(cf, 'pop2', 0.5);
    q(cap, 'pop', 0.5);
    q(nw, 'paper', 0.5);
    q(pi, 'boing', 0.5);
    q(pa, 'paper', 0.6);
    for (let i = 0; i < 4; i++) q(nm + i * 10, 'scribble', 0.4);
    q(un, 'marker', 0.5);
    q(uw, 'stamp', 0.7);
    q(ll, 'chime', 0.5);
    q(gs, 'ding', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.45)'}}>
          {f < A('c3d') ? <Interior /> : <Board />}
          <Svg>
            {f < A('c3d') ? (
              <g>
                <Calendar x={260} y={240} s={0.75 * pop(f, A('c3a') + 4)} top="LONDON" year={1688} flip={0} />
                {f >= ed && <Lloyd f={f} x={620} y={880} s={1.15} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />}
                {f >= ed && <G2 x={620} y={430} s={pop(f, ed)}><Text size={40}>Edward Lloyd</Text></G2>}
                {f >= cf && <Coffee x={900} y={700} s={1.2 * pop(f, cf)} f={f} />}
                {f >= cf && <G2 x={960} y={140} s={pop(f, cf)}><Text size={56}>Lloyd's Coffee House · Tower Street</Text></G2>}
                {f >= cap && [0, 1].map((i) => <Stick key={i} f={f} x={1250 + i * 230} y={880} s={1} acc={i ? ['cap'] : ['tophat']} seed={120 + i} keys={[{at: 0, pose: 'talk', expr: 'happy', look: -0.8}]} />)}
                {f >= nw && <Ship x={1400} y={500} s={0.8 * pop(f, nw)} f={f} />}
                {f >= nw && <G2 x={1400} y={170 + 90} s={pop(f, pi)}><Text size={40}>ships · storms · pirates!</Text></G2>}
              </g>
            ) : (
              <g>
                <Slip x={760} y={540} s={1.25 * pop(f, pa)} names={nm ? Math.min(4, Math.max(0, Math.floor((f - nm) / 10) + 1)) : 0} />
                {f >= sl && <G2 x={1550} y={380} s={pop(f, sl)}><Text size={44}>each takes a slice of the risk</Text></G2>}
                {f >= un && <path d={`M 480 560 L ${lin(f, un, un + 15, 480, 1040)} 560`} stroke={C.red} strokeWidth={8} strokeLinecap="round" />}
                {f >= uw && <Stamp x={1520} y={600} s={pop(f, uw, 9, 260)} text="UNDER-WRITERS" size={56} color={C.red} r={-6} />}
                {f >= ll && <G2 x={1520} y={820} s={pop(f, ll)}><Text size={48}>→ Lloyd's of London</Text></G2>}
                {f >= gs && <Coffee x={1780} y={900} s={0.8 * pop(f, gs)} f={f} />}
              </g>
            )}
            <SourceTag f={f} at={sx} text="Lloyd's of London: history, coffee and commerce" until={A('c3d')} />
          </Svg>
        </AbsoluteFill>
        <OldFilm f={f} o={0.5} />
      </AbsoluteFill>
    ));
  }

  // ============ CH4 premiums vs claims ============
  {
    const pr = w('c4b', 'premiums');
    const cl = w('c4b', 'claims');
    const co = w('c4c', 'costs');
    const an = w('c4c', 'animals');
    const cb = w('c4d', 'combined');
    const dv = w('c4d', 'divided');
    const bl = w('c4e', 'below');
    const ab = w('c4e', 'above');
    const y24 = w('c4f', 'four');
    const y25 = w('c4f', 'five');
    const sv = w('c4f', 'seven');
    const sp = w('c4g', 'seven');
    const fs = w('c4g', 'first');
    q(A('c4a') + 4, 'pop', 0.5);
    q(pr, 'coin', 0.6);
    q(cl, 'cash', 0.6);
    q(co, 'pop', 0.5);
    q(an, 'quack', 0.4);
    q(cb, 'ding', 0.6);
    q(dv, 'marker', 0.5);
    q(bl, 'ding', 0.5);
    q(ab, 'buzz', 0.4);
    q(y24, 'pop', 0.5);
    q(y25, 'pop', 0.5);
    q(sv, 'cash', 0.6);
    q(sp, 'pop', 0.5);
    q(fs, 'stamp', 0.6);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={560} s={pop(f, A('c4a') + 4)}>
              <Box w={420} h={320} fill="#E8F1FF">
                <Text y={-100} size={44}>INSURANCE CO.</Text>
                <Pot y={70} s={0.6} level={0.6} />
              </Box>
            </G2>
            {f >= pr && (
              <G2 x={400} y={560} s={pop(f, pr)}>
                <Text y={-150} size={56} color={C.green}>PREMIUMS in</Text>
                {[0, 1, 2].map((i) => <Coin key={i} x={((f * 6 + i * 70) % 210) - 60} y={0} s={0.55} />)}
                <path d="M -120 60 L 250 60" stroke={C.green} strokeWidth={12} strokeLinecap="round" />
                <path d="M 230 40 L 260 60 L 230 80" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
              </G2>
            )}
            {f >= cl && (
              <G2 x={1520} y={560} s={pop(f, cl)}>
                <Text y={-150} size={56} color={C.red}>CLAIMS out</Text>
                {[0, 1, 2].map((i) => <Bill key={i} x={((f * 6 + i * 70) % 210) - 120} y={0} s={0.35} />)}
                <path d="M -250 60 L 120 60" stroke={C.red} strokeWidth={12} strokeLinecap="round" />
                <path d="M 100 40 L 130 60 L 100 80" fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
              </G2>
            )}
            {f >= co && (
              <G2 x={960} y={900} s={pop(f, co)}>
                <Text size={44}>+ COSTS: offices · staff · {f >= an ? 'ads with funny animals' : 'ads'}</Text>
              </G2>
            )}
            {f >= an && <Duck f={f} x={1600} y={880} s={0.6 * pop(f, an)} />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={150} s={pop(f, A('c4d'))}><Text size={70}>{f >= cb ? 'THE COMBINED RATIO' : 'one magic number...'}</Text></G2>
            {f >= dv && (
              <G2 x={960} y={420} s={pop(f, dv)}>
                <Text y={-50} size={60}>claims + costs</Text>
                <line x1={-260} y1={0} x2={260} y2={0} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
                <Text y={55} size={60}>premiums</Text>
              </G2>
            )}
            {f >= bl && <G2 x={560} y={780} s={pop(f, bl)}><Box w={620} h={200} fill="#E8F7EC"><Text y={-30} size={56} color={C.green}>below 100%</Text><Text y={40} size={40}>profit on insurance</Text></Box></G2>}
            {f >= ab && <G2 x={1360} y={780} s={pop(f, ab)}><Box w={620} h={200} fill="#FDE8EE"><Text y={-30} size={56} color={C.red}>above 100%</Text><Text y={40} size={40}>loss on insurance</Text></Box></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c4f'))}><Text size={50}>U.S. home + car insurers · combined ratio</Text></G2>
            <line x1={300} y1={860} x2={1300} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <line x1={300} y1={860 - 100 * 6} x2={1300} y2={860 - 100 * 6} stroke={C.red} strokeWidth={5} strokeDasharray="18 12" />
            <Text x={1360} y={860 - 100 * 6} size={34} color={C.red} anchor="start">100% line</Text>
            <Bar x={560} y={860} h={ease(f, y24 - 4, y24 + 14, 2, 96.6 * 6)} color={C.yellow} label="2024" value="96.6%" w={260} />
            <Bar x={1040} y={860} h={ease(f, y25 - 4, y25 + 14, 2, 92.9 * 6)} color={C.green} label="2025" value="92.9%" w={260} />
            {f >= sv && <G2 x={1560} y={560} s={pop(f, sv)}><Box w={440} h={260}><Text y={-60} size={40}>per $100 premiums</Text><Text y={20} size={90} color={C.green}>≈ $7</Text><Text y={90} size={34}>left as profit</Text></Box></G2>}
            {f >= fs && <Stamp x={1560} y={900} s={pop(f, fs, 9, 260)} text="WAY #1" size={50} color={C.blue} r={-5} />}
            <SourceTag f={f} at={y24} text="Verisk & APCIA, U.S. P&C net combined ratio (2024–2025)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 float ============
  {
    const sw = w('c5a', 'second');
    const td = w('c5b', 'today');
    const ml = w('c5b', 'months');
    const yl = w('c5b', 'years');
    const nv = w('c5b', 'never');
    const iv = w('c5c', 'invest');
    const bd = w('c5c', 'bonds');
    const st = w('c5c', 'stocks');
    const wc = w('c5c', 'companies');
    const fl = w('c5d', 'float');
    const fr = w('c5e', 'friend');
    const hd = w('c5e', 'hold');
    const ip = w('c5e', 'profits');
    const rf = w('c5f', 'refusing');
    const np = w('c5f', 'nope');
    const bf = w('c5f', 'float');
    const bu = w('c5g', 'buffett');
    const ni = w('c5g', 'nineteen');
    const na = w('c5g', 'national');
    const ivd = w('c5h', 'invested');
    const ge = w('c5h', 'geico');
    const ot = w('c5i', 'one');
    const ee = w('c5i', 'eighty');
    const db = w('c5i', 'doubled');
    const cr = w('c5j', 'eighty');
    const fe = w('c5j', 'free');
    const pd = w('c5k', 'paid');
    const dk = w('c5k', 'duck');
    q(sw, 'stamp', 0.6);
    q(td, 'coin', 0.5);
    q(ml, 'tick', 0.5);
    q(yl, 'tick', 0.5);
    q(nv, 'ding', 0.5);
    q(iv, 'pop', 0.5);
    q(bd, 'pop2', 0.4);
    q(st, 'pop2', 0.4);
    q(wc, 'pop2', 0.4);
    q(fl, 'boing', 0.7);
    q(fr, 'pop', 0.5);
    q(hd, 'cash', 0.5);
    q(ip, 'ding', 0.6);
    q(rf, 'dream', 0.5);
    q(np, 'buzz', 0.6);
    q(bf, 'boing', 0.5);
    q(bu, 'pop', 0.6);
    q(ni, 'flip', 0.5);
    q(na, 'paper', 0.5);
    q(ivd, 'cash', 0.5);
    q(ge, 'pop', 0.5);
    q(ot, 'cash', 0.7);
    q(ee, 'pop', 0.5);
    q(db, 'stamp', 0.7);
    q(cr, 'ding', 0.5);
    q(fe, 'cash', 0.7);
    q(dk, 'quack', 0.7);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={130} s={pop(f, sw, 9, 260)} text="WAY #2: THE BIG ONE" size={54} color={C.green} />
            <line x1={260} y1={420} x2={1660} y2={420} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
            {[['TODAY', td, 300], ['MONTHS', ml, 800], ['YEARS', yl, 1250], ['NEVER?', nv, 1640]].map(([l, at, x]) => (
              <G2 key={l as string} x={x as number} y={420} s={pop(f, at as number)}>
                <circle r={20} fill={l === 'TODAY' ? C.green : C.red} stroke={C.ink} strokeWidth={5} />
                <Text y={-60} size={40}>{l as string}</Text>
                <Text y={60} size={30} color="#5B6470">{l === 'TODAY' ? 'premium paid' : 'claim?'}</Text>
              </G2>
            ))}
            {f >= iv && (
              <G2 x={960} y={740} s={pop(f, iv)}>
                <Text y={-130} size={48} color={C.blue}>meanwhile: invest it</Text>
                {f >= bd && <G2 x={-400} s={pop(f, bd)}><Box w={300} h={160}><Text size={46}>BONDS</Text></Box></G2>}
                {f >= st && <G2 x={0} s={pop(f, st)}><Share s={0.7} n="STOCKS" /></G2>}
                {f >= wc && <G2 x={400} s={pop(f, wc)}><Box w={300} h={160}><Text size={40}>COMPANIES</Text></Box></G2>}
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <FloatPool x={620} y={560} s={1.3 * pop(f, A('c5d'))} f={f} fill={0.7} label={f >= fl ? 'FLOAT' : '$$$'} />
            <G2 x={620} y={230} s={pop(f, A('c5d') + 4)}><Text size={60}>{f >= fl ? 'the FLOAT = waiting money' : 'waiting money...'}</Text></G2>
            {f >= fr && <Dave f={f} x={1250} y={880} s={1.05} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ip, pose: 'celebrate', expr: 'grin'}]} handItem={<Bill s={0.35} />} />}
            {f >= fr && <Stick f={f} x={1650} y={880} s={1.05} acc={['cap']} seed={21} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}]} />}
            {f >= hd && <G2 x={1650} y={480} s={pop(f, hd)}><Bubble text={'hold my $100.\nI might need it back.'} size={36} tail="down" /></G2>}
            {f >= ip && <G2 x={1250} y={420} s={pop(f, ip)}><Text size={44} color={C.green}>invest it · keep the profits</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        f < np ? (
          <AbsoluteFill>
            <DreamBg />
            <Svg>
              <Agent f={f} x={960} y={880} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
              <G2 x={960} y={420} s={pop(f, rf)}><Bubble text="CLAIM DENIED! ha ha!" size={48} tail="down" /></G2>
            </Svg>
            <DreamFrame label="WHAT MOST PEOPLE THINK" />
          </AbsoluteFill>
        ) : (
          <AbsoluteFill>
            <Board />
            <Svg>
              <Stamp x={960} y={200} s={pop(f, np, 9, 260)} text="MOSTLY... NOPE" size={70} color={C.red} r={-4} />
              <FloatPool x={960} y={640} s={1.3 * pop(f, bf)} f={f} fill={0.9} />
              {f >= bf && <G2 x={960} y={930} s={pop(f, bf)}><Text size={48}>the big money = the float</Text></G2>}
            </Svg>
          </AbsoluteFill>
        )
      ) : f < A('c5i') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Buffett f={f} x={420} y={880} s={1.2 * pop(f, bu - 4)} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.8}, {at: ivd, pose: 'present', expr: 'grin', look: 0.8}]} />
            <G2 x={420} y={400} s={pop(f, bu)}><Text size={44}>Warren Buffett</Text></G2>
            {f >= ni && <Calendar x={1000} y={330} s={0.75 * pop(f, ni)} top="BOUGHT" year={1967} flip={0} />}
            {f >= na && <G2 x={1450} y={330} s={pop(f, na)}><Box w={500} h={160}><Text y={-20} size={40}>National Indemnity</Text><Text y={40} size={30} color="#5B6470">a small insurer</Text></Box></G2>}
            {f >= ivd && <FloatPool x={1000} y={760} s={0.9 * pop(f, ivd)} f={f} fill={0.6} />}
            {f >= ivd && <G2 x={1000} y={930} s={pop(f, ivd)}><Text size={36}>float → invested</Text></G2>}
            {f >= ge && <G2 x={1500} y={740} s={pop(f, ge)}><BlueCar s={1} f={f} /><Text y={130} size={40}>+ GEICO (car insurer)</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5k') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c5i'))}><Text size={52}>Berkshire's insurance float</Text></G2>
            <line x1={260} y1={880} x2={1160} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={480} y={880} h={ease(f, ee - 4, ee + 14, 2, 88 * 3.5)} color={C.yellow} label="2015" value="$88B" w={260} />
            <Bar x={920} y={880} h={ease(f, ot - 4, ot + 14, 2, 176 * 3.5)} color={C.green} label="2025" value="$176B" w={260} />
            {f >= db && <Stamp x={700} y={180 + 60} s={pop(f, db, 9, 260)} text="DOUBLED" size={50} color={C.green} r={-6} />}
            {f >= cr && (
              <G2 x={1500} y={440} s={pop(f, cr)}>
                <Box w={560} h={300}>
                  <Text y={-90} size={36} color="#5B6470">combined ratio 2025</Text>
                  <Text y={0} size={100} color={C.green}>87.1%</Text>
                  <Text y={90} size={34}>= profit on insurance</Text>
                </Box>
              </G2>
            )}
            {f >= fe && <Stamp x={1500} y={780} s={pop(f, fe, 9, 260)} text="$176B TO INVEST, FREE" size={40} color={C.red} r={-4} />}
            <SourceTag f={f} at={ot} text="Berkshire Hathaway 2025 shareholder letter (Feb 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={pop(f, A('c5k'))}><Text size={60}>{f >= pd ? 'getting PAID to borrow money' : 'like...'}</Text></G2>
            <MoneyStack x={700} y={700} n={6} s={1.1 * pop(f, pd)} label="FLOAT" />
            <Duck f={f} x={1300} y={720} s={1.3 * pop(f, dk)} />
            {f >= dk && <G2 x={1300} y={420} s={pop(f, dk + 6)}><Bubble text="...jealous." size={44} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 why premiums rise ============
  {
    const bp = w('c6b', 'bump');
    const sn = w('c6b', 'sensors');
    const hs = w('c6c', 'hospital');
    const ls = w('c6c', 'lawsuits');
    const sm = w('c6d', 'storms');
    const hx = w('c6d', 'houses');
    const fr = w('c6e', 'fraud');
    const th = w('c6e', 'three');
    const hn = w('c6e', 'honest');
    const gr = w('c6f', 'grow');
    const tw = w('c6f', 'twenty', 2);
    const bj = w('c6f', 'biggest');
    const co = w('c6g', 'cooled');
    const fv = w('c6g', 'five');
    const em = w('c6h', 'emptied');
    const rf = w('c6h', 'refill');
    q(A('c6a') + 4, 'pop', 0.5);
    q(bp, 'thud', 0.6);
    q(sn, 'click', 0.6);
    q(hs, 'pop', 0.5);
    q(ls, 'stamp', 0.5);
    q(sm, 'thud', 0.5);
    q(hx, 'pop', 0.5);
    q(fr, 'sting', 0.5);
    q(th, 'cash', 0.6);
    q(hn, 'trombone', 0.4);
    q(gr, 'pop', 0.5);
    q(tw, 'boing', 0.6);
    q(bj, 'stamp', 0.6);
    q(co, 'ding', 0.5);
    q(fv, 'pop', 0.5);
    q(em, 'poof', 0.5);
    q(rf, 'coin', 0.5);
    const reasons = [bs('c6b'), bs('c6c'), bs('c6d'), bs('c6e')];
    const cur = reasons.filter((x) => f >= x).length;
    scene(A('c6a'), () =>
      f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={pop(f, A('c6a') + 4)}><Text size={56}>Why does Dave's bill go up?</Text></G2>
            {['Pricier repairs', 'Hospital bills + lawsuits', 'Storms, floods, fires', 'Fraud'].map((l, i) => (
              <Row key={l} x={110} y={260 + i * 150} s={0.85 * pop(f, reasons[i] - 4)} n={i + 1} text={l} lit={cur === i + 1 ? 1 : 0.5} color={C.red} w={760} />
            ))}
            {cur === 0 && <Dave f={f} x={1400} y={880} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />}
            {cur === 1 && <G2 x={1400} y={560}><Bumper s={0.9 * pop(f, bp)} sensors={ease(f, sn, sn + 20)} />{f >= sn && <Text y={180} size={40}>sensors + cameras = $$$</Text>}</G2>}
            {cur === 2 && <G2 x={1400} y={560} s={pop(f, hs)}><Contract s={0.9} lines={['HOSPITAL BILL', 'LAWSUIT', 'bigger every year']} /></G2>}
            {cur === 3 && <G2 x={1400} y={620}><House s={0.7 * pop(f, hx)} color="#F4D6B8" /><Flames x={-180} y={-40} s={0.6 * pop(f, sm)} f={f} /><Text y={120} size={40}>pricier houses in risky places</Text></G2>}
            {cur === 4 && (
              <G2 x={1400} y={560}>
                <Raccoon f={f} x={-150} y={60} s={0.9 * pop(f, fr)} mood="sneaky" />
                {f >= th && <G2 x={150} y={-150} s={pop(f, th)}><Text size={72} color={C.red}>~$308B</Text><Text y={60} size={32}>a year, all insurance</Text></G2>}
                {f >= hn && <G2 x={100} y={250} s={pop(f, hn)}><Text size={38}>honest customers pay</Text></G2>}
              </G2>
            )}
            <SourceTag f={f} at={th} text="Coalition Against Insurance Fraud (2022 study)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c6f'))}><Text size={52}>U.S. car insurance prices (CPI)</Text></G2>
            <line x1={200} y1={620} x2={1200} y2={620} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={450} y={620} h={ease(f, tw - 4, tw + 14, 2, 20.3 * 20)} color={C.red} label="2023" value="+20.3%" w={260} />
            {f >= co && (
              <g>
                <rect x={810} y={620} width={260} height={ease(f, fv - 4, fv + 14, 2, 5.1 * 20)} rx={10} fill={C.green} stroke={C.ink} strokeWidth={6} />
                <Text x={940} y={620 + ease(f, fv - 4, fv + 14, 2, 5.1 * 20) + 50} size={44} color={C.green}>{f >= fv ? '-5.1%' : ''}</Text>
                <Text x={940} y={580} size={36}>Aug 2025→2026</Text>
              </g>
            )}
            {f >= bj && <Stamp x={450} y={120 + 60} s={pop(f, bj, 9, 260)} text="BIGGEST SINCE 1976" size={36} color={C.red} r={-5} />}
            {f >= em && <Pot x={1550} y={700} s={1.0 * pop(f, em)} level={f >= rf ? ease(f, rf, rf + 30, 0.05, 0.8) : ease(f, em, em + 20, 0.6, 0.05)} label={f >= rf ? 'REFILL' : undefined} />}
            {f >= em && <G2 x={1550} y={400} s={pop(f, em)}><Text size={40}>prices follow claims</Text></G2>}
            <SourceTag f={f} at={tw} text="U.S. BLS, CPI motor vehicle insurance" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 fine print ============
  {
    const dd = w('c7a', 'deductible');
    const yo = w('c7b', 'yourself');
    const sc = w('c7c', 'scratches');
    const ei = w('c7c', 'eight');
    const dp = w('c7c', 'pays');
    const ip = w('c7c', 'pays', 1);
    const tn = w('c7d', 'tiny');
    const hi = w('c7d', 'higher');
    const lo = w('c7d', 'lower');
    const dn = w('c7e', 'denied');
    const no = w('c7e', 'no');
    const cv = w('c7f', 'covered');
    const fd = w('c7f', 'floods');
    const sp = w('c7f', 'separate');
    const wr = w('c7g', 'wrong');
    const ga = w('c7g', 'garage');
    const st = w('c7g', 'street');
    const lt = w('c7h', 'late');
    const fr = w('c7h', 'fraud');
    const fp = w('c7i', 'fine');
    const rc = w('c7i', 'raccoon');
    const rd = w('c7i', 'read');
    q(dd, 'stamp', 0.6);
    q(yo, 'pop', 0.5);
    q(sc, 'rip', 0.6);
    q(ei, 'cash', 0.5);
    q(dp, 'coin', 0.5);
    q(ip, 'coin', 0.5);
    q(tn, 'pop', 0.5);
    q(hi, 'boing', 0.5);
    q(lo, 'ding', 0.6);
    q(dn, 'stamp', 0.7);
    q(no, 'buzz', 0.5);
    q(cv, 'pop', 0.5);
    q(fd, 'whoosh', 0.5);
    q(sp, 'paper', 0.5);
    q(wr, 'buzz', 0.4);
    q(ga, 'pop', 0.5);
    q(st, 'thud', 0.5);
    q(lt, 'tick', 0.5);
    q(fr, 'sting', 0.5);
    q(fp, 'paper', 0.5);
    q(rc, 'pop', 0.6);
    q(rd, 'ding', 0.6);
    scene(A('c7a'), () =>
      f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={120} s={pop(f, dd, 9, 260)} text="THE DEDUCTIBLE" size={56} color={C.blue} />
            {f < A('c7c') ? (
              <g>
                <G2 x={960} y={480} s={pop(f, yo)}>
                  <Text y={-80} size={52}>the part YOU pay first</Text>
                  <Text y={10} size={40} color="#5B6470">then insurance kicks in</Text>
                </G2>
                <Dave f={f} x={960} y={920} s={0.9} keys={[{at: 0, pose: 'point_up', expr: 'think'}]} />
              </g>
            ) : (
              <g>
                <BlueCar x={400} y={440} s={1.3} f={f} dent={f >= sc} />
                {f >= sc && <G2 x={560} y={300} s={pop(f, sc)}><Text size={40} color={C.red} font={HAND}>scraaatch!</Text></G2>}
                {f >= ei && <Deductible x={960} y={680} s={0.9 * pop(f, ei)} total={800} ded={500} t={f < dp ? 0.02 : f < ip ? ease(f, dp, dp + 12, 0.02, 0.5) : ease(f, ip, ip + 12, 0.5, 1)} />}
                <G2 x={1400} y={400} s={pop(f, A('c7c') + 6)}><Text size={44}>Dave's deductible: $500</Text></G2>
                {f >= tn && <G2 x={960} y={900} s={pop(f, tn)}><Text size={42}>{f >= lo ? 'higher deductible → lower premium' : f >= hi ? 'higher deductible →' : 'no tiny claims'}</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7i') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={120} s={pop(f, dn, 9, 260)} text="CLAIM DENIED" size={56} color={C.red} r={-3} />
            {f < cv && <Agent f={f} x={960} y={880} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: no, pose: 'shrug', expr: 'smug'}]} />}
            {f >= no && f < cv && <G2 x={960} y={420} s={pop(f, no)}><Bubble text="why can we say no?" size={40} tail="down" /></G2>}
            {f >= cv && (
              <G2 x={380} y={560} s={pop(f, cv)}>
                <Box w={520} h={520}>
                  <Text y={-210} size={38}>not covered</Text>
                  <House y={110} s={0.4} />
                  {f >= fd && <rect x={-220} y={30} width={440} height={ease(f, fd, fd + 20, 0, 80)} fill="#5AB6E0" opacity={0.8} />}
                  {f >= sp && <Text y={200} size={32} color={C.blue}>flood = separate policy</Text>}
                </Box>
              </G2>
            )}
            {f >= wr && (
              <G2 x={960} y={560} s={pop(f, wr)}>
                <Box w={520} h={520}>
                  <Text y={-210} size={38}>wrong info</Text>
                  <Text y={-130} size={32} color="#5B6470">{f >= ga ? '"I park in a garage"' : ''}</Text>
                  <BlueCar y={60} s={1} f={f} />
                  {f >= st && <XMark x={0} y={40} s={1.1} />}
                  {f >= st && <Text y={190} size={32} color={C.red}>lives on the street</Text>}
                </Box>
              </G2>
            )}
            {f >= lt && (
              <G2 x={1540} y={560} s={pop(f, lt)}>
                <Box w={520} h={520}>
                  <Text y={-210} size={38}>late / fraud</Text>
                  <Calendar y={-20} s={0.55} top="REPORTED" year="too late" flip={0} />
                  {f >= fr && <Raccoon f={f} y={130} s={0.6} mood="sneaky" />}
                </Box>
              </G2>
            )}
            <SourceTag f={f} at={fd} text="FEMA / NFIP: standard home policies don't cover flood" until={wr} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Contract x={700} y={560} s={1.1 * pop(f, A('c7i'))} lines={['coverage', 'exclusions', 'deductible', 'tiny text...']} />
            {f >= rc && <Raccoon f={f} x={1250} y={700} s={1.3 * pop(f, rc)} mood="greedy" />}
            {f >= rc && <G2 x={1300} y={400} s={pop(f, rc + 6)}><Bubble text="I LOVE fine print" size={40} tail="down" /></G2>}
            {f >= rd && <Stamp x={960} y={940} s={pop(f, rd, 9, 260)} text="READ IT BEFORE YOU NEED IT" size={44} color={C.blue} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 practical ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const tp = w('c8c', 'two', 1);
    const fv = w('c8c', 'five');
    const fo = w('c8c', 'forty');
    const em = w('c8d', 'emergency');
    const dr = w('c8f', 'drops');
    const cov = w('c8f', 'covered');
    q(fv, 'pop', 0.5);
    q(fo, 'cash', 0.6);
    q(em, 'coin', 0.6);
    q(dr, 'cash', 0.6);
    q(cov, 'chime', 0.5);
    const items = ['Shop around (3+ quotes)', 'Check your deductible', 'Emergency fund first', "Don't insure small stuff"];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () =>
      f < A('c8f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110}><Text size={60}>How Dave pays less</Text></G2>
            <G2 x={1560} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={110} y={260 + i * 150} s={0.85 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.5} color={C.green} w={900} />)}
            {cur === 0 && <Dave f={f} x={1450} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
            {cur === 0 && <G2 x={1450} y={450} s={pop(f, A('c8a') + 6)}><Bubble text="How do I pay less?" size={44} tail="down" /></G2>}
            {cur === 1 && (
              <G2 x={1480} y={520}>
                {['$1,740', '$1,310', '$1,520'].map((p, i) => <PriceTag key={p} x={0} y={-160 + i * 160} s={0.9 * pop(f, hs[0] + 10 + i * 8)} text={p} color={i === 1 ? C.green : C.yellow} />)}
              </G2>
            )}
            {cur === 2 && (
              <G2 x={1480} y={600}>
                <line x1={-320} y1={200} x2={320} y2={200} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                <Bar x={-180} y={200} h={ease(f, tp - 4, tp + 12, 2, 100 * 4)} color={C.red} label="$200 ded." value="100" w={180} />
                <Bar x={180} y={200} h={ease(f, fv - 4, fv + 12, 2, 100 * 4) - ease(f, fv + 12, fv + 30, 0, 22 * 4) - ease(f, fo, fo + 14, 0, 18 * 4)} color={C.green} label={f >= fo ? '$1,000 ded.' : '$500 ded.'} value={f >= fo ? '-40%+' : '-15–30%'} w={180} />
              </G2>
            )}
            {cur === 3 && (
              <G2 x={1480} y={560}>
                <Pot s={0.9 * pop(f, em)} level={ease(f, em, em + 40, 0.1, 0.7)} label="EMERGENCY" />
                <Text y={200} size={38}>able to pay the deductible</Text>
              </G2>
            )}
            {cur === 4 && (
              <G2 x={1480} y={560}>
                <Coffee x={-150} s={1.1} f={f} />
                <XMark x={-150} y={-20} s={0.9} />
                <House x={160} y={120} s={0.4} />
                <Text y={220} size={36}>insure disasters, not coffee spills</Text>
              </G2>
            )}
            <SourceTag f={f} at={tp} text="Insurance Information Institute (Triple-I)" until={em} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <BlueCar x={1200} y={800} s={1.7 * pop(f, A('c8f'))} f={f} />
            <Dave f={f} x={520} y={822} s={1.1} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={960} y={200} s={pop(f, A('c8f') + 4)}>
              <Box w={700} h={170}>
                <Text y={-35} size={40} color="#5B6470">DAVE'S NEW PLAN</Text>
                <Text y={30} size={56} color={C.green}>{f >= dr ? 'bill: DOWN' : 'quotes · deductible · fund'}</Text>
              </Box>
            </G2>
            {f >= cov && <Stamp x={1200} y={520} s={pop(f, cov, 9, 260)} text="STILL COVERED" size={50} color={C.green} r={-5} />}
            {f >= dr && <Sparkle x={1450} y={620} t={(f % 30) / 30} s={0.8} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 recap ============
  const recap = ['Insurance = a shared pot', 'Paid twice: premiums + float', 'Price follows claims · shop around'];
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
    const rc = w('c9e', 'recession');
    const fi = w('c9e', 'first');
    const sb = w('c9f', 'subscribe');
    const zr = w('c9f', 'zero');
    q(rc, 'sting', 0.5);
    q(fi, 'pop', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(zr, 'ding', 0.5);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={pop(f, A('c9e'))}><Text size={60}>Next: a scary word on the news...</Text></G2>
            <G2 x={1150} y={560} s={pop(f, rc)}>
              <rect x={-360} y={-240} width={720} height={480} rx={10} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-180} size={36} color="#5B6470">THE DAILY NEWS</Text>
              <Text y={-100} size={96} color={C.red}>RECESSION?</Text>
              <LineChart x={-260} y={160} t={ease(f, rc, rc + 30)} pts={[60, 70, 72, 65, 40, 30, 38]} w={520} h={170} color={C.red} />
            </G2>
            {f >= fi && <G2 x={1150} y={880} s={pop(f, fi)}><Text size={44}>what really happens · who feels it first</Text></G2>}
            <Dave f={f} x={400} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            {f >= zr && <G2 x={1450} y={760} s={pop(f, zr)}><Box w={420} h={160}><Text y={-30} size={34} color="#5B6470">PREMIUM</Text><Text y={30} size={64} color={C.green}>$0</Text></Box></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5j', 'free') + 20;
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
