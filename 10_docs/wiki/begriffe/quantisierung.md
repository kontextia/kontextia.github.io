# Quantisierung

**Stadttakt:** „Gepäck“ · **Welt:** L08 Das Fest der kleinen Zahlen (Bit-Kong) · **Figur:** Quanta Vierbit · **Anschluss:** Schloss feine VEC-Mulde → Schlüssel Stufenkugel + Maßstab-Schild (B)

## Kurz für Kinder (Teil 1)

Quanta packt Zahlen in **nur 16 Stufen** – wie eine Retro-Spielkonsole mit 16 Farben. Damit man später ungefähr weiß, wie groß
die Zahl war, trägt sie ein **Maßstab-Schild**. Das Gepäck wird viel leichter und passt auf kleinere Rechenkisten. Ein bisschen
ungenauer wird es aber.

## Genauer (Teil 2)

Quantisierung stellt Zahlen mit **weniger Bits** dar, meist als ganzzahlige Codes plus Maßstab. Einfacher symmetrischer
4-bit-Lehrcodec (Technische Dokumentation):

`s = max|x| / 7`, `q = clip(round(x / s), −8, 7)`, Rückweg `x̂ = s · q`

Rechenbeispiel, Gruppe x = (0,12; −0,50; 0,31; 0,90):
- s = 0,90 / 7 = 0,1286
- q = (1; −4; 2; 7) – vier Zahlen zu je 4 Bit
- x̂ = (0,129; −0,514; 0,257; 0,900); größter Fehler 0,053

Kostenrechnung: 4 Werte · 4 Bit = 16 Bit Nutzdaten + ein 16-bit-Maßstab. Bei so kleinen Gruppen ist der Maßstab teuer; bei Gruppen
zu 64 Werten kostet ein 16-bit-Maßstab nur 0,25 Bit pro Wert. QLoRA nennt für 32-bit-Konstanten und Blockgröße 64 entsprechend
0,5 Bit pro Parameter und verkleinert das durch „doppelte Quantisierung“ der Maßstäbe [Dettmers2023].

Arten (Auswahl):
- **Nach dem Training** (post-training): Gewichte eines fertigen Modells werden umgerechnet, z. B. GPTQ (3–4 Bit, mit Näherung
  zweiter Ordnung) [Frantar2022] oder AWQ (schützt wichtige Kanäle anhand der Aktivierungen) [Lin2023].
- **Mit Training abgestimmt:** Jacob et al. kombinierten INT8-Inferenz mit einem passenden Trainingsverfahren [Jacob2017].
- **Was quantisiert wird:** Gewichte, Aktivierungen (z. B. W8A8 mit SmoothQuant [Xiao2022]) oder der KV-Cache – jeweils getrennt
  ([Gewichts- vs. KV-Quantisierung](gewichts-vs-kv-quantisierung.md)).

Wirkung: Ein 6,7-Milliarden-Modell schrumpft von 13,4 GB (16 bit) auf etwa 3,35 GB (4 bit) plus Maßstäbe. Dettmers und
Zettlemoyer fanden, dass 4 Bit bei gegebener Gesamtbitzahl fast immer den besten Kompromiss aus Modellgröße und
Genauigkeit liefert [DettmersZettlemoyer2022]. Ob und wie viel Qualität verloren geht, wird **gemessen**. Eine Geschwindigkeitssteigerung
gibt es nur mit passender Hardware und Software; die Lehrsimulation behauptet keinen realen Speedup.

## Figur in Kontextia

**Quanta Vierbit** (Stufenvolk): türkisvioletter stufiger **Prismakörper mit 16 sichtbaren Stufen** (= 4 Bit). Schloss **feine
VEC-Mulde** (nimmt z. B. Sedas feine FP16-Kugel auf), Schlüssel **Stufenkugel + Maßstab-Schild**. Im
[Stammbaum](../../../01_design/v2/STAMMBAUM.md) hat Quanta nur **Schwägerlinien**: zu den Gewichten, zum KV-Cache (Kajos Tante!) und zu
den Aktivierungen – sie wird angewendet, nichts stammt von ihr ab.

## Im Spiel

L08 (Donkey Kong): Jedes Zahlenfass muss auf einer Sprosse landen (Runden). Abschnitt B′ **„Meistens gleich, manchmal
nicht“** [DE 11.10. Didaktik]: Vorhersage, wie viele von 20 Antworten sich mit 4 bit ändern (Zielwert für den Regelkern: z. B. 18
gleich, 2 anders – eine davon wichtig). Merksatz: „Kleiner Fehler pro Zahl, manchmal große Wirkung – darum messen.“ Teil 2:
Maßstab s, clip/round, Ausreißer, Gruppenmaßstäbe als Metadaten, Bytebudget. Test T18: Quantisierung ändert das Bytebudget,
nicht die Tokenzahl.

## Hier endet das Bild

Eine Retro-Palette sieht man sofort. Der Fehler der Quantisierung ist oft unsichtbar klein – oder überraschend groß, etwa bei
**Ausreißern**. Er kann nur **gemessen**, nicht geraten werden.

## Häufige Irrtümer

- „4 bit ist das minderwertige Kind von 16 bit.“ – Nein, es ist eine Speicherform mit Maßstab; Qualität wird gemessen.
- „Kleiner ist immer besser.“ – Unter einer Grenze steigt der Fehler stark (Streit in L08).
- „Quantisierung kürzt den Kontext.“ – Bytes, nicht Tokens.
- „Gewichte quantisieren heißt automatisch auch Cache quantisieren.“ – Nein (Test T17).

## Verwandte Begriffe

[Zahlenformate](zahlenformate.md) · [Ausreißer](ausreisser.md) · [Gewichts- vs. KV-Quantisierung](gewichts-vs-kv-quantisierung.md) ·
[Parameter und Gewichte](parameter-gewichte.md) · [KV-Cache](kv-cache.md) · [Fine-tuning](fine-tuning.md)

## Quellen

[Jacob2017], [Frantar2022], [Lin2023], [Xiao2022], [Dettmers2023], [DettmersZettlemoyer2022], [HF-Quant] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L08 vergleicht zwanzig feste Fragen vor und nach dem Runden. Die Zahl der Wechsel hängt von der Packung ab; sie wird am Datensatz gemessen. Geschwindigkeit wird gesondert gemessen. Siehe [Gewinn und Preis](gewinn-und-preis.md).
