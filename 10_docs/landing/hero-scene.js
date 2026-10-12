import * as THREE from 'three';
import {GLTFLoader} from './vendor/GLTFLoader.js';

// Hafen-Intermezzo [DE]. Existing R5 Toki, Kajo and ONE detailed archive crate.
// Walking is authored from the measured rig: upright torso, fixed stance feet,
// short sagittal steps, rest quaternion retained. The old rolling gait is unused.
const host=document.getElementById('character-stage'),status=document.getElementById('stage-status');
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z),Q=()=>new THREE.Quaternion(),X=V(1,0,0),Y=V(0,1,0);
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=v=>{v=clamp(v);return v*v*v*(v*(v*6-15)+10);};
const interval=(t,a,b)=>ease((t-a)/(b-a));
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),actors={},loader=new GLTFLoader();
const DURATION=18;let elapsed=0,last=0,paused=reduced.matches,visible=true,ready=false,muted=true,lastCue=-1;
let renderer,scene,camera,crate,crateBones,crateRest,lidCurve,voiceManifest=[],activeSpeaker='',lipTracks={},currentClip=null,speechPreview=false,voiceOnly=false,playAttempt=0,dialogue=null;
const voice=new Audio();voice.id='hero-voice';voice.hidden=true;voice.preload='none';voice.volume=.82;host.appendChild(voice);
const motion=document.getElementById('motion-toggle'),sound=document.getElementById('stage-sound');
const voiceNotice=document.createElement('p');voiceNotice.className='stage-audio-status';voiceNotice.setAttribute('role','status');voiceNotice.hidden=true;sound.parentElement.after(voiceNotice);
function syncControls(){motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Szene fortsetzen':'Szene pausieren');motion.textContent=paused?'▶':'Ⅱ';const start=muted||(paused&&voice.paused);sound.setAttribute('aria-pressed',String(!muted));sound.textContent=start?'Stimmen abspielen ♫':'Stimmen ausschalten ♫';sound.setAttribute('aria-label',start?'Figurenstimmen abspielen':'Figurenstimmen ausschalten');}
syncControls();
let cues=[];
const narrative=[['Am Tokenhafen','Toki und Kajo entdecken eine Archivkiste.'],['Bei der Kiste','Die beiden schauen sich Kajos Kiste an.'],['Kajos Archiv','Kajo öffnet seine Schublade und prüft den Inhalt.'],['Der offene Deckel','Toki schaut in die Kiste.'],['Die Kiste kippt','Die Schlüsselkärtchen rutschen heraus.'],['Aufräumen am Hafen','Toki und Kajo sammeln die Kärtchen zusammen ein.'],['Kajos Schlüsselkärtchen','Die Kärtchen gehören wieder in ihre Fächer.'],['Komm mit nach Kontextia','Die Geschichte wartet auf dich.']];
const speechName=document.getElementById('speech-name'),speechText=document.getElementById('speech-text');let captionKey='',wordSpans=[];
function caption(phase,clip=null,time=null){
 const key=clip?.id||'scene-'+phase;
 if(key!==captionKey){
  captionKey=key;wordSpans=[];speechText.replaceChildren();
  speechName.textContent=clip?(clip.speaker==='kajo-cache'?'Kajo':clip.speakerName):narrative[phase][0];
  if(clip){
   speechText.append('„');let cursor=0;
   for(const word of lipTracks[clip.id].words){const start=clip.text.toLocaleLowerCase('de').indexOf(word.wort.toLocaleLowerCase('de'),cursor);if(start<0)continue;speechText.append(clip.text.slice(cursor,start));const span=document.createElement('span');span.className='spoken-word';span.textContent=clip.text.slice(start,start+word.wort.length);speechText.append(span);wordSpans.push({span,start:word.start,end:word.ende});cursor=start+word.wort.length;}
   speechText.append(clip.text.slice(cursor)+'“');
  }else speechText.textContent=narrative[phase][1];
 }
 wordSpans.forEach(w=>w.span.classList.toggle('current-word',time>=w.start&&time<w.end));
 speechText.dataset.clip=clip?.id||'';speechText.dataset.time=time===null?'':time.toFixed(3);
}
function voiceFailure(error,attempt=playAttempt){if(attempt!==playAttempt||error?.name==='AbortError')return;muted=true;voiceOnly=false;activeSpeaker='';voice.pause();voiceNotice.textContent='Die Stimmen konnten nicht starten. Bitte noch einmal abspielen.';voiceNotice.hidden=false;syncControls();}
function sceneTimeForAudio(time){const points=dialogue?.sceneAnchors;if(!points)return 0;for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];if(time<=b.audio)return THREE.MathUtils.lerp(a.scene,b.scene,clamp((time-a.audio)/(b.audio-a.audio)));}return points.at(-1).scene;}
function updateDialogue(){currentClip=muted?null:voiceManifest.find(c=>voice.currentTime>=c.t&&voice.currentTime<c.end)||null;activeSpeaker=currentClip?(currentClip.speaker==='kajo-cache'?'kajo':currentClip.speaker):'';voice.dataset.clip=currentClip?.id||'';host.dataset.audioTime=voice.currentTime.toFixed(3);if(!muted)caption(scenePhase(sceneTimeForAudio(voice.currentTime)),currentClip,currentClip?voice.currentTime-currentClip.t:null);}
function playDialogue(restart=false){if(!dialogue||muted||document.hidden)return;const story=document.getElementById('story-audio');if(!story.paused)story.pause();const attempt=++playAttempt;voiceNotice.hidden=true;if(voice.getAttribute('src')!==dialogue.audioUrl)voice.src=dialogue.audioUrl;if(restart){voice.currentTime=0;elapsed=0;currentClip=null;}voice.play().catch(error=>voiceFailure(error,attempt));}
function mouthSample(id,time){
 const track=lipTracks[id];if(!track||time<0||time>=track.duration)return null;
 const frame=time*track.fps,i=Math.min(Math.floor(frame),track.frames.length-1),f=frame-i,a=track.frames[i],b=track.frames[Math.min(i+1,track.frames.length-1)],sample={};
 for(const key of ['mund_A','mund_O','mund_M','grinsen_breit','neutral'])sample[key]=THREE.MathUtils.lerp(a[key]||0,b[key]||0,f);return sample;
}
function resumeVoice(){if(muted||(paused&&!voiceOnly)||!visible||document.hidden)return;playDialogue(false);}
voice.addEventListener('playing',syncControls);
voice.addEventListener('pause',syncControls);
voice.addEventListener('error',()=>voiceFailure(voice.error));
voice.addEventListener('timeupdate',updateDialogue);
voice.addEventListener('ended',()=>{elapsed=sceneTimeForAudio(voice.duration);paused=true;voiceOnly=false;muted=true;currentClip=null;activeSpeaker='';syncControls();if(ready)pose(elapsed);else caption(7);});
function scenePhase(t){return t<.25?0:t<2.2?1:t<4.05?2:t<5.92?3:t<6.85?4:t<11.5?5:t<15.1?6:7;}
function bonesOf(model){const result={};model.traverse(o=>{if(o.isBone)result[(o.userData.name||o.name).replace(/\./g,'')]=o;});return result;}
function reset(a){for(const [name,b]of Object.entries(a.bones)){const r=a.rest[name];b.position.copy(r.p);b.quaternion.copy(r.q);}a.group.position.copy(a.start);a.group.rotation.set(0,0,0);a.model.updateMatrixWorld(true);}
function solveGait(a,rawForward,lift,side){
 a.group.updateMatrixWorld(true);
 const target=a.footTargets[side].clone();target.z+=rawForward*a.scale;target.y+=lift*a.scale;target.applyMatrix4(a.group.matrixWorld);
 const forward=V(0,0,1).applyQuaternion(a.group.quaternion),pole=worldPosition(a.bones['oberschenkel'+side]).addScaledVector(forward,.7).add(V(0,.15,0));
 twoBone(a,'oberschenkel'+side,'unterschenkel'+side,'fuss'+side,target,pole);
 const foot=a.bones['fuss'+side],parent=foot.parent.getWorldQuaternion(Q()),goal=Q().setFromAxisAngle(Y,a.group.rotation.y).multiply(a.footWorldQ[side]);
 foot.quaternion.copy(parent.invert().multiply(goal));a.group.updateMatrixWorld(true);
}
function travel(v){v=clamp(v);const r=.14;if(v<r){const s=v/r;return r*(s*s*s-.5*s*s*s*s)/(1-r);}if(v>1-r)return 1-travel(1-v);return (v-r/2)/(1-r);}
function walk(a,t,from,to,begin,end,backwards=false){
 const u=travel((t-begin)/(end-begin)),distance=from.distanceTo(to),direction=to.clone().sub(from).normalize();a.group.position.copy(from).lerp(to,u);
 a.group.rotation.y=Math.atan2(direction.x,direction.z)+(backwards?Math.PI:0);if(a.group.rotation.y>Math.PI)a.group.rotation.y-=Math.PI*2;
 const cycles=Math.max(1,Math.round(distance/(a.scale*(a.id==='toki'?.040:.050)))),stride=distance/(cycles*a.scale);
 const raw=distance*u/a.scale,cycle=u*cycles,n=Math.floor(cycle),f=cycle-n;
 for(const side of ['L','R']){
  const swing=side==='L'?f<.5:f>=.5,phase=side==='L'?f*2:(f-.5)*2;
  a.stance[side]=!swing;
  const advance=side==='L'?(f<.5?travel(f*2):1):(f<.5?0:travel((f-.5)*2));
  solveGait(a,(n*stride+stride*advance-raw)*(backwards?-1:1),swing?.0018*Math.pow(Math.sin(Math.PI*clamp(phase)),2):0,side);
 }
 a.model.updateMatrixWorld(true);a.walking=true;a.stepPhase=f;
 a.armSwing=Math.sin(cycle*Math.PI*2)*Math.sin(Math.PI*u)*.065;
}
function worldPosition(b){return b.getWorldPosition(V());}
function aim(b,child,target){
 b.updateWorldMatrix(true,true);const origin=worldPosition(b),current=worldPosition(child).sub(origin).normalize(),wanted=target.clone().sub(origin).normalize();
 if(current.lengthSq()<.1||wanted.lengthSq()<.1)return;
 const delta=Q().setFromUnitVectors(current,wanted),parent=b.parent.getWorldQuaternion(Q()),global=b.getWorldQuaternion(Q());
 b.quaternion.copy(parent.invert().multiply(delta.multiply(global)));b.updateWorldMatrix(true,true);
}
function orientSegment(bone,child,direction,normal){
 const localY=child.position.clone().normalize(),localX=X.clone().addScaledVector(localY,-X.dot(localY)).normalize(),localZ=localX.clone().cross(localY).normalize();
 const worldY=direction.clone().normalize(),worldX=normal.clone().addScaledVector(worldY,-normal.dot(worldY)).normalize(),worldZ=worldX.clone().cross(worldY).normalize();
 const localBasis=Q().setFromRotationMatrix(new THREE.Matrix4().makeBasis(localX,localY,localZ)),worldBasis=Q().setFromRotationMatrix(new THREE.Matrix4().makeBasis(worldX,worldY,worldZ));
 bone.quaternion.copy(bone.parent.getWorldQuaternion(Q()).invert().multiply(worldBasis.multiply(localBasis.invert())));bone.updateWorldMatrix(true,true);
}
function twoBone(a,upper,lower,end,target,pole,hingeNormal=null){
 const u=a.bones[upper],l=a.bones[lower],e=a.bones[end];if(!u||!l||!e)return;
 a.group.updateMatrixWorld(true);const origin=worldPosition(u),l1=origin.distanceTo(worldPosition(l)),l2=worldPosition(l).distanceTo(worldPosition(e)),dir=target.clone().sub(origin);let d=dir.length();dir.normalize();
 d=clamp(d,Math.abs(l1-l2)+.0001,l1+l2-.0001);const along=(l1*l1+d*d-l2*l2)/(2*d),height=Math.sqrt(Math.max(0,l1*l1-along*along));
 let perpendicular,normal;
 if(hingeNormal){
  // Keep one elbow plane through raised/lowered poses. A positional pole can
  // cross the shoulder-target ray and flip a short arm by almost 180 degrees.
  normal=hingeNormal.clone().addScaledVector(dir,-hingeNormal.dot(dir)).normalize();
  perpendicular=normal.clone().cross(dir).normalize();
 }else{
  perpendicular=pole.clone().sub(origin);perpendicular.addScaledVector(dir,-perpendicular.dot(dir)).normalize();if(perpendicular.lengthSq()<.1)perpendicular=V(0,0,1);
  normal=dir.clone().cross(perpendicular).normalize();
 }
 const middle=origin.clone().addScaledVector(dir,along).addScaledVector(perpendicular,height);
 orientSegment(u,l,middle.clone().sub(origin),normal);orientSegment(l,e,origin.clone().addScaledVector(dir,d).sub(middle),normal);
}
function idleArms(a){
 for(const side of ['L','R']){
  // Preserve the authored limb frame and its original hand roll. The elbow is
  // a single X hinge, not a second freely rotating ball joint.
  const lower=a.bones['unterarm'+side];lower.quaternion.copy(a.rest['unterarm'+side].q).multiply(Q().setFromAxisAngle(X,a.id==='toki'?.22:.32));
  rotateWorld(a.bones['oberarm'+side],V(0,0,1).applyQuaternion(a.group.quaternion),(side==='L'?1:-1)*(a.id==='toki'?.28:.12));
  rotateWorld(a.bones['oberarm'+side],X,(side==='L'?1:-1)*a.armSwing*.8);
  for(const name of ['finger','daumen']){const b=a.bones[name+side];if(b)b.quaternion.multiply(Q().setFromAxisAngle(X,name==='finger'?.10:.04));}
 }
 a.group.updateMatrixWorld(true);
}
function arm(a,side,target,weight=1,selfContact=false,elbowLimit=null){
 const upper=a.bones['oberarm'+side],lower=a.bones['unterarm'+side],hand=a.bones['hand'+side],point=selfContact?a.handGrips[side]:a.tips[side];
 const base=[upper,lower,hand].map(b=>b.quaternion.clone()),origin=worldPosition(upper),l1=lower.position.length()*a.scale,l2=hand.position.length()*a.scale;
 const maxElbow=THREE.MathUtils.degToRad(elbowLimit??(a.id==='toki'?130:115)),minDistance=Math.sqrt(l1*l1+l2*l2+2*l1*l2*Math.cos(maxElbow));
 let wrist=target.clone().addScaledVector(origin.clone().sub(target).normalize(),point.position.length()*a.scale);
 for(let i=0;i<6;i++){
  upper.quaternion.copy(a.rest['oberarm'+side].q);lower.quaternion.copy(a.rest['unterarm'+side].q);hand.quaternion.copy(a.rest['hand'+side].q);a.group.updateMatrixWorld(true);
  const distance=clamp(wrist.distanceTo(origin),minDistance,l1+l2-.001),flex=Math.acos(clamp((distance*distance-l1*l1-l2*l2)/(2*l1*l2),-1,1));
  lower.quaternion.multiply(Q().setFromAxisAngle(X,flex));a.group.updateMatrixWorld(true);
  // Rotate the whole correctly hinged chain by the smallest shoulder swing.
  aim(upper,hand,wrist);
  const localTarget=hand.worldToLocal(target.clone()),p=point.position;
  const angle=clamp(Math.atan2(p.y,p.z)-Math.atan2(localTarget.y,localTarget.z),-THREE.MathUtils.degToRad(a.id==='toki'?85:60),THREE.MathUtils.degToRad(a.id==='toki'?85:60));
  hand.quaternion.multiply(Q().setFromAxisAngle(X,angle));a.group.updateMatrixWorld(true);
  const offset=point.position.clone().multiplyScalar(a.scale).applyQuaternion(hand.getWorldQuaternion(Q()));wrist.copy(target).sub(offset);
 }
 const solved=[upper,lower,hand].map(b=>b.quaternion.clone());[upper,lower,hand].forEach((b,i)=>b.quaternion.copy(base[i]).slerp(solved[i],weight));a.group.updateMatrixWorld(true);
 if(selfContact)for(const name of ['finger','daumen']){const b=a.bones[name+side];if(b)b.quaternion.multiply(Q().setFromAxisAngle(X,(name==='finger'?.30:.12)*weight));}
 a.contacts[side]={target:target.clone(),actual:worldPosition(point),selfContact,weight};
}
function gesture(a,side,weight,raise=.28,flex=.60){
 const sign=side==='L'?-1:1;rotateWorld(a.bones['oberarm'+side],V(0,0,1).applyQuaternion(a.group.quaternion),sign*raise*weight);
 a.bones['unterarm'+side].quaternion.copy(a.rest['unterarm'+side].q).multiply(Q().setFromAxisAngle(X,(a.id==='toki'?.22:.32)+flex*weight));a.group.updateMatrixWorld(true);
}
function rotateWorld(b,axis,angle){const parent=b.parent.getWorldQuaternion(Q()),global=b.getWorldQuaternion(Q());b.quaternion.copy(parent.invert().multiply(Q().setFromAxisAngle(axis,angle).multiply(global)));b.updateWorldMatrix(true,true);}
function attachAnchor(a,bone,point){a.group.updateMatrixWorld(true);const anchor=new THREE.Object3D();anchor.position.copy(point.clone().applyMatrix4(a.model.matrixWorld).applyMatrix4(a.bones[bone].matrixWorld.clone().invert()));a.bones[bone].add(anchor);return anchor;}
function bend(a,pitch,lower){
 const body=a.bones.koerper,hipBefore=worldPosition(a.bones.oberschenkelL).add(worldPosition(a.bones.oberschenkelR)).multiplyScalar(.5);
 const global=body.getWorldQuaternion(Q()),parent=body.parent.getWorldQuaternion(Q());body.quaternion.copy(parent.invert().multiply(Q().setFromAxisAngle(X,pitch).multiply(global)));
 a.group.updateMatrixWorld(true);const hipAfter=worldPosition(a.bones.oberschenkelL).add(worldPosition(a.bones.oberschenkelR)).multiplyScalar(.5);
 const desired=hipBefore.clone();desired.y-=lower;const delta=desired.sub(hipAfter),parentScale=body.parent.getWorldScale(V()),pq=body.parent.getWorldQuaternion(Q()).invert();delta.applyQuaternion(pq).divide(parentScale);body.position.add(delta);
 a.group.updateMatrixWorld(true);
 for(const side of ['L','R']){
  const target=a.footTargets[side].clone().applyMatrix4(a.group.matrixWorld);
  twoBone(a,'oberschenkel'+side,'unterschenkel'+side,'fuss'+side,target,target.clone().add(V(0,.3,.8)));
  const foot=a.bones['fuss'+side],parentQ=foot.parent.getWorldQuaternion(Q()),desiredQ=Q().setFromAxisAngle(Y,a.group.rotation.y).multiply(a.footWorldQ[side]);foot.quaternion.copy(parentQ.invert().multiply(desiredQ));
 }
 a.group.updateMatrixWorld(true);
}
function expression(a,t,look,emotion='happy',speech=null){
 const blinkTimes=a.id==='toki'?[.32,2.40,4.70,6.19,9.55,12.16,16.3]:[1.10,3.1,6.16,8.65,11.45,14.60,17.0];
 let blink=0;for(const time of blinkTimes){const age=t-time;if(age>0&&age<.18)blink=Math.max(blink,Math.sin(Math.PI*age/.18));}
 for(const side of ['L','R']){
  const eye=a.bones['auge'+side],position=worldPosition(eye),direction=look.clone().sub(position).applyQuaternion(a.group.quaternion.clone().invert());
  const yaw=clamp(Math.atan2(direction.x,Math.max(.1,direction.z)),-.34,.34),pitch=clamp(-Math.atan2(direction.y,Math.hypot(direction.x,direction.z)),-.27,.27);
  rotateWorld(eye,V(0,1,0).applyQuaternion(a.group.quaternion),yaw);rotateWorld(eye,V(1,0,0).applyQuaternion(a.group.quaternion),pitch);
  rotateWorld(a.bones['lid'+side],V(1,0,0).applyQuaternion(a.group.quaternion),1.14*blink);
  const brow=a.bones['braue'+side],raise=emotion==='surprise'?.017:emotion==='focus'?(side==='L'?.009:-.003):.003+Math.sin(t*2.5+(side==='L'?0:.8))*.0018;
  const shift=V(0,raise,0).applyQuaternion(brow.parent.getWorldQuaternion(Q()).invert());brow.position.add(shift);
  if(emotion==='focus')rotateWorld(brow,V(0,0,1),side==='L'?-.10:.10);
 }
 for(const o of a.mouthMeshes){const d=o.morphTargetDictionary,w=o.morphTargetInfluences;w.fill(0);const feel=emotion==='surprise'?'staunen':emotion==='focus'?'nachdenklich':a.id==='toki'?'freude':'grinsen_breit';const amount=paused?0:emotion==='surprise'?.75:emotion==='focus'?.50:.30;
  if(speech){for(const [name,value]of Object.entries(speech))if(d[name]!==undefined)w[d[name]]=value;}
  else {if(d[feel]!==undefined)w[d[feel]]=amount;if(d.neutral!==undefined)w[d.neutral]=1-amount;}
 }
 a.speech=speech;
 rotateWorld(a.bones.schopf,X,Math.sin(t*6)*.035+(a.walking?Math.sin(t*11)*.024:0));
 if(a.bones.schutzbrille)rotateWorld(a.bones.schutzbrille,X,Math.sin(t*5+.7)*.014);
 a.blink=blink;a.emotion=emotion;
}
function drawer(t){const a=actors.kajo,open=interval(t,2.25,2.85)*(1-interval(t,4.65,5.25));a.bones.schubladeK.position.y+=.045*open;a.group.updateMatrixWorld(true);const grip=interval(t,2.05,2.75)*(1-interval(t,4.8,5.4));if(grip>0)arm(a,'L',worldPosition(a.drawerAnchor),grip,true);return open;}
const items=[];
const crateHome=V(-.10,0,.78),fallStart=5.62,impact=6.04,crateHeight=.88,crateDepth=.463,crateWidth=.414;
function cratePose(t){
 const teasing=interval(t,5.05,5.23)*(1-interval(t,5.4,5.62))*Math.sin((t-5.05)*15)*.045;
 let angle=teasing;
 if(t>=fallStart){const u=clamp((t-fallStart)/(impact-fallStart));angle=Math.PI/2*u*u;
  if(t>impact){const age=t-impact;angle=Math.PI/2-.105*Math.exp(-age*8)*Math.sin(age*24);}}
 crate.rotation.set(angle,0,0);const pivot=crateHome.clone().add(V(0,0,crateDepth/2));crate.position.copy(pivot).add(V(0,0,-crateDepth/2).applyQuaternion(crate.quaternion));
 let minimum=Infinity;for(const x of [-crateWidth/2,crateWidth/2])for(const y of [0,crateHeight])for(const z of [-crateDepth/2,crateDepth/2])minimum=Math.min(minimum,V(x,y,z).applyQuaternion(crate.quaternion).y);crate.position.y=-minimum;
 const open=interval(t,4.05,4.65);if(lidCurve)crateBones.deckel.quaternion.copy(lidCurve.closed).slerp(lidCurve.opened,open);crate.updateMatrixWorld(true);return {angle,open};
}
function support(c,q){let depth=0;for(const p of c.corners)depth=Math.max(depth,-p.clone().applyQuaternion(q).y);return depth+.001;}
function createItems(){
 cratePose(0);
 const groups=new Map();crate.traverse(mesh=>{
  if(!mesh.isSkinnedMesh)return;let node=mesh;while(node&&!node.userData.knochen)node=node.parent;const name=node?.userData.knochen;
  if(/^inhalt[.]\d+[.]1$/.test(name||'')){if(!groups.has(name))groups.set(name,[]);groups.get(name).push(mesh);}
 });
 for(const [name,meshes]of groups){
  const bone=crateBones[name.replace(/\./g,'')],mesh=meshes[0],bounds=new THREE.Box3(),inverse=bone.matrixWorld.clone().invert();
  for(const part of meshes){part.skeleton.update();for(let i=0;i<part.geometry.attributes.position.count;i++)bounds.expandByPoint(part.getVertexPosition(i,V()).applyMatrix4(part.matrixWorld).applyMatrix4(inverse));}
  const center=bounds.getCenter(V()),scale=bone.getWorldScale(V()),half=bounds.getSize(V()).multiply(scale).multiplyScalar(.5),corners=[];
  for(const x of [-half.x,half.x])for(const y of [-half.y,half.y])for(const z of [-half.z,half.z])corners.push(V(x,y,z));
  const home=crate.worldToLocal(bone.localToWorld(center.clone())),homeQ=crate.quaternion.clone().invert().multiply(bone.getWorldQuaternion(Q()));
  const axis=half.x<half.y&&half.x<half.z?X:half.y<half.z?Y:V(0,0,1),normal=axis.clone().applyQuaternion(homeQ),flat=Q().setFromUnitVectors(normal,Y).multiply(homeQ);
  items.push({mesh,meshes,bone,center,scale,corners,home,homeQ,flat,rest:{p:bone.position.clone(),q:bone.quaternion.clone()},release:impact+.018+items.length*.012,path:[],rotation:[],source:'archivkiste_K/'+name,position:V()});
 }
 if(items.length!==12)throw new Error('Expected all twelve original K archive cards');
 // Animate the original twelve rigid contents through their original bones.
 // No duplicate contents, substituted token shapes or fabricated item meshes.
 for(let i=0;i<items.length;i++){
  const c=items[i];cratePose(c.release);const inside=crate.localToWorld(c.home.clone()),opening=crate.localToWorld(V(c.home.x,.94,c.home.z));
  const initialQ=crate.quaternion.clone().multiply(c.homeQ),flat=Q().setFromAxisAngle(Y,(i-5.5)*.24).multiply(c.flat),p=opening.clone();let velocity=V((i%4-1.5)*.78,.08,.7+Math.floor(i/4)*.30),rotation=initialQ.clone(),omega=V(3+i*.22,(i%3-1)*2,.6),bounces=0;
  const slideFrames=20;
  for(let f=0;f<=slideFrames;f++){c.path.push(inside.clone().lerp(opening,travel(f/slideFrames)));c.rotation.push(initialQ.clone());}
  for(let f=1;f<=120*4;f++){
   const dt=1/120;velocity.y-=9.81*dt;p.addScaledVector(velocity,dt);const speed=omega.length();if(speed>0)rotation.premultiply(Q().setFromAxisAngle(omega.clone().normalize(),speed*dt));
   if(bounces>1||f>65)rotation.slerp(flat,.13);
   const floor=support(c,rotation);
   if(p.y<floor){p.y=floor;if(velocity.y<-.2){velocity.y=-velocity.y*.22;bounces++;}else velocity.y=0;velocity.x*=.84;velocity.z*=.84;omega.multiplyScalar(.8);}
   if(f>120&&velocity.length()<.035){velocity.set(0,0,0);rotation.copy(flat);p.y=support(c,rotation);}
   c.path.push(p.clone());c.rotation.push(rotation.clone());
  }
 }
 cratePose(0);
}
function itemPose(c,t){
 c.mesh.visible=true;
 if(t<c.release){c.bone.position.copy(c.rest.p);c.bone.quaternion.copy(c.rest.q);crate.updateMatrixWorld(true);c.position.copy(c.bone.localToWorld(c.center.clone()));return;}
 const frame=clamp((t-c.release)*120,0,c.path.length-1),i=Math.floor(frame),f=frame-i,p=c.path[i].clone().lerp(c.path[Math.min(i+1,c.path.length-1)],f),q=c.rotation[i].clone().slerp(c.rotation[Math.min(i+1,c.path.length-1)],f);
 c.bone.quaternion.copy(c.bone.parent.getWorldQuaternion(Q()).invert().multiply(q));const origin=p.clone().sub(c.center.clone().multiply(c.scale).applyQuaternion(q));c.bone.position.copy(c.bone.parent.worldToLocal(origin));c.bone.updateWorldMatrix(true,true);c.position.copy(p);
}
function pose(t){if(!ready)return;const phase=scenePhase(t);host.dataset.sceneTime=t.toFixed(4);
 // Keep the full silhouette inside narrow stages, with a gentle approach to
 // the shared crate. Wide desktop stages retain the close original framing.
 const approach=interval(t,.25,2.2)*(1-interval(t,15.1,17.64)),width=THREE.MathUtils.lerp(4.65,3.85,approach),distance=Math.max(7,width/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect)+.5);
 camera.position.set(0,1+distance*.20,.4+distance);camera.lookAt(0,1,.4);
 Object.values(actors).forEach(a=>{reset(a);a.bones.root.position.y-=a.id==='toki'?.011:.006;a.walking=false;a.stance={};a.armSwing=0;a.contacts={};});
 const frontT=V(-.87,0,.80),frontK=V(.77,0,.60);
 for(const a of Object.values(actors)){
  const front=a.id==='toki'?frontT:frontK;
  if(t>=.25&&t<1.95)walk(a,t,a.start,a.atCrate,.25,1.95);
  else if(t>=1.95&&t<6.95)a.group.position.copy(a.atCrate);
  else if(t>=6.95&&t<8.15)walk(a,t,a.atCrate,front,6.95,8.15);
  else if(t>=8.15&&t<15.1)a.group.position.copy(front);
  else if(t>=15.1&&t<17.64)walk(a,t,front,a.start,15.1,17.64,true);
  if(!a.walking){a.group.rotation.y=0;for(const side of ['L','R'])solveGait(a,0,0,side);}
  if(t>0&&t<.25)a.group.rotation.y=interval(t,0,.25)*a.walkYaw;
  if(t>=1.95&&t<2.2)a.group.rotation.y=(1-interval(t,1.95,2.2))*a.walkYaw;
  if(t>=17.64){let yaw=Math.atan2(a.start.x-front.x,a.start.z-front.z)+Math.PI;if(yaw>Math.PI)yaw-=Math.PI*2;a.group.rotation.y=(1-interval(t,17.64,17.96))*yaw;}
  a.group.updateMatrixWorld(true);
  idleArms(a);
 }
 const d=drawer(t),box=cratePose(t);items.forEach(c=>itemPose(c,t));
 if(t>=3.5&&t<5.25){const w=interval(t,3.5,4.05)*(1-interval(t,4.65,5.25));arm(actors.toki,'R',worldPosition(crate.lidAnchor),w);}
 if(t>=4.8&&t<5.90){const w=interval(t,4.8,5.3)*(1-interval(t,5.38,5.90));arm(actors.toki,'R',crateHome.clone().add(V(-.207,.69,.10)),w);}
 const startle=interval(t,5.92,6.30)*(1-interval(t,6.45,6.92));
 if(startle>0){const a=actors.toki;const hop=t>=6.15&&t<6.55?.07*Math.sin(Math.PI*(t-6.15)/.4):0;a.group.position.y+=hop;a.group.updateMatrixWorld(true);gesture(a,'L',startle,.30,.62);gesture(a,'R',startle,.30,.62);gesture(actors.kajo,'L',startle,.15,.48);gesture(actors.kajo,'R',startle,.15,.48);}
 for(const a of Object.values(actors)){
  const attempt=a.id==='toki'?[8.45,9.8]:[8.95,10.3];let reach=0;for(const begin of attempt)reach=Math.max(reach,interval(t,begin,begin+.38)*(1-interval(t,begin+.65,begin+1.03)));
  if(reach){bend(a,(a.id==='toki'?.42:.24)*reach,.018*reach);const shoulder=worldPosition(a.bones[a.id==='toki'?'oberarmR':'oberarmL']);arm(a,a.id==='toki'?'R':'L',shoulder.clone().add(V(a.id==='toki'?.22:-.32,-.36,.35)),reach,false,90);}
  if(t>=11.5&&t<12.8){const w=interval(t,11.5,11.95)*(1-interval(t,12.35,12.8));gesture(a,'L',w,.10,.58);gesture(a,'R',w,.10,.58);}
  if(t>=13.0&&t<14.6){const w=interval(t,13,13.45)*(1-interval(t,14.15,14.6));gesture(a,a.id==='toki'?'R':'L',w,.14,.35);}
 }
 let speaking='',speech=null,speechTime=null,speechClip=null,clip=null;
 if(!muted&&!voice.ended){updateDialogue();clip=currentClip;speechTime=clip?voice.currentTime-clip.t:null;}
 if(clip){speechClip=clip.id;speaking=clip.speaker==='kajo-cache'?'kajo':clip.speaker;if(!paused||speechPreview)speech=mouthSample(clip.id,speechTime);}
 caption(phase,clip,speechTime);
 for(const a of Object.values(actors)){
  const other=actors[a.id==='toki'?'kajo':'toki'];let look=V(0,1.2,7),emotion='happy';
  if(t>.3&&t<2.2)look=crateHome.clone().add(V(0,.8,0));
  else if(t>=2.2&&t<4.05){look=a.id==='kajo'?worldPosition(a.drawerAnchor):worldPosition(other.bones.augeL);emotion='focus';}
  else if(t>=4.05&&t<6.04){look=worldPosition(crate.lidAnchor);emotion='focus';}
  else if(t>=6.04&&t<6.9){look=items[2].position;emotion='surprise';}
  else if(t>=6.9&&t<11.5){look=items[a.id==='toki'?0:11].position;emotion=t>8.2?'focus':'surprise';}
  else if(t>=11.5&&t<15.1){look=worldPosition(other.bones.augeL);emotion='happy';}
  if(clip?.id==='line05'&&speechTime>=dialogue.inviteOffset&&a.id==='toki')look=camera.position;
  expression(a,t,look,emotion,a.id===speaking?speech:null);
 }
 // The complete spoken greeting keeps both figures visible throughout.
 const fade=paused||!muted?1:t>17.7?1-interval(t,17.7,18):t<.20?interval(t,0,.20):1;renderer.domElement.style.opacity=fade;
 Object.assign(window.heroStage,{phase,time:t,speechTime,speechClip,speaking,drawer:d,itemCount:items.filter(c=>t>=c.release).length,coinCount:items.filter(c=>t>=c.release).length,boxAngle:box.angle,lidOpen:box.open,lidAngle:crateRest.deckel.q.angleTo(crateBones.deckel.quaternion)});renderer.render(scene,camera);
}
try{
 renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(35,1,.05,40);camera.position.set(0,2.4,7.0);camera.lookAt(0,1.0,.4);
 scene.add(new THREE.HemisphereLight(0xfff9e8,0x659b92,2.4));const key=new THREE.DirectionalLight(0xffe1b0,3);key.position.set(-3,5,4);key.castShadow=true;key.shadow.mapSize.set(768,768);Object.assign(key.shadow.camera,{left:-3,right:3,top:4,bottom:-3});key.shadow.bias=-.001;scene.add(key);const rim=new THREE.DirectionalLight(0x84dedb,1.7);rim.position.set(3,3,-3);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(8,7),new THREE.ShadowMaterial({opacity:.25}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
 const resize=()=>{const r=host.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();if(ready)pose(elapsed%DURATION);};new ResizeObserver(resize).observe(host);resize();
 const configs=[{id:'toki',height:1.4,start:V(-1.30,0,-.04),atCrate:V(-.82,0,.34),lengths:[.035,.035],hip:.1225,ankle:.0525},{id:'kajo',height:2.22,start:V(1.07,0,-.25),atCrate:V(.80,0,.10),lengths:[.045,.155],hip:.245,ankle:.045}];
 await Promise.all(configs.map(async c=>{
  const g=await loader.loadAsync(`assets/models/${c.id}-web.glb`),model=g.scene,bones=bonesOf(model);const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(V());const scale=c.height/size.y;model.scale.setScalar(scale);model.position.y=-bounds.min.y*scale;
  const group=new THREE.Group();group.add(model);scene.add(group);model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  // Karl's web styling [DE]: remove only the white sole primitives, preserving
  // both native brown shoes, their joints and the untouched source GLB.
  const hiddenSoles=[];if(c.id==='toki'){
   model.updateMatrixWorld(true);let bottom=Infinity;
   model.traverse(o=>{if(!o.isMesh)return;const materials=Array.isArray(o.material)?o.material:[o.material];if(materials.every(m=>m.name==='sohle')){o.visible=false;hiddenSoles.push(o);return;}let role='';for(let n=o;n;n=n.parent)if(n.userData.bauplan_teil){role=n.userData.bauplan_teil;break;}if(/^schuh[.]?[LR]$/.test(role)){o.skeleton?.update();for(let i=0;i<o.geometry.attributes.position.count;i++)bottom=Math.min(bottom,o.getVertexPosition(i,V()).applyMatrix4(o.matrixWorld).y);}});
   if(hiddenSoles.length!==2||!Number.isFinite(bottom))throw new Error('Native sole/shoe geometry not found');model.position.y-=bottom;model.updateMatrixWorld(true);
  }
  const rest=Object.fromEntries(Object.entries(bones).map(([n,b])=>[n,{p:b.position.clone(),q:b.quaternion.clone()}]));const a={...c,model,group,bones,rest,scale,hiddenSoles,legLengths:c.lengths,hipHeight:c.hip,soleAnkle:c.ankle,footTargets:{},footWorldQ:{},tips:{},handGrips:{},walkYaw:Math.atan2(c.atCrate.x-c.start.x,c.atCrate.z-c.start.z),returnYaw:Math.atan2(c.start.x-c.atCrate.x,c.start.z-c.atCrate.z)};a.mouthMeshes=[];model.traverse(o=>{if(o.morphTargetDictionary?.neutral!==undefined)a.mouthMeshes.push(o);});a.contacts={};actors[c.id]=a;
  for(const s of ['L','R']){group.updateMatrixWorld(true);a.footTargets[s]=worldPosition(bones['fuss'+s]);a.footWorldQ[s]=bones['fuss'+s].getWorldQuaternion(Q());const tip=new THREE.Object3D();tip.position.copy(bones['finger'+s].position).multiplyScalar(1.7);bones['hand'+s].add(tip);a.tips[s]=tip;model.traverse(o=>{if(o.userData.name==='SOCKET_hand.'+s)a.handGrips[s]=o;});if(!a.handGrips[s])throw new Error('Native grip socket missing');}
  if(c.id==='kajo'){
   a.drawerAnchor=attachAnchor(a,'schubladeK',V(-.287,.495,.05));
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.023,.005,10,28),new THREE.MeshStandardMaterial({color:0xc69b54,metalness:.65,roughness:.32}));a.drawerAnchor.quaternion.copy(bones.schubladeK.getWorldQuaternion(Q()).invert());a.drawerAnchor.add(ring);ring.castShadow=true;
   const stemAnchor=attachAnchor(a,'schubladeK',V(-.249,.495,.05));stemAnchor.quaternion.copy(bones.schubladeK.getWorldQuaternion(Q()).invert());const stem=new THREE.Mesh(new THREE.CylinderGeometry(.005,.005,.078,8),ring.material);stem.rotation.z=Math.PI/2;stemAnchor.add(stem);stem.castShadow=true;
  }
 }));
 const cg=await loader.loadAsync('assets/models/kiste-web.glb');crate=new THREE.Group();const cm=cg.scene,cb=new THREE.Box3().setFromObject(cm),cs=cb.getSize(V()),cc=cb.getCenter(V()),sc=.88/cs.y;cm.scale.setScalar(sc);cm.position.set(-cc.x*sc,-cb.min.y*sc,-cc.z*sc);crate.add(cm);scene.add(crate);cm.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});crateBones=bonesOf(cm);crateRest=Object.fromEntries(Object.entries(crateBones).map(([n,b])=>[n,{p:b.position.clone(),q:b.quaternion.clone()}]));
 const lt=cg.animations.find(a=>a.name==='kiste_deckel_auf')?.tracks.find(t=>t.name.startsWith(crateBones.deckel.name+'.')&&t.name.endsWith('.quaternion'));
 if(lt){
  lidCurve=lt.createInterpolant();const rest=crateRest.deckel.q;let maximum=-1,peak=0;
  for(let i=0;i<lt.times.length;i++){const angle=rest.angleTo(Q().fromArray(lt.values,i*4));if(angle>maximum+.001){maximum=angle;peak=lt.times[i];}}
  // The native action contains opening, a hold and closing. Use its opening
  // segment only; the falling crate must retain an actually open lid.
  lidCurve.end=peak;lidCurve.closed=rest.clone();lidCurve.opened=Q().fromArray(lidCurve.evaluate(peak));
 }
 crate.updateMatrixWorld(true);crate.lidAnchor=new THREE.Object3D();const lidPoint=crate.localToWorld(V(-.195,.849,.07));crate.lidAnchor.position.copy(crateBones.deckel.worldToLocal(lidPoint));crateBones.deckel.add(crate.lidAnchor);
 const dialogBase='assets/hero-audio/dialog_2026-10-12/';dialogue=await (await fetch(dialogBase+'manifest.json?v=neu01')).json();dialogue.audioUrl=dialogBase+dialogue.audioFile+'?v='+dialogue.audioSha256;voiceManifest=dialogue.clips;cues=voiceManifest;lipTracks=await (await fetch(dialogBase+'lipsync.json?v='+dialogue.lipsyncSha256)).json();createItems();ready=true;host.dataset.ready='true';document.getElementById('hero-fallback').hidden=true;status.hidden=true;
 window.heroStage={actors,renderer,scene,camera,crate,items,coins:items,voice,cues,lipTracks,mouthSample,previewSpeech:v=>{speechPreview=v;},pause:v=>{paused=v;if(v)voice.pause();syncControls();},seek:t=>{elapsed=t;lastCue=cues.findLastIndex(c=>t>=c.t);pose(t%DURATION);},duration:DURATION};pose(0);
 function loop(t){requestAnimationFrame(loop);const dt=Math.min((t-last)/1000,.10);last=t;if(!ready||!visible||document.hidden)return;if(!paused){elapsed=muted?elapsed+dt:sceneTimeForAudio(voice.currentTime);pose(elapsed%DURATION);}}
 requestAnimationFrame(loop);
}catch(e){status.textContent='Toki & Kajo bleiben im Figurenalbum erreichbar. Diese 3D-Bühne wird im Browser nicht unterstützt.';host.dataset.ready='fallback';console.warn('Hero scene fallback:',e.message);}
motion.addEventListener('click',()=>{paused=!paused;voiceOnly=false;if(paused){++playAttempt;voice.pause();}else resumeVoice();syncControls();if(ready)pose(elapsed%DURATION);});
sound.addEventListener('click',()=>{if(muted||(paused&&voice.paused)){const restart=muted;muted=false;voiceOnly=paused;playDialogue(restart);}else{muted=true;voiceOnly=false;++playAttempt;voice.pause();activeSpeaker='';}syncControls();if(ready)pose(elapsed%DURATION);});
document.getElementById('scene-restart').addEventListener('click',()=>{elapsed=0;lastCue=-1;currentClip=null;++playAttempt;voice.pause();voice.currentTime=0;paused=reduced.matches;voiceOnly=paused&&!muted;syncControls();if(ready)pose(0);if(!muted)playDialogue(true);});
reduced.addEventListener('change',e=>{paused=e.matches;if(paused)voice.pause();else resumeVoice();syncControls();if(ready)pose(elapsed%DURATION);});
new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(!visible)voice.pause();else resumeVoice();},{threshold:.1}).observe(host);
document.addEventListener('visibilitychange',()=>{if(document.hidden)voice.pause();else resumeVoice();});
document.getElementById('story-audio').addEventListener('play',()=>{muted=true;voiceOnly=false;++playAttempt;voice.pause();syncControls();});
