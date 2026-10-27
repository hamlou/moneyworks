import React, {useLayoutEffect} from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {TimingProvider, Timings, useT} from '../timing';
import {ANTON, ComicBurst, DaveT, K, PKey, UI, snap, WhiteFlash, Threshold} from '../v6/kit';

const W = 1080;
const H = 1920;
type Mode = 'oval' | 'press' | 'hospital' | 'insurance' | 'capitol' | 'finale';

const Mat: React.FC<{c: string; metal?: number; rough?: number}> = ({c, metal = 0, rough = 0.72}) => <meshStandardMaterial color={c} metalness={metal} roughness={rough} />;
const Block: React.FC<{p: [number, number, number]; s: [number, number, number]; c: string}> = ({p, s, c}) => <mesh position={p} castShadow receiveShadow><boxGeometry args={s} /><Mat c={c} /></mesh>;
const Pillar: React.FC<{x: number}> = ({x}) => <group position={[x, 2.35, -3.6]}><mesh castShadow><cylinderGeometry args={[0.32, 0.42, 4.7, 20]} /><Mat c="#e5e0d5" /></mesh><Block p={[0, 2.42, 0]} s={[0.95, 0.18, 0.95]} c="#f5f1e9" /><Block p={[0, -2.42, 0]} s={[0.95, 0.18, 0.95]} c="#d0c8b8" /></group>;

