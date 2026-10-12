/* [DE] Visible city captions. Geographic anchors come from the existing atlas. */
(() => {
 'use strict';
 const image=document.querySelector('#atlas-image'),layer=document.querySelector('#map-hotspots');
 if(!image||!layer)return;
 const labels={
  L01:['01','Tokenhafen','Text zerlegen',.78,.64],
  L02:['02','Kartenwald','Bedeutungen darstellen',.74,.39],
  L05:['03–05','Turm der Schichten','Das nächste Stück wählen',.54,.11],
  L06:['06','Kästnerviertel','Zwischenrechnungen bewahren',.23,.43],
  L07:['07','Geschichtsviertel','Gewichte trainieren',.02,.29],
  L08:['08','Stufengebirge','Zahlengepäck packen',.22,.07],
  L09:['09','Quellen & Mauer','Quellen und Grenzen prüfen',.35,.79],
  FINALE:['✦','Lichterbrücke','Die Stadt arbeitet zusammen',.53,.63]
 };
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let scheduled=false;
 function layout(){
  scheduled=false;
  const box=layer.getBoundingClientRect(),part=+image.dataset.atlasPart||1;
  if(!box.width)return;
  const pins=[...layer.querySelectorAll('[data-city-region]')],cards=[];
  pins.forEach(pin=>{
   const id=pin.dataset.cityRegion==='bridge'?'FINALE':window.SAGA?.welten[+pin.dataset.cityRegion]?.id;
   const l=labels[id];if(!l)return;
   const title=part===2?(id==='FINALE'?'Herz des Turms':id==='L05'?'Turmlabore':'Labor · '+l[1]):l[1];
   if(pin.dataset.captionPart!==String(part)){
    pin.dataset.captionPart=String(part);pin.dataset.placeId=id;
    pin.querySelector('span').innerHTML=`<b class="city-inline-number">${l[0]}</b><strong>${esc(title)}</strong><small>${esc(l[2])}</small>`;
    const dot=pin.querySelector('i');dot.textContent=l[0]==='03–05'?'03':l[0];
    pin.setAttribute('aria-label',title+' erkunden');
   }
   const caption=pin.querySelector('span');
   if(box.width<570){caption.style.left=caption.style.top='';return;}
   const anchorX=parseFloat(pin.style.left)/100*box.width,anchorY=parseFloat(pin.style.top)/100*box.height;
   const w=caption.offsetWidth,h=caption.offsetHeight;
   let x=Math.max(8,Math.min(box.width-w-8,l[3]*box.width));
   let y=Math.max(8,Math.min(box.height-h-8,l[4]*box.height));
   // Shift presentation captions only. The actual map point never moves.
   for(let attempts=0;attempts<12;attempts++){
    const hit=cards.find(c=>x<c.x+c.w+6&&x+w+6>c.x&&y<c.y+c.h+6&&y+h+6>c.y);
    if(!hit)break;
    const below=hit.y+hit.h+8;
    y=below+h<box.height-8?below:Math.max(8,hit.y-h-8);
   }
   caption.style.left=(x-anchorX+22)+'px';caption.style.top=(y-anchorY+22)+'px';
   cards.push({x,y,w,h});
  });
  let lines=layer.querySelector('.city-inline-leaders');
  if(!lines){lines=document.createElementNS('http://www.w3.org/2000/svg','svg');lines.classList.add('city-inline-leaders');lines.setAttribute('aria-hidden','true');layer.prepend(lines);}
  lines.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
  lines.innerHTML=box.width<570?'':pins.map(pin=>{
   const b=pin.querySelector('span').getBoundingClientRect(),x=parseFloat(pin.style.left)/100*box.width,y=parseFloat(pin.style.top)/100*box.height;
   const tx=Math.max(b.left-box.left,Math.min(b.right-box.left,x)),ty=Math.max(b.top-box.top,Math.min(b.bottom-box.top,y));
   return `<path d="M${x},${y} L${tx},${ty}"/>`;
  }).join('');
 }
 function request(){if(!scheduled){scheduled=true;requestAnimationFrame(layout);}}
 new MutationObserver(request).observe(layer,{childList:true});
 new ResizeObserver(request).observe(image);
 image.addEventListener('load',request);request();
})();
