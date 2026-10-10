import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop, shake, lerp} from '../anim';
import {Stick, StickProps} from '../Stick';
import {G, Text, Stamp} from '../props';
import {AppPhone, Banner, BaitHook, Napkin, Slip} from '../props60';
import {Raccoon, TollBooth, Ticket} from '../props3';

// ---- vertical canvas ----
export const W = 1080;
export const H = 1920;

const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    {children}
  </svg>
);

// ---- ground/room backdrop (simple, matches channel palette) ----
const Room: React.FC<{mood?: 'home' | 'street'}> = ({mood = 'home'}) => (
  <Svg>
    <rect x={0} y={0} width={W} height={H} fill={C.bg} />
    <rect x={0} y={1180} width={W} height={H - 1180} fill={mood === 'home' ? C.floor : C.ground} />
    <rect x={0} y={1176} width={W} height={10} fill="#C7B592" />
    {mood === 'home' && (
      <>
        <rect x={0} y={0} width={W} height={1186} fill={C.wall} />
        <rect x={0} y={900} width={W} height={286} fill={C.wallDark} opacity={0.5} />
      </>
    )}
  </Svg>
);

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Bob: React.FC<SP> = (p) => <Stick acc={['cap']} seed={21} {...p} />;

const Sfx: React.FC<{at: number; file: string; vol?: number}> = ({at, file, vol = 1}) =>
  at < 0 ? null : (
    <Sequence from={at} durationInFrames={60} layout="none">
      <Audio src={staticFile(`sfx/${file}.wav`)} volume={vol} />
    </Sequence>
  );

// ---- scene switcher (crossfade + slight zoom-in, like main show) ----
type SceneItem = {at: number; el: () => React.ReactNode};
const Scenes: React.FC<{f: number; items: SceneItem[]}> = ({f, items}) => {
  const s = [...items].sort((a, b) => a.at - b.at);
  let i = -1;
  s.forEach((x, k) => {
    if (x.at <= f) i = k;
  });
  if (i < 0) return null;
  const cur = s[i];
  const prev = i > 0 && f < cur.at + 9 ? s[i - 1] : null;
  const o = ease(f, cur.at, cur.at + 8);
  return (
    <>
      {prev && <AbsoluteFill>{prev.el()}</AbsoluteFill>}
      <AbsoluteFill style={{opacity: o, transform: `scale(${1.04 - 0.04 * o})`}}>{cur.el()}</AbsoluteFill>
    </>
  );
};

// ---- persistent HUD ----
const Hud: React.FC<{f: number; show: boolean; value: string; bump: number}> = ({f, show, value, bump}) => {
  if (!show) return null;
  const o = ease(f, 0, 10);
  const k = pop(Math.max(0, f - bump), 0, 10, 240);
  return (
    <Svg>
      <g transform={`translate(${W - 200},150) scale(${1 + k * 0.12})`} opacity={o}>
        <rect x={-130} y={-56} width={260} height={112} rx={18} fill="#fff" stroke={C.ink} strokeWidth={5} />
        <Text y={-18} size={22} color={C.gray} ls={1}>DAVE'S DAMAGE</Text>
        <Text y={28} size={42} color={value.startsWith('-') ? C.red : C.green}>{value}</Text>
      </g>
    </Svg>
  );
};

