import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../animations/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __almaLenis?: Lenis;
  }
}

let viewportRefreshBound = false;

function bindViewportRefresh(): void {
  if (viewportRefreshBound) return;
  viewportRefreshBound = true;
  let queued = false;
  // Solo el cambio de ANCHO invalida los triggers: en mobile la barra del
  // navegador dispara resize al mostrarse/ocultarse y refrescar ahí produce saltos.
  let lastWidth = window.innerWidth;
  const queueRefresh = (): void => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      ScrollTrigger.refresh();
    });
  };
  window.addEventListener('resize', queueRefresh);
  window.addEventListener('orientationchange', queueRefresh);
}

function bindAnchors(lenis: Lenis): void {
  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { duration: 1.4 });
    });
  });
}

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;
  bindViewportRefresh();
  if (window.__almaLenis) return window.__almaLenis;
  if (prefersReducedMotion()) return null;
  // En táctil el scroll nativo con momentum es más estable: Lenis + scrub
  // producía saltos en Safari/Chrome mobile.
  if (window.matchMedia('(pointer: coarse), (max-width: 768px)').matches) return null;

  const lenis = new Lenis({ lerp: 0.1 });
  window.__almaLenis = lenis;

  document.documentElement.style.scrollBehavior = 'auto';

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  bindAnchors(lenis);

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  return lenis;
}
