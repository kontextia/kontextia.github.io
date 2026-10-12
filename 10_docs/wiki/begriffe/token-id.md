# Token-ID

**Stadttakt:** 1 · **Welt:** L01 Tokenhafen · **Figur:** Toki (ID-Marke) · **Anschluss:** ID – quadratischer Nummernzapfen mit Zahl (Bernstein, Glyphe #)

## Kurz für Kinder (Teil 1)

Jeder Baustein bekommt eine **Nummer**, wie eine Fahrkarte mit Platznummer. Die Nummer sagt nur, *welcher* Baustein es
ist – nicht, wie wichtig oder wie groß er ist. Mit der Nummer schlägt Emmi in ihrem Kartenbuch nach.

## Genauer (Teil 2)

Eine Token-ID ist eine ganze Zahl von 0 bis V − 1, wobei V die Größe des [Vokabulars](vokabular.md) ist. Bei GPT-2
reicht sie von 0 bis 50.256 [Radford2019]. Der [Tokenizer](tokenizer-bpe.md) liefert für einen Text eine Liste solcher
Zahlen, zum Beispiel (im Lehrtokenizer) „schnee schneller“ → `[412, 7, 389, 50, 50, 21, 33]`. Die konkreten Zahlen
sind hier frei gewählt; entscheidend ist das Prinzip.

Wozu die Zahl dient:

1. **Nachschlagen:** Die ID wählt eine Zeile der Embedding-Tabelle W_E: `e = W_E[id]` [Vaswani2017]. Mathematisch ist
   das dasselbe wie ein „One-hot“-Vektor (eine 1 an Stelle id, sonst 0) mal W_E – nur viel schneller.
2. **Zählen:** Jede ID belegt genau einen Platz im [Kontextfenster](kontextfenster.md).
3. **Ausgeben:** Am Ende des Takts ist das Ergebnis wieder eine ID; erst der Tokenizer macht daraus Text.

Wichtig: IDs sind **Namen, keine Messwerte**. ID 389 ist nicht „ungefähr“ ID 390, und ein Mittelwert zweier IDs hat
keine Bedeutung. Ähnlichkeit zwischen Tokens steckt erst im [Embedding](embedding.md).

## Figur in Kontextia

**Toki** trägt seine ID-Marke sichtbar. Der Schlüssel ist ein **quadratischer Zapfen mit Zahl**; er passt in Emmis
**ID-Buchse** (Nachschlagen) und in eine **Platzbuchse** des Bürgermeisters (Platz im Fenster). Edda Ende hat ebenfalls
eine ID-Buchse: Sie prüft jede neue ID, ob sie das Ende-Zeichen ist.

## Im Spiel

L01: Eine ID-Marke wandert sichtbar auf das Tokenband, die Zahl ist ablesbar (Regressionstest T03: Der Spieltokenizer
liefert exakt die dokumentierten IDs). L02 (Pac-Man): Toki läuft mit seiner Nummer zur Adresse aus Emmis Kartenbuch.

## Hier endet das Bild

Platznummern im Zug liegen nebeneinander, und Nachbarnummern sitzen nebeneinander. Bei Token-IDs bedeuten benachbarte
Zahlen **nichts**. Die Reihenfolge im Satz trägt eine eigene [Positionsinformation](positionsinformation.md), nicht die ID.

## Häufige Irrtümer

- „Große ID = wichtiges Wort.“ – Nein, die Zahl ist nur ein Name.
- „Gleiches Wort, gleiche ID in jedem Modell.“ – Nein, jedes Vokabular nummeriert anders.
- „Die ID ist die Position im Satz.“ – Nein, das ist eine eigene Information.
- „Das Modell rechnet mit der ID-Zahl.“ – Es rechnet mit dem nachgeschlagenen Vektor.

## Verwandte Begriffe

[Token](token.md) · [Vokabular](vokabular.md) · [Tokenizer und BPE](tokenizer-bpe.md) · [Embedding](embedding.md) ·
[Positionsinformation](positionsinformation.md) · [EOS](eos.md)

## Quellen

[Vaswani2017], [Radford2019], [HF-Tokenizer] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
