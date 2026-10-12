# Tischlernen (In-Context-Learning)

**Stadttakt:** 1 (liegt als Text auf dem Tisch) bis 12 · **Welt:** L06 Kajos Archiv (Abschnitt B′ „Kehraus“ + „Tischlernen“), Bezug L04-T2 (Induktionskreis) und L07 · **Figuren:** Bürgermeister Kontext (Tisch, Plätze), Kajo Cache (Kehraus) · **Anschluss:** TXT → ID wie jeder andere Text auf dem Tisch; **keine** P-Stellschraube · Neue Seite [DE 11.10. Didaktik, KANON §16]

## Kurz für Kinder (Teil 1)

Liegen Beispiele auf dem Tisch, richtet sich die Stadt danach – wie nach einem **Spickzettel für eine einzige Aufgabe**:

„Mondschiff → Mondboot, Sternschiff → Sternboot, Sonnenschiff → ?“

Die Stadt setzt fort: „Sonnenboot“. Das sieht aus wie Lernen, ist aber **Tischwissen**: Keine Schraube hat sich gedreht. Wird
der Tisch abgeräumt, ist der Spickzettel weg – im nächsten Gespräch fängt die Stadt wieder bei ihren Schrauben an.

Manche Anwendungen haben ein **Notizbuch**: Sie schreiben sich etwas über dich auf (zum Beispiel deinen Namen) und legen es beim
nächsten Gespräch wieder auf den Tisch. Dann wirkt es, als hätte die Stadt sich erinnert. In Wahrheit liegt nur wieder ein
Zettel auf dem Tisch – und der kostet Plätze.

## Genauer (Teil 2)

**In-Context-Learning** heißt: Ein Modell löst eine Aufgabe besser, weil Anweisungen oder Beispiele im Prompt stehen – ohne dass
sich Parameter ändern. Brown et al. zeigten mit GPT-3, dass Aufgaben aus wenigen Beispielen im Kontext („few-shot“) gelöst
werden können, **ohne Gradientenupdates oder Feinabstimmung** [Brown2020]. Man unterscheidet:

- **zero-shot:** nur eine Anweisung, kein Beispiel;
- **one-shot / few-shot:** ein oder einige Beispielpaare vor der eigentlichen Aufgabe.

Wie das im Inneren abläuft, ist nur teilweise erforscht. Ein Kandidat sind **Induktionsköpfe**: Attention-Köpfe, die über zwei
Stockwerke zusammenarbeiten und Muster der Form [A][B] … [A] → [B] fortsetzen [Olsson2022]
([Multi-Head-Attention](multi-head-attention.md)).

Wichtige Eigenschaften:
- **Flüchtig:** Die Wirkung hängt allein am Kontext. Ist er weg (neues Gespräch, Kehraus, herausgeschoben), ist sie weg.
- **Kostet Plätze:** Beispiele und Notizen belegen Tokens im [Kontextfenster](kontextfenster.md); bei vielen Beispielen wird
  der Kuchen dünner ([Attentiongewicht](attentiongewicht.md)).
- **Empfindlich:** Schon die Formatierung der Beispiele kann das Ergebnis stark verändern; Sclar et al. maßen bei
  LLaMA-2-13B Unterschiede von bis zu 76 Prozentpunkten Genauigkeit allein durch Formatänderungen [Sclar2023].
- **Kann falsch lenken:** Ein falsches Beispiel auf dem Tisch kann ebenso fortgesetzt werden wie ein richtiges.

**Notizbuch der Anwendung (Erinnerungsfunktionen):** Wenn ein Chat Dinge über Gespräche hinweg „behält“, speichert die
**Anwendung** Text (Verlauf, Notizen, Profilangaben) und legt ihn später wieder in den Prompt. Das ist Tischwissen plus
Speicherung außerhalb des Modells – kein Lernen in den Gewichten (KANON §16). Was gespeichert wird, kann auch jemand lesen oder
weiterverwenden ([Mitschreiber](mitschreiber-datenschutz.md)).

## Figur in Kontextia

Keine eigene Figur [DE]. Der Spickzettel liegt auf dem Tisch des **Bürgermeisters Kontext** und belegt Fahrkartenplätze wie
jede Textwelle. Beim **Kehraus** räumt **Kajo** das Archiv leer, und der Tisch ist wieder frei. Das Notizbuch der Anwendung ist ein
Zettel, den die Anwendung von außen wieder hinlegt – kein Teil der Stadt.

## Im Spiel

L06 Abschnitt B′ „Kehraus“ + „Tischlernen“ [DE 11.10. Didaktik]: Vorhersage, ob Fips' Name im neuen Gespräch noch vorkommt. Das
Archiv ist geleert, der Tisch leer – die Stadt rät. Legt die Anwendung eine Notiz hin, steht der Name als Text auf dem Tisch.
Merksatz: „Das Archiv hebt Rechnungen auf, keine Erinnerungen.“ Teil 2: Notizen der Anwendung kosten Plätze; L04-T2 zeigt den
Induktionskreis, der „A B … A → B“ fortsetzt.

## Hier endet das Bild

Ein Kind liest einen Spickzettel und versteht die Regel dahinter. Die Stadt **rechnet** mit den Beispielen als Zahlen auf dem
Tisch; ob sie die „Regel“ trifft, zeigt erst das Ergebnis. Und anders als ein Spickzettel, den man in der Tasche behält,
verschwindet der Tisch-Spickzettel mit dem Gespräch – außer die Anwendung schreibt ihn ab.

## Häufige Irrtümer

- „Mein Chat hat gelernt, weil er sich meinen Namen gemerkt hat.“ – Die Anwendung hat Text gespeichert und wieder auf den
  Tisch gelegt; die Gewichte sind gleich geblieben.
- „Wenn das Modell aus Beispielen lernt, ändern sich seine Gewichte.“ – Nein, In-Context-Learning kommt ohne Gradientenupdates
  aus [Brown2020].
- „Was im Gespräch geübt wurde, kann das Modell morgen auch.“ – Nur, wenn es wieder auf dem Tisch liegt.
- „Mehr Beispiele helfen immer.“ – Nicht immer; sie kosten Plätze, und Format und Reihenfolge können das Ergebnis stark
  verändern [Sclar2023].
- „Tischlernen widerlegt ‚Die Stadt lernt nicht beim Reden‘.“ – Nein: Es ist Tischwissen, kein Schraubenwissen. Der ganze Satz
  bleibt wahr: „Die Stadt lernt nicht beim Reden – aber jemand kann mitschreiben.“

## Verwandte Begriffe

[Kontextfenster](kontextfenster.md) · [KV-Cache](kv-cache.md) · [Training](training.md) · [Fine-tuning](fine-tuning.md) ·
[Multi-Head-Attention](multi-head-attention.md) · [Systemprompt](systemprompt.md) · [Mitschreiber](mitschreiber-datenschutz.md)

## Quellen

[Brown2020], [Olsson2022], [Sclar2023] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)

## Ergänzung zur Didaktik 2.2 [DE 11.10. Didaktik 2.2]

L06 spielt Kehraus und Tischlernen als unterschiedliche Vorgänge: neue Muster auf dem Tisch ändern Ausgaben ohne Schraubenänderung; Gesprächsende leert Tisch und KV-Zettel. Das Notizbuch und ein Mitschreiber gehören zur Anwendung. [Gewinn und Preis](gewinn-und-preis.md) fragt nach den belegten Plätzen.
