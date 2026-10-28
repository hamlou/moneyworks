import React, {useMemo} from 'react';
import * as THREE from 'three';

// v6 (STYLE_3D.md §5.1): Dave as a real 3D toon character, built from primitives so it renders inside Remotion
// (@remotion/three) with no Blender step. Same trick as the reference video: a 3D body + a FLAT drawn face texture
// that swaps per line. Poses snap (sprite-style) — the cut/flash between poses is done by the caller (see kit.tsx).

export type Face = 'neutral' | 'happy' | 'grin' | 'shock' | 'angry' | 'sad' | 'smug' | 'think' | 'x_eyes' | 'hearts' | 'spiral' | 'money' | 'talk' | 'sleep';

// joint angles in degrees. a = arm/leg on the SCREEN-LEFT, b = SCREEN-RIGHT. 0 = hanging straight down.
// shoulder/hip z-angle: negative swings a-limbs outward-left, positive swings b-limbs outward-right.
export type Pose = {
  aS: number; aE: number; bS: number; bE: number; // arms (shoulder, elbow)
  aH: number; aK: number; bH: number; bK: number; // legs (hip, knee) in the screen plane
  aHx?: number; bHx?: number; aKx?: number; bKx?: number; // legs forward (sitting): x rotation
  aSx?: number; bSx?: number; // arms toward camera
  lean?: number; tilt?: number; turn?: number; // body lean (z), head tilt (z), whole-body turn (y)
  lie?: boolean;
};

const P = (o: Partial<Pose>): Pose => ({aS: -10, aE: 6, bS: 10, bE: -6, aH: -5, aK: 0, bH: 5, bK: 0, ...o});
export const POSES3D: Record<string, Pose> = {
  idle: P({}),
  point_l: P({aS: -92, aE: -4, bS: 14, bE: -10, turn: 18, tilt: 4}),
  point_r: P({bS: 92, bE: 4, aS: -14, aE: 10, turn: -18, tilt: -4}),
  point_up: P({bS: 165, bE: 8, aS: -16, aE: 12, tilt: -6}),
  present_l: P({aS: -58, aE: -38, aSx: -25, bS: 12, turn: 14}),
  shrug: P({aS: -48, aE: -95, bS: 48, bE: 95, tilt: 10}),
  celebrate: P({aS: -158, aE: -10, bS: 158, bE: 10, aH: -14, bH: 14}),
  panic: P({aS: -140, aE: -55, bS: 140, bE: 55, aH: -12, bH: 12}),
  facepalm: P({bS: 150, bE: 62, bSx: -30, aS: -14, tilt: 12, lean: 4}),
  think: P({bS: 38, bE: 125, bSx: -30, aS: -22, aE: 70, aSx: -20, tilt: -10}),
  thumbs: P({bS: 64, bE: 100, bSx: -15, aS: -12}),
  wave: P({bS: 120, bE: 40, aS: -12}),
  hips: P({aS: -40, aE: 95, bS: 40, bE: -95}),
  peace: P({bS: 140, bE: 30, aS: -12, tilt: 8}),
  sit: P({aHx: -88, bHx: -88, aKx: 88, bKx: 88, aH: -8, bH: 8, aS: -24, aE: 30, aSx: -20, bS: 24, bE: -30, bSx: -20}),
  lie: P({lie: true, aS: -20, bS: 20, aE: 40, bE: -40}),
};
// sitting variants: upper body of a pose + sitting legs
const SIT = {aHx: -88, bHx: -88, aKx: 88, bKx: 88, aH: -8, bH: 8, aK: 0, bK: 0};
for (const k of ['panic', 'facepalm', 'shrug', 'think', 'point_l', 'point_r', 'celebrate', 'thumbs']) POSES3D[`${k}_sit`] = {...POSES3D[k], ...SIT};

