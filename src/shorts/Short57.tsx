import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop, shake} from '../anim';
import {Stick} from '../Stick';
import {G, Text, Stamp, Bubble, Paper, MoneyStack} from '../props';
import {SendApp, DinnerTable, GuessCard57, OnePage, GiftBox57} from '../props57';

const W = 1080;
const H = 1920;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
const Dave: React.FC<any> = (p) => <Stick acc={['hair']} seed={7} {...p}/>;
const Danny: React.FC<any> = (p) => <Stick acc={['shades']} seed={57} {...p}/>;
const Room: React.FC<{street?: boolean}> = ({street=false}) => <Svg>
  <rect width={W} height={H} fill={C.bg}/>
  <rect y={0} width={W} height={1180} fill={street ? C.sky : C.wall}/>
  <rect y={900} width={W} height={286} fill={C.wallDark} opacity={0.45}/>
  <rect y={1180} width={W} height={H-1180} fill={street ? C.ground : C.floor}/>
  <rect y={1176} width={W} height={10} fill="#C7B592"/>
</Svg>;

const Captions: React.FC<{f:number}> = ({f}) => {
 const {t}=useT(); const sec=f/30; const beats=t.beats; let idx=0;
 for(let i=0;i<beats.length;i++){if(beats[i].start<=sec) idx=i; else break;}
 const b=beats[idx]; const next=beats[idx+1]?.start ?? t.total;
 if(!b || sec>=next-0.02) return null;
 const entrance=pop(f-Math.round(b.start*30),0,12,260); let active=0;
 b.words.forEach((w:any,i:number)=>{if(w.start<=sec) active=i;});
 return <AbsoluteFill style={{alignItems:'center',justifyContent:'flex-end',padding:'0 46px 110px'}}>
  <div style={{transform:`translateY(${(1-entrance)*20}px)`,opacity:entrance,fontFamily:FONT,fontWeight:700,fontSize:48,lineHeight:1.22,textAlign:'center',color:'#fff',WebkitTextStroke:`9px ${C.ink}`,paintOrder:'stroke' as any}}>
   {b.words.map((w:any,i:number)=><span key={i} style={{color:i===active?'#FFD166':'#fff',margin:'0 8px',display:'inline-block'}}>{w.text}</span>)}
  </div>
 </AbsoluteFill>;
};
const Progress: React.FC<{f:number;d:number}> = ({f,d}) => <div style={{position:'absolute',left:0,right:0,bottom:0,height:10,background:'rgba(0,0,0,0.08)'}}><div style={{height:'100%',width:`${f/d*100}%`,background:C.green}}/></div>;

