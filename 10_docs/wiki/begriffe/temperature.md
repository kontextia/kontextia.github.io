# Temperature

**Stadttakt:** 12 · **Welt:** L05 Logitmarkt · **Figur:** Tempi Temperatur (er) · **Anschluss:** Schloss SC-Buchse → Schlüssel SC-Dreieck (gestreckt oder gestaucht)

## Kurz für Kinder (Teil 1)

Tempi ist der **Überraschungsregler**. Dreht er nach unten, wird das Glücksrad spitzer: Das beste Feld wird riesig, die
Antwort vorhersehbar. Dreht er nach oben, werden die Felder gleichmäßiger: Die Antwort wird überraschender. Klüger wird
die Stadt dadurch nicht.

## Genauer (Teil 2)

Beim Sampling werden die [Logits](logits.md) vor der Softmax durch die Temperatur T > 0 geteilt [HF-Generation]:

`p_i = exp(z_i / T) / Σ_j exp(z_j / T)`

Beispiel mit z = (2; 1; 0):

| T | Wahrscheinlichkeiten | Wirkung |
|---|---|---|
| 0,5 | (0,867; 0,117; 0,016) | spitzer, fast Greedy |
| 1 | (0,665; 0,245; 0,090) | unverändert |
| 2 | (0,506; 0,307; 0,186) | flacher, überraschender |

Eigenschaften:
- Die **Reihenfolge** der Kandidaten bleibt immer gleich; nur die Abstände ändern sich.
- Für T → 0 nähert sich das Sampling dem [Greedy](greedy.md)-Verfahren; für sehr große T wird die Verteilung fast
  gleichmäßig.
- Die Temperatur ändert **weder** die Tokens noch das Modell noch die Logits selbst – nur, wie gezogen wird
  (Regressionstest T10).

**Herkunft:** Die Form `exp(−E / (k·T))` ist die Boltzmann-Verteilung der Physik [Boltzmann1868][Uffink2024]. Setzt man
E = −z und k = 1, steht genau Softmax mit Temperatur da. Auch in Rechenverfahren regelt eine „Temperatur“, wie viel
Zufall erlaubt ist, etwa beim Simulated Annealing [Kirkpatrick1983].

Die feste Division durch √d_k in der Attention wirkt ähnlich, ist aber Teil des Bauplans, kein Regler beim Ziehen
([Skalierung mit √d](skalierung-wurzel-d.md)).

## Figur in Kontextia

**Tempi Temperatur** (Marktgilde; **er**): orangefarbener Reglerkörper. Schloss **SC-Buchse**, Schlüssel **SC-Dreieck** – gestreckt
(T < 1) oder gestaucht (T > 1). Lios Dreiecke passen in Tempis Schloss (Freundeslinie, KANON §5). Über die gemeinsame
Urahnin, die Boltzmann-Verteilung, ist er der **Vetter von Sofi** (Erfindungsahnen-Linie).

## Im Spiel

L05 (Snake): Das Glücksrad wird mit Tempis Regler gleichmäßiger oder spitzer. Lios Prahlerei „Hitze macht schlau!“ wird im
Spiel widerlegt: Bei hoher Temperatur steigt die Zahl unpassender Früchte. Bei sehr niedriger Temperatur gerät die Schlange
**im kleinen Übungsmarkt** (Zwei-Wort-Markt) sicher in eine Wiederholungsschleife; im großen Markt des Abschnitts B′ nur
**manchmal** – vorher weiß das niemand (Zielwert für den Regelkern: z. B. 3 von 10 Anfängen) [DE 11.10. Didaktik].

## Hier endet das Bild

„Kreativ“ und „langweilig“ sind menschliche Urteile. Temperatur ist nur eine **Formverzerrung der Verteilung**. Sie macht
nicht klüger, nicht wahrer und nicht kreativer im menschlichen Sinn. Auch ein kalter, spitzer Markt ist kein Schutz vor
Fehlern: Ein spitzes Rad kann genauso Nebel ziehen ([Halluzination](halluzination.md)) [DE 11.10. Didaktik].

## Häufige Irrtümer

- „Hohe Temperatur = intelligentere Antworten.“ – Nein.
- „Temperatur 0 ist eine normale Einstellung der Formel.“ – Durch 0 kann man nicht teilen; Bibliotheken behandeln das
  als Greedy-Sonderfall oder verlangen T > 0.
- „Temperatur ändert die Tokenzerlegung.“ – Nein.
- „Temperatur wirkt auch auf Greedy.“ – Greedy nimmt immer den größten Logit, egal welches T.
- „Niedrige Temperatur führt immer in eine Endlosschleife.“ – Nur in sehr kleinen Märkten sicher. In großen Modellen werden
  Wiederholungen wahrscheinlicher, sind aber kein Gesetz [Holtzman2019][Xu2022]. [DE 11.10. Didaktik]
- „Temperatur 0 heißt: keine erfundenen Antworten.“ – Nein, auch die wahrscheinlichste Fortsetzung kann falsch sein.

## Verwandte Begriffe

[Logits](logits.md) · [Softmax](softmax.md) · [Sampling und Seed](sampling-seed.md) · [Greedy](greedy.md) ·
[Top-k](top-k.md) · [Top-p](top-p.md) · [Skalierung mit √d](skalierung-wurzel-d.md) · [Halluzination](halluzination.md)

## Quellen

[Boltzmann1868], [Uffink2024], [Kirkpatrick1983], [HF-Generation], [HF-GenConfig], [Holtzman2019], [Xu2022] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
