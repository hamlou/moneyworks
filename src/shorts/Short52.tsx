import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop} from '../anim';
import {Stick} from '../Stick';
import {G, Text, Stamp, Bubble, Paper, XMark} from '../props';
import {SubButton, Bell} from '../props2';
import {WebinarLaptop, Mansion, Notebook, CourseTier, GameSword, GameArmor, GameHorse, PayButton, ScreenshotFolder, FTCBadge} from '../props52';

const W = 1080;
const H = 1920;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
const Dave: React.FC<any> = (p) => <Stick acc={['hair']} seed={7} {...p}/>;

const Room: React.FC = () => <Svg>
  <rect width={W} height={H} fill={C.bg}/>
  <rect y={0} width={W} height={1180} fill={C.wall}/>
  <rect y={900} width={W} height={286} fill={C.wallDark} opacity={0.45}/>
  <rect y={1180} width={W} height={H-1180} fill={C.floor}/>
  <rect y={1176} width={W} height={10} fill="#C7B592"/>
</Svg>;

// DamageMeter — ep52 short HUD: tracks the $9,997 Platinum offer until Dave closes it.
const DamageMeter52: React.FC<{x?:number;y?:number;s?:number;value:string;saved?:boolean;flash?:number}> = ({x,y,s,value,saved=false,flash=0}) => (
  <G x={x} y={y} s={s}>
    <rect x={-200+8} y={-80+10} width={400} height={170} rx={22} fill="rgba(35,35,43,0.18)"/>
    <rect x={-200} y={-80} width={400} height={170} rx={22} fill={saved?C.green:flash>0?'#FFE3EA':'#fff'} stroke={C.ink} strokeWidth={6}/>
    <rect x={-200} y={-80} width={400} height={50} rx={22} fill={saved?'#1E8F5E':C.red} stroke={C.ink} strokeWidth={6}/>
    <Text y={-54} size={26} color="#fff" ls={3}>{saved?'DAVE: SAVED IT':'OPEN TAB: PLATINUM'}</Text>
    <Text y={14} size={54} color={saved?'#fff':C.red}>{value}</Text>
  </G>
);

const Captions: React.FC<{f:number}> = ({f}) => {
 const {t}=useT(); const sec=f/30; const beats=t.beats; let idx=0;
 for(let i=0;i<beats.length;i++){if(beats[i].start<=sec) idx=i; else break;}
 const b=beats[idx]; const next=beats[idx+1]?.start ?? t.total;
 if(!b || sec>=next-0.02) return null;
 const entrance=pop(f-Math.round(b.start*30),0,12,260); let active=0;
 b.words.forEach((w:any,i:number)=>{if(w.start<=sec) active=i;});
 return <AbsoluteFill style={{alignItems:'center',justifyContent:'flex-end',padding:'0 42px 100px',pointerEvents:'none'}}>
  <div style={{transform:`translateY(${(1-entrance)*20}px)`,opacity:entrance,fontFamily:FONT,fontWeight:700,fontSize:47,lineHeight:1.2,textAlign:'center',color:'#fff',WebkitTextStroke:`9px ${C.ink}`,paintOrder:'stroke fill' as any}}>
   {b.words.map((w:any,i:number)=><span key={i} style={{color:i===active?'#FFD166':'#fff',margin:'0 7px',display:'inline-block'}}>{w.text}</span>)}
  </div>
 </AbsoluteFill>;
};
const Progress: React.FC<{f:number;d:number}> = ({f,d}) => <div style={{position:'absolute',left:0,right:0,bottom:0,height:10,background:'rgba(0,0,0,0.08)'}}><div style={{height:'100%',width:`${f/d*100}%`,background:C.green}}/></div>;
const Sfx: React.FC<{at:number;file:string;vol?:number}> = ({at,file,vol=1}) => at<0?null:<Sequence from={at} durationInFrames={60} layout="none"><Audio src={staticFile(`sfx/${file}.wav`)} volume={vol}/></Sequence>;

type SceneItem={at:number;el:()=>React.ReactNode};
const Scenes:React.FC<{f:number;items:SceneItem[]}> = ({f,items})=>{
 const s=[...items].sort((a,b)=>a.at-b.at); let i=-1;
 s.forEach((x,k)=>{if(x.at<=f)i=k;});
 if(i<0)return null;
 const cur=s[i]; const prev=i>0&&f<cur.at+8?s[i-1]:null; const o=cur.at===0?1:ease(f,cur.at,cur.at+7);
 return <>{prev&&<AbsoluteFill>{prev.el()}</AbsoluteFill>}<AbsoluteFill style={{opacity:o,transform:`scale(${1.04-0.04*o})`}}>{cur.el()}</AbsoluteFill></>;
};

