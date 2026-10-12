# Logits

**Stadttakt:** 11 · **Welt:** L05 Logitmarkt (Snake der Möglichkeiten) · **Figur:** Lio Logit · **Anschluss:** Schlüssel SC – ein Punktdreieck je Vokabelfach (gold, Glyphe ▲)

## Kurz für Kinder (Teil 1)

Oben auf dem Turm steht Lio an einer großen **Punktetafel**. Für jedes Wort im Wörterbuch schreibt er eine Punktzahl an –
auch für die, die gar nicht passen. Punkte sind aber **noch keine Prozente**: Erst Sofi macht daraus Glücksradfelder.

## Genauer (Teil 2)

Logits sind die rohen Scores des Modells für **jeden Eintrag des Vokabulars** an einer Position. Sie entstehen aus dem
letzten [Hidden State](hidden-state.md) nach der finalen Norm über den [LM-Kopf](lm-kopf.md):

`z = Norm(x^L) · W_LM` – ein Vektor mit V Einträgen (GPT-2: 50.257 [Radford2019]).

Logits können jede reelle Zahl sein, negativ oder groß. Wahrscheinlichkeiten entstehen erst durch Softmax
[Radford2018][HF-Generation]:

`p = softmax(z / T)`

Beispiel mit drei Kandidaten: z = (2; 1; 0) für („Sonne“, „Regen“, „Käse“). Mit T = 1: p = (0,665; 0,245; 0,090).
Ein Logit-Unterschied von 1 bedeutet ein Wahrscheinlichkeitsverhältnis von e ≈ 2,72 (0,665 / 0,245 ≈ 2,72) – unabhängig
davon, wie groß die Zahlen absolut sind.

Was man mit Logits tun kann:
- **Greedy:** den größten Logit nehmen – braucht weder Temperatur noch Softmax ([Greedy](greedy.md)).
- **Temperatur:** alle Logits durch T teilen ([Temperature](temperature.md)).
- **Filtern:** Kandidaten auf −∞ setzen (Top-k, Top-p, verbotene Tokens) – nach der Softmax haben sie dann
  Wahrscheinlichkeit 0.
- **Training:** Logits gehen in den [Cross-Entropy-Loss](cross-entropy-loss.md); der Gradient nach den Logits ist
  „Wahrscheinlichkeit minus Ziel“ [Bridle1990a].

Beim Generieren braucht man nur die Logits der **letzten** Position; im Training werden die Logits **aller** Positionen
gleichzeitig gegen das jeweils nächste Token geprüft.

## Figur in Kontextia

**Lio Logit** (Marktgilde): goldener Balkenkörper mit **Vokabularfächern**. Schloss **VEC-Mulde (runde Vertiefung)** für den
letzten Rucksack, Schlüssel **SC-Dreiecke** – eines je Fach. Seine Dreiecke passen in Tempis Dreieck-Schloss (Freundeslinie)
oder direkt zu Sofi. Streit der Welt L05: Lio prahlt „Der höchste Score gewinnt immer – und Hitze macht schlau!“ – beides
stimmt so nicht.

## Im Spiel

L05 (Snake): Jede Frucht ist ein Kandidat mit Punktdreieck. Teil 2: Logits → Softmax mit T selbst rechnen, Entropie ablesen.
L07: Lio erscheint in der Schmiede, weil seine Punktetafel im Training mit dem richtigen Token verglichen wird.

## Hier endet das Bild

Punkte auf einer Tafel klingen nach Bewertung „gut/schlecht“. Logits bewerten keine Wahrheit; sie sagen nur, wie gut ein
Token nach dem Gelernten **als Fortsetzung** passt.

## Häufige Irrtümer

- „Logits sind Prozente.“ – Nein, erst nach Softmax.
- „Ein negativer Logit heißt unmöglich.“ – Nein, nur weniger wahrscheinlich als andere.
- „Der höchste Logit ist die richtige Antwort.“ – Nur die wahrscheinlichste Fortsetzung.
- „Logits gibt es nur für sinnvolle Wörter.“ – Jedes Vokabelfach bekommt einen.

## Verwandte Begriffe

[LM-Kopf](lm-kopf.md) · [Softmax](softmax.md) · [Temperature](temperature.md) · [Top-k](top-k.md) · [Top-p](top-p.md) ·
[Greedy](greedy.md) · [Cross-Entropy-Loss](cross-entropy-loss.md) · [Vokabular](vokabular.md)

## Quellen

[Radford2018], [Radford2019], [Bridle1990a], [HF-Generation] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
