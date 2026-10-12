# Skalierung mit √d

**Stadttakt:** 5 · **Welt:** L03-T2 Sternwarte · **Figuren:** Quirin (erklärt), Kajo (fragt „Und warum ausgerechnet Wurzel aus d?“) · **Anschluss:** SC → SC (Punktdreieck wird verkleinert)

## Kurz für Kinder (Teil 1)

Wenn ein Kamm sehr viele Zähne hat, werden die Punktzahlen beim Vergleichen riesig. Dann würde Sofi fast den ganzen
Kuchen einem einzigen Schlüssel geben. Darum teilt man die Punkte vorher durch eine passende Zahl – so bleibt das
Verteilen fair und das Lernen klappt.

## Genauer (Teil 2)

In der skalierten Skalarprodukt-Attention wird jeder Score durch √d_k geteilt, wobei d_k die Länge der Query- und
Key-Vektoren ist [Vaswani2017]:

`s = q · k / √d_k`

**Warum gerade √d_k?** Vaswani et al. begründen: Sind die Komponenten von q und k unabhängige Zufallszahlen mit
Mittelwert 0 und Varianz 1, dann hat q · k den Mittelwert 0 und die Varianz d_k. Die typische Größe (Standardabweichung)
wächst also wie √d_k. Ohne Ausgleich würden große Scores die [Softmax](softmax.md) in Bereiche schieben, in denen ihre
Gradienten extrem klein sind – das Training stockt [Vaswani2017]. Teilen durch √d_k bringt die Varianz zurück auf etwa 1.

Rechenbeispiel mit d_k = 64 (Kopfgröße bei GPT-1 und im Original-Transformer [Radford2018][Vaswani2017]),
√64 = 8:

- Unskalierte Scores (16; 8; 0) → Softmax ≈ (0,99966; 0,00034; 0,0000001). Fast alles geht an den ersten Key; kleine
  Änderungen der Scores bewirken kaum noch etwas.
- Skalierte Scores (2; 1; 0) → Softmax ≈ (0,665; 0,245; 0,090). Die Verteilung bleibt beweglich.

Die Reihenfolge der Scores ändert sich durch das Teilen nicht – nur die Schärfe der Verteilung. Damit ähnelt die
Skalierung einer festen [Temperature](temperature.md) mit T = √d_k; der Unterschied: √d_k ist fest im Modell, Tempis
Regler wird beim Ziehen am Logitmarkt eingestellt.

## Figur in Kontextia

Keine eigene Figur. **Quirin** rechnet es vor („Theoretisch völlig simpel!“ – *klonk*), **Kajo** stellt die tiefe naive
Frage. Im Spiel erscheint die Skalierung als kleiner Messingregler am Vergleichsplatz, der jedes Punktdreieck um denselben
Faktor verkleinert (Anschluss SC rein, SC raus) [DE-Vorschlag].

## Im Spiel

L03-T2 (Space Invaders, Laborkern): Spielende schalten die Skalierung aus und sehen, wie ein Strahl alle Aufmerksamkeit
schluckt; dann wieder ein. Stern 3: vorhersagen, wie sich die Verteilung ändert, wenn d_k von 4 auf 64 wächst.

## Hier endet das Bild

Ein Regler klingt nach freier Einstellung. √d_k ist **keine Stellschraube**: Es ist eine feste Zahl aus dem Bauplan,
wird nicht gelernt und beim Antworten nicht verändert. Und die Begründung gilt für Zufallsvektoren; echte Q und K sind
gelernt, die Skalierung ist eine bewährte Konvention, kein Naturgesetz.

## Häufige Irrtümer

- „Man teilt durch d.“ – Durch die **Wurzel** aus d_k.
- „Die Skalierung ändert, welcher Key gewinnt.“ – Nein, nur wie stark.
- „Die Skalierung ist dasselbe wie die Temperatur beim Sampling.“ – Ähnliche Wirkung, aber anderer Ort und fest.
- „Ohne Skalierung rechnet das Modell falsch.“ – Es rechnet, aber es lernt schlechter.

## Verwandte Begriffe

[Skalarprodukt und Score](skalarprodukt-score.md) · [Softmax](softmax.md) · [Query](query.md) · [Key](key.md) ·
[Temperature](temperature.md) · [Gradient](gradient.md)

## Quellen

[Vaswani2017], [Radford2018] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