const Body:React.FC=()=>{
 const f=useCurrentFrame(); const {t,bs}=useT(); const d=Math.round(t.total*30);
 const A=(id:string)=>Math.max(0,bs(id)-4); const P=(at:number)=>pop(f,at+2);
 const bump=(at:number,k=0.1)=>(f<at?1:1+k*Math.sin(Math.PI*Math.min(1,(f-at)/12)));
 const scenes:SceneItem[]=[]; const scene=(at:number,el:()=>React.ReactNode)=>scenes.push({at,el});
 const micro=(beat:string,els:Array<()=>React.ReactNode>)=>{
  const index=t.beats.findIndex(b=>b.id===beat);
  const nextAt=Math.round((t.beats[index+1]?.start ?? t.total)*30);
  const start=Math.max(0,bs(beat)-4);
  const span=Math.max(1,nextAt-start);
  els.forEach((el,i)=>{
   const at=start+Math.round(span*i/els.length);
   scene(at,()=> <AbsoluteFill style={{transform:`scale(${1.012+0.008*Math.sin((f-at)/8)})`}}>{el()}</AbsoluteFill>);
  });
 };

 // HOOK — frame 0 already mid-motion: no real photo was sourceable in this build pass
 // (network to Wikimedia/Unsplash was unavailable), so the highest-contrast drawn asset
 // (the $9,997 pay button) opens the short instead. See short52.md notes for the swap-in step.
 micro('s1',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={1.1*bump(0,0.12)}><PayButton amount="$9,997" hover={1}/></G>
   <G x={W/2} y={260} s={1.1+0.05*Math.sin(f/2)}><Stamp text="2:00 AM" color={C.navy} size={64}/></G>
   <Dave f={f} x={250} y={1500} s={1.1} keys={[{at:0,pose:'panic',expr:'worried'}]}/>
  </Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={1.1}><PayButton amount="$9,997" hover={1}/></G>
   <Dave f={f} x={W/2} y={1480} s={1.15} keys={[{at:0,pose:'shock',expr:'shock'}]}/>
   <G x={W/2} y={1700} s={P(bs('s1')+70)}><Stamp text="ONE TAP AWAY" color={C.red} size={46}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s2',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={0.95*P(A('s2'))}><Mansion/></G>
   <Dave f={f} x={250} y={1480} s={1.0} keys={[{at:0,pose:'shock',expr:'shock'}]}/>
   <G x={W/2} y={1180} s={P(bs('s2')+45)}><Bubble text="I made a million last year" size={38} w={760}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s3',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={820} y={420} s={0.9*P(A('s3'))}><FTCBadge/></G>
   <Dave f={f} x={280} y={1480} s={1.1} keys={[{at:0,pose:'shock',expr:'shock'}]}/>
   <G x={W/2} y={900} s={1.15+0.05*Math.sin(f/2)}><Stamp text="$125,000,000" color={C.red} size={56}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s4',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={560} s={1.1*P(A('s4'))}><WebinarLaptop/></G>
   <Dave f={f} x={W/2} y={1500} s={1.0} keys={[{at:0,pose:'relax',expr:'tired'}]}/>
   <G x={W/2} y={1150} s={P(bs('s4')+65)}><Stamp text="STILL NO SECRET" color={C.navy} size={42}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s5',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={560} s={1.1*P(A('s5'))}><WebinarLaptop timer="0:05" spots={1}/></G>
   <Dave f={f} x={280} y={1480} s={1.0} keys={[{at:0,pose:'panic',expr:'worried'}]}/>
  </Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={1.0*bump(bs('s5')+55,0.1)}><PayButton amount="$1,997"/></G>
   <Dave f={f} x={W/2} y={1480} s={1.05} keys={[{at:0,pose:'present',expr:'worried'}]}/>
   <G x={W/2} y={1700} s={P(bs('s5')+60)}><Stamp text="$1,997 GONE" color={C.red} size={48}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s6',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={290} y={700} s={0.75*bump(A('s6'),0.1)}><CourseTier tier="GOLD"/></G>
   <G x={540} y={700} s={0.75*bump(bs('s6')+15,0.1)}><CourseTier tier="PLATINUM"/></G>
   <G x={790} y={700} s={0.75*bump(bs('s6')+30,0.1)}><CourseTier tier="DIAMOND"/></G>
   <Dave f={f} x={W/2} y={1480} s={1.05} keys={[{at:0,pose:'think',expr:'worried'}]}/>
  </Svg></AbsoluteFill>,
  // Meme beat 1 — original cast + card, recreating the "this is fine" format, never a downloaded image.
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={310} y={620} s={0.85*bump(bs('s6')+55,0.1)}><GameSword/></G>
   <G x={540} y={620} s={0.85*bump(bs('s6')+65,0.1)}><GameArmor/></G>
   <G x={770} y={620} s={0.85*bump(bs('s6')+75,0.1)}><GameHorse/></G>
   <Dave f={f} x={W/2} y={1480} s={1.15} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/>
   <G x={W/2} y={260} s={P(bs('s6')+85)}><Stamp text="STILL THE BEGINNER LEVEL" color={C.red} size={34}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s7',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={0.95*P(A('s7'))}><Mansion label={f>=bs('s7')+55?'VACATION RENTAL':undefined}/></G>
   <Dave f={f} x={250} y={1480} s={1.0} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/>
   <G x={W/2} y={1700} s={P(bs('s7')+65)}><Stamp text="IT'S A RENTAL" color={C.red} size={46}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s8',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={580} s={0.9*P(A('s8'))}><ScreenshotFolder count={1}/></G>
   <Dave f={f} x={W/2} y={1480} s={1.1} keys={[{at:0,pose:'point_up',expr:'suspicious'}]}/>
   <G x={W/2} y={1100} s={P(bs('s8')+40)}><Stamp text="THE ONLY BUSINESS" color={C.navy} size={40}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s9',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={820} y={400} s={0.85*bump(A('s9'),0.1)}><FTCBadge/></G>
   <Dave f={f} x={260} y={1480} s={1.0} keys={[{at:0,pose:'think',expr:'neutral'}]}/>
   <G x={W/2} y={850} s={P(bs('s9')+30)}><Paper id="mobe-quote" text={'"THE PRIMARY THING\nMOBE SELLS IS MORE\nMOBE MEMBERSHIPS"'} reveal={1} w={760} h={420} size={40}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s10',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={0.85*P(A('s10'))}><Notebook lines={6}/></G>
   <Dave f={f} x={280} y={1480} s={1.0} keys={[{at:0,pose:'typing',expr:'think'}]}/>
  </Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg>
   <Dave f={f} x={W/2} y={1480} s={1.2} keys={[{at:0,pose:'shock',expr:'shock'}]}/>
   <G x={W/2} y={780} s={1.1+0.06*Math.sin(f/2)}><Stamp text="$1,997,000" color={C.red} size={58}/></G>
   <G x={W/2} y={1050} s={P(bs('s10')+70)}><Text size={30} color={C.ink}>even if nobody earns a cent</Text></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s11',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={640} s={0.9*P(A('s11'))}><Paper id="risk-free" text={'100%\nRISK FREE'} reveal={1} w={560} h={340} size={54}/></G>
   <G x={W/2} y={640} s={P(bs('s11')+40)}><XMark s={0.6}/></G>
   <Dave f={f} x={250} y={1480} s={1.0} keys={[{at:0,pose:'shrug',expr:'worried'}]}/>
   <G x={W/2} y={1700} s={P(bs('s11')+55)}><Stamp text="0 REFUNDS" color={C.red} size={48}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s12',[
  ()=> <AbsoluteFill><Room/><Svg>
   <Dave f={f} x={W/2} y={1460} s={1.15} keys={[{at:0,pose:'talk',expr:'neutral'},{at:30,pose:'point_up',expr:'suspicious'}]} talk/>
   <G x={W/2} y={760} s={P(bs('s12')+20)}><Bubble text="What did your typical student actually earn?" size={34} w={820}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s13',[
  ()=> <AbsoluteFill><Room/><Svg>
   <Dave f={f} x={W/2} y={1480} s={1.2} keys={[{at:0,pose:'idle',expr:'suspicious'}]}/>
   <G x={W/2} y={760} s={P(bs('s13')+35)}><Stamp text="CLICK." color={C.ink} size={58}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s14',[
  ()=> <AbsoluteFill><Room/><Svg>
   <G x={W/2} y={620} s={0.9}><PayButton amount="$9,997"/></G>
   <G x={W/2} y={620} s={P(bs('s14')+10)}><XMark s={0.55}/></G>
   <Dave f={f} x={W/2} y={1480} s={1.2} keys={[{at:0,pose:'celebrate',expr:'grin'}]}/>
   <G x={W/2} y={1700} s={P(bs('s14')+35)}><Stamp text="$9,997 SAVED" color={C.green} size={52}/></G>
  </Svg></AbsoluteFill>,
 ]);
 micro('s15',[
  ()=> <AbsoluteFill><Room/><Svg>
   <Dave f={f} x={W/2} y={1420} s={1.25} keys={[{at:0,pose:'wave',expr:'happy'}]}/>
   <G x={W/2} y={760} s={P(A('s15'))}><Stamp text="THE QUESTION THAT ENDS THE PITCH" color={C.navy} size={30}/></G>
  </Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg>
   <Dave f={f} x={W/2} y={1420} s={1.25} keys={[{at:0,pose:'point_up',expr:'happy'}]}/>
   <G x={W/2} y={720} s={P(bs('s15')+60)}><Stamp text="FULL STORY" color={C.navy} size={52}/></G>
   <G x={W/2} y={860} s={P(bs('s15')+60)}><Text size={60} color={C.red}>↓</Text></G>
  </Svg></AbsoluteFill>,
 ]);

 const midStart=bs('s9')+10; const midEnd=midStart+90; const endStart=Math.max(0,bs('s15'));
 const showMid=f>=midStart&&f<midEnd; const showEnd=f>=endStart;
 const subAt=showEnd?endStart:midStart;
 const meterValue=f>=bs('s14')?'$0':f>=bs('s5')?'$9,997':'$9,997';
 const saved=f>=bs('s14');
 return <AbsoluteFill style={{background:C.bg}}>
  <Scenes f={f} items={scenes}/>
  <AbsoluteFill><Svg>
   {f>=0&&<G x={W-160} y={190} s={0.52}><DamageMeter52 value={meterValue} saved={saved} flash={f>=bs('s3')&&f<bs('s3')+18?1:0}/></G>}
  </Svg></AbsoluteFill>
  {(showMid||showEnd)&&!showEnd&&<AbsoluteFill style={{pointerEvents:'none'}}><Svg>
   <G x={W/2-45} y={300} s={0.75*pop(f,subAt,10,220)}><SubButton done={f>=subAt+62?1:0}/></G>
   <G x={W/2+280} y={300} s={0.75*pop(f,subAt+5,10,220)}><Bell f={f} ring={1}/></G>
  </Svg></AbsoluteFill>}
  {showEnd&&<AbsoluteFill style={{pointerEvents:'none'}}><Svg>
   <G x={W/2-45} y={1700} s={0.65*pop(f,subAt+30,10,220)}><SubButton done={1}/></G>
   <G x={W/2+260} y={1700} s={0.65*pop(f,subAt+35,10,220)}><Bell f={f} ring={1}/></G>
  </Svg></AbsoluteFill>}
  <Captions f={f}/><Progress f={f} d={d}/>
  <Sfx at={0} file="stamp" vol={0.9}/>
  <Sfx at={bs('s2')} file="thud" vol={0.8}/>
  <Sfx at={bs('s3')} file="stamp"/>
  <Sfx at={bs('s4')} file="whoosh" vol={0.7}/>
  <Sfx at={bs('s5')+55} file="cash"/>
  <Sfx at={A('s6')} file="whoosh" vol={0.6}/>
  <Sfx at={bs('s6')+55} file="pop" vol={0.8}/>
  <Sfx at={bs('s7')+55} file="thud" vol={0.7}/>
  <Sfx at={bs('s8')} file="paper" vol={0.7}/>
  <Sfx at={bs('s9')} file="paper" vol={0.8}/>
  <Sfx at={bs('s10')+40} file="cash"/>
  <Sfx at={bs('s11')+40} file="stamp"/>
  <Sfx at={bs('s12')} file="ding" vol={0.7}/>
  <Sfx at={bs('s13')+35} file="click"/>
  <Sfx at={bs('s14')+10} file="stamp"/>
  <Sfx at={bs('s14')+35} file="chime"/>
  <Sfx at={midStart} file="ding" vol={0.6}/>
  <Sfx at={bs('s15')+60} file="whoosh" vol={0.7}/>
  <Audio src={staticFile('short52/voice.wav')}/>
  <Audio src={staticFile('music/bgm.mp3')} volume={(x:number)=>interpolate(x,[0,30,d-40,d],[0,0.075,0.075,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} loop/>
 </AbsoluteFill>;
};
export type Short52Props={timings:Timings|null};
export const Short52:React.FC<Short52Props>=({timings})=>timings?<TimingProvider t={timings}><Body/></TimingProvider>:null;
