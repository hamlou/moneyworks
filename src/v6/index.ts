import {registerRoot} from 'remotion';
import {V6Root} from './Root';

// separate entry so the v6 kit can be rendered/tested without touching src/Root.tsx:
// npx remotion render src/v6/index.ts V6Demo out/v6demo.mp4 --gl=swangle
registerRoot(V6Root);
