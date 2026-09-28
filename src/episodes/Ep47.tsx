import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bubble, SourceTag, Stamp, Text, XMark} from '../props';
import {Badge, Frame, Icon, Magnifier, Phone, Row, SubButton, Bell} from '../props2';
import {BouncyCastle, Truck} from '../props4';
import {Jet, PriceBoard, Receipt, Scale, Bottle} from '../props8';
import {Casket} from '../props48';
import {BurialVault} from '../props48';
import {GateWindow, GateSeats, SecurityWall, ScannerArch, SecurityBin, ShopCounter, DeliSandwich, StorefrontStrip, RentSplit, ContractPaper} from '../props47';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;

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

export const Ep47: React.FC = () => {
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
    const gt = w('o1', 'gate');
    const hg = w('o1', 'hungry');
    const sw = w('o1', 'sandwich');
    const e18 = w('o2', 'eighteen');
    const bt = w('o3', 'bottle');
    const wt1 = w('o3', 'water');
    const s7 = w('o3', 'seven');
    const wt2 = w('o3', 'water', 1);
    const tw = w('o4', 'twenty');
    const fv = w('o4', 'five');
    const st = w('o4', 'standing');
    q(2, 'pop', 0.6);
    q(sw, 'pop', 0.5);
    q(e18, 'cash', 0.7);
    q(bt, 'pop2', 0.5);
    q(s7, 'cash', 0.6);
    q(st, 'boing', 0.5);
    const sk = shake(f, st, 12, 12);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <GateWindow x={1540} y={420} s={0.85 * P(0)} gate="B12" />
          <GateSeats x={1540} y={900} s={0.9 * P(0)} />
          <Dave f={f} x={520} y={920} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.5}, {at: sw, pose: 'hold', expr: 'happy', look: 0.5}, {at: st, pose: 'shock', expr: 'shock', look: 0.5}]} handItem={f >= sw ? <DeliSandwich s={0.55} price={f >= e18 ? '$18' : '?'} /> : undefined} />
          <G2 x={520} y={300} s={P(0) * bump(gt)}><Text size={44}>{f >= hg ? 'hungry, at the gate' : 'gate B12'}</Text></G2>
          <G2 x={980} y={760} s={1.1 * P(0) * bump(bt, 0.16)}><Bottle color={C.blue} label={f >= wt1 ? '$7' : '?'} /></G2>
          <G2 x={980 + sk.x} y={420 + sk.y} s={P(0) * bump(st, 0.2)}>
            <rect x={-190} y={-60} width={380} height={120} rx={20} fill={f >= st ? C.red : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={4} size={54} color={f >= st ? '#fff' : GRAY}>{f >= tw ? 'TOTAL $25' : '?'}</Text>
          </G2>
          <G2 x={980} y={280} o={lt(st, 0.4)}><Text size={32} color={C.red}>eating it standing up</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const six = w('o5', 'six');
    const s0 = w('o5', 'same');
    const s1 = w('o5', 'same', 1);
    const s2 = w('o5', 'same', 2);
    const br = w('o5', 'bread');
    const ch = w('o5', 'cheese');
    const ct = w('o5', 'counter');
    const hf = w('o5b', 'hundred');
    q(six, 'ding', 0.6);
    q(s0, 'pop2', 0.4);
    q(s1, 'pop2', 0.4);
    q(s2, 'pop2', 0.4);
    q(hf, 'buzz', 0.6);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <StorefrontStrip x={560} y={560} s={P(A('o5'))} label="HOME, SAME SHOP" price={f >= six ? '$6' : '?'} />
          <DeliSandwich x={1360} y={520} s={0.85 * P(A('o5')) * bump(s0, 0.1)} price="$18" />
          <G2 x={1360} y={780} o={lt(s1, 0.4)}><Text size={38} color={C.blue}>{f >= ch ? 'same bread, same cheese' : 'same bread...'}</Text></G2>
          <G2 x={1360} y={840} o={lt(ct, 0.35)}><Text size={30} color={GRAY}>same guy behind the counter</Text></G2>
          <Arrow d="M 800 560 L 1080 540" t={f >= s0 ? 1 : 0.3} color={C.red} />
          <G2 x={960} y={1000} s={bump(hf, 0.15)} o={lt(hf, 0.4)}><Text size={44} color={C.red}>what happened in the last 100 feet?</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cv = w('o6', 'captive');
    const cu = w('o6', 'cut');
    const ru = w('o6', 'rule');
    const en = w('o6', 'enforces');
    const sn = w('o6', 'snacks');
    const pv = [cv, ru, sn];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['CAPTIVE CUSTOMER', 'STREET PRICING RULE', 'PACK YOUR OWN'].map((l, i) => (
            <G2 key={l} x={430 + i * 550} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={480} h={480}>
                {i === 0 && <SecurityWall s={0.34} y={0} />}
                {i === 1 && <Text y={0} size={70}>+10%</Text>}
                {i === 2 && <DeliSandwich s={0.4} y={0} />}
                <Text y={200} size={30}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: The Store You Can't Leave ============
  {
    const dr = w('c1a', 'airport');
    const sc = w('c1b', 'security');
    const cp = w('c1c', 'captive');
    const bc0 = w('c1d', 'bouncy');
    const bc1 = w('c1d', 'castle');
    const cg = w('c1e', 'congress');
    const ftc = w('c1e', 'federal');
    const cmp = w('c1f', 'compare');
    q(dr, 'pop', 0.5);
    q(sc, 'buzz', 0.5);
    q(cp, 'stamp', 0.6);
    q(bc0, 'boing', 0.5);
    q(cg, 'paper', 0.5);
    q(ftc, 'stamp', 0.6);
    q(cmp, 'ding', 0.4);
    scene(A('c1a'), () =>
      f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1a')) * bump(sc)}><Text size={48}>{f >= sc ? "past security, there's no exit" : "it's not really about sandwiches"}</Text></G2>
            <SecurityWall x={960} y={620} s={0.85 * P(A('c1a')) * bump(sc, 0.06)} />
            <Dave f={f} x={620} y={900} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <ShopCounter x={1360} y={920} s={0.75 * P(A('c1a'))} name="GATE MARKET" />
            <G2 x={620} y={340} s={P(A('c1a')) * bump(cp, 0.1)} o={lt(cp, 0.4)}><Text size={42} color={C.red}>{f >= cp ? 'you = "captive customer"' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1e'))}><Text size={48}>like the ONLY bouncy castle at the party</Text></G2>
            <BouncyCastle f={f} x={620} y={780} s={0.85 * P(A('c1e')) * bump(bc0, 0.1)} />
            <Dave f={f} x={620} y={1000} s={0.9} keys={[{at: 0, pose: 'point_r', expr: 'happy'}]} />
            <Box x={1420} y={340} w={780} h={300} s={P(A('c1e')) * bump(ftc, 0.08)} fill={f >= ftc ? C.yellow : '#fff'}>
              <Text y={-90} size={30} color={GRAY}>May 2025</Text>
              <Text y={-20} size={34} color={f >= cg ? C.ink : GRAY}>{f >= cg ? 'Congress asked the FTC to' : 'lawmakers asked...'}</Text>
              <Text y={40} size={34} color={f >= ftc ? C.red : GRAY}>{f >= ftc ? 'investigate airport & stadium prices' : ''}</Text>
            </Box>
            <SourceTag f={f} at={cg} text="Letter from members of the U.S. Congress to the FTC (May 2025) on airport & stadium concession pricing" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c1f')) * bump(cmp)}><Text size={50}>Dave didn't even compare prices</Text></G2>
            <ShopCounter x={960} y={800} s={0.9 * P(A('c1f'))} name="ONE COUNTER" price="$18" />
            <XMark x={1500} y={500} s={0.7 * pop(f, cmp)} />
            <G2 x={1500} y={650} o={lt(cmp, 0.4)}><Text size={38} color={C.red}>nothing to compare it to</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2: How This Became Normal ============
  {
    const rm = w('c2a', 'remembers');
    const sep = w('c2b', 'september');
    const el = w('c2b', 'eleventh');
    const tk = w('c2b', 'ticket');
    const gt = w('c2b', 'gate');
    const cmp = w('c2c', 'competed');
    const chk = w('c2d', 'checkpoint');
    const ml = w('c2e', 'mall');
    const lv = w('c2e', 'leave');
    const co = w('c2f', 'companies');
    const dz = w('c2f', 'dozens');
    q(rm, 'pop', 0.5);
    q(sep, 'stamp', 0.6);
    q(cmp, 'ding', 0.5);
    q(chk, 'buzz', 0.6);
    q(ml, 'boing', 0.5);
    q(co, 'paper', 0.5);
    q(dz, 'cash', 0.6);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2a')) * bump(rm)}><Text size={48}>{f >= sep ? 'before September 11, 2001' : "it wasn't always like this"}</Text></G2>
            <StorefrontStrip x={560} y={620} s={P(A('c2a')) * bump(gt, 0.06)} label="GATE SHOP" price={f >= cmp ? '$6' : ''} />
            <Dave f={f} x={900} y={900} s={0.9} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.8}]} />
            <Owner f={f} x={1100} y={900} s={0.9} keys={[{at: 0, pose: 'wave', expr: 'happy', look: -0.8}]} />
            <G2 x={1500} y={620} o={lt(tk, 0.4)}><Text size={36} color={C.blue}>no ticket needed to walk to the gate</Text></G2>
            <G2 x={960} y={950} o={lt(cmp, 0.35)}><Text size={38} color={C.green}>same customers as stores outside</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c2d')) * bump(chk)}><Text size={48}>after that day: only ticketed passengers pass</Text></G2>
            <SecurityWall x={960} y={640} s={0.95 * P(A('c2d'))} />
            <Dave f={f} x={560} y={900} s={1} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.8}]} />
            <ShopCounter x={1360} y={920} s={0.8 * P(A('c2d')) * bump(ml, 0.08)} name="SEALED MALL" />
            <G2 x={1360} y={560} o={lt(lv, 0.4)}><Text size={36} color={C.red}>a customer who can't leave</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={90} s={P(A('c2f')) * bump(co)}><Text size={44}>a handful of giant companies run most of it</Text></G2>
            <Owner f={f} x={960} y={420} s={1.15 * P(A('c2f'))} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
            <G2 x={960} y={610} o={lt(co, 0.4)}><Text size={32} color={C.blue}>ONE COMPANY, MANY SHOPS</Text></G2>
            {Array.from({length: 6}).map((_, i) => (
              <G2 key={i} x={230 + i * 300} y={880} s={0.42 * P(A('c2f')) * bump(dz + i * 2, 0.1)} o={f >= dz ? 1 : 0.55}>
                <ShopCounter name="" />
              </G2>
            ))}
            <G2 x={960} y={1030} s={bump(dz, 0.06)} o={lt(dz, 0.45)}><Text size={36} color={C.red}>10-year contracts, dozens of airports</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3: The Airport Takes a Cut ============
  {
    const sd = w('c3a', 'sandwich');
    const rt = w('c3b', 'rent');
    const tw = w('c3c', 'twelve');
    const et = w('c3c', 'eight');
    const sx = w('c3d', 'sixteen');
    const fv = w('c3d', 'five');
    const e18 = w('c3e', 'eighteen');
    const tc = w('c3e', 'thirty');
    const pz = w('c3f', 'pizza');
    q(sd, 'pop', 0.5);
    q(rt, 'cash', 0.6);
    q(tw, 'stamp', 0.7);
    q(sx, 'stamp', 0.7);
    q(e18, 'cash', 0.5);
    q(tc, 'coin', 0.7);
    q(pz, 'boing', 0.5);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={130} s={P(A('c3a')) * bump(rt)}><Text size={46}>{f >= rt ? '"percentage rent"' : 'not just normal rent'}</Text></G2>
            <ShopCounter x={620} y={800} s={0.85 * P(A('c3a'))} name="GATE MARKET" price="$18" />
            <RentSplit x={1420} y={420} s={0.95 * P(A('c3a')) * bump(tw, 0.1)} rentPct={f >= tw ? 0.128 : 0.02} label="FOOD & DRINK CUT" />
            <G2 x={1420} y={520} o={lt(tw, 0.4)}><Text size={44} color={C.red}>{f >= tw ? '12.8% of every sale' : '?'}</Text></G2>
            <RentSplit x={1420} y={720} s={0.95 * P(A('c3a')) * bump(sx, 0.1)} rentPct={f >= sx ? 0.165 : 0.02} label="GIFT / DUTY FREE CUT" />
            <G2 x={1420} y={820} o={lt(sx, 0.4)}><Text size={44} color={C.red}>{f >= sx ? '16.5%' : '?'}</Text></G2>
            <SourceTag f={f} at={tw} text="ACI-NA 2025 Concessions Benchmarking Survey (CY2024): median F&B rent 12.8%, retail/duty-free 16.5%" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3e')) * bump(e18)}><Text size={48}>Dave's $18 sandwich, split up</Text></G2>
            <Receipt x={620} y={560} s={1.05 * P(A('c3e'))} lines={[['sandwich', '$18.00'], ['airport rent', f >= tc ? '$2.30' : '?'], ['shop keeps', f >= tc ? '$15.70' : '?']]} total="" shown={f >= tc ? 3 : 1} />
            <Owner f={f} x={1420} y={900} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}, {at: pz, pose: 'present', expr: 'grin', look: -0.8}]} />
            <G2 x={1420} y={560} o={lt(pz, 0.4)}><Bubble text={'wants a slice of\nevery pizza too'} size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4: The Rule Almost Nobody Enforces ============
  {
    const lw = w('c4a', 'law');
    const sp = w('c4b', 'street');
    const tn = w('c4c', 'ten');
    const ft = w('c4c', 'fifteen');
    const sg = w('c4c', 'surcharge');
    const ck = w('c4d', 'checked');
    const cb = w('c4e', 'chocolate');
    const frt = w('c4e', 'fourteen');
    const lg = w('c4e', 'laguardia');
    const pd = w('c4f', 'portlands');
    const zr = w('c4f', 'zero');
    const ex = w('c4g', 'exists');
    q(lw, 'stamp', 0.6);
    q(sp, 'pop', 0.5);
    q(tn, 'ding', 0.5);
    q(ft, 'ding', 0.5);
    q(sg, 'coin', 0.5);
    q(ck, 'buzz', 0.5);
    q(cb, 'pop2', 0.5);
    q(frt, 'cash', 0.7);
    q(pd, 'pop', 0.5);
    q(zr, 'ding', 0.6);
    q(ex, 'stamp', 0.5);
    scene(A('c4a'), () =>
      f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a')) * bump(sp)}><Text size={48}>{f >= sp ? '"street pricing"' : 'is there even a rule?'}</Text></G2>
            <Box x={620} y={560} w={760} h={340} s={P(A('c4a')) * bump(tn, 0.06)}>
              <Text y={-110} size={32} color={GRAY}>NY airports cap (over street price)</Text>
              <Text y={-30} size={60} color={f >= ft ? '#C9C0AE' : C.ink}>{f >= tn ? '+10%' : '+?%'}</Text>
              <Text y={60} size={60} color={f >= ft ? C.red : '#C9C0AE'}>{f >= ft ? 'now +15%' : ''}</Text>
              <Text y={120} size={30} color={GRAY}>{f >= sg ? '+ 3% staff surcharge' : ''}</Text>
            </Box>
            <Dave f={f} x={1480} y={900} s={1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
            <G2 x={1480} y={560} o={lt(ck, 0.4)}><Bubble text={f >= ck ? 'barely gets checked...' : 'sounds fair?'} size={40} tail="down" /></G2>
            <SourceTag f={f} at={sp} text="Port Authority of NY & NJ, Street Pricing Regulation (2025): cap raised 10%→15% +3% surcharge" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={120} s={P(A('c4e')) * bump(cb)}><Text size={44}>a chocolate bar at LaGuardia</Text></G2>
            <G2 x={560} y={480} s={1.3 * P(A('c4e')) * bump(frt, 0.14)}>
              <rect x={-90} y={-120} width={180} height={240} rx={16} fill="#7A4A2A" stroke={C.ink} strokeWidth={6} />
              <rect x={-70} y={-90} width={140} height={60} rx={8} fill={C.gold} stroke={C.ink} strokeWidth={4} />
            </G2>
            <G2 x={560} y={720} s={bump(frt, 0.15)}><Text size={70} color={f >= frt ? C.red : GRAY}>{f >= frt ? '$14' : '?'}</Text></G2>
            <G2 x={560} y={800} o={lt(lg, 0.4)}><Text size={32} color={GRAY}>more than nearby stores outside</Text></G2>
            <Box x={1420} y={560} w={760} h={300} s={P(A('c4e')) * bump(pd, 0.08)} fill={f >= pd ? C.greenLight : '#fff'}>
              <Text y={-80} size={34} color={GRAY}>Portland (PDX) airport</Text>
              <Text y={0} size={70} color={f >= zr ? C.green : GRAY}>{f >= zr ? '0% markup' : '?'}</Text>
              <Text y={90} size={30} color={GRAY}>same price as outside</Text>
            </Box>
            <SourceTag f={f} at={frt} text="Reporting on airport street-pricing enforcement (2025): a $14 LaGuardia chocolate bar; Portland (PDX) requires no markup" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={200} s={P(A('c4g')) * bump(ex)}><Text size={56}>the rule exists.</Text></G2>
            <G2 x={960} y={340} s={bump(ex)} o={lt(ex, 0.4)}><Text size={56} color={C.red}>it's just often a suggestion.</Text></G2>
            <Dave f={f} x={960} y={800} s={1.3} keys={[{at: 0, pose: 'shrug', expr: 'worried'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5: It's Not Only Greed ============
  {
    const gd = w('c5a', 'greed');
    const bg = w('c5c', 'badge');
    const dd = w('c5d', 'trucks');
    const rc = w('c5d', 'receiving');
    const sf = w('c5e', 'square');
    const ft2 = w('c5e', 'foot');
    const fp = w('c5f', 'fourth');
    const mg = w('c5f', 'minimum');
    const gr = w('c5f', 'guarantee');
    const ls = w('c5g', 'lease');
    const fr = w('c5h', 'four');
    const stk = w('c5h', 'stacked');
    q(gd, 'buzz', 0.5);
    q(bg, 'stamp', 0.6);
    q(dd, 'thud', 0.5);
    q(rc, 'pop', 0.5);
    q(sf, 'cash', 0.6);
    q(fp, 'pop2', 0.5);
    q(mg, 'stamp', 0.7);
    q(ls, 'buzz', 0.6);
    q(fr, 'ding', 0.6);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5a')) * bump(gd)}><Text size={50} color={f >= gd ? C.red : C.ink}>most people think: just greed</Text></G2>
            <Badge x={660} y={560} s={2.4 * P(A('c5a')) * bump(bg, 0.14)} n="ID" color={f >= bg ? C.blue : GRAY} />
            <G2 x={660} y={800} o={lt(bg, 0.4)}><Text size={38}>background check + TSA badge</Text></G2>
            <G2 x={660} y={860} o={lt(bg, 0.35)}><Text size={30} color={GRAY}>every worker, every driver</Text></G2>
            <Dave f={f} x={1420} y={900} s={1} keys={[{at: 0, pose: 'facepalm', expr: 'tired'}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c5d')) * bump(dd)}><Text size={46}>trucks: one screened center first</Text></G2>
            <Truck x={620} y={760} s={1.1 * P(A('c5d')) * bump(rc, 0.1)} />
            <ScannerArch x={1160} y={760} s={0.5 * P(A('c5d')) * bump(rc, 0.08)} />
            <Arrow d="M 830 700 Q 990 640 1060 700" t={f >= rc ? 1 : 0.3} color={C.blue} />
            <Box x={1560} y={420} w={640} h={340} s={P(A('c5d')) * bump(sf, 0.08)} o={lt(sf, 0.45)}>
              <Text y={-100} size={30} color={GRAY}>the shop itself:</Text>
              <Text y={-30} size={38}>fought-over real estate</Text>
              <Text y={60} size={44} color={C.red}>{f >= sf ? 'rent / sq ft: high' : ''}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={P(A('c5f')) * bump(fp)}><Text size={46}>{f >= fp ? 'a 4th pressure: the minimum guarantee' : "there's one more thing"}</Text></G2>
            <ContractPaper x={580} y={640} s={1.05 * P(A('c5f')) * bump(mg, 0.1)} stamped={f >= mg} />
            <Owner f={f} x={950} y={880} s={1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}, {at: mg, pose: 'facepalm', expr: 'tired', look: 0.8}]} />
            <Box x={1500} y={480} w={680} h={260} s={P(A('c5f')) * bump(mg, 0.08)} fill={f >= mg ? C.yellow : '#fff'}>
              <Text y={-50} size={32} color={GRAY}>a minimum guarantee:</Text>
              <Text y={30} size={34} color={f >= mg ? C.red : GRAY}>{f >= mg ? 'fixed payment, due every month' : '?'}</Text>
            </Box>
            <Box x={1500} y={800} w={680} h={280} s={P(A('c5f')) * bump(ls, 0.08)} o={lt(fp, 0.5)} fill={f >= ls ? '#FFE3EA' : '#fff'}>
              <Text y={-55} size={34} color={f >= ls ? C.red : GRAY}>{f >= ls ? 'miss it → lose the lease' : 'what if a month is slow?'}</Text>
              <Text y={40} size={30} color={GRAY}>so prices rarely go down</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c5h')) * bump(fr)}><Text size={48}>the $18, stacked up</Text></G2>
            {['airport cut', 'extra costs', 'guaranteed minimum', 'captive pricing'].map((l, i) => (
              <G2 key={l} x={960} y={280 + i * 190} s={P(A('c5h')) * bump(fr + i * 3, 0.06)} o={f >= fr ? 1 : 0.4}>
                <rect x={-460} y={-56} width={920} height={112} rx={20} fill={[C.red, C.yellow, C.blue, C.greenLight][i]} stroke={C.ink} strokeWidth={6} opacity={0.85} />
                <Text y={4} size={46}>{i + 1}. {l}</Text>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6: Your Water Bottle's Secret Trip ============
  {
    const tw2 = w('c6a', 'twist');
    const oz = w('c6b', 'ounces');
    const ts = w('c6c', 'trash');
    const bn = w('c6c', 'bin');
    const ft3 = w('c6d', 'feet');
    const s7 = w('c6d', 'seven');
    const cs = w('c6e', 'conspiracy');
    const fg = w('c6e', 'fridge');
    const em = w('c6f', 'empty');
    q(tw2, 'boing', 0.4);
    q(oz, 'stamp', 0.6);
    q(ts, 'thud', 0.7);
    q(ft3, 'step', 0.5);
    q(s7, 'cash', 0.6);
    q(cs, 'buzz', 0.4);
    q(fg, 'ding', 0.5);
    q(em, 'ding', 0.7);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c6a')) * bump(tw2)}><Text size={48}>the water: it has a twist</Text></G2>
            <ScannerArch x={620} y={700} s={0.7 * P(A('c6a')) * bump(oz, 0.06)} glow={f >= ts ? 1 : 0} />
            <SecurityBin x={620} y={940} s={0.9 * P(A('c6a')) * bump(ts, 0.2)} confiscated={f >= ts} />
            <Box x={1460} y={360} w={720} h={220} s={P(A('c6a')) * bump(oz, 0.1)} fill={f >= oz ? C.yellow : '#fff'}>
              <Text y={-40} size={32} color={GRAY}>TSA 3-1-1 rule</Text>
              <Text y={30} size={40}>{f >= oz ? 'over 3.4 ounces = tossed' : 'any liquid over...?'}</Text>
            </Box>
            <Dave f={f} x={1460} y={920} s={1} keys={[{at: 0, pose: 'shock', expr: 'shock'}]} />
            <G2 x={1460} y={700} o={lt(bn, 0.35)}><Text size={34} color={C.red}>straight into the bin</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={460} y={900} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0.8}]} walk={f < ft3 + 20} />
            <ShopCounter x={1200} y={920} s={0.9 * P(A('c6d')) * bump(fg, 0.08)} name="GATE MARKET" price={f >= s7 ? '$7' : undefined} />
            <G2 x={1200} y={480} o={lt(fg, 0.35)}><Text size={36} color={C.blue}>{f >= cs ? "not a conspiracy, it's gravity" : 'a fridge full of it'}</Text></G2>
            <G2 x={1650} y={640} s={0.7 * P(A('c6d')) * bump(em, 0.12)}><Bottle color={em <= f ? C.green : C.blue} label={f >= em ? 'empty = OK' : ''} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7: Less Than the Airline Makes ============
  {
    const al = w('c7a', 'airlines');
    const e8 = w('c7a', 'eight');
    const pf = w('c7a', 'profit');
    const cs2 = w('c7c', 'cost');
    const pl = w('c7d', 'pilots');
    q(al, 'paper', 0.5);
    q(e8, 'cash', 0.6);
    q(pf, 'ding', 0.5);
    q(cs2, 'stamp', 0.7);
    q(pl, 'pop', 0.5);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c7a')) * bump(al)}><Text size={46}>less than the AIRLINE makes</Text></G2>
          <Jet x={620} y={520} s={0.55 * P(A('c7a'))} name="DAVE AIR" />
          <Scale x={1300} y={780} s={0.75 * P(A('c7a')) * bump(cs2, 0.08)} tilt={f >= cs2 ? -10 : 0} left={f >= e8 ? '$8 profit' : '?'} right={f >= cs2 ? '$18 sandwich' : '?'} />
          <G2 x={620} y={800} o={lt(pf, 0.4)}><Text size={38} color={C.red}>{f >= pf ? 'airline profit: ~$8' : ''}</Text></G2>
          <G2 x={960} y={980} s={bump(cs2, 0.1)} o={lt(cs2, 0.35)}><Text size={40} color={C.red}>the sandwich alone cost more</Text></G2>
          <Dave f={f} x={1600} y={960} s={0.9} keys={[{at: 0, pose: 'shrug', expr: 'worried'}, {at: pl, pose: 'point_l', expr: 'neutral'}]} />
          <SourceTag f={f} at={al} text="ep11 callback — IATA: global airline net profit per passenger ≈ $7.90-$8 (2025-2026)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: How to Beat the Price Tag ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f'), bs('c8g')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const em = w('c8b', 'empty');
    const pk = w('c8c', 'pack');
    const sg = w('c8d', 'sign');
    const hg = w('c8e', 'hungry');
    const ph = w('c8f', 'photo');
    const lo = w('c8g', 'loyalty');
    q(em, 'pop', 0.4);
    q(pk, 'pop2', 0.4);
    q(sg, 'ding', 0.5);
    q(hg, 'boing', 0.4);
    q(ph, 'click', 0.5);
    q(lo, 'coin', 0.5);
    const items = ['Empty bottle → fill after security', 'Pack food before you leave home', 'Check for a street pricing sign', 'Eat before you get to the airport', 'Price feels wrong? Take a photo', 'Use lounge / card perks you already have'];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={90}><Text size={52}>How to Beat the Price Tag</Text></G2>
          <G2 x={650} y={150}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={250 + i * 128} s={0.82 * P(A('c8a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1200} />)}
          {cur === 0 && <Dave f={f} x={1620} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />}
          {cur === 1 && <G2 x={1620} y={520} s={bump(em, 0.1)}><Bottle color={C.green} label="$0" /></G2>}
          {cur === 2 && <G2 x={1620} y={560} s={bump(pk, 0.1)}><DeliSandwich s={0.45} /></G2>}
          {cur === 3 && <G2 x={1620} y={520}><Icon kind="check" s={1.1} /><Text y={220} size={36} color={f >= sg ? C.green : GRAY}>street pricing sign</Text></G2>}
          {cur === 4 && <G2 x={1620} y={560} s={bump(hg, 0.1)}><DeliSandwich s={0.5} /><Text y={220} size={34} color={C.green}>eat a real meal first</Text></G2>}
          {cur === 5 && <G2 x={1620} y={560} s={bump(ph, 0.1)}><Magnifier s={1} /></G2>}
          {cur >= 6 && <G2 x={1620} y={560} s={bump(lo, 0.1)}><Phone title="LOUNGE APP" value="FREE SNACK" color={C.green} /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Captive customer since 9/11 changed security rules', 'Airport takes 12-16%; "street pricing" often unenforced', 'Empty bottle + food from home = a free stop'];
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
  {
    const fn = w('r5', 'funeral');
    const tn = w('r5', 'ten');
    const gv = w('r5', 'grieving');
    const sb = w('r6', 'subscribe');
    const fr = w('r6', 'free');
    q(fn, 'dream', 0.4);
    q(tn, 'cash', 0.6);
    q(gv, 'sting', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('r5'))}><Text size={52}>Next: a funeral bill reaches $10,000</Text></G2>
            <Casket x={1330} y={780} s={0.95 * P(A('r5')) * bump(tn, 0.08)} tag={f >= tn ? '$10,000' : '?'} />
            <Icon kind="question" x={950} y={620} s={1 * P(A('r5'))} />
            <Dave f={f} x={520} y={880} s={1.4} keys={[{at: 0, pose: 'point_r', expr: 'neutral', look: 0.8}, {at: gv, pose: 'shrug', expr: 'sad', look: 0.8}]} />
            <G2 x={520} y={560} s={P(A('r5')) * bump(gv, 0.1)} o={lt(gv, 0.4)}><Bubble text={'while they\'re\nstill grieving'} size={34} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <G2 x={1500} y={800} s={pop(f, sb)}><Text size={54} color={C.green}>FREE</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4f', 'average') + 20;
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
