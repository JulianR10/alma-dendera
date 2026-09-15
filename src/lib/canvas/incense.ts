import { prefersReducedMotion } from '../animations/reducedMotion';

interface SmokeParticle {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  seed: number;
  rise: number;
  drift: number;
  radius: number;
}

const BURN_CYCLE_MS = 8 * 60 * 1000;
const RENEW_MS = 3000;
const RELIGHT_MS = 1500;
const CONSUME_RATIO = 0.42;
const SPAWN_PER_SECOND = 7;
const MAX_PARTICLES = 60;
const ASH_LENGTH = 8;
const LEAN_RAD = (12 * Math.PI) / 180;
const LEAN_X = Math.sin(LEAN_RAD);
const LEAN_Y = -Math.cos(LEAN_RAD);
const SMOKE_PEAK_ALPHA = 0.34;
const SMOKE_TOP_FADE_PX = 28;

export interface IncenseAnchor {
  baseX: number;
  baseY: number;
  lengthRatio: number;
}

const DEFAULT_ANCHOR: IncenseAnchor = {
  baseX: 0.5,
  baseY: 0.67,
  lengthRatio: 0.34,
};

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = value === undefined ? NaN : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function resolveAnchor(canvas: HTMLCanvasElement, opts?: Partial<IncenseAnchor>): IncenseAnchor {
  const dataset = canvas.dataset;
  return {
    baseX: opts?.baseX ?? readNumber(dataset['baseX'], DEFAULT_ANCHOR.baseX),
    baseY: opts?.baseY ?? readNumber(dataset['baseY'], DEFAULT_ANCHOR.baseY),
    lengthRatio:
      opts?.lengthRatio ?? readNumber(dataset['lengthRatio'], DEFAULT_ANCHOR.lengthRatio),
  };
}

interface StickLayout {
  baseX: number;
  baseY: number;
  emberX: number;
  emberY: number;
  stickLength: number;
}

