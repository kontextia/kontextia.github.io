# Sampling und Seed

**Stadttakt:** 12 · **Welt:** L05 Logitmarkt · **Figur:** Sofi Softmax am Glücksrad · **Anschluss:** W%-Tropfen rein → ID-Nummernzapfen raus (die „Ziehung“)

## Kurz für Kinder (Teil 1)

Sofi dreht ein **Glücksrad mit unterschiedlich großen Feldern**. Große Felder gewinnen oft, kleine selten – aber manchmal
eben doch. Wenn man das Rad immer mit demselben Schwung anstößt (dem **Seed**), kommt auch immer dasselbe heraus.
Wichtig: **Das Rad zieht immer ein Stück** – auch wenn kein Feld wirklich passt. Ein Feld „nichts“ gibt es nicht. Darum kann
mitten in der Stadt Nebel entstehen ([Halluzination](halluzination.md)). [DE 11.10. Didaktik]

## Genauer (Teil 2)

Sampling heißt: Das nächste Token wird **zufällig gemäß der Wahrscheinlichkeiten** gezogen – nach Temperatur und
eventuellen Filtern (Top-k, Top-p) [HF-Generation]. In der Transformers-Bibliothek schaltet `do_sample=True` das Sampling
ein; ohne es wird Greedy verwendet [HF-Generation][HF-GenConfig].

So zieht ein Computer, Schritt für Schritt:
1. Wahrscheinlichkeiten in eine feste Reihenfolge bringen, z. B. (0,665; 0,245; 0,090).
2. Kumulierte Grenzen bilden: 0,665 / 0,910 / 1,000 (die Felder des Glücksrads).
3. Eine Zufallszahl u zwischen 0 und 1 erzeugen, z. B. u = 0,70.
4. Das erste Feld wählen, dessen Grenze ≥ u ist: 0,665 < 0,70 ≤ 0,910 → **Kandidat 2**.

Über viele Ziehungen gewinnt Kandidat 1 in etwa 66,5 % der Fälle, Kandidat 2 in 24,5 %, Kandidat 3 in 9 %.

**Seed:** Computer erzeugen „Zufallszahlen“ mit einem Pseudo-Zufallsgenerator. Der Startwert (Seed) legt die ganze Folge
fest. Gleicher Seed, gleiches Modell, gleiche Einstellungen und gleiche Software/Hardware → gleiche Ziehungen. Das macht
Spielsituationen, Tests und Demos **wiederholbar** (Technische Dokumentation: „DecoderMini … gesetzter Zufallsseed“).
Auf echter Hardware können parallele Rechnungen trotzdem winzige Rundungsunterschiede erzeugen; Reproduzierbarkeit ist
deshalb an dieselbe Umgebung gebunden. Auf Servern kann das Ergebnis sogar davon abhängen, wie viele Anfragen gerade zusammen
gerechnet werden – auch bei Greedy [He2025]. [DE 11.10. Didaktik]

**Das Rad zieht immer [DE 11.10. Didaktik]:** Jede Ziehung liefert ein Token aus dem Vokabular. Eine eingebaute Option
„keine Antwort“ gibt es nicht; auch „Ich weiß es nicht“ ist nur eine Folge von Tokens, die wahrscheinlich genug sein muss, um
gezogen zu werden. Das ist ein Grund, warum Sprachmodelle flüssig Falsches erzeugen können ([Halluzination](halluzination.md)).

Warum überhaupt Zufall? Weil reines Maximieren zu faden, repetitiven Texten führen kann, während ungefiltertes Ziehen
unpassende Tokens aus dem langen Schwanz einschleust – beides beschreiben Holtzman et al. [Holtzman2019]. Sampling mit
Temperatur und Filtern ist ein Kompromiss.

## Figur in Kontextia

**Sofi Softmax** steht am Markt an der **Losbude** und dreht das Glücksrad. Die Ziehung ist der Ort, an dem W%-Tropfen zu einem
ID-Nummernzapfen werden – deshalb gibt es zwischen Kira/Pio und Edda keine direkte Freundeslinie. Hausspruch der Marktgilde:
„Jeder Zug ein neues Los.“

## Im Spiel

L05 (Snake): Glücksrad statt Gedankenlesen; mit festem Seed kann man eine Partie exakt wiederholen. Die Demo nutzt ebenfalls
einen festen Seed (recipeId, seed, actions). Abschnitt B′ „Hier steigt der Nebel auf“ [DE 11.10. Didaktik]: Vorhersage, ob
das Glücksrad „nichts“ ziehen kann – es zieht immer, und Nebel steigt auf. Merksatz: „Das Rad zieht immer – darum entsteht
Nebel mitten in der Stadt.“ Prolog L00: gleicher Anfang, drei Ziehungen, drei Fortsetzungen. Teil 2: Häufigkeiten über 100
Ziehungen auszählen und mit den Prozenten vergleichen.

## Hier endet das Bild

Ein echtes Glücksrad ist physikalisch zufällig. Der Computer-Zufall ist **berechnet**; mit festem Seed ist er vollständig
**wiederholbar**. Vorhersehbar ist er trotzdem nur so, dass man die ganze Rechnung laufen lässt
([Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md)). Und das Rad „weiß“ nichts über richtig oder falsch.

## Häufige Irrtümer

- „Sampling heißt, das Modell rät wild.“ – Es zieht nach gelernten Wahrscheinlichkeiten.
- „Gleiche Frage, gleiche Antwort.“ – Nur mit Greedy oder festem Seed (in derselben Umgebung).
- „Der Seed macht das Modell besser.“ – Er macht es nur wiederholbar.
- „Ein unwahrscheinliches Token kann nie kommen.“ – Mit kleiner Wahrscheinlichkeit doch, solange es nicht gefiltert ist.
- „Wenn nichts passt, zieht das Rad nichts.“ – Es zieht immer ein Token [DE 11.10. Didaktik].

## Verwandte Begriffe

[Softmax](softmax.md) · [Temperature](temperature.md) · [Top-k](top-k.md) · [Top-p](top-p.md) · [Greedy](greedy.md) ·
[Autoregression](autoregression.md) · [Halluzination](halluzination.md) ·
[Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md)

## Quellen

[HF-Generation], [HF-GenConfig], [Holtzman2019], [He2025] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L00 und L10 vergleichen reproduzierte Läufe mit neu gestarteten Seedsteinen und einem fortgesetzten Kugelstrom. Gleiche Antworten belegen keine Wahrheit. [Mehrmals fragen](mehrmals-fragen.md) berechnet die Übereinstimmung und benennt den Preis zusätzlicher Läufe.
