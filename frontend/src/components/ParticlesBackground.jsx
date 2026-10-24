import { useEffect, useRef } from "react";

// Tweak these to change the look
const CONFIG = {
  density: 18000,      // bigger number = fewer dots (1 dot per N pixels of screen)
  maxDots: 90,
  speed: 0.28,         // drift speed
  linkDistance: 120,   // lines appear between dots closer than this
  mouseRadius: 140,    // dots move away from the cursor inside this radius
  colors: ["59,130,246", "96,165,250", "125,211,252"], // blue shades (r,g,b)
};

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let dots = [];
    const mouse = { x: -9999, y: -9999 };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const makeDot = () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.4, 1) * CONFIG.speed;
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(1, 2.3),
        color: CONFIG.colors[Math.floor(rand(0, CONFIG.colors.length))],
        phase: rand(0, Math.PI * 2),      // twinkle offset
        twinkle: rand(0.01, 0.03),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(CONFIG.maxDots, Math.floor((w * h) / CONFIG.density));
      dots = Array.from({ length: count }, makeDot);
      if (reduceMotion) draw(); // no animation loop, so draw one still frame
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // lines first, so dots are drawn on top
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONFIG.linkDistance) {
            const alpha = (1 - dist / CONFIG.linkDistance) * 0.18;
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        const alpha = 0.45 + Math.sin(d.phase) * 0.35; // twinkle between 0.1 and 0.8
        // soft glow
        ctx.fillStyle = `rgba(${d.color},${alpha * 0.18})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        // core dot
        ctx.fillStyle = `rgba(${d.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      for (const d of dots) {
        // push away from the mouse
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (1 - dist / CONFIG.mouseRadius) * 0.6;
          d.x += (dx / dist) * force;
          d.y += (dy / dist) * force;
        }

        d.x += d.vx;
        d.y += d.vy;
        d.phase += d.twinkle;

        // wrap around the screen edges
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;
      }
    };

    const loop = () => {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}