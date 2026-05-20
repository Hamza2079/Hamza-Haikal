import { useEffect, useRef } from "react";

/**
 * MouseGlow — renders a radial glow that follows the mouse.
 * Lightweight: no canvas, no Three.js, just CSS + RAF.
 */
export function MouseGlow({ color = "rgba(139,92,246,0.12)", size = 600 }) {
  const glowRef = useRef(null);
  const posRef  = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      if (el) {
        const { x, y } = posRef.current;
        el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
        transition: "transform 0.08s linear",
      }}
    />
  );
}
