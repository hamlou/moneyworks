import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {TimingProvider, Timings, useT} from '../timing';
import {C, FONT} from '../theme';
import {pop, ease} from '../anim';
import {Stick} from '../Stick';
import {G, Stamp, Paper} from '../props';
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
const PhotoScene:React.FC<{f:number;id:string;label:string;memetext:string;idx:number;pose?:string}>=({f,id,label,memetext,idx,pose='shock'})=><AbsoluteFill>
 <Svg><rect width={W} height={H} fill={C.bg}/><rect width={W} height={1180} fill={C.wall}/><rect y={1180} width={W} height={740} fill={C.floor}/></Svg>
 <Pic f={f} src={`ep56/${id}.jpg`} x={545} y={630} w={650} h={490} at={idx*5} look="news" enter="slam" label={label} rot={-2}/>
 <Svg>
  <Dave f={f} x={230} y={1500} s={1.05} keys={[{at:0,pose,expr:'shock'}]}/>
  <Bob f={f} x={850} y={1500} s={0.95} keys={[{at:0,pose:'think',expr:'worried'}]}/>
  <G x={540} y={1180} s={pop(f,idx*5+10,8,220)}><Paper id={`meme-${id}`} text={memetext} reveal={1} w={760} h={250} size={37} color={C.red}/></G>
 </Svg>
</AbsoluteFill>;
const Hook:React.FC<{f:number}>=({f})=><AbsoluteFill>
 <Svg><rect width={W} height={H} fill={C.navy}/><rect y={1250} width={W} height={670} fill={C.floor}/><G x={540} y={280} s={1}><Stamp text="$3,000 SALES" color={C.green} size={74}/></G><G x={540} y={570} s={1}><Stamp text="-$1,546 BANK BALANCE" color={C.red} size={53}/></G><Dave f={f} x={230} y={1500} s={1.25} keys={[{at:0,pose:'shock',expr:'shock'}]}/><Bob f={f} x={850} y={1500} s={1.0} keys={[{at:0,pose:'shrug',expr:'smug'}]}/><G x={540} y={900} s={pop(f,0,12,240)}><Paper id="meme-hook" text={'WHEN SALES LOOK GREAT\nBANK ACCOUNT: “NOPE”'} reveal={1} w={760} h={240} size={38} color={C.red}/></G></Svg>
</AbsoluteFill>;
const Body:React.FC=()=>{
 const f=useCurrentFrame();const {t,bs}=useT();const d=Math.round(t.total*30);
 const sceneAt=(id:string)=>Math.max(0,bs(id)-3);
 const scenes:any[]=[
 {at:0,el:()=> <Hook f={f}/>},
 {at:sceneAt('o2'),el:()=> <PhotoScene f={f} id="cat_lamp" label="THE $30 CAT LAMP" memetext={'DROPSHIPPING\nWAITER WHO NEVER SAW THE KITCHEN'} idx={0}/>},
 {at:sceneAt('c1'),el:()=> <PhotoScene f={f} id="shipping_box" label="SUPPLIER: $12" memetext={'THE SUPPLIER GETS PAID FIRST'} idx={1} pose="think"/>},
 {at:sceneAt('c2'),el:()=> <PhotoScene f={f} id="credit_card" label="PAYMENT FEES" memetext={'$30 SALE\nLESS FEES\nLESS $12 COST'} idx={2} pose="think"/>},
 {at:sceneAt('c3'),el:()=> <PhotoScene f={f} id="phone_ad" label="50¢ PER CLICK" memetext={'BUYING EYEBALLS\nNOT BUYERS'} idx={3}/>},
 {at:sceneAt('c4'),el:()=> <PhotoScene f={f} id="ad_dashboard" label="2 BUYERS OUT OF 100" memetext={'50 CLICKS = $25\nONE SALE = LOSS'} idx={4}/>},
 {at:sceneAt('c5'),el:()=> <PhotoScene f={f} id="warehouse" label="WHO GETS PAID?" memetext={'PLATFORMS WIN\nDAVE TAKES THE RISK'} idx={5}/>},
 {at:sceneAt('c6'),el:()=> <PhotoScene f={f} id="returns_box" label="REFUNDS + CHARGEBACKS" memetext={'DELIVERY LATE\nCUSTOMERS WANT MONEY BACK'} idx={6} pose="facepalm"/>},
 {at:sceneAt('c7'),el:()=> <PhotoScene f={f} id="calculator" label="THE AD CEILING" memetext={'MAX AD COST: $16.80\nDAVE SPENT $25'} idx={7} pose="think"/>},
 {at:sceneAt('c8'),el:()=> <PhotoScene f={f} id="product_search" label="CHECK THE MARKET" memetext={'SAME PRODUCT\nCHEAPER ELSEWHERE'} idx={8} pose="think"/>},
 {at:sceneAt('c9'),el:()=> <PhotoScene f={f} id="closed_laptop" label="ADS OFF" memetext={'SALES ≠ PROFIT\nCOUNT EVERY COST'} idx={9} pose="celebrate"/>}
 ];
 let current=scenes[0];for(const s of scenes){if(s.at<=f)current=s;}
 const mid=bs('c5')+20,end=d-120,midShow=f>=mid&&f<mid+75,endShow=f>=end;
 const subAt=endShow?end:mid;
 return <AbsoluteFill style={{background:C.bg}}>
  {current.el()}
  {(midShow||endShow)&&<Svg><G x={540} y={1000} s={0.78*pop(f,subAt,10,220)}><SubButton done={f>subAt+55?1:0}/></G><G x={830} y={1000} s={0.75*pop(f,subAt+4,10,220)}><Bell f={f} ring={1}/></G><G x={540} y={870} s={pop(f,subAt+3,8,220)}><Stamp text={endShow?'NEXT MONEY TRAP?':'MORE MONEY STORIES?'} color={C.navy} size={35}/></G></Svg>}
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
