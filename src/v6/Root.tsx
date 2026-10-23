import React from 'react';
import {Composition} from 'remotion';
import {V6Demo, V6_DEMO_FRAMES} from './Demo';

export const V6Root: React.FC = () => <Composition id="V6Demo" component={V6Demo} width={1920} height={1080} fps={30} durationInFrames={V6_DEMO_FRAMES} />;
