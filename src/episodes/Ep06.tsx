import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, Duck, Monitor, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Phone, Row, Shield, SubButton, Bell} from '../props2';
import {Person, PriceTag, Raccoon, SplitBar} from '../props3';
import {Globe} from '../props4';
import {Bread, Conveyor, Flag, Pockets, ReportCard, Wheelbarrow} from '../props6';

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

const HOLD = [
  {l: 'Government (trust funds)', v: 7.71, c: '#6B7B8C'},
  {l: 'Federal Reserve', v: 4.56, c: C.navy},
  {l: 'Foreign countries', v: 9.16, c: C.red},
  {l: 'American investors', v: 18.68, c: C.green},
];

export const Ep06: React.FC = () => {
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
    const fy = w('o1', 'forty');
    const on = w('o2', 'one');
    const bb = w('o2', 'babies');
    q(fy - 6, 'whoosh', 0.5);
    q(we('o1', 'dollars'), 'stamp', 0.8);
    q(on, 'pop', 0.6);
    q(bb, 'boing', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={300}><Text size={210} color={C.red} stroke={C.ink} sw={14}>{'$' + lin(f, 0, we('o1', 'dollars'), 0, 40.1).toFixed(1) + ' TRILLION'}</Text></G2>
          <G2 x={960} y={470} s={pop(f, we('o1', 'dollars'))}><Text size={56} color="#5B6470">US national debt · Sept 2026</Text></G2>
          {Array.from({length: 9}).map((_, i) => <Person key={i} x={560 + i * 100} y={740} s={0.9 * pop(f, on + i * 2)} c={i === 8 ? C.blue : C.ink} />)}
          <G2 x={960} y={880} s={pop(f, on + 10)}><Text size={60}>≈ $117,000 per person</Text></G2>
          <G2 x={1420} y={700} s={pop(f, bb)}><Text size={40} color={C.blue}>(yes, babies too)</Text></G2>
          <SourceTag f={f} at={on} text="Treasury Debt to the Penny (Sept 21, 2026) · Census population ≈ 343M" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ch = w('o4', 'china');
    const np = w('o5', 'nope');
    const tw = w('o5', 'two');
    q(ch, 'pop', 0.6);
    q(np, 'buzz', 0.7);
    q(tw, 'stamp', 0.7);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Bank x={560} y={800} s={0.7} label="USA" />
          <G2 x={560} y={200} s={pop(f, bs('o3'))}><Text size={70}>borrowed from...?</Text></G2>
          <Flag kind="cn" x={1350} y={430} s={1.4 * pop(f, ch)} />
          <G2 x={1350} y={430} s={pop(f, np, 9, 280)}><XMark s={0.5} /></G2>
          <G2 x={1350} y={820} s={pop(f, tw)}><Text size={80} color={C.red} stroke={C.ink} sw={6}>&lt; 2%</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('o6', 'closer');
    const yo = w('o6', 'you');
    q(cl, 'heart', 0.5);
    q(yo, 'sting', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={960} y={820} s={1.4} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: yo, pose: 'point_r', expr: 'shock', look: 0}]} />
          <Magnifier2 f={f} at={cl} />
          <G2 x={960} y={200} s={pop(f, yo)}><Text size={80}>...maybe YOU?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const dfc = w('c1b', 'deficit');
    const pl = w('c1c', 'pile');
    const bn = w('c1d', 'bonds');
    const int = w('c1d', 'interest');
    q(dfc, 'pop', 0.5);
    for (let i = 0; i < 8; i++) q(pl + i * 4, 'pop2', 0.3);
    q(bn, 'paper', 0.6);
    q(int, 'coin', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, dfc)}><Text size={60}>every year's deficit → onto the pile</Text></G2>
            {Array.from({length: 14}).map((_, i) => {
              const at = pl + i * 4;
              return f < at ? null : <G2 key={i} x={960 + (i % 2) * 14} y={880 - i * 44 - 40 * (1 - ease(f, at, at + 8))} s={1}><rect x={-230} y={-20} width={460} height={40} rx={8} fill={i % 2 ? C.red : '#F28C9E'} stroke={C.ink} strokeWidth={4} /></G2>;
            })}
            <G2 x={1500} y={500} s={pop(f, pl + 30)}><Text size={60} color={C.red}>= NATIONAL DEBT</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Grandma f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
            {f >= bn && [0, 1, 2].map((i) => {
              const p = ((f - bn + i * 12) % 36) / 36;
              return <Bill key={i} x={560 + p * 700} y={520 - Math.sin(p * Math.PI) * 120} s={0.8} />;
            })}
            <Bank x={1450} y={820} s={0.65} label="US TREASURY" />
            <G2 x={960} y={300} s={pop(f, bn)} r={-3}><Paper id="e6b1" text={'TREASURY BOND\npay you back + interest'} reveal={1} size={50} color={C.navy} w={560} h={220} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const st = w('c1f', 'stacked');
    const wr = w('c1f', 'wrap');
    q(st, 'pop', 0.5);
    q(wr, 'whoosh', 0.6);
    q(we('c1f', 'some'), 'ding', 0.6);
    const wrap = ease(f, wr - 6, wr + 30);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Globe x={960} y={500} s={1.8} f={f} />
          <circle cx={960} cy={500} r={330} fill="none" stroke={C.green} strokeWidth={30} strokeDasharray={`${2 * Math.PI * 330 * wrap} 9999`} transform="rotate(-90 960 500)" />
          <G2 x={960 + Math.cos(-Math.PI / 2 + wrap * 2 * Math.PI) * 330} y={500 + Math.sin(-Math.PI / 2 + wrap * 2 * Math.PI) * 330} s={pop(f, st)}><Bill s={0.8} /></G2>
          <G2 x={960} y={80} s={pop(f, st)}><Text size={50}>$40T in $100 bills, stacked</Text></G2>
          <G2 x={960} y={920} s={pop(f, we('c1f', 'some'))}><Text size={60} color={C.green}>≈ 44,000 km (Earth ≈ 40,000 km)</Text></G2>
          <SourceTag f={f} at={wr} text="Math: 0.11 mm per bill × 401 billion bills" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 ============
  {
    const sv = w('c2b', 'seven');
    const lt = w('c2c', 'less');
    const lw = w('c2c', 'lowest');
    q(sv, 'pop', 0.6);
    q(lt, 'stamp', 0.6);
    q(lw, 'pop2', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Flag kind="cn" x={420} y={380} s={1.2 * pop(f, bs('c2a'))} />
          <G2 x={420} y={700} s={pop(f, sv)}><Text size={90} color={C.red}>$731B</Text></G2>
          <G2 x={1250} y={330} s={pop(f, lt)}><Text size={52}>out of $40.1T</Text></G2>
          <SplitBar x={1250} y={480} a={0.018} la="" lb="everyone else" ca={C.red} cb="#C9C3B6" w={900} t={1} />
          <G2 x={1250} y={640} s={pop(f, lt + 4)}><Text size={70} color={C.red}>&lt; 2%</Text></G2>
          <G2 x={1250} y={760} s={pop(f, lw)}><Text size={40} color="#5B6470">lowest since 2009</Text></G2>
          <SourceTag f={f} at={sv + 6} text="US Treasury TIC data, July 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const jp = w('c2d', 'japan');
    const uk = w('c2e', 'kingdom');
    const al = w('c2f', 'every');
    const qt = w('c2f', 'quarter');
    q(jp, 'pop', 0.6);
    q(uk, 'pop', 0.6);
    q(al, 'whoosh', 0.4);
    q(qt, 'stamp', 0.6);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={250} y1={780} x2={1100} y2={780} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={400} y={780} h={ease(f, jp - 4, jp + 12, 0, 1.15 * 360)} color={C.red} label="" value="$1.15T" w={200} />
          <Bar x={680} y={780} h={ease(f, uk - 4, uk + 12, 0, 0.9 * 360)} color={C.blue} label="" value="$899B" w={200} />
          <Bar x={960} y={780} h={0.73 * 360} color="#D7263D" label="" value="$731B" w={200} />
          <Flag kind="jp" x={400} y={880} s={0.5 * pop(f, jp)} />
          <Flag kind="uk" x={680} y={880} s={0.5 * pop(f, uk)} />
          <Flag kind="cn" x={960} y={880} s={0.5} />
          <G2 x={1500} y={330} s={pop(f, al)}><Globe s={0.9} f={f} /></G2>
          <G2 x={1500} y={560} s={pop(f, al + 6)}><Text size={60}>All foreign: $9.16T</Text></G2>
          <G2 x={1500} y={650} s={pop(f, qt)}><Text size={60} color={C.red}>≈ 1/4 of the debt</Text></G2>
          <SourceTag f={f} at={jp + 6} text="US Treasury TIC data, July 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const oth = w('c2g', 'other');
    q(oth, 'heart', 0.6);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={500} s={1.1}>
            <circle r={280} fill="#C9C3B6" stroke={C.ink} strokeWidth={8} />
            <path d={`M 0 0 L 0 -280 A 280 280 0 0 1 ${280 * Math.sin(Math.PI / 2 * 0.914)} ${-280 * Math.cos(Math.PI / 2 * 0.914)} Z`} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text x={100} y={-110} size={56} color="#fff" stroke={C.ink} sw={8}>foreign</Text>
            <Text x={-40} y={110} size={120} color="#fff" stroke={C.ink} sw={10}>???</Text>
          </G2>
          <Icon kind="question" x={1600} y={400} s={pop(f, oth)} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 ============
  {
    const tw = w('c3a', 'twist');
    const am = w('c3a', 'america', 1);
    q(tw, 'sting', 0.6);
    q(am, 'stamp', 0.7);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Flag kind="us" x={700} y={460} s={1.3 * pop(f, bs('c3a'))} />
          <Text x={960} y={440} size={120}>→</Text>
          <Flag kind="us" x={1250} y={460} s={1.3 * pop(f, am)} />
          <Stamp x={960} y={820} s={pop(f, am, 9, 260)} r={-4} text="AMERICA OWES AMERICA" size={64} color={C.navy} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('c3b', 'seven');
    const ow = w('c3c', 'owe');
    const sc = w('c3d', 'social');
    const tf = w('c3d', 'trust');
    const lt = w('c3e', 'lent');
    const lp = w('c3e', 'left');
    q(sv, 'pop', 0.6);
    q(ow, 'boing', 0.5);
    q(sc, 'pop', 0.5);
    q(tf, 'ding', 0.5);
    q(lp, 'whoosh_s', 0.4);
    scene(A('c3b'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={120} y={120}><Row n={1} text="The government itself: $7.7T" lit={1} color="#6B7B8C" w={1100} /></G2>
            <Dave f={f} x={500} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: ow, pose: 'shrug', expr: 'worried'}]} />
            <G2 x={500} y={420} s={pop(f, ow)}><Bubble text={'owe...\nyourself?'} size={46} /></G2>
            <G2 x={1300} y={560} s={pop(f, sc)}>
              <rect x={-280} y={-200} width={560} height={400} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-140} size={40}>SOCIAL SECURITY</Text>
              <Text y={-90} size={30} color="#5B6470">workers paid in more than retirees took</Text>
              <G2 y={60} s={pop(f, tf)}><MoneyStack n={6} s={1} y={60} label="TRUST FUND" lr={-3} /></G2>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, lt)}><Text size={56}>Trust fund → lent to the Treasury</Text></G2>
            <Pockets x={960} y={560} s={1.3} f={f} t={ease(f, lp - 4, lp + 24)} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const fr = w('c3f', 'federal');
    const fo = w('c3f', 'four');
    const cl = w('c3g', 'click');
    const bt = w('c3g', 'bought');
    q(fr, 'pop', 0.6);
    q(fo, 'stamp', 0.6);
    q(cl, 'click', 0.8);
    q(cl + 8, 'quack', 0.4);
    q(bt, 'cash', 0.5);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={120} y={120}><Row n={2} text="The Federal Reserve: $4.56T" lit={1} color={C.navy} w={1100} /></G2>
          <Bank x={500} y={820} s={0.7 * pop(f, fr)} label="FEDERAL RESERVE" />
          <Monitor x={1250} y={720} s={0.9} title="FED BUYS BONDS" value={f > cl ? '$4.56T' : '$0'} valueColor={C.green} flash={f > cl ? out(f, cl, 10) : 0} />
          <Duck f={f} x={1650} y={800} s={0.55 * pop(f, cl + 6)} />
          <SourceTag f={f} at={fo + 6} text="Federal Reserve H.4.1, Sept 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bg = w('c3h', 'biggest');
    const items = ['banks', 'pension', 'insurance', 'money', 'state', 'regular'].map((x) => w('c3i', x));
    const rt = w('c3j', 'retirement');
    const gm = w('c3j', 'grandma');
    const bth = w('c3k', 'both');
    q(bg, 'pop', 0.6);
    items.forEach((x) => q(x, 'pop2', 0.45));
    q(rt, 'pop', 0.5);
    q(gm, 'ding', 0.5);
    q(bth, 'boing', 0.5);
    const labels = ['Banks', 'Pension funds', 'Insurance cos.', 'Money market funds', 'State governments', 'Regular people'];
    scene(A('c3h'), () =>
      f < A('c3j') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={120} y={120}><Row n={3} text="American investors: ≈ $18.7T" lit={1} color={C.green} w={1100} s={pop(f, bg)} /></G2>
            {labels.map((l, i) => (
              <Frame key={l} x={380 + (i % 3) * 580} y={400 + Math.floor(i / 3) * 330} s={pop(f, items[i])} w={520} h={260}>
                {i === 0 ? <Bank s={0.3} y={100} /> : i === 5 ? <Dave f={f} x={0} y={110} s={0.5} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} /> : <MoneyStack n={4} s={0.8} y={70} />}
                <Text y={-80} size={40}>{l}</Text>
              </Frame>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Phone x={520} y={500} s={0.95 * pop(f, rt)} title="RETIREMENT" value="$24,500" color={C.green} />
            <G2 x={520} y={800} s={pop(f, rt + 6)}><Text size={36}>part = Treasury bonds</Text></G2>
            <Grandma f={f} x={1150} y={820} s={1.1 * pop(f, gm - 4)} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.6}]} handItem={<Paper id="e6sb" text="SAVINGS BOND" reveal={1} size={20} color={C.green} w={160} h={70} y={-30} />} />
            <G2 x={1550} y={400} s={pop(f, bth)}><Text size={52}>borrower</Text></G2>
            <G2 x={1550} y={470} s={pop(f, bth + 4)}><Text size={52}>AND lender</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    q(A('c3k') + 30, 'ding', 0.5);
    let acc = 0;
    const total = HOLD.reduce((s, h) => s + h.v, 0);
    scene(A('c3k') + 40, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={140}><Text size={60}>Who holds the $40.1T</Text></G2>
          {HOLD.map((h, i) => {
            const x0 = 160 + (acc / total) * 1600;
            const wd = (h.v / total) * 1600;
            acc += h.v;
            const s = ease(f, A('c3k') + 40 + i * 8, A('c3k') + 52 + i * 8);
            return (
              <g key={h.l} opacity={s}>
                <rect x={x0} y={400} width={wd} height={160} fill={h.c} stroke={C.ink} strokeWidth={5} />
                <Text x={x0 + wd / 2} y={480} size={44} color="#fff" stroke={C.ink} sw={6}>{'$' + h.v.toFixed(1) + 'T'}</Text>
                <Text x={x0 + wd / 2} y={610 + (i % 2) * 50} size={30}>{h.l}</Text>
              </g>
            );
          })}
          <G2 x={960} y={860} s={pop(f, A('c3k') + 80)}><Text size={60} color={C.green}>≈ 3/4 owed to Americans</Text></G2>
          <SourceTag f={f} at={A('c3k') + 50} text="Treasury Debt to the Penny · TIC · Fed H.4.1 (rounded)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 ============
  {
    const sf = w('c4b', 'safest');
    const tx = w('c4c', 'tax');
    const cur = w('c4c', 'currency');
    const fv = w('c4d', 'favorite');
    const sc = w('c4e', 'scared');
    q(sf, 'ding', 0.6);
    q(tx, 'pop', 0.5);
    q(cur, 'pop', 0.5);
    q(fv, 'coin', 0.5);
    q(sc, 'whoosh', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Shield x={560} y={480} s={1.2 * pop(f, sf)} top="US BONDS" big="SAFE" />
          <G2 x={1300} y={300} s={pop(f, tx)}><Text size={48}>power to tax the biggest economy</Text></G2>
          <G2 x={1300} y={400} s={pop(f, cur)}><Text size={48}>borrows in its own currency</Text></G2>
          <G2 x={1300} y={520} s={pop(f, fv)}><Bill s={1.5} /></G2>
          <G2 x={1300} y={620} s={pop(f, fv + 4)}><Text size={44}>the world's favorite money</Text></G2>
          {f >= sc && Array.from({length: 6}).map((_, i) => {
            const p = ((f - sc + i * 8) % 40) / 40;
            return <Coin key={i} x={1900 - p * 1250} y={850 + Math.sin(i + p * 6) * 30} s={0.8} />;
          })}
          <G2 x={1300} y={760} s={pop(f, sc)}><Text size={44} color={C.blue}>scared money runs → US bonds</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 ============
  {
    const hh = w('c5b', 'household');
    const rl = w('c5b', 'rolling');
    const ex = w('c5c', 'exploding');
    const nn = w('c5c', 'nine');
    q(hh, 'pop', 0.5);
    q(rl, 'pop2', 0.4);
    q(ex, 'heart', 0.6);
    q(nn, 'stamp', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={pop(f, bs('c5a'))}><Text size={70}>Is $40T a problem?</Text></G2>
            <G2 x={600} y={420} s={pop(f, hh)}><Text size={48}>A country ≠ a household</Text></G2>
            <Conveyor x={960} y={680} s={pop(f, rl)} f={f} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Raccoon f={f} x={620} y={560} s={1.6 + 0.3 * Math.sin(f / 10)} mood="greedy" holdCoin grab={0.5} />
            <G2 x={1350} y={420} s={pop(f, nn)}><Text size={130} color={C.red} stroke={C.ink} sw={10}>$970B</Text></G2>
            <G2 x={1350} y={560} s={pop(f, nn + 6)}><Text size={48}>interest in 2025 (&gt; military)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const ec = w('c5d', 'economy');
    const md = w('c5e', 'moodys');
    const lw = w('c5e', 'lowered');
    const gd = w('c5f', 'good');
    q(ec, 'pop', 0.5);
    q(md, 'paper', 0.6);
    q(lw, 'stamp', 0.7);
    q(gd, 'ding', 0.5);
    scene(A('c5d'), () =>
      f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={500} y1={820} x2={1420} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={740} y={820} h={ease(f, ec - 6, ec + 10, 0, 500)} color={C.red} label="Debt held by investors" value="≈" w={300} />
            <Bar x={1180} y={820} h={ease(f, ec - 2, ec + 14, 0, 500)} color={C.green} label="Whole US economy" value="≈" w={300} />
            <G2 x={960} y={180} s={pop(f, ec)}><Text size={60}>About the same size</Text></G2>
            <SourceTag f={f} at={ec + 6} text="CBO: debt held by the public ≈ 100% of GDP (FY2025)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <ReportCard x={760} y={500} s={pop(f, md)} old="Aaa" grade="Aa1" cross={ease(f, lw, lw + 14)} />
            <Dave f={f} x={1400} y={860} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: gd, pose: 'shrug', expr: 'smug'}]} />
            <G2 x={1400} y={300} s={pop(f, gd)}><Text size={48}>still good. not perfect.</Text></G2>
            <SourceTag f={f} at={lw} text="Moody's downgrade, May 2025" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 ============
  {
    const pr = w('c6a', 'print');
    const dk = w('c6b', 'duck');
    q(pr, 'click', 0.6);
    q(dk, 'quack', 0.7);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={520} y={860} s={1.2} keys={[{at: 0, pose: 'think', expr: 'happy'}, {at: pr, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={1250} y={380} s={pop(f, pr)}><Bubble text={'Just PRINT\n$40 trillion!'} size={56} tail="left" /></G2>
          <Duck f={f} x={1500} y={760} s={0.9 * pop(f, dk)} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hl = w('c6c', 'hundred');
    const pr = w('c6d', 'prints');
    const up = w('c6e', 'up');
    const inf = w('c6f', 'inflation');
    q(hl, 'pop', 0.5);
    q(pr, 'cash', 0.6);
    q(up, 'boing', 0.6);
    q(inf, 'stamp', 0.7);
    const price = f < up ? '$1' : '$2';
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          {Array.from({length: 10}).map((_, i) => <Bread key={i} x={220 + (i % 5) * 150} y={380 + Math.floor(i / 5) * 110} s={0.9 * pop(f, hl + i)} />)}
          <G2 x={520} y={600} s={pop(f, hl + 12)}><Text size={40}>100 loaves (same)</Text></G2>
          {Array.from({length: f >= pr ? 20 : 10}).map((_, i) => <Bill key={i} x={1200 + (i % 5) * 120} y={320 + Math.floor(i / 5) * 90} s={0.7 * pop(f, i < 10 ? hl + 6 + i : pr + (i - 10) * 2)} />)}
          <G2 x={1440} y={740} s={pop(f, hl + 18)}><Text size={40}>{f >= pr ? '$200 (printed more)' : '$100'}</Text></G2>
          <PriceTagBig x={880} y={820} text={'1 loaf = ' + price} red={f >= up} s={pop(f, hl + 20) * (1 + 0.15 * pop(f, up) * out(f, up + 8))} />
          <Stamp x={960} y={150} s={pop(f, inf, 9, 260)} r={-4} text="INFLATION" size={80} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const zm = w('c6g', 'zimbabwe');
    const db = w('c6g', 'doubling');
    const wb = w('c6g', 'wheelbarrows');
    const pn = w('c6h', 'pain');
    q(zm, 'pop', 0.5);
    q(db, 'whoosh', 0.5);
    q(wb, 'boing', 0.5);
    q(pn, 'thud', 0.6);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Calendar x={260} y={260} s={0.8 * pop(f, zm)} top="ZIMBABWE" year={2008} flip={0} />
          <G2 x={960} y={200} s={pop(f, db)}><Text size={64} color={C.red}>prices doubled ~every day</Text></G2>
          <Wheelbarrow x={ease(f, wb - 10, A('c6h'), 300, 1100)} y={760} s={1.1 * pop(f, wb - 10)} f={f} />
          <Dave f={f} x={ease(f, wb - 10, A('c6h'), 560, 1360)} y={820} s={1} walk keys={[{at: 0, pose: 'present', expr: 'tired'}]} />
          <PriceTagBig x={1500} y={420} text="Bread: $$$$$$" red s={pop(f, wb)} />
          <G2 x={960} y={900} s={pop(f, pn)}><Text size={52}>printing → pain moves to your wallet</Text></G2>
          <SourceTag f={f} at={db + 6} text="Hanke & Kwok (2009): Zimbabwe, Nov 2008 hyperinflation" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 ============
  const recap = ['$40T owed · China < 2%', '~3/4 owed to Americans', "Can't print our way out"];
  {
    const r = [bs('c7b'), bs('c7c'), bs('c7d')];
    q(A('c7a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c7a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={400} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1120} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wl = w('c7e', 'wallet');
    const hb = w('c7f', 'hundred');
    const ls = w('c7f', 'less');
    const sb = w('c7g', 'subscribe');
    q(wl, 'pop', 0.5);
    q(ls, 'boing', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c7e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <G2 x={960} y={480} s={(1 - 0.35 * ease(f, hb, ls + 20)) * 3 * pop(f, wl)}><Bill /></G2>
            <G2 x={960} y={820} s={pop(f, ls)}><Text size={70}>Why does your $100 keep shrinking?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.9}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};

const Magnifier2: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = ease(f, at, at + 30);
  return (
    <g transform={`translate(${300 + p * 660},${400 - Math.sin(p * Math.PI) * 100}) scale(${pop(f, at)})`}>
      <line x1={60} y1={60} x2={150} y2={150} stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
      <circle r={90} fill="rgba(200,230,255,0.45)" stroke={C.ink} strokeWidth={14} />
    </g>
  );
};

const PriceTagBig: React.FC<{x: number; y: number; text: string; red?: boolean; s?: number}> = ({x, y, text, red, s = 1}) =>
  s <= 0 ? null : (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M -220 -54 L 170 -54 L 230 0 L 170 54 L -220 54 Z" fill={red ? C.red : C.yellow} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <Text x={-20} y={3} size={52} color={red ? '#fff' : C.ink}>{text}</Text>
    </g>
  );
