import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {localFont} from '../theme';
import {Music} from './kit2';
import {Sfx} from '../fx';
import type {SalPlan, SBeat} from './SalShort';

// PHONE-SCREEN POV Short (format test F9, owner 10 Nov): the whole Short is a screen recording of a phone.
// Real-UI scale: 1 iOS point = 2.77 px at 1080 wide. Real photo wallpaper (Poly Haven CC0). Inter (OFL).
const I3 = localFont('Inter3', 'inter-300.woff2', '300');
const I4 = localFont('Inter4', 'inter-400.woff2', '400');
const I6 = localFont('Inter6', 'inter-600.woff2', '600');
const I7 = localFont('Inter7', 'inter-700.woff2', '700');
const P = 2.77;
const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const io = Easing.bezier(0.2, 0.9, 0.2, 1);
const e = (f: number, a: number, n = 8) => interpolate(f, [a, a + n], [0, 1], {...CL, easing: io});
const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
const RED = '#FF453A';
const GREEN = '#30D158';
type SP = {f: number; c: (k: string) => number; b: SBeat; plan: SalPlan};

// ── status bar ──
const Status: React.FC<{t: string; dark?: boolean; bat?: number}> = ({t, dark, bat = 0.82}) => {
  const col = dark ? '#000' : '#fff';
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 54 * P, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${8 * P}px ${30 * P}px 0`, color: col, fontFamily: I6, fontSize: 17 * P}}>
      <span>{t}</span>
      <div style={{display: 'flex', alignItems: 'center', gap: 6 * P}}>
        <svg width={18 * P} height={12 * P} viewBox="0 0 18 12">{[0, 1, 2, 3].map((i) => <rect key={i} x={i * 4.6} y={9 - i * 3} width={3.2} height={3 + i * 3} rx={0.8} fill={col} />)}</svg>
        <svg width={17 * P} height={12 * P} viewBox="0 0 17 12"><path d="M8.5 11.5 L5.7 8.4 A4 4 0 0 1 11.3 8.4 Z M2.9 5.6 A8 8 0 0 1 14.1 5.6 L12.5 7.2 A5.8 5.8 0 0 0 4.5 7.2 Z M0 2.8 A12 12 0 0 1 17 2.8 L15.5 4.3 A9.9 9.9 0 0 0 1.5 4.3 Z" fill={col} /></svg>
        <div style={{width: 27 * P, height: 13 * P, border: `${1.2 * P}px solid ${col}`, opacity: 0.95, borderRadius: 4 * P, padding: 1.5 * P, boxSizing: 'border-box'}}>
          <div style={{width: `${bat * 100}%`, height: '100%', background: bat < 0.2 ? RED : col, borderRadius: 2 * P}} />
        </div>
      </div>
    </div>
  );
};

// ── touch indicator (screen-recording "show touches") ──
const Tap: React.FC<{f: number; at: number; x: number; y: number}> = ({f, at, x, y}) => {
  const t = f - at;
  if (t < 0 || t > 12) return null;
  const s = interpolate(t, [0, 3, 12], [0.6, 1, 1.25], CL);
  return <div style={{position: 'absolute', left: x, top: y, width: 120, height: 120, marginLeft: -60, marginTop: -60, borderRadius: 60, background: 'rgba(255,255,255,0.35)', border: '4px solid rgba(255,255,255,0.7)', transform: `scale(${s})`, opacity: interpolate(t, [0, 8, 12], [1, 0.8, 0], CL)}} />;
};

// ── caption (creator-style text on a screen recording) ──
const Caption: React.FC<{f: number; at: number; text: string; y?: number; col?: string}> = ({f, at, text, y = 640, col = '#fff'}) => {
  if (f < at) return null;
  const s = at === 0 ? 1 : interpolate(f - at, [0, 4, 7], [1.3, 0.96, 1], CL);
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: y, textAlign: 'center', transform: `scale(${s})`, fontFamily: I7, fontSize: 86, lineHeight: 1.08, color: col, WebkitTextStroke: '12px #000', paintOrder: 'stroke fill', letterSpacing: -1}}>
      {text}
    </div>
  );
};

// ── notification card ──
const Notif: React.FC<{title: string; body: string; when?: string; y: number; o?: number; s?: number; red?: boolean}> = ({title, body, when = 'now', y, o = 1, s = 1, red}) => (
  <div style={{position: 'absolute', left: 10 * P, right: 10 * P, top: y, opacity: o, transform: `scale(${s})`, transformOrigin: '50% 0%', background: 'rgba(245,245,245,0.78)', backdropFilter: 'blur(30px)', borderRadius: 22 * P, padding: `${12 * P}px ${14 * P}px`, display: 'flex', gap: 10 * P, alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.25)'}}>
    <div style={{width: 38 * P, height: 38 * P, borderRadius: 9 * P, background: red ? 'linear-gradient(160deg,#ff6a5f,#d70015)' : 'linear-gradient(160deg,#4cd964,#0a9c3a)', color: '#fff', fontFamily: I7, fontSize: 22 * P, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>$</div>
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: I6, fontSize: 15 * P, color: '#111'}}>
        <span>{title}</span>
        <span style={{fontFamily: I4, color: '#666', fontSize: 13 * P}}>{when}</span>
      </div>
      <div style={{fontFamily: I4, fontSize: 15 * P, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{body}</div>
    </div>
  </div>
);

const Wall: React.FC<{f: number; dim?: number}> = ({f, dim = 0.15}) => (
  <AbsoluteFill>
    <Img src={staticFile('phone96/wall.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.06 + Math.sin(f / 60) * 0.01})`}} />
    <AbsoluteFill style={{background: `rgba(0,0,0,${dim})`}} />
  </AbsoluteFill>
);

