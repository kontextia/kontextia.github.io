# Fine-tuning (Feinabstimmung)

**Stadttakt:** „Geschichte“ – nach dem Pretraining, vor der Nutzung · **Welt:** L07 Lernschmiede (Teil 2) · **Figur:** Olli Optimierer · **Anschluss:** G → Schraubendreher auf P

## Kurz für Kinder (Teil 1)

Nach dem großen Üben kann die Stadt schon viel. Beim Fine-tuning übt sie noch einmal **gezielt** – zum Beispiel, wie man höflich
auf Fragen antwortet. Olli dreht dabei nur noch wenig an den Schrauben, weil sie schon gut eingestellt sind.

## Genauer (Teil 2)

Fine-tuning heißt: Ein **bereits vortrainiertes** Modell wird mit neuen, meist kleineren und gezielten Daten **weitertrainiert**.
Die Gewichte starten nicht zufällig, sondern bei den Werten aus dem [Pretraining](pretraining.md).

Wegmarken:
- **ULMFiT:** Ein vortrainiertes Sprachmodell wird für Textklassifikation feinabgestimmt; mit nur 100 beschrifteten Beispielen
  erreichte es Ergebnisse, für die man ohne Vortraining etwa hundertmal mehr Daten brauchte [Howard2018].
- **GPT-1:** generatives Vortraining, danach diskriminatives Feinabstimmen je Aufgabe [Radford2018].
- **Anweisungs-Feinabstimmung:** InstructGPT begann mit überwachtem Feinabstimmen auf Demonstrationen von Menschen
  [Ouyang2022].

**Parameter-sparende Varianten:**
- **LoRA** friert die vortrainierten Gewichte ein und trainiert nur kleine Zusatzmatrizen niedrigen Rangs: statt W wird
  `W + B·A` benutzt, wobei B und A schmal sind. Bei GPT-3 175B sank die Zahl trainierbarer Parameter um den Faktor 10.000
  [Hu2021].
- **QLoRA** macht dasselbe über einem **4-bit-quantisierten**, eingefrorenen Modell (NF4) und ermöglichte das Feinabstimmen eines
  65-Milliarden-Modells auf einer einzelnen 48-GB-GPU [Dettmers2023].

Rechenbeispiel LoRA: Eine Matrix 4096 × 4096 hat 16.777.216 Gewichte. Mit Rang r = 8 braucht man B (4096 × 8) und A (8 × 4096):
2 · 4096 · 8 = **65.536** trainierbare Zahlen – 256-mal weniger.

**Abgrenzungen:**
- Fine-tuning ändert **Gewichte**; ein Prompt mit Beispielen (in-context) ändert keine [Brown2020].
- [RAG](rag.md) legt Wissen auf den Tisch; Fine-tuning verändert das Stadtwissen.
- Fine-tuning ist kein Kind des KV-Caches: Es ist ein Ausbildungsweg des vorhandenen Modells (Technische Dokumentation).

## Figur in Kontextia

**Olli Optimierer** mit fein eingestellter Lernratenskala; die Murmel rollt in ein kleines Tal neben dem großen. [DE-Vorschlag]
Bei LoRA steckt Olli kleine Zusatzschrauben neben die versiegelten großen – die alten bleiben unverändert.

## Im Spiel

L07-T2: Pre- und Fine-tuning als zwei Abschnitte der Murmelbahn; vorhersagen, was mit allgemeinem Wissen passiert, wenn man nur auf
einem engen Thema weitertrainiert (Überanpassung, siehe Vali).

## Hier endet das Bild

„Noch einmal üben“ klingt harmlos. Fine-tuning kann **auch Fähigkeiten verschieben** oder verschlechtern, wenn die neuen Daten
einseitig sind; deshalb prüft Vali mit unbekannten Aufgaben.

## Häufige Irrtümer

- „Fine-tuning passiert, wenn ich mit dem Modell chatte.“ – Nein, es ist ein eigener Trainingslauf. Aber Gespräche können je nach
  Anbieter und Einstellung gespeichert und **später** als Trainingsdaten für so einen Lauf dienen
  ([Mitschreiber](mitschreiber-datenschutz.md)) [DE 11.10. Didaktik].
- „Das Modell hat sich meine Beispiele gemerkt, also wurde es feinabgestimmt.“ – Meist ist das Tischwissen
  ([Tischlernen](tischlernen.md)): abgeräumt = weg [DE 11.10. Didaktik].
- „Fine-tuning fügt eine Datenbank hinzu.“ – Es ändert Zahlen.
- „Mit LoRA werden die Originalgewichte überschrieben.“ – Sie bleiben eingefroren; die Zusatzmatrizen kommen dazu.

## Verwandte Begriffe

[Pretraining](pretraining.md) · [Präferenz- und Feedbacktraining](praeferenztraining-rlhf.md) · [Training](training.md) ·
[Quantisierung](quantisierung.md) · [RAG](rag.md) · [Validierung und Überanpassung](validierung-ueberanpassung.md) ·
[Tischlernen](tischlernen.md) · [Mitschreiber](mitschreiber-datenschutz.md)

## Quellen

[Howard2018], [Radford2018], [Ouyang2022], [Hu2021], [Dettmers2023], [Brown2020] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
