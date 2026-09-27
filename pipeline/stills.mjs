import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

// usage: node pipeline/stills.mjs <outDir> '[{"id":"ThumbV2","ep":"ep01","v":"A"}, ...]'
const [out, list] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const items = JSON.parse(list.startsWith('@') ? fs.readFileSync(list.slice(1), 'utf8') : list);
for (const {id, frame, ...props} of items) {
  const composition = await selectComposition({serveUrl, id, inputProps: props});
  const name = [id, ...Object.values(props), ...(frame !== undefined ? [String(frame).padStart(5, '0')] : [])].join('_') + '.png';
  await renderStill({serveUrl, composition, inputProps: composition.props, frame: frame ?? 0, output: path.join(out, name)});
  console.log('ok', name);
}
