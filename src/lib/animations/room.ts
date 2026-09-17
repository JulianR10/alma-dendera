import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

function reveal(el: HTMLElement, delay: number, blur: boolean): void {
  if (prefersReducedMotion()) {
    gsap.set(el, { clearProps: 'transform,opacity,filter' });
    return;
  }
  gsap.fromTo(
    el,
    { y: 20, opacity: 0, filter: blur ? 'blur(8px)' : 'blur(0px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
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

define('room-title', (el) => reveal(el, 0, true));
define('room-copy', (el) => reveal(el, 0, false));
define('room-step', (el) => reveal(el, siblingDelay(el, 0.1), false));
define('room-media', (el) => reveal(el, 0, false));
