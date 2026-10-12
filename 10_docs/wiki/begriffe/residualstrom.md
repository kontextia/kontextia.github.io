# Residualstrom

**Stadttakt:** 2 bis 11 (Fluss durch den ganzen Turm) · **Welt:** L04 Die vielköpfige Werkstatt · **Figuren:** Ressi Residual (legt dazu), Toki (trägt den Rucksack) · **Anschluss:** VEC

## Kurz für Kinder (Teil 1)

Durch den Turm fließt ein **leuchtender Fluss**. Auf ihm fährt jede Tokenfigur mit ihrem Rucksack nach oben. In jedem
Stockwerk legt jemand etwas **dazu** – nichts wird weggeworfen oder ausradiert. Professor Quirin stolpert übrigens
ständig darüber.

## Genauer (Teil 2)

„Residualstrom“ (englisch *residual stream*) ist das Bild für den [Hidden State](hidden-state.md) einer Position, wie
er durch alle Stockwerke weitergereicht wird. Weil jede Teilschicht über eine
[Residualverbindung](residualverbindung.md) arbeitet, ist der Endzustand eine **Summe**:

`x^L = x⁰ + Σ (Beiträge aller Attention-Teile) + Σ (Beiträge aller FFN-Teile)`

Elhage et al. beschreiben den Residualstrom als **Kommunikationskanal**: Jede Schicht liest über ihre Gewichtsmatrizen
einen Teil davon und schreibt ihr Ergebnis additiv hinein; Attention-Köpfe kann man als unabhängige, additive
Operationen verstehen [Elhage2021]. Die Breite des Stroms bleibt in allen Stockwerken gleich (d, z. B. 768 bei GPT-1
[Radford2018]).

Rechenbild mit 3 Komponenten: Start x⁰ = (0,5; −0,2; 0,1). Stockwerk 1 (Attention) schreibt (0,1; 0,3; 0,0), FFN schreibt
(−0,2; 0,0; 0,4). Danach: x¹ = (0,4; 0,1; 0,5). Der Startwert steckt weiterhin vollständig in der Summe.

Folgen davon:
- Frühe Information (z. B. die Token-Identität) kann bis ganz oben erhalten bleiben.
- Spätere Stockwerke können Beiträge früherer **verstärken oder ausgleichen**, indem sie Gegenrichtungen addieren.
- Mehrstufige Muster wie Induktionsköpfe entstehen über zwei Stockwerke: ein Kopf schreibt etwas in den Strom, ein
  späterer Kopf liest es [Olsson2022].

## Figur in Kontextia

Der Strom ist kein Charakter, sondern ein **Ort** [DE]: der leuchtende Fluss im Turm der Schichten. **Ressi Residual**
(gelber Y-Körper mit Pluszeichen, zwei VEC-Mulden → eine VEC-Kugel) ist die Schleusenmeisterin, die Original und
Änderung zusammenführt. **Toki** fährt mit dem Rucksack auf dem Fluss. Quirins Running Gag: Er stolpert hinein.

## Im Spiel

L04 (Bomberman): Bomben (Köpfe, Fina) verändern den Fluss nur **additiv**; Teil 2 zeigt den Strom als Balkenreihe je
Stockwerk und den Induktionskreis über zwei Stockwerke. Test T09: Der Residualpfad addiert den Eingang, statt ihn zu
überschreiben.

## Hier endet das Bild

Ein Fluss transportiert Gegenstände, die man wieder herausfischen kann. Im Residualstrom liegen keine einzelnen Dinge,
sondern eine **Vektorsumme**; Beiträge überlagern sich. Und der Fluss „weiß“ nichts – er ist Rechnung.

## Häufige Irrtümer

- „Jedes Stockwerk ersetzt den Zustand.“ – Nein, es addiert.
- „Der Residualstrom ist ein Gedächtnis für frühere Gespräche.“ – Er existiert nur während eines Durchlaufs.
- „Die Stockwerke arbeiten an verschiedenen Strömen.“ – Alle schreiben in denselben Strom derselben Position.
- „Residualstrom und KV-Cache sind dasselbe.“ – Der Cache speichert K und V; der Strom ist der Zustand der Position.

## Verwandte Begriffe

[Residualverbindung](residualverbindung.md) · [Hidden State](hidden-state.md) · [Transformer-Block](transformer-block.md) ·
[Multi-Head-Attention](multi-head-attention.md) · [FFN / MLP](ffn-mlp.md) · [Normalisierung](normalisierung.md)

## Quellen

[Elhage2021], [Olsson2022], [He2015], [Radford2018] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
