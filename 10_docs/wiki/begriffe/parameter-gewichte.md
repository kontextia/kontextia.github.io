# Parameter und Gewichte

**Stadttakt:** in jedem Moment benutzt, nie verändert · **Welt:** L07 (Herkunft), L08 (Speicher) · **Figuren:** die Stellschrauben der Stadt; eingestellt von Olli Optimierer · **Anschluss:** P – Schraubenkopf mit Skala (Indigo, Glyphe ⚙; nur in der Schmiede entriegelt)

## Kurz für Kinder (Teil 1)

Überall in der Stadt stecken **Stellschrauben**: in Emmis Kartenbuch, in Querias Prägestempel, in Finas Werkstatt, in Lios
Punktetafel. Zusammen sind sie das **Stadtwissen**. Beim Antworten werden sie nur benutzt, nie verdreht – sie sind versiegelt,
seit die Schmiede kalt ist. Wissen steckt **nicht in einer Schraube, sondern in allen ein bisschen**: Es gibt kein Fach mit
fertigen Antworten und keine eingeschriebenen Wenn-dann-Regeln. (Und auch wenn sich beim Reden keine Schraube dreht: Was du
schreibst, kann jemand mitschreiben – [Mitschreiber](mitschreiber-datenschutz.md).) [DE 11.10. Didaktik]

## Genauer (Teil 2)

**Parameter** sind alle Zahlen eines Modells, die beim Training gelernt werden. **Gewichte** sagt man meist für die Einträge der
Matrizen; dazu kommen Biases und Norm-Parameter. In einem Transformer sind das vor allem:

| Parameter | Figur (Patin/Pate) | Größe (Beispiel GPT-1, d = 768) |
|---|---|---|
| Embedding-Tabelle W_E | Emmi | Vokabulargröße × 768 |
| W_Q, W_K, W_V je Stockwerk | Queria, Keylian, Valo | je 768 × 768 |
| W_O je Stockwerk | Oskar | 768 × 768 |
| FFN W₁, W₂ je Stockwerk | Fina | 768 × 3072 und 3072 × 768 |
| Norm-Gewichte γ, β | Nora | je 768 |
| LM-Kopf W_LM | Lio | 768 × Vokabulargröße (oder = W_Eᵀ) |

Zahlen nach [Radford2018]; die vier Attention-Matrizen und das FFN eines Stockwerks ergeben zusammen 7.077.888 Gewichte.

**Was keine Parameter sind:**
- **Aktivierungen** (Hidden States, Q, K, V, Scores) – sie werden bei jeder Eingabe neu berechnet.
- **Hyperparameter** wie Lernrate, Zahl der Stockwerke oder Temperatur – sie werden von Menschen gewählt.
- Der **KV-Cache** – Zwischenergebnisse einer Rechnung.
- Die BPE-**Merge-Liste** – sie ist gelernt, aber durch Zählen, nicht per Gradient.

**Speicher = Anzahl · Bytes pro Zahl.** Ein Modell mit 6,7 Milliarden Parametern (LLaMA-7B [Touvron2023]) braucht in FP32 26,8 GB, in
16 bit 13,4 GB, in 8 bit 6,7 GB und in 4 bit 3,35 GB plus Maßstäbe ([Quantisierung](quantisierung.md)).

**Wo sie herkommen:** Gradientenabstieg setzt sie im Training ([Training](training.md)) – im Stammbaum die **Schmiedelinie** von
Olli zu jeder Stellschraube. **Wann sie sich ändern:** nur in Training oder Fine-tuning, nie beim Antworten (KANON §16,
„Stadtwissen“).

## Figur in Kontextia

Datentyp **P – Stellschraube**: Schraubenkopf mit Skala, Indigo. P hat **kein Schloss** im Anschluss-Alphabet: Nur Ollis
Schraubendreher kann sie in der Schmiede drehen; in der Stadt sind alle Schrauben versiegelt. Im
[Stammbaum](../../../01_design/v2/STAMMBAUM.md) erscheinen Parameter als **Patinnen und Paten** (gold gepunktete Linien) der
Datentypen, die sie formen.

## Im Spiel

L07: Eine Parameterzahl verändert sich sichtbar nach einem berechneten Update (Animationsregel). Abschnitt B′ „Die
Schraubensuche“ [DE 11.10. Didaktik]: Es gibt keine eine Mondschiff-Schraube; jede Drehung ändert viele Antworten ein bisschen.
L08 (Bit-Kong): Die Stellschrauben werden in gröbere Stufen gepackt; ihre Anzahl bleibt gleich.

## Hier endet das Bild

Eine Stellschraube hat eine Bedeutung („Lautstärke“). Einzelne Parameter haben meist **keine** verständliche Einzelbedeutung;
Wissen ist über viele verteilt. Keine Schraube und kein Fach enthält eine Antwort. Manche Fakten lassen sich bestimmten
Stockwerken zuordnen und gezielt ändern – schwierig und mit Nebenwirkungen [Meng2022]. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Mehr Parameter = mehr Fakten gespeichert, eins pro Fakt.“ – Nein, Wissen ist verteilt.
- „Beim Chatten werden Gewichte angepasst.“ – Nein. Gespeichert werden kann ein Chat trotzdem – von der Anwendung, und
  vielleicht später für ein neues Training verwendet ([Mitschreiber](mitschreiber-datenschutz.md)) [DE 11.10. Didaktik].
- „Die Temperatur ist ein Parameter des Modells.“ – Sie ist eine Einstellung beim Ziehen.
- „Quantisierung entfernt Parameter.“ – Sie speichert sie gröber; die Anzahl bleibt.

## Verwandte Begriffe

[Training](training.md) · [Optimierer und Lernrate](optimierer-lernrate.md) · [Embedding](embedding.md) ·
[Transformer-Block](transformer-block.md) · [Zahlenformate](zahlenformate.md) · [Quantisierung](quantisierung.md)

## Quellen

[Radford2018], [Touvron2023], [Goodfellow2016], [Meng2022] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
