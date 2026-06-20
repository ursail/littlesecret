const stops = [
  {
    name: 'Monfalcone', country: 'Italien', lat: 45.8103, lon: 13.5331,
    image: 'assets/img/little-secret-hero.jpeg',
    text: 'Start des Törnprogramms 2026 in der nördlichen Adria. Einschiffen, Yacht vorbereiten und los Richtung Süden.'
  },
  {
    name: 'Split', country: 'Kroatien', lat: 43.5081, lon: 16.4402,
    image: 'assets/img/little-secret-01.jpeg',
    text: 'Dalmatien, Inselwelt, Altstadt und perfekter Etappenstopp auf dem Weg entlang der kroatischen Küste.'
  },
  {
    name: 'Dubrovnik', country: 'Kroatien', lat: 42.6507, lon: 18.0944,
    image: 'assets/img/little-secret-02.jpeg',
    text: 'Südlicher Höhepunkt Kroatiens mit Stadtmauer, Altstadt und traumhaften Ankerbuchten in der Umgebung.'
  },
  {
    name: 'Korfu', country: 'Griechenland', lat: 39.6243, lon: 19.9217,
    image: 'assets/img/little-secret-03.jpeg',
    text: 'Ankunft im Ionischen Meer. Grünes Griechenland, entspannte Häfen und klares Wasser.'
  },
  {
    name: 'Athen', country: 'Griechenland', lat: 37.9838, lon: 23.7275,
    image: 'assets/img/little-secret-01.jpeg',
    text: 'Metropole, Akropolis und idealer Ausgangspunkt für den Saronischen Golf und die Ägäis.'
  },
  {
    name: 'Kos', country: 'Griechenland', lat: 36.8915, lon: 27.2877,
    image: 'assets/img/little-secret-hero.jpeg',
    text: 'Zielhafen des Törnprogramms 2026 im Dodekanes. Sonne, Inseln und griechisches Lebensgefühl.'
  }
];

const map = L.map('route-map', { scrollWheelZoom: false }).setView([41.5, 18.9], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const latlngs = stops.map(s => [s.lat, s.lon]);
L.polyline(latlngs, { weight: 4, opacity: 0.85 }).addTo(map);

stops.forEach((s, i) => {
  L.marker([s.lat, s.lon]).addTo(map).bindPopup(`
    <img class="popup-img" src="${s.image}" alt="${s.name}">
    <strong>${i + 1}. ${s.name}</strong><br>
    <em>${s.country}</em>
    <p>${s.text}</p>
  `);
});

map.fitBounds(latlngs, { padding: [35, 35] });
