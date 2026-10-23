import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Desenfoque solo en el título: en texto corrido es caro y no suma.
function reveal(el: HTMLElement, delay: number, blur = false): void {
  if (prefersReducedMotion()) {
    gsap.set(el, { clearProps: 'transform,opacity' });
    return;
  }
  gsap.fromTo(
    el,
    { y: 16, opacity: 0, filter: blur ? 'blur(6px)' : 'blur(0px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
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

define('contact-title', (el) => reveal(el, 0, true));
define('contact-copy', (el) => reveal(el, 0.06));
define('contact-actions', (el) => reveal(el, 0.12));
define('contact-meta', (el) => reveal(el, 0.16));
