import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import {Bedroom, Blob} from './sets';
import {ChapterCard, ComicBurst, Counter, DaveT, HomeBase, K, NumCard, ReportCard, ShockLines, Smear, Stage, Threshold, UI, UICard, WhiteFlash, lin} from './kit';

// V6Demo: 16 s proof of the v6 grammar (STYLE_3D.md), shot list modelled on the reference's first minute.
// A 0–75   home base: UI card snaps in, push-in to the views, counter rolls; 3D Dave swaps poses with white flashes
// B 75–135 1-frame B&W threshold → smear → comic burst "500 MILLION" + Dave close-up, angry, shaking
// C 135–255 3D bedroom at night, Dave on the bed; lights SNAP on at 190 + boiling shock lines
// D 255–330 big number cards: RPM → TOTAL MADE (white flash between)
// E 330–390 chapter card
// F 390–480 week report card
export const V6_DEMO_FRAMES = 480;

const Thumb: React.FC = () => (
  <div style={{position: 'absolute', inset: 0}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '62%', background: 'linear-gradient(160deg,#0e3b2e 0%,#1f7a55 45%,#d5b65a 100%)'}}>
      <div style={{position: 'absolute', left: '8%', bottom: '10%', width: '34%', height: '46%', background: '#3a2a1e', borderRadius: 8, boxShadow: 'inset 0 -20px 0 #2a1d14'}} />
      <div style={{position: 'absolute', left: '20%', bottom: '34%', width: '10%', height: '12%', background: '#ffcf6a', borderRadius: 4, boxShadow: '0 0 40px #ffb23a'}} />
    </div>
    <div style={{position: 'absolute', left: 36, top: '66%', right: 36, fontFamily: UI, fontWeight: 700, fontSize: 44, color: '#fff', lineHeight: 1.15}}>10 Hours of Rain on a Cozy Cabin Roof</div>
    <div style={{position: 'absolute', left: 36, bottom: 30, fontFamily: UI, fontSize: 32, color: K.grey}}>Sleep Sounds · 10 years ago</div>
  </div>
);

export const V6Demo: React.FC = () => {
  const f = useCurrentFrame();
  const cues: Cue[] = [
    {at: 0, src: 'whoosh', v: 0.5},
    {at: 4, src: 'pop', v: 0.25},
    {at: 40, src: 'whoosh', v: 0.35},
    {at: 44, src: 'pop', v: 0.25},
    {at: 60, src: 'stamp', v: 0.5},
    {at: 62, src: 'pop', v: 0.25},
    {at: 75, src: 'boom', v: 0.6},
    {at: 135, src: 'whoosh', v: 0.4},
    {at: 190, src: 'sting', v: 0.5},
    {at: 255, src: 'whoosh', v: 0.4},
    {at: 276, src: 'stamp', v: 0.45},
    {at: 295, src: 'cash', v: 0.5},
    {at: 330, src: 'whoosh', v: 0.55},
    {at: 398, src: 'tick', v: 0.4},
    {at: 407, src: 'tick', v: 0.4},
    {at: 416, src: 'tick', v: 0.4},
    {at: 435, src: 'thud', v: 0.6},
  ];
  let shot: React.ReactNode = null;

  if (f < 75) {
    shot = (
      <AbsoluteFill>
        <HomeBase f={f} />
        <UICard f={f} at={0} x={150} y={170} w={1050} h={640} push={40} px={0.18} py={0.95} zoom={1.45}>
          <Thumb />
          {f >= 40 ? (
            <div style={{position: 'absolute', right: 40, bottom: 24, background: K.bg, padding: '4px 18px', borderRadius: 12}}>
              <Counter f={f} at={40} dur={20} to={530000000} size={64} suffix=" views" color={K.white} />
            </div>
          ) : null}
        </UICard>
        <Stage cam={[0, 1.9, 11]} look={[0, 1.6, 0]}>
          <DaveT f={f} position={[2.55, -0.4, 0]} scale={1.05} keys={[{at: 2, pose: 'point_l', face: 'talk'}, {at: 26, face: 'grin'}, {at: 44, pose: 'present_l', face: 'shock'}, {at: 62, pose: 'thumbs', face: 'smug'}]} />
        </Stage>
      </AbsoluteFill>
    );
  } else if (f < 135) {
    shot = (
      <Threshold f={f} at={75}>
        <Smear f={f} at={76} n={2}>
          <AbsoluteFill>
            <HomeBase f={f} />
            <Stage cam={[0.9, 2.55, 5.2]} look={[0.9, 2.45, 0]} fov={34}>
              <DaveT f={f} position={[1.7, 0, 0]} rotation={[0, -0.35, 0]} shake={f < 100 ? 0.03 : 0} keys={[{at: 75, pose: 'point_l', face: 'angry'}, {at: 112, face: 'x_eyes'}]} />
            </Stage>
            <ComicBurst f={f} at={78} top="500" word="MILLION" x={620} y={560} />
          </AbsoluteFill>
        </Smear>
      </Threshold>
    );
  } else if (f < 255) {
    const lit = f >= 190;
    const push = lin(f, 135, 255);
    shot = (
      <AbsoluteFill style={{background: '#000'}}>
        <Stage cam={[2.6 - push * 0.4, 2.6, 8.6 - push * 0.6]} look={[0.2, 1.4, -1.2]} fov={40} lights={lit ? 'warm' : 'night'}>
          <Bedroom tvOn />
          <Blob p={[0.8, 0.48, -0.9]} r={0.7} o={0.25} />
          <DaveT f={f} position={[0.8, -0.05, -0.75]} rotation={[0, -0.25, 0]} keys={[{at: 135, pose: 'sit', face: 'sleep'}, {at: 190, pose: 'panic', face: 'shock'}, {at: 222, pose: 'facepalm', face: 'sad'}]} shake={f >= 190 && f < 210 ? 0.025 : 0} />
        </Stage>
        <ShockLines f={f} at={190} x={1010} y={300} r={150} />
        <WhiteFlash f={f} at={190} n={1} />
      </AbsoluteFill>
    );
  } else if (f < 330) {
    const second = f >= 295;
    shot = (
      <AbsoluteFill>
        <HomeBase f={f} />
        {!second ? <NumCard f={f} at={257} label="RPM" to={0.98} dec={2} prefix="$" color={K.yellow} sub="(money per 1,000 views)" /> : <NumCard f={f} at={295} label="TOTAL MADE" to={783896} prefix="$" color={K.green} sub="(over 10 years)" />}
        <Stage>
          <DaveT f={f} position={[2.8, -0.4, 0]} keys={[{at: 255, pose: 'point_l', face: 'think'}, {at: 295, pose: 'celebrate', face: 'money'}]} />
        </Stage>
        <WhiteFlash f={f} at={295} n={2} />
      </AbsoluteFill>
    );
  } else if (f < 390) {
    shot = <ChapterCard f={f} at={330} title="MAKING VIDEOS" kicker="DAY 1" sub="Dave makes the stupid long things" />;
  } else {
    shot = <ReportCard f={f} at={390} title="Week 1" rows={[['Views', '152', '👁'], ['Subscribers', '3', '👤'], ['Revenue', '$0.14', '💲']]} grade="C-" gradeColor="#FFB000" />;
  }

  return (
    <AbsoluteFill style={{background: K.bg}}>
      {shot}
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
