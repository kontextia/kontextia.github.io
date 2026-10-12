# Skalarprodukt und Score

**Stadttakt:** 5 · **Welt:** L03 Sternwarte (Vergleichsplatz) · **Figuren:** Queria und Keylian (Kämme), Quirin (Kammprinzip) · **Anschluss:** Ergebnis SC – Punktdreieck mit Kerbe (gold, Glyphe ▲)

## Kurz für Kinder (Teil 1)

Fragekamm und Schlüsselkamm **greifen nicht ineinander** wie ein Schlüssel ins Schloss. Man legt sie auf dem Vergleichsplatz
**nebeneinander** und rechnet **Zahn für Zahn**: Zahnhöhe mal Zahnhöhe, dann alles zusammenzählen. Zeigen beide Zähne in
dieselbe Richtung, gibt es Pluspunkte; zeigen sie gegeneinander, Minuspunkte. Alle Punkte zusammen ergeben ein
**Punktdreieck**, das **stufenlos** leuchtet: hell, schwach, neutral – oder sogar dunkler als neutral, wenn die Summe negativ
ist. Ein „passt“ oder „passt nicht“ gibt es dabei nicht. [DE 11.10. Didaktik, KANON §6 Regel 3b]

## Genauer (Teil 2)

Das Skalarprodukt zweier Vektoren gleicher Länge ist `q · k = Σᵢ qᵢ · kᵢ`. Geometrisch gilt
`q · k = ‖q‖ · ‖k‖ · cos(Winkel)`: groß bei gleicher Richtung, null bei rechtem Winkel, negativ bei entgegengesetzter
Richtung.

In der Attention ist der **Score** zwischen Query-Position t und Key-Position j das skalierte Skalarprodukt
[Vaswani2017]:

`s_tj = q_t · k_j / √d_k`

Rechenbeispiel (Quirins 3 Zähne, d_k = 3, √3 ≈ 1,732): q = (1; 2; −1)

| Key | Zahnpaare | Skalarprodukt | Score nach /√3 |
|---|---|---|---|
| k₁ = (2; 0; 1) | 2 + 0 − 1 | 1 | 0,577 |
| k₂ = (1; 1; 0) | 1 + 2 + 0 | 3 | 1,732 |
| k₃ = (1; 2; 0) | 1 + 4 + 0 | 5 | 2,887 |

Scores sind **beliebige reelle Zahlen** – sie können negativ sein und über 1 liegen. Erst die [kausale Maske](kausale-maske.md)
(zukünftige Scores auf −∞) und [Softmax](softmax.md) machen daraus Gewichte zwischen 0 und 1. Für alle Positionen
zugleich schreibt man das als Matrix `S = Q·Kᵀ / √d_k`; bei n Positionen sind das n · n Scores – daher wachsen Rechenzeit
und Speicher der Attention quadratisch mit der Länge [Dao2022].

Warum durch √d_k geteilt wird, erklärt die Seite [Skalierung mit √d](skalierung-wurzel-d.md).

Vorläufer: Bahdanau et al. ließen ein Netz „weich“ nach relevanten Stellen des Eingangs suchen [Bahdanau2014]; der
Transformer machte daraus den schnellen Skalarprodukt-Vergleich.

## Figur in Kontextia

Der **Vergleichsplatz** in der Sternwarte [DE] ist ein Ort, keine Figur: Q- und K-Kamm haben laut KANON §6 kein eigenes
Schloss, sie treffen sich dort. Das Ergebnis ist ein **SC-Punktdreieck**, das in Miras SC-Buchse passt. **Quirin** erklärt
das Kammprinzip (Zahnhöhe = Zahlenwert, oben positiv, unten negativ).

## Im Spiel

L03 (Space Invaders): Der Score steht als Zahl über jedem Treffer, getrennt von der Strahlbreite (die später das Gewicht
zeigt). Abschnitt B′ **Blindprobe** [DE 11.10. Didaktik]: Alle Wortschilder werden überklebt; die Spielenden sagen vorher, ob
sich das Leuchten ändert – es ändert sich nichts. Merksatz: „Die Sternwarte sieht Kämme, keine Wörter.“ Teil 2: Spielende
rechnen Zahnpaare selbst und sagen die Rangfolge an einem neuen Satz voraus.

## Hier endet das Bild

Echte Schlüssel greifen ins Schloss oder nicht. Q- und K-Kämme tun das **nie**: Sie werden nebeneinander gelegt und
verrechnet. Der Score ist **stufenlos**, kann negativ sein und ist nie „richtig/falsch“; einen Klick für „passt“ gibt es nicht.
Ein hoher Score heißt nur „ähnliche Richtung“, nicht „wahr“, „verstanden“ oder „wichtig für die Antwort“. Und verglichen
werden Zahlen, keine Wörter (Blindprobe). [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Scores sind Prozente.“ – Nein, erst nach Softmax.
- „Ein negativer Score ist ein Fehler.“ – Nein, er bedeutet entgegengesetzte Richtung.
- „Q und K rasten ein, wenn sie zueinander passen.“ – Nein, sie werden nebeneinander gelegt und verrechnet; heraus kommt eine
  Zahl, kein An/Aus [DE 11.10. Didaktik].
- „Der höchste Score bekommt alles.“ – Softmax verteilt auf alle erlaubten Keys.
- „Score und Logit sind dasselbe.“ – Beides sind Punktdreiecke (SC), aber Scores vergleichen Positionen,
  [Logits](logits.md) bewerten Vokabeleinträge.

## Verwandte Begriffe

[Query](query.md) · [Key](key.md) · [Skalierung mit √d](skalierung-wurzel-d.md) · [Kausale Maske](kausale-maske.md) ·
[Softmax](softmax.md) · [Attentiongewicht](attentiongewicht.md) · [Vektor](vektor.md)

## Quellen

[Vaswani2017], [Bahdanau2014], [Dao2022] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
