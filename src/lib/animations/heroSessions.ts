import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function initHeroSessionsTransition(): void {
  const hero = document.getElementById('hero');
  const sessions = document.getElementById('sesiones');
  if (!hero || !sessions) return;

  if (prefersReducedMotion()) {
    gsap.set(['.hero__maga', '.hero__center', '.sessions__header'], {
      clearProps: 'transform,opacity',
    });
    return;
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const centerLift = isMobile ? -40 : -70;
  const cardRise = isMobile ? 28 : 44;

  gsap.to('.hero__maga', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  });

  gsap.to('.hero__center', {
    y: centerLift,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom 40%',
      scrub: 0.8,
    },
  });

  const header = document.querySelector<HTMLElement>('.sessions__header');
  if (header) {
    gsap.fromTo(
      header,
      { y: cardRise },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sessions,
          start: 'top 92%',
          end: 'top 55%',
          scrub: 0.8,
        },
      },
    );
  }
}
