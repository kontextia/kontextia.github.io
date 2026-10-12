# Top-k

**Stadttakt:** 12 · **Welt:** L05 Logitmarkt · **Figur:** Kira Top-k · **Anschluss:** Schloss W%-Schalen → Schlüssel genau k Tropfen

## Kurz für Kinder (Teil 1)

Kennst du die **Vorschläge über der Handytastatur**? Dort stehen nur die drei besten Wörter. Kira macht es ähnlich: Sie
lässt nur die k besten Kandidaten ins Glücksrad. Alle anderen müssen draußen bleiben.

## Genauer (Teil 2)

Top-k-Sampling behält die k Tokens mit den höchsten Wahrscheinlichkeiten, setzt alle anderen auf 0 und **renormiert**,
sodass die Summe wieder 1 ist; dann wird gezogen. Fan et al. nutzten dieses Verfahren für Geschichten mit k = 10
[Fan2018]; Bibliotheken bieten es als Einstellung `top_k` an [HF-Generation].

Rechenbeispiel: p = (0,50; 0,20; 0,15; 0,10; 0,05).

- k = 2: behalten (0,50; 0,20), Summe 0,70 → renormiert **(0,714; 0,286)**.
- k = 3: behalten (0,50; 0,20; 0,15), Summe 0,85 → (0,588; 0,235; 0,176).
- k = 1: nur der beste Kandidat – das ist [Greedy](greedy.md).

Kennzeichen: Top-k zählt **Kandidaten**, nicht Wahrscheinlichkeitsmasse. Ist die Verteilung sehr spitz
(z. B. 0,97 für einen Kandidaten), lässt k = 10 trotzdem neun unwahrscheinliche Kandidaten mitlaufen; ist sie sehr flach,
schneidet k = 10 vielleicht gute Kandidaten ab. Genau dieses Problem motivierte [Top-p](top-p.md) [Holtzman2019].

Reihenfolge im Spiel: Kira filtert die Tropfen, die Sofi aus den Logits gemacht hat, danach wird renormiert. Viele
Bibliotheken setzen stattdessen die gestrichenen **Logits** auf −∞ und wenden dann Softmax an – das Ergebnis ist dasselbe.

## Figur in Kontextia

**Kira Top-k** (Marktgilde): kammförmige kleine Figur mit **k-Zähler**. Schloss: **W%-Schalen** (nimmt Sofis Tropfen auf),
Schlüssel: **genau k Tropfen**. Zwischen Kira und Edda liegt die Ziehung am Glücksrad – eine direkte Andockung wäre eine
Typverletzung (W% passt nicht in Eddas ID-Buchse).

## Im Spiel

L05 (Snake): Kira „zählt Türen“ – nur k Früchte bleiben sichtbar. Teil 2: Top-k und Top-p am selben Testvektor
unterscheidbar rechnen (Regressionstest T11).

## Hier endet das Bild

Die Handytastatur zeigt Vorschläge, aber **du** wählst. Bei Top-k wählt das Glücksrad zufällig nach den renormierten
Anteilen – auch Platz 2 oder 3 kann gewinnen.

## Häufige Irrtümer

- „Top-k nimmt immer den besten.“ – Nur bei k = 1.
- „Top-k sammelt eine feste Wahrscheinlichkeitsmasse.“ – Das ist Top-p.
- „Nach dem Filtern stimmen die alten Prozente noch.“ – Es wird renormiert.
- „Top-k macht Antworten wahrer.“ – Es begrenzt nur unwahrscheinliche Ausreißer beim Ziehen.

## Verwandte Begriffe

[Top-p](top-p.md) · [Sampling und Seed](sampling-seed.md) · [Greedy](greedy.md) · [Temperature](temperature.md) ·
[Softmax](softmax.md) · [Logits](logits.md)

## Quellen

[Fan2018], [Holtzman2019], [HF-Generation] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
