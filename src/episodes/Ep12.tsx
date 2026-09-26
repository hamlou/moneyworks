import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bill, Bubble, Calendar, Coin, MoneyStack, Sparkle, SourceTag, Stamp, Text} from '../props';
import {Bar, Frame, Row, SubButton, Bell} from '../props2';
import {PriceTag} from '../props3';
import {Cat, Globe} from '../props4';
import {Factory} from '../props7';
import {Bottle, Cart, Chicken, HotDog, MemberCard, Pallet, Receipt, Soda, Warehouse} from '../props8';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Sol: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={90} {...p} />;
const Jim: React.FC<SP> = (p) => <Stick acc={['tie']} seed={91} {...p} />;
const Clerk: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Aisle: React.FC = () => (
  <AbsoluteFill style={{background: '#E9ECEF'}}>
    <Svg>
      <rect x={0} y={820} width={1920} height={260} fill="#C9CED6" />
      {[0, 1].map((side) => (
        <g key={side} transform={`translate(${side ? 1500 : 0},0)`}>
          {[200, 400, 600].map((y) => <rect key={y} x={20} y={y} width={400} height={16} fill="#F28C28" stroke={C.ink} strokeWidth={4} />)}
          <rect x={20} y={120} width={16} height={700} fill="#1D4E9E" />
          <rect x={404} y={120} width={16} height={700} fill="#1D4E9E" />
          {[120, 320, 520].map((y, r) => [0, 1, 2].map((c) => <rect key={`${y}${c}`} x={50 + c * 120} y={y + 10} width={100} height={70} fill={['#F4D6B8', '#B8E0FF', '#C8F5D8'][(r + c + side) % 3]} stroke={C.ink} strokeWidth={3} />))}
        </g>
      ))}
    </Svg>
  </AbsoluteFill>
);

