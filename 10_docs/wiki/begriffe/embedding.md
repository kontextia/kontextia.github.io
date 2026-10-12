# Embedding

**Stadttakt:** 2 · **Welt:** L02 Kartenwald / Bedeutungsgarten (Pac-Emmi) · **Figur:** Emmi Embedding · **Anschluss:** Schloss ID-Buchse → Schlüssel VEC (Bedeutungsperle, Opal, Glyphe ●)

## Kurz für Kinder (Teil 1)

Emmi hat ein dickes **Kartenbuch**. Zu jeder Bausteinnummer steht darin ein Ort in einer Bedeutungswelt – wie
Koordinaten in Minecraft. Toki bekommt diesen Ort als schimmernde Perle in den Rucksack. Bausteine mit ähnlicher
Bedeutung wohnen oft nah beieinander. Aber ein Wort zeigt in **viele Richtungen zugleich**: „Apfel“ ist Obst, rot – und auch
ein Firmenname. Jede flache Karte zeigt davon nur einen **Schatten**. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Ein Embedding ist ein gelernter [Vektor](vektor.md), der zu einer [Token-ID](token-id.md) gehört. Alle Embeddings
zusammen bilden die **Embedding-Tabelle** W_E mit V Zeilen (Vokabulargröße) und d Spalten (Modellbreite).
Nachschlagen heißt: `e = W_E[id]` [Vaswani2017]. Beim kleinsten GPT-2 sind das 50.257 · 768 = 38.597.376 gelernte
Zahlen [Radford2019].

Die Idee, Wörter als gelernte, verteilte Vektoren darzustellen, stammt aus neuronalen Sprachmodellen
[Bengio2003]; word2vec zeigte, dass Richtungen in diesem Raum Bedeutungsbeziehungen tragen können – berühmt:
Vektor(„King“) − Vektor(„Man“) + Vektor(„Woman“) liegt nahe bei Vektor(„Queen“) [Mikolov2013].

Ähnlichkeit misst man oft mit dem **Kosinus** des Winkels zwischen zwei Vektoren. Spielbeispiel mit 2 Achsen:
a = (0,9; 0,1), b = (0,8; 0,3), c = (−0,2; 0,9). Dann ist cos(a, b) ≈ 0,97 (sehr ähnlich) und cos(a, c) ≈ −0,11
(fast unabhängig).

Wichtig: Das Embedding ist nur der **Startwert**. Danach kommt die [Positionsinformation](positionsinformation.md)
hinzu, und jedes Stockwerk addiert etwas in den [Residualstrom](residualstrom.md). Das Wort „Bank“ startet in „Ich sitze
auf der Bank“ und „Ich gehe zur Bank“ mit **demselben** Embedding; erst die späteren
[Hidden States](hidden-state.md) unterscheiden sich durch den Kontext.

Bei manchen Modellen ist der [LM-Kopf](lm-kopf.md) dieselbe Matrix wie W_E, nur transponiert (Weight Tying)
[Press2016][Radford2018].

## Figur in Kontextia

**Emmi Embedding** (Kartografen): grüne abgerundete Raute mit Koordinatenstäben. Schloss **ID-Buchse**, Schlüssel
**VEC-Kugel**. Ihr Kartenbuch ist im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) ihre Patin (W_E); Olli hat es in
der Lernschmiede eingestellt (Schmiedelinie). Pippas Hausnummernring gleitet über die Perle (POS).

## Im Spiel

L02 (Pac-Man): Das Labyrinth ist die Bedeutungskarte; Toki läuft zur Adresse aus Emmis Kartenbuch. Teil 1: Ähnliches
wohnt nah. Abschnitt B′ [DE 11.10. Didaktik]: **„Schattenspiel“** – Vorhersage, ob Apfels Baum wandert, wenn man die Lampe dreht.
Im einen Schatten liegt „Apfel“ neben „Birne“, im anderen neben „Handy“; die Bäume selbst stehen still. Merksatz: „Ein Wort hat
viele Richtungen – jede Karte zeigt nur einen Schatten.“ Dazu die **Blindprobe**: Wortschilder überkleben – die Rechnung bleibt
gleich, denn die Stadt sieht Zahlen, keine Bedeutungen. Teil 2: Vektoren mit 4–8 Dimensionen, Kosinus-Ähnlichkeit und die
**Projektionstäuschung** einer 2D-Karte.

## Hier endet das Bild

Minecraft hat drei Achsen. Echte Embeddings haben Hunderte bis Tausende; jede 2D-Karte ist eine verzerrte Projektion.
Nähe auf der Karte kann täuschen. Ein Wort hat auch nicht **einen** Ort mit **einer** Bedeutung: Sein Vektor zeigt in viele
Richtungen zugleich, und jede Karte ist nur ein Schatten davon. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Jedes Wort hat genau einen Ort, und ‚Apfel‘ ist nur Obst.“ – Ein Vektor trägt viele Richtungen zugleich; welche zählt,
  zeigt sich erst im Kontext [DE 11.10. Didaktik].
- „Jede Achse hat einen Namen wie ‚Tier‘ oder ‚groß‘.“ – Meist nicht; Bedeutungen sind über viele Achsen verteilt.
- „Das Embedding enthält schon die Bedeutung im Satz.“ – Nein, es ist kontextfrei; Kontext kommt später.
- „Das Embedding ändert sich beim Antworten.“ – Nein, die Tabelle ist fest (Stadtwissen).
- „Die Suchvektoren im Quellenarchipel sind Emmis Perlen.“ – Meist nicht; siehe [Embedding-Suche](embedding-suche.md).

## Verwandte Begriffe

[Token-ID](token-id.md) · [Vektor](vektor.md) · [Positionsinformation](positionsinformation.md) ·
[Hidden State](hidden-state.md) · [LM-Kopf](lm-kopf.md) · [Embedding-Suche](embedding-suche.md) ·
[Parameter und Gewichte](parameter-gewichte.md)

## Quellen

[Bengio2003], [Mikolov2013], [Vaswani2017], [Radford2018], [Radford2019], [Press2016] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
