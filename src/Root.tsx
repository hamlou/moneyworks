import React from 'react';
import {Composition, staticFile} from 'remotion';
import {Episode, EpisodeProps} from './Episode';
import {TAIL_SEC} from './timing';
import {Thumb, ThumbProps, EP_THUMBS} from './Thumb';
import {Ep02Thumb} from './thumbs/ep02';
import {Ep03Thumb} from './thumbs/ep03';
import {Ep04Thumb} from './thumbs/ep04';
import {Ep05Thumb} from './thumbs/ep05';
import {Ep06Thumb} from './thumbs/ep06';

EP_THUMBS.ep02 = Ep02Thumb;
EP_THUMBS.ep03 = Ep03Thumb;
EP_THUMBS.ep04 = Ep04Thumb;
EP_THUMBS.ep05 = Ep05Thumb;
EP_THUMBS.ep06 = Ep06Thumb;

export const Root: React.FC = () => (
  <>
  <Composition id="Thumb" component={Thumb} width={1280} height={720} fps={30} durationInFrames={1} defaultProps={{v: 'A'} as ThumbProps} />
  <Composition
    id="Episode"
    component={Episode}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={300}
    defaultProps={{ep: 'ep001', timings: null} as EpisodeProps}
    calculateMetadata={async ({props}) => {
      const r = await fetch(staticFile(`${props.ep}/timings.json`));
      const timings = await r.json();
      return {
        durationInFrames: Math.ceil((timings.total + TAIL_SEC) * 30),
        props: {...props, timings},
      };
    }}
  />
  </>
);
