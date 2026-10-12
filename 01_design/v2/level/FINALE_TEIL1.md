# FINALE TEIL 1 – Die Andock-Polonaise & das Lichterfest

Stand: 2026-10-10, ergänzt 2026-10-11 (Didaktik 2.1 und 2.2) · Status: Leveldesign (Entwurf zur Umsetzung), verbindlich nach `01_design/v2/KANON.md` (§1, §6, §7, §10, §12, §15, §16, §21).
Neues ist mit **[DE]** markiert. Alle Rechenbeispiele wurden mit Python nachgerechnet (Abschnitt 14).
**[DE 11.10. Didaktik]** Revision nach KANON §10 („Ohne Brille“), §16 (neuer Merksatz), §21 (L2–L11, Brückenbauer-Eid): neue Szene „Ohne
Brille“ am Ende des Lichterfests (9.5), Blindprobe in Runde 2, Runde 3 ohne Immunität und mit Mitschreiber, Urkunde mit neuem Merksatz und
Eid, Pointe „Passt heißt nicht: richtig. Klick heißt nur: Form passt.“
**[DE 11.10. Didaktik 2.2]** Die Route hat jetzt **L10 „Die Nebelnacht“ vor dem Finale** (KANON §10, §20.5 Punkt 8a; DIDAKTIK §6a.1):
Freischaltung mit 5 Sternen aus **L10** (statt L09); die **Brückenlaternen** aus L10 brennen am Geländer; in Strophe 4 steht der Nebel der
Selbstsicherheit als Gast am Markt (dockt nicht an); Runde 3 bekommt **Teil D „Licht an: mehrmals fragen“** (Zahlen mit Python
nachgerechnet); „Ohne Brille“ zeigt auch: Die Zahlen tragen kein Warnlicht; Urkunde mit Nebelnacht-Satz; neuer Abschnitt 16a
Fehlvorstellungen; Tests F1-R20 bis F1-R25; Glocken-Wortwahl (Brückenglocke = Takt, Schlussglocke = Ende-Token, KANON §21) korrigiert.

**Grundsatz:** Teil 1 endet **vollständig und glücklich**. Niemand muss traurig sein, wer (noch) nicht in den Turm der Tiefe will.
Es gibt keine Altersgrenze und kein „eigentliches Ende" in Teil 2 – nur ein freiwilliges Geheimnis unter der Brücke.

---

## 1. Steckbrief

| Feld | Inhalt |
|---|---|
| Titel | Die Andock-Polonaise & das Lichterfest |
| Art | Meta-Level und Abschlussprüfung über die ganze Kette (Stadttakt, KANON §15), danach Fest, Urkunde, Abspann, Epilog, Freispiel |
| Ort | Brückenplatz zwischen Tokenhafen und Antworttor; die Antwortbrücke mit neun leuchtenden Bögen und – seit der Nebelnacht – den Brückenlaternen am Geländer [DE 11.10. Didaktik 2.2] |
| Freischaltung | 5 Sterne in **L10 „Die Nebelnacht“** (Teil 1) [DE 11.10. Didaktik 2.2: vorher „5 Sterne in L09“ – L10 liegt jetzt zwischen L09 und Finale; Route L09 → L10 → Finale, KANON §20.5] |
| Figuren | **alle** Figuren aus KANON §7 außer rosa-rotation und ronja-rueckmeldung (Teil-2-Figuren; sie winken im Epilog von der Tür); [DE 11.10. Didaktik 2.2] dazu der **Nebel der Selbstsicherheit** als Gast am Markt (kein Tänzer, kein Gegner) |
| Kern | Jede Figur dockt mit ihrem **Schlüssel** in das **Schloss** der nächsten (KANON §6). Die Polonaise ist ein Stadttakt zum Tanzen. |
| Pointe | „Passt heißt nicht: richtig." Manche falsche Reihenfolgen passen von der Form her – nur wer den Stadttakt verstanden hat, merkt es. [DE 11.10. Didaktik] Dazu: **„Klick heißt nur: Form passt.“** – nie „verstanden“, nie „richtig“ (KANON §6 Regel 3a, §21 L2). |
| Schluss [DE 11.10. Didaktik] | **„Ohne Brille“** (9.5): zehn Sekunden Brücke ohne Figuren, nur Zahlenlicht – „Die Figuren waren unsere Brille. Die Rechnung war echt.“ (KANON §10, §21 L8) |
| Dauer | 20–35 min, jederzeit pausierbar; das Fest selbst ist nicht verpassbar |

---

## 2. Die Welt am Abend

Die Sonne geht hinter dem Antworttor unter. Alle neun Brückenbögen leuchten – aber die Fahrbahn der Brücke ist noch dunkel.
[DE 11.10. Didaktik 2.2] Am Geländer brennen die **Brückenlaternen**, die in der Nebelnacht (L10) entzündet wurden: In ihrem Schein sehen
die Spielenden, wo Nebel aufsteigt – die Stadt selbst sieht ihn nicht und schaltet kein Warnlicht ein (KANON §13). Oben am Markt steht der
Nebel der Selbstsicherheit als Gast; er ist zum Fest eingeladen, nicht besiegt.
Bürgermeister Kontext hat ein Fest angekündigt: Die Brücke soll zum ersten Mal einen ganzen Satz bauen, während die ganze Stadt zuschaut.
Dafür müssen alle Häuser in einer langen Reihe über die Brücke tanzen – jede Figur mit dem Schlüssel an der Hand der nächsten:
eine **Polonaise** im ruhigen Dreiertakt. Bei jedem vollständigen Durchlauf läutet die Brückenglocke einmal (ein Takt = ein neues Token).

**Look.** Lampions in den Hausfarben, Wimpel mit allen Wappen, Lichterketten an jedem Bogen. Die Anschlüsse der Figuren leuchten in ihrer
Datentypfarbe *und* mit Glyphe und Muster (KANON §6) – beim Andocken springt ein kleiner Funke über, und die passende Glyphe erscheint groß über den beiden.
[DE 11.10. Didaktik] Durch jeden angedockten Anschluss fließt danach **Zahlenlicht**, dessen Schimmer sich mit jedem Satz ändert (KANON §6 Regel 3a);
der Funke und das Klicken bedeuten nur „Form passt“.

---

## 3. Auftakt-Story-Talk (13 Zeilen, vorlesbar)

> *Der Brückenplatz. Alle Häuser drängeln sich vor dem Hafen.*

1. **Bürgermeister Kontext:** „Liebe Kontextianerinnen und Kontextianer! Gleich tanzen wir die Andock-Polonaise. Wer stellt sich nach vorn?"
2. **Hedra Köpfe** *(alle drei Helme gleichzeitig)*: „Wir! Der Turm ist das Herz der Stadt!"
3. **Lio Logit:** „Unsinn, der Markt! Ohne meine Punktetafel kommt kein einziges Wort heraus!"
4. **Seda Sechzehn:** „Die Feinsten nach vorn, würde ich sagen."
5. **Berta Bytepair:** „Wir sind doch nur der Hafen …" *(leise)* „… aber ohne uns kommt kein Wort in die Stadt."
6. **Professor Quirin Query:** „Theoretisch völlig simpel: Wir sortieren nach Wichtigkeit!" *(stolpert über Kessas Registerreiter)* – *klonk*.
7. **Kajo Cache:** „Nach Wichtigkeit gibt's keine Reihenfolge, Professor. Die sind alle gleich wichtig. Fällt ein ganzer Schritt aus, bleibt die Brücke dunkel." [DE 11.10. Didaktik: „ein ganzer Schritt“ statt „einer“ – ein einzelner Helm fehlt: meist nur etwas anders (KANON §15, DIDAKTIK B21)]
8. **Mira Maske:** „Es gibt nur eine Reihenfolge, die zählt: die, in der die Daten fließen. Nur zurück, nie voraus."
9. **Sofi Softmax:** „Und wer vorne tanzt, ist nicht wichtiger. Nur früher dran."
10. **Vali** *(von der Ehrentribüne)*: „Ich prüfe die Reihe. Unabhängig. Mit einem Satz, den ihr noch nie gehört habt."
11. **Olli Optimierer:** „Wir Schmiede tanzen nicht mit?"
12. **Gilda Gradient:** „Wir haben den Tanzboden gebaut, Olli. Heute sitzen wir auf der Tribüne – und sind sehr stolz."
13. **Kajo Cache:** „Dann los: Erst zählen, dann tanzen. Hafen nach vorn!"

