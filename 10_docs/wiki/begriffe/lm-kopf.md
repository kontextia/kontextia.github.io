# LM-Kopf (Language-Model-Head, Readout)

**Stadttakt:** 11 · **Welt:** L05 Logitmarkt · **Figur:** Lio Logit · **Anschluss:** Schloss VEC-Mulde → Schlüssel SC-Dreiecke (eines je Vokabelfach)

## Kurz für Kinder (Teil 1)

Ganz oben am Turm nimmt Lio den vollen Bedeutungsrucksack und vergleicht ihn mit **jedem Wort** im Wörterbuch. Je besser
ein Wort zum Rucksack passt, desto mehr Punkte schreibt er an. Das macht er mit einer großen gelernten Tabelle.

## Genauer (Teil 2)

Der LM-Kopf ist eine lineare Abbildung vom letzten [Hidden State](hidden-state.md) (Breite d) auf das
[Vokabular](vokabular.md) (Größe V):

`z = Norm(x^L) · W_LM`, mit W_LM der Größe d × V.

Jede Spalte von W_LM gehört zu einem Token; der Logit dieses Tokens ist das **Skalarprodukt** des Rucksacks mit dieser
Spalte. Der LM-Kopf vergleicht also – ähnlich wie Q und K – Richtungen, nur diesmal gegen alle Tokens des Vokabulars.

Größe beim kleinsten GPT-2: 768 · 50.257 = 38.597.376 Zahlen [Radford2019].

**Weight Tying:** Viele Modelle verwenden für den LM-Kopf **dieselbe** Matrix wie für die Eingabe-Embeddings, nur
transponiert: W_LM = W_Eᵀ. Press und Wolf zeigten, dass die oberste Gewichtsmatrix eines Sprachmodells selbst ein gültiges
Wort-Embedding ist, und empfahlen das Teilen [Press2016]. Im Original-Transformer teilen sich die Embedding-Schichten und die
Matrix vor der Softmax die Gewichte [Vaswani2017]; GPT-1 schreibt die Ausgabe als `softmax(h · W_eᵀ)` [Radford2018]. Andere
Modelle haben einen getrennten LM-Kopf – das ist eine Entwurfsentscheidung.

Davor steht bei Pre-Norm-Modellen eine **finale Norm** (GPT-2 fügte sie nach dem letzten Block hinzu) [Radford2019].

Nicht verwechseln:
- **LM-Kopf ≠ Outputprojektion W_O.** W_O sitzt in **jedem** Stockwerk und schreibt zurück in den Residualstrom; der LM-Kopf
  sitzt **einmal** ganz oben und schreibt auf die Punktetafel ([Outputprojektion](outputprojektion.md)).
- **LM-Kopf ≠ Attention-Kopf.** „Kopf“ heißt hier nur „Aufsatz am Ende“.

## Figur in Kontextia

**Lio Logit** (Marktgilde): goldener Balkenkörper mit Vokabularfächern. Schloss **VEC-Mulde** (Nora reicht die final
polierte Perle), Schlüssel **SC-Dreiecke**. Pate: W_LM – bei Weight Tying ist es dasselbe Kartenbuch wie Emmis, nur
„rückwärts gelesen“ (Variante im [Stammbaum](../../../01_design/v2/STAMMBAUM.md)).

## Im Spiel

L05: Lio füllt seine Fächer; Teil 2 zeigt eine Mini-Matrix 4 × 6 und lässt ein Skalarprodukt je Fach nachrechnen. L07:
Im Training wird Lios Tafel mit dem richtigen nächsten Token verglichen.

## Hier endet das Bild

Lio „vergleicht mit jedem Wort“ – aber nicht mit Wortbedeutungen aus einem Lexikon, sondern mit gelernten Vektoren. Ein
hoher Score heißt „passt als Fortsetzung“, nicht „ist wahr“.

## Häufige Irrtümer

- „Der LM-Kopf wählt das Wort.“ – Er liefert nur Scores; gewählt wird am Glücksrad (oder per Greedy).
- „LM-Kopf und W_O sind dasselbe.“ – Nein.
- „Weight Tying haben alle Modelle.“ – Nein, nur manche.

## Verwandte Begriffe

[Logits](logits.md) · [Embedding](embedding.md) · [Vokabular](vokabular.md) · [Outputprojektion](outputprojektion.md) ·
[Normalisierung](normalisierung.md) · [Softmax](softmax.md)

## Quellen

[Press2016], [Vaswani2017], [Radford2018], [Radford2019] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
