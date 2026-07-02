# Alma Dendera

Soundhealing, vibroacústica y reiki — sitio web one-page con narrativa de scroll.

---

## Stack técnico

| Capa | Herramienta |
|---|---|
| Framework | [Astro](https://astro.build) (SSG — genera HTML estático en build) |
| Animaciones | [GSAP](https://gsap.com) v3 (incluye ScrollTrigger, no requiere instalación aparte) |
| Tipografía | Google Fonts — DM Sans, Public Sans, IBM Plex Mono |

### Reglas del proyecto

- **Animaciones aisladas**: cada componente declara su propio `<script>` con GSAP. No hay animaciones globales sueltas. Esto evita conflictos con la hidratación parcial de Astro.
- **Reduced motion**: toda animación ambiental respeta `prefers-reduced-motion`. Ya incluido en `src/styles/global.css`.
- **Música**: archivo `.mp3` estático activado por botón. Sin autoplay.

---

## Prerrequisitos

- Node.js >= 18
- npm

## Instalación y uso

```bash
git clone https://github.com/JulianR10/alma-dendera.git
cd alma-dendera
npm install
npm run dev      # servidor de desarrollo local
npm run build    # build de producción → dist/
npm run preview  # previsualizar build local
```

---

## Estructura del proyecto

```
alma-dendera/
├── public/               # archivos estáticos (imgs, audio, favicon)
├── src/
│   ├── components/       # componentes Astro (.astro)
│   │   └── ResonanceColumn.astro
│   ├── pages/            # rutas del sitio
│   │   └── index.astro
│   └── styles/
│       └── global.css    # reset, variables, reduced motion
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── readme.md
```

---

## Concepto central: "el camino sonoro"

Sitio one-page diseñado como un **recorrido**: de la tensión a la calma, del ruido al silencio. Cada sección es un paso en ese camino, el scroll es el motor narrativo.

**Elemento firma:** una *columna de resonancia* — línea vertical fina con forma de onda que corre por el costado de la página y se completa con el scroll. Tres waypoints (llegada, comprensión, conexión) se iluminan al llegar a cada etapa. En mobile se convierte en barra de progresión horizontal superior.

---

## Paleta de color

| Uso | Color | Hex |
|---|---|---|
| Fondo principal | Negro cálido ("tinta") | `#12100E` |
| Fondo alternativo | Hueso cálido | `#F7F3EC` |
| Acento principal | Bronce / latón | `#C99B4A` |
| Acento secundario | Ciruela apagado | `#6B4550` |
| Detalle / texto s/oscuro | Gris salvia neblina | `#B9C4C2` |

Las secciones alternan entre fondo oscuro y hueso claro — ese cambio de tono es parte de la narrativa (de la introspección a la claridad).

---

## Tipografía

| Rol | Fuente |
|---|---|
| Display / títulos | DM Sans |
| Cuerpo | Public Sans |
| Labels / eyebrows / captions | IBM Plex Mono |

---

## Tono de copy

Cálido, claro, sin jerga médica ni espiritual densa. Frases cortas. Aclarar siempre que esto acompaña, no reemplaza, tratamiento médico. Nombrar las cosas por lo que la persona reconoce ("una sesión de una hora", no "protocolo terapéutico").

---

## Estructura del recorrido

1. **Hero** — nombre, frase de esencia, ondas concéntricas respirando
2. **Comprensión** — qué es el soundhealing, en lenguaje simple
3. **Beneficios** — grid visual, íconos
4. **Servicios** — Soundhealing / Vibroacústica / Reiki
5. **Sobre ella** — bio corta
6. **Testimonios** — si hay, si no se omite
7. **Contacto** — WhatsApp / Instagram
8. **Footer** — disclaimer médico, redes

---

## Lenguaje de movimiento

- **Transiciones con cresta de onda SVG** entre secciones (no cortes secos)
- **Animación ambiental lenta** (6s loop) — nunca distractiva
- **Columna de resonancia** como único elemento que registra progreso de scroll
- **Un solo momento de riesgo visual** — todo lo demás quieto
- **Reduced motion respetado**

---

## Licencia

Proyecto privado — todos los derechos reservados.
