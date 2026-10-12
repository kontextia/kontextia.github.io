# Greedy (gieriges Decoding)

**Stadttakt:** 12 · **Welt:** L05 Logitmarkt · **Figuren:** Lio Logit (Punktetafel), Kira mit k = 1 · **Anschluss:** SC → ID (größter Score wird zur Token-ID)

## Kurz für Kinder (Teil 1)

Greedy heißt: **Immer das Feld mit den meisten Punkten nehmen.** Kein Glücksrad, kein Zufall. Das klingt schlau – aber die
Schlange kann sich dann im Kreis drehen und immer dasselbe sagen. Im **kleinen Übungsmarkt**, der nur auf das letzte Wort
schaut, passiert das sicher. Im **großen Markt** passiert es nur manchmal – und vorher weiß niemand, wann.
[DE 11.10. Didaktik]

## Genauer (Teil 2)

Beim Greedy-Decoding wird in jedem Schritt das Token mit dem **größten Logit** gewählt:

`nächstes Token = argmax_i z_i`

Weil Softmax die Reihenfolge nicht ändert, ist das dasselbe wie die größte Wahrscheinlichkeit; Temperatur, Top-k und Top-p
spielen keine Rolle. In der Transformers-Bibliothek ist Greedy die **Standardstrategie**, solange kein Sampling eingeschaltet
ist [HF-Generation].

Beispiel: Logits (2; 1; 0) für („Sonne“, „Regen“, „Käse“) → immer „Sonne“, bei jedem Lauf.

Eigenschaften:
- **Deterministisch:** gleiche Eingabe, gleiches Modell → gleiche Ausgabe (bis auf numerische Feinheiten der Hardware).
- **Lokal statt global:** Greedy wählt in jedem Schritt das Beste, findet aber nicht unbedingt die insgesamt
  wahrscheinlichste **Folge**. Beispiel: Schritt 1 „A“ (0,6) oder „B“ (0,4). Nach „A“ sind die Fortsetzungen
  (0,5; 0,5), nach „B“ (0,9; 0,1). Greedy nimmt „A“ und kommt auf 0,6 · 0,5 = 0,30; die Folge „B + bestes“ hätte
  0,4 · 0,9 = 0,36. Die Beam-Search probiert deshalb mehrere Pfade parallel [Vaswani2017][HF-Generation].
- **Wiederholungen:** Holtzman et al. beobachteten, dass das Maximieren der Wahrscheinlichkeit beim Generieren zu fadem,
  seltsam repetitivem Text führt [Holtzman2019]. Xu et al. zeigen, dass sich Wiederholungen **selbst verstärken**: Je öfter
  ein Satz schon dasteht, desto wahrscheinlicher wird er erneut [Xu2022]. Das ist die „Schlange, die sich selbst beißt“.
- **Schleife: möglich, kein Gesetz [DE 11.10. Didaktik].** Hängt der Markt nur vom **letzten Wort** ab (Zwei-Wort-Markt in
  L05), muss Greedy irgendwann entweder die Schlussglocke ziehen oder ein Wort wiederholen – und ab dann läuft derselbe Kreis
  immer wieder. Ein echtes Modell sieht den ganzen bisherigen Text; dort ist eine Schleife wahrscheinlicher als beim
  Sampling, aber nicht zwangsläufig. Sampling, Top-p oder Wiederholungsstrafen machen Schleifen seltener – eine sichere
  Reparatur ist keine davon.

Greedy ist trotzdem nützlich, etwa wenn es eine eindeutige, kurze Antwort gibt oder wenn Ergebnisse exakt reproduzierbar
sein sollen. Für dasselbe Ziel mit Sampling gibt es den festen [Seed](sampling-seed.md).

## Figur in Kontextia

Keine eigene Figur. Im Spiel ist Greedy der **Hebel „immer höchster Score“** an Lios Punktetafel; gleichbedeutend ist Kira mit
k = 1. Lio prahlt in L05: „Der höchste Score gewinnt immer!“ – die Welt zeigt, wann das stimmt und wann nicht.

## Im Spiel

L05 (Snake der Möglichkeiten): Teil 1 vergleicht Glücksrad und „immer höchstes Feld“. Abschnitt B′ „Der große Markt“
[DE 11.10. Didaktik]: Vorhersage, wie oft sich die Greedy-Schlange bei 10 Anfängen beißt – im Zwei-Wort-Markt 10 von 10, im
großen Markt z. B. 3 von 10 (Zielwert für den Regelkern). Merksatz: „Im kleinen Markt sicher, im großen Markt möglich.“
Teil 2: Greedy-Schleifen finden und ausprobieren, was sie seltener macht (Temperatur, Top-p, Wiederholungsstrafe); Pio ist
dabei keine Reparatur ([Top-p](top-p.md)). Manuelle Auswahl durch die Spielenden ist ausdrücklich eine andere Betriebsart.

## Hier endet das Bild

„Gierig“ klingt nach Absicht. Greedy ist eine **Auswahlregel** der Anwendung; das Modell selbst liefert nur die Logits.

## Häufige Irrtümer

- „Greedy ist immer am besten.“ – Es ist nur lokal am besten (Fehlvorstellung von L05).
- „Greedy braucht Temperatur 0.“ – Greedy braucht gar keine Temperatur.
- „Greedy ist zufällig.“ – Nein, deterministisch.
- „Greedy führt unausweichlich in eine Endlosschleife.“ – Nur im kleinen Übungsmarkt sicher; in großen Modellen möglich, nicht
  zwangsläufig [DE 11.10. Didaktik].
- „Deterministisch heißt vorhersehbar.“ – Gleiche Eingabe gibt gleiche Ausgabe; welche, zeigt aber erst die Rechnung
  ([Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md)).

## Verwandte Begriffe

[Logits](logits.md) · [Sampling und Seed](sampling-seed.md) · [Top-k](top-k.md) · [Top-p](top-p.md) ·
[Temperature](temperature.md) · [Autoregression](autoregression.md) · [EOS](eos.md) ·
[Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md)

## Quellen

[HF-Generation], [Holtzman2019], [Xu2022], [Vaswani2017] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
