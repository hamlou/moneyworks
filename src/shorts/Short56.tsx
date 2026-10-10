import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {pop, ease} from '../anim';
import {Stick, type Key} from '../Stick';
import {G, Stamp} from '../props';
import {Pic} from '../photo';
import {SubButton, Bell} from '../props2';

const W=1080,H=1920;
const Svg:React.FC<{children:React.ReactNode}>=({children})=><svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:'absolute',inset:0,overflow:'visible'}}>{children}</svg>;
const Dave:React.FC<any>=(p)=><Stick acc={['hair']} seed={7} {...p}/>;
const Bob:React.FC<any>=(p)=><Stick acc={['cap']} seed={21} {...p}/>;
const Captions:React.FC<{f:number}>=({f})=>{
 const {t}=useT(); const sec=f/30; let i=0;
 for(let j=0;j<t.beats.length;j++){if(t.beats[j].start<=sec)i=j;else break;}
 const b=t.beats[i], end=t.beats[i+1]?.start??t.total;
 if(!b||sec>=end-0.02)return null;
 let active=0;b.words.forEach((w:any,j:number)=>{if(w.start<=sec)active=j;});
 const groups:any[]=[];let cur:any[]=[];
 b.words.forEach((w:any,j:number)=>{cur.push({...w,j});if(/[,.!?;:]$/.test(w.text)||cur.length>=5){groups.push(cur);cur=[];}});
 if(cur.length)groups.push(cur);
 return <div style={{position:'absolute',left:40,right:40,bottom:115,textAlign:'center',fontFamily:FONT,fontWeight:800,fontSize:43,lineHeight:1.13,pointerEvents:'none'}}>
  {groups.map((g,k)=><div key={k} style={{margin:'5px auto',width:'fit-content',maxWidth:'100%',padding:'3px 10px',background:'rgba(24,27,35,.86)',borderRadius:8,color:'#fff',textShadow:'2px 3px 0 #222'}}>
   {g.map((w:any)=><span key={w.j} style={{color:w.j===active?'#FFD166':'#fff',marginRight:8}}>{w.text}</span>)}
  </div>)}
 </div>;
};
const MemeCard:React.FC<{f:number;at:number;text:string;x?:number;y?:number;color?:string;id?:string}>=({f,at,text,x=540,y=1020,color=C.red})=>{
 const lines=text.split('\n');
 return <G x={x} y={y} s={pop(f,at,8,220)}>
  <rect x={-360} y={-112} width={720} height={224} rx={20} fill="rgba(0,0,0,.18)" transform="translate(8,10)"/>
  <rect x={-360} y={-112} width={720} height={224} rx={20} fill="#FFF8E8" stroke={C.ink} strokeWidth={7}/>
  <rect x={-360} y={-112} width={720} height={20} rx={8} fill={color}/>
  {lines.map((line,i)=><text key={i} x={0} y={(i-(lines.length-1)/2)*47+18} textAnchor="middle" dominantBaseline="middle" fontFamily={FONT} fontWeight={900} fontSize={lines.length>2?27:33} fill={i===lines.length-1?color:C.ink}>{line}</text>)}
 </G>;
};
const ACTIONS:Record<string,{d:Key[];b:Key[];walk?:boolean}>={
cat_lamp:{d:[{at:0,pose:'think',expr:'think'},{at:22,pose:'present',expr:'happy'},{at:55,pose:'celebrate',expr:'grin'},{at:92,pose:'shock',expr:'shock'},{at:128,pose:'point_r',expr:'worried'}],b:[{at:0,pose:'point_l',expr:'smug'},{at:30,pose:'shrug',expr:'smug'},{at:66,pose:'think',expr:'think'},{at:104,pose:'facepalm',expr:'sad'}]},
online_store:{d:[{at:0,pose:'typing',expr:'happy',talk:true},{at:32,pose:'celebrate',expr:'grin'},{at:68,pose:'think',expr:'think'},{at:100,pose:'shock',expr:'shock'},{at:138,pose:'facepalm',expr:'sad'}],b:[{at:0,pose:'pockets',expr:'smug'},{at:36,pose:'present',expr:'happy'},{at:75,pose:'point_r',expr:'suspicious'},{at:112,pose:'shrug',expr:'worried'}],walk:true},
shipping_box:{d:[{at:0,pose:'carry',expr:'worried'},{at:28,pose:'think',expr:'think'},{at:60,pose:'point_r',expr:'angry'},{at:96,pose:'shrug',expr:'sad'},{at:132,pose:'pockets',expr:'tired'}],b:[{at:0,pose:'present',expr:'neutral'},{at:34,pose:'point_l',expr:'smug'},{at:72,pose:'pockets',expr:'smug'},{at:112,pose:'wave',expr:'happy'}]},
credit_card:{d:[{at:0,pose:'present',expr:'happy'},{at:28,pose:'think',expr:'think'},{at:56,pose:'shock',expr:'shock'},{at:88,pose:'facepalm',expr:'sad'},{at:126,pose:'shrug',expr:'worried'}],b:[{at:0,pose:'think',expr:'think'},{at:34,pose:'point_r',expr:'suspicious'},{at:70,pose:'shrug',expr:'smug'},{at:108,pose:'facepalm',expr:'sad'}]},
phone_ad:{d:[{at:0,pose:'typing',expr:'happy'},{at:30,pose:'point_up',expr:'happy'},{at:60,pose:'think',expr:'worried'},{at:92,pose:'panic',expr:'scream'},{at:128,pose:'facepalm',expr:'sad'}],b:[{at:0,pose:'pockets',expr:'smug'},{at:38,pose:'think',expr:'think'},{at:76,pose:'shock',expr:'shock'},{at:112,pose:'shrug',expr:'worried'}],walk:true},
ad_dashboard:{d:[{at:0,pose:'think',expr:'think'},{at:30,pose:'point_r',expr:'suspicious'},{at:60,pose:'shock',expr:'shock'},{at:94,pose:'facepalm',expr:'sad'},{at:130,pose:'panic',expr:'worried'}],b:[{at:0,pose:'typing',expr:'neutral'},{at:34,pose:'present',expr:'neutral'},{at:70,pose:'shrug',expr:'smug'},{at:108,pose:'point_l',expr:'suspicious'}]},
warehouse:{d:[{at:0,pose:'shrug',expr:'worried'},{at:30,pose:'point_r',expr:'angry'},{at:64,pose:'present',expr:'angry'},{at:98,pose:'facepalm',expr:'sad'},{at:132,pose:'pockets',expr:'tired'}],b:[{at:0,pose:'celebrate',expr:'grin'},{at:35,pose:'pockets',expr:'smug'},{at:72,pose:'wave',expr:'happy'},{at:112,pose:'shrug',expr:'smug'}]},
returns_box:{d:[{at:0,pose:'shock',expr:'shock'},{at:24,pose:'facepalm',expr:'sad'},{at:56,pose:'panic',expr:'worried'},{at:90,pose:'point_r',expr:'angry'},{at:126,pose:'shrug',expr:'tired'}],b:[{at:0,pose:'think',expr:'worried'},{at:30,pose:'point_l',expr:'suspicious'},{at:68,pose:'facepalm',expr:'sad'},{at:106,pose:'pockets',expr:'tired'}],walk:true},
calculator:{d:[{at:0,pose:'think',expr:'think'},{at:32,pose:'typing',expr:'think'},{at:66,pose:'shock',expr:'shock'},{at:98,pose:'point_up',expr:'angry'},{at:132,pose:'present',expr:'worried'}],b:[{at:0,pose:'think',expr:'think'},{at:34,pose:'typing',expr:'neutral'},{at:72,pose:'point_r',expr:'suspicious'},{at:110,pose:'shrug',expr:'smug'}]},
product_search:{d:[{at:0,pose:'pockets',expr:'suspicious'},{at:30,pose:'point_r',expr:'suspicious'},{at:62,pose:'think',expr:'worried'},{at:94,pose:'facepalm',expr:'sad'},{at:128,pose:'shrug',expr:'tired'}],b:[{at:0,pose:'present',expr:'neutral'},{at:34,pose:'point_l',expr:'think'},{at:70,pose:'shrug',expr:'smug'},{at:108,pose:'wave',expr:'happy'}]},
closed_laptop:{d:[{at:0,pose:'typing',expr:'tired'},{at:28,pose:'facepalm',expr:'sad'},{at:62,pose:'carry',expr:'angry'},{at:94,pose:'pockets',expr:'tired'},{at:130,pose:'point_up',expr:'worried'}],b:[{at:0,pose:'think',expr:'think'},{at:32,pose:'shrug',expr:'worried'},{at:68,pose:'present',expr:'neutral'},{at:104,pose:'wave',expr:'happy'}],walk:true}
};
const PhotoScene:React.FC<{f:number;id:string;label:string;memetext:string;idx:number;start:number;pose?:string}>=({f,id,label,memetext,idx,start,pose='shock'})=><AbsoluteFill>
 <Svg><rect width={W} height={H} fill={C.bg}/><rect width={W} height={1180} fill={C.wall}/><rect y={1180} width={W} height={740} fill={C.floor}/></Svg>
 <Pic f={f} src={`ep56/${id}.jpg`} x={545} y={590} w={650} h={450} at={start+2} look="plain" enter="slam" label={label} rot={-2} kb={0.08}/>
 <Svg>
  <Dave f={f} x={230} y={1575} s={1.18} walk={f<start+28||f>start+118} keys={[{at:start,pose,expr:'shock'},{at:start+35,pose:'talk',expr:'angry',talk:true},{at:start+72,pose:'facepalm',expr:'sad',talk:false},{at:start+108,pose:'point_r',expr:'suspicious',talk:false},{at:start+145,pose:'celebrate',expr:'happy',talk:false}]}/>
  <Bob f={f} x={850} y={1575} s={1.1} keys={[{at:start,pose:'think',expr:'worried'},{at:start+38,pose:'panic',expr:'shock'},{at:start+78,pose:'think',expr:'think'},{at:start+118,pose:'wave',expr:'happy'},{at:start+150,pose:'shrug',expr:'smug'}]}/>
  <MemeCard f={f} at={start+16} text={memetext} color={C.red}/>
 </Svg>
