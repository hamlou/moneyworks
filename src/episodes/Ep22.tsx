import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bank, Bubble, Calendar, Car, Duck, MoneyStack, Monitor, Paper, Puff, Sparkle, SourceTag, Stamp, Text, XMark, Bill} from '../props';
import {Bar, Bell, Frame, Magnifier, MoneyMachine, Phone, Row, SubButton, Chalkboard} from '../props2';
import {Person, PriceTag, Raccoon} from '../props3';
import {Globe, House, LineChart, Pizza} from '../props4';
import {Contract} from '../props5';
import {Boxes, Share, Stand} from '../props7';
import {Paycheck, Scale, SlicePie} from '../props8';
import {Jar} from '../props19';
import {Bolt} from '../props20';
import {Basket, Bear, Box, Bulb, Bull, Chip, DataCenter, Loop, Onion, SockPuppet, SoapBubble, Tulip, Tv, ValBox, Windmill} from '../props22';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Tyler: React.FC<SP> = (p) => <Stick acc={['shades', 'tie']} seed={66} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;
const Kevin: React.FC<SP> = (p) => <Stick acc={['cap', 'shades']} seed={88} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Pill: React.FC<{x: number; y: number; text: string; lit: number; size?: number; color?: string; w?: number}> = ({x, y, text, lit, size = 44, color = C.yellow, w}) => {
  const ww = w ?? text.length * size * 0.55 + 70;
  return (
    <g transform={`translate(${x},${y})`} opacity={0.45 + 0.55 * lit}>
      <rect x={-ww / 2} y={-size * 0.85} width={ww} height={size * 1.7} rx={size * 0.85} fill={lit > 0.5 ? color : '#fff'} stroke={C.ink} strokeWidth={5} />
      <Text y={2} size={size}>{text}</Text>
    </g>
  );
};

const Check: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path transform={`translate(${x},${y}) scale(${s})`} d="M -30 0 l 22 22 l 44 -48" fill="none" stroke={C.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
);

