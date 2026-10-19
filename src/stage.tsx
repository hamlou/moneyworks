import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from './theme';
import {useT} from './timing';
import {pop} from './anim';
import {Expr, Stick} from './Stick';
import {speechKeys} from './upgrade';
import {Board, ChapterCard, Captions, Cue, Interior, Progress, SceneItem, Scenes, Sfx, Svg, Vignette, SubReminder, subCues} from './fx';
import {Bubble, MoneyStack, Text} from './props';
import {Phone, Sign} from './props2';
import {Laptop} from './props26';
import {Notif} from './props38';

// Lean body for host-led episodes: Dave acts each beat (mood/pose from the JSON) next to one story prop.
// The upgrade layer adds host shots, photos, memes, slams, cards and sfx on top.
export type Prop = {phone?: {title?: string; value: string; color?: string}; notif?: {title: string; body: string}; bubble?: string; money?: number; laptop?: string; sign?: string; title?: string; room?: boolean};
type Beat = {id: string; start: number; end: number; mood?: string; pose?: string; words: {start: number; end: number}[]};

export const Stage: React.FC<{props: Record<string, Prop>; sub: string}> = ({props, sub}) => {
  const f = useCurrentFrame();
  const {t, fr, bs} = useT();
  const beats = t.beats as unknown as Beat[];
  const S: SceneItem[] = [];
  const cues: Cue[] = [];
  let cur: Prop = {};
  beats.forEach((b, i) => {
    if (props[b.id]) cur = props[b.id];
    const p = cur;
    const at = Math.max(0, fr(b.start) - 4);
    const changed = !!props[b.id] || i === 0;
    S.push({
      at,
      el: () => (
        <AbsoluteFill>
          {p.room ? <Interior /> : <Board />}
          <Svg>
            <ellipse cx={560} cy={985} rx={190} ry={26} fill="rgba(0,0,0,0.15)" />
            <Stick big seed={7} f={f} x={560} y={990} s={1.55} keys={speechKeys(b.words, at, b.pose ?? 'talk', (b.mood ?? 'happy') as Expr, 0.5, 'idle')} />
            {p.title && <Text x={1300} y={150} size={58} color={C.ink}>{p.title}</Text>}
            {p.phone && <Phone x={1300} y={560} s={1.25 * (changed ? pop(f, at) : 1)} title={p.phone.title} value={p.phone.value} color={p.phone.color ?? C.red} />}
            {p.laptop && <Laptop x={1300} y={600} s={1.3 * (changed ? pop(f, at) : 1)} screen={p.laptop} />}
            {p.money !== undefined && <MoneyStack x={1300} y={700} s={1.2 * (changed ? pop(f, at) : 1)} n={p.money} />}
            {p.sign && <Sign x={1300} y={420} s={1.1 * (changed ? pop(f, at) : 1)} text={p.sign} />}
            {p.notif && <Notif x={1300} y={300} s={changed ? pop(f, at + 6) : 1} title={p.notif.title} body={p.notif.body} hl={1} />}
            {p.bubble && <Bubble x={900} y={330} s={changed ? pop(f, at + 8) : 1} text={p.bubble} size={44} tail="left" />}
          </Svg>
        </AbsoluteFill>
      ),
    });
  });
  const SUB = bs(sub);
  subCues(SUB).forEach((c) => cues.push(c));
  return (
    <AbsoluteFill>
      <Scenes f={f} items={S} />
      <Vignette />
      <Progress f={f} t={t} />
      <ChapterCard f={f} t={t} />
      <SubReminder f={f} at={SUB} Dave={<Stick big seed={7} f={f} x={0} y={200} s={0.6} keys={[{at: 0, pose: 'point_r', expr: 'grin', look: 0.8}]} />} />
      <Captions f={f} t={t} />
      <Sfx cues={cues} />
    </AbsoluteFill>
  );
};
