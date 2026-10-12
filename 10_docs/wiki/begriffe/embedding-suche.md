# Embedding-Suche (Vektorsuche)

**Stadttakt:** „außerhalb“ · **Welt:** L09 Quellenarchipel · **Figuren:** Ria Retrieval (Suchanfrage), Indra Index (Suchpaare) · **Anschluss:** Ria: VEC-Mulde (Suchanfrage); Indra: IDX (Suchperle + Quellenblatt)

## Kurz für Kinder (Teil 1)

Jede Seite in der Bibliothek bekommt einen **Ort auf einer Bedeutungskarte**. Die Frage bekommt auch einen Ort. Ria sucht dann die
Seiten, die auf der Karte **am nächsten** bei der Frage liegen – auch wenn dort ganz andere Wörter stehen. Sie bringt **immer** die
nächsten, auch wenn keine die Frage beantwortet: **Ähnlich ist nicht passend.** [DE 11.10. Didaktik]

## Genauer (Teil 2)

Bei der Embedding-Suche werden Anfrage und Dokumentabschnitte von einem **Encoder** in Vektoren übersetzt; Ähnlichkeit wird als
Skalarprodukt oder Kosinus gemessen [Karpukhin2020][Reimers2019].

- **Dense Passage Retrieval (DPR):** zwei Encoder (für Fragen und für Passagen), Ähnlichkeit per Skalarprodukt; mit wenigen
  Frage-Passage-Paaren trainiert [Karpukhin2020].
- **Sentence-BERT:** Satzvektoren, die sich mit Kosinus vergleichen lassen; das machte Ähnlichkeitssuche über viele Sätze praktisch
  schnell [Reimers2019].

Rechenbeispiel (2 Achsen, Kosinus):
- Frage f = (0,9; 0,1)
- Dokument A = (0,8; 0,3) → cos ≈ **0,97**
- Dokument B = (−0,2; 0,9) → cos ≈ **−0,11**
A kommt auf Platz 1.

Die Dokumentvektoren werden **einmal vorab** berechnet und im Index gespeichert. Bei Millionen bis Milliarden Vektoren wäre ein
Vergleich mit allen zu langsam; man nutzt **näherungsweise Nachbarsuche**, etwa HNSW-Graphen [Malkov2016] oder FAISS auf GPUs
[Johnson2017]. „Näherungsweise“ heißt: Selten wird ein eigentlich passender Treffer übersehen.

**Wichtige Abgrenzung:** Die Suchvektoren stammen meist **nicht** aus Emmis Kartenbuch des Sprachmodells, sondern aus einem
**eigenen** Encoder-Modell mit eigenen Gewichten. Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) ist das ein eigener Pate
(„Gewichte des Such-Encoders“), ohne Schmiedelinie von Kontextias Olli.

Stärken und Schwächen:
- Findet **Bedeutungsähnliches** auch ohne gleiche Wörter („Auto“ ↔ „Fahrzeug“).
- Kann bei **exakten** Begriffen, Namen oder Nummern schwächer sein als Wortsuche; viele Systeme kombinieren beides.
- **Ähnlich ≠ richtig:** Ein Text kann nah an der Frage liegen und trotzdem falsch, veraltet oder manipuliert sein.
- **Immer ein Ergebnis [DE 11.10. Didaktik]:** Die Suche gibt die k nächsten Vektoren zurück, auch wenn alle weit weg sind. Ob
  ein Treffer passt, muss danach geprüft werden (z. B. Schwellenwert in der Anwendung, Belegprüfung).

## Figur in Kontextia

**Ria Retrieval** trägt die Suchanfrage als Perle in ihrer **VEC-Mulde**; **Indra Index** gibt **IDX-Suchpaare** aus – Suchperle und
Quellenblatt an einem gemeinsamen Steg. Die Bedeutungskarte des Archipels ist eine **andere Karte** als Emmis Kartenwald in L02
[DE-Vorschlag: im Spiel mit anderer Farbe gezeichnet].

## Im Spiel

L09 (Frogger): Quellenblätter, die näher an Rias Perle liegen, treiben auf den vorderen Bahnen. Teil 2: Kosinus ausrechnen und ein
täuschend ähnliches, aber falsches Blatt erkennen.

## Hier endet das Bild

Nähe auf der Karte heißt **ähnlich formuliert oder thematisch nah** – nicht „beantwortet die Frage“ und schon gar nicht „wahr“.

## Häufige Irrtümer

- „Suchvektoren sind Emmis Embeddings.“ – In der Regel ein eigenes Modell.
- „Die nächstgelegene Seite enthält die Antwort.“ – Nicht garantiert.
- „Embedding-Suche versteht die Frage.“ – Sie vergleicht Vektoren.

## Verwandte Begriffe

[Index und Retrieval](index-retrieval.md) · [RAG](rag.md) · [Embedding](embedding.md) · [Vektor](vektor.md) ·
[Skalarprodukt und Score](skalarprodukt-score.md) · [Grounding und Beleg](grounding-beleg.md)

## Quellen

[Karpukhin2020], [Reimers2019], [Malkov2016], [Johnson2017], [Lewis2020] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
