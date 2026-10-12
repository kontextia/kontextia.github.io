# Zwischenschritte (Chain of Thought)

**Stadttakt:** 1–13, für **jedes** Zwischenstück ein ganzer Takt · **Welt:** L05 Bühne „Laut rechnen auf dem Tisch“ (§9b, beide Teile); Bezug L10 (Schneeball) · **Figuren:** die Schlange (der erzeugte Text), Lio und Sofi am Rechenstand, Kajo (zählt den Preis) · **Anschluss:** ID → wieder auf den Tisch, wie jedes erzeugte Stück · Neue Seite [DE 11.10. Didaktik 2.2, KANON §17 „Zwischenschritte“, DIDAKTIK_REVISION §6a.3 G2]

## Kurz für Kinder (Teil 1)

**Rechnen auf dem Schmierblatt statt im Kopf.** Pio hat 3 Körbe mit je 4 Pflaumen, Kira nimmt 5 weg. Wie viele bleiben?

- Mit „**Nur die Zahl!**“ muss die Stadt in einem einzigen Takt zwei Rechenschritte schaffen – im Spielturm kommt meistens
  nur „12“ heraus (halb gerechnet).
- Mit „**Schreib die Zwischenschritte hin!**“ schreibt sie „3 mal 4 ist 12. 12 minus 5 ist 7“. Jedes Zwischenstück bekommt
  einen **eigenen Takt durch den ganzen Turm** – und danach liegt die 12 auf dem Tisch, wo der nächste Takt sie lesen kann.

Das hilft bei Aufgaben mit mehreren Schritten oft. Aber es ist **kein Nachdenken wie bei Menschen** – es sind **mehr
Stücke**. Es kostet Plätze und Zeit, und ein Zwischenschritt kann selbst nebeln. Merksatz: **„Hilft oft, kostet immer – und
kann selbst nebeln.“**

## Genauer (Teil 2)

**Chain-of-Thought-Prompting:** Wei et al. legten ins Prompt einige Beispiele, deren Lösungen Zwischenschritte enthalten. Große
Modelle lösten danach Rechen-, Alltagslogik- und Symbolaufgaben deutlich besser; ein Modell mit 540 Milliarden Parametern
erreichte mit nur acht solchen Beispielen damals den Bestwert auf dem Mathe-Textaufgaben-Test GSM8K. Der Effekt zeigte sich
vor allem bei **ausreichend großen** Modellen [Wei2022]. Schon zuvor hatten Nye et al. Modelle darauf trainiert, Zwischenrechnungen
auf ein „Schmierblatt“ (Scratchpad) zu schreiben – mit starken Verbesserungen bei langen Additionen und beim Ausführen von
Programmen [Nye2021]. **Self-Consistency** zieht mehrere Lösungswege und nimmt die häufigste Endantwort; das verbesserte zum
Beispiel GSM8K um 17,9 Prozentpunkte [Wang2022a] ([Mehrmals fragen](mehrmals-fragen.md)).

**Warum das helfen kann (mechanisch, vorsichtig):** Jeder Takt läuft durch eine feste Zahl von Stockwerken – die Rechenmenge
je Stück ist fest. Mehr geschriebene Stücke heißt mehr Takte, also mehr Rechnung, und jedes Zwischenergebnis liegt danach als
Text auf dem Tisch, von wo die nächsten Takte es per Attention holen ([Autoregression](autoregression.md)).

**Der Preis** ([Gewinn und Preis](gewinn-und-preis.md)):
- **Plätze:** Zwischenschritte belegen das [Kontextfenster](kontextfenster.md).
- **Zeit und Strom:** Jedes Stück kostet einen vollen Durchlauf, grob 2 Rechnungen je Parameter [Kaplan2020]
  ([Größe, Rechenaufwand und Strom](groesse-rechenaufwand-strom.md)).
- **Fehler wandern mit:** Ein falscher Zwischenschritt wird folgerichtig weiterverarbeitet ([Schneeball-Fehler](schneeball-fehler.md)).
- **Kein Fenster ins Innere:** Turpin et al. zeigen, dass hingeschriebene Begründungen systematisch verschweigen können, was
  die Antwort tatsächlich beeinflusst hat (etwa die Reihenfolge der Antwortoptionen in den Beispielen); Modelle schrieben
  plausible Begründungen für falsche Antworten, die Genauigkeit sank um bis zu 36 % [Turpin2023].

