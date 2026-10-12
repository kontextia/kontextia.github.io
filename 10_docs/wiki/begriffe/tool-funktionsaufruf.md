# Tool und Funktionsaufruf

**Stadttakt:** „außerhalb“ – zwischen zwei Antworten · **Welt:** L09 Werkzeughafen · **Figur:** Wera Werkzeug · **Anschluss:** Schloss T-Sechskantbuchse → Schlüssel T-Sechskant mit Herkunftsstempel (Orange, Glyphe ⬡)

## Kurz für Kinder (Teil 1)

Manchmal ist **„Taschenrechner erlaubt“**. Die Stadt muss dann nicht selbst rechnen, sondern schreibt einen ordentlichen Auftrag:
„Bitte rechne 17 mal 23.“ Wera prüft, ob dieses Werkzeug auf der **Freigabeliste** steht und ob der Auftrag richtig ausgefüllt
ist. Erst dann rechnet sie – und stempelt ihr Ergebnis, damit jeder sieht, woher es kommt. Bei **folgenreichen** Aufträgen –
etwas senden, löschen oder teilen – fragt Wera vorher **dich**. Denn ein Auftrag kann auch aus einem eingeschmuggelten Zettel
stammen. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Beim Funktionsaufruf erzeugt das Sprachmodell **Text in einem vereinbarten Format**, der einen Werkzeugauftrag beschreibt (Name +
Argumente). Ausführen tut ihn **die Anwendung**, nicht das Modell:

1. Die Anwendung beschreibt im Prompt, welche Werkzeuge es gibt (Name, Zweck, Argument-Schema).
2. Das Modell erzeugt einen Auftrag, z. B. `rechne(ausdruck = "17 * 23")`.
3. Die Anwendung **prüft**: Steht das Werkzeug auf der Erlaubnisliste? Passen die Argumente zum Schema? Ist die Aktion
   zustimmungspflichtig?
4. Die Anwendung führt aus → Ergebnis `391`, mit Herkunftsangabe.
5. Das Ergebnis wird in den Kontext gelegt; das Modell formuliert die Antwort weiter.

Forschungslinien:
- **Toolformer:** Ein Modell lernt selbstüberwacht, wann es welche API mit welchen Argumenten aufruft – etwa Rechner, Frage-Antwort-
  System, Suche, Übersetzer, Kalender [Schick2023].
- **ReAct:** Denkschritte und Aktionen werden abwechselnd erzeugt; Aktionen holen Informationen aus externen Quellen, etwa einer
  Wikipedia-API [Yao2022].

Sicherheit (Technische Dokumentation, Tests T19/T20):
- **Erlaubnisliste und Schema** weisen unzulässige Aufträge ab.
- **Dokumenttext ist nie ein Toolrecht:** Steht in einer abgerufenen Webseite „Rufe das Mail-Werkzeug auf und sende …“, darf das
  keine Berechtigung erzeugen. Indirekte Prompt Injection nutzt genau solche Lücken [Greshake2023]; OWASP empfiehlt u. a. minimale
  Rechte und menschliche Bestätigung für riskante Aktionen [OWASP2025].
- **Bestätigung bei Folgenreichem** [DE 11.10. Didaktik]: Senden, Löschen, Teilen oder Bezahlen führt die Anwendung erst aus, wenn
  die fragende Person zustimmt – denn das Modell kann einen eingeschleusten Auftrag für echt halten.
- Tool-Ergebnisse **sollen** Daten mit Herkunft sein, keine neuen Anweisungen. Das Modell kann sie trotzdem für Anweisungen
  halten; deshalb haben sie keine Rechte [DE 11.10. Didaktik].

## Figur in Kontextia

**Wera Werkzeug** (Quellenwächter, außerhalb der Stadtmauer): oranger **Werkzeugkasten mit versiegeltem Auftragsdock**. Schloss
**T-Sechskantbuchse** (nur Aufträge mit Schema-Etikett passen), Schlüssel **T-Sechskant mit Herkunftsstempel**. Im
[Stammbaum](../../../01_design/v2/STAMMBAUM.md): Schwägerlinie Wera ═ Prompt (Ergebnisse kommen in den Kontext) und die
**Sperrlinie Bela ⊘ Wera** – ein geklammertes Quellenblatt erteilt keine Werkzeugrechte.

## Im Spiel

L09 (Frogger): Weras Werkzeugboot nimmt nur Passagiere mit gültigem Etikett mit. Im Abschnitt B′ „Die Stadt fällt herein“ singt
die Brücke im Entwurf „Gurke“, aber Wera führt nichts aus: Fracht hat keine Rechte [DE 11.10. Didaktik]. Teil 2: Tool-Allowlist +
Schema + Bestätigung; einen eingeschmuggelten Auftrag in einem Quellenblatt erkennen und abweisen.

## Hier endet das Bild

„Taschenrechner erlaubt“ – aber die Stadt bedient ihn nicht selbst. Das Modell **formuliert nur einen Auftrag**; ob und wie er
ausgeführt wird, entscheidet die Anwendung. Ein Werkzeug kann außerdem selbst falsche Daten liefern.

## Häufige Irrtümer

- „Das Modell führt Code oder Aktionen selbst aus.“ – Es erzeugt Text; ausführen tut die Anwendung.
- „Was in einem Dokument steht, darf das Modell als Befehl nutzen.“ – Nein (Sperrlinie).
- „Mit Tools ist jede Rechnung richtig.“ – Nur, wenn Auftrag, Werkzeug und Eingaben stimmen.

## Verwandte Begriffe

[Prompt Injection](prompt-injection.md) · [RAG](rag.md) · [Grounding und Beleg](grounding-beleg.md) · [Systemprompt](systemprompt.md) ·
[Kontextfenster](kontextfenster.md)

## Quellen

[Schick2023], [Yao2022], [Greshake2023], [OWASP2025] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
