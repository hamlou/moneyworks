import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {pop, ease, shake} from '../anim';
import {Stick} from '../Stick';
import {G, Stamp, Paper} from '../props';
import {Pic} from '../photo';
import {SubButton, Bell} from '../props2';

const W=1080,H=1920;
const Svg:React.FC<{children:React.ReactNode}>=({children})=><svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</Svg>;
const Dave:React.FC<any>=(p)=><Stick acc={['hair']} seed={7} {...p}/>;
const Bob:React.FC<any>=(p)=><Stick acc={['cap']} seed={21} {...p}/>;

const Captions:React.FC<{f:number}>=({f})=>{
 const {t}=useT(); const sec=f/30; let i=0;
 for(let j=0;j<t.beats.length;j++){if(t.beats[j].start<=sec)i=j;else break;}
 const b=t.beats[i], end=t.beats[i+1]?.start??t.total;
 if(!b||sec>=end-0.02)return null;
 let active=0;b.words.forEach((w:any,j:number)=>{if(w.start<=sec)active=j;});
 const groups:any[]=[];let cur:any[]=[];
 b.words.forEach((w:any,j:number)=>{cur.push({...w,j});if(/[,.!?;:]$/.test(w.text)||cur.length>=4){groups.push(cur);cur=[];}});
 if(cur.length)groups.push(cur);
 return <div style={{position:'absolute',left:36,right:36,bottom:105,textAlign:'center',fontFamily:FONT,fontWeight:800,fontSize:42,lineHeight:1.12,pointerEvents:'none',zIndex:20}}>
  {groups.map((g,k)=><div key={k} style={{margin:'4px auto',width:'fit-content',maxWidth:'100%',padding:'3px 10px',background:'rgba(24,27,35,.9)',borderRadius:8,color:'#fff',textShadow:'2px 3px 0 #222'}}>
   {g.map((w:any)=><span key={w.j} style={{color:w.j===active?'#FFD166':'#fff',marginRight:8}}>{w.text}</span>)}
  </div>)}
 </div>;
};

const Backdrop:React.FC=()=> <Svg><rect width={W} height={H} fill={C.navy}/><rect y={1250} width={W} height={670} fill={C.floor}/><path d="M0 1250 H1080" stroke={C.ink} strokeWidth={8}/></Svg>;

const MemeCard:React.FC<{f:number;at:number;id:string;text:string;color?:string}>=({f,at,id,text,color=C.red})=><G x={540+shake(f,at+7,9,3).x} y={1030+shake(f,at+7,9,2).y} s={pop(f,at,10,230)}><Paper id={id} text={text} reveal={1} w={690} h={205} size={31} color={color}/></G>;

