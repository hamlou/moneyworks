import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lerp, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, Cam, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Interior, Progress, SceneItem, Scenes, Sfx, Street, SUB_FRAMES, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Clock, MoneyStack, Pencil, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Bell, Phone, Row, Sign, SubButton} from '../props2';
import {People} from '../props35';
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

const Box: React.FC<{x: number; y: number; w: number; h: number; o?: number; s?: number; fill?: string; children?: React.ReactNode}> = ({x, y, w, h, o = 1, s = 1, fill = '#fff', children}) => (
  <G2 x={x} y={y} o={o} s={s}>
    <rect x={-w / 2 + 8} y={-h / 2 + 10} width={w} height={h} rx={24} fill="rgba(35,35,43,0.10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />
    {children}
  </G2>
);
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
            <Clock f={ff} x={280} y={240} s={0.85 * bump(am, 0.1)} />
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
  const T = (x: number, y: number, txt: string, size = 48, color: string = C.ink, s = 1, o = 1) => (
    <G2 x={x} y={y} s={s} o={o}><Text size={size} color={color}>{txt}</Text></G2>
  );
  const Btn = (y: number, txt: string, fill: string, size = 30) => (
    <g>
      <rect x={-140} y={y - 40} width={280} height={80} rx={16} fill={fill} stroke={C.ink} strokeWidth={4} />
      <Text y={y + 4} size={size} color="#fff">{txt}</Text>
    </g>
  );

  {
    const dr = w('o6', 'dragons');
    const hid = w('o6', 'hid');
    q(dr, 'pop', 0.5);
    q(hid, 'sting', 0.6);
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <DragonEgg x={520} y={520} s={1.9 * P(A('o6')) * bump(dr, 0.08)} glow={f >= dr ? 0.9 : 0} />
          <Box x={1100} y={460} w={560} h={340} s={P(A('o6')) * bump(hid, 0.14)} fill={C.yellow}>
            <Text y={-90} size={40} color={GRAY}>the dragon's real price</Text>
            <Text y={30} size={130} color={C.red}>$ ? ? ?</Text>
          </Box>
          <G2 x={1100} y={720} s={bump(hid, 0.18)} o={lt(hid, 0.4)}><Stamp text="THE GAME HID IT" color={C.red} size={52} r={-4} /></G2>
          <Dave f={f} x={1560} y={930} s={1.1} flip keys={[{at: 0, pose: 'point_l', expr: 'suspicious', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1: Ten Gems Short ============
  {
    const ins = w('c1a', 'install');
    const ch = w('c1a', 'charge');
    const bus = w('c1a', 'bus');
    q(ins, 'click', 0.6);
    q(ch, 'ding', 0.5);
    q(bus, 'step', 0.5);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <GamePhone f={f} x={960} y={520} s={1.2 * P(A('c1a'))} screen={<><Text y={-200} size={34} color={C.yellow}>DRAGON QUEST</Text><DragonEgg y={-40} s={0.8} />{Btn(160, f >= ins ? 'INSTALLED' : 'INSTALL', C.green)}</>} />
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: ins, pose: 'thumbs', expr: 'grin', look: 0.6}]} />
          <G2 x={1480} y={420} s={P(A('c1a')) * bump(ch, 0.14)}><Stamp text="NO CARD. $0" color={C.green} size={56} r={-5} /></G2>
          {T(1480, 620, 'day one', 48, C.ink, P(A('c1a')))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const l1 = w('c1b', 'one');
    const l5 = w('c1b', 'five');
    const l10 = w('c1b', 'ten');
    const fr = w('c1b', 'free');
    q(l1, 'pop', 0.5);
    q(l5, 'pop2', 0.5);
    q(l10, 'pop', 0.5);
    q(fr, 'chime', 0.5);
    scene(A('c1b'), () => (
      <AbsoluteFill>
        <Street f={f} />
        <Svg>
          <GamePhone f={f} x={960} y={520} s={1.2} screen={<><Text y={-190} size={40} color={C.yellow}>{f >= l10 ? 'LEVEL 10' : f >= l5 ? 'LEVEL 5' : 'LEVEL 1'}</Text><DragonEgg y={0} s={0.9} glow={f >= fr ? 0.6 : 0} /><EnergyBar y={200} s={0.9} level={f >= l10 ? 30 : f >= l5 ? 60 : 100} /></>} />
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0.6}]} />
          {T(1480, 380, 'FREE', 80, C.green, P(A('c1b')) * bump(fr, 0.16))}
          {T(1480, 500, 'FREE', 80, C.green, P(A('c1b')) * bump(fr + 10, 0.16), lt(fr + 10, 0.4))}
          {T(1480, 620, 'FREE', 80, C.green, P(A('c1b')) * bump(fr + 20, 0.16), lt(fr + 20, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c1c', 'twelve');
    const boss = w('c1c', 'boss');
    const em = w('c1c', 'empty');
    q(tw, 'pop', 0.5);
    q(boss, 'sting', 0.6);
    q(em, 'trombone', 0.5);
    scene(A('c1c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={960} y={520} s={1.2} screen={<><Text y={-200} size={38} color={C.yellow}>LEVEL 12: BOSS</Text><Text y={-40} size={70} color={C.red}>{f >= boss ? 'YOU LOSE' : '. . .'}</Text><EnergyBar y={160} s={0.95} level={f >= em ? 0 : 20} /></>} />
          <Dave f={f} x={420} y={930} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'worried', look: 0.6}, {at: em, pose: 'facepalm', expr: 'sad', look: 0}]} sweat />
          {T(1500, 420, 'again', 56, C.red, P(A('c1c')) * bump(boss + 14, 0.14), lt(boss, 0.4))}
          {T(1500, 520, 'and again', 56, C.red, P(A('c1c')) * bump(boss + 30, 0.14), lt(boss + 20, 0.4))}
          <G2 x={1500} y={700} s={bump(em, 0.18)} o={lt(em, 0.35)}><Stamp text="ENERGY: 0" color={C.red} size={56} r={-5} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wait = w('c1d', 'wait');
    const ref = w('c1d', 'refill');
    q(wait, 'tick', 0.5);
    q(ref, 'ding', 0.6);
    scene(A('c1d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 140, 'two choices', 54, C.ink, P(A('c1d')))}
          <Box x={500} y={520} w={600} h={460} s={P(A('c1d')) * bump(wait, 0.1)}>
            <Text y={-150} size={44} color={GRAY}>CHOICE 1</Text>
            <Text y={150} size={60} color={C.ink}>WAIT 4 HOURS</Text>
          </Box>
          <Clock f={f} x={500} y={500} s={1.3 * P(A('c1d'))} />
          <Box x={1300} y={520} w={600} h={460} s={P(A('c1d')) * bump(ref, 0.14)} fill={f >= ref ? C.yellow : '#fff'}>
            <Text y={-150} size={44} color={GRAY}>CHOICE 2</Text>
            <Text y={150} size={56} color={C.red}>REFILL: 200 GEMS</Text>
          </Box>
          <GemDisplay x={1300} y={500} s={2.4 * P(A('c1d'))} gems={200} highlight={f >= ref ? 1 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nn = w('c1e', 'ninety');
    const ten = w('c1e', 'ten');
    const four = w('c1e', 'four');
    q(nn, 'pop', 0.5);
    q(ten, 'buzz', 0.6);
    q(four, 'cash', 0.6);
    scene(A('c1e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={320} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.6}, {at: ten, pose: 'shock', expr: 'angry', look: 0.6}]} />
          <Box x={820} y={420} w={520} h={320} s={P(A('c1e')) * bump(nn, 0.1)}>
            <Text y={-90} size={40} color={GRAY}>Dave has</Text>
            <Text y={20} size={110} color={C.navy}>190</Text>
            <Text y={110} size={36} color={GRAY}>needs 200</Text>
          </Box>
          <G2 x={820} y={700} s={bump(ten, 0.2)} o={lt(ten, 0.35)}><Stamp text="10 SHORT!" color={C.red} size={60} r={-5} /></G2>
          <GemPack x={1420} y={500} s={1.5 * P(A('c1e')) * bump(four, 0.1)} price="$4.99" gems={500} />
          {T(1420, 860, 'the smallest pack', 42, C.ink, P(A('c1e')), lt(four, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const park = w('c1f', 'park');
    const stop = w('c1f', 'stops');
    const dl = w('c1f', 'dollar');
    q(park, 'dream', 0.5);
    q(stop, 'clank', 0.6);
    q(dl, 'coin', 0.6);
    scene(A('c1f'), () => {
      const k = Math.min(1, ease(f, A('c1f'), stop));
      return (
        <AbsoluteFill>
          <DreamBg />
          <Svg>
            {T(960, 200, 'THEME PARK: FREE ENTRY', 54, C.navy, P(A('c1f')) * bump(park, 0.08))}
            <path d="M 200 860 L 900 380 Q 1000 320 1100 380 L 1720 860" fill="none" stroke={C.ink} strokeWidth={14} strokeLinejoin="round" />
            {[300, 480, 660, 840, 1160, 1340, 1520].map((x) => <path key={x} d={`M ${x} 860 V ${x < 1000 ? 860 - (x - 200) * 0.686 : 380 + (x - 1100) * 0.774}`} stroke={C.ink} strokeWidth={6} />)}
            <G2 x={lerp(260, 620, k)} y={lerp(800, 552, k)} r={-34}>
              <rect x={-90} y={-70} width={180} height={70} rx={14} fill={C.red} stroke={C.ink} strokeWidth={6} />
              <Dave f={f} x={0} y={-60} s={0.5} keys={[{at: 0, pose: 'celebrate', expr: 'happy'}, {at: stop, pose: 'shock', expr: 'shock'}]} />
            </G2>
            <G2 x={1160} y={640} s={bump(stop, 0.18)} o={lt(stop, 0.35)}>
              <rect x={-200} y={-90} width={400} height={180} rx={24} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
              <Text y={-20} size={44} color={C.ink}>to keep going:</Text>
              <Text y={46} size={64} color={C.red}>PAY $1</Text>
            </G2>
          </Svg>
          <DreamFrame label="THE ROLLER COASTER" />
        </AbsoluteFill>
      );
    });
  }
  {
    const buy = w('c1g', 'buy');
    const five = w('c1g', 'five');
    const pays = w('c1g', 'pays');
    q(buy, 'click', 0.7);
    q(five, 'cash', 0.6);
    q(pays, 'stamp', 0.8);
    scene(A('c1g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GamePhone f={f} x={520} y={520} s={1.15} screen={<><GemPack y={-60} s={0.8} price="$4.99" gems={500} />{Btn(190, f >= buy ? 'PAID' : 'BUY', C.green, 36)}</>} />
          <Dave f={f} x={980} y={930} s={1.1} keys={[{at: 0, pose: 'shrug', expr: 'neutral', look: -0.6}]} />
          <G2 x={980} y={380} s={P(A('c1g')) * bump(five, 0.12)}><Bubble text="five bucks, whatever" size={40} tail="down" /></G2>
          <Box x={1480} y={520} w={480} h={380} s={P(A('c1g')) * bump(pays, 0.14)} fill={f >= pays ? C.yellow : '#fff'}>
            <Text y={-120} size={34} color={GRAY}>what the game</Text>
            <Text y={-70} size={34} color={GRAY}>just learned:</Text>
            <Text y={50} size={90} color={C.red}>{f >= pays ? 'HE PAYS' : '? ? ?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2: Funny Money ============
  {
    const sh = w('c2a', 'shop');
    const wd = w('c2a', 'weird');
    q(sh, 'click', 0.6);
    q(wd, 'pop2', 0.5);
    scene(A('c2a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <GamePhone f={f} x={1000} y={540} s={1.25 * P(A('c2a')) * bump(sh, 0.06)} screen={<><Text y={-220} size={40} color={C.yellow}>SHOP</Text><GemDisplay y={-110} s={1.5} gems={320} /><GemDisplay y={10} s={1.5} gems={50} /><GemDisplay y={130} s={1.5} gems={900} /></>} />
          <Dave f={f} x={540} y={940} s={1.15} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: wd, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={540} y={480} s={bump(wd, 0.16)} o={lt(wd, 0.35)}><Bubble text="weird..." size={46} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const no = w('c2b', 'nothing');
    const egg = w('c2b', 'egg');
    const ff = w('c2b', 'fifty');
    q(no, 'buzz', 0.5);
    q(egg, 'pop', 0.5);
    q(ff, 'pop2', 0.5);
    scene(A('c2b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 160, 'nothing costs dollars', 56, C.red, P(A('c2b')) * bump(no, 0.1))}
          <DragonEgg x={420} y={540} s={1.5 * P(A('c2b')) * bump(egg, 0.1)} />
          <GemDisplay x={420} y={800} s={2.0 * P(A('c2b')) * bump(egg, 0.12)} gems={320} highlight={f >= egg ? 1 : 0} />
          <G2 x={1040} y={540} s={1.5 * P(A('c2b')) * bump(ff, 0.1)}>
            <path d="M -70 0 L 10 -70 L 10 -30 L 80 -30 L 80 30 L 10 30 L 10 70 Z" fill={C.blue} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
          </G2>
          {T(1040, 380, 'speed boost', 40, GRAY, P(A('c2b')))}
          <GemDisplay x={1040} y={800} s={2.0 * P(A('c2b')) * bump(ff, 0.12)} gems={50} highlight={f >= ff ? 1 : 0} />
          <Dave f={f} x={1560} y={930} s={1.1} flip keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pk = w('c2c', 'packs');
    const bst = w('c2c', 'best');
    q(pk, 'pop', 0.5);
    q(bst, 'ding', 0.6);
    scene(A('c2c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'gems only come in packs', 54, C.ink, P(A('c2c')) * bump(pk, 0.08))}
          <GemPack x={400} y={560} s={1.25 * P(A('c2c'))} price="$4.99" gems={500} />
          <GemPack x={860} y={560} s={1.45 * P(A('c2c')) * bump(bst, 0.1)} price="$19.99" gems={2400} best={1} />
          <GemPack x={1320} y={560} s={1.25 * P(A('c2c'))} price="$99.99" gems={8080} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fo = w('c2d', 'foreign');
    const th = w('c2d', 'three');
    const pa = w('c2d', 'paper');
    q(fo, 'dream', 0.5);
    q(th, 'flip', 0.5);
    q(pa, 'paper', 0.6);
    scene(A('c2d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          {T(960, 200, 'FUNNY MONEY LAND', 56, C.navy, P(A('c2d')) * bump(fo, 0.08))}
          {[0, 1, 2, 3].map((i) => (
            <G2 key={i} x={420 + i * 110} y={520 + (i % 2) * 40} r={-12 + i * 8} s={1.3 * P(A('c2d'))}>
              <rect x={-90} y={-50} width={180} height={100} rx={10} fill={['#F78FB3', '#63CDDA', '#F5CD79', '#B8E994'][i]} stroke={C.ink} strokeWidth={5} />
              <Text y={4} size={40}>{['Z 50', 'Q 320', 'Z 9', 'Q 75'][i]}</Text>
            </G2>
          ))}
          <Dave f={f} x={1160} y={930} s={1.15} keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: th, pose: 'present', expr: 'happy', look: 0.6}]} />
          <Stick f={f} x={1560} y={930} s={1.1} acc={['ponytail']} seed={44} flip keys={[{at: 0, pose: 'idle', expr: 'grin', look: -0.6}]} />
          {T(1360, 400, f >= th ? 'day 3: just hand it over' : 'day 1: do the math', 44, f >= th ? C.red : C.ink, bump(th, 0.12))}
        </Svg>
        <DreamFrame label="FOREIGN COUNTRY" />
      </AbsoluteFill>
    ));
  }
  {
    const fd = w('c2e', 'fined');
    const ml = w('c2e', 'million');
    q(fd, 'paper', 0.6);
    q(ml, 'stamp', 0.8);
    scene(A('c2e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={480} y={540} s={0.95 * P(A('c2e')) * bump(fd, 0.06)} org="FTC" sub="Federal Trade Commission" title={['Genshin Impact', 'settlement']} stat="JAN 2025" />
          <Box x={1280} y={500} w={720} h={380} s={P(A('c2e')) * bump(ml, 0.12)} fill={f >= ml ? C.yellow : '#fff'}>
            <Text y={-110} size={40} color={GRAY}>fine for the game's maker</Text>
            <Text y={30} size={120} color={C.red}>{f >= ml ? '$20 MILLION' : '$ ? MILLION'}</Text>
          </Box>
          <SourceTag f={f} at={fd} text="FTC, Jan 2025: Genshin Impact developer to pay $20 million" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ly = w('c2f', 'layers');
    const hd = w('c2f', 'hid');
    q(ly, 'pop', 0.5);
    q(hd, 'sting', 0.6);
    scene(A('c2f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 150, 'layers of virtual money', 54, C.ink, P(A('c2f')) * bump(ly, 0.08))}
          <Box x={360} y={520} w={380} h={240} s={P(A('c2f'))} fill="#E3F6EA"><Text y={-30} size={40} color={GRAY}>real</Text><Text y={50} size={80} color={C.green}>$</Text></Box>
          {T(640, 520, '>', 90, C.ink, P(A('c2f')))}
          <Box x={920} y={520} w={380} h={240} s={P(A('c2f'))} fill="#E8E4F6"><Text y={-30} size={40} color={GRAY}>gems</Text><Text y={50} size={70} color="#5C4A8C">8,080</Text></Box>
          {T(1200, 520, '>', 90, C.ink, P(A('c2f')))}
          <Box x={1480} y={520} w={380} h={240} s={P(A('c2f'))} fill="#FFE3EA"><Text y={-30} size={40} color={GRAY}>pulls</Text><Text y={50} size={70} color={C.red}>x 160</Text></Box>
          <G2 x={960} y={820} s={bump(hd, 0.16)} o={lt(hd, 0.35)}><Stamp text="REAL PRICE: HIDDEN" color={C.red} size={56} r={-3} /></G2>
          <SourceTag f={f} at={ly} text="FTC complaint (2025): multi-tiered virtual currency obscured real costs" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const nin = w('c2g', 'nineteen');
    const lf = w('c2g', 'leftovers');
    q(nin, 'cash', 0.6);
    q(lf, 'boing', 0.5);
    scene(A('c2g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GemPack x={460} y={540} s={1.6 * P(A('c2g')) * bump(nin, 0.1)} price="$19.99" gems={2400} best={1} />
          <Dave f={f} x={980} y={930} s={1.1} keys={[{at: 0, pose: 'typing', expr: 'neutral', look: -0.6}, {at: lf, pose: 'shrug', expr: 'suspicious', look: 0.6}]} />
          <Box x={1460} y={500} w={520} h={380} s={P(A('c2g')) * bump(lf, 0.14)} fill={f >= lf ? C.yellow : '#fff'}>
            <Text y={-120} size={38} color={GRAY}>after shopping</Text>
            <Text y={0} size={110} color="#5C4A8C">{f >= lf ? '80' : '?'}</Text>
            <Text y={110} size={40} color={C.red}>gems left over</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const qk = w('c2h', 'quick');
    const hn = w('c2h', 'hundred');
    const cm = w('c2h', 'comments');
    q(qk, 'pop', 0.6);
    for (let i = 0; i < 8; i++) q(qk + 20 + i * 30, 'tick', 0.35);
    q(cm, 'key', 0.5);
    scene(A('c2h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 150, 'QUICK GUESS', 72, C.red, P(A('c2h')) * bump(qk, 0.12))}
          <Box x={1040} y={480} w={980} h={400} s={P(A('c2h')) * bump(hn, 0.06)} fill={C.yellow}>
            <Text y={-130} size={40} color={GRAY}>out of every 100 players, on a normal day</Text>
            <Text y={-70} size={40} color={GRAY}>how many pay anything at all?</Text>
            <Text y={90} size={170} color={C.ink}>? / 100</Text>
          </Box>
          <Clock f={f * 6} x={300} y={480} s={1.5 * P(A('c2h'))} />
          {T(960, 800, 'write your number in the comments', 46, C.navy, bump(cm, 0.1), lt(cm, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sea = w('c2i', 'season');
    q(sea, 'ding', 0.7);
    scene(A('c2i'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <GamePhone f={f} x={1000} y={540} s={1.2 * P(A('c2i'))} glow={f >= sea ? 0.8 : 0} screen={<><Text y={-180} size={30} color="#fff">NEW MESSAGE</Text><rect x={-140} y={-110} width={280} height={220} rx={20} fill="#2A2D4A" stroke={C.yellow} strokeWidth={5} /><Text y={-40} size={38} color={C.yellow}>SEASON 3</Text><Text y={30} size={38} color={C.yellow}>STARTS NOW</Text></>} />
          <Dave f={f} x={540} y={940} s={1.15} keys={[{at: 0, pose: 'relax', expr: 'tired', look: 0.6}, {at: sea, pose: 'shock', expr: 'shock', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH3: The Chore Chart You Bought ============
  {
    const ps = w('c3a', 'pass');
    const nn = w('c3a', 'nine');
    const hn = w('c3a', 'hundred');
    q(ps, 'pop', 0.5);
    q(nn, 'cash', 0.6);
    q(hn, 'ding', 0.5);
    scene(A('c3a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SeasonPass x={620} y={520} s={1.5 * P(A('c3a')) * bump(ps, 0.06)} tier={0} />
          <Box x={1420} y={380} w={440} h={240} s={P(A('c3a')) * bump(nn, 0.14)} fill={C.yellow}><Text y={-50} size={38} color={GRAY}>price</Text><Text y={40} size={90} color={C.red}>$9.99</Text></Box>
          <Box x={1420} y={680} w={440} h={240} s={P(A('c3a')) * bump(hn, 0.12)}><Text y={-50} size={52} color={C.navy}>100 rewards</Text><Text y={40} size={44} color={C.ink}>over 30 days</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const py = w('c3b', 'pay');
    const pl = w('c3b', 'playing');
    const ev = w('c3b', 'every');
    q(py, 'buzz', 0.5);
    q(pl, 'pop', 0.5);
    q(ev, 'stamp', 0.7);
    scene(A('c3b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={460} y={420} w={560} h={300} s={P(A('c3b')) * bump(py, 0.08)} fill="#FFE3EA">
            <Text y={-60} size={44} color={GRAY}>you PAID $9.99</Text>
            <Text y={40} size={56} color={C.red}>rewards: 0</Text>
          </Box>
          {T(840, 420, '>', 100, C.ink, P(A('c3b')))}
          <Box x={1240} y={420} w={600} h={300} s={P(A('c3b')) * bump(pl, 0.1)} fill="#E3F6EA">
            <Text y={-60} size={44} color={GRAY}>you EARN them</Text>
            <Text y={40} size={56} color={C.green}>by playing</Text>
          </Box>
          <Dave f={f} x={460} y={950} s={0.95} keys={[{at: 0, pose: 'typing', expr: 'tired', look: 0.6}]} />
          <G2 x={1180} y={800} s={bump(ev, 0.16)} o={lt(ev, 0.35)}><Stamp text="EVERY SINGLE DAY" color={C.red} size={60} r={-3} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ms = w('c3c', 'miss');
    const en = w('c3c', 'ends');
    const sl = w('c3c', 'sale');
    q(ms, 'buzz', 0.5);
    q(en, 'thud', 0.6);
    q(sl, 'cash', 0.6);
    scene(A('c3c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={560} y={480} s={P(A('c3c'))}>
            {Array.from({length: 14}).map((_, i) => (
              <g key={i} transform={`translate(${(i % 7) * 100 - 300},${Math.floor(i / 7) * 110 - 60})`}>
                <rect x={-42} y={-42} width={84} height={84} rx={12} fill={i < 5 ? C.green : f >= ms && i < 9 ? '#FFE3EA' : '#fff'} stroke={C.ink} strokeWidth={5} />
                <Text y={4} size={40} color={i < 5 ? '#fff' : C.red}>{i < 5 ? '✓' : f >= ms && i < 9 ? 'x' : ''}</Text>
              </g>
            ))}
            <Text y={-150} size={40} color={GRAY}>SEASON CALENDAR</Text>
          </G2>
          <SeasonPass x={1380} y={420} s={0.95 * P(A('c3c')) * bump(en, 0.08)} tier={30} />
          <G2 x={1380} y={420} s={bump(en, 0.18)} o={lt(en, 0.0001)}><Stamp text="SEASON OVER" color={C.red} size={56} r={-8} /></G2>
          <G2 x={1380} y={780} s={bump(sl, 0.16)} o={lt(sl, 0.35)}><Sign text="NEW PASS: $9.99" color={C.green} /></G2>
          <Dave f={f} x={560} y={950} s={0.9} keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0.6}, {at: en, pose: 'facepalm', expr: 'sad', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const chr = w('c3d', 'chore');
    const mid = w('c3d', 'midnight');
    const stk = w('c3d', 'stickers');
    q(chr, 'dream', 0.5);
    q(mid, 'tick', 0.5);
    q(stk, 'pop', 0.5);
    scene(A('c3d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <Box x={620} y={540} w={640} h={560} s={P(A('c3d')) * bump(chr, 0.06)}>
            <Text y={-220} size={46} color={C.navy}>CHORE CHART: $10</Text>
            {['dishes', 'laundry', 'vacuum', 'trash'].map((c, i) => (
              <g key={c} transform={`translate(0,${-120 + i * 90})`}>
                <Text x={-240} y={4} size={40} anchor="start">{c}</Text>
                <circle cx={200} cy={0} r={30} fill={i < 2 || f >= stk ? C.yellow : '#fff'} stroke={C.ink} strokeWidth={5} />
              </g>
            ))}
          </Box>
          <Clock f={f} x={1200} y={380} s={1.2 * P(A('c3d')) * bump(mid, 0.12)} />
          {T(1200, 560, 'MIDNIGHT', 44, C.red, P(A('c3d')) * bump(mid, 0.1), lt(mid, 0.4))}
          <Dave f={f} x={1500} y={930} s={1.1} flip keys={[{at: 0, pose: 'carry', expr: 'tired', look: -0.6}]} sweat />
        </Svg>
        <DreamFrame label="THE CHORE CHART" />
      </AbsoluteFill>
    ));
  }
  {
    const by = w('c3e', 'buys');
    const el = w('c3e', 'eleven');
    const cl = w('c3e', 'claim');
    q(by, 'cash', 0.6);
    q(el, 'tick', 0.5);
    q(cl, 'click', 0.7);
    scene(A('c3e'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <GamePhone f={f} x={1000} y={540} s={1.2} screen={<><Text y={-200} size={34} color={C.yellow}>DAILY REWARD</Text><Text y={-110} size={56} color="#fff">11:58 PM</Text><DragonEgg y={30} s={0.6} />{Btn(200, f >= cl ? 'CLAIMED' : 'CLAIM', C.green, 34)}</>} />
          <Dave f={f} x={540} y={940} s={1.15} keys={[{at: 0, pose: 'typing', expr: 'tired', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wm = w('c3f', 'warm');
    const fri = w('c3f', 'friday');
    const gl = w('c3f', 'glowing');
    q(wm, 'pop', 0.5);
    q(fri, 'flip', 0.5);
    q(gl, 'sting', 0.7);
    scene(A('c3f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(700, 160, 'the pass was just the warm up', 50, C.ink, P(A('c3f')) * bump(wm, 0.08))}
          <Calendar x={520} y={520} s={1.3 * P(A('c3f')) * bump(fri, 0.1)} year="FRI" flip={0} top="THAT" />
          <DragonEgg x={1200} y={540} s={2.0 * P(A('c3f')) * bump(gl, 0.1)} glow={f >= gl ? 1 : 0.3} />
          <Dave f={f} x={860} y={950} s={0.95} keys={[{at: 0, pose: 'idle', expr: 'suspicious', look: 0.6}, {at: gl, pose: 'shock', expr: 'money', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH4: The Glowing Egg ============
  {
    const bn = w('c4a', 'banner');
    const lg = w('c4a', 'legendary');
    const fy = w('c4a', 'forty');
    q(bn, 'whoosh', 0.6);
    q(lg, 'chime', 0.7);
    q(fy, 'tick', 0.5);
    scene(A('c4a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BannerAd f={f} x={860} y={500} s={1.6 * P(A('c4a')) * bump(bn, 0.06) * bump(lg, 0.06)} />
          <Dave f={f} x={1600} y={930} s={1.1} flip keys={[{at: 0, pose: 'shock', expr: 'money', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pulls = w('c4b', 'pulls');
    const cracks = w('c4b', 'cracks');
    const rnd = w('c4b', 'random');
    q(pulls, 'pop', 0.5);
    q(cracks, 'rip', 0.6);
    q(rnd, 'boing', 0.5);
    scene(A('c4b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, "you can't buy the dragon", 54, C.ink, P(A('c4b')))}
          <Box x={420} y={540} w={480} h={320} s={P(A('c4b')) * bump(pulls, 0.12)} fill={C.yellow}>
            <Text y={-50} size={50} color={GRAY}>you buy</Text>
            <Text y={50} size={100} color={C.red}>PULLS</Text>
          </Box>
          {T(800, 540, '>', 100, C.ink, P(A('c4b')))}
          <DragonEgg x={1080} y={540} s={1.6 * P(A('c4b')) * bump(cracks, 0.1)} crack={f >= cracks ? 1 : 0} />
          <PullCard x={1500} y={540} s={1.1 * P(A('c4b')) * bump(rnd, 0.12)} item={f >= rnd ? '? ? ?' : ' '} rarity="common" />
          {T(1500, 800, 'a random prize', 42, C.ink, P(A('c4b')), lt(rnd, 0.4))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const zr = w('c4c', 'zero');
    const on = w('c4c', 'one');
    q(zr, 'stamp', 0.7);
    q(on, 'pop', 0.5);
    scene(A('c4c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'the small print', 50, GRAY, P(A('c4c')))}
          <Box x={520} y={500} w={680} h={400} s={P(A('c4c')) * bump(zr, 0.12)} fill={f >= zr ? C.yellow : '#fff'}>
            <Text y={-120} size={40} color={GRAY}>legendary chance per pull</Text>
            <Text y={40} size={170} color={C.red}>{f >= zr ? '0.6%' : '?%'}</Text>
          </Box>
          <Box x={1320} y={500} w={560} h={400} s={P(A('c4c')) * bump(on, 0.12)}>
            <Text y={-120} size={40} color={GRAY}>about</Text>
            <Text y={30} size={110} color={C.navy}>{f >= on ? '1 in 167' : '1 in ?'}</Text>
          </Box>
          <SourceTag f={f} at={zr} text="Genshin Impact published rates: 0.6% base chance for a 5-star" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ce = w('c4d', 'cereal');
    const gd = w('c4d', 'gold');
    const ar = w('c4d', 'air');
    q(ce, 'dream', 0.5);
    q(gd, 'ding', 0.6);
    q(ar, 'poof', 0.6);
    scene(A('c4d'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <G2 key={i} x={320 + i * 250} y={540} s={1.25 * P(A('c4d')) * (i === 3 ? bump(gd, 0.16) : 1)}>
              <rect x={-80} y={-130} width={160} height={260} rx={10} fill={i === 3 && f >= gd ? C.yellow : '#9B59B6'} stroke={C.ink} strokeWidth={6} />
              <Text y={-70} size={30} color="#fff">CEREAL</Text>
              <Text y={20} size={50} color="#fff">{i === 3 && f >= gd ? '★' : '?'}</Text>
              <Text y={100} size={30} color="#fff">$2</Text>
            </G2>
          ))}
          {T(960, 240, '1 box in 167 has the gold toy', 50, C.navy, P(A('c4d')) * bump(gd, 0.08))}
          {T(960, 860, 'and the cereal is air', 52, C.red, bump(ar, 0.14), lt(ar, 0.35))}
        </Svg>
        <DreamFrame label="THE CEREAL LOTTERY" />
      </AbsoluteFill>
    ));
  }
  {
    const ninety = w('c4e', 'ninety');
    const tm = w('c4e', 'timer');
    q(ninety, 'pop', 0.6);
    q(tm, 'tick', 0.6);
    scene(A('c4e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={520} y={480} w={620} h={400} s={P(A('c4e')) * bump(ninety, 0.12)} fill={C.yellow}>
            <Text y={-120} size={40} color={GRAY}>guaranteed legendary by</Text>
            <Text y={40} size={150} color={C.red}>PULL 90</Text>
          </Box>
          <Clock f={f * 8} x={1160} y={420} s={1.5 * P(A('c4e')) * bump(tm, 0.1)} />
          {T(1160, 660, '48 hours', 48, C.red, P(A('c4e')) * bump(tm, 0.12))}
          <Dave f={f} x={1560} y={930} s={1.1} flip keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: tm, pose: 'panic', expr: 'worried', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bg = w('c4f', 'big');
    const ff = w('c4f', 'fifty');
    const sw = w('c4f', 'sword');
    const sd = w('c4f', 'shield');
    const pt = w('c4f', 'potato');
    q(bg, 'cash', 0.7);
    q(ff, 'chime', 0.5);
    q(sw, 'thud', 0.5);
    q(sd, 'thud', 0.5);
    q(pt, 'trombone', 0.6);
    scene(A('c4f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <GemPack x={320} y={500} s={1.3 * P(A('c4f')) * bump(bg, 0.1)} price="$99.99" gems={8080} />
          {T(320, 820, '50 pulls', 50, C.navy, P(A('c4f')) * bump(ff, 0.12))}
          <PullCard x={800} y={500} s={1.0 * P(A('c4f')) * bump(sw, 0.14)} item={f >= sw ? 'SWORD' : '?'} rarity="common" rainbow={f >= ff && f < sw ? 0.8 : 0} />
          <PullCard x={1100} y={500} s={1.0 * P(A('c4f')) * bump(sd, 0.14)} item={f >= sd ? 'SHIELD' : '?'} rarity="common" />
          <PullCard x={1400} y={500} s={1.0 * P(A('c4f')) * bump(pt, 0.18)} item={f >= pt ? 'POTATO' : '?'} rarity="common" />
          <Dave f={f} x={1100} y={960} s={0.85} keys={[{at: 0, pose: 'celebrate', expr: 'money', look: 0}, {at: pt, pose: 'facepalm', expr: 'sad', look: 0}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sixty = w('c4g', 'sixty');
    const no = w('c4g', 'no');
    const un = w('c4g', 'unluckiest');
    const bl = w('c4g', 'built');
    q(sixty, 'pop', 0.5);
    q(no, 'buzz', 0.6);
    q(un, 'trombone', 0.5);
    q(bl, 'sting', 0.7);
    scene(A('c4g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={420} y={380} w={440} h={260} s={P(A('c4g')) * bump(sixty, 0.12)} fill={C.navy}>
            <Text y={-50} size={44} color="#fff">PULLS</Text>
            <Text y={50} size={100} color={C.yellow}>60</Text>
          </Box>
          <DragonEgg x={960} y={400} s={1.3 * P(A('c4g'))} />
          <G2 x={960} y={400} s={0.4 * bump(no, 0.2)} o={lt(no, 0.0001)}><XMark /></G2>
          <Dave f={f} x={420} y={950} s={1.0} keys={[{at: 0, pose: 'shock', expr: 'sad', look: 0.6}]} sweat />
          <Box x={1420} y={560} w={560} h={380} s={P(A('c4g')) * bump(bl, 0.14)} fill={f >= bl ? C.yellow : '#fff'}>
            <Text y={-120} size={38} color={GRAY}>not unlucky.</Text>
            <Text y={-20} size={48} color={C.red}>{f >= bl ? 'EXACTLY WHO' : '. . .'}</Text>
            <Text y={50} size={48} color={C.red}>{f >= bl ? 'THIS GAME WAS' : ' '}</Text>
            <Text y={120} size={48} color={C.red}>{f >= bl ? 'BUILT FOR' : ' '}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH5: Who Pays The Bills? ============
  {
    const wh = w('c5a', 'who');
    q(wh, 'pop', 0.5);
    scene(A('c5a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={560} y={940} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.6}]} />
          <G2 x={1040} y={500} s={P(A('c5a')) * bump(wh, 0.12)}>
            <rect x={-330} y={-170} width={660} height={340} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-60} size={50} color={GRAY}>free games:</Text>
            <Text y={50} size={66} color={C.red}>WHO PAYS?</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pl = w('c5b', 'playtika');
    const rg = w('c5b', 'regulators');
    q(pl, 'paper', 0.6);
    q(rg, 'ding', 0.5);
    scene(A('c5b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={620} y={540} s={1.15 * P(A('c5b')) * bump(pl, 0.06)} org="PLAYTIKA" sub="mobile game company" title={['Annual Report', '(Form 10-K)']} stat="2025" />
          <Dave f={f} x={1280} y={930} s={1.1} flip keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.6}]} />
          {T(1400, 400, 'numbers filed with', 40, GRAY, P(A('c5b')), lt(rg, 0.4))}
          {T(1400, 480, 'U.S. regulators', 50, C.navy, P(A('c5b')) * bump(rg, 0.12), lt(rg, 0.4))}
          <SourceTag f={f} at={pl} text="Playtika Holding Corp., Form 10-K for fiscal year 2025" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gs = w('c5c', 'guess');
    const eg = w('c5c', 'eight');
    const pd = w('c5c', 'paid');
    q(gs, 'pop', 0.6);
    q(eg, 'crowd', 0.4);
    q(pd, 'stamp', 0.8);
    scene(A('c5c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'REMEMBER YOUR GUESS?', 56, C.red, P(A('c5c')) * bump(gs, 0.1))}
          <Box x={500} y={520} w={680} h={380} s={P(A('c5c')) * bump(eg, 0.08)}>
            <Text y={-110} size={40} color={GRAY}>played on an average day</Text>
            <Text y={40} size={110} color={C.navy}>{f >= eg ? '8,500,000' : '? ? ?'}</Text>
          </Box>
          <Box x={1320} y={520} w={680} h={380} s={P(A('c5c')) * bump(pd, 0.14)} fill={f >= pd ? C.yellow : '#fff'}>
            <Text y={-110} size={40} color={GRAY}>paid anything</Text>
            <Text y={40} size={110} color={C.red}>{f >= pd ? '370,000' : '? ? ?'}</Text>
          </Box>
          <SourceTag f={f} at={eg} text="Playtika 10-K (2025): about 8.5M daily active users, about 370K daily paying users" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('c5d', 'four');
    const nn = w('c5d', 'ninety');
    const bl = w('c5d', 'billion');
    q(fr, 'pop', 0.6);
    q(nn, 'pop2', 0.5);
    q(bl, 'cash', 0.8);
    scene(A('c5d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <People x={540} y={560} s={1.15 * P(A('c5d'))} n={100} hot={f >= fr ? 4 : 0} />
          <Box x={1300} y={340} w={520} h={220} s={P(A('c5d')) * bump(nn, 0.1)}><Text y={-30} size={80} color={GRAY}>96</Text><Text y={50} size={40} color={C.ink}>play free</Text></Box>
          <Box x={1300} y={580} w={520} h={220} s={P(A('c5d')) * bump(fr, 0.12)} fill="#FFE3EA"><Text y={-30} size={80} color={C.red}>4</Text><Text y={50} size={40} color={C.ink}>pay the bills</Text></Box>
          <Box x={1300} y={820} w={520} h={200} s={P(A('c5d')) * bump(bl, 0.14)} fill={f >= bl ? C.yellow : '#fff'}><Text y={6} size={60} color={C.red}>{f >= bl ? '$2.7 BILLION' : '$ ? BILLION'}</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const rs = w('c5e', 'restaurant');
    const fe = w('c5e', 'free');
    const ds = w('c5e', 'dessert');
    q(rs, 'dream', 0.5);
    q(fe, 'pop', 0.5);
    q(ds, 'ding', 0.6);
    scene(A('c5e'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <rect x={260} y={600} width={1000} height={30} rx={10} fill="#C98F5A" stroke={C.ink} strokeWidth={6} />
          {[0, 1, 2, 3, 4, 5].map((i) => <Stick key={i} f={f} x={340 + i * 150} y={590} s={0.6} seed={90 + i} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0}]} />)}
          {T(700, 720, '96 eat free', 46, GRAY, P(A('c5e')) * bump(fe, 0.1))}
          <Stick f={f} x={1260} y={590} s={0.6} seed={97} acc={['glasses']} keys={[{at: 0, pose: 'celebrate', expr: 'money', look: 0}]} />
          <G2 x={1260} y={300} s={bump(ds, 0.18)} o={lt(ds, 0.35)}><Bubble text="dessert, please!" size={40} tail="down" /></G2>
          <Stick f={f} x={1560} y={930} s={1.1} acc={['tie']} seed={98} flip keys={[{at: 0, pose: 'idle', expr: 'neutral', look: -0.3}, {at: ds, pose: 'point_l', expr: 'money', look: -0.8}]} />
          {T(1560, 520, 'the waiter', 40, C.ink, P(A('c5e')))}
        </Svg>
        <DreamFrame label="THE RESTAURANT" />
      </AbsoluteFill>
    ));
  }
  {
    const wl = w('c5f', 'whales');
    const st = w('c5f', 'study');
    q(wl, 'sting', 0.6);
    q(st, 'paper', 0.6);
    scene(A('c5f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={540} y={500} s={1.5 * P(A('c5f')) * bump(wl, 0.1)}>
            <path d="M -220 0 Q -160 -140 40 -120 Q 220 -100 230 20 Q 200 120 20 120 Q -140 120 -220 0 Z" fill="#5C7CFA" stroke={C.ink} strokeWidth={6} />
            <path d="M -220 0 L -300 -70 L -280 0 L -300 70 Z" fill="#5C7CFA" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <circle cx={130} cy={-20} r={12} fill={C.ink} />
            <path d="M 60 -124 Q 50 -190 20 -200 M 60 -124 Q 80 -190 110 -196" fill="none" stroke="#5C7CFA" strokeWidth={8} strokeLinecap="round" />
            <Text x={-20} y={40} size={50} color={C.yellow}>$$$</Text>
          </G2>
          {T(540, 800, 'the biggest spenders: WHALES', 46, C.navy, P(A('c5f')) * bump(wl, 0.08))}
          <SourceCard x={1380} y={520} s={0.9 * P(A('c5f')) * bump(st, 0.08)} org="ADDICTIVE BEHAVIORS" sub="peer-reviewed journal" title={['7,767 loot box', 'buyers studied']} stat="2021" />
          <SourceTag f={f} at={st} text="Close et al. (2021), Addictive Behaviors: secondary analysis of loot box purchasers" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fv = w('c5g', 'five');
    const hf = w('c5g', 'half');
    q(fv, 'pop', 0.6);
    q(hf, 'stamp', 0.8);
    scene(A('c5g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'who brings in the loot box money?', 50, C.ink, P(A('c5g')))}
          <G2 x={480} y={900}><Bar h={110} w={300} color={C.navy} label="top 5% of spenders" value="5%" /></G2>
          {T(880, 620, '>', 110, C.ink, P(A('c5g')) * bump(fv, 0.1))}
          <G2 x={1280} y={900}><Bar h={f >= hf ? lerp(110, 520, ease(f, hf, hf + 18)) : 110} w={300} color={C.red} label="of all the money" value={f >= hf ? '50%' : '?'} /></G2>
          <SourceTag f={f} at={fv} text="Close et al. (2021): top 5% (over $100/month) generated about half of loot box revenue" />
          <Dave f={f} x={1640} y={930} s={1.05} flip keys={[{at: 0, pose: 'think', expr: 'think', look: -0.6}, {at: hf, pose: 'shock', expr: 'shock', look: -0.6}]} />
          <Box x={880} y={360} w={420} h={170} s={P(A('c5g'))}><Text y={-30} size={34} color={GRAY}>paying over</Text><Text y={36} size={50} color={C.red}>$100 / month</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const vl = w('c5h', 'villain');
    const mc = w('c5h', 'machine');
    const ap = w('c5h', 'apples');
    const th = w('c5h', 'thirty');
    q(vl, 'sting', 0.8);
    q(mc, 'clank', 0.6);
    q(ap, 'pop', 0.5);
    q(th, 'coin', 0.6);
    scene(A('c5h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(700, 150, 'THE VILLAIN', 64, C.red, P(A('c5h')) * bump(vl, 0.12))}
          <Box x={560} y={540} w={720} h={480} s={P(A('c5h')) * bump(mc, 0.08)} fill="#2A2D4A">
            <Text y={-170} size={44} color={C.yellow}>THE MONEY MACHINE</Text>
            <circle cx={-180} cy={10} r={90} fill="none" stroke={C.yellow} strokeWidth={14} strokeDasharray="40 24" strokeDashoffset={f * 3} />
            <circle cx={60} cy={60} r={64} fill="none" stroke="#fff" strokeWidth={12} strokeDasharray="30 20" strokeDashoffset={-f * 3} />
            <Text x={200} y={-20} size={36} color="#fff">find the few</Text>
            <Text x={200} y={40} size={36} color="#fff">who pay a lot</Text>
            <Text y={190} size={40} color={C.yellow}>keep them paying</Text>
          </Box>
          <Apple x={1240} y={570} s={1.15 * P(A('c5h')) * bump(ap, 0.1)} />
          <Box x={1240} y={800} w={420} h={170} s={P(A('c5h')) * bump(th, 0.14)} fill={f >= th ? C.yellow : '#fff'}>
            <Text y={-30} size={36} color={GRAY}>standard cut</Text>
            <Text y={40} size={70} color={C.red}>{f >= th ? '30%' : '?%'}</Text>
          </Box>
          <Raccoon f={f} x={1640} y={860} s={0.8 * P(A('c5h'))} mood="greedy" holdCoin />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const yt = w('c5i', 'yachts');
    const wr = w('c5i', 'wrong');
    q(yt, 'dream', 0.4);
    q(wr, 'sting', 0.6);
    scene(A('c5i'), () => (
      <AbsoluteFill>
        <DreamBg />
        <Svg>
          <G2 x={1000} y={560} s={1.5 * P(A('c5i'))}>
            <path d="M -260 40 H 260 L 200 120 H -200 Z" fill="#fff" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <rect x={-120} y={-30} width={200} height={70} rx={8} fill="#DDEBF7" stroke={C.ink} strokeWidth={6} />
            <path d="M 0 -30 V -150 L 110 -60 Z" fill={C.red} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
          </G2>
          <Banker f={f} x={1000} y={560} s={0.7} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0}]} />
          {T(1000, 220, 'whales = rich guys with yachts?', 50, C.navy, P(A('c5i')) * bump(yt, 0.08))}
          <Dave f={f} x={360} y={930} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <G2 x={1000} y={860} s={bump(wr, 0.16)} o={lt(wr, 0.35)}><Stamp text="SO WRONG" color={C.red} size={60} r={-4} /></G2>
        </Svg>
        <DreamFrame label="WHAT DAVE FIGURED" />
      </AbsoluteFill>
    ));
  }

  // ============ CH6: Whales Aren't Rich ============
  {
    const ml = w('c6a', 'millionaires');
    const np = w('c6a', 'nope');
    q(ml, 'pop', 0.5);
    q(np, 'buzz', 0.7);
    scene(A('c6a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Banker f={f} x={620} y={900} s={1.3} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.6}]} />
          <MoneyStack x={1000} y={760} s={1.5 * P(A('c6a'))} n={7} label="WHALE = MILLIONAIRE?" />
          <G2 x={840} y={480} s={1.0 * bump(np, 0.2)} o={lt(np, 0.0001)}><Stamp text="NOPE" color={C.red} size={90} r={-8} /></G2>
          <Dave f={f} x={1500} y={930} s={1.1} flip keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.6}, {at: np, pose: 'shock', expr: 'shock', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const st = w('c6b', 'study');
    const no = w('c6b', 'no');
    q(st, 'paper', 0.5);
    q(no, 'stamp', 0.8);
    scene(A('c6b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'do big spenders earn more?', 52, C.ink, P(A('c6b')))}
          <Box x={460} y={520} w={480} h={320} s={P(A('c6b'))} fill="#FFE3EA"><Text y={-60} size={44} color={GRAY}>SPENDING</Text><Text y={50} size={90} color={C.red}>$$$</Text></Box>
          <Box x={1320} y={520} w={480} h={320} s={P(A('c6b'))} fill="#E3F6EA"><Text y={-60} size={44} color={GRAY}>INCOME</Text><Text y={50} size={90} color={C.green}>$ ?</Text></Box>
          <path d="M 720 520 H 1060" stroke={C.ink} strokeWidth={10} strokeDasharray="22 16" />
          <G2 x={890} y={520} s={bump(no, 0.2)} o={lt(no, 0.35)}><Stamp text="NO LINK" color={C.red} size={60} r={-6} /></G2>
          <SourceTag f={f} at={st} text="Close et al. (2021): no link between loot box spending and income" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const gm = w('c6c', 'gambling');
    const rk = w('c6c', 'risk');
    q(gm, 'sting', 0.6);
    q(rk, 'stamp', 0.7);
    scene(A('c6c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'what DID go up with spending?', 52, C.ink, P(A('c6c')))}
          <G2 x={420} y={880}><Bar h={160} w={220} color={C.navy} label="low spend" value="" /></G2>
          <G2 x={700} y={880}><Bar h={320} w={220} color={C.navy} label="medium" value="" /></G2>
          <G2 x={980} y={880}><Bar h={f >= gm ? lerp(320, 560, ease(f, gm, gm + 18)) : 320} w={220} color={C.red} label="high spend" value="" /></G2>
          <Box x={1460} y={460} w={560} h={340} s={P(A('c6c')) * bump(gm, 0.12)} fill={f >= gm ? C.yellow : '#fff'}>
            <Text y={-90} size={40} color={GRAY}>signs of</Text>
            <Text y={-10} size={56} color={C.red}>PROBLEM</Text>
            <Text y={60} size={56} color={C.red}>GAMBLING</Text>
          </Box>
          {T(1460, 740, 'people at risk, not the rich', 40, C.navy, bump(rk, 0.12), lt(rk, 0.4))}
          <SourceTag f={f} at={gm} text="Close et al. (2021): higher spenders showed more problem-gambling symptoms" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const kd = w('c6d', 'kid');
    const th = w('c6d', 'thousands');
    q(kd, 'pop', 0.6);
    q(th, 'cash', 0.7);
    scene(A('c6d'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Stick f={f} x={620} y={950} s={0.75} seed={12} keys={[{at: 0, pose: 'typing', expr: 'happy', look: 0.6}]} />
          <GamePhone f={f} x={980} y={600} s={0.9 * P(A('c6d'))} glow={0.5} screen={<><Text y={-180} size={36} color={C.yellow}>5-STAR PRIZE</Text><DragonEgg y={0} s={0.9} glow={1} />{Btn(200, 'PULL AGAIN', C.red, 32)}</>} />
          {T(620, 620, 'sometimes the whale is a kid', 40, C.ink, P(A('c6d')) * bump(kd, 0.1))}
          <SourceTag f={f} at={kd} text="FTC (2025): some children spent hundreds or thousands of dollars on Genshin prizes" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ep = w('c6e', 'epic');
    const ml = w('c6e', 'million');
    const tr = w('c6e', 'tricked');
    q(ep, 'paper', 0.6);
    q(ml, 'stamp', 0.8);
    q(tr, 'click', 0.6);
    scene(A('c6e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SourceCard x={460} y={540} s={0.95 * P(A('c6e')) * bump(ep, 0.06)} org="FTC" sub="vs. Epic Games (Fortnite)" title={['dark patterns', 'order']} stat="2022" />
          <Box x={1260} y={440} w={720} h={340} s={P(A('c6e')) * bump(ml, 0.12)} fill={f >= ml ? C.yellow : '#fff'}>
            <Text y={-90} size={40} color={GRAY}>refunds to players</Text>
            <Text y={30} size={110} color={C.red}>{f >= ml ? '$245 MILLION' : '$ ? MILLION'}</Text>
          </Box>
          {T(1260, 760, 'buttons that tricked players into purchases', 38, C.navy, bump(tr, 0.1), lt(tr, 0.4))}
          <SourceTag f={f} at={ep} text="FTC (Dec 2022): Epic Games to pay $245 million for dark patterns and unwanted charges" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cl = w('c6f', 'close');
    const tw = w('c6f', 'two');
    const bt = w('c6f', 'button');
    q(cl, 'heart', 0.5);
    q(tw, 'tick', 0.5);
    q(bt, 'sting', 0.7);
    scene(A('c6f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Clock f={f} x={300} y={300} s={1.2 * P(A('c6f')) * bump(tw, 0.1)} />
          {T(300, 480, '2 A.M.', 50, C.navy, P(A('c6f')) * bump(tw, 0.1))}
          <GamePhone f={f} x={960} y={540} s={1.2} glow={f >= bt ? 0.8 : 0.3} screen={<><Text y={-200} size={32} color={C.yellow}>SO CLOSE!</Text><DragonEgg y={-40} s={0.8} glow={1} /><rect x={-140} y={130} width={280} height={110} rx={20} fill={C.red} stroke={C.ink} strokeWidth={5} /><Text y={190} size={54} color="#fff">$99.99</Text></>} />
          <Dave f={f} x={1500} y={930} s={1.15} flip keys={[{at: 0, pose: 'point_l', expr: 'tired', look: -0.6}]} sweat />
          <G2 x={1500} y={380} s={P(A('c6f')) * bump(cl, 0.12)}><Bubble text="I'm so close..." size={42} tail="down" /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tap = w('c6g', 'tap');
    const ef = w('c6g', 'eighty');
    const gd = w('c6g', 'gold');
    const kn = w('c6g', 'knight');
    const dg = w('c6g', 'dragon');
    q(tap, 'click', 0.8);
    q(tap + 4, 'cash', 0.7);
    q(ef, 'tick', 0.5);
    q(gd, 'chime', 0.8);
    q(kn, 'ding', 0.6);
    q(dg, 'trombone', 0.6);
    scene(A('c6g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={360} y={420} w={440} h={260} s={P(A('c6g')) * bump(ef, 0.12)} fill={C.navy}>
            <Text y={-50} size={44} color="#fff">PULL</Text>
            <Text y={50} size={100} color={C.yellow}>{f >= ef ? '85' : '61'}</Text>
          </Box>
          <PullCard x={960} y={520} s={1.5 * P(A('c6g')) * bump(gd, 0.14)} item={f >= kn ? 'KNIGHT' : '? ? ?'} rarity={f >= gd ? 'legendary' : 'common'} rainbow={f >= gd ? 1 : 0} />
          <Dave f={f} x={360} y={960} s={0.9} keys={[{at: 0, pose: 'typing', expr: 'tired', look: 0.6}, {at: gd, pose: 'celebrate', expr: 'money', look: 0.6}, {at: dg, pose: 'facepalm', expr: 'sad', look: 0}]} />
          <G2 x={1500} y={520} s={bump(dg, 0.18)} o={lt(dg, 0.35)}><Stamp text="NOT THE DRAGON" color={C.red} size={52} r={-6} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const cn = w('c6h', 'coin');
    const ls = w('c6h', 'lost');
    const gr = w('c6h', 'guaranteed');
    q(cn, 'coin', 0.7);
    q(ls, 'buzz', 0.6);
    q(gr, 'pop', 0.5);
    scene(A('c6h'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'the fine print: a coin flip', 52, C.ink, P(A('c6h')))}
          <G2 x={520} y={520} s={2.2 * P(A('c6h'))}>
            <ellipse rx={90} ry={90 * Math.abs(Math.cos(f < ls ? f / 3 : 0))} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
            <Text y={4} size={44} color={C.ink}>{f >= ls ? 'LOST' : '50/50'}</Text>
          </G2>
          <Box x={1300} y={500} w={640} h={380} s={P(A('c6h')) * bump(gr, 0.12)} fill={f >= gr ? C.yellow : '#fff'}>
            <Text y={-120} size={40} color={GRAY}>the dragon is now</Text>
            <Text y={-30} size={60} color={C.red}>GUARANTEED</Text>
            <Text y={70} size={44} color={C.ink}>within 90 MORE pulls</Text>
          </Box>
          <SourceTag f={f} at={cn} text="Genshin Impact published rules: 50% chance the 5-star is the featured one" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c6i', 'two');
    const zr = w('c6i', 'zero');
    const dn = w('c6i', 'down');
    q(tw, 'cash', 0.7);
    q(zr, 'thud', 0.6);
    q(dn, 'thud', 0.7);
    scene(A('c6i'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Box x={760} y={600} w={520} h={220} s={P(A('c6i')) * bump(tw, 0.12)} fill={C.yellow}><Text y={6} size={110} color={C.red}>$235</Text></Box>
          <Box x={1300} y={600} w={420} h={220} s={P(A('c6i'))}><Text y={-30} size={60} color={C.navy}>3 weeks</Text><Text y={50} size={44} color={C.red}>{f >= zr ? '0 dragons' : '? dragons'}</Text></Box>
          <Dave f={f} x={480} y={940} s={1.15} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0}, {at: dn, pose: 'idle', expr: 'tired', look: 0.6}]} />
          <GamePhone x={1040} y={900} s={0.3} r={f >= dn ? 90 : 0} />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH7: Dave Fights Back ============
  {
    const th = w('c7a', 'three');
    const ed = w('c7a', 'education');
    q(th, 'pop', 0.6);
    q(ed, 'ding', 0.6);
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={900} y={150} s={P(A('c7a')) * bump(ed, 0.08)}><Stamp text="EDUCATION, NOT ADVICE" color={C.navy} size={44} r={0} /></G2>
          <Row x={420} y={340} s={0.85 * P(A('c7a'))} n={1} text="? ? ?" lit={0.5} />
          <Row x={420} y={480} s={0.85 * P(A('c7a'))} n={2} text="? ? ?" lit={0.5} />
          <Row x={420} y={620} s={0.85 * P(A('c7a'))} n={3} text="? ? ?" lit={0.5} />
          <Dave f={f} x={1500} y={930} s={1.15} flip keys={[{at: 0, pose: 'hips', expr: 'neutral', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const on = w('c7b', 'one');
    const fv = w('c7b', 'five');
    const ht = w('c7b', 'hurt');
    q(on, 'pop', 0.6);
    q(fv, 'paper', 0.5);
    q(ht, 'stamp', 0.8);
    scene(A('c7b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'ONE: ADD IT UP', 54, C.navy, P(A('c7b')) * bump(on, 0.1))}
          <Box x={520} y={540} w={520} h={560} s={P(A('c7b')) * bump(fv, 0.06)}>
            <Text y={-220} size={36} color={GRAY}>PURCHASE HISTORY</Text>
            {['$4.99', '$19.99', '$9.99', '$99.99', '$99.99'].map((p, i) => <Text key={i} y={-140 + i * 70} size={46} color={C.ink}>{p}</Text>)}
            <path d="M -200 200 H 200" stroke={C.ink} strokeWidth={5} />
          </Box>
          <Box x={1320} y={500} w={640} h={340} s={P(A('c7b')) * bump(ht, 0.14)} fill={f >= ht ? C.yellow : '#fff'}>
            <Text y={-90} size={40} color={GRAY}>as ONE number</Text>
            <Text y={40} size={120} color={C.red}>$234.95</Text>
          </Box>
          <Dave f={f} x={1320} y={980} s={0.75} keys={[{at: 0, pose: 'shock', expr: 'shock', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const tw = w('c7c', 'two');
    const bp = w('c7c', 'bump');
    const sc = w('c7c', 'screen');
    const dl = w('c7c', 'deleted');
    q(tw, 'pop', 0.6);
    q(bp, 'thud', 0.5);
    q(sc, 'click', 0.6);
    q(dl, 'rip', 0.6);
    scene(A('c7c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'TWO: A SPEED BUMP', 54, C.navy, P(A('c7c')) * bump(tw, 0.1) * bump(bp, 0.08))}
          <ScreenTimeIcon x={360} y={460} s={1.5 * P(A('c7c')) * bump(sc, 0.12)} />
          {T(360, 660, 'in-app purchases:', 38, GRAY, P(A('c7c')))}
          {T(360, 730, 'OFF', 60, C.green, P(A('c7c')) * bump(sc, 0.14))}
          <Box x={900} y={500} w={420} h={320} s={P(A('c7c'))}>
            <Text y={-90} size={36} color={GRAY}>every purchase</Text>
            <Text y={0} size={50} color={C.navy}>ASK FOR</Text>
            <Text y={70} size={50} color={C.navy}>PASSWORD</Text>
          </Box>
          <G2 x={1440} y={500} s={1.4 * P(A('c7c'))} r={f >= dl ? -8 : 0}>
            <rect x={-150} y={-95} width={300} height={190} rx={18} fill="#5C7CFA" stroke={C.ink} strokeWidth={6} />
            <rect x={-150} y={-55} width={300} height={36} fill={C.ink} />
            <Text y={50} size={30} color="#fff">SAVED CARD</Text>
          </G2>
          <G2 x={1440} y={500} s={0.4 * bump(dl, 0.2)} o={lt(dl, 0.0001)}><XMark /></G2>
          <SourceTag f={f} at={sc} text="Apple Support: Screen Time > In-App Purchases | Google Play: require authentication" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const th = w('c7d', 'three');
    const dr = w('c7d', 'dollar');
    const gf = w('c7d', 'gift');
    q(th, 'pop', 0.6);
    q(dr, 'cash', 0.6);
    q(gf, 'ding', 0.6);
    scene(A('c7d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'THREE: THE DOLLAR RULE', 54, C.navy, P(A('c7d')) * bump(th, 0.1))}
          <DollarRule x={540} y={460} s={1.5 * P(A('c7d')) * bump(dr, 0.1)} gems={160} dollars="$2" />
          {T(600, 660, 'turn gems back into dollars first', 42, C.ink, P(A('c7d')), lt(dr, 0.4))}
          <GiftCard x={1440} y={500} s={1.2 * P(A('c7d')) * bump(gf, 0.12)} value="$20" />
          {T(1440, 720, 'the whole budget, per month', 38, C.ink, P(A('c7d')), lt(gf, 0.4))}
          <Dave f={f} x={980} y={960} s={0.85} keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: 0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const fr = w('c7e', 'four');
    const tw = w('c7e', 'two');
    const kp = w('c7e', 'keeps');
    q(fr, 'pop', 0.6);
    q(tw, 'pop2', 0.6);
    q(kp, 'chime', 0.8);
    scene(A('c7e'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(700, 150, 'per year', 50, GRAY, P(A('c7e')))}
          <G2 x={420} y={900}><Bar h={560} w={300} color={C.red} label="old pace" value={f >= fr ? '$4,000' : '?'} /></G2>
          <G2 x={900} y={900}><Bar h={60} w={300} color={C.green} label="gift card" value={f >= tw ? '$240' : '?'} /></G2>
          <Box x={1460} y={520} w={540} h={360} s={P(A('c7e')) * bump(kp, 0.16)} fill={f >= kp ? '#E3F6EA' : '#fff'}>
            <Text y={-100} size={40} color={GRAY}>Dave keeps about</Text>
            <Text y={30} size={110} color={C.green}>{f >= kp ? '$3,800' : '$ ?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const qs = w('c7f', 'question');
    const cs = w('c7f', 'cost');
    q(qs, 'pop2', 0.5);
    q(cs, 'sting', 0.7);
    scene(A('c7f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={930} s={1.2} keys={[{at: 0, pose: 'think', expr: 'think', look: 0.6}]} />
          <DragonEgg x={960} y={540} s={1.9 * P(A('c7f'))} glow={0.6} />
          <Box x={1460} y={520} w={480} h={340} s={P(A('c7f')) * bump(cs, 0.14)} fill={C.yellow}>
            <Text y={-90} size={36} color={GRAY}>what did the dragon</Text>
            <Text y={-40} size={36} color={GRAY}>actually cost?</Text>
            <Text y={70} size={110} color={C.red}>$ ? ? ?</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8: The Real Price ============
  {
    const rl = w('c8a', 'rule');
    q(rl, 'cash', 0.6);
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Interior />
        <Svg>
          <Dave f={f} x={540} y={940} s={1.15} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: 0.6}]} />
          <G2 x={1060} y={520} s={P(A('c8a')) * bump(rl, 0.1)}>
            <rect x={-360} y={-190} width={720} height={380} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Text y={-120} size={40} color={GRAY}>THE DOLLAR RULE, ON THE DRAGON</Text>
            <DragonEgg x={-190} y={40} s={0.9} glow={0.6} />
            <Text x={10} y={40} size={90} color={C.ink}>=</Text>
            <Text x={190} y={40} size={100} color={C.red}>$ ?</Text>
          </G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const zr = w('c8b', 'zero');
    const nn = w('c8b', 'ninety');
    const cn = w('c8b', 'coin');
    q(zr, 'pop', 0.5);
    q(nn, 'pop2', 0.5);
    q(cn, 'coin', 0.6);
    scene(A('c8b'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'the published rules', 50, GRAY, P(A('c8b')))}
          <Row x={420} y={340} s={0.9 * P(A('c8b'))} n={1} text="0.6% chance per pull" lit={f >= zr ? 1 : 0.4} />
          <Row x={420} y={490} s={0.9 * P(A('c8b'))} n={2} text="a legendary by pull 90" lit={f >= nn ? 1 : 0.4} />
          <Row x={420} y={640} s={0.9 * P(A('c8b'))} n={3} text="then a 50/50 coin flip" lit={f >= cn ? 1 : 0.4} />
          <Dave f={f} x={1560} y={930} s={1.1} flip keys={[{at: 0, pose: 'point_l', expr: 'think', look: -0.6}]} />
          <SourceTag f={f} at={zr} text="Genshin Impact published wish rates and rules" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sx = w('c8c', 'sixty');
    const eg = w('c8c', 'eight');
    const tw = w('c8c', 'two');
    q(sx, 'pop', 0.5);
    q(eg, 'pop2', 0.5);
    q(tw, 'stamp', 0.8);
    scene(A('c8c'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Box x={400} y={420} w={480} h={300} s={P(A('c8c')) * bump(sx, 0.1)}><Text y={-60} size={40} color={GRAY}>1 pull =</Text><Text y={40} size={80} color="#5C4A8C">160 gems</Text></Box>
          <GemPack x={960} y={440} s={1.15 * P(A('c8c')) * bump(eg, 0.1)} price="$99.99" gems={8080} />
          <Box x={1480} y={440} w={480} h={340} s={P(A('c8c')) * bump(tw, 0.16)} fill={f >= tw ? C.yellow : '#fff'}>
            <Text y={-90} size={40} color={GRAY}>so every pull is</Text>
            <Text y={40} size={120} color={C.red}>{f >= tw ? '~$2' : '$ ?'}</Text>
          </Box>
          {T(960, 800, '$99.99 / 8,080 gems x 160', 40, GRAY, P(A('c8c')))}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const wc = w('c8d', 'worst');
    const ls = w('c8d', 'lose');
    const ef = w('c8d', 'eighty');
    q(wc, 'pop', 0.5);
    q(ls, 'buzz', 0.5);
    q(ef, 'stamp', 0.8);
    scene(A('c8d'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'WORST CASE', 56, C.red, P(A('c8d')) * bump(wc, 0.1))}
          <Box x={380} y={480} w={420} h={300} s={P(A('c8d'))}><Text y={-50} size={40} color={GRAY}>reach</Text><Text y={50} size={80} color={C.navy}>pull 90</Text></Box>
          {T(660, 480, '+', 90, C.ink, P(A('c8d')))}
          <Box x={940} y={480} w={420} h={300} s={P(A('c8d')) * bump(ls, 0.12)} fill={f >= ls ? '#FFE3EA' : '#fff'}><Text y={-50} size={40} color={GRAY}>lose coin flip</Text><Text y={50} size={80} color={C.red}>+90</Text></Box>
          {T(1220, 480, '=', 90, C.ink, P(A('c8d')))}
          <Box x={1500} y={480} w={420} h={300} s={P(A('c8d')) * bump(ef, 0.16)} fill={f >= ef ? C.yellow : '#fff'}><Text y={-50} size={40} color={GRAY}>pulls</Text><Text y={50} size={110} color={C.red}>{f >= ef ? '180' : '?'}</Text></Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  const WIN = w('c8e', 'fifty') + 16;
  {
    const pl = w('c8e', 'pulls');
    const pr = w('c8e', 'price');
    q(pl, 'pop', 0.5);
    q(pr, 'tick', 0.5);
    q(WIN, 'stamp', 0.9);
    scene(A('c8e'), () => {
      const sk = shake(f, WIN, 16, 14);
      const n = Math.round(lerp(0, 356, ease(f, pr, WIN)));
      return (
        <AbsoluteFill>
          <Board />
          <Cam f={f} keys={[[WIN, 1, 960, 540], [WIN + 10, 1.1, 960, 520]]}>
            <Svg>
              {T(860, 150, '180 pulls x about $2', 54, C.ink, P(A('c8e')) * bump(pl, 0.08))}
              <DragonEgg x={380} y={540} s={1.7 * P(A('c8e'))} glow={1} />
              <Box x={1100 + sk.x} y={520 + sk.y} w={900} h={420} s={P(A('c8e'))} fill={C.yellow}>
                <Text y={-130} size={44} color={GRAY}>THE DRAGON'S REAL PRICE: UP TO</Text>
                <Text y={50} size={220} color={C.red}>{f >= pr ? money(n) : '$ ? ? ?'}</Text>
              </Box>
            </Svg>
          </Cam>
        </AbsoluteFill>
      );
    });
  }
  {
    const bn = w('c8f', 'banner');
    const nv = w('c8f', 'never');
    const bz = w('c8f', 'business');
    q(bn, 'pop', 0.5);
    q(nv, 'buzz', 0.6);
    q(bz, 'stamp', 0.8);
    scene(A('c8f'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <BannerAd f={f} x={480} y={460} s={1.0 * P(A('c8f')) * bump(bn, 0.06)} />
          <GemDisplay x={480} y={780} s={2.2 * P(A('c8f'))} gems={160} highlight={1} />
          <Box x={1320} y={420} w={640} h={320} s={P(A('c8f')) * bump(nv, 0.12)} fill="#FFE3EA">
            <Text y={-80} size={40} color={GRAY}>it never said</Text>
            <Text y={40} size={130} color={C.red}>$356</Text>
          </Box>
          <G2 x={1320} y={760} s={bump(bz, 0.18)} o={lt(bz, 0.35)}><Stamp text="THAT'S THE BUSINESS" color={C.red} size={52} r={-4} /></G2>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pg = w('c8g', 'playing', 1);
    const sc = w('c8g', 'score');
    q(pg, 'sting', 0.7);
    q(sc, 'cash', 0.6);
    scene(A('c8g'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Dave f={f} x={420} y={930} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'neutral', look: 0.6}, {at: pg, pose: 'shrug', expr: 'tired', look: 0.6}]} />
          <GamePhone f={f} x={960} y={540} s={1.15} glow={0.5} screen={<><Text y={-200} size={34} color={C.yellow}>PLAYER: DAVE</Text><Text y={-80} size={40} color="#fff">SCORE</Text><Text y={20} size={70} color={C.red}>$234.95</Text><Text y={160} size={30} color="#C9D6E6">(his bank account)</Text></>} />
          <Box x={1480} y={480} w={520} h={340} s={P(A('c8g')) * bump(pg, 0.14)} fill={f >= pg ? C.yellow : '#fff'}>
            <Text y={-70} size={44} color={C.ink}>the game was</Text>
            <Text y={30} size={60} color={C.red}>PLAYING DAVE</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ OUTRO ============
  {
    const a = A('r1');
    const b = A('r2');
    const c = A('r3');
    q(a + 4, 'pop', 0.6);
    q(b + 4, 'pop', 0.6);
    q(c + 4, 'pop', 0.6);
    scene(a, () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(860, 150, 'WHAT DAVE LEARNED', 56, C.navy, pop(f, a))}
          <Row x={300} y={340} s={0.9 * pop(f, a)} n={1} text="gems are dollars in a costume" lit={1} w={1200} />
          <Row x={300} y={500} s={0.9 * pop(f, a)} n={2} text="4 in 100 pay for everyone" lit={f >= b ? 1 : 0.35} w={1200} />
          <Row x={300} y={660} s={0.9 * pop(f, a)} n={3} text="build the speed bump before 2 A.M." lit={f >= c ? 1 : 0.35} w={1200} />
          <Dave f={f} x={1740} y={960} s={0.85} flip keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: -0.6}]} />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const bb = w('r4', 'bob');
    const qk = w('r4', 'quick');
    const bl = w('r4', 'bill');
    q(bb, 'pop', 0.5);
    q(qk, 'ding', 0.5);
    q(bl, 'sting', 0.7);
    scene(A('r4'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          {T(960, 150, 'NEXT TIME', 60, C.red, P(A('r4')))}
          <Stick f={f} x={420} y={930} s={1.15} acc={['cap']} seed={21} keys={[{at: 0, pose: 'idle', expr: 'sad', look: 0.6}, {at: bl, pose: 'shock', expr: 'shock', look: 0.6}]} />
          {T(420, 380, 'Bob', 44, GRAY, P(A('r4')) * bump(bb, 0.1))}
          <Stick f={f} x={920} y={930} s={1.1} acc={['glasses', 'tie']} seed={44} flip keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.6, talk: true}]} />
          <G2 x={920} y={360} s={P(A('r4')) * bump(qk, 0.12)}><Bubble text="quick and simple!" size={42} tail="down" /></G2>
          <Box x={1480} y={540} w={460} h={420} s={P(A('r4')) * bump(bl, 0.16)} fill={f >= bl ? C.yellow : '#fff'}>
            <Text y={-140} size={40} color={GRAY}>THE FIRST BILL</Text>
            <Text y={20} size={130} color={C.red}>{f >= bl ? '$ ! ! !' : '$ ?'}</Text>
          </Box>
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const sb = w('r5', 'subscribe');
    const fe = w('r5', 'free');
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.7);
    q(fe, 'chime', 0.5);
    scene(A('r5'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <SubButton x={860} y={400} s={1.4 * pop(f, A('r5'))} done={f > sb + 14 ? 1 : 0} />
          <Bell x={1300} y={400} s={1.2 * pop(f, A('r5') + 4)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
          <Dave f={f} x={380} y={900} s={1.25} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
          <DragonEgg x={1560} y={760} s={1.1 * pop(f, A('r5'))} glow={0.8} />
          {T(1000, 640, 'FREE. ACTUALLY FREE.', 56, C.green, pop(f, A('r5')) * bump(fe, 0.12))}
          {T(1000, 740, 'no gems, no eggs, no coin flips', 44, GRAY, pop(f, A('r5')))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ DAMAGE METER (HUD) ============
  const D_ON = A('o6');
  const D1 = w('c1g', 'five');
  const D2 = w('c2g', 'nineteen');
  const D3 = w('c3e', 'buys');
  const D4 = w('c4f', 'big');
  const D5 = w('c6g', 'tap') + 4;
  const SV = w('c7e', 'keeps');
  [D1, D2, D3, D4, D5].forEach((d) => q(d + 4, 'cash', 0.45));
  const dmg = f < D1 ? '$0' : f < D2 ? '$4.99' : f < D3 ? '$24.98' : f < D4 ? '$34.97' : f < D5 ? '$134.96' : '$234.95';
  const inChapterCard = (t.chapters ?? []).some((c) => f >= Math.round(c.start * 30) - 4 && f < Math.round(c.start * 30) + CHAPTER_FRAMES + 4);
  const SUB = we('c5h', 'paying') + 20;
  const inSub = f >= SUB - 4 && f <= SUB + SUB_FRAMES + 4;
  const showMeter = f >= D_ON && !inChapterCard && !inSub && f < A('r1');
  subCues(SUB).forEach((c) => cues.push(c));
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      {showMeter && (
        <Svg>
          <DamageMeter x={1700} y={150} s={0.8 * [D1, D2, D3, D4, D5, SV].reduce((a, d) => a * bump(d, 0.15), 1)} value={dmg} saved={f >= SV ? '~$3,800/yr' : undefined} flash={[D1, D2, D3, D4, D5].some((d) => f >= d && f < d + 20) ? 1 : 0} />
        </Svg>
      )}
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <SubReminder f={f} at={SUB} Dave={<Stick f={f} x={0} y={200} s={1} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}]} acc={['hair']} seed={7} />} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
