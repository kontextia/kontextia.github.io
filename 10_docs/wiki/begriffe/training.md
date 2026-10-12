# Training

**Stadttakt:** „Geschichte“ – vor jeder Nutzung · **Welt:** L07 Die Lernschmiede der Gewichte (Murmel-Schmiede) · **Figuren:** Gilda Gradient, Olli Optimierer, Vali, Ronja Rückmeldung (Teil 2) · **Anschluss:** L → G → Schraubendreher auf P

## Kurz für Kinder (Teil 1)

Training ist **Üben mit Lösungsheft**. Die Stadt rät das nächste Wort, schaut im Lösungsheft nach, misst, wie weit sie
daneben lag, und dreht ein winziges bisschen an ihren Stellschrauben. Das passiert unvorstellbar oft – lange bevor die Stadt
zum ersten Mal Fragen beantwortet. Heute ist die Schmiede kalt.

Dabei schreibt niemand eine Regel hinein. Gilda: „Wir haben nie eine Regel hineingeschrieben. Wir haben nur Milliarden Mal
‚wärmer, kälter‘ gesagt.“ Jede Übung dreht **alle** Schrauben ein winziges Stück. Darum steckt Wissen **nicht in einer Schraube,
sondern in allen ein bisschen** – es gibt kein Fach mit fertigen Antworten und keine Wenn-dann-Regeln. Manchmal kann die Stadt
danach sogar etwas, das ihr niemand einzeln gezeigt hat: **Die Schmiede staunt.**

Beim Reden lernt die Stadt nicht – **aber jemand kann mitschreiben**: Je nach Anbieter und Einstellung werden Gespräche
aufbewahrt und später in einer neuen Schmiedezeit verwendet. Geheimnisse, Adressen und Passwörter bleiben bei dir
([Mitschreiber](mitschreiber-datenschutz.md)). [DE 11.10. Didaktik, KANON §21 L7/L11]

## Genauer (Teil 2)

Training sucht Parameterwerte, die einen **Verlust** (Loss) auf Trainingsdaten klein machen. Ein Trainingsschritt besteht aus
[HF-Training][Goodfellow2016]:

1. **Vorwärts:** Ein Stapel Texte läuft durch das Modell; an jeder Position entsteht eine Verteilung fürs nächste Token.
2. **Verlust:** Vergleich mit dem tatsächlich nächsten Token – [Cross-Entropy-Loss](cross-entropy-loss.md).
3. **Rückwärts:** [Backpropagation](backpropagation.md) berechnet den [Gradienten](gradient.md) für jede Stellschraube
   [Rumelhart1986].
4. **Schritt:** Der [Optimierer](optimierer-lernrate.md) ändert alle Parameter ein wenig gegen den Gradienten (z. B. Adam
   [Kingma2014]).
5. **Prüfen:** Ab und zu misst Vali den Verlust auf **unbekannten** Daten ([Validierung](validierung-ueberanpassung.md)).

Größenordnungen aus echten Berichten: GPT-1 wurde 100 Epochen lang auf Stapeln von 64 Folgen mit je 512 Tokens trainiert, mit
Adam und einer Lernrate, die über 2000 Schritte auf 2,5 · 10⁻⁴ anstieg und dann nach einem Kosinusplan abfiel [Radford2018].
Größere Modelle werden auf Billionen Tokens trainiert; LLaMA nennt für seinen größten Lauf 1,4 Billionen Tokens [Touvron2023].

Phasen eines heutigen Sprachmodells:
- [Pretraining](pretraining.md): Next-Token-Vorhersage auf sehr viel Text.
- [Fine-tuning](fine-tuning.md): Weitertrainieren auf gezielten Beispielen.
- [Präferenz-/Feedbacktraining](praeferenztraining-rlhf.md): Lernen aus Bewertungen von Antworten.

**Inferenz ist kein Training.** Beim Antworten laufen nur Schritt 1 und das Ziehen; es gibt keinen Loss, keinen Gradienten,
kein Update. Beispiele im Prompt wirken „ohne Gradientenupdates“ [Brown2020] ([Tischlernen](tischlernen.md)). Regressionstest
T14: Inferenz-Freeze verhindert Parameterupdates. **Aber:** Ein Gespräch kann **später** zu Trainingsdaten werden, wenn der
Anbieter es speichert und dafür verwendet – je nach Dienst und Einstellung [GoogleGemini-Privacy][Anthropic2025]. Das ist ein
neuer Trainingslauf, kein Lernen während des Gesprächs [DE 11.10. Didaktik].

**Verteilt, nicht nachgeschlagen [DE 11.10. Didaktik]:** Training schreibt keine Wenn-dann-Regeln und legt keine Textablage an;
jeder Schritt verändert sehr viele Parameter ein wenig, und jedes Wissen verteilt sich über viele Parameter. Meng et al. konnten
manche Faktenassoziationen bestimmten FFN-Stockwerken zuordnen und gezielt ändern – das gelingt nur teilweise und hat
Nebenwirkungen [Meng2022].