export const Ep22: React.FC = () => {
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
  const L = (at: number) => (f >= at ? 1 : 0);
  const bump = (at: number, k = 0.15) => (f < at ? 1 : 1 + k * Math.max(0, 1 - (f - at) / 12));

  // ============ COLD OPEN ============
  {
    const qt = w('o1', 'quit');
    const ai = w('o1', 'ai');
    const sv = w('o1', 'savings');
    const fu = w('o2', 'future');
    const up = w('o2', 'up');
    const hb = w('o2', 'heard');
    q(qt, 'stamp', 0.7);
    q(ai, 'pop', 0.6);
    q(sv, 'cash', 0.7);
    q(fu, 'ding', 0.5);
    q(up, 'boing', 0.5);
    q(hb, 'cricket', 0.5);
    const fly = ease(f, sv, sv + 24);
    scene(0, () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <Bank x={330} y={822} s={0.62 * pop(f, 0)} label="OFFICE" />
          {f >= qt && <Stamp x={330} y={420} s={pop(f, qt, 9, 260)} text="I QUIT!" size={60} color={C.red} r={-8} />}
          <Tyler f={f} x={760} y={822} s={1.15 * pop(f, 2)} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.6}, {at: fu, pose: 'point_up', expr: 'grin', look: 0.6}]} />
          <G2 x={760} y={340} s={pop(f, 4)}><Text size={44}>Dave's friend Tyler</Text></G2>
          <G2 x={1330} y={520} s={pop(f, 4) * bump(ai)}><Phone s={1.2} title="AI STOCKS" value={f >= up ? 'ALL IN!' : 'BUY'} color={C.green} /></G2>
          <G2 x={lin(fly, 0, 1, 1700, 1380)} y={lin(fly, 0, 1, 780, 560)} s={pop(f, 6) * (1 - 0.7 * fly)}><MoneyStack n={5} s={0.9} label="ALL SAVINGS" /></G2>
          <Dave f={f} x={1760} y={822} s={0.9 * pop(f, 6)} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.8}, {at: hb, pose: 'facepalm', expr: 'worried', look: -0.8}]} sweat={f >= hb} />
          {f >= A('o2') && <G2 x={1080} y={180} s={pop(f, A('o2'))}><Bubble text={f >= up ? '"They can only go UP!"' : '"AI is the future!"'} size={46} tail="left" /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sv = w('o3', 'seven');
    const yr = w('o3', 'year');
    const oa = w('o3', 'openai');
    const tr = w('o3', 'trillion');
    q(sv, 'cash', 0.7);
    q(yr, 'stamp', 0.5);
    q(oa, 'pop', 0.6);
    q(tr, 'thud', 0.8);
    const names = ['AMAZON', 'ALPHABET', 'MICROSOFT', 'META'];
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {names.map((n, i) => (
            <DataCenter key={n} f={f} x={210 + (i % 2) * 420} y={470 + Math.floor(i / 2) * 400} s={0.62 * P('o3', i * 2)} w={560} label={n} />
          ))}
          <ValBox f={f} at={sv} x={1360} y={330} s={P('o3', 3)} w={820} h={220} size={96} value="$700 BILLION" label="AI spending plans, one year" color={C.green} fill="#EAF7EF" />
          <ValBox f={f} at={tr} x={1360} y={680} s={P('o3', 5) * bump(oa, 0.06)} w={820} h={220} size={96} value="$1.4 TRILLION" label="OpenAI's promises" color={C.red} fill="#FDEBEF" />
          <SourceTag f={f} at={sv} text="Company capex guidance, July 2026 · TechCrunch, Nov 6, 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cr = w('o4', 'circle');
    const bb = w('o5', 'bubble');
    const it = w('o5', 'internet');
    q(cr, 'whoosh', 0.6);
    q(bb, 'pop', 0.6);
    q(it, 'ding', 0.6);
    scene(A('o4'), () =>
      f < A('o5') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Loop f={f} x={960} y={520} s={P('o4')} rad={300} nodes={[<Chip key="a" s={0.6} label="NVIDIA" />, <Bank key="b" s={0.3} label="OPENAI" />, <DataCenter key="c" f={f} s={0.4} y={90} label="CLOUD" />]} labels={['$', '$', '$']} lit={[L(cr), L(cr), L(cr)]} coin={f >= cr ? ((f - cr) / 45) % 1 : 0.02} />
            <Dave f={f} x={260} y={900} s={1.1} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.8}]} />
            <G2 x={1620} y={200} s={P('o4', 4)}><Text size={54} color={f >= cr ? C.red : C.ink}>money... in a circle?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={460} s={P('o5') * bump(bb)}><SoapBubble f={f} rad={250} label="BUBBLE?" /></G2>
            <G2 x={1440} y={460} s={P('o5', 2) * bump(it)}><Globe f={f} s={1.4} /></G2>
            <Text x={1440} y={770} size={52}>the next internet?</Text>
            <Text x={960} y={460} size={90} color="#5B6470">or</Text>
            <Dave f={f} x={960} y={1000} s={0.75} keys={[{at: 0, pose: 'shrug', expr: 'think'}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'bubble'), w('o6', 'tulips'), w('o6', 'circle'), w('o6', 'pops')];
    pv.forEach((x) => q(x, 'stamp', 0.5));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={130} size={60} color="#5B6470">TODAY</Text>
          {['WHAT A BUBBLE IS', 'TULIPS & A SOCK', 'CIRCLE OF MONEY', 'IF IT POPS'].map((l, i) => (
            <G2 key={l} x={270 + i * 460} y={520} s={P('o6', i * 2) * bump(pv[i], 0.1)} o={0.45 + 0.55 * L(pv[i])}>
              <Frame w={420} h={440} label={l}>
                {i === 0 && <SoapBubble f={f} y={-40} rad={120} />}
                {i === 1 && <g><Tulip x={-70} y={60} s={0.8} striped /><SockPuppet f={f} x={80} y={-20} s={0.45} mic={false} /></g>}
                {i === 2 && <Loop f={f} y={-40} s={0.35} rad={220} nodes={[<Chip key="a" s={0.6} label="" />, <Bank key="b" s={0.3} label="" />, <DataCenter key="c" f={f} s={0.4} y={90} label="" />]} labels={['', '', '']} lit={[L(pv[2]), L(pv[2]), L(pv[2])]} />}
                {i === 3 && <G2 y={-40}><Jar s={0.55} level={0.6} label="401(k)" /></G2>}
              </Frame>
            </G2>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 What is a bubble ============
  {
    const rl = w('c1b', 'real');
    const air = w('c1b', 'air');
    const gr = w('c1b', 'growing');
    const pp = w('c1b', 'pop');
    q(rl, 'ding', 0.5);
    q(air, 'whoosh_s', 0.5);
    q(gr, 'boing', 0.4);
    q(pp, 'poof', 0.8);
    const rad = 200 + ease(f, gr, pp, 0, 90);
    const wr = w('c1c', 'worth');
    const ex = w('c1c', 'expect');
    q(wr, 'ding', 0.5);
    q(ex, 'pop', 0.5);
    const ev = w('c1d', 'everyone');
    const fm = w('c1d', 'fomo');
    const mo = w('c1d', 'missing');
    q(ev, 'crowd', 0.4);
    q(fm, 'stamp', 0.7);
    q(mo, 'dream', 0.4);
    const nv = w('c1e', 'nervous');
    const la = w('c1e', 'last');
    const fl = w('c1e', 'falls');
    q(nv, 'sting', 0.5);
    q(la, 'tick', 0.5);
    q(fl, 'whoosh', 0.6);
    const nf = w('c1f', 'never');
    const sm = w('c1f', 'smart');
    q(nf, 'pop', 0.5);
    q(sm, 'ding', 0.6);
    const pts = [10, 12, 18, 28, 45, 70, 95, 60, 25, 12];
    scene(A('c1a'), () =>
      f < A('c1c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={330} y={900} s={1.2} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.8}, {at: pp, pose: 'shock', expr: 'shock', look: 0.8}]} />
            {f < pp + 4 && <G2 x={1150} y={480} s={P('c1a')}><SoapBubble f={f} rad={rad} label={f >= air ? 'mostly AIR' : 'a bubble'} /></G2>}
            {f >= pp && f < pp + 24 && <Puff x={1150} y={480} s={3} t={lin(f, pp, pp + 20)} />}
            {f >= pp && <G2 x={1150} y={480} s={pop(f, pp, 8, 260)}><Text size={180} color={C.red} stroke={C.ink} sw={8}>POP!</Text></G2>}
            <G2 x={1650} y={160} s={P('c1a', 4)}>
              <Pill x={0} y={0} text="it's real" lit={L(rl)} size={40} />
              <Pill x={0} y={110} text="mostly air" lit={L(air)} size={40} />
              <Pill x={0} y={220} text="keeps growing" lit={L(gr)} size={40} />
            </G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c1c')}><Text size={56}>a money bubble</Text></G2>
            <line x1={260} y1={700} x2={1500} y2={700} stroke={C.green} strokeWidth={12} strokeDasharray="30 18" opacity={0.4 + 0.6 * L(wr)} />
            <G2 x={1680} y={700} s={P('c1c', 2) * bump(wr)}><Text size={46} color={C.green}>real value</Text></G2>
            <LineChart x={880} y={520} w={1240} h={520} t={ease(f, A('c1c'), ex + 30, 0.35, 0.68)} pts={pts} lo={0} hi={100} color={C.red} axes={false} />
            <G2 x={1620} y={330} s={P('c1c', 4) * bump(ex)}><Text size={46} color={C.red}>price</Text></G2>
            <G2 x={500} y={260} s={P('c1c', 6)} o={0.4 + 0.6 * L(ex)}><Bubble text="it'll keep going up!" size={38} tail="down" /></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[0, 1, 2, 3, 4].map((i) => (
              <Stick key={i} f={f} x={260 + i * 190} y={822} s={0.95 * P('c1d', i)} acc={[['cap'], ['ponytail'], ['glasses'], ['bun'], ['fedora']][i] as StickProps['acc']} seed={30 + i} keys={[{at: 0, pose: i % 2 ? 'carry' : 'celebrate', expr: 'grin', look: 0.8}]} />
            ))}
            <G2 x={1450} y={380} s={P('c1d', 3) * bump(fm, 0.25)}>
              <Box w={700} h={260} fill={f >= fm ? C.yellow : '#fff'} />
              <Text y={-30} size={130} color={f >= fm ? C.red : '#B9B0A0'}>{f >= fm ? 'FOMO' : '????'}</Text>
              <Text y={80} size={40} color={f >= mo ? C.ink : '#B9B0A0'}>fear of missing out</Text>
            </G2>
            <G2 x={640} y={300} s={P('c1d', 5)}><Bubble text="everyone's buying!" size={40} tail="down" /></G2>
            <Dave f={f} x={1450} y={822} s={0.9} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <LineChart x={1150} y={450} w={1100} h={460} t={f < fl ? ease(f, A('c1e'), fl, 0.6, 0.7) : ease(f, fl, fl + 25, 0.7, 1)} pts={pts} lo={0} hi={100} color={C.red} />
            {[0, 1, 2].map((i) => (
              <Stick key={i} f={f} x={180 + i * 150} y={900} s={0.8 * P('c1e', i)} acc={[['cap'], ['ponytail'], ['glasses']][i] as StickProps['acc']} seed={30 + i} keys={[{at: 0, pose: 'hold', expr: 'neutral', look: 0.8}, {at: nv, pose: 'panic', expr: 'worried', look: 0.8}]} sweat={f >= nv} />
            ))}
            <G2 x={330} y={380} s={P('c1e', 3) * bump(la)} o={0.45 + 0.55 * L(la)}><Bubble text="don't be the last one!" size={38} tail="down" /></G2>
            <G2 x={1150} y={880} s={P('c1e', 4) * bump(fl)}><Text size={48} color={f >= fl ? C.red : '#9C9383'}>falls faster than it rose</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={560} s={P('c1f')}>
              <SoapBubble f={f} rad={330} />
              <Tyler f={f} x={0} y={230} s={1} keys={[{at: 0, pose: 'hips', expr: 'smug'}]} />
            </G2>
            <G2 x={1480} y={330} s={P('c1f', 3) * bump(sm)}><Box w={620} h={150} fill={f >= sm ? C.yellow : '#fff'} /><Text size={52}>"I'm so smart!"</Text></G2>
            <G2 x={1480} y={520} s={P('c1f', 5)} o={0.45 + 0.55 * L(nf)}><Text size={40}>never feels like a bubble</Text></G2>
            <Dave f={f} x={1480} y={960} s={0.9} keys={[{at: 0, pose: 'facepalm', expr: 'worried', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH2 Tulips ============
  {
    const nl = w('c2a', 'netherlands');
    const tl = w('c2b', 'tulips');
    const st = w('c2b', 'striped');
    const ss = w('c2b', 'status');
    q(nl, 'ding', 0.5);
    q(tl, 'pop', 0.5);
    q(st, 'pop2', 0.5);
    q(ss, 'chime', 0.5);
    const tr = w('c2c', 'trading');
    const cl = w('c2c', 'climbing');
    const hs = w('c2c', 'house');
    const am = w('c2c', 'amsterdam');
    q(tr, 'coin', 0.5);
    q(cl, 'boing', 0.4);
    q(hs, 'cash', 0.7);
    const hs2 = w('c2d', 'house');
    const on = w('c2d', 'onion');
    q(hs2, 'thud', 0.5);
    q(on, 'trombone', 0.5);
    const fb = w('c2e', 'february');
    const sp = w('c2e', 'stopped');
    const co = w('c2e', 'collapsed');
    q(fb, 'flip', 0.5);
    q(sp, 'cricket', 0.5);
    q(co, 'whoosh', 0.7);
    const hi = w('c2f', 'historians');
    const sm = w('c2f', 'smaller');
    const ls = w('c2f', 'lesson');
    const re = w('c2f', 'reality');
    q(hi, 'paper', 0.5);
    q(sm, 'pop', 0.5);
    q(ls, 'marker', 0.6);
    q(re, 'ding', 0.6);
    const film = <OldFilm f={f} o={0.45} />;
    const bars = [cl, cl + 10, cl + 20, hs];
    scene(A('c2a'), () =>
      f < A('c2b') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Windmill f={f} x={420} y={822} s={1.1 * P('c2a')} />
            <Calendar x={1500} y={300} s={0.7 * P('c2a', 3)} top="ABOUT" year="1630s" flip={0} />
            {[0, 1, 2, 3, 4, 5].map((i) => <Tulip key={i} x={850 + i * 110} y={822} s={0.8 * P('c2a', 4 + i)} color={[C.red, C.yellow, '#E7A6F2', C.red, C.yellow, '#E7A6F2'][i]} />)}
            <G2 x={1500} y={560} s={P('c2a', 6) * bump(nl)}><Text size={60} color={f >= nl ? C.blue : C.ink}>the Netherlands</Text></G2>
          </Svg>
          {film}
        </AbsoluteFill>
      ) : f < A('c2c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <Tulip key={i} x={160 + i * 110} y={822} s={0.7 * P('c2b', i)} color={[C.red, C.yellow, '#E7A6F2'][i % 3]} />)}
            <G2 x={1250} y={822} s={1.6 * P('c2b', 3) * bump(st, 0.1)}><Tulip color={C.red} striped={f >= st} stem={200} /></G2>
            {f >= ss && <Sparkle x={1330} y={380} t={(f % 30) / 30} s={0.8} />}
            <Stick f={f} x={1650} y={822} s={1} acc={['tophat']} seed={12} keys={[{at: 0, pose: 'present', expr: 'happy', look: -0.8}, {at: ss, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <G2 x={1250} y={220} s={P('c2b', 5)}><Pill x={0} y={0} text="STATUS SYMBOL" lit={L(ss)} size={46} /></G2>
            <G2 x={560} y={300} s={P('c2b', 6) * bump(tl)}><Text size={52}>the hottest thing: tulips</Text></G2>
          </Svg>
          {film}
        </AbsoluteFill>
      ) : f < A('c2d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c2c')}><Text size={54}>price of one rare bulb</Text></G2>
            <line x1={160} y1={860} x2={1100} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {['1634', '1635', '1636', 'early 1637'].map((l, i) => (
              <Bar key={l} x={270 + i * 240} y={860} w={160} h={ease(f, bars[i] - 4, bars[i] + 14, 30, 90 + i * i * 55)} color={i === 3 ? C.red : C.gold} label={l} value={i === 3 && f >= hs ? '= HOUSE' : ''} />
            ))}
            <Bulb x={1350} y={500} s={1.1 * P('c2c', 3) * bump(tr)} label="1 bulb" />
            <Text x={1530} y={500} size={100}>=</Text>
            <G2 x={1740} y={660} s={0.55 * P('c2c', 5) * bump(hs)} o={0.35 + 0.65 * L(hs)}><House sold={f >= am ? 'AMSTERDAM' : undefined} /></G2>
            <SourceTag f={f} at={hs} text="Reported prices, tulip mania 1636–37 (Goldgar, 'Tulipmania')" />
          </Svg>
          {film}
        </AbsoluteFill>
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={500} y={640} s={0.7 * P('c2d') * bump(hs2)}><House /></G2>
            <Text x={960} y={450} size={110}>=</Text>
            <Bulb x={1350} y={430} s={1.2 * P('c2d', 3)} label="a tulip bulb" />
            <G2 x={1650} y={700} s={P('c2d', 5) * bump(on)} o={0.4 + 0.6 * L(on)}><Onion s={0.8} label="...an onion?" /></G2>
            <Dave f={f} x={960} y={1000} s={0.75} keys={[{at: 0, pose: 'shock', expr: 'shock'}, {at: on, pose: 'facepalm', expr: 'tired'}]} />
          </Svg>
          {film}
        </AbsoluteFill>
      ) : f < A('c2f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <LineChart x={1150} y={470} w={1050} h={480} t={f < co ? ease(f, A('c2e'), fb, 0.6, 0.72) : ease(f, co, co + 20, 0.72, 1)} pts={[5, 8, 14, 25, 45, 80, 100, 20, 8, 6]} lo={0} hi={100} color={C.red} />
            <Calendar x={300} y={300} s={0.7 * P('c2e') * bump(fb)} top="FEBRUARY" year={1637} flip={0} />
            <G2 x={330} y={780} s={P('c2e', 3)}>
              <rect x={-220} y={-120} width={440} height={200} rx={12} fill="#F6E2C0" stroke={C.ink} strokeWidth={6} />
              <Text y={-60} size={34}>BULBS FOR SALE</Text>
              {[-120, 0, 120].map((x) => <Bulb key={x} x={x} y={20} s={0.4} />)}
            </G2>
            <G2 x={330} y={560} s={P('c2e', 4) * bump(sp)} o={0.4 + 0.6 * L(sp)}><Text size={44} color={C.red}>buyers: 0</Text></G2>
            <G2 x={1150} y={880} s={P('c2e', 6) * bump(co)}><Text size={48} color={f >= co ? C.red : '#9C9383'}>collapsed within days</Text></G2>
          </Svg>
          {film}
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Stick f={f} x={380} y={880} s={1.15 * P('c2f')} acc={['glasses', 'bun']} seed={17} keys={[{at: 0, pose: 'present', expr: 'think', look: 0.8}]} />
            <G2 x={380} y={390} s={P('c2f', 3) * bump(sm)}><Bubble text={f >= sm ? 'smaller than the legend' : 'historians say...'} size={36} tail="down" /></G2>
            <G2 x={1200} y={500} s={P('c2f', 4)}>
              <Chalkboard lines={['THE LESSON:', 'price can lose touch', 'with reality']} />
            </G2>
            {f >= re && <Check x={1560} y={260} s={1.5} />}
            <G2 x={1200} y={900} s={P('c2f', 6)} o={0.4 + 0.6 * L(ls)}><Text size={44}>the lesson stuck</Text></G2>
          </Svg>
          {film}
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Dot-com ============
  {
    const ni = w('c3a', 'nineties');
    const ne = w('c3b', 'new');
    const th = w('c3b', 'threw');
    const dc = w('c3b', 'dot');
    q(ni, 'flip', 0.5);
    q(ne, 'ding', 0.5);
    q(th, 'cash', 0.6);
    q(dc, 'pop', 0.5);
    const pd = w('c3c', 'pets');
    const sk = w('c3c', 'sock');
    const pb = w('c3c', 'public');
    const nv = w('c3c', 'november');
    const nm = w('c3c', 'nine');
    q(pd, 'pop', 0.5);
    q(sk, 'boing', 0.6);
    q(pb, 'ding', 0.6);
    q(nv, 'flip', 0.6);
    q(nm, 'stamp', 0.7);
    const nq = w('c3d', 'nasdaq');
    const pk = w('c3d', 'peaked');
    const oc = w('c3d', 'october');
    const sv = w('c3d', 'seventy');
    const tt = w('c3e', 'ten');
    const sh = w('c3e', 'shrink');
    q(nq, 'pop', 0.5);
    q(pk, 'ding', 0.6);
    q(oc, 'whoosh', 0.6);
    q(sv, 'stamp', 0.8);
    q(tt, 'cash', 0.5);
    q(sh, 'trombone', 0.6);
    const tw = w('c3f', 'twist');
    const rl = w('c3f', 'real');
    const az = w('c3f', 'amazon');
    const rt = w('c3f', 'right');
    const wr = w('c3f', 'wrong');
    const rm = w('c3g', 'remember');
    const ky = w('c3g', 'key');
    q(tw, 'sting', 0.5);
    q(rl, 'ding', 0.5);
    q(az, 'pop', 0.6);
    q(rt, 'ding', 0.7);
    q(wr, 'buzz', 0.6);
    q(ky, 'key', 0.6);
    const doms = ['pets.com', 'toys.com', 'socks.com', 'food.com', 'cars.com', 'boo.com'];
    const npts = [1000, 1500, 2600, 4000, 5048, 3600, 2400, 2000, 1500, 1114];
    scene(A('c3a'), () =>
      f < A('c3c') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Monitor x={420} y={640} s={1.1 * P('c3a')} title="THE INTERNET" value="www" valueColor={C.blue} />
            <Calendar x={420} y={170} s={0.5 * P('c3a', 2) * bump(ni)} top="LATE" year="1990s" flip={0} />
            {doms.map((d, i) => (
              <G2 key={d} x={1000 + (i % 3) * 300} y={330 + Math.floor(i / 3) * 280} s={P('c3a', 3 + i) * bump(dc, 0.1)}>
                <Box w={260} h={140} fill={f >= dc ? '#E3F1F4' : '#fff'} />
                <Text size={40} color={C.blue}>{d}</Text>
              </G2>
            ))}
            {f >= th && [0, 1, 2, 3, 4, 5].map((i) => <Bill key={i} x={lin(f, th + i * 3, th + i * 3 + 20, 700, 1000 + (i % 3) * 300)} y={lin(f, th + i * 3, th + i * 3 + 20, 900, 420 + Math.floor(i / 3) * 280)} s={0.45} r={i * 20} />)}
            <G2 x={1300} y={900} s={P('c3a', 8)} o={0.4 + 0.6 * L(ne)}><Text size={44}>new · exciting · world changing</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SockPuppet f={f} x={450} y={560} s={1.4 * P('c3c') * bump(sk, 0.08)} />
            <G2 x={450} y={180} s={P('c3c', 2) * bump(pd)}><Text size={64} color={C.blue}>Pets.com</Text></G2>
            <Calendar x={1100} y={330} s={0.7 * P('c3c', 4)} top={f >= nv ? 'NOVEMBER' : 'FEBRUARY'} year={2000} flip={f >= nv ? ease(f, nv, nv + 10) : 0} />
            <G2 x={1300} y={680}>
              <rect x={-450} y={-40} width={900} height={80} rx={40} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <rect x={-440} y={-30} width={880 * ease(f, pb, nv + 10, 0.04, 1)} height={60} rx={30} fill={f >= nv ? C.red : C.green} />
              <Text x={-450} y={80} size={34} anchor="start">IPO</Text>
              <Text x={450} y={80} size={34} anchor="end">shut down</Text>
            </G2>
            <G2 x={1600} y={330} s={P('c3c', 6) * bump(nm)}><Box w={380} h={150} fill={f >= nm ? C.yellow : '#fff'} /><Text size={56}>{f >= nm ? '~9 months' : '? months'}</Text></G2>
            <SourceTag f={f} at={pb} text="Pets.com IPO Feb 2000 · liquidation Nov 7, 2000" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={110} s={P('c3d')}><Text size={54}>Nasdaq (tech stocks)</Text></G2>
            <LineChart x={700} y={500} w={1100} h={520} t={f < oc ? ease(f, A('c3d'), pk + 10, 0.2, 0.47) : ease(f, oc, oc + 25, 0.47, 1)} pts={npts} lo={0} hi={5400} color={C.blue} />
            <G2 x={640} y={250} s={P('c3d', 3) * bump(pk)}><Text size={40} color={f >= pk ? C.green : '#9C9383'}>{f >= pk ? 'Mar 2000: 5,048' : 'peak: ?'}</Text></G2>
            <G2 x={1080} y={690} s={P('c3d', 4) * bump(oc)}><Text size={40} color={f >= oc ? C.red : '#9C9383'}>{f >= oc ? 'Oct 2002: 1,114' : 'bottom: ?'}</Text></G2>
            <ValBox f={f} at={sv} x={1600} y={260} s={P('c3d', 5)} w={420} h={170} size={90} value="-78%" color={C.red} fill="#FDEBEF" />
            <G2 x={1600} y={640} s={P('c3d', 6)}>
              <G2 s={ease(f, sh, sh + 30, 1, 0.45)}><MoneyStack n={6} s={1} label={f >= sh ? '$2,200' : '$10,000'} /></G2>
            </G2>
            <SourceTag f={f} at={pk} text="Nasdaq Composite: 5,048.62 (3/10/2000) → 1,114.11 (10/9/2002)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={420} y={450} s={P('c3f') * bump(rl)}><Globe f={f} s={1.1} /></G2>
            <G2 x={420} y={800} s={P('c3f', 2) * bump(az)} o={0.45 + 0.55 * L(az)}><Boxes s={1.1} /></G2>
            <G2 x={420} y={900} s={P('c3f', 3)}><Text size={36} color="#5B6470">{f >= az ? 'Amazon survived' : 'the internet was real'}</Text></G2>
            <G2 x={1250} y={380} s={P('c3f', 4) * bump(rt)}>
              <Box w={860} h={160} fill={f >= rt ? '#EAF7EF' : '#fff'} />
              <Text x={-60} size={56} color={f >= rt ? C.ink : '#B9B0A0'}>The technology was</Text>
              <Text x={340} size={56} color={f >= rt ? C.green : '#B9B0A0'}>RIGHT</Text>
            </G2>
            <G2 x={1250} y={620} s={P('c3f', 6) * bump(wr)}>
              <Box w={860} h={160} fill={f >= wr ? '#FDEBEF' : '#fff'} />
              <Text x={-60} size={56} color={f >= wr ? C.ink : '#B9B0A0'}>The prices were</Text>
              <Text x={330} size={56} color={f >= wr ? C.red : '#B9B0A0'}>WRONG</Text>
            </G2>
            <Dave f={f} x={1250} y={1000} s={0.6} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: rm, pose: 'point_up', expr: 'grin'}]} />
            {f >= ky && <Stamp x={1700} y={170} s={pop(f, ky, 9, 260)} text="KEY IDEA" size={48} color={C.blue} r={8} />}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Build-out ============
  {
    const dc = w('c4b', 'data');
    const fo = w('c4b', 'fortune');
    const el = w('c4b', 'electricity');
    const pz = w('c4b', 'pizza');
    q(dc, 'pop', 0.6);
    q(fo, 'cash', 0.5);
    q(el, 'buzz', 0.6);
    q(pz, 'pop2', 0.5);
    const nm = [w('c4c', 'amazon'), w('c4c', 'alphabet'), w('c4c', 'microsoft'), w('c4c', 'meta')];
    const fo1 = w('c4c', 'four');
    const sx = w('c4d', 'six');
    const sv = w('c4d', 'seven');
    const ss = w('c4d', 'seventy');
    nm.forEach((x) => q(x, 'pop', 0.45));
    q(fo1, 'cash', 0.6);
    q(sv, 'cash', 0.8);
    q(ss, 'stamp', 0.7);
    const hh = w('c4e', 'household');
    const fv = w('c4e', 'five');
    q(hh, 'pop', 0.5);
    q(fv, 'coin', 0.7);
    const rv = w('c4f', 'rival');
    const fs = w('c4f', 'first');
    const dg = w('c4f', 'digging');
    q(rv, 'sting', 0.5);
    q(fs, 'ding', 0.5);
    q(dg, 'thud', 0.5);
    const names = ['AMAZON', 'ALPHABET', 'MICROSOFT', 'META'];
    scene(A('c4a'), () =>
      f < A('c4c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <DataCenter f={f} x={820} y={822} s={1.25 * P('c4a') * bump(dc, 0.06)} w={640} />
            <G2 x={820} y={220} s={P('c4a', 2)}><Pill x={0} y={0} text="costs a fortune" lit={L(fo)} size={42} color="#FFE3BF" /></G2>
            <Bolt x={320} y={480} s={1.1 * P('c4a', 3) * bump(el, 0.3)} color={f >= el ? C.yellow : '#E9E1CF'} />
            <Stick f={f} x={1560} y={822} s={1} acc={['cap']} seed={41} keys={[{at: 0, pose: 'hold', expr: 'happy', look: -0.8}, {at: pz, pose: 'celebrate', expr: 'grin', look: -0.8}]} />
            <Pizza x={1560} y={470} s={0.45 * P('c4a', 4) * bump(pz)} eaten={f >= pz ? ease(f, pz, pz + 40, 0, 0.6) : 0} />
            <G2 x={1560} y={330} s={P('c4a', 5)} o={0.45 + 0.55 * L(pz)}><Text size={36}>hungry teenager</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={110} s={P('c4c')}><Text size={52}>Big Tech spending on buildings & equipment</Text></G2>
            <line x1={200} y1={860} x2={1100} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={420} y={860} w={260} h={ease(f, fo1 - 4, fo1 + 14, 40, 330)} color={C.blue} label="2025" value={f >= fo1 ? '$410B' : '?'} />
            <Bar x={860} y={860} w={260} h={ease(f, sv - 4, sv + 14, 40, 580)} color={C.green} label="2026 plans" value={f >= sv ? '$725B' : '?'} />
            {names.map((n, i) => (
              <G2 key={n} x={1540} y={240 + i * 130} s={P('c4c', 2 + i)}>
                <Pill x={0} y={0} text={n} lit={L(nm[i])} size={44} w={420} />
              </G2>
            ))}
            <ValBox f={f} at={ss} x={1540} y={830} s={P('c4c', 7)} w={420} h={150} size={84} value="+77%" color={C.green} fill="#EAF7EF" />
            <SourceTag f={f} at={fo1} text="Company guidance after Q2 2026 earnings (Amazon ~$200B, Alphabet $175–185B, MSFT ~$145B, Meta $135–145B)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {[0, 1, 2, 3, 4].map((i) => (
              <G2 key={i} x={260 + i * 350} y={822} s={0.42 * P('c4e', i * 2)}>
                <House />
                <G2 y={-640} s={2.2 * bump(fv)}><PriceTag text={f >= fv ? '$5,500' : '?'} color={f >= fv ? C.green : '#CFC6B4'} /></G2>
              </G2>
            ))}
            <G2 x={960} y={130} s={P('c4e', 3) * bump(hh)}><Text size={52}>$725B ÷ every U.S. household</Text></G2>
            <SourceTag f={f} at={fv} text="$725B ÷ ~132M households (U.S. Census) ≈ $5,500" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {names.map((n, i) => (
              <G2 key={n} x={250 + i * 330} y={880} s={P('c4f', i * 2)}>
                <Stick f={f + i * 7} x={0} y={0} s={0.85} seed={50 + i} acc={[['cap'], ['glasses'], ['tie'], ['ponytail']][i] as StickProps['acc']} keys={[{at: 0, pose: 'carry', expr: 'worried', look: 0.8}, {at: rv, pose: 'carry', expr: 'shock', look: i % 2 ? -0.8 : 0.8}]} sweat={f >= rv} />
                <Chip y={-420} s={0.5} label={n.length > 6 ? n.slice(0, 5) : n} />
              </G2>
            ))}
            <G2 x={1680} y={560} s={P('c4f', 6) * bump(fs)}>
              <line x1={0} y1={320} x2={0} y2={-120} stroke={C.ink} strokeWidth={10} />
              <rect x={0} y={-120} width={200} height={120} fill={f >= fs ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text x={100} y={-60} size={36}>BEST AI</Text>
            </G2>
            <G2 x={760} y={200} s={P('c4f', 4)} o={0.45 + 0.55 * L(dg)}><Box w={1000} h={130} fill={f >= dg ? C.yellow : '#fff'} /><Text size={46}>nobody wants to stop digging</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 OpenAI ============
  {
    const cg = w('c5a', 'chatgpt');
    const nv = w('c5b', 'november');
    const tr = w('c5b', 'trillion');
    const ey = w('c5b', 'eight');
    q(cg, 'pop', 0.6);
    q(nv, 'flip', 0.5);
    q(tr, 'thud', 0.8);
    q(ey, 'stamp', 0.6);
    const fr = w('c5c', 'forty');
    const db = w('c5c', 'doubled');
    q(fr, 'cash', 0.7);
    q(db, 'boing', 0.6);
    const oh = w('c5d', 'hundred');
    q(oh, 'cash', 0.7);
    const ft = w('c5e', 'forty');
    const sg = w('c5e', 'signing');
    const oh2 = w('c5e', 'hundred');
    const ey2 = w('c5e', 'eight');
    q(ft, 'coin', 0.6);
    q(sg, 'scribble', 0.7);
    q(oh2, 'thud', 0.7);
    q(ey2, 'stamp', 0.6);
    const sal = w('c5f', 'salary');
    const ls = w('c5f', 'losses');
    const pf = w('c5f', 'profits');
    q(sal, 'boing', 0.5);
    q(ls, 'buzz', 0.5);
    q(pf, 'ding', 0.6);
    const gn = w('c5g', 'genius');
    const hr = w('c5g', 'hurt');
    q(gn, 'chime', 0.5);
    q(hr, 'thud', 0.6);
    const tilt = f < gn ? 0 : f < w('c5g', 'doesnt') ? ease(f, gn, gn + 15, 0, -10) : ease(f, hr - 10, hr + 10, -10, 12);
    scene(A('c5a'), () =>
      f < A('c5c') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Bank x={420} y={822} s={0.75 * P('c5a') * bump(cg, 0.06)} label="OPENAI" />
            <G2 x={420} y={300} s={P('c5a', 2)}><Text size={40}>makes ChatGPT</Text></G2>
            <Stick f={f} x={850} y={822} s={1} acc={['glasses']} seed={71} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
            <G2 x={850} y={420} s={P('c5a', 3)} o={0.45 + 0.55 * L(nv)}><Text size={34}>boss: Sam Altman</Text></G2>
            <G2 x={1400} y={520} s={P('c5a', 4)}><Contract lines={['data centers', 'chips', 'power']} signed={ease(f, nv, tr, 0, 1)} /></G2>
            <ValBox f={f} at={tr} x={1400} y={170} s={P('c5a', 5)} w={620} h={150} size={80} value="$1.4 TRILLION" color={C.red} fill="#FDEBEF" />
            <G2 x={1720} y={800} s={P('c5a', 6) * bump(ey)}><Calendar s={0.5} top="OVER" year={f >= ey ? '~8 yrs' : '?'} flip={0} /></G2>
            <SourceTag f={f} at={tr} text="TechCrunch, Nov 6, 2025 (Sam Altman)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={660} y={110} s={P('c5c')}><Text size={52}>OpenAI revenue (per year)</Text></G2>
            <line x1={200} y1={860} x2={1100} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={420} y={860} w={260} h={ease(f, A('c5c'), A('c5c') + 20, 40, 260)} color={C.blue} label="end of 2025" value="$20B" />
            <Bar x={860} y={860} w={260} h={ease(f, fr - 4, fr + 14, 60, 520)} color={C.green} label="Aug 2026" value={f >= fr ? '$40B' : '?'} />
            <G2 x={1500} y={450} s={P('c5c', 3) * bump(db, 0.25)}>
              <Box w={520} h={220} fill={f >= db ? C.yellow : '#fff'} />
              <Text y={-30} size={80} color={f >= db ? C.green : '#B9B0A0'}>x2</Text>
              <Text y={60} size={38}>in about 8 months</Text>
            </G2>
            <SourceTag f={f} at={fr} text="Bloomberg, Aug 13, 2026: annualized revenue tops $40B" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={P('c5d')}><Text size={54}>$1.4 trillion ÷ 8 years</Text></G2>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <G2 key={i} x={260 + i * 200} y={480} s={P('c5d', i)}>
                <rect x={-85} y={-150} width={170} height={300} rx={14} fill={f >= oh ? C.red : '#F1ECE2'} stroke={C.ink} strokeWidth={5} opacity={f >= oh ? 0.85 : 1} />
                <Text y={-100} size={30} color={f >= oh ? '#fff' : '#5B6470'}>YEAR {i + 1}</Text>
                <Text y={20} size={f >= oh ? 44 : 70} color={f >= oh ? '#fff' : '#B9B0A0'}>{f >= oh ? '$175B' : '?'}</Text>
              </G2>
            ))}
            <G2 x={960} y={800} s={P('c5d', 6)} o={0.45 + 0.55 * L(oh)}><Text size={60} color={C.red}>≈ $175 billion every year</Text></G2>
            <Dave f={f} x={1760} y={1000} s={0.55} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}]} />
            <SourceTag f={f} at={oh} text="$1.4T ÷ 8 ≈ $175B per year" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Dave f={f} x={960} y={900} s={1.1 * P('c5e')} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: oh2, pose: 'shock', expr: 'shock'}]} sweat={f >= oh2} />
            <G2 x={430} y={420} s={0.8 * P('c5e', 2) * bump(ft)}><Paycheck amount={f >= ft ? '$40,000/yr' : '$ ? /yr'} /></G2>
            <Text x={430} y={620} size={44} color={C.green}>Dave earns</Text>
            <G2 x={1500} y={480} s={0.8 * P('c5e', 4) * bump(oh2, 0.08)}><Contract lines={[f >= oh2 ? '$175,000 / year' : '$ ? / year', f >= ey2 ? 'for 8 years' : 'for ? years']} signed={ease(f, sg, sg + 25)} /></G2>
            <Text x={1500} y={760} size={44} color={C.red}>Dave promises</Text>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={300} y={900} s={1} keys={[{at: 0, pose: 'point_up', expr: 'grin', look: 0.8}, {at: ls, pose: 'think', expr: 'worried', look: 0.8}]} />
            <G2 x={300} y={390} s={P('c5f') * bump(sal)}><Bubble text="my salary will grow!" size={36} tail="down" /></G2>
            <G2 x={1150} y={180} s={P('c5f', 2)}><Text size={46}>OpenAI's own forecast</Text></G2>
            <line x1={640} y1={540} x2={1760} y2={540} stroke={C.ink} strokeWidth={5} />
            {['2026', '2027', '2028', '2029', '2030'].map((y, i) => {
              const last = i === 4;
              const lit = last ? L(pf) : L(ls);
              return (
                <G2 key={y} x={740 + i * 240} y={540} s={P('c5f', 3 + i)}>
                  <rect x={-80} y={last ? -200 : 0} width={160} height={last ? 200 : 110 + i * 50} rx={10} fill={lit ? (last ? C.green : C.red) : '#E9E1CF'} stroke={C.ink} strokeWidth={5} />
                  <Text y={last ? -240 : 160 + i * 50} size={30} color={lit ? C.ink : '#9C9383'}>{last ? 'PROFIT?' : 'LOSS'}</Text>
                  <Text y={last ? 40 : -30} size={30}>{y}</Text>
                </G2>
              );
            })}
            <SourceTag f={f} at={ls} text="Fortune, Nov 12, 2025: losses through 2028, profit targeted ~2030" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={900} s={1.1 * P('c5g')} tilt={tilt} left="it works" right="it doesn't" />
            <G2 x={560} y={330} s={P('c5g', 2) * bump(gn)} o={0.45 + 0.55 * L(gn)}><Text size={60} color={C.green}>GENIUS</Text></G2>
            {[0, 1, 2].map((i) => (
              <Stick key={i} f={f} x={1420 + i * 150} y={560} s={0.6 * P('c5g', 3 + i)} acc={[['tie'], ['glasses'], ['cap']][i] as StickProps['acc']} seed={80 + i} keys={[{at: 0, pose: 'idle', expr: 'neutral'}, {at: hr, pose: 'panic', expr: 'shock'}]} sweat={f >= hr} />
            ))}
            <G2 x={1570} y={160} s={P('c5g', 5) * bump(hr)} o={0.45 + 0.55 * L(hr)}><Text size={48} color={C.red}>partners get hurt</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Circular money ============
  {
    const cm = w('c6a', 'circular');
    q(cm, 'whoosh', 0.6);
    const nvd = w('c6b', 'nvidia');
    const inv = w('c6b', 'invest');
    const hb = w('c6b', 'hundred');
    const th = w('c6b', 'thirty');
    q(nvd, 'pop', 0.5);
    q(inv, 'cash', 0.6);
    q(hb, 'ding', 0.5);
    q(th, 'stamp', 0.6);
    const rent = w('c6c', 'rent');
    const buy = w('c6c', 'buy');
    const nv2 = w('c6c', 'nvidia');
    q(rent, 'coin', 0.6);
    q(buy, 'coin', 0.6);
    q(nv2, 'ding', 0.7);
    const gv = w('c6d', 'gives');
    const bb = w('c6d', 'buys');
    const amz = w('c6e', 'amazing');
    const own = w('c6e', 'own');
    q(gv, 'cash', 0.6);
    q(bb, 'coin', 0.7);
    q(amz, 'crowd', 0.5);
    q(own, 'sting', 0.6);
    const dk = w('c6f', 'duck');
    const nt = w('c6f', 'nothing');
    const qt = w('c6f', 'quite');
    const dm = w('c6f', 'demand');
    q(dk, 'quack', 0.8);
    q(qt, 'buzz', 0.4);
    q(dm, 'pop', 0.5);
    const bo = w('c6g', 'borrowed');
    const rc = w('c6g', 'raccoon');
    const pd = w('c6g', 'paid');
    q(bo, 'click', 0.5);
    q(rc, 'boing', 0.6);
    q(pd, 'coin', 0.7);
    const fa = w('c6h', 'fair');
    const sh = w('c6h', 'shares');
    const cu = w('c6h', 'customers');
    const bg = w('c6h', 'big');
    q(fa, 'pop', 0.5);
    q(sh, 'paper', 0.6);
    q(cu, 'pop', 0.5);
    q(bg, 'ding', 0.5);
    const lit0 = L(inv), lit1 = L(rent), lit2 = L(buy);
    const coinT = f < inv ? -1 : f < rent ? ease(f, inv, inv + 25, 0, 1 / 3) : f < buy ? ease(f, rent, rent + 25, 1 / 3, 2 / 3) : ease(f, buy, buy + 25, 2 / 3, 1) + (f > buy + 30 ? ((f - buy - 30) / 60) % 1 : 0);
    const cash = f < gv ? 0 : f < bb ? ease(f, gv, gv + 20, 0, 0.5) : ease(f, bb, bb + 20, 0.5, 1);
    scene(A('c6a'), () =>
      f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Loop f={f} x={820} y={540} s={P('c6a')} rad={330} nodes={[<Chip key="a" s={0.8 * bump(nvd)} label="NVIDIA" glow={L(nv2) * (f < nv2 + 30 ? 1 : 0.4)} />, <Bank key="b" s={0.38} y={80} label="OPENAI" />, <DataCenter key="c" f={f} s={0.5} y={110} label="CLOUD" />]} labels={['invests', 'rents computers', 'buys chips']} lit={[lit0, lit1, lit2]} coin={coinT} />
            <G2 x={1620} y={330} s={P('c6a', 4)}>
              <Box w={440} h={260} fill={f >= th ? '#FFF7E6' : '#fff'} />
              <Text y={-80} size={34} color="#5B6470">Nvidia → OpenAI</Text>
              <Text y={-10} size={50} color={f >= hb ? C.ink : '#B9B0A0'}>{f >= hb ? 'up to $100B' : '?'}</Text>
              {f >= th && <line x1={-150} y1={-10} x2={150} y2={-10} stroke={C.red} strokeWidth={8} />}
              <Text y={70} size={54} color={f >= th ? C.green : '#B9B0A0'}>{f >= th ? '≈ $30B' : ''}</Text>
            </G2>
            <G2 x={1620} y={740} s={P('c6a', 6) * bump(cm)}><Text size={60} color={C.red}>CIRCULAR MONEY</Text></G2>
            <SourceTag f={f} at={hb} text="Nvidia LOI Sept 22, 2025 · ~$30B in OpenAI round (Bloomberg 2026)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6f') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Stand x={560} y={822} s={1.1 * P('c6d')} big />
            <Dave f={f} x={560} y={822} s={0.8} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.8}, {at: amz, pose: 'celebrate', expr: 'grin', look: 0.8}, {at: own, pose: 'facepalm', expr: 'worried', look: 0.8}]} />
            <Bob f={f} x={1200} y={822} s={1 * P('c6d', 2)} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: gv, pose: 'hold', expr: 'grin', look: -0.8}]} walk={f >= bb && f < bb + 20} />
            <G2 x={f < bb ? lin(cash, 0, 0.5, 700, 1150) : lin(cash, 0.5, 1, 1150, 680)} y={lin(Math.abs(cash - 0.5), 0.5, 0, 560, 440)} s={P('c6d', 3)}><Bill s={0.8} /><Text y={70} size={30}>$100</Text></G2>
            <G2 x={1600} y={380} s={P('c6d', 4) * bump(amz, 0.25)}>
              <Box w={440} h={200} fill={f >= amz ? C.yellow : '#fff'} />
              <Text y={-45} size={36} color="#5B6470">DAVE'S SALES</Text>
              <Text y={30} size={80} color={f >= bb ? C.green : '#B9B0A0'}>{f >= bb ? '$100!' : '$0'}</Text>
            </G2>
            <G2 x={960} y={200} s={P('c6d', 6)} o={0.4 + 0.6 * L(own)}><Box w={800} h={120} fill={f >= own ? '#FDEBEF' : '#fff'} /><Text size={46} color={C.red}>...it was his OWN money</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={480} y={560} s={P('c6f') * bump(dk)}><Duck f={f} s={1.3} /></G2>
            <G2 x={480} y={250} s={P('c6f', 2)}><Text size={40}>banks: money from nothing</Text></G2>
            {f >= qt && <XMark x={480} y={560} s={0.9 * pop(f, qt)} />}
            <G2 x={1350} y={560} s={P('c6f', 3) * bump(dm)}>
              <Stand s={0.7} />
              <Magnifier x={120} y={-120} s={1.4} />
            </G2>
            <G2 x={1350} y={250} s={P('c6f', 4)} o={0.45 + 0.55 * L(dm)}><Text size={44} color={C.red}>makes demand look bigger</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Loop f={f} x={640} y={540} s={0.75 * P('c6g')} rad={300} nodes={[<Chip key="a" s={0.7} label="NVIDIA" />, <Bank key="b" s={0.35} y={80} label="OPENAI" />, <DataCenter key="c" f={f} s={0.45} y={100} label="CLOUD" />]} labels={['$', '$', '$']} lit={[1, 1, 1]} coin={((f - A('c6g')) / 60) % 1} />
            <G2 x={140} y={300} s={P('c6g', 2) * bump(bo)}><MoneyMachine f={f} s={0.7} /></G2>
            <Raccoon f={f} x={1450} y={820} s={1.3 * P('c6g', 3) * bump(rc, 0.1)} mood={f >= rc ? 'greedy' : 'sneaky'} holdCoin={f >= pd} grab={f >= pd ? ease(f, pd, pd + 12) : 0} />
            <G2 x={1450} y={280} s={P('c6g', 4)}><Box w={520} h={150} fill={f >= pd ? C.yellow : '#fff'} /><Text y={-20} size={56}>INTEREST</Text><Text y={40} size={32} color="#5B6470">due, AI or no AI</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c6h')}><Text size={54}>to be fair...</Text></G2>
            <Chip x={330} y={480} s={0.9 * P('c6h', 2)} label="NVIDIA" />
            <G2 x={640} y={480} s={P('c6h', 3) * bump(sh)} o={0.45 + 0.55 * L(sh)}><Share n="SHARES" owner="OPENAI" color={C.blue} /></G2>
            <G2 x={500} y={800} s={P('c6h', 4)}><Pill x={0} y={0} text="not a scam" lit={L(fa)} size={42} color="#EAF7EF" /></G2>
            <G2 x={1400} y={480} s={P('c6h', 5)}>
              {[0, 1, 2, 3, 4, 5].map((i) => <Person key={i} x={-250 + i * 100} y={60} s={0.9} c={f >= cu ? [C.blue, C.red, C.green, C.gold, C.navy, C.blue][i] : '#CFC6B4'} />)}
              <Text y={-180} size={46}>real customers at the end</Text>
            </G2>
            <G2 x={1400} y={820} s={P('c6h', 6) * bump(bg, 0.25)}><Text size={120} color={f >= bg ? C.red : '#B9B0A0'}>big enough?</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Bull vs bear ============
  {
    const bt = w('c7a', 'both');
    q(bt, 'pop', 0.5);
    const fk = w('c7b', 'fake');
    const np = w('c7b', 'nope');
    const rl = w('c7b', 'real');
    const hi = w('c7b', 'high');
    q(fk, 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(rl, 'ding', 0.5);
    q(hi, 'ding', 0.5);
    const bl = w('c7c', 'bull');
    const pr = w('c7c', 'profits');
    const pw = w('c7c', 'powell');
    const er = w('c7c', 'earnings');
    const fs = w('c7d', 'faster');
    const ec = w('c7d', 'economy');
    q(bl, 'boing', 0.6);
    q(pr, 'cash', 0.6);
    q(pw, 'pop', 0.5);
    q(er, 'ding', 0.6);
    q(fs, 'whoosh_s', 0.5);
    q(ec, 'chime', 0.5);
    const br = w('c7e', 'bear');
    const ni = w('c7e', 'ninety');
    const dbt = w('c7f', 'debt');
    const tr = w('c7f', 'trillion');
    const dm = w('c7g', 'dimon');
    const cr = w('c7g', 'cars');
    const tv = w('c7g', 'tvs');
    const dw = w('c7g', 'well');
    q(br, 'thud', 0.6);
    q(ni, 'stamp', 0.6);
    q(dbt, 'sting', 0.5);
    q(tr, 'thud', 0.6);
    q(dm, 'pop', 0.5);
    q(cr, 'pop2', 0.5);
    q(tv, 'pop2', 0.5);
    q(dw, 'trombone', 0.4);
    const dis = w('c7h', 'disagree');
    const nm = w('c7h', 'numbers');
    q(dis, 'stamp', 0.7);
    q(nm, 'ding', 0.5);
    const bearPanels = [ni, dbt, dm];
    scene(A('c7a'), () =>
      f < A('c7b') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bull x={420} y={480} s={1.2 * P('c7a')} />
            <Bear x={1500} y={480} s={1.2 * P('c7a', 3)} />
            <Text x={420} y={760} size={56} color={C.green}>BULL case</Text>
            <Text x={1500} y={760} size={56} color={C.red}>BEAR case</Text>
            <Text x={960} y={480} size={90} color="#5B6470">vs</Text>
            <Dave f={f} x={960} y={1000} s={0.7} keys={[{at: 0, pose: 'shrug', expr: 'think'}, {at: bt, pose: 'present', expr: 'happy'}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7c') ? (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            <G2 x={700} y={420} s={P('c7b')}><Globe f={f} s={1} /></G2>
            <G2 x={700} y={740} s={P('c7b', 2)}><Text size={52}>"bubble = fake tech"</Text></G2>
            {f >= np && <Stamp x={700} y={420} s={pop(f, np, 9, 260)} text="NOPE" size={100} color={C.red} r={-8} />}
            <G2 x={1400} y={380} s={P('c7b', 3) * bump(rl)}><Pill x={0} y={0} text="tech: REAL" lit={L(rl)} size={50} color="#EAF7EF" /></G2>
            <G2 x={1400} y={560} s={P('c7b', 4) * bump(hi)}><Pill x={0} y={0} text="prices: too high" lit={L(hi)} size={50} color="#FDEBEF" /></G2>
          </Svg>
          <DreamFrame label="WHAT MOST PEOPLE THINK" />
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bull x={180} y={220} s={0.6 * P('c7c') * bump(bl)} />
            <Text x={560} y={180} size={60} color={C.green}>THE BULL CASE</Text>
            {[
              {at: pr, lab: 'huge profits already', el: <MoneyStack n={6} s={0.9} y={20} />},
              {at: pw, lab: '"they actually have earnings"', el: <Stick f={f} x={0} y={150} s={0.7} acc={['glasses', 'tie']} seed={90} keys={[{at: 0, pose: 'talk', expr: 'neutral'}]} />},
              {at: fs, lab: 'faster workers, bigger economy', el: <Monitor s={0.55} y={60} title="WORK" value={f >= ec ? '2x' : '1x'} valueColor={C.green} />},
            ].map((p, i) => (
              <G2 key={i} x={330 + i * 630} y={620} s={P('c7c', 2 + i * 2) * bump(p.at, 0.08)} o={0.45 + 0.55 * L(p.at)}>
                <Frame w={560} h={500} label={p.lab}>{p.el}</Frame>
                {i === 1 && <Text y={-280} size={32} color="#5B6470">Fed Chair Jerome Powell</Text>}
                {f >= p.at + 10 && <Check x={220} y={-200} />}
              </G2>
            ))}
            <SourceTag f={f} at={pw} text="Powell, FOMC press conference, Oct 29, 2025" until={fs} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7h') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Bear x={180} y={220} s={0.55 * P('c7e') * bump(br)} />
            <Text x={560} y={180} size={60} color={C.red}>THE BEAR CASE</Text>
            {[
              {lab: '90% of firms: no impact yet', el: <SlicePie s={0.8} y={-20} rad={150} t={1} slices={[{v: 0.9, c: '#9AA5B1'}, {v: 0.1, c: C.green}]} pop={0} />},
              {lab: f >= tr ? 'data center debt: $1T+ by 2028' : 'data center debt: ?', el: <MoneyMachine f={f} s={0.8} y={0} />},
              {lab: 'Dimon: some money lost', el: <g><Car x={-110} y={0} s={0.9} /><Tv x={120} y={0} s={0.8} /></g>},
            ].map((p, i) => (
              <G2 key={i} x={330 + i * 630} y={620} s={P('c7e', 2 + i * 2) * bump(bearPanels[i], 0.08)} o={0.45 + 0.55 * L(bearPanels[i])}>
                <Frame w={580} h={500} label={p.lab}>{p.el}</Frame>
                {i === 2 && f >= dw && <XMark x={0} y={-10} s={0.5} />}
              </G2>
            ))}
            <SourceTag f={f} at={ni} text="NBER w34836 (Feb 2026) · Morgan Stanley (2025) · Dimon, BBC Oct 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Scale x={960} y={760} s={P('c7h')} tilt={Math.sin(f / 20) * 4} left="bulls" right="bears" />
            <Bull x={660} y={560} s={0.45 * P('c7h', 2)} />
            <Bear x={1260} y={560} s={0.45 * P('c7h', 3)} />
            <G2 x={960} y={170} s={P('c7h', 4) * bump(dis, 0.2)} o={0.45 + 0.55 * L(dis)}><Stamp text="SMART PEOPLE DISAGREE" size={60} color={C.blue} /></G2>
            <G2 x={960} y={950} s={P('c7h', 5)} o={0.45 + 0.55 * L(nm)}><Text size={44}>now you know the numbers</Text></G2>
            <Dave f={f} x={1700} y={940} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.8}, {at: nm, pose: 'thumbs', expr: 'grin', look: -0.8}]} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 If it pops ============
  {
    const rt = w('c8b', 'retirement');
    const fv = w('c8b', 'five');
    const th = w('c8b', 'thirty');
    q(rt, 'pop', 0.5);
    q(fv, 'pop', 0.5);
    q(th, 'stamp', 0.7);
    const nv = w('c8c', 'never');
    const ow = w('c8c', 'owns');
    q(nv, 'buzz', 0.4);
    q(ow, 'ding', 0.6);
    const jb = w('c8d', 'jobs');
    const cw = w('c8d', 'construction');
    const el = w('c8d', 'electricians');
    const en = w('c8d', 'engineers');
    const st = w('c8d', 'stops');
    q(jb, 'pop', 0.5);
    [cw, el, en].forEach((x) => q(x, 'pop2', 0.45));
    q(st, 'thud', 0.6);
    const sk = w('c8e', 'korea');
    const cr = w('c8e', 'crashed');
    const fo = w('c8e', 'forty');
    q(sk, 'pop', 0.5);
    q(cr, 'whoosh', 0.7);
    q(fo, 'stamp', 0.8);
    const fi = w('c8f', 'fifteen');
    q(fi, 'ding', 0.6);
    const ty = w('c8g', 'tyler');
    const eg = w('c8g', 'eggs');
    const sh = w('c8g', 'shiny');
    q(ty, 'pop', 0.5);
    q(eg, 'pop2', 0.5);
    q(sh, 'chime', 0.5);
    scene(A('c8a'), () =>
      f < A('c8d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110} s={P('c8a')}><Text size={54}>if it pops: your retirement</Text></G2>
            <SlicePie x={560} y={540} s={P('c8a', 2) * bump(th, 0.08)} rad={280} t={1} slices={[{v: 0.3, c: f >= th ? C.red : '#E9A0B0', l: f >= th ? 'TOP 5: 30%' : 'TOP 5: ?'}, {v: 0.7, c: '#CFE0F0', l: 'other 495'}]} pop={f >= fv ? 1 : 0} />
            <Text x={560} y={880} size={40} color="#5B6470">S&P 500</Text>
            <G2 x={1450} y={580} s={P('c8a', 4) * bump(rt)}><Jar level={0.65} label="RETIREMENT" s={1.1} /></G2>
            <G2 x={1450} y={190} s={P('c8a', 6) * bump(ow)} o={0.4 + 0.6 * L(ow)}><Box w={620} h={120} fill={f >= ow ? C.yellow : '#fff'} /><Text size={44}>owns a lot of them too</Text></G2>
            {f >= ow && <path d={`M 860 520 Q 1030 ${440} 1250 520`} fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" markerEnd="" />}
            <SourceTag f={f} at={th} text="Top 5 ≈ 30% of S&P 500, late 2025 (IMF/BoE warnings, Oct 2025)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8e') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <DataCenter f={f} x={1350} y={822} s={1.1 * P('c8d')} w={640} on={f < st} label={f >= st ? 'PAUSED' : 'DATA CENTER'} />
            {['construction', 'electrician', 'engineer'].map((j, i) => (
              <G2 key={j} x={260 + i * 260} y={822} s={P('c8d', 2 + i)}>
                <Stick f={f + i * 5} x={0} y={0} s={0.95} acc={[['cap'], ['glasses'], ['ponytail']][i] as StickProps['acc']} seed={60 + i} keys={[{at: 0, pose: 'carry', expr: 'happy'}, {at: st, pose: 'shrug', expr: 'sad'}]} />
                <G2 y={-400}><Pill x={0} y={0} text={j} lit={L([cw, el, en][i])} size={30} /></G2>
              </G2>
            ))}
            <G2 x={960} y={140} s={P('c8d', 5) * bump(jb)}><Text size={60}>jobs</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            {f < A('c8f') ? (
              <g>
                <G2 x={700} y={110} s={P('c8e')}><Text size={52}>South Korea's main index, summer 2026</Text></G2>
                <LineChart x={700} y={520} w={1100} h={500} t={f < cr ? ease(f, A('c8e'), cr, 0.3, 0.6) : ease(f, cr, cr + 30, 0.6, 1)} pts={[40, 55, 70, 85, 100, 80, 62, 56]} lo={0} hi={110} color={C.red} />
                <ValBox f={f} at={fo} x={1600} y={380} s={P('c8e', 3)} w={420} h={200} size={90} value="-40%+" label="in ~6 weeks" color={C.red} fill="#FDEBEF" />
                <G2 x={1600} y={700} s={P('c8e', 5) * bump(cr)}><Chip s={0.8} label="CHIPS" glow={L(cr)} /></G2>
                <SourceTag f={f} at={fo} text="Reuters & Economic Times, July 29, 2026 (KOSPI)" />
              </g>
            ) : (
              <g>
                <G2 x={700} y={110} s={P('c8f')}><Text size={52}>Nasdaq after the dot-com crash</Text></G2>
                <LineChart x={700} y={520} w={1100} h={500} t={ease(f, A('c8f'), fi + 20, 0.4, 1)} pts={[5048, 1114, 2000, 2600, 1500, 2600, 3000, 4000, 5050]} lo={0} hi={5400} color={C.blue} />
                <line x1={150} y1={330} x2={1250} y2={330} stroke={C.green} strokeWidth={6} strokeDasharray="20 14" />
                <ValBox f={f} at={fi} x={1600} y={420} s={P('c8f', 3)} w={420} h={200} size={80} value="15 YEARS" label="2000 → 2015" color={C.blue} fill="#E3F1F4" />
                <SourceTag f={f} at={fi} text="Nasdaq regained its 2000 high on April 23, 2015" />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Tyler f={f} x={600} y={900} s={1.2 * P('c8g') * bump(ty, 0.05)} keys={[{at: 0, pose: 'hold', expr: 'worried'}, {at: sh, pose: 'shrug', expr: 'sad'}]} sweat />
            <G2 x={1250} y={640} s={1.1 * P('c8g', 2) * bump(eg, 0.1)}><Basket eggs={5} label="AI" shine={f >= sh ? f / 5 : 0} /></G2>
            <G2 x={600} y={300} s={P('c8g', 3)}><Stamp text="NO JOB" size={60} color={C.red} r={-6} /></G2>
            <G2 x={1250} y={300} s={P('c8g', 4)} o={0.45 + 0.55 * L(eg)}><Text size={48}>all eggs, one basket</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 What Dave tells Tyler ============
  {
    const hs = [bs('c9b'), bs('c9c'), bs('c9d'), bs('c9e'), bs('c9f')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const dv = w('c9c', 'diversification');
    q(dv, 'stamp', 0.6);
    const kv = w('c9f', 'kevin');
    q(kv, 'boing', 0.5);
    const bk = w('c9g', 'back');
    const mn = w('c9g', 'monday');
    q(bk, 'pop', 0.5);
    q(mn, 'chime', 0.6);
    const items = ["Don't quit your paycheck for a bet", 'Diversify: many baskets', 'Keep an emergency fund', "Only money you won't need for years", "Buying 'cause everyone is? Careful"];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c9a'), () =>
      f < A('c9g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={100} s={P('c9a')}><Text size={56}>What Dave tells Tyler</Text></G2>
            <G2 x={1560} y={100} s={P('c9a', 2)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {items.map((it, i) => <Row key={i} x={90} y={240 + i * 140} s={0.85 * P('c9a', 2 + i)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : cur > i + 1 ? 0.7 : 0.35} color={C.blue} w={1100} />)}
            {cur === 0 && <Dave f={f} x={1450} y={900} s={1} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.8}]} />}
            {cur === 0 && <Tyler f={f} x={1720} y={900} s={1} keys={[{at: 0, pose: 'idle', expr: 'sad', look: -0.8}]} />}
            {cur === 1 && <G2 x={1600} y={520} s={pop(f, hs[0])}><Paycheck s={0.55} amount="$ PAYCHECK" /><G2 y={260}><MoneyMachine f={f} s={0.6} /></G2></G2>}
            {cur === 2 && <G2 x={1600} y={560} s={pop(f, hs[1])}>{[0, 1, 2].map((i) => <Basket key={i} x={(i - 1) * 170} y={(i % 2) * 150} s={0.45} eggs={2} />)}{f >= dv && <Text y={300} size={40} color={C.green}>diversification</Text>}</G2>}
            {cur === 3 && <G2 x={1600} y={560} s={pop(f, hs[2])}><Jar level={0.7} label="EMERGENCY" /></G2>}
            {cur === 4 && <G2 x={1600} y={520} s={pop(f, hs[3])}><Calendar s={0.8} top="LEAVE IT FOR" year="YEARS" flip={0} /></G2>}
            {cur === 5 && <G2 x={1600} y={520} s={pop(f, hs[4])}><Kevin f={f} x={0} y={300} s={1} keys={[{at: 0, pose: 'facepalm', expr: 'sad'}]} /><Text y={-140} size={36}>cousin Kevin (ep 20)</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Interior />
          <Svg>
            <Bank x={1400} y={900} s={0.6 * P('c9g')} label="OFFICE" />
            <Tyler f={f} x={700} y={900} s={1.2 * P('c9g', 2)} keys={[{at: 0, pose: 'present', expr: 'worried', look: 0.8}, {at: mn, pose: 'celebrate', expr: 'grin', look: 0.8}]} />
            <G2 x={700} y={400} s={P('c9g', 3) * bump(bk)}><Bubble text="Can I have my job back?" size={38} tail="down" /></G2>
            <G2 x={1400} y={250} s={P('c9g', 4) * bump(mn)}><Calendar s={0.6} top={f >= mn ? 'STARTS' : 'NEXT'} year="MONDAY" flip={0} /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ Recap ============
  const recap = ['Bubble: price far above real value', '~$725B of AI spending, some in a circle', 'If it pops: 401(k)s & jobs. Diversify.'];
  {
    const r = [bs('d1b'), bs('d1c'), bs('d1d')];
    q(A('d1a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('d1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={P('d1a')}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={260} y={380 + i * 170} s={P('d1a', 2 + i * 2)} n={i + 1} text={b} lit={f >= r[i] ? 1 : 0.35} color={C.blue} w={1400} />)}
          <SoapBubble f={f} x={1760} y={200} s={0.4 * P('d1a', 4)} rad={200} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ Teaser + subscribe ============
  {
    const cr = w('d2a', 'car');
    const ft = w('d2a', 'fifty');
    const br = w('d2a', 'breaking');
    const sb = w('d2b', 'subscribe');
    const rc = w('d2b', 'raccoon');
    const fr = w('d2b', 'free');
    q(cr, 'pop', 0.6);
    q(ft, 'cash', 0.7);
    q(br, 'thud', 0.7);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(rc, 'boing', 0.5);
    q(fr, 'ding', 0.5);
    scene(A('d2a'), () =>
      f < A('d2b') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <G2 x={960} y={120} s={P('d2a')}><Text size={60} color="#5B6470">NEXT TIME</Text></G2>
            <G2 x={1050} y={760} s={2.6 * P('d2a', 2) * bump(cr, 0.05)}><Car /></G2>
            <G2 x={1450} y={360} s={1.8 * P('d2a', 4) * bump(ft)}><PriceTag text={f >= ft ? '$50,000' : '$ ?'} color={f >= ft ? C.red : '#CFC6B4'} /></G2>
            <Dave f={f} x={360} y={822} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.8}, {at: ft, pose: 'shock', expr: 'shock', look: 0.8}]} sweat={f >= br} />
            <SourceTag f={f} at={ft} text="Kelley Blue Book: avg new-car price above $50,000" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, A('d2b'))} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, A('d2b') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Raccoon f={f} x={1550} y={880} s={0.9 * pop(f, A('d2b') + 6)} mood={f >= rc ? 'wink' : 'sneaky'} />
            <G2 x={960} y={680} s={pop(f, A('d2b') + 8)} o={0.45 + 0.55 * L(fr)}><Text size={46} color={C.green}>bubble or no bubble: free</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5e', 'years') + 15;
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
