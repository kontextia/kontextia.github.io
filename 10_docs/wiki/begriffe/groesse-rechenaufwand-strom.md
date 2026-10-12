# Größe, Rechenaufwand und Strom

**Stadttakt:** jeder Takt (beim Antworten) und „Geschichte“ (Schmiedezeit) · **Welt:** L07 Bühne 8c „Der Lichterzähler im Museum“ (beide Teile); Preiskarten aller Welten, besonders L03 (Vergleichstreppe), L08 (Lampion-Lichterzähler), L10 (Laterne „Nachfragen“) · **Figuren:** Gilda und Olli (Schmiede), Kajo („Und was kostet das?“) · **Anschluss:** — · Neue Seite [DE 11.10. Didaktik 2.2, KANON §17 „Größe und Strom“, DIDAKTIK_REVISION §6a.3 G6]

## Kurz für Kinder (Teil 1)

**Ein Turm, durch den für jedes Stück alle Lichter gehen.** Bei jedem Schlag der Brückenglocke rechnet der ganze Turm einmal
mit **allen** Stellschrauben – und das braucht Strom. Die Schmiede ist zwar kalt, aber **kalt heißt nicht gratis**: Auch die
fertige Stadt kostet bei jedem Stück etwas.

Noch viel teurer war die **Schmiedezeit**: Die großen Städte wurden wochen- bis monatelang in riesigen Rechenhallen geschmiedet
und brauchten so viel Strom wie Hunderte Familien in einem ganzen Jahr. KI schwebt also nicht gratis im Internet – sie läuft
auf Computern in Rechenzentren. Merksatz: **„Kalt heißt nicht gratis: Jedes Stück rechnet durch alle Schrauben.“**

## Genauer (Teil 2)

**Faustregel für Rechnungen** (Kaplan et al.; N = Zahl der Parameter ohne Embeddings) [Kaplan2020]:
- **Antworten (vorwärts):** etwa **2 · N Rechenoperationen je Token** – je Gewicht eine Multiplikation und eine Addition. Dazu
  kommt ein Anteil 2 · n_layer · n_ctx · d, der mit der Kontextlänge wächst (der Vergleichsaufwand der Attention,
  [Self-Attention](self-attention.md)).
- **Training:** etwa **6 · N je Trainingstoken** (vorwärts 2 · N, rückwärts etwa 4 · N), insgesamt C ≈ 6 · N · D bei D
  Trainingstokens.

**Beispiel GPT-3-Größe** (rund 175 Milliarden Parameter, rund 300 Milliarden Trainingstokens [Brown2020]):
- Training: 6 · 1,75·10¹¹ · 3·10¹¹ ≈ **3·10²³** Rechnungen. Patterson et al. führen für GPT-3 3,14·10²³ Rechenoperationen an.
- Eine Antwort mit 1 000 Tokens: 2 · 1,75·10¹¹ · 10³ ≈ **3,5·10¹⁴** Rechnungen – das Training entspricht also fast einer
  Milliarde solcher Antworten (≈ 9·10⁸).

**Strom:** Patterson et al. schätzen den Energiebedarf des GPT-3-Trainings auf **rund 1 287 MWh (≈ 1,3 GWh)** und den
Ausstoß auf rund 552 t CO₂-Äquivalent (brutto) [Patterson2021] – grob der Jahresverbrauch einiger hundert Haushalte
(Überschlag [DE] mit der Annahme einiger tausend kWh je Haushalt und Jahr). Dieselben Autoren betonen, dass Modellart (dünn
aktivierte Netze brauchen teils unter 1/10 der Energie dichter), Rechenzentrum und Chips den CO₂-Fußabdruck um bis zu das
100- bis 1000-Fache verändern können; nachträgliche Schätzungen sind darum schwierig, und sie fordern, Energie und CO₂ in
Veröffentlichungen offen anzugeben [Patterson2021].

