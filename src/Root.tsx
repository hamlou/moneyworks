import React from 'react';
import {Composition, staticFile} from 'remotion';
import {Episode, EpisodeProps} from './Episode';
import {TAIL_SEC} from './timing';
import {Thumb, ThumbProps, EP_THUMBS} from './Thumb';
import {Avatar, AvatarProps} from './Avatar';
import {ThumbV2, ThumbV2Props} from './v2';
import {AvatarV2, AvatarV2Props, Banner, BannerGuide} from './v2/channel';
import {Ep02Thumb} from './thumbs/ep02';
import {Ep03Thumb} from './thumbs/ep03';
import {Ep04Thumb} from './thumbs/ep04';
import {Ep05Thumb} from './thumbs/ep05';
import {Ep06Thumb} from './thumbs/ep06';
import {Ep07Thumb} from './thumbs/ep07';
import {Ep08Thumb} from './thumbs/ep08';
import {Ep09Thumb} from './thumbs/ep09';
import {Ep10Thumb} from './thumbs/ep10';
import {Short60, Short60Props} from './shorts/Short60';
import {Short57, Short57Props} from './shorts/Short57';
import {Short56, Short56Props} from './shorts/Short56';
import {Short58, Short58Props} from './shorts/Short58';
import {PicDemo, PicDemoProps} from './PicDemo';

EP_THUMBS.ep02 = Ep02Thumb;
EP_THUMBS.ep03 = Ep03Thumb;
EP_THUMBS.ep04 = Ep04Thumb;
EP_THUMBS.ep05 = Ep05Thumb;
EP_THUMBS.ep06 = Ep06Thumb;
EP_THUMBS.ep07 = Ep07Thumb;
EP_THUMBS.ep08 = Ep08Thumb;
EP_THUMBS.ep09 = Ep09Thumb;
EP_THUMBS.ep10 = Ep10Thumb;

export const Root: React.FC = () => (
  <>
  <Composition id="PicDemo" component={PicDemo} width={1920} height={1080} fps={30} durationInFrames={90} defaultProps={{v: 0} as PicDemoProps} />
  <Composition id="Avatar" component={Avatar} width={800} height={800} fps={30} durationInFrames={1} defaultProps={{v: 'A'} as AvatarProps} />
  <Composition id="AvatarV2" component={AvatarV2} width={800} height={800} fps={30} durationInFrames={1} defaultProps={{v: 'A'} as AvatarV2Props} />
  <Composition id="Banner" component={Banner} width={2560} height={1440} fps={30} durationInFrames={1} />
  <Composition id="BannerGuide" component={BannerGuide} width={2560} height={1440} fps={30} durationInFrames={1} />
  <Composition id="ThumbV2" component={ThumbV2} width={1280} height={720} fps={30} durationInFrames={1} defaultProps={{ep: 'ep01', v: 'A'} as ThumbV2Props} />
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
  <Composition
    id="Short56"
    component={Short56}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    defaultProps={{timings: null} as Short56Props}
    calculateMetadata={async ({props}) => {
      const r = await fetch(staticFile('short56/timings.json'));
      const timings = await r.json();
      return {
        durationInFrames: Math.ceil((timings.total + 1.2) * 30),
        props: {...props, timings},
      };
    }}
  />
  <Composition
    id="Short58"
    component={Short58}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    defaultProps={{timings: null} as Short58Props}
    calculateMetadata={async ({props}) => {
      const r = await fetch(staticFile('short58/timings.json'));
      const timings = await r.json();
      return {
        durationInFrames: Math.ceil((timings.total + 1.2) * 30),
        props: {...props, timings},
      };
    }}
  />
  <Composition
    id="Short60"
    component={Short60}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    defaultProps={{timings: null} as Short60Props}
    calculateMetadata={async ({props}) => {
      const r = await fetch(staticFile('short60/timings.json'));
      const timings = await r.json();
      return {
        durationInFrames: Math.ceil((timings.total + 1.2) * 30),
        props: {...props, timings},
      };
    }}
  />
  <Composition
    id="Short57"
    component={Short57}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    defaultProps={{timings: null} as Short57Props}
    calculateMetadata={async ({props}) => {
      const r = await fetch(staticFile('short57/timings.json'));
      const timings = await r.json();
      return {
        durationInFrames: Math.ceil((timings.total + 1.2) * 30),
        props: {...props, timings},
      };
    }}
  />
  </>
);
