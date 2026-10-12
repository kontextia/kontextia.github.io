# Grounding und Beleg

**Stadttakt:** „außerhalb“ – nach der Antwort · **Welt:** L09 Quellenarchipel (Stempelamt) · **Figur:** Bela Beleg · **Anschluss:** Schloss DOC-Schlitz + TXT-Schlitz → Schlüssel BEL (Belegklammer, hält Textwelle und Quellenblatt zusammen; Weißblau mit Tintenrand, ⊐)

## Kurz für Kinder (Teil 1)

Bela ist eine **Klammer**. Sie klammert jeden Satz der Antwort an das Quellenblatt, auf dem er wirklich steht. Findet sie kein
passendes Blatt, bleibt der Satz ohne Klammer – und alle können sehen: Das ist **nicht belegt**. „Belegt – oder ehrlich offen.“
Bela prüft dabei die **Antwort**, nicht nur die Quellen: Auch wenn das richtige Blatt auf dem Tisch liegt, kann ein Satz ohne
Beleg dazukommen. Und belegt heißt nicht wahr – aber prüfbar. [DE 11.10. Didaktik]

## Genauer (Teil 2)

**Grounding** heißt: Eine Aussage stützt sich nachprüfbar auf bereitgestellte Quellen oder Werkzeugergebnisse. Ein **Beleg** ist
die konkrete Zuordnung *Aussage ↔ Quelle(nstelle)*.

Prüfschritte (Lehrverfahren in L09):
1. Antwort in einzelne Aussagen zerlegen.
2. Für jede Aussage die Quelle(n) suchen, die sie **tatsächlich stützen**.
3. Bewerten: gestützt · widersprochen · nicht entscheidbar.

Beispiel: Quelle 1: „Die Brücke von Kontextia wurde im Jahr 12 gebaut.“ Antwort: „Die Brücke wurde im Jahr 12 gebaut und ist 300 Meter
lang.“ → Teil 1 **gestützt** (Klammer an Quelle 1), Teil 2 **nicht gestützt** (keine Quelle nennt die Länge). Die Antwort ist also nur
teilweise belegt, obwohl eine Quelle existiert.

Maynez et al. unterscheiden bei Zusammenfassungen **intrinsische** Halluzinationen (der Quelle widersprechend) und **extrinsische**
(nicht aus der Quelle ableitbar); sie fanden in allen untersuchten Systemen viel nicht-treuen Inhalt und dass Entailment-Maße besser
mit Treue übereinstimmen als übliche Textmetriken [Maynez2020]. Einen breiten Überblick über Messung und Minderung gibt Ji et al.
[Ji2023]. RAG wurde auch eingeführt, um Herkunft („provenance“) für Entscheidungen angeben zu können [Lewis2020].

Grenzen:
- **Grounding ≠ Wahrheit:** Eine Quelle kann selbst falsch oder veraltet sein.
- **Zitat ≠ Stütze:** Eine angehängte Quelle beweist nichts, wenn sie die Aussage gar nicht enthält.
- **Richtige Quelle ≠ ganz belegte Antwort:** Auch mit passender Quelle kann das Modell Unbelegtes hinzufügen; Retrieval
  senkt Halluzinationen, beseitigt sie nicht [Shuster2021]. Deshalb wird die **Antwort** geprüft [DE 11.10. Didaktik].
- **Belegprüfung kostet Aufwand** und kann selbst fehlerhaft sein; im Spiel ist die Bibliothek deshalb geschlossen und bekannt
  (Technische Dokumentation).

## Figur in Kontextia

**Bela Beleg** (Quellenwächter, Stempelamt): weißblauer **Clipkörper mit Quellen-ID**. Schloss: **DOC-Schlitz + TXT-Schlitz** (Quelle
und Aussage), Schlüssel: **BEL-Belegklammer**. Ria liefert ihr Quellenblätter (Freundeslinie DOC). Sperrlinie Bela ⊘ Wera: Eine
Belegklammer ist **keine Werkzeugerlaubnis**. Die **Ehrlich-offen-Laterne** zündet nach Belas Prüfung die **Anwendung** – nicht
die Stadt: Sie schaltet kein Warnlicht ein, wenn sie rät [DE 11.10. Didaktik].

## Im Spiel

L09: Bela klammert Belege; eine Herkunftslinie verbindet Satzteil und tatsächlich stützende Quelle (Animationsregel). Abschnitt
B′ „Nebel trotz Quelle“ [DE 11.10. Didaktik]: Vorhersage, ob mit dem richtigen Blatt alles belegt ist – ein unbelegter Satz
steht trotzdem im Entwurf, Bela markiert ihn. Teil 2: Grounding ≠ Wahrheit – ein falsches, aber zitiertes Blatt entlarven.
Gegenspieler ist der **Nebel der Selbstsicherheit**.

## Hier endet das Bild

Eine Büroklammer hält, was man zusammensteckt. Ob die Klammer **zu Recht** sitzt, muss geprüft werden – auch Belas Klammern.

## Häufige Irrtümer

- „Mit Quellenangabe ist die Antwort richtig.“ – Nur so richtig wie die Quelle und die Zuordnung.
- „Eine Quelle stützt jede Aussage, die in ihrer Nähe steht.“ – Nur das, was sie wirklich sagt.
- „Grounding verhindert Halluzinationen sicher.“ – Es verringert und macht sichtbar, garantiert nichts.

## Verwandte Begriffe

[Halluzination](halluzination.md) · [RAG](rag.md) · [Index und Retrieval](index-retrieval.md) · [Tool und Funktionsaufruf](tool-funktionsaufruf.md) ·
[Prompt Injection](prompt-injection.md)

## Quellen

[Maynez2020], [Ji2023], [Lewis2020], [Shuster2021], [MS-RAG] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
