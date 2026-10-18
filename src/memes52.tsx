import React from 'react';
import {C, FONT, localFont} from './theme';
import {Stick, StickProps} from './Stick';

// short52: trend meme FORMATS redrawn with our own cast (PLAYBOOK_SHORTS §4/§9: never a downloaded meme image).
// Every format is drawn in its own w x h space and goes inside <Meme> (src/shorts/Short52.tsx).
const ANTON = localFont('Anton', 'anton.woff2', '400');
const O = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

type SP = Omit<StickProps, 'acc' | 'seed'>;
export const Dave: React.FC<SP> = (p) => <Stick big seed={7} {...p} />;
export const Guru: React.FC<SP> = (p) => <Stick acc={['tie', 'shades']} seed={45} {...p} />;
export const Coach: React.FC<SP> = (p) => <Stick acc={['cap', 'tie']} seed={52} {...p} />;

const fit = (t: string, maxW: number, size: number, k = 0.5) => Math.min(size, maxW / (Math.max(1, t.length) * k));

// Meme caption: white Impact-style capitals with a black outline. `mw` shrinks the text so it fits that width.
export const Cap: React.FC<{x?: number; y?: number; size?: number; color?: string; r?: number; mw?: number; children: string}> = ({x = 0, y = 0, size = 56, color = '#fff', r = 0, mw, children}) => {
  const lines = children.split('\n');
  const sz = mw ? Math.min(...lines.map((l) => fit(l, mw, size, 0.47))) : size;
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`}>
      {lines.map((l, i) => (
        <text key={i} x={0} y={(i - (lines.length - 1) / 2) * sz * 1.14} fontFamily={ANTON} fontSize={sz} fill={color} textAnchor="middle" dominantBaseline="middle" stroke="#000" strokeWidth={Math.max(8, sz / 5)} paintOrder="stroke" strokeLinejoin="round" letterSpacing={1.5}>
          {l}
        </text>
      ))}
    </g>
  );
};

// Plain dark text block (panel text of Drake / panik / chat memes).
export const Ink: React.FC<{x?: number; y?: number; size?: number; color?: string; mw?: number; anchor?: 'start' | 'middle' | 'end'; children: string}> = ({x = 0, y = 0, size = 44, color = C.ink, mw, anchor = 'middle', children}) => {
  const lines = children.split('\n');
  const sz = mw ? Math.min(...lines.map((l) => fit(l, mw, size, 0.56))) : size;
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((l, i) => (
        <text key={i} x={0} y={(i - (lines.length - 1) / 2) * sz * 1.16} fontFamily={FONT} fontWeight={700} fontSize={sz} fill={color} textAnchor={anchor} dominantBaseline="middle">
          {l}
        </text>
      ))}
    </g>
  );
};

const Flame: React.FC<{f: number; k: number; x: number; y: number; s: number}> = ({f, k, x, y, s}) => {
  const w = Math.sin((f + k * 9) / 3) * 8;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d={`M -60 0 Q -80 -70 -30 -110 Q -36 -70 ${-6 + w} -150 Q 40 -100 ${30 + w} -60 Q 60 -80 60 0 Z`} fill="#F4762B" {...O} strokeWidth={5} />
      <path d={`M -30 0 Q -40 -40 ${-4 + w} -84 Q 30 -40 30 0 Z`} fill={C.yellow} />
    </g>
  );
};

type MF = {f: number; w: number; h: number};

// "My bank account: / My brain at 2 AM:" two-panel.
export const M2am: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h * 0.34} fill="#fff" />
    <Ink x={w / 2} y={h * 0.1} size={46} mw={w * 0.9}>MY BANK ACCOUNT: please sleep</Ink>
    <Ink x={w / 2} y={h * 0.25} size={52} mw={w * 0.9}>MY BRAIN AT 2 AM:</Ink>
    <rect y={h * 0.34} width={w} height={h * 0.66} fill="#141B3C" />
    {Array.from({length: 14}).map((_, i) => <circle key={i} cx={(i * 173) % w} cy={h * 0.38 + ((i * 67) % (h * 0.3))} r={3 + (i % 3)} fill="#fff" opacity={0.5 + 0.5 * Math.sin((f + i * 7) / 5)} />)}
    <Dave f={f} x={w * 0.22} y={h * 0.99} s={h / 560} keys={[{at: 0, pose: 'celebrate', expr: 'money', look: 0.5}]} />
    <Cap x={w * 0.64} y={h * 0.62} size={78} mw={w * 0.62} color={C.yellow}>{'BUY THE\n$9,997 COURSE'}</Cap>
  </g>
);

// "Source: trust me bro".
export const MTrustBro: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#8FD0F2" />
    <rect y={h * 0.78} width={w} height={h * 0.22} fill="#7BC96F" />
    <path d={`M ${w * 0.56} ${h * 0.78} L ${w * 0.56} ${h * 0.5} L ${w * 0.75} ${h * 0.38} L ${w * 0.94} ${h * 0.5} L ${w * 0.94} ${h * 0.78} Z`} fill="#F4E4C1" {...O} />
    <rect x={w * 0.71} y={h * 0.6} width={w * 0.08} height={h * 0.18} fill="#A8744A" {...O} />
    <Guru f={f} x={w * 0.3} y={h * 0.97} s={h / 520} keys={[{at: 0, pose: 'hips', expr: 'smug', look: 0.4}]} />
    <Cap x={w / 2} y={h * 0.11} size={66} mw={w * 0.94}>I MADE A MILLION LAST YEAR</Cap>
    <Cap x={w * 0.6} y={h * 0.88} size={70} mw={w * 0.76} color={C.yellow}>SOURCE: TRUST ME BRO</Cap>
  </g>
);

// "Is this a pigeon?"
export const MPigeon: React.FC<MF> = ({f, w, h}) => {
  const fl = Math.sin(f / 2) * 0.35 + 0.75;
  return (
    <g>
      <rect width={w} height={h} fill="#BFE3A8" />
      <rect y={h * 0.8} width={w} height={h * 0.2} fill="#8CC56F" />
      <Dave f={f} x={w * 0.26} y={h * 0.97} s={h / 540} keys={[{at: 0, pose: 'present', expr: 'happy', look: 1}]} />
      <g transform={`translate(${w * 0.72},${h * 0.3})`}>
        <ellipse cx={-34 * fl} cy={0} rx={38 * fl} ry={48} fill={C.yellow} {...O} />
        <ellipse cx={34 * fl} cy={0} rx={38 * fl} ry={48} fill={C.yellow} {...O} />
        <rect x={-6} y={-40} width={12} height={80} rx={6} fill={C.ink} />
      </g>
      <Cap x={w * 0.72} y={h * 0.5} size={50} mw={w * 0.46}>A JET SKI</Cap>
      <Cap x={w * 0.22} y={h * 0.2} size={44} mw={w * 0.4}>DAVE AT MINUTE 10</Cap>
      <Cap x={w / 2} y={h * 0.89} size={72} mw={w * 0.94} color={C.yellow}>IS THIS A BUSINESS PLAN?</Cap>
    </g>
  );
};

// Panik / Kalm / Panik: three rows, text left, face right.
export const MPanik: React.FC<MF> = ({f, w, h}) => {
  const rows: [string, string, 'scream' | 'happy', string][] = [
    ['A TIMER\nAPPEARS', 'PANIK', 'scream', '#F28B82'],
    ['I GOT THE\nLAST SPOT', 'KALM', 'happy', '#9EDDB0'],
    ['IT COST\n$1,997', 'PANIK', 'scream', '#F28B82'],
  ];
  const rh = h / 3;
  return (
    <g>
      <rect width={w} height={h} fill="#fff" />
      {rows.map(([t, word, e, col], i) => (
        <g key={i} transform={`translate(0,${i * rh})`}>
          <clipPath id={`pk52-${i}`}><rect x={w * 0.5} y={0} width={w * 0.5} height={rh} /></clipPath>
          <rect x={w * 0.5} y={0} width={w * 0.5} height={rh} fill={col} />
          <g clipPath={`url(#pk52-${i})`}>
            <Dave f={f + i * 13} x={w * 0.66} y={rh * 2.15} s={rh / 190} sweat={e === 'scream'} keys={[{at: 0, pose: e === 'scream' ? 'panic' : 'idle', expr: e, look: 0}]} />
          </g>
          <Ink x={w * 0.25} y={rh / 2} size={54} mw={w * 0.44}>{t}</Ink>
          <Cap x={w * 0.86} y={rh * 0.78} size={50} mw={w * 0.26}>{word}</Cap>
          <line x1={0} y1={rh} x2={w} y2={rh} stroke={C.ink} strokeWidth={6} />
        </g>
      ))}
      <line x1={w * 0.5} y1={0} x2={w * 0.5} y2={h} stroke={C.ink} strokeWidth={6} />
    </g>
  );
};