const Body: React.FC = () => {
 const f=useCurrentFrame(); const {t,bs,w}=useT(); const d=Math.round(t.total*30);
 const A=(id:string)=>Math.max(0,bs(id)-4); const P=(at:number)=>pop(f,at+2);
 const scenes:{at:number;el:()=>React.ReactNode}[]=[];
 const scene=(at:number,el:()=>React.ReactNode)=>scenes.push({at,el});
 scene(0,()=> <AbsoluteFill><Room/><Svg>
  <Stamp x={W/2} y={220} text="THANKSGIVING" color={C.navy} size={54} r={-3}/>
  <Dave f={f} x={270} y={1450} s={1.45} keys={[{at:0,pose:'point_r',expr:'worried',look:0.5},{at:bs('o1')+18,pose:'shock',expr:'shock'}]}/>
  <Danny f={f} x={820} y={1450} s={1.4} keys={[{at:0,pose:'hold',expr:'happy',look:-0.5},{at:bs('o1')+65,pose:'shock',expr:'shock'}]}/>
  <DinnerTable x={W/2} y={1170} s={0.72}/>
  <G x={W/2} y={620} s={P(0)}><Bubble text={f>bs('o1')+50?'I thought it was a gift!':'So... my $3,000?'} size={43} tail="left"/></G>
 </Svg></AbsoluteFill>);
 scene(A('o2'),()=> <AbsoluteFill><Room street/><Svg>
  <Stamp x={W/2} y={220} text="APRIL · REWIND" color={C.navy} size={50}/>
  <Danny f={f} x={250} y={1450} s={1.3} keys={[{at:0,pose:'panic',expr:'worried'}]}/>
  <Dave f={f} x={W-250} y={1450} s={1.3} keys={[{at:0,pose:'present',expr:'sad'}]}/>
  <SendApp x={W/2} y={760} s={0.62*P(A('o2'))} amount="$3,000" sent={f>bs('o2')+45?1:0} memo={f>bs('o2')+70?1:0}/>
  <G x={W/2} y={250} s={P(A('o2')+25)}><Stamp text="PIZZA EMOJI = CONTRACT?" color={C.red} size={34}/></G>
 </Svg></AbsoluteFill>);
 scene(A('c1'),()=> <AbsoluteFill><Room/><Svg>
  <Dave f={f} x={W/2} y={1460} s={1.45} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/>
  <G x={W/2} y={560} s={P(A('c1'))}><Paper id="bill-list" reveal={1} w={600} h={360} text={'CAR PAID ✓\nPHONE PAID ✓\nCARD PAID ✓\nDAVE: $0'} size={45}/></G>
  <Stamp x={W/2} y={170} text="EVERYONE BUT DAVE" color={C.red} size={48}/>
 </Svg></AbsoluteFill>);
 scene(A('c2'),()=> <AbsoluteFill><Room/><Svg>
  <Stamp x={W/2} y={180} text="THE PAYDAY LINE" color={C.navy} size={52}/>
  {['LANDLORD','CAR LOAN','PHONE','CREDIT CARD'].map((v,i)=><G key={v} x={150+i*260} y={660} s={0.72}><Paper id={`queue-${i}`} reveal={1} w={240} h={230} text={v} size={30}/><Text y={185} size={28} color={C.red}>{'#'+(i+1)}</Text></G>)}
  <Dave f={f} x={W/2} y={1450} s={1.3} keys={[{at:0,pose:'shrug',expr:'worried'}]}/>
  <G x={W/2} y={1120} s={P(A('c2')+15)}><Stamp text="DAVE: LAST IN LINE" color={C.red} size={43}/></G>
 </Svg></AbsoluteFill>);
 scene(A('c3'),()=> <AbsoluteFill><Room/><Svg>
  <G x={W/2} y={700} s={0.95*P(A('c3'))}><GuessCard57 f={f} answer={f>bs('c3')+55?'44%':undefined}/></G>
  <Dave f={f} x={W/2} y={1510} s={1.2} keys={[{at:0,pose:'shock',expr:'shock'}]}/>
  <Stamp x={W/2} y={190} text="BANKRATE · 2025" color={C.navy} size={38}/>
 </Svg></AbsoluteFill>);
 scene(A('c4'),()=> <AbsoluteFill><Room/><Svg>
  <Danny f={f} x={W/2} y={1450} s={1.4} keys={[{at:0,pose:'think',expr:'worried'}]}/>
  <G x={W/2} y={600} s={P(A('c4'))}><Bubble text="I have bills too..." size={46} tail="left"/></G>
  <Stamp x={W/2} y={190} text="NOT A VILLAIN. NO PLAN." color={C.red} size={40}/>
 </Svg></AbsoluteFill>);
 scene(A('c5'),()=> <AbsoluteFill><Room/><Svg>
  <Dave f={f} x={260} y={1450} s={1.25} keys={[{at:0,pose:'think',expr:'worried'}]}/>
  <G x={W/2+190} y={680} s={0.8*P(A('c5'))}><Paper id="irs-proof" reveal={1} w={540} h={500} text={'IRS · TOPIC 453\n\nPROVE IT WAS A LOAN\n\nWRITTEN NOTE\nREPAYMENT SCHEDULE'} size={33}/></G>
  <Stamp x={W/2} y={180} text="A PIZZA EMOJI ISN'T PROOF" color={C.red} size={36}/>
 </Svg></AbsoluteFill>);
 scene(A('c6'),()=> <AbsoluteFill><Room/><Svg>
  <Dave f={f} x={250} y={1450} s={1.25} keys={[{at:0,pose:'present',expr:'happy'}]}/>
  <Danny f={f} x={830} y={1450} s={1.25} keys={[{at:0,pose:'typing',expr:'happy'}]}/>
  <G x={W/2} y={650} s={0.72*P(A('c6'))}><OnePage lines={['$3,000 TOTAL','$125 / MONTH','DAY AFTER PAYDAY','24 MONTHS']} shown={f>bs('c6')+25?4:2} signA={f>bs('c6')+60?1:0} signB={f>bs('c6')+75?1:0}/></G>
  <G x={W/2} y={200} s={P(A('c6')+45)}><Stamp text="AUTO-PAY ON" color={C.green} size={42}/></G>
 </Svg></AbsoluteFill>);
 scene(A('c7'),()=> <AbsoluteFill><Room/><Svg>
  <Dave f={f} x={W/2} y={1430} s={1.4} keys={[{at:0,pose:'point_up',expr:'happy'}]}/>
  <G x={W/2} y={530} s={P(A('c7'))}><Stamp text="GIFT OR LOAN?" color={C.green} size={68}/></G>
  <G x={W/2} y={790} s={P(A('c7')+20)}><Paper w={650} h={240} text={'IF LOAN: WRITE IT DOWN\nIF GIFT: ONLY WHAT YOU CAN LOSE'} size={32}/></G>
 </Svg></AbsoluteFill>);

 let current=-1; scenes.sort((a,b)=>a.at-b.at).forEach((s,i)=>{if(s.at<=f)current=i;});
 const cur=scenes[Math.max(0,current)]; const prev=current>0 && f<cur.at+9?scenes[current-1]:null; const op=ease(f,cur.at,cur.at+8);
 return <AbsoluteFill style={{background:C.bg}}>
  {prev&&<AbsoluteFill>{prev.el()}</AbsoluteFill>}
  <AbsoluteFill style={{opacity:op,transform:`scale(${1.04-0.04*op})`}}>{cur.el()}</AbsoluteFill>
  <AbsoluteFill><Svg><Text x={W/2} y={100} size={34} color={C.navy} ls={3}>MONEYWORKS · DAVE'S MONEY SHORTS</Text></Svg></AbsoluteFill>
  <Captions f={f}/><Progress f={f} d={d}/>
  <Audio src={staticFile('short57/voice.wav')}/>
  <Audio src={staticFile('music/bgm.mp3')} volume={(x:number)=>interpolate(x,[0,30,d-40,d],[0,0.075,0.075,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} loop/>
 </AbsoluteFill>;
};
export type Short57Props={timings:Timings|null};
export const Short57:React.FC<Short57Props>=({timings})=>timings?<TimingProvider t={timings}><Body/></TimingProvider>:null;
