import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from './theme';
import {Board, Svg} from './fx';
import {Stick} from './Stick';
import {Text} from './props';
import {Halo, Pic, PicBg, Slam} from './photo';

// Living reference for the mixed-media kit (PLAYBOOK §0.10 C). v=0: every Pic look on the Board. v=1: Dave in a real place (PicBg).
export type PicDemoProps = {v: number};
export const PicDemo: React.FC<PicDemoProps> = ({v}) => {
  const f = useCurrentFrame() + 60;
  if (v === 1) {
    return (
      <AbsoluteFill>
        <PicBg f={f} src="demo/store.jpg" dim={0.22} />
        <Pic f={f} src="demo/person.jpg" x={1380} y={430} w={420} h={520} look="polaroid" rot={5} label="a real person" pos="50% 20%" ring />
        <Halo>
          <Svg>
            <Stick f={f} x={520} y={960} s={1.3} acc={['hair']} seed={7} keys={[{at: 0, pose: 'point_r', expr: 'shock', look: 0.8}]} />
          </Svg>
        </Halo>
        <Slam f={f} at={40} text="$9.99" x={620} y={230} size={220} color={C.yellow} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <Board />
      <Pic f={f} src="demo/store.jpg" x={330} y={300} w={460} h={300} look="polaroid" rot={-4} label="polaroid" />
      <Pic f={f} src="demo/store.jpg" x={960} y={300} w={460} h={300} look="sticker" rot={3} label="sticker" />
      <Pic f={f} src="demo/store.jpg" x={1590} y={300} w={460} h={300} look="tape" rot={-2} label="tape" />
      <Pic f={f} src="demo/store.jpg" x={330} y={760} w={460} h={300} look="news" label="NEWS BANNER" />
      <Pic f={f} src="demo/person.jpg" x={880} y={760} w={300} h={300} look="circle" label="circle" pos="50% 20%" />
      <Pic f={f} src="demo/store.jpg" x={1310} y={760} w={380} h={280} look="plain" label="plain" gray />
      <Pic f={f} src="demo/person.jpg" x={1700} y={760} w={280} h={340} look="cutout" label="cutout (png)" />
      <Svg>
        <Text x={960} y={70} size={48}>src/photo.tsx looks</Text>
      </Svg>
    </AbsoluteFill>
  );
};
