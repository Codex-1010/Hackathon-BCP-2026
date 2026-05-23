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
    lugar: 'Malecón Checa, SMP',
    lat: -12.0383,
    lng: -77.0905,
    van: 18,
    cupo: 30,
    xp: 80,
    icon: 'ti-droplet',
    color: 'teal',
    tags: ['Naturaleza', 'Limpieza', 'Lima Norte'],
    organizador: 'EcoLima ONG',
  },
  {
    id: 'ev2',
    cat: 'Tecnología',
    titulo: 'Taller de programación para niños',
    desc: 'Enseña a niños de 8 a 12 años los fundamentos de Scratch y lógica computacional. No se necesita experiencia previa en docencia.',
    fecha: 'Dom 25 mayo',
    hora: '10:00 AM',
    dist: '0.8 km',
    lugar: 'Biblioteca Miraflores',
    lat: -12.1194,
    lng: -77.0355,
    van: 11,
    cupo: 20,
    xp: 120,
    icon: 'ti-code',
    color: 'blue',
    tags: ['Niños', 'Programación', 'Educación'],
    organizador: 'Code for Peru',
  },
  {
    id: 'ev3',
    cat: 'Educación',
    titulo: 'Reforzamiento escolar — Miraflores',
    desc: 'Apoyo académico en matemáticas y comunicación para alumnos de primaria en colegios públicos de Miraflores. Horario flexible.',
    fecha: 'Jue 29 mayo',
    hora: '3:30 PM',
    dist: '2.1 km',
    lugar: 'I.E. República de Colombia',
    lat: -12.1230,
    lng: -77.0402,
    van: 7,
    cupo: 15,
    xp: 60,
    icon: 'ti-book',
    color: 'green',
    tags: ['Escolar', 'Matemáticas', 'Lima'],
    organizador: 'Enseña Perú',
  },
  {
    id: 'ev4',
    cat: 'Animales',
    titulo: 'Campaña de adopción animal',
    desc: 'Ayuda a encontrar hogares para perros y gatos rescatados. Necesitamos voluntarios para fotografía, difusión y atención en stand.',
    fecha: 'Sáb 31 mayo',
    hora: '9:00 AM',
    dist: '3.4 km',
    lugar: 'ParqueReducto, Miraflores',
    lat: -12.1225,
    lng: -77.0328,
    van: 24,
    cupo: 40,
    xp: 90,
    icon: 'ti-paw',
    color: 'purple',
    tags: ['Mascotas', 'Adopción', 'Rescate'],
    organizador: 'Huellitas Felices',
  },
  {
    id: 'ev5',
    cat: 'Salud',
    titulo: 'Donación de sangre voluntaria',
    desc: 'Campaña de donación en coordinación con el Hospital Almenara. El proceso completo dura 30 minutos y salvas hasta 3 vidas.',
    fecha: 'Lun 2 jun',
    hora: '8:00 AM',
    dist: '3.5 km',
    lugar: 'Hospital Almenara, La Victoria',
    lat: -12.0691,
    lng: -77.0189,
    van: 45,
    cupo: 80,
    xp: 100,
    icon: 'ti-heart',
    color: 'coral',
    tags: ['Salud', 'Sangre', 'Hospital'],
    organizador: 'Cruz Roja Peruana',
  },
  {
    id: 'ev6',
    cat: 'Ambiente',
    titulo: 'Siembra de árboles — Surco',
    desc: 'Plantaremos 200 árboles nativos en el parque Huiracocha. Trae zapatos cerrados y ropa que puedas ensuciar. Refrigerio incluido.',
    fecha: 'Dom 8 jun',
    hora: '7:30 AM',
    dist: '4.7 km',
    lugar: 'Parque Huiracocha, Surco',
    lat: -12.1118,
    lng: -77.0075,
    van: 33,
    cupo: 60,
    xp: 110,
    icon: 'ti-trees',
    color: 'green',
    tags: ['Reforestación', 'Naturaleza', 'Surco'],
    organizador: 'Verde Lima',
  },
  {
    id: 'ev7',
    cat: 'Arte',
    titulo: 'Mural comunitario en Villa María',
    desc: 'Pinta junto a artistas locales un mural de 40 metros en el jirón principal de Villa María del Triunfo. Sin experiencia necesaria.',
    fecha: 'Sáb 14 jun',
    hora: '9:00 AM',
    dist: '8.2 km',
    lugar: 'Jr. Las Flores, Villa María del Triunfo',
    lat: -12.0090,
    lng: -76.9910,
    van: 16,
    cupo: 25,
    xp: 95,
    icon: 'ti-palette',
    color: 'purple',
    tags: ['Arte urbano', 'Mural', 'Comunidad'],
    organizador: 'Murales sin Fronteras',
  },
  {
    id: 'ev8',
    cat: 'Educación',
    titulo: 'Feria de ciencias itinerante',
    desc: 'Monta experimentos científicos simples para niños en asentamientos humanos de SJL. Se proporciona todo el material.',
    fecha: 'Dom 15 jun',
    hora: '11:00 AM',
    dist: '5.9 km',
    lugar: 'AA.HH. Enrique Milla, SJL',
    lat: -12.0143,
    lng: -76.9570,
    van: 9,
    cupo: 20,
    xp: 70,
    icon: 'ti-flask',
    color: 'blue',
    tags: ['Ciencia', 'Niños', 'SJL'],
    organizador: 'Científicos sin Frontera',
  },
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

  const contenedor = document.getElementById('modal-content');
  if (!contenedor) return;

  const inscrito = inscritoIds.has(ev.id);
  const ocupado = ev.van >= ev.cupo;

  // Codificamos el texto del lugar de forma segura para usarlo como parámetro de la URL
  const direccionCodificada = encodeURIComponent(ev.lugar + ", Lima, Peru");

  contenedor.innerHTML = `
    <div class="modal-header">
      <div class="modal-cat" style="color:var(--${ev.color}-400)">${ev.cat}</div>
      <h2 class="modal-title">${ev.titulo}</h2>
      <div class="modal-org">Organizado por <strong>${ev.organizador}</strong></div>
    </div>

    <div class="modal-body">
      <p class="modal-desc">${ev.desc}</p>
      
      <div class="modal-meta-grid">
        <div class="meta-item"><i class="ti ti-calendar"></i> ${ev.fecha}</div>
        <div class="meta-item"><i class="ti ti-clock"></i> ${ev.hora}</div>
        <div class="meta-item"><i class="ti ti-map-pin"></i> ${ev.lugar} (${ev.dist})</div>
      </div>

      <div class="modal-mapa-container">
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

      <div class="modal-tags">
        ${ev.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-footer">
      <div class="modal-xp-reward"><i class="ti ti-star"></i> +${ev.xp} XP</div>
      ${ocupado && !inscrito 
        ? `<button class="join-btn modal-join-btn" disabled>Cupo lleno</button>`
        : `<button class="join-btn modal-join-btn ${inscrito ? 'joined' : 'primary'}" onclick="toggleJoin('${ev.id}', this, true)">
            ${inscrito ? '✓ Inscrito — Cancelar' : `Unirme`}
           </button>`
      }
    </div>
  `;

  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.add('show');
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