const DoorLeaf: React.FC<{side: -1 | 1; f: number}> = ({side, f}) => {
  const open = interpolate(f, [0, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <group position={[side * 1.35, 1.55, -3.7]} rotation={[0, side * open * 0.92, 0]}>
    <mesh position={[-side * 0.68, 0, 0]} castShadow>
      <boxGeometry args={[1.36, 3.1, 0.16]} />
      <Mat c="#5b4937" />
    </mesh>
    <mesh position={[-side * 0.68, 0, 0.09]}>
      <boxGeometry args={[1.08, 2.82, 0.035]} />
      <Mat c="#80684c" />
    </mesh>
    <mesh position={[-side * 0.18, 0, 0.16]}>
      <sphereGeometry args={[0.055, 12, 10]} />
      <meshStandardMaterial color="#d5bd7c" metalness={0.8} roughness={0.25} />
    </mesh>
  </group>;
};

const billDepth = (f: number, at: number) => at < 0 ? 1.5 : interpolate(f, [at, at + 12, at + 18, at + 30], [1.5, -3.2, -1.4, 1.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const World: React.FC<{mode: Mode; f: number; gagAt: number}> = ({mode, f, gagAt}) => (
  <group>
    <mesh position={[0, -1.18, -1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[22, 20]} /><Mat c={mode === 'finale' ? '#182332' : '#34363b'} /></mesh>
    {mode === 'oval' ? <><Block p={[0, 2.4, -4.8]} s={[18, 7.2, 0.25]} c="#263d36" /><Block p={[-3.8, 2.45, -4.62]} s={[3.8, 4.9, 0.08]} c="#5c806e" /><Block p={[0.2, 2.45, -4.62]} s={[3.8, 4.9, 0.08]} c="#5c806e" /><Block p={[4.15, 2.45, -4.62]} s={[3.8, 4.9, 0.08]} c="#5c806e" /><Block p={[0, 0.05, -2.1]} s={[5.2, 0.32, 2.1]} c="#563c2d" /><Block p={[0, 0.28, -2.1]} s={[5.1, 0.12, 2.0]} c="#8a6746" /><Block p={[-6.8, 2.1, -3.2]} s={[0.16, 4.2, 0.16]} c="#b7b7b7" /><Block p={[-6.45, 3.3, -3.2]} s={[0.85, 1.5, 0.05]} c="#183b72" /><Block p={[6.8, 2.1, -3.2]} s={[0.16, 4.2, 0.16]} c="#b7b7b7" /><Block p={[6.45, 3.3, -3.2]} s={[0.85, 1.5, 0.05]} c="#b22234" /><DoorLeaf side={-1} f={f} /><DoorLeaf side={1} f={f} /></> : null}
    {mode === 'press' ? <><Block p={[0, 2.3, -4.7]} s={[18, 7, 0.3]} c="#10233e" />{Array.from({length: 8}).map((_, i) => <Block key={i} p={[-6.2 + i * 1.75, 2.25, -4.48]} s={[0.09, 4.8, 0.08]} c="#7e8da4" />)}<Block p={[0, 0.55, -2.4]} s={[2.4, 1.1, 0.85]} c="#3c4654" /><Block p={[0, 1.2, -2.4]} s={[2.8, 0.12, 1.0]} c="#aeb6c2" /><Block p={[0, 2.05, -2.4]} s={[0.12, 1.7, 0.12]} c="#d8d8d8" /></> : null}
    {mode === 'hospital' ? <><Block p={[0, 2.4, -4.8]} s={[18, 7.2, 0.2]} c="#d9e4e8" /><Block p={[-3.3, 1.0, -2.5]} s={[4.6, 0.3, 2.2]} c="#f4f6f7" /><Block p={[-3.3, 1.65, -3.35]} s={[4.5, 1.0, 0.25]} c="#9eb6c2" /><Block p={[4.5, 2.1, -3.2]} s={[2.2, 1.8, 0.15]} c="#24323d" /><Block p={[4.5, 2.1, -3.08]} s={[2.0, 1.6, 0.05]} c="#1e9b9a" /></> : null}
    {mode === 'insurance' ? <><Block p={[0, 2.4, -4.8]} s={[18, 7.2, 0.2]} c="#202e40" />{Array.from({length: 5}).map((_, i) => <Block key={i} p={[-4.2 + i * 2.1, 1.1 + (i % 2) * 0.22, -2.7]} s={[1.45, 2.2 + (i % 2) * 0.45, 0.32]} c={i % 2 ? '#4a6077' : '#6d8297'} />)}<Block p={[0, 0.25, -2.2]} s={[8.2, 0.35, 2.0]} c="#4a382d" /></> : null}
    {mode === 'capitol' ? <><Block p={[0, 2.5, -5]} s={[18, 8, 0.25]} c="#b8b5ac" />{[-6, -3, 0, 3, 6].map(x => <Pillar key={x} x={x} />)}<Block p={[0, 0.6, -1.9]} s={[6.8, 1.2, 0.6]} c="#77766f" /><Block p={[0, 2.5, -4.2]} s={[3.2, 4.7, 0.28]} c="#41464d" /><Block p={[0, 2.5, -4.0]} s={[2.6, 4.1, 0.08]} c="#9a9b96" /><Block p={[0, 4.9, -4.0]} s={[3.8, 0.22, 0.35]} c="#e2ded4" /><Block p={[-1.25, 1.0, billDepth(f, gagAt)]} s={[2.8, 1.55, 0.16]} c="#e0e3e8" /><Block p={[-1.25, 1.0, billDepth(f, gagAt) + 0.1]} s={[2.35, 1.12, 0.035]} c="#78927c" /></> : null}
    {mode === 'finale' ? <><Block p={[0, 2.8, -5]} s={[18, 8, 0.25]} c="#182332" />{Array.from({length: 10}).map((_, i) => <Block key={i} p={[-8 + i * 1.75, 0.9 + (i % 3) * 0.55, -3.5]} s={[1.1, 2 + (i % 3) * 0.8, 0.5]} c="#27394c" />)}<mesh position={[0, 5.3, -3]}><sphereGeometry args={[0.42, 20, 16]} /><meshBasicMaterial color="#f3d58b" /></mesh></> : null}
    <mesh position={[-4.4, 4.8, -1.8]}><sphereGeometry args={[0.16, 16, 12]} /><meshBasicMaterial color={mode === 'hospital' ? '#78d9e5' : '#f4d27b'} /></mesh>
    <pointLight position={[2.2 + Math.sin(f / 22) * 0.3, 4.2, 1.2]} intensity={mode === 'hospital' ? 5 : 3} distance={12} color={mode === 'hospital' ? '#a9f0f4' : '#ffe3b3'} />
  </group>
);

const Camera: React.FC<{f: number; close: boolean}> = ({f, close}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    camera.position.set(close ? 0.55 : 0, 1.78, close ? 9.7 : 12 - Math.sin(f / 29) * 0.12);
    camera.lookAt(close ? 0.1 : 0, close ? 1.62 : 1.7, 0);
    (camera as any).fov = close ? 27 : 24;
    camera.updateProjectionMatrix();
  }, [camera, f, close]);
  return null;
};

const DaveStage: React.FC<{f: number; keys: PKey[]; mode: Mode; close?: boolean; gagAt?: number}> = ({f, keys, mode, close = false, gagAt = -1}) => {
  const enter = snap(f, 4, 12);
  return (
  <ThreeCanvas width={W} height={H} style={{position: 'absolute', inset: 0}} gl={{antialias: true, alpha: true, preserveDrawingBuffer: true}} camera={{fov: 24, position: [0, 1.78, 12], near: 0.1, far: 100}}>
    <Camera f={f} close={close} />
    <ambientLight intensity={mode === 'hospital' ? 0.8 : 0.62} />
    <directionalLight position={[4, 7, 6]} intensity={2.4} />
    <directionalLight position={[-5, 3, 2]} intensity={0.85} color={mode === 'press' ? '#b6caff' : '#d4e2ff'} />
    <World mode={mode} f={f} gagAt={gagAt} />
    <DaveT f={f} keys={keys} position={[close ? 0.1 : -0.4 + 1.22 * enter + Math.sin(f / 17) * 0.025, close ? -1.05 : -0.3 + Math.sin(f / 12) * 0.01, 0.35]} rotation={[0, -0.18 + Math.sin(f / 23) * 0.035, 0]} scale={close ? 0.92 : 0.72 * enter} shake={mode === 'capitol' && f >= gagAt && f < gagAt + 16 ? 0.035 : 0} />
  </ThreeCanvas>
  );
};

const PhotoPlate: React.FC<{f: number; at: number; id: string; label: string}> = ({f, at, id, label}) => {
  if (f < at) return null;
  const enter = snap(f, at, 6);
  const zoom = interpolate(f - at, [0, 140], [1.12, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: 42, top: 88, width: 660, height: 640, overflow: 'hidden', borderRadius: 26, border: '2px solid #4a4e57', boxShadow: '0 30px 90px rgba(0,0,0,0.5)', opacity: Math.max(0.65, Math.min(1, enter * 1.4)), transform: 'translateX(' + ((1 - enter) * -70) + 'px) scale(' + (0.94 + enter * 0.06) + ')', transformOrigin: 'left top'}}>
    <Img src={staticFile('photos/short61/' + id + '.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(' + zoom + ')', filter: 'saturate(1.08) contrast(1.05)'}} />
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 35%, rgba(0,0,0,0.65) 100%)'}} />
    <div style={{position: 'absolute', left: 28, bottom: 26, fontFamily: UI, fontSize: 25, fontWeight: 700, color: '#fff', letterSpacing: 2, textShadow: '0 3px 12px #000'}}>{label}</div>
  </div>;
};

const Kinetic: React.FC<{f: number; at: number; title: string; sub?: string; color?: string; top?: number; width?: number; size?: number}> = ({f, at, title, sub, color = K.white, top = 960, width = 520, size = 58}) => {
  const p = snap(f, at, 5);
  if (f < at) return null;
  return <div style={{position: 'absolute', left: 52, top, width, transform: 'translateY(' + ((1 - p) * 55) + 'px) scale(' + (0.9 + 0.1 * p) + ')', opacity: Math.max(0.45, Math.min(1, p * 1.5)), transformOrigin: 'left center'}}>
    <div style={{fontFamily: ANTON, fontSize: size, lineHeight: 0.95, color, letterSpacing: 1, textShadow: '0 7px 0 rgba(0,0,0,0.35)'}}>{title}</div>
    {sub ? <div style={{fontFamily: UI, fontWeight: 600, fontSize: 28, lineHeight: 1.12, color: '#d6d8dc', marginTop: 13}}>{sub}</div> : null}
  </div>;
};

const Sfx: React.FC<{at: number; file: string; volume?: number}> = ({at, file, volume = 0.65}) => <Sequence from={at} durationInFrames={45} layout="none"><Audio src={staticFile('sfx/' + file + '.wav')} volume={volume} /></Sequence>;

const Body: React.FC = () => {
  const f = useCurrentFrame();
  const {t, w} = useT();
  const a = {
    oval: w('o1', 'president'), fight: w('o1', 'fight'), signs: w('o1', 'signs'), single: w('o1', 'single'), see: w('o1', 'see'), muslim: w('o1', 'Muslim'),
    senate: w('o2', 'Senate'), michigan: w('o2', 'Michigan'), trump: w('o2', 'Trump'), loyalty: w('o2', 'loyalty'), attacks: w('o2', 'attacks'), baseless: w('o2', 'baseless'),
    medicare: w('o3', 'Medicare'), corporate: w('o3', 'corporate'), future: w('o3', 'future'), insurers: w('o3', 'insurers'), fight3: w('o3', 'fight'),
    promises: w('o4', 'promises'), congress: w('o4', 'Congress'), pass: w('o4', 'pass'), wall: w('o4', 'wall'), overnight: w('o4', 'overnight'), bigger: w('o5', 'bigger'), country: w('o5', 'country'), govern: w('o5', 'govern')
  };
  const photos = [
    {at: 0, id: 'abdul', label: 'THE HYPOTHETICAL'},
    {at: a.oval, id: 'white_house', label: 'THE OVAL OFFICE'},
    {at: a.trump, id: 'trump_rally', label: 'THE REAL POLITICAL CLIMATE'},
    {at: a.medicare, id: 'hospital', label: 'HEALTHCARE'},
    {at: a.insurers, id: 'insurance', label: 'PRIVATE INSURANCE'},
    {at: a.congress, id: 'capitol', label: 'CONGRESS'}
  ].sort((x, y) => x.at - y.at);
  let photo = photos[0];
  for (const p of photos) if (p.at <= f) photo = p;
  const worlds: {at: number; mode: Mode}[] = [
    {at: 0, mode: 'oval'}, {at: a.senate, mode: 'press'}, {at: a.trump, mode: 'press'},
    {at: a.medicare, mode: 'hospital'}, {at: a.insurers, mode: 'insurance'},
    {at: a.congress, mode: 'capitol'}, {at: a.govern, mode: 'finale'}
  ];
  let world: Mode = 'oval';
  for (const s of worlds) if (s.at <= f) world = s.mode;
  const keys: PKey[] = [
    {at: 0, pose: 'point_l', face: 'talk'}, {at: a.fight, pose: 'panic', face: 'shock'},
    {at: a.signs, pose: 'point_r', face: 'angry'}, {at: a.single, pose: 'shrug', face: 'think'}, {at: a.see, pose: 'think', face: 'sad'}, {at: a.muslim, pose: 'facepalm', face: 'sad'},
    {at: a.senate, pose: 'present_l', face: 'neutral'}, {at: a.michigan, pose: 'point_l', face: 'talk'},
    {at: a.trump, pose: 'point_r', face: 'angry'}, {at: a.loyalty, pose: 'panic', face: 'shock'}, {at: a.attacks, pose: 'shrug', face: 'sad'}, {at: a.baseless, pose: 'think', face: 'neutral'},
    {at: a.medicare, pose: 'point_l', face: 'talk'}, {at: a.corporate, pose: 'present_l', face: 'smug'}, {at: a.future, pose: 'think', face: 'spiral'}, {at: a.insurers, pose: 'facepalm', face: 'think'}, {at: a.fight3, pose: 'panic', face: 'shock'},
    {at: a.promises, pose: 'facepalm', face: 'sad'}, {at: a.congress, pose: 'point_up', face: 'shock'}, {at: a.pass, pose: 'point_r', face: 'angry'}, {at: a.wall, pose: 'panic', face: 'x_eyes'}, {at: a.overnight, pose: 'shrug', face: 'think'},
    {at: a.bigger, pose: 'think', face: 'neutral'}, {at: a.country, pose: 'point_l', face: 'talk'}, {at: a.govern, pose: 'think', face: 'neutral'}
  ];
  const labels = [
    {at: 0, title: 'WHAT IF HE WON?', sub: 'A hypothetical presidency', color: K.yellow},
    {at: a.fight, title: 'THE FIRST FIGHT', sub: 'Before a single law is signed', color: K.white},
    {at: a.senate, title: 'NOT A PRESIDENTIAL CANDIDATE', sub: 'He is running for Michigan Senate', color: K.blue},
    {at: a.trump, title: 'A REAL POLITICAL ATTACK', sub: 'Trump questioned his loyalty', color: K.red},
    {at: a.medicare, title: 'MEDICARE FOR ALL', sub: 'A central campaign position', color: K.green},
    {at: a.insurers, title: 'WHO PAYS FOR CARE?', sub: 'A possible fight over the system', color: K.yellow},
    {at: a.congress, title: 'CONGRESS HAS TO VOTE', sub: 'The president cannot do it alone', color: K.red},
    {at: a.wall, title: 'THE OVAL OFFICE IS NOT A MAGIC WAND', sub: 'A bill still needs Congress', color: K.white},
    {at: a.govern, title: 'COULD HE GOVERN?', sub: 'Would America and Congress let him?', color: K.yellow}
  ];
  let label = labels[0];
  for (const c of labels) if (c.at <= f) label = c;
  const duration = Math.ceil((t.total + 1.2) * 30);
  const close = f >= a.govern;
  return <AbsoluteFill style={{background: K.bg, overflow: 'hidden'}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 45% 35%, #2c3440 0%, #11151b 75%)'}} />
    <DaveStage f={f} keys={keys} mode={world} close={close} gagAt={a.wall} />
    {!close ? <PhotoPlate f={f} at={photo.at} id={photo.id} label={photo.label} /> : null}
    <Kinetic f={f} at={label.at} title={label.title} sub={label.sub} color={label.color} top={close ? 190 : 960} width={close ? 940 : 520} size={close ? 76 : 58} />
    {f >= a.wall && f < a.wall + 24 ? <ComicBurst f={f} at={a.wall} top="THE BILL" word="BOUNCES" x={520} y={530} color={K.red} /> : null}
    <Threshold f={f} at={a.trump} n={1}><WhiteFlash f={f} at={a.trump} n={1} /></Threshold>
    <Sfx at={0} file="boom" volume={0.9} />
    <Sfx at={a.oval} file="whoosh" />
    <Sfx at={a.fight} file="thud" volume={0.55} />
    <Sfx at={a.trump} file="sting" volume={0.75} />
    <Sfx at={a.medicare} file="whoosh" volume={0.5} />
    <Sfx at={a.insurers} file="cash" volume={0.55} />
    <Sfx at={a.congress} file="stamp" volume={0.75} />
    <Sfx at={a.wall} file="boom" volume={0.65} />
    <Sfx at={a.govern} file="chime" volume={0.5} />
    <Audio src={staticFile('short61/voice.wav')} />
    <Audio src={staticFile('music/bgm.mp3')} volume={0.065} loop />
    <div style={{position: 'absolute', right: 38, bottom: 40, fontFamily: UI, fontSize: 18, fontWeight: 700, color: '#777f8c', letterSpacing: 4}}>MONEYWORKS</div>
  </AbsoluteFill>;
};

export type Short61Props = {timings: Timings | null};
export const Short61: React.FC<Short61Props> = ({timings}) => timings ? <TimingProvider t={timings}><Body /></TimingProvider> : null;
