# Ausreißer (Outlier)

**Stadttakt:** „Gepäck“ · **Welt:** L08 (Teil 2) · **Figuren:** Quanta Vierbit und Seda Sechzehn; Nora Norm als Zeugin · **Anschluss:** VEC → Stufenkugel + Maßstab (B)

## Kurz für Kinder (Teil 1)

Stell dir vor, du sollst vier Kinder auf eine Messlatte mit nur 16 Strichen stellen – und eines davon ist ein **Riese**. Dann
müssen die Striche sehr weit auseinander, und alle anderen Kinder landen auf demselben untersten Strich. Ein einziger Riese
macht die Messlatte für alle anderen ungenau.

## Genauer (Teil 2)

Ein Ausreißer ist ein Wert, der **viel größer** ist als die übrigen in derselben Gruppe. Bei Quantisierung mit einem Maßstab je
Gruppe bestimmt der größte Betrag den Maßstab – und damit, wie grob die kleinen Werte werden.

Rechenbeispiel mit dem 4-bit-Lehrcodec `s = max|x| / 7`, `q = clip(round(x/s), −8, 7)`:

| Gruppe | Maßstab s | Codes q | Rückweg x̂ |
|---|---|---|---|
| (0,12; −0,50; 0,31; 0,90) | 0,129 | (1; −4; 2; 7) | (0,129; −0,514; 0,257; 0,900) |
| (0,12; −0,50; 0,31; **9,0**) | 1,286 | (0; 0; 0; 7) | (0; 0; 0; 9,0) |

Mit dem Ausreißer sind drei von vier Werten **ausgelöscht**.

Was die Forschung beobachtet:
- **LLM.int8():** In großen Sprachmodellen treten systematische Ausreißer-Merkmale in den Hidden States auf; sie werden ab etwa
  6,7 Milliarden Parametern entscheidend. Lösung: Die wenigen Ausreißer-Dimensionen werden in 16 Bit gerechnet, mehr als 99,9 %
  der Werte in 8 Bit [Dettmers2022].
- **SmoothQuant:** Aktivierungen sind wegen Ausreißern schwer, Gewichte leicht zu quantisieren; eine mathematisch gleichwertige
  Umskalierung verschiebt die Schwierigkeit von den Aktivierungen in die Gewichte [Xiao2022].
- **AWQ:** Nur etwa 1 % „wichtige“ Gewichtskanäle zu schützen, senkt den Fehler stark; welche wichtig sind, erkennt man an den
  Aktivierungen [Lin2023].
- **KVQuant:** isoliert Ausreißer je Vektor gesondert („dense-and-sparse“), um den KV-Cache unter 4 Bit zu bringen [Hooper2024].
- **Kleine Gruppen** helfen ebenfalls: Ein Ausreißer verdirbt dann nur seine eigene Gruppe, kostet aber mehr Maßstäbe
  [DettmersZettlemoyer2022].

## Figur in Kontextia

Kein eigener Charakter. Im Stufenvolk sind Ausreißer der „Riese auf der Leiter“ [DE-Vorschlag]. **Quanta** muss ihr Maßstab-Schild an
ihn anpassen, **Seda** (FP16) kommt mit ihm wegen des Exponenten besser zurecht. **Nora Norm** erscheint in L08, weil gut skalierte
Zahlen leichter zu stufen sind – auch wenn Normalisierung allein Ausreißer nicht verhindert.

## Im Spiel

L08-T2 (Donkey Kong): Ein Riesenfass verschiebt alle Sprossen; Spielende sagen vorher, welche Fässer auf null fallen, und probieren
Gegenmittel (kleinere Gruppen, Ausreißer gesondert speichern) mit sichtbarem Bytezähler.

## Hier endet das Bild

Ein Riese ist ein Störenfried. Ausreißer sind **keine Fehler** im Modell – sie tragen oft wichtige Information. Man darf sie nicht
einfach abschneiden; man muss sie gesondert behandeln.

## Häufige Irrtümer

- „Ausreißer sind Rauschen und können weg.“ – Sie sind oft entscheidend für die Qualität.
- „Mehr Bits lösen alles.“ – Sie helfen, kosten aber Speicher; gezielte Behandlung ist effizienter.
- „Ausreißer gibt es nur in Gewichten.“ – Auch in Aktivierungen und im KV-Cache.

## Verwandte Begriffe

[Quantisierung](quantisierung.md) · [Zahlenformate](zahlenformate.md) · [Gewichts- vs. KV-Quantisierung](gewichts-vs-kv-quantisierung.md) ·
[Normalisierung](normalisierung.md) · [Hidden State](hidden-state.md)

## Quellen

[Dettmers2022], [Xiao2022], [Lin2023], [Hooper2024], [DettmersZettlemoyer2022] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
