import * as THREE from 'three';
import {GLTFLoader} from './vendor/GLTFLoader.js';

// [DE] Live exploration of the source-bound Blender city, with progressive information.
const $=id=>document.getElementById(id),dialog=$('map-dialog'),viewport=$('map-view-viewport'),info=$('map-view-info'),content=$('map-info-content');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const V=(a)=>new THREE.Vector3(a[0],a[2],-a[1]);
const functions={L00:'Raten und gegenprüfen',L01:'Text zerlegen',L02:'Bedeutungen darstellen',L03:'Vergleichen und gewichten',L04:'Beiträge untersuchen',L05:'Das nächste Stück wählen',L06:'Zwischenrechnungen bewahren',L07:'Gewichte trainieren',L08:'Zahlengepäck packen',L09:'Quellen und Grenzen prüfen',L10:'Antworten gegenprüfen',FINALE:'Die Stadt arbeitet zusammen'};
const overviewIds=['L01','L02','L05','L06','L07','L08','L09','FINALE'];
const regionNames={L01:'Tokenhafen',L02:'Kartenwald',L05:'Turm der Schichten',L06:'Kästnerviertel',L07:'Geschichtsviertel',L08:'Stufengebirge',L09:'Quellen & Mauer',FINALE:'Lichterbrücke'};
const shortName=id=>window.PremiumSite.figures.find(f=>f.id===id)?.name.replace(/ \(.*?\)/g,'')||id;
let options={},data=null,part=1,selected=null,figure=null,feature=null,mode='places',route=0,people=false,ready=false,trigger=null,request=0,anim=0,imageMode=false,imageX=0,imageY=0,imageFit=1;
let renderer,scene,camera,model,lineGroup,theta=2.438,phi=.975,zoom=1,center=new THREE.Vector3(45,5,-46),frame=0,dirty=true,renderCount=0,lastFrame=0;
let modelCache=new Map(),dataPromise,pointers=new Map(),drag=null,pinch=null,wasDrag=false,suppressClickUntil=0,lastAnchor=null;
const raycaster=new THREE.Raycaster(),ndc=new THREE.Vector2(),projected=new THREE.Vector3(),projectionPositions={};
const canvasHost=document.createElement('div');canvasHost.className='live-canvas-host';viewport.prepend(canvasHost);
const pinLayer=document.createElement('div');pinLayer.className='live-pins';viewport.append(pinLayer);
const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('live-leaders');viewport.append(leaders);
const status=document.createElement('div');status.className='live-status';status.setAttribute('role','status');viewport.append(status);
const orientation=document.createElement('div');orientation.className='live-orientation';orientation.innerHTML='<button data-live-turn="-1" aria-label="Ansicht nach links drehen">↶</button><span id="live-direction">Stadtansicht</span><button data-live-turn="1" aria-label="Ansicht nach rechts drehen">↷</button><button data-live-top aria-label="Karte von oben ansehen">Draufsicht</button>';viewport.append(orientation);
const guide=document.createElement('div');guide.className='live-guide';guide.innerHTML=`<nav aria-label="Kartenansicht"><button data-live-mode="places" aria-pressed="true"><span aria-hidden="true">⌖</span> Entdecken</button><button data-live-mode="travel" aria-pressed="false"><span aria-hidden="true">↗</span> Deine Reise</button><button data-live-mode="flows" aria-pressed="false"><span aria-hidden="true">⇄</span> Antwortfluss</button></nav><div class="live-selects"><label><span class="live-search-label">Zu einem Ort</span><select id="city-place-select"></select></label><button id="city-people" aria-pressed="false"><span aria-hidden="true">◌</span> Bewohner</button></div><div id="live-route-controls" hidden><button id="map-route-prev" aria-label="Vorige Verbindung">←</button><label>Von wo nach wo?<select id="map-route-select"></select></label><button id="map-route-next" aria-label="Nächste Verbindung">→</button></div>`;
dialog.insertBefore(guide,$('map-view-viewport').parentElement);
const journey=document.createElement('nav');journey.className='live-journey';journey.setAttribute('aria-label','Stationen in der Geschichte');dialog.insertBefore(journey,$('map-view-viewport').parentElement);
const intro=document.createElement('div');intro.className='live-intro';dialog.insertBefore(intro,$('map-view-viewport').parentElement);
// Camera tools belong to the canvas, leaving the header for discovery and orientation.
const cameraTools=dialog.querySelector('.map-view-toolbar');viewport.append(cameraTools);cameraTools.classList.add('live-camera-tools');
$('map-view-fullscreen').textContent='⛶';$('map-view-fullscreen').setAttribute('aria-label','Karte im Vollbild öffnen');$('map-view-fullscreen').title='Vollbild';
dialog.classList.add('live-map-dialog');$('map-view-layer').hidden=true;
$('map-view-viewport').setAttribute('aria-label','Dreidimensionale Stadtkarte: Ziehen dreht, Mausrad zoomt, rechte Maustaste verschiebt.');
$('map-view-footer')?.removeAttribute('aria-hidden');dialog.querySelector('.map-view-footer>span').textContent='Ziehen: drehen · Mausrad / zwei Finger: zoomen · Rechtsziehen: verschieben · 0: Stadtübersicht';
const key=v=>v==='bridge'?v:Number(v);
const station=id=>data.stations['t'+part].find(p=>p.id===id);
const point=index=>data.stations['t'+part].find(p=>p.index===index);
const allFigures=()=>window.PremiumSite.figures;
const list=()=>mode==='travel'?data.journey['t'+part]:data.flows;
const loadData=()=>dataPromise||(dataPromise=fetch('assets/city/live.json?v='+window.SAGA.meta.generation).then(r=>{if(!r.ok)throw new Error('Die 3D-Stadtinformationen konnten nicht geladen werden.');return r.json();}));
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const zoomLimit=()=>imageMode||part===1?8:24;
function invalidate(){dirty=true;if(!frame&&dialog.open)frame=requestAnimationFrame(paint);}
function init(){
 if(renderer)return;
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.setClearColor('#173d46');renderer.domElement.setAttribute('aria-label','Echte dreidimensionale Kontextia-Szene');canvasHost.append(renderer.domElement);
 renderer.toneMappingExposure=1.0;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
 scene=new THREE.Scene();scene.add(new THREE.HemisphereLight('#f8edd6','#46616c',1.9));const sun=new THREE.DirectionalLight('#fff0d1',2.3);sun.position.set(25,90,-10);sun.target.position.set(45,0,-46);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-85,right:85,top:85,bottom:-85,near:.5,far:220});sun.shadow.bias=-.0002;sun.shadow.normalBias=.15;scene.add(sun,sun.target);const fill=new THREE.DirectionalLight('#a3d6db',.7);fill.position.set(-30,20,-80);scene.add(fill);
 camera=new THREE.OrthographicCamera(-70,70,45,-45,.1,600);lineGroup=new THREE.Group();scene.add(lineGroup);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();status.hidden=false;status.textContent='Die 3D-Ansicht ist unterbrochen. Lade die Karte erneut oder öffne die Bildkarte.';ready=false;});
}
function updateCamera(){
 const w=viewport.clientWidth,h=viewport.clientHeight;if(!w||!h||!camera)return;const half=Math.max(39,66/(w/h))/zoom;camera.left=-half*w/h;camera.right=half*w/h;camera.top=half;camera.bottom=-half;camera.position.copy(center).add(new THREE.Vector3(Math.sin(phi)*Math.sin(theta),Math.cos(phi),Math.sin(phi)*Math.cos(theta)).multiplyScalar(160));camera.lookAt(center);camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
 const width=Math.round(w*Math.min(devicePixelRatio,1.5));if(renderer.domElement.width!==width||Math.abs(renderer.domElement.height-h*Math.min(devicePixelRatio,1.5))>1)renderer.setSize(w,h,false);
 $('map-view-scale').value=Math.round(zoom*100)+' %';$('map-view-minus').disabled=zoom<=.7501;$('map-view-plus').disabled=zoom>=zoomLimit()-.001;$('live-direction').textContent=Math.round(((theta-2.438)*180/Math.PI+360)%360)+'°';
}
function cursorNDC(x,y){const r=viewport.getBoundingClientRect();return new THREE.Vector2((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1);}
function surfaceAt(x,y){updateCamera();const uv=cursorNDC(x,y);raycaster.setFromCamera(uv,camera);const hit=raycaster.intersectObject(model,true)[0];if(hit)return {point:hit.point.clone(),uv};const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-center.y),p=new THREE.Vector3();return {point:raycaster.ray.intersectPlane(plane,p)||center.clone(),uv};}
function holdAnchor(anchor,uv){updateCamera();const right=new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion),up=new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion);center.copy(anchor).addScaledVector(right,-uv.x*camera.right).addScaledVector(up,-uv.y*camera.top);lastAnchor={world:anchor.toArray(),uv:uv.toArray()};invalidate();}
function paint(now){frame=0;if(!dialog.open||!renderer||!ready||imageMode)return;if(dirty){updateCamera();renderer.render(scene,camera);renderCount++;projectPins();dirty=false;lastFrame=now;} }
function animateTo(nextCenter,nextZoom=zoom,nextTheta=theta,nextPhi=phi){
 cancelAnimationFrame(anim);if(reduced()){center.copy(nextCenter);zoom=nextZoom;theta=nextTheta;phi=nextPhi;invalidate();return;}
 const from=center.clone(),z=zoom,t=theta,p=phi,start=performance.now();function tick(now){const f=Math.min(1,(now-start)/300),u=1-Math.pow(1-f,3);center.copy(from).lerp(nextCenter,u);zoom=z+(nextZoom-z)*u;theta=t+(nextTheta-t)*u;phi=p+(nextPhi-p)*u;invalidate();if(f<1)anim=requestAnimationFrame(tick);}anim=requestAnimationFrame(tick);
}
function resetCamera(){animateTo(new THREE.Vector3(45,part===2?-1:5,-46),1,2.438,.975);}
function show(html){info.hidden=false;dialog.classList.add('has-info');content.innerHTML=html;info.scrollTop=0;invalidate();}
function memberButtons(ids,compact=false){return `<div class="live-members ${compact?'compact':''}">${ids.map(id=>{const f=allFigures().find(f=>f.id===id);return f?`<button data-live-figure="${esc(id)}"><img src="${esc(f.bild)}" alt=""><span>${esc(shortName(id))}<small>${esc(f.rolle||window.SAGA.figuren.find(x=>x.id===id)?.rolle||'')}</small></span></button>`:'';}).join('')}</div>`;}
function peoplePanel(p){const first=p.members.slice(0,4),rest=p.members.slice(4);return `<section class="live-people-panel"><h4>Wen du hier triffst</h4>${memberButtons(first,true)}${rest.length?`<details><summary>Alle ${p.members.length} Beteiligten kennenlernen</summary>${memberButtons(rest,true)}</details>`:''}</section>`;}
function bridgeInfo(){const t=window.SAGA.teile[0],a=t.abschluss;return `<p class="eyebrow">Die gemeinsame Arbeit der Stadt</p><h3>Die Lichterbrücke</h3><img class="map-info-theme" src="assets/city/aktuell_2026-10-12/bruecke.webp" alt="Neun Brückenbögen"><p>${esc(a.geschichte)}</p><h4>Welcher Bogen gehört zu welchem Bezirk?</h4><div class="bridge-arch-register">${window.KontextAtlas?data.stations.t1.filter(p=>/^L0[1-9]$/.test(p.id)).map(p=>`<button data-live-place="${p.index}"><span>${p.id.slice(1)}</span>${esc(p.label)}</button>`).join(''):''}</div><details><summary>Widerlager, Laternen und die warme Tür</summary><p>L00 lässt das Widerlager glimmen. L10 entzündet die sechs Brückenlaternen. Unter dem fünften der neun Bögen wartet die warme Tür.</p><p>${esc(t.epilog||a.funktion)}</p></details>`;}
function heartInfo(){const a=window.SAGA.teile[1].abschluss;return `<p class="eyebrow">Der Abschluss der Laborreise</p><h3>Herz des Turms</h3><img class="map-info-theme" src="assets/city/labore-r1/FINALE.webp" alt="Herzraum"><p>${esc(a.geschichte)}</p><p>${esc(a.funktion)}</p><div class="city-lab-register">${data.stations.t2.filter(p=>/^L0[1-9]$/.test(p.id)).map(p=>`<button data-live-place="${p.index}">${esc(p.id)} · ${esc(p.label)}</button>`).join('')}</div><details><summary>Die sechs Anfragen</summary><ul>${a.missionen.map(m=>'<li>'+esc(m)+'</li>').join('')}</ul></details><p>${esc(a.status)}</p>`;}
function selectedPath(p){
 const r=data.journey['t'+part].find(r=>r.end.station===p.id&&r.main);drawRoute(r||null);
 if(!r)return '';
 return `<section class="live-arrival"><p>Hierher kommst du von</p><strong>${esc(r.start.name)} → ${esc(r.end.name)}</strong><button data-live-route="${data.journey['t'+part].indexOf(r)}">Diesen Weg auf der Karte verfolgen ↗</button></section>`;
}
function laborScope(id=null){
 if(part!==2||!model)return;
 model.traverse(o=>{if(!o.isMesh)return;let owner=o;while(owner&&!owner.userData.region)owner=owner.parent;o.visible=!id||owner?.userData.region===id;});
 if(renderer)renderer.shadowMap.needsUpdate=true;
 invalidate();
}
function selectPlace(index){
 const p=point(index);if(!p)return;selected=index;figure=feature=null;mode='places';$('city-place-select').value=String(index);laborScope(p.id==='L00'?'L01':p.id==='L10'?'L05':p.id);const arrival=selectedPath(p);if(part===2)drawRoute(null);let html=index==='bridge'?(part===2?heartInfo():bridgeInfo()):options.onSelect(index);
 show(html);const heading=content.querySelector('h3');heading?.insertAdjacentHTML('afterend',`<button class="button primary" data-journey-open="${p.id}">Vollständigen Spielablauf & Figurenrollen öffnen ↗</button><p class="live-purpose">${esc(functions[p.id])}</p>`+peoplePanel(p)+arrival);
 const image=content.querySelector('.map-info-theme');if(image){image.src=part===1&&p.id==='L08'?'assets/city/aktuell_2026-10-12/gebirge.webp':window.KontextAtlas.regionImage(p.id,part);}
 if(p.position_unconfirmed)heading?.insertAdjacentHTML('afterend','<p class="limit"><strong>Lage noch offen.</strong> '+esc(p.viewpoint_note)+'</p>');
 if(part===1&&p.id==='L08')heading?.insertAdjacentHTML('afterend',`<div class="live-feature-register">${data.features.map(f=>`<button data-live-feature="${f.id}">${esc(f.title)} ↗</button>`).join('')}</div>`);
 if(part===1&&['L03','L04','L05','L10'].includes(p.id))heading?.insertAdjacentHTML('afterend',`<nav class="city-floor-links" aria-label="Stationen im Turm">${['L03','L04','L05','L10'].map(id=>`<button data-live-place="${station(id).index}" aria-pressed="${id===p.id}">${id} · ${esc(station(id).label)}</button>`).join('')}</nav>`);
 $('map-view-original').href=options.points.find(o=>o.index===index)?.link||options.link;renderUI();focus(V(p.world),p.id==='L08'?2.8:3.2,p.id);
}
function focus(target,z,id){
 // A lifted facade-side viewpoint keeps the tower's actual levels readable.
 const c=target.clone();if(part===2){c.y+=.75;animateTo(c,18,theta,.975);}else if(['L03','L04','L05','L10'].includes(id)){c.y=Math.max(4,c.y);animateTo(c,z,theta,Math.min(phi,.97));}else animateTo(c,z);
}
function selectFigure(id,stationId){
 const f=allFigures().find(f=>f.id===id);if(!f)return;figure=id;feature=null;const p=station(stationId)||point(selected)||station(data.residents[id]?.station)||station('L01');selected=null;show(options.onFigure(id,p.id));const native=data.residents[id];const world=part===1&&native?native.world:p.world;renderUI();animateTo(V(world),3.5);drawRoute(null);
}
function selectFeature(id){const f=data.features.find(f=>f.id===id);if(!f||part!==1)return;feature=id;selected=station('L08').index;figure=null;mode='places';show(`<p class="eyebrow">Stufengebirge / ${esc(functions.L08)}</p><h3>${esc(f.title)}</h3><p>${esc(f.meaning)}</p>${memberButtons(f.people,true)}<h4>Was du hier im Spiel untersuchst</h4><p>${esc(f.activity)}</p><button class="text-link" data-live-place="${station('L08').index}">Die ganze Welt L08 mit Aufgaben und Dialogen öffnen ↗</button><details><summary>Aus der Lore</summary><blockquote>${esc(f.quote)}</blockquote><p class="source-line">${esc(f.source)}</p></details>`);renderUI();drawRoute(null);animateTo(V(f.world),id==='luggage-scale'?5.4:4.5,3.75,.83);}
function selectGroup(id){const p=station(id);if(!p)return;selected=p.index;figure=feature=null;mode='places';show(`<p class="eyebrow">${esc(p.id)} / ${esc(p.label)}</p><h3>Wer hier zusammenarbeitet</h3><p>${esc(functions[p.id])}</p>${memberButtons(p.members)}<button class="text-link" data-live-place="${p.index}">Die Geschichte und die Aufgaben dieses Ortes öffnen ↗</button>`);renderUI();drawRoute(null);animateTo(V(p.world),3.2);}
function labelOf(id){const names={aussen:'Frage von außerhalb',antworttor:'Antworttor',hafentor:'Hafentor',turm:'Turm der Schichten',gluecksrad:'Tempis Glücksrad'};const f=allFigures().find(f=>f.id===id);return f?shortName(id):names[id]||id;}
function routeEndpoint(r,which){if(mode==='travel')return r[which];const id=r[which==='start'?'from':'to'],p=data.residents[id],s=station(p?.station);return {name:labelOf(id),station:s?.id,world:(which==='start'?r.world[0]:r.world.at(-1)),figure:id};}
function selectRoute(i){
 laborScope();
 const r=list()[i];if(!r)return;route=i;selected=figure=feature=null;const a=routeEndpoint(r,'start'),b=routeEndpoint(r,'end');show(`<p class="eyebrow">${mode==='travel'?'Deine Reise · Abschnitt '+(i+1):'Ein Antworttakt · Verbindung '+(i+1)}</p><h3>${esc(r.label)}</h3><div class="live-endpoints"><div><small>START</small><button data-live-end="start">${esc(a.name)} ↗</button></div><span aria-hidden="true">→</span><div><small>ZIEL</small><button data-live-end="end">${esc(b.name)} ↗</button></div></div>${b.station&&station(b.station)?peoplePanel(station(b.station)):memberButtons([r.from,r.to].filter(id=>allFigures().some(f=>f.id===id)),true)}<p>${esc(mode==='travel'?r.quote:r.source)}</p>${r.schematic?'<p class="limit">Diese Verbindung ist schematisch markiert. Sie folgt dem dokumentierten Nachtgang und behauptet keine zusätzliche Straße.</p>':''}${r.main===false?'<p class="limit">Dokumentierter Stadtweg. Die aktuelle Kapitelreise führt vor dem Finale durch die Nebelnacht.</p>':''}<p class="source-line">${esc(r.reference||r.source||data.source)}</p><div class="live-route-actions"><button data-live-route-prev ${i===0?'disabled':''}>← Voriger Abschnitt</button><button data-live-route-next ${i===list().length-1?'disabled':''}>Weiter zum nächsten Abschnitt →</button></div>`);drawRoute(r);renderUI();fitRoute(r);}
