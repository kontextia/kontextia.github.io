/* [DE] Die geprüfte Geschichte als einzeln spielbare Szenen, am gemeinsamen Player. */
(() => {
 'use strict';
 const R=window.PODCAST_RESTORE;if(!R)return;
 const audio=document.querySelector('#story-audio'),select=document.querySelector('#audio-edition');
 if(!audio||!select)return;
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clock=v=>`${Math.floor(v/60)}:${String(Math.floor(v%60)).padStart(2,'0')}`;
 const box=document.createElement('details');box.id='podcast-stuecke';box.className='podcast-stuecke';
 box.innerHTML=`<summary>Die Geschichte in kleinen Stücken <span>16 Szenen · jede einzeln hörbar</span></summary>
 <p>Ein kleiner Besuch am Hafen. Ein Gespräch im Kartenwald. Ein Abend auf der Brücke. Höre ein Stück für sich oder lass dich von einem zum nächsten begleiten.</p>
 <label class="podcast-follow"><input id="podcast-follow-scenes" type="checkbox"> Die Stücke nacheinander hören</label>
 <div class="podcast-scene-list">${R.folgen.slice(1).map((e,i)=>`<article><button type="button" data-hearstueck="${i+1}" aria-label="${esc(e.beschreibung)} als einzelnes Stück hören"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(e.beschreibung)}</strong><time>${clock(e.dauer)}</time></button><a href="${esc(e.datei)}" download="Kontextia – ${esc(e.beschreibung)}.mp3" aria-label="${esc(e.beschreibung)} herunterladen">MP3 ↓</a></article>`).join('')}</div>`;
 document.querySelector('#podcast-listening-room').after(box);
 box.addEventListener('click',event=>{
  const b=event.target.closest('[data-hearstueck]');if(!b)return;
  select.value=b.dataset.hearstueck;select.dispatchEvent(new Event('change'));
  audio.play().catch(()=>{document.querySelector('#audio-status').textContent='Drücke die Starttaste, um dein Stück zu hören.';});
  document.querySelector('#podcast-listening-room').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 function highlight(){box.querySelectorAll('[data-hearstueck]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.hearstueck===select.value)));}
 select.addEventListener('change',highlight);highlight();
 audio.addEventListener('ended',()=>{
  const index=+select.value;
  if(document.querySelector('#podcast-follow-scenes').checked&&index>0&&index<R.folgen.length-1){
   select.value=String(index+1);select.dispatchEvent(new Event('change'));audio.play().catch(()=>{});
  }
 });
 const full=R.folgen[0],minutes=Math.round(full.dauer/60);
 document.querySelectorAll('[data-podcast-start="0"]').forEach(b=>{b.innerHTML=`▶ Die Geschichte hören <small>${minutes} Min.</small>`;});
 document.querySelectorAll('[data-podcast-start="1"]').forEach(b=>{b.innerHTML='Ein kleines Stück hören <small>Am Anfang · 2 Min.</small>';});
 const reader=document.querySelector('#podcast-reader summary');if(reader){const walk=document.createTreeWalker(reader,NodeFilter.SHOW_TEXT);for(let n=walk.nextNode();n;n=walk.nextNode())if(n.textContent.includes('Kurz- und Langfassung'))n.textContent=n.textContent.replace('Kurz- und Langfassung','Die ganze Geschichte und ihre einzelnen Stücke');}
 // Auch die Weltkarten bieten den passenden Abschnitt derselben neuen Aufnahme.
 const worldScenes={L00:3,L01:4,L02:5,L03:6,L04:7,L05:8,L06:9,L07:10,L08:11,L09:12,L10:13};
 function addWorldLink(){
  const panel=document.querySelector('#world-content');if(!panel||panel.querySelector('[data-world-story]'))return;
  const selected=document.querySelector('#world-selector [aria-checked="true"],#world-selector [aria-selected="true"],#world-selector [aria-pressed="true"]');
  const id=selected?.dataset.world!==undefined?'L'+String(selected.dataset.world).padStart(2,'0'):selected?.dataset.id;
  const scene=worldScenes[id];if(scene===undefined)return;
  const b=document.createElement('button');b.type='button';b.className='world-story-link';b.dataset.worldStory=String(scene+1);
  b.textContent='Diesen Ort in der Geschichte hören ▶';
  b.addEventListener('click',()=>{select.value=b.dataset.worldStory;select.dispatchEvent(new Event('change'));audio.play().catch(()=>{});document.querySelector('#podcast-listening-room').scrollIntoView({block:'start',behavior:'smooth'});});
  panel.append(b);
 }
 const worlds=document.querySelector('#world-content');if(worlds){new MutationObserver(addWorldLink).observe(worlds,{childList:true});addWorldLink();}
 // Der Szenenindex kommt aus der kanonischen Kapitelkennung, auch bei einer einzelnen Datei.
 const images=['stadt','stadt','hafen','hafen','hafen','wald','turm','turm','turm','archiv','schmiede','gebirge','quellen','turm','bruecke','bruecke-tuer'];
 function sceneImage(){const e=R.folgen[+select.value];if(e?.einzelstueck){const index=+e.kapitel[0].kapitel.slice(1),img=document.querySelector('#podcast-scene'),src='assets/city/aktuell_2026-10-12/'+images[index]+'.webp';if(img.getAttribute('src')!==src)img.src=src;}const span=document.querySelector('.podcast-chapter-list summary span');if(span&&e)span.textContent=e.einzelstueck?'Ein Stück für sich':'16 Stationen durch die Stadt';}
 function nextSpeaker(){const e=R.folgen[+select.value];if(!e)return;const t=audio.currentTime||0;const label=document.querySelector('#speaker-name').textContent;const next=e.zeilen.find(l=>l.start>t&&l.sprecher!==label);document.querySelector('#podcast-next-speaker').textContent=next?'Als Nächstes: '+next.sprecher:'';}
 ['loadedmetadata','seeked','timeupdate','play','pause'].forEach(name=>audio.addEventListener(name,()=>{sceneImage();nextSpeaker();}));select.addEventListener('change',()=>{sceneImage();nextSpeaker();});nextSpeaker();
})();
