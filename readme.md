# Alma Dendera

Soundhealing, vibroacústica y reiki — sitio web one-page con narrativa de scroll.

---

## Stack técnico


| Capa        | Herramienta                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| Framework   | [Astro](https://astro.build) (SSG — genera HTML estático en build)                  |
| Animaciones | [GSAP](https://gsap.com) v3 (incluye ScrollTrigger, no requiere instalación aparte) |
| Tipografía  | Google Fonts — DM Sans, Public Sans, IBM Plex Mono                                  |


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
│   │   ├── Hero.astro
│   │   ├── HeroCanvas.astro
│   │   ├── MusicToggle.astro
│   │   ├── ResonanceColumn.astro
│   │   ├── ScrollIndicator.astro
│   │   ├── Comprension.astro
│   │   ├── Beneficios.astro
│   │   ├── Servicios.astro
│   │   ├── SobreElla.astro
│   │   ├── Contacto.astro
│   │   └── Footer.astro
│   ├── lib/                   # lógica TypeScript pura
│   │   ├── animations/        # sistema de animaciones desacoplado
│   │   │   ├── registry.ts    # mapea data-animate → función GSAP
│   │   │   ├── hero.ts        # entrance + ambient del hero
│   │   │   ├── sections.ts    # animaciones de secciones
│   │   │   ├── resonance.ts   # scroll progresión columna
│   │   │   └── reducedMotion.ts
│   │   ├── audio/
│   │   │   └── controller.ts  # clase AudioController
│   │   ├── canvas/
│   │   │   └── concentricWaves.ts  # renderer del canvas hero
│   │   └── types.ts
│   ├── pages/
│   │   └── index.astro        # compone todos los componentes
│   └── styles/
│       └── global.css         # reset, variables, reduced motion
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

**Elemento firma:** una *columna de resonancia* — línea vertical fina con forma de onda que corre por el costado de la página y se completa con el scroll. Tres waypoints (llegada, comprensión, conexión) se iluminan al llegar a cada etapa. En mobile se convierte en barra de progresión horizontal superior.

---

## Servicios

### Soundhealing

Terapia de sonido que utiliza **cuencos tibetanos**, **cuencos de cuarzo**, **samafones** y **semillas somáticas** para sincronizar las ondas cerebrales con frecuencias de relajación, activar el nervio vago y regular el sistema nervioso.

### Terapia Vibroacústica

Modalidad que transmite frecuencias sonoras específicas (20–120 Hz) a través de un mat o almohada vibroacústica en contacto directo con el cuerpo, combinado con un baño sonoro con instrumentos.

### Reiki

Técnica japonesa de imposición de manos que canaliza energía vital (ki) para restablecer el flujo energético del cuerpo, la mente y el espíritu. Puede realizarse presencial o a distancia.

---

## Paleta de color


| Uso                      | Color                 | Hex       |
| ------------------------ | --------------------- | --------- |
| Fondo principal          | Negro cálido          | `#2B2B2B` |
| Fondo alternativo        | Hueso cálido          | `#F5F2EC` |
| Acento principal         | Azul petróleo (marca) | `#6DA1AE` |
| Acento claro             | Azul petróleo claro   | `#7F99A7` |
| Acento oscuro            | Azul petróleo oscuro  | `#394A53` |
| Acento secundario        | Ciruela apagado       | `#80617D` |
| Detalle / texto s/oscuro | Beige grisáceo        | `#D8D2C4` |


Las secciones alternan entre fondo oscuro y hueso claro — ese cambio de tono es parte de la narrativa (de la introspección a la claridad).

---

## Tipografía


| Rol                          | Fuente        |
| ---------------------------- | ------------- |
| Display / títulos            | DM Sans       |
| Cuerpo                       | Public Sans   |
| Labels / eyebrows / captions | IBM Plex Mono |


---

## Tono de copy

Cálido, claro, sin jerga médica ni espiritual densa. Frases cortas. Aclarar siempre que esto acompaña, no reemplaza, tratamiento médico. Nombrar las cosas por lo que la persona reconoce ("una sesión de una hora", no "protocolo terapéutico").

---

## Estructura del recorrido

1. **Hero** — nombre, frase de esencia, ondas concéntricas respirando
2. **Comprensión** — qué es el soundhealing, en lenguaje simple
3. **Beneficios** — grid visual 3×3, íconos
4. **Servicios** — Encuentro Sonoro (soundhealing + vibroacústica integrada) / Reiki
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