import React, {useLayoutEffect} from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {TimingProvider, Timings, useT} from '../timing';
import {DaveT, K, UI, snap} from '../v6/kit';

const W = 1080;
const H = 1920;

const Camera: React.FC = () => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    camera.position.set(0, 1.75, 12);
    camera.lookAt(0, 1.75, 0);
    (camera as any).fov = 24;
    camera.updateProjectionMatrix();
  });
  return null;
};

const DaveStage: React.FC<{f: number; keys: any[]}> = ({f, keys}) => (
  <ThreeCanvas width={W} height={H} style={{position: 'absolute', inset: 0}} gl={{antialias: true, alpha: true, preserveDrawingBuffer: true}} camera={{fov: 24, position: [0, 1.75, 12], near: 0.1, far: 100}}>
    <Camera />
    <ambientLight intensity={0.9} />
    <directionalLight position={[4, 7, 6]} intensity={2.5} />
    <directionalLight position={[-5, 3, 2]} intensity={0.7} color="#c8d9ff" />
    <DaveT f={f} keys={keys} position={[0.75, -0.72, 0]} scale={0.82} />
  </ThreeCanvas>
);

const PhotoPlate: React.FC<{f: number; at: number; id: string}> = ({f, at, id}) => {
  const k = Math.max(0, f - at);
  const z = interpolate(k, [0, 150], [1.12, 1.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const op = interpolate(k, [0, 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 42, top: 90, width: 996, height: 1110, overflow: 'hidden', borderRadius: 28, opacity: op, border: '2px solid #34363d', boxShadow: '0 24px 70px rgba(0,0,0,0.45)'}}>
      <Img src={staticFile('photos/short61/' + id + '.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(' + z + ')', filter: 'saturate(1.08) contrast(1.05)'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.04) 35%, rgba(0,0,0,0.55) 100%)'}} />
    </div>
  );
};

const Callout: React.FC<{f: number; at: number; title: string; sub?: string; color?: string}> = ({f, at, title, sub, color = K.white}) => {
  if (f < at) return null;
  const p = snap(f, at, 7);
  return (
    <div style={{position: 'absolute', left: 58, top: 1190, width: 650, transform: 'translateY(' + ((1 - p) * 28) + 'px) scale(' + (0.94 + 0.06 * p) + ')', transformOrigin: 'left center', opacity: Math.min(1, p * 1.5)}}>
      <div style={{fontFamily: UI, fontWeight: 700, fontSize: 29, letterSpacing: 4, color: K.grey, marginBottom: 12}}>MONEYWORKS / THE HYPOTHETICAL</div>
      <div style={{fontFamily: UI, fontWeight: 700, fontSize: 66, lineHeight: 0.98, color, textShadow: '0 5px 0 rgba(0,0,0,0.35)'}}>{title}</div>
      {sub ? <div style={{fontFamily: UI, fontWeight: 500, fontSize: 30, lineHeight: 1.15, color: '#b8bbc2', marginTop: 16}}>{sub}</div> : null}
    </div>
  );
};

const Sfx: React.FC<{at: number; file: string; volume?: number}> = ({at, file, volume = 0.8}) =>
  at < 0 ? null : <Sequence from={at} durationInFrames={50} layout="none"><Audio src={staticFile('sfx/' + file + '.wav')} volume={volume} /></Sequence>;

const Body: React.FC = () => {
  const f = useCurrentFrame();
  const {t, w} = useT();
  const anchors = {
    oval: w('o1', 'Oval'),
    trump: w('o2', 'Trump'),
    baseless: w('o2', 'baseless'),
    medicare: w('o3', 'Medicare'),
    insurers: w('o3', 'insurers'),
    congress: w('o4', 'Congress'),
    accept: w('o4', 'accept')
  };

  const shots = [
    {at: 0, id: 'abdul'},
    {at: anchors.oval, id: 'white_house'},
    {at: anchors.trump, id: 'trump_rally'},
    {at: anchors.medicare, id: 'hospital'},
    {at: anchors.insurers, id: 'insurance'},
    {at: anchors.congress, id: 'capitol'}
  ].sort((a, b) => a.at - b.at);
  let shot = shots[0];
  for (const s of shots) if (s.at <= f) shot = s;

  const keys = [
    {at: 0, pose: 'point_r', face: 'think'},
    {at: anchors.oval, pose: 'present_l', face: 'neutral'},
    {at: anchors.trump, pose: 'point_l', face: 'angry'},
    {at: anchors.baseless, pose: 'shrug', face: 'sad'},
    {at: anchors.medicare, pose: 'point_r', face: 'talk'},
    {at: anchors.insurers, pose: 'facepalm', face: 'think'},
    {at: anchors.congress, pose: 'point_up', face: 'shock'},
    {at: anchors.accept, pose: 'think', face: 'neutral'}
  ];

  const cards = [
    {at: 0, title: 'THE FIRST FIGHT?', sub: 'A hypothetical presidency'},
    {at: anchors.oval, title: 'THE OVAL OFFICE', sub: 'What if he won?'},
    {at: anchors.trump, title: 'A REAL POLITICAL ATTACK', sub: 'Reported October 25 2026', color: K.red},
    {at: anchors.baseless, title: 'HE CALLED IT BASELESS', sub: 'El-Sayed rejected the accusations'},
    {at: anchors.medicare, title: 'MEDICARE FOR ALL', sub: 'A central campaign promise', color: K.green},
    {at: anchors.insurers, title: 'WHO PAYS FOR CARE?', sub: 'A fight over the healthcare system', color: K.yellow},
    {at: anchors.congress, title: 'CONGRESS MUST VOTE', sub: 'A president cannot do it alone', color: K.red},
    {at: anchors.accept, title: 'WOULD AMERICA ACCEPT HIM?', sub: 'That is the first fight'}
  ];
  let card = cards[0];
  for (const c of cards) if (c.at <= f) card = c;

  const d = Math.ceil((t.total + 1.1) * 30);
  return (
    <AbsoluteFill style={{background: K.bg, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 45% 30%, #272a31 0%, #17181b 72%)'}} />
      <div style={{position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '34px 34px'}} />
      <PhotoPlate f={f} at={shot.at} id={shot.id} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1130, height: 790, background: 'linear-gradient(180deg, rgba(23,24,27,0) 0%, #17181b 16%)'}} />
      <Callout f={f} at={card.at} title={card.title} sub={card.sub} color={card.color} />
      <DaveStage f={f} keys={keys} />
      <div style={{position: 'absolute', left: 58, bottom: 58, fontFamily: UI, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: '#858992'}}>MONEYWORKS</div>
      <Sfx at={0} file="boom" volume={0.8} />
      <Sfx at={anchors.trump} file="sting" />
      <Sfx at={anchors.medicare} file="whoosh" volume={0.55} />
      <Sfx at={anchors.congress} file="stamp" />
      <Sfx at={anchors.accept} file="chime" volume={0.65} />
      <Audio src={staticFile('short61/voice.wav')} />
      <Audio src={staticFile('music/bgm.mp3')} volume={0.085} loop />
      <div style={{position: 'absolute', right: 44, bottom: 55, width: 210, height: 5, background: '#34363d', borderRadius: 4}}>
        <div style={{height: 5, width: (f / d * 100) + '%', background: K.green, borderRadius: 4}} />
      </div>
    </AbsoluteFill>
  );
};

export type Short61Props = {timings: Timings | null};
export const Short61: React.FC<Short61Props> = ({timings}) => {
  if (!timings) return null;
  return <TimingProvider t={timings}><Body /></TimingProvider>;
};
