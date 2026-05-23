/**
 * main.js — Lógica general de UI
 * Impacto Cerca · Hackathon BCP 2026
 *
 * Contiene:
 *  - switchTab(): navegación entre secciones
 *  - filterChip(): filtros de categoría
 *  - searchEventos(): búsqueda en tiempo real
 *  - switchPeriod(): selector de período en ranking
 *  - switchMisTab(): tabs en "Mis eventos"
 *  - closeSplash(): cierra pantalla de bienvenida
 *  - showToast(): notificación flotante
 */

// ─── NAVEGACIÓN POR PESTAÑAS ─────────────────────────────────────────────────
function switchTab(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  document.getElementById(name).classList.add('active');
  el.classList.add('active');
  el.setAttribute('aria-selected', 'true');

  // Carga dinámica
  if (name === 'ranking') renderizarRanking('semana');
  if (name === 'mis-eventos') renderizarMisEventos();
}

// ─── FILTROS DE CATEGORÍA ─────────────────────────────────────────────────────
function filterChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const cat = el.dataset.cat || el.innerText.trim();
  const query = document.getElementById('search-input')?.value.trim().toLowerCase() || '';
  aplicarFiltros(cat, query);
}

// ─── BÚSQUEDA EN TIEMPO REAL ─────────────────────────────────────────────────
function searchEventos(val) {
  const clearBtn = document.getElementById('search-clear');
  if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
  const activeChip = document.querySelector('.chip.active');
  const cat = activeChip?.dataset.cat || 'Todos';
  aplicarFiltros(cat, val.trim().toLowerCase());
}

function clearSearch() {
  const input = document.getElementById('search-input');
  if (input) { input.value = ''; input.focus(); }
  document.getElementById('search-clear').style.display = 'none';
  const activeChip = document.querySelector('.chip.active');
  const cat = activeChip?.dataset.cat || 'Todos';
  aplicarFiltros(cat, '');
}

function aplicarFiltros(cat, query) {
  let resultado = eventosMock;
  if (cat && cat !== 'Todos') resultado = resultado.filter(e => e.cat === cat);
  if (query) {
    resultado = resultado.filter(e =>
      e.titulo.toLowerCase().includes(query) ||
      e.desc.toLowerCase().includes(query)  ||
      e.cat.toLowerCase().includes(query)   ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(query)))
    );
  }
  renderizarEventos(resultado);
  updateMapMarkers(resultado);
}

let map;
let eventMarkers = [];

function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  map = L.map('map', { zoomControl: true }).setView([-12.0849, -77.0429], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  updateMapMarkers(eventosMock);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      L.circleMarker([latitude, longitude], {
        radius: 8,
        color: '#0F6E56',
        fillColor: '#1D9E75',
        fillOpacity: 1,
        weight: 2,
      })
        .addTo(map)
        .bindPopup('Tú estás aquí');
    });
  }
}

function updateMapMarkers(eventos) {
  if (!map) return;
  eventMarkers.forEach(marker => map.removeLayer(marker));
  eventMarkers = [];

  eventos.forEach(ev => {
    if (!ev.lat || !ev.lng) return;

    const marker = L.marker([ev.lat, ev.lng]).addTo(map);
    marker.bindPopup(`
      <div style="font-size:13px;line-height:1.4;">
        <strong>${ev.titulo}</strong><br>
        <span style="color:#55606a;">${ev.lugar}</span><br>
        <span style="color:#55606a;">${ev.fecha} · ${ev.hora}</span><br>
    <button style="margin-top:8px;padding:6px 10px;border:none;border-radius:8px;background:var(--accent-400);color:#fff;cursor:pointer;font-size:12px;">
          Ver evento
        </button>
      </div>
    `);

    marker.on('popupopen', () => {
      const popupButton = document.querySelector('.leaflet-popup-content button');
      if (popupButton) popupButton.onclick = () => openModal(ev.id);
    });
    marker.on('click', () => openModal(ev.id));
    eventMarkers.push(marker);
  });
}

// ─── RANKING ─────────────────────────────────────────────────────────────────
const rankingData = {
  semana: [
    { pos: 1, ini: 'LM', nombre: 'Lucía Mendoza',   pts: 2840, color: '#639922', badge: 'Líder' },
    { pos: 2, ini: 'CR', nombre: 'Carlos Rivas',    pts: 2610, color: '#1D9E75' },
    { pos: 3, ini: 'SF', nombre: 'Sofía Flores',    pts: 2200, color: '#378ADD' },
    { pos: 4, ini: 'JP', nombre: 'Javier Paredes',  pts: 1980, color: '#D85A30' },
    { pos: 5, ini: 'ME', nombre: 'María Espinoza',  pts: 1750, color: '#7F77DD' },
    { pos: 6, ini: 'RG', nombre: 'Rodrigo Gutiérrez', pts: 1520, color: '#BA7517' },
    { pos: 7, ini: 'AC', nombre: 'Andrea Castro',   pts: 1390, color: '#1D9E75' },
    { pos: 8, ini: 'AV', nombre: 'Tú — Alex Vargas', pts: 1240, color: '#3B6D11', eres_tu: true },
  ],
  mes: [
    { pos: 1, ini: 'LM', nombre: 'Lucía Mendoza',   pts: 9840, color: '#639922', badge: 'Líder' },
    { pos: 2, ini: 'SF', nombre: 'Sofía Flores',    pts: 8600, color: '#378ADD' },
    { pos: 3, ini: 'JP', nombre: 'Javier Paredes',  pts: 7900, color: '#D85A30' },
    { pos: 4, ini: 'CR', nombre: 'Carlos Rivas',    pts: 7610, color: '#1D9E75' },
    { pos: 5, ini: 'ME', nombre: 'María Espinoza',  pts: 6750, color: '#7F77DD' },
    { pos: 11, ini: 'AV', nombre: 'Tú — Alex Vargas', pts: 4890, color: '#3B6D11', eres_tu: true },
  ],
  total: [
    { pos: 1, ini: 'LM', nombre: 'Lucía Mendoza',   pts: 28400, color: '#639922', badge: 'Leyenda' },
    { pos: 2, ini: 'CR', nombre: 'Carlos Rivas',    pts: 24100, color: '#1D9E75' },
    { pos: 3, ini: 'RG', nombre: 'Rodrigo Gutiérrez', pts: 22800, color: '#BA7517' },
    { pos: 4, ini: 'JP', nombre: 'Javier Paredes',  pts: 19800, color: '#D85A30' },
    { pos: 5, ini: 'SF', nombre: 'Sofía Flores',    pts: 18200, color: '#378ADD' },
    { pos: 15, ini: 'AV', nombre: 'Tú — Alex Vargas', pts: 9240, color: '#3B6D11', eres_tu: true },
  ],
};

