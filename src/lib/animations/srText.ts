// Texto solo para lectores de pantalla: reemplaza al original cuando una animación
// lo parte en letras ocultas (aria-label en span/p no se lee).
export function srText(text: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'visually-hidden';
  span.textContent = text;
  return span;
}
