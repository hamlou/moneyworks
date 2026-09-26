import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {useT} from '../timing';
import {ease, lin, out, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette} from '../fx';
import {Bank, Bill, Bubble, Calendar, Card, Coin, MoneyStack, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Icon, Phone, Row, SubButton, Bell} from '../props2';
import {Raccoon, SourceCard, SplitBar, Person} from '../props3';
import {House, Truck} from '../props4';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Pot: React.FC<{x: number; y: number; s?: number; fill: number; f: number}> = ({x, y, s = 1, fill, f}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={-200 + (1 - fill) * 160} rx={250} ry={40} fill={C.green} opacity={fill > 0 ? 1 : 0} />
    {fill > 0.3 && [0, 1, 2, 3, 4].map((i) => <Coin key={i} x={-160 + i * 80} y={-210 + (1 - fill) * 160 + Math.sin(f / 5 + i) * 6} s={0.9} />)}
    <path d="M -270 -210 Q -290 100 0 110 Q 290 100 270 -210 Z" fill="#3A3F4B" stroke={C.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-210} rx={275} ry={46} fill="none" stroke={C.ink} strokeWidth={10} />
    <rect x={-310} y={-190} width={40} height={24} rx={10} fill="#3A3F4B" stroke={C.ink} strokeWidth={6} />
    <rect x={270} y={-190} width={40} height={24} rx={10} fill="#3A3F4B" stroke={C.ink} strokeWidth={6} />
    <text x={0} y={-40} fontFamily={FONT} fontWeight={700} fontSize={54} fill="#fff" textAnchor="middle" dominantBaseline="middle">TAX POT</text>
  </g>
);

