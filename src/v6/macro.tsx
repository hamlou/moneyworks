import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// The owner-approved "macro text highlight" look (cold-open montage v5) as a reusable evidence shot for the body:
// extreme close-up of printed text shot straight on, the key phrase already highlighted mid-frame, lines above/below out
// of focus, paper grain. RULE: the sharp line must be VERBATIM from a source; blurred lines are other verbatim lines.
export const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.33 0 0 0 0 0.3 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const S = 150;
const Plain: React.FC<{text: string; blur: number}> = ({text, blur}) => (
  <div style={{width: 3400, textAlign: 'center', whiteSpace: 'nowrap', fontSize: S, lineHeight: 1.3, color: '#1d1b18', filter: `blur(${blur}px)`}}>{text}</div>
);
const Mid: React.FC<{text: string}> = ({text}) => {
  const [a, mark, b] = text.split(/\[|\]/);
  const side: React.CSSProperties = {flex: 1, whiteSpace: 'nowrap', overflow: 'hidden'};
  return (
    <div style={{display: 'flex', width: 3400, fontSize: S, lineHeight: 1.3, color: '#1d1b18', textShadow: '0 0 1.4px rgba(20,18,15,.75)'}}>
      <div style={{...side, textAlign: 'right'}}>{a}</div>
      <div style={{whiteSpace: 'nowrap', fontWeight: 700, padding: '0 10px', margin: '0 0.28em', background: '#f5c400'}}>{mark}</div>
      <div style={{...side, textAlign: 'left'}}>{b ?? ''}</div>
    </div>
  );
};
// lines: [above, 'before [HIGHLIGHT] after', below]; far = two more verbatim lines for the outer blur
export const MacroText: React.FC<{lines: string[]; far?: string[]}> = ({lines, far = ['', '']}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#e9e4d8', overflow: 'hidden'}}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, "DejaVu Serif", serif', transform: `scale(${1.0 + 0.004 * f})`}}>
        <Plain text={far[0]} blur={12} />
        <Plain text={lines[0]} blur={7} />
        <Mid text={lines[1]} />
        <Plain text={lines[2]} blur={7.5} />
        <Plain text={far[1]} blur={13} />
      </AbsoluteFill>
      <AbsoluteFill style={{backgroundImage: GRAIN, mixBlendMode: 'multiply', opacity: 0.5}} />
      <AbsoluteFill style={{boxShadow: 'inset 0 0 260px rgba(60,50,35,.5)'}} />
    </AbsoluteFill>
  );
};
