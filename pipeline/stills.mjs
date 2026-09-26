import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

// usage: node pipeline/stills.mjs <outDir> '[{"id":"ThumbV2","ep":"ep01","v":"A"}, ...]'
const [out, list] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const {id, ...props} of JSON.parse(list)) {
  const composition = await selectComposition({serveUrl, id, inputProps: props});
  const name = [id, ...Object.values(props)].join('_') + '.png';
  await renderStill({serveUrl, composition, inputProps: props, output: path.join(out, name)});
  console.log('ok', name);
}
