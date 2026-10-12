# Autoregression

**Stadttakt:** der ganze Takt, Schritt 13 schließt den Kreis · **Welt:** L05 (Snake), L06 · **Figuren:** Edda Ende (Glocke), Bürgermeister Kontext (neuer Platz), Toki (fährt zurück in den Hafen) · **Anschluss:** ID → zurück an den Anfang

## Kurz für Kinder (Teil 1)

Die Stadt baut eine Antwort **Wort für Wort**. Jedes neue Wort wird hinten an den Zug gehängt, und dann fängt der Takt von
vorn an – mit dem neuen Wort an Bord. Wie eine Schlange, die bei jeder Frucht ein Stück länger wird.

## Genauer (Teil 2)

Ein autoregressives (kausales) Sprachmodell zerlegt die Wahrscheinlichkeit eines Textes in **lauter „Was kommt als
Nächstes?“-Schritte** (Kettenregel der Wahrscheinlichkeit):

`P(x₁, …, x_n) = P(x₁) · P(x₂ ∣ x₁) · P(x₃ ∣ x₁, x₂) · … · P(x_n ∣ x₁ … x_{n−1})`

Jeder Faktor ist eine Verteilung über das Vokabular, die das Modell in einem Durchlauf berechnet. Beim Generieren heißt das
[HF-CLM]:

1. Folge eingeben → Verteilung fürs nächste Token.
2. Ein Token wählen ([Sampling](sampling-seed.md) oder [Greedy](greedy.md)).
3. Prüfen, ob Schluss ist ([EOS](eos.md)).
4. Token **anhängen** → die Folge ist eins länger → zurück zu 1.

Beispiel: Prompt „Die Sonne“ → Modell wählt „scheint“ → neue Eingabe „Die Sonne scheint“ → wählt „hell“ → … So hängt jedes
Token von allen vorherigen ab, auch von den **selbst erzeugten**: Ein früher Fehlgriff kann die ganze Fortsetzung prägen.

Die Idee, Sprache als Folge von Wahrscheinlichkeiten für das nächste Zeichen zu modellieren, geht auf Shannons
Informationstheorie zurück [Shannon1948]; neuronale Sprachmodelle lernten diese Verteilungen mit verteilten Wortvektoren
[Bengio2003], GPT-Modelle mit decoder-only Transformern [Radford2018][Radford2019].

Kosten: Ohne Speicher müsste jeder neue Takt die ganze Folge neu rechnen. Der [KV-Cache](kv-cache.md) speichert K und V
früherer Positionen; dann rechnet jeder [Decode](decode.md)-Schritt nur das neue Token durch. Der erste Schritt über den ganzen
Prompt heißt [Prefill](prefill.md).

Im **Training** gibt es keine Schleife: Alle Positionen werden parallel gegen das jeweils nächste Token geprüft; die
[kausale Maske](kausale-maske.md) sorgt dafür, dass das dieselbe Rechnung ist ([Next-Token-Ziel](next-token-ziel.md)).

## Figur in Kontextia

Der **Stadttakt** selbst [DE]: Bei jedem Glockenschlag entsteht genau ein neues Token. **Edda** entscheidet über Ende oder
Weiter, der **Bürgermeister** vergibt den nächsten Platz, und **Toki** fährt zurück in den Hafen. Abends zieht die Antwort als
Prozession ein, ein Token pro Glockenschlag.

## Im Spiel

L05 (Snake): Die Schlange **ist** der erzeugte Text; jede Frucht ein Kandidat; sich selbst beißen = Wiederholungsschleife
(im kleinen Übungsmarkt mit Greedy sicher, im großen Markt nur manchmal – [Greedy](greedy.md)) [DE 11.10. Didaktik].
Teil 1: „Ein Wort nach dem anderen.“ L06: Wie viel man mit Kajos Archiv pro Schritt spart.

## Hier endet das Bild

Eine Schlange plant ihren Weg. Das Modell plant nicht im menschlichen Sinn voraus; es berechnet in jedem Takt nur die
Verteilung für **ein** nächstes Token. Weil jedes gezogene Token alle späteren mitbestimmt, kann schon eine kleine Änderung am
Anfang eine ganz andere Antwort ergeben ([Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md))
[DE 11.10. Didaktik].

## Häufige Irrtümer

- „Das Modell schreibt die ganze Antwort auf einmal.“ – Nein, Token für Token.
- „Eigene Fehler kann es später korrigieren, als hätte es sie nie geschrieben.“ – Sie bleiben im Kontext.
- „Beim Training wird auch Token für Token generiert.“ – Nein, parallel mit Maske.

## Verwandte Begriffe

[EOS](eos.md) · [Prefill](prefill.md) · [Decode](decode.md) · [KV-Cache](kv-cache.md) · [Kausale Maske](kausale-maske.md) ·
[Next-Token-Ziel](next-token-ziel.md) · [Kontextfenster](kontextfenster.md)

## Quellen

[Shannon1948], [Bengio2003], [Radford2018], [Radford2019], [HF-CLM] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
