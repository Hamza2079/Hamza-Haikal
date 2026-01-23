import { motion, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, label, suffix = "", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <motion.span
        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400 inline-block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {displayValue.toLocaleString()}
        {suffix}
      </motion.span>
      <p className="text-sm text-slate-400 uppercase tracking-wider mt-2 font-medium">
        {label}
      </p>
    </div>
  );
}
