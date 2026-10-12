# Softmax

**Stadttakt:** 5 (Sternwarte) und 12 (Markt) · **Welt:** L03 und L05 · **Figur:** Sofi Softmax · **Anschluss:** Schloss: mehrere SC-Buchsen → Schlüssel: W%-Tropfen (Koralle, Summe = 1)

## Kurz für Kinder (Teil 1)

Sofi ist ein **Kuchen, der immer ganz ist**. Sie bekommt Punktdreiecke und schneidet daraus Stücke: viele Punkte – großes
Stück, wenige Punkte – kleines Stück. Kein Stück ist negativ, und alle Stücke zusammen sind genau ein Kuchen.

## Genauer (Teil 2)

Softmax verwandelt eine Liste beliebiger Zahlen z₁ … z_n in Anteile:

`p_i = exp(z_i) / Σ_j exp(z_j)`

Eigenschaften: alle p_i > 0 (bzw. = 0 bei z = −∞), Summe genau 1, Reihenfolge bleibt erhalten.

Rechenbeispiel: z = (2; 1; 0). exp: 7,389 / 2,718 / 1,000; Summe 11,107. Ergebnis **p = (0,665; 0,245; 0,090)**.

Zwei wichtige Eigenschaften:
- **Verschieben ändert nichts:** softmax(z + c) = softmax(z). Deshalb zieht man in der Praxis den größten Wert ab, um
  Überläufe zu vermeiden (z = (2; 1; 0) und (1002; 1001; 1000) geben dasselbe).
- **Skalieren ändert die Schärfe:** softmax(z / T) wird mit kleinem T spitzer, mit großem T flacher – das ist
  [Temperature](temperature.md).

Sofi hat **zwei Arbeitsorte** mit derselben Formel:
1. **Sternwarte:** über die erlaubten Keys einer Query → [Attentiongewichte](attentiongewicht.md) [Vaswani2017].
2. **Markt:** über alle Einträge des Vokabulars → Wahrscheinlichkeiten für das nächste Token [Radford2018].

Herkunft: Den Namen „softmax“ (normalised exponential) prägte John Bridle für Netz-Ausgaben, die Wahrscheinlichkeiten
sein sollen [Bridle1990a][Bridle1990b]. Mathematisch hat sie die Form der Boltzmann-Verteilung `p ∝ exp(−E/(k·T))`
[Boltzmann1868] – deshalb sind Sofi und Tempi in Kontextia Kusine und Vetter. Zusammen mit Cross-Entropy hat Softmax einen
besonders einfachen Gradienten: Ausgabe minus Ziel ([Cross-Entropy-Loss](cross-entropy-loss.md)) [Bridle1990a].

## Figur in Kontextia

**Sofi Softmax** (Verteilerinnen, „Alles verteilt, nichts verloren.“): korallfarbener Kreiskörper mit verteilbaren Speichen –
ihr Körper ist ein Kuchendiagramm, das immer ganz ist. Schloss: **mehrere SC-Buchsen**, Schlüssel: **W%-Tropfen**. Am Markt
dreht sie außerdem das Glücksrad ([Sampling und Seed](sampling-seed.md)). Sie hat keine Stellschrauben: Softmax hat
keine gelernten Parameter.

## Im Spiel

L03: Sofi verteilt das Aufmerksamkeitsbudget, Teil 2 rechnet Exponenten aus. L05 (Snake): Sofis Glücksrad mit
unterschiedlich großen Feldern. Test T05: Jede nichtleere Attentionzeile summiert sich zu eins.

## Hier endet das Bild

Ein großes Kuchenstück ist **keine Wahrheit**, nur ein Gewicht. Und ein Kuchen mit vielen Gästen kann sehr dünn verteilt
sein: Bei 50.000 Kandidaten sind auch „kleine“ Anteile zusammen viel. In der Sternwarte heißt das: **Je voller die Halle,
desto dünner die Stücke** (L03, Abschnitt B′; Rechenbeispiel unter [Attentiongewicht](attentiongewicht.md))
[DE 11.10. Didaktik].

## Häufige Irrtümer

- „Softmax wählt das Maximum.“ – Sie verteilt; das Maximum wählt erst [Greedy](greedy.md).
- „Softmax kann null liefern.“ – Nur für −∞ (maskiert oder gefiltert), sonst immer etwas mehr als null.
- „Prozente vor Softmax.“ – Scores und Logits sind keine Prozente.
- „Softmax wird trainiert.“ – Sie ist eine feste Formel.

## Verwandte Begriffe

[Skalarprodukt und Score](skalarprodukt-score.md) · [Attentiongewicht](attentiongewicht.md) · [Logits](logits.md) ·
[Temperature](temperature.md) · [Cross-Entropy-Loss](cross-entropy-loss.md) · [Sampling und Seed](sampling-seed.md)

## Quellen

[Bridle1990a], [Bridle1990b], [Boltzmann1868], [Vaswani2017], [Radford2018], [HF-Generation] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
