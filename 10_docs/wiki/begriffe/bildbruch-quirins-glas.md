# Bildbruch / Quirins Glas

**Stadttakt:** — (Spielprinzip quer durch alle Welten) · **Welt:** jede Welt, Abschnitt B′ zwischen B und C (beide Teile); Finale „Ohne Brille“ · **Figuren:** Professor Quirin Query (rutschende Brille), Kajo (schiebt sie zurück) · **Anschluss:** — · Neue Seite [DE 11.10. Didaktik, KANON §11, §12, §17, §21 L1/L8]

## Kurz für Kinder (Teil 1)

Jedes Bild in Kontextia hilft beim Verstehen – und **jedes Bild hat eine Grenze**. Kämme, Kuchen, Glücksrad, Schmierzettel:
Das sind unsere Brillen, nicht die Sache selbst.

Darum rutscht ab und zu **Quirins Brille** auf den Trichter – *klonk!* Dann schaust du einen Moment lang durch das **echte Glas**:
Die Figuren werden durchsichtig, und man sieht schimmernde Zahlenwolken und Lichtströme statt Dinge. Bevor es losgeht, sagst
du voraus, was passieren wird. Dann siehst du, wo sich die echte Sache **anders** verhält als das Bild, und wählst selbst den
Satz „Hier endet das Bild: …“. Kajo schiebt die Brille zurück, und Quirin schreibt eine **Gegenprobe** in sein Heft.

Am Ende des Spiels fällt die Brille ins Wasser: Zehn Sekunden lang siehst du die Brücke ohne Figuren. **„Die Figuren waren
unsere Brille. Die Rechnung war echt.“**

## Genauer (Teil 2)

**Didaktisches Prinzip.** Eine Analogie überträgt Beziehungen aus einem vertrauten Bereich (Kuchen, der immer ganz ist) auf einen
neuen (Softmax: Anteile summieren sich zu 1). Nach der Structure-Mapping-Theorie tragen Analogien über **Beziehungen**, nicht über
Oberflächenmerkmale der Dinge [Gentner1983]. Genau deshalb können Lernende auch Merkmale mitnehmen, die nicht passen (der Kamm
„rastet ein“, der Speicher „lädt später“). Übersichtsarbeiten der Naturwissenschaftsdidaktik beschreiben Analogien als
zweischneidig: Sie erleichtern den Zugang, können aber Fehlvorstellungen erzeugen, wenn die Grenzen nicht bearbeitet werden
[Duit1991].

**Was Kontextia daraus macht** (KANON §21):
- **L1 – Die Mechanik lehrt, nicht das Schild.** Ein Infokasten „Hier endet das Bild“ allein genügt nie; was Kinder hundertmal
  tun, muss wahr sein. Die wichtigste Bildgrenze jeder Welt wird im Abschnitt B′ **gespielt**.
- **L8 – Die Karte ist nicht das Gebiet, als Fähigkeit.** Das Kind wählt die Grenze selbst.
- Jede Analogie im Metaphern-Atlas (KANON §17) hat eine Spalte „Hier endet das Bild“; jede Begriffsseite dieses Wikis auch.

**Ablauf von B′ (2–4 Minuten):**
1. *Klonk* – ein Glasrand rahmt den Bildschirm („Quirins Glas“).
2. **Vorhersage vor Wirkung** zu genau einer Bildgrenze: drei Antworten, eine davon ist die typische Fehlvorstellung.
3. Die Wirkung läuft **im Regelkern**, keine reine Animation.
4. Das Kind wählt die passende Grenze aus drei Sätzen.
5. Gegenprobe ins Heft (Gegenprobe Nr. 1–9).

Die Antwort darf weder im Rahmen noch in der Demo noch auf dem Brett stehen. B′ zählt zu **Stern 4** („Gegenprobe“, KANON §12).
In Teil 2 öffnet Quirins Glas die Zahlen in drei **Brillenstufen**: Zahlen an den Figuren → Tabelle/Heatmap → Formel, je
Bildschirm höchstens ein neues Zeichen (L9).

**Die Bildbrüche der Welten** (Kurzfassung; Zahlen mit „z. B.“ sind Zielwerte für den Regelkern):

