# Alma Dendera

Soundhealing, vibroacústica y reiki — sitio web one-page con narrativa de scroll.

---

## Stack técnico

| Capa        | Herramienta                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| Framework   | [Astro](https://astro.build) (SSG — genera HTML estático en build)                          |
| Animaciones | [GSAP](https://gsap.com) v3 (incluye ScrollTrigger, no requiere instalación aparte)         |
| Scroll      | [Lenis](https://lenis.darkroom.engineering) (smooth scroll, sincronizado con ScrollTrigger) |
| Tipografía  | Google Fonts — Inter, Public Sans                                                           |

### Reglas del proyecto

- **Reduced motion**: toda animación ambiental respeta `prefers-reduced-motion`. Ya incluido en `src/styles/global.css`.

---

## Prerrequisitos

- Node.js &gt;= 18
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
├── public/                    # archivos estáticos (imgs, audio, favicon)
├── src/
│   ├── components/            # componentes Astro (.astro) — solo HTML + data-animate
│   │   ├── Hero.astro           # hero: maga cover, nav, tagline, CTA, menú mobile
│   │   ├── Sessions.astro       # servicios: título, cards Soundhealing/Reiki, cierre grupal
│   │   ├── QuoteBand.astro      # banda de frase (Magali) con slot para foto de fondo
│   │   ├── Incense.astro        # canvas de incienso (vive en el cierre grupal)
│   │   ├── MusicToggle.astro
│   │   └── ResonanceColumn.astro # isla nav fija (se oculta bajando, vuelve subiendo)
│   ├── lib/                   # lógica TypeScript pura
│   │   ├── animations/        # sistema de animaciones desacoplado
│   │   │   ├── registry.ts    # mapea data-animate → función GSAP
│   │   │   ├── hero.ts        # entrance + ambient del hero
│   │   │   ├── heroSessions.ts # transición seamless hero→sesiones (scrub)
│   │   │   ├── sessions.ts    # revelado de cards
│   │   │   ├── quote.ts       # entrada de la banda de frase
│   │   │   ├── resonance.ts   # isla nav + progreso por secciones
│   │   │   └── reducedMotion.ts
│   │   ├── audio/
│   │   │   └── controller.ts  # clase AudioController
│   │   ├── canvas/
│   │   │   └── incense.ts     # humo, brasa, cuenco y ciclo de consumo (8 min)
│   │   └── scroll/
│   │       └── smooth.ts      # init Lenis + anchors suaves
│   ├── images/                # logo, fondoMaga2, fondoSoundhealing, fondoReiki
│   ├── pages/
│   │   └── index.astro        # compone todos los componentes
│   └── styles/
│       ├── global.css         # imports + placeholders + reduced motion
│       ├── tokens.css         # paleta, fuentes, espaciados, layout
│       ├── base.css           # reset + CTAs
│       ├── hero.css
│       ├── sessions.css       # cards vidrio esmerilado
│       ├── quote-band.css
│       ├── incense.css
│       ├── music-toggle.css
│       └── resonance.css
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── astro.config.mjs
├── eslint.config.js
├── package.json
├── prettierrc
├── tsconfig.json
└── readme.md
```

---

## Concepto central: "el camino sonoro"

Sitio one-page diseñado como un **recorrido**: de la tensión a la calma, del ruido al silencio. Cada sección es un paso en ese camino, el scroll es el motor narrativo.

**Elemento firma:** una _columna de resonancia_ — línea vertical fina con forma de onda que corre por el costado de la página y se completa con el scroll. Tres waypoints (llegada, la sala, conexión) se iluminan al llegar a cada etapa. En mobile se convierte en barra de progresión horizontal superior.

---

## La hora

En sesión, la persona se recuesta o se sienta. Mat o almohada vibroacústica (según el caso) en contacto con el cuerpo. Magali hace un baño sonoro: un pequeño concierto con **cuencos tibetanos**, **cuencos de cuarzo**, **samafones**, **semillas somáticas** y otros. Individual o grupal.

### Soundhealing

Terapia de sonido que utiliza **cuencos tibetanos**, **cuencos de cuarzo**, **samafones** y **semillas somáticas** para sincronizar las ondas cerebrales con frecuencias de relajación, activar el nervio vago y regular el sistema nervioso.

### Vibroacústica

Modalidad del soundhealing, no una práctica aparte. Transmite frecuencias sonoras específicas (20–120 Hz) a través de un mat o almohada vibroacústica en contacto directo con el cuerpo, combinado con un baño sonoro con instrumentos.

### Reiki

Técnica japonesa de imposición de manos que canaliza energía vital (ki) para restablecer el flujo energético del cuerpo, la mente y el espíritu. Puede realizarse presencial o a distancia. No forma parte de la hora sonora.

---

## Paleta de color

> Tokens en `src/styles/tokens.css`.

| Rol                   | Token                   | Hex                                                                 | Uso                                          |
| --------------------- | ----------------------- | ------------------------------------------------------------------- | -------------------------------------------- |
| **Principal oscuro**  | `--color-primary`       | `#69492B` · ![#69492B](https://img.shields.io/badge/-69492B-69492B) | Tinta, texto CTA, títulos s/claro            |
| **Principal claro**   | `--color-primary-light` | `#FAE8CA` · ![#FAE8CA](https://img.shields.io/badge/-FAE8CA-FAE8CA) | Fondos suaves, hover CTA                     |
| Variación extra clara | `--color-primary-soft`  | `#FEFBF5` · ![#FEFBF5](https://img.shields.io/badge/-FEFBF5-FEFBF5) | Texto sobre imagen (h1), fondo CTA           |
| Variación papel       | `--color-paper`         | `#F5F2EC` · ![#F5F2EC](https://img.shields.io/badge/-F5F2EC-F5F2EC) | Fondo base body + divider + secciones claras |
| Variación media       | `--color-muted`         | `#D8D2C4` · ![#D8D2C4](https://img.shields.io/badge/-D8D2C4-D8D2C4) | Bordes sutiles, texto secundario             |
| Variación tinta       | `--color-ink`           | `#2B2B2B` · ![#2B2B2B](https://img.shields.io/badge/-2B2B2B-2B2B2B) | Texto principal sobre claro                  |

> Aliases legacy (`--color-beige-dark`, `--color-beige-light`, `--color-on-image`, `--color-bg-light`, etc.) apuntan a los 6 de arriba por compatibilidad — eliminar próximo sprint.

---

## Tipografía

| Rol                          | Fuente                             |
| ---------------------------- | ---------------------------------- |
| Display / títulos            | Inter                              |
| Cuerpo                       | Public Sans                        |
| Labels / eyebrows / captions | Public Sans (uppercase + tracking) |

---

## Tono de copy

Cálido, claro, sin jerga médica ni espiritual densa. Frases cortas. Aclarar siempre que esto acompaña, no reemplaza, tratamiento médico. Nombrar las cosas por lo que la persona reconoce ("una sesión de una hora", no "protocolo terapéutico").

---

## Estructura del recorrido

1. **Hero** — nombre, frase de esencia, CTA a sesiones
2. **Servicios** — "Dos maneras de reencontrarte" (cards Soundhealing/Reiki en vidrio + cierre grupal con incienso)
3. **Frase** — banda con cita de Magali (foto pendiente: `fondoFrase.webp` 1920×640)
4. **Testimonios** — placeholder
5. **Contacto** — placeholder (WhatsApp / Instagram)
6. **Footer** — pendiente (disclaimer médico, redes)

---

## Lenguaje de movimiento

- **Scroll mantecoso** (Lenis) + transición seamless hero→sesiones con scrub (sin cortes secos)
- **Animación ambiental lenta** — brasa del incienso en ciclo de 4s, humo continuo, nunca distractivo
- **Isla de navegación** fija que se oculta bajando y reaparece subiendo (con blur)
- **Incienso vivo** en canvas: se consume en ciclo de 8 min, respeta reduced-motion y pausa offscreen
- **Reduced motion respetado**

---

## Licencia

Proyecto privado — todos los derechos reservados.
