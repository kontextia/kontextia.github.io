# Index und Retrieval

**Stadttakt:** „außerhalb“ · **Welt:** L09 Quellenarchipel · **Figuren:** Indra Index (Karteikasten), Ria Retrieval (holt) · **Anschluss:** Indra: Schloss DOC-Schlitz (Einsortieren) → Schlüssel IDX (Suchpaar: Suchperle + Quellenblatt, Dunkelgrün, ●¶); Ria: VEC-Mulde → DOC

## Kurz für Kinder (Teil 1)

Indra ist ein riesiger **Karteikasten**. Jede Karte hat einen Suchhinweis und ein Quellenblatt. Wenn eine Frage kommt, sucht Ria in
Indras Kasten die **ähnlichsten** Karten heraus – die ähnlichsten zuerst – und bringt die Blätter zum Tisch. Ria bringt **immer**
welche, auch wenn keine Karte die Frage beantwortet. **Ähnlich ist nicht passend.** [DE 11.10. Didaktik]

## Genauer (Teil 2)

Ein **Index** ist eine Datenstruktur, die Suchen in vielen Dokumenten schnell macht. **Retrieval** ist das Holen der besten Treffer
zu einer Anfrage, in einer **Rangfolge**.

Zwei Hauptfamilien:

1. **Wortbasierte Suche** (sparse): Ein invertierter Index speichert für jedes Wort, in welchen Dokumenten es vorkommt. Bewertet wird
   z. B. mit **BM25** aus dem probabilistischen Relevanzmodell [Robertson1994][Robertson2009]. Grundideen:
   - Seltene Suchwörter zählen mehr (inverse Dokumenthäufigkeit, „Termspezifität“) [SparckJones1972].
   - Mehr Vorkommen im Dokument zählen mehr, aber mit abnehmendem Zuwachs.
   - Lange Dokumente werden ausgeglichen, damit sie nicht nur wegen ihrer Länge gewinnen.
2. **Vektorsuche** (dense): Dokumentabschnitte werden einmal in Vektoren übersetzt und gespeichert; die Anfrage auch; gesucht werden
   die **nächsten Nachbarn** ([Embedding-Suche](embedding-suche.md)). Dense Passage Retrieval übertraf in seinen Tests ein starkes
   BM25-System um 9 bis 19 Prozentpunkte bei der Top-20-Trefferquote [Karpukhin2020]. Für Milliarden Vektoren braucht man
   Näherungsverfahren wie HNSW-Graphen [Malkov2016] oder GPU-Bibliotheken wie FAISS [Johnson2017].

Kleines Ranking-Beispiel (Wortsuche, Lehrbild): Frage „Brücke Baujahr“.
- Dokument A enthält „Brücke“ 3-mal und „Baujahr“ 1-mal → hoher Rang.
- Dokument B enthält „Brücke“ 5-mal, „Baujahr“ nie → mittel („Brücke“ ist häufig, „Baujahr“ selten und daher wertvoller).
- Dokument C enthält keines → nicht gefunden.

Bei der **Vektorsuche** bekommt dagegen **jedes** Dokument einen Ähnlichkeitswert; zurückgegeben werden die k ähnlichsten – auch
wenn keines die Frage beantwortet. Und auch bei der Wortsuche heißt „hoher Rang“ nur „viele passende Wörter“, nicht „enthält die
Antwort“ [DE 11.10. Didaktik].

Praxisfragen: Wie werden Dokumente in Abschnitte zerlegt? Wie viele Treffer (Top-k) kommen in den Prompt? Was, wenn der Index
veraltet ist? Ein Index ist nur so gut wie sein Inhalt.

## Figur in Kontextia

**Indra Index** (Quellenwächter): dunkelgrüner **Karteikasten mit Suchraster**. Speicherfigur: Einwurf **oben** (DOC-Schlitz zum
Einsortieren), Ausgabe **vorn**: **IDX-Suchpaare** (Kugel und Papierlasche an einem Steg). **Ria Retrieval** nimmt die Suchanfrage in
ihre VEC-Mulde und gibt **DOC-Blätter** aus. Die Gewichte eines Such-Encoders gehören zu einem eigenen Modell, nicht zu Kontextias
Stadtwissen.

## Im Spiel

L09 (Frogger): Quellenblätter treiben auf Bahnen, sortiert nach Rang; Ria wählt. Teil 2: Rangfolge im Index nachrechnen,
Fehlrankings finden (veraltetes Blatt oben).

## Hier endet das Bild

Ein Karteikasten wird von Menschen sorgfältig sortiert. Ein Index sortiert nach **Rechenregeln**: Ähnlichkeit oder Wortgewicht – nicht
nach Wahrheit oder Aktualität.

## Häufige Irrtümer

- „Retrieval findet immer die richtige Antwort.“ – Es findet ähnliche Texte; ob sie stimmen, ist eine andere Frage.
- „Wenn nichts passt, kommt nichts zurück.“ – Eine Vektorsuche liefert immer die k ähnlichsten Treffer [DE 11.10. Didaktik].
- „Vektorsuche ist immer besser als Wortsuche.“ – Kommt auf Aufgabe und Daten an; oft kombiniert man beides.
- „Der Index ist Teil des Sprachmodells.“ – Er liegt außerhalb der Stadtmauer.

## Verwandte Begriffe

[RAG](rag.md) · [Embedding-Suche](embedding-suche.md) · [Grounding und Beleg](grounding-beleg.md) · [Prompt Injection](prompt-injection.md)

## Quellen

[SparckJones1972], [Robertson1994], [Robertson2009], [Karpukhin2020], [Malkov2016], [Johnson2017], [MS-RAG] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
