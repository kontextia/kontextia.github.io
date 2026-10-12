# Query

**Stadttakt:** 4 · **Welt:** L03 Sternwarte (Q-Invaders) · **Figuren:** Queria Query, Professor Quirin Query (Erklärfigur) · **Anschluss:** Schloss VEC-Mulde → Schlüssel Q (Fragekamm/Schlüsselbart, violett)

## Kurz für Kinder (Teil 1)

Queria ist eine **Prägewerkstatt**: Für **jeden** Baustein prägt sie einen eigenen **Fragekamm** – die Zähne mal hoch, mal
tief, je nach den Zahlen in seiner Perle. Auf dem Vergleichsplatz wird dieser Kamm **neben** die Schlüsselkämme aller
erlaubten Bausteine gelegt und Zahn für Zahn verrechnet. Je ähnlicher die Zahnmuster, desto heller das Licht – stufenlos, nie
nur an oder aus. Die Kämme greifen dabei nie ineinander. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Die Query ist eine gelernte Projektion des (normierten) [Hidden States](hidden-state.md) einer Position:

`q_t = Norm(x_t) · W_Q`

W_Q ist eine gelernte Matrix (d × d_k je Kopf). Bei GPT-1 hat jeder der 12 Köpfe d_k = 64 Komponenten
[Radford2018][Vaswani2017]. Q entsteht **gleichzeitig** mit [Key](key.md) und [Value](value.md) aus derselben Darstellung
– die drei sind Geschwister, keine Generationen.

Wofür Q gebraucht wird: Für die Position t wird q_t mit den Keys aller erlaubten Positionen j ≤ t verglichen
([Skalarprodukt und Score](skalarprodukt-score.md)), geteilt durch √d_k, maskiert und mit [Softmax](softmax.md)
verteilt [Vaswani2017].

Quirins Kammprinzip mit 3 Zähnen: q = (1; 2; −1). Gegen drei Schlüsselkämme:

- k₁ = (2; 0; 1): 2 + 0 − 1 = **1**
- k₂ = (1; 1; 0): 1 + 2 + 0 = **3**
- k₃ = (1; 2; 0): 1 + 4 + 0 = **5**

Je ähnlicher die Richtung, desto größer der Score; entgegengesetzte Zähne löschen sich aus.

Beim Generieren mit [KV-Cache](kv-cache.md) wird **nur die Query des neuen Tokens** gebraucht; die Keys und Values der
früheren Positionen kommen aus dem Archiv. Queries werden nicht gespeichert.

## Figur in Kontextia

**Queria Query** (Haus Montaquery): violetter Kegelkörper mit Suchtrichter und Q-Schild. Schloss **VEC-Mulde**, Schlüssel
**Q-Kamm** – nach KANON §6 ein Schlüsselbart mit wenigen dicken Zähnen. Queria ist **kein einzelnes Fragewort**: Sie prägt
für jedes Stück einen eigenen Kamm; was ein Stück trägt, ist ein Gegenstand (Kamm), keine Person [DE 11.10. Didaktik].
**Professor Quirin Query**, ihr Onkel, trägt genau drei Zahlenstäbe = drei Zähne; er erklärt das Prinzip (und malt Formeln
gern auf Kajo). Seine rutschende Brille ist **Quirins Glas** ([Bildbruch](bildbruch-quirins-glas.md)). Patin von Q ist W_Q.

## Im Spiel

L03 (Space Invaders): Queria feuert Fragestrahlen auf die Formation der Schlüssel; die Strahlbreite zeigt das spätere
Gewicht, der Score steht getrennt daneben. Teil 2: Skalarprodukte selbst ausrechnen.

## Hier endet das Bild

„Fragen“ und „Suchen“ sind Metaphern. Eine Query hat **keine Absicht** und weiß nicht, was sie sucht; sie ist ein
gelernter Vektor, dessen Skalarprodukte nützlich sind, weil das Training W_Q so eingestellt hat. Und anders als ein Schlüssel
im Schloss greift der Fragekamm nie in einen anderen Kamm: Er wird daneben gelegt und verrechnet.

## Häufige Irrtümer

- „Q ist die Frage der Nutzerin.“ – Nein, Q ist ein Vektor je Position und Kopf in jedem Stockwerk.
- „Queria ist das Fragewort im Satz, Keylian das Schlüsselwort.“ – Nein, jedes Stück bekommt einen eigenen Fragekamm und
  einen eigenen Schlüsselkamm [DE 11.10. Didaktik].
- „Q und K sind Gegner.“ – Sie sind Geschwister aus derselben Perle.
- „Eine Query passt nur zu einem Key.“ – Sie bekommt zu **allen** erlaubten Keys einen Score.
- „Q wird im Cache gespeichert.“ – Nur K und V werden gespeichert.

## Verwandte Begriffe

[Key](key.md) · [Value](value.md) · [Skalarprodukt und Score](skalarprodukt-score.md) · [Self-Attention](self-attention.md) ·
[Multi-Head-Attention](multi-head-attention.md) · [RoPE](rope.md) · [Bildbruch / Quirins Glas](bildbruch-quirins-glas.md)

## Quellen

[Vaswani2017], [Radford2018], [Bahdanau2014], [Alammar2018] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
