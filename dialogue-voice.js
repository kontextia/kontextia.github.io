/* [DE] Every conversation uses its source-bound voice clips and original portraits. */
(() => {
 'use strict';
 const data=window.WEB_DIALOGUE_AUDIO,figures=window.PODCAST_WEB?.figuren;
 if(!data||!figures)return;
 const entries=new Map(data.lines.map(l=>[JSON.stringify([l.speaker,l.raw]),l]));
 const audio=document.createElement('audio');audio.id='dialogue-audio';audio.preload='none';audio.hidden=true;document.body.append(audio);
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clock=t=>`${Math.floor((t||0)/60)}:${String(Math.floor((t||0)%60)).padStart(2,'0')}`;
 const key=line=>JSON.stringify([line.dataset.dialogueSpeaker,line.dataset.dialogueText]);
 const source=line=>entries.get(key(line));
 const alias=s=>figures[s]?s:s==='Quirin'?'quirin-query':/Toki|Bank/.test(s)?'toki':/Helm/.test(s)?'hedra-kopfe':'kajo-cache';
 const image=id=>figures[id]?.bild||figures['kajo-cache'].bild;
 let queue=[],position=0,group=null,active=null;
 function update(){
  if(!group)return;
  const card=group.querySelector(':scope > .dialogue-listening'),item=queue[position];if(!card||!item)return;
  const seg=item.segment;
  card.querySelector('.dialogue-play').textContent=audio.paused?'▶ Gespräch weiterhören':'Ⅱ Gespräch pausieren';
  card.querySelector('.dialogue-progress').value=audio.duration?audio.currentTime/audio.duration*1000:0;
  card.querySelector('.dialogue-clock').textContent=clock(audio.currentTime)+' / '+clock(audio.duration||seg.duration);
  card.dataset.playing=String(!audio.paused);
 }
 function show(item){
  if(active){active.classList.remove('is-speaking');active.setAttribute('aria-current','false');active.querySelector('.dialogue-hear')?.setAttribute('aria-pressed','false');}
  active=item.line;active.classList.add('is-speaking');active.setAttribute('aria-current','true');active.querySelector('.dialogue-hear')?.setAttribute('aria-pressed','true');
  const card=group.querySelector(':scope > .dialogue-listening'),s=item.segment;
  card.querySelector('.dialogue-now-name').textContent=s.label;
  card.querySelector('.dialogue-now-text').textContent=s.text;
  card.querySelector('.dialogue-now-image').src=image(s.figur);card.querySelector('.dialogue-now-image').alt=s.label;
  const second=card.querySelector('.dialogue-second-image'),other=s.figuren?.find(id=>id!==s.figur);second.hidden=!other;if(other){second.src=image(other);second.alt=figures[other]?.name||s.label;}
  audio.src=s.audio;audio.load();
  audio.play().catch(()=>{card.querySelector('.dialogue-now-text').textContent='Starte die Wiedergabe mit „Gespräch weiterhören“.';update();});
 }
 function start(root,rows){
  if(group&&group!==root)group.querySelector('.dialogue-listening')?.removeAttribute('data-playing');
  group=root;queue=rows.flatMap(line=>(source(line)?.segments||[]).map(segment=>({line,segment})));position=0;
  if(!queue.length)return;
  document.querySelector('#story-audio')?.pause();document.querySelectorAll('audio,video').forEach(a=>{if(a!==audio)a.pause();});show(queue[0]);
 }
 function stop(){audio.pause();if(active){active.classList.remove('is-speaking');active.setAttribute('aria-current','false');active.querySelector('.dialogue-hear')?.setAttribute('aria-pressed','false');}active=null;queue=[];position=0;group=null;}
 function decorate(root){
  const rows=[...root.querySelectorAll(':scope > .dialogue-line[data-dialogue-speaker]')].filter(l=>!l.classList.contains('regie'));
  if(!rows.length||root.querySelector(':scope > .dialogue-listening'))return;
  rows.forEach(line=>{
   const entry=source(line),id=entry?.segments[0]?.figur||alias(line.dataset.dialogueSpeaker),speaker=line.querySelector(':scope > strong');
   const person=document.createElement('div');person.className='dialogue-person';
   const img=document.createElement('img');img.src=image(id);img.alt=figures[id]?.name||'';img.loading='lazy';img.width=80;img.height=88;person.append(img);if(speaker)person.append(speaker);line.prepend(person);
   if(entry){const b=document.createElement('button');b.className='dialogue-hear';b.textContent='▶ Satz hören';b.setAttribute('aria-label','Satz von '+entry.segments.map(s=>s.label).join(' und ')+' hören');b.setAttribute('aria-pressed','false');b.onclick=()=>{if(active===line&&!audio.paused){audio.pause();}else if(active===line&&audio.paused&&queue.length){audio.play();}else start(root,[line]);};person.append(b);}
  });
  const complete=rows.every(l=>source(l)?.segments.length),first=rows.find(l=>source(l));if(!first)return;
  const seg=source(first).segments[0],card=document.createElement('div');card.className='dialogue-listening';
  card.innerHTML=`<div class="dialogue-stage-images"><img class="dialogue-now-image" src="${esc(image(seg.figur))}" alt="${esc(seg.label)}" width="140" height="154"><img class="dialogue-second-image" alt="" hidden></div><div class="dialogue-listening-copy"><p class="eyebrow">Die Bewohner im Gespräch</p><strong class="dialogue-now-name">${esc(seg.label)}</strong><p class="dialogue-now-text">${complete?'Höre zu und schau mit. Die Bilder wechseln mit den Stimmen.':'Die Stimmen begleiten dich durch die Stadt.'}</p><div class="dialogue-controls"><button class="button primary dialogue-play">▶ ${complete?'Ganzes Gespräch hören':'Gespräch hören'}</button><button class="button quiet dialogue-stop" aria-label="Gespräch beenden">Beenden</button><span class="dialogue-clock">0:00</span></div><label class="dialogue-seek"><span class="sr-only">Position im gesprochenen Satz</span><input class="dialogue-progress" type="range" min="0" max="1000" value="0"></label></div>`;
  rows[0].before(card);
  card.querySelector('.dialogue-play').onclick=()=>{if(group===root&&queue.length){if(audio.paused)audio.play();else audio.pause();}else start(root,rows);};
  card.querySelector('.dialogue-stop').onclick=()=>{stop();card.querySelector('.dialogue-play').textContent='▶ Ganzes Gespräch hören';};
  card.querySelector('.dialogue-progress').oninput=e=>{if(group===root&&audio.duration)audio.currentTime=audio.duration*(+e.target.value)/1000;};
 }
 function addFigureAudio(portrait){
  if(portrait.dataset.voiceReady)return;portrait.dataset.voiceReady='true';
  const name=portrait.querySelector('img')?.alt,figure=window.PremiumSite?.figures.find(f=>f.name===name);
  if(!figure?.audio_vorstellung)return;
  const direct=window.PODCAST_WEB.direkte_stimmen.find(s=>s.figur===figure.id),url=direct?.datei||figure.audio_vorstellung;
  const card=document.createElement('section');card.className='map-voice-card';card.innerHTML=`<h4>Hör ${esc(name)} zu</h4><p>Meine Stimme und meine Aufgabe in Kontextia.</p><audio controls preload="none" src="${esc(url)}" aria-label="Vorstellung von ${esc(name)}"></audio>`;portrait.after(card);
 }
 function scan(node=document){
  const roots=new Set();node.querySelectorAll?.('.dialogue-line[data-dialogue-speaker]').forEach(l=>roots.add(l.parentElement));if(node.matches?.('.dialogue-line[data-dialogue-speaker]'))roots.add(node.parentElement);roots.forEach(decorate);
  node.querySelectorAll?.('.map-figure-portrait').forEach(addFigureAudio);if(node.matches?.('.map-figure-portrait'))addFigureAudio(node);
 }
 new MutationObserver(records=>{
  if(active&&!document.contains(active))stop();
  for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1&&!n.matches('.dialogue-person,.dialogue-listening,.map-voice-card'))scan(n);
 }).observe(document.body,{childList:true,subtree:true});
 ['timeupdate','loadedmetadata','play','pause','seeked'].forEach(e=>audio.addEventListener(e,update));
 audio.addEventListener('ended',()=>{position++;if(position<queue.length)show(queue[position]);else{const card=group?.querySelector(':scope > .dialogue-listening');stop();if(card){card.querySelector('.dialogue-play').textContent='▶ Gespräch noch einmal hören';card.querySelector('.dialogue-now-text').textContent='Danke fürs Zuhören. Die Stadt wartet auf dich.';card.dataset.playing='false';}}});
 audio.addEventListener('error',()=>{const card=group?.querySelector(':scope > .dialogue-listening');if(card)card.querySelector('.dialogue-now-text').textContent='Der Ton konnte gerade nicht geladen werden. Starte die Wiedergabe bitte erneut.';});
 document.addEventListener('play',e=>{if(e.target===audio)return;if(e.target instanceof HTMLMediaElement){audio.pause();if(e.target.id!=='story-audio')document.querySelector('#story-audio')?.pause();}},{capture:true});
 for(const id of ['map-dialog','detail-dialog'])document.getElementById(id)?.addEventListener('close',()=>{if(group&&document.getElementById(id).contains(group))stop();});
 scan();
})();
