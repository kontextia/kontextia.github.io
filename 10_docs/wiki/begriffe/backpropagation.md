# Backpropagation

**Stadttakt:** „Geschichte“ (Training) · **Welt:** L07-T2 Lernschmiede · **Figur:** Gilda Gradient · **Anschluss:** L rein → G je Stellschraube raus

## Kurz für Kinder (Teil 1)

Wenn am Ende des Turms ein Fehler herauskommt, fragt Gilda rückwärts: „Wer hat wie viel dazu beigetragen?“ Sie geht vom Ende
Stockwerk für Stockwerk zurück zum Anfang und verteilt die Schuld fair – wer viel bewirkt hat, bekommt einen großen Pfeil.

## Genauer (Teil 2)

Backpropagation berechnet den [Gradienten](gradient.md) des Verlusts nach **allen** Parametern eines Netzes mit der
**Kettenregel**, indem es die Ableitungen vom Ausgang rückwärts durch die Schichten weiterreicht. Rumelhart, Hinton und Williams
zeigten 1986, wie sich damit innere Darstellungen in mehrschichtigen Netzen lernen lassen [Rumelhart1986].

Kettenregel: Hängt L von y ab und y von w, dann gilt `∂L/∂w = ∂L/∂y · ∂y/∂w`.

**Durchgerechnetes Mini-Netz:** Eingabe x = 2, Gewichte w₁ = 0,5 und w₂ = 3, Ziel t = 2.

Vorwärts:
- h = ReLU(w₁ · x) = ReLU(1) = 1
- y = w₂ · h = 3
- L = ½ · (y − t)² = ½ · 1² = 0,5

Rückwärts:
- ∂L/∂y = y − t = **1**
- ∂L/∂w₂ = ∂L/∂y · h = 1 · 1 = **1**
- ∂L/∂h = ∂L/∂y · w₂ = 1 · 3 = **3**
- ∂L/∂w₁ = ∂L/∂h · ReLU'(1) · x = 3 · 1 · 2 = **6**

Ein Schritt mit Lernrate 0,05: w₁ = 0,5 − 0,05 · 6 = 0,2, w₂ = 3 − 0,05 · 1 = 2,95. Neu: h = 0,4, y = 1,18, L = 0,336 – kleiner.
(Achtung: Mit Lernrate 0,1 wäre man hier übers Ziel geschossen – siehe [Optimierer und Lernrate](optimierer-lernrate.md).)

Was dabei auffällt:
- Die Zwischenwerte des Vorwärtslaufs (hier h) werden für den Rückweg **gebraucht** – Training kostet deshalb viel mehr Speicher
  als Inferenz.
- Durch ein „geschlossenes“ ReLU (Eingang < 0) fließt kein Gradient.
- Durch die [Residualverbindungen](residualverbindung.md) gibt es in Transformern einen direkten Weg für Gradienten durch alle
  Stockwerke [He2015].

Moderne Bibliotheken berechnen Backpropagation automatisch (automatisches Differenzieren); die Idee bleibt dieselbe.

## Figur in Kontextia

**Gilda Gradient** läuft beim Rückweg den Turm **abwärts** und füllt ihre Komponentenfächer – ein Pfeil je Stellschraube. Danach
übergibt sie an **Olli**. [DE-Vorschlag] Im Spiel leuchtet der Rückweg magenta, damit Kinder Vorwärts (Takt) und Rückwärts
(Schmiede) unterscheiden.

## Im Spiel

L07-T2: Spielende verfolgen die Fehlerkerbe rückwärts durch ein Mini-Netz und sagen voraus, welche Stellschraube den größten Pfeil
bekommt. Teil 1 zeigt nur: „Die Schuld wird rückwärts verteilt.“

## Hier endet das Bild

„Schuld verteilen“ klingt moralisch. Es ist **reine Ableitungsrechnung**: Wie stark würde sich L ändern, wenn man diese
Stellschraube minimal dreht? Und nichts davon passiert beim Antworten.

## Häufige Irrtümer

- „Backpropagation ist der Lernschritt.“ – Sie berechnet nur die Gradienten; den Schritt macht der Optimierer.
- „Das Modell geht beim Antworten rückwärts.“ – Nein, Inferenz ist nur vorwärts.
- „Jeder Parameter braucht einen eigenen Durchlauf.“ – Ein Rückwärtslauf liefert alle Gradienten auf einmal.

## Verwandte Begriffe

[Gradient](gradient.md) · [Optimierer und Lernrate](optimierer-lernrate.md) · [Training](training.md) ·
[Aktivierungsfunktion](aktivierungsfunktion.md) · [Residualverbindung](residualverbindung.md)

## Quellen

[Rumelhart1986], [Goodfellow2016], [He2015] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