// "Shut up and take my money!"
export const MTakeMoney: React.FC<MF> = ({f, w, h}) => {
  const j = Math.sin(f * 0.9) * 10;
  return (
    <g>
      <rect width={w} height={h} fill="#F2A33A" />
      {Array.from({length: 12}).map((_, i) => <path key={i} d={`M ${w / 2} ${h * 0.55} L ${w / 2 + Math.cos((i / 12) * 6.283) * w} ${h * 0.55 + Math.sin((i / 12) * 6.283) * w}`} stroke="#F7C267" strokeWidth={46} />)}
      <Dave f={f} x={w * 0.3} y={h * 0.99} s={h / 500} keys={[{at: 0, pose: 'point_r', expr: 'scream', look: 1}]} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${w * 0.62 + j},${h * 0.5}) rotate(${-24 + i * 22})`}>
          <rect x={0} y={-34} width={190} height={68} rx={8} fill="#9EDDB0" {...O} />
          <text x={95} y={4} fontFamily={FONT} fontWeight={700} fontSize={42} fill="#1E8F5E" textAnchor="middle" dominantBaseline="middle">$</text>
        </g>
      ))}
      <Cap x={w / 2} y={h * 0.11} size={76} mw={w * 0.94}>SHUT UP AND TAKE</Cap>
      <Cap x={w * 0.6} y={h * 0.88} size={84} mw={w * 0.76} color={C.yellow}>MY $1,997!</Cap>
    </g>
  );
};

// "This is fine": a room on fire, the character smiling at a table.
export const MFine: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#F7D774" />
    <rect width={w} height={h * 0.22} fill="#8A8F98" opacity={0.75} />
    {[0.06, 0.2, 0.82, 0.95].map((k, i) => <Flame key={k} f={f} k={i * 2} x={w * k} y={h * 0.99} s={(i % 2 ? 1.2 : 1.6) * (h / 480)} />)}
    <Dave f={f} x={w * 0.4} y={h * 0.96} s={h / 540} keys={[{at: 0, pose: 'idle', expr: 'happy', look: 0.3}]} />
    <rect x={w * 0.5} y={h * 0.68} width={w * 0.24} height={16} rx={6} fill="#A8744A" {...O} strokeWidth={5} />
    <rect x={w * 0.61} y={h * 0.71} width={12} height={h * 0.26} fill="#A8744A" {...O} strokeWidth={5} />
    <rect x={w * 0.56} y={h * 0.59} width={44} height={46} rx={8} fill="#fff" {...O} strokeWidth={5} />
    <g transform={`translate(${w * 0.7},${h * 0.4})`}>
      <rect x={-w * 0.24} y={-48} width={w * 0.48} height={96} rx={34} fill="#fff" {...O} />
      <Ink size={52} mw={w * 0.42}>THIS IS FINE.</Ink>
    </g>
    <Cap x={w / 2} y={h * 0.12} size={62} mw={w * 0.94}>{'PAID $1,997. STILL THE BEGINNER LEVEL'}</Cap>
  </g>
);

const Helmet: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => <circle cx={x} cy={y - 291 * s} r={56 * s} fill="rgba(255,255,255,0.16)" stroke="#fff" strokeWidth={7 * s} />;
const Suit: React.FC<{children: React.ReactNode}> = ({children}) => <g style={{filter: 'drop-shadow(4px 0 0 #fff) drop-shadow(-4px 0 0 #fff) drop-shadow(0 4px 0 #fff) drop-shadow(0 -4px 0 #fff)'}}>{children}</g>;

// "Wait, it's all ...?" / "Always has been" (two astronauts).
export const MAlways: React.FC<MF> = ({f, w, h}) => {
  const s = h / 620;
  return (
    <g>
      <rect width={w} height={h} fill="#0B1030" />
      {Array.from({length: 26}).map((_, i) => <circle key={i} cx={(i * 197) % w} cy={(i * 89) % h} r={2 + (i % 3)} fill="#fff" opacity={0.4 + 0.6 * Math.abs(Math.sin((f + i * 11) / 9))} />)}
      <g transform={`translate(${w * 0.18},${h * 0.4})`}>
        <circle r={h * 0.26} fill="#3A86FF" stroke="#fff" strokeWidth={6} />
        <path d="M -70 20 L -70 -30 L 0 -80 L 70 -30 L 70 20 Z" fill="#F4E4C1" {...O} />
        <rect x={-18} y={-20} width={36} height={40} fill="#A8744A" {...O} strokeWidth={4} />
        <rect x={-90} y={34} width={180} height={44} rx={8} fill={C.red} {...O} strokeWidth={4} />
        <text x={0} y={58} fontFamily={FONT} fontWeight={700} fontSize={30} fill="#fff" textAnchor="middle" dominantBaseline="middle">FOR RENT</text>
      </g>
      <Suit>
        <Dave f={f} x={w * 0.52} y={h * 0.98} s={s} flip keys={[{at: 0, pose: 'shock', expr: 'shock', look: 1}]} />
        <Guru f={f} x={w * 0.84} y={h * 0.98} s={s} keys={[{at: 0, pose: 'point_l', expr: 'smug', look: -1}]} />
      </Suit>
      <Helmet x={w * 0.52} y={h * 0.98} s={s} />
      <Helmet x={w * 0.84} y={h * 0.98} s={s} />
      <Cap x={w * 0.42} y={h * 0.1} size={58} mw={w * 0.8}>{"WAIT... IT'S A RENTAL?"}</Cap>
      <Cap x={w * 0.7} y={h * 0.27} size={60} mw={w * 0.56} color={C.yellow}>ALWAYS HAS BEEN</Cap>
    </g>
  );
};

// Spider-Man pointing: identical characters pointing at each other.
export const MPointing: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#A9CBEA" />
    <rect y={h * 0.8} width={w} height={h * 0.2} fill="#7C8FA6" />
    <rect x={w * 0.43} y={h * 0.52} width={w * 0.14} height={h * 0.3} fill="#C98F5E" {...O} />
    <Guru f={f} x={w * 0.24} y={h * 0.96} s={h / 540} keys={[{at: 0, pose: 'point_r', expr: 'shock', look: 1}]} />
    <Guru f={f + 5} x={w * 0.76} y={h * 0.96} s={h / 540} keys={[{at: 0, pose: 'point_l', expr: 'shock', look: -1}]} />
    <Cap x={w / 2} y={h * 0.1} size={56} mw={w * 0.94}>{"THE GURU'S ONLY BUSINESS:"}</Cap>
    <Cap x={w * 0.23} y={h * 0.3} size={50} mw={w * 0.4} color={C.yellow}>{'THE\nCOURSE'}</Cap>
    <Cap x={w * 0.77} y={h * 0.3} size={50} mw={w * 0.42} color={C.yellow}>{'SELLING\nTHE COURSE'}</Cap>
  </g>
);

// Stonks.
export const MStonks: React.FC<MF> = ({f, w, h}) => {
  const k = Math.min(1, (f % 400) / 14);
  return (
    <g>
      <rect width={w} height={h} fill="#1B2A6B" />
      {Array.from({length: 7}).map((_, i) => <text key={i} x={10 + ((i * 97) % 60)} y={50 + i * (h / 7)} fontFamily={FONT} fontSize={30} fill="#3F56B8" letterSpacing={6}>{['4.20 58.0 79.1 21.0 474 125M', '1392 0.83 48.0 8.00 36 49.97', '6.59 24.0 79.0 21.0 58 29997'][i % 3]}</text>)}
      <path d={`M ${w * 0.34} ${h * 0.74} L ${w * 0.52} ${h * 0.52} L ${w * 0.64} ${h * 0.62} L ${w * 0.92} ${h * 0.24}`} fill="none" stroke="#FF8A1F" strokeWidth={28} strokeDasharray={1200} strokeDashoffset={1200 * (1 - k)} />
      <path d="M -44 -6 L 12 -54 L 28 12 Z" fill="#FF8A1F" transform={`translate(${w * 0.92},${h * 0.24}) rotate(8)`} opacity={k} />
      <Guru f={f} x={w * 0.19} y={h * 0.98} s={h / 500} keys={[{at: 0, pose: 'think', expr: 'smug', look: 0.6}]} />
      <Cap x={w * 0.65} y={h * 0.86} size={100} mw={w * 0.6}>STONKS</Cap>
      <Cap x={w / 2} y={h * 0.11} size={50} mw={w * 0.94} color={C.yellow}>SELL MEMBERSHIPS TO SELL MEMBERSHIPS</Cap>
    </g>
  );
};

// Drake approve / reject: two rows, character left, text right.
export const MDrake: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w * 0.38} height={h} fill="#F2A33A" />
    <rect x={w * 0.38} width={w * 0.62} height={h} fill="#fff" />
    <clipPath id="dr52a"><rect width={w * 0.38} height={h / 2} /></clipPath>
    <clipPath id="dr52b"><rect y={h / 2} width={w * 0.38} height={h / 2} /></clipPath>
    <g clipPath="url(#dr52a)"><Guru f={f} x={w * 0.2} y={h * 0.2 + 291 * (h / 420)} s={h / 420} keys={[{at: 0, pose: 'point_r', expr: 'suspicious', look: -1}]} /></g>
    <g clipPath="url(#dr52b)"><Guru f={f} x={w * 0.17} y={h * 0.7 + 291 * (h / 420)} s={h / 420} keys={[{at: 0, pose: 'thumbs', expr: 'grin', look: 0.8}]} /></g>
    <Ink x={w * 0.69} y={h * 0.25} size={58} mw={w * 0.56}>{'GET RICH\nFLIPPING HOUSES'}</Ink>
    <Ink x={w * 0.69} y={h * 0.75} size={58} mw={w * 0.56}>{'GET RICH SELLING\nA COURSE ABOUT IT'}</Ink>
    <line x1={0} y1={h / 2} x2={w} y2={h / 2} stroke={C.ink} strokeWidth={6} />
    <line x1={w * 0.38} y1={0} x2={w * 0.38} y2={h} stroke={C.ink} strokeWidth={6} />
  </g>
);

// Surprised reaction: three chat lines, then the shocked face.
export const MSurprised: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#fff" />
    <Ink x={40} y={h * 0.09} size={46} mw={w * 0.9} anchor="start">GURU: 100% risk free guarantee</Ink>
    <Ink x={40} y={h * 0.21} size={46} mw={w * 0.9} anchor="start">DAVE: ok can I have my refund</Ink>
    <Ink x={40} y={h * 0.33} size={46} mw={w * 0.9} anchor="start" color={C.red}>GURU: no</Ink>
    <rect y={h * 0.42} width={w} height={h * 0.58} fill={C.yellow} />
    <clipPath id="su52"><rect y={h * 0.42} width={w} height={h * 0.58} /></clipPath>
    <g clipPath="url(#su52)"><Dave f={f} x={w / 2} y={h * 0.7 + 291 * (h / 260)} s={h / 260} keys={[{at: 0, pose: 'idle', expr: 'shock', look: 0}]} /></g>
    <line x1={0} y1={h * 0.42} x2={w} y2={h * 0.42} stroke={C.ink} strokeWidth={6} />
  </g>
);

// Two buttons + sweating character.
export const MButtons: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#E9EEF2" />
    <rect x={w * 0.08} y={h * 0.25} width={w * 0.84} height={h * 0.16} rx={20} fill="#9AA5B1" {...O} />
    {[0.3, 0.7].map((k, i) => (
      <g key={k}>
        <ellipse cx={w * k} cy={h * 0.31} rx={78} ry={30} fill="#B5173A" {...O} />
        <ellipse cx={w * k} cy={h * 0.29} rx={78} ry={30} fill={C.red} {...O} />
        <g transform={`translate(${w * k},${h * 0.13}) rotate(${i ? 4 : -4})`}>
          <rect x={-w * 0.21} y={-h * 0.1} width={w * 0.42} height={h * 0.2} rx={8} fill="#fff" {...O} strokeWidth={5} />
          <Ink size={44} mw={w * 0.38}>{i ? 'HANG UP' : 'PUT IT\nIN WRITING'}</Ink>
        </g>
      </g>
    ))}
    <Coach f={f} x={w / 2} y={h * 0.99} s={h / 760} sweat keys={[{at: 0, pose: 'panic', expr: 'worried', look: 0}]} />
  </g>
);

// "program.exe has stopped responding" error box.
export const MError: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#2E6FD9" />
    <Coach f={f} x={w * 0.17} y={h * 0.98} s={h / 560} keys={[{at: 0, pose: 'idle', expr: 'shock', look: 0}]} />
    <g transform={`translate(${w * 0.36},${h * 0.2})`}>
      <rect width={w * 0.6} height={h * 0.62} fill="#ECE9D8" stroke={C.ink} strokeWidth={6} />
      <rect width={w * 0.6} height={h * 0.13} fill="#0A246A" />
      <text x={18} y={h * 0.07} fontFamily={FONT} fontWeight={700} fontSize={34} fill="#fff" dominantBaseline="middle">coach.exe</text>
      <rect x={w * 0.6 - 60} y={12} width={46} height={h * 0.13 - 24} fill={C.red} stroke="#fff" strokeWidth={3} />
      <circle cx={70} cy={h * 0.3} r={40} fill={C.red} stroke={C.ink} strokeWidth={5} />
      <path d={`M 52 ${h * 0.3 - 18} L 88 ${h * 0.3 + 18} M 88 ${h * 0.3 - 18} L 52 ${h * 0.3 + 18}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
      <Ink x={w * 0.36} y={h * 0.3} size={44} mw={w * 0.42}>{'coach.exe has\nstopped responding'}</Ink>
      <rect x={w * 0.17} y={h * 0.45} width={w * 0.26} height={h * 0.11} fill="#fff" stroke={C.ink} strokeWidth={4} opacity={0.6 + 0.4 * Math.sin(f / 3)} />
      <Ink x={w * 0.3} y={h * 0.505} size={34}>End call</Ink>
    </g>
    <Cap x={w * 0.66} y={h * 0.91} size={50} mw={w * 0.62} color={C.yellow}>ASKED FOR IT IN WRITING</Cap>
  </g>
);

