import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Clock, MoneyStack, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Row, SubButton, Bell} from '../props2';
import {Raccoon, Ticket, TollBooth} from '../props3';
import {Globe} from '../props4';
import {Scale, SlicePie} from '../props8';
import {AppTile, BLUE_B, Bucket, Bundle, Cage, ChatBubble, Cheque, CloudBox, Door, Earbuds, GREEN_B, Garden, Gavel, Handset, Laptop, Popcorn, Report10K, TopHat, Watch} from '../props26';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Clerk: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;
const Kevin: React.FC<SP> = (p) => <Stick acc={['cap', 'shades']} seed={88} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string; stroke?: string}> = ({w, h, fill = '#fff', stroke = C.ink}) => (
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={stroke} strokeWidth={6} />
);

const Pill: React.FC<{text: string; val?: string; w?: number; lit?: number; color?: string; size?: number}> = ({text, val, w = 600, lit = 1, color = C.green, size = 40}) => (
  <g opacity={0.75 + 0.25 * lit}>
    <rect x={-w / 2} y={-44} width={w} height={88} rx={44} fill={lit > 0.6 ? '#fff' : '#F1EADC'} stroke={lit > 0.6 ? color : C.ink} strokeWidth={lit > 0.6 ? 8 : 5} />
    <Text x={val ? -w / 2 + 36 : 0} y={2} size={size} anchor={val ? 'start' : 'middle'}>{text}</Text>
    {val && <Text x={w / 2 - 36} y={2} size={size + 4} anchor="end" color={color}>{val}</Text>}
  </g>
);

const NumCard: React.FC<{top: string; val: string; w?: number; color?: string; size?: number}> = ({top, val, w = 700, color = C.ink, size = 96}) => (
  <g>
    <rect x={-w / 2 + 10} y={-110 + 14} width={w} height={220} rx={28} fill="rgba(35,35,43,0.14)" />
    <rect x={-w / 2} y={-110} width={w} height={220} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <Text y={-60} size={34} color="#5B6470" ls={3}>{top}</Text>
    <Text y={24} size={size} color={color}>{val}</Text>
  </g>
);

const Note: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M -20 60 L -20 -60 L 60 -80 L 60 40" fill="none" stroke={C.ink} strokeWidth={14} strokeLinejoin="round" />
    <ellipse cx={-40} cy={60} rx={30} ry={22} fill={C.red} stroke={C.ink} strokeWidth={5} />
    <ellipse cx={40} cy={40} rx={30} ry={22} fill={C.red} stroke={C.ink} strokeWidth={5} />
  </g>
);

const Store: React.FC<{f: number}> = ({f}) => (
  <g>
    <rect x={-320} y={-480} width={640} height={480} fill="#F4F0E6" stroke={C.ink} strokeWidth={6} />
    <rect x={-350} y={-560} width={700} height={100} rx={16} fill={C.navy} stroke={C.ink} strokeWidth={6} />
    <Text y={-508} size={56} color="#fff" ls={4}>APP STORE</Text>
    {[0, 1, 2, 3, 4, 5].map((i) => <AppTile key={i} x={-190 + (i % 3) * 190} y={-360 + Math.floor(i / 3) * 170 + Math.sin(f / 10 + i) * 4} s={0.9} color={[C.blue, C.red, C.green, C.gold, '#B983FF', C.navy][i]} label={['A', 'G', 'M', '$', 'P', 'T'][i]} />)}
    <rect x={-70} y={-110} width={140} height={110} fill={C.wood} stroke={C.ink} strokeWidth={6} />
  </g>
);

const CardBox: React.FC<{label?: string}> = ({label = '?'}) => (
  <g>
    <path d="M -200 -120 L 200 -120 L 200 150 L -200 150 Z" fill="#D8B98A" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -200 -120 L -150 -190 L 250 -190 L 200 -120 Z" fill="#E8CFA6" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 200 -120 L 250 -190 L 250 90 L 200 150 Z" fill="#C9A673" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-40} y={-120} width={80} height={270} fill="#C9A673" opacity={0.7} />
    <Text y={30} size={120} color="#fff" stroke={C.ink} sw={8}>{label}</Text>
  </g>
);