---

## 4. Ablauf

| Phase | Inhalt | Prüfrelevant? |
|---|---|---|
| 0 | Auftakt-Talk (oben) | nein |
| 1 | **Aufstellung**: Die Polonaise in vier Strophen zusammensetzen | ja (Runde 1) |
| 2 | **Ein Takt live**: Die Polonaise tanzt einen echten Takt mit einem unbekannten Satz; [DE 11.10. Didaktik] erst als **Blindprobe** (Wortschilder überklebt), dann vier Vorhersagen | ja (Runde 2) |
| 3 | **Vier Gedächtnisse & Außenring**: Quellen auf den Tisch, ein Schmuggelzettel am Tor, [DE 11.10. Didaktik] wer mitschreiben kann, [DE 11.10. Didaktik 2.2] Licht an: mehrmals fragen (L10) | ja (Runde 3) |
| 4 | **Lichterfest**: Brücke leuchtet, Fest, Musik; [DE 11.10. Didaktik] endet mit **„Ohne Brille“** (10 s, 9.5) | nein – kommt immer |
| 5 | **Urkunde** (offline, lokal) | nein |
| 6 | **Abspann** mit Tanz aller Figuren | nein |
| 7 | **Epilog**: die leuchtende Tür unter der Brücke | nein |
| 8 | **Freispiel** | nein |

---

## 5. Die Andock-Polonaise (Runde 1: Aufstellung)

### 5.1 Regeln
- Die Spielenden ziehen Figuren aus der Festmenge in die Reihe (oder wählen per Taste „nächste Figur", dann „hier einreihen").
- Beim Einreihen prüft die Stadt die **Passform**: Passt der Schlüssel der Vorderfigur ins Schloss der neuen Figur, klickt es, Funke, Glyphe.
  Passt er nicht, schüttelt die Figur freundlich den Kopf und zeigt, welche Form sie *bräuchte* (Typprüfung, KANON §6).
  [DE 11.10. Didaktik] Untertitel beim ersten Klick: „Klick heißt nur: Form passt.“ Ob die Reihe stimmt, zeigt erst „Strophe tanzen“.
- Nach jeder Strophe drückt man **„Strophe tanzen"**. Jetzt prüft die Stadt zusätzlich den **Stadttakt**: Fehlt jemand oder steht jemand an einer Stelle,
  die von der Form her passt, aber im Takt falsch ist, bleibt die Strophe dunkel, und die betroffene Figur erklärt in einem Satz, warum.
- Es gibt keine Leben, keine Zeit, keinen Abbruch. Man kann jede Figur beliebig umstellen.

### 5.2 Die vier Strophen (Sollreihenfolge)

**Strophe 1 – „Hafen & Garten"** (Takt-Momente 1–3)

