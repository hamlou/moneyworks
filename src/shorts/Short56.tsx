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
const ACTIONS:Record<string,Key[]> = {
  cat_lamp:[{at:0,pose:'think',expr:'curious'},{at:24,pose:'present',expr:'happy'},{at:55,pose:'celebrate',expr:'grin'},{at:88,pose:'shock',expr:'shock'},{at:120,pose:'point_r',expr:'suspicious'}],
  online_store:[{at:0,pose:'typing',expr:'focused',talk:true},{at:28,pose:'celebrate',expr:'happy'},{at:58,pose:'think',expr:'think'},{at:86,pose:'shock',expr:'shock'},{at:122,pose:'facepalm',expr:'sad'}],
  shipping_box:[{at:0,pose:'present',expr:'neutral'},{at:26,pose:'think',expr:'think'},{at:54,pose:'point_r',expr:'suspicious'},{at:86,pose:'shrug',expr:'worried'},{at:122,pose:'pockets',expr:'sad'}],
  credit_card:[{at:0,pose:'present',expr:'neutral'},{at:24,pose:'think',expr:'think'},{at:54,pose:'shock',expr:'shock'},{at:82,pose:'facepalm',expr:'sad'},{at:122,pose:'shrug',expr:'worried'}],
  phone_ad:[{at:0,pose:'typing',expr:'focused',talk:true},{at:28,pose:'point_r',expr:'happy'},{at:56,pose:'think',expr:'think'},{at:86,pose:'panic',expr:'shock'},{at:120,pose:'facepalm',expr:'sad'}],
  ad_dashboard:[{at:0,pose:'think',expr:'suspicious'},{at:28,pose:'point_r',expr:'curious'},{at:58,pose:'shock',expr:'shock'},{at:88,pose:'facepalm',expr:'sad'},{at:122,pose:'panic',expr:'worried'}],
  warehouse:[{at:0,pose:'shrug',expr:'neutral'},{at:28,pose:'point_r',expr:'suspicious'},{at:58,pose:'present',expr:'angry'},{at:88,pose:'facepalm',expr:'sad'},{at:122,pose:'pockets',expr:'tired'}],
  returns_box:[{at:0,pose:'shock',expr:'shock'},{at:26,pose:'facepalm',expr:'sad'},{at:54,pose:'panic',expr:'worried'},{at:86,pose:'point_r',expr:'angry'},{at:122,pose:'shrug',expr:'tired'}],
  calculator:[{at:0,pose:'think',expr:'think'},{at:26,pose:'typing',expr:'focused'},{at:56,pose:'shock',expr:'shock'},{at:86,pose:'point_r',expr:'worried'},{at:122,pose:'present',expr:'sad'}],
  product_search:[{at:0,pose:'pockets',expr:'suspicious'},{at:28,pose:'point_r',expr:'curious'},{at:58,pose:'think',expr:'think'},{at:88,pose:'facepalm',expr:'sad'},{at:122,pose:'shrug',expr:'worried'}],
  closed_laptop:[{at:0,pose:'typing',expr:'focused',talk:true},{at:24,pose:'facepalm',expr:'sad',talk:false},{at:56,pose:'pockets',expr:'tired'},{at:88,pose:'point_r',expr:'angry'},{at:122,pose:'shrug',expr:'sad'}]
};
const PhotoScene:React.FC<{f:number;id:string;label:string;memetext:string;idx:number;start:number;pose?:string}>=({f,id,label,memetext,idx,start,pose='think'})=><AbsoluteFill>
 <Svg><rect width={W} height={H} fill={C.bg}/><rect width={W} height={1180} fill={C.wall}/><rect y={1180} width={W} height={740} fill={C.floor}/></Svg>
 <Pic f={f} src={`ep56/${id}.jpg`} x={540} y={555} w={760} h={480} at={start+2} look="plain" enter="slam" label={label} rot={-1} kb={0.035} wob={false}/>
 <Svg>
  <Dave f={f} x={540} y={1585} s={1.48} keys={(ACTIONS[id]??[{at:0,pose,expr:'think'}]).map(k=>({...k,at:start+k.at}))}/>
  <MemeCard f={f} at={start+12} y={1010} text={memetext} color={C.red}/>
 </Svg>