const clockAt = (min: number) => {
  const h = Math.floor(min / 60) % 24;
  const m = Math.floor(min % 60);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}`;
};

// ───────── scenes ─────────
// lock screen with a stack of $1 charges (frame 0 + loop)
const Lock: React.FC<SP & {mode: 'hook' | 'loop' | 'broke' | 'spam'}> = ({f, c, b, mode}) => {
  const lf = f - b.from;
  let n = 3;
  let min = 7 * 60;
  if (mode === 'hook') n = 3 + (f >= c('lk_dollar') ? 1 : 0) + (f >= c('lk_checked') ? 1 : 0);
  if (mode === 'broke') {
    const k = e(f, b.from, Math.max(10, c('br_broke') - b.from));
    min = 7 * 60 + k * (4 * 60 + 58);
    n = 5 + Math.floor(k * 24);
  }
  if (mode === 'spam') n = 5 + Math.max(0, Math.floor((f - c('sp_keep')) / 3));
  const declined = mode === 'broke' && f >= c('br_broke');
  const cards = Array.from({length: Math.min(n, 60)}, (_, i) => i);
  const bal = Math.max(0, 41 - (n - 3));
  const taps = mode === 'spam' ? Array.from({length: 12}, (_, i) => c('sp_keep') + i * 3) : mode === 'hook' ? [c('lk_dollar'), c('lk_checked')] : mode === 'loop' ? [b.to - 6] : [];
  return (
    <AbsoluteFill>
      <Wall f={f} />
      <Status t="" />
      <div style={{position: 'absolute', top: 64 * P, left: 0, right: 0, textAlign: 'center', color: '#fff', fontFamily: I6, fontSize: 21 * P, textShadow: '0 2px 10px rgba(0,0,0,0.4)'}}>Monday, November 10</div>
      <div style={{position: 'absolute', top: 76 * P, left: 0, right: 0, textAlign: 'center', color: '#fff', fontFamily: I6, fontSize: 104 * P, letterSpacing: -2 * P, textShadow: '0 4px 30px rgba(0,0,0,0.35)'}}>{clockAt(min)}</div>
      <div style={{position: 'absolute', top: 210 * P, left: 0, right: 0, textAlign: 'center', fontFamily: I6, fontSize: 17 * P, color: bal < 10 ? '#ff9d96' : '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>Balance {usd(bal)}.00</div>
      {cards.slice(-7).reverse().map((i, k) => {
        const age = f - (b.from + i * 2);
        return <Notif key={i} title="Phone Tax" body={`−$1.00 · You checked your phone (#${i + 1})`} when={k === 0 ? 'now' : `${k * 10}m ago`} y={300 * P + k * 16 * P} o={k < 4 ? 1 - k * 0.18 : 0} s={1 - k * 0.05} />;
      })}
      {declined ? <Notif title="Card declined" body="Insufficient funds · Coffee Shop $4.50" y={300 * P} red s={interpolate(f - c('br_broke'), [0, 4, 7], [1.2, 0.97, 1], CL)} /> : null}
      {taps.map((t, i) => <Tap key={i} f={f} at={t} x={540 + (random(`tx${i}`) - 0.5) * 200} y={1250 + (random(`ty${i}`) - 0.5) * 160} />)}
      {mode === 'hook' || mode === 'loop' ? <Caption f={f} at={mode === 'hook' ? 0 : b.from} text="$1 EVERY TIME YOU CHECK?" y={1290} col="#FFD60A" /> : null}
      {declined ? <Caption f={f} at={c('br_broke')} text="BROKE BEFORE LUNCH" y={1290} col={RED} /> : null}
      {mode === 'spam' ? <Caption f={f} at={c('sp_keep')} text="YOU'D STILL CHECK IT" y={1290} col="#fff" /> : null}
      {lf < 0 ? null : null}
    </AbsoluteFill>
  );
};

