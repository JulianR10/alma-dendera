import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

function fadeUp(el: HTMLElement, delay: number): void {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    el,
    { y: 14, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
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

define('sessions-title', (el) => {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, filter: 'blur(0px)', y: 0 });
    return;
  }
  const text = el.textContent ?? '';
  if (text.length === 0) return;
  el.textContent = '';
  el.setAttribute('aria-label', text);
  for (const char of text) {
    const span = document.createElement('span');
    span.className = 'sessions__title-char';
    span.textContent = char;
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
  }
  const chars = el.querySelectorAll<HTMLElement>('.sessions__title-char');
  gsap.fromTo(
    chars,
    { y: 8, opacity: 0, filter: 'blur(6px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power2.out',
      stagger: { each: 0.06, from: 'center' },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    },
  );
});
define('sessions-cta', (el) => fadeUp(el, 0.06));

const SOUND_LINE_STAGGER = 0.08;

function revealImage(el: HTMLElement): void {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1 });
    return;
  }
  gsap.set(el, { force3D: true });
  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );
  if (window.matchMedia('(max-width: 768px)').matches) return;
  gsap.fromTo(
    el,
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('article') ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  );
}

function revealBody(el: HTMLElement): void {
  if (prefersReducedMotion()) return;
  const lines = Array.from(el.children) as HTMLElement[];
  gsap.fromTo(
    lines,
    { y: 14, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
      stagger: SOUND_LINE_STAGGER,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );
}

define('sound-img', revealImage);
define('sound-body', revealBody);
define('reki-img', revealImage);
define('reki-body', revealBody);
define('gather-img', revealImage);
define('gather-body', revealBody);
