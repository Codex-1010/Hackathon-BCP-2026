
//@CODEX
const eventosMock = [
  { id: 'card1', cat: 'Ambiente', titulo: 'Limpieza del río Rímac', fecha: 'Sáb 24 mayo', dist: '1.2 km', van: 18, xp: 80, icon: 'ti-droplet', color: 'coral', coords: [-12.095, -77.030] },
  { id: 'card2', cat: 'Tecnología', titulo: 'Taller de programación para niños', fecha: 'Dom 25 mayo', dist: '0.8 km', van: 11, xp: 120, icon: 'ti-code', color: 'blue', coords: [-12.102, -77.038] },
  { id: 'card3', cat: 'Educación', titulo: 'Reforzamiento escolar — Miraflores', fecha: 'Jue 29 mayo', dist: '2.1 km', van: 7, xp: 60, icon: 'ti-book', color: 'green', coords: [-12.090, -77.025] }
];

// ==========================================
// SISTEMA DE EXPERIENCIA (XP)
// ==========================================
let xpUsuario = 67; // XP inicial que tienes en el HTML
const xpNivel = 1000; // XP necesario para subir de nivel

function actualizarXP(puntos) {
  // 1. Actualizamos el valor global
  xpUsuario += puntos;
  
  // Evitamos que baje de 0
  if (xpUsuario < 0) xpUsuario = 0; 

  // 2. Calculamos el nuevo porcentaje de la barra
  const porcentaje = (xpUsuario / xpNivel) * 100;

  // 3. Actualizamos el HTML (Barra y Texto)
  const barra = document.querySelector('.xp-bar');
  const etiqueta = document.querySelector('.xp-label');
  
  if (barra && etiqueta) {
    barra.style.width = `${porcentaje}%`;
    etiqueta.textContent = `${xpUsuario} / ${xpNivel} XP`;
  }
}

//@CODEX
function renderizarEventos(eventos) {
  const contenedor = document.getElementById('lista-eventos');
  contenedor.innerHTML = '';// Limpiamos lo que haya antes

  actualizarMapa(eventos); // Estado vacío: si no hay eventos...

  // Estado vacío: si no hay eventos para la categoría
  if (!eventos || eventos.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-state-container">
        <div class="empty-state-icon">
          <i class="ti ti-calendar-off"></i>
        </div>
        <div class="empty-state-title">No hay eventos disponibles</div>
        <div class="empty-state-text">Por ahora no tenemos actividades programadas aquí. ¡Prueba explorando otras categorías!</div>
        <button class="join-btn primary" style="margin-top: 14px;" onclick="resetearFiltros()">Ver todos los eventos</button>
      </div>
    `;
    return;
  }

  // Dibujamos cada tarjeta
  eventos.forEach(ev => {
    const html = `
      <div class="event-card" id="${ev.id}">
        <div class="event-top">
          <div class="event-icon" style="background:var(--${ev.color}-50)">
            <i class="ti ${ev.icon}" style="color:var(--${ev.color}-400);" aria-hidden="true"></i>
          </div>
          <div class="event-info">
            <div class="event-cat" style="color:var(--${ev.color}-400)">${ev.cat}</div>
            <div class="event-title">${ev.titulo}</div>
            <div class="event-meta">
              <span><i class="ti ti-calendar" aria-hidden="true"></i> ${ev.fecha}</span>
              <span><i class="ti ti-map-pin" aria-hidden="true"></i> ${ev.dist}</span>
              <span><i class="ti ti-users" aria-hidden="true"></i> ${ev.van} asistentes</span>
            </div>
          </div>
        </div>
        <div class="event-bottom">
          <div class="event-xp"><i class="ti ti-star" aria-hidden="true"></i> +${ev.xp} XP al unirte</div>
          <button class="join-btn primary" onclick="toggleJoin('${ev.id}', this)">Unirme</button>
        </div>
      </div>
    `;
    contenedor.innerHTML += html;
  });
}

//@CODEX
function switchTab(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
  document.getElementById(name).classList.add('active');
  el.classList.add('active');
  el.setAttribute('aria-selected','true');
}

function filterChip(el) {
  // 1. Cambia el estilo del botón activo para feedback inmediato
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  // 2. Extraer solo el texto ignorando los nodos del icono de Tabler
  const categoriaSeleccionada = el.lastChild.textContent.trim();

  // 3. Filtrar el arreglo simulado y re-dibujar
  if (categoriaSeleccionada === 'Todos') {
    renderizarEventos(eventosMock);
  } else {
    const filtrados = eventosMock.filter(evento => evento.cat === categoriaSeleccionada);
    renderizarEventos(filtrados);
  }
}

// Función de auxilio para el botón del Estado Vacío
function resetearFiltros() {
  const chipTodos = document.querySelector('.filter-strip .chip:first-child');
  if (chipTodos) {
    filterChip(chipTodos);
  }
}


function toggleJoin(cardId, btn) {
  // Buscamos cuánta XP da este evento específico
  const evento = eventosMock.find(e => e.id === cardId);
  const puntos = evento ? evento.xp : 0;

  if (btn.classList.contains('joined')) {
    // Acción: Cancelar inscripción
    btn.classList.remove('joined');
    btn.classList.add('primary');
    btn.textContent = 'Unirme';
    
    actualizarXP(-puntos); // Restamos la XP
    
    // Restauramos el texto original de XP en la tarjeta
    const xpText = document.querySelector('#' + cardId + ' .event-xp');
    if (xpText) { 
      xpText.style.color = 'var(--amber-400)'; 
      xpText.innerHTML = `<i class="ti ti-star" aria-hidden="true"></i> +${puntos} XP al unirte`; 
    }
  } else {
    // Acción: Inscribirse
    btn.classList.remove('primary');
    btn.classList.add('joined');
    btn.textContent = 'Inscrito';
    
    actualizarXP(puntos); // Sumamos la XP
    
    // Cambiamos el texto de la tarjeta a verde
    const xpText = document.querySelector('#' + cardId + ' .event-xp');
    if (xpText) { 
      xpText.style.color = 'var(--green-400)'; 
      xpText.innerHTML = '<i class="ti ti-check"></i> XP sumado'; 
    }
  }
}


/*
Creacion del Mock data para la simulaciones sin depender de la base de datos.
  const  datosJason= [
    {
     
    }
    {
    
    }
  ];

function datosSimulacion(){
  //
  
  
}


  */

// ==========================================
// CONFIGURACIÓN DEL MAPA INTERACTIVO @CODEX
// ==========================================

// 1. Inicializamos el mapa en el contenedor y lo centramos en San Isidro, Lima
const mapa = L.map('contenedor-mapa').setView([-12.097, -77.035], 14);

// 2. Cargamos la capa de calles de OpenStreetMap (Gratis y sin API key)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(mapa);

// Guardamos los pines aquí para poder borrarlos cuando cambies de filtro
let pinesActuales = [];

function actualizarMapa(eventosFiltrados) {
  // 1. Borramos los pines anteriores del mapa
  pinesActuales.forEach(pin => mapa.removeLayer(pin));
  pinesActuales = []; 

  // 2. Dibujamos los pines nuevos
  eventosFiltrados.forEach(evento => {
    if(evento.coords) {
      const marcador = L.marker(evento.coords).addTo(mapa)
        .bindPopup(`<b>${evento.titulo}</b><br>+${evento.xp} XP`);
      pinesActuales.push(marcador); // Lo guardamos en el arreglo
    }
  });
}

// Arranque inicial de la aplicación (Debe ir siempre al final)
renderizarEventos(eventosMock);