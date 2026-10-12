# Ablation / Weglassprobe

**Stadttakt:** 3–9 (gemessen wird an einer Kopie des Turms, nie beim Antworten) · **Welt:** L04 Die vielköpfige Werkstatt – „Der Wackelturm“ (Jenga; vorher Kopf-Bomber), Finale Teil 2 (Kopf-Ausfall-Experiment) · **Figuren:** die Bauteile als Klötze – Hedras Helme, Oskar Output, Fina FFN, Nora Norm, das Ressi-Rohr; Quirin mit dem Messbuch · **Anschluss:** — (Messverfahren, keine Figur) · Neue Seite [DE 11.10. Didaktik 2.2, KANON §10 Zeile L04, §21 L13]

## Kurz für Kinder (Teil 1)

Wie findet man heraus, was ein Teil im Turm tut? Ein Schild zum Ablesen gibt es nicht. Man macht es wie beim **Wackelturm**:
einen Klotz herausziehen – und messen, **wie stark die Antwort wackelt**. Vorher sagst du voraus: wenig, mittel oder stark?

Was dabei herauskommt, überrascht:
- Einen Helm ziehen wackelt **meist wenig** – andere Helme springen ein. Manchmal wackelt es **stark**, weil *dieser* Satz
  genau diesen Helm brauchte. Im nächsten Satz ist derselbe Helm unwichtig.
- **Fina** ziehen nimmt ein bestimmtes **Wissen** weg (fährt das Mondschiff um acht oder um neun?), aber die **Satzform**
  bleibt: Nach „um“ kommt weiter eine Uhrzeit.
- Das **Ressi-Rohr** ziehen lässt den Turm **einstürzen**. **Nora** ziehen lässt ihn Stockwerk für Stockwerk **stärker
  schwanken**.
- Der Helm mit der **hellsten** Lichtwolke ist nicht der wichtigste.

Danach steckst du den Klotz zurück, und der Turm rechnet wieder genau wie vorher. Merksatz: **„Was ein Teil tut, findet man
nur durch Ziehen und Messen.“**

## Genauer (Teil 2)

**Ablation** (Weglassprobe) heißt: In einer Kopie des Modells wird ein Bauteil ausgeschaltet oder ersetzt – ein
Attention-Kopf, die [Outputprojektion](outputprojektion.md), ein [FFN](ffn-mlp.md), eine [Norm](normalisierung.md), der
Residualweg oder ein ganzer Block. Dann rechnet man **dieselbe Eingabe** neu und misst den Unterschied, etwa:
- **ΔP:** Änderung der Wahrscheinlichkeit des richtigen nächsten Tokens (in Prozentpunkten),
- **Δz:** Änderung seines Logits,
- oder die Leistung auf einem ganzen Testsatz (Genauigkeit, BLEU).

**Womit ersetzt wird, zählt.** Null-Ablation setzt den Beitrag auf 0; andere ersetzen durch einen Mittelwert oder durch den
Wert aus einem anderen Satz (Activation Patching). Weil 0 für das Modell selbst ein ungewohnter Wert sein kann, hängen
Ergebnis und Deutung von dieser Wahl und von der Messgröße ab [HeimersheimNanda2024].

**Was die Forschung so gefunden hat:**
- **Viele Köpfe sind einzeln verzichtbar.** Michel et al. entfernten Köpfe aus fertig trainierten Modellen; ein großer Teil
  ließ sich weglassen, ohne dass die Leistung stark sank, manche Schichten kamen mit einem Kopf aus [Michel2019]. Voita et al.
  fanden in einem Übersetzungsmodell wenige wichtige Köpfe mit gleichbleibenden, oft sprachlich beschreibbaren Mustern; 38 von
  48 Encoder-Köpfen ließen sich entfernen bei nur 0,15 BLEU Verlust (Englisch–Russisch) [Voita2019].
- **Ersatz springt ein.** Im Schaltkreis für eine Namensaufgabe in GPT-2 small (26 Köpfe in 7 Klassen, gefunden durch kausale
  Eingriffe) übernehmen „Backup Name Mover“-Köpfe die Arbeit, wenn die eigentlichen „Name Mover“ ausgeschaltet werden
  [Wang2022b]. McGrath et al. nennen das **Hydra-Effekt**: Fällt eine Attention-Schicht aus, gleicht eine andere teilweise
  aus [McGrath2023]. Niemand hat diesen Ersatz eingebaut; er ist im Training entstanden.
- **Sogar ganze Stockwerke** lassen sich bei einigen offenen Modellen in großer Zahl entfernen – bis zur Hälfte, nach kurzem
  Nachtraining („Heilen“) – mit geringem Verlust auf gängigen Frage-Antwort-Tests [Gromov2024]. Das geht, weil der
  [Residualstrom](residualstrom.md) weiterfließt; ohne ihn wäre es anders ([Residualverbindung](residualverbindung.md)).
- **Mechanismen nachweisen.** Induktionsköpfe wurden unter anderem durch Ausschalten nachgewiesen [Olsson2022]; Meng et al.
  verorteten Faktenassoziationen durch gezieltes Stören und Wiederherstellen von Zwischenständen in FFN-Schichten mittlerer
  Stockwerke [Meng2022].

**Fallstricke beim Deuten (alle im Spielmodell WT-1 nachgerechnet, L04 §6.10–§6.14):**
- **Wenig Wackeln heißt nicht: Das Teil tut nichts.** In S9 bricht der Kopierkreis zusammen (Blick auf den Treffer 85,3 → 3,3),
  die Antwort hält trotzdem (88,0 → 82,5), weil Fina einspringt.
