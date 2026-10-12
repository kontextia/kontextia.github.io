/* Aktuelle Lektionskarten. Daten und Exporte gehören derselben SQLite-Version. */
(() => {
  'use strict';
  const S=window.SAGA,grid=document.querySelector('#cards-grid');if(!S||!grid)return;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let part=1;
  function draw(){
    const cards=[...S.welten.map(w=>({id:w.id,name:w.name,bezirk:w.bezirk,text:w.kartentexte['t'+part]})),{id:'FINALE',name:S.abschluesse['t'+part].name,bezirk:part===1?'Brückenplatz':'Herz des Turms',text:S.abschluesse['t'+part].kartentext}];
    grid.innerHTML=cards.map(w=>`<article class="lesson-card"><a href="../stadtkarte/index.html#t${part}-${w.id}" aria-label="${esc(w.id+' '+w.name)}: vollständiges Etappenblatt"><img src="assets/lektionskarte-t${part}-${w.id}.webp" loading="lazy" width="1600" height="1470" alt="Beschriftete Lektionskarte: ${esc(w.name)}, Lernziele, Gewinn, Preis und Bildgrenze"><div class="lesson-card-title"><span>${esc(w.id==='L00'?'L00 · Prolog':w.id)}</span><h3>${esc(w.name)}</h3><p>${esc(w.bezirk)}</p></div></a><div class="lesson-card-actions"><button data-card-open="${w.id}">Karte groß öffnen ⤢</button><a href="assets/lektionskarte-t${part}-${w.id}.svg" download>SVG ↓</a><a href="assets/lektionskarte-t${part}-${w.id}.png" download>PNG ↓</a></div></article>`).join('');
    grid.querySelectorAll('.lesson-card').forEach((card,i)=>{const t=cards[i].text,body=document.createElement('div');body.className='lesson-card-reading';body.innerHTML=`<h4>Was passiert hier?</h4><p>${esc(t.erklaerung)}</p><h4>Erwartetes Ergebnis</h4><p>${esc(t.ergebnis)}</p><details><summary>Dein Auftrag und die Fehlerprüfung</summary><h4>Dein Auftrag</h4><p>${esc(t.auftrag)}</p><h4>So findest du Fehler</h4><p>${esc(t.fehlerpruefung)}</p><p class="caption">${esc(t.quelle)} · ${esc(S.meta.generation)}</p></details><a class="text-link" href="assets/lektionskarte-t${part}-${cards[i].id}.html">Karte und Text als Lesefassung öffnen ↗</a>`;card.insertBefore(body,card.querySelector('.lesson-card-actions'));card.querySelector('img').height=1810;});
    document.querySelector('#cards-version').textContent=`Didaktik 2.2 · zwölf Karten je Reise · gemeinsame Generation ${S.meta.generation}`;
    const sourceLink=document.createElement('a');sourceLink.href='../datenstand/index.html';sourceLink.textContent='Datenstand, Quellen und offene Abgleiche ↗';document.querySelector('#cards-version').append(' · ',sourceLink);
    grid.querySelectorAll('[data-card-open]').forEach(b=>b.addEventListener('click',()=>window.openKontextMap({src:`assets/lektionskarte-t${part}-${b.dataset.cardOpen}.svg`,title:cards.find(w=>w.id===b.dataset.cardOpen).name,link:`../stadtkarte/index.html#t${part}-${b.dataset.cardOpen}`})));
  }
  document.querySelectorAll('[data-card-part]').forEach(b=>b.addEventListener('click',()=>{part=+b.dataset.cardPart;document.querySelectorAll('[data-card-part]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw();}));
  draw();
})();
