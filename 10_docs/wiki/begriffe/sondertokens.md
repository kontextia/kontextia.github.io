# Sondertokens

**Stadttakt:** 1 und 13 · **Welt:** L01 (Teil 2) und L05 · **Figuren:** Berta Bytepair (fügt sie ein), Edda Ende (erkennt das Ende) · **Anschluss:** ID; Edda: Schlüssel EOS (Halbring, Creme)

## Kurz für Kinder (Teil 1)

Manche Bausteine sind keine Wortstücke, sondern **Schilder**: „Hier fängt etwas an“, „Hier spricht jetzt jemand
anderes“ oder „Schluss!“. Edda Ende läutet ihre Glocke, sobald das Schluss-Schild auftaucht.

## Genauer (Teil 2)

Sondertokens sind Einträge im [Vokabular](vokabular.md), die nicht aus normalem Text zerschnitten werden, sondern eine
**Steuerbedeutung** haben. Sie bekommen wie alle Tokens eine [Token-ID](token-id.md) und eine gelernte
Embedding-Zeile. Typische Arten:

- **Ende/Trenner:** Ein Ende-Token ([EOS](eos.md)) zeigt, dass ein Text fertig ist. In Beispieltexten des
  GPT-2-Berichts erscheint die Marke `<|endoftext|>` zwischen zwei Texten [Radford2019]. Beim Generieren kann die
  Anwendung beim Ende-Token anhalten [HF-GenConfig].
- **Rollenmarken im Chat:** Ein Chat-Template wandelt Nachrichten mit den Rollen `system`, `user` und `assistant` in
  eine einzige Tokenfolge mit modellspezifischen Markierungen um [HF-Chat]. Daran „erkennt“ das Modell, wo der
  [Systemprompt](systemprompt.md) endet und die Frage beginnt.
- **Klassifikations- und Trennzeichen:** BERT setzt `[CLS]` an den Anfang und `[SEP]` zwischen Satzteile; beim
  Pretraining ersetzt `[MASK]` verdeckte Wörter [Devlin2018]. BERT ist ein bidirektionales Encoder-Modell und arbeitet
  ohne kausale Maske – ein Gegenmodell zu Kontextia.
- **Auffüllen und Unbekanntes:** Manche Tokenizer haben ein Füllzeichen für gleich lange Stapel und ein
  „unbekannt“-Zeichen. Bei Byte-Level-BPE ist „unbekannt“ fast nie nötig [Radford2019].

Wichtig: Sondertokens belegen **Plätze** im [Kontextfenster](kontextfenster.md) wie alle anderen. Welche es gibt und wie
sie aussehen, ist **modellspezifisch**; es gibt keinen weltweiten Standard.

## Figur in Kontextia

**Berta** legt die Schilder beim Zerschneiden an die richtigen Stellen (Teil 2 von L01). **Edda Ende**
(Marktgilde, cremefarbener Halbring mit EOS-Marke) hat eine **ID-Buchse**, prüft jede neue ID und gibt bei der
Ende-ID ihren **EOS-Halbring** (die Schlussglocke) aus. [DE-Vorschlag] Im Hafen erscheinen Rollenmarken als farbige
Wimpel an Tokis, damit Kinder sehen, wer „spricht“.

## Im Spiel

L01 Teil 2: Sondertokens fallen als eigene Steine in den Tetris-Schacht und kosten Platz. L05 (Snake): Die Schlussglocke
beendet die Schlange; alternativ stoppt ein Längenlimit.

## Hier endet das Bild

Ein Schild an einer Tür wird von Menschen gelesen und befolgt. Ein Sondertoken ist nur eine ID, auf die das Modell im
Training bestimmte Muster gelernt hat. Ob die Anwendung beim Ende-Token wirklich anhält, entscheidet die
Generierungseinstellung.

## Häufige Irrtümer

- „Sondertokens sind unsichtbar und kosten nichts.“ – Sie belegen Plätze und werden mitgerechnet.
- „Alle Modelle benutzen dieselben Marken.“ – Nein, jedes Modell hat eigene.
- „Rollenmarken sind ein Sicherheitsschloss.“ – Sie strukturieren den Text; sie garantieren keinen Schutz gegen
  [Prompt Injection](prompt-injection.md).

## Verwandte Begriffe

[Vokabular](vokabular.md) · [EOS](eos.md) · [Systemprompt](systemprompt.md) · [Kontextfenster](kontextfenster.md) ·
[Tokenizer und BPE](tokenizer-bpe.md) · [Kausale Maske](kausale-maske.md)

## Quellen

[Radford2019], [Devlin2018], [HF-Chat], [HF-GenConfig] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
