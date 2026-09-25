import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {TimingProvider, Timings} from './timing';
import {Ep001} from './episodes/Ep001';
import {Ep01} from './episodes/Ep01';
import {Ep02} from './episodes/Ep02';
import {Ep03} from './episodes/Ep03';
import {C} from './theme';

export type EpisodeProps = {ep: string; timings: Timings | null};

const EPISODES: Record<string, React.FC> = {ep001: Ep001, ep01: Ep01, ep02: Ep02, ep03: Ep03};

export const Episode: React.FC<EpisodeProps> = ({ep, timings}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  if (!timings) return null;
  const Body = EPISODES[ep];
  const music = (x: number) => interpolate(x, [0, 30, d - 45, d], [0, 0.075, 0.075, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fadeOut = interpolate(f, [d - 18, d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TimingProvider t={timings}>
      <AbsoluteFill style={{background: C.bg, overflow: 'hidden'}}>
        <Body />
        <AbsoluteFill style={{background: C.bg, opacity: fadeOut}} />
        <Audio src={staticFile(`${ep}/voice.wav`)} />
        <Audio src={staticFile('music/bgm.mp3')} volume={music} loop />
      </AbsoluteFill>
    </TimingProvider>
  );
};