</AbsoluteFill>;
const Hook:React.FC<{f:number}>=({f})=><AbsoluteFill>
 <Svg><rect width={W} height={H} fill={C.navy}/><rect y={1250} width={W} height={670} fill={C.floor}/><G x={540} y={280} s={1}><Stamp text="$3,000 SALES" color={C.green} size={74}/></G><G x={540} y={570} s={1}><Stamp text="-$1,546 BANK BALANCE" color={C.red} size={53}/></G><Dave f={f} x={230} y={1575} s={1.24} walk={f<28||f>78} keys={[{at:0,pose:'shock',expr:'shock'},{at:24,pose:'facepalm',expr:'sad'},{at:48,pose:'panic',expr:'worried'},{at:72,pose:'point_up',expr:'angry',talk:true},{at:100,pose:'shrug',expr:'suspicious',talk:false}]}/><Bob f={f} x={850} y={1575} s={1.12} keys={[{at:0,pose:'shrug',expr:'smug'},{at:30,pose:'think',expr:'think'},{at:60,pose:'panic',expr:'shock'},{at:90,pose:'facepalm',expr:'sad'}]}/><MemeCard f={f} at={0} y={900} text={'WHEN SALES LOOK GREAT\nBANK ACCOUNT: “NOPE”'} color={C.red}/></Svg>
