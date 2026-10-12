# Pretraining (Vortraining)

**Stadttakt:** „Geschichte“ – die Gründerzeit der Stadt · **Welt:** L07 Lernschmiede · **Figuren:** Gilda Gradient, Olli Optimierer · **Anschluss:** L → G → P

## Kurz für Kinder (Teil 1)

Ganz am Anfang war die Stadt leer: Alle Stellschrauben standen zufällig. Dann hat die Schmiede die Stadt **riesige Mengen Text**
lesen lassen und bei jedem Wort geübt: „Was kommt als Nächstes?“ So entstand das **Stadtwissen** – wie Muskelgedächtnis beim
Fahrradfahren, **verteilt über alle Schrauben**, ohne ein Fach mit fertigen Antworten. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Pretraining ist das erste, größte Training eines Sprachmodells: Next-Token-Vorhersage auf sehr großen, unbeschrifteten
Textsammlungen ([Next-Token-Ziel](next-token-ziel.md)). Die Ziele kommen aus dem Text selbst, deshalb braucht man keine
Beschriftungen.

Wegmarken:
- **GPT-1** zeigte, dass generatives Vortraining eines decoder-only Transformers und anschließendes gezieltes Feinabstimmen
  viele Sprachaufgaben verbessert [Radford2018].
- **GPT-2** wurde nur aufs nächste Token trainiert (auf dem Datensatz WebText) und konnte manche Aufgaben ohne eigenes
  Feinabstimmen lösen („zero-shot“) [Radford2019].
- **GPT-3** mit 175 Milliarden Parametern löste Aufgaben aus wenigen Beispielen im Prompt, **ohne Gradientenupdates**
  [Brown2020].
- **LLaMA** wurde ausschließlich auf öffentlich verfügbaren Daten trainiert, das größte Modell auf 1,4 Billionen Tokens
  [Touvron2023].

Was dabei herauskommt, ist ein **Basismodell**: Es setzt Texte fort, folgt aber nicht zuverlässig Anweisungen. Dafür gibt es
danach [Fine-tuning](fine-tuning.md) und [Präferenztraining](praeferenztraining-rlhf.md) [Ouyang2022].

Wichtig für die vier Gedächtnisse (KANON §16): Was im Pretraining gelernt wurde, steckt in den **Gewichten** (Stadtwissen). Es
hat einen **Wissensstand**: Ereignisse nach dem Ende der Trainingsdaten kennt das Modell nicht – es sei denn, man legt Quellen in
den Prompt ([RAG](rag.md)).

Kosten: Pretraining ist der teuerste Schritt. Es braucht viele Beschleuniger über lange Zeit; LLaMA nennt für den größten Lauf
etwa 21 Tage auf 2048 A100-GPUs [Touvron2023]. Spätere Anpassungen sind viel billiger.

## Figur in Kontextia

Die **Schmiedezunft** als Gründer der Stadt: Gilda, Olli und Vali haben in der Gründerzeit die Stellschrauben eingestellt. Heute
ist die Esse kalt und versiegelt; ihr Werk lebt in jeder Stellschraube (Schmiedelinien im
[Stammbaum](../../../01_design/v2/STAMMBAUM.md)).

## Im Spiel

L07 (Murmel-Schmiede) erzählt Stadtgeschichte: Erst rollt die Murmel lange auf großer, allgemeiner Landschaft (Pretraining), dann
kurz in einem kleinen Tal (Fine-tuning). Teil 1: „Beim Reden lernt die Brücke nicht – aber jemand kann mitschreiben.“
([Mitschreiber](mitschreiber-datenschutz.md)) [DE 11.10. Didaktik, KANON §21 L11]

## Hier endet das Bild

„Viel lesen“ klingt nach Bücherwissen, das man nachschlagen kann. Das Modell **speichert keine Bücher**; es stellt Zahlen so ein,
dass Fortsetzungen wahrscheinlich werden. Einzelne Stellen können trotzdem wörtlich hängen bleiben – auch das ist kein
verlässliches Nachschlagen.

## Häufige Irrtümer

- „Pretraining macht das Modell zum Assistenten.“ – Dafür braucht es meist weitere Trainingsphasen.
- „Das Modell kennt das Internet von heute.“ – Nur bis zum Datenstand.
- „Je mehr Daten, desto wahrer.“ – Mehr Daten heißt nicht automatisch richtigere Daten.

## Verwandte Begriffe

[Training](training.md) · [Next-Token-Ziel](next-token-ziel.md) · [Fine-tuning](fine-tuning.md) ·
[Präferenz- und Feedbacktraining](praeferenztraining-rlhf.md) · [Parameter und Gewichte](parameter-gewichte.md) · [RAG](rag.md)

## Quellen

[Radford2018], [Radford2019], [Brown2020], [Touvron2023], [Ouyang2022], [HF-Training] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
