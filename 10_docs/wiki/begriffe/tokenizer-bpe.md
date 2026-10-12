# Tokenizer und BPE (Byte Pair Encoding)

**Stadttakt:** 1 · **Welt:** L01 Tokenhafen · **Figur:** Berta Bytepair · **Anschluss:** Schloss TXT (welliger Schlitz) → Schlüssel ID (mehrere Nummernzapfen)

## Kurz für Kinder (Teil 1)

Berta ist eine Schere mit einem Regelheft. Im Heft steht, welche Buchstabenpaare oft zusammenkleben – zum Beispiel
„s“ und „c“. Berta klebt immer zuerst das Paar, das ganz oben im Heft steht, dann das nächste. Was übrig bleibt, sind
die Bausteine des Satzes.

## Genauer (Teil 2)

Ein **Tokenizer** verwandelt Text in eine Folge von [Token-IDs](token-id.md). Das häufigste Verfahren ist
**Byte Pair Encoding**. Philip Gage beschrieb BPE 1994 als Kompressionsverfahren: häufige Paare werden schrittweise
durch neue Symbole ersetzt [Gage1994]. Sennrich, Haddow und Birch nutzten die Idee 2016 für Teilwort-Vokabulare in der
neuronalen Übersetzung [Sennrich2016]; seither ist sie Standard [HF-Tokenizer].

**Lernen der Regeln (einmal, vorab):**
1. Starte mit einzelnen Zeichen (bei Byte-Level-BPE mit den 256 möglichen Bytes [Radford2019]).
2. Zähle in einem Übungstext alle benachbarten Paare.
3. Klebe das häufigste Paar zu einem neuen Symbol zusammen und schreibe die Regel ans Ende der Merge-Liste.
4. Wiederhole, bis das [Vokabular](vokabular.md) die gewünschte Größe hat [HF-BPE].

Rechenbeispiel (Lehrtokenizer L01). Übungswörter mit Anzahl: `schnee` ×3, `schnell` ×2, `schnecke` ×2, `tee` ×1.
Im ersten Schritt kommen `s c`, `c h`, `h n` und `n e` je 7-mal vor; bei Gleichstand gewinnt im Spiel das erste Paar
von links. So entstehen nacheinander die Regeln `s+c`, `sc+h`, `sch+n`, `schn+e` (je 7-mal) und `schne+e` (3-mal).

**Anwenden der Regeln (bei jeder Eingabe):** Der Text wird in Zeichen zerlegt, dann werden die Regeln **in ihrer
gelernten Reihenfolge** angewendet. „schneller“ wird zu `schne · l · l · e · r`, „schnee“ zu `schnee`.

Varianten: WordPiece [Schuster2012], SentencePiece, das direkt auf Rohtext arbeitet [Kudo2018]. LLaMA nutzt BPE in der
SentencePiece-Umsetzung und zerlegt Zahlen in einzelne Ziffern [Touvron2023].

## Figur in Kontextia

**Berta Bytepair** (Hafengilde): apricotfarbener Scherenkörper mit zwei stumpfen Backen. Schloss links: **TXT-Schlitz**
für die Textwelle. Schlüssel rechts: **mehrere ID-Zapfen**. Ihre Merge-Liste ist eine gelernte Tabelle – im
[Stammbaum](../../../01_design/v2/STAMMBAUM.md) ihre Patin. Sie wurde durch **Zählen** gelernt, nicht durch Gradienten
in der Lernschmiede.

## Im Spiel

L01 (Tetris): Teil 1 sieht, dass seltene Wörter in mehr Stücke zerfallen. Teil 2 wendet echte Merges in Rangfolge an und
sagt die Tokenzahl vorher, bevor das Stück fällt.

## Hier endet das Bild

Kleberegeln klingen nach Grammatik. Die Regeln wurden aber einmal **aus Daten gelernt** und ändern sich beim Antworten
nicht. Sie kennen keine Bedeutung – nur Häufigkeiten.

## Häufige Irrtümer

- „Der Tokenizer versteht die Wörter.“ – Er zählt und klebt; Bedeutung entsteht erst später im Modell.
- „Der Tokenizer lernt beim Chatten neue Wörter.“ – Nein, Vokabular und Merge-Liste sind fest.
- „BPE wurde für Sprachmodelle erfunden.“ – Ursprünglich war es ein Kompressionsverfahren [Gage1994].
- „Jeder Tokenizer zerlegt gleich.“ – Nein, jedes Modell hat seine eigene Merge-Liste.

## Verwandte Begriffe

[Token](token.md) · [Vokabular](vokabular.md) · [Token-ID](token-id.md) · [Sondertokens](sondertokens.md) ·
[Kontextfenster](kontextfenster.md)

## Quellen

[Gage1994], [Sennrich2016], [Radford2019], [Schuster2012], [Kudo2018], [Touvron2023], [HF-Tokenizer], [HF-BPE] –
vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
