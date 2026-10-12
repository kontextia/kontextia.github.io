/* [DE] Reuse original artwork as decoration; no changes to characters or lore. */
(() => {
 const art={saga:['assets/toki-transparent.png',false],atlas:['assets/city/aktuell_2026-10-12/stadt.webp',true],welten:['assets/city/aktuell_2026-10-12/gebirge.webp',true],lektionenkarten:['assets/kajo-transparent.png',false],analogien:['assets/kajo-transparent.png',false],stadttakt:['assets/city/aktuell_2026-10-12/stadt.webp',true],haeuser:['assets/city/aktuell_2026-10-12/stadt.webp',true],bewohner:['assets/toki-transparent.png',false],hoerspiel:['assets/kajo-transparent.png',false],entdecken:['assets/city/aktuell_2026-10-12/stadt.webp',true],fragen:['assets/kajo-transparent.png',false]};
 for(const [id,[src,city]] of Object.entries(art)){
  const section=document.getElementById(id);if(!section)continue;
  const backdrop=document.createElement('div');backdrop.className='ambient-art'+(city?' is-city':'');backdrop.setAttribute('aria-hidden','true');
  const img=document.createElement('img');img.src=src;img.alt='';img.loading='lazy';img.decoding='async';backdrop.append(img);section.prepend(backdrop);section.classList.add('with-ambient');
 }
})();
