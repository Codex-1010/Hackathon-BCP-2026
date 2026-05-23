# 🌿 Impacto Cerca — Hackathon BCP 2026

App de voluntariado y participación comunitaria para jóvenes peruanos.

---

## Estructura del proyecto

```
Hackathon-BCP-2026/
├── impacto_cerca_app.html   # Pantalla principal (HTML semántico + accesibilidad)
├── styless.css              # Estilos completos con variables CSS y responsive
├── eventos.js               # Datos mock, renderizado de tarjetas y lógica de inscripción
├── main.js                  # Lógica de UI: tabs, filtros, búsqueda, ranking, toast
└── README.md                # Este archivo
```

---

## Funcionalidades implementadas

### ✅ Explorar
- Búsqueda en tiempo real por título, descripción o etiquetas
- Filtros de categoría por chip (Todos / Ambiente / Educación / Tecnología / Animales / Salud / Arte)
- Mapa visual con marcadores de eventos cercanos
- Tarjetas de evento con barra de cupo, fecha, hora, lugar y XP
- **Modal de detalle** con descripción completa, tags, organizador y botón de inscripción
- Estado de cupo lleno (botón deshabilitado)

### ✅ Ranking
- Selector de período: Esta semana / Este mes / Total
- Podio visual con top 3
- Lista con posición, avatar, puntos y destacado del usuario actual
- Tendencia de posición (subida de puestos)

### ✅ Mis eventos *(sección nueva)*
- Pestaña de **Próximos**: lista de eventos en los que se inscribió el usuario
- Pestaña de **Completados**: historial de eventos pasados
- Botón para cancelar inscripción

### ✅ Perfil
- Barra de progreso de nivel con XP actual vs. objetivo
- Estadísticas: eventos, XP total, racha y ranking
- Insignias obtenidas y bloqueadas (con candado)
- Historial de impacto con fechas
- Panel de configuración (Notificaciones, Mi zona, Invitar amigos)

### ✅ UX global
- **Splash de bienvenida** (sólo la primera visita por sesión)
- **Toast de notificaciones** para feedback inmediato
- XP que se actualiza en tiempo real al inscribirse / cancelar
- Barra de XP en el header sincronizada
- Accesibilidad: roles ARIA, aria-label, aria-selected, aria-pressed, aria-live, contraste WCAG AA
- Responsive: móvil, tablet y desktop

---

## Datos mock

Los datos de ejemplo están en `eventos.js` (array `eventosMock`).  
Para conectar a una API real, reemplaza la función `renderizarEventos` inicial por:

```js
async function cargarEventos() {
  try {
    const res  = await fetch('/api/eventos');
    const data = await res.json();
    renderizarEventos(data);
  } catch (err) {
    console.error('Error al cargar eventos:', err);
    renderizarEventos([]);
  }
}
cargarEventos();
```

---

## Stack

- HTML5 semántico
- CSS3 con variables custom (sin frameworks)
- JavaScript vanilla (ES6+)
- [Tabler Icons](https://tabler.io/icons) CDN
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts)

---

## Equipo

Hackathon Jóvenes BCP 2026 · Lima, Perú