// Screen Time "Pickups"
const ScreenTime: React.FC<SP & {twice?: boolean}> = ({f, c, b, twice}) => {
  const k = twice ? e(f, c('st_twice'), 16) : e(f, c('st_ninety'), 18);
  const v = twice ? Math.round(96 + 96 * k) : Math.round(96 * k);
  const hours = [0, 0, 0, 0, 0, 0, 0, 4, 8, 6, 5, 7, 9, 6, 5, 6, 7, 8, 9, 6, 4, 3, 2, 0];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Status t="9:41" />
      <div style={{position: 'absolute', top: 60 * P, left: 20 * P, color: '#0A84FF', fontFamily: I4, fontSize: 17 * P}}>‹ Settings</div>
      <div style={{position: 'absolute', top: 92 * P, left: 20 * P, color: '#fff', fontFamily: I7, fontSize: 34 * P}}>Screen Time</div>
      <div style={{position: 'absolute', top: 150 * P, left: 16 * P, right: 16 * P, background: '#1C1C1E', borderRadius: 12 * P, padding: 16 * P}}>
        <div style={{fontFamily: I6, color: '#8E8E93', fontSize: 13 * P, letterSpacing: 0.5 * P}}>{twice ? 'PICKUPS · AGE 18–24' : 'PICKUPS · DAILY AVERAGE'}</div>
        <div style={{fontFamily: I7, color: twice ? RED : '#fff', fontSize: 80 * P, lineHeight: 1.1}}>{v}</div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 3 * P, height: 110 * P, marginTop: 8 * P}}>
          {hours.map((h, i) => <div key={i} style={{flex: 1, height: `${(h / 9) * 100 * e(f, b.from + i, 10) * (twice ? 1 + k : 1) / (twice ? 2 : 1)}%`, background: twice ? RED : '#0A84FF', borderRadius: 2 * P}} />)}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: I4, color: '#8E8E93', fontSize: 12 * P, marginTop: 6 * P}}><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span></div>
      </div>
      <Caption f={f} at={twice ? c('st_twice') : c('st_ninety')} text={twice ? 'TWICE AS MUCH' : '96 TIMES A DAY'} y={1290} col={twice ? RED : '#FFD60A'} />
    </AbsoluteFill>
  );
};

