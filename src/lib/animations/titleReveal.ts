import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Cada palabra sube desde una máscara: el título se "escribe" sin depender del salto de línea.
define('title-reveal', (el) => {
  if (prefersReducedMotion()) return;
  const text = el.textContent?.trim() ?? '';
  if (text.length === 0) return;

  el.textContent = '';
  el.setAttribute('aria-label', text);
  const words = text.split(/\s+/).map((word, index, all) => {
    const mask = document.createElement('span');
    mask.className = 'title-reveal__mask';
    mask.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'title-reveal__word';
    inner.textContent = word;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (index < all.length - 1) el.appendChild(document.createTextNode(' '));
    return inner;
  });

  gsap.fromTo(
    words,
    { yPercent: 110, rotate: 3 },
    {
      yPercent: 0,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    },
  );
});
