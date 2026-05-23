/**
 * eventos.js — Módulo de datos y renderizado de eventos
 * Impacto Cerca · Hackathon BCP 2026
 *
 * Contiene:
 *  - eventosMock: datos simulados de eventos (reemplazar por fetch('/api/eventos') en producción)
 *  - renderizarEventos(lista): dibuja las tarjetas de evento
 *  - openModal(id): abre el detalle de un evento
 *  - closeModal(): cierra el modal
 *  - Estado de inscripción por sesión
 */

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const eventosMock = [
  {
    id: 'ev1',
    cat: 'Ambiente',
    titulo: 'Limpieza del río Rímac',
    desc: 'Únete para recoger residuos sólidos a lo largo del cauce del Rímac con los vecinos de San Martín de Porres. Se proveen guantes y bolsas.',
    fecha: 'Sáb 24 mayo',
    hora: '8:00 AM',
    dist: '1.2 km',
    lugar: 'Malecón Checa, San Martín de Porres, Lima, Perú',
    lat: -12.0383,
    lng: -77.0905,
    van: 18,
    cupo: 38, // 20 vacantes libres
    xp: 80,
    icon: 'ti-droplet',
    color: 'teal',
    tags: ['Naturaleza', 'Limpieza', 'Lima Norte'],
    organizador: 'EcoLima ONG'
  },
  {
    id: 'ev2',
    cat: 'Tecnología',
    titulo: 'Taller de programación para niños',
    desc: 'Enseña lógica de bloques y Scratch a niños de un comedor popular. No necesitas ser experto, solo tener paciencia y ganas de compartir.',
    fecha: 'Dom 25 mayo',
    hora: '10:00 AM',
    dist: '0.8 km',
    lugar: 'Parque Huiracocha, Santiago de Surco, Lima, Perú',
    lat: -12.1345,
    lng: -76.9856,
    van: 11,
    cupo: 26, // 15 vacantes libres
    xp: 120,
    icon: 'ti-code',
    color: 'blue',
    tags: ['Educación', 'Tecnología', 'Niños'],
    organizador: 'CodeKids Perú'
  },
  {
    id: 'ev3',
    cat: 'Educación',
    titulo: 'Reforzamiento escolar — Miraflores',
    desc: 'Apoya a niños de primaria con sus tareas escolares de matemáticas y comunicación en la biblioteca comunitaria.',
    fecha: 'Jue 29 mayo',
    hora: '4:00 PM',
    dist: '2.1 km',
    lugar: 'Calle Manuel Bonilla 105, Miraflores, Lima, Perú',
    lat: -12.1212,
    lng: -77.0294,
    van: 7,
    cupo: 22, // 15 vacantes libres
    xp: 60,
    icon: 'ti-book',
    color: 'green',
    tags: ['Clases', 'Niños', 'Miraflores'],
    organizador: 'MuniMiraflores'
  },
  {
    id: 'ev4',
    cat: 'Animales',
    titulo: 'Campaña de adopción de mascotas',
    desc: 'Ayuda a gestionar las fichas de adopción, pasear a los perritos rescatados y concientizar a los visitantes sobre la tenencia responsable.',
    fecha: 'Sáb 31 mayo',
    hora: '9:00 AM',
    dist: '3.5 km',
    lugar: 'Parque de las Mascotas, Campo de Marte, Jesús María, Lima, Perú',
    lat: -12.0691,
    lng: -77.0412,
    van: 25,
    cupo: 40, // 15 vacantes libres
    xp: 90,
    icon: 'ti-heart',
    color: 'coral',
    tags: ['Mascotas', 'Adopción', 'Jesús María'],
    organizador: 'Huellitas Felices'
  },
  {
    id: 'ev5',
    cat: 'Salud',
    titulo: 'Donación de sangre — Clínica Médica',
    desc: 'Buscamos voluntarios para orientar a los donantes, entregar los refrigerios post-donación y registrar los datos de los participantes.',
    fecha: 'Lun 2 junio',
    hora: '7:30 AM',
    dist: '1.7 km',
    lugar: 'Av. Brasil 600, Breña, Lima, Perú',
    lat: -12.0615,
    lng: -77.0478,
    van: 5,
    cupo: 17, // 12 espacios libres
    xp: 100,
    icon: 'ti-heart-medical',
    color: 'purple',
    tags: ['Salud', 'Donación', 'Breña'],
    organizador: 'EsSalud'
  },
  {
    id: 'ev6',
    cat: 'Arte',
    titulo: 'Pintado de mural comunitario',
    desc: 'Dale color a las paredes de una loza deportiva abandonada. Diseñaremos un mural enfocado en la unión del barrio. ¡Trae ropa vieja!',
    fecha: 'Sáb 7 junio',
    hora: '9:30 AM',
    dist: '4.2 km',
    lugar: 'Plaza de Armas de Barranco, Barranco, Lima, Perú',
    lat: -12.1492,
    lng: -77.0211,
    van: 14,
    cupo: 29, // 15 espacios libres
    xp: 110,
    icon: 'ti-palette',
    color: 'amber',
    tags: ['Arte', 'Cultura', 'Barranco'],
    organizador: 'Colectivo ColorBarrio'
  },
  // ─── 5 NUEVOS SITIOS AGREGADOS (SITIOS 7 AL 11) ───────────────────────────
  {
    id: 'ev7',
    cat: 'Ambiente',
    titulo: 'Biohuerto urbano y compostaje',
    desc: 'Aprende y ayuda a implementar un sistema de compostaje comunal y siembra de hortalizas para el beneficio de las ollas comunes.',
    fecha: 'Dom 8 junio',
    hora: '8:30 AM',
    dist: '5.1 km',
    lugar: 'Av. Separadora Industrial, Villa El Salvador, Lima, Perú',
    lat: -12.2105,
    lng: -76.9362,
    van: 8,
    cupo: 20, // 12 espacios libres
    xp: 85,
    icon: 'ti-leaf',
    color: 'teal',
    tags: ['Naturaleza', 'Huerto', 'Lima Sur'],
    organizador: 'VES Verde'
  },
  {
    id: 'ev8',
    cat: 'Educación',
    titulo: 'Feria del libro itinerante y cuentacuentos',
    desc: 'Apoya en la organización de los módulos de lectura al aire libre y participa narrando historias dinámicas para activar la comprensión lectora.',
    fecha: 'Mié 11 junio',
    hora: '3:00 PM',
    dist: '3.8 km',
    lugar: 'Plaza de Armas de Los Olivos, Los Olivos, Lima, Perú',
    lat: -11.9619,
    lng: -77.0702,
    van: 12,
    cupo: 30, // 18 espacios libres
    xp: 75,
    icon: 'ti-balloons',
    color: 'green',
    tags: ['Cultura', 'Niños', 'Lima Norte'],
    organizador: 'Red de Bibliotecas Urbanas'
  },
  {
    id: 'ev9',
    cat: 'Salud',
    titulo: 'Taller preventivo de nutrición',
    desc: 'Asiste a los nutricionistas en el armado de canastas piloto saludables, entrega de guías informativas y control de peso/talla para el adulto mayor.',
    fecha: 'Vie 13 junio',
    hora: '9:00 AM',
    dist: '2.5 km',
    lugar: 'Parque Central de San Juan de Lurigancho, Lima, Perú',
    lat: -11.9868,
    lng: -77.0051,
    van: 15,
    cupo: 35, // 20 espacios libres
    xp: 95,
    icon: 'ti-apple',
    color: 'purple',
    tags: ['Salud', 'Nutrición', 'Lima Este'],
    organizador: 'VidaSana Perú'
  },
  {
    id: 'ev10',
    cat: 'Arte',
    titulo: 'Clase abierta de teatro callejero',
    desc: 'Colabora en la logística, entrega de utilería y convocatoria de vecinos para una puesta en escena interactiva sobre la seguridad ciudadana.',
    fecha: 'Sáb 14 junio',
    hora: '5:00 PM',
    dist: '1.9 km',
    lugar: 'Parque de la Exposición, Cercado de Lima, Lima, Perú',
    lat: -12.0604,
    lng: -77.0368,
    van: 10,
    cupo: 25, // 15 espacios libres
    xp: 115,
    icon: 'ti-masks-theater',
    color: 'amber',
    tags: ['Teatro', 'Comunidad', 'Centro Lima'],
    organizador: 'Teatro del Barrio'
  },
  {
    id: 'ev11',
    cat: 'Animales',
    titulo: 'Construcción de refugios temporales',
    desc: 'Armado de casitas con materiales reciclados (madera y plástico) para proteger del frío del invierno a los animales comunitarios del sector.',
    fecha: 'Dom 15 junio',
    hora: '8:00 AM',
    dist: '6.4 km',
    lugar: 'Av. Las Lomas, San Juan de Miraflores, Lima, Perú',
    lat: -12.1642,
    lng: -76.9631,
    van: 6,
    cupo: 30, // 24 espacios libres
    xp: 130,
    icon: 'ti-home-heart',
    color: 'coral',
    tags: ['Mascotas', 'Reciclaje', 'Lima Sur'],
    organizador: 'Amigos de 4 Patas'
  }
];