// ---- materials ---------------------------------------------------------------------------------------------
const toonRamp = (() => {
  const d = new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 200, 200, 200, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  d.minFilter = THREE.NearestFilter;
  d.magFilter = THREE.NearestFilter;
  d.needsUpdate = true;
  return d;
})();

type Mats = {body: THREE.Material; line: THREE.Material};
const useMats = (flash: boolean, color: string): Mats =>
  useMemo(
    () =>
      flash
        ? {body: new THREE.MeshBasicMaterial({color: '#ffffff'}), line: new THREE.MeshBasicMaterial({color: '#d8d8d8', side: THREE.BackSide})}
        : {body: new THREE.MeshPhysicalMaterial({color, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3}), line: new THREE.MeshBasicMaterial({color: '#141414', side: THREE.BackSide})},
    [flash, color],
  );

const LINE = 0.026; // outline thickness (inverted hull)
const R = 0.105; // limb radius

const Seg: React.FC<{len: number; m: Mats; r?: number}> = ({len, m, r = R}) => (
  <group position={[0, -len / 2, 0]}>
    <mesh material={m.body}>
      <capsuleGeometry args={[r, len, 6, 14]} />
    </mesh>
    <mesh material={m.line}>
      <capsuleGeometry args={[r + LINE, len + LINE, 6, 14]} />
    </mesh>
  </group>
);

const rad = (d = 0) => (d * Math.PI) / 180;

// two-segment limb hanging down from its origin
const Limb: React.FC<{s: number; e: number; sx?: number; ex?: number; l1: number; l2: number; m: Mats; end?: boolean}> = ({s, e, sx = 0, ex = 0, l1, l2, m, end}) => (
  <group rotation={[rad(sx), 0, rad(s)]}>
    <Seg len={l1} m={m} />
    <group position={[0, -l1, 0]} rotation={[rad(ex), 0, rad(e)]}>
      <Seg len={l2} m={m} />
      {end ? (
        <group position={[0, -l2, 0]}>
          <mesh material={m.body}>
            <sphereGeometry args={[R * 1.7, 16, 12]} />
          </mesh>
          <mesh material={m.line}>
            <sphereGeometry args={[R * 1.7 + LINE, 16, 12]} />
          </mesh>
        </group>
      ) : null}
    </group>
  </group>
);

