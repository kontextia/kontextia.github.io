# Mitschreiber / Datenschutz am Tisch

**Stadttakt:** „außerhalb“ – am Mauertor, vor und nach jedem Gespräch · **Welt:** L07 (Abschnitt B′ „Kalt heißt nicht verschwiegen“), L09, Urkunde (Brückenbauer-Eid) · **Figur:** der Stempelamt-Schreiber als **Mitschreiber der Anwendung** (Amtsbuch) [DE 11.10. Didaktik] · **Anschluss:** — (gehört zur Anwendung, nicht zur Stadt) · Neue Seite [DE 11.10. Didaktik, KANON §16, §21 L11]

## Kurz für Kinder (Teil 1)

**Die Stadt lernt nicht beim Reden – aber jemand kann mitschreiben.**

Am Mauertor sitzt der Stempelamt-Schreiber mit seinem **Amtsbuch**. Was über den Tisch geht, *kann* er abschreiben. Was danach
damit passiert, steht in der Hausordnung des Betreibers: Es kann **aufbewahrt** werden, **Menschen** können es lesen, oder es wird
in einer **späteren Schmiedezeit** zum Üben verwendet. Die Stadt selbst lernt dabei nichts – aber dein Text liegt dann woanders.

Darum: **Geheimnisse, Adressen und Passwörter bleiben bei dir.** Auch keine Telefonnummern, keine Fotos von Ausweisen und
nichts über andere Menschen, das sie nicht teilen würden.

Bevor du etwas auf den Tisch legst, frag dich: **„Was lege ich auf den Tisch – und wer kann mitlesen?“**

## Genauer (Teil 2)

Zwei Dinge sind fachlich beide wahr:

1. **Das Modell lernt beim Antworten nicht.** Während der Inferenz ändern sich keine Gewichte ([Training](training.md)); Kontext
   und [KV-Cache](kv-cache.md) gehören nur zur laufenden Rechnung.
2. **Die Anwendung kann speichern.** Chatdienste speichern Gespräche je nach Anbieter, Tarif und Einstellung, lassen Ausschnitte
   von Menschen prüfen oder verwenden sie für das Training künftiger Modelle.

Beispiele aus Anbieterangaben (Stand der Abrufe, Oktober 2026; Regeln ändern sich, deshalb immer die aktuellen Einstellungen
prüfen):
- Google schreibt für Gemini Apps, dass ein Teil der Chats von menschlichen Prüferinnen und Prüfern gelesen wird, geprüfte Chats
  bis zu drei Jahre aufbewahrt werden und man keine vertraulichen Informationen eingeben soll, die Prüfende nicht sehen sollen;
  über eine Einstellung lässt sich steuern, ob Chats zur Verbesserung der Modelle genutzt werden [GoogleGemini-Privacy].
- Anthropic lässt Nutzerinnen und Nutzer der Verbraucher-Tarife seit 2025 wählen, ob ihre Chats zum Verbessern der Modelle
  verwendet werden; bei Zustimmung gilt eine Aufbewahrung von fünf Jahren, sonst 30 Tage. Daten, die schon in ein trainiertes
  Modell eingeflossen sind, bleiben darin [Anthropic2025].

Warum das für Geheimnisse wichtig ist: Sprachmodelle können einzelne Stellen ihrer Trainingsdaten wörtlich wiedergeben. Carlini
et al. konnten aus GPT-2 Hunderte wörtliche Textstücke herausholen, darunter Namen, Telefonnummern und E-Mail-Adressen, die
öffentlich im Trainingstext standen [Carlini2020]. Was einmal in Trainingsdaten gelandet ist, ist also nicht automatisch
verschwunden.

Abgrenzung:
- **Mitschreiber ≠ Notizbuch der Anwendung:** Das Notizbuch legt Gespeichertes wieder auf *deinen* Tisch
  ([Tischlernen](tischlernen.md)); der Mitschreiber bewahrt es beim Betreiber auf. Beides liegt außerhalb der Stadt.
- **Mitschreiber ≠ Systemprompt-Geheimnis:** Auch Anweisungen der Anwendung gelten nicht als geheim
  ([Systemprompt](systemprompt.md)).

## Figur in Kontextia

Der **Stempelamt-Schreiber** (Nebenfigur am Mauertor, bisher ohne Fachrolle) wird **Mitschreiber der Anwendung** [DE 11.10.
Didaktik]: Er führt das **Amtsbuch**. Er gehört nicht zur Stadt und hat keine Stellschrauben. Seine liebenswerte Schwäche
bleibt: Er hält gestempelt für wahr. Stammbaum und Anschlüsse ändern sich nicht.

## Im Spiel

L07 Abschnitt B′ **„Kalt heißt nicht verschwiegen“**: Vorhersage, ob ein Geheimnis sicher ist, weil die Stadt nicht lernt. Der
Mitschreiber legt ein Blatt ins Amtsbuch „für eine spätere Schmiedezeit“. Merksatz: „Die Stadt lernt nicht beim Reden – aber
jemand kann mitschreiben.“ L09, Urkunde und Finale: dritte Frage des **Brückenbauer-Eids** – „Was lege ich auf den Tisch – und
wer kann mitlesen?“

## Hier endet das Bild

Einen Schreiber am Tor kann man sehen. In echten Anwendungen sieht man nicht, wer speichert: Es sind Server, Protokolle und
Einstellungen, manchmal lesen Menschen Ausschnitte. Und nicht jeder Anbieter tut alles davon – „kann“ heißt nicht „muss“. Was
wirklich passiert, steht in den Datenschutz-Einstellungen und Bedingungen des jeweiligen Dienstes. Kinder klären das am besten mit
einem Erwachsenen.

## Häufige Irrtümer

- „Die KI lernt nicht beim Reden, also ist mein Geheimnis dort sicher.“ – Nein. Die Anwendung kann mitschreiben.
- „Nur die KI liest mit.“ – Je nach Anbieter können Menschen Ausschnitte lesen [GoogleGemini-Privacy].
- „Wenn ich den Chat lösche, ist alles weg.“ – Löschen hilft oft für die Zukunft; was schon in ein Training eingeflossen ist,
  bleibt in den Gewichten [Anthropic2025].
- „Die KI hat sich an mich erinnert, also hat sie gelernt.“ – Die Anwendung hat gespeicherten Text wieder auf den Tisch gelegt
  ([Tischlernen](tischlernen.md)).
- „Alle Anbieter machen es gleich.“ – Nein, es hängt von Anbieter, Tarif und Einstellung ab.

## Verwandte Begriffe

[Training](training.md) · [Fine-tuning](fine-tuning.md) · [Präferenz- und Feedbacktraining](praeferenztraining-rlhf.md) ·
[Tischlernen](tischlernen.md) · [KV-Cache](kv-cache.md) · [Kontextfenster](kontextfenster.md) · [Systemprompt](systemprompt.md)

## Quellen

[GoogleGemini-Privacy], [Anthropic2025], [Carlini2020] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
