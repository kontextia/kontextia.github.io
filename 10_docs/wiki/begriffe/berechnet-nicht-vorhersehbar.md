# Berechnet heißt nicht vorhersehbar (Kontextias Wetter)

**Stadttakt:** alle 13 – die ganze Stadt · **Welt:** Prolog L00 (Kajo erklärt), jede Welt mindestens einmal (KANON §21 L3); L05 B′ „Der große Markt“, L07 B′ „Die Schmiede staunt“, L08 B′ „Meistens gleich, manchmal nicht“ · **Figuren:** Kajo Cache (erklärt im Prolog), Sofi Softmax (Glücksrad) · **Anschluss:** — · Neue Seite [DE 11.10. Didaktik, KANON §17 „Ganze Stadt“, §21 L3/L10]

## Kurz für Kinder (Teil 1)

Kajo: „Jeder Schritt in der Stadt ist eine einfache Rechnung. Aber es sind so viele, dass **niemand vorher weiß, was
herauskommt** – auch die Schmiede nicht. Wie beim **Wetter**: Jeder Tropfen folgt einfachen Regeln, und trotzdem sagt man nur
‚wahrscheinlich Regen‘.“

Und ganz am Ende dreht Sofi noch das Glücksrad. Darum gilt:
- Ein **kleiner Unterschied** im Text kann eine ganz andere Antwort geben.
- Wer alle Teile der Stadt kennt, kann die Antwort trotzdem **nicht vorhersagen**. Die Stadt ist **kein Uhrwerk**.
- Die Stadt ist auch **kein Orakel**: Sie zaubert nicht, sie rechnet – und rät am Ende.

Mit demselben **Seedstein** kommt genau dasselbe heraus. Welches „dasselbe“, zeigt aber erst die Rechnung.

## Genauer (Teil 2)

**Was fest ist:** Ein Durchlauf durch ein Sprachmodell ist eine **feste Reihenfolge deterministischer Rechnungen** (Matrixprodukte,
Softmax, Normierung, Addition). Zufällig ist nur das Ziehen am Ende ([Sampling und Seed](sampling-seed.md)). Mit Greedy oder festem
Seed in derselben Umgebung ist das Ergebnis wiederholbar. Auf Servern können sich Ergebnisse trotzdem unterscheiden, weil die
Rechenreihenfolge davon abhängt, wie viele Anfragen gerade zusammen gerechnet werden [He2025].

**Warum es trotzdem nicht vorhersehbar ist:**
- **Größe:** Milliarden Parameter, Dutzende Stockwerke, nichtlineare Knicke. Eine Abkürzung, die das Ergebnis ohne die ganze
  Rechnung liefert, gibt es nicht; man muss das Modell laufen lassen.
- **Empfindlichkeit:** Kleine Änderungen an der Eingabe können die Ausgabe stark ändern. Sclar et al. fanden bei LLaMA-2-13B
  Unterschiede von bis zu 76 Prozentpunkten Genauigkeit allein durch die Formatierung des Prompts [Sclar2023]. Weil jedes
  gezogene Token alle späteren mitbestimmt ([Autoregression](autoregression.md)), wachsen kleine Unterschiede oft an.
- **Training:** Wie stark der Gesamtverlust mit Größe und Daten sinkt, lässt sich recht gut vorhersagen; **welche** Fähigkeiten
  ein Modell danach hat, oft nicht – manche tauchen überraschend auf [Ganguli2022]. Auch die Bauleute müssen messen, was ihr
  Modell kann.

**Das Wetter als Vorbild:** Lorenz zeigte an einem einfachen, vollständig deterministischen Gleichungssystem für Luftströmungen,
dass winzige Unterschiede im Anfangszustand nach einiger Zeit zu völlig verschiedenen Verläufen führen; langfristige Vorhersage
ist dann praktisch unmöglich [Lorenz1963]. Das Bild in Kontextia übernimmt nur diesen Kern: **einfache Einzelschritte ≠
vorhersehbares Ganzes**. Ob Sprachmodelle im mathematischen Sinn „chaotisch“ sind, behauptet es nicht.

## Figur in Kontextia

Keine eigene Figur [DE]. **Kajo** erklärt das Wetterbild im Prolog L00 am Poller 7; am Glücksrad von **Sofi** entscheidet der
**Seedstein**, ob eine Ziehung wiederholbar ist.
Bildlich ist es das Wetter über ganz Kontextia – ein Bild für die ganze Stadt, nicht für ein einzelnes Teil.

## Im Spiel

Jede Welt zeigt mindestens einmal, dass ein kleiner Unterschied im Text ein anderes Ergebnis gibt (KANON §21 L3). Beispiele
[DE 11.10. Didaktik]: Prolog L00 – gleicher Anfang, drei Ziehungen, drei Fortsetzungen; L05 – im großen Markt gerät die
Greedy-Schlange nur bei manchen Anfängen in eine Schleife; L07 – „Die Schmiede staunt“: Das Mini-Modell kann etwas, das ihm niemand einzeln
gezeigt hat; L08 – nach dem Quantisieren sind die meisten Antworten gleich, einzelne anders. Finale: „kein Uhrwerk, kein Orakel,
kein Wesen – ein gelernter Rater“ (L10).

## Hier endet das Bild

Mit demselben Seedstein kommt in der Stadt **genau dasselbe** heraus – das Wetter hat keinen Seedstein. (Auf echten Servern
können winzige Rechenunterschiede trotzdem andere Ergebnisse geben [He2025].) Und Wetter ist Physik; ein Sprachmodell ist eine
feste Rechnung mit einem Los am Ende. Gemeinsam ist beiden nur: Aus einfachen Schritten folgt kein vorhersehbares Ganzes.

## Häufige Irrtümer

- „Wer alle Teile kennt, kann die Antwort vorhersagen.“ – Nein, die Stadt ist kein Uhrwerk.
- „Weil man es nicht vorhersagen kann, ist es Magie oder reiner Zufall.“ – Nein, es ist Rechnung plus ein Los; mit festem Seed
  wiederholbar.
- „Gleiche Frage – gleiche Antwort.“ – Nur mit Greedy oder festem Seed in derselben Umgebung; schon kleine Umformulierungen
  können die Antwort ändern [Sclar2023].
- „Die Entwickler wissen genau, was ihre KI kann.“ – Fähigkeiten werden nach dem Training gemessen, nicht vorher gewusst
  [Ganguli2022].
- „Alles ist nur Wahrscheinlichkeit, nichts ist fest.“ – Die Rechenschritte sind fest; gelost wird erst am Ende.

## Verwandte Begriffe

[Sampling und Seed](sampling-seed.md) · [Greedy](greedy.md) · [Autoregression](autoregression.md) · [Training](training.md) ·
[Quantisierung](quantisierung.md) · [Bildbruch / Quirins Glas](bildbruch-quirins-glas.md)

## Quellen

[Lorenz1963], [Ganguli2022], [Sclar2023], [He2025] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
