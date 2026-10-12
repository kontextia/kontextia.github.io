# Validierung und Überanpassung

**Stadttakt:** „Geschichte“ (Training) · **Welt:** L07 Lernschmiede & Prüfinsel · **Figur:** Vali (Schmiedezunft, unabhängig) · **Anschluss:** Schloss ID-Buchse (Modellantwort) → Schlüssel L-Kerbe (Prüfergebnis)

## Kurz für Kinder (Teil 1)

Vali ist ein silberner Koffer mit dem Siegel „unbekannt“. Darin liegen **Aufgaben, die die Stadt beim Üben nie gesehen hat** –
wie eine Klassenarbeit mit neuen Aufgaben. Wer nur auswendig gelernt hat, fällt hier durch. Wer wirklich verallgemeinert, besteht.

## Genauer (Teil 2)

Man teilt Daten in mindestens drei Mengen [Goodfellow2016]:
- **Trainingsdaten:** Daraus werden Gradienten berechnet.
- **Validierungsdaten:** Damit misst man während der Entwicklung, wie gut das Modell auf Unbekanntem ist, und wählt
  Einstellungen (z. B. Lernrate, wann aufhören).
- **Testdaten:** Ganz am Ende einmal, für eine ehrliche Schlussnote.

**Überanpassung (Overfitting)** heißt: Der Trainingsverlust sinkt weiter, der Validierungsverlust steigt wieder. Das Modell passt
sich Eigenheiten der Trainingsbeispiele an (bis hin zum Auswendiglernen), statt allgemeine Muster zu lernen.

Spielbeispiel (Mini-Modell L07-T2):

| Epoche | Trainingsverlust | Validierungsverlust |
|---|---|---|
| 1 | 1,20 | 1,25 |
| 5 | 0,60 | 0,70 |
| 10 | 0,30 | 0,68 |
| 20 | 0,05 | 0,95 |

Ab etwa Epoche 10 wird es auf neuen Daten schlechter, obwohl das Training „besser“ aussieht. **Frühes Beenden** beim besten
Validierungswert ist eine einfache Gegenmaßnahme; weitere sind mehr und vielfältigere Daten oder Regularisierung, etwa
Gewichtsabnahme [Goodfellow2016][Loshchilov2017]. (Die Tabellenwerte sind ein konstruiertes Lehrbeispiel.)

**Die eiserne Regel:** Validierungsdaten dürfen **nie** in den Gradienten fließen. Sonst wird auf ihnen trainiert, und sie
prüfen nichts mehr. Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) steht deshalb eine **Sperrlinie** zwischen Vali und Gilda.
Dasselbe gilt im Spiel: Validierungs- und Transferaufgaben sind nicht identisch mit Demo- oder Trainingsbeispielen (Test T16), und
eine vorgespielte Lösung zählt nicht als Transfernachweis (Test T22).

Ein Seitenblick: Benchmarks belohnen oft Raten statt ehrlichem „Ich weiß es nicht“. Kalai et al. argumentieren, dass diese
Bewertungspraxis Halluzinationen fördert [Kalai2025] – auch die Prüfung selbst muss gut gebaut sein.

## Figur in Kontextia

**Vali** (Schmiedezunft, aber **unabhängig**): silbergrauer Koffer mit Siegel „unbekannt“. Schloss **ID-Buchse** (nimmt die
Modellantwort), Schlüssel **L-Kerbe** (Prüfergebnis). Die L-Kerbe passt typmäßig in Gildas Buchse – die Verbindung ist trotzdem
verboten (Vali ⊘ Gilda).

## Im Spiel

L07: „Vali prüft mit unbekannten Karten.“ Teil 2: Überanpassung an echten Mini-Modellen sehen und den besten Haltepunkt wählen.
Stern 5 jeder Welt folgt demselben Prinzip: eine unbekannte Variante ohne vorgespielte Lösung.

## Hier endet das Bild

Eine gute Note heißt **nicht fehlerfrei**. Validierung misst nur auf den Aufgaben, die im Koffer liegen; ein Modell kann bei
anderen Themen trotzdem danebenliegen.

## Häufige Irrtümer

- „Niedriger Trainingsverlust = gutes Modell.“ – Erst der Validierungsverlust sagt etwas über Neues.
- „Validierungsdaten kann man nebenbei mittrainieren.“ – Dann sind sie wertlos (Sperrlinie).
- „Überanpassung gibt es nur bei kleinen Modellen.“ – Sie hängt von Daten, Modellgröße und Trainingsdauer ab.

## Verwandte Begriffe

[Training](training.md) · [Cross-Entropy-Loss](cross-entropy-loss.md) · [Gradient](gradient.md) ·
[Optimierer und Lernrate](optimierer-lernrate.md) · [Halluzination](halluzination.md) · [Fine-tuning](fine-tuning.md)

## Quellen

[Goodfellow2016], [Loshchilov2017], [Kalai2025] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
