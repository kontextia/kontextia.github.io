# Positionsinformation

**Stadttakt:** 2 · **Welt:** L01, L02 (Positionspfad) · **Figur:** Pippa Position · **Anschluss:** Schloss Zählkerbe → Schlüssel POS (Ring mit Kerben, blau, Glyphe ◎; dockt als Ringrille um die Perle = „Saturnkugel“)

## Kurz für Kinder (Teil 1)

„Hund beißt Mann“ und „Mann beißt Hund“ haben dieselben Wörter – aber nicht denselben Sinn. Darum bekommt jeder
Baustein von Pippa einen **Hausnummernring**. So kann die Stadt mitrechnen, wer vorne und wer hinten steht.
[DE 11.10. Didaktik: Rechenwort statt „weiß“]

## Genauer (Teil 2)

Self-Attention vergleicht jede Position mit allen erlaubten anderen über Skalarprodukte – ohne Zusatzinformation wäre
ihr die **Reihenfolge egal**. Vaswani et al. schreiben deshalb, weil das Modell weder Rekurrenz noch Faltung hat, müsse
Information über die relative oder absolute Position eingespeist werden [Vaswani2017]. Es gibt mehrere Verfahren:

1. **Sinusförmig, additiv** [Vaswani2017]: `PE(pos, 2i) = sin(pos / 10000^(2i/d))`,
   `PE(pos, 2i+1) = cos(pos / 10000^(2i/d))`; der Vektor wird zum Embedding addiert. Beispiel mit d = 4:
   Position 1 → (0,841; 0,540; 0,010; 1,000), Position 2 → (0,909; −0,416; 0,020; 1,000). Vorne drehen sich die
   Werte schnell, hinten langsam – wie Sekunden- und Stundenzeiger.
2. **Gelernt, additiv:** Eine eigene Tabelle mit einer Zeile je Position; GPT-1 nutzte gelernte Positions-Embeddings
   statt der sinusförmigen [Radford2018]. Nachteil: Positionen jenseits der Tabelle gibt es nicht.
3. **Rotation (RoPE):** Statt etwas zu addieren, werden Query und Key je Position gedreht; das Skalarprodukt hängt dann
   vom **Abstand** ab [Su2021]. Siehe [RoPE](rope.md). LLaMA verwendet RoPE in jedem Stockwerk [Touvron2023].
4. **Abstandsstrafe (ALiBi):** Kein Positionsvektor, sondern ein Abzug vom Attention-Score, proportional zum Abstand
   [Press2021].

Für alle gilt: Die Positionsinformation ist **getrennt von der Token-ID**. Dieselbe ID an Position 3 und an Position 9
bekommt verschiedene Positionsanteile.

## Figur in Kontextia

**Pippa Position** (Kartografen): blauer Ringkörper mit Kerbenziffern. Schloss: **Zählkerbe** (sie zählt den Platz in der
Folge). Schlüssel: **POS-Ring**, der über Emmis Perle gleitet und in deren Ringrille sitzt (die Form zeigt nur den Datentyp;
durch den Ring fließt Zahlenlicht – KANON §6 Regel 3a [DE 11.10. Didaktik]). Bei RoPE-Modellen übernimmt
ihre Kollegin **Rosa Rotation** (Teil 2), die Q- und K-Kämme dreht.

## Im Spiel

L02 (Pac-Man): Positionsringe auf dem Positionspfad; Teil 1 zeigt, dass Vertauschen den Sinn ändert. Teil 2 zeigt
sinusförmige Positionen als Uhrzeiger und vergleicht mit RoPE (Rosa).

## Hier endet das Bild

Hausnummern sind einfache Zahlen. Echte Modelle nutzen **verschiedene Verfahren** (additiv, gelernt, Rotation,
Abstandsstrafe); die Nummern im Spiel sind keine universelle Implementierung.

## Häufige Irrtümer

- „Die Position steckt in der Token-ID.“ – Nein, sie wird getrennt eingebracht.
- „Ohne Positionen geht es auch.“ – Dann wäre die Reihenfolge für die Attention unsichtbar.
- „Alle Modelle addieren Positionsvektoren.“ – RoPE und ALiBi tun das nicht.
- „Die Position sagt, wie wichtig ein Wort ist.“ – Nein, nur wo es steht.

## Verwandte Begriffe

[RoPE](rope.md) · [Embedding](embedding.md) · [Self-Attention](self-attention.md) · [Kausale Maske](kausale-maske.md) ·
[Kontextfenster](kontextfenster.md) · [Hidden State](hidden-state.md)

## Quellen

[Vaswani2017], [Radford2018], [Su2021], [Press2021], [Touvron2023] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
