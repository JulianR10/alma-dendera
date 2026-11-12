import gsap from 'gsap';
import { prefersReducedMotion } from '../animations/reducedMotion';

const INTERACTIVE = 'a, button, [data-spotlight], summary';

// Aro de resonancia que acompaña al puntero (desktop). El cursor nativo se mantiene.
export function initCursor(): void {
  const ring = document.querySelector<HTMLElement>('.cursor');
  if (!ring) return;
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    ring.remove();
    return;
  }

  gsap.set(ring, { xPercent: -50, yPercent: -50 });
  const moveX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const moveY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

  document.addEventListener('pointermove', (event) => {
    moveX(event.clientX);
    moveY(event.clientY);
    ring.classList.add('is-visible');
  });
  document.addEventListener('pointerover', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    ring.classList.toggle('is-active', Boolean(target?.closest(INTERACTIVE)));
  });
  document.documentElement.addEventListener('pointerleave', () => {
    ring.classList.remove('is-visible');
  });
  document.addEventListener('pointerdown', () => ring.classList.add('is-pressed'));
  document.addEventListener('pointerup', () => ring.classList.remove('is-pressed'));
}
