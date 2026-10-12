# FFN / MLP (Feed-Forward-Netz)

**Stadttakt:** 8 · **Welt:** L04 Die vielköpfige Werkstatt · **Figur:** Fina FFN · **Anschluss:** Schloss VEC-Mulde → Schlüssel VEC-Kugel

## Kurz für Kinder (Teil 1)

Nach der Gruppenarbeit kommt die **Einzelarbeit**. Fina nimmt jede Perle für sich, macht sie in ihrer Werkstatt erst breit,
knickt sie an ihrem Scharnier und macht sie wieder schmal. Sie redet dabei mit niemandem – ihre Bombe hat Reichweite null.

## Genauer (Teil 2)

Das positionsweise Feed-Forward-Netz (FFN, auch MLP) wird auf **jede Position einzeln und gleich** angewendet
[Vaswani2017]:

`FFN(x) = max(0, x·W₁ + b₁)·W₂ + b₂`

- **Aufweiten:** W₁ bringt den Vektor von d auf d_ff Komponenten. Original-Transformer 512 → 2048 [Vaswani2017], GPT-1
  768 → 3072 [Radford2018].
- **Knicken:** Eine [Aktivierungsfunktion](aktivierungsfunktion.md) (Original: ReLU; GPT-1: GELU) macht das Netz
  nichtlinear.
- **Zurückführen:** W₂ bringt den Vektor zurück auf d. Das Ergebnis wird über die
  [Residualverbindung](residualverbindung.md) addiert.

Größe bei GPT-1: W₁ und W₂ haben zusammen 2 · 768 · 3072 = **4.718.592** Gewichte je Stockwerk – doppelt so viele wie die
vier Attention-Matrizen zusammen (4 · 768² = 2.359.296). Geva et al. stellen fest, dass FFN-Schichten etwa zwei Drittel der
Parameter eines Transformers ausmachen, und deuten sie als **Schlüssel-Wert-Speicher**: Die erste Schicht erkennt
Muster in der Eingabe, die zweite schreibt dazu passende Richtungen in den Residualstrom, die Wahrscheinlichkeiten für
Folgetokens verschieben [Geva2020]. Auch dieser „Speicher“ ist **kein Fach mit fertigen Antworten**: Muster überlagern sich in
denselben Zahlen, und jedes Wissen verteilt sich über viele Gewichte. Manche Faktenassoziationen lassen sich FFN-Schichten
mittlerer Stockwerke zuordnen und gezielt ändern – nur teilweise und mit Nebenwirkungen [Meng2022] [DE 11.10. Didaktik, L7].

**Varianten:**
- **GLU-Varianten** wie SwiGLU nutzen drei Matrizen: `(Swish(x·W₁) ⊙ (x·W₃))·W₂` [Shazeer2020]; LLaMA verwendet SwiGLU
  [Touvron2023].
- **Mixture-of-Experts:** viele FFN-Experten, von denen ein Gating-Netz je Eingabe wenige auswählt [Shazeer2017].

Wichtig für das Verständnis des Blocks: **Attention mischt Positionen, das FFN nicht.** Ändert man Token 3, ändert sich
Finas Ergebnis an Position 5 nur über den Umweg der Attention.

## Figur in Kontextia

**Fina FFN** (Turmwerkstätten): terrakottafarbener **Doppeltrapezkörper** – schmal, breit, schmal = Aufweiten und Zurückführen
der Dimension – mit **Aktivierungsscharnier** (der „Knick“). Schloss **VEC-Mulde**, Schlüssel **VEC-Kugel**. Patin sind die
FFN-Gewichte W₁, W₂ (bei GLU auch W₃). Streit in L04: Fina will mit den Nachbarn tratschen – darf sie im FFN aber nicht.

## Im Spiel

L04 (Bomberman): **Finas Bombe hat Reichweite 0** – sie wirkt nur auf ihrem eigenen Feld. Test T08: Das FFN kann eine
Position ohne direkten Nachbarzugriff bearbeiten.

## Hier endet das Bild

„Einzelarbeit“ klingt nach Nachdenken. Das FFN ist **eine feste Rechnung** mit gelernten Zahlen; ob eine einzelne
FFN-Zeile „ein Wissen“ enthält, ist nur teilweise erforscht.

## Häufige Irrtümer

- „Das FFN schaut auf die Nachbarwörter.“ – Nein, nur auf die eigene Position.
- „Das FFN ist unwichtig neben der Attention.“ – Es enthält den Großteil der Parameter.
- „Ohne Knick ginge es auch.“ – Ohne Nichtlinearität wären W₁·W₂ nur eine einzige lineare Abbildung.

## Verwandte Begriffe

[Aktivierungsfunktion](aktivierungsfunktion.md) · [Transformer-Block](transformer-block.md) ·
[Self-Attention](self-attention.md) · [Residualverbindung](residualverbindung.md) · [Parameter und Gewichte](parameter-gewichte.md)

## Quellen

[Vaswani2017], [Radford2018], [Geva2020], [Meng2022], [Shazeer2020], [Touvron2023], [Shazeer2017] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
