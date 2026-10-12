# Kontextfenster

**Stadttakt:** 1 und 13 · **Welt:** L01 Tokenhafen (Rathaus) · **Figur:** Bürgermeister Kontext · **Anschluss:** Schloss: Kette quadratischer Platzbuchsen (ID) · Schlüssel: Platznummern-Budget

## Kurz für Kinder (Teil 1)

Der Zug der Stadt hat eine **feste Zahl von Sitzplätzen**. Die Frage braucht Plätze – und die Antwort auch, denn jedes
neue Wort steigt mit ein. Sind alle Plätze besetzt, passt nichts mehr hinein, oder die Ältesten müssen aussteigen.
Das ist das „Tischwissen“: alles, was heute auf dem Tisch liegt.

**Voll heißt aber nicht gut gelesen:** Je mehr auf dem Tisch liegt, desto dünner werden Sofis Kuchenstücke, und was in der
Mitte liegt, geht leichter unter. Und was ausgestiegen ist, meldet die Stadt nicht mit einem „?“ – sie rät flüssig weiter.
Echte Züge haben übrigens Tausende bis Hunderttausende Plätze. [DE 11.10. Didaktik]

## Genauer (Teil 2)

Das Kontextfenster ist die **Höchstzahl an Token-Positionen**, die ein Modell in einem Durchlauf verarbeiten kann.
GPT-1 trainierte mit Folgen von 512 Tokens [Radford2018], GPT-2 erhöhte auf 1024 [Radford2019]. Heutige Modelle haben
oft viel größere Fenster – etwa 128K (rund 128.000) Tokens bei Llama 3.1 [Meta2024]; die genaue Grenze ist eine Eigenschaft des
jeweiligen Modells. Echte Fenster reichen also von Tausenden bis Hunderttausenden Plätzen [DE 11.10. Didaktik].

Rechnung im Spiel (L01, Teil 2): Fenster 1024 Plätze. Systemprompt 120 Tokens + Frage 380 Tokens = 500 belegt.
Bleiben 524 Plätze für die Antwort (`max_new_tokens` darf nicht mehr verlangen). Jedes erzeugte Token belegt einen
weiteren Platz ([Autoregression](autoregression.md)).

Was passiert, wenn es voll ist, entscheidet die **Anwendung**: abschneiden (Trunkierung), die ältesten Tokens
herausschieben (gleitendes Fenster) oder abbrechen. Dabei geht Information verloren – das Modell „erinnert“ sich nicht
an Herausgeschobenes.

Drei Dinge, die oft verwechselt werden:
- **Fenster ≠ Speicher:** Der [KV-Cache](kv-cache.md) speichert Zwischenergebnisse für die Tokens *im* Fenster. Er
  wächst mit, vergrößert das Fenster aber nicht [HF-KVCache].
- **Fenster ≠ Rechenkosten:** Klassische Self-Attention kostet Zeit und Speicher, die quadratisch mit der Länge wachsen
  [Dao2022]. Ein „Out of Memory“ ist ein Hardwareproblem, keine Fenstergrenze.
- **Im Fenster ≠ gut genutzt:** Modelle nutzen Informationen in der Mitte langer Kontexte oft schlechter als am Anfang
  oder Ende [Liu2023]. Dazu kommt die **Verdünnung**: Softmax verteilt jeden Kuchen auf alle erlaubten Positionen; je mehr
  Positionen ähnlich hohe Scores haben, desto kleiner der Anteil jeder einzelnen ([Attentiongewicht](attentiongewicht.md))
  [DE 11.10. Didaktik].
- **Herausgefallen ≠ als Lücke markiert:** Fehlt eine Information, weil sie herausgeschoben wurde, erzeugt das Modell trotzdem
  eine flüssige Fortsetzung – oft eine geratene ([Halluzination](halluzination.md)) [DE 11.10. Didaktik].

## Figur in Kontextia

**Bürgermeister Kontext** (Hafengilde, Sitz im Rathaus): blau-grauer Brückenbogenkörper mit Fahrkartenzähler. Sein
Schloss ist eine **Kette quadratischer Platzbuchsen** – jede nimmt genau einen ID-Zapfen auf. Sein Schlüssel ist das
**Platznummern-Budget**. Er zählt, wacht und schickt bei Überfüllung die Ältesten hinaus, wenn die Anwendung es so will.

## Im Spiel

L01 (Tetris): Der Schacht **ist** das Kontextfenster. Teil 1: Auch die Antwort braucht Platz; ist der Schacht voll,
fällt das Älteste heraus. Abschnitt B′ **„Nebel statt Fragezeichen“** [DE 11.10. Didaktik]: Vorhersage, was die Stadt sagt, wenn
ein Name ausgestiegen ist – (a) „Weiß ich nicht“, (b) „?“, (c) ein Name. Sie sagt flüssig einen falschen Namen; nur Quirins Glas
zeigt den Nebelrand. Merksatz: „Was ausgestiegen ist, rät die Stadt – und merkt nicht, dass sie rät.“ L03 B′ „Volle Halle,
dünner Kuchen“ zeigt, dass auch das Eingestiegene nicht gleich gut gelesen wird. Teil 2: Prompt gegen `max_new_tokens`
abwägen, Sondertokens mitzählen, Sliding Window ausprobieren, Fenstergrößen echter Modelle. Test T02: Kosmetisches
Reihenräumen ändert den Kontextzähler nicht.

## Hier endet das Bild

Ein Zug kann leere Sitze zwischen Fahrgästen haben. Ein echtes Fenster hat **keine Lücken**: Die Folge ist lückenlos von
Position 0 bis zum letzten Token. **Voll heißt nicht gut gelesen:** Je mehr auf dem Tisch liegt, desto dünner werden die
Kuchenstücke, und was in der Mitte liegt, geht leichter unter [Liu2023]. Was beim Überlaufen passiert, legt die Anwendung fest.
[DE 11.10. Didaktik]

## Häufige Irrtümer

- „Das Modell merkt sich alles aus früheren Gesprächen.“ – Nur was im aktuellen Fenster steht (oder von der Anwendung
  wieder hineingelegt wird: [Tischlernen](tischlernen.md)). Gespeichert werden kann ein Gespräch trotzdem – von der Anwendung
  ([Mitschreiber](mitschreiber-datenschutz.md)) [DE 11.10. Didaktik].
- „Was im Fenster steht, wird vollständig gelesen; nur Herausgefallenes fehlt.“ – Nein, auch Eingestiegenes kann
  untergehen [Liu2023] [DE 11.10. Didaktik].
- „Was herausgefallen ist, meldet die Stadt mit ‚weiß ich nicht‘.“ – Sie rät flüssig weiter [DE 11.10. Didaktik].
- „Der KV-Cache macht das Fenster größer.“ – Nein.
- „Mehr Platz heißt bessere Antworten.“ – Nicht automatisch; Platzierung und Relevanz zählen.
- „Die Antwort kostet keinen Platz.“ – Jedes Antworttoken belegt einen Platz.

## Verwandte Begriffe

[Token](token.md) · [Sondertokens](sondertokens.md) · [Autoregression](autoregression.md) · [KV-Cache](kv-cache.md) ·
[Positionsinformation](positionsinformation.md) · [RAG](rag.md) · [Systemprompt](systemprompt.md) ·
[Attentiongewicht](attentiongewicht.md) · [Tischlernen](tischlernen.md) · [Halluzination](halluzination.md)

## Quellen

[Radford2018], [Radford2019], [Meta2024], [Dao2022], [Liu2023], [HF-KVCache], [HF-GenConfig] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)
