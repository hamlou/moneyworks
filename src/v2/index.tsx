import React from 'react';
import {AbsoluteFill} from 'remotion';
import {V2Ep01} from './ep01';
import {V2Ep11, V2Ep12} from './s2';
import {V2Ep02, V2Ep03, V2Ep04, V2Ep05, V2Ep06, V2Ep07, V2Ep08, V2Ep09, V2Ep10} from './eps';

export const V2_THUMBS: Record<string, React.FC<{v: 'A' | 'B' | 'C'}>> = {
  ep01: V2Ep01,
  ep02: V2Ep02,
  ep03: V2Ep03,
  ep04: V2Ep04,
  ep05: V2Ep05,
  ep06: V2Ep06,
  ep07: V2Ep07,
  ep08: V2Ep08,
  ep09: V2Ep09,
  ep10: V2Ep10,
  ep11: V2Ep11,
  ep12: V2Ep12,
};

export type ThumbV2Props = {ep: string; v: 'A' | 'B' | 'C'};

export const ThumbV2: React.FC<ThumbV2Props> = ({ep, v}) => {
  const T = V2_THUMBS[ep];
  return T ? <T v={v} /> : <AbsoluteFill style={{background: '#000'}} />;
};
