# Stockwerkslinse (Logit Lens)

**Stadttakt:** 3–11 (Lios Tafel wird probeweise an jedes Stockwerk gehalten) · **Welt:** L04 Teil 2 (Wackelturm, Messingrohr), Finale Teil 2 (Absatz 4, „Linsen-Gate“) · **Figuren:** Lio Logit (Tafel), Nora (finale Politur), Quirin (Linse und Messbuch) · **Anschluss:** VEC (Strom nach Stockwerk ℓ) → Noras finale Norm → Lios SC-Dreiecke – nur als Messgerät, kein eigener Anschluss · Neue Seite [DE 11.10. Didaktik 2.2, KANON §17 „Stockwerkslinse“, DIDAKTIK_REVISION §6a.3 G3]

## Kurz für Kinder (Teil 1)

Die Antwort ist **nicht auf einmal da**. Tokis Rucksack wird Stockwerk für Stockwerk umgebaut. Quirin hat dafür ein
Messingrohr erfunden, die **Stockwerkslinse**: Er hält Lios Punktetafel an jedes Stockwerk und schaut nach, welches Stück die
Stadt raten würde, wenn sie **jetzt schon** aufhören müsste.

Wie bei einem Bild, das beim Laden schärfer wird: **Unten** kommt Kauderwelsch heraus (oft das Wort, das schon dasteht). **In
der Mitte** erkennt man die Satzform – „hier kommt eine Uhrzeit“, aber noch nicht welche. **Oben** steht die Antwort klar
vorn. Merksatz: **„Die Antwort entsteht über die Stockwerke – und man kann zwischendurch nachsehen.“**

## Genauer (Teil 2)

Jedes Stockwerk schreibt in denselben [Residualstrom](residualstrom.md); alle Zwischenstände haben die gleiche Breite d wie der
Endzustand [Elhage2021]. Die **Logit Lens** nutzt das aus: Man nimmt den [Hidden State](hidden-state.md) x^ℓ nach Stockwerk ℓ
und schickt ihn durch das, was sonst nur ganz oben kommt – finale Norm und [LM-Kopf](lm-kopf.md):

`p_ℓ = softmax(Norm_final(x^ℓ) · W_LM)`

nostalgebraist beschrieb 2020 an GPT-2, dass diese Zwischenvorhersagen sich von Schicht zu Schicht der endgültigen Vorhersage
annähern [Nostalgebraist2020]. Die Antwort wird also **schrittweise verfeinert** statt in einem Sprung erzeugt.

**Ein Messgerät mit eigenen Fehlern.** Die Zwischenstände sind nicht dafür gebaut, mit der Tafel des **obersten** Stockwerks
gelesen zu werden. Belrose et al. beschreiben die Logit Lens als oft unzuverlässig („brittle“), besonders in unteren Schichten
und bei manchen Modellen. Ihre **Tuned Lens** trainiert für jeden Block einen kleinen eigenen Übersetzer (eine affine
Abbildung) vor dem LM-Kopf und liest die Zwischenstände damit verlässlicher – getestet an Modellen bis 20 Milliarden
Parameter [Belrose2023]. Beide Linsen zeigen, was sich *mit dieser Tafel* aus dem Zwischenstand lesen lässt – nicht alles,
was darin steckt.

**Spielmodell WT-1 (L04 §6.11, nachgerechnet), Satz S2 „… Das Mondschiff fährt um“:**

| Linse nach … | vorn auf Lios Tafel |
|---|---|
| Fundament (Stockwerk 0) | „um“ 27,2 % – das Wort, das schon dasteht (Kauderwelsch); alle anderen je 6,1 % |
| Stockwerk 1 | „acht“ 29,7 % · „neun“ 29,7 % · „um“ 7,1 % – die **Satzform** (eine Uhrzeit), noch offen welche |
| Stockwerk 2 | „acht“ 85,2 % – die **Antwort** |

Handrechnung (Brillenstufe 3): P(acht) nach Stockwerk 1 = e^2,186 / (2 · e^2,186 + e^0,751 + 10) = 8,90 / 29,92 = **0,2975**.

## Figur in Kontextia

Keine neue Figur [DE]. Die Linse ist **Quirins Messingrohr** (Requisit, Teil 2): Es hält **Lios Tafel** samt **Noras finaler
Politur** an den Strom eines beliebigen Stockwerks. Im Labor hängt über jedem Stockwerk eine Zahlentafel. Die Stadt selbst
benutzt die Linse nie – sie ist ein Gerät der Forschenden.

## Im Spiel

[L04](../../../01_design/v2/level/L04.md) Teil 2 (Lernziel 2, Aufgabe A2 „Stockwerkslinse“): Lios Tafel an Fundament,
Stockwerk 1 und 2 halten; Fehlvorstellung „Die Antwort ist auf einmal da“ (G3) wird sichtbar widerlegt: Kauderwelsch →
Satzform → Antwort. Im Kopiersatz S8 steht nach Stockwerk 1 noch die Satzform vorn (Mondschiff/Sternschiff), oben gewinnt das
kopierte „Kajo“. [Finale Teil 2](../../../01_design/v2/level/FINALE_TEIL2.md) §6.4a: die Linse am echten Türmchen (Rang des
Endzeichens je Stockwerk), Vorhersage am eigenen Prompt, gewertet gegen die Messung.

## Hier endet das Bild

Ein Ladebild zeigt **dasselbe** Bild erst grob, dann fein. Zwischenstände im Turm sind kein grobes Bild der Antwort, sondern
Zahlen, die erst noch weiterverarbeitet werden – die Linse **übersetzt** sie mit einer Tafel, die für oben gebaut ist. Darum
irrt sie unten oft [Belrose2023]. „Kauderwelsch“ unten heißt nicht „die Stadt ist noch verwirrt“, sondern: Mit dieser Tafel
lässt sich dort wenig ablesen. Und was ein Stockwerk beiträgt, ist gelernt und verschmiert, keine feste Stufe eines Plans.

## Häufige Irrtümer

- „Die Antwort ist auf einmal da.“ – Sie wird über die Stockwerke aufgebaut; man kann zwischendurch nachsehen.
- „Die Linse zeigt, was die KI in Stockwerk 3 denkt.“ – Sie zeigt eine Übersetzung des Zwischenstands mit Lios Tafel.
- „Wo die Linse nichts zeigt, steht nichts Nützliches.“ – Information kann in Richtungen stecken, die diese Tafel nicht liest
  [Belrose2023].
- „Jedes Stockwerk hat eine feste Aufgabe: erst Satzform, dann Antwort.“ – Das ist ein typischer Verlauf, kein Bauplan.
- „Die Stadt schaut beim Antworten durch die Linse.“ – Nein, die Linse ist ein Messgerät von außen.

## Verwandte Begriffe

[Hidden State](hidden-state.md) · [Residualstrom](residualstrom.md) · [LM-Kopf](lm-kopf.md) · [Logits](logits.md) ·
[Transformer-Block](transformer-block.md) · [Normalisierung](normalisierung.md) · [Ablation / Weglassprobe](ablation-weglassprobe.md) ·
[Überlagerung](ueberlagerung-superposition.md)

## Quellen

[Nostalgebraist2020], [Belrose2023], [Elhage2021] – vollständige Angaben in [QUELLEN.md](../QUELLEN.md); Spielzahlen aus L04 §6.11
(Regelkern WT-1, nachgerechnet)
