import React from 'react';

// v6 3D sets (STYLE_3D.md §5.3), built from primitives. Floor is at y = -0.1 (Dave's feet when standing ≈ -0.6
// so standing Dave gets position y = 0.5). Units: Dave is ≈ 4 tall.
const M: React.FC<{c: string; e?: string; ei?: number; r?: number}> = ({c, e, ei = 0, r = 0.85}) => <meshStandardMaterial color={c} emissive={e ?? '#000'} emissiveIntensity={ei} roughness={r} metalness={0} />;

const Box: React.FC<{p: [number, number, number]; s: [number, number, number]; c: string; rot?: [number, number, number]; e?: string; ei?: number}> = ({p, s, c, rot = [0, 0, 0], e, ei}) => (
  <mesh position={p} rotation={rot}>
    <boxGeometry args={s} />
    <M c={c} e={e} ei={ei} />
  </mesh>
);

// soft fake contact shadow
export const Blob: React.FC<{p: [number, number, number]; r?: number; o?: number}> = ({p, r = 0.9, o = 0.35}) => (
  <mesh position={p} rotation={[-Math.PI / 2, 0, 0]}>
    <circleGeometry args={[r, 32]} />
    <meshBasicMaterial color="#000" transparent opacity={o} depthWrite={false} />
  </mesh>
);

export const Bedroom: React.FC<{tv?: string; tvOn?: boolean}> = ({tv = '#3fe0ff', tvOn = true}) => (
  <group>
    {/* floor + walls */}
    <mesh position={[0, -0.1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[18, 12]} />
      <M c="#5d5650" />
    </mesh>
    <mesh position={[0, 3.5, -4]}>
      <planeGeometry args={[18, 8]} />
      <M c="#b9b1a4" />
    </mesh>
    <mesh position={[-6, 3.5, 1]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[12, 8]} />
      <M c="#a9a196" />
    </mesh>
    {/* wall panels */}
    {[-2.2, -0.7, 0.8, 2.3, 3.8].map((x) => (
      <Box key={x} p={[x, 2.2, -3.95]} s={[1.4, 2.6, 0.06]} c="#a69d90" />
    ))}
    <Box p={[0.8, 4.0, -3.92]} s={[7.6, 0.08, 0.1]} c="#7d756a" />
    {/* bed */}
    <Box p={[0.8, 0.08, -2.0]} s={[4.0, 0.36, 3.3]} c="#2b2b2f" />
    <Box p={[0.8, 0.36, -2.0]} s={[3.8, 0.22, 3.1]} c="#7c8088" />
    <Box p={[0.8, 1.1, -3.75]} s={[4.2, 1.9, 0.3]} c="#2e2e33" />
    <Box p={[-0.1, 0.62, -3.2]} s={[1.3, 0.3, 0.7]} c="#d9dbe0" />
    <Box p={[1.7, 0.62, -3.2]} s={[1.3, 0.3, 0.7]} c="#d9dbe0" />
    {/* nightstands + lamp */}
    <Box p={[-1.9, 0.3, -3.2]} s={[0.9, 0.8, 0.8]} c="#3a332d" />
    <Box p={[3.5, 0.3, -3.2]} s={[0.9, 0.8, 0.8]} c="#3a332d" />
    <mesh position={[3.5, 1.0, -3.2]}>
      <cylinderGeometry args={[0.22, 0.3, 0.4, 20]} />
      <M c="#efe6d2" e="#ffcf8a" ei={0.15} />
    </mesh>
    {/* TV on the left wall, angled to the bed */}
    <group position={[-4.6, 2.2, -1.6]} rotation={[0, 0.75, 0]}>
      <Box p={[0, 0, 0]} s={[2.9, 1.7, 0.12]} c="#111" />
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.7, 1.5]} />
        <meshBasicMaterial color={tvOn ? tv : '#0a0a0a'} />
      </mesh>
    </group>
    {/* rug */}
    <mesh position={[0.6, -0.09, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 2.6]} />
      <M c="#3c3f46" />
    </mesh>
  </group>
);