**Spielmodell „Rechenstand“ (L05 §9b, nachgerechnet; Kernannahme: Ein Takt schafft im Spielturm einen Rechenschritt meist
richtig, zwei nicht):**

| Ansage | Takte je Lauf | Greedy | richtig bei 10 Glücksradnummern (2–11) | Takte für 10 Läufe |
|---|---|---|---|---|
| „Nur die Zahl!“ | 2 | „12“ (halb gerechnet) | **3 von 10** | 20 |
| „Zwischenschritte!“ | 12 | „3 mal 4 ist 12 . 12 minus 5 ist 7“ | **8 von 10** | 120 |

Durch Quirins Glas: Bei Nummer 7 zieht die Schlange „3 mal 4 ist **13**“ (Nebelrand) und rechnet daraus folgerichtig „13 minus
5 ist 8“ (Schneeball-Zeichen).

## Figur in Kontextia

Keine eigene Figur [DE]. Der **Rechenstand** am Rand des Logitmarkts mit Zahlfrüchten; die **Schlange** frisst jedes
geschriebene Stück, auch die Zwischenschritte. **Kajo** zählt den Preis: „Zwölf Stücke statt zwei: zwölf Takte durch den
ganzen Turm statt zwei – und zehn Plätze mehr auf dem Tisch.“ Quirin notiert: „Laut rechnen heißt mehr Stücke.“

## Im Spiel

[L05](../../../01_design/v2/level/L05.md) §9b „Laut rechnen auf dem Tisch“ (Pflichtbühne, ungewertet), Teil 1: Vorhersage 1
(Greedy: nur mit Zwischenschritten kommt 7 heraus), Vorhersage 2 (Glücksrad: mit Zwischenschritten öfter richtig, aber nicht
immer), dann die Grenzen-Auswahl. Teil 2: Plätze und Takte zählen, die Trefferquote mit und ohne Zwischenschritte exakt rechnen
und messen. Bezug [L10](../../../01_design/v2/level/L10.md): Der Schneeball zeigt, wie ein falsches Stück weitere nach sich zieht.

## Hier endet das Bild

Das Schmierblatt eines Menschen zeigt, **wie er gerechnet hat**. Die Zwischenschritte der Stadt sind **weitere gezogene
Stücke** – sie geben nicht verlässlich wieder, was im Inneren gerechnet wurde [Turpin2023]. Unser Spielturm schafft genau einen
Rechenschritt je Takt; echte Türme schaffen in einem Takt auch mehrere kleine Schritte – wie viele, ist nicht genau bekannt.
Gemessen ist: Geschriebene Zwischenschritte helfen großen Modellen bei mehrstufigen Aufgaben oft, nicht immer.

## Häufige Irrtümer

- „Wenn die KI Schritt für Schritt schreibt, denkt sie nach wie ich.“ – Sie zieht mehr Stücke; jedes ist ein weiterer Takt.
- „Mit Zwischenschritten ist die Antwort immer richtig.“ – Öfter, nicht immer; ein Zwischenschritt kann selbst nebeln.
- „Die hingeschriebenen Schritte zeigen genau, wie die Antwort zustande kam.“ – Nicht verlässlich [Turpin2023].
- „Zwischenschritte sind gratis.“ – Sie kosten Plätze, Zeit und Strom.
- „Längere Antworten sind gründlicher.“ – Länger heißt nur: mehr Stücke.

## Verwandte Begriffe

[Autoregression](autoregression.md) · [Greedy](greedy.md) · [Sampling und Seed](sampling-seed.md) ·
[Kontextfenster](kontextfenster.md) · [Schneeball-Fehler](schneeball-fehler.md) · [Mehrmals fragen](mehrmals-fragen.md) ·
[Halluzination](halluzination.md) · [Größe, Rechenaufwand und Strom](groesse-rechenaufwand-strom.md) ·
[Tischlernen](tischlernen.md) · [Gewinn und Preis](gewinn-und-preis.md)

## Quellen

[Wei2022], [Nye2021], [Wang2022a], [Turpin2023], [Kaplan2020] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md); Spielzahlen
aus L05 §9b (Spielmodell „Rechenstand“, nachgerechnet)
