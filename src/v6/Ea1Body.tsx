import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Cue} from '../fx';
import LENS from '../../blender/ea1_lens.json';
import {ANTON, ComicBurst, Counter, HomeBase, K, UICard, snap} from './kit';
import {MSeg} from './kit2';
import {at, Big, Cut, Flash, Kinetic, Shot, Small, Src, Wob} from './Ea1';

// ea1 chapters 1–6 (pipeline/episodes/ea1_full_script.md). Every fact card carries its source line; quotes are verbatim
// and attributed; opponents' claims are labelled as claims. 3D sets: Y Q P R B T V A D W (blender/ea1.py).
const L = LENS as Record<string, number>;
const GAP = 120; // music-only breath before every chapter (tools/voice_gaps.py, 4 s)
type Pose = 'shock_panic' | 'smug_point_you' | 'determined_present' | 'think_think' | 'neutral_shrug' | 'grin_cheer' | 'determined_point_l';

// a card on the dark home base with Dave's cut-out on the right
const Home: React.FC<{f: number; a: number; dave: [number, Pose][]; src?: string; children?: React.ReactNode}> = ({f, a, dave, src, children}) => (
  <>
    <HomeBase f={f} />
    <Wob f={f}>{children}</Wob>
    <Cut f={f} keys={dave} />
    {src ? <Src f={f} at={a + 4}>{src}</Src> : null}
  </>
);
const Card: React.FC<{f: number; a: number; w?: number; h?: number; y?: number; children: React.ReactNode}> = ({f, a, w = 1000, h = 560, y = 200, children}) => (
  <UICard f={f} at={a + 2} x={130} y={y} w={w} h={h}>
    <div style={{padding: '40px 50px'}}>{children}</div>
  </UICard>
);
const Quote: React.FC<{f: number; a: number; who: string; children: React.ReactNode}> = ({f, a, who, children}) => (
  <Card f={f} a={a} h={600}>
    <div style={{fontFamily: ANTON, fontSize: 140, color: K.yellow, lineHeight: 0.6}}>“</div>
    <div style={{fontFamily: 'Georgia', fontSize: 50, color: '#fff', lineHeight: 1.25}}>{children}</div>
    <Small color={K.yellow} size={34} style={{marginTop: 26}}>— {who}</Small>
  </Card>
);
const Line: React.FC<{f: number; a: number; i?: number; color?: string; children: React.ReactNode}> = ({f, a, i = 0, color = '#fff', children}) => (
  <div style={{opacity: snap(f, a + i * 8, 6), transform: `translateX(${(1 - snap(f, a + i * 8, 6)) * -60}px)`, marginBottom: 22}}>
    <Big size={58} color={color}>{children}</Big>
  </div>
);
const Chapter: React.FC<{f: number; a: number; title: string; score: string}> = ({f, a, title, score}) => (
  <>
    <HomeBase f={f} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: `scale(${2.2 - 1.2 * snap(f, a + 4, 8)}) rotate(-2deg)`, background: '#f3efe4', padding: '20px 70px', borderTop: `40px solid ${K.red}`, borderRadius: 16}}>
        <div style={{fontFamily: ANTON, fontSize: 190, color: '#151515'}}>{title}</div>
      </div>
      <div style={{marginTop: 50, opacity: snap(f, a + 30, 8)}}>
        <Small color={K.yellow} size={52}>{score}</Small>
      </div>
    </div>
    <Flash f={f} at={a} white={false} />
  </>
);
// chapter-end open loop (loop method): Dave leans in, the next chapter's hook line slams in, a clock ticks
const Tease: React.FC<{f: number; a: number; text: string; color?: string}> = ({f, a, text, color = K.yellow}) => (
  <>
    <HomeBase f={f} />
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 60%, transparent 30%, rgba(0,0,0,${0.3 + 0.4 * snap(f, a, 30)}) 75%)`}} />
    <div style={{position: 'absolute', left: 130, top: 300, width: 1100}}><Kinetic f={f} at={a + 6} x={0} y={0} size={96} color={color}>{text}</Kinetic></div>
    <Cut f={f} keys={[[a, 'smug_point_you']]} />
  </>
);
const Books: React.FC<{f: number; a: number}> = ({f, a}) => (
  <div style={{position: 'absolute', left: 160, top: 170, display: 'flex', gap: 60}}>
    {[0, 1].map((i) => (
      <Img key={i} src={staticFile(`ea1/book_ae${i}.png`)} style={{height: 640, boxShadow: '0 30px 60px rgba(0,0,0,.6)', transform: `translateY(${(1 - snap(f, a + i * 10, 7)) * -900}px) rotate(${i ? 4 : -4}deg)`}} />
    ))}
  </div>
);
const Scale: React.FC<{f: number; a: number}> = ({f, a}) => {
  const tilt = Math.sin((f - a) / 9) * 9 * Math.exp(-(f - a) / 140);
  const pan = (label: string, color: string, side: number) => (
    <div style={{position: 'absolute', left: 480 + side * 330 - 150, top: 360 + side * tilt * 6, width: 300, textAlign: 'center'}}>
      <div style={{height: 10, background: '#888', width: 2, margin: '0 auto 0', minHeight: 90}} />
      <div style={{background: color, borderRadius: '0 0 150px 150px', padding: '30px 10px'}}><Big size={50}>{label}</Big></div>
    </div>
  );
  return (
    <div style={{position: 'absolute', left: 100, top: 120, width: 960, height: 700, opacity: snap(f, a, 6)}}>
      <div style={{position: 'absolute', left: 470, top: 120, width: 20, height: 500, background: '#bbb'}} />
      <div style={{position: 'absolute', left: 130, top: 330, width: 700, height: 16, background: '#ddd', transform: `rotate(${tilt}deg)`}} />
      {pan('TAXES ↑', K.red, -1)}
      {pan('PREMIUMS ↓', '#2f6fd6', 1)}
    </div>
  );
};

export const bodyStart = () => at('c1_01') - GAP;

export const BodyScene: React.FC<{f: number; end: number}> = ({f, end}) => {
  const b = (id: string, w?: string) => at(id, w);
  const sh = (name: string, from: string, to: string | null) => {
    const s = b(from);
    return <Shot name={name} len24={L[name]} from={s} seg={(to ? b(to) : end) - s} />;
  };
  const ch = (id: string) => b(id) - GAP;
  // [start frame, scene]; each scene runs until the next start
  const S: [number, () => React.ReactNode][] = [
    // ── CHAPTER 1 — DAY ONE: YOUR HEALTH BILL
    [ch('c1_01'), () => <Chapter f={f} a={ch('c1_01')} title="DAY 1" score="PROMISES 0 · LAWS PASSED 0" />],
    [b('c1_01'), () => (<>{sh('Y', 'c1_01', 'c1_02')}<Kinetic f={f} at={b('c1_01', 'medicare')} x={110} y={110} size={110} color={K.yellow}>MEDICARE FOR ALL</Kinetic><Src f={f} at={b('c1_01') + 10}>Bridge Michigan</Src></>)],
    [b('c1_02'), () => (<>{sh('Q', 'c1_02', 'c1_04')}<Kinetic f={f} at={b('c1_02', 'washington')} until={b('c1_03')} x={110} y={110} size={100}>BILL → WASHINGTON</Kinetic>
      {f >= b('c1_03') ? <Quote f={f} a={b('c1_03')} who="El-Sayed campaign, on job insurance">redundant and unnecessary</Quote> : null}<Src f={f} at={b('c1_02') + 10}>Bridge Michigan</Src></>)],
    [b('c1_04'), () => (<>{sh('P', 'c1_04', 'c1_07')}
      <Counter f={f} at={b('c1_04', 'thirty')} dur={40} to={34} prefix="$" suffix=" TRILLION" size={130} color={K.yellow} style={{position: 'absolute', left: 110, top: 90}} />
      <Kinetic f={f} at={b('c1_05', 'double')} x={110} y={260} size={110} color={K.red}>× 2 NOW?</Kinetic>
      <Kinetic f={f} at={b('c1_06', 'not')} x={110} y={420} size={140}>NOT ENOUGH.</Kinetic>
      <Src f={f} at={b('c1_04') + 10}>Urban Institute estimate · John Holahan via Bridge Michigan, Apr 29 2026</Src></>)],
    [b('c1_07'), () => (<Home f={f} a={b('c1_07')} dave={[[b('c1_07'), 'think_think']]} src="Bridge Michigan">
      <Card f={f} a={b('c1_07')}><Big size={90} color={K.yellow}>WHO PAYS?</Big><div style={{height: 30}} />
        <Line f={f} a={b('c1_07', 'rich')}>✔ “make the rich pay”</Line><Line f={f} a={b('c1_07', 'hopes')} i={0}>✔ avoid tax hikes on most families</Line><Line f={f} a={b('c1_07', 'hundred')} i={0} color={K.yellow}>(even around $100,000 a year)</Line></Card></Home>)],
    [b('c1_08'), () => (<Home f={f} a={b('c1_08')} dave={[[b('c1_08'), 'neutral_shrug']]} src="Committee for a Responsible Federal Budget (2019) via Bridge Michigan">
      <Card f={f} a={b('c1_08')}><Line f={f} a={b('c1_08')}>HOW TO PAY FOR IT?</Line><Line f={f} a={b('c1_08', 'did')} color={K.red}>NOT SPELLED OUT</Line><div style={{height: 20}} />
        <Line f={f} a={b('c1_08', 'budget')} color={K.yellow}>BUDGET WATCHDOG (2019):</Line><Line f={f} a={b('c1_08', 'middle')}>middle-class taxes would rise</Line></Card></Home>)],
    [b('c1_09'), () => (<Home f={f} a={b('c1_09')} dave={[[b('c1_09'), 'determined_present']]} src="Committee for a Responsible Federal Budget via Bridge Michigan">
      <Card f={f} a={b('c1_09')}><Line f={f} a={b('c1_09')} color={K.yellow}>BUT ALSO:</Line><Line f={f} a={b('c1_09', 'less')}>many families could pay LESS</Line><Line f={f} a={b('c1_09', 'premiums')}>in taxes than in premiums + copays</Line></Card></Home>)],
    [b('c1_10'), () => (<Home f={f} a={b('c1_10')} dave={[[b('c1_10'), 'think_think']]}><Scale f={f} a={b('c1_10')} /></Home>)],
    [b('c1_11'), () => (<Home f={f} a={b('c1_11')} dave={[[b('c1_11'), 'determined_present']]} src="Bridge Michigan">
      <Card f={f} a={b('c1_11')}><Big size={64} color={K.yellow}>BRIDGE MICHIGAN CHECKED IT</Big><div style={{height: 30}} />
        <Line f={f} a={b('c1_11', 'likely')}>“raise taxes” → LIKELY CORRECT</Line><Line f={f} a={b('c1_11', 'some')}>total cost could fall for some families</Line></Card></Home>)],
    [b('c1_12'), () => (<Home f={f} a={b('c1_12')} dave={[[b('c1_12'), 'smug_point_you']]}>
      <Card f={f} a={b('c1_12')} h={420}><Big size={80}>PLANS: 1</Big><Big size={80} color={K.red}>LAWS: 0</Big></Card>
      <Kinetic f={f} at={b('c1_12', 'hold')} x={150} y={700} size={90} color={K.yellow}>HOLD THAT THOUGHT</Kinetic></Home>)],
    // ── CHAPTER 2 — WEEK ONE: YOUR HOUSE
    [ch('c2_01'), () => <Chapter f={f} a={ch('c2_01')} title="WEEK 1" score="PROMISES 2 · LAWS PASSED 0" />],
    [b('c2_01'), () => (<>{sh('R', 'c2_01', 'c2_04')}
      <Kinetic f={f} at={b('c2_01', 'rent')} until={b('c2_02')} x={110} y={110} size={150} color={K.red}>THE RENT</Kinetic>
      {f >= b('c2_02') ? <div style={{position: 'absolute', left: 90, top: 90, width: 1000, background: 'rgba(10,10,14,.78)', padding: '30px 40px', borderRadius: 18}}>
        <Line f={f} a={b('c2_02', 'ban')}>BAN big corporations owning homes</Line><Line f={f} a={b('c2_02', 'computer')}>BAN rent-setting software</Line><Line f={f} a={b('c2_03', 'fee')} color={K.yellow}>FEE for Airbnb-type companies</Line></div> : null}
      <Src f={f} at={b('c2_01') + 10}>Newsweek, Aug 2026</Src></>)],
    [b('c2_04'), () => (<>{sh('B', 'c2_04', 'c2_06')}
      <Counter f={f} at={b('c2_04', 'two')} dur={20} to={2} suffix="%" size={180} color={K.yellow} style={{position: 'absolute', left: 110, top: 80}} />
      <Small color="#fff" size={40} style={{position: 'absolute', left: 120, top: 290, opacity: snap(f, b('c2_04', 'two') + 10, 6)}}>of the single-family market = corporate buyers (MSU expert)</Small>
      <Kinetic f={f} at={b('c2_05', 'one')} x={110} y={360} size={120}>1 OF 50</Kinetic>
      <Src f={f} at={b('c2_04') + 10}>Marty P. Jordan (Michigan State University) via Newsweek, Aug 2026</Src></>)],
    [b('c2_06'), () => (<Home f={f} a={b('c2_06')} dave={[[b('c2_06'), 'grin_cheer'], [b('c2_07'), 'neutral_shrug']]} src="21st Century ROAD to Housing Act · NPR, Mar 12 2026">
      <Card f={f} a={b('c2_06')}><Big size={60} color={K.yellow}>CONGRESS · BIPARTISAN HOUSING BILL</Big><div style={{height: 30}} />
        <Line f={f} a={b('c2_06', 'three')}>owns 350+ homes?</Line><Line f={f} a={b('c2_06', 'buying')} color={K.red}>→ can't buy more</Line>
        {f >= b('c2_07') ? <Line f={f} a={b('c2_07')} color={K.yellow}>FRIENDS ON BOTH SIDES?</Line> : null}</Card></Home>)],
    [b('c2_08'), () => <Tease f={f} a={b('c2_08')} text="MONTH 1: THE CHECKS" />],
    // ── CHAPTER 3 — MONTH ONE: WHO FIGHTS BACK
    [ch('c3_01'), () => <Chapter f={f} a={ch('c3_01')} title="MONTH 1" score="PROMISES 3 · LAWS PASSED 0" />],
    [b('c3_01'), () => (<Home f={f} a={b('c3_01')} dave={[[b('c3_01'), 'smug_point_you']]} src="NBC News, Oct 9 2026">
      <Counter f={f} at={b('c3_01')} dur={30} to={33000000} prefix="$" size={150} color={K.green ?? '#3ddc84'} style={{position: 'absolute', left: 140, top: 300}} />
      <ComicBurst f={f} at={b('c3_01', 'cute')} word="CUTE." x={520} y={640} /></Home>)],
    [b('c3_02'), () => (<>{sh('T', 'c3_02', 'c3_07')}
      <Counter f={f} at={b('c3_02', 'two')} dur={45} to={205} prefix="$" suffix=" MILLION+" size={110} color={K.yellow} style={{position: 'absolute', left: 90, top: 70}} />
      <Small color="#fff" size={34} style={{position: 'absolute', left: 100, top: 210, opacity: snap(f, b('c3_02', 'pace'), 6)}}>on pace for the most expensive election in Michigan history</Small>
      <Kinetic f={f} at={b('c3_03', 'fifty')} x={90} y={290} size={90} color={K.red}>GOP GROUPS: $59.3M</Kinetic>
      <Kinetic f={f} at={b('c3_04', 'sixty')} x={90} y={410} size={64}>+$65M ADS BOOKED · $42M FOR ROGERS</Kinetic>
      <Kinetic f={f} at={b('c3_05', 'nine')} x={90} y={510} size={64} color={K.yellow}>AIPAC SUPER PAC → UP TO $9M (REPORTED)</Kinetic>
      <Kinetic f={f} at={b('c3_06', 'twenty')} x={1150} y={300} size={100} color="#5aa0ff">HIS BACKERS: $23M</Kinetic>
      <Src f={f} at={b('c3_02') + 10}>{f < b('c3_05') ? 'Bridge Michigan (FEC records), Oct 2 2026' : f < b('c3_06') ? 'New York Times via Newsweek, Oct 21 2026' : 'Bridge Michigan (FEC records), Oct 2 2026'}</Src></>)],
    [b('c3_07'), () => (<Home f={f} a={b('c3_07')} dave={[[b('c3_07'), 'determined_present']]} src="WLOS / The National News Desk, Oct 16 2026">
      <Card f={f} a={b('c3_07')} h={380}><Big size={70}>ALEXANDRIA OCASIO-CORTEZ</Big><Counter f={f} at={b('c3_07', 'million')} dur={20} to={1000000} prefix="$" size={120} color={K.yellow} /></Card>
      <Kinetic f={f} at={b('c3_07', 'fox')} x={150} y={680} size={80} color={K.red}>👀 KEEP AN EYE ON FOX NEWS…</Kinetic></Home>)],
    [b('c3_08'), () => (<>{sh('V', 'c3_08', 'c4_01')}
      <Kinetic f={f} at={b('c3_08', 'majority')} x={110} y={90} size={90}>51 TO PASS</Kinetic>
      <Kinetic f={f} at={b('c3_08', 'sixty')} x={110} y={200} size={90} color={K.yellow}>60 TO BEAT A FILIBUSTER</Kinetic>
      <Kinetic f={f} at={b('c3_10', 'still')} x={110} y={330} size={130} color={K.red}>LAWS: STILL 0</Kinetic>
      <Src f={f} at={b('c3_08') + 10}>U.S. Senate Rule XXII · Straight Arrow News explainer</Src></>)],
    [b('c3_11'), () => <Tease f={f} a={b('c3_11')} text="NOW IT GETS PERSONAL" color={K.red} />],
    // ── CHAPTER 4 — THE ATTACKS (night, the ring)
    [ch('c4_01'), () => <Chapter f={f} a={ch('c4_01')} title="MONTH 2" score="THE ATTACKS" />],
    [b('c4_01'), () => (<>{sh('A', 'c4_01', 'c4_08')}
      {f >= b('c4_02') && f < b('c4_03') ? <><Kinetic f={f} at={b('c4_02', 'mohammed')} x={110} y={100} size={110} color={K.red}>“MOHAMMED”</Kinetic><Kinetic f={f} at={b('c4_02', 'no')} x={110} y={240} size={90} color={K.yellow}>BROTHERHOOD CLAIM: NO EVIDENCE</Kinetic><Src f={f} at={b('c4_02')}>Truth Social, Oct 8 2026 · Bridge Michigan fact check</Src></> : null}
      {f >= b('c4_03') && f < b('c4_04') ? <><Quote f={f} a={b('c4_03', 'quoting')} who="President Trump, Port Huron rally, Oct 25 2026">I'm here to keep a jihadist Muslim Brotherhood member from becoming a United States senator.</Quote><Src f={f} at={b('c4_03')}>AP, Oct 25 2026</Src></> : null}
      {f >= b('c4_04') && f < b('c4_05') ? <><Card f={f} a={b('c4_04')} h={380}><Line f={f} a={b('c4_04', 'loyal')}>EL-SAYED: LOYAL TO THE U.S.</Line><Line f={f} a={b('c4_04', 'disavowed')} color={K.yellow}>DISAVOWED THE MUSLIM BROTHERHOOD</Line></Card><Src f={f} at={b('c4_04')}>AP, Oct 25 2026</Src></> : null}
      {f >= b('c4_05') && f < b('c4_06') ? <><Quote f={f} a={b('c4_05', 'proud')} who="Abdul El-Sayed, debate vs. Mike Rogers">I'm proud of our Constitution that guarantees all of us the right to pray as we choose to pray.</Quote><Src f={f} at={b('c4_05')}>AP, Oct 25 2026</Src></> : null}
      {f >= b('c4_06') ? <><Quote f={f} a={b('c4_06', 'donald')} who="Abdul El-Sayed, before the rally">Donald, if you're watching, don't wuss out, man.</Quote><Src f={f} at={b('c4_06')}>AP, Oct 25 2026</Src></> : null}
      <Kinetic f={f} at={b('c4_07')} x={1150} y={760} size={90} color={K.yellow}>REAL QUOTE.</Kinetic></>)],
    [b('c4_08'), () => (<Home f={f} a={b('c4_08')} dave={[[b('c4_08'), 'think_think'], [b('c4_09'), 'grin_cheer']]} src="Mediaite">
      <Quote f={f} a={b('c4_08', 'quoting')} who="Abdul El-Sayed, on his CNN interviews">I get a non-consensual colonoscopy.</Quote></Home>)],
    [b('c4_10'), () => (<Home f={f} a={b('c4_10')} dave={[[b('c4_10'), 'neutral_shrug']]} src="Times of Israel · The Intercept · Jewish Insider">
      <Card f={f} a={b('c4_10')}><Big size={64} color={K.yellow}>WHAT HE HAS SAID ON GAZA</Big><div style={{height: 26}} />
        <Line f={f} a={b('c4_10', 'genocide')}>Israel's government committed genocide</Line><Line f={f} a={b('c4_10', 'unconditional')}>against unconditional military aid</Line></Card></Home>)],
    [b('c4_11'), () => (<Home f={f} a={b('c4_11')} dave={[[b('c4_11'), 'neutral_shrug']]}>
      <Card f={f} a={b('c4_11')} h={420}><div style={{display: 'flex', gap: 80}}><div><Small size={40}>CRITICS</Small><Big size={90} color={K.red}>“EXTREME”</Big></div><div style={{opacity: snap(f, b('c4_11', 'supporters'), 6)}}><Small size={40}>SUPPORTERS</Small><Big size={90} color="#5aa0ff">“HONEST”</Big></div></div></Card></Home>)],
    [b('c4_12'), () => (<Home f={f} a={b('c4_12')} dave={[[b('c4_12'), 'neutral_shrug']]}>
      <Card f={f} a={b('c4_12')} h={500}><Line f={f} a={b('c4_12', 'money')} color={K.red}>MONEY ✗</Line><Line f={f} a={b('c4_12', 'math')} color={K.red}>MATH ✗</Line><Line f={f} a={b('c4_12', 'half')} color={K.red}>HALF THE NEWS ✗</Line></Card></Home>)],
    [b('c4_13'), () => <Tease f={f} a={b('c4_13')} text="ONE JOB HE ALREADY DID" />],
    // ── CHAPTER 5 — WHAT HE ACTUALLY DID BEFORE (comeback)
    [ch('c5_01'), () => <Chapter f={f} a={ch('c5_01')} title="THE TEST" score="CAN HE RUN ANYTHING?" />],
    [b('c5_01'), () => (<Home f={f} a={b('c5_01')} dave={[[b('c5_01'), 'think_think'], [b('c5_02'), 'shock_panic']]} src="Washington Examiner">
      <Card f={f} a={b('c5_01')} h={420}><Small size={36}>WASHINGTON EXAMINER</Small><div style={{height: 16}} /><Big size={64}>Jesse Watters says “I actually like” Abdul el Sayed after interviewing him</Big></Card>
      <ComicBurst f={f} at={b('c5_02')} word="EVEN FOX." x={560} y={760} /></Home>)],
    [b('c5_03'), () => (<>{sh('D', 'c5_03', 'c5_07')}
      <Kinetic f={f} at={b('c5_03', '2015')} until={b('c5_04')} x={110} y={100} size={110} color={K.yellow}>DETROIT · 2015</Kinetic>
      <Kinetic f={f} at={b('c5_04', 'doubled')} until={b('c5_05')} x={110} y={100} size={110}>DEPARTMENT × 2</Kinetic>
      <Counter f={f} at={b('c5_05', 'ninety')} dur={30} to={94} suffix=" SCHOOLS TESTED" size={100} color="#5aa0ff" style={{position: 'absolute', left: 110, top: 220, opacity: f >= b('c5_05') ? 1 : 0}} />
      <Kinetic f={f} at={b('c5_05', 'nineteen')} x={110} y={360} size={90} color={K.red}>19 · TOO MUCH LEAD OR COPPER</Kinetic>
      <Src f={f} at={b('c5_03') + 10}>{f < b('c5_05') ? 'Bridge Michigan, Sep 25 2026 · Wikipedia' : 'Michigan Public, Aug 30 2016'}</Src></>)],
    [b('c5_07'), () => (<Home f={f} a={b('c5_07')} dave={[[b('c5_07'), 'think_think']]} src="Washington Free Beacon, Jul 29 2026">
      <Card f={f} a={b('c5_07')}><Line f={f} a={b('c5_07', 'campaign')}>CAMPAIGN: “removed the lead”</Line><Line f={f} a={b('c5_07', 'temporary')} color={K.red}>CHECK: fixes were temporary</Line><Line f={f} a={b('c5_07', 'honest')} color={K.yellow}>HONEST VERSION: his team FOUND it</Line></Card></Home>)],
    [b('c5_08'), () => (<Home f={f} a={b('c5_08')} dave={[[b('c5_08'), 'grin_cheer']]} src="Bridge Michigan, Sep 25 2026 (Vision to Learn)">
      <Counter f={f} at={b('c5_08', 'five')} dur={30} to={5000} suffix="+" size={190} color={K.yellow} style={{position: 'absolute', left: 140, top: 300}} />
      <Small color="#fff" size={50} style={{position: 'absolute', left: 150, top: 520}}>free glasses for Detroit school kids</Small></Home>)],
    [b('c5_09'), () => (<Home f={f} a={b('c5_09')} dave={[[b('c5_09'), 'determined_present']]} src="Wikipedia (S1)">
      <Card f={f} a={b('c5_09')} h={400}><Line f={f} a={b('c5_09', 'rhodes')}>RHODES SCHOLAR</Line><Line f={f} a={b('c5_09', 'columbia')} color={K.yellow}>MD · COLUMBIA</Line></Card></Home>)],
    [b('c5_10'), () => (<Home f={f} a={b('c5_10')} dave={[[b('c5_10'), 'smug_point_you']]} src="Abrams Press 2020 · Oxford University Press 2021">
      <Books f={f} a={b('c5_10', 'healing')} /></Home>)],
    [b('c5_11'), () => (<Home f={f} a={b('c5_11')} dave={[[b('c5_11'), 'grin_cheer'], [b('c5_12'), 'neutral_shrug']]} src="American Public Health Association">
      <Card f={f} a={b('c5_11')} h={360}><Small size={40}>PODCAST HOST</Small><Big size={110} color={K.yellow}>AMERICA DISSECTED</Big></Card>
      <ComicBurst f={f} at={b('c5_12', 'expired')} word="EXPIRED." x={560} y={720} /></Home>)],
    [b('c5_13'), () => (<Home f={f} a={b('c5_13')} dave={[[b('c5_13'), 'neutral_shrug']]} src="Bridge Michigan, Aug 2018 · Wikipedia">
      <Card f={f} a={b('c5_13')} h={420}><Line f={f} a={b('c5_13', '2017')}>2017: RAN FOR GOVERNOR</Line><Line f={f} a={b('c5_13', 'lost')} color={K.red}>2018: LOST THE PRIMARY TO GRETCHEN WHITMER</Line></Card></Home>)],
    [b('c5_14'), () => <Tease f={f} a={b('c5_14')} text="THE ANSWER FROM THE START" />],
    // ── CHAPTER 6 — SO WHAT CHANGES FOR YOU
    [ch('c6_01'), () => <Chapter f={f} a={ch('c6_01')} title="THE DEAL" score="3 CHANGES · 3 WALLS" />],
    [b('c6_01'), () => (<Home f={f} a={b('c6_01')} dave={[[b('c6_01'), 'determined_present']]}><Kinetic f={f} at={b('c6_01')} x={150} y={380} size={130} color={K.yellow}>HERE IS THE DEAL</Kinetic></Home>)],
    [b('c6_02'), () => (<>{sh('W', 'c6_02', 'c6_05')}
      {f < b('c6_03') ? <div style={{position: 'absolute', left: 90, top: 90, background: 'rgba(10,10,14,.78)', padding: '30px 40px', borderRadius: 18}}>
        <Line f={f} a={b('c6_02', 'health')}>1 · insurance from the government</Line><Line f={f} a={b('c6_02', 'taxes')}>2 · taxes AND premiums change</Line><Line f={f} a={b('c6_02', 'street')}>3 · big companies can't buy your street</Line></div> : null}
      <Kinetic f={f} at={b('c6_03', 'who')} until={b('c6_03', 'not')} x={110} y={110} size={110} color={K.yellow}>WHO FIGHTS HARDEST?</Kinetic>
      <Kinetic f={f} at={b('c6_03', 'not')} until={b('c6_04')} x={110} y={110} size={110}>NOT ONE PERSON →</Kinetic>
      <Kinetic f={f} at={b('c6_04', 'absolutely')} until={b('c6_04', 'nothing')} x={110} y={110} size={140} color={K.yellow}>ABSOLUTELY…</Kinetic>
      <Kinetic f={f} at={b('c6_04', 'nothing')} until={b('c6_04', 'pen')} x={110} y={110} size={110}>NOTHING (IN MONTH 1)</Kinetic>
      <Kinetic f={f} at={b('c6_04', 'pen')} x={110} y={110} size={90} color={K.yellow}>PRESIDENT = PEN · CONGRESS = PAPER</Kinetic>
      <Src f={f} at={b('c6_02') + 10}>Bridge Michigan · Newsweek · Senate Rule XXII</Src></>)],
    [b('c6_05'), () => (<Home f={f} a={b('c6_05')} dave={[[b('c6_05'), 'think_think'], [b('c6_06'), 'determined_present'], [b('c6_07'), 'determined_point_l']]} src="AP, Oct 25 2026">
      <Card f={f} a={b('c6_05')}><Line f={f} a={b('c6_05', 'republicans')}>GOP: no Michigan Senate win in 30+ years</Line><Line f={f} a={b('c6_05', 'rogers')}>vs MIKE ROGERS · former congressman</Line>
        {f >= b('c6_06') ? <Line f={f} a={b('c6_06', 'first')} color={K.yellow}>IF HE WINS: FIRST MUSLIM SENATOR</Line> : null}
        {f >= b('c6_07') ? <Line f={f} a={b('c6_07', 'november')} color={K.red}>NOVEMBER 3</Line> : null}</Card></Home>)],
    [b('c6_08'), () => (<Home f={f} a={b('c6_08')} dave={[[b('c6_08'), 'smug_point_you'], [b('c6_09'), 'grin_cheer']]}>
      {f < b('c6_09') ? <><Kinetic f={f} at={b('c6_08', 'keep')} x={140} y={300} size={110} color="#5aa0ff">KEEP IT?</Kinetic><Kinetic f={f} at={b('c6_08', 'throw')} x={140} y={440} size={110} color={K.red}>THROW IT OUT?</Kinetic><Kinetic f={f} at={b('c6_08', 'comments')} x={140} y={600} size={80} color={K.yellow}>↓ COMMENTS</Kinetic></>
        : <Kinetic f={f} at={b('c6_09')} x={140} y={380} size={120} color={K.yellow}>MONEY TALKS.</Kinetic>}</Home>)],
  ];
  let i = 0;
  while (i + 1 < S.length && f >= S[i + 1][0]) i++;
  return <AbsoluteFill style={{background: '#000'}}>{S[i][1]()}</AbsoluteFill>;
};

export const bodyMusic = (end: number): MSeg[] => {
  const b = (id: string) => at(id);
  return [
    {src: 'life_of_riley', from: b('c1_01') - GAP, to: b('c1_07') - 6},
    {src: 'thinking_music', from: b('c1_07'), to: b('c1_12') - 4},
    {src: 'monkeys_spinning_monkeys', from: b('c2_01') - GAP, to: b('c2_07') + 40},
    {src: 'scheming_weasel_faster', from: b('c3_01') - GAP, to: b('c3_06') - 4},
    {src: 'hiding_your_reality', from: b('c3_06') + 30, to: b('c3_10')},
    {src: 'darkest_child', from: b('c4_01') - GAP, to: b('c4_06') - 4},
    {src: 'comic_plodding', from: b('c4_06'), to: b('c4_10') - 6},
    {src: 'darkest_child', from: b('c4_10'), to: b('c4_12') + 60, off: 30 * 40},
    {src: 'pixel_peeker_polka_faster', from: b('c5_01') - GAP, to: b('c5_03') - 4},
    {src: 'life_of_riley', from: b('c5_03'), to: b('c5_13') - 4, off: 30 * 5},
    {src: 'unanswered_questions', from: b('c6_01') - GAP, to: b('c6_08') - 4},
    {src: 'monkeys_spinning_monkeys', from: b('c6_08'), to: end, off: 30 * 20},
  ];
};

export const bodyCues = (): Cue[] => {
  const ids = ['c1_', 'c2_', 'c3_', 'c4_', 'c5_', 'c6_'];
  const cues: Cue[] = [];
  const b = (id: string, w?: string) => at(id, w);
  ids.forEach((c) => cues.push({at: b(`${c}01`) - GAP, src: 'ea1/k_boom', v: 0.6}, {at: b(`${c}01`) - GAP + 4, src: 'ea1/gavel', v: 0.5}));
  // a whoosh / pop on every new card or line
  const all = ['c1_01', 'c1_02', 'c1_03', 'c1_04', 'c1_05', 'c1_06', 'c1_07', 'c1_08', 'c1_09', 'c1_10', 'c1_11', 'c1_12', 'c2_01', 'c2_02', 'c2_03', 'c2_04', 'c2_05', 'c2_06', 'c2_07', 'c3_01', 'c3_02', 'c3_03', 'c3_04', 'c3_05', 'c3_06', 'c3_07', 'c3_08', 'c3_09', 'c3_10', 'c4_01', 'c4_02', 'c4_03', 'c4_04', 'c4_05', 'c4_06', 'c4_07', 'c4_08', 'c4_09', 'c4_10', 'c4_11', 'c4_12', 'c5_01', 'c5_02', 'c5_03', 'c5_04', 'c5_05', 'c5_06', 'c5_07', 'c5_08', 'c5_09', 'c5_10', 'c5_11', 'c5_12', 'c5_13', 'c6_01', 'c6_02', 'c6_03', 'c6_04', 'c6_05', 'c6_06', 'c6_07', 'c6_08', 'c6_09'];
  all.forEach((id, i) => cues.push({at: b(id), src: i % 3 === 0 ? 'ea1/k_flash' : i % 3 === 1 ? 'ea1/reply_pop' : 'ea1/photo_slide', v: 0.45}));
  const extra: [string, string | undefined, string, number][] = [
    ['c1_01', 'medicare', 'ea1/k_slam', 0.5], ['c1_02', 'washington', 'ea1/chair_whoosh', 0.6], ['c1_04', 'thirty', 'ea1/roll33', 0.6], ['c1_05', 'double', 'ea1/k_boom', 0.6],
    ['c1_06', 'not', 'ea1/crickets', 0.6], ['c1_07', 'rich', 'ea1/check1', 0.5], ['c1_07', 'hopes', 'ea1/check2', 0.5], ['c1_08', 'middle', 'ea1/claim_buzz', 0.5],
    ['c1_10', undefined, 'ea1/deflate', 0.4], ['c1_11', 'likely', 'ea1/stamp_un', 0.5], ['c1_12', 'zero', 'ea1/fail', 0.5],
    ['c2_01', 'rent', 'ea1/notif', 0.5], ['c2_02', 'ban', 'ea1/stamp_un', 0.5], ['c2_02', 'computer', 'ea1/name_glitch', 0.5], ['c2_04', 'two', 'ea1/vote_tick', 0.6],
    ['c2_05', 'rude', 'ea1/crickets', 0.6], ['c2_06', 'three', 'ea1/gavel', 0.5], ['c3_01', 'cute', 'ea1/k_point', 0.6], ['c3_02', 'two', 'ea1/roll33', 0.6],
    ['c3_03', 'fifty', 'ea1/cash_rain', 0.5], ['c3_05', 'nine', 'ea1/k_slam', 0.5], ['c3_06', 'twenty', 'ea1/deflate', 0.5], ['c3_07', 'million', 'ea1/cash_rain', 0.5],
    ['c3_08', 'sixty', 'ea1/k_riser', 0.5], ['c3_10', 'still', 'ea1/fail', 0.6], ['c4_02', 'mohammed', 'ea1/name_glitch', 0.5], ['c4_02', 'no', 'ea1/no_evidence', 0.5],
    ['c4_03', 'quoting', 'ea1/k_boom', 0.6], ['c4_07', undefined, 'ea1/k_point', 0.5], ['c4_09', undefined, 'ea1/crickets', 0.5], ['c4_12', 'money', 'ea1/claim_buzz', 0.4],
    ['c4_12', 'math', 'ea1/claim_buzz', 0.4], ['c4_12', 'half', 'ea1/claim_buzz', 0.4], ['c5_02', undefined, 'ea1/k_boom', 0.6], ['c5_05', 'ninety', 'ea1/roll33', 0.6],
    ['c5_05', 'nineteen', 'ea1/claim_buzz', 0.5], ['c5_06', 'fridge', 'ea1/crickets', 0.5], ['c5_08', 'five', 'ea1/roll33', 0.6], ['c5_10', 'healing', 'ea1/co_book', 0.8],
    ['c5_12', 'expired', 'ea1/fail', 0.5], ['c5_13', 'lost', 'ea1/deflate', 0.5], ['c6_03', 'not', 'ea1/k_boom', 0.6], ['c6_03', 'sixty', 'ea1/k_slam', 0.6], ['c6_03', 'hundreds', 'ea1/k_slam', 0.6], ['c2_08', undefined, 'ea1/k_riser', 0.5], ['c3_11', undefined, 'ea1/heart', 0.6], ['c4_13', undefined, 'ea1/k_riser', 0.5], ['c5_14', undefined, 'ea1/end_riser', 0.5],
    ['c6_03', 'country', 'ea1/k_slam', 0.6], ['c6_04', 'nothing', 'ea1/crickets', 0.6], ['c6_06', 'first', 'ea1/check1', 0.5], ['c6_07', 'november', 'ea1/k_riser', 0.5],
  ];
  extra.forEach(([id, w, src, v]) => cues.push({at: b(id, w), src, v}));
  return cues;
};
