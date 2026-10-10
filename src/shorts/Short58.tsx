import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {G, Text, Stamp, Bubble, Card, Monitor, Paper} from '../props';
import {Banner, Napkin} from '../props60';

// ---- vertical canvas ----
export const W = 1080;
export const H = 1920;

const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    {children}
  </svg>
);

// ---- ground/room backdrop (matches channel palette) ----
const Room: React.FC<{mood?: 'home' | 'street' | 'office'}> = ({mood = 'home'}) => (
  <Svg>
    <rect x={0} y={0} width={W} height={H} fill={C.bg} />
    <rect x={0} y={1180} width={W} height={H - 1180} fill={mood === 'street' ? C.ground : C.floor} />
    <rect x={0} y={1176} width={W} height={10} fill="#C7B592" />
    <rect x={0} y={0} width={W} height={1186} fill={mood === 'office' ? C.sky : C.wall} />
    <rect x={0} y={900} width={W} height={286} fill={C.wallDark} opacity={0.5} />
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

// ---- persistent "Dave's Debt" HUD ----
const Hud: React.FC<{f: number; show: boolean; value: string; bump: number}> = ({f, show, value, bump}) => {
  if (!show) return null;
  const o = ease(f, 0, 10);
  const k = pop(Math.max(0, f - bump), 0, 10, 240);
  return (
    <Svg>
      <g transform={`translate(${W - 210},150) scale(${1 + k * 0.12})`} opacity={o}>
        <rect x={-150} y={-56} width={300} height={112} rx={18} fill="#fff" stroke={C.ink} strokeWidth={5} />
        <Text y={-18} size={20} color={C.gray} ls={1}>DAVE'S DEBT</Text>
        <Text y={28} size={40} color={value.startsWith('-') ? C.red : C.green}>{value}</Text>
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

  // ============ s1: HOOK — debt collector calling about a car he's never driven ============
  scene(0, () => {
    const sk = shake(f, 4, 10, 16);
    return (
      <AbsoluteFill>
        <Room />
        <Svg>
          <Dave f={f} x={W / 2} y={1440} s={1.55} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} sweat />
          <G x={W / 2 + sk.x} y={520 + sk.y} s={0.95 * P(0)}>
            <Banner title="UNKNOWN NUMBER" body="DEBT COLLECTOR" w={680} />
          </G>
          <G x={W / 2} y={200} s={pop(f, 10)}>
            <Stamp text="NEVER DROVE IT" color={C.red} size={54} />
          </G>
        </Svg>
      </AbsoluteFill>
    );
  });

  // ============ s2: six months earlier, he signed one paper for Bob ============
  scene(A('s2'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={260} s={pop(f, bs('s2'))}>
          <Stamp text="6 MONTHS EARLIER" color={C.navy} size={46} />
        </G>
        <Dave f={f} x={330} y={1460} s={1.3} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0.3}]} />
        <Bob f={f} x={750} y={1460} s={1.3} flip keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: -0.3}]} />
        <G x={W / 2} y={760} s={0.9 * P(bs('s2') + 6)}>
          <Paper id="s2paper" text={'SIGN\nHERE X'} reveal={1} w={420} h={260} size={66} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s3: Bob needed a car, bad credit, $18,000 loan ============
  scene(A('s3'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Bob f={f} x={W / 2} y={1460} s={1.3} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0}]} />
        <G x={W / 2} y={720} s={0.95 * P(bs('s3'))}>
          <Stamp text="BAD CREDIT" color={C.red} size={42} />
        </G>
        <G x={W / 2} y={560} s={0.95 * pop(f, w('s3', 'thousand'))}>
          <Card top="THE LOAN" big="$18,000" color={C.navy} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s4: a co-signer isn't a reference, it's a second borrower ============
  scene(A('s4'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1460} s={1.3} keys={[{at: 0, pose: 'point_up', expr: 'worried', look: 0}]} />
        <G x={W / 2} y={620} s={0.95 * P(bs('s4'))}>
          <rect x={-360} y={-200} width={720} height={400} rx={26} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-120} size={32} color={C.gray}>NOT a reference</Text>
          <Text y={-60} size={46} color={C.ink}>A SECOND BORROWER</Text>
          <Text y={40} size={30} color="#5B6470">same loan. same debt.</Text>
          <Text y={110} size={70} color={C.red}>$18,000</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s5: 3 months later, mortgage officer flags the car payment on Dave's report ============
  scene(A('s5'), () => (
    <AbsoluteFill>
      <Room mood="office" />
      <Svg>
        <Dave f={f} x={W / 2} y={1500} s={1.2} keys={[{at: 0, pose: 'think', expr: 'worried', look: 0}]} />
        <G x={W / 2} y={620} s={0.9 * P(bs('s5'))}>
          <Monitor value="$400/mo" valueColor={C.red} title="CREDIT REPORT" />
        </G>
        <G x={W / 2} y={1040} s={pop(f, w('s5', 'flags'))}>
          <Stamp text="WHOSE IS THIS?" color={C.red} size={38} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s6: it's Bob's car, but Dave's debt too ============
  scene(A('s6'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1500} s={1.3} keys={[{at: 0, pose: 'facepalm', expr: 'sad', look: 0}]} />
        <G x={W / 2} y={640} s={0.9 * P(bs('s6'))}>
          <rect x={-340} y={-140} width={680} height={280} rx={24} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-50} size={34} color="#5B6470">BOB'S CAR.</Text>
          <Text y={20} size={44} color={C.red}>DAVE'S DEBT.</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s7: Bob loses the job and stops paying ============
  scene(A('s7'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Bob f={f} x={W / 2} y={1500} s={1.3} keys={[{at: 0, pose: 'sad' as any, expr: 'sad', look: 0}]} />
        <G x={W / 2} y={700} s={0.85 * P(bs('s7'))}>
          <Bubble text="can't pay\nright now..." size={34} bg="#fff" />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s8: the debt collector calls Dave directly ============
  scene(A('s8'), () => {
    const sk = shake(f, bs('s8'), 14, 14);
    return (
      <AbsoluteFill>
        <Room />
        <Svg>
          <Dave f={f} x={W / 2} y={1480} s={1.4} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} sweat />
          <G x={W / 2 + sk.x} y={560 + sk.y} s={pop(f, bs('s8'))}>
            <Banner title="DEBT COLLECTOR · now" body="calling YOU directly" color={C.red} w={680} />
          </G>
        </Svg>
      </AbsoluteFill>
    );
  });

  // ============ s9: one signature gave the lender two wallets for one car ============
  scene(A('s9'), () => (
    <AbsoluteFill>
      <Room mood="street" />
      <Svg>
        <G x={W / 2} y={900} s={0.95 * P(bs('s9'))}>
          <rect x={-380} y={-260} width={760} height={520} rx={28} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-170} size={32} color={C.ink}>1 car. 2 wallets.</Text>
          <circle cx={-170} cy={-20} r={120} fill={C.greenLight} stroke={C.ink} strokeWidth={5} />
          <Text x={-170} y={-20} size={32} color={C.ink}>BOB</Text>
          <circle cx={170} cy={-20} r={120} fill="#F6C9D4" stroke={C.ink} strokeWidth={5} />
          <Text x={170} y={-20} size={32} color={C.ink}>DAVE</Text>
          <Text y={200} size={30} color="#5B6470">the lender can take from either</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s10: Dave pays $1,200 just to stop it ============
  scene(A('s10'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1500} s={1.3} keys={[{at: 0, pose: 'carry', expr: 'sad', look: 0}]} />
        <G x={W / 2} y={620} s={0.9 * P(bs('s10'))}>
          <Card top="DAVE PAYS" big="$1,200" color={C.red} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s11: the repossession letter + the scary math (merged, low point) ============
  scene(A('s11'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={320} s={pop(f, bs('s11'))}>
          <Stamp text="REPOSSESSION" color={C.red} size={44} />
        </G>
        <G x={W / 2} y={820} s={0.95 * P(bs('s11') + 10)}>
          <Napkin lines={[
            {t: 'owe $15,000', c: C.ink, on: true},
            {t: '- sell $8,000', c: C.red, on: f >= w('s11', 'sell')},
            {t: 'gap: $7,000', c: C.red, on: f >= w('s11', 'thousand', 1)},
          ]} />
        </G>
        <Dave f={f} x={W / 2} y={1660} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s12: Dave and Bob make a plan ============
  scene(A('s12'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={360} y={1460} s={1.25} keys={[{at: 0, pose: 'talk', expr: 'neutral', look: 0.3}]} />
        <Bob f={f} x={720} y={1460} s={1.25} flip keys={[{at: 0, pose: 'thumbs', expr: 'happy', look: -0.3}]} />
        <G x={W / 2} y={760} s={0.85 * P(bs('s12'))}>
          <Bubble text="sell it myself,\ncover the rest" size={34} bg="#fff" />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s13: loan closes, damage stops at $1,200, the $7k gap never happens ============
  scene(A('s13'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1480} s={1.4} keys={[{at: 0, pose: 'celebrate', expr: 'grin', look: 0}]} />
        <G x={W / 2} y={600} s={0.9 * P(bs('s13'))}>
          <Card top="LOAN CLOSED" big="$1,200" color={C.green} />
        </G>
        <G x={W / 2} y={260} s={pop(f, w('s13', 'happens'))}>
          <Stamp text="$7,000 AVOIDED" color={C.gold} size={48} />
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s14: that night, Dave finds the paper he signed ============
  scene(A('s14'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1540} s={1.2} keys={[{at: 0, pose: 'think', expr: 'suspicious', look: 0}]} />
        <G x={W / 2} y={700} s={0.9 * P(bs('s14'))}>
          <rect x={-320} y={-220} width={640} height={440} rx={18} fill="#fff" stroke={C.ink} strokeWidth={6} />
          {Array.from({length: 7}).map((_, i) => (
            <line key={i} x1={-280} x2={280} y1={-160 + i * 56} y2={-160 + i * 56} stroke="#E6DCC8" strokeWidth={3} />
          ))}
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s15: the FTC sentence that predicted everything ============
  scene(A('s15'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <G x={W / 2} y={820} s={0.95 * P(bs('s15'))}>
          <Paper
            id="s15quote"
            text={"If the borrower\ndoesn't pay,\nyou will have to."}
            reveal={Math.min(1, (f - bs('s15')) / 50)}
            color={C.red}
            w={820}
            h={520}
            size={78}
          />
        </G>
        <Dave f={f} x={W / 2} y={1660} s={1.1} keys={[{at: 0, pose: 'shock', expr: 'shock', look: 0}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s16: the rule — could I pay this whole loan, alone? ============
  scene(A('s16'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1500} s={1.3} keys={[{at: 0, pose: 'point_up', expr: 'neutral', look: 0}]} />
        <G x={W / 2} y={640} s={0.9 * P(bs('s16'))}>
          <rect x={-380} y={-200} width={760} height={400} rx={26} fill="#fff" stroke={C.ink} strokeWidth={6} />
          <Text y={-100} size={34} color={C.ink}>THE RULE:</Text>
          <Text y={-20} size={40} color={C.navy}>"Could I pay this</Text>
          <Text y={50} size={40} color={C.navy}>whole loan, alone?"</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s17: if not, find another way to help your friend ============
  scene(A('s17'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={330} y={1480} s={1.3} keys={[{at: 0, pose: 'wave', expr: 'happy', look: 0.3}]} />
        <Bob f={f} x={750} y={1480} s={1.3} flip keys={[{at: 0, pose: 'wave', expr: 'happy', look: -0.3}]} />
      </Svg>
    </AbsoluteFill>
  ));

  // ============ s18: outro / subscribe ============
  scene(A('s18'), () => (
    <AbsoluteFill>
      <Room />
      <Svg>
        <Dave f={f} x={W / 2} y={1500} s={1.3} keys={[{at: 0, pose: 'present', expr: 'happy', look: 0}]} />
        <G x={W / 2} y={620} s={pop(f, bs('s18'))}>
          <rect x={-320} y={-130} width={640} height={260} rx={24} fill={C.navy} />
          <Text y={-36} size={56} color="#fff" ls={2}>SUBSCRIBE</Text>
          <Text y={44} size={26} color="#CFE0F0" weight={500}>the only paper we'll ask you to sign</Text>
        </G>
      </Svg>
    </AbsoluteFill>
  ));

  // ---- HUD value: $1,200 paid -> bumps to worst-case $8,200 -> relief back to final $1,200 ----
  const hudStart = bs('s10');
  const worst = w('s11', 'thousand', 1);
  const relief = bs('s13');
  const showHud = f >= hudStart;
  const hudValue = f >= relief ? '-$1,200' : f >= worst ? '-$8,200' : '-$1,200';
  const hudBump = f >= relief ? relief : f >= worst ? worst : hudStart;

  return (
    <AbsoluteFill style={{background: C.bg}}>
      <Scenes f={f} items={S} />
      <Bumper f={f} />
      <Hud f={f} show={showHud} value={hudValue} bump={hudBump} />
      <Captions f={f} />
      <Progress f={f} d={d} />

      <Sfx at={0} file="buzz" vol={0.8} />
      <Sfx at={bs('s2')} file="paper" vol={0.6} />
      <Sfx at={bs('s4')} file="stamp" />
      <Sfx at={bs('s5')} file="clank" vol={0.6} />
      <Sfx at={bs('s6')} file="thud" vol={0.6} />
      <Sfx at={bs('s8')} file="buzz" vol={0.8} />
      <Sfx at={bs('s9')} file="cash" />
      <Sfx at={bs('s10')} file="cash" />
      <Sfx at={bs('s11')} file="rip" vol={0.7} />
      <Sfx at={worst} file="sting" vol={0.7} />
      <Sfx at={bs('s13')} file="chime" />
      <Sfx at={bs('s15')} file="stamp" />
      <Sfx at={bs('s18')} file="ding" vol={0.8} />

      <Audio src={staticFile('short58/voice.wav')} />
      <Audio
        src={staticFile('music/bgm.mp3')}
        volume={(x: number) => interpolate(x, [0, 30, d - 40, d], [0, 0.09, 0.09, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        loop
      />
    </AbsoluteFill>
  );
};

export type Short58Props = {timings: Timings | null};
export const Short58: React.FC<Short58Props> = ({timings}) => {
  if (!timings) return null;
  return (
    <TimingProvider t={timings}>
      <Body />
    </TimingProvider>
  );
};