</AbsoluteFill>;
const Hook:React.FC<{f:number}>=({f})=><AbsoluteFill>
 <Svg>
  <rect width={W} height={H} fill={C.navy}/>
  <rect y={1180} width={W} height={740} fill={C.floor}/>
  <G x={540} y={270} s={1}><Stamp text="$3,000 SALES" color={C.green} size={82}/></G>
  <G x={540} y={555} s={f>=5?pop(f,5,7,220):0}>
   <rect x={-440} y={-92} width={880} height={184} rx={24} fill="#FFE3EA" stroke={C.ink} strokeWidth={8}/>
   <text x={0} y={-16} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill={C.ink}>THEN HE CHECKED HIS BANK</text>
   <text x={0} y={58} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill={C.red}>−$1,546</text>
  </G>
  <Dave f={f} x={540} y={1585} s={1.58} keys={[{at:0,pose:'celebrate',expr:'grin'},{at:5,pose:'shock',expr:'shock'},{at:48,pose:'facepalm',expr:'sad'}]}/>
  <G x={540} y={930} s={pop(f,8,7,220)}>
   <rect x={-350} y={-76} width={700} height={152} rx={20} fill="#FFF8E8" stroke={C.ink} strokeWidth={7}/>
   <text x={0} y={-8} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={31} fill={C.ink}>THE STORE SAID “WINNING.”</text>
   <text x={0} y={38} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={31} fill={C.red}>THE BANK DISAGREED.</text>
  </G>
 </Svg>
</AbsoluteFill>;
const Body:React.FC=()=>{
 const f=useCurrentFrame();const {t,bs}=useT();const d=Math.round(t.total*30);
 const sceneAt=(id:string)=>Math.max(0,bs(id)-3);
 const scenes:any[]=[
 {at:0,el:()=> <Hook f={f}/>},
 {at:sceneAt('o2'),el:()=> <PhotoScene f={f} start={sceneAt('o2')} id="cat_lamp" label="THE $30 CAT LAMP" memetext={'PASSIVE INCOME, THEY SAID.\nCUSTOMER SUPPORT, THEY SAID.'} idx={0}/>},
 {at:sceneAt('o3'),el:()=> <PhotoScene f={f} start={sceneAt('o3')} id="online_store" label="THE STORE LOOKED EASY" memetext={'SALES SCREEN: UP\nBANK APP: “BE SERIOUS.”'} idx={10} pose="shock"/>},
 {at:sceneAt('c1'),el:()=> <PhotoScene f={f} start={sceneAt('c1')} id="shipping_box" label="SUPPLIER: $12" memetext={'SUPPLIER: PAID.\nDAVE: HOLDING THE BAG.'} idx={1} pose="think"/>},
 {at:sceneAt('c2'),el:()=> <PhotoScene f={f} start={sceneAt('c2')} id="credit_card" label="PAYMENT FEES" memetext={'$30 IN\n$13.20 GONE\nAND ADS HAVEN’T STARTED.'} idx={2} pose="think"/>},
 {at:sceneAt('c3'),el:()=> <PhotoScene f={f} start={sceneAt('c3')} id="phone_ad" label="50¢ PER CLICK" memetext={'CLICK. SCROLL. GONE.\nDAVE STILL PAYS.'} idx={3}/>},
 {at:sceneAt('c4'),el:()=> <PhotoScene f={f} start={sceneAt('c4')} id="ad_dashboard" label="2 BUYERS OUT OF 100" memetext={'100 CLICKS.\n2 BUYERS.\n$25 TO GET ONE SALE.'} idx={4}/>},
 {at:sceneAt('c5'),el:()=> <PhotoScene f={f} start={sceneAt('c5')} id="warehouse" label="WHO GETS PAID?" memetext={'EVERYONE GOT PAID.\nDAVE GOT THE PLOT TWIST.'} idx={5}/>},
 {at:sceneAt('c6'),el:()=> <PhotoScene f={f} start={sceneAt('c6')} id="returns_box" label="REFUNDS + CHARGEBACKS" memetext={'CUSTOMER: “WHERE’S MY LAMP?”\nDAVE: “I’M ASKING TOO.”'} idx={6} pose="facepalm"/>},
 {at:sceneAt('c7'),el:()=> <PhotoScene f={f} start={sceneAt('c7')} id="calculator" label="THE AD CEILING" memetext={'BREAK-EVEN: $16.80\nAD COST: $25\nMATH SAID NO.'} idx={7} pose="think"/>},
 {at:sceneAt('c8'),el:()=> <PhotoScene f={f} start={sceneAt('c8')} id="product_search" label="CHECK THE MARKET" memetext={'SAME LAMP: $9 ELSEWHERE.\nDAVE’S MARKUP: AWKWARD.'} idx={8} pose="think"/>},
 {at:sceneAt('c9'),el:()=> <PhotoScene f={f} start={sceneAt('c9')} id="closed_laptop" label="ADS OFF" memetext={'POV: YOU SCALED\nA LOSING BUSINESS.'} idx={9} pose="celebrate"/>}
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
