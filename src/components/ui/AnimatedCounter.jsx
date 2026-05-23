import { motion, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, label, suffix = "", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [triggered, setTriggered] = useState(false);

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  // Trigger counter when in view
  useEffect(() => {
    if (isInView && !triggered) {
      setTriggered(true);
      spring.set(value);
    }
  }, [isInView, value, spring, triggered]);

  // Safety fallback: if the element is mounted for 2s and still hasn't
  // triggered (edge case on some mobile browsers), force the animation.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!triggered) {
        setTriggered(true);
        spring.set(value);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [value, spring, triggered]);

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
        animate={triggered ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {displayValue.toLocaleString()}
        {suffix}
      </motion.span>
      {label && (
        <p className="text-sm text-slate-400 uppercase tracking-wider mt-2 font-medium">
          {label}
        </p>
      )}
    </div>
  );
}
