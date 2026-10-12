# Decode

**Stadttakt:** jeder weitere Takt nach dem Prefill · **Welt:** L06 Kästnerviertel („Abendprozession“), L05 · **Figuren:** Kajo Cache, Kessa · **Anschluss:** neues K, V → KV-Doppelschublade; gespeicherte KV → zurück in die Sternwarte

## Kurz für Kinder (Teil 1)

Nach der Morgenflut zieht die Antwort als **Prozession** ein: ein Baustein pro Glockenschlag. Für jeden neuen Baustein holt
Kajo die alten Kämme und Pakete aus seinem Archiv – so muss niemand die ganze Frage noch einmal durchrechnen.

## Genauer (Teil 2)

Decode ist die Phase, in der das Modell **ein Token pro Schritt** erzeugt. In jedem Schritt

1. geht nur das **neueste** Token durch alle Stockwerke,
2. werden für dieses Token Q, K und V berechnet; K und V kommen ins Archiv,
3. vergleicht seine Query sich mit **allen** gespeicherten Keys (alte aus dem Cache plus das neue) und mischt alle
   gespeicherten Values,
4. entsteht die Verteilung für das nächste Token, und der Kreislauf beginnt neu ([Autoregression](autoregression.md)).

Kwon et al. nennen dies die autoregressive Generierungsphase, die die übrigen Tokens nacheinander erzeugt [Kwon2023]. Sie ist
schwer zu parallelisieren, und Shazeer beschreibt die Kosten so: Beim inkrementellen Decodieren müssen die großen Key- und
Value-Tensoren immer wieder aus dem Speicher geladen werden – die **Speicherbandbreite** begrenzt [Shazeer2019].

Was der Cache spart – und was nicht (Spiel, L06-T2, 12 Stockwerke):
- **Ohne Cache:** Bei Token Nummer 501 müssten K und V für alle 501 Positionen in allen 12 Stockwerken neu berechnet werden.
- **Mit Cache:** Nur K und V für Position 501 werden neu berechnet (12 Paare je Kopf).
- **Trotzdem:** Die Attention des neuen Tokens liest **alle 501** Keys und Values. Je länger der Kontext, desto mehr wird gelesen;
  der Cache setzt die Attentionkosten nicht auf null (Technische Dokumentation, Test T13).

Gegenprobe (Test T12): Mit und ohne Cache kommt im deterministischen Modus **dasselbe** heraus (bis auf Rundung) – der Cache ist
eine Abkürzung, keine andere Rechnung.

Speicher-Tricks für Decode: Multi-Query- und Grouped-Query-Attention verkleinern die K/V-Tensoren [Shazeer2019][Ainslie2023];
PagedAttention verwaltet den wachsenden Cache in Seiten [Kwon2023]; KV-Quantisierung speichert ihn gröber [Hooper2024][Liu2024].

## Figur in Kontextia

**Kajo Cache** reicht bei jedem Glockenschlag die alten Doppelschubladen nach vorn („Was einmal gerechnet ist, rechnet man nicht
nochmal.“). **Kessa** findet sie über ihre Adressreiter. Bild: die Abendprozession (KANON §15).

## Im Spiel

L06 (Sokoban): Ohne Archiv müssen bei jedem neuen Token alle Kisten neu geschoben werden; mit Archiv nur eine pro Stockwerk – aber
das Regal wird voller. L05: Jede neue Frucht der Schlange ist ein Decode-Schritt.

## Hier endet das Bild

Eine Prozession läuft nur vorwärts. Beim Decode **schaut** das neue Token aber in jedem Stockwerk auf alle früheren zurück –
lesen kostet weiterhin Zeit. Und Kajos Schubladen sind Schmierzettel dieses einen Gesprächs: Nach dem Gespräch ist Kehraus
([KV-Cache](kv-cache.md)) [DE 11.10. Didaktik].

## Häufige Irrtümer

- „Decode rechnet die ganze Folge neu.“ – Mit Cache nur das neue Token.
- „Mit Cache ist die Attention gratis.“ – Gelesen wird weiterhin alles.
- „Decode ist schneller als Prefill.“ – Pro Schritt ja, aber es gibt einen Schritt je Antworttoken, und er nutzt die Hardware
  schlechter aus.

## Verwandte Begriffe

[Prefill](prefill.md) · [KV-Cache](kv-cache.md) · [Autoregression](autoregression.md) · [Self-Attention](self-attention.md) ·
[Gewichts- vs. KV-Quantisierung](gewichts-vs-kv-quantisierung.md)

## Quellen

[Kwon2023], [Shazeer2019], [Ainslie2023], [Hooper2024], [Liu2024], [HF-KVCache] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
