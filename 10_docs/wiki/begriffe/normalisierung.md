# Normalisierung (LayerNorm, RMSNorm)

**Stadttakt:** 3, 8 und 11 · **Welt:** L04 (auch L08) · **Figur:** Nora Norm · **Anschluss:** Schloss VEC-Mulde → Schlüssel VEC-Kugel in Standardgröße

## Kurz für Kinder (Teil 1)

Nora ist ein **Lautstärkeregler**. Wenn eine Perle viel zu laut (zu groß) oder viel zu leise ist, poliert Nora sie auf
Normalmaß. So schreit niemand die anderen nieder, und die nächste Werkstatt kann ordentlich arbeiten.

## Genauer (Teil 2)

Normalisierung bringt die Zahlen eines Vektors auf eine einheitliche Größe. Zwei Varianten sind heute üblich:

**LayerNorm** [Ba2016]: Mittelwert μ und Streuung σ werden über die Komponenten **eines** Vektors berechnet:
`LN(x) = (x − μ) / √(σ² + ε) · γ + β` (γ, β gelernt; ε eine kleine Zahl gegen Division durch null).

**RMSNorm** [Zhang2019]: ohne Mittelwertabzug, nur durch den quadratischen Mittelwert geteilt:
`RMSNorm(x) = x / √(mittel(x²) + ε) · γ`. Zhang und Sennrich argumentieren, dass das Zentrieren verzichtbar ist; RMSNorm
ist einfacher und schneller [Zhang2019].

Rechenbeispiel x = (1; 2; 3; 6), mit γ = 1, β = 0, ε vernachlässigt:
- LayerNorm: μ = 3, σ² = 3,5, σ ≈ 1,871 → **(−1,069; −0,535; 0; 1,604)**
- RMSNorm: √((1 + 4 + 9 + 36)/4) = √12,5 ≈ 3,536 → **(0,283; 0,566; 0,849; 1,697)**

**Wo Nora arbeitet:** Im Pre-Norm-Block vor der Attention (Takt 3) und vor dem FFN (Takt 8), dazu **einmal am Ende** vor
dem LM-Kopf (Takt 11). GPT-2 verschob LayerNorm an den Eingang jedes Teilblocks und fügte eine zusätzliche Norm am Ende
hinzu [Radford2019]; LLaMA nutzt Pre-Norm mit RMSNorm [Touvron2023]. Xiong et al. zeigten, warum Pre-LN stabiler
trainiert [Xiong2020]. Jede Norm hat **eigene** Gewichte γ.

LayerNorm rechnet beim Training und beim Antworten genau gleich, weil sie nur das eine Beispiel betrachtet – anders als
BatchNorm, die über einen Stapel mittelt [Ba2016].

## Figur in Kontextia

**Nora Norm** (Turmwerkstätten): blaugrüner Ringkörper mit **Zahlenlineal**. Schloss **VEC-Mulde**, Schlüssel **VEC-Kugel in
Standardgröße**. Sie tritt mehrfach im Takt auf und erscheint auch in L08, weil gut skalierte Zahlen sich leichter
quantisieren lassen. Patin: ihre Norm-Gewichte γ (bei LayerNorm auch β).

## Im Spiel

L04: Nora hält Maß – ohne sie wachsen die Perlen Stockwerk für Stockwerk (Teil 2: Pre-Norm-Block nachbauen). L08:
Ausreißer im Vektor und ihre Wirkung auf die Stufen.

## Hier endet das Bild

Ein Lautstärkeregler macht alles gleich laut. Nora erhält die **Richtung** und die Unterschiede innerhalb des Vektors;
und durch γ kann das Modell gelernte Komponenten wieder verstärken. Nora **bewertet nicht richtig oder falsch**.

## Häufige Irrtümer

- „Norm prüft Fakten.“ – Nein, sie skaliert Zahlen.
- „LayerNorm und RMSNorm sind identisch.“ – RMSNorm zieht keinen Mittelwert ab.
- „Es gibt eine Norm pro Modell.“ – Es gibt mehrere pro Stockwerk plus eine am Ende.
- „Normalisieren heißt auf Länge 1 bringen.“ – Nicht genau: auf Mittelmaß je Komponente, danach mal γ.

## Verwandte Begriffe

[Transformer-Block](transformer-block.md) · [Residualverbindung](residualverbindung.md) · [Hidden State](hidden-state.md) ·
[LM-Kopf](lm-kopf.md) · [Ausreißer](ausreisser.md) · [Vektor](vektor.md)

## Quellen

[Ba2016], [Zhang2019], [Xiong2020], [Radford2019], [Touvron2023] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