// Success fist.
export const MSuccess: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#3FA796" />
    <rect y={h * 0.7} width={w} height={h * 0.3} fill="#E6D3A3" />
    <Dave f={f} x={w / 2} y={h * 1.02} s={h / 440} keys={[{at: 0, pose: 'thumbs', expr: 'smug', look: 0}]} />
    <Cap x={w / 2} y={h * 0.12} size={86} mw={w * 0.94}>CLOSED THE TAB</Cap>
    <Cap x={w / 2} y={h * 0.88} size={96} mw={w * 0.94} color={C.yellow}>KEPT MY $9,997</Cap>
  </g>
);

// "To be continued" arrow bar (goes over the frame, not in a card). Drawn around its own origin, pointing left.
export const ToBeContinued: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -330 0 L -250 -62 L -250 -36 L 330 -36 L 330 36 L -250 36 L -250 62 Z" fill="#E9C46A" stroke="#3A2A12" strokeWidth={8} strokeLinejoin="round" />
    <text x={50} y={4} fontFamily={ANTON} fontSize={50} fill="#3A2A12" textAnchor="middle" dominantBaseline="middle" letterSpacing={4}>TO BE CONTINUED</text>
  </g>
);

// "(chuckles) I'm in danger": character alone on a bus seat.
export const MDanger: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#F7D774" />
    <rect x={w * 0.06} y={h * 0.2} width={w * 0.4} height={h * 0.3} rx={16} fill="#BDE3F2" {...O} />
    <rect x={w * 0.54} y={h * 0.2} width={w * 0.4} height={h * 0.3} rx={16} fill="#BDE3F2" {...O} />
    <rect x={w * 0.2} y={h * 0.56} width={w * 0.6} height={h * 0.5} rx={30} fill="#5FA36A" {...O} />
    <Guru f={f} x={w / 2} y={h * 1.1} s={h / 470} sweat keys={[{at: 0, pose: 'idle', expr: 'grin', look: 0}]} />
    <Cap x={w / 2} y={h * 0.1} size={56} mw={w * 0.94}>THE GURU WHEN DAVE HAS ONE QUESTION</Cap>
    <Cap x={w / 2} y={h * 0.88} size={78} mw={w * 0.94} color={C.yellow}>{"(CHUCKLES) I'M IN DANGER"}</Cap>
  </g>
);

