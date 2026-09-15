import gsap from 'gsap';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

define('hero-logo', (el) => {
  if (prefersReducedMotion()) return;
  gsap.fromTo(
    el,
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power2.out' },
  );
});

define('hero-maga', (el) => {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1 });
    return;
  }
  gsap.fromTo(
    el,
    { opacity: 0, filter: 'blur(10px)' },
    { opacity: 1, filter: 'blur(0px)', duration: 1.4, delay: 0.15, ease: 'power3.out' },
  );
});

define('hero-eyebrow', (el) => {
  if (prefersReducedMotion()) return;

  const items = el.querySelectorAll<HTMLElement>('.hero__eyebrow-item, .hero__eyebrow-dot');
  const targets = items.length > 0 ? items : [el];

  gsap.fromTo(
    targets,
    { y: 8, opacity: 0, filter: 'blur(4px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.65,
      delay: 1.05,
      stagger: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        if (prefersReducedMotion()) return;
        gsap.to(el, {
          opacity: 0.82,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        const dots = el.querySelectorAll<HTMLElement>('.hero__eyebrow-dot');
        if (dots.length > 0) {
          gsap.to(dots, {
            scale: 1.25,
            opacity: 0.3,
            duration: 1.6,
            stagger: 0.35,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        }
      },
    },
  );
});

define('hero-phrase', (el) => {
  if (prefersReducedMotion()) return;
  gsap.fromTo(
    el,
    { y: 12, opacity: 0, filter: 'blur(6px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      delay: 0.78,
      ease: 'power2.out',
      onComplete: () => {
        // Suelta el flattening del padre para que cada letra conserve su propia capa GPU.
        gsap.set(el, { clearProps: 'transform,filter' });
      },
    },
  );
});

const BREATH_DURATION = 4;
const BREATH_LIFT = -7;
const BREATH_SPREAD = 2.4;
const BREATH_STAGGER = 0.15;
const BREATH_REST_OPACITY = 0.94;
// Arranca cuando termina la entrada de hero-phrase (delay 0.78 + duration 1.1).
const BREATH_START_DELAY = 1.9;

define('hero-breath', (el) => {
  if (prefersReducedMotion()) return;
  if (el.querySelector('.hero__breath-char')) return;

  const text = el.textContent ?? '';
  if (text.length === 0) return;
  el.textContent = '';
  el.setAttribute('aria-label', text);

  for (const char of text) {
    const span = document.createElement('span');
    span.className = 'hero__breath-char';
    span.textContent = char;
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
  }

  const chars = el.querySelectorAll<HTMLElement>('.hero__breath-char');
  const center = (chars.length - 1) / 2;

  gsap.set(chars, { force3D: true, opacity: BREATH_REST_OPACITY });
  gsap.to(chars, {
    y: BREATH_LIFT,
    x: (index: number) => (center - index) * BREATH_SPREAD,
    opacity: 1,
    duration: BREATH_DURATION,
    ease: 'sine.inOut',
    stagger: { each: BREATH_STAGGER, from: 'center' },
    repeat: -1,
    yoyo: true,
    delay: BREATH_START_DELAY,
  });
});

define('hero-cta', (el) => {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    el,
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, delay: 1.35, ease: 'power2.out' },
  );
});
