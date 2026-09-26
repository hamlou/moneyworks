import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {useT} from '../timing';
import {ease, lin, pop, shake} from '../anim';
import {Stick, StickProps} from '../Stick';
import {Board, ChapterCard, Captions, CHAPTER_FRAMES, Cue, Interior, OldFilm, Progress, SceneItem, Scenes, Sfx, Street, Svg, Vignette, SubReminder, subCues, Beach} from '../fx';
import {Bank, Bill, Bubble, Calendar, Coin, Duck, MoneyStack, Sparkle, SourceTag, Stamp, Text} from '../props';
import {Bar, Frame, Row, SubButton, Bell, CreditCard} from '../props2';
import {Coffee, PriceTag, Raccoon, TollBooth} from '../props3';
import {Burger} from '../props4';
import {Bread} from '../props6';
import {Biplane, Cactus, Egg, FuelDrop, Jet, MilesCard, PriceBoard, Seat, SlicePie, Suitcase} from '../props8';

type SP = Omit<StickProps, 'acc' | 'seed'>;
const Dave: React.FC<SP> = (p) => <Stick acc={['hair']} seed={7} {...p} />;
const Banker: React.FC<SP> = (p) => <Stick acc={['tophat', 'monocle', 'tie']} seed={31} {...p} />;
const Buffett: React.FC<SP> = (p) => <Stick acc={['glasses', 'tie']} seed={79} {...p} />;
const Woman: React.FC<SP> = (p) => <Stick acc={['ponytail']} seed={44} {...p} />;

const G2: React.FC<{x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode}> = ({x = 0, y = 0, s = 1, r = 0, o = 1, children}) =>
  s === 0 || o <= 0 ? null : (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {children}
    </g>
  );

const Sky: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(#BFE6F7, #EAF7FC)'}}>
    <Svg>
      {[[300, 200], [1200, 140], [1650, 320], [700, 380]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity={0.9}>
          <ellipse cx={0} cy={0} rx={120} ry={46} fill="#fff" />
          <ellipse cx={-60} cy={10} rx={70} ry={36} fill="#fff" />
          <ellipse cx={70} cy={12} rx={80} ry={34} fill="#fff" />
        </g>
      ))}
    </Svg>
  </AbsoluteFill>
);

