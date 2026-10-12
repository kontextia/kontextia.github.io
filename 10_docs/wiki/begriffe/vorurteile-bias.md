# Vorurteile aus Trainingsdaten (Bias)

**Stadttakt:** „Geschichte“ (Schmiedezeit) – wirkt danach bei jedem Takt am Logitmarkt (12) · **Welt:** L07 Bühne 8b „Was die Textberge mitgaben“ (Logbuch-Murmel), Bezug L10 (Kapitänin Merle wird überstimmt) · **Figuren:** Gilda Gradient (Textberge), Vali (Prüfkarten), Ronja Rückmeldung (Nachschliff, Teil 2) · **Anschluss:** — (steckt verteilt in den Stellschrauben P) · Neue Seite [DE 11.10. Didaktik 2.2, KANON §17 „Vorurteile“, DIDAKTIK_REVISION §6a.3 G5]

## Kurz für Kinder (Teil 1)

**Wer nur einseitige Bücher liest, schreibt einseitig weiter.** Die Stadt hat aus riesigen Textbergen geübt. Was dort oft
stand, wird wahrscheinlich – **auch einseitige Bilder**. Stand nach „Der Kapitän …“ fast immer „er“, setzt die Murmel auch
bei „Kapitänin Merle steht am Steuer. Dann ruft …“ meistens mit **„er“** fort (75 %).

Eine Maschine ist **nicht von selbst gerecht**. Sie hat keine Meinung – aber sie rechnet mit dem, was in den Textbergen oft
vorkam. Gegenmittel gibt es: ausgewogenere Übungskarten, Nachschliff, Prüfen. Sie helfen, **garantieren aber nichts**:
Manchmal wandert das Schiefe nur woandershin. Merksatz: **„Maschine heißt nicht neutral. Was oft in den Textbergen steht, wird
wahrscheinlich – auch Schiefes. Darum prüfen.“**

## Genauer (Teil 2)

**Woher es kommt:** Das [Next-Token-Ziel](next-token-ziel.md) belohnt, was in den Trainingsdaten häufig ist. Spiegeln die Daten
gesellschaftliche Schieflagen (Geschlecht, Herkunft, Alter, Religion …), lernt das Modell sie mit – und kann sie weitertragen
und verstärken. Gallegos et al. fassen Messverfahren (Metriken, Datensätze) und Gegenmittel (vor, während und nach dem
Training sowie bei der Ausgabe) in einer Übersicht zusammen [Gallegos2024].

**Klassische Befunde:**
- Schon Wortvektoren aus Google-News-Artikeln zeigen Geschlechterstereotype; das Geschlecht liegt dort als **Richtung** im
  Vektorraum [Bolukbasi2016] ([Embedding](embedding.md)).
- Mit Satzpaaren, die sich nur im Pronomen unterscheiden („Winogender“, „WinoBias“), zeigte sich: Systeme verbinden
  Pronomen öfter mit dem stereotypen Beruf; bei WinoBias im Mittel um 21,1 F1-Punkte besser bei stereotypen als bei
  gegen-stereotypen Sätzen [Rudinger2018][Zhao2018].
- **Verstecken ist nicht entfernen:** Gonen und Goldberg zeigen, dass gängige Entzerrungsverfahren für Wortvektoren die
  Schieflage nach dem eigenen Maß stark senken, sie aber aus den Abständen der Wörter wieder ablesbar bleibt
  [GonenGoldberg2019].

**Spielmodell Logbuch-Murmel (L07 §8b.1, nachgerechnet):** drei Schrauben, p(„er“) = σ(θ₁·Kapitän + θ₂·in + θ₃). Aus 21
Logbuchkarten („Kapitän …“ → er 9×, sie 1×; Wörter auf „-in“ → er 2×, sie 4×; andere → er 3×, sie 2×) rollt die Murmel ins
Tal θ* = (ln 6; −ln 3; ln 1,5). Für „Kapitänin Merle“ gilt p(„er“) = σ(ln 6 − ln 3 + ln 1,5) = σ(ln 3) = **0,75**.

