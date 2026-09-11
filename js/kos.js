(() => {
  const DATA_URL = "data/kos-route.json";
  const TYPE_COLORS = { marina:"#087b9e", anchorage:"#1ca68c", harbour:"#7655b5", alternative:"#1ca68c", swim:"#f0a13d", highlight:"#e06a45" };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const hav = (a,b) => { const R=3440.065,r=Math.PI/180,dLat=(b.lat-a.lat)*r,dLon=(b.lon-a.lon)*r; const q=Math.sin(dLat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(q)); };
  const download = (url,name) => { const a=document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); };
  async function start(){
    const response=await fetch(DATA_URL,{cache:"no-store"});
    if(!response.ok) throw new Error(`Route konnte nicht geladen werden (${response.status}).`);
    const data=await response.json();
    const byId=Object.fromEntries(data.places.map(p=>[p.id,p]));
    const route=data.route.map(id=>byId[id]).filter(Boolean);
    const uniqueRouteIds=[...new Set(data.route)];
    let total=0; for(let i=1;i<route.length;i++) total+=hav(route[i-1],route[i]);
    document.querySelector("[data-total-nm]").textContent=`${total.toFixed(1)} sm`;
    document.querySelector("[data-place-count]").textContent=data.places.length;
    const map=L.map("kos-map",{zoomControl:false}); L.control.zoom({position:"bottomright"}).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"© OpenStreetMap contributors"}).addTo(map);
    const icon=p=>L.divIcon({className:"",html:`<div style="width:30px;height:30px;background:${TYPE_COLORS[p.type]||'#087b9e'};border:3px solid white;border-radius:50% 50% 50% 8px;transform:rotate(-45deg);box-shadow:0 4px 10px #002c4060"><div style="transform:rotate(45deg);line-height:24px;text-align:center;color:white;font-size:11px">●</div></div>`,iconSize:[30,30],iconAnchor:[15,28]});
    const markers={};
    data.places.forEach(p=>{ markers[p.id]=L.marker([p.lat,p.lon],{icon:icon(p)}).addTo(map).bindPopup(`<div class="kos-popup"><h3>${esc(p.name)}</h3><p><b>${esc(p.stage)}</b></p><p>${esc(p.summary)}</p><p><b>Hafen / Ankern:</b> ${esc(p.berthing)}</p></div>`); markers[p.id].on("click",()=>select(p.id)); });
    L.polyline(route.map(p=>[p.lat,p.lon]),{color:"#087b9e",weight:4,opacity:.92,dashArray:"11 8"}).addTo(map);
    const cards=document.getElementById("kos-cards");
    data.places.forEach((p,i)=>{ const article=document.createElement("article"); article.className="kos-card"; article.id=`kos-card-${p.id}`; const source=p.sourceUrl?`<a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener">${esc(p.sourceLabel)}</a>`:esc(p.sourceLabel); article.innerHTML=`<div class="kos-card-head"><div class="kos-number" style="background:${TYPE_COLORS[p.type]||'#087b9e'}">${i+1}</div><div><h2>${esc(p.name)}</h2><div class="kos-meta">${esc(p.stage)} · ${p.lat.toFixed(6)}, ${p.lon.toFixed(6)}</div>${p.verified?'':'<span class="kos-badge-unverified">Planungsmarker, nicht verifiziert</span>'}</div></div><div class="kos-details"><div>${[p.type,p.island].map(t=>`<span class="kos-tag">${esc(t)}</span>`).join('')}</div><p>${esc(p.summary)}</p><h3>Highlights</h3><ul>${p.highlights.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h3>Hafen / Ankern</h3><p>${esc(p.berthing)}</p><p class="kos-warning"><b>Skipperhinweis:</b> ${esc(p.skipperNote)}</p><p class="kos-source">Quelle: ${source}</p></div>`; article.addEventListener("click",()=>{select(p.id);markers[p.id].openPopup();map.flyTo([p.lat,p.lon],12)});cards.appendChild(article); });
    const bounds=L.latLngBounds(data.places.map(p=>[p.lat,p.lon]));
    const fit=()=>map.fitBounds(bounds.pad(.16)); fit();
    function select(id){ document.querySelectorAll(".kos-card").forEach(x=>x.classList.toggle("is-active",x.id===`kos-card-${id}`)); document.getElementById(`kos-card-${id}`)?.scrollIntoView({behavior:"smooth",block:"nearest"}); }
    document.querySelector("[data-fit]").addEventListener("click",fit);
    document.querySelector("[data-gpx]").addEventListener("click",()=>download("data/kos-route.gpx","kos-route.gpx"));
    document.querySelector("[data-kml]").addEventListener("click",()=>download("data/kos-route.kml","kos-route.kml"));
    document.querySelector("[data-panel-toggle]").addEventListener("click",()=>document.querySelector(".kos-panel").classList.toggle("is-open"));
    L.control({position:"topright"}).onAdd=()=>{const d=L.DomUtil.create("div","kos-legend");d.innerHTML=`<b>Legende</b><br><span class="kos-dot" style="background:#087b9e"></span>Marina / Haupthafen<br><span class="kos-dot" style="background:#7655b5"></span>Stadthafen<br><span class="kos-dot" style="background:#1ca68c"></span>Anker-/Alternativstopp<br><span class="kos-dot" style="background:#f0a13d"></span>Optionaler Badestopp<br><span class="kos-dot" style="background:#e06a45"></span>Land-Highlight`;return d}; L.control({position:"topright"}).addTo;
    const legend=L.control({position:"topright"});legend.onAdd=()=>{const d=L.DomUtil.create("div","kos-legend");d.innerHTML=`<b>Legende</b><br><span class="kos-dot" style="background:#087b9e"></span>Marina / Haupthafen<br><span class="kos-dot" style="background:#7655b5"></span>Stadthafen<br><span class="kos-dot" style="background:#1ca68c"></span>Anker-/Alternative<br><span class="kos-dot" style="background:#f0a13d"></span>Badestopp<br><span class="kos-dot" style="background:#e06a45"></span>Land-Highlight`;return d};legend.addTo(map);
  }
  start().catch(error=>{ console.error(error); document.getElementById("kos-cards").innerHTML=`<p class="kos-warning"><b>Fehler:</b> ${esc(error.message)} Bitte die Seite über GitHub Pages oder einen Webserver öffnen, nicht direkt als lokale Datei.</p>`; });
})();