type Slice = {v: number; c: string; l: string; amt: string};
const SLICES: Slice[] = [
  {v: 23, c: '#3A86FF', l: 'Social Security', amt: '$23'},
  {v: 14, c: '#2DB77A', l: 'Medicare', amt: '$14'},
  {v: 13, c: '#6B7B8C', l: 'Defense', amt: '$13'},
  {v: 14, c: '#EF476F', l: 'INTEREST', amt: '$14'},
  {v: 36, c: '#F4C95D', l: 'Everything else', amt: '$36'},
];
const Pie: React.FC<{x: number; y: number; s?: number; shown: number; hl?: number}> = ({x, y, s = 1, shown, hl = -1}) => {
  let a0 = -Math.PI / 2;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle r={300} fill="#E9B872" stroke={C.ink} strokeWidth={8} />
      <circle r={280} fill="#F6E2C0" />
      {SLICES.map((sl, i) => {
        const a1 = a0 + (sl.v / 100) * Math.PI * 2;
        const mid = (a0 + a1) / 2;
        const on = i < shown;
        const push = i === hl ? 26 : 0;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M 0 0 L ${Math.cos(a0) * 280} ${Math.sin(a0) * 280} A 280 280 0 ${large} 1 ${Math.cos(a1) * 280} ${Math.sin(a1) * 280} Z`;
        const el = on ? (
          <g key={i} transform={`translate(${Math.cos(mid) * push},${Math.sin(mid) * push})`}>
            <path d={d} fill={sl.c} stroke={C.ink} strokeWidth={6} />
            <text x={Math.cos(mid) * 175} y={Math.sin(mid) * 175} fontFamily={FONT} fontWeight={700} fontSize={56} fill="#fff" stroke={C.ink} strokeWidth={8} paintOrder="stroke" textAnchor="middle" dominantBaseline="middle">{sl.amt}</text>
          </g>
        ) : null;
        a0 = a1;
        return el;
      })}
    </g>
  );
};

export const Ep05: React.FC = () => {
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
    const fr = w('o1', 'four');
    const lands = w('o2', 'lands');
    const ms = w('o2', 'missing');
    const tx = w('o3', 'taxes');
    const wh = w('o3', 'where');
    q(fr, 'cash', 0.6);
    q(lands, 'ding', 0.4);
    q(ms, 'poof', 0.6);
    q(tx, 'stamp', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={480} y={860} s={1.3} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: ms, pose: 'shock', expr: 'shock'}, {at: wh, pose: 'shrug', expr: 'worried'}]} />
          <G2 x={1250} y={470} s={pop(f, fr - 4)}>
            <rect x={-330} y={-230} width={660} height={460} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-180} size={34} color="#5B6470" ls={4}>PAYCHECK</Text>
            <Text x={-280} y={-90} size={46} anchor="start">Earned</Text>
            <Text x={280} y={-90} size={46} anchor="end" color={C.green}>$4,000</Text>
            <g opacity={ease(f, ms, ms + 8)}>
              <Text x={-280} y={-10} size={46} anchor="start" color={C.red}>Taxes</Text>
              <Text x={280} y={-10} size={46} anchor="end" color={C.red}>−$???</Text>
              <line x1={-280} y1={40} x2={280} y2={40} stroke={C.ink} strokeWidth={4} strokeDasharray="12 8" />
              <Text x={-280} y={100} size={50} anchor="start">Take home</Text>
              <Text x={280} y={100} size={50} anchor="end">less...</Text>
            </g>
          </G2>
          <Puff x={1250} y={450} t={lin(f, ms, ms + 20)} s={0.7} />
          <Stamp x={1250} y={150} s={pop(f, tx, 9, 260)} r={-5} text="TAXES" size={70} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('o4', 'wrong');
    const it = w('o5', 'interest');
    const ml = w('o5', 'military');
    q(wr, 'buzz', 0.5);
    q(it, 'pop', 0.6);
    q(ml, 'stamp', 0.8);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={200} s={pop(f, wr)}><Text size={90} color={C.red}>Most people guess wrong.</Text></G2>
          <line x1={400} y1={820} x2={1520} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={720} y={820} h={ease(f, it - 4, it + 14, 0, 480)} color={C.red} label="Interest on debt" value="$970B" w={260} />
          <Bar x={1200} y={820} h={ease(f, ml - 4, ml + 14, 0, 453)} color="#6B7B8C" label="Military / defense" value="$916B" w={260} />
          <SourceTag f={f} at={ml + 6} text="CBO & Peterson Foundation, fiscal year 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fl = w('o6', 'follow');
    const br = w('o6', 'borrow');
    q(fl, 'pop', 0.5);
    q(br, 'stamp', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          <Frame x={380} y={500} s={pop(f, fl)} w={470} h={430} label="Where it comes from"><Bill y={-40} s={1.3} /></Frame>
          <Frame x={960} y={500} s={pop(f, fl + 12)} w={470} h={430} label="Where it goes"><Pie x={0} y={-40} s={0.42} shown={5} /></Frame>
          <Frame x={1540} y={500} s={pop(f, br)} w={470} h={430} label="Why we still borrow"><Text y={-40} size={100} color={C.red} stroke={C.ink} sw={8}>$1.8T</Text></Frame>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ============
  {
    const fi = w('c1b', 'federal');
    const hr = w('c1b', 'higher');
    const pr = w('c1c', 'payroll');
    const sx = w('c1d', 'six');
    const on = w('c1d', 'one');
    const au = w('c1d', 'automatically');
    const st = w('c1e', 'state');
    const gn = w('c1f', 'gone');
    [fi, pr, st].forEach((x) => q(x, 'pop', 0.55));
    q(sx, 'coin', 0.4);
    q(on, 'coin', 0.4);
    q(au, 'click', 0.6);
    q(gn, 'poof', 0.6);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120}><Text size={60}>Dave's paycheck</Text></G2>
          <Row x={250} y={290} s={pop(f, fi - 4)} n={1} text="Federal income tax" lit={1} color={C.red} w={1000} />
          <G2 x={1460} y={290} s={pop(f, hr)}>
            {[0, 1, 2, 3].map((i) => <rect key={i} x={-120 + i * 60} y={40 - (i + 1) * 30} width={46} height={(i + 1) * 30} fill={C.red} stroke={C.ink} strokeWidth={3} />)}
            <Text y={80} size={26} color="#5B6470">higher rates on the top part</Text>
          </G2>
          <Row x={250} y={470} s={pop(f, pr - 4)} n={2} text="Payroll tax" lit={1} color={C.red} w={1000} />
          <G2 x={1460} y={440} s={pop(f, sx)}><Text size={44}>6.2% Social Security</Text></G2>
          <G2 x={1460} y={500} s={pop(f, on)}><Text size={44}>1.45% Medicare</Text></G2>
          <Row x={250} y={650} s={pop(f, st - 4)} n={3} text="State & local (maybe)" lit={1} color={C.red} w={1000} />
          <G2 x={960} y={860} s={pop(f, gn)}><Text size={56} color={C.red}>gone before it arrived</Text></G2>
          <SourceTag f={f} at={sx + 6} text="IRS/SSA employee payroll tax rates" until={gn} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rf = w('c1g', 'refund');
    const gf = w('c1g', 'gift');
    const fr = w('c1g', 'free');
    q(rf, 'mail', 0.5);
    q(gf, 'buzz', 0.4);
    q(fr, 'coin', 0.5);
    scene(A('c1g'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Dave f={f} x={520} y={820} s={1.25} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}, {at: gf, pose: 'think', expr: 'think'}]} />
          <G2 x={1250} y={420} s={pop(f, rf)} r={-4}>
            <rect x={-260} y={-150} width={520} height={300} rx={14} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-80} size={40} color="#5B6470">TAX REFUND</Text>
            <Text y={20} size={100} color={C.green}>$1,200</Text>
          </G2>
          <G2 x={1250} y={700} s={pop(f, gf)}><Text size={52}>= your own money back</Text></G2>
          <G2 x={1250} y={790} s={pop(f, fr)}><Text size={40} color={C.red}>(lent to the government at 0%)</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 ============
  {
    const pt = w('c2a', 'pot');
    const fv = w('c2b', 'five');
    const inc = w('c2c', 'half');
    const pay = w('c2d', 'third');
    const rst = w('c2e', 'rest');
    const reg = w('c2f', 'regular');
    q(pt, 'pop', 0.6);
    for (let k = pt + 8; k < fv; k += 6) q(k, 'coin', 0.3);
    q(fv, 'stamp', 0.6);
    q(inc, 'pop', 0.5);
    q(pay, 'pop', 0.5);
    q(rst, 'pop', 0.5);
    q(reg, 'ding', 0.5);
    const fill = ease(f, pt, fv + 10, 0.05, 1);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Pot x={560} y={700} s={1} fill={fill} f={f} />
          {f > pt && f < fv + 10 && Array.from({length: 6}).map((_, i) => {
            const p = ((f - pt + i * 7) % 30) / 30;
            return <Coin key={i} x={260 + i * 120} y={-50 + p * 600} s={0.9} />;
          })}
          <G2 x={560} y={220} s={pop(f, fv)}><Text size={120} color={C.green} stroke={C.ink} sw={8}>$5.2 TRILLION</Text></G2>
          <G2 x={1400} y={600} s={pop(f, inc - 4)}>
            <rect x={-230} y={-280} width={460} height={560} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <rect x={-200} y={-250} width={400} height={500 * 0.16} fill="#C9C3B6" opacity={f >= rst ? 1 : 0} />
            <rect x={-200} y={-250 + 500 * 0.16} width={400} height={500 * 0.34} fill={C.blue} opacity={f >= pay ? 1 : 0} />
            <rect x={-200} y={-250 + 500 * 0.5} width={400} height={500 * 0.5} fill={C.green} />
            <Text y={120} size={40} color="#fff">Income tax ~51%</Text>
            <Text y={-80} size={34} color="#fff">{f >= pay ? 'Payroll ~34%' : ''}</Text>
            <Text y={-212} size={26}>{f >= rst ? 'Corporate, tariffs, other' : ''}</Text>
          </G2>
          <SourceTag f={f} at={fv + 6} text="CBO: fiscal year 2025 revenues" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 ============
  {
    const sv = w('c3a', 'seven');
    const pz = w('c3b', 'pizza');
    const s1 = w('c3c', 'twenty');
    const s2 = w('c3d', 'fourteen');
    const s3 = w('c3e', 'thirteen');
    const s4 = w('c3f', 'fourteen');
    const it = w('c3f', 'interest');
    const s5 = w('c3g', 'thirty');
    q(sv, 'stamp', 0.5);
    q(pz, 'pop', 0.6);
    [s1, s2, s3, s4, s5].forEach((x) => q(x, 'pop', 0.6));
    q(it, 'heart', 0.5);
    const shown = [s1, s2, s3, s4, s5].filter((x) => f >= x - 4).length;
    const lists = ['Medicaid', 'Veterans', 'Highways', 'Food aid', 'Schools', 'Science', 'Parks', 'NASA'];
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, sv)}><Text size={60}>Spent in 2025: $7.0 trillion</Text></G2>
          {f >= pz - 4 && <Pie x={620} y={560} s={pop(f, pz - 4)} shown={shown} hl={shown - 1} />}
          <G2 x={1400} y={300} s={pop(f, pz)}><Text size={48}>Per $100 spent:</Text></G2>
          {SLICES.map((sl, i) => (
            <G2 key={i} x={1180} y={390 + i * 90} s={pop(f, [s1, s2, s3, s4, s5][i] - 2)}>
              <rect x={0} y={-30} width={60} height={60} rx={10} fill={sl.c} stroke={C.ink} strokeWidth={4} />
              <Text x={85} y={2} size={46} anchor="start" color={i === 3 ? C.red : C.ink}>{sl.amt + '  ' + sl.l}</Text>
            </G2>
          ))}
          {f >= s5 + 10 && lists.map((l, i) => (
            <G2 key={l} x={1260 + (i % 4) * 150} y={880 + Math.floor(i / 4) * 44} s={pop(f, s5 + 10 + i * 3)}>
              <Text size={28} color="#8C7A5B">{l}</Text>
            </G2>
          ))}
          <SourceTag f={f} at={s1} text="CBO FY2025: SS ≈ $1.6T, Medicare ≈ $987B, interest ≈ $970B; defense ≈ $916B (PGPF)" until={s5 + 8} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 ============
  {
    const nn = w('c4b', 'nine');
    const df = w('c4c', 'defense');
    const mr = w('c4d', 'more');
    const nt = w('c4e', 'nothing');
    const rc = w('c4f', 'raccoon');
    const hg = w('c4f', 'huge');
    q(nn, 'pop', 0.6);
    q(df, 'pop', 0.6);
    q(mr, 'stamp', 0.8);
    q(nt, 'buzz', 0.4);
    q(rc, 'boing', 0.6);
    q(hg, 'thud', 0.7);
    scene(A('c4a'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={400} y1={820} x2={1520} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={720} y={820} h={ease(f, nn - 4, nn + 14, 0, 485)} color={C.red} label="Interest" value="$970B" w={260} />
            <Bar x={1200} y={820} h={ease(f, df - 4, df + 14, 0, 458)} color="#6B7B8C" label="Defense" value="$916B" w={260} />
            <Stamp x={960} y={150} s={pop(f, mr, 9, 260)} r={-4} text="INTEREST > MILITARY" size={70} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[['house', 340], ['briefcase', 620]].map(([k, x]) => (
              <G2 key={k as string} x={x as number} y={300} s={0.8 * pop(f, nt)}>
                <Icon kind={k as 'house'} />
                <XMark s={0.22} />
              </G2>
            ))}
            <G2 x={480} y={520} s={pop(f, nt)}><Text size={46}>interest buys nothing</Text></G2>
            <Raccoon f={f} x={1300} y={560} s={(1 + 1.2 * ease(f, hg - 4, hg + 12)) * pop(f, rc - 4)} mood="greedy" holdCoin grab={0.6} />
            <G2 x={1300} y={150} s={pop(f, rc)}><Text size={52}>the government's raccoon</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 ============
  {
    const fa = w('c5a', 'foreign');
    const tw = w('c5b', 'twenty');
    const ra = w('c5c', 'real');
    const on = w('c5d', 'one');
    const tn = w('c5e', 'tiny');
    q(fa, 'pop', 0.5);
    q(tw, 'pop', 0.6);
    for (let k = ra; k < on; k += 10) q(k, 'tick', 0.5);
    q(on, 'stamp', 0.8);
    q(tn, 'boing', 0.5);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={pop(f, fa)}><Text size={56}>Share of budget → foreign aid</Text></G2>
          {Array.from({length: 6}).map((_, i) => <Person key={i} x={260 + i * 90} y={400} s={0.8 * pop(f, fa + 6 + i * 2)} c="#B8B0A0" />)}
          <G2 x={520} y={530} s={pop(f, tw)}><Bubble text="~26%?" size={60} /></G2>
          <line x1={300} y1={900} x2={1620} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={620} y={900} h={ease(f, tw, tw + 14, 0, 26 * 11)} color="#C9C3B6" label="What people guess" value="26%" w={240} />
          <Bar x={1300} y={900} h={Math.max(6, ease(f, on - 2, on + 8, 0, 11))} color={C.green} label="Reality" value={f >= on ? '~1%' : '?'} w={240} />
          <SourceTag f={f} at={on + 6} text="KFF Health Tracking Poll (2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pl = w('c5e', 'political');
    const big = w('c5f', 'big');
    q(big, 'pop', 0.5);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Pie x={960} y={500} s={1.05 * pop(f, big - 4)} shown={4} hl={-1} />
          <G2 x={960} y={900} s={pop(f, big)}><Text size={52}>The budget lives in the big 4</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 ============
  {
    const fv = w('c6a', 'five');
    const sv = w('c6a', 'seven');
    const gp = w('c6b', 'gap');
    const dfc = w('c6c', 'deficit');
    const brw = w('c6c', 'borrows');
    q(fv, 'pop', 0.5);
    q(sv, 'pop', 0.5);
    q(gp, 'stamp', 0.7);
    q(brw, 'cash', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={400} y1={850} x2={1520} y2={850} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Bar x={720} y={850} h={ease(f, fv - 4, fv + 12, 0, 520)} color={C.green} label="Collected" value="$5.2T" w={280} />
          <Bar x={1200} y={850} h={ease(f, sv - 4, sv + 12, 0, 700)} color={C.red} label="Spent" value="$7.0T" w={280} />
          {f >= gp && <rect x={1060} y={150} width={280} height={180} fill="none" stroke={C.ink} strokeWidth={6} strokeDasharray="16 10" />}
          <G2 x={760} y={220} s={pop(f, gp)}><Text size={80} color={C.red} stroke={C.ink} sw={6}>GAP: $1.8T</Text></G2>
          <G2 x={760} y={310} s={pop(f, dfc)}><Text size={48}>= the DEFICIT</Text></G2>
          <G2 x={1600} y={500} s={pop(f, brw)}><Text size={50} color={C.blue}>→ borrow</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tb = w('c6d', 'treasury');
    const gr = w('c6e', 'grows');
    const lp = w('c6f', 'loop');
    q(tb, 'paper', 0.6);
    q(gr, 'whoosh_s', 0.4);
    q(lp, 'boing', 0.5);
    const rot = f * 1.2;
    scene(A('c6d'), () =>
      f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={450} s={pop(f, tb)} r={-3}>
              <Paper id="e5b1" text={'TREASURY BOND\nIOU + interest'} reveal={1} size={64} color={C.navy} w={620} h={340} />
            </G2>
            <Bank x={1500} y={820} s={0.6} label="GOVERNMENT" />
            <Stick f={f} x={1200} y={860} s={1} acc={['tophat', 'monocle']} seed={53} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}]} handItem={<MoneyStack n={3} s={0.5} y={-20} />} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {['More debt', 'More interest', 'Bigger deficit'].map((l, i) => {
              const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
              return (
                <G2 key={l} x={960 + Math.cos(a) * 300} y={500 + Math.sin(a) * 300} s={pop(f, gr + i * 10)}>
                  <rect x={-200} y={-50} width={400} height={100} rx={50} fill="#fff" stroke={C.ink} strokeWidth={6} />
                  <Text size={46} color={C.red}>{l}</Text>
                </G2>
              );
            })}
            <g transform={`translate(960,500) rotate(${rot})`} opacity={pop(f, lp - 20)}>
              <circle r={190} fill="none" stroke={C.red} strokeWidth={10} strokeDasharray="60 30" />
            </g>
            <Stamp x={960} y={500} s={pop(f, lp, 9, 260)} text="LOOP" size={70} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 ============
  {
    const rd = w('c7b', 'roads');
    const rt = w('c7c', 'rates');
    const mg = w('c7c', 'mortgage');
    const rs = w('c7d', 'raise');
    const ct = w('c7d', 'cut');
    const kb = w('c7d', 'keep');
    const fl = w('c7e', 'fool');
    q(rd, 'pop', 0.5);
    q(rt, 'pop', 0.5);
    q(mg, 'pop2', 0.4);
    [rs, ct, kb].forEach((x) => q(x, 'ding', 0.45));
    q(fl, 'sting', 0.5);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={420} y={820} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: rt, pose: 'shock', expr: 'worried'}]} />
            <Frame x={1000} y={420} s={pop(f, rd)} w={540} h={360} label="Can't go to roads & schools">
              <Truck y={40} s={0.8} />
              <XMark s={0.25} />
            </Frame>
            <Frame x={1550} y={420} s={pop(f, rt)} w={500} h={360} label="Rates up for Dave too">
              <Text y={-10} size={100} color={C.red}>↑ %</Text>
            </Frame>
            <House x={1550} y={820} s={0.3 * pop(f, mg)} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={150}><Text size={60}>Someday, someone must choose:</Text></G2>
            {['Raise taxes', 'Cut spending', 'Keep borrowing'].map((l, i) => (
              <Frame key={l} x={430 + i * 530} y={480} s={pop(f, [rs, ct, kb][i])} w={460} h={300}>
                <Text size={56}>{l}</Text>
              </Frame>
            ))}
            <G2 x={960} y={800} s={pop(f, fl)}><Text size={52} color={C.blue}>We explain. You decide.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 ============
  const recap = ['Most tax money = regular workers', 'Big 4: SS, Medicare, defense, interest', 'We borrow → interest > military'];
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
    const tr = w('c8e', 'trillions');
    const wh = w('c8f', 'who');
    const sb = w('c8g', 'subscribe');
    q(tr, 'stamp', 0.6);
    q(wh, 'boing', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={52} color="#5B6470">NEXT VIDEO</Text></G2>
            <Bank x={760} y={800} s={0.7} label="USA" />
            <G2 x={760} y={260} s={pop(f, tr)}><Text size={110} color={C.red} stroke={C.ink} sw={8}>$38T+ DEBT</Text></G2>
            <G2 x={1450} y={450} s={pop(f, wh)}><Text size={80}>owed to... WHO?</Text></G2>
            <Icon kind="question" x={1450} y={700} s={0.9 * pop(f, wh + 4)} />
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
