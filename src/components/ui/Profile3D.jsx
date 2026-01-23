import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function Profile3D({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  // Holographic shimmer effect
  const shimmerX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const shimmerY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 relative group z-10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-700/50 shadow-2xl">
        {/* Holographic overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${shimmerX} ${shimmerY}, rgba(56, 189, 248, 0.4), transparent 50%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Content Container */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          {children}
        </div>

        {/* Depth Layers */}
        <div
          className="absolute inset-0 bg-linear-to-br from-slate-800/30 to-slate-950/80 pointer-events-none"
          style={{ transform: "translateZ(-10px)" }}
        />
      </div>
    </motion.div>
  );
}
