# Alma Dendera — AGENTS

Única fuente de verdad. Fusiona base universal + específico del proyecto. Si hay conflicto, manda lo específico.

## Filosofía

Código senior, simple, mantenible. Sin parches (`!important`/`any`/`setTimeout` para esperar). Claridad > cleverness. No dar por terminado sin verificar que nada se rompió.

## Stack

Astro SSG, GSAP v3 + ScrollTrigger, Lenis (smooth scroll), TypeScript strict. `lint`/`format`/`build` deben pasar limpios. `tsc --noEmit` sin errores.

## Convenciones código

| Área             | Regla                                                                                                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Separación**   | `.astro` solo HTML + `data-animate`. Lógica en `src/lib/*.ts`. `<script>` solo importa e inicializa.                                                                                                                                                            |
| **Animaciones**  | `data-animate="nombre"` — nunca ID/clase. `define(nombre, fn)` en `registry.ts`, `init()` después. `(el)=>gsap.fromTo(el,…)`                                                                                                                                    |
| **Canvas/Audio** | `src/lib/canvas/` → `init(canvas)` · `src/lib/audio/` → clase con IDs por constructor                                                                                                                                                                           |
| **TS**           | Strict, sin `any` ni `{}`                                                                                                                                                                                                                                       |
| **HTML/CSS**     | Sin `!important` ni `style=""` (salvo var CSS runtime). Semántico (`nav/main/section/button`). Kebab para clases/IDs/data, Pascal para `.astro`. Sin anidado >3 niveles. Mobile-first, breakpoints token `--bp-md`.                                             |
| **JS**           | Mínimo indispensable (evaluar `<details>`, `:has()`, validación nativa antes). Islands estricto `client:load/visible/idle`, nunca global. Sin código muerto/`console.log`/`TODO` sin explicar. Nombres en inglés descriptivos. Comentarios solo si no es obvio. |
| **Componentes**  | Responsabilidad única, props tipadas. Si se repite 2× → componente. No "todo terreno" con 15 props.                                                                                                                                                             |

## Estructura

```
public/audio/ambiente.mp3
src/components/ Hero, SobreMi, Sessions, QuoteBand, Contacto, Incense, MusicToggle, ResonanceColumn
src/images/ logo.webp, fondoMaga2.webp, fondoSoundhealing.webp, fondoReiki.webp, silueta.webp, instrumentos.webp, sound.webp, magaEncuentros.webp
src/lib/animations/registry, hero, heroSessions, about, sessions, quote, contact, resonance, reducedMotion | audio/controller | canvas/incense | scroll/smooth + spotlight, navigation, site
src/pages/index.astro · src/styles/global.css + tokens/base/hero/sobre-mi/sessions/quote-band/contacto/incense/music-toggle/resonance
```

## Estado

**Hecho:** Hero (fondoMaga2 `cover`, nav + MusicToggle, tagline + eyebrow + CTA a #sesiones, menú mobile). Transición hero→sesiones seamless con Lenis + scrub (parallax maga/center/logo, rise de header y cards, sin hueco). Servicios "Dos maneras de reencontrarte" (título Inter 200): cards Soundhealing/Reiki en vidrio esmerilado (`backdrop-filter`) con copy corto voseo, cierre "Encuentros grupales" + Incense canvas a su derecha (varilla diagonal 12° sobre cuenco, humo topo, ciclo 8 min, top-fade, static/reduced-motion, pausa offscreen). SobreMi "Soy Magali" (`silueta.webp` + 4 aros `about__ripples` anclados al pie con `bottom:0` + `translate(-50%,20.5%)`, 100% visibles con `margin-bottom` reservado; onda ancha `about__field` eliminada por decisión). QuoteBand (frase Magali 2 líneas cursiva + firma, slot `imageSrc` listo para `fondoFrase.webp` 1920×640). Isla nav `.resonance--nav` (se oculta bajando 200px, reaparece subiendo con blur; el fade del hero apunta a `.hero__logo-wrap` para no taparla). Nota legal eliminada por decisión. Deploy GitHub Pages (`site` + `base:/alma-dendera/`, workflow `deploy.yml` en cada push a `main`). Terapeuta: **Magali · CABA**.
**Falta (orden):** 1 Beneficios grid 2 Sobre ella 3 Testimonios 4 Contacto (WA/IG) 5 Footer disclaimer.

## Checklist validación (auto — antes de dar por hecho)

Antes de marcar cualquier entrega como hecha, verificar sin que lo pidas:

- [ ] Contenedores: 1 por responsabilidad, sin `div` envolventes extra (`section.hero > img + nav + div.center + svg + audio`)
- [ ] Semántica: un solo `h1`, estructura `h1>a>img`, `nav[aria-label]`, `aria-*` en toggle, sin `h1>a` invertido
- [ ] Layout: `hero` en `grid` (`auto auto` + `gap clamp(20px,5vh,40px)`), `center` `width:50vw` `margin:0 0 0 6vw` (no `top:vh` absoluto), `safe-area-inset-*` + `viewport-fit=cover`, alturas `100vh→100svh→100dvh` (dvh último), `clamp()` siempre con min<max
- [ ] Estilo: sin `!important`/`any`/`setTimeout`/`console.log`, sin código muerto, sin `halo` (eliminado), sin `flow`, sin `mask` azul, sin `about-field` (eliminado)
- [ ] Build: `npm run build` + `lint/format` limpios, `grep` sin `TODO`/`magaFondo` residual

## Diseño

**Paleta:** Hero `#6DA1AE` / Alternativo `#F5F2EC` / Tinta `#2B2B2B` / Acento `#536B78` `#7F99A7` `#394A53` / Ciruela `#80617D` / Beige `#D8D2C4` — secciones alternan teal/hueso, AA sobre teal.
**Tipo:** Cinzel (display), Public Sans (cuerpo), IBM Plex Mono (labels). **Copy:** cálido, frases cortas, sin jerga, aclara "acompaña no reemplaza tratamiento".
**Recorrido scroll:** Hero → En la sala → Beneficios → Sobre ella → Testimonios → Contacto → Footer.
**Movimiento:** Transición cresta onda SVG, ambient 6s loop no distractivo, solo columna progresa, un momento de riesgo, `prefers-reduced-motion`.

**Columna resonancia:** Nav lateral SVG wave + 3 waypoints (Hero / En la sala / Contacto). Progreso discreto (carga en Hero, avanza/retrocede 0.5s por sección, no pasa último). Mobile `<--bp-md` horizontal arriba. Waypoints clickeables. `ScrollTrigger onEnter/onLeaveBack`.
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