export const Ep12: React.FC = () => {
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
    const od = w('o1', 'one');
    const ne = w('o2', 'nineteen');
    const fy = w('o2', 'forty');
    const ch = w('o3', 'cheap');
    const eb = w('o3', 'eight');
    const lk = w('o4', 'look');
    const hf = w('o4', 'half');
    const sh = w('o4', 'shelves');
    const cd = w('o5', 'card');
    const wi = w('o5', 'walked');
    q(2, 'pop', 0.6);
    q(od, 'cash', 0.5);
    q(ne, 'dream', 0.4);
    q(fy, 'stamp', 0.6);
    q(eb, 'cash', 0.6);
    q(lk, 'pop', 0.6);
    q(hf, 'ding', 0.6);
    q(cd, 'sting', 0.6);
    q(wi, 'step', 0.5);
    scene(0, () =>
      f < lk - 2 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.25} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.8}, {at: ch, pose: 'celebrate', expr: 'grin'}]} handItem={<HotDog s={0.35} y={-10} />} />
            <G2 x={1000} y={480} s={pop(f, 2)}><HotDog s={1.4} /></G2>
            <G2 x={1320} y={500} s={pop(f, 8)}><Soda s={1.1} /></G2>
            <G2 x={1150} y={250} s={pop(f, od)}><PriceTag text="$1.50" s={1.5} color={C.yellow} /></G2>
            {f >= ne && (
              <G2 x={1150} y={780} s={pop(f, ne)}>
                <Calendar x={-220} s={0.6} top="SINCE" year={1985} flip={0} />
                <Text x={120} size={60} color={C.red}>{f >= fy ? '40 years' : ''}</Text>
              </G2>
            )}
            {f >= eb && <G2 x={1600} y={200} s={pop(f, eb)}><Text size={100} color={C.green} stroke={C.ink} sw={8}>$8B</Text><Text y={80} size={36}>profit last year</Text></G2>}
            <SourceTag f={f} at={eb} text="Costco 10-K FY2025: net income ≈ $8.1B" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={480} s={pop(f, lk - 2)}>
              <circle r={280} fill="#fff" stroke={C.ink} strokeWidth={8} />
              <path d={`M 0 0 L 0 -280 A 280 280 0 0 1 ${Math.sin(Math.PI * ease(f, hf, hf + 18)) * 280} ${-Math.cos(Math.PI * ease(f, hf, hf + 18)) * 280} Z`} fill={C.green} stroke={C.ink} strokeWidth={6} />
              <Text y={360} size={44}>operating profit</Text>
            </G2>
            <G2 x={1350} y={260} s={pop(f, sh)}><Text size={56} color={C.red}>not from the shelves</Text></G2>
            <MemberCard x={1350} y={560} s={1.1 * pop(f, cd)} r={-6} />
            <G2 x={1350} y={860} s={pop(f, wi)}><Text size={44}>paid before walking in</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'money'), w('o6', 'profit'), w('o6', 'tricks')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['How Costco earns', 'Why so cheap', 'The tricks'].map((l, i) => (
            <Frame key={l} x={380 + i * 580} y={500} s={pop(f, pv[i] - 2)} w={500} h={420} label={l}>
              {i === 0 && <MemberCard s={0.7} y={-40} />}
              {i === 1 && <HotDog s={1} y={-40} />}
              {i === 2 && <Chicken s={0.9} y={-20} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 card at door ============
  {
    const ck = w('c1a', 'checks');
    const sf = w('c1b', 'sixty');
    const ex = w('c1b', 'executive');
    const ei = w('c1c', 'eighty');
    const fv = w('c1c', 'five');
    const pp = w('c1d', 'pure');
    const hd = w('c1d', 'hot');
    const cl = w('c1e', 'club');
    const dr = w('c1e', 'door');
    const nn = w('c1f', 'nine');
    q(ck, 'pop', 0.6);
    q(sf, 'pop', 0.6);
    q(ex, 'pop', 0.6);
    q(ei, 'pop2', 0.5);
    q(fv, 'cash', 0.7);
    q(pp, 'ding', 0.6);
    q(cl, 'pop', 0.5);
    q(dr, 'coin', 0.6);
    q(nn, 'ding', 0.6);
    const people = Math.min(40, Math.floor(lin(f, ei, ei + 30, 0, 40)));
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Warehouse x={1150} y={822} s={0.8} name="COSTCO" />
            <Clerk f={f} x={840} y={822} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.6}, {at: ck, pose: 'point_l', expr: 'suspicious', look: -0.8}]} />
            <Dave f={f} x={420} y={822} s={1} walk={f < ck} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: ck, pose: 'hold', expr: 'grin', look: 0.6}]} />
            <G2 x={560} y={260} s={pop(f, sf)}><MemberCard s={0.8} /></G2>
            <G2 x={1350} y={260} s={pop(f, ex)}><MemberCard s={0.8} tier="EXECUTIVE" price="$130/yr" color={C.ink} /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={140}><Text size={52}>~81 million paid members</Text></G2>
            {Array.from({length: people}).map((_, i) => (
              <Stick key={i} f={f} x={140 + (i % 10) * 76} y={330 + Math.floor(i / 10) * 150} s={0.3} acc={i % 3 === 0 ? ['hair'] : i % 3 === 1 ? ['ponytail'] : ['cap']} seed={200 + i} keys={[{at: 0, pose: 'idle', expr: 'happy'}]} />
            ))}
            <G2 x={1400} y={420} s={pop(f, fv)}><Text size={140} color={C.green} stroke={C.ink} sw={10}>$5.3B</Text><Text y={110} size={40}>membership fees, 1 year</Text></G2>
            {f >= pp && (
              <G2 x={1400} y={800} s={pop(f, pp)}>
                <Stamp text="~PURE PROFIT" size={54} color={C.green} r={-4} />
              </G2>
            )}
            {f >= hd && <G2 x={700} y={930} s={pop(f, hd)}><Text size={36} color="#5B6470">no hot dogs · no trucks · just a card</Text></G2>}
            <SourceTag f={f} at={fv} text="Costco 10-K FY2025: membership fees $5.32B" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <rect x={1250} y={250} width={300} height={570} fill="#5B4636" stroke={C.ink} strokeWidth={7} />
            <G2 x={1400} y={200} s={pop(f, cl)}><Text size={52}>THE CLUB</Text></G2>
            <Stick f={f} x={1120} y={822} s={1.25} acc={['shades']} seed={300} keys={[{at: 0, pose: 'hips', expr: 'neutral'}]} />
            <G2 x={1120} y={380} s={pop(f, dr)}><PriceTag text="$65" s={1.1} color={C.green} /></G2>
            <Dave f={f} x={600} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'grin', look: 0.8}]} handItem={<Coin s={0.4} y={-10} />} />
            {f >= nn && (
              <G2 x={560} y={260} s={pop(f, nn)}>
                <rect x={-280} y={-90} width={560} height={180} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
                <Text y={-24} size={80} color={C.green}>9 in 10</Text>
                <Text y={50} size={34}>renew every year (US & Canada)</Text>
              </G2>
            )}
            <SourceTag f={f} at={nn} text="Costco FY2025: renewal rate 92.3% (US & Canada)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ HISTORY ============
  {
    const sd = w('h2', 'sol');
    const sd2 = w('h2', 'diego');
    const sb = w('h2', 'businesses');
    const bk = w('h3', 'bulk');
    const lw = w('h3', 'low');
    const fe = w('h3', 'fee');
    const jm = w('h4', 'jim');
    const se = w('h4', 'seattle');
    const cs = w('h4', 'costco');
    const tn = w('h5', 'ten');
    const bs2 = w('h5', 'boss');
    const nh = w('h6', 'nine');
    q(sd, 'dream', 0.4);
    q(sd2, 'pop', 0.5);
    [bk, lw, fe].forEach((x) => q(x, 'ding', 0.5));
    q(jm, 'pop', 0.5);
    q(cs, 'stamp', 0.6);
    q(tn, 'heart', 0.5);
    q(bs2, 'ding', 0.5);
    for (let i = 0; i < 8; i++) q(nh + i * 4, 'pop2', 0.3);
    scene(A('h1'), () =>
      f < A('h6') ? (
        <AbsoluteFill>
          <AbsoluteFill style={{filter: 'sepia(0.45)'}}>
            <Board />
            <Svg>
              {f < A('h4') ? (
                <g>
                  <Calendar x={240} y={240} s={0.75 * pop(f, A('h1'))} top="YEAR" year={f >= sd ? 1976 : '???'} flip={0} />
                  <Sol f={f} x={330} y={880} s={1.1 * pop(f, sd - 4)} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
                  <Warehouse x={1150} y={760} s={0.8 * pop(f, sd2)} name="PRICE CLUB" />
                  <G2 x={1150} y={180} s={pop(f, sb)}><Text size={44}>San Diego · businesses only at first</Text></G2>
                  {[[bk, 'BULK'], [lw, 'LOW PRICES'], [fe, 'FEE TO ENTER']].map(([at, l], i) => (
                    <G2 key={l as string} x={800 + i * 330} y={300} s={pop(f, at as number)}>
                      <rect x={-150} y={-45} width={300} height={90} rx={45} fill={[C.blue, C.green, C.red][i]} stroke={C.ink} strokeWidth={5} />
                      <Text size={34} color="#fff">{l as string}</Text>
                    </G2>
                  ))}
                </g>
              ) : (
                <g>
                  <Calendar x={240} y={240} s={0.75} top="YEAR" year={f >= tn ? 1993 : 1983} flip={0} />
                  <Jim f={f} x={420} y={880} s={1.1 * pop(f, jm - 4)} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}, {at: tn, pose: 'celebrate', expr: 'grin'}]} />
                  <Warehouse x={1200} y={760} s={0.8 * pop(f, cs)} name={f >= tn ? 'PRICE CLUB + COSTCO' : 'COSTCO'} />
                  <G2 x={1200} y={180} s={pop(f, se)}><Text size={48}>Seattle, 1983</Text></G2>
                  {f >= bs2 && <G2 x={560} y={420} s={pop(f, bs2)}><Bubble text="The student became the boss" size={40} tail="down" /></G2>}
                </g>
              )}
            </Svg>
          </AbsoluteFill>
          <OldFilm f={f} o={0.5} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Globe x={560} y={540} s={1.4} f={f} />
            <G2 x={1350} y={300} s={pop(f, nh)}><Text size={120} color={C.green} stroke={C.ink} sw={8}>900+</Text><Text y={100} size={44}>warehouses worldwide</Text></G2>
            {['USA', 'CANADA', 'JAPAN', 'KOREA', 'AUSTRALIA', 'SPAIN'].map((c, i) => (
              <G2 key={c} x={1100 + (i % 3) * 260} y={640 + Math.floor(i / 3) * 110} s={pop(f, nh + 10 + i * 4)}>
                <rect x={-115} y={-40} width={230} height={80} rx={40} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <Text size={32}>{c}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 almost no profit ============
  {
    const hd = w('c2b', 'hundred');
    const el = w('c2b', 'eleven');
    const wk = w('c2c', 'workers');
    const tn = w('c2c', 'tiny');
    const mk = w('c2d', 'markups');
    const lw = w('c2d', 'low');
    const hdg = w('c2e', 'hot');
    const kl = w('c2e', 'kill');
    const fg = w('c2f', 'figure');
    const fc = w('c2f', 'factory');
    q(hd, 'cash', 0.5);
    q(el, 'ding', 0.6);
    q(wk, 'pop', 0.4);
    q(tn, 'trombone', 0.4);
    q(mk, 'pop', 0.5);
    q(lw, 'ding', 0.5);
    q(kl, 'boing', 0.6);
    q(fg, 'pop', 0.5);
    q(fc, 'clank', 0.6);
    const eleven = f >= el ? 11 : 0;
    const left = f >= tn ? 2.5 : f >= wk ? 6 : eleven;
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={56}>Out of Dave's $100...</Text></G2>
            <G2 x={500} y={520} s={pop(f, A('c2a'))}>
              <rect x={-300} y={-300} width={600} height={600} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              {Array.from({length: 100}).map((_, i) => (
                <rect key={i} x={-270 + (i % 10) * 54} y={-270 + Math.floor(i / 10) * 54} width={46} height={46} rx={6} fill={i >= 100 - left ? C.green : i >= 89 && f >= el ? '#FFD166' : '#D3DEE3'} stroke={C.ink} strokeWidth={2} />
              ))}
            </G2>
            <G2 x={1300} y={330} s={pop(f, hd)}><Text size={48}>$89 → pays for the products</Text></G2>
            <G2 x={1300} y={450} s={pop(f, el)}><Text size={60} color="#C9A21E">~$11 left</Text></G2>
            <G2 x={1300} y={570} s={pop(f, wk)}><Text size={40}>minus workers, rent, power, trucks</Text></G2>
            <G2 x={1300} y={690} s={pop(f, tn)}><Text size={60} color={C.green}>= tiny</Text></G2>
            <G2 x={1300} y={850} s={pop(f, mk)}><Text size={40} color="#5B6470">{f >= lw ? 'Costco keeps markups LOW on purpose' : 'many stores: bigger markups'}</Text></G2>
            <SourceTag f={f} at={el} text="Costco FY2025: gross margin ≈ 11% of sales" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Stick f={f} x={500} y={860} s={1.1} acc={['glasses', 'tie']} seed={92} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}, {at: kl, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={500} y={450} s={pop(f, A('c2e') + 4)}><Bubble text="raise the hot dog price?" size={36} tail="down" /></G2>
            <Jim f={f} x={1100} y={860} s={1.2} keys={[{at: 0, pose: 'hips', expr: 'suspicious', look: -0.8}, {at: kl, pose: 'point_l', expr: 'angry', look: -0.8}]} />
            {f >= kl && <G2 x={1150} y={430} s={pop(f, kl)}><Bubble text={'NO.\nFigure it out.'} size={48} tail="down" /></G2>}
            <G2 x={1600} y={300} s={pop(f, hdg)}><HotDog s={0.8} /><Text y={90} size={44}>$1.50</Text></G2>
            {f >= fc && <G2 x={1600} y={700} s={pop(f, fc)}><Factory s={0.4} label="HOT DOGS" /></G2>}
            {f >= kl && <G2 x={960} y={130} s={pop(f, kl)}><Text size={36} color="#5B6470">(a famous joke, told by Costco's founder)</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 why cheap ============
  {
    const hdg = w('c3b', 'hot');
    const mb = w('c3b', 'membership');
    const wt = w('c3c', 'worth');
    const rp = w('c3d', 'raised');
    const rn = w('c3d', 'renew');
    const pr = w('c3e', 'protect');
    const ad = w('c3e', 'advertising');
    const bf = w('c3f', 'buffet');
    const wn = w('c3f', 'winning');
    const fv = w('c3g', 'five');
    const cst = w('c3g', 'cost');
    const bl = w('c3g', 'billions');
    q(hdg, 'pop', 0.5);
    q(mb, 'stamp', 0.6);
    q(wt, 'ding', 0.6);
    q(rp, 'buzz', 0.5);
    q(rn, 'thud', 0.5);
    q(pr, 'pop', 0.5);
    q(ad, 'ding', 0.6);
    q(bf, 'pop', 0.5);
    q(wn, 'ding', 0.5);
    q(fv, 'cash', 0.6);
    q(bl, 'cash', 0.6);
    scene(A('c3a'), () =>
      f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={500} s={pop(f, A('c3a'))}>
              <HotDog s={1.2} />
              <G2 y={180} s={pop(f, hdg)}><Text size={44}>not the real product</Text></G2>
              {f >= mb && <line x1={-200} y1={-150} x2={200} y2={150} stroke={C.red} strokeWidth={16} strokeLinecap="round" />}
            </G2>
            <MemberCard x={1350} y={450} s={1.2 * pop(f, mb)} r={-4} />
            <G2 x={1350} y={700} s={pop(f, mb + 4)}><Text size={52} color={C.green}>the REAL product</Text></G2>
            {f >= wt && <G2 x={960} y={900} s={pop(f, wt)}><Text size={52}>"This card is totally worth it."</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious'}, {at: pr, pose: 'celebrate', expr: 'grin'}]} />
            {f < pr ? (
              <g>
                <G2 x={1100} y={330} s={pop(f, rp)}><PriceTag text="$$$" s={1.5} color={C.red} /></G2>
                <G2 x={700} y={500} s={pop(f, A('c3d') + 4)}><Bubble text={'Why am I paying $65?'} size={40} tail="left" /></G2>
                {f >= rn && <G2 x={1300} y={650} s={pop(f, rn)}><MemberCard s={0.7} /><Stamp y={0} text="NOT RENEWED" size={42} color={C.red} r={-8} /></G2>}
              </g>
            ) : (
              <g>
                <G2 x={1250} y={420} s={pop(f, pr)}><HotDog s={1.3} /></G2>
                <G2 x={1250} y={700} s={pop(f, ad)}><Text size={60} color={C.green}>advertising you can eat</Text></G2>
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={160} s={pop(f, bf)}><Text size={60}>BUFFET · pay at the door</Text></G2>
            {[0, 1, 2, 3].map((i) => (
              <G2 key={i} x={560 + i * 260} y={560} s={pop(f, bf + i * 4)}>
                <ellipse rx={110} ry={40} fill="#fff" stroke={C.ink} strokeWidth={5} />
                <circle cy={-20} r={50} fill={[C.red, C.yellow, C.green, '#C98F5E'][i]} stroke={C.ink} strokeWidth={5} />
              </G2>
            ))}
            <Dave f={f} x={960} y={900} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: wn, pose: 'celebrate', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130}><Text size={56}>Costco's side of the math</Text></G2>
            {[0, 1, 2, 3, 4].map((i) => (
              <G2 key={i} x={500} y={780 - i * 110} s={pop(f, A('c3g') + i * 5)}>
                <MoneyStack n={4} s={0.8} />
              </G2>
            ))}
            <G2 x={500} y={250} s={pop(f, fv)}><Text size={70} color={C.green}>$5B+ every year</Text></G2>
            <G2 x={1350} y={450} s={pop(f, cst)}><Text size={48}>shelves at cost?</Text></G2>
            <G2 x={1350} y={600} s={pop(f, bl)}><Text size={70} color={C.green}>still billions</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 fewer choices ============
  {
    const fr = w('c4b', 'four');
    const tt = w('c4b', 'tens');
    const kt = w('c4c', 'ketchup');
    const mt = w('c4c', 'mountain');
    const sp = w('c4d', 'suppliers');
    const dc = w('c4e', 'decorations');
    const pl = w('c4e', 'pallets');
    const kl = w('c4f', 'kirkland');
    const nb = w('c4f', 'ninety');
    q(fr, 'pop', 0.5);
    q(tt, 'pop', 0.5);
    q(kt, 'pop', 0.5);
    q(mt, 'thud', 0.6);
    q(sp, 'ding', 0.5);
    q(dc, 'pop', 0.5);
    q(pl, 'thud', 0.6);
    q(kl, 'stamp', 0.6);
    q(nb, 'cash', 0.6);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={56}>Trick 1: fewer choices</Text></G2>
            <line x1={400} y1={860} x2={1520} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={760} y={860} h={ease(f, fr - 4, fr + 12, 2, 4 * 12)} color={C.red} label="Costco" value="~4,000 items" w={300} />
            <Bar x={1160} y={860} h={ease(f, tt - 4, tt + 14, 2, 50 * 12)} color="#9AA5B1" label="giant supermarket" value="100,000+" w={300} />
            <SourceTag f={f} at={fr} text="≈4,000 SKUs per Costco vs ≈150,000 at a Walmart Supercenter" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={120}><Text size={48}>Supermarket</Text></G2>
            {Array.from({length: 20}).map((_, i) => <Bottle key={i} x={180 + (i % 10) * 64} y={330 + Math.floor(i / 10) * 230} s={0.55 * pop(f, A('c4c') + i)} color={[C.red, '#C0533A', '#E65A4F', '#B22222'][i % 4]} />)}
            <G2 x={1400} y={120}><Text size={48}>Costco</Text></G2>
            <G2 x={1400} y={560} s={pop(f, kt)}>
              <Bottle x={-100} s={1.4} color={C.red} label="A" />
              <Bottle x={100} s={1.4} color="#C0533A" label="B" />
            </G2>
            {f >= mt && <G2 x={1400} y={900} s={pop(f, mt)}><Pallet s={0.7} color="#E65A4F" /></G2>}
            {f >= sp && <G2 x={700} y={880} s={pop(f, sp)}><Text size={48} color={C.green}>buy a mountain → better price</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Aisle />
          <Svg>
            <G2 x={960} y={140} s={pop(f, dc)}><Text size={56}>Trick 2: no fancy stuff</Text></G2>
            {[0, 1, 2].map((i) => <G2 key={i} x={620 + i * 340} y={800} s={pop(f, pl + i * 5)}><Pallet color={['#F4D6B8', '#B8E0FF', '#C8F5D8'][i]} /></G2>)}
            <Dave f={f} x={960} y={900} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={480} s={pop(f, kl)}>
              <rect x={-260} y={-260} width={520} height={520} rx={30} fill="#fff" stroke={C.ink} strokeWidth={7} />
              <Text y={-120} size={40} color="#5B6470">STORE BRAND</Text>
              <Text y={-20} size={64} color={C.red}>KIRKLAND</Text>
              <Text y={60} size={40}>SIGNATURE</Text>
            </G2>
            <G2 x={1350} y={380} s={pop(f, nb)}><Text size={140} color={C.green} stroke={C.ink} sw={10}>~$90B</Text><Text y={110} size={40}>in sales, 1 year</Text></G2>
            <G2 x={1350} y={780} s={pop(f, nb + 20)}><Text size={44}>no famous brand to pay for</Text></G2>
            <SourceTag f={f} at={nb} text="Kirkland Signature ≈ $90B sales (FY2025)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 tricks ============
  {
    const ck = w('c5b', 'chicken');
    const fn = w('c5b', 'four');
    const hf = w('c5b', 'hundred');
    const bk = w('c5c', 'back');
    const tv = w('c5c', 'tvs');
    const ky = w('c5c', 'kayak');
    const th = w('c5d', 'treasure');
    const gn = w('c5d', 'gone');
    const tp = w('c5e', 'toilet');
    const fe = w('c5e', 'forty');
    const pk = w('c5e', 'pickles');
    const gb = w('c5e', 'gummy');
    const lt = w('c5f', 'lot');
    const rc = w('c5g', 'receipt');
    const sv = w('c5g', 'saved');
    q(ck, 'pop', 0.6);
    q(fn, 'cash', 0.5);
    q(hf, 'ding', 0.6);
    q(bk, 'whoosh', 0.4);
    [tv, ky].forEach((x) => q(x, 'pop', 0.5));
    q(th, 'dream', 0.5);
    q(gn, 'poof', 0.6);
    [tp, fe, pk, gb].forEach((x) => q(x, 'pop2', 0.5));
    q(lt, 'thud', 0.5);
    q(rc, 'paper', 0.6);
    q(sv, 'ding', 0.5);
    const items = [tp, fe, pk, gb, lt].filter((x) => f >= x).length;
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Cart x={420} y={760} s={1} items={f >= ck ? 1 : 0} />
            <Dave f={f} x={220} y={880} s={1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} />
            <G2 x={1250} y={500} s={pop(f, ck)}><Chicken s={1.8} /></G2>
            <G2 x={1250} y={250} s={pop(f, fn)}><PriceTag text="$4.99" s={1.3} color={C.yellow} /></G2>
            <G2 x={1250} y={800} s={pop(f, hf)}><Text size={64} color={C.green}>157 million sold</Text><Text y={70} size={36}>in one year</Text></G2>
            <SourceTag f={f} at={hf} text="Costco FY2025: 157.4M rotisserie chickens" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <rect x={120} y={260} width={1680} height={560} rx={20} fill="#F1EADC" stroke={C.ink} strokeWidth={6} />
            <G2 x={1680} y={560} s={pop(f, bk)}><Chicken s={0.8} /></G2>
            <G2 x={1680} y={330}><Text size={34}>BACK</Text></G2>
            <G2 x={220} y={330}><Text size={34}>DOOR</Text></G2>
            <G2 x={640} y={420} s={pop(f, tv)}><rect x={-110} y={-70} width={220} height={140} rx={10} fill="#2E3440" stroke={C.ink} strokeWidth={5} /><Text size={30} color="#fff">TVs</Text></G2>
            <G2 x={960} y={640} s={pop(f, tv + 6)}><rect x={-90} y={-60} width={180} height={120} rx={14} fill="#C98F5E" stroke={C.ink} strokeWidth={5} /><Text size={28} color="#fff">cookies</Text></G2>
            <G2 x={1280} y={420} s={pop(f, ky)}><path d="M -160 0 Q 0 -60 160 0 Q 0 40 -160 0 Z" fill={C.yellow} stroke={C.ink} strokeWidth={5} /><Text y={70} size={28}>kayak</Text></G2>
            <Dave f={f} x={lin(f, A('c5c'), A('c5d'), 220, 1500)} y={780} s={0.8} walk keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={pop(f, th)}><Text size={60}>the treasure hunt</Text></G2>
            <G2 x={960} y={520} s={pop(f, th + 6)} o={f >= gn ? 1 - ease(f, gn, gn + 16) : 1}>
              <rect x={-240} y={-160} width={480} height={320} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-60} size={40}>Giant teddy bear</Text>
              <Text y={20} size={70} color={C.red}>ONLY NOW</Text>
              <Sparkle x={200} y={-140} t={(f % 30) / 30} s={0.6} />
            </G2>
            {f >= gn && <G2 x={960} y={520} s={pop(f, gn + 10)}><Text size={80} color="#9AA5B1">gone forever?</Text></G2>}
            <Dave f={f} x={400} y={880} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'grin'}, {at: gn, pose: 'panic', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130}><Text size={56}>came for toilet paper...</Text></G2>
            <Cart x={1000} y={780} s={1.6} items={items * 3 + 1} />
            {[[tp, '48 rolls'], [pk, 'giant pickles'], [gb, '3 lb gummy bears']].map(([at, l], i) => (
              <G2 key={l as string} x={420} y={340 + i * 150} s={pop(f, at as number)}>
                <rect x={-200} y={-50} width={400} height={100} rx={20} fill={[C.blue, C.green, C.red][i]} stroke={C.ink} strokeWidth={5} />
                <Text size={36} color="#fff">{l as string}</Text>
              </G2>
            ))}
            {f >= lt && <G2 x={1550} y={330} s={pop(f, lt)}><Text size={48} color={C.red}>cheap each · a LOT of them</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: sv, pose: 'celebrate', expr: 'grin'}]} handItem={<HotDog s={0.3} y={-10} />} />
            <Receipt x={1200} y={560} s={1.4 * pop(f, rc)} lines={[['Hot dog', '$1.50'], ['Toilet paper', '$24.99'], ['Pickles', '$9.49'], ['Gummy bears', '$12.99'], ['TV', '$199.99'], ['Chicken', '$4.99'], ['Misc', '$33.05']]} total="$287.00" shown={Math.floor(lin(f, rc, rc + 40, 0, 7))} />
            {f >= sv && <G2 x={400} y={420} s={pop(f, sv)}><Bubble text="I saved so much!" size={40} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 executive ============
  {
    const oh = w('c6b', 'one');
    const tp = w('c6b', 'two');
    const th = w('c6c', 'three');
    const fm = w('c6d', 'families');
    const ct = w('c6d', 'cat');
    const cv = w('c6e', 'clever');
    const mw = w('c6e', 'worth');
    q(A('c6a') + 2, 'pop', 0.5);
    q(oh, 'pop', 0.5);
    q(tp, 'coin', 0.5);
    q(th, 'ding', 0.6);
    q(fm, 'pop', 0.5);
    q(ct, 'pop', 0.5);
    q(cv, 'ding', 0.5);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <MemberCard x={500} y={440} s={1.3 * pop(f, A('c6a') + 2)} tier="EXECUTIVE" price="$130/yr" color={C.ink} />
            <G2 x={500} y={740} s={pop(f, tp)}><Text size={52} color={C.green}>2% back (up to a limit)</Text></G2>
            <G2 x={1350} y={420} s={pop(f, th)}>
              <rect x={-400} y={-180} width={800} height={360} rx={26} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-110} size={40} color="#5B6470">to earn back the extra $65</Text>
              <Text y={-20} size={56}>$65 ÷ 2% =</Text>
              <Text y={80} size={90} color={C.red}>$3,250/yr</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={300} s={pop(f, fm)}><Text size={44} color={C.green}>big family: easy</Text></G2>
            {[0, 1, 2, 3, 4].map((i) => <Stick key={i} f={f} x={300 + i * 100} y={700} s={0.5 + (i < 2 ? 0.2 : 0)} acc={i % 2 ? ['ponytail'] : ['hair']} seed={400 + i} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} opacity={pop(f, fm + i * 3)} />)}
            <Dave f={f} x={1300} y={820} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'think'}]} />
            <Cat f={f} x={1500} y={800} s={0.6 * pop(f, ct)} />
            <G2 x={1350} y={300} s={pop(f, ct)}><Text size={44}>Dave + a cat: maybe not</Text></G2>
            {f >= cv && <G2 x={960} y={130} s={pop(f, cv)}><Text size={48} color={C.red}>paid more → shops more "to make it worth it"</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 wisely ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Do the membership math', 'Compare price per unit', 'Bulk only what you use', 'Bring a list'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>Shopping smart at Costco</Text></G2>
          <G2 x={1620} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1080} />)}
          {cur === 1 && <G2 x={1600} y={520}><Text size={50}>savings</Text><Text y={70} size={60}>&gt; $65?</Text></G2>}
          {cur === 2 && <G2 x={1600} y={520}><Text y={-40} size={44}>$/roll</Text><Text y={40} size={44}>$/ounce</Text></G2>}
          {cur === 3 && <G2 x={1600} y={520}><Pallet s={0.6} color="#6BBF59" /></G2>}
          {cur === 4 && <G2 x={1600} y={520}><rect x={-120} y={-160} width={240} height={320} rx={10} fill="#fff" stroke={C.ink} strokeWidth={5} />{[0, 1, 2, 3].map((i) => <line key={i} x1={-80} x2={80} y1={-100 + i * 60} y2={-100 + i * 60} stroke={C.ink} strokeWidth={5} />)}</G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 ============
  const recap = ['~Half the profit = membership fees', 'Low prices keep members renewing', 'Cheap to run · built to make you spend'];
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
    const bl = w('c8e', 'billionaires');
    const lg = w('c8e', 'legally');
    const sb = w('c8f', 'subscribe');
    const fr = w('c8f', 'free');
    q(bl, 'chime', 0.5);
    q(lg, 'stamp', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    scene(A('c8e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={pop(f, bl)}><Text size={60}>Next: how billionaires pay less tax</Text></G2>
            <Stick f={f} x={1300} y={860} s={1.3 * pop(f, bl + 4)} acc={['tophat', 'monocle', 'tie']} seed={31} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.6}]} />
            <Dave f={f} x={600} y={860} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Stamp x={960} y={440} s={pop(f, lg, 9, 260)} text="LEGALLY" size={70} color={C.red} r={-6} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} handItem={<HotDog s={0.3} y={-10} />} />
            <G2 x={960} y={700} s={pop(f, fr)}><PriceTag text="$0.00" s={1.2} color={C.green} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3e', 'eat') + 20;
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
