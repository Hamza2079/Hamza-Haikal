import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressIndicator() {
  // Track entire page scroll
  const { scrollYProgress } = useScroll();

  // Smooth spring animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-50 h-48 w-1 bg-slate-800/50 rounded-full overflow-hidden">
      <motion.div
        style={{ scaleY }}
        className="w-full h-full bg-linear-to-b from-sky-500 via-sky-400 to-emerald-500 origin-top shadow-lg shadow-sky-500/50"
      />
    </div>
  );
}
