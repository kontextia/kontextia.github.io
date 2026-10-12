# Halluzination

**Stadttakt:** 12 (entsteht am Logitmarkt), am Antworttor sichtbar · **Welt:** L00 (Prolog), L01, L05, L09 (Abschnitt B′), Finale; Bezug L07 · **Figuren:** der „Nebel der Selbstsicherheit“ (Naturphänomen, kein Bösewicht; wohnt am Logitmarkt [DE 11.10. Didaktik]); Bela Beleg prüft die Antwort · **Anschluss:** —

## Kurz für Kinder (Teil 1)

Manchmal steigt am **Logitmarkt** der **Nebel der Selbstsicherheit** auf. Das passiert, wenn das Glücksrad drehen muss, obwohl
auf dem Tisch nichts liegt, was die Antwort stützt – denn **das Rad zieht immer ein Stück**. Der Nebel zieht mit der Antwort
durch das Antworttor auf die Brücke. Dann klingt eine Antwort ganz flüssig und sicher – ist aber falsch oder durch nichts
belegt.

Der Nebel kommt **nicht von draußen**: Er entsteht **in der Stadt**. Die Stadt lügt dabei nicht absichtlich, und sie schaltet
**kein Warnlicht** ein, wenn sie rät. Gute Quellen machen den Nebel **dünner, aber nie null**. Darum prüft Bela die
**Antwort** – und du fragst dich bei jeder KI: **„Könnte das geraten sein?“** [DE 11.10. Didaktik, KANON §13 „Woher der Nebel
kommt“]

## Genauer (Teil 2)

Als Halluzination bezeichnet man erzeugten Inhalt, der **sachlich falsch** oder **durch die vorgegebene Quelle nicht gestützt** ist
[Ji2023]. Bei Zusammenfassungen unterscheidet man intrinsische (widersprechen der Quelle) und extrinsische (nicht aus ihr ableitbare)
Halluzinationen [Maynez2020]. Was als Halluzination zählt, hängt also vom **Prüfmaßstab** ab: Welt­wissen oder bereitgestellte Quelle.

Warum sie entstehen (Stand der Forschung, vorsichtig zusammengefasst):
- Das Modell lernt **Wahrscheinlichkeiten fürs nächste Token** ([Next-Token-Ziel](next-token-ziel.md)), nicht „wahr/falsch“.
  Flüssig klingend heißt nicht belegt.
- Kalai et al. argumentieren, dass Halluzinationen statistisch wie Fehler einer Ja/Nein-Klassifikation entstehen und **bestehen
  bleiben, weil Training und Bewertungen Raten belohnen** statt ehrliches Eingestehen von Unsicherheit; sie schlagen vor, die Bewertung
  von Benchmarks zu ändern [Kalai2025].
- **Das Rad zieht immer** [DE 11.10. Didaktik]: Beim Erzeugen wird in jedem Schritt ein Token gezogen; eine eingebaute Option
  „nichts“ gibt es nicht. Auch „Ich weiß es nicht“ ist nur eine Tokenfolge, die wahrscheinlich genug sein muss
  ([Sampling und Seed](sampling-seed.md)).
- Fehlendes oder veraltetes Wissen und mehrdeutige Fragen erhöhen das Risiko. Falsche Quellen im Prompt sind ein
  **zusätzliches, anderes** Risiko (im Spiel: der Gerüchtzettel). Halluzinationen entstehen aber **im Modell** – saubere Daten
  und gute Quellen machen sie seltener, nicht unmöglich [DE 11.10. Didaktik, KANON §21 L4].

**Kein Warnlicht [DE 11.10. Didaktik]:** Das Modell schaltet kein Signal ein, wenn es rät. Unsicherheit steckt höchstens
**ungenau** in seinen Zahlen: Ein flaches Rad (hohe Entropie) ist ein Hinweis – aber auch ein spitzes Rad kann Nebel ziehen.
Kadavath et al. zeigen, dass große Modelle teilweise abschätzen können, ob ihre Antwort stimmt (Kalibrierung), und dass dies
bei neuen Aufgabenarten schlechter gelingt [Kadavath2022]. Ein verlässlicher eingebauter Melder ist das nicht; „Ich weiß es
nicht“ ist eine Regel der Anwendung bzw. der Brückenbauer, keine verlässliche Fähigkeit des Modells [Kalai2025].

Was hilft – und was nicht:
- **Quellen auf den Tisch** ([RAG](rag.md)) und **die Antwort prüfen** ([Grounding und Beleg](grounding-beleg.md)): Retrieval
  verringert Halluzinationen, beseitigt sie aber nicht – auch mit passender Quelle kann Unbelegtes dazukommen
  [Shuster2021][Lewis2020].
- **Werkzeuge** für Rechnen oder Abfragen ([Tool und Funktionsaufruf](tool-funktionsaufruf.md)); ReAct berichtet weniger
  Halluzinationen durch Abfragen einer Wikipedia-API [Yao2022].
- **Regeln der Anwendung:** etwa „ohne Beleg keine Behauptung“ – nach Belas Prüfung zündet die **Anwendung** die
  Ehrlich-offen-Laterne. Bewertungen, die ehrliches Nicht-Wissen nicht bestrafen, können solches Verhalten fördern [Kalai2025].
