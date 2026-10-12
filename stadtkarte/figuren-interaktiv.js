/* [DE] Direct, accessible resident interactions on the existing source-bound maps. */
(() => {
  'use strict';
  const people = window.MapResidentData;
  if (!people?.length) return;
  const landing = !!document.querySelector('#atlas-image');
  const byId = Object.fromEntries(people.map(p => [p.id, p]));
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain = v => String(v ?? '').replace(/\*\*|`/g, '').replace(/\s*\(Begleiter\)/g, '');
  const part = () => landing ? +(document.querySelector('#atlas-image').dataset.atlasPart || 1) : (document.querySelector('#welt-2').getAttribute('aria-current') === 'page' ? 2 : 1);
  const path = v => landing ? '../stadtkarte/' + v : v;
  const album = document.createElement('details');
  album.className = 'map-resident-album';
  album.innerHTML = `<summary>Alle ${people.length} Bewohner kennenlernen <span>Figurenbilder & Stimmen</span></summary><label class="resident-search">Wen möchtest du treffen?<input type="search" placeholder="Name, Haus oder Aufgabe" aria-label="Bewohner auf der Karte suchen"></label><div class="resident-list">${people.map(p => `<button type="button" data-map-resident="${p.id}" aria-label="${esc(p.name)} kennenlernen"><img src="${esc(path(p.image))}" alt="" loading="lazy"><span>${esc(p.short)}<small>${esc(p.house || 'Kontextia')}</small></span></button>`).join('')}</div><p class="resident-empty" hidden>Hier wartet gerade niemand mit diesem Namen. Probiere einen anderen Suchbegriff.</p>`;
  const anchor = document.querySelector(landing ? '.atlas-map' : '#plakat');
  anchor?.after(album);
  album.querySelector('input').addEventListener('input', e => {
    const q = e.target.value.toLocaleLowerCase('de');
    album.querySelectorAll('[data-map-resident]').forEach(b => { const p = byId[b.dataset.mapResident]; b.hidden = ![p.name, p.house, p.role].join(' ').toLocaleLowerCase('de').includes(q); });
    album.querySelector('.resident-empty').hidden = !!album.querySelector('[data-map-resident]:not([hidden])');
  });
  if (landing) {
    album.addEventListener('click', e => { const b = e.target.closest('[data-map-resident]'); if (b) window.PremiumSite.openFigure(b.dataset.mapResident); });
    return;
  }
  const hint = document.createElement('p');
  hint.className = 'resident-map-hint';
  hint.textContent = 'Klicke auf eine Figur, um sie kennenzulernen. Die Zahlen und Ortsnamen führen dich zu den Geschichten und Aufgaben.';
  anchor?.before(hint);
  hint.after(album);
  const plan = document.querySelector('#plan'), mapField = plan.parentElement;
  const mapTools = document.createElement('div'); mapTools.className = 'resident-map-tools';
  mapTools.innerHTML = '<button type="button" data-resident-zoom="minus" aria-label="Karte verkleinern">−</button><output aria-live="polite">100 %</output><button type="button" data-resident-zoom="plus" aria-label="Karte vergrößern">+</button><button type="button" data-resident-zoom="reset">Ganze Karte</button><span>Vergrößern und verschieben, um die Bewohner zu treffen.</span>';
  const mapWindow = document.createElement('div'); mapWindow.className = 'resident-map-window';
  mapWindow.setAttribute('tabindex', '0'); mapWindow.setAttribute('aria-label', 'Stadtkarte: vergrößern mit Plus, zum Verschieben scrollen');
  mapField.prepend(mapTools); plan.before(mapWindow); mapWindow.append(plan);
  let zoom = 1;
  function zoomMap(next) {
    const previous = zoom, cx = mapWindow.scrollLeft + mapWindow.clientWidth / 2, cy = mapWindow.scrollTop + mapWindow.clientHeight / 2;
    zoom = Math.max(1, Math.min(5, next)); plan.style.width = (zoom * 100) + '%'; plan.style.maxWidth = 'none';
    mapTools.querySelector('output').value = Math.round(zoom * 100) + ' %';
    mapTools.querySelector('[data-resident-zoom="minus"]').disabled = zoom === 1;
    mapTools.querySelector('[data-resident-zoom="plus"]').disabled = zoom === 5;
    anchor.classList.toggle('resident-map-zoomed', zoom > 1);
    mapWindow.scrollLeft = zoom === 1 ? 0 : cx * zoom / previous - mapWindow.clientWidth / 2;
    mapWindow.scrollTop = zoom === 1 ? 0 : cy * zoom / previous - mapWindow.clientHeight / 2;
    window.dispatchEvent(new Event('resize'));
  }
  mapTools.addEventListener('click', e => { const mode = e.target.closest('[data-resident-zoom]')?.dataset.residentZoom; if (mode) zoomMap(mode === 'reset' ? 1 : zoom * (mode === 'plus' ? 1.6 : 1 / 1.6)); });
  mapWindow.addEventListener('keydown', e => { if (e.target !== mapWindow) return; if (['+', '=', '-', '0'].includes(e.key)) { e.preventDefault(); zoomMap(e.key === '0' ? 1 : zoom * (e.key === '-' ? 1 / 1.6 : 1.6)); } });
  zoomMap(1);
  const dialog = document.createElement('dialog');
  dialog.className = 'resident-dialog';
  dialog.setAttribute('aria-labelledby', 'resident-title');
  dialog.innerHTML = '<button type="button" class="resident-close" aria-label="Figurenporträt schließen">×</button><div id="resident-content"></div>';
  document.body.append(dialog);
  let trigger = null;
  const stop = () => { const audio = dialog.querySelector('audio'); if (audio) { audio.pause(); audio.removeAttribute('src'); audio.load(); } };
  dialog.querySelector('.resident-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { stop(); trigger?.focus(); });
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  function show(id, source) {
    const p = byId[id]; if (!p) return;
    stop(); trigger = source;
    const stationLinks = p.stations.map(s => `<a href="#t${part()}-${s.id}" data-resident-station>${esc(s.name)} ↗</a>`).join('');
    document.querySelector('#resident-content').innerHTML = `<div class="resident-portrait"><img src="${esc(p.image)}" alt="${esc(p.name)}"></div><div class="resident-story"><p class="resident-house">${esc(p.house || 'Kontextia')}</p><h2 id="resident-title">${esc(p.name)}</h2>${p.quote ? `<blockquote>${esc(plain(p.quote))}</blockquote>` : ''}<h3>Meine Aufgabe in der Stadt</h3><p>${esc(plain(p.role))}</p><audio controls preload="metadata" src="${esc(p.audio)}" aria-label="${esc(p.short)} spricht"></audio><button type="button" class="resident-play" aria-pressed="false">Meine Stimme hören ▶</button><p class="resident-audio-note" role="status"></p><details><summary>So arbeite ich</summary><p>${esc(plain(p.body))}</p><p><strong>Eingang:</strong> ${esc(p.input)}<br><strong>Ausgang:</strong> ${esc(p.output)}</p></details><details><summary>Hier begegnest du mir</summary><nav class="resident-stations">${stationLinks}</nav></details></div>`;
    const audio = dialog.querySelector('audio'), play = dialog.querySelector('.resident-play');
    play.addEventListener('click', () => {
      if (!audio.paused) audio.pause();
      else audio.play().catch(() => { dialog.querySelector('.resident-audio-note').textContent = 'Die Stimme konnte gerade nicht starten. Versuche es noch einmal.'; });
    });
    for (const event of ['play', 'pause', 'ended']) audio.addEventListener(event, () => { play.textContent = audio.paused ? 'Meine Stimme hören ▶' : 'Stimme pausieren Ⅱ'; play.setAttribute('aria-pressed', String(!audio.paused)); });
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-map-resident]'); if (b) { e.stopPropagation(); show(b.dataset.mapResident, b); }
  }, true);
  document.addEventListener('click', e => {
    if (e.target.closest('[data-resident-station]')) dialog.close();
    const place = e.target.closest('#plan [data-resident-place]');
    if (place) location.hash = `t${part()}-${place.dataset.residentPlace}`;
  });
  document.addEventListener('keydown', e => { const b = e.target.closest('[data-map-resident]:not(button),svg [data-resident-place]'); if (b && ['Enter', ' '].includes(e.key)) { e.preventDefault(); e.stopPropagation(); b.dispatchEvent(new MouseEvent('click', {bubbles:true})); } }, true);
  const activate = (el, id) => {
    if (el.dataset.mapResident) return;
    el.dataset.mapResident = id;
    el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
    el.setAttribute('aria-label', byId[id].name + ' kennenlernen');
    el.classList.add('resident-map-target');
  };
  function wireMap() {
    const plan = document.querySelector('#plan');
    plan.setAttribute('role', 'group');
    document.querySelectorAll('#plan .medaillon').forEach(g => {
      const clip = g.querySelector('image')?.getAttribute('clip-path');
      const id = clip?.match(/#clip-(.*)-(?:L\d+|FINALE)/)?.[1] || people.find(p => g.querySelector('title')?.textContent.startsWith(p.name))?.id;
      if (byId[id]) activate(g, id);
    });
    // These authored signs already identify Nora and Ressi; no new map location is invented.
    document.querySelectorAll('#plan .turmschild').forEach(t => {
      if (t.textContent.includes('Nora poliert')) activate(t, 'nora-norm');
      if (t.textContent.includes('Ressi legt')) activate(t, 'ressi-residual');
    });
    document.querySelectorAll('#plakat .wartet img, #etappenblatt .bild img, #etappenblatt .mini img, #etappenblatt .eb-figur image').forEach(img => {
      const src = img.getAttribute('src') || img.getAttribute('href');
      const id = src?.match(/figuren\/([^/]+)\.webp/)?.[1];
      if (byId[id]) activate(img.closest('.eb-figur, .wartet li') || img.parentElement, id);
    });
    const D = typeof DATEN !== 'undefined' ? DATEN : null;
    if (!D) return;
    const places = Object.fromEntries(D.karte.bezirke.filter(b => b.label).map(b => [b.label.text, b.station]));
    places['Turm der Schichten'] = 'L04'; places['Antwortbrücke'] = 'FINALE';
    places['Logitmarkt'] = 'L05';
    document.querySelectorAll('#plan .ortname').forEach(t => {
      const sid = places[t.textContent]; if (!sid || t.dataset.residentPlace) return;
      t.dataset.residentPlace = sid; t.setAttribute('role', 'link'); t.setAttribute('tabindex', '0');
      t.setAttribute('aria-label', t.textContent + ' erkunden'); t.classList.add('resident-map-target');
    });
  }
  wireMap();
  new MutationObserver(wireMap).observe(document.querySelector('#plan'), {childList:true, subtree:true});
  new MutationObserver(wireMap).observe(document.querySelector('#etappenblatt'), {childList:true, subtree:true});
})();
