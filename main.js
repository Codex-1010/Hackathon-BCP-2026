
//@CODEX
const eventosMock = [
  { id: 'card1', cat: 'Ambiente', titulo: 'Limpieza del río Rímac', fecha: 'Sáb 24 mayo', dist: '1.2 km', van: 18, xp: 80, icon: 'ti-droplet', color: 'coral' },
  { id: 'card2', cat: 'Tecnología', titulo: 'Taller de programación para niños', fecha: 'Dom 25 mayo', dist: '0.8 km', van: 11, xp: 120, icon: 'ti-code', color: 'blue' },
  { id: 'card3', cat: 'Educación', titulo: 'Reforzamiento escolar — Miraflores', fecha: 'Jue 29 mayo', dist: '2.1 km', van: 7, xp: 60, icon: 'ti-book', color: 'green' }
];

//@CODEX
function renderizarEventos(eventos) {
  const contenedor = document.getElementById('lista-eventos');
  contenedor.innerHTML = '';// Limpiamos lo que haya antes

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

// 4. Esta línea carga todos los eventos la primera vez que abres la página
renderizarEventos(eventosMock);


function toggleJoin(cardId, btn) {
  if (btn.classList.contains('joined')) {
    btn.classList.remove('joined');
    btn.classList.add('primary');
    btn.textContent = 'Unirme';
  } else {
    btn.classList.remove('primary');
    btn.classList.add('joined');
    btn.textContent = 'Inscrito';
    const xp = document.querySelector('#' + cardId + ' .event-xp');
    if (xp) { xp.style.color = 'var(--green-400)'; xp.innerHTML = '<i class="ti ti-check"></i> XP sumado'; }
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
