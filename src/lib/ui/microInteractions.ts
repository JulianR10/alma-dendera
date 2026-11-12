import gsap from 'gsap';
import { prefersReducedMotion } from '../animations/reducedMotion';

const MAGNET_PULL = 0.22;
const MAGNET_MAX_PX = 10;

const clamp = (value: number): number => Math.max(-MAGNET_MAX_PX, Math.min(MAGNET_MAX_PX, value));

// Onda de resonancia desde el punto del click; se limpia sola al terminar la animación CSS.
function attachRipple(button: HTMLElement): void {
  button.addEventListener('pointerdown', (event) => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'cta__ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.setProperty('--rx', `${event.clientX - rect.left}px`);
    ripple.style.setProperty('--ry', `${event.clientY - rect.top}px`);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    button.appendChild(ripple);
  });
}

// El botón se inclina hacia el cursor (variables CSS: no pisa el transform del hover).
function attachMagnet(button: HTMLElement): void {
  button.addEventListener('pointermove', (event) => {
    const rect = button.getBoundingClientRect();
    gsap.to(button, {
      '--mx': `${clamp((event.clientX - rect.left - rect.width / 2) * MAGNET_PULL)}px`,
      '--my': `${clamp((event.clientY - rect.top - rect.height / 2) * MAGNET_PULL)}px`,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });
  button.addEventListener('pointerleave', () => {
    gsap.to(button, {
      '--mx': '0px',
      '--my': '0px',
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    });
  });
}

export function initMicroInteractions(): void {
  if (prefersReducedMotion()) return;
  const buttons = document.querySelectorAll<HTMLElement>('.cta');
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  buttons.forEach((button) => {
    attachRipple(button);
    if (hasHover) attachMagnet(button);
  });
}
