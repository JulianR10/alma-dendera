import { Menu, X } from 'lucide';
import type { MorphIconElement } from 'morphicons/element';

export interface NavLink {
  href: string;
  label: string;
}

/** Menú completo: todo destino al que se puede saltar. */
export const NAV_LINKS: NavLink[] = [
  { href: '#hero', label: 'Inicio' },
  { href: '#soundhealing', label: 'Soundhealing' },
  { href: '#reiki', label: 'Reiki' },
  { href: '#en-la-sala', label: 'En la sala' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
];

/** Capítulos reales del scroll: son los que marca la columna de resonancia. */
export const SECTION_WAYPOINTS: NavLink[] = [
  { href: '#hero', label: 'Inicio' },
  { href: '#sesiones', label: 'Sesiones' },
  { href: '#en-la-sala', label: 'En la sala' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
];

export function initMobileMenu(): void {
  const menuBtn = document.querySelector<HTMLButtonElement>('#menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const heroNav = document.querySelector('.hero__nav');
  if (!menuBtn || !mobileMenu || !heroNav) return;

  const icon = menuBtn.querySelector<MorphIconElement>('morph-icon');
  const links = mobileMenu.querySelectorAll<HTMLAnchorElement>('.hero__mobile-link');

  const closeMenu = (): void => {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
    menuBtn.classList.remove('is-open');
    heroNav.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    if (icon) icon.icon = Menu;
  };

  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    if (open) {
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Cerrar menú');
      menuBtn.classList.add('is-open');
      heroNav.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (icon) icon.icon = X;
    } else {
      closeMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}
