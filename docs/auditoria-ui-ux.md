# Auditoría UI/UX — Alma Dendera

Fecha: 2026-09-19. Método: `hallmark audit` (anti-patrones + fingerprint estructural) + revisión de código (tokens, animaciones, accesibilidad, SEO, performance).

## Pre-flight

- Astro SSG · GSAP + ScrollTrigger + Lenis · TypeScript strict.
- Tipografías: Cinzel (títulos) + Cormorant itálica (frase) + Public Sans (cuerpo).
- Tokens propios en `src/styles/tokens.css`. Sin `design.md`.
- Recorrido: Hero → Sesiones → En la sala → Frase → Sobre mí → Contacto → Footer.

## Estructura: pasa

Variedad real entre secciones (hero foto a la izquierda, cards con cuerpo a la derecha, card hueso con onda, banda noche, contacto arena, footer centrado). No es el template hero-centrado → 3 cards → CTA → footer.

## Hallazgos críticos: 0

Sin gradientes púrpura, sin Inter-everywhere, sin AI nav/footer, LCP con `eager` + `fetchpriority="high"`, audio sin autoplay, copy real sin métricas inventadas.

## Hallazgos major (5)

| # | Tell / tema | Dónde | Fix propuesto |
|---|-------------|-------|---------------|
| 1 | Universal scroll-triggered fade-up (~20 `data-animate`) | `index.astro`, `Sessions.astro`, `EnLaSala.astro`, `Contacto.astro` | Conservar entradas solo en hero + títulos + typewriter; resto estático |
| 2 | Glassmorphism without purpose | `sessions.css` (cards `blur(16px)` sobre fondo plano) | Fondo sólido + borde; blur solo sobre foto |
| 3 | Gradient headline | `session-dialog.css` (título con `background-clip:text`) | Ink sólido `var(--color-primary)` |
| 4 | Mid-render token improvisation | `rgba(...)` literales en 6 CSS | Escala alfa en tokens (`--coffee-12`, `--plum-22`, …) |
| 5 | Sin `sitemap.xml` / `robots.txt` / canonical | `public/`, `index.astro` `<head>` | Agregar los 3 |

## Hallazgos minor (4)

| # | Tema | Dónde | Fix propuesto |
|---|------|-------|---------------|
| 1 | Side-stripe card (nota del popup) | `session-dialog.css` | Borde hairline parejo |
| 2 | `z-index: 9999` (grano) | `base.css` | Escala nombrada (ej. 60) |
| 3 | CTA sin `nowrap` (riesgo de corte a 320px) | `base.css` `.cta` | `white-space:nowrap` + verificar |
| 4 | Audio `preload="auto"` | `Hero.astro` | `preload="none"` |

## Bien verificado

- Diálogo nativo con foco, Esc, click-fuera y scroll interno (`data-lenis-prevent`).
- Targets ≥ 44px, `focus-visible` en todo, `prefers-reduced-motion` respetado.
- Jerarquía `h1→h2`, JSON-LD + OG presentes.
- Sin JS el typewriter muestra el texto completo (split en runtime).

## Mejoras aplicadas (historial de sesión)

1. Popups: scroll interno reparado + decorados de fondo eliminados + ancho 90% en mobile + nota centrada.
2. Contacto y "Soy Magalí": padding simétrico igualado en mobile (`space-3xl`).
3. Footer: disclaimer eliminado, layout a columna única centrada.
4. Frase con typewriter letra a letra al entrar (~4s) + cursor, con `aria-label` y reduced-motion.
5. Ritmo mobile: aire entre secciones subido un escalón; hueco sobre "En la sala" igualado; cards al `gutter`.
6. CTA con exclamaciones (¡…!).
7. Isla de resonancia oculta en mobile (solo hamburguesa).
8. Menú burger: bloqueo de scroll en `html` + `body` (iOS) y `overscroll-behavior: contain` en el panel.
9. `siluetaSentada.webp` reexportada a 600×1200 (2x del peor caso mobile 300px).

## Pendiente (tandas propuestas)

- **A (look)**: majors 2, 3 + minor 1.
- **B (movimiento)**: major 1.
- **C (sistema/SEO)**: major 4, 5 + minors 2, 3, 4.
