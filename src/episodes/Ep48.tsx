import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, SourceTag, Stamp, Text, XMark} from '../props';
import {Frame, Icon, Row, SubButton, Bell} from '../props2';
import {Receipt, Scale, PriceBoard} from '../props8';
import {OfficeDesk, PriceFolder, Casket, Urn, BurialVault, PriceCompare, RuleCard, Flowers, TrustBox} from '../props48';
import {DeliSandwich} from '../props47';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Director: React.FC<SP> = (p) => <Stick acc={['tie', 'glasses']} seed={79} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;

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

export const Ep48: React.FC = () => {
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
    q(s, 'whoosh', 0.4);
    q(s + 10, 'chime', 0.35);
    q(s + CHAPTER_FRAMES - 10, 'whoosh_s', 0.3);
  }
  const bump = (at: number, k = 0.12) => (f < at ? 1 : 1 + k * Math.sin(Math.PI * Math.min(1, (f - at) / 12)));
  const lt = (at: number, lo = 0.35) => (f >= at ? 1 : lo);
  const P = (at: number) => pop(f, at + 2);

  // ============ COLD OPEN ============
  {
    const gf = w('o1', 'grandfather');
    const of = w('o1', 'office');
    const sk = w('o1', 'shock');
    const fo = w('o2', 'folder');
    const cs = w('o2', 'casket');
    const tn = w('o3', 'ten');
    const th = w('o3', 'thousand');
    q(2, 'pop', 0.4);
    q(fo, 'paper', 0.5);
    q(cs, 'pop2', 0.5);
    q(tn, 'cash', 0.7);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <OfficeDesk x={960} y={900} s={1.2 * P(0)} />
          <Dave f={f} x={620} y={800} s={1.05} keys={[{at: 0, pose: 'relax', expr: 'sad', look: 0.6}]} />
          <Grandma f={f} x={780} y={800} s={0.95} keys={[{at: 0, pose: 'relax', expr: 'sad', look: 0.6}]} />
          <Director f={f} x={1280} y={790} s={1} keys={[{at: 0, pose: 'present', expr: 'neutral', look: -0.7}]} handItem={f >= fo ? <PriceFolder s={0.5} open={f >= cs ? 0.6 : 0} /> : undefined} />
          <G2 x={960} y={280} s={P(0) * bump(of)}><Text size={44} color={GRAY}>{f >= sk ? 'still in shock' : 'a small office'}</Text></G2>
          <G2 x={1280} y={480} o={lt(cs, 0.35)}><Bubble text="time to choose a casket" size={36} tail="down" /></G2>
          <G2 x={620} y={1010} s={bump(tn, 0.2)} o={lt(tn, 0.4)}>
            <rect x={-220} y={-50} width={440} height={100} rx={18} fill={f >= tn ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={4} size={48} color={f >= tn ? '#fff' : GRAY}>{f >= tn ? 'OVER $10,000' : '?'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pw = w('o4', 'paperwork');
    const mm = w('o4', 'moment');
    const gt = w('o5', 'gentle');
    const hd = w('o5', 'hard');
    q(pw, 'paper', 0.5);
    q(mm, 'buzz', 0.5);
    q(gt, 'chime', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={300} s={P(A('o4')) * bump(pw)}><Text size={48}>{f >= pw ? 'a few hours of paperwork...' : 'how does this happen?'}</Text></G2>
          <G2 x={960} y={420} o={lt(mm, 0.35)}><Text size={44} color={C.red}>...at the worst possible moment</Text></G2>
          <Flowers x={620} y={860} s={1.2 * P(A('o4'))} />
          <G2 x={1320} y={860} s={P(A('o4')) * bump(gt, 0.06)}><Icon kind="heart" s={1.1} /></G2>
          <G2 x={1320} y={1010} o={lt(hd, 0.4)}><Text size={34} color={GRAY}>this one is gentle. it's a hard topic.</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const av = w('o6', 'average');
    const mk = w('o6', 'markup');
    const rg = w('o6', 'rights');
    const pv = [av, mk, rg];
    pv.forEach((x) => q(x, 'pop', 0.5));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={56} color={GRAY}>TODAY</Text>
          {['THE REAL COST', 'THE MARKUP', 'YOUR RIGHTS'].map((l, i) => (
            <G2 key={l} x={430 + i * 550} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={480} h={480}>
                {i === 0 && <Text y={0} size={60}>$8,300</Text>}
                {i === 1 && <Casket s={0.32} y={20} />}
                {i === 2 && <Icon kind="rulebook" s={0.9} y={0} />}
                <Text y={200} size={30}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: The Bill Nobody Budgets For ============
  {
    const fn = w('c1a', 'funeral');
    const nfda = w('c1b', 'national');
    const br = w('c1b', 'burial');
    const e8 = w('c1b', 'eight');
    const th3 = w('c1b', 'three');
    const vt = w('c1c', 'vault');
    const pl = w('c1d', 'plot');
    const hs = w('c1d', 'headstone');
    const bn = w('c1f', 'billion');
    const el = w('c1g', 'eight');
    q(fn, 'pop', 0.5);
    q(nfda, 'paper', 0.5);
    q(e8, 'cash', 0.7);
    q(vt, 'stamp', 0.6);
    q(pl, 'pop2', 0.5);
    q(bn, 'cash', 0.6);
    q(el, 'buzz', 0.5);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c1a')) * bump(fn)}><Text size={46}>{f >= nfda ? 'NFDA median cost' : 'the honest number'}</Text></G2>
            <Casket x={620} y={640} s={0.85 * P(A('c1a')) * bump(vt, 0.06)} />
            <Box x={1420} y={420} w={760} h={320} s={P(A('c1a')) * bump(e8, 0.08)} fill={f >= e8 ? C.yellow : '#fff'}>
              <Text y={-90} size={30} color={GRAY}>viewing + burial, median</Text>
              <Text y={0} size={72} color={C.red}>{f >= e8 ? '$8,300' : '?'}</Text>
              <Text y={90} size={32} color={f >= vt ? C.ink : GRAY}>{f >= vt ? '+ vault ≈ $9,995' : ''}</Text>
            </Box>
            <SourceTag f={f} at={nfda} text="NFDA 2025 Cremation & Burial Report: median burial funeral $8,300 (+vault $9,995)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1d')) * bump(pl)}><Text size={46}>the number that's NOT included yet</Text></G2>
            <Flowers x={560} y={700} s={1.1 * P(A('c1d'))} />
            <G2 x={860} y={700} s={0.7 * P(A('c1d')) * bump(hs, 0.1)}>
              <rect x={-60} y={-100} width={120} height={140} rx={16} fill="#C9CED6" stroke={C.ink} strokeWidth={6} />
            </G2>
            <Box x={1420} y={520} w={720} h={260} s={P(A('c1d')) * bump(hs, 0.08)} o={lt(hs, 0.45)}>
              <Text y={-50} size={32} color={GRAY}>plot + headstone + flowers</Text>
              <Text y={30} size={56} color={C.red}>+ $2,000-$5,000</Text>
            </Box>
            <G2 x={1420} y={800} o={lt(hs, 0.35)}><Text size={34} color={C.blue}>like a menu with only appetizer prices</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c1f')) * bump(bn)}><Text size={48}>it's a real industry, not a niche</Text></G2>
            <Box x={620} y={560} w={640} h={280} s={P(A('c1f')) * bump(bn, 0.08)} fill={f >= bn ? C.yellow : '#fff'}>
              <Text y={-50} size={32} color={GRAY}>U.S. funeral homes, per year</Text>
              <Text y={40} size={64} color={C.red}>{f >= bn ? '~$20 billion' : '?'}</Text>
            </Box>
            <Box x={1360} y={560} w={640} h={280} s={P(A('c1f')) * bump(el, 0.08)} o={lt(el, 0.45)}>
              <Text y={-50} size={32} color={GRAY}>decided, on average, within</Text>
              <Text y={40} size={64} color={C.red}>48 hours</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2: The Casket Markup ============
  {
    const bg = w('c2a', 'biggest');
    const wh = w('c2b', 'wholesale');
    const e8 = w('c2b', 'eight');
    const ft = w('c2b', 'fifteen');
    const sh = w('c2c', 'showroom');
    const tn = w('c2c', 'ten');
    const mk = w('c2d', 'markup');
    const pc = w('c2d', 'percent');
    const sf = w('c2e', 'sofa');
    const tw = w('c2f', 'twist');
    const on = w('c2f', 'online');
    const fy = w('c2f', 'fifty');
    q(bg, 'pop', 0.5);
    q(wh, 'paper', 0.5);
    q(sh, 'ding', 0.5);
    q(tn, 'cash', 0.7);
    q(mk, 'stamp', 0.7);
    q(sf, 'boing', 0.5);
    q(tw, 'sting', 0.5);
    q(on, 'ding', 0.6);
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2a')) * bump(bg)}><Text size={48}>the biggest line item: the casket</Text></G2>
            <Casket x={620} y={700} s={0.85 * P(A('c2a')) * bump(wh, 0.06)} tag={f >= e8 ? '$800-$1,500' : undefined} />
            <G2 x={620} y={950} o={lt(wh, 0.35)}><Text size={34} color={GRAY}>funeral home buys it wholesale</Text></G2>
            <Casket x={1420} y={700} s={1.0 * P(A('c2a')) * bump(sh, 0.1)} color="#5C3A22" glow={f >= tn} tag={f >= tn ? '$3,000-$10,000' : undefined} />
            <G2 x={1420} y={950} o={lt(sh, 0.35)}><Text size={34} color={C.red}>same casket, on the showroom floor</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2e')) * bump(mk)}><Text size={48}>{f >= mk ? '100%-300%+ markup' : 'like a sofa, priced like a painting'}</Text></G2>
            <PriceCompare x={960} y={560} s={0.85 * P(A('c2e')) * bump(sf, 0.06)} aLabel="WHOLESALE" aVal="$1,000" bLabel="SHOWROOM" bVal="$3,500" hi={f >= mk ? 1 : undefined} />
            <G2 x={960} y={860} s={bump(tw, 0.1)} o={lt(tw, 0.35)}><Text size={38} color={C.blue}>{f >= on ? 'same casket, online: ' : 'the twist: '}{f >= fy ? '50-70% less' : ''}</Text></G2>
            <SourceTag f={f} at={mk} text="Casket markup reporting (2024-2026): 100%-300%+ over wholesale; online 50-70% less" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: Rights You Didn't Know You Had ============
  {
    const rg = w('c3a', 'rights');
    const ftc = w('c3b', 'ftc');
    const it = w('c3c', 'itemized');
    const cs = w('c3c', 'casket');
    const tw2 = w('c3d', 'two');
    const ol = w('c3d', 'online');
    const fe = w('c3d', 'fee');
    const th = w('c3e', 'three');
    const ph = w('c3e', 'phone');
    const dc = w('c3f', 'discount');
    q(rg, 'stamp', 0.6);
    q(ftc, 'paper', 0.5);
    q(it, 'ding', 0.5);
    q(ol, 'ding', 0.5);
    q(fe, 'buzz', 0.5);
    q(ph, 'ding', 0.5);
    q(dc, 'chime', 0.6);
    scene(A('c3a'), () =>
      f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c3a')) * bump(ftc)}><Text size={48}>the FTC Funeral Rule</Text></G2>
            <RuleCard x={960} y={310} s={0.85 * P(A('c3a')) * bump(it, 0.05)} n={1} text="A written, itemized price list — for the casket too" on={f >= it} />
            <RuleCard x={960} y={480} s={0.85 * P(A('c3a')) * bump(ol, 0.05)} n={2} text="Buy a casket anywhere else — no extra fee allowed" on={f >= ol} />
            <RuleCard x={960} y={650} s={0.85 * P(A('c3a')) * bump(ph, 0.05)} n={3} text="Ask for prices on the phone before you visit" on={f >= ph} />
            <SourceTag f={f} at={ftc} text="FTC Funeral Rule (16 CFR Part 453): itemized GPL/CPL, right to buy elsewhere, phone pricing" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c3f')) * bump(dc)}><Text size={46}>like a hotel discount rate</Text></G2>
            <G2 x={620} y={620} s={1.1 * P(A('c3f'))}>
              <rect x={-140} y={-140} width={280} height={280} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={10} size={40}>HOTEL</Text>
            </G2>
            <G2 x={1300} y={620} s={1.1 * P(A('c3f')) * bump(dc, 0.1)}><PriceFolder s={1} open={1} total="ASK & COMPARE" /></G2>
            <G2 x={960} y={950} o={lt(dc, 0.4)}><Text size={38} color={C.red}>never offered — you have to ask</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4: The Grief Upsell ============
  {
    const dr = w('c4a', 'directors');
    const gr = w('c4b', 'grief');
    const br = w('c4b', 'brain');
    const cp = w('c4c', 'compare');
    const wd = w('c4d', 'window');
    const ed = w('c4e', 'education');
    const up = w('c4e', 'upselling');
    const sl = w('c4f', 'sales');
    const tm = w('c4g', 'timing');
    q(dr, 'pop', 0.5);
    q(gr, 'sting', 0.5);
    q(cp, 'buzz', 0.5);
    q(ed, 'paper', 0.6);
    q(up, 'stamp', 0.7);
    q(sl, 'boing', 0.5);
    q(tm, 'clank', 0.5);
    scene(A('c4a'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a')) * bump(gr)}><Text size={46}>{f >= gr ? 'grief changes decisions' : 'often, they just want to help'}</Text></G2>
            <Grandma f={f} x={620} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'tired', look: 0.7}]} />
            <G2 x={620} y={560} s={P(A('c4a')) * bump(br, 0.1)}><Icon kind="question" s={0.9} /></G2>
            <Box x={1400} y={620} w={780} h={320} s={P(A('c4a')) * bump(cp, 0.08)} o={lt(cp, 0.45)}>
              <Text y={-80} size={32} color={GRAY}>after a loss, weeks of...</Text>
              <Text y={0} size={40} color={C.red}>less compare · less negotiate</Text>
              <Text y={70} size={40} color={C.red}>less "no"</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4e')) * bump(up)}><Text size={40} color={f >= up ? C.red : C.ink}>{f >= up ? '"Upselling Without Upsetting the Client"' : 'a real continuing-ed class exists'}</Text></G2>
            <Director f={f} x={620} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.7}]} />
            <G2 x={620} y={520} s={P(A('c4e')) * bump(sl, 0.08)} o={lt(sl, 0.4)}><Bubble text={'"wouldn\'t you want\nthe best for them?"'} size={34} tail="down" /></G2>
            <Box x={1450} y={560} w={720} h={300} s={P(A('c4e')) * bump(tm, 0.08)} o={lt(tm, 0.45)}>
              <Text y={-60} size={34}>finding you at your most tired</Text>
              <Text y={20} size={34} color={C.red}>and calling it good timing</Text>
            </Box>
            <SourceTag f={f} at={up} text="Reporting on funeral sales training (2025): CE course 'Upselling Without Upsetting the Client'" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5: Two Myths: Embalming and the Vault ============
  {
    const em = w('c5a', 'embalming');
    const lw = w('c5a', 'law');
    const rf = w('c5b', 'refrigeration');
    const bn = w('c5c', 'bans');
    const vt = w('c5d', 'vault');
    const cn = w('c5d', 'container');
    const cm = w('c5e', 'cemeterys');
    const sk = w('c5e', 'sink');
    q(em, 'buzz', 0.5);
    q(lw, 'stamp', 0.6);
    q(rf, 'ding', 0.5);
    q(bn, 'stamp', 0.6);
    q(vt, 'pop', 0.5);
    q(cm, 'paper', 0.5);
    q(sk, 'thud', 0.5);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5a')) * bump(em)}><Text size={46}>myth: embalming is required by law</Text></G2>
            <Stamp x={960} y={440} s={P(A('c5a')) * bump(lw, 0.14)} text={f >= lw ? 'NOT LAW' : 'MYTH?'} color={f >= lw ? C.green : GRAY} size={70} />
            <Box x={960} y={780} w={900} h={260} s={P(A('c5a')) * bump(rf, 0.06)} o={lt(rf, 0.45)}>
              <Text y={-50} size={32} color={GRAY}>no state requires it for every death</Text>
              <Text y={30} size={38} color={C.green}>refrigeration is usually legal + cheaper</Text>
            </Box>
            <SourceTag f={f} at={lw} text="FTC Funeral Rule: embalming not legally required in most cases; refrigeration is an accepted alternative" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5d')) * bump(vt)}><Text size={46}>myth two: the burial vault</Text></G2>
            <BurialVault x={620} y={680} s={0.85 * P(A('c5d')) * bump(cn, 0.06)} />
            <Casket x={620} y={640} s={0.42 * P(A('c5d'))} color="#5C3A22" />
            <Box x={1400} y={560} w={780} h={320} s={P(A('c5d')) * bump(cm, 0.08)}>
              <Text y={-80} size={32} color={GRAY}>who actually requires it?</Text>
              <Text y={0} size={40} color={f >= cm ? C.red : GRAY}>{f >= cm ? "the CEMETERY's rules" : '?'}</Text>
              <Text y={70} size={32} color={f >= sk ? C.ink : GRAY}>{f >= sk ? 'so the ground doesn\'t sink' : ''}</Text>
              <Text y={110} size={30} color={GRAY}>not state law</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6: Why Cremation Keeps Growing ============
  {
    const lw2 = w('c6a', 'lower');
    const cr = w('c6a', 'cremation');
    const sx = w('c6b', 'six');
    const bl = w('c6b', 'burial');
    const sx3 = w('c6c', 'sixty');
    const th3 = w('c6c', 'three');
    const bl2 = w('c6c', 'burial');
    const fl = w('c6d', 'flip');
    const e8 = w('c6d', 'eighty');
    q(cr, 'chime', 0.5);
    q(sx, 'cash', 0.6);
    q(sx3, 'stamp', 0.6);
    q(bl2, 'stamp', 0.6);
    q(fl, 'boing', 0.5);
    q(e8, 'ding', 0.6);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6a')) * bump(cr)}><Text size={46}>a lower-cost, growing option</Text></G2>
            <Urn x={620} y={700} s={1.2 * P(A('c6a')) * bump(sx, 0.06)} label={f >= sx ? '$6,280' : undefined} />
            <Casket x={1400} y={700} s={0.6 * P(A('c6a')) * bump(bl, 0.06)} color="#5C3A22" tag={f >= bl ? '$8,300' : undefined} />
            <G2 x={1400} y={900} o={lt(bl, 0.4)}><Text size={32} color={GRAY}>burial (still real money)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6d')) * bump(fl)}><Text size={46}>a complete flip from decades ago</Text></G2>
            <PriceBoard x={960} y={620} s={0.95 * P(A('c6d')) * bump(sx3, 0.05)} title="2025" rows={[['Cremation', f >= sx3 ? '63.4%' : '?'], ['Burial', f >= bl2 ? '31.6%' : '?']]} hl={0} />
            <G2 x={960} y={940} s={bump(e8, 0.1)} o={lt(e8, 0.4)}><Text size={38} color={C.green}>projected: 82% by 2045</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: Paying Early: The Fine Print ============
  {
    const pp = w('c7a', 'prepaying');
    const pn = w('c7b', 'preneed');
    const rk = w('c7c', 'risk');
    const cl = w('c7c', 'closes');
    const tr = w('c7d', 'trust');
    const bl3 = w('c7d', 'barely');
    const fp = w('c7e', 'fine');
    q(pp, 'pop', 0.5);
    q(pn, 'paper', 0.5);
    q(rk, 'buzz', 0.6);
    q(cl, 'thud', 0.6);
    q(tr, 'ding', 0.5);
    q(bl3, 'sting', 0.5);
    q(fp, 'chime', 0.5);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7a')) * bump(pp)}><Text size={44}>{f >= pn ? 'preneed contracts' : 'paying ahead: preneed'}</Text></G2>
            <TrustBox x={620} y={620} s={1.3 * P(A('c7a')) * bump(tr, 0.1)} locked={f >= tr} />
            <Box x={1400} y={620} w={780} h={300} s={P(A('c7a')) * bump(cl, 0.08)} o={lt(rk, 0.45)}>
              <Text y={-60} size={34} color={C.red}>{f >= cl ? 'what if the home closes?' : 'the risk:'}</Text>
              <Text y={30} size={32} color={GRAY}>years before it's ever needed</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c7d')) * bump(tr)}><Text size={44}>protection depends on your state</Text></G2>
            <PriceCompare x={960} y={580} s={0.85 * P(A('c7d')) * bump(bl3, 0.06)} aLabel="SOME STATES" aVal="trust / insurance" bLabel="OTHER STATES" bVal="barely anything" hi={f >= bl3 ? 1 : undefined} />
            <G2 x={960} y={880} s={bump(fp, 0.1)} o={lt(fp, 0.4)}><Text size={36} color={C.blue}>read the fine print, and your state's rules</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8: How to Protect Your Family ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f'), bs('c8g')];
    hs.forEach((x) => q(x, 'ding', 0.45));
    const pl = w('c8b', 'plan');
    const it = w('c8c', 'itemized');
    const ph = w('c8d', 'phone');
    const on = w('c8e', 'online');
    const lw3 = w('c8f', 'law');
    const pp2 = w('c8g', 'prepaying');
    q(pl, 'pop', 0.4);
    q(it, 'paper', 0.5);
    q(ph, 'ding', 0.5);
    q(on, 'ding', 0.5);
    q(lw3, 'stamp', 0.5);
    q(pp2, 'coin', 0.5);
    const items = ['A short note of preferences, ahead of time', 'Ask for the itemized price list out loud', 'Call 2-3 funeral homes on the phone first', 'Consider a casket online, if cheaper', 'Ask: is this the law, or a preference?', "If prepaying, ask where the money goes"];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={90}><Text size={50}>How to Protect Your Family</Text></G2>
          <G2 x={650} y={150}><Text size={28} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it2, i) => <Row key={i} x={60} y={250 + i * 128} s={0.82 * P(A('c8a'))} n={i + 1} text={it2} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1220} />)}
          {cur === 0 && <Dave f={f} x={1620} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 1 && <G2 x={1620} y={560} s={bump(pl, 0.1)}><Flowers s={0.9} /></G2>}
          {cur === 2 && <G2 x={1620} y={560} s={bump(it, 0.1)}><PriceFolder s={0.9} open={1} total="itemized list" /></G2>}
          {cur === 3 && <G2 x={1620} y={560} s={bump(ph, 0.1)}><Icon kind="check" s={1.1} /></G2>}
          {cur === 4 && <G2 x={1620} y={560} s={bump(on, 0.1)}><Casket s={0.3} color="#5C3A22" /></G2>}
          {cur === 5 && <G2 x={1620} y={560} s={bump(lw3, 0.1)}><Icon kind="question" s={0.9} /></G2>}
          {cur >= 6 && <G2 x={1620} y={560} s={bump(pp2, 0.1)}><TrustBox s={1} locked /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['A funeral typically runs $8,000-$10,000, in pieces', 'Caskets often marked up 100-300%+; embalming/vault rarely legally required', 'The FTC Funeral Rule gives you a price list, phone pricing, no outside-purchase fee'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.5);
    r.forEach((x) => q(x, 'ding', 0.45));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('r1'))}><Text size={90}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={140} y={360 + i * 200} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1640} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lg = w('r5', 'lighter');
    const nn = w('r5', 'ninety');
    const sb = w('r6', 'subscribe');
    const fr = w('r6', 'free');
    const up = w('r6', 'upsell');
    q(lg, 'chime', 0.5);
    q(nn, 'ding', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(up, 'boing', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5')) * bump(lg)}><Text size={52}>Next: why everything ends in .99</Text></G2>
            <DeliSandwich x={1250} y={700} s={0.6 * P(A('r5')) * bump(nn, 0.1)} price={f >= nn ? '$9.99' : '$10'} />
            <Icon kind="question" x={900} y={500} s={0.8 * P(A('r5'))} />
            <Dave f={f} x={450} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={1500} y={800} s={pop(f, sb)}><Text size={50} color={C.green}>FREE. NO UPSELL.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4e', 'client') + 20;
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
