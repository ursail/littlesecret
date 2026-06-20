const fallbackData = {
  titel: 'Törnprogramm 2026',
  untertitel: 'Von Monfalcone über Split, Dubrovnik, Korfu und Athen bis Kos.',
  tage: []
};

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });
}

function statusLabel(status) {
  const map = {
    geplant: '○ Geplant',
    heute: '● Heute / aktuell',
    abgeschlossen: '✓ Abgeschlossen'
  };
  return map[status] || '○ Geplant';
}

function normalizeImagePath(path) {
  if (!path) return 'assets/img/little-secret-hero.jpeg';
  return path.replace(/^\//, '');
}

function imageHtml(images, alt) {
  const list = Array.isArray(images) && images.length ? images.slice(0, 3) : ['assets/img/little-secret-hero.jpeg'];
  return list.map(src => `<img src="${normalizeImagePath(src)}" alt="${alt}">`).join('');
}

async function loadRouteData() {
  try {
    const response = await fetch('data/toern-2026.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Logbuch nicht gefunden');
    return await response.json();
  } catch (error) {
    console.warn(error);
    return fallbackData;
  }
}

function renderHeader(data) {
  const title = document.getElementById('route-title');
  const subtitle = document.getElementById('route-subtitle');
  if (title && data.titel) title.textContent = data.titel;
  if (subtitle && data.untertitel) subtitle.textContent = data.untertitel;
}

function renderLogbook(days) {
  const container = document.getElementById('logbook');
  if (!container) return;
  if (!days.length) {
    container.innerHTML = '<p class="note">Noch keine Logbuch-Einträge vorhanden.</p>';
    return;
  }
  container.innerHTML = days.map((day, index) => `
    <article class="day-entry ${day.status || 'geplant'}">
      <div class="day-date">${formatDate(day.datum)}</div>
      <div class="day-card">
        <div class="day-meta"><span class="status-pill ${day.status || 'geplant'}">${statusLabel(day.status)}</span><span>Etappe ${index + 1}</span></div>
        <h3>${day.ort}${day.land ? `, ${day.land}` : ''}</h3>
        <p>${day.text || ''}</p>
        <div class="day-gallery">${imageHtml(day.bilder, day.ort)}</div>
      </div>
    </article>
  `).join('');
}

function renderMap(days) {
  const mapElement = document.getElementById('route-map');
  if (!mapElement || typeof L === 'undefined') return;
  const validDays = days.filter(day => Number.isFinite(Number(day.lat)) && Number.isFinite(Number(day.lon)));
  const map = L.map('route-map', { scrollWheelZoom: false }).setView([41.5, 18.9], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  if (!validDays.length) return;

  const allLatLngs = validDays.map(day => [Number(day.lat), Number(day.lon)]);
  const doneLatLngs = validDays
    .filter(day => day.status === 'abgeschlossen' || day.status === 'heute')
    .map(day => [Number(day.lat), Number(day.lon)]);

  if (allLatLngs.length > 1) {
    L.polyline(allLatLngs, { weight: 4, opacity: 0.7, dashArray: '8 8' }).addTo(map);
  }
  if (doneLatLngs.length > 1) {
    L.polyline(doneLatLngs, { weight: 6, opacity: 0.95 }).addTo(map);
  }

  validDays.forEach((day, index) => {
    const marker = L.marker([Number(day.lat), Number(day.lon)]).addTo(map);
    const firstImage = normalizeImagePath(Array.isArray(day.bilder) ? day.bilder[0] : '');
    marker.bindPopup(`
      <img class="popup-img" src="${firstImage}" alt="${day.ort}">
      <strong>${index + 1}. ${day.ort}</strong><br>
      <em>${day.land || ''}</em>
      <p><strong>${statusLabel(day.status)}</strong></p>
      <p>${day.text || ''}</p>
    `);
  });

  map.fitBounds(allLatLngs, { padding: [35, 35] });
}

loadRouteData().then(data => {
  const days = Array.isArray(data.tage) ? data.tage : [];
  renderHeader(data);
  renderMap(days);
  renderLogbook(days);
});
