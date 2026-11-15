import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
// usage: node pipeline/docstills.mjs <outDir> <compositionId> <frame,frame,...>   (preview frames, half size)
const [out, id, frames] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/v6/index.ts')});
const composition = await selectComposition({serveUrl, id});
for (const f of frames.split(',')) {
  await renderStill({serveUrl, composition, frame: +f, output: path.join(out, `${id}_${String(f).padStart(5, '0')}.jpg`), imageFormat: 'jpeg', jpegQuality: 86, scale: 0.5});
  console.log('ok', f);
}
try { fs.rmSync(serveUrl, {recursive: true, force: true}); } catch {}
