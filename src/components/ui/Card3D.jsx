import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  useIsMobile,
  usePrefersReducedMotion,
} from "../../hooks/useMediaQuery";

export function Card3D({ children, className = "" }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!ref.current || isMobile || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    if (isMobile || prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  // On mobile or reduced motion, return simple div without 3D effects
  if (isMobile || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        <div className="card-3d">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`perspective-1200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="card-3d">{children}</div>
    </motion.div>
  );
}
