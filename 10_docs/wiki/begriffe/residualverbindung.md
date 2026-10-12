# Residualverbindung

**Stadttakt:** 7 und 9 · **Welt:** L04 Die vielköpfige Werkstatt · **Figur:** Ressi Residual · **Anschluss:** Schloss zwei VEC-Mulden (Original + Änderung) → Schlüssel eine VEC-Kugel (Summe)

## Kurz für Kinder (Teil 1)

Ressi **ergänzt Notizen, statt zu radieren**. Sie nimmt den alten Rucksackinhalt und das Neue aus der Werkstatt und legt
beides zusammen. So geht nichts verloren, was vorher schon da war.

## Genauer (Teil 2)

Eine Residualverbindung addiert den Eingang einer Teilschicht zu ihrer Ausgabe:

`y = x + F(x)`

He et al. führten das „residuale Lernen“ für sehr tiefe Bildnetze ein: Die Schichten lernen eine **Änderung** relativ zum
Eingang statt einer völlig neuen Funktion; solche Netze ließen sich leichter optimieren und profitierten von großer
Tiefe [He2015]. Der Transformer setzt um **jede** Teilschicht eine Residualverbindung [Vaswani2017].

Im Pre-Norm-Block, wie in Kontextia [Xiong2020][Radford2019]:

`a = x + MHA(Norm(x))` (Ressis erster Auftritt, Takt 7)
`y = a + FFN(Norm(a))` (Ressis zweiter Auftritt, Takt 9)

Rechenbeispiel: x = (0,5; −0,2; 0,1), Attentionbeitrag (0,1; 0,3; 0,0) → a = (0,6; 0,1; 0,1);
FFN-Beitrag (−0,2; 0,0; 0,4) → y = (0,4; 0,1; 0,5).

Der Original-Transformer normierte **nach** der Addition: `LayerNorm(x + F(x))` (Post-LN) [Vaswani2017]. Xiong et al.
zeigten, dass bei Post-LN die Gradienten nahe dem Ausgang zu Beginn des Trainings groß sind und ein Warm-up nötig wird,
während Pre-LN (Norm innerhalb des Zweigs) gut verhaltene Gradienten hat [Xiong2020].

Warum das hilft: Der direkte Weg x → y ist eine **Identität**; Information und Gradienten können ungehindert durch viele
Stockwerke fließen. Zusammen ergeben alle Residualverbindungen den [Residualstrom](residualstrom.md) [Elhage2021].

## Figur in Kontextia

**Ressi Residual** (Turmwerkstätten): gelber **Y-Körper mit Pluszeichen**. Schloss: **zwei VEC-Mulden** – oben das Original,
seitlich die Änderung (von Oskar bzw. Fina). Schlüssel: **eine VEC-Kugel**, die Summe. Kein eigener Parameter: Addieren
braucht keine Stellschraube. Urahn in der Ahnengalerie: ResNet [He2015].

## Im Spiel

L04: Zwei Leitungen gehen in ein Pluszeichen, nicht in eine Speichertruhe (Animationsregel). Teil 1: Ressi legt dazu statt zu
überschreiben. Test T09: Der Residualpfad addiert den dokumentierten Eingang.

## Hier endet das Bild

Notizen sind Text, den man nachlesen kann. Ressi addiert **Vektoren**; nach der Addition sind Original und Änderung nicht
mehr getrennt sichtbar. Sie archiviert nichts – sie rechnet eine Summe.

## Häufige Irrtümer

- „Residual heißt Rest oder Fehler.“ – Hier heißt es: Die Schicht lernt die Abweichung vom Eingang.
- „Ressi speichert den Text für später.“ – Nein, das ist weder sie noch der Cache.
- „Jedes Stockwerk ersetzt den Zustand.“ – Es addiert.
- „Pre-Norm und Post-Norm sind dasselbe.“ – Die Reihenfolge verändert das Trainingsverhalten.

## Verwandte Begriffe

[Residualstrom](residualstrom.md) · [Normalisierung](normalisierung.md) · [Transformer-Block](transformer-block.md) ·
[Outputprojektion](outputprojektion.md) · [FFN / MLP](ffn-mlp.md) · [Gradient](gradient.md)

## Quellen

[He2015], [Vaswani2017], [Xiong2020], [Radford2019], [Elhage2021] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
