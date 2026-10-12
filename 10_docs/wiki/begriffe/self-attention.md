# Self-Attention

**Stadttakt:** 4–6 · **Welt:** L03 Sternwarte (Q-Invaders) · **Figuren:** Queria, Keylian, Valo, Mira, Sofi (das ganze Sternwarten-Ensemble) · **Anschluss:** VEC rein → VEC raus

## Kurz für Kinder (Teil 1)

**Picknickteller nach Anteilen:** Jeder Baustein stellt sich einen Teller aus allen erlaubten Körben zusammen – aus den
Körben der Bausteine vor ihm und aus seinem eigenen. Aus Körben, deren Kamm hell leuchtet, kommt mehr auf den Teller, aus
anderen weniger. So bekommt „Bank“ in „Ich sitze auf der Bank“ eine andere Mischung als in „Ich gehe zur Bank“ und rechnet
danach mit anderen Zahlen weiter. [DE 11.10. Didaktik: ersetzt „Wer hört wem zu? wie in einer Klasse“, das Zuhören und
Verstehen nahelegte; KANON §17]

## Genauer (Teil 2)

Self-Attention heißt: Queries, Keys und Values kommen **aus derselben Folge**. Für alle Positionen zugleich
[Vaswani2017]:

`Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k + M) · V`

Schritt für Schritt (ein Kopf):
1. `Q = X·W_Q`, `K = X·W_K`, `V = X·W_V` aus der normierten Darstellung X (Geschwister).
2. Scores `Q·Kᵀ / √d_k` – eine n × n-Tabelle ([Skalarprodukt und Score](skalarprodukt-score.md)).
3. Kausale Maske M addieren ([Kausale Maske](kausale-maske.md)).
4. Softmax je Zeile ([Attentiongewicht](attentiongewicht.md)).
5. Gewichtete Summe der Values.

Durchgerechnet für Position 3 mit q = (1; 2; −1) und Keys k₁ = (2; 0; 1), k₂ = (1; 1; 0), k₃ = (1; 2; 0):
skalierte Scores (0,577; 1,732; 2,887) → Gewichte (0,070; 0,223; 0,707). Mit Values v₁ = (1; 0), v₂ = (0; 1), v₃ = (2; 2)
ist die Ausgabe ≈ (1,484; 1,637).

**Kosten:** Die Score-Tabelle hat n · n Einträge; Rechenzeit und Speicher wachsen daher quadratisch mit der Folgenlänge
[Dao2022]. FlashAttention rechnet **exakt dieselbe** Attention blockweise mit weniger Speicherverkehr [Dao2022].

**Self vs. Cross:** Der Original-Transformer hatte zusätzlich Cross-Attention vom Decoder auf den Encoder [Vaswani2017].
Ein decoder-only Modell wie in Kontextia nutzt **nur kausale Self-Attention**.

**Herkunft:** Bahdanau et al. führten weiche, gewichtete Aufmerksamkeit für die Übersetzung ein [Bahdanau2014]; der
Transformer baute ein ganzes Modell daraus ohne Rekurrenz [Vaswani2017].

Self-Attention ist der einzige Teil des Blocks, in dem **Positionen miteinander Information austauschen**. Das
[FFN](ffn-mlp.md) arbeitet danach an jeder Position allein.

## Figur in Kontextia

Die **Sternwarte** im Turm der Schichten: Queria (Q), Keylian (K) und Valo (V) werden aus derselben Perle geprägt,
Mira sperrt die Zukunft, Sofi verteilt, Valos Pakete werden gemischt. Hedra macht daraus mehrere Köpfe, Oskar fügt
zusammen.

## Im Spiel

L03 (Space Invaders) als Ganzes. Teil 1: Wessen Kamm ähnlicher ist, leuchtet stärker (stufenlos); Zukunft ist gesperrt;
der Kuchen wird verteilt; der Inhalt kommt aus dem Paket. Abschnitt B′ [DE 11.10. Didaktik]: **Blindprobe** (Wortschilder
überkleben – das Leuchten bleibt gleich) und **„Volle Halle, dünner Kuchen“** (kommen viele ähnlich passende Balkone dazu,
wird jedes Stück dünner). Teil 2: Skalarprodukt, /√d, Softmax mit Exponenten, Maskenmatrix, Heatmap, gewichtete V-Summe.
Tests T04–T07.

## Hier endet das Bild

Niemand stellt den Teller absichtlich zusammen, und niemand versteht, was darauf liegt: Die Anteile kommen aus
**gelernten Vergleichen und Softmax**, die Körbe enthalten Zahlen. Die Sternwarte sieht Kämme, keine Wörter (Blindprobe).
Und anders als bei einem Picknick bedienen sich in jedem Stockwerk und Kopf **alle Bausteine gleichzeitig** nach festen
Formeln. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Die Wörter hören einander zu und verstehen sich.“ – Es werden Zahlen verglichen und gewichtet gemischt
  [DE 11.10. Didaktik].

- „Self-Attention schaut auf den ganzen Text, auch nach vorn.“ – Im kausalen Modell nur zurück.
- „Attention ist das ganze Modell.“ – FFN, Norm und Residual gehören dazu.
- „Mehr Aufmerksamkeit = besseres Verständnis.“ – Gewichte sind Anteile, kein Verständnis.

## Verwandte Begriffe

[Query](query.md) · [Key](key.md) · [Value](value.md) · [Kausale Maske](kausale-maske.md) · [Softmax](softmax.md) ·
[Multi-Head-Attention](multi-head-attention.md) · [Transformer-Block](transformer-block.md)

## Quellen

[Vaswani2017], [Bahdanau2014], [Dao2022], [Alammar2018] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
