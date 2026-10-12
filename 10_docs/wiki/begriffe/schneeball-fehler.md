# Schneeball-Fehler

**Stadttakt:** Folge erzeugter Stücke · **Welten:** L05 Rechenstand, L10 Nachtkugel · **Figuren:** Sofi, Kajo, Quirin; Nebel als Naturphänomen · **Anschluss:** gezogene ID wird wieder Tischinhalt · [DE 11.10. Didaktik 2.2]

## Kurz für Kinder (Teil 1)

Ein falscher Name landet auf dem Tisch. Die nächste Antwort passt dann zu diesem Namen – und kann ebenfalls falsch sein. Wie ein Schneeball wächst der Fehler weiter. Der zweite Satz klingt dabei genauso flüssig wie der erste. Das ist kein neues Wissen und keine Absicht.

## Genauer (Teil 2)

Autoregression verarbeitet auch die bereits erzeugten Tokens. Deshalb kann ein frühes falsches Token spätere Verteilungen verändern. Zhang und Mitautoren untersuchen solche fortgesetzten Halluzinationen: Modelle konnten manche Aussagen separat als falsch erkennen und verwendeten sie trotzdem in einer Erklärung für eine vorher erzeugte Fehlantwort. [Zhang2023]

Im Lehrmodell NK-1 wird das zuletzt gezogene Stück mit vier Stimmen in die nächste Frage übernommen. Nach dem falschen Kapitän Bo hat die falsche Sternfähre-Abfahrt Wahrscheinlichkeit `83/85`; nach der richtigen Kapitänin Merle beträgt sie `1/3`. Die Messung der Startnummern 1–1000 ergibt 757 gemeinsame Kapitän-/Abfahrtfehler gegenüber 42 Fällen mit falschem Kapitän und richtiger Abfahrt. **Bedingte Wahrscheinlichkeit** unterscheidet diese Gruppen; bloßes Zählen aller Fehler tut das nicht. [L10 §6.6]

## Figur in Kontextia

Kein eigener Schneeball-Bösewicht. **Sofi** zieht das nächste Stück, der Text liegt danach auf dem Tisch. **Quirin** zeigt die Fäden durch sein Glas; die Kugel selbst hat kein Fehlerlicht. **Kajo** fragt nach dem Anfang der falschen Kette.

## Im Spiel

L10 B2: zunächst Kapitän ziehen, die nächste Antwort vorhersagen, dann die Kette fortsetzen. Seedstein 1 liefert Bo, 18 Uhr, Lunaris; Seedstein 21 Merle, 20 Uhr, Sterninsel. L05 Nummer 7 schreibt zunächst 13 statt 12 und rechnet anschließend 13 minus 5 zu 8 weiter.

## Hier endet das Bild

Ein früher Fehler muss keinen späteren Fehler verursachen. Die zweite Kette und Gegenproben sind deshalb Teil des Spiels. Der Faktor vier ist eine von Hand festgelegte NK-1-Regel, kein Naturgesetz realer Transformer.

## Häufige Irrtümer

- „Jedes falsche Stück macht alles danach falsch.“ – Fortsetzungen können wieder richtig sein.
- „Die spätere Erklärung belegt den ersten Satz.“ – Sie kann auf ihm aufbauen.
- „Der Nebel kommt als Blatt herein.“ – Ein Fremdblatt ist ein anderes Risiko; dieser Fehler entsteht beim Erzeugen.

## Verwandte Begriffe

[Autoregression](autoregression.md) · [Halluzination](halluzination.md) · [Zwischenschritte](zwischenschritte-chain-of-thought.md) · [Grounding und Beleg](grounding-beleg.md)

## Quellen

[Zhang2023: How Language Model Hallucinations Can Snowball](https://arxiv.org/abs/2305.13534) · [L10 §§5–6](../../../01_design/v2/level/L10.md) · [L05 §9b](../../../01_design/v2/level/L05.md).
