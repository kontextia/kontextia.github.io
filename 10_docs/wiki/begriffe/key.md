# Key

**Stadttakt:** 4 (und 10: ab ins Archiv) · **Welt:** L03 Sternwarte, L06 Kästnerviertel · **Figur:** Keylian Key · **Anschluss:** Schloss VEC-Mulde → Schlüssel K (Gegenkamm, kupfer)

## Kurz für Kinder (Teil 1)

Keylian ist eine **Prägewerkstatt für Schlüsselkämme**: Jeder Baustein bekommt von ihm einen eigenen. Auf dem
Vergleichsplatz liegt jeder Fragekamm **neben** den Schlüsselkämmen, und Zahn für Zahn wird gerechnet. Zeigen die Zähne in
dieselbe Richtung, leuchtet es hell, sonst schwächer – oder sogar dunkler als neutral. Ineinander greifen die Kämme nie.
[DE 11.10. Didaktik]

## Genauer (Teil 2)

Der Key ist die zweite der drei Geschwister-Projektionen derselben Darstellung:

`k_j = Norm(x_j) · W_K`

Er wird für jede Position j berechnet und mit den Queries späterer (und der eigenen) Positionen verglichen:
`s_tj = q_t · k_j / √d_k` [Vaswani2017]. Der Key bestimmt also, **wie stark** Position j beachtet wird – aber nicht,
**was** von ihr übergeben wird; das liefert der [Value](value.md).

Beispiel: Query q = (1; 2; −1). Ändert man nur den Key von k = (1; 1; 0) zu k = (−1; 1; 0), sinkt der Score von 3 auf 1.
Der übergebene Inhalt (das Value-Paket) bleibt derselbe, nur sein Anteil ändert sich.

Weil Keys früherer Positionen sich beim Generieren nicht mehr ändern (kausale Maske), kann man sie speichern: Sie
wandern in den [KV-Cache](kv-cache.md) und werden bei jedem neuen Token wieder gelesen [HF-KVCache]. Varianten sparen
hier Speicher: Bei Multi-Query-Attention teilen sich alle Köpfe einen Key/Value [Shazeer2019], bei Grouped-Query-Attention
teilen sich Gruppen von Köpfen einen [Ainslie2023].

## Figur in Kontextia

**Keylian Key** (Haus Capukey, „Wer passt, wird gesehen.“): kupferfarbener Zylinder mit veränderlichem Merkmalskamm und
K-Schild. Schloss **VEC-Mulde**, Schlüssel **K-Gegenkamm**. Pate ist W_K („O Keylian, warum bist du ein Key?“ – „Weil mich
W_K so projiziert hat!“). Seine Kämme wirft er oben in Kajos **K-Einwurf** (Freundeslinie zum Archiv).

## Im Spiel

L03 (Space Invaders): Die Formation der Schlüssel; der Balkon an Hausnummer 7 liegt in der Zukunft und ist für Queria an
Hausnummer 4 gesperrt (Mira). L06 (Sokoban): K-Kisten werden ins Archivregal geschoben.

## Hier endet das Bild

Ein Key ist **kein Passwort** und kein Türschlüssel, der ganz oder gar nicht passt. Anders als Schloss und Schlüssel im
Anschluss-Alphabet (dort zeigt die Form nur den Datentyp) greifen K- und Q-Kamm nie ineinander. Die Passung ist **stufenlos**
(ein Score, auch negativ), und ein Key enthält nicht die Information, die weitergegeben wird. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Der Key ist der Inhalt.“ – Nein, der Inhalt kommt aus V.
- „K stammt von Q ab.“ – Nein, beide entstehen parallel aus Norm(x).
- „Der Key passt oder passt nicht.“ – Der Score ist eine Zahl, jede Höhe ist möglich.
- „Gespeicherte Keys sind Wissen.“ – Sie sind Zwischenergebnisse dieser einen Rechnung.

## Verwandte Begriffe

[Query](query.md) · [Value](value.md) · [Skalarprodukt und Score](skalarprodukt-score.md) · [KV-Cache](kv-cache.md) ·
[Kausale Maske](kausale-maske.md) · [RoPE](rope.md)

## Quellen

[Vaswani2017], [Shazeer2019], [Ainslie2023], [HF-KVCache] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
