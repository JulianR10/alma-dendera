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
  if (window.__almaLenis) return window.__almaLenis;
  if (prefersReducedMotion()) return null;

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