// ---- bottom caption bar (word-synced, compact, stays out of the acting area) ----
const Captions: React.FC<{f: number}> = ({f}) => {
  const {t} = useT();
  const sec = f / 30;
  const beats = t.beats;
  let idx = 0;
  for (let i = 0; i < beats.length; i++) {
    if (beats[i].start <= sec) idx = i;
    else break;
  }
  const b = beats[idx];
  const nextStart = beats[idx + 1]?.start ?? t.total;
  if (sec >= nextStart - 0.02) return null;
  const bf = f - Math.round(b.start * 30);
  const entrance = pop(bf, 0, 12, 260);
  let activeWord = 0;
  b.words.forEach((w, i) => {
    if (w.start <= sec) activeWord = i;
  });
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', padding: '0 56px 110px'}}>
      <div
        style={{
          transform: `translateY(${(1 - entrance) * 24}px)`,
          opacity: entrance,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.22,
          textAlign: 'center',
          color: '#fff',
          WebkitTextStroke: `10px ${C.ink}`,
          paintOrder: 'stroke fill' as any,
        }}
      >
        {b.words.map((w, i) => (
          <span key={i} style={{color: i === activeWord ? '#FFD166' : '#fff', margin: '0 10px', display: 'inline-block'}}>
            {w.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Progress: React.FC<{f: number; d: number}> = ({f, d}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: 'rgba(0,0,0,0.08)'}}>
    <div style={{height: '100%', width: `${(f / d) * 100}%`, background: C.green}} />
  </div>
);

const Bumper: React.FC<{f: number}> = ({f}) => {
  if (f > 34) return null;
  const o = 1 - ease(f, 20, 32);
  return (
    <Svg>
      <g opacity={o} transform={`translate(${W / 2},150)`}>
        <Text size={38} color={C.navy} ls={3}>MONEYWORKS</Text>
        <Text y={36} size={24} color={C.gray} weight={500}>dave's money shorts</Text>
      </g>
    </Svg>
  );
};

const Body: React.FC = () => {
  const f = useCurrentFrame();
  const {t, bs, w} = useT();
  const d = Math.round(t.total * 30);
  const A = (id: string) => Math.max(0, bs(id) - 4);
  const P = (at: number) => pop(f, at + 2);

  const S: SceneItem[] = [];
  const scene = (at: number, el: () => React.ReactNode) => S.push({at, el});

  // ============ s1: Dave just won $640 ============
  scene(0, () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1420} s={1.55} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0}]} />
        <G x={W / 2} y={560} s={0.95 * P(0)}>
          <AppPhone>
            <Text y={-170} size={28} color="#5B6470">YOUR BALANCE</Text>
            <Text y={-90} size={78} color={C.green}>+$640</Text>
            <Text y={-10} size={26} color="#5B6470">hot streak!</Text>
          </AppPhone>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s2: Banned ============
  scene(A('s2'), () => {
    const sk = shake(f, bs('s2'), 14, 14);
    return (
      <AbsoluteFill>
        <Room />
        <Svg>
          <Dave f={f} x={W / 2} y={1420} s={1.55} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} sweat />
          <G x={W / 2 + sk.x} y={560 + sk.y} s={0.95}>
            <AppPhone color={C.red}>
              <Text y={-170} size={28} color="#5B6470">YOUR BALANCE</Text>
              <Text y={-90} size={78} color={C.green}>+$640</Text>
              <rect x={-130} y={-10} width={260} height={90} rx={20} fill="#E3E8EE" stroke={C.ink} strokeWidth={4} />
              <Text y={36} size={34} color="#5B6470">MAX BET $2</Text>
            </AppPhone>
          </G>
          <G x={W / 2} y={190} s={pop(f, bs('s2') + 2)}>
            <Stamp text="BANNED" color={C.red} size={78} />
          </G>
        </Svg>
      </AbsoluteFill>
    );
  });

  // ============ s3: an ad promised $1,000 free ============
  scene(A('s3'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={330} y={1420} s={1.3} keys={[{at: 0, pose: 'point_r', expr: 'happy', look: 0.3}]} />
        <G x={760} y={620} s={0.8 * P(bs('s3'))}>
          <BaitHook f={f} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s4: deposits $500, his whole football budget ============
  scene(A('s4'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1420} s={1.4} keys={[{at: 0, pose: 'present', expr: 'neutral', look: 0}]} />
        <G x={W / 2} y={560} s={0.95 * P(bs('s4'))}>
          <AppPhone>
            <Text y={-170} size={28} color="#5B6470">DEPOSIT</Text>
            <Text y={-80} size={88} color={C.ink}>$500</Text>
            <Text y={10} size={26} color="#5B6470">his whole football budget</Text>
          </AppPhone>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s5: to unlock even $100, bet it 25x over ============
  scene(A('s5'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={290} y={1460} s={1.15} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0.3}]} />
        <G x={W / 2 + 40} y={620} s={0.85 * P(bs('s5'))}>
          <rect x={-320} y={-180} width={640} height={360} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-110} size={34} color={C.ink}>25x PLAYTHROUGH</Text>
          <Text y={-30} size={28} color="#5B6470">bet it 25 times over</Text>
          <Text y={50} size={54} color={C.red}>$2,500</Text>
          <Text y={110} size={24} color="#5B6470">to unlock $100</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s6: house keeps ~4 cents of every dollar ============
  scene(A('s6'), () => (
    <AbsoluteFill>
      <Room mood="street" />
      <Svg>
        <G x={W / 2} y={1340} s={1.0}>
          <TollBooth label="THE HOUSE'S CUT" />
        </G>
        <G x={W / 2} y={960} s={0.9 * P(bs('s6'))}>
          <Raccoon f={f} mood="happy" holdCoin />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s7: free $100 actually cost him $140 ============
  scene(A('s7'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={760} s={0.95 * P(bs('s7'))}>
          <Napkin lines={[
            {t: '$100 bonus', c: C.green, on: true},
            {t: '-$140 toll', c: C.red, on: f >= w('s7', 'cost')},
            {t: 'net: -$40', c: C.ink, on: f >= w('s7', 'just')},
          ]} />
        </G>
        <Dave f={f} x={W / 2} y={1620} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s8: then Dave got hot, up $640 again ============
  scene(A('s8'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1420} s={1.55} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0}]} />
        <G x={W / 2} y={560} s={0.95 * P(bs('s8'))}>
          <AppPhone>
            <Text y={-90} size={80} color={C.green}>+$640</Text>
            <Text y={10} size={28} color="#5B6470">he's hot again</Text>
          </AppPhone>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s9: phone buzzed, max bet $2 ============
  scene(A('s9'), () => {
    const sk = shake(f, bs('s9'), 16, 14);
    return (
      <AbsoluteFill>
        <Room />
        <Svg>
          <Dave f={f} x={W / 2} y={1420} s={1.55} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} sweat />
          <G x={W / 2 + sk.x} y={420 + sk.y} s={pop(f, bs('s9'))}>
            <Banner title="BET APP · now" body="MAX BET: $2.00" w={620} />
          </G>
        </Svg>
      </AbsoluteFill>
    );
  });

  // ============ s10: he'd been limited ============
  scene(A('s10'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1440} s={1.4} keys={[{at: 0, pose: 'sad', expr: 'sad', look: 0} as any]} />
        <G x={W / 2} y={260} s={pop(f, bs('s10'))}>
          <Stamp text="LIMITED" color={C.red} size={70} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s11: Bob, down $3k, gets a text from his VIP host ============
  scene(A('s11'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Bob f={f} x={W / 2} y={1420} s={1.5} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0}]} />
        <G x={W / 2} y={560} s={0.9 * P(bs('s11'))}>
          <Banner title="VIP HOST · now" body="down $3,000 · bonus incoming" color={C.gold} w={660} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s12: bonus bets, free tickets ============
  scene(A('s12'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Bob f={f} x={W / 2} y={1460} s={1.35} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: 0}]} />
        <G x={330} y={700} s={0.9 * P(bs('s12'))}>
          <Ticket text="BONUS BETS" />
        </G>
        <G x={750} y={700} s={0.9 * pop(f, bs('s12') + 6)}>
          <Ticket text="FREE TICKETS" />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s13: 0.5% of customers make 70%+ of revenue ============
  scene(A('s13'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={960} s={0.95 * P(bs('s13'))}>
          <rect x={-380} y={-280} width={760} height={560} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-200} size={32} color={C.ink}>who makes the money</Text>
          <Text y={-100} size={28} color="#5B6470">0.5% of customers</Text>
          <rect x={-300} y={-70} width={30} height={30} rx={8} fill={C.gray} />
          <Text y={40} size={28} color="#5B6470">make 70%+ of revenue</Text>
          <rect x={-300} y={70} width={520} height={30} rx={8} fill={C.red} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s14: the app wants losers it can keep feeding ============
  scene(A('s14'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={300} y={1440} s={1.2} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.4}]} />
        <Bob f={f} x={W - 300} y={1440} s={1.2} flip keys={[{at: 0, pose: 'celebrate', expr: 'happy', look: -0.4}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s15: to unlock the full $1,000, bet $25,000 ============
  scene(A('s15'), () => (
    <AbsoluteFill>
      <Room mood="street" />
      <Svg>
        <G x={W / 2} y={1340} s={1.0}>
          <TollBooth label="$25,000 TOLL" />
        </G>
        <G x={W / 2} y={960} s={0.9 * P(bs('s15'))}>
          <Raccoon f={f} mood="happy" />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s16: average cost, about eleven hundred ============
  scene(A('s16'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={820} s={0.95 * P(bs('s16'))}>
          <Napkin lines={[
            {t: '$25,000 x 4.5%', c: C.ink, on: true},
            {t: '~ $1,100', c: C.red, on: f >= w('s16', 'eleven')},
          ]} />
        </G>
        <Dave f={f} x={W / 2} y={1680} s={1.1} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s17: the free $1,000 costs more than $1,000 (payoff) ============
  scene(A('s17'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={820} s={pop(f, bs('s17'))}>
          <Stamp text="$1,136" color={C.gold} size={96} />
        </G>
        <Dave f={f} x={W / 2} y={1500} s={1.3} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s18: Dave pulled his money out the second he won ============
  scene(A('s18'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1440} s={1.5} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: 0}]} />
        <G x={W / 2} y={560} s={0.9 * P(bs('s18'))}>
          <AppPhone color={C.green}>
            <Text y={-90} size={56} color={C.green}>WITHDRAWN</Text>
            <Text y={0} size={30} color="#5B6470">$1,140 → your bank</Text>
          </AppPhone>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s19: started reading the fine print first ============
  scene(A('s19'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={330} y={1460} s={1.3} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0.3}]} />
        <G x={740} y={700} s={0.85 * P(bs('s19'))}>
          <Slip title="ALWAYS CHECK" rows={[['playthrough', '25x', C.red], ['expires', '7 days', C.red]]} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s20: 1-800-GAMBLER is free, anytime ============
  scene(A('s20'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1460} s={1.3} keys={[{at: 0, pose: 'present', expr: 'neutral', look: 0}]} />
        <G x={W / 2} y={560} s={0.85 * P(bs('s20'))}>
          <rect x={-340} y={-140} width={680} height={280} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-50} size={32} color={C.ink}>1-800-GAMBLER</Text>
          <Text y={10} size={26} color="#5B6470">free, confidential, 24/7</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s21: outro ============
  scene(A('s21'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1460} s={1.3} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ---- HUD value ----
  const damageBump = bs('s7');
  const bigDamage = bs('s17');
  const showHud = f >= bs('s2');
  const hudValue = f >= bigDamage ? '-$1,136' : f >= damageBump ? '-$140' : '-$0';

  return (
    <AbsoluteFill style={{background: C.bg}}>
      <Scenes f={f} items={S} />
      <Bumper f={f} />
      <Hud f={f} show={showHud} value={hudValue} bump={Math.min(damageBump, bigDamage) === damageBump ? damageBump : bigDamage} />
      <Captions f={f} />
      <Progress f={f} d={d} />

      <Sfx at={bs('s2')} file="stamp" />
      <Sfx at={bs('s6')} file="cash" />
      <Sfx at={bs('s7')} file="thud" vol={0.6} />
      <Sfx at={bs('s8')} file="chime" />
      <Sfx at={bs('s9')} file="buzz" vol={0.8} />
      <Sfx at={bs('s10')} file="stamp" vol={0.9} />
      <Sfx at={bs('s11')} file="ding" vol={0.7} />
      <Sfx at={bs('s13')} file="whoosh" vol={0.6} />
      <Sfx at={bs('s17')} file="stamp" />
      <Sfx at={bs('s18')} file="cash" />
      <Sfx at={bs('s21')} file="ding" vol={0.8} />

      <Audio src={staticFile('short60/voice.wav')} />
      <Audio
        src={staticFile('music/bgm.mp3')}
        volume={(x: number) => interpolate(x, [0, 30, d - 40, d], [0, 0.09, 0.09, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        loop
      />
    </AbsoluteFill>
  );
};

export type Short60Props = {timings: Timings | null};
export const Short60: React.FC<Short60Props> = ({timings}) => {
  if (!timings) return null;
  return (
    <TimingProvider t={timings}>
      <Body />
    </TimingProvider>
  );
};