type SceneDef={beat:string;photo:string;label:string;meme:string;tag:string;poseA:string;poseB:string};
const DEFINITIONS:SceneDef[]=[
 {beat:'o2',photo:'cat_lamp',label:'THE GLOWING CAT LAMP',meme:'DROPSHIPPING:\nTHE SELLER NEVER TOUCHES IT',tag:'NO INVENTORY',poseA:'present',poseB:'shock'},
 {beat:'o3',photo:'shipping_box',label:'SUPPLIER COST: $12',meme:'SUPPLIER: “PAY ME FIRST.”',tag:'COST #1',poseA:'think',poseB:'typing'},
 {beat:'c1',photo:'credit_card',label:'SALE PRICE: $30',meme:'$30 SALE\nLESS FEES. LESS PRODUCT.',tag:'NOT $30 PROFIT',poseA:'present',poseB:'shrug'},
 {beat:'c2',photo:'phone_ad',label:'AD CLICK: 50¢',meme:'BUYING EYEBALLS\nNOT BUYERS',tag:'COST #2',poseA:'typing',poseB:'panic'},
 {beat:'c3',photo:'ad_dashboard',label:'2 BUYERS OUT OF 100',meme:'50 CLICKS = $25\nONE SALE = A LOSS',tag:'THE MATH HURTS',poseA:'shock',poseB:'facepalm'},
 {beat:'c4',photo:'warehouse',label:'EVERY PLATFORM GETS PAID',meme:'PLATFORMS: PAID ✓\nDAVE: “WAIT… WHAT?”',tag:'WHO TAKES THE RISK?',poseA:'facepalm',poseB:'shrug'},
 {beat:'c5',photo:'returns_box',label:'REFUNDS + CHARGEBACKS',meme:'CUSTOMER: “WHERE IS IT?”\nBANK: “REFUND THEM.”',tag:'COST #3',poseA:'panic',poseB:'shock'},
 {beat:'c6',photo:'calculator',label:'MAX AD COST: $16.80',meme:'PROFIT MARGIN: GONE\nLIKE MY WEEKEND',tag:'CHECK THE NUMBERS',poseA:'think',poseB:'think'},
 {beat:'c7',photo:'product_search',label:'SAME PRODUCT. CHEAPER.',meme:'CUSTOMER FINDS IT FOR LESS\nIN TWO CLICKS',tag:'NO REAL ADVANTAGE',poseA:'suspicious',poseB:'shrug'},
 {beat:'c8',photo:'closed_laptop',label:'ADS TURNED OFF',meme:'SALES ≠ PROFIT\nCOUNT EVERY COST',tag:'LESSON LEARNED',poseA:'celebrate',poseB:'wave'},
];

const PhotoScene:React.FC<{f:number;d:SceneDef;start:number;index:number}>=({f,d,start,index})=>{
 const rel=f-start;
 const poseA=rel<38?d.poseA:rel<78?'talk':rel<120?'facepalm':rel<165?'point_r':'shrug';
 const poseB=rel<42?d.poseB:rel<85?'panic':rel<130?'think':'wave';
 const photoAt=start+2;
 const cardAt=start+22;
 return <AbsoluteFill>
  <Backdrop/>
  <Svg>
   <G x={540} y={240} s={pop(f,start,8,230)}><Stamp text={d.tag} color={index%2?C.green:C.red} size={43}/></G>
  </Svg>
  <Pic f={f} src={`ep56/${d.photo}.jpg`} x={540} y={560} w={700} h={440} at={photoAt} look="sticker" enter="slam" label={d.label} rot={index%2?2:-2} kb={0.12} wob/>
  <Svg>
   <MemeCard f={f} at={cardAt} id={`ep56-meme-${index}`} text={d.meme} color={index%2?C.navy:C.red}/>
   <Dave f={f} x={245} y={1575} s={1.22} walk={rel<34||rel>142} keys={[
    {at:start,pose:d.poseA,expr:index<2?'shock':'worried'},
    {at:start+38,pose:'talk',expr:'angry',talk:true},
    {at:start+78,pose:'facepalm',expr:'sad'},
    {at:start+120,pose:'point_r',expr:'suspicious'},
    {at:start+165,pose:'celebrate',expr:'happy'}
   ]}/>
   <Bob f={f} x={850} y={1575} s={1.12} keys={[
    {at:start,pose:d.poseB,expr:'smug'},
    {at:start+42,pose:'panic',expr:'worried'},
    {at:start+85,pose:'think',expr:'think'},
    {at:start+130,pose:'wave',expr:'happy'},
    {at:start+170,pose:'shrug',expr:'smug'}
   ]}/>
   <G x={540} y={1270} s={pop(f,start+12,8,220)}><Stamp text={index===9?'SALES ARE NOT PROFIT':'DAVE’S FACE SAYS IT ALL'} color={C.ink} size={29}/></G>
  </Svg>
 </AbsoluteFill>;
};