function layoutStick(
  width: number,
  height: number,
  anchor: IncenseAnchor,
  consumed: number,
): StickLayout {
  const baseX = width * anchor.baseX;
  const baseY = height * anchor.baseY;
  const stickLength = height * anchor.lengthRatio;
  const emberDist = Math.max(stickLength - consumed, 4);
  return {
    baseX,
    baseY,
    emberX: baseX + LEAN_X * emberDist,
    emberY: baseY + LEAN_Y * emberDist,
    stickLength,
  };
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function makeSmokeSprite(): HTMLCanvasElement | null {
  const sprite = document.createElement('canvas');
  sprite.width = 48;
  sprite.height = 48;
  const spriteCtx = sprite.getContext('2d');
  if (!spriteCtx) return null;
  const gradient = spriteCtx.createRadialGradient(24, 24, 2, 24, 24, 22);
  gradient.addColorStop(0, 'rgba(232, 226, 214, 0.55)');
  gradient.addColorStop(0.55, 'rgba(232, 226, 214, 0.24)');
  gradient.addColorStop(1, 'rgba(232, 226, 214, 0)');
  spriteCtx.fillStyle = gradient;
  spriteCtx.fillRect(0, 0, 48, 48);
  return sprite;
}

function drawPuff(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  x: number,
  y: number,
  radius: number,
  alpha: number,
): void {
  if (alpha <= 0.001) return;
  ctx.globalAlpha = Math.min(alpha, 1);
  ctx.drawImage(sprite, x - radius, y - radius, radius * 2, radius * 2);
  ctx.globalAlpha = 1;
}

function drawStick(
  ctx: CanvasRenderingContext2D,
  baseX: number,
  baseY: number,
  emberX: number,
  emberY: number,
): void {
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#efe9da';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(emberX, emberY);
  ctx.lineTo(emberX + LEAN_X * ASH_LENGTH, emberY + LEAN_Y * ASH_LENGTH);
  ctx.stroke();
  ctx.strokeStyle = '#d8d2c4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(emberX, emberY);
  ctx.lineTo(baseX, baseY);
  ctx.stroke();
}

function drawEmber(
  ctx: CanvasRenderingContext2D,
  stickX: number,
  emberY: number,
  level: number,
  pulse: number,
): void {
  const glowRadius = 18 * level;
  if (glowRadius > 0.5) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const glow = ctx.createRadialGradient(stickX, emberY, 0, stickX, emberY, glowRadius);
    const peak = 0.35 * level * pulse;
    glow.addColorStop(0, `rgba(255, 178, 102, ${peak.toFixed(3)})`);
    glow.addColorStop(0.5, `rgba(200, 130, 70, ${(peak * 0.4).toFixed(3)})`);
    glow.addColorStop(1, 'rgba(200, 130, 70, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(stickX, emberY, glowRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = `rgba(255, 205, 140, ${(0.95 * level).toFixed(3)})`;
  ctx.beginPath();
  ctx.arc(stickX, emberY, 1.8, 0, Math.PI * 2);
  ctx.fill();
}

function drawHolder(
  ctx: CanvasRenderingContext2D,
  stickX: number,
  baseY: number,
  scale: number,
): void {
  const dishY = baseY + 3 * scale;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(stickX, dishY + 2.5 * scale, 24 * scale, 5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  const dish = ctx.createLinearGradient(0, dishY - 6 * scale, 0, dishY + 7 * scale);
  dish.addColorStop(0, '#efe8d6');
  dish.addColorStop(0.55, '#d8d2c4');
  dish.addColorStop(1, '#a89a83');
  ctx.fillStyle = dish;
  ctx.beginPath();
  ctx.ellipse(stickX, dishY, 24 * scale, 6.5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8a7d68';
  ctx.beginPath();
  ctx.ellipse(stickX, dishY - 1 * scale, 14 * scale, 3.2 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#6b6152';
  ctx.beginPath();
  ctx.ellipse(stickX, dishY - 1.5 * scale, 3.4 * scale, 2 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawStaticFrame(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  width: number,
  height: number,
  anchor: IncenseAnchor,
): void {
  const stickLength = height * anchor.lengthRatio;
  const consumed = stickLength * CONSUME_RATIO * 0.3;
  const { baseX, baseY, emberX, emberY } = layoutStick(width, height, anchor, consumed);
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 14; i += 1) {
    const progress = i / 13;
    const y = emberY - 6 - progress * (emberY - 16);
    const x = emberX + Math.sin(progress * 5.2) * 7 + progress * 10;
    drawPuff(ctx, sprite, x, y, 3.5 + progress * 13, SMOKE_PEAK_ALPHA * (1 - progress));
  }
  drawHolder(ctx, baseX, baseY, 1);
  drawStick(ctx, baseX, baseY + 1, emberX, emberY);
  drawEmber(ctx, emberX, emberY, 1, 0.8);
}

export function init(canvas: HTMLCanvasElement, opts?: Partial<IncenseAnchor>): () => void {
  const noop = (): void => undefined;
  const context = canvas.getContext('2d');
  const smokeSprite = makeSmokeSprite();
  if (!context || !smokeSprite) return noop;
  const ctx: CanvasRenderingContext2D = context;
  const sprite: HTMLCanvasElement = smokeSprite;

  const anchor = resolveAnchor(canvas, opts);

  let width = 120;
  let height = 170;

  const resize = (): void => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  if (prefersReducedMotion()) {
    drawStaticFrame(ctx, sprite, width, height, anchor);
    const redraw = (): void => {
      resize();
      drawStaticFrame(ctx, sprite, width, height, anchor);
    };
    window.addEventListener('resize', redraw);
    return () => {
      window.removeEventListener('resize', redraw);
    };
  }

  const particles: SmokeParticle[] = [];
  let rafId = 0;
  let running = false;
  let visible = true;
  let last = 0;
  let spawnAccumulator = 0;
  const startTime = performance.now();

  const setRunning = (next: boolean): void => {
    if (next === running) return;
    running = next;
    if (running) {
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(rafId);
    }
  };

  const spawn = (emberX: number, emberY: number): void => {
    particles.push({
      x: emberX + randomBetween(-1.5, 1.5),
      y: emberY - randomBetween(2, 6),
      age: 0,
      maxAge: randomBetween(4.5, 7),
      seed: randomBetween(0, Math.PI * 2),
      rise: randomBetween(13, 20),
      drift: randomBetween(1, 6),
      radius: randomBetween(3.5, 5),
    });
    if (particles.length > MAX_PARTICLES) {
      particles.splice(0, particles.length - MAX_PARTICLES);
    }
  };

  function frame(now: number): void {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const elapsed = now - startTime;
    const timeInCycle = elapsed % BURN_CYCLE_MS;
    const burnPhase = Math.min(timeInCycle / (BURN_CYCLE_MS - RENEW_MS), 1);
    const stickLength = height * anchor.lengthRatio;
    const consumed = stickLength * CONSUME_RATIO * burnPhase;
    const renewing = timeInCycle > BURN_CYCLE_MS - RENEW_MS;

    let emberLevel: number;
    if (renewing) {
      const renewProgress = (timeInCycle - (BURN_CYCLE_MS - RENEW_MS)) / RENEW_MS;
      emberLevel = 1 - renewProgress * 0.85;
    } else if (timeInCycle < RELIGHT_MS) {
      emberLevel = 0.15 + (timeInCycle / RELIGHT_MS) * 0.85;
    } else {
      emberLevel = 1;
    }

    const { baseX, baseY, emberX, emberY } = layoutStick(width, height, anchor, consumed);
    const pulse = 0.72 + 0.28 * Math.sin((elapsed / 4000) * Math.PI * 2);
    const motionScale = Math.min(Math.max(width / 260, 0.6), 1);
    const holderScale = Math.min(Math.max(width / 260, 0.7), 1);

    if (!renewing && emberLevel > 0.5) {
      spawnAccumulator += dt * SPAWN_PER_SECOND;
      while (spawnAccumulator >= 1) {
        spawnAccumulator -= 1;
        spawn(emberX, emberY);
      }
    } else {
      spawnAccumulator = 0;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];
      particle.age += dt;
      if (particle.age >= particle.maxAge || particle.y < -24) {
        particles.splice(i, 1);
        continue;
      }
      const ageRatio = particle.age / particle.maxAge;
      particle.y -= particle.rise * dt;
      particle.x +=
        (Math.sin(particle.age * 1.3 + particle.seed) * 8 * motionScale +
          particle.drift * motionScale) *
        dt;
      const fadeIn = Math.min(particle.age / 1.2, 1);
      const fadeOut = 1 - ageRatio * ageRatio;
      const topFade = Math.min(Math.max((particle.y - 2) / SMOKE_TOP_FADE_PX, 0), 1);
      drawPuff(
        ctx,
        sprite,
        particle.x,
        particle.y,
        particle.radius + ageRatio * 13,
        SMOKE_PEAK_ALPHA * fadeIn * fadeOut * topFade,
      );
    }

    drawHolder(ctx, baseX, baseY, holderScale);
    drawStick(ctx, baseX, baseY + 1, emberX, emberY);
    drawEmber(ctx, emberX, emberY, emberLevel, pulse);
    rafId = requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
    setRunning(visible && !document.hidden);
  });
  observer.observe(canvas);

  const resizeTarget = canvas.parentElement ?? canvas;
  const sizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
  sizeObserver?.observe(resizeTarget);

  const onVisibilityChange = (): void => {
    setRunning(visible && !document.hidden);
  };
  const onResize = (): void => {
    resize();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('resize', onResize);

  setRunning(true);

  return () => {
    setRunning(false);
    observer.disconnect();
    sizeObserver?.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('resize', onResize);
  };
}