| Welt | Bildbruch | Was das Kind erlebt |
|---|---|---|
| L00 | ganzer Prolog | gleicher Anfang, drei Ziehungen, drei Fortsetzungen; Nebel bei einer unwissbaren Frage |
| L01 | Nebel statt Fragezeichen | ein ausgestiegener Name wird flüssig falsch geraten ([Kontextfenster](kontextfenster.md)) |
| L02 | Schattenspiel + Blindprobe | jede Karte zeigt nur einen Schatten eines Worts ([Embedding](embedding.md)) |
| L03 | Blindprobe + Volle Halle, dünner Kuchen | Leuchten ohne Wortschilder gleich; mehr Balkone → dünnere Stücke ([Attentiongewicht](attentiongewicht.md)) |
| L04 | Helm ohne Beruf + Ein Helm fehlt | Helme haben Gewohnheiten, keine Berufe ([Multi-Head-Attention](multi-head-attention.md)) |
| L05 | Der große Markt + Hier steigt der Nebel auf | Schleife im kleinen Markt sicher, im großen möglich; das Rad zieht immer ([Greedy](greedy.md)) |
| L06 | Kehraus + Tischlernen | das Archiv hebt Rechnungen auf, keine Erinnerungen ([Tischlernen](tischlernen.md)) |
| L07 | Schraubensuche + Die Schmiede staunt + Kalt heißt nicht verschwiegen | Wissen in allen Schrauben ein bisschen; jemand kann mitschreiben ([Training](training.md)) |
| L08 | Meistens gleich, manchmal nicht | z. B. 18 von 20 Antworten gleich, 2 anders ([Quantisierung](quantisierung.md)) |
| L09 | Die Stadt fällt herein + Nebel trotz Quelle + Ria bringt immer etwas | „Gib der Fracht nie das Steuer.“ ([Prompt Injection](prompt-injection.md), [RAG](rag.md)) |
| Finale T1 | Ohne Brille | zehn Sekunden Brücke ohne Figuren, nur Zahlenlicht |

## Figur in Kontextia

**Professor Quirin Query** (Haus Montaquery): Seine rutschende Brille ist seit Lore 1.0 ein Running Gag; ab der Didaktik-Revision
ist sie **Quirins Glas**, der Bildbruch jeder Welt [DE 11.10. Didaktik]. **Kajo** schiebt sie zurück. Keine neue Figur, kein
neuer Anschluss.

## Im Spiel

Gemeinsamer Baustein `QuirinsGlas` (Darstellungsmodus) und `Blindprobe` (Etiketten ausblenden, Rechnung unverändert) für alle
Welten; je Welt die Zeile der Tabelle oben. Finale Teil 1 „Ohne Brille“, Finale Teil 2 „Der echte Turm“ (der „Vorgängerkopf“
wird im echten Mini-Modell von drei Köpfen teilweise erledigt: „Gefunden, nicht gebaut – und selten sauber.“).

## Hier endet das Bild

Auch „das echte Glas“ ist eine Darstellung. Echte Zahlen sind viel mehr, als ein Bildschirm zeigen kann – Hunderte bis Tausende
Komponenten je Vektor, Milliarden Stellschrauben.

## Häufige Irrtümer

- „Wenn die Grenze im Infokasten steht, ist alles gesagt.“ – Nein, gelernt wird vor allem, was man tut (L1).
- „Ein Bild mit Grenze ist falsch und deshalb nutzlos.“ – Nein, das Bild trägt; die Grenze gehört dazu.
- „Durch Quirins Glas sieht man das echte Modell.“ – Man sieht eine weitere, genauere Vereinfachung.
- „Figuren mit Gefühlen heißen, die KI hat Gefühle.“ – Figuren dürfen fühlen, weil sie Figuren sind; die Stadt rechnet (L6).

## Verwandte Begriffe

[Berechnet heißt nicht vorhersehbar](berechnet-nicht-vorhersehbar.md) · [Halluzination](halluzination.md) ·
[Skalarprodukt und Score](skalarprodukt-score.md) · [Query](query.md) · [Tischlernen](tischlernen.md) ·
[Mitschreiber](mitschreiber-datenschutz.md)

## Quellen

[Gentner1983], [Duit1991] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md); Spielregeln nach KANON §11, §12, §17, §21
