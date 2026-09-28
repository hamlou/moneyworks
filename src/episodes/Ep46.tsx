import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Arrow, Bank, Bill, Bubble, Calendar, Coin, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Phone, Row, Shield, CreditCard, SubButton, Bell, Badge} from '../props2';
import {Shop, HospitalBill} from '../props3';
import {Cat, House} from '../props4';
import {MemberCard, Scale, PriceBoard, Receipt} from '../props8';
import {Dog, Cone, VetClinic, Xray} from '../props46';
import {CapacityDots} from '../props45';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Vet: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={60} {...p} />;
const PE: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

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

const Pill: React.FC<{x: number; y: number; w: number; text: string; on: boolean; s?: number; color?: string; size?: number}> = ({x, y, w, text, on, s = 1, color = C.yellow, size = 40}) => (
  <G2 x={x} y={y} s={s} o={on ? 1 : 0.4}>
    <rect x={-w / 2} y={-44} width={w} height={88} rx={20} fill={on ? color : '#fff'} stroke={C.ink} strokeWidth={5} />
    <Text y={3} size={size}>{text}</Text>
  </G2>
);

export const Ep46: React.FC = () => {
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
    const yelps = w('o1', 'yelps');
    const wont = w('o1', 'wont');
    const leg = w('o1', 'leg');
    q(2, 'pop', 0.6);
    q(yelps, 'buzz', 0.6);
    q(wont, 'thud', 0.5);
    q(leg, 'sting', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Cat f={f} x={1650} y={980} s={0.55} mood="old" />
          <G2 x={1650} y={840} o={lt(leg, 0)}><Text size={28} color={GRAY}>unimpressed</Text></G2>
          <Dog f={f} x={680} y={880} s={1.25 * P(0) * bump(yelps, 0.1)} mood="hurt" limp={f >= wont ? 1 : 0} />
          <Dave f={f} x={1150} y={900} s={1.1} keys={[{at: 0, pose: 'relax', expr: 'happy', look: -0.8}, {at: yelps, pose: 'shock', expr: 'shock', look: -0.8}]} />
          <G2 x={1150} y={480} s={P(0) * bump(leg)} o={lt(leg, 0.4)}><Bubble text="Biscuit, buddy?!" size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const surgery = w('o2', 'surgery');
    const today = w('o2', 'today');
    const price = w('o2', 'price');
    q(surgery, 'stamp', 0.6);
    q(today, 'ding', 0.5);
    q(price, 'cash', 0.6);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <VetClinic x={520} y={780} s={0.65 * P(A('o2'))} name="VET CLINIC" />
          <Vet f={f} x={1080} y={900} s={1.05} keys={[{at: 0, pose: 'present', expr: 'neutral', look: -0.8}, {at: surgery, pose: 'point_l', expr: 'worried'}]} />
          <Dog f={f} x={780} y={960} s={0.9} mood="hurt" />
          <G2 x={1080} y={480} s={P(A('o2')) * bump(surgery)} o={lt(surgery, 0.4)}><Bubble text={f >= today ? 'surgery. today.' : 'surgery...'} size={44} tail="down" /></G2>
          <Dave f={f} x={1560} y={900} s={1.05} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}, {at: price, pose: 'point_l', expr: 'shock'}]} />
          <G2 x={1560} y={520} s={bump(price)} o={lt(price, 0.4)}><Bubble text="how much...?" size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const two = w('o3', 'two');
    const dog = w('o3', 'dog');
    q(two, 'thud', 0.8);
    q(dog, 'trombone', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Stamp x={960} y={420} s={pop(f, two)} text="$2,000" size={140} color={C.red} r={-4} />
          <G2 x={960} y={680} s={bump(dog)} o={lt(dog, 0.4)}><Text size={54}>for a dog</Text></G2>
          <Dave f={f} x={960} y={960} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const loves = w('o4', 'loves');
    const rent = w('o4', 'rent');
    const why = w('o5', 'why');
    const payment = w('o5', 'payment');
    q(loves, 'sparkle', 0.4);
    q(rent, 'buzz', 0.7);
    q(why, 'ding', 0.5);
    q(payment, 'boing', 0.6);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dog f={f} x={480} y={900} s={1} mood="cone" />
          <Cone x={480} y={900} s={1.05} />
          <G2 x={480} y={500} s={P(A('o4')) * bump(loves)}><Text size={40} color={C.red}>Dave loves Biscuit</Text></G2>
          <Box x={1300} y={560} w={640} h={340} s={P(A('o4')) * bump(rent, 0.1)} o={lt(rent, 0.45)} fill={f >= rent ? '#FFE3EA' : '#fff'}>
            <Text x={-260} y={-80} size={38} anchor="start">vet bill</Text>
            <Text x={260} y={-80} size={38} anchor="end">$2,000</Text>
            <line x1={-260} y1={-20} x2={260} y2={-20} stroke={C.ink} strokeWidth={4} />
            <Text x={-260} y={40} size={38} anchor="start" color={C.red}>Dave's rent</Text>
            <Text x={260} y={40} size={38} anchor="end" color={C.red}>$2,000</Text>
          </Box>
          <G2 x={960} y={980} s={P(A('o5')) * bump(why)} o={lt(payment, 0.45)}><Text size={44} color={GRAY}>{f >= payment ? 'a house payment??' : 'why is it...'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'bought'), w('o6', 'sign'), w('o6', 'protect')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    const cur = pv.filter((x) => f >= x).length;
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={120} size={60} color={GRAY}>TODAY</Text>
          {['WHO BOUGHT YOUR VET', 'WHY NO PRICE TAG', 'HOW TO PROTECT YOURSELF'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={560} s={P(A('o6')) * bump(pv[i], 0.08)} o={cur > i ? 1 : 0.45}>
              <Frame w={520} h={520}>
                {i === 0 && <Bank s={0.3} y={100} label="PE" />}
                {i === 1 && <PriceBoard s={0.32} y={-20} rows={[['exam', '?'], ['surgery', '?']]} title="PRICES" />}
                {i === 2 && <Shield s={0.55} y={20} top="PET" big="PLAN" />}
                <Text y={210} size={30}>{l}</Text>
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 the two thousand dollar bill ============
  {
    const actually = w('c1a', 'actually');
    const torn = w('c1b', 'torn');
    const two = w('c1b', 'two');
    const six = w('c1b', 'six');
    q(actually, 'ding', 0.5);
    q(torn, 'thud', 0.5);
    q(two, 'cash', 0.6);
    q(six, 'coin', 0.5);
    const human = w('c1c', 'human');
    const twenty = w('c1c', 'twenty');
    q(human, 'pop', 0.5);
    q(twenty, 'thud', 0.7);
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1a')) * bump(actually)}><Text size={48}>what's in a $2,000 dog surgery?</Text></G2>
            <VetClinic x={470} y={880} s={0.62 * P(A('c1a'))} name="VET CLINIC" />
            <Dog f={f} x={760} y={980} s={0.85 * P(A('c1a')) * bump(torn, 0.06)} mood="hurt" limp={f >= torn ? 1 : 0} />
            <Xray x={1420} y={560} s={1.25 * P(A('c1a')) * bump(torn, 0.1)} crack={f >= torn ? 1 : 0} />
            <Box x={1420} y={960} w={700} h={190} s={P(A('c1a')) * bump(two, 0.08)}>
              <Text y={-34} size={30} color={GRAY}>torn knee ligament, typical cost</Text>
              <Text y={38} size={56} color={f >= six ? C.red : GRAY}>{f >= six ? '$2,000 - $6,000' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={two} text="Veterinary cost guides, 2026: dog CCL/ACL surgery ~$1,200-$6,000+" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c1c')) * bump(human)}><Text size={48}>now, a HUMAN knee, same surgery</Text></G2>
            <HospitalBill x={620} y={620} s={1.3 * P(A('c1c')) * bump(twenty, 0.1)} />
            <Box x={1420} y={620} w={680} h={280} s={P(A('c1c')) * bump(twenty, 0.08)} fill={f >= twenty ? '#FFE3EA' : '#fff'}>
              <Text y={-60} size={30} color={GRAY}>sticker price, no insurance</Text>
              <Text y={30} size={62} color={C.red}>{f >= twenty ? '$20,000+' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={human} text="Human ACL reconstruction cost guides, 2026: uninsured sticker price ~$20,000-$22,500" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const cheap = w('c1d', 'cheap');
    const zero = w('c1d', 'zero');
    const same = w('c1e', 'same');
    const all = w('c1e', 'all');
    q(cheap, 'boing', 0.5);
    q(zero, 'buzz', 0.6);
    q(same, 'ding', 0.5);
    q(all, 'stamp', 0.6);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110} s={P(A('c1d')) * bump(cheap)}><Text size={42}>{f >= cheap ? 'looks cheap... until you check insurance' : ''}</Text></G2>
          <Box x={560} y={560} w={640} h={280} s={P(A('c1d')) * bump(zero, 0.08)} fill={f >= zero ? '#FFE3EA' : '#fff'}>
            <Text y={-70} size={30} color={GRAY}>Dave's pet insurance</Text>
            <Text y={20} size={66} color={C.red}>{f >= zero ? '$0 (none)' : '?'}</Text>
          </Box>
          <Box x={1380} y={560} w={640} h={280} s={P(A('c1d')) * bump(zero, 0.06)}>
            <Text y={-70} size={30} color={GRAY}>Dave's health insurance</Text>
            <Text y={20} size={54} color={C.green}>covers his own knee</Text>
          </Box>
          <G2 x={960} y={900} s={P(A('c1e')) * bump(same)} o={lt(all, 0.45)}><Text size={44} color={C.blue}>{f >= all ? 'same out-of-pocket cost, either way' : 'same out of pocket cost...'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const story = w('c1f', 'story');
    const full = w('c1f', 'full');
    const fancy = w('c1g', 'fancy');
    const ordinary = w('c1g', 'ordinary');
    q(story, 'pop', 0.5);
    q(full, 'cash', 0.6);
    q(fancy, 'boing', 0.5);
    q(ordinary, 'ding', 0.5);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={640} y={140} s={P(A('c1f')) * bump(story)}><Text size={44}>{f >= full ? 'you pay the sticker price, in full' : "here's the real story"}</Text></G2>
          <VetClinic x={640} y={780} s={0.6 * P(A('c1f')) * bump(fancy, 0.06)} name={f >= fancy ? 'ORDINARY CLINIC' : 'VET CLINIC'} />
          <Dave f={f} x={1420} y={900} s={1.1} keys={[{at: 0, pose: 'pockets', expr: 'sad'}]} pockets={1} />
          <G2 x={1420} y={520} s={bump(ordinary)} o={lt(ordinary, 0.4)}><Bubble text="not even fancy..." size={40} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 who owns your vet ============
  {
    const setting = w('c2a', 'setting');
    const independent = w('c2b', 'independent');
    const mars = w('c2c', 'mars');
    const billion = w('c2c', 'billion');
    q(setting, 'ding', 0.5);
    q(independent, 'buzz', 0.5);
    q(mars, 'pop', 0.6);
    q(billion, 'cash', 0.7);
    const banfield = w('c2d', 'banfield');
    const thousands = w('c2d', 'thousands');
    q(banfield, 'ding', 0.5);
    q(thousands, 'stamp', 0.6);
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={130} s={P(A('c2a')) * bump(setting)}><Text size={46}>who's setting the price?</Text></G2>
            <VetClinic x={960} y={780} s={0.7 * P(A('c2a')) * bump(independent, 0.06)} name="FRIENDLY VET" />
            <G2 x={1560} y={500} s={P(A('c2a')) * bump(independent)} o={lt(independent, 0.4)}><Bubble text={'probably not\nindependent'} size={38} tail="left" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <PE f={f} x={620} y={900} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.8}, {at: billion, pose: 'present', expr: 'grin'}]} />
            <G2 x={620} y={480} s={P(A('c2c')) * bump(mars)} o={lt(mars, 0.4)}><Bubble text="MARS (yes, M&M's)" size={38} tail="down" /></G2>
            <Box x={1500} y={560} w={680} h={280} s={P(A('c2c')) * bump(billion, 0.08)}>
              <Text y={-70} size={32} color={GRAY}>bought VCA, 2017</Text>
              <Text y={20} size={62} color={C.red}>{f >= billion ? '$9.1 billion' : '?'}</Text>
            </Box>
            <SourceTag f={f} at={mars} text="Mars Inc. acquisition of VCA Inc., 2017, $9.1B (FTC required 12-clinic divestiture)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const jab = w('c2e', 'j');
    const keurig = w('c2e', 'keurig');
    const twice = w('c2e', 'twice');
    const quarter = w('c2f', 'quarter');
    const three = w('c2f', 'three');
    q(jab, 'pop', 0.6);
    q(keurig, 'ding', 0.5);
    q(twice, 'stamp', 0.6);
    q(quarter, 'thud', 0.6);
    q(three, 'thud', 0.7);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={120} s={P(A('c2e')) * bump(jab)}><Text size={44}>{f >= keurig ? 'J A B Holding (Keurig, Panera)' : 'meet J A B Holding'}</Text></G2>
          <PE f={f} x={620} y={780} s={1} keys={[{at: 0, pose: 'present', expr: 'suspicious'}, {at: twice, pose: 'facepalm', expr: 'worried'}]} />
          <G2 x={620} y={950} s={bump(twice)} o={lt(twice, 0.4)}><Text size={36} color={C.red}>FTC made them divest, twice</Text></G2>
          <Box x={1500} y={480} w={680} h={230} s={P(A('c2e')) * bump(quarter, 0.1)}>
            <Text y={-50} size={30} color={GRAY}>general vet clinics, corporate-owned</Text>
            <Text y={40} size={64} color={C.blue}>{f >= quarter ? '~25%' : '?'}</Text>
          </Box>
          <Box x={1500} y={800} w={680} h={230} s={P(A('c2e')) * bump(three, 0.1)} fill={f >= three ? C.yellow : '#fff'}>
            <Text y={-50} size={30} color={GRAY}>emergency/specialty clinics</Text>
            <Text y={40} size={64} color={C.red}>{f >= three ? '~75%' : '?'}</Text>
          </Box>
          <SourceTag f={f} at={quarter} text="Brakke Consulting analysis via Stateline (2024): ~25% general, ~75% specialty/emergency corporate-owned" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hidden = w('c2g', 'hidden');
    const never = w('c2g', 'never');
    q(hidden, 'ding', 0.5);
    q(never, 'buzz', 0.5);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={260} s={P(A('c2g')) * bump(hidden)}><Text size={48}>{f >= hidden ? "not hidden. it's public." : "none of this is hidden"}</Text></G2>
          <Box x={620} y={620} w={520} h={280} s={P(A('c2g'))}>
            <Text y={-60} size={28} color={GRAY}>public filings</Text>
            <Text y={0} size={30}>FTC.gov</Text>
            <Text y={50} size={30}>SEC.gov 10-K</Text>
          </Box>
          <Dave f={f} x={1320} y={900} s={1.25 * P(A('c2g'))} keys={[{at: 0, pose: 'shrug', expr: 'neutral'}, {at: never, pose: 'think', expr: 'think'}]} />
          <G2 x={1320} y={560} s={P(A('c2g')) * bump(never)} o={lt(never, 0.45)}><Bubble text={f >= never ? 'most owners\nnever look' : 'huh, public...'} size={36} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3 how a roll-up works ============
  {
    const playbook = w('c3a', 'playbook');
    const buy = w('c3b', 'buy');
    const door = w('c3b', 'door');
    q(playbook, 'stamp', 0.6);
    q(buy, 'cash', 0.5);
    q(door, 'ding', 0.5);
    const combine = w('c3c', 'combine');
    const bulk = w('c3c', 'bulk');
    const centrally = w('c3d', 'centrally');
    q(combine, 'pop', 0.5);
    q(bulk, 'coin', 0.6);
    q(centrally, 'stamp', 0.6);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c3a')) * bump(playbook)}><Text size={50}>the roll-up playbook</Text></G2>
            {[0, 1, 2, 3].map((i) => (
              <G2 key={i} x={340 + i * 300} y={620} s={0.42 * P(A('c3a')) * (i === 0 ? bump(buy, 0.1) : 1)} o={f >= buy ? 1 : i === 0 ? 1 : 0.35}>
                <Shop name="CLINIC" />
              </G2>
            ))}
            <PE f={f} x={1560} y={920} s={1} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.8}, {at: door, pose: 'hips', expr: 'grin'}]} />
            <G2 x={1560} y={560} s={P(A('c3a')) * bump(door)} o={lt(door, 0.4)}><Text size={36} color={C.blue}>same name on the door</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c3c')) * bump(combine)}><Text size={48}>{f >= centrally ? 'set pricing centrally' : 'combine, buy in bulk'}</Text></G2>
            {[0, 1, 2].map((i) => (
              <G2 key={i} x={280} y={480 + i * 220} s={0.4 * P(A('c3c'))}><Shop name="CLINIC" /></G2>
            ))}
            <MoneyStack x={760} y={780} s={1.3 * P(A('c3c')) * bump(bulk, 0.08)} n={8} label="bulk buys" />
            <Arrow d="M 500 500 Q 900 620 1180 780" t={f >= centrally ? 1 : 0.4} />
            <Arrow d="M 500 700 L 1180 780" t={f >= centrally ? 1 : 0.4} />
            <Arrow d="M 500 920 Q 900 900 1180 800" t={f >= centrally ? 1 : 0.4} />
            <Bank x={1560} y={820} s={0.5 * P(A('c3c')) * bump(centrally, 0.08)} label="HQ PRICING" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const theory = w('c3e', 'theory');
    const majority = w('c3e', 'majority');
    q(theory, 'whoosh_s', 0.4);
    q(majority, 'thud', 0.7);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={200} s={P(A('c3e')) * bump(theory)}><Text size={42} color={GRAY}>in theory: cheaper for you too</Text></G2>
          <XMark x={960} y={480} s={0.4 * pop(f, majority)} />
          <Box x={620} y={720} w={680} h={280} s={P(A('c3e')) * bump(majority, 0.08)} fill={f >= majority ? C.yellow : '#fff'}>
            <Text y={-60} size={30} color={GRAY}>in practice: corporate owners collect</Text>
            <Text y={40} size={64} color={C.red}>{f >= majority ? 'the majority' : '?'}</Text>
            <Text y={100} size={30} color={GRAY}>of all vet industry revenue</Text>
          </Box>
          <PE f={f} x={1500} y={900} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4 why no price tag ============
  {
    const worse = w('c4a', 'worse');
    const restaurant = w('c4b', 'restaurant');
    const mechanic = w('c4b', 'mechanic');
    q(worse, 'buzz', 0.5);
    q(restaurant, 'ding', 0.5);
    q(mechanic, 'pop', 0.5);
    const anywhere = w('c4c', 'anywhere');
    const started = w('c4c', 'started');
    q(anywhere, 'thud', 0.6);
    q(started, 'sting', 0.5);
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P(A('c4a')) * bump(worse)}><Text size={46}>you can't shop around easily</Text></G2>
            <Box x={560} y={620} w={620} h={340} s={P(A('c4a')) * bump(restaurant, 0.08)}>
              <Text y={-110} size={34} color={GRAY}>RESTAURANT</Text>
              <PriceBoard y={70} s={0.4} rows={[['burger', '$9'], ['salad', '$7']]} title="MENU" />
            </Box>
            <Box x={1360} y={620} w={620} h={340} s={P(A('c4a')) * bump(mechanic, 0.08)} o={lt(mechanic, 0.45)}>
              <Text y={-110} size={34} color={GRAY}>MECHANIC</Text>
              <PriceBoard y={70} s={0.4} rows={[['estimate', 'first']]} title="QUOTE" />
            </Box>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={640} y={110} s={P(A('c4c')) * bump(anywhere)}><Text size={44}>vet clinic: no price list anywhere</Text></G2>
            <VetClinic x={640} y={780} s={0.6 * P(A('c4c'))} />
            <Box x={1500} y={620} w={620} h={280} s={P(A('c4c')) * bump(started, 0.08)} o={lt(started, 0.45)} fill={f >= started ? '#FFE3EA' : '#fff'}>
              <Text y={-60} size={32} color={GRAY}>you find out the cost...</Text>
              <Text y={30} size={40} color={C.red}>{f >= started ? 'after surgery started' : 'after the exam'}</Text>
            </Box>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const rule = w('c4d', 'rule');
    const different = w('c4e', 'different');
    const know = w('c4e', 'know');
    const estimate = w('c4f', 'estimate');
    q(rule, 'buzz', 0.5);
    q(different, 'boing', 0.5);
    q(know, 'ding', 0.5);
    q(estimate, 'paper', 0.5);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={620} y={480} w={680} h={260} s={P(A('c4d'))}>
            <Text y={-60} size={30} color={GRAY}>human hospitals: must post some prices</Text>
            <Text y={30} size={44} color={C.green}>required by law</Text>
          </Box>
          <Box x={620} y={800} w={680} h={220} s={P(A('c4d')) * bump(rule, 0.08)} fill={f >= rule ? '#FFE3EA' : '#fff'}>
            <Text y={-40} size={30} color={GRAY}>vet clinics</Text>
            <Text y={30} size={44} color={C.red}>{f >= rule ? 'no such rule' : '?'}</Text>
          </Box>
          <G2 x={1500} y={620} s={P(A('c4e')) * bump(different, 0.08)} o={lt(different, 0.45)}>
            <Text size={42} color={f >= know ? C.blue : GRAY}>{f >= know ? "you'd never know" : 'same surgery, two prices'}</Text>
          </G2>
          <G2 x={1500} y={880} s={bump(estimate)} o={lt(estimate, 0.4)}><Phone s={0.7} title="CALL AHEAD" value="rough estimate?" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5 the emergency room markup ============
  {
    const worse2 = w('c5a', 'worse');
    const saturday = w('c5b', 'saturday');
    const closed = w('c5b', 'closed');
    q(worse2, 'buzz', 0.5);
    q(saturday, 'ding', 0.5);
    q(closed, 'thud', 0.5);
    const overnight = w('c5c', 'overnight');
    const two3 = w('c5c', 'two');
    const three3 = w('c5c', 'three');
    q(overnight, 'pop', 0.5);
    q(two3, 'coin', 0.5);
    q(three3, 'cash', 0.7);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={520} y={340} s={0.7 * P(A('c5a')) * bump(saturday, 0.1)} top="WEEKEND" year="SAT" flip={0} />
            <VetClinic x={520} y={840} s={0.5 * P(A('c5a'))} name="REGULAR VET" />
            <G2 x={520} y={620} s={bump(closed)} o={lt(closed, 0.4)}><Text size={40} color={C.red}>CLOSED</Text></G2>
            <Arrow d="M 780 780 Q 1100 700 1350 780" t={f >= closed ? 1 : 0.3} />
            <VetClinic x={1560} y={840} s={0.6 * P(A('c5a')) * bump(worse2, 0.06)} name="EMERGENCY" emergency />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c5c')) * bump(overnight)}><Text size={48}>overnight staff, 24/7 equipment</Text></G2>
            <VetClinic x={1560} y={340} s={0.42 * P(A('c5c'))} name="EMERGENCY" emergency />
            <line x1={460} y1={900} x2={1260} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={640} y={900} h={260} color={C.blue} label="regular clinic" value="1x" w={320} />
            <Bar x={1080} y={900} h={ease(f, two3 - 4, three3 + 16, 130, 620)} color={C.red} label="emergency hospital" value={f >= three3 ? '2-3x' : '?'} w={320} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const four3 = w('c5d', 'four');
    const cheap2 = w('c5e', 'cheap');
    const open = w('c5e', 'open');
    q(four3, 'thud', 0.7);
    q(cheap2, 'buzz', 0.5);
    q(open, 'ding', 0.6);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={140} s={P(A('c5d')) * bump(four3)}><Text size={42}>and 3 of every 4 are corporate-owned</Text></G2>
          <CapacityDots x={620} y={560} s={1.3 * P(A('c5d')) * bump(four3, 0.06)} total={16} filled={f >= four3 ? 12 : 4} cols={4} />
          <VetClinic x={620} y={980} s={0.55 * P(A('c5d'))} name="EMERGENCY" emergency />
          <Dave f={f} x={1500} y={920} s={1.25 * P(A('c5d'))} keys={[{at: 0, pose: 'shrug', expr: 'sad'}, {at: open, pose: 'point_r', expr: 'worried'}]} />
          <G2 x={1500} y={520} s={P(A('c5d')) * bump(cheap2)} o={lt(open, 0.45)}><Bubble text={f >= open ? 'chose it because\nit was OPEN' : 'not because cheap...'} size={38} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6 vet bills rise faster ============
  {
    const buy2 = w('c6a', 'buy');
    const seven2 = w('c6b', 'seven');
    const three4 = w('c6b', 'three');
    q(buy2, 'buzz', 0.5);
    q(seven2, 'thud', 0.7);
    q(three4, 'coin', 0.5);
    const fiftyfive = w('c6c', 'fifty');
    const gas = w('c6c', 'gas');
    q(fiftyfive, 'cash', 0.7);
    q(gas, 'ding', 0.5);
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={P(A('c6a')) * bump(buy2)}><Text size={48}>prices climbing faster than almost anything</Text></G2>
            <line x1={460} y1={900} x2={1260} y2={900} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={640} y={900} h={ease(f, three4 - 4, three4 + 12, 130, 260)} color={C.blue} label="overall CPI" value={f >= three4 ? '3.3%' : '?'} w={320} />
            <Bar x={1080} y={900} h={ease(f, seven2 - 4, seven2 + 16, 130, 400)} color={C.red} label="vet services" value={f >= seven2 ? '4.7%' : '?'} w={320} />
            <PE f={f} x={1620} y={880} s={1.1 * P(A('c6a'))} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
            <SourceTag f={f} at={seven2} text="BLS CPI-U, release Aug 12, 2026: vet services +4.7% YoY vs +3.3% all-items" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('c6c')) * bump(fiftyfive)}><Text size={46}>since 2019, vet prices are up</Text></G2>
            <Box x={960} y={520} w={620} h={320} s={P(A('c6c')) * bump(fiftyfive, 0.1)} fill={f >= fiftyfive ? C.yellow : '#fff'}>
              <Text size={150} color={C.red}>{f >= fiftyfive ? '55%' : '?'}</Text>
            </Box>
            <Dog f={f} x={520} y={950} s={0.7 * P(A('c6c'))} mood="happy" />
            <VetClinic x={1500} y={340} s={0.4 * P(A('c6c'))} />
            <G2 x={960} y={880} s={P(A('c6c')) * bump(gas)}><Text size={40} color={GRAY}>faster than gas prices, same years</Text></G2>
            <SourceTag f={f} at={fiftyfive} text="CPI analysis of BLS data (in2013dollars.com): vet services +55.5% cumulative since 2019" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const real = w('c6d', 'real');
    const worth = w('c6e', 'worth');
    const grocery = w('c6f', 'grocery');
    const hundred = w('c6f', 'hundred');
    q(real, 'ding', 0.5);
    q(worth, 'whoosh_s', 0.4);
    q(grocery, 'pop', 0.5);
    q(hundred, 'cash', 0.7);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={140} s={P(A('c6d')) * bump(real)}><Text size={40}>new equipment, drugs, staff pay: that's real</Text></G2>
          <G2 x={620} y={350} s={P(A('c6d')) * bump(worth)}><Text size={36} color={GRAY}>but consolidation + faster prices... worth asking why</Text></G2>
          <Box x={620} y={800} w={820} h={320} s={P(A('c6d')) * bump(grocery, 0.08)} fill={f >= hundred ? C.yellow : '#fff'}>
            <Text y={-80} size={30} color={GRAY}>if groceries rose 55% since 2019</Text>
            <Text y={0} size={46}>$100 cart → {f >= hundred ? '$155' : '?'}</Text>
          </Box>
          <PE f={f} x={1560} y={920} s={1.3 * P(A('c6d'))} keys={[{at: 0, pose: 'present', expr: 'neutral'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7 myth vets are getting rich ============
  {
    const picture = w('c7a', 'picture');
    const nope = w('c7a', 'nope');
    const loans = w('c7b', 'loans');
    const twohundred = w('c7b', 'two');
    q(picture, 'boing', 0.4);
    q(nope, 'buzz', 0.7);
    q(loans, 'paper', 0.5);
    q(twohundred, 'cash', 0.6);
    const parent = w('c7c', 'parent');
    const room2 = w('c7c', 'room');
    q(parent, 'ding', 0.5);
    q(room2, 'boing', 0.5);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <DreamBgVet />
          <Svg>
            <Vet f={f} x={620} y={880} s={1.25 * P(A('c7a'))} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <G2 x={1180} y={440} s={P(A('c7a')) * bump(picture)}><Bubble text={'"vets get rich\noff my bill"'} size={40} tail="left" /></G2>
            <Stamp x={1180} y={760} s={P(A('c7a')) * bump(nope, 0.2)} text="NOPE" size={100} r={-8} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Vet f={f} x={620} y={900} s={1.1} keys={[{at: 0, pose: 'pockets', expr: 'tired'}]} pockets={1} />
            <G2 x={620} y={500} s={P(A('c7c')) * bump(loans)} o={lt(loans, 0.4)}><Bubble text={f >= twohundred ? 'student loans:\n$200,000+' : 'employee, not owner'} size={38} tail="down" /></G2>
            <PE f={f} x={1500} y={900} s={1.05} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
            <G2 x={1500} y={500} s={P(A('c7c')) * bump(parent)} o={lt(parent, 0.4)}><Bubble text={'I set the\nprices, not him'} size={36} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const excuse = w('c7e', 'excuse');
    const spreadsheet = w('c7e', 'spreadsheet');
    q(excuse, 'buzz', 0.5);
    q(spreadsheet, 'paper', 0.6);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={180} s={P(A('c7e')) * bump(excuse)}><Text size={44} color={GRAY}>not an excuse for a $2,000 bill...</Text></G2>
          <Vet f={f} x={560} y={880} s={1.15 * P(A('c7e'))} keys={[{at: 0, pose: 'shrug', expr: 'tired'}]} />
          <Bank x={1350} y={800} s={0.32 * P(A('c7e')) * bump(spreadsheet, 0.08)} label="HQ" />
          <Arrow d="M 800 780 Q 1050 700 1220 780" t={f >= spreadsheet ? 1 : 0.4} />
          <G2 x={960} y={950} s={P(A('c7e')) * bump(spreadsheet)}><Text size={40} color={C.blue}>the money leads to a spreadsheet, not the vet</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 the insurance question ============
  {
    const could = w('c8a', 'could');
    const premium = w('c8b', 'premium');
    const deductible = w('c8b', 'deductible');
    q(could, 'ding', 0.5);
    q(premium, 'coin', 0.5);
    q(deductible, 'paper', 0.5);
    const sevenm = w('c8c', 'seven');
    const twelve2 = w('c8c', 'twelve');
    q(sevenm, 'stamp', 0.6);
    q(twelve2, 'ding', 0.5);
    scene(A('c8a'), () =>
      f < A('c8c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={120} s={P(A('c8a')) * bump(could)}><Text size={46}>could insurance have saved him?</Text></G2>
            <Shield x={620} y={620} s={0.9 * P(A('c8a')) * bump(premium, 0.08)} top="PET PLAN" big="%" />
            <G2 x={1460} y={560} s={P(A('c8a')) * bump(deductible)} o={lt(deductible, 0.4)}><Text size={38}>monthly premium →</Text><Text y={54} size={38}>% back, after deductible</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Box x={620} y={560} w={700} h={320} s={P(A('c8c')) * bump(sevenm, 0.08)}>
              <Text y={-90} size={30} color={GRAY}>pets insured in N. America, end 2024</Text>
              <Text y={0} size={70} color={C.blue}>{f >= sevenm ? '7 million' : '?'}</Text>
              <Text y={90} size={34} color={f >= twelve2 ? C.green : GRAY}>{f >= twelve2 ? '+12% in a year' : ''}</Text>
            </Box>
            <MemberCard x={1500} y={620} s={1.05 * P(A('c8c'))} tier="PET INSURANCE" price="growing" color={C.green} />
            <SourceTag f={f} at={sevenm} text="NAPHIA State of the Industry Report 2025: 7.03M pets insured, +12.2% YoY" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const premiums = w('c8d', 'premiums');
    const before = w('c8e', 'before');
    const month = w('c8e', 'month');
    q(premiums, 'cash', 0.7);
    q(before, 'stamp', 0.6);
    q(month, 'buzz', 0.6);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={620} y={170} s={P(A('c8d'))}><Text size={40}>the industry keeps growing</Text></G2>
          <Box x={620} y={560} w={720} h={300} s={P(A('c8d')) * bump(premiums, 0.08)} fill={f >= premiums ? C.yellow : '#fff'}>
            <Text y={-70} size={30} color={GRAY}>total written premium, 2024</Text>
            <Text y={30} size={66} color={C.green}>{f >= premiums ? '$5.2 billion' : '?'}</Text>
          </Box>
          <Dog f={f} x={1500} y={900} s={1.3 * P(A('c8d'))} mood="cone" />
          <Cone x={1500} y={900} s={1.3 * P(A('c8d'))} />
          <G2 x={1500} y={520} s={P(A('c8e')) * bump(before)} o={lt(before, 0.45)}><Bubble text={f >= month ? 'happened the\nmonth before...' : 'only works BEFORE the emergency'} size={36} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f'), bs('c9g'), bs('c9h')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = [
      'Get quotes from more than one clinic',
      'Look into pet insurance while pets are young',
      'Build a small pet emergency fund',
      'Ask about payment plans (CareCredit)',
      'Ask which company owns the clinic',
      'For non-emergencies, ask about a cheaper referral',
      "Keep your pet's records in one folder",
    ];
    const cur = hs.filter((x) => f >= x - 6).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={650} y={90}><Text size={50}>How to not get blindsided</Text></G2>
          <G2 x={650} y={146}><Text size={30} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={60} y={230 + i * 118} s={0.85 * P(A('c9a'))} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.3} color={C.green} w={1180} />)}
          {cur === 0 && <Dog f={f} x={1600} y={800} s={1.1} mood="happy" />}
          {cur === 1 && <G2 x={1600} y={700}><Shield s={0.7} top="PET" big="PLAN" /></G2>}
          {cur === 2 && <G2 x={1600} y={700}><Coin x={-40} y={0} s={1.2} /><Coin x={40} y={-20} s={1.2} /><Text y={110} size={30}>emergency fund</Text></G2>}
          {cur === 3 && <G2 x={1600} y={700}><CreditCard s={0.75} label="CARECREDIT" /></G2>}
          {cur === 4 && <G2 x={1600} y={700}><Bank s={0.25} label="?" /></G2>}
          {cur === 5 && <G2 x={1600} y={700}><VetClinic s={0.4} name="REFERRAL" /></G2>}
          {cur >= 6 && <G2 x={1600} y={700}><Text size={70}>📁</Text><Text y={80} size={30}>vaccine records</Text></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  const recap = ['Big corporate groups own a lot of vet clinics now', 'Vet prices almost never get posted anywhere', 'Fight back: get quotes, insure early, save a buffer'];
  {
    const r = [bs('r2'), bs('r3'), bs('r4')];
    q(A('r1') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P(A('r1'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={140} y={360 + i * 170} s={P(A('r1')) * bump(r[i], 0.05)} n={i + 1} text={b} lit={f >= r[i] - 6 ? 1 : 0.3} color={C.blue} w={1640} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gate = w('r5', 'gate');
    const eighteen = w('r5', 'eighteen');
    const sb = w('r6', 'subscribe');
    const copay = w('r6', 'copay');
    q(gate, 'pop', 0.5);
    q(eighteen, 'cash', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(copay, 'ding', 0.5);
    scene(A('r5'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P(A('r5'))}><Text size={54}>Next: an $18 airport sandwich...</Text></G2>
            <Dave f={f} x={640} y={900} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: eighteen, pose: 'shock', expr: 'shock'}]} />
            <Receipt x={1350} y={620} s={1.1 * P(A('r5')) * bump(eighteen, 0.08)} lines={[['sandwich', '$18'], ['water', '$6']]} total={f >= eighteen ? 'TOTAL $24' : 'TOTAL ?'} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Dog f={f} x={1560} y={920} s={0.85} mood="happy" />
            <G2 x={1560} y={780} s={bump(copay)} o={lt(copay, 0.4)}><Text size={36} color={C.green}>{f >= copay ? 'no copay required' : ''}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3e', 'majority') + 20;
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

const DreamBgVet: React.FC = () => (
  <Svg>
    <rect x={-400} y={-300} width={2720} height={1680} fill="#F7EEDC" />
  </Svg>
);
