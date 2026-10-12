# Next-Token-Ziel (Vorhersage des nächsten Tokens)

**Stadttakt:** „Geschichte“ (Training) · **Welt:** L07 Lernschmiede · **Figuren:** Lio Logit (seine Tafel wird geprüft), Gilda Gradient · **Anschluss:** ID (Zieltoken) + W% (Vorhersage) → L (Fehlerkerbe)

## Kurz für Kinder (Teil 1)

Das Übungsspiel der Schmiede ist ganz einfach: **„Welches Wort kommt als Nächstes?“** Man deckt einen Satz Wort für Wort auf.
Bei jedem Wort rät die Stadt das nächste und schaut dann nach, ob sie richtig lag. Mehr braucht es nicht – nur sehr, sehr
viele Sätze.

## Genauer (Teil 2)

Das Trainingsziel eines kausalen Sprachmodells ist, an jeder Position das **nächste** Token wahrscheinlich zu machen
[HF-CLM]. Dazu werden Eingabe und Ziel um **eine Position verschoben** (Teacher Forcing):

| Position | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Eingabe | Die | Sonne | scheint | hell |
| Ziel | Sonne | scheint | hell | . |

Der Verlust ist der Mittelwert der [Cross-Entropy](cross-entropy-loss.md) über alle Positionen:

`L = −(1/n) · Σ_t log p(Ziel_t ∣ Token_1 … Token_t)`

Wichtig:
- Alle Positionen werden **gleichzeitig** gerechnet. Die [kausale Maske](kausale-maske.md) verhindert, dass Position 2 schon
  „scheint“ sieht – sonst könnte sie das Ziel einfach abschreiben.
- Beim Training steht an jeder Position der **echte** Vortext, nicht das, was das Modell selbst erzeugt hätte (darum
  „Teacher Forcing“). Beim Generieren dagegen hängen die eigenen Tokens an ([Autoregression](autoregression.md)).
- Die Ziele kommen aus dem Text selbst – niemand muss Beschriftungen schreiben. Deshalb lässt sich auf sehr großen
  Textmengen [vortrainieren](pretraining.md) [Radford2018][Brown2020].

Das Ziel ist alt: Shannon beschrieb Annäherungen an Englisch über Wahrscheinlichkeiten für das nächste Zeichen bzw. Wort
[Shannon1948]; Bengio et al. lernten solche Verteilungen mit einem neuronalen Netz und verteilten Wortvektoren [Bengio2003].

Rechenbeispiel einer Position: Das Modell gibt dem richtigen Token „scheint“ die Wahrscheinlichkeit 0,5 → Beitrag −ln 0,5 =
0,693. Bei 0,9 wäre es 0,105, bei 0,01 schon 4,605.

## Figur in Kontextia

Kein eigener Charakter. In der Lernschmiede legt man ein **Lösungsheft** [DE-Vorschlag] neben **Lios** Punktetafel: Das
Zieltoken zeigt, welches Fach zählt. Die Fehlerkerbe (L) geht an **Gilda**.

## Im Spiel

L07 (Murmel-Schmiede): Die verschobene Zeile wird sichtbar unter die Eingabezeile gelegt; Teil 2 rechnet den Verlust für
einen Mini-Satz. Validierungs- und Transferbeispiele sind andere Sätze als die Trainingsbeispiele (Test T16).

## Hier endet das Bild

„Wort raten“ klingt nach einem Spiel mit Absicht. Das Modell **optimiert eine Zahl**; dass dabei Grammatik, Fakten und Stil
mitgelernt werden, ist eine Folge des Ziels, kein eigenes Lernziel. Und das Ziel belohnt „wahrscheinlich“, nicht „wahr“.

## Häufige Irrtümer

- „Das Modell lernt Antworten auswendig.“ – Es lernt Wahrscheinlichkeiten fürs nächste Token; Auswendiglernen ist eine
  unerwünschte Nebenwirkung ([Überanpassung](validierung-ueberanpassung.md)).
- „Beim Training wird Token für Token generiert.“ – Nein, parallel mit Maske.
- „Next-Token-Training macht wahrheitsliebend.“ – Es macht „passend zum Trainingstext“.

## Verwandte Begriffe

[Cross-Entropy-Loss](cross-entropy-loss.md) · [Training](training.md) · [Kausale Maske](kausale-maske.md) ·
[Autoregression](autoregression.md) · [Pretraining](pretraining.md) · [Logits](logits.md)

## Quellen

[Shannon1948], [Bengio2003], [Radford2018], [Brown2020], [HF-CLM] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
