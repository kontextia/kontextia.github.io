# EOS (Ende-Token, Stopkriterium)

**Stadttakt:** 13 · **Welt:** L05 Logitmarkt · **Figur:** Edda Ende · **Anschluss:** Schloss ID-Buchse (prüft auf Ende) → Schlüssel EOS-Halbring (Schlussglocke, Creme, Glyphe ◖)

## Kurz für Kinder (Teil 1)

Edda hat eine **Schlussglocke**. Nach jedem neuen Baustein schaut sie nach: Ist das der Schluss-Baustein? Dann läutet sie,
und die Antwort ist fertig. Sonst geht es zurück zum Hafen und das nächste Wort wird gebaut. Auch wenn der Zug voll ist,
ist Schluss.

## Genauer (Teil 2)

EOS („end of sequence“) ist ein [Sondertoken](sondertokens.md) im Vokabular, das das Ende eines Textes markiert. Im Training
stehen solche Marken an Textgrenzen, deshalb lernt das Modell, sie mit gewisser Wahrscheinlichkeit vorherzusagen, wenn ein
Text „fertig“ wirkt. In Beispieltexten des GPT-2-Berichts erscheint die Marke `<|endoftext|>` zwischen zwei Texten
[Radford2019].

Beim Generieren gibt es mehrere **Stopkriterien**, die die Anwendung prüft [HF-GenConfig]:

1. **Ende-Token:** Die neu gezogene ID ist eine der EOS-IDs (`eos_token_id`).
2. **Längenlimit:** Es wurden `max_new_tokens` neue Tokens erzeugt – oder das [Kontextfenster](kontextfenster.md) ist voll.
3. **Weitere Regeln** der Anwendung, z. B. Stoppzeichenfolgen.

Ablauf je Takt: Token ziehen → Edda prüft → **Ende** (Ausgabe abschließen) oder **weiter** (Token an die Folge hängen, nächster
Takt; siehe [Autoregression](autoregression.md)).

Beispiel: Prompt 40 Tokens, `max_new_tokens = 20`. Erscheint EOS als 13. neues Token, endet die Antwort nach 13 Tokens. Erscheint
EOS nie, endet sie nach 20 Tokens – möglicherweise mitten im Satz.

Die Wahrscheinlichkeit von EOS hängt wie bei jedem Token von Logits, Temperatur und Filtern ab: Bei Top-k kann EOS
herausgefiltert werden, wenn es nicht unter den besten k ist; bei Greedy kommt es nur, wenn es den höchsten Logit hat.

## Figur in Kontextia

**Edda Ende** (Marktgilde): cremefarbener **Halbring mit EOS-Marke**. Schloss: **ID-Buchse** – jede neue ID wird hineingesteckt und
geprüft. Schlüssel: **EOS-Halbring**, die Schlussglocke. Sie ist die Letzte im Stadttakt (Takt-Moment 13): „Glocke? Dann
Schluss. Sonst zurück in den Hafen.“

## Im Spiel

L05 (Snake): Edda läutet das Ende der Schlange. Teil 1: „Ein Wort nach dem anderen – bis die Glocke läutet.“ Teil 2: Antworten,
die am Längenlimit abgeschnitten werden, von solchen mit EOS unterscheiden. Finale Teil 1: Eddas Glocke beginnt das Lichterfest.

## Hier endet das Bild

Ein Punkt am Satzende ist ein sichtbares Zeichen. EOS ist eine **unsichtbare ID**, die meist nicht ausgegeben wird. Und „fertig“
heißt nicht „vollständig“ oder „richtig“ – nur, dass die Ziehung das Ende-Token ergab.

## Häufige Irrtümer

- „Das Modell weiß, wann es fertig ist.“ – Es sagt EOS mit einer Wahrscheinlichkeit vorher; gestoppt wird von der Anwendung.
- „Nur EOS beendet die Ausgabe.“ – Auch ein Längenlimit kann stoppen.
- „EOS kostet keinen Platz.“ – Im Kontext belegt auch es einen Platz.

## Verwandte Begriffe

[Sondertokens](sondertokens.md) · [Autoregression](autoregression.md) · [Kontextfenster](kontextfenster.md) ·
[Sampling und Seed](sampling-seed.md) · [Greedy](greedy.md) · [Token-ID](token-id.md)

## Quellen

[Radford2019], [HF-GenConfig], [HF-Generation] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
