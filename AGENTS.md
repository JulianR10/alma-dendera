# Alma Dendera — AGENTS

Única fuente de verdad. Fusiona base universal + específico del proyecto. Si hay conflicto, manda lo específico.

## Filosofía
Código senior, simple, mantenible. Sin parches (`!important`/`any`/`setTimeout` para esperar). Claridad > cleverness. No dar por terminado sin verificar que nada se rompió.

## Stack
Astro SSG, GSAP v3 + ScrollTrigger, TypeScript strict. `lint`/`format`/`build` deben pasar limpios.

## Convenciones código

| Área | Regla |
|---|---|
| **Separación** | `.astro` solo HTML + `data-animate`. Lógica en `src/lib/*.ts`. `<script>` solo importa e inicializa. |
| **Animaciones** | `data-animate="nombre"` — nunca ID/clase. `define(nombre, fn)` en `registry.ts`, `init()` después. `(el)=>gsap.fromTo(el,…)` |
| **Canvas/Audio** | `src/lib/canvas/` → `init(canvas)` · `src/lib/audio/` → clase con IDs por constructor |
| **TS** | Strict, sin `any` ni `{}` |
| **HTML/CSS** | Sin `!important` ni `style=""` (salvo var CSS runtime). Semántico (`nav/main/section/button`). Kebab para clases/IDs/data, Pascal para `.astro`. Sin anidado >3 niveles. Mobile-first, breakpoints token `--bp-md`. |
| **JS** | Mínimo indispensable (evaluar `<details>`, `:has()`, validación nativa antes). Islands estricto `client:load/visible/idle`, nunca global. Sin código muerto/`console.log`/`TODO` sin explicar. Nombres en inglés descriptivos. Comentarios solo si no es obvio. |
| **Componentes** | Responsabilidad única, props tipadas. Si se repite 2× → componente. No "todo terreno" con 15 props. |

## Estructura
```
public/audio/ambiente.mp3
src/components/ Hero (logo+h1, magaFondo, eyebrow stagger), MusicToggle, ResonanceColumn, ScrollIndicator, Section (.astro)
src/images/ logo.webp, MagaFondo.webp (780×1040, bottom-right)
src/lib/animations/registry, hero (logo+maga+eyebrow), resonance, reducedMotion | audio/controller (analyser→halo) | waves/liveWave (retirado hero) | types
src/pages/index.astro · src/styles/global.css (radial #6DA1AE→#487783, halo-breathing, maga mask)
```

## Estado
**Hecho:** Hero final v1 — fondo radial `#6DA1AE→#487783` + grain, logo `h1` 218px (Cinzel reemplazado por marca), halo anillos 12s/16s, MagaFondo abajo-der con mask+filter (`saturate 0.92`), eyebrow stagger `Soundhealing·Vibro·Reiki` con dots pulsantes, tagline "Un respiro para volver a vos", música con analyser, divider cresta onda, `100dvh+svh+safe-area`, un `h1` único. Registry `data-animate`, audio controller, `liveWave` desacoplado del hero (queda en lib).
**Falta (orden):** 1 Servicios (Soundhealing/Vibro/Reiki) 2 Beneficios grid 3 Sobre ella 4 Testimonios 5 Contacto (WA/IG) 6 Footer disclaimer.

## Diseño
**Paleta:** Hero `#6DA1AE` / Alternativo `#F5F2EC` / Tinta `#2B2B2B` / Acento `#536B78` `#7F99A7` `#394A53` / Ciruela `#80617D` / Beige `#D8D2C4` — secciones alternan teal/hueso, AA sobre teal.
**Tipo:** Cinzel (display), Public Sans (cuerpo), IBM Plex Mono (labels). **Copy:** cálido, frases cortas, sin jerga, aclara "acompaña no reemplaza tratamiento".
**Recorrido scroll:** Hero → Comprensión → Servicios → Beneficios → Sobre ella → Testimonios → Contacto → Footer.
**Movimiento:** Transición cresta onda SVG, ambient 6s loop no distractivo, solo columna progresa, un momento de riesgo, `prefers-reduced-motion`.

**Columna resonancia:** Nav lateral SVG wave + 4 waypoints (Hero/Comprensión/Servicios/Contacto). Progreso discreto (carga en Hero, avanza/retrocede 0.5s por sección, no pasa último). Mobile `<--bp-md` horizontal arriba. Waypoints clickeables. `ScrollTrigger onEnter/onLeaveBack`.
**Naming:** Componentes PascalCase, módulos camelCase, data/clases/IDs kebab (`data-animate="hero-title"`).

## Mobile / iOS
`100dvh`+`100vh`/`svh`/`lvh` (nunca `100vh` solo). `overscroll-behavior: none/contain`. Todo iPhone es WebKit → probar en Safari real. `position:fixed` verificar con teclado. Inputs ≥16px (evita zoom). `env(safe-area-inset-*)`, tap ≥44×44px.

## SEO
**Clásico:** `title`+`description` únicos, un `h1` con jerarquía correcta, URLs limpias, OG/Twitter, `alt`/`alt=""`, `sitemap.xml`+`robots.txt`, JSON-LD (FAQ/HowTo/Article/Organization), canónicas.
**IA/AEO:** Responder preguntas concretas (Q&A), schema `FAQPage/HowTo/Article/Organization` para citación IA, datos concretos + autoría, complementa no reemplaza SEO clásico.

## Imágenes/Recursos — Performance — a11y
**Imgs:** WebP/AVIF, `loading=lazy` fuera de fold, `width/height` (CLS), comprimir, `srcset` si amerita.
**Perf:** INP≤200ms LCP≤2.5s CLS<0.1 · JS no bloqueante, `font-display:swap`, code splitting, medir Lighthouse/CrUX.
**a11y:** Contraste AA, teclado + focus visible (no `outline:none` sin reemplazo), labels en inputs, ARIA solo si semántica no alcanza.

## Formularios · Estados UI · Testing · Seguridad · Legal · Config
**Forms:** Validación realtime, `autocomplete` correcto, no perder datos, errores claros.
**UI:** Todo async con carga/vacío/error + feedback visual (nunca blanco/spinner infinito).
**Testing:** Chrome/Safari/Firefox + mobile real (no solo resize).
**Seguridad:** Sin secrets en cliente, sanitizar inputs (XSS), validar cliente+servidor, deps sin vulns.
**Legal UE:** GDPR banner bloquea tracking hasta consentimiento + privacidad enlazada.
**Analytics:** Diferido con consentimiento, no duplicar tags (un GTM).
**Config:** Env por ambiente, `.env.example`, sin hardcodear URLs.
**Favicon/PWA:** Set completo + `manifest.json`.
**Git:** Commits atómicos descriptivos, sin `node_modules/.env/dist` (`.gitignore`).
