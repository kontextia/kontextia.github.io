# Transformer-Block (Layer, Stockwerk)

**Stadttakt:** 3–9 (ein Durchgang je Stockwerk) · **Welt:** L04 Die vielköpfige Werkstatt · **Figuren:** Turmwerkstätten (Nora, Hedra, Oskar, Ressi, Fina) und die Sternwarte · **Anschluss:** VEC rein → VEC raus

## Kurz für Kinder (Teil 1)

Der Turm hat viele **Etagen**, und jede ist gleich gebaut: polieren, Gruppenarbeit, dazulegen, polieren, Einzelarbeit,
dazulegen. Dann geht es mit dem Aufzug ein Stockwerk höher. Jede Etage hat aber ihre **eigenen** Stellschrauben.

## Genauer (Teil 2)

Ein Transformer-Block (Layer) besteht aus zwei Teilblöcken mit je einer [Residualverbindung](residualverbindung.md). In der
Pre-Norm-Variante, die Kontextia zeigt [Xiong2020][Radford2019]:

`a = x + MHA(Norm(x))`
`y = a + FFN(Norm(a))`

| Teil | Figur | Mischt Positionen? | Gelernte Parameter (Beispiel GPT-1, d = 768) |
|---|---|---|---|
| Norm vor Attention | Nora | nein | γ, β (je 768) |
| Multi-Head-Attention | Queria, Keylian, Valo, Mira, Sofi, Hedra | **ja** (nur zurück) | W_Q, W_K, W_V: 3 · 768² |
| Outputprojektion | Oskar | nein | W_O: 768² |
| Norm vor FFN | Nora | nein | γ, β |
| FFN | Fina | nein | W₁, W₂: 2 · 768 · 3072 |

Summe der großen Matrizen je Block: 4 · 768² + 2 · 768 · 3072 = 2.359.296 + 4.718.592 = **7.077.888** Gewichte (ohne
Biases und Norm-Gewichte). GPT-1 stapelt **12** solche Blöcke [Radford2018], das 7-Milliarden-Modell von LLaMA **32**
bei Breite 4096 [Touvron2023]. Alle Blöcke haben **denselben Bauplan, aber verschiedene Gewichte**.

Der Original-Transformer war ein Encoder-Decoder mit je 6 Blöcken und Post-LN (`LayerNorm(x + Sublayer(x))`)
[Vaswani2017]. Decoder-only Sprachmodelle verwenden nur den (kausal maskierten) Decoder-Teil ohne Cross-Attention.

Was die Stockwerke **lernen**, ist nur teilweise erforscht. Einige Mechanismen sind gut belegt, etwa Induktionsköpfe, die
über zwei Stockwerke zusammenarbeiten [Olsson2022]; Elhage et al. beschreiben, wie alle Blöcke über den gemeinsamen
Residualstrom kommunizieren [Elhage2021].

## Figur in Kontextia

Der **Turm der Schichten** ist der Ort; jedes Stockwerk hat dieselbe Werkstattbesetzung. Die **Turmwerkstätten**
(„Stockwerk für Stockwerk – nichts geht verloren.“) sind ein bisschen hochnäsig gegenüber „Hafenleuten“ – Humor, keine
Rangordnung.

## Im Spiel

L04 (Bomberman): Teil 1: Mehrere Köpfe, Fina am eigenen Platz, Ressi legt dazu, Nora hält Maß. Teil 2: Pre-Norm-Block aus
Teilen zusammenstecken; der Induktionskreis braucht zwei Stockwerke.

## Hier endet das Bild

Etagen eines Hauses haben feste Zwecke (Küche, Bad). Bei Transformer-Stockwerken gibt es **keine festen Zuständigkeiten**
– welche Etage was „tut“, ist gelernt und nur teilweise verstanden.

## Häufige Irrtümer

- „Alle Stockwerke teilen sich dieselben Gewichte.“ – Nein, jedes hat eigene (bei Standardmodellen).
- „Mehr Stockwerke = automatisch besser.“ – Tiefe hilft oft, kostet aber Rechenzeit und braucht stabiles Training.
- „Ein Block ist nur Attention.“ – Das FFN hat sogar mehr Parameter.

## Verwandte Begriffe

[Self-Attention](self-attention.md) · [Multi-Head-Attention](multi-head-attention.md) · [FFN / MLP](ffn-mlp.md) ·
[Normalisierung](normalisierung.md) · [Residualverbindung](residualverbindung.md) · [Residualstrom](residualstrom.md)

## Quellen

[Vaswani2017], [Radford2018], [Radford2019], [Xiong2020], [Touvron2023], [Olsson2022], [Elhage2021] – vollständige Angaben
in [QUELLEN.md](../QUELLEN.md)
