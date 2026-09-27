import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, keyed, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bill, Bubble, Calendar, Car, Clock, Coin, MoneyStack, SourceTag, Stamp, Text, XMark, Arrow} from '../props';
import {Bar, Dial, Frame, Phone, Row, Sign, SubButton, Bell, Umbrella} from '../props2';
import {Coffee, Plane, PriceTag, Raccoon} from '../props3';
import {Globe, LineChart, Pizza, Truck} from '../props4';
import {Flag, Bread} from '../props6';
import {Thermo} from '../props7';
import {Jet, Receipt, Scale, SlicePie} from '../props8';
import {AiBubble, Barrel, Chips, Feather, GasPump, OIL, Piggy, Refinery, Rocket, SaltCave, StraitMap, Tire, Tractor} from '../props21';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Grandma: React.FC<SP> = (p) => <Stick acc={['bun', 'glasses']} seed={13} {...p} />;
const Clerk: React.FC<SP> = (p) => <Stick acc={['cap']} seed={55} {...p} />;
const Owner: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Prof: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={40} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const GREY = '#5B6470';

export const Ep21: React.FC = () => {
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
  const L = (at: number) => ease(f, at - 4, at + 6);
  const D = (at: number) => 0.3 + 0.7 * L(at);
  const B = (at: number) => 1 + 0.14 * Math.max(0, 1 - Math.abs(f - at - 5) / 7);
  const Q = (at: number, v: string, pre = '?') => (f >= at ? v : pre);

  // ============ COLD OPEN ============
  {
    const sx = w('o1', 'sixty');
    const tk = w('o1', 'tank');
    q(2, 'pop', 0.6);
    q(8, 'key2', 0.4);
    q(sx, 'cash', 0.7);
    q(tk, 'thud', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Car x={820} y={822} s={1.7 * pop(f, 2)} />
          <GasPump x={1250} y={822} s={pop(f, 3)} price="$4.48" gal={`GAL ${lin(f, 6, sx, 0, 15).toFixed(1)}`} total={`$${lin(f, 6, sx, 0, 67.2).toFixed(2)}`} hl={L(sx)} />
          <Dave f={f} x={420} y={822} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: sx, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= sx} />
          <G2 x={1250} y={180} s={pop(f, 4) * B(tk)}>
            <Box w={620} h={120} fill={f >= tk ? C.yellow : '#fff'} />
            <Text size={56}>{`ONE TANK = ${Q(sx, '$67')}`}</Text>
          </G2>
          <G2 x={420} y={330} s={pop(f, 6)} o={D(sx)}><Text size={44}>Dave's fill-up</Text></G2>
          <SourceTag f={f} at={sx} text="15 gallons × $4.48 ≈ $67" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('o2', 'four');
    const hi = w('o2', 'highest');
    const ds = w('o3', 'diesel');
    const rc = w('o3', 'record');
    const sx = w('o3', 'six');
    q(fr, 'cash', 0.6);
    q(hi, 'stamp', 0.6);
    q(ds, 'pop', 0.5);
    q(rc, 'stamp', 0.7);
    q(sx, 'thud', 0.6);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={260} y={880} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.8}, {at: rc, pose: 'panic', expr: 'shock', look: 0.8}]} sweat />
          {[0, 1].map((i) => {
            return (
              <G2 key={i} x={i ? 1500 : 900} y={470} s={pop(f, A('o2') + i * 4) * B(i ? sx : fr)} o={i ? D(ds) : 1}>
                <Frame w={540} h={600} label={i ? 'diesel · US average' : 'gas · US average'}>
                  <Text y={-200} size={110} color={i ? C.red : C.ink}>{i ? Q(sx, '$6+') : Q(fr, '$4.48')}</Text>
                  {i ? <Truck y={60} s={1.1} /> : <GasPump y={130} s={0.42} price="$4.48" />}
                  <G2 y={180} o={0.25 + 0.75 * L(i ? rc : hi)} s={B(i ? rc : hi)}>
                    <Stamp text={i ? 'ALL-TIME RECORD' : 'RECORD SEPTEMBER'} size={34} color={C.red} r={-3} />
                  </G2>
                </Frame>
              </G2>
            );
          })}
          <SourceTag f={f} at={fr} text="AAA, Sept 2026 · diesel record Sept 4, 2026" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wy = w('o4', 'why');
    const mp = w('o4', 'map');
    const tw = w('o4', 'twenty');
    const pl = w('o4', 'planet');
    const wd = w('o5', 'weirder');
    const em = w('o5', 'empty');
    q(wy, 'pop', 0.5);
    q(mp, 'paper', 0.6);
    q(tw, 'ding', 0.6);
    q(wd, 'sting', 0.5);
    q(em, 'cricket', 0.6);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={200} y={900} s={1} keys={[{at: 0, pose: 'shrug', expr: 'think', look: 0.8}, {at: em, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <Clerk f={f} x={500} y={900} s={1} keys={[{at: 0, pose: 'talk', expr: 'neutral', look: -0.6}, {at: mp, pose: 'point_r', expr: 'neutral', look: 0.8}]} />
          <G2 x={250} y={420} s={pop(f, A('o4') + 4) * B(wy)}><Bubble text="Why?!" size={46} tail="down" /></G2>
          <StraitMap x={1270} y={520} s={0.93 * pop(f, A('o4') + 2)} f={f} measure={L(tw)} ships={1 - ease(f, em - 10, em + 20, 0, 0.9)} />
          <G2 x={1270} y={110} s={pop(f, A('o4') + 6)}>
            <Text size={50} color={f >= em ? C.red : C.ink}>{f >= wd ? 'right now: almost EMPTY' : 'the other side of the planet'}</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'barrel'), w('o6', 'inside'), w('o6', 'feather'), w('o6', 'fortune')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    const labels = ['FOLLOW A BARREL', "WHAT'S IN A GALLON", 'THE FEATHER', "WHO'S WINNING"];
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color={GREY}>TODAY</Text>
          {labels.map((l, i) => (
            <G2 key={l} x={270 + i * 460} y={520} s={pop(f, A('o6') + i * 3) * B(pv[i])} o={D(pv[i])}>
              <Frame w={420} h={440} label={l}>
                {i === 0 && <Barrel s={0.6} y={-40} />}
                {i === 1 && <SlicePie s={1} y={-40} rad={130} slices={[{v: 0.52, c: OIL}, {v: 0.22, c: C.blue}, {v: 0.15, c: C.green}, {v: 0.11, c: C.yellow}]} />}
                {i === 2 && <Feather s={0.9} y={-40} r={20} />}
                {i === 3 && <MoneyStack s={0.9} y={20} n={5} />}
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Follow the barrel ============
  {
    const br = w('c1a', 'barrel');
    const ft = w('c1b', 'forty');
    const sm = w('c1b', 'smelly');
    const ct = w('c1b', 'cant');
    const brent = w('c1c', 'brent');
    const wti = w('c1c', 'w');
    const wa = w('c1c', 'watches');
    const sv = w('c1d', 'seventy');
    const pk = w('c1d', 'hundred');
    const sp = w('c1e', 'september');
    const hf = w('c1e', 'four');
    const wti2 = w('c1e', 'w');
    const mid = w('c1f', 'middle');
    q(br, 'thud', 0.6);
    q(ft, 'ding', 0.6);
    q(sm, 'sputter', 0.4);
    q(ct, 'buzz', 0.5);
    q(brent, 'pop', 0.5);
    q(wti, 'pop', 0.5);
    q(wa, 'ding', 0.4);
    q(sv, 'pop', 0.5);
    q(pk, 'whoosh', 0.5);
    q(hf, 'cash', 0.6);
    q(wti2, 'pop', 0.4);
    q(A('c1f') + 6, 'whoosh', 0.5);
    q(mid, 'ding', 0.5);
    const pts = [70, 71, 76, 98, 126, 112, 101, 94, 104];
    const cx = (i: number) => 400 + (i / 8) * 1300;
    const cy = (v: number) => 780 - ((v - 50) / 85) * 520;
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c1a') + 2)}><Text size={50} color={GREY}>the thing everything is priced in</Text></G2>
            <Dave f={f} x={280} y={880} s={1.1} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: sm, pose: 'facepalm', expr: 'sad', look: 0.8}, {at: ct, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            <Barrel x={780} y={560} s={1.3 * pop(f, A('c1a')) * B(br)} label="CRUDE" />
            <G2 x={1450} y={270} s={pop(f, A('c1a') + 4) * B(ft)}>
              <Box w={620} h={150} fill={f >= ft ? C.yellow : '#fff'} />
              <Text size={80}>{`${Q(ft, '42')} GALLONS`}</Text>
            </G2>
            <G2 x={1450} y={420} s={pop(f, A('c1a') + 6)} o={D(sm)}><Text size={44}>thick · black · smelly</Text></G2>
            <G2 x={1450} y={690} s={pop(f, A('c1a') + 8)}>
              <Car s={1.4} />
              <G2 o={L(ct)} s={B(ct)}><XMark s={0.35} y={-40} /></G2>
            </G2>
            <G2 x={1450} y={820} s={pop(f, A('c1a') + 8)} o={D(ct)}><Text size={40} color={C.red}>not ready for your car (yet)</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c1c')) * B(wa)}><Text size={56} color={f >= wa ? C.blue : C.ink}>the price tags the whole world watches</Text></G2>
            {[0, 1].map((i) => (
              <G2 key={i} x={i ? 1400 : 520} y={500} s={pop(f, A('c1c') + 2 + i * 4) * B(i ? wti : brent)} o={D(i ? wti : brent)}>
                <Frame w={600} h={600} label={i ? 'oil from Texas' : 'oil from the North Sea'}>
                  <Barrel s={0.85} y={-40} label={i ? 'WTI' : 'BRENT'} color={i ? '#B5543A' : '#2F6690'} />
                </Frame>
              </G2>
            ))}
            <Globe f={f} x={960} y={760} s={0.55 * pop(f, A('c1c') + 8) * B(wa)} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1050} y={110} s={pop(f, A('c1d'))}><Text size={52}>Brent crude · $ per barrel · 2026</Text></G2>
            <LineChart x={1050} y={520} w={1300} h={520} lo={50} hi={135} color={OIL} pts={pts} t={keyed(f, [[A('c1d'), 0.18], [sv, 0.2], [pk, 0.5], [A('c1e'), 0.55], [hf, 1]])} />
            {[[1, 70, 'before the war', sv, '$70'], [4, 126, 'spring peak', pk, '$126'], [8, 104, 'late Sept', hf, '$104']].map(([i, v, lab, at, val]) => (
              <G2 key={String(lab)} x={cx(Number(i))} y={cy(Number(v)) - 80} s={pop(f, A('c1d') + 4) * B(Number(at))} o={D(Number(at))}>
                <Text size={50} color={Number(i) === 4 ? C.red : C.ink}>{Q(Number(at), String(val))}</Text>
                <Text y={40} size={28} color={GREY}>{String(lab)}</Text>
              </G2>
            ))}
            <G2 x={1500} y={900 - 60} s={pop(f, A('c1d') + 6)} o={D(wti2)}><Text size={40} color="#B5543A">{`WTI: ${Q(wti2, '~$100')}`}</Text></G2>
            <Dave f={f} x={190} y={900} s={0.85} keys={[{at: 0, pose: 'point_r', expr: 'worried', look: 0.8}, {at: pk, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <SourceTag f={f} at={sv} text="CNN Jul 31, 2026 · Trading Economics: Brent $104.37, Sept 25, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Globe f={f} x={1300} y={500} s={1.7 * pop(f, A('c1f'))} />
            <Plane x={lin(f, A('c1f'), mid, 520, 1180)} y={lin(f, A('c1f'), mid, 300, 420)} s={0.9 * pop(f, A('c1f') + 3)} r={8} />
            <Dave f={f} x={300} y={880} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}]} />
            <G2 x={1300} y={880} s={pop(f, A('c1f') + 6) * B(mid)} o={D(mid)}><Text size={52}>next stop: the Middle East</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Hormuz ============
  {
    const dr = w('c2a', 'door');
    const tw = w('c2b', 'twenty');
    const ln = w('c2b', 'lanes');
    const two = w('c2b', 'two');
    const tm = w('c2c', 'twenty');
    const fi = w('c2c', 'fifth');
    const cs = ['saudi', 'iraq', 'kuwait', 'emirates', 'qatar', 'iran'].map((x) => w('c2d', x));
    const ow = w('c2d', 'one');
    const fv = w('c2e', 'five');
    const bl = w('c2e', 'blocks');
    const hp = w('c2f', 'happened');
    q(dr, 'pop', 0.5);
    q(tw, 'ding', 0.6);
    q(ln, 'draw', 0.5);
    q(tm, 'cash', 0.6);
    q(fi, 'stamp', 0.6);
    cs.forEach((x) => q(x, 'pop', 0.4));
    q(ow, 'ding', 0.5);
    q(fv, 'pop', 0.5);
    q(bl, 'clank', 0.7);
    q(bl + 8, 'buzz', 0.4);
    q(hp, 'thud', 0.5);
    const names = ['Saudi Arabia', 'Iraq', 'Kuwait', 'UAE (Emirates)', 'Qatar', 'Iran'];
    const cnt = Math.round(lin(f, A('c2c'), tm + 10, 3, 20));
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1150} y={110} s={pop(f, A('c2a') + 2) * B(f < A('c2b') ? dr : two)}>
              <Text size={52} color={f >= two ? C.red : C.ink}>{f < A('c2b') ? 'the narrow sea door' : f >= two ? '2 lanes · 2 miles wide each' : 'the Strait of Hormuz'}</Text>
            </G2>
            <StraitMap x={1150} y={520} s={1.05 * pop(f, A('c2a'))} f={f} measure={0.25 + 0.75 * L(tw)} label={Q(tw, '21 miles', '? miles')} lanes={L(ln)} />
            <Dave f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: tw, pose: 'shock', expr: 'shock', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={140} s={pop(f, A('c2c')) * B(tm)}><Text size={52}>{f >= tm ? '20,000,000 barrels / day' : 'barrels per day: ?'}</Text></G2>
            {Array.from({length: 20}).map((_, i) => (
              <Barrel key={i} x={180 + (i % 5) * 150} y={310 + Math.floor(i / 5) * 150} s={0.26 * pop(f, A('c2c') + (i % 5))} label="" color={i < cnt ? '#2F6690' : '#C9CED6'} />
            ))}
            <G2 x={1450} y={110} s={pop(f, A('c2c') + 2)}><Text size={48}>all the oil the world uses</Text></G2>
            <SlicePie x={1450} y={500} s={pop(f, A('c2c') + 4) * B(fi)} rad={270} pop={f >= fi ? 0 : -1} slices={[{v: 0.2, c: C.red, l: '1/5'}, {v: 0.8, c: '#C9CED6', l: 'rest'}]} />
            <G2 x={1450} y={830} s={pop(f, A('c2c') + 6)} o={D(fi)}><Text size={44} color={C.red}>≈ one fifth through Hormuz</Text></G2>
            <SourceTag f={f} at={tm} text="U.S. EIA / IEA: ≈ 20M barrels/day, ≈ 1/5 of world consumption" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <StraitMap x={620} y={520} s={0.9 * pop(f, A('c2d'))} f={f} lanes={0.4 + 0.6 * L(ow)} />
            {names.map((n, i) => (
              <G2 key={n} x={1480} y={200 + i * 95} s={pop(f, A('c2d') + 2 + i) * B(cs[i])} o={D(cs[i])}>
                <circle cx={-260} r={16} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
                <Text x={-220} size={50} anchor="start">{n}</Text>
              </G2>
            ))}
            <G2 x={1480} y={820} s={pop(f, A('c2d') + 8) * B(ow)} o={D(ow)}>
              <Box w={640} h={100} fill={f >= ow ? C.yellow : '#fff'} />
              <Text size={46}>only one way out</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <rect x={780} y={822} width={360} height={260} fill="#8FD3F5" />
            <G2 x={960} y={760} s={pop(f, A('c2e'))}>
              <path d="M -240 62 L -240 20 L 240 20 L 240 62 Q 0 -40 -240 62 Z" fill="#C9A77C" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
              <rect x={-250} y={0} width={500} height={26} rx={8} fill="#8C5A33" stroke={C.ink} strokeWidth={5} />
            </G2>
            {[0, 1, 2, 3].map((i) => <Car key={i} x={130 + i * 180} y={822} s={0.75 * pop(f, A('c2e') + i * 2)} />)}
            <G2 x={960} y={742} s={pop(f, A('c2e') + 6) * B(fv)}>
              {f >= fv && <circle r={110} fill="none" stroke={C.yellow} strokeWidth={12} />}
              <Car s={0.75} />
            </G2>
            <G2 x={960} y={560} o={0.15 + 0.85 * L(bl)} s={B(bl)}><Sign text="BLOCKED" color={C.red} /></G2>
            <G2 x={500} y={250} s={pop(f, A('c2e') + 4) * B(fv)} o={D(fv)}><Text size={56}>1 in 5 cars · 1 tiny bridge</Text></G2>
            <G2 x={1500} y={250} s={pop(f, A('c2e') + 6) * B(hp)} o={D(hp)}><Text size={50} color={C.red}>2026: it happened</Text></G2>
            <Dave f={f} x={1560} y={822} s={1.05} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: bl, pose: 'shock', expr: 'shock', look: -0.8}, {at: hp, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 War at sea ============
  {
    const fb = w('c3a', 'february');
    const st = w('c3a', 'strikes');
    const hb = w('c3b', 'hit');
    const at = w('c3b', 'attacks');
    const ins = w('c3b', 'insurance');
    const hu = w('c3c', 'hundred');
    const fv = w('c3c', 'five');
    const nf = w('c3c', 'ninety');
    const sv = w('c3d', 'seventeen');
    const ni = w('c3d', 'nine');
    const hl = w('c3d', 'half');
    const tl = w('c3e', 'talks');
    const pa = w('c3e', 'pauses');
    const sa = w('c3e', 'still');
    const bl = w('c3f', 'blame');
    const po = w('c3f', 'political');
    const ls = w('c3f', 'less');
    const dr = w('c3f', 'drivers');
    const up = w('c3f', 'up');
    const au = w('c3g', 'auction');
    const sl = w('c3g', 'slice');
    const cr = w('c3g', 'crazier');
    q(fb, 'flip', 0.5);
    q(st, 'thud', 0.6);
    q(hb, 'thud', 0.5);
    q(at, 'sting', 0.5);
    q(ins, 'cash', 0.6);
    q(hu, 'pop', 0.5);
    q(fv, 'thud', 0.7);
    q(nf, 'stamp', 0.7);
    q(sv, 'pop', 0.5);
    q(ni, 'thud', 0.6);
    q(hl, 'stamp', 0.6);
    q(tl, 'pop', 0.4);
    q(pa, 'pop', 0.4);
    q(sa, 'sting', 0.5);
    q(po, 'ding', 0.5);
    q(ls, 'pop', 0.5);
    q(up, 'whoosh', 0.6);
    q(au, 'ding', 0.5);
    q(sl, 'pop', 0.5);
    q(cr, 'crowd', 0.5);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Calendar x={240} y={290} s={0.8 * pop(f, A('c3a')) * B(fb)} top="LATE FEB" year={2026} flip={0} />
            <G2 x={240} y={560} s={pop(f, A('c3a') + 4)}><Text size={34} color={GREY}>ship insurance</Text></G2>
            <PriceTag x={240} y={650} s={1.1 * pop(f, A('c3a') + 5) * B(ins)} text={f >= ins ? '$$$$$' : '$'} color={f >= ins ? C.red : C.yellow} />
            <StraitMap x={1170} y={530} s={pop(f, A('c3a') + 2)} f={f} danger={L(at)} ships={1 - 0.4 * L(at)} />
            {[[-220, -40], [140, 60], [360, 110]].map(([dx, dy], i) => (
              <G2 key={i} x={1170 + dx} y={530 + dy} s={0.6 + 0.4 * L(st)} o={0.2 + 0.8 * L(i ? at : st)}>
                <path d="M 0 -40 L 12 -12 L 42 -14 L 18 6 L 30 36 L 0 18 L -30 36 L -18 6 L -42 -14 L -12 -12 Z" fill={C.yellow} stroke={C.red} strokeWidth={5} />
              </G2>
            ))}
            <G2 x={1170} y={110} s={pop(f, A('c3a') + 3) * B(f < A('c3b') ? st : hb)}>
              <Text size={52}>{f < A('c3b') ? 'US + Israel strike Iran' : 'Iran hits back at ships'}</Text>
            </G2>
            <SourceTag f={f} at={fb} text="Congressional Research Service R45281 (2026)" until={A('c3b')} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1030} y={110} s={pop(f, A('c3c'))}><Text size={52}>ships through Hormuz, per day</Text></G2>
            <line x1={560} y1={800} x2={1500} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={800} y={800} s={pop(f, A('c3c') + 2)} w={260} h={ease(f, hu - 4, hu + 12, 60, 520)} color={C.navy} label="before the war" value={Q(hu, '100+')} />
            <Bar x={1250} y={800} s={pop(f, A('c3c') + 4)} w={260} h={ease(f, fv - 4, fv + 12, 60, 26)} color={C.red} label="late Aug 2026" value={Q(fv, '~5')} />
            <G2 x={1680} y={420} s={pop(f, A('c3c') + 6) * B(nf)} o={0.2 + 0.8 * L(nf)}><Stamp text="-95%" size={80} color={C.red} r={-8} /></G2>
            <Dave f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.8}, {at: fv, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <SourceTag f={f} at={hu} text="Al Jazeera, Aug 27, 2026 (Kpler / shipping data)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={900} y={110} s={pop(f, A('c3d'))}><Text size={52}>Gulf crude exports · barrels / day</Text></G2>
            <line x1={420} y1={800} x2={1360} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={660} y={800} s={pop(f, A('c3d') + 2)} w={260} h={ease(f, sv - 4, sv + 12, 60, 510)} color="#2F6690" label="2025" value={Q(sv, '17M')} />
            <Bar x={1110} y={800} s={pop(f, A('c3d') + 4)} w={260} h={ease(f, ni - 4, ni + 12, 60, 270)} color={C.red} label="Aug 2026" value={Q(ni, '9M')} />
            <G2 x={1110} y={260} s={pop(f, A('c3d') + 6) * B(hl)} o={0.2 + 0.8 * L(hl)}><Stamp text="-47%" size={70} color={C.red} r={-6} /></G2>
            <Dave f={f} x={1640} y={880} s={1.1} keys={[{at: 0, pose: 'hips', expr: 'worried', look: -0.8}, {at: hl, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
            <SourceTag f={f} at={sv} text="Kpler via Al Jazeera, Aug 2026" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <StraitMap x={960} y={560} s={0.9 * pop(f, A('c3e'))} f={f} danger={L(sa)} ships={0.2} />
            {[['talks', tl, 520], ['pauses', pa, 900], ['Sept: still attacks at sea', sa, 1400]].map(([l, a, x]) => (
              <G2 key={String(l)} x={Number(x)} y={130} s={pop(f, A('c3e') + 2) * B(Number(a))} o={D(Number(a))}>
                <Box w={String(l).length * 26 + 80} h={90} fill={l === 'talks' || l === 'pauses' ? '#fff' : '#FFE0E6'} />
                <Text size={44} color={l === 'talks' || l === 'pauses' ? C.ink : C.red}>{String(l)}</Text>
              </G2>
            ))}
            <SourceTag f={f} at={sa} text="Al Jazeera, Sept 6, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c3f')) * B(po)}><Text size={50} color={f >= po ? C.blue : C.ink}>{f >= po ? 'blame? a political question' : "who's to blame?"}</Text></G2>
            {[0, 1, 2].map((i) => <Barrel key={i} x={260 + i * 170} y={560} s={0.5 * pop(f, A('c3f') + 2 + i)} o={i === 2 ? 1 - 0.8 * L(ls) : 1} />)}
            <G2 x={430} y={800} s={pop(f, A('c3f') + 4) * B(ls)} o={D(ls)}><Text size={48}>less oil</Text></G2>
            {[0, 1, 2, 3].map((i) => <Car key={i} x={1320 + (i % 2) * 300} y={470 + Math.floor(i / 2) * 200} s={0.9 * pop(f, A('c3f') + 3 + i)} />)}
            <G2 x={1470} y={800} s={pop(f, A('c3f') + 5) * B(dr)} o={D(dr)}><Text size={48}>same drivers</Text></G2>
            <G2 x={960} y={520} s={pop(f, A('c3f') + 6) * B(up)}>
              <path d="M -60 180 L -60 -20 L -120 -20 L 0 -170 L 120 -20 L 60 -20 L 60 180 Z" fill={f >= up ? C.red : '#E3E7EC'} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
              <Text y={250} size={52} color={f >= up ? C.red : GREY}>PRICE</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c3g')) * B(au)}><Text size={56}>AUCTION: the last slice</Text></G2>
            <rect x={840} y={560} width={240} height={260} rx={10} fill="#E3E7EC" stroke={C.ink} strokeWidth={6} />
            <Pizza x={960} y={480} s={0.55 * pop(f, A('c3g') + 2) * B(sl)} eaten={7} />
            {[['$5', 360, 21, au], ['$20', 1480, 44, sl], ['$100!!', 1720, 13, cr]].map(([v, x, sd, a], i) => (
              <g key={i}>
                <Stick f={f} x={Number(x)} y={880} s={0.95 * pop(f, A('c3g') + 3 + i)} acc={i === 0 ? ['cap'] : i === 1 ? ['ponytail'] : ['tophat', 'monocle', 'tie']} seed={Number(sd)} keys={[{at: 0, pose: 'point_up', expr: 'grin', look: i ? -0.8 : 0.8}]} />
                <G2 x={Number(x)} y={420} s={pop(f, A('c3g') + 5 + i) * B(Number(a))} o={D(Number(a))}><Bubble text={String(v)} size={52} tail="down" /></G2>
              </g>
            ))}
            <Dave f={f} x={620} y={880} s={0.95} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Inside a gallon ============
  {
    const rc = w('c4a', 'receipt');
    const sl = w('c4b', 'slice');
    const ei = w('c4b', 'e');
    const cru = w('c4c', 'crude');
    const ff = w('c4c', 'forty');
    const tf = w('c4c', 'two', 1);
    const rf = w('c4d', 'refining');
    const sp = w('c4d', 'spaghetti');
    const di = w('c4e', 'distribution');
    const fi = w('c4e', 'fifteen');
    const tx = w('c4f', 'taxes');
    const ei2 = w('c4f', 'eighteen');
    const th = w('c4f', 'thirty');
    const fy = w('c4f', 'fifty');
    const fx = w('c4g', 'fixed');
    const cs = w('c4g', 'crude');
    q(rc, 'paper', 0.6);
    q(sl, 'pop', 0.5);
    q(ei, 'paper', 0.4);
    q(cru, 'thud', 0.5);
    q(tf, 'cash', 0.6);
    q(rf, 'pop', 0.5);
    q(sp, 'boing', 0.5);
    q(di, 'pop', 0.5);
    q(fi, 'coin', 0.5);
    q(tx, 'pop', 0.5);
    q(ei2, 'coin', 0.4);
    q(th, 'coin', 0.4);
    q(fy, 'cash', 0.6);
    q(fx, 'stamp', 0.6);
    q(cs, 'ding', 0.6);
    const bsx = [bs('c4c'), bs('c4d'), bs('c4e'), bs('c4f'), bs('c4g')];
    const cur = bsx.filter((x) => f >= x).length - 1;
    const rows = [
      `Crude oil ≈ ${Q(cru, 'half', '?')}`,
      `Refining ≈ ${Q(rf, 'a fifth', '?')}`,
      `Trucks & station ≈ ${Q(fi, '15%', '?')}`,
      `Taxes ≈ ${Q(fy, '52¢', '?')}`,
    ];
    const pp = cur === 4 ? 0 : cur;
    scene(A('c4a'), () =>
      f < A('c4b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}]} />
            <Receipt x={1000} y={480} s={1.3 * pop(f, A('c4a')) * B(rc)} lines={[['Unleaded', '15.0 gal'], ['Price / gal', '$4.48']]} total="TOTAL $67.20" />
            <G2 x={1560} y={460} s={pop(f, A('c4a') + 4) * B(rc)} o={D(rc)}>
              <Text size={180} color={C.blue}>?</Text>
              <Text y={140} size={44}>where does it go?</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={110} s={pop(f, A('c4b'))}><Text size={52}>one gallon ≈ $4.48</Text></G2>
            <SlicePie x={500} y={500} s={pop(f, A('c4b') + 2) * B(sl)} rad={290} pop={pp} slices={[{v: 0.52, c: OIL, l: 'CRUDE'}, {v: 0.22, c: C.blue, l: 'REFINING'}, {v: 0.15, c: C.green, l: 'STATION'}, {v: 0.11, c: C.yellow, l: 'TAX'}]} />
            {rows.map((r, i) => (
              <Row key={i} x={900} y={210 + i * 120} s={0.78 * pop(f, A('c4b') + 4 + i * 2)} n={i + 1} text={r} lit={cur === i || (cur === 4 && i === 0) ? 1 : cur > i ? 0.6 : 0.3} color={[OIL, C.blue, C.green, '#E0A800'][i]} w={1180} />
            ))}
            <G2 x={1360} y={740} s={pop(f, A('c4b') + 12)}>
              {cur < 0 && (
                <g>
                  <Pizza x={-200} s={0.4} eaten={0} />
                  <Text x={120} size={40}>{f >= ei ? 'data: U.S. EIA' : 'slice the gallon'}</Text>
                </g>
              )}
            </G2>
            {cur === 0 && (
              <G2 x={1360} y={740} s={pop(f, bsx[0])}>
                <Barrel x={-250} s={0.42} label="$104" />
                <G2 x={140} s={B(tf)}><Text size={46} color={f >= tf ? C.red : C.ink}>{`$104 ÷ ${Q(ff, '42')} = ${Q(tf, '$2.48')}`}</Text></G2>
              </G2>
            )}
            {cur === 1 && (
              <G2 x={1360} y={740} s={pop(f, bsx[1])}>
                <Refinery x={-220} y={80} s={0.48} f={f} />
                <G2 x={170} s={B(sp)}><Text size={42}>{f >= sp ? 'spaghetti of pipes' : 'black goo → gasoline'}</Text></G2>
              </G2>
            )}
            {cur === 2 && (
              <G2 x={1360} y={740} s={pop(f, bsx[2])}>
                <Truck x={-260} y={50} s={0.8} />
                <GasPump x={-20} y={90} s={0.3} />
                <G2 x={250} s={B(fi)}><Text size={42}>{`${Q(fi, '15¢', '?')} per $1`}</Text></G2>
              </G2>
            )}
            {cur === 3 && (
              <G2 x={1360} y={740} s={pop(f, bsx[3])}>
                <Text size={50}>{`${Q(ei2, '18.4¢ fed')}  +  ${Q(th, '33.6¢ state')}  =  ${Q(fy, '52¢')}`}</Text>
              </G2>
            )}
            {cur === 4 && (
              <G2 x={1360} y={740} s={pop(f, bsx[4]) * B(fx)}>
                <Box w={900} h={120} fill={f >= cs ? C.yellow : '#fff'} />
                <Text size={42}>taxes = fixed cents · the jump = crude</Text>
              </G2>
            )}
            <SourceTag f={f} at={ei} text="U.S. EIA pump components (May 2026) · taxes: 18.4¢ fed + 33.55¢ avg state" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Rockets & feathers ============
  {
    const oj = w('c5a', 'jumps');
    const ov = w('c5a', 'overnight');
    const ofl = w('c5a', 'falls');
    const fo = w('c5a', 'forever');
    const rk = w('c5b', 'rockets');
    const rk2 = w('c5b', 'rocket');
    const fe = w('c5b', 'feather');
    const vl = w('c5c', 'villain');
    const np = w('c5c', 'nope');
    const lt = w('c5c', 'little');
    const sn = w('c5c', 'snacks');
    const tr = w('c5d', 'truckload');
    const ra = w('c5d', 'raises');
    const sf = w('c5d', 'safe');
    const cf = w('c5e', 'first');
    const wt = w('c5e', 'waits');
    const sh = w('c5e', 'shop');
    const rs = w('c5e', 'rush');
    const rac = w('c5f', 'raccoon');
    const lv = w('c5f', 'loves');
    const ce = w('c5f', 'cents');
    q(oj, 'boing', 0.5);
    q(ov, 'cash', 0.6);
    q(ofl, 'whoosh_s', 0.5);
    q(fo, 'cricket', 0.6);
    q(rk, 'ding', 0.5);
    q(rk2, 'whoosh', 0.7);
    q(fe, 'flutter', 0.6);
    q(vl, 'sting', 0.4);
    q(np, 'buzz', 0.6);
    q(lt, 'coin', 0.4);
    q(sn, 'crinkle', 0.6);
    q(tr, 'pop', 0.5);
    q(ra, 'cash', 0.6);
    q(cf, 'pop', 0.5);
    q(wt, 'tick', 0.5);
    q(rs, 'cricket', 0.5);
    q(rac, 'pop', 0.6);
    q(lv, 'flutter', 0.5);
    q(ce, 'coin', 0.6);
    scene(A('c5a'), () =>
      f < A('c5b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[0, 1].map((i) => (
              <G2 key={i} x={i ? 1440 : 480} y={470} s={pop(f, A('c5a') + i * 4) * B(i ? fo : ov)} o={D(i ? ofl : oj)}>
                <Frame w={620} h={580} label={i ? 'oil DOWN → pump: slow' : 'oil UP → pump: fast'}>
                  <GasPump x={-90} y={170} s={0.58} price={i ? (f >= fo ? '$4.77' : '$4.79') : f >= ov ? '$4.79' : '$4.48'} hl={L(i ? fo : ov)} color={i ? C.blue : C.red} />
                  {i ? <Clock f={f} x={170} y={-90} s={0.8} /> : <path d="M 170 40 L 170 -120 L 120 -120 L 200 -210 L 280 -120 L 230 -120 L 230 40 Z" fill={C.red} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" transform="translate(-30,0)" />}
                </Frame>
              </G2>
            ))}
            <Dave f={f} x={960} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'suspicious'}, {at: fo, pose: 'facepalm', expr: 'tired'}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c5b')) * B(rk)}><Text size={70} color={f >= rk ? C.red : C.ink}>ROCKETS & FEATHERS</Text></G2>
            <Rocket x={480} y={ease(f, rk2, rk2 + 20, 620, 360)} s={pop(f, A('c5b') + 2)} f={f} flame={0.3 + 0.7 * L(rk2)} />
            <G2 x={480} y={860} s={pop(f, A('c5b') + 4) * B(rk2)} o={D(rk2)}><Text size={46} color={C.red}>prices UP: fast</Text></G2>
            <Feather x={1440 + Math.sin(f / 12) * 60} y={lin(f, fe - 10, fe + 120, 340, 560)} r={Math.sin(f / 12) * 25} s={pop(f, A('c5b') + 3)} />
            <G2 x={1440} y={860} s={pop(f, A('c5b') + 5) * B(fe)} o={D(fe)}><Text size={46} color={C.green}>prices DOWN: slow</Text></G2>
            <Prof f={f} x={960} y={880} s={1} keys={[{at: 0, pose: 'present', expr: 'happy'}]} />
            <G2 x={960} y={420} s={pop(f, A('c5b') + 6)}><Text size={36} color={GREY}>economists' name for it</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Owner f={f} x={330} y={880} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.8}, {at: np, pose: 'hips', expr: 'happy', look: 0.8}]} />
            <G2 x={330} y={380} s={pop(f, A('c5c') + 2) * B(np)}>
              {f < np ? <Bubble text="the villain?" size={44} tail="down" /> : <Stamp text="NOPE" size={70} color={C.red} r={-6} />}
            </G2>
            <G2 x={900} y={430} s={pop(f, A('c5c') + 4) * B(lt)} o={D(lt)}>
              <Frame w={440} h={460} label="per gallon">
                <Coin s={0.5} y={-40} />
                <Text y={80} size={40}>a few cents</Text>
              </Frame>
            </G2>
            <G2 x={1480} y={430} s={pop(f, A('c5c') + 6) * B(sn)} o={D(sn)}>
              <Frame w={640} h={460} label="snacks & coffee">
                <Coffee x={-140} y={60} s={1.1} f={f} />
                <Chips x={130} y={-10} s={1} />
              </Frame>
            </G2>
            <G2 x={1480} y={780} s={pop(f, A('c5c') + 8)} o={D(sn)}><Text size={42} color={C.green}>often the bigger profit</Text></G2>
            <SourceTag f={f} at={lt} text="NACS: fuel margins thin, in-store sales drive profit" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Rocket x={200} y={300} s={0.55 * pop(f, A('c5d'))} f={f} />
            <Truck x={680} y={700} s={1.7 * pop(f, A('c5d') + 2)} />
            <PriceTag x={680} y={400} s={1.2 * pop(f, A('c5d') + 4) * B(tr)} text={f >= tr ? 'next load: $$$' : 'next load'} color={f >= tr ? C.red : C.yellow} />
            <GasPump x={1350} y={860} s={0.9 * pop(f, A('c5d') + 4)} price={f >= ra ? '$4.79' : '$4.48'} hl={L(ra)} />
            <G2 x={1650} y={500} s={pop(f, A('c5d') + 6) * B(ra)} o={D(ra)}>
              <path d="M -30 120 L -30 -20 L -70 -20 L 0 -110 L 70 -20 L 30 -20 L 30 120 Z" fill={C.red} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            </G2>
            <G2 x={1350} y={230} s={pop(f, A('c5d') + 6) * B(sf)} o={D(sf)}><Text size={50}>raise it now, "to be safe"</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Feather x={180 + Math.sin(f / 14) * 40} y={lin(f, A('c5e'), A('c5f'), 250, 520)} r={Math.sin(f / 14) * 25} s={0.7 * pop(f, A('c5e'))} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <GasPump x={620 + i * 480} y={800} s={0.55 * pop(f, A('c5e') + 2 + i * 2)} price="$4.79" color={[C.red, C.blue, C.green][i]} />
                <Stick f={f} x={780 + i * 480} y={800} s={0.7 * pop(f, A('c5e') + 3 + i * 2)} acc={[['cap'], ['ponytail'], ['glasses']][i] as StickProps['acc']} seed={60 + i} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: Math.sin((f + i * 40) / 25)}]} />
              </g>
            ))}
            <G2 x={1100} y={300} s={pop(f, A('c5e') + 4) * B(cf)} o={D(cf)}><Bubble text="who cuts first?" size={48} tail="down" /></G2>
            <G2 x={1100} y={120} s={pop(f, A('c5e') + 6) * B(sh)} o={D(sh)}><Text size={46} color={GREY}>{f >= rs ? "drivers don't shop around · no rush" : "drivers don't shop around"}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Raccoon f={f} x={720} y={820} s={1.4 * pop(f, A('c5f')) * B(rac)} mood="sneaky" holdCoin />
            <Feather x={500} y={420} s={0.8 * pop(f, A('c5f') + 3) * B(lv)} r={-25 + Math.sin(f / 10) * 8} />
            <G2 x={720} y={160} s={pop(f, A('c5f') + 4)} o={D(rac)}><Text size={44} color={GREY}>from our credit card video</Text></G2>
            <G2 x={1450} y={380} s={pop(f, A('c5f') + 5) * B(ce)}>
              <Box w={560} h={130} fill={f >= ce ? C.yellow : '#fff'} />
              <Text size={50}>+ a few cents / day</Text>
            </G2>
            <MoneyStack x={1450} y={760} s={pop(f, A('c5f') + 6)} n={Math.round(lin(f, A('c5f'), A('c5f') + 200, 2, 7))} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 1973 ============
  {
    const sv = w('c6a', 'seventy');
    const oc = w('c6b', 'october');
    const pr = w('c6b', 'producers');
    const stp = w('c6b', 'stopped');
    const qd = w('c6c', 'quadrupled');
    const th = w('c6c', 'three');
    const tw = w('c6c', 'twelve');
    const hr = w('c6d', 'hours');
    const od = w('c6d', 'odd');
    const ff = w('c6d', 'fifty');
    const sk = w('c6e', 'shock');
    const id = w('c6e', 'idea');
    const st = w('c6e', 'stash');
    q(sv, 'flip', 0.6);
    q(oc, 'flip', 0.4);
    q(stp, 'stamp', 0.7);
    q(qd, 'stamp', 0.7);
    q(th, 'pop', 0.4);
    q(tw, 'cash', 0.6);
    q(hr, 'tick', 0.5);
    q(od, 'ding', 0.5);
    q(ff, 'ding', 0.5);
    q(sk, 'thud', 0.5);
    q(id, 'ding', 0.6);
    q(st, 'chime', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        {f < A('c6d') ? <Board /> : f < A('c6e') ? <Street f={f} /> : <Board />}
        {f < A('c6b') ? (
          <Svg>
            <Calendar x={600} y={480} s={1.2 * pop(f, A('c6a')) * B(sv)} top="BACK TO" year={1973} flip={0} />
            <Dave f={f} x={1250} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}]} />
            <G2 x={1300} y={300} s={pop(f, A('c6a') + 3)}><Bubble text="sounds familiar..." size={46} tail="down" /></G2>
          </Svg>
        ) : f < A('c6c') ? (
          <Svg>
            <Calendar x={260} y={300} s={0.8 * pop(f, A('c6b')) * B(oc)} top="OCTOBER" year={1973} flip={0} />
            <G2 x={960} y={130} s={pop(f, A('c6b') + 2) * B(pr)} o={D(pr)}><Text size={52}>Arab oil producers → USA</Text></G2>
            {[0, 1, 2].map((i) => <Barrel key={i} x={780 + i * 260} y={560} s={0.75 * pop(f, A('c6b') + 3 + i)} />)}
            <G2 x={1040} y={560} o={0.12 + 0.88 * L(stp)} s={B(stp)}><Stamp text="EMBARGO" size={90} color={C.red} r={-8} /></G2>
            <Flag kind="us" x={1650} y={520} s={0.9 * pop(f, A('c6b') + 6)} />
          </Svg>
        ) : f < A('c6d') ? (
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c6c'))}><Text size={52}>price of one barrel</Text></G2>
            <Barrel x={260} y={560} s={0.9 * pop(f, A('c6c') + 2)} />
            <line x1={560} y1={800} x2={1460} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={780} y={800} s={pop(f, A('c6c') + 3)} w={260} h={ease(f, th - 4, th + 12, 60, 120)} color="#8C7A5B" label="1973" value={Q(th, '~$3')} />
            <Bar x={1240} y={800} s={pop(f, A('c6c') + 5)} w={260} h={ease(f, tw - 4, tw + 12, 60, 480)} color={C.red} label="early 1974" value={Q(tw, '~$12')} />
            <G2 x={1640} y={360} s={pop(f, A('c6c') + 6) * B(qd)} o={0.2 + 0.8 * L(qd)}><Stamp text="×4" size={100} color={C.red} r={-8} /></G2>
            <SourceTag f={f} at={th} text="U.S. State Dept, Office of the Historian: Oil Embargo 1973–74" />
          </Svg>
        ) : f < A('c6e') ? (
          <Svg>
            {[0, 1, 2, 3, 4].map((i) => <Car key={i} x={150 + i * 230} y={822} s={0.85 * pop(f, A('c6d') + i * 2)} />)}
            <GasPump x={1360} y={822} s={0.7 * pop(f, A('c6d') + 2)} price="SORRY" color="#8C7A5B" />
            <G2 x={600} y={420} s={pop(f, A('c6d') + 4) * B(hr)} o={D(hr)}><Text size={56}>gas lines: hours</Text></G2>
            <G2 x={1360} y={220} s={pop(f, A('c6d') + 5) * B(od)} o={D(od)}>
              <Box w={440} h={120} fill={f >= od ? C.yellow : '#fff'} />
              <Text size={46}>ODD / EVEN days</Text>
            </G2>
            <G2 x={1720} y={520} s={pop(f, A('c6d') + 6) * B(ff)}>
              <line x1={0} y1={60} x2={0} y2={300} stroke={C.ink} strokeWidth={10} />
              <rect x={-90} y={-110} width={180} height={200} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <Text y={-60} size={26}>SPEED LIMIT</Text>
              <Text y={20} size={90} color={f >= ff ? C.red : C.ink}>55</Text>
            </G2>
          </Svg>
        ) : (
          <Svg>
            <Bank x={520} y={860} s={0.8 * pop(f, A('c6e'))} label="WASHINGTON" />
            <G2 x={520} y={200} s={pop(f, A('c6e') + 2) * B(sk)} o={D(sk)}><Text size={52} color={C.red}>a huge shock</Text></G2>
            <G2 x={1300} y={300} s={pop(f, A('c6e') + 4) * B(id)} o={D(id)}><Bubble text="a giant emergency stash?" size={50} tail="left" /></G2>
            <G2 x={1300} y={660} s={pop(f, A('c6e') + 6) * B(st)}>
              {[0, 1, 2].map((i) => <Barrel key={i} x={(i - 1) * 200} s={0.6} />)}
            </G2>
          </Svg>
        )}
        <OldFilm f={f} o={1 - ease(f, A('c6e'), A('c6e') + 30, 0, 0.6)} />
      </AbsoluteFill>
    ));
  }

  // ============ CH7 SPR ============
  {
    const sg = w('c7a', 'strategic');
    const sv = w('c7a', 'seventy');
    const tk = w('c7b', 'tanks');
    const sc = w('c7b', 'salt');
    const tx = w('c7b', 'texas');
    const pg = w('c7b', 'piggy');
    const svh = w('c7c', 'seven');
    const fh = w('c7c', 'four');
    const mr = w('c7d', 'march');
    const ot = w('c7d', 'one');
    const iea = w('c7d', 'international');
    const fhm = w('c7d', 'four');
    const bg = w('c7d', 'biggest');
    const th = w('c7e', 'two');
    const lw = w('c7e', 'lowest');
    const sup = w('c7f', 'supporters');
    const cr = w('c7f', 'critics');
    const shr = w('c7f', 'shrinking');
    const bp = w('c7f', 'both');
    q(sg, 'ding', 0.6);
    q(sv, 'flip', 0.5);
    q(tk, 'buzz', 0.4);
    q(sc, 'thud', 0.5);
    q(pg, 'coin', 0.6);
    q(svh, 'pop', 0.5);
    q(fh, 'pop', 0.5);
    q(mr, 'flip', 0.5);
    q(ot, 'whoosh', 0.5);
    q(iea, 'pop', 0.5);
    q(bg, 'stamp', 0.6);
    q(th, 'thud', 0.6);
    q(lw, 'sting', 0.5);
    q(sup, 'pop', 0.5);
    q(cr, 'pop', 0.5);
    q(shr, 'poof', 0.5);
    q(bp, 'ding', 0.5);
    const lvl = keyed(f, [[A('c7c'), 415], [ot, 415], [A('c7e'), 330], [th + 10, 285]]);
    const rowsSpr: [string, number][] = [
      [`capacity: ${Q(svh, '714M')}`, svh],
      [`before the war: ${Q(fh, '415M')}`, fh],
      [`released: ${Q(ot, '172M')} (US)`, ot],
      [`Sept 4: ${Q(th, '285M')}`, th],
    ];
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={pop(f, A('c7a')) * B(sg)}><Text size={58} color={f >= sg ? C.blue : C.ink}>STRATEGIC PETROLEUM RESERVE</Text></G2>
            <Calendar x={230} y={420} s={0.75 * pop(f, A('c7a') + 2) * B(sv)} top="CREATED" year={1975} flip={0} />
            <SaltCave x={950} y={590} s={0.85 * pop(f, A('c7a') + 3) * B(sc)} level={0.55} label={f >= tx ? 'TEXAS & LOUISIANA' : 'UNDERGROUND'} />
            <G2 x={950} y={220 + 0} o={D(tk)} s={pop(f, A('c7a') + 5)}><Text size={38} color={C.red}>{f >= tk ? 'not tanks: salt caves' : ''}</Text></G2>
            <Piggy x={1620} y={600} s={0.95 * pop(f, A('c7a') + 5) * B(pg)} label="SPR" />
            <G2 x={1620} y={380} s={pop(f, A('c7a') + 6)} o={D(pg)}><Text size={40}>a piggy bank in salt</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SaltCave x={620} y={560} s={pop(f, A('c7c'))} level={(lvl / 714) * 0.95} label="SPR" />
            <G2 x={620} y={560} s={pop(f, A('c7c'))}>
              <line x1={-200} y1={180 - 360 * 0.95} x2={200} y2={180 - 360 * 0.95} stroke={C.red} strokeWidth={6} strokeDasharray="16 12" opacity={D(svh)} />
              <G2 x={330} y={180 - 360 * ((lvl / 714) * 0.95)}><Text size={44} color="#fff" stroke={C.ink} sw={6}>{`${Math.round(lvl)}M`}</Text></G2>
            </G2>
            <Arrow d="M 620 250 Q 700 120 900 150" t={ease(f, ot, ot + 20)} color={C.red} w={12} />
            {rowsSpr.map(([r, a], i) => (
              <Row key={i} x={1180} y={230 + i * 140} s={0.64 * pop(f, A('c7c') + 3 + i * 2)} n={i + 1} text={r} lit={f >= a ? 1 : 0.35} color={i === 3 ? C.red : C.blue} w={1060} />
            ))}
            <G2 x={1520} y={810} s={pop(f, A('c7c') + 10) * B(bg)} o={D(iea)}><Text size={38} color={GREY}>{`+ IEA countries: ${Q(fhm, '400M')} (biggest ever)`}</Text></G2>
            <G2 x={620} y={120} s={pop(f, A('c7c') + 4) * B(lw)} o={0.2 + 0.8 * L(lw)}><Stamp text="LOWEST SINCE 1983" size={46} color={C.red} r={-3} /></G2>
            <Calendar x={120} y={160} s={0.4 * pop(f, A('c7c') + 6) * B(mr)} top={f >= A('c7e') ? 'SEPT' : 'MARCH'} year={2026} flip={0} />
            <SourceTag f={f} at={svh} text="U.S. DOE · CNBC Mar 11 & Aug 10, 2026: 285.4M bbl on Sept 4, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {Array.from({length: 22}).map((_, i) => {
              const x = (i * 97) % 1920;
              const y = ((f * 14 + i * 173) % 900) + 60;
              return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 40} stroke="#5AB6E0" strokeWidth={6} strokeLinecap="round" opacity={0.6} />;
            })}
            <Umbrella x={960} y={600} s={(1.25 - 0.6 * ease(f, shr - 10, shr + 30)) * pop(f, A('c7f'))} />
            <Dave f={f} x={960} y={900} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'worried'}, {at: shr, pose: 'panic', expr: 'shock'}]} sweat={f >= shr} />
            <G2 x={380} y={300} s={pop(f, A('c7f') + 3) * B(sup)} o={D(sup)}>
              <Box w={560} h={170} fill="#E6F6EE" />
              <Text y={-30} size={40} color={C.green}>SUPPORTERS</Text>
              <Text y={30} size={36}>"that's a rainy day fund"</Text>
            </G2>
            <G2 x={1540} y={300} s={pop(f, A('c7f') + 5) * B(cr)} o={D(cr)}>
              <Box w={560} h={170} fill="#FFE0E6" />
              <Text y={-30} size={40} color={C.red}>CRITICS</Text>
              <Text y={30} size={36}>"the umbrella is shrinking"</Text>
            </G2>
            <G2 x={960} y={130} s={pop(f, A('c7f') + 6) * B(bp)} o={D(bp)}><Text size={50}>both have a point</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Winners & losers ============
  {
    const wh = w('c8a', 'where');
    const ex = w('c8b', 'exxon');
    const ft = w('c8b', 'fourteen');
    const sx = w('c8b', 'sixty');
    const cv = w('c8c', 'chevron');
    const tw = w('c8c', 'twelve');
    const ev = w('c8c', 'ever');
    const am = w('c8c', 'american');
    const hi = w('c8c', 'higher');
    const lo = [w('c8d', 'drivers'), w('c8d', 'truckers'), w('c8d', 'airlines'), w('c8d', 'farmers')];
    const lsr = w('c8d', 'losers');
    const tr = w('c8e', 'truck');
    const fd = w('c8e', 'food');
    const inf = w('c8e', 'inflation');
    const wf = w('c8f', 'windfall');
    const ot = w('c8f', 'others');
    const pf = w('c8f', 'political');
    const nb = w('c8f', 'numbers');
    q(wh, 'pop', 0.5);
    q(ft, 'cash', 0.7);
    q(sx, 'coin', 0.6);
    q(tw, 'cash', 0.6);
    q(ev, 'stamp', 0.6);
    q(hi, 'ding', 0.5);
    q(lsr, 'trombone', 0.5);
    lo.forEach((x) => q(x, 'pop', 0.5));
    q(tr, 'pop', 0.5);
    q(fd, 'ding', 0.5);
    q(inf, 'ding', 0.5);
    q(wf, 'pop', 0.5);
    q(ot, 'pop', 0.5);
    q(nb, 'chime', 0.5);
    const tilt = f < ot ? ease(f, wf, wf + 20, 0, -10) : f < pf ? ease(f, ot, ot + 20, -10, 10) : ease(f, pf, pf + 20, 10, 0);
    const lbl = ['drivers', 'truckers', 'airlines', 'farmers'];
    scene(A('c8a'), () =>
      f < A('c8b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.15} keys={[{at: 0, pose: 'present', expr: 'worried', look: 0.8}]} />
            {[0, 1, 2].map((i) => {
              const k = ((f - A('c8a')) / 40 + i / 3) % 1;
              return <Bill key={i} x={560 + k * 800} y={520 - Math.sin(k * Math.PI) * 220} s={0.9 * pop(f, A('c8a') + i * 3)} r={k * 200} />;
            })}
            <G2 x={1500} y={480} s={pop(f, A('c8a') + 4) * B(wh)}><Text size={220} color={C.blue}>?</Text></G2>
            <G2 x={1100} y={130} s={pop(f, A('c8a') + 2)} o={D(wh)}><Text size={52}>Dave's extra money goes... where?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={110} s={pop(f, A('c8b'))}><Text size={60} color={C.green}>WINNERS · profit, Apr–Jun 2026</Text></G2>
            <line x1={300} y1={800} x2={1220} y2={800} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={520} y={800} s={pop(f, A('c8b') + 2) * B(ft)} w={260} h={ease(f, ft - 4, ft + 12, 60, 435)} color={C.green} label="EXXON" value={Q(ft, '$14.5B')} />
            <Bar x={1000} y={800} s={pop(f, A('c8b') + 4) * B(tw)} w={260} h={ease(f, tw - 4, tw + 12, 60, 363)} color={C.green} label="CHEVRON" value={Q(tw, '$12.1B')} />
            <G2 x={1000} y={260} o={0.15 + 0.85 * L(ev)} s={B(ev)}><Stamp text="BEST QUARTER EVER" size={36} color={C.green} r={-4} /></G2>
            <G2 x={1570} y={300} s={pop(f, A('c8b') + 5) * B(sx)} o={D(ex)}>
              <Box w={520} h={170} fill={f >= sx ? C.yellow : '#fff'} />
              <Text y={-25} size={56}>{Q(sx, '$160M', '$?')}</Text>
              <Text y={40} size={36}>per day (Exxon)</Text>
            </G2>
            <G2 x={1570} y={640} s={pop(f, A('c8b') + 7) * B(hi)} o={D(am)}>
              <Flag kind="us" x={-120} y={-60} s={0.55} />
              <Barrel x={120} s={0.55} price={f >= hi ? '$104' : '$70'} />
            </G2>
            <SourceTag f={f} at={ft} text="ExxonMobil & Chevron Q2 2026 results (Jul 31, 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={100} s={pop(f, A('c8d')) * B(lsr)}><Text size={60} color={C.red}>LOSERS</Text></G2>
            {lbl.map((l, i) => (
              <G2 key={l} x={290 + i * 447} y={400} s={pop(f, A('c8d') + 2 + i * 2) * B(lo[i])} o={D(lo[i])}>
                <Frame w={400} h={400} label={l}>
                  {i === 0 && <><Car x={40} y={30} s={0.9} /><Dave f={f} x={-120} y={120} s={0.55} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} /></>}
                  {i === 1 && <Truck y={40} s={1} />}
                  {i === 2 && <Jet y={0} s={0.42} name="AIR" />}
                  {i === 3 && <Tractor y={50} s={0.9} />}
                </Frame>
              </G2>
            ))}
            <G2 x={960} y={770} s={pop(f, A('c8d') + 10)} o={0.3 + 0.7 * L(tr)}>
              <Truck x={-600} y={30} s={0.8} />
              <Bread x={-300} y={0} s={0.8} />
              <PriceTag x={-80} y={0} s={0.8} text={f >= fd ? 'price ↑' : 'price'} color={f >= fd ? C.red : C.yellow} />
              <G2 x={250} s={B(inf)}><Text size={44} color={f >= inf ? C.red : C.ink}>= inflation spreads</Text></G2>
              <Thermo x={560} y={80} s={0.5} level={0.3 + 0.6 * L(inf)} />
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bank x={960} y={560} s={0.45 * pop(f, A('c8f'))} label="CONGRESS" />
            <Scale x={960} y={1000} s={pop(f, A('c8f') + 2)} tilt={tilt} left="windfall tax" right="less drilling?" />
            <G2 x={330} y={380} s={pop(f, A('c8f') + 4) * B(wf)} o={D(wf)}><Bubble text="tax the windfall!" size={42} tail="down" /></G2>
            <G2 x={1590} y={380} s={pop(f, A('c8f') + 6) * B(ot)} o={D(ot)}><Bubble text="less supply!" size={42} tail="down" /></G2>
            <G2 x={960} y={130} s={pop(f, A('c8f') + 3) * B(nb)}><Text size={52} color={f >= pf ? C.blue : C.ink}>{f >= nb ? 'now you know the numbers' : 'a political fight'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 practical ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f')];
    const ed = w('c9a', 'education');
    const ap = w('c9b', 'app');
    const ft = w('c9c', 'fifteen');
    const tp = w('c9d', 'tire');
    const jk = w('c9d', 'junk');
    const mn = w('c9e', 'manual');
    const nt = w('c9e', 'nothing');
    const ftc = w('c9f', 'federal');
    const dw = w('c9f', 'dont');
    const gm = w('c9g', 'grandma');
    const fl = w('c9g', 'first');
    q(ed, 'ding', 0.5);
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(ap, 'click', 0.6);
    q(ft, 'pop', 0.5);
    q(tp, 'pop', 0.5);
    q(jk, 'thud', 0.5);
    q(mn, 'paper', 0.5);
    q(nt, 'buzz', 0.5);
    q(dw, 'buzz', 0.6);
    q(gm, 'pop', 0.5);
    q(fl, 'chime', 0.6);
    const items = ['Compare prices', 'Drive gently', 'Tires & trunk junk', 'Premium only if needed', 'Skip "magic" gadgets'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c9a'), () =>
      f < A('c9g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={600} y={110}><Text size={60}>What Dave can do</Text></G2>
            <G2 x={1500} y={110} s={B(ed)}><Text size={36} color={f >= ed ? C.red : '#8C7A5B'}>(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={110} y={250 + i * 125} s={0.8 * pop(f, A('c9a') + 2 + i * 2)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.6 : 0.3} color={C.green} w={1150} />)}
            {cur === 0 && <Dave f={f} x={1500} y={880} s={1.15} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}]} />}
            {cur === 1 && <G2 x={1500} y={520} s={pop(f, hs[0]) * B(ap)}><Phone s={1.1} title="GAS PRICES" value="$4.29" color={C.green} /></G2>}
            {cur === 2 && (
              <G2 x={1500} y={520} s={pop(f, hs[1])}>
                <Dial v={f >= ft ? 0.2 : 0.85} label="SPEED" />
                <G2 y={200} s={B(ft)}><Text size={44} color={C.red}>{`mileage: ${Q(ft, '-15 to 30%', '?')}`}</Text></G2>
              </G2>
            )}
            {cur === 3 && (
              <G2 x={1500} y={520} s={pop(f, hs[2])}>
                <Tire x={-80} y={-40} s={1} psi={f >= tp ? '35 PSI ✓' : '35 PSI'} />
                <G2 x={0} y={220} o={D(jk)} s={B(jk)}><Text size={42}>less junk in the trunk</Text></G2>
              </G2>
            )}
            {cur === 4 && (
              <G2 x={1500} y={560} s={pop(f, hs[3])}>
                <GasPump x={-60} y={220} s={0.7} price="PREMIUM" color={C.navy} hl={L(mn)} />
                <G2 x={-60} y={-80} o={L(nt)} s={B(nt)}><XMark s={0.4} /></G2>
                <G2 x={220} y={-160} s={B(mn)}><Text size={38}>check the manual</Text></G2>
              </G2>
            )}
            {cur === 5 && (
              <G2 x={1500} y={520} s={pop(f, hs[4])}>
                <rect x={-150} y={-110} width={300} height={220} rx={24} fill={C.gold} stroke={C.ink} strokeWidth={6} />
                <Text y={-20} size={40}>MAGIC</Text>
                <Text y={30} size={30}>+50 MPG!!</Text>
                <G2 o={L(dw)} s={B(dw)}><XMark s={0.5} /></G2>
                <G2 y={200} o={D(ftc)}><Text size={36} color={GREY}>FTC: most don't work</Text></G2>
              </G2>
            )}
            <SourceTag f={f} at={ft} text="fueleconomy.gov (DOE/EPA) · FTC gas-saving products guidance" until={hs[3]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Car x={lin(f, A('c9g'), A('c9g') + 200, 500, 1150)} y={822} s={1.4 * pop(f, A('c9g'))} />
            <GasPump x={1600} y={822} s={0.8 * pop(f, A('c9g') + 3)} price="$4.29" color={C.green} hl={L(fl)} />
            <Grandma f={f} x={260} y={822} s={1.1} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.8}]} />
            <G2 x={800} y={250} s={pop(f, A('c9g') + 4) * B(gm)} o={D(gm)}><Text size={52}>Dave drives like Grandma</Text></G2>
            <G2 x={1600} y={260} s={pop(f, A('c9g') + 6) * B(fl)} o={D(fl)}><Text size={44} color={C.green}>first in line!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ RECAP ============
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const recap = ['1/5 of world oil → 21-mile Hormuz', 'Half of each gallon = crude oil', 'Up like a rocket, down like a feather'];
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('d1a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => (
            <G2 key={i} s={1} o={1}>
              <Row x={200} y={360 + i * 170} s={pop(f, A('d1a') + 4 + i * 3) * B(r[i])} n={i + 1} text={b} lit={f >= r[i] ? 1 : 0.35} color={C.blue} w={1240} />
            </G2>
          ))}
          <StraitMap x={1640} y={360} s={0.2 * pop(f, A('d1a') + 6)} f={f} labels={false} o={D(r[0])} />
          <SlicePie x={1640} y={530} s={pop(f, A('d1a') + 8)} rad={70} slices={[{v: 0.52, c: OIL}, {v: 0.22, c: C.blue}, {v: 0.15, c: C.green}, {v: 0.11, c: C.yellow}]} o={D(r[1])} />
          <Feather x={1640} y={700} s={0.5 * pop(f, A('d1a') + 10)} r={30} o={D(r[2])} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ NEXT + SUBSCRIBE ============
  {
    const ai = w('d2a', 'artificial');
    const hb = w('d2a', 'hundreds');
    const fu = w('d2a', 'future');
    const bb = w('d2a', 'bubble');
    const sb = w('d2b', 'subscribe');
    const zr = w('d2b', 'zero');
    q(ai, 'ding', 0.6);
    q(hb, 'cash', 0.6);
    q(fu, 'pop', 0.5);
    q(bb, 'boing', 0.7);
    q(sb, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(zr, 'coin', 0.5);
    scene(A('d2a'), () =>
      f < A('d2b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: bb, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <AiBubble x={1250} y={500} s={1.1 * pop(f, A('d2a')) * B(bb)} f={f} />
            <G2 x={1250} y={110} s={pop(f, A('d2a') + 2) * B(bb)}><Text size={62} color={f >= bb ? C.red : C.ink}>NEXT: is AI a bubble?</Text></G2>
            <G2 x={1250} y={820} s={pop(f, A('d2a') + 4) * B(hb)} o={D(hb)}><Text size={44}>hundreds of billions $ spent</Text></G2>
            <G2 x={380} y={380} s={pop(f, A('d2a') + 6) * B(fu)} o={D(fu)}><Bubble text="future... or bubble?" size={40} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={420} s={1.3 * pop(f, A('d2b'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={420} s={pop(f, A('d2b') + 3)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={400} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <GasPump x={1600} y={900} s={0.6 * pop(f, A('d2b') + 4)} price="$0.00" color={C.green} hl={L(zr)} />
            <G2 x={960} y={720} s={pop(f, A('d2b') + 5) * B(zr)} o={D(zr)}><Text size={46} color={C.green}>free · $0 a gallon</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c3c', 'percent') + 20;
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
