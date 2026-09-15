import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS } from '../navigation';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS: string[] = NAV_LINKS.map((link) => link.href.slice(1));

export function initResonance(): void {
  const resonance = document.querySelector<HTMLElement>('.resonance');
  const items = Array.from(document.querySelectorAll<HTMLElement>('.resonance__item'));
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.resonance__link'));

  if (!resonance || items.length === 0) return;

  const setActive = (index: number): void => {
    items.forEach((el, i) => {
      const isActive = i === index;
      el.classList.toggle('is-active', isActive);
      const link = links[i];
      if (link) {
        if (isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    });
    resonance.classList.add('is-light');
  };

  setActive(0);

  const glassNav = document.querySelector<HTMLElement>('.resonance--nav');
  if (glassNav) {
    // Estado inicial: visible al cargar (se ve todo)
    glassNav.classList.add('is-visible');
    let lastY = window.scrollY;
    let downAcc = 0;
    const HIDE_PX = 200;
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        const isAtTop = y < 10;
        const isUp = self.direction === -1;
        if (isAtTop) {
          downAcc = 0;
          glassNav.classList.add('is-visible');
          glassNav.classList.remove('is-scrolled');
          return;
        }
        if (isUp) {
          downAcc = 0;
          glassNav.classList.add('is-visible');
          glassNav.classList.add('is-scrolled');
          return;
        }
        if (delta > 0) downAcc += delta;
        if (downAcc >= HIDE_PX) {
          glassNav.classList.remove('is-visible');
          glassNav.classList.remove('is-scrolled');
        }
      },
    });
  }

  SECTION_IDS.forEach((id, index) => {
    const target =
      id === 'hero'
        ? document.querySelector<HTMLElement>('.hero')
        : (document.getElementById(id) ?? document.querySelector<HTMLElement>(`.${id}`));

    if (!target) return;

    ScrollTrigger.create({
      trigger: target,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActive(index),
      onEnterBack: () => setActive(index),
    });
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      const idx = SECTION_IDS.indexOf(id);
      if (idx !== -1) setActive(idx);
    });
  });
}
