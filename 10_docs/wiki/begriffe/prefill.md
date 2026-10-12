# Prefill

**Stadttakt:** der erste Takt einer Antwort · **Welt:** L06 Kästnerviertel („Morgenflut“) · **Figuren:** Kajo Cache, Kessa · **Anschluss:** K, V aller Prompt-Positionen → KV-Doppelschubladen

## Kurz für Kinder (Teil 1)

Morgens strömt die **ganze Frage auf einmal** in die Stadt – das ist die Morgenflut. Alle Bausteine der Frage laufen
gleichzeitig durch den Turm, und Kajo legt von jedem Schlüsselkamm und jedem Paket eine Kopie ins Archiv. Danach steht
Lios Punktetafel für das erste Antwortwort bereit. [DE 11.10. Didaktik: Rechenwort statt „weiß“]

## Genauer (Teil 2)

Prefill ist die erste Phase beim Generieren: Der **gesamte Prompt** wird in einem Durchlauf verarbeitet. Dabei

1. werden für **alle** Prompt-Positionen in **allen** Stockwerken K und V berechnet und im [KV-Cache](kv-cache.md) abgelegt,
2. wird die Verteilung für das **erste neue Token** berechnet.

Kwon et al. beschreiben diese „Prompt-Phase“ genau so: Der ganze Nutzerprompt geht hinein, berechnet wird die
Wahrscheinlichkeit des ersten neuen Tokens, und dabei entstehen die Key- und Value-Vektoren aller Prompt-Positionen
[Kwon2023]. Pope et al. verwenden für diese Phase den Begriff **„prefill“** [Pope2022].

Warum ist das schnell pro Token? Weil die Prompt-Tokens alle schon bekannt sind, können sie **parallel** gerechnet werden –
wie beim Training, mit [kausaler Maske](kausale-maske.md). Grafikprozessoren nutzen diese Parallelität gut. Die danach
folgende [Decode](decode.md)-Phase kann nur ein Token pro Schritt erzeugen.

Rechenbild (Spiel, L06-T2): Prompt mit 500 Tokens, Modell mit 12 Stockwerken. Prefill legt 500 · 12 = 6.000 K/V-Paare
(je Kopf) ins Archiv. Jeder spätere Decode-Schritt fügt nur 12 hinzu (eines je Stockwerk für das neue Token).

Praktische Folge: Die Wartezeit bis zum **ersten** Antworttoken wächst mit der Promptlänge (lange Dokumente im
[RAG](rag.md)-Prompt kosten hier Zeit), die Zeit **pro weiterem** Token hängt vor allem vom Decode ab.

## Figur in Kontextia

**Kajo Cache** füllt sein Archiv in der Morgenflut: Keylians K-Kämme in den K-Einwurf, Valos Pakete ins V-Paketdock.
**Kessa** vergibt die Adressreiter (ADR: Layer · KV-Kopf · Position · Seite). Bild: die Morgenflut, in der alle Prompttokens
gleichzeitig in die Stadt strömen (KANON §15).

## Im Spiel

L06 (Sokoban): Zu Beginn werden alle Kisten der Frage auf einmal ins Regal geschoben. Teil 2: Prefill- und Decode-Schritte
zählen; vorhersagen, wie viele Kisten das Archiv nach dem Prefill enthält.

## Hier endet das Bild

Eine Flut ist unordentlich. Prefill ist eine **geordnete Matrixrechnung**: Jede Position bekommt ihre Werte an ihrer Adresse,
und die Maske gilt auch hier – frühe Prompt-Tokens sehen keine späteren.

## Häufige Irrtümer

- „Beim Prefill wird die ganze Antwort berechnet.“ – Nur das erste neue Token.
- „Prefill lernt etwas über den Prompt.“ – Es speichert Zwischenergebnisse, keine Gewichte ändern sich.
- „Ohne Cache gäbe es kein Prefill.“ – Der erste Durchlauf über den Prompt ist immer nötig; der Cache bewahrt ihn auf.

## Verwandte Begriffe

[Decode](decode.md) · [KV-Cache](kv-cache.md) · [Autoregression](autoregression.md) · [Kausale Maske](kausale-maske.md) ·
[Kontextfenster](kontextfenster.md)

## Quellen

[Kwon2023], [Pope2022], [HF-KVCache] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