**Was das Spiel bewusst nicht beziffert:** den Strom einer **einzelnen Antwort**. Er hängt von Chips, Rechenhalle, Auslastung
und Bauart ab; die Faustregel zählt Rechnungen, sie misst keinen Strom. [Quantisierung](quantisierung.md) verkleinert das
Gepäck (Bytes), nicht die Zahl der Rechnungen – ob dabei Strom gespart wird, misst man (L08).

## Figur in Kontextia

Keine eigene Figur [DE]. Im **Museum der Stadtgründung** an der Erinnerungsuhr steht der **Lichterzähler**: Jede Schraube der
Übungsmurmel hat ein Lämpchen (Spielannahme: 1 Licht ≈ 2 Rechnungen). Bild aus dem Lorebuch: „Bei jedem Schlag der
Brückenglocke gehen im ganzen Turm alle Lichter einmal an.“ **Kajo** stellt in jeder Welt die Preisfrage.

## Im Spiel

[L07](../../../01_design/v2/level/L07.md) §8c.1 „Kalt heißt nicht gratis“ (Teil 1): Vorhersage, ob eine Antwort trotz kalter
Schmiede etwas kostet; drei Antworten zu je einem Stück → Lichterzähler **9**; das Üben (81 Schritte × 12 Karten) →
**8 748** Lichter. §8c.2 „Die Faustregel“ (Teil 2): 2 · N und 6 · N rechnen, GPT-3-Größe, Grenzenwahl „Die Faustregel schätzt
Rechnungen, sie misst keinen Strom.“ L08 Preiskarte: Lampion-Lichter je Stück **1 000 → 1 000** bei 4 statt 16 bit, nur das
Gepäck sinkt (2 000 → 520 Bytes). L03 „Die Vergleichstreppe“ und L10 Laterne „Nachfragen“ (fünfmal rechnen) zeigen weitere
Preise ([Gewinn und Preis](gewinn-und-preis.md)).

## Hier endet das Bild

Ein Lämpchen steht für ungefähr zwei Rechnungen – Rechnungen sind aber kein Strom. Die Faustregel lässt den Anteil der
Attention (wächst mit der Länge) und das Hin- und Herschieben von Daten im Speicher weg. Die 1,3 GWh sind eine nachträgliche
Schätzung für **ein** Modell von 2020; heutige Modelle sind teils viel größer, teils sparsamer gebaut.

## Häufige Irrtümer

- „KI ist gratis und schwebt im Internet.“ – Sie läuft auf Rechnern in Rechenzentren, und jede Antwort kostet Strom.
- „Ein fertig trainiertes Modell rechnet nicht mehr.“ – Jedes Stück kostet etwa 2 Rechnungen je Parameter [Kaplan2020].
- „Eine Antwort kostet so viel wie das Training.“ – Größenordnungen weniger; das Training entspricht fast einer Milliarde
  langer Antworten.
- „4 bit heißt ein Viertel der Rechnungen und ein Viertel Strom.“ – Die Zahl der Rechnungen bleibt; was es spart, misst man.
- „Längere Antworten, Zwischenschritte und Nachfragen sind gratis.“ – Jedes Stück und jeder Durchlauf kostet
  ([Zwischenschritte](zwischenschritte-chain-of-thought.md), [Mehrmals fragen](mehrmals-fragen.md)).

## Verwandte Begriffe

[Parameter und Gewichte](parameter-gewichte.md) · [Training](training.md) · [Pretraining](pretraining.md) ·
[Self-Attention](self-attention.md) · [Kontextfenster](kontextfenster.md) · [Quantisierung](quantisierung.md) ·
[KV-Cache](kv-cache.md) · [Gewinn und Preis](gewinn-und-preis.md)

## Quellen

[Kaplan2020], [Patterson2021], [Brown2020] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md); Spielzahlen aus L07 §8c und
L08 §11a (nachgerechnet)
