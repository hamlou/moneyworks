import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {ease, pop, shake} from '../anim';
import {Stick} from '../Stick';
import {G, Text, Stamp, Bubble, Paper} from '../props';
import {SendApp, DinnerTable, GuessCard57, OnePage, DamageMeter57} from '../props57';
import {CreditCard, SubButton, Bell} from '../props2';
import {Pic} from '../photo';

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
 const cur=s[i]; const prev=i>0&&f<cur.at+8?s[i-1]:null; const o=ease(f,cur.at,cur.at+7);
 return <>{prev&&<AbsoluteFill>{prev.el()}</AbsoluteFill>}<AbsoluteFill style={{opacity:o,transform:`scale(${1.04-0.04*o})`}}>{cur.el()}</AbsoluteFill></>;
};

const Body:React.FC=()=>{
 const f=useCurrentFrame(); const {t,bs}=useT(); const d=Math.round(t.total*30);
 const A=(id:string)=>Math.max(0,bs(id)-4); const P=(at:number)=>pop(f,at+2);
 const scenes:SceneItem[]=[]; const scene=(at:number,el:()=>React.ReactNode)=>scenes.push({at,el});
 const micro=(beat:string,els:Array<()=>React.ReactNode>)=>{
  const index=t.beats.findIndex(b=>b.id===beat);
  const nextAt=Math.round((t.beats[index+1]?.start ?? t.total)*30);
  const start=Math.max(0,bs(beat)-4);
  const span=Math.max(1,nextAt-start);
  // Each supplied scene is used once only: never loop back to a photo already shown.
  els.forEach((el,i)=>{
   const at=start+Math.round(span*i/els.length);
   scene(at,()=> <AbsoluteFill style={{transform:`scale(${1.012+0.008*Math.sin((f-at)/8)})`}}>{el()}</AbsoluteFill>);
  });
 };
 const photo=(src:string,at:number,x=540,y=600,ww=760,hh=540,look:'polaroid'|'sticker'|'news'|'tape'|'plain'|'circle'='sticker',label?:string,ring=false)=> <Pic f={f} src={`ep57/${src}.jpg`} x={x} y={y} w={ww} h={hh} at={Math.max(0,at)} look={look} enter="slam" rot={-2} kb={0.08} label={label} ring={ring}/>;

 // Hook: real photo first, no Dave; the promise is shown before the explanation.
 micro('o1',[
  ()=> <AbsoluteFill><Room/>{photo('family_meal',0,540,700,840,700,'news','HE PAID EVERYONE ELSE')}<Svg><G x={W/2} y={230} s={P(0)}><Stamp text="$3,000" color={C.red} size={102}/></G><G x={W/2} y={1500} s={P(0)}><Stamp text="YOU GET $0 BACK" color={C.ink} size={52}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/>{photo('bill_paid',Math.max(0,bs('o1')+60),540,640,790,570,'polaroid','EVERY BILL PAID',true)}<Svg><Dave f={f} x={230} y={1470} s={1.0} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/><G x={W/2} y={260} s={P(bs('o1')+60)}><Stamp text="EXCEPT YOURS" color={C.red} size={62}/></G></Svg></AbsoluteFill>
 ]);
 micro('o2',[
  ()=> <AbsoluteFill><Room/>{photo('car_payment',bs('o2'),540,590,790,560,'sticker','CAR PAYMENT CLEARED')}<Svg><Dave f={f} x={250} y={1470} s={0.95} keys={[{at:0,pose:'shock',expr:'shock'}]}/><G x={W/2} y={1260} s={P(bs('o2'))}><Stamp text="PHONE: PAID" color={C.green} size={52}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/>{photo('credit_card_bill',bs('o2')+60,540,590,760,540,'news','CREDIT CARD: PAID')}<Svg><Dave f={f} x={250} y={1470} s={0.95} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/><G x={W/2} y={1280} s={P(bs('o2')+60)}><Stamp text="DAVE: NOTHING" color={C.red} size={54}/></G></Svg></AbsoluteFill>
 ]);
 micro('o3',[
  ()=> <AbsoluteFill><Room/>{photo('repayment_plan',bs('o3'),540,620,740,560,'polaroid','THE FIX')}<Svg><Dave f={f} x={280} y={1480} s={1.05} keys={[{at:0,pose:'think',expr:'worried'}]}/><Danny f={f} x={820} y={1480} s={1.05} keys={[{at:0,pose:'present',expr:'happy'}]}/><G x={W/2} y={1160} s={P(bs('o3'))}><Stamp text="ONE QUESTION" color={C.green} size={48}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={270} y={1460} s={1.05} keys={[{at:0,pose:'point_r',expr:'happy'}]}/><Danny f={f} x={810} y={1460} s={1.05} keys={[{at:0,pose:'wave',expr:'happy'}]}/><G x={W/2} y={700} s={P(bs('o3')+60)}><OnePage lines={['$3,000 TOTAL','$125 / MONTH','BOTH SIGN']} shown={3} signA={1} signB={1}/></G></Svg></AbsoluteFill>
 ]);

 // The money was sent on trust — the pizza emoji is the running gag.
 micro('c1',[
  ()=> <AbsoluteFill><Room street/><Svg><Dave f={f} x={250} y={1460} s={1.18} keys={[{at:0,pose:'present',expr:'sad'}]}/><Danny f={f} x={830} y={1460} s={1.18} keys={[{at:0,pose:'panic',expr:'worried'}]}/><G x={W/2} y={660} s={P(A('c1'))}><SendApp amount="$3,000" sent={f>bs('c1')+25?1:0} memo={f>bs('c1')+40?1:0}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={300} y={1460} s={1.15} keys={[{at:0,pose:'think',expr:'worried'}]}/><G x={760} y={690} s={P(bs('c1')+60)}><Paper id="pizza-contract" text={'CONTRACT\n\nPIZZA EMOJI\n\nDUE DATE: ???'} reveal={1} w={490} h={470} size={58} color={C.red}/></G><G x={W/2} y={230} s={P(bs('c1')+60)}><Stamp text="A PIZZA EMOJI" color={C.red} size={48}/></G></Svg></AbsoluteFill>
 ]);
 micro('c2',[
  ()=> <AbsoluteFill><Room/>{photo('creditor_phone',bs('c2'),540,620,780,560,'sticker','THEY HAVE LEVERAGE')}<Svg><Danny f={f} x={W/2} y={1480} s={1.0} keys={[{at:0,pose:'typing',expr:'neutral'}]}/></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg>{['CAR LOAN','PHONE','CREDIT CARD'].map((v,i)=><G key={v} x={180+i*360} y={650} s={0.72}><Paper id={`paid-${i}`} text={v+'\n\nPAID ✓'} reveal={1} w={300} h={250} size={34} color={C.green}/></G>)}<Danny f={f} x={W/2} y={1470} s={1.05} keys={[{at:0,pose:'thumbs',expr:'smug'}]}/></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={W/2} y={1460} s={1.25} keys={[{at:0,pose:'shrug',expr:'worried'}]}/><G x={W/2} y={620} s={P(bs('c2')+120)}><Bubble text="I can't charge my own brother a late fee..." size={38} w={790}/></G><G x={W/2} y={250} s={P(bs('c2')+120)}><Stamp text="SO DAVE WAITS" color={C.red} size={48}/></G></Svg></AbsoluteFill>
 ]);
 micro('c3',[
  ()=> <AbsoluteFill><Room/>{photo('tire_repair',bs('c3'),540,620,800,580,'news','THE TIRE BLOWS',true)}<Svg><Dave f={f} x={W/2} y={1480} s={1.08} keys={[{at:0,pose:'shock',expr:'shock'}]} sweat/><G x={W/2} y={1160} s={P(bs('c3'))}><Stamp text="+$400 ON HIS CARD" color={C.red} size={42}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={300} y={1460} s={1.1} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/><G x={750} y={800} s={P(bs('c3')+60)}><CreditCard label="DAVE"/></G><G x={W/2} y={340} s={P(bs('c3')+60)}><Stamp text="HIS EMERGENCY FUND: GONE" color={C.red} size={39}/></G></Svg></AbsoluteFill>
 ]);
 micro('c4',[
  ()=> <AbsoluteFill><Room/><Svg><G x={W/2} y={720} s={P(bs('c4'))}><GuessCard57 f={f} answer={f>bs('c4')+70?'44%':undefined}/></G><Dave f={f} x={W/2} y={1480} s={1.05} keys={[{at:0,pose:'think',expr:'think'}]}/><G x={W/2} y={240} s={P(bs('c4'))}><Stamp text="QUICK GUESS" color={C.navy} size={46}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/>{photo('survey_cash',bs('c4')+60,540,610,760,520,'polaroid','44% LOST MONEY')}<Svg><Dave f={f} x={250} y={1460} s={0.98} keys={[{at:0,pose:'shock',expr:'shock'}]}/><G x={W/2} y={1250} s={P(bs('c4')+60)}><Stamp text="NEARLY 1 IN 2" color={C.red} size={50}/></G><G x={W/2} y={1500} s={P(bs('c4')+60)}><Text y={0} size={28} color={C.ink}>Bankrate · 2025</Text></G></Svg></AbsoluteFill>
 ]);
 micro('c5',[
  ()=> <AbsoluteFill><Room/>{photo('empty_wallet',bs('c5'),540,610,680,440,'sticker','BROKE OR AVOIDING?')}<Svg><Danny f={f} x={W/2} y={1450} s={1.12} keys={[{at:0,pose:'think',expr:'worried'}]}/><G x={W/2} y={250} s={P(bs('c5'))}><Stamp text="NOT EVIL. JUST NO PLAN." color={C.red} size={43}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={280} y={1450} s={1.1} keys={[{at:0,pose:'facepalm',expr:'sad'}]}/><Danny f={f} x={820} y={1450} s={1.1} keys={[{at:0,pose:'shrug',expr:'smug'}]}/><G x={W/2} y={650} s={P(bs('c5')+60)}><Paper id="meme-waiting" text={'ME: “PAY ME FRIDAY”\n\nBRO: “NEXT FRIDAY BRO”'} reveal={1} w={790} h={390} size={38} color={C.navy}/></G><G x={W/2} y={250} s={P(bs('c5')+60)}><Stamp text="THE CLASSIC FAMILY MEME" color={C.red} size={36}/></G></Svg></AbsoluteFill>
 ]);
 micro('c6',[
  ()=> <AbsoluteFill><Room/>{photo('loan_note',bs('c6'),540,600,790,560,'news','WRITE IT DOWN')}<Svg><Dave f={f} x={250} y={1470} s={0.98} keys={[{at:0,pose:'point_r',expr:'think'}]}/><G x={W/2} y={1280} s={P(bs('c6'))}><Stamp text="LOAN ≠ GIFT" color={C.red} size={54}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={250} y={1460} s={1.08} keys={[{at:0,pose:'think',expr:'suspicious'}]}/><G x={760} y={700} s={P(bs('c6')+60)}><Paper id="loan-proof" text={'WRITTEN NOTE\n\nREPAYMENT DATES\n\nBOTH SIGN'} reveal={1} w={510} h={480} size={39}/></G><G x={W/2} y={250} s={P(bs('c6')+60)}><Stamp text="PIZZA EMOJI ≠ PROOF" color={C.red} size={37}/></G></Svg></AbsoluteFill>
 ]);
 micro('c7',[
  ()=> <AbsoluteFill><Room/>{photo('signed_agreement',bs('c7'),540,560,760,500,'polaroid','THE NEW AGREEMENT')}<Svg><Dave f={f} x={250} y={1490} s={1.0} keys={[{at:0,pose:'present',expr:'happy'}]}/><Danny f={f} x={820} y={1490} s={1.0} keys={[{at:0,pose:'typing',expr:'happy'}]}/></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={250} y={1480} s={1.0} keys={[{at:0,pose:'present',expr:'happy'}]}/><Danny f={f} x={820} y={1480} s={1.0} keys={[{at:0,pose:'typing',expr:'happy'}]}/><G x={W/2} y={690} s={P(bs('c7')+60)}><OnePage lines={['$3,000 TOTAL','$125 / MONTH','DAY AFTER PAYDAY','24 MONTHS']} shown={f>bs('c7')+85?4:2} signA={f>bs('c7')+105?1:0} signB={f>bs('c7')+120?1:0}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/>{photo('autopay_app',bs('c7')+60,540,610,680,440,'news','AUTOPAY EVERY PAYDAY')}<Svg><Dave f={f} x={280} y={1470} s={1.0} keys={[{at:0,pose:'point_r',expr:'happy'}]}/><Danny f={f} x={820} y={1470} s={1.0} keys={[{at:0,pose:'thumbs',expr:'happy'}]}/></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={300} y={1480} s={1.1} keys={[{at:0,pose:'celebrate',expr:'grin'}]}/><Danny f={f} x={800} y={1480} s={1.1} keys={[{at:0,pose:'thumbs',expr:'happy'}]}/><G x={W/2} y={670} s={P(bs('c7')+120)}><Stamp text="AUTO-PAY ON" color={C.green} size={61}/></G><G x={W/2} y={890} s={P(bs('c7')+120)}><Stamp text="+$125 / MONTH" color={C.green} size={48}/></G></Svg></AbsoluteFill>
 ]);
 micro('c8',[
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={W/2} y={1480} s={1.2} keys={[{at:0,pose:'point_up',expr:'happy'}]}/><G x={W/2} y={650} s={P(bs('c8'))}><Stamp text="GIFT OR LOAN?" color={C.green} size={64}/></G><G x={W/2} y={880} s={P(bs('c8')+40)}><Paper id="rule-card" text={'IF LOAN: WRITE IT DOWN\nIF GIFT: ONLY WHAT YOU CAN LOSE'} reveal={1} w={760} h={300} size={34}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/>{photo('family_reunion',bs('c8')+60,540,630,780,550,'sticker','KEEP THE RELATIONSHIP')}<Svg><Dave f={f} x={W/2} y={1480} s={1.05} keys={[{at:0,pose:'wave',expr:'happy'}]}/></Svg></AbsoluteFill>
 ]);
 micro('c9',[
  ()=> <AbsoluteFill><Room/><Svg><Dave f={f} x={W/2} y={1450} s={1.25} keys={[{at:0,pose:'wave',expr:'happy'}]}/><G x={W/2} y={650} s={P(bs('c9'))}><Stamp text="ONE QUESTION. ONE PAGE." color={C.navy} size={48}/></G></Svg></AbsoluteFill>,
  ()=> <AbsoluteFill><Room/>{photo('bank_transfer',bs('c9')+60,540,590,700,480,'polaroid','MORE MONEY TRAPS')}<Svg><Dave f={f} x={W/2} y={1470} s={1.0} keys={[{at:0,pose:'wave',expr:'happy'}]}/></Svg></AbsoluteFill>
 ]);

 const midStart=bs('c5')+18; const midEnd=midStart+96; const endStart=Math.max(0,d-150);
 const showMid=f>=midStart&&f<midEnd; const showEnd=f>=endStart;
 const subAt=showEnd?endStart:midStart;
 const meterValue=f>=bs('c7')?'+$125/mo':f>=bs('c3')?'-$3,400':'-$3,000';
 const saved=f>=bs('c7');
 return <AbsoluteFill style={{background:C.bg}}>
  <Scenes f={f} items={scenes}/>
  <AbsoluteFill><Svg>
   {f>=0&&<G x={W-160} y={190} s={0.52}><DamageMeter57 value={meterValue} saved={saved} sub={saved?'AUTO-PAY':'FAMILY LOAN'} flash={f>=bs('c3')&&f<bs('c3')+18?1:0}/></G>}
  </Svg></AbsoluteFill>
  {(showMid||showEnd)&&<AbsoluteFill style={{pointerEvents:'none'}}><Svg>
   <G x={W/2-45} y={1120} s={0.82*pop(f,subAt,10,220)}><SubButton done={f>=subAt+62?1:0}/></G>
   <G x={W/2+300} y={1120} s={0.82*pop(f,subAt+5,10,220)}><Bell f={f} ring={1}/></G>
   <G x={W/2} y={970} s={pop(f,subAt+3,10,220)}><Stamp text={showEnd?'NEXT MONEY TRAP?':'ENJOY THESE MONEY STORIES?'} color={C.navy} size={31}/></G>
  </Svg></AbsoluteFill>}
  <Captions f={f}/><Progress f={f} d={d}/>
  <Sfx at={0} file="whoosh" vol={0.7}/>
  <Sfx at={bs('o2')} file="stamp"/>
  <Sfx at={bs('c1')} file="cash"/>
  <Sfx at={bs('c3')} file="thud"/>
  <Sfx at={bs('c4')} file="tick"/>
  <Sfx at={bs('c4')+65} file="stamp"/>
  <Sfx at={bs('c6')} file="paper"/>
  <Sfx at={bs('c7')+110} file="chime"/>
  <Sfx at={midStart} file="ding" vol={0.7}/>
  <Sfx at={endStart} file="ding" vol={0.7}/>
  <Audio src={staticFile('short57/voice.wav')}/>
  <Audio src={staticFile('music/bgm.mp3')} volume={(x:number)=>interpolate(x,[0,30,d-40,d],[0,0.075,0.075,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} loop/>
 </AbsoluteFill>;
};
export type Short57Props={timings:Timings|null};
export const Short57:React.FC<Short57Props>=({timings})=>timings?<TimingProvider t={timings}><Body/></TimingProvider>:null;
