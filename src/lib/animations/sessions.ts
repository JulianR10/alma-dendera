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
  if (window.matchMedia('(max-width: 767px)').matches) return;
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

// Parallax (solo desktop) y loops CSS encendidos únicamente con la card en pantalla.
function liveMedia(el: HTMLElement): void {
  const card = el.closest('article') ?? el;
  ScrollTrigger.create({
    trigger: card,
    start: 'top bottom',
    end: 'bottom top',
    toggleClass: { targets: el, className: 'is-playing' },
  });
  if (window.matchMedia('(max-width: 767px)').matches) return;
  gsap.fromTo(
    el,
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
}

// Sound healing: la foto se abre como una onda que nace del cuenco golpeado.
define('sound-media', (el) => {
  if (prefersReducedMotion()) return;
  liveMedia(el);
  gsap.fromTo(
    el,
    { clipPath: 'circle(0% at 60% 81%)' },
    {
      clipPath: 'circle(130% at 60% 81%)',
      duration: 1.8,
      ease: 'power2.inOut',
      clearProps: 'clipPath',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );
});

// Reiki: la foto se "enciende", de desenfocada y cálida a nítida.
define('reki-media', (el) => {
  if (prefersReducedMotion()) return;
  liveMedia(el);
  gsap.fromTo(
    el.querySelector('.reki__img'),
    { opacity: 0, filter: 'blur(14px) sepia(0.45) brightness(1.12)' },
    {
      opacity: 1,
      filter: 'blur(0px) sepia(0) brightness(1)',
      duration: 1.8,
      ease: 'power2.out',
      clearProps: 'filter',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );
});
define('sound-body', revealBody);
define('reki-body', revealBody);
define('gather-img', revealImage);
define('gather-body', revealBody);
