# Alma Dendera — dirección de marca y diseño web

## Stack técnico

| Capa | Herramienta |
|---|---|
| Framework | **Astro** (SSR por defecto → genera HTML estático en build) |
| Animaciones | **GSAP** + **ScrollTrigger** |
| Salida | `output: 'static'` |
| Tipografía | Google Fonts: Fraunces, Public Sans, IBM Plex Mono |

### Regla de animaciones
Toda animación con GSAP debe estar **aislada dentro del componente** que la necesita. Cada componente declara su propio `<script>` con su instancia de GSAP. No hay animaciones globales sueltas — esto evita conflictos con la hidratación parcial de Astro y mantiene el DOM disciplinado.

### Música de fondo
Archivo `.mp3` estático que el usuario activa manualmente con un botón sutil. Sin autoplay. Sin streaming server-side. SSR no presenta limitación para este approach.

---

## Responsive — Columna de resonancia

| Pantalla | Comportamiento |
|---|---|
| Desktop (>768px) | Línea vertical fina en el margen derecho, se completa con el scroll. 3 waypoints como dots. |
| Mobile (≤768px) | Barra de progresión horizontal en el borde superior. Los 3 waypoints se convierten en dots sobre la barra. Tooltips al tocar cada dot. |

---

## Concepto central: "el camino sonoro"

La web no se presenta como un catálogo de secciones (Hero → Servicios → Contacto), sino como un **recorrido**: de la tensión a la calma, del ruido al silencio. Cada sección es un paso en ese camino, y el scroll actúa como el motor de esa narrativa.

**Elemento firma:** una *columna de resonancia* — una línea vertical fina, dibujada como una forma de onda real, que corre por el costado de toda la página y se va "completando" a medida que se scrollea. Conecta visualmente todo el sitio y funciona como indicador de progreso del recorrido, no como decoración. Tres puntos sobre esa línea marcan waypoints (llegada, comprensión, conexión) que se iluminan al llegar a cada etapa.

Este recurso es lo que aleja a la web del típico sitio de bienestar (círculos + crema + serif alto contraste), porque es funcional, no ornamental.

---

## Paleta de color

| Uso | Color | Hex |
|---|---|---|
| Fondo principal | Negro cálido ("tinta") | `#12100E` |
| Fondo alternativo / claro | Hueso cálido | `#F7F3EC` |
| Acento principal | Bronce / latón (metal de cuenco tibetano) | `#C99B4A` |
| Acento secundario | Ciruela apagado | `#6B4550` |
| Detalle / texto sobre oscuro | Gris salvia neblina | `#B9C4C2` |

La lógica: se evita a propósito el combo crema + terracota + serif, que es el default genérico de casi cualquier sitio de "wellness" generado con IA hoy. Acá el fondo oscuro tipo "cámara de resonancia" con acento metálico genera algo más distintivo y en línea con la seriedad terapéutica del servicio (vibroacústica, reiki), sin perder calidez.

Las secciones alternan entre fondo oscuro y hueso claro — ese cambio de tono *es* parte de la narrativa del camino (de la introspección a la claridad).

---

## Tipografía

| Rol | Tipografía | Por qué |
|---|---|---|
| Display / títulos | **Fraunces** (serif, optical sizing) | Calidez artesanal, nada rígida — evita el look "editorial genérico" de una serif de alto contraste clásica |
| Cuerpo de texto | **Public Sans** | Limpia, legible, no compite con el display |
| Labels / eyebrows / captions | **IBM Plex Mono** | Aporta un aire de "forma de onda / timestamp" que conecta con lo sonoro (ej: "Paso 01 — comprensión") |

Ambas están en Google Fonts, así que son fáciles de implementar en cualquier stack.

---

## Estructura del recorrido (contenido por sección)

1. **Hero** — nombre, frase de esencia corta, ondas concéntricas respirando suavemente (animación ambiental, no protagónica)
2. **Comprensión** — qué es el soundhealing, resumido y en lenguaje simple (nunca médico ni denso)
3. **Beneficios** — grid visual, poco texto, íconos más que párrafos
4. **Servicios** — 3 bloques: Soundhealing / Terapia vibroacústica (destacada como su sello) / Reiki
5. **Sobre ella** — bio corta, humaniza el recorrido
6. **Testimonios** — si tiene, si no, se omite por ahora sin dejar hueco vacío
7. **Contacto** — CTA claro, WhatsApp/Instagram, sin fricción
8. **Footer** — disclaimer breve ("no reemplaza tratamiento médico"), redes

---

## Lenguaje de movimiento (principios, no implementación)

- **Transiciones como contenido**, no como efecto: el paso entre secciones se hace con una cresta de onda (SVG que "encastra" una sección con la siguiente), no con un corte seco
- **Animación ambiental, no llamativa**: las ondas del Hero respiran en loop lento (6s), nunca distraen
- **El scroll cuenta la historia**: la columna de resonancia se completa en proporción directa al progreso de scroll — es el único elemento que "sabe" en qué parte del camino estás
- **Menos es más**: un solo momento de riesgo visual (la columna), todo lo demás queda quieto y disciplinado alrededor
- **Reduced motion respetado**: cualquier animación ambiental debe poder desactivarse para quien lo prefiera

---

## Tono de copy

Cálido, claro, sin jerga médica ni espiritual "New Age" densa. Frases cortas. Aclarar siempre —sin sonar legal ni frío— que esto acompaña, no reemplaza, tratamiento médico. Nombrar las cosas por lo que la persona reconoce ("una sesión de una hora", no "protocolo terapéutico").

---

## Música de fondo (si se implementa)

- Nunca autoplay con audio al cargar — arranca con un botón sutil de activación
- Idealmente grabaciones propias de ella (cuencos, sesiones reales) antes que stock genérico — le da autenticidad
- Loop suave, volumen bajo, que "respire" con el scroll si es posible

---

## Referencia visual

Se armó una preview interactiva (HTML) mostrando el Hero + la primera transición en acción — column de resonancia, ondas respirando, cresta de onda entre secciones — para validar el concepto antes de llevarlo a producción. Si querés, te la vuelvo a compartir o la dejamos como referencia aparte de este documento.
