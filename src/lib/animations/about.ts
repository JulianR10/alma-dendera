import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';
import { attachRipplesCursor } from './aboutRipplesCursor';

gsap.registerPlugin(ScrollTrigger);

define('about-ripples', (el) => {
  const rings = Array.from(el.querySelectorAll('.about__ripple-curve'));
  rings.forEach((ring, index) => {
    if (!(ring instanceof SVGPathElement)) return;
    const length = ring.getTotalLength();
    gsap.set(ring, { svgOrigin: '400 318' });
    if (prefersReducedMotion()) {
      gsap.set(ring, { strokeDasharray: length, strokeDashoffset: 0, scale: 1 });
      return;
    }
    gsap.fromTo(
      ring,
      { strokeDasharray: length, strokeDashoffset: length, scale: 0.62 },
      {
        strokeDashoffset: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: `top ${90 - index * 7}%`,
          end: 'top 38%',
          scrub: 0.9,
        },
      },
    );
  });
  attachRipplesCursor(el);
});

define('about-figure', (el) => {
  if (prefersReducedMotion()) {
    gsap.set(el, { clearProps: 'transform,opacity' });
    return;
  }
  // En mobile el scrub sobre la figura parpadeaba (aparecer/desaparecer) con el
  // scroll nativo: entrada única y queda fija.
  if (window.matchMedia('(max-width: 768px)').matches) {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about', start: 'top 85%', once: true },
      },
    );
    return;
  }
  const rise = 90;
  gsap.fromTo(
    el,
    { y: rise, scale: 1.07 },
    {
      y: 0,
      scale: 1,
      ease: 'none',
      transformOrigin: '50% 100%',
      scrollTrigger: {
        trigger: '.about',
        start: 'top 100%',
        end: 'top 45%',
        scrub: 0.8,
      },
    },
  );
});

define('about-title', (el) => {
  if (prefersReducedMotion()) {
    gsap.set(el, { clipPath: 'none', opacity: 1 });
    return;
  }
  gsap.fromTo(
    el,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    },
  );
});

define('about-copy', (el) => {
  if (prefersReducedMotion()) {
    gsap.set(el, { clearProps: 'transform,opacity,filter' });
    return;
  }
  gsap.fromTo(
    el,
    { y: 18, opacity: 0, filter: 'blur(8px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    },
  );
});
