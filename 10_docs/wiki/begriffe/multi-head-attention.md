# Multi-Head-Attention

**Stadttakt:** 6 · **Welt:** L04 Die vielköpfige Werkstatt (Kopf-Bomber) · **Figur:** Hedra Köpfe · **Anschluss:** Schloss VEC-Mulde → Schlüssel drei kleine VEC-Kugeln (je Kopf)

## Kurz für Kinder (Teil 1)

Hedra hat **drei Helme** – wie **verschiedene Farbbrillen**, durch die man auf **denselben** Satz schaut. Durch jede Brille
sieht die Mischung anders aus: Mal kommt viel vom Wort direkt davor, mal von einem Wort weiter vorn. Welche Brille was zeigt,
hat niemand festgelegt – es ist gelernt und wechselt mit dem Satz. Am Ende werden alle Mischungen zusammengelegt. Fehlt ein
einzelner Helm, leuchtet die Brücke meist trotzdem, nur etwas anders. [DE 11.10. Didaktik: ersetzt „Detektivteam“, das feste
Berufe nahelegte; KANON §17]

## Genauer (Teil 2)

Statt einer großen Attention rechnet ein Block **h kleinere Attentions parallel** („Köpfe“), jede mit eigenen Matrizen
W_Q⁽ⁱ⁾, W_K⁽ⁱ⁾, W_V⁽ⁱ⁾ und Breite d_k = d / h [Vaswani2017]:

`head_i = Attention(X·W_Q⁽ⁱ⁾, X·W_K⁽ⁱ⁾, X·W_V⁽ⁱ⁾)`
`MHA(X) = Concat(head_1, …, head_h) · W_O`

Zahlen: Original-Transformer h = 8 Köpfe zu je 64 bei d = 512 [Vaswani2017]; GPT-1 12 Köpfe zu je 64 bei d = 768
[Radford2018]. Weil jeder Kopf kleiner ist, kostet Multi-Head insgesamt etwa so viel wie ein einzelner großer Kopf
[Vaswani2017].

Warum mehrere? Jeder Kopf hat **eine** Softmax-Verteilung pro Position. Mit mehreren Köpfen kann eine Position gleichzeitig
an verschiedene Stellen und nach verschiedenen Merkmalen schauen. Gefundene Muster in trainierten Modellen:

- **Vorgänger-Köpfe** und **Induktionsköpfe**: [A][B] … [A] → [B]; Induktionsköpfe arbeiten über zwei Stockwerke
  zusammen und gelten als Kandidat für einen Mechanismus des Lernens aus dem Kontext [Olsson2022].
- **Ankerköpfe / Attention Sinks**: viel Gewicht auf die ersten Tokens, auch ohne inhaltliche Bedeutung [Xiao2023].

Solche Muster werden in trainierten Modellen **gefunden, nicht gebaut**; sie sind oft auf mehrere Köpfe verteilt, gemischt und
vom Satz abhängig [DE 11.10. Didaktik].

**Ein Kopf fehlt:** Michel et al. entfernten Köpfe aus fertig trainierten Modellen. Viele ließen sich einzeln weglassen, ohne
dass die Leistung stark sank; manche Schichten kamen sogar mit einem einzigen Kopf aus [Michel2019]. Fehlt dagegen der ganze
Attention-Schritt, fehlt der Austausch zwischen Positionen vollständig.

**Speicher-Varianten:** Bei Multi-Query-Attention teilen sich alle Query-Köpfe **einen** Key/Value-Kopf [Shazeer2019],
bei Grouped-Query-Attention je eine Gruppe [Ainslie2023]. Das verkleinert den [KV-Cache](kv-cache.md) stark.

Nicht verwechseln mit **Mixture-of-Experts**: Dort wählt ein Gating-Netz wenige von vielen **FFN**-Experten aus
[Shazeer2017]; Köpfe dagegen arbeiten in jedem Block alle.

## Figur in Kontextia

**Hedra Köpfe** (Turmwerkstätten): drei abgerundete Helme auf gemeinsamer Basis. Schloss **VEC-Mulde**, Schlüssel **drei
kleine VEC-Kugeln** (eine je Kopf), die in Oskars Einläufe passen (Freundeslinie). Im Bild drei Köpfe; echte Modelle haben
oft Dutzende.

## Im Spiel

L04 (Bomberman): Kopf-Bomben mit unterschiedlichen Explosionsmustern = Aufmerksamkeitsmuster. Teil 1: Mehrere Köpfe schauen
in verschiedene Richtungen. Abschnitt B′ [DE 11.10. Didaktik]: **„Helm ohne Beruf“** – die Helme heißen nach Farbe und Platz;
den Spitznamen gibt das Kind („Nachbarhelm“) und muss ihn im nächsten Satz zurücknehmen, weil derselbe Helm dort weit nach
hinten verteilt. **„Ein Helm fehlt“** – ohne einen Helm leuchtet die Brücke weiter, nur etwas anders; ohne die ganze Werkstatt
bleibt sie dunkel. Merksätze: „Helme haben Gewohnheiten, keine Berufe.“ / „Ein Helm fehlt: anders. Ein ganzer Schritt fehlt:
dunkel.“ Teil 2: Vorgänger-Kopf, Ankerkopf (Attention Sink), Induktionskreis über zwei Stockwerke – gefunden, nicht gebaut.
Streit der Welt: Jeder Helm will allein entscheiden – gelöst wird er, wenn alle Mischungen zusammenkommen.

## Hier endet das Bild

Eine Farbbrille hat eine feste Farbe. Köpfe haben **keine feste Farbe und keine festen Berufe**: Ihre Muster sind gelernt,
oft gemischt und von Satz zu Satz verschieden. Dass ein Kopf „Grammatik macht“, ist höchstens eine grobe Beschreibung. Fehlt
ein einzelner Kopf, ändert sich meist nur wenig [Michel2019]. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Ein Kopf reicht.“ – Er kann je Position nur eine Verteilung bilden.
- „Mehr Köpfe = mehr Rechenaufwand im gleichen Maß.“ – Die Breite wird aufgeteilt.
- „Köpfe sind Experten aus MoE.“ – Nein.
- „Jeder Kopf hat einen festen Job – es gibt *den* Grammatikkopf.“ – Nein, Muster sind gelernt, gemischt und wechseln mit
  dem Satz.
- „Fällt ein Kopf aus, ist alles kaputt.“ – Meist ändert sich nur wenig [Michel2019] [DE 11.10. Didaktik].

## Verwandte Begriffe

[Self-Attention](self-attention.md) · [Outputprojektion](outputprojektion.md) · [Attentiongewicht](attentiongewicht.md) ·
[KV-Cache](kv-cache.md) · [FFN / MLP](ffn-mlp.md) · [Residualstrom](residualstrom.md)

## Quellen

[Vaswani2017], [Radford2018], [Olsson2022], [Xiao2023], [Michel2019], [Shazeer2019], [Ainslie2023], [Shazeer2017] – vollständige
Angaben in [QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L04 ersetzt feste Berufe durch messbare, satzabhängige Beiträge. Einzelne Köpfe können Ersatzwege haben; zwei Eingriffe können zusammen viel stärker wirken. [Ablation / Weglassprobe](ablation-weglassprobe.md) und [Überlagerung](ueberlagerung-superposition.md) zeigen die Grenze des Figurenbilds.
