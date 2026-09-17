# Alma Dendera

Soundhealing, vibroacústica y reiki — sitio web one-page con narrativa de scroll.

---

## Stack técnico

| Capa        | Herramienta                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| Framework   | [Astro](https://astro.build) (SSG — genera HTML estático en build)                          |
| Animaciones | [GSAP](https://gsap.com) v3 (incluye ScrollTrigger, no requiere instalación aparte)         |
| Scroll      | [Lenis](https://lenis.darkroom.engineering) (smooth scroll, sincronizado con ScrollTrigger) |
| Tipografía  | Google Fonts — Cinzel, Cormorant Garamond, Public Sans                                      |

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
│   │   ├── Hero.astro           # hero: maga cover, nav, rail, tagline, CTA, menú mobile
│   │   ├── Sessions.astro       # servicios: título, cards Soundhealing/Reiki, cierre grupal
│   │   ├── EnLaSala.astro       # "¿Cómo es una sesión?": los 4 pasos sobre la banda beige
│   │   ├── SobreMi.astro        # "Soy Magalí": silueta + aros de resonancia
│   │   ├── QuoteBand.astro      # banda de frase (Magalí) con slot para foto de fondo
│   │   ├── Contacto.astro       # WhatsApp, Instagram y ubicación
│   │   ├── Footer.astro         # marca, navegación completa, redes y disclaimer
│   │   ├── WhatsAppFloat.astro  # acceso persistente a WhatsApp
│   │   ├── Incense.astro        # canvas de incienso (vive en el cierre grupal)
│   │   ├── MusicToggle.astro
│   │   └── ResonanceColumn.astro # rail de progreso fijo (se oculta bajando, vuelve subiendo)
│   ├── lib/                   # lógica TypeScript pura
│   │   ├── animations/        # sistema de animaciones desacoplado
│   │   │   ├── registry.ts    # mapea data-animate → función GSAP
│   │   │   ├── hero.ts        # entrance + ambient del hero
│   │   │   ├── heroSessions.ts # transición seamless hero→sesiones (scrub)
│   │   │   ├── about.ts       # aros, figura, título y copy de Sobre mí
│   │   │   ├── aboutRipplesCursor.ts # los aros siguen el cursor
│   │   │   ├── room.ts        # revelado de En la sala
│   │   │   ├── sessions.ts    # revelado de cards
│   │   │   ├── quote.ts       # entrada de la banda de frase
│   │   │   ├── contact.ts     # entrada de Contacto
│   │   │   ├── resonance.ts   # rail + progreso por secciones
│   │   │   └── reducedMotion.ts
│   │   ├── audio/
│   │   │   └── controller.ts  # clase AudioController
│   │   ├── canvas/
│   │   │   └── incense.ts     # humo, brasa, cuenco y ciclo de consumo (8 min)
│   │   ├── scroll/
│   │   │   └── smooth.ts      # init Lenis + anchors suaves
│   │   ├── navigation.ts      # NAV_LINKS (menú) + SECTION_WAYPOINTS (rail)
│   │   ├── site.ts            # datos del negocio y links de WhatsApp/Instagram
│   │   └── spotlight.ts       # brillo que sigue al cursor en los CTA
│   ├── images/                # logo, fondoMaga2, silueta, instrumentos, fondos, firma
│   ├── pages/
│   │   └── index.astro        # compone todos los componentes
│   └── styles/
│       ├── global.css         # imports de fuentes y hojas + reduced motion
│       ├── tokens.css         # paleta, fuentes, radios, espaciados, layout
│       ├── base.css           # reset + píldora CTA compartida
│       ├── hero.css
│       ├── sessions.css       # cards vidrio esmerilado
│       ├── en-la-sala.css     # banda beige + grilla de pasos
│       ├── sobre-mi.css
│       ├── quote-band.css
│       ├── contacto.css
│       ├── footer.css
│       ├── incense.css
│       ├── music-toggle.css
│       ├── resonance.css
│       └── whatsapp-float.css
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

**Elemento firma:** una _columna de resonancia_ — rail de progreso que marca los cinco capítulos del scroll (Inicio, Sesiones, En la sala, Sobre mí, Contacto). Se oculta al bajar y reaparece al subir con desenfoque, y los waypoints son clickeables. En mobile aparece recién pasado el hero, alineado a la izquierda y solo con puntos.

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

> **Esta tabla es la fuente de verdad de la marca.** Los tokens viven en `src/styles/tokens.css`; si cambiás un hex, actualizá esta tabla.

| Rol                   | Token                   | Hex                                                                 | Uso                                                     |
| --------------------- | ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| **Principal oscuro**  | `--color-primary`       | `#69492B` · ![#69492B](https://img.shields.io/badge/-69492B-69492B) | Títulos, bordes, botones outline y texto de enlaces     |
| **Principal claro**   | `--color-primary-light` | `#FAE8CA` · ![#FAE8CA](https://img.shields.io/badge/-FAE8CA-FAE8CA) | Superficie de hero, sesiones, en la sala, sobre mí y contacto |
| Arena               | `--color-primary-sand`  | `#F2DEBC` · ![#F2DEBC](https://img.shields.io/badge/-F2DEBC-F2DEBC) | Solo fondo de contacto (apenas más oscuro, con trama) |
| Variación extra clara | `--color-primary-soft`  | `#FEFBF5` · ![#FEFBF5](https://img.shields.io/badge/-FEFBF5-FEFBF5) | Texto sobre superficies oscuras y tarjeta de En la sala |
| Variación papel       | `--color-paper`         | `#F5F2EC` · ![#F5F2EC](https://img.shields.io/badge/-F5F2EC-F5F2EC) | Fondo base del body                                     |
| Variación tinta       | `--color-ink`           | `#2B2B2B` · ![#2B2B2B](https://img.shields.io/badge/-2B2B2B-2B2B2B) | Texto principal sobre claro                             |
| Oscuro cálido (noche) | `--color-deep`          | `#2D2517` · ![#2D2517](https://img.shields.io/badge/-2D2517-2D2517) | Banda de frase, footer y tarjeta de encuentros          |
| Noche (hover)         | `--color-deep-hover`    | `#1E1A11` · ![#1E1A11](https://img.shields.io/badge/-1E1A11-1E1A11) | Estado hover de los botones sólidos                     |
| Ciruela               | `--color-plum`          | `#7B5D78` · ![#7B5D78](https://img.shields.io/badge/-7B5D78-7B5D78) | Numeración de pasos y labels chicos                     |

### Ritmo de fondos

Las secciones alternan superficie para leerse como capítulos: **cálido** `#FAE8CA` (hero, sesiones, en la sala, sobre mí, contacto) → **noche** `#2D2517` (frase y footer). Contacto usa el arena `#F2DEBC`, apenas más oscuro, con la trama de puntos. "En la sala" comparte el cálido de sesiones y el corte lo marca su tarjeta hueso.

### Notas de implementación

- `main` usa `--color-primary-light`, o sea el mismo cálido de sesiones: es el fondo que asoma alrededor de la tarjeta hueso de En la sala (el resto de las secciones pinta su propio fondo).
- `--color-plum` está un 2% por debajo del `#80617D` original a propósito: ese valor daba **4.45:1** sobre la crema y quedaba fuera de AA por cinco centésimas. Los labels chicos (12px uppercase) ahora dan 4.75:1.
- `--color-overlay-nav` (el vidrio del rail de progreso) está al **72%** de opacidad: con menos, el texto hueso del rail caía a 2.1:1 sobre las secciones claras.

### Profundidad sobre los fondos planos

Los fondos son planos a propósito. El recurso de textura es la **trama de puntos** de Contacto (`.contacto::before`, mosaico SVG tono-sobre-tono sobre el cálido). (Las manchas radiales `.ambient-light` se retiraron: metían halos blancos que cortaban las secciones; la clase queda como ancla sin efecto. La onda de crema de la frase también se retiró.)

---

## Tipografía

| Rol                          | Fuente                             |
| ---------------------------- | ---------------------------------- |
| Display / títulos            | Cinzel 400                         |
| Frase de Magalí (en cursiva) | Cormorant Garamond italic 300      |
| Cuerpo                       | Public Sans 300 / 400 / 500        |
| Labels / eyebrows / captions | Public Sans (uppercase + tracking) |

> Cinzel no tiene itálica real, por eso la frase de la banda usa Cormorant Garamond: mantiene la cursiva que pide el diseño sin recurrir a una oblicua sintética.
> Las familias se cargan con `@import` de Google Fonts en `global.css`, solo con los pesos que se usan.

---

## Tono de copy

Cálido, claro, sin jerga médica ni espiritual densa. Frases cortas. Aclarar siempre que esto acompaña, no reemplaza, tratamiento médico. Nombrar las cosas por lo que la persona reconoce ("una sesión de una hora", no "protocolo terapéutico").

---

## Estructura del recorrido

1. **Hero** — nombre, frase de esencia, CTA a sesiones
2. **Servicios** — "Dos maneras de volver a vos" (cards Soundhealing/Reiki en vidrio + cierre grupal con incienso)
3. **En la sala** — "¿Cómo es una sesión?" en 4 pasos
4. **Frase** — banda con cita de Magalí
5. **Sobre mí** — "Soy Magalí", con la silueta montada sobre esa onda
6. **Contacto** — WhatsApp, Instagram y ubicación
7. **Footer** — marca, redes, disclaimer médico y crédito linkeado

---

## Lenguaje de movimiento

- **Scroll mantecoso** (Lenis) + transición seamless hero→sesiones con scrub (sin cortes secos)
- **Animación ambiental lenta** — brasa del incienso en ciclo de 8 min, humo continuo, nunca distractivo
- **Isla de navegación** fija que se oculta bajando y reaparece subiendo (con blur)
- **Incienso vivo** en canvas: se consume en ciclo de 8 min, respeta reduced-motion y pausa offscreen
- **Reduced motion respetado**

---

## Licencia

Proyecto privado — todos los derechos reservados.
