import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

const CHAR_STAGGER = 0.06;

function splitLine(line: HTMLElement, chars: HTMLElement[]): void {
  const words = (line.textContent ?? '').split(' ');
  line.textContent = '';
  line.setAttribute('aria-hidden', 'true');
  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'quote-band__word';
    wordSpan.setAttribute('aria-hidden', 'true');
    for (const char of word) {
      const charSpan = document.createElement('span');
      charSpan.className = 'quote-band__char';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
      chars.push(charSpan);
    }
    line.appendChild(wordSpan);
    if (index < words.length - 1) line.appendChild(document.createTextNode(' '));
  });
}

define('quote-band', (el) => {
  const text = el.querySelector<HTMLElement>('.quote-band__text');
  const author = el.querySelector<HTMLElement>('.quote-band__author');
  if (!text) return;
  const lines = Array.from(text.querySelectorAll<HTMLElement>('.quote-band__line'));
  if (lines.length === 0) return;

  text.setAttribute('aria-label', lines.map((line) => line.textContent ?? '').join(' '));

  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    return;
  }

  const chars: HTMLElement[] = [];
  lines.forEach((line) => splitLine(line, chars));
  if (chars.length === 0) return;

  const caret = document.createElement('span');
  caret.className = 'quote-band__caret';
  caret.setAttribute('aria-hidden', 'true');
  chars[0].before(caret);

  const placeCaret = (): void => {
    let lastVisible: HTMLElement | null = null;
    for (const char of chars) {
      if (Number(gsap.getProperty(char, 'opacity')) > 0.5) lastVisible = char;
      else break;
    }
    if (lastVisible) lastVisible.after(caret);
  };

  gsap.set(chars, { opacity: 0 });
  if (author) gsap.set(author, { opacity: 0 });

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: el, start: 'top 75%', once: true },
  });
  timeline.to(chars, {
    opacity: 1,
    duration: 0.3,
    ease: 'power1.out',
    stagger: CHAR_STAGGER,
    onUpdate: placeCaret,
  });
  timeline.add(() => {
    text.classList.add('is-done');
    placeCaret();
  });
  if (author) timeline.to(author, { opacity: 0.75, duration: 0.8, ease: 'power2.out' }, '-=0.2');
});
