import * as THREE from 'three';
import {GLTFLoader} from './vendor/GLTFLoader.js';

// Presentation choreography [DE], using the project's existing GLB meshes and clips.
const host=document.getElementById('character-stage'), status=document.getElementById('stage-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches,visible=true,ready=false,frame=0,last=0,elapsed=0,gestureUntil=0;
const actors={},loader=new GLTFLoader();
const button=document.getElementById('motion-toggle');
function syncButton(){button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Bewegung fortsetzen':'Bewegung pausieren');button.textContent=paused?'▶':'Ⅱ';}
syncButton();
let renderer,scene,camera;
try{
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(33,1,.05,80);camera.position.set(0,1.65,6.6);camera.lookAt(0,1.1,0);
 scene.add(new THREE.HemisphereLight(0xf7ffe6,0x8db7ac,2.5));
 const key=new THREE.DirectionalLight(0xffe9bd,3.2);key.position.set(-3,5,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=4;key.shadow.camera.bottom=-3;key.shadow.bias=-.001;scene.add(key);
 const rim=new THREE.DirectionalLight(0x85e4d9,2);rim.position.set(3,3,-3);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(10,7),new THREE.ShadowMaterial({opacity:.2}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
 const resize=()=>{const r=host.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();if(ready)renderer.render(scene,camera);};new ResizeObserver(resize).observe(host);resize();
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;ready=false;status.hidden=false;status.textContent='Die 3D-Bühne ruht. Toki und Kajo bleiben im Figurenalbum erreichbar.';document.getElementById('hero-fallback').hidden=false;syncButton();});
 const configs=[{id:'toki',url:'../../04_assets/characters/toki/v2/3d/toki.glb',height:1.3,x:-.94,z:.32},{id:'kajo',url:'../../04_assets/characters/kajo-cache/v2/3d/kajo_komplett.glb',height:2.23,x:.63,z:-.08}];
 await Promise.all(configs.map(async cfg=>{
  const gltf=await loader.loadAsync(cfg.url);const model=gltf.scene,box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
  const scale=cfg.height/size.y;model.scale.setScalar(scale);model.position.set(-center.x*scale,-box.min.y*scale,-center.z*scale);
  model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;}});
  const group=new THREE.Group();group.add(model);group.position.set(cfg.x,0,cfg.z);scene.add(group);
  const mixer=new THREE.AnimationMixer(model),actions=Object.fromEntries(gltf.animations.map(c=>[c.name,mixer.clipAction(c)]));
  actors[cfg.id]={...cfg,group,model,mixer,actions,current:'',mode:'idle'};act(cfg.id,'idle',true);
 }));
 ready=true;document.getElementById('hero-fallback').hidden=true;status.hidden=true;host.dataset.ready='true';
 window.heroStage={actors,renderer,scene,camera,pause:value=>{paused=value;syncButton();},act};
 renderOnce();loop();
}catch(e){status.textContent='Toki & Kajo im Figurenalbum. Die 3D-Bühne ist in diesem Browser nicht verfügbar.';host.dataset.ready='fallback';console.warn('3D presentation fallback:',e.message);}

function act(id,clip,instant=false){const a=actors[id];if(!a)return;const next=a.actions[clip]||a.actions.idle;if(!next||a.current===clip)return;
 const previous=a.actions[a.current];next.reset().setEffectiveTimeScale(.85).setEffectiveWeight(1).play();if(previous){if(instant)previous.stop();else{previous.fadeOut(.24);next.fadeIn(.24);}}a.current=clip;
}
function renderOnce(){if(ready)renderer.render(scene,camera);}
function loop(t=0){frame=requestAnimationFrame(loop);if(t-last<32)return;const dt=Math.min((t-last)/1000,.07);last=t;if(!ready||!visible||document.hidden)return;
 if(!paused){elapsed+=dt;const cycle=elapsed%22;
  for(const a of Object.values(actors)){
   let moving=cycle>3&&cycle<11||cycle>15&&cycle<20;
   if(elapsed<gestureUntil)moving=false;
   if(moving){act(a.id,'gehen');const phase=a.id==='toki'?0:Math.PI;const f=elapsed*.48+phase;a.group.position.x=a.x+Math.sin(f)*.38;a.group.position.z=a.z+Math.cos(f)*.2;a.group.rotation.y=Math.atan2(Math.cos(f)*.38,-Math.sin(f)*.2);}
   else{if(elapsed>=gestureUntil)act(a.id,'idle');a.group.rotation.y+=(0-a.group.rotation.y)*.1;}
   a.mixer.update(dt);
  }
 }
 renderer.render(scene,camera);
}
button.addEventListener('click',()=>{paused=!paused;syncButton();renderOnce();});
reduced.addEventListener('change',e=>{paused=e.matches;syncButton();renderOnce();});
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{threshold:.05}).observe(host);
document.querySelectorAll('[data-character]').forEach(b=>b.addEventListener('click',()=>{
 const id=b.dataset.character;document.getElementById('speech-name').textContent=id==='toki'?'Toki':'Kajo';document.getElementById('speech-text').textContent=id==='toki'?'„Manchmal bin ich ein ganzes Wort – manchmal nur ein Stück!“':'„Was einmal gerechnet ist, rechnet man nicht nochmal.“';
 if(!ready)return;gestureUntil=elapsed+3.8;const a=actors[id];a.group.rotation.y=0;act(id,id==='toki'?'toki_freudenhupf':'kajo_daumen_hoch');if(paused){a.mixer.update(.7);renderOnce();}
}));
window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);renderer?.dispose();});