- **Wirkungen addieren sich nicht.** S1: Strich-2 allein −6,6 Pp, Welle-2 allein −5,7 Pp, beide zusammen −54,9 Pp.
- **Ziehen kann eine Antwort auch sicherer machen** (S10: Fina-1 gezogen → +26,7 Pp).
- **Hell ist nicht wichtig.** Punkt-2 schaut in allen Sätzen zu 82–93 % aufs Startzeichen, Ziehen ändert P um höchstens
  0,82 Pp. Attentiongewichte sind keine Wichtigkeitsanzeige [Jain2019] ([Attentiongewicht](attentiongewicht.md)).
- **Kombinationen explodieren:** 6 Helme ergeben 2⁶ = 64 Ziehkombinationen, alle 12 Klötze 2¹² = 4 096.

## Figur in Kontextia

Keine eigene Figur [DE]. Der **Turm der Schichten** *ist* der Wackelturm: Fundament, zwei Stockwerke, Turmspitze. Klötze sind
die Helme der beiden Hedras (Strich, Punkt, Welle je Stockwerk), Oskars, Finas und Noras Klötze und das Ressi-Rohr. **Quirin**
führt das Messbuch; Spitznamen-Schilder (Teil 1) und Fundkarten (Teil 2) gibt es erst **nach** dem Messen, und sie gelten für
*diesen* Satz. Im [Stammbaum](../../../01_design/v2/STAMMBAUM.md) steht die Ideenkarte „Weglassprobe“ (Michel u. a. 2019).

## Im Spiel

[L04](../../../01_design/v2/level/L04.md) „Der Wackelturm“ [DE 11.10. Didaktik 2.2]: Vor jedem Zug eine versiegelte Vorhersage
„wackelt wenig / mittel / stark“ (Wackelmesser 0–9 / 10–34 / ab 35 Lichtpunkte); Ziehen per Knopf, ohne Feinmotorik; danach
zurückstecken, der Turm ist bitgleich heil. Beispiele aus dem Regelkern: Punkt-1 wackelt im Tee-Satz S1 gar nicht, im
Schiff-Satz S2 um 55; Fina-2 gezogen lässt in S2 „acht“ und „neun“ gleichauf (je 26,2), die Uhrzeit-Satzform bleibt vorn;
Ressi-Rohr gezogen: Sofis Rad zeigt 13 gleiche Felder zu je 7,7 (Einsturz). Preiskarte: der „Sparturm“ mit nur einem Helm je
Stockwerk schafft nur eine Satzart. Abschnitt B′ **„Den Grammatikhelm gibt es nicht“**: Im großen Probenlauf (24 Züge) drückt
kein einzelner Helm die Satzform unter 60. Teil 2: Wackelwerte als ΔP und Δz, Null-Ablation von Kopf, W_O, FFN, Norm und
Residual unterscheiden, Induktionskreis durch Ziehen nachweisen, Selbstreparatur messen.
Finale Teil 2: Kopf-Ausfall-Experiment am echten Türmchen.

## Hier endet das Bild

**Ziehen ist ein Messverfahren an einer Kopie, kein Teil des Antwortens.** Beim Antworten zieht niemand etwas heraus, und
keine Schraube dreht sich. Es wackelt auch nichts: Zahlen ändern sich. Ein echter Rechner stürzt nicht ein – heraus kommen
sinnlose Zahlen. Und unser Lehrturm WT-1 ist **von Hand gestellt** (2 Stockwerke, 6 Helme); echte Türme haben Dutzende
Stockwerke und Hunderte Köpfe, und ihr Ersatz ist beim Schmieden entstanden, nicht geplant. Auch die Messung hat Fehler – je
nachdem, womit man ersetzt und was man misst.

## Häufige Irrtümer

- „Fällt ein Kopf aus, bricht alles zusammen.“ – Meist ändert sich wenig [Michel2019][Voita2019].
- „Wenig Wackeln heißt: Das Teil tut nichts.“ – Andere Teile können eingesprungen sein [Wang2022b][McGrath2023].
- „Zwei gezogene Teile wackeln so viel wie beide einzeln zusammengezählt.“ – Nein, Wirkungen addieren sich oft nicht.
- „Wohin ein Kopf schaut, so wichtig ist er.“ – Nein, das zeigt erst das Ziehen [Jain2019].
- „Ziehen macht die Antwort immer schlechter.“ – Manchmal wird sie sogar sicherer.
- „Ein Teil ist immer gleich wichtig.“ – Je nach Satz verschieden.
- „Beim Antworten schaltet die KI unwichtige Köpfe ab.“ – Nein; Ablation ist ein Experiment der Forschenden.

## Verwandte Begriffe

[Multi-Head-Attention](multi-head-attention.md) · [FFN / MLP](ffn-mlp.md) · [Residualverbindung](residualverbindung.md) ·
[Normalisierung](normalisierung.md) · [Outputprojektion](outputprojektion.md) · [Transformer-Block](transformer-block.md) ·
[Stockwerkslinse](stockwerkslinse-logit-lens.md) · [Überlagerung](ueberlagerung-superposition.md) ·
[Attentiongewicht](attentiongewicht.md) · [Gewinn und Preis](gewinn-und-preis.md) · [Bildbruch / Quirins Glas](bildbruch-quirins-glas.md)

## Quellen

[Michel2019], [Voita2019], [Wang2022b], [McGrath2023], [Gromov2024], [Olsson2022], [Meng2022], [Jain2019],
[HeimersheimNanda2024] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md); Spielzahlen aus L04 §6 (Regelkern WT-1, nachgerechnet)
