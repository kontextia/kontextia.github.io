# Überlagerung (Superposition)

**Stadttakt:** 2–11 (in jeder Perle, in jedem Stockwerk) · **Welt:** L04 Teil 2, Abschnitt B′ „Zwei Sender auf einer Frequenz“; Ausblick L02 (Preiskarte), L07 (Logbuch-Murmel), Finale Teil 2 (Absatz 3) · **Figuren:** Fina FFN (ihre zwei „Fächer“ sind eine Zahl), Emmi Embedding (Perlen) · **Anschluss:** VEC – das Zahlenlicht in der Perle, kein eigener Anschluss · Neue Seite [DE 11.10. Didaktik 2.2, KANON §17 „Überlagerung“, §21 L13, DIDAKTIK_REVISION §6a.3 G8]

## Kurz für Kinder (Teil 1)

Stell dir **mehrere Radiosender auf einer Frequenz** vor, leise übereinander. So ähnlich ist es in einer Perle: Sie hat
weniger Zahlen, als es Dinge gibt, die die Stadt auseinanderhalten muss. Darum teilen sich oft **mehrere Merkmale eine
Richtung**. Meistens stört das nicht, weil die Merkmale selten zusammen vorkommen. Kommen sie doch zusammen, wird es
**Rauschen**.

Im Wackelturm teilen sich **Mondschiff und Sternschiff eine einzige Zahl**. Steht nur ein Schiff im Satz, leuchtet Finas
passende Lampe. Stehen beide im Satz, bleiben beide Lampen dunkel – und „acht“ und „neun“ liegen gleichauf. Merksatz:
**„Zwei Sender auf einer Frequenz: einzeln klar, zusammen Rauschen.“**

Darum sind die Teile im echten Turm **selten sauber**: Die Figuren sind aufgeräumter als die Wirklichkeit.

## Genauer (Teil 2)

**Polysemantizität:** Einzelne Neuronen reagieren oft auf mehrere, nicht verwandte Dinge. Elhage et al. erklären das an
Spielzeugmodellen mit **Überlagerung**: Ein Modell kann mehr Merkmale speichern, als es Dimensionen hat, wenn die Merkmale
**spärlich** sind, also selten gleichzeitig vorkommen. Die Merkmale liegen dann in fast, aber nicht ganz rechtwinkligen
Richtungen; der Preis ist **Störung** (Interferenz), sobald mehrere zugleich aktiv sind. Ob ein Modell überlagert, hängt von
Spärlichkeit und Wichtigkeit der Merkmale ab – mit einem plötzlichen Umschlag („Phasenübergang“) [Elhage2022].

**Wieder auseinanderziehen:** Bricken et al. zerlegen die Aktivierungen eines kleinen Transformers mit „Dictionary Learning“
(einem spärlichen Autoencoder) in viele Richtungen; viele der so gefundenen Merkmale sind leichter zu deuten als einzelne
Neuronen [Bricken2023]. Merkmale werden also **gemessen und gefunden**, nicht vom Bauplan abgelesen.

**Rechnung im Kleinen (Finale Teil 2 §6.3a, exakt):** Drei Merkmale A, B, C teilen sich zwei Richtungen: A = (1; 0),
B = (−0,5; 0,866), C = (−0,5; −0,866). Gelesen wird mit „Richtung mal Perle, Negatives auf 0“.
- Nur A an → Perle (1; 0) → gelesen A **1**, B 0, C 0: sauber.
- A und B zugleich → Perle (0,5; 0,866) → gelesen A **0,5**, B **0,5**: beide nur halb so hell.
- Alle drei an → Perle (0; 0) → nichts mehr zu lesen.

