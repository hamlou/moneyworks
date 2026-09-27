import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Magnifier, Mailbox, Phone, Row, Shield, SubButton, Bell} from '../props2';
import {Coffee, HospitalBill, PriceTag, Raccoon, TollBooth} from '../props3';
import {Flag} from '../props6';
import {Receipt, Scale, SlicePie} from '../props8';
import {Maze} from '../props28';
import {Ambulance, Gate, Hospital, HotelDoor, MarketStall, Pill, PillBottle, TShirt} from '../props40';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Doc: React.FC<SP> = (p) => <Stick acc={['glasses']} seed={48} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const Panel: React.FC<{x: number; y: number; w: number; h?: number; title: string; value: string; color?: string; s?: number; o?: number; size?: number; fill?: string}> = ({x, y, w, h = 200, title, value, color = C.ink, s = 1, o = 1, size = 80, fill}) => (
  <G2 x={x} y={y} s={s} o={o}>
    <Box w={w} h={h} fill={fill} />
    <Text y={-h / 2 + 40} size={30} color="#5B6470" ls={2}>{title}</Text>
    <Text y={24} size={size} color={color}>{value}</Text>
  </G2>
);

const Check: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M -30 0 l 22 22 l 44 -48" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
);

const Bandage: React.FC<{x?: number; y?: number; s?: number}> = ({x = 0, y = 0, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s}) rotate(-20)`}>
    <rect x={-90} y={-30} width={180} height={60} rx={30} fill="#F4D6B8" stroke={C.ink} strokeWidth={5} />
    <rect x={-30} y={-24} width={60} height={48} rx={8} fill="#fff" stroke={C.ink} strokeWidth={3} />
  </g>
);

export const Ep40: React.FC = () => {
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
  const P = (id: string, d = 0) => pop(f, A(id) + 2 + d);
  const lit = (at: number) => (f >= at ? 1 : 0.35);
  const bump = (at: number, k = 0.16) => (f < at ? 1 : 1 + k * Math.sin(Math.min(1, (f - at) / 14) * Math.PI));
  const V = (at: number, v: string) => (f >= at ? v : '?');

  // ============ COLD OPEN ============
  {
    const ct = w('o1', 'cut');
    const st = w('o1', 'stitches');
    const dn = w('o1', 'dinner');
    q(ct, 'thud', 0.5);
    q(st, 'pop', 0.5);
    q(dn, 'ding', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Hospital x={1300} y={822} s={0.85 * pop(f, 2)} name="ST. EXAMPLE" />
          <Dave f={f} x={500} y={822} s={1.15 * pop(f, 2)} keys={[{at: 0, pose: 'hold', expr: 'worried', look: 0.8}, {at: dn, pose: 'thumbs', expr: 'happy', look: 0.8}]} />
          <Bandage x={560} y={560} s={pop(f, st)} />
          <G2 x={500} y={300} s={pop(f, 4) * bump(ct)}><Text size={46}>{f >= st ? 'a few stitches' : 'ouch! a small cut'}</Text></G2>
          <G2 x={1300} y={250} s={pop(f, 5)} o={lit(dn)}><Text size={40} color={C.green}>home by dinner</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const mo = w('o2', 'month');
    const bl = w('o2', 'bill');
    const sp = w('o2', 'spit');
    q(mo, 'flip', 0.5);
    q(bl, 'mail', 0.7);
    q(sp, 'boing', 0.8);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Calendar x={200} y={200} s={0.5 * P('o2') * bump(mo)} top="+1" year="MONTH" flip={0} />
          <Mailbox x={560} y={880} s={P('o2', 2)} flag={f >= bl ? 1 : 0} />
          <HospitalBill x={1100} y={460} s={1.3 * P('o2', 3) * bump(bl)} />
          <Dave f={f} x={1560} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: sp, pose: 'shock', expr: 'shock', look: -0.8}]} sweat={f >= sp} />
          <Coffee x={1440} y={520} s={0.8 * P('o2', 4) * bump(sp, 0.3)} f={f} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const as = w('o3', 'aspirin');
    const ft = w('o3', 'forty');
    const bt = w('o3', 'bottle');
    q(as, 'pop', 0.6);
    q(ft, 'thud', 0.8);
    q(bt, 'ding', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={480} s={P('o3')}>
            <Receipt lines={[['Room', '$$$'], ['Stitches', '$$$'], ['ASPIRIN x1', f >= ft ? '$40.00' : '?'], ['Gauze', '$$'], ['Misc.', '$$']]} total="" shown={5} />
            <rect x={-190} y={-60} width={380} height={50} rx={10} fill="none" stroke={C.red} strokeWidth={6} opacity={f >= as ? 1 : 0} />
          </G2>
          <Pill x={1100} y={380} s={1.2 * P('o3', 2) * bump(ft, 0.3)} label={V(ft, '$40')} />
          <PillBottle x={1520} y={560} s={1.3 * P('o3', 4) * bump(bt)} price={f >= bt ? 'cheaper!' : undefined} />
          <G2 x={1520} y={220} s={P('o3', 5)} o={lit(bt)}><Text size={40}>a whole bottle at the store</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wr = w('o4', 'worse');
    const th = w('o4', 'three');
    const fs = w('o4', 'stitches');
    q(wr, 'sting', 0.5);
    q(th, 'thud', 0.8);
    q(fs, 'trombone', 0.5);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={450} s={P('o4') * bump(th, 0.1)}><Box w={760} h={420} /><Text y={-140} size={40} color="#5B6470">TOTAL DUE</Text><Text y={20} size={140} color={C.red}>{V(th, '$3,200')}</Text><Text y={140} size={32} color="#5B6470">(Dave's example bill)</Text></G2>
          <Bandage x={760} y={800} s={1.3 * P('o4', 2) * bump(fs)} />
          <Dave f={f} x={1500} y={900} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.8}, {at: th, pose: 'panic', expr: 'shock', look: -0.8}]} sweat={f >= th} />
          <G2 x={1500} y={330} s={P('o4', 3) * bump(wr)}><Bubble text={f >= fs ? 'for a few stitches?!' : 'how much?'} size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ea = w('o5', 'earth');
    const ff = w('o5', 'fifteen');
    q(ea, 'pop', 0.6);
    q(ff, 'cash', 0.7);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={P('o5') * bump(ea)}><Text size={56}>#1 in health spending on Earth</Text></G2>
          <Flag kind="us" x={500} y={500} s={1.3 * P('o5', 2)} />
          <Panel x={1240} y={480} w={760} h={280} title="PER PERSON, PER YEAR" value={V(ff, '$15,474')} color={C.red} size={130} s={P('o5', 3) * bump(ff)} />
          <Dave f={f} x={1700} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: ff, pose: 'shock', expr: 'shock', look: -0.8}]} />
          <SourceTag f={f} at={ff} text="CMS National Health Expenditures 2024: $15,474 per person" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'fake'), w('o6', 'secret'), w('o6', 'middlemen'), w('o6', 'surprise'), w('o6', 'fought')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    const labels = ['FAKE PRICES', 'SECRET DEALS', 'MIDDLEMEN', 'SURPRISE BILLS', 'FIGHT BACK'];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {labels.map((l, i) => (
            <Frame key={l} x={220 + i * 370} y={520} s={0.95 * P('o6', i * 2) * bump(pv[i])} o={lit(pv[i])} w={340} h={440} label={l}>
              {i === 0 && <PriceTag s={1.1} y={-50} text="$40" color={C.red} />}
              {i === 1 && <Stamp s={0.8} y={-40} text="SECRET" size={44} color={C.navy} r={-8} />}
              {i === 2 && <Raccoon f={f} s={0.55} y={40} mood="sneaky" />}
              {i === 3 && <HospitalBill s={0.6} y={-20} />}
              {i === 4 && <Dave f={f} x={0} y={110} s={0.55} keys={[{at: 0, pose: 'thumbs', expr: 'grin'}]} />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Fake price list ============
  {
    const cm = w('c1a', 'chargemaster');
    const pl = w('c1b', 'pill');
    const bd = w('c1b', 'bandage');
    const hr = w('c1b', 'hour');
    const tt = w('c1b', 'tens');
    const nb = w('c1c', 'nobody');
    const ht = w('c1c', 'hotel');
    const hp = w('c1c', 'hardly');
    const jh = w('c1d', 'hopkins');
    const fd = w('c1d', 'four');
    const tn = w('c1d', 'ten');
    const ng = w('c1e', 'negotiation');
    const mk = w('c1f', 'market');
    const hd = w('c1f', 'hundred');
    const tr = w('c1f', 'tourist');
    const ni = w('c1g', 'insurance');
    const fl = w('c1g', 'full');
    q(cm, 'stamp', 0.7);
    q(pl, 'pop', 0.4);
    q(bd, 'pop', 0.4);
    q(hr, 'pop', 0.4);
    q(tt, 'paper', 0.6);
    q(nb, 'buzz', 0.5);
    q(ht, 'pop', 0.5);
    q(hp, 'ding', 0.4);
    q(jh, 'paper', 0.5);
    q(fd, 'cash', 0.7);
    q(tn, 'thud', 0.6);
    q(ng, 'ding', 0.6);
    q(mk, 'crowd', 0.4);
    q(hd, 'cash', 0.6);
    q(tr, 'boing', 0.6);
    q(ni, 'pop', 0.5);
    q(fl, 'thud', 0.7);
    const rows: [string, string, number][] = [['Aspirin, 1 tablet', '$40', pl], ['Bandage', '$95', bd], ['Bed, per hour', '$310', hr], ['...and 30,000 more', '...', tt]];
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={120} s={P('c1a') * bump(cm)}><Text size={56}>{f >= cm ? 'THE CHARGEMASTER' : "the hospital's giant price list"}</Text></G2>
            <G2 x={900} y={560} s={P('c1a', 2)}>
              <rect x={-420} y={-320} width={840} height={640} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
              {rows.map(([a, b, at], i) => (
                <g key={a} opacity={f >= at ? 1 : 0.35}>
                  <rect x={-390} y={-270 + i * 140} width={780} height={110} rx={12} fill={f >= at && i === rows.filter((r) => f >= r[2]).length - 1 ? C.yellow : '#F4F6FA'} />
                  <Text x={-360} y={-212 + i * 140} size={40} anchor="start">{a}</Text>
                  <Text x={360} y={-212 + i * 140} size={44} anchor="end" color={C.red}>{b}</Text>
                </g>
              ))}
            </G2>
            <Dave f={f} x={1620} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}, {at: tt, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <G2 x={1620} y={400} s={P('c1a', 4)}><Text size={30} color="#5B6470">(example prices)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <HotelDoor x={620} y={560} s={1.1 * P('c1c') * bump(ht, 0.1)} lit={lit(ht)} />
            <G2 x={1300} y={300} s={P('c1c', 2) * bump(nb)}><Text size={52}>almost NOBODY pays it</Text></G2>
            {[0, 1, 2].map((i) => <Stick key={i} f={f} x={1120 + i * 200} y={880} s={0.8 * P('c1c', 3 + i)} acc={i === 1 ? ['cap'] : ['ponytail']} seed={70 + i} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.8}, {at: hp, pose: 'shrug', expr: 'happy', look: -0.8}]} />)}
            <XMark x={1320} y={520} s={0.5 * pop(f, hp)} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c1d')}><Text size={52}>charged for every $1 of actual cost</Text></G2>
            <line x1={420} y1={800} x2={1500} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {[['REAL COST', '$1', 60, C.green, A('c1d')], ['AVERAGE CHARGE', '$4.32', 260, C.red, fd], ['SOME HOSPITALS', '$10+', 560, C.red, tn]].map(([l, v, h, c, at], i) => (
              <G2 key={String(l)} x={600 + i * 360} y={800} s={P('c1d', 2 + i * 2)} o={lit(Number(at))}>
                <Bar h={40 + ease(f, Number(at) - 4, Number(at) + 14, 0, 1) * Number(h)} w={220} color={String(c)} label={String(l)} value={f >= Number(at) ? String(v) : '?'} />
              </G2>
            ))}
            <Dave f={f} x={1720} y={900} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: tn, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={jh} text="Bai & Anderson (Johns Hopkins), Health Affairs 2015/2016: avg charge-to-cost 4.32" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={P('c1e')}><Text size={54}>why a fake price?</Text></G2>
            <PriceTag x={600} y={520} s={1.8 * P('c1e', 2)} text="$40" color={C.red} />
            <path d="M 820 520 L 1080 520" stroke={C.ink} strokeWidth={10} strokeLinecap="round" opacity={lit(ng)} />
            <path d="M 1080 520 l -30 -24 l 0 48 Z" fill={C.ink} opacity={lit(ng)} />
            <G2 x={1360} y={520} s={P('c1e', 3) * bump(ng)} o={lit(ng)}><Box w={500} h={200} fill={C.yellow} /><Text size={46}>starting point for</Text><Text y={60} size={46}>a negotiation</Text></G2>
            <Banker f={f} x={1360} y={900} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'smug', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <MarketStall x={760} y={822} s={P('c1f') * bump(mk, 0.05)} />
            <TShirt x={760} y={640} s={0.8 * P('c1f', 2)} tag={f >= hd ? '$100' : '$?'} />
            <Stick f={f} x={1060} y={822} s={1} acc={['fedora']} seed={52} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}]} />
            <Dave f={f} x={1480} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: tr, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <G2 x={1480} y={330} s={P('c1f', 3) * bump(tr)} o={lit(tr)}><Box w={620} h={110} fill={f >= ni ? '#FDE3EA' : C.yellow} /><Text size={40}>{f >= ni ? 'tourist = no insurance' : 'the tourist pays full price'}</Text></G2>
            <Stamp x={1480} y={520} s={pop(f, fl, 9, 260)} text="FULL LIST PRICE" size={44} color={C.red} r={-6} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Secret deals ============
  {
    const dc = w('c2a', 'discounts');
    const on = w('c2a', 'one');
    const sc = w('c2b', 'scan');
    const wd = w('c2b', 'wildly');
    const rn = w('c2c', 'rand');
    const tf = w('c2c', 'two');
    const me = w('c2c', 'medicare');
    const ol = w('c2d', 'older');
    const bg = w('c2d', 'bargain');
    const pw = w('c2d', 'power');
    const cs = w('c2e', 'costs');
    const cr = w('c2e', 'critics');
    const nm = w('c2e', 'numbers');
    q(dc, 'paper', 0.5);
    q(on, 'pop', 0.5);
    q(sc, 'pop', 0.5);
    q(wd, 'boing', 0.6);
    q(rn, 'paper', 0.5);
    q(tf, 'thud', 0.7);
    q(me, 'ding', 0.5);
    q(ol, 'pop', 0.5);
    q(bg, 'pop', 0.5);
    q(pw, 'thud', 0.6);
    q(cs, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(nm, 'stamp', 0.6);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Hospital x={560} y={822} s={0.7 * P('c2a')} name="HOSPITAL A" />
            <Hospital x={1360} y={822} s={0.7 * P('c2a', 2)} name="HOSPITAL B" color="#FFF3C4" />
            <G2 x={960} y={160} s={P('c2a', 3) * bump(dc)}><Text size={50}>secret deals, one hospital at a time</Text></G2>
            <G2 x={560} y={300} s={P('c2a', 4) * bump(wd)} o={lit(sc)}><PriceTag s={1.2} text={V(wd, 'SCAN: $')} color={C.green} /></G2>
            <G2 x={1360} y={300} s={P('c2a', 5) * bump(wd)} o={lit(sc)}><PriceTag s={1.2} text={V(wd, 'SCAN: $$$')} color={C.red} /></G2>
            <G2 x={960} y={440} s={P('c2a', 6)} o={lit(wd)}><Text size={38}>same city · same insurance</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c2c')}><Text size={52}>same care, same hospital: who pays what?</Text></G2>
            <line x1={400} y1={800} x2={1300} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={600} y={800} s={P('c2c', 2) * bump(me, 0.08)}><Bar h={200} w={260} color={C.blue} label="MEDICARE" value="100%" /></G2>
            <G2 x={1080} y={800} s={P('c2c', 3) * bump(tf, 0.08)} o={lit(tf)}><Bar h={40 + ease(f, tf - 4, tf + 16, 0, 468)} w={260} color={C.red} label="PRIVATE PLANS" value={V(tf, '254%')} /></G2>
            <Grandma f={f} x={1560} y={880} s={0.9 * P('c2c', 4)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}]} />
            <G2 x={1560} y={400} s={P('c2c', 5)} o={lit(ol)}><Bubble text="Medicare = the plan for 65+" size={32} tail="down" /></G2>
            <G2 x={1560} y={220} s={P('c2c', 6) * bump(pw)} o={lit(bg)}><Text size={38} color={C.red}>big hospitals = big bargaining power</Text></G2>
            <SourceTag f={f} at={rn} text="RAND Hospital Price Transparency Study, Round 5 (2024): 254% of Medicare (2022)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={880} s={P('c2e')} tilt={f < cr ? -6 : f < nm ? 6 : 0} left="Medicare pays too little" right="market power" />
            <G2 x={660} y={620} s={P('c2e', 2) * bump(cs)}><Hospital s={0.3} /></G2>
            <G2 x={1260} y={620} s={P('c2e', 3) * bump(cr)} o={lit(cr)}><MoneyStack n={4} s={0.6} label="" /></G2>
            <G2 x={660} y={250} s={P('c2e', 4)}><Text size={36}>hospitals say</Text></G2>
            <G2 x={1260} y={250} s={P('c2e', 4)} o={lit(cr)}><Text size={36}>critics say</Text></G2>
            <G2 x={960} y={130} s={P('c2e', 5) * bump(nm)} o={lit(nm)}><Box w={960} h={100} fill={C.yellow} /><Text size={42}>a debate. Now you know the numbers.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Middlemen ============
  {
    const rc = w('c3a', 'raccoon');
    const sw = w('c3a', 'swipe');
    const fw = w('c3a', 'few');
    const ic = w('c3b', 'insurance');
    const pr = w('c3b', 'premiums');
    const pb = w('c3b', 'bills');
    const ei = w('c3c', 'eighty');
    const pf = w('c3c', 'profit');
    const pm = w('c3d', 'pharmacy');
    const dm = w('c3d', 'drug');
    const ph = w('c3d', 'pharmacies');
    const pc = w('c3d', 'price');
    const ft = w('c3e', 'federal');
    const tr = w('c3e', 'three');
    const e8 = w('c3e', 'eighty');
    const gn = w('c3f', 'generic');
    const th = w('c3f', 'thousands');
    const sv = w('c3f', 'seven');
    const sa = w('c3g', 'save');
    const mz = w('c3g', 'maze');
    const hd = w('c3g', 'hide');
    q(rc, 'boing', 0.6);
    q(sw, 'coin', 0.6);
    q(fw, 'pop', 0.5);
    q(ic, 'pop', 0.5);
    q(pr, 'cash', 0.5);
    q(pb, 'paper', 0.5);
    q(ei, 'ding', 0.6);
    q(pf, 'cash', 0.6);
    q(pm, 'pop', 0.5);
    q(dm, 'pop', 0.4);
    q(ph, 'pop', 0.4);
    q(pc, 'ding', 0.5);
    q(tr, 'ding', 0.6);
    q(e8, 'thud', 0.7);
    q(gn, 'pop', 0.5);
    q(th, 'thud', 0.7);
    q(sv, 'cash', 0.7);
    q(sa, 'pop', 0.5);
    q(mz, 'whoosh_s', 0.5);
    q(hd, 'boing', 0.6);
    scene(A('c3a'), () =>
      f < A('c3b') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <TollBooth x={900} y={822} s={P('c3a')} barUp={0} label="HEALTH $" />
            <Raccoon f={f} x={900} y={740} s={0.9 * P('c3a', 2) * bump(rc, 0.2)} mood="sneaky" holdCoin={f >= sw} hood />
            <G2 x={400} y={300} s={P('c3a', 3)}><Frame w={380} h={200} label="ep. 2"><Text size={36}>credit card raccoon</Text></Frame></G2>
            <G2 x={1400} y={250} s={P('c3a', 4) * bump(fw)} o={lit(fw)}><Text size={52}>health care has a FEW raccoons</Text></G2>
            <Dave f={f} x={1500} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3b')}><Text size={52}>raccoon #1: your insurance company</Text></G2>
            <Shield x={400} y={480} s={1.1 * P('c3b', 2) * bump(ic)} top="INSURER" big="$" />
            {[['collects premiums', pr], ['negotiates prices', pr], ['pays the bills', pb]].map(([l, at], i) => (
              <G2 key={String(l)} x={400} y={700 + i * 70} s={P('c3b', 3 + i)} o={lit(Number(at))}><Text size={34}>{String(l)}</Text></G2>
            ))}
            <SlicePie x={1300} y={520} s={P('c3b', 4) * bump(ei, 0.1)} rad={280} t={1} slices={[{v: 0.8, c: C.green, l: f >= ei ? 'CARE 80-85%' : ''}, {v: 0.2, c: C.red, l: f >= pf ? 'overhead + profit' : ''}]} pop={f >= pf ? 1 : -1} />
            <G2 x={1300} y={880} s={P('c3b', 5)} o={lit(ei)}><Text size={34}>by law: most insurers spend 80-85% on care</Text></G2>
            <SourceTag f={f} at={ei} text="ACA medical loss ratio rule: 80% (individual/small group), 85% (large group)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3d') * bump(pm)}><Text size={52}>raccoon #2: pharmacy benefit managers (PBMs)</Text></G2>
            {[['DRUG MAKER', dm, 360], ['INSURER', pm, 960], ['PHARMACY', ph, 1560]].map(([l, at, x]) => (
              <G2 key={String(l)} x={Number(x)} y={700} s={P('c3d', 2)} o={lit(Number(at))}><Box w={380} h={140} /><Text size={40}>{String(l)}</Text></G2>
            ))}
            <Raccoon f={f} x={660} y={500} s={0.6 * P('c3d', 3)} mood="sneaky" />
            <Raccoon f={f} x={1260} y={500} s={0.6 * P('c3d', 4)} mood="sneaky" holdCoin={f >= pc} />
            <G2 x={960} y={330} s={P('c3d', 5) * bump(pc)} o={lit(pc)}><Box w={740} h={90} fill={C.yellow} /><Text size={38}>decide which drugs & what price</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c3e')}><Text size={52}>what the FTC found</Text></G2>
            <SlicePie x={520} y={520} s={P('c3e', 2) * bump(e8, 0.1)} rad={280} t={1} slices={[{v: 0.79, c: C.red, l: f >= e8 ? 'BIG 3' : ''}, {v: 0.21, c: '#C9CED6', l: 'others'}]} pop={f >= e8 ? 0 : -1} />
            <Panel x={520} y={880} w={620} h={120} title="" value={V(e8, '~80% of prescriptions')} color={C.red} size={46} s={P('c3e', 3) * bump(tr)} />
            <Panel x={1360} y={380} w={640} h={240} title="SOME GENERIC DRUGS" value={V(th, '+1,000s %')} color={C.red} size={96} s={P('c3e', 4) * bump(th)} o={lit(gn)} />
            <Panel x={1360} y={680} w={640} h={240} title="MARKUPS, 2017-2022" value={V(sv, '$7.3 billion')} color={C.red} size={90} s={P('c3e', 5) * bump(sv)} />
            <SourceTag f={f} at={ft} until={gn} text="FTC PBM interim report (July 2024): top 3 PBMs ≈ 80% of prescriptions (2023)" />
            <SourceTag f={f} at={gn} text="FTC second interim report (Jan 2025): specialty generic markups ≈ $7.3B" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Maze x={1000} y={540} s={1.1 * P('c3g') * bump(mz, 0.05)} t={ease(f, A('c3g'), hd, 0, 1)} />
            <Raccoon f={f} x={1180} y={560} s={0.5 * P('c3g', 2) * bump(hd, 0.3)} mood="sneaky" holdCoin />
            <Stick f={f} x={300} y={880} s={1} acc={['tie']} seed={83} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}]} />
            <G2 x={300} y={380} s={P('c3g', 3) * bump(sa)}><Bubble text="we SAVE you money!" size={34} tail="down" /></G2>
            <G2 x={1000} y={120} s={P('c3g', 4)} o={lit(mz)}><Text size={48}>a complicated maze = great hiding spot</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 America pays double ============
  {
    const ft = w('c4a', 'five');
    const eg = w('c4a', 'eighteen');
    const pp = w('c4b', 'person');
    const ff = w('c4b', 'fifteen');
    const ls = w('c4c', 'less');
    const pk = w('c4c', 'peterson');
    const sv = w('c4c', 'seven');
    const hf = w('c4c', 'half');
    const mt = w('c4d', 'more');
    const np = w('c4d', 'nope');
    const pr = w('c4d', 'prices');
    const hc = w('c4e', 'hospital');
    const dc = w('c4e', 'doctors');
    const rx = w('c4e', 'prescription');
    const gp = w('c4f', 'government');
    const wl = w('c4f', 'waiting');
    const pq = w('c4f', 'political');
    q(ft, 'cash', 0.6);
    q(eg, 'thud', 0.6);
    q(ff, 'ding', 0.6);
    q(ls, 'pop', 0.5);
    q(sv, 'ding', 0.6);
    q(hf, 'stamp', 0.6);
    q(mt, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(pr, 'cash', 0.7);
    q(hc, 'pop', 0.5);
    q(dc, 'pop', 0.5);
    q(rx, 'pop', 0.5);
    q(gp, 'pop', 0.5);
    q(wl, 'tick', 0.5);
    q(pq, 'stamp', 0.6);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={180} y={180} s={0.5 * P('c4a')} top="U.S." year={2024} flip={0} />
            <Panel x={620} y={420} w={640} h={240} title="TOTAL HEALTH SPENDING" value={V(ft, '$5.3 trillion')} color={C.red} size={90} s={P('c4a', 2) * bump(ft)} />
            <SlicePie x={1420} y={440} s={P('c4a', 3) * bump(eg, 0.1)} rad={240} t={1} slices={[{v: 0.18, c: C.red, l: f >= eg ? '18%' : ''}, {v: 0.82, c: '#C9CED6', l: 'rest of economy'}]} pop={f >= eg ? 0 : -1} />
            <Panel x={620} y={760} w={640} h={220} title="PER PERSON" value={V(ff, '$15,474')} color={C.red} size={90} s={P('c4a', 4) * bump(ff)} o={lit(pp)} />
            <SourceTag f={f} at={ft} text="CMS National Health Expenditures 2024 (Dec 2025): $5.3T, 18.0% of GDP, $15,474/person" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c4c')}><Text size={52}>health spending per person (2024)</Text></G2>
            <line x1={420} y1={820} x2={1500} y2={820} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={700} y={820} s={P('c4c', 2)}><Bar h={560} w={280} color={C.red} label="U.S." value="$14,885" /></G2>
            <G2 x={1220} y={820} s={P('c4c', 3) * bump(sv, 0.08)} o={lit(ls)}><Bar h={40 + ease(f, sv - 4, sv + 16, 0, 237)} w={280} color={C.green} label="SIMILAR RICH COUNTRIES" value={V(sv, '$7,371')} /></G2>
            <Stamp x={1580} y={330} s={pop(f, hf, 9, 260)} text="~HALF" size={60} color={C.green} r={-8} />
            <SourceTag f={f} at={pk} text="Peterson-KFF Health System Tracker (OECD data, 2024)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('c4d') * bump(mt)}><Text size={48}>{f >= np ? 'myth!' : '"Americans just go to the doctor more"'}</Text></G2>
            <Stamp x={960} y={300} s={pop(f, np, 9, 260)} text="NOPE" size={70} color={C.red} r={-8} />
            <Frame x={560} y={620} s={P('c4d', 2)} w={520} h={420} label="HOW MUCH CARE">
              <Text y={-20} size={60}>about the same</Text>
              <Text y={60} size={40} color="#5B6470">(or less)</Text>
            </Frame>
            <Frame x={1360} y={620} s={P('c4d', 3) * bump(pr)} o={lit(pr)} w={520} h={420} label="THE PRICES">
              <PriceTag s={1.4} y={-10} text="$$$$" color={C.red} />
            </Frame>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c4e')}><Text size={52}>where the $5.3 trillion goes</Text></G2>
            <SlicePie x={620} y={560} s={P('c4e', 2)} rad={320} t={1} slices={[{v: 0.31, c: C.red, l: f >= hc ? 'HOSPITALS' : ''}, {v: 0.21, c: C.blue, l: f >= dc ? 'DOCTORS' : ''}, {v: 0.09, c: C.gold, l: f >= rx ? 'DRUGS' : ''}, {v: 0.39, c: '#C9CED6', l: 'everything else'}]} pop={f >= rx ? 2 : f >= dc ? 1 : f >= hc ? 0 : -1} />
            {[['Hospital care', '31%', hc], ['Doctors & clinics', '21%', dc], ['Prescription drugs', '9%', rx]].map(([l, v, at], i) => (
              <G2 key={String(l)} x={1400} y={330 + i * 170} s={P('c4e', 3 + i) * bump(Number(at))} o={lit(Number(at))}>
                <Box w={640} h={130} fill={f >= Number(at) ? C.yellow : '#fff'} />
                <Text x={-280} y={2} size={40} anchor="start">{String(l)}</Text>
                <Text x={280} y={2} size={50} anchor="end" color={C.red}>{String(v)}</Text>
              </G2>
            ))}
            <SourceTag f={f} at={hc} text="CMS NHE 2024: hospital 31%, physician & clinical 21%, retail Rx 9%" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={880} s={P('c4f')} tilt={f < wl ? -6 : 0} left="lower prices" right="waiting lists · taxes" />
            <G2 x={660} y={620} s={P('c4f', 2) * bump(gp)}><Flag kind="uk" s={0.6} /></G2>
            <G2 x={1260} y={620} s={P('c4f', 3) * bump(wl)}><Flag kind="jp" s={0.6} /></G2>
            <Dave f={f} x={220} y={880} s={1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: pq, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={960} y={130} s={P('c4f', 4) * bump(pq)}><Box w={1140} h={110} fill={f >= pq ? C.yellow : '#fff'} /><Text size={46}>a political question. Now you know the numbers.</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Surprise ============
  {
    const sc = w('c5a', 'scariest');
    const sb = w('c5a', 'surprise');
    const rt = w('c5b', 'right');
    const dr = w('c5b', 'doctor');
    const sp = w('c5b', 'separate');
    const ml = w('c5c', 'millions');
    const nsa = w('c5c', 'surprises');
    const bp = w('c5c', 'both');
    const em = w('c5d', 'emergency');
    const nr = w('c5d', 'normal');
    const xt = w('c5e', 'extra');
    const wr = w('c5e', 'writing');
    const ge = w('c5f', 'estimate');
    const fh = w('c5f', 'four');
    const ds = w('c5f', 'dispute');
    const ct = w('c5g', 'catch');
    const gm = w('c5g', 'ambulances');
    q(sc, 'sting', 0.6);
    q(sb, 'boing', 0.6);
    q(rt, 'ding', 0.5);
    q(dr, 'pop', 0.5);
    q(sp, 'mail', 0.7);
    q(ml, 'crowd', 0.4);
    q(nsa, 'stamp', 0.7);
    q(bp, 'ding', 0.5);
    q(em, 'pop', 0.5);
    q(nr, 'ding', 0.6);
    q(xt, 'buzz', 0.5);
    q(wr, 'scribble', 0.6);
    q(ge, 'paper', 0.5);
    q(fh, 'cash', 0.6);
    q(ds, 'stamp', 0.6);
    q(ct, 'sting', 0.5);
    q(gm, 'buzz', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Hospital x={560} y={822} s={0.75 * P('c5a')} name="IN-NETWORK" color="#E3F6EC" />
            <Dave f={f} x={1000} y={822} s={1.05} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.8}, {at: sp, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= sp} />
            <Doc f={f} x={1260} y={822} s={1 * P('c5a', 2)} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}]} />
            <G2 x={1260} y={380} s={P('c5a', 3) * bump(dr)} o={lit(dr)}><Box w={380} h={90} fill="#FDE3EA" /><Text size={34} color={C.red}>OUT of network</Text></G2>
            <HospitalBill x={1620} y={560} s={P('c5a', 4) * bump(sp)} o={lit(sp)} />
            <G2 x={960} y={150} s={P('c5a', 1) * bump(sc)}><Text size={60}>THE SURPRISE BILL</Text></G2>
            <Check x={560} y={260} s={1.2 * pop(f, rt)} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={180} y={180} s={0.5 * P('c5c')} top="LAW" year={2022} flip={0} />
            <G2 x={960} y={140} s={P('c5c', 2) * bump(nsa)}><Stamp text="NO SURPRISES ACT" size={70} color={C.blue} r={-3} /></G2>
            <G2 x={960} y={250} s={P('c5c', 3)} o={lit(bp)}><Text size={36} color="#5B6470">passed with support from both parties</Text></G2>
            <Row x={220} y={420} s={0.9 * P('c5c', 4) * bump(nr, 0.05)} n={1} text="Emergency care: you pay your normal in-network share" lit={f >= em ? 1 : 0.35} color={C.blue} w={1480} />
            <Row x={220} y={580} s={0.9 * P('c5c', 5) * bump(xt, 0.05)} n={2} text="In-network hospital: no surprise extra bill" lit={f >= xt ? 1 : 0.35} color={C.blue} w={1480} />
            <Row x={220} y={740} s={0.9 * P('c5c', 6) * bump(wr, 0.05)} n={3} text="...unless you agreed in writing ahead of time" lit={f >= wr ? 1 : 0.35} color={C.gold} w={1480} />
            <SourceTag f={f} at={nsa} text="CMS: No Surprises Act, in effect since Jan 1, 2022" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c5f')}><Text size={52}>no insurance? ask for a good faith estimate</Text></G2>
            <G2 x={560} y={520} s={P('c5f', 2) * bump(ge)}><Receipt lines={[['Stitches', '$600'], ['Room', '$900'], ['Supplies', '$150']]} total="ESTIMATE $1,650" /></G2>
            <G2 x={1320} y={500} s={P('c5f', 3) * bump(fh)}><Box w={620} h={260} fill={f >= fh ? '#FDE3EA' : '#fff'} /><Text y={-60} size={36} color="#5B6470">bill is higher by</Text><Text y={30} size={80} color={C.red}>{V(fh, '$400+ ?')}</Text></G2>
            <Stamp x={1320} y={780} s={pop(f, ds, 9, 260)} text="DISPUTE IT" size={60} color={C.blue} r={-6} />
            <SourceTag f={f} at={fh} text="CMS: patient-provider dispute if bill ≥ $400 above good faith estimate (example numbers)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Ambulance f={f} x={900} y={790} s={1.2 * P('c5g') * bump(gm, 0.08)} />
            <G2 x={900} y={300} s={P('c5g', 2) * bump(ct)}><Text size={56}>one catch...</Text></G2>
            <G2 x={900} y={420} s={P('c5g', 3)} o={lit(gm)}><Box w={900} h={100} fill={C.yellow} /><Text size={42}>ground ambulances: mostly NOT covered</Text></G2>
            <Dave f={f} x={1600} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Deductible ============
  {
    const dd = w('c6a', 'deductible');
    const ys = w('c6b', 'yourself');
    const gt = w('c6b', 'gate');
    const op = w('c6b', 'open');
    const kf = w('c6c', 'according');
    const on = w('c6c', 'one');
    const ft = w('c6c', 'forty');
    const oi = w('c6d', 'one');
    const tw = w('c6d', 'two');
    const tw7 = w('c6e', 'twenty');
    const sx = w('c6e', 'six');
    const pc = w('c6e', 'paychecks');
    const em = w('c6f', 'employer');
    const rs = w('c6f', 'raise');
    const py = w('c6f', 'paying');
    const hr = w('c6g', 'hurts');
    const pk = w('c6g', 'pocket');
    q(dd, 'stamp', 0.6);
    q(ys, 'coin', 0.5);
    q(gt, 'clank', 0.6);
    q(op, 'ding', 0.6);
    q(on, 'cash', 0.6);
    q(ft, 'thud', 0.6);
    q(oi, 'ding', 0.6);
    q(tw, 'thud', 0.5);
    q(tw7, 'cash', 0.7);
    q(sx, 'coin', 0.6);
    q(pc, 'paper', 0.5);
    q(em, 'pop', 0.5);
    q(rs, 'trombone', 0.5);
    q(py, 'thud', 0.5);
    q(hr, 'thud', 0.6);
    q(pk, 'coin', 0.6);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c6a') * bump(dd)}><Text size={60}>THE DEDUCTIBLE</Text></G2>
            <Gate x={1100} y={800} s={1.2 * P('c6a', 2) * bump(gt, 0.05)} open={ease(f, op, op + 20, 0, 1)} label={f >= op ? 'insurance pays now!' : 'you pay first'} />
            <Dave f={f} x={500} y={880} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: ys, pose: 'carry', expr: 'tired', look: 0.8}, {at: op, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <G2 x={500} y={400} s={P('c6a', 3)} o={lit(ys)}><MoneyStack n={4} s={0.7} label="your money" /></G2>
            <Shield x={1600} y={500} s={0.8 * P('c6a', 4)} top="INSURER" big="$" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6c')}><Text size={52}>average deductible, single coverage (work plans)</Text></G2>
            <Panel x={560} y={400} w={640} h={260} title="2025" value={V(on, '$1,886')} color={C.red} size={120} s={P('c6c', 2) * bump(on)} />
            <Panel x={560} y={720} w={640} h={200} title="IN 10 YEARS" value={V(ft, '+43%')} color={C.red} size={90} s={P('c6c', 3) * bump(ft)} />
            <G2 x={1400} y={420} s={P('c6c', 4)} o={lit(oi)}>
              {Array.from({length: 3}).map((_, i) => <Stick key={i} f={f} x={-200 + i * 200} y={200} s={0.7} acc={i === 0 ? ['cap'] : ['hair']} seed={90 + i} keys={[{at: 0, pose: i === 0 && f >= tw ? 'shock' : 'idle', expr: i === 0 && f >= tw ? 'shock' : 'neutral'}]} />)}
              <circle cx={-200} cy={-80} r={70} fill="none" stroke={C.red} strokeWidth={8} opacity={f >= oi ? 1 : 0} />
            </G2>
            <G2 x={1400} y={820} s={P('c6c', 5) * bump(tw)} o={lit(tw)}><Box w={620} h={110} fill={C.yellow} /><Text size={40}>1 in 3: deductible $2,000+</Text></G2>
            <SourceTag f={f} at={kf} text="KFF Employer Health Benefits Survey 2025: $1,886 avg; 34% at $2,000+" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6e')}><Text size={52}>average FAMILY plan through work, per year</Text></G2>
            <Panel x={560} y={380} w={640} h={240} title="TOTAL PREMIUM" value={V(tw7, '$26,993')} color={C.red} size={110} s={P('c6e', 2) * bump(tw7)} />
            <SlicePie x={560} y={760} s={0.6 * P('c6e', 3)} rad={260} t={1} slices={[{v: 0.254, c: C.red, l: f >= sx ? 'YOU' : ''}, {v: 0.746, c: C.blue, l: f >= em ? 'EMPLOYER' : ''}]} pop={f >= em ? 1 : f >= sx ? 0 : -1} />
            <Panel x={1360} y={380} w={600} h={240} title="FROM YOUR PAYCHECK" value={V(sx, '$6,850')} color={C.red} size={100} s={P('c6e', 4) * bump(sx)} o={lit(pc)} />
            <G2 x={1360} y={680} s={P('c6e', 5) * bump(rs)} o={lit(em)}><Box w={600} h={200} fill={f >= rs ? C.yellow : '#fff'} /><Text y={-30} size={38}>employer's ~$20,000</Text><Text y={30} size={38}>= money not in your raise</Text></G2>
            <G2 x={1360} y={870} s={P('c6e', 6)} o={lit(py)}><Text size={38} color={C.red}>you're paying either way</Text></G2>
            <SourceTag f={f} at={tw7} text="KFF EHBS 2025: family premium $26,993, worker share $6,850" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P('c6g')}><Text size={52}>Dave's $3,200 bill (example)</Text></G2>
            <G2 x={960} y={480} s={P('c6g', 2)}>
              <rect x={-700} y={-70} width={1400} height={140} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-694} y={-64} width={1388 * (2000 / 3200) * ease(f, hr - 4, hr + 16, 0.05, 1)} height={128} rx={20} fill={C.red} />
              <rect x={-694 + 1388 * (2000 / 3200)} y={-64} width={1388 * (1200 / 3200) * ease(f, pk, pk + 16, 0, 1)} height={128} rx={20} fill={C.green} />
              <Text x={-260} y={4} size={46} color="#fff">DAVE: $2,000</Text>
              <Text x={460} y={4} size={40} color={f >= pk ? '#fff' : C.ink}>then insurance shares</Text>
            </G2>
            <Dave f={f} x={960} y={900} s={1} keys={[{at: 0, pose: 'hold', expr: 'worried'}, {at: pk, pose: 'facepalm', expr: 'sad'}]} sweat={f >= pk} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Debt ============
  {
    const db = w('c7a', 'debt');
    const tm = w('c7b', 'twenty');
    const tt = w('c7b', 'two');
    const th = w('c7c', 'three');
    const un = w('c7c', 'uninsured');
    const ins = w('c7c', 'insured');
    const cr = w('c7d', 'credit');
    const pd = w('c7d', 'paid');
    const fh = w('c7d', 'five');
    const rl = w('c7e', 'rule');
    const ct = w('c7e', 'court');
    const st = w('c7e', 'states');
    q(db, 'thud', 0.6);
    q(tm, 'crowd', 0.4);
    q(tt, 'cash', 0.7);
    q(th, 'thud', 0.6);
    q(un, 'pop', 0.5);
    q(ins, 'pop', 0.5);
    q(cr, 'paper', 0.5);
    q(pd, 'ding', 0.6);
    q(fh, 'ding', 0.6);
    q(rl, 'paper', 0.5);
    q(ct, 'thud', 0.7);
    q(st, 'pop', 0.5);
    scene(A('c7a'), () =>
      f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c7a') * bump(db)}><Text size={56}>when bills become DEBT</Text></G2>
            <Panel x={560} y={380} w={640} h={240} title="ADULTS WITH MEDICAL DEBT" value={V(tm, '~20 million')} color={C.red} size={96} s={P('c7a', 2) * bump(tm)} />
            <Panel x={1360} y={380} w={640} h={240} title="TOTAL OWED" value={V(tt, '$220 billion+')} color={C.red} size={90} s={P('c7a', 3) * bump(tt)} />
            <Panel x={560} y={720} w={640} h={220} title="OWE OVER $10,000" value={V(th, '~3 million')} color={C.red} size={86} s={P('c7a', 4) * bump(th)} />
            <G2 x={1360} y={720} s={P('c7a', 5) * bump(ins)} o={lit(un)}><Box w={640} h={220} fill={f >= ins ? C.yellow : '#fff'} /><Text y={-30} size={40}>not just the uninsured</Text><Text y={40} size={36} color="#5B6470">{f >= ins ? 'deductibles hit insured people too' : ''}</Text></G2>
            <SourceTag f={f} at={tm} text="Peterson-KFF: ~20M adults owe medical debt, ≥ $220B total, ~3M owe > $10,000" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={480} s={P('c7d') * bump(cr)}>
              <rect x={-300} y={-300} width={600} height={600} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-240} size={40}>CREDIT REPORT</Text>
              {[['Paid medical debt', pd], ['Medical debt < $500', fh], ['Other medical debt', 1e9]].map(([l, at], i) => (
                <g key={String(l)}>
                  <Text x={-260} y={-120 + i * 130} size={34} anchor="start" color={f >= Number(at) ? '#9AA5B1' : C.ink}>{String(l)}</Text>
                  {f >= Number(at) && <line x1={-270} y1={-122 + i * 130} x2={200} y2={-122 + i * 130} stroke={C.green} strokeWidth={8} />}
                  {f >= Number(at) && <Check x={240} y={-122 + i * 130} s={0.7} />}
                </g>
              ))}
            </G2>
            <G2 x={1400} y={300} s={P('c7d', 2)} o={lit(pd)}><Box w={680} h={120} fill="#E3F6EC" /><Text size={38}>2023: credit bureaus removed these</Text></G2>
            <G2 x={1400} y={520} s={P('c7d', 3) * bump(ct)} o={lit(rl)}><Box w={680} h={140} fill={f >= ct ? '#FDE3EA' : '#fff'} /><Text y={-20} size={36}>federal rule to remove ALL:</Text><Text y={30} size={40} color={C.red}>{V(ct, 'struck down, 2025')}</Text></G2>
            <G2 x={1400} y={720} s={P('c7d', 4) * bump(st)} o={lit(st)}><Text size={38}>some states: their own rules</Text></G2>
            <SourceTag f={f} at={pd} text="Equifax/Experian/TransUnion 2023 · CFPB rule vacated, E.D. Texas, July 11, 2025" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Fight back ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f'), bs('c8g')];
    const ea = w('c8a', 'education');
    const tn = w('c8d', 'twenty');
    const rm = w('c8g', 'removed');
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ea, 'stamp', 0.5);
    q(tn, 'cash', 0.5);
    q(rm, 'stamp', 0.7);
    const items = ['Ask for an itemized bill', 'Call & negotiate (cash price, payment plan)', 'Ask about financial assistance', 'Check prices before planned care', 'Know your No Surprises rights'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={700} y={90} s={P('c8a')}><Text size={54}>How Dave fought back</Text></G2>
          <G2 x={700} y={148} s={P('c8a', 1) * bump(ea)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={80} y={250 + i * 130} s={0.82 * P('c8a', 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.blue} w={1260} />)}
          {cur > 1 && Array.from({length: Math.min(5, cur - 1)}).map((_, i) => <Check key={i} x={1100} y={250 + i * 130} s={0.7} />)}
          <G2 x={1620} y={540} s={P('c8a', 4)}>
            <Frame w={440} h={620}>
              {cur === 0 && <Dave f={f} x={0} y={200} s={0.8} keys={[{at: 0, pose: 'talk', expr: 'happy'}]} />}
              {cur === 1 && <g><Receipt s={0.7} y={-20} lines={[['Aspirin', '$40'], ['Gauze', '$28'], ['Code 99284', '$$$']]} total="" /><Magnifier x={80} y={60} s={0.6} /></g>}
              {cur === 2 && <g><Phone s={0.8} y={-40} title="BILLING" value="-$$$" color={C.green} /><Text y={230} size={30}>just ask!</Text></g>}
              {cur === 3 && <g><Hospital s={0.4} y={40} name="NONPROFIT" /><Text y={120} size={30}>tax breaks:</Text><Text y={170} size={40} color={C.red}>{f >= tn ? '~$28B/yr' : '?'}</Text><Text y={220} size={24} color="#5B6470">KFF, 2020</Text></g>}
              {cur === 4 && <g><PriceTag s={1} y={-80} text="PRICE LIST" /><Text y={60} size={30}>hospital websites</Text><Text y={110} size={30}>+ insurer cost tools</Text></g>}
              {cur === 5 && <g><Shield s={0.9} y={-40} top="NO" big="SURPRISES" /><Text y={180} size={28}>federal help desk</Text><Text y={220} size={28}>1-800-985-3059</Text></g>}
              {cur === 6 && <g><Text y={-160} size={34}>Dave's bill:</Text><Text y={-80} size={50} color="#9AA5B1">$3,200</Text><line x1={-110} y1={-84} x2={110} y2={-84} stroke={C.red} strokeWidth={8} /><Text y={10} size={56} color={C.green}>under $2,000</Text><Stamp y={150} s={pop(f, rm, 9, 260)} text="ASPIRIN: REMOVED" size={30} color={C.red} r={-6} /></g>}
            </Frame>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Recap ============
  const recap = ['List prices = starting point · private plans pay ~2.5x Medicare', 'Middlemen take a cut · U.S. spends ~2x per person, mostly prices', 'Itemized bill · negotiate · financial aid · No Surprises Act'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const cur = r.filter((x) => f >= x).length;
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P('d1a')}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={160} y={380 + i * 170} s={P('d1a', 2 + i * 2) * (cur === i + 1 ? bump(r[i], 0.06) : 1)} n={i + 1} text={b} lit={cur >= i + 1 ? 1 : 0.35} color={C.blue} w={1600} />)}
          <Dave f={f} x={1780} y={900} s={0.6} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Comment + subscribe ============
  {
    const wc = w('d1e', 'weirdest');
    const cm = w('d1e', 'comments');
    const sb = w('d1f', 'subscribe');
    const fr = w('d1f', 'free');
    const as = w('d1f', 'aspirin');
    q(wc, 'pop', 0.6);
    q(cm, 'mail', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    q(as, 'pop', 0.5);
    scene(A('d1e'), () =>
      f < A('d1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={400} y={880} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
            <HospitalBill x={400} y={400} s={0.9 * P('d1e') * bump(wc)} />
            <G2 x={1200} y={460} s={P('d1e', 2) * bump(cm, 0.08)}>
              <Box w={900} h={300} />
              <circle cx={-360} cy={-70} r={40} fill={C.gray} stroke={C.ink} strokeWidth={4} />
              <Text x={-300} y={-70} size={32} anchor="start" color="#5B6470">you · just now</Text>
              <Text x={-400} y={20} size={46} anchor="start">Weirdest charge: ______</Text>
              <rect x={220} y={80} width={180} height={50} rx={25} fill={f >= cm ? C.blue : C.gray} />
              <Text x={310} y={106} size={28} color="#fff">COMMENT</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * P('d1f')} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={P('d1f', 2)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Pill x={1560} y={780} s={0.8 * P('d1f', 3) * bump(as, 0.3)} label="$0" />
            <G2 x={960} y={680} s={P('d1f', 3)}><Text size={44} color={f >= fr ? C.green : C.ink}>price: $0 · no deductible · no surprises</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c2c', 'hospitals') + 20;
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
