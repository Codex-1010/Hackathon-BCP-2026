const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * ENDPOINT 1: GET /generar-mapa
 * Renderiza el documento HTML interactivo con Leaflet.js
 */
app.get('/generar-mapa', async (req, res) => {
    const direccion = req.query.direccion;

    if (!direccion) {
        return res.send(generarMapaPorDefecto('No se encontró la ubicación exacta'));
    }

    try {
        // Geocodificación usando el servicio gratuito Nominatim de OpenStreetMap
        const urlGeocode = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}&countrycodes=pe&limit=1`;
    
        const response = await fetch(urlGeocode, {
            headers: { 'User-Agent': 'ImpactoCercaApp/1.0' }
        });
        const data = await response.json();

        if (!data || data.length === 0) {
            return res.send(generarMapaPorDefecto("Dirección no localizada. Mostrando mapa general."));
        }

        const lat = data[0].lat;
        const lon = data[0].lon;

        // Plantilla HTML del mapa autogenerado
        const mapaHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mapa - ${direccion}</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body, #map { width: 100%; height: 100vh; background: #f4f6f8; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <script>
                const map = L.map('map', { zoomControl: false }).setView([${lat}, ${lon}], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap'
                }).addTo(map);
                L.marker([${lat}, ${lon}]).addTo(map)
                    .bindPopup('<b>Ubicación del evento</b><br>${direccion.replace(/'/g, "\\'")}')
                    .openPopup();
            </script>
        </body>
        </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        return res.send(mapaHTML);

    } catch (error) {
        console.error(error);
        return res.status(500).send('<h1>Error en el servidor de mapas</h1>');
    }
});

/**
 * ENDPOINT 2: GET /obtener-iframe
 * Devuelve la etiqueta <iframe> en texto plano lista para copiar e incrustar
 */
app.get('/obtener-iframe', (req, res) => {
    const direccion = req.query.direccion;
    
    if (!direccion) {
        return res.status(400).send("Falta el parámetro 'direccion'");
    }

    // Apuntamos al endpoint que acabamos de crear arriba
    const urlMapa = `http://localhost:3000/generar-mapa?direccion=${encodeURIComponent(direccion)}`;

    // Construcción exacta de la etiqueta solicitada
    const iframeHTML = `<iframe src="${urlMapa}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

    // Lo enviamos como texto plano para que sea fácil de copiar
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(iframeHTML);
});

function generarMapaPorDefecto(mensaje) {
    // Coordenadas del centro de Lima o San Isidro como respaldo
    const latDefault = -12.097; 
    const lonDefault = -77.035;
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>html, body, #map { height: 100%; margin: 0; }</style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            const map = L.map('map').setView([${latDefault}, ${lonDefault}], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(map);
            
            // Añadimos un aviso decorativo o un popup
            L.popup()
                .setLatLng([${latDefault}, ${lonDefault}])
                .setContent('${mensaje}')
                .openOn(map);
        </script>
    </body>
    </html>
    `;
}

app.listen(PORT, () => {
    console.log(`Servidor de mapas corriendo en: http://localhost:${PORT}`);
});