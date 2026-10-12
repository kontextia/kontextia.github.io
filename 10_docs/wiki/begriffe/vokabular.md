# Vokabular

**Stadttakt:** 1 und 11 · **Welt:** L01 (Hafen) und L05 (Logitmarkt) · **Figuren:** Berta Bytepair (Regelheft), Lio Logit (Vokabularfächer) · **Anschluss:** ID (Eingang), SC je Vokabelfach (Ausgang)

## Kurz für Kinder (Teil 1)

Das Vokabular ist die große Kiste mit **allen Bausteinen**, die das Modell kennt. Jeder Baustein hat ein eigenes
nummeriertes Fach. Neue Bausteine kommen nicht dazu, während das Modell redet – die Kiste ist fertig gepackt.

## Genauer (Teil 2)

Das Vokabular ist die feste Liste aller [Tokens](token.md) mit ihren [Token-IDs](token-id.md). Es entsteht einmal
beim Trainieren des [Tokenizers](tokenizer-bpe.md) und bleibt danach unverändert. Seine Größe V bestimmt zwei Stellen im
Modell:

- **Eingang:** Die [Embedding](embedding.md)-Tabelle hat genau V Zeilen – eine je Token.
- **Ausgang:** Der [LM-Kopf](lm-kopf.md) liefert genau V [Logits](logits.md) – einen Score je Token.

Zahlen aus echten Modellen: GPT-1 nutzte ein BPE-Vokabular mit 40.000 Merges [Radford2018]; GPT-2 hat 50.257 Einträge
auf Byte-Basis, mit nur 256 Bytes als Grundalphabet, sodass kein Text „unbekannt“ bleibt [Radford2019].

Rechenbeispiel: Bei V = 50.257 und Modellbreite d = 768 (kleinstes GPT-2) hat die Embedding-Tabelle
50.257 · 768 = **38.597.376** Zahlen. Größeres Vokabular heißt: kürzere Tokenfolgen, aber größere Tabellen am Ein- und
Ausgang. Kleineres Vokabular heißt: kleinere Tabellen, aber mehr Tokens pro Satz. Beides ist eine Entwurfsentscheidung,
kein „besser“ oder „schlechter“.

Im Vokabular stehen auch [Sondertokens](sondertokens.md) wie ein Ende-Zeichen. Manche Tokenizer haben ein Zeichen für
„unbekannt“; Byte-Level-Verfahren brauchen es kaum, weil jedes Byte selbst ein Token ist [Radford2019].

## Figur in Kontextia

**Berta** trägt die Merge-Liste, aus der das Vokabular entstand. **Lio Logit** (Marktgilde) hat einen goldenen
Balkenkörper mit **Vokabularfächern**: Schloss eine runde VEC-Mulde, Schlüssel **ein SC-Dreieck je Fach**. So sieht man:
Am Ende des Takts bekommt jedes Wort im Vokabular eine Punktzahl – auch die, die gar nicht passen.

## Im Spiel

L01: Die Bausteinkiste am Hafen zeigt, welche Stücke es gibt. L05 (Snake): Jede Frucht ist ein Kandidat aus dem
Vokabular; die Punktetafel hat so viele Felder wie die Kiste.

## Hier endet das Bild

Eine Kiste kann man nachfüllen. Das Vokabular eines fertigen Modells nicht: Ein neues Token hätte keine gelernte
Tabellenzeile. Wer es erweitern will, muss die neuen Zeilen nachtrainieren.

## Häufige Irrtümer

- „Das Vokabular ist ein Wörterbuch mit Bedeutungen.“ – Es ist eine nummerierte Liste von Zeichenfolgen; Bedeutung steckt
  in den gelernten Vektoren.
- „Ein unbekanntes Wort kann das Modell nicht schreiben.“ – Bei Byte-Level-BPE lässt sich jedes Wort aus kleineren
  Stücken zusammensetzen.
- „Größeres Vokabular macht das Modell klüger.“ – Es ändert nur die Zerlegung und die Tabellengröße.

## Verwandte Begriffe

[Token](token.md) · [Tokenizer und BPE](tokenizer-bpe.md) · [Token-ID](token-id.md) · [Sondertokens](sondertokens.md) ·
[Embedding](embedding.md) · [LM-Kopf](lm-kopf.md) · [Logits](logits.md)

## Quellen

[Radford2018], [Radford2019], [Sennrich2016], [HF-Tokenizer] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
