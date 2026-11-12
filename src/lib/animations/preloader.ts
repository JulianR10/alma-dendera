import gsap from 'gsap';

const CLASS_NAME = 'has-preloader';

// Resuelve cuando el overlay empezó a retirarse: ahí arranca la entrada del hero.
export function playPreloader(): Promise<void> {
  const root = document.documentElement;
  const overlay = document.querySelector<HTMLElement>('.preloader');
  if (!root.classList.contains(CLASS_NAME) || !overlay) {
    root.classList.remove(CLASS_NAME);
    return Promise.resolve();
  }

  const logo = overlay.querySelector<HTMLElement>('.preloader__logo');
  const hero = document.querySelector<HTMLImageElement>('.hero__maga');
  window.__almaLenis?.stop();

  const intro = gsap.fromTo(
    logo,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
  );
  const assets = Promise.all([document.fonts.ready, hero?.decode().catch(() => undefined)]);

  return Promise.all([intro.then(), assets]).then(
    () =>
      new Promise<void>((resolve) => {
        gsap.to(overlay, {
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.9,
          ease: 'power2.inOut',
          onStart: resolve,
          onComplete: () => {
            root.classList.remove(CLASS_NAME);
            window.__almaLenis?.start();
          },
        });
      }),
  );
}