</AbsoluteFill>;
const Body:React.FC=()=>{
 const f=useCurrentFrame();const {t,bs}=useT();const d=Math.round(t.total*30);
 const sceneAt=(id:string)=>Math.max(0,bs(id)-3);
 const scenes:any[]=[
 {at:0,el:()=> <Hook f={f}/>},
 {at:sceneAt('o2'),el:()=> <PhotoScene f={f} start={sceneAt('o2')} id="cat_lamp" label="THE $30 CAT LAMP" memetext={'DROPSHIPPING\nWAITER WHO NEVER SAW THE KITCHEN'} idx={0}/>},
 {at:sceneAt('o3'),el:()=> <PhotoScene f={f} start={sceneAt('o3')} id="online_store" label="THE STORE LOOKED EASY" memetext={'ONLINE STORE: “WE’RE RICH”\nBANK APP: “NOPE.”'} idx={10} pose="shock"/>},
 {at:sceneAt('c1'),el:()=> <PhotoScene f={f} start={sceneAt('c1')} id="shipping_box" label="SUPPLIER: $12" memetext={'THE SUPPLIER GETS PAID FIRST'} idx={1} pose="think"/>},
 {at:sceneAt('c2'),el:()=> <PhotoScene f={f} start={sceneAt('c2')} id="credit_card" label="PAYMENT FEES" memetext={'$30 SALE\nLESS FEES\nLESS $12 COST'} idx={2} pose="think"/>},
 {at:sceneAt('c3'),el:()=> <PhotoScene f={f} start={sceneAt('c3')} id="phone_ad" label="50¢ PER CLICK" memetext={'BUYING EYEBALLS\nNOT BUYERS'} idx={3}/>},
 {at:sceneAt('c4'),el:()=> <PhotoScene f={f} start={sceneAt('c4')} id="ad_dashboard" label="2 BUYERS OUT OF 100" memetext={'50 CLICKS = $25\nONE SALE = LOSS'} idx={4}/>},
 {at:sceneAt('c5'),el:()=> <PhotoScene f={f} start={sceneAt('c5')} id="warehouse" label="WHO GETS PAID?" memetext={'PLATFORMS WIN\nDAVE TAKES THE RISK'} idx={5}/>},
 {at:sceneAt('c6'),el:()=> <PhotoScene f={f} start={sceneAt('c6')} id="returns_box" label="REFUNDS + CHARGEBACKS" memetext={'DELIVERY LATE\nCUSTOMERS WANT MONEY BACK'} idx={6} pose="facepalm"/>},
 {at:sceneAt('c7'),el:()=> <PhotoScene f={f} start={sceneAt('c7')} id="calculator" label="THE AD CEILING" memetext={'MAX AD COST: $16.80\nDAVE SPENT $25'} idx={7} pose="think"/>},
 {at:sceneAt('c8'),el:()=> <PhotoScene f={f} start={sceneAt('c8')} id="product_search" label="CHECK THE MARKET" memetext={'SAME PRODUCT\nCHEAPER ELSEWHERE'} idx={8} pose="think"/>},
 {at:sceneAt('c9'),el:()=> <PhotoScene f={f} start={sceneAt('c9')} id="closed_laptop" label="ADS OFF" memetext={'SALES ≠ PROFIT\nCOUNT EVERY COST'} idx={9} pose="celebrate"/>}
 ];
 let current=scenes[0];for(const s of scenes){if(s.at<=f)current=s;}
 const mid=bs('c5')+20,end=d-120,midShow=f>=mid&&f<mid+75,endShow=f>=end;
 const subAt=endShow?end:mid;
 return <AbsoluteFill style={{background:C.bg}}>
  {current.el()}
  {(midShow||endShow)&&<Svg><G x={540} y={150} s={0.62*pop(f,subAt,10,220)}><SubButton done={f>subAt+55?1:0}/></G><G x={830} y={150} s={0.58*pop(f,subAt+4,10,220)}><Bell f={f} ring={1}/></G><G x={540} y={70} s={pop(f,subAt+3,8,220)}><Stamp text={endShow?'NEXT MONEY TRAP?':'MORE MONEY STORIES?'} color={C.navy} size={29}/></G></Svg>}
  <Captions f={f}/>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:9,background:'#2222'}}><div style={{height:'100%',width:`${100*f/d}%`,background:C.green}}/></div>
  <Sequence from={0} durationInFrames={60}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.7}/></Sequence>
  <Sequence from={Math.max(0,mid)} durationInFrames={60}><Audio src={staticFile('sfx/ding.wav')} volume={0.7}/></Sequence>
  <Sequence from={Math.max(0,end)} durationInFrames={60}><Audio src={staticFile('sfx/ding.wav')} volume={0.7}/></Sequence>
  <Audio src={staticFile('short56/voice.wav')}/>
  <Audio src={staticFile('music/bgm.mp3')} volume={0.07} loop/>
 </AbsoluteFill>;
};
export type Short56Props={timings:Timings|null};
export const Short56:React.FC<Short56Props>=({timings})=>timings?<TimingProvider t={timings}><Body/></TimingProvider>:null;
