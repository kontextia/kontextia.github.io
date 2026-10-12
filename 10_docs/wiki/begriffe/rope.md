# RoPE (Rotary Position Embedding)

**Stadttakt:** 4–5 (zwischen Projektion und Vergleich) · **Welt:** L02-T2, L03-T2 · **Figur:** Rosa Rotation [DE, Teil 2] · **Anschluss:** Schloss Q- und K-Kammhalter → Schlüssel gedrehte Kämme

## Kurz für Kinder (Teil 1)

Rosa ist eine drehbare Kompassrose. Sie dreht jeden Frage- und Schlüsselkamm ein Stückchen – je weiter hinten im Satz,
desto mehr. Wenn zwei Kämme verglichen werden, zählt dann vor allem, **wie weit** sie auseinanderstehen.
(Teil 1 lernt Rosa nur als Bild kennen; die Rechnung gehört zu Teil 2.)

## Genauer (Teil 2)

RoPE kodiert die Position nicht durch Addition, sondern durch **Drehung** von [Query](query.md) und [Key](key.md)
[Su2021]. Der Vektor wird in Paare zerlegt; jedes Paar i wird an Position m um den Winkel `m · θ_i` gedreht, mit
`θ_i = 10000^(−2(i−1)/d)` für i = 1 … d/2. Für ein Paar (a, b) heißt Drehen um den Winkel φ:

`(a, b) → (a·cos φ − b·sin φ, a·sin φ + b·cos φ)`

Die wichtige Eigenschaft: Das Skalarprodukt einer gedrehten Query an Position m mit einem gedrehten Key an Position n
hängt nur von der **Differenz m − n** ab (und von q und k selbst). So steckt relative Position im Score, obwohl jede
Position für sich gedreht wurde.

Nachrechenbares Beispiel (ein Paar, θ = 0,3): q = (1; 0,5), k = (0,8; −0,2).

| Query-Position m | Key-Position n | Abstand | Score nach Drehung |
|---|---|---|---|
| 2 | 1 | 1 | 0,4914 |
| 5 | 4 | 1 | 0,4914 |
| 9 | 8 | 1 | 0,4914 |
| 5 | 1 | 4 | −0,3056 |

Gleicher Abstand, gleicher Score – egal wo im Text. Der [Value](value.md) wird **nicht** gedreht; RoPE beeinflusst nur,
*wie stark* verglichen wird, nicht *was* geliefert wird. LLaMA setzt RoPE in jedem Stockwerk ein und verzichtet auf
absolute Positions-Embeddings [Touvron2023]. Weil RoPE keine gelernte Tabelle braucht, hat es keine eigenen Parameter.

Für die Cache-Praxis: K wird meist gedreht abgelegt; KVQuant quantisiert Keys deshalb gezielt **vor** der Drehung
[Hooper2024].

## Figur in Kontextia

**Rosa Rotation** [DE] (Kartografen, Teil 2): rosa-blaue drehbare Kompassrose. Schloss: **Q- und K-Kammhalter**,
Schlüssel: **gedrehte Kämme**. Sie ist Pippas Kollegin im selben Haus, aber keine Nachfolgerin in jedem Modell: RoPE ist
ein *alternatives* Positionsverfahren.

## Im Spiel

L02-T2: Rosa dreht Kämme auf dem Positionspfad; die Spielenden messen, dass gleicher Abstand gleiche Passung gibt.
L03-T2: In der Sternwarte wird mit und ohne Rosa verglichen.

## Hier endet das Bild

Eine Kompassrose dreht einen ganzen Pfeil. RoPE dreht **viele Paare unterschiedlich schnell** gleichzeitig – vorne
schnell, hinten langsam. Ein einzelnes Bild zeigt immer nur ein Paar.

## Häufige Irrtümer

- „RoPE dreht auch V.“ – Nein, nur Q und K.
- „RoPE ist eine gelernte Tabelle.“ – Nein, die Winkel sind fest berechnet.
- „Mit RoPE kann jedes Modell beliebig lange Texte.“ – Die Länge, auf die ein Modell gut verallgemeinert, hängt vom
  Training ab.

## Verwandte Begriffe

[Positionsinformation](positionsinformation.md) · [Query](query.md) · [Key](key.md) ·
[Skalarprodukt und Score](skalarprodukt-score.md) · [KV-Cache](kv-cache.md)

## Quellen

[Su2021], [Touvron2023], [Hooper2024], [Vaswani2017] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
