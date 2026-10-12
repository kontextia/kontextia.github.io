# Value

**Stadttakt:** 4 und 6 (und 10: ab ins Archiv) · **Welt:** L03 Sternwarte, L06 · **Figur:** Valo Value · **Anschluss:** Schloss VEC-Mulde → Schlüssel V (Paket mit Henkel, mint); Gegenstück: Paketdock

## Kurz für Kinder (Teil 1)

Valo packt für jeden Baustein einen **Picknickkorb**. Jeder Baustein stellt sich dann einen **Picknickteller nach
Anteilen** zusammen: aus Körben mit hellem Kammlicht viel, aus anderen wenig. *Wie viel*, ergibt die Rechnung mit Frage- und
Schlüsselkamm. Was am Ende wirklich weitergegeben wird, ist aber der **Inhalt der Körbe** – nicht der Kamm.
[DE 11.10. Didaktik]

## Genauer (Teil 2)

Der Value ist die dritte Geschwister-Projektion:

`v_j = Norm(x_j) · W_V`

Nach Score, Maske und Softmax hat jede Position t Gewichte a_tj, die sich zu 1 summieren. Die Ausgabe des Kopfes ist die
**gewichtete Summe der Values** [Vaswani2017]:

`o_t = Σ_j a_tj · v_j`

Beispiel (Position 2 sieht Positionen 1 und 2): Gewichte (0,24; 0,76), Values v₁ = (1; 0), v₂ = (0; 1).
Ausgabe o = 0,24·(1; 0) + 0,76·(0; 1) = (0,24; 0,76).

Gegenprobe aus der Technischen Dokumentation (Test T06): Ändert man nur v₂ zu (2; 2), bleiben alle Scores und Gewichte
gleich, aber die Ausgabe wird 0,24·(1; 0) + 0,76·(2; 2) = (1,76; 1,52). **Wie stark** entscheiden Q und K, **was**
entscheidet V.

Die Values aller Köpfe werden danach aneinandergehängt und mit W_O projiziert ([Outputprojektion](outputprojektion.md)).
Values früherer Positionen landen im [KV-Cache](kv-cache.md). Bei [RoPE](rope.md) wird V nicht gedreht. Im Feinabstimmen
mit LoRA gehören W_Q und W_V zu den Matrizen, an denen typischerweise angesetzt wird – das Verfahren erlaubt aber auch
andere [Hu2021].

## Figur in Kontextia

**Valo Value** (Pakethof, „Der Inhalt zählt.“): mintfarbener Paketkörper mit V-Schublade. Schloss **VEC-Mulde**, Schlüssel
**V-Paket mit Henkel**. Seine Pakete docken im **V-Paketdock** oben an Kajo an. Patin ist W_V. Auflösung des Balkon-Dramas
in L03: „Dann teilen wir das Picknick nach Gewichten.“

## Im Spiel

L03: Sofi verteilt Anteilstropfen, Valos Pakete laufen sichtbar in eine Schale (Animation „Value-Mischung“: V bleibt
getrennt vom Kamm). Test T07: Die Ausgabe ist die numerisch gewichtete V-Summe.

## Hier endet das Bild

Ein Picknickkorb enthält Gegenstände. Ein Value ist ein **Vektor**, kein Wort und kein Satz. „Value“ heißt hier
„Inhalt der Mischung“, nicht „Wert“ im Sinne von wichtig oder wahr. Und niemand stellt den Teller absichtlich zusammen: Die
Anteile kommen aus Kammvergleich und Softmax. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Der Key wird weitergegeben.“ – Weitergegeben wird der Value.
- „V entscheidet, wohin geschaut wird.“ – Das tun Q und K; V liefert den Inhalt.
- „Value = Wahrheitswert.“ – Nein.
- „Hohes Gewicht heißt, das Paket ist richtig.“ – Nur, dass es stark beigemischt wird.

## Verwandte Begriffe

[Query](query.md) · [Key](key.md) · [Attentiongewicht](attentiongewicht.md) · [Self-Attention](self-attention.md) ·
[Outputprojektion](outputprojektion.md) · [KV-Cache](kv-cache.md)

## Quellen

[Vaswani2017], [Hu2021], [Alammar2018] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
