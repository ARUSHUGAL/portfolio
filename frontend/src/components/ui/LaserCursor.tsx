import { useEffect, useRef } from 'react';

/**
 * A custom "laser stylus" cursor: a small leading dot plus a glowing vermillion
 * trail that streaks and fades behind pointer movement, like light off a stylus.
 *
 * - Canvas-based, driven by requestAnimationFrame for smoothness.
 * - Disabled on touch/coarse pointers and when prefers-reduced-motion is set.
 * - Purely decorative (aria-hidden); the native cursor is only hidden on
 *   fine-pointer devices via a body class.
 */
export function LaserCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.body.classList.add('laser-active');

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Trail points with a lifetime.
    interface Point {
      x: number;
      y: number;
      life: number;
    }
    const points: Point[] = [];
    const MAX_POINTS = 22;

    // Eased "ink" position that chases the raw pointer for a fluid stylus feel.
    let targetX = width / 2;
    let targetY = height / 2;
    let penX = targetX;
    let penY = targetY;
    let hovering = false;
    let pressed = false;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      visible = true;
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => (visible = false);
    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest('a, button, input, textarea, [role="button"], label');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const render = () => {
      // Chase the pointer with easing (the "stylus" lag).
      penX += (targetX - penX) * 0.35;
      penY += (targetY - penY) * 0.35;

      if (visible) {
        points.push({ x: penX, y: penY, life: 1 });
        if (points.length > MAX_POINTS) points.shift();
      }

      ctx.clearRect(0, 0, width, height);

      // Draw the fading laser streak.
      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const t = i / points.length;
          const alpha = t * p1.life * 0.9;
          const w = t * 2.2 + 0.3;
          // Outer glow
          ctx.strokeStyle = `rgba(255, 90, 72, ${alpha * 0.35})`;
          ctx.lineWidth = w + 6;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
          // Core line
          ctx.strokeStyle = `rgba(230, 54, 42, ${alpha})`;
          ctx.lineWidth = w;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }

      for (const p of points) p.life *= 0.9;

      // Leading dot / ring.
      if (visible) {
        const r = pressed ? 3 : hovering ? 9 : 4;
        ctx.beginPath();
        ctx.arc(penX, penY, r + 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 90, 72, 0.12)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(penX, penY, r, 0, Math.PI * 2);
        if (hovering) {
          ctx.strokeStyle = 'rgba(230, 54, 42, 0.95)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = 'rgba(230, 54, 42, 0.95)';
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      document.body.classList.remove('laser-active');
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
}
