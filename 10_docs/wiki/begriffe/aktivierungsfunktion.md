# Aktivierungsfunktion

**Stadttakt:** 8 · **Welt:** L04 (Teil 2), L07 (Mini-Modelle) · **Figur:** Finas Aktivierungsscharnier („der Knick“) · **Anschluss:** innerhalb von Fina (VEC → VEC)

## Kurz für Kinder (Teil 1)

Finas Werkstatt hat ein **Scharnier**. Es lässt große, positive Zahlen durch und drückt negative fast auf null – wie eine
Tür, die nur in eine Richtung aufgeht. Ohne diesen Knick könnte die Werkstatt nur geradeaus rechnen.

## Genauer (Teil 2)

Eine Aktivierungsfunktion φ wird auf **jede Komponente** eines Vektors einzeln angewendet. Sie ist **nichtlinear** – das ist
ihr ganzer Zweck: Zwei lineare Schichten hintereinander (x·W₁)·W₂ sind dasselbe wie eine einzige lineare Schicht
x·(W₁·W₂). Erst der Knick dazwischen macht das [FFN](ffn-mlp.md) ausdrucksstärker.

Wichtige Funktionen (Werte zum Nachrechnen):

| Funktion | Formel | φ(−2) | φ(−1) | φ(1) | φ(2) |
|---|---|---|---|---|---|
| ReLU [Nair2010] | `max(0, x)` | 0 | 0 | 1 | 2 |
| GELU [Hendrycks2016] | `x · Φ(x)`, Φ = Verteilungsfunktion der Standardnormalverteilung | −0,046 | −0,159 | 0,841 | 1,954 |

- **ReLU** steckt im FFN des Original-Transformers [Vaswani2017].
- **GELU** gewichtet Eingaben nach ihrem Wert statt hart nach dem Vorzeichen [Hendrycks2016]; GPT-1 verwendet sie
  [Radford2018].
- **SwiGLU** und andere GLU-Varianten multiplizieren zwei Projektionen, von denen eine durch eine Aktivierung geht
  („Gating“) [Shazeer2020]; LLaMA nutzt SwiGLU [Touvron2023].

Im Training ist auch die **Ableitung** wichtig: ReLU hat für x > 0 die Steigung 1 und für x < 0 die Steigung 0. Bei der
[Backpropagation](backpropagation.md) fließt durch ein „geschlossenes“ ReLU kein Gradient.

Abgrenzung: [Softmax](softmax.md) wird manchmal auch „Aktivierung“ genannt, wirkt aber auf einen **ganzen Vektor**
(Anteile, Summe 1). ReLU und GELU wirken auf jede Zahl einzeln.

## Figur in Kontextia

Das **Aktivierungsscharnier** ist Teil von **Fina FFN** (der Knick zwischen breitem und schmalem Trapez). Keine eigene Figur
und **keine** eigenen Stellschrauben: ReLU und GELU haben keine gelernten Parameter.

## Im Spiel

L04-T2: Das Scharnier lässt sich zwischen „ReLU“ und „GELU“ umschalten; die Spielenden sagen vorher, welche Komponenten
verschwinden. L07-T2: In echten Logistik-Mini-Modellen sieht man, dass ohne Knick bestimmte Muster nicht lernbar sind.

## Hier endet das Bild

Eine Tür ist offen oder zu. GELU ist **weich**: Leicht negative Werte werden nicht ganz null, sondern nur verkleinert. Und
das Scharnier „entscheidet“ nichts – es ist eine feste Kurve.

## Häufige Irrtümer

- „Die Aktivierung ist eine Neuronen-Erregung wie im Gehirn.“ – Der Name kommt daher; technisch ist es nur eine Funktion.
- „Mehr Aktivierung = mehr Aufmerksamkeit.“ – Unabhängige Begriffe.
- „Aktivierungsfunktionen werden gelernt.“ – ReLU, GELU, Swish sind feste Formeln.

## Verwandte Begriffe

[FFN / MLP](ffn-mlp.md) · [Softmax](softmax.md) · [Backpropagation](backpropagation.md) · [Gradient](gradient.md) ·
[Transformer-Block](transformer-block.md)

## Quellen

[Nair2010], [Hendrycks2016], [Vaswani2017], [Radford2018], [Shazeer2020], [Touvron2023] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
