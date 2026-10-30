import React from 'react';
import {Composition} from 'remotion';
import {V6Demo, V6_DEMO_FRAMES} from './Demo';
import {TaxShot, TAX_FRAMES} from './Classroom';
import {Test1, TEST1_FRAMES} from './Test1';
import {AnimTest, ANIMTEST_FRAMES} from './AnimTest';
import {Ea1, EA1_FRAMES} from './Ea1';

export const V6Root: React.FC = () => (
  <>
    <Composition id="V6Demo" component={V6Demo} width={1920} height={1080} fps={30} durationInFrames={V6_DEMO_FRAMES} />
    <Composition id="TaxShot" component={TaxShot} width={1920} height={1080} fps={30} durationInFrames={TAX_FRAMES} />
    <Composition id="Test1" component={Test1} width={1920} height={1080} fps={30} durationInFrames={TEST1_FRAMES} />
    <Composition id="AnimTest" component={AnimTest} width={1920} height={1080} fps={30} durationInFrames={ANIMTEST_FRAMES} />
    <Composition id="Ea1" component={Ea1} width={1920} height={1080} fps={30} durationInFrames={EA1_FRAMES} />
  </>
);
