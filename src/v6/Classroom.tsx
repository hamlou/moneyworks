import React, {useMemo} from 'react';
import * as THREE from 'three';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Sfx, Cue} from '../fx';
import {Blob} from './sets';
import {POSES3D} from './Dave3D';
import {ComicBurst, DaveT, PKey, Smear, Stage, WhiteFlash} from './kit';

// TaxShot: free-kit answer to the Higgsfield test (qa_dl/hf_test). Line: "school spent 12 years teaching me
// triangles and zero minutes teaching me taxes" → props straight from the line (STYLE_3D.md §12, props-from-script):
// classroom + chalkboard of triangles + a TAX FORM in Dave's hands. Grammar from §12.3:
// A 0–59   wide, locked camera, Dave holds the form; face snaps to shock at 12; turns to the board at 34
// B 60–99  1 white-silhouette frame → punch-in close-up on Dave + board, spiral eyes
// C 100–149 2 smear frames → wide again, panic pose with the paper shaking + comic burst "TAXES?!"
export const TAX_FRAMES = 150;

const canvasTex = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  draw(cv.getContext('2d')!);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};

const useBoard = () =>
  useMemo(
    () =>
      canvasTex(1600, 800, (c) => {
        c.fillStyle = '#2f5a43';
        c.fillRect(0, 0, 1600, 800);
        c.strokeStyle = 'rgba(240,240,230,0.85)';
        c.fillStyle = 'rgba(240,240,230,0.85)';
        c.lineWidth = 6;
        c.font = '44px Comic Sans MS, sans-serif';
        const tri = (x: number, y: number, s: number, r: number) => {
          c.save();
          c.translate(x, y);
          c.rotate(r);
          c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(s, 0);
          c.lineTo(s * 0.25, -s * 0.8);
          c.closePath();
          c.stroke();
          c.strokeRect(s * 0.25 - 2, -22, 20, 20);
          c.fillText('a', s * 0.55, 40);
          c.fillText('b', -36, -s * 0.35);
          c.restore();
        };
        [[90, 300, 220, 0], [420, 260, 180, 0.15], [760, 330, 240, -0.1], [1150, 280, 200, 0.2], [180, 700, 200, -0.15], [560, 720, 260, 0.05], [1000, 710, 210, 0], [1350, 690, 180, -0.2]].forEach(([x, y, s, r]) => tri(x, y, s, r));
        ['a² + b² = c²', 'sin θ = a/c', 'A = ½·b·h', 'tan θ = a/b'].forEach((s, i) => c.fillText(s, 80 + i * 380, 420 + (i % 2) * 40));
      }),
    [],
  );

const useForm = () =>
  useMemo(
    () =>
      canvasTex(600, 780, (c) => {
        c.fillStyle = '#f3efe4';
        c.fillRect(0, 0, 600, 780);
        c.fillStyle = '#1b1b1b';
        c.font = 'bold 76px Arial Black, sans-serif';
        c.fillText('TAX FORM', 40, 110);
        c.fillStyle = '#9a958a';
        for (let i = 0; i < 12; i++) c.fillRect(40, 170 + i * 48, 360 + ((i * 73) % 160), 10);
        c.strokeStyle = '#c33';
        c.lineWidth = 6;
        c.strokeRect(380, 640, 180, 90);
      }),
    [],
  );

const M: React.FC<{c: string; e?: string; ei?: number}> = ({c, e, ei = 0}) => <meshStandardMaterial color={c} emissive={e ?? '#000'} emissiveIntensity={ei} roughness={0.85} />;
const Box: React.FC<{p: [number, number, number]; s: [number, number, number]; c: string}> = ({p, s, c}) => (
  <mesh position={p}>
    <boxGeometry args={s} />
    <M c={c} />
  </mesh>
);

// school desk + chair at x, z (desk top ≈ 1.5)
const Desk: React.FC<{x: number; z: number}> = ({x, z}) => (
  <group position={[x, 0, z]}>
    <Box p={[0, 1.5, 0.9]} s={[2.4, 0.1, 1.2]} c="#b9874f" />
    <Box p={[0, 1.25, 0.9]} s={[2.2, 0.4, 1.0]} c="#7f848c" />
    {[-1.05, 1.05].map((dx) => [0.4, 1.4].map((dz) => <Box key={`${dx}${dz}`} p={[dx, 0.7, dz]} s={[0.08, 1.5, 0.08]} c="#9aa0a8" />))}
    <Box p={[0, 0.9, -0.3]} s={[1.5, 0.1, 1.2]} c="#b9874f" />
    <Box p={[0, 1.7, -0.85]} s={[1.5, 1.2, 0.1]} c="#b9874f" />
    {[-0.65, 0.65].map((dx) => <Box key={dx} p={[dx, 0.45, -0.3]} s={[0.07, 0.9, 0.07]} c="#9aa0a8" />)}
  </group>
);

