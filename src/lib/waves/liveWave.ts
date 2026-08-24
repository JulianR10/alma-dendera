import { prefersReducedMotion } from '../animations/reducedMotion';
import type { LiveWaveHandle } from '../types';

function buildWavePath(
  width: number,
  height: number,
  amplitude: number,
  cycles: number,
  phase: number,
  segments: number,
): string {
  const centerY = height / 2;
  const step = width / segments;
  let d = '';

  for (let i = 0; i <= segments; i += 1) {
    const x = i * step;
    const t = (i / segments) * Math.PI * 2 * cycles + phase;
    const y = centerY + Math.sin(t) * amplitude + Math.sin(t * 2 + phase * 0.5) * amplitude * 0.18;
    if (i === 0) {
      d = `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    } else {
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
  }

  return d;
}

export function initLiveWave(
  svg: SVGSVGElement,
  path: SVGPathElement,
  options?: { cycles?: number; segments?: number },
): LiveWaveHandle {
  const cycles = options?.cycles ?? 2.5;
  const segments = options?.segments ?? 120;

  if (prefersReducedMotion()) {
    const box = svg.getBoundingClientRect();
    const w = box.width || 1100;
    const h = box.height || 92;
    path.setAttribute('d', buildWavePath(w, h, 0, cycles, 0, segments));
    return {
      destroy() {},
      setAudioLevel() {},
    };
  }

  let width = 0;
  let height = 0;
  let raf = 0;
  let destroyed = false;

  // interactive + ambient state
  let targetAmp = 14;
  let currentAmp = 14;
  let targetPhase = 0;
  let currentPhase = 0;
  let audioLevel = 0;
  let hasAudio = false;
  let basePhase = 0;

  // mouse lerp
  let mouseXNorm = 0.5;
  let mouseYNorm = 0.5;
  let hasMouse = false;

  function measure(): void {
    const rect = svg.getBoundingClientRect();
    width = rect.width || 1100;
    height = rect.height || 92;
  }

  function onMouseMove(e: MouseEvent): void {
    hasMouse = true;
    mouseXNorm = e.clientX / window.innerWidth;
    mouseYNorm = e.clientY / window.innerHeight;
  }

  function onTouchMove(e: TouchEvent): void {
    if (e.touches.length === 0) return;
    const t = e.touches[0];
    if (!t) return;
    hasMouse = true;
    mouseXNorm = t.clientX / window.innerWidth;
    mouseYNorm = t.clientY / window.innerHeight;
  }

  function onMouseLeave(): void {
    hasMouse = false;
  }

  function tick(): void {
    if (destroyed) return;

    basePhase += 0.0065;

    if (hasAudio) {
      targetAmp = 10 + audioLevel * 22;
      targetPhase = basePhase;
    } else if (hasMouse && window.innerWidth > 768) {
      const ampFromY = 6 + (1 - mouseYNorm) * 20;
      targetAmp = ampFromY;
      targetPhase = basePhase + (mouseXNorm - 0.5) * Math.PI * 0.5;
    } else {
      targetAmp = 12 + Math.sin(basePhase * 0.22) * 4;
      targetPhase = basePhase;
    }

    currentAmp += (targetAmp - currentAmp) * 0.03;
    currentPhase += (targetPhase - currentPhase) * 0.035;

    const d = buildWavePath(width, height, currentAmp, cycles, currentPhase, segments);
    path.setAttribute('d', d);

    raf = window.requestAnimationFrame(tick);
  }

  measure();
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('resize', measure);

  raf = window.requestAnimationFrame(tick);

  return {
    destroy() {
      destroyed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', measure);
    },
    setAudioLevel(level: number) {
      // level 0..1
      const clamped = Math.max(0, Math.min(1, level));
      hasAudio = clamped > 0.02;
      audioLevel = clamped;
      if (!hasAudio) {
        // decay quickly
        audioLevel *= 0.9;
      }
    },
  };
}