export const Ep11: React.FC = () => {
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
    const th = w('o1', 'three');
    const tube = w('o2', 'tube');
    const fh = w('o2', 'five');
    const eg = w('o3', 'eight');
    const sw = w('o3', 'sandwich');
    const lk = w('o4', 'look');
    const dl = w('o4', 'delta');
    const eb = w('o4', 'eight');
    const cc = w('o5', 'credit');
    q(2, 'pop', 0.6);
    q(th, 'cash', 0.5);
    q(tube, 'whoosh', 0.6);
    q(eg, 'ding', 0.6);
    q(sw, 'trombone', 0.45);
    q(lk, 'pop', 0.6);
    q(eb, 'stamp', 0.7);
    q(cc, 'sting', 0.6);
    scene(0, () =>
      f < lk - 2 ? (
        <AbsoluteFill>
          {f < tube - 4 ? <Board /> : <Sky />}
          <Svg>
            {f < tube - 4 ? (
              <g>
                <Dave f={f} x={420} y={880} s={1.25} keys={[{at: 0, pose: 'present', expr: 'grin', look: 0.8}]} />
                <G2 x={1150} y={450} s={pop(f, 2)} r={-4}>
                  <rect x={-330} y={-150} width={660} height={300} rx={24} fill="#fff" stroke={C.ink} strokeWidth={7} />
                  <rect x={-330} y={-150} width={170} height={300} rx={24} fill={C.blue} stroke={C.ink} strokeWidth={7} />
                  <Text x={-245} y={0} size={40} color="#fff">DAVE</Text>
                  <Text x={80} y={-80} size={36} color="#5B6470">BOARDING PASS</Text>
                  <Text x={80} y={-10} size={60}>NYC → LA</Text>
                  <G2 x={80} y={80} s={pop(f, th)}><Text size={70} color={C.green}>$300</Text></G2>
                </G2>
              </g>
            ) : (
              <g>
                <Jet x={lin(f, tube - 4, lk, 700, 1200)} y={500 + Math.sin(f / 10) * 8} s={1.3 * pop(f, tube - 4)} livery={C.blue} />
                <G2 x={960} y={880} s={pop(f, fh)}><Text size={56}>5 hours · 2 pilots · tons of fuel</Text></G2>
                {f >= eg && (
                  <G2 x={360} y={230} s={pop(f, eg)}>
                    <circle r={150} fill={C.yellow} stroke={C.ink} strokeWidth={7} />
                    <Text y={-30} size={40}>profit</Text>
                    <Text y={40} size={90} color={C.green}>~$8</Text>
                  </G2>
                )}
                {f >= sw && (
                  <G2 x={1600} y={230} s={pop(f, sw)}>
                    <rect x={-130} y={-40} width={260} height={50} rx={20} fill="#E9C27A" stroke={C.ink} strokeWidth={5} />
                    <rect x={-120} y={10} width={240} height={24} fill="#6BBF59" stroke={C.ink} strokeWidth={4} />
                    <rect x={-130} y={34} width={260} height={46} rx={20} fill="#E9C27A" stroke={C.ink} strokeWidth={5} />
                    <Text y={130} size={34}>airport sandwich: $12</Text>
                  </G2>
                )}
                <SourceTag f={f} at={eg} text="IATA: net profit ≈ $7.90 per passenger (2025)" />
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Jet x={560} y={420} s={0.9 * pop(f, lk - 2)} livery={C.red} name="DELTA" />
            <G2 x={560} y={690} s={pop(f, dl)}><Text size={56}>Delta, 2025</Text></G2>
            <G2 x={1400} y={330} s={pop(f, eb)}><Text size={150} color={C.green} stroke={C.ink} sw={10}>$8.2B</Text></G2>
            <G2 x={1400} y={500} s={pop(f, eb + 6)}><Text size={44}>not from flying</Text></G2>
            <CreditCard x={1400} y={760} s={1.1 * pop(f, cc)} r={-8} />
            <SourceTag f={f} at={eb} text="Delta FY2025 results: Amex remuneration $8.2B" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }
  {
    const pv = [w('o6', 'ticket'), w('o6', 'printer'), w('o6', 'bank')];
    pv.forEach((x) => q(x, 'pop', 0.55));
    scene(A('o6'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <Text x={960} y={140} size={60} color="#5B6470">IN THIS VIDEO</Text>
          {['Where the $300 goes', 'The secret printer', 'A bank with wings'].map((l, i) => (
            <Frame key={l} x={380 + i * 580} y={500} s={pop(f, pv[i] - 2)} w={500} h={420} label={l}>
              {i === 0 && <Text y={-40} size={110} color={C.green}>$300</Text>}
              {i === 1 && <Egg s={1.4} y={-40} gold />}
              {i === 2 && <Bank s={0.35} y={40} label="AIRLINE" />}
            </Frame>
          ))}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH1 ticket split ============
  {
    const fu = w('c1b', 'fuel');
    const pp = w('c1c', 'people');
    const pl = w('c1d', 'plane');
    const hm = w('c1d', 'hundred');
    const ap = w('c1e', 'airport');
    const pr = w('c1e', 'pretzels');
    const lt = w('c1f', 'left');
    const eg = w('c1f', 'eight');
    const ct = w('c1f', 'three');
    q(fu, 'pop', 0.6);
    q(pp, 'pop', 0.6);
    q(pl, 'pop', 0.6);
    q(ap, 'pop', 0.6);
    q(pr, 'crinkle', 0.5);
    q(eg, 'ding', 0.6);
    const sl = [
      {v: 0.26, c: '#2E3440', l: 'FUEL', at: fu},
      {v: 0.3, c: C.blue, l: 'PEOPLE', at: pp},
      {v: 0.2, c: C.red, l: 'PLANES', at: pl},
      {v: 0.215, c: '#9AA5B1', l: 'FEES+', at: ap},
      {v: 0.025, c: C.green, l: '', at: eg},
    ];
    const shown = sl.filter((s) => f >= s.at);
    scene(A('c1a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={56}>Dave's $300 ticket</Text></G2>
          <SlicePie x={560} y={560} rad={300} slices={shown.map((s) => ({v: s.v, c: s.c, l: s.l}))} pop={f >= eg ? shown.length - 1 : -1} />
          <circle cx={560} cy={560} r={300} fill="none" stroke={C.ink} strokeWidth={4} strokeDasharray="14 12" opacity={0.4} />
          <G2 x={1350} y={300} s={pop(f, fu)}><FuelDrop s={0.9} /></G2>
          <G2 x={1550} y={330} s={pop(f, pp)}><Stick f={f} x={0} y={120} s={0.6} acc={['cap']} seed={21} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} /></G2>
          <G2 x={1400} y={560} s={pop(f, pl)}><Jet s={0.35} livery={C.red} /></G2>
          <G2 x={1400} y={680} s={pop(f, hm)}><Text size={40}>1 jet: $100M+</Text></G2>
          <G2 x={1700} y={560} s={pop(f, pr)} r={10}>
            <rect x={-60} y={-80} width={120} height={160} rx={14} fill="#E9C27A" stroke={C.ink} strokeWidth={5} />
            <Text y={0} size={28}>pretzels</Text>
          </G2>
          <G2 x={1450} y={850} s={pop(f, eg)}><Text size={90} color={C.green}>~$8 left</Text></G2>
          <G2 x={1450} y={950} s={pop(f, ct)}><Text size={40}>under 3¢ per $1</Text></G2>
          <SourceTag f={f} at={eg} text="IATA: 3.9% net margin (2025)" />
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH2 terrible business ============
  {
    const wb = w('c2b', 'buffett');
    const ws = w('c2b', 'worst');
    const wr = w('c2c', 'wright');
    const sh = w('c2c', 'shot');
    const un = w('c2d', 'united');
    const dl = w('c2d', 'delta');
    const am = w('c2d', 'american');
    const pr = w('c2e', 'price');
    const tn = w('c2e', 'ten');
    const fs = w('c2f', 'fuel');
    const pd = w('c2f', 'pandemic');
    const wl = w('c2g', 'wallet');
    q(wb, 'pop', 0.6);
    q(ws, 'stamp', 0.6);
    q(wr, 'dream', 0.4);
    q(sh, 'boing', 0.6);
    [un, dl, am].forEach((x) => q(x, 'thud', 0.5));
    q(pr, 'pop', 0.5);
    q(tn, 'coin', 0.5);
    q(fs, 'buzz', 0.4);
    q(pd, 'buzz', 0.5);
    q(wl, 'ding', 0.6);
    scene(A('c2a'), () =>
      f < A('c2d') ? (
        f < wr - 6 ? (
          <AbsoluteFill>
            <Interior />
            <Svg>
              <Dave f={f} x={260} y={860} s={1} keys={[{at: 0, pose: 'shrug', expr: 'worried', look: 0.6}]} />
              <G2 x={330} y={470} s={pop(f, A('c2a') + 4)}><Bubble text={'$8 profit...\ngood business?'} size={40} tail="down" /></G2>
              <Buffett f={f} x={760} y={860} s={1.2 * pop(f, wb - 4)} keys={[{at: 0, pose: 'talk', expr: 'smug', look: 0.6}]} />
              <G2 x={760} y={420} s={pop(f, wb)}><Text size={44}>Warren Buffett</Text></G2>
              <Stamp x={1300} y={450} s={pop(f, ws, 9, 260)} r={-6} text="WORST BUSINESS" size={64} color={C.red} />
              <Jet x={1300} y={720} s={0.5 * pop(f, ws + 6)} />
              <SourceTag f={f} at={ws} text="Berkshire Hathaway shareholder letter, 2007" />
            </Svg>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill>
            <AbsoluteFill style={{filter: 'sepia(0.5)'}}>
              <Beach f={f} />
              <Svg>
                <Biplane x={lin(f, wr - 6, sh + 20, 300, 1100)} y={380 - lin(f, wr - 6, sh, 0, 120) + (f > sh ? ease(f, sh, sh + 20, 0, 500) : 0)} s={1.2} r={f > sh ? ease(f, sh, sh + 20, 0, 60) : 0} f={f} />
                <Calendar x={240} y={220} s={0.7 * pop(f, wr)} top="YEAR" year={1903} flip={0} />
                {f > sh && <G2 x={1300} y={300} s={pop(f, sh)}><Text size={60} color={C.red}>(a joke!)</Text></G2>}
              </Svg>
            </AbsoluteFill>
            <OldFilm f={f} o={0.5} />
          </AbsoluteFill>
        )
      ) : f < A('c2e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={130}><Text size={60}>Airline bankruptcies</Text></G2>
            {[[un, 'UNITED', '2002', C.blue], [dl, 'DELTA', '2005', C.red], [am, 'AMERICAN', '2011', '#9AA5B1']].map(([at, n, y, c], i) => (
              <G2 key={n as string} x={420 + i * 540} y={520} s={pop(f, A('c2d') + i * 5)} r={(i - 1) * 3}>
                <Jet s={0.42} livery={c as string} name={n as string} />
                <G2 y={150} s={pop(f, at as number, 9, 260)}><Stamp text="BANKRUPT" size={46} color={C.red} /></G2>
                <G2 y={260} s={pop(f, at as number)}><Text size={60}>{y as string}</Text></G2>
              </G2>
            ))}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={380} y={860} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'think'}, {at: tn, pose: 'point_r', expr: 'grin'}]} />
            <PriceBoard x={1120} y={480} s={pop(f, pr)} title="CHEAPEST FIRST" rows={[['AIR ONE', '$289'], ['SKYCO', '$299'], ['DAVE AIR', '$309']]} hl={f >= tn ? 0 : -1} />
            {f >= fs && <G2 x={1120} y={860} s={pop(f, fs)}><FuelDrop s={0.6} x={-300} /><Text x={60} size={48} color={C.red}>fuel spike · pandemic</Text></G2>}
            {f >= wl && <G2 x={1600} y={200} s={pop(f, wl)}><CreditCard s={0.7} r={10} /></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH3 money printer ============
  {
    const dk = w('c3a', 'duck');
    const ml = w('c3b', 'miles');
    const ck = w('c3c', 'click');
    const sl = w('c3d', 'sell');
    const bk = w('c3d', 'banks');
    const cf = w('c3e', 'coffee');
    const rm = w('c3e', 'real');
    const rc = w('c3f', 'raccoons');
    const gr = w('c3g', 'groceries');
    const ph = w('c3g', 'phone');
    const fl = w('c3g', 'fly');
    const eg = w('c3h', 'eggs');
    const cs = w('c3h', 'cash');
    q(dk, 'quack', 0.7);
    q(ml, 'pop', 0.6);
    q(ck, 'click', 0.8);
    q(ck + 4, 'ding', 0.5);
    q(sl, 'pop', 0.5);
    q(bk, 'cash', 0.6);
    q(cf, 'pop', 0.5);
    q(rm, 'cash', 0.5);
    q(rc, 'boing', 0.5);
    [gr, ph].forEach((x) => q(x, 'coin', 0.5));
    q(fl, 'ding', 0.5);
    q(eg, 'quack', 0.6);
    q(cs, 'cash', 0.6);
    const miles = Math.round(lin(f, ck, ck + 12, 0, 25000));
    scene(A('c3a'), () =>
      f < A('c3e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={1000} y={130}><Text size={56}>The airline's own duck</Text></G2>
            <Duck f={f} x={330} y={700} s={1.3 * pop(f, dk)} />
            <G2 x={330} y={420} s={pop(f, dk + 4)}><Bubble text="quack" size={44} tail="down" /></G2>
            <MilesCard x={1000} y={420} s={pop(f, ml)} miles={f >= ck ? miles.toLocaleString('en-US') : '0'} />
            <G2 x={1000} y={640} s={pop(f, ck)}><Text size={48}>typed into existence · cost ≈ $0</Text></G2>
            {f >= sl && (
              <g>
                <Bank x={1600} y={880} s={0.45 * pop(f, bk)} label="BANK" />
                <G2 x={1300} y={800} s={pop(f, bk)}><Text size={44} color={C.green}>sold for real $</Text></G2>
                {f >= bk && f < bk + 40 && <Bill x={lin(f, bk, bk + 30, 1600, 1100)} y={560} s={0.7} />}
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : f < A('c3h') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            <Dave f={f} x={300} y={822} s={1.1} keys={[{at: 0, pose: 'hold', expr: 'happy', look: 0.6}]} handItem={<CreditCard s={0.35} y={-20} />} />
            <G2 x={620} y={640} s={pop(f, cf)}><Coffee s={1} f={f} /></G2>
            <TollBooth x={1000} y={822} s={0.8 * pop(f, rc)} label="SWIPE FEE" />
            <Raccoon f={f} x={1000} y={600} s={0.6 * pop(f, rc)} mood="greedy" holdCoin />
            <Bank x={1500} y={822} s={0.5 * pop(f, rm - 10)} label="BANK" />
            <G2 x={1500} y={300} s={pop(f, rm)}><Text size={40}>bank buys miles from airline</Text></G2>
            <Jet x={1600} y={140} s={0.3 * pop(f, rm + 8)} />
            {[[gr, 'groceries'], [ph, 'phone bill']].map(([at, l], i) => (
              <G2 key={l as string} x={620} y={260 + i * 110} s={pop(f, at as number)}>
                <Coin s={0.6} x={-120} />
                <Text x={40} size={40}>{l as string}</Text>
              </G2>
            ))}
            <G2 x={960} y={130} s={pop(f, fl)}><Text size={52} color={C.red}>airline paid · no flight needed</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Duck f={f} x={560} y={700} s={1.5} />
            {Array.from({length: 6}).map((_, i) => (
              <G2 key={i} x={760 + i * 150} y={760 - (i % 2) * 40} s={pop(f, eg + i * 5)}><Egg gold /></G2>
            ))}
            {[0, 1, 2].map((i) => <Bill key={i} x={1000 + i * 250} y={lin(f, cs + i * 6, cs + 30 + i * 6, 200, 400)} s={0.8 * pop(f, cs + i * 6)} r={(i - 1) * 12} />)}
            <G2 x={960} y={120}><Text size={56}>prints miles like eggs · banks pay cash</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH4 worth more than airline ============
  {
    const ae = w('c4b', 'express');
    const ep = w('c4b', 'eight');
    const tb = w('c4c', 'ten');
    const pd = w('c4d', 'pandemic');
    const ds = w('c4d', 'desert');
    const un = w('c4e', 'united');
    const fv = w('c4e', 'five');
    const tt = w('c4f', 'twenty');
    const hf = w('c4g', 'half');
    const rd = w('c4h', 'read');
    const bn = w('c4h', 'bonus');
    q(ae, 'pop', 0.5);
    q(ep, 'cash', 0.6);
    q(tb, 'ding', 0.5);
    q(pd, 'buzz', 0.5);
    q(ds, 'whoosh', 0.4);
    q(un, 'pop', 0.5);
    q(fv, 'coin', 0.5);
    q(tt, 'stamp', 0.7);
    q(hf, 'thud', 0.6);
    q(rd, 'sting', 0.6);
    q(bn, 'ding', 0.5);
    scene(A('c4a'), () =>
      f < A('c4d') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={400} y1={860} x2={1520} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <Bar x={760} y={860} h={ease(f, ep - 4, ep + 14, 0, 8.2 * 55)} color={C.blue} label="Amex → Delta, 2025" value="$8.2B" w={260} />
            <Bar x={1160} y={860} h={ease(f, tb - 4, tb + 14, 0, 10 * 55)} color={C.green} label="Delta's goal" value="$10B" w={260} />
            <Jet x={500} y={250} s={0.5 * pop(f, A('c4a'))} livery={C.red} name="DELTA" />
            <G2 x={960} y={250} s={pop(f, A('c4a') + 6)}><Text size={80}>+</Text></G2>
            <CreditCard x={1450} y={250} s={0.6 * pop(f, A('c4a') + 10)} r={8} />
            <G2 x={960} y={120} s={pop(f, ae)}><Text size={48}>American Express pays Delta</Text></G2>
            <SourceTag f={f} at={ep} text="Delta Air Lines FY2025 results" />
          </Svg>
        </AbsoluteFill>
      ) : f < A('c4f') ? (
        <AbsoluteFill style={{background: '#F3DFB8'}}>
          <Svg>
            <rect x={0} y={700} width={1920} height={380} fill="#E7C98F" />
            <circle cx={1650} cy={200} r={90} fill={C.yellow} stroke={C.ink} strokeWidth={6} />
            {[0, 1, 2, 3].map((i) => <Jet key={i} x={300 + i * 420} y={660 + (i % 2) * 60} s={0.35 * pop(f, A('c4d') + i * 5)} livery={[C.blue, C.red, '#9AA5B1', C.blue][i]} />)}
            <Cactus x={120} y={900} s={pop(f, ds)} />
            <G2 x={960} y={180} s={pop(f, pd)}><Text size={64}>2020: planes parked in the desert</Text></G2>
            {f >= un && (
              <g>
                <Banker f={f} x={1500} y={960} s={0.9} keys={[{at: 0, pose: 'hold', expr: 'smug', look: -0.6}]} handItem={<MoneyStack n={4} s={0.5} y={-20} />} />
                <G2 x={800} y={400} s={pop(f, un)}><Bubble text={'Lend us $5 billion.\nOur MILES are the guarantee.'} size={44} tail="right" /></G2>
              </g>
            )}
            <SourceTag f={f} at={fv} text="United Airlines 8-K, June 2020" />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <line x1={400} y1={860} x2={1520} y2={860} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <G2 x={960} y={130}><Text size={56}>United, June 2020</Text></G2>
            <G2 x={760} y={900}><Text size={34} color="#5B6470">miles program</Text></G2>
            <G2 x={1160} y={900}><Text size={34} color="#5B6470">whole airline</Text></G2>
            <Jet x={1160} y={740} s={0.25 * (1 - pop(f, hf - 4))} />
            <MilesCard x={760} y={720} s={0.35 * (1 - pop(f, tt - 4))} miles="?" />
            <Bar x={760} y={860} h={ease(f, tt - 4, tt + 14, 0, 22 * 25)} color={C.yellow} label="MileagePlus (miles)" value="~$22B" w={300} />
            <Bar x={1160} y={860} h={ease(f, hf - 4, hf + 14, 0, 11 * 25)} color={C.blue} label="the WHOLE airline" value="~half" w={300} />
            <G2 x={1160} y={960} s={pop(f, hf)}><Text size={30} color="#5B6470">(stock market value, June 2020)</Text></G2>
            {f >= rd && (
              <G2 x={560} y={220} s={pop(f, rd)} r={-4}>
                <Stamp text="MILES > AIRLINE" size={64} color={C.red} />
              </G2>
            )}
            {f >= bn && <Jet x={1550} y={260} s={0.3} />}
            {f >= bn && <G2 x={1550} y={400} s={pop(f, bn)}><Text size={40}>flying = the bonus</Text></G2>}
            <SourceTag f={f} at={tt} text="United 8-K (2020): MileagePlus appraised at $21.9B" />
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH5 miles shrink ============
  {
    const on = w('c5b', 'only');
    const fo = w('c5c', 'forty');
    const sx = w('c5c', 'sixty');
    const na = w('c5d', 'nobody');
    const inf = w('c5d', 'inflation');
    const cb = w('c5e', 'central');
    const pr = w('c5e', 'prints');
    const ex = w('c5f', 'expire');
    const fg = w('c5f', 'forgotten');
    q(on, 'stamp', 0.6);
    q(fo, 'pop', 0.5);
    q(sx, 'buzz', 0.6);
    q(inf, 'pop', 0.5);
    q(cb, 'stamp', 0.6);
    q(pr, 'click', 0.6);
    q(ex, 'poof', 0.6);
    q(fg, 'crinkle', 0.5);
    const price = f < sx ? '40,000' : '60,000';
    scene(A('c5a'), () =>
      f < A('c5e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={700} y={200}><Text size={60}>Who sets the price?</Text></G2>
            <Jet x={1250} y={220} s={0.4 * pop(f, on)} name="AIRLINE" />
            <G2 x={1250} y={380} s={pop(f, on)}><Text size={48}>sets the price of a mile</Text></G2>
            <G2 x={700} y={600} s={pop(f, fo)}>
              <rect x={-360} y={-150} width={720} height={300} rx={28} fill="#fff" stroke={C.ink} strokeWidth={7} />
              <Text y={-80} size={44} color="#5B6470">Seat to Hawaii</Text>
              <G2 s={f >= sx ? 1 + 0.12 * Math.max(0, 1 - (f - sx) / 12) : 1}><Text y={20} size={100} color={f >= sx ? C.red : C.ink}>{price}</Text></G2>
              <Text y={100} size={36}>miles</Text>
            </G2>
            <Dave f={f} x={1500} y={880} s={1.1} sweat={f >= sx} keys={[{at: 0, pose: 'idle', expr: 'happy'}, {at: sx, pose: 'shock', expr: 'shock', look: -0.6}]} />
            {f >= inf && <G2 x={700} y={880} s={pop(f, inf)}><Text size={48}>= inflation, one company in charge</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={560} s={pop(f, cb)}>
              <Bank s={0.65} label="AIRLINE BANK" />
            </G2>
            <G2 x={560} y={760} s={pop(f, pr)}><Text size={44}>prints · sets prices · changes rules</Text></G2>
            {f >= ex && (
              <g>
                <G2 x={1350} y={450} s={pop(f, ex)} o={1 - ease(f, fg, fg + 20, 0, 0.7)}><MilesCard miles="12,400" label="OLD ACCOUNT" color="#9AA5B1" /></G2>
                <G2 x={1350} y={700} s={pop(f, ex + 4)}><Stamp text="EXPIRED" size={60} color={C.red} r={-6} /></G2>
              </g>
            )}
            {f >= fg && <G2 x={1350} y={880} s={pop(f, fg)}><Text size={40}>bank already paid · no seat given</Text></G2>}
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH6 fees ============
  {
    const sp = [w('c6b', 'seat'), w('c6b', 'bag'), w('c6b', 'picking'), w('c6b', 'boarding'), w('c6b', 'legroom'), w('c6b', 'snack')];
    const sv = w('c6c', 'seven');
    const bn = w('c6d', 'burger');
    const ff = w('c6e', 'fifty');
    const bg = w('c6e', 'bag');
    const fr = w('c6e', 'friend');
    const oh = w('c6e', 'hundred');
    sp.forEach((x) => q(x, 'pop2', 0.45));
    q(sv, 'cash', 0.7);
    q(bn, 'boing', 0.5);
    q(ff, 'pop', 0.5);
    q(bg, 'coin', 0.5);
    q(fr, 'coin', 0.5);
    q(oh, 'buzz', 0.6);
    const total = f < bg ? 59 : f < fr ? 94 : f < oh ? 124 : 140;
    scene(A('c6a'), () =>
      f < A('c6e') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={120}><Text size={60}>One ticket, cut into pieces</Text></G2>
            {['SEAT', 'BAG', 'PICK SEAT', 'BOARD EARLY', 'LEGROOM', 'SNACK'].map((l, i) => (
              <G2 key={l} x={300 + i * 265} y={400} s={pop(f, sp[i])} r={(i % 2 ? 4 : -4)}>
                <rect x={-120} y={-80} width={240} height={160} rx={20} fill={[C.blue, C.red, C.yellow, C.green, '#8A5CFF', '#E9C27A'][i]} stroke={C.ink} strokeWidth={6} />
                <Text size={34} color={i === 2 || i === 5 ? C.ink : '#fff'}>{l}</Text>
              </G2>
            ))}
            {f >= sv && (
              <g>
                <Suitcase x={620} y={760} s={pop(f, sv)} tag="$35" />
                <G2 x={1200} y={740} s={pop(f, sv)}><Text size={110} color={C.green} stroke={C.ink} sw={8}>$7.3B</Text></G2>
                <G2 x={1200} y={860} s={pop(f, sv + 6)}><Text size={40}>US checked bag fees, 2024</Text></G2>
              </g>
            )}
            {f >= bn && <G2 x={1700} y={760} s={pop(f, bn)}><Burger s={0.6} /><Text y={120} size={30}>no bun, no cheese</Text></G2>}
            <SourceTag f={f} at={sv} text="Bureau of Transportation Statistics, 2024" until={bn} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <Dave f={f} x={360} y={860} s={1.2} keys={[{at: 0, pose: 'typing', expr: 'grin'}, {at: oh, pose: 'facepalm', expr: 'sad'}]} />
            <G2 x={1150} y={480} s={pop(f, ff)}>
              <rect x={-420} y={-300} width={840} height={600} rx={30} fill="#fff" stroke={C.ink} strokeWidth={7} />
              <Text y={-230} size={44} color="#5B6470">YOUR TRIP</Text>
              <Text x={-360} y={-140} size={44} anchor="start">Basic ticket</Text>
              <Text x={360} y={-140} size={44} anchor="end">$59</Text>
              {f >= bg && <G2 s={pop(f, bg)}><Text x={-360} y={-50} size={44} anchor="start">+ Bag</Text><Text x={360} y={-50} size={44} anchor="end">$35</Text></G2>}
              {f >= fr && <G2 s={pop(f, fr)}><Text x={-360} y={40} size={44} anchor="start">+ Seat next to friend</Text><Text x={360} y={40} size={44} anchor="end">$30</Text></G2>}
              {f >= oh && <G2 s={pop(f, oh)}><Text x={-360} y={120} size={44} anchor="start">+ Fees</Text><Text x={360} y={120} size={44} anchor="end">$16</Text></G2>}
              <line x1={-360} y1={180} x2={360} y2={180} stroke={C.ink} strokeWidth={4} />
              <Text x={-360} y={235} size={56} anchor="start">TOTAL</Text>
              <Text x={360} y={235} size={64} anchor="end" color={total > 100 ? C.red : C.ink}>${total}</Text>
            </G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ P neighbor paid less ============
  {
    const sm = w('p1', 'same');
    const ot = w('p2', 'one');
    const th = w('p2', 'three');
    const cp = w('p3', 'computer');
    const ch = w('p4', 'cheap');
    const cl = w('p4', 'climbs');
    const ex = w('p4', 'expensive');
    const bk = w('p5', 'bakery');
    const ft = w('p5', 'fortune');
    const bt = w('p6', 'business');
    const pf = w('p6', 'profitable');
    const dz = w('p7', 'dozens');
    q(sm, 'pop', 0.5);
    q(ot, 'ding', 0.6);
    q(th, 'buzz', 0.6);
    q(cp, 'key', 0.5);
    q(ch, 'coin', 0.5);
    q(cl, 'pop', 0.5);
    q(ex, 'cash', 0.6);
    q(bk, 'pop', 0.5);
    q(ft, 'cash', 0.6);
    q(bt, 'pop', 0.5);
    q(pf, 'ding', 0.5);
    q(dz, 'pop', 0.6);
    const filled = Math.floor(lin(f, ch, ex + 20, 0, 12));
    scene(A('p1'), () =>
      f < A('p3') ? (
        <AbsoluteFill style={{background: '#E8EEF1'}}>
          <Svg>
            <rect x={0} y={0} width={1920} height={140} fill="#D3DEE3" />
            {Array.from({length: 6}).map((_, i) => <circle key={i} cx={200 + i * 300} cy={70} r={40} fill="#BFE6F7" stroke={C.ink} strokeWidth={5} />)}
            <Seat x={700} y={800} s={1.3} />
            <Seat x={1200} y={800} s={1.3} />
            <Dave f={f} x={700} y={860} s={1.1} keys={[{at: 0, pose: 'talk', expr: 'happy', look: 0.8}, {at: th, pose: 'shock', expr: 'shock', look: 0.8}]} />
            <Woman f={f} x={1200} y={860} s={1.1} keys={[{at: 0, pose: 'idle', expr: 'happy', look: -0.8}, {at: ot, pose: 'present', expr: 'grin', look: -0.8}]} />
            <G2 x={1200} y={330} s={pop(f, ot)}><PriceTag text="$120" color={C.green} s={1.2} /></G2>
            <G2 x={700} y={330} s={pop(f, th)}><PriceTag text="$300" color={C.red} s={1.2} /></G2>
            <G2 x={960} y={200} s={pop(f, sm)}><Text size={44}>same flight · same seat · same pretzels</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('p5') ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={560} y={480} s={pop(f, cp)}>
              <rect x={-360} y={-260} width={720} height={520} rx={26} fill="#1F2A36" stroke={C.ink} strokeWidth={7} />
              <Text y={-200} size={40} color={C.yellow}>SEATS SOLD</Text>
              {Array.from({length: 12}).map((_, i) => <rect key={i} x={-280 + (i % 6) * 95} y={-120 + Math.floor(i / 6) * 120} width={75} height={90} rx={12} fill={i < filled ? C.red : '#34465A'} stroke="#8FA3B8" strokeWidth={3} />)}
              <Text y={200} size={70} color="#6EF0A8">${Math.round(120 + filled * 20)}</Text>
            </G2>
            <G2 x={1400} y={300} s={pop(f, ch)}><Text size={52} color={C.green}>first seats: cheap</Text></G2>
            <G2 x={1400} y={450} s={pop(f, cl)}><Text size={52}>plane fills → price climbs</Text></G2>
            <G2 x={1400} y={600} s={pop(f, ex)}><Text size={52} color={C.red}>last seats: $$$</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < A('p7') ? (
        <AbsoluteFill>
          <Street f={f} />
          <Svg>
            {Array.from({length: 5}).map((_, i) => (
              <G2 key={i} x={400 + i * 170} y={600} s={pop(f, bk - 10 + i * 3) * (f < bk + 10 + ((ft - bk) * (5 - i)) / 5 ? 1 : 0)}>
                <Bread s={0.9} />
              </G2>
            ))}
            <G2 x={1400} y={420} s={pop(f, bk)}>
              <PriceTag text={'$' + Math.round(lin(f, bk, ft, 3, 40))} color={f >= ft ? C.red : C.yellow} s={1.4} />
            </G2>
            {f >= bt && (
              <g>
                <Stick f={f} x={1500} y={822} s={1} acc={['glasses', 'tie']} seed={120} keys={[{at: 0, pose: 'hold', expr: 'worried'}]} handItem={<g transform="translate(0,20) scale(0.5)"><rect x={-70} y={-40} width={140} height={100} rx={12} fill="#8C5A33" stroke={C.ink} strokeWidth={6} /></g>} />
                <G2 x={1100} y={250} s={pop(f, bt)}><Text size={48}>last-minute business traveler</Text></G2>
                <G2 x={1100} y={340} s={pop(f, pf)}><Text size={44} color={C.green}>pays the most → saves the flight</Text></G2>
              </g>
            )}
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            {Array.from({length: 24}).map((_, i) => (
              <G2 key={i} x={260 + (i % 8) * 200} y={260 + Math.floor(i / 8) * 220} s={pop(f, dz + i * 2)}>
                <Seat s={0.45} color={i === 13 ? C.red : C.blue} />
                <Text y={60} size={30}>{'$' + [89, 120, 149, 300, 219, 99, 180, 249][i % 8]}</Text>
              </G2>
            ))}
            <G2 x={260 + 5 * 200} y={500}><Text size={30} color={C.red}>Dave</Text></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  // ============ CH7 wisely ============
  {
    const hs = [bs('c7b'), bs('c7c'), bs('c7d'), bs('c7e')];
    hs.forEach((x) => q(x, 'ding', 0.5));
    const items = ['Never pay interest for miles', "Don't hoard · use them", 'Compare with the cash price', 'Check the TOTAL price'];
    const cur = hs.filter((x) => f >= x).length;
    scene(A('c7a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={110}><Text size={60}>Using miles wisely</Text></G2>
          <G2 x={1620} y={110}><Text size={32} color="#8C7A5B">(education, not advice)</Text></G2>
          {items.map((it, i) => <Row key={i} x={140} y={260 + i * 150} s={0.9 * pop(f, hs[i] - 4)} n={i + 1} text={it} lit={cur === i + 1 ? 1 : 0.6} color={C.green} w={1080} />)}
          {cur === 1 && <G2 x={1600} y={520}><Text size={110} color={C.red}>22%</Text><Text y={90} size={36}>eats every free flight</Text></G2>}
          {cur === 2 && <G2 x={1600} y={520}><MilesCard s={0.7} miles="use it" /></G2>}
          {cur === 3 && <G2 x={1600} y={520}><Text y={-40} size={60}>$180 cash</Text><Text y={40} size={50}>vs</Text><Text y={120} size={60}>25,000 mi</Text></G2>}
          {cur === 4 && <G2 x={1600} y={520}><Suitcase s={0.8} tag="+$35" /></G2>}
        </Svg>
      </AbsoluteFill>
    ));
  }

  // ============ CH8 recap + end ============
  const recap = ['Flying earns ~$8 a passenger', 'Miles: printed for ~$0, sold to banks', 'Fees + shrinking miles = your money'];
  {
    const r = [bs('c8b'), bs('c8c'), bs('c8d')];
    q(A('c8a') + 2, 'pop', 0.6);
    r.forEach((x) => q(x, 'ding', 0.5));
    scene(A('c8a'), () => (
      <AbsoluteFill>
        <Board />
        <Svg>
          <G2 x={960} y={170} s={pop(f, A('c8a') + 2)}><Text size={100}>RECAP</Text></G2>
          {recap.map((b, i) => <Row key={i} x={330} y={360 + i * 170} s={pop(f, r[i] - 4)} n={i + 1} text={b} lit={1} color={C.blue} w={1260} />)}
        </Svg>
      </AbsoluteFill>
    ));
  }
  {
    const pa = w('c8e', 'passenger');
    const bk = w('c8e', 'bank');
    const cs = w('c8f', 'costco');
    const sb = w('c8g', 'subscribe');
    q(pa, 'pop', 0.5);
    q(bk, 'stamp', 0.6);
    q(cs, 'chime', 0.5);
    q(sb - 2, 'pop', 0.7);
    q(sb + 14, 'click', 0.8);
    q(sb + 18, 'ding', 0.6);
    scene(A('c8e'), () =>
      f < A('c8f') ? (
        <AbsoluteFill>
          <Sky />
          <Svg>
            <G2 x={960} y={520} s={pop(f, A('c8e'))}>
              <Jet s={1.2} livery={C.navy} name="BANK AIR" />
            </G2>
            <G2 x={960} y={850} s={pop(f, bk)}><Text size={64}>a bank that owns some planes</Text></G2>
          </Svg>
        </AbsoluteFill>
      ) : f < sb - 8 ? (
        <AbsoluteFill>
          <Board />
          <Svg>
            <G2 x={960} y={140} s={pop(f, cs)}><Text size={60}>Next: Dave goes to Costco</Text></G2>
            <G2 x={960} y={520} s={pop(f, cs + 6)}>
              <rect x={-420} y={-220} width={840} height={440} rx={20} fill="#fff" stroke={C.ink} strokeWidth={7} />
              <rect x={-420} y={-220} width={840} height={110} rx={20} fill={C.red} stroke={C.ink} strokeWidth={7} />
              <Text y={-165} size={60} color="#fff">WAREHOUSE</Text>
              <Text y={10} size={56}>cheap stuff...</Text>
              <Text y={100} size={56} color={C.green}>billions from what?</Text>
            </G2>
            <Dave f={f} x={300} y={880} s={1.1} keys={[{at: 0, pose: 'think', expr: 'think'}]} />
          </Svg>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill>
          <Board />
          <Svg>
            <SubButton x={960} y={440} s={1.3 * pop(f, sb - 2)} done={f > sb + 14 ? 1 : 0} />
            <Bell x={1400} y={440} s={pop(f, sb + 16)} f={f} ring={f > sb + 16 && f < sb + 50 ? 1 : 0} />
            <Dave f={f} x={420} y={860} s={1.2} keys={[{at: 0, pose: 'wave', expr: 'grin'}]} />
            <Raccoon f={f} x={1550} y={780} s={0.6} mood="sneaky" />
            <G2 x={1550} y={560}><MilesCard s={0.35} miles="mine" /></G2>
          </Svg>
        </AbsoluteFill>
      ),
    );
  }

  const SUB = we('c4h', 'bonus') + 20;
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