function fitRoute(r){
 const pts=r.world.map(V),box=new THREE.Box3().setFromPoints(pts),size=box.getSize(new THREE.Vector3()),c=box.getCenter(new THREE.Vector3());animateTo(c,Math.min(3.5,Math.max(1.2,65/Math.max(size.x,size.z,size.y*1.3,18))));
}
function drawRoute(r){
 if(!lineGroup)return;while(lineGroup.children.length){const o=lineGroup.children[0];lineGroup.remove(o);o.traverse(n=>{n.geometry?.dispose();for(const m of Array.isArray(n.material)?n.material:[n.material])m?.dispose();});}
 if(!r){invalidate();return;}
 const points=r.world.map(a=>V([a[0],a[1],a[2]+.2]));const geo=new THREE.BufferGeometry().setFromPoints(points),m=new THREE.LineBasicMaterial({color:'#efd18b',transparent:true,opacity:.96,depthTest:false});const line=new THREE.Line(geo,m);line.renderOrder=10;line.userData.connection=r.label;lineGroup.add(line);
 const first=points[0],last=points.at(-1),previous=points.at(-2)||first;const start=new THREE.Mesh(new THREE.SphereGeometry(.38,12,8),new THREE.MeshBasicMaterial({color:'#9ddccc',depthTest:false}));start.position.copy(first);start.renderOrder=11;lineGroup.add(start);const dir=last.clone().sub(previous).normalize();const arrow=new THREE.ArrowHelper(dir,last.clone().addScaledVector(dir,-2.2),2.2,'#f6cf75',1.25,.9);arrow.renderOrder=12;arrow.line.material.depthTest=arrow.cone.material.depthTest=false;lineGroup.add(arrow);invalidate();
}
function visiblePins(){
 let result=[];
 if(part===2&&mode==='places'&&selected!==null&&!people&&!figure)return result;
 if(mode==='places'){
  result=data.stations['t'+part].filter(p=>overviewIds.includes(p.id)||p.index===selected).map(p=>({kind:'place',id:String(p.index),world:part===1&&p.id==='FINALE'?[54.5,51.5,5.2]:p.world,title:part===2?p.id==='FINALE'?'Herz des Turms':p.label:regionNames[p.id]||p.label,number:p.id==='FINALE'?'✦':p.id==='L05'&&selected!==p.index?'03–05':p.id.slice(1),sub:functions[p.id],active:p.index===selected}));
  const p=point(selected);if(part===1&&p?.id==='L08')result=feature?[]:result.filter(p=>p.id!==String(selected)).concat(data.features.map(f=>({kind:'feature',id:f.id,world:f.world,title:f.title,active:false})));
  if((people||p)&&!feature){const groups=people?data.stations['t'+part].filter(p=>p.id!=='L00'&&p.id!=='L10'&&p.id!=='FINALE'):[p];for(const q of groups){const ids=q.members.filter(id=>!['quirin-query','kajo-cache','toki'].includes(id)),residents=ids.length?ids:q.members;result.push({kind:'group',id:q.id,world:q.world,title:`${residents.length} Bewohner · ${q.label}`,images:residents.slice(0,3).map(id=>allFigures().find(f=>f.id===id)?.bild).filter(Boolean),station:q.id,active:q.index===selected});}}
  if(figure){const f=allFigures().find(f=>f.id===figure),native=data.residents[figure],where=station(native?.station)||station('L01');result.push({kind:'figure',id:figure,world:part===1&&native?native.world:where.world,title:shortName(figure),image:f.bild,station:where.id,active:true});}
 }else{const r=list()[route];if(r){for(const which of ['start','end']){const p=routeEndpoint(r,which);result.push({kind:'end',id:which,world:p.world,title:p.name,number:which==='start'?'A':'B',active:true});}}}
 return result;
}
function renderPins(){pinLayer.innerHTML=visiblePins().sort((a,b)=>(b.active?1:0)-(a.active?1:0)).map(p=>`<button class="live-pin ${p.kind==='figure'?'live-portrait':''} ${p.kind==='group'?'live-group':''} ${p.active?'selected':''}" data-live-kind="${p.kind}" data-live-id="${esc(p.id)}" ${p.station?`data-live-station="${p.station}"`:''} aria-label="${esc(p.title)} ${p.kind==='figure'?'kennenlernen':'erkunden'}">${p.images?`<div class="live-face-stack">${p.images.map(src=>'<img src="'+esc(src)+'" alt="">').join('')}</div>`:p.image?`<img src="${esc(p.image)}" alt="">`:p.number?`<b>${esc(p.number)}</b>`:'<i></i>'}<span><strong>${esc(p.title)}</strong>${p.sub?'<small>'+esc(p.sub)+'</small>':''}</span></button>`).join('');invalidate();}
function projectPins(){
 const w=viewport.clientWidth,h=viewport.clientHeight,placed=[],items=visiblePins();const svg=[];leaders.setAttribute('viewBox',`0 0 ${w} ${h}`);Object.keys(projectionPositions).forEach(k=>delete projectionPositions[k]);
 for(const button of pinLayer.children){const p=items.find(p=>p.kind===button.dataset.liveKind&&p.id===button.dataset.liveId);if(!p)continue;projected.copy(V(p.world)).project(camera);const ax=(projected.x+1)*w/2,ay=(1-projected.y)*h/2;const id=p.kind+':'+p.id;projectionPositions[id]=[ax,ay];button.hidden=projected.z<-1||projected.z>1||ax<-80||ax>w+80||ay<-60||ay>h+60;if(button.hidden)continue;
  button.classList.remove('is-dot');let bw=button.offsetWidth||150,bh=button.offsetHeight||45;
  const free=(x,y)=>!placed.some(r=>x<r.x+r.w+6&&x+bw+6>r.x&&y<r.y+r.h+6&&y+bh+6>r.y);
  const find=()=>{const tries=[[ax+9,ay-bh/2],[ax+9,ay+20],[ax-bw-12,ay-bh/2],[ax-bw-12,ay+25],[ax+9,ay-bh-25],[ax+9,ay+65],[ax-bw-12,ay-bh-25]];for(let y=8;y<h-bh-54;y+=22)for(let x=7;x<w-bw-7;x+=28)tries.push([x,y]);let best=null,score=Infinity;for(const [xx,yy]of tries){const x=Math.max(7,Math.min(w-bw-7,xx)),y=Math.max(8,Math.min(h-bh-52,yy));if(!free(x,y))continue;const cost=Math.hypot(x-ax,y-ay);if(cost<score){score=cost;best=[x,y];}}return best;};
  let best=find();if(!best){button.classList.add('is-dot');bw=button.offsetWidth;bh=button.offsetHeight;best=find();}if(!best){button.hidden=true;continue;}
  const [bx,by]=best;placed.push({x:bx,y:by,w:bw,h:bh});button.style.left=bx+'px';button.style.top=by+'px';button.dataset.anchorX=ax.toFixed(2);button.dataset.anchorY=ay.toFixed(2);const ex=Math.max(bx,Math.min(bx+bw,ax)),ey=Math.max(by,Math.min(by+bh,ay));svg.push(`<path d="M${ax.toFixed(2)},${ay.toFixed(2)} L${ex.toFixed(2)},${ey.toFixed(2)}"/><circle cx="${ax.toFixed(2)}" cy="${ay.toFixed(2)}" r="3.8"/>`);
 }leaders.innerHTML=svg.join('');
}
function renderUI(){
 guide.querySelectorAll('[data-live-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.liveMode===mode));$('live-route-controls').hidden=mode==='places';guide.querySelector('.live-selects').hidden=mode!=='places';$('city-people').setAttribute('aria-pressed',String(people));
 if(mode!=='places'){const routes=list();$('map-route-select').innerHTML=routes.map((r,i)=>`<option value="${i}" ${i===route?'selected':''}>${i+1}. ${esc(r.label)}</option>`).join('');$('map-route-prev').disabled=route===0;$('map-route-next').disabled=route>=routes.length-1;}
 const order=p=>part===2&&p.id==='L00'?13:part===2&&p.id==='L10'?14:p.index==='bridge'?12:p.index;
 journey.innerHTML=data.stations['t'+part].slice().sort((a,b)=>order(a)-order(b)).map(p=>`<button data-live-place="${p.index}" aria-pressed="${p.index===selected}" title="${esc(p.label)}"><b>${p.id==='FINALE'?'✦':p.id.slice(1)}</b><span>${esc(p.label)}</span>${p.position_unconfirmed?'<small>Lage offen</small>':''}</button>`).join('');
 intro.hidden=selected!==null||figure!==null||feature!==null||mode!=='places';intro.innerHTML=part===1?`<div><strong>Deine Reise beginnt am Poller 7.</strong><span>Quirin, Kajo und Toki erwarten dich am Hafen. Die nummerierte Leiste führt dich durch die Geschichte.</span></div><button data-live-start>Mit den Begleitern starten →</button>`:'<div><strong>Unter der Stadt liegt die Laborreise.</strong><span>Die neun bestehenden Labore öffnen die Rechnungen. Zählstube und Nachtlabor bleiben zusätzlich erreichbar; ihre genaue Lage ist offen.</span></div><button data-live-start>Zur ersten Laborstation →</button>';
 renderPins();invalidate();
}
function overview(){selected=figure=feature=null;mode='places';people=false;laborScope();info.hidden=true;dialog.classList.remove('has-info');$('city-place-select').value='';drawRoute(null);renderUI();resetCamera();}
async function open(input){
 if(!input.figures){return window.openKontextImage(input);}
 imageMode=false;viewport.append(cameraTools);canvasHost.hidden=pinLayer.hidden=leaders.hidden=orientation.hidden=guide.hidden=journey.hidden=false;$('map-view-layer').hidden=true;
 const ticket=++request;trigger=document.activeElement;options=input;part=input.part;selected=figure=feature=null;mode='places';people=false;ready=false;status.hidden=false;status.textContent='Kontextia wird als 3D-Stadt geladen …';dialog.classList.add('live-map-dialog');info.hidden=true;dialog.classList.remove('has-info');$('map-view-title').textContent=part===1?'Kontextia entdecken':'Die Labore unter Kontextia';$('map-view-original').href=input.link;if(!dialog.open)dialog.showModal();
 try{init();data=await loadData();if(data.generation!==window.SAGA.meta.generation)throw new Error('Die 3D-Karte gehört nicht zum aktuellen Quellenstand.');
  $('city-place-select').innerHTML='<option value="">Ort auswählen …</option>'+data.stations['t'+part].map(p=>`<option value="${p.index}">${p.id==='FINALE'?'✦':p.id} · ${esc(p.label)}</option>`).join('');
  let next=modelCache.get(part);if(!next){const gltf=await new GLTFLoader().loadAsync(data.models['t'+part].file+'?v='+data.models['t'+part].sha256.slice(0,12));next=gltf.scene;next.traverse(o=>{if(o.isMesh){o.frustumCulled=true;o.castShadow=o.userData.region!=='sea'&&o.userData.region!=='cutaway';o.receiveShadow=true;const materials=Array.isArray(o.material)?o.material:[o.material];if(materials.some(m=>m.name==='Quiet deep teal water'||m.name.includes('cutaway'))){o.geometry.computeBoundingBox();if(o.geometry.boundingBox.getSize(new THREE.Vector3()).x>120)o.scale.set(10,1,10);}}});modelCache.set(part,next);}
  if(ticket!==request||!dialog.open)return;if(model)scene.remove(model);model=next;scene.add(model);laborScope();renderer.shadowMap.needsUpdate=true;ready=true;status.hidden=true;zoom=1;theta=2.438;phi=.975;center.set(45,part===2?-1:5,-46);renderUI();drawRoute(null);invalidate();
  if(input.selected!==undefined)selectPlace(input.selected);else if(input.selectedFigure)selectFigure(input.selectedFigure);viewport.focus();
 }catch(e){ready=false;status.hidden=false;status.innerHTML=`<strong>Die 3D-Ansicht konnte nicht geladen werden.</strong><span>${esc(e.message)}</span><button data-live-retry>Erneut laden</button><a href="${esc(input.link)}" target="_blank" rel="noopener">Vollständigen Bildatlas öffnen ↗</a>`;console.error('Live city:',e);}
}
window.openKontextMap=open;
window.mapViewState=()=>({ready,live3d:ready&&!imageMode,imageMode,part,selection:selected,figure,feature,routeMode:mode,route,zoom,theta,phi,center:center.toArray(),anchor:lastAnchor,anchorProjection:lastAnchor&&camera?new THREE.Vector3(...lastAnchor.world).project(camera).toArray():null,frames:renderCount,render:renderer?{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles}:null,models:[...modelCache.keys()],positions:{...projectionPositions},routeConnection:lineGroup?.children[0]?.userData.connection||null,modelSource:data?.models['t'+part]?.file,people,natural:imageMode?[$('map-view-image').naturalWidth,$('map-view-image').naturalHeight]:[2000,930],viewport:[viewport.clientWidth,viewport.clientHeight],fit:1,scale:zoom});
function close(){++request;cancelAnimationFrame(anim);cancelAnimationFrame(frame);frame=0;dialog.close();pointers.clear();trigger?.focus();if(document.fullscreenElement===dialog)document.exitFullscreen().catch(()=>{});}
function endpoint(which){const r=list()[route],p=routeEndpoint(r,which);if(p.figure&&allFigures().some(f=>f.id===p.figure))selectFigure(p.figure,p.station);else if(p.station&&station(p.station))selectPlace(station(p.station).index);else animateTo(V(p.world),3);}
dialog.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;const ds=b.dataset;
 if(performance.now()<suppressClickUntil)return;
 if(ds.livePlace!==undefined)selectPlace(key(ds.livePlace));if(ds.liveFigure)selectFigure(ds.liveFigure,point(selected)?.id);if(ds.liveFeature)selectFeature(ds.liveFeature);
 if(ds.mapWorld!==undefined)selectPlace(key(ds.mapWorld));if(ds.mapHouse!==undefined){close();window.KontextiaExplorer.openHouse(Number(ds.mapHouse));}
 if(ds.liveMode){mode=ds.liveMode;route=0;if(mode==='places')overview();else selectRoute(0);}
 if(ds.liveRoute!==undefined){mode='travel';selectRoute(+ds.liveRoute);}if(ds.liveEnd)endpoint(ds.liveEnd);
 if(ds.liveRoutePrev!==undefined||b.id==='map-route-prev')selectRoute(route-1);if(ds.liveRouteNext!==undefined||b.id==='map-route-next')selectRoute(route+1);
 if(ds.liveStart!==undefined)selectPlace(station(part===1?'L00':'L01').index);
 if(ds.liveTurn){cancelAnimationFrame(anim);theta+=Number(ds.liveTurn)*Math.PI/8;invalidate();}if(ds.liveTop!==undefined){phi=.12;invalidate();}
 if(ds.liveRetry!==undefined){modelCache.delete(part);open(options);}
 if(ds.liveKind){const id=ds.liveId;if(ds.liveKind==='place')selectPlace(key(id));else if(ds.liveKind==='figure')selectFigure(id,ds.liveStation);else if(ds.liveKind==='feature')selectFeature(id);else if(ds.liveKind==='group')selectGroup(id);else endpoint(id);}
});
$('city-place-select').onchange=e=>e.target.value===''?overview():selectPlace(key(e.target.value));$('map-route-select').onchange=e=>selectRoute(+e.target.value);$('city-people').onclick=()=>{people=!people;renderUI();};
$('map-info-close').onclick=overview;$('map-view-reset').onclick=()=>imageMode?resetImage():overview();$('map-view-close').onclick=close;
dialog.addEventListener('click',e=>{const b=e.target.closest('[data-journey-open]');if(b&&window.KontextReisen){close();window.KontextReisen.openStation(part,b.dataset.journeyOpen,true,'play');}});
$('map-view-plus').onclick=()=>{cancelAnimationFrame(anim);zoom=Math.min(zoomLimit(),zoom*1.4);if(imageMode)imageDraw();else invalidate();};$('map-view-minus').onclick=()=>{cancelAnimationFrame(anim);zoom=Math.max(imageMode?1:.75,zoom/1.4);if(imageMode)imageDraw();else invalidate();};
$('map-view-fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await dialog.requestFullscreen();}catch{dialog.classList.toggle('expanded');invalidate();}};document.addEventListener('fullscreenchange',()=>{ $('map-view-fullscreen').setAttribute('aria-label',document.fullscreenElement?'Vollbild verlassen':'Karte im Vollbild öffnen');invalidate();});
viewport.addEventListener('contextmenu',e=>e.preventDefault());
viewport.addEventListener('wheel',e=>{if(!ready)return;e.preventDefault();cancelAnimationFrame(anim);const a=imageMode?null:surfaceAt(e.clientX,e.clientY);zoom=Math.max(imageMode?1:.75,Math.min(zoomLimit(),zoom*Math.exp(-e.deltaY*.0016)));if(imageMode)imageDraw();else holdAnchor(a.point,a.uv);},{passive:false});
viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button:not(.live-pin)')||!ready)return;cancelAnimationFrame(anim);viewport.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);const a=imageMode?null:surfaceAt(e.clientX,e.clientY);drag={x:e.clientX,y:e.clientY,theta,phi,center:center.clone(),imageX,imageY,anchor:a,button:e.target.closest('.live-pin'),pan:e.button===2||e.shiftKey};wasDrag=false;if(pointers.size===2){const[a,b]=[...pointers.values()],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;pinch={distance:Math.hypot(a[0]-b[0],a[1]-b[1]),angle:Math.atan2(b[1]-a[1],b[0]-a[0]),theta,zoom,anchor:imageMode?null:surfaceAt(mx,my)};}});
viewport.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===2){const[a,b]=[...pointers.values()];if(pinch){zoom=Math.max(imageMode?1:.75,Math.min(zoomLimit(),pinch.zoom*Math.hypot(a[0]-b[0],a[1]-b[1])/pinch.distance));if(!imageMode){theta=pinch.theta+Math.atan2(b[1]-a[1],b[0]-a[0])-pinch.angle;holdAnchor(pinch.anchor.point,cursorNDC((a[0]+b[0])/2,(a[1]+b[1])/2));}}wasDrag=true;}else if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;wasDrag=wasDrag||Math.hypot(dx,dy)>4;if(imageMode){imageX=drag.imageX+dx;imageY=drag.imageY+dy;}else if(drag.pan)holdAnchor(drag.anchor.point,cursorNDC(e.clientX,e.clientY));else{theta=drag.theta-dx*.006;phi=Math.max(.12,Math.min(1.4,drag.phi-dy*.005));holdAnchor(drag.anchor.point,drag.anchor.uv);}}if(imageMode)imageDraw();else invalidate();});
viewport.addEventListener('pointerup',e=>{
 const click=!wasDrag&&pointers.size===1,pressed=drag?.button,remaining=pointers.size-1;
 if(wasDrag)suppressClickUntil=performance.now()+60;
 pointers.delete(e.pointerId);drag=pinch=null;
 if(remaining===1){const [id,xy]=[...pointers.entries()][0],a=imageMode?null:surfaceAt(...xy);drag={x:xy[0],y:xy[1],theta,phi,center:center.clone(),imageX,imageY,anchor:a,pan:false};}
 if(click&&pressed){pressed.click();return;}
 if(!click||e.button!==0||!ready||imageMode)return;
 ndc.copy(cursorNDC(e.clientX,e.clientY));raycaster.setFromCamera(ndc,camera);
 const hit=raycaster.intersectObject(model,true).find(h=>h.object.userData.feature||(/^L\d/.test(h.object.userData.region)&&h.object.userData.region!=='L08')||h.object.userData.region==='bridge');
 if(!hit)return;const f=hit.object.userData.feature;
 if(['decoration','terrace-landscape','quanta-village'].includes(f))return;
 if(f&&data.features.some(x=>x.id===f||f==='seda-fine'&&x.id==='seda-slope'))selectFeature(f==='seda-fine'?'seda-slope':f);
 else{const p=station(hit.object.userData.region==='bridge'?'FINALE':hit.object.userData.region);if(p)selectPlace(p.index);}
});
viewport.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);drag=pinch=null;});
viewport.addEventListener('keydown',e=>{if(!['+','=','-','0','Home','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();cancelAnimationFrame(anim);if(['+','='].includes(e.key))zoom=Math.min(zoomLimit(),zoom*1.3);else if(e.key==='-')zoom=Math.max(imageMode?1:.75,zoom/1.3);else if(['0','Home'].includes(e.key)){if(imageMode)resetImage();else overview();}else if(imageMode){imageX+=e.key==='ArrowLeft'?60:e.key==='ArrowRight'?-60:0;imageY+=e.key==='ArrowUp'?60:e.key==='ArrowDown'?-60:0;}else if(e.key==='ArrowLeft')theta-=.18;else if(e.key==='ArrowRight')theta+=.18;else phi=Math.max(.12,Math.min(1.4,phi+(e.key==='ArrowUp'?-.12:.12)));if(imageMode)imageDraw();else invalidate();});
dialog.addEventListener('cancel',()=>{cancelAnimationFrame(frame);frame=0;cancelAnimationFrame(anim);pointers.clear();});new ResizeObserver(()=>imageMode?imageDraw():invalidate()).observe(viewport);

// The full-size lesson sheet stays an image, while the city atlas itself is real 3D.
function imageDraw(){const img=$('map-view-image'),layer=$('map-view-layer');if(!imageMode||!img.naturalWidth)return;const w=img.naturalWidth*imageFit*zoom,h=img.naturalHeight*imageFit*zoom;imageX=w<=viewport.clientWidth?(viewport.clientWidth-w)/2:Math.min(0,Math.max(viewport.clientWidth-w,imageX));imageY=h<=viewport.clientHeight?(viewport.clientHeight-h)/2:Math.min(0,Math.max(viewport.clientHeight-h,imageY));layer.style.width=img.style.width=w+'px';layer.style.height=img.style.height=h+'px';layer.style.transform=`translate(${imageX}px,${imageY}px)`;$('map-view-scale').value=Math.round(zoom*100)+' %';$('map-view-minus').disabled=zoom<=1;$('map-view-plus').disabled=zoom>=8;}
function resetImage(){const img=$('map-view-image');zoom=1;imageX=imageY=0;imageFit=Math.min(viewport.clientWidth/img.naturalWidth,viewport.clientHeight/img.naturalHeight);imageDraw();}
window.openKontextImage=async input=>{++request;trigger=document.activeElement;imageMode=true;ready=false;cancelAnimationFrame(anim);cancelAnimationFrame(frame);frame=0;dialog.insertBefore(cameraTools,guide);canvasHost.hidden=pinLayer.hidden=leaders.hidden=orientation.hidden=guide.hidden=journey.hidden=intro.hidden=status.hidden=true;info.hidden=true;dialog.classList.remove('live-map-dialog','has-info');$('map-view-title').textContent=input.title;$('map-view-original').href=input.link;$('map-view-layer').hidden=false;$('map-view-points').innerHTML='';if(!dialog.open)dialog.showModal();const img=$('map-view-image');img.src=input.src;await img.decode();ready=true;resetImage();viewport.focus();};