// "Trade offer": I receive / you receive.
export const MTrade: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#2A1B4D" />
    <rect x={w * 0.2} y={h * 0.04} width={w * 0.6} height={h * 0.15} fill={C.red} stroke="#fff" strokeWidth={6} />
    <Cap x={w / 2} y={h * 0.12} size={70} mw={w * 0.54}>TRADE OFFER</Cap>
    <Cap x={w * 0.2} y={h * 0.33} size={48} mw={w * 0.36} color={C.yellow}>I RECEIVE:</Cap>
    <Cap x={w * 0.2} y={h * 0.52} size={58} mw={w * 0.36}>{'ALL YOUR\nMONEY'}</Cap>
    <Cap x={w * 0.8} y={h * 0.33} size={48} mw={w * 0.36} color={C.yellow}>YOU RECEIVE:</Cap>
    <Cap x={w * 0.8} y={h * 0.52} size={58} mw={w * 0.36}>{'ANOTHER\nLEVEL'}</Cap>
    <Guru f={f} x={w / 2} y={h * 1.02} s={h / 480} keys={[{at: 0, pose: 'present', expr: 'smug', look: 0}]} />
  </g>
);

// Nervous sweating.
export const MSweat: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#C9463D" />
    {Array.from({length: 10}).map((_, i) => <path key={i} d={`M ${w / 2} ${h * 0.6} L ${w / 2 + Math.cos((i / 10) * 6.283) * w} ${h * 0.6 + Math.sin((i / 10) * 6.283) * w}`} stroke="#D95C52" strokeWidth={50} />)}
    <clipPath id="sw52"><rect width={w} height={h} /></clipPath>
    <g clipPath="url(#sw52)"><Guru f={f} x={w / 2 + Math.sin(f * 1.3) * 5} y={h * 0.62 + 291 * (h / 300)} s={h / 300} sweat keys={[{at: 0, pose: 'idle', expr: 'worried', look: 0}]} /></g>
    {[0.3, 0.36, 0.66, 0.71].map((k, i) => <path key={k} d="M 0 -22 Q 16 4 0 14 Q -16 4 0 -22 Z" fill="#8FD0F2" {...O} strokeWidth={4} transform={`translate(${w * k},${h * 0.42 + ((f * 5 + i * 37) % 120)})`} />)}
    <Cap x={w / 2} y={h * 0.1} size={60} mw={w * 0.94}>COURSE GURUS EVERYWHERE</Cap>
    <Cap x={w / 2} y={h * 0.89} size={66} mw={w * 0.94} color={C.yellow}>WHEN THE FTC READS THE FINE PRINT</Cap>
  </g>
);