const Hook:React.FC<{f:number}>=({f})=><AbsoluteFill>
 <Backdrop/>
 <Svg>
  <G x={540} y={250} s={1+0.025*Math.sin(f/4)}><Stamp text="$3,000 SALES" color={C.green} size={84}/></G>
  <G x={540} y={480} s={pop(f,5,10,230)}><Stamp text="-$1,546 BANK BALANCE" color={C.red} size={50}/></G>
  <Pic f={f} src="ep56/cat_lamp.jpg" x={540} y={780} w={600} h={370} at={0} look="sticker" enter="slam" label="THE PRODUCT THAT SOLD" rot={-2} kb={0.15}/>
  <MemeCard f={f} at={15} id="ep56-meme-hook" text={'ONLINE STORE: “WE’RE RICH!”\nBANK APP: “ABSOLUTELY NOT.”'}/>
  <Dave f={f} x={235} y={1580} s={1.24} keys={[
   {at:0,pose:'shock',expr:'shock'},
   {at:24,pose:'facepalm',expr:'sad'},
   {at:48,pose:'panic',expr:'worried'},
   {at:72,pose:'point_up',expr:'angry',talk:true},
   {at:100,pose:'shrug',expr:'suspicious'}
  ]}/>
  <Bob f={f} x={850} y={1580} s={1.13} keys={[
   {at:0,pose:'shrug',expr:'smug'},
   {at:30,pose:'think',expr:'think'},
   {at:60,pose:'panic',expr:'shock'},
   {at:90,pose:'facepalm',expr:'sad'}
  ]}/>
 </Svg>
</AbsoluteFill>;

const Body:React.FC=()=>{
 const f=useCurrentFrame();const {t,bs}=useT();const duration=Math.round(t.total*30);
 const scenes:any[]=[{at:0,el:()=> <Hook f={f}/>},...DEFINITIONS.map((d,index)=>({at:Math.max(0,bs(d.beat)-4),el:()=> <PhotoScene f={f} d={d} index={index} start={Math.max(0,Math.round(bs(d.beat)*30)-4)}/> }))];
 let current=scenes[0];for(const s of scenes){if(s.at<=f)current=s;}
 const mid=Math.max(0,bs('c5')+28),end=Math.max(0,duration-130);
 const midShow=f>=mid&&f<mid+78,endShow=f>=end;
 const subAt=endShow?end:mid;
 return <AbsoluteFill style={{background:C.bg}}>
  <AbsoluteFill style={{transform:`scale(${1+0.006*Math.sin(f/11)})`}}>{current.el()}</AbsoluteFill>
  {(midShow||endShow)&&<Svg><G x={540} y={1190} s={0.72*pop(f,subAt,10,220)}><SubButton done={f>subAt+50?1:0}/></G><G x={820} y={1190} s={0.7*pop(f,subAt+4,10,220)}><Bell f={f} ring={1}/></G><G x={540} y={1090} s={pop(f,subAt+2,8,220)}><Stamp text={endShow?'NEXT MONEY TRAP?':'MORE MONEY STORIES?' } color={C.navy} size={31}/></G></Svg>}
  <Captions f={f}/>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:9,background:'#2222',zIndex:21}}><div style={{height:'100%',width:`${100*f/duration}%`,background:C.green}}/></div>
  <Sequence from={0} durationInFrames={60}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.7}/></Sequence>
  <Sequence from={Math.max(0,mid)} durationInFrames={60}><Audio src={staticFile('sfx/ding.wav')} volume={0.7}/></Sequence>
  <Sequence from={Math.max(0,end)} durationInFrames={60}><Audio src={staticFile('sfx/ding.wav')} volume={0.7}/></Sequence>
  <Audio src={staticFile('short56/voice.wav')}/>
  <Audio src={staticFile('music/bgm.mp3')} volume={0.065} loop/>
 </AbsoluteFill>;
};
export type Short56Props={timings:Timings|null};
export const Short56:React.FC<Short56Props>=({timings})=>timings?<TimingProvider t={timings}><Body/></TimingProvider>:null;