- **Nicht zuverlässig:** Temperatur senken, auf Attentiongewichte schauen oder auf selbstsicheren Ton achten – keines davon erkennt
  Halluzinationen sicher (Projekt-Wiki 1.0).

Beispiel: Frage „Wer erfand Kontextias Glücksrad?“ Keine Quelle nennt eine Person. Halluziniert: „Das war Professor Bertram Rad im
Jahr 1820.“ Eine Anwendung mit Belegprüfung markiert den Satz als unbelegt und gibt stattdessen aus: „Dazu liegt keine Quelle
vor.“

## Figur in Kontextia

Kein Bösewicht (KANON §13): Gegenspieler ist der **Nebel der Selbstsicherheit**, ein Naturphänomen (Plüschwolken-Verkäufer).
Er wohnt **am Logitmarkt**, steigt aus dem Glücksrad auf und zieht mit der Antwort hinaus; sein Requisit ist ein **Nebelsatz im
Antwortentwurf**, kein Quellenblatt [DE 11.10. Didaktik]. Gegenmittel: **Bela Beleg** prüft die Antwort gegen die Quellen,
**Ria** bringt die ähnlichsten Blätter (ob eins passt, prüft Bela), **Vali** prüft mit Unbekanntem. Was im Quellenstrom ohne
Quellen-ID treibt, heißt **Gerüchtzettel** – ein unbelegtes Fremddokument und ein anderes Risiko. In L05 erkennt man: Auch eine
sehr wahrscheinliche Frucht kann falsch sein.

## Im Spiel

[DE 11.10. Didaktik] Prolog L00: Die Schneekugel-Stadt beantwortet eine Frage, die niemand wissen kann („Wie heißt Tokis
Lieblingsmöwe?“), flüssig mit „Gustav“ – nur durch Quirins Glas sieht man den Nebel. L01 B′ „Nebel statt Fragezeichen“: Ist ein
Name aus dem Zug gestiegen, sagt die Stadt flüssig einen falschen Namen statt „?“. L05 B′ „Hier steigt der Nebel auf“: Das Rad
kann nicht „nichts“ ziehen. L09 (Frogger + Finale), B′ „Nebel trotz Quelle“: Auch mit dem richtigen Blatt steht ein unbelegter
Satz im Entwurf; Bela markiert ihn. Merksatz: „Quellen machen den Nebel dünner, nicht weg.“ Teil 2: Grounding ≠ Wahrheit;
Antworten nach gestützt / widersprochen / offen einordnen.

## Hier endet das Bild

„Halluzinieren“ klingt nach Sinnestäuschung oder Lüge. Das Modell **will nichts**: Die Fehler entstehen aus Wahrscheinlichkeiten,
Trainingsziel und dem Ziehen, nicht aus Absicht. Und echten Nebel kann man sehen – eine Halluzination nicht: Nur die Spielenden
sehen durch Quirins Glas den Nebelrand; die Stadt selbst schaltet kein Warnlicht ein. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Halluzinationen sind Lügen.“ – Keine Absicht, ein statistischer Fehler.
- „Halluzinationen kommen von schlechten Daten; mit sauberen Quellen gibt es keine.“ – Sie entstehen im Modell; gute Quellen
  machen sie seltener, nie null [Shuster2021] [DE 11.10. Didaktik].
- „Eine KI sagt verlässlich, wenn sie etwas nicht weiß.“ – Nein, sie schaltet kein Warnlicht ein; Unsicherheit steckt höchstens
  ungenau in ihren Zahlen [Kadavath2022] [DE 11.10. Didaktik].
- „Mit niedriger Temperatur gibt es keine.“ – Auch Greedy kann Falsches sicher sagen.
- „Mit RAG gibt es keine.“ – Weniger, aber nicht null.
- „Flüssig und sicher klingend = richtig.“ – Gerade nicht.

## Verwandte Begriffe

[Grounding und Beleg](grounding-beleg.md) · [RAG](rag.md) · [Sampling und Seed](sampling-seed.md) ·
[Next-Token-Ziel](next-token-ziel.md) · [Validierung und Überanpassung](validierung-ueberanpassung.md) ·
[Temperature](temperature.md) · [Präferenz- und Feedbacktraining](praeferenztraining-rlhf.md) ·
[Bildbruch / Quirins Glas](bildbruch-quirins-glas.md)

## Quellen

[Ji2023], [Maynez2020], [Kalai2025], [Kadavath2022], [Shuster2021], [Lewis2020], [Yao2022] – vollständige Angaben in
[QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L10 **Die Nebelnacht** ergänzt seltene Fakten, bedingte Fehlerketten, Punktregeln, Kalibrierung und Laternen mit Preis. Ein chronikalisch gestützter Satz kann heute falsch sein (alte Fahrzeit); Unterstützung und Wahrheit werden getrennt geprüft. Siehe [Einmal-Fakten](einmal-fakten.md), [Schneeball-Fehler](schneeball-fehler.md), [Mehrmals fragen](mehrmals-fragen.md).