function renderizarRanking(periodo) {
  const lista = rankingData[periodo] || rankingData.semana;
  const container = document.getElementById('rank-list-content');
  if (!container) return;

  const medalas = { 1: 'gold', 2: 'silver', 3: 'bronze' };

  container.innerHTML = lista.map(item => {
    const cls = item.eres_tu ? 'rank-item me' : 'rank-item';
    const posCls = medalas[item.pos] ? `rank-pos ${medalas[item.pos]}` : 'rank-pos';
    const badge = item.badge ? `<div class="rank-badge">${item.badge}</div>` : '';
    const yoBadge = item.eres_tu ? `<div class="rank-badge" style="background:var(--green-50);color:var(--green-600)">Tú</div>` : '';
    const ptsStr = item.pts.toLocaleString('es-PE');

    return `
      <div class="${cls}" role="listitem">
        <div class="${posCls}" aria-label="Posición ${item.pos}">${item.pos}</div>
        <div class="rank-av" style="background:${item.color}">${item.ini}</div>
        <div class="rank-name" ${item.eres_tu ? 'style="font-weight:600;color:var(--green-600)"' : ''}>${item.nombre}</div>
        <div class="rank-pts">${ptsStr}</div>
        ${badge}${yoBadge}
      </div>`;
  }).join('');
}

function switchPeriod(periodo, el) {
  document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderizarRanking(periodo);
}

// ─── MIS EVENTOS (tabs internas) ─────────────────────────────────────────────
function switchMisTab(panel, el) {
  document.querySelectorAll('.mis-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mis-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(`mis-${panel}`).classList.add('active');
}

// ─── SPLASH / BIENVENIDA ─────────────────────────────────────────────────────
function closeSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.animation = 'splashOut 0.3s ease forwards';
    setTimeout(() => { splash.style.display = 'none'; }, 300);
  }
}

// Si el usuario ya pasó el splash (en una sesión real usaríamos localStorage),
// podemos detectar con sessionStorage:
(function initSplash() {
  if (sessionStorage.getItem('splash_done')) {
    const splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
  }
  // Guardamos en sessionStorage al cerrar
  const origClose = window.closeSplash;
  window.closeSplash = function() {
    sessionStorage.setItem('splash_done', '1');
    origClose();
  };
})();

function initTheme() {
  const storedTheme = sessionStorage.getItem('user_theme');
  const theme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const btn = document.querySelector('.theme-switch');
  if (btn) btn.innerHTML = theme === 'dark'
    ? '<i class="ti ti-sun"></i>'
    : '<i class="ti ti-moon"></i>';
  sessionStorage.setItem('user_theme', theme);
}

function toggleTheme() {
  const current = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(current);
}

function initLogin() {
  const userName = sessionStorage.getItem('user_name');
  if (userName) {
    applyUser(userName);
  } else {
    showLogin();
  }
}

function showLogin() {
  const overlay = document.getElementById('login-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLogin() {
  const overlay = document.getElementById('login-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleLogin(event) {
  event.preventDefault();
  const nameInput = document.getElementById('login-name');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    showToast('Ingresa tu nombre para continuar');
    return;
  }
  sessionStorage.setItem('user_name', name);
  applyUser(name);
  closeLogin();
  showToast(`Bienvenido ${name}`);
}

function loginAsGuest() {
  sessionStorage.setItem('user_name', 'Invitado');
  applyUser('Invitado');
  closeLogin();
  showToast('Has iniciado como invitado');
}

function applyUser(name) {
  const avatar = document.querySelector('.avatar');
  if (avatar) {
    avatar.textContent = name
      .split(' ')
      .map(word => word[0]?.toUpperCase())
      .slice(0, 2)
      .join('');
  }
  const profileName = document.querySelector('.profile-name');
  if (profileName) profileName.textContent = name;
  const profileSub = document.querySelector('.profile-sub');
  if (profileSub) profileSub.textContent = 'Voluntario activo';
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── TECLADO: cerrar modal con Escape ────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ─── INIT ────────────────────────────────────────────────────────────────────
// La primera renderización la hace eventos.js; aquí sólo aseguramos el ranking
// esté listo si el usuario va directo a esa pestaña.
renderizarRanking('semana');
initTheme();
initLogin();
initMap();