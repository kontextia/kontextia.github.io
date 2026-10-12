# Gradient

**Stadttakt:** „Geschichte“ (Training) · **Welt:** L07 Lernschmiede · **Figur:** Gilda Gradient · **Anschluss:** Schloss L-Kerbenbuchse → Schlüssel G-Pfeile, einer je Stellschraube (Magenta, Glyphe ↗)

## Kurz für Kinder (Teil 1)

Gilda ist ein **Kompass, der bergauf zeigt** – dorthin, wo der Fehler größer wird. Olli schaut auf Gildas Pfeil und geht
genau in die **andere** Richtung: bergab, wo der Fehler kleiner wird. Für jede Stellschraube der Stadt gibt es so einen
Pfeil.

## Genauer (Teil 2)

Der Gradient eines Verlusts L nach den Parametern w = (w₁, …, w_n) ist der Vektor der partiellen Ableitungen:

`∇L = (∂L/∂w₁, …, ∂L/∂w_n)`

Er zeigt in die Richtung des **steilsten Anstiegs**; seine Komponenten sagen, wie stark L sich ändert, wenn man eine einzelne
Stellschraube ein wenig dreht [Goodfellow2016]. Der Gradientenabstieg geht deshalb in Gegenrichtung:
`w ← w − η · ∇L` mit der Lernrate η ([Optimierer und Lernrate](optimierer-lernrate.md)).

Beispiel mit einer einzigen Stellschraube: L(w) = (w − 3)². Bei w = 2 ist ∂L/∂w = 2 · (2 − 3) = **−2**. Der Pfeil zeigt also
nach „kleiner“ (bergauf geht es zu kleineren w). Olli geht entgegen: mit η = 0,1 wird w = 2 − 0,1 · (−2) = **2,2** – näher am
Minimum bei 3.

In Sprachmodellen hat der Gradient **so viele Komponenten wie das Modell Parameter** – Milliarden. Berechnet wird er nicht
einzeln für jede Stellschraube, sondern effizient mit [Backpropagation](backpropagation.md) [Rumelhart1986].

Weil man nicht alle Trainingsdaten auf einmal nimmt, sondern kleine Stapel, ist jeder Gradient eine **verrauschte Schätzung** –
das ist der stochastische Gradientenabstieg. Seine mathematische Wurzel ist die stochastische Approximation von Robbins und
Monro [Robbins1951].

Praktische Probleme, die Gilda kennt:
- **Zu kleine Gradienten** (z. B. in gesättigten Softmax-Bereichen; deshalb die [Skalierung mit √d](skalierung-wurzel-d.md))
  [Vaswani2017].
- **Zu große Gradienten** zu Trainingsbeginn bei Post-Norm-Blöcken, gemildert durch Pre-Norm [Xiong2020].
- **Unterlauf** sehr kleiner Gradienten in FP16, gemildert durch Loss-Skalierung [Micikevicius2017] oder bfloat16
  [Kalamkar2019].

## Figur in Kontextia

**Gilda Gradient** (Schmiedezunft): magentafarbener **Pfeilkörper mit Komponentenfächern** – ein Fach je Stellschraube. Schloss:
**L-Kerbenbuchse**, Schlüssel: **G-Pfeile** (rot, mit Schraubgewinde), die in Ollis Pfeilbuchse passen (Freundeslinie). Vali darf
ihr keine Kerben geben (Sperrlinie).

## Im Spiel

L07 (Marble Madness): Gilda zeigt bergauf, Olli schreitet bergab. Teil 2: echte Gradienten kleiner Logistik-Modelle, Test T15
(Trainingsschritt nutzt berechneten Gradienten und Lernrate).

## Hier endet das Bild

Ein Kompass zeigt auf einer Landkarte mit zwei Richtungen. Echte Verlustlandschaften haben **Millionen bis Milliarden
Dimensionen**; man kann sie nie ganz sehen. Und der Gradient gilt nur **lokal** – ein Stück weiter kann es anders aussehen.

## Häufige Irrtümer

- „Der Gradient zeigt zum Ziel.“ – Er zeigt bergauf, und nur in der Nähe.
- „Der Gradient ist ein Lichtstrahl mit freier Richtung.“ – Er ist durch Loss und Parameter festgelegt.
- „Beim Antworten werden Gradienten berechnet.“ – Nur im Training.

## Verwandte Begriffe

[Backpropagation](backpropagation.md) · [Optimierer und Lernrate](optimierer-lernrate.md) · [Cross-Entropy-Loss](cross-entropy-loss.md) ·
[Training](training.md) · [Zahlenformate](zahlenformate.md)

## Quellen

[Goodfellow2016], [Rumelhart1986], [Robbins1951], [Vaswani2017], [Xiong2020], [Micikevicius2017], [Kalamkar2019] –
vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
