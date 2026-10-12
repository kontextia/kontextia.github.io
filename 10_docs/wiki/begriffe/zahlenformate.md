# Zahlenformate (FP32, BF16, FP16, INT8, INT4)

**Stadttakt:** „Gepäck“ – wie fein die Stadt ihre Zahlen speichert · **Welt:** L08 Stufengebirge (Bit-Kong) · **Figuren:** Seda Sechzehn (FP16), Quanta Vierbit (4 bit); Ahnenporträts Frieda Zweiunddreißig (FP32), Bruni Brainfloat (bfloat16), Ingo Acht (INT8) · **Anschluss:** B – Stufenzahn (Treppenkante, Stufenzahl = Wertestufen; Türkisviolett, Glyphe ▤)

## Kurz für Kinder (Teil 1)

Jede Zahl der Stadt muss irgendwo aufgeschrieben werden. Mit vielen Kästchen (Bits) wird sie sehr genau, braucht aber viel
Platz – wie ein Foto mit Millionen Farben. Mit wenigen Kästchen ist sie gröber, aber leicht – wie eine **Retro-Pixelpalette**
mit 16 Farben. Im Stufenvolk streiten sie gern, wer „besser“ ist. Die Antwort: Es kommt darauf an, wie viel in die Kiste passt.

## Genauer (Teil 2)

**Gleitkommazahlen** speichern Vorzeichen, Exponent (Größenordnung) und Mantisse (Feinheit):

| Format | Vorzeichen · Exponent · Mantisse | größter Wert | Feinheit (ca.) | Herkunft |
|---|---|---|---|---|
| FP32 (binary32) | 1 · 8 · 23 | ≈ 3,40 · 10³⁸ | 7 Dezimalstellen | IEEE 754-1985 [IEEE754-1985] |
| bfloat16 | 1 · 8 · 7 | ≈ 3,4 · 10³⁸ | 2–3 Stellen | Google Brain; beschrieben 2019 [Wang2019][Kalamkar2019] |
| FP16 (binary16) | 1 · 5 · 10 | 65.504 | 3–4 Stellen | IEEE 754-2008 [IEEE754-2008][Moler2017] |

Die Bitaufteilung und Grenzwerte entsprechen Tabelle 1 bei Kalamkar et al. [Kalamkar2019]. **bfloat16 sind die oberen 16 Bit
eines FP32-Werts** – gleicher Exponent, also gleicher Wertebereich, nur kürzere Mantisse; die Umwandlung ist einfach
[Kalamkar2019][Wang2019]. FP16 hat dagegen eine **längere Mantisse, aber einen kleinen Bereich**.

Werte im Vergleich (eigene Rechnung): 0,1 → FP16 0,09998, bfloat16 0,10010. 70.000 → FP16 **Überlauf**, bfloat16 70.144.
0,00000001 → FP16 **0**, bfloat16 ≈ 1,0 · 10⁻⁸. Deshalb braucht FP16-Training Loss-Skalierung und eine FP32-Hauptkopie
[Micikevicius2017], bfloat16 meist nicht [Kalamkar2019].

**Ganzzahl- und 4-bit-Codes** sind keine eigenständigen Zahlen, sondern Stufen **mit Maßstab** s:
- **INT8:** 256 Stufen (−128 … 127), x̂ = s · q [Jacob2017]; für große Sprachmodelle mit gesonderter Behandlung von
  Ausreißern [Dettmers2022].
- **INT4:** 16 Stufen (−8 … 7) je Gruppe mit eigenem Maßstab [Frantar2022][Lin2023].
- **NF4:** 16 feste Werte, aus Quantilen der Normalverteilung, normiert auf [−1, 1] – passend für normalverteilte Gewichte
  [Dettmers2023].

Speicher eines 6,7-Milliarden-Modells: 26,8 GB (FP32) · 13,4 GB (16 bit) · 6,7 GB (8 bit) · 3,35 GB (4 bit) plus Maßstäbe.

## Figur in Kontextia

**Seda Sechzehn** (Stufenvolk) = **FP16**: silbervioletter Körper mit feinem **Messkamm** – die lange Mantisse; Schloss VEC-Mulde,
Schlüssel feine VEC-Kugel. **Quanta Vierbit** = 4 bit: 16 sichtbare Stufen. In der Ahnengalerie: **Frieda Zweiunddreißig** (FP32),
**Bruni Brainfloat** (bfloat16, Friedas obere Hälfte – die einzige echte Bitmuster-Abstammung im Stufenvolk), **Ingo Acht** (INT8).
FP16 und bfloat16 sind Cousinen, nicht Mutter und Tochter (siehe [Stammbaum](../../../01_design/v2/STAMMBAUM.md), Teilbaum 3).

## Im Spiel

L08 (Donkey Kong): Aus Friedas Ahnenporträt rollen Zahlenfässer die Leiter hinab; jedes Fass muss auf der nächsten Sprosse landen
(Runden). Weniger Sprossen = leichteres Gepäck, aber ungenauer; die Textlänge ändert sich nicht (Test T18).

## Hier endet das Bild

Eine Farbpalette mit 16 Farben sieht grob aus. Ob ein Modell mit gröberen Zahlen schlechter wird, ist **nicht geraten, sondern
gemessen** – manchmal fast nicht, manchmal deutlich.

## Häufige Irrtümer

- „Weniger Bits = minderwertig.“ – Bei gleicher Gesamtbitzahl ist 4 bit oft der beste Kompromiss [DettmersZettlemoyer2022].
- „bfloat16 ist ein schlechteres FP16.“ – Andere Aufteilung: mehr Bereich, weniger Feinheit.
- „Quantisieren kürzt den Text.“ – Es ändert Bytes, nicht Tokens.

## Verwandte Begriffe

[Quantisierung](quantisierung.md) · [Ausreißer](ausreisser.md) · [Gewichts- vs. KV-Quantisierung](gewichts-vs-kv-quantisierung.md) ·
[Parameter und Gewichte](parameter-gewichte.md) · [Gradient](gradient.md)

## Quellen

[IEEE754-1985], [IEEE754-2008], [Moler2017], [Kalamkar2019], [Wang2019], [Micikevicius2017], [Jacob2017], [Dettmers2022],
[Frantar2022], [Lin2023], [Dettmers2023], [DettmersZettlemoyer2022] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