// ---- face texture (drawn line art on a transparent canvas, mapped on the front of the head) -----------------
// SphereGeometry UV: u = 0.25 faces +z (the camera), v = 0.5 is the equator.
const TW = 2048;
const TH = 1024;
const faceCache: Record<string, THREE.CanvasTexture> = {};
const drawFace = (face: Face, blink: boolean) => {
  const key = face + (blink ? '_b' : '');
  if (faceCache[key]) return faceCache[key];
  const c = document.createElement('canvas');
  c.width = TW;
  c.height = TH;
  const g = c.getContext('2d')!;
  const cx = TW * 0.25;
  const cy = TH * 0.52;
  g.strokeStyle = g.fillStyle = '#16161a';
  g.lineCap = g.lineJoin = 'round';
  g.lineWidth = 22;
  const ex = 70; // eye half-distance
  const ey = cy - 30;
  const dot = (x: number, y: number, r = 26) => {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  };
  const line = (pts: number[][]) => {
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.stroke();
  };
  const arc = (x: number, y: number, r: number, a0: number, a1: number) => {
    g.beginPath();
    g.arc(x, y, r, a0, a1);
    g.stroke();
  };
  const eyes = () => (blink ? (line([[cx - ex - 26, ey], [cx - ex + 26, ey]]), line([[cx + ex - 26, ey], [cx + ex + 26, ey]])) : (dot(cx - ex, ey), dot(cx + ex, ey)));
  const smile = (w = 60, d = 26) => {
    g.beginPath();
    g.moveTo(cx - w, cy + 60);
    g.quadraticCurveTo(cx, cy + 60 + d * 2, cx + w, cy + 60);
    g.stroke();
  };
  switch (face) {
    case 'neutral':
      eyes();
      smile(50, 12);
      break;
    case 'talk':
      eyes();
      g.beginPath();
      g.ellipse(cx, cy + 75, 40, 30, 0, 0, Math.PI * 2);
      g.fill();
      break;
    case 'happy':
      arc(cx - ex, ey + 10, 26, Math.PI * 1.1, Math.PI * 1.9);
      arc(cx + ex, ey + 10, 26, Math.PI * 1.1, Math.PI * 1.9);
      g.beginPath();
      g.moveTo(cx - 70, cy + 50);
      g.quadraticCurveTo(cx, cy + 150, cx + 70, cy + 50);
      g.closePath();
      g.fill();
      break;
    case 'grin':
      eyes();
      smile(85, 30);
      break;
    case 'shock':
      g.lineWidth = 16;
      arc(cx - ex, ey, 34, 0, Math.PI * 2);
      arc(cx + ex, ey, 34, 0, Math.PI * 2);
      dot(cx - ex, ey, 12);
      dot(cx + ex, ey, 12);
      g.beginPath();
      g.ellipse(cx, cy + 90, 34, 46, 0, 0, Math.PI * 2);
      g.fill();
      break;
    case 'angry':
      eyes();
      g.lineWidth = 20;
      line([[cx - ex - 45, ey - 70], [cx - ex + 30, ey - 40]]);
      line([[cx + ex + 45, ey - 70], [cx + ex - 30, ey - 40]]);
      line([[cx - 70, cy + 80], [cx - 35, cy + 60], [cx, cy + 80], [cx + 35, cy + 60], [cx + 70, cy + 80]]);
      break;
    case 'sad':
      eyes();
      g.beginPath();
      g.moveTo(cx - 55, cy + 95);
      g.quadraticCurveTo(cx, cy + 50, cx + 55, cy + 95);
      g.stroke();
      break;
    case 'smug':
      line([[cx - ex - 28, ey], [cx - ex + 28, ey]]);
      line([[cx + ex - 28, ey], [cx + ex + 28, ey]]);
      dot(cx - ex, ey + 12, 15);
      dot(cx + ex, ey + 12, 15);
      line([[cx - 40, cy + 75], [cx + 25, cy + 75], [cx + 65, cy + 50]]);
      break;
    case 'think':
      dot(cx - ex + 18, ey - 10);
      dot(cx + ex + 18, ey - 10);
      line([[cx - 30, cy + 80], [cx + 50, cy + 70]]);
      break;
    case 'x_eyes':
      [cx - ex, cx + ex].forEach((x) => (line([[x - 28, ey - 28], [x + 28, ey + 28]]), line([[x + 28, ey - 28], [x - 28, ey + 28]])));
      g.beginPath();
      g.ellipse(cx, cy + 80, 30, 18, 0, 0, Math.PI * 2);
      g.stroke();
      break;
    case 'hearts':
      g.fillStyle = '#ff3b5c';
      [cx - ex, cx + ex].forEach((x) => {
        g.beginPath();
        g.moveTo(x, ey + 30);
        g.bezierCurveTo(x - 60, ey - 10, x - 30, ey - 55, x, ey - 22);
        g.bezierCurveTo(x + 30, ey - 55, x + 60, ey - 10, x, ey + 30);
        g.fill();
      });
      g.fillStyle = '#16161a';
      smile(70, 30);
      break;
    case 'spiral':
      g.lineWidth = 12;
      [cx - ex, cx + ex].forEach((x) => {
        g.beginPath();
        for (let t = 0; t < 14; t += 0.2) g.lineTo(x + Math.cos(t) * t * 2.6, ey + Math.sin(t) * t * 2.6);
        g.stroke();
      });
      g.lineWidth = 18;
      line([[cx - 60, cy + 85], [cx - 20, cy + 70], [cx + 20, cy + 90], [cx + 60, cy + 75]]);
      break;
    case 'money':
      g.font = 'bold 110px Arial';
      g.fillStyle = '#1f9d45';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText('$', cx - ex, ey);
      g.fillText('$', cx + ex, ey);
      g.fillStyle = '#16161a';
      smile(80, 32);
      break;
    case 'sleep':
      line([[cx - ex - 26, ey + 6], [cx - ex + 26, ey + 6]]);
      line([[cx + ex - 26, ey + 6], [cx + ex + 26, ey + 6]]);
      g.beginPath();
      g.ellipse(cx, cy + 80, 18, 14, 0, 0, Math.PI * 2);
      g.stroke();
      break;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  faceCache[key] = t;
  return t;
};

export type Dave3DProps = {
  pose?: string | Pose;
  face?: Face;
  f?: number; // local frame (idle breathing + blinks)
  flash?: boolean; // white-silhouette frame (reference: 1 frame on every pose swap)
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  shake?: number;
};

export const Dave3D: React.FC<Dave3DProps> = ({pose = 'idle', face = 'neutral', f = 0, flash = false, color = '#f4f4f2', position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, shake = 0}) => {
  const p = typeof pose === 'string' ? POSES3D[pose] ?? POSES3D.idle : pose;
  const m = useMats(flash, color);
  const blink = f % 97 >= 93 && !['happy', 'smug', 'x_eyes', 'spiral', 'hearts', 'money', 'sleep'].includes(face);
  const tex = drawFace(face, blink);
  const breathe = Math.sin(f / 14) * 0.012;
  const sh = shake ? [Math.sin(f * 2.7) * shake, Math.cos(f * 3.1) * shake * 0.6] : [0, 0];
  const HIP = 0.5;
  const NECK = 1.62;
  const HEAD = 2.52;
  return (
    <group position={[position[0] + sh[0], position[1] + sh[1], position[2]]} rotation={[rotation[0], rotation[1] + rad(p.turn), rotation[2]]} scale={scale}>
      <group rotation={[0, 0, p.lie ? rad(90) : 0]} position={p.lie ? [0, 0.2, 0] : [0, 0, 0]}>
        <group rotation={[0, 0, rad(p.lean)]} position={[0, breathe, 0]}>
          {/* body */}
          <group position={[0, NECK, 0]}>
            <Seg len={NECK - HIP} m={m} />
          </group>
          {/* arms from just under the head */}
          <group position={[-0.04, NECK - 0.3, 0.02]}>
            <Limb s={p.aS} e={p.aE} sx={p.aSx} l1={0.6} l2={0.56} m={m} end />
          </group>
          <group position={[0.04, NECK - 0.3, 0.02]}>
            <Limb s={p.bS} e={p.bE} sx={p.bSx} l1={0.6} l2={0.56} m={m} end />
          </group>
          {/* head: slightly wide egg, face texture on the front */}
          <group position={[0, HEAD, 0]} rotation={[0, 0, rad(p.tilt)]} scale={[1.06, 1, 0.98]}>
            <mesh material={m.body}>
              <sphereGeometry args={[1, 48, 32]} />
            </mesh>
            <mesh material={m.line}>
              <sphereGeometry args={[1 + LINE * 1.1, 48, 32]} />
            </mesh>
            {!flash ? (
              <mesh>
                <sphereGeometry args={[1.004, 48, 32]} />
                <meshBasicMaterial map={tex} transparent depthWrite={false} />
              </mesh>
            ) : null}
          </group>
        </group>
        {/* legs */}
        <group position={[-0.03, HIP, 0]}>
          <Limb s={p.aH} e={p.aK} sx={p.aHx} ex={p.aKx} l1={0.56} l2={0.54} m={m} />
        </group>
        <group position={[0.03, HIP, 0]}>
          <Limb s={p.bH} e={p.bK} sx={p.bHx} ex={p.bKx} l1={0.56} l2={0.54} m={m} />
        </group>
      </group>
    </group>
  );
};
