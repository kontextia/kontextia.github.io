/* [DE] Source-bound atlas presentation. Original exported SVGs remain untouched. */
(() => {
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cache=new Map(),NS='http://www.w3.org/2000/svg';
function rounded(d){const a=[...d.matchAll(/(?:M|L)([-\d.]+)[ ,]([-\d.]+)/g)].map(m=>[+m[1],+m[2]]);if(a.length<3)return d;let out=`M${a[0].join(' ')}`;for(let i=1;i<a.length-1;i++){const p=a[i-1],q=a[i],r=a[i+1],u=Math.hypot(q[0]-p[0],q[1]-p[1]),v=Math.hypot(r[0]-q[0],r[1]-q[1]),k=Math.min(9,u/3,v/3);if(!u||!v)continue;const b=[q[0]+(p[0]-q[0])*k/u,q[1]+(p[1]-q[1])*k/u],c=[q[0]+(r[0]-q[0])*k/v,q[1]+(r[1]-q[1])*k/v];out+=`L${b.join(' ')}Q${q.join(' ')} ${c.join(' ')}`;}return out+`L${a.at(-1).join(' ')}`;}
async function prepare(input){
 if(!cache.has(input.src))cache.set(input.src,fetch(input.src).then(r=>{if(!r.ok)throw Error('Karte konnte nicht geladen werden');return r.text();}));
 const raw=await cache.get(input.src),doc=new DOMParser().parseFromString(raw,'image/svg+xml'),svg=doc.documentElement;
 const characters=[...svg.querySelectorAll('.medaillon')].map(g=>{const c=g.querySelector('circle'),clip=g.querySelector('image')?.getAttribute('clip-path'),m=clip?.match(/#clip-(.*)-(L\d+|FINALE)/);return m&&c?{id:m[1],station:m[2],x:+c.getAttribute('cx'),y:+c.getAttribute('cy'),label:g.querySelector('title')?.textContent||m[1],r:+c.getAttribute('r')}:null;}).filter(p=>p&&input.figures.some(f=>f.id===p.id));
 // Nora and Ressi are also explicitly named on the authored tower signs.
 for(const [id,needle] of [['nora-norm','Nora poliert'],['ressi-residual','Ressi legt']]){
  const t=[...svg.querySelectorAll('.turmschild')].find(t=>t.textContent.includes(needle)),f=input.figures.find(f=>f.id===id);
  if(t&&f)characters.push({id,station:'L04',x:+t.getAttribute('x')-Math.min(145,t.textContent.length*4.5),y:+t.getAttribute('y')-6,label:f.name,r:20});
 }
 const travel=[...svg.querySelectorAll(input.part===2?'.tiefenweg':'.etappenweg')].map(p=>({d:rounded(p.getAttribute('d')),label:p.dataset.routeLabel,from:p.dataset.routeFrom,to:p.dataset.routeTo,source:p.querySelector('title')?.textContent||''}));
 if(travel.some(r=>!r.label||!r.from||!r.to))throw Error('Der Atlas braucht die aktuelle Veröffentlichung mit eindeutigen Wegnamen.');
 const dataLabels=['Text erreicht den Hafen','Text wird in Stücke geteilt','Token erhält eine ID','Darstellung wird weitergegeben','Das nächste Stück wird gewählt','Neue Runde beginnt','K wird für den Cache abgelegt','V wird für den Cache abgelegt','Belege gelangen zum Kontext','Werkzeugauftrag verlässt die Stadt','Werkzeugantwort kommt zurück'];
 const seen=new Set(),flows=[...svg.querySelectorAll('.datenweg')].filter(p=>{const d=p.getAttribute('d');if(seen.has(d))return false;seen.add(d);return true;}).map((p,i)=>({d:rounded(p.getAttribute('d')),label:dataLabels[i]||`Datenverbindung ${i+1}`,source:'Datenweg aus dem veröffentlichten Stadtatlas; ein Antworttakt.'}));
 // The dark backing of the loop shares its geometry with the foreground.
 svg.querySelectorAll('.etappenweg,.etappenweg-grund,.tiefenweg,.tiefenweg-grund,.datenweg,.meilenstein').forEach(p=>p.setAttribute('style','display:none'));
 svg.querySelectorAll('text').forEach(p=>{if(p.textContent.startsWith('L10 ·'))p.setAttribute('style','display:none');});
 const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}));
 return {url,characters,travel,flows};
}
function markup(routes,selected){return `<svg class="map-route-svg" viewBox="0 0 2000 930" aria-hidden="true"><defs><marker id="atlas-arrow" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L12 7L0 14" fill="none" stroke="#fff0bd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>${routes.map((r,i)=>{const a=[...r.d.matchAll(/(?:M|L)([-\d.]+)[ ,]([-\d.]+)/g)],first=a[0],last=a.at(-1);return `<g class="map-route ${i===selected?'chosen':''}" data-route-shape="${i}"><path d="${esc(r.d)}" class="route-shadow"/><path d="${esc(r.d)}" class="route-line" marker-end="url(#atlas-arrow)"/>${i===selected?`<circle cx="${first[1]}" cy="${first[2]}" r="6" fill="#a6dacc" stroke="#10232c" stroke-width="2"/><circle cx="${last[1]}" cy="${last[2]}" r="6" fill="#efc879" stroke="#10232c" stroke-width="2"/>`:''}</g>`;}).join('')}</svg>`;}
window.KontextAtlas={prepare,markup};
let inlineRequest=0,inlineURL=null;
async function inlineMap(part){
 const ticket=++inlineRequest,S=window.SAGA,A=window.PremiumSite,img=document.querySelector('#atlas-image'),points=document.querySelector('#map-hotspots');
 if(!S||!A||!img||!points)return;
 try{
  const map=await prepare({src:`assets/karte-teil${part}.svg?v=${S.meta.generation}`,part,figures:A.figures});
  if(ticket!==inlineRequest){URL.revokeObjectURL(map.url);return;}
  if(inlineURL)URL.revokeObjectURL(inlineURL);inlineURL=map.url;
  img.width=2000;img.height=930;img.loading='eager';img.src=map.url;await img.decode();
  if(ticket!==inlineRequest)return;
  img.dataset.atlasPart=String(part);img.dataset.generation=S.meta.generation;
  points.querySelectorAll('[data-map-open-figure]').forEach(b=>b.remove());
  points.insertAdjacentHTML('beforeend',map.characters.map(p=>`<button class="map-inline-character" data-map-open-figure="${p.id}" data-map-part-open="${part}" style="left:${p.x/20}%;top:${p.y/9.3}%" aria-label="${esc(p.label)} auf der Karte kennenlernen"><span>${esc(p.label)} ↗</span></button>`).join(''));
 }catch{/* The original exported image remains usable if the interactive preparation fails. */}
}
window.addEventListener('kontextia-atlas',e=>inlineMap(e.detail.part));
document.addEventListener('click',e=>{const b=e.target.closest('[data-map-open-figure]');if(b)window.PremiumSite.openMap(+b.dataset.mapPartOpen,undefined,b.dataset.mapOpenFigure);});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>inlineMap(1),{once:true});else inlineMap(1);
})();
