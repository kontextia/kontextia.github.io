# Kausale Maske

**Stadttakt:** 5 · **Welt:** L03 Sternwarte („Der verbotene Balkon“) · **Figur:** Mira Maske · **Anschluss:** Schloss SC-Buchse → Schlüssel SC-Dreieck; Zukunft erhält das „−∞-Siegel“ (Glyphe ⊘, Nachtblau)

## Kurz für Kinder (Teil 1)

**Kein Spoiler!** Mira passt auf, dass niemand in die Zukunft schaut. Ein Baustein darf nur auf sich selbst und auf die
Bausteine vor ihm achten. „Hausnummer 7 liegt in der Zukunft. Zukunft ist tabu!“

## Genauer (Teil 2)

Die kausale Maske M ist eine Matrix, die vor der [Softmax](softmax.md) zu den Scores addiert wird:

`A = softmax(Q·Kᵀ / √d_k + M)`, mit `M_tj = 0` für j ≤ t und `M_tj = −∞` für j > t [Vaswani2017].

Weil exp(−∞) = 0 ist, bekommen alle späteren Positionen das Gewicht **genau 0**. Die eigene Position ist erlaubt
(Diagonale). Vaswani et al. beschreiben, dass die Maske verhindert, dass Positionen auf nachfolgende Positionen achten;
so kann die Vorhersage für Position i nur von Bekanntem davor abhängen [Vaswani2017].

Beispiel (3 Positionen, gemeinsame Query q = (1; 2; −1), skalierte Scores 0,577 / 1,732 / 2,887):

- **Ohne Maske** für Position 2: Gewichte (0,070; 0,223; 0,707) – der Key an Position 3 hätte den größten Anteil.
- **Mit Maske** für Position 2: Score von Position 3 → −∞; Gewichte (0,240; 0,760; **0**).

Der höchste Score wird also trotzdem gesperrt (Regressionstest T04). Jede Zeile behält mindestens ein erlaubtes Feld
(die eigene Position), damit Softmax definiert bleibt.

**Wozu beim Training?** Dort sind alle Tokens schon da und werden **parallel** gerechnet. Ohne Maske könnte jede Position
das nächste Token einfach „abschreiben“ – das [Next-Token-Ziel](next-token-ziel.md) wäre wertlos. Beim Generieren gibt es
die Zukunft ohnehin noch nicht; die Maske sorgt dafür, dass Training und Generieren dieselbe Rechnung sind.

Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) steht hier eine **Sperrlinie**: K und V späterer Positionen dürfen nie in
die Mischung einer früheren Query fließen.

## Figur in Kontextia

**Mira Maske** (Zeitwacht, „Nur zurück, nie voraus.“): dunkelblauer Schildrahmen mit Zeitpfeil. Schloss **SC-Buchse**,
Schlüssel **SC-Dreieck**; zukünftige Dreiecke bekommen das **−∞-Siegel**. Freundlich-streng, nie böse.

## Im Spiel

L03 (Space Invaders): Miras Bunker sind die Maske – sie blockieren den **Beitrag**, nicht nur die Farbe (gestrichelter
Zukunftsschirm). Teil 2: Maskenmatrix als Dreieck in der Heatmap. Witz: „Bei uns stirbt niemand. Höchstens ein Score
auf minus unendlich.“

## Hier endet das Bild

„Kein Spoiler“ klingt nach Höflichkeit. Die Maske ist eine **harte Rechenregel**. Und sie ist **kein Sicherheitsfilter**:
Gegen eingeschmuggelte Anweisungen in Dokumenten hilft sie nicht ([Prompt Injection](prompt-injection.md)).

## Häufige Irrtümer

- „Die Maske versteckt Wörter vor dem Modell.“ – Sie sperrt nur die Beiträge **späterer** Positionen.
- „Die eigene Position ist auch gesperrt.“ – Nein, sie ist erlaubt.
- „Maskierte Felder bekommen ein kleines Gewicht.“ – Exakt null.
- „BERT hat auch eine kausale Maske.“ – Nein, BERT schaut in beide Richtungen [Devlin2018].

## Verwandte Begriffe

[Skalarprodukt und Score](skalarprodukt-score.md) · [Softmax](softmax.md) · [Attentiongewicht](attentiongewicht.md) ·
[Self-Attention](self-attention.md) · [Autoregression](autoregression.md) · [Next-Token-Ziel](next-token-ziel.md)

## Quellen

[Vaswani2017], [Devlin2018], [HF-CLM] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
