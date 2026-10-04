import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Clock, MoneyStack, Pencil, Stamp, Text, XMark} from '../props';
import {Bell, Phone, SubButton} from '../props2';
import {Raccoon, SourceCard} from '../props3';
import {BannerAd, DollarRule, DragonEgg, EnergyBar, GamePhone, GemDisplay, GemPack, GiftCard, PullCard, ScreenTimeIcon, SeasonPass} from '../props54';
import {DamageMeter} from '../props53';
import {Apple} from '../props25';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const GRAY = '#5B6470';
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const Ep54: React.FC = () => {
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

  // ============ HOOK ============
  const o1Scene = (ff: number) => {
    const am = w('o1', 'a');
    const tap = w('o1', 'tap');
    const free = w('o1', 'free');
    return (
      <AbsoluteFill>
        <Board />
        <Cam f={ff} keys={[[0, 1.15, 960, 540], [tap, 1.0, 960, 540]]}>
          <Svg>
            <Clock f={ff} x={280} y={240} s={0.85 * bump(am, 0.1)} h={2} m={0} />
            <GamePhone f={ff} x={960} y={560} s={1.3} screen={
              <>
                <rect x={-160} y={-294} width={320} height={588} rx={30} fill="#1D3557" />
                <rect x={-120} y={-200} width={240} height={160} rx={20} fill={ff >= tap ? C.red : C.green} stroke={C.ink} strokeWidth={4} />
                <Text y={-120} size={ff >= tap ? 60 : 50} color="#fff">{ff >= tap ? '$99.99' : 'BUY GEMS'}</Text>
                <Text y={40} size={28} color="#C9D6E6">8080 + bonus</Text>
              </>
            } glow={ff >= tap ? 0.8 : 0} />
            <Dave f={ff} x={1500} y={920} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'tired', look: -0.6}, {at: tap, pose: 'shock', expr: 'shock', look: -0.6}]} sweat />
            <G2 x={1500} y={340} s={bump(free, 0.18)}><Stamp text="FREE GAME" color={ff >= free ? C.red : C.ink} size={60} r={-6} /></G2>
          </Svg>
        </Cam>
      </AbsoluteFill>
    );
  };
  {
    q(2, 'tick', 0.4);
    q(w('o1', 'tap'), 'click', 0.6);
    q(w('o1', 'free'), 'stamp', 0.6);
    scene(0, () => o1Scene(f), false);
  }
  const FR = A('o2');
  const RW = w('o2', 'rewind');
  {
    q(FR, 'sting', 0.7);
    q(RW, 'whoosh', 0.7);
    q(RW + 4, 'flip', 0.6);
    scene(FR, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'grayscale(1) contrast(1.15)'}}>{o1Scene(FR)}</AbsoluteFill>
        <AbsoluteFill style={{background: '#fff', opacity: 1 - ease(f, FR, FR + 8)}} />
        <Svg>
          <G2 x={960} y={240} s={P(FR) * bump(w('o2', 'dave'), 0.12)}>
            <Stamp text="THAT'S DAVE" color={C.red} size={70} r={-4} />
            <path d="M 0 80 L 0 230 M -30 200 L 0 236 L 30 200" fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </G2>
        </Svg>
      </AbsoluteFill>
    ), false);
    scene(RW, () => (
      <AbsoluteFill>
        <AbsoluteFill style={{filter: 'sepia(0.5)'}}>{o1Scene(Math.max(0, FR - (f - RW) * 4))}</AbsoluteFill>
        <Svg>
          <G2 x={960} y={520} s={P(RW) * 1.2}><Stamp text="3 WEEKS EARLIER" color={C.navy} size={80} r={-3} /></G2>
          <G2 x={960} y={700} o={0.8}><Text size={90} color="#fff" stroke={C.ink} sw={10}>{'<< <<'}</Text></G2>
        </Svg>
      </AbsoluteFill>
    ), false);
  }
  {
    const bus = w('o3', 'bus');
    const rule = w('o3', 'rule');
    q(A('o3') + 4, 'pop', 0.5);
    q(bus, 'pop', 0.5);
    q(rule, 'stamp', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <GamePhone f={f} x={600} y={560} s={1.0 * P(A('o3'))} screen={
            <>
              <rect x={-160} y={-294} width={320} height={200} rx={30} fill="#9B2D2D" />
              <Text y={-210} size={32} color={C.yellow}>DRAGON</Text>
              <Text y={-170} size={28} color="#fff">QUEST</Text>
              <rect x={-140} y={-80} width={280} height={60} rx={16} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={-48} size={32} color="#fff">START</Text>
            </>
          } />
          <Dave f={f} x={1300} y={920} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.6}]} />
          <G2 x={1300} y={400} s={bump(rule, 0.16)}><Stamp text="NEVER PAY" color={C.red} size={66} r={-5} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ei = w('o4', 'eighty');
    const land = ei + 20;
    q(ei, 'cash', 0.6);
    q(land, 'stamp', 0.8);
    scene(A('o4'), () => {
      const n = Math.round(lerp(0, 82000000000, ease(f, ei, land)));
      const sk = shake(f, land, 16, 14);
      const z = 1 + 0.12 * ease(f, land, land + 10);
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, z, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('o4'))}><Text size={50} color={GRAY}>MOBILE GAMES 2025</Text></G2>
              <G2 x={960 + sk.x} y={480 + sk.y} s={P(A('o4'))}>
                <rect x={-560} y={-140} width={1120} height={280} rx={30} fill={f >= land ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
                <Text y={10} size={f >= land ? 150 : 130} color={f >= land ? C.red : C.ink}>{money(n)}</Text>
              </G2>
              <DamageMeter x={1700} y={90} s={0.8} value="$0" />
              <G2 x={960} y={800} s={0.9 * P(A('o4'))} o={lt(w('o4', 'last'), 0.4)}><Text size={28} color={GRAY}>Source: Sensor Tower 2026</Text></G2>
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const who = w('o5', 'whos');
    q(who, 'pop', 0.5);
    scene(A('o5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={760} y={200} s={P(A('o5'))}><Text size={56}>who's taking it?</Text></G2>
          <GamePhone f={f} x={460} y={660} s={0.8} screen={
            <Text y={0} size={120} color={C.yellow}>?</Text>
          } />
          <G2 x={lerp(2150, 1400, ease(f, A('o5'), A('o5') + 20))} y={880} s={1.5}>
            <path d="M -100 -360 Q -100 -390 -70 -390 L 70 -390 Q 100 -390 100 -360 L 100 -280 L -100 -280 Z" fill="#15151B" />
            <circle cx={0} cy={-200} r={80} fill="#15151B" />
            <path d="M -120 -100 Q 0 -150 120 -100 L 140 120 L -140 120 Z" fill="#15151B" />
            <Text y={-188} size={90} color={C.yellow}>?</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$0" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dr = w('o6', 'dragons');
    const hid = w('o6', 'hid');
    q(dr, 'pop', 0.6);
    q(hid, 'sting', 0.5);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DragonEgg x={600} y={500} s={1.4 * P(A('o6')) * bump(dr, 0.08)} glow={f >= dr ? 0.9 : 0} />
          <G2 x={1200} y={340} s={bump(hid, 0.18)} o={lt(hid, 0.4)}>
            <rect x={-180} y={-60} width={360} height={120} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={50} color="#fff">HIDDEN</Text>
          </G2>
          <Dave f={f} x={1300} y={920} s={1.1} keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$0" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: Ten Gems Short ============
  {
    const lv = w('c1b', 'level');
    const one = lv;
    const five = w('c1b', 'five');
    const ten = w('c1b', 'ten');
    q(one, 'ding', 0.5);
    q(five, 'ding', 0.5);
    q(ten, 'ding', 0.5);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <GamePhone f={f} x={960} y={560} s={1.2} screen={
            <>
              <rect x={-140} y={-240} width={280} height={140} rx={20} fill="#9B2D2D" />
              <Text y={-188} size={40} color={C.yellow}>LEVEL {f >= ten ? '10' : f >= five ? '5' : '1'}</Text>
              <rect x={-100} y={-60} width={200} height={200} rx={16} fill="#5C4A8C" />
              <Text y={40} size={80} color="#fff">🐉</Text>
            </>
          } />
          <Dave f={f} x={440} y={920} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
          <Bubble x={440} y={400} s={P(A('c1a'))} text="free!" size={40} tail="down" />
          <DamageMeter x={1700} y={90} s={0.8} value="$0" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const boss = w('c1c', 'boss');
    const empty = w('c1c', 'empty');
    q(boss, 'thud', 0.6);
    q(empty, 'buzz', 0.6);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={960} y={560} s={1.3} screen={
            <>
              <rect x={-140} y={-240} width={280} height={140} rx={20} fill="#9B2D2D" />
              <Text y={-188} size={40} color={C.yellow}>LEVEL 12 BOSS</Text>
              <Text y={0} size={120} color={C.red}>💀</Text>
              <EnergyBar x={0} y={200} s={0.9} level={f >= empty ? 0 : 40} />
            </>
          } />
          <Dave f={f} x={420} y={920} s={1.05} keys={[{at: boss, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
          <XMark x={800} y={400} s={2.2 * P(boss) * bump(boss, 0.15)} />
          <DamageMeter x={1700} y={90} s={0.8} value="$0" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wait = w('c1d', 'wait');
    const ref = w('c1d', 'refill');
    q(wait, 'pop', 0.5);
    q(ref, 'pop', 0.5);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={960} y={560} s={1.3} screen={
            <>
              <EnergyBar x={0} y={-180} s={0.9} level={0} />
              <rect x={-140} y={-40} width={280} height={80} rx={16} fill={GRAY} stroke={C.ink} strokeWidth={4} />
              <Text y={-6} size={32} color="#fff">{f >= wait ? 'WAIT 4 HOURS' : ''}</Text>
              <rect x={-140} y={80} width={280} height={80} rx={16} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={114} size={f >= ref ? 32 : 28} color="#fff">{f >= ref ? 'REFILL: 200 GEMS' : ''}</Text>
            </>
          } />
          <DamageMeter x={1700} y={90} s={0.8} value="$0" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const one90 = w('c1e', 'one');
    const short = w('c1e', 'short');
    const sm = w('c1e', 'smallest');
    q(one90, 'tick', 0.5);
    q(short, 'buzz', 0.7);
    q(sm, 'cash', 0.5);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GemDisplay x={460} y={360} s={1.6 * P(A('c1e'))} gems={190} highlight={f >= one90 ? 1 : 0} />
          <G2 x={1100} y={360} s={P(A('c1e')) * bump(short, 0.2)}>
            <Text size={80} color={f >= short ? C.red : C.ink}>need: 200</Text>
          </G2>
          <G2 x={460} y={660} s={P(A('c1e'))} o={lt(sm, 0.4)}>
            <GemPack price="$4.99" gems={300} />
          </G2>
          <Dave f={f} x={1300} y={920} s={1.05} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$0" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const park = w('c1f', 'park');
    const stop = w('c1f', 'stops');
    q(park, 'pop', 0.5);
    q(stop, 'thud', 0.6);
    scene(A('c1f'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={200} y={180} s={P(A('c1f'))}><Text size={48} color="#fff" stroke={C.ink} sw={8}>THEME PARK</Text></G2>
          <rect x={-100} y={0} width={1200} height={280} fill="#8B4513" stroke={C.ink} strokeWidth={6} />
          <path d="M 100 50 Q 200 -50 300 50 Q 400 150 500 50 Q 600 -50 700 50" fill="none" stroke={C.red} strokeWidth={12} />
          {[100, 300, 500, 700].map((x) => <circle key={x} cx={x} cy={50} r={26} fill={C.yellow} stroke={C.ink} strokeWidth={5} />)}
          <Dave f={f} x={500} y={200} s={0.5} keys={[{at: 0, pose: 'celebrate', expr: 'happy'}]} />
          <G2 x={900} y={500} s={bump(stop, 0.18)} o={lt(stop, 0.4)}>
            <rect x={-120} y={-60} width={240} height={120} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={0} size={48} color="#fff">PAY $1</Text>
          </G2>
          <DreamFrame label="" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const buy = w('c1g', 'buy');
    const tap = w('c1g', 'tap');
    const told = w('c1g', 'told');
    const pays = w('c1g', 'pays');
    q(buy, 'click', 0.6);
    q(told, 'sting', 0.6);
    q(pays, 'stamp', 0.7);
    scene(A('c1g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={600} y={560} s={1.2} screen={
            <>
              <rect x={-120} y={-200} width={240} height={120} rx={16} fill={f >= buy ? C.green : GRAY} stroke={C.ink} strokeWidth={4} />
              <Text y={-146} size={f >= buy ? 44 : 38} color="#fff">{f >= buy ? '$4.99' : 'BUY'}</Text>
            </>
          } />
          <Dave f={f} x={1300} y={920} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}, {at: told, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <G2 x={1300} y={380} s={bump(pays, 0.18)} o={lt(pays, 0.4)}><Stamp text="HE PAYS" color={C.red} size={66} r={-6} /></G2>
          <DamageMeter x={1700} y={90} s={0.8} value={f >= w('c1g', 'five') ? '$4.99' : '$0'} flash={f >= w('c1g', 'five') ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: Funny Money ============
  {
    const not = w('c2b', 'nothing');
    const egg = w('c2b', 'egg');
    q(not, 'pop', 0.5);
    q(egg, 'pop', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={960} y={560} s={1.4} screen={
            <>
              <Text y={-240} size={32} color={C.yellow}>SHOP</Text>
              <rect x={-120} y={-140} width={240} height={100} rx={16} fill="#3A4A8C" stroke={C.ink} strokeWidth={4} />
              <circle cx={-60} cy={-90} r={24} fill={C.blue} stroke="#fff" strokeWidth={4} />
              <Text x={0} y={-86} size={32} color="#fff">{f >= egg ? '300' : ''}</Text>
              <rect x={-120} y={-20} width={240} height={100} rx={16} fill="#3A4A8C" stroke={C.ink} strokeWidth={4} />
              <circle cx={-60} cy={30} r={24} fill={C.blue} stroke="#fff" strokeWidth={4} />
              <Text x={0} y={34} size={32} color="#fff">500</Text>
            </>
          } />
          <G2 x={960} y={160} s={P(A('c2a')) * bump(not, 0.15)}><Text size={54} color={f >= not ? C.red : C.ink}>NO DOLLARS</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$4.99" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const only = w('c2c', 'only');
    const best = w('c2c', 'best');
    q(only, 'pop', 0.5);
    q(best, 'stamp', 0.6);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GemPack x={400} y={480} s={0.9 * P(A('c2c'))} price="$4.99" gems={300} />
          <GemPack x={960} y={480} s={0.9 * P(A('c2c'))} price="$19.99" gems={1400} bonus="200" best={f >= best ? 1 : 0} />
          <GemPack x={1520} y={480} s={0.9 * P(A('c2c'))} price="$99.99" gems={8080} bonus="1600" />
          <G2 x={960} y={160} s={bump(only, 0.14)}><Text size={52}>GEMS ONLY</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$4.99" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const country = w('c2d', 'country');
    q(country, 'pop', 0.5);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={960} y={200} s={P(A('c2d'))}><Text size={50} color="#fff" stroke={C.ink} sw={8}>FUNNY MONEY LAND</Text></G2>
          <circle cx={460} cy={520} r={100} fill="#5C4A8C" stroke={C.ink} strokeWidth={8} />
          <Text x={460} y={528} size={80} color="#fff">💎</Text>
          <path d="M 620 520 L 840 520 M 810 490 L 840 520 L 810 550" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={920} y={420} width={200} height={200} rx={20} fill={C.green} stroke={C.ink} strokeWidth={8} />
          <Text x={1020} y={528} size={80} color="#fff">$</Text>
          <Dave f={f} x={1500} y={920} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: -0.6}]} />
          <DreamFrame label="" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ftc = w('c2e', 'f');
    const gen = w('c2e', 'million');
    q(ftc, 'paper', 0.6);
    q(gen, 'stamp', 0.6);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c2e')) * bump(ftc, 0.1)}><Text size={48} color={C.red}>FTC 2025</Text></G2>
          <G2 x={960} y={500} s={P(A('c2e'))}>
            <rect x={-500} y={-180} width={1000} height={360} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-110} size={40}>virtual currency layers</Text>
            <Text y={-50} size={40}>+ unusual exchange rates</Text>
            <Text y={10} size={40}>= players don't know the</Text>
            <Text y={70} size={f >= gen ? 56 : 44} color={f >= gen ? C.red : C.ink}>REAL DOLLAR COST</Text>
          </G2>
          <G2 x={960} y={860} s={0.9} o={lt(w('c2f', 'real'), 0.4)}><Text size={28} color={GRAY}>Source: FTC Jan 2025</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$4.99" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const said = w('c2f', 'said');
    q(said, 'pop', 0.5);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c2f'))}>
            <rect x={-460} y={-160} width={920} height={320} rx={24} fill="#FFF3C4" stroke={C.ink} strokeWidth={6} />
            <Text y={-80} size={44}>odd exchange rates</Text>
            <Text y={-20} size={44}>so you can't compute</Text>
            <Text y={40} size={44}>the price in your head</Text>
            <Text y={100} size={48} color={C.red}>BY DESIGN</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$4.99" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const val = w('c2g', 'value');
    const nin = w('c2g', 'nineteen');
    q(val, 'pop', 0.5);
    q(nin, 'cash', 0.7);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={600} y={560} s={1.1} screen={
            <>
              <Text y={-240} size={28} color={C.yellow}>BEST VALUE</Text>
              <rect x={-120} y={-140} width={240} height={80} rx={16} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={-106} size={36} color="#fff">{f >= nin ? '$19.99' : ''}</Text>
            </>
          } />
          <Dave f={f} x={1300} y={920} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value={f >= nin ? '$24.98' : '$4.99'} flash={f >= nin ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const guess = A('c2h');
    const ticking = guess + 30;
    q(guess + 4, 'pop', 0.6);
    q(ticking, 'tick', 0.4);
    scene(guess, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={540} s={P(guess)}>
            <rect x={-520} y={-300} width={1040} height={600} rx={30} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-230} size={42} ls={6} color={C.red}>QUICK GUESS</Text>
            <Text y={-160} size={40}>on a normal day</Text>
            <Text y={-100} size={40}>out of every 100 people</Text>
            <Text y={-40} size={40}>playing games like this</Text>
            <Text y={30} size={46} color={C.navy}>how many pay anything?</Text>
            <Text x={-200} y={170} size={160} color={C.ink}>?</Text>
            <g transform="translate(280,170)">
              <circle r={90} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <line x1={0} y1={0} x2={Math.sin(((f - ticking) * 6 * Math.PI) / 180) * 70} y2={-Math.cos(((f - ticking) * 6 * Math.PI) / 180) * 70} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
              <circle r={12} fill={C.ink} />
            </g>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$24.98" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sea = w('c2i', 'season');
    q(sea, 'pop', 0.6);
    scene(A('c2i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={960} y={560} s={1.4} screen={
            <>
              <Text y={-240} size={32} color={C.yellow}>{f >= sea ? 'SEASON 3 STARTS!' : ''}</Text>
              <rect x={-140} y={-140} width={280} height={100} rx={16} fill="#2A2D4A" stroke={C.ink} strokeWidth={4} />
              <Text y={-86} size={32} color="#fff">PASS: $9.99</Text>
            </>
          } glow={f >= sea ? 0.7 : 0} />
          <DamageMeter x={1700} y={90} s={0.8} value="$24.98" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: The Chore Chart You Bought ============
  {
    const pass = w('c3a', 'pass');
    const hundred = w('c3a', 'hundred');
    q(pass, 'pop', 0.5);
    q(hundred, 'pop', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SeasonPass x={960} y={560} s={1.1 * P(A('c3a'))} tier={f >= hundred ? 15 : 0} />
          <G2 x={960} y={160} s={bump(pass, 0.12)}><Text size={50}>SEASON PASS</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value={f >= w('c3a', 'nine') ? '$34.97' : '$24.98'} flash={f >= w('c3a', 'nine') ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const earn = w('c3b', 'earn');
    const play = w('c3b', 'playing');
    q(earn, 'pop', 0.5);
    q(play, 'key', 0.5);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={480} y={360} s={P(A('c3b'))}>
            <rect x={-200} y={-100} width={400} height={200} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-40} size={44}>YOU PAID</Text>
            <Text y={20} size={50} color={C.red}>$9.99</Text>
          </G2>
          <path d="M 740 360 L 900 360 M 870 330 L 900 360 L 870 390" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={lt(earn, 0.4)} />
          <G2 x={1280} y={360} s={P(A('c3b'))} o={lt(earn, 0.4)}>
            <rect x={-240} y={-100} width={480} height={200} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-10} size={44}>EARN REWARDS</Text>
            <Text y={40} size={40} color={C.navy}>by playing daily</Text>
          </G2>
          <Dave f={f} x={420} y={920} s={1.0} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: 0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const miss = w('c3c', 'miss');
    const ends = w('c3c', 'ends');
    q(miss, 'buzz', 0.6);
    q(ends, 'thud', 0.6);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={600} y={480} s={1.2 * P(A('c3c'))} year="SEASON 3" flip={1} />
          {[0, 1, 2, 3].map((i) => (
            <XMark key={i} x={600 + (i - 1.5) * 80} y={680} s={0.7 * (f >= miss + i * 3 ? 1 : 0)} />
          ))}
          <G2 x={1280} y={400} s={bump(ends, 0.18)} o={lt(ends, 0.4)}>
            <rect x={-180} y={-80} width={360} height={160} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={-20} size={42} color="#fff">TOO LATE</Text>
            <Text y={30} size={38} color="#fff">season ended</Text>
          </G2>
          <Dave f={f} x={1280} y={920} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'sad', look: -0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const chart = w('c3d', 'chart');
    q(chart, 'pop', 0.5);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={960} y={200} s={P(A('c3d'))}><Text size={50} color="#fff" stroke={C.ink} sw={8}>CHORE CHART</Text></G2>
          <rect x={600} y={400} width={720} height={360} rx={20} fill="#fff" stroke={C.ink} strokeWidth={8} />
          <Text x={960} y={460} size={40} color={C.ink}>DAILY TASKS</Text>
          {['Mon', 'Tue', 'Wed', 'Thu'].map((d, i) => (
            <g key={i}>
              <Text x={700} y={540 + i * 60} size={32} color={GRAY} anchor="start">{d}</Text>
              <rect x={900} y={518 + i * 60} width={40} height={40} rx={8} fill={i < 2 ? C.green : '#F2F5F8'} stroke={C.ink} strokeWidth={4} />
              {i < 2 && <Text x={920} y={542 + i * 60} size={30} color="#fff">✓</Text>}
            </g>
          ))}
          <rect x={720} y={320} width={180} height={60} rx={12} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
          <Text x={810} y={354} size={36} color={C.red}>$10</Text>
          <DreamFrame label="" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const eleven = w('c3e', 'eleven');
    q(eleven, 'tick', 0.5);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Clock f={f} x={600} y={480} s={1.4 * P(A('c3e'))} h={23} m={58} />
          <GamePhone f={f} x={1260} y={560} s={1.1} screen={
            <>
              <Text y={-200} size={32} color={C.yellow}>DAILY QUEST</Text>
              <Text y={-140} size={28} color="#C9D6E6">time left: 2 min</Text>
              <rect x={-120} y={-40} width={240} height={80} rx={16} fill={C.green} stroke={C.ink} strokeWidth={4} />
              <Text y={-6} size={32} color="#fff">PLAY NOW</Text>
            </>
          } />
          <Dave f={f} x={440} y={920} s={1.0} keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0.6}]} sweat />
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fri = w('c3f', 'friday');
    const gold = w('c3f', 'glowing');
    q(fri, 'pop', 0.5);
    q(gold, 'chime', 0.6);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Calendar x={600} y={460} s={1.2 * P(A('c3f'))} year="FRIDAY" flip={1} />
          <DragonEgg x={1260} y={500} s={1.3 * P(fri) * bump(gold, 0.1)} glow={f >= gold ? 1 : 0} />
          <Dave f={f} x={420} y={920} s={1.05} keys={[{at: 0, pose: 'idle', expr: 'suspicious', look: 0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: The Glowing Egg ============
  {
    const banner = w('c4a', 'banner');
    const leg = w('c4a', 'legendary');
    q(banner, 'whoosh', 0.7);
    q(leg, 'chime', 0.6);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BannerAd f={f} x={960} y={560} s={1.1 * P(A('c4a')) * bump(leg, 0.06)} />
          <G2 x={960} y={160} s={bump(banner, 0.14)}><Text size={54} color={C.red}>LIMITED TIME!</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pulls = w('c4b', 'pulls');
    const cracks = w('c4b', 'cracks');
    q(pulls, 'pop', 0.5);
    q(cracks, 'crack', 0.5);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={600} y={360} s={P(A('c4b'))}>
            <rect x={-200} y={-100} width={400} height={200} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={48}>BUY</Text>
            <Text y={30} size={44} color={C.red}>PULLS</Text>
          </G2>
          <path d="M 860 360 L 1020 360 M 990 330 L 1020 360 L 990 390" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={lt(pulls, 0.4)} />
          <DragonEgg x={1340} y={360} s={1.0 * P(pulls)} crack={f >= cracks ? 1 : 0} o={lt(pulls, 0.4)} />
          <G2 x={960} y={740} s={P(A('c4b'))} o={lt(cracks, 0.4)}><Text size={42} color={GRAY}>maybe a dragon?</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const zero = w('c4c', 'zero');
    q(zero, 'buzz', 0.6);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c4c'))}>
            <rect x={-520} y={-180} width={1040} height={360} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-100} size={44}>chance per pull:</Text>
            <Text y={-30} size={80} color={f >= zero ? C.red : C.ink}>0.6%</Text>
            <Text y={60} size={38} color={GRAY}>about 1 in 167</Text>
            <Text y={120} size={36} color={GRAY}>guaranteed by pull 90</Text>
          </G2>
          <G2 x={960} y={820} s={0.9} o={lt(w('c4c', 'hundred'), 0.4)}><Text size={28} color={GRAY}>Source: Genshin Impact</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cereal = w('c4d', 'cereal');
    q(cereal, 'pop', 0.5);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={960} y={200} s={P(A('c4d'))}><Text size={48} color="#fff" stroke={C.ink} sw={8}>CEREAL LOTTERY</Text></G2>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={200 + i * 260} y={480} width={200} height={280} rx={16} fill={i === 3 ? C.gold : '#9B59B6'} stroke={C.ink} strokeWidth={6} />
          ))}
          <Text x={960} y={640} size={140} color="#fff">?</Text>
          <DreamFrame label="" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ninety = w('c4e', 'ninety');
    const sounds = w('c4e', 'sounds');
    q(ninety, 'pop', 0.5);
    q(sounds, 'pop', 0.5);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={600} y={400} s={P(A('c4e')) * bump(ninety, 0.12)}>
            <rect x={-200} y={-100} width={400} height={200} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={54}>pull</Text>
            <Text y={40} size={70} color={C.red}>90</Text>
          </G2>
          <G2 x={1260} y={400} s={P(sounds)} o={lt(sounds, 0.4)}>
            <Bubble text="only 90!" size={42} tail="down" />
          </G2>
          <Dave f={f} x={1260} y={920} s={1.05} keys={[{at: 0, pose: 'think', expr: 'neutral', look: -0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$34.97" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const big = w('c4f', 'big');
    const fifty = w('c4f', 'fifty');
    q(big, 'cash', 0.7);
    q(fifty, 'pop', 0.5);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GemPack x={600} y={560} s={1.2 * P(A('c4f'))} price="$99.99" gems={8080} bonus="1600" best={1} />
          <G2 x={1260} y={400} s={P(fifty)} o={lt(fifty, 0.4)}>
            <Text size={48}>50 pulls</Text>
          </G2>
          <Dave f={f} x={1260} y={920} s={1.05} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value={f >= w('c4f', 'ninety') ? '$134.96' : '$34.97'} flash={f >= w('c4f', 'ninety') ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sixty = w('c4g', 'sixty');
    const no = w('c4g', 'no');
    const unlucky = w('c4g', 'unluckiest');
    q(sixty, 'tick', 0.5);
    q(no, 'buzz', 0.7);
    q(unlucky, 'trombone', 0.6);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={600} y={360} s={P(A('c4g')) * bump(sixty, 0.12)}>
            <rect x={-180} y={-90} width={360} height={180} rx={20} fill={C.navy} stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={44} color="#fff">PULLS:</Text>
            <Text y={30} size={60} color={C.yellow}>60</Text>
          </G2>
          <DragonEgg x={1260} y={360} s={1.1 * P(A('c4g'))} open={f >= no ? 1 : 0} />
          <XMark x={1260} y={360} s={2.0 * P(no) * bump(no, 0.15)} />
          <Dave f={f} x={420} y={920} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'sad', look: 0.6}]} sweat />
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: Who Pays The Bills? ============
  {
    const four = w('c5c', 'paid');
    const land = four + 20;
    q(four, 'tick', 0.5);
    q(land, 'stamp', 0.8);
    scene(A('c5a'), () => {
      const n = Math.round(lerp(0, 4, ease(f, four, land)));
      const sk = shake(f, land, 16, 14);
      return (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={160} s={P(A('c5a'))}><Text size={48} color={GRAY}>out of 100 players</Text></G2>
            <G2 x={960 + sk.x} y={480 + sk.y} s={P(A('c5a'))}>
              <rect x={-280} y={-160} width={560} height={320} rx={30} fill={f >= land ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
              <Text y={-40} size={100} color={f >= land ? C.red : C.ink}>{n}</Text>
              <Text y={40} size={48} color={C.navy}>pay anything</Text>
            </G2>
            <G2 x={960} y={860} s={0.9} o={lt(w('c5b', 'regulators'), 0.4)}><Text size={28} color={GRAY}>Source: Playtika 10-K 2025</Text></G2>
            <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
          </Svg>
        </AbsoluteFill>
      );
    });
  }
  {
    const ninety = w('c5c', 'seventy');
    const free = w('c5c', 'paid');
    q(ninety, 'pop', 0.5);
    q(free, 'pop', 0.5);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={500} y={400} s={P(A('c5c')) * bump(ninety, 0.12)}>
            <rect x={-200} y={-120} width={400} height={240} rx={24} fill={GRAY} stroke={C.ink} strokeWidth={6} />
            <Text y={-40} size={80} color="#fff">96</Text>
            <Text y={20} size={42} color="#C9D6E6">play for free</Text>
          </G2>
          <G2 x={1300} y={400} s={P(A('c5c')) * bump(free, 0.14)}>
            <rect x={-240} y={-120} width={480} height={240} rx={24} fill={C.green} stroke={C.ink} strokeWidth={6} />
            <Text y={-40} size={80} color="#fff">4</Text>
            <Text y={20} size={42} color="#fff">pay for everyone</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const hunt = w('c5d', 'bills');
    q(hunt, 'sting', 0.6);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c5d'))}>
            <rect x={-480} y={-140} width={960} height={280} rx={24} fill="#FFF3C4" stroke={C.ink} strokeWidth={6} />
            <Text y={-60} size={50}>the game is</Text>
            <Text y={20} size={64} color={C.red}>HUNTING WHALES</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const top = w('c5e', 'eaters');
    const half = w('c5e', 'dessert');
    q(top, 'pop', 0.5);
    q(half, 'stamp', 0.7);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c5e'))}>
            <rect x={-520} y={-180} width={1040} height={360} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-100} size={46}>top 5% of spenders</Text>
            <Text y={-40} size={44}>(over $100/month)</Text>
            <Text y={50} size={60} color={f >= half ? C.red : C.ink}>HALF</Text>
            <Text y={110} size={44}>of loot box revenue</Text>
          </G2>
          <G2 x={960} y={820} s={0.9} o={lt(w('c5e', 'dessert'), 0.4)}><Text size={28} color={GRAY}>Source: Close et al. 2021</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const app = w('c5f', 'whales');
    const thirty = w('c5f', 'thousand');
    q(app, 'pop', 0.5);
    q(thirty, 'cash', 0.6);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Apple x={460} y={400} s={1.4 * P(A('c5f'))} />
          <G2 x={1260} y={400} s={P(thirty) * bump(thirty, 0.12)} o={lt(thirty, 0.4)}>
            <rect x={-220} y={-100} width={440} height={200} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={60} color={C.red}>30%</Text>
            <Text y={30} size={40} color={C.ink}>of every sale</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const game = w('c5g', 'loot');
    const hunts = w('c5g', 'money');
    const apple = w('c5g', 'percent');
    q(game, 'pop', 0.5);
    q(apple, 'pop', 0.5);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={340} y={300} s={P(A('c5g')) * bump(game, 0.1)}>
            <rect x={-140} y={-80} width={280} height={160} rx={20} fill="#9B2D2D" stroke={C.ink} strokeWidth={6} />
            <Text y={-20} size={40} color={C.yellow}>GAME</Text>
            <Text y={30} size={36} color="#fff">PUBLISHER</Text>
          </G2>
          <G2 x={340} y={580} s={P(hunts)} o={lt(hunts, 0.4)}><Text size={38} color={C.red}>hunts whales</Text></G2>
          <Apple x={960} y={440} s={1.1 * P(apple)} o={lt(apple, 0.4)} />
          <G2 x={960} y={700} s={P(apple)} o={lt(apple, 0.4)}><Text size={38} color={C.navy}>takes 30%</Text></G2>
          <Raccoon f={f} x={1560} y={860} s={1.4 * P(apple)} mood="happy" grab={f >= apple ? 1 : 0} o={lt(apple, 0.4)} />
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  const SUB = w('c5h', 'paying') + 20;
  {
    q(SUB, 'whoosh', 0.5);
    subCues(SUB);
    scene(SUB, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubReminder f={f} at={SUB} Dave={<Dave f={f} x={480} y={920} s={1.05} keys={[{at: SUB, pose: 'wave', expr: 'happy', look: 0.6}]} />} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const epic = w('c5i', 'whales');
    const refund = w('c5i', 'wrong');
    q(epic, 'paper', 0.6);
    q(refund, 'cash', 0.6);
    scene(A('c5i'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c5i')) * bump(epic, 0.1)}><Text size={48} color={C.red}>FTC: EPIC GAMES</Text></G2>
          <G2 x={960} y={500} s={P(A('c5i'))}>
            <rect x={-520} y={-200} width={1040} height={400} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-130} size={44}>dark patterns</Text>
            <Text y={-70} size={44}>= unwanted charges</Text>
            <Text y={20} size={60} color={f >= refund ? C.red : C.ink}>$200M</Text>
            <Text y={80} size={40} color={GRAY}>refunds to 1.6M players</Text>
          </G2>
          <G2 x={960} y={860} s={0.9} o={lt(w('c5i', 'wrong'), 0.4)}><Text size={28} color={GRAY}>Source: FTC 2023</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH6: Whales Aren't Rich ============
  {
    const think = w('c6a', 'thought');
    const rich = w('c6a', 'nope');
    q(think, 'pop', 0.5);
    q(rich, 'pop', 0.5);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={200} y={200} s={P(A('c6a'))}><Text size={48} color="#fff" stroke={C.ink} sw={8}>MOST PEOPLE THINK</Text></G2>
          <MoneyStack x={960} y={600} s={2.2 * P(think)} n={8} />
          <G2 x={960} y={900} s={P(rich)} o={lt(rich, 0.4)}><Text size={56} color="#fff" stroke={C.ink} sw={8}>WHALES = RICH</Text></G2>
          <DreamFrame label="" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const study = w('c6b', 'study');
    const seven = w('c6b', 'link');
    q(study, 'paper', 0.6);
    q(seven, 'pop', 0.5);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('c6b')) * bump(study, 0.1)}><Text size={46} color={GRAY}>study: 7,767 loot box buyers</Text></G2>
          <G2 x={960} y={480} s={P(A('c6b'))}>
            <rect x={-560} y={-160} width={1120} height={320} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-70} size={50}>loot box spend</Text>
            <Text y={10} size={44}>vs earnings</Text>
            <Text y={80} size={60} color={C.red}>NO LINK</Text>
          </G2>
          <G2 x={960} y={820} s={0.9} o={lt(w('c6b', 'link'), 0.4)}><Text size={28} color={GRAY}>Source: Close et al. 2021</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const but = w('c6c', 'spending');
    const problem = w('c6c', 'problem');
    q(but, 'pop', 0.5);
    q(problem, 'stamp', 0.7);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c6c'))}>
            <rect x={-500} y={-180} width={1000} height={360} rx={24} fill="#FFF3C4" stroke={C.ink} strokeWidth={6} />
            <Text y={-100} size={50}>loot box spend</Text>
            <Text y={-40} size={44}>vs</Text>
            <Text y={20} size={56} color={f >= problem ? C.red : C.ink}>PROBLEM GAMBLING</Text>
            <Text y={100} size={60} color={f >= problem ? C.red : C.ink}>CORRELATED</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const profit = w('c6d', 'children');
    q(profit, 'stamp', 0.7);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c6d'))}>
            <rect x={-560} y={-160} width={1120} height={320} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-80} size={46}>developers profit from</Text>
            <Text y={-20} size={50} color={C.red}>moderate & high-risk</Text>
            <Text y={40} size={50} color={C.red}>GAMBLERS</Text>
            <Text y={100} size={40} color={GRAY}>not high earners</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$134.96" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dave = w('c6e', 'epic');
    const hun = w('c6e', 'hundred');
    q(dave, 'pop', 0.5);
    q(hun, 'cash', 0.6);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={600} y={920} s={1.15} keys={[{at: 0, pose: 'shock', expr: 'worried', look: 0.6}]} />
          <G2 x={1260} y={400} s={P(A('c6e'))}>
            <rect x={-260} y={-140} width={520} height={280} rx={24} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-60} size={48}>Dave spent</Text>
            <Text y={20} size={70} color={C.red}>$235</Text>
            <Text y={90} size={40} color={C.ink}>in 3 weeks</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value={f >= hun ? '$234.95' : '$134.96'} flash={f >= hun ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pace = w('c6f', 'close');
    const four = w('c6f', 'a');
    q(pace, 'tick', 0.5);
    q(four, 'stamp', 0.8);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={360} s={P(A('c6f'))}>
            <Text y={-80} size={50}>at that pace</Text>
            <rect x={-280} y={10} width={560} height={180} rx={24} fill={f >= four ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
            <Text y={60} size={44}>about</Text>
            <Text y={120} size={f >= four ? 90 : 70} color={f >= four ? C.red : C.ink}>$4,000</Text>
          </G2>
          <G2 x={960} y={680} s={P(A('c6f'))}><Text size={48} color={GRAY}>a year</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$234.95" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const never = w('c6g', 'knight');
    q(never, 'sting', 0.6);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c6g'))}>
            <rect x={-480} y={-140} width={960} height={280} rx={24} fill="#FFF3C4" stroke={C.ink} strokeWidth={6} />
            <Text y={-60} size={50}>money he</Text>
            <Text y={10} size={60} color={C.red}>NEVER FELT LEAVE</Text>
          </G2>
          <Dave f={f} x={420} y={920} s={1.05} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0.6}]} sweat />
          <DamageMeter x={1700} y={90} s={0.8} value="$234.95" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: Dave Fights Back ============
  {
    const added = w('c7a', 'three');
    const two35 = w('c7a', 'education');
    q(added, 'paper', 0.5);
    q(two35, 'stamp', 0.7);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={600} y={360} s={P(A('c7a'))}>
            <rect x={-220} y={-180} width={440} height={360} rx={20} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-120} size={36} color={GRAY}>$4.99</Text>
            <Text y={-70} size={36} color={GRAY}>$19.99</Text>
            <Text y={-20} size={36} color={GRAY}>$9.99</Text>
            <Text y={30} size={36} color={GRAY}>$99.99</Text>
            <Text y={80} size={36} color={GRAY}>$99.99</Text>
            <line x1={-180} y1={120} x2={180} y2={120} stroke={C.ink} strokeWidth={4} />
          </G2>
          <G2 x={1260} y={360} s={P(two35) * bump(two35, 0.14)} o={lt(two35, 0.4)}>
            <rect x={-260} y={-120} width={520} height={240} rx={24} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-40} size={60} color={C.red}>$234.95</Text>
            <Text y={30} size={40} color={C.ink}>ONE NUMBER</Text>
          </G2>
          <Dave f={f} x={420} y={920} s={1.0} keys={[{at: 0, pose: 'typing', expr: 'suspicious', look: 0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="$234.95" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const screen = w('c7c', 'screen');
    const time = w('c7c', 'time');
    const off = w('c7c', 'off');
    q(screen, 'pop', 0.5);
    q(off, 'click', 0.6);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <ScreenTimeIcon x={600} y={480} s={1.3 * P(A('c7c'))} />
          <G2 x={1260} y={400} s={P(off)} o={lt(off, 0.4)}>
            <rect x={-240} y={-100} width={480} height={200} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={44} color="#fff">IN-APP</Text>
            <Text y={30} size={48} color="#fff">BLOCKED</Text>
          </G2>
          <G2 x={960} y={160} s={bump(screen, 0.12)}><Text size={50}>SPEED BUMP</Text></G2>
          <G2 x={960} y={820} s={0.9} o={lt(w('c7c', 'in'), 0.4)}><Text size={28} color={GRAY}>Source: Apple Support</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$234.95" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const dollar = w('c7d', 'dollar');
    const before = w('c7d', 'before');
    q(dollar, 'pop', 0.5);
    q(before, 'pop', 0.5);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DollarRule x={960} y={400} s={1.0 * P(A('c7d'))} gems={160} dollars="$2" />
          <G2 x={960} y={680} s={P(before)} o={lt(before, 0.4)}><Text size={44} color={C.navy}>turns gems back to dollars</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="$234.95" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const old = w('c7e', 'old');
    const gift = w('c7e', 'gift');
    const saved = w('c7e', 'keeps');
    const flip = saved + 10;
    q(old, 'pop', 0.5);
    q(gift, 'pop', 0.5);
    q(flip, 'chime', 0.7);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={460} y={320} s={P(A('c7e'))}><Text size={44} color={C.red}>old pace: $4,000/yr</Text></G2>
          <GiftCard x={460} y={600} s={0.9 * P(gift)} value="$20/mo" o={lt(gift, 0.4)} />
          <G2 x={1300} y={460} s={P(gift)} o={lt(gift, 0.4)}>
            <Text y={-40} size={44}>new budget:</Text>
            <Text y={20} size={54} color={C.green}>$240/yr</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value={f >= flip ? '' : '$234.95'} saved={f >= flip ? 1 : 0} />
          <G2 x={1700} y={90} s={0.8} o={f >= flip ? 1 : 0}><DamageMeter value="~$3,800/yr" saved={1} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const still = w('c7f', 'still');
    q(still, 'pop', 0.5);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DragonEgg x={600} y={500} s={1.3 * P(A('c7f'))} glow={0.8} />
          <G2 x={1300} y={400} s={P(still) * bump(still, 0.14)} o={lt(still, 0.4)}>
            <Text y={-40} size={48}>what did the</Text>
            <Text y={20} size={54} color={C.red}>DRAGON</Text>
            <Text y={80} size={48}>actually cost?</Text>
          </G2>
          <Dave f={f} x={420} y={920} s={1.05} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: The Real Price ============
  {
    const used = w('c8a', 'used');
    q(used, 'pop', 0.5);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DollarRule x={960} y={400} s={1.1 * P(A('c8a'))} gems={160} dollars="$2" />
          <G2 x={960} y={680} s={bump(used, 0.12)}><Text size={48}>DOLLAR RULE</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const zero = w('c8b', 'zero');
    const about = w('c8b', 'ninety');
    q(zero, 'pop', 0.5);
    q(about, 'pop', 0.5);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={340} s={P(A('c8b'))}>
            <rect x={-500} y={-140} width={1000} height={280} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-70} size={46}>Genshin Impact rules:</Text>
            <Text y={0} size={50} color={f >= zero ? C.red : C.ink}>0.6%</Text>
            <Text y={60} size={40} color={GRAY}>about 1 in 167</Text>
          </G2>
          <G2 x={960} y={640} s={0.9} o={lt(about, 0.4)}><Text size={28} color={GRAY}>Source: Genshin Impact</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const each = w('c8c', 'each');
    const eighty = w('c8c', 'eight');
    q(each, 'pop', 0.5);
    q(eighty, 'pop', 0.5);
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={600} y={360} s={P(A('c8c'))}>
            <Text y={-60} size={40}>1 pull =</Text>
            <Text y={0} size={50}>160 gems</Text>
          </G2>
          <G2 x={1260} y={360} s={P(eighty)} o={lt(eighty, 0.4)}>
            <Text y={-60} size={40}>8080 gems =</Text>
            <Text y={0} size={50} color={C.red}>$99.99</Text>
          </G2>
          <G2 x={960} y={680} s={P(eighty)} o={lt(eighty, 0.4)}><Text size={48} color={C.navy}>1 pull ≈ $2</Text></G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const worst = w('c8d', 'worst');
    const lose = w('c8d', 'lose');
    const ninety = w('c8d', 'ninety');
    q(worst, 'pop', 0.5);
    q(lose, 'buzz', 0.6);
    q(ninety, 'pop', 0.5);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={300} s={P(A('c8d'))}>
            <Text y={-80} size={48} color={GRAY}>worst case</Text>
            <Text y={-20} size={46}>pull 90</Text>
            <Text y={40} size={f >= lose ? 50 : 44} color={f >= lose ? C.red : C.ink}>lose coin flip</Text>
            <Text y={100} size={46}>+ 90 more</Text>
          </G2>
          <G2 x={960} y={600} s={P(ninety) * bump(ninety, 0.14)} o={lt(ninety, 0.4)}>
            <rect x={-220} y={-70} width={440} height={140} rx={20} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            <Text y={-20} size={60} color={C.red}>180</Text>
            <Text y={40} size={44} color={C.ink}>pulls</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const eighty = w('c8e', 'eighty');
    const two = w('c8e', 'two');
    const real = w('c8e', 'real');
    const three56 = w('c8e', 'three');
    const land = three56 + 20;
    q(eighty, 'tick', 0.5);
    q(two, 'tick', 0.5);
    q(three56, 'tick', 0.5);
    q(land, 'stamp', 0.9);
    scene(A('c8e'), () => {
      const n = Math.round(lerp(0, 356, ease(f, three56, land)));
      const sk = shake(f, land, 18, 16);
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[land, 1, 960, 540], [land + 10, 1.12, 960, 540]]}>
            <Svg>
              <G2 x={960} y={160} s={P(A('c8e'))}><Text size={48} color={GRAY}>180 pulls × $2</Text></G2>
              <G2 x={960 + sk.x} y={440 + sk.y} s={P(A('c8e'))}>
                <rect x={-420} y={-180} width={840} height={360} rx={30} fill={f >= land ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={6} />
                <Text y={-60} size={f >= real ? 50 : 44} color={f >= real ? C.red : C.ink}>DRAGON'S REAL PRICE</Text>
                <Text y={30} size={f >= land ? 130 : 100} color={f >= land ? C.red : C.ink}>{money(n)}</Text>
              </G2>
              <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const banner = w('c8f', 'banner');
    const said = w('c8f', 'said');
    const never = w('c8f', 'never');
    const three = w('c8f', 'three');
    q(banner, 'pop', 0.5);
    q(said, 'pop', 0.5);
    q(never, 'stamp', 0.7);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BannerAd f={f} x={600} y={460} s={0.85 * P(A('c8f'))} />
          <G2 x={1300} y={300} s={P(said) * bump(said, 0.1)} o={lt(said, 0.4)}><Text size={46}>said: 160 gems</Text></G2>
          <G2 x={1300} y={540} s={P(never) * bump(never, 0.16)} o={lt(never, 0.4)}>
            <rect x={-260} y={-100} width={520} height={200} rx={20} fill={C.red} stroke={C.ink} strokeWidth={6} />
            <Text y={-30} size={44} color="#fff">NEVER SAID</Text>
            <Text y={30} size={50} color={C.yellow}>$356</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const playing = w('c8g', 'playing');
    const dave = w('c8g', 'dave');
    const kept = w('c8g', 'kept');
    q(playing, 'sting', 0.6);
    q(dave, 'stamp', 0.7);
    q(kept, 'pop', 0.5);
    scene(A('c8g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('c8g'))}>
            <rect x={-520} y={-180} width={1040} height={360} rx={24} fill="#FFF3C4" stroke={C.ink} strokeWidth={6} />
            <Text y={-100} size={f >= playing ? 54 : 48} color={f >= playing ? C.red : C.ink}>DAVE WASN'T</Text>
            <Text y={-40} size={f >= playing ? 54 : 48} color={f >= playing ? C.red : C.ink}>PLAYING THE GAME</Text>
            <Text y={40} size={f >= dave ? 60 : 50} color={f >= dave ? C.red : C.ink}>THE GAME WAS</Text>
            <Text y={100} size={f >= dave ? 60 : 50} color={f >= dave ? C.red : C.ink}>PLAYING DAVE</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ RECAP ============
  {
    const one = w('r1', 'one');
    q(one, 'pop', 0.5);
    scene(A('r1'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={160} s={P(A('r1'))}><Text size={48} color={C.red}>WHAT DAVE LEARNED</Text></G2>
          <G2 x={960} y={440} s={P(A('r1'))}>
            <rect x={-540} y={-120} width={1080} height={240} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-50} size={48}>gems = dollars in costume</Text>
            <Text y={20} size={46} color={C.navy}>take the costume off</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const two = w('r2', 'two');
    const four = w('r2', 'four');
    q(two, 'pop', 0.5);
    q(four, 'pop', 0.5);
    scene(A('r2'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={440} s={P(A('r2'))}>
            <rect x={-560} y={-140} width={1120} height={280} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-70} size={f >= four ? 50 : 46}>about 4 in 100 pay for everyone</Text>
            <Text y={0} size={46}>the game hunts</Text>
            <Text y={60} size={52} color={C.red}>WHALES</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const three = w('r3', 'three');
    const bump = w('r3', 'bump');
    const two = w('r3', 'two');
    q(three, 'pop', 0.5);
    q(bump, 'pop', 0.5);
    q(two, 'tick', 0.5);
    scene(A('r3'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={440} s={P(A('r3'))}>
            <rect x={-560} y={-140} width={1120} height={280} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-70} size={48}>build the speed bump</Text>
            <Text y={0} size={50} color={C.red}>BEFORE 2 AM</Text>
            <Text y={70} size={44} color={GRAY}>not during</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ OUTRO ============
  {
    const next = w('r4', 'next');
    const bob = w('r4', 'bob');
    const divorce = w('r4', 'divorced');
    q(next, 'pop', 0.5);
    q(bob, 'pop', 0.5);
    q(divorce, 'pop', 0.5);
    scene(A('r4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={400} s={P(A('r4'))}>
            <Text y={-80} size={48}>next time:</Text>
            <Text y={-10} size={52} color={f >= bob ? C.navy : C.ink}>BOB IS GETTING DIVORCED</Text>
            <Text y={60} size={44} color={GRAY}>lawyer says it'll be quick</Text>
            <Text y={120} size={48} color={f >= divorce ? C.red : C.ink}>will it?</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const free = w('r5', 'free');
    const act = w('r5', 'actually');
    const no = w('r5', 'no');
    q(free, 'pop', 0.5);
    q(act, 'chime', 0.6);
    q(no, 'pop', 0.5);
    scene(A('r5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={660} y={560} s={1.2 * P(A('r5'))} />
          <Bell x={1260} y={560} s={1.2 * P(A('r5'))} />
          <G2 x={960} y={200} s={P(A('r5'))}>
            <Text y={-40} size={50}>subscribe</Text>
            <Text y={20} size={f >= free ? 56 : 48} color={f >= free ? C.green : C.ink}>FREE. ACTUALLY FREE.</Text>
            <Text y={100} size={44} color={GRAY}>no gems, no eggs, no coin flips</Text>
          </G2>
          <DamageMeter x={1700} y={90} s={0.8} value="SAVED ~$3,800/yr" saved={1} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  return (
    <>
      <Scenes f={f} items={S} />
      <Vignette />
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </>
  );
};
