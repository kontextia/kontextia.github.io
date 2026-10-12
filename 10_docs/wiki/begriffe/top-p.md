# Top-p (Nucleus Sampling)

**Stadttakt:** 12 · **Welt:** L05 Logitmarkt · **Figur:** Pio Top-p · **Anschluss:** Schloss W%-Schalen → Schlüssel Tropfen bis Summe ≥ p

## Kurz für Kinder (Teil 1)

Pio hat einen **Korb mit Summenanzeige**. Er legt die besten Kandidaten nacheinander hinein, bis der Korb „voll genug“
ist – zum Beispiel 80 Prozent. Mal passen dafür zwei Kandidaten hinein, mal zehn. Nur was im Korb liegt, kommt ins
Glücksrad. Pio ist aber **kein Reparateur**: Er ändert nur, *welche* Früchte ins Rad kommen. Einen Kreis bricht er nicht
sicher – und liegt die Schlussglocke außerhalb des Korbs, sperrt er sie sogar aus. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Holtzman et al. definieren die Top-p-Menge als **kleinste Menge** von Tokens, deren Wahrscheinlichkeiten zusammen
mindestens p ergeben; nur aus dieser „Nucleus“-Menge wird – nach Renormierung – gezogen [Holtzman2019].

Vorgehen:
1. Kandidaten nach Wahrscheinlichkeit absteigend sortieren.
2. Aufsummieren, bis die Summe ≥ p ist.
3. Alle übrigen streichen, renormieren, ziehen.

Rechenbeispiel: p-Grenze 0,8, Verteilung (0,50; 0,20; 0,15; 0,10; 0,05).
Kumuliert: 0,50 → 0,70 → **0,85 ≥ 0,8**. Drei Kandidaten bleiben; renormiert durch 0,85 →
**(0,588; 0,235; 0,176)**.

Bei einer spitzen Verteilung (0,90; 0,05; …) reicht schon **ein** Kandidat für p = 0,8; bei einer flachen Verteilung
können es viele sein. Genau das ist der Unterschied zu [Top-k](top-k.md): Die **Anzahl schwankt**, die Masse ist
festgelegt.

Hintergrund: Holtzman et al. beobachteten, dass das Maximieren der Wahrscheinlichkeit beim Generieren zu fadem und seltsam
repetitivem Text führt, während das Ziehen aus dem ganzen Schwanz der Verteilung unzuverlässige Tokens einschleust;
Nucleus Sampling schneidet den unzuverlässigen Schwanz ab [Holtzman2019]. In Bibliotheken heißt der Parameter meist
`top_p`; Temperatur, Top-k und Top-p lassen sich kombinieren [HF-Generation].

**Keine Reparatur für Schleifen [DE 11.10. Didaktik]:** Top-p filtert nur die Kandidaten eines Schritts. Ist die Wiederholung
selbst der wahrscheinlichste Kandidat, bleibt sie im Korb; Wiederholungen können sich zudem selbst verstärken [Xu2022]. Weil
Top-p unwahrscheinliche Kandidaten streicht, kann es auch das Ende-Token aussperren, wenn dessen Anteil klein ist. Ziehen statt
Greedy macht Schleifen seltener, verhindert sie aber nicht sicher.

## Figur in Kontextia

**Pio Top-p** (Marktgilde): halbkreisförmiger Korb mit **Summenanzeige**. Schloss **W%-Schalen**, Schlüssel **Tropfen bis Summe
≥ p**. Wie bei Kira liegt zwischen Pio und Edda die Ziehung am Glücksrad.

## Im Spiel

L05 (Snake): Pio „füllt den Korb“ – sichtbar mit Summenzeiger. In den Beispielrunden endet die Schlange mit Pio oft an der
Glocke – nicht, weil Pio Kreise bricht, sondern weil gezogen statt immer das größte Feld genommen wird; im großen Markt bleibt
eine Schleife möglich [DE 11.10. Didaktik]. Teil 2: denselben Testvektor mit Top-k und Top-p bearbeiten und vorhersagen, wie
viele Früchte bleiben (Regressionstest T11).

## Hier endet das Bild

Ein Korb hat eine feste Größe. Pios Korb hat eine feste **Füllmenge an Wahrscheinlichkeit**, aber keine feste Anzahl. Und
„im Korb“ heißt nicht „richtig“, sondern nur „wahrscheinlich genug“ – ein Korb voller wahrscheinlicher Früchte macht die
Antwort weder wahrer noch schleifenfrei.

## Häufige Irrtümer

- „Top-p behält immer gleich viele Kandidaten.“ – Nein, die Zahl variiert.
- „Top-p und Top-k sind dasselbe.“ – Das eine zählt Masse, das andere Köpfe.
- „p = 1 filtert stark.“ – p = 1 behält alle Kandidaten.
- „Der Grenzkandidat fliegt raus.“ – Der Kandidat, mit dem die Summe p erreicht oder überschreitet, bleibt drin.
- „Top-p repariert die Greedy-Schleife.“ – Nein. Es ändert nur, welche Früchte ins Rad kommen; es kann die Glocke sogar
  aussperren [DE 11.10. Didaktik].

## Verwandte Begriffe

[Top-k](top-k.md) · [Sampling und Seed](sampling-seed.md) · [Temperature](temperature.md) · [Greedy](greedy.md) ·
[Softmax](softmax.md) · [EOS](eos.md)

## Quellen

[Holtzman2019], [Xu2022], [HF-Generation] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
