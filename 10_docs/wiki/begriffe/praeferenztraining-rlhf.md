# Präferenz- und Feedbacktraining (RLHF)

**Stadttakt:** „Geschichte“ – nach Pretraining und Fine-tuning · **Welt:** L07-T2 Lernschmiede · **Figur:** Ronja Rückmeldung [DE] (aktiv nur in Teil 2; in Teil 1 stumme Silhouette) · **Anschluss:** Schloss zwei Antwortbuchsen → Schlüssel G-Präferenzpfeil

## Kurz für Kinder (Teil 1)

In der dritten Halle der Schmiede steht eine Waage mit zwei Schalen. Menschen legen zwei Antworten hinein und zeigen: „Diese
gefällt uns besser.“ Daraus macht die Schmiede einen Pfeil, der die Stellschrauben ein wenig in Richtung der besseren Antwort
dreht. (In Teil 1 ist Ronja nur als stumme Silhouette zu sehen.)

## Genauer (Teil 2)

Präferenztraining nutzt **Vergleiche** statt fester Lösungen: Menschen (oder andere Bewerter) sagen, welche von zwei Antworten
besser ist.

**Christiano et al. 2017** zeigten, dass Agenten komplexe Ziele aus menschlichen Präferenzen zwischen Paaren von
Verhaltensausschnitten lernen können, ohne dass eine Belohnungsfunktion vorgegeben ist [Christiano2017].

**InstructGPT (Ouyang et al. 2022)** – der klassische RLHF-Ablauf für Sprachmodelle [Ouyang2022]:
1. **Überwachtes Fine-tuning** auf Demonstrationen, wie gute Antworten aussehen.
2. **Belohnungsmodell:** Menschen ordnen mehrere Modellantworten; ein Modell lernt, diese Rangfolgen vorherzusagen.
3. **Reinforcement Learning:** Das Sprachmodell wird so weitertrainiert, dass das Belohnungsmodell hohe Werte gibt, ohne sich zu
   weit vom Ausgangsmodell zu entfernen. Verwendet wurde dabei ein PPO-Verfahren [Schulman2017][Rafailov2023].

Ergebnis im Bericht: Antworten des 1,3-Milliarden-InstructGPT wurden von Menschen gegenüber denen des 175-Milliarden-GPT-3
bevorzugt [Ouyang2022].

**DPO (Rafailov et al. 2023)** kommt ohne separates RL aus: Mit einer geschickten Umformung lässt sich dasselbe Ziel mit einem
einfachen Klassifikationsverlust auf Präferenzpaaren lernen [Rafailov2023].

Idee eines Präferenzpaars (Lehrbild): Frage „Wie spät ist es auf dem Mond?“; Antwort A erfindet eine Uhrzeit, Antwort B erklärt,
dass es keine eine Monduhrzeit gibt. Bewertung: B besser. Der Gradient macht B-artige Antworten etwas wahrscheinlicher.

Grenzen: Das Modell lernt, was Bewertende **bevorzugen** – das ist nicht automatisch wahr. Bewertungen, die selbstsicheres Raten
belohnen, können Halluzinationen sogar fördern [Kalai2025].

## Figur in Kontextia

**Ronja Rückmeldung** [DE] (Schmiedezunft): **Waagenkörper mit zwei Schalen und Daumenwimpel**. Schloss **zwei Antwortbuchsen**,
Schlüssel **G-Präferenzpfeil**, der wie Gildas Pfeile in **Ollis** Pfeilbuchse passt (Freundeslinie). Aktiv nur in Teil 2; in
Teil 1 eine stumme Silhouette in der dritten Schmiedehalle.

## Im Spiel

L07-T2: Präferenzpaare (Ronja) – Spielende bewerten Antwortpaare und sehen, wie sich eine Mini-Verteilung verschiebt. Auch hier:
Die Schmiede arbeitet **vor** der Nutzung; beim Antworten wird nichts gelernt – aber Daumen und Gespräche kann jemand
mitschreiben und in einer späteren Schmiedezeit verwenden ([Mitschreiber](mitschreiber-datenschutz.md)) [DE 11.10. Didaktik].

## Hier endet das Bild

Eine Waage misst Gewicht objektiv. Präferenzen sind **menschliche Urteile** mit Vorlieben und Fehlern; das Modell übernimmt sie
statistisch, nicht moralisch.

## Häufige Irrtümer

- „Daumen hoch im Chat trainiert das Modell sofort.“ – Rückmeldungen können später in Trainingsdaten einfließen; während des
  Gesprächs ändert sich nichts.
- „RLHF macht Modelle wahrheitsliebend.“ – Es macht sie bevorzugten Antworten ähnlicher.
- „Ohne RL kein Präferenztraining.“ – DPO zeigt, dass es auch ohne geht.

## Verwandte Begriffe

[Fine-tuning](fine-tuning.md) · [Training](training.md) · [Gradient](gradient.md) · [Halluzination](halluzination.md) ·
[Systemprompt](systemprompt.md) · [Mitschreiber](mitschreiber-datenschutz.md)

## Quellen

[Christiano2017], [Ouyang2022], [Schulman2017], [Rafailov2023], [Kalai2025] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