**Nicht genau vorhersehbar [DE 11.10. Didaktik]:** Wie stark der Gesamtverlust mit Modellgröße und Daten sinkt, lässt sich recht
gut vorhersagen; **welche** Fähigkeiten ein Modell danach hat, oft nicht – manche tauchen überraschend auf [Ganguli2022]. Auch
die Schmiede muss messen, was sie gebaut hat ([Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md)).

## Figur in Kontextia

Die **Schmiedezunft** (Gründer der Stadt, „Klein justiert, groß gelernt.“): **Gilda Gradient** (L-Kerbenbuchse → G-Pfeile),
**Olli Optimierer** (G-Pfeilbuchse → Schraubendreher auf P), **Vali** (unabhängig, prüft), **Ronja Rückmeldung** (Teil 2,
Präferenzen). Ahnenporträts: Siggi SGD, Ada Adam. Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) führen Schmiedelinien von
Olli zu allen Stellschrauben; zwischen Vali und Gilda steht eine Sperrlinie.

## Im Spiel

L07 (Marble Madness): Die Murmel sind die aktuellen Stellschrauben, die Landschaftshöhe ist der Loss; Gilda zeigt bergauf,
Olli schreitet bergab. Abschnitt B′ [DE 11.10. Didaktik]: **„Die Schraubensuche“** – das Kind sucht im Mini-Modell die eine
Schraube, in der „Das Mondschiff fährt um acht“ steckt; jede Drehung ändert viele Antworten ein bisschen, keine enthält den
Satz. **„Die Schmiede staunt“** – das Mini-Modell kann danach etwas, das ihm niemand einzeln gezeigt hat (z. B. eine Mehrzahl,
die in keinem Übungssatz stand). **„Kalt heißt nicht verschwiegen“** – der Mitschreiber legt ein Blatt ins Amtsbuch „für eine
spätere Schmiedezeit“. Merksätze: „Wissen steckt in allen Schrauben ein bisschen.“ / „Die Stadt lernt nicht beim Reden – aber
jemand kann mitschreiben.“ Teil 2: echte Logistik-Mini-Modelle mit berechnetem Gradienten (Test T15); Faktenorte und
Nebenwirkungen [Meng2022]. Streit der Welt: Die Schmiede behauptet, die Brücke lerne „beim Reden“ – falsch.

## Hier endet das Bild

Üben mit Lösungsheft klingt nach Einsicht. Training sind **Milliarden kleiner Zahlenschritte**, kein „Aha-Moment“; das
Modell merkt sich keine einzelnen Lektionen bewusst. Und anders als ein Lösungsheft enthält das fertige Modell **keine
Regeln und keine Antwortfächer** – nur verteilte Zahlen. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Das Modell lernt aus meinem Chat.“ – Nicht während des Gesprächs; die Gewichte sind fest. Aber je nach Anbieter und
  Einstellung kann dein Chat gespeichert und **später** in ein neues Training einfließen
  ([Mitschreiber](mitschreiber-datenschutz.md)) [DE 11.10. Didaktik].
- „Die Entwickler haben dem Modell Wenn-dann-Regeln einprogrammiert.“ – Im Modell stehen keine geschriebenen Regeln; Verhalten
  entsteht aus gelernten Zahlen. Regeln gibt es höchstens in der Anwendung drumherum (Systemprompt, Filter, Freigabelisten)
  [DE 11.10. Didaktik].
- „Die Entwickler wissen vorher genau, was ihr Modell kann.“ – Nein, Fähigkeiten werden nach dem Training gemessen
  [Ganguli2022] [DE 11.10. Didaktik].
- „Training heißt, Texte in eine Datenbank zu kopieren.“ – Es verändert Zahlen, keine Textablage.
- „Ein guter Trainingsverlust heißt, das Modell ist fehlerfrei.“ – Prüfen muss Vali auf neuen Daten.

## Verwandte Begriffe

[Next-Token-Ziel](next-token-ziel.md) · [Cross-Entropy-Loss](cross-entropy-loss.md) · [Gradient](gradient.md) ·
[Backpropagation](backpropagation.md) · [Optimierer und Lernrate](optimierer-lernrate.md) ·
[Validierung und Überanpassung](validierung-ueberanpassung.md) · [Parameter und Gewichte](parameter-gewichte.md) ·
[Tischlernen](tischlernen.md) · [Mitschreiber](mitschreiber-datenschutz.md) ·
[Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md)

## Quellen

[Goodfellow2016], [Rumelhart1986], [Kingma2014], [Radford2018], [Touvron2023], [Brown2020], [Meng2022], [Ganguli2022],
[GoogleGemini-Privacy], [Anthropic2025], [HF-Training] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L07 trennt Damals (Schmieden) und Heute (Benutzen). Der Merle-Versuch prüft falsche häufige Textmuster; die Schraubensuche findet kein abtrennbares Faktfach. [Vorurteile / Bias](vorurteile-bias.md), [Einmal-Fakten](einmal-fakten.md) und [Größe, Rechenaufwand und Strom](groesse-rechenaufwand-strom.md) ergänzen Messung und Preis.
