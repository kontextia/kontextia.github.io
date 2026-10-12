# Outputprojektion (W_O)

**Stadttakt:** 6 · **Welt:** L04 Die vielköpfige Werkstatt · **Figur:** Oskar Output · **Anschluss:** Schloss: mehrere kleine VEC-Mulden → Schlüssel: eine VEC-Kugel

## Kurz für Kinder (Teil 1)

Oskar ist ein **Trichter mit vielen Einläufen**. Jeder Kopf von Hedra wirft seine kleine Perle hinein. Oskar mischt alles
nach seinem Rezept und gibt **eine** Perle in Normalgröße heraus – passend für Ressis Mulde.

## Genauer (Teil 2)

Nach der [Multi-Head-Attention](multi-head-attention.md) liegen h Kopfausgaben der Breite d/h vor. Sie werden
aneinandergehängt (Concat, Breite d) und mit der gelernten Matrix W_O (d × d) multipliziert [Vaswani2017]:

`Attentionausgabe = Concat(head_1, …, head_h) · W_O`

Danach wird das Ergebnis über die [Residualverbindung](residualverbindung.md) zum Eingang addiert.

Größe bei GPT-1 (d = 768) [Radford2018]: W_O hat 768 · 768 = **589.824** Gewichte – in **jedem** der 12 Stockwerke eine eigene.

Zwei Sichtweisen, die mathematisch gleich sind:
1. **Concat, dann multiplizieren** (wie in der Formel).
2. **Jeder Kopf hat seinen eigenen Teil von W_O** (die zu ihm gehörenden d/h Zeilen); jeder Kopf projiziert für sich, und
   die Ergebnisse werden **addiert**. Elhage et al. betonen, dass Köpfe so als unabhängige, additive Beiträge zum
   Residualstrom verstanden werden können und dass die „concatenate and multiply“-Form dazu äquivalent ist [Elhage2021].

Kleines Beispiel mit zwei Köpfen der Breite 1 (d = 2): head_1 = 0,5, head_2 = −1, W_O = ((1; 0); (2; 1)).
Concat (0,5; −1) · W_O = (0,5·1 + (−1)·2; 0,5·0 + (−1)·1) = (−1,5; −1). Gleich: Kopf 1 trägt 0,5·(1; 0) = (0,5; 0) bei,
Kopf 2 trägt −1·(2; 1) = (−2; −1) bei; Summe (−1,5; −1).

Die Outputprojektion bringt die Mischung **zurück in den Residualstrom** – sie ist nicht der Ausgang des ganzen Modells.

## Figur in Kontextia

**Oskar Output** (Turmwerkstätten): petrolfarbener Trichter mit mehreren Einläufen. Schloss **mehrere kleine VEC-Mulden**
(für Hedras drei Kugeln), Schlüssel **eine VEC-Kugel**, die in Ressis zweite Mulde passt (Freundeslinien Hedra → Oskar →
Ressi). Pate ist W_O.

## Im Spiel

L04 (Bomberman): Die Explosionsmuster der Kopf-Bomben laufen in Oskars Trichter zusammen. Teil 2: Kopfbeiträge einzeln
ausblenden und sehen, wie sich die Summe ändert – oft nur wenig, denn ein einzelner Kopf fehlt meist kaum [Michel2019]
(L04 B′ „Ein Helm fehlt“) [DE 11.10. Didaktik].

## Hier endet das Bild

Ein Trichter vermischt einfach. W_O ist eine **gelernte Matrix**, die jede Kopfausgabe in eine bestimmte Richtung des
Residualstroms dreht und streckt. Oskar entscheidet nicht, welcher Kopf „recht hat“.

## Häufige Irrtümer

- „Oskar gibt die Antwort aus.“ – Nein, das ist der [LM-Kopf](lm-kopf.md) ganz oben (Lio).
- „Die Köpfe werden gemittelt.“ – Sie werden aneinandergehängt und projiziert (gleichbedeutend: je Kopf projiziert und
  summiert).
- „W_O ist in allen Stockwerken gleich.“ – Jedes Stockwerk hat ein eigenes W_O.

## Verwandte Begriffe

[Multi-Head-Attention](multi-head-attention.md) · [Residualverbindung](residualverbindung.md) ·
[Residualstrom](residualstrom.md) · [LM-Kopf](lm-kopf.md) · [Parameter und Gewichte](parameter-gewichte.md)

## Quellen

[Vaswani2017], [Radford2018], [Elhage2021], [Michel2019] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