// Confused math: formulas floating around a thinking face.
export const MMath: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#F4E4C1" />
    <clipPath id="ma52"><rect width={w} height={h} /></clipPath>
    <g clipPath="url(#ma52)"><Dave f={f} x={w / 2} y={h * 0.66 + 291 * (h / 300)} s={h / 300} keys={[{at: 0, pose: 'think', expr: 'think', look: Math.sin(f / 5)}]} /></g>
    {(['$1,997', 'x 1,000', '= ???', 'a² + b²', '∑ $$$', '÷ 0 students'] as string[]).map((t, i) => (
      <text key={t} x={w * [0.17, 0.83, 0.2, 0.82, 0.14, 0.8][i]} y={h * [0.34, 0.3, 0.62, 0.56, 0.84, 0.8][i] + Math.sin((f + i * 9) / 5) * 10} fontFamily={FONT} fontWeight={700} fontSize={h * 0.085} fill="#fff" stroke={C.ink} strokeWidth={9} paintOrder="stroke" textAnchor="middle" transform={`rotate(${i % 2 ? 6 : -6} ${w / 2} ${h / 2})`}>{t}</text>
    ))}
    <Cap x={w / 2} y={h * 0.1} size={66} mw={w * 0.94}>DAVE DOING GURU MATH</Cap>
  </g>
);

