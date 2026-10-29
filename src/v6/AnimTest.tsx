import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import {ComicBurst, HomeBase} from './kit';
import {FlyStack, SelfDrawGraph, Shake, ThumbCard, WipePanel} from './kit2';

// AnimTest (29 Oct 2026): the animated Blender shots (public/anim/shot_<X>.mp4, 24 fps, from blender/anim.py) cut
// together at 30 fps with the kit2 living graphics and dense SFX — the full look+sound check before a real episode.
// A money yard 0–2.5 s · kit2 wipe panels + flying cards 2.5–4.5 s · B graph ride 4.5–8 s · C alley 8–12 s · D army 12–15 s
const S = (sec: number) => Math.round(sec * 30);
export const ANIMTEST_FRAMES = S(15);

const Shot: React.FC<{name: string}> = ({name}) => <OffthreadVideo src={staticFile(`anim/shot_${name}.mp4`)} muted style={{width: 1920, height: 1080}} />;

export const AnimTest: React.FC = () => {
  const f = useCurrentFrame();
  const cues: Cue[] = [
    {at: 0, src: 'thump_low', v: 0.7},
    {at: S(0.3), src: 'riser_up', v: 0.3},
    {at: S(1.5), src: 'swish_fast', v: 0.6},
    {at: S(1.6), src: 'boom', v: 0.7},
    {at: S(1.65), src: 'thud', v: 0.6},
    {at: S(2.5), src: 'swish', v: 0.6},
    {at: S(2.55), src: 'slide', v: 0.5},
    {at: S(2.9), src: 'swish', v: 0.5},
    ...[0, 1, 2, 3, 4].map((i) => ({at: S(3.2) + i * 6, src: 'pop_hi', v: 0.4})),
    {at: S(4.5), src: 'thump_low', v: 0.6},
    {at: S(4.6), src: 'count_roll', v: 0.5},
    {at: S(7.3), src: 'ding', v: 0.45},
    {at: S(8), src: 'swish', v: 0.5},
    ...[0, 1, 2, 3].map((i) => ({at: S(8.2) + i * 15, src: 'step', v: 0.4})),
    {at: S(10), src: 'riser_up', v: 0.3},
    {at: S(10.7), src: 'sting', v: 0.5},
    {at: S(11.2), src: 'snap_white', v: 0.5},
    {at: S(11.25), src: 'boing', v: 0.35},
    {at: S(12), src: 'thump_low', v: 0.6},
    {at: S(12), src: 'drumroll', v: 0.35},
    {at: S(12.4), src: 'crowd', v: 0.2},
  ];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Sequence from={0} durationInFrames={S(2.5)}>
        <Shake f={f} at={S(1.6)}>
          <Shot name="A" />
        </Shake>
        <ComicBurst f={f} at={S(1.6)} word="POW!" x={1350} y={300} />
      </Sequence>
      <Sequence from={S(2.5)} durationInFrames={S(2)} layout="none">
        <AbsoluteFill>
          <HomeBase f={f} />
          <WipePanel f={f} at={S(2.5)} from="left" color="#3B1C8C">
            <div style={{fontFamily: 'Anton', fontSize: 150, color: '#fff'}}>THE BANK</div>
          </WipePanel>
          <WipePanel f={f} at={S(2.9)} from="right" color="#5FC83A">
            <div style={{fontFamily: 'Anton', fontSize: 150, color: '#fff'}}>YOU</div>
          </WipePanel>
          <FlyStack f={f} at={S(3.2)} x={180} y={620} from="below" cards={[0, 1, 2, 3, 4].map((i) => <ThumbCard key={i} hue={i * 50} title={['Fees', 'Interest', 'Overdraft', 'Late fee', 'ATM fee'][i]} />)} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={S(4.5)} durationInFrames={S(3.5)}>
        <Shot name="B" />
        <SelfDrawGraph f={f} at={S(4.5)} dur={S(2.8)} points={[0.1, 0.25, 0.2, 0.45, 0.38, 0.62, 0.55, 0.8, 0.72, 0.98]} x={1300} y={90} w={520} h={300} label="+900%" />
      </Sequence>
      <Sequence from={S(8)} durationInFrames={S(4)}>
        <Shot name="C" />
      </Sequence>
      <Sequence from={S(12)} durationInFrames={S(3)}>
        <Shot name="D" />
      </Sequence>
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
