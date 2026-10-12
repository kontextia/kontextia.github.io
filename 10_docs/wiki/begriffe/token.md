# Token

**Stadttakt:** 1 · **Welt:** L01 Tokenhafen (Token-Tetris) · **Figur:** Toki · **Anschluss:** Schlüssel ID (Nummernzapfen, Bernstein)

## Kurz für Kinder (Teil 1)

Ein Sprachmodell liest nicht Buchstabe für Buchstabe und auch nicht immer Wort für Wort. Es baut Texte aus
**Bausteinen**, wie aus Legosteinen. Ein häufiges Wort ist oft ein einziger Stein, ein seltenes Wort braucht mehrere
kleine Steine. Jeder Baustein heißt **Token**.

## Genauer (Teil 2)

Ein Token ist ein Eintrag aus dem festen [Vokabular](vokabular.md) eines Modells: ein ganzes Wort, ein Wortteil,
ein Satzzeichen, ein einzelnes Byte oder eine [Sondermarke](sondertokens.md). Welche Stücke es gibt, legt der
[Tokenizer](tokenizer-bpe.md) fest, meist per Byte Pair Encoding (BPE) [Sennrich2016]. Jedes Token hat eine
[Token-ID](token-id.md), also eine ganze Zahl.

Spielbeispiel mit dem offenen Lehrtokenizer aus L01: Aus einem kleinen Übungstext hat Berta der Reihe nach die
Kleberegeln `s+c`, `sc+h`, `sch+n`, `schn+e`, `schne+e` gelernt. Dann gilt:

- „schnee“ → **1 Token** (`schnee`)
- „schneller“ → **5 Tokens** (`schne` · `l` · `l` · `e` · `r`)

Das Wort mit mehr Buchstaben, aber ohne passende Regeln, kostet mehr Plätze im
[Kontextfenster](kontextfenster.md). Echte Tokenizer haben zehntausende Regeln; GPT-2 etwa hat ein Vokabular von
50.257 Tokens und arbeitet auf Bytes, sodass jede Zeichenfolge darstellbar ist [Radford2019]. Wie viele Tokens ein
Satz braucht, hängt deshalb vom jeweiligen Tokenizer ab – zwei Modelle können denselben Satz verschieden zerlegen.

Wichtig für alles Weitere: Das Modell rechnet nie mit dem Textstück selbst, sondern mit seiner ID und dem daraus
nachgeschlagenen [Embedding](embedding.md).

## Figur in Kontextia

**Toki** (Hafengilde) ist ein bernsteinfarbener, abgerundeter Würfel mit ID-Marke und Positionsring. Sein Schloss ist
die **Schnittnaht** – er entsteht aus Bertas Schere –, sein Schlüssel der **ID-Zapfen**, der in Emmis ID-Buchse und in
eine Platzbuchse des Bürgermeisters passt. Ab L02 trägt Toki den Bedeutungsrucksack (VEC).

## Im Spiel

L01 „Das Tor der Textbausteine“ (Tetris): Wörter fallen als Tokenstücke in den Schacht; die **Zellenzahl eines
Stücks ist seine Tokenzahl**. Teil 1 lernt: Wörter sind nicht immer ein Token, seltene Wörter brauchen mehr Plätze.
Teil 2 wendet echte Merge-Regeln in Rangfolge an.

## Hier endet das Bild

Legosteine haben feste Formen, die jeder sieht. Die Token-Bausteine dagegen wurden einmal **aus Daten gelernt** und
folgen keinen Silbenregeln: Ein Token kann mitten im Wort beginnen oder ein Leerzeichen enthalten.

## Häufige Irrtümer

- „Ein Wort ist ein Token.“ – Nur manchmal. Häufige Wörter oft ja, seltene Wörter und Namen meist nicht.
- „Tokens sind Silben.“ – Nein, die Grenzen kommen aus Häufigkeiten im Trainingstext, nicht aus der Grammatik.
- „Jedes Modell zählt gleich.“ – Nein, die Tokenzahl hängt vom Tokenizer des Modells ab.
- „Das Modell sieht Buchstaben.“ – Es sieht IDs; Buchstaben stecken höchstens indirekt darin.

## Verwandte Begriffe

[Tokenizer und BPE](tokenizer-bpe.md) · [Vokabular](vokabular.md) · [Token-ID](token-id.md) ·
[Sondertokens](sondertokens.md) · [Kontextfenster](kontextfenster.md) · [Embedding](embedding.md)

## Quellen

[Sennrich2016], [Radford2019], [HF-Tokenizer], [HF-BPE] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
