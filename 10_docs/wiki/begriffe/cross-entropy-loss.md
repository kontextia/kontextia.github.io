# Cross-Entropy-Loss

**Stadttakt:** „Geschichte“ (Training) · **Welt:** L07 Lernschmiede (Höhe der Murmellandschaft) · **Figuren:** Gilda Gradient (nimmt die Kerbe auf), Vali (misst ohne zu lernen) · **Anschluss:** L – V-Kerbe mit Tiefe (rot, Glyphe ∨)

## Kurz für Kinder (Teil 1)

Der Loss ist eine **Fehlerkerbe**. Hat die Stadt dem richtigen Wort viel zugetraut, ist die Kerbe flach. Hat sie ihm fast
nichts zugetraut, ist die Kerbe tief. Ziel der Schmiede: die Kerben im Durchschnitt flacher machen.

## Genauer (Teil 2)

Für ein einzelnes Vorhersageziel ist der Cross-Entropy-Verlust der **negative Logarithmus der Wahrscheinlichkeit des richtigen
Tokens** [Goodfellow2016]:

`L = −log p(richtiges Token)` (natürlicher Logarithmus)

| p(richtig) | 0,9 | 0,5 | 0,1 | 0,01 |
|---|---|---|---|---|
| Loss | 0,105 | 0,693 | 2,303 | 4,605 |

Der Loss ist 0, wenn das richtige Token Wahrscheinlichkeit 1 bekommt, und wächst ohne Grenze, je kleiner sie ist. Über viele
Positionen wird gemittelt. Eine verwandte Kennzahl ist die **Perplexität** = exp(mittlerer Loss) [Jurafsky2026].

**Durchgerechnet mit Gradient:** Logits z = (2; 1; 0), richtig ist Kandidat 2.
- Softmax p = (0,665; 0,245; 0,090) → L = −ln 0,245 = **1,408**.
- Mit Softmax ergibt sich der Gradient nach den Logits einfach als **Wahrscheinlichkeit minus Ziel**:
  p − y = (0,665; −0,755; 0,090). Bridle zeigte genau diese Form für Softmax-Ausgänge [Bridle1990a].
- Ein Lehrschritt direkt auf den Logits mit Lernrate 0,1: z neu = z − 0,1 · (p − y) = (1,933; 1,076; −0,009) → p(richtig)
  = 0,271, L = **1,307**. Die Kerbe wurde flacher. (Im echten Modell werden nicht die Logits, sondern die Gewichte
  geändert; die Richtung entsteht durch [Backpropagation](backpropagation.md).)

Woher der Name: Die Kreuzentropie misst, wie gut eine Verteilung q (Modell) die Daten einer Verteilung p (Text) beschreibt;
Grundbegriffe stammen aus Shannons Informationstheorie [Shannon1948]. Bei einem einzigen richtigen Token reduziert sie sich auf
−log q(richtig).

## Figur in Kontextia

Die **Fehlerkerbe** (L) hat keinen eigenen Charakter. **Gilda Gradient** nimmt sie in ihre **L-Kerbenbuchse** auf und macht daraus
Pfeile. **Vali** gibt ebenfalls eine L-Kerbe aus – ihr Prüfergebnis auf unbekannten Daten. Diese darf **nie** in Gildas Buchse
(Sperrlinie im [Stammbaum](../../../01_design/v2/STAMMBAUM.md)).

## Im Spiel

L07 (Marble Madness): Die **Höhe der Landschaft** ist der Loss; die Murmel rollt bergab. Teil 2: Cross-Entropy für Mini-Modelle
ausrechnen und vorhersagen, wie sich der Loss nach einem Schritt ändert.

## Hier endet das Bild

Eine tiefe Kerbe klingt nach „schlimmer Fehler“. Der Loss misst nur, **wie unwahrscheinlich das Zieltoken war** – keine Note
für Wahrheit oder Qualität. Ein Modell kann niedrigen Loss haben und trotzdem Falsches behaupten.

## Häufige Irrtümer

- „Loss = Prozent falscher Antworten.“ – Nein, er bewertet Wahrscheinlichkeiten, nicht richtig/falsch-Zählungen.
- „Loss 0 ist das Ziel.“ – Auf Trainingsdaten wäre das oft Auswendiglernen.
- „Halluzinationen sind Loss.“ – Loss gibt es nur im Training; Halluzination ist ein Fehler der Antwort.

## Verwandte Begriffe

[Next-Token-Ziel](next-token-ziel.md) · [Softmax](softmax.md) · [Gradient](gradient.md) · [Backpropagation](backpropagation.md) ·
[Validierung und Überanpassung](validierung-ueberanpassung.md) · [Logits](logits.md)

## Quellen

[Goodfellow2016], [Bridle1990a], [Shannon1948], [Jurafsky2026] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
