# Gewichts- vs. KV-Quantisierung

**Stadttakt:** „Gepäck“ (Gewichte) und Takt 10 (Cache) · **Welt:** L08 (Teil 2), Bezug L06 · **Figuren:** Quanta Vierbit, Kajo Cache (Neffe), Seda Sechzehn · **Anschluss:** zwei getrennte Schwägerlinien: Quanta ═ Stellschrauben (P), Quanta ═ Kajos Archiv (KV)

## Kurz für Kinder (Teil 1)

Tante Quanta kann zwei verschiedene Dinge kleiner packen: die **Stellschrauben der Stadt** (die immer gleich bleiben) und **Kajos
Archivkisten** (die beim Antworten jeden Takt mehr werden). Das sind zwei verschiedene Koffer – wer den einen packt, hat den
anderen noch lange nicht gepackt.

## Genauer (Teil 2)

| | Gewichtsquantisierung | KV-Cache-Quantisierung |
|---|---|---|
| Was wird gespeichert? | Parameter (W_Q, W_K, W_V, W_O, FFN, Embedding, LM-Kopf) | K und V aller bisherigen Positionen je Stockwerk |
| Wann entsteht es? | einmal, nach dem Training (statisch) | bei jeder Anfrage neu, wächst mit jedem Token (dynamisch) |
| Größe hängt ab von | Parameterzahl | Stockwerke · KV-Breite · Kontextlänge · gleichzeitige Anfragen |
| Wann quantisiert? | einmal vorab, z. B. GPTQ, AWQ [Frantar2022][Lin2023] | laufend beim Ablegen, z. B. KIVI, KVQuant [Liu2024][Hooper2024] |
| Typische Besonderheit | wichtige Kanäle schützen [Lin2023] | Keys je Kanal, Values je Token quantisieren [Liu2024]; Keys vor der RoPE-Drehung [Hooper2024] |

Rechenbeispiel (LLaMA-7B-Größe [Touvron2023], 16-bit-Ausgangsformat):
- **Gewichte:** 6,7 Mrd. · 2 Bytes = 13,4 GB → mit 4 Bit ≈ 3,35 GB (+ Maßstäbe). Fest, unabhängig vom Gespräch.
- **KV-Cache:** 512 KiB pro Token → bei 2.048 Tokens 1 GiB, bei 8 gleichzeitigen Anfragen 8 GiB. Mit 2-bit-Cache wären es rechnerisch
  ein Achtel davon (+ Maßstäbe). Wächst mit jeder Anfrage und jedem Token.

Bei langen Kontexten oder vielen Nutzern kann der Cache **größer als die Gewichte** werden; KIVI nennt den Cache deshalb den neuen
Engpass beim Bedienen vieler Anfragen [Liu2024]. KVQuant zeigt, dass gröbere Cache-Zahlen sehr lange Kontexte auf vorhandener
Hardware praktisch möglich machen [Hooper2024].

**Unabhängigkeit (Test T17):** Gewichtsquantisierung ändert die Cache-Bitbreite nicht, und Cache-Quantisierung ändert die
Gewichts-Bitbreite nicht. Beides lässt sich einzeln ein- und ausschalten. Außerdem quantisiert man manchmal **Aktivierungen**
(z. B. W8A8) [Xiao2022] – ein dritter, wieder getrennter Fall.

**Was keines von beiden ändert:** die Zahl der Tokens, das [Kontextfenster](kontextfenster.md) des Modells und die
Antwort-Logik. Weniger Speicher kann längere Kontexte **auf derselben Hardware** möglich machen; die Kontextgrenze, für die ein
Modell gebaut und trainiert wurde, bleibt eine Eigenschaft des Modells.

## Figur in Kontextia

**Quanta Vierbit** hat zwei getrennte **Schwägerlinien** im [Stammbaum](../../../01_design/v2/STAMMBAUM.md): zu den Stellschrauben und
zu **Kajos** Archiv. Erzählerisch ist sie Kajos Tante (mütterlicherseits angeheiratet) – technisch passt das genau: Der Cache
**stammt nicht** von ihr ab, sie kann ihn nur kleiner packen.

## Im Spiel

L08-T2 (Bit-Kong) mit Bezug auf L06: zwei Frachtplätze mit getrennten Bytezählern – „Stadtwissen“ und „Archiv“. Spielende
quantisieren einen und sagen voraus, dass der andere unverändert bleibt.

## Hier endet das Bild

Zwei Koffer packen klingt gleich schwer. Gewichte und Cache verhalten sich aber **verschieden**: Gewichte sind fest und gut
vermessen; Cache-Werte entstehen ständig neu und haben eigene Verteilungen.

## Häufige Irrtümer

- „4-bit-Modell heißt auch 4-bit-Cache.“ – Nicht automatisch.
- „KV-Quantisierung macht das Kontextfenster größer.“ – Sie spart Speicher; das Fenster ist eine Modelleigenschaft.
- „Der Cache stammt von der Quantisierung ab.“ – Nein, Schwägerschaft.

## Verwandte Begriffe

[Quantisierung](quantisierung.md) · [KV-Cache](kv-cache.md) · [Ausreißer](ausreisser.md) · [Zahlenformate](zahlenformate.md) ·
[Parameter und Gewichte](parameter-gewichte.md) · [Decode](decode.md)

## Quellen

[Frantar2022], [Lin2023], [Liu2024], [Hooper2024], [Xiao2022], [Touvron2023], [HF-Quant], [HF-KVCache] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
