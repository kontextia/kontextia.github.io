# RAG (Retrieval-Augmented Generation)

**Stadttakt:** „außerhalb“ – vor dem ersten Takt · **Welt:** L09 Quellenarchipel (Quellen-Frogger) · **Figuren:** Ria Retrieval, Indra Index, Bela Beleg · **Anschluss:** Ria: VEC-Mulde (Suchanfrage) → DOC-Blätter; Schwägerlinie Ria ═ Prompt

## Kurz für Kinder (Teil 1)

RAG ist eine **Klassenarbeit mit offenem Buch**. Bevor die Stadt antwortet, holt Ria die **ähnlichsten** Seiten aus der
Bibliothek vor der Stadtmauer und legt sie auf den Tisch. Dann rechnet die Stadt mit diesen Seiten auf dem Tisch weiter. Aber
Vorsicht:
- **Ria bringt immer etwas** – auch wenn keine Seite die Frage beantwortet. Ähnlich ist nicht passend; ob eine Seite passt,
  prüft Bela.
- Ein falsches oder veraltetes Buch führt zu einer falschen Antwort.
- Auch mit dem **richtigen** Buch kann die Stadt Unbelegtes dazudichten: Quellen machen den Nebel dünner, nicht weg.

[DE 11.10. Didaktik, KANON §17]

## Genauer (Teil 2)

RAG verbindet ein Sprachmodell mit einer **externen Dokumentsammlung**. Lewis et al. kombinierten ein vortrainiertes Modell
(„parametrisches Gedächtnis“) mit einem dichten Vektorindex über Wikipedia („nicht-parametrisches Gedächtnis“), auf den ein
neuronaler Retriever zugreift [Lewis2020]. In heutigen Anwendungen läuft das meist so ab [MS-RAG]:

1. **Frage** kommt herein.
2. **Retrieval:** Ein Suchverfahren holt die nach seinem Maß ähnlichsten Textabschnitte aus einem [Index](index-retrieval.md) –
   per Wortgewichtung wie BM25 [Robertson2009] oder per [Embedding-Suche](embedding-suche.md) [Karpukhin2020]. Eine
   Vektorsuche liefert dabei **immer** die k nächsten Abschnitte, auch wenn keiner die Frage beantwortet [DE 11.10. Didaktik].
3. **Promptaufbau:** Die Abschnitte werden mit der Frage (und dem [Systemprompt](systemprompt.md)) zu einem Prompt zusammengesetzt.
4. **Generieren:** Das Sprachmodell antwortet auf Grundlage dieses Prompts – im Idealfall mit Belegen ([Grounding](grounding-beleg.md)).

Beispiel-Prompt (verkürzt): „Beantworte nur mit den Quellen. [Quelle 1] Die Brücke von Kontextia wurde im Jahr 12 gebaut. [Quelle 2]
… Frage: Wann wurde die Brücke gebaut?“

Was RAG ist – und was nicht:
- **Kein Training durch das Holen:** Die Gewichte ändern sich nicht; die Dokumente liegen im Kontext („Tischwissen“). Geholt
  werden sie von der **Anwendung**, nicht vom Sprachmodell selbst. (Im Originalpaper wurden Generator und Frage-Encoder vorab
  gemeinsam feinabgestimmt [Lewis2020] – das ist Training **vor** der Nutzung.)
- **Aktualität und Herkunft:** Neues Wissen lässt sich ohne Neutraining einbringen, und man kann Quellen zeigen [Lewis2020].
- **Keine Wahrheitsgarantie:** Falsche Treffer, veraltete Seiten oder Lücken führen weiter zu Fehlern.
- **Ähnlich ≠ passend [DE 11.10. Didaktik]:** Der Retriever bringt die ähnlichsten Abschnitte – ob einer die Frage beantwortet,
  entscheidet er nicht.
- **Auch mit passender Quelle kein Nullrisiko [DE 11.10. Didaktik]:** Retrieval senkt Halluzinationen, beseitigt sie aber
  nicht; das Modell kann Unbelegtes hinzufügen oder Quellen falsch zusammenfügen [Shuster2021].
