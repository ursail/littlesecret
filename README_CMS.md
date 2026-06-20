# Little Secret Admin-Logbuch

Diese Version enthält einen webbasierten Admin-Bereich für das Törnprogramm 2026 mit Sveltia CMS.

## Schutz / Login

Der Admin-Bereich liegt unter `admin/` und schreibt direkt in das GitHub-Repository `ursail/littlesecret`. Speichern können nur GitHub-Benutzer, die Schreibrechte auf dieses Repository haben. Für alle anderen ist die Website nur lesbar.

Für den Start ist die einfachste Methode: **Sign in with Token** in Sveltia CMS. Der Token bleibt nur in deinem Browser gespeichert.

Ein öffentliches Passwort wie `LISE!` wird bewusst nicht eingebaut, weil es bei GitHub Pages im Quellcode sichtbar wäre.

## Neue Dateien

- `admin/index.html` - Admin-Oberfläche mit Sveltia CMS
- `admin/config.yml` - Eingabefelder für Tageslogbuch und Route
- `data/toern-2026.json` - Tageslogbuch, Route, Koordinaten, Bilder
- `js/route-map.js` - baut Karte und Tageslogbuch automatisch aus JSON auf
- `toernprogramm-2026.html` - dynamische Törnprogramm-Seite

## Aufruf

Website:

`https://ursail.github.io/littlesecret/toernprogramm-2026.html`

Admin:

`https://ursail.github.io/littlesecret/admin/`

## Bearbeiten per Handy

1. `https://ursail.github.io/littlesecret/admin/` öffnen.
2. Mit deinem GitHub-Zugang bzw. Token anmelden.
3. `Törnprogramm 2026` öffnen.
4. `Tageslogbuch und Route` öffnen.
5. Einen neuen Tag hinzufügen oder bestehenden Eintrag bearbeiten.
6. Bilder hochladen oder vorhandene auswählen.
7. Status setzen: `geplant`, `heute` oder `abgeschlossen`.
8. Speichern / Publish.

Die Karte und das Tageslogbuch aktualisieren sich danach automatisch aus `data/toern-2026.json`, sobald GitHub Pages neu veröffentlicht hat.

## Felder pro Tagesstopp

- Datum
- Ort
- Land
- Status
- Breitengrad `lat`
- Längengrad `lon`
- Kurztext
- Bilder

## Wichtig

Alle Bilder werden in `assets/img` gespeichert. Die Karte verwendet die Felder `lat` und `lon`.
