# Little Secret Website für GitHub Pages

## Aktualisieren auf GitHub

1. ZIP entpacken.
2. Alle Dateien und Ordner in dein bestehendes Repository `littlesecret` kopieren.
3. Alte Dateien bei gleicher Benennung ersetzen.
4. Änderungen committen und pushen.
5. GitHub Pages öffnet danach die neue `index.html`.

## Seitenstruktur

- `index.html` – Startseite
- `toernprogramm-2026.html` – interaktive Route Monfalcone, Split, Dubrovnik, Korfu, Athen, Kos
- `skipper-urs.html` – Skipperseite
- `yacht.html` – Informationen zur Little Secret
- `livetracker.html` – VesselFinder Live Tracker MMSI 211647520
- `kontakt.html` – Kontaktseite

## Fotos ersetzen

Yachtbilder liegen unter:

`assets/yacht/`

Für ein echtes Portrait von Urs:

1. Foto als `urs.jpeg` in `assets/skipper/` speichern.
2. In `skipper-urs.html` den Bildpfad von `assets/yacht/little-secret-01.jpeg` auf `assets/skipper/urs.jpeg` ändern.

## Route bearbeiten

Die Marker und Popups sind in:

`js/route-map.js`

Dort können Texte, Koordinaten und Bilder pro Stopp geändert werden.
