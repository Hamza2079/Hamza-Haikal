import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="hidden md:block fixed right-7 top-1/2 -translate-y-1/2 z-50 h-44 w-px rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <motion.div
        style={{
          scaleY,
          background: "linear-gradient(to bottom, #8B5CF6, #C4B5FD)",
          width: "100%",
          height: "100%",
          transformOrigin: "top",
          boxShadow: "0 0 10px rgba(139,92,246,0.5)",
        }}
      />
    </div>
  );
}
