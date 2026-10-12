# Vektor

**Stadttakt:** ab 2 in jedem Moment · **Welt:** L02 (Teil 2: Vektorlabor), überall im Turm · **Figur:** die Bedeutungsperle (Emmis Schlüssel), Quirins drei Zahlenstäbe · **Anschluss:** VEC – Kugel (Opal) als Schlüssel, halbrunde Mulde als Schloss

## Kurz für Kinder (Teil 1)

Ein Vektor ist eine **Liste von Zahlen**, die zusammengehören – wie die Koordinaten eines Ortes auf einer Schatzkarte.
Quirin trägt einen kleinen Vektor mit sich herum: seine drei schwebenden Zahlenstäbe. Mit Vektoren kann man rechnen:
addieren, vergleichen, verschieben.

## Genauer (Teil 2)

Ein Vektor der Länge d ist ein geordnetes Tupel `x = (x₁, x₂, …, x_d)`. In Sprachmodellen ist d die **Modellbreite**:
768 bei GPT-1 [Radford2018], 4096 beim 7-Milliarden-Modell von LLaMA [Touvron2023]. Fast alles, was im Turm fließt –
[Embedding](embedding.md), [Hidden State](hidden-state.md), [Query](query.md), [Key](key.md), [Value](value.md) – ist
ein Vektor (bzw. viele Vektoren, einer pro Position).

Die wichtigsten Rechnungen mit Quirins Vektor q = (1; 2; −1):

- **Addition** (komponentenweise): q + (0; 1; 1) = (1; 3; 0). So arbeitet die
  [Residualverbindung](residualverbindung.md).
- **Skalarprodukt:** q · k = Σ qᵢ·kᵢ. Mit k = (1; 2; 0): 1 + 4 + 0 = **5**. Das ist der Kern der
  [Attention-Scores](skalarprodukt-score.md).
- **Länge (Norm):** ‖q‖ = √(1 + 4 + 1) = √6 ≈ 2,45. [Normalisierung](normalisierung.md) bringt Längen auf ein
  Standardmaß.
- **Kosinus-Ähnlichkeit:** (q · k) / (‖q‖·‖k‖) = 5 / (2,45 · 2,24) ≈ 0,91 – die Richtungen sind sehr ähnlich.
- **Matrix mal Vektor:** Eine Gewichtsmatrix W macht aus einem Vektor einen neuen, z. B. `q = x · W_Q`. So entstehen
  aus einer Darstellung mehrere „Ansichten“.

Zahlen in Vektoren werden in einem [Zahlenformat](zahlenformate.md) gespeichert (z. B. 16 Bit je Zahl); das ändert die
Genauigkeit, nicht die Länge d.

## Figur in Kontextia

Der Datentyp **VEC** ist die **Bedeutungsperle**: Als Schlüssel eine schimmernde Opalkugel, als Schloss eine
**halbrunde Mulde** (Perlmutt, Glyphe ●). Emmi gibt Perlen aus; Nora, Queria, Keylian, Valo, Hedra, Fina, Ressi und
Lio nehmen sie in ihre Mulden auf. **Professor Quirin Query** trägt genau drei Zahlenstäbe – sein eigener kleiner
Fragevektor; sein Q-Schlüsselbart hat deshalb drei Zähne (KANON §6).

## Im Spiel

L02 Teil 2: Vektoren mit 4–8 Dimensionen, Kosinus-Ähnlichkeit, Projektionstäuschung. L03: Kämme sind Vektoren; die
Zahnhöhe zeigt den Zahlenwert (oben positiv, unten negativ).

## Hier endet das Bild

Eine Perle sieht aus wie ein Ding. Ein Vektor ist aber nur eine Zahlenliste; seine „Bedeutung“ entsteht erst durch die
gelernten Matrizen, die ihn lesen. Und echte Vektoren haben Hunderte bis Tausende Komponenten – kein Bild zeigt alle.

## Häufige Irrtümer

- „Ein Vektor ist ein Pfeil im Raum, also höchstens 3 Zahlen.“ – Mathematisch beliebig viele Komponenten.
- „Jede Komponente bedeutet ein Wort.“ – Nein, Bedeutung ist verteilt.
- „Längere Vektoren sind wichtiger.“ – Die Länge allein sagt wenig; Normalisierung gleicht sie ohnehin an.

## Verwandte Begriffe

[Embedding](embedding.md) · [Hidden State](hidden-state.md) · [Skalarprodukt und Score](skalarprodukt-score.md) ·
[Normalisierung](normalisierung.md) · [Residualverbindung](residualverbindung.md) · [Zahlenformate](zahlenformate.md)

## Quellen

[Radford2018], [Touvron2023], [Vaswani2017], [Goodfellow2016] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
