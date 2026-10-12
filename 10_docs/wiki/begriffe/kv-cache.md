# KV-Cache

**Stadttakt:** 10 · **Welt:** L06 Kajos Archiv (Kästner-Kisten) · **Figuren:** Kajo Cache (Begleiter), Kessa · **Anschluss:** Kajo: Einwurf oben K + V-Paketdock → vorn KV-Doppelschublade (Türkis, ⧉); Kessa: KV-Schlitz → Adressreiter ADR

## Kurz für Kinder (Teil 1)

Kajos Archiv ist der **Schmierzettel einer langen Rechnung**: Zwischenergebnisse werden aufgeschrieben, damit man sie nicht
noch einmal rechnen muss. Was einmal gerechnet ist, kommt in eine Schublade – **bis zum Kehraus**: Nach dem Gespräch kommt der
Zettel weg, und das Archiv ist wieder leer. Das Archiv braucht Regalplatz, und es macht den Zug **nicht** länger.
[DE 11.10. Didaktik: neues Bild nach KANON §16/§17]

## Genauer (Teil 2)

Der KV-Cache speichert für jede bereits verarbeitete Position die **Key- und Value-Vektoren**, und zwar je Stockwerk (und je
KV-Kopf). Bei autoregressiven Modellen würde sonst in jedem Schritt dieselbe Rechnung für alle früheren Tokens wiederholt; der
Cache hebt die Ergebnisse auf [HF-KVCache]. Queries werden nicht gespeichert – jede Query wird nur einmal gebraucht.

**Speicherformel** (ohne Verwaltungsaufwand):
`Bytes = 2 (K und V) · Stockwerke · KV-Breite je Stockwerk · Tokens · Bytes pro Zahl` (· Anzahl paralleler Anfragen)

Rechenbeispiele mit 16-bit-Zahlen (2 Bytes):
- GPT-1-Größe (12 Stockwerke, Breite 768) [Radford2018]: 2 · 12 · 768 · 2 = **36.864 Bytes ≈ 36 KiB pro Token**; 512 Tokens
  → **18 MiB**.
- LLaMA-7B-Größe (32 Stockwerke, Breite 4096) [Touvron2023]: 2 · 32 · 4096 · 2 = **512 KiB pro Token**; 2.048 Tokens → **1 GiB**.

Der Cache wächst also **linear mit dem Kontext** und mit der Zahl gleichzeitiger Anfragen. Gegenmittel:
- **Weniger K/V-Köpfe:** Multi-Query-Attention (ein K/V für alle Köpfe) [Shazeer2019], Grouped-Query-Attention [Ainslie2023].
- **Bessere Verwaltung:** PagedAttention legt den Cache in Blöcken ab wie virtueller Speicher und vermeidet Verschnitt
  [Kwon2023].
- **Gröbere Zahlen:** KV-Quantisierung, z. B. Keys je Kanal und Values je Token auf 2 bit [Liu2024] oder unter 4 bit mit
  Keys vor RoPE [Hooper2024].
- **Fensterverdrängung:** Nur die jüngsten Einträge behalten; dabei hilft es, die ersten Tokens als „Attention Sinks“ zu
  behalten [Xiao2023].

**Lebensdauer [DE 11.10. Didaktik]:** Der Cache gehört zu **einer** laufenden Rechnung. Ist das Gespräch beendet oder der Platz
gebraucht, wird er verworfen (im Spiel: der Kehraus). Serving-Systeme können Cache-Blöcke zwar zwischen Anfragen mit
**exakt gleichem Textanfang** teilen, um Speicher zu sparen [Kwon2023] – auch das ist nur ein wiederverwendeter Rechenzettel
für denselben Text, kein Gedächtnis über die Person oder das Gespräch. Wenn ein Chat später „weiß“, was du früher geschrieben
hast, hat die Anwendung Text wieder auf den Tisch gelegt ([Tischlernen](tischlernen.md)).

## Figur in Kontextia

