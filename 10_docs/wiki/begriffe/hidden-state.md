# Hidden State

**Stadttakt:** 2 bis 11 · **Welt:** L02–L05 · **Figur:** Toki mit seinem Bedeutungsrucksack · **Anschluss:** VEC (Bedeutungsperle)

## Kurz für Kinder (Teil 1)

Toki trägt einen **Bedeutungsrucksack**. Am Anfang liegt darin nur Emmis Perle. In jedem Stockwerk des Turms kommt
etwas dazu: was aus den Picknickkörben der Nachbarn beigemischt wurde und was die Werkstatt gerechnet hat. Oben an der
Turmspitze ist der Rucksack voll mit Zahlen, aus denen Lio die Punkte für das nächste Wort rechnet. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Ein Hidden State ist der [Vektor](vektor.md), der eine Token-Position **an einer bestimmten Stelle im Netz** darstellt.
Man schreibt `x^ℓ_t`: Position t, nach Stockwerk ℓ. Es gibt also nicht *einen* Hidden State pro Token, sondern einen
pro Token **und** Stockwerk. Alle haben dieselbe Länge d.

Wie er sich verändert (Pre-Norm-Block [Xiong2020]):

1. Start: `x⁰_t = Embedding + Positionsinformation` (bei additiven Positionen).
2. Attention liest andere Positionen und schreibt dazu: `a = x + MHA(Norm(x))`.
3. FFN rechnet an der eigenen Position und schreibt dazu: `x_neu = a + FFN(Norm(a))`.
4. Nach dem letzten Stockwerk: finale Norm, dann [LM-Kopf](lm-kopf.md) → [Logits](logits.md).

Elhage et al. beschreiben diesen Weg als **Residualstrom**, in den jede Schicht additiv hineinschreibt [Elhage2021].

Warum das wichtig ist: Das Wort „Bank“ beginnt in „Ich sitze auf der Bank“ und „Ich hole Geld von der Bank“ mit
**demselben** [Embedding](embedding.md). Nach einigen Stockwerken unterscheiden sich die Hidden States, weil die
[Self-Attention](self-attention.md) Informationen von „sitze“ bzw. „Geld“ hineingemischt hat. Die Bedeutung im Satz steckt also im Hidden State, nicht in der ID.

Beim Generieren zählt am Ende nur der Hidden State der **letzten** Position: Aus ihm entsteht die Verteilung für das
nächste Token. Die Hidden States früherer Positionen werden über ihre K- und V-Werte weiter genutzt
([KV-Cache](kv-cache.md)).

## Figur in Kontextia

Der Hidden State ist **Tokis Bedeutungsrucksack** (ab L02) – Datentyp VEC, die Perle. Ressi legt in jedem Stockwerk
etwas hinein, Nora poliert ihn auf Standardmaß, und an der Turmspitze nimmt Lio ihn in seine runde Mulde auf.

## Im Spiel

L02: „Bank“ startet gleich, Kontext entscheidet später. L04: Der Rucksack wächst sichtbar Stockwerk für Stockwerk (Teil 2:
Werte je Layer als Balken). L05: Nur der letzte Rucksack geht auf den Markt.

## Hier endet das Bild

Ein Rucksack enthält Gegenstände, die man einzeln herausnehmen kann. Ein Hidden State ist eine Summe von Zahlen; man kann
nicht einfach „das Wort von vorhin“ herausholen. Er ist **kein Satz** und **kein Wahrheitslabel**.

## Häufige Irrtümer

- „Hidden State = Embedding.“ – Nur ganz am Anfang; danach ist er kontextabhängig.
- „Jedes Stockwerk überschreibt den Rucksack.“ – Nein, es addiert ([Residualverbindung](residualverbindung.md)).
- „Man kann im Hidden State ablesen, was das Modell denkt.“ – Teile davon lassen sich untersuchen, aber es gibt kein
  einfaches Ablesen.
- „Der Hidden State wird für spätere Gespräche gespeichert.“ – Nein, er existiert nur während der Rechnung.

## Verwandte Begriffe

[Residualstrom](residualstrom.md) · [Embedding](embedding.md) · [Self-Attention](self-attention.md) ·
[Transformer-Block](transformer-block.md) · [Normalisierung](normalisierung.md) · [KV-Cache](kv-cache.md)

## Quellen

[Elhage2021], [Xiong2020], [Vaswani2017], [Alammar2018] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
