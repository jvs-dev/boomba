import React, { useEffect, useRef } from "react";
import "./Map.css";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function loadCss(href) {
  return new Promise((resolve) => {
    if (document.querySelector(`link[href="${href}"]`)) return resolve();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => resolve();
    document.head.appendChild(link);
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(window.L);
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

export default function Map({ events = [] }) {
  const mapRef = useRef(null);
  const instanceRef = useRef({ map: null, markerLayer: null });

  useEffect(() => {
    let mounted = true;

    async function setup() {
      try {
        await loadCss(LEAFLET_CSS);
        await loadScript(LEAFLET_JS);
        if (!mounted) return;

        const L = window.L;
        if (!L) return;

        // default center (Salvador)
        const defaultCenter = [-12.975, -38.523];

        // init map only once
        if (!instanceRef.current.map) {
          instanceRef.current.map = L.map(mapRef.current, {
            zoomControl: true,
          }).setView(defaultCenter, 13);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          }).addTo(instanceRef.current.map);

          // create layer group for our markers
          instanceRef.current.markerLayer = L.layerGroup().addTo(instanceRef.current.map);

          // try to get user location and show styled user marker
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                const userIcon = L.divIcon({
                  html: `
                    <div style="
                      width: 30px;
                      height: 30px;
                      background: #3B82F6;
                      border: 3px solid white;
                      border-radius: 50% 50% 50% 0;
                      transform: rotate(-45deg);
                      position: relative;
                      box-shadow: 0 2px 8px rgba(59,130,246,0.3);
                    ">
                      <div style="
                        position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(45deg);
                        width:8px; height:8px; background:white; border-radius:50%;
                      "></div>
                    </div>
                  `,
                  className: 'custom-user-marker',
                  iconSize: [30, 30],
                  iconAnchor: [15, 30],
                  popupAnchor: [0, -28]
                });

                L.marker([lat, lng], { icon: userIcon })
                  .addTo(instanceRef.current.markerLayer)
                  .bindPopup("Você está aqui");

                instanceRef.current.map.setView([lat, lng], 13);
              },
              () => {
                // ignore errors, keep default
              }
            );
          }
        }

        // add markers
        if (addMarkersRef.current) addMarkersRef.current(instanceRef.current.markerLayer, window.L);

        // small timeout to ensure tiles render correctly
        setTimeout(() => instanceRef.current.map.invalidateSize && instanceRef.current.map.invalidateSize(), 200);
      } catch (err) {
        // loading failed
        console.error("Failed to load Leaflet:", err);
      }
    }

    setup();

    return () => {
      mounted = false;
      if (instanceRef.current.map) {
        try {
          instanceRef.current.map.remove();
        } catch (e) {
          console.log(e);
        }
        instanceRef.current = { map: null, markerLayer: null };
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper to render markers into a layerGroup (kept in ref so identity is stable)
  const addMarkersRef = useRef(null);
  addMarkersRef.current = (markerLayer, L) => {
    if (!markerLayer || !L) return;

    // clear prior
    markerLayer.clearLayers();

    // festa markers (custom divIcon with emoji, purple body and purple popup accent)
    const festaHtml = (emoji = "🎉") => `
      <div style="
        width: 28px;
        height: 28px;
        background: linear-gradient(180deg, var(--primary-color) 0%, var(--primary-light) 100%); /* rosa gradient */
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: relative;
        box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      ">
        <div style="
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(45deg);
          font-size:14px; line-height:1;
        ">${emoji}</div>
      </div>
    `;

    events && events.forEach((ev) => {
      // support different coordinate shapes
      const lat = ev.latitude ?? ev.coordinates?.lat ?? ev.lat ?? ev.position?.lat;
      const lng = ev.longitude ?? ev.coordinates?.lng ?? ev.lng ?? ev.position?.lng;
      if (typeof lat === 'number' && typeof lng === 'number') {
        const icon = L.divIcon({
          html: festaHtml('🎉'),
          className: 'custom-event-marker',
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -28]
        });

        const popupHtml = `
          <div style="padding: 10px;">
            <h4 style="margin:0 0 10px 0; white-space: nowrap; text-overflow: ellipsis; width: 100%; color:#7C3AED; font-weight:700; font-size: 1.125rem;"><i class="bi bi-calendar-event"></i> ${ev.title || ev.name || ev.eventName || 'Evento'}</h4>            
            ${ev.date ? `<p style="margin: 4px 0; font-size: 0.85rem; font-weight: 500; color:#555;"><i class="bi bi-calendar3" style="color: #8B5CF6; margin-right: 4px;"></i> ${new Date(ev.date).toLocaleDateString('pt-BR')}</p>` : ''}
            ${ev.partyTime ? `<p style="margin: 4px 0; font-size: 0.85rem; font-weight: 500; color:#555;"><i class="bi bi-clock" style="color: #8B5CF6; margin-right: 4px;"></i> ${ev.partyTime}</p>` : ''}
            <a href="/evento/${ev.id || ev.eventId || ''}" style="display:inline-block; margin-top: 10px; padding:8px 15px; background:#7C3AED; color:white; text-decoration:none; border-radius:6px; font-size: 0.85rem;font-weight:600;">Ver Detalhes</a>
          </div>
        `;

        L.marker([lat, lng], { icon }).addTo(markerLayer).bindPopup(popupHtml);
      }
    });
  };

  // re-run markers whenever events change
  useEffect(() => {
    const inst = instanceRef.current;
    if (!inst || !inst.map || !inst.markerLayer) return;
    if (addMarkersRef.current) addMarkersRef.current(inst.markerLayer, window.L);
  }, [events]);

  return (
    <div className="home-map-wrapper">
      <div ref={mapRef} id="home-map" className="home-map" />
    </div>
  );
}
