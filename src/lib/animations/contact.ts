import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { define } from './registry';
import { prefersReducedMotion } from './reducedMotion';

gsap.registerPlugin(ScrollTrigger);

const WAVE_WIDTH = 1440;
const WAVE_STEPS = 64;

interface WaveState {
  phase: number;
}

function wavePath(phase: number, cycles: number, amp: number, mid: number): string {
  let d = '';
  for (let i = 0; i <= WAVE_STEPS; i++) {
    const t = i / WAVE_STEPS;
    const x = t * WAVE_WIDTH;
    const y = mid + Math.sin(t * cycles * Math.PI * 2 + phase) * amp;
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

define('contact-wave', (el) => {
  const pathA = el.querySelector('.contact__wave--a');
  const pathB = el.querySelector('.contact__wave--b');
  if (!(pathA instanceof SVGPathElement) || !(pathB instanceof SVGPathElement)) return;

  const state: WaveState = { phase: 0 };

  const draw = (): void => {
    pathA.setAttribute('d', wavePath(state.phase, 1.35, 78, 430));
    pathB.setAttribute('d', wavePath(state.phase * 1.35 + 0.9, 2.45, 32, 390));
  };

  draw();

  if (prefersReducedMotion()) return;

  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 88%',
        once: true,
      },
    },
  );

  const motion = gsap.to(state, {
    phase: Math.PI * 2,
    duration: 6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    paused: true,
    onUpdate: draw,
  });

  ScrollTrigger.create({
    trigger: '.contact',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      if (self.isActive) motion.play();
      else motion.pause();
    },
  });
});

define('contact-copy', (el) => {
  const lines = Array.from(el.children).filter(
    (node) => node instanceof HTMLElement && !node.classList.contains('contact__field'),
  );
  if (prefersReducedMotion()) {
    gsap.set(lines, { clearProps: 'transform,opacity,filter' });
    return;
  }
  gsap.fromTo(
    lines,
    { y: 20, opacity: 0, filter: 'blur(8px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.07,
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true,
      },
    },
  );
});
