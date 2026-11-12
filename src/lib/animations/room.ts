import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

function reveal(el: HTMLElement, delay: number): void {
  if (prefersReducedMotion()) {
    gsap.set(el, { clearProps: 'transform,opacity' });
    return;
  }
  gsap.fromTo(
    el,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    },
  );
}

function siblingDelay(el: HTMLElement, step: number): number {
  const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el];
  return Math.max(0, siblings.indexOf(el)) * step;
}

// Cada aro se enciende al llegar a él y el tramo de línea anterior se dibuja (CSS, vía .is-lit).
define('room-steps', (el) => {
  const steps = Array.from(el.querySelectorAll<HTMLElement>('.room__step'));
  if (prefersReducedMotion()) {
    steps.forEach((step) => step.classList.add('is-lit'));
    return;
  }
  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 65%',
      onEnter: () => step.classList.add('is-lit'),
      onLeaveBack: () => step.classList.remove('is-lit'),
    });
  });
});
define('room-copy', (el) => reveal(el, 0));
define('room-step', (el) => reveal(el, siblingDelay(el, 0.1)));
define('room-media', (el) => reveal(el, 0));
