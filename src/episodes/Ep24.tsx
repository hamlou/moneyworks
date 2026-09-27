import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, CHAPTER_FRAMES} from '../fx';
import {Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, CreditCard, Frame, Row, SubButton, Bell} from '../props2';
import {Coffee, Plane, Raccoon, Shop} from '../props3';
import {House} from '../props4';
import {Share} from '../props7';
import {Cart, Scale, SlicePie} from '../props8';
import {Escalator, KChart, Scoreboard, Stool, Tag, Towels, TV} from '../props24';
import {Car, Bank} from '../props';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Richie: React.FC<SP> = (p) => <Stick acc={['shades', 'tie']} seed={60} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GREY = '#9AA5B1';

export const Ep24: React.FC = () => {
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
  const lit = (at: number) => ease(f, at, at + 8);
  const val = (at: number, v: string) => (f >= at ? v : '?');
  const grow = (at: number, h: number) => ease(f, at - 3, at + 16, 40, h);
  const pulse = (at: number) => (f >= at && f < at + 20 ? 1 + 0.12 * Math.sin(((f - at) / 20) * Math.PI) : 1);

  // ============ COLD OPEN ============
  {
    const nb = w('o1', 'neighbor');
    const st = w('o1', 'street');
    const nw = w('o1', 'news');
    const gs = w('o1', 'grocery');
    q(2, 'pop', 0.6);
    q(nb, 'pop', 0.5);
    q(st, 'ding', 0.4);
    q(nw, 'ding', 0.4);
    q(gs, 'ding', 0.4);
    const items = ['SAME STREET', 'SAME NEWS', 'SAME STORE'];
    const ats = [st, nw, gs];
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <House x={560} y={760} s={0.55 * pop(f, 0)} color="#DDE3E9" />
          <House x={1360} y={760} s={0.75 * pop(f, 0)} color="#F6E7D2" sold="$$$" />
          <Dave f={f} x={760} y={860} s={1.1} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.8}]} />
          <Richie f={f} x={1120} y={860} s={1.1 * pop(f, 0)} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}, {at: nb, pose: 'wave', expr: 'grin', look: -0.8}]} />
          <G2 x={760} y={500} s={pop(f, 1)}><Tag text="DAVE" color={C.blue} /></G2>
          <G2 x={1120} y={500} s={pop(f, 1)}><Tag text="RICHIE" color={C.green} lit={lit(nb)} /></G2>
          {items.map((it, i) => (
            <G2 key={it} x={480 + i * 480} y={140} s={pop(f, 2) * pulse(ats[i])}><Tag text={it} color={C.ink} lit={lit(ats[i])} /></G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sn = w('o2', 'since');
    const db = w('o2', 'doubled');
    const sx = w('o2', 'sixty');
    const nd = w('o3', 'doesnt');
    const rn = w('o3', 'rent');
    const gr = w('o3', 'groceries');
    const th = w('o3', 'third');
    q(sn, 'pop', 0.5);
    q(db, 'cash', 0.6);
    q(sx, 'ding', 0.6);
    q(nd, 'buzz', 0.4);
    q(rn, 'thud', 0.5);
    q(gr, 'thud', 0.5);
    q(th, 'sting', 0.5);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={960} y1={90} x2={960} y2={880} stroke={C.ink} strokeWidth={6} strokeDasharray="20 18" />
          <Text x={480} y={110} size={52} color={C.blue}>DAVE</Text>
          <Text x={1440} y={110} size={52} color={C.green}>RICHIE</Text>
          <G2 x={960} y={60} s={pop(f, A('o2'))}><Tag text="SINCE 2020" color={C.ink} lit={lit(sn)} /></G2>
          <Richie f={f} x={1150} y={860} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}, {at: db, pose: 'celebrate', expr: 'grin'}]} />
          <G2 x={1560} y={330} s={pop(f, A('o2')) * pulse(db)}><Share s={0.9} n={val(db, '+138%')} owner="STOCKS" /></G2>
          <G2 x={1560} y={760} s={0.5 * pop(f, A('o2') + 2)}><House sold={val(sx, '+59%')} /></G2>
          <Dave f={f} x={260} y={860} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: nd, pose: 'shrug', expr: 'worried'}, {at: th, pose: 'shock', expr: 'shock'}]} />
          <G2 x={620} y={330} s={pop(f, A('o2') + 2)}>
            <rect x={-240} y={-120} width={480} height={240} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-60} size={42}>STOCKS OWNED</Text>
            <Text y={30} size={80} color={f >= nd ? C.red : GREY}>{f >= nd ? '$0' : '?'}</Text>
          </G2>
          <G2 x={620} y={640} s={pop(f, A('o2') + 3)}>
            <rect x={-240} y={-150} width={480} height={300} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-90} size={40} color={lit(rn) > 0.5 ? C.ink : GREY}>RENT</Text>
            <Text y={-30} size={60} color={f >= rn ? C.red : GREY}>{val(rn, '+33%')}</Text>
            <Text y={40} size={40} color={lit(gr) > 0.5 ? C.ink : GREY}>GROCERIES</Text>
            <Text y={100} size={60} color={f >= gr ? C.red : GREY}>{val(gr, '+32%')}</Text>
          </G2>
          <SourceTag f={f} at={db} text="S&P 500, Case-Shiller, BLS CPI · Jan 2020 → 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gt = w('o4', 'great');
    const we2 = w('o4', 'what');
    const rt = w('o5', 'right');
    q(gt, 'ding', 0.6);
    q(we2, 'boing', 0.5);
    q(rt, 'stamp', 0.7);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Richie f={f} x={1400} y={860} s={1.3} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: -0.6}]} />
          <Dave f={f} x={520} y={860} s={1.3} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.6}, {at: we2, pose: 'shrug', expr: 'worried', look: 0.6}]} />
          <G2 x={1300} y={300} s={pop(f, A('o4')) * pulse(gt)}><Bubble text={f >= gt ? 'The economy is GREAT!' : 'The economy is...'} size={44} tail="down" /></G2>
          <G2 x={620} y={300} s={pop(f, A('o4') + 2) * pulse(we2)}><Bubble text={f >= we2 ? 'What economy?' : '...'} size={44} tail="down" /></G2>
          <G2 x={960} y={560} s={pop(f, A('o4') + 3)}>
            <rect x={-150} y={-60} width={300} height={120} rx={24} fill={f >= rt ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={3} size={48}>{f >= rt ? 'BOTH RIGHT' : 'who is right?'}</Text>
          </G2>
          {f >= rt && <Stamp x={960} y={560} s={pop(f, rt, 9, 260)} text="BOTH RIGHT" size={64} color={C.green} r={-6} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'k'), w('o6', 'owns'), w('o6', 'averages'), w('o6', 'climb')];
    pv.forEach((x) => q(x, 'ding', 0.5));
    const cur = pv.filter((x) => f >= x).length;
    const labels = ['The K-shaped economy', 'Who owns what', 'Why averages lie', 'How Dave climbs up'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <KChart x={1380} y={500} s={0.62 * pop(f, A('o6'))} up={cur >= 1 ? 1 : 0.4} down={cur >= 1 ? 1 : 0.4} split={cur === 1 ? 1 : 0} upLabel="RICHIE" downLabel="DAVE" />
          <Text x={500} y={140} size={60}>TODAY</Text>
          {labels.map((l, i) => (
            <Row key={l} x={60} y={280 + i * 150} s={0.8 * pop(f, A('o6') + i)} n={i + 1} text={l} lit={cur === i + 1 ? 1 : cur > i ? 0.7 : 0} color={C.blue} w={900} />
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 The Letter K ============
  {
    const k1 = w('c1a', 'k');
    const lv = w('c1b', 'letters');
    const v = w('c1b', 'v');
    const u = w('c1b', 'u');
    q(k1, 'pop', 0.6);
    q(v, 'ding', 0.5);
    q(u, 'ding', 0.5);
    q(lv, 'pop2', 0.4);
    const cards = [
      {l: 'V', d: 'M -120 -60 L 0 60 L 120 -60', c: C.green, at: v, sub: 'quick crash, quick bounce'},
      {l: 'U', d: 'M -120 -60 Q -110 70 0 60 Q 110 70 120 -60', c: C.blue, at: u, sub: 'slow bounce'},
      {l: 'K', d: 'M -120 -30 L -20 20 L 120 -80 M -20 20 L 120 90', c: C.red, at: k1, sub: '?'},
    ];
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60}>RECOVERY LETTERS</Text>
          {cards.map((c, i) => {
            const on = f >= c.at && (i < 2 ? f < (i === 0 ? u : 1e9) || true : true);
            const L = lit(c.at);
            return (
              <G2 key={c.l} x={400 + i * 560} y={520} s={pop(f, A('c1a') + i) * pulse(c.at)}>
                <Frame w={440} h={460} label={i === 2 && f < v ? '' : c.sub}>
                  <Text y={-130} size={130} color={L > 0.5 && on ? c.c : GREY}>{c.l}</Text>
                  <path d={c.d} transform="translate(0,80)" fill="none" stroke={L > 0.5 ? c.c : GREY} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
                </Frame>
              </G2>
            );
          })}
          <Dave f={f} x={170} y={950} s={0.7} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ap = w('c1c', 'april');
    const on = w('c1c', 'online');
    const k = w('c1c', 'k');
    const at = w('c1c', 'atwater');
    const fm = w('c1c', 'famous');
    q(ap, 'flip', 0.5);
    q(on, 'click', 0.5);
    q(k, 'pop', 0.6);
    q(at, 'pop', 0.5);
    q(fm, 'crowd', 0.4);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={330} y={460} s={pop(f, A('c1c')) * pulse(ap)}><Calendar s={0.9} top={f >= ap ? 'APRIL' : 'MONTH'} year={2020} flip={0} /></G2>
          <G2 x={900} y={440} s={pop(f, A('c1c') + 2) * pulse(on)}>
            <rect x={-230} y={-260} width={460} height={520} rx={40} fill="#1F2A36" stroke={C.ink} strokeWidth={6} />
            <rect x={-200} y={-220} width={400} height={420} rx={16} fill="#fff" />
            <circle cx={-150} cy={-160} r={30} fill={C.blue} />
            <Text x={-100} y={-160} size={30} anchor="start">someone online</Text>
            <Text y={-60} size={36}>{f >= on ? 'new letter?' : '...'}</Text>
            <Text y={60} size={160} color={f >= k ? C.red : GREY}>K</Text>
          </G2>
          <Stick f={f} x={1500} y={860} s={1.15} acc={['glasses']} seed={88} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: at, pose: 'present', expr: 'happy', look: -0.6}]} />
          <G2 x={1500} y={330} s={pop(f, A('c1c') + 3) * pulse(at)}><Tag text={f >= at ? 'PROFESSOR PETER ATWATER' : 'A PROFESSOR'} color={C.navy} lit={lit(at)} /></G2>
          <G2 x={1500} y={420} s={pop(f, A('c1c') + 4)}><Text size={40} color={f >= fm ? C.green : GREY}>made it famous</Text></G2>
          <SourceTag f={f} at={at} text="'IvanTheK' (Apr 2020); popularized by Peter Atwater, W&M" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sp = w('c1d', 'split');
    const up = w('c1e', 'up');
    const own = w('c1e', 'own');
    const dn = w('c1f', 'down');
    const pc = w('c1f', 'paycheck');
    q(sp, 'rip', 0.6);
    q(up, 'boing', 0.5);
    q(own, 'cash', 0.5);
    q(dn, 'trombone', 0.4);
    q(pc, 'paper', 0.5);
    const sh = shake(f, sp, 10);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={sh.x} y={sh.y}>
            <KChart x={820} y={520} s={pop(f, A('c1d'))} split={f >= sp && f < up ? 1 : 0} up={f >= up ? 1 : f >= sp ? 0.6 : 0.3} down={f >= dn ? 1 : f >= sp ? 0.6 : 0.3} upLabel={f >= own ? 'OWNERS: stocks, houses' : 'UP ARM'} downLabel={f >= pc ? 'PAYCHECK + RENT' : 'DOWN ARM'} />
          </G2>
          <Richie f={f} x={1640} y={420} s={0.8} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: up, pose: 'celebrate', expr: 'grin'}]} />
          <Dave f={f} x={1640} y={960} s={0.8} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: dn, pose: 'shrug', expr: 'sad'}]} />
          <G2 x={820} y={130} s={pop(f, A('c1d') + 2)}><Text size={52} color={f >= sp ? C.ink : GREY}>after the crash: it split in two</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const es = w('c1g', 'escalator');
    const up = w('c1g', 'up');
    const rn = w('c1g', 'running');
    const on = w('c1g', 'only');
    q(es, 'pop', 0.5);
    q(up, 'ding', 0.5);
    q(rn, 'step', 0.6);
    q(on, 'sting', 0.5);
    const rp = ease(f, A('c1g'), A('c1g') + 300, 0, 1);
    scene(A('c1g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Escalator x={560} y={620} f={f} dir="up" label="UP ESCALATOR" s={pop(f, A('c1g'))} />
          <Escalator x={1380} y={620} f={f} dir="down" label="DOWN ESCALATOR" s={pop(f, A('c1g') + 2)} />
          <Richie f={f} x={560 - 280 * Math.cos(0.49) + 560 * rp * Math.cos(0.49)} y={600 + 280 * Math.sin(0.49) - 560 * rp * Math.sin(0.49)} s={0.75} keys={[{at: 0, pose: 'relax', expr: 'smug'}]} />
          <Dave f={f} x={1380} y={610} s={0.75} walk keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}, {at: rn, pose: 'idle', expr: 'worried', look: 0.8}]} sweat={f >= rn} />
          <G2 x={960} y={130} s={pop(f, A('c1g') + 3) * pulse(on)}><Text size={52} color={f >= on ? C.red : GREY}>both moving · only one gets anywhere</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 Same Street, Two Economies ============
  {
    const ja = w('c2a', 'january');
    const sp = w('c2b', 'hundred', 1);
    const db = w('c2b', 'doubled');
    const hp = w('c2c', 'fifty');
    const nth = w('c2c', 'nothing');
    const sl = w('c2c', 'slept');
    q(ja, 'flip', 0.5);
    q(sp, 'cash', 0.6);
    q(db, 'ding', 0.5);
    q(hp, 'cash', 0.6);
    q(nth, 'pop', 0.4);
    q(sl, 'boing', 0.4);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, A('c2a'))}><Text size={56}>RICHIE'S SIDE · since {f >= ja ? 'Jan 2020' : '2020'}</Text></G2>
          <Richie f={f} x={330} y={860} s={1.2} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}, {at: sl, pose: 'relax', expr: 'tired', look: 0.8}]} />
          {f >= sl && <G2 x={420} y={420} s={pop(f, sl)}><Text size={60} color={C.blue}>z z z</Text></G2>}
          <line x1={700} y1={860} x2={1780} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <G2 s={pop(f, A('c2a') + 2)}>
            <Bar x={1000} y={860} h={grow(sp, 138 * 4.2)} color={C.green} label="stocks (S&P 500)" value={val(sp, '+138%')} w={280} />
            <Bar x={1480} y={860} h={grow(hp, 59 * 4.2)} color={C.green} label="home prices" value={val(hp, '+59%')} w={280} />
          </G2>
          <G2 x={1480} y={860 - 59 * 4.2 - 150} s={f >= hp ? 0.28 : 0}><House /></G2>
          <SourceTag f={f} at={sp} text="FRED: S&P 500 · Case-Shiller National HPI (Jan 2020 → Jun 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rn = w('c2d', 'rent');
    const gr = w('c2d', 'groceries');
    const wg = w('c2e', 'wages');
    const pl = w('c2f', 'place');
    const eg = w('c2f', 'eggs');
    q(rn, 'thud', 0.5);
    q(gr, 'thud', 0.5);
    q(wg, 'coin', 0.6);
    q(pl, 'step', 0.5);
    q(eg, 'crinkle', 0.5);
    const sh = shake(f, eg, 10);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, A('c2d'))}><Text size={56}>DAVE'S SIDE · since Jan 2020</Text></G2>
          <Dave f={f} x={300} y={860} s={1.2} walk={f >= pl} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.8}, {at: wg, pose: 'celebrate', expr: 'happy'}, {at: pl, pose: 'idle', expr: 'tired', look: 0.8}]} />
          <line x1={640} y1={860} x2={1800} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <G2 x={sh.x} y={sh.y} s={pop(f, A('c2d') + 2)}>
            <Bar x={860} y={860} h={grow(rn, 33 * 4.2)} color={C.red} label="rent" value={val(rn, '+33%')} w={260} />
            <Bar x={1220} y={860} h={grow(gr, 32 * 4.2)} color={C.red} label="groceries" value={val(gr, '+32%')} w={260} />
            <Bar x={1580} y={860} h={grow(wg, 33 * 4.2)} color={C.blue} label="hourly wages" value={val(wg, '+33%')} w={260} />
          </G2>
          <G2 x={1220} y={330} s={pop(f, A('c2d') + 3) * pulse(pl)}><Text size={50} color={f >= pl ? C.red : GREY}>= running in place</Text></G2>
          <SourceTag f={f} at={rn} text="BLS CPI rent & food at home; avg hourly earnings (Jan 2020 → Aug 2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fs = w('c2g', 'faster');
    const hd = w('c2g', 'harder');
    const ow = w('c2g', 'owning');
    q(fs, 'boing', 0.5);
    q(hd, 'buzz', 0.4);
    q(ow, 'stamp', 0.7);
    const data: [string, number, string][] = [['stocks', 138, C.green], ['homes', 59, C.green], ['rent', 33, C.red], ['groceries', 32, C.red], ['wages', 33, C.blue]];
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={200} y1={820} x2={1720} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          {data.map(([l, v, c], i) => (
            <Bar key={l} x={340 + i * 310} y={820} h={v * 4 * (i < 2 ? 1 + 0.06 * lit(fs) : 1)} color={c} label={l} value={`+${v}%`} w={200} />
          ))}
          <G2 x={1300} y={170} s={pop(f, A('c2g')) * pulse(ow)}>
            <rect x={-360} y={-70} width={720} height={140} rx={24} fill={f >= ow ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={3} size={50}>{f >= hd ? 'not working harder: OWNING' : 'why the gap?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 Who owns the stocks ============
  {
    const fr = w('c3b', 'federal');
    const pz = w('c3b', 'pizza');
    q(fr, 'paper', 0.5);
    q(pz, 'pop', 0.6);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={330} y={860} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={400} y={380} s={pop(f, A('c3a'))}><Bubble text={'who owns all\nthose stocks?'} size={42} tail="down" /></G2>
          <G2 x={1200} y={520} s={pop(f, A('c3a') + 2) * pulse(pz)}>
            <SlicePie rad={300} slices={[{v: 1, c: f >= pz ? C.yellow : '#E8E1D2'}]} />
            <Text y={0} size={56} color={C.ink}>ALL U.S. STOCKS</Text>
          </G2>
          <G2 x={1200} y={130} s={pop(f, A('c3a') + 3)}><Tag text="FEDERAL RESERVE · EVERY QUARTER" color={C.navy} lit={lit(fr)} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const t1 = w('c3c', 'fifty');
    const hf = w('c3c', 'half');
    const t9 = w('c3d', 'eighty');
    const zr = w('c3e', 'zero');
    const cr = w('c3e', 'crumbs');
    const rc = w('c3f', 'record');
    const ts = w('c3f', 'slice');
    q(t1, 'stamp', 0.6);
    q(hf, 'ding', 0.4);
    q(t9, 'stamp', 0.6);
    q(zr, 'pop', 0.6);
    q(cr, 'trombone', 0.5);
    q(rc, 'ding', 0.5);
    const step = f >= zr ? 3 : f >= t9 ? 2 : f >= t1 ? 1 : 0;
    const rows: [string, string, string, number][] = [
      ['Top 1%', '50.9%', C.red, t1],
      ['Next 9%', '37.2%', '#F78C6B', t9],
      ['Next 40%', '11.4%', C.blue, t9],
      ['Bottom 50%', '0.6%', GREY, zr],
    ];
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={520} s={pop(f, A('c3c'))}>
            <SlicePie rad={330} pop={step === 1 ? 0 : step === 3 ? 3 : -1} slices={[
              {v: 0.509, c: step >= 1 ? C.red : '#E8E1D2', l: step >= 1 ? '1%' : undefined},
              {v: 0.372, c: step >= 2 ? '#F78C6B' : '#E8E1D2', l: step >= 2 ? '9%' : undefined},
              {v: 0.114, c: step >= 2 ? C.blue : '#E8E1D2'},
              {v: 0.005, c: step >= 3 ? C.ink : '#E8E1D2'},
            ]} />
          </G2>
          {rows.map(([l, v, c, at], i) => (
            <G2 key={l} x={1060} y={230 + i * 140} s={pop(f, A('c3c') + 1 + i)}>
              <rect x={0} y={-55} width={740} height={110} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} opacity={f >= at ? 1 : 0.5} />
              <rect x={20} y={-30} width={60} height={60} rx={12} fill={f >= at ? c : '#D8D0C0'} stroke={C.ink} strokeWidth={4} />
              <Text x={110} y={2} size={46} anchor="start" color={f >= at ? C.ink : GREY}>{l}</Text>
              <Text x={710} y={2} size={54} anchor="end" color={f >= at ? c : GREY}>{f >= at ? v : '?'}</Text>
            </G2>
          ))}
          <G2 x={1430} y={810} s={pop(f, A('c3c') + 5) * pulse(t9)}>
            <rect x={-370} y={-50} width={740} height={100} rx={24} fill={f >= t9 ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={3} size={46}>{f >= t9 ? 'TOP 10% = 88% of stocks' : 'TOP 10% = ?'}</Text>
          </G2>
          <G2 x={560} y={130} s={pop(f, A('c3c') + 2) * pulse(rc)}><Text size={44} color={f >= rc ? C.red : GREY}>{f >= ts ? '"record high" = great news for the top slice' : f >= cr ? 'bottom half: the crumbs' : 'the stock pizza'}</Text></G2>
          <SourceTag f={f} at={t1} text="Federal Reserve, Distributional Financial Accounts, Q2 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ec = w('c3g', 'economy');
    const np = w('c3g', 'nope');
    const sb = w('c3g', 'scoreboard');
    q(ec, 'pop', 0.5);
    q(np, 'buzz', 0.7);
    q(sb, 'ding', 0.5);
    scene(A('c3g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={470} s={pop(f, A('c3g'))}><Scoreboard title="STOCK MARKET" value="7,743" sub="S&P 500 · RECORD" /></G2>
          <G2 x={1400} y={300} s={pop(f, A('c3g') + 2)}>
            <rect x={-320} y={-80} width={640} height={160} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={3} size={52} color={f >= np ? GREY : C.ink}>= THE ECONOMY?</Text>
            {f >= np && <XMark s={0.9 * pop(f, np)} />}
          </G2>
          <G2 x={1400} y={560} s={pop(f, A('c3g') + 3) * pulse(sb)}>
            <rect x={-320} y={-80} width={640} height={160} rx={24} fill={f >= sb ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={-20} size={40} color={f >= sb ? C.ink : GREY}>a scoreboard for</Text>
            <Text y={30} size={40} color={f >= sb ? C.ink : GREY}>people who own stocks</Text>
          </G2>
          <Dave f={f} x={1400} y={960} s={0.75} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: np, pose: 'shock', expr: 'shock'}]} />
          {f >= np && <Stamp x={620} y={820} s={pop(f, np, 9, 260)} text="MYTH" size={60} color={C.red} r={-6} />}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 Wealth effect ============
  {
    const fr = w('c4a', 'rich', 0);
    const sp = w('c4a', 'spends');
    const we1 = w('c4b', 'wealth');
    const sf = w('c4b', 'safer');
    const tc = w('c4c', 'three');
    const tn = w('c4c', 'tiny');
    const tr = w('c4c', 'trillions');
    q(fr, 'pop', 0.4);
    q(sp, 'cash', 0.6);
    q(we1, 'stamp', 0.6);
    q(sf, 'ding', 0.4);
    q(tc, 'coin', 0.6);
    q(tn, 'pop2', 0.4);
    q(tr, 'cash', 0.7);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, A('c4a')) * pulse(we1)}><Text size={64} color={f >= we1 ? C.green : GREY}>THE WEALTH EFFECT</Text></G2>
          <Richie f={f} x={330} y={860} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}, {at: sp, pose: 'carry', expr: 'grin', look: 0.6}]} />
          <G2 x={560} y={820} s={0.8 * pop(f, A('c4a') + 1)}><Cart items={f >= sp ? 10 : 3} /></G2>
          <G2 x={330} y={380} s={pop(f, A('c4a') + 2) * pulse(sf)}><Bubble text={f >= sf ? 'I feel safe. Shopping!' : 'I feel rich...'} size={38} tail="down" /></G2>
          <G2 x={1320} y={480} s={pop(f, A('c4a') + 2)}>
            <rect x={-440} y={-220} width={880} height={440} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-150} size={40}>$1 of new stock wealth</Text>
            <Text y={-80} size={50}>↓</Text>
            <Text y={0} size={90} color={f >= tc ? C.green : GREY}>{f >= tc ? '~3¢' : '?'}</Text>
            <Text y={80} size={36} color="#5B6470">extra spending, every year</Text>
            <Text y={160} size={52} color={f >= tr ? C.red : GREY}>{f >= tr ? '× TRILLIONS = BIG' : f >= tn ? 'tiny...?' : ''}</Text>
          </G2>
          <SourceTag f={f} at={tc} text="Chodorow-Reich, Nguyen & Sraer, AER: Insights (2021)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hf = w('c4d', 'half');
    const rc = w('c4d', 'record');
    const ts = w('c4e', 'thirty');
    const ar = w('c4e', 'argue');
    const cl = w('c4e', 'clear');
    q(hf, 'cash', 0.6);
    q(rc, 'stamp', 0.5);
    q(ts, 'pop', 0.5);
    q(ar, 'buzz', 0.4);
    q(cl, 'ding', 0.5);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, A('c4d'))}><Text size={52}>Share of ALL consumer spending by the top 10% of earners</Text></G2>
          <line x1={320} y1={820} x2={1300} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <G2 s={pop(f, A('c4d') + 1)}>
            <Bar x={560} y={820} h={grow(ts, 36 * 11)} color={C.blue} label="about 30 years ago" value={val(ts, '~36%')} w={280} />
            <Bar x={1060} y={820} h={grow(hf, 49.2 * 11)} color={C.green} label="2025 (record)" value={val(hf, '~49%')} w={280} />
          </G2>
          <G2 x={1600} y={420} s={pop(f, A('c4d') + 2) * pulse(ar)}>
            <rect x={-230} y={-150} width={460} height={300} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-90} size={36} color={f >= ar ? C.ink : GREY}>exact number:</Text>
            <Text y={-40} size={36} color={f >= ar ? C.red : GREY}>debated</Text>
            <Text y={30} size={36} color={f >= cl ? C.ink : GREY}>direction:</Text>
            <Text y={90} size={60} color={f >= cl ? C.green : GREY}>UP ↑</Text>
          </G2>
          <Richie f={f} x={1600} y={950} s={0.7} keys={[{at: 0, pose: 'carry', expr: 'grin', look: -0.6}]} />
          <SourceTag f={f} at={hf} text="Moody's Analytics (M. Zandi): 49.2% Q2 2025; ~45.5% Q1 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wm = w('c4f', 'walmart');
    const hk = w('c4f', 'hundred');
    const dt = w('c4f', 'tree');
    const sx = w('c4f', 'sixty');
    q(wm, 'pop', 0.5);
    q(hk, 'cash', 0.5);
    q(dt, 'pop', 0.5);
    q(sx, 'ding', 0.6);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <G2 x={520} y={800} s={0.9 * pop(f, A('c4f')) * pulse(wm)}><Shop name="WALMART" /></G2>
          <G2 x={1320} y={800} s={0.9 * pop(f, A('c4f') + 2) * pulse(dt)}><Shop name="DOLLAR TREE" /></G2>
          <G2 x={520} y={280} s={pop(f, A('c4f') + 3)}>
            <rect x={-300} y={-70} width={600} height={140} rx={24} fill={f >= hk ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={-22} size={34} color={f >= hk ? C.ink : GREY}>most new customers:</Text>
            <Text y={26} size={40} color={f >= hk ? C.green : GREY}>{val(hk, 'earn $100k+')}</Text>
          </G2>
          <G2 x={1320} y={280} s={pop(f, A('c4f') + 4)}>
            <rect x={-300} y={-70} width={600} height={140} rx={24} fill={f >= sx ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={-22} size={34} color={f >= sx ? C.ink : GREY}>new shoppers earning $100k+:</Text>
            <Text y={26} size={44} color={f >= sx ? C.green : GREY}>{val(sx, '~60%')}</Text>
          </G2>
          <Richie f={f} x={920} y={860} s={1} keys={[{at: 0, pose: 'carry', expr: 'smug', look: -0.8}, {at: dt, pose: 'carry', expr: 'smug', look: 0.8}]} />
          <Dave f={f} x={1740} y={860} s={1} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}]} />
          <SourceTag f={f} at={wm} text="Walmart Q4 FY2026 (Feb 2026); Dollar Tree (late 2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('c4g', 'vacation');
    const pt = w('c4g', 'towels');
    const ds = w('c4g', 'dollar');
    const cc = w('c4g', 'coin');
    q(fv, 'whoosh', 0.5);
    q(pt, 'pop', 0.5);
    q(ds, 'pop', 0.4);
    q(cc, 'coin', 0.7);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={960} y1={90} x2={960} y2={880} stroke={C.ink} strokeWidth={6} strokeDasharray="20 18" />
          <Richie f={f} x={300} y={860} s={1.1} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
          <G2 x={660} y={300} s={pop(f, A('c4g')) * pulse(fv)} r={-10}><Plane s={1.4} /></G2>
          <G2 x={660} y={460} s={pop(f, A('c4g'))}><Text size={40} color={f >= fv ? C.green : GREY}>fancy vacation</Text></G2>
          <G2 x={680} y={800} s={pop(f, A('c4g') + 1) * pulse(pt)}><Towels /></G2>
          <G2 x={680} y={600} s={pop(f, A('c4g') + 1)}><Text size={40} color={f >= pt ? C.blue : GREY}>+ bargain paper towels</Text></G2>
          <Dave f={f} x={1300} y={860} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.8}, {at: cc, pose: 'hold', expr: 'worried', look: 0.8}]} />
          <G2 x={1620} y={620} s={pop(f, A('c4g') + 2)}>
            {[0, 1, 2, 3, 4].map((i) => <Coin key={i} x={(i % 3) * 70 - 70} y={-Math.floor(i / 3) * 70} s={0.6 * (f >= cc ? 1 + 0.1 * Math.sin((f - i * 4) / 3) : 1)} />)}
          </G2>
          <G2 x={1440} y={300} s={pop(f, A('c4g') + 2)}><Text size={44} color={f >= cc ? C.red : GREY}>counting every coin</Text></G2>
          <G2 x={1440} y={200} s={pop(f, A('c4g') + 2)}><Text size={36} color={f >= ds ? C.ink : GREY}>already at the dollar store</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 Bottom arm ============
  {
    const ar = w('c5a', 'arm');
    const br = w('c5b', 'borrow');
    const tr = w('c5b', 'trillion');
    q(ar, 'trombone', 0.4);
    q(br, 'paper', 0.5);
    q(tr, 'cash', 0.7);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <KChart x={500} y={440} s={0.55 * pop(f, A('c5a'))} up={0.3} down={f >= ar ? 1 : 0.6} downLabel="DAVE" upLabel="RICHIE" />
          <Dave f={f} x={500} y={960} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'worried'}, {at: br, pose: 'hold', expr: 'worried'}]} />
          <G2 x={1320} y={380} s={pop(f, A('c5a') + 2) * pulse(br)} r={-6}><CreditCard s={1.6} /></G2>
          <G2 x={1320} y={720} s={pop(f, A('c5a') + 3) * pulse(tr)}>
            <rect x={-420} y={-90} width={840} height={180} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-40} size={36} color="#5B6470">U.S. credit card debt</Text>
            <Text y={30} size={72} color={f >= tr ? C.red : GREY}>{val(tr, '$1.26 TRILLION')}</Text>
          </G2>
          <SourceTag f={f} at={tr} text="NY Fed Household Debt & Credit, Q2 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('c5c', 'seven');
    const nn = w('c5c', 'ninety');
    const cl = w('c5d', 'car');
    const th = w('c5d', 'three');
    const hi = w('c5d', 'highest');
    q(sv, 'stamp', 0.6);
    q(nn, 'tick', 0.6);
    q(cl, 'pop', 0.5);
    q(th, 'stamp', 0.6);
    q(hi, 'sting', 0.5);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={pop(f, A('c5c'))}><Text size={52}>Sliding into serious delinquency (90+ days late)</Text></G2>
          <line x1={260} y1={820} x2={1200} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <G2 s={pop(f, A('c5c') + 1)}>
            <Bar x={480} y={820} h={grow(sv, 6.97 * 70)} color={C.red} label="credit card balances" value={val(sv, '6.97%')} w={280} />
            <Bar x={960} y={820} h={grow(th, 3.0 * 70)} color={C.red} label="car loans" value={val(th, '3.0%')} w={280} />
          </G2>
          <G2 x={960} y={820 - 3 * 70 - 170} s={0.5 * pop(f, A('c5c') + 2) * pulse(cl)}><Car /></G2>
          <G2 x={1540} y={380} s={pop(f, A('c5c') + 2) * pulse(nn)}><Calendar s={0.8} top="LATE" year={f >= nn ? '90+ days' : '? days'} flip={0} /></G2>
          <G2 x={1540} y={700} s={pop(f, A('c5c') + 3) * pulse(hi)}>
            <rect x={-260} y={-70} width={520} height={140} rx={24} fill={f >= hi ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={-20} size={36} color={f >= hi ? C.ink : GREY}>car loans:</Text>
            <Text y={28} size={40} color={f >= hi ? C.red : GREY}>highest since 2010</Text>
          </G2>
          <SourceTag f={f} at={sv} text="NY Fed Household Debt & Credit Report, Q2 2026 (annualized)" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rc = w('c5e', 'raccoon');
    const ii = w('c5e', 'interest');
    const pl = w('c5e', 'pulls');
    const sl = w('c5f', 'sleeps');
    const op = w('c5f', 'opposite');
    q(rc, 'pop', 0.6);
    q(ii, 'coin', 0.6);
    q(pl, 'trombone', 0.4);
    q(sl, 'cash', 0.5);
    q(op, 'sting', 0.5);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <line x1={960} y1={90} x2={960} y2={880} stroke={C.ink} strokeWidth={6} strokeDasharray="20 18" />
          <Dave f={f} x={300} y={860} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'worried', look: 0.8}]} sweat={f >= ii} />
          <Raccoon f={f} x={660} y={740} s={1.1 * pop(f, A('c5e')) * pulse(rc)} mood="greedy" grab={f >= ii ? 1 : 0} holdCoin />
          <G2 x={560} y={300} s={pop(f, A('c5e') + 2)}><Text size={44} color={f >= ii ? C.red : GREY}>interest on interest</Text></G2>
          <G2 x={560} y={380} s={pop(f, A('c5e') + 2)}><Text size={60} color={f >= pl ? C.red : GREY}>↓ ↓ ↓</Text></G2>
          <Richie f={f} x={1360} y={860} s={1.1} keys={[{at: 0, pose: 'relax', expr: 'tired', look: 0.8}]} />
          <G2 x={1660} y={820} s={pop(f, A('c5e') + 3)}><MoneyStack n={f >= sl ? 8 : 4} s={0.9} label="grows" /></G2>
          <G2 x={1440} y={420} s={pop(f, A('c5e') + 3)}><Text size={56} color={C.blue}>z z z</Text></G2>
          <G2 x={1440} y={300} s={pop(f, A('c5e') + 3)}><Text size={44} color={f >= sl ? C.green : GREY}>money earns money</Text></G2>
          <G2 x={960} y={160} s={pop(f, A('c5e') + 4) * pulse(op)}><Tag text="SAME ECONOMY · OPPOSITE DIRECTIONS" color={C.ink} lit={lit(op)} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 Average trap ============
  {
    const tv = w('c6a', 'tv');
    const gr = w('c6a', 'great');
    const hw = w('c6a', 'how');
    q(tv, 'click', 0.5);
    q(gr, 'ding', 0.5);
    q(hw, 'boing', 0.4);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <G2 x={1150} y={460} s={pop(f, A('c6a')) * pulse(tv)}><TV lines={['THE AVERAGE AMERICAN:', f >= gr ? 'DOING GREAT!' : 'DOING ...']} /></G2>
          <Dave f={f} x={380} y={880} s={1.25} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}, {at: hw, pose: 'shrug', expr: 'worried', look: 0.8}]} />
          <G2 x={440} y={390} s={pop(f, A('c6a') + 2)}><Bubble text={f >= hw ? 'How?!' : '...'} size={48} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tn = w('c6b', 'ten');
    const hk = w('c6b', 'hundred');
    const av = w('c6b', 'average');
    const bg = w('c6c', 'gates');
    const bl = w('c6c', 'billions');
    const no = w('c6d', 'no');
    const ld = w('c6d', 'lied');
    q(tn, 'pop', 0.5);
    q(hk, 'coin', 0.5);
    q(av, 'ding', 0.5);
    q(bg, 'step', 0.7);
    q(bl, 'cash', 0.8);
    q(no, 'buzz', 0.5);
    q(ld, 'trombone', 0.6);
    const gx = f < bg ? 1800 : ease(f, bg, bg + 30, 1800, 1560);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <rect x={120} y={620} width={1320} height={60} rx={10} fill={C.wood} stroke={C.ink} strokeWidth={6} />
          {Array.from({length: 10}).map((_, i) => (
            <g key={i}>
              <Stool x={200 + i * 125} y={900} s={0.9} />
              <Stick f={f} x={200 + i * 125} y={800} s={0.55} acc={i === 3 ? ['hair'] : i % 3 === 0 ? ['cap'] : i % 3 === 1 ? ['ponytail'] : []} seed={i === 3 ? 7 : 100 + i} keys={[{at: 0, pose: 'idle', expr: f >= ld ? 'suspicious' : 'happy', look: 0.3}]} />
              <G2 x={200 + i * 125} y={520} s={pop(f, A('c6b') + i % 4) * pulse(hk + i)}><Text size={28} color={f >= hk ? C.green : GREY}>$100k</Text></G2>
            </g>
          ))}
          <rect x={1600} y={380} width={200} height={500} rx={8} fill="#8C5A33" stroke={C.ink} strokeWidth={6} />
          <Stick f={f} x={gx} y={860} s={0.95} acc={['glasses']} seed={90} walk={f >= bg && f < bg + 30} keys={[{at: 0, pose: 'wave', expr: 'grin', look: -0.8}]} opacity={f >= bg ? 1 : 0.35} />
          <G2 x={gx} y={500} s={pop(f, A('c6b') + 3)}><Tag text={f >= bg ? 'BILL GATES' : 'the door'} color={C.navy} lit={lit(bg)} /></G2>
          <G2 x={780} y={250} s={pop(f, A('c6b') + 2) * pulse(av) * pulse(bl)}>
            <rect x={-420} y={-100} width={840} height={200} rx={24} fill={f >= bl ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={-45} size={40}>AVERAGE WEALTH IN THE BAR</Text>
            <Text y={30} size={80} color={f >= bl ? C.red : f >= av ? C.green : GREY}>{f >= bl ? 'BILLIONS' : f >= av ? '$100,000' : '?'}</Text>
          </G2>
          <G2 x={780} y={420} s={pop(f, A('c6b') + 3)}><Text size={40} color={f >= no ? C.red : GREY}>{f >= ld ? 'the average LIED' : f >= no ? 'anyone richer? NO' : 'anyone richer?'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const md = w('c6e', 'median');
    const mid = w('c6e', 'middle');
    const cm = w('c6e', 'middle', 1);
    const wh = w('c6f', 'who');
    const hd = w('c6f', 'hides');
    q(md, 'stamp', 0.6);
    q(mid, 'ding', 0.5);
    q(cm, 'thud', 0.5);
    q(wh, 'boing', 0.5);
    q(hd, 'pop', 0.5);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={120} s={pop(f, A('c6e')) * pulse(md)}><Text size={64} color={f >= md ? C.blue : GREY}>AVERAGE vs MEDIAN</Text></G2>
          {Array.from({length: 11}).map((_, i) => (
            <g key={i}>
              {i === 5 && <rect x={200 + i * 150 - 70} y={390} width={140} height={400} rx={20} fill={f >= mid ? C.yellow : '#F1EADC'} stroke={C.ink} strokeWidth={4} />}
              <Stick f={f} x={200 + i * 150} y={720} s={i === 10 ? 0.8 : 0.6} acc={i === 10 ? ['glasses'] : i === 5 ? ['hair'] : []} seed={i === 10 ? 90 : i === 5 ? 7 : 120 + i} keys={[{at: 0, pose: i === 10 ? 'wave' : 'idle', expr: 'happy'}]} />
              <G2 x={200 + i * 150} y={800} s={pop(f, A('c6e') + 1)}><Text size={24} color="#5B6470">{i === 10 ? '$100B+' : '$100k'}</Text></G2>
            </g>
          ))}
          <G2 x={950} y={330} s={pop(f, A('c6e') + 2)}><Tag text={f >= mid ? 'MEDIAN: $100,000' : 'THE MIDDLE PERSON'} color={C.blue} lit={lit(mid)} /></G2>
          <G2 x={1700} y={330} s={pop(f, A('c6e') + 2) * pulse(cm)}><Tag text={f >= cm ? "CAN'T MOVE IT" : 'BILL'} color={C.red} lit={lit(cm)} /></G2>
          <G2 x={960} y={920} s={pop(f, A('c6e') + 3) * pulse(wh)}><Text size={50} color={f >= wh ? C.red : GREY}>{f >= hd ? 'a K hides inside averages' : 'great... for WHO?'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 Both sides ============
  {
    const d1 = w('c7b', 'one');
    const ln = w('c7b', 'leans');
    const fl = w('c7b', 'fall');
    const hm = w('c7c', 'homes');
    const d2 = w('c7d', 'other');
    const rt = w('c7d', 'retirement');
    const gw = w('c7e', 'growth');
    q(A('c7a') + 2, 'pop', 0.5);
    q(d1, 'ding', 0.5);
    q(ln, 'thud', 0.5);
    q(fl, 'thud', 0.4);
    q(hm, 'pop', 0.5);
    q(d2, 'ding', 0.5);
    q(rt, 'pop', 0.5);
    q(gw, 'pop', 0.5);
    const tilt = f < d2 ? ease(f, d1, d1 + 20, 0, -9) : ease(f, d2, d2 + 30, -9, 9);
    const rows: [string, number, string][] = [
      ['economy leans on one arm', ln, C.red],
      ['build homes · raise pay · taxes', hm, C.red],
      ['markets help 401(k)s & homes', rt, C.blue],
      ['lower costs · more growth', gw, C.blue],
    ];
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Scale x={960} y={560} s={0.9 * pop(f, A('c7a'))} tilt={tilt} left="a problem" right="mostly fine" />
          {rows.map(([l, at, c], i) => (
            <G2 key={l} x={i < 2 ? 380 : 1540} y={700 + (i % 2) * 120} s={pop(f, A('c7a') + 1 + i) * pulse(at)}>
              <rect x={-330} y={-45} width={660} height={90} rx={20} fill="#fff" stroke={C.ink} strokeWidth={5} opacity={f >= at ? 1 : 0.5} />
              <Text y={2} size={32} color={f >= at ? c : GREY}>{l}</Text>
            </G2>
          ))}
          <G2 x={380} y={150} s={pop(f, A('c7a') + 2)}><Tag text="SIDE ONE" color={C.red} lit={lit(d1)} /></G2>
          <G2 x={1540} y={150} s={pop(f, A('c7a') + 2)}><Tag text="SIDE TWO" color={C.blue} lit={lit(d2)} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pol = w('c7f', 'political');
    const nm = w('c7f', 'numbers');
    q(pol, 'stamp', 0.6);
    q(nm, 'ding', 0.5);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={330} s={pop(f, A('c7f')) * pulse(pol)}>
            <rect x={-520} y={-90} width={1040} height={180} rx={30} fill={f >= pol ? C.blue : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={3} size={64} color={f >= pol ? '#fff' : GREY}>A POLITICAL QUESTION</Text>
          </G2>
          <G2 x={960} y={560} s={pop(f, A('c7f') + 2)}><Text size={52} color={f >= nm ? C.ink : GREY}>now you know the numbers</Text></G2>
          <Dave f={f} x={600} y={940} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: nm, pose: 'thumbs', expr: 'grin'}]} />
          <Richie f={f} x={1320} y={940} s={0.9} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 Climb ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const fr = w('c8d', 'fire');
    q(fr, 'poof', 0.5);
    const cur = hs.filter((x) => f >= x).length;
    const items = ['Own a piece: index fund / 401(k) match', 'Grow the paycheck: skills', 'Fire the raccoon: kill card debt', 'Small emergency fund'];
    const dp = ease(f, hs[0], hs[3] + 60, 0, 0.85);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={110} s={pop(f, A('c8a'))}><Text size={56}>How Dave climbs the K</Text></G2>
          <G2 x={620} y={180} s={pop(f, A('c8a'))}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => (
            <Row key={i} x={60} y={310 + i * 150} s={0.85 * pop(f, A('c8a') + 1 + i)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i ? 0.7 : 0} color={C.green} w={1060} />
          ))}
          <Escalator x={1520} y={620} f={f} dir="up" label="UP ARM" len={560} s={pop(f, A('c8a') + 2)} />
          <Dave f={f} x={1520 - 210 * Math.cos(0.49) + 420 * dp * Math.cos(0.49)} y={600 + 210 * Math.sin(0.49) - 420 * dp * Math.sin(0.49)} s={0.7} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: hs[0], pose: 'celebrate', expr: 'happy'}]} />
          {cur === 3 && <Raccoon f={f} x={1760} y={880} s={0.6} mood="sneaky" />}
          {cur === 3 && f >= fr && <XMark x={1760} y={860} s={0.6 * pop(f, fr)} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ov = w('c8f', 'overnight');
    const bt = w('c8f', 'beat');
    const sm = w('c8f', 'same');
    q(ov, 'pop', 0.4);
    q(bt, 'buzz', 0.4);
    q(sm, 'chime', 0.6);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Escalator x={960} y={640} f={f} dir="up" label="SAME ESCALATOR" len={1000} s={pop(f, A('c8f'))} />
          <Dave f={f} x={960 - 280 * Math.cos(0.49)} y={620 + 280 * Math.sin(0.49)} s={0.8} keys={[{at: 0, pose: 'relax', expr: 'happy'}, {at: sm, pose: 'celebrate', expr: 'grin'}]} />
          <Richie f={f} x={960 + 300 * Math.cos(0.49)} y={620 - 300 * Math.sin(0.49)} s={0.8} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: -0.8}]} />
          <G2 x={960} y={140} s={pop(f, A('c8f') + 2) * pulse(sm)}><Text size={52} color={f >= sm ? C.green : GREY}>{f >= bt ? 'goal: the same escalator' : 'catch Richie overnight?'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 Recap ============
  {
    const r = [bs('c9b'), bs('c9c'), bs('c9d')];
    q(A('c9a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const cur = r.filter((x) => f >= x).length;
    const recap = ['Since 2020: owners rode the up arm', 'Top 10%: 88% of stocks · ~half of spending', 'Own a little · grow pay · fire the raccoon'];
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={pop(f, A('c9a'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={230} y={360 + i * 170} s={pop(f, A('c9a') + 1 + i)} n={i + 1} text={b} lit={cur === i + 1 ? 1 : cur > i ? 0.7 : 0} color={C.blue} w={1460} />)}
          <Dave f={f} x={130} y={980} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cf = w('c9e', 'coffee');
    const bk = w('c9e', 'bank');
    const bl = w('c9e', 'billions');
    const sb = w('c9f', 'subscribe');
    q(cf, 'pop', 0.6);
    q(bk, 'sting', 0.6);
    q(bl, 'cash', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, A('c9e'))}><Text size={56}>Next: is Starbucks secretly a bank?</Text></G2>
            <G2 x={760} y={640} s={1.8 * pop(f, A('c9e') + 1) * pulse(cf)}><Coffee f={f} /></G2>
            <G2 x={1360} y={860} s={0.55 * pop(f, A('c9e') + 2) * pulse(bk)}><Bank label="BANK?" /></G2>
            <G2 x={1360} y={330} s={pop(f, A('c9e') + 2)}><Text size={48} color={f >= bl ? C.red : GREY}>{f >= bl ? 'billions of YOUR money' : 'holding... ?'}</Text></G2>
            <Dave f={f} x={330} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: bk, pose: 'shock', expr: 'shock'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 6)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Richie f={f} x={1550} y={860} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: -0.6}]} />
            <G2 x={960} y={680} s={pop(f, sb - 6)}><Text size={44}>costs Richie and Dave the same: $0</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3e', 'crumbs') + 20;
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
