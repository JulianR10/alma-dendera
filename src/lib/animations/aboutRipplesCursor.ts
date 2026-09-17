import { prefersReducedMotion } from './reducedMotion';

const POINTS_PER_RING = [64, 80, 96, 128];
const MAX_PULL = [2, 3, 5, 8];
const INFLUENCE_RADIUS = 140;
const STICK = 0.22;
const EASE = 0.1;
const SETTLE_EPSILON = 0.02;

interface CursorPoint {
  x: number;
  y: number;
}

interface RingState {
  path: SVGPathElement;
  baseX: Float32Array;
  baseY: Float32Array;
  posX: Float32Array;
  posY: Float32Array;
  count: number;
  maxPull: number;
}

function isFinePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = value === undefined ? Number.NaN : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildRings(svg: SVGSVGElement): RingState[] {
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>('.about__ripple-curve'));
  return paths.map((path, index) => {
    const cx = readNumber(path.dataset.cx, 400);
    const cy = readNumber(path.dataset.cy, 318);
    const rx = readNumber(path.dataset.rx, 100);
    const ry = readNumber(path.dataset.ry, 30);
    const count = POINTS_PER_RING[Math.min(index, POINTS_PER_RING.length - 1)];
    const baseX = new Float32Array(count);
    const baseY = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      baseX[i] = cx + rx * Math.cos(angle);
      baseY[i] = cy + ry * Math.sin(angle);
    }
    return {
      path,
      baseX,
      baseY,
      posX: Float32Array.from(baseX),
      posY: Float32Array.from(baseY),
      count,
      maxPull: MAX_PULL[Math.min(index, MAX_PULL.length - 1)],
    };
  });
}

function renderRing(ring: RingState): void {
  let d = `M ${ring.posX[0].toFixed(1)} ${ring.posY[0].toFixed(1)}`;
  for (let i = 1; i < ring.count; i += 1) {
    d += ` L ${ring.posX[i].toFixed(1)} ${ring.posY[i].toFixed(1)}`;
  }
  ring.path.setAttribute('d', `${d} Z`);
}

function toSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number): CursorPoint | null {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const point = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
  return { x: point.x, y: point.y };
}

export function attachRipplesCursor(svg: Element): () => void {
  const noop = (): void => undefined;
  if (!(svg instanceof SVGSVGElement)) return noop;
  if (prefersReducedMotion() || !isFinePointer()) return noop;
  const section = svg.closest<HTMLElement>('.about');
  if (!section) return noop;
  const rings = buildRings(svg);
  if (rings.length === 0) return noop;

  rings.forEach(renderRing);

  const radiusSq = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
  const sigma = INFLUENCE_RADIUS / 2;
  const twoSigmaSq = 2 * sigma * sigma;

  let cursor: CursorPoint | null = null;
  let clientX = 0;
  let clientY = 0;
  let hasPointer = false;
  let visible = true;
  let frameId = 0;
  let running = false;

  const step = (): void => {
    running = true;
    const target = hasPointer ? toSvgPoint(svg, clientX, clientY) : null;
    cursor = target;
    let maxDelta = 0;
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i += 1) {
        const bx = ring.baseX[i];
        const by = ring.baseY[i];
        let tx = bx;
        let ty = by;
        if (cursor) {
          const dx = cursor.x - bx;
          const dy = cursor.y - by;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const falloff = Math.exp(-distSq / twoSigmaSq);
            let px = dx * STICK * falloff;
            let py = dy * STICK * falloff;
            const len = Math.hypot(px, py);
            if (len > ring.maxPull) {
              px = (px / len) * ring.maxPull;
              py = (py / len) * ring.maxPull;
            }
            tx = bx + px;
            ty = by + py;
          }
        }
        const nx = ring.posX[i] + (tx - ring.posX[i]) * EASE;
        const ny = ring.posY[i] + (ty - ring.posY[i]) * EASE;
        const delta = Math.abs(nx - ring.posX[i]) + Math.abs(ny - ring.posY[i]);
        if (delta > maxDelta) maxDelta = delta;
        ring.posX[i] = nx;
        ring.posY[i] = ny;
      }
      renderRing(ring);
    });
    if (!visible || (!hasPointer && maxDelta < SETTLE_EPSILON)) {
      running = false;
      frameId = 0;
      return;
    }
    frameId = requestAnimationFrame(step);
  };

  const ensureRunning = (): void => {
    if (!running && visible) frameId = requestAnimationFrame(step);
  };

  const handleMove = (event: PointerEvent): void => {
    clientX = event.clientX;
    clientY = event.clientY;
    hasPointer = true;
    ensureRunning();
  };

  const handleLeave = (): void => {
    hasPointer = false;
    cursor = null;
    ensureRunning();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      visible = entry ? entry.isIntersecting : true;
      if (visible) ensureRunning();
      else if (running) {
        cancelAnimationFrame(frameId);
        running = false;
        frameId = 0;
      }
    },
    { threshold: 0 },
  );
  observer.observe(section);

  section.addEventListener('pointermove', handleMove);
  section.addEventListener('pointerleave', handleLeave);

  return () => {
    section.removeEventListener('pointermove', handleMove);
    section.removeEventListener('pointerleave', handleLeave);
    observer.disconnect();
    if (running) cancelAnimationFrame(frameId);
    running = false;
  };
}
