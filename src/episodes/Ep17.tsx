import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, DreamBg, DreamFrame, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from '../fx';
import {Bubble, Calendar, Clock, Coin, MoneyStack, Sparkle, SourceTag, Stamp, Text, XMark} from '../props';
import {Bar, Frame, Row, Sign, SubButton, Bell, Umbrella, Phone} from '../props2';
import {Plate, Raccoon, SourceCard, Ticket, TollBooth} from '../props3';
import {House} from '../props4';
import {MemberCard} from '../props8';
import {BetPhone, BigCoin, Brain, CasinoBg, Chip, ChipStack, Cocktail, FELT, Hundred, NoClock, PlayingCard, RouletteWheel, SlotMachine} from '../props17';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Boss: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Box: React.FC<{w: number; h: number; fill?: string}> = ({w, h, fill = '#fff'}) => <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill={fill} stroke={C.ink} strokeWidth={6} />;

export const Ep17: React.FC = () => {
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

  // ============ COLD OPEN ============
  {
    const st = w('o1', 'strip');
    const eb = w('o1', 'eight');
    const tf = w('o2', 'twenty');
    const dy = w('o2', 'day');
    q(2, 'pop', 0.6);
    q(st, 'ding', 0.5);
    q(eb, 'cash', 0.7);
    q(tf, 'coin', 0.6);
    q(dy, 'stamp', 0.6);
    scene(0, () => (
      <AbsoluteFill>
        <CasinoBg f={f} />
        <Svg>
          <G2 x={960} y={250} s={pop(f, 2)}><Text size={52} color="#FFE08A">LAS VEGAS STRIP CASINOS · 2025</Text></G2>
          {[0, 1, 2, 3, 4].map((i) => <ChipStack key={i} x={260 + i * 110} y={900} s={0.9 * pop(f, eb + i * 3)} n={4 + i * 2} color={[C.red, C.blue, BL, C.green, C.red][i]} />)}
          <G2 x={1200} y={470} s={pop(f, eb)}><Text size={170} color={C.yellow} stroke={C.ink} sw={12}>$8.8 BILLION</Text></G2>
          <G2 x={1200} y={590} s={pop(f, eb + 8)}><Text size={48} color="#fff">kept from gamblers</Text></G2>
          {f >= tf && (
            <G2 x={1300} y={800} s={pop(f, tf)}>
              <Box w={760} h={150} />
              <Text size={72} color={C.red}>{f >= dy ? '≈ $24 million / DAY' : '≈ $24 million'}</Text>
            </G2>
          )}
          <SourceTag f={f} at={eb} text="Nevada Gaming Control Board, 2025 · $8.8B ÷ 365" />
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const lk = w('o3', 'look');
    const fv = w('o3', 'five');
    const wn = w('o3', 'win');
    const lu = w('o4', 'luck');
    const ls = w('o4', 'lose');
    const pl = w('o5', 'playing');
    q(lk, 'pop', 0.6);
    q(fv, 'cash', 0.5);
    q(wn, 'stamp', 0.6);
    q(lu, 'buzz', 0.5);
    q(ls, 'buzz', 0.5);
    q(pl, 'sting', 0.6);
    scene(A('o3'), () => (
      <AbsoluteFill>
        <CasinoBg f={f} />
        <Svg>
          <Dave f={f} x={420} y={880} s={1.3} walk={f < lk + 20} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.6}, {at: wn, pose: 'celebrate', expr: 'grin'}, {at: pl, pose: 'shrug', expr: 'worried', look: 0.6}]} />
          <G2 x={420} y={360} s={pop(f, fv)}><MoneyStack n={5} s={1} label="$500" /></G2>
          {f >= wn && <Stamp x={420} y={180} s={pop(f, wn, 9, 260)} text="PLAN: WIN" size={52} color={C.green} r={-6} />}
          <G2 x={1350} y={260} s={pop(f, lk)}>
            <rect x={-300} y={-80} width={600} height={160} rx={30} fill="#2A1024" stroke="#FFE08A" strokeWidth={8} />
            <Text size={90} color="#FFE08A" stroke={C.red} sw={6}>CASINO</Text>
          </G2>
          {f >= lu && <G2 x={1350} y={500} s={pop(f, lu)}><Box w={700} h={110} /><Text x={-60} size={48}>needs luck?</Text><Text x={230} size={60} color={C.red}>NO</Text></G2>}
          {f >= ls && <G2 x={1350} y={650} s={pop(f, ls)}><Box w={700} h={110} /><Text x={-60} size={48}>needs Dave to lose?</Text><Text x={260} size={60} color={C.red}>NO</Text></G2>}
          {f >= pl && <Stamp x={1350} y={840} s={pop(f, pl, 9, 260)} text="JUST KEEP PLAYING" size={56} color={C.yellow} r={-4} />}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pv = [w('o6', 'edge'), w('o6', 'law'), w('o6', 'tricks')];
    pv.forEach((x) => q(x, 'stamp', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">TODAY</Text>
          {['THE EDGE', 'THE LAW', 'THE TRICKS'].map((l, i) => (
            <Frame key={l} x={380 + i * 580} y={520} s={pop(f, pv[i] - 2)} w={500} h={440} label={['hidden in every game', 'small edge → billions', 'that keep you playing'][i]}>
              {i === 0 && <RouletteWheel s={0.42} y={40} spin={f * 3} />}
              {i === 1 && <BigCoin side="H" y={40} flip={Math.cos(f * 0.3)} />}
              {i === 2 && <NoClock f={f} y={40} />}
              <Text y={-170} size={56} color={[C.green, C.blue, C.red][i]}>{l}</Text>
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 Dave's big night ============
  {
    const lt = w('c1a', 'lights');
    const bl = w('c1a', 'bells');
    const cp = w('c1a', 'carpet');
    const ch = w('c1b', 'chips');
    const rl = w('c1b', 'roulette');
    const r1 = w('c1c', 'red', 1);
    const wn = w('c1c', 'wins');
    const r2 = w('c1c', 'red', 2);
    const gn = w('c1c', 'genius');
    const hr = w('c1d', 'hour');
    const ff = w('c1d', 'fifty');
    const qt = w('c1d', 'quitting');
    q(lt, 'ding', 0.5);
    q(bl, 'ding', 0.6);
    q(bl + 6, 'ding', 0.5);
    q(cp, 'boing', 0.5);
    q(ch, 'coin', 0.6);
    q(rl, 'pop', 0.5);
    q(r1, 'cash', 0.6);
    q(wn, 'ding', 0.5);
    q(r2, 'cash', 0.6);
    q(gn, 'crowd', 0.5);
    q(hr, 'tick', 0.5);
    q(ff, 'cash', 0.6);
    q(qt, 'trombone', 0.4);
    const spin = f < r1 ? f * 4 : f < r2 - 20 ? r1 * 4 : f * 4;
    const won = (f >= r1 ? 1 : 0) + (f >= r2 ? 1 : 0);
    scene(A('c1a'), () =>
      f < A('c1b') ? (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <SlotMachine x={1250} y={560} s={0.6} lit={f >= bl && Math.floor(f / 6) % 2 ? 1 : 0} />
            <SlotMachine x={1620} y={560} s={0.6} lit={f >= bl && Math.floor(f / 6) % 2 ? 0 : 1} reels={['bar', '7', 'cherry']} />
            <Dave f={f} x={lin(f, A('c1a'), A('c1a') + 70, 200, 620)} y={880} s={1.2} walk={f < A('c1a') + 70} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: lt, pose: 'shock', expr: 'grin', look: 0.8}, {at: cp, pose: 'idle', expr: 'think', look: 0.4}]} />
            {f >= lt && [0, 1, 2, 3].map((i) => <Sparkle key={i} x={1050 + i * 260} y={200 + (i % 2) * 60} t={((f + i * 7) % 30) / 30} s={0.8} />)}
            {f >= cp && <G2 x={960} y={990} s={pop(f, cp)}><Text size={44} color="#fff" stroke={C.ink} sw={6}>very confusing carpet (on purpose?)</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c1e') ? (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <rect x={900} y={640} width={900} height={160} rx={30} fill={FELT} stroke={C.ink} strokeWidth={6} />
            <RouletteWheel x={1350} y={420} s={0.8 * pop(f, rl - 6)} spin={spin} hl={f >= r1 && f < r1 + 40 ? 'red' : 'none'} />
            <Dave f={f} x={520} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: wn, pose: 'celebrate', expr: 'grin'}, {at: hr, pose: 'hips', expr: 'smug', look: 0.8}]} />
            {f < rl && <G2 x={520} y={380} s={pop(f, A('c1b'))}><Hundred s={0.6} r={-6} /><Hundred s={0.6} y={40} r={4} /></G2>}
            {f >= ch && <ChipStack x={760} y={660} s={pop(f, ch)} n={5} color={C.red} />}
            {Array.from({length: won}).map((_, i) => <G2 key={i} x={1650} y={150 + i * 90} s={pop(f, i ? r2 : r1)}><Text size={60} color={C.green} stroke={C.ink} sw={6}>RED! WIN!</Text></G2>)}
            {f >= gn && f < hr && <G2 x={560} y={420} s={pop(f, gn)}><Bubble text="I'm a genius." size={44} tail="down" /></G2>}
            {f >= ff && <G2 x={1350} y={900} s={pop(f, ff)}><Box w={520} h={120} /><Text size={70} color={C.green}>+$150</Text></G2>}
            {f >= hr && <G2 x={1740} y={880} s={0.6 * pop(f, hr)}><Clock f={f} /></G2>}
            {f >= qt && <G2 x={560} y={420} s={pop(f, qt)}><Bubble text="Goodbye, boss!" size={44} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Boss f={f} x={1400} y={860} s={1.3 * pop(f, A('c1e'))} keys={[{at: 0, pose: 'hips', expr: 'smug', look: -0.8}]} />
            <G2 x={1400} y={330} s={pop(f, A('c1e') + 4)}><Text size={48}>THE CASINO</Text></G2>
            <Dave f={f} x={420} y={860} s={1.1} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={420} y={400}><Text size={44} color={C.green}>+$150</Text></G2>
            {f >= w('c1e', 'calm') && <G2 x={1400} y={200} s={pop(f, w('c1e', 'calm'))}><Text size={52} color={C.blue}>completely calm</Text></G2>}
            {f >= w('c1f', 'secret') && (
              <G2 x={900} y={560} s={pop(f, w('c1f', 'secret'))}>
                <Box w={560} h={200} fill="#FFF7D6" />
                <Text y={-30} size={48}>every game has</Text>
                <Text y={36} size={52} color={C.red}>a secret in the math</Text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ),
    );
    q(w('c1e', 'calm'), 'pop', 0.5);
    q(w('c1f', 'secret'), 'dream', 0.5);
  }

  // ============ CH2 Roulette ============
  {
    const tp = w('c2a', 'thirty');
    const e1 = w('c2b', 'eighteen');
    const e2 = w('c2b', 'eighteen', 1);
    const gr = w('c2b', 'green');
    const nm = w('c2c', 'number');
    const tf = w('c2c', 'thirty');
    const fr = w('c2d', 'fair');
    const ts = w('c2d', 'seven');
    const ql = w('c2d', 'quietly');
    const eg = w('c2e', 'edge');
    const fv = w('c2e', 'five');
    const hn = w('c2f', 'hundred');
    const kp = w('c2f', 'keep');
    const rc = w('c2g', 'raccoon');
    const sm = w('c2g', 'same');
    const bt = w('c2g', 'bet');
    q(tp, 'pop', 0.5);
    q(e1, 'pop', 0.5);
    q(e2, 'pop', 0.5);
    q(gr, 'ding', 0.6);
    q(nm, 'coin', 0.5);
    q(tf, 'cash', 0.5);
    q(fr, 'pop', 0.5);
    q(ql, 'whoosh_s', 0.5);
    q(eg, 'stamp', 0.7);
    q(fv, 'ding', 0.6);
    q(hn, 'cash', 0.5);
    q(kp, 'coin', 0.6);
    q(rc, 'pop', 0.6);
    q(sm, 'ding', 0.5);
    q(bt, 'coin', 0.6);
    scene(A('c2a'), () =>
      f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <RouletteWheel x={520} y={540} s={1.05 * pop(f, A('c2a'))} spin={f * 1.2} hl={f >= gr && f < nm ? 'green' : 'none'} />
            {f < nm ? (
              <g>
                <G2 x={1400} y={200} s={pop(f, tp)}><Text size={80}>38 pockets</Text></G2>
                {[
                  [e1, '18 red', C.red],
                  [e2, '18 black', BL],
                  [gr, '2 green: 0 and 00', GRN],
                ].map(([at, l, c], i) => (
                  <G2 key={i} x={1400} y={380 + i * 150} s={pop(f, at as number)}>
                    <Box w={620} h={110} />
                    <circle cx={-250} r={30} fill={c as string} stroke={C.ink} strokeWidth={4} />
                    <Text x={30} size={52}>{l as string}</Text>
                  </G2>
                ))}
              </g>
            ) : (
              <g>
                <Chip x={1100} y={200} s={0.8 * pop(f, nm)} label="$1" color={C.blue} />
                <G2 x={1450} y={200} s={pop(f, nm + 4)}><Text size={48}>one single number</Text></G2>
                {f >= tf && <G2 x={1400} y={420} s={pop(f, tf)}><Box w={700} h={130} /><Text x={-120} size={48}>casino pays:</Text><Text x={180} size={70} color={C.red}>35 to 1</Text></G2>}
                {f >= fr && <G2 x={1400} y={600} s={pop(f, fr)}><Box w={700} h={130} fill="#E8F7EC" /><Text x={-120} size={48}>fair would be:</Text><Text x={180} size={70} color={C.green}>{f >= ts ? '37 to 1' : '...'}</Text></G2>}
                {f >= ql && <G2 x={1400} y={800} s={pop(f, ql)}><Text size={52} color={C.red}>a little less than fair</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c2g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130} s={pop(f, A('c2e'))}><Text size={56}>that little gap =</Text></G2>
            {f >= eg && <Stamp x={960} y={270} s={pop(f, eg, 9, 260)} text="THE HOUSE EDGE" size={70} color={C.red} />}
            {f >= fv && f < hn && <G2 x={960} y={560} s={pop(f, fv)}><Text size={220} color={C.red} stroke={C.ink} sw={12}>5.26%</Text><Text y={150} size={44}>American roulette (2 ÷ 38)</Text></G2>}
            {f >= hn && (
              <g>
                <G2 x={560} y={760} s={pop(f, hn)}><MoneyStack n={8} s={1.3} label="$100 bet" /></G2>
                <G2 x={960} y={620} s={pop(f, hn + 6)}><Text size={80}>→</Text></G2>
                {f >= kp && <G2 x={1360} y={640} s={pop(f, kp)}>{[0, 1, 2, 3, 4].map((i) => <Coin key={i} x={-120 + i * 60} y={0} s={1.6} />)}<Text y={120} size={60} color={C.red}>≈ $5.26 kept</Text><Text y={190} size={36} color="#5B6470">on average</Text></G2>}
              </g>
            )}
            <SourceTag f={f} at={fv} text="UNLV Center for Gaming Research · 2/38 = 5.26%" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <TollBooth x={1080} y={860} s={1.2 * pop(f, A('c2g'))} label="HOUSE EDGE" barUp={f >= bt + 10 ? 1 : 0} />
            <Raccoon f={f} x={1080} y={540} s={pop(f, rc) * 1.1} mood="greedy" grab={f >= bt ? 1 : 0} holdCoin={f >= bt + 6} />
            <Dave f={f} x={lin(f, A('c2g'), bt, 300, 640)} y={860} s={1.1} walk={f < bt} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: bt, pose: 'shrug', expr: 'worried', look: 0.8}]} handItem={<Chip s={0.4} color={C.blue} />} />
            {f >= sm && <G2 x={960} y={160} s={pop(f, sm)}><Text size={56}>a small toll on every single bet</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 Blackjack & slots ============
  {
    const bj = w('c3a', 'blackjack');
    const be = w('c3a', 'best');
    const ct = w('c3b', 'chart');
    const hf = w('c3b', 'half');
    const gs = w('c3c', 'guess');
    const mk = w('c3c', 'mistake');
    const sx = w('c3d', 'six');
    const fr = w('c3d', 'four');
    const sl = w('c3e', 'slot');
    const sv = w('c3e', 'seven');
    const sc = w('c3f', 'seconds');
    const hd = w('c3f', 'hundreds');
    q(bj, 'flip', 0.6);
    q(be, 'ding', 0.5);
    q(ct, 'paper', 0.5);
    q(hf, 'ding', 0.6);
    q(gs, 'boing', 0.5);
    q(mk, 'buzz', 0.5);
    q(sx, 'stamp', 0.6);
    q(fr, 'thud', 0.6);
    q(sl, 'ding', 0.6);
    q(sv, 'coin', 0.6);
    q(sc, 'click', 0.5);
    q(hd, 'cash', 0.5);
    const edge = f < mk ? 0.5 : ease(f, mk, mk + 20, 0.5, 1.5);
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <rect x={200} y={420} width={700} height={360} rx={180} fill={FELT} stroke={C.ink} strokeWidth={6} />
            <PlayingCard x={470} y={590} s={pop(f, bj)} r={-8} rank="A" suit="s" />
            <PlayingCard x={630} y={590} s={pop(f, bj + 4)} r={8} rank="K" suit="h" />
            <G2 x={550} y={330} s={pop(f, A('c3a'))}><Text size={70}>BLACKJACK</Text></G2>
            {f >= be && f < ct && <G2 x={1380} y={300} s={pop(f, be)}><Text size={50} color={C.green}>some of the best odds in the building</Text></G2>}
            {f >= ct && f < sx && (
              <g>
                <G2 x={1380} y={300} s={pop(f, ct)}>
                  <rect x={-200} y={-140} width={400} height={280} rx={16} fill="#fff" stroke={C.ink} strokeWidth={6} />
                  {Array.from({length: 24}).map((_, i) => <rect key={i} x={-176 + (i % 6) * 60} y={-110 + Math.floor(i / 6) * 60} width={52} height={52} rx={6} fill={[C.green, C.yellow, C.red, C.blue][(i * 7) % 4]} opacity={0.8} />)}
                  <Text y={180} size={36} color="#5B6470">perfect strategy chart</Text>
                </G2>
                {f >= hf && <G2 x={1380} y={690} s={pop(f, hf)}><Text size={90} color={C.green}>edge ≈ {edge.toFixed(1)}%</Text></G2>}
                {f >= gs && <Dave f={f} x={1000} y={1000} s={0.8} keys={[{at: 0, pose: 'think', expr: 'think'}, {at: mk, pose: 'shrug', expr: 'worried'}]} />}
                {f >= gs && <G2 x={1400} y={860} s={pop(f, gs)}><Text size={44} color={C.red}>{f >= mk ? 'every mistake → bigger edge' : 'guessing... hunches...'}</Text></G2>}
              </g>
            )}
            {f >= sx && (
              <g>
                <Sign x={1380} y={320} s={pop(f, sx)} text="BLACKJACK PAYS 6:5" color={C.red} />
                <line x1={1000} y1={880} x2={1760} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                <Bar x={1180} y={880} h={ease(f, sx + 10, sx + 22, 2, 70)} color={C.green} label="3:2 table" value="~0.5%" w={220} />
                <Bar x={1580} y={880} h={ease(f, fr - 4, fr + 12, 2, 270)} color={C.red} label="6:5 table" value="~1.9%" w={220} />
                {f >= fr && <G2 x={1380} y={500} s={pop(f, fr)}><Text size={52} color={C.red}>≈ 4× bigger edge</Text></G2>}
              </g>
            )}
            <SourceTag f={f} at={hf} text="UNLV Center for Gaming Research (6 decks, basic strategy)" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <SlotMachine x={560} y={620} s={1.05 * pop(f, A('c3e'))} lever={f >= sc ? Math.max(0, Math.sin((f - sc) * 0.35)) : 0} off={f >= sc ? [(f * 40) % 150, (f * 33) % 150, (f * 27) % 150] : [0, 0, 0]} />
            {f >= sv && <G2 x={1330} y={380} s={pop(f, sv)}><Box w={820} h={200} /><Text y={-36} size={52}>Strip slots keep</Text><Text y={40} size={64} color={C.red}>~7 to 8¢ of every $1</Text></G2>}
            {f >= sc && <G2 x={1330} y={620} s={pop(f, sc)}><Text size={52} color="#fff" stroke={C.ink} sw={8}>a new bet every few seconds</Text></G2>}
            {f >= hd && <G2 x={1330} y={720} s={pop(f, hd)}><Text size={60} color={C.yellow} stroke={C.ink} sw={8}>hundreds of spins / hour</Text></G2>}
            <SourceTag f={f} at={sv} text="Nevada Gaming Control Board, Strip slot win % 2025 (≈ 7.2–7.9%)" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 Law of large numbers ============
  {
    const lw = w('c4a', 'law');
    const cn = w('c4b', 'coin');
    const sv = w('c4b', 'seven');
    const lk = w('c4b', 'luck');
    const ml = w('c4c', 'million');
    const av = w('c4c', 'averages');
    const tn = w('c4d', 'ten');
    const wn = w('c4d', 'win');
    const mb = w('c4e', 'millions');
    const th = w('c4e', 'thousands');
    const np = w('c4f', 'nope');
    const avg = w('c4f', 'average');
    const eg = w('c4g', 'edge');
    const gb = w('c4g', 'gambling');
    const mt = w('c4g', 'math');
    q(lw, 'stamp', 0.6);
    q(cn, 'flip', 0.6);
    q(sv, 'ding', 0.5);
    q(lk, 'boing', 0.5);
    q(ml, 'whoosh', 0.5);
    q(av, 'ding', 0.6);
    q(tn, 'flip', 0.5);
    q(wn, 'cash', 0.5);
    q(th, 'crowd', 0.5);
    q(A('c4f'), 'dream', 0.5);
    q(np, 'buzz', 0.7);
    q(avg, 'ding', 0.5);
    q(eg, 'stamp', 0.6);
    q(gb, 'pop', 0.5);
    q(mt, 'chime', 0.5);
    const pts = [70, 40, 62, 44, 56, 47, 53, 48, 52, 49, 51, 50, 50.5, 50, 50];
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Stamp x={960} y={120} s={pop(f, lw, 9, 260)} text="LAW OF LARGE NUMBERS" size={56} color={C.blue} />
            <BigCoin x={420} y={520} s={pop(f, A('c4a') + 4)} side={Math.floor(f / 10) % 2 ? 'H' : 'T'} flip={f >= cn && f < ml + 30 ? Math.cos(f * 0.3) : 1} />
            {f >= cn && f < ml && (
              <G2 x={1250} y={520} s={pop(f, cn)}>
                <Text y={-200} size={52}>10 flips</Text>
                {f >= sv && (
                  <g>
                    <line x1={-300} y1={200} x2={300} y2={200} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
                    <Bar x={-130} y={200} h={ease(f, sv, sv + 12, 2, 280)} color={C.green} label="heads" value="7" w={200} />
                    <Bar x={130} y={200} h={ease(f, sv, sv + 12, 2, 120)} color={C.blue} label="tails" value="3" w={200} />
                  </g>
                )}
              </G2>
            )}
            {f >= lk && f < ml && <G2 x={420} y={800} s={pop(f, lk)}><Text size={56} color={C.red}>just luck</Text></G2>}
            {f >= ml && (
              <g>
                <G2 x={1250} y={200} s={pop(f, ml)}><Text size={52}>1,000,000 flips: % heads</Text></G2>
                <LineChartLite x={1250} y={560} t={ease(f, ml, av, 0, 1)} pts={pts} />
                {f >= av && <G2 x={1250} y={900} s={pop(f, av)}><Text size={52} color={C.green}>luck averages out → 50%</Text></G2>}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={860} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy'}, {at: wn, pose: 'celebrate', expr: 'grin'}]} />
            <G2 x={380} y={360} s={pop(f, tn)}><Text size={44}>Dave: 1 night ≈ 10 flips</Text></G2>
            {f >= wn && <G2 x={380} y={440} s={pop(f, wn)}><Text size={44} color={C.green}>he really can win</Text></G2>}
            {f >= mb && <Boss f={f} x={1000} y={860} s={1.1} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0.8}]} />}
            {f >= mb && <G2 x={1400} y={200} s={pop(f, mb)}><Text size={48}>casino: millions of bets / day</Text></G2>}
            {f >= th && Array.from({length: 24}).map((_, i) => (
              <G2 key={i} x={1180 + (i % 6) * 110} y={420 + Math.floor(i / 6) * 150} s={pop(f, th + i)}>
                <Stick f={f + i * 5} x={0} y={120} s={0.38} acc={['hair']} seed={7} keys={[{at: 0, pose: i % 3 ? 'hold' : 'think', expr: i % 4 ? 'happy' : 'worried'}]} />
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4g') ? (
        <AbsoluteFill>
          {f < np ? <DreamBg /> : <Board />}
          <Svg>
            <Boss f={f} x={560} y={860} s={1.2} keys={[{at: 0, pose: 'panic', expr: 'angry', look: 0.8}, {at: np, pose: 'relax', expr: 'smug'}]} />
            {f < np && <G2 x={1200} y={420} s={pop(f, A('c4f') + 4)}><Bubble text={'I hope Dave\nloses BIG tonight!'} size={52} tail="left" /></G2>}
            {f >= np && f < avg && <XMark x={1200} y={420} s={0.5 * pop(f, np, 9, 260)} />}
            {f >= np && <G2 x={1250} y={250} s={pop(f, w('c4f', 'care'))}><Text size={52}>doesn't care about you...</Text></G2>}
            {f >= avg && <G2 x={1250} y={500} s={pop(f, avg)}><Box w={700} h={170} fill="#FFF7D6" /><Text size={70} color={C.blue}>only the AVERAGE</Text></G2>}
          </Svg>
          {f < np && <DreamFrame label="WHAT MOST PEOPLE THINK" />}
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={180} s={pop(f, eg)}><Text size={52}>millions of bets → average = the house edge</Text></G2>
            <Dave f={f} x={500} y={880} s={1.2} keys={[{at: 0, pose: 'panic', expr: 'shock'}]} />
            {f >= gb && <G2 x={500} y={400} s={pop(f, gb)}><Text size={60} color={C.red}>GAMBLING</Text></G2>}
            {f >= gb && <RouletteWheel x={760} y={700} s={0.3} spin={f * 6} />}
            <Boss f={f} x={1400} y={880} s={1.2} keys={[{at: 0, pose: 'present', expr: 'smug', look: -0.6}]} />
            {f >= mt && (
              <G2 x={1400} y={420} s={pop(f, mt)}>
                <rect x={-230} y={-90} width={460} height={180} rx={16} fill="#2F4F3E" stroke={C.ink} strokeWidth={6} />
                <Text size={60} color="#fff">DOING MATH</Text>
              </G2>
            )}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 A million dollars an hour ============
  {
    const of = w('c5a', 'official');
    const bd = w('c5b', 'board');
    const eb = w('c5b', 'eight');
    const dv = w('c5c', 'divide');
    const mh = w('c5c', 'million');
    const hr = w('c5c', 'hour', 1);
    const nv = w('c5d', 'nevada');
    const rec = w('c5d', 'record');
    const jp = w('c5e', 'jackpots');
    const wnr = w('c5e', 'winners');
    const rl = w('c5f', 'real');
    const lo = w('c5f', 'losers');
    const sl = w('c5f', 'slice');
    q(of, 'paper', 0.5);
    q(bd, 'pop', 0.5);
    q(eb, 'cash', 0.7);
    q(dv, 'marker', 0.5);
    q(mh, 'cash', 0.7);
    q(hr, 'tick', 0.6);
    q(nv, 'pop', 0.5);
    q(rec, 'stamp', 0.6);
    q(jp, 'ding', 0.6);
    q(wnr, 'crowd', 0.5);
    q(lo, 'coin', 0.5);
    q(sl, 'cash', 0.6);
    scene(A('c5a'), () =>
      f < A('c5d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c5a'))}><Text size={56}>{f >= of ? 'the official numbers' : 'does the math work?'}</Text></G2>
            {f < dv ? (
              f >= bd && <SourceCard x={960} y={560} s={pop(f, bd)} org="NEVADA GAMING CONTROL BOARD" sub="GAMING REVENUE REPORT" title={['Las Vegas Strip', 'gaming win, 2025']} stat={f >= eb ? '$8.8 BILLION' : '...'} statLabel="kept from gamblers" />
            ) : (
              <g>
                <G2 x={560} y={520} s={pop(f, dv)}>
                  <Text y={-80} size={64}>$8.8 billion</Text>
                  <line x1={-240} y1={-10} x2={240} y2={-10} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
                  <Text y={60} size={56}>8,760 hours</Text>
                </G2>
                <Clock f={f * 6} x={1350} y={380} s={1.4 * pop(f, dv + 8)} />
                {f >= mh && <G2 x={1350} y={680} s={pop(f, mh)}><Text size={100} color={C.green} stroke={C.ink} sw={8}>≈ $1,000,000</Text></G2>}
                {f >= hr && <G2 x={1350} y={820} s={pop(f, hr)}><Text size={64} color={C.red}>every hour, day and night</Text></G2>}
              </g>
            )}
            <SourceTag f={f} at={eb} text="Nevada Gaming Control Board, 2025 · $8.8B ÷ 8,760 h" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c5f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={260} y1={860} x2={1000} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={450} y={860} h={ease(f, A('c5d'), A('c5d') + 14, 2, 8.8 * 38)} color={C.blue} label="Strip" value="$8.8B" w={240} />
            <Bar x={810} y={860} h={ease(f, nv, nv + 14, 2, 15.8 * 38)} color={C.green} label="all of Nevada" value="$15.8B" w={240} />
            {f >= rec && <Stamp x={810} y={170} s={pop(f, rec, 9, 260)} text="RECORD" size={52} color={C.red} r={-6} />}
            {f >= jp && <SlotMachine x={1450} y={560} s={0.55 * pop(f, jp)} lit={Math.floor(f / 6) % 2} />}
            {f >= jp && <G2 x={1450} y={120} s={pop(f, jp)}><Text size={44}>AFTER paying all jackpots</Text></G2>}
            {f >= wnr && <Dave f={f} x={1720} y={900} s={0.8} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} />}
            <SourceTag f={f} at={nv} text="Nevada Gaming Control Board, calendar 2025" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={330} y={560} s={pop(f, lo)}>
              {[0, 1, 2].map((i) => <Stick key={i} f={f} x={-110 + i * 110} y={260} s={0.6} acc={['cap']} seed={40 + i} keys={[{at: 0, pose: 'shrug', expr: 'sad'}]} />)}
              <Text y={-140} size={48} color={C.red}>losers' money</Text>
            </G2>
            <G2 x={960} y={560} s={pop(f, A('c5f'))}><MoneyStack n={8} s={1.2} label="the pot" /></G2>
            {f >= lo && <path d={`M 480 560 L ${lin(f, lo, lo + 20, 480, 820)} 560`} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />}
            {f >= rl && <G2 x={1600} y={560} s={pop(f, rl)}><Stick f={f} x={0} y={260} s={0.8} acc={['hair']} seed={7} keys={[{at: 0, pose: 'celebrate', expr: 'grin'}]} /><Text y={-150} size={48} color={C.green}>winners: real</Text></G2>}
            {f >= lo + 20 && <path d={`M 1100 560 L ${lin(f, lo + 20, lo + 40, 1100, 1440)} 560`} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />}
            {f >= sl && <Boss f={f} x={960} y={1000} s={0.8} keys={[{at: 0, pose: 'hold', expr: 'smug'}]} />}
            {f >= sl && <G2 x={960} y={240} s={pop(f, sl)}><Text size={52} color={C.blue}>casino keeps its slice</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 Tricks ============
  {
    const ds = w('c6a', 'designed');
    const cl = w('c6b', 'clocks');
    const wd = w('c6b', 'windows');
    const nn = w('c6b', 'nine');
    const th = w('c6b', 'three');
    const kn = w('c6b', 'knows');
    const cs = w('c6c', 'cash');
    const hu = w('c6c', 'hurts');
    const ch = w('c6c', 'chip');
    const gm = w('c6c', 'game');
    const dr = w('c6d', 'drinks');
    const al = w('c6d', 'alcohol');
    const ms = w('c6e', 'misses');
    const ab = w('c6e', 'above');
    const cb = w('c6f', 'cambridge');
    const lt = w('c6f', 'light');
    const ag = w('c6f', 'again');
    const ly = w('c6g', 'loyalty');
    const rm = w('c6g', 'rooms');
    const dn = w('c6g', 'dinners');
    const bs2 = w('c6g', 'based');
    const mn = w('c6g', 'money');
    q(ds, 'pop', 0.5);
    q(cl, 'tick', 0.6);
    q(wd, 'buzz', 0.5);
    q(nn, 'boing', 0.4);
    q(th, 'boing', 0.4);
    q(kn, 'cricket', 0.5);
    q(cs, 'cash', 0.6);
    q(hu, 'rip', 0.5);
    q(ch, 'coin', 0.6);
    q(gm, 'ding', 0.5);
    q(dr, 'pop', 0.6);
    q(al, 'boing', 0.5);
    q(ms, 'click', 0.5);
    q(ab, 'trombone', 0.5);
    q(cb, 'paper', 0.5);
    q(lt, 'dream', 0.6);
    q(ag, 'ding', 0.5);
    q(ly, 'pop', 0.5);
    q(rm, 'pop', 0.5);
    q(dn, 'pop', 0.5);
    q(bs2, 'stamp', 0.5);
    q(mn, 'coin', 0.6);
    const reels = (off3: number) => [0, 0, off3];
    scene(A('c6a'), () =>
      f < A('c6c') ? (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <G2 x={960} y={200} s={pop(f, A('c6a'))}><Text size={56} color="#fff" stroke={C.ink} sw={8}>{f >= cl ? 'TRICK 1: NO CLOCKS, NO WINDOWS' : 'the building is designed for this'}</Text></G2>
            {f >= cl && <NoClock f={f} x={1200} y={480} s={pop(f, cl)} />}
            {f >= wd && (
              <G2 x={1560} y={480} s={pop(f, wd)}>
                <rect x={-110} y={-120} width={220} height={240} rx={10} fill="#BFE6F5" stroke={C.ink} strokeWidth={6} />
                <line x1={0} y1={-120} x2={0} y2={120} stroke={C.ink} strokeWidth={5} />
                <rect x={-110} y={-120} width={220} height={240} rx={10} fill="#5A2A40" opacity={0.85} />
                <Text size={36} color="#fff">bricked up</Text>
              </G2>
            )}
            <Dave f={f} x={480} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.8}, {at: nn, pose: 'think', expr: 'think'}, {at: kn, pose: 'shrug', expr: 'tired'}]} />
            {f >= nn && <G2 x={560} y={400} s={pop(f, nn)}><Bubble text={f >= th ? '9 PM? 3 AM??' : '9 PM?'} size={48} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c6c'))}><Text size={56}>TRICK 2: CHIPS INSTEAD OF CASH</Text></G2>
            <G2 x={520} y={440} s={pop(f, cs)}><Hundred s={1.2} /></G2>
            {f >= hu && <G2 x={520} y={620} s={pop(f, hu)}><Text size={52} color={C.red}>real money: hurts</Text></G2>}
            {f >= ch && <G2 x={1400} y={440} s={pop(f, ch)}><Chip s={1.6} label="$100" color={C.blue} /></G2>}
            {f >= gm && <G2 x={1400} y={620} s={pop(f, gm)}><Text size={52} color={C.green}>plastic chip: feels like a game</Text></G2>}
            <Dave f={f} x={960} y={1000} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'worried', look: -0.6}, {at: hu, pose: 'shock', expr: 'sad', look: -0.6}, {at: ch, pose: 'celebrate', expr: 'grin', look: 0.6}]} />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6e') ? (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <G2 x={960} y={200} s={pop(f, A('c6d'))}><Text size={56} color="#fff" stroke={C.ink} sw={8}>TRICK 3: FREE DRINKS</Text></G2>
            <Cocktail x={1350} y={560} s={1.6 * pop(f, dr)} />
            {f >= dr && <G2 x={1350} y={330} s={pop(f, dr + 6)}><Text size={64} color={C.yellow} stroke={C.ink} sw={8}>FREE!</Text></G2>}
            <Dave f={f} x={600} y={880} s={1.2} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: dr, pose: 'hold', expr: 'grin', look: 0.8}, {at: al, pose: 'celebrate', expr: 'money'}]} />
            {f >= al && <G2 x={640} y={390} s={pop(f, al)}><Bubble text={'Everything on red!\nGreat idea!'} size={44} tail="down" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c6g') ? (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <G2 x={960} y={200} s={pop(f, A('c6e'))}><Text size={56} color="#fff" stroke={C.ink} sw={8}>TRICK 4: NEAR MISSES</Text></G2>
            <SlotMachine x={560} y={640} s={0.95} lever={f < ms ? Math.max(0, Math.sin((f - A('c6e')) * 0.3)) : 0} off={f < ms ? [(f * 40) % 150, (f * 33) % 150, (f * 27) % 150] : reels(ease(f, ms, ms + 30, 0, 118))} label={f >= ab ? 'SO CLOSE!' : 'JACKPOT'} lit={f >= ab ? 1 : 0} />
            {f >= ab && f < cb && <Dave f={f} x={1150} y={880} s={1.1} keys={[{at: 0, pose: 'facepalm', expr: 'shock', look: -0.8}]} />}
            {f >= cb && (
              <g>
                <Brain x={1300} y={520} s={1.3 * pop(f, cb)} glow={f >= lt ? 0.6 + 0.4 * Math.sin(f / 5) : 0} />
                {f >= lt && <G2 x={1300} y={800} s={pop(f, lt)}><Text size={44} color="#fff" stroke={C.ink} sw={6}>near miss ≈ lights up like a WIN</Text></G2>}
                {f >= ag && <G2 x={1560} y={330} s={pop(f, ag)}><Bubble text="Try again!" size={48} tail="left" /></G2>}
              </g>
            )}
            <SourceTag f={f} at={cb} text="Clark et al., Neuron (2009), University of Cambridge" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c6g'))}><Text size={56}>TRICK 5: LOYALTY CARDS & FREE COMPS</Text></G2>
            <MemberCard x={480} y={420} s={pop(f, ly)} tier="PLAYERS CLUB" price="free stuff!" color={C.red} />
            {f >= rm && <G2 x={1100} y={400} s={0.45 * pop(f, rm)}><House /></G2>}
            {f >= rm && <G2 x={1100} y={520} s={pop(f, rm)}><Text size={40}>free room</Text></G2>}
            {f >= dn && <Plate x={1500} y={400} s={pop(f, dn)} label="free dinner" />}
            {f >= bs2 && (
              <G2 x={960} y={740} s={pop(f, bs2)}>
                <Box w={1300} h={130} fill="#FFF7D6" />
                <Text size={48}>comps are based on how much you're EXPECTED TO LOSE</Text>
              </G2>
            )}
            {f >= mn && <Raccoon f={f} x={1650} y={900} s={0.8} mood="wink" holdCoin />}
            {f >= mn && <G2 x={1340} y={920} s={pop(f, mn)}><Text size={40} color={C.red}>a small piece of your own money</Text></G2>}
            <SourceTag f={f} at={bs2} text="N. D. Schüll, Addiction by Design (2012)" until={mn} />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 Pocket ============
  {
    const pk = w('c7a', 'pocket');
    const ei = w('c7b', 'eighteen');
    const lg = w('c7b', 'legalize');
    const tn = w('c7b', 'thirty');
    const sx = w('c7c', 'sixty');
    const sv = w('c7d', 'seventeen');
    const tw = w('c7d', 'twenty');
    const vg = w('c7e', 'vig');
    const rk = w('c7e', 'risk');
    const rc = w('c7e', 'raccoon');
    const ou = w('c7e', 'outfit');
    const ap = w('c7f', 'app');
    const two = w('c7f', 'two');
    const bd = w('c7f', 'bed');
    q(pk, 'pop', 0.6);
    q(ei, 'stamp', 0.5);
    q(lg, 'paper', 0.5);
    q(tn, 'ding', 0.6);
    q(sx, 'cash', 0.6);
    q(sv, 'coin', 0.6);
    q(tw, 'ding', 0.6);
    q(vg, 'pop', 0.5);
    q(rk, 'coin', 0.5);
    q(rc, 'pop', 0.6);
    q(ou, 'boing', 0.6);
    q(ap, 'pop', 0.5);
    q(two, 'tick', 0.5);
    q(bd, 'cricket', 0.5);
    scene(A('c7a'), () =>
      f < A('c7c') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={420} y={880} s={1.2} keys={[{at: 0, pose: 'hold', expr: 'think', look: 0.8}]} />
            <BetPhone x={760} y={560} s={0.9 * pop(f, pk)} r={6} />
            {f < ei && <G2 x={1400} y={300} s={pop(f, A('c7a') + 4)}><Text size={52}>the casino... in your pocket</Text></G2>}
            {f >= ei && <Calendar x={1250} y={380} s={pop(f, ei)} top="SUPREME COURT" year={2018} flip={0} />}
            {f >= lg && <G2 x={1600} y={380} s={pop(f, lg)}><Text size={40}>states may</Text><Text y={50} size={40}>legalize</Text></G2>}
            {f >= tn && <G2 x={1400} y={720} s={pop(f, tn)}><Box w={700} h={150} /><Text size={60} color={C.green}>39 states + D.C.</Text></G2>}
            <SourceTag f={f} at={tn} text="American Gaming Association (2026) · Murphy v. NCAA (2018)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, A('c7c'))}><Text size={56}>legal U.S. sports betting, 2025</Text></G2>
            <line x1={360} y1={880} x2={1180} y2={880} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={580} y={880} h={ease(f, sx - 4, sx + 14, 2, 600)} color={C.blue} label="bet (handle)" value="$167B" w={260} />
            <Bar x={960} y={880} h={ease(f, sv - 4, sv + 12, 2, 61)} color={C.red} label="sportsbooks kept" value="$17B" w={260} />
            {f >= sv && <G2 x={1500} y={420} s={pop(f, sv + 6)}><Text size={48}>≈ 10¢ of every $1</Text></G2>}
            {f >= tw && <G2 x={1500} y={560} s={pop(f, tw)}><Text size={90} color={C.green} stroke={C.ink} sw={6}>+23%</Text><Text y={80} size={40}>in just one year</Text></G2>}
            <SourceTag f={f} at={sx} text="American Gaming Association, 2025 revenue ($16.96B on $166.94B)" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c7f') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120} s={pop(f, vg)}><Text size={64}>the "vig"</Text></G2>
            {f >= rk && (
              <G2 x={640} y={520} s={pop(f, rk)}>
                <MoneyStack n={11} s={1.1} x={-150} label="risk $110" />
                <Text x={30} y={-80} size={80}>→</Text>
                <MoneyStack n={10} s={1.1} x={210} label="to win $100" />
              </G2>
            )}
            <TollBooth x={1400} y={860} s={pop(f, rc)} label="THE VIG" />
            {f >= rc && <Raccoon f={f} x={1400} y={560} s={pop(f, rc)} mood="greedy" hood={f >= ou} />}
            {f >= ou && <G2 x={1400} y={300} s={pop(f, ou)}><Text size={52} color={C.blue}>same raccoon, new outfit</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Svg>
            <rect x={-100} y={-100} width={2200} height={1400} fill="#1E2240" />
            <circle cx={1650} cy={200} r={80} fill="#F2E1B8" />
            {[[300, 150], [700, 90], [1100, 200], [1400, 120], [500, 300]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill="#fff" opacity={0.7} />)}
            <rect x={420} y={700} width={1080} height={120} rx={20} fill="#6B4E9E" stroke={C.ink} strokeWidth={6} />
            <rect x={420} y={640} width={260} height={90} rx={40} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <Dave f={f} x={960} y={720} s={1} keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.4}]} />
            <circle cx={1000} cy={560} r={110} fill="#6EF0A8" opacity={0.18} />
            <BetPhone x={1000} y={560} s={0.35} />
            <G2 x={960} y={200} s={pop(f, ap)}><Text size={56} color="#fff">the app never closes</Text></G2>
            {f >= two && <G2 x={1500} y={420} s={pop(f, two)}><rect x={-150} y={-60} width={300} height={120} rx={16} fill="#000" stroke="#6EF0A8" strokeWidth={4} /><Text size={64} color="#6EF0A8">2:00 AM</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH8 Plays smart ============
  {
    const dn = w('c8a', 'down');
    const bk = w('c8a', 'back');
    const sp = w('c8b', 'stop');
    const ed = w('c8b', 'education');
    const hs = [bs('c8c'), bs('c8d'), bs('c8e'), bs('c8f')];
    const wk = w('c8g', 'walked');
    const ld = w('c8g', 'loud');
    q(dn, 'trombone', 0.5);
    q(bk, 'boing', 0.4);
    q(sp, 'stamp', 0.7);
    q(ed, 'ding', 0.5);
    hs.forEach((x) => q(x, 'ding', 0.5));
    q(wk, 'step', 0.5);
    q(ld, 'crowd', 0.5);
    const items = ['Set the price before you walk in', 'Never chase losses', 'Bring your own clock', 'Not fun anymore? Get help'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c8a'), () =>
      f < A('c8b') ? (
        <AbsoluteFill>
          <CasinoBg f={f} />
          <Svg>
            <RouletteWheel x={1350} y={480} s={0.7} spin={f * 3} />
            <Dave f={f} x={520} y={880} s={1.3} sweat keys={[{at: 0, pose: 'hold', expr: 'tired', look: 0.8}, {at: bk, pose: 'hold', expr: 'worried', look: 0.8}]} />
            <G2 x={520} y={250} s={pop(f, A('c8a'))}><Text size={48} color="#fff" stroke={C.ink} sw={6}>3 AM</Text></G2>
            {f >= dn && <G2 x={520} y={340} s={pop(f, dn)}><Text size={70} color={C.red} stroke={C.ink} sw={6}>-$300</Text></G2>}
            {f >= bk && <G2 x={880} y={420} s={pop(f, bk)}><Bubble text={'One more spin...\nto win it back!'} size={40} tail="left" /></G2>}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c8g') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={110}><Text size={60}>How people keep it fun</Text></G2>
            <G2 x={1620} y={110} s={pop(f, ed)}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
            {cur === 0 && <Stamp x={960} y={480} s={pop(f, sp, 9, 260)} text="STOP, DAVE" size={90} color={C.red} r={-4} />}
            {cur === 0 && <Dave f={f} x={960} y={950} s={1} keys={[{at: 0, pose: 'shock', expr: 'shock'}]} />}
            {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1080} />)}
            {cur === 1 && <G2 x={1600} y={520}><Ticket s={1.2} text="FUN: $200" /></G2>}
            {cur === 2 && <G2 x={1600} y={520}><RouletteWheel s={0.4} spin={f * 3} /><Text y={200} size={36}>edge: same every spin</Text></G2>}
            {cur === 3 && <G2 x={1600} y={520}><Phone s={0.9} title="ALARM" value="11:00 PM" /></G2>}
            {cur === 4 && <G2 x={1600} y={520}><Box w={440} h={220} fill={C.blue} /><Text y={-50} size={44} color="#fff">free help, 24/7</Text><Text y={30} size={46} color="#fff">1-800-GAMBLER</Text></G2>}
            <SourceTag f={f} at={hs[3]} text="National Council on Problem Gambling · 1-800-GAMBLER" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={lin(f, wk, wk + 90, 500, 900)} y={880} s={1.2} walk={f < wk + 90} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.8}, {at: ld, pose: 'thumbs', expr: 'grin', look: 0.8}]} />
            <G2 x={500} y={300} s={pop(f, A('c8g'))}><MoneyStack n={4} s={1} label="$200 left" /></G2>
            {f >= ld && <G2 x={1350} y={450} s={pop(f, ld)}><Ticket s={1.6} text="VERY LOUD SHOW" /><Text y={150} size={44}>price: $300</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH9 ============
  const recap = ['Every game has a house edge (a toll)', 'Large numbers turn it into billions', 'The building + apps keep you playing'];
  {
    const r = [bs('c9b'), bs('c9c'), bs('c9d')];
    q(A('c9a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c9a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c9a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={330} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1260} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const ins = w('c9e', 'insurance');
    const clm = w('c9e', 'claims');
    const frt = w('c9e', 'fortune');
    const sb = w('c9f', 'subscribe');
    const fv = w('c9f', 'favor');
    q(ins, 'chime', 0.5);
    q(clm, 'cash', 0.5);
    q(frt, 'ding', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    q(fv, 'ding', 0.5);
    scene(A('c9e'), () =>
      f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={150} s={pop(f, A('c9e'))}><Text size={60}>Next: how insurance companies win</Text></G2>
            <Umbrella x={1150} y={560} s={1.3 * pop(f, ins)} />
            {f >= clm && <G2 x={1550} y={420} s={pop(f, clm)}><MoneyStack n={6} s={1} label="claims paid" /></G2>}
            {f >= frt && <G2 x={1400} y={860} s={pop(f, frt)}><Text size={56} color={C.green}>...and still a fortune?</Text></G2>}
            <Dave f={f} x={420} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'suspicious'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            {f >= fv && <G2 x={1400} y={760} s={pop(f, fv)}><Text size={48} color={C.green}>odds: in your favor</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c5c', 'night') + 20;
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

const BL = '#2E3440';
const GRN = '#1E9E5A';

const LineChartLite: React.FC<{x: number; y: number; t: number; pts: number[]}> = ({x, y, t, pts}) => {
  const w = 760;
  const h = 360;
  const xy = pts.map((v, i) => [-w / 2 + (i / (pts.length - 1)) * w, h / 2 - (v / 100) * h] as [number, number]);
  const d = xy.map(([a, b], i) => `${i ? 'L' : 'M'} ${a} ${b}`).join(' ');
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={-w / 2} y1={h / 2 + 10} x2={w / 2} y2={h / 2 + 10} stroke={C.ink} strokeWidth={5} />
      <line x1={-w / 2} y1={-h / 2} x2={-w / 2} y2={h / 2 + 10} stroke={C.ink} strokeWidth={5} />
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#9AA5B1" strokeWidth={4} strokeDasharray="14 10" />
      <text x={-w / 2 - 20} y={0} fontSize={30} fontWeight={700} fill="#5B6470" textAnchor="end" dominantBaseline="middle">50%</text>
      <path d={d} fill="none" stroke={C.green} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t} />
    </g>
  );
};
