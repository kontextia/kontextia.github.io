# Optimierer und Lernrate

**Stadttakt:** „Geschichte“ (Training) · **Welt:** L07 Lernschmiede · **Figur:** Olli Optimierer; Ahnenporträts Siggi SGD und Ada Adam · **Anschluss:** Schloss G-Pfeilbuchse → Schlüssel Schraubendreher auf P (Stellschraube, nur in der Schmiede entriegelt)

## Kurz für Kinder (Teil 1)

Olli nimmt Gildas Pfeil und dreht die Stellschrauben **ein kleines Stück in die Gegenrichtung**. Wie groß jeder Schritt ist,
zeigt seine **Lernratenskala**. Zu kleine Schritte: Es dauert ewig. Zu große Schritte: Die Murmel springt über das Tal hinweg.

## Genauer (Teil 2)

Der Optimierer verwandelt Gradienten in **Parameteränderungen**. Die Grundform ist der (stochastische) Gradientenabstieg
[Robbins1951][Goodfellow2016]:

`w ← w − η · g` (g = Gradient des aktuellen Stapels, η = Lernrate)

**Lernrate im Experiment** (L(w) = (w − 3)², Start w = 2, Gradient 2 · (w − 3)):
- η = 0,1: Abstand zum Ziel schrumpft je Schritt um den Faktor 0,8 → 2,2 → 2,36 → … **konvergiert**.
- η = 0,5: ein einziger Schritt landet genau bei 3.
- η = 1,1: Faktor −1,2 → 4,2 → 1,56 → 4,73 … die Murmel **schaukelt sich auf** und divergiert.

Verbesserungen:
- **Schwung (Momentum):** Frühere Schritte fließen mit ein, die Murmel rollt durch kleine Unebenheiten [Polyak1964].
- **Adam:** führt gleitende Mittelwerte des Gradienten (1. Moment) und des quadrierten Gradienten (2. Moment) und gibt so jeder
  Stellschraube eine eigene, angepasste Schrittweite; übliche Voreinstellungen β₁ = 0,9, β₂ = 0,999, ε = 10⁻⁸ [Kingma2014].
- **AdamW:** entkoppelt die Gewichtsabnahme (weight decay) vom Gradientenschritt [Loshchilov2017].

**Lernratenplan:** Häufig steigt die Lernrate zu Beginn an (Warm-up) und fällt dann ab. GPT-1: Adam, Anstieg über 2000 Schritte
auf 2,5 · 10⁻⁴, danach Kosinus-Abfall auf 0 [Radford2018]. Xiong et al. zeigten, dass Post-Norm-Transformer das Warm-up
brauchen, Pre-Norm-Transformer oft nicht [Xiong2020].

Speicherhinweis: Adam merkt sich je Parameter zwei zusätzliche Zahlen; beim Training braucht man deshalb ein Vielfaches des
Modellspeichers. Mixed-Precision-Training hält dazu eine FP32-Hauptkopie der Gewichte [Micikevicius2017].

## Figur in Kontextia

**Olli Optimierer** (Schmiedezunft): indigo rechteckiger **Hebelkörper mit Lernratenskala**. Schloss **G-Pfeilbuchse** (für Gildas
und Ronjas Pfeile), Schlüssel **Schraubendreher auf P**. Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) gehen von Olli die
**Schmiedelinien** zu allen Stellschrauben („Olli hat Emmis Kartenbuch eingestellt – lange vor heute“). In der Ahnengalerie
hängen **Siggi SGD** (Robbins & Monro 1951) und **Ada Adam** (Kingma & Ba 2014).

## Im Spiel

L07 (Marble Madness): Teil 1 – zu große Schritte springen über das Tal; Teil 2 – Lernrate, Schwung, Adam im Vergleich auf echter
Verlustfläche eines Mini-Modells.

## Hier endet das Bild

Ein Schraubendreher dreht eine Schraube. Olli dreht in **einem** Schritt **alle** Milliarden Schrauben gleichzeitig, jede nach
ihrem Pfeil. Und die Schmiede ist beim Antworten kalt: Kein Optimierer läuft während der Inferenz.

## Häufige Irrtümer

- „Größere Lernrate = schneller schlau.“ – Ab einer Grenze divergiert das Training.
- „Adam findet immer das beste Minimum.“ – Er findet ein gutes, kein garantiert bestes.
- „Der Optimierer berechnet die Gradienten.“ – Das macht Backpropagation; der Optimierer nutzt sie.

## Verwandte Begriffe

[Gradient](gradient.md) · [Backpropagation](backpropagation.md) · [Training](training.md) · [Parameter und Gewichte](parameter-gewichte.md) ·
[Fine-tuning](fine-tuning.md)

## Quellen

[Robbins1951], [Polyak1964], [Kingma2014], [Loshchilov2017], [Radford2018], [Xiong2020], [Micikevicius2017], [Goodfellow2016] –
vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
