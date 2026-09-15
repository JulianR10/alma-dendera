export function attachSpotlight(scope: ParentNode = document): void {
  const targets = scope.querySelectorAll<HTMLElement>('[data-spotlight]');
  targets.forEach((target) => {
    const update = (event: PointerEvent): void => {
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--x', `${x}%`);
      target.style.setProperty('--y', `${y}%`);
    };
    target.addEventListener('pointermove', update);
    target.addEventListener('pointerenter', update);
  });
}
