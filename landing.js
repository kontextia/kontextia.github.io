/* Kontextia – Projektseite. Baut alle Abschnitte aus daten/landing_daten.js (erzeugt von tools/landing_bauen.py). */
(function () {
  "use strict";
  var K = window.KONTEXTIA || {};
  var $ = function (id) { return document.getElementById(id); };
  var ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, kinder) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "text") e.textContent = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "style") e.style.cssText = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    (kinder || []).forEach(function (c) { if (c == null || c === false) return; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function svg(tag, attrs, kinder) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    (kinder || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function zeit(s) {
    s = Math.max(0, Math.floor(s || 0));
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : String(m).padStart(2, "0")) + ":" + String(x).padStart(2, "0");
  }
  function liste(arr) { return Array.isArray(arr) ? arr : (arr ? [arr] : []); }
  function text(v) { return Array.isArray(v) ? v.join(" ") : (v == null ? "" : String(v)); }
  var figurNach = {};
  liste(K.figuren).forEach(function (f) { figurNach[f.id] = f; });
  var weltNach = {};
  liste(K.welten).forEach(function (w) { weltNach[w.id] = w; });
  function farbeWelt(id) { return (weltNach[id] && weltNach[id].farbe) || "var(--bernstein)"; }
  function gesicht(id, gross) {
    var f = figurNach[id];
    if (!f) return el("span", { class: "ohne", title: id });
    return el("img", { src: f.bild, alt: f.name, title: f.name, loading: "lazy", width: gross || 44, height: gross || 44 });
  }
  function kaesten(o, klasse) {
    var wrap = el("div", { class: klasse || "" });
    if (o.vorlesen) wrap.appendChild(el("div", { class: "kasten vorlesen" }, [el("b", { class: "kasten-name", text: "Zum Vorlesen" }), text(o.vorlesen)]));
    if (o.wirklich) wrap.appendChild(el("div", { class: "kasten wirklich" }, [el("b", { class: "kasten-name", text: "Was wirklich passiert" }), text(o.wirklich)]));
    if (o.grenze) wrap.appendChild(el("div", { class: "kasten grenze" }, [el("b", { class: "kasten-name", text: "Hier endet das Bild" }), text(o.grenze)]));
    return wrap;
  }
  function datenKarte(rein, raus) {
    if (!rein && !raus) return null;
    return el("span", { class: "karte-daten", title: "rein → raus" }, [el("span", { text: rein || "–" }), el("i", { text: "→" }), el("span", { text: raus || "–" })]);
  }

  /* ---------------- Thema ---------------- */
  try { var gespeichert = localStorage.getItem("kontextia-thema"); if (gespeichert) document.documentElement.dataset.theme = gespeichert; } catch (e) {}
  $("thema").addEventListener("click", function () {
    var dunkel = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dunkel ? "light" : "dark";
    try { localStorage.setItem("kontextia-thema", document.documentElement.dataset.theme); } catch (e) {}
  });

  /* ---------------- Kopf: Brücke über der Bucht ---------------- */
  var BOEGEN = liste(K.welten).map(function (w) { return { id: w.id, farbe: w.farbe, name: w.bogen_name || w.id }; });
  (function kopfBruecke() {
    var s = $("kopf-bruecke"); if (!s) return;
    var W = 1400, x0 = 90, b = (W - 180) / 9, sterne = svg("g", { class: "sterne" });
    var zufall = 7; function z() { zufall = (zufall * 16807) % 2147483647; return zufall / 2147483647; }
    for (var i = 0; i < 70; i++) sterne.appendChild(svg("circle", { cx: z() * W, cy: z() * 120, r: z() * 1.4 + .3, opacity: (z() * .6 + .2).toFixed(2) }));
    s.appendChild(sterne);
    for (var j = 0; j < 4; j++) s.appendChild(svg("path", { d: "M0 " + (262 + j * 9) + " Q 350 " + (254 + j * 9) + " 700 " + (262 + j * 9) + " T 1400 " + (262 + j * 9), stroke: "rgba(160,190,240,.18)", "stroke-width": 1.5, fill: "none" }));
    s.appendChild(svg("rect", { x: 60, y: 120, width: W - 120, height: 8, rx: 4, fill: "#2a3f6e" }));
    BOEGEN.forEach(function (bg, i) {
      var a = x0 + i * b, c = a + b, m = (a + c) / 2;
      var p = svg("path", { d: "M" + (a + 8) + " 250 Q " + m + " 96 " + (c - 8) + " 250", fill: "none", stroke: "#2a3f6e", "stroke-width": 9, "stroke-linecap": "round" });
      p.style.transition = "stroke .9s ease, filter .9s ease";
      p.dataset.farbe = bg.farbe;
      s.appendChild(p);
      var spiegel = svg("path", { d: "M" + (a + 8) + " 262 Q " + m + " 330 " + (c - 8) + " 262", fill: "none", stroke: bg.farbe, "stroke-width": 4, opacity: 0, "stroke-linecap": "round" });
      spiegel.style.transition = "opacity 1.2s ease";
      s.appendChild(spiegel);
      var t = svg("text", { x: m, y: 286, "text-anchor": "middle", class: "bogen-label" }); t.textContent = bg.id;
      s.appendChild(t);
      setTimeout(function () {
        p.setAttribute("stroke", bg.farbe); p.style.filter = "drop-shadow(0 0 10px " + bg.farbe + ")"; spiegel.setAttribute("opacity", .25);
      }, ruhig ? 0 : 500 + i * 260);
    });
    var stein = svg("rect", { x: x0 + 4.5 * b - 14, y: 102, width: 28, height: 26, rx: 4, fill: "#2a3f6e" });
    stein.style.transition = "fill 1s ease, filter 1s ease";
    s.appendChild(stein);
    setTimeout(function () { stein.setAttribute("fill", "#f0a830"); stein.style.filter = "drop-shadow(0 0 14px #f0a830)"; }, ruhig ? 0 : 500 + 9 * 260 + 300);
  })();

  /* ---------------- Wegweiser ---------------- */
  (function wegweiser() {
    var mini = $("mini-bruecke");
    BOEGEN.forEach(function (bg) {
      mini.appendChild(el("a", { href: "#spiele", title: bg.id + " " + bg.name, style: "--f:" + bg.farbe, "data-welt": bg.id, onclick: function () { zeigeWelt(bg.id); } }));
    });
    var links = Array.prototype.slice.call(document.querySelectorAll("#wegweiser a"));
    var abschnitte = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
    var beob = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + e.target.id)); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    abschnitte.forEach(function (a) { if (a) beob.observe(a); });
  })();

  /* ---------------- Idee ---------------- */
  (function idee() {
    var ul = $("grundsaetze");
    liste(K.grundsaetze).forEach(function (g) {
      ul.appendChild(el("li", {}, [el("b", { text: g.titel }), " ", g.text || ""]));
    });
    if (K.teile) $("idee-alter").textContent = K.teile;
  })();

  /* ================= Hörspiel-Bühne ================= */
  var Hoer = (function () {
    var folgen = liste(K.hoerspiel && K.hoerspiel.folgen);
    var ton = $("ton"), ebenen = [$("ebene-a"), $("ebene-b")], oben = 0, schluessel = null;
    var fi = -1, ei = 0, kapAktiv = -1, laden = 0;
    var WECHSEL = 11;

    function folge() { return folgen[fi]; }
    function istListe() { return folge() && folge().art === "liste"; }
    function kapitel() { return istListe() ? folge().eintraege.map(function (e, i) { return { titel: e.titel, start: 0, ende: e.dauer, farbe: e.farbe }; }) : folge().kapitel; }

    function zeigeBild(key, bau) {
      if (key === schluessel) return;
      schluessel = key;
      var neu = ebenen[1 - oben], alt = ebenen[oben], nummer = ++laden;
      neu.className = "ebene";
      neu.innerHTML = "";
      var fertig = function () {
        if (nummer !== laden) return;
        requestAnimationFrame(function () {
          neu.classList.add("sichtbar"); alt.classList.remove("sichtbar"); oben = 1 - oben;
        });
      };
      bau(neu, fertig);
    }
    function weltbild(b) {
      return function (ebene, fertig) {
        var img = new Image();
        img.alt = b.titel || "";
        img.onload = fertig; img.onerror = fertig;
        img.src = b.src;
        if (b.art === "karte") ebene.classList.add("karte");
        else if (!ruhig) {
          ebene.classList.add("fahrt");
          ebene.style.setProperty("--dx", ((Math.random() - .5) * 6).toFixed(1) + "%");
          ebene.style.setProperty("--dy", ((Math.random() - .5) * 4).toFixed(1) + "%");
          ebene.style.setProperty("--ox", (30 + Math.random() * 40).toFixed(0) + "%");
          ebene.style.setProperty("--oy", (30 + Math.random() * 40).toFixed(0) + "%");
          ebene.style.setProperty("--dauer", (WECHSEL + 3) + "s");
        }
        ebene.appendChild(img);
      };
    }
    function portrait(f, hintergrund) {
      return function (ebene, fertig) {
        var hinten = el("div", { class: "hinten", style: "background-image:url('" + (hintergrund || f.bild_gross || f.bild) + "')" });
        var img = new Image();
        img.alt = f.name; img.onload = fertig; img.onerror = fertig; img.src = f.bild_gross || f.bild;
        ebene.appendChild(hinten);
        ebene.appendChild(el("div", { class: "vorne" }, [img]));
      };
    }

    function bilderVon(k) { return liste(k && k.bilder); }

    function aktualisieren() {
      if (fi < 0) return;
      var t = ton.currentTime || 0, f = folge();
      var kaps = kapitel(), ki;
      if (istListe()) ki = ei;
      else { ki = 0; kaps.forEach(function (k, i) { if (t >= k.start) ki = i; }); }
      var k = kaps[ki] || {};
      if (ki !== kapAktiv) {
        kapAktiv = ki;
        Array.prototype.forEach.call($("kapitelliste").children, function (li, i) { li.classList.toggle("jetzt", i === ki); });
        $("ort-schild").textContent = k.titel || "";
        $("kapitel-jetzt").textContent = k.titel || "";
      }
      // Wer spricht?
      var z = null;
      if (istListe()) { var e = f.eintraege[ei]; z = { figur: e.figur, sprecher: e.titel, text: e.text }; }
      else {
        for (var i = f.zeilen.length - 1; i >= 0; i--) { if (t >= f.zeilen[i].start - .05) { z = f.zeilen[i]; break; } }
        if (z && t > z.start + z.dauer + .8) z = null;
      }
      var figur = z && z.figur && figurNach[z.figur];
      var plakette = $("sprecher");
      if (z && z.sprecher) {
        $("sprecher-name").textContent = z.sprecher;
        plakette.style.setProperty("--f", (figur && figur.farbe) || "var(--bernstein)");
        plakette.classList.add("da");
      } else plakette.classList.remove("da");
      var ut = $("untertitel");
      ut.hidden = !$("mit-text").checked || !z;
      if (z) ut.textContent = z.text;
      // Bild: sprechende Figur groß, sonst die Bilder des Kapitels im Wechsel
      var bilder = bilderVon(istListe() ? f.eintraege[ei] : k);
      var welt = bilder.length ? bilder[Math.floor(Math.max(0, t - (k.start || 0)) / WECHSEL) % bilder.length] : null;
      if (figur && figur.bild) zeigeBild("p:" + figur.id, portrait(figur, welt && welt.art !== "karte" ? welt.src : null));
      else if (welt) zeigeBild("w:" + welt.src + ":" + Math.floor(Math.max(0, t - (k.start || 0)) / WECHSEL), weltbild(welt));
      // Fortschritt
      var segs = $("segmente").children;
      kaps.forEach(function (kk, i) {
        var anteil = istListe() ? (i < ei ? 1 : i === ei ? (ton.duration ? t / ton.duration : 0) : 0)
          : Math.max(0, Math.min(1, (t - kk.start) / Math.max(.1, kk.ende - kk.start)));
        if (segs[i]) segs[i].firstChild.style.width = (anteil * 100).toFixed(2) + "%";
      });
      $("zeit-jetzt").textContent = zeit(istListe() ? f.eintraege.slice(0, ei).reduce(function (s, e) { return s + e.dauer; }, 0) + t : t);
      $("segmente").setAttribute("aria-valuenow", String(Math.round(100 * (istListe() ? ei / f.eintraege.length : t / (f.dauer || 1)))));
    }

    function titelkarte(titel, unter, dauer) {
      $("titel-folge").textContent = titel; $("titel-unter").textContent = unter || "";
      var tk = $("titelkarte"); tk.classList.remove("weg");
      if (dauer) setTimeout(function () { tk.classList.add("weg"); }, dauer);
    }

    function waehle(i, abspielen) {
      if (!folgen[i]) return;
      fi = i; ei = 0; kapAktiv = -1; schluessel = null;
      var f = folge();
      Array.prototype.forEach.call($("folgen").children, function (b, j) { b.setAttribute("aria-pressed", String(j === i)); });
      // Kapitel + Segmente
      var ol = $("kapitelliste"); ol.textContent = "";
      var segs = $("segmente"); segs.textContent = "";
      var gesamt = f.dauer || kapitel().reduce(function (s, k) { return s + (k.ende - k.start); }, 0);
      kapitel().forEach(function (k, j) {
        var farbe = k.farbe || "rgba(255,255,255,.35)";
        ol.appendChild(el("li", {}, [el("button", { type: "button", onclick: function () { springeKapitel(j); } }, [
          el("span", { class: "p", style: "--f:" + farbe }), el("span", { text: k.titel }),
          el("span", { class: "z", text: istListe() ? zeit(k.ende) : zeit(k.start) })])]));
        segs.appendChild(el("span", { style: "flex:" + Math.max(.5, (k.ende - k.start)) + " 1 0;--f:" + (k.farbe || "var(--bernstein)"), title: k.titel }, [el("i")]));
      });
      $("zeit-ganz").textContent = zeit(gesamt);
      ladeTon(abspielen);
      titelkarte(f.name, f.beschreibung, abspielen ? 2600 : 0);
      var erst = istListe() ? bilderVon(f.eintraege[0])[0] : bilderVon(f.kapitel[0])[0];
      if (erst) zeigeBild("start:" + erst.src, weltbild(erst));
    }
    function ladeTon(abspielen) {
      var f = folge();
      ton.src = istListe() ? f.eintraege[ei].datei : f.datei;
      if (abspielen) ton.play().catch(function () {});
    }
    function springeKapitel(j) {
      if (istListe()) { ei = Math.max(0, Math.min(folge().eintraege.length - 1, j)); kapAktiv = -1; ladeTon(true); return; }
      var k = folge().kapitel[Math.max(0, Math.min(folge().kapitel.length - 1, j))];
      ton.currentTime = k.start + .01; ton.play().catch(function () {});
    }
    ton.addEventListener("timeupdate", aktualisieren);
    ton.addEventListener("seeked", aktualisieren);
    ton.addEventListener("play", function () { $("spielen").textContent = "❚❚"; $("spielen").setAttribute("aria-label", "Pause"); $("titelkarte").classList.add("weg"); });
    ton.addEventListener("pause", function () { $("spielen").textContent = "▶"; $("spielen").setAttribute("aria-label", "Abspielen"); });
    ton.addEventListener("ended", function () {
      if (istListe() && ei < folge().eintraege.length - 1) { ei++; kapAktiv = -1; ladeTon(true); return; }
      if ($("alle-folgen").checked && fi < folgen.length - 1) {
        var naechste = fi + 1;
        titelkarte(folgen[naechste].name, "Gleich geht es weiter …");
        setTimeout(function () { waehle(naechste, true); }, 2400);
      } else titelkarte("Ende", "Die Brücke leuchtet.");
    });
    $("spielen").addEventListener("click", function () { if (fi < 0) waehle(0, true); else if (ton.paused) ton.play(); else ton.pause(); });
    $("zurueck").addEventListener("click", function () { springeKapitel(kapAktiv - (istListe() ? 1 : (ton.currentTime - (kapitel()[kapAktiv] || {}).start > 4 ? 0 : 1))); });
    $("vor").addEventListener("click", function () { springeKapitel(kapAktiv + 1); });
    $("mit-text").addEventListener("change", aktualisieren);
    function suchen(x) {
      var r = $("segmente").getBoundingClientRect(), anteil = Math.max(0, Math.min(1, (x - r.left) / r.width));
      if (istListe()) { springeKapitel(Math.floor(anteil * folge().eintraege.length)); return; }
      ton.currentTime = anteil * (folge().dauer || ton.duration || 0);
    }
    $("segmente").addEventListener("click", function (e) { suchen(e.clientX); });
    $("segmente").addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { ton.currentTime += 10; e.preventDefault(); }
      if (e.key === "ArrowLeft") { ton.currentTime -= 10; e.preventDefault(); }
    });
    $("leinwand").addEventListener("click", function () { $("spielen").click(); });
    folgen.forEach(function (f, i) {
      $("folgen").appendChild(el("button", { type: "button", class: "folge", "aria-pressed": "false", onclick: function () { waehle(i, true); } }, [
        el("b", { text: f.name }), el("small", { text: (f.beschreibung || "") + (f.dauer ? " (" + zeit(f.dauer) + ")" : "") })]));
    });
    if (folgen.length) waehle(0, false);
    return { waehle: waehle };
  })();

  /* ================= Stadtkarte ================= */
  (function karte() {
    var K2 = K.karte || {}, rahmen = $("karte-bild"), nah = $("nahaufnahme"), knoepfe = $("stationen");
    if (K2.hinweis) $("karte-hinweis").textContent = K2.hinweis;
    var uebersicht = K2.uebersicht ? el("img", { src: K2.uebersicht, alt: "Übersichtskarte von Kontextia" }) : null;
    if (K2.iframe) rahmen.appendChild(el("iframe", { src: K2.iframe, title: "Stadtkarte von Kontextia", loading: "lazy" }));
    else if (uebersicht) rahmen.appendChild(uebersicht);
    var stationen = liste(K2.stationen);
    function zeige(i) {
      var s = stationen[i];
      Array.prototype.forEach.call(knoepfe.children, function (b, j) { b.setAttribute("aria-pressed", String(j === i)); });
      nah.style.setProperty("--f", s.farbe || "var(--bernstein)");
      nah.textContent = "";
      nah.appendChild(el("h3", { text: s.name }));
      if (s.welt) nah.appendChild(el("p", { class: "klein", text: (s.welt + (weltNach[s.welt] ? ": " + weltNach[s.welt].spielname : "")) }));
      if (s.beschreibung) nah.appendChild(el("p", { text: s.beschreibung }));
      if (s.figuren && s.figuren.length) {
        var m = el("div", { class: "mitglieder" });
        s.figuren.forEach(function (id) { var f = figurNach[id]; if (f) m.appendChild(el("a", { class: "mitglied", href: "#person-" + id }, [gesicht(id, 34), f.name])); });
        nah.appendChild(m);
      }
      nah.appendChild(kaesten({ vorlesen: s.vorlesen, wirklich: s.wirklich, grenze: s.grenze }));
      if (s.daten_rein || s.daten_raus) nah.appendChild(el("p", {}, ["Hier kommt an und geht weiter: ", datenKarte(s.daten_rein, s.daten_raus)]));
      if (s.nahbild) {
        rahmen.textContent = "";
        rahmen.appendChild(el("img", { src: s.nahbild, alt: "Nahaufnahme: " + s.name }));
      } else if (s.anker && K2.iframe) {
        var fr = rahmen.querySelector("iframe");
        if (fr) fr.src = K2.iframe.split("#")[0] + "#" + s.anker;
      }
      if (s.welt) nah.appendChild(el("p", {}, [el("a", { href: "#spiele", onclick: function () { zeigeWelt(s.welt); } }, ["Zum Spiel dieser Welt"])]));
    }
    if (uebersicht && stationen.some(function (s) { return s.nahbild; })) {
      knoepfe.appendChild(el("button", { type: "button", class: "station-knopf", onclick: function () {
        rahmen.textContent = ""; rahmen.appendChild(uebersicht);
        Array.prototype.forEach.call(knoepfe.children, function (b, j) { b.setAttribute("aria-pressed", String(j === 0)); });
      } }, ["Ganze Stadt"]));
    }
    var versatz = knoepfe.children.length;
    stationen.forEach(function (s, i) {
      knoepfe.appendChild(el("button", { type: "button", class: "station-knopf", "aria-pressed": "false", style: "--f:" + (s.farbe || "var(--bernstein)"), onclick: function () { zeige(i); setzeDruck(i + versatz); } }, [s.kurz || s.name]));
    });
    function setzeDruck(j) { Array.prototype.forEach.call(knoepfe.children, function (b, x) { b.setAttribute("aria-pressed", String(x === j)); }); }
    if (stationen.length) { zeige(0); setzeDruck(versatz); }
  })();

  /* ================= Stadttakt ================= */
  (function takt() {
    var ol = $("takt-liste");
    liste(K.takt).forEach(function (m) {
      var gesichter = el("div", { class: "gesichter" });
      liste(m.figuren).forEach(function (id) { gesichter.appendChild(gesicht(id)); });
      ol.appendChild(el("li", {}, [
        el("div", { class: "nr", text: String(m.nr) }),
        el("div", { class: "inhalt" }, [
          el("h3", { text: m.name }),
          m.zeile_taktlied ? el("div", { class: "lied", text: "„" + m.zeile_taktlied + "“" }) : null,
          el("div", { class: "reihe" }, [gesichter, el("span", { text: liste(m.figuren).map(function (id) { return (figurNach[id] || {}).name || id; }).join(", ") }), datenKarte(m.datentyp_rein, m.datentyp_raus)]),
          el("p", { text: m.was_passiert }),
          m.fachbegriff ? el("p", { class: "klein" }, [el("b", { class: "schild", text: "Fachbegriff: " }), m.fachbegriff]) : null,
          m.wenn_es_fehlt ? el("div", { class: "wenn-fehlt" }, [el("b", { text: "Wenn es fehlt: " }), m.wenn_es_fehlt]) : null
        ])
      ]));
    });
  })();

  /* ================= Häuser ================= */
  function wappenSvg(h) {
    var f = h.farbe || "#f0a830";
    var s = svg("svg", { class: "wappen", viewBox: "0 0 110 128", role: "img", "aria-label": "Wappen: " + (h.wappen || h.name) });
    s.appendChild(svg("path", { d: "M8 8 H102 V64 C102 98 78 116 55 124 C32 116 8 98 8 64 Z", fill: f, opacity: .18, stroke: f, "stroke-width": 4 }));
    var g = svg("g", { fill: "none", stroke: f, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", transform: "translate(55 62)" });
    var symbol = h.symbol || "stern";
    var P = {
      schere: ["M-22 -18 L18 14", "M-22 14 L18 -18", "M-26 30 Q-13 22 0 30 T 26 30"],
      kompass: ["M0 -28 L8 0 L0 28 L-8 0 Z", "M-28 0 L28 0"],
      fragekamm: ["M-26 -10 H26", "M-20 -10 V14", "M-8 -10 V8", "M4 -10 V18", "M16 -10 V4"],
      schluesselkamm: ["M-26 10 H26", "M-20 10 V-14", "M-8 10 V-6", "M4 10 V-18", "M16 10 V-4"],
      paket: ["M-24 -12 H24 V22 H-24 Z", "M-24 -12 L0 4 L24 -12", "M-8 -12 Q0 -30 8 -12"],
      gitter: ["M-24 -24 V24", "M-8 -24 V24", "M8 -24 V24", "M24 -24 V24", "M-28 30 H28"],
      kuchen: ["M-26 0 A26 26 0 1 0 26 0 A26 26 0 1 0 -26 0", "M0 0 L0 -26", "M0 0 L22 14", "M0 0 L-20 16"],
      turm: ["M-14 30 V-26 H14 V30", "M-8 -8 H8", "M0 -16 V0"],
      markt: ["M-24 20 L0 -24 L24 20 Z", "M0 30 V24"],
      schublade: ["M-26 -22 H26 V24 H-26 Z", "M-26 0 H26", "M0 -22 V24", "M-14 -11 H-10", "M10 12 H14"],
      hammer: ["M-20 -22 H6 V-8 H-20 Z", "M-7 -8 V28", "M10 10 L26 -6"],
      treppe: ["M-26 26 H-12 V12 H2 V-2 H16 V-16 H26"],
      blatt: ["M-18 26 Q-26 -20 22 -26 Q22 18 -18 26 Z", "M-18 26 L14 -14"],
      stern: ["M0 -24 L6 -6 L24 -6 L10 6 L16 24 L0 13 L-16 24 L-10 6 L-24 -6 L-6 -6 Z"]
    };
    (P[symbol] || P.stern).forEach(function (d) { g.appendChild(svg("path", { d: d })); });
    s.appendChild(g);
    return s;
  }
  (function haeuser() {
    var ziel = $("haeuser-liste");
    liste(K.haeuser).forEach(function (h) {
      var mitglieder = el("div", { class: "mitglieder" });
      liste(h.mitglieder).forEach(function (id) {
        var f = figurNach[id];
        mitglieder.appendChild(f ? el("a", { class: "mitglied", href: "#person-" + id }, [gesicht(id, 34), f.name]) : el("span", { class: "mitglied", text: id }));
      });
      var rituale = el("ul", { class: "rituale" });
      liste(h.rituale).forEach(function (r) {
        rituale.appendChild(el("li", {}, [el("b", { text: r.name }), " ", r.was_passiert || "", r.fakt_dahinter ? el("span", { class: "fakt", text: "Fakt: " + r.fakt_dahinter }) : null]));
      });
      ziel.appendChild(el("article", { class: "haus", id: "haus-" + h.id }, [
        wappenSvg(h),
        el("div", {}, [
          el("h3", { text: h.name }),
          h.spruch ? el("div", { class: "spruch", text: "„" + h.spruch.replace(/^[„"]|[“"]$/g, "") + "“" }) : null,
          el("p", { text: h.kurz || "" }),
          mitglieder,
          el("div", { class: "haus-raster" }, [
            el("div", {}, [
              h.geschichte ? el("p", { text: h.geschichte }) : null,
              el("p", {}, [el("b", { class: "schild", text: "Wappen und Anschluss: " }), (h.wappen || "") + " ", datenKarte(h.anschluss_rein, h.anschluss_raus) || el("span", { text: h.anschluss || "" })]),
              el("div", { class: "gegenueber" }, [
                el("div", {}, [el("b", { text: "Was die anderen lästern" }), text(h.laestern)]),
                el("div", {}, [el("b", { text: "Was sie wirklich leisten" }), text(h.leisten)])
              ]),
              h.fakt ? el("div", { class: "kasten wirklich" }, [el("b", { class: "kasten-name", text: "Was wirklich passiert" }), h.fakt]) : null
            ]),
            el("div", {}, [el("h4", { style: "margin-top:0", text: "Rituale: so führen sie ihre Aufgabe aus" }), rituale,
              liste(h.redewendungen).length ? el("p", { class: "klein", text: "Man sagt dort: " + liste(h.redewendungen).map(function (r) { return "„" + r.replace(/^[„"]|[“"]$/g, "") + "“"; }).join(" ") }) : null])
          ])
        ])
      ]));
    });
  })();

  /* ================= Einwohnerverzeichnis ================= */
  var spielerProbe = new Audio();
  (function verzeichnis() {
    var ziel = $("verzeichnis"), fh = $("f-haus"), fw = $("f-welt"), such = $("f-suche");
    var hausName = {};
    liste(K.haeuser).forEach(function (h) { hausName[h.id] = h.name; fh.appendChild(el("option", { value: h.id, text: h.name })); });
    liste(K.welten).forEach(function (w) { fw.appendChild(el("option", { value: w.id, text: w.id + " " + (w.spielname || "") })); });
    var karten = [];
    liste(K.figuren).forEach(function (f) {
      var knopfV = f.audio_vorstellung ? el("button", { class: "mini-knopf", type: "button", "aria-pressed": "false", text: "▶ Stimme" }) : null;
      if (knopfV) knopfV.addEventListener("click", function () {
        if (!spielerProbe.paused && spielerProbe.dataset.id === f.id) { spielerProbe.pause(); return; }
        document.querySelectorAll(".mini-knopf[aria-pressed=true]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        spielerProbe.src = f.audio_vorstellung; spielerProbe.dataset.id = f.id; spielerProbe.play(); knopfV.setAttribute("aria-pressed", "true");
      });
      var dl = el("dl");
      [["Haus", hausName[f.haus] || f.haus], ["Fachbegriff", f.fachrolle], ["Arbeitsort", f.arbeitsort], ["Welten", liste(f.welten).join(", ")],
        ["Im Takt", liste(f.takt_momente).length ? "Moment " + liste(f.takt_momente).join(", ") : ""],
        ["Anschluss", f.anschluss ? (f.anschluss.rein || "–") + " → " + (f.anschluss.raus || "–") + (f.anschluss.form ? " (" + f.anschluss.form + ")" : "") : ""],
        ["Aussehen", f.aussehen], ["Running Gag", f.running_gag], ["Schwäche", f.schwaeche], ["Unverzichtbar, weil", f.unverzichtbar_weil], ["Familie", f.beziehungen]
      ].forEach(function (p) { if (p[1]) { dl.appendChild(el("dt", { text: p[0] })); dl.appendChild(el("dd", { text: text(p[1]) })); } });
      var karte = el("article", { class: "person", id: "person-" + f.id, style: "--f:" + (f.farbe || "var(--linie)") }, [
        f.bild ? el("img", { src: f.bild, alt: f.name, loading: "lazy", width: 96, height: 96 }) : el("div"),
        el("div", {}, [el("h3", { text: f.name }), el("div", { class: "posten", text: f.posten || f.fachrolle || "" }),
          f.satz ? el("div", { class: "satz", text: "„" + f.satz.replace(/^[„"]|[“"]$/g, "") + "“" }) : null, knopfV]),
        el("details", {}, [el("summary", { text: "Mehr über " + f.name.split(" ")[0] }), f.kurzgeschichte ? el("p", { style: "margin:8px 0 0", text: f.kurzgeschichte }) : null, dl])
      ]);
      karte._such = [f.name, f.posten, f.fachrolle, f.arbeitsort, hausName[f.haus], f.satz].join(" ").toLocaleLowerCase("de");
      karte._f = f;
      karten.push(karte); ziel.appendChild(karte);
    });
    function filtern() {
      var q = such.value.trim().toLocaleLowerCase("de"), h = fh.value, w = fw.value, n = 0;
      karten.forEach(function (k) {
        var ok = (!q || k._such.indexOf(q) >= 0) && (!h || k._f.haus === h) && (!w || liste(k._f.welten).indexOf(w) >= 0);
        k.hidden = !ok; if (ok) n++;
      });
      $("f-anzahl").textContent = n + " von " + karten.length + " Figuren";
    }
    [such, fh, fw].forEach(function (x) { x.addEventListener("input", filtern); });
    filtern();
  })();

  /* ================= Fehlerkultur + Gedächtnisse ================= */
  (function fehler() {
    var z = $("pruefungen");
    liste(K.fehlerkultur).forEach(function (p) {
      z.appendChild(el("div", { class: "pruefung" }, [el("h3", { text: p.was }), el("div", { class: "wer", text: p.wer || "" }),
        el("p", { style: "margin:6px 0 4px", text: p.beschreibung || "" }), p.fachlicher_kern ? el("p", { class: "klein", text: "Fachlich: " + p.fachlicher_kern }) : null]));
    });
    var g = $("gedaechtnisse");
    liste(K.gedaechtnisse).forEach(function (m) {
      g.appendChild(el("div", { class: "gedaechtnis" }, [el("div", { class: "hand", text: m.symbol || "✋" }), el("h3", { text: m.name }),
        el("p", { style: "margin:0 0 6px;font-style:italic", text: m.satz ? "„" + m.satz.replace(/^[„"]|[“"]$/g, "") + "“" : "" }),
        el("p", { class: "klein", style: "color:var(--auf-nacht-2)", text: (m.handzeichen ? "Handzeichen: " + m.handzeichen + ". " : "") + (m.ort ? "Ort: " + m.ort + ". " : "") + (m.beim_antworten ? "Beim Antworten: " + m.beim_antworten + "." : "") }),
        m.fachlich ? el("p", { class: "klein", style: "color:var(--auf-nacht-2);margin:0", text: "Fachlich: " + m.fachlich }) : null]));
    });
  })();

  /* ================= Die neun Spiele ================= */
  function ablaufSkizze(schritte, farbe) {
    schritte = liste(schritte).map(function (x) { return typeof x === "string" ? x : (x.schritt || x.text || x.name || ""); });
    if (!schritte.length) return el("p", { class: "luecke", text: "Für diese Welt ist noch kein Ablauf beschrieben." });
    var spalten = Math.min(4, schritte.length), zeilen = Math.ceil(schritte.length / spalten);
    var W = 920, bw = 196, bh = 92, gx = (W - spalten * bw) / (spalten - 1 || 1), gy = 46, H = zeilen * bh + (zeilen - 1) * gy + 8;
    var s = svg("svg", { class: "ablauf", viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Ablaufskizze: " + schritte.join(", ") });
    var defs = svg("defs", {}, [svg("marker", { id: "pfeil-" + farbe.replace(/[^a-z0-9]/gi, ""), viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, [svg("path", { d: "M0 0 L10 5 L0 10 Z", fill: farbe })])]);
    s.appendChild(defs);
    var pos = schritte.map(function (_, i) {
      var r = Math.floor(i / spalten), c = i % spalten; if (r % 2 === 1) c = spalten - 1 - c;
      return { x: c * (bw + gx), y: 4 + r * (bh + gy) };
    });
    pos.forEach(function (p, i) {
      if (i === 0) return;
      var a = pos[i - 1], gleicheZeile = Math.abs(a.y - p.y) < 1, d;
      if (gleicheZeile) {
        var rechts = p.x > a.x;
        d = "M" + (rechts ? a.x + bw : a.x) + " " + (a.y + bh / 2) + " L" + (rechts ? p.x - 4 : p.x + bw + 4) + " " + (p.y + bh / 2);
      } else d = "M" + (a.x + bw / 2) + " " + (a.y + bh) + " L" + (p.x + bw / 2) + " " + (p.y - 4);
      s.appendChild(svg("path", { d: d, stroke: farbe, "stroke-width": 3, fill: "none", "marker-end": "url(#pfeil-" + farbe.replace(/[^a-z0-9]/gi, "") + ")" }));
    });
    schritte.forEach(function (t, i) {
      var p = pos[i];
      s.appendChild(svg("rect", { x: p.x, y: p.y, width: bw, height: bh, rx: 14, fill: i === schritte.length - 1 ? farbe : "none", "fill-opacity": i === schritte.length - 1 ? .2 : 0, stroke: farbe, "stroke-width": 2.5 }));
      var nr = svg("text", { x: p.x + 12, y: p.y + 22, "font-size": 15, "font-weight": 700, fill: farbe }); nr.textContent = String(i + 1); s.appendChild(nr);
      // Zeilenumbruch von Hand: SVG kennt keinen Fließtext
      var woerter = String(t).split(/\s+/), zeilenT = [], z = "";
      woerter.forEach(function (w) { if ((z + " " + w).trim().length > 24) { zeilenT.push(z.trim()); z = w; } else z += " " + w; });
      if (z.trim()) zeilenT.push(z.trim());
      zeilenT = zeilenT.slice(0, 4);
      zeilenT.forEach(function (zt, j) {
        var tx = svg("text", { x: p.x + bw / 2, y: p.y + bh / 2 + 7 + (j - (zeilenT.length - 1) / 2) * 17, "text-anchor": "middle", "font-size": 14.5, fill: "currentColor" });
        tx.textContent = zt; s.appendChild(tx);
      });
    });
    return s;
  }
  var weltReiter = [];
  function zeigeWelt(id) {
    var w = weltNach[id]; if (!w) return;
    weltReiter.forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.id === id)); b.tabIndex = b.dataset.id === id ? 0 : -1; });
    document.querySelectorAll("#mini-bruecke a").forEach(function (a) { a.classList.toggle("an", a.dataset.welt === id); });
    var t = $("welt-tafel"); t.textContent = "";
    var F = w.farbe || "#f0a830";
    var a = w.analogie || {}, tech = w.technik || {}, vis = w.visuell || {}, qk = w.quirin_kajo || {}, t2 = w.teil2 || {};
    var zuord = el("table", { class: "zuordnung" }, [el("tbody", {}, liste(a.zuordnung).map(function (z) {
      var teile = typeof z === "string" ? z.split(/\s*(?:→|->)\s*/) : [z.spiel || z.bild, z.fach || z.begriff];
      return el("tr", {}, [el("td", { text: teile[0] || "" }), el("td", { text: "↔" }), el("td", { text: teile[1] || "" })]);
    }))]);
    var figuren = el("div", { class: "mitglieder" });
    liste(w.figuren).forEach(function (f) {
      var id = typeof f === "string" ? f : f.id, aufgabe = typeof f === "string" ? "" : f.aufgabe;
      var fig = figurNach[id];
      figuren.appendChild(fig ? el("a", { class: "mitglied", href: "#person-" + id, title: aufgabe || "" }, [gesicht(id, 34), fig.name]) : el("span", { class: "mitglied", text: (f.name || id) }));
    });
    t.appendChild(el("article", { class: "welt", style: "--f:" + F }, [
      el("div", { class: "welt-kopf" }, [
        el("div", {}, [el("h3", { text: w.id + " " + (w.spielname || "") }), el("p", { class: "kapitel", text: (w.kapitel_titel || "") + (w.arcade_vorbild ? ". Vorbild: " + w.arcade_vorbild : "") })]),
        el("span", { class: "bogen-schild", text: w.bogen_name || "" })
      ]),
      el("div", { class: "streit" }, [el("b", { text: "Der Streit: " }), text(w.fehlvorstellung)]),
      figuren,
      el("div", { class: "welt-raster" }, [
        el("div", {}, [
          el("h4", { text: "Was du lernst" }), el("ul", { class: "liste" }, liste(w.lernziele).map(function (l) { return el("li", { text: l }); })),
          el("h4", { text: "So spielt es sich" }), el("p", { text: text(w.kernmechanik) }),
          w.steuerung ? el("p", { class: "klein", text: "Steuerung: " + text(w.steuerung) }) : null,
          w.zahlenbeispiel ? el("p", { class: "klein", text: "Zahlenbeispiel: " + text(w.zahlenbeispiel) }) : null
        ]),
        el("div", {}, [
          el("h4", { text: "Die Analogiebrücke" }),
          kaesten({ vorlesen: a.bild, wirklich: a.was_wirklich_passiert, grenze: a.hier_endet_das_bild }),
          liste(a.zuordnung).length ? zuord : null
        ])
      ]),
      el("h4", { text: "Ablauf" }), ablaufSkizze(w.ablauf, F),
      el("div", { class: "welt-raster" }, [
        el("div", {}, [
          el("h4", { text: "Erfolg und Sterne" }), el("p", { text: text(w.sterne_oder_erfolg) }),
          el("h4", { text: "Wenn etwas schiefgeht" }), el("p", { text: text(w.fehler_und_rueckmeldung) }),
          w.torfrage ? el("p", { class: "klein", text: "Torfrage: " + text(w.torfrage) }) : null
        ]),
        el("div", {}, [
          el("h4", { text: "Technische Umsetzung" }),
          el("p", {}, ["Daten: ", text(tech.datentypen_ein_aus)]),
          el("p", { text: text(tech.regelkern) }),
          tech.tests_pruefung ? el("p", { class: "klein", text: "Prüfung: " + text(tech.tests_pruefung) }) : null,
          tech.umsetzungsstand ? el("p", {}, [el("span", { class: "status", text: text(tech.umsetzungsstand) })]) : null,
          el("h4", { text: "Visuelle Umsetzung" }), el("p", { text: typeof vis === "string" ? vis : text(vis.beschreibung || vis.palette || Object.keys(vis).map(function (k) { return text(vis[k]); }).join(" ")) })
        ])
      ]),
      el("h4", { text: "Quirin und Kajo lernen mit" }),
      el("div", { class: "duo" }, [
        el("div", { class: "k" }, [el("b", { text: "Kajos Formelmoment" }), text(qk.kajo || qk.kajos_formelmoment)]),
        el("div", { class: "q" }, [el("b", { text: "Quirins Gegenprobe" }), text(qk.quirin || qk.quirins_gegenprobe)])
      ]),
      (t2.labor || t2.bauteil) ? el("div", { class: "kasten grenze", style: "margin-top:18px" }, [el("b", { class: "kasten-name", text: "In Teil 2 unter der Brücke" }), [t2.titel, t2.labor, t2.sturm_nebel || t2.sturm || t2.nebel, t2.bauteil ? "Bauteil: " + t2.bauteil : ""].filter(Boolean).map(text).join(" ")]) : null,
      liste(w.luecken_oder_widersprueche).length ? el("details", { style: "margin-top:14px" }, [el("summary", { class: "klein", text: "Offene Punkte in der Planung (" + liste(w.luecken_oder_widersprueche).length + ")" }),
        el("div", {}, liste(w.luecken_oder_widersprueche).map(function (l) { return el("div", { class: "luecke", text: l }); }))]) : null
    ]));
  }
  (function spiele() {
    var reiter = $("welten-reiter");
    liste(K.welten).forEach(function (w, i) {
      var b = el("button", { type: "button", role: "tab", "data-id": w.id, "aria-selected": "false", style: "--f:" + w.farbe, onclick: function () { zeigeWelt(w.id); } }, [w.id + " " + (w.spielname || ""), el("small", { text: w.bezirk || "" })]);
      b.addEventListener("keydown", function (e) {
        var j = weltReiter.indexOf(b);
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = weltReiter[(j + (e.key === "ArrowRight" ? 1 : -1) + weltReiter.length) % weltReiter.length]; n.focus(); zeigeWelt(n.dataset.id); e.preventDefault(); }
      });
      weltReiter.push(b); reiter.appendChild(b);
    });
    if (K.welten && K.welten.length) zeigeWelt(K.welten[0].id);
    var fin = K.finale;
    if (fin) {
      var z = $("finale");
      z.appendChild(el("h3", { text: fin.titel || "Finale" }));
      if (fin.text) z.appendChild(el("p", { class: "lesen", text: text(fin.text) }));
      z.appendChild(kaesten({ vorlesen: fin.vorlesen, wirklich: fin.wirklich, grenze: fin.grenze }, "drei-kaesten"));
    }
  })();

  /* ================= Teil 2 ================= */
  (function tiefe() {
    var T = K.teil2, z = $("tiefe-inhalt"); if (!T) return;
    z.appendChild(el("p", { class: "leitsatz", text: T.einleitung }));
    z.appendChild(el("div", { class: "wetter" }, liste(T.wetter).map(function (w) { return el("div", {}, [el("h3", { style: "margin-top:0", text: w.name }), el("p", { text: w.text }), w.fachlich ? el("p", { class: "klein", text: "Fachlich: " + w.fachlich }) : null]); })));
    if (T.neue_figuren) {
      var m = el("div", { class: "mitglieder" });
      T.neue_figuren.forEach(function (id) { var f = figurNach[id]; if (f) m.appendChild(el("a", { class: "mitglied", href: "#person-" + id, style: "background:var(--nacht-2);border-color:transparent;color:var(--auf-nacht)" }, [gesicht(id, 34), f.name])); });
      z.appendChild(el("h3", { text: "Neue Figuren in der Tiefe" })); z.appendChild(m);
    }
    z.appendChild(el("h3", { text: "Neun Bauteile für das Architekturbuch" }));
    z.appendChild(el("ol", { class: "bauteile" }, liste(T.bauteile).map(function (b) { return el("li", {}, [el("b", { text: b.name }), el("br"), el("span", { class: "klein", style: "color:var(--auf-nacht-2)", text: b.welt + ": " + (b.text || "") })]); })));
    if (T.finale) z.appendChild(kaesten({ vorlesen: T.finale, wirklich: T.finale_wirklich, grenze: T.finale_grenze }, "drei-kaesten"));
  })();

  /* ================= Werkstatt + Fuß ================= */
  (function werkstatt() {
    var W = K.werkstatt || {}, z = $("werkstatt-inhalt");
    if (W.stand) z.appendChild(el("p", { class: "lesen", text: W.stand }));
    if (W.punkte) z.appendChild(el("ul", { class: "liste lesen" }, W.punkte.map(function (p) { return el("li", {}, [el("b", { class: "schild", text: p.name + ": " }), p.text]); })));
    if (W.links) z.appendChild(el("div", { class: "werkzeuge" }, W.links.map(function (l) { return el("a", { class: "werkzeug", href: l.href }, [el("b", { text: l.name }), el("span", { text: l.text })]); })));
    var fuss = $("fuss");
    fuss.appendChild(el("p", { text: K.stand || "" }));
    if (K.quellen) fuss.appendChild(el("p", {}, ["Quellen: "].concat(K.quellen.map(function (q, i) { return el("span", {}, [i ? ", " : "", el("code", { text: q })]); }))));
  })();

  window.zeigeWelt = zeigeWelt;
})();