// a timeline of pickups every 10 minutes
const Every10: React.FC<SP> = ({f, c, b}) => {
  const lf = f - b.from;
  const off = lf * 9;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Status t="9:41" />
      <div style={{position: 'absolute', top: 92 * P, left: 20 * P, color: '#fff', fontFamily: I7, fontSize: 34 * P}}>Today</div>
      <div style={{position: 'absolute', top: 150 * P, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>
        {Array.from({length: 40}, (_, i) => (
          <div key={i} style={{position: 'absolute', left: 16 * P, right: 16 * P, top: i * 62 * P - off, height: 54 * P, background: '#1C1C1E', borderRadius: 12 * P, display: 'flex', alignItems: 'center', padding: `0 ${16 * P}px`, gap: 12 * P}}>
            <div style={{width: 10 * P, height: 10 * P, borderRadius: 5 * P, background: '#0A84FF'}} />
            <div style={{fontFamily: I6, color: '#fff', fontSize: 19 * P, flex: 1}}>Picked up phone</div>
            <div style={{fontFamily: I4, color: '#8E8E93', fontSize: 17 * P}}>{clockAt(7 * 60 + i * 10)} AM</div>
          </div>
        ))}
      </div>
      <Caption f={f} at={c('ev_ten')} text="EVERY 10 MINUTES" y={1290} col="#FFD60A" />
    </AbsoluteFill>
  );
};

// bank app
const Bank: React.FC<SP & {mode: 'day' | 'year' | 'year2'}> = ({f, c, b, mode}) => {
  const lf = f - b.from;
  const tgt = mode === 'day' ? 96 : mode === 'year' ? 35040 : 70080;
  const at = mode === 'day' ? c('bk_ninety') : mode === 'year' ? c('bk_thirty') : c('bk_seventy');
  const v = Math.round(tgt * e(f, at, mode === 'day' ? 14 : 20));
  const rows = mode === 'day' ? Array.from({length: 30}, (_, i) => ({n: 'Phone Tax', d: `${clockAt(7 * 60 + i * 10)} AM`, a: '−$1.00'})) : Array.from({length: 12}, (_, i) => ({n: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][i], d: 'Phone Tax · monthly', a: `−${usd(tgt / 12)}`}));
  const scroll = mode === 'day' ? lf * 7 : lf * 3;
  return (
    <AbsoluteFill style={{background: '#F2F2F7'}}>
      <Status t="9:41" dark />
      <div style={{position: 'absolute', top: 70 * P, left: 0, right: 0, textAlign: 'center', fontFamily: I6, color: '#3C3C43', fontSize: 15 * P}}>{mode === 'day' ? 'Checking ·· 4417 · Today' : 'Checking ·· 4417 · 2026'}</div>
      <div style={{position: 'absolute', top: 92 * P, left: 0, right: 0, textAlign: 'center', fontFamily: I7, color: f >= at ? RED : '#000', fontSize: (mode === 'day' ? 64 : 56) * P}}>−{usd(v)}{mode === 'day' ? '.00' : ''}</div>
      <div style={{position: 'absolute', top: 172 * P, left: 0, right: 0, textAlign: 'center', fontFamily: I4, color: '#8E8E93', fontSize: 15 * P}}>{mode === 'day' ? 'spent on checking your phone' : 'spent on checking your phone this year'}</div>
      <div style={{position: 'absolute', top: 210 * P, left: 16 * P, right: 16 * P, bottom: 0, overflow: 'hidden', borderRadius: 12 * P}}>
        {rows.map((r, i) => (
          <div key={i} style={{position: 'absolute', left: 0, right: 0, top: i * 64 * P - scroll, height: 64 * P, background: '#fff', borderBottom: '2px solid #E5E5EA', display: 'flex', alignItems: 'center', padding: `0 ${14 * P}px`, gap: 12 * P}}>
            <div style={{width: 38 * P, height: 38 * P, borderRadius: 19 * P, background: '#FFE5E3', color: RED, fontFamily: I7, fontSize: 18 * P, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>$</div>
            <div style={{flex: 1}}>
              <div style={{fontFamily: I6, fontSize: 17 * P, color: '#000'}}>{r.n}</div>
              <div style={{fontFamily: I4, fontSize: 14 * P, color: '#8E8E93'}}>{r.d}</div>
            </div>
            <div style={{fontFamily: I6, fontSize: 17 * P, color: RED}}>{r.a}</div>
          </div>
        ))}
      </div>
      {mode === 'year2' && f >= at + 22 ? <Notif title="Bank" body="Your account is overdrawn" y={8 * P} red s={interpolate(f - at - 22, [0, 4, 7], [1.2, 0.97, 1], CL)} /> : null}
      <Caption f={f} at={at} text={mode === 'day' ? '$96 A DAY' : mode === 'year' ? '$35,040 A YEAR' : '$70,080 A YEAR'} y={1290} col={mode === 'day' ? '#FFD60A' : RED} />
    </AbsoluteFill>
  );
};

// Messages
const Texts: React.FC<SP> = ({f, c, b}) => {
  const msgs: [number, boolean, string][] = [
    [b.from + 2, false, 'why is your bank app red 😭'],
    [c('tx_car'), true, 'i spent $35,040 checking my phone'],
    [c('tx_car') + 10, false, 'that’s a NEW CAR. every year.'],
    [c('tx_notifications'), false, 'gone to notifications'],
  ];
  let y = 170 * P;
  return (
    <AbsoluteFill style={{background: '#fff'}}>
      <Status t="9:41" dark />
      <div style={{position: 'absolute', top: 54 * P, left: 0, right: 0, height: 92 * P, borderBottom: '2px solid #E5E5EA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 50 * P, height: 50 * P, borderRadius: 25 * P, background: 'linear-gradient(#A5ABB8,#858994)', color: '#fff', fontFamily: I6, fontSize: 22 * P, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>M</div>
        <div style={{fontFamily: I4, fontSize: 12 * P, color: '#000', marginTop: 3 * P}}>Mom ›</div>
      </div>
      {msgs.map(([at, me, t], i) => {
        if (f < at) return null;
        const s = interpolate(f - at, [0, 4, 7], [0.6, 1.04, 1], CL);
        const top = y;
        y += 62 * P;
        return (
          <div key={i} style={{position: 'absolute', top, [me ? 'right' : 'left']: 14 * P, maxWidth: '78%', transform: `scale(${s})`, transformOrigin: me ? '100% 100%' : '0% 100%', background: me ? '#0A84FF' : '#E9E9EB', color: me ? '#fff' : '#000', fontFamily: I4, fontSize: 19 * P, padding: `${9 * P}px ${14 * P}px`, borderRadius: 20 * P}}>
            {t}
          </div>
        );
      })}
      <Caption f={f} at={c('tx_car')} text="A NEW CAR EVERY YEAR" y={1290} col="#FF9F0A" />
    </AbsoluteFill>
  );
};

// time melts away: stopwatch spinning
const TimeScene: React.FC<SP> = ({f, c, b}) => {
  const lf = f - b.from;
  const secs = lf * lf * 11;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  const pad = (x: number) => String(x).padStart(2, '0');
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Status t="9:41" bat={Math.max(0.05, 0.82 - lf * 0.012)} />
      <svg width={1080} height={1080} style={{position: 'absolute', top: 260}} viewBox="0 0 1080 1080">
        <circle cx={540} cy={540} r={400} stroke="#1C1C1E" strokeWidth={18} fill="none" />
        {Array.from({length: 60}, (_, i) => <line key={i} x1={540} y1={150} x2={540} y2={i % 5 ? 175 : 195} stroke="#8E8E93" strokeWidth={i % 5 ? 3 : 6} transform={`rotate(${i * 6} 540 540)`} />)}
        <line x1={540} y1={540} x2={540} y2={170} stroke="#FF9F0A" strokeWidth={8} strokeLinecap="round" transform={`rotate(${secs * 6} 540 540)`} />
        <circle cx={540} cy={540} r={14} fill="#FF9F0A" />
      </svg>
      <div style={{position: 'absolute', top: 1360, left: 0, right: 0, textAlign: 'center', fontFamily: I3, fontSize: 150, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>{pad(h)}:{pad(m)}:{pad(s)}</div>
      <Caption f={f} at={c('tm_time')} text="YOU PAY WITH TIME" y={180} col="#FF9F0A" />
    </AbsoluteFill>
  );
};

const SCENES: Record<string, React.FC<SP>> = {
  lock_hook: (p) => <Lock {...p} mode="hook" />,
  lock_broke: (p) => <Lock {...p} mode="broke" />,
  lock_spam: (p) => <Lock {...p} mode="spam" />,
  lock_loop: (p) => <Lock {...p} mode="loop" />,
  screentime: ScreenTime,
  screentime2: (p) => <ScreenTime {...p} twice />,
  every10: Every10,
  bank_day: (p) => <Bank {...p} mode="day" />,
  bank_year: (p) => <Bank {...p} mode="year" />,
  bank_year2: (p) => <Bank {...p} mode="year2" />,
  texts: Texts,
  time: TimeScene,
};

export const PhoneShort: React.FC<{plan: SalPlan}> = ({plan}) => {
  const f = useCurrentFrame();
  const c = useMemo(() => (k: string) => plan.cues[k] ?? 1e9, [plan]);
  let bi = 0;
  while (bi + 1 < plan.beats.length && f >= plan.beats[bi + 1].from) bi++;
  const b = plan.beats[bi];
  const S = SCENES[b.scene] ?? SCENES.lock_hook;
  const lf = f - b.from;
  // app-switch feel: new screen slides up from the bottom in 5 frames (lock screens cut hard)
  const slide = bi > 0 && !b.scene.startsWith('lock') ? interpolate(lf, [0, 5], [260, 0], {...CL, easing: io}) : 0;
  const shake = b.scene === 'lock_spam' && f >= c('sp_keep') ? (random(`sh${f}`) - 0.5) * 10 : 0;
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translate(${shake}px, ${slide}px)`, opacity: interpolate(lf, [0, 3], [bi > 0 && slide ? 0.4 : 1, 1], CL)}}>
        <S f={f} c={c} b={b} plan={plan} />
      </AbsoluteFill>
      {plan.voice ? <Audio src={staticFile(plan.voice)} /> : null}
      <Music segs={plan.music} />
      <Sfx cues={plan.sfx} />
    </AbsoluteFill>
  );
};