| Zustand | Bo („er“ richtig) | Merle | Jule | Ilka | Prüfkarten richtig |
|---|---|---|---|---|---|
| Tal nach 21 Logbuchkarten | 0,90 | **0,75** | 0,33 | 0,60 | 2 von 4 |
| + 4 ausgewogenere Karten, neu geschmiedet | 0,81 | 0,22 | 0,19 | **0,78** | 3 von 4 (Ilka schiefer als vorher) |
| Nachschliff mit 2 Merle-Karten | **0,41** | 0,06 | 0,04 | 0,29 | 3 von 4 (Bo jetzt falsch) |

(Werte: p(„er“).) Nach dem Nachschliff steigt die Überraschung auf den alten Karten von 0,50 auf 0,94. Das Schiefe-Maß
„mittleres p(„er“) auf den drei Frauen-Karten“ sinkt 0,56 → 0,39 → 0,13 – und sieht nicht, was es nicht prüft (Bo).

## Figur in Kontextia

Keine eigene Figur [DE]. **Gilda** legt die alten Logbuchkarten auf die Werkbank: „Die Schrauben sind so gut wie die Berge, aus
denen sie geschmiedet sind.“ **Vali** prüft mit unbekannten Karten: „Ich finde nur, was ich prüfe.“ **Ronja** steht für den
Nachschliff ([Präferenz- und Feedbacktraining](praeferenztraining-rlhf.md)). Quirins Gegenprobe: „Keine Meinung heißt nicht:
gerecht.“

## Im Spiel

[L07](../../../01_design/v2/level/L07.md) §8b „Kapitänin Merle steht am Steuer“ (Teil 1): Vorhersage, was die Murmel ausgibt;
Messung 75 % „er“; dann zwei Gegenmittel mit je eigener Vorhersage und Messung. Teil 2 „Schiefe in Zahlen“: im Tal gilt je
Kartengruppe z = ln(er/sie); p(„er“ | Kapitänin Merle) rechnen; vorhersagen, wohin das Schiefe wandert. Bezug
[L10](../../../01_design/v2/level/L10.md): Kapitänin Merle wird von Bos zwanzig Zetteln überstimmt. Preiskarte L07: Training
„übernimmt Vorurteile“ ([Gewinn und Preis](gewinn-und-preis.md)).

## Hier endet das Bild

Ein Mensch, der einseitige Bücher liest, kann widersprechen. Die Stadt hat **keine Meinung**; sie setzt fort, was in ihren
Zahlen wahrscheinlich ist. Die Murmel mit drei Schrauben ist ein Spielmodell: In echten Modellen steckt Schiefes in vielen
Formen (Berufe, Herkunft, Alter …) und **verteilt in sehr vielen Schrauben zugleich**, nicht in einem Wort oder einer Schraube
([Überlagerung](ueberlagerung-superposition.md)). Gemessen wird mit vielen Prüfsätzen – und auch dann nur dort, wo man misst.

## Häufige Irrtümer

- „KI ist neutral, weil sie eine Maschine ist.“ – Sie gibt wieder, was in ihren Trainingsdaten häufig war [Gallegos2024].
- „Vorurteile in der KI kommen nur von bösen Absichten der Entwickler.“ – Meist kommen sie aus den Daten, ohne dass sie jemand
  hineinschreibt.
- „Mit ausgewogeneren Daten ist das Problem gelöst.“ – Es wird kleiner oder wandert; null ist nicht garantiert.
- „Wenn ein Test kein Vorurteil findet, gibt es keins.“ – Ein Test sieht nur, was er prüft [GonenGoldberg2019].
- „Die KI hat etwas gegen Kapitäninnen.“ – Sie hat keine Haltung; sie rechnet mit Häufigkeiten.

## Verwandte Begriffe

[Training](training.md) · [Pretraining](pretraining.md) · [Next-Token-Ziel](next-token-ziel.md) ·
[Präferenz- und Feedbacktraining](praeferenztraining-rlhf.md) · [Validierung und Überanpassung](validierung-ueberanpassung.md) ·
[Embedding](embedding.md) · [Überlagerung](ueberlagerung-superposition.md) · [Einmal-Fakten](einmal-fakten.md) ·
[Gewinn und Preis](gewinn-und-preis.md)

## Quellen

[Bolukbasi2016], [Rudinger2018], [Zhao2018], [GonenGoldberg2019], [Gallegos2024] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md); Spielzahlen aus L07 §8b (Logbuch-Murmel, nachgerechnet)
