/* [DE] The atlas shares the existing podcast audio and its recorded speaker clock. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),audio=$('#story-audio'),select=$('#audio-edition');
 if(!audio||!window.PODCAST_WEB||!window.KONTEXTIA)return;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clock=t=>`${Math.floor(Math.max(0,t)/60)}:${String(Math.floor(Math.max(0,t))%60).padStart(2,'0')}`;
 const topics={L00:'Ratespiel',L01:'Tokenhafen',L02:'Kartenwald',L03:'Sternwarte',L04:'Wackelturm',L05:'Logitmarkt',L06:'Kästnerviertel',L07:'Lernschmiede',L08:'Stufengebirge',L09:'Quellenarchipel',L10:'Nebelnacht',FINALE:'Lichterfest'};
 let active=null,token=0;
 const episodes=()=>window.KONTEXTIA.hoerspiel.folgen;
 const entry=(world,edition=0)=>{const e=episodes()[edition];if(e?.art!=='folge')return null;const chapter=e.kapitel.find(c=>c.titel.includes(topics[world]||'Lichterfest'));return chapter?{e,chapter,edition,rows:e.zeilen.filter(l=>l.kapitel===chapter.kapitel)}:null;};
 function card(world,part=1,figure){
  const x=entry(world);if(!x)return '';const cast=[...new Set(x.rows.map(l=>l.figur).filter(Boolean))],first=x.rows.find(l=>l.figur),f=window.PODCAST_WEB.figuren[first?.figur];
  return `<section class="scene-podcast" data-podcast-world="${esc(world)}" data-podcast-part="${part}" ${figure?`data-podcast-figure="${esc(figure)}"`:''} aria-label="Podcast zu ${esc(x.chapter.titel)}"><p class="scene-podcast-label">${part===2?'Aus der Stadtgeschichte':'Im Podcast'}</p><h4>${esc(x.chapter.titel)}</h4><div class="scene-podcast-speaker"><img data-scene-portrait src="${esc(f?.bild||'assets/kajo-transparent.png')}" alt="${esc(f?.name||'Kajo Cache')}"><div><strong data-scene-speaker>${esc(first?.sprecher||'Kajo Cache')}</strong><p data-scene-line>Höre die Bewohner und begleite sie durch diesen Teil der Geschichte.</p></div></div><div class="scene-podcast-controls"><button data-scene-play aria-label="Podcastkapitel ${esc(x.chapter.titel)} hören">▶ Kapitel hören</button><button data-scene-restart aria-label="Dieses Podcastkapitel von vorne hören">↺</button><label class="scene-podcast-edition"><span class="sr-only">Länge der Hörreise</span><select data-scene-edition><option value="0">Kleine Hörreise</option><option value="1">Ganze Geschichte</option></select></label></div><label class="scene-podcast-seek"><span class="sr-only">Position im Podcastkapitel</span><input data-scene-seek type="range" min="0" max="1000" value="0"><span data-scene-time>0:00 / ${clock(x.chapter.ende-x.chapter.start)}</span></label><div class="scene-podcast-cast" aria-label="Sprecher in diesem Podcastkapitel">${cast.map(id=>{const f=window.PODCAST_WEB.figuren[id];return f?`<button data-scene-voice="${esc(id)}" title="${esc(f.name)} im Podcast hören" aria-label="${esc(f.name)} im Podcast hören"><img src="${esc(f.bild)}" alt=""></button>`:'';}).join('')}</div><button class="text-link scene-podcast-open" data-scene-open>Auf der großen Podcastbühne weiterhören ↗</button><p class="scene-podcast-status" role="status"></p></section>`;
 }
 function refresh(){
  if(!active)return;const root=active.root;
  if(!root.isConnected){stop();return;}
  const x=entry(root.dataset.podcastWorld,+root.querySelector('[data-scene-edition]').value),t=audio.currentTime;
  if(!x||+select.value!==x.edition){active=null;return;}
  if(t>=x.chapter.ende){audio.pause();audio.currentTime=x.chapter.ende-.03;active.finished=true;}
  const at=Math.min(x.chapter.ende-.03,Math.max(x.chapter.start,audio.currentTime));
  const line=x.rows.find(l=>at>=l.start&&at<l.start+l.dauer)||x.rows.filter(l=>l.start<=at).at(-1)||x.rows[0];
  if(line){const f=window.PODCAST_WEB.figuren[line.figur];root.querySelector('[data-scene-speaker]').textContent=line.sprecher;root.querySelector('[data-scene-line]').textContent=line.text;if(f){const img=root.querySelector('[data-scene-portrait]');if(img.getAttribute('src')!==f.bild)img.src=f.bild;img.alt=f.name;}}
  const button=root.querySelector('[data-scene-play]');button.textContent=audio.paused?(active.finished?'↺ Noch einmal hören':'▶ Weiterhören'):'Ⅱ Pause';button.setAttribute('aria-label',audio.paused?'Podcastkapitel abspielen':'Podcast pausieren');
  root.dataset.playing=String(!audio.paused);root.querySelector('[data-scene-time]').textContent=clock(at-x.chapter.start)+' / '+clock(x.chapter.ende-x.chapter.start);root.querySelector('[data-scene-seek]').value=Math.round((at-x.chapter.start)/(x.chapter.ende-x.chapter.start)*1000);
  root.querySelectorAll('[data-scene-voice]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.sceneVoice===line?.figur)));
 }
 function stop(){if(active){active.root.dataset.playing='false';audio.pause();active=null;++token;}}
 function play(root,requested){
  const x=entry(root.dataset.podcastWorld,+root.querySelector('[data-scene-edition]').value);if(!x)return;
  const t=requested??(active?.root===root&&!active.finished&&audio.currentTime>=x.chapter.start&&audio.currentTime<x.chapter.ende?audio.currentTime:x.chapter.start);
  if(active?.root!==root)stop();const ticket=++token;active={root,world:root.dataset.podcastWorld,finished:false};
  if(+select.value!==x.edition||audio.getAttribute('src')!==x.e.datei){select.value=String(x.edition);select.dispatchEvent(new Event('change'));}
  const seek=()=>{if(ticket===token&&active?.root===root){audio.currentTime=t;refresh();}};
  if(audio.readyState<1)audio.addEventListener('loadedmetadata',seek,{once:true});else seek();
  document.querySelectorAll('audio,video').forEach(m=>{if(m!==audio)m.pause();});
  audio.play().then(()=>{if(ticket===token){seek();root.querySelector('.scene-podcast-status').textContent='';}}).catch(()=>{if(ticket===token)root.querySelector('.scene-podcast-status').textContent='Starte das Kapitel mit „Kapitel hören“.';});
 }
 document.addEventListener('click',e=>{
  const root=e.target.closest('.scene-podcast'),b=e.target.closest('button');if(!root||!b)return;
  const x=entry(root.dataset.podcastWorld,+root.querySelector('[data-scene-edition]').value);if(!x)return;
  if(b.hasAttribute('data-scene-play')){if(active?.root===root&&!audio.paused)audio.pause();else play(root);}
  if(b.hasAttribute('data-scene-restart'))play(root,x.chapter.start);
  if(b.dataset.sceneVoice){const l=x.rows.find(l=>l.figur===b.dataset.sceneVoice);if(l)play(root,l.start);}
  if(b.hasAttribute('data-scene-open')){const time=active?.root===root?audio.currentTime:x.chapter.start;play(root,time);active=null;$('#map-dialog')?.close();$('#podcast-listening-room').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
 });
 document.addEventListener('change',e=>{if(!e.target.matches('[data-scene-edition]'))return;const root=e.target.closest('.scene-podcast');if(active?.root===root)stop();const x=entry(root.dataset.podcastWorld,+e.target.value);if(x){root.querySelector('[data-scene-time]').textContent='0:00 / '+clock(x.chapter.ende-x.chapter.start);root.querySelector('[data-scene-play]').textContent='▶ Kapitel hören';root.querySelector('[data-scene-seek]').value=0;}});
 document.addEventListener('input',e=>{if(!e.target.matches('[data-scene-seek]'))return;const root=e.target.closest('.scene-podcast'),x=entry(root.dataset.podcastWorld,+root.querySelector('[data-scene-edition]').value);if(!x)return;const t=x.chapter.start+(x.chapter.ende-x.chapter.start)*(+e.target.value/1000);if(active?.root===root){audio.currentTime=Math.min(x.chapter.ende-.04,t);refresh();}else{root.querySelector('[data-scene-time]').textContent=clock(t-x.chapter.start)+' / '+clock(x.chapter.ende-x.chapter.start);}});
 ['timeupdate','seeked','loadedmetadata','play','pause','ended'].forEach(e=>audio.addEventListener(e,refresh));
 const modal=$('#map-dialog');modal.addEventListener('close',()=>{if(active?.root.closest('#map-dialog'))stop();});
 new MutationObserver(()=>{if(active&&!active.root.isConnected)stop();}).observe($('#map-info-content'),{childList:true,subtree:true});
 function worldCard(){const root=$('#world-panel');if(!root||root.querySelector('.scene-podcast'))return;const selected=$('#world-selector [aria-pressed="true"]'),w=window.SAGA?.welten[+selected?.dataset.world];if(w){const part=$('[data-world-tab="depth"]')?.getAttribute('aria-selected')==='true'?2:1;root.insertAdjacentHTML('afterbegin',card(w.id,part));}}
 new MutationObserver(worldCard).observe($('#world-panel'),{childList:true});
 worldCard();window.KontextPodcastScenes={card,chapter:(world,edition=0)=>entry(world,edition)?.chapter,state:()=>({world:active?.world||null,playing:!!active&&!audio.paused,time:audio.currentTime,chapter:active?entry(active.world,+active.root.querySelector('[data-scene-edition]').value)?.chapter:null})};
})();