**Spielmodell WT-1 (L04 §6.15, nachgerechnet):** Punkt-1 legt +0,8 für Mondschiff und −0,8 für Sternschiff in dieselbe Zahl
(T-Spur), gewichtet mit seiner Lichtwolke. S2 (nur Mondschiff): T = 0,8 · 0,8401 = 0,6721 → acht-Lampe 0,579 → „acht“ 85,2 %.
S6 (beide Schiffe): Wolke 44,9 % / 44,9 % → T = 0,8 · (0,449 − 0,449) = **0** → beide Lampen 0 → „acht“ 30,8 % = „neun“ 30,8 %.

Verwandt: Auch ein einzelnes Wort hat viele Richtungen zugleich („Apfel“: Obst, rot, Firmenname …) –
siehe [Embedding](embedding.md) (KANON §17).

## Figur in Kontextia

Keine eigene Figur [DE]. Sichtbar wird Überlagerung an **Finas Werkbank** im zweiten Stockwerk: Zwei ordentliche „Fächer“
(acht-Lampe fürs Mondschiff, neun-Lampe fürs Sternschiff) entpuppen sich durch Quirins Glas als **eine** Zahl. Fina im Outro:
„Meine zwei Fächer waren eine Zahl. Ich hab mich dran gewöhnt.“ Durch Quirins Glas sieht man nie ein sauberes Bauteil,
sondern ein Gewirr aus Lichtfäden (KANON §21 L13).

## Im Spiel

[L04](../../../01_design/v2/level/L04.md) Teil 2, Abschnitt B′ **„Zwei Sender auf einer Frequenz“**: Vorhersage für den neuen
Satz S6 mit beiden Schiffen; Stufe 3 rechnet T = 0 und die dunklen Lampen; Grenzen-Auswahl „Im echten Modell teilen sich oft
mehrere Merkmale eine Richtung“. L02 Preiskarte: Ausblick „Überlagerung“. L07 Logbuch-Murmel: Dort gehört jede Schraube sauber
zu einem Merkmal – in echten Modellen ist das verschmiert. [Finale Teil 2](../../../01_design/v2/level/FINALE_TEIL2.md) §6.3a:
gemischte Köpfe, Überlagerung im Kleinen und das „Überlagerungs-Gate“ am echten Türmchen.

## Hier endet das Bild

Radiosender kann man mit dem Drehknopf trennen, und jeder hat einen Namen. In der Perle gibt es keinen Drehknopf, und „ein
Merkmal“ ist ein Wort der Forschenden für eine **gefundene Richtung** – wie viele und welche man findet, hängt auch von der
Messmethode ab. Auch die Zeichenklassen im Finale sind unsere Etiketten; mehrfaches Anspringen ist ein Hinweis auf
Überlagerung, kein Beweis.

## Häufige Irrtümer

- „Jede Zahl einer Perle bedeutet genau eine Sache.“ – Oft teilen sich mehrere Merkmale eine Richtung [Elhage2022].
- „Jedes Neuron hat ein Fach mit einem Begriff.“ – Neuronen sind oft polysemantisch.
- „Überlagerung ist ein Baufehler.“ – Sie entsteht beim Training, weil sie Platz spart; ihr Preis ist gelegentliche Störung.
- „Man muss nur lange genug auf ein Teil schauen, dann sieht man, was es tut.“ – Forschende messen, statt Schilder zu lesen
  ([Ablation / Weglassprobe](ablation-weglassprobe.md)).

## Verwandte Begriffe

[Embedding](embedding.md) · [Vektor](vektor.md) · [FFN / MLP](ffn-mlp.md) · [Multi-Head-Attention](multi-head-attention.md) ·
[Residualstrom](residualstrom.md) · [Ablation / Weglassprobe](ablation-weglassprobe.md) ·
[Stockwerkslinse](stockwerkslinse-logit-lens.md) · [Bildbruch / Quirins Glas](bildbruch-quirins-glas.md)

## Quellen

[Elhage2022], [Bricken2023] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md); Spielzahlen aus L04 §6.15 und FINALE_TEIL2
§6.3a (exakt gerechnet)