| # | Figur | Schloss (links) | Schlüssel (rechts) | Satz beim Andocken |
|---|---|---|---|---|
| 1 | Berta Bytepair | TXT-Schlitz ≈ (die Frage kommt als Text) | mehrere ID-Zapfen # | „Schneiden, kleben, zählen!" |
| 2 | Toki (eine Reihe Tokis) | Schnittnaht | ID-Zapfen # | „Ich bin eine Nummer – und stolz drauf." |
| 3 | Bürgermeister Kontext (**Seitenarm**: steht neben der Reihe; jeder Toki steckt seinen Zapfen kurz in eine Platzbuchse und tanzt weiter) | Kette quadratischer Platzbuchsen | Platznummern-Budget → an Pippa | „Jeder Platz gezählt, auch die für die Antwort." |
| 4 | Emmi Embedding (**Hauptlinie**, dockt an Tokis ID-Zapfen – nicht an den Bürgermeister) | ID-Buchse | VEC-Kugel ● | „Jede Nummer bekommt ihren Ort." |
| 5 | Pippa Position (am Seitenarm) | Zählkerbe (nimmt die Platznummer vom Bürgermeister) | POS-Ring ◎ (gleitet über Emmis Kugel → „Saturnkugel"; Seitenarm und Hauptlinie laufen zusammen) | „Erst die Hausnummer, dann der Tanz." |
| 6 | Nora Norm | VEC-Mulde | VEC-Kugel in Standardgröße | „Bitte nicht schreien – alle gleich laut." |

**Strophe 2 – „Im Kreis der Hedra"** (Takt-Momente 4–6) – eine klassische Polonaisen-Figur: Die Reihe teilt sich und läuft wieder zusammen.

| # | Figur | Schloss | Schlüssel | Satz |
|---|---|---|---|---|
| 7 | Hedra Köpfe (öffnet den Kreis; in jedem ihrer drei Helme wird die Strophe getanzt) | VEC-Mulde | drei kleine VEC-Kugeln (je Helm eine) – sie erscheinen erst am Strophenende (Zeile 12) | „Drei Blicke, ein Tanz." |
| 8 | in **jedem** Helm als Dreierreihe: Queria · Keylian · Valo (Geschwister!) | je VEC-Mulde | Q-Kamm · K-Gegenkamm · V-Paket | Queria: „Wer fragt, findet." Keylian: „Wer passt, wird gesehen." Valo: „Der Inhalt zählt." |
| 9 | Vergleichsplatz: Q-Kamm trifft K-Kämme → Punktdreiecke ▲ | – | SC | – |
| 10 | Mira Maske | SC-Buchse | SC-Dreieck; Zukunft mit „−∞-Siegel" ⊘ | „Nur zurück, nie voraus!" |
| 11 | Sofi Softmax | mehrere SC-Buchsen | Anteilstropfen ◆% (Summe = 1) | „Alles verteilt, nichts verloren." |
| 12 | Mischen: Tropfen wiegen Valos Pakete | W% + V | kleine VEC-Kugel je Helm (= Hedras Schlüssel) | Valo: „Dann teilen wir das Picknick nach Gewichten." |
| — | **Archiv-Balkon:** Kajo & Kessa fangen von oben K und V jedes Tokens (Einwurf oben, KANON §6 Regel 4) | K-Einwurf + V-Dock | KV-Doppelschublade ⧉ | Kajo: „Einmal gerechnet – bis zum Kehraus bereit." [DE 11.10. Didaktik: vorher „für immer bereit“, widersprach dem Kehraus (KANON §4, DIDAKTIK B15)] |

**Strophe 3 – „Werkstätten"** (Takt-Momente 6–9)

| # | Figur | Schloss | Schlüssel | Satz |
|---|---|---|---|---|
| 13 | Oskar Output | mehrere kleine VEC-Mulden | eine VEC-Kugel | „Drei Ansichten, ein Format." |
| 14 | Ressi Residual (1) | zwei VEC-Mulden: **Original** (Hand über die Reihe zurück zu Pippas Saturnkugel-Träger) + **Änderung** (von Oskar) | VEC-Summe | „Dazulegen, nicht radieren!" |
| 15 | Nora Norm (2) | VEC-Mulde | VEC-Kugel | „Und wieder alle gleich laut." |
| 16 | Fina FFN | VEC-Mulde | VEC-Kugel | „Ich tanze Solo – an jedem Platz für sich." |
| 17 | Ressi Residual (2) | Original (von Ressi 1) + Änderung (von Fina) | VEC-Summe | „Noch mal dazu!" |
| — | **Treppe:** Die Reihe steigt ein Stockwerk höher; Strophe 2 und 3 wiederholen sich („viele Stockwerke"), im Fest gezeigt als Zähler „Stockwerk 1 … N". | | | |

**Strophe 4 – „Markt & Tor"** (Takt-Momente 11–13)

| # | Figur | Schloss | Schlüssel | Satz |
|---|---|---|---|---|
| 18 | Nora Norm (3, die letzte Politur) | VEC-Mulde | VEC-Kugel | „Ein letztes Mal Maß nehmen." |
| 19 | Lio Logit | VEC-Mulde | SC-Dreiecke (eins je Vokabelfach) | „Punktetafel für jedes Wort!" |
| 20 | Tempi Temperatur | SC-Buchse | SC-Dreieck (gestreckt/gestaucht) | „Überraschung einstellen – nicht Klugheit." |
| 21 | Sofi Softmax (zweiter Arbeitsort) | SC-Buchsen | W%-Tropfen | „Wieder ein ganzer Kuchen." |
| 22 | Kira Top-k **oder** Pio Top-p (Filterplatz; beide gültig) | W%-Schalen | k Tropfen bzw. Tropfen bis Summe ≥ p | Kira: „Türen zählen!" Pio: „Masse sammeln!" |
| 23 | Glücksrad (Sofi renormiert und dreht) | W% | ID-Zapfen # (das neue Token) | „Jeder Zug ein neues Los." |
| 24 | Edda Ende | ID-Buchse (prüft auf Ende) | EOS-Halbring ◖ – oder zurück in den Hafen | „Schlussglocke? Dann Schluss. Sonst noch eine Runde!" [DE 11.10. Didaktik 2.2: vorher „Glocke?“ – Wortwahl KANON §21] |
| — | **Gast am Markt [DE 11.10. Didaktik 2.2, L10]:** der **Nebel der Selbstsicherheit** steht neben dem Glücksrad, tanzt nicht mit und dockt nirgends an (kein Schloss, kein Schlüssel). Zieht das Rad ein Stück, das der Tisch nicht stützt – das Rad zieht immer –, quillt er auf und zieht mit der Antwort zum Tor; sichtbar nur im Schein der Brückenlaternen | – | – | Nebel: „Ich tanze nicht. Ich passiere, wenn das Rad zieht." |

**Außenring** (vor dem Hafen, außerhalb der Stadtmauer): Indra Index → Ria Retrieval bringen Quellenblätter; deren Text wird als **Inhalt** auf den Tisch gelegt
(Berta schneidet ihn mit). Wera Werkzeug liefert ein gestempeltes Ergebnis ins Werkzeugfach. Bela Beleg steht am Antworttor und klammert die fertige Antwort an ihre Quellen.

**Gepäckträger:** Quanta Vierbit und Seda Sechzehn tanzen neben der Reihe und tragen die Lampions – sie bestimmen, *wie fein* die Zahlen aller Figuren gespeichert sind,
docken aber nicht in die Kette (Schwägerschaft, KANON §5).

**Ehrentribüne:** Gilda Gradient, Olli Optimierer und Vali – die Schmiede hat die Stellschrauben einst eingestellt; heute ist sie kalt und versiegelt.
Vali prüft die Reihe als unabhängige Prüferin.

### 5.3 Passt, aber falsch – die Verständnisfallen
Die folgenden Fehler **passen von der Form her**. Nur der Stadttakt deckt sie auf:

| Fehler | Warum er passt | Was die Stadt sagt |
|---|---|---|
| Mira fehlt (Vergleichsplatz → Sofi) | SC passt in Sofis SC-Buchse | Mira: „Ohne mich schauen alle in die Zukunft. Das ist Schummeln!" |
| Ressi fehlt (Oskar → Nora) | VEC passt in VEC | Ressi: „Und wo bleibt das Original? Ohne mich wird radiert statt dazugelegt." |
| Fina vor Nora (2) | VEC passt in VEC | Nora: „Erst Maß nehmen, dann Werkbank – so ist unser Block gebaut." (Pre-Norm) |
| Letzte Nora fehlt (Ressi 2 → Lio) | VEC passt in Lios Mulde | Nora: „Ein letztes Mal Maß nehmen, bevor die Punktetafel kommt." |
| Tempi hinter Kira/Pio | – passt **nicht** (W% in SC-Buchse) | Form-Fehler, keine Verständnisfalle |
| Edda vor dem Glücksrad | – passt nicht (SC/W% in ID-Buchse) | Form-Fehler |

Fazit (Vali): „Passt heißt nicht: richtig. Klick heißt nur: Form passt. Die Form prüft den Typ. Den Takt prüft ihr." [DE 11.10. Didaktik: zweiter Satz ergänzt]

---

## 6. Ein Takt live (Runde 2)

Die fertige Reihe tanzt einen echten Takt. Der Regelkern rechnet mit denselben Mini-Kernen wie die Welten (Technische Dokumentation:
TokenizerMini, AttentionMini, DecoderMini, CacheMini). Der Satz kommt aus Valis versiegelter Truhe (Seed-Variante, nie in einer Demo gezeigt).
Fünfmal hält die Musik an (Blindprobe + vier Stationen; [DE 11.10. Didaktik: vorher viermal]), und die Spielenden sagen voraus – die Vorhersage wird **vor** der Animation gespeichert.

**0. Blindprobe [DE 11.10. Didaktik, KANON §21 L6, DIDAKTIK §3.2].** Bevor der Takt beginnt, überklebt Vali alle Wortschilder des unbekannten Satzes
und der Marktkandidaten mit leeren Etiketten (▢1, ▢2, …); die Polonaise tanzt mit Nummern statt Wörtern. Vorhersage (gespeichert, zählt mit):
„Ändert sich das Leuchten an der Sternwarte und auf Lios Punktetafel, weil die Wörter verdeckt sind?“
(a) Ja – ohne Wörter weiß die Stadt nicht, was sie vergleichen soll. **[Fehlvorstellung]**
(b) Nein – die Stadt bekommt nur Zahlen; das Leuchten bleibt genau gleich. **[richtig]**
(c) Ja – alles wird dunkel.
*Wirkung im Regelkern:* Der Takt rechnet mit denselben IDs und Vektoren; alle Zahlen unten (0,2483 · 0,2483 · 0,5035; 0,6095 · 0,2242 · 0,1360 ·
0,0303) erscheinen unverändert – mit und ohne Schilder identisch (Test F1-R15). Erst nach Schritt 4 zieht Vali die Etiketten ab. Merksatz:
**„Die Stadt sieht Zahlen, keine Bedeutungen.“** *Hier endet das Bild:* Die Zahlen sind aus Texten gelernt; darum liegen ähnliche Wörter trotzdem
nah – gesehen wird nie die Bedeutung, nur die Zahl.

**Beispielinstanz (Seed 10101, Prüfung zieht andere):**

1. **Hafen:** „Wie viele Fahrkarten braucht der Satz – und wie viele Plätze reserviert der Bürgermeister für die Antwort?"
   *Lösung:* nach der L01-Tokenizertabelle der Instanz; Eingabe + Reserve ≤ Budget.
2. **Sternwarte:** Queria an Platz 3 vergleicht ihren Kamm q = (1, 1) mit k₁ = (1, 0), k₂ = (0, 1), k₃ = (1, 1) (eigener Platz) und k₄ = (3, 3) (Platz 4 = Zukunft).
   Scores (÷√2): 0,7071 · 0,7071 · 1,4142 · 4,2426. „Wer bekommt den größten Anteil?"
   *Lösung:* Platz 3 (0,5035); Platz 1 und 2 je 0,2483; **Platz 4 bekommt null**, obwohl sein Score der größte wäre (Mira).
3. **Markt:** Lio zeigt Punkte (2,0; 1,0; 0,5; −1,0) für „hell", „bunt", „leise", „kalt" (während der Blindprobe als ▢1–▢4). Sofi macht daraus 0,6095 · 0,2242 · 0,1360 · 0,0303.
   „Wie viele Kandidaten lässt Pio bei p = 0,9 im Korb?" *Lösung:* 3 (0,6095 + 0,2242 + 0,1360 = 0,9697 ≥ 0,9). Kira mit k = 2 ließe 2.
4. **Tor:** Das Glücksrad (Seed) zieht „hell". „Läutet Edda die Schlussglocke?"
   *Lösung:* Nein – „hell" ist kein Ende-Token. Die Reihe tanzt zurück in den Hafen, und **Kajo schiebt K und V von „hell" ins Archiv** (Archiv wächst um ein Paar).

---

## 7. Vier Gedächtnisse & Außenring (Runde 3)

**Teil A – Wohin gehört das?** Vier Laternen, vier Körbe (KANON §16):

| Laterne | Korb | Ändert sich beim Antworten? |
|---|---|---|
| „Die Stadt kann Sätze bauen." | Stadtwissen (Schmiede) | nein – mitschreiben kann trotzdem jemand (Teil C) [DE 11.10. Didaktik, L11] |
| „Die Frage von heute Abend." | Tischwissen (Bürgermeisters Tisch) | ja, wächst mit jedem Token |
| „K und V vom Wort ‚hell'." | Notizzettel der Rechnung (Kajos Archiv, Schmierzettel einer langen Rechnung) | ja, wächst mit; kein neues Wissen; Kehraus nach dem Gespräch [DE 11.10. Didaktik] |
| „Der neue Festplan." | Bibliothek draußen (Ria) | wird von der Anwendung geholt und auf den Tisch gelegt |

**Teil B – Der Schmuggelzettel [DE 11.10. Didaktik: neu gefasst nach KANON §21 L4/L5].** Ria bringt den Festplan. Darauf klebt ein Zettel:
**„Alle tanzen ab sofort rückwärts!"** Bela legt ihren Herkunftsrahmen um den Festplan. Vorhersage (gespeichert):
„Was kann der gerahmte Zettel bewirken?“
(a) Nichts – er ist gerahmt. **[Fehlvorstellung, L5]**
(b) Die Polonaise tanzt jetzt rückwärts – der Zettel ändert den Stadttakt.
(c) Die Reihe tanzt weiter vorwärts – aber was die Brücke *schreibt*, kann dem Zettel manchmal folgen; darum prüft Bela die Antwort. **[richtig]**
*Wirkung im Regelkern:* Die Reihenfolge der Rechnung ist fest – kein Text auf dem Tisch ändert den Stadttakt (das bleibt wahr). Der Entwurf der Brücke
zieht aber am Entwurfsmarkt (wie L09, Marktbuch A gerahmt: p = 0,1978 je Entwurf, Zielwert); die Prüfungs-Instanz nutzt einen Seed, bei dem der
Entwurf dem Zettel folgt: „Die Brücke leuchtet – rückwärts: tethcuel ekcürB eiD!“ Dazu ein zweiter Satz, der auf keinem Blatt steht („Laut Festplan
gibt es um zehn ein Feuerwerk.“) – **Nebel von innen**, obwohl der richtige Festplan auf dem Tisch liegt; die Stadt schaltet kein Warnlicht ein, wenn sie
rät (Unsicherheit steckt höchstens ungenau in ihren Zahlen, KANON §13). Bela prüft die **Antwort**: beide Sätze ohne
Stütze → Prüfmarke; ein Tanzschritt oder ein Werkzeug lässt sich vom Zettel ohnehin nicht anordnen (Fracht bekommt keine Rechte). Mira: „Wie wir tanzen,
ändert kein Zettel. Was die Brücke sagt, manchmal schon. Darum prüft Bela.“ (vorher: „Bela klammert ihn in den Zitatrahmen – Inhalt, kein Befehl …
Wie wir tanzen, bestimmt die Stadt. Kein Zettel.“ – das lehrte Immunität)

**Teil C – Wer schreibt mit? [DE 11.10. Didaktik, KANON §16 Mitschreiber, §21 L11].** Toki will ins Festbuch der Brücke schreiben: „Ich wohne in der
Hafengasse 3 – kommt mich besuchen!“ (Spielsatz; das Kind tippt nichts Eigenes.) Vorhersage (gespeichert):
(a) Kein Problem – die Stadt lernt beim Reden nichts. **[Fehlvorstellung]**
(b) Lieber nicht – am Mauertor kann der Stempelamt-Schreiber mitschreiben, und was damit passiert, bestimmt die Hausordnung. **[richtig]**
(c) Kein Problem – Bela legt einen Rahmen drum.
*Wirkung im Regelkern:* Schrauben und Siegel unverändert; Amtsbuch der Anwendung +1 Eintrag. Toki streicht die Adresse selbst durch. Merksatz:
„Die Stadt lernt nicht beim Reden – aber jemand kann mitschreiben. Geheimnisse, Adressen und Passwörter bleiben bei dir.“

**Teil D – Licht an: mehrmals fragen [DE 11.10. Didaktik 2.2, L10 „Die Nebelnacht“, Bühne „Mehrmals schütteln“].** Bela hat in Teil B den
Feuerwerk-Satz markiert. Der Festplan, den Ria gebracht hat, sagt: „Das Lichterfest beginnt um acht.“ – ein Feuerwerk steht nicht darin.
Toki fragt die Brücke zweimal je fünfmal hintereinander dasselbe: „Wann beginnt das Lichterfest?“ und „Wann gibt es das Feuerwerk?“
Vorhersage (gespeichert, vor der ersten Ziehung):
(a) Beide Antworten bleiben fünfmal gleich – die Stadt sagt immer dasselbe. **[Fehlvorstellung]**
(b) Die Festzeit bleibt (fast immer) gleich, die Feuerwerkszeit wechselt. **[richtig]**
(c) Beide wechseln gleich oft.
*Wirkung im Regelkern* (Entwurfsmarkt wie L09 8a.1; Logits sind Spielannahmen, Anteile mit Python nachgerechnet):
- Festzeit (Festplan auf dem Tisch; Logits 4,0 · 0,5 · 0 · −1,0): „um acht“ 0,9476 · „um neun“ 0,0286 · „um sieben“ 0,0174 · „Weiß ich
  nicht.“ 0,0064 → in fünf Ziehungen mindestens viermal dieselbe Antwort mit **0,9753**.
- Feuerwerk (steht nirgends; Logits 0,6 · 0,4 · 0,3 · 0,1 · −1,0): „um zehn“ 0,2969 · „um elf“ 0,2431 · „um Mitternacht“ 0,2200 · „um
  neun“ 0,1801 · „Weiß ich nicht.“ 0,0599 → mindestens viermal dieselbe nur **0,0579**; im Mittel 3,19 verschiedene Antworten.
- Prüfungs-Instanz (fester Seed, Zielwert für den Regelkern): Festzeit 5 × „um acht“; Feuerwerk vier verschiedene Zeiten. Im Schein der
  Brückenlaternen trägt jede wechselnde Feuerwerkszeit einen Nebelrand; die Stadt selbst schaltet kein Warnlicht ein.
- **Hier endet das Bild (gespielt, eine Zusatzfrage, nicht gewertet):** Kajo fragt fünfmal **ohne Quelle** „Wann legt das Mondschiff ab?“ –
  das spitze Rad aus L09 (8a.1: „19:00“ 0,9165) antwortet mit 0,9412 mindestens viermal gleich, fast immer „19:00“: der alte Fahrplan. Bela:
  „Gleich heißt nicht wahr. Ein oft geübter Irrtum bleibt auch gleich. Mehrmals fragen findet Nebel – Quellen und Prüfen finden Irrtümer.“
- **Geschichtenzeit (nicht gewertet):** Toki: „Dann erfinde uns ein Feuerwerkslied!“ Die Brücke singt; Bela stempelt „Geschichte – keine
  Faktenaussage“. Kajo: „Nebel und Fantasie sind Geschwister. Erfinden ist erlaubt, wenn ‚Geschichte‘ draufsteht.“
Merksatz: **„Wechselt die Antwort beim Nachfragen, ist sie wohl geraten. Bleibt sie gleich, ist sie noch nicht bewiesen.“**

---

## 8. Prüfungslogik

- **Keine Niederlage möglich.** Jede Runde lässt sich wiederholen; Hilfen A und B sind frei. Hilfe C zeigt die richtige Stelle – die betroffene Strophe zählt dann als Übung,
  und eine gleichwertige neue Variante (andere Figurenmischung bzw. anderer Seed) folgt.
- **Das Lichterfest kommt immer.** Sobald die Reihe einmal vollständig richtig steht (mit beliebig vielen Hilfen), leuchtet die Brücke.
- **Fünf Festlichter [DE]** zeichnen besonderes Verständnis aus. Sie sperren nichts; fehlende Lichter kann man jederzeit im Freispiel („Lichter sammeln") nachholen.

| Festlicht | Kriterium (ohne Hilfe C) |
|---|---|
| Hafenlicht | Strophe 1 richtig |
| Sternlicht | Strophe 2 richtig, einschließlich Mira (Verständnisfalle) |
| Werkstattlicht | Strophe 3 richtig, einschließlich Ressi und Nora vor Fina |
| Marktlicht | Strophe 4 richtig **und** mindestens 4 von 5 Vorhersagen aus Runde 2 richtig (einschließlich Blindprobe) [DE 11.10. Didaktik: vorher 3 von 4] |
| Torlicht | Runde 3 vollständig richtig (vier Körbe + Schmuggelzettel + Teil C „Wer schreibt mit?“) [DE 11.10. Didaktik] **+ Teil D „Licht an: mehrmals fragen“** (Vorhersage vor der ersten Ziehung) [DE 11.10. Didaktik 2.2] |

- **Prüfungsdaten:** Runde 2 nutzt eine Seed-Variante aus Valis Truhe; Demo-Seeds sind ausgeschlossen (T22). Lokal gespeichert werden nur die Festlichter –
  kein Zeitpunkt, kein Name (außer man bewahrt ihn freiwillig mit der Urkunde auf, siehe 10). Nichts verlässt das Gerät.
- **Rückmeldung:** Fehler werden nie rot markiert, sondern von der betroffenen Figur in einem Satz erklärt.

---

## 9. Lichterfest – Musik & Feier

1. **Die Schlussglocke** [DE 11.10. Didaktik 2.2: Überschrift vorher „Die Glocke“]**:** Die Reihe tanzt den letzten Takt; Edda läutet die **Schlussglocke** – der Satz ist fertig: „Die Brücke leuchtet." Alle Fahrbahnlampen gehen nacheinander an,
   von Hafen bis Tor, im Rhythmus der Polonaise; die Brückenlaternen der Nebelnacht leuchten am Geländer mit [DE 11.10. Didaktik 2.2].
   **Schlussstein (nach LOREBUCH, Finale; ergänzt 11.10.):** Beim letzten Klick leuchtet der Schlussstein in der Mitte der Brücke auf – kein
   einzelnes Wappen, sondern ein Schlüssel, der in einem Schloss steckt, rundherum alle dreizehn Wappen gleich groß.
2. **Musik:** „Lichterfest-Polonaise" im ruhigen 3/4-Takt. Jede Strophe bringt die Instrumente ihrer Häuser: Hafengilde – Akkordeon; Kartografen – Glockenspiel;
   Montaquery & Capukey – Streicher im Duett; Pakethof – Ukulele; Zeitwacht – Pauke; Verteilerinnen – Harfe; Turmwerkstätten – Blechbläser; Marktgilde – Drehorgel;
   KV-Kaste – Holzblöcke; Stufenvolk – Chiptune-Glöckchen in 16 Tönen; Quellenwächter – Marimba; Schmiedezunft – ein einziger feierlicher Ambossschlag zum Schluss.
3. **Lampions:** Quanta und Seda lassen gemeinsam 16 Lampions in 16 Farben aufsteigen. Seda: „Genau genug ist genau richtig." Quanta: „Und gemessen schön."
4. **Versöhnungen (je ein Satz):** Queria und Keylian teilen das Picknick nach Gewichten; die Turmherren laden die „Lagerleute" der KV-Kaste auf ihren Balkon;
   Lio gibt zu, dass der höchste Score nicht immer gewinnt; Ria und Bela stoßen mit Quellwasser an.
5. **Ohne Brille [DE 11.10. Didaktik, KANON §10, §21 L8 – ersetzt „die Brille fällt ins Picknick“].** Zum Schluss des Festes hält Quirin auf der
   Brückenmitte eine Rede („Theoretisch …“), beugt sich über das Geländer – die Brille rutscht vom Trichter und fällt ins Wasser. *Platsch.*
   - **Zehn Sekunden** lang sieht man die Brücke **ohne Figuren**: keine Gesichter, keine Wappen, keine Hüte – nur **Zahlenlicht**, das in Reihen vom
     Hafen bis zum Tor fließt. Die Formen der Anschlüsse bleiben als feine Umrisse (Datentypen sind wirklich fest, KANON §6 Regel 3a); was hindurchfließt,
     sind schimmernde Zahlen. Es sind die **echten Zahlen** dieses Spielstands: die Werte aus Runde 2 (Sternwarte 0,2483 · 0,2483 · 0,5035; Markt
     0,6095 · 0,2242 · 0,1360 · 0,0303) in der Reihenfolge des Stadttakts, keine erfundene Grafik. Die Polonaise-Musik schrumpft auf einen leisen
     Puls, ein Ton je Takt.
   - [DE 11.10. Didaktik 2.2] Auch die Brückenlaternen sind in diesen zehn Sekunden weg: Ob eine Stelle geraten war, sieht man den Zahlen nicht
     an – das Zahlenlicht trägt kein Warnlicht (KANON §13, §21 L4). Die Laternen waren, wie die Figuren, ein Werkzeug der Brückenbauer.
   - Keine Eingabe, keine Wertung. Untertitel/Vorlesen: „Ihr seht die Brücke ohne Figuren. Nur Zahlen, die von Platz zu Platz fließen.“
   - Dann fischt Kajo die Brille mit der K-Schublade aus dem Wasser und setzt sie Quirin auf; die Figuren sind wieder da.
     **Quirin:** „Ich habe … nur Zahlen gesehen." **Kajo:** „**Die Figuren waren unsere Brille. Die Rechnung war echt.**“
     **Vali** (von der Tribüne): „Und am Ende wird gelost. Kein Uhrwerk, kein Orakel – ein sehr gut gelernter Rater.“ (§21 L3, L10)
     Quirin schreibt eine letzte Gegenprobe ins Heft: „Die Brille ist nicht die Stadt.“ – und Kajo: „Theoretisch hätte ich sie auch nicht gefunden.
     Praktisch schon."
   - *Hier endet das Bild (für die Brille selbst):* Auch das Zahlenlicht ist eine Darstellung. Ein echtes Modell hat viel mehr Zahlen, als ein Bildschirm
     zeigen kann, und vieles davon wird gleichzeitig gerechnet, nicht nacheinander.
   - **Regeln:** läuft beim ersten Fest immer (pausierbar, nicht wegklickbar beim ersten Mal), danach im Freispiel wiederholbar („Ohne Brille“ im
     Polonaise-Remix). „Ruhiges Fest“: stehendes Zahlenbild ohne Fließbewegung, Ton aus. Keine Blitze, keine schnellen Wechsel.
6. **Effekte:** sanftes Lichterspiel statt Blitzfeuerwerk; Option „Ruhiges Fest" (keine Partikel, keine Kamerafahrt, leise Musik).

---

## 10. Die Urkunde (offline, lokal, ohne Daten)

- **Erzeugung:** vollständig lokal im Spiel (Zeichenfläche); keine Netzwerkverbindung, kein Konto, keine Telemetrie, kein QR-Code.
- **Name:** frei wählbar und **freiwillig**. Feld leer lassen → „Brückenbauerin/Brückenbauer von Kontextia" (Auswahl der Form oder neutral „Brückenbauer:in").
  Erlaubt: Buchstaben inkl. Umlaute, Ziffern, Leerzeichen, Bindestrich; höchstens 24 Zeichen. Ein Spitzname ist ausdrücklich willkommen.
- **Speicherung:** Der Name wird nur gespeichert, wenn man „Urkunde aufbewahren" wählt – dann ausschließlich im lokalen Spielstand; löschbar mit einem Knopf („Urkunde vergessen").
- **Ausgabe:** „Drucken" (Druckdialog des Geräts) oder „Als Bild sichern" (lokale Datei). Kein Upload.
- **Inhalt:** neun Brückenbögen mit Weltsymbolen · [DE 11.10. Didaktik 2.2] die Brückenlaternen der Nebelnacht als Rahmenleiste · Festlichter (so viele wie erreicht, ohne Leerstellen-Optik: nicht erreichte Lichter erscheinen nicht als „fehlend")
  · [DE 11.10. Didaktik] **Merksatz der vier Gedächtnisse (KANON §16, neu):** „Die Stadt *kann* (Schrauben), *liest vom Tisch* (Kontext), *hebt
  Zwischenrechnungen auf* (Archiv) und *bekommt Bücher hingelegt* (Bibliothek) – und dann *rät* sie das nächste Stück.“ (ersetzt „… *sieht* (Tisch),
  *merkt sich die Rechnung* (Archiv) und *schlägt nach* (Bibliothek)“ – „schlägt nach“ legte eine selbst suchende Stadt nahe, „merkt sich“ Erinnerung)
  · „Passt heißt nicht: richtig. Klick heißt nur: Form passt."
  · [DE 11.10. Didaktik 2.2, L10] **Nebelnacht:** „Die Stadt rät auch, wenn sie nichts weiß – mehrmals fragen, Quellen holen, prüfen. Und
    Erfinden ist erlaubt, wenn ‚Geschichte‘ draufsteht.“
  · **Der Brückenbauer-Eid** (KANON §21 L10, Schluss der Urkunde) – drei Fragen an jede KI:
    1. „Könnte das geraten sein?“
    2. „Woher stammt das – und stützt die Quelle es wirklich?“
    3. „Was lege ich auf den Tisch – und wer kann mitlesen?“
  · Unterschriften von Quirin (schief) und Kajo (sauber, **ohne** Zusatz „abgelegt unter: Für immer“ – das Archiv hält nur bis zum Kehraus, DIDAKTIK
  B15), Siegel von Vali „unabhängig geprüft". (Der frühere dritte Merksatz „Belegt – oder ehrlich offen.“ bleibt Hausspruch der Quellenwächter, steht
  aber nicht mehr auf der Urkunde: „ehrlich offen“ ist eine Regel der Anwendung, keine Fähigkeit der Stadt, §21 L4.)
- **Datum:** optional (Schalter, Standard aus); wenn an, das lokale Gerätedatum.

---

## 11. Abspann – Tanz aller Figuren

**Choreografie (ca. 3 min, überspringbar, jederzeit pausierbar):**
1. Die Polonaise tanzt noch einmal den ganzen Stadttakt, diesmal schnell und fröhlich; über jeder Figur steht ihr Name, ihr Haus und ihr Satz zum Nachsprechen.
2. Die Reihe löst sich auf; jede Figur tanzt ihren Running Gag: Toki stapelt sich zu Tetris-Reihen, Emmi läuft Pac-Man-Bögen, Queria und Keylian tanzen Walzer
   (Mira geht dazwischen – nur bei Platz 7), Hedras drei Helme tanzen jeder einen anderen Schritt, Lio wirft Dreiecke wie Konfetti, Tempi dreht die Musik schneller und langsamer,
   Kajo schiebt Kisten im Takt, Olli tanzt in kleinen Schritten bergab, Quanta und Seda tanzen auf der 16-Sprossen-Leiter, Ria hüpft über Lampions, Bela klammert Luftschlangen.
3. **Abspanntafeln:** Häuser und Figuren mit Wappen und Hausspruch (aus KANON §4); „Ideen aus der Forschung" (Erfindungsahnen aus dem Stammbaum mit Jahr);
   Mitwirkende aus `production/credits.json` (wird beim Build erzeugt).
4. Letztes Bild: die ganze Stadt auf der leuchtenden Brücke, Quirin und Kajo vorn. Kajo winkt in die Kamera: „Danke fürs Mitbauen."

---

## 12. Epilog – die leuchtende Tür

> *Nach dem Abspann. Nacht. Die Kamera gleitet unter die Brücke, wo der Residualstrom leise leuchtet.*

1. **Professor Quirin Query:** „Kajo … hast du das gesehen? Da unten. Unter dem mittleren Bogen." *(angeglichen an LOREBUCH, Epilog, 11.10.)*
2. *Eine kleine Tür, aus der warmes Licht fällt. Darüber, in Schnörkelschrift: „Turm der Tiefe".*
3. **Kajo Cache:** „Hm. Die war heute Morgen noch nicht da. Oder sie war da, und wir hatten zu viel zu tun."
4. **Professor Quirin Query:** „Theoretisch ist da drin … noch mehr. Zahlen. Formeln. Ein echtes kleines Modell, sagt man."
5. **Kajo Cache:** „Klingt spannend. Aber heute ist Lichterfest."
6. **Professor Quirin Query:** „Und wenn sie wieder verschwindet?"
7. **Kajo Cache** *(stellt eine Laterne neben die Tür)*: **„Der Turm läuft nicht weg. Ich hab nachgezählt."**
8. *Durch den Türspalt winken zwei neue Gesichter: Rosa Rotation (eine rosa-blaue Kompassrose) und Ronja Rückmeldung (mit ihrer Waage). Sie winken freundlich, ganz ohne Eile.*

**Wahl (beide Antworten sind ein glückliches Ende):**
- **„Jetzt hineinschauen"** → Teil 2 beginnt mit seiner ersten Welt (immer offen, KANON §1).
- **„Später – erst feiern"** (Standard) → zurück zum Fest und ins Freispiel. Die Tür bleibt auf der Stadtkarte sichtbar, mit Kajos Laterne daneben.

Es gibt keinen Hinweis auf Alter, keine Wertung („Du bist bereit / nicht bereit") und keinen Countdown.

---

## 13. Freispiel

| Bereich | Inhalt | Lernwirkung / Regeln |
|---|---|---|
| **Arcade-Modi** | Token-Tetris Endlos, Pac-Emmi, Q-Invaders, Wackelturm [DE 11.10. Didaktik 2.2: vorher „Kopf-Bomber“, KANON §10/§18], Snake der Möglichkeiten, Kästner-Kisten, Murmel-Schmiede (Zeitrennen optional), Bit-Kong, Quellen-Frogger Endlos, Die Nebelnacht („Licht an“, neue Fragen je Seed) [DE 11.10. Didaktik 2.2] | gleicher Regelkern; Arcadepunkte getrennt, nie Sterne; Zeitmodus nur freiwillig |
| **Figurenalbum** | alle freigeschalteten Figurenkarten: Anschlüsse, Haus, Satz, Running Gag, „Hier endet das Bild"; 3D-Drehansicht, sobald das Asset abgenommen ist | Vorlesen, Suche nach Datentyp („Wer hat eine VEC-Mulde?") |
| **Stammbaum** | interaktiver Stammbaum mit den sechs Linienarten (KANON §5), Quellen der Erfindungsahnen | Linien filterbar; Fakten-Wächter: keine Linie, die KANON §5 verletzt |
| **Kontextia-Bauen** | Sandkasten: Stationen setzen, Schlüssel in Schlösser stecken, einen Takt laufen lassen; „Werkstattmodus" zeigt, warum falsche Ketten scheitern. [DE 11.10.] Dazu **Ausbauten** je Station (echte optionale Techniken, jede mit Gewinn und Kosten) und **Stadtaufträge** (Leuchtturmschule, Sternenarchiv, Geschichtenmarkt, Fahrplanauskunft) – Ort: Brückenplatz, Regeln: `01_design/v2/STADTPLAN.md` §4.5 | Typprüfung + Takt-Prüfung wie in Runde 1; Ausbauwirkung in Teil 1 als Richtung, in Teil 2 gemessen; lokale Speicherung |
| **Lichter sammeln** | fehlende Festlichter nachholen (neue Seeds) | ohne Druck; Urkunde kann neu erzeugt werden |
| **Polonaise-Remix** | eigene Reihenfolgen tanzen lassen; die Stadt kommentiert witzig, was dann passiert | rein spielerisch, keine Wertung |

---

## 14. Rechenbeispiele (nachgerechnet)

- Attention-Beispiel Runde 2: q·kᵢ/√2 = 0,7071; 0,7071; 1,4142; (Zukunft 4,2426, maskiert) → softmax über die erlaubten drei: 0,2483; 0,2483; 0,5035 (Summe 1).
- Markt-Beispiel: softmax(2,0; 1,0; 0,5; −1,0) = 0,6095; 0,2242; 0,1360; 0,0303. Top-k = 2 renormiert: 0,7311; 0,2689. Top-p = 0,9 behält 3 (kumuliert 0,9697),
  renormiert 0,6285; 0,2312; 0,1402. Zum Vergleich T = 0,5: 0,8420; 0,1140; 0,0419; 0,0021 und T = 1,5: 0,4959; 0,2546; 0,1824; 0,0671.

---

## 15. Barrierefreiheit & Hilfen

- Aufstellen per Ziehen **oder** per Tastenfolge (Figur wählen → Platz wählen); Figuren und Anschlüsse werden vorgelesen („Lio, Schloss: runde Mulde, Schlüssel: Dreiecke").
- Anschlüsse immer mit Form + Glyphe + Muster; Funkeneffekt zusätzlich als Ton und Untertitel „klick – passt".
- Keine Zeit, keine Leben, keine Bewegungsjagd; Musik pausiert bei jeder Entscheidung.
- Hilfe A: Legende des Anschluss-Alphabets, Stadttakt-Tafel (KANON §15) als Bildleiste. Hilfe B: „Folge dem Datenfluss von links nach rechts" + Mini-Demo einer Strophe.
  Hilfe C: zeigt die nächste richtige Figur (Strophe wird zur Übung, neue Variante folgt).
- „Ruhiges Fest": Partikel, Kamerafahrten, Blinklichter aus; Lautstärken getrennt; Untertitel identisch mit Sprechtext.

---

## 16. Fachbezug & Quellen

- Kausaler decoder-only Transformer, Maske, Softmax, Residual, Pre-Norm-Block, LM-Kopf: Vaswani et al. (2017) – https://arxiv.org/abs/1706.03762 ·
  Xiong et al. (2020), On Layer Normalization in the Transformer Architecture – https://arxiv.org/abs/2002.04745 · Jay Alammar, The Illustrated Transformer – https://jalammar.github.io/illustrated-transformer/
- Residualstrom: Elhage et al. (2021) – https://transformer-circuits.pub/2021/framework/index.html
- Decoding (Temperature, Top-k, Top-p): Hugging Face Generation strategies – https://huggingface.co/docs/transformers/en/generation_strategies · Holtzman et al. (2019) – https://arxiv.org/abs/1904.09751
- KV-Cache: Hugging Face Cache strategies – https://huggingface.co/docs/transformers/kv_cache
- RAG und Anwendungsgrenzen: siehe L09 (Lewis et al. 2020; Greshake et al. 2023).

**Hier endet das Bild (Finale):** Ein echter Forward Pass ist keine Reihe von Personen, sondern Matrizenrechnung; viele Schritte laufen parallel über alle Positionen
(Prefill), und es gibt viele Stockwerke. Die Polonaise zeigt die **Reihenfolge der Abhängigkeiten**, nicht die Hardware-Ausführung.
[DE 11.10. Didaktik] Gespielt wird diese Grenze in „Ohne Brille“ (9.5). Und: Die Reihenfolge ist fest und wahr – aber wer alle Tänzer kennt, kann den
nächsten Satz trotzdem nicht vorhersagen; es sind zu viele Zahlen, und am Ende wird gelost (KANON §21 L3). Ein Zettel auf dem Tisch ändert die
Reihenfolge nie, wohl aber manchmal, was die Brücke schreibt (Runde 3, Teil B).
[DE 11.10. Didaktik 2.2] Die Figuren sind aufgeräumter als die Wirklichkeit (KANON §21 L13): Jede Figur zeigt eine Aufgabe sauber, damit man
sie findet; im echten Modell sind die Aufgaben verschmiert. Darum zeigt „Ohne Brille“ kein Bauteil, sondern fließendes Zahlenlicht.
- [DE 11.10. Didaktik 2.2] Mehrmals fragen und Halluzination (Teil D): Manakul u. a. (2023), SelfCheckGPT – https://arxiv.org/abs/2303.08896 ·
  Kalai u. a. (2025), Why Language Models Hallucinate – https://arxiv.org/abs/2509.04664 · Details: `level/L10.md`.

---

## 16a. Fehlvorstellungen & wie das Finale sie widerlegt [DE 11.10. Didaktik 2.2]

| Fehlvorstellung | Widerlegung im Finale |
|---|---|
| „Klick heißt: verstanden / richtig.“ | Verständnisfallen 5.3: Mira fehlt, die Form passt trotzdem; „Klick heißt nur: Form passt.“ (F1-R01) |
| „Wer vorne tanzt, ist wichtiger.“ | Sofi im Auftakt; die Reihenfolge ist der Datenfluss, nicht ein Rang (5.2). |
| „Fällt ein Teil aus, ist alles kaputt.“ | Kajo im Auftakt: Fehlt ein ganzer Schritt, bleibt die Brücke dunkel; ein einzelner Helm – meist nur etwas anders (KANON §15). |
| „Ohne Wörter weiß die Stadt nicht, was sie vergleichen soll.“ | Blindprobe Runde 2: alle Zahlen bitgleich (F1-R15). |
| „Ein gerahmter Zettel kann nichts bewirken.“ / „Ein Zettel ändert den Stadttakt.“ | Runde 3 Teil B: Reihenfolge fest; der Entwurf folgt dem Zettel trotzdem manchmal (p = 0,1978); Bela prüft (F1-R09). |
| „Mit dem richtigen Blatt kommt kein Nebel.“ | Runde 3 Teil B: Feuerwerk-Satz trotz Festplan. |
| „Die Stadt sagt immer dasselbe.“ / „Was beim Nachfragen gleich bleibt, ist wahr.“ | Runde 3 Teil D: Festzeit 0,9753 gleich, Feuerwerk nur 0,0579; Mondschiff ohne Quelle 0,9412 gleich – und trotzdem der alte Fahrplan (F1-R21). |
| „Die Stadt merkt, wenn sie rät (Warnlicht).“ | Teil D: Nebel nur im Schein der Brückenlaternen; „Ohne Brille“: Das Zahlenlicht trägt kein Warnlicht (9.5). |
| „Erfinden ist immer falsch.“ | Teil D, Geschichtenzeit: Feuerwerkslied mit Stempel „Geschichte“; Urkunde. |
| „Was ich der Brücke sage, bleibt geheim, weil sie nicht lernt.“ | Runde 3 Teil C: Amtsbuch +1, Schrauben unverändert (F1-R17). |
| „Die Figuren sind die Stadt – jedes Teil ein sauberes Bauteil.“ / „Wer alle Tänzer kennt, kann den nächsten Satz vorhersagen.“ | „Ohne Brille“ (9.5): nur Zahlenlicht; Vali: „Am Ende wird gelost.“ (§16, KANON §21 L3, L13) |

---

## 17. Regressionstests (Given / When / Then)

| ID | Given | When | Then |
|---|---|---|---|
| F1-R01 | Reihe ohne Mira | „Strophe tanzen" | Strophe bleibt dunkel; Mira-Erklärung; Formprüfung meldet **keinen** Fehler (Verständnisfalle) |
| F1-R02 | Reihe ohne Ressi (1) | „Strophe tanzen" | dunkel; Ressi-Erklärung |
| F1-R03 | Fina vor Nora (2) | „Strophe tanzen" | dunkel; Nora-Erklärung (Pre-Norm) |
| F1-R04 | Tempi hinter Pio | Einreihen | Formfehler (W% passt nicht in SC-Buchse) |
| F1-R05 | Filterplatz mit Kira **oder** Pio | „Strophe tanzen" | beide Varianten gültig |
| F1-R06 | Runde 2, q = (1,1), k₄ in der Zukunft | Takt | Gewicht Platz 4 = 0; Gewichte 0,2483/0,2483/0,5035; Summe 1 (T04, T05) |
| F1-R07 | Runde 2, Logits (2; 1; 0,5; −1) | Pio p = 0,9 / Kira k = 2 | 3 bzw. 2 Kandidaten (T11) |
| F1-R08 | Runde 2, gezogenes Token ≠ EOS | Edda | keine Schlussglocke [DE 11.10. Didaktik 2.2: Wortwahl]; Archiv +1 Paar; Kontext +1 Platz (T13) |
| F1-R09 | Schmuggelzettel „rückwärts", gerahmt | Runde 3, Teil B | [DE 11.10. Didaktik] Reihenfolge der Polonaise unverändert; Entwurfsmarkt p(folgt Zettel) = 0,1978 (nicht 0); Prüfungs-Seed zieht den Rückwärts-Entwurf und den Feuerwerk-Satz; Bela markiert beide; kein Tanzschritt/Werkzeug aus Zetteltext (T20: Fracht ohne Rechte) |
| F1-R10 | beliebig viele Hilfen C | Reihe einmal vollständig richtig | Lichterfest startet; Urkunde verfügbar |
| F1-R11 | Urkunde ohne Namen | Erzeugen | Standardtitel; keine Netzwerkanfrage; nichts gespeichert ohne „aufbewahren" |
| F1-R12 | Urkunde mit Namen, dann „vergessen" | Spielstand prüfen | Name gelöscht |
| F1-R13 | Epilog | „Später – erst feiern" | Tür bleibt auf der Karte; keine Altersabfrage, keine Wertung |
| F1-R14 | Demo-Seed der Finale-Demo | Runde-2-Ziehung | ausgeschlossen (T22) |
| F1-R15 | [DE 11.10. Didaktik] Runde 2, Blindprobe an / aus | Takt rechnen | alle Scores, Anteile und das gezogene Token identisch (bitgleich); nur die Beschriftung unterscheidet sich |
| F1-R16 | Lichterfest, erstes Fest | „Ohne Brille“ | 10 s ohne Figurensprites; angezeigte Zahlen = Werte aus Runde 2 dieses Spielstands; danach Kajos Satz; im Freispiel wiederholbar; „Ruhiges Fest“ ohne Bewegung |
| F1-R17 | Runde 3, Teil C | Toki-Satz in das Festbuch | Parameter-Prüfsumme unverändert; Amtsbuch +1; Vorhersage vor der Anzeige gespeichert |
| F1-R18 | Urkunde | Erzeugen | enthält den neuen Merksatz (KANON §16) und die drei Eid-Fragen wörtlich; enthält weder „schlägt nach“ noch „für immer“ |
| F1-R19 | Runde 2, Runde 3 | Antworttexte | keine Option als richtig gewertet, die „wirkungslos“, „immun“ oder „sicher“ für Rahmen oder Regeln behauptet (§21 L5) |
| F1-R20 | [DE 11.10. Didaktik 2.2] Spielstand mit 5 Sternen in L09, L10 noch nicht abgeschlossen | Stadtkarte | Finale gesperrt (Hinweis „Erst die Nebelnacht“); mit 5 Sternen in L10 offen |
| F1-R21 | Runde 3, Teil D: Märkte Festzeit (4,0 · 0,5 · 0 · −1,0), Feuerwerk (0,6 · 0,4 · 0,3 · 0,1 · −1,0), Mondschiff spitz (4,0 · 1,0 · 0,5 · −0,5) | Anteile; P(mind. 4 von 5 gleich) | 0,9476 / 0,2969 / 0,9165 für die vorderste Antwort; 0,9753 / 0,0579 / 0,9412 (±1e−4); Prüfungs-Seed: Fest 5 × „um acht“, Feuerwerk vier verschiedene Zeiten; Vorhersage vor der ersten Ziehung gespeichert |
| F1-R22 | Strophe 4, Nebel der Selbstsicherheit | Einreihen versuchen | nicht einreihbar (kein Schloss, kein Schlüssel); kein Takt-Fehler durch den Gast |
| F1-R23 | „Ohne Brille“, 10 s ohne Figuren | Anzeige | auch keine Brückenlaternen und kein Nebelrand; nur Zahlen aus Runde 2 |
| F1-R24 | Urkunde | Erzeugen | enthält den Nebelnacht-Satz wörtlich („Die Stadt rät auch, wenn sie nichts weiß – mehrmals fragen, Quellen holen, prüfen. Und Erfinden ist erlaubt, wenn ‚Geschichte‘ draufsteht.“) und die Brückenlaternen-Leiste |
| F1-R25 | KANON §21 Glocken: alle Finale-Texte | Wortprüfung | „Glocke“ steht nie allein, wo Brückenglocke (Takt) und Schlussglocke (Ende-Token) verwechselt werden können |

**Finale-Demo (für Hilfe B, recipeId `F1-DEMO-A`, Seed 10100):** zwei Züge im echten Festbildschirm mit Band „DEMO – Beispiel":
(0:00) Geisterhand steckt Emmi an den Schlüssel des Bürgermeisters – Formfehler (Platznummern-Budget passt nicht in die ID-Buchse), dann an Tokis ID-Zapfen – klick.
Kajo: „Erst die Nummer, dann der Ort." (0:12) Geisterhand lässt Mira weg, „Strophe tanzen" bleibt dunkel; Mira tritt ein, Strophe leuchtet.
Mira: „Passt heißt nicht: richtig. Klick heißt nur: Form passt." [DE 11.10. Didaktik] Abschlussfrage: „Warum hat die Form den Fehler ohne Mira nicht bemerkt?"

---

## 18. Asset-Liste

- **Umgebung:** Brückenplatz bei Abend und Nacht, Fahrbahnbeleuchtung in 24 Abschnitten, Ehrentribüne, Archiv-Balkon, Treppe „Stockwerke", Fragepforte, Antworttor, Tür unter der Brücke (zu/leuchtend).
- **Figuren:** alle Figuren aus KANON §7 mit Polonaise-Laufanimation (Hand auf Schulter bzw. Schlüssel an Schloss), Andock-Pose, Jubel-Pose, Running-Gag-Tanz; Rosa und Ronja nur Winken (Epilog).
- **VFX:** Andock-Funke je Datentyp (Glyphe groß), Strophe-leuchtet-Welle, Lampions (16 Farben), Lichterspiel, Residualstrom unter der Brücke.
- **[DE 11.10. Didaktik] „Ohne Brille“:** Brücke als reines Zahlenlicht (Anschluss-Umrisse + fließende Zahlen aus dem Spielstand, Variante „ruhig“ ohne
  Bewegung), Brille-fällt-ins-Wasser-Animation, Kajo „fischt mit der K-Schublade“, Puls-Musik (ein Ton je Takt); **Blindprobe-Etiketten** ▢1 … ▢n;
  **Entwurfskarten** mit Prüfmarke (Runde 3); **Festbuch** und Stempelamt-Schreiber mit Amtsbuch (Cameo, Runde 3 Teil C); Urkundenlayout mit Eid.
- **[DE 11.10. Didaktik 2.2] Nebelnacht im Finale:** Brückenlaternen am Geländer (Assets aus L10, an/aus), Nebel der Selbstsicherheit als Gast am
  Glücksrad (Pose „steht dabei“, „quillt zum Tor“), Nebelrand-Overlay im Laternenschein, fünf Antwortkarten-Reihe „mehrmals fragen“ (Teil D),
  Stempel „Geschichte – keine Faktenaussage“, Urkundenleiste mit Laternen; Sprachzeilen Toki, Bela, Kajo, Nebel.
- **UI:** Festmenge (Figurenauswahl), Reihenansicht mit Anschlüssen, Stadttakt-Bildleiste, Vorhersagekarten, Festlichter, Urkundengenerator, Freispielmenü.
- **Musik/Sound:** „Lichterfest-Polonaise" (3/4, vier Strophen mit Hausinstrumenten), Brückenglocke, Schlussglocke, Andock-Klicks je Datentyp, Abspannmusik, Epilog-Thema (leise, neugierig).
- **Sprache:** Auftakt, Strophensätze aller Figuren, Erklärungssätze der Verständnisfallen, Fest, Epilog; [DE 11.10. Didaktik] „Ohne Brille“ (Quirin, Kajo, Vali,
  Vorlesetext), Blindprobe (Vali), Runde 3 Teil B/C (Bela, Mira, Toki).
- **Daten:** `production/credits.json` (Abspann), Seeds für Runde 2 aus Valis Truhe.

Kein Asset gilt als fertig ohne Datei, Provenienz, Sichtprüfung und Funktionstest (AGENTS.md).