// "Me waiting for ...": still on the bench, cobwebs and all.
export const MWaiting: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#C8CED6" />
    <rect y={h * 0.82} width={w} height={h * 0.18} fill="#9AA5B1" />
    <rect x={w * 0.2} y={h * 0.7} width={w * 0.6} height={18} rx={6} fill="#A8744A" {...O} strokeWidth={5} />
    <rect x={w * 0.26} y={h * 0.72} width={14} height={h * 0.14} fill="#A8744A" {...O} strokeWidth={5} />
    <rect x={w * 0.72} y={h * 0.72} width={14} height={h * 0.14} fill="#A8744A" {...O} strokeWidth={5} />
    <g style={{filter: 'grayscale(1) brightness(1.15)'}}><Dave f={0} x={w / 2} y={h * 0.86} s={h / 620} keys={[{at: 0, pose: 'idle', expr: 'tired', look: 0}]} /></g>
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${w * 0.56} ${h * 0.38} L ${w * 0.56 + 150 * Math.cos(i * 0.45 + 0.1)} ${h * 0.38 + 150 * Math.sin(i * 0.45 + 0.1)}`} stroke="#fff" strokeWidth={4} />)}
    {[50, 100, 150].map((r) => <path key={r} d={`M ${w * 0.56 + r} ${h * 0.38 + r * 0.1} A ${r} ${r} 0 0 1 ${w * 0.56 + r * 0.2} ${h * 0.38 + r}`} fill="none" stroke="#fff" strokeWidth={4} />)}
    <g transform={`translate(${w * 0.84},${h * 0.44 + Math.sin(f / 4) * 8})`}><line x1={0} y1={-90} x2={0} y2={0} stroke="#fff" strokeWidth={3} /><circle r={12} fill={C.ink} /></g>
    <Cap x={w / 2} y={h * 0.11} size={64} mw={w * 0.94}>DAVE WAITING FOR HIS REFUND</Cap>
    <Cap x={w / 2} y={h * 0.93} size={48} mw={w * 0.94} color={C.yellow}>3 REPLIES LATER...</Cap>
  </g>
);

// Reverse card.
export const MReverse: React.FC<MF> = ({f, w, h}) => (
  <g>
    <rect width={w} height={h} fill="#1E8F5E" />
    {Array.from({length: 12}).map((_, i) => <path key={i} d={`M ${w * 0.68} ${h * 0.52} L ${w * 0.68 + Math.cos((i / 12) * 6.283 + f / 30) * w} ${h * 0.52 + Math.sin((i / 12) * 6.283 + f / 30) * w}`} stroke="#2BA871" strokeWidth={44} />)}
    <Dave f={f} x={w * 0.24} y={h * 0.99} s={h / 520} keys={[{at: 0, pose: 'present', expr: 'smug', look: 1}]} />
    <g transform={`translate(${w * 0.68},${h * 0.52}) rotate(${8 + Math.sin(f / 4) * 5}) scale(${h / 700})`}>
      <rect x={-130} y={-190} width={260} height={380} rx={30} fill="#fff" {...O} />
      <rect x={-108} y={-168} width={216} height={336} rx={20} fill={C.red} />
      <ellipse rx={92} ry={150} fill="#fff" transform="rotate(28)" />
      <path d="M -50 40 L -50 -30 L -74 -30 L -34 -84 L 6 -30 L -18 -30 L -18 40 Z" fill={C.red} {...O} strokeWidth={5} />
      <path d="M 50 -40 L 50 30 L 74 30 L 34 84 L -6 30 L 18 30 L 18 -40 Z" fill={C.red} {...O} strokeWidth={5} />
    </g>
    <Cap x={w / 2} y={h * 0.1} size={58} mw={w * 0.94}>GURU: ANY QUESTIONS BEFORE YOU PAY?</Cap>
    <Cap x={w * 0.62} y={h * 0.91} size={72} mw={w * 0.72} color={C.yellow}>DAVE: UNO REVERSE</Cap>
  </g>
);
