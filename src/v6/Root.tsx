import React from 'react';
import {Composition, staticFile} from 'remotion';
import {V6Demo, V6_DEMO_FRAMES} from './Demo';
import {V6Episode, V6EpisodeProps, V6_TAIL} from './V6Episode';

export const V6Root: React.FC = () => (
  <>
    <Composition id="V6Demo" component={V6Demo} width={1920} height={1080} fps={30} durationInFrames={V6_DEMO_FRAMES} />
    {/* Any v6 episode: public/<ep>/script.json + timings.json (+ optional photos/<ep>/<id>.jpg). npx remotion render src/v6/index.ts V6Episode --props='{"ep":"ep82"}' */}
    <Composition
      id="V6Episode"
      component={V6Episode}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={300}
      defaultProps={{ep: 'ep82', timings: null, script: null, plates: {}} as V6EpisodeProps}
      calculateMetadata={async ({props}) => {
        const [timings, script] = await Promise.all([fetch(staticFile(`${props.ep}/timings.json`)).then((r) => r.json()), fetch(staticFile(`${props.ep}/script.json`)).then((r) => r.json())]);
        const plates: Record<string, boolean> = {};
        await Promise.all(
          (script.beats as any[])
            .filter((b) => b.plate)
            .map(async (b) => {
              try {
                const r = await fetch(staticFile(`photos/${props.ep}/${b.plate.id}.jpg`), {method: 'HEAD'});
                plates[b.plate.id] = r.ok;
              } catch {
                plates[b.plate.id] = false;
              }
            }),
        );
        return {durationInFrames: Math.ceil((timings.total + V6_TAIL) * 30), props: {...props, timings, script, plates}};
      }}
    />
  </>
);
