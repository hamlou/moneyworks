import React from 'react';
import {Composition} from 'remotion';
import {V6Demo, V6_DEMO_FRAMES} from './Demo';
import {TaxShot, TAX_FRAMES} from './Classroom';
import {Test1, TEST1_FRAMES} from './Test1';
import {AnimTest, ANIMTEST_FRAMES} from './AnimTest';
import {Ea1, EA1_FRAMES} from './Ea1';
import {Ea1Full, EA1_FULL_FRAMES, Montage, MONT_FRAMES} from './Ea1Cold';
import {autoComponent, Plan} from './Auto';
import {AUTO_PLANS} from './autoEps';

// AUTOPILOT episodes (tools/auto.py): one composition per plan, id Auto-<ep>
const AUTO = (AUTO_PLANS as unknown as Plan[]).map((p) => ({p, C: autoComponent(p)}));

export const V6Root: React.FC = () => (
  <>
    <Composition id="V6Demo" component={V6Demo} width={1920} height={1080} fps={30} durationInFrames={V6_DEMO_FRAMES} />
    <Composition id="TaxShot" component={TaxShot} width={1920} height={1080} fps={30} durationInFrames={TAX_FRAMES} />
    <Composition id="Test1" component={Test1} width={1920} height={1080} fps={30} durationInFrames={TEST1_FRAMES} />
    <Composition id="AnimTest" component={AnimTest} width={1920} height={1080} fps={30} durationInFrames={ANIMTEST_FRAMES} />
    <Composition id="Ea1" component={Ea1} width={1920} height={1080} fps={30} durationInFrames={EA1_FRAMES} />
    <Composition id="Ea1Montage" component={Montage} width={1920} height={1080} fps={30} durationInFrames={MONT_FRAMES} />
    {AUTO.map(({p, C}) => (
      <Composition key={p.id} id={`Auto-${p.id}`} component={C} width={1920} height={1080} fps={30} durationInFrames={p.frames} />
    ))}
    <Composition id="Ea1Full" component={Ea1Full} width={1920} height={1080} fps={30} durationInFrames={EA1_FULL_FRAMES} />
  </>
);
