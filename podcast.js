/* [DE] Source-bound podcast presentation. The existing audio element owns the clock. */
(() => {
 'use strict';
 const D=window.PODCAST_WEB,K=window.KONTEXTIA,$=s=>document.querySelector(s);
 if(!D||!K)return;
 const audio=$('#story-audio'),select=$('#audio-edition'),editions=K.hoerspiel.folgen;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clock=v=>`${Math.floor((v||0)/60)}:${String(Math.floor((v||0)%60)).padStart(2,'0')}`;
 const figure=id=>D.figuren[id];
 const portrait=f=>f?`<img src="${esc(f.bild)}" alt="${esc(f.name)}" loading="lazy" width="170" height="180">`:'<span class="line-narrator" aria-hidden="true">♫</span>';
 const current=()=>editions[+select.value||0];
 let chapterKey='',speakerKey='',reading=0,readingEdition=0,directFigure=false,portraitToken=0;
 const narrator=$('#speaker-narrator');
 const stage=$('#now-speaking'),previous=$('#speaker-previous');
 const scenes=['stadt','stadt','hafen','hafen','hafen','wald','turm','turm','turm','archiv','schmiede','gebirge','quellen','turm','bruecke','bruecke-tuer'];
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 function startJourney(index){
  const i=Number.isInteger(index)?index:(current().art==='folge'?+select.value:0);
  if(+select.value!==i){select.value=String(i);select.dispatchEvent(new Event('change'));}
  directFigure=false;playAt(audio.ended?0:audio.currentTime||0);
  $('#podcast-listening-room').scrollIntoView({block:'start',behavior:reducedMotion.matches?'instant':'smooth'});
 }
 function playAt(t){audio.currentTime=t;audio.play().catch(()=>{$('#audio-status').textContent='Starte die Wiedergabe mit der runden Starttaste.';});}
 function personCard(id,start,reader=false){
  const f=figure(id);if(!f)return '';
  return `<button class="podcast-person" ${reader?'data-figure="'+esc(id)+'"':'data-podcast-seek="'+start+'"'} aria-current="false" aria-label="${esc(f.name)} ${reader?'kennenlernen':'in diesem Kapitel hören'}">${portrait(f)}<strong>${esc(f.name)}</strong><small>${esc(f.rolle)}</small><span class="listen-link">${reader?'Figurenalbum ansehen ↗':'Hier spricht '+esc(f.name)+' ▶'}</span></button>`;
 }
 function wireSeek(root){root.querySelectorAll('[data-podcast-seek]').forEach(b=>b.addEventListener('click',()=>playAt(+b.dataset.podcastSeek)));}
 function renderChapter(e,ci){
  const chapter=e.kapitel[ci];if(!chapter)return;
  const rows=e.zeilen.filter(l=>l.kapitel===chapter.kapitel);
  const cast=[...new Set(rows.map(l=>l.figur).filter(Boolean))];
  $('#podcast-scene').src='assets/city/aktuell_2026-10-12/'+(scenes[ci]||'stadt')+'.webp';
  $('#podcast-scene-title').textContent=chapter.titel;
  $('#podcast-chapter-title').textContent=chapter.titel;
  $('#podcast-chapter-caption').textContent=`Kapitel ${ci+1} von ${e.kapitel.length} · ${clock(chapter.start)}–${clock(chapter.ende)}`;
  $('#podcast-cast').innerHTML=cast.map(id=>personCard(id,rows.find(l=>l.figur===id).start)).join('');
  $('#podcast-cast-note').textContent=cast.length?'Diese Figuren reden in diesem Kapitel. Klicke auf ein Bild, um ihre Stelle zu hören.':'Die Erzählstimme führt dich in die Geschichte. Die Figuren kommen in den nächsten Kapiteln zu Wort.';
  $('#podcast-transcript-lines').innerHTML=rows.map(l=>`<button class="podcast-line" data-podcast-seek="${l.start}" aria-current="false" aria-label="${esc(l.sprecher)} ab ${clock(l.start)} hören">${portrait(figure(l.figur))}<div><time>${clock(l.start)}</time><strong>${esc(l.sprecher)}</strong><p>${esc(l.text)}</p></div></button>`).join('');
  wireSeek($('#podcast-cast'));wireSeek($('#podcast-transcript-lines'));
 }
 function showSpeaker(line,label,role,text,mode='speaking'){
  const f=figure(line?.figur),key=(line?.figur||'narrator')+'|'+label;
  const changed=key!==speakerKey; speakerKey=key;
  const img=$('#speaker-portrait'),picture=f?.bild||'assets/city/aktuell_2026-10-12/stadt.webp';img.hidden=false;narrator.hidden=true;
  {
   if(img.getAttribute('src')!==picture){
    const token=++portraitToken;
    if(img.complete&&img.naturalWidth){previous.src=img.src;previous.hidden=false;}
    img.src=picture;
    img.decode().catch(()=>{}).then(()=>{
     if(token!==portraitToken)return;
     if(reducedMotion.matches){previous.hidden=true;return;}
     img.getAnimations().forEach(a=>a.cancel());
     img.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'}).finished.catch(()=>{}).then(()=>{if(token===portraitToken)previous.hidden=true;});
    });
   }
   img.alt=f?.name||'Kontextia – die Erzählstimme';
  }
  stage.dataset.figure=line?.figur||'';
  stage.dataset.playing=String(!audio.paused&&mode==='speaking');
  $('#podcast-speaking-state').textContent=mode==='ready'?'Deine Reise beginnt mit':mode==='finished'?'Bis bald in Kontextia':mode==='pause'?'Ein kleiner Moment zum Durchatmen':audio.paused?'An dieser Stelle':'Jetzt spricht';
  $('#speaker-name').textContent=label;$('#speaker-role').textContent=role;$('#spoken-text').textContent=text;
  if(changed)$('#podcast-next-speaker').textContent='';
  $('#podcast-cast').querySelectorAll('[data-podcast-seek]').forEach(b=>{
   const active=mode==='speaking'&&!!line&&eRowAt(+b.dataset.podcastSeek)?.figur===line.figur;
   b.setAttribute('aria-current',String(active));
  });
 }
 function eRowAt(start){return current().zeilen?.find(l=>l.start===start);}
 function refresh(){
  const e=current(),t=audio.currentTime||0;
  $('#podcast-cast').dataset.playing=String(!audio.paused);
  document.querySelectorAll('[data-podcast-toggle]').forEach(b=>{b.textContent=audio.paused?'▶ Podcast weiterhören':'Ⅱ Podcast pausieren';b.setAttribute('aria-label',audio.paused?'Podcast weiterhören':'Podcast pausieren');});
  if(e.art==='liste'){
   const entry=e.eintraege.find(l=>audio.getAttribute('src')===l.datei)||e.eintraege[0];
   const f=figure(entry.figur),key=e.id+'|'+entry.figur;
   if(key!==chapterKey){chapterKey=key;$('#podcast-scene').src='assets/city/aktuell_2026-10-12/stadt.webp';$('#podcast-scene-title').textContent='Die Bewohner von Kontextia';$('#podcast-chapter-title').textContent='Die Figuren stellen sich vor';$('#podcast-chapter-caption').textContent='34 Bewohner · ihre eigenen Stimmen';$('#podcast-cast').innerHTML='';$('#podcast-cast-note').textContent='Wähle einen Namen in der Vorstellungsrunde, um diese Figur kennenzulernen.';$('#podcast-transcript-lines').innerHTML=`<div class="podcast-line">${portrait(f)}<div><strong>${esc(entry.titel)}</strong><p>${esc(entry.text)}</p></div></div>`;}
   showSpeaker(entry,entry.titel,f?.rolle||'',entry.text);return;
  }
  let ci=e.kapitel.findIndex(c=>t>=c.start&&t<c.ende);if(ci<0)ci=t<e.kapitel[0].start?0:e.kapitel.length-1;
  const key=e.id+'|'+ci;if(key!==chapterKey){chapterKey=key;renderChapter(e,ci);}
  const line=e.zeilen.find(l=>t>=l.start&&t<l.start+l.dauer);
  if(line){const f=figure(line.figur);showSpeaker(line,line.sprecher,f?.rolle||'Erzählstimme',line.text);}
  else{
   const before=e.zeilen.filter(l=>l.start+l.dauer<=t).at(-1),next=e.zeilen.find(l=>l.start>t),held=before||next;
   const mode=audio.ended?'finished':!before?'ready':'pause';
   showSpeaker(held,held?.sprecher||'Willkommen in Kontextia',mode==='ready'?'Mach es dir gemütlich. Die Bilder begleiten die Stimmen.':mode==='finished'?'Die Stadt freut sich auf deinen nächsten Besuch.':'Glocken und Pausen gehören zur Geschichte',mode==='ready'?e.beschreibung:mode==='finished'?'Danke, dass du mit uns durch die Stadt gereist bist.':before?.text||'Gleich geht die Geschichte weiter.',mode);
  }
  const next=e.zeilen.find(l=>l.start>t&&l.figur!==(line?.figur||stage.dataset.figure));
  $('#podcast-next-speaker').textContent=next?'Als Nächstes: '+next.sprecher:'';
  $('#podcast-transcript-lines').querySelectorAll('[data-podcast-seek]').forEach(b=>b.setAttribute('aria-current',String(!!line&&+b.dataset.podcastSeek===line.start)));
 }
 function editionChanged(){
  chapterKey='';speakerKey='';directFigure=false;
  const e=current(),links=e.downloads||(e.art==='folge'?[
   {name:'MP3 herunterladen',datei:e.datei},
   {name:'M4A mit Kapitelmarken',datei:e.datei.replace('.mp3','.m4a')},
   {name:'Transkript',datei:e.datei.replace('.mp3','_transkript.md')},
   {name:'Untertitel (SRT)',datei:e.datei.replace('.mp3','.srt')}]:[]);
  $('#podcast-downloads').innerHTML=links.map(l=>`<a href="${esc(l.datei)}" download="${esc('Willkommen in Kontextia – '+e.name+'.'+l.datei.split('.').pop())}">${esc(l.name)} ↓</a>`).join('');
  // The native player replaces its chapter buttons on each edition change.
  $('#audio-chapters').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{speakerKey='';directFigure=false;refresh();}));
  refresh();
 }
 $('#podcast-update-title').textContent='Eine Hörreise mit den Bewohnern von Kontextia.';
 $('#podcast-update-copy').textContent='Mach es dir gemütlich. Höre die ganze Geschichte und schau zu: Wer spricht, erscheint groß im Bild.';
 const feature=$('.podcast-feature [data-podcast-start]');if(feature)feature.innerHTML='▶ Die ganze Geschichte <small>'+Math.round(editions[0].dauer/60)+' Min.</small>';
 document.querySelectorAll('[data-podcast-start]').forEach(b=>b.addEventListener('click',()=>startJourney(b.dataset.podcastStart===''?undefined:+b.dataset.podcastStart)));
 document.querySelectorAll('[data-podcast-toggle]').forEach(b=>b.addEventListener('click',()=>audio.paused?audio.play().catch(()=>{$('#audio-status').textContent='Bitte starte die Wiedergabe an der Podcastbühne.';}):audio.pause()));
 $('#podcast-guides').innerHTML=['toki','kajo-cache','quirin-query'].map(id=>{
  const f=figure(id);return `<button class="podcast-guide" data-guide="${id}" aria-label="${esc(f.name)} direkt hören">${portrait(f)}<div><strong>${esc(f.name)}</strong><small>${esc(f.rolle)}</small><span class="listen-link">Meine Stimme hören ▶</span></div></button>`;
 }).join('');
 $('#podcast-guides').querySelectorAll('[data-guide]').forEach(b=>b.addEventListener('click',()=>{
  const editionIndex=editions.findIndex(e=>e.art==='liste');
  if(editionIndex<0)return;
  select.value=String(editionIndex);select.dispatchEvent(new Event('change'));
  const entryIndex=current().eintraege.findIndex(e=>e.figur===b.dataset.guide);
  if(entryIndex>=0){$('#audio-chapters').querySelector(`[data-chapter="${entryIndex}"]`).click();directFigure=true;}
 }));
 audio.addEventListener('ended',event=>{if(directFigure){event.stopImmediatePropagation();audio.pause();refresh();}},{capture:true});
 select.addEventListener('change',editionChanged);
 ['timeupdate','seeked','loadedmetadata','play','pause','ended'].forEach(event=>audio.addEventListener(event,refresh));
 // Hero/footer buttons may switch the existing edition without a change event.
 document.querySelectorAll('[data-listen-main]').forEach(b=>b.addEventListener('click',editionChanged));
 function readChapter(){
  const edition=D.lesefassungen[readingEdition],chapter=edition.kapitel[reading];
  $('#podcast-read-chapter').innerHTML=edition.kapitel.map((c,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')} · ${esc(c.titel)}</option>`).join('');$('#podcast-read-chapter').value=String(reading);
  const cast=[...new Set(chapter.zeilen.map(l=>l.figur).filter(Boolean))];
  $('#podcast-reading').innerHTML=`<p class="eyebrow">${esc(edition.name)}</p><h3>${esc(chapter.titel)}</h3><div class="podcast-cast">${cast.map(id=>personCard(id,0,true)).join('')}</div>${chapter.zeilen.map(l=>l.regie?`<p class="podcast-regie">${esc(l.regie)}</p>`:`<div class="podcast-line">${portrait(figure(l.figur))}<div><strong>${esc(l.sprecher)}</strong><p>${esc(l.text)}</p></div></div>`).join('')}`;
  $('#podcast-read-position').textContent=`Kapitel ${reading+1} von ${edition.kapitel.length}`;
  $('#podcast-read-prev').disabled=reading===0;$('#podcast-read-next').disabled=reading===edition.kapitel.length-1;
  $('#podcast-read-source').href=edition.quelle;
  $('#podcast-read-source').download='Willkommen in Kontextia – '+(edition.id==='kurz'?'Die kleine Hörreise':'Die ganze Geschichte')+'.txt';
 }
 $('#podcast-read-edition').innerHTML=D.lesefassungen.map((e,i)=>`<option value="${i}">${esc(e.name)}</option>`).join('');
 $('#podcast-read-edition').addEventListener('change',()=>{readingEdition=+$('#podcast-read-edition').value;readChapter();});
 $('#podcast-read-chapter').addEventListener('change',()=>{reading=+$('#podcast-read-chapter').value;readChapter();});
 $('#podcast-read-prev').addEventListener('click',()=>{reading--;readChapter();$('#podcast-read-edition').scrollIntoView({block:'start',behavior:'smooth'});});
 $('#podcast-read-next').addEventListener('click',()=>{reading++;readChapter();$('#podcast-read-edition').scrollIntoView({block:'start',behavior:'smooth'});});
 document.querySelectorAll('[data-podcast-read]').forEach(b=>b.addEventListener('click',event=>{event.preventDefault();$('#podcast-reader').open=true;$('#podcast-reader').scrollIntoView({block:'start',behavior:reducedMotion.matches?'instant':'smooth'});}));
 // Keep a small, real player available while exploring the rest of the city.
 let roomVisible=true;
 const dock=$('#podcast-dock');
 function updateDock(){dock.hidden=roomVisible||(!audio.currentTime&&audio.paused)||audio.ended;$('#podcast-dock-speaker').textContent=$('#speaker-name').textContent;$('#podcast-dock-time').textContent=clock(audio.currentTime);const image=$('#speaker-portrait');$('#podcast-dock-portrait').src=image.src;$('#podcast-dock-portrait').alt=image.alt;}
 new IntersectionObserver(entries=>{roomVisible=entries[0].isIntersecting;updateDock();},{threshold:0}).observe($('#podcast-listening-room'));
 ['timeupdate','seeked','loadedmetadata','play','pause','ended'].forEach(event=>audio.addEventListener(event,updateDock));
 $('#podcast-dock-return').addEventListener('click',()=>$('#podcast-listening-room').scrollIntoView({block:'start',behavior:reducedMotion.matches?'instant':'smooth'}));
 readChapter();editionChanged();
})();
