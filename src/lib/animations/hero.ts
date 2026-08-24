import gsap from 'gsap';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

define('hero-alma', (el) => {
  const inner = el.querySelector('span');
  const target = inner ?? el;

  if (prefersReducedMotion()) {
    gsap.set(target, { y: '0%', opacity: 1 });
    return;
  }

  gsap.fromTo(
    target,
    { y: '110%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 1, delay: 0.25, ease: 'power4.out' },
  );
});

define('hero-dendera', (el) => {
  const inner = el.querySelector('span');
  const target = inner ?? el;

  if (prefersReducedMotion()) {
    gsap.set(target, { y: '0%', opacity: 1 });
    return;
  }

  gsap.fromTo(
    target,
    { y: '110%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 1, delay: 0.42, ease: 'power4.out' },
  );
});

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
    gsap.set(el, { opacity: 0.92 });
    return;
  }
  gsap.fromTo(
    el,
    { x: 24, opacity: 0, filter: 'blur(8px)' },
    { x: 0, opacity: 0.92, filter: 'blur(0px)', duration: 1.3, delay: 0.35, ease: 'power3.out' },
  );
});

define('hero-line', (el) => {
  if (prefersReducedMotion()) {
    el.style.opacity = '0.95';
    return;
  }

  const path = el.querySelector<SVGPathElement>('#live-wave');
  if (!path) return;

  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.2,
    delay: 0.15,
    ease: 'power3.inOut',
  });
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
      delay: 0.85,
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
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 0.95, ease: 'power2.out' },
  );
});

define('scroll-hint', (el) => {
  if (prefersReducedMotion()) return;
  gsap.fromTo(el, { opacity: 0 }, { opacity: 0.4, duration: 0.8, delay: 1.4, ease: 'power1.out' });

  const line = el.querySelector('.hero__hint-line');
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.7, delay: 1.5, ease: 'power2.out', transformOrigin: 'top' },
    );
  }
});
