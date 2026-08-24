type AnimationFn = (el: HTMLElement) => void;

const registry = new Map<string, AnimationFn>();

export function define(name: string, fn: AnimationFn): void {
  registry.set(name, fn);
}

export function init(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-animate');
    if (!key) return;
    const fn = registry.get(key);
    if (fn) fn(el);
  });
}