// ─── ESTADO LOCAL ─────────────────────────────────────────────────────────────
const inscritoIds = new Set();   // IDs de eventos en los que el usuario se inscribió

// ─── RENDER PRINCIPAL ─────────────────────────────────────────────────────────
function renderizarEventos(eventos) {
  const contenedor = document.getElementById('lista-eventos');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  const meta = document.getElementById('results-meta');
  if (meta) {
    meta.textContent = eventos.length === 0
      ? ''
      : `${eventos.length} evento${eventos.length !== 1 ? 's' : ''} encontrado${eventos.length !== 1 ? 's' : ''}`;
  }

  if (eventos.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-state" role="status">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">Sin resultados</div>
        <p class="empty-sub">Prueba con otra categoría o busca un término diferente.</p>
      </div>`;
    return;
  }

  eventos.forEach((ev, i) => {
    const inscrito = inscritoIds.has(ev.id);
    const ocupado = ev.van >= ev.cupo;
    const pct = Math.round((ev.van / ev.cupo) * 100);

    const div = document.createElement('div');
    div.className = 'event-card';
    div.id = ev.id;
    div.setAttribute('role', 'listitem');
    div.style.animationDelay = `${i * 40}ms`;
    div.innerHTML = `
      <div class="event-top" onclick="openModal('${ev.id}')">
        <div class="event-icon" style="background:var(--${ev.color}-50)">
          <i class="ti ${ev.icon}" style="color:var(--${ev.color}-400);" aria-hidden="true"></i>
        </div>
        <div class="event-info">
          <div class="event-cat" style="color:var(--${ev.color}-400)">${ev.cat}</div>
          <div class="event-title">${ev.titulo}</div>
          <div class="event-meta">
            <span><i class="ti ti-calendar" aria-hidden="true"></i> ${ev.fecha}</span>
            <span><i class="ti ti-clock" aria-hidden="true"></i> ${ev.hora}</span>
            <span><i class="ti ti-map-pin" aria-hidden="true"></i> ${ev.dist}</span>
          </div>
        </div>
      </div>

      <div class="event-cupo">
        <div class="cupo-bar-wrap" role="progressbar" aria-valuenow="${ev.van}" aria-valuemax="${ev.cupo}" aria-label="Voluntarios inscritos">
          <div class="cupo-bar-fill" style="width:${pct}%;background:var(--${ev.color}-400);"></div>
        </div>
        <span class="cupo-label"><i class="ti ti-users" aria-hidden="true"></i> ${ev.van}/${ev.cupo} voluntarios</span>
      </div>

      <div class="event-bottom">
        <div class="event-xp" id="xp-${ev.id}">
          <i class="ti ti-star" aria-hidden="true"></i> +${ev.xp} XP al unirte
        </div>
        ${ocupado && !inscrito
          ? `<button class="join-btn" disabled aria-disabled="true">Cupo lleno</button>`
          : `<button class="join-btn ${inscrito ? 'joined' : 'primary'}" onclick="toggleJoin('${ev.id}', this)" aria-pressed="${inscrito}">
               ${inscrito ? '✓ Inscrito' : 'Unirme'}
             </button>`
        }
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// ─── DETALLE EN MODAL ─────────────────────────────────────────────────────────
function openModal(id) {
  const ev = eventosMock.find(e => e.id === id);
  if (!ev) return;

  const inscrito = inscritoIds.has(ev.id);
  const pct = Math.round((ev.van / ev.cupo) * 100);

  const content = document.getElementById('modal-content');
  
  // Codificamos la dirección limpia directamente desde el objeto
  const direccionCodificada = encodeURIComponent(ev.lugar);

  content.innerHTML = `
    <div class="modal-icon" style="background:var(--${ev.color}-50)">
      <i class="ti ${ev.icon}" style="color:var(--${ev.color}-400);font-size:32px;" aria-hidden="true"></i>
    </div>
    <div class="modal-cat" style="color:var(--${ev.color}-400)">${ev.cat}</div>
    <h2 class="modal-title">${ev.titulo}</h2>
    <p class="modal-desc">${ev.desc}</p>

    <div class="modal-details">
      <div class="modal-detail-row"><i class="ti ti-calendar"></i><span>${ev.fecha} · ${ev.hora}</span></div>
      <div class="modal-detail-row"><i class="ti ti-building"></i><span>${ev.organizador}</span></div>
      
      <div class="modal-detail-row" style="margin-top: 12px; font-weight: 600; color: var(--color-text-primary);">
        <i class="ti ti-map-pin"></i><span>${ev.lugar.split(',')[0]} (${ev.dist})</span>
      </div>
      
      <div style="width: 100%; height: 220px; border-radius: 12px; overflow: hidden; margin-top: 8px; border: 1px solid var(--color-border-tertiary); background: #eee;">
        <iframe 
          src="http://localhost:3000/generar-mapa?direccion=${direccionCodificada}" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>

    <div class="modal-tags">
      ${ev.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>

    <div class="modal-cupo-wrap">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span style="font-size:12px;color:var(--color-text-secondary);">Voluntarios</span>
        <span style="font-size:12px;font-weight:600;color:var(--${ev.color}-400)">${ev.van} / ${ev.cupo}</span>
      </div>
      <div class="cupo-bar-wrap">
        <div class="cupo-bar-fill" style="width:${pct}%;background:var(--${ev.color}-400);"></div>
      </div>
    </div>

    <button class="modal-join-btn ${inscrito ? 'joined' : 'primary'}"
      id="modal-join-${ev.id}"
      onclick="toggleJoinModal('${ev.id}', this)"
      aria-pressed="${inscrito}">
      ${inscrito ? '✓ Ya estás inscrito — cancelar' : `Unirme · +${ev.xp} XP`}
    </button>
  `;

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function toggleJoinModal(id, btn) {
  toggleJoin(id, btn, true);
  // Sincroniza el botón de la card
  const cardBtn = document.querySelector(`#${id} .join-btn`);
  if (cardBtn) {
    const inscrito = inscritoIds.has(id);
    cardBtn.className = `join-btn ${inscrito ? 'joined' : 'primary'}`;
    cardBtn.textContent = inscrito ? '✓ Inscrito' : 'Unirme';
    cardBtn.setAttribute('aria-pressed', inscrito);
  }
}

// ─── TOGGLE INSCRIPCIÓN ───────────────────────────────────────────────────────
function toggleJoin(cardId, btn, fromModal = false) {
  const ev = eventosMock.find(e => e.id === cardId);
  if (!ev) return;

  if (inscritoIds.has(cardId)) {
    // Desinscribir
    inscritoIds.delete(cardId);
    ev.van = Math.max(0, ev.van - 1);
    btn.className = `join-btn ${fromModal ? 'modal-join-btn ' : ''}primary`;
    btn.textContent = fromModal ? `Unirme · +${ev.xp} XP` : 'Unirme';
    btn.setAttribute('aria-pressed', 'false');
    showToast(`Cancelaste tu inscripción en "${ev.titulo}"`);
    // Actualiza XP
    updateXP(-ev.xp);
  } else {
    // Inscribir
    inscritoIds.add(cardId);
    ev.van += 1;
    btn.className = `join-btn ${fromModal ? 'modal-join-btn ' : ''}joined`;
    btn.textContent = fromModal ? '✓ Ya estás inscrito — cancelar' : '✓ Inscrito';
    btn.setAttribute('aria-pressed', 'true');
    showToast(`¡Te inscribiste! +${ev.xp} XP sumados 🎉`);
    // Actualiza XP
    updateXP(ev.xp);
  }

  // Actualiza indicador de cupo en la card
  if (!fromModal) {
    const xpEl = document.querySelector(`#${cardId} .event-xp`);
    if (xpEl) {
      if (inscritoIds.has(cardId)) {
        xpEl.style.color = 'var(--green-400)';
        xpEl.innerHTML = '<i class="ti ti-check"></i> XP sumado';
      } else {
        xpEl.style.color = 'var(--amber-400)';
        xpEl.innerHTML = `<i class="ti ti-star"></i> +${ev.xp} XP al unirte`;
      }
    }
    const cupoLabel = document.querySelector(`#${cardId} .cupo-label`);
    if (cupoLabel) cupoLabel.innerHTML = `<i class="ti ti-users"></i> ${ev.van}/${ev.cupo} voluntarios`;
    const cupoFill = document.querySelector(`#${cardId} .cupo-bar-fill`);
    const pct = Math.round((ev.van / ev.cupo) * 100);
    if (cupoFill) cupoFill.style.width = `${pct}%`;
  }

  // Actualiza sección "Mis eventos"
  renderizarMisEventos();
}

// ─── ACTUALIZAR XP GLOBAL ─────────────────────────────────────────────────────
let xpActual = 67;
function updateXP(delta) {
  xpActual = Math.max(0, xpActual + delta);
  const label = document.getElementById('xp-label-display');
  const bar = document.getElementById('xp-bar-fill');
  if (label) label.textContent = `${xpActual} / 1000 XP`;
  if (bar) bar.style.width = `${Math.min(100, (xpActual / 1000) * 100).toFixed(1)}%`;

  // Actualiza stat de XP en perfil
  const statXP = document.getElementById('stat-xp');
  if (statXP) statXP.textContent = (1240 - 67 + xpActual).toLocaleString('es-PE');
  const lvlFill = document.querySelector('.level-bar-fill');
  if (lvlFill) lvlFill.style.width = `${Math.min(100, (xpActual / 1000) * 100).toFixed(1)}%`;
  const lvlLabel = document.querySelector('.level-bar-labels span:first-child');
  if (lvlLabel) lvlLabel.textContent = `${xpActual} XP`;
}

// ─── MIS EVENTOS ─────────────────────────────────────────────────────────────
const completados = [
  { titulo: 'Limpieza playa La Herradura', fecha: '12 may 2026', xp: 80, icon: 'ti-droplet', color: 'teal' },
  { titulo: 'Hackathon Jóvenes BCP 2026',  fecha: '5 may 2026',  xp: 200, icon: 'ti-device-laptop', color: 'blue' },
  { titulo: 'Tutoría en Villa El Salvador', fecha: '28 abr 2026', xp: 60, icon: 'ti-book', color: 'green' },
];

function renderizarMisEventos() {
  // Próximos: los que se ha inscrito
  const proxPanel = document.getElementById('mis-proximos');
  if (!proxPanel) return;
  const inscritosData = eventosMock.filter(e => inscritoIds.has(e.id));
  if (inscritosData.length === 0) {
    proxPanel.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📅</div>
        <div class="empty-title">Sin eventos próximos</div>
        <p class="empty-sub">Inscríbete en eventos desde la pestaña Explorar.</p>
        <button class="splash-btn" style="margin-top:16px;padding:10px 24px;" onclick="switchTab('explorar', document.querySelector('[onclick*=explorar]'))">Explorar eventos</button>
      </div>`;
  } else {
    proxPanel.innerHTML = inscritosData.map(ev => `
      <div class="mis-event-card">
        <div class="mis-icon" style="background:var(--${ev.color}-50)">
          <i class="ti ${ev.icon}" style="color:var(--${ev.color}-400);"></i>
        </div>
        <div class="mis-info">
          <div class="mis-title">${ev.titulo}</div>
          <div class="mis-meta">${ev.fecha} · ${ev.hora} · ${ev.lugar}</div>
          <div class="mis-xp" style="color:var(--amber-400)"><i class="ti ti-star"></i> +${ev.xp} XP</div>
        </div>
        <button class="mis-cancel" onclick="cancelarInscripcion('${ev.id}')" aria-label="Cancelar inscripción">
          <i class="ti ti-x"></i>
        </button>
      </div>
    `).join('');
  }

  // Completados
  const compPanel = document.getElementById('mis-completados');
  if (!compPanel) return;
  compPanel.innerHTML = completados.map(ev => `
    <div class="mis-event-card">
      <div class="mis-icon" style="background:var(--${ev.color}-50)">
        <i class="ti ${ev.icon}" style="color:var(--${ev.color}-400);"></i>
      </div>
      <div class="mis-info">
        <div class="mis-title">${ev.titulo}</div>
        <div class="mis-meta">${ev.fecha}</div>
      </div>
      <div class="mis-pts">+${ev.xp} XP</div>
    </div>
  `).join('');
}

function cancelarInscripcion(id) {
  const cardBtn = document.querySelector(`#${id} .join-btn`);
  if (cardBtn) toggleJoin(id, cardBtn);
  else {
    inscritoIds.delete(id);
    const ev = eventosMock.find(e => e.id === id);
    if (ev) { ev.van = Math.max(0, ev.van - 1); updateXP(-ev.xp); }
    renderizarMisEventos();
    showToast('Inscripción cancelada');
  }
}

// ─── RENDER INICIAL ───────────────────────────────────────────────────────────
renderizarEventos(eventosMock);
renderizarMisEventos();
