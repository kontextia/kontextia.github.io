/* [DE] Architectural atlas, projected from the canonical Blender scene. */
(() => {
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const overview=new Set(['L01','L02','L05','L06','L07','L08','L09','FINALE']);
const regionNames={L01:'Tokenhafen',L02:'Kartenwald',L05:'Turm der Schichten',L06:'Kästnerviertel',L07:'Geschichtsviertel',L08:'Stufengebirge',L09:'Quellen & Mauer',FINALE:'Lichterbrücke'};
const regionFiles={L00:'hafen',L01:'hafen',L02:'wald',L03:'turm',L04:'turm',L05:'turm',L06:'archiv',L07:'schmiede',L08:'gebirge',L09:'quellen',L10:'turm',FINALE:'bruecke'};
let dataPromise;
const getData=()=>dataPromise||(dataPromise=fetch('assets/city/atlas.json?v='+window.SAGA.meta.generation).then(r=>{if(!r.ok)throw Error('Die räumliche Stadtkarte konnte nicht geladen werden.');return r.json();}));
function path(points){return points.map((p,i)=>(i?'L':'M')+p.join(' ')).join('');}
async function prepare(input){
 const data=await getData(),points=(data.points['t'+input.part]||[]).map(p=>({...p,index:input.points?.find(q=>window.SAGA.welten[q.index]?.id===p.id)?.index,x:p.screen[0],y:p.screen[1],overview:overview.has(p.id),regionLabel:input.part===2?(p.id==='FINALE'?'Herz des Turms':p.id==='L05'?'Turmlabore':'Labor · '+(regionNames[p.id]||p.label)):(regionNames[p.id]||p.label)}));
 if(input.part===1){const p=points.find(p=>p.id==='FINALE');if(p){p.x=data.bridge.screen[0];p.y=data.bridge.screen[1];}}
 const characters=data.characters['t'+input.part].filter(c=>input.figures.some(f=>f.id===c.id)).map(c=>{const f=input.figures.find(f=>f.id===c.id);return {...c,x:c.screen[0],y:c.screen[1],label:f.name,image:f.bild};});
 if(input.part===2){for(const p of points){const residents=characters.filter(c=>c.station===p.id);residents.forEach((c,i)=>{c.x=p.x+(i-(residents.length-1)/2)*55;c.y=p.y+48;});}}
 return {url:input.part===1?'assets/city/aktuell_2026-10-12/stadt.webp':'assets/city/stadt-t'+input.part+'.webp',architectural:true,points,characters,
  travel:data.routes.filter(r=>r.part===input.part).map(r=>({...r,d:path(r.screen)})),flows:data.flows.map(r=>({...r,d:path(r.screen)})),data};
}
function markup(routes,selected){const r=routes[selected];if(!r)return '';const ends=[...r.d.matchAll(/(?:M|L)([-\d.]+)[ ,]([-\d.]+)/g)],a=ends[0],b=ends.at(-1);return `<svg class="map-route-svg" viewBox="0 0 2000 930" aria-hidden="true"><defs><marker id="atlas-arrow" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L12 7L0 14" fill="none" stroke="#fff0bd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><g class="map-route chosen" data-route-shape="${selected}"><path d="${esc(r.d)}" class="route-shadow"/><path d="${esc(r.d)}" class="route-line" marker-end="url(#atlas-arrow)"/><circle cx="${a[1]}" cy="${a[2]}" r="7" fill="#a6dacc" stroke="#10232c" stroke-width="2"/><circle cx="${b[1]}" cy="${b[2]}" r="7" fill="#efc879" stroke="#10232c" stroke-width="2"/></g></svg>`;}
function regionImage(id,part=1){return part===2?'assets/city/labore-r1/'+(id==='L00'?'L01':id==='L10'?'L05':id)+'.webp':'assets/city/aktuell_2026-10-12/'+(regionFiles[id]||'bruecke')+'.webp';}
window.KontextAtlas={prepare,markup,getData,regionImage,regionNames,overview};
let ticket=0;
async function inlineMap(part){
 const request=++ticket,S=window.SAGA,A=window.PremiumSite,img=document.querySelector('#atlas-image'),layer=document.querySelector('#map-hotspots');if(!S||!A||!img||!layer)return;
 // Both inline journeys use the exterior city as their common orientation.
 // The full 3D viewer still uses the distinct canonical underground positions.
 try{const map=await prepare({part:1,figures:A.figures,points:S.welten.map((w,index)=>({index}))});if(request!==ticket)return;
  img.width=2000;img.height=930;img.loading='eager';img.src=map.url;await img.decode();if(request!==ticket)return;
  img.alt='Kontextia von außen: gemeinsame Ortsübersicht für Die Lichterbrücke und Turm der Tiefe';img.dataset.atlasPart=part;img.dataset.generation=S.meta.generation;img.dataset.artGeneration=map.data.generation;layer.innerHTML=map.points.filter(p=>p.overview).map(p=>`<button class="city-region-pin" data-city-region="${p.index===undefined?'bridge':p.index}" style="left:${p.x/20}%;top:${p.y/9.3}%" aria-label="${esc(p.regionLabel)} erkunden"><i></i><span>${esc(p.regionLabel)}</span></button>`).join('');
  const mural=document.querySelector('.story-map-open img');if(mural)mural.src='assets/city/aktuell_2026-10-12/stadt.webp';
  let gallery=document.querySelector('#city-region-gallery');if(!gallery){gallery=document.createElement('div');gallery.id='city-region-gallery';gallery.className='city-region-gallery';gallery.setAttribute('aria-label','Die Viertel von Kontextia');document.querySelector('.atlas-bottom').before(gallery);}
  gallery.innerHTML=map.points.filter(p=>part===2?/^L0[1-9]$/.test(p.id)||p.id==='FINALE':p.overview).map(p=>`<button data-city-region="${p.index===undefined?'bridge':p.index}" data-city-part="${part}"><img src="${regionImage(p.id,part)}" alt="" loading="lazy"><span>${esc(p.regionLabel)}</span><small>${part===2?'Labor erkunden':p.id==='FINALE'?'Neun Bögen · sechs Laternen':'Viertel erkunden'} ↗</small></button>`).join('');
  window.dispatchEvent(new CustomEvent('kontextia-atlas-ready',{detail:{part,map}}));
 }catch(err){console.error('Stadtatlas:',err);}
}
window.addEventListener('kontextia-atlas',e=>inlineMap(e.detail.part));
document.addEventListener('click',e=>{const b=e.target.closest('[data-city-region]');if(b){const part=+(b.dataset.cityPart||document.querySelector('#atlas-image').dataset.atlasPart||1),i=b.dataset.cityRegion==='bridge'?'bridge':+b.dataset.cityRegion;if(b.closest('#atlas')&&window.KontextReisen){const id=i==='bridge'?'FINALE':window.SAGA.welten[i]?.id;window.KontextReisen.openStation(part,id==='L05'?'L03':id);}else window.PremiumSite.openMap(part,i);}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>inlineMap(1),{once:true});else inlineMap(1);
})();
