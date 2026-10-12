# Attentiongewicht

**Stadttakt:** 5–6 · **Welt:** L03 Sternwarte · **Figur:** Sofi Softmax (verteilt), Valo (Pakete werden danach gemischt) · **Anschluss:** W% – Anteilstropfen mit Füllstand (Koralle, Glyphe ◆%)

## Kurz für Kinder (Teil 1)

Jeder Baustein hat ein **Aufmerksamkeitsbudget** von genau einem ganzen Kuchen. Sofi verteilt es: Wessen Kamm hell leuchtet,
bekommt ein großes Stück, wessen Kamm schwach leuchtet, ein kleines, und wer in der Zukunft steht, gar keins. So viel wird dann
von jedem Picknickkorb auf den **Picknickteller** gelegt. Und: **Je voller die Halle, desto dünner die Stücke** – kommen viele
ähnlich passende Bausteine dazu, bekommt jeder weniger. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Das Attentiongewicht a_tj gibt an, mit welchem Anteil der [Value](value.md) der Position j in die Ausgabe der Position t
eingeht:

`a_tj = exp(s_tj) / Σ_{i ≤ t} exp(s_ti)` und `o_t = Σ_j a_tj · v_j` [Vaswani2017]

Eigenschaften: a_tj ≥ 0; für jede Query-Zeile ist Σ_j a_tj = 1; maskierte Positionen (j > t) haben a_tj = 0. Alle Gewichte
eines Kopfes bilden eine **Dreiecksmatrix** (n × n), die man als Heatmap zeigen kann.

Beispiel: Scores (0,577; 1,732) für Position 2 → Gewichte (0,240; 0,760). Mit v₁ = (1; 0), v₂ = (0; 1) ergibt das
o = (0,24; 0,76).

**Verdünnung [DE 11.10. Didaktik]:** Weil die Summe immer 1 ist, sinkt jedes Gewicht, wenn mehr Positionen ähnlich hohe Scores
haben. Beispiel: Scores (0,577; 1,732; 2,887) → Gewichte (0,070; 0,223; 0,707). Kommen 10 weitere Positionen mit Score 1,732
dazu, fällt das größte Gewicht von 0,707 auf **0,219** – obwohl sich sein Score nicht geändert hat (eigene Rechnung).

Was Gewichte zeigen – und was nicht:
- Sie zeigen, **wohin ein Kopf in einem Stockwerk schaut**. Forschende finden typische Muster: Köpfe, die aufs vorige Token
  schauen, Induktionsköpfe ([A][B] … [A] → [B]) [Olsson2022], und Köpfe, die viel Gewicht auf die ersten Tokens legen
  („Attention Sinks“), auch wenn diese inhaltlich unwichtig sind [Xiao2023].
- Sie zeigen **nicht** allein, warum das Modell eine Antwort gibt: Es gibt viele Köpfe und Stockwerke, dazu FFN-Teile, und
  die Werte im Residualstrom werden addiert [Elhage2021].

## Figur in Kontextia

**Sofi Softmax** gibt W%-Tropfen aus. In der Sternwarte fließen diese Tropfen mit Valos Paketen auf den **Mischplatz** –
dort hat keine Figur ein eigenes Schloss; die Pakete werden einfach nach Füllstand der Tropfen gemischt. Am Markt passen
dieselben Tropfen in Kiras und Pios Schalen.

## Im Spiel

L03 (Space Invaders): Die **Strahlbreite** codiert das normierte Gewicht, mit Zahl- und Musteralternative; der Score steht
getrennt daneben. Teil 2: Heatmap der Gewichte; Auflösung des Balkon-Dramas: Queria darf viele erlaubte Keys gleichzeitig
unterschiedlich stark beachten. Abschnitt B′ „Volle Halle, dünner Kuchen“ [DE 11.10. Didaktik]: Vorhersage, ob „Katze“ gleich
viel Kuchen bekommt, wenn weitere ähnlich passende Balkone dazukommen – sie bekommt deutlich weniger. L04: Kopf-Bomben mit
unterschiedlichen Explosionsmustern sind Gewichtsmuster, die sich mit dem Satz ändern.

## Hier endet das Bild

„Aufmerksamkeit“ klingt nach Interesse oder Verstehen. Ein Gewicht ist ein **Mischungsanteil**, nicht Wille und nicht
Wichtigkeit für die Wahrheit. Ein hohes Gewicht auf ein Wort beweist nicht, dass die Antwort stimmt. Und ein Stück, das im
Fenster liegt, bekommt nicht automatisch viel davon: Je voller die Halle, desto dünner die Stücke.

## Häufige Irrtümer

- „Aufmerksamkeit gilt nur einem Wort.“ – Sie ist über alle erlaubten Positionen verteilt.
- „Hohes Gewicht = Erklärung der Antwort.“ – Höchstens ein Teil des Bildes.
- „Gewichte sind gelernte Parameter.“ – Nein, sie werden bei jeder Eingabe neu berechnet; gelernt sind W_Q und W_K.
- „Gewicht und Score sind dasselbe.“ – Gewichte entstehen erst durch Softmax aus Scores.

## Verwandte Begriffe

[Softmax](softmax.md) · [Skalarprodukt und Score](skalarprodukt-score.md) · [Kausale Maske](kausale-maske.md) ·
[Value](value.md) · [Multi-Head-Attention](multi-head-attention.md) · [Self-Attention](self-attention.md)

## Quellen

[Vaswani2017], [Olsson2022], [Xiao2023], [Elhage2021] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