export const Ep26: React.FC = () => {
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
  const lit = (at: number) => ease(f, at - 3, at + 6, 0, 1);
  const bump = (at: number, k = 0.18) => 1 + k * (ease(f, at, at + 5) - ease(f, at + 5, at + 14));
  const In = (at: number, d = 0) => pop(f, at + d);

  // ============ COLD OPEN ============
  {
    const ip = w('o1', 'iphone');
    const th = w('o1', 'thousand');
    const tk = w('o1', 'thinks');
    q(2, 'pop', 0.6);
    q(ip, 'ding', 0.5);
    q(th, 'cash', 0.6);
    q(tk, 'pop', 0.5);
    scene(0, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={330} y={880} s={1.25} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: tk, pose: 'think', expr: 'think', look: 0.8}]} />
          <G2 x={960} y={520} s={1.1 * In(0, 2) * bump(ip, 0.08)}>
            <Handset body="#3A5A8C" cam={lit(ip) * (1 - lit(ip + 20))}>
              <Text y={-60} size={44} color={C.navy}>NEW!</Text>
              <Text y={20} size={30} color="#5B6470">Dave's phone</Text>
              {[80, 120, 160].map((y) => <rect key={y} x={-70} y={y} width={140} height={18} rx={9} fill="#E3E8EE" />)}
            </Handset>
          </G2>
          <G2 x={1560} y={420} s={In(0, 4) * bump(th)}>
            <Box w={440} h={170} fill={C.yellow} />
            <Text y={-30} size={34} color="#5B6470">he paid</Text>
            <Text y={30} size={70}>~$1,000</Text>
          </G2>
          <G2 x={1560} y={700} s={In(0, 6) * bump(tk)}>
            <Bubble text={f >= tk ? "that's Apple's money!" : 'shiny!'} size={40} tail="left" />
          </G2>
          <G2 x={960} y={120} s={In(0, 2)}><Text size={56}>{f >= tk ? 'is THIS how Apple makes money?' : "Dave's brand new phone"}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lk = w('o2', 'look');
    const fr = w('o2', 'four');
    const sv = w('o3', 'seventy');
    const nt = w('o3', 'not');
    q(lk, 'pop', 0.5);
    q(fr, 'cash', 0.7);
    q(sv, 'ding', 0.6);
    q(nt, 'buzz', 0.5);
    scene(A('o2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={300} y={880} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: fr, pose: 'shock', expr: 'shock', look: 0.8}]} />
          <G2 x={1080} y={250} s={In(A('o2')) * bump(fr, 0.1)}>
            <NumCard top="APPLE SALES · ONE YEAR" val={f >= fr ? '$416 BILLION' : '$ ???'} w={960} color={f >= fr ? C.green : C.ink} />
          </G2>
          <G2 x={900} y={620} s={In(A('o2'), 3)}>
            <Text y={-90} size={40}>{f >= sv ? 'one part keeps 75¢ of every $1' : 'one part of the business keeps...'}</Text>
            <rect x={-360} y={-40} width={720} height={100} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <rect x={-354} y={-34} width={708 * ease(f, sv, sv + 16, 0.06, 0.75)} height={88} rx={16} fill={C.green} />
            <Text y={12} size={44} color={C.ink}>$1</Text>
          </G2>
          <G2 x={1600} y={640} s={0.55 * In(A('o2'), 5) * bump(nt)}>
            <Handset body="#3A5A8C"><Text y={0} size={110} color="#9AA5B1">?</Text></Handset>
            {f >= nt && <XMark s={0.45 * pop(f, nt)} />}
          </G2>
          <G2 x={1600} y={450} s={In(A('o2'), 5)} o={0.6 + 0.4 * lit(nt)}><Text size={40} color={C.red}>not the iPhone</Text></G2>
          <SourceTag f={f} at={fr} text="Apple 10-K, fiscal 2025: net sales $416.2B" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ks = ['apps', 'storage', 'music', 'check'].map((x) => w('o4', x));
    ks.forEach((x) => q(x, 'pop', 0.55));
    q(w('o4', 'google'), 'cash', 0.6);
    scene(A('o4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={130} s={In(A('o4'))}><Text size={60} color="#5B6470">AFTER you buy the phone...</Text></G2>
          {['APPS', 'STORAGE', 'MUSIC', '$20B CHECK'].map((l, i) => (
            <G2 key={l} x={270 + i * 460} y={540} s={In(A('o4'), i * 2) * bump(ks[i], 0.1)} o={0.55 + 0.45 * lit(ks[i])}>
              <Frame w={420} h={440} label={l}>
                {i === 0 && [0, 1, 2, 3].map((k) => <AppTile key={k} x={-70 + (k % 2) * 140} y={-120 + Math.floor(k / 2) * 140} s={0.9} color={[C.blue, C.red, C.green, C.gold][k]} label={['A', 'G', 'M', '$'][k]} />)}
                {i === 1 && <CloudBox y={-60} s={0.8} label="iCloud" />}
                {i === 2 && <g transform="translate(0,-50)"><Note s={1.3} /></g>}
                {i === 3 && <Cheque y={-60} s={0.38} amount="$20B" memo="default search" />}
              </Frame>
            </G2>
          ))}
          <SourceTag f={f} at={ks[3]} text="U.S. v. Google (2024): ~$20B paid to Apple in 2022" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gd = w('o5', 'garden');
    const wl = w('o5', 'walls');
    q(gd, 'chime', 0.5);
    q(wl, 'thud', 0.7);
    scene(A('o5'), () => {
      const sh = shake(f, wl + 8);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960 + sh.x} y={930 + sh.y} s={1.12 * In(A('o5'))}>
              <Garden f={f} wall={ease(f, wl, wl + 14, 0.8, 1.7)} gate={1} />
            </G2>
            <Dave f={f} x={lin(f, A('o5'), gd + 10, 700, 960)} y={900} s={0.95} walk={f < gd + 10} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: wl, pose: 'shock', expr: 'worried', look: 0}]} />
            <G2 x={960} y={120} s={In(A('o5'), 2) * bump(wl, 0.12)}><Text size={64} color={f >= wl ? C.red : C.ink}>{f >= wl ? 'a garden... WITH WALLS' : 'a phone... or a garden?'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      );
    });
  }
  {
    const pv = [w('o6', 'money'), w('o6', 'walls'), w('o6', 'enjoy')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {['WHERE THE MONEY COMES FROM', 'WHY THE WALLS', 'ENJOY IT, PAY LESS'].map((l, i) => (
            <G2 key={l} x={380 + i * 580} y={530} s={In(A('o6'), i * 2) * bump(pv[i], 0.08)} o={0.6 + 0.4 * lit(pv[i])}>
              <Frame w={520} h={460} label={l}>
                {i === 0 && <SlicePie y={-50} rad={140} slices={[{v: 0.5, c: C.blue}, {v: 0.24, c: C.gray}, {v: 0.26, c: C.gold}]} />}
                {i === 1 && <Garden y={60} s={0.3} f={f} />}
                {i === 2 && <Dave f={f} x={0} y={140} s={0.6} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />}
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Upgrade ============
  {
    const cm = w('c1b', 'camera');
    const co = w('c1b', 'color');
    const sp = w('c1c', 'salesperson');
    const tr = w('c1c', 'trade');
    const of = w('c1c', 'off');
    const ys = w('c1c', 'yes');
    q(A('c1a') + 4, 'pop', 0.5);
    q(cm, 'click', 0.7);
    q(co, 'pop2', 0.6);
    q(sp, 'pop', 0.5);
    q(tr, 'whoosh_s', 0.5);
    q(of, 'coin', 0.6);
    q(ys, 'ding', 0.6);
    const cy = w('c1d', 'cycle');
    const ch = w('c1d', 'cheap');
    const bk = w('c1d', 'back');
    const rc = w('c1e', 'recycled');
    const ws = w('c1e', 'wasted');
    const hp = w('c1f', 'happy');
    const dn = w('c1f', 'done');
    const bg = w('c1f', 'beginning');
    q(cy, 'ding', 0.5);
    q(ch, 'coin', 0.5);
    q(bk, 'whoosh_s', 0.4);
    q(rc, 'pop', 0.5);
    q(ws, 'ding', 0.4);
    q(hp, 'pop', 0.5);
    q(bg, 'stamp', 0.7);
    scene(A('c1a'), () =>
      f < A('c1d') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={In(A('c1a'))}><Text size={56}>THE APPLE STORE</Text></G2>
            <rect x={640} y={720} width={640} height={40} rx={10} fill={C.wood} stroke={C.ink} strokeWidth={6} />
            <G2 x={960} y={470} s={0.95 * In(A('c1a'), 2) * bump(co, 0.1)}>
              <Handset body={f >= co ? '#E07A9A' : '#3A5A8C'} cam={lit(cm) * (1 - lit(cm + 24))}>
                <Text y={-40} size={40} color={C.navy}>NEW</Text>
                <Text y={20} size={28} color="#5B6470">better camera</Text>
              </Handset>
            </G2>
            <Dave f={f} x={330} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: ys, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={f < tr ? 470 : lin(f, tr, tr + 20, 470, 1400)} y={f < tr ? 620 : lin(f, tr, tr + 20, 620, 560)} s={0.32 * In(A('c1a'), 3)} r={-10}>
              <Handset body="#555" cracked><Text size={30} color="#9AA5B1">old</Text></Handset>
            </G2>
            <Clerk f={f} x={1550} y={880} s={1.1 * bump(sp, 0.06)} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}, {at: sp, pose: 'present', expr: 'grin', look: -0.8}]} />
            <G2 x={1560} y={300} s={In(A('c1a'), 4)}>
              <Box w={480} h={200} />
              <Text y={-50} size={40}>price: $999+</Text>
              <Text y={20} size={36} color={f >= of ? C.green : '#9AA5B1'}>{f >= of ? 'trade-in credit: −$$$' : 'trade-in credit: ?'}</Text>
              {f >= ys && <Text y={72} size={36} color={C.green}>✓ DEAL</Text>}
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={330} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: hp, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <G2 x={1100} y={520} s={In(A('c1d'))}>
              <circle r={280} fill="none" stroke={C.ink} strokeWidth={8} strokeDasharray="30 22" opacity={0.5 + 0.5 * lit(cy)} />
              {(() => {
                const a = (f - A('c1d')) * (f >= cy ? 0.06 : 0.02);
                return <circle cx={Math.cos(a) * 280} cy={Math.sin(a) * 280} r={22} fill={C.blue} stroke={C.ink} strokeWidth={5} />;
              })()}
              {['BUY NEW', 'USE IT', 'TRADE IN', 'UPGRADE'].map((l, i) => {
                const a = -Math.PI / 2 + (i * Math.PI) / 2;
                return (
                  <g key={l} transform={`translate(${Math.cos(a) * 280},${Math.sin(a) * 280})`} opacity={0.7 + 0.3 * lit(cy)}>
                    <Pill text={l} w={250} lit={lit(cy)} color={C.blue} size={34} />
                  </g>
                );
              })}
              <Handset s={0.38} body="#E07A9A"><Text size={40} color={C.navy}>NEW</Text></Handset>
            </G2>
            <G2 x={1640} y={170} s={In(A('c1d'), 3) * bump(ch)} o={0.6 + 0.4 * lit(ch)}><Pill text="feels cheap" w={380} lit={lit(ch)} /></G2>
            <G2 x={1640} y={820} s={In(A('c1d'), 4) * bump(rc)} o={0.6 + 0.4 * lit(rc)}><Pill text="old: resold / recycled" w={480} lit={lit(rc)} size={34} /></G2>
            <G2 x={480} y={180} s={In(A('c1d'), 2)}><Text size={48}>{f >= dn ? 'deal done?' : 'every few years...'}</Text></G2>
            {f >= bg && <Stamp x={1100} y={520} s={pop(f, bg, 9, 260)} text="JUST THE BEGINNING" size={54} color={C.red} r={-6} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Money pie ============
  {
    const tk = w('c2a', 'ten');
    const pb = w('c2a', 'publish');
    const fy = w('c2b', 'fiscal');
    const fr = w('c2b', 'four');
    q(A('c2a') + 4, 'paper', 0.6);
    q(tk, 'stamp', 0.5);
    q(pb, 'ding', 0.5);
    q(fy, 'marker', 0.5);
    q(fr, 'cash', 0.7);
    const hs = [w('c2c', 'iphone'), w('c2d', 'mac'), w('c2d', 'ipads'), w('c2d', 'watches'), w('c2e', 'services')];
    const hf = w('c2c', 'half');
    const hf2 = w('c2f', 'half');
    const ot = w('c2f', 'other');
    const it = w('c2f', 'interesting');
    hs.forEach((x) => q(x, 'pop', 0.55));
    q(hf, 'ding', 0.5);
    q(hf2, 'ding', 0.5);
    q(ot, 'whoosh_s', 0.5);
    q(it, 'sting', 0.5);
    const rows: [string, string, string, number][] = [
      ['iPhone', '$209.6B', C.blue, 0.504],
      ['Mac', '$33.7B', '#7B8794', 0.081],
      ['iPad', '$28.0B', C.green, 0.067],
      ['Watch, AirPods & more', '$35.7B', '#B983FF', 0.086],
      ['Services', '$109.2B', C.gold, 0.262],
    ];
    const cur = f >= ot ? 5 : hs.filter((x) => f >= x).length - 1;
    scene(A('c2a'), () =>
      f < A('c2c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}, {at: fr, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={880} y={520} s={0.95 * In(A('c2a')) * bump(tk, 0.06)}><Report10K hl={ease(f, fy, fy + 20)} /></G2>
            <G2 x={1560} y={360} s={In(A('c2a'), 3) * bump(fr, 0.1)}>
              <NumCard top="FISCAL 2025 SALES" val={f >= fr ? '$416.2B' : '$ ???'} w={560} color={f >= fr ? C.green : C.ink} />
            </G2>
            <G2 x={1560} y={640} s={In(A('c2a'), 5)} o={0.6 + 0.4 * lit(pb)}><Pill text="every big US company" w={560} lit={lit(pb)} size={36} /></G2>
            <G2 x={1560} y={740} s={In(A('c2a'), 6)} o={0.6 + 0.4 * lit(pb)}><Text size={36} color="#5B6470">must publish one</Text></G2>
            <SourceTag f={f} at={fr} text="Apple Form 10-K, FY ended Sept 27, 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={110} s={In(A('c2c'))}><Text size={52}>Apple's $416B pie</Text></G2>
            {rows.map(([n, v, c], i) => {
              const on = f >= hs[i];
              const L = i === cur || cur === 5 ? 1 : on ? 0.6 : 0;
              return (
                <G2 key={n} x={500} y={230 + i * 118} s={In(A('c2c'), i) * bump(hs[i], 0.08)} o={0.4 + 0.6 * Math.max(L, lit(hs[i]) * 0.6)}>
                  <rect x={-400} y={-46} width={800} height={92} rx={22} fill="#fff" stroke={i === cur ? c : C.ink} strokeWidth={i === cur ? 10 : 5} />
                  <rect x={-380} y={-24} width={48} height={48} rx={10} fill={c} stroke={C.ink} strokeWidth={4} />
                  <Text x={-310} y={2} size={38} anchor="start">{n}</Text>
                  <Text x={370} y={2} size={42} anchor="end" color={on ? C.ink : '#9AA5B1'}>{on ? v : '?'}</Text>
                </G2>
              );
            })}
            <G2 x={1400} y={500} s={In(A('c2c'), 2)}>
              <SlicePie rad={300} pop={cur === 5 ? 4 : cur} slices={rows.map(([, , c, v], i) => ({v, c: f >= hs[i] ? c : '#E0D6C3', l: f >= hs[i] ? `${Math.round(v * 100)}%` : undefined}))} />
            </G2>
            <G2 x={1400} y={120} s={In(A('c2c'), 3) * bump(hf)} o={0.6 + 0.4 * lit(hf)}><Text size={44} color={C.blue}>iPhone ≈ half the pie</Text></G2>
            <G2 x={500} y={830} s={In(A('c2c'), 4)}><Text size={40} color={f >= ot ? C.green : '#5B6470'}>{f >= ot ? 'the other half: where it gets interesting' : f >= A('c2f') ? 'myth: "just a phone company"' : 'services: App Store, iCloud, Music, TV...'}</Text></G2>
            {f >= hf2 && f < ot && <Stamp x={1400} y={500} s={pop(f, hf2, 9, 260)} text="HALF TRUE" size={56} color={C.red} r={-6} />}
            <SourceTag f={f} at={hs[0]} text="Apple 10-K FY2025: net sales by category" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Popcorn ============
  {
    const ex = w('c3a', 'expensive');
    const cs = ['metal', 'glass', 'chips', 'factories', 'shipping'].map((x) => w('c3b', x));
    const tt = w('c3b', 'thirty');
    q(ex, 'thud', 0.5);
    cs.forEach((x) => q(x, 'pop', 0.45));
    q(tt, 'coin', 0.7);
    const sv = w('c3c', 'services');
    const nt = w('c3c', 'nothing');
    const ph = w('c3c', 'photos');
    const sf = w('c3d', 'seventy');
    const db = w('c3d', 'double');
    q(sv, 'ding', 0.5);
    q(nt, 'pop', 0.5);
    q(ph, 'pop', 0.5);
    q(sf, 'cash', 0.7);
    q(db, 'stamp', 0.6);
    const tm = w('c3e', 'theater');
    const tkt = w('c3e', 'ticket');
    const pc = w('c3e', 'popcorn');
    const ip = w('c3e', 'iphone');
    const pc3 = w('c3e', 'popcorn', 1);
    q(tm, 'pop', 0.5);
    q(tkt, 'paper', 0.5);
    q(pc, 'pop2', 0.6);
    q(ip, 'ding', 0.5);
    q(pc3, 'ding', 0.6);
    const qr = w('c3f', 'quarter');
    const ft = w('c3f', 'forty');
    q(qr, 'pop', 0.5);
    q(ft, 'cash', 0.7);
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={In(A('c3a')) * bump(ex, 0.1)}><Text size={56} color={f >= ex ? C.red : C.ink}>phones are EXPENSIVE to make</Text></G2>
            {['metal', 'glass', 'chips', 'factories', 'shipping'].map((l, i) => (
              <G2 key={l} x={420} y={250 + i * 120} s={In(A('c3a'), i) * bump(cs[i], 0.1)} o={0.55 + 0.45 * lit(cs[i])}>
                <Pill text={l} w={420} lit={lit(cs[i])} color={C.red} />
              </G2>
            ))}
            <G2 x={1100} y={500} s={In(A('c3a'), 3)}>
              <Text y={-330} size={38}>$1 of product sales</Text>
              <rect x={-120} y={-290} width={240} height={600} rx={20} fill="#E0D6C3" stroke={C.ink} strokeWidth={6} />
              {(() => {
                const k = ease(f, tt, tt + 16);
                return (
                  <g>
                    <rect x={-114} y={-284} width={228} height={588 * 0.63 * k} rx={16} fill={C.red} opacity={k} />
                    <rect x={-114} y={-284 + 588 * 0.63} width={228} height={588 * 0.37} rx={16} fill={C.green} opacity={k} />
                    <Text y={-100} size={34} color="#fff" stroke={C.ink} sw={4}>{k > 0.5 ? 'cost 63¢' : ''}</Text>
                    <Text y={200} size={60} color={k > 0.5 ? '#fff' : C.ink} stroke={k > 0.5 ? C.ink : undefined} sw={k > 0.5 ? 6 : 0}>{f >= tt ? '37¢' : '?'}</Text>
                  </g>
                );
              })()}
            </G2>
            <Dave f={f} x={1620} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: tt, pose: 'point_l', expr: 'happy', look: -0.8}]} />
            <G2 x={1620} y={330} s={In(A('c3a'), 4)} o={0.6 + 0.4 * lit(tt)}><Text size={40} color={C.green}>kept: ~37¢</Text></G2>
            <SourceTag f={f} at={tt} text="10-K FY2025: products margin $112.9B ÷ $307.0B = 36.8%" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={260} y={880} s={1.1} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: sf, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={640} y={320} s={In(A('c3c')) * bump(ph, 0.08)}><CloudBox label="iCloud" /></G2>
            <G2 x={640} y={560} s={In(A('c3c'), 2) * bump(nt, 0.1)}>
              <AppTile x={-80} color={C.blue} label="A" />
              <AppTile x={80} color={C.green} label="+1" />
            </G2>
            <G2 x={640} y={720} s={In(A('c3c'), 3)} o={0.6 + 0.4 * lit(nt)}><Text size={40} color={C.green}>one more app ≈ $0 to make</Text></G2>
            <G2 x={1350} y={0} s={In(A('c3c'), 2)}>
              <line x1={-380} y1={860} x2={380} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
              <Bar x={-190} y={860} h={37 * 8} color={C.blue} label="products" value="37¢" w={240} />
              <Bar x={190} y={860} h={ease(f, sf - 4, sf + 14, 30, 75 * 8)} color={C.gold} label="services" value={f >= sf ? '75¢' : '?'} w={240} />
              <Text y={150} size={40}>kept from every $1 of sales</Text>
            </G2>
            <G2 x={1350} y={240} s={In(A('c3c'), 4) * bump(db)} o={0.55 + 0.45 * lit(db)}><Box w={300} h={90} fill={C.yellow} /><Text size={46}>2× !</Text></G2>
            <SourceTag f={f} at={sf} text="10-K FY2025: services margin $82.3B ÷ $109.2B = 75.4%" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <G2 x={960} y={110} s={In(A('c3e')) * bump(tm, 0.08)}><Text size={56}>the movie theater trick</Text></G2>
            <G2 x={560} y={430} s={1.5 * In(A('c3e'), 2) * bump(tkt, 0.1)}><Ticket text="ADMIT ONE" /></G2>
            <G2 x={560} y={640} s={In(A('c3e'), 3)} o={0.6 + 0.4 * lit(ip)}><Text size={48} color={C.blue}>{f >= ip ? 'ticket = the iPhone' : 'ticket: barely pays'}</Text></G2>
            <G2 x={1360} y={440} s={1.3 * In(A('c3e'), 3) * bump(pc) * bump(pc3)}><Popcorn /></G2>
            <G2 x={1360} y={690} s={In(A('c3e'), 4)} o={0.6 + 0.4 * lit(pc)}><Text size={48} color={C.gold} >{f >= pc3 ? 'popcorn = services' : 'popcorn: the real money'}</Text></G2>
            <Dave f={f} x={960} y={900} s={0.85} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: pc3, pose: 'thumbs', expr: 'grin'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {[['SHARE OF SALES', 0.262, qr, '26%'], ['SHARE OF GROSS PROFIT', 0.422, ft, '42%']].map(([l, v, at, tx], i) => {
              const k = ease(f, (at as number) - 3, (at as number) + 16, 0.04, v as number);
              return (
                <G2 key={l as string} x={180} y={330 + i * 300} s={In(A('c3f'), i * 2)}>
                  <Text x={0} y={-90} size={40} anchor="start">{l as string}</Text>
                  <rect x={0} y={-50} width={1300} height={100} rx={20} fill="#C9D6E6" stroke={C.ink} strokeWidth={6} />
                  <rect x={1300 * (1 - k)} y={-50} width={1300 * k} height={100} rx={20} fill={C.gold} stroke={C.ink} strokeWidth={6} />
                  <Text x={200} y={2} size={40} color={C.navy}>products</Text>
                  <Text x={1300 - 110} y={2} size={50}>{f >= (at as number) ? (tx as string) : '?'}</Text>
                </G2>
              );
            })}
            <G2 x={830} y={120} s={In(A('c3f'))}><Text size={50}>services: small slice, BIG profit</Text></G2>
            <Dave f={f} x={1740} y={900} s={0.9} keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.8}, {at: ft, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={ft} text="$82.3B services margin ÷ $195.2B total margin ≈ 42%" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 30% toll ============
  {
    const st = w('c4a', 'store');
    const on = w('c4b', 'only');
    const ct = w('c4b', 'cut');
    const th = w('c4c', 'thirty');
    const fi = w('c4c', 'fifteen');
    const sb = w('c4c', 'subscriptions');
    q(st, 'pop', 0.6);
    q(on, 'stamp', 0.6);
    q(ct, 'rip', 0.6);
    q(th, 'cash', 0.7);
    q(fi, 'coin', 0.5);
    q(sb, 'coin', 0.5);
    const rc = w('c4d', 'raccoon');
    const fc = w('c4d', 'fancy');
    const gt = w('c4d', 'gate');
    q(rc, 'pop', 0.6);
    q(fc, 'boing', 0.5);
    q(gt, 'clank', 0.6);
    const fn = w('c4e', 'fortnite');
    const cr = w('c4e', 'court');
    const eu = w('c4e', 'europe');
    const scu = w('c4f', 'security');
    const rv = w('c4f', 'reviewing');
    const bl = w('c4f', 'billion');
    const dv = w('c4f', 'developers');
    const mu = w('c4f', 'much');
    const cr2 = w('c4f', 'court');
    q(fn, 'pop', 0.5);
    q(cr, 'thud', 0.6);
    q(eu, 'pop', 0.5);
    [scu, rv, bl].forEach((x) => q(x, 'ding', 0.45));
    q(dv, 'pop', 0.5);
    q(mu, 'buzz', 0.4);
    q(cr2, 'thud', 0.6);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={700} y={822} s={In(A('c4a')) * bump(st, 0.06) * bump(ct, 0.06)}><Store f={f} /></G2>
            <Dave f={f} x={230} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: ct, pose: 'shrug', expr: 'worried', look: 0.8}]} />
            {f >= on && <Stamp x={700} y={420} s={pop(f, on, 9, 260)} text="ONLY GATE" size={52} color={C.red} r={-8} />}
            {[['standard cut', '30%', th], ['small devs (<$1M/yr)', '15%', fi], ['subscriptions, yr 2+', '15%', sb]].map(([l, v, at], i) => (
              <G2 key={l as string} x={1480} y={300 + i * 150} s={In(A('c4a'), 2 + i) * bump(at as number, 0.1)}>
                <Pill text={l as string} val={f >= (at as number) ? (v as string) : '?'} w={700} lit={0.3 + 0.7 * lit(at as number)} color={i ? C.green : C.red} size={36} />
              </G2>
            ))}
            <G2 x={1480} y={160} s={In(A('c4a'), 2)}><Text size={48}>Apple's cut of each sale</Text></G2>
            <SourceTag f={f} at={th} text="App Store Small Business Program & Review Guidelines" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={1150} y={822} s={1.1 * In(A('c4d')) * bump(gt, 0.06)}><TollBooth label="APP STORE 30%" barUp={0} /></G2>
            <G2 x={1150} y={600} s={0.7 * In(A('c4d'), 2) * bump(rc, 0.15)}>
              <Raccoon f={f} mood="greedy" holdCoin />
              <TopHat y={-150 - 30 * (ease(f, fc, fc + 6) - ease(f, fc + 6, fc + 14))} s={0.9} />
            </G2>
            <Dave f={f} x={420} y={822} s={1} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.8}]} handItem={<MoneyStack n={3} s={0.3} />} />
            <G2 x={960} y={130} s={In(A('c4d'), 2)}><Text size={56}>the raccoon's fancy cousin</Text></G2>
            <G2 x={1150} y={280} s={In(A('c4d'), 3) * bump(gt)} o={0.6 + 0.4 * lit(gt)}><Text size={42} color={C.red}>the only gate in town</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={200} s={In(A('c4e')) * bump(cr, 0.08)} o={0.6 + 0.4 * lit(fn)}>
              <Box w={760} h={170} />
              <Text y={-36} size={36}>US court, 2025 (Epic v. Apple)</Text>
              <Text y={28} size={32} color={C.green}>apps may link to cheaper web payments</Text>
            </G2>
            <G2 x={1400} y={200} s={In(A('c4e'), 2) * bump(eu, 0.08)} o={0.6 + 0.4 * lit(eu)}>
              <Box w={760} h={170} />
              <Text y={-36} size={36}>Europe: new laws</Text>
              <Text y={28} size={32} color={C.green}>Digital Markets Act → more changes</Text>
            </G2>
            <Scale x={960} y={920} s={In(A('c4e'), 3)} tilt={f < A('c4f') ? 0 : ease(f, scu, mu + 10, -8, 8) * (f >= dv ? 1 : -1) * (f >= dv ? 1 : 1)} left="APPLE" right="DEVELOPERS" />
            {[['security', scu], ['app review', rv], ['1B+ customers', bl]].map(([l, at], i) => (
              <G2 key={l as string} x={300} y={440 + i * 110} s={In(A('c4e'), 4 + i) * bump(at as number, 0.1)}><Pill text={l as string} w={400} lit={lit(at as number)} color={C.blue} size={36} /></G2>
            ))}
            {[['"too much!"', mu], ['more courts', cr2]].map(([l, at], i) => (
              <G2 key={l as string} x={1620} y={440 + i * 110} s={In(A('c4e'), 4 + i) * bump(at as number, 0.1)}><Pill text={l as string} w={400} lit={lit(at as number)} color={C.red} size={36} /></G2>
            ))}
            <G2 x={1620} y={660} s={In(A('c4e'), 6)}><Gavel s={0.6} hit={ease(f, cr2, cr2 + 4) - ease(f, cr2 + 6, cr2 + 14)} /></G2>
            <SourceTag f={f} at={cr} text="Epic v. Apple, N.D. Cal., order of Apr 30, 2025" until={cr + 90} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 Google ============
  {
    const sg = w('c5a', 'strangest');
    const nt = w('c5a', 'nothing');
    const sf = w('c5b', 'safari');
    const gg = w('c5b', 'google');
    const ac = w('c5b', 'accident');
    const pys = w('c5b', 'pays');
    q(sg, 'sting', 0.5);
    q(nt, 'cricket', 0.5);
    q(sf, 'key', 0.6);
    q(gg, 'ding', 0.6);
    q(ac, 'pop', 0.4);
    q(pys, 'cash', 0.6);
    const an = w('c5c', 'antitrust');
    const rv = w('c5c', 'revealed');
    const tw = w('c5c', 'twenty');
    const al = w('c5c', 'alone');
    q(an, 'thud', 0.6);
    q(rv, 'paper', 0.6);
    q(tw, 'cash', 0.8);
    q(al, 'sting', 0.6);
    const dr = w('c5d', 'door');
    const op = w('c5d', 'open');
    const mt = w('c5d', 'mat');
    q(dr, 'key', 0.5);
    q(op, 'whoosh', 0.5);
    q(mt, 'pop', 0.6);
    const rl = w('c5e', 'ruled');
    const mn = w('c5e', 'monopoly');
    const bn = w('c5e', 'banned');
    const dc = w('c5f', 'decided');
    const df = w('c5f', 'default');
    const exl = w('c5f', 'exclusive');
    const cmg = w('c5f', 'coming');
    q(rl, 'thud', 0.7);
    q(mn, 'stamp', 0.6);
    q(bn, 'buzz', 0.4);
    q(dc, 'thud', 0.7);
    q(df, 'ding', 0.6);
    q(exl, 'buzz', 0.5);
    q(cmg, 'cash', 0.6);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={880} s={1.15} keys={[{at: 0, pose: 'shrug', expr: 'suspicious', look: 0.8}, {at: sf, pose: 'typing', expr: 'think', look: 0.8}, {at: pys, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <G2 x={860} y={520} s={1.1 * In(A('c5a')) * bump(gg, 0.06)}>
              <Handset body="#3A5A8C">
                <rect x={-112} y={-226} width={224} height={60} fill="#E3E8EE" />
                <Text y={-196} size={26} color="#5B6470">Safari</Text>
                <rect x={-96} y={-140} width={192} height={52} rx={26} fill="#fff" stroke={C.ink} strokeWidth={4} />
                <Text y={-112} size={26} color={f >= sf ? C.ink : '#9AA5B1'}>{f >= sf ? 'why is sky blue?' : 'search...'}</Text>
                <Text y={-40} size={24} color="#5B6470">answers from:</Text>
                <Text y={10} size={46} color={f >= gg ? C.blue : '#9AA5B1'}>{f >= gg ? 'Google' : '?'}</Text>
                {[70, 110, 150].map((y) => <rect key={y} x={-80} y={y} width={160} height={16} rx={8} fill="#E3E8EE" />)}
              </Handset>
            </G2>
            <G2 x={1520} y={150} s={In(A('c5a'), 2) * bump(nt, 0.1)}><Text size={48}>money for (almost) nothing</Text></G2>
            <G2 x={1520} y={470} s={0.5 * In(A('c5a'), 4) * bump(pys, 0.12)} o={0.6 + 0.4 * lit(pys)}><Cheque amount={f >= pys ? '$$$$$$' : '$ ?'} memo="default search spot" /></G2>
            <G2 x={1520} y={680} s={In(A('c5a'), 5)} o={0.6 + 0.4 * lit(ac)}><Text size={40} color={C.red}>not an accident</Text></G2>
            <G2 x={1190} y={470} s={In(A('c5a'), 5)} o={0.6 + 0.4 * lit(pys)}><path d="M 60 0 L -60 0 M -30 -26 L -60 0 L -30 26" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={280} y={880} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: tw, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= al} />
            <G2 x={1150} y={120} s={In(A('c5c')) * bump(an, 0.08)}><Text size={48}>antitrust trial: U.S. v. Google</Text></G2>
            <G2 x={1150} y={440} s={In(A('c5c'), 2) * bump(tw, 0.08)}>
              <Cheque amount={f >= tw ? '$20,000,000,000' : '$ ?'} memo={f >= al ? '2022 ALONE' : '2022'} />
            </G2>
            <G2 x={1150} y={780} s={In(A('c5c'), 3)}><Gavel hit={ease(f, rv, rv + 4) - ease(f, rv + 6, rv + 14)} s={0.9} /></G2>
            <SourceTag f={f} at={tw} text="U.S. v. Google, D.D.C. opinion, Aug 5, 2024" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={822} s={In(A('c5d')) * bump(mt, 0.05)}><Door open={ease(f, op, op + 14)} mat="WELCOME, GOOGLE" /></G2>
            <Dave f={f} x={620} y={822} s={1} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
            <G2 x={1500} y={700} s={In(A('c5d'), 3)}><MoneyStack n={7} s={1.1} label="$20B" /></G2>
            <G2 x={960} y={140} s={In(A('c5d'), 2) * bump(dr, 0.08)}><Text size={52}>$20B to leave a door open</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={380} s={In(A('c5e')) * bump(rl, 0.08)} o={0.6 + 0.4 * lit(rl)}>
              <Box w={780} h={300} />
              <Text y={-100} size={36} color="#5B6470">AUG 2024</Text>
              <Text y={-30} size={40}>judge: Google illegally</Text>
              <Text y={24} size={40}>kept a search monopoly</Text>
              {f >= mn && <Stamp y={100} s={pop(f, mn, 9, 260) * 0.8} text="MONOPOLY" size={50} color={C.red} r={-4} />}
            </G2>
            <G2 x={520} y={700} s={In(A('c5e'), 2)} o={0.6 + 0.4 * lit(bn)}><Bubble text={f >= dc ? 'payments banned? no!' : 'payments banned?'} size={40} tail="down" /></G2>
            <G2 x={1400} y={380} s={In(A('c5e'), 3) * bump(dc, 0.08)} o={0.6 + 0.4 * lit(dc)}>
              <Box w={780} h={300} />
              <Text y={-100} size={36} color="#5B6470">SEPT 2025 · THE FIX</Text>
              <G2 y={-20} o={0.6 + 0.4 * lit(df)}><Text size={38} color={C.green}>✓ can keep paying for default</Text></G2>
              <G2 y={60} o={0.6 + 0.4 * lit(exl)}><Text size={38} color={C.red}>✗ no exclusive deals</Text></G2>
            </G2>
            <G2 x={960} y={180} s={In(A('c5e'), 1)}><Gavel s={0.6} hit={Math.max(ease(f, rl, rl + 4) - ease(f, rl + 6, rl + 14), ease(f, dc, dc + 4) - ease(f, dc + 6, dc + 14))} /></G2>
            {[0, 1, 2].map((i) => (
              <G2 key={i} x={f >= cmg ? lin(f, cmg + i * 8, cmg + 30 + i * 8, 1150, 1650) : 1150 + i * 250} y={720} s={0.26 * In(A('c5e'), 4 + i)} r={-6 + i * 6}>
                <Cheque amount="$$$" memo="2026" />
              </G2>
            ))}
            <G2 x={1400} y={620} s={In(A('c5e'), 4)} o={0.6 + 0.4 * lit(cmg)}><Text size={36} color={C.green}>the checks keep coming</Text></G2>
            <SourceTag f={f} at={dc} text="U.S. v. Google remedies decision, Sept 2, 2025" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Subscriptions ============
  {
    const ms = w('c6a', 'message');
    const fl = w('c6a', 'full');
    const up = w('c6b', 'upgrade');
    const nn = w('c6b', 'ninety');
    const tn = w('c6b', 'tiny');
    q(ms, 'ding', 0.6);
    q(fl, 'buzz', 0.5);
    q(up, 'click', 0.7);
    q(nn, 'coin', 0.6);
    q(tn, 'pop', 0.5);
    const lt = [w('c6c', 'music'), w('c6c', 'tv'), w('c6c', 'arcade')];
    const vl = [w('c6d', 'eleven'), w('c6d', 'fourteen'), w('c6d', 'six')];
    const tf = w('c6d', 'thirty');
    const fy = w('c6e', 'four');
    const hf = w('c6e', 'half');
    const sg = w('c6e', 'single');
    lt.forEach((x) => q(x, 'pop', 0.5));
    vl.forEach((x) => q(x, 'coin', 0.5));
    q(tf, 'cash', 0.7);
    q(fy, 'cash', 0.7);
    q(hf, 'ding', 0.5);
    q(sg, 'thud', 0.5);
    const bd = w('c6f', 'bundle');
    const cb = w('c6f', 'combo');
    const dp = w('c6g', 'drips');
    const bk = w('c6g', 'bucket');
    const bk2 = w('c6g', 'bucket', 1);
    q(bd, 'pop', 0.6);
    q(cb, 'pop2', 0.6);
    q(dp, 'pop', 0.4);
    q(bk, 'coin', 0.6);
    q(bk2, 'ding', 0.6);
    const rows: [string, string][] = [['iCloud+ (50GB)', '$0.99'], ['Apple Music', '$11.99'], ['Apple TV', '$14.99'], ['Apple Arcade', '$6.99']];
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={320} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: fl, pose: 'shock', expr: 'worried', look: 0.8}, {at: up, pose: 'typing', expr: 'happy', look: 0.8}]} />
            <G2 x={920} y={520} s={1.1 * In(A('c6a')) * bump(ms, 0.06)}>
              <Handset body="#E07A9A">
                {Array.from({length: 12}).map((_, i) => <rect key={i} x={-96 + (i % 3) * 66} y={-200 + Math.floor(i / 3) * 66} width={58} height={58} rx={8} fill={[C.sky, '#F4D6B8', C.greenLight, C.yellow][i % 4]} stroke={C.ink} strokeWidth={2} />)}
                <G2 y={130} o={0.6 + 0.4 * lit(ms)}>
                  <rect x={-104} y={-60} width={208} height={120} rx={16} fill="#fff" stroke={f >= fl ? C.red : C.ink} strokeWidth={5} />
                  <Text y={-22} size={24} color={C.red}>STORAGE</Text>
                  <Text y={14} size={24} color={C.red}>ALMOST FULL</Text>
                  <rect x={-80} y={34} width={160 * (f >= up ? 0.4 : 0.97)} height={12} rx={6} fill={f >= up ? C.green : C.red} />
                </G2>
              </Handset>
            </G2>
            <G2 x={1540} y={360} s={In(A('c6a'), 3) * bump(nn, 0.1)}>
              <NumCard top="iCLOUD+ · 50GB" val={f >= nn ? '$0.99/mo' : '$ ?'} w={520} size={80} color={f >= nn ? C.green : C.ink} />
            </G2>
            <G2 x={1540} y={620} s={In(A('c6a'), 4) * bump(tn)} o={0.6 + 0.4 * lit(tn)}><Bubble text="tiny!" size={56} tail="left" /></G2>
            <SourceTag f={f} at={nn} text="apple.com US prices, Sept 2026" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={760} y={120} s={In(A('c6c'))}><Text size={52}>Dave's little subscriptions</Text></G2>
            {rows.map(([n, v], i) => {
              const L = i === 0 ? 1 : lit(lt[i - 1]);
              const shownV = i === 0 || f >= vl[i - 1];
              return (
                <G2 key={n} x={760} y={260 + i * 130} s={In(A('c6c'), i) * (i ? bump(lt[i - 1], 0.08) : 1)}>
                  <Pill text={n} val={shownV ? v : '?'} w={780} lit={0.3 + 0.7 * L} color={C.navy} />
                </G2>
              );
            })}
            <G2 x={760} y={780} s={In(A('c6c'), 4)}><Text size={36} color="#5B6470">free trial → one show → for his nephew...</Text></G2>
            <G2 x={1580} y={300} s={In(A('c6c'), 3) * bump(tf, 0.1)}>
              <NumCard top="PER MONTH" val={f >= tf ? '≈ $35' : '$ ?'} w={440} color={f >= tf ? C.red : C.ink} />
            </G2>
            <G2 x={1580} y={560} s={In(A('c6c'), 4) * bump(fy, 0.1)} o={0.6 + 0.4 * lit(fy)}>
              <NumCard top="PER YEAR" val={f >= fy ? '≈ $420' : '$ ?'} w={440} color={C.red} />
            </G2>
            <G2 x={1580} y={780} s={In(A('c6c'), 5) * bump(hf)} o={0.6 + 0.4 * lit(hf)}><Text size={38}>≈ half a new iPhone, yearly</Text></G2>
            <Dave f={f} x={180} y={900} s={0.8} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.8}, {at: tf, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <SourceTag f={f} at={tf} text="$0.99 + $11.99 + $14.99 + $6.99 = $34.96/mo × 12 ≈ $420" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={420} s={In(A('c6f')) * bump(bd, 0.08)}><Bundle title="APPLE ONE" price="from $21.95/mo" /></G2>
            <G2 x={500} y={730} s={0.55 * In(A('c6f'), 2) * bump(cb)}><Popcorn /></G2>
            <G2 x={500} y={130} s={In(A('c6f'), 1)} o={0.6 + 0.4 * lit(cb)}><Text size={44}>the popcorn combo</Text></G2>
            <G2 x={1400} y={620} s={1.2 * In(A('c6f'), 3) * bump(bk2, 0.08)}><Bucket f={f} level={ease(f, dp, bk + 20, 0.15, 0.85)} drip label="Apple's bucket" /></G2>
            <G2 x={1400} y={130} s={In(A('c6f'), 4)} o={0.6 + 0.4 * lit(dp)}><Text size={48}>small drips → big bucket</Text></G2>
            <Dave f={f} x={950} y={900} s={0.85} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: dp, pose: 'facepalm', expr: 'sad', look: 0.8}]} />
            <SourceTag f={f} at={bd} text="apple.com/apple-one: Individual $21.95/mo (US)" until={A('c6g')} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Walled garden ============
  {
    const sw = w('c7a', 'switch');
    const gd = w('c7a', 'garden');
    q(sw, 'pop', 0.5);
    q(gd, 'thud', 0.6);
    const bl = w('c7b', 'blue');
    const an = w('c7b', 'android');
    const gr = w('c7b', 'green');
    const nt = w('c7b', 'notices');
    q(bl, 'pop', 0.5);
    q(an, 'pop', 0.5);
    q(gr, 'buzz', 0.6);
    q(nt, 'crowd', 0.4);
    const ap = w('c7c', 'airpods');
    const lp = w('c7c', 'laptop');
    const wt = w('c7c', 'watch');
    const ic = w('c7c', 'icloud');
    q(ap, 'pop', 0.5);
    q(lp, 'pop', 0.5);
    q(wt, 'pop', 0.5);
    q(ic, 'pop', 0.5);
    const lv = w('c7d', 'leaving');
    const br = w('c7d', 'brick');
    const wl = w('c7d', 'wall');
    q(lv, 'whoosh_s', 0.4);
    q(br, 'clank', 0.6);
    q(wl, 'thud', 0.7);
    const tw = w('c7e', 'two');
    const wd = w('c7e', 'world');
    q(tw, 'cash', 0.7);
    q(wd, 'ding', 0.5);
    const fr = w('c7f', 'fair');
    const pro = [w('c7f', 'together'), w('c7f', 'privacy'), w('c7f', 'updates'), w('c7f', 'resale')];
    const cri = w('c7g', 'critics');
    const con = [w('c7g', 'high'), w('c7g', 'sued'), w('c7g', 'disagrees'), w('c7g', 'going')];
    q(fr, 'pop', 0.5);
    pro.forEach((x) => q(x, 'ding', 0.45));
    q(cri, 'whoosh', 0.5);
    con.forEach((x) => q(x, 'ding', 0.45));
    const ng = w('c7h', 'garden');
    const cg = w('c7h', 'cage');
    const yu = w('c7h', 'you');
    q(ng, 'chime', 0.5);
    q(cg, 'clank', 0.6);
    q(yu, 'pop', 0.5);
    scene(A('c7a'), () =>
      f < A('c7b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={900} y={930} s={1.05 * In(A('c7a'))}><Garden f={f} wall={1.5} gate={1 - ease(f, gd, gd + 14)} /></G2>
            <Dave f={f} x={900} y={760} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: gd, pose: 'shrug', expr: 'worried'}]} />
            <G2 x={1680} y={430} s={0.5 * In(A('c7a'), 3) * bump(sw, 0.1)}><Handset body="#2F8F5B"><Text size={40} color="#5B6470">other</Text></Handset>{f >= gd && <XMark s={0.4 * pop(f, gd)} />}</G2>
            <G2 x={1680} y={140} s={In(A('c7a'), 3)} o={0.6 + 0.4 * lit(sw)}><Text size={44}>just switch?</Text></G2>
            <G2 x={700} y={130} s={In(A('c7a'), 2) * bump(gd, 0.08)}><Text size={52}>Dave is INSIDE the garden</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={520} s={1.25 * In(A('c7b'))}>
              <Handset>
                <rect x={-112} y={-226} width={224} height={56} fill="#E3E8EE" />
                <Text y={-198} size={22} color="#5B6470">GROUP CHAT</Text>
                <ChatBubble x={-96} y={-120} w={150} text="pizza?" color={BLUE_B} />
                <ChatBubble x={96} y={-40} w={130} right text="yes!" color={BLUE_B} />
                <ChatBubble x={-96} y={40} w={170} text="8pm" color={f >= gr ? GREEN_B : f >= an ? '#C9CED6' : BLUE_B} />
                <ChatBubble x={96} y={120} w={140} right text={f >= nt ? '...green?' : 'cool'} color={BLUE_B} />
              </Handset>
            </G2>
            <Dave f={f} x={260} y={880} s={1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: nt, pose: 'shock', expr: 'suspicious', look: 0.8}]} />
            <Bob f={f} x={500} y={880} s={0.95} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: nt, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Kevin f={f} x={1600} y={880} s={1.05 * bump(an, 0.08)} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: nt, pose: 'shrug', expr: 'sad', look: -0.8}]} />
            <G2 x={1600} y={380} s={In(A('c7b'), 3)} o={0.6 + 0.4 * lit(an)}><Text size={40}>cousin Kevin: Android</Text></G2>
            <G2 x={380} y={380} s={In(A('c7b'), 2) * bump(bl, 0.1)}><Text size={40} color={BLUE_B}>blue bubbles</Text></G2>
            <G2 x={1600} y={200} s={In(A('c7b'), 4) * bump(gr)} o={0.6 + 0.4 * lit(gr)}><Text size={44} color={GREEN_B}>→ green!</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={960} y={880} s={1.15} keys={[{at: 0, pose: 'present', expr: 'happy'}]} />
            <G2 x={420} y={300} s={In(A('c7c')) * bump(ap, 0.12)} o={0.55 + 0.45 * lit(ap)}><Earbuds /><Text y={150} size={38}>AirPods</Text></G2>
            <G2 x={440} y={700} s={0.9 * In(A('c7c'), 2) * bump(lp, 0.1)} o={0.55 + 0.45 * lit(lp)}><Laptop /><Text y={100} size={38}>laptop</Text></G2>
            <G2 x={1500} y={320} s={0.9 * In(A('c7c'), 3) * bump(wt, 0.12)} o={0.55 + 0.45 * lit(wt)}><Watch face="9:41" /><Text y={230} size={36}>Watch: iPhone only</Text></G2>
            <G2 x={1500} y={700} s={In(A('c7c'), 4) * bump(ic, 0.1)} o={0.55 + 0.45 * lit(ic)}><CloudBox label="iCloud" /><Text y={120} size={32}>photos · passwords · apps</Text></G2>
            <G2 x={960} y={120} s={In(A('c7c'), 1)}><Text size={50}>everything works together</Text></G2>
            {f >= ap && <path d={`M 560 330 Q 760 ${250 + Math.sin(f / 6) * 20} 880 430`} fill="none" stroke={C.blue} strokeWidth={8} strokeDasharray="16 14" strokeLinecap="round" />}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={820} y={520} s={In(A('c7d'))}>
              {['MESSAGES', 'AIRPODS', 'WATCH', 'PHOTOS', 'PASSWORDS', 'APPS'].map((l, i) => {
                const r = Math.floor(i / 3);
                const x = -520 + (i % 3) * 360 + (r ? 180 : 0);
                const k = ease(f, br + i * 3, br + 8 + i * 3);
                return (
                  <g key={l} transform={`translate(${x},${-120 + r * 180}) scale(${bump(wl + i * 2, 0.08)})`}>
                    <rect x={-170} y={-80} width={340} height={160} rx={12} fill={k > 0.5 ? '#D9774B' : '#F1EADC'} stroke={k > 0.5 ? '#7A3B22' : C.ink} strokeWidth={6} />
                    <Text y={4} size={38} color={k > 0.5 ? '#fff' : C.ink}>{l}</Text>
                  </g>
                );
              })}
            </G2>
            <G2 x={820} y={130} s={In(A('c7d'), 2) * bump(wl, 0.1)}><Text size={52}>{f >= br ? 'each piece = a brick in the wall' : 'leaving = losing all this'}</Text></G2>
            <Dave f={f} x={1640} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.8}, {at: wl, pose: 'facepalm', expr: 'sad', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={620} y={500} s={1.2 * In(A('c7e')) * bump(wd, 0.06)}><Globe f={f} /></G2>
            <G2 x={1360} y={360} s={In(A('c7e'), 2) * bump(tw, 0.1)}>
              <NumCard top="ACTIVE APPLE DEVICES" val={f >= tw ? '2.5 BILLION+' : '?'} w={800} color={f >= tw ? C.green : C.ink} />
            </G2>
            <Dave f={f} x={1360} y={900} s={0.9} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: tw, pose: 'shock', expr: 'shock', look: -0.8}]} />
            <SourceTag f={f} at={tw} text="Apple Q1 FY2026 results, Jan 29, 2026" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={920} s={In(A('c7f'))} tilt={f < cri ? ease(f, pro[0], pro[3] + 10, 0, -10) : ease(f, cri, con[3], -10, 6)} left="LOVE IT" right="TOO HIGH" />
            <G2 x={960} y={120} s={In(A('c7f'), 1)}><Text size={52}>nice garden... or too many walls?</Text></G2>
            {['works together', 'privacy focus', 'years of updates', 'good resale value'].map((l, i) => (
              <G2 key={l} x={340} y={260 + i * 110} s={In(A('c7f'), 2 + i) * bump(pro[i], 0.08)}><Pill text={l} w={500} lit={lit(pro[i])} color={C.green} size={36} /></G2>
            ))}
            {['switching is hard', 'DOJ lawsuit (2024)', 'Apple disagrees', 'case still going'].map((l, i) => (
              <G2 key={l} x={1580} y={260 + i * 110} s={In(A('c7f'), 2 + i) * bump(con[i], 0.08)}><Pill text={l} w={500} lit={lit(con[i])} color={C.red} size={36} /></G2>
            ))}
            <SourceTag f={f} at={con[1]} text="U.S. v. Apple, D.N.J., filed Mar 21, 2024" until={con[1] + 90} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={520} y={500} s={In(A('c7h')) * bump(ng, 0.08)} o={0.5 + 0.5 * lit(ng)}><Frame w={660} h={600} label="nice garden?"><Garden y={120} s={0.4} f={f} /></Frame></G2>
            <G2 x={1400} y={500} s={In(A('c7h'), 2) * bump(cg, 0.08)} o={0.5 + 0.5 * lit(cg)}><Frame w={660} h={600} label="golden cage?"><Cage y={130} s={0.9} /></Frame></G2>
            <Dave f={f} x={960} y={960} s={0.8} keys={[{at: 0, pose: 'shrug', expr: 'think'}, {at: yu, pose: 'point_up', expr: 'grin'}]} />
            <G2 x={960} y={110} s={In(A('c7h'), 1) * bump(yu, 0.1)}><Text size={52}>{f >= yu ? "that's up to you" : 'you decide'}</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Plan ============
  {
    const hs = [bs('c8b'), bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(w('c8b', 'cancel'), 'rip', 0.5);
    q(w('c8c', 'hundreds'), 'cash', 0.5);
    q(w('c8d', 'delete'), 'poof', 0.5);
    q(w('c8f', 'reminder'), 'tick', 0.6);
    const items = ['Do a subscription audit', "Don't upgrade every year", 'Clean up before buying storage', 'Bundle only if you use 3+', 'Free trials → set a reminder'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={640} y={100} s={In(A('c8a'))}><Text size={56}>Dave's garden plan</Text></G2>
          <G2 x={640} y={160} s={In(A('c8a'), 1)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={100} y={270 + i * 130} s={0.85 * In(A('c8a'), i) * bump(hs[i], 0.06)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.6 : 0.2} color={C.green} w={1100} />)}
          <G2 x={1580} y={440} s={In(A('c8a'), 3)}>
            {cur === 0 && <Garden y={200} s={0.4} f={f} />}
            {cur === 1 && (
              <Handset>
                <Text y={-190} size={24} color="#5B6470">Settings › you</Text>
                {['Subscriptions', 'Music  $11.99', 'TV  $14.99', 'Arcade  $6.99'].map((l, i) => (
                  <g key={l}>
                    <rect x={-100} y={-150 + i * 80} width={200} height={62} rx={12} fill={i ? '#fff' : C.sky} stroke={C.ink} strokeWidth={3} />
                    <Text y={-118 + i * 80} size={22}>{l}</Text>
                    {i === 3 && f >= w('c8b', 'cancel') && <line x1={-90} x2={90} y1={-118 + i * 80} y2={-118 + i * 80} stroke={C.red} strokeWidth={6} />}
                  </g>
                ))}
              </Handset>
            )}
            {cur === 2 && <Calendar s={1.1} top="KEEP IT" year="4–5 yrs" flip={0} />}
            {cur === 3 && <g><CloudBox label="clean up" /><XMark x={0} y={140} s={0.18} /><Text y={210} size={32}>old videos · duplicates</Text></g>}
            {cur === 4 && <Bundle s={0.8} title="3+ services?" price="then compare" />}
            {cur === 5 && <g><Clock f={f} s={1.4} /><Text y={190} size={36}>trial ends → reminder</Text></g>}
          </G2>
          <Dave f={f} x={1580} y={960} s={0.7} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: hs[0], pose: 'thumbs', expr: 'grin'}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH9 ============
  const recap = ['iPhone ≈ half of sales; services keep ~75¢/$1', 'App Store cut + subscriptions + Google check', 'The walled garden is comfy: check what you pay'];
  {
    const r = [bs('c9b'), bs('c9c'), bs('c9d')];
    q(A('c9a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    const cur = r.filter((x) => f >= x).length;
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={In(A('c9a'))}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={230} y={360 + i * 170} s={In(A('c9a'), 2 + i * 2) * bump(r[i], 0.05)} n={i + 1} text={b} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.2} color={C.blue} w={1460} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const am = w('c9e', 'amazon');
    const hn = w('c9e', 'hint');
    const bx = w('c9e', 'boxes');
    const sb = w('c9f', 'subscribe');
    const fr = w('c9f', 'free');
    q(am, 'chime', 0.5);
    q(hn, 'pop', 0.5);
    q(bx, 'boing', 0.6);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fr, 'ding', 0.5);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={In(A('c9e')) * bump(am, 0.08)}><Text size={58}>Next: how Amazon really makes money</Text></G2>
            <G2 x={1200} y={560} s={In(A('c9e'), 2)} r={f >= bx ? Math.sin((f - bx) / 2) * 6 * (1 - ease(f, bx, bx + 20)) : 0}><CardBox /></G2>
            <G2 x={1200} y={820} s={In(A('c9e'), 3) * bump(bx)} o={0.6 + 0.4 * lit(hn)}><Text size={48} color={C.red}>hint: it's NOT the boxes</Text></G2>
            <Dave f={f} x={450} y={880} s={1.15} keys={[{at: 0, pose: 'hold', expr: 'suspicious', look: 0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 8)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb - 6)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <G2 x={960} y={640} s={pop(f, sb - 6) * bump(fr, 0.1)}><Text size={48} color={C.green}>the one subscription that's FREE</Text></G2>
            <Dave f={f} x={420} y={880} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Kevin f={f} x={1600} y={880} s={0.9} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5c', 'alone') + 20;
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