**Kajo Cache** (KV-Kaste, Begleiter): türkiser stämmiger **Doppelkasten**, K-Schublade links, V-Schublade rechts. Einwurf **oben**
(Keylians K-Kämme, Valos Pakete), Ausgabe **vorn** (KV-Doppelschublade). **Kessa** (KV-Kaste): türkise Registerfigur mit
Layer-/Positionsreitern; Schloss **KV-Schlitz**, Schlüssel **ADR** (Adressreiter: Layer · KV-Kopf · Position · Seite) – in Teil 2
die Seitentabelle. Tante Quanta kann das Archiv kleiner packen (Schwägerlinie) – der Cache **stammt nicht** von ihr ab.

## Im Spiel

L06 (Sokoban): Kajo schiebt K/V-Kisten in Archivregale (Layer × Position). Teil 1: „Einmal gerechnet – bis zum Kehraus
bereit“ (Hausspruch der Kästner [DE 11.10. Didaktik]); das Archiv braucht Regalplatz; Archiv ist nicht das Kontextfenster.
Abschnitt B′ „Kehraus“ + „Tischlernen“ [DE 11.10. Didaktik]: Vorhersage, ob Fips' Name im neuen Gespräch noch vorkommt –
das Archiv ist geleert, der Tisch leer, die Stadt rät; legt die Anwendung eine Notiz hin, steht der Name als Text auf dem
Tisch. Merksatz: „Das Archiv hebt Rechnungen auf, keine Erinnerungen.“ Teil 2: Prefill vs. Decode zählen, Speicherformel,
Seitentabelle, Fensterverdrängung; Notizen der Anwendung kosten Plätze. Tests T12 (gleiches Ergebnis mit/ohne Cache) und T13
(Decode ergänzt den Cache).

## Hier endet das Bild

Einen Schmierzettel kann ein Mensch lesen. Kajos Zettel enthält nur **K- und V-Vektoren dieser einen Rechnung**: kein Wissen,
keine Gewichte, keine Erinnerung an dich und nichts für das nächste Gespräch. Er braucht zusätzlichen Speicher, vergrößert das
Fenster nicht und gilt nur für das laufende Gespräch – danach Kehraus. Er ist **kein gespeicherter Spielstand**, den man später
wieder lädt. [DE 11.10. Didaktik]

## Häufige Irrtümer

- „Der Cache ist wie ein gespeicherter Spielstand: Die KI lädt mein Gespräch später wieder.“ – Nein. Nach dem Gespräch ist
  Kehraus. Was eine Anwendung über Gespräche hinweg aufhebt (Verlauf, Notizen), ist Text, der wieder auf den Tisch gelegt wird
  ([Tischlernen](tischlernen.md)) – und den jemand mitschreiben kann ([Mitschreiber](mitschreiber-datenschutz.md)).
  [DE 11.10. Didaktik]
- „Der Cache ist das Gedächtnis des Modells.“ – Er ist ein Rechen-Schmierzettel (KANON §16).
- „Der Cache macht das Kontextfenster größer.“ – Nein.
- „Mit Cache kommt eine andere Antwort heraus.“ – Nein, dieselbe (bis auf Rundung).
- „Der Cache stammt von der Quantisierung ab.“ – Nein, Quantisierung kann nur angewendet werden.

## Verwandte Begriffe

[Prefill](prefill.md) · [Decode](decode.md) · [Key](key.md) · [Value](value.md) · [Kontextfenster](kontextfenster.md) ·
[Gewichts- vs. KV-Quantisierung](gewichts-vs-kv-quantisierung.md) · [Multi-Head-Attention](multi-head-attention.md) ·
[Tischlernen](tischlernen.md) · [Mitschreiber](mitschreiber-datenschutz.md)

## Quellen

[HF-KVCache], [Radford2018], [Touvron2023], [Shazeer2019], [Ainslie2023], [Kwon2023], [Liu2024], [Hooper2024], [Xiao2023] –
vollständige Angaben in [QUELLEN.md](../QUELLEN.md)