- **Platz und Position zählen:** Dokumente belegen Plätze im [Kontextfenster](kontextfenster.md); Informationen in der Mitte langer
  Kontexte werden oft schlechter genutzt [Liu2023].
- **Angriffsfläche:** Abgerufene Texte können eingeschmuggelte Anweisungen enthalten ([Prompt Injection](prompt-injection.md))
  [Greshake2023].

## Figur in Kontextia

**Ria Retrieval** (Quellenwächter, außerhalb der Stadtmauer): grüne Brückenfigur mit Quellenkorb; Schloss **VEC-Mulde** für die
Suchanfrage, Schlüssel **DOC-Blätter**. **Indra Index** liefert Suchpaare (IDX), **Bela Beleg** klammert Aussagen an Quellen (BEL).
Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md): Schwägerlinie Ria ═ Prompt (keine Schmiedelinie!) und die **Sperrlinie**
„Dokumenttext nie als Toolrecht“.

## Im Spiel

L09 (Frogger): Ria hüpft über Bahnen treibender Quellenblätter; Injektions-Krokodile lauern. Teil 1: Hol die richtige Quelle.
Abschnitt B′ [DE 11.10. Didaktik]: **„Ria bringt immer etwas“** – auf eine Frage, zu der kein Blatt passt, bringt sie die zwei
ähnlichsten, unpassenden Blätter („Ich bring dir die ähnlichsten – ob eins passt, prüft Bela.“); **„Nebel trotz Quelle“** – auch
mit dem richtigen Blatt steht ein unbelegter Satz im Entwurf. „Ehrlich offen“ ist eine Regel der Anwendung nach Belas Prüfung,
keine Fähigkeit der Stadt. Was ohne Quellen-ID im Strom treibt, ist ein **Gerüchtzettel**. Teil 2: Rangfolge im Index,
Promptaufbau, Grounding ≠ Wahrheit. Test T20: Abgerufener Inhalt wird nie als Toolberechtigung übernommen.

## Hier endet das Bild

Mit offenem Buch liest ein Mensch und versteht. Das Modell **bekommt Text in den Kontext** und rechnet wie immer Wahrscheinlichkeiten –
es kann Quellen auch übersehen, falsch zusammenfügen, ihnen widersprechen oder Unbelegtes dazudichten. Und anders als ein Kind,
das „steht nicht im Buch“ sagt, bringt die Suche **immer** die ähnlichsten Blätter mit. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „RAG trainiert das Modell mit meinen Dokumenten.“ – Nein, sie liegen nur im Prompt.
- „RAG ist ein Layer im Modell.“ – Es gehört zur Anwendung außerhalb der Stadtmauer.
- „Mit Quelle ist alles wahr.“ – Die Quelle kann falsch sein oder die Aussage nicht stützen.
- „Wenn nichts passt, bringt die Suche nichts.“ – Sie bringt immer die ähnlichsten Abschnitte [DE 11.10. Didaktik].
- „Mit dem richtigen Blatt auf dem Tisch ist jede Aussage belegt.“ – Nein, Unbelegtes kann dazukommen [Shuster2021].

## Verwandte Begriffe

[Index und Retrieval](index-retrieval.md) · [Embedding-Suche](embedding-suche.md) · [Grounding und Beleg](grounding-beleg.md) ·
[Halluzination](halluzination.md) · [Prompt Injection](prompt-injection.md) · [Kontextfenster](kontextfenster.md) · [Fine-tuning](fine-tuning.md)

## Quellen

[Lewis2020], [Karpukhin2020], [Robertson2009], [Liu2023], [Greshake2023], [Shuster2021], [MS-RAG] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L09 spielt drei Bildbrüche: ein Frachtbefehl beeinflusst den ungeschützten Entwurf, mit passendem Blatt kommt unbelegter Zusatztext, und Ria bringt auch ohne passende Quelle die ähnlichsten Blätter. Freigabeliste, Schemaprüfung und Bestätigung wirken in der Anwendung. L10 misst außerdem Fälle, in denen ein zweites ähnliches Blatt den Nebel vergrößert. [Schneeball-Fehler](schneeball-fehler.md) und [Gewinn und Preis](gewinn-und-preis.md).