export const Classroom: React.FC = () => {
  const board = useBoard();
  return (
    <group>
      <mesh position={[0, -0.1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 14]} />
        <M c="#6b4f36" />
      </mesh>
      <mesh position={[0, 4, -4]}>
        <planeGeometry args={[24, 9]} />
        <M c="#d9cdb4" />
      </mesh>
      <Box p={[0, 0.5, -3.95]} s={[24, 1.2, 0.05]} c="#8a6c4c" />
      {/* chalkboard behind-left of Dave */}
      <Box p={[-2.2, 3.6, -3.93]} s={[7.4, 3.6, 0.08]} c="#5a3e26" />
      <mesh position={[-2.2, 3.6, -3.88]}>
        <planeGeometry args={[7.0, 3.3]} />
        <meshStandardMaterial map={board} roughness={0.95} />
      </mesh>
      {/* window on the right wall: warm light source */}
      <mesh position={[7.5, 3.8, -1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4, 3.4]} />
        <meshBasicMaterial color="#ffe2a8" />
      </mesh>
      <mesh position={[7.6, 4, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[14, 9]} />
        <M c="#cfc2a8" />
      </mesh>
      <Desk x={1.2} z={0} />
      <Desk x={-4.6} z={2.2} />
      <Desk x={6.2} z={2.4} />
      <Blob p={[1.2, -0.08, 0.4]} r={1.6} o={0.3} />
      <pointLight position={[6, 4.5, 0]} intensity={30} distance={16} color="#ffc98a" />
    </group>
  );
};

const KEYS: PKey[] = [
  {at: 0, pose: 'hold_sit', face: 'neutral'},
  {at: 12, face: 'shock'},
  {at: 34, pose: 'look_sit', face: 'think'},
  {at: 60, pose: 'look2_sit', face: 'spiral'},
  {at: 100, pose: 'panic_hold_sit', face: 'shock'},
  {at: 124, face: 'sad'},
];
POSES3D.hold_sit = {...POSES3D.sit, aS: -18, aE: 70, aSx: -55, bS: 18, bE: -70, bSx: -55};
POSES3D.look_sit = {...POSES3D.hold_sit, turn: 38, tilt: 8};
POSES3D.look2_sit = {...POSES3D.look_sit, tilt: 12};
POSES3D.panic_hold_sit = {...POSES3D.hold_sit, aSx: -75, bSx: -75, aE: 40, bE: -40, tilt: -6};

const Form: React.FC<{f: number}> = ({f}) => {
  const tex = useForm();
  const shake = f >= 100 ? Math.sin(f * 2.9) * 0.05 : 0;
  const up = f >= 100 ? 0.35 : 0;
  return (
    <mesh position={[1.2 + shake, 1.85 + up, 0.75]} rotation={[-0.75 + (f >= 100 ? 0.45 : 0), 0, shake * 2]}>
      <planeGeometry args={[0.78, 1.0]} />
      <meshStandardMaterial map={tex} side={THREE.DoubleSide} roughness={0.9} />
    </mesh>
  );
};

// sweat drop next to Dave's head: pops in with the shock face, then slides down
const Sweat: React.FC<{f: number}> = ({f}) => {
  if (f < 12) return null;
  const y = 3.55 - Math.min(0.5, (f - 12) * 0.006) - (f >= 100 ? 0.25 : 0);
  return (
    <group position={[2.05, y, 0.25]} scale={0.22}>
      <mesh>
        <sphereGeometry args={[1, 24, 16]} />
        <meshPhysicalMaterial color="#8fd3ff" roughness={0.1} clearcoat={1} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <coneGeometry args={[0.86, 1.6, 24]} />
        <meshPhysicalMaterial color="#8fd3ff" roughness={0.1} clearcoat={1} transparent opacity={0.92} />
      </mesh>
    </group>
  );
};

export const TaxShot: React.FC = () => {
  const f = useCurrentFrame();
  const close = f >= 60 && f < 100;
  const cam: [number, number, number] = close ? [0.4, 3.15, 5.6] : [1.8, 3.3, 8.8];
  const look: [number, number, number] = close ? [-0.4, 3.0, 0] : [0.7, 2.5, 0];
  const cues: Cue[] = [
    {at: 12, src: 'pop', v: 0.3},
    {at: 34, src: 'whoosh', v: 0.25},
    {at: 60, src: 'boom', v: 0.45},
    {at: 100, src: 'whoosh', v: 0.45},
    {at: 104, src: 'stamp', v: 0.5},
  ];
  return (
    <AbsoluteFill style={{background: '#1a1410'}}>
      <Smear f={f} at={100} n={2}>
        <Stage cam={cam} look={look} fov={close ? 30 : 34} lights="window">
          <Classroom />
          <DaveT f={f} keys={KEYS} position={[1.2, 0.45, -0.3]} shake={f >= 100 ? 0.03 : 0} />
          <Form f={f} />
          <Sweat f={f} />
        </Stage>
      </Smear>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 55% 45%, rgba(0,0,0,0) 45%, rgba(20,8,0,0.55) 100%)', mixBlendMode: 'multiply'}} />
      <ComicBurst f={f} at={104} word="TAXES?!" x={360} y={300} />
      <WhiteFlash f={f} at={100} n={1} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
